# DED Tool Analysis: Business Survival Loans

**Category:** Direct Transfers / Financial Instruments
**Last Updated:** 2026-05
**Related Tools:** [stimulus-checks.md](stimulus-checks.md) · [tax-advance-loans.md](tax-advance-loans.md) · [strategic-contracts.md](strategic-contracts.md)
**Relevant Scenarios:** Pandemic, AI Unemployment, Oil Restriction, Drought, Shipping Blockade, Financial Fragmentation
**DED Tool Rating:** Tier A — Extensively documented precedent; deployable within existing SBA infrastructure; high scenario breadth

---

## 1. Mechanism

A Business Survival Loan (BSL) is a government-guaranteed or direct government loan extended
to businesses experiencing acute revenue disruption from an identified economic shock — sized
to cover fixed operating costs (rent, payroll, debt service, utilities, insurance) for a
defined period, enabling the business to remain viable until normal revenue resumes.

The instrument's core purpose is **preserving business infrastructure** — the legal entities,
physical locations, supplier relationships, customer bases, trained workforces, and operational
knowledge that take years to build and weeks to destroy. A shuttered business is not just a
balance sheet loss; it is the destruction of organizational capital that the economy cannot
rapidly reconstruct.

**What BSLs target:**
- Businesses with pre-crisis viability (solvent, operational) that face a **temporary** external
  shock to revenue (not underlying uncompetitiveness)
- Fixed cost coverage — the costs that continue regardless of revenue (rent, minimum payroll,
  insurance, debt service on pre-crisis obligations)
- Bridge duration — the period between the shock and the expected revenue recovery

**What BSLs do not do:**
- Do not address structural insolvency — a business that was failing before the crisis
  does not deserve a survival loan; assessment of pre-crisis viability is a gatekeeping requirement
- Do not replace lost profit — they cover fixed cost floors, not revenue gap
- Do not prevent disruption — they preserve capacity through disruption so the recovery
  is faster and more complete than it would be otherwise

---

## 2. Structural Variants

### 2A. SBA-Guaranteed Loans (Standard Variant)
Government guarantees private bank loans; bank underwrites and services; government covers
losses on defaulted loans. Historical model: SBA 7(a), SBA 504, CARES Act PPP.

**Advantage:** Uses existing bank underwriting infrastructure; government does not need to
evaluate every loan; scales quickly through banking system.
**Disadvantage:** Banks apply credit standards that exclude the most distressed borrowers;
small/minority-owned/rural businesses disproportionately excluded.

### 2B. Direct Government Loans (Crisis Variant)
Government makes loans directly without bank intermediary. Model: CARES Act EIDL (direct SBA
loans), farm emergency loans (FSA direct lending), some Main Street Lending Program facilities.

**Advantage:** Eliminates bank credit standard barrier; can reach businesses with no banking
relationship.
**Disadvantage:** Requires SBA/agency underwriting staff at scale; slower; larger government
balance sheet exposure.

### 2C. Forgivable Loans (Hybrid)
Loans that convert to grants if proceeds are used for qualifying purposes (payroll, rent, utilities)
during the covered period. Model: CARES Act PPP (8-week payroll + fixed cost coverage; 100%
forgiven if conditions met).

**Advantage:** Strongest retention of workforce and operating capacity; no repayment burden
after crisis.
**Disadvantage:** Moral hazard and fraud risk elevated; verification required; Congress
often resistant to making loans permanent grants until after the fact.

### 2D. DED Strategic Variant — Revenue-Contingent Loans
Loan repayment tied to post-crisis revenue recovery rather than fixed amortization schedule:

- Repayment begins when monthly revenue returns to 80% of pre-crisis baseline
- Until that threshold, 0% interest accrues; no payment required
- Once above threshold, repayment at prime + 0.5% on 5-year schedule
- If business does not recover (revenue never reaches 80% within 36 months), remaining
  balance is forgiven — the loan converts to a grant for businesses that attempted survival
  but faced structural headwinds

