# Final Frontier — Events Catalog

**Last Updated:** 2026-05
**Status:** Design reference — events not yet in game code

This catalog defines major game events drawn from Star Trek episode archetypes.
Each entry describes the full Voyage → Mission → Project → Task breakdown,
challenge levels, lives at stake, and state requirements.

Use this document to plan content additions. Events are organized by category.

---

## How to Read This Document

**State requirements** — minimum conditions before this event can appear:
- `rank_min`: player must be at or above this rank
- `ship_min`: minimum ship class required
- `voyage_type`: which voyage types this event fits
- `flag`: a prior event or condition that must have occurred

**Challenge ratings** per project/task:
- `Easy` (difficulty 8–10): favorable stats assumed; most rolls succeed
- `Standard` (difficulty 11–13): balanced; partial is modal outcome
- `Hard` (difficulty 14–16): unfavorable conditions; failure is possible
- `Critical` (difficulty 17–19): very hard; success requires high stats + crew
- `Legendary` (difficulty 20+): nearly impossible; used for named impossible scenarios

**Lives at stake:**
- `None`: 0
- `Crew`: 5–50 (your own crew only)
- `Local`: 100–10,000 (small settlement or vessel)
- `Regional`: 10,000–1,000,000 (colony, station)
- `Planetary`: 1,000,000–10,000,000
- `Civilizational`: 10,000,000+ (entire species or world)

---

## CATEGORY 1: SENSOR CONTACT / TACTICAL ENCOUNTER

---

### EVENT: The Corbomite Gambit
*Inspired by: TOS "The Corbomite Maneuver"*

**Summary:** A massive alien vessel intercepts the ship and issues an ultimatum — surrender or be destroyed. The vessel is far more powerful than anything in the database. Bluffing may be the only option.

**State requirements:** Any rank, any voyage type
**Lives at stake:** Crew (full crew complement)
**Threat level:** High

**MISSION: Stand Off**

> *Primary objective: Survive the encounter and open communication.*

**Project 1 (Primary): Hold Course**
> Do not flee. Do not fire. Hold course and maintain composure while options are considered.
- Task 1 — Tactical assessment of alien vessel capabilities
  - Stat: Science/Tactical | Difficulty: Standard
  - Success: Player gains accurate picture of the threat.
  - Failure: Player overestimates or underestimates the vessel — affects decision-making.
- Task 2 — Contain crew panic
  - Stat: Command/Medicine | Difficulty: Standard
  - Lives at stake: Crew (stress cascade if failed)
  - Success: Crew holds steady. Failure: Morale drop; one crew member attempts to flee post.
- Task 3 — Send communication on all frequencies
  - Stat: Diplomacy | Difficulty: Standard
  - Success: Gets a response. Partial: Signal acknowledged but not replied to. Failure: Silence.

**Project 2 (Secondary): The Bluff**
> Transmit a fabricated deterrent — claim the ship carries an auto-destruct device that will destroy any attacker.
- Task 1 — Draft the bluff communication
  - Stat: Command/Diplomacy | Difficulty: Hard
  - Success: Convincing and specific. Failure: The alien sees through it.
- Task 2 — Maintain the bluff under pressure
  - Stat: Command | Difficulty: Hard
  - Success: The alien backs down or agrees to parley. Failure: Escalation.
- Task 3 — Identify the bluff's weakness before they do
  - Stat: Science | Difficulty: Standard
  - Success: Player patches the obvious hole in the cover story.

**SCORING NOTES:**
- Lives saved: full crew complement if both projects succeed
- Career flag risk: using deception may generate flag if discovered and mission fails
- Unlock: completing this event can unlock "The Balok Relationship" follow-up event

---

### EVENT: Silent Dagger
*Inspired by: TOS "Balance of Terror"*

**Summary:** A cloaked vessel is systematically destroying outposts along the border. The player must track it using only sensor echoes, then decide: engage, report, or maneuver.

**State requirements:** `rank_min: Lieutenant`, `voyage_type: Border Patrol`
**Lives at stake:** Regional (outpost populations, 500–5,000 per station)
**Threat level:** High

**MISSION: Outpost Gamma-Seven**

> *Primary: Locate the cloaked vessel before the next outpost is destroyed.*
> *Secondary: Protect the remaining outpost personnel.*

**Project 1 (Primary): The Hunt**
- Task 1 — Analyze debris from destroyed outpost
  - Stat: Science | Difficulty: Standard
  - Success: Yields a partial trajectory. Failure: No pattern identified.
- Task 2 — Reconfigure sensors for plasma trail detection
  - Stat: Engineering | Difficulty: Hard
  - Success: The reconfiguration works — limited cloaked vessel tracking.
- Task 3 — Predict the next target from the attack pattern
  - Stat: Tactical/Science | Difficulty: Standard
  - Success: Player correctly identifies the next outpost in the sequence.
- Task 4 — Maintain radio silence (critical — alerting the vessel ends the hunt)
  - Stat: Command | Difficulty: Standard
  - Success: Surprise maintained. Failure: The vessel changes course.

**Project 2 (Secondary): Outpost Evacuation**
> Evacuate Outpost Delta-Four before the vessel reaches it.
- Task 1 — Contact outpost and assess evacuation feasibility
  - Stat: Diplomacy/Command | Difficulty: Easy
- Task 2 — Coordinate emergency transport (limited range, damaged equipment)
  - Stat: Engineering | Difficulty: Hard
  - Lives at stake: Local (outpost crew, ~200)
