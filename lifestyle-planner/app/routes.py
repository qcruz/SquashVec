import json
import calendar as cal_module
from datetime import date
from flask import (
    Blueprint, render_template, request, redirect,
    url_for, session, jsonify, flash, Response,
)
from .db import (
    get_user, create_user, get_tag_profiles,
    get_itinerary_for_date, save_itinerary_for_date,
    get_planned_dates, get_completions_for_date,
    log_completion, update_tag_profile_after_completion,
    get_recent_completions, update_user_tags, update_user_settings,
    get_exploration_stats, update_single_tag_interest,
    get_discovery_level, set_discovery_level, export_user_data,
    remove_user_tag,
    get_custom_events_for_date, add_custom_event, delete_custom_event, complete_custom_event,
)
from .planner import generate_itinerary, reroll_block, get_block_alternatives, BLOCKS, get_event_neighborhood, get_day_estimated_cost
from .seed_data import (
    AVAILABLE_TAGS, TAG_DISPLAY, TAG_CATEGORIES, EVENT_NEIGHBORHOODS,
    NEIGHBORHOOD_LABELS, CAT_COLORS, AUSTIN_SPECIAL_EVENTS,
)


# ── Day view helpers ──────────────────────────────────────────────────────────

def _placeholder_weather() -> list[dict]:
    """Placeholder hourly forecast for Austin TX. Replace with live API in Phase 1."""
    hours = [
        ("8 AM",  74, "🌤️", "Partly cloudy"),
        ("9 AM",  77, "☀️",  "Sunny"),
        ("10 AM", 80, "☀️",  "Sunny"),
        ("11 AM", 84, "☀️",  "Sunny"),
        ("12 PM", 87, "⛅",  "Mostly sunny"),
        ("1 PM",  89, "⛅",  "Partly cloudy"),
        ("2 PM",  91, "⛅",  "Partly cloudy"),
        ("3 PM",  91, "⛅",  "Partly cloudy"),
        ("4 PM",  90, "🌤️", "Clearing"),
        ("5 PM",  89, "🌤️", "Clearing"),
        ("6 PM",  87, "☀️",  "Clear"),
        ("7 PM",  85, "☀️",  "Clear"),
        ("8 PM",  83, "🌙",  "Clear"),
        ("9 PM",  80, "🌙",  "Clear"),
        ("10 PM", 78, "🌙",  "Clear"),
    ]
    return [{"hour": h, "temp": t, "icon": i, "cond": c} for h, t, i, c in hours]


def _recent_category_counts(recent: list[dict]) -> list[tuple[str, int]]:
    """Count non-skipped recent completions per tag category."""
    tag_to_cat = {tag: cat for cat, tags in TAG_CATEGORIES.items() for tag in tags}
    cat_counts: dict[str, int] = {}
    for comp in recent:
        if comp.get("skipped"):
            continue
        raw = comp.get("tags") or "[]"
        tags = json.loads(raw) if isinstance(raw, str) else raw
        for tag in tags:
            cat = tag_to_cat.get(tag)
            if cat:
                cat_counts[cat] = cat_counts.get(cat, 0) + 1
    return sorted(cat_counts.items(), key=lambda x: x[1], reverse=True)

bp = Blueprint("main", __name__)

BLOCK_META = {
    "morning":   {"label": "Morning",   "icon": "☀",  "time": "8 AM – 12 PM"},
    "midday":    {"label": "Midday",    "icon": "◑",  "time": "12 PM – 3 PM"},
    "afternoon": {"label": "Afternoon", "icon": "◐",  "time": "3 PM – 7 PM"},
    "dinner":    {"label": "Dinner",    "icon": "◆",  "time": "7 PM – 9 PM"},
    "nighttime": {"label": "Nighttime", "icon": "●",  "time": "9 PM – midnight"},
}

