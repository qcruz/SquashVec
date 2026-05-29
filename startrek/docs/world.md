# Starsleep — World Reference

**Last Updated:** 2026-05
**Status:** Design document — working title confirmed

---

## Setting Overview

**Starsleep** is a text-driven strategy game set in a gritty, working-class far future.
The world is not utopian. Space is expensive to cross, factions compete for territory
and resources, and most people doing important work out here are doing it because they
have to — not because it's heroic.

The player is a **Sleeper**: someone who travels between star systems via cryo-sleep,
waking in a new place with a specific set of skills, a small debt, and no institutional
home — yet. Over the course of the game they build a career, choose a faction, assemble
a crew, and eventually command longer and longer voyages across increasingly dangerous space.

### Design Pillars (Citizen Sleeper influence)

| Pillar | What It Means |
|--------|--------------|
| **Every cycle costs something** | Time and resources are limited. Rest costs a cycle. Doing nothing is a choice. |
| **Relationships are mechanical** | Crew loyalty, faction rep, and NPC trust directly affect outcomes. |
| **Consequences accumulate** | Career flags, dead crew, and broken promises persist. The log never forgets. |
| **No clean answers** | The game's hardest moments have no good option — only less bad ones. |
| **Work is the story** | The narrative emerges from the jobs taken, the choices made, and the crew earned. |

### What Makes It Different from Other Sci-Fi Games

- No galaxy-saving chosen-one narrative. You are a competent professional trying to do the right thing under real constraints.
- Your crew are named individuals with histories, hidden strengths, and limited loyalty. Losing one is not a stat change — it's a hole.
- The factions are not Good and Evil. Each has a coherent internal logic and serious blind spots.
- You don't win. You complete your career, account for what you've done, and see the final score.
- The ship is always eventually destroyed. This is told to you at the start.

---

## The Universe

### Scale

The game takes place in a region of space called the **Reach** — approximately 300 light years in diameter, containing around 40 inhabited systems and over 200 surveyed but uninhabited ones. It is not the whole galaxy. It is a frontier.

Beyond the Reach: mostly unknown. Mapped in fragments by Searcher vessels. Whatever destroyed the previous wave of civilizations left things out there. Most professionals know not to go looking unless they're paid extremely well.

### The Economy

Everything in the Reach runs on three currencies:

| Currency | What It Buys | Who Controls It |
|----------|--------------|-----------------|
| **Credits** | Ships, repairs, supplies, services, passage | Hegemony mints; all factions accept |
| **Intel** | Routes, anomaly data, political intelligence, crew recommendations | Primarily Searchers; Independent operators trade it freely |
| **Rep** | Access, trust, contracts, introductions | Faction-specific; earned through actions, lost through failure or betrayal |

Rep is tracked separately per faction: **Hegemony Rep**, **Searchers Rep**, **RedHawk Rep**, **Independent Rep**. You can have positive Rep with all four simultaneously — or negative Rep with one, which closes doors.

### Technology

Mid-far-future. Faster-than-light travel exists via warp drives. Matter transport ("transport") works on short ranges. Artificial gravity is standard. Weapons range from sidearms to ship-killing railguns.

Medicine is advanced — most injuries recoverable. Death still happens, usually from violence, accident, or catastrophic system failure.

Artificial intelligence exists in limited forms (navigation computers, diagnostic systems) but not as general-purpose entities. Synthetic crew members are possible but rare and politically contested.

---

## Farpoint Station — The Beginner Section

### Overview

Every new character starts at **Farpoint Station**: a mid-sized mining and resupply colony anchored to a metal-rich asteroid in the outer edge of the Reach. It is not glamorous. It is functional, indebted, and full of people with complicated pasts.

Farpoint is where Sleepers wake up.

The cryo-pod delivery service that brought you here has filed your debt with Farpoint's station authority. You owe passage fees plus docking credit. Until it's paid, you work Farpoint.

### The Station

```
FARPOINT STATION — Population ~1,200
  ├── Operations Level (administration, docking, Hegemony liaison office)
  ├── Industrial Level (mining coordination, equipment bays, cargo processing)
  ├── Residential Level (crew quarters, mess hall, medical, small commerce)
  └── Deep Level (lower mines, restricted sections, off-book activity)
```

### Key NPCs at Farpoint

| NPC | Role | Personality | What They Want |
|-----|------|-------------|----------------|
| **Station Manager Voss** | Authority figure, bureaucratic | By-the-book, privately exhausted | Order, quota met, no incidents |
| **Chief Engineer Rael** | Runs the equipment bays | Practical, no patience for incompetence | Fix things that are broken; don't break new things |
| **Doctor Nada Osei** | Station medic | Quiet, observant, trusts slowly | To be left alone to do her work; someone to talk to |
| **Milo Fane** | Trader and connector | Charming, unreliable, always knows someone | Good deals; network expansion; staying out of Hegemony trouble |
| **Varkis** | Old pilot, docked indefinitely | Wants out; bitterly experienced | Enough credits to get somewhere better |
| **The Miners** | Crew of ~60 | Loyal to each other; wary of outsiders | Fair wages, safe shifts, someone who actually listens |

