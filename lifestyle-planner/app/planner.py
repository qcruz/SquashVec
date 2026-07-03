"""
Itinerary generation and tag frequency logic.
"""
from __future__ import annotations
import random
from datetime import date
from .seed_data import TAG_DEFAULT_INTERVALS, DEFAULT_INTERVAL, SEED_EVENTS, EVENT_NEIGHBORHOODS

BLOCKS = ["morning", "midday", "afternoon", "dinner", "nighttime"]
NIGHTTIME_DAYS = {4, 5}   # Friday=4, Saturday=5

# ── Seasonal tag boosts ────────────────────────────────────────────────────────
# Maps (month, ...) tuples → tags that get a small score boost this season.
_SEASON_TAGS: dict[tuple, list[str]] = {
    (6, 7, 8):   [  # Summer
        "swimming", "kayaking", "paddleboarding", "cycling", "parks",
        "festivals", "hiking", "stargazing", "bird_watching", "patio_dining",
        "rooftop_bars", "swimming_laps", "canoeing",
    ],
    (9, 10, 11): [  # Fall
        "hiking", "trail_running", "camping", "bird_watching", "nature_walks",
        "farmers_markets", "cooking", "rock_climbing", "cycling", "fishing",
        "bouldering", "mountain_biking", "photography",
    ],
    (12, 1, 2):  [  # Winter
        "coffee_shops", "bookstore_browsing", "art_galleries", "museums",
        "yoga", "meditation", "cooking", "board_games", "jazz", "film",
        "tea_culture", "pottery", "journaling", "knitting", "live_music",
    ],
    (3, 4, 5):   [  # Spring
        "gardening", "parks", "nature_walks", "cycling", "bird_watching",
        "plant_shopping", "yoga", "farmers_markets", "hiking", "photography",
        "picnics", "trail_running",
    ],
}


def _get_seasonal_tags() -> set[str]:
    """Return the set of tags to boost for the current calendar month."""
    month = date.today().month
    for months, tags in _SEASON_TAGS.items():
        if month in months:
            return set(tags)
    return set()


def _seasonal_bonus(event: dict, seasonal_tags: set[str]) -> float:
    """Small additive score bonus (up to 0.15) for seasonal tag matches."""
    if not seasonal_tags:
        return 0.0
    matches = sum(1 for t in event.get("tags", []) if t in seasonal_tags)
    return min(0.15, matches * 0.05)


# ── Tag Weight Computation ─────────────────────────────────────────────────────

def _recency_penalty(days_since: float | None, optimal: float) -> float:
    if days_since is None:
        return 1.0
    r = days_since / max(optimal, 1)
    if r >= 1.0:   return 1.0
    elif r >= 0.7: return 0.85
    elif r >= 0.4: return 0.65
    else:          return 0.4


def _gap_boost(days_since: float | None, optimal: float) -> float:
    if days_since is None:
        return 0.2
    r = days_since / max(optimal, 1)
    if r < 1.0:    return 0.0
    elif r < 1.5:  return 0.05
    elif r < 2.5:  return 0.15
    else:          return 0.25


def _saturation_adj(avg_30: float, avg_90: float) -> float:
    if not avg_30 or not avg_90:
        return 1.0
    t = avg_30 - avg_90
    if t >= -0.2:  return 1.0
    elif t >= -0.5: return 0.80
    elif t >= -0.9: return 0.60
    else:           return 0.35


def compute_tag_weight(profile: dict) -> float:
    w       = profile.get("base_interest", 0.5)
    optimal = profile.get("optimal_interval_days", DEFAULT_INTERVAL)
    last    = profile.get("last_completed")
    days_since = None
    if last:
        try:
            days_since = (date.today() - date.fromisoformat(last)).days
        except ValueError:
            pass
    w *= _recency_penalty(days_since, optimal)
    w  = min(1.0, w + _gap_boost(days_since, optimal))
    w *= _saturation_adj(profile.get("avg_rating_30d", 0), profile.get("avg_rating_90d", 0))
    return max(0.05, min(1.0, w))


