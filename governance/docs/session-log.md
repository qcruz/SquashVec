# Governance — Session Log
*Brief record of each development session. Update at the end of every session.*
*Full project docs updated periodically — see notes below for when a full sync is due.*

---

## Session 14 — 2026-07-23

**Focus:** LEAN_DECK non-economy resource tuning (governance + military); identity card Opt2 fix

### LEAN_DECK Resource Count Increases
Added +1 copy of each non-economy governance and military stacking card:
- `alliance`: ×1 → ×2
- `efficient_administration`: ×4 → ×5
- `loyalists`: ×4 → ×5
- `border_fortification`: ×4 → ×5

Additional +2 governance non-economy resources:
- `alliance`: ×2 → ×3
- `loyalists`: ×5 → ×6

Additional +1 military and +1 technology non-economy resources:
- `war_council`: ×3 → ×4
- `research_grants`: ×3 → ×4

Additional +2 military non-economy, non-governance resources:
- `border_fortification`: ×5 → ×7 (only qualifying card in category)

LEAN_DECK total: ~338 slots. STARTER_DECK unchanged.

### Identity Card Opt2 Fix
All 20 primary identity cards had `draw_and_discard_self` on Option 2 instead of `draw_and_shuffle_self`. Replaced all instances — description updated to "Draw 1 card. Shuffle this card into the deck." Consistent with companion card Opt2 behaviour.

---

## Session 13 — 2026-07-21

**Focus:** Autoplay AI update — generalist rewrite, tie-breaking, new effect valuation

### Generalist AI — Card Selection Rewrite
- **New priority logic** replaces "pick highest delta, pass if < -1":
  - Identifies `worstInstabCat` (most instability) and `weakestResCat` (shortest stack) each step
  - Instability-clearing effects get +10 score boost if targeting worst pile, +5 otherwise
  - Resource-building effects targeting weakest stack get +3 boost
  - Pass threshold changed from `delta < -1` → `delta < 0` (only pass if every card is a net loss)
- AI now plays significantly more cards per turn, prioritizing board health over greedy single-card scoring

### Option Tie-Breaking (Generalist + Maximizer)
- `autoSelectAndPlay`: replaced `>=` reduce (always picked last tied option) with random selection among all options within 0.01 of the max delta
- Same change applied to maximizer mode

### New `estimateOptionDelta` Handlers
- `remove_newest_resource_and_oldest_instability`: returns +1 if target category has instability (worth it), -1 if not (trades resource for nothing)
- `shuffle_hand_draw_self_to_instability`: returns `-(val * 0.75)` — hand cycling is neutral but self lands in instability, so AI avoids it unless forced

### Resource Card Count Increases
Bulked up culture and technology stacking pools to match environment depth:
- **Culture**: cultural_festival ×4, artistic_movement ×3, folk_songs ×4, oral_history ×4 (STARTER); similar in LEAN
- **Technology**: research_grants ×4, cartography ×4, invention_workshop ×4, applied_science ×4 (STARTER)

### Bug Fixes
- **Epidemic blank card**: duplicate definition at line ~5108 had invalid `discardTo: 'discard_pile'`, overwriting the correct definition in the card lookup map. Second definition removed.
- **Battle Hardened → Veteran Forces**: past-tense card name renamed; duplicate definition removed; deck arrays updated.
- **Expression card Opt2 redesign**: all 41 companion card Opt2s changed from conditional identity-stacking to `draw_and_shuffle_self` (recirculate). Autoplay now always plays these.

### Deck State
383 STARTER_DECK / **328 LEAN_DECK** (active)

### Docs Updated
- `card-list.md`: header counts, composition table, Battle Hardened → Veteran Forces

---

## Session 12 — 2026-07-21

**Focus:** New event cards (Purge, Dissent); identity management redesign; 41 identity companion cards

