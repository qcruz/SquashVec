# DED Tool Analysis: Tax Return Advance Loans (Semi-Annual)

**Category:** Direct Transfers
**Last Updated:** 2026-05
**Related Tool:** [stimulus-checks.md](stimulus-checks.md)
**Relevant Scenarios:** Pandemic, AI Unemployment, Oil Restriction, Drought, Financial Fragmentation
**DED Tool Rating:** Tier A — Novel variant; limited direct precedent but strong mechanistic basis
and close analog data available

---

## Concept Summary

A federal Tax Return Advance Loan (TRAL) program offers eligible taxpayers interest-free
advances against their anticipated annual tax refund, disbursed on a semi-annual cycle —
once in January (against the current tax year) and once in July (against the following
year). The advance is repaid automatically via offset of the taxpayer's future refund.

This is structurally distinct from a traditional stimulus check in three ways:

1. **It is a loan, not a grant** — politically, this is far easier to authorize; it does not
   "cost" the government in the same way; skeptics who oppose direct payments are more
   receptive when the frame is "advance access to money you're already owed"

2. **It is semi-annual, not one-time** — the predictable twice-yearly cadence creates a
   structural income smoothing effect, not just a crisis response spike

3. **It displaces a predatory private market** — tax refund anticipation loans (RALs) are
   currently offered by H&R Block, Jackson Hewitt, and other preparers at effective APRs
   of 35–400%. A federal 0% TRAL eliminates this exploitation of lower-income filers

**The DED application:** The program runs continuously in peacetime as income infrastructure.
In crisis, the disbursement schedule is accelerated, the advance percentage is increased,
and the repayment terms are softened — converting a structural income tool into a rapid
crisis deployment mechanism without requiring new legislation.

---

## 1. Mechanism

### Baseline Operation

**Eligibility:** All taxpayers with a W-2 or 1099 on file with the IRS who had a net refund
in the prior tax year or are projected to receive a refund in the current year based on
real-time withholding data.

**Advance calculation:**
```
TRAL Advance Amount = min(
    Prior Year Refund × Advance Rate,
    Projected Current Year Refund × Advance Rate,
    Maximum Cap
)
```

Where Advance Rate = 50% in steady state (adjustable to 75% in crisis); Maximum Cap = $2,500
per cycle in steady state (adjustable to $5,000 in crisis).

**Repayment:** Automatically deducted from the taxpayer's actual refund when the return is
filed. If the actual refund is less than the advance (e.g., due to a life event reducing
withholding), the balance becomes a 0% installment obligation repaid over 24 months via
payroll withholding adjustment — not a debt collection event.

**Cycle schedule:**
- **January cycle:** Based on prior year refund data (available) and current year W-2 data
  submitted by January 31. Disbursed February 1–15.
- **July cycle:** Based on year-to-date withholding data projected to year-end. Disbursed
  July 15–31.

**No application required in steady state:** Eligible taxpayers receive an opt-out notice;
funds are deposited to the account on file with the IRS (same infrastructure as existing
refund direct deposit). Unbanked recipients receive prepaid debit card via USPS.

---

### Crisis Mode Adjustments (Triggered by DED Declaration)

| Parameter | Steady State | Crisis Level 1 | Crisis Level 2 |
|-----------|-------------|---------------|---------------|
| Advance rate | 50% of expected refund | 75% | 100% |
| Maximum cap per cycle | $2,500 | $3,500 | $5,000 |
| Cycle frequency | Semi-annual | Quarterly | Monthly |
| Repayment obligation | Full (via refund offset) | 50% forgiven | 100% forgiven (converts to grant) |
| Minimum payment floor | Prior year refund-based | $500 minimum regardless of prior refund | $1,000 minimum |
| Eligibility expansion | Refund filers only | + zero-balance filers | + all tax-registered households |

**Crisis Level 2 converts the loan to a grant.** At that point it is functionally identical
to a traditional stimulus check, but pre-authorization exists, infrastructure is already
running, and recipient records are current — enabling same-week disbursement rather than
the 2–4 weeks required for a new emergency program.

