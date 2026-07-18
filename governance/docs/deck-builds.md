# Governance — Finalized Deck Builds

> This document tracks the best-performing deck builds found through testing.
> The **Current Build** is what is loaded in STARTER_DECK in `js/cards.js`.
> When a new build replaces the current one, the old build moves to **Build History** — never deleted.
> Use build history to revert to an earlier composition at any time.

---

## How to Use This Document

- **Current Build** — the active STARTER_DECK composition. Update this section whenever STARTER_DECK changes.
- **Build History** — archived builds in reverse chronological order. Each has a full card list so the deck can be fully reconstructed.
- **Updating:** When changing the deck, copy the Current Build block into Build History (with date and reason for replacement), then overwrite Current Build with the new composition.

---

## Current Build — Build 1 (2026-07-15)

**Deck size:** 276 slots · 167 unique card IDs
**Composition:** 80 hazards (29%) · 108 stacking/territory (39%) · 44 utility/philosophy (16%) · 38 identity (14%) · 6 other (2%)
**Hazard:utility ratio:** 1.8×
**Status:** First finalized build. Deck rebalanced from 308-slot bloated build (4.6× hazard:utility ratio). Doubled management philosophy cards. Removed duplicated hazard sections.

### Scoring Formula
```
Category Score = 10 (base) + active identity value + sum(stack values) − sum(instability values)
Win: any category reaches 20 · Lose: any category drops to 0
```

---

### GOVERNANCE — Identity Cards (institution)

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Democracy | 2 | replace_plus_stack_cost (culture) | draw_and_shuffle_self | governance_instability, culture_instability (+draw 1) |
| ×1 | Theocracy | 2 | replace_plus_stack_cost (culture) | draw_and_shuffle_self | governance_instability, culture_instability |
| ×2 | Republic | 2 | replace_plus_stack_cost (culture) | draw_and_shuffle_self | governance_instability, culture_instability |
| ×1 | Oligarchy | 2 | replace_plus_stack_cost (economy) | draw_and_discard_self | governance_instability, economy_instability |
| ×1 | Constitutional Monarchy | 3 | replace_plus_stack_cost (culture) | draw_and_discard_self | governance_instability |
| ×1 | Dictatorship | 3 | replace_plus_stack_cost (military) | draw_and_shuffle_self | governance_instability, military_instability |
| ×1 | Populist Governance | 2 | replace_plus_stack_cost (culture) | draw_and_shuffle_self | governance_instability, culture_instability |

### GOVERNANCE — Stacking Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Alliance | 2 | remove_stack_card_then_stack_on_category (culture→governance) | remove_instability_modal (military, afterShuffle) | governance_instability, culture_instability |
| ×2 | Civic Assembly | 1 | stack_on_category (governance) | pay_own_stack_then_stack_on_any (governance, economy/military) | governance_instability |
| ×1 | Civic Charter | 2 | remove_stack_card_and_optionally_place_self | remove_stack_card_and_optionally_place_self | governance_instability |
| ×1 | Efficient Administration | 1 | remove_stack_card_and_optionally_place_self | remove_stack_card_and_optionally_place_self | shuffle_to_deck |
| ×4 | Loyalists | 1 | remove_stack_card_and_optionally_place_self | remove_stack_card_and_optionally_place_self | shuffle_to_deck |
| ×2 | Public Decree | 2 | stack_on_category (governance) | pay_own_stack_then_stack_on_any (governance, economy/military) | governance_instability |
| ×1 | Public Works | 2 | remove_stack_card_and_optionally_place_self | stack_on_category | governance_instability |
| ×2 | Unions | 1 | stack_on_category | stack_on_category | governance_instability |

### GOVERNANCE — Utility Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Adaptive Management | 2 | remove_instability_modal (any, 1) | pay_own_stack_then_stack_on_any (governance, economy/military) | shuffle_to_deck |
| ×2 | Austerity | 1 | remove_one_from_each_stack_and_each_instab | remove_three_resources_clear_one_pile | shuffle_to_deck |
| ×2 | Consolidation | 1 | remove_instability_modal (any, 2) | remove_two_instability_modal | shuffle_to_deck, governance_instability |
| ×2 | Crisis Protocol | 1 | remove_instability_modal (any, 1, selfDiscard) | remove_two_instability_modal | shuffle_to_deck |
| ×2 | Grand Strategy | 1 | draw_if_hand_small | remove_stack_card_then_remove_instability (military, 2) | shuffle_to_deck |
| ×2 | Managed Decline | 1 | remove_two_newest_resources_remove_instability | remove_all_oldest_then_remove_two_instability | shuffle_to_deck |
| ×2 | Martial Law | 3 | remove_stack_card_then_remove_crime_instability (military, cond: dictatorship) | remove_multi_stack_then_remove_crime_instability (military+gov+gov) | governance_instability |
| ×2 | Preparedness | 1 | draw_if_hand_small | draw_and_shuffle_self | governance_instability, culture_instability |
| ×2 | Rationalization | 1 | strip_stack_to_oldest_and_instab | remove_three_from_stack_remove_two_instab | shuffle_to_deck, governance_instability |
| ×2 | Redundancy Systems | 1 | move_newest_resource_to_sparse_stack | remove_stack_card_then_remove_instability (technology, 2) | shuffle_to_deck |
| ×2 | Structural Consolidation | 1 | remove_stack_card_then_remove_instability (governance, 2) | move_instability_modal | shuffle_to_deck |

