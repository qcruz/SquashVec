# Feasibility Analysis: Civilian Reserve and Health Program

**Source:** `ded/proposal/civilian-reserve-health/overview.md`, `phase-in-schedule.md`, `solvency-model.md`
**Last Updated:** 2026-05
**Standalone Mode:** Partial — the Civilian Reserve labor function requires DED deployment
  authority; the healthcare component can operate as a standalone federal health insurance
  program for the enrolled population without the DED's scenario deployment function.

---

## Feasibility Ratings

| Dimension | Rating | Summary |
|-----------|--------|---------|
| Legal / Constitutional | **Moderate** | Civilian reserve corps creation requires explicit congressional authorization; no direct precedent for a civilian reserve with mobilization rights; healthcare benefit delivery is well within existing federal authority; the dual-mandate design (military readiness + civilian welfare) is the constitutional load-bearing structure |
| Administrative | **Moderate** | Two-agency administration (DoD for military readiness framing; DED for scenario deployment) is complex; healthcare benefit administration is DOD TRICARE infrastructure adjacent; reserve enrollment, credentialing, and benefit tracking requires new systems |
| Economic | **Strong** | Healthcare benefit is the primary recruitment incentive; health insurance value ($8,000-15,000/year) exceeds enrollment cost; solvency model demonstrates self-funding after Year 8; DoD cost offset argument is the fiscal anchor |
| Political | **Moderate** | Military-adjacent framing provides conservative cover; universal healthcare for enrolled population avoids the single-payer debate; opposition from existing military services (reserve program turf) and healthcare industry (new non-commercial insured pool) |
| Implementation | **Moderate** | Enrollment infrastructure is the critical path; healthcare network contracting requires 18-24 months; reserve deployment authority requires clear DED declaration framework; significant interagency coordination (DoD, HHS, DED) |
| International Precedent | **Moderate** | No direct international model for the combined civilian reserve + healthcare benefit structure; national service programs (Israel, Switzerland, South Korea) provide partial analogues for reserve labor; FEHB provides the healthcare administrative model |

**Overall Implementation Readiness: Conditional**
*The concept is innovative and addresses real gaps (civilian surge capacity, healthcare access
for non-traditional workers). The implementation requires the DED to exist and requires
careful interagency coordination. Recommended sequence: establish the healthcare benefit
component first (standalone, administered by OPM using FEHB infrastructure), then add the
reserve deployment function once DED is operational. The two components reinforce each other
but are separable.*

---

## Legal / Constitutional Analysis

### Civilian Reserve Creation Authority
Article I, §8 grants Congress authority to "raise and support Armies" and to "provide and
maintain a Navy," and more broadly to "make all Laws which shall be necessary and proper"
for national defense and the general welfare. The National Guard is established under
the Militia Clauses. A civilian reserve corps for non-combat economic defense functions
does not fall cleanly under any of these provisions — it requires specific statutory
creation, similar to the Peace Corps, AmeriCorps, and the Army Corps of Engineers'
civilian workforce. All three demonstrate that Congress can create civilian service corps
with defined mobilization rights.

The key legal distinction: the Civilian Reserve must be civilian, not military. Members
cannot be subject to the Uniform Code of Military Justice, cannot be deployed to combat
roles, and their service cannot be compelled in the way military reserve activation can
be compelled. The mobilization authority must be voluntary (with strong financial incentives
to respond) rather than legally mandatory.

### Healthcare Benefit Authority
Providing healthcare benefits to Civilian Reserve enrollees is straightforwardly within
federal spending authority. The Federal Employees Health Benefits (FEHB) program already
provides healthcare to a large non-military federal workforce; extending FEHB eligibility
to CRHP enrollees is an administrative expansion, not a constitutional question. HHS has
broad authority to contract with healthcare networks under existing law.

### Dual-Mandate Constitutional Anchor
The program's dual mandate — military readiness training (DoD) + civilian scenario response
(DED) — is the constitutional load-bearing structure. DoD's training and readiness mission
provides a clear Article II defense power anchor for federal spending on the program.
The DED scenario deployment function is the civilian application of the trained reserve.
This dual mandate is the strongest constitutional frame; a purely civilian program without
the DoD training component would have weaker constitutional grounding.

