"""
Game state, scoring, rank progression, and in-game clock.
"""
from dataclasses import dataclass, field


# ---------------------------------------------------------------------------
# Scoring
# ---------------------------------------------------------------------------

@dataclass
class Score:
    tasks_completed: int = 0
    tasks_full_success: int = 0        # critical or full success only
    projects_completed: int = 0
    missions_completed: int = 0
    voyages_completed: int = 0
    years_reached: int = 0
    lives_saved: int = 0
    lives_lost: int = 0
    crew_alive_at_encounter: int = 0
    crew_survived_encounter: int = 0
    commendations: int = 0
    career_flags_negative: int = 0
    mentor_relationships: int = 0
    encounter_bonus: int = 0

    def total(self) -> int:
        return (
            self.tasks_completed * 10
            + self.projects_completed * 50
            + self.missions_completed * 200
            + self.voyages_completed * 1000
            + self.years_reached * 500
            + self.lives_saved * 150
            - self.lives_lost * 200
            + self.crew_alive_at_encounter * 75
            + self.crew_survived_encounter * 100
            + self.commendations * 250
            - self.career_flags_negative * 150
            + self.mentor_relationships * 200
            + self.encounter_bonus
        )

    def task_success_rate(self) -> float:
        if self.tasks_completed == 0:
            return 0.0
        return self.tasks_full_success / self.tasks_completed

    def breakdown(self) -> list:
        lines = []
        lines.append(f"  Tasks:      {self.tasks_completed} x10 = {self.tasks_completed * 10:>7,}")
        lines.append(f"  Projects:   {self.projects_completed} x50 = {self.projects_completed * 50:>7,}")
        lines.append(f"  Missions:   {self.missions_completed} x200 = {self.missions_completed * 200:>6,}")
        lines.append(f"  Voyages:    {self.voyages_completed} x1000 = {self.voyages_completed * 1000:>5,}")
        lines.append(f"  Years:      {self.years_reached} x500 = {self.years_reached * 500:>7,}")
        if self.lives_saved:
            lines.append(f"  Lives saved:{self.lives_saved} x150 = +{self.lives_saved * 150:>6,}")
        if self.lives_lost:
            lines.append(f"  Lives lost: {self.lives_lost} x200 = -{self.lives_lost * 200:>6,}")
        crew_pts = self.crew_alive_at_encounter * 75 + self.crew_survived_encounter * 100
        lines.append(f"  Crew:       alive+survived = +{crew_pts:>5,}")
        if self.commendations:
            lines.append(f"  Commend.:   {self.commendations} x250 = +{self.commendations * 250:>6,}")
        if self.career_flags_negative:
            lines.append(f"  Flags:      {self.career_flags_negative} x150 = -{self.career_flags_negative * 150:>6,}")
        if self.encounter_bonus:
            lines.append(f"  Encounter:  +{self.encounter_bonus:>7,}")
        lines.append(f"  {'─'*36}")
        lines.append(f"  TOTAL:      {self.total():>17,}")
        return lines


# ---------------------------------------------------------------------------
# Rank progression
# ---------------------------------------------------------------------------

RANK_NAMES = ["Ensign", "Lieutenant JG", "Lieutenant",
              "Lt. Commander", "Commander", "Captain"]

# What is needed to earn the NEXT rank
PROMOTION_REQUIREMENTS = {
    "Ensign": {
        "tasks_needed": 15,
        "success_rate": 0.60,
        "label": "15 tasks + ≥60% success rate",
    },
    "Lieutenant JG": {
        "tasks_needed": 20,
        "success_rate": 0.55,
        "projects_needed": 3,
        "label": "20 tasks + 3 projects led",
    },
    "Lieutenant": {
        "projects_needed": 8,
        "project_success_rate": 0.55,
        "label": "8 projects + ≥55% project completion",
    },
    "Lt. Commander": {
        "missions_needed": 3,
        "label": "3 missions commanded",
    },
    "Commander": {
        "missions_needed": 6,
        "voyages_needed": 1,
        "label": "6 missions + 1 voyage completed",
    },
    # Captain → Expedition is handled separately
}


