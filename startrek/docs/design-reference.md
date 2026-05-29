# Final Frontier — Design Reference

**Last Updated:** 2026-05
**Status:** Living reference — reflects current implementation

---

## Table of Contents

1. [Game Flow Overview](#game-flow)
2. [Stats and Their Meaning](#stats)
3. [Derived Stats (Loyalty / Morale / Stress)](#derived-stats)
4. [Resolution Mechanics](#resolution)
5. [Outcome Probability Tables](#probability)
6. [Stat Micro-Gains](#micro-gains)
7. [Academy Focuses and Starting Traits](#traits)
8. [Free Time Activities](#free-time)
9. [Career Hierarchy (Rank Loop)](#hierarchy)
10. [Promotion Requirements](#promotion)
11. [Ship Classes and Crew Counts](#ships)
12. [Crew Generation Rules](#crew-gen)
13. [Score Formula](#score)
14. [Encounter Responses (Endgame)](#encounter)
15. [Current Scenario Templates](#scenarios)

---

## 1. Game Flow Overview {#game-flow}

```
START
  ├── Character creation (Academy focus → starting stats)
  ├── Crew generated (scout-class, ~20 named crew)
  │
  ├── RANK: Ensign / Lieutenant JG
  │     Bridge menu → Run task → d20 resolution
  │     Promotion check after every task
  │
  ├── RANK: Lieutenant / Lt. Commander
  │     Bridge menu → Run project
  │       ├── Assign crew to each task
  │       ├── Tasks auto-execute with assigned crew
  │       └── Spend intervention slots on bad rolls
  │     Ship upgrades on Lieutenant promotion (scout → cruiser)
  │
  ├── RANK: Commander
  │     Bridge menu → Run mission
  │       ├── Assign project leaders (Lieutenant-rank NPCs)
  │       ├── Projects auto-execute under leaders
  │       └── Handle interruption events mid-mission
  │     Ship upgrades on Commander promotion (cruiser → heavy cruiser)
  │
  ├── RANK: Captain
  │     Bridge menu → Run voyage
  │       ├── Select voyage type and duration
  │       ├── Missions execute sequentially (auto)
  │       └── Strategic interruption decisions
  │     Optional: Accept five-year expedition command
  │
  └── EXPEDITION (endgame)
        ├── Five-year in-game loop with voyage menu
        ├── Encounter trigger: random Year 3–5
        │     Weighted: Year 3 (20%), Year 4 (35%), Year 5 (45%)
        ├── Six encounter response options
        └── Final score display
```

**Bridge menu options (all ranks):**
- Run task / project / mission / voyage [1]
- Free time [2]
- View status [3]
- View score [4]
- Crew logs [c]
- Mission history [h]
- Quit [5]
- Accept expedition command [e] (Captain only)

---

## 2. Stats and Their Meaning {#stats}

Six visible stats, each on a 1–10 scale. Default starting value: 3.

| Stat | What It Covers | Primary Station |
|------|---------------|-----------------|
| **Command** | Leadership, authority, decisive action under pressure | Command |
| **Science** | Analysis, pattern recognition, anomaly investigation | Science |
| **Tactical** | Combat, threat assessment, security, precision under fire | Tactical / Helm |
| **Engineering** | Systems, improvisation, damage control, hardware | Engineering |
| **Medicine** | Biology, triage, crew health, psychological assessment | Medical |
| **Diplomacy** | Negotiation, communication, cultural fluency, de-escalation | Communications |

**Starting values by Academy focus:**

| Focus | Primary (+2) | Secondary (+1) | Trait |
|-------|-------------|----------------|-------|
| Command Track | Command | Diplomacy | Natural Authority |
| Sciences | Science | Medicine | Analytical Mind |
| Engineering | Engineering | Science | Systems Thinker |
| Security / Tactical | Tactical | Command | Combat Ready |
| Medical | Medicine | Diplomacy | Healer's Eye |
| Diplomatic Corps | Diplomacy | Science | Cultural Fluency |

Starting stat totals: one stat at 5, one at 4, remaining four at 3. Total: 22 points.

---

## 3. Derived Stats {#derived-stats}

Each named NPC has three hidden secondary stats (0–100). Players cannot directly see these during scenario execution but they affect rolls and are shown in crew logs.

| Stat | Effect | Changes From |
|------|--------|-------------|
| **Loyalty** | High loyalty = better hidden stat triggers; affects encounter survival ceiling | Free time, scenario outcomes, ordered non-intervention |
| **Morale** | High morale shown in crew status; moderate effect on performance | Rest, crew time, cumulative successes / failures |
| **Stress** | High stress (>70) adds -1 to crew rolls; >85 adds -2 | Difficult scenarios, failed tasks, long missions |

**Loyalty thresholds:**
- 0–30: Strained (shown in crew status, morale impact on team)
- 31–60: Neutral
- 61–80: Reliable
- 81–100: Loyal

---

## 4. Resolution Mechanics {#resolution}

### The Roll

```
RESULT = d20 + player_mod + crew_mod + condition_mod + hidden_bonus

player_mod    = player_stat − 5
                  (stat 5 = 0 mod; stat 10 = +5; stat 1 = −4)

crew_mod      = (crew_stat − 5) // 2
                  (crew contributes half their deviation)

condition_mod = 0 by default; penalty table:
                  ship_condition < 70 and stat in (Engineering, Tactical): −2
                  ship_condition < 40 (any stat): −2
                  crew_fatigue > 70: −1
                  crew_fatigue > 85: −2 (stacks)

hidden_bonus  = 0 by default; 10% chance per hidden stat to add value 1–3
                  (not shown to player; fires silently; discovered on crit success)
```

### Tier Determination

| Condition | Tier |
|-----------|------|
| Natural 1 (any total) | Critical Failure |
| Natural 20 (any total) | Critical Success |
| total ≥ difficulty + 5 | Full Success |
| difficulty − 4 ≤ total < difficulty + 5 | Partial Success |
| total < difficulty − 4 | Full Failure |

**Difficulty calculation:**
```
effective_difficulty = scenario.difficulty_base + option.difficulty − 11
```

The −11 normalizes so that a standard option (option.difficulty = 11) adds 0 to base.

### Intervention (Lieutenant+)

When the player spends an intervention slot:
- Adds the player's relevant stat as a flat bonus to the existing total
- Does not re-roll the d20
- Recalculates tier from new total
- Natural 1 cannot be rescued by intervention (critical failure stands)

---

## 5. Outcome Probability Tables {#probability}

For a player with stat 5 (modifier 0) and crew stat 5 (crew_mod 0), no condition penalty:

| d20 Roll | Full Success (diff 6) | Full Success (diff 10) | Full Success (diff 14) |
|----------|-----------------------|------------------------|------------------------|
| 1–1      | Crit Fail | Crit Fail | Crit Fail |
| 2–5      | Full Fail | Full Fail | Full Fail |
| 6–10     | Partial | Full Fail | Full Fail |
| 11–15    | Full Success | Partial | Full Fail |
| 16–19    | Full Success | Full Success | Partial |
| 20       | Crit Success | Crit Success | Crit Success |

**Effective success rates at modifier 0:**

| Difficulty | Crit Fail | Full Fail | Partial | Full Success | Crit Success |
|------------|-----------|-----------|---------|--------------|--------------|
| 6 | 5% | 20% | 25% | 45% | 5% |
| 10 | 5% | 45% | 25% | 20% | 5% |
| 12 (standard) | 5% | 50% | 25% | 15% | 5% |
| 14 | 5% | 65% | 10% | 15% | 5% |

*Note: Partial is always the modal outcome for medium difficulty. The game is designed so that outright failures require a genuinely hard scenario or poor stat match.*

**Modifier impact on standard difficulty (12):**

| Total Modifier | Approx Full/Crit Success Rate | Approx Failure Rate |
|----------------|-------------------------------|---------------------|
| −4 or worse | ~5% | ~75% |
| −2 | ~10% | ~60% |
| 0 | ~20% | ~50% |
| +2 | ~35% | ~35% |
| +4 | ~50% | ~20% |
| +6 | ~65% | ~10% |
| +8 | ~80% | ~5% |

---

## 6. Stat Micro-Gains {#micro-gains}

Each resolved task awards fractional progress toward a permanent +1 to the relevant stat. Progress is tracked per stat and accumulates across all play.

| Tier | Progress Gained |
|------|----------------|
| Critical Success | +0.50 |
| Full Success | +0.25 |
| Partial | +0.10 |
| Full Failure | 0 |
| Critical Failure | 0 |

**Threshold:** When progress reaches 1.0, the stat increases by 1 (capped at 10) and progress resets to 0.

**Approximate task counts per stat point:**
- Critical success path: ~2 crits
- Full success path: ~4 full successes
- Partial path: ~10 partials

This means a player who consistently succeeds in Science scenarios will gradually build their Science stat through play, without explicit level-up choices — but it is slow enough that the explicit XP advancement system (every 5 XP) remains the primary advancement mechanism.

**Free time Study** still gives an immediate +1 with no progress cost.

---

## 7. Academy Focuses and Traits {#traits}

| Trait | Effect |
|-------|--------|
| **Natural Authority** (Command Track) | NPCs start at Neutral rather than Suspicious |
| **Analytical Mind** (Sciences) | Science pre-scan reveals one extra detail before a scenario |
| **Systems Thinker** (Engineering) | Engineering partial failures treated one tier better |
| **Combat Ready** (Security/Tactical) | Physical injuries less severe; Tactical mods improved |
| **Healer's Eye** (Medical) | Crew health deterioration flagged one scenario earlier |
| **Cultural Fluency** (Diplomatic Corps) | First contact scenarios have one additional non-confrontational option |

*Note: Trait effects are design-specified but not all are fully implemented in current code. Systems Thinker and Cultural Fluency are the most scenario-impactful; others affect NPC relationship starting states and notification timing.*

---

## 8. Free Time Activities {#free-time}

| Activity | Effect | Stat Impact |
|----------|--------|-------------|
| **Study** | Choose one stat → immediate +1 | Permanent (this tour) |
| **Physical Training** | Accumulates `physical_training` counter | Future injury resistance |
| **Crew Time** | Select a crew member → Loyalty +5 to +12 | 40% chance to discover a hidden stat |
| **Rest** | Crew fatigue −8 to −18% | None |

**Crew Time discovery:** 40% chance per free-time activity if the selected crew member has at least one undiscovered hidden stat. Once discovered, the hidden stat appears in the crew member's profile.

---

## 9. Career Hierarchy (Rank Loop) {#hierarchy}

### Ensign / Lieutenant JG — Task Level

Player executes scenarios directly. Chooses from 3–5 response options. d20 resolution determines outcome. Ship condition and crew fatigue affected by results.

**Per-task tracking:**
- Career record: `tasks_completed`, `tasks_full_success`
- Score: `tasks_completed × 10`
- Stat micro-gain on the stat used
- XP: 1–3 per task based on tier; every 5 XP = one stat advancement choice

### Lieutenant / Lt. Commander — Project Level

Player manages a project with 3–5 tasks. Assigns crew to each task. Tasks auto-execute. Player has 1 (Lieutenant) or 2 (Lt. Commander) intervention slots per project to boost struggling tasks.

**Crew assignment:** Player sees available crew by department + stat, sorted by relevant stat value. Hidden stat status shown if any have been discovered.

**Intervention:** Adds player's relevant stat as a flat bonus to a completed roll (does not re-roll). Recalculates tier. Cannot rescue a natural 1.

**Project outcomes:**
- Success: ≥80% of tasks succeeded
- Partial: 40–79% succeeded
- Failure: <40% succeeded

### Commander — Mission Level

Player manages a mission with 2–4 projects. Assigns Lieutenant-rank NPC project leaders. Projects auto-execute under their leaders. Player responds to 0–2 interruption events.

**Interruption events:** Each has 3 labeled options with distinct flavors. Response affects project completion chances (modeled via narrative consequences, with possible slot/resource effects in future implementation).

**Mission outcome:**
- Success: Primary project succeeded AND all secondary projects succeeded/partial
- Partial: Primary project succeeded; some secondary projects failed
- Failure: Primary project failed

### Captain — Voyage Level

Player selects voyage type and duration. Missions within the voyage auto-execute (Commander-level auto-logic). Player handles strategic interruptions.

**Voyage types:** Exploration, Diplomacy, Federation Support, Scientific Survey, Border Patrol

**Voyage durations:**
| Duration | Months | Missions |
|----------|--------|----------|
| Short | 3 | 3–4 |
| Standard | 6 | 5–7 |
| Extended | 12 | 10–14 |

---

## 10. Promotion Requirements {#promotion}

| From | To | Requirements |
|------|----|--------------|
| Ensign | Lieutenant JG | 15 tasks + ≥60% full-success rate |
| Lieutenant JG | Lieutenant | 20 tasks + ≥55% success + 3 projects led |
| Lieutenant | Lt. Commander | 8 projects led + ≥55% project success rate |
| Lt. Commander | Commander | 3 missions commanded |
| Commander | Captain | 6 missions + 1 voyage completed |
| Captain | Expedition | Player choice (no stat requirement) |

**Declining promotion:** Player may decline any promotion. Declining is sometimes correct — a player with mismatched stats who rushes to mission command will struggle. No score penalty for declining.

---

## 11. Ship Classes and Crew Counts {#ships}

| Class | Total Crew | Named Crew | Assigned At |
|-------|-----------|------------|-------------|
| Scout | 75 | ~20 | Ensign posting |
| Cruiser | 200 | ~30 | Lieutenant promotion |
| Heavy Cruiser | 430 | ~58 | Commander promotion |

**Department staffing (heavy cruiser, named NPCs):**

| Department | Officers | NCOs | Enlisted | Named NPCs |
|------------|---------|------|---------|------------|
| Command | 8 | 0 | 2 | 4 |
| Helm | 8 | 4 | 14 | 5 |
| Tactical | 12 | 20 | 63 | 10 |
| Science | 16 | 12 | 47 | 11 |
| Engineering | 18 | 22 | 75 | 13 |
| Medical | 12 | 10 | 28 | 9 |
| Operations | 8 | 10 | 41 | 6 |

---

## 12. Crew Generation Rules {#crew-gen}

**Stat budgets by rank:**

| Rank | Budget Range | Typical Primary Stat |
|------|-------------|----------------------|
| Ensign | 10–18 | 4–6 |
| Lieutenant JG | 16–24 | 5–7 |
| Lieutenant | 22–30 | 6–8 |
| Lt. Commander | 28–36 | 7–9 |
| Commander | 34–42 | 8–10 |
| Captain | 40–48 | 9–10 |

**Primary stat receives 25–35% of budget.** All stats minimum 1, maximum 10.

**Species stat modifiers:**

| Species | Modifiers | Weight |
|---------|-----------|--------|
| Human | None | 45% |
| Vulcan | Science +1, Diplomacy −1 | 15% |
| Andorian | Tactical +1, Diplomacy −1 | 10% |
| Betazoid | Diplomacy +1, Tactical −1 | 8% |
| Bolian | Medicine +1 | 5% |
| Bajoran | Command +1, Engineering −1 | 7% |
| Tellarite | Engineering +1, Diplomacy −1 | 5% |
| Other | None (uses human names) | 5% |

**70/30 natural-fit/misfit rule:** 70% of named crew assigned to departments matching their highest stat. 30% assigned to departments that don't match — creating the interesting crew management challenge.

**Hidden stats:** Each named NPC has 1–2 hidden stats.
- 50% chance: hidden stat matches NPC's highest visible stat (amplifies strength)
- 30% chance: hidden stat is in one of NPC's two weakest stats (surprise talent)
- 20% chance: hidden stat is random

Hidden stat value: 1–3. Trigger chance: 10% per scenario that uses that stat.

**Discovery methods:**
- Crew Time free time activity: 40% chance to reveal one hidden stat
- Critical success: if crew member triggered a hidden stat, it is discovered
- Future: medical review, Captain's logs, extended service

---

## 13. Score Formula {#score}

```
BASE PERFORMANCE
  Tasks completed         × 10
  Projects completed      × 50
  Missions completed      × 200
  Voyages completed       × 1,000
  Years reached           × 500

LIVES (highest-weight factors)
  Lives saved             × 150   [voluntary intervention only]
  Lives lost              × −200  [does not count ordered non-intervention]

CREW
  Crew alive at encounter × 75
  Crew surviving encounter× 100

CAREER
  Commendations           × 250   [not yet generated; placeholder]
  Negative career flags   × −150
  Mentor relationships    × 200   [not yet implemented]

ENCOUNTER
  Response-dependent bonus (see Encounter section)
```

**Lives saved / lost rules:**
- Ordered to protect → succeeded: **counts** as lives saved
- Not ordered, chose to intervene → succeeded: **counts** (same rate)
- Not ordered, chose to intervene → failed: **lives lost counted**
- Ordered NOT to intervene → obeyed → people died: **does NOT count against score**
  - But: crew loyalty drops (morale consequence)
- Ordered NOT to intervene → disobeyed → people died: **counts as lives lost**

---

## 14. Encounter Responses {#encounter}

The unbeatable encounter triggers at a randomly set year (Year 3–5, weighted later).
Crew loyalty at the moment of encounter determines the upper bound of survival across all options.

```
adjusted_survival = min(95, base_survival_pct × loyalty_factor × 1.5)
```

| Response | Base Survival | Score Bonus | Notes |
|----------|--------------|-------------|-------|
| **Fight** | 30% | 0 | Heroism available via separate commendation in future |
| **Surrender** | 70% | 0 | Most crew live; no heroism |
| **Negotiate** | 60% | +100 | Diplomacy-adjacent; relationship effect |
| **Sacrifice play** | 85% | +500 | Captain does not survive |
| **Self-destruct** | 25% | +200 | Denies enemy; crew largely lost |
| **Flee** | 35% | 0 | Roll-dependent in current impl |

**The key mechanic:** A captain with low crew loyalty cannot achieve high survival even by surrendering. Loyalty is built over the entire career through: crew time, mission success, respecting ordered non-intervention, not accumulating strained relationships.

---

## 15. Current Scenario Templates {#scenarios}

Six fully written scenario templates exist in `src/data/scenarios.py`:

| ID | Title | Category | Difficulty | Ethical Weight | Options |
|----|-------|----------|------------|----------------|---------|
| SE-001 | Silent Running | sensor_contact | 12 | No | 5 |
| TC-001 | Three Hundred Seconds | time_critical | 13 | Yes | 4 |
| CC-001 | The Report | crew_conflict | 10 | Yes | 4 |
| ED-001 | Standing Orders | ethical_dilemma | 11 | Yes | 4 |
| FC-001 | First Light | first_contact | 12 | No | 4 |
| DC-001 | The Listening Post | diplomatic_complication | 11 | No | 4 |

**Option difficulty range:** 8 (easy) to 16 (very hard). Most options cluster at 10–14.

**Category pool (defined, not all populated yet):**
`sensor_contact`, `time_critical`, `crew_conflict`, `ethical_dilemma`, `first_contact`,
`diplomatic_complication`, `anomaly`, `rescue`, `medical`, `tactical_contact`,
`engineering_emergency`, `scientific_discovery`, `political_pressure`, `exploration`

**Template variables available:**
- `{contact}` — unknown vessel type (e.g., "an unmarked freighter", "a heavily shielded probe")
- `{location}` — region name (e.g., "the Badlands", "Sector 31", "the Veridian system")
- `{anomaly}` — phenomenon type (e.g., "a quantum filament", "a type-7 subspace shear")
- `{region}` — same as location pool
- `{alert_context}` — situation framing text
- `{dept_head}` / `{junior_officer}` — filled from actual named crew roster

**Scenario selection:**
- Filtered by `rank_idx` (Ensign gets lower difficulty base scenarios)
- Optional category filter
- If no eligible templates found: falls back to all templates

---

## Currently Unimplemented (Planned)

- Mentor NPC relationship system (affects Commander → Captain promotion)
- Commendations (counter exists, not yet triggered)
- Ordered non-intervention scenarios (flag exists in template model, UI not yet implemented)
- Trait mechanical effects beyond description text
- Crew death from critical failures (loyalty proxy used for now)
- Academy Rival NPC thread
- Starfleet relationship points (request support action in mission)
- Career flags visible in promotion review
- Scenario category routing by voyage type
