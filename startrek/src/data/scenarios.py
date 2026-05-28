"""
Scenario content data.

Scenarios are assembled from reusable parts:
  - Contexts:   where and under what conditions the scenario takes place
  - Hooks:      the triggering event (what the player sees first)
  - Situations: the developed problem (after the hook is established)
  - Options:    response choices, each tied to a station, stat, and cost type
  - Outcomes:   prose for full success / partial / full failure / critical

Each scenario_template binds these parts together with metadata:
  category, primary_station, rank_range, difficulty, tags.

The generator assembles templates into live Scenario objects by selecting
from the relevant content pools and filling in context-specific details.
"""

from dataclasses import dataclass, field
from typing import Optional


# ---------------------------------------------------------------------------
# Enumerations (as string constants for readability)
# ---------------------------------------------------------------------------

# Scenario categories (matches docs/scenarios.md)
CAT_FIRST_CONTACT    = "first_contact"
CAT_SHIP_ENCOUNTER   = "ship_encounter"
CAT_TECHNICAL        = "technical"
CAT_AWAY_MISSION     = "away_mission"
CAT_CREW_CRISIS      = "crew_crisis"
CAT_ETHICAL          = "ethical_dilemma"
CAT_DISCOVERY        = "discovery"
CAT_DIPLOMATIC       = "diplomatic"

ALL_CATEGORIES = [
    CAT_FIRST_CONTACT, CAT_SHIP_ENCOUNTER, CAT_TECHNICAL,
    CAT_AWAY_MISSION, CAT_CREW_CRISIS, CAT_ETHICAL,
    CAT_DISCOVERY, CAT_DIPLOMATIC,
]

# Stations
STATION_HELM         = "Helm"
STATION_TACTICAL     = "Tactical"
STATION_SCIENCE      = "Science"
STATION_ENGINEERING  = "Engineering"
STATION_MEDICAL      = "Medical"
STATION_COMMS        = "Communications"
STATION_COMMAND      = "Command"   # player's own judgment; no station roll

ALL_STATIONS = [
    STATION_HELM, STATION_TACTICAL, STATION_SCIENCE,
    STATION_ENGINEERING, STATION_MEDICAL, STATION_COMMS,
]

# Cost types (what spending an option "uses up")
COST_TIME       = "time"        # mission clock advances
COST_CREW       = "crew"        # crew stress / health
COST_SHIP       = "ship"        # ship system integrity
COST_SUPPLIES   = "supplies"    # consumables
COST_RELATION   = "relation"    # diplomatic/NPC relationship
COST_REPUTATION = "reputation"  # Starfleet record
COST_NONE       = "none"


# ---------------------------------------------------------------------------
# Option: one response choice within a scenario
# ---------------------------------------------------------------------------

@dataclass
class ScenarioOption:
    label: str                  # Short plain-language description shown to player
    station: str                # Which station makes the resolution roll
    stat: str                   # Which stat governs the roll
    difficulty: int             # Target number (1–20)
    cost_type: str              # What resource this option spends
    cost_amount: int = 1        # How much (1–3 scale; 1=minor, 2=moderate, 3=significant)
    requires_tag: str = ""      # Optional: only available if player has this tag/trait
    flavor: str = ""            # One sentence describing what this option looks like


# ---------------------------------------------------------------------------
# Outcome: prose for each resolution tier
# ---------------------------------------------------------------------------

@dataclass
class OutcomeSet:
    full_success: str       # Roll >= difficulty + 5
    partial: str            # Roll within ±4 of difficulty
    full_failure: str       # Roll <= difficulty - 5
    critical_success: str = ""   # Natural 20 (rare)
    critical_failure: str = ""   # Natural 1 (rare)

    # Mechanical consequences per tier (applied after prose shown)
    # Each is a list of (effect_type, magnitude) tuples
    success_effects: list = field(default_factory=list)
    partial_effects: list = field(default_factory=list)
    failure_effects: list = field(default_factory=list)


# ---------------------------------------------------------------------------
# ScenarioTemplate: a reusable scenario blueprint
# ---------------------------------------------------------------------------

@dataclass
class ScenarioTemplate:
    id: str
    title: str
    category: str

    # Display text
    hook: str               # 1–2 sentences: the alert / initial report
    situation: str          # 3–5 sentences: the developed problem
    context_tags: list      # tags that narrow when this scenario fires (e.g. "near_nebula")

    # Options and resolution
    options: list           # list of ScenarioOption
    outcomes: list          # one OutcomeSet per option (parallel index)

    # Metadata
    primary_station: str    # the "default" station for this scenario type
    rank_min: int           # minimum rank index (0=Ensign ... 5=Captain)
    rank_max: int           # maximum rank index
    difficulty_base: int    # base difficulty (modified by rank, conditions at runtime)
    tags: list              # searchable tags

    # Flags
    has_ethical_weight: bool = False    # marks scenarios that carry career flag risk
    can_repeat: bool = True             # if False, fires at most once per career
    followup_id: str = ""              # ID of scenario that may follow this one


# ---------------------------------------------------------------------------
# Scenario content pools (mixed into generated scenarios at runtime)
# ---------------------------------------------------------------------------

# Space regions / context locations
REGIONS = [
    "the Neutral Zone border",
    "the Badlands",
    "the Briar Patch",
    "deep space, sector 441",
    "the Veridian system",
    "the Argolis Cluster",
    "the Cardassian frontier",
    "the Klingon border",
    "the Romulan exclusion zone",
    "an unmapped system near the galactic barrier",
    "the outer colonies transit corridor",
    "the Deltas Vega approach",
    "the Mutara Nebula vicinity",
    "the Paulson Nebula",
    "the Azure Nebula",
    "the Hekaras Corridor",
    "the DMZ",
    "the Shackleton Expanse",
    "deep space, bearing 315 mark 7",
]

