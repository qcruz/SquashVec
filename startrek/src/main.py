"""
Final Frontier — command-line entry point.
Minimal playable loop: character creation, crew generation, scenario resolution.
"""

import random
import textwrap
import sys
import os

# Ensure project root is on path when run directly
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.engine.crew_generator import generate_roster
from src.engine.scenario_generator import generate_scenario, resolve
from src.engine.crew import STATS, RANK_STAT_BUDGET


# ---------------------------------------------------------------------------
# Terminal helpers
# ---------------------------------------------------------------------------

W = 72   # display width

def hr(char="─"):
    print(char * W)

def header(text):
    print()
    hr("═")
    print(f"  {text.upper()}")
    hr("═")

def section(text):
    print()
    hr("─")
    print(f"  {text}")
    hr("─")

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

RANK_NAMES = ["Ensign", "Lieutenant JG", "Lieutenant",
              "Lt. Commander", "Commander", "Captain"]


def create_character():
    header("Starfleet Academy — Character Creation")
    print()
    wrap("You have graduated from Starfleet Academy. Before your first posting,")
    wrap("we need to know who you are.")
    print()

    name = prompt("Enter your officer's name (e.g. J. Harrington)")
    if not name:
        name = "J. Harrington"

    print()
    section("Academy Focus")
    wrap("Your Academy focus shaped your foundational skills. Choose one:")
    print()

    for i, focus in enumerate(ACADEMY_FOCUSES, 1):
        bonus_str = ", ".join(f"{s} +{v}" for s, v in focus["bonuses"].items())
        print(f"    [{i}]  {focus['name']}")
        print(f"         {focus['desc']}")
        print(f"         Bonuses: {bonus_str}  |  Trait: {focus['trait']}")
        print()

    focus_idx = numbered_choice([f["name"] for f in ACADEMY_FOCUSES], "focus")
    chosen_focus = ACADEMY_FOCUSES[focus_idx]

    # Base stats: everyone starts at 3 in everything
    stats = {s: 3 for s in STATS}
    for stat, bonus in chosen_focus["bonuses"].items():
        stats[stat] = stats[stat] + bonus

    character = {
        "name": name,
        "rank": "Ensign",
        "rank_idx": 0,
        "focus": chosen_focus["name"],
        "trait": chosen_focus["trait"],
        "trait_desc": chosen_focus["trait_desc"],
        "stats": stats,
        "career_flags": [],
        "missions_completed": 0,
        "ship_condition": 100,
        "crew_fatigue": 20,
        "xp": 0,
    }

    print()
    section(f"Officer Profile — {name}")
    print(f"    Rank:   {character['rank']}")
    print(f"    Focus:  {character['focus']}")
    print(f"    Trait:  {character['trait']} — {character['trait_desc']}")
    print()
    print("    STATS:")
    for stat, val in stats.items():
        bar = "█" * val + "░" * (10 - val)
        print(f"      {stat:<14} {bar}  {val}/10")

    print()
    pause()
    return character


# ---------------------------------------------------------------------------
# Scenario display
# ---------------------------------------------------------------------------

TIER_LABELS = {
    "critical_success": "★ CRITICAL SUCCESS",
    "full_success":     "✓ SUCCESS",
    "partial":          "~ PARTIAL SUCCESS",
    "full_failure":     "✗ FAILURE",
    "critical_failure": "✗✗ CRITICAL FAILURE",
}

TIER_COLORS = {
    "critical_success": "\033[92m",   # bright green
    "full_success":     "\033[32m",   # green
    "partial":          "\033[33m",   # yellow
    "full_failure":     "\033[31m",   # red
    "critical_failure": "\033[91m",   # bright red
}
RESET = "\033[0m"


