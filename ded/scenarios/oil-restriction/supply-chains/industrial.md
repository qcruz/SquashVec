# Supply Chain Deep Dive: Industrial Sector — Oil Dependency

**Scenario:** Oil Restriction
**Last Updated:** 2026-05

---

## Overview

U.S. industry is the third-largest oil consumer after transportation and heating. Unlike transportation, where oil consumption is direct and visible (gasoline at the pump), industrial oil dependency is often hidden inside feedstocks, process heat, and logistics. This creates a dual problem: oil restriction reduces both the energy powering factories and the raw material inputs to chemicals, plastics, fertilizers, pharmaceuticals, and synthetic materials.

---

## Oil Use Categories in Industry

| Category | Description | Share of Industrial Oil |
|----------|-------------|------------------------|
| Petrochemical feedstocks | Crude derivatives as chemical building blocks | ~45% |
| Process heat (direct firing) | Fuel oil, diesel for industrial boilers and furnaces | ~25% |
| On-site diesel equipment | Forklifts, generators, on-site transport | ~15% |
| Lubricants | Machine oils, cutting fluids, hydraulic oil | ~10% |
| Other (asphalt, waxes, solvents) | Infrastructure and specialty products | ~5% |

---

## Petrochemical Feedstocks: The Invisible Oil Dependency

The most complex industrial oil dependency is feedstock, not fuel. Refineries produce naphtha, ethane, propane, and other light fractions that feed cracking plants, which produce the building blocks of modern manufacturing.

### Feedstock Chain

```
Crude Oil
  └─ Refinery
       ├─ Naphtha → Steam Cracker → Ethylene, Propylene, Butadiene
       │                              ├─ Polyethylene (packaging, piping)
       │                              ├─ Polypropylene (automotive, textiles)
       │                              └─ Synthetic rubber
       ├─ Natural gas liquids → Ethylene (parallel path, less oil-dependent)
       └─ Aromatics (benzene, toluene, xylene) → Pharmaceuticals, dyes, adhesives
```

### Downstream Sectors Affected by Feedstock Restriction

| Sector | Primary Petro-Input | Substitution Timeline | Notes |
|--------|--------------------|-----------------------|-------|
| Packaging (plastics) | Polyethylene, polypropylene | 2-5 years (glass, paper, bio-based) | High consumer impact |
| Agriculture (fertilizers) | Ammonia from natural gas (mostly), urea | Medium — see agriculture.md | NH3 synthesis uses H2 from gas, not oil |
| Pharmaceuticals | Benzene, acetone, solvents | 3-7 years | API synthesis tightly locked in |
| Textiles (synthetic) | Polyester (PET from paraxylene), nylon | 2-4 years (natural fibers) | Cotton/wool capacity constraints |
| Automotive | Plastics, rubber, adhesives | 1-3 years per design cycle | Steel substitution complex |
| Construction | PVC piping, insulation foam, adhesives | 2-5 years (concrete, copper) | Lead time on alternative infrastructure |
| Electronics | Epoxy resins, solvents, polymer housings | 3-7 years | No near-term alternative for many chemistries |

**Key risk:** Pharmaceutical feedstock restriction is the highest-severity industrial dependency. The U.S. imports ~90% of active pharmaceutical ingredients (APIs), many from China, which uses petrochemical inputs. A simultaneous oil restriction and geopolitical tension creates a compounding pharmaceutical supply crisis.

---

## Process Heat: Fuel Switching Is Feasible but Slow

Industrial process heat — the heat needed to run furnaces, dryers, kilns, and reactors — is a major oil use that is electrifiable in principle but requires capital investment.

### Process Heat by Temperature Requirement

| Temperature Range | Example Industries | Current Fuel | Electric Alternative |
|------------------|--------------------|-------------|---------------------|
| <150°C | Food processing, low-temp drying | Natural gas, steam | Heat pumps (commercial today) |
| 150-400°C | Chemical processing, paper | Natural gas, fuel oil | Industrial heat pumps, resistance |
| 400-1000°C | Glass, aluminum, ceramics | Fuel oil, natural gas | Electric arc, induction |
| >1000°C | Steel (basic oxygen), cement, lime | Coke, coal (not oil) | Green hydrogen, electric arc (emerging) |

**Oil-to-electricity conversion potential:**
- Short-term (0-2 years): ~15% of industrial process heat (low-temp applications with existing equipment)
- Medium-term (2-5 years): ~35% with capital programs targeting food, chemicals, light manufacturing
- Long-term (5-15 years): ~60-70%; remaining share requires breakthrough processes

**Policy lever:** Emergency industrial electrification grants covering 40-60% of capital costs for fuel-switching projects with <18-month payback. Pre-qualified contractors and pre-approved equipment lists reduce permitting time.

---

## On-Site Diesel Equipment: Near-Term Substitution Available

Factory floors, warehouses, ports, and construction sites run extensively on diesel-powered equipment. This segment has the most immediate substitution options.

### Equipment Categories and Electric Alternatives

| Equipment Type | Diesel Fleet Size (est.) | Electric Alternative | Conversion Timeline |
|---------------|--------------------------|---------------------|---------------------|
| Forklifts | ~600,000 units | Electric forklifts (mature, common) | 1-3 years |
| Warehouse pickers/stackers | ~400,000 units | Electric (dominant in new warehouses) | 1-2 years |
| Construction excavators | ~200,000 units | Electric excavators (Volvo, CAT available) | 3-5 years |
| Port cranes and handlers | ~15,000 units | Electric RTGs (already 60% electrified) | 2-4 years |
| Agricultural equipment | See agriculture.md | Electric tractors (limited range) | 5-10 years |
| On-site generators | ~2M units | Grid connection or battery storage | Variable |