---

## Administrative Feasibility

### Enrollment System
The primary administrative challenge is building an enrollment system that tracks:
- Enrollee identity and eligibility (citizenship, 18+, not in military service)
- Skill certifications and training completion
- Healthcare benefit status and family coverage elections
- Deployment availability and restrictions
- Benefit payment history (stipends, training reimbursements)

This is a medium-complexity federal database build — comparable to the VA's enrollment
and benefits system. Cost estimate: $200-400M to build; $50-100M/year to maintain.
The VA's system history (delays, overruns) is the cautionary model; the CRHP enrollment
system should be procured as a cloud-native, API-first system with modular architecture
to avoid the monolith problems that plagued VA IT.

### Healthcare Network Contracting
The healthcare benefit requires contracting with a national healthcare network (or using
FEHB's existing network of plan offerings). Options:
1. **FEHB extension:** Add CRHP as an eligible FEHB enrollment category. OPM administers;
   existing plan offerings apply; minimal new contracting required. Fastest path. Disadvantage:
   FEHB premiums are higher than optimal for the CRHP population (which skews young and healthy).
2. **TRICARE extension:** Add CRHP as a TRICARE-eligible population. DoD administers;
   leverages the military healthcare network. Strong constitutional grounding (DoD authority).
   Disadvantage: TRICARE administration is already strained; adding a new civilian population
   requires capacity expansion.
3. **New CRHP Health Network:** DED contracts directly with regional health networks for
   CRHP-specific coverage. Optimal premium design but requires 18-24 months of contracting.
   The long-term preferred structure.

**Recommended:** FEHB extension for launch (fastest); transition to CRHP Health Network in
Year 3-4 once enrollment scale supports competitive contracting.

### DoD Coordination
The training function requires a DoD component. The most feasible model:
- DoD provides logistics, facilities, and safety training modules through existing
  National Guard training infrastructure (Guard facilities are distributed nationally
  and have civilian-accessible training capacity)
- DED provides the scenario-specific curriculum and deployment direction
- A formal MOU between DoD and DED defines cost-sharing, facility access, and
  coordination protocols

DoD opposition risk: the military services may view a civilian reserve that "borrows"
their training infrastructure as a competitor for appropriations. Mitigation: the CRHP
does not compete for military personnel or military appropriations; it uses excess
civilian training capacity and pays for its use through the DoD-DED MOU.

---

## Economic Analysis

### Enrollment Economics

A healthcare benefit valued at $8,000-15,000/year (market equivalent for individual
coverage) is a powerful enrollment incentive, particularly for:
- Gig workers and freelancers (no employer-sponsored insurance)
- Care economy workers (caregivers, home health aides — often uninsured)
- WDF graduates transitioning to independent work
- Self-employed individuals

At an enrollment target of 500,000 in Year 3 growing to 2M+ by Year 10:

| Year | Enrollees | Healthcare Cost/Enrollee | Total Healthcare Cost | DED + DoD Admin Cost | Total Program Cost |
|------|-----------|--------------------------|----------------------|---------------------|-------------------|
| 3 | 500,000 | $5,000 (young, healthy) | $2.5B | $500M | $3.0B |
| 5 | 1,000,000 | $5,500 | $5.5B | $800M | $6.3B |
| 8 | 2,000,000 | $6,000 | $12.0B | $1.2B | $13.2B |
| 10 | 3,000,000 | $6,500 | $19.5B | $1.5B | $21.0B |

### Revenue and Offsets

| Source | Year 5 | Year 10 |
|--------|--------|---------|
| Enrollee premium contribution (20% of cost) | $1.1B | $3.9B |
| DoD training cost reimbursement | $0.5B | $1.0B |
| Strategic contract labor cost offset (CRHP built assets at lower cost than private contractors) | $1.5-3.0B | $4.0-8.0B |
| Medicaid/CHIP cost reduction (CRHP replaces for some previously Medicaid-eligible) | $0.5B | $1.5B |
| **Total offsets** | **$3.6-5.1B** | **$10.4-14.4B** |
| **Net cost** | **$1.2-2.7B** | **$6.6-10.6B** |

The strategic contract labor cost offset is the most significant and most uncertain item.
The solvency model (`proposal/civilian-reserve-health/solvency-model.md`) shows the
program approaching self-sufficiency by Year 8 when reserve deployment generates labor
value that offsets healthcare cost. This is plausible but requires the DED's strategic
contract pipeline to be generating deployment demand — which depends on the DED existing
and being active.

### DoD Readiness Value
The DoD readiness argument is the fiscal anchor for political viability. If CRHP members
receive skills training equivalent to civilian support roles (logistics, infrastructure
construction, medical support), the DoD receives a pre-trained civilian surge workforce
at no cost to the defense budget. The value of this to readiness planners is real but
difficult to quantify in traditional budget terms. A joint DED-DoD analysis of the
readiness value is required to make this argument credible to the Armed Services Committees.

---

## Political Analysis

### The Military Adjacency Advantage
The CRHP's military training component provides political cover that purely civilian
programs lack. Framing it as a "civilian reserve" — echoing the National Guard and
Army Reserve — provides:
- Constitutional legitimacy (defense power anchor)
- Political legitimacy with conservative constituencies (military-adjacent; not welfare)
- Substantive legitimacy with DoD (reserve workforce with real training and readiness value)

This framing must be maintained consistently. Any drift toward "healthcare giveaway"
language activates opposition without activating the military-adjacent constituency.

### Healthcare Opposition
The healthcare industry (hospital systems, insurers) will analyze the CRHP healthcare
benefit as a competitor. A new federal insured population of 2-3M people that is younger
and healthier than the average insured pool will:
- Reduce the profitable "young healthy" segment available to commercial insurers
- Create a federal healthcare network that competes with commercial networks for
  high-value healthcare relationships

Mitigation: FEHB extension for launch means CRHP enrollees are using existing commercial
FEHB plans — the insurance industry is not cut out, it is a delivery partner. The shift
to a CRHP Health Network in Year 3-4 should be phased and negotiated rather than
imposed as a policy discontinuity.

---

## Implementation Timeline

| Phase | Duration | Key Milestones |
|-------|----------|----------------|
| Legislation | 18-24 months | CRHP enabling act passed; DoD-DED MOU authority created; FEHB eligibility extension |
| Infrastructure | 12-18 months | Enrollment system built; FEHB extension operational; DoD training MOU signed; first Guard training facilities designated |
| Phase 1 (pilot) | Year 2-3 | 50,000-100,000 enrollees in 5 pilot states; healthcare benefit active; first training cohorts; first deployment exercise |
| Phase 2 (national) | Year 3-5 | National enrollment open; 500k-1M enrollees; first real scenario deployment (if DED Tier 2 declared) |
| Phase 3 (scale) | Year 5-10 | 2-3M enrollees; CRHP Health Network operational; self-funding trajectory evident |

---

## Key Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| DoD refuses to share training infrastructure | Medium | High | Clear DoD cost reimbursement in MOU; CRHP doesn't compete for military billets; Guard facilities are underutilized |
| Healthcare cost exceeds solvency model | Medium | High | FEHB structure bounds cost to market rates; young/healthy risk pool reduces per-person cost; enrollment premium contribution creates cost-sharing |
| Deployment authority challenged (involuntary mobilization) | High | Medium | All deployment is voluntary with financial incentives; no compelled deployment authority is included |
| Enrollment falls short (healthcare benefit not compelling enough) | Medium | High | $8-15k healthcare benefit is strong incentive for uninsured gig workers; marketing must target this population specifically |
| Program scope creep (becomes a general healthcare program without reserve function) | Medium | Medium | Statutory definition of reserve function; deployment exercise requirement for continued benefit eligibility |
