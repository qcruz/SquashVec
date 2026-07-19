# Governance — Planned Cards
*Cards awaiting review and approval before implementation.*
*Add ideas here first. Do not add to cards.js until explicitly confirmed.*

---

## How to Use This File

1. Add card concepts here with as much or as little detail as needed.
2. Review with owner — adjust design, confirm mechanics.
3. Once approved, move to implementation and mark **✅ Approved**.
4. After implementation, move to **Implemented** section at the bottom.

Status tags: `[idea]` `[draft]` `[ready]` `✅ Approved` `✅ Implemented`

---

## Governance

| Name | Status | Concept |
|------|--------|---------|
| Alliance | `✅ Implemented` | **Redesigned — Governance stacking event (value +2).** Opt 1: Pay oldest Culture resource → stack on Governance. Opt 2: Remove 1 Military instability → shuffle self into deck. Discard: Governance instability or Culture instability. Anchors the diplomacy/coalition synergy network. |
| Free Trade Agreement | `✅ Implemented` | **Economy stacking event (value +1).** Opt 1 (free, requires Alliance in any stack). Opt 2: Pay oldest Governance → stack on Economy. Uses new `card_in_stack` condition. *(Swap mechanic deferred — requires pick-any-stack-card modal.)* |
| Martial Law | `✅ Implemented` | Governance utility (value 3). Opt 1 (Dictatorship): 1 Military cost. Opt 2 (any): 1 Military + 2 Governance. Both remove all Crime instability from all categories → Governance instability. |
| Emergency Powers | `[idea]` | Crisis only (Governance ≤ 7). Draw 3 cards. Place this in Governance instability. |
| Constitutional Reform | `[idea]` | Move 2 instability cards from any pile to the draw deck. Pay 2 Governance resources. |
| Coalition Government | `[idea]` | Requires Economy ≥ 12 AND Culture ≥ 12. Stack +3 on Governance. |
| Referendum | `[idea]` | Draw 3, discard 2. Shuffle self into deck. |
| Press Freedom | `[idea]` | If Governance ≥ 15: remove all Culture instability. Discard self. |

---

## Economy

| Name | Status | Concept |
|------|--------|---------|
| Foreign Investment | `[idea]` | Stack +2 on Economy AND +1 on any other category. |
| Monopoly | `[idea]` | Stack +4 on Economy. Place 1 Governance instability. |
| Trade Embargo | `[idea]` | Discard any 1 resource card from any stack. Draw 2. |
| Black Market | `[idea]` | Stack +1 on Economy without paying a resource cost. Place 1 Governance instability. |

### Policy Cards

| Name | Level | Status | Concept |
|------|-------|--------|---------|
| Market Correction | 1 | `✅ Implemented` | Opt A: Pay newest Economy → remove 1 Economy instability, shuffle self. Opt B: Draw 1, place self in Economy instability. |
| Deficit Spending | 1 (hand) | `✅ Implemented` | Opt A: Discard 1 hand card → remove 1 Economy instability, shuffle self. Opt B: Draw 1, place self in Economy instability. |
| Debt Restructuring | 2 | `✅ Implemented` | Opt A: Pay oldest Economy → remove 2 Economy instability, shuffle self. Opt B: Draw 2, place self in Economy instability. |
| Fiscal Austerity | 2 (cross) | `✅ Implemented` | Opt A: Pay Economy + Governance → remove 3 Economy instability, shuffle self. Opt B: Draw 2, place self in Economy instability. |
| Economic Overhaul | 3 | `✅ Implemented` | Opt A: Pay oldest Economy + oldest Governance → remove 4 Economy instability, shuffle self. Opt B: Draw 3, place self in Economy instability. |

---

## Culture

| Name | Status | Concept |
|------|--------|---------|
| Cultural Revolution | `[idea]` | Remove active Culture identity. Remove ALL Culture instability. Shuffle both into deck. |
| Great Library | `[idea]` | Stack +3 on Culture. While in stack: reduce cost of all Technology identity cards by 1. |
| Oral Epic | `[idea]` | Shuffle any 3 instability cards from any piles back into the deck. |
| Diaspora | `[idea]` | Remove 2 Culture instability. Stack +1 on any category for each removed. |
| Pilgrimage | `[idea]` | Draw 2. If one is a Governance identity, play it for free. Discard self. |

