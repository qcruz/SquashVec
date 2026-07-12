# Governance — Design Brainstorm
*Ideas for deeper strategy, emergent gameplay, and satisfying decisions.*
*Not all of these should be implemented — this is a space to think.*

---

## Core Design Goals for Expansion

1. **Emergent strategy** — Players should discover combinations, not follow a fixed optimal path.
2. **Meaningful late game** — The push from 15 → 20 should feel distinct from 10 → 15.
3. **Recovery arcs** — A player at 4 points should still have interesting decisions, not just be dead.
4. **Cross-category tension** — Choices in one category should create ripple effects in others.
5. **Replayability** — Each game should feel like a different civilization narrative.

---

## Mechanic Ideas

### 1. Crisis State
When a category falls below a threshold (e.g. 7 points), it enters **Crisis**. Certain cards become playable only in Crisis — high-risk, high-reward options that are unavailable during stable periods.

> *Design benefit: makes low scores interesting rather than purely punishing. Creates recovery arcs.*

Example cards: "Emergency Decree" (only playable when Governance ≤ 7 — draw 3, place this in Governance instability), "Rally the People" (only when Culture ≤ 7 — remove 2 instabilities from Culture).

---

### 2. Momentum / Streak Bonus
A lightweight counter that tracks consecutive turns where a card of the same category was played. At 3+, a small bonus applies (e.g., draw an extra card, or the next card of that category costs 1 less resource).

> *Design benefit: rewards focused civilizations. Creates a reason to specialize.*

Could be implemented as a visible "momentum" token per category that resets when a different category is played.

---

### 3. Score Threshold Triggers
When a category crosses a threshold (15, 17), it unlocks a one-time effect or makes certain cards playable. These could be printed on the identity cards themselves ("While active and this category ≥ 15: ...").

> *Design benefit: creates meaningful milestones, rewards pushing a category high.*

This already exists structurally (Renaissance Culture required Governance ≥ 16 in older designs). Worth formalizing as a system.

---

### 4. Epoch Markers / Age Progression
The game moves through three ages based on total score across all categories. Cards designed for each age produce stronger effects in their intended age. Early-age cards become less valuable late; late-age cards are unplayable early.

> *Design benefit: creates a natural game arc. Encourages players to build toward the late game.*

---

### 5. Instability Cascades
Some high-severity instability cards, if left in a pile for 3+ turns, trigger a cascade — copying themselves to an adjacent category's instability pile at the start of the next draw.

> *Design benefit: creates time pressure. Ignoring instability has compounding consequences.*

This would require a turn counter per instability card — may add complexity. Could be simpler as: certain high-value hazards (value 3+) have a "cascade" flag; if they're still in the pile when the same hazard is drawn again, it copies.

---

### 6. Synergy Bonds (Cross-Category Cards)
A new subtype of event card that references two categories simultaneously — providing a bonus if both categories are above a threshold, or a penalty if one is in crisis.

> *Design benefit: creates meaningful cross-category decisions and rewards balanced civilizations.*

Examples:
- "Enlightened Rule" — if Governance ≥ 14 AND Culture ≥ 14, stack +3 on either. Otherwise +1.
- "Industrial Might" — stack +2 on Economy, and +1 on Military. If Environment < 8, also place 1 Environment instability.
- "Knowledge Economy" — stack +2 on Technology if Economy ≥ 13. Otherwise stack +1.

---

### 7. Reform Cards (Crisis Recovery Arc)
A dedicated set of high-impact utility cards that can only be played when a specific category is in distress. They remove multiple instability cards at once but come at steep costs.

> *Design benefit: gives players agency in crisis. Prevents runaway loss spirals.*

---

### 8. Opportunity Events (Rare Upside)
A new subtype of positive event cards that are powerful but risky to hold. If still in hand after 3 turns, they convert to instability. Forces players to act on them.

> *Design benefit: creates urgency. Adds tension to hand management.*

---

## Specific Card Ideas

### Governance
| Idea | Mechanic |
|------|----------|
| Emergency Powers | Crisis only. Draw 3 cards. Place this in Governance instability. |
| Constitutional Reform | Move 2 instability cards from any pile to the draw deck. Pay 2 Governance resources. |
| Coalition Government | Requires Economy ≥ 12 AND Culture ≥ 12. Stack +3 on Governance. |
| Referendum | Draw 3, discard 2. Shuffle self into deck. |
| Press Freedom | If Governance ≥ 15: remove all Culture instability. Discard self. |

### Economy
| Idea | Mechanic |
|------|----------|
| Foreign Investment | Stack +2 on Economy AND +1 on any other category. |
| Monopoly | Stack +4 on Economy. Place 1 Governance instability. |
| Debt Restructuring | Remove up to 3 Economy instability. Add 1 Governance instability. |
| Trade Embargo | Discard any 1 resource card from any stack. Draw 2. |
| Black Market | Stack +1 on Economy without paying a resource cost. Place 1 Governance instability. |

