# Confirmed Features — Build List

This document tracks every feature the product owner has explicitly confirmed for implementation.
Items are grouped by surface area. Status: ✅ Done · 🔨 In Progress · 🔲 Planned

---

## Today Page — Daily Brief

- ✅ Hourly weather forecast strip across the top of Today view (replaces routine/budget bar)
  - Shows hour, weather icon, temperature, condition
  - Horizontally scrollable from 8 AM – 10 PM
  - Placeholder data now; wire to live API (OpenWeatherMap or similar) in Phase 1
- ✅ 3-column layout on Today page (single-day view only)
- ✅ Left sidebar — Explorer progress panel
  - Explorer level name + progress bar to next level
  - Stats: total activities, tag coverage %, venues tried, tag types
- ✅ Left sidebar — Activity by Category panel
  - Horizontal bars showing recent completion counts per tag category
  - Updates as user rates/completes activities
- ✅ Left sidebar — Points & Rewards panel
  - Explorer Points (10 pts per completion)
  - Austin Stamps (unique venues visited)
  - Placeholder rows for credit card points and loyalty programs (coming later)
- ✅ Right sidebar — Alternate activities per time block
  - 2–3 ranked alternatives for each block, horizontally scrollable
  - "↔ Swap in" button triggers a reroll for that block
  - Shows title, venue, cost badge, duration, distance
- ✅ Right sidebar — Swap to specific alternative (not just random reroll)
  - `POST /day/<date>/set/<block>` endpoint accepts full event JSON; replaces block in saved itinerary
- ✅ "Surprise me" button — generates a fully randomized day ignoring tag weights (discovery_level=100)
- ✅ Quick-add custom activity to any block
  - Dropdown of activity types: doctor's appointment, errand, work meeting, travel, etc.
  - Freeform title + optional notes; saves into the day's itinerary
- ✅ Recurring activities — daily / weekly / monthly recurrence stored on custom events; instances shown on matching future days
- 🔲 Map view — embedded map showing all day's locations in sequence with routing
- 🔲 Print / share itinerary — clean printable layout; shareable link for the day

---

## Profile Page

- ✅ Routine vs. Discovery slider (moved here from Today page)
- ✅ Daily Budget slider (moved here from Today page)
  - Range $0–$200, step $5; $0 = no limit
  - Saves via existing `/settings/filters` AJAX endpoint
- ✅ Interest level sliders (existing)
- ✅ Schedule settings — wake time, day type, night owl (existing)
- ✅ Tag cloud management (existing)
- ✅ Learned weights summary (existing)
- ✅ Recent activity history (existing)
- ✅ Explorer tracker card (existing)
- ✅ Export save file (existing)
- ✅ Home neighborhood / preferred area setting (stored in user context)
- ✅ Transportation mode setting: walking / cycling / driving / transit
- ✅ Dietary restrictions and allergy settings (checkboxes: vegetarian, vegan, gluten-free, dairy-free, nut allergy, halal, kosher)
- 🔲 Health & fitness goals with target dates (e.g. "run a 5K by October")
- ✅ Dark / light mode toggle (persisted in localStorage, no-flash on load)
- 🔲 Birthday and anniversary markers (user-entered, shown on calendar)

---

## Points & Rewards System

- 🔲 Explorer Points — earn 10 pts per completed activity (placeholder shown in sidebar)
- 🔲 Austin Stamps — unique venue visit badges (count shown in sidebar)
- 🔲 Credit card points optimizer
  - Surface best card to use per spend category at point of activity
  - Track points earned per card
  - Annual fee value calculator ("did you earn enough this year?")
  - Card rotation alerts (Chase Freedom 5% quarters, Amex Platinum credits, etc.)
- 🔲 Loyalty program aggregator
  - Track points/miles/status across airline, hotel, and dining programs
  - Expiring points alerts
  - Tier status tracker ("2 flights from Delta Gold")
- 🔲 Venue-funded points
  - Venues pay 0.5–2% of transaction as user points (standard loyalty economics)
  - Redeemable at partner venues or on the platform
- 🔲 Points gifting — send a "day out" to a friend using your points
- 🔲 Points-to-nonprofit — donate points to local Austin orgs

---

## Itinerary Generation

- ✅ 5-block daily itinerary (morning, midday, afternoon, dinner, nighttime)
- ✅ 214 interest tags across 14 categories
- ✅ Tag frequency algorithm (recency penalty, gap boost, saturation detection)
- ✅ Per-block and full-day reroll
- ✅ Link blocks to prefer nearby neighborhoods on reroll
- ✅ Free-only and max-budget filters
- ✅ Night owl mode (enables nighttime block on Fri/Sat)
- 🔲 Swap to specific alternative from right sidebar (see Today Page above)
- 🔲 Live event data — Eventbrite, Ticketmaster, Yelp, Google Places
- 🔲 LLM-powered generation (Claude Sonnet, replacing rule-based scorer)
- 🔲 Weather-aware rescheduling (swap outdoor activity if rain predicted)
- 🔲 Morning mood check-in (3-tap: great/ok/tired) affecting day tone
- ✅ Seasonal intelligence — automatically weight outdoor/seasonal activities higher in relevant months (Summer/Fall/Winter/Spring tag boost sets in planner.py)
- ✅ "New to you" weekly spotlight — consistent per-week pick outside user's usual tags; shown in left sidebar of daily brief

