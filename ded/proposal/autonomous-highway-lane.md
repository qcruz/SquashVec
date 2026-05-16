# DED Proposal: Autonomous Highway Lane Program (AHLP)

**Document Type:** Major infrastructure and economic transition program proposal
**Last Updated:** 2026-05
**Category:** Transportation Infrastructure / Supply Chain Resilience / Automation Transition
**DED Priority:** High — reduces freight cost on DED strategic supply chains; accelerates
  domestic AV industry advantage; creates new workforce categories; self-funding mechanism
**Related Scenarios:** Oil Restriction (freight cost and AV electrification), AI Unemployment
  (trucker displacement and new job creation), Semiconductor Collapse (hardware supply chain
  speed), Rare Earth Denial (EV/AV component supply chain)
**Related Proposals:** `proposal/workforce-development-floor.md` · `proposal/american-sovereign-fund.md` ·
  `proposal/universal-basic-income.md` · `proposal/civilian-reserve-health/`
**Related Economics:** `economics/automation-labor-projection.md` · `economics/supply-chain-concentration-risk.md`
**Related Assets:** `assets/profiles/national-freight-rail.md`

---

## 1. The Problem: A Freight System at Its Limits

The U.S. Interstate Highway System is the backbone of the domestic economy. Trucks move
approximately 72% of domestic freight by value — approximately $940 billion in goods per
year. The system is under simultaneous pressure from three directions:

**Driver shortage.** There are currently 80,000+ unfilled long-haul truck driver positions.
The American Trucking Associations projects this will reach 160,000 by 2030. The shortage
is structural: the driver population is aging (median age 46, vs. 42 for all workers),
CDL licensing requirements limit the pipeline, and the lifestyle (extended time away from
home, irregular hours, physical demands) makes long-haul trucking a declining career choice
for younger workers entering the workforce.

**Fuel cost volatility.** Diesel fuel represents 20-25% of a trucking company's operating
costs. Every oil price shock transmits directly into freight costs, which transmit into
the price of every good moved by truck — including defense procurement inputs. The DED's
oil restriction scenario identifies freight cost inflation as a second-order consequence
of energy supply disruption.

**Infrastructure age.** The Interstate Highway System averages over 50 years old. The
American Society of Civil Engineers rates 43% of U.S. roads in poor or mediocre condition.
Deferred maintenance costs compound: a $1 of maintenance deferred becomes $4-6 in
eventual repair. The system needs investment regardless of AV adoption.

**The opportunity:** Autonomous vehicle trucking technology addresses all three pressures
simultaneously. It eliminates driver shortage as a constraint. It enables electrification
(AV trucks are primarily electric, eliminating diesel cost exposure). And it creates
the economic case for targeted infrastructure investment that existing freight economics
cannot justify.

The Autonomous Highway Lane Program creates the physical and digital infrastructure
that converts AV trucking from an experimental technology into a national freight system.

---

## 2. The Technology State: What Already Works

Autonomous trucking is not speculative. Multiple companies have commercial deployments:

| Company | Technology | Commercial Deployments | Scale |
|---------|-----------|----------------------|-------|
| Aurora Innovation | Aurora Driver (SAE Level 4) | FedEx, Werner, Uber Freight | Dallas-Houston corridor; expanding to I-10 West |
| Waymo Via | Waymo Driver | J.B. Hunt, C.H. Robinson | Phoenix-El Paso; Texas hub-to-hub |
| Kodiak Robotics | Kodiak Driver | U.S. Army logistics; commercial freight | Texas and Southwest corridors |
| Torc Robotics (Daimler) | Autonomous system | Daimler Freightliner trucks | Testing; commercial launch 2026-2027 |
| Gatik AI | Short-haul autonomous | Walmart, Loblaw, Home Depot | Middle-mile hub-to-store operations |
| Embark Trucks | Embark Driver | Werner, Knight-Swift | I-10 Texas to California |

All of these systems currently require a safety driver in the cab for most operations.
The transition to fully driverless (SAE Level 4 with no safety driver) is the regulatory
and technical frontier being crossed in 2025-2027 on the highest-confidence corridors.

