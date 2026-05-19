# DED Proposal: Care Work Tax Recognition

**Document Type:** Policy Analysis and Legislative Design
**Last Updated:** 2026-05
**Category:** Labor / Tax Policy / Negative Income Tax Integration
**DED Priority:** Medium-High — complements Negative Income Tax and Jobs KPI by giving
  economic recognition to the largest unpaid labor sector in the economy; directly serves
  the DED's objective of reducing invisible labor market distortions
**Related Proposals:** [universal-basic-income.md](universal-basic-income.md) ·
  [ubi-arguments.md](ubi-arguments.md) · [internship-floor.md](../tools/internship-floor.md)
**Related Economics:** [jobs-kpi.md](../economics/jobs-kpi.md) (Tier 1 care work)

---

## 1. The Problem

### 1.1 The Scale of Unrecognized Labor

Unpaid care work is the largest labor category in the U.S. economy that the tax code
does not see. The Bureau of Labor Statistics American Time Use Survey estimates that
Americans spend approximately 32 billion hours per year on unpaid childcare and 19
billion hours per year on elder care and adult care for disabled or ill family members —
a combined 51 billion hours annually.

At the Bureau of Labor Statistics median wage for childcare workers ($15.65/hour) and
home health aides ($14.65/hour), this unpaid labor represents an economic value of
**~$750–800B/year** — roughly 2.5% of GDP — that is entirely invisible to the tax system.

The people providing this labor:
- Do not qualify for the Earned Income Tax Credit (requires earned income from employment)
- Do not qualify for most Social Security credit accumulation (unpaid care does not count
  as covered employment)
- Cannot claim the Child and Dependent Care Credit (which covers expenses for paid care,
  not credit for providing care yourself)
- Are often pushed below the Negative Income Tax phase-in floor precisely because care
  responsibilities prevent sufficient paid employment
- Accumulate less retirement savings over a lifetime, creating a care work poverty
  penalty that compounds into old age

### 1.2 Who Bears This Burden

Unpaid care work is not distributed evenly. The Bureau of Labor Statistics data
consistently shows:

- **Women** provide approximately 65–70% of all unpaid care hours; primary caregivers
  are overwhelmingly women regardless of household composition
- **Low- and moderate-income households** provide the highest share of unpaid care
  relative to income because high-income households can purchase substitute care services
- **Rural households** provide more informal elder care because professional care services
  are less accessible
- **Households of color** provide higher rates of multigenerational care due to both
  cultural patterns and lower access to formal care infrastructure

These are the same populations that the Negative Income Tax and American Sovereign Fund
are designed to benefit. Failing to recognize care work in the tax system means that
the populations most burdened by the care economy gap are systematically under-counted
in their economic contribution — and correspondingly under-supported.

---

## 2. Current IRS Treatment — What Exists and What Doesn't

### 2.1 What Currently Exists

**Child Tax Credit (IRC §24):** A credit of $2,000 per qualifying child ($1,600 refundable)
for the presence of children in the household — not for care work performed. A parent
who provides full-time childcare and a parent who outsources full-time childcare receive
identical credit treatment.

**Child and Dependent Care Credit (IRC §21):** A credit of 20–35% of qualifying care
expenses paid to a third-party provider — explicitly for purchased care, not for
provided care. Maximum qualifying expenses: $3,000 (one dependent), $6,000 (two or more).

**Earned Income Tax Credit (IRC §32):** Requires "earned income" — wages, salary, tips,
net self-employment income. Specifically excludes income that is not compensation for
services rendered to an employer or in self-employment. Unpaid care is not earned income
under current law.

**Social Security coverage:** Derived only through a spouse's work record (spousal
benefit up to 50% of worker benefit) or through own earned income record. No direct
Social Security credit for care work years.

**What is missing:** There is no provision in the Internal Revenue Code that:
- Credits a taxpayer for the hours or value of unpaid care they provide
- Counts unpaid care as "income" for EITC purposes
- Creates a refundable credit specifically for primary caregivers of children, elderly,
  or disabled dependents

### 2.2 The EITC Gap for Caregivers