### GOVERNANCE — Hazard Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×1 | Crime Wave | 1 | discard_self | remove_stack_card_then_shuffle_self (governance) | governance_instability |
| ×1 | Leaked Report | 2 | discard_self | remove_stack_card_then_shuffle_self (governance) | governance_instability |
| ×1 | Political Strife | 2 | discard_self | remove_stack_card_then_shuffle_self (governance) | governance_instability |
| ×1 | Public Backlash | 2 | discard_self | remove_stack_card_then_shuffle_self (governance) | governance_instability |

---

### ECONOMY — Identity Cards (institution)

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Agrarian Economy | 1 | replace_plus_stack_cost (environment) | draw_and_discard_self | economy_instability, environment_instability |
| ×1 | Banking System | 3 | replace_plus_stack_cost (governance) | draw_and_discard_self | economy_instability |
| ×1 | Command Economy | 2 | replace_plus_stack_cost (governance) | draw_and_discard_self | economy_instability, governance_instability |
| ×2 | Free Trade | 2 | replace_plus_stack_cost (environment) | draw_and_shuffle_self | shuffle_to_deck |
| ×2 | Green Investment | 3 | replace_plus_stack_cost (environment) | draw_and_shuffle_self | economy_instability |
| ×2 | Industrial Expansion | 4 | replace_plus_stack_cost (environment) | draw_and_shuffle_self | economy_instability, environment_instability |

### ECONOMY — Stacking Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Arms Package | 2 | remove_stack_card_then_discard_hand_then_stack (economy→military) | remove_instability_then_discard_hand_then_stack (→military) | governance_instability, culture_instability, economy_instability |
| ×2 | Free Trade Agreement | 1 | stack_on_category (economy, cond: alliance in stack) | remove_stack_card_then_stack_on_category (governance→economy) | governance_instability, military_instability |
| ×1 | Market Expansion | 1 | stack_on_category (economy) | pay_own_stack_then_stack_on_any (economy, governance/military) | economy_instability |
| ×1 | Sanctions | 1 | remove_stack_card_then_discard_hand_then_stack (economy→military) | remove_instability_then_discard_hand_then_stack (→military) | governance_instability, culture_instability, economy_instability |
| ×2 | Surplus Goods | 1 | stack_on_category (economy) | pay_own_stack_then_stack_on_any (economy, governance/military) | economy_instability |
| ×2 | Tax Collection | 2 | remove_stack_card_and_optionally_place_self | remove_stack_card_then_shuffle_self (economy) | economy_instability |
| ×4 | Tax Decrease | 1 | stack_on_category (economy) | stack_on_category (governance) | economy_instability |
| ×4 | Tax Increase | 2 | stack_on_category (economy) | pay_own_stack_then_stack_on_any (economy, governance/military) | culture_instability |
| ×1 | Trade Routes | 2 | remove_stack_card_and_optionally_place_self | stack_on_category | economy_instability |
| ×2 | Trade Surplus | 2 | stack_on_category (economy) | pay_own_stack_then_stack_on_any (economy, governance/military) | economy_instability |

### ECONOMY — Hazard Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×1 | Hyperinflation | 3 | discard_self | remove_stack_card_then_shuffle_self (economy) | economy_instability |
| ×1 | Market Crash | 3 | discard_self | remove_stack_card_then_shuffle_self (economy) | economy_instability |
| ×1 | National Debt | 3 | discard_self | remove_stack_card_then_shuffle_self (economy) | economy_instability |
| ×1 | Recession | 2 | discard_self | remove_stack_card_then_shuffle_self (economy) | economy_instability |
| ×1 | Supply Shortage | 2 | discard_self | remove_stack_card_then_shuffle_self (economy) | economy_instability |
| ×1 | Trade War | 2 | discard_self | remove_stack_card_then_shuffle_self (economy) | economy_instability |

---

