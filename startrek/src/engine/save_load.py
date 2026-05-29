"""
Save/load system for Starsleep.
Serializes GameState to JSON files in ~/.starsleep/saves/
"""

import json
import datetime
from pathlib import Path

SAVE_DIR = Path.home() / ".starsleep" / "saves"
SAVE_VERSION = 2


def ensure_save_dir():
    SAVE_DIR.mkdir(parents=True, exist_ok=True)


# ---------------------------------------------------------------------------
# File listing
# ---------------------------------------------------------------------------

def list_saves() -> list:
    """Return list of save metadata dicts, newest first."""
    ensure_save_dir()
    saves = []
    for f in sorted(SAVE_DIR.glob("*.json"), key=lambda p: p.stat().st_mtime, reverse=True):
        try:
            with open(f) as fp:
                data = json.load(fp)
            saves.append({
                "path":      str(f),
                "save_name": data.get("save_name", f.stem),
                "char_name": data.get("character", {}).get("name", "Unknown"),
                "rank":      data.get("career", {}).get("rank", "?"),
                "phase":     data.get("game_phase", "farpoint"),
                "score":     data.get("score", {}).get("tasks_completed", 0),
                "date":      data.get("save_date", ""),
            })
        except Exception:
            pass
    return saves


# ---------------------------------------------------------------------------
# Roster serialization
# ---------------------------------------------------------------------------

def _crew_to_dict(cm) -> dict:
    return {
        "name":        cm.name,
        "species":     cm.species,
        "rank":        cm.rank,
        "department":  cm.department,
        "is_officer":  cm.is_officer,
        "is_named":    getattr(cm, "is_named", True),
        "stats":       dict(cm.stats),
        "hidden_stats": [
            {"stat": hs.stat, "value": hs.value,
             "trigger_chance": hs.trigger_chance, "discovered": hs.discovered}
            for hs in cm.hidden_stats
        ],
        "loyalty": cm.loyalty,
        "morale":  cm.morale,
        "stress":  cm.stress,
    }


def _dict_to_crew(data: dict):
    from src.engine.crew import CrewMember, HiddenStat
    hidden = [
        HiddenStat(
            stat=h["stat"], value=h["value"],
            trigger_chance=h["trigger_chance"], discovered=h["discovered"],
        )
        for h in data.get("hidden_stats", [])
    ]
    return CrewMember(
        name=data["name"], species=data["species"],
        rank=data["rank"], department=data["department"],
        is_officer=data["is_officer"],
        stats=data["stats"], hidden_stats=hidden,
        loyalty=data.get("loyalty", 50),
        morale=data.get("morale", 70),
        stress=data.get("stress", 20),
        is_named=data.get("is_named", True),
    )


def _roster_to_dict(roster) -> dict:
    pools = {
        dept: {"department": p.department,
               "total_count": p.total_count,
               "named_count": p.named_count}
        for dept, p in roster.department_pools.items()
    }
    return {
        "ship_class":       roster.ship_class,
        "named_crew":       [_crew_to_dict(c) for c in roster.named_crew],
        "department_pools": pools,
    }


def _dict_to_roster(data: dict):
    from src.engine.crew import Roster, DepartmentPool
    r = Roster(ship_class=data["ship_class"])
    for cd in data.get("named_crew", []):
        r.add(_dict_to_crew(cd))
    for dept, pd in data.get("department_pools", {}).items():
        r.department_pools[dept] = DepartmentPool(
            department=pd["department"],
            total_count=pd["total_count"],
            named_count=pd["named_count"],
        )
    return r


# ---------------------------------------------------------------------------
# Save
# ---------------------------------------------------------------------------

