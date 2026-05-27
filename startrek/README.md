# Final Frontier — A Star Trek Career Strategy Game

**Type:** Lo-fi terminal decision strategy game
**Language:** Python
**Inspiration:** Dispatch (minimalist decision management), Faster Than Light (resource
  pressure, scenario urgency), Star Trek (setting, stations, lore)

---

## Concept

You are a Starfleet officer. You started as an ensign. You will — if you survive, if you
lead well, if you make the right calls under pressure — end this game in the captain's
chair, completing a five-year deep-space expedition and returning your ship and crew
safely to Earth.

The game is not about combat. It is about decisions.

Every scenario puts you at a station, facing a problem with incomplete information and
imperfect options. You choose. The outcome depends on your relevant skills, your crew's
condition, the state of your ship, and a roll of fate. Success opens doors. Failure
leaves scars. Some decisions are irreversible.

Between missions, you choose how to spend your time. Study, train, socialize, rest. These
choices shape who your character becomes — and what options will be available to you
when the next crisis hits.

Your career is the sum of those moments.

---

## Structure

```
startrek/
  README.md               ← This file
  docs/
    concept.md            ← Full game design concept
    mechanics.md          ← Systems reference: stats, rolls, resolution
    stations.md           ← Bridge stations: roles, skills, scenario types
    career.md             ← Rank progression, tour structure, five-year mission
    traits.md             ← Character traits, free time choices, development paths
    scenarios.md          ← Scenario catalog and writing guide
  src/
    main.py               ← Entry point
    engine/               ← Core game loop, resolution engine
    content/              ← Scenario data, event tables, dialogue
    ui/                   ← Terminal rendering
```

---

## Running the Game

*Not yet implemented. Docs phase first.*

```bash
cd startrek
python src/main.py
```

---

## Design Principles

1. **Every decision has weight.** No filler choices. Every option costs something and
   gains something. The right answer is not always obvious and sometimes does not exist.

2. **Lo-fi is a feature.** Text-first. Clean terminal layout. No pixel art needed.
   The game lives in the prose and the numbers.

3. **Long-run thinking is rewarded.** A decision that looks like a win today may have
   cost you something invisible. A decision that looks like a loss may have built
   something that saves you in Year 4.

4. **The crew is real.** Named officers with personalities, histories, and arcs.
   They remember what you did. So does your record.

5. **Failure is navigable.** You will fail missions. Careers survive failure. Careers
   end by failing in the same way repeatedly, or by making one catastrophic irreversible
   mistake. The game teaches you the difference.