**Rationale:** Fixed repayment schedules on crisis loans create a second wave of business
failures as repayment begins before revenue has fully recovered — what economists call the
"debt overhang" problem that extended Japan's post-1990 recession. Revenue-contingent repayment
eliminates this by aligning repayment to actual recovery pace.

**Historical analog:** UK's Recovery Loan Scheme (2021) and Australia's JobKeeper combined
with low-doc loans had elements of this; income-contingent student loans provide the
repayment-contingency structural model.

---

## 3. Deployment Levels

### Local / Municipal
**What it looks like:** City or county-level revolving loan funds for small businesses in
a designated disaster zone or distressed area; typically funded by CDBG or EDA grants.

**Scale:** $50k–$250k per business; 50–500 businesses; $5M–$125M total.

**Activation threshold:** Local emergency declaration; documented revenue decline >30% in
affected area.

**Examples:** New Orleans small business recovery loans post-Katrina; NYC ICAP program;
municipal COVID recovery funds (2020–2021 across hundreds of cities).

---

### Regional / State
**What it looks like:** State-administered loan programs backed by federal formula grants
or state revolving funds; often sector-targeted (agriculture, hospitality, manufacturing).

**Scale:** $25k–$2M per business; $500M–$5B total per state.

**Examples:** California Disaster Relief Loan Program; Texas Economic Injury Grants (2020);
Louisiana Resilience Fund post-Hurricane Ida; USDA emergency farm loans (FSA) for drought-affected
operators.

---

### National (Standard)
**What it looks like:** SBA-administered guarantee program or direct loan program; accessed
through bank network or SBA.gov portal; income-based eligibility.

**Scale:** $150k–$2M per business; $50B–$500B total program.

**Activation threshold:** Presidential disaster declaration or national economic emergency
declaration.

**Examples:** CARES Act PPP ($793B total; 11.8M loans); CARES Act EIDL ($380B; 3.8M loans);
2008 Small Business Jobs Act emergency funds; post-9/11 SBA emergency funds.

---

### National (DED Strategic — Pre-Built)
**What it looks like:** Pre-authorized BSL program with defined eligibility criteria, loan
structures, and disbursement mechanics established before any crisis. Activated by DED
emergency declaration; disbursements begin within 72 hours of activation.

**Key difference from standard:** No congressional action required for initial deployment;
pre-appropriated reserve fund covers first $200B; eligible sectors and loan terms pre-defined
per DED scenario library.

**Scale:** $500B–$2T total program capacity across all covered scenarios.

---

## 4. Historical Precedents

### CARES Act Paycheck Protection Program (2020, $793B)

**Structure:** SBA-guaranteed forgivable loans; 2.5× monthly payroll; 8–24 week coverage;
forgiven if 60%+ used for payroll.

**Scale:** 11.8M loans; average $67,600 per loan; covered approximately 51M jobs.

| Metric | Value | Source |
|--------|-------|--------|
| Total disbursed | $793B | SBA |
| Loans made | 11.8M | SBA |
| Jobs retained (SBA estimate) | 51M | SBA |
| Jobs retained (independent estimate, Chetty et al.) | 1.4–3.2M | NBER (2021) |
| Fraud estimate (DOJ/OIG) | $64–100B (8–12%) | DOJ, OIG |
| Businesses with <10 employees served | 74% | SBA |
| Minority-owned businesses initially excluded | Disproportionately high | NBER, SBA OIG |

**Key finding:** PPP preserved enormous amounts of organizational capital but with significant
targeting inefficiency. Larger businesses with existing bank relationships accessed funds faster;
the first-come-first-served structure meant some eligible small businesses were excluded entirely.
DED pre-built eligibility lists (CMISS-style sector enrollment) would address this.

**The Chetty gap:** SBA attributed 51M jobs to PPP; independent research found only 1.4–3.2M
jobs would have been lost without it (many businesses would have survived anyway). The gap
reflects spending on businesses that were not actually at risk, not fraud — the program's
universality was also its inefficiency. DED targeted variant would require documented revenue
decline threshold.