**The critical enablers for full deployment:**
- **Dedicated operating environment:** AV systems perform dramatically better in predictable,
  structured environments. A dedicated AV lane eliminates the most challenging variables
  (unpredictable human driver behavior, lane changes, merging at highway speeds) and
  allows the AV stack to be optimized for a controlled corridor.
- **V2I communication:** Vehicle-to-infrastructure communication (roadside units that
  broadcast real-time conditions — construction zones, incidents, speed changes) allows
  AV systems to respond to conditions they cannot yet detect visually.
- **Platooning:** AV vehicles traveling together in a coordinated convoy can maintain
  4-8 vehicle following distances at synchronized speed, increasing throughput 2-3×
  over mixed traffic and reducing aerodynamic drag by 10-15% per following vehicle.

---

## 3. Program Design: The Four-Variant Analysis

### Variant A: Dedicated Lane Conversion (Remove One Lane from Mixed Use)

**Mechanism:** Convert the rightmost lane of 4+ lane interstate segments (≥4 lanes in
each direction on the highest-freight corridors) to AV-only. Physical signage, barrier
systems, and automated merge detection enforce the designation. Human drivers may not
use the lane; AV vehicles may not use the standard lanes at highway speed.

**Target corridors for Phase 1:**
- I-10 (Phoenix-El Paso-San Antonio): Aurora and Waymo Via have existing commercial
  operations; highest AV deployment density; desert climate reduces weather edge cases
- I-80 (Reno-Salt Lake City): Major freight corridor; limited snow on Eastern Nevada
  and Utah segments; high truck density
- I-40 (Amarillo-Oklahoma City): High freight volume; relatively flat; limited
  weather variability on Western segments
- I-95 (Baltimore-Philadelphia-New York): Highest commercial value corridor; politically
  visible; complex but high payoff

**Infrastructure requirements per mile:**
- Lane marking and barrier separation: $50,000-$150,000/mile (varies by existing lane width)
- Roadside V2I units (every 500m): $100,000-$150,000/mile
- Entry/exit merge control systems: $500,000-$1M per interchange
- Monitoring cameras and incident detection: $30,000-$50,000/mile
- **Total per-mile cost (Variant A):** $350,000-$600,000/mile for conversion
  (vs. $1-3M/mile for new lane construction)

**Toll structure:**
- Per-mile toll: $0.08-$0.12/mile for AV freight vehicles (vs. $0.06-$0.08 for HOV tolls)
- Transponder requirement: RFID-based toll tag with AV certification verification
- Revenue projection: 10,000 AV vehicles × 400 miles/day average × $0.10/mile = $400,000/day
  per corridor; $146M/year per major corridor
- 5 Phase 1 corridors: ~$730M/year total at 50% utilization; grows with fleet deployment

**Break-even analysis:**
- 5-corridor Phase 1 infrastructure cost: $3-6B (1,000-2,000 miles × $350k-600k/mile + interchanges)
- Annual toll revenue at 50% utilization: $730M
- Break-even horizon: 4-8 years at Phase 1 corridors; faster as AV fleet scales

**Trade-offs:**
- Pro: Highest throughput gain; full platooning capability; AV system performance maximized
- Pro: Self-funding within 5-8 years; growing revenue stream as AV fleet grows
- Con: Immediate loss of one mixed-traffic lane; requires high-enough AV volume to be
  net-positive for total throughput (crossover point: ~5,000 AV vehicles/day per corridor)
- Con: Requires corridor-specific justification; lanes in low-AV-traffic corridors are
  underutilized until fleet scales

---

### Variant B: Shoulder Conversion (Convert Emergency Shoulder to AV Lane)

**Mechanism:** Convert the right emergency shoulder to an AV-only travel lane. The
standard shoulder (10-12 feet wide on most interstates) is widened and reinforced to
highway travel standard where necessary. Emergency vehicle pull-off accommodation is
maintained via designated refuge areas every 0.5-1.0 miles.

