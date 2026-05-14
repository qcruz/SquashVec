# AI-Created Jobs: Taxonomy, Bottlenecks, and DED Acceleration

**Scenario:** AI-Driven Structural Unemployment — Companion Document
**Document Type:** Economic opportunity analysis
**Last Updated:** 2026-05
**Related Documents:** `phase-1-triage-and-stabilization.md`, `phase-2-transition.md`

---

## The Correct Frame

The displacement narrative dominates policy discussion because displacement is immediate,
visible, and politically legible. A person who loses a job to AI can tell you what
happened. A person who gets a new job that didn't exist five years ago has a harder time
explaining why their position exists — and rarely attributes it to the same technological
shift.

The empirical record of every major general-purpose technology transition — electrification,
mechanization, computerization — is that the technology ultimately creates more jobs than
it destroys. This is not a guarantee in every case, and the distribution of who loses and
who gains is never automatic. But the baseline expectation should be net job creation,
with the policy question being: **which specific categories of new jobs will AI create, what
prevents them from being filled, and what can the DED do to accelerate that creation?**

This document answers those three questions for each AI-created job category.

---

## Category 1: AI Infrastructure and Operations

### Jobs Created

The physical infrastructure running AI — data centers, power delivery systems, cooling
infrastructure, fiber and edge compute networks — requires substantial skilled labor to
build, operate, and maintain. This category is entirely AI-displacement-resistant: these
are physical, site-specific jobs that AI cannot perform on itself.

| Job Title | Description | Current Demand |
|-----------|-------------|---------------|
| Data center technician | Hardware installation, rack management, physical troubleshooting | 50,000+ openings (2026) |
| Cooling systems engineer | AI compute is 3–5× more heat-dense than general compute; specialized liquid cooling required | Severe shortage |
| Power delivery specialist | Large-scale UPS systems, generator maintenance, power distribution for MW-scale facilities | Growing rapidly |
| Fiber and network infrastructure technician | Edge inference requires last-mile fiber density not yet built | High demand |
| AI hardware maintenance technician | GPU clusters require specialized maintenance distinct from general server work | New category; few trained |
| Data center construction manager | Hyperscale and edge facility construction pipeline is multi-year and capital-intensive | Very high demand |

**Scale:** Microsoft, Google, Amazon, and Meta have collectively announced $300B+ in
data center capital investment through 2028. Each $1B in data center construction supports
approximately 1,500–2,500 direct construction jobs and 500–800 permanent operations jobs.
At $300B committed, the implied job creation is **450,000–750,000 construction roles and
150,000–240,000 permanent operations roles** — before accounting for the broader buildout
required to run AI inference at the edge.

### Bottlenecks

- Specialized cooling system expertise is not in standard HVAC curricula
- GPU hardware maintenance requires manufacturer-specific training not widely available
- Power delivery at MW scale is a different skill set from standard commercial electrician work
- Security clearance requirements for some government-adjacent facilities create additional friction

### DED Acceleration

**Type B contracts with community colleges** to develop data center operations and AI
infrastructure curricula — building on existing electrical and networking programs but
adding the specialized modules required. DED provides curriculum specifications based on
the scenario library's infrastructure requirements (grid, water, military facility AI
buildout); community colleges provide the delivery.

**CRHP Infrastructure Track:** Data center operations and AI infrastructure maintenance
added as a CRHP service track. Workers who complete the track receive the DED credential
that pre-qualifies them for positions at contractors building DED-contracted infrastructure.
This directly pipelines displaced workers into the fastest-growing physical infrastructure
sector.

**Manufacturer partnerships:** DED Type B contracts include a requirement that hardware
manufacturers (NVIDIA, AMD, Intel) provide certified training programs accessible to
DED-contract training providers — making proprietary hardware training available at scale
rather than only through expensive direct manufacturer programs.

---

## Category 2: AI Quality, Oversight, and Validation

### Jobs Created