# ── Event Scoring ──────────────────────────────────────────────────────────────

_DISCOVERY_FLOOR = 0.06  # every event has at least this weight in the selection pool

def _score_event(event: dict, tag_weights: dict[str, float]) -> float:
    tags = event.get("tags", [])
    if not tags:
        return _DISCOVERY_FLOOR
    return sum(tag_weights.get(t, _DISCOVERY_FLOOR) for t in tags) / len(tags)


def _planner_note(event: dict, tag_profiles: dict[str, dict], discovery_level: int = 30) -> str:
    tags = event.get("tags", [])

    if discovery_level >= 70:
        unexplored = [t for t in tags if not tag_profiles.get(t, {}).get("last_completed")]
        if unexplored:
            return "Something outside your usual — worth trying."

    for tag in tags:
        p = tag_profiles.get(tag)
        if not p:
            continue
        last = p.get("last_completed")
        if last:
            try:
                days = (date.today() - date.fromisoformat(last)).days
                optimal = p.get("optimal_interval_days", DEFAULT_INTERVAL)
                if days > optimal * 2:
                    return f"You haven't done anything {tag.replace('_',' ')}-related in a while."
            except ValueError:
                pass

    high = [(t, tag_profiles.get(t, {}).get("current_weight", 0))
            for t in tags if tag_profiles.get(t, {}).get("base_interest", 0) >= 0.8]
    if high:
        best = max(high, key=lambda x: x[1])[0]
        return f"Matches your strong interest in {best.replace('_', ' ')}."

    new_tags = [t for t in tags
                if tag_profiles.get(t, {}).get("last_completed") is None
                and tag_profiles.get(t, {}).get("base_interest", 0) >= 0.5]
    if new_tags:
        return "Something new to explore."

    matching = [t.replace("_", " ") for t in tags
                if tag_profiles.get(t, {}).get("base_interest", 0.3) >= 0.5]
    if matching:
        return f"Matched to your interest in {', '.join(matching[:2])}."

    return "A good option for today."


# ── Itinerary Generation ───────────────────────────────────────────────────────

def get_event_neighborhood(event: dict) -> str:
    return EVENT_NEIGHBORHOODS.get(event.get("title", ""), "other")


def get_day_estimated_cost(blocks: dict) -> float:
    """Sum cost_dollars for all non-None blocks."""
    return sum(
        (b.get("cost_dollars") or 0)
        for b in blocks.values()
        if b is not None
    )


def generate_itinerary(
    user_id: int,
    tag_profiles: dict[str, dict],
    night_owl: bool = False,
    discovery_level: int = 30,
    free_only: bool = False,
    max_budget: float = 0,       # 0 = no limit
) -> dict[str, dict | None]:
    tag_weights    = {tag: compute_tag_weight(p) for tag, p in tag_profiles.items()}
    explore        = discovery_level / 100.0
    today_dow      = date.today().weekday()
    running_cost   = 0.0
    seasonal_tags  = _get_seasonal_tags()

    active_blocks = [
        b for b in BLOCKS
        if not (b == "nighttime" and not night_owl and today_dow not in NIGHTTIME_DAYS)
    ]

    itinerary: dict[str, dict | None] = {}
    used_titles: set[str] = set()

    for block in BLOCKS:
        if block not in active_blocks:
            itinerary[block] = None
            continue

        candidates = [e for e in SEED_EVENTS
                      if e["block"] == block and e["title"] not in used_titles]

        if free_only:
            free_cands = [e for e in candidates if (e.get("cost_dollars") or 0) == 0]
            if free_cands:
                candidates = free_cands

        if max_budget > 0:
            budget_remaining = max_budget - running_cost
            affordable = [e for e in candidates if (e.get("cost_dollars") or 0) <= budget_remaining]
            if affordable:
                candidates = affordable

        if not candidates:
            itinerary[block] = None
            continue

        scored = [
            (
                e,
                (_score_event(e, tag_weights) + _seasonal_bonus(e, seasonal_tags)) * (1 - explore)
                + random.uniform(0, 0.9) * explore
                + random.uniform(0, 0.05)
            )
            for e in candidates
        ]
        # Weighted random selection: all events have some chance, higher-scored are much more likely
        weights = [max(_DISCOVERY_FLOOR, s) for _, s in scored]
        chosen = random.choices([e for e, _ in scored], weights=weights, k=1)[0].copy()
        chosen["planner_note"] = _planner_note(chosen, tag_profiles, discovery_level)
        chosen["score"]        = round(scored[0][1], 3)
        chosen["neighborhood"] = get_event_neighborhood(chosen)
        itinerary[block]       = chosen
        used_titles.add(chosen["title"])
        running_cost += chosen.get("cost_dollars") or 0

    return itinerary