**Key difference from Variant A:** No reduction in mixed-traffic lane count. The shoulder
conversion adds capacity rather than redistributing existing capacity.

**Infrastructure requirements per mile:**
- Shoulder reinforcement and widening: $200,000-$800,000/mile (varies dramatically by
  existing shoulder width and substrate condition)
- V2I infrastructure: Same as Variant A ($100,000-$150,000/mile)
- Emergency refuge areas: $100,000-$200,000 per refuge (every 0.5 miles = $200,000-$400,000/mile)
- Barrier/marking separation from travel lanes: $50,000-$100,000/mile
- **Total per-mile cost:** $650,000-$1.6M/mile — more expensive per mile than Variant A
  due to shoulder reconstruction, but eliminates the political cost of lane reduction

**Trade-offs:**
- Pro: No reduction in mixed-traffic capacity — no political opposition from human drivers
- Pro: Physically adds capacity; net positive for total corridor throughput from Day 1
- Con: More expensive per mile than Variant A on average
- Con: Many interstate shoulders are not wide enough for highway-speed travel without
  significant reconstruction; requires right-of-way assessment before commitment
- Con: Emergency vehicle access requires careful refuge design; not viable on all segments

---

### Variant C: Greenfield New Lane (Build New Dedicated AV Infrastructure)

**Mechanism:** Build a new, fully dedicated AV lane alongside existing interstate right-of-way,
using median space or modest right-of-way acquisition. Fully isolated from mixed traffic.

**Best applications:** High-volume freight corridors where the economic case justifies new
construction — the "spine" corridors that move the highest freight value nationally:
- I-10 complete (Jacksonville to Los Angeles)
- I-80 complete (San Francisco to Teaneck)
- I-20/I-40 Southern corridor

**Infrastructure cost:** $1.5-$4M/mile for new lane construction (vs. $5-15M/mile for
full new highway, due to shared right-of-way and existing grade)

**Trade-offs:**
- Pro: Optimal design — lane engineered specifically for AV operation, no legacy compromises
- Pro: No impact on existing traffic at any point during construction
- Con: 3-5 year construction timeline before any lane operation
- Con: Most expensive option; requires federal funding commitment beyond toll self-funding
  at launch; becomes self-funding at scale (Year 8-12)
- Con: Right-of-way acquisition on already-developed interstate corridors is politically
  and legally complex

**Recommended for:** Phase 3 planning on corridors where Phase 1 (Variant A or D) has
demonstrated sufficient AV volume to justify Variant C investment.

---

### Variant D: Time-Window Platooning Corridor (No Physical Separation) — Recommended Phase 1

**Mechanism:** No dedicated lane. Instead, designate specific time windows (10pm-6am)
on specific high-freight corridors where AV platoons have infrastructure-managed priority:
- Traffic signal coordination through V2I gives platoons green corridors
- On-ramp metering restricts human driver entry during peak AV operation windows
- Speed harmonization through V2I guidance keeps platoon speeds optimized
- Real-time incident management through V2I notifies AV systems before visual detection

**This is not a dedicated lane — it is a managed corridor.** Human drivers may still use
the highway; they simply experience the coordination infrastructure as well-managed traffic.

**Infrastructure requirements per mile (Variant D only):**
- V2I roadside units: $100,000-$150,000/mile
- Traffic signal coordination upgrades: $50,000-$100,000/interchange
- Monitoring and incident detection: $30,000-$50,000/mile
- **Total per-mile cost:** $180,000-$300,000/mile — lowest cost of any variant

**Toll structure for Variant D:**
- "Priority Access Subscription": AV operators pay $0.05-$0.08/mile for V2I coordination
  services — not a physical lane toll but a digital services subscription
- Revenue projection: Lower per mile than Variant A but earlier (no construction delay)
  and covers V2I infrastructure cost within 3-5 years at target corridor volumes

**Trade-offs:**
- Pro: Lowest cost; fastest to implement (no construction); no reduction in existing capacity
- Pro: V2I infrastructure built under Variant D is fully compatible with Variant A/B/C
  upgrade — it is not wasted investment, it is Phase 1 of physical lane infrastructure
