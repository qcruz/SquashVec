# Feasibility Analysis: Autonomous Highway Lane Program

**Source:** `ded/proposal/autonomous-highway-lane.md`
**Last Updated:** 2026-05
**Status:** Full Analysis

---

## Feasibility Ratings

| Dimension | Rating | Summary |
|-----------|--------|---------|
| Legal / Constitutional | **Strong** | Federal highway authority well-established; FHWA can designate operational conditions; limited state preemption issues with Option 3 (federal segments only) |
| Administrative | **Moderate** | DOT/FHWA implementation capacity exists; V2I certification standards require new rulemaking; AV operational certification is the novel function |
| Economic | **Strong** | $1.4-3.7B/year in toll revenue by 2033; self-funding with 10-year corridor payback; 80k+ driver shortage creates direct demand; diesel cost reduction is the industry business case |
| Political | **Moderate** | Teamster opposition is the primary organized opposition; workforce transition fund allocation (10% of toll revenue) is the mitigation; Variant D (time-window platooning) avoids infrastructure disruption in Phase 1 |
| Implementation | **Strong** | Technology exists commercially; Waymo Via, Aurora, Kodiak, TuSimple all operating on public roads; Variant D requires no lane conversion — only RSU installation and scheduling system |
| International Precedent | **Strong** | Netherlands A16 automated freight corridor; Germany autobahn AV trials; Singapore AV freight zones; Japan highway AV pilot; EU Connecting Europe Facility explicitly funds V2I |

**Overall Implementation Readiness: Conditional** (Teamster opposition must be resolved through workforce transition fund design; state preemption is manageable with Option 3 approach)

---

## Legal / Constitutional Analysis

### Federal Highway Authority

The Federal Highway Administration has extensive existing authority over Interstate Highway
System operations under 23 U.S.C. §§ 101-170. The Secretary of Transportation may establish
operational conditions, designate special vehicle types, set vehicle standards, and condition
federal highway funding on state compliance.

**HOV and HOT lane precedent:** Dedicated lane designations already exist throughout the
Interstate system — High Occupancy Vehicle lanes, High Occupancy Toll lanes, truck-only lanes
(I-95 Virginia pilot). An Autonomous Vehicle freight corridor is an extension of this
authority, not a novel claim.

**Relevant existing authority:**
- 23 U.S.C. § 109 (standards for projects on federal-aid highways) — operational condition
  authority
- 23 U.S.C. § 127 (vehicle weight limitations) — vehicle specification authority
- 49 U.S.C. § 30168 (highly automated vehicle research) — AV standards authority (FHWA + NHTSA)
- Moving Ahead for Progress in the 21st Century Act (MAP-21) § 1201 — operational technology
  deployment authority

### State Preemption

The most significant legal complexity is the interaction between federal highway authority
and state vehicle registration and operational laws. Most states currently regulate AV
operations through state motor vehicle law, which may conflict with federal corridor requirements.

**Three options analyzed in proposal:**

- **Option 1 (Federal funding condition):** States that want federal AHLP corridor funds must
  adopt model AV operational regulations for corridor segments. Full legal certainty under
  Spending Clause (South Dakota v. Dole framework); no state preemption required.
- **Option 2 (Federal preemption):** Federal Motor Vehicle Safety Standards preempt state
  operational law on AHLP corridors. Legally defensible but politically confrontational.
- **Option 3 (Federal segments only):** AHLP operates exclusively on federal government-owned
  highway segments (approximately 15% of the Interstate system). No state preemption issue.

**Recommended approach:** Option 3 for Phase 1; Option 1 for Phase 2 expansion. This gives
AHLP operational infrastructure on federal segments before the state preemption debate is
resolved, creating demonstration corridors that build the case for Option 1 funding conditions.

### AV Certification and Liability

NHTSA's existing AV certification framework (AV STEP program) provides the regulatory
infrastructure for AHLP Level 1 and Level 2 certification. The program will need to create
corridor-specific operational minimums (weather conditions, vehicle class restrictions, V2I
communication requirements) but does not require new statutory authority.

Liability framework: AHLP operators bear liability as motor carriers under existing Federal
Motor Carrier Safety Administration regulations. The FMCSA's existing carrier liability
framework applies; no new liability statute required.

---

## Administrative Analysis

### DOT / FHWA Capacity

The Federal Highway Administration has approximately 2,800 FTE and a $50B+ annual budget
for highway programs. The AHLP would require:

- **V2I Standards Division:** New 50-80 FTE unit within FHWA to develop and maintain
  Roadside Unit certification standards, communication protocols, and corridor operational
  specifications. Existing FHWA technology deployment staff provide the base.
- **AV Corridor Certification:** Interagency function with NHTSA; 30-50 new FTE. NHTSA
  already has AV expertise; the corridor-specific certification is an extension.
- **Toll Collection and Revenue Management:** Existing E-ZPass and tolling infrastructure
  can be adapted; 20-30 FTE for AHLP-specific toll program management.
