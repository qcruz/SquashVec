# Governance — Card Types & Design Principles

A high-level reference for every card family implemented in the game. Use this when designing new cards to identify which family a card belongs to, what constraints apply, and what design intent it should serve.

---

## Category Cards (Identity Cards)

**Purpose:** Define the governing system or institutional character of one civilization category.

**Design intent:** Identity cards are the skeleton of a civilization. They set the baseline value for a category and unlock synergies that make stacked event cards stronger. There is no universally "best" identity — the correct choice depends on the current board state, available event cards, and what threats are active. Choosing and committing to an identity combination is the game's deepest strategic layer.

**Mechanics:**
- One active per category at a time. Playing a new identity always replaces the current one.
- Option 1 automatically removes the oldest instability from that category before the replacement resolves.
- The replaced card goes to a player-chosen discard destination (printed on the card).
- Event stacks persist through identity replacement — the new identity becomes the foundation, existing stacked cards remain.
- `identityBonus` fields power cross-card synergies: a `stack_tag` bonus multiplies the effective value of every resource in that stack that carries the matching tag.

**Balance:** Value 2–5. Cost 1–2 resources from relevant categories.

**Tags:** The category name (e.g. `governance`, `economy`).

---

## Resource / Stacking Event Cards

**Purpose:** Add value to a category stack. The primary score-building mechanism.

**Design intent:** These are the "terrain" of the game — they accumulate over many turns to create the scores needed to win. They represent institutions, achievements, and developments that persist in a civilization's history. Simple stacking events are cheap and plentiful; cross-category stacking costs a resource from another category and offers greater value. The stack order matters: early resources become foundational, late ones are tactical.

**Subtypes:**

| Subtype | Cost | Value | Notes |
|---------|------|-------|-------|
| Simple stacking | Free | +1 to +2 | Stacks on own category |
| Redirectable stacking | Pay 1 own resource | +1 to +2 | Stacks on any category |
| Cross-category stacking | Pay 1 from another category | +2 | Stacks on target category |
| Conditional stacking | None until condition met | +1 to +2 | See Exchange Cards |

**Tags:** `resource` + relevant category tags.

---

## Hazard Event Cards

**Purpose:** Generate instability. The primary pressure mechanism.

**Design intent:** Hazards represent crises a civilization cannot avoid indefinitely. They force defensive resource spending and build the instability that makes the late game precarious. The best players anticipate hazard density across a deck cycle and position resources to absorb the hits. No card is lost permanently — hazards that go to instability are part of the civilization's history and can be recovered in later turns.

---

### Simple Hazards

One category, one mitigation cost. Pay 1 resource → card returns to deck. Can't pay → card goes to instability. The baseline hazard pattern.

---

### Arc Hazards

Escalating difficulty series. Each card in the arc is independently playable but becomes harder to mitigate if an earlier arc card is already in instability. Represents compounding crises — each unresolved problem makes the next one worse.

**Example:** Crime → Criminal Conspiracy → Organized Crime. Standard mitigation for Organized Crime costs 3 resources. If Criminal Conspiracy is already in instability, cost escalates to 4.

**Design rule:** Arc cards are multipliers, not dependencies. The later card can always be played and mitigated on its own; the earlier card only amplifies the difficulty.

---

### Must-Play Hand-Discard Hazards

Drawn and resolved immediately. Force the player to discard hand cards at a cost, or accept instability in exchange for material gain (card draws, resource bonuses). Punish card accumulation and reward lean hand management. Represent political scandals, civil unrest, or institutional crises that demand immediate attention.

**Examples:** Scandal (+1), Civil Unrest (+2), Power Vacuum (+3)

---

### Global Event Cards

Board-wide hazards. Have a cooperative threshold: if enough cards of the matching type are in the draw deck, the event is automatically negated. Otherwise, pay 3 resources to escape, or accept a multi-card penalty. In multiplayer, all players feel the impact. Represent civilization-scale disruptions that no individual actor can fully control.

**Balance:** Value 2–3. Escape cost: 3 resources from 3 different categories.

