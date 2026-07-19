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
- **Event stacks persist on replacement.** The new identity becomes the foundation; existing stacked event cards remain in place. Identity replacement does not clear the stack.
- **Identity card costs always remove the oldest resource** from the cost category — never the newest. This is enforced by the `replace_plus_stack_cost` effect default (index 0). No card may override this to use the newest resource.
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
- **There is no discard pile.** Cards that leave play go to either the instability pile or back into the draw deck (shuffled or placed at bottom). All cards cycle.

### Instability Difficulty Tiers

Not all instability is equally removable. The deck composition intentionally creates a **hidden difficulty hierarchy** across instability types. This is a core meta-challenge: experienced players learn to avoid the expensive types, while new players discover the cost the hard way.

| Tier | Category | Removal Difficulty | Design Intent |
|------|----------|--------------------|---------------|
| Easy | Governance | Most removal options in deck; many utility cards target Governance instability | Backbone recovery — lets players stabilize often |
| Medium | Economy, Military, Technology, Environment | Moderate removal options; category-specific tools exist | Manageable with the right identity setup |
| Hard | Culture | Fewest removal options in the deck; very few cards specifically remove Culture instability | The most expensive type — a long-term drag on any civilization |

**Design rules from this hierarchy:**
- The deck should always have significantly fewer Culture instability removal cards than Governance instability removal cards.
- Cards that route to Culture instability as a penalty should always include meaningful compensation — a card draw, a resource gain, or a score boost — because the player is accepting a hard-to-remove consequence.
- Cards that give the player a **choice** of instability destination should always make Culture one of the harder/cheaper options and reward accepting it appropriately.
- New card designs should respect this hierarchy: do not add Culture instability removal cards casually. Each one added reduces the meta-challenge.

**Example — Democracy:**
When replaced, Democracy can discard to Governance Instability (easy to remove) or Culture Instability + draw 1 card (hard to remove, compensated). The draw represents the societal value of retained democratic knowledge persisting as cultural memory even after the government form changes.

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

## Long Game Philosophy — Stacks, Instability, and Synergy

**There is no maximum stack size.** Large, deeply built stacks are the intended endgame state.

The game is designed around a **Jenga model of civilization**: resources and instabilities accumulate in parallel. As stacks grow, so do instability piles. The civilization becomes increasingly complex and precarious — held together by the synergies between the active identity cards and the events in play. A single surprise card (a new hazard, a must-play event, a discard-forcing event) can cascade into a dramatic reshaping of strategy — a military powerhouse pivoting to education, a theocracy collapsing into a trade republic.

### Instability Should Always Be Building

Instability pressure should never fully relent. The deck composition should ensure that no combination of utility cards can eliminate instability permanently. New hazard events, cross-category hazards, and must-play events ensure that instability is a constant feature of the late game, not a problem that gets solved.

**Design rule:** A late-game board should always have instability in at least 2–3 categories. Cards that remove instability should never outpace cards that add it across the full deck.

### Identity-Contingent Synergies

The primary mechanism for managing large, complex boards is **identity synergy**: cards that cost less, do more, or have entirely different effects when a specific identity is active.

This is the game's deepest strategic layer. A player who has built toward Dictatorship + Military identity combination can handle threats that would cripple a Republic + Culture setup — and vice versa. Choosing and committing to an identity combination is as important as any individual card play.

