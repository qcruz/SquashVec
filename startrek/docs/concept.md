# Final Frontier — Game Concept

**Last Updated:** 2026-05
**Status:** Design phase

---

## The Core Loop

```
TOUR OF DUTY
  ├── Mission / Scenario (bridge station, decision point)
  │     ├── Select crew assignment
  │     ├── Read situation, choose response
  │     ├── Resolution (roll + stats + conditions)
  │     └── Outcome: success/partial/failure + consequences
  │
  ├── Downtime (free time allocation)
  │     ├── Choose activity (study, train, socialize, rest...)
  │     └── Stat/trait/relationship changes
  │
  └── Tour End
        ├── Performance review (Starfleet rating)
        ├── Rank advancement check
        └── Next posting assigned

CAREER
  ├── Rank progression: Ensign → Lt. JG → Lieutenant →
  │     Lt. Commander → Commander → Captain
  └── Final mission: Five-Year Expedition (endgame)
```

---

## The Career Arc

The game is structured as a Starfleet career spanning roughly 15–20 in-game years from
Academy graduation to the start of your five-year mission. Each **tour of duty** is an
assignment aboard a vessel or posting at a station, lasting 1–3 in-game years.

### Ranks and What They Mean in Gameplay Terms

| Rank | Player Role | Primary Activity | Stakes |
|------|-------------|-----------------|--------|
| **Ensign** | Crew member at a single assigned station | Learn the station, follow orders, survive your early mistakes | Low — mistakes are recoverable; you are expected to be imperfect |
| **Lieutenant JG** | Crew member with more autonomy; occasional watch command | Begin choosing between assignments; crew relationships start mattering | Medium — your record is being written |
| **Lieutenant** | Department head; responsible for a crew section | Manage department performance, make calls that affect others | Medium-high — failures have downstream crew consequences |
| **Lt. Commander** | First officer of a small vessel or senior dept. head | Run multi-department operations; your decisions affect ship outcomes | High — your record determines whether you're trusted with command |
| **Commander** | First officer of a major vessel | Full bridge management; captain is present but increasingly defers to you | Very high — this is the proving ground for captaincy |
| **Captain** | Commanding officer | The five-year mission | Everything — the endgame |

### What Advancement Requires

Rank is not automatic with time served. Each promotion requires:
1. **Performance threshold:** average scenario success rate above a rank-specific floor
2. **No recent career flags:** career flags (serious failures, crew incidents, disciplinary
   marks) block promotion and must be addressed or aged out
3. **Advocacy:** at least one senior officer NPC must have high enough opinion of you to
   endorse the promotion (requires relationship investment)
4. **Tour completion:** you must have completed at least one full tour at current rank

A player can be exceptional in performance but stall without the relationship investment
to generate an endorsement. Conversely, a well-connected player with mediocre performance
can advance but will struggle at the higher ranks where the scenarios are harder.

---

## The Five-Year Mission — The Endgame

When you reach Captain rank, you are given command of a vessel and assigned a deep-space
expedition: five years in uncharted or contested space, scientific and diplomatic
objectives, no reliable Starfleet backup.

**Endgame structure:**
- Five in-game years, broken into annual "seasons" of 8–12 major scenarios each
- Full bridge command: you assign all senior officers to stations; their stats and
  loyalty affect every resolution
- Crew attrition: officers can be injured, killed, transfer off, or resign — you manage
  roster continuity
- Ship condition: accumulated damage that isn't repaired compounds; a ship at 60%
  structural integrity handles every crisis differently than one at 95%
- The scientific/diplomatic mission: parallel to survival, you have objectives to achieve
  — first contacts made, phenomena catalogued, territorial disputes mediated. These
  generate your legacy score.

**Win condition:** Return the ship to Earth at the end of Year 5 with:
- Ship structural integrity above 40%
- Crew survival rate above 70%
- At least partial completion of the expedition's scientific/diplomatic mandate

**Loss conditions (immediate end):**
- Ship destroyed
- Player character killed
- Mutiny (crew loyalty across the ship drops to zero)
- Flagrant violation of Starfleet ethics with no recovery (Prime Directive catastrophe,
  war crime equivalent) — Starfleet relieves you of command

**Legacy scoring (post-game):**
- First contacts made
- Scientific discoveries catalogued
- Crew members who served with you and went on to notable careers
- Diplomatic agreements brokered
- Ship condition at return
- Career commendations and flags from your entire arc, not just the expedition

---

## What Makes This Star Trek Specifically

The Star Trek setting provides:

**The ethical layer:** Many scenarios have no clean answer. Do you violate the Prime
Directive to save lives? Do you follow orders that seem wrong? Do you sacrifice the one
to save the many? Star Trek is specifically about the collision of duty, ethics, and
imperfect information — which is also perfect for a decision strategy game.

**The station structure:** The bridge model maps perfectly to the Dispatch structure. You
have stations (Helm, Tactical, Science, Medical, Engineering, Communications), each with
a role in resolving scenarios, each with a specialist officer who has their own stats and
relationship with you.

**The escalation structure:** An Ensign dealing with a sensor calibration problem and a
Captain dealing with a first contact gone wrong are structurally similar scenarios but
at completely different stakes and complexity. The same mechanical system works across
the full career arc.

**The crew as characters:** Starfleet crews are defined by personality and relationship as
much as rank. The game needs named officers who feel like people — with motivations, arcs,
and memories of what you've done.

**The genre:** Space opera is forgiving of both hard science and dramatic license.
Scenarios can range from tense tactical combat to diplomatic negotiation to scientific
mystery to crew interpersonal crisis. The variety keeps the game fresh across a long
career arc.

---

## Tone and Aesthetic

**Lo-fi terminal style.** The game renders in monospace text. Scenario descriptions are
concise prose — 3–6 sentences of scene-setting, then the decision. No pixel art. No
sound. The atmosphere comes from the writing and the numbers.

**Reference: Dispatch.** Dispatch uses a clean column layout — event on the left, response
options on the right, resource state across the top. The Star Trek version of this is:
situation summary at top, station assignments on the left, response options on the right,
ship/crew status bar at bottom. All text, all decisions, all consequences.

**Influenced by:** Fallen London's prose style (weighty, specific, no filler text).
FTL's resource pressure and permadeath adjacency. Star Trek TOS/TNG/DS9 episode
structure (cold open → complication → escalation → resolution → consequence).

---

## Scope — What This Game Is Not

- Not a combat simulator. Combat exists as scenario type but is resolved through
  decisions, not real-time action.
- Not a crew management sim in the Dwarf Fortress sense. The crew model is deep enough
  to feel consequential but not so granular that it becomes the game.
- Not a narrative RPG with branching story. The scenarios have outcomes, not cutscenes.
  The "story" of your career is emergent from your decisions and their consequences.
- Not a multiplayer game.
- Not a licensed Star Trek product. Close enough for personal use and the spirit of the
  setting; far enough in names/details to be its own thing if it ever goes further.