### CULTURE — Identity Cards (institution)

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×1 | Enlightenment | 4 | replace_plus_stack_cost (military) | draw_and_discard_self | culture_instability |
| ×2 | Higher Education | 3 | replace_plus_stack_cost (economy) | draw_and_shuffle_self | culture_instability |
| ×2 | Matriarchy | 2 | replace_plus_stack_cost (economy) | draw_and_shuffle_self | culture_instability |
| ×1 | Merchant Class | 3 | replace_plus_stack_cost (economy) | draw_and_discard_self | culture_instability, economy_instability |
| ×2 | Oral Tradition | 1 | replace_plus_stack_cost (governance) | draw_and_discard_self | culture_instability |
| ×1 | Patriarchy | 2 | replace_plus_stack_cost (military) | draw_and_shuffle_self | culture_instability |
| ×1 | Religious Order | 2 | replace_plus_stack_cost (governance) | draw_and_discard_self | culture_instability, governance_instability |
| ×1 | Renaissance Culture | 5 | replace_plus_stack_cost (military) | draw_and_shuffle_self | culture_instability |

### CULTURE — Stacking Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Activists | 1 | stack_on_category (culture) | stack_on_category (governance) | culture_instability |
| ×1 | Artistic Movement | 2 | remove_stack_card_and_optionally_place_self | remove_instability_modal (culture) | culture_instability |
| ×1 | Cultural Festival | 2 | stack_on_category (culture) | pay_own_stack_then_stack_on_any (culture, governance/environment) | culture_instability |
| ×1 | Folk Songs | 1 | stack_on_category (culture) | pay_own_stack_then_stack_on_any (culture, governance/environment) | culture_instability |
| ×2 | Oral History | 1 | stack_on_category (culture) | pay_own_stack_then_stack_on_any (culture, governance/environment) | culture_instability |

### CULTURE — Hazard Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×1 | Brain Drain | 2 | discard_self | remove_stack_card_then_shuffle_self (culture) | culture_instability |
| ×1 | Cultural Suppression | 2 | discard_self | remove_stack_card_then_shuffle_self (culture) | culture_instability |
| ×1 | Generational Divide | 2 | discard_self | remove_stack_card_then_shuffle_self (culture) | culture_instability |
| ×1 | Loss of Faith | 2 | discard_self | remove_stack_card_then_shuffle_self (culture) | culture_instability |
| ×1 | Youthful Dissent | 1 | discard_self | remove_stack_card_then_shuffle_self (culture) | culture_instability |

---

### MILITARY — Identity Cards (institution)

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×1 | Adaptable Force | 2 | replace_plus_stack_cost (governance) | draw_and_discard_self | military_instability, economy_instability |
| ×2 | Aggressive Doctrine | 3 | replace_plus_stack_cost (economy) | draw_and_shuffle_self | military_instability |
| ×2 | Defensive Doctrine | 1 | replace_plus_stack_cost (governance) | draw_and_discard_self | military_instability |
| ×1 | Overwhelming Force | 4 | replace_plus_stack_cost (economy) | draw_and_discard_self | military_instability, technology_instability |
| ×1 | Proportional Response | 3 | replace_plus_stack_cost (governance) | draw_and_discard_self | military_instability |
| ×2 | Protectorate | 1 | replace_plus_stack_cost (governance) | draw_and_shuffle_self | military_instability |

### MILITARY — Stacking Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Battle Hardened | 1 | stack_on_category (military) | pay_own_stack_then_stack_on_any (military, economy/governance) | military_instability |
| ×1 | Border Fortification | 1 | stack_on_category (military) | pay_own_stack_then_stack_on_any (military, economy/governance) | military_instability |
| ×2 | Destabilization | 3 | remove_stack_card_then_place_in_instability (military→culture) | remove_stack_card_then_stack_on_category (governance→culture) | governance_instability, culture_instability, military_instability |
| ×2 | Direct Attack | 3 | remove_stack_card_then_remove_or_identity_then_stack (military) | remove_stack_card_then_remove_or_identity_then_stack | governance_instability, culture_instability, economy_instability, military_instability |
| ×1 | Military Campaign | 2 | stack_on_category (military) | pay_own_stack_then_stack_on_any (military, economy/governance) | military_instability |
| ×1 | War Council | 2 | remove_stack_card_and_optionally_place_self | stack_on_category | military_instability |

### MILITARY — Utility Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Disarmament | 1 | remove_stack_card_then_remove_n_from_stack (military, 3) | remove_stack_card_then_stack_on_category (governance→technology) | governance_instability, military_instability |
| ×1 | Military Exercise | 1 | remove_two_military_then_discard_three_hand | remove_two_military_then_draw_two | shuffle_to_deck |

### MILITARY — Hazard Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×1 | Arms Shortage | 2 | discard_self | remove_stack_card_then_shuffle_self (military) | military_instability |
| ×2 | Border Skirmish | 2 | discard_self | remove_stack_card_then_shuffle_self (military) | military_instability |
| ×2 | Desertion | 2 | discard_self | remove_stack_card_then_shuffle_self (military) | military_instability |
| ×2 | Mutiny | 3 | discard_self | remove_stack_card_then_shuffle_self (military) | military_instability |

