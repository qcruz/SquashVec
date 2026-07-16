# Governance — Session Log
*Brief record of each development session. Update at the end of every session.*
*Full project docs updated periodically — see notes below for when a full sync is due.*

---

## Session 6 — 2026-07-15

**Focus:** Bug fixes, dead code cleanup, full doc sync

### Changes
- **Fixed Maximize autoplay freeze** — `estimateOptionDelta` was called but never defined; implemented full heuristic (~60 effect branches) covering all stack/instability/draw effects
- **Added 12 missing `resolveAutoPendingAction` cases** — `move_resource_pick_source/target`, `move_newest_res_any_src/tgt`, `move_newest_instab_src/tgt`, `mvr_instab__res_src/tgt`, `mvr_instab__instab_src/tgt`, `rmr_instab__res_src`, `rmr_instab__instab_src` — these fell to default branch and silently dropped the effect
- **Added `military_exercise_cost` handler** in `resolveRemoveStackCard` — costRemaining loop was not decrementing, afterEffect was never applied
- **Removed ~250 lines of duplicate dead code** — incremental edit replay had doubled case blocks in `resolveEventCard`, `canPlayOption`, and `resolveRemoveStackCard`; brace balance verified at 1439 open = 1439 close
- **Full doc sync** — design.md, session-log.md, effects-reference.md, planned-cards.md, card-list.md all updated from recovered July 14 design notes

### Deck State
303 STARTER_DECK slots, 165 unique card IDs

### Notes
- Session was a recovery session — primary work was restoring functionality lost when July 14 session terminated at context limit
- design.md now reflects WIN_SCORE=16 and all design principles from July 14 session

---

## Session 5 — 2026-07-14 (partially lost)

**Focus:** New cards, card arc design, autoplay improvements, deck balancing

*Note: This session terminated at context limit twice. Some edits may have been partially completed. The code state was verified in Session 6; dead duplicates removed.*

### Changes

**New cards added:**
- **Labor Shortage** (×2) — value 2, economy hazard; pay 1 Economy to avoid, else Economy instability. New effect: `remove_stack_card_then_shuffle_self`.
- **Population Decline** (×1) — value 3, economy/culture hazard; pay 1 Economy + 1 Culture to avoid, else Economy or Culture instability (choice). New effect: `remove_two_stack_cards_then_bottom`.
- **Immigration** (×2) — value 2, standard event; Opt 1: stack on Economy (free); Opt 2: stack on Culture, discard 1 hand card. Discards to Governance Instability (by design — represents ongoing governance challenge). New effect: `stack_on_category_then_discard_hand`.
- **Crime** (×3) — value 2, governance/economy hazard; pay 1 Governance to avoid, else Economy or Military instability (choice).
- **Criminal Conspiracy** (×2) — value 3, governance/military hazard; pay Governance + Military to avoid, else discard 1 hand card + Governance instability.
- **Organized Crime** (×1) — value 4, must-play; standard: pay Governance + Military + Economy; escalated (if Criminal Conspiracy in instability): pay Governance + Military + Economy + Technology. Option 2: discard 2 hand cards. New effect: `remove_three_stack_cards_then_bottom`, `remove_four_stack_cards_then_bottom`.
- **Restitution** (×1) — value 1, governance utility; Opt 1: remove 2 resources + 1 instability → bottom of deck; Opt 2: remove 1 resource + 1 instability → discard.
- **Insider Trading** (×1) — value 3, technology/economy hazard.
- **State Capture** (×1) — value 3, governance hazard.
- **Cultural Purge** (×1) — value 3, culture/governance hazard.
- **Treason** (×1) — value 3, governance/military hazard.
- **Sabotage** (×1) — value 1, technology hazard.
- **Pollution** (×1) — value 3, environment/economy hazard (replaces toxic_spill concept; both may coexist in deck).
- **Forest Fire** (×2) — value 3, environment hazard, must-play; Opt 1: take environment instability; Opt 2: pay 1 Technology resource → avoid.
- **Environmental Collapse** (×1) — value 4, environment hazard, must-play; Opt 1: pay 2 Economy + 2 Technology → card returns to deck; Opt 2: clear all Environment stack resources → discard. New effect: `remove_all_from_stack_place_in_instability`.
- **Misinformation** (×2) — value 2, technology instability.
- **Surveillance State** (×1) — value 3, technology instability (targets Economy).
- **Cyber Warfare** (×1) — value 3, technology instability.
- **Technological Collapse** (×1) — value 4, technology instability, must-play.
- **Direct Attack** (×2) — value 3, military stacking (already existed; confirmed).
- **Arms Package** (×2) — value 2, economy stacking (already existed; confirmed).

**Card arc multiplier mechanic:**
- Card arcs are multipliers, not dependencies. Criminal Conspiracy in instability escalates Organized Crime's mitigation cost (3 resources → 4 resources), checked via new `card_in_instability` condition in `checkCondition`.