---

## Feedback & Learning

- ✅ Post-activity star rating (1–5)
- ✅ Skip with reason (4 categories)
- ✅ Tag weight updates from ratings and skips
- ✅ Saturation detection (declining rating trend suppresses tag weight)
- 🔲 Optimal interval learning — find best gap between repeat activities per user
- 🔲 Cross-tag synergy detection ("yoga + hiking same week → rate both higher")
- 🔲 Weekly 3-slider reflection (Activity · Social · Creativity)
- 🔲 Monthly SWLS life satisfaction check (validated 5-question survey)

---

## Calendar

- ✅ Full-year calendar with planned-day dots
- ✅ Year navigation
- ✅ Click any day to view or generate itinerary
- ✅ Multi-day view (1/2/3/5/7 days)
- ✅ Zoom slider (1–4 month columns)
- ✅ Category color shading on day squares (dominant activity type)
- ✅ Pay day markers, special event stickers, sidebar layer toggles
- ✅ Past days crossed out (X); past months collapsed by default
- 🔲 Drag a planned day to reschedule (copy itinerary to new date)
- 🔲 Visual goal progress markers — green ring on days where exercise goal was met
- 🔲 Streak indicators — flame icon on consecutive active days
- 🔲 Birthday and anniversary markers shown on calendar squares
- 🔲 Week view (Mon–Sun with 5 blocks per day)
- 🔲 iCal / Google Calendar export for accepted events
- 🔲 Bulk generate next 7/14/30 days

---

## Life Dashboard & Analytics

- 🔲 Week / month / year in review screen with charts
- 🔲 Activity frequency heatmap (GitHub-style contribution graph by day)
- 🔲 Spending by category over time (dining, entertainment, fitness, etc.)
- 🔲 Tag coverage progress — visual map of how much of the category taxonomy has been explored
- 🔲 Most-visited places and venues list (ranked by completion count)
- 🔲 Activity-to-wellbeing correlation display
  - "Mood ratings 0.8★ higher on weeks with 2+ outdoor activities"
- 🔲 Life area radar chart — Physical / Social / Creative / Intellectual / Restorative
- 🔲 Habit consistency tracking ("18 of last 21 days had physical activity")
- 🔲 Apple HealthKit integration (HRV, sleep quality as readiness signal)

---

## Trip Planning

- 🔲 Trip planning tab (separate surface from daily itinerary)
- 🔲 Atlas Obscura-style hidden gem database
  - Hidden gem score: (quality × uniqueness) / popularity
  - Locals-only filter (exclude top-10 Google results)
- 🔲 Full trip budget calculator (lodging + transport + food + activities)
- 🔲 Multi-city itinerary chaining (Hill Country, Marfa, Fredericksburg road trips)
- 🔲 "Same as home" city filter — find places in new city matching Austin taste profile
- 🔲 Affiliate booking integration (Booking.com, Viator/GetYourGuide)

---

## Live Events & Local Data

- 🔲 Live event feed — Eventbrite, Meetup, Ticketmaster integration (real events on real dates)
- 🔲 Restaurant reservations — OpenTable link-out from dining blocks
- 🔲 Local deals and happy hour integration
- 🔲 Upcoming event reminders — "ACL Fest starts in 3 days — add to your calendar?"

---

## Social & Discovery

- 🔲 Invite a friend to a planned activity — generates a shareable link for a specific block
- 🔲 Activity clubs — join recurring group meetups (running club, board game night, etc.)
- 🔲 Shared itineraries — plan a day together with a partner; both see each other's ratings
- 🔲 Opt-in event matching ("3 others attending this — want to see who?")
- 🔲 Plus-one mode (mark activity open to company; others request to join)
- 🔲 Interest-based auto-groups ("Saturday Morning Trail Runners")
- 🔲 Austin Passport — stamp collection for neighborhoods explored
- 🔲 Community challenges ("Visit 5 new neighborhoods this month")
- 🔲 Local expert system (50+ completions in a category → publish curated lists)

---

## Enterprise / B2B

- 🔲 Venue analytics dashboard (visits, ratings, repeat rate, time-of-day breakdown)
- 🔲 Sponsored placement (labeled; venue pays for inclusion in relevant itineraries)
- 🔲 White-label city guide (Visit Austin / CVB co-branded version)
- 🔲 Corporate wellness accounts ($15–25/employee/month)
- 🔲 Team day planning (manager generates group itinerary; team votes)
- 🔲 Relocation concierge (90-day premium as part of company relocation package)

---

## Infrastructure

- ✅ SQLite prototype DB (single-user)
- ✅ Flask + Jinja2 web app
- 🔲 PostgreSQL + pgvector (production)
- 🔲 Multi-user auth (email + Google OAuth)
- 🔲 PWA manifest + service worker (installable)
- 🔲 Celery + Redis background jobs (daily scraping, pre-generation)
- 🔲 Hosted deployment (Railway or Fly.io)
- 🔲 Weather API integration (OpenWeatherMap or Tomorrow.io)

---

*Last updated: 2026-06-30 — brainstorm batch 2 added*
