# DED Tool Analysis: Job Posting Accountability Penalty

**Category:** Labor Market Integrity / Human Capital Development
**Last Updated:** 2026-05
**Relevant Scenarios:** AI Unemployment (primary), all scenarios requiring accurate labor market signals
**Related Tools:** [workforce-development-floor.md](../proposal/workforce-development-floor.md) |
  [internship-floor.md](internship-floor.md) | [retraining-programs.md](retraining-programs.md)
**DED Tool Rating:** Tier B — Corrective; addresses a market integrity failure that distorts the
  labor market signals DED depends on for accurate scenario modeling

---

## 1. The Problem: Ghost Jobs and the Labor Market Mirage

The U.S. labor market operates on an information asymmetry that systematically disadvantages
job seekers, distorts policy analysis, and produces false signals about the skills gap.

**Ghost jobs** are job postings that employers publish with no genuine near-term intent to
fill them. They are not outliers. Multiple employer surveys and job platform analyses from
2023–2025 estimate that **40–50% of active job postings at large U.S. employers at any given
time are not associated with an active, funded, approved hiring process.** Employers post
for a range of reasons that have nothing to do with imminent hiring:

- **Resume harvesting:** Building a passive candidate database for roles that may open later
- **Market benchmarking:** Determining prevailing wage ranges without committing to hire
- **Signaling:** Presenting as a growing, hiring organization to investors, customers, or press
- **Contingency posting:** Holding a posting open in case a current employee leaves
- **Internal process delays:** Position approved by department but frozen by finance or
  headcount management; posting stays active as a placeholder

The consequences fall entirely on job seekers:

- A job seeker applies to a posted position, completes screening, prepares for interviews,
  and receives no response — because no hiring manager has been assigned and no process exists
- Labor economists and policy analysts reading aggregate job posting data as a proxy for
  labor demand are reading a number that is 40–50% inflated by positions that are not
  genuinely open
- DED's National Economic Intelligence Dashboard, which tracks labor market conditions across
  scenario categories, is reading the same inflated signal — overestimating labor market
  tightness and underestimating structural displacement

**The skills gap narrative** is partly a ghost job artifact. When employers report that they
cannot fill positions, a meaningful fraction of those unfilled positions were never funded,
never assigned a hiring manager, and never genuinely open. The skills gap — to the extent
it is real — is smaller than reported. The labor market — to the extent it is tight — is
looser than the posting count suggests.

**Scale of the problem:**
- Approximately 9–11 million job postings active on major U.S. platforms at any given time
- If 40–50% are ghost jobs: 3.6–5.5 million postings that are not genuine
- Job seekers spend an average of 100–200 hours per active search cycle applying to positions
  that are not genuine open roles — aggregate waste at scale is tens of billions of hours
  annually of job seeker time

---

## 2. Policy Mechanism: The Job Posting Accountability Penalty (JPAP)

### Core Mechanism

Any covered employer that publishes a job posting that remains unfilled and active for more
than **180 days** must either:

**(a) Fill the position** — the role is offered to a candidate and either accepted or declined
**(b) Withdraw the posting** — the role is officially closed with a documented reason
**(c) Pay the Job Posting Accountability Penalty** — a per-posting fee for each additional
  period the posting remains active and unfilled past the 180-day threshold

The penalty creates a simple economic forcing function: if you are genuinely trying to fill
a role, fill it. If you are not genuinely trying to fill it, stop posting it. If you insist
on posting a role you do not intend to fill, pay for the cost you are imposing on job
seekers and the market.

### Covered Employers

Same threshold as the Workforce Development Floor: **private sector employers with ≥100 FTE.**

Rationale for alignment: these are employers large enough to maintain a formal HR function,
to use centralized applicant tracking systems, and to have the institutional capacity to
track and manage job postings. Below 100 employees, posting behavior is more ad hoc and
the compliance burden would be disproportionate.

**Federal government:** Not covered under the initial legislation. Federal hiring is governed
by OPM, has separate accountability mechanisms, and presents different constitutional issues.
A parallel OPM directive is recommended.

### The 180-Day Threshold

Six months is the natural policy threshold for several reasons:

- **Legitimate hard-to-fill roles:** Some genuine positions — specialized engineers,
  executive roles, niche technical functions — genuinely take 4–6 months to fill even
  when actively pursued. A 180-day threshold gives legitimate searches full runway.
