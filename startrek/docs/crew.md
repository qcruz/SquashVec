# Final Frontier — Crew System

**Last Updated:** 2026-05
**Status:** Design complete; generator implemented in src/engine/crew_generator.py

---

## Ship Classes and Crew Sizes

The player serves on different vessel classes at different career stages. Each class
has a defined total crew and a defined number of **named NPCs** — crew members the
player interacts with individually, with tracked stats and relationships. The rest
are **background crew**, represented as department efficiency ratings rather than
individual records.

| Ship Class | Career Phase | Total Crew | Named NPCs | Background |
|------------|-------------|------------|------------|------------|
| **Scout / Patrol Vessel** | Ensign, Lt. JG | 75 | 20 | 55 |
| **Cruiser** | Lieutenant, Lt. Commander | 200 | 34 | 166 |
| **Heavy Cruiser** *(endgame)* | Commander, Captain | 430 | 58 | 372 |

**Named NPCs** are fully modeled: name, rank, species, visible stats, hidden stats,
loyalty, morale, stress, relationship history. The player can view their visible stats
at any time. Their hidden stats must be discovered through play.

**Background crew** are tracked as a department aggregate: efficiency (0–100),
morale (0–100), health (0–100). Individual background crew members can be "surfaced"
to named status through scenario events — a crewman who performs exceptionally in a
crisis becomes a named NPC from that point forward.

---

## Departments and Staffing

Seven departments. Each has a **primary stat** (the stat that governs core performance)
and a **secondary stat** (relevant in specific scenarios). These determine which crew
members are "natural fits" for the department.

| Department | Primary Stat | Secondary Stat | Role Summary |
|------------|-------------|----------------|--------------|
| **Command** | Command | Diplomacy | Bridge leadership, watch officers, captain's staff |
| **Helm** | Tactical | Engineering | Pilots, navigators, conn officers |
| **Tactical / Security** | Tactical | Command | Weapons, shields, security, boarding response |
| **Science** | Science | Medicine | Sensors, research, analysis, anomaly investigation |
| **Engineering** | Engineering | Science | Propulsion, systems, repair, life support |
| **Medical** | Medicine | Science | Crew health, surgery, biological threat response |
| **Operations** | Diplomacy | Command | Communications, logistics, quartermaster, support |

### Heavy Cruiser Staffing Breakdown (430 crew)

| Department | Officers | NCOs | Enlisted | Dept. Total | Named NPCs |
|------------|----------|------|----------|-------------|------------|
| Command | 8 | 0 | 2 | 10 | 4 |
| Helm | 8 | 4 | 14 | 26 | 5 |
| Tactical / Security | 12 | 20 | 63 | 95 | 10 |
| Science | 16 | 12 | 47 | 75 | 11 |
| Engineering | 18 | 22 | 75 | 115 | 13 |
| Medical | 12 | 10 | 28 | 50 | 9 |
| Operations | 8 | 10 | 41 | 59 | 6 |
| **Total** | **82** | **78** | **270** | **430** | **58** |

### Cruiser Staffing Breakdown (200 crew)

| Department | Officers | NCOs | Enlisted | Dept. Total | Named NPCs |
|------------|----------|------|----------|-------------|------------|
| Command | 4 | 0 | 1 | 5 | 2 |
| Helm | 4 | 2 | 6 | 12 | 3 |
| Tactical / Security | 6 | 8 | 28 | 42 | 5 |
| Science | 7 | 5 | 22 | 34 | 5 |
| Engineering | 8 | 10 | 34 | 52 | 6 |
| Medical | 5 | 4 | 12 | 21 | 5 |
| Operations | 4 | 4 | 26 | 34 | 4 (+ player if applicable) |
| **Total** | **38** | **33** | **129** | **200** | **30** |

### Scout / Patrol Staffing Breakdown (75 crew)

