# Governance — Balanced Build Stage 1
*Date: 2026-07-22*
*Git tag: deck-stage-1*

---

## Summary

First stable, balanced LEAN_DECK build. 328 slots. All six categories have
meaningful resource depth. Identity companions, policy recovery cards, hostile
events, and global events fully integrated.

**Active deck:** `LEAN_DECK` in `js/cards.js`

---

## Deck Slot Counts

| Type | Slots |
|------|-------|
| Identity cards (41 unique × 1) | 41 |
| Identity companion cards / exp (41 × 1) | 41 |
| Governance resources | ~36 |
| Economy resources | ~30 |
| Culture resources | ~20 |
| Military resources | ~18 |
| Technology resources | ~18 |
| Environment resources | ~35 |
| Hazard events | ~55 |
| Policy cards (5 per category × 5 categories) | 25 |
| Utility / management philosophy | ~20 |
| Hostile + global events | 20 |
| Exchange / cross-category | ~15 |
| **Total** | **328** |

---

## Balance Notes

- Governance: deepest resource pool — efficient_administration, activists, unions,
  loyalists, public_works, civic_charter, civic_assembly, public_decree each at 3–4×
- Culture: bulked up this session — cultural_festival, folk_songs, oral_history,
  artistic_movement each at 3–4×
- Technology: bulked up this session — cartography, invention_workshop,
  applied_science, research_grants each at 3–4×
- Environment: abundant_harvest, river_network, land_survey, frozen_tundra and
  the full dense_forests / mineral_deposits / rare_plants / rich_soil /
  natural_springs / coastal_fisheries suite
- Economy: tax_collection, market_expansion, surplus_goods, trade_surplus,
  trade_routes, plus exchange cards
- Military: war_council, border_fortification, veteran_forces, military_campaign

---

## Key Design State

- All 41 identity companion cards use Opt2 = `draw_and_shuffle_self` (recirculate)
- Identity cards: flat score boost only (deck-search benefit removed)
- Autoplay generalist: prioritizes highest instability pile, then weakest resource stack;
  passes only on net-loss cards
- LEAN_DECK is the active tuning deck; STARTER_DECK is reference only

---

## Changes Since Last Milestone

- Purge and Dissent event cards added
- 41 identity companion cards added (exp tag)
- `shuffle_hand_draw_self_to_instability` and `remove_newest_resource_and_oldest_instability` effects implemented
- Epidemic blank card bug fixed (duplicate definition)
- Battle Hardened renamed to Veteran Forces
- Autoplay AI: board-priority generalist logic, random tie-breaking, new effect valuation
- Culture/tech/governance/environment resource counts increased in LEAN_DECK
