# Semiconductor Collapse — Phase 1: Triage and Stabilization

**Scenario:** Semiconductor Supply Collapse
**Phase:** 1 of 3
**Timeline:** Immediate activation through 18–24 months from declaration
**Trigger:** Tier 1 declaration (15–30% reduction in advanced chip availability) or
  Tier 2 declaration (50%+ reduction — all Phase 1 tools activate simultaneously)
**Last Updated:** 2026-05

---

## Phase 1 Objective

A semiconductor supply collapse is an **allocation crisis before it is a production crisis.**
In the first 12–24 months, the total supply of chips does not go to zero — it declines
sharply and misdirects. The free market during a chip shortage allocates to the highest
bidder, not the highest-value use. Consumer electronics companies with 40%+ gross margins
can outbid defense contractors operating on cost-plus contracts. Medical device manufacturers
with small volumes and long procurement cycles lose to automotive OEMs buying in bulk.

The 2021 shortage — a relatively mild Tier 1 event — cost the U.S. economy an estimated
**$240 billion** (approximately 1% of GDP growth) and caused the production of **7.7 million
fewer vehicles**. Under a Tier 2 or Tier 3 event, the same market dynamics play out at
5–10× the severity across defense, medical, and critical infrastructure sectors that cannot
absorb shortfalls the way consumer electronics markets can.

**Phase 1 mission:** Ensure chips flow to the highest-social-value uses during the shortage
period, maintain defense and medical production, stabilize prices enough to prevent cascade
economic contraction, and buy time for Phase 2 domestic production scale-up.

The DED does this through financial instruments and economic incentives — not mandates.
Priority access is created by making it economically rational for chip producers and
distributors to honor pre-committed agreements with priority sectors, not by ordering them to.

---

## Phase 1 Trigger Assessment — NEID Monitoring

The NEID maintains continuous leading indicators for semiconductor supply risk:

| Indicator | Source | Tier 1 Threshold | Tier 2 Threshold |
|-----------|--------|-----------------|-----------------|
| Taiwan Strait shipping disruption index | NEID/commercial AIS data | >15% reduction | >40% reduction |
| TSMC fab output reports | SIA quarterly production data | >15% below baseline | >50% below baseline |
| Semiconductor spot price index | SEMI market data | >50% above 12-month avg | >200% above avg |
| U.S. DoD chip procurement wait times | DCSA reporting | >9 months avg | >18 months avg |
| ASML EUV machine delivery status | ASML public filings | Delivery halt declared | — |
| Major foundry force majeure filings | Commercial intelligence | Any qualifying event | — |

On any single Tier 1 indicator breach: DED enters Watch status, NEID full monitoring mode.
On two concurrent Tier 1 breaches, or any single Tier 2 breach: DED initiates Tier 1
declaration and activates Phase 1 protocols.

---

## Program 1: National Semiconductor Inventory Visibility System (NSIVS)

### Problem

At the onset of the 2021 shortage, neither the federal government nor the major chip
consumers had visibility into aggregate inventory levels across the supply chain. Companies
were individually hoarding chips (buying ahead of need, stocking 6–12 months rather than
the normal 6–8 weeks) while simultaneously claiming shortfalls — creating phantom demand
that worsened the shortage. Commerce's voluntary Request for Information in 2021 revealed
that median chip inventory had fallen to fewer than 5 days for critical sectors.

Allocation decisions cannot be made rationally without inventory data. The NSIVS creates
that visibility.

### Design

**Participation:** Voluntary enrollment in exchange for priority access to DED chip
reserve contracts (Program 2). Companies enrolling in NSIVS commit to quarterly reporting
of chip inventory by category; companies not enrolled are ineligible for DED priority
procurement assistance.

*Voluntary + incentivized is the DED model: mandatory reporting creates legal liability
and political resistance; making enrollment the condition of access to DED programs
achieves the same data coverage without mandates.*

**Reporting scope:**
- Companies with annual chip procurement above $100M must report to participate
- Data reported: chip inventory in weeks-of-supply by node class (≤7nm advanced; 28nm
  mature; analog/mixed-signal; memory); geographic source of supply; existing long-term
  supply agreements