### Policy Cards

| Name | Level | Status | Concept |
|------|-------|--------|---------|
| Social Harmony | 1 | `✅ Implemented` | Opt A: Pay newest Culture → remove 1 Culture instability, shuffle self. Opt B: Draw 1, place self in Culture instability. |
| Populist Appeal | 1 (hand) | `✅ Implemented` | Opt A: Discard 1 hand card → remove 1 Culture instability, shuffle self. Opt B: Draw 1, place self in Culture instability. |
| Cultural Reconciliation | 2 | `✅ Implemented` | Opt A: Pay oldest Culture → remove 2 Culture instability, shuffle self. Opt B: Draw 2, place self in Culture instability. |
| National Reckoning | 2 (cross) | `✅ Implemented` | Opt A: Pay Culture + Governance → remove 3 Culture instability, shuffle self. Opt B: Draw 2, place self in Culture instability. |
| Cultural Renaissance | 3 | `✅ Implemented` | Opt A: Pay oldest Culture + oldest Economy → remove 4 Culture instability, shuffle self. Opt B: Draw 3, place self in Culture instability. |

---

## Military

| Name | Status | Concept |
|------|--------|---------|
| Surprise Attack | `[draft]` | Military stacking event (value 3). **Solo Opt 1:** Pay 1 Military resource → stack +3 on Military immediately (no cost modal — the surprise is the payoff). **Solo Opt 2:** Pay 1 Governance resource → stack +2 on any category of choice. **Multiplayer:** Opt 1 moves the oldest resource from an opponent's chosen category stack to your Military stack instead. Thematically: an internal rapid deployment or border raid. |
| Occupation | `[draft]` | Military stacking event (value 2). **Solo Opt 1:** Pay 1 Military + 1 Governance → stack +2 on Military AND remove 1 Military instability. **Solo Opt 2:** Pay 2 Military resources → stack +2 on Environment (territory secured). **Multiplayer:** Opt 1 places 1 instability into an opponent's Military pile instead of removing your own. Thematically: military occupation of territory. |
| Peace Dividend | `[idea]` | Remove Military identity from play (discard). Remove 2 Military instability. Draw 2. |
| Strategic Reserve | `[idea]` | Needs redesign — original concept used a delayed effect ("next turn"). New direction: draw-based. Pay 1 Military resource → draw 2 cards. Opt 2: stack +1 on Military AND +1 on Governance. |

### Policy Cards

| Name | Level | Status | Concept |
|------|-------|--------|---------|
| Ceasefire | 1 | `✅ Implemented` | Opt A: Pay newest Military → remove 1 Military instability, shuffle self. Opt B: Draw 1, place self in Military instability. |
| Fortified Peace | 1 (hand) | `✅ Implemented` | Opt A: Discard 1 hand card → remove 1 Military instability, shuffle self. Opt B: Draw 1, place self in Military instability. |
| War of Attrition | 2 | `✅ Implemented` | Opt A: Pay oldest Military → remove 2 Military instability, shuffle self. Opt B: Draw 2, place self in Military instability. |
| Force Projection | 2 (cross) | `✅ Implemented` | Opt A: Pay Military + Economy → remove 3 Military instability, shuffle self. Opt B: Draw 2, place self in Military instability. |
| Total Mobilization | 3 | `✅ Implemented` | Opt A: Pay oldest Military + oldest Economy → remove 4 Military instability, shuffle self. Opt B: Draw 3, place self in Military instability. |

---

## Technology

| Name | Status | Concept |
|------|--------|---------|
| Technological Leap | `[idea]` | Stack +1 on Technology. The next resource card played this game has +1 value. |
| Innovation Hub | `[idea]` | Passive while in Technology stack: draw 1 extra card each turn. |
| Reverse Engineering | `[idea]` | Copy the effect of any resource card in any stack. Discard self. |
| Paradigm Shift | `[idea]` | Discard your active Technology identity. Remove 2 Technology instability. Draw 3. |
| Great Expedition | `[idea]` | Reveal top 5 cards of deck. Keep 2, shuffle the rest. |

