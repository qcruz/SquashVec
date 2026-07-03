# Open Questions & Research Gaps

**Last Updated:** 2026-05

These are the questions that need to be answered before building starts.

---

## Product Questions

**1. What is the primary geographic scope for v1?**
- Single city (easiest; deep coverage) vs. multi-city (harder; thinner coverage)
- Single city lets you build real relationships with venue APIs and scrapers
- Recommendation: pick one city with a strong events culture for the pilot (Austin, Portland, Denver, Nashville are good candidates)

**2. How many events per day does a useful itinerary require in the database?**
- Need to test: is 50 events/day enough? 500?
- Need diversity: if the city only has ticketed concerts in the DB, itineraries will be boring
- Must include free / casual options (parks, cafes, markets, pickup sports)

**3. What is the minimum viable onboarding?**
- Goal: get a useful first itinerary with the least friction
- Hypothesis: city + 3 interest categories + one "what does a good Saturday look like?" question
- Alternative: generate a neutral itinerary first, then learn from the first swipe session

**4. Is this a daily app or a weekly planning app?**
- Daily: check in the morning, see today's plan, tap a few things
- Weekly: on Sunday evening, plan the whole week
- Probably both: weekly rough plan + daily refresh based on energy/weather

**5. Social dimension — yes or no?**
- "Your friend Alex also saved this event" dramatically increases event attendance
- But adds significant complexity and a chicken-and-egg problem
- Recommendation: build solo-first, add social layer in v2

---

## Technical Questions

**6. How do we handle events without structured data?**
- Facebook events are largely inaccessible via API
- Instagram location-tagged posts mention events but are unstructured
- Scraping community Facebook groups is against ToS
- **Open:** is there a legal, reliable path to community event data that isn't on Eventbrite?

**7. How do we deduplicate events from multiple sources reliably?**
- Same concert appears on Ticketmaster, venue website, and a local blog
- Fuzzy title matching + time + location works for most cases
- LLM can resolve ambiguous cases but adds latency/cost
- Need to test dedup accuracy before building the full pipeline

**8. Can we infer event quality before the user goes?**
- Eventbrite has "going" counts but not ratings
- Google reviews for venues can proxy quality
- Social proof from Reddit ("this is always a good time") is hard to quantify
- **Open:** how do we surface "this is usually great" vs. "this is an unknown"?

**9. What's the privacy model for behavioral data?**
- Happiness tracking data is sensitive
- Wearable data (HRV, sleep) is medical-adjacent
- Local processing vs. cloud storage is a real trade-off
- Apple's on-device ML (Core ML) could keep mood/health data local
- **Decision needed:** where does the learning model live?

**10. How do we handle the cold start problem for new users?**
- First week: no behavioral data → planner is guessing
- Options: (a) explicit onboarding survey, (b) start with most-popular local events, (c) ask demographic proxies (age, lifestyle)
- User research needed: how much do people tolerate a "setup" phase?

---

## Science / Psychology Questions

**11. What's the best validated proxy for happiness that doesn't require journaling?**
- Candidates: HRV trend, sleep quality, engagement with the app itself
- Academic literature: Killingsworth (2022) "experienced happiness" via smartphone; Lyubomirsky on activity variety
- **Next step:** read the hedonic adaptation literature — apps that produce too-similar itineraries may cause "happiness saturation"

**12. Does scheduling planned activities actually make people happier, or does spontaneity matter?**
- Research: having things to look forward to (anticipatory pleasure) is a strong predictor of wellbeing
- But: over-scheduling creates its own stress
- The app needs to build in unstructured time and not fill every hour
- Key constraint: **never schedule past 70% of available time**

**13. What types of activities have the highest ROI on wellbeing?**
- Psychology consensus: social connection > entertainment, nature > urban, novel > familiar
- Implication: the app should bias toward social + outdoor + novel activities, not just what the user has done before
- Tension with personalization: if user's history shows they love Netflix-equivalent events (passive entertainment), should the app comply or nudge toward higher-wellbeing options?

---

## Competitive Risks

**14. Can Google just do this?**
- Google Maps + Google Calendar + Gemini is an obvious combination
- Risk is high: Google has the data, the calendar surface, and the AI
- Defense: depth of personalization, hyperlocal data Google ignores, happiness-first framing vs. engagement-first
- **Strategic note:** build on infrastructure Google doesn't own (local scrapers, wearable feedback loops)

**15. Could Eventbrite or Meetup add this?**
- Eventbrite has the event data but no calendar product
- They'd need to build the planning layer from scratch
- More likely acquisition target than competitor

---

## Immediate Next Steps

1. [ ] **API access audit** — actually register for Eventbrite, Ticketmaster, Yelp, Google Places, Foursquare; test rate limits and data quality for one target city
2. [ ] **Scraping pilot** — pick 5 local sites in one city; test LLM extraction quality on real pages
3. [ ] **Competitor deep-dive** — get inside Reclaim.ai and Amie; identify the exact UX pattern we're competing with and differentiating from
4. [ ] **User interviews** — talk to 5 people about how they currently find things to do and why they don't do more of what they'd enjoy
5. [ ] **Prototype itinerary generation** — write the planner prompt, run it against a manually-curated list of 20 events, evaluate quality
