# App Framework — Itinerary System Design

**Last Updated:** 2026-05
**Location context:** Austin, TX (v1 pilot)

---

## Overview

The app generates daily itineraries by combining:
1. A **user profile** (interests, recurring commitments, linked calendar, location)
2. A **balance framework** grounded in wellbeing research (what a healthy day looks like)
3. A **tag-based activity graph** that tracks not just preference but optimal frequency
4. A **live event database** (Austin-specific: scraped + API-sourced)

The planner's goal is not to give users more of what they already like. It's to find the activity mix — across type, frequency, and intensity — that produces the highest sustained life satisfaction over time.

---

## Part 1 — User Profile Setup

### 1.1 Onboarding Flow (minimal friction)

**Step 1: Identity tags** (pick any, add custom)
The user selects from a tag cloud. These seed the initial recommendation model.

```
NATURE          GAMING          SOCCER          GROUP ACTIVITIES
BOOKSTORES      ANIMALS         LIVE MUSIC       COFFEE SHOPS
HIKING          COOKING         ART              FILM
RUNNING         YOGA            COMEDY           PHOTOGRAPHY
HISTORY         NIGHTLIFE       VOLUNTEERING     MARKETS
CYCLING         CLIMBING        SWIMMING         READING
BOARD GAMES     DANCING         THEATER          FOOD TOURS
MEDITATION      DIY / CRAFTS    LANGUAGES        ASTRONOMY
```

**Step 2: Lifestyle context** (3–4 quick questions)
- "What does a great Saturday morning look like?" (free text → LLM-tagged)
- "How far are you usually willing to travel for something?" (slider: 5 / 15 / 30 / 45+ min)
- "Do you prefer solo activities, small groups, or big events?" (3 options)
- "Any recurring commitments we should work around?" (e.g., work 9–5, gym Tue/Thu)

**Step 3: Calendar & alarm linking** (optional at onboarding, prompted later)
- Google Calendar / Apple Calendar (CalDAV)
- Apple HealthKit / Google Fit (for wearable readiness signal)
- Existing alarm patterns (infer wake time from alarm history)

**Step 4: First itinerary generated immediately** — no more questions. User swipes/skips to train the model.

---

### 1.2 Recurring Events (User-Managed)

Users can anchor recurring items that the planner works around:
- Fixed (non-negotiable): work, classes, religious observance
- Preferred (suggest around): gym routine, weekly dinner with friends
- Aspirational (help me do more of): weekly hike, one new restaurant/month

Recurring aspirational items appear in the pool as "standing suggestions" even when no specific event exists — they can be fulfilled by any matching activity.

---

## Part 2 — Mental Health & Balance Research Basis

### 2.1 Core Research Framework

The balance system is grounded in four convergent research traditions:

**A. PERMA Model (Seligman, 2011)**
Wellbeing requires all five: Positive Emotion, Engagement, Relationships, Meaning, Achievement.
An itinerary that's all leisure (Positive Emotion only) isn't actually optimized for happiness.
Each day should have at least one item touching each dimension.

**B. Hedonic Adaptation Prevention (Lyubomirsky & Sheldon, 2012)**
The central insight: *people adapt to good things.* A favorite restaurant feels less special on the 20th visit than the 3rd.
- Variety across activities matters more than finding the single "best" activity
- Intermittent, spaced repetition of enjoyable activities > daily repetition
- Novel experiences produce stronger emotional responses than familiar ones
- **Implication:** The app must model adaptation curves, not just preference scores

**C. Self-Determination Theory (Deci & Ryan)**
Three psychological needs: Autonomy (choice), Competence (growth), Relatedness (connection).
Itineraries should include activities that challenge slightly (competence), are chosen not imposed (autonomy), and involve at least occasional human contact (relatedness).

**D. Attention Restoration Theory (Kaplan & Kaplan)**
Nature exposure restores depleted cognitive attention. Even 20–30 minutes in a green space measurably reduces cortisol and improves mood and focus.
- Minimum 1 outdoor / nature-adjacent item per day where possible
- Priority increases on high-stress days (inferred from wearable or morning check-in)

