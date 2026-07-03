# Product Roadmap

**Last Updated:** 2026-05
**City:** Austin, TX (v1 pilot)

---

## Phase 0 — Prototype (current)

**Goal:** A working local prototype to validate the core UX and algorithm.

**Done:**
- Daily itinerary card with 5 time blocks
- 214 interest tags with frequency algorithm (recency, gap boost, saturation)
- Tag interest level sliders (drag to adjust)
- Routine vs. Discovery slider (0–100, affects generation)
- Year calendar with day-click navigation
- Per-block and full-day reroll
- Star ratings + skip reasons feeding tag weight updates
- Exploration tracker with gamified level progression
- Printable itinerary card (browser print)
- JSON save file export

**Target user:** Single test user on localhost. No auth, no real data, no deployment.

---

## Phase 1 — Real Data MVP

**Goal:** Generate genuinely useful itineraries for Austin users using live event data.

**Scope:**
- Integrate 3–4 live data sources (Eventbrite, Ticketmaster, Yelp, Google Places)
- LLM extraction pipeline for local Austin sites (Playwright + Claude Haiku)
- Event deduplication via pgvector embeddings
- Venue phone numbers, hours, and reservation links on cards
- Replace placeholder seed events with live database

**Success metric:** Generate a day plan that a real Austin resident would actually follow at least 2/5 days per week.

**Estimated effort:** 4–6 weeks

---

## Phase 2 — Multi-User & Auth

**Goal:** Allow real users to create accounts and use the app independently.

**Scope:**
- Email + password auth (Flask-Login or equivalent)
- Google OAuth option
- User data isolation
- Password reset flow
- Basic onboarding A/B test (survey vs. swipe-first)

**Success metric:** 10 real test users completing ≥5 activities with ratings.

**Estimated effort:** 2–3 weeks

---

## Phase 3 — Deployed Web App

**Goal:** Public-facing web app at a domain. Austin-only.

**Scope:**
- Production PostgreSQL (Railway or Supabase)
- Background job worker (Celery + Redis) for daily scraping
- Daily itinerary delivery (morning email or push notification)
- iCal export for accepted activities
- Week view in calendar
- Morning mood check-in (3-tap)
- Weekly reflection (3-slider)

**Success metric:** 50 active weekly users, 3.5+ avg star rating on completed activities.

**Estimated effort:** 6–8 weeks

---

## Phase 4 — Mobile App

**Goal:** iOS app in TestFlight. Android later.

**Scope:**
- React Native shell wrapping the web views first
- Push notifications (8am daily plan delivery)
- Native Apple HealthKit integration (HRV, sleep quality)
- Offline mode with cached daily plan
- Location-aware distance sorting
- Home screen widget (today's top pick)

**Success metric:** 100+ TestFlight users, 4.0+ App Store rating.

**Estimated effort:** 8–12 weeks (with a mobile dev)

---

## Phase 5 — Intelligence Layer

**Goal:** Replace rule-based planner with LLM-powered generation.

**Scope:**
- Claude Sonnet for itinerary generation (full prompt injection)
- User profile as natural language context (strong_positives, strong_negatives)
- Personalized "planner notes" with reasoning
- Optimal interval learning per user (rating vs. gap correlation)
- Cross-tag synergy detection ("yoga + hiking same week → higher ratings")
- Monthly SWLS life satisfaction check-in
- Population benchmarks for cold start

**Success metric:** Users report itineraries feel "curated for me" in exit surveys.

**Estimated effort:** 4–6 weeks

---

## Phase 6 — Social & Community

**Goal:** Light social layer to increase engagement and event attendance.

**Scope:**
- Friend connections (optional)
- "Your friend Alex is going to this" on event cards
- Group planning mode (suggest events that work for 2+ people)
- User reviews on venue/event cards
- Community-sourced event tags

**Estimated effort:** 6–8 weeks

---

## Metrics to Track

| Metric | Target (Phase 3) | Target (Phase 4) |
|--------|-----------------|-----------------|
| Weekly active users | 50 | 500 |
| Activities completed / user / week | 3 | 5 |
| Avg star rating | 3.8 | 4.0 |
| 30-day retention | 40% | 55% |
| SWLS improvement (30d) | baseline | +0.3 pts |
| Reroll rate per day | <30% | <25% |

---

## Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Google adds this to Maps+Calendar | High | Focus on happiness-first framing + local depth Google ignores |
| Event data quality is too low | Medium | Hand-curate Austin sources; set quality floor |
| Users won't rate events | Medium | Make rating 1-tap, not a form; use passive signals |
| LLM costs unsustainable | Low | Haiku for extraction; Sonnet only for generation (1 call/day) |
| Cold start too slow | Medium | Population priors + 3-question onboarding blend |
| Privacy concern (wearable data) | Medium | On-device processing where possible; explicit opt-in |
