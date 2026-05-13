# DED Asset Registry: Critical Infrastructure

**Last Updated:** 2026-05
**Category:** Critical Infrastructure — electric grid, pipelines, ports, rail, water systems, telecommunications

---

## Electric Grid

### Eastern Interconnection
**Location:** All states east of Rocky Mountains (plus parts of TX) | **Type:** AC power grid

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Grid cyberattack (primary), oil restriction (substitution backbone), pandemic (critical ops), drought (hydropower), semiconductor (controls) |
| Criticality | 3 | Largest synchronous power grid in the world; if major sections go down, food processing, water treatment, hospitals, and communications fail within hours |
| Adaptability | 2 | Grid can integrate new generation sources; transmission upgrades can reroute power around disruptions |
| Optimization Gap | 2 | ~70,000 large power transformers in the U.S.; most are imported (12-24 month lead time); spare transformer reserve is critically insufficient |
| **DED Score** | **10** | **Tier S** |

**Critical Vulnerability:** Extra-high-voltage (EHV) transformers — the ~2,000 units operating at 345kV+ that are the backbone of the grid. Each weighs 100-400 tons, is custom-built, and takes 12-24 months to manufacture (mostly overseas). Destruction of 9 specific EHV transformers could reportedly black out 70% of the country for 18 months (FERC 2014 classified study estimate). The U.S. Spare Transformer Equipment Program (STEP) has a small reserve — estimated 40 transformers. **The gap between 40 and adequate (~200-400) is the single highest-priority DED infrastructure investment.**

---

### Western Interconnection
**Location:** 11 western states, 2 Canadian provinces | **Type:** AC power grid

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Grid cyberattack, drought (hydropower reduction), oil restriction, semiconductor (Pacific silicon fab cooling) |
| Criticality | 3 | California alone is the 5th largest economy in the world; Western grid failure is equivalent to a major nation-state economic collapse |
| Adaptability | 2 | High solar + wind integration potential; strong transmission corridor to Southwest resource base |
| Optimization Gap | 2 | Wildfire risk to transmission lines is increasing; no federal authority to expedite transmission hardening across state lines |
| **DED Score** | **10** | **Tier S** |

---

### Texas ERCOT Grid
**Location:** Texas (isolated from other interconnections) | **Type:** AC power grid (isolated)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 2 | Grid cyberattack, oil restriction (Gulf Coast industrial power) |
| Criticality | 3 | Powers ~90% of Texas; isolation from national grid means no mutual aid during failure (Winter Storm Uri 2021 demonstrated) |
| Adaptability | 1 | Limited interconnection by design; some emergency DC ties exist |
| Optimization Gap | 2 | February 2021 failure killed ~250 people; gas plant freeze-proofing mandate was passed but compliance is incomplete; renewable + storage buildout proceeding but gas dependency remains |
| **DED Score** | **8** | **Tier A** |

---

### National HVDC Transmission Corridors (Planned/Partial)
**Location:** Proposed — Great Plains to Southeast; Southwest to California; etc. | **Type:** High-voltage direct current transmission

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Oil restriction (move renewable power to load), grid cyberattack (resilient alternative paths), drought (hydropower transport) |
| Criticality | 2 | Does not exist at needed scale yet; but is the physical infrastructure that makes renewable dominance possible |
| Adaptability | 2 | HVDC can carry power bidirectionally; can isolate and island during cyberattack; can carry power from emergency generation to disrupted regions |
| Optimization Gap | 2 | Almost entirely unbuilt; the ~5,000 miles of HVDC corridors needed for a resilient renewable grid don't exist; transmission permitting is the bottleneck |
| **DED Score** | **9** | **Tier S** |

**Note:** This asset is partially hypothetical — its score reflects the strategic value *if built*, justifying DED prioritization.

---

## Pipeline Networks

### Colonial Pipeline (Refined Products)
**Location:** Houston TX to New York Harbor (5,500 miles) | **Type:** Refined fuel pipeline

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 2 | Oil restriction (primary East Coast fuel distribution), grid cyberattack (demonstrated vulnerability, 2021) |
| Criticality | 3 | Supplies ~45% of fuel for Southeast and Mid-Atlantic; shutdown causes fuel shortages within days (proven in 2021 cyberattack) |
| Adaptability | 1 | Single-purpose; limited adaptability |
| Optimization Gap | 2 | 2021 ransomware attack shut it for 6 days; IT/OT security improvements made but pipeline control system vulnerabilities are structural across the sector; no true hot-standby alternative exists |
| **DED Score** | **8** | **Tier A** |

