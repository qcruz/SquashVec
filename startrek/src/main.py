"""
Final Frontier — command-line entry point.
Full career loop: Ensign → Lieutenant → Commander → Captain → Five-Year Expedition.
"""

import random
import textwrap
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.engine.crew_generator import generate_roster
from src.engine.scenario_generator import generate_scenario, resolve
from src.engine.crew import STATS, CrewMember
from src.engine.game_state import (GameState, CareerRecord, Score, GameClock, RANK_NAMES,
                                   award_stat_progress)
from src.engine.hierarchy import (
    Project, ProjectTask, Mission, MissionProject, Voyage, VoyageMission,
    generate_project, generate_mission, generate_voyage,
    auto_assign_crew_to_project, auto_execute_project,
    INTERRUPTION_OPTIONS,
    VOYAGE_DESCRIPTIONS,
)


# ---------------------------------------------------------------------------
# Terminal helpers
# ---------------------------------------------------------------------------

W = 72

def hr(char="─"):      print(char * W)
def blank():           print()
def header(text):
    blank(); hr("═"); print(f"  {text.upper()}"); hr("═")
def section(text):
    blank(); hr(); print(f"  {text}"); hr()

def wrap(text, indent=2):
    prefix = " " * indent
    for line in textwrap.wrap(text, width=W - indent):
        print(prefix + line)

def prompt(text, valid=None):
    while True:
        raw = input(f"\n  > {text}: ").strip()
        if valid is None:
            return raw
        if raw in valid:
            return raw
        print(f"    Enter one of: {', '.join(valid)}")

def numbered_choice(items, label="choice"):
    for i, item in enumerate(items, 1):
        print(f"    [{i}]  {item}")
    valid = [str(i) for i in range(1, len(items) + 1)]
    return int(prompt(f"Enter {label} number", valid=valid)) - 1

def pause():
    input("\n  [Press Enter to continue]")

def clear():
    os.system("clear" if os.name == "posix" else "cls")

GREEN   = "\033[32m"
BGREEN  = "\033[92m"
YELLOW  = "\033[33m"
RED     = "\033[31m"
BRED    = "\033[91m"
CYAN    = "\033[36m"
BOLD    = "\033[1m"
RESET   = "\033[0m"

TIER_LABELS = {
    "critical_success": f"{BGREEN}★ CRITICAL SUCCESS{RESET}",
    "full_success":     f"{GREEN}✓ SUCCESS{RESET}",
    "partial":          f"{YELLOW}~ PARTIAL{RESET}",
    "full_failure":     f"{RED}✗ FAILURE{RESET}",
    "critical_failure": f"{BRED}✗✗ CRITICAL FAILURE{RESET}",
}

OUTCOME_COLORS = {
    "success": GREEN,
    "partial": YELLOW,
    "failure": RED,
}

def colored_outcome(outcome: str) -> str:
    c = OUTCOME_COLORS.get(outcome, "")
    return f"{c}{outcome.upper()}{RESET}"


# ---------------------------------------------------------------------------
# Character creation
# ---------------------------------------------------------------------------

ACADEMY_FOCUSES = [
    {
        "name": "Command Track",
        "desc": "Leadership, authority, and the weight of decisions.",
        "bonuses": {"Command": 2, "Diplomacy": 1},
        "trait": "Natural Authority",
        "trait_desc": "NPCs start at Neutral rather than Suspicious.",
    },
    {
        "name": "Sciences",
        "desc": "Analysis, investigation, and the patience to understand before acting.",
        "bonuses": {"Science": 2, "Medicine": 1},
        "trait": "Analytical Mind",
        "trait_desc": "Science pre-scan reveals one extra detail before a scenario.",
    },
    {
        "name": "Engineering",
        "desc": "Systems, improvisation, and knowing a ship better than its designers.",
        "bonuses": {"Engineering": 2, "Science": 1},
        "trait": "Systems Thinker",
        "trait_desc": "Engineering partial failures are treated one tier better.",
    },
    {
        "name": "Security / Tactical",
        "desc": "Threat assessment, combat, and the discipline to use force correctly.",
        "bonuses": {"Tactical": 2, "Command": 1},
        "trait": "Combat Ready",
        "trait_desc": "Physical injuries are less severe; Tactical mods improved.",
    },
    {
        "name": "Medical",
        "desc": "Healing, biology, and the refusal to accept preventable loss.",
        "bonuses": {"Medicine": 2, "Diplomacy": 1},
        "trait": "Healer's Eye",
        "trait_desc": "Crew health deterioration flagged one scenario earlier.",
    },
    {
        "name": "Diplomatic Corps",
        "desc": "Communication, negotiation, and the belief that most problems have a third option.",
        "bonuses": {"Diplomacy": 2, "Science": 1},
        "trait": "Cultural Fluency",
        "trait_desc": "First contact scenarios have one additional non-confrontational option.",
    },
]


def create_character() -> dict:
    header("Starfleet Academy — Character Creation")
    blank()
    wrap("You have graduated from Starfleet Academy. Before your first posting,")
    wrap("we need to know who you are.")
    blank()

    name = prompt("Enter your officer's name (e.g. J. Harrington)")
    if not name:
        name = "J. Harrington"

    section("Academy Focus")
    wrap("Your Academy focus shaped your foundational skills. Choose one:")
    blank()

    for i, focus in enumerate(ACADEMY_FOCUSES, 1):
        bonus_str = ", ".join(f"{s} +{v}" for s, v in focus["bonuses"].items())
        print(f"    [{i}]  {focus['name']}")
        print(f"         {focus['desc']}")
        print(f"         Bonuses: {bonus_str}  |  Trait: {focus['trait']}")
        blank()

    focus_idx = numbered_choice([f["name"] for f in ACADEMY_FOCUSES], "focus")
    chosen_focus = ACADEMY_FOCUSES[focus_idx]

    stats = {s: 3 for s in STATS}
    for stat, bonus in chosen_focus["bonuses"].items():
        stats[stat] += bonus

    character = {
        "name":       name,
        "focus":      chosen_focus["name"],
        "trait":      chosen_focus["trait"],
        "trait_desc": chosen_focus["trait_desc"],
        "stats":      stats,
    }

    section(f"Officer Profile — {name}")
    print(f"    Focus:  {character['focus']}")
    print(f"    Trait:  {character['trait']} — {character['trait_desc']}")
    blank()
    print("    STATS:")
    for stat, val in stats.items():
        bar = "█" * val + "░" * (10 - val)
        print(f"      {stat:<14} {bar}  {val}/10")
    blank()
    pause()
    return character


# ---------------------------------------------------------------------------
# Scenario display and resolution (Ensign-level task execution)
# ---------------------------------------------------------------------------

