# Project Workspace — Claude Session Instructions

This repository is a **project planning workspace**. Each major project lives
in its own directory on `main` until it is ready to move to a dedicated repo.
Completed or paused projects are preserved on named branches.

---

## Active Project: Department of Economic Defense (DED)

**Directory:** `ded/`
**Branch:** `main`
**Status:** In progress

---

## DED Mandate Philosophy — Read Before Writing Any Content

**The DED operates exclusively through economic and fiscal instruments.**
It does not implement rationing, manage emergency distribution, operate infrastructure,
or issue mandates. Those functions belong to FEMA, USDA, DOE, HHS, and state agencies.

**DED's instrument set:**
1. Strategic contracts (Types A/B/C/D) — financial incentives for private actors to
   maintain, build, or redirect capabilities the nation needs
2. Research programs (Accelerators, ERP) — produce IP and capabilities as national assets
3. Financial instruments — loan guarantees, tax credits, advance payment programs
4. CRHP civilian labor — low-cost, rapidly mobilizable workforce for infrastructure
   build-out and repair via the civilian reserve program
5. Economic intelligence — monitors leading cost indicators (energy, food, water,
   housing, manufacturing inputs) before they become crises

**All DED content must be framed economically:**
- Every intervention addresses a rising-cost concern (energy prices, food prices,
  water rates, housing costs, manufacturing input costs)
- These same cost increases directly raise the cost of military readiness — this is
  the constitutional defense justification for DED authority
- Phase files describe pre-built financial incentive packages, not crisis management protocols
- Do NOT write about rationing systems, emergency distribution, mandatory curtailment,
  or any operational crisis management — that is out of scope for DED

**The CRHP civilian force is a core DED tool:**
Mobilizable low-cost labor for infrastructure construction and repair, combined with
federal funding contracts that simultaneously serve as R&D programs and economic stimulus.
This dual-purpose model (Los Alamos pattern) is central to how DED builds capacity.

---

## Session Protocol — DED

### Start of Session
1. Verify remote is current: `git status` and `git pull origin main`
2. Read `ded/STATUS.md` — current project status and highest-priority areas
3. **Do not ask the user what to work on.** Select a file to build out using the
   selection process below and begin immediately.

### File Selection Process
At the start of each session, pick a target file using this priority order:

1. **Any file marked `[STUB]`** in any directory — stubs exist to be expanded
2. **The lowest-detail file in the highest-priority scenario** (check `ded/STATUS.md`)
3. **A randomly selected file** from the full project directory that has not been
   recently updated — use `git log --oneline ded/` to identify least-recently-touched files
4. **A new file** if all existing files are reasonably complete — follow stub creation
   rules below

Sessions may naturally fall into any of these modes:
- Deep-dive into a new or existing scenario (phase files, supply chains, status data)
- New policy tool or program analysis
- Radical new proposal or organizational concept
- Specific IP strategy, trade agreement structure, or value discovery entry
- Asset registry expansion or profile creation
- Economics updates (new historical data, scenario ROI refinement)
- Project cleanup, cross-referencing, and organization

All modes are valid. Pick whichever serves the project best given the current state.

### During the Session
- Work continuously without prompting the user for direction
- **Never present options and ask the user to choose.** When multiple valid paths exist,
  pick the highest-priority one per STATUS.md and begin immediately. State what you're
  doing in one sentence and proceed. The user will redirect if needed.
- Commit at natural milestones (completed file, completed section) — not only at session end
- Push to remote after each commit: `git push origin main`
- Cross-reference new content into existing files where relevant
  (e.g., new tool → add to tools/README.md; new scenario → add to ded/README.md)

### End of Session
1. Create **1–2 new stubs** in any category where content is thin or missing
   (see Stub Creation Rules below)
2. Update `ded/STATUS.md` to reflect what was completed and what the highest-priority
   next areas are
3. Verify all new files are committed and remote is current

---

## Stub Creation Rules

Every session ends with 1–2 new stub files. Stubs are placeholders that grow the
project surface area and ensure no category stays empty for long.

**A stub contains:**
- The standard header for its document type (scenario overview header, tool analysis
  header, profile header, etc.)
- A 2–4 sentence description of what this file will cover when fully built out
- A `[STUB — expand in future session]` marker at the top
- At least one section heading with `*TODO*` content

**Stub placement — pick from any of:**
- `ded/scenarios/<new-name>/overview.md` — new scenario not yet in the library
- `ded/tools/<new-tool>.md` — policy instrument not yet analyzed
- `ded/assets/profiles/<asset>.md` — Tier A or S asset without a profile
- `ded/proposal/<concept>.md` — new structural or legislative proposal
- `ded/economics/<analysis>.md` — new economic analysis
- `ded/status/<category>/<metric>.md` — new real-world tracking file

