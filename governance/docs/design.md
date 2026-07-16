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
- **Late Game:** Push one or more categories toward 16 while preventing collapse.

---

## Objective

Each player begins with **10 points** in every category.

- **Win:** Any category reaches **16 points**.
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
| **Environment** | Resource base for natural world and physical infrastructure; consumed by Economy and Technology |

**Environment design note:** Environment represents both a civilization's relationship with the natural world and the physical infrastructure built on it (roads, rails, settlements, ports). Cards in this category may reference either ecological resources or built infrastructure.

---

## Scoring

```
Category Score = 10 (base) + active card value + sum(event stack values) − sum(instability values)
```

Example:
```
Governance
  Active:      Theocracy (+2)
  Event stack: Efficient Administration (+1)
  Instability: Political Assassination (−2)
  Score: 10 + 2 + 1 − 2 = 11
```

---

## Card Types

There are exactly **two card types**: Category Cards and Event Cards.

---

### Category Cards

Category cards represent the foundational institutions of a civilization. **Only one may be active per category at a time.**

- Playing a new category card **always replaces** the current active card — no "stack or replace?" prompt.
- The replaced card is **discarded** — the player chooses where it goes at the moment of replacement, using that card's printed discard options.
- Identity card Option 1 **automatically removes the oldest instability** from that category before the previous card is discarded (if any instability exists). This resolution order matters: instability is removed first, then the old identity goes to discard.
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
- **There is no discard pile.** Cards that leave play go to either the instability pile or back into the draw deck (shuffled or placed at bottom). All cards cycle.

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

If a player cannot play any card from their hand (all options are ineligible), they may **pass their turn** without playing.

---

## Solo Mode

In single-player mode:
- Each card is designed with at least one option that is always available in solo play.
- Options that reference "another player" or "an allied player" **cannot be used** in solo play.
- **Solo multiplayer principle:** Options with comparative conditions (e.g., "if you have the highest Military score") always resolve to the harder outcome in solo — the player is assumed to be at a disadvantage relative to an implied opponent. This makes multiplayer-oriented cards deliberately harder in solo play, which is by design.
- If no viable option exists for a card, the card has no effect and is discarded.

---

## Card Design Principles

When designing new cards, follow these rules:

1. **Simple arithmetic only.** No tracking of complex variables; scores are always a simple sum.
2. **All effects resolve immediately.** No delayed or triggered abilities.
3. **Every card has two play options.** Both options should be meaningful. One should not be strictly better than the other in all situations.
4. **Discard destinations are on the card.** The card tells you where it can go when removed. No discard pile.
5. **Every decision creates tradeoffs.** High-value cards should cost something (requires, instability, losing a different card).
6. **Category cards are the foundation; event cards are the texture.** A civilization's identity is its active category cards.
7. **Winning should be difficult.** Cards with high values should have high requirements or significant costs.
8. **No zero-value cards.** All cards in the deck must have value ≥ 1.
9. **Philosophy/utility cards should implement their concept.** Management philosophy cards in particular should primarily move resources around the board rather than simply discarding them. If a card is named "Consolidation," its options should consolidate something.
10. **Confirmation required before implementation.** No card may be added to or modified in `js/cards.js` without explicit owner confirmation. Ambiguous requests must be clarified before implementation, not fixed after.

---

## Card Arc Design Principle

Card arcs (escalating cards like Crime → Criminal Conspiracy → Organized Crime) are **multipliers, not dependencies.** A card in an arc:
- Can always be played and mitigated on its own merits
- Becomes **harder to mitigate** (higher cost or additional damage) when a related card is already in an instability pile
- Never requires the previous arc card to be drawn or played first

Example: Organized Crime's standard mitigation costs 3 resources. If Criminal Conspiracy is already in an instability pile, the cost escalates to 4 resources. The lower card amplifies the threat but does not gate it.

---

## Resource Stack Order as Strategy

Resources are added to a stack in play order. The **stack position** of a resource matters:

