# Final Frontier — Scenario Design

**Last Updated:** 2026-05
**Status:** Skeleton — scenario catalog to be built; template and category definitions here

---

## Scenario Structure

Every scenario follows the same template regardless of type, rank level, or stakes.

```
SCENARIO TEMPLATE

[HEADER]
  Location:      Current sector / vessel / posting
  Stardate:      In-game date
  Alert status:  Normal / Yellow / Red

[SITUATION]
  2–5 sentences of scene-setting.
  State the observable facts. Do NOT state the interpretation.
  The player must draw their own conclusions from ambiguous information.

[AVAILABLE INFORMATION]
  What sensors show / what crew has reported / what is confirmed.
  Optional: what Science pre-roll reveals (if player has Analytical Mind trait or ran a
  pre-scenario Research slot)

[OPTIONS]
  3–5 choices. Each option:
    - Label (one line, plain language: "Attempt to hail them.")
    - Resolving station (which station makes the primary roll)
    - Visible cost/commitment (what resource this uses)
    - NOT the success probability (that is displayed separately before confirmation)

[RESOLUTION]
  After player selects option:
    - Show success probability
    - Player confirms
    - Roll resolves
    - Outcome prose (2–3 sentences)
    - Immediate consequences (stat changes, crew changes, career flag triggers)
    - Any follow-on scenario triggered

[CONSEQUENCE TAIL]
  Some scenarios have delayed consequences that don't appear until 1–3 scenarios later.
  The player is not told when a consequence tail is active.
```

---

## Scenario Categories

### Category 1: First Contact
*Initiating and managing contact with a previously unknown or uncontacted species.*

**Primary station:** Communications (opening contact), Science (analysis)
**Secondary stations:** Tactical (if situation deteriorates), Diplomacy as stat
**Key decisions:** Do you hail or observe? Do you reveal your capabilities? Do you
  accept their framing of the encounter or assert your own? Do you stay or withdraw?

**Design note:** First contact scenarios should have at least one option that *most*
players will not consider on first playthrough. The obvious diplomatic approach is
not always correct. Sometimes withdrawal is the right call. Sometimes the species
reads patience as weakness.

**Rank availability:** Rare at Ensign/Lt. JG; becomes more common at Commander/Captain.

---

### Category 2: Ship-to-Ship Encounter
*Hostile, unknown, or potentially hostile vessel in sensor range.*

**Primary station:** Tactical, Helm
**Secondary stations:** Science (identification), Communications (hail attempt)
**Key decisions:** Engage or evade? Hail before weapons? How much damage to accept to
  protect a third party? Follow a withdrawing vessel?

**Design note:** Combat scenarios should rarely be about "win the fight." The interesting
  decision is usually the context — why are they hostile, what do they want, is there a
  path to resolution that doesn't require destroying them, what is the cost of winning
  by force vs. winning by other means.

---

### Category 3: Technical Crisis
*Ship system failure, damage, or hostile environment threatening the vessel.*

**Primary station:** Engineering
**Secondary stations:** Science (diagnosis), Medical (crew effects)
**Key decisions:** Repair now or defer? Which system to save if both can't be saved?
  Is the source internal (fixable) or external (ongoing)?

**Design note:** Technical crises are the Engineering player's moment. The challenge is
  ensuring these scenarios don't feel routine for Engineering-focused characters while
  still being consequential for others. Every technical crisis should also be a human
  crisis — someone is at risk; the ship is a living thing.

---

### Category 4: Away Mission
*Player character or assigned crew sent to a surface, station, or other vessel.*

**Primary station:** Variable (depends on mission objective)
**Secondary stations:** Medical (injury), Science (environmental), Tactical (threat)
**Key decisions:** Who goes? What do you take? When do you abort? What do you bring back?

**Design note:** Away missions are the highest personal risk scenarios — the player
  character can be injured, and crew members assigned to away teams can be killed.
  The decision of *who to send* is sometimes the hardest part. Sending your best officer
  into a dangerous situation may get the job done; it may also cost you your best officer.

---

### Category 5: Crew Crisis
*Internal crew situation: morale collapse, interpersonal conflict, illness, insubordination.*