- **Seasonal hiring:** Many industries have genuine hiring windows; a posting that spans
  one hiring cycle (90–120 days) plus a buffer should reach 180 days only if the search
  is genuinely stalled or insincere.
- **ATS data:** Most enterprise applicant tracking systems natively report time-to-fill by
  requisition. 180-day tracking imposes no new data infrastructure for employers using
  standard systems (Workday, Greenhouse, iCIMS, Lever, SAP SuccessFactors).

---

## 3. Penalty Rate Design

### Baseline Penalty

**$500 per posting per 30-day period** after the 180-day threshold is crossed, until the
posting is filled or withdrawn.

For a large employer with 100 ghost postings that persist for 12 months past the threshold:
- $500 × 12 months × 100 postings = **$600,000/year**

This is meaningful — it exceeds the cost of assigning a recruiter to actually fill those
roles — but not punitive enough to create significant distress for a large employer that
has genuine compliance challenges.

**Escalating provision:** Postings that persist more than **365 days** past the threshold
escalate to $1,500/posting/30-day period. This addresses the chronic ghost posting problem —
postings that have been live for 18+ months with no activity.

### Why a Flat Fee Rather Than Salary-Scaled

**Option considered:** Scale the penalty to the posted salary (e.g., 0.5% of posted annual
salary per 30 days). A posting for a $200k engineering role would generate $1,000/month;
a posting for a $40k administrative role would generate $200/month.

**Reason rejected as primary mechanism:** Salary-scaling creates a perverse incentive to
post roles with artificially low listed salaries (or omit salary entirely) to minimize
penalty exposure, worsening salary transparency. The flat fee avoids this; salary
transparency requirements (see Variant D below) are addressed separately.

**Option available as Variant B** for employers that want to pay a salary-scaled alternative
instead of the flat fee — this is described in Section 5.

---

## 4. Compliance, Reporting, and Exemptions

### Reporting Infrastructure

**No new registration system required.** The policy operates through:

1. **Job posting platform disclosure:** Major platforms (LinkedIn, Indeed, Glassdoor,
   ZipRecruiter, and any platform with >1M monthly U.S. postings) are required to
   report posting age and employer-reported status to the Department of Labor monthly.
   Platforms already have this data for their own analytics.

2. **Employer ATS self-certification:** Employers with 1,000+ FTE must certify annually
   via EEO-1 supplement: total postings active >180 days, postings withdrawn vs. filled
   vs. penalty-paid, and fill rate by category.

3. **DOL audit authority:** Random audit of 5% of covered employers annually; enhanced
   audit of employers with fill rates below 40% on 180+ day postings.

### Exemptions — What Does Not Trigger the Penalty

**1. Evergreen roles.** Positions that are genuinely open on a rolling basis because
   of continuous turnover are exempt if the employer can document:
   - The role classification (must be explicitly designated as "Evergreen" on the posting)
   - Minimum one hire per 90-day period in that role category in the prior 12 months
   - A documented fill rate for the evergreen category

   *Examples:* Registered nurses at hospital systems, retail associates at large chains,
   seasonal warehouse workers. Evergreen designation must be pre-approved by DOL sector
   classification registry. Employers may not self-designate; misuse of the evergreen
   exemption is treated as evasion with 3× penalty.

**2. Role withdrawn within 30 days of threshold.** An employer that closes a posting before
   day 210 (180 days + 30-day grace period) with a documented reason faces no penalty.
   Documented reasons accepted: position eliminated, filled internally, budget frozen,
   requisition closed pending reorg.

**3. Positions under active offer process.** A posting is compliant if the employer can
   document that as of the 180-day mark, at least one candidate has received a written
   offer. The offer may still be under negotiation; the posting may remain active as a
   backup.

**4. Roles where the posting was opened by a staffing agency or third-party recruiter**
   without the employer's awareness. Employers must maintain reasonable oversight of
   third-party posting activity; wilful ignorance is not a defense, but documented
   unauthorized posting by a third party is a mitigating factor.

**5. Financial distress exemption.** Employers in Chapter 11 or with 2 consecutive years
   of documented operating losses are exempt — a frozen requisition at a distressed company
   is a financial management reality, not labor market manipulation.