- Task 3 — Cover the evacuation vessel during transit
  - Stat: Tactical | Difficulty: Hard
  - Success: Evacuation completes. Failure: Outpost vessel takes fire.

**Project 3 (Secondary): The Engagement**
> Once located, engage the vessel before it can cloak again.
- Task 1 — Fire at the moment of de-cloaking
  - Stat: Tactical | Difficulty: Critical
  - Success: Disabling hit. Partial: Glancing damage. Failure: They re-cloak.
- Task 2 — Damage assessment and pursuit decision
  - Stat: Command/Tactical | Difficulty: Standard
- Task 3 — Cease fire and hail (if enemy shows distress)
  - Stat: Diplomacy | Difficulty: Standard (ethical weight)
  - Lives at stake: Crew of enemy vessel
  - Ordered not to intervene: possible flag if Starfleet orders pursuit regardless

---

### EVENT: The Arena
*Inspired by: TOS "Arena"*

**Summary:** Following an attack on a Federation outpost, the player's ship pursues the attackers. An unknown alien power halts both vessels and forces the commanders into single combat — but the fight can be avoided by demonstrating restraint.

**State requirements:** `rank_min: Commander`, `voyage_type: Border Patrol or Exploration`
**Lives at stake:** Civilizational (implied — the alien power will destroy the ship if the player fails the test)
**Threat level:** Critical

**MISSION: The Metron Encounter**

**Project 1 (Primary): Personal Combat**
> You are transported to a barren planetoid. The opponent is physically superior.
- Task 1 — Assess terrain and resources for improvised weapons
  - Stat: Science/Engineering | Difficulty: Standard
  - Success: Player identifies sulfur, potassium nitrate, diamonds — components for a weapon.
- Task 2 — Build the improvised weapon
  - Stat: Engineering | Difficulty: Hard
  - Critical failure: Weapon explodes in your hands.
- Task 3 — Engage
  - Stat: Tactical | Difficulty: Hard
  - Success: Opponent incapacitated. Failure: Player incapacitated (outcome decided by Metrons).

**Project 2 (Secondary, unlocked by Project 1 partial): Refuse to Kill**
> The opponent is defeated but not dead. The decision to spare them is scored separately.
- Task 1 — Recognize the test in time
  - Stat: Science/Diplomacy | Difficulty: Standard
  - Success: Player understands the situation before acting on instinct.
- Task 2 — Demonstrate restraint
  - Stat: Command | Difficulty: Hard (ego and survival instinct work against you)
  - Ethical weight: Yes
  - Success: Metrons intervene; both ships are freed; diplomatic credit gained.
  - Failure: Player kills the opponent — ships are released, no credit.

**SCORING NOTES:**
- Refusing to kill: +500 lives saved equivalent (civilizational encounter avoided)
- Killing: mission completes with partial credit; no diplomatic relationship formed
- Sparing is not required for success — it is the high-value path

---

## CATEGORY 2: FIRST CONTACT

---

### EVENT: First Light
*Inspired by: TNG "First Contact" (Malcorian episode)*

**Summary:** An inhabited world has achieved early warp capability. Starfleet wants a first contact assessment. Complications: the player's away team has been captured, the society is politically volatile, and the science minister believes in contact while the chancellor does not.

**State requirements:** `rank_min: Lieutenant Commander`, `voyage_type: Exploration or Diplomacy`
**Lives at stake:** Civilizational (risk of cultural contamination / future war if botched)
**Threat level:** Medium

**MISSION: The Sleeping Giant**

> *Primary: Establish peaceful first contact without destabilizing the civilization.*
> *Secondary: Recover the captured crew member.*

**Project 1 (Primary): The Contact Sequence**
- Task 1 — Cultural assessment from sensor data
  - Stat: Science/Diplomacy | Difficulty: Standard
  - Success: Player learns political structure, likely fears, contact-friendly individuals.
- Task 2 — Identify the correct contact point (minister vs. chancellor)
  - Stat: Diplomacy/Command | Difficulty: Hard
  - Success: Player chooses the science minister — the right call.
  - Failure: Player goes to the chancellor — creates immediate political crisis.
- Task 3 — Initial contact communication
  - Stat: Diplomacy | Difficulty: Hard
  - Success: The minister is fascinated. Failure: Fear response; society goes to alert.
- Task 4 — Navigate political resistance from the chancellor
  - Stat: Command/Diplomacy | Difficulty: Hard
  - Ethical weight: Yes
  - Success: Contact proceeds. Failure: Chancellor shuts contact down and expels the crew.

**Project 2 (Secondary): Crew Recovery**
> The away team member has been captured and is in medical care. The hospital director knows the truth but is keeping it quiet — for now.
- Task 1 — Locate the missing crew member without revealing alien presence
  - Stat: Science/Diplomacy | Difficulty: Standard
- Task 2 — Negotiate secretly with the hospital director
  - Stat: Diplomacy | Difficulty: Hard
  - Success: Director cooperates. Failure: Director reports to chancellor.
- Task 3 — Extract without a scene
  - Stat: Command/Tactical | Difficulty: Standard

**SCORING NOTES:**
- Lives saved: Civilizational multiplier if contact succeeds peacefully (+large bonus)
- Career flag risk: if crew member's capture becomes public knowledge and contact fails

---

### EVENT: The Silence of Tama
*Inspired by: TNG "Darmok"*