SKIP_REASONS = [
    ("not_my_thing",  "Not my thing"),
    ("bad_timing",    "Bad timing today"),
    ("too_far",       "Too far"),
    ("too_expensive", "Too expensive"),
]


def _current_user():
    uid = session.get("user_id")
    if uid:
        return get_user(uid)
    # Single-user dev mode: auto-login as DEFAULT_USER_ID if set
    from flask import current_app
    default_uid = current_app.config.get("DEFAULT_USER_ID")
    if default_uid:
        user = get_user(default_uid)
        if user:
            session["user_id"]   = user["id"]
            session["user_name"] = user["name"]
            return user
    return None

def _require_user():
    user = _current_user()
    if not user:
        return None, redirect(url_for("main.onboarding"))
    return user, None


# ── Root / redirects ─────────────────────────────────────────────────────────

@bp.route("/")
def index():
    user = _current_user()
    if not user:
        return redirect(url_for("main.onboarding"))
    return redirect(url_for("main.day_view", date_str=date.today().isoformat()))

@bp.route("/itinerary")
def itinerary():
    return redirect(url_for("main.day_view", date_str=date.today().isoformat()))


# ── Onboarding ────────────────────────────────────────────────────────────────

@bp.route("/onboarding", methods=["GET", "POST"])
def onboarding():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        if not name:
            flash("Please enter your name.")
            return redirect(url_for("main.onboarding"))
        selected_tags = request.form.getlist("tags")
        wake_time     = request.form.get("wake_time", "7:00")
        schedule_type = request.form.get("schedule_type", "flexible")
        night_owl     = request.form.get("night_owl") == "on"
        user_id = create_user(
            name, selected_tags,
            {"wake_time": wake_time, "schedule_type": schedule_type, "discovery_level": 30},
            night_owl=night_owl,
        )
        session["user_id"]   = user_id
        session["user_name"] = name
        return redirect(url_for("main.day_view", date_str=date.today().isoformat()))
    return render_template("onboarding.html", tag_categories=TAG_CATEGORIES, tag_display=TAG_DISPLAY)


# ── Day view ─────────────────────────────────────────────────────────────────

def _get_filter_state():
    return {
        "free_only":  session.get("free_only", False),
        "max_budget": session.get("max_budget", 0),
    }

def _build_day_data(user, date_str: str, tag_profiles: dict, discovery_level: int, filters: dict) -> dict:
    """Build a single day's data dict (blocks, completions, metadata)."""
    from datetime import date as _date
    try:
        day_date = _date.fromisoformat(date_str)
    except ValueError:
        day_date = _date.today()

    blocks  = get_itinerary_for_date(user["id"], date_str)
    is_past = day_date < _date.today()

    if not blocks and not is_past:
        blocks = generate_itinerary(
            user["id"], tag_profiles,
            night_owl=bool(user["night_owl"]),
            discovery_level=discovery_level,
            free_only=filters["free_only"],
            max_budget=filters["max_budget"],
        )
        save_itinerary_for_date(user["id"], date_str, blocks)

    blocks = blocks or {}

    # Ensure neighborhood is populated on loaded events
    for b, ev in blocks.items():
        if ev and "neighborhood" not in ev:
            ev["neighborhood"] = get_event_neighborhood(ev)

    # Compute link pairs: adjacent blocks sharing a neighborhood
    block_list  = [b for b in BLOCKS if blocks.get(b)]
    link_pairs  = set()
    for i in range(len(block_list) - 1):
        a, b_ = block_list[i], block_list[i + 1]
        na = blocks[a].get("neighborhood", "")
        nb = blocks[b_].get("neighborhood", "")
        if na and nb and na == nb and na != "home":
            link_pairs.add((a, b_))

    return {
        "blocks":          blocks,
        "day_completions": get_completions_for_date(user["id"], date_str),
        "custom_events":   get_custom_events_for_date(user["id"], date_str),
        "day_date":        day_date,
        "date_str":        date_str,
        "is_today":        day_date == _date.today(),
        "is_past":         is_past,
        "estimated_cost":  round(get_day_estimated_cost(blocks), 2),
        "link_pairs":      link_pairs,
    }


