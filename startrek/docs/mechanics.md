# Final Frontier — Game Mechanics

**Last Updated:** 2026-05
**Status:** Skeleton — to be built out in detail

---

## Resolution System

Every scenario decision resolves through the same core formula:

```
OUTCOME ROLL

Base die:       d20 roll (1–20, uniform random)
Stat modifier:  +/- relevant character stat (see Stats)
Crew modifier:  +/- assigned crew member's relevant stat
Condition mods: ship integrity, crew fatigue, relationship bonuses, situational flags
Difficulty:     scenario-defined target number

Result vs. difficulty:
  Roll ≥ Difficulty + 5    → Full Success
  Roll = Difficulty ± 4   → Partial Success (success with cost, or failure with mitigation)
  Roll ≤ Difficulty - 5   → Full Failure
  Roll = 1 (natural)      → Critical Failure (rare catastrophic outcome)
  Roll = 20 (natural)     → Critical Success (rare exceptional outcome)
```

**Partial success is the most common outcome.** The game is designed so that around 50%
of rolls land in the partial band — meaning there is almost always *some* cost even when
you do well. This keeps resources under pressure throughout the career.

---

## Character Stats

Six primary stats govern resolution. They start at character-creation values and develop
through free time choices, successful scenario performance, and certain career events.

| Stat | Governs | Primary Stations |
|------|---------|-----------------|
| **Command** | Leadership under pressure; crew morale maintenance; order-giving clarity | All stations (secondary); especially Helm, Tactical |
| **Science** | Sensor analysis; anomaly investigation; technical problem-solving | Science, Engineering |
| **Tactical** | Combat decisions; weapons systems; threat assessment | Tactical, Helm |
| **Engineering** | Ship systems repair; technical improvisation; resource management | Engineering, all systems crises |
| **Medicine** | Crew health; triage decisions; biological scenarios | Medical |
| **Diplomacy** | Alien contact; negotiation; crew relationship management | Communications, any first contact |

**Derived stats (calculated from primaries):**

| Derived Stat | Formula | Effect |
|--------------|---------|--------|
| **Composure** | (Command + Diplomacy) / 2 | Penalty resistance under stress; reduces negative mods from crisis conditions |
| **Improvisation** | (Science + Engineering + Tactical) / 3 | Bonus to partial failures (mitigates cost); helps when no clean option exists |
| **Crew Bond** | Average loyalty of all senior officers | Bonus to scenarios requiring crew coordination; affects mutiny risk |

**Stat ceilings by rank:**
- Stats cannot be raised above rank-appropriate ceilings through free time alone
- Above-ceiling growth requires specific career events (mentorship, crisis breakthrough,
  specialized training posting)
- *Rationale:* prevents grinding to max stats early; keeps development meaningful at
  each career stage

---

## Skills and Specializations

*[To be detailed — differentiated from stats; narrower bonuses for specific scenario types]*

Placeholder categories:
- Starship Piloting
- Weapons Systems
- Sensor Operation
- Xenobiology
- Warp Engineering
- Xenolinguistics
- Tactical Combat
- Field Medicine
- Negotiation
- Command Protocol

---

## Crew System

*[To be detailed — see stations.md for station roles; this section covers crew as
people rather than functional assets]*

Key design questions to resolve:
- How many named crew members? (Senior staff 6–8; junior crew as a pool?)
- How are crew stats tracked vs. player stats?
- How does crew loyalty work mechanically? (0–100 scale? tier system?)
- What triggers crew departure / injury / death?
- How do crew relationships affect specific resolution types?

---

## Free Time System

Between scenarios, the player receives a fixed number of free time slots per tour
(exact number TBD — likely 2–4 per tour). Each slot is spent on one activity.

**Activity categories:**

