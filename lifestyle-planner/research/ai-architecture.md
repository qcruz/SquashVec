# AI Architecture — How the App Thinks

**Last Updated:** 2026-05

---

## Core Intelligence Problems

The app needs to solve four distinct AI problems:

1. **Discovery** — Find relevant events and places from raw sources
2. **Itinerary Generation** — Compose a coherent, timed daily plan
3. **Personalization** — Learn what this specific user enjoys
4. **Happiness Inference** — Figure out what actually improved life quality

---

## 1. Discovery — LLM-Assisted Event Extraction

### The Problem
Sources are inconsistent: some are structured JSON APIs, others are raw HTML, others are Reddit threads saying "anyone going to the farmers market this Sunday?"

### Approach: LLM Extraction Pipeline

```python
# Pass raw page content to a fast/cheap model (Claude Haiku, GPT-4o-mini)
# with a structured extraction prompt

EXTRACTION_PROMPT = """
Extract all events from this content. For each event return JSON:
{
  "title": string,
  "date": ISO-8601 or null,
  "time": "HH:MM" or null,
  "location_name": string or null,
  "address": string or null,
  "description": string (50–150 words),
  "url": string or null,
  "categories": [string],
  "price": "free" | "paid" | "unknown",
  "estimated_duration_hours": number or null
}
Return [] if no events found.
"""
```

**Cost estimate:** Claude Haiku at ~$0.25/1M input tokens — a full newspaper events page (~4,000 tokens) costs ~$0.001. Running 200 pages/day = ~$0.20/day in extraction costs.

### Embedding & Deduplication
- Embed event titles + descriptions using `text-embedding-3-small` (OpenAI) or `voyage-3-lite` (Voyage AI)
- Store in pgvector; cosine-similarity dedup on ingestion
- Same event from Eventbrite AND a venue scrape gets merged

---

## 2. Itinerary Generation — LLM Planner

### The Problem
Given a pool of available events and user preferences, compose a realistic, appealing day plan.

### Core Prompt Architecture (Chain-of-Thought)

```
System:
You are a personal lifestyle planner. Your job is to design a genuinely
enjoyable day for the user. You know the following about them:
- Interests: {user_profile}
- Energy today: {readiness_signal}   # from wearable or morning check-in
- Day of week: {day}, weather: {weather}
- Available time blocks: {free_blocks}
- Past patterns: {behavior_summary}  # "tends to skip outdoor events when overcast"

Events available today:
{event_list}  # retrieved from DB by geo + date

Instructions:
1. Select 2–4 activities that form a coherent day arc (morning, afternoon, evening).
2. Account for travel time between locations.
3. Mix at least one social/community activity if available.
4. Do not overschedule — leave breathing room.
5. Return a structured itinerary.
```

### Output Schema (Structured Generation)

```json
{
  "day_theme": "Low-key creative Sunday",
  "blocks": [
    {
      "time": "10:00",
      "duration_min": 90,
      "type": "activity",
      "event_id": "evt_1234",
      "title": "Farmers Market — SFC Downtown",
      "location": "Republic Square, Austin",
      "why": "You haven't been outdoors much this week and it's 72°F",
      "travel_from_prev": null
    },
    ...
  ],
  "alternatives": ["evt_5678", "evt_9012"]   # re-roll candidates
}
```

### Re-roll Mechanism
- User taps "re-roll" → remove that block, replace with an alternative
- User taps "re-roll everything" → regenerate full itinerary with a different seed prompt
- Alternatives are pre-fetched at generation time so re-roll is instant (no API call)

---

## 3. Personalization — Learning What the User Likes

### The Problem
Classic recommendation systems (collaborative filtering) require lots of users or lots of data. A single-user lifestyle app needs to learn fast from sparse signals.

### Approach: Contextual Preference Profile

Maintain a structured user profile that the LLM planner reads directly:

```json
{
  "strong_positives": [
    "live music on weekday evenings",
    "outdoor markets on weekend mornings",
    "climbing gym on days with high energy readiness"
  ],
  "strong_negatives": [
    "crowded bar events",
    "events > 30 min drive away"
  ],
  "tentative": [
    "art gallery openings — attended twice, mixed feedback"
  ],
  "time_patterns": {
    "best_days": ["Saturday", "Sunday"],
    "peak_energy_window": "10:00–14:00",
    "needs_quiet_after": "21:00"
  },
  "social_preference": "small groups or solo; avoids large crowds"
}
```