**E. Time-of-Day Chronobiology**
Circadian research shows predictable cognitive/physical performance windows:
- **Morning (wake + 2–4h):** Peak cognitive performance → best for creative, skill-building, learning
- **Early afternoon (1–3pm):** Natural dip → social, easy physical, low-stakes exploration
- **Late afternoon (3–6pm):** Second cognitive peak → good for exercise, active engagement
- **Evening (after 7pm):** Wind-down → leisure, social connection, entertainment

The planner uses these windows when ordering the day's itinerary.

---

### 2.2 The Six Balance Dimensions

Every activity gets tagged across six binary dimensions. The planner ensures variety across all six over a rolling 7-day window (not necessarily in a single day):

| Dimension | Pole A | Pole B |
|-----------|--------|--------|
| **Physical** | Active / exercise | Sedentary / rest |
| **Social** | Group / social | Solo / private |
| **Environment** | Outdoor / nature | Indoor / built environment |
| **Mode** | Productive / growth | Leisure / consumption |
| **Familiarity** | Novel / exploratory | Familiar / nostalgic |
| **Stimulation** | High energy / exciting | Low energy / calming |

**Daily target:** At least one item from each of these six dimensions over the course of the day.
**Weekly target:** Roughly balanced across both poles of each dimension — tracked by the system.

Example imbalance detection:
> "You've had 6 indoor activities in a row. Today's plan prioritizes an outdoor option even if it's slightly below your average preference score."

---

### 2.3 Daily Structure Template

Each generated day has up to five **time blocks**, not a packed schedule. Each block is one activity + travel + buffer. Most days use 3–4 blocks; all five is a big day.

```
MORNING BLOCK     (Wake time + 1h → noon)
  Target:         1 activity
  Bias:           Active, outdoor, productive, or creative
  Austin examples: Lady Bird Lake walk, weekend farmers market,
                   Barton Springs swim, climbing gym, coffee shop work session

MIDDAY BLOCK      (noon → 2pm, optional)
  Target:         0–1 activity (often just: a good place to eat)
  Bias:           Exploratory, low-effort, social
  Austin examples: Food truck on South Congress, new taco spot,
                   Barton Springs picnic, Mueller farmers market lunch

AFTERNOON BLOCK   (2pm → 6pm)
  Target:         1 activity
  Bias:           Main event — highest-interest item of the day
  Austin examples: Live music at Stubb's, community soccer pickup,
                   Blanton Museum, Bookpeople browse, kayak on Lady Bird

DINNER BLOCK      (6pm → 9pm)
  Target:         1 restaurant or food experience
  Bias:           Restaurant discovery — new cuisine, new neighborhood
                  Rotates between "new discovery" and "trusted favorite"
                  based on novelty balance for the week
  Austin examples: Uchi, Qui, new East Austin opening, food hall at 2nd St,
                   late happy hour with small plates
  Notes:          Explicitly tracks restaurant novelty separately from
                  other tag novelty. "New restaurant" is its own tag with
                  its own saturation curve. After 6 new restaurants in a
                  row, the system suggests a beloved regular instead.

NIGHTTIME BLOCK   (9pm → midnight, optional)
  Target:         0–1 activity — suggested only if user energy is high
                  and it's a weekend or the user has indicated night owl preference
  Bias:           Social, entertainment, low-commitment (easy to bail)
  Austin examples: Live music on 6th St or Red River, comedy at Cap City,
                   bar crawl, late-night food (Kerbey Lane), rooftop bar,
                   bowling at Barrel O' Fun, night swim at Barton Springs
                   (open until 10pm in season)
  Notes:          Never suggested on a weeknight unless user explicitly
                  marks themselves as a night owl or it's a holiday eve.
                  Late-night bar suggestions rotate — not every weekend.
                  Always paired with a "call it early" alternative.

UNSCHEDULED TIME: At least 2 hours unblocked every day. Always.
```