The EITC is the tax code's most powerful anti-poverty instrument for working families.
It provides up to $7,430/year (FY2024) for families with three or more children. But it
requires earned income — and primary caregivers of young children who cannot work
sufficient paid hours to qualify receive nothing.

The irony: a parent working 20 hours/week in a paid job while also providing 40 hours/
week of childcare qualifies for partial EITC on the paid hours. A parent providing 60
hours/week of childcare who cannot work paid hours because of care responsibilities
qualifies for zero EITC. The tax code currently penalizes full-time caregiving relative
to partial caregiving with paid employment.

---

## 3. What Recognition Would Require

Recognizing care work in the tax code requires solving four distinct problems:

1. **Definition:** What counts as care work?
2. **Valuation:** What is an hour of care work worth for tax purposes?
3. **Documentation:** How does a taxpayer prove they provided care work?
4. **Fraud prevention:** How does the IRS verify claims without making compliance
   prohibitively burdensome?

These problems are not novel — they are analogous to problems already solved in other
tax contexts (home office deductions, business expense documentation, self-employment
income reporting). They require legislative definition and administrative rulemaking,
not new technology or new institutions.

---

## 4. Implementation Options

### Option 1: Care Work EITC Expansion — Imputed Income for Earned Income Calculation

**Mechanism:** Amend IRC §32 to allow primary caregivers to count a defined number of
care work hours as "earned income" for purposes of the EITC calculation. The care work
hours are assigned an imputed hourly value and counted as if they were earned through
employment.

**Legislative text (draft concept):**
> *"For purposes of subsection (a), a taxpayer who is a primary caregiver for a
> qualifying individual as defined in §21(b)(1) may elect to treat care work hours,
> not to exceed 40 hours per week for weeks in which qualifying care was provided, as
> earned income at the applicable care work wage rate. The care work wage rate shall be
> the Bureau of Labor Statistics median hourly wage for childcare workers or home health
> aides (whichever is applicable) in the taxpayer's metropolitan statistical area, or
> the applicable federal minimum wage, whichever is higher."*

**Imputed value calculation:**
- BLS median childcare worker wage: ~$15.65/hour (2024)
- At 40 hours/week × 52 weeks = 2,080 hours/year × $15.65 = **$32,552 imputed annual income**
- This is the EITC calculation input, not a cash payment — it determines the EITC benefit
  amount that is actually received

**EITC benefit from $32,552 of imputed income (family with 2 children, 2024 rates):**
- Phase-in rate: 40% of earned income up to $14,590 = $5,836
- Plateau at $5,836 between $14,590 and $23,228
- Phase-out above $23,228 at 21.06%
- At $32,552 imputed income: benefit = $5,836 − (0.2106 × ($32,552 − $23,228)) =
  $5,836 − $1,963 = **~$3,873/year** in additional EITC for a full-time caregiver

**Targeting:** Income cap on election — primary caregivers whose actual earned income
plus other household income exceeds $50,000 are ineligible for the election. This
restricts the benefit to low- and moderate-income households where the care work penalty
is most severe.

**Strengths:**
- Works within existing EITC infrastructure (no new forms or agencies)
- Scales with actual care work (hours × wage rate)
- Directly addresses the primary objection (why should I work paid hours if I'm
  providing care?) by making care work financially equivalent to paid work for EITC
- "You get paid for the care work you do" is a simple message