| Department | Officers | NCOs | Enlisted | Dept. Total | Named NPCs |
|------------|----------|------|----------|-------------|------------|
| Command | 2 | 0 | 0 | 2 | 2 |
| Helm | 2 | 1 | 3 | 6 | 2 |
| Tactical / Security | 3 | 3 | 10 | 16 | 3 |
| Science | 3 | 2 | 8 | 13 | 3 |
| Engineering | 4 | 4 | 14 | 22 | 4 |
| Medical | 2 | 1 | 4 | 7 | 3 |
| Operations | 2 | 2 | 5 | 9 | 3 |
| **Total** | **18** | **13** | **44** | **75** | **20** |

---

## Ranks

### Officer Ranks

| Rank | Code | Typical Role | Stat Budget Range |
|------|------|-------------|-------------------|
| Captain | CAPT | Commanding officer | 42–52 |
| Commander | CDR | Executive officer, dept. head | 36–46 |
| Lt. Commander | LCDR | Senior dept. officer, dept. head | 28–38 |
| Lieutenant | LT | Department officer, watch officer | 22–30 |
| Lieutenant JG | LTJG | Junior officer | 16–24 |
| Ensign | ENS | Most junior officer | 10–18 |

### Enlisted / NCO Ranks

| Rank | Code | Typical Role | Stat Budget Range |
|------|------|-------------|-------------------|
| Master Chief Petty Officer | MCPO | Senior enlisted advisor | 26–34 |
| Senior Chief Petty Officer | SCPO | Department senior NCO | 22–30 |
| Chief Petty Officer | CPO | Section chief | 18–26 |
| Petty Officer 1st Class | PO1 | Specialist | 14–22 |
| Petty Officer 2nd Class | PO2 | Technician | 12–18 |
| Petty Officer 3rd Class | PO3 | Crew specialist | 10–16 |
| Crewman 1st Class | CR1 | Experienced crew | 8–14 |
| Crewman | CRW | Standard crew | 6–12 |

*Stat budget = total points distributed across all 6 visible stats. Higher ranks get
more points and narrower floors (more reliably competent).*

---

## Stat System

### Visible Stats (player can always view these)

Each stat runs 1–10.

| Stat | What It Measures |
|------|-----------------|
| **Command** | Leadership, authority projection, crisis decision-making |
| **Science** | Analysis, investigation, anomaly interpretation |
| **Tactical** | Combat, threat assessment, weapons/defense operation |
| **Engineering** | Systems operation, repair, technical improvisation |
| **Medicine** | Crew health management, biological threat response |
| **Diplomacy** | Communication, negotiation, alien relations, morale support |

**Stat generation by role:**

Stats are distributed using a weighted random algorithm:
1. Roll the NPC's stat budget (based on rank, normally distributed within range)
2. Set a floor of 1 for all stats (everyone has at least minimal competence)
3. Identify the NPC's "natural" stat (see Department Fit below)
4. Distribute remaining points: natural stat gets 25–35% of budget; others share the rest
5. Cap any single stat at 10

**Department fit (70% / 30% rule):**

- **70% of crew**: their highest visible stat matches their department's primary stat
  → They belong where they are; they are competent at their core function
- **30% of crew**: their highest stat does NOT match their department's primary stat
  → They are misassigned, generalists, mid-career transfers, or specialists in a
    secondary role
  → These NPCs often have surprising hidden stats; the misfit may be hiding more than
    their visible stats suggest

The 30% are NOT flagged to the player. The player must figure out who is misassigned
by observing performance over time.

---

### Hidden Stats (player cannot directly view)

Each named NPC has **1–2 hidden bonuses** tied to specific stats.

```
hidden_bonus = {
    stat_name: {
        'value': int(1–3),           # The bonus added when triggered
        'trigger_chance': 0.10,       # 10% per roll involving this stat
        'discovered': False           # Changes to True when player finds it
    }
}
```

**Hidden stat behavior:**
- On any resolution roll where the relevant stat is used, there is a 10% chance the
  hidden bonus is added to the roll result
- The player sees: "Chen performed exceptionally on this task" — but not the number
- Over multiple missions, a pattern becomes visible in logs if the player pays attention

**Hidden stat discovery:**
A hidden stat is revealed (marked `discovered = True`) through any of:
1. **Socialization**: choosing "One-on-one with [NPC]" free time with that crew member
   has a 40% chance to reveal one of their hidden stats per session
