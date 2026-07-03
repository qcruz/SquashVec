import sqlite3
import json
from pathlib import Path
from flask import g

DB_PATH = Path(__file__).parent.parent / "data" / "planner.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    city        TEXT DEFAULT 'Austin, TX',
    tags        TEXT DEFAULT '[]',
    context     TEXT DEFAULT '{}',
    night_owl   INTEGER DEFAULT 0,
    created_at  TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tag_profiles (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id               INTEGER NOT NULL,
    tag                   TEXT NOT NULL,
    base_interest         REAL DEFAULT 0.3,
    current_weight        REAL DEFAULT 0.3,
    completions_7d        INTEGER DEFAULT 0,
    completions_30d       INTEGER DEFAULT 0,
    ratings_json          TEXT DEFAULT '[]',
    avg_rating_30d        REAL DEFAULT 0,
    avg_rating_90d        REAL DEFAULT 0,
    last_completed        TEXT,
    optimal_interval_days REAL DEFAULT 7,
    saturation_level      TEXT DEFAULT 'none',
    UNIQUE(user_id, tag)
);

CREATE TABLE IF NOT EXISTS events (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    title           TEXT NOT NULL,
    block           TEXT NOT NULL,
    tags            TEXT DEFAULT '[]',
    location        TEXT,
    address         TEXT,
    cost_label      TEXT DEFAULT 'Free',
    cost_dollars    REAL DEFAULT 0,
    duration_min    INTEGER DEFAULT 60,
    description     TEXT,
    distance_miles  REAL DEFAULT 2.0,
    cuisine         TEXT
);

