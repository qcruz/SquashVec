"""
Crew data model.
CrewMember represents a single named NPC with visible stats, hidden stats,
and relationship tracking. Roster manages a full ship's crew.
"""

from dataclasses import dataclass, field
from typing import Optional


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

STATS = ["Command", "Science", "Tactical", "Engineering", "Medicine", "Diplomacy"]

DEPARTMENTS = [
    "Command",
    "Helm",
    "Tactical",
    "Science",
    "Engineering",
    "Medical",
    "Operations",
]

# Primary and secondary stat for each department
DEPARTMENT_STATS = {
    "Command":     ("Command",     "Diplomacy"),
    "Helm":        ("Tactical",    "Engineering"),
    "Tactical":    ("Tactical",    "Command"),
    "Science":     ("Science",     "Medicine"),
    "Engineering": ("Engineering", "Science"),
    "Medical":     ("Medicine",    "Science"),
    "Operations":  ("Diplomacy",   "Command"),
}

OFFICER_RANKS = [
    "Ensign",
    "Lieutenant JG",
    "Lieutenant",
    "Lt. Commander",
    "Commander",
    "Captain",
]

ENLISTED_RANKS = [
    "Crewman",
    "Crewman 1st Class",
    "Petty Officer 3rd Class",
    "Petty Officer 2nd Class",
    "Petty Officer 1st Class",
    "Chief Petty Officer",
    "Senior Chief Petty Officer",
    "Master Chief Petty Officer",
]

ALL_RANKS = ENLISTED_RANKS + OFFICER_RANKS

# Stat budget range (min, max) per rank
RANK_STAT_BUDGET = {
    "Crewman":                   (6,  12),
    "Crewman 1st Class":         (8,  14),
    "Petty Officer 3rd Class":   (10, 16),
    "Petty Officer 2nd Class":   (12, 18),
    "Petty Officer 1st Class":   (14, 22),
    "Chief Petty Officer":       (18, 26),
    "Senior Chief Petty Officer":(22, 30),
    "Master Chief Petty Officer":(26, 34),
    "Ensign":                    (10, 18),
    "Lieutenant JG":             (16, 24),
    "Lieutenant":                (22, 30),
    "Lt. Commander":             (28, 38),
    "Commander":                 (36, 46),
    "Captain":                   (42, 52),
}


# ---------------------------------------------------------------------------
# Hidden stat
# ---------------------------------------------------------------------------

@dataclass
class HiddenStat:
    stat: str           # which stat this bonus applies to
    value: int          # 1–3
    trigger_chance: float = 0.10
    discovered: bool = False

    def __repr__(self):
        status = "KNOWN" if self.discovered else "hidden"
        return f"HiddenStat({self.stat} +{self.value}, {status})"


# ---------------------------------------------------------------------------
# CrewMember
# ---------------------------------------------------------------------------

@dataclass
class CrewMember:
    # Identity
    name: str
    species: str
    rank: str
    department: str
    is_officer: bool

    # Visible stats (1–10 each)
    stats: dict = field(default_factory=dict)

    # Hidden stats (1–2 per NPC; not displayed unless discovered)
    hidden_stats: list = field(default_factory=list)

    # Condition
    loyalty: int = 50      # 0–100
    morale: int = 70       # 0–100
    stress: int = 20       # 0–100

    # Player knowledge flags
    is_named: bool = True              # False = background crew, not individually tracked
    missions_together: int = 0         # increments each mission this NPC participates in

    # Career / history
    career_flags: list = field(default_factory=list)   # events that marked this NPC
    notes: list = field(default_factory=list)           # player-visible log entries

    def primary_stat_name(self) -> str:
        """Return name of this NPC's highest visible stat."""
        return max(self.stats, key=lambda s: self.stats[s])

    def stat(self, name: str) -> int:
        """Return visible stat value by name (case-insensitive)."""
        return self.stats.get(name, 1)

    def department_fit(self) -> bool:
        """True if NPC's primary stat matches their department's primary stat."""
        dept_primary = DEPARTMENT_STATS[self.department][0]
        return self.primary_stat_name() == dept_primary

    def is_strained(self) -> bool:
        return self.stress >= 70

    def is_exhausted(self) -> bool:
        return self.stress >= 85

    def loyalty_status(self) -> str:
        if self.loyalty >= 90:
            return "devoted"
        elif self.loyalty >= 70:
            return "loyal"
        elif self.loyalty >= 40:
            return "neutral"
        elif self.loyalty >= 20:
            return "strained"
        elif self.loyalty >= 10:
            return "resistant"
        else:
            return "hostile"

    def roll_hidden_trigger(self, stat_name: str) -> int:
        """
        For a given stat roll, check each hidden bonus for that stat.
        Returns total hidden bonus added (0 if none trigger).
        Called during resolution — not exposed to player unless discovered.
        """
        import random
        bonus = 0
        for hs in self.hidden_stats:
            if hs.stat == stat_name:
                if random.random() < hs.trigger_chance:
                    bonus += hs.value
        return bonus

    def discover_hidden_stat(self, stat_name: str = None) -> Optional[HiddenStat]:
        """
        Mark a hidden stat as discovered. If stat_name given, find that specific one.
        Returns the discovered HiddenStat or None if nothing to discover.
        """
        targets = [hs for hs in self.hidden_stats if not hs.discovered]
        if not targets:
            return None
        if stat_name:
            targets = [hs for hs in targets if hs.stat == stat_name]
            if not targets:
                return None
        target = targets[0]
        target.discovered = True
        return target

    def undiscovered_hidden_count(self) -> int:
        return sum(1 for hs in self.hidden_stats if not hs.discovered)

    def summary_line(self) -> str:
        """One-line description for crew roster display."""
        fit_marker = "" if self.department_fit() else " [*]"
        strain_marker = " [STRAINED]" if self.is_strained() else ""
        stats_str = " ".join(
            f"{s[:3].upper()}:{self.stats[s]}" for s in STATS
        )
        return (
            f"{self.rank:<20} {self.name:<22} {self.species:<10} "
            f"{self.department:<12}{fit_marker} | {stats_str} "
            f"| Loy:{self.loyalty} Mor:{self.morale} Str:{self.stress}"
            f"{strain_marker}"
        )

    def __repr__(self):
        return f"<CrewMember {self.rank} {self.name} [{self.department}]>"


