# Governance — Project Status
*Last updated: 2026-07-11*

---

## Current State: Playable & Balancing

The core game loop is complete and functional. The deck is large enough to produce varied games. Strategic decisions feel meaningful. The main focus now shifts from "does it work" to "does it produce interesting choices."

---

## What Is Working Well

- **Resource economy** — Paying stack cards as costs creates real tension. Spending a resource to play an identity card always has a cost.
- **Identity card bonus** — Oldest instability removed automatically on Option 1 play. Fires before old card discards, so no timing exploits.
- **Instability pressure** — Hazard events threaten multiple categories simultaneously. Players cannot ignore instability.
- **Pass turn mechanic** — Players can pass when no card is playable. Only hazard-subtype events drawn on pass become must-play. Works correctly.
- **Option eligibility system** — Ineligible options are grayed out. Prevents cards from silently going to instability when resources are missing.
- **Hazard variety** — Each category has 4–6 distinct hazard events with different mitigation costs, creating category-specific strategic threats.
- **Environmental depth** — Environment category has the most resource stacking cards (10 varieties), giving it a strong role as the resource base.

---

## Known Gaps / Rough Edges

| Area | Issue |
|------|-------|
| design.md | Significantly out of date — references old card names and old mechanics |
| cards.md | Not maintained — card-list.md is the current reference |
| questions.md | Several open design questions not yet answered |
| Passive effects | `passiveEffect` field exists on Higher Education but the mechanic is not implemented in game.js |
| Multiplayer | All cards are solo-only right now; multiplayer rules are undesigned |
| End conditions | Win at 20, lose at 0 — no mid-game milestone triggers |
| No difficulty scaling | Deck composition is fixed; no way to make the game easier or harder |
| README.md | States 46-card deck; actual deck is ~196 cards |

---

## Deck Composition (Actual)

| Type | Count (approx.) |
|------|----------------|
| Identity cards | 42 |
| Resource stacking events | 43 |
| Hazard instability events | 40 |
| Utility / action events | 9 |
| Must-play events | 4 |
| **Total** | **~196** |

---

## Card Coverage by Category

| Category | Identities | Resources | Hazards | Notes |
|----------|-----------|-----------|---------|-------|
| Governance | 8 | 8 | 4 | Good coverage. Governance hazards mostly mitigated by Economy/Culture. |
| Economy | 6 | 7 | 6 | Heaviest hazard count. Economy under consistent pressure. |
| Culture | 8 | 4 | 5 | Fewest resources. Culture gains mostly from cross-category effects. |
| Military | 6 | 4 | 4 | Leaner by design — military is disruptive, not growth-focused. |
| Technology | 6 | 4 | 6 | Resources and hazards balanced. Tech is mid-game category. |
| Environment | 8 | 16 | 4 | Resource-rich by design. Functions as the game's "bank." |
| General | — | 4 | 8 | Cross-category hazards hit governance/economy hardest. |

---

## Balance Observations

- **Environment is dominant early** — 16 resource stacking cards gives Environment the most consistent scoring path. May want to add more resources for other categories or slightly reduce Environment's.
- **Culture is risky** — Fewest resource cards, slow to score, harder to recover. Intentional, but may frustrate new players.
- **Military is narrow** — Military works best as an enabler (Incursion, Occupation, Sanctions). As a scoring category it's harder to push toward 20. May want 1–2 more dedicated military resource events.
- **Economy generates the most instability pressure** — 6 economy hazards + 8 general hazards that route to economy. Economy score fluctuates most. This feels correct.
- **Governance is the stabilizer** — Many utility cards (Census, Revisionist History, Diplomatic Mission) clear instability. Governance is the backbone of recovery. Correct by design.
- **Technology is mid-game** — Low-value early identities (Pragmatism +1) with stronger payoffs later. Works as intended but the path to winning via Technology is least clear.

---

## Open Design Questions (from questions.md)

- Should stacked event cards stay in place when the active identity is replaced, or be cleared?
- Should there be a maximum hand size?
- Should event stacks have a maximum size per category?
- Should Alliance have different mechanics in multiplayer vs. solo?
