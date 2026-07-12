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
Player chooses which category to stack this card's value on.
- `bonusValue: number` — value to add (overrides card's own value)

**`pay_own_stack_then_stack_on_any`**
Take the oldest resource from own category stack, then stack this card's value on any category.
- `ownCategory: string` — category to take resource from
- *(stack value comes from the card's `value` field)*

---

### Instability Removal

**`remove_instability_modal`**
Player chooses a category; takes oldest N instability cards from that pile → deck.
- `maxRemove?: number` — how many to remove (default 1)
- `targetCategory?: string` — restrict to a single category pile
- `selfDiscardFlow?: boolean` — if true, uses card's `discardTo` after resolution

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

> Resource costs always take the **oldest** card from the stack — no player choice.

**`remove_stack_card_then_remove_instability`**
Take the oldest resource from `sourceCategory` stack → deck. Then remove N instability from any category → deck.
- `sourceCategory: string`
- `maxRemove?: number` (default 1)
- `selfDiscardFlow?: boolean`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_stack_card_then_shuffle_self`**
Take the oldest resource from `sourceCategory` stack → deck. Shuffle this card into the deck.
- `sourceCategory: string`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_stack_card_then_discard_self`**
Take the oldest resource from `sourceCategory` stack → deck. Discard this card.
- `sourceCategory: string`
- *Requires: `G.categories[sourceCategory].stack.length >= 1`*

**`remove_stack_card_then_stack_on_category`**
Take the oldest resource from `sourceCategory` stack → deck. Place this card on `targetCategory` stack.
- `sourceCategory: string`
- `targetCategory: string`
- `bonusValue?: number` — if set, overrides card's own value when placed on the stack
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
Simply discard this card. No effect.

**`multiplayer_only`**
Not available in solo play. Card is discarded.

---

## `discardTo` Target Values
*(Used on card definition's `discardTo` array — applies when card leaves play)*

| Target | Behavior |
|--------|----------|
| `shuffle_to_deck` | Card shuffles into the draw deck |
| `discard_pile` | Card goes to the discard pile |
| `[category]_instability` | Card goes to that category's instability pile |

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
| `pay_own_stack_then_stack_on_any` | `ownCategory` stack ≥ 1 |
| `remove_two_military_then_*` | Military stack ≥ 2 |
| `remove_military_then_*` | Military stack ≥ 1 |
| All others | Always eligible |