### Policy Cards

| Name | Level | Status | Concept |
|------|-------|--------|---------|
| Patent Reform | 1 | `✅ Implemented` | Opt A: Pay newest Technology → remove 1 Technology instability, shuffle self. Opt B: Draw 1, place self in Technology instability. |
| Open Source Initiative | 1 (hand) | `✅ Implemented` | Opt A: Discard 1 hand card → remove 1 Technology instability, shuffle self. Opt B: Draw 1, place self in Technology instability. |
| R&D Investment | 2 | `✅ Implemented` | Opt A: Pay oldest Technology → remove 2 Technology instability, shuffle self. Opt B: Draw 2, place self in Technology instability. |
| Digital Transformation | 2 (cross) | `✅ Implemented` | Opt A: Pay Technology + Economy → remove 3 Technology instability, shuffle self. Opt B: Draw 2, place self in Technology instability. |
| Technological Revolution | 3 | `✅ Implemented` | Opt A: Pay oldest Technology + oldest Economy → remove 4 Technology instability, shuffle self. Opt B: Draw 3, place self in Technology instability. |

---

## Environment

| Name | Status | Concept |
|------|--------|---------|
| Climate Stability | `[idea]` | Passive while in Environment stack: Environment hazards are reduced by 1 value. |
| Rewilding | `[idea]` | Move any Economy resource card to your Environment stack instead. |
| Natural Abundance | `[idea]` | Stack +1 on Environment for each resource already in Environment stack (max +4). |
| Ancient Grove | `[idea]` | Stack +3 on Environment. Cannot be removed from stack unless Environment identity is replaced. |

### Policy Cards

| Name | Level | Status | Concept |
|------|-------|--------|---------|
| Conservation Policy | 1 | `✅ Implemented` | Opt A: Pay newest Environment → remove 1 Environment instability, shuffle self. Opt B: Draw 1, place self in Environment instability. |
| Controlled Burn | 1 (hand) | `✅ Implemented` | Opt A: Discard 1 hand card → remove 1 Environment instability, shuffle self. Opt B: Draw 1, place self in Environment instability. |
| Ecological Restoration | 2 | `✅ Implemented` | Opt A: Pay oldest Environment → remove 2 Environment instability, shuffle self. Opt B: Draw 2, place self in Environment instability. |
| Climate Accord | 2 (cross) | `✅ Implemented` | Opt A: Pay Environment + Economy → remove 3 Environment instability, shuffle self. Opt B: Draw 2, place self in Environment instability. |
| Green New Deal | 3 | `✅ Implemented` | Opt A: Pay oldest Environment + oldest Economy → remove 4 Environment instability, shuffle self. Opt B: Draw 3, place self in Environment instability. |

---

## Cross-Category / General

| Name | Status | Concept |
|------|--------|---------|
| Enlightened Rule | `[idea]` | Accord. If Governance ≥ 14 AND Culture ≥ 14: stack +3 on either. Otherwise +1. |
| Industrial Might | `[idea]` | Accord. Stack +2 on Economy, +1 on Military. If Environment < 8, add 1 Environment instability. |
| Knowledge Economy | `[idea]` | Accord. Stack +2 on Technology if Economy ≥ 13. Otherwise +1. |
| Age of Exploration | `[idea]` | Draw 4. Keep 2, shuffle 2 back. |
| The Great Famine | `[idea]` | Hazard. Remove 2 resources from Environment stack. Place in Economy instability. |
| Civil War | `[idea]` | Hazard (value 4). Hits Governance AND Military instability simultaneously. Mitigate by paying both. |
| Renaissance | `[idea]` | If Culture ≥ 15 AND Technology ≥ 13: stack +2 on both. Discard self. |
| Manifest Destiny | `[idea]` | Pay 1 Military + 1 Economy. Stack +2 on Environment. Stack +1 on Military. |

---

## Management Philosophy — Governance Utility Cards

Cards representing civilization-level problem-solving doctrines. All are Governance-category utility events unless noted.

### Consolidation Family

