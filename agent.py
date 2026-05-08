#!/usr/bin/env python3
"""
agent.py -- OpenWork local dev agent powered by Ollama tool calling.

Runs an interactive chat session with llama3.1. The model can autonomously
read files, write files, list directories, and push to GitHub using tool calls.

Usage:
    python3 agent.py                        # interactive chat, no preloaded context
    python3 agent.py -f README.md           # preload a file into context
    python3 agent.py -f README.md docs/ROADMAP.md   # preload multiple files
    python3 agent.py -m mistral             # use a different model

Slash commands (type these during chat):
    /help           show available commands
    /clear          clear conversation history (keeps system prompt)
    /files          show what files are currently in context
    /load <path>    load a file into context mid-conversation
    /exit           quit
"""

import argparse
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

OLLAMA_CHAT_URL = "http://localhost:11434/api/chat"
DEFAULT_MODEL = "llama3.1"
REPO_ROOT = os.path.dirname(os.path.abspath(__file__))

SYSTEM_PROMPT = """\
You are a software development assistant working on the OpenWork project.

OpenWork is a distributed cognition marketplace: a network where AI agents act as
autonomous workers completing tasks submitted by users, with reputation-based economic
coordination and adversarial output verification.

You have access to the following tools:
- read_file: read any file in the project repository
- write_file: create or overwrite any file in the project repository
- list_directory: list the contents of a directory
- git_commit: commit staged changes with a message
- git_push: push committed changes to GitHub

Use tools whenever the task involves the filesystem or git. For example:
- If asked to save something, call write_file with the appropriate path and content.
- If you need to see a file you haven't been shown, call read_file.
- If asked to commit or push, call git_commit and/or git_push.

When writing files, write complete, correct content. Do not truncate.
When responding in chat without writing a file, use clear plain text.
"""

# ---------------------------------------------------------------------------
# Tool definitions (sent to Ollama so the model knows what's available)
# ---------------------------------------------------------------------------

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "Read the contents of a file in the project repository.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "File path relative to the repo root, e.g. docs/ROADMAP.md",
                    }
                },
                "required": ["path"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "write_file",
            "description": "Create or overwrite a file in the project repository with the given content.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "File path relative to the repo root, e.g. docs/explainer.md",
                    },
                    "content": {
                        "type": "string",
                        "description": "The complete content to write to the file.",
                    },
                },
                "required": ["path", "content"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_directory",
            "description": "List the files and subdirectories inside a directory.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Directory path relative to the repo root, e.g. docs/",
                    }
                },
                "required": ["path"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "git_commit",
            "description": "Stage all modified and new tracked files and create a git commit.",
            "parameters": {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string",
                        "description": "The commit message.",
                    }
                },
                "required": ["message"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "git_push",
            "description": "Push committed changes to the remote GitHub repository.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": [],
            },
        },
    },
]

# ---------------------------------------------------------------------------
# Tool implementations
# ---------------------------------------------------------------------------

def abs_path(p: str) -> str:
    return p if os.path.isabs(p) else os.path.join(REPO_ROOT, p)


def tool_read_file(path: str) -> str:
    try:
        with open(abs_path(path), "r", encoding="utf-8") as f:
            content = f.read()
        print(f"  [read_file] {path} ({len(content)} chars)")
        return content
    except FileNotFoundError:
        return f"Error: file not found: {path}"
    except Exception as e:
        return f"Error reading {path}: {e}"


