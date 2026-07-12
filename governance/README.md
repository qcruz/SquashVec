# Governance

A solo (expandable to 1–4 player) strategy card game about guiding a civilization across six competing categories. Built entirely in the browser — no server, no dependencies, open `index.html` to play.

---

## How to Play

Each player starts with **10 points** in every category.

- **Win:** Push any category to **20 points**
- **Lose:** Let any category fall to **0 points**

On your turn you draw a card and play one card from your hand. Cards either build up your civilization (stacking resources, upgrading institutions) or threaten it (hazards, instability). Every decision trades off progress in one area against risk in another.

---

## The Six Categories

| Category | Role |
|----------|------|
| **Governance** | Prerequisite for advanced plays; best at clearing instability |
| **Economy** | Fast point growth; consumes environment; generates instability |
| **Culture** | Slow and powerful; hard to stabilize; strong late game |
| **Military** | Enables disruption; supports governance; adds cultural pressure |
| **Technology** | Mid-game strength; costly to culture; amplifies other categories |
| **Environment** | Resource base for the whole civilization; depleted by economy and technology |

---

## Card Types

**Identity cards** — One active per category at a time. Playing a new identity replaces the old one (displaced card goes to instability or discard depending on the card). Each identity has a point value and two play options.

**Stacking events** — Stack on top of your active identity card, adding their value to the category score. Most have a free option (stack on own category) and a redirect option (spend a resource from your stack to place the card anywhere).

**Hazard events** — Must be played immediately when drawn. Either absorb the hit (card goes to instability, subtracting from score) or pay a resource to mitigate (card shuffles back to deck).

**Utility events** — Special effects: instability removal, resource conversion, card draw, and resource management. Governance utility cards (the Management Philosophy family) are the primary recovery tool.

---

## Scoring

```
Category Score = 10 (base) + active identity value + sum(stack values) − sum(instability values)
```

Cards in your stack add to the score. Cards in instability subtract. Instability builds up when you can't mitigate hazards and when certain identity cards are displaced.

---

## File Structure

```
governance/
├── index.html              Open this in a browser to play
├── css/style.css           Visual theme
├── js/
│   ├── cards.js            All 206 card definitions + starter deck
│   └── game.js             Game engine, rendering, and effect resolution
└── docs/
    ├── design.md           Authoritative design rules
    ├── card-list.md        Full card reference with counts
    ├── effects-reference.md All card effect types and parameters
    ├── planned-cards.md    Cards in review queue
    └── session-log.md      Development session history
```

---

## Deck Composition

**206 cards total**

| Type | Count |
|------|-------|
| Identity (category) cards | 59 |
| Stacking events | 80 |
| Hazard events | 46 |
| Utility events | 21 |

---

## Recent Updates

### Session 3 — 2026-07-12
- **Sanctions redesigned** — now a stacking event (+1 Economy) with dual-cost options: pay Governance resource + discard a hand card (Opt 1), or remove Culture instability + discard a hand card (Opt 2)
- **3 new cards:** Disarmament (military utility — strip Military resources or convert to Technology), Social Upheaval (hazard — discard 3 hand cards to avoid instability), Destabilization (military stacking +3 — place as Culture instability drain or convert Governance to +3 Culture)
- **Bug fixes:** Artistic Movement Opt 2 now correctly filters to Governance instability only; Preparedness Opt 1 description corrected; Trade Routes Opt 1 now pays Economy to stack on Culture
- **6 new engine effects** added to support new card mechanics
- **`docs/card-list.md`** fully overhauled with accurate 206-card counts and composition tables

### Session 2 — 2026-07
- **10 Management Philosophy cards** added (Consolidation, Structural Consolidation, Managed Decline, Rationalization, Austerity, Preparedness, Crisis Protocol, Grand Strategy, Redundancy Systems, Adaptive Management) — all Governance utility, all recycle back to deck
- **All hazard cards are now must-play when drawn** — resolved immediately on draw
- **Resource costs now always remove the oldest resource** from the stack — no player choice on which to spend
- **Must-play indicator** added to card detail panel
- **`docs/effects-reference.md`** created — complete reference of all card effect types

### Session 1 — 2026-07
- **Hand card color tinting** — stacking events (green), hazard events (red), identity cards (gold)
- **Environment stacking cards** added — Dense Forests, Mineral Deposits, Rare Plants, Rich Soil, Natural Springs, Coastal Fisheries, Frozen Tundra
- **Military Exercise** card added
- **`docs/planned-cards.md`** created — staging area for new card ideas before implementation