AI systems deployed in high-stakes environments — healthcare, legal, financial, critical
infrastructure — require ongoing human oversight, output validation, and quality assurance.
The more consequential the AI application, the more robust the human review layer must be.
This category grows proportionally with AI deployment scale.

| Job Title | Description | Displacement Resistance |
|-----------|-------------|------------------------|
| AI output auditor | Reviews AI-generated decisions in regulated industries (loan approvals, insurance claims, medical coding) for accuracy and bias | High — requires domain expertise + judgment |
| Clinical AI validator | Evaluates AI diagnostic suggestions against clinical evidence; flags false positives/negatives for physician review | Very high — requires medical training |
| Legal AI reviewer | Checks AI-generated contracts, briefs, and compliance documents; identifies errors AI cannot self-identify | High — requires legal credential |
| AI red team specialist | Adversarial testing of AI systems before deployment; finds failure modes that standard evaluation misses | Very high — requires both technical and domain expertise |
| Regulatory compliance analyst (AI systems) | Ensures AI systems meet evolving federal and state AI regulations; maintains documentation for audit | Growing rapidly with regulation |
| Trust and safety specialist | Reviews AI-generated content for policy violations, misinformation, legal risk | Moderate — partially automatable but judgment layer persists |
| Training data curator | Creates, labels, and quality-controls the training datasets that determine AI model behavior | High volume; partially AI-assisted but human judgment required |

**The oversight paradox:** As AI systems become more capable, the individual oversight
events become less frequent — but the consequence of missed errors increases. A world
where AI handles 80% of radiology reads requires fewer validation events per image, but
the remaining 20% that AI flags for human review are the hardest cases. The human role
shifts from volume processor to expert validator — a higher-skill, higher-wage role.

### Bottlenecks

- Most displaced workers in AI-exposed occupations have the domain expertise but lack the
  technical AI literacy to evaluate model outputs systematically
- Regulatory frameworks for AI oversight are still forming; job requirements are undefined
- Employers are uncertain which validation functions require human credentials vs. can be
  handled by AI-assisted quality control
- No established credentialing pathway for "AI oversight" roles exists in most domains

### DED Acceleration

**Hybrid credentialing program:** DED designs a two-component certification: (1) domain
expertise validation (leveraging existing credentials — a nurse's RN, a lawyer's bar
admission); (2) AI literacy and output evaluation module. The combination produces an
AI validator credential specific to that domain that employers can hire against immediately.

**AI literacy as Phase 1 universal add-on:** Every DED-funded retraining program includes
a baseline AI literacy module — not deep technical training, but sufficient to understand
model outputs, identify common failure modes, and work effectively alongside AI tools in
the target occupation. This future-proofs the retraining investment: workers are not
trained for a static job description, they are trained for a job that will operate in
an AI-augmented environment.

**Regulatory demand creation:** DED's engagement with federal AI regulatory frameworks
(working with NIST, FDA, OCC, SEC on sector-specific AI oversight rules) creates the
regulatory demand that makes AI oversight jobs structurally required rather than discretionary.
When a bank must have a certified human reviewer for AI-generated credit decisions above
a threshold, it creates a durable employment category.

---

## Category 3: AI-Enabled Service Expansion

### Jobs Created

AI does not only replace workers — it also enables services that previously were not
economically viable at scale, creating entirely new markets. Where a service required
expensive specialist labor at a ratio that made it unaffordable for most people, AI
reduces the cost of the specialist component enough that the market expands dramatically,
creating net job growth in the delivery and human-touch layer.