**6. Force majeure.** Roles that became unfillable due to a DED-declared economic emergency,
   pandemic declaration, or natural disaster during the posting period are exempt for the
   duration of the declared event.

### What Is Not an Exemption

- "We couldn't find the right candidate." The penalty is not for failing to hire — it is
  for failing to either hire or close the posting. Employers who cannot find qualified
  candidates after 180 days have two compliant options: close the posting, or keep it
  open and pay the fee.
- "The role is approved but headcount is frozen." A headcount freeze is a decision to not
  hire. A posting for a role where headcount is frozen is a ghost job by definition.
- "We are building a pipeline." Pipeline building is legitimate recruitment strategy.
  Posting a specific job requisition with a specific compensation range as a pipeline
  tool — rather than posting a "talent community" or "future openings" category — is
  misrepresentation of an open role.

---

## 5. Policy Variants and Trade-offs

### Variant A: Baseline Flat Penalty (Recommended Primary Design)

**Structure:** $500/posting/30-day period after 180 days; escalates to $1,500 after 365 days past threshold.

**Pros:**
- Simple to administer and understand
- Imposes a clear economic cost on ghost posting without being confiscatory
- Does not create perverse salary-transparency incentives
- ATS-compatible — most systems can generate 180-day aging reports automatically

**Cons:**
- $500/month may be trivially small for Fortune 500 employers with large HR budgets;
  a company that wants to maintain a ghost posting pipeline for strategic reasons may
  simply treat the fee as a cost of doing business
- Flat fee does not scale with the economic harm caused — a ghost posting for a $300k
  executive role imposes more market distortion than one for a $35k entry role

**Best for:** Baseline compliance incentive; establishing the norm that job postings must
reflect genuine open roles.

---

### Variant B: Salary-Scaled Penalty (Optional Alternative)

**Structure:** Employer may elect to pay a salary-scaled penalty instead of the flat fee:
1.0% of the posted annual salary per 30-day period past the 180-day threshold. Employer
elects salary-scaled or flat-fee at fiscal year start; election holds for 12 months.

**Salary-scaled examples:**
| Posted Salary | Monthly Penalty (Year 1) | Monthly Penalty (Year 2+) |
|--------------|--------------------------|---------------------------|
| $35,000 | $350/month | $350/month (capped at flat) |
| $75,000 | $750/month | $1,500/month |
| $150,000 | $1,500/month | $3,000/month |
| $300,000 | $3,000/month | $6,000/month |

**Pros:**
- Scales the cost with the economic harm — a ghost executive posting imposes more damage
  to high-level job seekers' time than a ghost entry-level posting
- Creates stronger incentives to fill or close high-compensation roles that are commonly
  used for market benchmarking

**Cons:**
- Creates an incentive to suppress posted salary ranges to minimize penalty exposure,
  working against salary transparency goals
- More complex to administer; requires salary disclosure as a prerequisite for enforcement
- May not apply to the majority of postings that omit salary information (currently ~50%
  of postings on major platforms do not include salary)

**Best for:** High-compensation role categories (executive, specialized engineering) where
the benchmarking/signaling motivation is strongest and the harm to job seekers is highest.
Could be applied as a mandatory variant only for roles with posted salaries above $150k.

---

### Variant C: Reporting-Only with Public Disclosure (No Penalty)

**Structure:** No financial penalty. Employers with ≥100 FTE are required to report annually:
- Total job postings active at any point during the year
- Fill rate (postings resulting in a hire)
- Median time-to-fill for filled roles
- Percentage of postings active >180 days at time of closure/fill

Results are published in a public DOL registry, searchable by employer and sector. Employers
with fill rates below 50% on 180+ day postings receive a "Low Fill Rate" designation visible
to job seekers on all major platforms.

**Pros:**
- No financial penalty reduces employer opposition dramatically; much easier to pass
- Transparency itself creates market pressure — job seekers can filter by employer fill rate
- Creates the data infrastructure for a future penalty without requiring upfront enforcement
- Reputational cost for employers with genuinely poor posting practices may exceed the
  financial cost of a modest penalty

**Cons:**
- Reputational pressure is diffuse; large employers with strong brands (Amazon, Google,
  Goldman Sachs) can sustain low fill rate designations without meaningful consequence