2. **Log analysis**: reviewing mission logs after 3+ exceptional performances by the
   same NPC triggers a log entry flagging the pattern — still not the number, but
   confirms the bonus exists in that area
3. **Crisis performance**: a natural critical success (d20 = 20) on a hidden-triggered
   roll always reveals that hidden stat immediately
4. **Medical/Psych review**: sending a crew member to a Medical evaluation (costs a
   free time slot, not always available) has a 70% chance to reveal one hidden stat

**Hidden stat distribution weighting:**
- 50% chance: hidden stat is in same area as NPC's highest visible stat (natural talent
  amplifying existing strength — harder to spot because good performance seems expected)
- 30% chance: hidden stat is in an area where NPC has LOW visible stats (hidden talent
  in an unexpected area — the misfit crew member who turns out to be invaluable)
- 20% chance: hidden stat is in the NPC's department primary stat regardless of visible
  stats (departmental aptitude that the visible stats don't capture)

---

## Species

Named NPCs are generated with a species, which affects name generation and applies a
minor stat modifier (flavor, not significant gameplay weight).

| Species | Population % | Name Style | Stat Flavor |
|---------|-------------|------------|-------------|
| Human | 58% | Varied Earth cultures | No modifier — balanced baseline |
| Vulcan | 10% | T'/S/V prefix patterns, formal | Science +1, Diplomacy −1 (logic over tact) |
| Andorian | 8% | Th-/Sh- sounds, clan suffixes | Tactical +1 |
| Betazoid | 7% | Flowing multi-syllabic | Diplomacy +1, Command −1 |
| Bolian | 5% | Ba-/Bo- patterns, double-barreled | Medicine +1 |
| Bajoran | 5% | Surname-first format | Engineering +1 (rebuilding culture) |
| Tellarite | 4% | Guttural, short | Tactical +1 |
| Other/Mixed | 3% | Random from all pools | No modifier |

*Species modifiers are +1 to a stat after all other generation is complete, capped at 10.
They represent cultural/biological tendencies, not determinism. A Vulcan with Diplomacy 2
is entirely possible — they're just a socially unusual Vulcan.*

---

## Loyalty, Morale, and Stress

These three secondary stats track each named NPC's current condition.

| Stat | Range | Starting Value | Effect |
|------|-------|---------------|--------|
| **Loyalty** | 0–100 | 50 | Affects willingness to perform beyond orders; affects mutiny risk at extremes |
| **Morale** | 0–100 | 70 | Affects consistency of performance; low morale increases partial failure rate |
| **Stress** | 0–100 | 20 | Accumulates with difficult missions; high stress increases critical failure chance |

**Changes:**
- Loyalty: modified by player choices — crew time investment, scenario outcomes that
  affect the NPC's values, public praise/discipline
- Morale: rises with mission success, rest periods, positive crew events; falls with
  failure, loss, prolonged high-alert status
- Stress: rises with combat/crisis scenarios, overwork; falls with rest, successful
  resolution, calm periods. Stress above 70 triggers a visible "strained" status.

**At extremes:**
- Loyalty ≤ 15: NPC begins passive resistance (refuses optimal station assignments,
  performance penalty on all rolls)
- Loyalty ≤ 5: NPC requests transfer; if denied, may take unilateral action
- Loyalty ≥ 90: NPC will accept one unusually dangerous assignment without hesitation;
  will give the player the benefit of the doubt on ambiguous orders
- Stress ≥ 85: NPC is clinically exhausted; mandatory Medical evaluation before
  further assignment; forced rest

---

## Surfacing Background Crew

Background crew are represented as department aggregates. But they are not invisible
forever. A background crew member becomes a named NPC (with retroactively generated
full stats and hidden stats) when:

1. A scenario outcome specifically calls out their performance
2. The player assigns a background crew member to a task when no named NPCs are available
3. A random "crew spotlight" event fires (once per tour, a background crew member
   distinguishes themselves in the logs)
4. The player uses a free time slot to "Review Crew Records" — surfaces one background
   crew member per slot, chosen by the game based on highest hidden stat values
   (the game rewards looking)

This system means the crew feels infinite without requiring the player to track 430
individuals at once. The interesting people rise to visibility through play.
