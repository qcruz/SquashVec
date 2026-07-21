# Governance — Strategy Story Reference

*Tracks chains of cards that play together logically, inspired by real-world historical patterns.*
*Each chain tells a coherent story. Cards within a chain trigger, enable, or thematically follow each other.*
*Goal: Identify gaps in the card pool, validate game logic, and surface strategic depth.*

---

## How to Read This Document

Each chain shows:
- **Cards in sequence** with → notation
- **Story** — what's happening in plain language
- **Status** — which cards exist ✓, which are planned →, which are missing ✗
- **Branch** — where this chain connects to other chains

Cards are named as they appear in the game. Category identities are marked (identity).

---

## Chain Index

1. [The Road to Autocracy](#1-the-road-to-autocracy)
2. [The Oligarchy Loop](#2-the-oligarchy-loop)
3. [The Revolutionary Cycle](#3-the-revolutionary-cycle)
4. [The Colonial Economy](#4-the-colonial-economy)
5. [The Military Empire](#5-the-military-empire)
6. [The Debt Spiral](#6-the-debt-spiral)
7. [The Cultural Hegemony](#7-the-cultural-hegemony)
8. [The Technological Arms Race](#8-the-technological-arms-race)
9. [Environmental Collapse](#9-environmental-collapse)
10. [The Mercantile State](#10-the-mercantile-state)
11. [The Reform Gambit](#11-the-reform-gambit)
12. [The Guerrilla Insurgency](#12-the-guerrilla-insurgency)
13. [The Surveillance State](#13-the-surveillance-state)
14. [The Golden Age](#14-the-golden-age)

---

## 1. The Road to Autocracy

**Story:** A government that starts with popular mandate slowly concentrates power. A crisis gives cover for emergency measures. Those measures become permanent. The leader becomes the state.

**Chain:**
```
Populist Governance (identity)
  → Social Upheaval [must-play] ✓
    → Martial Law ✓
      → Purge ✗ [new card needed]
        → Dictatorship (identity) ✓
          → Show Trial ✗ [new card needed]
            → Censorship ✗ [new card needed]
              → Scapegoating ✗ [new card needed]
```

**Card Status:**
- Populist Governance ✓ (governance identity, value 2)
- Social Upheaval ✓ (must-play hazard — pay 3 hand cards or lose culture resource)
- Martial Law ✓ (governance utility — removes Crime instability with military cost)
- Purge ✗ — needs design: hostile stacking event, governance category. Pay governance resource → remove oldest Culture or Economy resource; OR pay culture → add governance instability.
- Dictatorship ✓ (governance identity, value 3)
- Show Trial ✗ — needs design: governance stacking event. Requires Purge in any instability pile. Stack on Governance. Adds Culture instability.
- Censorship ✗ — needs design: governance/culture hostile event. Pay culture → add to governance stack. Opt 2: free → culture instability.
- Scapegoating ✗ — needs design: cross-category. Pay nothing → add instability to a minority category (culture, environment, or economy); OR pay governance resource → shuffle self.

**Missing to complete chain:** Purge, Show Trial, Censorship, Scapegoating

**Branches to:**
- Chain 2 (Oligarchy Loop) — if Dictatorship is replaced by Oligarchy
- Chain 12 (Guerrilla Insurgency) — Censorship + Scapegoating generate opposition
- Chain 3 (Revolutionary Cycle) — sustained autocracy eventually triggers revolution

---

## 2. The Oligarchy Loop

**Story:** Wealth captures governance. Business interests transform policy. The state serves the wealthy. Oligarchs fill the void left by weakened institutions.

**Chain:**
```
Free Trade (identity) ✓  OR  Industrial Expansion (identity) ✓
  → Arms Package ✓ [governance resource → economy; OR remove culture instability → economy]
    → Sanctions ✓ [pay governance → economy stack]
      → [Governance instability accumulates]
        → Oligarchy (identity) drawn ✓ [replace governance for free if governance instability ≥ 2]
          → Direct Attack ✓ [pay military to seize governance stack]
            → State Capture ✓ [hazard — clears governance stack if all identities active]
```

**Design note:** The chain works today but needs a mid-chain "Business Interests" type card — an event that is benign (economy stacking) when culture resources are available but becomes governance instability when they're not. That card is the turning point.

**Proposed card:** *Business Interests* — stacking event, economy category, value 2. Opt 1: Pay oldest Culture → stack +2 on Economy. Opt 2: Stack on Economy as instability instead (player chooses governance or economy instability at discard time). Creates the exact Oligarchy tension the user described.

**Card Status:**
- Free Trade ✓, Industrial Expansion ✓
- Arms Package ✓, Sanctions ✓
- Oligarchy ✓
- Direct Attack ✓, State Capture ✓
- *Business Interests* ✗ — key missing card for this chain

**Branches to:**
- Chain 1 (Road to Autocracy) — oligarchy as alternative to dictatorship
- Chain 6 (Debt Spiral) — oligarchic economy leads to speculative excess
- Chain 11 (Reform Gambit) — civic response to oligarchy

---

## 3. The Revolutionary Cycle

**Story:** Cultural identity builds. Suppression generates resistance. Crisis breaks the old order. A new governance system replaces the old — but may itself become what it overthrew.

**Chain:**
```
Oral Tradition (identity) ✓  OR  Higher Education (identity) ✓
  → Activists ✓ [if culture instability exists → +1 culture]
    → Dissent ✗ [new card needed — cultural stacking, triggered by governance instability]
      → Social Upheaval [must-play] ✓
        → Cultural Erasure ✓ [hostile — pay own → instability OR pay cross → stack]
          → Revolution ✗ [new card needed — governance identity replacement event]
            → [New governance identity played at reduced cost]
              → Purge ✗ [new card cycle begins — see Chain 1]
```

**Proposed card:** *Dissent* — culture stacking event, value 1. Condition: requires governance instability in any pile. Opt 1: Stack +1 on Culture. Opt 2: Pay Culture → remove 1 Governance instability + shuffle self. Discard: culture instability.

**Proposed card:** *Revolution* — cross-category hazard or governance utility event. Requires Dissent in instability pile AND social_upheaval resolved. Opt 1: Replace active Governance identity for free (discard old, play any governance identity from hand). Opt 2: Remove all Governance resources from stack → shuffle all into deck, draw 3.

**Card Status:**
- Oral Tradition ✓, Higher Education ✓
- Activists ✓ (now correctly builds culture when culture instability, or military when military instability)
- Dissent ✗
- Social Upheaval ✓
- Cultural Erasure ✓
- Revolution ✗

**Branches to:**
- Chain 1 (Road to Autocracy) — revolution installs new autocracy
- Chain 7 (Cultural Hegemony) — revolution driven by cultural movement
- Chain 14 (Golden Age) — successful revolution leads to new era

---

## 4. The Colonial Economy

**Story:** Industrial power extracts resources from dominated territory. Extraction generates wealth but creates ecological and social debts. The bubble eventually bursts.

**Chain:**
```
Industrial Expansion (identity) ✓
  → Resource Extraction ✓ [hostile — remove environment resource → economy stack]
    → Trade Routes ✓ [economy resource stacking]
      → Industrial Pollution ✓ [hostile — pay own → environment instability OR pay cross → own stack]
        → Climate Crisis [global event] ✓ [threshold: if deck has few environment cards]
          → Environmental Collapse [must-play] ✓ [massive penalty]
            → Market Crash ✓ [economy hazard — triggered by collapsed trade base]
```

**Lateral cards that reinforce this chain:**
- Patent Warfare ✓ (technology hostile) — protects industrial extraction technology
- Cyber Attack ✓ (technology hostile) — disrupts competitor access to same resources
- Surplus Goods ✓ — economic benefit of extraction
- Labor Shortage ✓ — consequence of extractive monoculture economies

**Card Status:** Fully implementable with existing cards. This chain already works.

**Balance observation:** Environmental Collapse → Market Crash is devastating if both land in the same game phase. The chain tells the complete story of industrial extractivism.

**Branches to:**
- Chain 9 (Environmental Collapse) — deeper environmental degradation arc
- Chain 6 (Debt Spiral) — economic collapse post-extraction
- Chain 5 (Military Empire) — empire as the political structure enabling extraction

---

## 5. The Military Empire

**Story:** Military strength enables aggression. Aggression seizes resources. Resources fund further military expansion. The empire overextends.

**Chain:**
```
Aggressive Doctrine (identity) ✓
  → War Council ✓ [military stacking — pay economy → +2 military]
    → Arms Package ✓ [pay governance → economy; culture instability option]
      → Destabilization ✓ [hostile — pay military → culture instability; OR pay governance → culture stack]
        → Occupation ✓ [take resource from opponent category]
          → Direct Attack ✓ [pay military → governance or military stack +3]
            → Arms Escalation [global event] ✓ [triggers if military cards dominate deck]
              → Mutiny ✓ [military hazard — overextension penalty]
```

**Lateral cards:**
- Border Fortification ✓ — defensive posture between campaigns
- Gunboat Diplomacy ✗ — key missing card: military threat as diplomatic lever
- New Recruits ✗ — key missing card: replenishing military after losses
- Blockade ✗ — economic strangulation via military control

**Proposed card:** *Gunboat Diplomacy* — cross-category stacking event, military + governance. Pay 1 Military resource → stack +1 on Governance AND draw 1 card. Opt 2: Pay 1 Governance → remove 1 Military instability. Discard: governance or military instability.

**Proposed card:** *New Recruits* — military stacking event, resource tag, value 1. Free stack on military OR pay military → move to any other category. Standard resource card pattern.

**Card Status:**
- Aggressive Doctrine ✓, War Council ✓, Arms Package ✓
- Destabilization ✓, Occupation ✓, Direct Attack ✓
- Arms Escalation ✓, Mutiny ✓
- Gunboat Diplomacy ✗, New Recruits ✗, Blockade ✗

**Branches to:**
- Chain 2 (Oligarchy Loop) — military empire funds oligarchic economy
- Chain 4 (Colonial Economy) — empire as colonial extraction structure
- Chain 12 (Guerrilla Insurgency) — empire creates resistance

---

## 6. The Debt Spiral

**Story:** An economy grows through borrowing. Debt becomes structural. Political pressure prevents correction. Crisis becomes unavoidable.

**Chain:**
```
Banking System (identity) ✓
  → Deficit Spending ✓ [policy — pay hand card → remove economy instability OR draw + go to instability]
    → National Debt ✓ [hazard — economy instability]
      → Debt Restructuring ✓ [policy — pay economy → remove 2 economy instability]
        → Market Crash ✓ [hazard — severe economy instability]
          → Recession ✓ [follow-up hazard]
            → Economic Overhaul ✓ [heavy policy — pay economy + governance → clear 4 instability]
              → [Recovery or collapse depending on state]
```

**Lateral cards that feed the spiral:**
- Speculation Bubble ✗ — missing: economy stacking event that later converts to instability
- Capital Flight ✗ — missing: when governance instability peaks, economy resources flee
- Tax Decrease ✓ — political pressure reduces revenue while debt grows
- Hyperinflation ✓ — late-chain collapse card

**Proposed card:** *Speculative Bubble* — economy stacking event, value 3. Opt 1: Stack +3 on Economy. When this card is later removed from the Economy stack, it goes to Economy instability (not discard). Opt 2: Pay Economy → draw 2 cards. Mechanically: mark with a `collapseOnRemoval` flag.

**Card Status:** Chain mostly complete. Key additions: Speculative Bubble, Capital Flight.

**Branches to:**
- Chain 2 (Oligarchy Loop) — oligarchs benefit while debt spirals
- Chain 11 (Reform Gambit) — debt crisis forces political reform
- Chain 1 (Road to Autocracy) — economic collapse used to justify emergency powers

---

## 7. The Cultural Hegemony

**Story:** A cultural movement becomes dominant. It reshapes education, art, and social norms. Resistance is absorbed or suppressed. Eventually the movement becomes the new orthodoxy.

**Chain:**
```
Enlightenment (identity) ✓  OR  Higher Education (identity) ✓
  → Artistic Movement ✓ [pay governance → +2 culture; OR remove governance instability]
    → Cultural Diplomacy ✓ [pay economy → +2 culture; pay governance → +2 military]
      → Heritage Fund ✓ [pay economy or governance → +1 culture or economy]
        → Oral History ✓ [free culture stack]
          → Renaissance [planned] ✗ [if culture ≥ 15 + technology ≥ 13 → +2 both]
            → Scientific Breakthrough ✓ [pay economy → +2 technology; pay culture → +2 military]
```

**Lateral cards:**
- Nationalism ✗ (missing identity — cultural hegemony hardened into national identity)
- Propaganda Campaign ✓ (hostile) — when cultural hegemony turns coercive
- Cultural Erasure ✓ (hostile) — when hegemony targets rival cultures
- Scapegoating ✗ — cultural movement finds its enemy

**Card Status:** Chain works. Renaissance is the key missing capstone.

**Branches to:**
- Chain 3 (Revolutionary Cycle) — cultural hegemony generates opposition
- Chain 8 (Technological Arms Race) — scientific breakthrough links culture to technology
- Chain 14 (Golden Age) — cultural hegemony culminating in golden age

---

## 8. The Technological Arms Race

**Story:** Two or more powers compete through technological development. Each advance triggers a response. The race produces breakthroughs — and catastrophic new risks.

**Chain:**
```
Systematic Inquiry (identity) ✓  OR  Progress at All Costs (identity) ✓
  → Scientific Breakthrough ✓ [pay economy → +2 technology; pay culture → +2 military]
    → Venture Capital ✓ [pay economy+hand → +2 technology; OR pay technology+hand → +2 economy]
      → Patent License ✓ [pay economy → +1 technology; OR pay technology → +1 economy]
        → Technology Transfer ✓ [pay military+hand → +2 technology; OR pay governance+hand → +2 economy]
          → Automation Drive ✓ [pay economy+hand → +2 technology; OR pay technology+hand → +2 economy]
            → Cyber Attack ✓ [hostile — technology hostile event]
              → Tech Collapse [global event] ✓ [triggers if technology cards scarce in deck]
```

**Lateral escalation:**
- Patent Warfare ✓ (hostile) — from cooperative exchange to hostile control
- Arms Escalation ✓ (global event) — arms race elevated to global level
- Nuclear Deterrence ✗ — missing identity: technology philosophy of MAD
- Artificial Intelligence ✗ — missing: transformative late-chain technology event

**Proposed card:** *Artificial Intelligence* — technology stacking event, value 3, exchange tag. Opt 1: Pay Economy + discard 1 hand card → stack +3 on Technology. Opt 2: Pay Technology + discard 1 hand card → stack +2 on Economy AND draw 1. Discard: technology instability or economy instability.

**Card Status:** Chain largely complete. AI and Nuclear Deterrence are the key additions.

**Branches to:**
- Chain 5 (Military Empire) — technology race drives arms buildup
- Chain 9 (Environmental Collapse) — industrial technology generates environmental cost
- Chain 13 (Surveillance State) — information technology enables surveillance

---

## 9. Environmental Collapse

**Story:** Accumulated industrial, agricultural, and military exploitation depletes the natural world. Each exploitation generates short-term resource gain but long-term vulnerability. Eventually the system fails catastrophically.

**Chain:**
```
The Fertile Plains (identity) ✓  OR  Oceana (identity) ✓
  → Resource Extraction ✓ [hostile — remove environment resource → economy stack]
    → Industrial Pollution ✓ [hostile — pay own → instability OR pay cross → stack]
      → Scorched Summer ✓ [environment hazard]
        → Harsh Winter ✓ [environment hazard]
          → Deforestation ✗ [new card needed — environment stacking with long-term penalty]
            → Climate Crisis [global event] ✓
              → Environmental Collapse [must-play] ✓ [pay 2 economy + 2 technology to escape]
```

**Recovery subchain:**
```
Land Reclamation ✓ [pay economy or technology → +1 environment or culture]
  → Conservation Program ✓ [pay economy+hand or governance+hand → +2 environment or culture]
    → [Environment rebuilds]
```

**Proposed card:** *Deforestation* — environment hostile stacking event, value 2. Opt 1: Pay Technology → place this card in Environment instability (−2) AND +1 Economy resource (timber sale). Opt 2: Pay Environment resource → remove this card from play (conservation wins). Discard: environment instability.

**Card Status:** Chain complete except Deforestation. Recovery subchain complete.

**Branches to:**
- Chain 4 (Colonial Economy) — extraction as economic engine
- Chain 10 (Mercantile State) — resource wealth from environment
- Chain 6 (Debt Spiral) — environmental collapse triggers economic crisis

---

## 10. The Mercantile State

**Story:** A state builds wealth through trade rather than conquest. Alliances and agreements multiply value. Control of routes becomes power. Eventually protectionism creeps in.

**Chain:**
```
Free Trade (identity) ✓  OR  Mercantilism ✗ [missing identity]
  → Alliance ✓ [pay culture → +2 governance; OR remove military instability]
    → Free Trade Agreement ✓ [free if Alliance in stack; else pay governance → +1 economy]
      → Trade Routes ✓ [economy resource stack]
        → Tax Collection ✓ [pay culture → +2 economy; OR pay economy → shuffle self]
          → Sanctions ✓ [pay governance+hand → +1 economy; OR remove culture instability+hand → +1 economy]
            → Trade War ✓ [economy hazard]
              → Tariff ✗ [missing: protectionism event]
```

**Proposed card:** *Tariff* — economy stacking event, value 1, exchange tag. Opt 1: Pay Governance → stack +1 on Economy. Opt 2: If Trade War is in any instability pile → stack +2 on Economy for free (protectionism pays off during conflict). Discard: economy instability or governance instability.

**Proposed card:** *Mercantilism* — economy identity, value 2. Benefit: When playing an exchange-tagged card, you may treat one payment source as optional if you have at least 2 economy resources in your stack. (Merchant wealth reduces exchange costs.)

**Card Status:**
- Free Trade ✓, Alliance ✓, Free Trade Agreement ✓
- Trade Routes ✓, Tax Collection ✓, Sanctions ✓
- Trade War ✓
- Mercantilism ✗, Tariff ✗

**Branches to:**
- Chain 2 (Oligarchy Loop) — mercantile wealth enables oligarchic capture
- Chain 4 (Colonial Economy) — trade routes become extraction routes
- Chain 5 (Military Empire) — gunboat diplomacy protects trade routes

---

## 11. The Reform Gambit

**Story:** A system under stress tries to reform itself before collapsing. Governance institutions push back against decay. Sometimes reform succeeds. Sometimes it arrives too late.

**Chain:**
```
Republic (identity) ✓  OR  Democracy (identity) ✓
  → Unions ✓ [if economy instability → +1 governance; if environment instability → +1 environment]
    → Civil Service Reform ✗ [missing: governance utility — remove governance instability]
      → Constitutional Reform ✗ [planned → planned-cards.md]
        → Referendum ✗ [planned → planned-cards.md]
          → Coalition Government ✗ [planned — requires economy ≥12 AND culture ≥12 → +3 governance]
            → Press Freedom ✗ [planned — if governance ≥15 → remove all culture instability]
```

**Instability pressure (what makes reform necessary):**
- Corruption ✓ (cross hazard) → feeds governance instability
- State Capture ✓ (governance hazard)
- Leaked Report ✓, Political Strife ✓, Public Backlash ✓ (governance hazards)
- Crime Wave ✓, Crime ✓ (cross hazards feeding governance)

**Card Status:**
- Republic ✓, Democracy ✓, Unions ✓
- Civil Service Reform ✗ — new card needed
- Constitutional Reform →, Referendum →, Coalition Government →, Press Freedom → (all in planned-cards.md)

**Branches to:**
- Chain 3 (Revolutionary Cycle) — reform fails → revolution
- Chain 2 (Oligarchy Loop) — reform blocked by oligarchic interests
- Chain 14 (Golden Age) — reform succeeds → golden age

---

## 12. The Guerrilla Insurgency

**Story:** Military dominance creates resistance. The occupier has superior force but cannot reach the fighters. Resources are spent; legitimacy erodes. The empire withdraws or is overthrown.

**Chain:**
```
Guerrilla Warfare ✗ [missing identity]
  → Incursion ✓ [take resource from technology or economy to own economy]
    → Occupation ✓ [take resource from environment or culture to economy]
      → Desertion ✓ [military hazard — erodes the occupying force]
        → Mutiny ✓ [military hazard — internal collapse]
          → Rebellion ✓ [cross hazard — pay governance to escape or take governance + military instability]
            → [Governance identity replaced]
```

**Lateral pressure:**
- Psychological Warfare ✗ (missing card — both sides)
- Propaganda Campaign ✓ (hostile — occupier's tool)
- Censorship ✗ (missing — occupier's tool)
- Dissent ✗ (missing — resistance side)

**Proposed card:** *Guerrilla Warfare* — military identity, value 1. Benefit: When a hostile card targets your Military stack, you may pay 1 less resource (minimum 0). Represents asymmetric resistance reducing the effectiveness of direct attack.

**Card Status:**
- Incursion ✓, Occupation ✓, Desertion ✓, Mutiny ✓, Rebellion ✓
- Guerrilla Warfare ✗, Psychological Warfare ✗, Dissent ✗, Censorship ✗

**Branches to:**
- Chain 3 (Revolutionary Cycle) — insurgency becomes revolution
- Chain 1 (Road to Autocracy) — state responds with emergency powers
- Chain 5 (Military Empire) — the empire side of the conflict

---

## 13. The Surveillance State

**Story:** Security concerns justify data collection. Data collection enables control. Control normalizes. The distinction between safety and oppression disappears.

**Chain:**
```
Cautious Progress (identity) ✓  OR  Techno-authoritarianism ✗ [missing identity]
  → Cyber Attack ✓ [hostile technology — justifies surveillance buildup]
    → Surveillance State ✓ [hazard — economy instability]
      → Record Breach ✓ [technology hazard]
        → Misinformation ✓ [technology hazard — culture instability]
          → Censorship ✗ [missing — governance hostile event]
            → Scapegoating ✗ [missing — cross hostile event]
              → State Capture ✓ [governance hazard — control fully consolidated]
```

**Card Status:**
- Cautious Progress ✓
- Cyber Attack ✓, Surveillance State ✓, Record Breach ✓, Misinformation ✓
- Censorship ✗, Scapegoating ✗, Techno-authoritarianism ✗
- State Capture ✓

**Branches to:**
- Chain 1 (Road to Autocracy) — surveillance enables autocratic control
- Chain 7 (Cultural Hegemony) — surveillance flips cultural hegemony into control
- Chain 8 (Technological Arms Race) — technology race creates surveillance capacity

---

## 14. The Golden Age

**Story:** Sustained investment across governance, economy, culture, and technology reaches a threshold where each reinforces the others. The civilization enters a period of peak flourishing.

**Chain:**
```
[Multiple categories near scoring threshold]
  → Artistic Movement ✓ → Heritage Fund ✓ [culture + governance investment]
    → Scientific Breakthrough ✓ [economy + technology reinforcement]
      → Venture Capital ✓ [technology + economy flywheel]
        → Tax Collection ✓ [economy consolidation]
          → Alliance ✓ [governance + culture stability]
            → Free Trade Agreement ✓ [economy synergy if Alliance in stack]
              → [Win condition reached]
```

**Enabling conditions (identity foundations that make the Golden Age achievable):**
- Higher Education ✓ or Enlightenment ✓ (culture)
- Banking System ✓ or Free Trade ✓ (economy)
- Republic ✓ or Democracy ✓ (governance)
- Systematic Inquiry ✓ (technology)
- The Fertile Plains ✓ or Oceana ✓ (environment)

**Missing capstone card:** *Golden Age* — cross-category event. Requires all 6 category identities active. Opt 1: Stack +2 on all categories simultaneously. Opt 2: Draw 4 cards. Discard: shuffle to deck.

**Card Status:** Chain works with existing cards. Golden Age as a capstone card would be the key addition.

**Branches from:** All chains — the Golden Age is the terminus of successful play across any strategy.

---

## Missing Cards — Priority Summary

Cards identified as missing that would most strengthen strategic story chains:

| Card | Chain(s) | Priority | Notes |
|------|----------|----------|-------|
| Purge | 1, 3 | High | Governance hostile stacking — political enemy removal |
| Dissent | 3, 12 | High | Culture stacking, triggers on governance instability |
| Scapegoating | 1, 7, 13 | High | Cross hostile — blame + instability |
| Censorship | 1, 12, 13 | High | Governance/culture hostile — information control |
| Revolution | 3 | High | Cross — replaces governance identity |
| Gunboat Diplomacy | 5, 10 | High | Military + governance stacking |
| New Recruits | 5 | Medium | Military resource stacking |
| Deforestation | 9 | Medium | Environment hostile stacking |
| Business Interests | 2 | Medium | Economy stacking, conditional instability |
| Tariff | 10 | Medium | Economy exchange stacking with Trade War synergy |
| Speculative Bubble | 6 | Medium | Economy stacking with collapse-on-removal mechanic |
| Artificial Intelligence | 8 | Medium | Technology exchange, late-chain value |
| Golden Age | 14 | Low | Cross — requires all identities active |
| Mercantilism | 10 | Low | Economy identity |
| Guerrilla Warfare | 12 | Low | Military identity, defensive discount benefit |
| Techno-authoritarianism | 13 | Low | Technology identity |

---

## Chain Connectivity Map

*Cards that appear in multiple chains are the most strategically valuable — they enable branching.*

| Card | Appears In |
|------|-----------|
| Purge ✗ | Chains 1, 3 |
| Scapegoating ✗ | Chains 1, 7, 13 |
| Censorship ✗ | Chains 1, 12, 13 |
| Social Upheaval | Chains 1, 3 |
| Occupation | Chains 4, 12 |
| Martial Law | Chain 1 |
| Destabilization | Chains 5, 7 |
| Scientific Breakthrough | Chains 7, 8 |
| Alliance | Chains 10, 14 |
| Arms Package | Chains 2, 5 |
| Sanctions | Chains 2, 10 |
| Resource Extraction | Chains 4, 9 |
| Industrial Pollution | Chains 4, 9 |
| Tax Collection | Chains 10, 14 |
| State Capture | Chains 2, 13 |
| Dissent ✗ | Chains 3, 12 |
| Revolution ✗ | Chains 1, 3 |

---

*Last updated: 2026-07-21 — Session 11*