- Pro: Can be implemented on 5,000+ miles of interstate in 18-24 months vs. 3-5 years
  for physical lane variants
- Con: Lower throughput gains than dedicated lane (no physical separation means no
  full platooning optimization; some mixed-traffic interaction)
- Con: Night-hours operation window limits the 24/7 potential until physical separation
  is available
- Con: Not suitable for highest-volume daytime freight corridors

**Recommended implementation:** Variant D as the national Phase 1 entry point (2027-2030).
Use V2I investment and AV corridor data to identify which specific segments justify
physical lane development (Variant A or B) in Phase 2 (2030-2035).

---

## 4. The Self-Funding Model

The AHLP is designed to be fiscally self-sustaining through toll and corridor access fees.
No permanent subsidy is required; the federal investment in infrastructure is recovered
through user fees from the operators who benefit from the dedicated infrastructure.

### Revenue Projections by Phase

**Phase 1 (2027-2030): Variant D corridors — 3,000-5,000 miles**

| Year | AV Commercial Fleet Size (est.) | Corridor Utilization | Revenue |
|------|--------------------------------|---------------------|---------|
| 2027 | 15,000 trucks | 30% | $80-120M |
| 2028 | 50,000 trucks | 45% | $250-380M |
| 2029 | 120,000 trucks | 60% | $550-800M |
| 2030 | 250,000 trucks | 70% | $1.0-1.5B |

**Phase 2 (2030-2035): Variant A/B lanes on 5 primary corridors — 2,000 miles physical**

| Year | AV Commercial Fleet Size | Physical Lane Revenue | Variant D Remainder | Total |
|------|-------------------------|-----------------------|--------------------|-------|
| 2031 | 400,000 | $800M | $600M | $1.4B |
| 2033 | 700,000 | $1.6B | $900M | $2.5B |
| 2035 | 1,000,000 | $2.5B | $1.2B | $3.7B |

**Phase 3 (2035+): National build-out with self-funded expansion**

At $3.7B+/year in corridor revenue, the AHLP generates sufficient surplus to fund new
Variant C corridor construction on a rolling basis — the program's infrastructure
expands with the AV fleet without requiring new appropriations.

### Revenue Disposition

| Tranche | Allocation | Use |
|---------|-----------|-----|
| 60% | AHLP Infrastructure Fund | Lane maintenance, V2I upgrades, new corridor development |
| 20% | Highway Trust Fund | General interstate maintenance (political buy-in for highway states) |
| 10% | DED Workforce Transition Fund | Trucker retraining programs (see Section 7) |
| 10% | American Sovereign Fund (optional) | Transportation infrastructure revenue stream |

The 10% Workforce Transition allocation is non-negotiable from the program's founding —
the government that builds the lane that displaces the driver funds the driver's transition.
This must be codified in the enabling legislation, not left to annual appropriations.

---

## 5. V2I Infrastructure Design

Vehicle-to-infrastructure communication is the technical foundation of the AHLP.
It is also a national security asset: V2I infrastructure that covers major freight
corridors gives the federal government real-time visibility into freight movement,
condition, and throughput — data that the DED's National Economic Intelligence Dashboard
currently lacks.

### Technical Architecture

**Roadside Units (RSU):** The primary V2I hardware component. Installed every 300-500 meters
along the corridor, RSUs broadcast:
- DSRC (Dedicated Short-Range Communications) at 5.9 GHz for vehicle proximity messaging
- C-V2X (Cellular Vehicle-to-Everything) over 5G for longer-range coordination
- Weather and road condition data from integrated sensors
- Incident detection data from corridor cameras and loop detectors

**Traffic Management Center Integration:** AHLP corridor data feeds into existing state
DOT Traffic Management Centers (TMCs) and into the DED's National Economic Intelligence
Dashboard for real-time freight visibility.