---

### TECHNOLOGY — Identity Cards (philosophy)

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Cautious Progress | 2 | replace_plus_stack_cost (governance) | draw_and_shuffle_self | technology_instability |
| ×2 | Explore the Unknown | 2 | replace_plus_stack_cost (governance) | draw_and_shuffle_self | technology_instability, environment_instability |
| ×2 | Pragmatism | 1 | replace_plus_stack_cost (governance) | draw_and_shuffle_self | technology_instability |
| ×1 | Progress at All Costs | 3 | replace_plus_stack_cost (culture) | draw_and_shuffle_self | technology_instability, environment_instability |
| ×1 | Systematic Inquiry | 2 | replace_plus_stack_cost (culture) | draw_and_shuffle_self | technology_instability, culture_instability |
| ×1 | Theoretical Foundations | 3 | replace_plus_stack_cost (governance) | draw_and_shuffle_self | technology_instability |

### TECHNOLOGY — Stacking Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Applied Science | 2 | stack_on_category (technology) | pay_own_stack_then_stack_on_any (technology, economy/environment) | technology_instability |
| ×1 | Cartography | 1 | stack_on_category (technology) | pay_own_stack_then_stack_on_any (technology, economy/environment) | technology_instability |
| ×2 | Invention Workshop | 1 | stack_on_category (technology) | pay_own_stack_then_stack_on_any (technology, economy/environment) | technology_instability |
| ×1 | Research Grants | 2 | remove_stack_card_and_optionally_place_self | stack_on_category | technology_instability |
| ×1 | Scientific Breakthrough | 2 | remove_stack_card_and_optionally_place_self | remove_stack_card_and_optionally_place_self | shuffle_to_deck |

### TECHNOLOGY — Hazard Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×1 | Adverse Side Effects | 2 | discard_self | remove_stack_card_then_shuffle_self (technology) | technology_instability |
| ×1 | Cyber Warfare | 3 | place_self_to_instability (technology) | remove_two_stack_cards_then_bottom (technology, governance) | technology_instability |
| ×1 | Failed Experiment | 2 | discard_self | remove_stack_card_then_shuffle_self (technology) | technology_instability |
| ×2 | Misinformation | 2 | place_self_to_instability (culture) | remove_stack_card_then_shuffle_self (technology) | culture_instability |
| ×1 | Obsolescence | 2 | discard_self | remove_stack_card_then_shuffle_self (technology) | technology_instability |
| ×1 | Record Breach | 2 | discard_self | remove_stack_card_then_shuffle_self (technology) | technology_instability |
| ×1 | Remote Attack | 2 | discard_self | remove_stack_card_then_shuffle_self (technology) | technology_instability |
| ×1 | Stalled Research | 2 | discard_self | remove_stack_card_then_shuffle_self (technology) | technology_instability |
| ×1 | Surveillance State | 3 | place_self_to_instability (economy) | remove_two_stack_cards_then_bottom (technology, economy) | economy_instability |
| ×1 | Technological Collapse | 4 | place_self_to_instability (technology) | remove_three_stack_cards_then_bottom (technology, governance, economy) | technology_instability |

---

### ENVIRONMENT — Identity Cards (territory)

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×1 | Oceana | 3 | replace_plus_stack_cost (economy) | draw_and_shuffle_self | environment_instability, economy_instability |
| ×1 | The Desert Wastes | 1 | replace_plus_stack_cost (economy) | draw_and_discard_self | environment_instability |
| ×2 | The Fertile Plains | 2 | replace_plus_stack_cost (economy) | draw_and_discard_self | environment_instability, economy_instability |
| ×1 | The Great North | 1 | replace_plus_stack_cost (economy) | draw_and_shuffle_self | environment_instability |
| ×1 | The Highlands | 2 | replace_plus_stack_cost (economy) | draw_and_shuffle_self | environment_instability |
| ×1 | The River Delta | 3 | replace_plus_stack_cost (economy) | draw_and_discard_self | environment_instability, economy_instability |
| ×2 | The Union | 3 | replace_plus_stack_cost (economy) | draw_and_shuffle_self | environment_instability |
| ×1 | The Waterlands | 2 | replace_plus_stack_cost (economy) | draw_and_shuffle_self | environment_instability, economy_instability |