### 2.4 Dinner & Nighttime — Special Rules

**Dinner block logic:**
- 70% of the time: suggest somewhere new (discovery mode)
- 30% of the time: suggest a confirmed favorite (comfort/nostalgia mode)
- The 70/30 split adjusts based on the week's novelty score — if the user has had a high-novelty week, lean more toward a comfort dinner
- Track cuisine diversity separately: if the last 4 dinners were all the same cuisine type, force a different suggestion

**Nighttime block logic:**
- Only generated when: (a) it's a Friday or Saturday, OR (b) user is marked night owl, OR (c) it's a holiday/event eve
- Never back-to-back late nights suggested without a quiet evening in between
- Bar suggestions have their own saturation tracking — "you've gone out 3 weekends in a row; here's a chill alternative"
- Always shows an explicit "or just stay in" alternative on the nighttime card

---

## Part 3 — Activity Cards

Each proposed itinerary item is a **card** — a self-contained unit of information the user can accept, skip, or save.

### 3.1 Card Schema

```json
{
  "card_id": "evt_austin_20260531_abc123",
  "title": "Barton Springs Pool",
  "subtitle": "Outdoor swimming in a spring-fed pool",
  "source": "city_parks_scrape",
  "source_url": "https://austintexas.gov/barton-springs",

  "schedule": {
    "date": "2026-06-01",
    "start_time": "09:00",
    "end_time": "11:30",
    "duration_min": 150,
    "time_block": "morning"
  },

  "logistics": {
    "location_name": "Barton Springs Pool",
    "address": "2201 Barton Springs Rd, Austin TX 78746",
    "coordinates": [30.2637, -97.7707],
    "distance_miles": 3.2,
    "travel_time_min": 12,
    "travel_mode": "car",
    "estimated_cost_usd": 5,
    "cost_tier": "free_or_cheap",    // free | cheap (<$15) | moderate ($15–50) | premium (>$50)
    "indoor_outdoor": "outdoor",
    "parking_notes": "Street parking on Barton Springs Rd; arrive before 9am on weekends"
  },

  "tags": {
    "system_tags": ["nature", "swimming", "outdoor", "active", "solo_ok", "group_ok",
                    "family_friendly", "dog_friendly", "recurring", "austin_classic"],
    "user_confirmed_tags": [],       // tags the user has confirmed via feedback
    "user_added_tags": [],           // tags the user manually added
    "crowdsourced_tags": []          // tags confirmed by multiple users
  },

  "balance_dimensions": {
    "physical": "active",
    "social": "either",
    "environment": "outdoor",
    "mode": "leisure",
    "familiarity": "familiar",
    "stimulation": "moderate"
  },

  "planner_note": "You haven't been outdoors in 3 days and it's forecast 78°F. Barton Springs is a perennial Austin favorite you last visited 6 weeks ago.",

  "meta": {
    "times_shown": 3,
    "times_accepted": 1,
    "times_skipped": 1,
    "times_completed": 1,
    "last_completed": "2026-04-15",
    "user_rating": 4,
    "score_decay_factor": 0.92      // reduced from 1.0 because it's been shown recently
  }
}
```

### 3.2 Card UI Elements

**Front of card (list view):**
```
┌─────────────────────────────────────────────────────┐
│  🏊 BARTON SPRINGS POOL          9:00am · ~2.5h     │
│  Outdoor spring-fed swimming                        │
│                                                     │
│  📍 3.2 mi · 12 min drive   💵 $5   🌤 Outdoor      │
│  ────────────────────────────────────────────────── │
│  🏷 nature  swimming  active  austin classic        │
└─────────────────────────────────────────────────────┘
```

**Tap to expand:**
- Full description
- Map preview + directions
- Parking/logistics notes
- "Why today?" explanation (the planner_note)
- Tag confirm/add interface
- Similar alternatives

**Actions:**
- ✓ Add to my day
- ↻ Show me something different (re-roll this slot)
- ♡ Save for later
- ✗ Not interested (skip + ask why: "Too far / Too expensive / Wrong vibe / Already done it recently")

