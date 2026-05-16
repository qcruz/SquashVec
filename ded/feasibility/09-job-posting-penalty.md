# Feasibility Analysis: Job Posting Accountability Penalty

**Source:** `ded/tools/job-posting-penalty.md`
**Last Updated:** 2026-05
**Standalone Mode:** Yes — administrable by DOL/EEOC without DED. DED integration
  (NEID signal improvement, AI unemployment threshold tightening) is an enhancement,
  not a prerequisite.

---

## Feasibility Ratings

| Dimension | Rating | Summary |
|-----------|--------|---------|
| Legal / Constitutional | **Strong** | FLSA amendment or standalone act; Commerce Clause authority for employer conduct in interstate commerce; penalty is a regulatory civil penalty (not a taking); EEO-1 reporting infrastructure already established |
| Administrative | **Moderate** | Requires platform reporting (new obligation for major job platforms); employer self-certification (EEO-1 extension); DOL audit function expansion; the evergreen role designation registry is the novel administrative element |
| Economic | **Strong** | Near-zero federal cost; estimated $675M-$3B/year in penalty revenue at full implementation; revenue paradox (success reduces revenue); primary benefit is information quality, not fiscal |
| Political | **Moderate** | Employer opposition (any new reporting obligation); job platform opposition (reporting requirement); however, the "ghost job" problem is well-documented in public discourse and the policy is easy to explain; no natural partisan home but labor-aligned Democrats and business-transparency Republicans can both support |
| Implementation | **Strong** | Phased rollout (reporting first, then penalty) is the correct approach and is straightforward; technology exists; ATS platforms already track posting age; DOL Wage and Hour Division is the natural enforcer |
| International Precedent | **Weak** | No directly comparable policy exists anywhere; EU AI Act has job posting transparency provisions but not a penalty for unfilled roles; this is a genuinely novel policy instrument without tested international precedents |