**Weaknesses:**
- Imputed income is a concept the general public finds confusing ("I didn't earn anything
  so how do I have income?"); narrative complexity is moderate
- Creates a calculation that varies by geography (locality-adjusted wage rates) and by
  care type (childcare vs. elder care), adding form complexity
- Does not address Social Security gap (unpaid care still doesn't accumulate retirement
  credit)

---

### Option 2: Refundable Caregiver Tax Credit — Standalone Credit, No Imputed Income

**Mechanism:** Create a new refundable tax credit (new IRC §XX) specifically for primary
caregivers of qualifying dependents. The credit is calculated on hours of care provided
at a standardized rate, is fully refundable (paid out even if no tax owed), and is
separate from the EITC.

**Credit calculation:**
> *Credit = qualifying care hours × federal care work rate*
> *Federal care work rate = $15.00/hour (indexed to minimum wage)*
> *Maximum qualifying hours: 40/week for active care periods*
> *Maximum annual credit: $12,480 (40 hours × 52 weeks × $6/hour credit rate)*

Note: the credit rate ($6/hour) is applied to hours, not the full wage rate — to
prevent the credit from acting as a full wage substitute and to keep fiscal cost
manageable. A caregiver providing 40 hours/week year-round receives $6,240/year; a
caregiver providing 20 hours/week for 26 weeks receives $1,560/year.

**Qualifying care types:**
- Childcare for children under 13 in the taxpayer's household (mirrors §21 dependent)
- Elder care for a parent, grandparent, or in-law aged 65+ who resides with or receives
  substantial care from the taxpayer (defined as 15+ hours/week)
- Disability care for a spouse, child, or other household member with a documented
  disability requiring substantial assistance (15+ hours/week)
- Hospice-adjacent care for a terminal family member (15+ hours/week; no age limit)

**Income limit:** Credit phases out above $60,000 household AGI at 10% per $2,000,
reaching zero at $120,000. This makes the credit exclusively a low- and moderate-income
instrument.

**Revenue cost estimate:**
- ~30 million Americans provide significant unpaid care of the qualifying type
- ~8 million are in households below the $60,000 AGI threshold with substantial care
  hours (no existing tax credit)
- Average credit at 25 hours/week, 40 weeks: 25 × $6 × 40 = $6,000/year
- 8M recipients × $6,000 average = **$48B/year**
- With income phase-out, realistic cost: **$30–40B/year**

**Strengths:**
- Clean standalone credit — no confusing imputed income concept
- "How many hours of care did you provide?" is a simple question taxpayers can answer
- Fully refundable means it reaches zero-income primary caregivers who cannot benefit
  from non-refundable credits
- Can be delivered monthly (analogous to the Advance Child Tax Credit 2021 model) —
  $500–1,000/month for full-time caregivers, providing cash flow when it's needed

**Weaknesses:**
- Higher fiscal cost ($30–40B/year) than the EITC expansion option
- New credit creates new gaming opportunities — people inflate care hour claims
- Requires documentation infrastructure for care hours (see Section 5)

---

### Option 3: NIT Integration — Care Work as Qualifying Income for Negative Income Tax Floor

**Mechanism:** Under the DED's Negative Income Tax design, care work hours are counted
as qualifying income at the federal care work wage rate when calculating a taxpayer's
position relative to the NIT guarantee floor. A taxpayer with zero formal earned income
but 40 hours/week of qualifying care work is treated as having $32,552 in income for
NIT calculation purposes — placing them above or at the guarantee floor rather than at
the maximum NIT benefit level.

**Important distinction from Option 1:** This does not increase the NIT payment — it
changes the position calculation. A primary caregiver with no earned income who would
otherwise receive the full $6,200 guarantee floor payment would instead receive zero or
a reduced NIT payment because their imputed care income is treated as placing them
above the floor.

**This option is therefore NOT a benefit expansion — it is an income recognition that
prevents care workers from appearing "zero-income" in the Negative Income Tax system.**

**Why this matters:**
The Negative Income Tax is calibrated to the income floor, not to need in general. A
stay-at-home parent with a high-income spouse providing substantial care work is not in
poverty and should not receive the NIT floor payment — but under a naive income-only
calculation, their $0 earned income looks identical to a single parent with $0 earned
income and no partner. Recognizing care work income in the NIT calculation creates a
more accurate picture of household economic position.

**Paired approach:** Option 3 (NIT integration for accurate income reporting) should
be paired with Option 2 (refundable care credit) or Option 1 (EITC expansion) so that:
- The NIT does not over-pay to households where care work provides significant economic
  value that is currently invisible
- A separate, dedicated credit provides direct recognition and compensation for the care
  work that households with lower total incomes are performing

**Strengths:**
- Improves accuracy of the Negative Income Tax without creating perverse incentives
- Prevents the NIT from functioning as an implicit subsidy for households where one
  high-earning partner supports a caregiver partner (who appears income-less)
- Complements rather than duplicates other care work recognition mechanisms

**Weaknesses:**
- This option alone reduces payments to some current-zero-income households (offsetting
  political benefit with political cost)
- Must be carefully paired with benefit expansion to avoid net harm to primary caregivers

---

## 5. Documentation and Fraud Prevention

The central fraud risk in care work recognition is self-reported hours — a taxpayer
claiming 50 hours/week of childcare who actually provided 20. This concern is real
but manageable through three layers:

### 5.1 Dependent-Based Verification

For childcare: the child's existence, age, and household membership are already
documented in the tax return (existing dependent exemption). IRS can cross-reference
Social Security numbers for qualifying dependents. Care claim is inherently bounded by
dependent status — no child, no credit; a child aged 14 cannot be the basis for a
childcare credit.

For elder care: Medicare enrollment records (SSA-coordinated) confirm the qualifying
elder's age and can confirm residential address through Medicare billing records. A
claim of substantial elder care for an 80-year-old parent requires the parent to exist
and to be in a care-requiring state (Medicare utilization patterns can flag households
where care is likely needed).

For disability care: SSA disability determination records (SSDI, SSI) confirm the
qualifying disabled person's documented status. A claim of 40 hours/week of disability
care for a family member with an SSA-documented disability is substantially
self-verifying.

### 5.2 Third-Party Attestation for Large Claims

For annual care credit claims above $5,000, require a signed attestation from a
third party (a physician who can attest to the care recipient's need, a social worker,
or — for childcare — a statement from a school noting the child's primary residence
and care arrangement). This is a one-time documentation requirement per care
relationship, not an annual burden.

### 5.3 Audit Sampling with Civil Penalty Structure

Random audit selection at a 5% rate for care credit claims, with a civil penalty of
150% of disallowed credits for fraudulent claims (standard IRC fraud penalty). The
combination of meaningful audit probability and substantial penalty provides deterrence
without requiring universal documentation of every care hour.

### 5.4 Comparison to Existing Accepted Self-Reporting

The home office deduction, vehicle mileage deduction, and business expense deduction
all rely heavily on self-reported records without third-party verification for routine
claims. The IRS accepts taxpayer records as the primary evidence source with audit risk
as the deterrent. Care work hours can be treated identically — the taxpayer maintains
a care log; the IRS audits a sample. This is not a new administrative framework.

---

## 6. Social Security Integration

IRS recognition alone does not address the most severe long-run consequence of care
work: the Social Security gap. A parent who exits the labor force for 10 years to
provide care accumulates 10 years of zero Social Security covered earnings, reducing
their lifetime retirement benefit by amounts that can reach $8,000–12,000/year in
foregone annual benefits.

**Congressional mechanism needed (separate from IRS):** Amend the Social Security Act
(42 U.S.C. §404 et seq.) to credit caregivers with deemed covered earnings during
qualifying care periods. Modeled on the existing provision for military service (deemed
covered wages for periods of active service). During qualifying care periods (defined
identically to the tax credit eligibility), a caregiver is credited with deemed annual
earnings of $20,000–25,000 in the Social Security system — generating retirement credits
without requiring the caregiver to have actually earned that amount.

**Revenue mechanism:** SSA deemed credits are funded through the Social Security trust
fund at the same rate as real contributions. The fiscal cost is the present value of the
additional retirement benefits paid, offset by the savings from reduced Supplemental
Security Income (SSI) payments to elderly women who would otherwise be in poverty due to
the care work penalty.

This is a major legislative change separate from the IRS mechanisms above and would
require standalone advocacy. The IRS care credit is the near-term achievable step; the
Social Security credit is the long-run structural fix.

---

## 7. Legislative Vehicle and Path

### 7.1 Near-Term: EITC Expansion (Option 1)

The EITC expansion is the most achievable near-term vehicle because:
- It modifies an existing credit rather than creating a new one
- EITC expansions have bipartisan precedent (every administration since Reagan has
  expanded it at least once)
- It does not require new IRS infrastructure — existing EITC calculation systems are
  modified, not replaced
- Cost is lower than Option 2 and can be offset with targeted care sector investment
  reductions or existing program consolidation

**Legislative vehicle:** Annual tax extenders package or budget reconciliation.

### 7.2 Medium-Term: Standalone Refundable Caregiver Credit (Option 2)

The refundable credit requires new IRC section and new IRS form — achievable within 2–3
years of enactment given IRS implementation timelines. Its cost ($30–40B/year) is the
primary legislative barrier; it requires an offset or a political moment where the
care economy is politically salient (a pandemic, an elder care crisis, or a childcare
cost spike all qualify).

**Legislative vehicle:** Standalone bill or inclusion in comprehensive childcare or
elder care legislation.

### 7.3 Long-Term: Negative Income Tax Integration + Social Security (Option 3 + SSA)

Integrated recognition of care work across the NIT and Social Security requires the
NIT to be enacted first (making Option 3 dependent on the broader DED legislative agenda)
and the Social Security amendment to pass as part of a Social Security modernization
package (historically difficult but periodically achievable in bipartisan form).

**Timeline:** Year 5+ relative to NIT enactment.

---

## 8. One-Sentence Explanations (Per DED Communication Standard)

**Option 1 (EITC expansion):**
"If you're caring for children or elderly parents instead of working, the tax credit
you would have earned at work is credited to you anyway."

**Option 2 (Refundable credit):**
"Every hour you spend caring for a child, an elderly parent, or a disabled family
member earns you a $6-per-hour tax credit, paid monthly."

**Option 3 (NIT integration):**
"Care work counts as income when calculating whether you're above or below the income
floor — because it is work."

**Social Security integration:**
"Years you spent caring for family count toward your Social Security record, just like
years you spent on a job."

---

## 9. Interaction with DED Programs

| Program | Care Work Recognition Interaction |
|---------|-----------------------------------|
| Negative Income Tax | Option 3 improves NIT accuracy for two-income households; EITC expansion / care credit provides direct financial benefit to low-income caregivers who need the floor |
| American Sovereign Fund dividend | Universal; no care work interaction required — all eligible citizens receive the dividend regardless of care status |
| Civilian Reserve and Health Program | Care sector jobs (home health aide, childcare worker) are a natural Civilian Reserve and Health Program placement — paid care work that supplements the unpaid care credit; the two programs together address both formal and informal care labor |
| Mandatory Internship Floor | Care sector firms receiving federal contracts have obligations to provide internship slots — creates pathways from informal care (unpaid caregiver) to formal care employment (paid, credentialed) |
| Jobs KPI — Tier 1 | Tier 1 is explicitly care work: the Jobs KPI documents that paid care work generates net positive fiscal return. Care work tax recognition converts some of that Tier 1 labor from invisible to documented, improving both individual outcomes and policy measurement |
| Financial Institution Partnerships | If the care credit is delivered monthly (like Advance Child Tax Credit), FIP infrastructure is the delivery mechanism — same account, same schedule as the NIT and American Dividend |

---

## 10. Cost Summary

| Option | Mechanism | Annual Cost | Recipients | Avg Benefit |
|--------|-----------|-------------|------------|-------------|
| Option 1: EITC expansion | Imputed income for EITC | $8–15B | ~4–6M caregivers | $1,500–3,000 |
| Option 2: Refundable credit | $6/hour care credit | $30–40B | ~8M caregivers | $3,750–5,000 |
| Option 3: NIT integration | Accuracy correction only | Neutral to slight savings | ~2–3M households | — |
| SSA social security credit | Deemed covered earnings | $5–10B/year present value | ~4M caregiver years | $8,000–12,000 in lifetime retirement |

**Recommended stack:** Option 1 (EITC expansion, Year 1–2) → Option 2 (refundable credit,
Year 3–5) → Option 3 (NIT integration at NIT enactment) → Social Security credit
(Year 8–10). Total steady-state cost: $30–50B/year, offset by Medicaid savings from
improved caregiver health and reduced elderly poverty spending.