**Primary station:** Command (player's own stat), Medical (health-related variants)
**Secondary stations:** Communications (addressing the crew), Diplomacy as stat
**Key decisions:** Address publicly or privately? Discipline or understand? What is
  the root cause vs. the visible symptom?

**Design note:** Crew crisis scenarios are the ones where emotional intelligence matters
  more than tactical skill. The player who has invested in crew relationships has
  information and options that the player who ignored crew time does not. The officer
  who doesn't know their crew cannot read this scenario correctly.

---

### Category 6: Ethical Dilemma
*A scenario with no clean answer — competing values, incomplete information, and real cost
  regardless of choice.*

**Primary station:** None — Command (the player's judgment, not a station roll)
**Secondary stations:** Any, depending on the specific dilemma
**Key decisions:** These are the scenarios the game is really about.

**Examples:**
- Prime Directive application: a pre-warp civilization is dying; you can save them but
  at the cost of their natural development
- Orders vs. conscience: Starfleet orders you to withdraw; your sensor data says
  withdrawal means a colony dies
- Triage under scarcity: you cannot save everyone; who do you save first?
- Loyalty vs. duty: a crew member has violated regulations; enforcing the rule costs
  you their trust; not enforcing it costs you something else

**Design note:** Ethical dilemmas should NOT have a "correct" answer in the game's
  mechanical sense. The outcome should be uncertain regardless of choice. What changes
  is the *type* of cost and benefit. Some costs are fiscal (resources, ship condition);
  some are relational (crew loyalty, NPC opinions); some are record-based (career flags);
  some are personal (player character traits, psychological state if modeled). The player
  chooses what they're willing to pay.

---

### Category 7: Scientific Discovery
*An anomaly, phenomenon, or discovery requiring investigation.*

**Primary station:** Science
**Secondary stations:** Engineering (safe approach), Medical (biological phenomena)
**Key decisions:** How deep do you investigate? How much mission time do you spend?
  Do you share what you've found with Starfleet immediately?

**Design note:** Discovery scenarios are lower-stakes but high-payoff in terms of legacy
  score. They reward Science-focused characters without punishing others. The tension is
  usually time vs. knowledge — you can learn more, but it costs you something to stay.

---

### Category 8: Diplomatic Scenario
*Negotiation, treaty, dispute resolution, or standing between two parties in conflict.*

**Primary station:** Communications, Command
**Secondary stations:** Science (background knowledge), Tactical (posture assessment)
**Key decisions:** Whose side are you on, if any? What can you offer? What are you
  not willing to give? How do you handle a breakdown?

---

## Scenario Writing Guide

*[For future use when writing scenario content]*

**The five rules of scenario writing:**

1. **No option should be obviously right.** If one choice is clearly dominant, the
   scenario isn't designed — it's a quiz with an answer key. Every option should have
   a genuine argument for it.

2. **Every option should have a visible cost.** Not every cost is a stat hit.
   "This costs crew morale." "This costs two hours." "This makes the alien captain
   suspicious." The player should be able to see what they're trading.

3. **The situation text should be specific, not vague.** "A ship approaches" is bad.
   "A Cardassian patrol vessel is approaching on an intercept course, running silent,
   with weapons offline — but shields active" is good. Specific information creates
   genuine interpretive challenge; vague information just creates randomness.

4. **The partial success outcome is the most important to write.** Full success writes
   itself. Full failure is dramatic. The partial — "you succeeded, but it cost you
   something" — is the outcome that defines the game's texture. Write the partial first.

5. **Leave something unexplained.** The best scenarios end with a loose thread. What
   was that vessel actually doing? Was the alien ambassador really telling the truth?
   What happened to the colonists after you left? The player fills this in. The game
   is more alive for it.

---

## Scenario Catalog

*[To be populated — placeholder entries below as structural examples]*

| ID | Title | Category | Primary Station | Rank Range | Status |
|----|-------|----------|----------------|------------|--------|
| SC-001 | The Listening Post | Scientific Discovery | Science | Ensign–Lt. | Draft |
| SC-002 | Intercept Course | Ship-to-Ship | Tactical/Helm | Lt. JG–Commander | Draft |
| SC-003 | The Fever | Crew Crisis / Medical | Medical | Lt.–Commander | Draft |
| SC-004 | Standing Orders | Ethical Dilemma | Command | Commander–Captain | Draft |
| SC-005 | First Light | First Contact | Communications | Commander–Captain | Draft |
| SC-006 | Three Hundred Seconds | Technical Crisis | Engineering | All ranks | Draft |

*[Full scenario catalog to be developed; target 80–120 distinct scenarios for full game]*
