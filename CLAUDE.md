# Project Workspace — Claude Session Instructions

This repository is a **project planning workspace**. Each major project lives
in its own directory on `main` until it is ready to move to a dedicated repo.
Completed or paused projects are preserved on named branches.

---

## Active Project: Department of Economic Defense (DED)

**Directory:** `ded/`  
**Branch:** `main`  
**Status:** In progress

The DED project is a policy proposal for a federal department that maintains
living contingency plans for major economic disruptions. See `ded/README.md`
for the full structure.

### DED Session Protocol

At the start of each DED session, review:
1. `ded/README.md` — project overview and scenario index
2. `ded/status/` — current real-world data (update if stale)
3. Ask the user: **add new scenario**, **deepen existing scenario**, or **update status data**?

When deepening an existing scenario:
- Read the scenario's `overview.md` first
- Read the relevant `phase-*.md` files
- Read any referenced `supply-chains/` files
- Then write or expand content, following the methodology in `ded/framework/methodology.md`

When adding a new scenario:
- Copy the structure from `ded/framework/scenario-template.md`
- Create `ded/scenarios/<name>/overview.md` first
- Add it to the scenario table in `ded/README.md`

### Status Files

`ded/status/` contains regularly-updated snapshots of real economic data.
Each file has a `Last updated` header and a `TODO: update` section.
When data is clearly stale (>6 months old), flag it and prompt the user to update.

---

## Paused Projects

| Project | Branch | Description |
|---|---|---|
| OpenWork | `openwork` | Distributed AI labor marketplace. Agent.py local dev agent. |

To resume a paused project: `git checkout <branch>` and read its README.

---

## Repository Rules

- **Commit and push at the end of every session** (Claude + user sessions only)
- The Ollama local agent (`agent.py`) has no access to `git push` — remote is our backup
- Never commit secrets, API keys, or personal data
- Project files go in named subdirectories (`ded/`, `openwork/`, etc.)
- Agent infrastructure (`agent.py`, `docs/`) lives at the repo root

---

## Git Workflow

```bash
# End of session
git add -A
git commit -m "descriptive message"
git push git@github-squashvec:qcruz/SquashVec.git main
```

SSH remote alias: `github-squashvec` → uses `~/.ssh/compression_deploy_key`