- Reporting is quarterly in peacetime; monthly on Tier 1 declaration; weekly on Tier 2

**NEID use of data:**
- Aggregate inventory map (confidential at company level; published in aggregate) identifies
  which sectors are critically undersupplied vs. which are hoarding
- Demand forecasting model: NEID models actual chip need vs. reported inventory for each
  enrolled sector, enabling DED to distinguish true shortage from phantom-demand hoarding
- Allocation basis: when DED activates priority procurement (Program 2), NSIVS data
  determines which sectors receive priority access

**Cost:** NEID system development ~$150M one-time; operations ~$30M/year. Enrollment
incentive (priority program access) has no direct cost — access to DED contracts is the
incentive.

---

## Program 2: Priority Sector Chip Reserve Contracts

### The Allocation Problem

Chip shortages are price crises as well as supply crises. Spot market prices during the
2021 shortage rose 200–500% for some components. At those prices, the sectors most
willing to pay — consumer electronics, crypto mining, automotive OEMs with high vehicle
margins — acquire available supply. Defense contractors operating on cost-plus government
contracts, medical device manufacturers with small-batch needs, and utility equipment
buyers with long procurement cycles all lose the price competition regardless of their
social priority.

The DED's role is not to override prices — it has no price-setting authority. Its role
is to financially pre-position priority sectors so they can compete in the market.

### Reserve Contract Structure

DED enters **Type A capacity preservation contracts** with the top 10–15 semiconductor
distributors and the U.S. semiconductor broker market. Contract terms:

- **Priority allocation commitment:** In a declared semiconductor emergency, the distributor
  commits to setting aside a defined percentage of available inventory for DED-designated
  priority sectors (DoD supply chain tier-1 and tier-2 contractors, medical device OEMs,
  grid equipment manufacturers, water utility controls)
- **Price cap on priority allocation:** Priority sectors pay at-contract-price plus no more
  than 25% premium — not the spot market price. DED compensates the distributor for the
  spread between spot and contract price from the emergency reserve fund.
- **In exchange:** Distributor receives a 5-year Type A contract with DED providing:
  a guaranteed floor volume of purchases through DED's own procurement programs;
  expedited clearance of NSIVS reporting; priority access to CHIPS Act co-investment programs

**Priority allocation tiers (on Tier 2 declaration):**

| Priority Tier | Sectors | Allocation % of available supply |
|--------------|---------|----------------------------------|
| Tier 1 — Defense critical | DoD tier-1/2 contractors; weapons system components | 20% |
| Tier 2 — Life safety | Medical devices, ventilators, pacemaker components, hospital systems | 10% |
| Tier 3 — Infrastructure | Grid controls, SCADA systems, water utility equipment, telecom backbone | 10% |
| Tier 4 — Economic continuity | Industrial manufacturing, automotive (commercial vehicles priority), agricultural equipment | 30% |
| Tier 5 — Market | Consumer electronics, discretionary manufacturing | Remainder |

The DED does not restrict Tier 5 purchases — it simply pre-commits that Tier 1–4 sectors
have price-competitive access before spot market allocates the remainder.

**DED fiscal exposure (Tier 2 event):**
- Estimated spot-to-contract spread: 150–250% above contract price in a severe shortage
- DED priority allocation volume: estimated $8–15B worth of chips/year at contract prices
- DED spread cost at 150%: ~$12–22B/year from emergency reserve fund
- Offset: this direct cost prevents an estimated $80–150B/year in downstream production
  losses (scaled from 2021 precedent at Tier 2 severity)

---

## Program 3: Equipment Repair and Life Extension Program (ERLP)

### Rationale

The fastest way to reduce chip demand is to extend the life of existing chip-dependent
equipment, deferring replacement cycles that would otherwise consume the constrained supply.
The average industrial semiconductor consumption cycle is 7–12 years. If a chip shortage
forces accelerated replacement — because equipment fails and no repair parts are available —
chip demand spikes exactly when supply is constrained.

The ERLP inverts this: financial incentives to repair and extend rather than replace.