### ENVIRONMENT — Stacking Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×4 | Abundant Harvest | 1 | stack_on_category (environment) | pay_own_stack_then_stack_on_any (environment, culture/technology) | environment_instability |
| ×4 | Coastal Fisheries | 1 | stack_on_category (environment) | pay_own_stack_then_stack_on_any (environment, culture/technology) | environment_instability |
| ×4 | Dense Forests | 1 | stack_on_category (environment) | pay_own_stack_then_stack_on_any (environment, culture/technology) | environment_instability |
| ×4 | Frozen Tundra | 1 | stack_on_category (environment) | pay_own_stack_then_stack_on_any (environment, culture/technology) | environment_instability |
| ×3 | Land Survey | 1 | stack_on_category (environment) | pay_own_stack_then_stack_on_any (environment, culture/technology) | environment_instability |
| ×4 | Mineral Deposits | 1 | stack_on_category (environment) | pay_own_stack_then_stack_on_any (environment, culture/technology) | environment_instability |
| ×4 | Natural Springs | 1 | stack_on_category (environment) | pay_own_stack_then_stack_on_any (environment, culture/technology) | environment_instability |
| ×4 | Rare Plants | 1 | stack_on_category (environment) | pay_own_stack_then_stack_on_any (environment, culture/technology) | environment_instability |
| ×4 | Rich Soil | 1 | stack_on_category (environment) | pay_own_stack_then_stack_on_any (environment, culture/technology) | environment_instability |
| ×3 | River Network | 1 | stack_on_category (environment) | pay_own_stack_then_stack_on_any (environment, culture/technology) | environment_instability |

### ENVIRONMENT — Hazard Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×1 | Earthquake | 2 | discard_self | remove_stack_card_then_shuffle_self (environment) | environment_instability |
| ×1 | Environmental Collapse | 4 | remove_four_stack_cards_then_bottom (economy×2 + technology×2) | remove_all_from_stack_place_in_instability (environment) | environment_instability |
| ×2 | Forest Fire | 3 | discard_self | remove_stack_card_then_shuffle_self (technology) | environment_instability |
| ×2 | Harsh Winter | 2 | discard_self | remove_stack_card_then_shuffle_self (economy) | environment_instability |
| ×2 | Scorched Summer | 2 | discard_self | remove_stack_card_then_shuffle_self (economy) | environment_instability |
| ×1 | Tornado | 2 | discard_self | remove_stack_card_then_shuffle_self (environment) | environment_instability |

---

### CROSS-CATEGORY (category: null)

#### Must-Play

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×4 | Indecisiveness | 1 | discard_from_hand_modal (3 cards) | draw_if_hand_small | shuffle_to_deck |
| ×4 | Social Upheaval | 1 | discard_from_hand_then_shuffle_self (3 cards) | remove_stack_card_then_discard_self (culture) | governance_instability, culture_instability |

#### Hazard Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Corruption | 2 | discard_self | remove_stack_card_then_shuffle_self (governance) | governance_instability, economy_instability |
| ×2 | Coup Attempt | 2 | remove_stack_card_then_shuffle_self (governance) | discard_self | governance_instability, culture_instability |
| ×3 | Crime | 2 | remove_stack_card_then_shuffle_self (governance) | discard_self | economy_instability, governance_instability |
| ×2 | Criminal Conspiracy | 3 | remove_two_stack_cards_then_bottom (governance + military) | discard_hand_then_self (1 card) | governance_instability |
| ×1 | Cultural Purge | 3 | remove_all_from_stack_shuffle_self (culture, cond: allIdentitiesActive) | remove_one_from_each_stack | culture_instability |
| ×1 | Drought | 2 | discard_self | remove_stack_card_then_shuffle_self (environment) | environment_instability, economy_instability |
| ×1 | Epidemic | 2 | place_self_to_instability | suppress_hazard | — |
| ×2 | Flood | 2 | discard_self | remove_stack_card_then_shuffle_self (environment) | environment_instability, economy_instability |
| ×1 | Insider Trading | 3 | remove_all_from_stack_shuffle_self (economy, cond: allIdentitiesActive) | remove_one_from_each_stack | economy_instability |
| ×2 | Labor Shortage | 2 | remove_stack_card_then_shuffle_self (economy) | place_self_to_instability (economy) | economy_instability |
| ×1 | Organized Crime | 4 | remove_three_stack_cards_then_bottom (gov+mil+eco) [escalates to 4 if criminal_conspiracy in instability] | discard_from_hand_modal (2 cards) | governance_instability |
| ×1 | Political Assassination | 2 | discard_self | remove_stack_card_then_shuffle_self (governance) | governance_instability, military_instability |
| ×1 | Pollution | 3 | remove_all_from_stack_shuffle_self (environment, cond: allIdentitiesActive) | remove_one_from_each_stack | environment_instability |
| ×1 | Population Decline | 3 | remove_two_stack_cards_then_bottom (economy + culture) | discard_self | economy_instability, culture_instability |
| ×1 | Rebellion | 3 | remove_stack_card_then_shuffle_self (governance) | discard_self | governance_instability, military_instability, culture_instability |
| ×2 | Sabotage | 1 | remove_all_from_stack_shuffle_self (technology, cond: allIdentitiesActive) | remove_one_from_each_stack | technology_instability |
| ×1 | State Capture | 3 | remove_all_from_stack_shuffle_self (governance, cond: allIdentitiesActive) | remove_one_from_each_stack | governance_instability |
| ×2 | Toxic Spill | 2 | remove_stack_card_then_shuffle_self (technology) | place_self_to_instability (environment) | environment_instability |
| ×1 | Treason | 3 | remove_all_from_stack_shuffle_self (military, cond: allIdentitiesActive) | remove_one_from_each_stack | military_instability |
| ×2 | Worker Strike | 2 | discard_self | remove_stack_card_then_shuffle_self (economy) | economy_instability, governance_instability |