**How the profile is built:**
- Start with a 3-question onboarding (fast, not a form)
- Update after each event: LLM reads check-in/skip + any rating → appends to profile
- Weekly: LLM summarizes the week's patterns → compresses profile

```python
UPDATE_PROMPT = """
The user's current preference profile is:
{current_profile}

This week they:
- Attended: {attended_list} and rated them {ratings}
- Skipped: {skipped_list}
- Re-rolled: {rerolled_types}

Update the preference profile to reflect what you learned. Be specific.
Keep it under 300 words. Return updated JSON.
"""
```

### Embedding-Based Similarity (longer term)
- Embed each attended event
- Over time, cluster attended events to find latent preference categories
- Use cluster centroids to bias retrieval from the event DB

---

## 4. Happiness Inference — The Hard Problem

### What We Actually Mean by "Happiness"

Psychological research (Seligman's PERMA model, Kahneman's experienced vs. remembered utility) suggests:
- **Hedonic** happiness: moment-to-moment positive emotion
- **Eudaimonic** happiness: meaning, engagement, growth
- **Social** happiness: quality of relationships

The app should track all three, since someone who maximizes hedonic pleasure (Netflix marathons) may not be improving life satisfaction.

### Signals Available

| Signal | What It Measures | How to Get It |
|--------|-----------------|---------------|
| Morning mood tap | Baseline emotional state | 3-option check-in at itinerary view |
| Evening rating | Remembered utility | Optional 1–5 stars + free text |
| HRV / readiness | Physiological wellbeing | Wearable integration |
| Sleep quality next night | Recovery after activities | Wearable |
| Re-engagement rate | Did they come back? | App usage patterns |
| Week-on-week rating trend | Longitudinal satisfaction | Aggregate score |

### The Feedback Loop

```
Day planned → Day lived → Signals collected → Profile updated → Better day planned
```

Key insight: **the app should never ask "did you have fun?" directly.** That's too cognitive. Instead:
- "What did you end up doing today?" (recognition, not recall)
- A thumbs up/down on the full day at evening
- Passive: did sleep improve after active vs. passive days?

### Measurement Framework (Long-term)

Monthly (optional): A validated 5-question life satisfaction check-in (adapted from SWLS — Satisfaction With Life Scale). Track trend over time. This gives ground truth to correlate against the weekly activity mix.

---

## LLM Model Selection

| Task | Model | Rationale |
|------|-------|-----------|
| Event extraction (bulk) | Claude Haiku 4.5 or GPT-4o-mini | Cheap; runs thousands of pages/day |
| Itinerary generation | Claude Sonnet 4.6 | Quality matters here; one call/day |
| Profile update | Claude Haiku 4.5 | Low stakes; frequent |
| Complex reasoning / debugging | Claude Opus 4.6 | Rare; when the planner gets something badly wrong |

**Total LLM cost estimate (single active user):**
- Extraction: ~$0.20/day
- Itinerary: ~$0.01/day (Sonnet, ~1K tokens)
- Profile: ~$0.002/day
- **Total: ~$0.25/user/day = ~$7.50/user/month**

That's a real cost. At scale, extraction amortizes across all users in the same city.

---

## Tech Stack Recommendation

| Layer | Choice | Reason |
|-------|--------|--------|
| Backend | Python (FastAPI) | AI ecosystem; async; good library support |
| Database | PostgreSQL + pgvector | Events storage + semantic search |
| Job queue | Celery + Redis | Async scraping / extraction jobs |
| Scraping | Playwright + BS4 + LLM extraction | Handles dynamic and static sites |
| AI | Anthropic SDK (primary) | Quality + reliability |
| Embeddings | Voyage AI or OpenAI | Cost-effective |
| Calendar sync | CalDAV / Google Calendar API | Standard |
| Frontend (v1) | React Native or Flutter | iOS + Android from one codebase |
| Wearable | Apple HealthKit + Google Fit | Covers ~90% of smartwatch users |
| Hosting | Railway or Fly.io | Simple deploy; scales to small-medium |