@bp.route("/day/<date_str>")
def day_view(date_str: str):
    user, redir = _require_user()
    if redir: return redir

    try:
        date.fromisoformat(date_str)
    except ValueError:
        return redirect(url_for("main.day_view", date_str=date.today().isoformat()))

    try:
        num_days = max(1, min(7, int(request.args.get("days", 1))))
    except (TypeError, ValueError):
        num_days = 1

    tag_profiles    = get_tag_profiles(user["id"])
    discovery_level = get_discovery_level(user["id"])
    filters         = _get_filter_state()

    from datetime import timedelta
    start = date.fromisoformat(date_str)
    days_data = [
        _build_day_data(user, (start + timedelta(days=i)).isoformat(),
                        tag_profiles, discovery_level, filters)
        for i in range(num_days)
    ]

    # Extra context for today's daily brief layout
    is_brief = num_days == 1
    exploration       = get_exploration_stats(user["id"]) if is_brief else {}
    recent_raw        = get_recent_completions(user["id"], limit=40) if is_brief else []
    recent_by_cat     = _recent_category_counts(recent_raw) if is_brief else []
    weather_hours     = _placeholder_weather() if is_brief else []

    block_alternatives: dict[str, list] = {}
    weekly_spotlight = None
    if is_brief:
        blocks = days_data[0]["blocks"]
        for bk, ev in blocks.items():
            if ev:
                block_alternatives[bk] = get_block_alternatives(
                    bk, tag_profiles, ev.get("title", ""),
                    n=3, discovery_level=discovery_level,
                    free_only=filters["free_only"],
                )
        import json as _json
        user_tags_set    = set(_json.loads(user["tags"] or "[]"))
        weekly_spotlight = _get_weekly_spotlight(tag_profiles, user_tags_set)

    return render_template(
        "day.html",
        user=user,
        block_meta=BLOCK_META,
        skip_reasons=SKIP_REASONS,
        all_blocks=BLOCKS,
        discovery_level=discovery_level,
        filters=filters,
        date_str=date_str,
        today_str=date.today().isoformat(),
        day_date=days_data[0]["day_date"],
        is_today=days_data[0]["is_today"],
        is_past=days_data[0]["is_past"],
        num_days=num_days,
        days_data=days_data,
        neighborhood_labels=NEIGHBORHOOD_LABELS,
        custom_event_types=_CUSTOM_EVENT_TYPES,
        # Brief layout extras
        is_brief=is_brief,
        exploration=exploration,
        recent_by_category=recent_by_cat,
        weather_hours=weather_hours,
        block_alternatives=block_alternatives,
        weekly_spotlight=weekly_spotlight,
    )


@bp.route("/surprise")
def surprise_me():
    """Generate a fully random itinerary for today, ignoring tag weights, then show it."""
    user, redir = _require_user()
    if redir: return redir
    tag_profiles = get_tag_profiles(user["id"])
    # discovery_level=100 maximises randomness; weights still exist but noise dominates
    blocks = generate_itinerary(
        user["id"], tag_profiles,
        night_owl=bool(user["night_owl"]),
        discovery_level=100,
        free_only=False,
        max_budget=0,
    )
    today_str = date.today().isoformat()
    save_itinerary_for_date(user["id"], today_str, blocks)
    return redirect(url_for("main.day_view", date_str=today_str))


# ── Custom events ──────────────────────────────────────────────────────────────

_CUSTOM_EVENT_TYPES = [
    ("appointment",   "Doctor / appointment"),
    ("coffee",        "Coffee date"),
    ("meal",          "Meal / dining"),
    ("hike",          "Hike / walk"),
    ("workout",       "Workout / gym"),
    ("errand",        "Errand / task"),
    ("social",        "Social / party"),
    ("travel",        "Travel / commute"),
    ("work",          "Work / meeting"),
    ("birthday",      "Birthday / anniversary"),
    ("other",         "Other"),
]

