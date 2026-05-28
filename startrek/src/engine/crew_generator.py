"""
Crew generator.
Produces a full Roster for a given ship class with:
  - Named NPCs: full stats, hidden stats, species, rank, department
  - Department pools: aggregate counts for background crew
  - 70/30 natural-fit / misfit assignment rule
  - Hidden stats: 1–2 per NPC, value 1–3, 10% trigger chance
"""

import random
from typing import Optional

from .crew import (
    CrewMember, HiddenStat, Roster, DepartmentPool,
    STATS, DEPARTMENTS, DEPARTMENT_STATS,
    OFFICER_RANKS, ENLISTED_RANKS, ALL_RANKS,
    RANK_STAT_BUDGET,
)
from ..data.names import (
    HUMAN_FIRST_NAMES, HUMAN_LAST_NAMES,
    VULCAN_NAMES, VULCAN_CLAN,
    ANDORIAN_FIRST_NAMES, ANDORIAN_CLAN, ANDORIAN_CLAN_NAMES,
    BETAZOID_FIRST_NAMES, BETAZOID_LAST_NAMES,
    BOLIAN_NAMES,
    BAJORAN_SURNAMES, BAJORAN_GIVEN_NAMES,
    TELLARITE_NAMES,
    SPECIES_WEIGHTS, SPECIES_STAT_MODIFIERS,
)


# ---------------------------------------------------------------------------
# Ship class templates
# ---------------------------------------------------------------------------

# Each entry: (total_crew, {dept: (officers, ncos, enlisted, named_npcs)})
SHIP_TEMPLATES = {
    "scout": {
        "total": 75,
        "departments": {
            "Command":     (2,  0,  0,  2),
            "Helm":        (2,  1,  3,  2),
            "Tactical":    (3,  3, 10,  3),
            "Science":     (3,  2,  8,  3),
            "Engineering": (4,  4, 14,  4),
            "Medical":     (2,  1,  4,  3),
            "Operations":  (2,  2,  5,  3),
        },
    },
    "cruiser": {
        "total": 200,
        "departments": {
            "Command":     (4,  0,  1,  2),
            "Helm":        (4,  2,  6,  3),
            "Tactical":    (6,  8, 28,  5),
            "Science":     (7,  5, 22,  5),
            "Engineering": (8, 10, 34,  6),
            "Medical":     (5,  4, 12,  5),
            "Operations":  (4,  4, 26,  4),
        },
    },
    "heavy_cruiser": {
        "total": 430,
        "departments": {
            "Command":     (8,  0,  2,  4),
            "Helm":        (8,  4, 14,  5),
            "Tactical":    (12, 20, 63, 10),
            "Science":     (16, 12, 47, 11),
            "Engineering": (18, 22, 75, 13),
            "Medical":     (12, 10, 28,  9),
            "Operations":  (8,  10, 41,  6),
        },
    },
}

# Which officer rank to assign based on position in department
# First entry = most senior; last = most junior
DEPT_OFFICER_RANKS = {
    "Command":     ["Commander", "Lt. Commander", "Lieutenant", "Lieutenant JG", "Ensign"],
    "Helm":        ["Lt. Commander", "Lieutenant", "Lieutenant JG", "Ensign"],
    "Tactical":    ["Lt. Commander", "Lieutenant", "Lieutenant", "Lieutenant JG", "Ensign"],
    "Science":     ["Lt. Commander", "Lieutenant", "Lieutenant", "Lieutenant JG", "Ensign"],
    "Engineering": ["Lt. Commander", "Lieutenant", "Lieutenant", "Lieutenant JG", "Ensign"],
    "Medical":     ["Commander", "Lt. Commander", "Lieutenant", "Lieutenant JG", "Ensign"],
    "Operations":  ["Lieutenant", "Lieutenant JG", "Ensign"],
}

DEPT_NCO_RANKS = ["Master Chief Petty Officer", "Senior Chief Petty Officer",
                  "Chief Petty Officer", "Petty Officer 1st Class",
                  "Petty Officer 2nd Class", "Petty Officer 3rd Class"]

DEPT_ENLISTED_RANKS = ["Crewman 1st Class", "Crewman"]


# ---------------------------------------------------------------------------
# Name generation
# ---------------------------------------------------------------------------

def _weighted_choice(weight_dict: dict) -> str:
    population = list(weight_dict.keys())
    weights = list(weight_dict.values())
    return random.choices(population, weights=weights, k=1)[0]