#### Utility Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×1 | Census | 1 | remove_instability_modal (any, 1, selfDiscard) | draw_and_shuffle_self | governance_instability, economy_instability |
| ×1 | Contingency Planning | 1 | remove_lowest_instability_modal | move_instability_modal | governance_instability, culture_instability |
| ×1 | Cultural Exchange | 1 | remove_instability_modal (any, 1) | stack_on_category (culture) | culture_instability |
| ×1 | Diplomatic Mission | 1 | remove_instability_modal (any, 1) | draw_and_shuffle_self | governance_instability, culture_instability |
| ×1 | Incursion | 1 | take_resource_to_economy (military/governance) | take_resource_to_economy | shuffle_to_deck |
| ×1 | Occupation | 1 | take_resource_to_economy (military/governance) | take_resource_to_economy | shuffle_to_deck |
| ×1 | Peace Treaty | 1 | remove_instability_modal (any, 1) | draw_and_shuffle_self | shuffle_to_deck |
| ×2 | Restitution | 1 | remove_two_resources_remove_instability_shuffle_self | remove_one_resource_remove_instability_discard_self | governance/culture/economy/technology/environment/military instability |
| ×2 | Revisionist History | 1 | remove_stack_card_then_remove_instability (governance, 1) | draw_and_shuffle_self | culture_instability, technology_instability |

#### Stacking Events

| Count | Name | Value | Opt 1 Effect | Opt 2 Effect | Discard To |
|-------|------|-------|--------------|--------------|------------|
| ×2 | Immigration | 2 | stack_on_category (economy) | stack_on_category_then_discard_hand (culture) | governance_instability |
| ×2 | Inspiring Speech | 1 | stack_on_any_modal (choices: any 2) | remove_instability_modal (any, 1) | shuffle_to_deck |
| ×1 | Trade Delegation | 1 | stack_on_any_modal | draw_and_shuffle_self | shuffle_to_deck |

---

## Deck Summary — Build 1

### By Subtype

| Category | Identity | Stacking | Utility | Hazard | Total |
|----------|----------|----------|---------|--------|-------|
| Governance | 9 | 15 | 22 | 4 | 50 |
| Economy | 10 | 19 | — | 6 | 35 |
| Culture | 11 | 7 | — | 5 | 23 |
| Military | 9 | 8 | 3 | 7 | 27 |
| Technology | 9 | 7 | — | 10 | 26 |
| Environment | 10 | 38 | — | 9 | 57 |
| Cross-category | — | 5 | 9 | 23 | 37 |
| **Total** | **58** | **99** | **34** | **64** | **255** |

*Note: Must-play cards (Indecisiveness ×4, Social Upheaval ×4) counted in hazard. Management philosophy cards counted in utility. 21 remaining slots: Martial Law ×2, Restitution ×2, Census ×1, Diplomatic Mission ×1, Peace Treaty ×1, Cultural Exchange ×1, Contingency Planning ×1, Revisionist History ×2, Disarmament ×2, Immigration ×2, Inspiring Speech ×2, Trade Delegation ×1, Military Exercise ×1, Occupation ×1, Incursion ×1.*

---

### By Tag

| Tag | Slots | Unique Cards | Notes |
|-----|-------|--------------|-------|
| `resource` | 103 | 48 | Stacking events — score boosters |
| `instability` | 80 | 57 | Hazard events — score threats |
| `identity` | 58 | 41 | Category cards — permanent base score |
| `policy` | 36 | 22 | Utility events — board management |
| `event` | 7 | 3 | Must-play when drawn (subset of instability) |
| `hostile` | 9 | 6 | Cards with opponent-facing effects |
| **Total occurrences** | **293** | — | *17 slots carry 2 tags* |

**Multi-tag cards** (count toward each of their tags):

| Card | Tags | Slots |
|------|------|-------|
| Direct Attack | resource + hostile | ×2 |
| Arms Package | resource + hostile | ×2 |
| Destabilization | resource + hostile | ×2 |
| Sanctions | resource + hostile | ×1 |
| Occupation | policy + hostile | ×1 |
| Incursion | policy + hostile | ×1 |
| Military Exercise | resource + policy | ×1 |
| Indecisiveness | instability + event | ×4 |
| Forest Fire | instability + event | ×2 |
| Environmental Collapse | instability + event | ×1 |

