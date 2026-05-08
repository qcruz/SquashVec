# OpenWork -- Full Project Roadmap

This is the master planning document for the OpenWork project.
It covers every phase of development from the current local agent prototype
through to a fully operational distributed AI labor network.

Each phase has detailed milestones. Work through them in order.
Check items off as they are completed. This document should be updated
whenever scope changes or new requirements are discovered.

**Current status: Phase 1 in progress.**

---

## Phase 0: Foundation -- COMPLETE

- [x] Define project concept and guiding principles
- [x] Name the project (OpenWork)
- [x] Write public-facing README with vision, user types, and architecture overview
- [x] Define the two participant types: Submitters and Contributors
- [x] Set up GitHub repo with SSH deploy key
- [x] Install and verify Ollama on macOS Apple Silicon
- [x] Download llama3.1:8b model and verify inference
- [x] Write Ollama explainer (risks, limitations, how it works)
- [x] Build agent.py -- interactive tool-calling chat with file and git access
- [x] Implement core tools: read_file, write_file, list_directory, git_commit, git_push
- [x] Configure `openwork` shell alias
- [x] Write agent system overview and future roadmap
- [x] Write initial phased roadmap

---

## Phase 1: Local Agent Hardening

Before anything else, the local agent must be reliable, safe, and capable enough
to be used for all subsequent development work on this project. Every improvement
here directly translates to a better contributor node later.

### 1.1 Security

- [ ] **Path sandboxing** -- restrict read_file and write_file to the repo workspace directory only.
      Any attempt to access paths outside the repo root must be blocked and logged.
- [ ] **Tool allowlisting per session** -- define a permission model where sessions can be
      started with a restricted tool set (e.g., read-only, no git push).
      Command line flags: `--allow read_file,write_file` etc.
- [ ] **Ollama API authentication** -- add a token-based auth layer in front of
      localhost:11434 so only authorized processes can call it.
      Relevant for when the machine is shared or on a local network.
- [ ] **Rate limiting on tool calls** -- detect and break infinite tool-call loops.
      If the model calls more than N tools in a single turn without producing text output,
      halt and report the loop to the user.
- [ ] **Output size limits** -- prevent write_file from writing files over a configurable
      size threshold (default: 1MB). Protect against runaway content generation.
- [ ] **Audit log** -- append every tool call (name, arguments, result, timestamp) to
      a local log file (`~/.openwork/audit.log`). Never log file contents by default,
      only metadata. Configurable verbosity.
- [ ] **Confirmation prompts for destructive actions** -- git_commit and git_push should
      require explicit user confirmation unless a `--auto-approve` flag is set.

### 1.2 Expanded Tool Suite

#### Filesystem
- [ ] **patch_file(path, search, replace)** -- surgical string replacement in a file
      instead of full overwrite. Safer and faster for edits to existing files.
- [ ] **search_files(query, directory, file_pattern)** -- grep across files in the repo.
      Returns matching lines with file paths and line numbers.
- [ ] **delete_file(path)** -- delete a file (sandboxed, with confirmation prompt).
- [ ] **create_directory(path)** -- create a new directory.
- [ ] **move_file(src, dst)** -- rename or move a file within the sandbox.

#### Code Execution (sandboxed)
- [ ] **run_python(code, timeout)** -- execute Python code in an isolated subprocess.
      Capture stdout, stderr, and return code. Hard timeout (default 30s).
      No filesystem access inside the sandbox beyond what is explicitly passed.
- [ ] **run_tests(path)** -- run the test suite at a given path using pytest.
      Return pass/fail counts and failure details.
- [ ] **run_shell(command, timeout)** -- execute a shell command in a restricted
      environment. Allowlist of permitted commands only (no rm, no curl, etc.)

#### Web & External
- [ ] **web_search(query, num_results)** -- search the web and return a list of
      results (title, URL, snippet). Use a free search API or scrape DuckDuckGo.
- [ ] **fetch_url(url)** -- fetch the text content of a URL. Strip HTML, return
      readable text. Respect robots.txt. Configurable timeout.

#### Git (expanded)
- [ ] **git_status()** -- return current git status (staged, unstaged, untracked files).
- [ ] **git_diff(path)** -- return the diff for a specific file or the whole repo.
- [ ] **git_log(n)** -- return the last N commit messages.
- [ ] **git_branch(name)** -- create and switch to a new branch.