### Culture
| Idea | Mechanic |
|------|----------|
| Cultural Revolution | Remove active Culture identity. Remove ALL Culture instability. Shuffle both into deck. |
| Great Library | Stack +3 on Culture. While in stack: reduce cost of all Technology identity cards by 1. |
| Oral Epic | Shuffle any 3 instability cards from any piles back into the deck. |
| Diaspora | Remove 2 Culture instability. Stack +1 on any category for each removed. |
| Pilgrimage | Draw 2. If one is a Governance identity, play it for free. Discard self. |

### Military
| Idea | Mechanic |
|------|----------|
| Fortified Peace | While in Military stack: all Military hazards cost 1 more resource to mitigate. (Passive) |
| Strategic Reserve | Remove 1 Military resource. Next turn, play 1 additional card. |
| War of Attrition | Remove 2 Military resources. Remove 3 instability cards from any category. |
| Conscription | Pay 1 Culture resource. Stack +2 on Military. |
| Peace Dividend | Remove Military identity from play (discard). Remove 2 Military instability. Draw 2. |

### Technology
| Idea | Mechanic |
|------|----------|
| Technological Leap | Stack +1 on Technology. The next resource card played this game has +1 value. |
| Innovation Hub | While in Technology stack: draw 1 extra card each turn. (Passive — needs implementation) |
| Reverse Engineering | Copy the effect of any resource card in any stack. Discard self. |
| Paradigm Shift | Discard your active Technology identity. Remove 2 Technology instability. Draw 3. |
| Great Expedition | Reveal top 5 cards of deck. Keep 2, shuffle the rest. |

### Environment
| Idea | Mechanic |
|------|----------|
| Climate Stability | While in Environment stack: Environment hazards are reduced by 1 value. (Passive) |
| Rewilding | Move any Economy resource card to your Environment stack instead. |
| Natural Abundance | Stack +1 on Environment for each resource already in Environment stack (max +4). |
| Controlled Burn | Remove all cards from Environment instability. Place 1 Economy instability. |
| Ancient Grove | Stack +3 on Environment. Cannot be removed from stack unless Environment identity is replaced. |

### Cross-Category / General
| Idea | Mechanic |
|------|----------|
| Enlightened Rule | If Governance ≥ 14 AND Culture ≥ 14: stack +3 on either. Otherwise +1. |
| Industrial Might | Stack +2 on Economy, +1 on Military. If Environment < 8, add 1 Environment instability. |
| Knowledge Economy | Stack +2 on Technology if Economy ≥ 13. Otherwise +1. |
| Age of Exploration | Draw 4. Keep 2, shuffle 2 back. |
| The Great Famine | Hazard. Remove 2 resources from Environment stack. Place in Economy instability. |
| Civil War | Hazard (value 4). Hits Governance AND Military instability simultaneously. Mitigate by paying both. |
| Renaissance | If Culture ≥ 15 AND Technology ≥ 13: stack +2 on both. Discard self. |
| Manifest Destiny | Pay 1 Military + 1 Economy. Stack +2 on Environment. Stack +1 on Military. |

---

## New Event Subtypes to Consider

| Subtype | Description | Risk |
|---------|-------------|------|
| **Opportunity** | High value but must be played within 2–3 turns or converts to instability | Adds hand pressure |
| **Reform** | Playable only when a category is in crisis (≤ 7). High recovery power. | Creates recovery arc |
| **Legacy** | One-time permanent effect — changes a rule for the rest of the game | High complexity |
| **Accord** | Cross-category cards that require two conditions simultaneously | Strong if balanced |
| **Cascade** | Hazards that worsen if not cleared — spread to adjacent categories | High stakes, high tension |

---

## Structural / Rules Ideas

| Idea | Description | Priority |
|------|-------------|----------|
| Max hand size (7) | After drawing, discard down to 7. Creates hand management decisions. | High — adds strategy |
| Max stack size (5) | Each category can hold at most 5 stacked event cards. Forces turnover. | Medium |
| Instability cap | If instability reaches 5 cards, an emergency trigger fires. | Medium |
| Difficulty mode | Remove some recovery utility cards for hard mode; add more for easy. | Low |
| Milestone rewards | At 15 points in any category, draw 1 extra card that turn. | Low |
| Epoch system | Turn 1–10: early. Turn 11–20: mid. Turn 21+: late. Some cards only available in certain epochs. | Low — high complexity |

---

## Priority Ranking

**Implement next (high value, low complexity):**
1. Max hand size — simple rule, big strategic impact
2. Crisis-only cards — small new card set, very clear design
3. Cross-category synergy cards (Accords) — use existing stack mechanic
4. Score threshold conditions on identity cards — already structurally possible

**Design and prototype (medium complexity):**
5. Opportunity event subtype
6. Reform event subtype
7. Passive effects on identity cards (already has `passiveEffect` field, needs game.js implementation)

**Long-term / multiplayer:**
8. Momentum system
9. Cascade instability
10. Epoch progression
