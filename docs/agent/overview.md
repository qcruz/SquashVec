# OpenWork Agent System: Overview, Setup & Roadmap

This document covers everything about the local agent layer of OpenWork --
what it is, how it works, how to use it, and where it needs to go next.

This is a living document. As the agent system grows, update it here.

---

## What This Is

The OpenWork agent system is a local AI worker you run on your own machine.
It combines two things:

1. **Ollama** -- runs a capable open-source language model (llama3.1) locally on your hardware
2. **agent.py** -- a Python script that wraps Ollama with tool-calling, file access, git integration, and an interactive chat interface

Together they give you a persistent, autonomous AI that can read and write project files,
execute git operations, and have multi-turn conversations -- all without sending anything
to an external API.

This is also the direct prototype for what an **OpenWork contributor node** will eventually be:
a machine that accepts tasks from the network, executes them using local AI, and returns verified results.
Every tool and pattern built here will be reused in production.

---

## How It Works: The Tool-Calling Loop

Standard AI chatbots only output text. Tool calling changes that.

When you send a message, the model doesn't just reply -- it can also decide to call a function.
The script intercepts that function call, executes it (reads a file, writes a file, runs git),
returns the result to the model, and the model continues. This loops until the model has
everything it needs to give a final response.

```
You send a message
        |
        v
Ollama receives message + list of available tools
        |
        v
  Does the model need a tool?
  /                        \
Yes                         No
  |                          |
Model outputs               Model outputs
a tool call                 text response
  |                          |
Script executes              Streamed to
the function                 your terminal
  |
Result sent back
to the model
  |
Loop back to top
```

This means you can say things like:

> "Read the roadmap, add a section on the verification layer, and push it to GitHub."

And the agent will call `read_file` → `write_file` → `git_commit` → `git_push` in sequence,
printing each action as it goes, without you doing anything between steps.

---

## Current Tools

| Tool | What it does |
|---|---|
| `read_file(path)` | Reads any file in the repo and returns its contents to the model |
| `write_file(path, content)` | Creates or overwrites a file with the model's output |
| `list_directory(path)` | Lists files and subdirectories at a given path |
| `git_commit(message)` | Stages all changes and creates a git commit |
| `git_push()` | Pushes committed changes to origin/main on GitHub |

Every tool call is printed to the terminal with a `[tool_name]` prefix so you always
know exactly what the agent is doing.

---

## Setup

### Prerequisites
- macOS (Apple Silicon recommended; Intel and Linux work with slower inference)
- Python 3 (pre-installed on macOS)
- Homebrew

### Step 1: Install Ollama and download the model
```bash
brew install ollama
brew services start ollama
ollama pull llama3.1
```

Full details and hardware requirements: [`docs/setup/local-model-guide.md`](../setup/local-model-guide.md)

### Step 2: Clone the repo
```bash
git clone git@github.com:qcruz/SquashVec.git
cd SquashVec
```

### Step 3: Add the shell alias
Add this line to your `~/.zshrc` (or `~/.bashrc`):
```bash
alias openwork='python3 ~/path/to/SquashVec/agent.py'
```
Then reload: `source ~/.zshrc`

### Step 4: Start the agent
```bash
openwork
```

---

## Using the Agent

### Start a chat
```bash
openwork                          # pure interactive, blank session
openwork -f README.md             # preload a file into context
openwork -f README.md docs/ROADMAP.md   # preload multiple files
openwork -m mistral               # use a different model
```

### Send an opening message directly
```bash
openwork what files are in the docs folder
openwork write an explainer on X and save it to docs/explainer.md
openwork read the roadmap and tell me what phase we are in
```

### Slash commands (type during chat)
```
/help           show available commands
/clear          clear conversation history (keeps system prompt)
/files          show what files are currently loaded in context
/load <path>    load a file into context mid-conversation
/exit           quit
```

### Example session
```
$ openwork -f docs/ROADMAP.md

OpenWork Agent  |  model: llama3.1
Type /help for commands, /exit to quit.
------------------------------------------------------------
Loaded: docs/ROADMAP.md

You: summarize where we are in the roadmap
Agent: We are currently in Phase 0 (Foundation). Completed items include...

You: add a note under Phase 1 about the tool-calling prototype and save it
  [read_file] docs/ROADMAP.md (8432 chars)
  [write_file] docs/ROADMAP.md (8611 chars written)
Agent: Done -- I've added a note under Phase 1 about the tool-calling prototype.

You: commit and push that
  [git_commit] agent: add tool-calling prototype note to Phase 1
  [git_push] pushed to origin/main
Agent: Committed and pushed.
```