### 1.3 Context & Memory

- [ ] **Auto-context detection** -- when starting a session, scan the repo structure and
      build a lightweight index (file names, sizes, first lines). Include this index
      in the system prompt so the model knows what exists without reading everything.
- [ ] **Large file chunking** -- for files larger than 32k tokens, automatically split
      into overlapping chunks and summarize before injecting into context.
- [ ] **Session persistence** -- serialize the message history to a JSON file at session
      end. Resume with `openwork --resume` to reload prior context.
- [ ] **Named sessions** -- `openwork --session architecture` to maintain separate
      named conversation threads for different workstreams.

### 1.4 Usability

- [ ] **Multi-file /load glob support** -- `/load docs/*.md` to load all matching files at once.
- [ ] **Response formatting** -- detect whether the terminal supports color and apply
      syntax highlighting to code blocks in responses.
- [ ] **Progress indicator** -- show a spinner or elapsed time while waiting for a
      response, since llama3.1 can take 5-15 seconds on first token.
- [ ] **Token usage display** -- after each response, optionally show prompt token count
      and context window usage percentage.
- [ ] **Model switching mid-session** -- `/model mistral` to switch model without
      restarting the session.

### 1.5 Testing

- [ ] Unit tests for all tool functions (read, write, patch, search, git operations)
- [ ] Integration test: start agent, send a prompt, verify tool call is executed
- [ ] Security tests: verify path sandbox blocks access outside repo root
- [ ] Loop detection test: mock a model that calls tools infinitely, verify halt behavior

---

## Phase 2: System Architecture Design

Define the full technical architecture of the OpenWork network before writing
any network code. Every component should be designed on paper first.

### 2.1 Network Topology

- [ ] **Define network roles formally**
  - Submitter: posts tasks, pays bounties, receives output
  - Contributor node: executes tasks, earns credits
  - Coordinator: routes tasks, manages queue, tracks state
  - Verifier: checks output quality (can be same node or dedicated)
- [ ] **Define coordinator architecture** -- single central coordinator for MVP,
      multi-coordinator federation for v2, fully decentralized for v3.
      Document the progression and the tradeoffs at each stage.
- [ ] **Define communication protocol** -- REST vs WebSocket vs message queue.
      Nodes need to receive tasks in near-real-time; HTTP polling is simplest,
      WebSocket is more efficient. Choose and justify.
- [ ] **Write architecture.md** -- full system diagram, component descriptions,
      data flow, and design decision log.

### 2.2 Task Schema

- [ ] **Define the Task object** with all fields:
  - `task_id` (UUID)
  - `type` (text, code, research, analysis, data, multimodal)
  - `title` (short human-readable summary)
  - `description` (full instructions for the agent)
  - `context_files` (list of file attachments with content)
  - `output_spec` (what format the output should be: markdown, JSON, code, etc.)
  - `quality_threshold` (minimum verification score to accept, 0.0-1.0)
  - `bounty` (credit amount offered)
  - `deadline` (optional Unix timestamp)
  - `max_retries` (how many times to reassign if verification fails)
  - `require_human_review` (boolean)
- [ ] **Define Task state machine**:
  `DRAFT → OPEN → ASSIGNED → IN_PROGRESS → SUBMITTED → VERIFYING → VERIFIED → CLOSED`
  with failure states: `FAILED`, `DISPUTED`, `EXPIRED`
- [ ] **Define task decomposition rules** -- when and how a large task is split
      into subtasks, how subtask dependencies are tracked, how results are reassembled.
- [ ] **Define task types in detail** -- for each type (text, code, research, etc.),
      specify: accepted input formats, expected output format, verification method,
      typical bounty range, estimated completion time.

### 2.3 Node Protocol

- [ ] **Define node identity** -- each node has an Ed25519 keypair. Public key is the node ID.
      Private key signs all submissions. Key generated on first run, stored locally.
- [ ] **Define capability advertisement** -- nodes announce: models available, task types
      accepted, max context size, estimated tokens/second, geographic region (optional).
- [ ] **Define node registration** -- how a node joins the network (POST to coordinator,
      signs a challenge with its key, receives a session token).