**Cybersecurity:** V2I infrastructure is critical infrastructure. The DED's grid cyberattack
scenario framework applies directly — V2I networks controlling freight corridors are a
potential attack surface. Security requirements:
- Air-gapped control systems for physical signaling (signal heads do not depend on internet connectivity)
- Encrypted communication protocols (CAMP (Crash Avoidance Metrics Partnership) standards)
- Multi-layer authentication for RSU command authority
- DED OSAP oversight for V2I as a critical infrastructure asset

### Ownership and Operations

**Federal ownership:** V2I infrastructure on federal highways is federally owned (FHWA),
operated under state DOT management agreements (consistent with existing FHWA-state
highway administration relationships).

**Private sector operation:** AV operators are required to equip vehicles with DSRC/C-V2X
compatible systems as a condition of AHLP access. The equipment cost falls on the operator,
not the government — maintaining the private sector investment incentive structure.

**Data rights:** V2I infrastructure generates significant data (vehicle counts, speeds,
incident events, freight volumes by corridor segment). The DED retains aggregate data
rights for national economic intelligence purposes. Individual operator data is protected
under commercial confidentiality — the DED does not have access to specific company
route or volume data without a court order or emergency declaration.

---

## 6. Federal vs. State Jurisdiction Architecture

The Interstate Highway System is federally funded but state-operated — the fundamental
tension in AHLP implementation. Three structural options:

### Option 1: Federal Mandate as Condition of Federal Highway Funding (Recommended)

The federal government conditions a portion of Federal Highway Administration grants on
state compliance with AHLP corridor designations. Analogues: the 55mph speed limit
(1974-1995), the 21-year drinking age (1984 NHTSA funding condition), ADA accessible
design requirements. All were implemented as conditions of federal highway funding.

**Mechanism:** States that designate qualifying interstate segments as AHLP corridors
receive a 5-10% federal matching fund bonus on all FHWA grants. States that refuse
receive standard matching rates. The bonus creates a strong incentive without being
legally coercive (the question of coercive conditions vs. incentive conditions was
addressed in NFIB v. Sebelius).

**DED role:** DED recommends corridor designations based on CRS analysis and freight
flow data; FHWA administers the funding condition; state DOTs implement.

### Option 2: Opt-In State Partnership with Federal Cost-Share

No federal mandate; states opt in to AHLP designation in exchange for federal cost-sharing
(60% federal, 40% state for V2I infrastructure; 80/20 for physical lane conversion).

**Trade-off:** Voluntary adoption will concentrate early corridors in states with
active AV industry relationships (Texas, California, Arizona); national coverage will
be uneven and slower.

### Option 3: FHWA Direct Implementation on Federal Segments

On the 27% of interstate mileage where FHWA exercises direct authority (tribal lands,
federal park corridors, certain urban segments), the federal government implements AHLP
without state permission. This is a limited but legally clean starting point.

**Recommended combination:** Option 3 for immediate action on federal segments (fastest,
no political negotiation required) + Option 1 for the majority of interstate mileage.

---

## 7. AV Certification Framework

The AHLP requires a federal certification framework determining which AV systems qualify
for lane access. This is currently the most significant regulatory gap.

### Proposed AHLP Certification Standards

**Level 1 — Variant D Access (Time-Window Corridor):**
- SAE Level 4 system with certified 99.9%+ operational design domain compliance
- Federal Motor Carrier Safety Administration (FMCSA) certification of driverless operation
- V2I-compatible communications hardware (DSRC + C-V2X)
- Real-time teleoperator monitoring requirement: 1 teleoperator per 20 active vehicles maximum
- 100,000 driverless miles demonstrated without serious incident in non-AHLP conditions

**Level 2 — Variant A/B Physical Lane Access:**
- All Level 1 requirements
- 500,000 driverless miles demonstrated
- AHLP corridor-specific operational design domain validation
- Teleoperator ratio: 1 per 50 active vehicles
- SAE Level 4+ with defined AHLP corridor as operational design domain

**Certifying authority:** FHWA + NHTSA joint certification program (analogous to FAA
airworthiness certification for aircraft; the AHLP lane is the airspace; the AV system
is the aircraft).