---

## Part 4 — Tag System

### 4.1 Tag Taxonomy (Initial Set)

Tags are organized into categories. Users see flat labels; the system knows the hierarchy.

```yaml
ACTIVITY_TYPE:
  - hiking, running, cycling, swimming, yoga, climbing, gym, team_sports,
    martial_arts, dance, skating, kayaking, paddleboarding

SOCIAL_FORMAT:
  - solo_activity, small_group (2–5), large_group (6+), community_event,
    spectator, family_friendly, date_activity, dog_friendly

ENVIRONMENT:
  - outdoor, indoor, nature, urban, waterfront, park, trail, rooftop,
    underground, historic_building

VIBE:
  - chill, high_energy, intimate, lively, loud, quiet, artsy, nerdy,
    sporty, foodie, spiritual, nostalgic

CONTENT:
  - live_music, visual_art, film, comedy, theater, literary, gaming,
    cooking, crafts, learning, science, history, trivia, markets,
    food_trucks, festivals, lectures

COST_LEVEL:
  - free, cheap, moderate, splurge

TIME_OF_DAY:
  - early_morning, morning, midday, afternoon, evening, late_night

FREQUENCY_PATTERN:
  - recurring_weekly, recurring_monthly, one_time, seasonal, popup

AUSTIN_SPECIFIC:
  - 6th_street, south_congress, east_austin, barton_springs, zilker,
    lady_bird_lake, red_river, domain, mueller, north_loop
```

### 4.2 Tag Assignment

**Auto-tagged at ingestion:** System tags applied by the LLM extraction pipeline based on event description, venue category, and location.

**Confirmed by user:** After attending an event, users are shown "Were these tags accurate?" with one-tap confirm/reject. Add tags via simple text input.

**Crowdsourced:** Once 3+ users confirm the same tag for an event template, it becomes a "verified" tag with higher weight.

**Learned over time:** The system infers new tags from behavioral patterns:
> "Events you rate highly tend to also have the tag 'waterfront' even though you didn't select it at onboarding. Added to your interest profile."

---

## Part 5 — Frequency Optimization (The Core Algorithm)

This is the key differentiator. The system tracks not just *whether* you like a tag but *how often* that tag produces high satisfaction — and whether that satisfaction is declining.

### 5.1 The Saturation Problem

Standard recommendation systems break down over time because:
- High positive score → more suggestions of that type
- More suggestions → more saturation → declining novelty
- Declining novelty → score drops
- System interprets as preference change → reduces suggestions
- Gap in that activity type → score rises again when reintroduced

The app should **model this curve proactively**, not reactively.

### 5.2 Per-Tag Frequency Model

For each tag in the user's profile, the system maintains:

```python
TagProfile {
  tag:                 "live_music",
  base_interest:       0.85,          # 0–1, from onboarding + long-run average
  current_weight:      0.71,          # adjusted score right now
  times_shown_30d:     14,
  times_accepted_30d:  8,
  times_completed_30d: 6,
  avg_rating_30d:      3.8,           # out of 5
  avg_rating_90d:      4.1,
  last_completed:      "2026-05-28",
  days_since_last:     3,
  saturation_signal:   "moderate",    # none | mild | moderate | high
  optimal_frequency:   "2–3x/week",   # system's current estimate
  reintroduction_due:  false
}
```

### 5.3 Saturation Detection Rules

```
IF avg_rating_30d < avg_rating_90d - 0.4:
  → Mild saturation detected. Reduce frequency by 30%.

IF avg_rating_30d < avg_rating_90d - 0.8:
  → Moderate saturation. Reduce by 60%. Flag for reintroduction gap.

IF acceptance_rate_30d < acceptance_rate_90d * 0.6:
  → User is skipping this type more. Cross-check against scheduling conflicts
    before reducing weight. If no conflict → saturation likely.

IF days_since_last > 21 AND base_interest > 0.7:
  → Reintroduction window. Boost current_weight by 25% for next 5 days.
    ("It's been a while since you've done something music-related")
```