- [ ] **Define heartbeat protocol** -- nodes ping the coordinator every N seconds.
      Coordinator marks nodes offline after M missed heartbeats.
      In-flight tasks are reassigned when a node goes offline.
- [ ] **Define task handshake** -- coordinator offers task → node accepts or declines →
      coordinator confirms assignment → node begins work → node submits result.
- [ ] **Define result submission format** -- includes: task_id, node_id, output content,
      output metadata (token count, model used, time taken), signature.

### 2.4 API Specification

- [ ] **Coordinator API** -- document all endpoints:
  - `POST /tasks` -- submit a new task (Submitter)
  - `GET /tasks/{id}` -- get task status and result
  - `GET /tasks/available` -- list tasks available for assignment (Contributor)
  - `POST /tasks/{id}/claim` -- claim a task (Contributor)
  - `POST /tasks/{id}/submit` -- submit completed work (Contributor)
  - `POST /nodes/register` -- register a new node
  - `POST /nodes/heartbeat` -- node keepalive
  - `GET /nodes/{id}` -- get node info and reputation
- [ ] **Write OpenAPI spec** (YAML) for all endpoints
- [ ] **Define authentication model** -- API keys for submitters, node keypair signatures
      for contributors.

---

## Phase 3: Task Routing Engine

Build the coordinator service that receives tasks, matches them to nodes, and
tracks state through the full task lifecycle.

### 3.1 Coordinator Service

- [ ] **Choose coordinator tech stack** -- Python (FastAPI) for consistency with agent.py,
      or Go for performance. Evaluate and decide.
- [ ] **Implement task queue** -- in-memory queue for MVP, Redis or similar for production.
      Tasks sit in queue until claimed by a node.
- [ ] **Implement node registry** -- track all registered nodes, their capabilities,
      current load, reputation score, and last heartbeat.
- [ ] **Implement task state machine** -- persist task state transitions with timestamps.
      Use SQLite for MVP, PostgreSQL for production.
- [ ] **Implement task assignment** -- when a node claims a task, lock it to that node.
      If the node goes offline or times out, release back to queue.
- [ ] **Implement result intake** -- receive submitted results, validate format and
      signature, transition task to VERIFYING state.

### 3.2 Matching Algorithm

- [ ] **Capability matching** -- only route a task to nodes that have the required
      model and support the task type.
- [ ] **Reputation weighting** -- prefer higher-reputation nodes for higher-bounty tasks.
      Allow low-reputation nodes to earn reputation on smaller tasks.
- [ ] **Load balancing** -- track active task count per node. Do not overload nodes
      that are already near capacity.
- [ ] **Redundant assignment** -- for tasks above a bounty threshold, assign to N nodes
      simultaneously for consensus verification. Define N and the threshold.
- [ ] **Geographic routing** (optional) -- route tasks to nodes in the same region
      as the submitter to minimize latency for time-sensitive tasks.
- [ ] **Fallback and retry** -- if no node accepts a task within T seconds, increase
      bounty by X% and requeue. After K retries, mark task as FAILED and refund submitter.

### 3.3 Context & File Delivery

- [ ] **File storage** -- submitters attach files when posting tasks. Define where these
      are stored (object storage like S3, or IPFS for decentralized option).
- [ ] **Secure file delivery** -- files are encrypted at rest, decrypted only by the
      assigned node using its keypair.
- [ ] **Large context handling** -- if total task context exceeds the assigned node's
      model context window, the coordinator automatically chunks and sequences the task.

---

## Phase 4: Verification & Evaluation Engine

This is the trust layer. No output should be accepted or paid for without passing
verification. Verification must be adversarial -- it cannot be gamed by the node
that produced the output.

### 4.1 Verification Architecture

- [ ] **Define verification tiers** by task type and bounty size:
  - Tier 1 (low bounty): automated LLM-as-judge only
  - Tier 2 (medium bounty): LLM judge + consensus (2-of-3 node agreement)
  - Tier 3 (high bounty): LLM judge + consensus + optional human review
  - Tier 4 (critical): mandatory human review before payment
- [ ] **Assign verification to independent nodes** -- the verifying node must not be
      the same as the executing node. Coordinator enforces this.
- [ ] **Define verification compensation** -- verifiers earn a smaller credit reward
      (e.g., 10-20% of the task bounty) for performing verification work.

