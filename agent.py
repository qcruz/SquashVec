#!/usr/bin/env python3
"""
agent.py -- OpenWork local dev agent

Interactive chat with tool calling, auto-context, context compaction,
and a persistent task queue.

Usage:
    openwork                        # start session (blank)
    openwork continue               # auto-load repo context + task queue, resume work
    openwork -f docs/ROADMAP.md     # preload specific files
    openwork -m mistral             # use a different model

Slash commands:
    /help           show all commands
    /tasks          show task queue
    /next           start working on next pending task
    /compact        manually compact conversation history
    /context        show repo file manifest
    /files          show files loaded in context this session
    /load <path>    load a file into context
    /clear          clear conversation history (keeps system prompt)
    /exit           quit
"""

import argparse
import datetime
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

OLLAMA_CHAT_URL   = "http://localhost:11434/api/chat"
DEFAULT_MODEL     = "llama3.1"
REPO_ROOT         = os.getcwd()           # always the directory where openwork is run
TASKS_FILE        = os.path.join(REPO_ROOT, ".openwork", "tasks.json")
MAX_TOOL_CALLS    = 20          # per turn, prevents infinite loops
COMPACT_THRESHOLD = 120_000     # estimated chars before auto-compact
COMPACT_KEEP_TAIL = 6           # number of recent messages to keep as-is

# Candidate files to auto-read on 'continue' -- first match per group wins
ORIENT_CANDIDATES = [
    # Project description
    "README.md", "README.rst", "README.txt", "README",
    # Roadmap / planning
    "docs/ROADMAP.md", "ROADMAP.md", "TODO.md", "TASKS.md",
    # Project config (for project-type detection)
    "pyproject.toml", "setup.py", "package.json", "Cargo.toml", "go.mod",
]

# ---------------------------------------------------------------------------
# System prompt (repo manifest injected at startup)
# ---------------------------------------------------------------------------

SYSTEM_PROMPT_TEMPLATE = """\
You are an expert software development assistant.

PROJECT: {project_name}
LOCATION: {project_root}
TYPE: {project_type}

{project_description}

CURRENT FILE STRUCTURE:
{manifest}

AVAILABLE TOOLS:
- read_file(path)                         read any file in the project
- write_file(path, content)               create or overwrite any file
- patch_file(path, old_text, new_text)    replace first occurrence of text in a file
- search_files(query, directory, pattern) search file contents for a string
- list_directory(path)                    list directory contents
- add_task(description)                   add a task to the persistent queue
- list_tasks()                            show the task queue
- complete_task(id)                       mark a task done
- get_next_task()                         get and start the next pending task
- git_commit(message)                     commit all changes (asks confirmation)
- git_push()                              push to GitHub (asks confirmation)

RULES:
- Use tools whenever the task involves files, search, or the task queue.
- When writing code or any file, always write complete, working content. Never truncate.
- Match the language, style, and conventions already present in the project.
- For small edits to existing files, prefer patch_file. For new files or full rewrites, use write_file.
- Do not delete files. Do not access paths outside the project directory.
- git_commit and git_push will ask the user for confirmation before executing.
- For large tasks, use add_task to break work into steps before starting.
- Work through tasks one at a time. Call complete_task when each one is done.
"""

# ---------------------------------------------------------------------------
# Repo manifest
# ---------------------------------------------------------------------------

SKIP_DIRS  = {".git", "__pycache__", ".pytest_cache", ".hypothesis", "node_modules"}
SKIP_FILES = {".DS_Store"}

def build_manifest() -> str:
    lines = []
    for root, dirs, files in os.walk(REPO_ROOT):
        dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS)
        rel = os.path.relpath(root, REPO_ROOT)
        depth = 0 if rel == "." else rel.count(os.sep) + 1
        indent = "  " * depth
        if rel != ".":
            lines.append(f"{indent}{os.path.basename(root)}/")
        for fname in sorted(files):
            if fname in SKIP_FILES:
                continue
            fpath = os.path.join(root, fname)
            size  = os.path.getsize(fpath)
            tag   = f"{size // 1024}KB" if size >= 1024 else f"{size}B"
            lines.append(f"{'  ' * (depth + 1)}{fname} ({tag})")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Project detection