- Does not directly address the financial incentive to maintain ghost postings
- Creates data but not behavioral change at companies that do not care about job seeker perception
- A "name and shame" approach requires political will to maintain in the face of employer lobbying

**Best for:** First phase of implementation — establish the reporting infrastructure and
demonstrate the scale of the ghost job problem with real data before introducing a penalty.
This is the politically viable entry point that creates the constituency for Variant A.

---

### Variant D: Salary Transparency Integration

**Structure:** The penalty in Variant A applies at enhanced rate (2×) to any posting that:
(a) does not disclose a salary range, AND (b) remains active past the 180-day threshold.

**Rationale:** Ghost jobs are more likely to omit salary information (they are not intended
to attract candidates who will negotiate). Linking the posting penalty to salary transparency
creates aligned incentives: if you are posting a real job, say what it pays and fill it.

**Pros:**
- Advances two policy goals simultaneously (ghost job reduction + salary transparency)
- Creates a strong incentive to include salary information without mandating it
- Reflects the actual pattern of ghost jobs (salary-omitting postings are disproportionately
  not genuine open roles)

**Cons:**
- May be characterized as a de facto salary disclosure mandate — generating opposition from
  employers who view salary transparency legislation as a separate and distinct political battle
- Adds complexity to what should be a simple compliance mechanism
- Creates an adversarial framing that could doom the primary ghost job policy in coalition
  with opposition to salary disclosure

**Best for:** States or cities pursuing salary transparency alongside ghost job reform, where
both goals have political momentum. Not recommended as a federal first-pass design.

---

### Variant E: Good-Faith Search Standard with Penalty Waiver

**Structure:** Employers who can document a good-faith search process are fully exempt from
the penalty, regardless of whether the role is filled. A good-faith search is defined as:
- Minimum 10 candidates reviewed (application or screen) per open requisition per 90-day period
- At least 2 candidates advanced to substantive interview stage per open requisition
- Documented outreach to at least one external recruiting channel (agency, platform, university)

Employers who document good-faith search receive a penalty waiver for the relevant posting.
Employers who cannot document it pay the standard penalty.

**Pros:**
- Directly addresses the legitimate "hard-to-fill" scenario: a company searching genuinely
  for a specialist role it cannot fill should not be penalized at the same rate as a company
  maintaining a fake posting
- Creates an affirmative compliance pathway that gives employers control over their exposure
- Focuses enforcement on the genuinely problematic behavior (no search activity whatsoever)
  rather than the outcome (failure to hire)

**Cons:**
- Introduces significant administrative complexity — who reviews the good-faith documentation?
  DOL audit staff would need to evaluate millions of requisition records
- Creates documentation gaming: companies can manufacture minimal search activity to qualify
  for the waiver without genuinely pursuing the role
- "10 candidates reviewed" is a low bar that companies can easily clear with algorithmic
  resume screening even for ghost postings

**Best for:** An appeals/waiver mechanism attached to Variant A, not as a primary design.
Allow employers penalized under Variant A to appeal and demonstrate good-faith search for
a 50% penalty reduction — not a full waiver.

---

### Variant F: Tax Credit Offset for Actual Hires

**Structure:** Instead of (or in addition to) a penalty for unfilled postings, employers
receive a tax credit for each qualifying hire made within 90 days of posting:
- $1,500 credit per hire from an economically distressed area (ODRI Tier 1 or 2)
- $1,000 credit per hire of a worker with no prior employment in the 12 months preceding hire
- $500 credit per hire of any applicant, tiered by how quickly the role was filled (90-day
  fill earns full credit; 91–180 days earns 50%)

**Pros:**
- Incentive-based rather than penalty-based — politically easier to pass
- Directly rewards the desired behavior (rapid, genuine hiring) rather than punishing
  the undesired behavior (ghost posting)
- Can be targeted to workforce equity goals (distressed area hiring, long-term unemployed)
- No administrative burden on employers who behave as intended

**Cons:**
- Does not penalize ghost posting at all — only rewards genuine hiring
- Employers who are posting genuinely and filling roles already receive the benefit;
  ghost posters simply do not claim the credit, which is their current behavior anyway
- The credit is a federal spending item; Variant A generates revenue. Fiscal baseline
  is different.