---

### Transcontinental Natural Gas Pipeline Network
**Location:** Nationwide; major systems: Tennessee Gas, Transco, El Paso Natural Gas, Rockies Express | **Type:** Natural gas transmission

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Oil restriction (gas as oil substitute), grid cyberattack (compressor station vulnerability), pandemic (industrial gas supply) |
| Criticality | 3 | Powers 40% of U.S. electricity generation; heats ~50% of U.S. homes; industrial process fuel for 25% of manufacturing |
| Adaptability | 1 | Infrastructure is specialized; some pipelines could eventually carry hydrogen blends |
| Optimization Gap | 2 | Compressor stations (1,400 across the U.S.) are a concentration of physical and cyber vulnerability; most run on natural gas turbines with limited backup; DED needs a compressor station resilience program |
| **DED Score** | **9** | **Tier S** |

---

## Port and Maritime Infrastructure

### Port of Los Angeles / Long Beach
**Location:** San Pedro Bay, CA | **Type:** Container port

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Shipping blockade (primary Pacific import gateway), financial fragmentation (trade disruption), semiconductor (chip imports), rare earth (import route) |
| Criticality | 3 | Largest U.S. port complex; handles ~40% of all U.S. container imports; single-port disruption affects nationwide retail and manufacturing within 2-3 weeks |
| Adaptability | 2 | Infrastructure can be repurposed for military sealift, emergency import prioritization, LNG bunkering |
| Optimization Gap | 2 | 2021-2022 backlog exposed container throughput bottlenecks; labor union concentration (ILWU) creates strike risk; automation opposed by labor — DED needs emergency automation authority and redundant Pacific gateway |
| **DED Score** | **10** | **Tier S** |

---

### Port of New York / New Jersey
**Location:** NY/NJ Harbor | **Type:** Container + bulk port

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 2 | Shipping blockade, financial fragmentation (global finance hub co-location) |
| Criticality | 2 | Largest East Coast port; important but has more regional redundancy than LA/LB |
| Adaptability | 2 | Military sealift capacity; emergency import coordination |
| Optimization Gap | 1 | Port is well-managed; main gap is bridge height (Bayonne Bridge recently raised) and inland rail connectivity |
| **DED Score** | **7** | **Tier A** |

---

### Strategic Inland Waterways (Mississippi / Ohio / Illinois Rivers)
**Location:** Central U.S. | **Type:** Barge freight system
**See also:** `profiles/mississippi-river.md`

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Drought (low water halts barge traffic), shipping blockade (inland alternative to ports), oil restriction (efficient freight), pandemic (bulk food movement) |
| Criticality | 3 | Moves ~500M tons of cargo annually; 60% of U.S. grain exports; extremely low cost per ton-mile; if disrupted, rail and truck cannot absorb the volume |
| Adaptability | 2 | Barges can carry any bulk commodity; waterway infrastructure can host emergency fuel depots |
| Optimization Gap | 2 | Lock and dam infrastructure is averaging 60+ years old; USACE has a 10-15 year maintenance backlog; a major lock failure can shut a river segment for weeks to months |
| **DED Score** | **10** | **Tier S** |