@bp.route("/day/<date_str>/add_custom", methods=["POST"])
def add_custom_event_route(date_str: str):
    user, redir = _require_user()
    if redir: return redir
    title    = request.form.get("title", "").strip()
    if not title:
        return redirect(url_for("main.day_view", date_str=date_str))
    block    = request.form.get("block", "anytime")
    etype    = request.form.get("event_type", "other")
    location = request.form.get("location", "").strip()
    notes    = request.form.get("notes", "").strip()
    try:
        cost = max(0.0, float(request.form.get("cost") or 0))
    except ValueError:
        cost = 0.0
    try:
        dur = max(5, int(request.form.get("duration_min") or 60))
    except ValueError:
        dur = 60
    recurrence = request.form.get("recurrence", "none")
    add_custom_event(user["id"], date_str, title, block, etype, location, cost, dur, notes, recurrence)
    return redirect(url_for("main.day_view", date_str=date_str))


@bp.route("/day/<date_str>/delete_custom/<int:event_id>", methods=["POST"])
def delete_custom_event_route(date_str: str, event_id: int):
    user, redir = _require_user()
    if redir: return redir
    delete_custom_event(user["id"], event_id)
    return redirect(url_for("main.day_view", date_str=date_str))


@bp.route("/day/<date_str>/complete_custom/<int:event_id>", methods=["POST"])
def complete_custom_event_route(date_str: str, event_id: int):
    user, redir = _require_user()
    if redir: return redir
    rating_str = request.form.get("rating")
    rating = int(rating_str) if rating_str and rating_str.isdigit() else None
    complete_custom_event(user["id"], event_id, rating)
    return redirect(url_for("main.day_view", date_str=date_str))


@bp.route("/day/<date_str>/regenerate", methods=["POST"])
def regenerate_day(date_str: str):
    user, redir = _require_user()
    if redir: return redir
    tag_profiles    = get_tag_profiles(user["id"])
    discovery_level = get_discovery_level(user["id"])
    filters         = _get_filter_state()
    blocks = generate_itinerary(
        user["id"], tag_profiles,
        night_owl=bool(user["night_owl"]),
        discovery_level=discovery_level,
        free_only=filters["free_only"],
        max_budget=filters["max_budget"],
    )
    save_itinerary_for_date(user["id"], date_str, blocks)
    num_days = request.form.get("num_days", "1")
    return redirect(url_for("main.day_view", date_str=date_str, days=num_days))


@bp.route("/day/<date_str>/reroll/<block>", methods=["POST"])
def reroll(date_str: str, block: str):
    user, redir = _require_user()
    if redir: return jsonify({"error": "not logged in"}), 401
    if block not in BLOCKS:
        return jsonify({"error": "invalid block"}), 400

    body          = request.get_json(silent=True) or {}
    linked        = bool(body.get("linked", False))
    filters       = _get_filter_state()
    blocks        = get_itinerary_for_date(user["id"], date_str) or {}
    current_title = (blocks.get(block) or {}).get("title", "")
    tag_profiles  = get_tag_profiles(user["id"])
    discovery_level = get_discovery_level(user["id"])

    # If linked: find neighborhood of the adjacent block (prev or next)
    prefer_neighborhood = None
    if linked:
        block_idx = BLOCKS.index(block)
        for adj_idx in [block_idx - 1, block_idx + 1]:
            if 0 <= adj_idx < len(BLOCKS):
                adj = BLOCKS[adj_idx]
                adj_ev = blocks.get(adj)
                if adj_ev:
                    prefer_neighborhood = adj_ev.get("neighborhood") or get_event_neighborhood(adj_ev)
                    break

    new_event = reroll_block(
        block, tag_profiles, current_title,
        discovery_level=discovery_level,
        free_only=filters["free_only"],
        prefer_neighborhood=prefer_neighborhood,
    )
    if new_event:
        blocks[block] = new_event
        save_itinerary_for_date(user["id"], date_str, blocks)

    return jsonify({"ok": True, "event": new_event, "block": block})