### 5.4 Cross-Tag Interactions

Some activities have synergistic or cannibalizing relationships:

```
"live_music" + "outdoor" → higher satisfaction than "live_music" alone
"live_music" + "live_music" (same week) → saturation accelerates
"hiking" when "yoga" frequency is high → complementary; sustains both
"gaming" when "outdoor" is very low → mild flag (indoor sedentary cluster)
```

These interactions are learned from the user's own data over 60–90 days, but seeded from population-level correlations in the research literature and crowdsourced data.

### 5.5 Weekly Balance Score

Each Sunday, the system calculates a **Week Balance Score** — not shown as a number but used internally:

```
Dimensions checked (0–1 each):
  Physical activity days / 7         → target: 3–4
  Outdoor days / 7                   → target: 3–5
  Novel experiences / 7              → target: 2–3
  Social interactions / 7            → target: 3–4
  Creative / productive / 7          → target: 2–3
  Calm / low-stimulation / 7         → target: 2–4

Tags that are overdue (> 1.5x optimal interval)
Tags that are oversaturated (> 0.8x optimal interval under threshold)
```

This score feeds next week's itinerary weights — not visible to the user, but surfaced as soft natural language nudges:

> "You've been mostly indoors this week — this weekend is a good chance to get outside."

---

## Part 6 — Feedback Collection

### 6.1 Feedback UX Principles

- **Never interrupt the day.** Feedback is collected at natural pause points (evening, next morning).
- **Keep it under 5 seconds.** One-tap ratings only; optional free text never required.
- **Make inaction informative.** Skipping an item without rating is itself a signal.

### 6.2 Feedback Touchpoints

| Moment | What's Asked | Format |
|--------|-------------|--------|
| Morning (opening app) | "How did yesterday go overall?" | 😞 😐 😊 😄 |
| After completing an event | "Quick — how was it?" | ★ ☆☆☆☆ to ★★★★★ |
| When skipping a card | "Why pass on this?" | 4 one-tap options |
| Weekly (Sunday evening) | "What kind of week was it?" | 3-slider: energy / connection / enjoyment |
| Tag feedback (post-event) | "Did these tags fit?" | Swipe confirm/reject each tag |

### 6.3 Skip Reasons (taxonomy)

When a user skips a card, they're offered one tap:
- **Too far** → distance preference flag
- **Too expensive** → cost ceiling flag
- **Not in the mood** → timing signal (not a permanent negative)
- **Already done it recently** → saturation signal
- **Just not my thing** → negative tag weight
- (skip the skip reason entirely) → mild negative signal with no specificity

The distinction between "not in the mood" and "not my thing" is crucial for the model.

---

## Part 7 — Austin-Specific Data Strategy (v1 Pilot)

### Sources to prioritize for Austin launch:

| Source | What it gives us |
|--------|-----------------|
| Eventbrite Austin | Ticketed events — music, festivals, classes, markets |
| Ticketmaster Austin | Concerts, sports (FC Austin, UT sports) |
| City of Austin Parks & Rec | Free programming, pool schedules, Barton Springs hours |
| Austin Public Library | Free events, classes, film screenings |
| Austin FC / UT schedules | Sports calendar |
| Red River Cultural District sites | Independent music venues |
| Do512 scrape | Curated Austin events; strong for arts/music/food |
| Austin Reddit (r/Austin) | Community picks, popup events, weekly threads |
| Yelp Fusion (Austin geo) | Venues, hours, categories, busy times |
| Google Places (Austin geo) | Supplemental venue data; photo coverage |
| Lady Bird Johnson Wildflower Center | Seasonal nature events |
| Austin Trail of Lights / ACL Fest | Major seasonal anchors |

### Seed tag set for Austin:
`barton_springs` `zilker` `lady_bird_lake` `south_congress` `east_austin`
`6th_street` `red_river` `food_trucks` `acl_style_outdoor_music` `trail_running`
`live_music_free` `comedy_austin` `ut_events` `farmers_markets_austin`