---

### CARES Act Economic Injury Disaster Loans (2020, $380B)

**Structure:** Direct SBA loans; up to $2M per business; 30-year term; 3.75% interest (2.75%
for nonprofits); collateral required above $25k.

| Metric | Value | Source |
|--------|-------|--------|
| Total disbursed | $380B | SBA |
| Loans made | 3.8M | SBA |
| Advance grant component ($10k) | $20B | SBA |
| Default rate (SBA projection) | 15–25% | GAO |
| Average loan size | ~$100k | SBA |

**Key finding:** EIDL reached businesses that did not have pre-existing bank relationships —
the direct lending model served as a backstop for PPP exclusions. Slower than PPP (weeks vs.
days) but broader reach. Fraud rate higher (~10–15%) due to self-certification of eligibility.

---

### USDA Farm Service Agency Emergency Loans (Ongoing Program)

**Structure:** Direct government loans for farm operators in declared disaster counties;
up to $500k; 3.75% interest for physical losses; lower rates for production losses.

| Metric | Value | Source |
|--------|-------|--------|
| 2022 drought-year loans | ~$400M total | FSA |
| Average loan size | ~$100k | FSA |
| Default rate (historical) | ~8% | FSA |
| Counties covered 2022 | 70%+ of U.S. counties declared disaster | USDA |

**Key finding:** FSA direct lending to farmers has operated for decades with manageable default
rates and effective reach into rural areas with limited banking access. This is the DED model
for agricultural sector BSLs.

---

### Main Street Lending Program (2020, Federal Reserve)

**Structure:** Fed purchased 95% participations in eligible loans made by banks; $600B capacity;
minimum $100k; up to $300M per loan; 5-year term; revenue-contingent deferral option.

| Metric | Value | Source |
|--------|-------|--------|
| Loans made | ~$17.5B (of $600B capacity) | Federal Reserve |
| Utilization rate | ~3% | Federal Reserve |
| Businesses served | ~2,400 | Federal Reserve |
| Program explanation | Too complex; too slow; too expensive for small businesses | GAO post-mortem |

**Key finding:** Main Street significantly underperformed. The 5-day application + bank underwriting
+ Fed purchase process was too slow; the minimum loan size excluded most small businesses;
complexity deterred banks from participating. The DED BSL design explicitly avoids these failure
modes: pre-built eligibility, automatic disbursement, bank-optional direct lending fallback.

---

### Australia's JobKeeper (2020, A$89B)

**Structure:** Wage subsidy (A$1,500/fortnight per employee) paid to employers for businesses
with >30% revenue decline; employer retained workers on payroll.

| Metric | Value | Source |
|--------|-------|--------|
| Total cost | A$89B (~US$65B) | Australian Treasury |
| Workers covered | 3.8M at peak | Australian Treasury |
| Unemployment prevented (est.) | ~5pp | RBA analysis |
| Fraud estimate | ~A$2.8B (3%) | ATO |
| Business failures during COVID | Below any comparable major economy | IMF data |

**Key finding:** Australia's combination of wage subsidies (JobKeeper) + direct business
loans produced the best business survival outcome among G20 economies during COVID —
unemployment peaked at 7.5% vs. 14.7% in the U.S. The DED BSL design incorporates the
wage subsidy component by making payroll retention a qualifying use and a forgiveness condition.

---

## 5. DED Applications

### Pandemic — Phase 1 (0–6 months)

**Role:** Preserve the organizational capacity of essential and near-essential businesses
through the acute shutdown period. Without BSLs, the business closure rate during mandatory
shutdown periods compounds the health crisis with a secondary economic crisis that outlasts
the pathogen.

**DED-specific variant: Essential Business Continuity Loan (EBCL)**
- Eligibility: businesses in SIC codes designated essential (food retail, pharmacy, logistics,
  healthcare supply chain, telecommunications, water utilities)