---

## 2. Deployment Levels

### Steady-State (Structural Program)
**Scale:** ~100M eligible households; ~$150B disbursed per cycle at 50% advance rate on
$3,000 average refund → ~$300B/year in circulation, self-funding via refund offset.

**Net fiscal cost:** Near-zero in steady state. The government is advancing money it will
owe within 3–12 months anyway. The cost is:
- **Float cost:** Treasury borrows at current T-bill rate for the period between advance and
  repayment. At 4% annual rate, 6-month float on $150B = ~$3B/year. This is the price of
  running the program.
- **Default cost:** Fraction of advances not repaid because taxpayer ends up owing taxes
  rather than receiving a refund. Based on IRS data, ~8% of prior-year refund filers
  end up as balance-due in the subsequent year. Estimated default exposure: ~$10–15B/year.
  Recoverable over time via installment plans.

**Revenue offset:** Elimination of the predatory RAL industry removes ~$3–5B/year in fees
from low-income households. This is a direct wealth transfer back to the bottom quintile,
not a government cost.

---

### Crisis Deployment (DED-Activated)
**Scale:** Expanded eligibility (all tax filers, ~145M households); increased advance rate;
accelerated cycle. Covers approximately 85% of U.S. households.

**Net fiscal cost (Crisis Level 1):** Additional ~$80–120B net outlays (50% forgiveness
on expanded advances). Funded by pre-authorized emergency reserve or emergency supplemental.

**Net fiscal cost (Crisis Level 2):** Converts to full grant program; fiscal cost of ~$200–500B
depending on cap and cycle. Functionally equivalent to two rounds of pandemic EIPs, but
disbursed in days rather than weeks via pre-existing infrastructure.

---

## 3. Scale Options

### Pilot (Current Recommendation — Begin Now)
**Description:** Opt-in program offered to 1M households in 3 states with varied demographics.
IRS partners with state revenue agencies to validate advance calculation methodology.

**Purpose:** Validate the advance calculation accuracy (how often does predicted refund
differ materially from actual?); measure spending patterns vs. traditional refund receipt;
measure participation and opt-out rates; test prepaid card delivery for unbanked.

**Cost:** ~$2B in advances; ~$50M in administrative setup. Expected ~$1.9B recovered via
refund offset (95% recovery assumed). Net cost: ~$150M + float.

**Duration:** 2 tax cycles (1 year).

**Key questions to answer in pilot:**
1. What fraction of advance recipients end up with less actual refund than the advance?
2. Does semi-annual receipt change spending patterns vs. annual refund lump sum?
3. What is the opt-out rate, and who opts out?
4. Does advance receipt reduce RAL uptake in the same population?

---

### Limited Deployment
**Description:** National opt-in program; eligible households who affirmatively enroll.
Enrollment open for first two years; then shifts to opt-out.

**Expected participation:** 40–60% of eligible filers in opt-in phase (~40–60M households);
75–85% in opt-out phase.

**Cost:** ~$60–90B per cycle in advances; mostly self-funding via refund offset.

---

### Full Deployment (Steady State)
**Description:** Opt-out program for all eligible refund filers; automatic disbursement.

**Expected participation:** ~85M households (after opt-outs).

**Cost:** ~$120–150B per cycle, primarily self-funding.

---

## 4. Historical Precedents

### Tax Refund Anticipation Loans (Private Market, 1987–Present)
**Context:** Private lenders (banks partnering with tax preparers) have offered same-day
advances against expected refunds since the IRS launched electronic filing.

**Market data (2023):**
- ~$7B in RALs originated annually at peak; now ~$3-4B as IRS faster refunds reduced demand
- Effective APRs: 35–400% depending on product structure
- Primary users: bottom two income quintiles; unbanked or thin-credit borrowers
- H&R Block "Refund Advance" (0% for up to $3,500): loss-leader to capture tax prep fees