**Examples:** Global Recession, Constitutional Crisis, Mass Uprising, Climate Crisis

---

### Exchange Hazards (Overdevelopment Punishment)

Must-play when drawn. Stack-size-gated: if the relevant category stack has grown beyond a threshold (≥5 or ≥6 cards), the hazard fires and goes to instability. Below the threshold, it draws a card and shuffles back. Represents the law of diminishing returns — overdevelopment in one domain creates its own crisis.

**Examples:** Diminishing Returns (Economy ≥6), Imperial Overreach (Military ≥5), Cultural Homogenization (Culture ≥5)

---

### Collapse Event Cards

Persistent cycling threats that wipe entire category stacks. Both options always shuffle the card back into the deck — the card never permanently exits via its own effects. The only way to suppress a collapse event is to discard it from hand using another card's effect, which routes it to instability via `discardTo`.

- Opt 1: Pay 1 resource → wipe all resources from the target category stack → shuffle back into deck
- Opt 2: Defer → shuffle back into deck (no effect, no cost)

The WMD card (WMD Launch) is the extreme variant: Opt 1 wipes ALL stacks simultaneously. One copy of each is included in the deck. In multiplayer, deliberately triggering a collapse against yourself may be strategically worthwhile to deny an opponent a developed stack.

**Tags:** `instability`, `event`, `collapse` + relevant category tags.

**Examples:** Economic Collapse, State Collapse, Military Collapse, WMD Launch

---

## Utility Event Cards

**Purpose:** One-time board manipulation effects. Draw cards, remove instability, move or spend resources strategically.

**Design intent:** Utility cards are the tools that maintain a complex late-game board. They don't add score directly — they preserve it by clearing instability, redistributing resources, and drawing into better options. Management philosophy cards are the highest-leverage utility cards, capable of reshaping the entire board in a single play. All utility cards shuffle back into the deck after resolving.

---

### Management Philosophy Cards

Complex board manipulation — move resources between stacks, clear instability, strip overbuilt categories. These cards implement their names literally. Consolidation moves a resource or instability; Austerity strips every category back to its minimum; Managed Decline pays out of multiple stacks to remove instability. They are paired recovery tools: one card for fine adjustment, a companion for aggressive intervention.

**Families:**
- Consolidation family (×5): Consolidation, Structural Consolidation, Managed Decline, Rationalization, Austerity
- Contingency Planning family (×5): Preparedness, Crisis Protocol, Grand Strategy, Redundancy Systems, Adaptive Management

---

### Policy Cards

Structured instability removal for each of the six categories. Five cards per category, organized in three tiers by cost and impact. The two play directions are: (A) pay resources or hand cards → remove instability; or (B) accept instability → gain material (draw cards, stack a resource).

**Tiers:**
- Level 1: Single resource or hand card → remove 1–2 instability
- Level 2 (cross-category): Pay from two categories → remove 2–3 instability
- Level 3: Pay oldest resource(s) → remove 3–4 instability

Policy cards are category-specific tools. Each category has a distinct policy set. All shuffle back into the deck on resolution.

---

### General Utility

Single-action effects not tied to a policy set: card draw, instability removal, diplomatic effects, census mechanics. These are typically governance-adjacent or category-agnostic.

**Examples:** Census, Grand Strategy, Diplomatic Mission, Peace Treaty

---

## Exchange Cards

**Purpose:** Conditional stacking events that create instability-aware and resource-aware strategic decisions.

**Design intent:** Exchange cards introduce a conditional layer to resource building. They reward players who read the board state and time their plays. An instability-gated card held in hand represents a ready opportunity — one that could also become a liability if a hand-discard hazard fires first.

---

### Instability-Gated Holdables

Can be held in hand until a board condition is met (e.g. "if Governance instability exists → stack on Culture"). Represent opportunistic behavior: exploiting the chaos of a collapsing category to build in another. If neither condition is met, the card sits in hand — creating pressure if a discard-forcing event arrives.

**Examples:** Diaspora, War Profiteers, Crisis Mandate