def display_scenario(scenario, character: dict):
    clear()
    header(f"Task — {scenario.title}")
    blank()
    wrap(scenario.hook)
    blank()
    wrap(scenario.situation)

    section("Bridge Status")
    for option in scenario.options:
        crew = scenario.assigned_crew.get(option.station)
        if option.station == "Command":
            print(f"    Command       You ({character['name']})")
        else:
            crew_name = crew.name if crew else "—"
            crew_stat = crew.stat(option.stat) if crew else 0
            morale = f" [morale {crew.morale}%]" if crew else ""
            print(f"    {option.station:<14} {crew_name:<22}  {option.stat} {crew_stat}{morale}")

    section("Response Options")
    for i, option in enumerate(scenario.options, 1):
        crew = scenario.assigned_crew.get(option.station)
        crew_stat = crew.stat(option.stat) if crew else 0
        player_stat = character["stats"].get(option.stat, 1)
        total_mod = (player_stat - 5) + ((crew_stat - 5) // 2 if crew else 0)
        avg_roll = 10.5 + total_mod
        pct = max(5, min(95, int(50 + (avg_roll - option.difficulty) * 5)))

        cost_str = ""
        if option.cost_type != "none":
            labels = {1: "minor", 2: "moderate", 3: "significant"}
            cost_str = f"  [{labels.get(option.cost_amount, '?')} {option.cost_type} cost]"

        print(f"\n    [{i}]  {option.label}")
        print(f"         Station: {option.station}  |  Stat: {option.stat}"
              f"  |  ~{pct}% success{cost_str}")
        if option.flavor:
            wrap(option.flavor, indent=9)
    blank()


def display_result(result, roster=None):
    blank()
    hr("═")
    print(f"\n  {TIER_LABELS.get(result.tier, result.tier.upper())}")
    blank()

    crew_mod_shown = (result.crew_stat - 5) // 2 if result.crew_stat else 0
    print(f"  Roll: {result.base_roll} (d20)"
          f"  +{result.player_stat - 5} (stat)"
          f"  +{crew_mod_shown} (crew)")
    if result.condition_mod:
        print(f"  Condition: {result.condition_mod:+d}")
    print(f"  Total: {result.total}  vs  Difficulty: {result.difficulty}")

    if result.hidden_triggered and result.crew_member:
        print(f"\n  {result.crew_member.name} performed exceptionally.")
        if roster:
            cm = next((c for c in roster.named_crew
                       if c.name == result.crew_member.name), None)
            if cm:
                discovered = cm.discover_hidden_stat(result.stat_used)
                if discovered:
                    print(f"  {BGREEN}★ Hidden talent identified:{RESET} "
                          f"{cm.name} has an exceptional {discovered.stat} aptitude.")

    blank()
    hr()
    blank()
    wrap(result.outcome_text)
    blank()


# ---------------------------------------------------------------------------
# XP and stat advancement
# ---------------------------------------------------------------------------

def award_xp(gs: GameState, tier: str) -> bool:
    gain = {"critical_success": 3, "full_success": 2,
            "partial": 1, "full_failure": 1, "critical_failure": 2}.get(tier, 1)
    gs.xp += gain
    if gs.xp >= 5:
        gs.xp -= 5
        return True
    return False


def level_up(gs: GameState):
    section("Advancement — Choose a Stat to Improve")
    wrap("Experience has sharpened your abilities. Choose one stat to improve by 1.")
    blank()
    improvable = [s for s in STATS if gs.character["stats"][s] < 10]
    for i, stat in enumerate(improvable, 1):
        val = gs.character["stats"][stat]
        bar = "█" * val + "░" * (10 - val)
        print(f"    [{i}]  {stat:<14} {bar}  {val} → {val+1}")
    idx = numbered_choice(improvable, "stat")
    chosen = improvable[idx]
    gs.character["stats"][chosen] += 1
    print(f"\n    {chosen} increased to {gs.character['stats'][chosen]}.")
    pause()


# ---------------------------------------------------------------------------
# Free time
# ---------------------------------------------------------------------------

FREE_TIME_OPTIONS = [
    ("Study",            "Improve one stat by 1 (this tour only)."),
    ("Physical Training","Reduces injury severity from combat scenarios."),
    ("Crew Time",        "Spend time with a crew member — improves their loyalty."),
    ("Rest",             "Reduce crew fatigue by 8–18%."),
]


def free_time(gs: GameState):
    header("Free Time")
    wrap("Between assignments you have time to spend as you choose.")
    blank()
    for i, (name, desc) in enumerate(FREE_TIME_OPTIONS, 1):
        print(f"    [{i}]  {name}")
        print(f"         {desc}")
    blank()
    choice = int(prompt("Activity", valid=["1","2","3","4"])) - 1
    name, _ = FREE_TIME_OPTIONS[choice]

    if name == "Study":
        section("Study")
        for i, s in enumerate(STATS, 1):
            print(f"    [{i}]  {s} (current: {gs.character['stats'][s]})")
        sidx = int(prompt("Stat", valid=[str(i) for i in range(1, len(STATS)+1)])) - 1
        stat = STATS[sidx]
        gs.character["stats"][stat] = min(10, gs.character["stats"][stat] + 1)
        print(f"\n    {stat} improved to {gs.character['stats'][stat]}.")

    elif name == "Physical Training":
        wrap("You log extra hours in the gym.")
        gs.character["physical_training"] = gs.character.get("physical_training", 0) + 1

    elif name == "Crew Time":
        section("Crew Time")
        named = gs.roster.named_crew[:12]
        wrap("Choose a crew member to spend time with:")
        for i, m in enumerate(named, 1):
            print(f"    [{i}]  {m.name} ({m.rank}, {m.department})  Loyalty: {m.loyalty}")
        cidx = int(prompt("Crew member",
                          valid=[str(i) for i in range(1, len(named)+1)])) - 1
        chosen = named[cidx]
        chosen.loyalty = min(100, chosen.loyalty + random.randint(5, 12))
        print(f"\n    Time with {chosen.name} was well spent. Loyalty: {chosen.loyalty}")
        if random.random() < 0.40 and chosen.undiscovered_hidden_count() > 0:
            discovered = chosen.discover_hidden_stat()
            if discovered:
                print(f"\n    {BGREEN}★ Hidden talent noticed:{RESET} {chosen.name} has")
                print(f"      a natural aptitude for {discovered.stat}.")

    elif name == "Rest":
        recovery = random.randint(8, 18)
        gs.crew_fatigue = max(0, gs.crew_fatigue - recovery)
        print(f"\n    Crew fatigue reduced to {gs.crew_fatigue}%.")

    pause()


# ---------------------------------------------------------------------------
# Status display
# ---------------------------------------------------------------------------

def show_status(gs: GameState):
    header(f"Officer Status — {gs.character['name']}")
    c = gs.career
    print(f"  Rank:       {c.rank}")
    print(f"  Focus:      {gs.character['focus']}")
    print(f"  Trait:      {gs.character['trait']}")
    blank()
    print(f"  Tasks:      {c.tasks_completed}  ({int(c.task_success_rate()*100)}% success rate)")
    if c.projects_led:
        print(f"  Projects:   {c.projects_led} led  ({c.projects_succeeded} succeeded)")
    if c.missions_commanded:
        print(f"  Missions:   {c.missions_commanded} commanded  ({c.missions_succeeded} succeeded)")
    if c.voyages_completed:
        print(f"  Voyages:    {c.voyages_completed} completed")
    blank()
    print(f"  Promotion:  {c.promotion_progress()}")
    blank()
    print(f"  Ship:       {gs.ship_condition}% condition")
    print(f"  Fatigue:    {gs.crew_fatigue}%")
    print(f"  XP:         {gs.xp}/5 to next advance")
    blank()
    print("  STATS:")
    for stat, val in gs.character["stats"].items():
        bar = "█" * val + "░" * (10 - val)
        print(f"    {stat:<14} {bar}  {val}/10")

    if c.career_flags:
        blank()
        print("  CAREER FLAGS:")
        for flag in c.career_flags:
            print(f"    • {flag}")

    blank()
    print("  SENIOR CREW:")
    crew_display = sorted(gs.roster.named_crew[:14], key=lambda m: m.loyalty, reverse=True)
    for m in crew_display:
        bar = "█" * (m.loyalty // 10) + "░" * (10 - m.loyalty // 10)
        flag = " [STRAINED]" if m.is_strained() else ""
        print(f"    {m.name:<22} {m.rank:<16} {bar} {m.loyalty}{flag}")
    pause()


def show_score(gs: GameState):
    header("Career Score")
    for line in gs.score.breakdown():
        print(line)
    pause()


# ---------------------------------------------------------------------------
# Crew logs
# ---------------------------------------------------------------------------

def show_crew_logs(gs: GameState):
    while True:
        clear()
        header("Public Crew Logs")
        named = gs.roster.named_crew
        print(f"  {len(named)} named crew members on manifest.\n")

        # Group by department
        depts = {}
        for m in named:
            depts.setdefault(m.department, []).append(m)

        idx = 1
        crew_list = []
        for dept in ["Command", "Helm", "Tactical", "Science", "Engineering", "Medical", "Operations"]:
            members = depts.get(dept, [])
            if not members:
                continue
            print(f"  {dept.upper()}")
            for m in sorted(members, key=lambda c: c.loyalty, reverse=True):
                loyalty_bar = "█" * (m.loyalty // 10) + "░" * (10 - m.loyalty // 10)
                strained = " [strained]" if m.is_strained() else ""
                print(f"    [{idx:>2}]  {m.name:<22} {m.rank:<16} "
                      f"loyalty {m.loyalty} {loyalty_bar}{strained}")
                crew_list.append(m)
                idx += 1
            blank()

        print(f"    [0]  Back")
        blank()

        valid = ["0"] + [str(i) for i in range(1, len(crew_list) + 1)]
        choice = prompt("Select crew member", valid=valid)
        if choice == "0":
            break

        member = crew_list[int(choice) - 1]
        _display_crew_profile(member)


def _display_crew_profile(m):
    clear()
    header(f"Crew Log — {m.name}")
    print(f"  Rank:        {m.rank}")
    print(f"  Species:     {m.species}")
    print(f"  Department:  {m.department}")
    print(f"  Officer:     {'Yes' if m.is_officer else 'No'}")
    blank()
    print(f"  Loyalty:  {m.loyalty:>3}  {'█'*(m.loyalty//10)}{'░'*(10-m.loyalty//10)}")
    print(f"  Morale:   {m.morale:>3}  {'█'*(m.morale//10)}{'░'*(10-m.morale//10)}")
    print(f"  Stress:   {m.stress:>3}  {'█'*(m.stress//10)}{'░'*(10-m.stress//10)}")
    blank()
    print("  STATS:")
    for stat, val in m.stats.items():
        bar = "█" * val + "░" * (10 - val)
        fit = " ◀" if m.department_fit() and stat == m.department_fit() else ""
        print(f"    {stat:<14} {bar}  {val}/10{fit}")

    discovered = [hs for hs in m.hidden_stats if hs.discovered]
    if discovered:
        blank()
        print("  KNOWN APTITUDES (discovered hidden stats):")
        for hs in discovered:
            print(f"    • {hs.stat}: exceptional aptitude (value {hs.value})")

    blank()
    print(f"  Department fit: {'natural' if not m.is_misfit() else 'misassigned [*]'}")
    blank()
    pause()


# ---------------------------------------------------------------------------
# Game history log
# ---------------------------------------------------------------------------

def show_history(gs: GameState):
    clear()
    header("Mission Log")
    log = gs.event_log
    if not log:
        wrap("No events recorded yet.")
        pause()
        return

    # Show most recent 40 entries, newest last
    visible = log[-40:]
    print(f"  Showing {len(visible)} of {len(log)} logged events.\n")
    type_icons = {
        "task":      "·",
        "project":   "◆",
        "mission":   "★",
        "voyage":    "⬡",
        "promotion": "▲",
        "flag":      "⚑",
        "encounter": "✕",
    }
    outcome_colors = {
        "success": GREEN, "partial": YELLOW,
        "failure": RED, "promoted": BGREEN,
        "flagged": RED, "completed": GREEN,
    }
    for e in visible:
        icon = type_icons.get(e["type"], "·")
        c = outcome_colors.get(e["outcome"], "")
        notes = f"  {e['notes']}" if e.get("notes") else ""
        print(f"  {e['date']:<18} {icon}  {e['title']:<34} "
              f"{c}{e['outcome']}{RESET}{notes}")
    blank()
    pause()


# ---------------------------------------------------------------------------
# Promotion flow
# ---------------------------------------------------------------------------

def check_promotion(gs: GameState) -> bool:
    """Check eligibility and offer promotion. Returns True if promoted."""
    if not gs.career.promotion_eligible():
        return False

    next_rank = RANK_NAMES[gs.career.rank_idx + 1] if gs.career.rank_idx + 1 < len(RANK_NAMES) else None
    if not next_rank:
        return False

    clear()
    header("Starfleet Communication — Promotion Review")
    blank()
    wrap(f"Officer {gs.character['name']}, your record has been reviewed by Starfleet.")
    wrap(f"Your performance meets the requirements for promotion to {next_rank}.")
    blank()

    rank_messages = {
        "Lieutenant JG":  "You are no longer a probationary officer. The bridge is yours to navigate.",
        "Lieutenant":     "You are authorized to lead projects and assign crew under your command.",
        "Lt. Commander":  "Two intervention slots are now available per project. Your judgment is trusted.",
        "Commander":      "You will now command missions directly. Project leaders answer to you.",
        "Captain":        "Command of a vessel is hereby granted. Choose your voyages well.",
    }
    wrap(rank_messages.get(next_rank, "Starfleet trusts you with greater responsibility."))
    blank()

    print(f"  Accept promotion to {next_rank}? [y/n]")
    choice = prompt("Accept", valid=["y", "n"])
    if choice == "n":
        wrap("You decline the promotion. The decision is noted in your record.")
        pause()
        return False

    gs.career.promote()
    gs.character["rank"] = gs.career.rank

    # Slot upgrade at Lt. Commander
    if gs.career.rank == "Lt. Commander":
        wrap("Your project intervention slots have been upgraded to 2.")

    blank()
    print(f"  {BGREEN}Promotion confirmed: {gs.career.rank}{RESET}")
    gs.log_event("promotion", f"Promoted to {gs.career.rank}", "promoted")
    blank()

    # Ship upgrade at Lieutenant (scout → cruiser)
    if gs.career.rank == "Lieutenant":
        wrap("You are reassigned to a cruiser-class vessel. A new crew awaits.")
        gs.roster = generate_roster("cruiser", seed=random.randint(0, 9999))
        print(f"  New crew manifest: {len(gs.roster.named_crew)} named crew.")

    # Ship upgrade at Commander
    elif gs.career.rank == "Commander":
        wrap("Your command is transferred to a heavy cruiser.")
        gs.roster = generate_roster("heavy_cruiser", seed=random.randint(0, 9999))
        print(f"  New crew manifest: {len(gs.roster.named_crew)} named crew.")
        gs.ship_condition = 100
        gs.crew_fatigue = 15

    pause()
    return True


# ---------------------------------------------------------------------------
# ENSIGN LEVEL — single task execution
# ---------------------------------------------------------------------------

def run_task(gs: GameState):
    """Run one scenario at Ensign/LJG level — player executes the task directly."""
    scenario = generate_scenario(rank_idx=gs.career.rank_idx, roster=gs.roster)
    display_scenario(scenario, gs.character)

    valid = [str(i) for i in range(1, len(scenario.options) + 1)]
    choice_idx = int(prompt("Choose your response", valid=valid)) - 1

    option = scenario.options[choice_idx]
    print(f"\n  You chose: {option.label}")
    confirm = prompt("Confirm? (y/n)", valid=["y", "n"])
    if confirm == "n":
        return

    result = resolve(
        scenario=scenario,
        option_idx=choice_idx,
        player_stats=gs.character["stats"],
        ship_condition=gs.ship_condition,
        crew_fatigue=gs.crew_fatigue,
    )
    display_result(result, roster=gs.roster)

    # Track career record
    gs.career.tasks_completed += 1
    gs.score.tasks_completed += 1
    if result.tier in ("critical_success", "full_success"):
        gs.career.tasks_full_success += 1
        gs.score.tasks_full_success += 1

    # Micro stat gain on the stat used
    stat_increased = award_stat_progress(gs.character, result.stat_used, result.tier)
    if stat_increased:
        print(f"  {CYAN}Experience gained: {result.stat_used} increased to "
              f"{gs.character['stats'][result.stat_used]}.{RESET}")

    # Ship condition
    if result.tier in ("full_failure", "critical_failure"):
        dmg = random.randint(3, 10)
        gs.ship_condition = max(0, gs.ship_condition - dmg)
        print(f"  Ship condition: -{dmg}% → {gs.ship_condition}%")
    gs.crew_fatigue = min(100, gs.crew_fatigue + random.randint(2, 5))

    # Career flag on ethical failure
    if scenario.has_ethical_weight and result.tier in ("full_failure", "critical_failure"):
        flag = f"[{scenario.title}] Ethical failure"
        gs.career.career_flags.append(flag)
        gs.score.career_flags_negative += 1
        print(f"\n  {RED}Career flag:{RESET} {flag}")
        gs.log_event("flag", scenario.title, "flagged", flag)

    # Log the task
    gs.log_event("task", scenario.title, result.tier.replace("_", " "),
                 f"via {result.stat_used}")

    # XP
    if award_xp(gs, result.tier):
        level_up(gs)

    pause()
    check_promotion(gs)


# ---------------------------------------------------------------------------
# LIEUTENANT LEVEL — project management
# ---------------------------------------------------------------------------

def _assign_crew_interactive(project: Project, gs: GameState):
    """
    Player manually assigns crew to each task in the project.
    """
    section(f"Crew Assignment — {project.title}")
    wrap(project.objective)
    blank()

    used_ids = set()

    for task_num, task in enumerate(project.tasks, 1):
        option = task.scenario.options[0]   # use first option as representative stat
        # pick the best-fit option for display
        best_opt = max(task.scenario.options, key=lambda o: o.difficulty)
        station = best_opt.station
        stat = best_opt.stat

        print(f"  Task {task_num}: {task.scenario.title}")
        print(f"  Station: {station}  |  Stat: {stat}")
        blank()

        if station == "Command":
            print(f"    This task falls under your direct command.")
            blank()
            continue

        # Gather candidates by department + stat
        dept_map = {
            "Helm": "Helm", "Tactical": "Tactical", "Science": "Science",
            "Engineering": "Engineering", "Medical": "Medical",
            "Communications": "Operations",
        }
        dept = dept_map.get(station, station)
        candidates = [c for c in gs.roster.by_department(dept)
                     if id(c) not in used_ids]
        if not candidates:
            candidates = [c for c in gs.roster.named_crew
                         if c.stat(stat) >= 3 and id(c) not in used_ids]
        candidates = sorted(candidates, key=lambda c: c.stat(stat), reverse=True)[:6]

        if not candidates:
            print(f"    No available crew — task will run understaffed.")
            blank()
            continue

        print(f"    Available crew (sorted by {stat}):")
        for i, c in enumerate(candidates, 1):
            val = c.stat(stat)
            bar = "█" * val + "░" * (10 - val)
            hidden = " [hidden talent known]" if c.discovered_hidden_count() > 0 else ""
            print(f"    [{i}]  {c.name:<22} {c.rank:<16} {stat} {val} {bar}{hidden}")
        blank()

        valid = [str(i) for i in range(1, len(candidates) + 1)]
        choice = int(prompt(f"Assign to Task {task_num}", valid=valid)) - 1
        task.assigned_crew = candidates[choice]
        used_ids.add(id(task.assigned_crew))
        # Set option_idx to match the assigned crew's best stat
        task.option_idx = max(range(len(task.scenario.options)),
                              key=lambda i: task.assigned_crew.stat(task.scenario.options[i].stat))
        print(f"    Assigned: {task.assigned_crew.name}")
        blank()


def _execute_project_interactive(project: Project, gs: GameState):
    """
    Execute project tasks one at a time; offer intervention on poor results.
    """
    section(f"Executing — {project.title}")
    intervention_slots = 2 if gs.career.rank == "Lt. Commander" else 1
    project.intervention_slots = intervention_slots
    project.slots_used = 0

    for task_num, task in enumerate(project.tasks, 1):
        print(f"\n  Task {task_num}/{len(project.tasks)}: {task.scenario.title}")

        if task.assigned_crew:
            print(f"  Assigned: {task.assigned_crew.name} "
                  f"({task.assigned_crew.rank}, {task.assigned_crew.department})")
        else:
            print(f"  Assigned: [understaffed]")

        # Auto-resolve
        result = resolve(
            scenario=task.scenario,
            option_idx=task.option_idx,
            player_stats=gs.character["stats"],
            ship_condition=gs.ship_condition,
            crew_fatigue=gs.crew_fatigue,
        )
        task.result = result

        tier_label = TIER_LABELS.get(result.tier, result.tier.upper())
        print(f"  Roll: {result.base_roll} + {result.player_stat-5} (stat) "
              f"+ {(result.crew_stat-5)//2} (crew) = {result.total} vs {result.difficulty}")
        print(f"  {tier_label}")

        # Intervention offer
        if (result.tier in ("partial", "full_failure", "critical_failure")
                and project.slots_remaining() > 0):
            stat_used = task.scenario.options[task.option_idx].stat
            my_val = gs.character["stats"].get(stat_used, 1)
            print(f"\n  [{project.slots_remaining()} intervention slot(s) remaining]")
            print(f"  You can add your {stat_used} stat ({my_val}) to this roll.")
            use = prompt("Intervene? (y/n)", valid=["y", "n"])
            if use == "y":
                project.slots_used += 1
                task.player_intervened = True
                bonus = my_val
                new_total = result.total + bonus
                # Determine new tier
                diff = result.difficulty
                if result.base_roll == 1:
                    new_tier = result.tier   # nat 1 stays critical failure
                elif new_total >= diff + 5:
                    new_tier = "full_success"
                elif new_total >= diff - 4:
                    new_tier = "partial"
                else:
                    new_tier = "full_failure"
                # Update result in place
                task.result = type(result)(
                    option_idx=result.option_idx,
                    option_label=result.option_label,
                    station=result.station,
                    stat_used=result.stat_used,
                    base_roll=result.base_roll,
                    player_stat=result.player_stat,
                    crew_stat=result.crew_stat,
                    hidden_bonus=result.hidden_bonus,
                    condition_mod=result.condition_mod,
                    total=new_total,
                    difficulty=result.difficulty,
                    tier=new_tier,
                    outcome_text=task.scenario.outcomes[task.option_idx].full_success
                                 if new_tier in ("full_success","critical_success")
                                 else task.scenario.outcomes[task.option_idx].partial
                                 if new_tier == "partial"
                                 else task.scenario.outcomes[task.option_idx].full_failure,
                    effects=result.effects,
                    hidden_triggered=result.hidden_triggered,
                    crew_member=result.crew_member,
                )
                print(f"  You step in. +{bonus} to roll → {new_total}")
                print(f"  {TIER_LABELS.get(new_tier, new_tier.upper())}")

        # Micro stat gain
        stat_used = task.scenario.options[task.option_idx].stat
        stat_inc = award_stat_progress(gs.character, stat_used, task.result.tier)
        if stat_inc:
            print(f"  {CYAN}Experience: {stat_used} → {gs.character['stats'][stat_used]}{RESET}")

        # Track task
        gs.career.tasks_completed += 1
        gs.score.tasks_completed += 1
        if task.result.tier in ("critical_success", "full_success"):
            gs.career.tasks_full_success += 1
            gs.score.tasks_full_success += 1
        gs.log_event("task", task.scenario.title, task.result.tier.replace("_", " "),
                     f"project: {project.title}")


def run_project(gs: GameState):
    """Full project management loop for Lieutenant/Lt. Commander."""
    clear()
    project = generate_project(
        roster=gs.roster,
        rank_idx=gs.career.rank_idx,
        intervention_slots=2 if gs.career.rank == "Lt. Commander" else 1,
    )

    header(f"Project — {project.title}")
    wrap(project.objective)
    print(f"\n  Tasks: {len(project.tasks)}  |  "
          f"Intervention slots: {2 if gs.career.rank == 'Lt. Commander' else 1}")
    blank()
    pause()

    _assign_crew_interactive(project, gs)
    _execute_project_interactive(project, gs)

    outcome = project.determine_outcome()

    blank()
    hr("═")
    rate = int(project.success_rate() * 100)
    succeeded = project.success_count()
    total = len(project.tasks)
    print(f"\n  Project result: {succeeded}/{total} tasks succeeded ({rate}%)")
    print(f"  Outcome: {colored_outcome(outcome)}")
    blank()

    gs.career.projects_led += 1
    gs.score.projects_completed += 1
    if outcome in ("success", "partial"):
        gs.career.projects_succeeded += 1
    gs.log_event("project", project.title, outcome,
                 f"{project.success_count()}/{len(project.tasks)} tasks")

    # Ship wear
    if outcome == "failure":
        gs.ship_condition = max(0, gs.ship_condition - random.randint(2, 6))
    gs.crew_fatigue = min(100, gs.crew_fatigue + random.randint(3, 8))

    pause()
    check_promotion(gs)


# ---------------------------------------------------------------------------
# COMMANDER LEVEL — mission management
# ---------------------------------------------------------------------------

def _assign_project_leaders(mission: Mission, gs: GameState):
    """Player assigns project leaders from eligible NPC pool."""
    section(f"Assign Project Leaders — {mission.title}")
    wrap(mission.objective)
    blank()

    eligible = [c for c in gs.roster.named_crew
               if c.rank in {"Lieutenant", "Lt. Commander", "Commander"}]

    if not eligible:
        wrap("No eligible officers available. Projects will run without dedicated leaders.")
        pause()
        return

    used_ids = set()
    for mp in mission.projects:
        tag = "[PRIMARY]" if mp.is_primary else "[secondary]"
        print(f"  {tag} Project: {mp.project.title}")
        wrap(mp.project.objective, indent=4)
        blank()

        available = [c for c in eligible if id(c) not in used_ids]
        if not available:
            print("    [No officers available — project runs without leader]")
            blank()
            continue

        for i, c in enumerate(available[:8], 1):
            primary_stat = gs.roster.department_pools.get(c.department)
            top_stat = max(c.stats, key=lambda s: c.stats[s])
            print(f"    [{i}]  {c.name:<22} {c.rank:<16} "
                  f"top stat: {top_stat} {c.stat(top_stat)}")
        blank()

        valid = [str(i) for i in range(1, min(len(available), 8) + 1)]
        choice = int(prompt("Assign leader", valid=valid)) - 1
        mp.leader = available[choice]
        used_ids.add(id(mp.leader))
        print(f"    Leader: {mp.leader.name}")
        blank()


def _handle_interruption(event: str, gs: GameState) -> str:
    """Present an interruption event and get the player's tactical response."""
    blank()
    hr("─")
    print(f"  {YELLOW}INTERRUPTION:{RESET} {event}")
    blank()

    options = INTERRUPTION_OPTIONS.get(event, [
        ("Address the situation directly", "direct"),
        ("Delegate to available officers", "delegate"),
        ("Continue — handle it after current task", "defer"),
    ])

    wrap("Your response:")
    for i, (label, _) in enumerate(options, 1):
        print(f"    [{i}]  {label}")

    valid = [str(i) for i in range(1, len(options) + 1)]
    choice = int(prompt("Response", valid=valid)) - 1
    _, response_type = options[choice]

    # Outcome flavor based on response type
    outcomes = {
        "risk":     "You push through. The situation stabilizes — barely.",
        "safe":     "You take the cautious path. Time lost, crew protected.",
        "delay":    "You anchor and wait. The mission falls behind schedule.",
        "redirect": "Resources are shifted. One project takes a hit.",
        "external": "Outside help is requested. Starfleet notes the dependency.",
        "normal":   "You hold course. The situation resolves on its own.",
        "hail":     "Contact established. The vessel is identified — unusual, but benign.",
        "watch":    "You observe in silence. Nothing hostile materializes.",
        "evade":    "You alter heading. The vessel does not follow.",
        "abort":    "One project pauses while Engineering handles the repair.",
        "reroute":  "Power rerouted. Projects continue at reduced efficiency.",
        "comply":   "You comply with the order. Mission scope is adjusted.",
        "ignore":   "You continue. Starfleet's message is acknowledged but not acted on.",
        "personal": "You step in directly. The project stabilizes under your command.",
        "promote":  "The junior officer rises to the challenge — mostly.",
        "merge":    "Secondary objective is abandoned. Primary project is protected.",
        "respond":  "You divert to the signal. The mission loses a full day.",
        "log":      "The signal is logged and reported. You continue your mission.",
        "probe":    "The probe returns data. You make an informed decision.",
        "direct":   "You handle the complication personally. Other work pauses briefly.",
        "delegate": "Your Operations officer manages the channel. Smooth enough.",
        "defer":    "Acknowledged; no action taken until mission completes.",
        "partial":  "You split attention. Inspection proceeds while mission continues.",
        "ration":   "One department powers down. Efficiency drops across the board.",
        "repair":   "Engineering addresses the fluctuations. One project is delayed.",
        "reduce":   "Everything slows down. Projects complete — eventually.",
    }
    blank()
    wrap(outcomes.get(response_type, "The situation is handled."))
    blank()
    return response_type


def run_mission(gs: GameState):
    """Full mission management loop for Commander."""
    clear()
    mission = generate_mission(roster=gs.roster, rank_idx=gs.career.rank_idx)

    header(f"Mission — {mission.title}")
    wrap(mission.objective)
    threat_color = {"low": GREEN, "medium": YELLOW, "high": RED}.get(mission.threat_level, "")
    print(f"\n  Threat level: {threat_color}{mission.threat_level.upper()}{RESET}"
          f"  |  Projects: {len(mission.projects)}")
    if mission.lives_at_stake:
        print(f"  Lives at stake: {mission.lives_at_stake:,}")
    blank()
    pause()

    _assign_project_leaders(mission, gs)

    # Execute all projects (NPC-led; auto-resolve, show summary)
    section("Mission Execution")

    for i, mp in enumerate(mission.projects, 1):
        tag = "[PRIMARY]" if mp.is_primary else "[secondary]"
        print(f"\n  {tag} {mp.project.title}")
        if mp.leader:
            print(f"  Leader: {mp.leader.name}")

        # Handle any interruptions mid-mission
        if i == 2 and mission.interruptions:     # inject mid-mission
            event = mission.interruptions[0]
            mission.interruptions_handled[0] = True
            _handle_interruption(event, gs)

        # Auto-assign and execute the project
        auto_assign_crew_to_project(mp.project, gs.roster)
        auto_execute_project(
            mp.project,
            player_stats=gs.character["stats"],
            ship_condition=gs.ship_condition,
            crew_fatigue=gs.crew_fatigue,
        )

        outcome = mp.project.outcome
        succeeded = mp.project.success_count()
        total = len(mp.project.tasks)
        print(f"  Tasks: {succeeded}/{total} succeeded — {colored_outcome(outcome)}")

        gs.career.tasks_completed += total
        gs.score.tasks_completed += total
        gs.career.tasks_full_success += succeeded
        gs.score.tasks_full_success += succeeded

        gs.career.projects_led += 1
        gs.score.projects_completed += 1
        if outcome in ("success", "partial"):
            gs.career.projects_succeeded += 1

    # Remaining interruptions
    for j, event in enumerate(mission.interruptions):
        if not mission.interruptions_handled[j]:
            mission.interruptions_handled[j] = True
            _handle_interruption(event, gs)

    mission.determine_outcome()
    mission_outcome = mission.outcome

    blank()
    hr("═")
    print(f"\n  Mission outcome: {colored_outcome(mission_outcome)}")
    if mission.lives_at_stake and mission_outcome in ("success", "partial"):
        frac = 1.0 if mission_outcome == "success" else 0.5
        saved = int(mission.lives_at_stake * frac)
        print(f"  Lives protected: {saved:,}")
        gs.score.lives_saved += saved
    elif mission.lives_at_stake and mission_outcome == "failure":
        lost = mission.lives_at_stake
        print(f"  {RED}Lives lost: {lost:,}{RESET}")
        gs.score.lives_lost += lost
    blank()

    gs.career.missions_commanded += 1
    gs.score.missions_completed += 1
    if mission_outcome in ("success", "partial"):
        gs.career.missions_succeeded += 1
    lives_note = f"{mission.lives_at_stake:,} lives at stake" if mission.lives_at_stake else ""
    gs.log_event("mission", mission.title, mission_outcome, lives_note)

    gs.crew_fatigue = min(100, gs.crew_fatigue + random.randint(5, 12))
    if mission_outcome == "failure":
        gs.ship_condition = max(0, gs.ship_condition - random.randint(5, 15))

    pause()
    check_promotion(gs)


# ---------------------------------------------------------------------------
# CAPTAIN LEVEL — voyage management
# ---------------------------------------------------------------------------

VOYAGE_TYPES = ["Exploration", "Diplomacy", "Federation Support",
                "Scientific Survey", "Border Patrol"]
VOYAGE_DURATIONS = ["short", "standard", "extended"]
VOYAGE_DURATION_LABELS = {
    "short":    "Short  (3 months,  3–4 missions)",
    "standard": "Standard (6 months, 5–7 missions)",
    "extended": "Extended (1 year, 10–14 missions)",
}


def select_voyage(gs: GameState) -> Voyage:
    clear()
    header("Voyage Selection")
    wrap("Choose your next deployment type:")
    blank()
    for i, vtype in enumerate(VOYAGE_TYPES, 1):
        descs = VOYAGE_DESCRIPTIONS.get(vtype, [""])
        print(f"    [{i}]  {vtype}")
        print(f"         {descs[0]}")
    blank()
    type_idx = int(prompt("Voyage type", valid=[str(i) for i in range(1, 6)])) - 1
    voyage_type = VOYAGE_TYPES[type_idx]

    blank()
    wrap("Choose duration:")
    blank()
    for i, dur in enumerate(VOYAGE_DURATIONS, 1):
        print(f"    [{i}]  {VOYAGE_DURATION_LABELS[dur]}")
    blank()
    dur_idx = int(prompt("Duration", valid=["1", "2", "3"])) - 1
    duration = VOYAGE_DURATIONS[dur_idx]

    voyage = generate_voyage(voyage_type, duration, gs.roster, gs.career.rank_idx)
    return voyage


def run_voyage(gs: GameState):
    """Captain-level voyage execution."""
    voyage = select_voyage(gs)

    clear()
    header(f"Voyage — {voyage.voyage_type}")
    wrap(voyage.description)
    print(f"\n  Duration: {voyage.duration}  |  Missions: {len(voyage.missions)}"
          f"  |  {voyage.months_duration} months")
    blank()
    pause()

    # Execute each mission in the voyage
    for i, vm in enumerate(voyage.missions, 1):
        mission = vm.mission
        clear()
        section(f"Mission {i}/{len(voyage.missions)} — {mission.title}")
        wrap(mission.objective)
        threat_color = {"low": GREEN, "medium": YELLOW, "high": RED}.get(mission.threat_level, "")
        print(f"  Threat: {threat_color}{mission.threat_level.upper()}{RESET}"
              f"  |  Lives at stake: {mission.lives_at_stake:,}")
        blank()

        # Auto-run the mission (Captain views summaries)
        for j, mp in enumerate(mission.projects, 1):
            auto_assign_crew_to_project(mp.project, gs.roster)
            auto_execute_project(
                mp.project,
                player_stats=gs.character["stats"],
                ship_condition=gs.ship_condition,
                crew_fatigue=gs.crew_fatigue,
            )
            succeeded = mp.project.success_count()
            total = len(mp.project.tasks)
            tag = "[primary]" if mp.is_primary else "[secondary]"
            print(f"  {tag} {mp.project.title}: "
                  f"{succeeded}/{total} — {colored_outcome(mp.project.outcome)}")

            gs.career.tasks_completed += total
            gs.score.tasks_completed += total
            gs.career.tasks_full_success += mp.project.success_count()
            gs.career.projects_led += 1
            gs.score.projects_completed += 1
            if mp.project.outcome in ("success", "partial"):
                gs.career.projects_succeeded += 1

        # Interruptions at Captain level — strategic choice
        for k, event in enumerate(mission.interruptions):
            _handle_interruption(event, gs)

        mission.determine_outcome()
        mo = mission.outcome

        blank()
        print(f"  Mission {i} outcome: {colored_outcome(mo)}")
        if mission.lives_at_stake:
            if mo in ("success", "partial"):
                frac = 1.0 if mo == "success" else 0.5
                saved = int(mission.lives_at_stake * frac)
                print(f"  Lives protected: {saved:,}")
                gs.score.lives_saved += saved
            else:
                print(f"  {RED}Lives lost: {mission.lives_at_stake:,}{RESET}")
                gs.score.lives_lost += mission.lives_at_stake

        gs.career.missions_commanded += 1
        gs.score.missions_completed += 1
        if mo in ("success", "partial"):
            gs.career.missions_succeeded += 1

        gs.crew_fatigue = min(100, gs.crew_fatigue + random.randint(4, 10))
        gs.clock.advance(gs.clock.month + 1 if len(voyage.missions) <= 4 else 1)
        blank()
        pause()

    voyage.determine_outcome()
    vo = voyage.outcome
    gs.career.voyages_completed += 1
    gs.score.voyages_completed += 1
    gs.clock.advance(1)
    gs.score.years_reached = gs.clock.year

    gs.log_event("voyage", f"{voyage.voyage_type} voyage ({voyage.duration})", vo,
                 f"{len(voyage.missions)} missions")

    clear()
    header(f"Voyage Complete — {voyage.voyage_type}")
    print(f"  Missions: {sum(1 for vm in voyage.missions if vm.mission.outcome != 'failure')}"
          f"/{len(voyage.missions)} successful")
    print(f"  Voyage outcome: {colored_outcome(vo)}")
    print(f"  Current date: {gs.clock.display()}")
    blank()
    pause()
    check_promotion(gs)


# ---------------------------------------------------------------------------
# EXPEDITION — endgame five-year loop
# ---------------------------------------------------------------------------

ENCOUNTER_TYPES = [
    "An overwhelming force has appeared on sensors — classification unknown. "
    "Weapons output exceeds anything in the Starfleet database. They are hailing you.",
    "Something has emerged from the anomaly. It is not a ship. "
    "It fills the viewscreen. Shields are failing before a single weapon has fired.",
    "Three vessels — Borg configuration. "
    "Long-range sensors show forty more behind them. There is no corridor of escape.",
    "The entity is non-corporeal and has already entered the ship's computer core. "
    "Every system is compromised. You have minutes before life support fails.",
]

ENCOUNTER_RESPONSES = [
    ("Fight — hold your ground and make them work for it",
     "fight", 30, 0,
     "You order battle stations. The crew fights with everything they have. "
     "It is not enough — but they know that, and they fight anyway."),
    ("Surrender — cease resistance and protect as many lives as possible",
     "surrender", 70, 0,
     "You signal your intent to surrender. Most of the crew survives. "
     "The ship does not."),
    ("Negotiate — attempt diplomatic contact while shields hold",
     "negotiate", 60, 100,
     "You open a channel and speak. They listen — briefly. "
     "The outcome is partial, and costly, and better than nothing."),
    ("Sacrifice play — order crew to escape pods; you remain at the helm",
     "sacrifice", 85, 500,
     "You order all hands to abandon ship. You stay. "
     "The crew escapes. You do not. The ship does what you needed it to do."),
    ("Self-destruct — deny the enemy the ship; launch pods first",
     "self_destruct", 25, 200,
     "You launch the escape pods and key in the destruct sequence. "
     "Some make it out. The ship goes out on your terms."),
    ("Flee — emergency warp, full power to engines",
     "flee", 35, 0,
     "You call for emergency warp. The ship shudders. "
     "Not everyone makes it — but some do."),
]


def encounter_sequence(gs: GameState):
    clear()
    header("Final Encounter")
    blank()

    encounter_text = random.choice(ENCOUNTER_TYPES)
    wrap(encounter_text)
    blank()
    wrap("There is no solution to this. There is only the decision you make now.")
    blank()
    pause()

    # Check crew loyalty — average loyalty is the modifier
    named = gs.roster.named_crew
    avg_loyalty = sum(c.loyalty for c in named) / len(named) if named else 50
    loyalty_factor = avg_loyalty / 100.0

    section("Your Response")
    for i, (label, _, _, _, _) in enumerate(ENCOUNTER_RESPONSES, 1):
        print(f"    [{i}]  {label}")
    blank()

    choice = int(prompt("Final order", valid=[str(i) for i in range(1, 7)])) - 1
    label, response_type, base_survival_pct, bonus, flavor = ENCOUNTER_RESPONSES[choice]

    # Apply loyalty modifier (loyalty reduces/increases survival ceiling)
    adjusted_survival = min(95, int(base_survival_pct * loyalty_factor * 1.5))
    crew_total = len(named)
    crew_surviving = int(crew_total * (adjusted_survival / 100))

    blank()
    hr("═")
    blank()
    wrap(flavor)
    blank()
    print(f"  Crew survival: {crew_surviving}/{crew_total} ({adjusted_survival}%)")
    if response_type == "sacrifice":
        print(f"  {BGREEN}Captain {gs.character['name']} did not survive.{RESET}")
    blank()

    # Score effects
    gs.score.crew_alive_at_encounter = crew_total
    gs.score.crew_survived_encounter = crew_surviving
    gs.score.encounter_bonus = bonus
    gs.score.years_reached = gs.clock.year


def run_expedition(gs: GameState):
    """Five-year expedition loop."""
    import random as _random

    gs.expedition_active = True
    gs.clock = GameClock(year=1, month=1)

    # Set encounter year (weighted toward Years 3–5)
    encounter_year = _random.choices([3, 4, 5], weights=[20, 35, 45])[0]
    gs.clock.encounter_year = encounter_year
    gs.clock.encounter_set = True

    clear()
    header("The Five-Year Expedition")
    blank()
    wrap(f"Captain {gs.character['name']}, you have accepted command of a deep-space expedition.")
    wrap("Five years. Whatever you find out there, whatever happens — the ship will not return.")
    wrap("You know this. The crew knows this. You ship out anyway.")
    blank()
    wrap("Make it count.")
    blank()
    pause()

    while gs.clock.year <= 5 and not gs.game_over:
        if gs.clock.encounter_now():
            gs.game_over = True
            gs.game_over_reason = "encounter"
            encounter_sequence(gs)
            break

        clear()
        header(f"Expedition Bridge — {gs.clock.display()}")
        print(f"  {gs.character['name']}  |  Captain")
        print(f"  Ship: {gs.ship_condition}% condition  |  Crew fatigue: {gs.crew_fatigue}%")
        print(f"  Score: {gs.score.total():,}")
        blank()
        print("  ACTIONS:")
        print("    [1]  Begin next voyage")
        print("    [2]  Free time")
        print("    [3]  View status")
        print("    [4]  View score")
        print("    [c]  Crew logs")
        print("    [h]  Mission history")
        print()

        action = prompt("Action", valid=["1", "2", "3", "4", "c", "h"])

        if action == "1":
            run_voyage(gs)
        elif action == "2":
            free_time(gs)
        elif action == "3":
            show_status(gs)
        elif action == "4":
            show_score(gs)
        elif action == "c":
            show_crew_logs(gs)
        elif action == "h":
            show_history(gs)

    if not gs.game_over:
        # Five years elapsed without encounter — trigger anyway
        gs.game_over = True
        gs.game_over_reason = "five_years"
        encounter_sequence(gs)


# ---------------------------------------------------------------------------
# FINAL SCORE
# ---------------------------------------------------------------------------

def final_score_display(gs: GameState):
    clear()
    header("End of Service Record")
    blank()

    name = gs.character["name"]
    rank = gs.career.rank
    reason = gs.game_over_reason

    if reason == "encounter":
        wrap(f"The record of Captain {name} ends here.")
        wrap("The ship was destroyed. The circumstances are in the log.")
    elif reason == "five_years":
        wrap(f"Five years. The expedition of Captain {name} is complete.")

    blank()
    section("Career Summary")
    print(f"  Name:          {name}")
    print(f"  Final rank:    {rank}")
    print(f"  Tasks:         {gs.career.tasks_completed}")
    print(f"  Projects:      {gs.career.projects_led}")
    print(f"  Missions:      {gs.career.missions_commanded}")
    print(f"  Voyages:       {gs.career.voyages_completed}")
    if gs.career.career_flags:
        print(f"  Career flags:  {len(gs.career.career_flags)}")
    blank()

    section("Final Score")
    for line in gs.score.breakdown():
        print(line)
    blank()
    pause()


# ---------------------------------------------------------------------------
# MAIN LOOP
# ---------------------------------------------------------------------------

def main():
    clear()
    header("Final Frontier")
    blank()
    wrap("A Star Trek career strategy game.")
    wrap("Build your career. Lead your crew. Make it count.")
    blank()
    pause()

    # Character creation
    character = create_character()

    # Generate starting ship
    header("First Posting")
    wrap(f"Ensign {character['name']}, you are assigned to a scout-class vessel.")
    print()
    roster = generate_roster("scout", seed=random.randint(0, 9999))
    print(f"  Crew manifest complete. {len(roster.named_crew)} named crew members.")
    pause()

    # Initialize game state
    gs = GameState(
        character={**character, "rank": "Ensign"},
        roster=roster,
        score=Score(),
        career=CareerRecord(rank="Ensign", rank_idx=0),
        clock=GameClock(),
        ship_condition=100,
        crew_fatigue=20,
        xp=0,
    )

    # Main dispatch loop
    running = True
    while running and not gs.game_over:
        rank = gs.career.rank
        clear()
        header("Bridge")
        print(f"  {gs.character['name']}  —  {rank}")
        print(f"  Ship: {gs.ship_condition}%  |  Fatigue: {gs.crew_fatigue}%"
              f"  |  XP: {gs.xp}/5")
        print(f"  Promotion: {gs.career.promotion_progress()}")
        blank()

        # Menu options change by rank
        if rank in ("Ensign", "Lieutenant JG"):
            print("    [1]  Begin next task")
        elif rank in ("Lieutenant", "Lt. Commander"):
            print("    [1]  Begin next project")
        elif rank == "Commander":
            print("    [1]  Begin next mission")
        elif rank == "Captain":
            print("    [1]  Begin next voyage")
            print("    [e]  Accept five-year expedition command")

        print("    [2]  Free time")
        print("    [3]  View status")
        print("    [4]  View score")
        print("    [c]  Crew logs")
        print("    [h]  Mission history")
        print("    [5]  Quit")
        blank()

        valid = ["1", "2", "3", "4", "5", "c", "h"]
        if rank == "Captain":
            valid.append("e")

        action = prompt("Action", valid=valid)

        if action == "e" and rank == "Captain":
            run_expedition(gs)
            break

        elif action == "1":
            if rank in ("Ensign", "Lieutenant JG"):
                run_task(gs)
            elif rank in ("Lieutenant", "Lt. Commander"):
                run_project(gs)
            elif rank == "Commander":
                run_mission(gs)
            elif rank == "Captain":
                run_voyage(gs)

        elif action == "2":
            free_time(gs)

        elif action == "3":
            show_status(gs)

        elif action == "4":
            show_score(gs)

        elif action == "c":
            show_crew_logs(gs)

        elif action == "h":
            show_history(gs)

        elif action == "5":
            clear()
            blank()
            wrap(f"Officer {gs.character['name']} — {gs.career.rank} — service record closed.")
            wrap("Starfleet thanks you for your service.")
            blank()
            running = False

    if gs.game_over:
        final_score_display(gs)


if __name__ == "__main__":
    main()