**Summary:** A Federation vessel is disabled near a world whose inhabitants communicate entirely through metaphor from their own history. Standard Universal Translator is useless. The player must learn to communicate through shared experience — or fail to make contact at all.

**State requirements:** `rank_min: Lieutenant`, `voyage_type: Exploration`
**Lives at stake:** Crew (if communication fails and the alien vessel becomes hostile)
**Threat level:** Medium

**MISSION: Children of Tama**

**Project 1 (Primary): The Language Problem**
- Task 1 — Science analysis of the communication pattern
  - Stat: Science | Difficulty: Hard
  - Success: Player identifies that communication is metaphorical reference, not literal.
  - Failure: Player continues attempting literal translation — nothing works.
- Task 2 — Identify repeated phrases and map them to events
  - Stat: Science/Diplomacy | Difficulty: Hard
  - Success: A partial vocabulary of metaphors takes shape.
- Task 3 — Attempt communication using their pattern
  - Stat: Diplomacy | Difficulty: Critical
  - Success: The alien commander recognizes the attempt and responds in kind.

**Project 2 (Primary, sequential): The Trial on the Surface**
> The alien commander transports both of you to the planet's surface. This is the test.
- Task 1 — Survive the environmental hazard together
  - Stat: Engineering/Tactical | Difficulty: Standard
  - Success: Shared experience — the first metaphor is established.
- Task 2 — Tend to the commander when injured
  - Stat: Medicine | Difficulty: Standard
  - Ethical weight: Yes (you could have used the vulnerability)
  - Success: Trust established. The commander understands your intentions.
- Task 3 — Witness the commander's death with dignity
  - Stat: Command/Diplomacy | Difficulty: Standard
  - Success: Contact is acknowledged by the alien vessel. They depart in peace.
  - Failure: Player retreats, breaking the ritual — hostile response from alien vessel.

---

## CATEGORY 3: RESCUE AND EVACUATION

---

### EVENT: The Colony at Veridian
*Inspired by: Star Trek Generations scenario*

**Summary:** A stellar phenomenon is accelerating and will consume a planet with 230 million inhabitants. Starfleet has ordered the player's vessel to withdraw — other resources are en route. The player must decide whether to obey or intervene. The intervention may succeed or fail.

**State requirements:** Any rank
**Lives at stake:** Civilizational (230,000,000)
**Ethical core:** `ordered_not_to_intervene = True`
**Threat level:** High

**MISSION: Veridian III**

> *Starfleet orders: withdraw immediately. Civilian evacuation authority is being coordinated centrally.*

**Player decision fork:**