**Best for:** Companion policy to Variant A — pair the penalty on ghost posting with the
credit for rapid genuine hiring. The combination creates both a stick and a carrot.

---

## 6. Implementation Phasing

### Phase 0 — Reporting Infrastructure (Year 0–1)

- DOL issues rule establishing job posting reporting requirements for major platforms
  (>1M monthly U.S. postings) — reporting age distribution, employer fill rates
- DOL builds public employer fill-rate registry
- EEOC updates EEO-1 reporting to include posting age and fill rate self-certification
  for 1,000+ FTE employers
- No penalties in Phase 0 — data collection only (Variant C mode)
- Annual public report: national job posting fill rate by sector, company size, region

### Phase 1 — Soft Launch (Year 2)

- Penalty activates for employers ≥5,000 FTE only (largest employers with most
  sophisticated ATS infrastructure and lowest compliance burden)
- Evergreen role designation registry opens; employers submit Evergreen classifications
  for DOL approval
- DOL publishes sector-level ghost job estimates using Phase 0 data
- Variant F tax credits available to all covered employers

### Phase 2 — Full Implementation (Year 3)

- Penalty expands to all covered employers (≥100 FTE)
- Good-faith appeal process (Variant E mechanism) operational
- Salary transparency enhancement (Variant D) activates as optional state-level add-on
  in states that have enacted salary disclosure requirements
- DOL publishes annual employer fill-rate rankings; "ghost employer" designations visible
  on major platforms

### Phase 3 — Evaluation (Year 5)

- GAO audit: did ghost posting rates decline? Did genuine open roles increase? Did
  job seeker time-per-successful-hire decline?
- Penalty rate adjustment based on evidence: if ghost posting persists, escalate;
  if fill rates have normalized, consider reduction
- International comparison with jurisdictions that have implemented posting accountability
  requirements (EU AI Act job posting transparency provisions are relevant precedents)

---

## 7. DED Integration

### Labor Market Intelligence Signal Improvement

The DED's National Economic Intelligence Dashboard monitors labor market conditions as a
leading indicator across every scenario category. Ghost job inflation is a systematic bias
in that signal. The Job Posting Accountability Penalty, combined with employer fill-rate
reporting, generates the data infrastructure to measure and correct for ghost job inflation
in real time.

**Specific improvement:** The DED's Occupational Disruption and Retraining Index (ODRI),
which identifies sectors with high AI displacement risk, currently uses job posting volume
as one input. Ghost posting inflates apparent demand in sectors that are actually
contracting. Post-JPAP, the ODRI's demand-side inputs become significantly more accurate.

### Workforce Development Floor Alignment

The Workforce Development Floor and Job Posting Accountability Penalty are designed to
work together as two sides of the same labor market integrity framework:

- **Workforce Development Floor (supply side):** Large employers must maintain minimum
  entry-level development positions — ensuring the labor pipeline is fed at the bottom
- **Job Posting Accountability Penalty (demand side):** Large employers must post genuine
  open positions — ensuring the labor market signal is accurate

Together they address the two most common employer behaviors that distort the entry-level
labor market: eliminating development pathways (WDF) and inflating apparent demand (JPAP).

**Cross-policy interaction:** Employers who are both WDF-compliant AND JPAP-compliant
(fill rate above 60% on 180+ day postings) receive an enhanced DED Partnership tier —
recognition that they are maintaining both the pipeline and the market integrity that the
pipeline depends on.

### AI Unemployment Scenario

In a DED-declared AI Unemployment emergency (Tier 1 or 2), ghost job inflation becomes
a critical policy failure. If displaced workers are applying to postings that do not
represent genuine opportunities, retraining resources are misdirected and labor market
recovery signals are delayed.

During an active AI Unemployment declaration, the JPAP threshold tightens to **90 days**
(rather than 180) and penalties escalate to $1,000/posting/30-day period. This is the
emergency version of the policy: when the labor market is under active stress, the cost
of market misinformation is higher and the policy response must be stronger.

---

## 8. Interaction Effects and Risks

### Employer Gaming: Rapid Open-Close Cycling

**Risk:** Employers respond by closing postings before 180 days and immediately re-posting,
effectively resetting the clock with no genuine search activity.