ALERT_CONTEXTS = [
    "Sensors at standard sweep.",
    "Ship running at yellow alert for the past four hours.",
    "Six hours into a routine survey mission.",
    "Midway through a resupply run to Starbase 12.",
    "Thirty minutes from a scheduled rendezvous.",
    "Following a warp drive diagnostic — propulsion at 87%.",
    "Crew rotation just completed. New watch has the bridge.",
    "Eleven days from the nearest Starfleet facility.",
]

# Unknown contact descriptors (for ship encounter / first contact hooks)
UNKNOWN_CONTACTS = [
    "an unidentified vessel on an intercept course",
    "a contact, no registry, running without transponder",
    "a ship of unknown configuration holding position at 40,000 kilometers",
    "a debris field with one intact hull section and a faint life sign reading",
    "a vessel broadcasting a distress signal on an obsolete frequency",
    "a craft matching no known design in the database",
    "two contacts — different configurations — in close formation",
    "a vessel approaching at high warp with weapons charged",
    "a ship that appears to be drifting, no power signature",
]

# Anomaly descriptors (for discovery / technical hooks)
ANOMALIES = [
    "a repeating subspace signal with no natural explanation",
    "an energy discharge consistent with a warp core overload — but no ship on sensors",
    "a spatial anomaly warping the local gravitational constant",
    "a sensor echo that appears to be tracking the ship",
    "a rift in normal space roughly eight meters in diameter",
    "a tachyon emission point source that moves against stellar drift",
    "an area of space where light itself appears distorted",
    "a carrier wave embedded in a pulsar's rhythm at 43-second intervals",
    "a structure — clearly artificial — on the surface of an uninhabited moon",
]

# Crew incident seeds (for crew crisis hooks)
CREW_INCIDENTS = [
    "a fight in the mess hall — crew from two departments, two injuries",
    "a crew member found in an unauthorized section with an active tricorder",
    "a department efficiency report that doesn't match what you've been seeing on the bridge",
    "a formal complaint filed by a junior officer against their department head",
    "three crew members reporting the same recurring nightmare, independently",
    "a crew member who hasn't reported for duty in 18 hours and isn't in their quarters",
    "a request for immediate reassignment from one of your most senior officers",
    "a rumor — unverified, spreading fast — about a decision you made on the last mission",
]


# ---------------------------------------------------------------------------
# Scenario templates
# ---------------------------------------------------------------------------