**OPTION A: Obey**
- No projects required. Ship withdraws.
- Outcome: 0 lives saved, 0 career flag, crew loyalty −5 to −15 (they know what they're passing).
- Score effect: 0 lives lost counted.

**OPTION B: Disobey and attempt rescue**
> Career flag added immediately. Outcome depends on project performance.

**Project 1 (Primary): Emergency Evacuation Run**
- Task 1 — Calculate safe approach trajectory through stellar debris
  - Stat: Science/Engineering | Difficulty: Hard
  - Failure: Ship takes damage before evacuation begins.
- Task 2 — Coordinate surface-side transport with colony administrators
  - Stat: Diplomacy/Command | Difficulty: Standard
  - Success: Orderly loading. Failure: Panic, poor prioritization, fewer saved.
- Task 3 — Transport cycles against the deadline
  - Stat: Engineering | Difficulty: Hard
  - Each success: +1,000 lives saved (scaled)
  - Critical success: +5,000
  - Failure: Transporter overloads; transport stops.
- Task 4 — Final departure decision — stay for one more cycle or go
  - Stat: Command | Difficulty: Hard (crew at risk if you stay)
  - Ethical weight: Yes
  - Success: One more cycle complete; crew safe.
  - Failure: Stellar event catches you; ship damaged, some crew lost.

**SCORING NOTES:**
- Obey path: no penalty, no reward, loyalty drop
- Disobey + succeed: massive lives saved, career flag, possible commendation later
- Disobey + fail: career flag, lives lost among any crew who died during attempt
- This is the clearest expression of the game's core ethical mechanic

---

### EVENT: Year of Hell (Compressed)
*Inspired by: VOY "Year of Hell"*

**Summary:** A temporal weapon ship is systematically erasing civilizations from history. Each erasure changes the battlefield. The player's ship has been steadily degraded over months of engagement. This event plays over multiple voyages and is the most complex rescue scenario in the game.

**State requirements:** `rank_min: Captain`, `expedition_active: True`, `year_min: 2`
**Lives at stake:** Civilizational (each erased civilization; recursive)
**Threat level:** Critical

**VOYAGE: The Long Engagement (Extended)**

This event spans multiple voyages. It is introduced as a background threat in one voyage and reaches crisis in the next.

**MISSION 1: Something is Wrong**
> Ships from allied species have simply ceased to exist. Sensor records are inconsistent.
- Project 1: Investigate sensor anomalies — Standard challenge
- Project 2: Interview surviving witnesses from affected regions — Standard challenge
- Project 3: Identify the weapon ship's signature — Hard challenge

**MISSION 2: First Contact (Hostile)**
> The weapon ship appears. They will not negotiate. The ship takes damage.
- Project 1: Tactical engagement — survive and withdraw — Critical challenge
- Project 2: Emergency damage control — Hard challenge
- Project 3: Recover personnel from disabled section — Hard challenge (lives: Crew)

**MISSION 3: The Allies**
> The player finds other species who have also been affected and forms a temporary coalition.
- Project 1: Diplomatic coalition formation — Hard challenge
- Project 2: Joint tactical planning — Standard challenge
- Project 3: Coordinate simultaneous action — Hard challenge

**MISSION 4 (Primary): The Decision**
> The weapon ship can be destroyed by ramming at warp — but only if the crew escapes first.
- Project 1: Get the crew off the ship — Standard challenge (lives: full crew complement)
- Project 2: Set the approach vector manually — Hard challenge
- Project 3: Destroy the weapon ship — Critical challenge
  - Ethical weight: Yes — this ends the threat but may kill the weapon ship's captain who was trying to restore his own erased family.

**SCORING NOTES:**
- Each successfully recovered civilization contributes to lives saved
- Ramming: treats as sacrifice play — full crew survival bonus if crew escaped; captain survives or not based on timing roll

---

### EVENT: The Plague Ship
*Inspired by: Multiple medical emergency episodes*

**Summary:** A Starfleet research vessel has gone silent. The player's ship investigates to find a highly contagious pathogen has infected the crew. The vessel drifts toward a densely populated system.

**State requirements:** `rank_min: Lieutenant`, any voyage type
**Lives at stake:** Regional (vessel crew) + Planetary (if the vessel reaches the populated system)
**Threat level:** High

**MISSION: The USS Archer**

**Project 1 (Primary): Containment**
- Task 1 — Long-range medical scan of the vessel
  - Stat: Science/Medicine | Difficulty: Standard
  - Success: Player gets accurate read of infection spread and pathogen type.
- Task 2 — Quarantine protocols — seal the vessel remotely
  - Stat: Engineering | Difficulty: Hard
  - Failure: Players' own crew becomes exposed.
- Task 3 — Prevent the vessel from entering the shipping lane
  - Stat: Engineering/Tactical | Difficulty: Hard (tractor beam against a drifting 200k ton vessel)

**Project 2 (Secondary): Medical Response**
- Task 1 — Identify the pathogen from bioscan data
  - Stat: Science/Medicine | Difficulty: Hard
  - Success: Treatment protocol becomes possible.
- Task 2 — Develop a targeted treatment
  - Stat: Medicine | Difficulty: Critical
  - Success: Treatment exists; saves the crew. Failure: Supportive care only; some die.
- Task 3 — Beam the treatment over without breaking quarantine
  - Stat: Engineering | Difficulty: Hard
  - Lives at stake: Vessel crew (full complement, ~80)

**Project 3 (Optional, unlocked by Project 2 success): Source Identification**
- Task 1 — Trace where the pathogen originated
  - Stat: Science | Difficulty: Standard
  - Success: Yields intelligence for future scenario (can prevent next outbreak)
- Task 2 — Secure the research data before the vessel is decontaminated
  - Stat: Engineering/Science | Difficulty: Standard

---

## CATEGORY 4: ETHICAL DILEMMA

---

### EVENT: The Measure of a Man
*Inspired by: TNG "The Measure of a Man"*

**Summary:** A Starfleet scientist wants to study and disassemble a crew member who is not biological. The crew member is a valued officer. Starfleet has ordered the player to comply. The player must navigate a formal hearing to defend the crew member's rights — or stand down.

**State requirements:** `rank_min: Commander`, requires android or synthetic crew member (future NPC type)
**Lives at stake:** None (ethical, not physical)
**Threat level:** Medium (political/career)

**MISSION: The Hearing**

**Project 1 (Primary): The Defense**
- Task 1 — Research applicable legal precedent
  - Stat: Science/Diplomacy | Difficulty: Hard
- Task 2 — Prepare the crew member's testimony
  - Stat: Command/Diplomacy | Difficulty: Standard
- Task 3 — Confront the prosecution's key argument
  - Stat: Diplomacy | Difficulty: Critical
  - Success: Argument dismantled. Failure: Precedent set against the crew member.
- Task 4 — Closing statement
  - Stat: Command/Diplomacy | Difficulty: Hard

**SCORING NOTES:**
- Success: crew member retained, loyalty +20 (entire crew witnesses it), commendation possible
- Failure: crew member lost from roster; career flag if player obeyed Starfleet order to not defend

---

### EVENT: In the Pale Moonlight
*Inspired by: DS9 "In the Pale Moonlight"*

**Summary:** A powerful neutral party could end a war — but only if they believe a fabricated piece of evidence. Someone has offered to create that evidence. The player must decide whether to use it, cover it up, and live with what they've done.

**State requirements:** `rank_min: Captain`, `expedition_active: True`, prior war mission in log
**Lives at stake:** Civilizational (millions; the war the evidence would end)
**Ethical core:** Active deception with massive stakes
**Threat level:** Medium (political/ethical)

**MISSION: The Faustian Option**

**Project 1 (Primary): The Fabrication**
- Task 1 — Commission the evidence without creating a traceable record
  - Stat: Command/Diplomacy | Difficulty: Hard
  - Ethical weight: Yes
- Task 2 — Deliver it to the neutral party
  - Stat: Diplomacy | Difficulty: Hard
- Task 3 — When the neutral party investigates, hold the story
  - Stat: Command | Difficulty: Critical
  - Success: They believe it. Failure: They expose the fabrication — career destroyed.

**Project 2 (Secondary): The Cleanup**
> The fabricator knows everything. They become a liability.
- Task 1 — Assess the fabricator's reliability
  - Stat: Command/Science | Difficulty: Standard
- Task 2 — Secure their silence — negotiate, pay, or something worse
  - Stat: Diplomacy/Command | Difficulty: Hard
  - Ethical weight: Yes (extreme)
  - Success options: pay them (costly), trust them (risky), or the worst option (unscored, flag)

**SCORING NOTES:**
- This event has no clean resolution — every path has costs
- Lives saved: massive if deception works and war ends
- Career flags: multiple possible; cannot be avoided if the project is run
- This is the game's darkest scenario — equivalent to "Veridian but for your soul"

---

### EVENT: The Needs of the Many
*Inspired by: TOS/STII "Wrath of Khan" ethical framework*

**Summary:** The ship has a cure for a disease that is killing a settlement. The cure works — but applying it requires exposing the engineering team to a lethal dose of radiation. There is no other way to stabilize it. Someone has to go into the chamber.

**State requirements:** Any rank
**Lives at stake:** Local (5,000 colony inhabitants) vs. Crew (1–3)
**Ethical core:** Sacrifice mechanic
**Threat level:** High

**MISSION: The Radiation Chamber**

> This mission has no "good" option. It has "terrible option A" and "terrible option B."

**Option A: Order crew into the chamber**
- Task 1 — Identify the volunteer / select the crew member
  - Stat: Command | Difficulty: Hard
  - Ethical weight: Yes
  - Success: The crew member volunteers. Partial: They go reluctantly. Failure: No one will go.
- Task 2 — Complete the cure synthesis
  - Stat: Medicine/Engineering | Difficulty: Standard
  - Lives at stake: Colony (5,000)
- Task 3 — Attempt emergency medical intervention for exposed crew
  - Stat: Medicine | Difficulty: Critical
  - Success: The crew member survives (barely). Failure: They die.

**Option B: Don't send anyone — find another way**
- Task 1 — Research alternative delivery mechanisms
  - Stat: Science/Engineering | Difficulty: Critical
  - Success: A viable alternative is found (extremely rare). Failure: No alternative — colony dies.
- Task 2 — Implement the alternative under time pressure
  - Stat: Engineering | Difficulty: Hard

**SCORING NOTES:**
- If crew member goes and dies: lives lost (crew) counted; lives saved (colony) counted
- If crew member goes and lives: pure net positive
- If player finds alternative: massive score bonus (the game rewards finding the third option)
- If colony dies: full 5,000 lives lost counted if player was in command responsibility

---

## CATEGORY 5: SCIENTIFIC ANOMALY

---

### EVENT: The Inner Light
*Inspired by: TNG "The Inner Light"*

**Summary:** A probe makes contact with the ship. The player is incapacitated for minutes — but experiences a full lifetime as a member of an extinct civilization. When they wake, the planet is dead and has been for a thousand years. The scientific data they carry could tell the galaxy who these people were.

**State requirements:** `rank_min: Lieutenant`
**Lives at stake:** None (civilizational — already dead)
**Threat level:** Low

**MISSION: Kataan**

> This is the game's quiet mission — no combat, no urgency. It rewards patience.

**Project 1 (Primary): The Probe**
- Task 1 — Sensor analysis of the probe before contact
  - Stat: Science | Difficulty: Standard
- Task 2 — After recovery, decode the experience data
  - Stat: Science/Medicine | Difficulty: Standard
- Task 3 — Reconstruct the planet's history from the data
  - Stat: Science/Diplomacy | Difficulty: Standard
  - Success: A full cultural record is preserved and transmitted to the Federation.

**Project 2 (Secondary): The Player's Recovery**
- Task 1 — Medical evaluation after the experience
  - Stat: Medicine | Difficulty: Easy
- Task 2 — Personal log entry — process the experience
  - Stat: Command/Diplomacy | Difficulty: Easy
  - Success: Loyalty gain among crew who read the log (+5 to all named crew)

**SCORING NOTES:**
- No lives at stake — scoring is via discovery multiplier (voyages completed, Science XP gain)
- This event is designed to be a narrative breathing room after high-intensity missions
- The probe is retained as a relic in the crew log — a permanent notation

---

### EVENT: The Time Loop
*Inspired by: TNG "Cause and Effect", VOY "Déjà Vu" type*

**Summary:** The ship enters a region where the same events are repeating. Crew members begin to have premonitions. The loop must be identified, the cause found, and the exit plotted — within the loop.

**State requirements:** `rank_min: Lieutenant`, `voyage_type: Exploration or Scientific Survey`
**Lives at stake:** Crew (full complement — if the loop locks permanently, all are lost)
**Threat level:** High

**MISSION: The Loop**

**Project 1 (Primary): Recognition**
- Task 1 — Identify the anomalous sensor readings as evidence of repetition
  - Stat: Science | Difficulty: Hard (the loop makes evidence unreliable)
  - Success: Player correctly identifies the loop on first cycle.
  - Failure: Player must retry — loop continues; crew fatigue increases.
- Task 2 — Establish a consistent message across loop cycles
  - Stat: Engineering/Science | Difficulty: Hard
- Task 3 — Trace the loop's origin point
  - Stat: Science | Difficulty: Critical

**Project 2 (Primary, sequential): The Exit**
- Task 1 — Calculate the precise navigation adjustment required
  - Stat: Science/Engineering | Difficulty: Hard
- Task 2 — Execute the maneuver at exactly the right moment in the loop
  - Stat: Tactical/Engineering | Difficulty: Critical
  - Success: Exit. Failure: Another cycle begins.
- Task 3 — Debrief the crew and document the phenomenon
  - Stat: Command | Difficulty: Easy

---

### EVENT: The Genesis Effect
*Inspired by: Star Trek II/III science dilemma*

**Summary:** A Federation science team has created a device of extraordinary terraforming power. The test was unauthorized. The device worked perfectly — on a planet that wasn't uninhabited. An alien civilization has filed a protest. The science team is on board. The player is caught in the middle.

**State requirements:** `rank_min: Commander`, `voyage_type: Scientific Survey or Diplomacy`
**Lives at stake:** Planetary (the civilization affected); political fallout = Civilizational
**Threat level:** High

**MISSION: Protocol Breach**

**Project 1 (Primary): The Diplomatic Crisis**
- Task 1 — Receive the alien delegation's formal grievance
  - Stat: Diplomacy | Difficulty: Standard
- Task 2 — Assess the legitimacy of the science team's claim of uninhabited status
  - Stat: Science/Diplomacy | Difficulty: Hard
- Task 3 — Negotiate a path that acknowledges wrong without surrendering the device
  - Stat: Diplomacy | Difficulty: Critical
  - Ethical weight: Yes

**Project 2 (Secondary): Internal Affairs**
- Task 1 — Formal inquiry into how the unauthorized test was approved
  - Stat: Command | Difficulty: Standard
- Task 2 — Protect junior science team members from career destruction
  - Stat: Command/Diplomacy | Difficulty: Hard
  - Ethical weight: Yes (someone needs to take the fall)
- Task 3 — File the incident report in a way that is honest but not politically catastrophic
  - Stat: Command | Difficulty: Hard

---

## CATEGORY 6: CREW AND INTERNAL CONFLICT

---

### EVENT: Mutiny
*Inspired by: Multiple episodes — any strong ethical violation by command*

**Summary:** A faction of crew members has decided the captain's recent orders constituted a war crime (or ethical failure). They are organizing. The player has two sessions to address it before active mutiny.

**State requirements:** `rank_min: Commander`, requires 2+ career flags in record
**Lives at stake:** None directly; Crew (if ship is disabled during conflict)
**Threat level:** High

**MISSION: Below Decks**

**Project 1 (Primary): Identify the Faction**
- Task 1 — Intelligence from trusted crew members
  - Stat: Command/Diplomacy | Difficulty: Standard
  - Success: Player knows who is involved.
- Task 2 — Assess whether the grievances are legitimate
  - Stat: Command/Medicine | Difficulty: Hard
  - Ethical weight: Yes — this task requires honest self-assessment

**Project 2 (Primary): Resolution**
Choose before project executes: *address legitimately* or *suppress forcefully.*

**Path A — Legitimate Resolution:**
- Task 1 — Open forum: publicly acknowledge the concern
  - Stat: Command/Diplomacy | Difficulty: Hard
  - Success: Faction's leadership is satisfied. Partial: Tension reduced but not resolved.
- Task 2 — Accept accountability for the flagged decision
  - Stat: Command | Difficulty: Critical
  - Ethical weight: Yes
  - Success: Career flag partially cleared; loyalty gain massive (+15–25 all crew)

**Path B — Suppression:**
- Task 1 — Identify ringleaders and reassign them
  - Stat: Command/Tactical | Difficulty: Standard
- Task 2 — Document the incident for Starfleet review
  - Stat: Command | Difficulty: Hard
  - Success: Mutiny suppressed. Additional career flag added. Loyalty −10 all crew.

**SCORING NOTES:**
- Path A success: career flag removed, large loyalty gains — the better long-term outcome
- Path B success: crisis resolved, but loyalty loss may worsen the encounter survival ceiling
- This event is the game's enforcement mechanism for accumulated ethical failures

---

### EVENT: The Away Team Loss
*Inspired by: Too many episodes to count*

**Summary:** An away team mission went wrong. Three crew members are confirmed dead. Two others are missing. The player has one window to mount a rescue before the situation becomes untenable.

**State requirements:** Any rank, follows a failed mission or project
**Lives at stake:** Crew (2 specific named NPCs)
**Threat level:** High

**MISSION: Bring Them Home**

**Project 1 (Primary): The Search**
- Task 1 — Reconstruct what happened to the team from available data
  - Stat: Science/Tactical | Difficulty: Standard
- Task 2 — Locate the missing crew using biosensor sweeps through interference
  - Stat: Science/Engineering | Difficulty: Hard
- Task 3 — Plot an approach that doesn't make the situation worse
  - Stat: Tactical/Command | Difficulty: Standard

**Project 2 (Primary): Extraction**
- Task 1 — Breach the holding location
  - Stat: Tactical | Difficulty: Hard
  - Lives at stake: Crew (the rescue team)
- Task 2 — Stabilize the injured crew members for transport
  - Stat: Medicine | Difficulty: Hard
  - Lives at stake: the two missing NPCs
- Task 3 — Extract cleanly
  - Stat: Command/Tactical | Difficulty: Standard

**Project 3 (Secondary): The Memorial**
> For the three confirmed dead.
- Task 1 — Notify next of kin
  - Stat: Command | Difficulty: Standard
  - Ethical weight: Yes
- Task 2 — Write the service records
  - Stat: Command | Difficulty: Easy
  - Success: Loyalty gain for all crew who knew the deceased (+5–10)

**SCORING NOTES:**
- Lives lost: the two missing NPCs if rescue fails
- Lives saved: not counted (crew rescue, not mass-casualty); score effect via crew survival pool
- NPCs who die here are permanently removed from roster

---

## CATEGORY 7: POLITICAL AND STRATEGIC

---

### EVENT: The Defector
*Inspired by: TNG "The Defector"*

**Summary:** A high-ranking officer from a hostile power has crossed the border in a stolen vessel and is requesting asylum. He claims to have intelligence about an imminent attack. The intelligence may be genuine, fabricated, or a trap. The player must decide how much to trust him — and act on that decision.

**State requirements:** `rank_min: Lieutenant Commander`, `voyage_type: Border Patrol or Diplomacy`
**Lives at stake:** Regional (the base that may be attacked) → potentially Civilizational
**Threat level:** High

**MISSION: The Man Who Crossed the Line**

**Project 1 (Primary): Assess the Intelligence**
- Task 1 — Interview the defector
  - Stat: Diplomacy/Command | Difficulty: Standard
  - Success: Player gets consistent, specific claims.
- Task 2 — Verify against existing intelligence
  - Stat: Science/Tactical | Difficulty: Hard
  - Success: Partial corroboration — neither confirmed nor denied.
- Task 3 — Assess the defector's psychological state
  - Stat: Medicine/Diplomacy | Difficulty: Hard
  - Success: Player accurately reads whether the defector believes what they're saying.

**Project 2 (Primary): The Decision**
> Act on the intelligence or don't. Both have massive consequences.

**Path A — Act (mobilize a response to the claimed attack location):**
- Task 1 — Coordinate with Starfleet without revealing the source
  - Stat: Command/Diplomacy | Difficulty: Hard
- Task 2 — Arrive at the claimed location
  - Stat: Tactical | Difficulty: Standard
  - Success: Attack was real — lives saved. Failure: Nothing there — political disaster.

**Path B — Do not act (keep the defector, investigate further):**
- Task 1 — Protect the defector during the investigation window
  - Stat: Tactical | Difficulty: Hard (hostile agents will come for him)
- Task 2 — Extended verification
  - Stat: Science | Difficulty: Hard
  - Success: Truth established — can act with confidence.
  - Failure: Window closes; the attack happens without warning.

---

### EVENT: Chain of Command
*Inspired by: TNG "Chain of Command"*

**Summary:** The player has been captured during an intelligence mission. They are being interrogated. The interrogator wants them to say something specific — to betray a position or person. The player must resist, adapt, or find a way out.

**State requirements:** `rank_min: Commander`, follows an intelligence/espionage mission
**Lives at stake:** Crew (the crew is waiting for the player; they may act rashly)
**Threat level:** High

**MISSION: The Room**

> This mission runs differently — the player has no crew to assign. Every task is personal.

**Project 1 (Primary): Resist**
- Task 1 — First interrogation session — maintain composure
  - Stat: Command | Difficulty: Hard
- Task 2 — Second session — psychological assault
  - Stat: Command/Medicine | Difficulty: Critical
  - Failure: Player makes a partial concession — minor intelligence leaked.
- Task 3 — Find a way to communicate your position to your crew
  - Stat: Science/Engineering | Difficulty: Hard
  - Success: Crew knows you're alive and roughly where. Failure: They act on bad information.

**Project 2 (Secondary): Counter-Intelligence**
> While imprisoned, you learn something about your captor.
- Task 1 — Observe your environment and their procedures
  - Stat: Tactical/Science | Difficulty: Standard
- Task 2 — Exploit a vulnerability in their routine
  - Stat: Tactical/Engineering | Difficulty: Critical
  - Success: Either escape or obtain leverage that ends the interrogation.

**Project 3 (Primary): Rescue or Release**
> Your crew comes — or you escape.
- Task 1 — Coordinate the extraction
  - Stat: Command/Tactical | Difficulty: Hard
- Task 2 — Debrief: assess what was compromised
  - Stat: Command | Difficulty: Standard

---

## CATEGORY 8: EXPLORATION / DISCOVERY

---

### EVENT: The Dyson Object
*Inspired by: Various megastructure/discovery episodes*

**Summary:** Sensors detect an artificial structure of impossible scale. It has been abandoned for approximately 100,000 years. It still functions. Whatever it was designed to do, it is doing it — and the effect is measurable on nearby systems.

**State requirements:** `rank_min: Lieutenant`, `voyage_type: Exploration or Scientific Survey`
**Lives at stake:** None (discovery scenario)
**Threat level:** Low

**MISSION: The Old Work**

**Project 1 (Primary): Initial Survey**
- Task 1 — Safe approach to the structure
  - Stat: Helm/Engineering | Difficulty: Standard
- Task 2 — External sensor sweep
  - Stat: Science | Difficulty: Standard
  - Success: Basic composition, age, approximate function.
- Task 3 — Identify the safe entry point
  - Stat: Science/Engineering | Difficulty: Hard

**Project 2 (Primary): Interior Exploration**
- Task 1 — Map a section of the interior
  - Stat: Science | Difficulty: Standard
- Task 2 — Interface with the structure's systems
  - Stat: Engineering | Difficulty: Critical
  - Success: The player understands what the structure does. Major discovery bonus.
  - Failure: Systems respond to intrusion in unexpected ways.
- Task 3 — Document everything before the power signature changes
  - Stat: Science | Difficulty: Hard

**Project 3 (Secondary): The Function
> What is it doing to the nearby systems? Can it be stopped? Should it be?**
- Task 1 — Analyze the measurable effect
  - Stat: Science | Difficulty: Hard
- Task 2 — Assess the ethical question of interfering
  - Stat: Command/Diplomacy | Difficulty: Standard
  - Ethical weight: Yes (Prime Directive adjacent)
- Task 3 — File a complete discovery report with Starfleet
  - Stat: Science | Difficulty: Easy
  - Success: Discovery commendation issued.

---

### EVENT: The Living Planet
*Inspired by: TOS "The Devil in the Dark", VOY episodes*

**Summary:** Mining operations have been disrupted on a colony world. Equipment is being destroyed and colonists are dying — apparently by a creature that lives within the rock itself. The creature may be intelligent.

**State requirements:** Any rank
**Lives at stake:** Local (mining colony, ~300)
**Threat level:** Medium

**MISSION: The Horta**

**Project 1 (Primary): Investigation**
- Task 1 — Examine the attack sites
  - Stat: Science | Difficulty: Standard
  - Success: Pattern identified — the creature is protecting something.
- Task 2 — Locate the creature without triggering another attack
  - Stat: Tactical/Science | Difficulty: Hard
- Task 3 — Assess whether the creature is sapient
  - Stat: Science/Medicine | Difficulty: Hard
  - Success: Yes, it is. This changes everything. Career flag risk if player proceeds with elimination.

**Project 2 (Primary): Resolution**
Choose: eliminate the creature or attempt contact.

**Path A — Contact (if sapience confirmed):**
- Task 1 — Establish communication
  - Stat: Diplomacy/Science | Difficulty: Critical
- Task 2 — Understand what it is protecting
  - Stat: Diplomacy | Difficulty: Standard
- Task 3 — Negotiate coexistence terms with colony management
  - Stat: Diplomacy/Command | Difficulty: Hard
  - Success: Creature protected; colony operations continue safely.

**Path B — Elimination (if sapience unconfirmed or player chooses):**
- Task 1 — Hunt
  - Stat: Tactical | Difficulty: Hard
  - Ethical weight: Yes (sapience undetermined)
  - Success: Creature killed. Note in career record. Crew loyalty drop.

---

## APPENDIX: Event Summary Table

| Event | Category | Min Rank | Lives at Stake | Threat | Ethical Weight |
|-------|----------|----------|----------------|--------|----------------|
| The Corbomite Gambit | Tactical | Ensign | Crew | High | No |
| Silent Dagger | Tactical | Lieutenant | Regional | High | Yes |
| The Arena | Tactical | Commander | Civilizational | Critical | Yes |
| First Light | First Contact | Lt. Commander | Civilizational | Medium | No |
| The Silence of Tama | First Contact | Lieutenant | Crew | Medium | Yes |
| The Colony at Veridian | Rescue | Any | Civilizational | High | Yes (core) |
| Year of Hell | Rescue | Captain | Civilizational | Critical | Yes |
| The Plague Ship | Rescue | Lieutenant | Regional+Planetary | High | No |
| The Measure of a Man | Ethical | Commander | None | Medium | Yes (core) |
| In the Pale Moonlight | Ethical | Captain | Civilizational | Medium | Yes (extreme) |
| The Needs of the Many | Ethical | Any | Local vs. Crew | High | Yes (core) |
| The Inner Light | Scientific | Lieutenant | None | Low | No |
| The Time Loop | Scientific | Lieutenant | Crew | High | No |
| The Genesis Effect | Scientific | Commander | Planetary | High | Yes |
| Mutiny | Internal | Commander | Crew | High | Yes |
| The Away Team Loss | Internal | Any | Crew | High | Yes |
| The Defector | Political | Lt. Commander | Regional+ | High | Yes |
| Chain of Command | Political | Commander | Crew | High | Yes |
| The Dyson Object | Exploration | Lieutenant | None | Low | No |
| The Living Planet | Exploration | Any | Local | Medium | Yes |

---

## APPENDIX: State Flags Introduced by Events

Some events should become available or inaccessible based on prior choices. These flags should be tracked in `game_state.event_log` and checked during event generation.

| Flag | Set By | Used By |
|------|--------|---------|
| `first_contact_completed` | First Light | Subsequent diplomatic missions unlock |
| `veridian_disobeyed` | Colony at Veridian (disobey path) | Starfleet relationship events |
| `veridian_obeyed` | Colony at Veridian (obey path) | Crew loyalty events |
| `mutiny_suppressed` | Mutiny (Path B) | Further loyalty degradation |
| `mutiny_resolved` | Mutiny (Path A) | Loyalty recovery arc |
| `corbomite_succeeded` | Corbomite Gambit | Unlocks Balok follow-on |
| `pale_moonlight_used` | In the Pale Moonlight | Starfleet audit event |
| `chain_captured` | Chain of Command | Recovery arc, trauma event |
| `genius_discovery` | Dyson Object or similar | Discovery commendation |
| `npc_dead:[name]` | Away Team Loss failure | NPC removed from roster permanently |

---

## APPENDIX: Lives at Stake Scale Reference

| Scale Name | Range | Example |
|------------|-------|---------|
| Crew | 1–50 | Ship personnel |
| Local | 51–10,000 | Outpost, small colony, vessel crew |
| Regional | 10,001–1,000,000 | Major colony, station network |
| Planetary | 1,000,001–10,000,000 | Single inhabited world |
| Civilizational | 10,000,001+ | Multiple worlds, entire species |

Lives saved score multiplier is the same regardless of scale (×150 per life). The number of lives at stake is the game's primary way of distinguishing the weight of different scenarios.