- **Oldest resources** (bottom of stack) — used as cost by stronger hazard mitigations; long-term foundational investments
- **Newest resources** (top of stack) — used as cost by lighter management effects; recently acquired, more tactical

Design intent: players who protect valuable resources by playing them early (letting them sink to the bottom) gain resilience against heavy threats. Weak hazards take recent cards; strong hazards tear out foundational ones. Players should think about *when* they play resources, not just *which* ones.

This distinction is reflected in card wording:
- "Remove the **newest** resource from [stack]" — lighter cost, recent tactical card
- "Remove the **oldest** resource from [stack]" — heavier cost, foundational card threatened

---

## Card Penalty Severity Tiers

A reference guide for card design. Card face value should roughly correspond to the tier of penalty imposed.

| Tier | Penalty |
|------|---------|
| 1 | Place card at bottom of deck (card guaranteed to return) |
| 2 | Gain 1 instability in a player-chosen category |
| 3 | Gain 1 instability in a fixed category (no choice — harder than Tier 2) |
| 4 | Discard 1 card from hand |
| 5 | Lose oldest resource from one stack |
| 6 | Lose multiple resources (2–3) from one or more stacks |
| 7 | Discard a card from hand AND take instability |
| 8 | Lose resources from multiple stacks simultaneously |
| 9 | Lose your active identity card (not yet implemented) |
| 10 | Hostile cross-category effects (multiplayer) |
| 11 | Force opponent to lose identity card (multiplayer) |
| 12 | WMD-class effects: mutual resource loss + hand loss (multiplayer) |

No discard pile tier exists — consistent with the deck-cycling model. Tiers 10–12 are blocked until multiplayer is built.

---

## Strategic Depth — Core Player Patterns

This section documents the strategic depth the game is designed to reward. Use it as a guide for future card design — every new card should engage at least one of these patterns.

### 1. Resource Stack Management
Stack order is a form of strategy. A resource played early (bottom of stack) becomes a foundational investment — valuable and harder to dislodge. A resource played late (top of stack) is recent and tactical — cheaper to spend, first to be lost to light pressure. Players should consider *when* to play resources, not just whether to play them. Protecting valuable resources under newer ones allows the stack order to tell the story of the civilization's development.

### 2. Resource Exchange and Timing
The core decision every turn is whether to spend now, hold for a better opportunity, or redirect. Resources that are spent as costs leave play — this is never "free." High-value cards requiring two or three resources demand planning. Timing matters: spending in mid-game may prevent instability that would be catastrophic in the late game.

### 3. Synergy Optimization
Some cards reward board states: specific identity combinations, multiple stacks above a threshold, instability in a particular pile. Players who build toward these configurations gain outsized returns. Arc cards (Crime, Criminal Conspiracy) become harder to manage together — players who let one slide may face a compounded crisis later.

### 4. Risk Calibration
Six categories must be managed simultaneously. Letting one category slide creates pressure: instability in the pile, no resources available for mitigation, and future hazards arrive harder. The best players know which categories to sacrifice temporarily and when to push for a win vs. stabilize.

---

## Balance Guidelines

| Card Type | Typical Cost | Typical Benefit |
|-----------|-------------|-----------------|
| Stacking (free) | Nothing | +1 to +2 on own category |
| Stacking (redirectable) | Pay 1 own resource | +1 on any category |
| Stacking (cross-category) | Pay 1 other resource | +2 on target category |
| Utility (single action) | None | Remove 1 instability OR draw 1–2 |
| Utility (resource cost) | Pay 1 resource | Remove 2–3 instability |
| Hazard (mitigatable) | Pay 1 resource | Avoid instability pile (card goes to deck) |
| Hazard (multi-resource) | Pay 2–3 resources | Avoid instability pile |
| Identity | Pay 1–2 resources | +1 to +5 on category (permanent while active) |

---

*Last updated: 2026-07-15 — full sync from Sessions 5–6 design notes*