- **Workforce Transition Fund Administration:** 20-30 FTE for grant administration; attach
  to existing DOL grant infrastructure where possible.

**Total new federal FTE:** 120-190. Manageable within existing DOT hiring capacity.

### V2I Infrastructure Rollout

Roadside Unit installation is the primary implementation bottleneck. RSU installation at
approximately 1-mile intervals on target corridors (initial 5,000 miles of target corridor)
requires 5,000 installations over 3-5 years. Federal highway maintenance contractors have
the capacity; this is not a novel infrastructure challenge.

RSU procurement can be structured as an AHLP strategic contract with 3-5 domestic
manufacturers. DED procurement authority is well-suited to this function — the domestic
manufacturing requirement for V2I equipment is both a supply chain resilience provision and
a manufacturing jobs creation mechanism.

### Cybersecurity

The air-gapped fallback design (AV can detect corridor RSU failure and revert to standard
operation) is the critical administrative risk mitigation. CISA has existing protocols for
transportation infrastructure cybersecurity. AHLP V2I specifications should reference
CISA's existing Transportation Systems Sector Cybersecurity Framework.

---

## Economic Analysis

### Revenue Model

**Toll structure:** $0.25-0.40/mile for AV freight vehicles (comparable to existing truck
toll rates on HOT lanes). AV freight vehicles are approximately 30-40% more fuel-efficient
than human-driven equivalents due to platooning and optimized driving profiles; the toll
is offset by fuel savings.

**Revenue projections (from proposal):**
- 2028 (Variant D Phase 1, 5,000 miles): $400M-$1.1B/year
- 2030 (Phase 1 expansion): $700M-$1.8B/year
- 2033 (Variant A Phase 2 addition): $1.4B-$3.7B/year

**Revenue allocation:**
- 60%: AHLP infrastructure operations and capital repayment
- 20%: Federal Highway Trust Fund (state and federal highway maintenance)
- 10%: Autonomous Highway Lane Program Workforce Transition Fund (non-negotiable)
- 10%: American Sovereign Fund (optional; strengthens ASF coalition for AHLP legislation)

### Industry Business Case

The trucking industry faces an 80,000+ driver shortage (American Trucking Associations,
2024) projected to grow to 160,000 by 2031. Driver compensation is the largest operational
cost at 35-40% of total per-mile cost. AV freight on dedicated corridors eliminates or
reduces the driver cost on long-haul segments — the high-mileage, low-complexity portion
of routes where AV performance exceeds human performance in safety metrics.

The industry business case is self-motivating. AHLP does not need subsidies — it needs
regulatory certainty and infrastructure. The toll revenue covers the infrastructure.

### Macroeconomic Impact

From `ded/economics/automation-labor-projection.md` Tier 1 (Certain) job categories:

- Logistics Dock Coordinator 24/7: 400k-800k net new workers at $45-65k
- Last-Mile Delivery Coordinator: 500k-900k net new workers at $38-55k
- AV Fleet Maintenance Tech: industry-wide demand at $65-110k
- V2I Infrastructure Tech: RSU installation and maintenance at $60-90k

Net job creation in AV-adjacent roles substantially exceeds direct job displacement in
long-haul driving. The displacement occurs over 8-12 years as AV adoption scales; the
creation occurs in parallel.

---

## Political Analysis

### Teamster Opposition

The International Brotherhood of Teamsters (IBT) represents approximately 600,000 commercial
truck drivers and is the primary organized opposition to AHLP. The IBT has successfully
opposed or delayed AV trucking legislation in California, Illinois, and Pennsylvania.

**Mitigation strategy:**

1. **Workforce Transition Fund (10% toll allocation):** The fund is explicitly legislated
   as a non-negotiable allocation. Teamsters must be offered co-governance of fund
   expenditure — the IBT's existing apprenticeship infrastructure is the implementation
   partner for retraining programs. This converts the IBT from opponent to conditional
   supporter.

2. **Phase 1 creates, does not eliminate:** Variant D (time-window platooning corridor)
   does not remove existing lanes and does not displace existing drivers — it creates a
   parallel corridor for vehicles that are not currently on the road at those hours. Night
   platooning corridors (2 AM-6 AM) operate in windows where driver recruitment is
   already extremely difficult. Phase 1 does not put a single Teamster out of work.

3. **Human oversight in Phase 1:** Variant D requires a remote operator for each platooning
   convoy. These are new IBT-eligible roles, not replacement of existing ones.

4. **Driver shortage framing:** The 80,000-driver shortage is a Teamster recruitment problem.
   AHLP's AV freight does not compete for the same routes where Teamsters are most
   concentrated (regional and local delivery; last-mile; temperature-controlled cargo).

### State DOT and Governor Opposition

Governors of states with significant trucking industries (Ohio, Texas, Indiana, Tennessee)
may resist federal AHLP authority as federal preemption of state transportation regulation.

