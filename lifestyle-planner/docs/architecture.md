# Production Architecture

**Last Updated:** 2026-05

---

## Overview

The production system has three main concerns beyond the prototype:
1. **Live event data** — pull from external APIs and scrapers daily
2. **Multi-user** — isolated profiles, auth, per-user itinerary generation
3. **Scale** — background jobs, caching, async LLM calls

The prototype uses SQLite + rule-based scoring. Production swaps in PostgreSQL + pgvector for data, and Claude Sonnet for generation.

---

## Database Schema (PostgreSQL)

### `users`
```sql
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       TEXT UNIQUE NOT NULL,
    name        TEXT,
    password_hash TEXT,          -- bcrypt; NULL if OAuth-only
    oauth_provider TEXT,         -- 'google' | 'apple' | NULL
    oauth_sub   TEXT,            -- provider's subject ID
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    night_owl   BOOLEAN DEFAULT FALSE,
    wake_time   TEXT DEFAULT '8:00',
    schedule_type TEXT DEFAULT 'flexible',
    discovery_level INT DEFAULT 30,
    context     JSONB DEFAULT '{}'  -- misc prefs, future-proof
);
```

### `tag_profiles`
```sql
CREATE TABLE tag_profiles (
    id              SERIAL PRIMARY KEY,
    user_id         INT REFERENCES users(id) ON DELETE CASCADE,
    tag             TEXT NOT NULL,
    base_interest   FLOAT DEFAULT 0.5,
    current_weight  FLOAT DEFAULT 0.5,
    optimal_interval_days INT DEFAULT 7,
    last_completed  DATE,
    avg_rating_30d  FLOAT DEFAULT 0,
    avg_rating_90d  FLOAT DEFAULT 0,
    saturation_level TEXT DEFAULT 'none',  -- 'none' | 'mild' | 'moderate' | 'high'
    rating_history  JSONB DEFAULT '[]',    -- [{date, rating}, ...]
    UNIQUE (user_id, tag)
);
```