### New Cards — Purge & Dissent
- **`purge`** (governance stacking, value 2, exchange+hostile): Opt1 "Political Purge" — pay Economy, place on Governance (+2) or shuffle back (`remove_stack_card_and_optionally_place_self`). Opt2 "Show of Strength" — pay Military + discard hand card, place on Culture (+2) (`remove_stack_card_then_discard_hand_then_stack`). discardTo: governance, culture, economy instability.
- **`dissent`** (utility, value 1, policy+culture+governance): Opt1 "Speak Out" — shuffle 2 hand cards into deck, draw 2, self → culture instability (new effect). Opt2 "Channel It" — pay Governance, shuffle self into deck. discardTo: culture, military instability.
- Both added to LEAN_DECK (272 slots after these two)

### New Effect — `shuffle_hand_draw_self_to_instability`
- Implemented in `game.js`: player picks N hand cards to shuffle into deck (not discard), then draws N, then self goes to specified instability pile
- New `showShuffleHandModal` function — distinct modal text ("shuffle into deck" vs "discard")
- `pickDiscardHand` updated with `shuffleHandBack` flag to route selected hand cards to deck
- `continueHandDiscardChain` updated with `shuffleHandBack` modal routing + `drawAfter/toInstability` terminal handler

### Identity Management Redesign
- **Removed deck-search effects from all identity cards**: deleted all `benefit: { description, resourceCategory, count }` properties across all 41 identity cards in all 6 categories
- **Removed `applyIdentityBenefit()` function** from `game.js` and its call site in `resolveReplaceOrStack`
- **Removed `benefitHTML` display block** from card detail renderer
- Identity cards now provide a flat score boost only (value unchanged)

### New Effect — `remove_newest_resource_and_oldest_instability`
- Implemented in `game.js`: removes newest (top) resource from `targetCategory` stack → deck, then removes oldest instability from same category's pile → deck (if any). Card uses `discardTo` after.
- `canPlayOption` requires `targetCategory` stack ≥ 1
- Used by all 41 identity companion cards (Opt 1)

