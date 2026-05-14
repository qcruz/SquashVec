[STUB — expand in future session]

# DED Red Team Scenario: Neon Supply Collapse (Semiconductor Lithography)

**Scenario ID:** RT-006
**Last Updated:** 2026-05
**Primary DED Scenarios Activated:** Semiconductor Collapse
**Estimated Economic Impact:** $150–300B over 18 months
**DED Readiness Assessment:** Low-Moderate — semiconductor triage instruments activate but
  neon is more concentrated and less substitutable than the general semiconductor scenario assumes

---

## Overview

Neon gas is a critical input to excimer laser lithography — the process used to etch circuit
patterns on semiconductor wafers at all nodes below 65nm. Approximately 70% of global neon
supply came from Ukraine prior to 2022 (as a byproduct of steel production); the Russia-Ukraine
war disrupted this significantly. A sustained, escalated conflict destroying Ukraine's remaining
neon production capacity, combined with a fire at the Ingas facility in Mariupol (if rebuilt),
eliminates 60–70% of global semiconductor-grade neon.

Unlike helium, neon has no adequate substitute in excimer laser lithography — the physical
properties (wavelength, energy density, chemical inertness) make it the only gas that works
at 193nm ArF lasers. Without neon, most semiconductor fabs worldwide slow or stop within
30–60 days (on-site storage) regardless of other inputs.

This is the scenario that nearly materialized in February 2022 and was only averted by
rapid alternative sourcing from China, Taiwan, and South Korea — sources that may themselves
be cut off in an escalated East Asia conflict.

---

## Key Sections (to be built out)

### 1. Situation

*TODO: Specific event description*
- Ukraine neon: Cryoin Engineering and Ingas are the two primary producers; combined ~65% of
  global semiconductor-grade neon
- Triggering event: escalated strikes destroy both facilities within same week; no rebuilding
  possible for 18–36 months
- Alternative sources: China (30% of global, immediately embargoed if conflict escalates to
  Taiwan), South Korea (Linde Korea, Air Products Korea — limited capacity)
- On-site fab storage: 30–60 days typical; no strategic government reserve exists anywhere

### 2. Cascade Timeline

*TODO: Full timeline*
- Day 0–30: fabs draw down storage; spot price spikes from $500/MCF to $8,000–15,000/MCF
- Day 30–60: TSMC, Samsung, Intel begin production reductions; automotive and defense
  chip shortages begin within 90 days
- Month 3–6: full-scale chip shortage exceeds 2021 shortage in severity; no end date visible
- Recovery path: atmospheric separation capacity expansion (neon is from air separation; takes
  12–18 months to build new capacity); demand reduction via recycling

### 3. DED Program Mapping

*TODO: Full analysis*
- Semiconductor Phase 1 priority allocation framework activates immediately
- New: Neon Recovery System grants (similar to helium recovery in RT-001) — neon can be
  captured and recycled at fabs; currently wasted because supply was cheap
- Type B: Air separation unit expansion at domestic industrial gas producers (Air Products,
  Air Liquide US, Linde US)
- Type C: Allied sourcing from Japan (large air separation capacity; some neon coproduction)
- Critical difference from 2021 shortage: the allied alternative supply that bailed out fabs
  in 2022 (China, Korea) is also unavailable in this scenario — this is a true worst case

### 4. What DED Wouldn't Have

*TODO: Gap analysis*
- No strategic neon reserve (no government anywhere holds one)
- No NEID neon price or supply monitoring
- No pre-positioned air separation capacity contracts
- Key pre-build: add neon, krypton, xenon to NEID specialty gas monitoring; pre-negotiate
  domestic air separation unit expansion contracts (can add neon recovery lines to existing
  oxygen/nitrogen plants in 6–9 months with DED investment)

---

## Cross-References

- `ded/redteam/helium-supply-collapse.md` — RT-001; structural parallel; specialty gas archetype
- `ded/scenarios/semiconductor-collapse/phase-1-triage-and-allocation.md`
- `ded/economics/supply-chain-concentration-risk.md` — neon as extreme concentration case
- `ded/redteam/README.md`