**Key finding:** Enormous latent demand for refund advance access exists among lower-income
filers. The private market meets this demand at predatory rates. A federal 0% program would
capture this demand immediately.

---

### 2021 Advance Child Tax Credit (Closest Federal Analog)
**Context:** American Rescue Plan expanded CTC to $3,000–$3,600/child and paid it monthly
(July–December 2021) rather than as an annual refund.

**Measured outcomes:**
- Child poverty rate fell from 15.8% → 12.1% during payment period (Census monthly CPM)
- Monthly payments produced more stable spending than annual refund would have
- 36% of recipient families used payments for food; 25% for utilities; 17% for rent
- Participation: ~35M households received payments; ~15% opted out (mostly higher-income)
- Reconciliation: ~28% of recipients had to repay some portion when they filed 2021 taxes
  because their actual credit was less than advances received — this created financial
  surprise and hardship for some families, primarily those with income changes mid-year

**DED design lesson:** The CTC advance reconciliation problem is the key design risk for TRAL.
The TRAL 24-month installment repayment option (rather than a lump-sum tax bill) directly
addresses this failure mode.

| Metric | Value | Source |
|--------|-------|--------|
| Child poverty reduction during payments | -3.7pp | Census Bureau CPM |
| Households receiving payments | ~35M | IRS |
| Share with reconciliation surprise | ~28% | IRS; Tax Policy Center |
| Food spending share | 36% | Census Pulse Survey |
| Monthly vs. annual spending stability | More stable (lower variance) | University of Michigan |

---

### British Columbia Carbon Tax Rebate (2008–Present, Semi-Annual)
**Context:** BC carbon tax revenues rebated as "Climate Action Tax Credit" paid quarterly
to lower/middle income households.

**Relevance:** Demonstrates that semi-annual/quarterly government payments to households
are administratively feasible, create predictable income infrastructure, and can be
politically stable across government changes (BC program survived four elections).

**Key finding:** Regular, predictable government payments become integrated into household
financial planning — reducing financial stress and enabling larger purchases (durable goods,
home improvements) that would otherwise require debt.

---

### IRS Direct File and Pre-Populated Returns (2024–Present)
**Context:** IRS launched Direct File (free e-filing) in 2024; pre-populated return data
from employer W-2s and 1099s is increasingly available.

**Relevance:** The TRAL depends on IRS having real-time withholding data to calculate
advance amounts. Direct File and increasing W-2 electronic submission are building this
infrastructure now. By 2027–2028, the IRS will have same-year withholding data sufficient
to calculate advance amounts within 5% accuracy for most filers.

---

## 5. Projected Impacts

### Baseline Steady-State Program (50% advance, semi-annual, ~85M households)

#### Income Smoothing Effect
Annual tax refunds average ~$3,000 — a large lump sum that households typically receive
in February/March. For lower-income households who budget month-to-month, this creates
a January–March boom in spending followed by relative constraint the rest of the year.
Semi-annual advances spread this into two $750-per-cycle payments, flattening the curve.

**Projected impact on household financial stability:**
- Month-to-month income variance reduction: estimated 15–25% for bottom two income quintiles
  (based on CTC advance data showing stabilization)
- Overdraft fee reduction: ~$3–5B annually saved by households who no longer face January
  cash-flow gaps (overdraft fees are concentrated in Q1 before refunds arrive)
- Payday loan demand reduction: ~$2–4B/year as semi-annual advances cover short-term liquidity
  needs that currently drive payday borrowing

#### Consumer Spending Impact
Unlike lump-sum refunds, predictable semi-annual payments become integrated into household
budgeting. The spending pattern shifts from volatile spike to steady elevated baseline.

| Impact Category | Annual Estimate | Confidence |
|----------------|----------------|------------|
| Additional consumer spending vs. annual refund model | +$8–15B/year | Medium |
| Reduction in predatory lending fees (RAL, payday) | $5–8B/year to households | High |
| Overdraft and NSF fee reduction | $3–5B/year | Medium |
| Durable goods spending (appliances, auto repairs) | +$4–7B/year | Low-Medium |
| Local business revenue uplift (semi-annual cycle months) | +$2–4B/year | Low |

