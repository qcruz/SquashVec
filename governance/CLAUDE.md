# Claude Instructions — Governance Card Game

This is the active development project. All work in this repo is focused on **Governance**, a solo strategy card game. Read this file fully at the start of every session.

---

## Project Files — Read Before Making Changes

| File | Purpose |
|------|---------|
| `docs/design.md` | Authoritative design rules and card anatomy — read before any card or mechanic change |
| `docs/card-list.md` | Full reference of every card in the deck with current counts |
| `docs/effects-reference.md` | All implemented effect types with parameters — consult before writing new card options |
| `docs/planned-cards.md` | Card ideas awaiting review — new ideas go here first, never directly to cards.js |
| `docs/session-log.md` | Running log of session changes — update at end of every session |

---

## Session Workflow

Follow this sequence each session. Not every step will produce changes — that is fine. The goal is consistent review coverage over time.

### 1. Review a Card
Pick a card at random (or one flagged in the previous session log) and read its full definition in `js/cards.js`. Check:
- Both options are meaningfully different and at least one is beneficial in solo play
- Cost is proportional to benefit (see balance notes below)
- Description matches the actual effect implementation
- discardTo destinations make thematic sense

If anything needs updating, fix it, note it in the session log.

### 2. Review Game Balance and Build-Out Opportunities
Look at the current deck composition (from `docs/card-list.md`) and consider:
- Are any card types over- or under-represented?
- Are there categories with weak or boring stacking options?
- Are hazards spread evenly across categories?
- Do utility cards offer enough decision variety?

Note findings in the session log even if no change is made.

### 3. Confirm Design Alignment
Before writing any code, verify that all proposed changes align with `docs/design.md`. If a change would require a new rule or mechanic not already in that document:
1. Describe the mechanic in plain language
2. Get explicit owner confirmation
3. Update `docs/design.md` first, then implement

Never implement unconfirmed mechanics.

### 4. Review Planned Cards — Recommend Next Step
Read `docs/planned-cards.md`. Identify:
- Any `[ready]` or `[draft]` cards that could be implemented this session
- Any `[idea]` cards worth promoting to `[draft]` based on current gaps
- The single highest-value next card or mechanic to implement

Present a recommendation but wait for owner confirmation before implementing.

### 5. Periodic Full Doc Sync
After approximately every 3 sessions (or when 10+ cards have changed), do a full sync of all docs:
- `docs/card-list.md` — verify every card and count is accurate
- `docs/effects-reference.md` — add any new effects, remove any deprecated ones
- `docs/planned-cards.md` — move implemented cards to the Implemented section
- `README.md` — update recent changes section

Track the last sync date in `docs/session-log.md`.

### 6. End of Session — Always
- Update `docs/session-log.md` with a brief summary of what changed
- Commit all modified files with a clear commit message
- Push to remote: `git push origin main` (remote: `git@github-squashvec:qcruz/SquashVec.git`)

---

## Design Notes

Core principles from `docs/design.md` — internalize these before proposing anything:

- **Two options per card, always.** Both must be meaningfully different. No card has one option or three.
- **At least one option must be beneficial in solo play.** Cards where both options are pure penalties are not acceptable.
- **All effects resolve immediately.** No ongoing passives, delayed triggers, or conditional persistent effects.
- **Resource costs always remove the oldest card** from the target stack — player never chooses which resource to spend.
- **Hazard subtype cards are must-play when drawn** — resolved before the player takes any other action.
- **discardTo is chosen at removal time**, never at play time. Never show a discard destination modal when a card is played.
- **Environment identity cards** must use geographic location names only (The Great North, The Union, etc.). No specific landmarks or resources.
- **Category identity cards:** only one active per category at a time. Playing a new one replaces the current.

### Balance Guidelines

| Card Type | Typical Cost | Typical Benefit |
|-----------|-------------|-----------------|
| Stacking (free) | Nothing | +1 to +2 on own category |
| Stacking (redirectable) | Pay 1 own resource | +1 on any category |
| Stacking (cross-category) | Pay 1 other resource | +2 on target category |
| Utility (single action) | None | Remove 1 instability OR draw 1–2 |
| Utility (resource cost) | Pay 1 resource | Remove 2–3 instability |
| Hazard (mitigatable) | Pay 1 resource | Avoid instability pile (card goes to deck) |
| Identity | Pay 1–2 resources | +1 to +5 on category (permanent while active) |

---

## Rules for Adding Cards

> **No card may be added to or modified in `js/cards.js` without explicit owner confirmation.**
> New ideas go to `docs/planned-cards.md` first.

> **This includes balance-motivated redesigns.** Even if a card's mechanics appear problematic (e.g. `allIdentitiesActive` conditions, `remove_one_from_each_stack` penalties), do NOT change the card design as a side effect of a balance or bug-fix session. Propose the change separately and wait for explicit approval. The correct balance lever is deck composition (STARTER_DECK counts), not card redesign.

When implementing a confirmed card:
1. Check `docs/effects-reference.md` — use an existing effect if possible
2. If a new effect is needed, implement it in `js/game.js` and document it in `docs/effects-reference.md`
3. Add the card to `js/cards.js` and to `STARTER_DECK`
4. Update `docs/planned-cards.md` (mark implemented) and `docs/card-list.md`

---

## Rules for Changing Game Mechanics

1. Propose the change in plain language and get owner confirmation
2. Update `docs/design.md` to reflect the new rule
3. Implement in `js/game.js`
4. Update `docs/effects-reference.md` if any effects changed

---

## Project Structure

```
governance/
├── index.html              Game entry point (open in browser, no server needed)
├── css/style.css           Dark MTG-inspired theme
├── js/
│   ├── cards.js            Card definitions + STARTER_DECK (206 cards)
│   └── game.js             Game engine: state, scoring, render, modals, effects
├── docs/
│   ├── design.md           Authoritative design rules
│   ├── card-list.md        Full card reference with deck counts
│   ├── effects-reference.md All implemented effect types
│   ├── planned-cards.md    Card ideas and review queue
│   ├── session-log.md      Running session history
│   └── README.md           Project overview (also at root)
├── README.md               Root readme — project summary and recent updates
└── CLAUDE.md               This file
```

---

## Session Checklist

- [ ] Read session-log.md to pick up from last session
- [ ] Review one card (random or flagged)
- [ ] Check balance and gaps in deck composition
- [ ] Confirm any changes align with design.md — escalate if not
- [ ] Review planned-cards.md and recommend next step
- [ ] If 3+ sessions since last sync: do full doc update
- [ ] Update session-log.md with what changed this session
- [ ] Commit all changes and push to remote
