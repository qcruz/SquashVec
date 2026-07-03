# Feature Tracker

**Last Updated:** 2026-06
**Status legend:** ✅ Done · 🔨 In Progress · 🔲 Planned · 💡 Idea / Unscoped

---

## Core Loop

| Feature | Status | Notes |
|---------|--------|-------|
| Daily itinerary generation | ✅ | 5 blocks: morning/midday/afternoon/dinner/nighttime |
| Tag-based interest matching | ✅ | 214 tags across 14 categories |
| Tag frequency algorithm (recency penalty, gap boost, saturation) | ✅ | See `research/tag-frequency-algorithm.md` |
| Routine vs. Discovery slider | ✅ | 0–100, stored per user, affects scoring |
| Per-block reroll (inline) | ✅ | Visible on summary row + in expanded detail |
| Full day regenerate | ✅ | Respects discovery level |
| Print-ready itinerary card | ✅ | Browser print, all details expand, footer |
| Evening rating (1–5 stars) | ✅ | Updates tag weights via rolling averages |
| Skip with reason | ✅ | 4 reasons, mild negative signal |
| Exploration tracker | ✅ | Levels: Newcomer → Austin Native |
| Save file export (JSON) | ✅ | Includes profile, completions, itineraries |

---

## Calendar

| Feature | Status | Notes |
|---------|--------|-------|
| Full year calendar (12 months) | ✅ | Dots for planned days |
| Year navigation | ✅ | Previous/next year |
| Click day to view/generate itinerary | ✅ | Past days shown as-is |
| Week view | 🔲 | Mon–Sun with 5 blocks per day |
| Month list view (agenda style) | 🔲 | Linear scrollable list by day |
| Multi-week planning (bulk generate) | 🔲 | Generate next 7/14/30 days at once |
| iCal / Google Calendar sync | 🔲 | Export accepted events to calendar |

---

## Profile & Personalization

| Feature | Status | Notes |
|---------|--------|-------|
| Interest tag cloud (onboarding) | ✅ | 214 tags in 14 categories |
| Interest level sliders (drag to adjust) | ✅ | AJAX save, shows active tags |
| Tag cloud management (add/remove) | ✅ | In profile tab |
| Schedule settings (wake time, day type) | ✅ | Persisted per user |
| Night owl mode | ✅ | Enables nighttime block Fri/Sat |
| Learned tag weights (from ratings) | ✅ | Rolling 30d/90d average |
| Optimal interval learning | 🔲 | Finds best gap between repeat activities |
| Cross-tag synergies | 🔲 | "yoga + hiking same week → rate both higher" |
| Saturation detection + suppression | ✅ | Rating trend decline reduces weight |
| Save file import | 🔲 | Restore profile from JSON |

---

## Event Data

| Feature | Status | Notes |
|---------|--------|-------|
| Placeholder Austin events (48) | ✅ | All 5 blocks covered |
| Eventbrite API integration | 🔲 | Free events + ticketed |
| Ticketmaster API | 🔲 | Concerts, sports |
| Yelp Fusion API | 🔲 | Restaurants, venues |
| Google Places API | 🔲 | Hours, phone, rating |
| Foursquare API | 🔲 | Venue categories, check-ins |
| Playwright scraper + LLM extraction | 🔲 | For sites without APIs |
| Event deduplication (pgvector) | 🔲 | Fuzzy match across sources |
| Venue phone + hours data | 🔲 | For printable card completeness |
| User-submitted event tags | 🔲 | Crowdsourced tag enrichment |
| Seasonal event awareness | 🔲 | Weather + Austin event calendar patterns |

---

## Happiness & Feedback

| Feature | Status | Notes |
|---------|--------|-------|
| Post-event star rating | ✅ | 1–5, feeds tag weight updates |
| Skip reason tracking | ✅ | 4 categories |
| Morning mood check-in | 🔲 | 3-tap (great/ok/tired), affects day tone |
| Weekly 3-slider reflection | 🔲 | Activity · Social · Creativity sliders |
| Monthly SWLS life satisfaction check | 🔲 | Validated 5-question survey |
| Wearable integration (Apple HealthKit) | 💡 | HRV, sleep quality as readiness signal |
| Wearable integration (Google Fit) | 💡 | Android equivalent |
| Sleep quality tracking | 💡 | Did active days improve next-night sleep? |

---

## Social