| Category | Examples | Primary Effect |
|----------|---------|---------------|
| **Study** | Technical manuals, command theory, alien culture texts | +Science or +Engineering or +Diplomacy (by text) |
| **Physical Training** | Combat drills, endurance training, martial arts | +Tactical; reduces injury severity from combat scenarios |
| **Station Practice** | Extra shifts at a specific bridge station | +proficiency at chosen station; slight loyalty boost from crew |
| **Crew Time** | Mess hall, holodecks, one-on-one with an officer | +loyalty with specific crew member; +Diplomacy |
| **Rest** | Sleep, recreation, doing nothing useful | Recover fatigue; no stat gain; sometimes the right call |
| **Research** | Investigating a scientific or tactical problem proactively | Unlocks additional options in specific future scenarios |
| **Mentorship** | Spending time with a senior officer NPC | Access to above-ceiling stat growth; relationship with mentor |
| **Personal** | Character-specific backstory choices | Varies by character arc; sometimes reveals hidden options |

**Design principle:** There is no objectively correct free time allocation. The right
choice depends on what scenarios are coming (unknown to the player), what your crew
needs, and what your stat profile currently lacks. Over-specializing in Study leaves
you physically fragile and socially isolated. Over-investing in Crew Time leaves your
technical stats lagging. The player who tries to optimize everything will be mediocre
everywhere; the player who accepts gaps and compensates with good crew choices will do
better.

---

## Ship Condition

The ship is a character with its own health system. Ship condition affects resolution
rolls for any scenario involving ship systems.

| Subsystem | Affects |
|-----------|---------|
| **Hull Integrity** | Damage resistance; cascading failure risk |
| **Propulsion** | Escape options; travel time; pursuit scenarios |
| **Weapons** | Tactical roll modifier |
| **Sensors** | Information quality at scenario start; anomaly detection |
| **Life Support** | Crew fatigue accumulation rate |
| **Communications** | Contact with Starfleet; diplomatic scenario options |

**Repair:** Requires Engineering time (free time slot OR scenario outcome). Ship
condition that falls below thresholds triggers status effects on all affected rolls.
Deferred repairs compound — a ship at 60% hull integrity that takes another hit without
repair doesn't just go to 50%; systems start cascading.

---

## Career Flags

Career flags are persistent marks on your Starfleet record — positive and negative.
They do not directly affect resolution rolls but affect:
- Promotion eligibility
- Available postings (better postings go to cleaner records)
- NPC reactions (senior officers who know your record)
- Endgame legacy score

**Negative flag types (examples):**
- Crew casualty (when a crew member dies under your command)
- Prime Directive violation
- Insubordination (disobeying direct Starfleet orders)
- Tactical failure (lost a vessel or significant engagement)
- Diplomatic incident

**Positive flag types (examples):**
- Commendation (exceptional performance above expectations)
- First contact (successful initial contact with new species)
- Lifesaving (scenario outcome saved significant lives)
- Above and beyond (sacrificed position/resources to do the right thing)

**Flag aging:** Negative flags from early career (Ensign/Lt. JG) age off the active
record after sufficient time and clean performance — they become historical notes, not
active blockers. Flags from Commander rank never fully age off.

---

## Difficulty Scaling

*[To be detailed]*

How does scenario difficulty scale with rank? Current thinking:
- Difficulty numbers stay roughly constant (10–18 range)
- At lower ranks, the player has lower stats, meaning the same difficulty number is
  harder to hit
- At higher ranks, stats are higher but scenarios are more complex (more moving parts,
  more simultaneous pressures) rather than just higher target numbers
- The endgame expedition introduces *compounding* difficulty: a ship at 80% condition
  with a fatigued crew facing a hard scenario is harder than the raw scenario number
  suggests

---

## Randomness Philosophy

*[To be documented]*

The game uses randomness as texture, not as the primary driver of outcomes. A player
with high relevant stats should succeed more often than they fail on appropriate
scenarios. A player with low stats should struggle. Randomness creates memorable moments
(the critical failure that costs you something important; the lucky roll that saves
a bad situation) without making the career feel arbitrary.

**Planned:** probability display before resolution ("Success chance: ~65%") so the player
can make informed decisions about which scenarios to tackle with which crew and station
assignments rather than being blindsided by opaque probability.