CREATE TABLE IF NOT EXISTS completions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    event_title TEXT NOT NULL,
    block       TEXT NOT NULL,
    tags        TEXT DEFAULT '[]',
    date        TEXT NOT NULL,
    rating      INTEGER,
    skipped     INTEGER DEFAULT 0,
    skip_reason TEXT,
    created_at  TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_itineraries (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    date        TEXT NOT NULL,
    blocks_json TEXT NOT NULL,
    created_at  TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS custom_events (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL,
    date         TEXT NOT NULL,
    title        TEXT NOT NULL,
    block        TEXT DEFAULT 'anytime',
    event_type   TEXT DEFAULT 'other',
    location     TEXT DEFAULT '',
    cost         REAL DEFAULT 0,
    duration_min INTEGER DEFAULT 60,
    notes        TEXT DEFAULT '',
    completed    INTEGER DEFAULT 0,
    rating       INTEGER,
    recurrence   TEXT DEFAULT 'none',
    created_at   TEXT DEFAULT CURRENT_TIMESTAMP
);
"""


def get_db() -> sqlite3.Connection:
    if "db" not in g:
        DB_PATH.parent.mkdir(parents=True, exist_ok=True)
        conn = sqlite3.connect(str(DB_PATH), detect_types=sqlite3.PARSE_DECLTYPES)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        g.db = conn
    return g.db


def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db():
    db = get_db()
    db.executescript(SCHEMA)
    db.commit()
    # Migrations for existing databases
    for stmt in [
        "ALTER TABLE custom_events ADD COLUMN recurrence TEXT DEFAULT 'none'",
    ]:
        try:
            db.execute(stmt)
            db.commit()
        except Exception:
            pass  # Column already exists


# ── User helpers ───────────────────────────────────────────────────────────────

def get_user(user_id: int) -> sqlite3.Row | None:
    return get_db().execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()


def create_user(name: str, tags: list, context: dict, night_owl: bool = False) -> int:
    db = get_db()
    cur = db.execute(
        "INSERT INTO users (name, tags, context, night_owl) VALUES (?, ?, ?, ?)",
        (name, json.dumps(tags), json.dumps(context), int(night_owl)),
    )
    db.commit()
    user_id = cur.lastrowid
    _init_tag_profiles(user_id, tags)
    return user_id


def _init_tag_profiles(user_id: int, selected_tags: list):
    from .seed_data import AVAILABLE_TAGS, TAG_DEFAULT_INTERVALS, DEFAULT_INTERVAL
    db = get_db()
    selected_set = set(selected_tags)
    for tag in AVAILABLE_TAGS:
        base = 1.0 if tag in selected_set else 0.2
        interval = TAG_DEFAULT_INTERVALS.get(tag, DEFAULT_INTERVAL)
        db.execute(
            """INSERT OR IGNORE INTO tag_profiles
               (user_id, tag, base_interest, current_weight, optimal_interval_days)
               VALUES (?, ?, ?, ?, ?)""",
            (user_id, tag, base, base, interval),
        )
    db.commit()


def update_user_tags(user_id: int, selected_tags: list):
    from .seed_data import AVAILABLE_TAGS, TAG_DEFAULT_INTERVALS, DEFAULT_INTERVAL
    from .planner import compute_tag_weight
    db = get_db()
    selected_set = set(selected_tags)
    for tag in AVAILABLE_TAGS:
        row = db.execute(
            "SELECT * FROM tag_profiles WHERE user_id=? AND tag=?", (user_id, tag),
        ).fetchone()
        new_base = 0.85 if tag in selected_set else 0.15
        if row:
            updated = dict(row)
            updated["base_interest"] = new_base
            new_weight = compute_tag_weight(updated)
            db.execute(
                "UPDATE tag_profiles SET base_interest=?, current_weight=? WHERE user_id=? AND tag=?",
                (new_base, new_weight, user_id, tag),
            )
        else:
            interval = TAG_DEFAULT_INTERVALS.get(tag, DEFAULT_INTERVAL)
            db.execute(
                """INSERT OR IGNORE INTO tag_profiles
                   (user_id, tag, base_interest, current_weight, optimal_interval_days)
                   VALUES (?, ?, ?, ?, ?)""",
                (user_id, tag, new_base, new_base, interval),
            )
    db.execute("UPDATE users SET tags=? WHERE id=?", (json.dumps(selected_tags), user_id))
    db.commit()


def update_user_settings(user_id: int, wake_time: str, schedule_type: str, night_owl: bool, **extra_ctx):
    db = get_db()
    row = db.execute("SELECT context FROM users WHERE id=?", (user_id,)).fetchone()
    ctx = json.loads(row["context"] or "{}")
    ctx["wake_time"] = wake_time
    ctx["schedule_type"] = schedule_type
    ctx.update(extra_ctx)
    db.execute(
        "UPDATE users SET context=?, night_owl=? WHERE id=?",
        (json.dumps(ctx), int(night_owl), user_id),
    )
    db.commit()


# ── Tag profile helpers ────────────────────────────────────────────────────────

# How much base_interest shifts per star rating (3 = neutral, no change)
_RATING_DELTA = {1: -0.08, 2: -0.04, 3: 0.0, 4: +0.04, 5: +0.08}
# Minimum star rating that auto-adds a tag to the user's interest list
_AUTO_DISCOVER_MIN_RATING = 4
# Starting base_interest when a tag is auto-discovered via a good review
_AUTO_DISCOVER_BASE = {4: 0.30, 5: 0.45}

def get_tag_profiles(user_id: int) -> dict[str, dict]:
    rows = get_db().execute(
        "SELECT * FROM tag_profiles WHERE user_id = ?", (user_id,)
    ).fetchall()
    return {row["tag"]: dict(row) for row in rows}


def update_tag_profile_after_completion(user_id: int, tags: list, rating: int | None):
    from .planner import compute_tag_weight
    from .seed_data import TAG_DEFAULT_INTERVALS, DEFAULT_INTERVAL
    from datetime import date
    db = get_db()
    today = date.today().isoformat()

    delta = _RATING_DELTA.get(rating, 0.0) if rating is not None else 0.0

    # Load the user's current active tag list for auto-discovery
    user_row = db.execute("SELECT tags FROM users WHERE id=?", (user_id,)).fetchone()
    user_tags: list = json.loads(user_row["tags"] or "[]")
    user_tags_set = set(user_tags)
    user_tags_changed = False

    for tag in tags:
        row = db.execute(
            "SELECT * FROM tag_profiles WHERE user_id = ? AND tag = ?", (user_id, tag),
        ).fetchone()

        # Create profile for tags added to seed_data after account creation
        if not row:
            interval = TAG_DEFAULT_INTERVALS.get(tag, DEFAULT_INTERVAL)
            db.execute(
                """INSERT OR IGNORE INTO tag_profiles
                   (user_id, tag, base_interest, current_weight, optimal_interval_days)
                   VALUES (?, ?, ?, ?, ?)""",
                (user_id, tag, 0.15, 0.15, interval),
            )
            row = db.execute(
                "SELECT * FROM tag_profiles WHERE user_id=? AND tag=?", (user_id, tag),
            ).fetchone()
        if not row:
            continue

        ratings_list = json.loads(row["ratings_json"] or "[]")
        if rating is not None:
            ratings_list.append({"date": today, "rating": rating})
            ratings_list = ratings_list[-90:]

        recent_30 = [r["rating"] for r in ratings_list[-30:] if r.get("rating")]
        recent_90 = [r["rating"] for r in ratings_list[-90:] if r.get("rating")]
        avg_30 = sum(recent_30) / len(recent_30) if recent_30 else 0
        avg_90 = sum(recent_90) / len(recent_90) if recent_90 else 0

        updated = dict(row)

        # Shift base_interest by rating delta (floor 0.05, cap 1.0)
        if delta != 0.0:
            updated["base_interest"] = max(0.05, min(1.0, row["base_interest"] + delta))

        # Auto-discover: a strong positive review adds the tag to the user's interest list
        if (rating is not None and rating >= _AUTO_DISCOVER_MIN_RATING
                and tag not in user_tags_set):
            starter = _AUTO_DISCOVER_BASE.get(rating, 0.30)
            # Only boost if it would actually raise base_interest
            updated["base_interest"] = max(updated["base_interest"], starter)
            user_tags.append(tag)
            user_tags_set.add(tag)
            user_tags_changed = True

        updated.update(
            completions_7d=row["completions_7d"] + 1,
            completions_30d=row["completions_30d"] + 1,
            ratings_json=json.dumps(ratings_list),
            avg_rating_30d=avg_30,
            avg_rating_90d=avg_90,
            last_completed=today,
        )
        updated["current_weight"] = compute_tag_weight(updated)

        sat = "none"
        if avg_30 and avg_90:
            trend = avg_30 - avg_90
            if trend < -0.9:    sat = "high"
            elif trend < -0.5:  sat = "moderate"
            elif trend < -0.2:  sat = "mild"
        updated["saturation_level"] = sat

        db.execute(
            """UPDATE tag_profiles SET
               base_interest=?, completions_7d=?, completions_30d=?, ratings_json=?,
               avg_rating_30d=?, avg_rating_90d=?, last_completed=?,
               current_weight=?, saturation_level=?
               WHERE user_id=? AND tag=?""",
            (
                updated["base_interest"],
                updated["completions_7d"], updated["completions_30d"],
                updated["ratings_json"], updated["avg_rating_30d"],
                updated["avg_rating_90d"], updated["last_completed"],
                updated["current_weight"], updated["saturation_level"],
                user_id, tag,
            ),
        )

    if user_tags_changed:
        db.execute("UPDATE users SET tags=? WHERE id=?", (json.dumps(user_tags), user_id))

    db.commit()


# ── Itinerary persistence ──────────────────────────────────────────────────────

def get_itinerary_for_date(user_id: int, date_str: str) -> dict | None:
    row = get_db().execute(
        "SELECT blocks_json FROM daily_itineraries WHERE user_id=? AND date=?",
        (user_id, date_str),
    ).fetchone()
    return json.loads(row["blocks_json"]) if row else None


def save_itinerary_for_date(user_id: int, date_str: str, blocks: dict):
    db = get_db()
    db.execute(
        "INSERT OR REPLACE INTO daily_itineraries (user_id, date, blocks_json) VALUES (?, ?, ?)",
        (user_id, date_str, json.dumps(blocks)),
    )
    db.commit()


def get_planned_dates(user_id: int) -> set[str]:
    rows = get_db().execute(
        "SELECT date FROM daily_itineraries WHERE user_id=?", (user_id,)
    ).fetchall()
    return {row["date"] for row in rows}


def get_completions_for_date(user_id: int, date_str: str) -> dict[str, dict]:
    rows = get_db().execute(
        "SELECT * FROM completions WHERE user_id=? AND date=?", (user_id, date_str),
    ).fetchall()
    return {r["block"]: dict(r) for r in rows}


def log_completion(
    user_id: int, event_title: str, block: str, tags: list,
    date_str: str | None = None,
    rating: int | None = None, skipped: bool = False, skip_reason: str | None = None,
):
    from datetime import date
    db = get_db()
    db.execute(
        """INSERT INTO completions (user_id, event_title, block, tags, date, rating, skipped, skip_reason)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        (user_id, event_title, block, json.dumps(tags),
         date_str or date.today().isoformat(), rating, int(skipped), skip_reason),
    )
    db.commit()