| Feature | Status | Notes |
|---------|--------|-------|
| Solo mode (v1) | ✅ | No social features intentionally |
| Friend activity sharing | 💡 | "Your friend Alex also saved this event" |
| Group planning | 💡 | Suggest events that work for multiple users |
| Venue check-ins (public) | 💡 | Optional social signal |

---

## Mobile App

| Feature | Status | Notes |
|---------|--------|-------|
| React Native shell | 🔲 | Wrap web app first; native later |
| Push notifications (morning itinerary) | 🔲 | 8am daily delivery |
| Offline mode | 🔲 | Cache today's plan |
| Native HealthKit bridge | 🔲 | iOS only |
| Location-aware distance sort | 🔲 | Sort events by current location |

---

## Infrastructure

| Feature | Status | Notes |
|---------|--------|-------|
| SQLite prototype DB | ✅ | Sufficient for single-user testing |
| PostgreSQL + pgvector (production) | 🔲 | See `docs/deployment.md` |
| Multi-user auth (email + password) | 🔲 | Currently single-user session |
| OAuth (Google / Apple) | 🔲 | Auth0 or Clerk recommended for v1 |
| Daily scraping job (Celery + Redis) | 🔲 | |
| LLM extraction pipeline (Haiku) | 🔲 | ~$0.20/day per city |
| LLM itinerary generation (Sonnet) | 🔲 | Currently rule-based |
| Embedding-based event retrieval | 🔲 | pgvector cosine similarity |
| Hosted deployment (Railway / Fly.io) | 🔲 | |
| PWA (manifest + service worker) | 🔲 | 3–5 days, ships before native app |
| Sentry error tracking | 🔲 | |
| UptimeRobot monitoring | 🔲 | |
| Celery Beat scheduled jobs | 🔲 | 2am scrape, 5am pre-generate, Sunday profile update |
| Cloudflare DNS + SSL | 🔲 | Free tier covers launch needs |

---

## Financial & Rewards

| Feature | Status | Notes |
|---------|--------|-------|
| Credit card points optimizer | 💡 | Surface best card per category at point of spend; referral revenue |
| Card rotation alerts | 💡 | Chase Freedom 5% quarters, Amex Platinum credits, etc. |
| Annual fee value calculator | 💡 | Did you earn enough to justify your card fee? |
| Loyalty program aggregator | 💡 | Track points/miles/status across all programs in one view |
| Expiring points alerts | 💡 | "Your United miles expire in 47 days" |
| Tier status tracker | 💡 | "2 flights from Delta Gold" |
| Subscription audit | 💡 | Surface unused recurring charges matched to actual usage |
| Smart wallet (card linking) | 💡 | Make reservations/purchase tickets only in user-approved circumstances |
| Confirmed visit rewards (first-party points) | 💡 | Earn points for verified visits; redeem at partner venues or on-site store |
| Venue-funded points | 💡 | Venues pay 0.5–2% of transaction as user points (standard loyalty economics) |
| Co-branded card (long-term) | 💡 | Day Planner Visa — earn points for confirmed visits |
| Points gifting | 💡 | Send a "day out" to a friend using your points |
| Points-to-nonprofit option | 💡 | Donate points to local orgs — goodwill + press |

---

## Loyalty & Visit Tracking (Enterprise)

| Feature | Status | Notes |
|---------|--------|-------|
| Visit counter per venue | 💡 | Verified visit log usable as loyalty proof |
| Venue analytics dashboard (B2B) | 💡 | Visits, ratings, repeat rate, time-of-day breakdown — sold to venues |
| Competitor benchmarking | 💡 | "Your coffee shop is rated 4.1 for solo-friendly; top nearby competitor is 4.7" |
| Sponsored placement (labeled) | 💡 | Venue pays for inclusion in relevant itineraries; disclosed to users |
| Event ROI tracking for promoters | 💡 | Verified attendance data sold back to event organizers |
| White-label city guide | 💡 | Visit Austin / CVB co-branded version; six-figure B2B deal potential |
| Corporate wellness accounts | 💡 | $15–25/employee/month; company funds experience allowance in points |
| Team day planning | 💡 | Manager generates group itinerary with constraints; team votes |
| Relocation concierge | 💡 | Companies offer 90-day premium as part of relocation package |

---

## Trip Planning