| Sector | AI Enablement | New Jobs Created |
|--------|--------------|-----------------|
| Personalized education | AI tutoring reduces per-student cost; makes 1:1 instruction economically viable | Human supervisors, curriculum designers, learning coaches |
| Preventive healthcare | Continuous AI health monitoring identifies conditions before symptoms; primary care demand expands | Community health navigators, preventive care coordinators |
| Mental health support | AI handles first-line triage and CBT exercises; licensed therapists focus on complex cases | More therapists at higher utilization; AI-human therapy coordination roles |
| Elder care | AI-assisted care coordination extends capacity per caregiver; elder care market expands with aging population | Physical caregivers, care coordinators, family support specialists |
| Legal access | AI reduces cost of simple legal services to near zero; previously un-served legal market emerges | Paralegals, legal navigators, community legal clinics |
| Financial planning | AI makes personalized financial advice affordable below wealth thresholds that made human advisors uneconomic | Human relationship managers for medium-income clients; AI-assisted advisor roles |
| Small business support | AI handles compliance, bookkeeping, and marketing for small businesses; makes entrepreneurship more viable | More small business formation → demand for physical tradespeople, local services |

**The market expansion logic:** Before AI, a personalized financial plan required a human
advisor at $200–500/hour — accessible only to high-net-worth clients. AI-enabled planning
reduces the cost to $20–50/month. The market expands from 10M to 100M viable clients.
The human advisor role shifts from producing plans to handling complex cases and
relationship management — and the total number of human advisor jobs increases because
the market is 10× larger even if the ratio of human time per client falls by 80%.

### Bottlenecks

- Regulatory frameworks for AI-assisted professional services (healthcare, legal, financial)
  lag behind technological capability — creating legal uncertainty that delays market formation
- The new roles (health navigator, legal navigator, learning coach) are not yet credentialed —
  employers cannot hire for them because the credential doesn't exist
- Consumers are not yet aware of AI-enabled services in these categories; demand formation lags

### DED Acceleration

**Regulatory fast-track for AI-enabled service expansion:** DED identifies service categories
where AI enables meaningful access expansion and works with relevant regulatory bodies to
create clear frameworks for AI-assisted service delivery. Where FDA approval, state licensing
boards, or bar associations have created ambiguity around AI-assisted practice, DED provides
the economic security argument for resolution: delayed regulatory clarity costs jobs and
delays access to services that improve economic resilience.

**New credential development:** DED Type B contracts fund credentialing organizations
(ANSI-accredited bodies, industry associations) to develop the certification frameworks
for AI-enabled service roles — the learning coach, the health navigator, the legal guide.
Credentials that don't exist can't be hired. DED accelerates credential creation.

**Demand creation through DED programs:** CRHP members in medical and support tracks
become the first large-scale deployment of AI-assisted care coordination. The CRHP structure
creates an institutional home for AI-enabled care roles before the broader market has
organized around them — the DED becomes the lead employer of the new category and the
proof-of-concept that makes private sector hiring follow.

---

## Category 4: AI Research, Development, and Alignment

### Jobs Created

The AI systems displacing workers are themselves produced and maintained by a rapidly
growing technical workforce. This category is the highest-wage and fastest-growing
segment of AI-created employment, though it is accessible only to workers with significant
technical education.

| Role | Description | Compensation Range |
|------|-------------|-------------------|
| AI safety researcher | Studies failure modes, alignment, and interpretability of AI systems | $200k–$600k (FAANG/labs) |
| AI systems engineer | Builds and maintains production AI infrastructure | $180k–$400k |
| Prompt engineer / AI product designer | Designs effective AI interfaces for specific use cases | $120k–$280k |
| Fine-tuning specialist | Adapts foundation models for specific industry applications | $150k–$350k |
| AI governance / policy specialist | Advises companies on regulatory compliance, risk management | $150k–$300k |
| ML operations engineer | Keeps production AI systems running; monitoring, deployment, scaling | $160k–$350k |
| Domain AI specialist | Combines deep domain expertise (medicine, law, engineering) with AI implementation knowledge | $200k–$500k |

**Current demand vs. supply imbalance:** The BLS estimated 100,000+ unfilled AI-specific
roles in 2025 growing at 35%/year — the fastest of any technical category. At current
university graduation rates, the supply shortfall persists through 2035.

