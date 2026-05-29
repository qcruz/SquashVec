"""
Scenario generator.
Takes a ScenarioTemplate and produces a live Scenario with filled-in text,
an assigned crew roster, and a resolution engine hook.
"""

import random
from dataclasses import dataclass, field
from typing import Optional

from ..data.scenarios import (
    ScenarioTemplate, ScenarioOption, OutcomeSet,
    SCENARIO_TEMPLATES, TEMPLATE_INDEX,
    REGIONS, ALERT_CONTEXTS, UNKNOWN_CONTACTS, ANOMALIES, CREW_INCIDENTS,
    ALL_CATEGORIES,
    get_templates_by_rank,
)
from .crew import CrewMember, Roster, DEPARTMENT_STATS, STATS


# ---------------------------------------------------------------------------
# Live Scenario (a template instantiated with actual crew and filled text)
# ---------------------------------------------------------------------------

@dataclass
class LiveScenario:
    template_id: str
    title: str
    category: str
    hook: str
    situation: str
    options: list           # list of ScenarioOption
    outcomes: list          # list of OutcomeSet (parallel to options)
    assigned_crew: dict     # station -> CrewMember or None
    difficulty_base: int
    has_ethical_weight: bool
    tags: list


# ---------------------------------------------------------------------------
# Resolution result
# ---------------------------------------------------------------------------

@dataclass
class ResolutionResult:
    option_idx: int
    option_label: str
    station: str
    stat_used: str
    base_roll: int          # raw d20
    player_stat: int        # player's stat value
    crew_stat: int          # assigned crew member's stat (0 if none)
    hidden_bonus: int       # hidden stat trigger result (hidden from display)
    condition_mod: int      # ship/crew condition modifier
    total: int              # sum of all modifiers + roll
    difficulty: int
    tier: str               # "critical_success" / "full_success" / "partial" / "full_failure" / "critical_failure"
    outcome_text: str
    effects: list           # mechanical consequences
    hidden_triggered: bool  # did a hidden stat fire? (logged but not shown to player)
    crew_member: Optional[object] = None


# ---------------------------------------------------------------------------
# Template variable substitution
# ---------------------------------------------------------------------------

TEMPLATE_VARS = {
    "{contact}":        UNKNOWN_CONTACTS,
    "{location}":       REGIONS,
    "{anomaly}":        ANOMALIES,
    "{range}":          ["15,000", "22,000", "40,000", "8,000", "60,000", "31,000"],
    "{region}":         REGIONS,
    "{alert_context}":  ALERT_CONTEXTS,
}

def _fill_text(text: str, extra: dict = None) -> str:
    """Replace {placeholders} in template text with random or provided values."""
    result = text
    for key, pool in TEMPLATE_VARS.items():
        if key in result:
            result = result.replace(key, random.choice(pool), 1)
    if extra:
        for key, val in extra.items():
            result = result.replace(key, val)
    return result


def _fill_crew_vars(text: str, roster: Roster) -> str:
    """Replace {junior_officer} and {dept_head} placeholders with actual names."""
    if "{dept_head}" in text or "{junior_officer}" in text:
        # Pick two named officers from the same department
        for dept in ["Tactical", "Science", "Engineering", "Medical", "Operations"]:
            members = roster.by_department(dept)
            officers = [m for m in members if m.is_officer]
            if len(officers) >= 2:
                seniors = sorted(officers,
                    key=lambda c: ["Ensign","Lieutenant JG","Lieutenant",
                                   "Lt. Commander","Commander","Captain"].index(c.rank)
                    if c.rank in ["Ensign","Lieutenant JG","Lieutenant",
                                  "Lt. Commander","Commander","Captain"] else 0,
                    reverse=True)
                text = text.replace("{dept_head}", seniors[0].name)
                text = text.replace("{junior_officer}", seniors[-1].name)
                break
        # fallback
        text = text.replace("{dept_head}", "the department head")
        text = text.replace("{junior_officer}", "the junior officer")
    return text


# ---------------------------------------------------------------------------
# Crew assignment for a scenario
# ---------------------------------------------------------------------------

