# Governance — Design Rules & Game Mechanics

> **This is the authoritative design document.**
> All card additions, rule changes, and mechanical updates must be consistent with this document.
> Changes to this document require explicit owner confirmation.

---

## Overview

**Governance** is a solo (expandable to 1–4 player) strategy card game in which a player guides the development of a civilization across six competing categories. The game is designed around **simple rules with deep strategy** — every card is readable, every effect resolves immediately, and strategy emerges from how cards interact with each other over time.

Games progress through three phases:
- **Early Game:** Establish active cards in each category.
- **Mid Game:** Manage instability while upgrading institutions.
- **Late Game:** Push one or more categories toward 20 while preventing collapse.

---

## Objective

Each player begins with **10 points** in every category.

- **Win:** Any category reaches **20 points**.
- **Lose:** Any category falls to **0 points**.

Multiple categories can win or lose simultaneously.

---

## The Six Categories

Each player maintains six category slots. Each category has:
- One **active category card** (only one allowed at a time)
- A **stack** of event cards played on top of that category (any number)
- An **instability pile** of cards subtracted from the score

| Category | Strategic Role |
|----------|---------------|
| **Governance** | Prerequisite for advanced cards; removes instability efficiently |
| **Economy** | Fast point growth; generates instability; consumes Environment |
| **Culture** | Slow, powerful, hard to stabilize; strong late game |
| **Military** | Enables disruption; supports Governance; adds Culture instability |
| **Technology** | Mid-game strength; boosts Military; costly to Culture |
| **Environment** | Resource base; consumed by Economy and Technology; valuable late game |

---

## Scoring

```
Category Score = 10 (base) + active card value + sum(event stack values) − sum(instability values)
```

Example:
```
Governance
  Active:     Theocracy (+2)
  Event stack: Efficient Administration (+2)
  Instability: Political Assassination (−2)
  Score: 10 + 2 + 2 − 2 = 12
```

---

## Card Types

There are exactly **two card types**: Category Cards and Event Cards.

---

### Category Cards

Category cards represent the foundational institutions of a civilization. **Only one may be active per category at a time.**

- Playing a new category card **replaces** the current active card.
- The replaced card is **discarded** — the player chooses where it goes at the moment of replacement, using that card's printed discard options.
- A category card's **value** contributes to that category's score while it is active.

**Card anatomy (all category cards must have):**
- A point value
- **Two play options** (Option 1 and Option 2)
- **One or two discard options** (chosen at the time the card is removed from play, not when it is played)

**Environment category cards** use **vague geographic location names** rather than specific landmarks. Examples: The Great North, The Union, Oceana, The Waterlands, The Highlands. These represent territories controlled, not literal geography.

---

### Event Cards

Event cards do **not** replace the active category card. They resolve immediately and may:

- **Stack on the active category card** — adding their value to that category's score (positive events)
- **Go to an instability pile** — subtracting their value from that category's score (hazard events)
- **Produce a one-time utility effect** — draw cards, shuffle instability back into the deck, recover from damage, etc.

Event cards may also stack on categories as the result of certain effects.

**Card anatomy (all event cards must have):**
- **Two play options** (even if one is "suffer the consequence" vs. "mitigate at a cost")
- **One or two discard options** for when the card leaves play

**Key distinction:** An event card that stacks on a category does not replace the active category card. Both exist simultaneously. The category card is the foundation; event cards accumulate on top of it.

---

## Instability

Instability represents accumulated consequences. Cards in the instability pile subtract their value from that category's score.

- Instability remains visible and face up (it is the history of the civilization).
- Some cards allow instability to be removed or shuffled back into the draw deck.
- **Governance instability** is generally easier to remove.
- **Culture instability** is harder to remove but sometimes offers bonuses if accepted.

---

## Discard Rule

> **Discard options are chosen when a card is removed from play, not when it is played.**

When a category card is replaced by a new one, the removed card's **printed discard options** activate. The player then chooses which destination to use. If only one option exists, it applies automatically with no choice required.

This applies to both category cards being replaced AND event cards being removed from a stack.

---

## Turn Structure

1. **Draw** one card from the draw pile.
2. **Play** one card from your hand.
3. **Resolve** all effects immediately.
4. **Check** win/lose conditions.