### Bottlenecks

- 4-year degree requirement for most roles excludes workers who could be re-trained in 12–18
  months for many applied AI positions
- AI safety research requires interdisciplinary skills (technical AI + philosophy + domain
  expertise) that no current degree program consistently produces
- Domain AI specialist roles require both deep domain knowledge and AI literacy — a
  combination neither domain nor CS programs produce by default
- Geographic concentration in SF Bay Area and a handful of other metros limits access for
  most workers

### DED Acceleration

**Accelerator Alpha as a talent development program:** Beyond its R&D output, Accelerator
Alpha is a training program for AI safety researchers. Participants — recruited from
across the ERP — work alongside the best safety researchers in the world for 90 days
under classification. Many emerge with the hands-on expertise and credentials to lead
safety functions at AI companies or government agencies. The DED is manufacturing the
supply of AI safety talent rather than waiting for universities to produce it.

**12-month applied AI certification:** DED funds a fast-track applied AI credential program
through national laboratory affiliates and accredited partners: 12 months, combining
programming fundamentals, ML concepts, and domain-specific AI application. Targeted at
workers with existing domain expertise (medical, legal, engineering, financial) who need
the AI component — not at workers who need to learn the domain. This is the fastest path
to the highest-wage AI-created jobs for workers who already have the non-technical half
of the required skills.

**Geographic distribution via CRHP:** Type D ERP contracts and CRHP AI service tracks are
not concentrated in coastal metros. The DED's national structure enables AI workforce
development in regions not currently served by private sector AI training pipelines —
building the distributed AI talent base that reduces the geographic concentration risk
in AI capability.

---

## Category 5: Physical World AI Integration

### Jobs Created

AI in the physical world — autonomous systems, robotic manufacturing, precision agriculture,
smart infrastructure — requires a category of workers who bridge AI capabilities and
physical implementation. These roles require both technical AI literacy and hands-on
physical-systems expertise. They are AI-resistant by design: they exist precisely because
physical-world AI cannot yet operate without significant human integration and oversight.

| Role | Description | DED Scenario Connection |
|------|-------------|------------------------|
| Autonomous systems technician | Maintains and troubleshoots autonomous vehicles, drones, robots | Oil Restriction (logistics) |
| Precision agriculture technician | Deploys and maintains AI-driven irrigation, planting, and monitoring systems | Drought |
| AI-augmented manufacturing operator | Works alongside robotic systems; handles exception cases AI cannot resolve | Semiconductor Collapse |
| Smart grid operations specialist | Manages AI-optimized power dispatch and grid balancing systems | Grid Cyberattack |
| AI facility security specialist | Integrates AI-based physical security, surveillance, and access systems | All scenarios |
| Predictive maintenance engineer | Uses AI condition monitoring outputs to plan and execute physical maintenance | All scenarios |

**The physical-digital bridge jobs:** These roles are created because AI optimization of
physical systems requires human judgment at the exception-handling and maintenance layer.
A smart grid AI can optimize dispatch in real time — but when a physical relay fails,
a human technician with grid knowledge and AI system literacy is required. The AI creates
the job by making the physical system more complex; the human makes the AI reliable by
handling what it cannot.

### Bottlenecks

- Training programs for these hybrid roles don't yet exist in most regions — they require
  integration of AI/software curriculum with hands-on physical systems training
- Equipment access is expensive — training on actual robotic manufacturing systems,
  autonomous vehicles, or smart grid technology requires capital that community colleges
  lack
- Employers in physical sectors (utilities, agriculture, manufacturing) have been slow to
  develop internal AI integration roles — the organizational categories are not yet defined

### DED Acceleration

**The DED scenario infrastructure IS the training environment.** The smart grid systems,
precision agriculture equipment, and AI-integrated water infrastructure that DED strategic
contracts are building out are simultaneously the training platforms for physical-world
AI integration jobs. Workers in CRHP infrastructure tracks train on actual DED-contracted
systems — eliminating the equipment access problem entirely.