**IP protection:** The certification process must be designed to avoid requiring proprietary
AV system disclosure that would harm U.S. AV companies' competitive position. Performance-based
standards (demonstrate 500,000 driverless miles) rather than design-based standards
(disclose how your system works) protect both safety and commercial IP.

---

## 8. Workforce Transition: The Non-Negotiable Commitment

The AHLP accelerates the displacement of long-haul truck drivers. There are approximately
1.9 million long-haul truck drivers in the United States; AV trucking will displace a
significant fraction of these over 15-25 years. The government that builds the lane
that accelerates this displacement is directly responsible for the transition.

This is not an optional add-on. It is a founding condition of the program. The 10%
workforce transition allocation from toll revenue funds the following:

### Retraining Pathways

**Pathway 1: Remote Vehicle Operator**
The most direct transition for current truck drivers. Existing drivers have deep
understanding of truck systems, road conditions, and freight logistics. Retraining for
teleoperator roles builds on this foundation:
- 12-16 week certification program (DED Credential Registry)
- Covers: AV system fundamentals, teleoperator interface, edge case protocols, FMCSA regulations
- Income continuity: similar wage range ($55,000-$95,000/year)
- Remote work eligible: teleoperators work from control centers; not required to be on the road
- CRHP integration: teleoperator credential is a CRHP-eligible role

**Pathway 2: AV Maintenance Technician**
CDL holders already have mechanical knowledge of commercial trucks. AV maintenance
requires electronics and sensor systems education on top of existing mechanical knowledge:
- 18-24 month community college or technical program
- DED Workforce Development Floor positions at AV operators during training
- Income: $65,000-$110,000/year; union-eligible; physically demanding
- AHLP toll revenue funds training scholarship for CDL holders displaced from long-haul

**Pathway 3: V2I Infrastructure Technician**
Installation and maintenance of the V2I network created by AHLP is physically demanding
outdoor work — a profile similar to long-haul trucking (outdoor, infrastructure-adjacent,
physical). Retraining is shorter (6-12 weeks for installation skills):
- Telecommunications + electrical certification through community college or trade program
- CRHP deployment pathway: V2I technicians are a natural CRHP priority deployment category
  for rapid infrastructure build in DED emergency scenarios
- Geographic alignment: V2I jobs are on interstate corridors, the same geography where
  truck drivers live and work

**Pathway 4: Logistics Dock Coordinator**
For drivers who do not want to transition to technology roles, the 24/7 logistics dock
operations created by AV trucking provide a non-technology alternative:
- No retraining required; experience in freight logistics directly applicable
- Night shift roles; union-eligible; physically demanding but familiar skill set
- Income: $50,000-$75,000/year; consistent with experienced driver wages
- Immediate availability: AV trucking creates these roles before driver displacement peaks

### The Transition Timeline

| Period | Trucker Displacement Rate | Net New AV-Enabled Roles | Policy Response |
|--------|--------------------------|--------------------------|----------------|
| 2026-2030 | 5-10% of long-haul (100,000-190,000) | 200,000-400,000 new roles (Tier 1) | WDF + retraining scholarships + NIT floor |
| 2030-2035 | 20-30% of long-haul (380,000-570,000) | 500,000-900,000 new roles (Tier 1+2) | Full retraining pipeline + CRHP deployment + Flying Car Pilot reserve |
| 2035-2045 | 40-60% of long-haul (760,000-1.14M) | 1M+ new roles (Tier 1+2+3) + Flying Car Pilot categories | ASF dividend supplement + NIT floor + evolved credential registry |

The NIT income floor is the safety net during transition periods when retraining is
underway but new employment has not yet been secured. The AHLP toll revenue Workforce
Transition Fund is the training subsidy. The ASF dividend is the long-run ownership
stake that cushions an economy where wage employment in trucking has been permanently
reduced but national productivity has increased.

---

## 9. Emergency and National Security Applications

The AHLP is dual-use infrastructure. In a declared DED economic emergency, AHLP
corridors provide capabilities that do not exist in the current freight system:

**Oil Restriction:** AV trucks are primarily electric. AHLP corridors that are AV-only
lanes are de facto petroleum-independent freight corridors. During a petroleum supply
restriction, AHLP lanes continue operating while human-driver trucking is constrained
by diesel availability. The DED oil restriction scenario Phase 2 identifies AV-electric
freight as a critical resilience asset.

**Pandemic Response:** AV trucks can operate without drivers present, eliminating
transmission risk in freight operations during a declared pandemic. Phase 1 of the DED
pandemic scenario identifies freight system vulnerability as a second-order effect of
driver illness rates. AHLP lanes provide pathogen-resilient freight capacity.

**Grid Cyberattack:** V2I infrastructure requires hardening against cyberattack.
The AHLP V2I design includes air-gapped fallback modes that maintain basic lane
operation even if connectivity is lost — AHLP corridors are more cyber-resilient than
standard freight corridors because they are explicitly designed for cyber-threat environments.

**Supply Chain Priority Routing:** During a DED Tier 2 or 3 declaration, AHLP lane
access can be restricted to priority freight — semiconductor components, pharmaceutical
inputs, rare earth materials — with non-priority freight redirected to mixed-traffic lanes.
The V2I certification system makes this prioritization mechanically feasible: each
transponder is associated with a cargo manifest, and the lane access system can
prioritize by cargo category during emergencies.

---

## 10. Economic Impact Summary

| Category | 10-Year Projection |
|----------|-------------------|
| Freight cost reduction (72% of domestic goods) | 15-25% reduction in hub-to-hub freight cost |
| Net new jobs created — Tier 1 (certain) | 500,000-1.4M |
| Net new jobs created — Tier 2 (probable) | 200,000-500,000 |
| Toll revenue generated | $15-25B cumulative over 10 years |
| Workforce transition fund generated (10% of toll) | $1.5-2.5B |
| V2I infrastructure investment (federal + toll-funded) | $5-8B |
| Annual DoD logistics cost reduction | $500M-$1.5B |
| Carbon reduction (diesel displacement) | 15-25% reduction in highway freight emissions |
| Deferred driver shortage economic impact | $30-60B over 10 years |

---

## Implementation Timeline

| Phase | Years | Key Milestones |
|-------|-------|----------------|
| **Legislation and certification** | 2026-2027 | AHLP Act passed; FHWA/NHTSA certification framework established; state compact initiated |
| **Variant D launch** | 2027-2028 | V2I infrastructure on 3,000-5,000 miles of primary freight corridors; night-window management operational; first toll/access fee collection |
| **Variant A Phase 1** | 2029-2031 | Physical lane conversion on 5 primary corridors (I-10, I-80, I-40, I-95, I-5 California) |
| **National Variant D expansion** | 2030-2032 | V2I on all 48,440 interstate miles; universal corridor management |
| **Variant B/C where justified** | 2032-2035 | Shoulder conversion or new lane construction on top 10 freight corridors by AV volume |
| **National build-out** | 2035+ | Self-funded from toll revenue; expansion driven by AV fleet growth |

---

## Cross-References

- `ded/economics/automation-labor-projection.md` — full Flying Car Pilot projection; Tier 1/2/3
  workforce categories; historical cost curves that project AV adoption timeline
- `ded/scenarios/ai-unemployment/` — AV displacement of trucking workforce is a Phase 2
  AI unemployment scenario; AHLP workforce transition fund is explicitly linked
- `ded/scenarios/oil-restriction/phase-2-adaptation.md` — AV-electric freight as resilience asset
- `ded/proposal/workforce-development-floor.md` — trucker retraining pathway through WDF credentials
- `ded/proposal/universal-basic-income.md` — NIT floor as transition support during retraining
- `ded/proposal/american-sovereign-fund.md` — toll revenue surplus as optional ASF contribution
- `ded/assets/profiles/national-freight-rail.md` — rail as complementary freight resilience;
  AHLP and rail are substitutes on some corridors, complements on others
- `ded/feasibility/` — feasibility analysis TBD (add as 12th feasibility doc)
