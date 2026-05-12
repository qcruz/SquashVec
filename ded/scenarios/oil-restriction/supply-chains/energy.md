# Supply Chain Deep Dive: Energy Sector — Oil Dependency

**Scenario:** Oil Restriction
**Last Updated:** 2026-05

---

## Overview

The U.S. energy sector both consumes and produces oil. An oil restriction creates a feedback loop: refineries and power generators compete with the broader economy for reduced oil supply while simultaneously being expected to produce substitute energy at emergency scale. Understanding where oil enters the energy supply chain — and where it can be removed — is the core planning problem.

---

## Oil Dependency by Energy Subsector

| Subsector | Primary Oil Use | Oil Intensity | Substitution Difficulty |
|-----------|----------------|---------------|------------------------|
| Petroleum refining | Crude input (feedstock) | Extreme | N/A — this is the bottleneck |
| Natural gas extraction | Diesel for drilling rigs, compressors | High | Medium — electric compressors exist |
| Coal mining | Diesel for haul trucks, rail | Medium | Medium — electric mining equipment |
| Nuclear plants | Diesel backup generators, fuel transport | Low | Low — backup gen is small fraction |
| Hydroelectric | Diesel for maintenance, construction | Very low | Very low |
| Wind energy | Diesel for turbine transport, installation | Low during ops | High during construction |
| Solar PV | Diesel for manufacturing, installation | Low during ops | High during manufacturing |
| Grid transmission | Diesel for line crews, transformers | Low | Low — electrifiable |

---

## Petroleum Refining: The Central Chokepoint

Refineries are the conversion node between crude oil and usable products. A restriction on crude imports does not immediately stop refinery output — the U.S. holds strategic and commercial crude reserves — but sustained restriction causes capacity underutilization and eventually shutdown.

### U.S. Refinery Profile (2025 baseline)
- **Total refining capacity:** ~18 million barrels/day
- **Current utilization:** ~90% (~16.2 Mbbl/day processed)
- **Refinery count:** ~130 operating refineries
- **Geographic concentration:** Gulf Coast (PADD 3) handles ~55% of U.S. refining
- **Product yield per barrel:** ~45% gasoline, ~30% distillates (diesel/jet), ~10% fuel oil, ~15% other

### Cascade Under Restriction
At 25% crude supply reduction:
- Output falls proportionally; jet fuel and diesel feel the cut first (higher-value product prioritization)
- Gulf Coast refineries throttle capacity; inland refineries may shut temporarily
- Product price spikes drive black markets and allocation conflicts between states

At 50% crude supply reduction:
- Refinery shutdowns begin; partial shutdown requires months to restart (coking units, hydrocrackers)
- Diesel allocation must be rationed; government commandeers fuel for Tier 1 priority sectors
- Petrochemical feedstocks (ethylene, propylene) become severely constrained

### Substitution Options
- **Domestic crude ramp-up:** U.S. production (~13.2 Mbbl/day) partially offsets imports (~6 Mbbl/day). In a restriction scenario where domestic supply is available, shifting procurement to domestic crude is the first lever.
- **Canadian heavy crude:** Pipeline-accessible; partially substitutable for imported Middle Eastern grades. Requires refinery configuration check (some refineries can only process certain crude grades).
- **Strategic Petroleum Reserve drawdown:** ~370M barrels provides a bridge (roughly 20-25 days at full consumption, longer if consumption falls via demand reduction policies).

---

## Natural Gas: Partially Exposed

Natural gas powers 40% of U.S. electricity and is a major heating fuel. Natural gas extraction and distribution uses diesel indirectly (drilling rigs, pipeline compressors, LNG liquefaction equipment), but the gas itself is not oil-derived.

### Oil Exposure Points
- **Drilling rigs:** ~80% diesel-powered. New well completion slows during oil restriction if diesel is rationed.
- **Compression stations:** Pipeline gas requires mechanical compression every 40-100 miles. Most compressors run on natural gas itself (turbines) or electricity, so exposure is limited.
- **LNG export terminals:** Run primarily on electricity and natural gas; low oil exposure.
- **Well completion chemicals:** Some derived from petrochemical feedstocks; mid-restriction impact.

### Substitution
- Electric drilling rigs exist commercially (Nabors, Pason); fleet conversion is a 2-5 year program
- Existing gas production can substitute for oil in power generation (already occurring)

---