**Co-location with Accelerator output:** Accelerator Delta (grid defense) produces AI
grid security protocols; the DED pre-designates physical world AI integration technicians
as a required workforce category in Type A grid readiness contracts. Utilities that hold
DED readiness contracts must maintain certified AI-augmented grid operations staff — creating
structured employer demand for the new role category.

---

## The Flywheel at Scale — DED as Job Creation Accelerant

The five categories above interact. DED acceleration in each one creates demand that
pulls the others:

```
DED funds AI infrastructure buildout (Category 1)
        ↓
AI infrastructure requires physical-world integration workers (Category 5)
        ↓
Physical-world AI integration creates validation requirements (Category 2)
        ↓
Oversight frameworks expand AI-enabled service market (Category 3)
        ↓
Expanded service market creates demand for AI specialists (Category 4)
        ↓
AI specialists trained through Accelerator programs produce IP (value discovery)
        ↓
IP licensing revenue funds more Type B training contracts
        ↓
More workers certified, more DED infrastructure built, more new job categories seeded
```

At steady state, the DED's combined Type B training contracts, CRHP service tracks,
ATC-funded retraining, and Accelerator pipeline is simultaneously:
- Training workers displaced from Category A AI-replaced jobs
- Creating the workforce for Category 1–5 AI-created jobs
- Building the physical infrastructure those workers will operate
- Generating the IP that funds the next cycle

The ATC levy that enters as a transition cost exits as a job creation accelerant.
The net fiscal position of the AI Transition Fund compounds positive as each retrained
cohort enters the workforce, generates tax revenue, and reduces ATF payout requirements
for subsequent cohorts.

---

## Projected Net Job Creation — DED-Accelerated vs. Baseline

| Job Category | Baseline Creation (2026–2035) | DED-Accelerated Creation | Acceleration Factor |
|-------------|------------------------------|--------------------------|---------------------|
| AI Infrastructure & Operations | 400k–600k | 700k–1.1M | 1.7–1.8× |
| AI Quality & Oversight | 200k–400k | 500k–800k | 2.0–2.5× |
| AI-Enabled Service Expansion | 1.5M–3M | 3M–5M | 2.0× |
| AI R&D and Alignment | 300k–500k | 500k–900k | 1.6–1.8× |
| Physical-World AI Integration | 500k–1M | 1.2M–2M | 2.0–2.4× |
| **Total** | **2.9M–5.5M** | **5.9M–9.8M** | **~1.9×** |

The acceleration factor reflects DED's role as a demand-creation and bottleneck-removal
engine — not a job-creation agency, but the institution that removes the regulatory, credentialing,
geographic, and infrastructure barriers that delay private market job formation by 3–7 years.

DED acceleration converts a 7–10 year market transition into a 4–5 year transition.
For the cohort of workers displaced at ages 35–50, that difference is decisive:
a 4-year transition is survivable; a 9-year transition is a permanently damaged career.

---

## Cross-References

- `ded/scenarios/ai-unemployment/phase-1-triage-and-stabilization.md` — ATC funding mechanism; retraining flywheel
- `ded/scenarios/ai-unemployment/phase-2-transition.md` — human-complementary sector investment
- `ded/tools/expert-reserve-program.md` — Accelerator Alpha as talent development + IP creation
- `ded/tools/strategic-contracts.md` — Type B training contracts; Type A demand-creation contracts
- `ded/proposal/civilian-reserve-health/` — CRHP service tracks as the entry point for all categories
- `ded/assets/human-capital.md` — skilled trades, community colleges, veterans pipeline as retraining infrastructure
- `ded/economics/value-discovery.md` — AI safety IP from Accelerator Alpha as potential OPP entry
- `ded/tools/internship-floor.md` — mandatory paid internship floor; ~1M new entry-level experiences/year; structural first-rung creation