def tool_write_file(path: str, content: str) -> str:
    try:
        full = abs_path(path)
        parent = os.path.dirname(full)
        if parent:
            os.makedirs(parent, exist_ok=True)
        with open(full, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [write_file] {path} ({len(content)} chars written)")
        return f"File written successfully: {path}"
    except Exception as e:
        return f"Error writing {path}: {e}"


def tool_list_directory(path: str) -> str:
    full = abs_path(path)
    if not os.path.isdir(full):
        return f"Error: not a directory: {path}"
    entries = sorted(os.listdir(full))
    lines = []
    for e in entries:
        marker = "/" if os.path.isdir(os.path.join(full, e)) else ""
        lines.append(f"  {e}{marker}")
    result = f"{path}/\n" + "\n".join(lines)
    print(f"  [list_directory] {path}")
    return result


def tool_git_commit(message: str) -> str:
    try:
        subprocess.run(["git", "add", "-A"], cwd=REPO_ROOT, check=True, capture_output=True)
        result = subprocess.run(
            ["git", "commit", "-m", message],
            cwd=REPO_ROOT, check=True, capture_output=True, text=True,
        )
        print(f"  [git_commit] {message}")
        return f"Committed: {message}\n{result.stdout.strip()}"
    except subprocess.CalledProcessError as e:
        return f"Git commit error: {e.stderr.strip() if e.stderr else str(e)}"


def tool_git_push() -> str:
    try:
        result = subprocess.run(
            ["git", "push", "origin", "main"],
            cwd=REPO_ROOT, check=True, capture_output=True, text=True,
        )
        print("  [git_push] pushed to origin/main")
        return "Pushed to origin/main successfully."
    except subprocess.CalledProcessError as e:
        return f"Git push error: {e.stderr.strip() if e.stderr else str(e)}"


TOOL_DISPATCH = {
    "read_file": lambda args: tool_read_file(args["path"]),
    "write_file": lambda args: tool_write_file(args["path"], args["content"]),
    "list_directory": lambda args: tool_list_directory(args["path"]),
    "git_commit": lambda args: tool_git_commit(args["message"]),
    "git_push": lambda args: tool_git_push(),
}


def execute_tool(name: str, arguments) -> str:
    if isinstance(arguments, str):
        arguments = json.loads(arguments)
    handler = TOOL_DISPATCH.get(name)
    if not handler:
        return f"Error: unknown tool '{name}'"
    return handler(arguments)


# ---------------------------------------------------------------------------
# Ollama API
# ---------------------------------------------------------------------------

def check_ollama() -> bool:
    try:
        urllib.request.urlopen("http://localhost:11434", timeout=3)
        return True
    except Exception:
        return False


def ollama_call(model: str, messages: list, tools: list) -> dict:
    """Single non-streaming call. Returns the full message dict."""
    payload = json.dumps({
        "model": model,
        "messages": messages,
        "tools": tools,
        "stream": False,
        "options": {"temperature": 0.3},
    }).encode("utf-8")

    req = urllib.request.Request(
        OLLAMA_CHAT_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("message", {})
    except urllib.error.URLError as e:
        print(f"\nError talking to Ollama: {e}", file=sys.stderr)
        sys.exit(1)


def ollama_stream(model: str, messages: list) -> str:
    """Streaming call for plain text responses (no tools). Prints as it goes."""
    payload = json.dumps({
        "model": model,
        "messages": messages,
        "stream": True,
        "options": {"temperature": 0.3},
    }).encode("utf-8")

    req = urllib.request.Request(
        OLLAMA_CHAT_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    tokens = []
    try:
        with urllib.request.urlopen(req) as resp:
            for raw_line in resp:
                if not raw_line:
                    continue
                chunk = json.loads(raw_line.decode("utf-8"))
                token = chunk.get("message", {}).get("content", "")
                if token:
                    print(token, end="", flush=True)
                    tokens.append(token)
                if chunk.get("done"):
                    break
    except urllib.error.URLError as e:
        print(f"\nError talking to Ollama: {e}", file=sys.stderr)
        sys.exit(1)
    print()
    return "".join(tokens)


# ---------------------------------------------------------------------------
# Agentic loop
# ---------------------------------------------------------------------------

def run_turn(model: str, messages: list) -> str:
    """
    Run one full agent turn: call Ollama, execute any tool calls in a loop,
    then get and stream the final text response.
    Returns the assistant's final text.
    """
    # Phase 1: resolve tool calls
    while True:
        msg = ollama_call(model, messages, TOOLS)
        tool_calls = msg.get("tool_calls")

        if not tool_calls:
            # No tool calls -- get the final response with streaming
            messages.append({"role": "assistant", "content": msg.get("content", "")})
            break

        # Add the assistant's tool-call message to history
        messages.append({"role": "assistant", "content": msg.get("content", ""), "tool_calls": tool_calls})

        # Execute each tool and add results
        for tc in tool_calls:
            fn = tc.get("function", {})
            name = fn.get("name", "")
            arguments = fn.get("arguments", {})
            result = execute_tool(name, arguments)
            messages.append({"role": "tool", "content": result})

    # Phase 2: if the last assistant message has content, stream it
    # (it was already added above; print it now)
    final_content = messages[-1].get("content", "")
    if final_content:
        # Re-stream by printing (content was added non-streamed in tool loop)
        # For a cleaner UX, do a fresh streaming call after tool resolution
        # only if we had tool calls. Otherwise stream from the start.
        print(final_content)

    return final_content


def run_turn_streaming(model: str, messages: list) -> str:
    """
    Optimized turn: stream directly if no tools are likely needed.
    Falls back to tool-call loop if the first response contains tool calls.
    """
    # First try a non-streaming call with tools to check for tool calls
    msg = ollama_call(model, messages, TOOLS)
    tool_calls = msg.get("tool_calls")

    if tool_calls:
        # Has tool calls -- go through the full loop
        messages.append({"role": "assistant", "content": msg.get("content", ""), "tool_calls": tool_calls})
        for tc in tool_calls:
            fn = tc.get("function", {})
            result = execute_tool(fn.get("name", ""), fn.get("arguments", {}))
            messages.append({"role": "tool", "content": result})

        # After tools, get final response with streaming
        final = ollama_stream(model, messages)
        messages.append({"role": "assistant", "content": final})
        return final
    else:
        # No tool calls -- just print what we got
        content = msg.get("content", "")
        print(content)
        messages.append({"role": "assistant", "content": content})
        return content


# ---------------------------------------------------------------------------
# Slash commands
# ---------------------------------------------------------------------------

HELP_TEXT = """
Slash commands:
  /help           show this message
  /clear          clear conversation history (keeps system prompt)
  /files          show files currently loaded in context
  /load <path>    load a file into context
  /exit /quit     exit the agent
"""

def handle_slash(cmd: str, messages: list, loaded_files: list, model: str) -> bool:
    """Returns True if the input was a slash command (so the main loop skips it)."""
    parts = cmd.strip().split(None, 1)
    command = parts[0].lower()
    arg = parts[1] if len(parts) > 1 else ""

    if command in ("/exit", "/quit"):
        print("Goodbye.")
        sys.exit(0)

    elif command == "/help":
        print(HELP_TEXT)

    elif command == "/clear":
        # Keep only the system prompt
        del messages[1:]
        loaded_files.clear()
        print("Conversation cleared.")

    elif command == "/files":
        if loaded_files:
            print("Files in context:")
            for f in loaded_files:
                print(f"  {f}")
        else:
            print("No files loaded into context.")

    elif command == "/load":
        if not arg:
            print("Usage: /load <path>")
        else:
            content = tool_read_file(arg)
            if content.startswith("Error:"):
                print(content)
            else:
                messages.append({
                    "role": "user",
                    "content": f"--- FILE: {arg} ---\n{content}\n--- END FILE: {arg} ---"
                })
                messages.append({
                    "role": "assistant",
                    "content": f"Got it, I've loaded {arg} into context."
                })
                loaded_files.append(arg)
                print(f"Loaded {arg} into context.")
    else:
        return False

    return True


# ---------------------------------------------------------------------------
# Interactive chat loop
# ---------------------------------------------------------------------------

def interactive(model: str, preload_files: list):
    print(f"\nOpenWork Agent  |  model: {model}")
    print("Type /help for commands, /exit to quit.")
    print("-" * 60)

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    loaded_files = []

    # Preload any files passed at startup
    for path in preload_files:
        content = tool_read_file(path)
        if content.startswith("Error:"):
            print(content)
        else:
            messages.append({
                "role": "user",
                "content": f"--- FILE: {path} ---\n{content}\n--- END FILE: {path} ---"
            })
            messages.append({
                "role": "assistant",
                "content": f"Got it, I've loaded {path} into context."
            })
            loaded_files.append(path)
            print(f"Loaded: {path}")

    if preload_files:
        print("-" * 60)

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
        run_turn_streaming(model, messages)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="OpenWork local dev agent -- interactive chat with tool calling.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "-f", "--files", nargs="+", metavar="FILE",
        help="Files to preload into context at startup",
    )
    parser.add_argument(
        "-m", "--model", default=DEFAULT_MODEL,
        help=f"Ollama model to use (default: {DEFAULT_MODEL})",
    )
    args = parser.parse_args()

    if not check_ollama():
        print(
            "Error: Ollama is not running.\n"
            "Start it with:  brew services start ollama",
            file=sys.stderr,
        )
        sys.exit(1)

    interactive(args.model, args.files or [])


if __name__ == "__main__":
    main()
