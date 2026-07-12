# Governance — Session Log
*Brief record of each development session. Update at the end of every session.*
*Full project docs updated periodically — see notes below for when a full sync is due.*

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

*Next full sync due: after Session 5 or when 10+ cards change*