def get_recent_completions(user_id: int, limit: int = 20) -> list[dict]:
    rows = get_db().execute(
        "SELECT * FROM completions WHERE user_id=? ORDER BY created_at DESC LIMIT ?",
        (user_id, limit),
    ).fetchall()
    return [dict(r) for r in rows]


# ── Exploration stats ──────────────────────────────────────────────────────────

EXPLORER_LEVELS = [
    (0,   "Newcomer"),
    (5,   "Explorer"),
    (15,  "Regular"),
    (30,  "Local"),
    (60,  "Insider"),
    (100, "Austin Native"),
]

def get_exploration_stats(user_id: int) -> dict:
    from .seed_data import AVAILABLE_TAGS
    rows = get_db().execute(
        "SELECT tags, event_title, block FROM completions WHERE user_id=? AND skipped=0",
        (user_id,),
    ).fetchall()

    total          = len(rows)
    unique_events  = set()
    unique_tags    = set()
    block_counts: dict[str, int] = {}

    for r in rows:
        unique_events.add(r["event_title"])
        for t in json.loads(r["tags"] or "[]"):
            unique_tags.add(t)
        block_counts[r["block"]] = block_counts.get(r["block"], 0) + 1

    level_name = EXPLORER_LEVELS[0][1]
    next_threshold = None
    for threshold, name in EXPLORER_LEVELS:
        if total >= threshold:
            level_name = name
        elif next_threshold is None:
            next_threshold = threshold

    level_idx = next((i for i, (_, n) in enumerate(EXPLORER_LEVELS) if n == level_name), 0)
    prev_t    = EXPLORER_LEVELS[level_idx][0]
    next_t    = next_threshold or (prev_t + 1)
    progress  = round((total - prev_t) / max(next_t - prev_t, 1) * 100)

    fav_block = max(block_counts, key=block_counts.get) if block_counts else None

    return {
        "total_completions":  total,
        "unique_events":      len(unique_events),
        "unique_tags":        len(unique_tags),
        "total_tags":         len(AVAILABLE_TAGS),
        "tag_coverage_pct":   round(len(unique_tags) / len(AVAILABLE_TAGS) * 100, 1),
        "explorer_level":     level_name,
        "next_level_at":      next_threshold,
        "level_progress_pct": min(100, progress),
        "favorite_block":     fav_block,
        "block_counts":       block_counts,
    }