**Mitigation:** Option 3 (federal segments only) in Phase 1 avoids this entirely. When AHLP
is demonstrably operating on federal segments and generating toll revenue that flows to state
highway maintenance (20% allocation), states have an incentive to participate rather than
resist. Phase 2 then uses the Option 1 funding condition approach with demonstrated evidence.

### Technology Industry Support

Amazon, FedEx, UPS, Walmart, and major grocery chains have all publicly invested in AV
freight technology and have direct financial interest in AHLP corridor development. This is
an unusually powerful business constituency — national in scope, politically active, and
capable of offsetting the Teamster lobby at the state level.

---

## Implementation Analysis

### Phase 1 (Variant D, Time-Window Platooning): 18-24 months

1. DOT AHLP rulemaking: corridor designation process, RSU specifications, V2I certification
   standards. Can be initiated under existing FHWA authority; target corridor list requires
   public comment but not new legislation.
2. Pilot corridor selection: recommend I-10 (Texas-California), I-80 (Nebraska-Nevada), and
   I-70 (Colorado-Kansas) as first three Phase 1 corridors. All federal-segment segments
   available.
3. RSU installation contract: 5,000 RSU installations over 18 months on pilot corridors.
   Federal procurement; domestic manufacturing requirement.
4. Toll system integration: E-ZPass interoperability agreement for AHLP toll collection.
   Existing infrastructure; 6-month integration timeline.
5. AV operator certification: FMCSA rulemaking for platooning corridor operator requirements.
   Remote operator specifications; training curriculum.

### Phase 2 (Variant A, Dedicated Lane Conversion): 3-5 years

Requires Congressional authorization (lane conversion on state highways requires Option 1
funding conditions or Option 2 preemption). Phase 2 legislation should be introduced after
18 months of Phase 1 operational data — corridor performance, toll revenue, safety record,
and workforce transition fund outputs are the evidence base.

### Critical Path

The critical path item is not technology — it is the rulemaking timeline. FHWA rulemaking
for operational standards typically takes 18-24 months for final rule. The AHLP should file
an Advance Notice of Proposed Rulemaking in Year 1 of DED operations to begin the clock.

AV technology readiness is not the bottleneck. Aurora, Waymo Via, and Kodiak all operate
commercially today on public highways. The regulatory certainty of a designated corridor
with published V2I standards is what the industry needs to scale commercial deployment.

---

## International Precedent

| Country | Program | Scale | Notes |
|---------|---------|-------|-------|
| Netherlands | A16 Smart Highway | 38 km dedicated AV freight corridor | V2I infrastructure operational since 2022 |
| Germany | Autobahn AV Trial | Multiple corridors | Bundeswehr logistics platooning since 2021 |
| Singapore | AV freight zone (Jurong Island) | Island-wide | Commercially operational |
| Japan | Highway AV pilot (Shin-Tomei) | 150 km corridor | Ministry of Land co-investment |
| EU | Connecting Europe Facility | €50B infrastructure fund explicitly includes V2I | Cross-border harmonization in progress |

The international precedent is strong and recent. The Netherlands operational data from the
A16 corridor (2022-present) provides the best near-term reference: V2I infrastructure
costs, RSU specifications, safety performance data, and platooning logistics. DOT should
establish a formal data-sharing agreement with Rijkswaterstaat (Netherlands DOT) as part of
AHLP planning.

---

## Key Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Teamster legislative block | High | High | Workforce Transition Fund governance + Phase 1 net job creation framing |
| AV technology failure in corridor (safety incident) | Low | Very High | Air-gapped fallback design; human oversight requirement in Phase 1; AHLP corridor safety standards exceed public highway minimums |
| Cybersecurity incident on V2I network | Low-Medium | High | Air-gapped fallback (AV reverts to standard operation); CISA oversight; no safety-critical command over V2I (V2I is informational, not control) |
| State legislative opposition | Medium | Medium | Option 3 (federal segments) avoids entirely in Phase 1 |
| Toll revenue underperformance | Low | Medium | Revenue model is conservative (15% AV penetration by 2030); industry adoption is demand-driven |
| Congressional appropriation failure for RSU installation | Medium | High | Structure RSU installation as federal procurement contract (AHLP strategic contract model); does not require annual appropriation after initial contract award |

---

## Recommended Legislative Package

**Minimum legislation for Phase 1 (Variant D):**
- AHLP Act: 15-20 section standalone bill or NDAA attachment
- Key provisions: FHWA corridor designation authority; mandatory 10% toll allocation to
  Workforce Transition Fund; domestic content requirement for V2I equipment; CISA
  cybersecurity oversight; data reporting requirements for safety and performance
- DED integration: AHLP as DED strategic asset; emergency priority routing authority
  during Tier 1/2 declarations; V2I network as NEID data input

**Phase 1 can begin before legislation with:**
- DOT AHLP rulemaking (existing FHWA authority)
- Pilot corridor MOUs with 3 states (funding condition, not mandate)
- Voluntary industry platooning registration program

This allows 18-24 months of operational data before Phase 1 legislation, which substantially
improves the legislative record.