## Electricity Generation: Oil Is Already Marginal

Oil-fired electricity is <1% of U.S. generation (down from ~17% in 1973). The primary oil-electricity intersection is now:

1. **Diesel backup generators** at critical facilities (hospitals, data centers, water treatment)
2. **Emergency peaking units** in some island grids (Hawaii, parts of Alaska)
3. **Fuel oil boilers** in older industrial and commercial buildings (Northeast concentration)

### Key Vulnerabilities

**Diesel for backup power:**
U.S. critical facilities collectively hold significant diesel generator capacity. In an oil restriction, extended grid disruptions combined with fuel rationing creates a dangerous gap: generators intended for 72-hour backup may need to run for weeks.

- Recommended pre-build: Nationalized diesel reservation allocation for Tier 1 critical facilities
- Reserve target: 30-day diesel supply pre-positioned at hospitals, water treatment, emergency communications

**Fuel oil heating (Northeast):**
~5 million U.S. homes use heating oil, concentrated in New England and Mid-Atlantic. In a winter restriction scenario, this population faces acute hardship.
- **Substitution path:** Heat pumps (electrical); already underway but penetration is ~15% in affected regions
- **Emergency bridge:** Liquefied propane (LPG) stoves/heaters as transition; propane supply is largely domestic

---

## Renewable Energy Construction: Oil Is an Input

Wind and solar are oil-free in operation, but oil is embedded in their construction:

| Input | Oil Role | Scale |
|-------|----------|-------|
| Steel for turbine towers | Coking coal (not oil), but transport is diesel | Moderate |
| Turbine blade resin | Petrochemical feedstock (epoxy, fiberglass matrix) | Moderate |
| PV silicon manufacturing | Electric process; minimal direct oil | Low |
| PV frame aluminum | Electricity-intensive; moderate oil in mining/transport | Low-medium |
| Installation equipment | Heavy diesel machinery (cranes, haul trucks) | High per-project |
| Supply chain logistics | Diesel shipping (port → rail → site) | High |

**Implication:** An oil restriction during a renewable scale-up creates a bottleneck at construction logistics. Projects already in progress should be prioritized for fuel allocation; new project starts may face 6-12 month delays.

**Policy response:** Fuel priority allocation for renewable construction as a Tier 2 essential activity; accelerated procurement of electric construction equipment (electric cranes, battery-electric haul trucks now commercially available at small scale).

---

## Failure Sequence Under Oil Restriction

**Week 1-4:**
- Gasoline and jet fuel prices spike; diesel allocation begins
- Refineries adjust product slates (maximize diesel and heating oil production)
- Renewable construction projects compete for diesel allocation

**Month 2-6:**
- Natural gas drilling rate declines if diesel rationing extends
- Fuel oil heating customers face supply shortfalls in winter months
- Diesel backup generator fuel pre-positioning begins

**Month 6-18:**
- If crude supply remains restricted, refinery shutdowns begin at marginal facilities
- Petrochemical feedstock shortage starts affecting plastics, fertilizer, renewable construction materials
- Emergency electrification program for oil heating customers accelerates

**Year 2+:**
- Surviving energy infrastructure is largely oil-free in operations
- Construction bottleneck eases as electric heavy equipment deployment grows
- Natural gas remains stable barring co-occurring restriction

---

## Emergency Substitution Priority Order

1. **Domestic crude prioritization** — reallocate all available domestic and Canadian crude to highest-value products (diesel, jet)
2. **SPR drawdown** — authorized at 25% restriction threshold; begin with 1M bbl/day draw
3. **Diesel reservation system** — tiered allocation (critical infrastructure > agriculture > emergency services > commercial > residential)
4. **Oil heat electrification surge** — federal heat pump installation program targeting 2M homes/year
5. **Electric construction equipment deployment** — priority procurement for renewable installation fleets
6. **Gas production electric transition** — fund conversion of diesel drilling rigs to electric over 36-month program

---

## Pre-Built Requirements

- [ ] Refinery crude-grade flexibility assessments (which refineries can process domestic/Canadian grades)
- [ ] Diesel reservation registry: critical facilities pre-registered with tier assignment
- [ ] Heating oil customer database (federal registry for emergency substitution targeting)
- [ ] Electric construction equipment national inventory and deployment contract templates
- [ ] SPR drawdown operational plan with 1M bbl/day logistics pre-positioned
