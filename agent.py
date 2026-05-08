#!/usr/bin/env python3
"""
agent.py -- Local dev agent powered by Ollama.

Reads local repo files as context, sends a task to a local model,
streams the response, and optionally writes output back to disk and pushes to GitHub.

Usage examples:
    python agent.py "explain how the babel codec works" -f babel_compression/babel/codec.py
    python agent.py "add error handling to this function" -f babel_compression/babel/codec.py -w babel_compression/babel/codec.py
    python agent.py "write a README section on verification" -w docs/verification.md --commit --push
    python agent.py "what files are in the docs folder?" --ls docs/
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

Rules:
- When asked to write or modify a file, output ONLY the raw file content.
  No markdown code fences, no explanation before or after, no commentary.
  Just the complete file content ready to be written directly to disk.
- When asked for explanations, analysis, or plans, respond in clear plain text.
- Work within the existing code style and conventions of whatever files you are given.
- If you are unsure about something, say so clearly rather than guessing.
"""


# ---------------------------------------------------------------------------
# Ollama
# ---------------------------------------------------------------------------

def check_ollama() -> bool:
    try:
        urllib.request.urlopen("http://localhost:11434", timeout=3)
        return True
    except Exception:
        return False


def stream_ollama(model: str, messages: list) -> str:
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

    print()  # trailing newline after stream
    return "".join(tokens)


# ---------------------------------------------------------------------------
# File helpers
# ---------------------------------------------------------------------------

def abs_path(p: str) -> str:
    return p if os.path.isabs(p) else os.path.join(REPO_ROOT, p)


def read_file(path: str) -> str:
    with open(abs_path(path), "r", encoding="utf-8") as f:
        return f.read()


def write_file(path: str, content: str) -> None:
    full = abs_path(path)
    parent = os.path.dirname(full)
    if parent:
        os.makedirs(parent, exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)


def list_dir(path: str) -> str:
    full = abs_path(path)
    if not os.path.isdir(full):
        return f"(not a directory: {path})"
    entries = sorted(os.listdir(full))
    lines = []
    for e in entries:
        marker = "/" if os.path.isdir(os.path.join(full, e)) else ""
        lines.append(f"  {e}{marker}")
    return f"{path}/\n" + "\n".join(lines)


def strip_code_fences(text: str) -> str:
    """Remove leading/trailing markdown code fences if the model added them anyway."""
    lines = text.strip().splitlines()
    if lines and lines[0].startswith("```"):
        lines = lines[1:]
    if lines and lines[-1].strip() == "```":
        lines = lines[:-1]
    return "\n".join(lines)


def build_context(files: list, dirs: list) -> str:
    parts = []

    for d in (dirs or []):
        listing = list_dir(d)
        parts.append(f"--- DIRECTORY LISTING: {d} ---\n{listing}\n--- END LISTING ---")

    for f in (files or []):
        try:
            content = read_file(f)
            parts.append(f"--- FILE: {f} ---\n{content}\n--- END FILE: {f} ---")
        except FileNotFoundError:
            print(f"Warning: file not found: {f}", file=sys.stderr)

    return "\n\n".join(parts)


# ---------------------------------------------------------------------------
# Git
# ---------------------------------------------------------------------------

def git_run(*args):
    result = subprocess.run(
        ["git"] + list(args),
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} failed:\n{result.stderr.strip()}")
    return result.stdout.strip()


def git_commit_and_push(files: list, message: str, push: bool) -> None:
    for f in files:
        git_run("add", abs_path(f))
    git_run("commit", "-m", message)
    print(f"Committed: {message}")
    if push:
        git_run("push", "origin", "main")
        print("Pushed to origin/main.")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Local dev agent: sends a task + file context to a local Ollama model.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("task", help="What you want the agent to do")
    parser.add_argument(
        "-f", "--files", nargs="+", metavar="FILE",
        help="Files to read and include as context",
    )
    parser.add_argument(
        "--ls", nargs="+", metavar="DIR",
        help="Directories to list and include as context",
    )
    parser.add_argument(
        "-w", "--write", metavar="FILE",
        help="Write the model output directly to this file",
    )
    parser.add_argument(
        "-c", "--commit", action="store_true",
        help="Git commit the written file after writing",
    )
    parser.add_argument(
        "-p", "--push", action="store_true",
        help="Git push after committing (implies --commit)",
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

    # Build context block from files and directory listings
    context = build_context(args.files, args.ls)

    # Compose the user message
    parts = []
    if context:
        parts.append(context)
    parts.append(f"Task: {args.task}")
    if args.write:
        parts.append(
            f"\nOutput ONLY the complete content of `{args.write}`. "
            "No markdown, no code fences, no explanation. Raw file content only."
        )
    user_content = "\n\n".join(parts)

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_content},
    ]

    # Print header
    print(f"\nModel : {args.model}")
    if args.files:
        print(f"Files : {', '.join(args.files)}")
    if args.ls:
        print(f"Dirs  : {', '.join(args.ls)}")
    if args.write:
        print(f"Output: {args.write}")
    print("-" * 60)

    response = stream_ollama(args.model, messages)

    # Optionally write to file
    if args.write:
        clean = strip_code_fences(response)
        write_file(args.write, clean)
        print(f"\nWritten to {args.write}")

        if args.commit or args.push:
            commit_msg = f"agent: {args.task[:72]}"
            try:
                git_commit_and_push([args.write], commit_msg, push=args.push)
            except RuntimeError as e:
                print(f"Git error: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()