### 4.2 Automated Verification

- [ ] **LLM-as-judge implementation** -- send the original task description + output
      to a separate model with a structured evaluation prompt. The judge scores:
  - Completeness: did it answer all parts of the task?
  - Accuracy: are factual claims verifiable / plausible?
  - Format compliance: does the output match the requested output_spec?
  - Quality: is the output well-written, well-structured, correct?
  - Score: 0.0 to 1.0 overall
- [ ] **Format validation** -- for structured output types (JSON, code), run a parser
      to verify the output is syntactically valid before sending to the LLM judge.
- [ ] **Code execution verification** -- for coding tasks, run the submitted code
      against a test suite (if provided) and include test pass rate in the score.
- [ ] **Plagiarism / copy-paste detection** -- flag outputs that are verbatim copies
      of the input context. Nodes should transform and synthesize, not copy.

### 4.3 Consensus Verification

- [ ] **Multi-node consensus** -- for Tier 2+, collect outputs from N independent nodes.
      Compare outputs using semantic similarity. Accept if majority agree.
- [ ] **Weighted consensus** -- weight each node's vote by its reputation score.
      A high-reputation node's agreement counts more than a new node's.
- [ ] **Disagreement handling** -- if nodes disagree beyond a threshold, escalate to
      human review. Log the disagreement for reputation scoring.

### 4.4 Human Review Queue

- [ ] **Build human review interface** -- a simple web UI where a human reviewer can
      read the task, read the output, and approve/reject with optional feedback.
- [ ] **Reviewer identity and compensation** -- human reviewers are also Contributors.
      They earn credits for each review. Reviewer reputation tracked separately.
- [ ] **Escalation triggers** -- define exactly what causes escalation:
      LLM judge score below threshold, node consensus failure, submitter dispute.

### 4.5 Dispute Resolution

- [ ] **Submitter dispute** -- submitter can dispute a verified result within a
      time window. Dispute triggers human review regardless of tier.
- [ ] **Node appeal** -- a node whose submission was rejected can appeal once.
      Appeal goes to human review. If appeal succeeds, node is not penalized.
- [ ] **Dispute outcome effects** -- if dispute upheld: submitter refunded,
      node penalized. If dispute rejected: submitter loses dispute fee,
      node reputation unchanged.

---

## Phase 5: Reputation & Credit System

### 5.1 Reputation

- [ ] **Define reputation score formula**:
  - Base score starts at 0.5 for new nodes
  - Each verified accepted submission: +W_accept * (quality_score - 0.5)
  - Each rejected submission: -W_reject
  - Each successful verification: +W_verify_correct
  - Each incorrect verification (later proven wrong): -W_verify_wrong
  - Inactivity decay: score drifts toward 0.5 at rate D per day inactive
  - Define all weights (W) and decay rate (D) empirically during beta
- [ ] **Reputation tiers** -- define named tiers (e.g., New, Trusted, Expert, Elite)
      with minimum scores. Higher tiers unlock higher-bounty tasks.
- [ ] **Reputation staking** -- for high-bounty tasks, nodes must stake reputation.
      Failed verification burns a portion of staked score. Creates skin-in-the-game.
- [ ] **Public reputation ledger** -- all reputation changes are logged and visible.
      No hidden scoring. Nodes can audit their own history.

### 5.2 Credit System

- [ ] **Define credit unit** -- 1 credit = X minutes of average compute time.
      Peg to something stable and meaningful, not arbitrary.
- [ ] **Credit ledger** -- append-only log of all credit transactions.
      Each entry: from, to, amount, reason, task_id, timestamp.
- [ ] **Submitter credits** -- submitters purchase credits to post tasks.
      Define initial credit acquisition (faucet, purchase, or both).
- [ ] **Contributor earnings** -- credits earned = base_bounty * quality_multiplier.
      quality_multiplier range: 0.5x (barely passing) to 1.5x (exceptional).
- [ ] **Verifier earnings** -- credits earned = verification_fee (fixed per task tier).
- [ ] **Platform fee** -- coordinator retains X% of each bounty to fund infrastructure.
      Start at 10%, adjust based on sustainability.