@bp.route("/day/<date_str>/set/<block>", methods=["POST"])
def set_block_event(date_str: str, block: str):
    """Swap in a specific alternative event chosen from the right sidebar."""
    user, redir = _require_user()
    if redir: return jsonify({"error": "not logged in"}), 401
    if block not in BLOCKS:
        return jsonify({"error": "invalid block"}), 400

    event = request.get_json(silent=True)
    if not event or not event.get("title"):
        return jsonify({"error": "invalid event"}), 400

    blocks = get_itinerary_for_date(user["id"], date_str) or {}
    ev = event.copy()
    ev["neighborhood"]  = get_event_neighborhood(ev)
    tag_profiles        = get_tag_profiles(user["id"])
    discovery_level     = get_discovery_level(user["id"])
    from .planner import _planner_note
    ev["planner_note"]  = _planner_note(ev, tag_profiles, discovery_level)
    blocks[block] = ev
    save_itinerary_for_date(user["id"], date_str, blocks)
    return jsonify({"ok": True, "event": ev, "block": block})


# ── Discovery level AJAX ──────────────────────────────────────────────────────

@bp.route("/settings/discovery", methods=["POST"])
def update_discovery():
    user, redir = _require_user()
    if redir: return jsonify({"error": "not logged in"}), 401
    try:
        level = int(request.json.get("level", 30))
    except (TypeError, ValueError):
        return jsonify({"error": "bad value"}), 400
    set_discovery_level(user["id"], level)
    return jsonify({"ok": True, "level": level})


# ── Filter settings (free_only, max_budget) ───────────────────────────────────

@bp.route("/settings/filters", methods=["POST"])
def update_filters():
    user, redir = _require_user()
    if redir: return jsonify({"error": "not logged in"}), 401
    data = request.get_json(silent=True) or {}
    if "free_only" in data:
        session["free_only"] = bool(data["free_only"])
    if "max_budget" in data:
        try:
            session["max_budget"] = max(0, float(data["max_budget"]))
        except (TypeError, ValueError):
            pass
    return jsonify({"ok": True, "free_only": session.get("free_only", False),
                    "max_budget": session.get("max_budget", 0)})


# ── Tag interest AJAX ─────────────────────────────────────────────────────────

@bp.route("/settings/interest", methods=["POST"])
def update_interest():
    user, redir = _require_user()
    if redir: return jsonify({"error": "not logged in"}), 401
    data = request.json or {}
    tag  = data.get("tag", "")
    try:
        value = max(0.0, min(1.0, float(data.get("value", 0.5))))
    except (TypeError, ValueError):
        return jsonify({"error": "bad value"}), 400
    if tag not in TAG_DISPLAY:
        return jsonify({"error": "unknown tag"}), 400
    update_single_tag_interest(user["id"], tag, value)
    return jsonify({"ok": True})


@bp.route("/settings/remove_tag", methods=["POST"])
def remove_tag_route():
    user, redir = _require_user()
    if redir: return jsonify({"error": "not logged in"}), 401
    data = request.json or {}
    tag  = data.get("tag", "")
    if tag not in TAG_DISPLAY:
        return jsonify({"error": "unknown tag"}), 400
    remove_user_tag(user["id"], tag)
    return jsonify({"ok": True})


# ── Feedback ──────────────────────────────────────────────────────────────────

@bp.route("/event/accept", methods=["POST"])
def accept_event():
    user, redir = _require_user()
    if redir: return redir
    block      = request.form.get("block")
    title      = request.form.get("title")
    tags       = json.loads(request.form.get("tags", "[]"))
    date_str   = request.form.get("date", date.today().isoformat())
    rating_str = request.form.get("rating")
    rating     = int(rating_str) if rating_str and rating_str.isdigit() else None
    log_completion(user["id"], title, block, tags, date_str=date_str, rating=rating)
    update_tag_profile_after_completion(user["id"], tags, rating)
    return redirect(url_for("main.day_view", date_str=date_str))