### Design

**Tax credit:** 40% federal tax credit on qualified repair and refurbishment costs for:
- Industrial CNC equipment, robotics, and process control systems
- Medical imaging and diagnostic equipment
- Grid infrastructure (transformers, inverters, SCADA systems)
- Automotive manufacturing equipment
- Telecommunications equipment with remaining useful life of 5+ years post-refurbishment

Refurbishment must be performed by a certified domestic service provider (DED-maintained
registry). Credit applies to parts, labor, and recertification costs. No cap per unit
(incentivizes refurbishing the most expensive, chip-intensive equipment first).

**Type C contracts with repair service providers:**
DED contracts with domestic electronics repair, refurbishment, and reverse-engineering
firms to scale their capacity. Many of the skills required (component-level board repair,
chip identification and substitution) are in decline in the U.S. — DED contracts fund
training programs and equipment investment to rebuild this capacity before the shortage
makes it critical.

Target: 500–800 certified ERLP service providers nationally by 18 months post-declaration.

**Chip reclamation program:**
Financial incentive ($5–15/chip depending on node class) for companies to recover and
recertify chips from decommissioned equipment rather than disposing. These reclaimed chips
re-enter the supply chain at below-spot prices for NSIVS-enrolled buyers.

**Estimated fiscal cost:**
- Tax credit program: ~$4–8B/year in revenue expenditure (dependent on refurbishment activity)
- Type C service provider contracts: ~$500M–1B over 3 years
- Chip reclamation program: ~$200M/year

**Demand reduction impact:** Every 3-year deferral of a major industrial equipment
replacement represents approximately 500–2,000 chips not consumed. At scale across
industrial manufacturing and grid infrastructure, ERLP could defer 2–5% of annual chip
demand — material in a 30–50% supply reduction environment.

---

## Program 4: Allied Supply Coordination

### Context

A semiconductor supply collapse is not a U.S.-only crisis. Japan, South Korea, Taiwan
(if not the crisis source), the EU, and the UK face the same shortage simultaneously.
The historical response to a shared supply crisis is often competitive national hoarding —
each government securing supply for its own industry, fragmenting the global market and
worsening everyone's position.

The DED model: **shared allocation in exchange for mutual transparency and agreed priority
structures**, using existing alliance frameworks (AUKUS, Quad, US-Japan Semiconductor
Agreement framework, EU Chips Act coordination).

### Instruments

**Semiconductor Access Agreement (SAA) framework:**
DED proposes a formal bilateral SAA with South Korea, Japan, the Netherlands (ASML home
country), and the EU. The SAA establishes:

1. **Mutual inventory transparency:** Each party shares aggregate semiconductor inventory
   data through a shared intelligence platform operated by DED/NEID. Allied countries
   prevent hoarding by seeing each other's stock levels.

2. **Priority sector coordination:** Allied parties agree to honor each other's Tier 1–3
   priority sector needs before opening their domestic market to Tier 5 consumers. This
   prevents an allied nation from diverting medical chips to consumer electronics during
   a mutual crisis.

3. **Joint allocation of third-party supply:** Where third-party foundries (Taiwan, if
   operational; Malaysia; China in limited scenarios) can export to allied countries, the
   SAA governs how that supply is apportioned by sector rather than by national competition.

**Trade leverage for SAA participation:**
Allies who sign the SAA receive:
- Priority access to CHIPS Act co-investment funding for fab construction on their soil
- DED IP licensing concessions for U.S. government-owned semiconductor process IP
  (documented in the IP Asset Register)
- MFN treatment in DED strategic contract programs

This applies the IP-as-trade-tool doctrine from `economics/ip-licensing-as-trade-tool.md`
directly to semiconductor access negotiation.

**ASML-specific track:**
ASML (Netherlands) holds a ~100% monopoly on EUV lithography machines — the equipment
without which advanced chips cannot be manufactured anywhere. In a Taiwan crisis, ASML's
production capacity and its existing EUV machine service and parts supply become the
critical bottleneck. DED proposes:

- U.S.-Netherlands bilateral agreement: the U.S. commits to technology co-development
  partnerships (specifically, DARPA/DED Accelerator joint programs for next-generation
  lithography research) in exchange for Netherlands government commitment to prioritize
  servicing of EUV machines at allied fabs and to maintain ASML export access to allied nations
- This converts a supply relationship into a research partnership that gives both parties
  long-term interests in each other's success — the DED model for durable supply security

---

## Program 5: Mature Node Domestic Activation

### Rationale

Advanced chips (≤7nm) represent the most vulnerable part of the supply chain. But
many of the immediate impacts of a supply collapse — in automotive, medical devices,
industrial controls, grid infrastructure, agricultural equipment — are caused by shortages
of **mature node chips** (28nm to 180nm). These are older processes where the technical
barriers to domestic production are lower, where refurbishment capital costs are much
less than advanced node, and where timelines can be measured in 18–36 months rather than
5 years.

The 2021 shortage was largely a mature node shortage. The highest-volume chip categories
in shortage were analog, mixed-signal, microcontrollers, and legacy logic — nodes
available in the U.S. from existing fabs — but not at sufficient volume.

### DED Program Design

**Rapid capacity expansion contracts:**
DED enters Type B contracts with existing U.S. mature-node fabs (GlobalFoundries, Texas
Instruments fab operations, ON Semiconductor, Microchip Technology) for rapid capacity
expansion at 28nm–180nm nodes:

- Contract structure: DED pays for capital equipment installation and factory floor
  expansion in exchange for guaranteed allocation of 30% of new capacity to DED-priority
  sectors at contracted pricing for 10 years
- Estimated contract size: $2–4B per major fab expansion; total Phase 1 commitment: $8–15B
  across 5–8 qualifying domestic fabs
- Timeline: 18–30 months from contract signature to incremental production (vs. 4–5 years
  for greenfield advanced node)

**CHIPS Act acceleration:**
The CHIPS Act (2022) committed $52B; by late 2025, $36B+ in awards have been finalized:
- TSMC Arizona Fab 1: in production at 4nm/5nm (yield >92%, matching Taiwan facilities)
- TSMC Arizona Fab 2: 3nm production targeted 2027
- Intel Arizona (Fab 52): 18A process in high-volume manufacturing — first U.S. facility
  past the 2nm threshold
- Samsung Texas: 2026 target
- Intel Ohio: delayed to 2030

DED's role is not to duplicate CHIPS Act funding but to **accelerate the economic incentive
structure** for Phase 1-relevant mature node expansion alongside the advanced node CHIPS
pipeline:
- DED Type B contracts guarantee offtake — solving the business risk that prevents fabs
  from expanding capacity without committed buyers
- DED fast-track permitting coordination (through OSASC) for environmental and local
  permits on fab expansion projects at existing facilities — targeting 12-month reduction
  in permitting time

**Allied fab build coordination:**
Phase 2 will develop a full allied semiconductor industrial strategy. Phase 1's contribution:
DED proposes a formal framework with Japan (Rapidus — new domestic fab; JASM TSMC joint
venture), South Korea (Samsung, SK Hynix), and IMEC (Belgium — research-to-production
pipeline) for coordinated fab investment that ensures allied production geography is
diversified from the Taiwan concentration. Framework includes:

- Agreed specialization by node class (to avoid allied nations investing in identical
  capacity and creating a new concentrated dependency, just domestically)
- IP sharing arrangements for process technology developed under CHIPS-equivalent programs
- Allied demand pooling: DED negotiates multi-country volume commitments that make
  allied fab expansions financially viable in the absence of Taiwan competition

---

## Program 6: Semiconductor Allocation Bonds

Reference to `ded/tools/outcome-linked-bonds.md` — Section 5, Semiconductor Supply
Bonds. On Tier 1 or Tier 2 declaration, DED activates the allocation bond facility:

Bonds paying above-baseline interest when DED-maintained Semiconductor Allocation Index
(SAI — ratio of demand to committed supply in NSIVS-enrolled sectors) falls below 0.7
(30%+ shortfall vs. demand). Target buyers: DoD tier-1/2 contractors, medical device OEMs,
automotive OEMs with supply chain exposure.