- [ ] **Escrow model** -- submitter's credits are locked in escrow when task is posted.
      Released to contributor on verification pass. Returned to submitter on failure.
- [ ] **Credit transfer** -- nodes can transfer credits to other nodes or wallets.
      Define minimum transfer amount and any transfer fee.

### 5.3 Anti-Fraud

- [ ] **Sybil resistance** -- prevent one operator from running many fake nodes to
      farm credits. Options: proof-of-compute, stake requirement, rate limiting.
- [ ] **Collusion detection** -- detect when a node and its assigned verifier are
      operated by the same entity (same IP, same key family, coordinated behavior).
- [ ] **Wash trading** -- prevent nodes from submitting tasks to themselves.
      Coordinator must enforce that submitter and contributor are different entities.

---

## Phase 6: File Types & Task Functionality

Define exactly what kinds of work OpenWork can handle and build the supporting
infrastructure for each.

### 6.1 Supported Task Types (v1)

For each task type, define: input format, output format, verification method,
typical context size, and example use cases.

- [ ] **text/write** -- write an article, blog post, documentation, email, etc.
      Input: instructions + optional reference material.
      Output: markdown or plain text.
      Verification: LLM judge on completeness, quality, instruction compliance.

- [ ] **text/summarize** -- summarize a document or set of documents.
      Input: source documents + length/format instructions.
      Output: summary in requested format.
      Verification: LLM judge checks coverage and accuracy against source.

- [ ] **text/translate** -- translate text between languages.
      Input: source text + target language.
      Output: translated text.
      Verification: back-translation check + LLM judge.

- [ ] **code/generate** -- write a function, module, or script to spec.
      Input: specification + language + optional test cases.
      Output: code file(s).
      Verification: syntax check + test execution + LLM judge.

- [ ] **code/review** -- review code for bugs, style, and improvements.
      Input: code file(s) + review criteria.
      Output: structured review with line-level comments.
      Verification: LLM judge on coverage and specificity.

- [ ] **code/refactor** -- refactor existing code to a new pattern or standard.
      Input: original code + target pattern.
      Output: refactored code.
      Verification: test suite pass + diff size sanity check + LLM judge.

- [ ] **research/summarize** -- research a topic and produce a structured summary.
      Input: research question + depth requirements.
      Output: structured report.
      Verification: source citation check + LLM judge on accuracy.

- [ ] **data/analyze** -- analyze a dataset and produce insights.
      Input: CSV/JSON data + analysis instructions.
      Output: analysis report + optional visualizations.
      Verification: LLM judge + statistical sanity checks.

- [ ] **data/extract** -- extract structured data from unstructured text.
      Input: source text + extraction schema (JSON).
      Output: JSON matching the schema.
      Verification: JSON schema validation + LLM judge on accuracy.

### 6.2 File Attachment Support

- [ ] **Supported input file types**: .txt, .md, .pdf, .docx, .csv, .json, .py,
      .js, .ts, .html, .yaml, .toml, and other common text formats.
- [ ] **File size limits** -- define max file size per attachment and per task total.
- [ ] **PDF and DOCX extraction** -- convert binary formats to plain text before
      sending to model context.
- [ ] **Binary file handling** -- images and audio are out of scope for v1 (text only).
      Add multimodal support in a later phase.
- [ ] **Output file delivery** -- submitters receive output as downloadable files,
      not just text in a UI. Define file delivery mechanism.

### 6.3 Task Templates

- [ ] **Template library** -- pre-built task templates for common use cases.
      A submitter selects a template, fills in variables, and posts with one click.
- [ ] **Template schema** -- define template format: name, description, task_type,
      required inputs, default quality_threshold, suggested bounty range.
- [ ] **Initial templates**: blog post writer, code reviewer, document summarizer,
      data extractor, translation, README generator, test writer.

---

## Phase 7: Contributor Node Client

Build the production contributor client -- the software a contributor installs
to participate in the network and earn credits.

### 7.1 Installer & Setup

- [ ] **One-command installer** for macOS, Linux, and Windows.
      Installs Python, Ollama, downloads a recommended model, configures the node,
      and registers with the network.
- [ ] **Hardware detection** -- auto-detect RAM, CPU, GPU, and recommend the best
      model for the hardware. Show estimated tokens/second and earnings potential.