@dataclass
class CareerRecord:
    rank: str = "Ensign"
    rank_idx: int = 0
    tasks_completed: int = 0
    tasks_full_success: int = 0
    projects_led: int = 0
    projects_succeeded: int = 0
    missions_commanded: int = 0
    missions_succeeded: int = 0
    voyages_completed: int = 0
    mentor_endorsements: int = 0
    career_flags: list = field(default_factory=list)

    def task_success_rate(self) -> float:
        if self.tasks_completed == 0:
            return 0.0
        return self.tasks_full_success / self.tasks_completed

    def project_success_rate(self) -> float:
        if self.projects_led == 0:
            return 0.0
        return self.projects_succeeded / self.projects_led

    def promotion_eligible(self) -> bool:
        req = PROMOTION_REQUIREMENTS.get(self.rank)
        if req is None:
            return False
        if "tasks_needed" in req and self.tasks_completed < req["tasks_needed"]:
            return False
        if "success_rate" in req and self.task_success_rate() < req["success_rate"]:
            return False
        if "projects_needed" in req and self.projects_led < req["projects_needed"]:
            return False
        if "project_success_rate" in req and self.project_success_rate() < req["project_success_rate"]:
            return False
        if "missions_needed" in req and self.missions_commanded < req["missions_needed"]:
            return False
        if "voyages_needed" in req and self.voyages_completed < req["voyages_needed"]:
            return False
        return True

    def promotion_progress(self) -> str:
        req = PROMOTION_REQUIREMENTS.get(self.rank)
        if req is None:
            return "Maximum rank achieved — expedition available."
        parts = []
        if "tasks_needed" in req:
            parts.append(f"Tasks {self.tasks_completed}/{req['tasks_needed']}")
        if "success_rate" in req:
            parts.append(f"Rate {int(self.task_success_rate()*100)}%/{int(req['success_rate']*100)}%")
        if "projects_needed" in req:
            parts.append(f"Projects {self.projects_led}/{req['projects_needed']}")
        if "project_success_rate" in req:
            parts.append(f"Proj.Rate {int(self.project_success_rate()*100)}%/{int(req['project_success_rate']*100)}%")
        if "missions_needed" in req:
            parts.append(f"Missions {self.missions_commanded}/{req['missions_needed']}")
        if "voyages_needed" in req:
            parts.append(f"Voyages {self.voyages_completed}/{req['voyages_needed']}")
        return "  |  ".join(parts)

    def promote(self) -> bool:
        if self.rank_idx < len(RANK_NAMES) - 1:
            self.rank_idx += 1
            self.rank = RANK_NAMES[self.rank_idx]
            return True
        return False

    def negative_flag_count(self) -> int:
        return len(self.career_flags)


# ---------------------------------------------------------------------------
# Game clock (used during expedition)
# ---------------------------------------------------------------------------

@dataclass
class GameClock:
    year: int = 1
    month: int = 1
    encounter_year: int = 0
    encounter_set: bool = False

    def advance(self, months: int):
        self.month += months
        while self.month > 12:
            self.month -= 12
            self.year += 1

    def display(self) -> str:
        month_names = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return f"Year {self.year}, {month_names[self.month]}"

    def encounter_now(self) -> bool:
        return self.encounter_set and self.year >= self.encounter_year


# ---------------------------------------------------------------------------
# Main game state container
# ---------------------------------------------------------------------------

@dataclass
class GameState:
    character: dict = field(default_factory=dict)
    roster: object = None              # Roster instance
    score: Score = field(default_factory=Score)
    career: CareerRecord = field(default_factory=CareerRecord)
    clock: GameClock = field(default_factory=GameClock)
    ship_condition: int = 100
    crew_fatigue: int = 20
    xp: int = 0
    expedition_active: bool = False
    game_over: bool = False
    game_over_reason: str = ""

    def named_crew_count(self) -> int:
        if self.roster:
            return len(self.roster.named_crew)
        return 0

    def crew_alive(self) -> int:
        """Count named crew not killed (loyalty > 0 used as alive proxy for now)."""
        if self.roster:
            return len([c for c in self.roster.named_crew if c.loyalty > 0])
        return 0