---

## Current Limitations

| Limitation | Detail |
|---|---|
| No memory between sessions | Each `openwork` session starts fresh. Context must be reloaded with `-f` or `/load`. |
| Context window | llama3.1 supports 128k tokens (~96k words). Very large files may exceed this. |
| Single model per session | One model runs per session. Cannot switch mid-conversation. |
| No authentication | The Ollama API on localhost:11434 has no auth. Any local process can call it. |
| git_commit stages everything | `git add -A` is used -- all modified files are staged, not just ones the agent wrote. |
| Model can hallucinate | Output should be reviewed, especially for factual or technical content. |
| No diff/patch support | write_file overwrites the entire file. No surgical line-level edits yet. |
| Sequential tool calls only | Tools are called one at a time. No parallel execution. |

---

## Future Development

This section tracks what the agent system needs next.
Items are roughly ordered by priority.

### Security (High Priority)

The current setup is a personal development tool with no security hardening.
Before contributor nodes can be exposed to the OpenWork network, we need:

- **API authentication** -- Ollama's local API must require a token before accepting requests.
  Any process on the machine (or local network) can currently call it freely.
- **Tool call allowlisting** -- The agent should only be able to call tools that are explicitly
  permitted for a given session or task type. A task that only needs `read_file` should not
  be able to call `git_push`.
- **Path sandboxing** -- `read_file` and `write_file` currently accept any path on the filesystem.
  Production nodes must be restricted to a defined workspace directory.
- **Rate limiting** -- Prevent runaway loops where the model calls tools repeatedly without
  making progress (infinite tool call loops).
- **Output validation** -- Before `write_file` executes, validate that the content is sane
  (not empty, not binary garbage, within size limits).
- **Audit logging** -- Every tool call and its arguments should be logged with a timestamp
  for later review and dispute resolution.
- **Sandboxed execution** -- For nodes that will run code (a future tool), execution must
  happen in an isolated environment (Docker, VM, or similar).

### Expanded Tool Suite

The current five tools are enough for development use. A production contributor node will need:

**Filesystem**
- `patch_file(path, diff)` -- Apply a diff rather than overwriting the whole file
- `delete_file(path)` -- Delete a file
- `search_files(query, directory)` -- Grep/search across files

**Code execution**
- `run_python(code)` -- Execute Python in a sandbox and return stdout/stderr
- `run_shell(command)` -- Execute a shell command in a sandboxed environment
- `run_tests(path)` -- Run the test suite and return results

**Web / external**
- `web_search(query)` -- Search the web and return results (for research tasks)
- `fetch_url(url)` -- Fetch and return the text content of a URL
- `call_api(url, method, body)` -- Make an HTTP request

**OpenWork network**
- `submit_result(task_id, output)` -- Submit completed work back to the network
- `request_verification(task_id)` -- Request another node to verify output
- `get_task(task_id)` -- Fetch a task's full context from the network

### Improved Context Management

- **Auto-context** -- Automatically detect which files are relevant to a task using
  a vector similarity search over the repo, rather than requiring the user to specify `-f`.
- **Persistent memory** -- Store summaries of past sessions in a local vector store
  so the agent can recall prior context without reloading full files.
- **Chunking** -- For files larger than the context window, automatically chunk and
  summarize rather than truncating.

### Multi-Model Support

- Route different task types to different models (e.g., coding → codellama, writing → llama3.1)
- Fall back to a faster/smaller model for simple subtasks
- Support for multimodal models (image input) for visual tasks

### Reliability

- Retry logic for failed tool calls
- Detect and break infinite tool call loops
- Graceful handling of model loading errors
- Session save/restore (serialize message history to disk)

---

## Relationship to the OpenWork Network

The local agent is the foundation of the contributor node.

When the OpenWork network protocol is built, a contributor node will be:

```
OpenWork network task arrives
        |
        v
Node receives task + context + allowed tools
        |
        v
agent.py (or its successor) executes the task
        |
        v
Output submitted back to network
        |
        v
Verification layer checks quality
        |
        v
Contributor earns reputation/payment
```

Every improvement to the local agent -- better tools, security hardening, reliability --
directly improves the network's capability.

Building the local agent first is the right order. It lets us develop and test
the execution layer without needing the full network infrastructure in place.

---

## Files

```
agent.py                          -- the agent script (run this)
docs/agent/overview.md            -- this document
docs/setup/local-model-guide.md   -- Ollama install and model guide
docs/setup/ollama-explainer.md    -- deep dive on how Ollama works
```