- [ ] **Node config file** -- `~/.openwork/node.yaml` with: node_id, keypair path,
      coordinator URL, accepted task types, model config, earnings log path.
- [ ] **First-run wizard** -- interactive setup that walks through every config option
      with sensible defaults. Requires no technical knowledge to complete.

### 7.2 Node Daemon

- [ ] **Background service** -- runs continuously, polls for tasks, executes them,
      submits results. Starts on login. Minimal resource use when idle.
- [ ] **Task polling** -- poll coordinator for available tasks every N seconds.
      Use exponential backoff when idle to reduce load.
- [ ] **Graceful shutdown** -- on SIGTERM/SIGINT, finish current task before stopping.
      Never abandon an in-progress task.
- [ ] **Crash recovery** -- if the node crashes mid-task, detect on restart and
      either resume or requeue the task.
- [ ] **Resource governor** -- user sets CPU and RAM limits. Node throttles itself
      to stay within limits. Useful for running in background without impacting other work.

### 7.3 Node Dashboard

- [ ] **Terminal dashboard** -- simple TUI showing: current task, queue status,
      earnings today/week/total, reputation score, uptime.
- [ ] **Web dashboard** (optional v2) -- browser-based UI with charts and history.
- [ ] **Earnings log** -- every completed task logged with: task_id, type, bounty,
      quality score, credits earned, time taken.

---

## Phase 8: Submitter Interface

### 8.1 CLI

- [ ] **Task submission CLI** -- `openwork submit` command with flags for all task fields.
- [ ] **File attachment** -- `--attach file.pdf` to include context files.
- [ ] **Status polling** -- `openwork status <task_id>` to check progress.
- [ ] **Result download** -- `openwork get <task_id>` to download output.
- [ ] **Balance check** -- `openwork balance` to see current credit balance.

### 8.2 Web UI

- [ ] **Task submission form** -- fill in task description, attach files, set bounty,
      choose task type and quality threshold.
- [ ] **Task dashboard** -- list of submitted tasks with status, progress, and results.
- [ ] **Result viewer** -- render output in browser (markdown, code with syntax
      highlighting, structured data as tables).
- [ ] **Credit management** -- buy credits, view transaction history, transfer credits.
- [ ] **API key management** -- generate and revoke API keys.

### 8.3 Programmatic API

- [ ] **REST API** -- full task submission and retrieval via API.
      Enables integration into third-party apps, CI/CD pipelines, etc.
- [ ] **Python SDK** -- `pip install openwork` with `openwork.submit()`,
      `openwork.status()`, `openwork.get()`.
- [ ] **Webhook support** -- submitters provide a callback URL, coordinator
      POSTs to it when task is complete.

---

## Phase 9: Infrastructure & DevOps

### 9.1 Development Infrastructure

- [ ] **CI/CD pipeline** -- GitHub Actions running tests on every push to main.
- [ ] **Test framework** -- pytest for Python components. Coverage targets per module.
- [ ] **Linting and formatting** -- ruff or flake8 + black enforced in CI.
- [ ] **Pre-commit hooks** -- run tests and linting before each commit.
- [ ] **Dependency management** -- requirements.txt or pyproject.toml for all components.

### 9.2 Coordinator Infrastructure

- [ ] **Coordinator deployment** -- define hosting: VPS (cheapest), cloud (scalable),
      self-hosted (decentralized ethos). Start with a small VPS for MVP.
- [ ] **Database** -- SQLite for MVP coordinator. PostgreSQL when load requires it.
- [ ] **Object storage** -- for task file attachments. S3-compatible (AWS, Backblaze B2,
      or self-hosted MinIO).
- [ ] **Monitoring** -- basic uptime monitoring and alerting (e.g., UptimeRobot).
- [ ] **Error tracking** -- log all coordinator errors with context for debugging.
- [ ] **Backup strategy** -- automated daily backups of the task database and ledger.

### 9.3 Security Infrastructure

- [ ] **TLS everywhere** -- all coordinator API traffic over HTTPS. No plaintext.
- [ ] **Secret management** -- API keys and private keys never in code or git.
      Use environment variables or a secrets manager.
- [ ] **DDoS protection** -- rate limiting on all public API endpoints.
- [ ] **Penetration testing** -- before public launch, audit coordinator API for
      common vulnerabilities (SQLi, auth bypass, IDOR, etc.)

