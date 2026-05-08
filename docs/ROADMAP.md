# OpenWork -- Roadmap & To-Do List

This is a living document. Pick up from wherever the checkboxes leave off.

---

## Phase 0: Foundation (Design & Research) -- IN PROGRESS

### 0.1 Documentation & Vision
- [x] Name the project (OpenWork)
- [x] Write guiding principles and goals (README.md)
- [x] Define the two user types: Submitters and Contributors
- [ ] Write `docs/architecture.md` -- full system architecture with diagrams
- [ ] Write `docs/getting-started-submitter.md`
- [ ] Write `docs/getting-started-contributor.md`
- [ ] Define the data model for a Task (fields, states, lifecycle)
- [ ] Define the data model for a Contributor node (identity, reputation, capacity)
- [ ] Define the verification protocol (how is output quality checked?)
- [ ] Define the reputation scoring formula

### 0.2 Local Model Research -- HIGH PRIORITY
- [x] Identify best free open-source models for local use
- [x] Write step-by-step local model setup guide (Ollama)
- [ ] Test guide on macOS (Apple Silicon)
- [ ] Test guide on macOS (Intel)
- [ ] Test guide on Windows
- [ ] Test guide on Linux
- [ ] Identify minimum hardware requirements per model tier
- [ ] Document which models are best for which task types (coding, writing, analysis, etc.)
- [ ] Evaluate model performance vs. resource usage tradeoffs

### 0.3 Competitive Research
- [ ] Deep-dive on Bittensor -- what works, what doesn't, what to avoid
- [ ] Deep-dive on Fetch.ai -- agent coordination patterns
- [ ] Deep-dive on Akash / io.net -- distributed compute lessons
- [ ] Review LangGraph / LangChain for orchestration patterns
- [ ] Review OpenClaw architecture for worker node design inspiration
- [ ] Document key lessons and design decisions in `docs/prior-art.md`

---

## Phase 1: Core Protocol Design

### 1.1 Task Specification
- [ ] Define Task schema (JSON/YAML)
  - [ ] Task ID, type, description, context, file attachments
  - [ ] Bounty amount, deadline, quality threshold
  - [ ] Task state machine: OPEN -> ASSIGNED -> IN_PROGRESS -> SUBMITTED -> VERIFIED -> CLOSED
- [ ] Define task decomposition rules (when/how a task is split into subtasks)
- [ ] Define task dependency graph format (for multi-step tasks)

### 1.2 Agent Node Specification
- [ ] Define node identity (keypair, node ID)
- [ ] Define node capability advertisement (what models it runs, what task types it accepts)
- [ ] Define node heartbeat / availability protocol
- [ ] Define task acceptance handshake
- [ ] Define result submission format

### 1.3 Routing Protocol
- [ ] Design task-to-node matching algorithm
  - [ ] Match on capability, reputation, current load
  - [ ] Fallback/retry on failure
- [ ] Design load balancing across available nodes
- [ ] Design redundant assignment (send same task to N nodes for verification)

### 1.4 Verification Protocol
- [ ] Define output quality metrics (task-type specific)
- [ ] Design consensus model (majority vote? weighted by reputation?)
- [ ] Design adversarial check (one node checks another's work)
- [ ] Define dispute resolution process
- [ ] Define what happens when verification fails (reassign, penalize, escalate to human)

### 1.5 Reputation System
- [ ] Define reputation score formula
  - [ ] Factors: accuracy rate, task completion rate, speed, consistency
- [ ] Define reputation decay (inactive nodes lose score over time)
- [ ] Define reputation staking (higher-value tasks require minimum reputation)
- [ ] Define reputation recovery (how to rebuild after a bad submission)

---

## Phase 2: Economy Design

### 2.1 Credit System (pre-payment phase)
- [ ] Define credit units and denomination
- [ ] Define how submitters purchase/earn credits
- [ ] Define how contributors earn credits
- [ ] Define platform fee / sustainability model
- [ ] Build credit ledger data model

### 2.2 Bounty Mechanics
- [ ] Define bounty pricing tiers by task complexity
- [ ] Define quality multiplier (higher-quality output earns bonus)
- [ ] Define split logic for tasks with multiple contributing agents
- [ ] Define escrow model (bounty held until verification passes)

### 2.3 Payment Layer (later phase)
- [ ] Evaluate fiat micropayment options (Stripe, Lightning)
- [ ] Evaluate crypto/token options if community demands it
- [ ] Design payment settlement flow

---

## Phase 3: MVP Build

### 3.1 Infrastructure
- [ ] Set up monorepo structure
- [ ] Choose primary language(s) for core protocol (Python likely for agent side)
- [ ] Set up CI/CD pipeline
- [ ] Set up test framework

### 3.2 Agent Node (Contributor Client)
- [ ] Build installer / setup script
- [ ] Integrate Ollama for local model management
- [ ] Build task polling loop (check network for available tasks)
- [ ] Build task executor (load context, run model, return output)
- [ ] Build result submission module
- [ ] Build node config UI (simple terminal or web UI)

### 3.3 Task Submission Client
- [ ] Build CLI for submitting tasks
- [ ] Build simple web UI for submitting tasks
- [ ] Support file/context attachment
- [ ] Support task status polling

### 3.4 Coordinator / Router
- [ ] Build central coordinator (can be centralized initially, decentralized later)
- [ ] Implement task queue
- [ ] Implement node registry
- [ ] Implement routing algorithm
- [ ] Implement verification orchestration

### 3.5 Verification Engine
- [ ] Build basic LLM-as-judge verifier (use a separate model to score output)
- [ ] Build consensus verifier for redundant assignments
- [ ] Build human escalation queue

---

## Phase 4: Network & Decentralization

- [ ] Design peer discovery (how nodes find each other without central server)
- [ ] Design coordinator redundancy (multiple coordinators, failover)
- [ ] Design fully decentralized routing (DHT or similar)
- [ ] Security audit: prevent task poisoning, sybil attacks, reputation manipulation
- [ ] Stress test with simulated network of N nodes

---

## Phase 5: Public Launch

- [ ] Public beta with real contributors
- [ ] Documentation site
- [ ] Community forum / Discord
- [ ] Submitter onboarding flow
- [ ] Contributor onboarding flow (download, install, earn)
- [ ] Monitoring / analytics dashboard
- [ ] First real-money payment integration

---

## Deferred / Future Ideas

- Mobile contributor nodes (phone compute)
- Specialized task types (image generation, voice, video)
- Task marketplace / browsable job board UI
- Enterprise API with SLA guarantees
- DAO governance for protocol changes
- Cross-network bridges (interop with Bittensor, Fetch.ai, etc.)
