# DED Program Proposal: Universal Basic Income via Negative Income Tax

**Document Type:** Structural Economic Policy Program
**Last Updated:** 2026-05
**Category:** Long-Run Structural / Labor Market Floor
**DED Priority:** High — directly addresses AI unemployment scenario Phase 3 normalization;
  provides the permanent income floor that all Phase 1/2 emergency instruments are temporary
  versions of
**Related Scenarios:** AI Unemployment (primary), Financial Fragmentation, Pandemic, Drought
**Related Tools:** [outcome-linked-bonds.md](../tools/outcome-linked-bonds.md) |
  [strategic-contracts.md](../tools/strategic-contracts.md) |
  [internship-floor.md](../tools/internship-floor.md)
**Related Proposals:** [workforce-development-floor.md](workforce-development-floor.md)

---

## 1. Core Concept

### The Design

A **Negative Income Tax (NIT)** is a universal income support system in which:

- Every adult citizen files a tax return
- Citizens with income **above** a threshold pay taxes (positive tax rate — current system)
- Citizens with income **below** a threshold receive a payment from the government (negative
  tax — the UBI component)
- The payment phases out as income rises — at a defined phase-out rate — until the
  crossover point where the household owes net taxes

The **Negative Income Tax Rate** defines how fast the benefit phases out. At a 50% NIT phase-out
rate and a $15,000 guarantee:
- $0 income → receive $15,000 (full guarantee)
- $10,000 income → receive $10,000 (guarantee minus 50% of earnings)
- $20,000 income → receive $5,000 (guarantee minus 50% of earnings)
- $30,000 income → receive $0 (crossover; no payment, no tax owed on this income)
- $50,000 income → owe normal taxes on $20,000 above crossover

The critical property: **the recipient always benefits from earning more.** Unlike means-tested
programs with benefit cliffs, the NIT creates continuous work incentives across the income
distribution.

### The TRAL Integration

The existing DED **Tax Return Advance Loan (TRAL)** instrument provides liquidity against
expected tax refunds. The NIT extends this mechanism:

**Standard TRAL:** A loan against an expected refund — repaid when the refund is processed.
**NIT-backed TRAL guarantee:** The government guarantees a minimum annual NIT payment — this
guarantee becomes **collateral for a private-sector advance loan** that delivers the NIT
payment in real time rather than as an annual lump sum.

**How it works:**
1. IRS calculates each citizen's annual NIT entitlement based on prior year income and
   demographic data (updated quarterly for income changes)
2. DED-guaranteed TRAL loans against the NIT entitlement are offered through participating
   banks and credit unions — not government disbursement
3. Citizen receives monthly advances (1/12 of annual NIT entitlement) from a private lender
4. Annual tax filing reconciles actual income vs. projected income; loan is repaid from the
   confirmed NIT payment
5. DED guarantee backstops the loan if actual NIT entitlement falls short of projected (income
   was higher than expected, reducing NIT) — covering the shortfall up to a defined cap

**Why use TRAL rather than direct government payment:**
- Keeps disbursement infrastructure private — no new government payment bureaucracy
- Creates a market in NIT-backed consumer credit (lenders compete to offer lowest rates)
- Allows real-time income adjustments (quarterly income reporting updates advance amount)
- Government guarantee is contingent liability, not direct expenditure — the same structural
  advantage as all DED guarantee instruments

---

## 2. Historical Precedents

### Milton Friedman's Negative Income Tax (1962)
Friedman proposed the NIT in *Capitalism and Freedom* as a replacement for the existing
welfare system — simpler, less paternalistic, with better work incentives. His proposal:
guarantee level of $6,000/household (2025 equivalent ~$58,000), 50% phase-out rate.

**Key insight Friedman identified:** The existing welfare system creates poverty traps because
benefits are withdrawn dollar-for-dollar as income rises, producing effective marginal tax
rates of 80–100%+ for low-income households. The NIT eliminates this by design.

### Nixon's Family Assistance Plan (1969)
Nixon proposed a federal guaranteed income of $1,600/year for a family of four ($12,800 in
2025 dollars). Passed the House 243–155. Failed in the Senate — opposed from both left
(too low) and right (too unconditional). The closest the U.S. came to enacting a federal
guaranteed income.

