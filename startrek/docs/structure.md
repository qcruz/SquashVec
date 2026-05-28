# Final Frontier — Game Structure

**Last Updated:** 2026-05
**Status:** Authoritative design reference

---

## The Hierarchy

The game operates on four nested levels. Each promotion moves the player one level up —
from executing work directly to managing the people who execute it.

```
VOYAGE
  └── MISSION  (3–6 per voyage)
        └── PROJECT  (2–4 per mission)
              └── TASK  (3–5 per project)
```

| Level | Player Rank | What Player Does |
|-------|------------|-----------------|
| **Task** | Ensign | Read situation → choose option → roll → outcome |
| **Project** | Lieutenant / Lt. Commander | Assign crew to tasks; spend own ability to boost struggling tasks |
| **Mission** | Commander | Assign project leaders; respond to interruptions and unexpected complications |
| **Voyage** | Captain | Select voyage type; assign missions; make strategic decisions under pressure |

The player never stops making decisions — the *type* of decision changes with each
promotion. A Captain never manually executes a task. An Ensign never selects a voyage.
The game teaches the different textures of responsibility at each level.

---

## Task Level (Ensign)

**What it is:** A single decision point. The player reads a situation, picks from 3–5
options, and a roll determines the outcome. This is the base unit of the entire game.

**Structure:**
```
TASK
  Situation text (3–6 sentences)
  Options (3–5 choices):
    - Label
    - Primary station / stat
    - Difficulty
    - Cost type and amount
    - Success probability hint
  Resolution:
    - d20 + stat modifier + crew modifier + condition modifier
    - Tier: critical success / success / partial / failure / critical failure
    - Outcome prose
    - Consequences (stat changes, lives affected, flags)
```

**Lives at stake:**
Every task has a `lives_at_risk` value (0 for most; non-zero for rescue/disaster tasks).
- Full success: lives saved = `lives_can_save` (credited to score if voluntary intervention)
- Full failure: lives lost = `lives_at_risk` (counted against score if player was responsible)
- Partial: some fraction of each, determined per task

**Ordered not to intervene:**
Some tasks are flagged `ordered_not_to_intervene = True`. If the player proceeds anyway:
- Career flag added (insubordination or Prime Directive)
- Lives saved on success count toward score
- Lives lost on failure count against score
- Crew who die during the intervention count against score

If the player obeys and does not intervene:
- No career flag
- Lives lost do NOT count against score
- Crew loyalty drops — reducing future task/project success probability

**Promotion from Ensign:**
When the player has completed enough tasks with sufficient performance
(configurable threshold: default 15 tasks, ≥60% full-success-or-better rate),
Starfleet reviews the record and offers promotion to Lieutenant.

---

## Project Level (Lieutenant / Lt. Commander)

**What it is:** A named objective requiring 3–5 tasks. The player assigns crew members
to handle tasks and chooses how to allocate their own limited involvement.

**Structure:**
```
PROJECT
  Title and objective
  Tasks (3–5):
    - Assigned crew member (player selects from eligible roster)
    - Crew member executes task (rolls happen automatically with their stats)
    - Player can "intervene" in struggling tasks (spends one intervention slot)
  Completion threshold: need X of Y tasks to complete (default: 60%)
  Outcome: success / partial / failure (based on task completion rate)
```