| # | Name | Status | Concept |
|---|------|--------|---------|
| 1 | Consolidation | `✅ Implemented` | **Redesigned S5.** Opt 1: Move newest resource (any→any). Opt 2: Move newest instability (any→any). Both shuffle self. |
| 2 | Structural Consolidation | `✅ Implemented` | **Redesigned S5.** Opt 1: Move newest resource + newest instability (any→any). Opt 2: Remove newest resource + newest instability → deck. Both shuffle self. |
| 3 | Managed Decline | `✅ Implemented` | **Redesigned S5.** Opt 1: Pay newest from 2 stacks, remove 1 instability. Opt 2: Pay oldest from all stacks, remove 2 instabilities. Both to deck. |
| 4 | Rationalization | `✅ Implemented` | **Redesigned S5.** Opt 1 (Strip to Core): Remove all resources except oldest + all instabilities except one from chosen category. Opt 2 (Aggressive Cuts): Remove 3 oldest from any stack + 2 oldest from any pile. Both to deck. |
| 5 | Austerity | `✅ Implemented` | **Redesigned S5.** Opt 1 (Broad): Remove 1 oldest resource + 1 oldest instability from every non-empty category (immediate). Opt 2 (Shock): Pay newest from 3 stacks; clear one pile entirely. Both to deck. |

### Contingency Planning Family

| # | Name | Status | Concept |
|---|------|--------|---------|
| 6 | Preparedness | `✅ Implemented` | **Redesigned S5** — see cards.js for current effect. |
| 7 | Crisis Protocol | `✅ Implemented` | Opt 1: Take oldest instability from any category. Opt 2: Take oldest instability from each of 2 different categories. Both shuffle self. |
| 8 | Grand Strategy | `✅ Implemented` | Opt 1: Draw 2. Opt 2: Pay 1 Military resource, take oldest 2 instability from any category. Both shuffle self. |
| 9 | Redundancy Systems | `✅ Implemented` | **Updated S5.** Opt 1: Move newest resource from any stack to any stack with exactly 1 resource. Opt 2: Pay 1 Technology resource, remove 2 instability. Both shuffle self. |
| 10 | Adaptive Management | `✅ Implemented` | Opt 1: Take oldest instability from any category. Opt 2: Pay 1 Governance resource, stack +2 on any category. Both shuffle self. |

---

## New Subtypes / Mechanics (Requires Design Confirmation)

These require mechanical design work before any cards can be drafted.

| Mechanic | Status | Description |
|----------|--------|-------------|
| Crisis-only cards (Reform subtype) | `[idea]` | Playable only when a category is ≤ 7. High recovery power. |
| Opportunity subtype | `[idea]` | High value but must be played within 2–3 turns or converts to instability. |
| Accord subtype | `[idea]` | Cross-category cards requiring two conditions simultaneously. |
| Max hand size (7) | `[idea]` | After drawing, discard down to 7. Adds hand management decisions. |
| Milestone rewards | `[idea]` | At 15 points in any category, draw 1 extra card that turn. |

---

## Implemented

Cards that have been approved and added to cards.js. Kept here for reference.