### `events`
```sql
CREATE TABLE events (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    venue       TEXT,
    address     TEXT,
    city        TEXT DEFAULT 'Austin',
    phone       TEXT,
    url         TEXT,
    description TEXT,
    tags        TEXT[],          -- array of tag slugs
    block       TEXT,            -- 'morning'|'midday'|'afternoon'|'dinner'|'nighttime'
    cost_label  TEXT,            -- 'Free' | '$' | '$$' | '$$$'
    duration_label TEXT,         -- '1–2 hrs' etc.
    distance_label TEXT,         -- '~2 mi' etc.
    source      TEXT,            -- 'eventbrite' | 'ticketmaster' | 'yelp' | 'scraper'
    source_id   TEXT,            -- external ID for dedup
    event_date  DATE,            -- NULL = recurring/evergreen
    recurring   BOOLEAN DEFAULT FALSE,
    embedding   vector(1536),    -- pgvector: text-embedding-3-small on title+desc+tags
    last_scraped TIMESTAMPTZ,
    active      BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (source, source_id)
);

-- Index for cosine similarity search
CREATE INDEX events_embedding_idx ON events
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

### `completions`
```sql
CREATE TABLE completions (
    id          SERIAL PRIMARY KEY,
    user_id     INT REFERENCES users(id) ON DELETE CASCADE,
    event_id    INT REFERENCES events(id),
    event_title TEXT,            -- denormalized in case event is deleted
    block       TEXT,
    date        DATE,
    rating      INT CHECK (rating BETWEEN 1 AND 5),
    skipped     BOOLEAN DEFAULT FALSE,
    skip_reason TEXT,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `daily_itineraries`
```sql
CREATE TABLE daily_itineraries (
    id          SERIAL PRIMARY KEY,
    user_id     INT REFERENCES users(id) ON DELETE CASCADE,
    date        DATE,
    blocks      JSONB,           -- {morning: {...}, midday: {...}, ...}
    planner_note TEXT,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    generation_method TEXT DEFAULT 'rule',  -- 'rule' | 'llm'
    UNIQUE (user_id, date)
);
```

---

## Event Data Pipeline

```
External Sources
  │
  ├── Eventbrite API  ──┐
  ├── Ticketmaster API ─┤
  ├── Yelp Fusion API  ─┼──► Raw event records
  ├── Google Places    ─┤
  └── Playwright scraper─┘
           │
           ▼
   Haiku extraction job
   (normalise, tag, clean)
           │
           ▼
   Deduplication (pgvector)
   cosine similarity > 0.92 → merge
           │
           ▼
   events table (PostgreSQL)
           │
           ▼
   Itinerary generation
   (rule-based now; Sonnet later)
```

### Celery Jobs

**`scrape_events` — daily at 2am CT**
```python
@celery.task
def scrape_events():
    pull_eventbrite()      # free + paid Austin events
    pull_ticketmaster()    # concerts, sports
    pull_yelp()            # restaurants, venues, hours
    pull_google_places()   # hours corrections, phone, ratings
    run_playwright_scrapers()   # austin360.com, do512.com, etc.
    deduplicate_events()   # pgvector cosine merge pass
```

**`update_profiles` — weekly Sunday midnight**
```python
@celery.task
def update_profiles():
    for user in get_active_users():
        recompute_optimal_intervals(user.id)   # rating vs gap correlation
        update_saturation_levels(user.id)
```

**`pregenerate_itineraries` — daily at 5am CT**
```python
@celery.task
def pregenerate_itineraries():
    today = date.today().isoformat()
    for user in get_active_users():
        if not itinerary_exists(user.id, today):
            generate_and_save(user.id, today)
    # 8am delivery is instant — itinerary already in DB
```

---

## Event Deduplication (pgvector)

Same event can appear from multiple sources (e.g., a concert on both Eventbrite and Ticketmaster). Dedup strategy:

1. Embed each new event: `title + venue + date` → 1536-dim vector via `text-embedding-3-small`
2. Query: `SELECT id FROM events ORDER BY embedding <=> $1 LIMIT 1`
3. If top cosine similarity > 0.92 → treat as duplicate, merge metadata (keep richer record)
4. If 0.80–0.92 → flag for manual review (edge case queue)
5. If < 0.80 → insert as new event

Cost: ~$0.0001 per event embed. At 500 new events/day → ~$0.05/day.

---

## LLM Pipeline

### Phase 1: Haiku for Extraction (~$0.20/day per city)

Used for scraping unstructured HTML pages (Austin360, Do512, local blogs):

```python
EXTRACT_PROMPT = """
Extract event information from this HTML snippet.
Return JSON with: title, venue, address, date, time, description, cost.
If a field is missing, use null.

HTML:
{html_chunk}
"""
# Model: claude-haiku-4-5
# Approx cost: $0.00025 per page
```

### Phase 5: Sonnet for Generation (~$0.015/user/day)

Replaces rule-based scorer with full LLM generation:

```python
ITINERARY_PROMPT = """
You are a personal lifestyle planner for {name} in Austin, TX.

Today: {date} ({day_of_week}), {weather_summary}
Schedule type: {schedule_type}, Wake time: {wake_time}
Discovery level: {discovery_level}/100

Strong interests: {strong_positives}
Wants to explore more: {moderate_interests}
Has been avoiding lately: {recently_saturated}
Recent ratings: {recent_ratings}

Available events today:
{candidate_events_json}

Generate a 5-block itinerary (morning, midday, afternoon, dinner, nighttime).
For each block return: event_id, personalised_note (1 sentence, why this fits them today).
Also write a 2-sentence planner note for the top of the card.

Return valid JSON only.
"""
# Model: claude-sonnet-4-6
# Approx cost: $0.015 per call (1500 input + 300 output tokens)
```

**Cost amortization:**
- Cache generated itinerary — only regenerate on reroll or settings change
- Haiku for cheap operations (tag extraction, feedback parsing)
- Sonnet only for final itinerary render (1 call/user/day max)
- At 500 users: ~$7.50/day → $225/month LLM costs

---

## API Integration Details

### Eventbrite
- Endpoint: `GET /v3/events/search/?location.address=Austin,TX&expand=venue`
- Rate limit: 1000 req/hr on free tier
- Useful fields: name, description, start, end, url, is_free, ticket_classes[0].cost
- Pagination: cursor-based via `page_count` + `continuation`

### Ticketmaster
- Endpoint: `GET /discovery/v2/events?city=Austin&stateCode=TX`
- Rate limit: 5 req/sec, 5000/day
- Useful fields: name, dates.start, _embedded.venues, priceRanges, url

### Yelp Fusion
- Endpoint: `GET /v3/businesses/search?location=Austin,TX&categories={category}`
- Rate limit: 500 req/day on free tier
- Useful fields: name, location, phone, hours, rating, price, categories
- Note: Use for venue hours/phone enrichment more than event discovery

### Google Places
- Endpoint: `GET /maps/api/place/textsearch/json?query={venue}+Austin+TX`
- Cost: $0.017/request (no free tier above 28,500 req/month)
- Useful fields: opening_hours, formatted_phone_number, rating, website
- Strategy: Only call when Yelp is missing phone/hours data (cost control)

---

## Auth Design

### Email + Password
```
POST /auth/register  { email, password, name }
POST /auth/login     { email, password }
POST /auth/logout
POST /auth/reset-password  { email }
```

- Passwords: bcrypt with cost factor 12
- Sessions: Flask-Login + server-side session (Redis store)
- Password reset: time-limited token (24h) sent via SendGrid

### Google OAuth
```
GET  /auth/google           → redirect to Google consent
GET  /auth/google/callback  → exchange code, upsert user, set session
```

- Library: `authlib` + `requests-oauthlib`
- Scope: `openid email profile`
- Store `oauth_sub` in users table for re-login

---

## Caching Strategy

| Data | Cache location | TTL |
|------|---------------|-----|
| Today's itinerary (pre-generated) | PostgreSQL | Until reroll |
| User tag profiles | In-memory (per request) | N/A |
| Event candidates for block | Redis | 1 hr |
| Yelp venue data | Redis | 24 hr |
| Google Places hours | Redis | 7 days |
| Discovery level | PostgreSQL (users.discovery_level) | Permanent |

---

## Monitoring & Observability

| Tool | Purpose |
|------|---------|
| Sentry | Exception tracking + release health |
| UptimeRobot | Uptime checks every 5 min, SMS alert |
| Railway metrics | CPU, memory, request count |
| Celery Flower | Job queue monitoring |
| Custom `/healthz` endpoint | Returns DB ping + Celery ping |

```python
@app.route('/healthz')
def health():
    db_ok = ping_db()
    celery_ok = ping_celery()
    return jsonify({"db": db_ok, "celery": celery_ok}), 200 if (db_ok and celery_ok) else 503
```

---

## Migration Path: Prototype → Production

1. **DB migration**: `flask db migrate` (Flask-Migrate / Alembic) — SQLite schema maps 1:1 to Postgres schema above
2. **Auth layer**: Add Flask-Login; wrap existing single-user routes with `@login_required`
3. **Event data**: Swap `SEED_EVENTS` list for DB query `get_events_for_block(block, city)`
4. **Background jobs**: Add `celery.py`, configure Redis broker, move scraping into tasks
5. **LLM generation**: Add `generate_itinerary_llm()` function in `planner.py`; feature-flag behind `USE_LLM_GENERATION=true` env var
6. **Deploy**: `railway up` with env vars set; Cloudflare DNS pointed at Railway domain