@bp.route("/event/skip", methods=["POST"])
def skip_event():
    user, redir = _require_user()
    if redir: return redir
    block    = request.form.get("block")
    title    = request.form.get("title")
    tags     = json.loads(request.form.get("tags", "[]"))
    date_str = request.form.get("date", date.today().isoformat())
    reason   = request.form.get("reason", "")
    log_completion(user["id"], title, block, tags, date_str=date_str, skipped=True, skip_reason=reason)
    from .db import get_db
    from .planner import compute_tag_weight
    db = get_db()
    for tag in tags:
        row = db.execute(
            "SELECT * FROM tag_profiles WHERE user_id=? AND tag=?", (user["id"], tag),
        ).fetchone()
        if row:
            new_base = max(0.1, row["base_interest"] - 0.03)
            updated  = dict(row)
            updated["base_interest"] = new_base
            db.execute(
                "UPDATE tag_profiles SET base_interest=?, current_weight=? WHERE user_id=? AND tag=?",
                (new_base, compute_tag_weight(updated), user["id"], tag),
            )
    db.commit()
    return redirect(url_for("main.day_view", date_str=date_str))


# ── Weekly spotlight helper ───────────────────────────────────────────────────

def _get_weekly_spotlight(tag_profiles: dict, user_tags: set) -> dict | None:
    """
    Once-per-week 'new to you' spotlight: a consistent (seed-based) activity
    outside the user's current active interests.
    """
    import random as _rnd
    today = date.today()
    rng = _rnd.Random(today.year * 100 + today.isocalendar()[1])

    # Prefer tags never completed and not already in user's interest list
    unexplored = [
        tag for tag, p in tag_profiles.items()
        if not p.get("last_completed") and tag not in user_tags
    ]
    if not unexplored:
        unexplored = [
            tag for tag, p in tag_profiles.items()
            if p.get("base_interest", 0.5) < 0.4 and tag not in user_tags
        ]
    if not unexplored:
        return None

    from .seed_data import SEED_EVENTS, TAG_DISPLAY
    spotlight_tag = rng.choice(unexplored)
    candidates = [e for e in SEED_EVENTS if spotlight_tag in e.get("tags", [])]
    if not candidates:
        return None

    ev = rng.choice(candidates).copy()
    ev["spotlight_tag"]       = spotlight_tag
    ev["spotlight_tag_label"] = TAG_DISPLAY.get(spotlight_tag, spotlight_tag.replace("_", " ").title())
    return ev


# ── Calendar helpers ──────────────────────────────────────────────────────────

def _tag_cat_color_map() -> dict[str, str]:
    """Build a tag → hex color lookup from TAG_CATEGORIES + CAT_COLORS."""
    result = {}
    for cat, tags in TAG_CATEGORIES.items():
        color = CAT_COLORS.get(cat, "#888888")
        for tag in tags:
            result[tag] = color
    return result

_TAG_CAT_COLOR: dict[str, str] | None = None  # module-level cache


def _get_tag_cat_color() -> dict[str, str]:
    global _TAG_CAT_COLOR
    if _TAG_CAT_COLOR is None:
        _TAG_CAT_COLOR = _tag_cat_color_map()
    return _TAG_CAT_COLOR