#### Inflation Effect
Critical distinction from traditional stimulus: TRAL advances are matched by corresponding
future refund reductions. The net new money in the economy at any point is only the
*float* — the time-value gap between advance disbursement and refund receipt.

At $150B in outstanding advances with 6-month average float, the effective money supply
injection is approximately $75B (the annualized half of outstanding balance). This is
roughly equivalent to one moderate round of QE — significant but not inflationary in
a healthy economy.

**Comparison:**
- 2021 ARP ($422B direct grant, all new money): contributed ~0.3–1.5pp inflation
- TRAL steady-state ($150B float, not new money): estimated <0.1pp inflation impact
- TRAL crisis Level 2 (converts to grant at $200–500B): equivalent to 0.5–1.2pp inflation

---

### Scenario-Specific Projected Impacts

#### Pandemic — Crisis Level 1 Activation (75% advance, quarterly cycle)
**Timeline:** Program already running → DED declaration → cycle accelerated to quarterly
within 2 weeks → advance rate raised to 75% within 30 days.

**Projected impact:**
- Disbursement speed: ~95% of eligible households receive funds within 5 days (IRS direct
  deposit infrastructure already operating; no new eligibility determination required)
- Quarantine compliance: with reliable income floor every 90 days, estimated 10–18%
  additional compliance with stay-home guidance by symptomatic workers
- Supply chain stabilization: consumer spending in essential categories (food, pharma, utilities)
  sustained at 85–90% of pre-pandemic level vs. 65–70% without income support
- Comparison to CARES EIP: TRAL quarterly deployment would have disbursed first payments
  3–4 weeks faster than CARES ($1,200 EIP took 3 weeks from enactment to first deposits)

**Fiscal cost vs. CARES equivalent:**
- TRAL crisis activation: ~$120B in additional outlays over 6 months (above steady-state)
  vs. $293B for CARES EIPs
- DED recommendation: TRAL covers baseline income stabilization; CARES-style supplemental
  grants reserved for workers with zero expected refund (non-filers, newly unemployed)

---

#### AI Unemployment — Modified TRAL as Displacement Income Bridge
**Challenge:** Displaced workers experience income reduction, which lowers their expected
refund, which lowers their TRAL advance — exactly when they need income support most.
A pure refund-based advance fails at the worst moment.

**DED Modification — Displacement Income Bridge:**
- Workers with documented AI-related job displacement (O*NET automation risk >70%, filed
  displaced worker claim) receive TRAL calculated on *prior 2-year average income*, not
  current withholding
- Advance rate: 70% of prior-year refund, regardless of current-year projection
- Repayment: converted to 0% installment over 36 months once employment resumes,
  rather than via refund offset (which may not materialize during extended unemployment)

**Projected impact:**
- Extends effective retraining window by 6–12 months for displaced workers who would
  otherwise have to take any available job before completing credential programs
- At 5M displaced workers/year × $1,500 average advance: ~$7.5B additional per cycle
  above steady-state; partially self-funding as workers return to employment and resume
  normal refund cycles
- Poverty prevention: estimated 2.5M households kept above poverty line annually who
  would otherwise fall below during displacement transition period

---

#### Oil Restriction — Fuel Security Dividend Integration
**Mechanism:** Semi-annual TRAL cycle is coordinated with the Fuel Security Dividend
(gas tax revenue rebated to lower-income households) so that both payments arrive in the
same cycle window — creating a predictable, substantial income event during periods of
fuel price stress.

**January cycle (winter heating / peak fuel demand):**
- TRAL advance + Q4 Fuel Security Dividend disbursed together in February
- Combined payment for median lower-income household: $750 TRAL advance + $500 Dividend
  = $1,250 in February

**July cycle (summer driving peak):**
- TRAL advance + Q2 Fuel Security Dividend disbursed together in July
- Same household: $750 + $500 = $1,250 in July

