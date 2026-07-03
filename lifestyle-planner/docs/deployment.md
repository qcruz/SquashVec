# Deployment Architecture

**Last Updated:** 2026-05

---

## Phase 1 Target: Railway (simplest path to production)

```
┌─────────────────────────────────────────────────────────────────┐
│                          Internet                               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  Cloudflare │  DNS + CDN + DDoS protection
                    └──────┬──────┘
                           │
              ┌────────────▼────────────┐
              │   Railway (or Fly.io)   │
              │                         │
              │  ┌─────────────────┐   │
              │  │  Flask / Gunicorn│   │  Web app server
              │  │  (2 workers)    │   │  $5–20/mo
              │  └────────┬────────┘   │
              │           │             │
              │  ┌────────▼────────┐   │
              │  │  PostgreSQL     │   │  Managed DB
              │  │  + pgvector     │   │  $10–25/mo
              │  └─────────────────┘   │
              │                         │
              │  ┌─────────────────┐   │
              │  │  Redis          │   │  Job queue + caching
              │  └────────┬────────┘   │  $5–10/mo
              │           │             │
              │  ┌────────▼────────┐   │
              │  │  Celery Worker  │   │  Background jobs
              │  │  (1 worker)     │   │  (scraping, embedding)
              │  └─────────────────┘   │
              └─────────────────────────┘

Total estimated: ~$30–60/mo for small scale (50–500 users)
```

---

## Services & Responsibilities

### Web App (Flask / Gunicorn)
- Handles HTTP requests
- Serves itinerary pages, calendar, profile
- Session management
- Calls Anthropic API for generation (future)
- **Gunicorn config:** `--workers 2 --threads 4 --timeout 30`

### PostgreSQL + pgvector
- Users, tag profiles, completions, itineraries
- Events table (live data from APIs/scrapers)
- pgvector extension for semantic event search and deduplication
- **Backup:** Daily automated snapshots via Railway

### Redis
- Celery job broker
- Session caching (optional)
- Rate limiting store

### Celery Workers
- **Daily scraping job** (2am): Pull events from APIs, run LLM extraction on scraped pages
- **Weekly profile update job** (Sunday midnight): Recompute optimal intervals per user
- **Daily itinerary pre-generation job** (5am): Pre-generate morning itineraries so 8am delivery is instant

---

## Production vs. Prototype Differences

| Concern | Prototype (now) | Production |
|---------|-----------------|------------|
| Database | SQLite file | PostgreSQL + pgvector |
| Auth | Single session | Flask-Login + OAuth |
| Event data | Hardcoded seed events | Live APIs + scrapers |
| Itinerary generation | Rule-based scorer | LLM (Claude Sonnet) |
| Notifications | None | Email (SendGrid) → push later |
| Secrets | Hardcoded dev key | Railway env vars |
| HTTPS | localhost | Cloudflare + Railway auto-SSL |
| Monitoring | Print/logs | Sentry (errors) + UptimeRobot |

---

## Environment Variables (production)

```bash
# Flask
SECRET_KEY=<long random string>
FLASK_ENV=production

# Database
DATABASE_URL=postgresql://user:pass@host:5432/planner

# Redis
REDIS_URL=redis://user:pass@host:6379/0

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# External APIs
EVENTBRITE_TOKEN=...
TICKETMASTER_KEY=...
YELP_API_KEY=...
GOOGLE_PLACES_KEY=...

# Email
SENDGRID_API_KEY=...
FROM_EMAIL=hello@dayplanner.app

# Optional: Sentry
SENTRY_DSN=https://...
```

---

## Mobile App Deployment

### Option A: Capacitor (fastest)
- Wrap the existing Flask web app in a Capacitor WebView shell
- Ship to App Store and Google Play
- Native plugins for: push notifications, HealthKit, location
- **Pro:** Re-uses all existing HTML/CSS/JS, ships in 2–4 weeks
- **Con:** Not truly native; some UI limitations

### Option B: React Native (proper native)
- Build native app consuming a REST API version of the Flask backend
- Native navigation, animations, HealthKit bridge
- **Pro:** Full native performance, best HealthKit integration
- **Con:** Requires a React Native developer; 8–12 week build

### Recommendation for Phase 4
Start with Capacitor to ship fast and validate mobile retention. Build native in Phase 5+ when the UX patterns are proven.

---

## Scaling Plan

```
Users:    1–50      → Railway free/hobby tier (~$30/mo)
Users:    50–500    → Railway standard ($50–100/mo)
Users:    500–5000  → Railway scaled + read replica ($150–300/mo)
Users:    5000+     → Migrate to AWS/GCP with proper infra team
```

The bottleneck at scale is the LLM generation cost (~$7.50/user/month), not infrastructure.
Amortization strategies:
1. Cache itineraries (generate once, reuse unless user rerolls)
2. Pre-generate at 5am, deliver instantly at 8am
3. Haiku for cheap operations; Sonnet only for final itinerary

---

## Domain + Branding Notes (TBD)

- App name TBD (working title: "Day Planner")
- Target domain: something short + memorable
- App Store: "Lifestyle Planner" or "Day Guide" or similar
- App icon: needs design pass before launch

---

## Launch Checklist (Phase 3)

- [ ] Migrate SQLite → PostgreSQL
- [ ] Add Flask-Login + Google OAuth
- [ ] Set up Railway project with env vars
- [ ] Configure Cloudflare DNS
- [ ] Integrate ≥3 live Austin event sources
- [ ] Set up Celery scraping job
- [ ] Build email delivery (SendGrid)
- [ ] Add Sentry error tracking
- [ ] Privacy policy page
- [ ] Terms of service page
- [ ] Set up UptimeRobot monitoring
- [ ] Beta test with 10 real Austin users
- [ ] Soft launch (invite-only)