### The Earned Income Tax Credit (EITC) — Partial NIT Implementation
The EITC is a partial NIT — it provides a refundable tax credit (negative tax) to low-income
workers, phases out as income rises, and is delivered via the tax return system:
- 2025: ~$7,430 maximum credit for a family with 3+ children
- ~23 million households receive EITC; total payout ~$70B/year
- Poverty rate impact: estimated 5.5 million people lifted above poverty annually

The EITC is the proof of concept that the NIT mechanism works at scale through the tax system.
The NIT proposal extends EITC logic to universal coverage (including non-workers) and eliminates
the EITC's work requirement that excludes the unemployed.

### Stockton SEED, Finland UBI, Kenya GiveDirectly
| Program | Scale | Finding |
|---------|-------|---------|
| Stockton SEED (2019–21) | 125 households, $500/month | Employment increased; mental health improved; no reduction in labor force participation |
| Finland UBI trial (2017–18) | 2,000 unemployed adults, €560/month | Well-being increased significantly; modest employment gains; administrative costs lower than existing system |
| Kenya GiveDirectly (ongoing) | 5,000+ households, ~$22/month | Long-run economic activity increases; no consumption substitution to alcohol/tobacco; productive investment rises |
| Alaska Permanent Fund Dividend | All AK residents, ~$1,000–2,000/year | No negative employment effects; poverty reduction; widely popular across political spectrum |

**Consistent finding across all trials:** Small to moderate basic income does not reduce labor
supply among working-age adults. Work incentive concerns are largely a theoretical artifact
not supported by empirical evidence at these benefit levels.

---

## 3. Program Design

### 3A. The Guarantee Level

**Proposed structure: tiered by household size, set at 40% of federal poverty line**

| Household Size | Annual NIT Guarantee | Monthly Advance (TRAL) |
|----------------|---------------------|------------------------|
| Individual | $6,200 | $517 |
| 2-person | $8,400 | $700 |
| 3-person | $10,600 | $883 |
| 4-person | $12,800 | $1,067 |

Rationale for 40% of poverty line:
- Not a full income replacement — the guarantee supplements, not substitutes, labor income
- Avoids the labor supply concern by keeping the guarantee below subsistence level (must
  combine with work or other income to reach a comfortable living standard)
- Fiscally manageable at rollout; indexable to CPI thereafter
- The EITC already provides up to $7,430 for working families — the NIT closes the gap
  for non-workers and the working poor whose total income is below the NIT crossover

**Phase-out rate: 30%**
Lower than Friedman's proposed 50% — preserves stronger work incentives; extends the crossover
point further up the income distribution, ensuring the benefit reaches further into the
lower-middle class:

| Income | NIT payment (30% phase-out, $6,200 individual) |
|--------|------------------------------------------------|
| $0 | $6,200 |
| $5,000 | $4,700 |
| $10,000 | $3,200 |
| $15,000 | $1,700 |
| $20,667 | $0 (crossover) |
| $30,000 | Positive taxes on $9,333 above crossover |

### 3B. The TRAL Guarantee Mechanism

**Advance Loan Structure:**
- Participating lenders (banks, credit unions, fintech) offer NIT advance accounts
- Monthly advance = (projected annual NIT / 12), calculated from IRS quarterly income estimate
- Interest rate cap: SOFR + 0.5% — near-zero because the underlying entitlement is
  government-guaranteed
- DED guarantee covers shortfall if actual NIT entitlement is 0–15% below projected
- Shortfalls > 15% (significant income increase) are repaid from the annual reconciliation
  refund at 0% interest

**Annual Reconciliation:**
- Tax filing confirms actual income; actual NIT entitlement is calculated
- If actual NIT > advances received: refund issued (same as current over-withholding refund)
- If actual NIT < advances received: balance owed, repaid from next year's NIT or at 0%
  over 24 months — no penalty for good-faith income estimation errors

**DED Guarantee Reserve:**
- DED maintains a $20–30B guarantee reserve for NIT-TRAL shortfalls
- Expected annual guarantee activations: ~3–5% of total advance volume
- Self-replenishing: guarantee is a loan, not a grant — repaid with 0% interest at
  annual reconciliation; reserve exposure is a float, not a permanent liability

### 3C. Integration with Existing Programs

**Preserve EITC:** The NIT is additive to EITC for working households below the crossover.
A worker with $20,000 income receives both the NIT payment and the EITC — the NIT does not
displace the existing work incentive structure.

