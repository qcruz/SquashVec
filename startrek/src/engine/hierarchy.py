"""
Project / Mission / Voyage data models and generators.

Projects   = 3–5 tasks   (Lieutenant level)
Missions   = 2–4 projects (Commander level)
Voyages    = 3–14 missions (Captain level)
"""
import random
from dataclasses import dataclass, field
from typing import Optional

from .scenario_generator import generate_scenario, resolve, LiveScenario, ResolutionResult
from .crew import CrewMember, Roster, STATS


# ---------------------------------------------------------------------------
# Content pools
# ---------------------------------------------------------------------------

PROJECT_TITLES = [
    ("Hull Integrity Survey",        "Inspect and document stress fractures across the secondary hull."),
    ("Sensor Array Calibration",     "Recalibrate long-range sensors after recent interference events."),
    ("Crew Wellness Assessment",     "Evaluate health and duty-readiness across all departments."),
    ("Emergency Protocol Drill",     "Run full emergency procedures across all bridge shifts."),
    ("Diplomatic Briefing Package",  "Prepare detailed briefing materials for upcoming first contact."),
    ("Power Grid Rerouting",         "Reroute primary power through backup conduits after damage."),
    ("Away Team Preparation",        "Equip and brief the away team for surface deployment."),
    ("Stellar Cartography Update",   "Incorporate new sensor data into active navigation charts."),
    ("Medical Supply Audit",         "Audit, verify, and resupply medical stores across sickbay."),
    ("Shield Generator Maintenance", "Service and load-test all shield generation systems."),
    ("Tactical Response Planning",   "Draft contingency plans for a range of hostile-contact scenarios."),
    ("Science Lab Reconfiguration",  "Reconfigure laboratory equipment for planetary analysis work."),
    ("Communications Relay Repair",  "Restore the damaged long-range communications relay array."),
    ("Boarding Defense Prep",        "Train crew for possible hostile boarding action procedures."),
    ("Warp Core Diagnostic",         "Run a full diagnostic cycle on the warp propulsion system."),
    ("Crew Transfer Processing",     "Integrate incoming crew transfers and update duty rosters."),
    ("Anomaly Data Reduction",       "Process raw sensor data from the recent anomaly encounter."),
    ("Navigation System Overhaul",   "Replace degraded navigation processor cores."),
    ("Quarantine Protocol Review",   "Audit and update ship-wide quarantine containment procedures."),
    ("Bridge Officer Evaluations",   "Conduct performance reviews for all junior bridge officers."),
]

MISSION_TITLES = [
    ("Distress Signal Alpha",        "Respond to an emergency beacon from an unknown vessel."),
    ("First Contact Protocol",       "Establish peaceful relations with a newly discovered species."),
    ("The Veridian Corridor",        "Navigate a contested sector under diplomatic cover."),
    ("Operation Quiet Watch",        "Maintain covert surveillance on a suspected threat."),
    ("Emergency Extraction",         "Evacuate Federation citizens from a deteriorating situation."),
    ("The Kepler Survey",            "Complete a scientific survey of an unstable stellar region."),
    ("Border Tension Response",      "Defuse an escalating standoff at the Federation border."),
    ("Medical Intervention",         "Respond to an outbreak of unknown pathogen on a colony world."),
    ("The Neutral Zone",             "Investigate suspicious activity near a treaty boundary."),
    ("Supply Line Protection",       "Escort a critical supply convoy through contested space."),
    ("The Listening Post",           "Reactivate an unmanned sensor station in disputed territory."),
    ("Civilian Relocation",          "Coordinate forced relocation of colony population before event."),
    ("Ambassador's Escort",          "Provide security and support for a diplomatic delegation."),
    ("Search Pattern Delta",         "Conduct a wide-area search for missing Starfleet personnel."),
    ("Contact: Sigma Station",       "Investigate loss of contact with a deep-space research station."),
]