**Projected behavioral impact:**
- Households with predictable $1,250 semi-annual payments are more willing to invest
  in fuel cost reduction (EV, heat pump, insulation) because they have a savings buffer
- Estimated uptake increase in point-of-sale EV rebate program: +8–15% among income-eligible
  households vs. rebate-only program (the advance provides confidence to make the larger purchase)

---

#### Drought — Agricultural Stability Bridge
**Challenge:** Farm operators have highly variable tax situations — income spikes in good
years, losses in bad years. In a drought year, a refund-based advance calculates near zero
because the prior year may also have been difficult.

**DED Modification — Farm Income Averaging Advance:**
- Farm operators on Schedule F (already an existing IRS form) receive TRAL calculated on
  3-year average net farm income, not prior year
- This is consistent with IRS Section 1301 income averaging already available to farmers
- In a USDA drought-designated county: advance rate increases to 80% of 3-year average;
  minimum advance floor of $2,500 per cycle regardless of income history

**Projected impact:**
- 2M farm operators × $2,500 minimum: ~$5B per cycle targeted to drought-affected regions
- Delivered within existing IRS infrastructure, no new agency needed
- Covers the 3–9 month gap between drought-year loss and crop insurance settlement
- Local economy multiplier: farm income spent locally has 1.5–2.0× local multiplier
  (each dollar supports local equipment dealers, input suppliers, rural retailers)

---

## 6. Targeting Variants

### Refund-Based (Baseline)
Advance = prior year refund × advance rate. Simple, accurate for stable-income filers.
Fails for those with income disruption (displaced workers, farmers, gig economy).

### Income-Averaged (DED Standard for Volatile Incomes)
Advance = 3-year average refund × advance rate. More accurate for agricultural, gig, and
seasonal workers. Already consistent with IRS income averaging provisions.

### Floor-Guaranteed (Crisis or Vulnerable Population)
Minimum advance regardless of refund history. Used when the goal is a universal income
floor rather than proportional advance. Requires the most credit risk tolerance.

### Behavioral Conditional
Advance is standard refund-based, but *additional* top-up advance is available conditional
on action: purchasing EV, enrolling in retraining, installing heat pump. The top-up is
forgiven (not repaid from refund). Combines the TRAL infrastructure with incentive design.