| Feature | Status | Notes |
|---------|--------|-------|
| Trip planning tab (new surface) | 💡 | Separate from daily itinerary; full destination planner |
| Atlas Obscura-style hidden gem DB | 💡 | Unusual landmarks, roadside attractions, underground art; curated |
| Hidden gem scoring | 💡 | `(quality × uniqueness) / popularity` — surfaces under-visited gems |
| Locals-only filter | 💡 | Exclude anything in top 10 Google results for that city |
| Full trip budget calculator | 💡 | Lodging + transport + food + activities as budget / moderate / comfort bands |
| Price match alerts | 💡 | "Hotel you saved dropped $40; combined trip now under budget" |
| "Book when ready" mode | 💡 | Set budget ceiling + target dates; app monitors and alerts |
| Multi-city itinerary chaining | 💡 | Road trip planner — Hill Country, Marfa, Fredericksburg, etc. |
| Affiliate booking integration | 💡 | Hotels via Booking.com (3–8%), experiences via Viator/GetYourGuide (8–10%) |
| Offline trip cards | 💡 | Exported PDF/Apple Wallet with all bookings, addresses, offline maps |
| "Same as home" city filter | 💡 | Find places in new city that match your Austin taste profile |
| Nomad multi-city home base | 💡 | App learns city rotation; history and preferences travel with user |
| Cost-of-living integration | 💡 | "Dinner equivalent to your Austin average costs $9 in Medellín" |
| Remote work venue scoring | 💡 | Coffee shops rated on wifi, noise, power outlets, all-day friendliness |
| Nomad knowledge handoff | 💡 | Leaving a city? Hand off curated local spots to next nomad heading there |

---

## Social & Discovery

| Feature | Status | Notes |
|---------|--------|-------|
| Solo mode (v1) | ✅ | No social features intentionally |
| Opt-in event matching | 💡 | "3 other users attending this event — want to see who?" Mutual opt-in |
| Plus-one mode | 💡 | Mark activity as open to company; others can request to join |
| Interest-based auto-groups | 💡 | Form "Saturday Morning Trail Runners" from behavioral data |
| Local expert system | 💡 | 50+ confirmed completions in a category → publish curated lists; earn points |
| Vibe matching | 💡 | Match on pace + budget tier + time-of-day preference, not just interests |
| Friend activity sharing | 💡 | "Your friend Alex also saved this event" |
| Group planning | 💡 | Suggest events that work for multiple users with shared budget |
| Community challenges | 💡 | "Visit 5 new neighborhoods this month" |
| Seasonal leaderboards (opt-in) | 💡 | |
| Austin Passport | 💡 | Stamp collection for neighborhoods explored |

---

## Life Dashboard & Wellness Intelligence

| Feature | Status | Notes |
|---------|--------|-------|
| Activity-to-wellbeing correlation | 💡 | "Mood ratings 0.8★ higher on weeks with ≥2 outdoor activities" |
| Spending consciousness | 💡 | Awareness layer, not budgeting — "You spent $340 on food last week vs. $180 avg" |
| Life area radar chart | 💡 | Weekly balance view: physical / social / creative / intellectual / restorative |
| "Future you" projection | 💡 | At current trajectory, here's a month from now |
| Habit consistency tracking | 💡 | "18 of last 21 days had physical activity" |
| Sleep quality correlation | 💡 | Did active days improve next-night sleep? |
| Seasonal affective awareness | 💡 | Darker months → more social/indoor suggestions |
| Monthly SWLS life satisfaction check | 🔲 | Already planned; validated 5-question survey |
| Wearable integration (Apple HealthKit) | 💡 | HRV, sleep, readiness signal |
| Wearable integration (Google Fit) | 💡 | Android equivalent |

---

## Mobile App

| Feature | Status | Notes |
|---------|--------|-------|
| PWA (installable web app) | 🔲 | First step; 3–5 days work |
| Capacitor shell (App Store) | 🔲 | Wraps web app; 2–4 week path to App Store |
| React Native (proper native) | 🔲 | 8–16 weeks; needed for full HealthKit + native feel |
| Push notifications (morning itinerary) | 🔲 | 8am delivery; OneSignal for Capacitor, Expo Push for RN |
| Offline mode | 🔲 | Cache today's plan via service worker / local storage |
| Native HealthKit bridge | 🔲 | iOS only |
| Location-aware distance sort | 🔲 | Sort events by current location |
| Home screen widget | 💡 | Today's top pick |
| Transportation integration | 💡 | Uber/Lyft time + cost estimate per block |
| Weather-aware rescheduling | 💡 | Swap outdoor activity if rain predicted |