def remove_user_tag(user_id: int, tag: str):
    """Remove a tag from the user's active interest list and reset its base_interest."""
    db = get_db()
    row = db.execute("SELECT tags FROM users WHERE id=?", (user_id,)).fetchone()
    user_tags: list = json.loads(row["tags"] or "[]")
    if tag in user_tags:
        user_tags.remove(tag)
        db.execute("UPDATE users SET tags=? WHERE id=?", (json.dumps(user_tags), user_id))
    # Reset to non-selected baseline so it stays out of the active pool
    db.execute(
        "UPDATE tag_profiles SET base_interest=0.15, current_weight=0.15 WHERE user_id=? AND tag=?",
        (user_id, tag),
    )
    db.commit()


# ── Tag interest (AJAX update) ─────────────────────────────────────────────────

def update_single_tag_interest(user_id: int, tag: str, value: float):
    """value is 0.0–1.0."""
    from .planner import compute_tag_weight
    db  = get_db()
    row = db.execute(
        "SELECT * FROM tag_profiles WHERE user_id=? AND tag=?", (user_id, tag),
    ).fetchone()
    if not row:
        return
    updated = dict(row)
    updated["base_interest"] = value
    db.execute(
        "UPDATE tag_profiles SET base_interest=?, current_weight=? WHERE user_id=? AND tag=?",
        (value, compute_tag_weight(updated), user_id, tag),
    )
    db.commit()


# ── Discovery level ────────────────────────────────────────────────────────────