VOYAGE_DESCRIPTIONS = {
    "Exploration": [
        "Deep space survey beyond the last charted systems.",
        "Mapping expedition through the Shackleton Expanse.",
        "A journey to chart a region no Federation vessel has reached.",
    ],
    "Diplomacy": [
        "Ambassadorial deployment supporting ongoing treaty negotiations.",
        "Roving liaison mission to three disputed border systems.",
        "Federation Council mediation support along the Cardassian frontier.",
    ],
    "Federation Support": [
        "Emergency response deployment — two colony worlds are at risk.",
        "General support and patrol of the Coreward sectors.",
        "Rapid response assignment following recent border incidents.",
    ],
    "Scientific Survey": [
        "Research deployment to the Badlands anomaly field.",
        "Multi-system planetary survey with Science Council support.",
        "Anomaly investigation along the Briar Patch perimeter.",
    ],
    "Border Patrol": [
        "Security deployment along the Klingon neutral zone.",
        "Threat deterrence mission on the Orion Syndicate perimeter.",
        "Joint patrol with Bajoran militia forces near the wormhole.",
    ],
}

INTERRUPTION_EVENTS = [
    "An ion storm forces an emergency reroute through hazardous space.",
    "A crew member sustains a serious injury during a routine operation.",
    "An unknown vessel enters sensor range and matches your heading.",
    "Engineering reports a plasma leak in the secondary manifold.",
    "Starfleet Command transmits priority orders that conflict with current objectives.",
    "Your primary project team leader is incapacitated — their project is at risk.",
    "Long-range sensors detect a distress signal — off-course but unmistakable.",
    "A diplomatic complication from a prior encounter resurfaces at the worst time.",
    "A Starfleet inspection team requests immediate boarding and review.",
    "Power fluctuations compromise two departments simultaneously.",
]

INTERRUPTION_OPTIONS = {
    "An ion storm forces an emergency reroute through hazardous space.": [
        ("Push through — accept higher risk, maintain schedule", "risk"),
        ("Reroute — lose 2 days but protect crew and ship", "safe"),
        ("Shelter in place — anchor at nearest body until storm passes", "delay"),
    ],
    "A crew member sustains a serious injury during a routine operation.": [
        ("Divert medical resources from secondary project", "redirect"),
        ("Request emergency transport to nearest starbase", "external"),
        ("Continue current assignments — medical team handles it", "normal"),
    ],
    "An unknown vessel enters sensor range and matches your heading.": [
        ("Hail and identify — standard procedure", "hail"),
        ("Go to yellow alert — monitor without contact", "watch"),
        ("Alter heading — lose the vessel and continue mission", "evade"),
    ],
    "Engineering reports a plasma leak in the secondary manifold.": [
        ("Emergency shutdown — abort one project, repair now", "abort"),
        ("Controlled burn — 30% chance of worsening, mission continues", "risk"),
        ("Reroute power — Engineering handles it, -1 project slot", "reroute"),
    ],
    "Starfleet Command transmits priority orders that conflict with current objectives.": [
        ("Comply — redirect to Starfleet's priority", "comply"),
        ("Request clarification — delay compliance, finish current task", "delay"),
        ("Acknowledge but continue — career flag risk", "ignore"),
    ],
    "Your primary project team leader is incapacitated — their project is at risk.": [
        ("Step in personally — you lead the primary project directly", "personal"),
        ("Promote the next senior officer — risk of inexperience", "promote"),
        ("Merge projects — sacrifice secondary to protect primary", "merge"),
    ],
    "Long-range sensors detect a distress signal — off-course but unmistakable.": [
        ("Respond — divert to signal, delay all mission projects", "respond"),
        ("Log and report to Starfleet — continue mission", "log"),
        ("Send a probe — gather information before deciding", "probe"),
    ],
    "A diplomatic complication from a prior encounter resurfaces at the worst time.": [
        ("Engage directly — you handle it, one project pauses", "direct"),
        ("Delegate to Operations — they manage the diplomatic channel", "delegate"),
        ("Defer — acknowledge receipt, respond after mission completes", "defer"),
    ],
    "A Starfleet inspection team requests immediate boarding and review.": [
        ("Full compliance — pause mission, accept inspection", "comply"),
        ("Request delay — continue mission, schedule inspection after", "delay"),
        ("Partial compliance — allow inspection but maintain mission ops", "partial"),
    ],
    "Power fluctuations compromise two departments simultaneously.": [
        ("Emergency power ration — one department goes dark temporarily", "ration"),
        ("All-hands repair — Engineering pulls from other projects", "repair"),
        ("Reduce output — all projects at reduced capacity until fixed", "reduce"),
    ],
}


# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------

@dataclass
class ProjectTask:
    scenario: LiveScenario
    assigned_crew: Optional[CrewMember] = None
    option_idx: int = 0                    # auto-chosen to match crew's best stat
    result: Optional[ResolutionResult] = None
    player_intervened: bool = False