### Beginner Scenario Flow

Farpoint teaches the game by giving the player a sequence of repeatable low-stakes tasks before the crisis.

**Phase 1 — First Cycle (mandatory tutorial)**
- Task: Equipment check in the industrial bay → teaches the resolution system
- Task: Assist with a cargo dispute → teaches the Diplomacy stat
- Free time: introduced after first two tasks

**Phase 2 — Earning Your Keep (repeatable)**
- Task pool: ~20 Farpoint-specific scenarios (see events-catalog appendix)
- Categories: equipment repair, cargo hauling, crew disputes, medical assists, security checks, Deep Level incidents
- The player can stay in Phase 2 indefinitely — these scenarios repeat and the player accumulates XP, stat gains, and relationships with Farpoint NPCs
- Each NPC relationship unlocks a unique follow-on scenario once sufficient Rep is established

**Phase 3 — The Crisis (triggered at player's option OR automatically after 25 tasks)**

One of three possible crises occurs (selected at game generation):

| Crisis | What Happens | Primary Stat | Lives at Stake |
|--------|-------------|--------------|----------------|
| **Mine Collapse** | Section D-7 collapses with 14 workers trapped | Engineering/Medicine | Local (14) |
| **The Inspection** | Corporate audit threatens to shut down and reassign 200+ workers | Diplomacy/Command | Local (200) |
| **The Contact** | Unknown vessel takes up station in range; hailing frequency open — intent unclear | Diplomacy/Tactical | Regional (whole station) |

The crisis is the tutorial boss. It uses the full Mission → Project → Task hierarchy. Resolution determines reputation with Farpoint NPCs and the first faction contacts.

**Phase 4 — Departure**
After the crisis, the player has earned enough Rep and resources to leave Farpoint. Varkis or Milo provides the introduction to the faction of the player's choice. The player selects their path:

1. **Join the Hegemony** — transfer to a Hegemony posting; stable salary, regulated
2. **Find the Searchers** — introduction from Doctor Osei (who has contacts); science focus
3. **Seek out the RedHawks** — introduction from Milo Fane (who has connections); combat focus
4. **Go independent** — Varkis sells you his docked ship for a favorable debt deal

### What Carries Forward from Farpoint

- All stats and XP accumulated during Farpoint phase
- Named NPCs from Farpoint become the starting crew (some may not come if relationship was poor)
- Career flags acquired at Farpoint are on the record
- Farpoint Rep can be called on later (calling in favors from Voss, Rael, Osei)
- If the crisis was failed, a negative flag is added: "Farpoint — Unresolved Crisis"

---

## The Reach — Post-Farpoint Setting

Once the player leaves Farpoint, they are operating in the wider Reach. The voyage structure takes over.

### Major Locations

| Location | Type | Who Controls It | Importance |
|----------|------|-----------------|-----------|
| **Centara Station** | Hegemony capital station | Hegemony | Administrative center; largest repair docks |
| **The Archive** | Searchers' deep-space research platform | Searchers | Knowledge repository; advanced equipment |
| **Redgate** | RedHawks' primary operations base | RedHawks | Armament, crew hiring, combat training |
| **The Free Ports** | Independent operator hubs (multiple) | No one / everyone | Black market, unregulated trade, information |
| **The Outer Fringe** | Unincorporated far systems | Contested | Discovery, danger, high reward |
| **Ruin Sites** | Remnants of collapsed civilizations | Unclaimed | Archaeological value; also hazardous |

### The Threat

Something is out at the far edge of the Reach. The Searchers have data. The Hegemony has classified reports. The RedHawks have lost two ships. Nobody wants to say it directly yet.

The five-year expedition endgame walks the player into this gradually. What destroys the ship at the end is not necessarily explained — that ambiguity is intentional. The player's career ends either way.

---

## Tone Reference

**Citizen Sleeper comparisons:**
- Farpoint Station ≈ the Erlin's Eye space station
- Sleeper debt ≈ the "body lease" mechanic
- Crew relationships ≈ the named character storylines
- Career flags ≈ the "instability" accumulation
- The final encounter ≈ the game's clock running out

**What Starsleep is not:**
- Mass Effect (no romance arcs, no galaxy-saving arc)
- FTL (not a roguelike; the career is continuous and persistent)
- Star Trek game (the Trek source material is inspiration for scenarios and ethics; the world is original)