def reroll_block(
    block: str,
    tag_profiles: dict[str, dict],
    current_title: str,
    discovery_level: int = 30,
    free_only: bool = False,
    prefer_neighborhood: str | None = None,
) -> dict | None:
    tag_weights   = {tag: compute_tag_weight(p) for tag, p in tag_profiles.items()}
    explore       = discovery_level / 100.0
    seasonal_tags = _get_seasonal_tags()

    candidates = [e for e in SEED_EVENTS
                  if e["block"] == block and e["title"] != current_title]

    if free_only:
        free_cands = [e for e in candidates if (e.get("cost_dollars") or 0) == 0]
        if free_cands:
            candidates = free_cands

    if not candidates:
        return None

    # Neighborhood preference: boost matching events' scores
    def _neighborhood_boost(e: dict) -> float:
        if prefer_neighborhood and prefer_neighborhood != "other":
            n = EVENT_NEIGHBORHOODS.get(e.get("title", ""), "other")
            return 0.3 if n == prefer_neighborhood else 0.0
        return 0.0

    scored = [
        (
            e,
            (_score_event(e, tag_weights) + _seasonal_bonus(e, seasonal_tags)) * (1 - explore)
            + random.uniform(0, 0.9) * explore
            + random.uniform(0, 0.1)
            + _neighborhood_boost(e)
        )
        for e in candidates
    ]
    weights = [max(_DISCOVERY_FLOOR, s) for _, s in scored]
    chosen = random.choices([e for e, _ in scored], weights=weights, k=1)[0].copy()
    chosen["planner_note"]  = _planner_note(chosen, tag_profiles, discovery_level)
    chosen["neighborhood"]  = get_event_neighborhood(chosen)
    return chosen


def get_block_alternatives(
    block: str,
    tag_profiles: dict[str, dict],
    current_title: str,
    n: int = 3,
    discovery_level: int = 30,
    free_only: bool = False,
) -> list[dict]:
    """Return the top-N alternative events for a block, excluding the current selection."""
    tag_weights   = {tag: compute_tag_weight(p) for tag, p in tag_profiles.items()}
    explore       = discovery_level / 100.0
    seasonal_tags = _get_seasonal_tags()

    candidates = [e for e in SEED_EVENTS
                  if e["block"] == block and e["title"] != current_title]
    if free_only:
        free_cands = [e for e in candidates if (e.get("cost_dollars") or 0) == 0]
        if free_cands:
            candidates = free_cands

    if not candidates:
        return []

    scored = [
        (e, (_score_event(e, tag_weights) + _seasonal_bonus(e, seasonal_tags)) * (1 - explore)
            + random.uniform(0, 0.35) * explore)
        for e in candidates
    ]
    scored.sort(key=lambda x: x[1], reverse=True)

    alts = []
    for ev, _ in scored[:n]:
        chosen = ev.copy()
        chosen["neighborhood"] = get_event_neighborhood(chosen)
        alts.append(chosen)
    return alts