def get_discovery_level(user_id: int) -> int:
    row = get_db().execute("SELECT context FROM users WHERE id=?", (user_id,)).fetchone()
    ctx = json.loads(row["context"] or "{}")
    return int(ctx.get("discovery_level", 30))


def set_discovery_level(user_id: int, level: int):
    db  = get_db()
    row = db.execute("SELECT context FROM users WHERE id=?", (user_id,)).fetchone()
    ctx = json.loads(row["context"] or "{}")
    ctx["discovery_level"] = max(0, min(100, int(level)))
    db.execute("UPDATE users SET context=? WHERE id=?", (json.dumps(ctx), user_id))
    db.commit()


# ── Export / import ───────────────────────────────────────────────────────────

def export_user_data(user_id: int) -> dict:
    import datetime
    db   = get_db()
    user = get_user(user_id)
    tp   = db.execute("SELECT * FROM tag_profiles WHERE user_id=?", (user_id,)).fetchall()
    comp = db.execute("SELECT * FROM completions WHERE user_id=?", (user_id,)).fetchall()
    itin = db.execute("SELECT * FROM daily_itineraries WHERE user_id=?", (user_id,)).fetchall()
    return {
        "version":     2,
        "exported_at": datetime.datetime.now().isoformat(),
        "user": {
            "name":      user["name"],
            "city":      user["city"],
            "tags":      json.loads(user["tags"]    or "[]"),
            "context":   json.loads(user["context"] or "{}"),
            "night_owl": bool(user["night_owl"]),
        },
        "tag_profiles": [dict(r) for r in tp],
        "completions":  [dict(r) for r in comp],
        "itineraries":  [
            {"date": r["date"], "blocks": json.loads(r["blocks_json"])}
            for r in itin
        ],
    }


# ── Custom events ──────────────────────────────────────────────────────────────

def get_custom_events_for_date(user_id: int, date_str: str) -> list[dict]:
    import datetime as _dt
    db = get_db()
    # Direct events on this date
    rows = db.execute(
        "SELECT * FROM custom_events WHERE user_id=? AND date=? ORDER BY block, created_at",
        (user_id, date_str),
    ).fetchall()
    result = [dict(r) for r in rows]

    # Recurring events from earlier dates
    try:
        target = _dt.date.fromisoformat(date_str)
    except ValueError:
        return result

    recur_rows = db.execute(
        """SELECT * FROM custom_events
           WHERE user_id=? AND recurrence IS NOT NULL AND recurrence != 'none' AND date < ?""",
        (user_id, date_str),
    ).fetchall()

    target_dow  = target.weekday()   # 0=Mon … 6=Sun
    target_dom  = target.day         # day of month

    for row in recur_rows:
        try:
            orig_dt = _dt.date.fromisoformat(row["date"])
        except ValueError:
            continue
        rec = row["recurrence"] or "none"
        match = (
            rec == "daily"
            or (rec == "weekly"  and orig_dt.weekday() == target_dow)
            or (rec == "monthly" and orig_dt.day == target_dom)
        )
        if match:
            ce = dict(row)
            ce["is_recurring_instance"] = True
            ce["recurrence_origin_date"] = row["date"]
            result.append(ce)

    result.sort(key=lambda r: (r.get("block") or "", r.get("created_at") or ""))
    return result


def add_custom_event(
    user_id: int, date_str: str, title: str,
    block: str = "anytime", event_type: str = "other",
    location: str = "", cost: float = 0,
    duration_min: int = 60, notes: str = "",
    recurrence: str = "none",
) -> int:
    db = get_db()
    cur = db.execute(
        """INSERT INTO custom_events
           (user_id, date, title, block, event_type, location, cost, duration_min, notes, recurrence)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (user_id, date_str, title, block, event_type, location, cost, duration_min, notes, recurrence),
    )
    db.commit()
    return cur.lastrowid


def delete_custom_event(user_id: int, event_id: int):
    db = get_db()
    db.execute(
        "DELETE FROM custom_events WHERE id=? AND user_id=?", (event_id, user_id)
    )
    db.commit()


def complete_custom_event(user_id: int, event_id: int, rating: int | None = None):
    db = get_db()
    db.execute(
        "UPDATE custom_events SET completed=1, rating=? WHERE id=? AND user_id=?",
        (rating, event_id, user_id),
    )
    db.commit()