---

## Cards by Tag — Build 1

### IDENTITY — 58 slots · 41 unique cards

| Count | Name | Value |
|-------|------|-------|
| ×2 | Aggressive Doctrine | +3 |
| ×2 | Agrarian Economy | +1 |
| ×1 | Adaptable Force | +2 |
| ×1 | Banking System | +3 |
| ×2 | Cautious Progress | +2 |
| ×1 | Command Economy | +2 |
| ×1 | Constitutional Monarchy | +3 |
| ×2 | Defensive Doctrine | +1 |
| ×2 | Democracy | +2 |
| ×1 | Dictatorship | +3 |
| ×1 | Enlightenment | +4 |
| ×2 | Explore the Unknown | +2 |
| ×2 | Free Trade | +2 |
| ×2 | Green Investment | +3 |
| ×2 | Higher Education | +3 |
| ×2 | Industrial Expansion | +4 |
| ×2 | Matriarchy | +2 |
| ×1 | Merchant Class | +3 |
| ×1 | Oceana | +3 |
| ×1 | Oligarchy | +2 |
| ×2 | Oral Tradition | +1 |
| ×1 | Overwhelming Force | +4 |
| ×1 | Patriarchy | +2 |
| ×1 | Populist Governance | +2 |
| ×2 | Pragmatism | +1 |
| ×1 | Progress at All Costs | +3 |
| ×1 | Proportional Response | +3 |
| ×2 | Protectorate | +1 |
| ×1 | Religious Order | +2 |
| ×1 | Renaissance Culture | +5 |
| ×2 | Republic | +2 |
| ×1 | Systematic Inquiry | +2 |
| ×1 | The Desert Wastes | +1 |
| ×2 | The Fertile Plains | +2 |
| ×1 | The Great North | +1 |
| ×1 | The Highlands | +2 |
| ×1 | The River Delta | +3 |
| ×2 | The Union | +3 |
| ×1 | The Waterlands | +2 |
| ×1 | Theocracy | +2 |
| ×1 | Theoretical Foundations | +3 |

---

### RESOURCE — 103 slots · 48 unique cards

| Count | Name | Value | Notes |
|-------|------|-------|-------|
| ×4 | Abundant Harvest | +1 | |
| ×2 | Activists | +1 | |
| ×2 | Alliance | +2 | |
| ×2 | Applied Science | +2 | |
| ×2 | Arms Package | +2 | also hostile |
| ×1 | Artistic Movement | +2 | |
| ×2 | Battle Hardened | +1 | |
| ×1 | Border Fortification | +1 | |
| ×1 | Cartography | +1 | |
| ×2 | Civic Assembly | +1 | |
| ×1 | Civic Charter | +2 | |
| ×4 | Coastal Fisheries | +1 | |
| ×1 | Cultural Festival | +2 | |
| ×4 | Dense Forests | +1 | |
| ×2 | Destabilization | +3 | also hostile |
| ×2 | Direct Attack | +3 | also hostile |
| ×1 | Efficient Administration | +1 | |
| ×1 | Folk Songs | +1 | |
| ×2 | Free Trade Agreement | +1 | |
| ×4 | Frozen Tundra | +1 | |
| ×2 | Immigration | +2 | |
| ×2 | Inspiring Speech | +1 | |
| ×2 | Invention Workshop | +1 | |
| ×3 | Land Survey | +1 | |
| ×4 | Loyalists | +1 | |
| ×1 | Market Expansion | +1 | |
| ×1 | Military Campaign | +2 | |
| ×1 | Military Exercise | +1 | also policy |
| ×4 | Mineral Deposits | +1 | |
| ×4 | Natural Springs | +1 | |
| ×2 | Oral History | +1 | |
| ×2 | Public Decree | +2 | |
| ×1 | Public Works | +2 | |
| ×4 | Rare Plants | +1 | |
| ×1 | Research Grants | +2 | |
| ×4 | Rich Soil | +1 | |
| ×3 | River Network | +1 | |
| ×1 | Sanctions | +1 | also hostile |
| ×1 | Scientific Breakthrough | +2 | |
| ×2 | Surplus Goods | +1 | |
| ×2 | Tax Collection | +2 | |
| ×4 | Tax Decrease | +1 | |
| ×4 | Tax Increase | +2 | |
| ×1 | Trade Delegation | +1 | |
| ×1 | Trade Routes | +2 | |
| ×2 | Trade Surplus | +2 | |
| ×2 | Unions | +1 | |
| ×1 | War Council | +2 | |

---

### INSTABILITY — 80 slots · 57 unique cards

