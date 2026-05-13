# CRHP Solvency Model

**Last Updated:** 2026-05
**Status:** Preliminary estimates pending actuarial review
**Companion:** [overview.md](overview.md) | [phase-in-schedule.md](phase-in-schedule.md)

---

## Model Purpose

This document projects the financial sustainability of the Civilian Reserve Health Program
across each phase of expansion. The central question: at what enrollment levels and fee
structures does the program cover its costs — and at what pace can each phase safely expand
to the next?

All figures are 2026 USD unless noted. Healthcare cost projections assume 4% annual medical
inflation. See assumptions section for full parameters.

---

## Baseline Data

### TRICARE System Reference Costs (2025)

| Beneficiary Category | Annual Per-Capita Cost | Source |
|---------------------|----------------------|--------|
| Active duty member | $16,200 | DoD Comptroller FY2025 |
| Active duty family member | $9,800 | DoD Comptroller FY2025 |
| TRICARE Prime retiree | $11,400 | DoD Comptroller FY2025 |
| TRICARE Select (civilian network) | $8,600 | DoD Comptroller FY2025 |
| TRICARE administrative overhead | ~3.5% of claims | DHA annual report |

**Key insight:** Active-duty members are expensive because they are frequently deployed,
trained in hazardous environments, and receive comprehensive care including dental. CRHP
enrollees will look more like the Select civilian-network population — lower intensity,
primary-care-driven. The $8,600 TRICARE Select figure is the appropriate reference for
CRHP cost modeling, before adjusting for the younger age distribution in Phase 1.

---

### U.S. Healthcare Utilization by Age Cohort (2024)

| Age Group | Average Annual Healthcare Cost | % with Chronic Condition | Primary Cost Driver |
|-----------|-------------------------------|-------------------------|---------------------|
| 18–25 | $2,800 | 17% | Injuries, reproductive health, mental health |
| 26–34 | $4,100 | 24% | Childbirth, early chronic conditions, mental health |
| 35–44 | $6,200 | 38% | Chronic disease management, cancer screening |
| 45–54 | $9,100 | 52% | Cardiovascular, diabetes, musculoskeletal |
| 55–64 | $13,400 | 68% | Multi-morbidity, oncology, surgical |

*Source: MEPS (Medical Expenditure Panel Survey) 2023; KFF analysis; CMS actuarial tables.*

**TRICARE efficiency discount:** Military healthcare infrastructure and negotiated rates
reduce per-capita costs ~15–20% below commercial equivalents. Applied throughout this model.

---

## Phase 1 Solvency Model (Ages 18–34)

### Revenue Inputs

**Enrollment fee revenue:**
- Age 18–25: $480/year × projected enrollees
- Age 26–34: $720/year × projected enrollees
- Income-scaled reductions reduce effective average fee by ~18% (based on income distribution
  in this age cohort; ~30% of 18-34 year-olds earn below 200% FPL)

**Training day compensation offset:**
Training compensation is a cost, not revenue. It is included in the cost model below.
However, the training obligation *selects for healthier enrollees* (those with significant
disabilities opt out or receive accommodation), reducing average utilization costs by an
estimated 8–12%.

**Federal subsidy (general fund contribution):**
The program requires a federal subsidy in the early years before the enrollment pool is large
enough to achieve actuarial balance. This is treated as an investment in reserve capacity,
justified by the DED mobilization value of the trained reserve force.

---

### Cost Inputs

**Healthcare claims cost:**
Using MEPS utilization data adjusted for TRICARE efficiency discount (18% reduction):

| Age Group | Commercial Cost | TRICARE-Adjusted Cost |
|-----------|----------------|----------------------|
| 18–25 | $2,800 | $2,296 |
| 26–34 | $4,100 | $3,362 |
| Blended (50/50) | $3,450 | $2,829 |

**Training compensation cost:**
- 13 training days/year × E-1 pay ($150/day) = $1,950/enrollee/year
- This is an out-of-pocket cost that is *also* a program benefit (reserve capacity built)
- For solvency purposes, counted as cost; for DED purposes, counted as investment