**Critical Gap:** If the Melvin Price Locks and Dam (#26 on Mississippi at Alton IL) were to fail, it would sever upper and lower Mississippi barge traffic. This is the highest single-point infrastructure failure risk on the inland waterway system. Repair lead time: potentially 12-18 months.

---

## Rail Network

### Class I Freight Rail Network
**Location:** Nationwide; 7 Class I railroads: BNSF, UP, CSX, NS, CN, CP, KCS | **Type:** Freight rail

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Oil restriction (substitute for diesel trucking), pandemic (essential goods movement), drought (grain transport from affected regions), shipping blockade (inland distribution) |
| Criticality | 2 | Moves ~40% of U.S. freight ton-miles; coal, grain, chemicals, autos, intermodal; critical but has some redundancy between railroads |
| Adaptability | 2 | Rail corridors can be repurposed for passenger service; electrification of rail reduces oil dependency further |
| Optimization Gap | 2 | Precision Scheduled Railroading (PSR) eliminated buffer capacity; rail network is now optimized for efficiency, not resilience; DED needs minimum buffer capacity standards |
| **DED Score** | **9** | **Tier S** |

**Optimization Gap:** PSR reduced railcar fleets, cut maintenance facilities, and eliminated redundant routes — maximizing profits while destroying the slack that allows a resilient system to absorb shocks. DED needs authority to mandate minimum fleet reserves and route redundancy for critical corridors.

---

## Water and Wastewater Systems

### Major Municipal Water Systems (Top 20 by Population Served)
**Location:** Nationwide | **Type:** Water treatment and distribution

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Drought, grid cyberattack (water treatment controls), pandemic (public health), financial fragmentation (infrastructure investment gap) |
| Criticality | 3 | Water failure is the fastest path to population mortality; large city water failure produces mass evacuation within 72 hours |
| Adaptability | 1 | Physical infrastructure is largely fixed; limited repurposing |
| Optimization Gap | 2 | Most municipal water systems run SCADA control systems with outdated cybersecurity; Oldsmar FL 2021 hack demonstrated vulnerability; EPA water system security rule has limited enforcement capacity |
| **DED Score** | **9** | **Tier S** |

---

### Desalination Capacity (Current and Potential)
**Location:** CA (Carlsbad), FL, TX; major potential in CA, AZ, TX Gulf Coast | **Type:** Alternative freshwater production

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Drought (alternative water supply), oil restriction (energy cost of desalination), pandemic (water security under infrastructure stress) |
| Criticality | 2 | Carlsbad (SD, CA) is largest U.S. plant, producing only ~7-8% of San Diego water; current capacity is marginal nationally but critical locally |
| Adaptability | 2 | Desalination + solar power is a natural pairing (high energy + high sunlight in same regions); can provide water independence for coastal/border communities |
| Optimization Gap | 2 | U.S. has no strategic desalination deployment program; California has pending projects blocked by permitting; DED-optimal = pre-permitted desalination sites at 10 major coastal metros with modular deployment capacity |
| **DED Score** | **9** | **Tier S** |

**Strategic Note:** Each DED scenario that stresses freshwater supply (drought, pandemic, oil restriction via agriculture) independently increases desalination's strategic value. It is a cross-scenario force multiplier. This is exactly the kind of asset whose DED score should be reviewed upward as new scenarios are added.

---

## Telecommunications

### Backbone Internet Infrastructure
**Location:** Major exchange points: Ashburn VA, Chicago IL, Dallas TX, Silicon Valley CA, Seattle WA | **Type:** Internet exchange and fiber backbone

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Grid cyberattack (communications under attack), pandemic (remote work backbone), financial fragmentation (financial system communications) |
| Criticality | 3 | Internet backbone failure cascades: no remote work, no financial transactions, no emergency communications, no SCADA for grid/water/pipelines |
| Adaptability | 2 | Fiber infrastructure can carry any digital traffic; exchange points can prioritize critical traffic under emergency protocols |
| Optimization Gap | 2 | Major internet exchanges are in private hands with no emergency operating agreements with federal government; DED needs pre-negotiated emergency traffic prioritization protocols with Tier 1 ISPs and IXPs |
| **DED Score** | **10** | **Tier S** |

---

### Undersea Cable Landing Stations
**Location:** ~60 U.S. landing points; concentrated in NY, VA, FL, CA, HI, Guam | **Type:** International communications

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 2 | Financial fragmentation (global financial communications), grid cyberattack (international coordination), shipping blockade (satellite alternative) |
| Criticality | 3 | ~95% of international data (including financial transactions) travels via undersea cables, not satellites |
| Adaptability | 1 | Fixed physical infrastructure |
| Optimization Gap | 2 | Landing stations are privately owned with no standby emergency protocols; some are in geographically vulnerable locations; redundant satellite capacity (Starlink) is improving but not yet adequate for financial transaction volumes |
| **DED Score** | **8** | **Tier A** |

---

## Summary: Critical Infrastructure by DED Score

| Asset | Score | Tier |
|-------|-------|------|
| Eastern Interconnection | 10 | S |
| Western Interconnection | 10 | S |
| Port of Los Angeles / Long Beach | 10 | S |
| Mississippi River Inland Waterway | 10 | S |
| Internet Backbone | 10 | S |
| HVDC Transmission Corridors (planned) | 9 | S |
| Natural Gas Pipeline Network | 9 | S |
| Class I Freight Rail Network | 9 | S |
| Municipal Water Systems | 9 | S |
| Desalination Capacity | 9 | S |
| ERCOT (Texas Grid) | 8 | A |
| Colonial Pipeline | 8 | A |
| Undersea Cable Landing Stations | 8 | A |
| Port of New York / New Jersey | 7 | A |
