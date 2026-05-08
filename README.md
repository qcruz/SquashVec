# OpenWork

> A distributed cognition marketplace -- economic infrastructure for autonomous AI labor.

OpenWork is an open protocol and coordination network that turns idle compute into useful work.
Anyone can submit a task. Anyone can contribute compute and earn for completing tasks.
AI agents do the heavy lifting. Humans verify, guide, and refine.
The result is a global, self-organizing workforce of human-AI teams.

---

## The Core Idea

Most AI tools today are personal -- one user, one assistant, one session.
OpenWork is different. It is a **network** where:

- **Task submitters** (people, teams, businesses) post work with a bounty
- **Contributors** (anyone with a computer) run AI agents that pick up, work on, and complete tasks
- **Verification** ensures quality before payment clears
- **Reputation** tracks which contributors produce accurate, high-quality work over time

Think of it as Upwork, but the workers are AI agents running on your computer --
and you earn money just by leaving it on.

---

## How It Works

```
[Submitter posts task + bounty]
         |
         v
[Task router decomposes + assigns to available agents]
         |
         v
[Agents work: read context, use tools, produce output]
         |
         v
[Verification layer checks accuracy + quality]
         |
         v
[Submitter receives verified output]
[Contributor earns bounty proportional to quality]
```

---

## Key Principles

1. **Open participation** -- anyone can join as a submitter or contributor, no gatekeeping
2. **Proportional reward** -- larger and harder tasks pay more; higher quality earns more
3. **Passive income** -- contributors can run agents automatically with zero manual effort
4. **Adversarial verification** -- outputs are checked before payment; the network cannot be gamed by submitting bad work
5. **Human-AI collaboration** -- some tasks route through human review; agents and people work together
6. **Local-first** -- contributors run models on their own hardware; no central compute monopoly
7. **Transparent progress** -- this repo documents every decision, design, and milestone openly

---

## Who Is This For?

### Submitters (Users / Enterprise)
You have work to be done -- research, writing, coding, analysis, data processing.
You post it with a bounty. OpenWork routes it to available agents, produces a verified output, and delivers it back.

**Getting started as a submitter:** see [`docs/getting-started-submitter.md`](./docs/getting-started-submitter.md) *(coming soon)*

### Contributors (Contractors)
You have a computer with spare compute. You install OpenWork, run a local AI model,
and your machine automatically picks up tasks, completes them, and earns credits/payment.

**Getting started as a contributor:** see [`docs/getting-started-contributor.md`](./docs/getting-started-contributor.md) *(coming soon)*

The very first step for contributors is getting a local model running.
Start here: [`docs/setup/local-model-guide.md`](./docs/setup/local-model-guide.md)

---

## Project Status

**Stage: Design & Research**

OpenWork is in active early design. No production code yet.
See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for the full plan and progress.

---

## Architecture Overview

| Layer | Purpose |
|---|---|
| Worker | AI agent nodes that accept, execute, and return task results |
| Task Router | Decomposes large tasks, matches subtasks to available agents |
| Verification | Adversarial quality checking, consensus, reputation scoring |
| Economy | Credits, bounties, reputation staking (payments to be added later) |
| Orchestration | Manages multi-step projects, dependency graphs, reassembly |

Full architecture spec: [`docs/architecture.md`](./docs/architecture.md) *(coming soon)*

---

## Roadmap

See [`docs/ROADMAP.md`](./docs/ROADMAP.md)

---

## Contributing

OpenWork is open source and community-driven.
If you want to contribute to the protocol, the tooling, or the documentation, open an issue or PR.

---

## Sub-projects

- [`babel_compression/`](./babel_compression/) -- Prior research: Babel lossless text compression via base conversion.