**Replace means-tested programs over time:**
The NIT is designed to replace, over a 10-year transition, the patchwork of means-tested
programs that have high administrative overhead, create benefit cliffs, and stigmatize recipients:
- SNAP (food stamps): ~$100B/year → absorbed into NIT guarantee
- TANF (cash assistance): ~$16B/year → absorbed
- Housing voucher programs: ~$30B/year → partially absorbed (NIT guarantee includes housing
  component; transition managed to avoid housing market disruption)

**Preserve distinct programs:**
- Medicaid / ACA: Healthcare is a discrete category; not absorbed into NIT
- Social Security: Retirement program; maintained separately; NIT is working-age guarantee
- Medicare: Same as Medicaid reasoning

### 3D. Fiscal Math

**Gross cost:**
- U.S. adult population: ~260 million
- Average household size: 2.5; ~104 million households
- Average NIT guarantee (weighted by household size): ~$9,000
- Gross annual NIT cost if every household receives full guarantee: ~$940B
- But: NIT phases out as income rises; most households above crossover receive $0

**Net cost after phase-out:**
- ~40 million households below the crossover point (bottom ~38% of income distribution)
- Average payment across the bottom quintile: ~$7,200/year
- Total NIT outlay: ~$288B/year

**Offset from replaced programs:**
- SNAP replacement: -$100B
- TANF replacement: -$16B
- Other means-tested cash/food programs: -$20B
- Administrative savings (elimination of multiple means-test bureaucracies): -$15B
- **Net new cost: ~$137B/year**

**Revenue offset via ATC:**
The AI Transition Contribution (18% excise on documented labor cost savings from AI automation)
generates $70–110B/year at full deployment. The NIT is the natural Phase 3 destination for
ATC revenue: as AI automation reduces labor demand, the ATC captures a share of productivity
gains and recirculates them as the NIT guarantee — automating the distributional mechanism
without requiring congressional appropriation each year.

**ATC → NIT statutory allocation:** 60% of ATC revenue dedicated to NIT guarantee fund;
40% to workforce transition programs (TAP, CETC, AWSI). At $80B/year ATC revenue:
- $48B → NIT guarantee fund
- $32B → workforce programs
- Remaining $89B → annual appropriation (net new federal cost)

---

## 4. DED Scenario Linkage

### AI Unemployment (Primary)

The NIT is the Phase 3 normalization instrument for AI unemployment — the permanent,
self-calibrating income floor that replaces the temporary emergency programs deployed in
Phase 1 (extended UI, ATC emergency disbursements) and Phase 2 (AWSI, CETC, TAP).

**As automation displacement rises:**
- ATC revenue rises (more labor cost savings = higher ATC base)
- ATC → NIT allocation increases automatically
- NIT guarantee adjusts to keep pace with displacement scale
- The system self-funds the distributional response to the productivity gains it taxes

**The Phase 3 transition:**
- AI Unemployment Phase 1: Emergency stabilization (ATC-funded emergency UI, stimulus, CRHP)
- AI Unemployment Phase 2: Structural transition (CETC, TAP, AWSI, co-bot manufacturing)
- AI Unemployment Phase 3 (normalization): NIT as permanent floor; ATC as permanent revenue
  source; workforce programs wind down as labor market stabilizes at new equilibrium

### Pandemic

During a pandemic-induced economic shutdown, the NIT provides immediate income support without
requiring new legislation, new eligibility determinations, or new disbursement infrastructure:
- The TRAL advance mechanism is already in place
- Citizens file income reporting; NIT adjusts automatically as income falls
- Phase 1 pandemic response supplements NIT with TRAL emergency draws; Phase 2 NIT
  absorbs the support function as the emergency UI waivers expire

### Financial Fragmentation

A financial system disruption that crashes employment and income simultaneously triggers
automatic NIT stabilization — the government support scales up as private income falls,
without requiring emergency appropriation:
- NIT functions as an automatic fiscal stabilizer at a scale larger than current UI
- The TRAL-private-lender structure keeps the disbursement system functional even during
  banking system stress (because the guarantee is backed by IRS entitlement, not bank
  balance sheets)

### Drought / Food Shortage

When agricultural income collapses in drought conditions, farm households in affected regions
automatically receive NIT support — the inverse crop yield bond mechanism (outcome-linked bonds)
and the NIT work together: the bond pays out to farmers as a hedging instrument; the NIT
catches farmworkers and agricultural supply chain workers whose income has fallen.

---

## 5. Political Economy and Design Constraints

### The Work Incentive Problem