def generate_name(species: str = None) -> tuple[str, str]:
    """
    Return (full_name, species) for a randomly generated crew member.
    Species can be forced or randomly selected from SPECIES_WEIGHTS.
    """
    if species is None:
        species = _weighted_choice(SPECIES_WEIGHTS)

    if species == "Human":
        first = random.choice(HUMAN_FIRST_NAMES)
        last = random.choice(HUMAN_LAST_NAMES)
        name = f"{first} {last}"

    elif species == "Vulcan":
        name = random.choice(VULCAN_NAMES)
        clan = random.choice(VULCAN_CLAN)
        if clan:
            name = f"{name} {clan}"

    elif species == "Andorian":
        first = random.choice(ANDORIAN_FIRST_NAMES)
        clan_prefix = random.choice(ANDORIAN_CLAN)
        clan_name = random.choice(ANDORIAN_CLAN_NAMES)
        name = f"{first} {clan_prefix}{clan_name}"

    elif species == "Betazoid":
        first = random.choice(BETAZOID_FIRST_NAMES)
        last = random.choice(BETAZOID_LAST_NAMES)
        name = f"{first} {last}"

    elif species == "Bolian":
        name = random.choice(BOLIAN_NAMES)

    elif species == "Bajoran":
        surname = random.choice(BAJORAN_SURNAMES)
        given = random.choice(BAJORAN_GIVEN_NAMES)
        name = f"{surname} {given}"     # Bajoran: surname first

    elif species == "Tellarite":
        name = random.choice(TELLARITE_NAMES)

    else:  # Other
        # Draw from human pool as a baseline for now
        first = random.choice(HUMAN_FIRST_NAMES)
        last = random.choice(HUMAN_LAST_NAMES)
        name = f"{first} {last}"
        species = "Human"   # normalize

    return name, species


# ---------------------------------------------------------------------------
# Stat generation
# ---------------------------------------------------------------------------

def _distribute_points(budget: int, n_stats: int, primary_idx: int) -> list[int]:
    """
    Distribute `budget` points across `n_stats` stats.
    Primary stat (primary_idx) receives 25–35% of budget.
    All stats receive at least 1.
    No stat exceeds 10.
    """
    stats = [1] * n_stats
    budget -= n_stats  # pre-spend the minimums

    if budget <= 0:
        return stats

    # Give primary stat a boosted share
    primary_share = int(budget * random.uniform(0.25, 0.35))
    primary_share = min(primary_share, 9)  # cap at 9 (already have +1 floor)
    stats[primary_idx] += primary_share
    budget -= primary_share

    # Distribute remaining randomly among all stats
    attempts = 0
    while budget > 0 and attempts < 1000:
        idx = random.randrange(n_stats)
        if stats[idx] < 10:
            stats[idx] += 1
            budget -= 1
        attempts += 1

    return stats


def generate_stats(rank: str, department: str, natural_fit: bool) -> dict:
    """
    Generate visible stats for a crew member.
    natural_fit=True: primary stat skewed toward department's primary stat.
    natural_fit=False: primary stat randomly selected (may not match dept).
    """
    low, high = RANK_STAT_BUDGET[rank]
    budget = random.randint(low, high)

    dept_primary, dept_secondary = DEPARTMENT_STATS[department]

    if natural_fit:
        primary_stat = dept_primary
    else:
        # Misfit: pick any stat as primary, just not the dept primary
        other_stats = [s for s in STATS if s != dept_primary]
        primary_stat = random.choice(other_stats)

    primary_idx = STATS.index(primary_stat)
    values = _distribute_points(budget, len(STATS), primary_idx)

    # Clamp to 1–10
    values = [max(1, min(10, v)) for v in values]

    return dict(zip(STATS, values))


def apply_species_modifiers(stats: dict, species: str) -> dict:
    """Apply species stat modifiers (capped at 10, floored at 1)."""
    mods = SPECIES_STAT_MODIFIERS.get(species, {})
    result = dict(stats)
    for stat, delta in mods.items():
        result[stat] = max(1, min(10, result[stat] + delta))
    return result


def generate_hidden_stats(stats: dict) -> list:
    """
    Generate 1–2 hidden stat bonuses.

    Weighting:
      50%: hidden stat is in same area as NPC's highest visible stat
      30%: hidden stat is in area of LOW visible stats (surprise talent)
      20%: hidden stat is in department primary stat (departmental aptitude)

    Value: 1–3. Trigger chance: 10%.
    """
    hidden = []
    n_hidden = random.randint(1, 2)

    sorted_stats = sorted(stats.items(), key=lambda x: x[1])
    low_stats = [s for s, v in sorted_stats[:2]]   # two lowest visible stats
    high_stat = max(stats, key=lambda s: stats[s])  # highest visible stat

    used_stats = set()

    for _ in range(n_hidden):
        roll = random.random()
        if roll < 0.50:
            candidate = high_stat
        elif roll < 0.80:
            candidate = random.choice(low_stats)
        else:
            candidate = random.choice(STATS)

        # Avoid duplicating the same stat
        if candidate in used_stats:
            remaining = [s for s in STATS if s not in used_stats]
            if not remaining:
                break
            candidate = random.choice(remaining)

        used_stats.add(candidate)
        hidden.append(HiddenStat(
            stat=candidate,
            value=random.randint(1, 3),
            trigger_chance=0.10,
            discovered=False,
        ))

    return hidden