- Amount: 3 months of fixed costs (rent + utilities + minimum payroll + insurance)
- Term: 0% interest, revenue-contingent repayment
- Disbursement: pre-enrolled businesses receive within 72 hours of pandemic emergency declaration
- Forgiveness: 100% if business maintains employment at 80%+ of pre-pandemic levels for
  the 6-month period

**Pre-build requirement:** SBA maintains a pre-enrollment list of essential businesses
(structured like CMISS for critical sectors) with pre-verified eligibility. When declaration
occurs, loans disburse against pre-verified data, not new applications.

---

### AI Unemployment — Phase 2 (Structural Transition)

**Role:** As AI automation makes specific business functions obsolete, the businesses that
employed those functions need capital to **restructure** — not just to survive, but to
transition their business model. This is a different objective than pure survival.

**DED-specific variant: Business Model Transition Loan (BMTL)**
- Eligibility: businesses in ODRI-designated occupation categories with documented
  displacement rate >15% of workforce from automation
- Amount: 24 months of projected transition costs (retraining + equipment + process redesign)
- Requires: transition plan filed with NEID showing intended automation integration or
  business model evolution; plan reviewed by DED sector specialist (ERP consultant track)
- Term: 0% interest for 36 months; revenue-contingent repayment thereafter
- No forgiveness component — the AI transition is structural, not a temporary shock;
  businesses should repay once their restructured model generates revenue

**Why distinct from pandemic BSL:** Pandemic BSL preserves existing business models through
a temporary disruption. AI transition BMTL finances the change of business model —
a deliberate investment, not emergency survival.

---

### Oil Restriction — Phase 1

**Role:** Businesses with high transportation cost structures (logistics, food distribution,
manufacturing with heavy inputs) face acute margin compression from fuel price spikes that
precede their ability to reprice their own products or services.

**DED-specific variant: Fuel Transition Bridge Loan (FTBL)**
- Eligibility: businesses with documented fuel cost as >15% of operating costs
- Amount: 6-month fuel cost differential (current price minus pre-crisis baseline)
- Purpose: bridge the cash flow gap while business restructures logistics or adjusts
  pricing to market; does not permanently subsidize fuel cost
- Conditionality: proceeds may not be used for fuel purchases at pre-crisis consumption
  levels — must demonstrate demand reduction plan (route optimization, modal shift,
  efficiency measures) as condition of loan
- Forgiveness: 50% forgiven if business achieves documented 20%+ fuel efficiency
  improvement within 18 months

---

### Drought — Phase 1

**Role:** Farm operators face a double bind in drought years: revenue collapses while
fixed costs (equipment loans, land lease, input contracts) continue. Crop insurance
settlements take 3–9 months. The gap destroys viable farming operations.

**DED-specific variant: Agricultural Bridge Loan (ABL)**
- Eligibility: farm operators in USDA drought-designated counties with documented
  yield loss >30% from prior 3-year average
- Amount: up to $250,000; sized to cover fixed costs for the gap period (90–270 days)
  between drought event and crop insurance settlement
- Term: 0% interest; repaid via crop insurance settlement proceeds (lender takes
  assignment of insurance settlement as collateral)
- Disbursement: coordinated with USDA FSA using existing Schedule F income documentation;
  5-day processing target

**Interaction with inverse crop yield bonds:** ABL provides immediate liquidity;
yield bonds provide longer-horizon risk transfer. A farm with both instruments has
near-complete income protection for a drought year — the ABL covers cash flow gaps;
the bond payout covers multi-year income loss.

---

### Shipping Blockade — Phase 2

**Role:** Businesses dependent on imported inputs (manufacturers, retailers, pharmaceutical
distributors) face input gaps during an extended shipping disruption. Some can source
alternatives; many cannot without capital to restructure supply chains.

**DED-specific variant: Supply Chain Restructuring Loan (SCRL)**
- Eligibility: businesses with documented >25% input cost increase or >15% input
  availability decline from shipping disruption
- Amount: 18 months of supply chain restructuring costs (alternative supplier development,
  domestic sourcing contracts, inventory buffer build)