Critics of UBI argue it reduces labor supply. The NIT design specifically addresses this:
- Phase-out rate of 30% means that every dollar earned increases net income by $0.70
- No benefit cliff — no point at which earning more causes an income drop
- Empirical evidence from all trials: minimal labor supply reduction at these guarantee levels
- For context: EITC phase-out range (where an additional dollar of income reduces the credit)
  has a higher effective marginal tax rate than the proposed NIT

### The Cost Problem

The $137B net new annual cost is the most significant political obstacle. The ATC funding
mechanism is designed to address this: the NIT is not funded from general revenue but from
a tax specifically on the productivity gains that generate the displacement the NIT addresses.
This is the same political economy logic as:
- Social Security (funded by payroll tax on the wages it replaces in retirement)
- Highway Trust Fund (funded by gas tax on the vehicle miles that wear the roads)

### The Paternalism Problem

Means-tested programs often condition benefits on specific consumption (SNAP for food only)
or behavior (TANF work requirements). The NIT provides unconditional cash — recipients spend
it as they judge best. This is a feature, not a bug: empirical evidence shows unrestricted
cash produces better outcomes than restricted benefits, and the administrative costs of
enforcement are high. Every DED trial and historical precedent confirms this.

### The Stigma and Enrollment Problem

Current means-tested programs suffer from enrollment rates of 70–80% — 20–30% of eligible
households don't receive benefits they're entitled to due to stigma, paperwork complexity,
or lack of information. The NIT is delivered through the universal tax filing system:
enrollment is automatic for anyone who files a tax return. No application, no caseworker, no
stigma — the same neutrality as a tax refund.

---

## 6. Implementation Roadmap

### Phase 1: EITC Extension (Years 1–3)
- Extend EITC to cover non-workers (remove work requirement for childless adults and individuals)
- Expand EITC phase-out range to $20,000 crossover
- Cost: ~$25–35B/year
- Establishes the legal and administrative framework for universal refundable tax credit

### Phase 2: TRAL Guarantee Launch (Years 2–4)
- Establish NIT-TRAL advance loan program via participating lenders
- DED guarantee reserve funded at $20B
- Monthly advance accounts available to all households below projected crossover
- IRS quarterly income reporting system modernized to support real-time adjustment

### Phase 3: Full NIT Implementation (Years 4–8)
- Full NIT at proposed guarantee levels; SNAP/TANF absorption
- ATC → NIT statutory allocation locked in
- Annual reconciliation system operational
- Administrative savings from replaced program bureaucracies realized

### Phase 4: Normalization (Year 8+)
- NIT is the income floor; workforce programs (TAP, CETC) continue but as voluntary
  upskilling programs, not emergency responses
- ATC revenue self-adjusts the NIT guarantee to automation displacement pace
- No further legislation required absent major structural change

---

## 7. Cost Summary

| Component | Annual Cost | Notes |
|-----------|------------|-------|
| NIT gross payouts (net of phase-out) | ~$288B/year | ~40M households; avg $7,200 |
| Replaced program savings | -$136B/year | SNAP, TANF, other means-tested |
| Administrative savings | -$15B/year | Program consolidation |
| **Net new federal cost** | **~$137B/year** | |
| ATC revenue offset (60% of $80B) | -$48B/year | At full ATC deployment |
| **Net after ATC** | **~$89B/year** | ~0.3% of GDP |
| DED TRAL guarantee reserve | $20–30B (one-time) | Revolving; expected annual activation ~$3–5B |

**For context:** The U.S. currently spends ~$1.1 trillion/year on Social Security and ~$800B
on Medicare/Medicaid. A $89B net annual addition that provides a universal income floor,
eliminates poverty traps, replaces the administrative overhead of a fragmented welfare system,
and automatically scales with AI-driven displacement is one of the highest-ROI domestic
policy programs available.

---

## Cross-References

- `ded/scenarios/ai-unemployment/phase-3-normalization.md` — NIT as primary Phase 3 instrument
- `ded/scenarios/ai-unemployment/phase-1-triage-and-stabilization.md` — TRAL as emergency
  instrument; ATC as revenue source
- `ded/tools/outcome-linked-bonds.md` — TRAL mechanism; contingent government guarantee structure
- `ded/proposal/workforce-development-floor.md` — companion supply-side labor market program
- `ded/economics/historical-instruments.md` — EITC as partial NIT precedent; Alaska PFD