**Autoplay improvements:**
- Added **Maximize mode** — picks the card+option with highest estimated score delta instead of random choice
- Added **per-mode stats** — wins/losses tracked separately for Random and Maximize modes
- Added **option tracking** — `optionPlays['card_id:optIdx']` counts how many times each option is chosen, exposing options that are never used
- Added **batch run** (Run N) — runs N games automatically and stops
- **`estimateOptionDelta` heuristic** — scores effects by type: stacking adds card.value, instability removal adds recovered value, resource costs subtract spent value, hand discards subtract ~2 per card

**New effects:**
- `remove_two_stack_cards_then_bottom` — auto-takes oldest from 2 specified stacks, card to deck
- `remove_three_stack_cards_then_bottom` — auto-takes oldest from 3 specified stacks, card to deck
- `remove_four_stack_cards_then_bottom` — auto-takes oldest from 4 specified stacks, card to deck
- `stack_on_category_then_discard_hand` — stack card on category, then discard 1 hand card
- `remove_all_from_stack_shuffle_self` — remove all resources from chosen stack → deck, card shuffles to deck
- `remove_all_from_stack_place_in_instability` — remove all resources from specified stack → deck, place card in instability
- `card_in_instability` condition type — checks if a card ID is present in any instability pile
- `stackEnd: 'newest'` parameter on `remove_stack_card_then_stack_on_category` — removes top of stack instead of bottom

**Management philosophy card overhaul:**
- All 10 management philosophy cards redesigned to move resources around the board, not just discard them
- Consolidation: move newest resource (any→any), or move newest instability (any→any)
- Structural Consolidation: move newest resource + newest instability, or remove newest resource + newest instability
- Managed Decline: pay newest from 2 stacks + remove 1 instability, or pay oldest from all stacks + remove 2 instabilities
- Rationalization: Strip to Core (remove all resources except oldest from one stack, remove all instabilities except one from that category), or Aggressive Cuts (remove 3 oldest resources, remove 2 oldest instabilities)
- Austerity: Broad (remove 1 oldest from every stack + 1 oldest instability from every pile), or Shock Treatment (pick 3 stacks, pay newest resource from each; clear one pile)
- Redundancy Systems: move newest resource from any stack to any stack with exactly 1 resource (new effect: `move_newest_resource_to_sparse_stack`)

**New effects (management philosophy):**
- `move_newest_resource_to_sparse_stack` — two-step modal: pick source stack (≥1 card), pick target stack (exactly 1 card), move top card
- `move_newest_resource_any` — two-step: pick source, pick target, move top card (unrestricted)
- `move_newest_instability_any` — two-step: pick source pile, pick target pile, move top card
- `move_newest_resource_then_move_newest_instability` — chain: move newest resource, then move newest instability
- `remove_newest_resource_then_remove_newest_instability` — chain: remove newest resource → deck, then remove newest instability → deck
- `remove_two_newest_resources_remove_instability` — pick 2 stacks (newest from each) → deck, then pick 1 instability → deck
- `remove_all_oldest_then_remove_two_instability` — auto-removes oldest from every non-empty stack → deck, then picks 2 instabilities → deck
- `strip_stack_to_oldest_and_instab` — pick a stack with 2+ resources; removes all but oldest → deck; removes all instabilities from that category except one → deck
- `remove_three_from_stack_remove_two_instab` — pick stack, remove 3 oldest → deck; pick instability pile, remove 2 oldest → deck
- `remove_one_from_each_stack_and_each_instab` — fully immediate; removes oldest from every non-empty stack and oldest from every non-empty instability pile → deck
- `remove_three_resources_clear_one_pile` — pick 3 stacks (newest from each) → deck, then pick one pile and clear all instabilities from it → deck

**Card value audit:**
- Dense Forests, Mineral Deposits: +2 → +1
- All 10 management philosophy cards + Disarmament: 0 → +1
- Disarmament redesigned: value +3, Opt 1 removes oldest Governance resource and up to 3 Military resources; Opt 2 pays newest Military resource

**Deck trim:**
- `stackEnd: 'newest'` general parameter available on stack-cost effects

**Design principles added to design.md:**
- Card arc multiplier rule
- Resource stack order as strategy
- Card penalty severity tiers (12 tiers)
- Strategic depth patterns
- Solo multiplayer principle
- Philosophy card thematic implementation rule
- No zero-value cards rule

### Deck State
~174 cards after trimming (303 slots per parser — counts likely inflated by context-limit replay; to be audited next session)

---

## Session 4 — 2026-07-12

**Focus:** New stacking cards, identity auto-replace, UX improvements