# ---------------------------------------------------------------------------
# Department background aggregate (for non-named crew)
# ---------------------------------------------------------------------------

@dataclass
class DepartmentPool:
    department: str
    total_count: int
    named_count: int     # how many named NPCs in this dept (tracked separately)

    efficiency: int = 80   # 0–100: affects background rolls
    morale: int = 70       # 0–100
    health: int = 90       # 0–100

    @property
    def background_count(self):
        return self.total_count - self.named_count

    def efficiency_modifier(self) -> float:
        """Convert efficiency (0–100) to a roll modifier (-3 to +3)."""
        return round((self.efficiency - 50) / 17, 1)


# ---------------------------------------------------------------------------
# Roster
# ---------------------------------------------------------------------------

class Roster:
    """
    Full crew roster for a ship. Holds named NPCs and department pools.
    """

    def __init__(self, ship_class: str):
        self.ship_class = ship_class
        self.named_crew: list[CrewMember] = []
        self.department_pools: dict[str, DepartmentPool] = {}

    def add(self, member: CrewMember):
        self.named_crew.append(member)

    def by_department(self, dept: str) -> list[CrewMember]:
        return [c for c in self.named_crew if c.department == dept]

    def by_rank(self, rank: str) -> list[CrewMember]:
        return [c for c in self.named_crew if c.rank == rank]

    def senior_staff(self) -> list[CrewMember]:
        """Department heads and above."""
        senior_ranks = {"Commander", "Lt. Commander", "Captain"}
        return [c for c in self.named_crew if c.rank in senior_ranks]

    def misfits(self) -> list[CrewMember]:
        """Named crew whose primary stat doesn't match their department."""
        return [c for c in self.named_crew if not c.department_fit()]

    def best_for_stat(self, stat: str, department: str = None) -> Optional[CrewMember]:
        """
        Find the named crew member with the highest value in a given stat.
        Optionally filter by department.
        """
        pool = self.by_department(department) if department else self.named_crew
        if not pool:
            return None
        return max(pool, key=lambda c: c.stat(stat))

    def strained_crew(self) -> list[CrewMember]:
        return [c for c in self.named_crew if c.is_strained()]

    def summary(self) -> str:
        lines = [
            f"=== CREW ROSTER: {self.ship_class.upper()} ===",
            f"Named crew: {len(self.named_crew)}",
            f"  Misfits (non-ideal assignment): {len(self.misfits())} "
            f"({100*len(self.misfits())//max(1,len(self.named_crew))}%)",
            f"  Strained: {len(self.strained_crew())}",
            "",
            f"{'RANK':<20} {'NAME':<22} {'SPECIES':<10} {'DEPT':<14} "
            f"CMD SCI TAC ENG MED DIP  Loy Mor Str",
            "-" * 105,
        ]
        for dept in DEPARTMENTS:
            members = self.by_department(dept)
            if members:
                lines.append(f"  -- {dept.upper()} --")
                for m in sorted(members, key=lambda c: ALL_RANKS.index(c.rank), reverse=True):
                    lines.append("  " + m.summary_line())
        return "\n".join(lines)