- Conditionality: proceeds must be used for supply chain diversification (domestic sourcing
  or allied-nation substitution); not for restocking disrupted foreign supply at premium
- Term: 5 years; revenue-contingent repayment; 25% forgiven if domestic sourcing
  share increases by 20%+ within 24 months

---

### Financial Fragmentation — Phase 1

**Role:** Payment system disruption cuts off businesses from trade finance — the letters
of credit, receivables financing, and working capital lines that enable international trade
to function. Even domestically healthy businesses face liquidity crises if their customers
cannot pay and their suppliers cannot receive payment.

**DED-specific variant: Trade Finance Continuity Loan (TFCL)**
- Eligibility: businesses with documented receivables impairment from financial system
  disruption (payments not clearing; counterparty in sanctioned jurisdiction)
- Amount: up to 90-day receivables equivalent; provides working capital while payment
  system is restored
- Security: assignment of the impaired receivables as collateral; when payment system
  restores and receivables clear, loan repays automatically
- Term: 90-day maximum; extendable 90 days if disruption continues; converts to 24-month
  installment if receivables prove unrecoverable (counterparty default)

---

## 6. Targeting Variants

### Sector Targeting (DED Standard)
Pre-identified sectors by NAICS code enrolled in DED scenario-linked eligibility lists.
Activation is automatic for enrolled sectors; reduces processing time from weeks to hours.

### Size Targeting (Small Business Priority)
Evidence shows large businesses have greater access to capital markets and can survive
temporary disruption without government intervention. BSLs prioritize:
- Tier 1: 1–20 employees (most vulnerable; least banking access)
- Tier 2: 21–100 employees
- Tier 3: 101–500 employees
- Tier 4: 500+ employees (may access Main Street or bond markets; DED defers to private)

### Revenue Decline Threshold
Minimum revenue decline requirement prevents moral hazard (healthy businesses claiming
crisis support). DED standard: >25% documented revenue decline vs. prior 3-month average.
Verified via real-time sales tax or withholding data where available; self-certification
with sampling audit otherwise.

### Geographic Concentration (Distressed Community Priority)
DED ODRI-designated communities receive enhanced BSL terms (higher loan ceiling, longer
deferral, higher forgiveness fraction) because business failure in distressed communities
has amplified local multiplier effects — the local economic support network is thinner
and collapses faster.

### Essential Function Priority
Regardless of size, businesses providing essential functions (food supply, pharmaceutical
distribution, energy, water, telecommunications, emergency services supply chain) receive
priority processing and enhanced terms. Essential status aligns with CISA critical
infrastructure sectors.

---

## 7. Interaction Effects

### BSL + Stimulus Checks (Household and Business Simultaneously)
Households receiving stimulus maintain spending; businesses receiving BSLs maintain payroll.
The two instruments are complementary income floor programs at different levels of the
economic stack. Deployed together (CARES Act model), they prevent the demand collapse that
would otherwise follow from simultaneous household income and business revenue loss.

The critical sequencing: business BSLs should disburse *before* or *concurrent with*
household stimulus. If businesses close before households receive stimulus, the stimulus
money has no local businesses to absorb it.

### BSL + Strategic Contracts (Type A/B)
Government purchasing contracts (Type A for capacity readiness, Type B for co-investment)
are the demand-side complement to BSL supply-side support. A business receiving a BSL to
survive a disruption combined with a Type A readiness contract for the recovery period
has both the bridge capital and the forward revenue certainty — making the survival
investment rational without requiring speculative confidence in recovery.

### BSL + Retraining Programs
For businesses in structural transition (AI unemployment scenario), BSLs combined with
worker retraining programs produce superior outcomes to either alone:
- BSL provides capital for business model change
- Retraining programs retrain workers whose skills are being displaced within that business
- The business keeps its trained workforce (adapted) while the BSL funds the restructuring
- Net result: business survives and transforms; workers stay employed