def assign_crew(template: ScenarioTemplate, roster: Roster) -> dict:
    """
    For each option in the template, find the best available named crew
    member to assign to that station. Returns station -> CrewMember map.
    """
    assignments = {}
    used = set()

    for option in template.options:
        station = option.station
        stat = option.stat

        if station == "Command":
            assignments[station] = None
            continue

        # Map station name to department name (they mostly align)
        dept_map = {
            "Helm": "Helm",
            "Tactical": "Tactical",
            "Science": "Science",
            "Engineering": "Engineering",
            "Medical": "Medical",
            "Communications": "Operations",
        }
        dept = dept_map.get(station, station)
        candidates = [c for c in roster.by_department(dept) if id(c) not in used]

        if not candidates:
            # Fall back to anyone with the relevant stat >= 3
            candidates = [c for c in roster.named_crew
                         if c.stat(stat) >= 3 and id(c) not in used]

        if candidates:
            # Pick highest stat in the relevant area
            best = max(candidates, key=lambda c: c.stat(stat))
            assignments[station] = best
            used.add(id(best))
        else:
            assignments[station] = None

    return assignments


# ---------------------------------------------------------------------------
# Generate a live scenario
# ---------------------------------------------------------------------------

def generate_scenario(
    template_id: str = None,
    rank_idx: int = 0,
    roster: Roster = None,
    category: str = None,
) -> LiveScenario:
    """
    Instantiate a scenario from a template.
    If template_id is None, pick randomly from eligible templates.
    """
    if template_id:
        template = TEMPLATE_INDEX[template_id]
    else:
        eligible = get_templates_by_rank(rank_idx)
        if category:
            eligible = [t for t in eligible if t.category == category]
        if not eligible:
            eligible = SCENARIO_TEMPLATES
        template = random.choice(eligible)

    extra = {}
    hook = _fill_text(template.hook, extra)
    situation = _fill_text(template.situation, extra)

    if roster:
        hook = _fill_crew_vars(hook, roster)
        situation = _fill_crew_vars(situation, roster)
        assigned = assign_crew(template, roster)
    else:
        assigned = {opt.station: None for opt in template.options}

    # Difficulty scales slightly with rank
    difficulty = template.difficulty_base + max(0, rank_idx - 2)

    return LiveScenario(
        template_id=template.id,
        title=template.title,
        category=template.category,
        hook=hook,
        situation=situation,
        options=list(template.options),
        outcomes=list(template.outcomes),
        assigned_crew=assigned,
        difficulty_base=difficulty,
        has_ethical_weight=template.has_ethical_weight,
        tags=list(template.tags),
    )


# ---------------------------------------------------------------------------
# Day task wrapper (reward type, costs, requirements)
# ---------------------------------------------------------------------------

@dataclass
class DayTask:
    """A scenario packaged with its daily economic context."""
    scenario: LiveScenario
    reward_type: str        # "credits" | "xp" | "npc_rep"
    primary_stat: str       # stat used to determine eligibility + success
    skill_requirement: int  # minimum stat level to attempt (0 = anyone)
    credit_cost: int        # upfront cost to attempt (only for xp tasks)
    credit_reward: int      # credits earned on success
    xp_multiplier: float    # 0.1 for credit tasks, 1.0 for xp tasks
    time_cost: float        # hours consumed (4–6)
    npc_name: str = ""      # NPC whose loyalty/morale is affected


def generate_day_tasks(
    roster=None,
    rank_idx: int = 0,
    n: int = 5,
    player_stats: dict = None,
) -> list:
    """
    Generate a pool of DayTasks for one in-game day.
    Mix of reward types; skill requirements spread across difficulty tiers.
    player_stats used to set realistic (but not locked-out) skill requirements.
    """
    player_stats = player_stats or {}
    tasks = []
    reward_pool = (["credits"] * 3) + (["xp"] * 2) + (["npc_rep"] * 1)
    random.shuffle(reward_pool)

    # NPC names available for rep tasks
    npc_names = ["Voss", "Rael", "Osei", "Fane", "Varkis"] if rank_idx == 0 else []
    if roster:
        npc_names += [c.name for c in roster.named_crew[:6]]

    for i in range(n):
        scenario = generate_scenario(rank_idx=rank_idx, roster=roster)
        # Pick the primary stat from the highest-difficulty option
        primary_opt = max(scenario.options, key=lambda o: o.difficulty)
        stat = primary_opt.stat
        skill_val = player_stats.get(stat, 3)

        rtype = reward_pool[i % len(reward_pool)]

        # Skill requirement: 0–(skill-1), so player can always attempt some tasks
        if i < 2:
            req = 0                           # easy — open to all
        elif i < 4:
            req = max(0, skill_val - 2)       # moderate
        else:
            req = max(0, skill_val - 1)       # near current level

        if rtype == "xp":
            cost = random.randint(15, 60)
            reward = 0
            xp_mult = 1.0
        elif rtype == "credits":
            cost = 0
            reward = random.randint(40, 150) + req * 15
            xp_mult = 0.15
        else:  # npc_rep
            cost = 0
            reward = random.randint(10, 40)
            xp_mult = 0.4

        npc = random.choice(npc_names) if npc_names and rtype == "npc_rep" else ""

        tasks.append(DayTask(
            scenario=scenario,
            reward_type=rtype,
            primary_stat=stat,
            skill_requirement=req,
            credit_cost=cost,
            credit_reward=reward,
            xp_multiplier=xp_mult,
            time_cost=round(random.uniform(4.0, 6.0), 1),
            npc_name=npc,
        ))
    return tasks