# ---------------------------------------------------------------------------

def detect_project() -> dict:
    """
    Inspect the current directory and return a dict describing the project.
    Used to build a meaningful system prompt for any project, not just OpenWork.
    """
    name = os.path.basename(REPO_ROOT)

    # Detect project type from indicator files
    indicators = {
        "pyproject.toml": "Python",
        "setup.py":       "Python",
        "setup.cfg":      "Python",
        "requirements.txt": "Python",
        "package.json":   "JavaScript/TypeScript",
        "Cargo.toml":     "Rust",
        "go.mod":         "Go",
        "pom.xml":        "Java (Maven)",
        "build.gradle":   "Java (Gradle)",
        "Gemfile":        "Ruby",
        "composer.json":  "PHP",
        "CMakeLists.txt": "C/C++",
    }
    project_type = "General"
    for fname, ptype in indicators.items():
        if os.path.exists(os.path.join(REPO_ROOT, fname)):
            project_type = ptype
            break

    # Try to read a short description from README
    description = ""
    for candidate in ["README.md", "README.rst", "README.txt", "README"]:
        rpath = os.path.join(REPO_ROOT, candidate)
        if os.path.exists(rpath):
            try:
                with open(rpath, "r", encoding="utf-8", errors="ignore") as f:
                    # First 800 chars is enough for orientation
                    description = f.read(800).strip()
                description = f"PROJECT OVERVIEW (from {candidate}):\n{description}"
            except Exception:
                pass
            break

    return {
        "name":        name,
        "root":        REPO_ROOT,
        "type":        project_type,
        "description": description,
    }


def get_orient_files() -> list:
    """Return a list of files that exist and are worth loading on 'continue'."""
    found = []
    seen_types = set()
    for candidate in ORIENT_CANDIDATES:
        # Only load one file per purpose (first README, first roadmap, etc.)
        purpose = (
            "readme"   if any(c in candidate.lower() for c in ["readme"]) else
            "roadmap"  if any(c in candidate.lower() for c in ["roadmap", "todo", "task"]) else
            "config"
        )
        if purpose in seen_types:
            continue
        full = os.path.join(REPO_ROOT, candidate)
        if os.path.exists(full) and os.path.getsize(full) < 200_000:  # skip huge files
            found.append(candidate)
            seen_types.add(purpose)
    return found


# ---------------------------------------------------------------------------
# Task queue
# ---------------------------------------------------------------------------

def _load_queue() -> dict:
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"next_id": 1, "tasks": []}


def _save_queue(q: dict) -> None:
    os.makedirs(os.path.dirname(TASKS_FILE), exist_ok=True)
    with open(TASKS_FILE, "w", encoding="utf-8") as f:
        json.dump(q, f, indent=2)


def tool_add_task(description: str) -> str:
    q = _load_queue()
    task = {
        "id":           q["next_id"],
        "description":  description,
        "status":       "pending",
        "created_at":   datetime.datetime.now().isoformat(),
        "completed_at": None,
    }
    q["tasks"].append(task)
    q["next_id"] += 1
    _save_queue(q)
    print(f"  [add_task] #{task['id']}: {description[:60]}")
    return f"Task #{task['id']} added: {description}"


def tool_list_tasks() -> str:
    q = _load_queue()
    if not q["tasks"]:
        return "Task queue is empty."
    lines = ["Task queue:"]
    for t in q["tasks"]:
        status_icon = {"pending": "[ ]", "in_progress": "[~]", "done": "[x]"}.get(t["status"], "[ ]")
        lines.append(f"  {status_icon} #{t['id']} {t['description']}")
    print("  [list_tasks]")
    return "\n".join(lines)


def tool_complete_task(task_id: int) -> str:
    q = _load_queue()
    for t in q["tasks"]:
        if t["id"] == int(task_id):
            t["status"] = "done"
            t["completed_at"] = datetime.datetime.now().isoformat()
            _save_queue(q)
            print(f"  [complete_task] #{task_id} done")
            return f"Task #{task_id} marked as done."
    return f"Error: task #{task_id} not found."