@dataclass
class Project:
    title: str
    objective: str
    tasks: list                            # list[ProjectTask]
    intervention_slots: int = 1
    slots_used: int = 0
    completion_threshold: float = 0.60
    outcome: str = ""                      # "success" / "partial" / "failure"

    def resolved_tasks(self) -> list:
        return [t for t in self.tasks if t.result is not None]

    def success_count(self) -> int:
        return sum(1 for t in self.resolved_tasks()
                   if t.result.tier in ("critical_success", "full_success"))

    def success_rate(self) -> float:
        done = self.resolved_tasks()
        if not done:
            return 0.0
        return self.success_count() / len(done)

    def determine_outcome(self) -> str:
        rate = self.success_rate()
        if rate >= self.completion_threshold + 0.20:
            self.outcome = "success"
        elif rate >= self.completion_threshold - 0.20:
            self.outcome = "partial"
        else:
            self.outcome = "failure"
        return self.outcome

    def slots_remaining(self) -> int:
        return self.intervention_slots - self.slots_used


@dataclass
class MissionProject:
    """A project within a mission, optionally assigned to a project-leader NPC."""
    project: Project
    leader: Optional[CrewMember] = None
    is_primary: bool = False


@dataclass
class Mission:
    title: str
    objective: str
    threat_level: str                      # "low" / "medium" / "high"
    projects: list                         # list[MissionProject]
    lives_at_stake: int = 0
    interruptions: list = field(default_factory=list)
    interruptions_handled: list = field(default_factory=list)
    outcome: str = ""

    def primary(self) -> Optional[MissionProject]:
        for mp in self.projects:
            if mp.is_primary:
                return mp
        return self.projects[0] if self.projects else None

    def determine_outcome(self) -> str:
        p = self.primary()
        if p is None:
            self.outcome = "failure"
            return self.outcome
        if p.project.outcome == "failure":
            self.outcome = "failure"
        else:
            secondaries = [mp for mp in self.projects if not mp.is_primary]
            sec_ok = sum(1 for mp in secondaries
                        if mp.project.outcome in ("success", "partial"))
            if p.project.outcome == "success" and sec_ok == len(secondaries):
                self.outcome = "success"
            else:
                self.outcome = "partial"
        return self.outcome


@dataclass
class VoyageMission:
    """A mission within a voyage, optionally assigned to a commander NPC."""
    mission: Mission
    commander: Optional[CrewMember] = None


@dataclass
class Voyage:
    voyage_type: str
    duration: str                          # "short" / "standard" / "extended"
    description: str
    missions: list                         # list[VoyageMission]
    months_duration: int = 6
    outcome: str = ""

    def determine_outcome(self) -> str:
        succeeded = sum(1 for vm in self.missions
                       if vm.mission.outcome in ("success", "partial"))
        total = len(self.missions)
        if total == 0:
            self.outcome = "failure"
            return self.outcome
        rate = succeeded / total
        if rate >= 0.75:
            self.outcome = "success"
        elif rate >= 0.40:
            self.outcome = "partial"
        else:
            self.outcome = "failure"
        return self.outcome


# ---------------------------------------------------------------------------
# Generators
# ---------------------------------------------------------------------------

def _best_option_for_crew(scenario: LiveScenario,
                          crew: Optional[CrewMember]) -> int:
    """Return the option index whose stat best matches the crew member."""
    if not crew:
        return 0
    best_idx, best_val = 0, -1
    for i, option in enumerate(scenario.options):
        val = crew.stat(option.stat)
        if val > best_val:
            best_val = val
            best_idx = i
    return best_idx


def _get_lieutenant_candidates(roster: Roster) -> list:
    """Return named crew with Lieutenant rank or above for project leadership."""
    eligible_ranks = {"Lieutenant", "Lt. Commander", "Commander"}
    return [c for c in roster.named_crew if c.rank in eligible_ranks]


def _get_commander_candidates(roster: Roster) -> list:
    """Return named crew with Commander rank for mission leadership."""
    eligible_ranks = {"Commander", "Lt. Commander"}
    return [c for c in roster.named_crew if c.rank in eligible_ranks]