**Program administration:**
- Enrollment processing, provider network management, claims processing
- Estimated at 4.5% of claims (slightly above TRICARE baseline to account for new system setup)
- Decreases to 3.5% at full scale (economies of administration)

**MTF and network capacity expansion:**
- One-time capital costs for MTF expansion + civilian network contracting
- Amortized over 10 years for solvency model
- Estimated $2B upfront for Phase 1 network expansion

---

### Phase 1 Enrollment Scenarios

#### Conservative Scenario (10M enrollees by Year 3)

| Year | Enrollees | Fee Revenue | Claims Cost | Training Cost | Admin | Net (w/ subsidy) |
|------|-----------|-------------|------------|---------------|-------|-----------------|
| 1 | 2M | $1.2B | $5.7B | $3.9B | $430M | -$8.8B |
| 2 | 5M | $2.9B | $14.1B | $9.8B | $1.1B | -$22.1B |
| 3 | 10M | $5.8B | $28.3B | $19.5B | $2.1B | -$44.1B |

*At conservative enrollment, the federal subsidy is ~$44B/year by Year 3. This is the cost
of covering 10M people, reduced by the enrollment fee contribution.*

**Context:** Federal subsidy per enrollee at 10M enrollment = ~$4,410/person/year. Compare
to: Medicaid average federal contribution = ~$8,500/person/year; ACA premium subsidies
average = ~$6,200/person/year. CRHP is already more cost-efficient than existing coverage
expansion mechanisms, even at conservative enrollment.

---

#### Base Scenario (20M enrollees by Year 3)

| Year | Enrollees | Fee Revenue | Claims Cost | Training Cost | Admin | Net (w/ subsidy) |
|------|-----------|-------------|------------|---------------|-------|-----------------|
| 1 | 3M | $1.8B | $8.5B | $5.9B | $650M | -$13.2B |
| 2 | 10M | $5.8B | $28.3B | $19.5B | $2.1B | -$44.1B |
| 3 | 20M | $11.5B | $56.6B | $39.0B | $4.2B | -$88.3B |

**Context:** At 20M enrollees, the program covers 10M previously uninsured Americans and
10M who previously paid market-rate premiums. For the previously uninsured, the program
delivers ~$2,300 in net healthcare value minus their $600 fee = ~$1,700 in net benefit.
For previously insured, the premium savings ($5,400–$7,200/year vs. ACA) fund the small
federal subsidy contribution, effectively making the program self-funding via commercial
premium substitution if economic modeling is done at the system level.

---

#### Optimistic Scenario (35M enrollees by Year 3)

| Year | Enrollees | Fee Revenue | Claims Cost | Training Cost | Admin | Net |
|------|-----------|-------------|------------|---------------|-------|-----|
| 1 | 5M | $3.0B | $14.2B | $9.8B | $1.1B | -$22.1B |
| 2 | 18M | $10.4B | $50.9B | $35.1B | $3.8B | -$79.4B |
| 3 | 35M | $20.2B | $99.0B | $68.3B | $7.4B | -$154.5B |

**Why optimistic scenario is likely:** The value proposition for an uninsured 28-year-old
paying $600/year for full healthcare coverage vs. $0/year and self-insuring is overwhelming.
Predicted enrollment by the uninsured population alone (~7M in this age bracket) could reach
3–4M in Year 1. The previously-insured population adds significantly if ACA marketplace
alternatives are compared.

---

### The Cross-Subsidy Structure

Even at Phase 1, the young healthy pool creates a cross-subsidy that holds cost per enrollee
well below the system average:

**Average CRHP cost per enrollee (Phase 1 blended):**
- Claims: $2,829
- Training: $1,950
- Admin: $130
- **Total cost per enrollee: $4,909/year**
- **Fee revenue per enrollee (average after income scaling): $540/year**
- **Federal subsidy per enrollee: $4,369/year**

This is the subsidy that must be funded. At 20M enrollees, the total annual federal cost
is ~$87B. This sounds large until compared to:

| Comparison | Annual Federal Cost |
|-----------|---------------------|
| CRHP Phase 1 (20M enrollees) | ~$87B |
| Medicare (65M beneficiaries) | ~$1,000B |
| Medicaid (85M beneficiaries) | ~$620B |
| ACA premium/cost-sharing subsidies | ~$100B |
| One year of COVID healthcare response | ~$600B |
| VA healthcare system | ~$120B |

CRHP Phase 1 at $87B serves 20M people at below-Medicare per-capita cost, while simultaneously
building a trained reserve force and generating DED scenario response capacity valued separately.

---

## Phase 2 Solvency Model (Ages 35–49 Added)

### Actuarial Challenge

Adding the 35–49 cohort (est. 62M eligible, target 15–25M additional enrollees) brings
significantly higher utilization:

| Age Group | TRICARE-Adjusted Annual Cost | Phase 2 Fee |
|-----------|------------------------------|-------------|
| 35–44 | $5,084 | $1,080/year |
| 45–49 | $7,462 | $1,080/year |

At the Phase 2 fee of $1,080/year, the fee covers only 14–21% of healthcare cost for this age
group. The Phase 1 pool cross-subsidy covers the remainder.

### Cross-Subsidy Math at Phase 2 Trigger (30M Phase 1 enrollees + 15M Phase 2)

| Population | Enrollees | Revenue | Claims | Training | Net |
|-----------|-----------|---------|--------|----------|-----|
| Phase 1 (18–34) | 30M | $17.3B | $84.9B | $58.5B | -$126.1B |
| Phase 2 (35–49) | 15M | $16.2B | $93.7B | $29.3B | -$106.8B |
| **Combined** | **45M** | **$33.5B** | **$178.6B** | **$87.8B** | **-$232.9B** |

Federal subsidy at 45M enrollees combined: **~$287B/year**

**Context:** This is approaching Medicare cost territory — but covering a much younger,
healthier population and building reserve capacity simultaneously. The subsidy per enrollee
($6,378) is below Medicare per-capita ($15,400) because of the age distribution.

**The solvency question:** Is $287B/year sustainable? For context, the ACA at full enrollment
costs the federal government ~$100B/year in direct subsidies for ~15M marketplace enrollees.
CRHP covers 45M at $287B — the per-capita federal cost is comparable, and the population
covered is much larger. The case rests on whether the nation values covering 45M people at
~$6,400/head federal cost, with the training reserve as additional value.

---

## Phase 3 Solvency Model (Ages 50–64 Added)

### The Hard Phase

The 50–64 cohort is the most expensive non-Medicare population. With reduced training
obligation (5 days/year) and fee of $1,560/year:

| Age | TRICARE-Adjusted Cost | Fee | Coverage Ratio |
|-----|----------------------|-----|----------------|
| 50–54 | $8,200 | $1,560 | 19% |
| 55–64 | $10,990 | $1,560 | 14% |

The Phase 3 cross-subsidy requirement is the largest per-enrollee gap in the program. This phase
should only trigger when:

1. Phases 1 and 2 have demonstrated stable enrollment (40M+ combined)
2. The healthcare system efficiency gains from preventive care emphasis in Phases 1–2 have
   begun reducing downstream costs (estimated 5–8% cost reduction in 50–64 cohort who
   have been CRHP members since Phase 1)
3. An alternative funding mechanism supplements the enrollment fee — options include:
   - Employer contribution for employees enrolled in CRHP instead of employer-sponsored insurance
   - Medicare pre-buy option: 50–64 year-olds can pay a Medicare Part A+B equivalent premium
     to "pre-enroll" in Medicare early at their own cost, freeing CRHP budget
   - Dedicated CRHP trust fund from value-discovery revenues (DED IP licensing, platform fees)

---

## Long-Run Trajectory: Full Solvency Path

The program approaches full solvency as:

1. **Enrollment volume reaches actuarial scale** — at 60M+ total enrollees, the risk pool
   is large enough to be statistically stable and administrative costs per enrollee fall below 3%

2. **Preventive care compound effect** — members who have had continuous coverage since age 18
   reach their 40s and 50s with lower chronic disease burden. The Milken Institute estimates
   continuous preventive care reduces per-capita healthcare costs 15–22% by age 50 compared
   to the uninsured/underinsured baseline.