These bonds do not solve the supply problem. They provide a financial hedge that allows
priority sector manufacturers to maintain operations through a shortage period without
liquidity crises — reducing the pressure for immediate emergency government intervention
and giving the Phase 2 production build-out time to come online.

---

## Phase 1 Economic Intelligence Dashboard

NEID maintains real-time monitoring of the following during Phase 1:

| Metric | Source | Watch Threshold | Crisis Threshold |
|--------|--------|----------------|-----------------|
| NSIVS aggregate inventory (days of supply) | Enrolled company reporting | <30 days avg | <14 days avg |
| Spot price premium vs. contract (priority tiers) | SEMI/DED contract registry | >50% | >150% |
| DoD tier-1 contractor chip wait time | DCSA reporting | >6 months | >12 months |
| Medical device chip backlog | FDA/device OEM reporting | >3 months | >6 months |
| Grid equipment delivery delay | FERC/utility reporting | >6 months | >12 months |
| Allied SAA compliance | NEID diplomatic reporting | — | Any SAA breach |
| ERLP enrollment | DED registry | <200 providers | <100 providers |
| Mature node domestic production index | SIA/fab reporting | <105% of pre-crisis | <90% of pre-crisis |

**Phase 2 transition criteria:**
Phase 1 transitions to Phase 2 (domestic production build-out) when:
- Phase 1 has been active for 18+ months AND
- NSIVS aggregate inventory stabilizes above 21 days of supply for Tier 1–3 sectors AND
- Mature node domestic capacity has increased by at least 15% over pre-crisis baseline AND
- At least one major allied SAA is operational with verified compliance

---

## Phase 1 Cost Summary

| Program | DED Commitment | Fiscal Mechanism |
|---------|---------------|-----------------|
| NSIVS infrastructure and operations | ~$200M over 3 years | Annual appropriation |
| Priority reserve contracts (Tier 2 spread cost) | ~$12–22B/year (emergency) | Emergency reserve fund |
| ERLP tax credits | ~$4–8B/year | Revenue expenditure |
| ERLP service provider contracts | ~$500M–1B over 3 years | Type C contracts |
| Allied supply coordination (SAA) | ~$500M–1B in IP concessions/co-investment | IP licensing / Type B |
| Mature node domestic activation | ~$8–15B over 3 years | Type B contracts |
| Allocation bonds (contingent guarantee) | ~$2–5B contingent exposure | ARBF guarantee facility |
| **Phase 1 total (non-emergency)** | **~$10–20B over 3 years** | Appropriation + contracts |
| **Emergency activation add-on (Tier 2 event)** | **~$12–22B/year from reserve** | Emergency reserve fund |

**The economic case:** The 2021 Tier 1 shortage cost ~$240B in a single year with zero
pre-positioned DED infrastructure. A Tier 2 event without Phase 1 preparation is estimated
to cost $500B–$1.5T over 2–5 years (scaled from 2021 data, broader scope, longer duration).
Phase 1's non-emergency investment of $10–20B over 3 years plus emergency activation costs
represents a 10–30:1 return in averted losses under even moderate probability of a Tier 2 event.

---

## Cross-References

- `ded/scenarios/semiconductor-collapse/overview.md` — scenario definition, cascade timeline, tiers
- `ded/scenarios/semiconductor-collapse/phase-2-domestic-production.md` [STUB]
- `ded/tools/strategic-contracts.md` — Type A/B/C contract framework; JCED oversight
- `ded/tools/outcome-linked-bonds.md` — semiconductor allocation bonds (Section 5)
- `ded/economics/historical-instruments.md` — DoD as anchor semiconductor buyer (1960s);
  1986 US-Japan Semiconductor Agreement; COCOM/Wassenaar export control precedents
- `ded/economics/ip-licensing-as-trade-tool.md` — IP for allied access negotiations; SAA leverage
- `ded/tools/expert-reserve-program.md` — Accelerator semiconductor track; ERP engineers
  for fab scale-up technical support
- `ded/assets/research-institutions.md` — DARPA/national lab semiconductor R&D programs