**Player actions during a project:**
- **Assign**: Before execution, choose which crew member handles each task
- **Intervene**: During execution, spend a limited intervention to boost a task
  (adds player's relevant stat to the roll; costs one of N intervention slots per project)
- **Abort**: Terminate a task early to protect crew from a catastrophic roll
  (task fails, but prevents a critical failure's full cost)

**Crew assignment strategy:**
The player cannot manually execute tasks anymore. Their decisions are:
1. Which crew member is best suited to each task (based on stats, department fit,
   hidden stats they may have discovered)
2. Which tasks to spend limited interventions on
3. Whether to push through a risky task or protect the crew

**Intervention slots:** The player gets 1 intervention slot per project at Lieutenant
rank, 2 at Lt. Commander rank. Spending a slot allows the player to add their own stat
roll to a task in progress.

**Promotion from Lieutenant:**
Sufficient projects led successfully across multiple missions. A mentor NPC endorsement
is required (relationship system investment needed).

---

## Mission Level (Commander)

**What it is:** A named assignment with a primary objective and 2–4 projects. The player
assigns project leaders and responds to complications that arise during execution.

**Structure:**
```
MISSION
  Title, objective, and threat level
  Primary objective (must complete ≥1 project fully)
  Secondary objectives (optional; score bonus if achieved)
  Projects (2–4):
    - Assigned project leader (a Lieutenant-rank NPC)
    - Project leader's stats determine base task outcomes
    - Player monitors progress and responds to interruptions
  Interruptions (0–2 random events per mission):
    - Unexpected complication mid-mission
    - Player makes one tactical decision to mitigate
  Lives at stake: mission-level value (can be large — ship or colony scale)
```

**Player actions during a mission:**
- **Assign leaders**: Choose which officers lead each project
- **Respond to interruptions**: Each interruption is a rapid decision (1–2 options,
  limited time) that affects one or more projects' completion chances
- **Reallocate**: Pull a project leader from a secondary objective to reinforce
  a failing primary objective (abandon the secondary to protect the primary)
- **Request support**: Spend a Starfleet relationship point to call for assistance
  (limited; costs a career resource; reduces autonomy)

**Promotion from Commander:**
Full mission command success rate above threshold; advocacy from two senior NPCs;
clean (or forgiven) career flag record. Promotion to Captain is offered as a choice —
the player may decline and remain at Commander if they prefer the current role.

---

## Voyage Level (Captain)

**What it is:** A deployment with a defined type, duration, and set of missions.
The Captain selects voyages from available options, staffs the ship, and makes
strategic decisions throughout.

**Voyage types:**

| Type | Focus | Typical Missions | Score Emphasis |
|------|-------|-----------------|----------------|
| **Exploration** | Deep space survey | Discovery, first contact, anomaly investigation | Voyages completed, discoveries |
| **Diplomacy** | Federation relations | Negotiation, mediation, treaty support | Lives saved, relationships |
| **Federation Support** | Operational deployment | Rescue, patrol, emergency response | Lives saved, missions completed |
| **Scientific Survey** | Research deployment | Anomaly study, planet survey, data collection | Discoveries, tasks completed |
| **Border Patrol** | Security deployment | Threat response, escort, deterrence | Missions completed, crew survival |

**Voyage duration:** Short (3 months, 3–4 missions), Standard (6 months, 5–7 missions),
Extended (1 year, 10–14 missions). Duration affects score multiplier and risk level.

**Captain's bridge menu:**
- Assign bridge officers (one per station; stat determines station effectiveness)
- Review active missions (see project progress, flag emerging problems)
- Issue strategic orders (redirect a mission, abort an objective, request Starfleet support)
- Personal decisions (free time allocation still applies at Captain rank)
- Respond to critical alerts (high-pressure scenarios that override normal flow)

**Critical alerts (Captain-level scenarios):**
These are the highest-stakes decision points — situations where the Captain must act
personally, immediately. They are the lose-lose scenarios described in the design:
- Rescue operation during ordered withdrawal
- Crew mutiny brewing while on a critical mission
- Two rescue calls and resources for only one
- First contact while a crew member is held hostage
These scenarios do not have good options. They have less-bad options and worse options.

---

## The Five-Year Expedition (Endgame)

When the player has reached Captain rank and accumulated sufficient career standing,
they are offered command of a five-year deep-space expedition. This is the endgame.

**Endgame structure:**
- 5 in-game years broken into annual "seasons" of voyages
- Full bridge staff selected at start; roster management throughout
- Ship condition accumulates over 5 years without resupply
- Score accumulates from every task, project, mission, and voyage completed
- The encounter clock ticks

**The Encounter:**

At some point within the five-year window — randomly determined but weighted toward
Years 3–5 — the player receives an alert that cannot be resolved. An overwhelming force.
Sensors that make no sense. A situation with no favorable outcome.

This is not a surprise. The game makes clear from the beginning that the ship will be
destroyed. The only question is: how, when, and what you accomplish before it happens.

**Encounter responses and their effects:**

| Response | Crew Survival | Ship | Score Effect |
|----------|-------------|------|-------------|
| **Fight** | 20–50% (loyalty-dependent) | Destroyed | Heroism bonus; depends on how long you hold |
| **Surrender** | 60–80% | Taken/destroyed | No heroism; crews survive |
| **Negotiate** | 50–70% (Diplomacy-dependent) | Destroyed | Partial credit; relationship effect |
| **Sacrifice play** | 80–90% (captain stays) | Destroyed | Max crew survival; captain dies |
| **Self-destruct** | 10–30% (escape pods launched first) | Destroyed | Denies enemy; crew largely dies |
| **Flee (fail)** | 0–40% | Destroyed | Roll-dependent; no voluntary credit |

Crew loyalty at the moment of the encounter determines the upper bound of survival
across all options. A crew that doesn't trust the captain won't follow orders in the
final moments.

**Final score calculation:**
```
BASE SCORE
  Tasks completed         × 10
  Projects completed      × 50
  Missions completed      × 200
  Voyages completed       × 1,000
  Years reached           × 500

LIVES (highest-weighted factors)
  Lives saved (direct intervention)    × 150   [only voluntary rescue counts]
  Lives lost (crew + assigned targets) × −200  [does not count ordered non-intervention]

CREW
  Crew alive at encounter               × 75
  Crew who survive the encounter        × 100

CAREER
  Commendations                         × 250
  Career flags (negative)               × −150 each
  Mentor relationships completed        × 200

ENCOUNTER
  Encounter response bonus (see table above)
```

---

## Lives Saved / Lives Lost — The Core Ethical Mechanic

This is the most important design element in the game's scoring system.

**Lives Saved (positive):**
Only counts lives that were at risk AND that the player chose to intervene to protect.
- Ordered to intervene and succeeded: counts
- Not ordered, chose to intervene, succeeded: counts (higher multiplier for defying orders to save lives)
- Happened to succeed at a task where lives were incidentally at stake: counts only if
  the player selected an option that prioritized saving those lives

**Lives Lost (negative):**
Only counts when the player had a reasonable opportunity to prevent the deaths and
the deaths occurred under their operational responsibility.
- Mission assigned to player; player failed; people died: counts
- Natural disaster player was ordered NOT to intervene in; player obeyed; people died: does NOT count
- Natural disaster player was ordered NOT to intervene in; player disobeyed; people died in the attempt: counts (they died under your command)
- Enemy action that player could not have predicted or prevented: does NOT count
- Crew who die in an intervention you initiated: always counts

**The Veridian III scenario (example):**
- Starfleet orders player to withdraw
- Science reports 230M lives at risk from stellar event
- Player options and scoring consequences:
  - Obey: 0 lives saved (no intervention), 0 lives lost penalty, crew loyalty drop
  - Disobey + succeed: 230M lives saved (massive score gain), career flag
  - Disobey + fail: career flag, crew who died in the attempt counted as lives lost
  - Disobey + partial: some fraction of 230M saved, career flag, proportional cost

The player is never punished for obeying an order to stand down — the galaxy is full of
tragedies. They are rewarded for finding ways to save lives when no one told them to,
and held accountable for the consequences of the choices they make.

---

## Rank Progression Requirements

| Promotion | From → To | Requirements |
|-----------|-----------|-------------|
| 1 | Ensign → Lieutenant | 15 tasks + ≥60% success rate + no unresolved critical flags |
| 2 | Lieutenant → Lt. Commander | 8 projects led + ≥55% full completion + 1 mentor endorsement |
| 3 | Lt. Commander → Commander | 6 missions commanded + ≥50% primary objective success + 2 endorsements |
| 4 | Commander → Captain | 4 voyages + ≥1 extended voyage + clean enough record + 2 senior endorsements |
| — | Captain → Expedition | Career record review; player chooses to accept the five-year command |

**Declining promotion:** The player may decline any promotion and continue at current rank.
This is sometimes strategically correct — a player with low stats who rushes to Captain
will struggle with mission management. The game does not punish patience.