**Mitigation:** The policy tracks postings by **role classification and employer**, not just
posting ID. A position with the same job title, same department, and same level posted by
the same employer within 60 days of a prior close of the same role is treated as a
continuation of the prior posting for penalty clock purposes. ATS systems maintain this
data by requisition lineage; the DOL reporting requirement captures it.

### Employer Response: Fewer Postings, Less Transparency

**Risk:** Employers respond by simply posting fewer jobs publicly, relying more heavily on
internal referrals, headhunters, and passive recruiting — reducing market transparency
for job seekers without connections.

**Assessment:** This is a real trade-off and the most significant objection to the policy.
If the penalty causes employers to shift from public posting to private recruiting, the
labor market becomes less accessible to workers without networks — the opposite of the
policy's intended equity effect.

**Mitigation:** The evergreen and good-faith exemptions provide adequate runway for genuine
roles. Employers who are posting real jobs have nothing to fear from the policy. The
employers likely to reduce public posting in response are those currently using public
posting as a passive candidate pipeline tool — a behavior that the policy is explicitly
designed to price. The net effect on job seeker access to genuine open roles may be
positive (fewer fake postings, better signal) even if total posting volume declines.

**Monitoring requirement:** The Phase 0 and Phase 1 data collection must include tracking
of job posting volume trends, referral hire rates, and time-to-hire — to measure whether
the policy is improving or degrading labor market accessibility.

### Platform Enforcement Challenge

**Risk:** Employers avoid penalty by using multiple smaller platforms, none of which exceeds
the reporting threshold, and rotating postings across platforms to avoid 180-day detection.

**Mitigation:** The DOL reporting requirement applies to employers, not platforms — employers
self-certify their total posting portfolio regardless of which platforms they use. Platform
reporting (for platforms above the threshold) is supplementary verification, not the primary
compliance mechanism.

---

## 9. Revenue Estimate

At full implementation (Year 3+):

| Scenario | Ghost Postings Subject to Penalty | Average Months Past Threshold | Revenue |
|----------|----------------------------------|-------------------------------|---------|
| Conservative (30% compliance, 10% of remaining pay penalty) | ~1.5M postings | 4 months avg | ~$3B/year |
| Base case (50% compliance, 20% residual pay penalty) | ~900k postings | 5 months avg | ~$2.25B/year |
| High enforcement (70% compliance, 10% residual) | ~450k postings | 3 months avg | ~$675M/year |

Revenue paradox: as the policy succeeds (ghost posting declines), revenue declines.
This is the correct outcome — revenue is not the goal, behavioral change is. Revenue
should be dedicated to the DED Position Marketplace and employer compliance assistance
programs, not treated as a permanent revenue stream.

---

## 10. Legislative Vehicle

**Primary vehicle:** Amendment to the Fair Labor Standards Act, adding Section 14(e):
"Employer Job Posting Accountability Standards." Alternatively, a standalone Job Posting
Transparency and Accountability Act.

**Constitutional authority:** Commerce Clause — job postings are commercial communications
affecting interstate commerce; the penalty is a regulatory fee, not a tax, and does not
require revenue treatment.

**DOL implementing authority:** FLSA enforcement infrastructure (Wage and Hour Division)
already handles employer-level audits and civil penalties. Adding job posting compliance
to WHD's mandate requires no new agency creation.

**State preemption:** The federal policy sets a floor; states may adopt stricter requirements.
States that have enacted salary transparency legislation (CO, NY, CA, WA, IL) are the
natural early adopters for Variant D.

---

## Cross-References

- `ded/proposal/workforce-development-floor.md` — companion supply-side tool; both address
  entry-level labor market failures from different angles
- `ded/tools/internship-floor.md` — the pipeline WDF creates; JPAP ensures that pipeline
  feeds real open roles, not ghost postings
- `ded/scenarios/ai-unemployment/phase-1-triage-and-stabilization.md` — emergency JPAP
  threshold tightening during Tier 1/2 declaration
- `ded/scenarios/ai-unemployment/ai-job-creation.md` — JPAP improves the ODRI demand-side
  signal that identifies where AI-created jobs are genuinely forming
- `ded/framework/methodology.md` — DED economic-first doctrine: JPAP is a market integrity
  tool, not a jobs mandate