### Identity Companion Cards (41 new cards)
One companion card per identity. Design rules: Opt 1 drains a fixed category (not the identity's own), Opt 2 places as +1 resource on another fixed category if the matching identity is active (otherwise shuffles to deck). Drain ≠ produce. Each identity group collectively covers all 5 other categories as Opt 2 targets.

Added to `cards.js` and LEAN_DECK (1 copy each):

| Group | Cards |
|-------|-------|
| Governance (7) | electoral_mandate, holy_decree, senate_motion, closed_circle, royal_assent, iron_will, rally_the_base |
| Economy (6) | open_market, factory_output, carbon_budget, harvest_season, state_directive, credit_expansion |
| Culture (8) | community_council, established_order, academic_program, patron_of_the_arts, living_memory, charitable_works, commercial_charter, natural_philosophy |
| Military (6) | forward_advance, treaty_obligations, fortification, tactical_redeployment, measured_action, total_war |
| Technology (6) | applied_solutions, frontier_science, risk_assessment, research_protocol, breakthrough, academic_consensus |
| Environment (8) | harsh_terrain, highland_law, river_trade, federal_compact, maritime_routes, grain_surplus, desert_adaptation, delta_culture |

### Deck State
363 STARTER_DECK slots / **313 LEAN_DECK slots** (active), 375+ total card definitions

### Pending
- Scapegoating card design pending approval
- Censorship, Revolution, Gunboat Diplomacy still in review queue

---

## Session 11 — 2026-07-20

**Focus:** Duplicate-option audit and fixes; exchange card strategic optionality audit

### Changes
- **Audited all cards for identical options** — identified 3 cards where both options produced the same output (different conditions or costs but identical destination/result):
  - `research_grants`: both options stacked on Technology (+2); Option 2 was strictly better (free)
  - `activists`: both options stacked on Culture (+1); only condition differed
  - `unions`: both options stacked on Governance (+1); only condition differed
- **`research_grants` Option 2 — Redirect Grants**: changed from free `stack_on_category` → Technology to `pay_own_stack_then_stack_on_any` paying Technology, stacking on Economy or Culture (+2). Now mirrors `cartography` Option 2 pattern — meaningful tradeoff between building Technology (Option 1, costs Economy) vs redirecting grants cross-category (Option 2, costs Technology)
- **`activists` Option 2 — Military Protest**: changed `targetCategory` from `culture` → `military`. Now: Option 1 builds Culture if Culture has instability; Option 2 builds Military if Military has instability. Meaningful divergent outcomes.
- **`unions` Option 2 — Environmental Advocacy**: changed `targetCategory` from `governance` → `environment`. Now: Option 1 builds Governance if Economy has instability; Option 2 builds Environment if Environment has instability. Meaningful divergent outcomes.
- No new effects used — all three fixes use already-implemented effect types

### Exchange Card Optionality Audit
- **Reviewed all 22 exchange-tagged card definitions** for strategic optionality
- **14 cards** already had meaningful option divergence (different destinations, mirror swaps, or instability-clear vs stack-build choices) — no changes needed
- **8 cards** had same-destination options (different payment source but identical output category) — all updated so Option 2 routes to a new category, creating genuine routing decisions:
  - `efficient_administration` Opt2: pay Culture → Governance → **Economy** (+1)
  - `heritage_fund` Opt2: pay Governance → Culture → **Economy** (+1); discardTo adds economy_instability
  - `conscription` Opt2 "Civic Duty": pay Culture → Military → **Governance** (+1); discardTo adds governance_instability; label renamed from "Call to Arms"
  - `land_reclamation` Opt2: pay Technology → Environment → **Culture** (+1); discardTo adds culture_instability
  - `technology_transfer` Opt2: pay Governance → Technology → **Economy** (+2); discardTo swaps military_instability → economy_instability
  - `cultural_diplomacy` Opt2 "Military Alliance": pay Governance → Culture → **Military** (+2); discardTo swaps governance_instability → military_instability; label renamed from "State Directive"
  - `conservation_program` Opt2 "Cultural Heritage Initiative": pay Governance → Environment → **Culture** (+2); discardTo swaps governance_instability → culture_instability; label renamed from "Policy Initiative"
  - `automation_drive` Opt2: pay Technology → Technology → **Economy** (+2); discardTo already had economy_instability ✅
- Rule confirmed: Option 2 destination must never match its own payment source category

### Deck State
363 STARTER_DECK slots / 276 LEAN_DECK slots (active), 334 total card definitions

---

## Session 10 — 2026-07-19

**Focus:** AI mode expansion, deck tuning, tag play tracking, stats display simplification

### Changes
- **Renamed maximize AI → generalist**; all references updated in `AUTO`, button IDs, `autoPlayStep`, `resolveAutoPendingAction`, stats keys
- **Added maximizer AI mode**: randomly selects a target category at game start (re-randomized after each game); uses `estimateOptionDeltaMaximizer` which wraps `estimateOptionDelta` with ±4/3/5 bias for target-aligned plays; `preferTarget`/`avoidTarget` helpers route all pending-action decisions
- **`estimateOptionDeltaMaximizer(card, opt, targetCat)`** — new function; overlays target-category bias on top of standard `estimateOptionDelta` scores
- **Added maximizer button** to header controls in `index.html`; removed maximize button
- **Environmental resource counts bumped +1** per card (frozen_tundra, dense_forests, mineral_deposits, rare_plants, rich_soil, natural_springs, coastal_fisheries → 5×; land_survey, river_network → 4×; abundant_harvest → 5×) in both STARTER_DECK and LEAN_DECK
- **Military/economy resource counts bumped +2** per card (war_council, military_exercise, border_fortification, battle_hardened, surplus_goods, trade_surplus, tax_collection, trade_routes) in both decks
- **STARTER_DECK** 338 → 363 slots; **LEAN_DECK** 244 → 269 slots
- **Tag play tracking**: each card played in autoplay increments `AUTO.stats[mode].tagPlays[tag]` for every tag on the card (tracked in `autoSelectAndPlay`)
- **`blankModeStat()`** now includes `tagPlays: {}` field
- **Stats display simplified to single active-mode column**: `updateAutoStatsDisplay` now renders only `AUTO.stats[AUTO.mode]`; removed three-column layout and `.astat-three-col`
- **`renderModeStats`** now includes a "Tag plays" section (top 15 tags by play count); accepts optional `extraHeader` for mode-specific context (e.g. maximizer target category)

### Deck State
363 STARTER_DECK slots / 269 LEAN_DECK slots (active), 334 total card definitions

---

## Session 9 — 2026-07-19

**Focus:** Hostile card expansion, global event card mechanic, lean deck build

### Changes
- **Added 8 hostile cards** — 2 per category previously at 0 hostile (Governance, Culture, Technology, Environment):
  - *Value 2 stacking (exchange pattern):* Regulatory Capture (Gov), Propaganda Campaign (Cul), Cyber Attack (Tec), Resource Extraction (Env) — pay own resource + discard hand → stack on cross category, OR remove cross instability + discard hand → stack on own category
  - *Value 3 stacking (destabilization pattern):* Emergency Powers (Gov), Cultural Erasure (Cul), Patent Warfare (Tec), Industrial Pollution (Env) — pay own resource → place self in target instability (−3), OR pay cross resource → stack +3 on own category
- **Added 6 global event cards** — 1 per category, `subtype: 'hazard'`, `mustPlayWhenDrawn: true`:
  - Global Recession (Economy), Constitutional Crisis (Governance), Mass Uprising (Culture), Arms Escalation (Military), Tech Collapse (Technology), Climate Crisis (Environment, threshold 5, penalty 3)
  - Mechanic: cooperative threshold auto-negate fires before options (counts matching-tag cards in draw deck); Opt 1 pays 3 resources to escape individually; Opt 2 takes penalty (remove_stack or deck_to_instability)
  - Constitutional Crisis and Arms Escalation use `deck_to_instability` penalty; all others use `remove_stack`
- **2 new game.js effects:** `global_event_escape`, `global_event_penalty`
- **New helper:** `applyGlobalEventPenalty(card)` — reads `card.penaltyType`, `card.penaltyCategory`, `card.penaltyCount`
- **Cooperative threshold pre-check** added at top of `resolveEventCard` — fires for any card with `card.cooperativeThreshold` set; auto-negates and discards card if deck count ≥ threshold
- **STARTER_DECK** grows 324 → 338 slots; 334 total card definitions
- **Added `LEAN_DECK`** constant (244 slots) — all duplicates removed except 10 natural resource stacking cards (frozen_tundra, dense_forests, mineral_deposits, rare_plants, rich_soil, natural_springs, coastal_fisheries, land_survey, river_network, abundant_harvest). Game switched to `LEAN_DECK` for testing.

### Deck State
338 STARTER_DECK slots / 244 LEAN_DECK slots (active), 334 total card definitions

### Notes
- To switch back to full deck: change `LEAN_DECK` → `STARTER_DECK` in `newGameState()` in game.js
- Global event cooperative threshold uses tag-count in draw deck — higher card diversity in deck = less risk of triggering global penalties

---

## Session 8 — 2026-07-17

**Focus:** Card tag system — design, implementation, display

### Changes
- **Added `tags` field to all 285 card objects** in `js/cards.js` (including duplicates)
  - Tag rules: `identity` (category cards), `resource` (stacking events), `instability` (hazard events), `policy` (utility events)
  - Special overrides: `hostile` added to direct_attack, arms_package, sanctions, destabilization, occupation, incursion
  - Must-play hazards get both `instability` + `event`: forest_fire, environmental_collapse, indecisiveness
  - Mixed tags: military_exercise (`resource` + `policy`); occupation/incursion (`policy` + `hostile`); direct_attack/arms_package/sanctions/destabilization (`resource` + `hostile`)
  - Single-tag overrides: immigration (`resource`), alliance (`resource`), free_trade_agreement (`resource`), martial_law (`policy`), all management philosophy/diplomacy cards (`policy`)
- **Added tag rendering to all three card display contexts** in `js/game.js`:
  - Hand cards (`.hc-tags` with pill spans)
  - Detail panel (`.detail-tags` under card name)
  - Library overlay (same `.hc-tags` pill layout)
- **Added tag CSS** in `css/style.css`:
  - `.hc-tag` / `.detail-tag` — neutral pill at 7px/8px uppercase
  - `.hc-tag-hostile` / `.detail-tag-hostile` — red tint
  - `.hc-tag-event` / `.detail-tag-event` — yellow tint (must-play marker)
  - Tinted card overrides so pills stay readable on green/red/gold backgrounds

### Deck State
276 STARTER_DECK slots (unchanged)

### Notes
- Tag definitions confirmed: resource, instability, identity, policy, structure (unused), global (unused), event (must-play), hostile

**Session 8 continued (2026-07-18, part 1):**
- **Refined tag taxonomy** — split `resource` into `resource` (free-stack, 81 slots) vs `exchange` (all options cost something, 21 slots). Updated TAG_OVERRIDES for alliance, free_trade_agreement, tax_collection, efficient_administration, loyalists, civic_charter, artistic_movement, scientific_breakthrough, direct_attack/arms_package/sanctions/destabilization
- **Added category tags to every card** — each card now tagged with every category name referenced in its definition (id, category, costCategory, discardTo, options). Written as Python script `governance/add-tags.py`; revised to use full card block (not truncated block) to catch costCategory/discardTo references after the value line
- **Added tag color CSS** — `.hc-tag-exchange` (blue), 6 category classes: `.hc-tag-governance` (purple), `.hc-tag-economy` (green), `.hc-tag-culture` (brown), `.hc-tag-military` (red), `.hc-tag-technology` (blue), `.hc-tag-environment` (dark green)
- **Updated game.js** tag rendering — both renderHand() and library overlay now detect category tags and apply `hc-tag-{category}` class
- **Updated deck-builds.md** — added Tag Distribution by Category table, Cards by Tag section, Cross-Category Tag Connections table, balance flags. Fixed hostile section primary tags (exchange, not resource)
- **Added 10 new exchange cards** to balance exchange counts to 8/7/7/7/3/2 across categories
  - Culture: Heritage Fund ×1 (value 1), Cultural Diplomacy ×1 (value 2)
  - Environment: Land Reclamation ×1 (value 1), Conservation Program ×1 (value 2)
  - Military: Conscription ×2 (value 1), Arms Trade ×1 (value 2)
  - Technology: Patent License ×2 (value 1), Venture Capital ×2 (value 2), Technology Transfer ×1 (value 2), Automation Drive ×1 (value 2)
- **STARTER_DECK** grows from 276 → 289 slots; 295 total card definitions
- **design.md** updated with exchange balance rule, difficulty curve, culture/environment design rationale

**Session 8 continued (2026-07-18, part 2):**
- **Replaced unapproved policy card design note** in `docs/design.md` with owner-confirmed wording covering cost weight, cross-category costs, option directions (Opt A: pay resources/hand → remove instability; Opt B: place self in instability → draw cards), and level tiers 1–3
- **Added `docs/CLAUDE.md` rule** — never write to design.md without explicit owner confirmation of exact wording
- **Implemented 25 policy cards** — 5 per category (Economy, Culture, Military, Technology, Environment):
  - Level 1 resource (×2 each): Market Correction, Social Harmony, Ceasefire, Patent Reform, Conservation Policy
  - Level 1 hand-discard (×1 each): Deficit Spending, Populist Appeal, Fortified Peace, Open Source Initiative, Controlled Burn
  - Level 2 own (×2 each): Debt Restructuring, Cultural Reconciliation, War of Attrition, R&D Investment, Ecological Restoration
  - Level 2 cross-category (×1 each): Fiscal Consolidation, National Reckoning, Force Projection, Digital Transformation, Climate Accord
  - Level 3 (×1 each): Economic Overhaul, Cultural Renaissance, Total Mobilization, Technological Revolution, New Deal
- **3 new game.js effects:**
  - `draw_n_then_place_in_instability` — draw N cards, place self in category instability (Opt B)
  - `discard_hand_then_remove_instability` — discard 1 hand card → remove N instability from target category (level-1 hand Opt A)
  - `remove_two_stack_cards_then_remove_instability` — auto-pay 2 resources from specified stacks → remove N instability (cross-category and level-3 Opt A)
- **Modified** `remove_stack_card_then_remove_instability` to support `targetCategory`, `stackEnd: 'newest'`, and `afterShuffle` parameters
- **STARTER_DECK** grows from 289 → 324 slots; 320 total card definitions
- **docs/effects-reference.md** updated with 4 new/modified effect entries
- **docs/planned-cards.md** — all 25 policy card drafts marked ✅ Implemented

---

## Session 7 — 2026-07-15

**Focus:** Design questions, doc buildout, implement three draft cards

### Changes
- **Answered all 6 open design questions** in `docs/questions.md` — stacks persist on replacement, no hand size cap, no stack cap, Democracy draw bonus kept, multiplayer_only eliminated, Alliance redesigned
- **Expanded design.md** — Long Game Philosophy (Jenga model), Instability Difficulty Tiers table, Hand Size section, identity card rules (stacks persist, oldest cost), Solo/Multiplayer dual-design rule, Planned Mechanics section (card_in_stack, resource swap, coalition network)
- **Implemented Alliance** (redesigned) — was a Governance identity card; now a Governance stacking event (+2). Opt 1: pay oldest Culture → stack on Governance. Opt 2: remove 1 Military instability → shuffle self into deck. Old identity removed from STARTER_DECK; 2× event copies added.
- **Implemented Martial Law** — new Governance utility event (value 3). Opt 1 (Dictatorship active): costs 1 Military. Opt 2 (any identity): costs 1 Military + 2 Governance. Both remove all Crime instability (crime, criminal_conspiracy, organized_crime) from all piles → deck, then place self in Governance instability. Added 2× to STARTER_DECK.
- **Implemented Free Trade Agreement** — new Economy stacking event (value 1). Opt 1 (free, condition: Alliance in any stack). Opt 2: pay oldest Governance → stack on Economy. 2× added to STARTER_DECK.
- **Added `card_in_stack` condition** to `checkCondition` and `checkConditionDisplay` in game.js
- **Added `afterShuffle` flag** support to `remove_instability_modal` effect
- **Added two new effects** — `remove_stack_card_then_remove_crime_instability`, `remove_multi_stack_then_remove_crime_instability` — with canPlayOption checks and estimateOptionDelta heuristics
- **Added `removeCrimeInstability()` helper** — scans all instability piles, removes crime-arc cards
- **Updated effects-reference.md** — new effects, afterShuffle flag, card_in_stack condition documented
- **Updated planned-cards.md** — three cards marked Implemented, moved to Implemented section

### Deck State
309 STARTER_DECK slots, 168 unique card IDs (alliance event + martial_law + free_trade_agreement)

### Notes
- FTA swap mechanic (Opt 2 original concept) deferred — requires a new "pick any specific stack card" modal not yet implemented
- Coalition synergy network established: Alliance anchors future cards (Non-Aggression Pact, Cultural Exchange, etc.)

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
