[STUB — expand in future session]

# DED Red Team Scenario: Carrington-Class Solar Superstorm

**Scenario ID:** RT-004
**Last Updated:** 2026-05
**Primary DED Scenarios Activated:** Grid Cyberattack (analog), Semiconductor Collapse, Shipping Blockade
**Estimated Economic Impact:** $600B–$2.5T depending on grid hardening level at time of event
**DED Readiness Assessment:** Moderate — grid cyberattack instruments partially applicable; key
  difference is simultaneous multi-region damage and no adversary to deter

---

## Overview

A geomagnetic superstorm (G5 class or above, comparable to the 1859 Carrington Event or
the 1989 Quebec blackout) causes induced currents in long transmission lines sufficient to
permanently damage large power transformers across multiple grid interconnects simultaneously.
Unlike a cyberattack, this affects all three interconnects (Eastern, Western, ERCOT) at once,
cannot be deterred, and arrives with 15–45 minutes of warning from NOAA Space Weather Prediction Center.

Key distinction from cyberattack: space weather does not discriminate. Satellites (GPS, communications,
weather) are also damaged. Allied nations' grids are simultaneously affected. The recovery
competition is global — every nation ordering replacement LPTs from the same limited manufacturing base.

---

## Key Sections (to be built out)

### 1. Situation

*TODO: Specific event description*
- 2025 peak of Solar Cycle 25 as realistic trigger window
- NOAA SWPC warning timeline: CME detected at L1 point → 15–45 minutes to Earth
- Transformer damage mechanism: geomagnetically induced currents (GICs) in long conductors
- NASA/FEMA estimates: 300–360 LPTs destroyed in a worst-case event; 130M people without power

### 2. Cascade Timeline

*TODO: Hour-by-hour and week-by-week cascade*
- Simultaneous multi-region outage vs. cyberattack's potentially sequential damage
- Satellite disruption: GPS, communications satellites, weather monitoring — all affected simultaneously
- Allied grid simultaneous damage: UK, Canada, France also in LPT replacement queue
- Manufacturing bottleneck: 10–20 LPTs/year domestic capacity vs. 300+ destroyed

### 3. DED Program Mapping

*TODO: Full program analysis*
- Grid cyberattack Phase 1 instruments activate directly (transformer reserve, fuel priority, CRHP)
- Critical difference: strategic transformer reserve must be much larger for this event
  (cyberattack targets 9–20 key substations; solar storm could destroy 300+)
- Satellite disruption triggers unexpected dependencies: GPS-reliant logistics, precision agriculture,
  financial transaction timestamping all fail simultaneously
- Allied coordination: DED-led International LPT Manufacturing Surge Compact (existing ASIC model
  adapted for grid equipment)
- DARPA EINSTEIN and Space Weather programs as pre-positioning investment

### 4. What DED Wouldn't Have

*TODO: Gap analysis*
- Current strategic transformer reserve (DED Phase 2 program) sized for cyberattack (9–50 units);
  solar event requires 300+ units; enormous gap
- No satellite backup plan in DED framework; GPS disruption breaks assumptions across all scenarios
- Space Weather Early Warning integration into NEID (15-45 min warning is too short for response
  but sufficient to initiate grid protective relaying and island-mode activation)

### 5. Key Lesson

This scenario argues for a specific DED infrastructure investment: **grid topology hardening for
geomagnetic resilience** — series capacitors in transmission lines that block DC offset, neutral
ground resistors on transformer windings, and pre-positioned spare transformer cooling systems.
Cost: $4–8B. Expected loss reduction from Carrington event: $400B–$1.5T.

---

## Cross-References

- `ded/scenarios/grid-cyberattack/phase-1-immediate-response.md` — base instruments
- `ded/assets/profiles/strategic-petroleum-reserve.md` — SPR model for transformer reserve sizing
- `ded/redteam/README.md`