---

### Overdevelopment Punishment

*(See Exchange Hazards under Hazard Event Cards above.)*

**Examples:** Diminishing Returns, Imperial Overreach, Cultural Homogenization

**Tags:** `exchange` + relevant category tags.

---

## Monument Cards (`Monu` + `Exp` tags)

**Purpose:** High-cost, high-value civilization achievements that mark a civilization's defining legacy. A sub-family of Expression cards.

**Design intent:** Monuments are the legacy plays of the game — expensive to build but transformative when they land. They cost 3 oldest resources from a single stack (a major commitment) and stack at +2 value. Their triple cross-tagging means they contribute to identity bonuses across multiple active identities simultaneously. Playing a monument defines what the civilization is remembered for and creates compound synergy across the board state.

**Mechanics:**
- Value 2. Cost: remove 3 oldest resources from one specified source stack.
- Triple cross-tagged: primary (stack category) + 2 adjacent categories. Both extra tags count toward `identityBonus` calculations for any matching identity active in that stack.
- Opt 1: Pay 3 → stack on target category (+2). Opt 2: Shuffle back into deck (wait for a better moment or better board state).
- `discardTo`: primary category instability only — auto-routes on forced hand discard with no modal.
- Tagged: `Monu`, `Exp`, `resource` + all three category tags.

**Design rule:** A monument's three tags should reflect a genuine thematic overlap of three concepts. Noble Warriors = the intersection of military achievement, cultural memory, and governing legitimacy. This thematic overlap is what makes the card feel earned.

| Card | Cost Stack | Tags |
|------|------------|------|
| Glorious Monument | Economy ×3 | env + culture + economy |
| Grand Library | Culture ×3 | tech + culture + economy |
| Maritime Fleet | Economy ×3 | mil + economy + tech |
| Debate Chambers | Governance ×3 | gov + culture + economy |
| Merchant Guilds | Governance ×3 | eco + governance + culture |
| Noble Warriors | Military ×3 | mil + culture + governance |
| Learned Scholars | Technology ×3 | tech + governance + military |
| Rousing Leader | Culture ×3 | culture + governance + military |
| Pacifists | Culture ×3 | culture + military + environment |
| Explorers | Environment ×3 | env + technology + military |

---

## Expression Cards (`Exp` tag)

**Purpose:** A broader family of cards that express a civilization's distinctive identity — its character, not just its score.

**Design intent:** Expression cards go beyond score-building. They tell the story of what a civilization values and how it defines itself. They are flavor-rich, cross-tagged, and designed to interact with multiple identity systems simultaneously. Monuments are the large-scale expression of this — civilization-scale achievements. But Expression as a tag is broader: future smaller Expression cards will carry lighter mechanics and represent the personality-level flavor of a civilization rather than its monumental legacy.

**Current Expression cards:** All 10 Monument cards (all carry both `Monu` and `Exp`).

**Planned Expression cards (non-Monument, `Exp` only):**
Street Performers, Artists Collective, Activist Youth, Secret Society, Revolutionaries. These will be cheaper, faster, and more situational — personality-flavor rather than civilization-achievement-flavor. A Street Performers card doesn't define a civilization; it colors it.

**Design rule:** All Monument cards are Expression cards, but not all Expression cards are Monuments. A card carrying `Exp` but not `Monu` does not use the remove-3-from-one-stack cost structure.

---

## Summary — Tag Reference

| Tag | Meaning |
|-----|---------|
| `resource` | Stacks on a category and contributes to score |
| `instability` | Goes to instability pile when unmitigated |
| `policy` | Policy card (structured instability removal) |
| `exchange` | Conditional stacking or overdevelopment hazard |
| `Monu` | Monument — remove-3 cost structure, value 2, triple cross-tagged |
| `Exp` | Expression — civilization identity flavor; all Monu cards are also Exp |
| `collapse` | Collapse event — wipes stacks, always returns to deck via own options |
| `event` | General event card marker |

---

*Last updated: 2026-07-25 — Session 16*