### Changes
- **Direct Attack** (+3, military stacking): Opt 1 — pay 2 Military resources (or 1 Military + active Military identity if stack empty) → +3 Governance. Opt 2 — pay 1 Military + 1 Governance resource (or Governance identity if empty) → +3 Military. New effect: `remove_stack_card_then_remove_or_identity_then_stack`
- **Arms Package** (+2, economy stacking): Same dual-cost mechanic as Sanctions but +2. Uses existing effects.
- **Identity cards now auto-replace** — removed the "Replace or Stack?" modal; playing an identity always replaces the current active. `showReplaceOrStackModal` now auto-invokes replace without showing UI.
- **Removed voluntary discard for unplayable cards** — unplayable cards now show "Requirements not met" text instead of a Discard button. Cards build up in hand until requirements are met.
- **Social Upheaval increased to ×5 copies** in STARTER_DECK — ensures hazard pressure is felt consistently throughout the game (213 total)

### Deck State
213 cards total — 59 identities, 84 stacking, 49 hazards, 21 utility

### Next Steps Flagged
- Consider whether Technology category needs more stacking variety (currently thin vs. Environment)
- Governance utility pool is strong — may not need more recovery cards for now
- Scientific Breakthrough Opt 2 (culture cost → military) still flagged for redesign

---

## Session 3 — 2026-07-12

**Focus:** Full card review, new cards, engine effects, Sanctions redesign, docs sync

### Changes
- **Bug fixes:** Artistic Movement Opt 2 (`sourceCategory` → `targetCategory: 'governance'`); Preparedness Opt 1 description corrected; Sanctions replaced with beneficial solo option
- **Trade Routes Opt 1:** Changed from Pay Environment → Economy to Pay Economy → Culture
- **New cards:** Disarmament (military utility), Social Upheaval (hazard, must-play), Destabilization (military stacking +3)
- **Sanctions redesigned:** Now a stacking event (+1 Economy). Opt 1: pay Governance + discard hand card → +1 Economy. Opt 2: remove Culture instability + discard hand card → +1 Economy
- **New engine effects (6 total):** `remove_stack_card_then_stack_on_category`, `remove_stack_card_then_remove_n_from_stack`, `remove_stack_card_then_place_in_instability`, `discard_from_hand_then_shuffle_self`, `remove_stack_card_then_discard_hand_then_stack`, `remove_instability_then_discard_hand_then_stack`
- **Docs:** `card-list.md` fully overhauled (206 card count); `effects-reference.md` updated; `planned-cards.md` updated; `session-log.md` created; `README.md` created

### Deck State
206 cards total — 59 identities, 80 stacking, 46 hazards, 21 utility

### Next Steps Flagged
- Review planned-cards.md ideas and confirm which batch to implement next
- Consider adding condition-based stacking events (play only if score threshold met)
- Abundant Harvest (×6 copies) may be over-represented in Environment stacking pool
- Scientific Breakthrough Opt 2 (culture cost → military) still thematically weak — flag for redesign

---

## Session 2 — 2026-07 (prior)

**Focus:** Management philosophy cards, engine mechanic updates, UI improvements

### Changes
- **10 management philosophy cards added:** Consolidation family (5) + Contingency Planning family (5) — all Governance utility, all shuffle to deck
- **Mechanic: hazards are now must-play when drawn** (no longer opt-in via `mustPlayWhenDrawn` flag — enforced by subtype check in `drawCard()`)
- **Mechanic: resource costs auto-remove oldest** — `showRemoveStackModal` simplified to always take `stack[0]`, no player choice
- **Must-play indicator** moved from hand card to detail panel, styled to match benefit text
- **Circle score** added to category score display (border-radius: 50%)
- **Civic Charter Opt 2** fixed: pay Governance → stack +2 on Economy (not Governance)
- **Contingency Planning + Preparedness** discard destinations updated to Governance or Culture instability
- **`docs/effects-reference.md`** created — full reference of all implemented effect types

### Deck State
~196 cards (prior to Session 3 additions)

---

## Session 1 — 2026-07 (prior)

**Focus:** Visual design, card color coding, initial card review

### Changes
- **Hand card color tinting:** stacking = soft green, hazard = soft red, identity = soft gold (layered gradient approach, rgba 0.30/0.12 wash)
- **Card type label** darkened on tinted cards (rgba(0,0,0,0.55))
- **Military Exercise** card added
- **Environment stacking cards** added (dense_forests, mineral_deposits, rare_plants, rich_soil, natural_springs, coastal_fisheries, frozen_tundra)
- **Identity benefit text** added to detail panel for category cards
- **`docs/planned-cards.md`** created — card idea staging area with review policy

---

## Full Doc Sync Log

| Date | Trigger | Files Updated |
|------|---------|---------------|
| 2026-07-12 | Session 3 end | card-list.md, effects-reference.md, planned-cards.md, session-log.md, README.md |
| 2026-07-15 | Session 6 — recovery + design note mining | design.md, session-log.md, effects-reference.md, planned-cards.md, card-list.md |

*Next full sync due: after Session 8 or when 10+ cards change*