### BSL + Price Controls
If price controls are in place during a supply shortage, businesses face margin compression
regardless of their own efficiency. BSLs paired with price controls must account for this:
loan sizing should reflect the controlled-price margin, not pre-crisis margin. Otherwise
businesses survive the crisis period but are insolvent at the moment price controls lift.

### BSL + Interest Rate Environment
High interest rate environments make private credit expensive. Government BSLs at 0% or
below-market rates are most valuable (largest subsidy) when private credit is most
constrained — which is exactly when crises occur. The subsidy element of a BSL is
countercyclical by design: zero in normal times; maximum value during crisis.

---

## 8. Measurement Framework

### Leading Indicators (Weeks 1–4)
- Application volume vs. eligible population (are distressed businesses finding the program?)
- Disbursement speed: target 72 hours for pre-enrolled; 5 business days for new applications
- Bank participation rate (for guarantee variant): what fraction of participating banks are
  making loans? Low participation signals program design problem.
- Initial employment reports: are borrowers maintaining payroll as required?

### Primary Metrics (Months 1–6)
- Business closure rate in targeted sector vs. non-BSL comparable group
- Employment retention rate (borrowers vs. comparable non-borrowers)
- Revenue recovery trajectory (monthly revenue as fraction of pre-crisis baseline)
- Loan utilization: are proceeds being used for qualifying purposes? (sample audit)
- Default rate vs. projections

### Lagging Indicators (Months 6–36)
- Business survival rate at 12, 24, 36 months (key metric: did the bridge actually bridge?)
- Employment at recovered businesses vs. pre-crisis (did they rebuild workforce?)
- Repayment rate under revenue-contingent structure
- Fraud rate: fraction of loans to ineligible businesses (OIG audit 12 months post-launch)
- Second-order: local economic activity (sales tax revenue, employment) in areas with
  high BSL penetration vs. comparable areas without

---

## 9. Risks and Failure Modes

### Moral Hazard — Zombie Business Problem
**Risk:** BSLs keep unviable businesses alive past their economic usefulness, delaying
necessary reallocation of labor and capital.

**Evidence:** Japan's "zombie lending" in the 1990s — banks extended loans to insolvent
businesses to avoid recognizing losses; resulted in a decade of economic stagnation.

**DED mitigation:**
1. Pre-crisis viability requirement: document that business had positive operating income
   in 2 of prior 3 years
2. Revenue-contingent repayment: businesses that don't recover repay less (forgiveness)
   but the loan *does* get forgiven — not extended indefinitely as zombie debt
3. 36-month maximum deferral: if revenue hasn't recovered to 80% of baseline in 36 months,
   remaining balance is forgiven AND the business exits the program (no further draws)

---

### Fraud and Identity Theft
**Risk:** Fraudulent applications; identity theft using legitimate business EINs; shell
companies created to capture funds.

**Evidence:** PPP fraud estimated at $64–100B (8–12%); EIDL fraud ~15%. Largest fraud
vectors: fictitious employees on payroll applications; EIN theft; businesses claiming
eligible status they didn't have.

**DED mitigation:**
1. Pre-enrollment with in-person verification for businesses >$100k (reduces EIN theft)
2. IRS withholding data cross-reference: claimed payroll must match W-2 submissions
3. Sampling audit: 10% random post-disbursement audit; 100% audit for loans >$1M
4. DOJ task force: pre-activated fraud prosecution unit staffed before program launches;
   known criminal rings deterred by immediate prosecution risk

---

### Crowding Out Private Credit
**Risk:** Government 0% loans displace private lending, reducing banks' incentive to
develop crisis lending infrastructure.

**Evidence:** Minimal in COVID programs; banks participated as intermediaries and
maintained relationships. Risk is larger in extended programs.

**DED mitigation:** BSLs are explicitly temporary and scenario-triggered. Permanent
0% lending would crowd out private credit; crisis-activated 0% lending simply fills
the gap that opens when private credit freezes (which it reliably does in crises).
DED explicitly plans exit: loans are repaid as revenue recovers; program closes when
scenario declaration is lifted.