| Name | Category | Notes |
|------|----------|-------|
| Military Exercise | Military | Utility. Remove 2 Military resources → discard 3 hand cards OR draw 2. |
| Disarmament | Military | Utility. Pay Governance → remove 3 Military stack cards; OR pay Military → stack +1 on Technology. |
| Social Upheaval | — | Hazard (must-play). Discard 3 hand cards to shuffle self; OR pay Culture to go to instability. |
| Destabilization | Military | Stacking +3. Pay Military → place in Culture instability; OR pay Governance → stack +3 on Culture. |
| Harsh Winter | Environment | Hazard −2. Mitigate with Economy. |
| Scorched Summer | Environment | Hazard −2. Mitigate with Economy. |
| Dense Forests | Environment | Stacking resource +2. |
| Mineral Deposits | Environment | Stacking resource +2. |
| Rare Plants | Environment | Stacking resource +1. |
| Rich Soil | Environment | Stacking resource +1. |
| Natural Springs | Environment | Stacking resource +1. |
| Coastal Fisheries | Environment | Stacking resource +1. |
| Consolidation | Governance | Utility (redesigned S5). Move newest resource or newest instability any→any. |
| Structural Consolidation | Governance | Utility (redesigned S5). Move or remove newest resource + newest instability. |
| Managed Decline | Governance | Utility (redesigned S5). Pay newest from 2 stacks + remove instability; or pay oldest from all + remove 2 instabilities. |
| Rationalization | Governance | Utility (redesigned S5). Strip to Core (remove all but oldest resource + clear instabilities), or Aggressive Cuts (3 resources + 2 instabilities). |
| Austerity | Governance | Utility (redesigned S5). Broad (auto-remove 1 oldest from everything) or Shock Treatment (pay 3 newest resources, clear one pile). |
| Preparedness | Governance | Utility (redesigned S5 — see cards.js for current effect). |
| Crisis Protocol | Governance | Utility. Remove 1 instability (shuffle self), or remove 1 from each of 2 categories. |
| Grand Strategy | Governance | Utility. Draw 2, or pay Military resource to remove 2 instability. |
| Redundancy Systems | Governance | Utility (updated S5). Move newest resource to sparse stack; or pay Technology to remove 2 instability. |
| Adaptive Management | Governance | Utility. Remove 1 instability (shuffle self), or pay Governance to stack +2 on any category. |
| Labor Shortage | Economy | Hazard +2 (S5). Pay 1 Economy → bottom of deck; else Economy instability. |
| Population Decline | Economy/Culture | Hazard +3 (S5). Pay Economy + Culture → bottom of deck; else choice of Economy/Culture instability. |
| Immigration | Economy/Culture | Event +2 (S5). Stack on Economy free; or stack on Culture + discard 1 hand card. Discards to Governance instability. |
| Crime | Economy/Military | Hazard +2 (S5). Pay 1 Governance → bottom of deck; else choice of Economy/Military instability. |
| Criminal Conspiracy | Governance/Military | Hazard +3 (S5). Pay Governance + Military → bottom of deck; or discard 1 hand card → Governance instability. Arc: harder when Crime in instability. |
| Organized Crime | Governance/Military/Economy | Hazard +4 (S5). Standard: pay Gov+Mil+Eco; escalated (if criminal_conspiracy in instability): pay Gov+Mil+Eco+Tech. Or discard 2 hand cards. Always Governance instability. |
| Restitution | Governance | Utility +1 (S5). Remove 2 resources + instability → deck; or remove 1 resource + instability → discard. |
| Insider Trading | Technology/Economy | Hazard +3 (S5). |
| State Capture | Governance | Hazard +3 (S5). |
| Cultural Purge | Culture/Governance | Hazard +3 (S5). |
| Treason | Governance/Military | Hazard +3 (S5). |
| Sabotage | Technology | Hazard +1 (S5). |
| Pollution | Environment/Economy | Hazard +3 (S5). |
| Forest Fire | Environment | Hazard +3, must-play (S5). Take env instability; or pay 1 Technology → avoid. |
| Environmental Collapse | Environment | Hazard +4, must-play (S5). Pay 2 Economy + 2 Technology → deck; or clear all env stack resources → env instability. |
| Misinformation | Technology | Hazard +2 (S5). Technology instability. |
| Surveillance State | Technology/Economy | Hazard +3 (S5). Targets Economy instability. |
| Cyber Warfare | Technology | Hazard +3 (S5). Technology instability. |
| Technological Collapse | Technology | Hazard +4, must-play (S5). Technology instability. |
| Alliance | Governance | Stacking event +2 (S7). Opt 1: pay oldest Culture → stack on Governance. Opt 2: remove 1 Military instability → shuffle self. Anchors coalition synergy network. |
| Free Trade Agreement | Economy | Stacking event +1 (S7). Free if Alliance in any stack; else pay oldest Governance → stack on Economy. Uses `card_in_stack` condition. |
| Martial Law | Governance | Utility +3 (S7). Opt 1 (Dictatorship): 1 Military cost. Opt 2 (any): 1 Military + 2 Governance. Both remove all Crime instability from all categories → Governance instability. |