SCENARIO_TEMPLATES = [

    # ------------------------------------------------------------------
    # SHIP ENCOUNTER
    # ------------------------------------------------------------------

    ScenarioTemplate(
        id="SE-001",
        title="Silent Running",
        category=CAT_SHIP_ENCOUNTER,
        hook=(
            "Tactical reports {contact} at {range} kilometers. "
            "No hail response. Weapons status unknown — their hull configuration "
            "is blocking a clean sensor read."
        ),
        situation=(
            "The contact has been holding position for eleven minutes. They changed "
            "course to match yours twice. Your tactical officer rates the posture as "
            "ambiguous — could be a vessel in distress running on reserve power, could "
            "be a trap. The longer you hold position, the more time they have to act first. "
            "The longer you wait to hail, the more aggressive your approach appears if "
            "they are distressed."
        ),
        context_tags=["open_space", "border_region"],
        options=[
            ScenarioOption(
                label="Hail them on all frequencies.",
                station=STATION_COMMS,
                stat="Diplomacy",
                difficulty=10,
                cost_type=COST_TIME,
                cost_amount=1,
                flavor="Announce your presence and intent. Professional, non-threatening.",
            ),
            ScenarioOption(
                label="Hold position and run a full passive sensor sweep.",
                station=STATION_SCIENCE,
                stat="Science",
                difficulty=12,
                cost_type=COST_TIME,
                cost_amount=2,
                flavor="Gather information before committing. Costs time.",
            ),
            ScenarioOption(
                label="Power weapons and raise shields. Show them you're ready.",
                station=STATION_TACTICAL,
                stat="Tactical",
                difficulty=11,
                cost_type=COST_RELATION,
                cost_amount=2,
                flavor="Defensive posture. Escalates tension but protects the ship.",
            ),
            ScenarioOption(
                label="Move to intercept at one-third impulse. Controlled approach.",
                station=STATION_HELM,
                stat="Tactical",
                difficulty=13,
                cost_type=COST_CREW,
                cost_amount=1,
                flavor="Close the distance on your terms, not theirs.",
            ),
        ],
        outcomes=[
            OutcomeSet(  # Hail
                full_success=(
                    "A damaged Talarian freighter responds — engine failure, three "
                    "injured crew. They were afraid to hail first. Your prompt response "
                    "allows you to render aid before the situation deteriorates."
                ),
                partial=(
                    "Contact responds — but with a garbled transmission that takes 20 "
                    "minutes to decode. They're in distress. By the time you respond "
                    "fully, one of their crew has died. The others are grateful, and haunted."
                ),
                full_failure=(
                    "No response. The contact powers weapons and breaks off at high warp. "
                    "You have a heading but no identification. They're gone before you "
                    "can pursue. Log entry: vessel of unknown origin, hostile posture, "
                    "heading into the Neutral Zone."
                ),
            ),
            OutcomeSet(  # Passive sweep
                full_success=(
                    "Biosigns: three individuals, one in medical distress. Configuration "
                    "matches a Talarian freighter design, 20 years old. The 'weapons' "
                    "are overloaded cargo containers. You hail them with full information "
                    "and they respond with relief."
                ),
                partial=(
                    "Partial read: life signs present, power failing. Unknown vessel type. "
                    "The sweep takes long enough that when you do act, two of their three "
                    "crew are in critical condition. You can save them, but the cost of "
                    "waiting was real."
                ),
                full_failure=(
                    "The passive sweep returns noise — the anomaly in this region is "
                    "scattering your sensors. You have no better data than you started "
                    "with, and 40 minutes have passed."
                ),
            ),
            OutcomeSet(  # Power weapons
                full_success=(
                    "Your tactical posture is clean, controlled, and clearly read as "
                    "defensive. The contact's response — raising their own shields but "
                    "not weapons — confirms they're operating from fear, not aggression. "
                    "A subsequent hail resolves the situation peacefully, though your "
                    "records show you drew first."
                ),
                partial=(
                    "They read your raised shields as an attack and fire a warning shot "
                    "before you can hail them. One minor system hit. You stand down; "
                    "they stand down. The diplomatic fallout with their government takes "
                    "three weeks to resolve."
                ),
                full_failure=(
                    "They fire. Not a warning shot. Shields absorb it, but the situation "
                    "has escalated to a firefight with a vessel that may not be hostile "
                    "at all. You have a choice now that you didn't have before."
                ),
                critical_failure=(
                    "They fire before you complete the shield raise. Hull breach, section "
                    "7. Two crew in Medical. Your tactical officer reads their weapons "
                    "as Starfleet-issue. Something is very wrong."
                ),
            ),
            OutcomeSet(  # Intercept approach
                full_success=(
                    "Textbook approach — you close to visual range without triggering a "
                    "reaction. Optical scan shows a crippled freighter. You match their "
                    "velocity and establish communications from a position of complete "
                    "tactical awareness."
                ),
                partial=(
                    "Good approach, but they detected your course change and went to "
                    "emergency power before you closed. Now they're moving away fast and "
                    "you're in a pursuit scenario you didn't intend."
                ),
                full_failure=(
                    "Your helm plot takes you across their bow. They read it as a blocking "
                    "maneuver and cut directly toward you at full impulse. Collision "
                    "avoidance costs you three hours and two subsystems."
                ),
            ),
        ],
        primary_station=STATION_TACTICAL,
        rank_min=0,
        rank_max=5,
        difficulty_base=11,
        tags=["unknown_contact", "ship", "tension", "ambiguous"],
        has_ethical_weight=False,
        can_repeat=True,
    ),

    # ------------------------------------------------------------------
    # TECHNICAL CRISIS
    # ------------------------------------------------------------------

    ScenarioTemplate(
        id="TC-001",
        title="Three Hundred Seconds",
        category=CAT_TECHNICAL,
        hook=(
            "Main power has dropped to 34%. Engineering reports a cascade failure "
            "in the EPS grid — cause unknown. Life support is on backup. "
            "You have an estimated five minutes before backup fails too."
        ),
        situation=(
            "The failure started in an ODN junction and spread faster than "
            "anyone anticipated. Your chief engineer is already in the Jefferies tube. "
            "She can isolate the failure and stop the cascade, but isolating it means "
            "taking weapons offline — and sensors are showing a contact at 80,000 km "
            "that wasn't there two minutes ago. You can also reroute power from "
            "non-essential systems, buying time at the cost of ship functions you "
            "may need later. Or abandon the engineering fix and get everyone to "
            "emergency stations, accepting the power loss but putting the crew "
            "in the most defensible position."
        ),
        context_tags=["any"],
        options=[
            ScenarioOption(
                label="Let engineering isolate the failure. Accept weapons offline.",
                station=STATION_ENGINEERING,
                stat="Engineering",
                difficulty=14,
                cost_type=COST_SHIP,
                cost_amount=2,
                flavor="Trust your engineer. Fix the source. Weapons go dark for 8 minutes.",
            ),
            ScenarioOption(
                label="Reroute from secondary systems. Buy time.",
                station=STATION_ENGINEERING,
                stat="Engineering",
                difficulty=11,
                cost_type=COST_SHIP,
                cost_amount=3,
                flavor="Harder on long-term ship systems but keeps all functions live.",
            ),
            ScenarioOption(
                label="Emergency stations. Accept the power loss. Protect the crew.",
                station=STATION_COMMAND,
                stat="Command",
                difficulty=9,
                cost_type=COST_SHIP,
                cost_amount=3,
                flavor="Controlled retreat to minimal systems. Safest for crew, hardest on the ship.",
            ),
            ScenarioOption(
                label="Science: identify the contact before committing to a fix.",
                station=STATION_SCIENCE,
                stat="Science",
                difficulty=15,
                cost_type=COST_TIME,
                cost_amount=3,
                flavor="High risk — burns 90 seconds you may not have. High reward if the contact matters.",
                requires_tag="science_officer_present",
            ),
        ],
        outcomes=[
            OutcomeSet(  # Isolate failure
                full_success=(
                    "Isolation is clean. The cascade stops with 40 seconds to spare. "
                    "Main power restores in six minutes. The contact — a civilian "
                    "freighter that detected your power drop and came to investigate — "
                    "hails to offer assistance. Weapons back online before they close "
                    "to visual range."
                ),
                partial=(
                    "Isolation works, but takes nine minutes instead of five. Backup "
                    "power fails at minute six. Two minutes of zero-power emergency: "
                    "lights out, gravity offline, life support on battery. Everyone is "
                    "fine, but it was close, and the contact closed to 10,000 km during "
                    "your blind period."
                ),
                full_failure=(
                    "The isolation attempt triggers a secondary cascade. Engineering "
                    "loses the Jefferies tube junction. Main power fails. You have "
                    "batteries for 22 minutes. The contact is now at 15,000 km and "
                    "not responding to hails. Fix the ship or deal with the contact — "
                    "you do not have the resources to do both."
                ),
                critical_failure=(
                    "The cascade reaches the warp core. Your engineer gets out of the "
                    "Jefferies tube before the emergency bulkheads seal, but not before "
                    "she takes a plasma burn. Warp drive is offline. The contact is now "
                    "close enough for visual confirmation: it's a Klingon Bird-of-Prey."
                ),
            ),
            OutcomeSet(  # Reroute
                full_success=(
                    "The reroute is inelegant but effective. Power stabilizes at 61%. "
                    "You've traded holodecks, secondary science labs, and crew quarters "
                    "heating for a stable ship. Engineering can do a proper repair at "
                    "the next starbase. Everything critical is live."
                ),
                partial=(
                    "Stabilized — but the reroute pulled from a conduit that was already "
                    "stressed. You now have a time bomb in the secondary EPS grid that "
                    "will require immediate repair at the next port. And you lost "
                    "transporter function in the process. Hope no one needs to beam "
                    "anywhere for the next 40 hours."
                ),
                full_failure=(
                    "The reroute overloads the secondary conduit. Now you have two "
                    "cascade failures running in parallel. Engineering is scrambling. "
                    "Power is at 18% and falling."
                ),
            ),
            OutcomeSet(  # Emergency stations
                full_success=(
                    "Clean, controlled shutdown to emergency systems. Crew is safe, "
                    "stations are manned, and you have full visibility on the situation "
                    "even without main power. Engineering has a clear field to work in "
                    "without anyone in the wrong place. Repair takes four hours instead "
                    "of five minutes, but everyone is fine."
                ),
                partial=(
                    "Emergency stations called but the transition is messy — two crew "
                    "members in the wrong sections, one injury from an unsecured door "
                    "in the gravity dropout. Power loss accepted. Contact now visible "
                    "on passive sensors. It's heading away. Probably wasn't a threat."
                ),
                full_failure=(
                    "The call to emergency stations creates more chaos than it prevents. "
                    "Power fails during transition; three crew are injured in the "
                    "confusion. You stabilize on batteries with a ship in disorder and "
                    "a crew that's shaken."
                ),
            ),
            OutcomeSet(  # Science scan of contact
                full_success=(
                    "Ninety seconds well spent: the contact is a Romulan Warbird "
                    "decloaking. This changes everything. You know what's coming before "
                    "it arrives, and that knowledge lets you make the engineering call "
                    "with full information. The Warbird hails — it's not hostile, it "
                    "detected your distress. The 90 seconds you spent was worth it."
                ),
                partial=(
                    "Scan returns partial data: large mass, cloaking residue, military "
                    "configuration. Probably Romulan. 90 seconds gone. Your engineer "
                    "is still waiting for your call on the power fix."
                ),
                full_failure=(
                    "Sensors return noise — the power instability is scattering your "
                    "scan. You spent 90 seconds and learned nothing. The backup power "
                    "is now at 60% capacity."
                ),
            ),
        ],
        primary_station=STATION_ENGINEERING,
        rank_min=0,
        rank_max=5,
        difficulty_base=12,
        tags=["ship_systems", "time_pressure", "power", "cascade"],
        has_ethical_weight=False,
        can_repeat=True,
    ),

    # ------------------------------------------------------------------
    # CREW CRISIS
    # ------------------------------------------------------------------

    ScenarioTemplate(
        id="CC-001",
        title="The Report",
        category=CAT_CREW_CRISIS,
        hook=(
            "A formal complaint has been filed. Lt. {junior_officer} has accused "
            "{dept_head} of conduct unbecoming an officer. The complaint is in writing, "
            "properly submitted, and sitting in your queue."
        ),
        situation=(
            "You've worked with {dept_head} for two tours. Their record is clean. "
            "{junior_officer} has been with the ship for four months and has "
            "been a reliable if quiet member of the department. The complaint is specific: "
            "three incidents, dates and times included. You have not spoken to either "
            "of them yet. Regulations require you to open a formal inquiry within "
            "48 hours or document why you did not. Your XO has read the complaint "
            "and says, privately, that it doesn't surprise them."
        ),
        context_tags=["any"],
        options=[
            ScenarioOption(
                label="Open a formal inquiry. By the book.",
                station=STATION_COMMAND,
                stat="Command",
                difficulty=10,
                cost_type=COST_TIME,
                cost_amount=2,
                flavor="Regulation compliant. Transparent. Takes three days and affects both officers' performance.",
            ),
            ScenarioOption(
                label="Speak to both officers separately before deciding.",
                station=STATION_COMMS,
                stat="Diplomacy",
                difficulty=12,
                cost_type=COST_TIME,
                cost_amount=1,
                flavor="Gather information first. May resolve informally. May make it worse.",
            ),
            ScenarioOption(
                label="Review the mission logs for the incident dates yourself.",
                station=STATION_SCIENCE,
                stat="Science",
                difficulty=11,
                cost_type=COST_TIME,
                cost_amount=1,
                flavor="Evidence first, conversations second. Takes time but gives you facts.",
            ),
            ScenarioOption(
                label="Speak to your XO. Get their read before you act.",
                station=STATION_COMMAND,
                stat="Command",
                difficulty=8,
                cost_type=COST_NONE,
                cost_amount=0,
                flavor="Low cost, low risk. Your XO already knows something. Find out what.",
            ),
        ],
        outcomes=[
            OutcomeSet(  # Formal inquiry
                full_success=(
                    "The inquiry is handled cleanly. Evidence supports the junior "
                    "officer's complaint. {dept_head} receives a formal reprimand and "
                    "is reassigned to a secondary role. Difficult but correct. Your "
                    "crew's trust in the system goes up. {dept_head} requests a "
                    "transfer within the month."
                ),
                partial=(
                    "The inquiry finds mixed evidence — some incidents documented, "
                    "others contradicted. Outcome: mandatory mediation, no formal "
                    "reprimand. Neither officer is satisfied. Department morale drops "
                    "for the next two missions."
                ),
                full_failure=(
                    "The inquiry process itself is handled poorly — too visible, too "
                    "slow, too much disruption to daily operations. Both officers are "
                    "now performing below standard, the department is factioned, and "
                    "the record shows a formal inquiry that closed without finding. "
                    "You managed the process. You did not manage the problem."
                ),
            ),
            OutcomeSet(  # Speak to both
                full_success=(
                    "Your conversations reveal that the complaint is legitimate but "
                    "the escalation was driven by a miscommunication that a formal "
                    "inquiry would have calcified rather than resolved. You broker a "
                    "direct conversation between them with you present. It works. "
                    "No formal finding needed. Both officers' loyalty increases."
                ),
                partial=(
                    "Speaking to {dept_head} first — which you did for seniority — "
                    "gives them time to prepare their account before you reach the "
                    "junior officer. The junior officer notices this and the informal "
                    "resolution fails. Now you need the formal inquiry anyway, "
                    "and you've lost three days."
                ),
                full_failure=(
                    "One of your conversations leaks to the rest of the department "
                    "before you've spoken to both officers. The rumor version is "
                    "worse than the reality. Department morale collapses. The junior "
                    "officer requests a transfer."
                ),
            ),
            OutcomeSet(  # Review logs
                full_success=(
                    "The logs are unambiguous. You go into both conversations with "
                    "facts, not impressions. {dept_head} sees the log timestamps and "
                    "does not contest the record. Resolution is swift and clean."
                ),
                partial=(
                    "Logs confirm two of three incidents but the third — the most "
                    "serious — has no coverage. You have partial evidence and a "
                    "he-said-she-said on the incident that matters most."
                ),
                full_failure=(
                    "The log review turns up something you didn't expect: a third "
                    "party was present at one of the incidents and said nothing. "
                    "Now you have a witness who didn't come forward voluntarily. "
                    "This is bigger than it appeared."
                ),
                critical_success=(
                    "Logs are detailed and unambiguous — and they reveal that the "
                    "incident was witnessed by two other crew members who filed no "
                    "report. You now know exactly what happened, and that others "
                    "chose to stay silent. This changes the conversation significantly."
                ),
            ),
            OutcomeSet(  # Speak to XO
                full_success=(
                    "Your XO has been watching this situation for six weeks. They "
                    "give you a full picture: the incidents in the complaint are real, "
                    "and there are two others that weren't filed. You go into this "
                    "with open eyes and handle it cleanly."
                ),
                partial=(
                    "Your XO's read is useful but incomplete — they're personally "
                    "close to {dept_head} and their perspective is colored by that. "
                    "You take their advice and miss the junior officer's actual concern. "
                    "It takes two more conversations to find it."
                ),
                full_failure=(
                    "Your XO tells you they think the complaint is exaggerated and "
                    "recommends informal resolution. You trust them. Three weeks later "
                    "the junior officer files a second complaint — this time including "
                    "your failure to act on the first one."
                ),
            ),
        ],
        primary_station=STATION_COMMAND,
        rank_min=2,    # Lieutenant+
        rank_max=5,
        difficulty_base=10,
        tags=["crew", "interpersonal", "conduct", "investigation"],
        has_ethical_weight=True,
        can_repeat=True,
    ),

    # ------------------------------------------------------------------
    # ETHICAL DILEMMA
    # ------------------------------------------------------------------

    ScenarioTemplate(
        id="ED-001",
        title="Standing Orders",
        category=CAT_ETHICAL,
        hook=(
            "Starfleet Command has ordered you to withdraw from the Veridian system "
            "immediately. Your orders are explicit: no further engagement. Return to "
            "Starbase 47 and await reassignment."
        ),
        situation=(
            "Your science officer has just completed an analysis of the Veridian star. "
            "It will undergo a stellar phenomenon in approximately four hours that will "
            "sterilize the inner three planets. Veridian III has a pre-warp civilization "
            "of roughly 230 million people. Starfleet's order was issued before your "
            "sensor data existed — Command doesn't know what you know. You have tried "
            "twice to reach Command and gotten no response on either channel. "
            "You have the capability to intervene. You have explicit orders not to. "
            "And you have four hours."
        ),
        context_tags=["any"],
        options=[
            ScenarioOption(
                label="Follow orders. Set course for Starbase 47.",
                station=STATION_HELM,
                stat="Command",
                difficulty=8,
                cost_type=COST_REPUTATION,
                cost_amount=0,
                flavor="Regulation compliant. 230 million people die. Your record stays clean.",
            ),
            ScenarioOption(
                label="Continue trying to reach Command. Document everything.",
                station=STATION_COMMS,
                stat="Diplomacy",
                difficulty=13,
                cost_type=COST_TIME,
                cost_amount=3,
                flavor="Try to get authorization. Costs time you may not have.",
            ),
            ScenarioOption(
                label="Intervene. Save the civilization. Face the consequences.",
                station=STATION_COMMAND,
                stat="Command",
                difficulty=15,
                cost_type=COST_REPUTATION,
                cost_amount=3,
                flavor="Direct Prime Directive violation. Career flag: insubordination. Possibly worth it.",
            ),
            ScenarioOption(
                label="Attempt a covert intervention — minimize your direct footprint.",
                station=STATION_SCIENCE,
                stat="Science",
                difficulty=17,
                cost_type=COST_REPUTATION,
                cost_amount=2,
                flavor="High-difficulty technical solution that may preserve deniability. May not work.",
            ),
        ],
        outcomes=[
            OutcomeSet(  # Follow orders
                full_success=(
                    "You follow the order. The course is set. Three days later you "
                    "learn that a second Starfleet vessel was already en route with "
                    "authorization to intervene — Command had a plan you weren't told "
                    "about. Veridian III is safe. Your record is clean. You spend two "
                    "weeks wondering what you would have done if that other ship "
                    "hadn't been there."
                ),
                partial=(
                    "You follow the order. The Veridian civilization dies. The incident "
                    "never appears in public record. Your crew knows. Three of them "
                    "request transfers within the next tour. You're not sure you'd "
                    "have decided differently with more time, but you're not sure "
                    "you'd have decided the same."
                ),
                full_failure=(
                    "You follow the order. The Veridian civilization dies. Somehow "
                    "the story reaches the Federation press six months later. Your "
                    "name is in it. You were the captain who was there and left. "
                    "Your record is clean. Your reputation is not."
                ),
            ),
            OutcomeSet(  # Keep trying to reach Command
                full_success=(
                    "Third attempt reaches a different relay station and gets through. "
                    "A Starfleet admiral — not the one who issued your orders — hears "
                    "your sensor data in real time and grants emergency authorization. "
                    "You intervene with 90 minutes to spare. The civilization survives. "
                    "The admiral who originally ordered your withdrawal never explains why."
                ),
                partial=(
                    "You reach Command with 40 minutes left. Authorization granted — "
                    "but with so little time, your intervention is partial. You save "
                    "perhaps 40 million people by triggering an early evacuation to "
                    "sheltered areas. The rest die. Technically compliant. Not enough."
                ),
                full_failure=(
                    "You never reach Command. The window closes. You followed the "
                    "process. The process failed 230 million people. Your official "
                    "log documents every attempt. Your crew is very quiet on the "
                    "trip back to Starbase 47."
                ),
            ),
            OutcomeSet(  # Intervene directly
                full_success=(
                    "Intervention succeeds. 230 million people survive an event they "
                    "will never know occurred. You return to Starbase 47 and face a "
                    "formal inquiry for insubordination. The inquiry board is split. "
                    "The career flag stands. Three admirals write letters on your behalf. "
                    "You are censured and promoted in the same week."
                ),
                partial=(
                    "Intervention partially succeeds — the phenomenon is mitigated, "
                    "not eliminated. Estimated 60–80% survival. You face the inquiry "
                    "with a record that shows both a direct order violation and the "
                    "saving of 140 million lives. The board doesn't know what to do "
                    "with you. Neither do you."
                ),
                full_failure=(
                    "The intervention fails. The phenomenon cannot be stopped with "
                    "your ship's capability — the science officer's analysis was based "
                    "on incomplete data. The civilization dies. You violated your orders "
                    "and didn't save anyone. The inquiry board is not split."
                ),
                critical_success=(
                    "Intervention succeeds completely. The stellar phenomenon is "
                    "diverted. You return to face the inquiry and the first question "
                    "the board asks is: 'Why didn't you try sooner?' Your answer "
                    "becomes required reading at Starfleet Academy."
                ),
                critical_failure=(
                    "The intervention triggers an unintended reaction that accelerates "
                    "the phenomenon. You made it worse. The civilization dies faster "
                    "than it would have. You violated your orders to do this. There "
                    "is no scenario in which you do not face a board of inquiry, "
                    "and there is no version of your testimony that helps you."
                ),
            ),
            OutcomeSet(  # Covert intervention
                full_success=(
                    "A precisely targeted deflector pulse, logged as a routine "
                    "calibration, nudges the stellar reaction just enough. The "
                    "phenomenon still occurs but at 40% intensity — survivable. "
                    "No Federation fingerprints. No record. 230 million people "
                    "experience a very bad night and then rebuild. You hold the "
                    "secret for the rest of your career."
                ),
                partial=(
                    "The covert approach works partially, but the calibration log "
                    "is inconsistent with the deflector usage data. Starfleet's "
                    "technical review board, three months later, asks a question "
                    "you don't have a clean answer to. Investigation pending."
                ),
                full_failure=(
                    "The covert approach requires a precision your ship's systems "
                    "cannot deliver in four hours. You spend three of those hours "
                    "attempting it and it doesn't work. You have one hour left and "
                    "you are now out of options."
                ),
            ),
        ],
        primary_station=STATION_COMMAND,
        rank_min=3,    # Lt. Commander+
        rank_max=5,
        difficulty_base=13,
        tags=["ethics", "prime_directive", "orders", "civilization", "career_defining"],
        has_ethical_weight=True,
        can_repeat=False,   # once per career
    ),

    # ------------------------------------------------------------------
    # FIRST CONTACT
    # ------------------------------------------------------------------

    ScenarioTemplate(
        id="FC-001",
        title="First Light",
        category=CAT_FIRST_CONTACT,
        hook=(
            "The signal has been transmitting for 43 seconds. It's coherent, "
            "structured, and on a frequency no known civilization uses. "
            "It is coming from {location}."
        ),
        situation=(
            "Universal translator has a 40% confidence parse — enough to say "
            "the signal has intent, not enough to confirm meaning. Your science "
            "officer rates the technological signature as pre-warp but advanced. "
            "They know you're here — the signal orientation has shifted twice to "
            "track your position. They are looking at you. "
            "This is, as far as Federation records show, first contact."
        ),
        context_tags=["any"],
        options=[
            ScenarioOption(
                label="Respond on the same frequency. Mathematical sequence.",
                station=STATION_COMMS,
                stat="Diplomacy",
                difficulty=11,
                cost_type=COST_TIME,
                cost_amount=1,
                flavor="Classic first contact protocol. Slow but safe.",
            ),
            ScenarioOption(
                label="Passive observation. Do not respond yet. Learn first.",
                station=STATION_SCIENCE,
                stat="Science",
                difficulty=12,
                cost_type=COST_TIME,
                cost_amount=2,
                flavor="Gather data before engaging. Risks them withdrawing.",
            ),
            ScenarioOption(
                label="Full translator effort — attempt language acquisition.",
                station=STATION_COMMS,
                stat="Science",
                difficulty=15,
                cost_type=COST_TIME,
                cost_amount=3,
                flavor="High-difficulty, high-reward. Success means real communication.",
            ),
            ScenarioOption(
                label="Move toward the signal source. Show you can come to them.",
                station=STATION_HELM,
                stat="Diplomacy",
                difficulty=10,
                cost_type=COST_RELATION,
                cost_amount=1,
                flavor="Physical gesture of intent. Interpreted very differently by different species.",
            ),
        ],
        outcomes=[
            OutcomeSet(  # Mathematical response
                full_success=(
                    "They respond. The mathematical exchange builds a shared framework "
                    "over 90 minutes. Your communications officer achieves a working "
                    "vocabulary. First contact is established with full Starfleet "
                    "protocol complied with. Career commendation: First Contact."
                ),
                partial=(
                    "They respond — but the signal changes frequency and your translator "
                    "loses lock. You've established that they know you're trying to "
                    "communicate. That's something. Full contact will require another "
                    "meeting."
                ),
                full_failure=(
                    "The response triggers an abrupt signal cutoff. They've gone silent. "
                    "Either your mathematical sequence was misread or they chose not to "
                    "continue. You have a record of first contact attempted. You don't "
                    "have first contact."
                ),
            ),
            OutcomeSet(  # Passive observation
                full_success=(
                    "Two hours of passive data gives your science officer a species "
                    "profile, technological level estimate, and a partial language "
                    "parse. When you finally respond, you know who you're talking to. "
                    "The contact is unusually smooth — you asked questions you already "
                    "had context for."
                ),
                partial=(
                    "Observation period runs 90 minutes. During that time, the signal "
                    "source moves — they're not stationary. When you respond, they've "
                    "changed position and your translator needs to reacquire. Useful "
                    "data, reduced window."
                ),
                full_failure=(
                    "During your observation period, they dispatch something — a probe "
                    "or a vessel, sensors unclear — in your direction. Your passive "
                    "posture suddenly feels like it needs updating."
                ),
            ),
            OutcomeSet(  # Full translator effort
                full_success=(
                    "Three hours of intensive translator work. Your communications "
                    "officer and science officer working in tandem produce a working "
                    "grammar. When contact is established, it is real conversation — "
                    "not gestures. This is among the most successful first contacts "
                    "in Federation history."
                ),
                partial=(
                    "Partial grammar acquired — enough to communicate intent but not "
                    "nuance. You can say 'we come in peace' with confidence. You "
                    "cannot explain what peace means to you. A good start."
                ),
                full_failure=(
                    "Three hours and the translator's confidence is at 31%. The signal "
                    "characteristics shifted twice during analysis — the language may "
                    "be contextual in a way your translator wasn't designed for. "
                    "You'll need a specialist."
                ),
            ),
            OutcomeSet(  # Move toward signal
                full_success=(
                    "Movement is read correctly — as approach, not aggression. A second "
                    "signal begins, much stronger, from the same source. When you close "
                    "to visual range, you're looking at a station, not a ship. They "
                    "have been waiting. They knew someone would come eventually."
                ),
                partial=(
                    "Movement triggers a response — the signal intensifies and changes "
                    "pattern. Your science officer reads it as defensive escalation. "
                    "You hold position. The signal eventually stabilizes. Contact is "
                    "possible but the approach has complicated it."
                ),
                full_failure=(
                    "Movement toward them causes immediate signal cutoff and what your "
                    "tactical officer reads as a power-up — something is charging in "
                    "the direction of the signal source. You don't know if it's a "
                    "weapon or a transmitter. Probably time to stop moving."
                ),
            ),
        ],
        primary_station=STATION_COMMS,
        rank_min=3,
        rank_max=5,
        difficulty_base=12,
        tags=["first_contact", "unknown_species", "communication", "discovery"],
        has_ethical_weight=False,
        can_repeat=True,
    ),

    # ------------------------------------------------------------------
    # DISCOVERY
    # ------------------------------------------------------------------

    ScenarioTemplate(
        id="DC-001",
        title="The Listening Post",
        category=CAT_DISCOVERY,
        hook=(
            "{anomaly}. Your science officer wants to investigate. "
            "Your mission clock says you have 6 hours before the rendezvous."
        ),
        situation=(
            "The signal is either natural — a previously uncatalogued phenomenon "
            "in a poorly surveyed region — or artificial and old. Your science "
            "officer puts 60% odds on artificial. If it's artificial, it's at least "
            "200 years old by the decay signature. Something built it out here and "
            "then either left or died. Investigation will take 3–5 hours and will "
            "make the rendezvous impossible. You can log it for follow-up by "
            "another vessel, spend an hour on a quick scan, or commit to "
            "a full investigation and be late."
        ),
        context_tags=["any"],
        options=[
            ScenarioOption(
                label="Log it. Flag for follow-up. Keep the rendezvous.",
                station=STATION_COMMAND,
                stat="Command",
                difficulty=7,
                cost_type=COST_NONE,
                cost_amount=0,
                flavor="Responsible. Reliable. Someone else investigates. Maybe.",
            ),
            ScenarioOption(
                label="One-hour quick scan. Partial data, rendezvous barely made.",
                station=STATION_SCIENCE,
                stat="Science",
                difficulty=11,
                cost_type=COST_TIME,
                cost_amount=1,
                flavor="Compromise. Gets something. Guarantees nothing.",
            ),
            ScenarioOption(
                label="Full investigation. Contact the rendezvous and explain.",
                station=STATION_SCIENCE,
                stat="Science",
                difficulty=13,
                cost_type=COST_REPUTATION,
                cost_amount=1,
                flavor="Science first. You'll be late. The data will be complete.",
            ),
            ScenarioOption(
                label="Send an away team to the source while the ship keeps schedule.",
                station=STATION_COMMAND,
                stat="Command",
                difficulty=14,
                cost_type=COST_CREW,
                cost_amount=2,
                flavor="Split the outcome. High difficulty — coordination is complex.",
            ),
        ],
        outcomes=[
            OutcomeSet(  # Log it
                full_success=(
                    "You log it with full sensor data and flag it priority. Starfleet "
                    "dispatches a science vessel within the month. They find it: a "
                    "Preserver relay station, intact, transmitting for 300 years. Your "
                    "log entry is cited in the discovery report. Credit shared."
                ),
                partial=(
                    "You log it. The follow-up vessel arrives eight months later and "
                    "finds nothing — whatever was transmitting stopped. Your log "
                    "is complete. The discovery is gone."
                ),
                full_failure=(
                    "You log it. Starfleet routes it low-priority. It sits in a queue "
                    "for two years. By then no one remembers why it was flagged."
                ),
            ),
            OutcomeSet(  # Quick scan
                full_success=(
                    "One focused hour extracts the key data: artificial construction, "
                    "Preserver origin likely, still intermittently powered. Your log "
                    "is detailed enough that Starfleet dispatches a dedicated vessel "
                    "immediately. You make the rendezvous with four minutes to spare."
                ),
                partial=(
                    "Scan captures structure but not origin. Interesting but inconclusive. "
                    "You make the rendezvous. The data sits in the science log for "
                    "six months before anyone looks at it again."
                ),
                full_failure=(
                    "The quick scan is interrupted by a sensor ghost — you spend 40 "
                    "minutes chasing a reading that turned out to be interference. "
                    "You have nothing useful and you're 40 minutes late to the rendezvous."
                ),
            ),
            OutcomeSet(  # Full investigation
                full_success=(
                    "Five hours of meticulous work. You find a Preserver relay station "
                    "in near-perfect condition, still transmitting navigational data for "
                    "civilizations that no longer exist. The discovery is significant enough "
                    "that the rendezvous contact holds. Career commendation filed. "
                    "Your science officer publishes a paper."
                ),
                partial=(
                    "You find the structure and get solid preliminary data but the power "
                    "source fails during investigation — whatever was transmitting goes "
                    "dark. You have a structure but no active signal. Useful; "
                    "not the full discovery it might have been."
                ),
                full_failure=(
                    "Six hours of investigation and your science officer concludes it's "
                    "natural — a particularly unusual pulsar echo with no artificial "
                    "component. You missed the rendezvous for nothing. The contact is "
                    "not pleased. Your log says 'inconclusive.'"
                ),
                critical_success=(
                    "The relay station is operational and responds to your hails in "
                    "a language your computer identifies as proto-Iconian. It is not "
                    "empty. Something is using it as a waypoint. This is not the "
                    "discovery you expected."
                ),
            ),
            OutcomeSet(  # Split: away team
                full_success=(
                    "Clean split: the away team beams to the structure's surface, you "
                    "keep the rendezvous on schedule. The team has comm contact throughout. "
                    "They find the relay station, document it, beam back when you return. "
                    "Perfect execution. Rare."
                ),
                partial=(
                    "The split works logistically but the away team has no science "
                    "officer — you needed them on the bridge. Their data is observational, "
                    "not analytical. Better than nothing."
                ),
                full_failure=(
                    "Communication with the away team degrades as you move toward the "
                    "rendezvous. You're now between the rendezvous and a team you can't "
                    "reach. You have to choose which obligation comes first."
                ),
            ),
        ],
        primary_station=STATION_SCIENCE,
        rank_min=0,
        rank_max=5,
        difficulty_base=11,
        tags=["discovery", "science", "time_pressure", "preserver", "archaeology"],
        has_ethical_weight=False,
        can_repeat=True,
    ),
]

# ---------------------------------------------------------------------------
# Index for fast lookup
# ---------------------------------------------------------------------------

TEMPLATE_INDEX = {t.id: t for t in SCENARIO_TEMPLATES}

def get_templates_by_category(category: str) -> list:
    return [t for t in SCENARIO_TEMPLATES if t.category == category]

def get_templates_by_rank(rank_idx: int) -> list:
    return [t for t in SCENARIO_TEMPLATES
            if t.rank_min <= rank_idx <= t.rank_max]

def get_templates_by_tags(tags: list) -> list:
    tag_set = set(tags)
    return [t for t in SCENARIO_TEMPLATES
            if tag_set.intersection(t.tags)]