def tool_get_next_task() -> str:
    q = _load_queue()
    for t in q["tasks"]:
        if t["status"] == "pending":
            t["status"] = "in_progress"
            _save_queue(q)
            print(f"  [get_next_task] #{t['id']}: {t['description'][:60]}")
            return f"Next task #{t['id']}: {t['description']}"
    return "No pending tasks in queue."


def show_tasks() -> None:
    """Print task queue to terminal (for slash command)."""
    q = _load_queue()
    if not q["tasks"]:
        print("Task queue is empty.")
        return
    pending  = [t for t in q["tasks"] if t["status"] == "pending"]
    active   = [t for t in q["tasks"] if t["status"] == "in_progress"]
    done     = [t for t in q["tasks"] if t["status"] == "done"]
    print(f"\nTask queue  ({len(done)} done, {len(active)} active, {len(pending)} pending)")
    print("-" * 50)
    for t in q["tasks"]:
        icon = {"pending": "[ ]", "in_progress": "[~]", "done": "[x]"}.get(t["status"], "[ ]")
        print(f"  {icon} #{t['id']:>3}  {t['description']}")
    print()


# ---------------------------------------------------------------------------
# File tools
# ---------------------------------------------------------------------------

def _safe_path(p: str) -> str:
    """Resolve path and ensure it stays within REPO_ROOT."""
    full = os.path.realpath(os.path.join(REPO_ROOT, p) if not os.path.isabs(p) else p)
    if not full.startswith(os.path.realpath(REPO_ROOT)):
        raise ValueError(f"Path '{p}' is outside the repository. Access denied.")
    return full


def tool_read_file(path: str) -> str:
    try:
        full = _safe_path(path)
        with open(full, "r", encoding="utf-8") as f:
            content = f.read()
        print(f"  [read_file] {path} ({len(content):,} chars)")
        return content
    except ValueError as e:
        return f"Error: {e}"
    except FileNotFoundError:
        return f"Error: file not found: {path}"
    except Exception as e:
        return f"Error reading {path}: {e}"


def tool_write_file(path: str, content: str) -> str:
    try:
        full = _safe_path(path)
        os.makedirs(os.path.dirname(full), exist_ok=True) if os.path.dirname(full) else None
        with open(full, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [write_file] {path} ({len(content):,} chars)")
        return f"Written: {path}"
    except ValueError as e:
        return f"Error: {e}"
    except Exception as e:
        return f"Error writing {path}: {e}"


def tool_patch_file(path: str, old_text: str, new_text: str) -> str:
    try:
        full = _safe_path(path)
        with open(full, "r", encoding="utf-8") as f:
            content = f.read()
        if old_text not in content:
            return f"Error: patch target not found in {path}. No changes made."
        patched = content.replace(old_text, new_text, 1)
        with open(full, "w", encoding="utf-8") as f:
            f.write(patched)
        print(f"  [patch_file] {path}")
        return f"Patched: {path}"
    except ValueError as e:
        return f"Error: {e}"
    except Exception as e:
        return f"Error patching {path}: {e}"


def tool_list_directory(path: str) -> str:
    try:
        full = _safe_path(path)
        if not os.path.isdir(full):
            return f"Error: not a directory: {path}"
        entries = sorted(os.listdir(full))
        lines = []
        for e in entries:
            marker = "/" if os.path.isdir(os.path.join(full, e)) else ""
            lines.append(f"  {e}{marker}")
        print(f"  [list_directory] {path}")
        return f"{path}/\n" + "\n".join(lines)
    except ValueError as e:
        return f"Error: {e}"


def tool_search_files(query: str, directory: str = ".", pattern: str = "*") -> str:
    """Search file contents for a query string. Returns matching lines with context."""
    import fnmatch
    try:
        search_root = _safe_path(directory)
    except ValueError as e:
        return f"Error: {e}"

    results = []
    matched_files = 0
    MAX_RESULTS = 50

    for root, dirs, files in os.walk(search_root):
        dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS)
        for fname in sorted(files):
            if fname in SKIP_FILES:
                continue
            if not fnmatch.fnmatch(fname, pattern):
                continue
            fpath = os.path.join(root, fname)
            rel   = os.path.relpath(fpath, REPO_ROOT)
            try:
                with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                    lines = f.readlines()
            except Exception:
                continue
            file_hits = []
            for i, line in enumerate(lines, 1):
                if query.lower() in line.lower():
                    file_hits.append(f"  {i:>4}: {line.rstrip()}")
                    if len(file_hits) >= 5:   # max 5 hits per file
                        file_hits.append("  ...")
                        break
            if file_hits:
                results.append(f"{rel}:\n" + "\n".join(file_hits))
                matched_files += 1
                if matched_files >= MAX_RESULTS:
                    results.append(f"(stopped after {MAX_RESULTS} matching files)")
                    break

    if not results:
        return f"No matches for '{query}' in {directory}"
    print(f"  [search_files] '{query}' → {matched_files} file(s)")
    return f"Search results for '{query}':\n\n" + "\n\n".join(results)


