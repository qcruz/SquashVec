# Card Effects Reference
*Complete list of implemented effect types for use in card design.*
*All effects are configured via the card's `options` array in cards.js.*

---

## Event Effects (used in `options[n].effect`)

### Stacking

**`stack_on_category`**
Stack this card's value on a specific category's event stack.
- `targetCategory: string` — category to stack on
- `condition?: object` — if provided, card discards itself when condition is not met

**`stack_on_any_modal`**
Player chooses which category to stack this card's value on, constrained to a specific set of choices.
- `bonusValue: number` — value to add (overrides card's own value)
- `choices: string[]` — **required** — 2 category names the player may choose between. Design rule: all cards must specify choices; open "any category" is not permitted for balance.

**`pay_own_stack_then_stack_on_any`**
Take the oldest resource from own category stack, then stack this card's value on a player-chosen category.
- `ownCategory: string` — category to take resource from
- `choices: string[]` — **required** — 2 category names the player may choose between. Design rule: all cards must specify choices; open "any category" is not permitted.
- *(stack value comes from the card's `value` field)*

**`stack_on_category_then_discard_hand`**
Stack this card on a specific category, then player discards 1 card from hand.
- `targetCategory: string`
- *Used by: Immigration Opt 2 — stack on Culture, then discard 1 hand card*

**Design rule — stack destination choices:**
All stacking cards that redirect to another category must declare exactly 2 choices from the following pairings. The player picks one:

| Own Category | Choices |
|---|---|
| Economy | Governance, Military |
| Culture | Governance, Environment |
| Military | Economy, Governance |
| Technology | Economy, Environment |
| Environment | Culture, Technology |
| Governance | Economy, Military |

---

### Instability Removal

**`remove_instability_modal`**
Player chooses a category; takes oldest N instability cards from that pile → deck.
- `maxRemove?: number` — how many to remove (default 1)
- `targetCategory?: string` — restrict to a single category pile
- `selfDiscardFlow?: boolean` — if true, uses card's `discardTo` after resolution
- `afterShuffle?: boolean` — if true, shuffles this card into the deck after resolution (overrides selfDiscardFlow)

**`remove_lowest_instability_modal`**
Player chooses a category; takes the **lowest-value** instability card from that pile → deck.
- `selfDiscardFlow?: boolean`

**`remove_two_instability_modal`**
Player picks 2 different categories; takes the oldest instability from each → deck. Card goes to discard.

**`move_instability_modal`**
Player picks a source category then a destination; oldest instability card is moved between piles.
- `selfDiscardFlow?: boolean`

---

### Resource Costs (Stack Removal)

> Resource costs take either the **oldest** (default) or **newest** card from the stack, depending on the `stackEnd` parameter.

**`remove_stack_card_then_remove_instability`**
Take the oldest (or newest) resource from `sourceCategory` stack → deck. Then remove N instability from any category (or a specific one) → deck.
- `sourceCategory: string`
- `maxRemove?: number` (default 1)
- `targetCategory?: string` — if set, restricts instability removal to that category's pile
- `stackEnd?: 'newest'` — if set, takes the newest resource instead of oldest
- `afterShuffle?: boolean` — if true, shuffles this card into the deck after instability removal
- `selfDiscardFlow?: boolean`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_two_stack_cards_then_remove_instability`**
Auto-takes the oldest resource from each of 2 specified stacks → deck. Then removes N instability from a specific category pile → deck. Shuffles this card into the deck.
- `stacks: string[]` — array of exactly 2 category names (may repeat for 2 from same category)
- `targetCategory: string` — instability pile to clear
- `maxRemove?: number` (default 1)
- *Requires: each named category stack meets count requirements*
- *Used by: cross-category and level-3 policy cards*

**`discard_hand_then_remove_instability`**
Player discards 1 card from hand. Then removes N instability from a specific category pile → deck. Shuffles this card into the deck.
- `targetCategory: string` — instability pile to clear
- `maxRemove?: number` (default 1)
- *Requires: hand ≥ 1 card*
- *Used by: hand-discard variant policy cards (level 1)*

**`draw_n_then_place_in_instability`**
Draw N cards. Place this card in the specified instability pile.
- `drawCount: number` — cards to draw
- `targetInstability: string` — instability pile destination
- *Always eligible*
- *Used by: Option B of all policy cards*

**`remove_stack_card_then_shuffle_self`**
Take the oldest resource from `sourceCategory` stack → deck. Shuffle this card into the deck.
- `sourceCategory: string`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_stack_card_then_discard_self`**
Take the oldest resource from `sourceCategory` stack → deck. Discard this card.
- `sourceCategory: string`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_stack_card_then_remove_or_identity_then_stack`**
Take the oldest resource from `sourceCategory` stack → deck. Then remove the oldest resource from `removeCategory` stack → deck. If `removeCategory` stack is empty, removes the active `removeCategory` identity card → that category's instability instead. Place this card on `targetCategory` stack.
- `sourceCategory: string`
- `removeCategory: string`
- `targetCategory: string`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_stack_card_then_discard_hand_then_stack`**
Take the oldest resource from `sourceCategory` stack → deck. Player discards 1 hand card. Place this card on `targetCategory` stack.
- `sourceCategory: string`
- `targetCategory: string`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_instability_then_discard_hand_then_stack`**
Player chooses (optionally filtered) instability pile; removes oldest card → deck. Player discards 1 hand card. Place this card on `targetCategory` stack.
- `instabilityCategory?: string` — if set, restricts which instability pile can be chosen
- `targetCategory: string`
- *Requires: matching instability pile has ≥ 1 card*

**`remove_stack_card_then_stack_on_category`**
Take the oldest (or newest) resource from `sourceCategory` stack → deck. Place this card on `targetCategory` stack.
- `sourceCategory: string`
- `targetCategory: string`
- `bonusValue?: number` — if set, overrides card's own value when placed on the stack
- `stackEnd?: 'newest'` — if set, takes the newest card instead of oldest
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_stack_card_then_remove_n_from_stack`**
Take the oldest resource from `sourceCategory` stack → deck. Remove up to `removeCount` oldest resources from `targetCategory` stack → deck.
- `sourceCategory: string`
- `targetCategory: string`
- `removeCount: number`
- `selfDiscardFlow?: boolean`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_stack_card_then_place_in_instability`**
Take the oldest resource from `sourceCategory` stack → deck. Place this card in `targetInstability` pile.
- `sourceCategory: string`
- `targetInstability: string` — e.g. `'culture'`, `'military'`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_stack_card_and_optionally_place_self`**
Take the oldest resource from `sourceCategory` stack → deck. Player chooses to place this card on `targetCategory` stack or shuffle it back.
- `sourceCategory: string`
- `targetCategory: string`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

---

### Multi-Stack Resource Costs (hazard mitigation chains)

**`remove_two_stack_cards_then_bottom`**
Auto-takes oldest card from each of 2 specified stacks → deck. Card goes to bottom of deck.
- `stacks: string[]` — array of exactly 2 category names (may repeat if needing 2 from same category)
- *Requires: each named category stack ≥ 1 (or ≥ 2 if same category appears twice)*
- *Used by: Population Decline Opt 1*

**`remove_three_stack_cards_then_bottom`**
Auto-takes oldest card from each of 3 specified stacks → deck. Card goes to bottom of deck.
- `stacks: string[]` — array of exactly 3 category names
- *Requires: each named category meets count requirements*
- *Used by: Organized Crime Opt 1 (standard)*

**`remove_four_stack_cards_then_bottom`**
Auto-takes oldest card from each of 4 specified stacks → deck. Card goes to bottom of deck.
- `stacks: string[]` — array of exactly 4 category names
- *Used by: Organized Crime Opt 1 (escalated, when `criminal_conspiracy` is in instability)*

---

### Resource Movement (Move Without Removal)

**`move_newest_resource_to_sparse_stack`**
Two-step modal: player picks a source stack (≥ 1 card), then a target stack with **exactly 1** card (different from source). The newest (top) card moves from source to target. Card goes to bottom of deck.
- *Grayed out if no valid source+target pair exists*
- *Used by: Redundancy Systems Opt 1*

**`move_newest_resource_any`**
Two-step modal: player picks any source stack (≥ 1), then any target stack (different from source). The newest resource moves source → target. Card shuffles to deck.
- *Used by: Consolidation Opt 1*

**`move_newest_instability_any`**
Two-step modal: player picks any source instability pile (≥ 1), then any target pile (different). The newest (top) instability card moves source → target. Card shuffles to deck.
- *Used by: Consolidation Opt 2*

**`move_newest_resource_then_move_newest_instability`**
Chain: move newest resource (any → any), then move newest instability (any → any). Card shuffles to deck.
- *Requires: at least one valid resource move pair AND at least one valid instability move pair*
- *Used by: Structural Consolidation Opt 1*

**`remove_newest_resource_then_remove_newest_instability`**
Chain: remove newest resource from any chosen stack → deck, then remove newest instability from any chosen pile → deck. Card shuffles to deck.
- *Used by: Structural Consolidation Opt 2*

---

### Multi-Stack Removal (Management Philosophy)

**`remove_two_newest_resources_remove_instability`**
Three-step chain: player picks 2 stacks; removes newest resource from each → deck. Then picks 1 instability pile; removes oldest card → deck. Card to deck.
- *Used by: Managed Decline Opt 1*

**`remove_all_oldest_then_remove_two_instability`**
Immediate + modal chain: auto-removes oldest resource from every non-empty stack → deck. Then player picks 2 instability cards to remove → deck. Card to deck.
- *Used by: Managed Decline Opt 2*

**`strip_stack_to_oldest_and_instab`**
Two-step: player picks a stack with 2+ resources. Removes all resources except the oldest → deck. Also removes all instabilities from that category's pile except one (keeps oldest) → deck. Card to deck.
- *Grayed out if no stack has 2+ resources*
- *Used by: Rationalization Opt 1*

**`remove_three_from_stack_remove_two_instab`**
Two-step: player picks any stack; removes up to 3 oldest → deck. Player picks any instability pile; removes up to 2 oldest → deck. Card to deck.
- *Always eligible*
- *Used by: Rationalization Opt 2*

**`remove_one_from_each_stack_and_each_instab`**
Fully immediate, no modals. Loops all 6 categories; removes oldest resource from each non-empty stack → deck AND oldest instability from each non-empty pile → deck. Card to deck.
- *Used by: Austerity Opt 1*

**`remove_three_resources_clear_one_pile`**
Chain: player picks 3 stacks (newest resource from each → deck). Then player picks one instability pile — all instabilities cleared → deck. Card to deck.
- *Used by: Austerity Opt 2*

**`remove_all_from_stack_shuffle_self`**
Player picks any stack; removes all resource cards from it → deck. This card shuffles into the deck.
- *Used by: Rationalization family variants*

**`remove_all_from_stack_place_in_instability`**
Remove all resources from a specified stack → deck. Place this card in the specified instability pile.
- `targetStack: string` — category whose stack is cleared
- `targetInstability: string` — instability destination
- *Used by: Environmental Collapse Opt 2*

**`remove_stack_card_then_remove_crime_instability`**
Take the oldest resource from `sourceCategory` stack → deck. Remove all Crime-arc instability cards (crime, criminal_conspiracy, organized_crime) from all category piles → deck. Place this card in Governance instability.
- `sourceCategory: string`
- `condition?: object` — typically `active_identity_is` to gate the cheaper Dictatorship version
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*
- *Used by: Martial Law Opt 1*

**`remove_multi_stack_then_remove_crime_instability`**
Take the oldest resource from each listed stack → deck (list may repeat a category to require multiple). Remove all Crime-arc instability from all piles → deck. Place this card in Governance instability.
- `stacks: string[]` — array of category names (repeats allowed); e.g. `['military', 'governance', 'governance']`
- *Requires: each category appears enough times for its stack to have that many cards*
- *Used by: Martial Law Opt 2*

---

### Military-Specific Costs

**`remove_two_military_then_discard_three_hand`**
Take the 2 oldest resources from Military stack → deck. Discard 3 cards from hand.
- *Requires: Military stack ≥ 2 cards*

**`remove_two_military_then_draw_two`**
Take the 2 oldest resources from Military stack → deck. Draw 2 cards.
- *Requires: Military stack ≥ 2 cards*

**`remove_military_then_discard_hand_self_discard`**
Take the oldest resource from Military stack → deck. Discard 1 card from hand. Discard self.
- *Requires: Military stack ≥ 1 card*

---

### Hand / Draw

**`discard_from_hand_then_shuffle_self`**
Player picks N cards from hand to discard. Then shuffles this card into the deck (ignores `discardTo`).
- `count?: number` (default 1)

**`draw_and_shuffle_self`**
Draw 1 card. Shuffle this card into the deck.

**`draw_and_discard_self`**
Draw 1 card. Discard this card using `discardTo`.

**`draw_if_hand_small`**
Draw 2 cards. Uses card's `discardTo` for self-disposal.
- `condition?: object` — if provided, only draws if condition is met; otherwise card discards itself

**`discard_from_hand_modal`**
Player picks N cards from hand to discard. Then uses card's `discardTo`.
- `count?: number` (default 1)
- `condition?: object`

**`discard_hand_then_self`**
Player discards 1 card from hand. Then uses card's `discardTo` (or places self in instability).
- `afterInstability?: string` — if set, places self in that category's instability after hand discard

---

### Hazard / Utility

**`place_self_to_instability`**
Place this card directly into a category's instability pile.
- `targetInstability: string` — e.g. `'governance'`, `'economy'`

**`suppress_hazard`**
Instead of full mitigation, place a marker in `altInstability` with value `altValue`. Card is discarded.
- `altInstability: string`
- `altValue: number`

**`take_resource_to_economy`**
Take a resource card from one of `sourceCategories` and move it to the Economy stack.
- `sourceCategories: string[]`
- `afterEffect?: string` — `'remove_military_discard_self'` requires Military stack ≥ 1

**`discard_self`**
Simply discard this card using `discardTo`. No additional effect.

**`multiplayer_only`**
Not available in solo play. Card is discarded.

**`replace`**
Identity card effect — replaces the current active card in `targetCategory`. Takes `costCategory` and `costAmount` for the resource payment.
- `targetCategory: string`
- `costCategory: string`
- `costAmount: number`

---

## `discardTo` Target Values
*(Used on card definition's `discardTo` array — applies when card leaves play)*

| Target | Behavior |
|--------|----------|
| `shuffle_to_deck` | Card shuffles into the draw deck |
| `[category]_instability` | Card goes to that category's instability pile |

> **Note:** There is no `discard_pile` target. All cards cycle — they go to instability or back to the deck. This is a core design constraint.

### `discardTo` Bonus Values
- `bonus: 'draw_1'` — draw 1 card after the card is placed

---

## Condition Object (used in `option.condition`)

```js
condition: {
  type: 'hand_size_lte',  // hand size ≤ value
  value: 3,
}
// or
condition: {
  type: 'category_score_gte',
  category: 'governance',
  value: 14,
}
// or
condition: {
  type: 'instabilityExists',  // any instability pile has ≥ 1 card
}
// or
condition: {
  type: 'card_in_instability',  // a specific card ID is in any instability pile
  cardId: 'criminal_conspiracy',
}
// or
condition: {
  card_in_stack: { id: 'alliance' }
  // returns true if any category's event stack contains a card with that id
  // optional: add category: 'governance' to restrict to one stack
}
```

---

## `canPlayOption` Requirements Summary

These effects are **disabled** (grayed out) when requirements aren't met:

| Effect | Requirement |
|--------|-------------|
| `replace_plus_stack_cost` | `costCategory` stack ≥ `costAmount` |
| `remove_stack_card_*` | `sourceCategory` stack ≥ 1 |
| `remove_stack_card_then_stack_on_category` | `sourceCategory` stack ≥ 1 |
| `remove_stack_card_then_remove_n_from_stack` | `sourceCategory` stack ≥ 1 |
| `remove_stack_card_then_place_in_instability` | `sourceCategory` stack ≥ 1 |
| `remove_stack_card_then_remove_or_identity_then_stack` | `sourceCategory` stack ≥ 1 |
| `remove_stack_card_then_discard_hand_then_stack` | `sourceCategory` stack ≥ 1 |
| `remove_instability_then_discard_hand_then_stack` | `instabilityCategory` pile ≥ 1 card |
| `pay_own_stack_then_stack_on_any` | `ownCategory` stack ≥ 1 |
| `remove_two_military_then_*` | Military stack ≥ 2 |
| `remove_military_then_*` | Military stack ≥ 1 |
| `remove_two_stack_cards_then_bottom` | Each named stack meets count requirement |
| `remove_three_stack_cards_then_bottom` | Each named stack meets count requirement |
| `remove_four_stack_cards_then_bottom` | Each named stack meets count requirement |
| `move_newest_resource_to_sparse_stack` | At least one valid (source ≥ 1, target exactly 1) pair |
| `strip_stack_to_oldest_and_instab` | At least one stack with 2+ resources |
| All others | Always eligible |