### Employer-Facilitated
Employer withholds advance repayment via payroll (rather than refund offset) and passes
the cash to employee on the semi-annual cycle. Eliminates IRS disbursement need for the
employer-channel portion; useful for large employers managing workforce in crisis scenarios
(essential workers maintaining stable employment don't need the IRS pipeline).

---

## 7. Interaction Effects

### TRAL + Traditional Stimulus Check
If both are deployed simultaneously (Crisis Level 1 TRAL + supplemental grant for non-filers),
the two programs are complementary not substitutive. TRAL covers refund-eligible households
quickly via existing infrastructure; supplemental grant covers the ~15% of households with
no refund history via emergency distribution. Together they achieve near-universal coverage
faster than either alone.

### TRAL + Paid Sick Leave
The combination materially changes pandemic compliance behavior. Paid sick leave covers the
*permission* to stay home; TRAL covers the *ability* to absorb income disruption beyond
the sick leave period. Workers who would return to work after exhausting sick leave are
retained at home if the TRAL advance is active and covers the income gap.

### TRAL + Price Spikes (Oil/Energy)
When energy prices spike, the TRAL cycle provides predictable relief on a schedule households
can plan around. Unlike a one-time stimulus, this prevents the "burn through savings, then
crisis" pattern that characterizes household response to sustained price shocks.

### TRAL + Retraining Programs
The income stability TRAL provides is the prerequisite for retraining uptake. Workers in
active retraining who have a predictable $750–$1,500 per semi-annual cycle are
estimated to complete programs at 15–25% higher rates than those without income predictability.
This is the single highest-leverage interaction: the income tool enables the human capital tool.

### TRAL + Inflation
Below-capacity economy: inflationary effect is near-zero (float-based, not new money).
Above-capacity economy with supply constraints: TRAL adds ~$75B in effective demand annually.
At ~25T GDP, this is ~0.3% additional demand pressure. Manageable if supply is being
expanded simultaneously (DPA + emergency permitting); potentially problematic if supply
is hard-constrained (severe oil restriction with no substitutes).

---

## 8. Measurement Framework

### Leading Indicators (first cycle after launch)
- Opt-out rate by income quintile (signal: if high-income households opt out at high rates,
  program is effectively targeted; if low-income opts out, there is an awareness or trust problem)
- Disbursement completion rate within 5 days (infrastructure performance)
- RAL volume at participating tax preparers (should fall; measures market displacement)
- Overdraft fee volume in February and July (should fall as TRAL fills cash-flow gaps)

### Primary Metrics (first full year)
- Month-to-month income variance for bottom two income quintiles (Census SIPP)
- Consumer spending by category in February and July vs. control months (BEA/BLS)
- Payday loan originations in TRAL-eligible population (CFPB data)
- IRS reconciliation rate: fraction requiring repayment vs. projection (accuracy metric)
- Default rate: fraction of advances not recoverable via refund offset or installment plan

### Lagging Indicators (year 2–5)
- Financial buffer accumulation: are households building savings over time rather than
  waiting for the annual refund lump sum? (Survey of Consumer Finances, annual)
- Durable goods investment: does semi-annual cycle increase appliance, vehicle, and home
  improvement investment vs. annual refund baseline? (BLS CEX)
- Retraining completion rate in displacement scenarios (DOL)
- Poverty rate at 6-month intervals vs. annual-refund counterfactual (Census CPM)

### Scenario-Specific Metrics
- *Pandemic:* Quarantine compliance rate in TRAL-active vs. non-TRAL counties (CDC mobility data)
- *AI Unemployment:* Credential completion rate for displaced workers on income-averaged TRAL
- *Oil Restriction:* EV adoption rate in TRAL + Dividend combined payment households
- *Drought:* Farm operator survival rate in drought-affected counties; drip irrigation adoption

---

## 9. Risks and Failure Modes

### Reconciliation Surprise
**Risk:** Advance exceeds actual refund due to income change (job loss mid-year, new deductions).
Recipient receives tax bill for the difference in April.

**Magnitude:** CTC advance experience: ~28% of recipients had reconciliation adjustments.
Weighted by size: approximately 8% had adjustments exceeding $500.

**Mitigation:**
1. 24-month 0% installment option for balances <$3,000 (removes acute financial shock)
2. Real-time income change notification system: if IRS detects mid-year income drop >20%
   (via employer withholding reports), advance is automatically recalculated downward
   for the next cycle
3. Hardship waiver: documented hardship (job loss, medical event) triggers forgiveness
   of reconciliation balance up to the advance amount

---

### Gaming via Withholding Manipulation
**Risk:** Taxpayers inflate withholding specifically to generate large projected refunds
and qualify for larger TRAL advances, then claim a refund at year-end, paying back the
advance with the refund and effectively using the program as a 0% credit line.

**Reality check:** This behavior already occurs with refund-seeking at year-end. The
program does not meaningfully increase the incentive — it just moves the cash flow
earlier.

**Mitigation:** Cap based on *prior year actual refund*, not projected year withholding.
Advance rate calculated on the lesser of prior-year actual or current projected.

---

### Program Permanence / Budget Dependency
**Risk:** Once 85M households receive semi-annual advances, discontinuing the program
creates a $150B/cycle withdrawal from household incomes — a deflationary shock.
The program becomes politically irreversible.

**DED Assessment:** This is not purely a risk — it is also a feature. An entrenched
income support infrastructure that cannot be repealed without causing a recession
is the most durable form of economic stabilization policy. The political economy of
the program is a feature once it achieves scale. However, it must be designed sustainably
from the start (self-funding via refund offset) so the permanence is not a fiscal threat.

---

### IRS Infrastructure Capacity
**Risk:** The IRS currently cannot process 85M disbursements on a 5-day timeline
semi-annually. The agency is underfunded and understaffed.

**Data:** IRS Direct Deposit capacity improved significantly with pandemic EIP experience
(processed 80M deposits in ~2 weeks for CARES Act). The semi-annual TRAL volume is comparable.

**Mitigation:** $3–5B IRS infrastructure investment (already partially funded in IRA 2022).
IRS Direct File build-out directly supports the data infrastructure TRAL requires.
Timeline: program launch feasibility by 2028–2029 with current modernization trajectory.

---

## 10. Cost Estimates

### Steady-State Program (Full Deployment)

| Cost Component | Annual Amount | Notes |
|----------------|--------------|-------|
| Float cost (Treasury borrowing) | ~$3B/year | $150B × 4% × 0.5 year |
| Default/non-recovery | ~$8–12B/year | ~6% of advances not recovered via refund |
| IRS administration | ~$1–2B/year | Incremental above existing refund processing |
| Prepaid card distribution (unbanked) | ~$500M/year | ~6M households × $80/card |
| **Total gross cost** | **~$12–18B/year** | |
| Less: RAL market displacement savings | -$3–5B/year | Welfare transfer back to households |
| Less: payday/overdraft reduction (social cost) | -$2–4B/year | |
| **Net fiscal cost** | **~$7–11B/year** | For a $300B/year income infrastructure |

**Cost efficiency:** $7–11B/year to operate a program delivering $300B/year in income
support and $5–9B/year in household fee savings. This is among the most cost-efficient
income infrastructure programs in the federal portfolio.

### Crisis Activation Marginal Cost

| Crisis Level | Additional Quarterly Outlay | Fiscal Mechanism | Repayment |
|-------------|----------------------------|-----------------|-----------|
| Level 1 (75%, quarterly) | +$40–60B/quarter above baseline | Pre-authorized reserve | 50% forgiven |
| Level 2 (100%, monthly, converts to grant) | +$80–120B/month above baseline | Emergency supplemental | None |

### Pilot Cost (First 2 Cycles, 1M Households)

| Item | Cost |
|------|------|
| Advances disbursed | ~$1.5B (1M × $1,500 average) |
| Expected recovery via refund offset | ~$1.4B (95% recovery) |
| Net advance cost | ~$100M |
| IRS pilot infrastructure setup | ~$150M |
| Independent evaluation contract | ~$20M |
| Prepaid card infrastructure (unbanked subset) | ~$15M |
| **Total pilot cost** | **~$285M** |

---

## Pre-Built Requirements

- [ ] IRS direct deposit reach expansion: pre-enroll all households with Social Security
  records or prior-year tax filings into disbursement-ready accounts (direct deposit or
  prepaid card); target 100M households by 2028
- [ ] Withholding data API: real-time IRS access to employer W-2/withholding submissions
  within 30 days of payroll — enables accurate advance calculation and mid-year adjustment
- [ ] Advance calculation algorithm: IRS-certified formula with income-averaging variants
  for farm, gig, and volatile-income filers; tested in pilot before full deployment
- [ ] Hardship waiver system: pre-built administrative process for reconciliation forgiveness
  in documented hardship cases; target 10-day determination
- [ ] Crisis activation protocol: pre-written DED declaration triggers that automatically
  escalate advance rate, reduce cycle frequency, and loosen repayment terms — no
  additional legislation required for Level 1; Level 2 requires emergency supplemental

---

## Related Tools
- [stimulus-checks.md](stimulus-checks.md) — unconditional direct grants; complement
  for non-filers and zero-refund households not served by TRAL
- `retraining-programs.md` (planned) — conditionality delivery mechanism for CDT variant
- `gas-tax.md` (planned) — revenue source for Fuel Security Dividend integration
- `business-survival-loans.md` (planned) — business-level parallel instrument