**Forklift conversion is the fastest win:** Electric forklifts have been competitive for decades; many warehouses already run electric. Emergency program: low-interest loans for diesel forklift fleet buyout + electric replacement for facilities with >20 units.

---

## Lubricants: Overlooked but Mission-Critical

Lubricants represent only ~10% of industrial oil use by volume but are essential to virtually all mechanical systems. They cannot simply be eliminated; they must be substituted.

### Lubricant Alternatives

| Lubricant Type | Petroleum Equivalent | Bio-Based Alternative | Synthetic Alternative | Status |
|---------------|---------------------|----------------------|----------------------|--------|
| Motor/machine oils | Mineral oil | Vegetable-based (soy, canola) | PAO, ester-based | Commercially available |
| Hydraulic fluids | Petroleum hydraulic | Biodegradable hydraulic | Synthetic ester | Available for most applications |
| Cutting fluids | Petroleum emulsion | Vegetable emulsions | Water-based synthetics | Available |
| Greases | Petroleum grease | Biobased greases | Synthetic grease | Available |

**Strategic implication:** Lubricant supply is manageable if feedstock restriction is the binding constraint (i.e., synthetic and bio-based alternatives are available). If a wholesale crude shortage reduces all refinery output, lubricant allocation must be explicit — lubricants are low-volume but high-criticality.

**Pre-build:** National lubricant reserve (strategic stockpile) of 90-day supply for critical industrial and military applications.

---

## Manufacturing Sectors: Cascading Fragility Map

### Tier 1 — Immediate Collapse Risk (oil input >30% of COGS or no substitution)
- **Plastic packaging manufacturers** — directly dependent on polyethylene/polypropylene feedstock
- **Pharmaceutical API producers** (domestic minority) — benzene/solvent dependent
- **Asphalt producers** — direct petroleum product; infrastructure maintenance halts

### Tier 2 — 6-18 Month Fragility (oil input 15-30% of COGS, slow substitution)
- **Auto parts manufacturers** — rubber, plastics, adhesives
- **Textile mills (synthetic)** — polyester, nylon feedstocks
- **Chemical manufacturers** — broad exposure to petro-feedstocks
- **Electronics assembly** — resin encapsulants, solvents

### Tier 3 — 18-Month+ Fragility (oil indirect or low share)
- **Steel and metal fabrication** — oil used in cutting fluids, some heat; mostly coal/electric
- **Food processing** — oil primarily in transport, not production
- **Semiconductor fabs** — high-purity chemicals partially petro-derived; fab energy is electric

---

## Industrial Resilience Programs

### Feedstock Diversification
- **Bio-based chemicals program:** Fund 10 commercial-scale biorefineries producing bio-ethylene, bio-propylene from agricultural waste. 5-10 year buildout; $20-40B capital.
- **Natural gas liquids expansion:** Route NGL from expanded domestic gas production to cracking facilities (substitutes for naphtha feedstock).
- **Recycled plastics feedstock:** Mandate chemical recycling capacity; 20-30% of virgin plastic demand can be met by recycled pyrolysis oil in 5-7 years.

### Manufacturing Substitution Reserve
- Pre-negotiate substitution agreements with glass, paper, aluminum packaging producers to surge capacity if plastic feedstock drops >30%.
- Federal reserve contracts for bio-lubricants and synthetic lubricants (90-day rolling stockpile equivalent for Tier 1 industries).

### Industrial Electrification Grants
See `demand-reduction-policy.md` → Industrial Electrification Grants section for program structure.

---

## Failure Sequence Under Oil Restriction

**Month 1-3:**
- Feedstock prices surge; plastic packaging costs spike 40-80%
- Manufacturers accelerate inventory drawdowns; just-in-time supply chains exposed
- Diesel on-site equipment rationed; some facilities reduce operating hours

**Month 3-12:**
- Plastic packaging shortages affect food, pharmaceutical, and retail supply chains
- Chemical sector begins formal rationing of petrochemical feedstocks (government allocation)
- Industrial process heat facilities begin fuel-switching investments under emergency grant program

**Year 1-2:**
- Some plastic-dependent manufacturers idle lines or shift to alternative packaging
- Lubricant bio/synthetic substitution program reaches significant scale
- Electric forklift conversion program near completion for large facilities

**Year 2-5:**
- Bio-based feedstock capacity begins coming online
- Industrial oil dependency falls significantly in heat and equipment categories
- Feedstock dependency remains the structural bottleneck; requires full chemical industry redesign on longer timeline

---

## Pre-Built Requirements

- [ ] National Industrial Oil Dependency Atlas: facility-level oil input mapping for all manufacturers with >50 employees
- [ ] Feedstock allocation protocol: priority order for petrochemical feedstock in shortage (pharmaceuticals > food packaging > agriculture inputs > general manufacturing > discretionary)
- [ ] Bio-lubricant and synthetic lubricant strategic reserve — 90-day equivalent for Tier 1 critical industries
- [ ] Federal substitution agreements with glass, paper, aluminum packaging industries (surge capacity pre-negotiated)
- [ ] Industrial electrification grant program design (pre-approved equipment lists, contractor registry, fast-track application)
- [ ] Pharmaceutical API domestic production emergency plan — identify which APIs can be produced with non-petroleum chemistry and fund domestic capacity