**Design rule for identity-contingent cards:**
- A card with a synergy cost should be noticeably cheaper or more powerful when the synergy condition is met
- The default cost (without the synergy) should be meaningfully harder — not just slightly worse
- Both paths must be playable (no option that requires a condition that can't be met in solo play)

**Example — Martial Law:**
- Dictatorship active: costs 1 Military resource → removes all Crime instability from all categories → discards to Governance instability
- Any other identity active: costs 1 Military + 2 Governance resources → removes all Crime instability → discards to Governance instability

This makes Dictatorship a genuinely powerful identity for crime-heavy board states, and gives the player a real reason to stay on it rather than upgrading to a higher-value identity.

---

## Hand Size

There is **no enforced maximum hand size.** Hand discipline is created organically by the deck itself:

- Most cards are designed to be played quickly — there is no benefit to holding cards indefinitely.
- Discard-forcing event cards (Social Upheaval, Criminal Conspiracy, Military Exercise, etc.) create a looming threat for players who accumulate large hands. Social Upheaval in particular can wipe the hand entirely.
- Holding cards is a deliberate risk, not a free option. The larger the hand, the more damage a single discard-forcing event can do.
- **Military "surprise" strategies** are the primary legitimate reason to hold multiple cards — building toward a concentrated play.

**Design rule:** Every set of new cards should include at least one discard-forcing event to maintain this pressure. Cards that force "discard your entire hand" (or "discard down to N") are high-value additions to the deck.

---

## Solo Mode and Multiplayer Card Design

**Every option on every card must be playable in solo.** There are no `multiplayer_only` dead options. A card option that requires another player to exist is a design error.

Cards that are *intended* for multiplayer disruption (Surprise Attack, Occupation, Sanctions, etc.) must be designed with **dual interpretations**:
- **Multiplayer:** affects an opponent's stack, identity, or instability pile
- **Solo:** equivalent self-affecting cost or benefit (e.g. gain a resource, remove instability, draw a card)

Both interpretations should feel thematically coherent. A Surprise Attack in solo might represent an internal military exercise or a border skirmish — something that has real domestic cost/benefit without requiring an opponent.

**Comparative conditions** ("if you have the highest Military score") resolve to the harder outcome in solo — the player is always assumed to be at a disadvantage relative to an implied opponent field.

**Design rule:** When designing any military disruption card, write the solo version first. If it doesn't stand on its own as a meaningful solo effect, redesign before adding the multiplayer interpretation.

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
| Exchange (value 1) | Remove 1 stack card | +1 on target category |
| Exchange (value 2) | Remove 1 stack card + discard 1 hand card | +2 on target category |
| Exchange (value 3) | Remove 2+ stack cards | +3 on target category |
| Utility (single action) | None | Remove 1 instability OR draw 1–2 |
| Utility (resource cost) | Pay 1 resource | Remove 2–3 instability |
| Hazard (mitigatable) | Pay 1 resource | Avoid instability pile (card goes to deck) |
| Hazard (multi-resource) | Pay 2–3 resources | Avoid instability pile |
| Identity | Pay 1–2 resources | +1 to +5 on category (permanent while active) |

### Exchange Card Balance Rule

An exchange card with value N must cost the player at least N cards removed from play (stack removals + hand discards). The raw score trade is at best break-even in isolation — value comes exclusively from identity multipliers, cross-category combos, and stack composition.

**Exchange cards should never be a net positive in isolation.** If a player gains +2 from placing an exchange card but only paid 1 stack card of value 1, the raw result is +1 — a small gain. The design target is break-even or slight loss, so that the win condition comes from building synergies, not from grinding individual cards.

### Intended Difficulty Curve

This game is designed so skill determines outcome:

- **Random play** — always lose. Uncoordinated stacking can't outpace instability accumulation over a full deck cycle.
- **Maximize each category score blindly** — ~50% win rate. Score-maximizing play is coherent but doesn't exploit cross-category combos or manage threat priorities.
- **Identify and execute cross-category combos** — meaningful win advantage. Players who build toward synergies (Alliance + Free Trade Agreement, identity stacks + exchange chains, instability mitigation timed to hazard density) will see consistent improvement.

### Culture and Environment Exchange Count

Culture and Environment intentionally have low exchange card counts. These categories represent ingrained social fabric and physical landscape — they respond slowly to directed human intervention. Players primarily influence them through:
- Identity cards (long-term institutional framing)
- Passive cross-category stacking (e.g. environment stacking events that also reference culture/technology)
- Occasional targeted exchange (limited options, always costly)

This asymmetry is a design feature, not a gap.

---

### Policy Card Design Rules *(Applies to policy-tagged utility cards only.)*

Policy cards trade costs — resource removals or hand discards — for instability removal or material gain. The key design variable is **cost weight**.

**Resource removal cost weight:**
- Removing **newest** resource: lighter cost
- Removing **oldest** resource: heavier cost — roughly equivalent to removing 2 instability cards

**Cross-category costs:** When beyond own category, Governance and Economy are default secondary cost categories. Example: Technology policy may cost 1 Technology + 1 Economy → remove 2 Technology instability.

**Option directions:**
- Pay resources or hand cards → remove instability
- **Discard/create instability → gain material (draw cards or stack a resource)**

**Level tiers** (card `value` field):
- Level 1 (value 1): single cost → 1–2 instability or minor gain
- Level 2 (value 2): cross-category cost, or 1 old resource → 2 instabilities, or combined
- Level 3 (value 3): multi-resource cost → large clearance or significant material

**Each category's policy set should include:**
- At least one card at each level (1, 2, 3)
- Primarily resource-cost Option A variants
- ~2 hand-discard variants per category mixed in for variety

---

---

## Planned Mechanics — Confirmed, Pending Implementation

These mechanics have been confirmed by design but not yet implemented in code.

### `card_in_stack` Condition
Check whether a specific card ID is present in any category's event stack. Mirrors the existing `card_in_instability` condition in `checkCondition`.

```js
condition: { card_in_stack: { id: 'alliance' } }
// returns true if any category's stack contains a card with id === 'alliance'
```

Used by: Free Trade Agreement Opt 1 — free to play when Alliance is in any stack, costs 1 Governance resource otherwise.

### Resource Swap Effect
Exchange a chosen resource from one stack with the oldest resource of another stack simultaneously. Needs a two-step modal: player picks the resource to take, the oldest resource from the target stack is automatically displaced to the source stack in return.

Used by: Free Trade Agreement Opt 2 — swap a chosen Technology resource with oldest Economy resource.

### Diplomacy / Coalition Synergy Network
Alliance (Governance stacking event, +2) anchors a family of cards whose effects improve when Alliance is in any stack. This creates a strategic build path: establish Alliance early, then play coalition cards at reduced cost or greater effect. Future cards in this family include Free Trade Agreement, Non-Aggression Pact, Cultural Exchange, and similar diplomacy-themed events.

---

*Last updated: 2026-07-18 — Session 8: exchange balance rule, difficulty curve, culture/environment design note*