Stubs that turn out to be unnecessary can be removed in a cleanup session.
The cost of an unused stub is near zero. The cost of a missing stub is a forgotten idea.

---

## Project Current Status

*Updated: 2026-05*

### Highest-Priority / Most Impactful Completed Work

| Document | Why It Matters |
|----------|---------------|
| `ded/proposal/one-pager.md` | Primary pitch document; the entry point for all audiences |
| `ded/economics/benefits-summary.md` | Combined $6.3T–$13.2T expected benefit case; Category A (loss avoidance) + Category B (value creation) |
| `ded/economics/value-discovery.md` | 8 IP/platform opportunities; $84B investment → $31–99B/year revenue; trade agreement anatomy template |
| `ded/tools/expert-reserve-program.md` | Los Alamos model; 4 Accelerator program designs; competing-company recruitment doctrine |
| `ded/tools/strategic-contracts.md` | 4 contract types; full JCED congressional oversight framework; anti-pork provisions |
| `ded/proposal/civilian-reserve-health/` | Universal healthcare via military enrollment; phased solvency model; DED force multiplier |
| `ded/assets/README.md` + category files | 70+ assets scored on 4-dimension DED Score; Tier S/A/B/C classification |
| `ded/scenarios/oil-restriction/` | Most complete scenario; phases 1–3, demand policy, energy transition, 4 supply chains |
| `ded/scenarios/pandemic/` | Phases 1–3 complete; most directly relevant near-term scenario |

### Scenarios by Completion Level

| Scenario | Completion | Priority to Deepen |
|----------|------------|-------------------|
| Oil Restriction | High — phases + supply chains + demand policy + energy transition | Low |
| Pandemic | High — phases 1–3 complete | Low |
| Drought | Overview only | High |
| AI Unemployment | Overview only | High |
| Semiconductor Collapse | Overview only | Medium |
| Grid Cyberattack | Overview only | Medium |
| Rare Earth Denial | Overview only | Medium |
| Shipping Blockade | Overview only | Low |
| Financial Fragmentation | Overview only | Low |

### Key Gaps

- `ded/proposal/mission.md` — organizational charter, legal authority, budget — **not yet written**
- `ded/assets/profiles/` — only 2 of 8 planned profiles written (Mississippi River, National Labs)
- `ded/status/manufacturing/semiconductors.md` — referenced but not written
- Drought scenario has no phase files, supply chains, or status data
- AI Unemployment scenario has no phase files or tool connections
- `ded/tools/` — rationing systems, price controls, DPA invocation, business survival loans all referenced but not written

---

## DED Project Structure Reference

```
ded/
├── README.md               Scenario index and project overview
├── STATUS.md               Current status (this section, kept in-project)
├── proposal/               Legislative and structural proposals
│   ├── one-pager.md        Primary pitch document
│   ├── executive-summary.md
│   ├── civilian-reserve-health/
│   └── mission.md          [NOT YET WRITTEN]
├── framework/              Methodology, templates, doctrine
├── scenarios/              One directory per disruption scenario
│   └── <name>/
│       ├── overview.md
│       ├── phase-1-*.md
│       ├── phase-2-*.md
│       ├── phase-3-*.md
│       └── supply-chains/
├── assets/                 Strategic Asset Registry
│   ├── README.md           Scoring methodology
│   ├── physical-resources.md
│   ├── industrial-capacity.md
│   ├── critical-infrastructure.md
│   ├── research-institutions.md
│   ├── human-capital.md
│   ├── financial-infrastructure.md
│   └── profiles/           Deep-dive profiles for Tier S/A assets
├── economics/              Cost-benefit analysis and value creation
│   ├── benefits-summary.md Living summary document
│   ├── historical-baseline.md
│   ├── assumptions-log.md
│   └── value-discovery.md  IP and trade opportunity catalog
├── tools/                  Policy instrument library
│   ├── README.md           Catalog index
│   ├── stimulus-checks.md
│   ├── tax-advance-loans.md
│   ├── strategic-contracts.md
│   └── expert-reserve-program.md
└── status/                 Real-world data tracking files
    ├── energy/
    ├── food/
    ├── transportation/
    └── labor/
```

---

## Paused Projects

| Project | Branch | Description |
|---|---|---|
| OpenWork | `openwork` | Distributed AI labor marketplace. Agent.py local dev agent. |

To resume a paused project: `git checkout <branch>` and read its README.

---

## Repository Rules

- **Push to remote at the end of every session and after significant commits**
- The Ollama local agent (`agent.py`) has no access to `git push` — remote is our backup
- Never commit secrets, API keys, or personal data
- Project files go in named subdirectories (`ded/`, `openwork/`, etc.)

## Git Workflow

```bash
git add <specific files>
git commit -m "descriptive message"
git push origin main
```

SSH remote: `origin` → `git@github-squashvec:qcruz/SquashVec.git`
Uses `~/.ssh/compression_deploy_key`