---

### Underutilization (Main Street Failure Mode)
**Risk:** Program design is too complex or too slow for distressed businesses to access.

**Evidence:** Main Street Lending utilized only 3% of its $600B capacity.

**DED mitigation:** Pre-enrollment, automatic disbursement, bank-optional direct lending,
simple eligibility (revenue decline + sector match). DED BSL is explicitly designed to
be the opposite of Main Street: fast, automatic, simple, direct.

---

## 10. Cost Estimates

### Pandemic Phase 1 — EBCL (Essential Business Continuity)

| Parameter | Value |
|-----------|-------|
| Eligible businesses (essential sectors) | ~2–3M |
| Average 3-month fixed cost | ~$45,000 |
| Total program size | ~$90–135B |
| Expected default rate | ~8–12% |
| Expected forgiveness (employment maintained) | 70–80% of loans |
| Net fiscal cost (default + forgiveness) | ~$70–110B |
| Comparison: PPP cost | $793B (7–10× larger; unfocused) |

---

### Oil Restriction Phase 1 — FTBL (Fuel Transition Bridge)

| Parameter | Value |
|-----------|-------|
| Eligible businesses (fuel-intensive) | ~500k–1M |
| Average 6-month fuel cost differential | ~$25,000 |
| Total program size | ~$12.5–25B |
| Expected default rate | ~5–8% |
| Forgiveness (20% efficiency improvement) | 50% of qualifying loans |
| Net fiscal cost | ~$6–12B |

---

### Drought Phase 1 — ABL (Agricultural Bridge)

| Parameter | Value |
|-----------|-------|
| Eligible farm operators (drought-designated county, >30% loss) | ~500k–1M |
| Average bridge loan | ~$75,000 |
| Total program size | ~$37–75B |
| Recovery via insurance settlement assignment | ~85% |
| Net fiscal cost | ~$5.5–11B |

---

### Full National Crisis (Pandemic or Shipping Blockade Tier 2)

| Scale | Cost |
|-------|------|
| DED pre-authorized capacity | $500B |
| Expected utilization in Tier 2 event | $150–300B |
| Net fiscal cost (default + forgiveness) | $50–120B |
| Comparison: PPP + EIDL combined | $1.17T (higher cost; broader scope; less targeted) |

---

## Pre-Built Requirements

- [ ] **Business enrollment database:** SBA maintains pre-verified eligibility records for
  critical sector businesses; updated quarterly; contains bank account and EIN for
  direct disbursement. Target: 5M businesses enrolled pre-crisis.
- [ ] **Revenue data pipeline:** IRS/Treasury real-time access to business sales tax
  submissions and payroll withholding to verify revenue decline without waiting for
  annual tax filings. 30-day lag maximum.
- [ ] **Direct disbursement infrastructure:** SBA direct lending portal capable of
  processing 100k applications/day and disbursing within 72 hours. Requires
  $1.5–2B in IT investment (partially funded via SBA modernization).
- [ ] **Revenue-contingent repayment system:** IRS automatic monitoring of enrolled
  borrowers' quarterly estimated payments; triggers repayment when revenue threshold
  met. No manual process.
- [ ] **Fraud prosecution pipeline:** Pre-activated DOJ small business fraud task force;
  referral protocol with SBA OIG; accelerated prosecution of flagged cases in first
  90 days to deter mass fraud.

---

## Related Tools
- [stimulus-checks.md](stimulus-checks.md) — household-level complement; both deployed simultaneously in major crises
- [tax-advance-loans.md](tax-advance-loans.md) — semi-annual TRAL for household income bridge; structural companion
- [strategic-contracts.md](strategic-contracts.md) — Type A/B demand-side complement; government as anchor buyer for recovering businesses
- [outcome-linked-bonds.md](outcome-linked-bonds.md) — market-based hedge instrument for agricultural businesses
- `retraining-programs.md` *(planned)* — workforce component for AI transition BMTL