---

## Solo Mode

In single-player mode:
- Event cards that reference "another player" or "an allied player" use the solo adaptation printed in the card's description.
- Typical solo adaptations: draw top card of deck as a substitute for a stolen card, add instability pressure instead of disrupting a player, etc.

---

## Card Design Principles

When designing new cards, follow these rules:

1. **Simple arithmetic only.** No tracking of complex variables; scores are always a simple sum.
2. **All effects resolve immediately.** No delayed or triggered abilities.
3. **Every card has two play options.** Both options should be meaningful. One should not be strictly better than the other in all situations.
4. **Discard destinations are on the card.** The card tells you where it can go when removed.
5. **Every decision creates tradeoffs.** High-value cards should cost something (requires, instability, losing a different card).
6. **Category cards are the foundation; event cards are the texture.** A civilization's identity is its active category cards.
7. **Environment cards are named as territories**, not specific resources. They feel geographic and large-scale.
8. **Winning should be difficult.** Cards with high values should have high requirements or significant costs.

---

## Category Card Roster (Current)

| Card | Category | Value | Requires |
|------|----------|-------|---------|
| Democracy | Governance | +2 | — |
| Theocracy | Governance | +2 | — |
| Alliance | Governance | +2 | — |
| Healthy Democracy | Governance | +4 | Democracy active + Culture ≥ 15 |
| Free Trade | Economy | +2 | — |
| Industrial Expansion | Economy | +4 | — |
| Green Investment | Economy | +3 | Environment ≥ 14 |
| Matriarchy | Culture | +2 | — |
| Patriarchy | Culture | +2 | — |
| Higher Education | Culture | +3 | — |
| Renaissance Culture | Culture | +5 | Governance ≥ 16 |
| Citizen Militia | Military | +1 | — |
| Warrior Tradition | Military | +3 | — |
| Practical Innovation | Technology | +1 | — |
| Centers of Learning | Technology | +2 | — |
| The Great North | Environment | +1 | — |
| The Highlands | Environment | +2 | — |
| The Waterlands | Environment | +2 | — |
| The Union | Environment | +3 | — |
| Oceana | Environment | +3 | — |

---

## Event Card Roster (Current / Planned)

| Card | Subtype | Primary Effect | Solo Mode |
|------|---------|----------------|-----------|
| Worker Strike | Hazard | Economy Instability −2 | Same |
| Political Assassination | Hazard | Governance Instability −2 | Same |
| Flood | Hazard | Environment Instability −2 | Same |
| Occupation | Utility | Take opponent's Environment card | Draw top card to Economy or Environment |
| Incursion | Utility | Disrupt opponent's Technology or Economy | Add −1 pressure to chosen category |
| Cultural Exchange | Utility | Ally removes Culture Instability | If Matriarchy active, remove 1 Culture Instability |
| Revisionist History | Recovery | Remove oldest card from any Instability pile | Same |
| Contingency Planning | Recovery | Shuffle 2 instability cards into deck | Same |
| Inspiring Speech (+1) | Stacking | Stack on any category as +1 | Same |
| Efficient Administration (+2) | Stacking | Stack on Governance | Remove 1 Governance Instability |
| Tax Collection (+2) | Stacking | Stack on Economy | Stack on any category as +1 |
| Cultural Festival (+2) | Stacking | Stack on Culture | Remove 1 Culture Instability |
| Military Campaign (+2) | Stacking | Stack on Military | Remove 1 Environment Instability |
| Scientific Breakthrough (+3) | Stacking | Stack on Technology | Stack on any category as +1 |
| Abundant Harvest (+2) | Stacking | Stack on Environment | Stack on Economy as +2 |

---

## Open Design Questions (Pending Owner Confirmation)

- [ ] Should stacked event cards stay in place when the active category card is replaced, or be cleared?
- [ ] Should there be a maximum hand size?
- [ ] Should event stacks have a maximum size per category?
- [ ] Should the "draw 1 card" bonus on Democracy's discard option remain?
- [ ] Are there planned multiplayer rules changes that affect card options?
- [ ] Should Alliance have different mechanics in multiplayer vs. solo?

---

*Last updated: 2026-07-10 — design doc created from original owner submission + session clarifications*