---

## Phase 10: Network Security & Decentralization

### 10.1 Network-Level Security

- [ ] **Node authentication** -- all node-to-coordinator communication signed with
      the node's Ed25519 keypair. Coordinator verifies signature on every request.
- [ ] **Task poisoning prevention** -- validate all task inputs before routing.
      Detect and reject tasks designed to prompt-inject or manipulate agent behavior.
- [ ] **Sybil attack resistance** -- make it costly to spin up fake nodes.
      Options: proof-of-compute challenge on registration, minimum reputation stake,
      rate-limited registration.
- [ ] **Eclipse attack prevention** -- (for decentralized v2) ensure nodes see a
      diverse set of peers, not a controlled subset.

### 10.2 Decentralization (v2)

These items are deferred until the centralized MVP is stable and battle-tested.

- [ ] **Multiple coordinators** -- run N coordinators with shared state.
      Nodes can connect to any coordinator. Failover is automatic.
- [ ] **Coordinator consensus** -- coordinators agree on task state using a
      simple consensus protocol (Raft or similar).
- [ ] **Peer discovery** -- nodes find coordinators and other nodes without a
      hardcoded server list. Options: DNS-based discovery, DHT, or a bootstrap list.
- [ ] **Fully decentralized routing** -- long-term goal: no central coordinator at all.
      Task routing through a peer-to-peer protocol.
- [ ] **On-chain settlement** (optional) -- credit ledger anchored to a blockchain
      for trustless, auditable settlement. Deferred until community requests it.

---

## Phase 11: Public Launch

### 11.1 Beta

- [ ] **Closed beta** -- invite 10-20 known contributors. Run for 4-6 weeks.
      Fix all critical bugs. Collect feedback on setup experience and task quality.
- [ ] **Load testing** -- simulate 100+ nodes submitting and completing tasks.
      Identify and fix bottlenecks in routing, verification, and the ledger.
- [ ] **Security review** -- internal audit of all Phase 9/10 security items.

### 11.2 Documentation Site

- [ ] **Public documentation site** -- rendered from this repo's docs/ directory.
      Options: GitHub Pages, Docusaurus, or MkDocs.
- [ ] **Getting started guide** -- single page that gets a new contributor earning
      in under 10 minutes.
- [ ] **API reference** -- auto-generated from OpenAPI spec.
- [ ] **Architecture overview** -- public-facing diagram of how the system works.
- [ ] **FAQ** -- common questions about privacy, earnings, hardware requirements.

### 11.3 Community

- [ ] **Discord server** -- channels for: announcements, contributor support,
      submitter support, development, feedback.
- [ ] **GitHub Discussions** -- for longer-form proposals and design decisions.
- [ ] **Contribution guide** -- how to contribute to the codebase, docs, or protocol.

### 11.4 Payment Integration

- [ ] **Fiat on-ramp** -- submitters buy credits with a credit card (Stripe).
- [ ] **Fiat off-ramp** -- contributors cash out credits to bank account or PayPal.
      Define minimum withdrawal amount and processing time.
- [ ] **Tax documentation** -- contributors earning above a threshold receive
      the appropriate tax forms. Compliance varies by country.

### 11.5 Open Launch

- [ ] **Public announcement** -- blog post explaining the project, how it works,
      and how to join.
- [ ] **Product Hunt / HN launch**
- [ ] **Contributor growth target** -- define the target node count for a healthy
      network at launch (suggested: 50 active nodes minimum).
- [ ] **Submitter growth target** -- define minimum active submitters for network
      to be self-sustaining without subsidized tasks.

---

## Deferred / Future

Items that are acknowledged but explicitly out of scope until post-launch:

- Mobile contributor nodes (phone compute)
- Multimodal tasks (image input, audio, video)
- Specialized model fine-tuning for OpenWork task types
- Task marketplace / browsable job board UI
- Enterprise SLA tier with guaranteed turnaround time
- DAO governance for protocol changes (fee rates, task type standards, etc.)
- Cross-network bridges (interop with Bittensor, Fetch.ai, Akash)
- Agent-to-agent subcontracting (a node delegates subtasks to other nodes)
- OpenWork-native model training on verified task outputs