def display_scenario(scenario, character, roster):
    clear()
    header(f"Mission Scenario — {scenario.title}")

    # Hook
    print()
    wrap(scenario.hook)
    print()
    wrap(scenario.situation)

    # Crew status bar
    section("Bridge Status")
    for option in scenario.options:
        crew = scenario.assigned_crew.get(option.station)
        crew_name = crew.name if crew else "—"
        crew_stat = crew.stat(option.stat) if crew else 0
        if option.station == "Command":
            print(f"    Command       You ({character['name']})")
        else:
            morale = f" [morale {crew.morale}%]" if crew else ""
            print(f"    {option.station:<14} {crew_name:<22}  {option.stat} {crew_stat}{morale}")

    # Options
    section("Response Options")
    for i, option in enumerate(scenario.options, 1):
        crew = scenario.assigned_crew.get(option.station)
        crew_stat = crew.stat(option.stat) if crew else 0
        player_stat = character["stats"].get(option.stat, 1)

        # Rough success probability hint
        total_mod = (player_stat - 5) + ((crew_stat - 5) // 2 if crew else 0)
        avg_roll = 10.5 + total_mod
        success_chance = max(5, min(95, int(50 + (avg_roll - option.difficulty) * 5)))

        cost_str = ""
        if option.cost_type != "none":
            cost_labels = {1: "minor", 2: "moderate", 3: "significant"}
            cost_str = f"  [{cost_labels.get(option.cost_amount,'?')} {option.cost_type} cost]"

        print(f"\n    [{i}]  {option.label}")
        print(f"         Station: {option.station}  |  Stat: {option.stat}"
              f"  |  ~{success_chance}% success{cost_str}")
        if option.flavor:
            wrap(option.flavor, indent=9)

    print()


def display_result(result, character):
    print()
    hr("═")
    tier_label = TIER_LABELS.get(result.tier, result.tier.upper())
    color = TIER_COLORS.get(result.tier, "")
    print(f"\n  {color}{tier_label}{RESET}")
    print()

    # Roll breakdown
    print(f"  Roll: {result.base_roll} (d20)"
          f"  +{result.player_stat - 5} (stat)"
          f"  +{(result.crew_stat - 5) // 2 if result.crew_stat else 0} (crew)")
    if result.condition_mod:
        print(f"  Condition modifier: {result.condition_mod:+d}")
    print(f"  Total: {result.total}  vs  Difficulty: {result.difficulty}")

    # Hidden trigger — shown only as flavor, not the number
    if result.hidden_triggered:
        print(f"\n  {result.crew_member.name} performed exceptionally.")
        if result.crew_member:
            discovered = result.crew_member.discover_hidden_stat(result.stat_used)
            if discovered:
                print(f"  ★ You've identified a hidden talent: "
                      f"{result.crew_member.name} has an exceptional {discovered.stat} aptitude.")

    print()
    hr()
    print()
    wrap(result.outcome_text)
    print()


# ---------------------------------------------------------------------------
# Stats advancement (simple XP system for MVP)
# ---------------------------------------------------------------------------

def award_xp(character, result):
    xp_gain = {
        "critical_success": 3,
        "full_success": 2,
        "partial": 1,
        "full_failure": 1,        # failure teaches too
        "critical_failure": 2,    # especially catastrophic failure
    }.get(result.tier, 1)

    character["xp"] += xp_gain
    character["missions_completed"] += 1

    # Every 5 XP: offer a stat increase
    if character["xp"] >= 5:
        character["xp"] -= 5
        return True
    return False


def level_up(character):
    section("Advancement — Choose a Stat to Improve")
    wrap("Experience has sharpened your abilities. Choose one stat to improve by 1.")
    print()

    improvable = [s for s in STATS if character["stats"][s] < 10]
    for i, stat in enumerate(improvable, 1):
        val = character["stats"][stat]
        bar = "█" * val + "░" * (10 - val)
        print(f"    [{i}]  {stat:<14} {bar}  {val} → {val+1}")

    idx = numbered_choice(improvable, "stat")
    chosen = improvable[idx]
    character["stats"][chosen] += 1
    print(f"\n    {chosen} increased to {character['stats'][chosen]}.")
    pause()


# ---------------------------------------------------------------------------
# Free time
# ---------------------------------------------------------------------------

FREE_TIME_OPTIONS = [
    ("Study",            "Improve one stat by 1 (temporary boost this tour)."),
    ("Physical Training","Reduces injury severity from combat scenarios."),
    ("Crew Time",        "Spend time with a crew member — improves their loyalty."),
    ("Rest",             "Reduce crew fatigue. No stat gain."),
]

def free_time(character, roster):
    header("Free Time")
    wrap("Between missions you have time to spend as you choose.")
    wrap("Choose an activity:")
    print()
    for i, (name, desc) in enumerate(FREE_TIME_OPTIONS, 1):
        print(f"    [{i}]  {name}")
        print(f"         {desc}")
    print()

    choice = int(prompt("Enter activity number",
                       valid=[str(i) for i in range(1, len(FREE_TIME_OPTIONS)+1)])) - 1
    name, _ = FREE_TIME_OPTIONS[choice]

    if name == "Study":
        section("Study")
        wrap("Which stat do you focus on?")
        for i, s in enumerate(STATS, 1):
            print(f"    [{i}]  {s} (current: {character['stats'][s]})")
        sidx = int(prompt("Stat", valid=[str(i) for i in range(1, len(STATS)+1)])) - 1
        stat = STATS[sidx]
        character["stats"][stat] = min(10, character["stats"][stat] + 1)
        print(f"\n    {stat} improved to {character['stats'][stat]} for this tour.")

    elif name == "Physical Training":
        wrap("You log extra hours in the gym. You'll be harder to put down.")
        character.setdefault("physical_training", 0)
        character["physical_training"] += 1

    elif name == "Crew Time":
        section("Crew Time")
        named = roster.named_crew[:10]   # show first 10
        wrap("Choose a crew member to spend time with:")
        for i, m in enumerate(named, 1):
            print(f"    [{i}]  {m.name} ({m.rank}, {m.department})  Loyalty: {m.loyalty}")
        cidx = int(prompt("Crew member",
                         valid=[str(i) for i in range(1, len(named)+1)])) - 1
        chosen = named[cidx]
        chosen.loyalty = min(100, chosen.loyalty + random.randint(5, 12))
        print(f"\n    Time with {chosen.name} was well spent.")
        print(f"    Loyalty: {chosen.loyalty}")

        # 40% chance to discover a hidden stat
        if random.random() < 0.40 and chosen.undiscovered_hidden_count() > 0:
            discovered = chosen.discover_hidden_stat()
            if discovered:
                print(f"\n    ★ Something clicks. {chosen.name} has a natural aptitude")
                print(f"      for {discovered.stat} you hadn't noticed before.")

    elif name == "Rest":
        recovery = random.randint(8, 18)
        character["crew_fatigue"] = max(0, character["crew_fatigue"] - recovery)
        print(f"\n    Crew fatigue reduced to {character['crew_fatigue']}%.")

    pause()


# ---------------------------------------------------------------------------
# Status display
# ---------------------------------------------------------------------------

def show_status(character, roster):
    header(f"Officer Status — {character['name']}")
    print(f"  Rank:              {character['rank']}")
    print(f"  Focus:             {character['focus']}")
    print(f"  Trait:             {character['trait']}")
    print(f"  Missions:          {character['missions_completed']}")
    print(f"  XP to next boost:  {5 - character['xp']} remaining")
    print(f"  Ship condition:    {character['ship_condition']}%")
    print(f"  Crew fatigue:      {character['crew_fatigue']}%")
    print()
    print("  STATS:")
    for stat, val in character["stats"].items():
        bar = "█" * val + "░" * (10 - val)
        print(f"    {stat:<14} {bar}  {val}/10")

    if character["career_flags"]:
        print()
        print("  CAREER FLAGS:")
        for flag in character["career_flags"]:
            print(f"    • {flag}")

    print()
    print("  SENIOR CREW (loyalty):")
    for m in sorted(roster.named_crew[:12], key=lambda c: c.loyalty, reverse=True):
        bar = "█" * (m.loyalty // 10) + "░" * (10 - m.loyalty // 10)
        flag = " [STRAINED]" if m.is_strained() else ""
        print(f"    {m.name:<22} {m.rank:<16} {bar} {m.loyalty}{flag}")

    pause()


# ---------------------------------------------------------------------------
# Main game loop
# ---------------------------------------------------------------------------

def main():
    clear()
    header("Final Frontier")
    print()
    wrap("A Star Trek career strategy game.")
    wrap("Make decisions. Build your crew. Earn your captain's chair.")
    print()
    pause()

    # Character creation
    character = create_character()

    # Generate ship's crew
    header("First Posting")
    wrap(f"Ensign {character['name']}, you are assigned to a scout-class vessel.")
    wrap("Generating crew manifest...")
    print()
    roster = generate_roster("scout", seed=random.randint(0, 9999))
    print(f"  Crew manifest complete. {len(roster.named_crew)} named crew members.")
    print(f"  Vessel total: {roster.ship_class} — 75 crew.")
    pause()

    # Main loop
    running = True
    while running:
        clear()
        header("Bridge")
        print(f"  Officer:  {character['name']}  ({character['rank']})")
        print(f"  Ship:     Condition {character['ship_condition']}%  |  "
              f"Crew fatigue {character['crew_fatigue']}%")
        print(f"  Missions: {character['missions_completed']}  |  "
              f"XP: {character['xp']}/5")
        print()
        print("  ACTIONS:")
        print("    [1]  Run a scenario")
        print("    [2]  Free time")
        print("    [3]  View status")
        print("    [4]  View crew roster")
        print("    [5]  Quit")
        print()

        action = prompt("Action", valid=["1", "2", "3", "4", "5"])

        if action == "1":
            # Generate and run a scenario
            scenario = generate_scenario(
                rank_idx=character["rank_idx"],
                roster=roster,
            )
            display_scenario(scenario, character, roster)

            # Player chooses an option
            valid_choices = [str(i) for i in range(1, len(scenario.options) + 1)]
            choice_idx = int(prompt("Choose your response", valid=valid_choices)) - 1

            # Confirm
            option = scenario.options[choice_idx]
            print(f"\n  You chose: {option.label}")
            print(f"  Station: {option.station}  |  Stat: {option.stat}")
            confirm = prompt("Confirm? (y/n)", valid=["y", "n"])
            if confirm == "n":
                continue

            # Resolve
            result = resolve(
                scenario=scenario,
                option_idx=choice_idx,
                player_stats=character["stats"],
                ship_condition=character["ship_condition"],
                crew_fatigue=character["crew_fatigue"],
            )
            display_result(result, character)

            # Apply ship condition effects
            if result.tier in ("full_failure", "critical_failure"):
                dmg = random.randint(3, 10)
                character["ship_condition"] = max(0, character["ship_condition"] - dmg)
                print(f"  Ship condition: -{dmg}% → {character['ship_condition']}%")
            character["crew_fatigue"] = min(100, character["crew_fatigue"] + random.randint(2, 6))

            # Career flags
            if scenario.has_ethical_weight and result.tier in ("full_failure", "critical_failure"):
                flag = f"[{scenario.title}] Ethical failure — {scenario.category}"
                character["career_flags"].append(flag)
                print(f"\n  Career flag added: {flag}")

            # XP and possible level-up
            leveled = award_xp(character, result)
            if leveled:
                level_up(character)

            pause()

        elif action == "2":
            free_time(character, roster)

        elif action == "3":
            show_status(character, roster)

        elif action == "4":
            clear()
            header("Crew Roster")
            print(roster.summary())
            pause()

        elif action == "5":
            clear()
            print()
            wrap(f"Commander {character['name']} — {character['missions_completed']} "
                 f"missions completed.")
            wrap("Starfleet thanks you for your service.")
            print()
            running = False


if __name__ == "__main__":
    main()
