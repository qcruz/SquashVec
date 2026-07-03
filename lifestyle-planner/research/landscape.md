# Landscape Research — AI Lifestyle Planning Apps

**Last Updated:** 2026-05
**Status:** Research phase

---

## What We're Building

An AI-directed lifestyle planning app that:
- Scrapes local events, organizations, social media to find things to do
- Generates detailed daily itineraries (calendar-style)
- Refreshes / regenerates on demand
- Learns over time what actually improves user happiness and life satisfaction

This is **not** a task manager. It's a life-quality optimizer with a calendar interface.

---

## Existing Apps in Adjacent Spaces

### AI Scheduling / Calendar Assistants

| App | What It Does | Gap |
|-----|-------------|-----|
| **Reclaim.ai** | Auto-schedules habits, tasks, meetings around your calendar | No event discovery; no happiness learning |
| **Motion** | AI prioritizes tasks, reschedules dynamically | Work-focused; no leisure/social dimension |
| **Cal.ai** | Natural language calendar via email | Scheduling only; no recommendations |
| **Amie** | Social calendar — see friends' availability | Social but no AI-driven lifestyle curation |
| **Structured** | Visual daily planning, time blocking | Manual input only; no external data |
| **TimeHero** | Automated task scheduling | Project/work only |
| **Fantastical** | Smart calendar parsing, weather | Feature-rich but passive — doesn't suggest anything |
| **Morgen** | Unified calendar + task planner | Good integration layer; no discovery |

**Common gap across all:** None actively discover external events, pull from local sources, or learn what makes the user happy.

---

### Event Discovery Apps

| App | What It Does | Gap |
|-----|-------------|-----|
| **Eventbrite** | Ticketed events; strong API | Formal/ticketed only; no personalization over time |
| **Meetup** | Interest-based group gatherings | Went paid API; declining platform |
| **Facebook Events** | Massive event database via social graph | API heavily restricted since Cambridge Analytica; privacy concerns |
| **Fever** | Curated local experiences, ticketed | Curated by humans; no calendar integration |
| **TimeOut** | City guides, events, restaurants | Editorial; no personalization |
| **Nextdoor** | Hyper-local community events | API not public; community-gated |
| **AllEvents.in** | Aggregates events from many sources | Poor UX; no personalization |
| **RA (Resident Advisor)** | Electronic music / nightlife | Niche; no API |
| **Bandsintown / Songkick** | Music show tracking | Music only; Spotify-connected |
| **Patch.com** | Local news + community events | Hyper-local but inconsistent quality |

**Common gap:** Discovery apps don't have calendar integration or learning loops. Calendar apps don't discover anything.

---

### Wellbeing / Happiness Tracking

| App | What It Does | Gap |
|-----|-------------|-----|
| **Daylio** | Mood + activity journaling; pattern analysis | Manual; no connection to planning |
| **Bearable** | Symptom + mood + habit tracking | Medical focus; not connected to calendar |
| **Reflectly** | AI-guided journaling | Journaling only; no actionability |
| **Finch** | Gamified self-care goal-setting | Cute but shallow |
| **Oura Ring app** | Sleep + recovery + readiness score | Hardware-gated; no event planning |
| **Whoop** | Training/recovery optimization | Sport/performance focus |

**Common gap:** Wellbeing data is siloed. None of these apps feed back into what gets scheduled.

---

## The White Space

No existing app combines:
1. **Active external discovery** (events, orgs, places scraped from real sources)
2. **Intelligent itinerary generation** (daily plans, not just task lists)
3. **Feedback loop on actual happiness** (did this actually improve your day?)
4. **Calendar integration** as the primary interface

The closest conceptual precedent is Google's "For You" recommendations + Google Maps events + Google Calendar — but they're deliberately siloed products that don't form a coherent planning system.

---

## Differentiating Design Principles

1. **The app is a planner, not a browser.** It brings options to you; you don't search.
2. **Happiness is the metric.** Not productivity. Not task completion. "Was this a good day?"
3. **Itineraries, not lists.** A generated day has a shape: morning, afternoon, evening.
4. **Re-roll, don't configure.** The UX is "generate another option" not "set 47 filters."
5. **Learning is passive.** The app infers from behavior — check-ins, skips, time spent — not from questionnaires.
6. **Local-first.** Emphasis on hyperlocal discovery that big platforms miss.
