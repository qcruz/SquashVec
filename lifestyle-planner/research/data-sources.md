# Data Sources & APIs

**Last Updated:** 2026-05

---

## Tier 1 — High Value, Accessible APIs

### Events & Activities

| Source | API | Cost | Data Quality | Notes |
|--------|-----|------|-------------|-------|
| **Eventbrite** | Yes (Eventbrite API v3) | Free tier; paid for higher limits | High — structured, ticketed | Best for formal events; geo-search works well |
| **Ticketmaster Discovery** | Yes | Free (rate-limited) | High — concerts, sports, shows | Best-in-class for ticketed live events |
| **Yelp Fusion** | Yes | Free (500 req/day) | High — businesses, hours, categories | Best for restaurants, gyms, classes; good "open now" filtering |
| **Google Places** | Yes | Pay-per-request after $200/mo free | Very high | Expensive at scale but most complete local data |
| **Foursquare Places** | Yes (Places API v3) | Freemium | Good | Strong for venues, categories; underused but solid |
| **Bandsintown** | Yes (Artists API) | Free | High for music | Best for artist-following; connect via Spotify library |
| **Songkick** | Yes | Free | High for music | Complementary to Bandsintown |

### Social / Community

| Source | API | Notes |
|--------|-----|-------|
| **Reddit** | Yes (free, rate-limited) | City subreddits (r/chicago, r/Austin) are gold for local events; search `/r/cityname events` |
| **Meetup** | Partial (GraphQL, now requires auth + paid) | Declining but still has niche group data; hobbyist communities |
| **Facebook Events** | Very limited | Graph API v18+ strips most event data; not viable for scraping |
| **Instagram** | Limited | Location/hashtag search heavily throttled since 2019 |
| **X/Twitter** | Expensive ($100/mo basic) | Local hashtag search useful but cost-prohibitive for a startup |

### Local Web Scraping (no official API)

| Source | Method | Value |
|--------|--------|-------|
| **Local news sites** | HTML scraper | Event calendars on newspaper sites (e.g., Austin360, Chicago Tribune events) |
| **Nextdoor** | No API; hard to scrape | Hyperlocal; worth exploring unofficial methods cautiously |
| **City government sites** | Scraper | Farmer's markets, festivals, park events — often on .gov calendar pages |
| **University sites** | Scraper | Free public lectures, performances, films |
| **Library systems** | Scraper + some APIs | Free classes, film screenings, programs |
| **Eventful (defunct)** | — | Absorbed by Ticketmaster |
| **Do512 / Do214 / etc.** | Scraper | City-specific "what's on" sites; high quality editorial |

---

## Tier 2 — Wellbeing & Feedback Signals

| Source | API/Integration | What It Provides |
|--------|----------------|-----------------|
| **Apple HealthKit** | iOS SDK (HealthKit) | Steps, sleep, HRV, mindful minutes, workouts |
| **Google Fit** | REST API | Similar to HealthKit on Android |
| **Oura Ring** | REST API | Sleep stages, readiness score, activity |
| **Fitbit** | Web API | Sleep, activity, heart rate |
| **Whoop** | Developer API (limited) | Recovery, strain score |
| **Strava** | API | Outdoor activity data; social proof ("did the run") |
| **Spotify** | Web API | Music listening patterns; mood inference from audio features |
| **Apple Screen Time / Digital Wellbeing** | No public API | Would be huge if accessible |

**Key insight:** HRV + sleep quality are the best passive happiness proxies available today without asking the user anything. An Oura or Apple Watch integration gives a "readiness score" that can feed itinerary generation (tired today → quieter itinerary; energized → more ambitious).

---

## Tier 3 — Inferrable Signals (no external API)

These are signals the app can collect itself:

| Signal | How Captured | What It Tells Us |
|--------|-------------|-----------------|
| **Check-in / "I did this"** | In-app tap | Ground truth: event was attended |
| **Skip / "Not today"** | In-app tap | Negative signal — type or timing |
| **Save / "Maybe later"** | In-app tap | Interest without commitment |
| **Time spent on card** | Passive timer | Implicit interest |
| **Share to calendar** | Calendar sync | Strong positive signal |
| **Re-roll count** | Passive | High re-rolls = today's options aren't landing |
| **Post-day rating** | 1–5 stars, optional | Explicit but low-friction |
| **Morning mood input** | Optional 3-option tap | Seed for that day's itinerary tone |

---

## Web Scraping Strategy for Local Discovery

The highest-value gap in the market is **hyperlocal content that no API covers**. Strategy:

### Target Site Categories
1. **City-specific event aggregators** — Do512, Funcheap SF, etc.
2. **Community org websites** — neighborhood associations, cultural centers
3. **Venue-specific calendars** — music venues, comedy clubs, climbing gyms
4. **Library + parks systems** — reliably structured HTML, public domain events
5. **University event calendars** — often open to public, free, high quality

### Technical Approach
- **Playwright or Puppeteer** for JS-rendered sites
- **Beautiful Soup / lxml** for static HTML
- **LLM-based extraction** (pass raw HTML to GPT-4o or Claude Haiku): extract event name, date/time, location, description, URL from unstructured pages — works surprisingly well vs. brittle CSS selectors
- **Firecrawl** — managed web scraping with LLM extraction (commercial; ~$15/mo starter)
- **Apify** — scraping platform with pre-built scrapers for some targets

### Frequency
- Ticketed events: daily refresh
- Community calendars: 2–3× per week
- Venue calendars: daily for the next 2 weeks

---

## Data Pipeline Architecture (Sketch)

```
[Eventbrite API] ──┐
[Ticketmaster]  ──┤
[Yelp Fusion]   ──┤
[Reddit RSS]    ──┤──► [Normalization Layer] ──► [Event DB] ──► [AI Planner]
[Scrapers]      ──┤         (title, time,         (Postgres +    (LLM-based
[Google Places] ──┘          location, tags,       pgvector)      itinerary
                              description,                        generator)
                              source, url)
```

The normalization layer is the hard part: getting "Saturday 4pm at Stubb's" from 12 different source formats into one schema.