# ---------------------------------------------------------------------------
# Single NPC generation
# ---------------------------------------------------------------------------

def generate_crew_member(
    rank: str,
    department: str,
    natural_fit: bool = True,
    species: str = None,
) -> CrewMember:
    """Generate a single fully-modeled named NPC."""
    name, species = generate_name(species)
    stats = generate_stats(rank, department, natural_fit)
    stats = apply_species_modifiers(stats, species)
    hidden = generate_hidden_stats(stats)
    is_officer = rank in OFFICER_RANKS

    return CrewMember(
        name=name,
        species=species,
        rank=rank,
        department=department,
        is_officer=is_officer,
        stats=stats,
        hidden_stats=hidden,
        loyalty=random.randint(45, 65),
        morale=random.randint(60, 80),
        stress=random.randint(10, 30),
        is_named=True,
    )


def _select_rank(rank_list: list, position: int) -> str:
    """Pick rank from list by position; fall back to last entry if overrun."""
    if position < len(rank_list):
        return rank_list[position]
    return rank_list[-1]


# ---------------------------------------------------------------------------
# Full roster generation
# ---------------------------------------------------------------------------

def generate_roster(ship_class: str = "heavy_cruiser", seed: int = None) -> Roster:
    """
    Generate a complete named crew Roster for the given ship class.

    Applies the 70/30 natural-fit/misfit rule across all named NPCs.
    Background crew counts are stored in DepartmentPools.
    """
    if seed is not None:
        random.seed(seed)

    if ship_class not in SHIP_TEMPLATES:
        raise ValueError(f"Unknown ship class: {ship_class}. "
                         f"Choose from: {list(SHIP_TEMPLATES.keys())}")

    template = SHIP_TEMPLATES[ship_class]
    roster = Roster(ship_class=ship_class)

    all_npcs_to_generate = []  # list of (dept, rank, position_in_dept)

    for dept, (n_officers, n_ncos, n_enlisted, n_named) in template["departments"].items():
        total_in_dept = n_officers + n_ncos + n_enlisted
        officer_rank_list = DEPT_OFFICER_RANKS.get(dept, DEPT_OFFICER_RANKS["Operations"])

        # Build a list of (rank, category) for the named NPC slots
        # Officers fill first, then NCOs, then enlisted — by seniority
        named_slots = []
        for i in range(min(n_named, n_officers)):
            named_slots.append((_select_rank(officer_rank_list, i), "officer"))
        remaining = n_named - len(named_slots)
        for i in range(min(remaining, n_ncos)):
            named_slots.append((_select_rank(DEPT_NCO_RANKS, i), "nco"))
        remaining = n_named - len(named_slots)
        for i in range(min(remaining, n_enlisted)):
            named_slots.append((_select_rank(DEPT_ENLISTED_RANKS, i), "enlisted"))

        for rank, _ in named_slots:
            all_npcs_to_generate.append((dept, rank))

        # Register background pool
        roster.department_pools[dept] = DepartmentPool(
            department=dept,
            total_count=total_in_dept,
            named_count=len(named_slots),
        )

    # Shuffle and assign natural_fit flag: 70% fit, 30% misfit
    random.shuffle(all_npcs_to_generate)
    n_total = len(all_npcs_to_generate)
    n_misfits = max(1, round(n_total * 0.30))
    misfit_indices = set(random.sample(range(n_total), n_misfits))

    for i, (dept, rank) in enumerate(all_npcs_to_generate):
        natural_fit = i not in misfit_indices
        member = generate_crew_member(
            rank=rank,
            department=dept,
            natural_fit=natural_fit,
        )
        roster.add(member)

    return roster


# ---------------------------------------------------------------------------
# Quick test / demo
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    r = generate_roster("heavy_cruiser", seed=42)
    print(r.summary())
    print()
    print(f"Total named: {len(r.named_crew)}")
    print(f"Misfits: {len(r.misfits())} ({100*len(r.misfits())//len(r.named_crew)}%)")

    # Show hidden stat distribution
    hidden_counts = [len(c.hidden_stats) for c in r.named_crew]
    print(f"Avg hidden stats per NPC: {sum(hidden_counts)/len(hidden_counts):.2f}")

    # Show a sample NPC in detail
    sample = r.named_crew[0]
    print(f"\nSample NPC: {sample}")
    print(f"  Stats: {sample.stats}")
    print(f"  Hidden: {sample.hidden_stats}")
    print(f"  Dept fit: {sample.department_fit()}")
    print(f"  Loyalty status: {sample.loyalty_status()}")