# ---------------------------------------------------------------------------
# Git tools (with confirmation)
# ---------------------------------------------------------------------------

def _git(*args) -> str:
    result = subprocess.run(
        ["git"] + list(args), cwd=REPO_ROOT,
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    return result.stdout.strip()


def tool_git_commit(message: str) -> str:
    try:
        # Show what will be committed
        status = _git("status", "--short")
        if not status:
            return "Nothing to commit -- working tree is clean."
        print(f"\n  [git_commit] Proposed commit: \"{message}\"")
        print(f"  Changes:\n" + "\n".join(f"    {l}" for l in status.splitlines()))
        confirm = input("  Commit? [y/N]: ").strip().lower()
        if confirm != "y":
            return "Commit cancelled by user."
        _git("add", "-A")
        out = _git("commit", "-m", message)
        print(f"  Committed.")
        return f"Committed: {message}\n{out}"
    except RuntimeError as e:
        return f"Git error: {e}"


def tool_git_push() -> str:
    try:
        # Show what will be pushed
        ahead = _git("rev-list", "--count", "origin/main..HEAD")
        print(f"\n  [git_push] {ahead} commit(s) ahead of origin/main")
        confirm = input("  Push to GitHub? [y/N]: ").strip().lower()
        if confirm != "y":
            return "Push cancelled by user."
        _git("push", "origin", "main")
        print("  Pushed.")
        return "Pushed to origin/main."
    except RuntimeError as e:
        return f"Git error: {e}"


# ---------------------------------------------------------------------------
# Tool dispatch
# ---------------------------------------------------------------------------

TOOL_DISPATCH = {
    "read_file":      lambda a: tool_read_file(a["path"]),
    "write_file":     lambda a: tool_write_file(a["path"], a["content"]),
    "patch_file":     lambda a: tool_patch_file(a["path"], a["old_text"], a["new_text"]),
    "search_files":   lambda a: tool_search_files(a.get("query",""), a.get("directory","."), a.get("pattern","*")),
    "list_directory": lambda a: tool_list_directory(a["path"]),
    "add_task":       lambda a: tool_add_task(a["description"]),
    "list_tasks":     lambda a: tool_list_tasks(),
    "complete_task":  lambda a: tool_complete_task(a["id"]),
    "get_next_task":  lambda a: tool_get_next_task(),
    "git_commit":     lambda a: tool_git_commit(a["message"]),
    "git_push":       lambda a: tool_git_push(),
}

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "Read a file from the repository.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Path relative to repo root"}
                },
                "required": ["path"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "write_file",
            "description": "Create or fully overwrite a file.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path":    {"type": "string", "description": "Path relative to repo root"},
                    "content": {"type": "string", "description": "Complete file content"},
                },
                "required": ["path", "content"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "patch_file",
            "description": "Replace the first occurrence of old_text with new_text in a file. Use for small targeted edits.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path":     {"type": "string", "description": "Path relative to repo root"},
                    "old_text": {"type": "string", "description": "Exact text to find and replace"},
                    "new_text": {"type": "string", "description": "Replacement text"},
                },
                "required": ["path", "old_text", "new_text"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "search_files",
            "description": "Search file contents for a string. Returns matching lines with file paths and line numbers. Use to find where something is defined, used, or mentioned across the project.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query":     {"type": "string",  "description": "String to search for (case-insensitive)"},
                    "directory": {"type": "string",  "description": "Directory to search in (default: project root)"},
                    "pattern":   {"type": "string",  "description": "Filename glob pattern to filter files (e.g. '*.py', '*.md'). Default: all files"},
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_directory",
            "description": "List files and subdirectories in a directory.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Directory path relative to repo root"},
                },
                "required": ["path"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "add_task",
            "description": "Add a task to the persistent task queue.",
            "parameters": {
                "type": "object",
                "properties": {
                    "description": {"type": "string", "description": "What needs to be done"},
                },
                "required": ["description"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_tasks",
            "description": "Show all tasks in the queue with their status.",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "complete_task",
            "description": "Mark a task as done by its ID.",
            "parameters": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer", "description": "Task ID to mark complete"},
                },
                "required": ["id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_next_task",
            "description": "Get the next pending task from the queue and mark it in_progress.",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "git_commit",
            "description": "Stage all changes and commit. Will ask user for confirmation.",
            "parameters": {
                "type": "object",
                "properties": {
                    "message": {"type": "string", "description": "Commit message"},
                },
                "required": ["message"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "git_push",
            "description": "Push committed changes to GitHub. Will ask user for confirmation.",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
]


def execute_tool(name: str, arguments) -> str:
    if isinstance(arguments, str):
        try:
            arguments = json.loads(arguments)
        except json.JSONDecodeError:
            return f"Error: could not parse tool arguments for '{name}'"
    handler = TOOL_DISPATCH.get(name)
    if not handler:
        return f"Error: unknown tool '{name}'"
    try:
        return handler(arguments)
    except Exception as e:
        return f"Error executing {name}: {e}"


# ---------------------------------------------------------------------------
# Ollama API
# ---------------------------------------------------------------------------

def check_ollama() -> bool:
    try:
        urllib.request.urlopen("http://localhost:11434", timeout=3)
        return True
    except Exception:
        return False


def ollama_call(model: str, messages: list) -> dict:
    payload = json.dumps({
        "model":   model,
        "messages": messages,
        "tools":   TOOLS,
        "stream":  False,
        "options": {"temperature": 0.3},
    }).encode("utf-8")
    req = urllib.request.Request(
        OLLAMA_CHAT_URL, data=payload,
        headers={"Content-Type": "application/json"}, method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8")).get("message", {})
    except urllib.error.URLError as e:
        print(f"\nOllama error: {e}", file=sys.stderr)
        sys.exit(1)


def ollama_stream(model: str, messages: list) -> str:
    payload = json.dumps({
        "model":   model,
        "messages": messages,
        "stream":  True,
        "options": {"temperature": 0.3},
    }).encode("utf-8")
    req = urllib.request.Request(
        OLLAMA_CHAT_URL, data=payload,
        headers={"Content-Type": "application/json"}, method="POST",
    )
    tokens = []
    try:
        with urllib.request.urlopen(req) as resp:
            for raw in resp:
                if not raw:
                    continue
                chunk = json.loads(raw.decode("utf-8"))
                tok = chunk.get("message", {}).get("content", "")
                if tok:
                    print(tok, end="", flush=True)
                    tokens.append(tok)
                if chunk.get("done"):
                    break
    except urllib.error.URLError as e:
        print(f"\nOllama error: {e}", file=sys.stderr)
        sys.exit(1)
    print()
    return "".join(tokens)


# ---------------------------------------------------------------------------
# Agent turn
# ---------------------------------------------------------------------------

def run_turn(model: str, messages: list) -> str:
    """
    Execute one full agent turn.
    Resolves tool calls in a loop (up to MAX_TOOL_CALLS), then streams final response.
    """
    tool_call_count = 0

    while True:
        msg = ollama_call(model, messages)
        tool_calls = msg.get("tool_calls")

        if not tool_calls:
            # Final text response -- stream it
            content = msg.get("content", "")
            if content:
                print(content)
            messages.append({"role": "assistant", "content": content})
            return content

        # Safety: cap tool calls per turn
        tool_call_count += len(tool_calls)
        if tool_call_count > MAX_TOOL_CALLS:
            warning = f"[Halted: exceeded {MAX_TOOL_CALLS} tool calls in one turn. Possible loop.]"
            print(f"\n  {warning}")
            messages.append({"role": "assistant", "content": warning})
            return warning

        # Add assistant tool-call message to history
        messages.append({
            "role": "assistant",
            "content": msg.get("content", ""),
            "tool_calls": tool_calls,
        })

        # Execute each tool and add results
        for tc in tool_calls:
            fn   = tc.get("function", {})
            name = fn.get("name", "")
            args = fn.get("arguments", {})
            result = execute_tool(name, args)
            messages.append({"role": "tool", "content": result})

    # After all tool calls resolved, stream the final response
    final = ollama_stream(model, messages)
    messages.append({"role": "assistant", "content": final})
    return final


# ---------------------------------------------------------------------------
# Context compaction
# ---------------------------------------------------------------------------

def estimate_chars(messages: list) -> int:
    return sum(len(json.dumps(m)) for m in messages)


def compact(model: str, messages: list) -> None:
    """
    Summarize the middle of the conversation to free up context space.
    Keeps: messages[0] (system) + last COMPACT_KEEP_TAIL messages.
    Summarizes everything in between.
    """
    if len(messages) <= COMPACT_KEEP_TAIL + 1:
        print("  [compact] Not enough history to compact.")
        return

    tail  = messages[-COMPACT_KEEP_TAIL:]
    mid   = messages[1:-COMPACT_KEEP_TAIL]  # everything between system and tail

    if not mid:
        return

    # Build a summarization prompt
    summary_messages = [
        {
            "role": "system",
            "content": (
                "You are summarizing a development session. "
                "Produce a dense, structured summary that captures: "
                "what was discussed, what files were created or modified, "
                "what tasks were completed, what decisions were made, "
                "and what the current state of the work is. "
                "Be specific. Include file names and key content. "
                "This summary will replace the full conversation history."
            ),
        },
        {
            "role": "user",
            "content": "Summarize this conversation:\n\n"
                       + "\n\n".join(
                           f"[{m['role'].upper()}]: {m.get('content','')}"
                           for m in mid
                           if m.get("content")
                       ),
        },
    ]

    print("\n  [compact] Summarizing conversation history...", flush=True)
    summary_msg = ollama_call(model, summary_messages)
    summary = summary_msg.get("content", "(no summary generated)")

    # Replace middle messages with the summary
    summary_entry = {
        "role": "user",
        "content": f"[CONVERSATION SUMMARY -- earlier session condensed]\n\n{summary}",
    }
    summary_ack = {
        "role": "assistant",
        "content": "Got it, I have the session summary loaded.",
    }

    messages[1:-COMPACT_KEEP_TAIL] = [summary_entry, summary_ack]

    new_chars = estimate_chars(messages)
    print(f"  [compact] Done. History reduced to ~{new_chars:,} chars.")


def maybe_compact(model: str, messages: list) -> None:
    """Auto-compact if over threshold."""
    if estimate_chars(messages) > COMPACT_THRESHOLD:
        print(f"\n  [auto-compact] Context approaching limit, compacting...")
        compact(model, messages)


# ---------------------------------------------------------------------------
# Slash commands
# ---------------------------------------------------------------------------

HELP_TEXT = """
Slash commands:
  /help             show this message
  /tasks            show task queue
  /next             work on next pending task
  /compact          manually compact conversation history
  /context          show repo file manifest
  /files            show files loaded this session
  /load <path>      load a file into context
  /clear            clear conversation history (keeps system prompt)
  /exit  /quit      exit
"""


def handle_slash(cmd: str, messages: list, loaded_files: list, model: str) -> bool:
    parts   = cmd.strip().split(None, 1)
    command = parts[0].lower()
    arg     = parts[1] if len(parts) > 1 else ""

    if command in ("/exit", "/quit"):
        print("Goodbye.")
        sys.exit(0)

    elif command == "/help":
        print(HELP_TEXT)

    elif command == "/tasks":
        show_tasks()

    elif command == "/next":
        next_task = tool_get_next_task()
        print(f"\n{next_task}")
        if "No pending tasks" not in next_task:
            messages.append({"role": "user", "content": next_task})
            print("\nAgent: ", end="", flush=True)
            run_turn(model, messages)
            maybe_compact(model, messages)

    elif command == "/compact":
        compact(model, messages)

    elif command == "/context":
        print("\n" + build_manifest())

    elif command == "/files":
        if loaded_files:
            print("Files in context:")
            for f in loaded_files:
                print(f"  {f}")
        else:
            print("No files explicitly loaded this session.")

    elif command == "/load":
        if not arg:
            print("Usage: /load <path>")
        else:
            content = tool_read_file(arg)
            if content.startswith("Error:"):
                print(content)
            else:
                messages.append({"role": "user",      "content": f"--- FILE: {arg} ---\n{content}\n--- END FILE ---"})
                messages.append({"role": "assistant",  "content": f"Loaded {arg}."})
                loaded_files.append(arg)
                print(f"Loaded {arg}.")

    elif command == "/clear":
        del messages[1:]
        loaded_files.clear()
        print("Conversation cleared.")

    else:
        return False

    return True


# ---------------------------------------------------------------------------
# Interactive session
# ---------------------------------------------------------------------------

def interactive(model: str, preload_files: list, opening: str = None, continue_mode: bool = False):
    project  = detect_project()
    manifest = build_manifest()
    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(
        project_name=project["name"],
        project_root=project["root"],
        project_type=project["type"],
        project_description=project["description"],
        manifest=manifest,
    )
    messages = [{"role": "system", "content": system_prompt}]
    loaded_files = []

    print(f"\nOpenWork Agent  |  {project['name']}  |  {project['type']}  |  model: {model}")
    print(f"Directory: {REPO_ROOT}")
    print("Type /help for commands, /exit to quit.")
    print("-" * 60)

    # Continue mode: auto-load orientation files and task queue
    if continue_mode:
        print("Loading project context...")
        for path in get_orient_files():
            content = tool_read_file(path)
            if not content.startswith("Error:"):
                messages.append({"role": "user",     "content": f"--- FILE: {path} ---\n{content}\n--- END FILE ---"})
                messages.append({"role": "assistant", "content": f"Loaded {path}."})
                loaded_files.append(path)
                print(f"  Loaded {path}")
        # Load task queue summary
        queue_summary = tool_list_tasks()
        messages.append({"role": "user",     "content": f"Current task queue:\n{queue_summary}"})
        messages.append({"role": "assistant", "content": "Got it, I have the project context and task queue."})
        print("Context loaded. Ready to continue.\n")

    # Preload any explicitly specified files
    for path in preload_files:
        content = tool_read_file(path)
        if content.startswith("Error:"):
            print(content)
        else:
            messages.append({"role": "user",     "content": f"--- FILE: {path} ---\n{content}\n--- END FILE ---"})
            messages.append({"role": "assistant", "content": f"Loaded {path}."})
            loaded_files.append(path)

    if preload_files or continue_mode:
        print("-" * 60)

    # Opening message from CLI args
    if opening:
        print(f"You: {opening}")
        messages.append({"role": "user", "content": opening})
        print("\nAgent: ", end="", flush=True)
        run_turn(model, messages)
        maybe_compact(model, messages)

    while True:
        try:
            user_input = input("\nYou: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye.")
            break

        if not user_input:
            continue

        if user_input.startswith("/"):
            handle_slash(user_input, messages, loaded_files, model)
            continue

        messages.append({"role": "user", "content": user_input})
        print("\nAgent: ", end="", flush=True)
        run_turn(model, messages)
        maybe_compact(model, messages)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="OpenWork local dev agent",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "task", nargs="*",
        help="Optional opening message or 'continue' to resume project work",
    )
    parser.add_argument("-f", "--files", nargs="+", metavar="FILE",
                        help="Files to preload into context at startup")
    parser.add_argument("-m", "--model", default=DEFAULT_MODEL,
                        help=f"Ollama model (default: {DEFAULT_MODEL})")
    args = parser.parse_args()

    if not check_ollama():
        print("Error: Ollama is not running.\nStart it: brew services start ollama",
              file=sys.stderr)
        sys.exit(1)

    raw = " ".join(args.task).strip() if args.task else ""
    continue_mode = raw.lower() == "continue"
    opening = None if (not raw or continue_mode) else raw

    interactive(args.model, args.files or [], opening, continue_mode)


if __name__ == "__main__":
    main()