# ---------------------------------------------------------------------------
# Resolution engine
# ---------------------------------------------------------------------------

RANK_NAMES = ["Ensign", "Lieutenant JG", "Lieutenant",
              "Lt. Commander", "Commander", "Captain"]


def resolve(
    scenario: LiveScenario,
    option_idx: int,
    player_stats: dict,
    ship_condition: int = 100,
    crew_fatigue: int = 0,
) -> ResolutionResult:
    """
    Roll-under resolution: roll d20, succeed if roll <= skill*2.
    skill*2 on d20 ≈ skill*10% success chance.

    Tiers (lower roll = better):
      natural 20           → critical failure  (always)
      roll <= target - 4   → critical success
      roll <= target       → full success
      roll <= target + 4   → partial
      else                 → full failure
    """
    option = scenario.options[option_idx]
    outcome_set = scenario.outcomes[option_idx]

    base_roll = random.randint(1, 20)
    player_val = player_stats.get(option.stat, 1)

    # Target number: skill*2 on d20 ≈ skill*10% chance
    target = player_val * 2

    # Crew modifier (raises target = makes success easier)
    crew_member = scenario.assigned_crew.get(option.station)
    crew_val = 0
    hidden_bonus = 0
    hidden_triggered = False

    if crew_member:
        crew_val = crew_member.stat(option.stat)
        target += (crew_val - 5) // 2

        raw_hidden = crew_member.roll_hidden_trigger(option.stat)
        if raw_hidden > 0:
            hidden_bonus = raw_hidden
            target += hidden_bonus
            hidden_triggered = True

    # Condition modifiers (lower target = harder)
    condition_mod = 0
    if ship_condition < 70 and option.stat in ("Engineering", "Tactical"):
        condition_mod -= 1
    if ship_condition < 40:
        condition_mod -= 1
    if crew_fatigue > 70:
        condition_mod -= 1
    if crew_fatigue > 85:
        condition_mod -= 1
    target += condition_mod
    target = max(2, min(18, target))

    # Determine tier
    if base_roll == 20:
        tier = "critical_failure"
    elif base_roll <= max(1, target - 4):
        tier = "critical_success"
    elif base_roll <= target:
        tier = "full_success"
    elif base_roll <= target + 4:
        tier = "partial"
    else:
        tier = "full_failure"

    # Outcome text
    if tier == "critical_failure":
        outcome_text = outcome_set.critical_failure or outcome_set.full_failure
        effects = list(outcome_set.failure_effects)
    elif tier == "critical_success":
        outcome_text = outcome_set.critical_success or outcome_set.full_success
        effects = list(outcome_set.success_effects)
    elif tier == "full_success":
        outcome_text = outcome_set.full_success
        effects = list(outcome_set.success_effects)
    elif tier == "partial":
        outcome_text = outcome_set.partial
        effects = list(outcome_set.partial_effects)
    else:
        outcome_text = outcome_set.full_failure
        effects = list(outcome_set.failure_effects)

    return ResolutionResult(
        option_idx=option_idx,
        option_label=option.label,
        station=option.station,
        stat_used=option.stat,
        base_roll=base_roll,
        player_stat=player_val,
        crew_stat=crew_val,
        hidden_bonus=hidden_bonus,
        condition_mod=condition_mod,
        total=base_roll,       # roll IS the total in roll-under; target is the threshold
        difficulty=target,     # re-use field for target number
        tier=tier,
        outcome_text=outcome_text,
        effects=effects,
        hidden_triggered=hidden_triggered,
        crew_member=crew_member,
    )