def generate_project(roster: Roster, rank_idx: int = 2,
                     intervention_slots: int = 1,
                     n_tasks: int = None) -> Project:
    """Generate a project with 3–5 tasks from scenario templates."""
    if n_tasks is None:
        n_tasks = random.randint(3, 5)

    title, objective = random.choice(PROJECT_TITLES)
    tasks = []
    for _ in range(n_tasks):
        scenario = generate_scenario(rank_idx=rank_idx, roster=roster)
        tasks.append(ProjectTask(scenario=scenario))

    return Project(
        title=title,
        objective=objective,
        tasks=tasks,
        intervention_slots=intervention_slots,
    )


def generate_mission(roster: Roster, rank_idx: int = 3,
                     n_projects: int = None) -> Mission:
    """Generate a mission with 2–4 projects."""
    if n_projects is None:
        n_projects = random.randint(2, 4)

    title, objective = random.choice(MISSION_TITLES)
    threat_level = random.choices(["low", "medium", "high"], weights=[40, 40, 20])[0]

    lives = 0
    if threat_level == "medium":
        lives = random.choice([0, 500, 2000, 5000])
    elif threat_level == "high":
        lives = random.choice([5000, 20000, 100000, 230000000])

    projects = []
    for i in range(n_projects):
        proj = generate_project(roster, rank_idx=rank_idx - 1, intervention_slots=1)
        projects.append(MissionProject(
            project=proj,
            is_primary=(i == 0),
        ))

    n_interruptions = random.choices([0, 1, 2], weights=[50, 35, 15])[0]
    interruptions = random.sample(INTERRUPTION_EVENTS,
                                  min(n_interruptions, len(INTERRUPTION_EVENTS)))

    return Mission(
        title=title,
        objective=objective,
        threat_level=threat_level,
        projects=projects,
        lives_at_stake=lives,
        interruptions=list(interruptions),
        interruptions_handled=[False] * len(interruptions),
    )


def generate_voyage(voyage_type: str, duration: str,
                    roster: Roster, rank_idx: int = 5) -> Voyage:
    """Generate a voyage with the appropriate number of missions."""
    duration_config = {
        "short":    ((3, 4),   3),
        "standard": ((5, 7),   6),
        "extended": ((10, 14), 12),
    }
    (lo, hi), months = duration_config.get(duration, ((4, 6), 6))
    n_missions = random.randint(lo, hi)

    descriptions = VOYAGE_DESCRIPTIONS.get(voyage_type, ["A Starfleet deployment."])
    description = random.choice(descriptions)

    missions = [
        VoyageMission(mission=generate_mission(roster, rank_idx=rank_idx - 1))
        for _ in range(n_missions)
    ]

    return Voyage(
        voyage_type=voyage_type,
        duration=duration,
        description=description,
        missions=missions,
        months_duration=months,
    )


# ---------------------------------------------------------------------------
# Auto-execution helpers (for Commander / Captain levels)
# ---------------------------------------------------------------------------

def auto_execute_project(project: Project, player_stats: dict,
                         ship_condition: int, crew_fatigue: int):
    """
    Execute all unresolved tasks in a project automatically.
    Used when a project runs under an NPC project leader (Commander/Captain levels).
    Crew assignments must already be set on each task.
    """
    for task in project.tasks:
        if task.result is not None:
            continue
        if task.assigned_crew:
            task.option_idx = _best_option_for_crew(task.scenario, task.assigned_crew)
        task.result = resolve(
            scenario=task.scenario,
            option_idx=task.option_idx,
            player_stats=player_stats,
            ship_condition=ship_condition,
            crew_fatigue=crew_fatigue,
        )
    project.determine_outcome()


def auto_assign_crew_to_project(project: Project, roster: Roster):
    """
    Automatically assign the best available crew member to each task.
    Used for NPC-led projects.
    """
    used = set()
    for task in project.tasks:
        if task.assigned_crew is not None:
            continue
        option = task.scenario.options[task.option_idx]
        station = option.station
        stat = option.stat

        if station == "Command":
            continue

        dept_map = {
            "Helm": "Helm", "Tactical": "Tactical", "Science": "Science",
            "Engineering": "Engineering", "Medical": "Medical",
            "Communications": "Operations",
        }
        dept = dept_map.get(station, station)
        candidates = [c for c in roster.by_department(dept) if id(c) not in used]

        if not candidates:
            candidates = [c for c in roster.named_crew
                         if c.stat(stat) >= 3 and id(c) not in used]

        if candidates:
            best = max(candidates, key=lambda c: c.stat(stat))
            task.assigned_crew = best
            used.add(id(best))