def _compute_pay_days(ctx: dict, year: int) -> set[str]:
    from datetime import timedelta
    freq = ctx.get("payday_frequency")
    if not freq:
        return set()
    year_start = date(year, 1, 1)
    year_end   = date(year, 12, 31)
    pay_days: set[str] = set()
    if freq in ("weekly", "biweekly"):
        ref_str = ctx.get("payday_start")
        if not ref_str:
            return set()
        try:
            ref = date.fromisoformat(ref_str)
        except ValueError:
            return set()
        step = timedelta(weeks=1 if freq == "weekly" else 2)
        # Rewind to first occurrence on or after year_start
        d = ref
        while d > year_start:
            d -= step
        while d <= year_end:
            if d >= year_start:
                pay_days.add(d.isoformat())
            d += step
    elif freq == "monthly_1st":
        for m in range(1, 13):
            pay_days.add(date(year, m, 1).isoformat())
    elif freq == "monthly_15th":
        for m in range(1, 13):
            pay_days.add(date(year, m, 15).isoformat())
    elif freq == "monthly_1st_15th":
        for m in range(1, 13):
            pay_days.add(date(year, m,  1).isoformat())
            pay_days.add(date(year, m, 15).isoformat())
    return pay_days


def _hex_to_rgba(hex_color: str, alpha: float = 0.18) -> str:
    h = hex_color.lstrip("#")
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return f"rgba({r},{g},{b},{alpha})"


def _calendar_date_meta(user_id: int, year: int) -> dict[str, dict]:
    """Per-date metadata: category colors, bg color, completion flag, first activity title."""
    from .db import get_db
    tag_color = _get_tag_cat_color()
    db = get_db()
    itin_rows = db.execute(
        "SELECT date, blocks_json FROM daily_itineraries WHERE user_id=? AND date LIKE ?",
        (user_id, f"{year}-%"),
    ).fetchall()
    comp_rows = db.execute(
        "SELECT DISTINCT date FROM completions WHERE user_id=? AND date LIKE ? AND skipped=0",
        (user_id, f"{year}-%"),
    ).fetchall()
    completed = {r["date"] for r in comp_rows}
    result: dict[str, dict] = {}
    block_order = ["morning", "midday", "afternoon", "dinner", "nighttime"]
    for row in itin_rows:
        blocks      = json.loads(row["blocks_json"])
        colors:     list[str] = []
        seen_col:   set[str]  = set()
        cat_counts: dict[str, int] = {}
        first_title = ""
        for bname in block_order:
            b = blocks.get(bname)
            if not b:
                continue
            if not first_title:
                first_title = b.get("title", "")
            for tag in b.get("tags", []):
                c = tag_color.get(tag)
                if c:
                    cat_counts[c] = cat_counts.get(c, 0) + 1
                    if c not in seen_col:
                        seen_col.add(c)
                        colors.append(c)
        # Dominant category = most tag hits
        dominant = max(cat_counts, key=cat_counts.get) if cat_counts else ""
        result[row["date"]] = {
            "colors":   colors[:4],
            "bg_color": _hex_to_rgba(dominant, 0.18) if dominant else "",
            "completed": row["date"] in completed,
            "title":    first_title,
        }
    return result


# ── Calendar ──────────────────────────────────────────────────────────────────