def save_game(gs, save_name: str = None) -> str:
    """Write game state to disk. Returns the save file path."""
    ensure_save_dir()

    raw_name = save_name or gs.character.get("name", "save")
    safe = "".join(c for c in raw_name if c.isalnum() or c in " _-").strip()
    safe = safe.replace(" ", "_") or "save"
    filepath = SAVE_DIR / f"{safe}.json"

    data = {
        "version":    SAVE_VERSION,
        "save_name":  raw_name,
        "save_date":  datetime.datetime.now().isoformat(timespec="seconds"),
        "game_phase": gs.game_phase,

        "character": dict(gs.character),   # includes base_stats, stat_progress, stat_decay

        "roster": _roster_to_dict(gs.roster) if gs.roster else None,

        "score": {
            "tasks_completed":         gs.score.tasks_completed,
            "tasks_full_success":      gs.score.tasks_full_success,
            "projects_completed":      gs.score.projects_completed,
            "missions_completed":      gs.score.missions_completed,
            "voyages_completed":       gs.score.voyages_completed,
            "years_reached":           gs.score.years_reached,
            "lives_saved":             gs.score.lives_saved,
            "lives_lost":              gs.score.lives_lost,
            "crew_alive_at_encounter": gs.score.crew_alive_at_encounter,
            "crew_survived_encounter": gs.score.crew_survived_encounter,
            "commendations":           gs.score.commendations,
            "career_flags_negative":   gs.score.career_flags_negative,
            "mentor_relationships":    gs.score.mentor_relationships,
            "encounter_bonus":         gs.score.encounter_bonus,
        },

        "career": {
            "rank":                gs.career.rank,
            "rank_idx":            gs.career.rank_idx,
            "tasks_completed":     gs.career.tasks_completed,
            "tasks_full_success":  gs.career.tasks_full_success,
            "projects_led":        gs.career.projects_led,
            "projects_succeeded":  gs.career.projects_succeeded,
            "missions_commanded":  gs.career.missions_commanded,
            "missions_succeeded":  gs.career.missions_succeeded,
            "voyages_completed":   gs.career.voyages_completed,
            "mentor_endorsements": gs.career.mentor_endorsements,
            "career_flags":        list(gs.career.career_flags),
        },

        "clock": {
            "year":           gs.clock.year,
            "month":          gs.clock.month,
            "encounter_year": gs.clock.encounter_year,
            "encounter_set":  gs.clock.encounter_set,
        },

        "ship_condition":  gs.ship_condition,
        "crew_fatigue":    gs.crew_fatigue,
        "xp":              gs.xp,
        "expedition_active": gs.expedition_active,
        "game_over":       gs.game_over,
        "game_over_reason": gs.game_over_reason,
        "event_log":       list(gs.event_log),
    }

    with open(filepath, "w") as f:
        json.dump(data, f, indent=2)

    return str(filepath)


# ---------------------------------------------------------------------------
# Load
# ---------------------------------------------------------------------------

def load_game(filepath: str):
    """Load a save file and return a hydrated GameState."""
    from src.engine.game_state import GameState, Score, CareerRecord, GameClock

    with open(filepath) as f:
        data = json.load(f)

    sc = data["score"]
    score = Score(
        tasks_completed=sc["tasks_completed"],
        tasks_full_success=sc["tasks_full_success"],
        projects_completed=sc["projects_completed"],
        missions_completed=sc["missions_completed"],
        voyages_completed=sc["voyages_completed"],
        years_reached=sc["years_reached"],
        lives_saved=sc["lives_saved"],
        lives_lost=sc["lives_lost"],
        crew_alive_at_encounter=sc["crew_alive_at_encounter"],
        crew_survived_encounter=sc["crew_survived_encounter"],
        commendations=sc["commendations"],
        career_flags_negative=sc["career_flags_negative"],
        mentor_relationships=sc["mentor_relationships"],
        encounter_bonus=sc["encounter_bonus"],
    )

    cd = data["career"]
    career = CareerRecord(
        rank=cd["rank"],
        rank_idx=cd["rank_idx"],
        tasks_completed=cd["tasks_completed"],
        tasks_full_success=cd["tasks_full_success"],
        projects_led=cd["projects_led"],
        projects_succeeded=cd["projects_succeeded"],
        missions_commanded=cd["missions_commanded"],
        missions_succeeded=cd["missions_succeeded"],
        voyages_completed=cd["voyages_completed"],
        mentor_endorsements=cd["mentor_endorsements"],
        career_flags=cd["career_flags"],
    )

    ck = data["clock"]
    clock = GameClock(
        year=ck["year"], month=ck["month"],
        encounter_year=ck["encounter_year"], encounter_set=ck["encounter_set"],
    )

    roster = _dict_to_roster(data["roster"]) if data.get("roster") else None

    gs = GameState(
        character=data["character"],
        roster=roster,
        score=score,
        career=career,
        clock=clock,
        ship_condition=data["ship_condition"],
        crew_fatigue=data["crew_fatigue"],
        xp=data["xp"],
        expedition_active=data.get("expedition_active", False),
        game_over=data.get("game_over", False),
        game_over_reason=data.get("game_over_reason", ""),
        event_log=data.get("event_log", []),
        game_phase=data.get("game_phase", "farpoint"),
    )
    return gs