| Count | Name | Value | Notes |
|-------|------|-------|-------|
| ×1 | Adverse Side Effects | +2 | |
| ×1 | Arms Shortage | +2 | |
| ×2 | Border Skirmish | +2 | |
| ×1 | Brain Drain | +2 | |
| ×2 | Corruption | +2 | |
| ×2 | Coup Attempt | +2 | |
| ×3 | Crime | +2 | |
| ×1 | Crime Wave | +1 | |
| ×2 | Criminal Conspiracy | +3 | |
| ×1 | Cultural Purge | +3 | |
| ×1 | Cultural Suppression | +2 | |
| ×1 | Cyber Warfare | +3 | |
| ×2 | Desertion | +2 | |
| ×1 | Drought | +2 | |
| ×1 | Earthquake | +2 | |
| ×1 | Environmental Collapse | +4 | also event |
| ×1 | Epidemic | +2 | |
| ×1 | Failed Experiment | +2 | |
| ×2 | Flood | +2 | |
| ×2 | Forest Fire | +3 | also event |
| ×1 | Generational Divide | +2 | |
| ×2 | Harsh Winter | +2 | |
| ×1 | Hyperinflation | +3 | |
| ×4 | Indecisiveness | +1 | also event |
| ×1 | Insider Trading | +3 | |
| ×2 | Labor Shortage | +2 | |
| ×1 | Leaked Report | +2 | |
| ×1 | Loss of Faith | +2 | |
| ×1 | Market Crash | +3 | |
| ×2 | Misinformation | +2 | |
| ×2 | Mutiny | +3 | |
| ×1 | National Debt | +3 | |
| ×1 | Obsolescence | +2 | |
| ×1 | Organized Crime | +4 | |
| ×1 | Political Assassination | +2 | |
| ×1 | Political Strife | +2 | |
| ×1 | Pollution | +3 | |
| ×1 | Population Decline | +3 | |
| ×1 | Public Backlash | +2 | |
| ×1 | Rebellion | +3 | |
| ×1 | Recession | +2 | |
| ×1 | Record Breach | +2 | |
| ×1 | Remote Attack | +2 | |
| ×2 | Sabotage | +1 | |
| ×2 | Scorched Summer | +2 | |
| ×4 | Social Upheaval | +1 | |
| ×1 | Stalled Research | +2 | |
| ×1 | State Capture | +3 | |
| ×1 | Supply Shortage | +2 | |
| ×1 | Surveillance State | +3 | |
| ×1 | Technological Collapse | +4 | |
| ×1 | Tornado | +2 | |
| ×2 | Toxic Spill | +2 | |
| ×1 | Trade War | +2 | |
| ×1 | Treason | +3 | |
| ×2 | Worker Strike | +2 | |
| ×1 | Youthful Dissent | +1 | |

---

### POLICY — 36 slots · 22 unique cards

| Count | Name | Value | Notes |
|-------|------|-------|-------|
| ×2 | Adaptive Management | +2 | |
| ×2 | Austerity | +1 | |
| ×1 | Census | +1 | |
| ×2 | Consolidation | +1 | |
| ×1 | Contingency Planning | +1 | |
| ×2 | Crisis Protocol | +1 | |
| ×1 | Cultural Exchange | +1 | |
| ×1 | Diplomatic Mission | +1 | |
| ×2 | Disarmament | +1 | |
| ×2 | Grand Strategy | +1 | |
| ×1 | Incursion | +1 | also hostile |
| ×2 | Managed Decline | +1 | |
| ×2 | Martial Law | +3 | |
| ×1 | Military Exercise | +1 | also resource |
| ×1 | Occupation | +1 | also hostile |
| ×1 | Peace Treaty | +1 | |
| ×2 | Preparedness | +1 | |
| ×2 | Rationalization | +1 | |
| ×2 | Redundancy Systems | +1 | |
| ×2 | Restitution | +1 | |
| ×2 | Revisionist History | +1 | |
| ×2 | Structural Consolidation | +1 | |

---

### EVENT (must-play) — 7 slots · 3 unique cards

| Count | Name | Value |
|-------|------|-------|
| ×4 | Indecisiveness | +1 |
| ×2 | Forest Fire | +3 |
| ×1 | Environmental Collapse | +4 |

---

### HOSTILE — 9 slots · 6 unique cards

| Count | Name | Value | Primary Tag |
|-------|------|-------|-------------|
| ×2 | Direct Attack | +3 | resource |
| ×2 | Destabilization | +3 | resource |
| ×2 | Arms Package | +2 | resource |
| ×1 | Sanctions | +1 | resource |
| ×1 | Occupation | +1 | policy |
| ×1 | Incursion | +1 | policy |

---

---

## Build History

*Old builds are preserved here in reverse chronological order. Never delete an entry.*

*(No prior builds — Build 1 is the initial finalized build.)*

---

*Last updated: 2026-07-18 — Session 8 (added tag distribution + cards-by-tag)*