@bp.route("/calendar")
@bp.route("/calendar/<int:year>")
def calendar_view(year: int = None):
    user, redir = _require_user()
    if redir: return redir
    today = date.today()
    if year is None:
        year = today.year
    ctx           = json.loads(user["context"] or "{}")
    planned_dates = get_planned_dates(user["id"])
    date_meta     = _calendar_date_meta(user["id"], year)
    pay_days      = _compute_pay_days(ctx, year)
    months_data   = [
        {
            "name":      cal_module.month_name[m],
            "abbr":      cal_module.month_abbr[m],
            "month_num": m,
            "weeks":     cal_module.monthcalendar(year, m),
        }
        for m in range(1, 13)
    ]
    return render_template(
        "calendar.html",
        user=user,
        year=year,
        prev_year=year - 1,
        next_year=year + 1,
        months=months_data,
        today=today,
        planned_dates=planned_dates,
        weekdays=["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        date_meta=date_meta,
        pay_days=pay_days,
        special_events=AUSTIN_SPECIAL_EVENTS,
        cat_colors=CAT_COLORS,
        ctx=ctx,
    )


# ── Profile ───────────────────────────────────────────────────────────────────

@bp.route("/profile")
def profile():
    user, redir = _require_user()
    if redir: return redir

    tag_profiles    = get_tag_profiles(user["id"])
    recent          = get_recent_completions(user["id"], limit=30)
    ctx             = json.loads(user["context"] or "{}")
    user_tags       = set(json.loads(user["tags"] or "[]"))
    exploration     = get_exploration_stats(user["id"])
    discovery_level = get_discovery_level(user["id"])
    filters         = _get_filter_state()

    # Active tag profiles for slider display (anything selected or frequently done)
    active_profiles = {
        tag: p for tag, p in tag_profiles.items()
        if p.get("base_interest", 0) >= 0.4
    }
    # Sort by base_interest descending
    active_profiles_sorted = sorted(
        active_profiles.items(), key=lambda x: x[1]["base_interest"], reverse=True
    )

    sorted_all = sorted(
        tag_profiles.items(), key=lambda x: x[1].get("current_weight", 0), reverse=True
    )
    weight_display = [(t, p) for t, p in sorted_all if p.get("base_interest", 0) >= 0.4]

    return render_template(
        "profile.html",
        user=user,
        ctx=ctx,
        user_tags=user_tags,
        active_profiles=active_profiles_sorted,
        weight_display=weight_display,
        tag_display=TAG_DISPLAY,
        tag_categories=TAG_CATEGORIES,
        recent=recent,
        today=date.today().isoformat(),
        exploration=exploration,
        discovery_level=discovery_level,
        filters=filters,
    )


@bp.route("/profile/settings", methods=["POST"])
def update_settings():
    user, redir = _require_user()
    if redir: return redir
    update_user_settings(
        user["id"],
        wake_time              = request.form.get("wake_time", "7:00"),
        schedule_type          = request.form.get("schedule_type", "flexible"),
        night_owl              = request.form.get("night_owl") == "on",
        preferred_time_of_day  = request.form.get("preferred_time_of_day", "flexible"),
        max_activity_duration  = request.form.get("max_activity_duration", "0"),
        exercise_days_per_week = request.form.get("exercise_days_per_week", "3"),
        exercise_preference    = request.form.get("exercise_preference", "any"),
        outdoor_preference     = request.form.get("outdoor_preference", "mixed"),
        social_preference      = request.form.get("social_preference", "mixed"),
        budget_consciousness   = request.form.get("budget_consciousness", "moderate"),
        mobility               = request.form.get("mobility", "full"),
        avoid_crowds           = request.form.get("avoid_crowds") == "on",
        pet_friendly           = request.form.get("pet_friendly") == "on",
        payday_frequency       = request.form.get("payday_frequency", ""),
        payday_start           = request.form.get("payday_start", ""),
        home_neighborhood      = request.form.get("home_neighborhood", ""),
        transport_mode         = request.form.get("transport_mode", "driving"),
        dietary_restrictions   = request.form.getlist("dietary_restrictions"),
    )
    flash("Settings saved.")
    return redirect(url_for("main.profile"))


@bp.route("/profile/tags", methods=["POST"])
def update_tags():
    user, redir = _require_user()
    if redir: return redir
    update_user_tags(user["id"], request.form.getlist("tags"))
    flash("Interests updated.")
    return redirect(url_for("main.profile"))


# ── Export ────────────────────────────────────────────────────────────────────

@bp.route("/export")
def export_data():
    user, redir = _require_user()
    if redir: return redir
    data     = export_user_data(user["id"])
    filename = f"dayplanner-{user['name'].lower().replace(' ','-')}-{date.today().isoformat()}.json"
    return Response(
        json.dumps(data, indent=2),
        mimetype="application/json",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )


# ── Logout ────────────────────────────────────────────────────────────────────

@bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("main.onboarding"))
