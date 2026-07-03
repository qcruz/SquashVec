# Lifestyle Planner — Project Overview

**Status:** Research phase
**Last Updated:** 2026-05

---

## Concept

An AI-directed lifestyle planning app that generates detailed daily itineraries by scraping local events, organizations, and social sources — and learns over time what actually improves the user's happiness and life satisfaction.

**Not** a task manager. Not a productivity tool. A quality-of-life optimizer with a calendar interface.

---

## Core Loop

```
Morning: AI generates today's itinerary
         (events, venues, activities — with timing and travel)
         ↓
Day:     User checks off, skips, or re-rolls items
         ↓
Evening: Optional quick rating
         ↓
Night:   App updates user profile from signals
         (check-ins, skips, wearable data, sleep quality)
         ↓
         ← repeat, getting more accurate over time →
```

---

## Research Documents

| File | Contents |
|------|----------|
| `research/landscape.md` | Existing apps, competitors, market gaps |
| `research/data-sources.md` | APIs, scrapers, signal sources and costs |
| `research/ai-architecture.md` | LLM pipeline design, personalization approach, tech stack |
| `research/open-questions.md` | Unresolved product/technical/science questions + next steps |

---

## Key Design Decisions (working hypotheses)

- **v1 is single-city** — deep coverage beats wide coverage
- **Re-roll, not search** — the UX is generative, not a filter interface
- **Happiness is the north star metric**, not engagement or task completion
- **Privacy-sensitive** — behavioral + health data stays local where possible
- **LLM for extraction + planning** — scrape raw sources, use Claude Haiku to normalize; Claude Sonnet to plan
- **Cold start via simplicity** — 3 questions to get first useful itinerary

---

## Stack (planned)

- Backend: Python / FastAPI
- DB: PostgreSQL + pgvector
- AI: Anthropic API (Haiku for extraction, Sonnet for planning)
- Scraping: Playwright + LLM extraction
- Mobile: React Native or Flutter
- Wearable: Apple HealthKit + Google Fit