3. **Reserve mobilization value offsets subsidy** — a trained reserve of 30M+ civilians has
   military readiness value. DoD currently spends ~$22,000/year maintaining a National Guard
   member's readiness. CRHP generates comparable readiness value in non-combat domains at a
   fraction of the cost when the training compensation is viewed as reserve maintenance.

4. **System-wide cost reduction** — the single largest driver of healthcare inefficiency is
   uncompensated care (ER use as primary care) and delayed treatment of preventable conditions.
   CRHP eliminates uncompensated care for 20–60M people. Hospitals and the federal government
   currently absorb ~$45B/year in uncompensated care costs. Eliminating a significant fraction
   of this is a net saving to the healthcare system that partially offsets the CRHP subsidy.

### 20-Year Projection (Base Scenario)

| Year | Enrollees | Federal Subsidy | Subsidy/Enrollee | Uncompensated Care Offset | Net Federal Cost |
|------|-----------|----------------|-----------------|--------------------------|-----------------|
| 5 | 20M | $87B | $4,350 | $8B | $79B |
| 10 | 40M | $232B | $5,800 | $18B | $214B |
| 15 | 60M | $380B | $6,333 | $28B | $352B |
| 20 | 75M | $445B | $5,933 | $38B | $407B |

**Full-program cost at Year 20 ($407B/year) vs. current system cost of doing nothing:**
The U.S. currently spends ~$4.9T/year on healthcare. The uninsured and underinsured generate
an estimated $300–500B/year in excess system costs (uncompensated care, delayed treatment,
preventable hospitalizations, ER primary care). CRHP Year 20 at $407B net federal cost is
comparable to the excess cost already embedded in the system — but delivers universal coverage
and a trained national reserve force.

---

## Solvency Triggers and Kill Switches

The phased expansion is conditional on quantified solvency metrics. The following triggers
govern advancement and — if needed — program contraction:

### Phase Advancement Triggers (must meet ALL)
- Program has been actuarially solvent (federal subsidy ≤ projected model) for 3 consecutive years
- Enrollment ≥ minimum threshold for the phase (10M Phase 1; 25M combined for Phase 2; 45M combined for Phase 3)
- Independent actuarial review certifies the next phase fee structure is viable
- DoD MTF/network capacity confirmed adequate for additional volume
- Emergency reserve fund ≥ 6 months of projected claims costs

### Phase Contraction Triggers (any one sufficient)
- Actual claims cost exceeds projected by >15% for 2 consecutive years
- Enrollment falls below 80% of minimum threshold
- Emergency reserve fund falls below 3 months of claims

**Contraction mechanism:** New enrollment to the affected phase is paused; existing enrollees
maintain coverage with no disruption; fee structure for the affected phase is recalibrated;
re-advancement trigger requires 2 years of stability at adjusted parameters.

---

## Assumptions and Confidence Levels

| Assumption | Value | Confidence | Sensitivity |
|-----------|-------|------------|------------|
| Phase 1 TRICARE-adjusted cost (blended) | $2,829/year | Medium | ±20% |
| Phase 1 enrollment (base, Year 3) | 20M | Low-Medium | Highly dependent on outreach and ACA comparison |
| TRICARE efficiency discount vs. commercial | 18% | Medium-High | Historical TRICARE data |
| Training obligation health selection effect | 8–12% cost reduction | Low | No direct data; inference from fitness requirement analog |
| Uncompensated care offset | $8B at 20M enrollees | Low-Medium | Based on hospital uncompensated care share analysis |
| Phase 2 trigger timeline | Year 8–12 | Low | Depends on Phase 1 enrollment trajectory |
| Preventive care compound effect | 15–22% cost reduction by age 50 | Medium | Milken Institute; RAND preventive care ROI studies |

**Most sensitive assumption:** Phase 1 enrollment. The program's economics improve dramatically
with scale. If enrollment reaches 30M rather than 20M by Year 3, the per-enrollee administrative
cost falls significantly and the reserve capacity value per federal dollar spent increases.
Enrollment marketing, ACA comparison communications, and employer/university outreach programs
are the highest-leverage variables.