**Overall Implementation Readiness: Ready (reporting phase) / Conditional (penalty phase)**
*The reporting phase (Variant C) can be implemented immediately through DOL rulemaking
without legislation — major job platforms can be required to report aggregate posting
age and fill rate data as a condition of operating at scale in the U.S. labor market.
The penalty phase requires FLSA amendment. The phased approach (report first, legislate
penalty once data confirms the problem's scale) is politically optimal.*

---

## Legal / Constitutional Analysis

### FLSA Amendment Authority
See WDF feasibility analysis — the FLSA framework for employer conduct requirements is
well-established. A job posting accountability standard (fill or close within 180 days,
or pay a penalty) is a conduct requirement within Congress's Commerce Clause authority.

**Key distinction from WDF:** The WDF creates an affirmative obligation (maintain positions).
The JPAP creates a conditional obligation (if you post, either fill or close within 180 days,
or pay). The conditional obligation has a lower legal threshold to clear because it does not
require employers to take any affirmative action beyond what they are already doing
(posting jobs). It only prices the duration of inaction.

### Platform Reporting Obligation
Requiring major job platforms (>1M monthly U.S. postings) to report aggregate posting
age and employer fill rate data to DOL can be framed as:
- A condition of using the interstate communications infrastructure (Commerce Clause)
- A labor market transparency requirement under existing DOL data collection authority
- A reporting requirement parallel to financial data requirements on securities exchanges

The strongest authority is the FTC's commercial surveillance rules and DOL's existing
labor market data collection authority. A DOL rulemaking — not legislation — can establish
the platform reporting requirement for the largest platforms.

### Employer Affiliate Group Rule
The anti-gaming provision (subsidiary networks below 100 FTE treated as a single employer)
is a well-established IRS concept (affiliated group) applied in a new context. The IRS
already determines affiliated group status for tax purposes; DOL would use the same
definition. No novel legal theory required.

---

## Administrative Feasibility

### DOL Wage and Hour Division Capacity
The WHD currently enforces FLSA minimum wage and overtime requirements for approximately
7.5 million employers with 150+ million employees. Adding job posting accountability
enforcement for approximately 112,000 qualifying employers (100+ FTE) is a meaningful
but not overwhelming expansion of WHD's enforcement portfolio.

**Incremental staffing estimate:** 200-400 additional WHD investigators and 50-100
administrative staff for the JPAP program at full implementation. Cost: $25-45M/year.

**Technology:** WHD enforcement currently uses the Enforcement and Case Management System
(ECM). Adding a JPAP case management module requires IT work but not a new system.

### Platform Reporting Infrastructure
The major job platforms (LinkedIn, Indeed, Glassdoor, ZipRecruiter, Monster) already
track posting age for their own analytics. Reporting this data to DOL requires:
- An API integration to a DOL data collection endpoint (standard technology)
- Data standardization (defining "posting," "filled," "withdrawn")
- Legal safe harbor for reporting (platforms should not face liability for reporting data
  that reveals an employer's ghost posting pattern)

The DOL's Bureau of Labor Statistics already collects data from many of these platforms
for the Job Openings and Labor Turnover Survey (JOLTS). A JPAP reporting requirement
is an extension of JOLTS reporting — the infrastructure and relationships exist.

### Evergreen Role Designation Registry
The most novel administrative element is the Evergreen Role Registry — a DOL database
of employer-submitted evergreen role designations. Requirements:
- Employer submits role category, supporting fill rate documentation (minimum 1 hire/90 days
  in the prior 12 months), and NAICS classification
- DOL reviews and approves or denies within 30 days
- Registry is public: employers cannot secretly claim evergreen status
- Annual renewal with updated fill rate documentation

**Build cost:** $5-15M for the registry system; $2-5M/year for maintenance and review.
Straightforward government IT project.

---

## Economic Analysis

### Labor Market Efficiency Gains

The primary economic benefit of the JPAP is not fiscal — it is information quality.
Ghost jobs impose several measurable economic costs:

**Job seeker time waste:** If 40-50% of 10M active postings are ghost jobs, and each
receives an average of 20 applications, approximately 80-100M applications are submitted
to non-genuine roles annually. At an estimated 3-5 hours per application (resume tailoring,
cover letter, application process), the aggregate job seeker time waste is 240-500M
hours/year. At the average job seeker's hourly wage ($25-35/hour), this is $6-17.5B/year
in wasted human capital.

**DED signal quality:** The NEID's labor market indicators are partially based on job
posting volume (JOLTS uses job postings as a proxy for labor demand). Ghost job inflation
overstates labor demand by 40-50%, causing policy to be calibrated to a labor market
that is looser than the data suggests. The JPAP corrects this signal, improving the
accuracy of every DED program that depends on accurate labor market data.

**Skills gap measurement:** The "skills gap" — employers reporting inability to fill roles
with qualified candidates — is partially an artifact of ghost posting. Roles that are
posted but never intend to be filled cannot be filled by any candidate. Removing ghost
postings from the skills gap measurement will show that the genuine skills gap is smaller
than currently reported, directing workforce development investment more accurately.

### Revenue Projection

Revenue estimates from the tool document:
- Conservative: $675M/year (70% compliance rate)
- Base case: $2.25B/year (50% compliance rate)
- High enforcement: $3B/year (30% compliance rate)

Revenue should be dedicated to DED Position Marketplace infrastructure and DOL
workforce compliance assistance programs — treating it as a permanent revenue stream
creates a perverse incentive to maintain ghost posting behavior.

---

## Political Analysis

### The Ghost Job Problem is Well-Known

Unlike many labor market policy proposals, the ghost job problem has substantial public
awareness. Multiple employer surveys (Resume Builder, MyPerfectResume) have received
significant media coverage documenting that 40-50% of employers admit to posting roles
they don't intend to fill. The Washington Post, New York Times, and Wall Street Journal
have all covered the ghost job phenomenon. The JPAP addresses a problem that is:
- Already understood by most job seekers (who have experienced it personally)
- Publicly documented (employer self-report data)
- Bipartisan in its impact (it affects all job seekers regardless of political identity)

This is an unusually favorable political environment for a new labor market regulation.

### Coalition Map

**Supportive:**
- Job seekers and labor advocacy organizations (the primary victims of ghost posting)
- State workforce development agencies (ghost job inflation distorts their labor market
  analysis and misdirects retraining investment)
- Honest employers with genuine open roles (they benefit from reduced signal noise; their
  genuine postings are not buried in ghost job volume)
- DED/economic planning community (signal quality improvement)
- Academic labor economists (ghost job inflation has been flagged as a measurement problem
  in JOLTS data for years)

**Opposed:**
- Major employers that use ghost posting for resume harvesting and market benchmarking
  (the program's explicit targets; their opposition is expected and manageable)
- Job platforms that monetize ghost postings (LinkedIn, Indeed, Glassdoor charge per
  posting or per month; ghost postings are revenue; a penalty that reduces ghost posting
  reduces platform revenue)
- HR technology vendors (ATS systems that optimize for volume of postings rather than
  quality of outcomes)

### Platform Opposition Mitigation
Job platforms that oppose reporting requirements can be engaged through the following:
- Reporting requirements apply to employers, not platforms (platforms report as a
  verification mechanism, not as the primary compliance party)
- Reduced ghost posting may increase the value of genuine postings (signal quality
  improvement benefits the platforms' most-engaged users)
- Platforms can offer "JPAP-compliant" badging to employers with high fill rates —
  a new product feature that turns the regulation into a market differentiator

---

## Implementation Timeline

| Phase | Duration | Milestones |
|-------|----------|------------|
| DOL rulemaking (reporting only) | 12-18 months | Proposed rule for platform reporting; employer EEO-1 supplement update; public comment period |
| Phase 0 (reporting active) | Year 2-3 | Posting age and fill rate data collected; first annual public employer fill-rate report; no penalties |
| Legislation | 12-18 months (concurrent with Phase 0) | FLSA amendment passed; penalty schedule established; evergreen registry authorized |
| Phase 1 (5,000+ FTE penalty) | Year 3 | Penalties active for largest employers; evergreen registry operational; WHD enforcement capacity expanded |
| Phase 2 (all 100+ FTE) | Year 4 | Full penalty coverage; good-faith appeal process operational |
| Phase 3 (evaluation) | Year 5 | GAO audit: ghost posting rate change, job seeker time-to-hire change, JOLTS signal quality improvement |

---

## Key Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Employers reduce posting volume (less transparency) | High | Medium | Monitoring; if genuine open roles are harder to find, adjust penalty structure; evergreen exemption is the safety valve |
| Platform opposition to reporting requirement | High | Medium | Employer-primary compliance design; platform reporting as verification only; safe harbor for reporting |
| Gaming through rapid open-close cycling | Medium | Medium | Role-lineage tracking across postings; 60-day re-post window triggers clock continuation |
| "Regulatory burden" narrative dominates | Medium | Medium | Near-zero cost to compliant employers; ghost job narrative as political counter; phase-in by employer size |
| No international precedent makes it easier to mischaracterize | High | Low | Frame as a consumer protection / labor market integrity measure rather than an employer mandate |
