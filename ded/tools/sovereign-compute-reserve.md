# DED Tool: Sovereign Compute Reserve

**Document Type:** Tool Analysis
**Last Updated:** 2026-05
**Category:** Cross-Scenario Infrastructure Tool
**Related Scenarios:** All (cross-cutting dependency across every DED scenario)
**Related Tools:** Strategic contracts (Type A/B), Expert Reserve Program, NEID

---

## The Problem This Tool Solves

Every major DED scenario response requires substantial compute capacity:

- The National Economic Intelligence Dashboard monitors real-time supply chain data
  across dozens of commodity categories simultaneously
- The semiconductor scenario requires AI-driven allocation modeling precisely when chip
  supply is most constrained
- The pandemic scenario relies on AI-accelerated drug and vaccine discovery — a process
  that is gated by compute availability
- The rare earth denial Phase 3 strategy depends on machine-learning-guided materials
  discovery for rare-earth-free magnet and battery chemistry alternatives
- Grid cyberattack response requires real-time grid topology modeling and cascade prediction
- The drought scenario requires agricultural yield forecasting and water-table modeling

The structural problem: DED currently has no sovereign compute capacity. Every function
runs on commercial cloud infrastructure (AWS, Azure, Google Cloud). This creates two
compounding vulnerabilities that do not appear independently in any individual scenario
analysis but recur as a cross-cutting dependency across all of them:

**Vulnerability 1 — Operational dependency:** DED's analytical and response capacity
is impaired precisely during the scenarios where it matters most. A semiconductor
collapse degrades the commercial cloud infrastructure that NEID runs on. A cyberattack
targeting cloud providers simultaneously disrupts DED's response coordination. Commercial
cloud availability cannot be assumed during any Tier 2 declared scenario.

**Vulnerability 2 — Compute concentration risk:** NVIDIA holds approximately 80% of
the AI training compute market. NVIDIA's GPU production runs almost entirely through
TSMC. A Taiwan conflict — the Tier 2 trigger for the semiconductor collapse scenario —
simultaneously restricts chip supply (the documented scenario) and degrades AI compute
capacity across every institution dependent on frontier model inference and training.
This second-order effect is currently untracked and unprepared for in the DED framework.

The Sovereign Compute Reserve addresses both vulnerabilities through the same instrument
design used for the Strategic Petroleum Reserve: pre-positioned, government-controlled
capacity that activates in declared scenarios and maintains a continuous readiness posture
during normal operations.

---

## Compute Concentration Risk Score

Before designing the reserve, the risk must be quantified using the same Concentration
Risk Score (CRS) methodology from `ded/economics/supply-chain-concentration-risk.md`.

### CRS Components for Advanced AI Compute

**Geographic Concentration Factor (GCF):**
Advanced GPU manufacturing: TSMC fabricates approximately 90% of NVIDIA's A100/H100/B100
series GPUs and 95%+ of AMD's MI-series accelerators. Samsung and Intel foundries exist
but lack TSMC's sub-5nm yield at volume. Geographic concentration: Taiwan, >85%.

GCF for advanced AI compute: **0.85** (highest possible tier; comparable to gallium at 0.98)

**Substitutability Factor (SF):**
Short-run: Near-zero. No sovereign compute alternative exists at the scale required for
frontier AI model inference and training. National lab HPC (ORNL Frontier, NERSC) uses
AMD Instinct GPUs (also TSMC-manufactured) with limited AI workload optimization.
Long-run: RISC-V GPU architectures and domestic AI chip programs (Cerebras, SambaNova,
Groq) exist at pilot scale but are 5-10 years from volume production comparable to NVIDIA.

SF: **0.80** (near-zero short-run substitutability)

**Import Dependency Factor (IDF):**
U.S. AI compute capacity is 100% dependent on imported chips from TSMC-fabricated NVIDIA
and AMD hardware. No domestic advanced GPU fabrication exists at commercial scale (Intel's
18A process will produce some AI accelerators, but volume timeline is 2028-2030).

IDF: **0.95**

**Disruption Frequency Factor (DFF):**
2021 semiconductor shortage: H100 allocations were rationed; cloud provider GPU
availability fell sharply. 2022: NVIDIA export controls created a two-tier market.
2024: TSMC CoWoS advanced packaging shortages constrained H100/A100 supply for 9+ months.
Pattern: meaningful disruptions every 2-3 years, not once-per-decade events.

DFF: **0.70** (high; multiple documented disruptions within 5 years)

**Composite CRS:**
CRS = 0.4×GCF + 0.2×SF + 0.3×IDF + 0.1×DFF
CRS = 0.4(0.85) + 0.2(0.80) + 0.3(0.95) + 0.1(0.70)
CRS = 0.34 + 0.16 + 0.285 + 0.07
**CRS = 0.855**

This is the highest CRS in the DED critical asset inventory — higher than rare earths (0.60),
semiconductors (0.52), and gallium (0.66). It reflects the extraordinary combination of
geographic concentration, near-zero short-run substitutability, complete import dependency,
and frequent disruption history.

The CRS of 0.855 exceeds the 0.75 threshold that under the DED intervention framework
triggers mandatory pre-positioning and concentration risk monitoring (from
`supply-chain-concentration-risk.md` Section 4: CRS >0.75 = automatic Accelerator program
recommendation and Strategic Reserve trigger).

### Expected Annual Loss from Compute Concentration

Unlike commodity materials, compute concentration risk is difficult to value directly in
dollar terms because the downstream effects are diffuse. A framework:

**Scenario A — Semiconductor shortage, 30% AI compute capacity reduction (12 months):**
- Research productivity loss (drug discovery, materials science): $20-40B in deferred
  discovery value
- Government operational degradation (NEID, defense logistics AI, financial monitoring): $5-10B
- Commercial economy AI-dependent productivity loss: $80-150B
- Estimated total: $105-200B for a 12-month 30% reduction

**Scenario B — Taiwan conflict, 60% AI compute capacity reduction (24 months):**
- Research productivity loss: $80-150B
- Government operational degradation: $20-40B
- Commercial economy: $350-600B
- Estimated total: $450-790B over 24 months

**Expected Annual Loss (probability-weighted):**
Using 12% annual probability of Scenario A and 4% annual probability of Scenario B:
EAL = 0.12($105-200B) + 0.04($450-790B) × 0.5 (24-month event prorated)
EAL ≈ $12.6-24B + $9-15.8B = **$21.6-39.8B/year**

Against this unpriced risk, the Sovereign Compute Reserve costs approximately $1.5-2.5B/year
to maintain at the scale specified below — a cost ratio of 4-12 cents per dollar of coverage.
This is identical to the cost ratio for the rare earth reserve ($1.3B/year against $12-30B/year
prevented loss) and confirms the tool follows the same economic logic.

---

## Reserve Architecture

### Institutional Model: DOE National Labs as the Sovereign Compute Base

The U.S. does not need to build compute infrastructure from scratch. The DOE national
laboratory complex already operates the world's most powerful publicly accessible supercomputers:

| Facility | System | Peak Performance | AI Capability |
|---------|--------|-----------------|---------------|
| Oak Ridge National Lab | Frontier (AMD Instinct MI250X) | 1.1 exaFLOP | Yes; AMD GPU cluster |
| Argonne National Lab | Aurora (Intel Ponte Vecchio GPU) | ~2 exaFLOP (projected) | Yes; Intel Xe GPU |
| Lawrence Berkeley National Lab (NERSC) | Perlmutter (NVIDIA A100) | 4 petaFLOP | Strong; NVIDIA |
| Lawrence Livermore | El Capitan (AMD MI300A) | ~2 exaFLOP (planned) | Yes |

These systems have: federal security frameworks, clearance-compatible operational procedures,
existing multi-agency access protocols, HPC expertise, and meaningful air-gap capability.
They are not optimized for the inference and fine-tuning workloads that DED scenario response
requires, but they can run them.

The Sovereign Compute Reserve does not replace commercial cloud for routine DED operations.
It provides a fallback and surge capacity layer that is sovereign, air-gappable, and
immune to commercial cloud disruption.

### Reserve Components

**Component 1: Dedicated DED Compute Allocation at National Labs (Type A)**

DED enters Type A agreements with DOE for guaranteed compute-hour allocations at all four
major Leadership Computing Facility sites:

- Peacetime allocation: 5% of each facility's available compute-hours reserved for DED
  pre-positioned workloads (NEID analytics, materials discovery, scenario modeling)
- Tier 1 declaration: Allocation rises to 15% automatically under declaration authority
- Tier 2 declaration: Allocation rises to 40%; DED has priority over all non-defense workloads

This provides immediate compute surge capacity in declared scenarios without requiring
new hardware — it reallocates existing federal capacity.

**Cost:** $80-120M/year in user-hour allocation cost (national lab internal accounting);
no capital expenditure.

**Component 2: DED GPU Cluster Co-Investment (Type B)**

DOE national labs need AI-optimized compute capacity beyond their current HPC architecture
(current systems are strong at traditional HPC but less optimized for large language model
inference and generative AI workloads that DED's drug discovery and materials science
programs require). DED co-invests:

- $800M-1.2B over 5 years for AI-optimized GPU cluster additions at ORNL and NERSC
- Hardware specification: next-generation AI accelerators from at least two vendors
  (NVIDIA and a domestic alternative — Cerebras, Intel Gaudi, or AMD MI-series) to
  reduce single-vendor dependency
- Air-gap capability: clusters physically separable from public internet on 4-hour notice;
  certified for classified workload at Secret level
- DED operational control: dedicated allocation for DED workloads on co-invested capacity;
  remaining capacity available to DOE mission programs in peacetime

**Cost:** $160-240M/year amortized capital; $40-60M/year operations.

**Component 3: Distributed Edge Compute Reserve**

National lab HPC is centralized. Scenario responses may require distributed compute
capacity — particularly for NEID regional analytics, AHLP V2I processing, and emergency
communications coordination when central facilities may be degraded or communications
links compromised.

DED pre-positions distributed compute nodes at FEMA regional headquarters (10 locations)
and at the 25 highest-priority DED strategic asset facilities:

- Each node: 8-16 H100-class GPUs + secure storage + satellite communications uplink
- Capability: standalone NEID regional analytics; AI-assisted emergency coordination;
  secure communications relay
- Activation: nodes operate in low-power monitoring mode; full activation on DED
  emergency declaration; satellite uplinks ensure operation independent of terrestrial
  internet infrastructure

**Cost:** $400-600M capital; $60-90M/year operations.

**Component 4: Sovereign AI Model Library**

A compute reserve is only as useful as the models and software that run on it. Commercial
AI capabilities (GPT-class models, drug discovery models, materials science models) are
hosted and controlled by private companies. In a scenario where commercial AI providers
are disrupted or have adverse incentives, DED needs access to capable AI systems that
it controls.

DED establishes a Sovereign AI Model Library — a curated set of open-weight and
government-developed AI models covering DED's primary use cases:

| Use Case | Model Type | Source |
|---------|-----------|--------|
| Drug/vaccine discovery | Protein structure prediction, molecular generation | AlphaFold2 (open), ESM2 (open), DED-fine-tuned variants |
| Materials science | Crystal structure prediction, property prediction | CDVAE, GNoME (open), Ames Lab collaboration |
| Supply chain analytics | Time series forecasting, anomaly detection | Purpose-built; national lab collaboration |
| Grid modeling | Power flow simulation, cascade prediction | MATPOWER, GridDyn (open); ORNL collaboration |
| Allocation optimization | Mixed-integer programming, multi-objective optimization | Standard solvers; custom scenario modules |
| Emergency coordination | Document processing, decision support | Open-weight LLMs (Llama-class); DED-fine-tuned |

Models are maintained at national labs, updated quarterly against current open-source
baselines, and tested annually on scenario exercises. No proprietary commercial models
are required — the open-weight ecosystem provides sufficient capability for all listed
use cases except frontier generative tasks.

**Cost:** $100-150M/year for model development, fine-tuning, and maintenance contracts
with national labs and research universities.

---

## Compute Allocation Authority

Beyond the reserve itself, DED needs authority to allocate scarce commercial compute
during a declared scenario — parallel to the semiconductor chip allocation framework
(NSIVS priority tiers from the semiconductor collapse scenario).

### Commercial AI Compute Priority Framework

During a Tier 2 semiconductor declaration, DED activates the Compute Priority Framework:

**Tier 1 — National security compute:** DoD AI systems; NEID; nuclear command and control
support; defense logistics AI; classified government AI workloads.

**Tier 2 — Life safety and critical infrastructure:** Hospital AI systems (diagnostic imaging,
ICU monitoring); grid management AI; water treatment control systems; emergency dispatch AI.

**Tier 3 — Economic resilience compute:** Financial system AI (fraud detection, settlement
systems); critical supply chain optimization; communications network management.

**Tier 4 — Research and productivity:** Universities, research institutions, commercial
productivity applications.

**Tier 5 — Discretionary:** Consumer AI products, entertainment, gaming, general enterprise.

**Implementation mechanism:** DED enters Type A capacity reservation agreements with
major cloud providers (AWS, Microsoft Azure, Google Cloud, Oracle Cloud) committing that
in a declared semiconductor emergency:

- Tier 1-3 workloads receive guaranteed availability at pre-crisis pricing (DED compensates
  spread above spot market rates from emergency reserve)
- Tier 4-5 workloads may face capacity constraints; cloud providers required to notify
  DED of available capacity before rationing Tier 1-3

This is identical in structure to the semiconductor chip allocation (NSIVS priority tiers)
and the grid emergency fuel priority contracts — the same instrument applied to compute.

**Cost in non-emergency:** Type A retainer contracts with cloud providers: $50-100M/year.
**Cost in Tier 2 activation:** $2-5B/year (compensating spot-to-contract spread on
priority compute during shortage) — offset by preventing vastly larger economic losses
from compute-dependent sector disruptions.

---

## Compute Early Warning: NEID Integration

### Compute Concentration Risk Monitoring

NEID's critical commodity dashboard adds a Compute Concentration Risk Module:

**Leading indicators monitored continuously:**

| Indicator | Source | Watch Threshold | Crisis Threshold |
|-----------|--------|----------------|-----------------|
| TSMC CoWoS and 3nm/5nm capacity utilization | TSMC earnings + commercial intelligence | >95% utilization | Supply allocation rationing reported |
| NVIDIA GPU delivery lead time (data center) | Cloud provider procurement data | >6 months | >12 months |
| H100/B200 spot price premium vs. list | Reseller market data | >40% premium | >150% premium |
| National lab compute availability (% of capacity allocated) | DOE internal | — | >85% allocated (surge incoming) |
| Cloud provider GPU fleet expansion rate | AWS/Azure/Google capex filings | <10% YoY growth | Negative growth |
| Domestic AI chip vendor production (Cerebras, Intel Gaudi) | Production announcements | — | Volume below 5% of NVIDIA total |

**Automated intervention triggers:**
- Watch: Two Tier 1 indicators breached → NEID generates compute concentration risk report;
  DED Secretary briefed
- Tier 1 declaration consideration: Three Tier 1 indicators breached → Sovereign Compute
  Reserve pre-activation; national lab allocations moved from 5% to 15% DED priority
- Tier 2 declaration: Any Crisis Threshold breached → Full reserve activation; Compute
  Priority Framework activated with cloud providers

---

## Scenario-Specific Applications

### Semiconductor Collapse

The Sovereign Compute Reserve addresses the meta-problem: DED's own allocation modeling
(NSIVS) and response coordination (NEID) depend on the compute that the scenario is disrupting.

Reserve activation ensures NEID runs on national lab allocation (air-gapped from commercial
cloud degradation). Distributed edge nodes at FEMA regions maintain regional response
coordination if central NEID infrastructure is degraded.

The Sovereign AI Model Library provides allocation optimization models that run on the
reserve without requiring commercial AI APIs — important if commercial AI providers are
themselves impaired by chip shortage.

### Pandemic

AI-accelerated drug and vaccine discovery is the primary Phase 1 force multiplier in the
pandemic scenario. In a major pandemic, commercial compute providers face extraordinary
competing demand (every pharmaceutical company simultaneously needs massive compute for
discovery work). The reserve pre-commits national lab allocation for DED-sponsored discovery
programs at priority access levels that cannot be outbid.

The protein structure prediction and molecular generation models in the Sovereign AI Model
Library are specifically designed for this use case.

**Estimated value:** AlphaFold2 compressed a decade of structural biology into months.
Pre-positioned compute and models for pandemic drug discovery could reduce vaccine development
timelines by 3-6 months — at 10,000 deaths/day in a severe pandemic, 90 days is approximately
900,000 lives.

### Rare Earth Denial

Phase 3 of the Rare Earth Denial scenario relies on "materials genomics" and "ML-guided
materials discovery" for rare-earth-free magnet alternatives. This is compute-intensive AI
science that is currently outsourced to whatever compute researchers can access commercially.

The reserve pre-commits compute at Ames Lab and ORNL (where the magnet physics expertise
lives) specifically for materials discovery workloads. The crystal structure prediction
and property prediction models in the Sovereign AI Model Library run on the reserve.

**Estimated value:** Reducing rare-earth-free magnet commercialization timeline by 2-3 years
saves $10-30B in the rare earth reserve and allied processing investment required to cover
the extended dependency period.

### Grid Cyberattack

Grid modeling for cascade prediction and islanding boundary optimization is the key Phase 1
analytical function in the grid cyberattack scenario. Commercial grid modeling software
runs on commercial cloud infrastructure that may itself be impaired during a grid attack.

The reserve provides air-gapped grid modeling capacity that continues to function when
commercial infrastructure is degraded. The distributed edge nodes at FEMA regions maintain
regional grid modeling capability independent of the national network.

### AI Unemployment

The AI unemployment scenario's core tools — personalized retraining pathways, real-time
job matching, continuous AI certification — are compute-dependent at scale. In an AI
unemployment Tier 2 event (mass rapid displacement), the demand for AI-assisted retraining
coordination surges at exactly the moment when compute resources may be under stress.

The reserve pre-commits compute capacity for the Automation Tax Credit administration
system, the retraining pathway engine, and the job-matching infrastructure that the
AI unemployment response depends on.

---

## Relationship to Domestic AI Chip Production

The Sovereign Compute Reserve is a resilience instrument, not a substitute for domestic
AI chip production. The structural vulnerability (CRS 0.855) requires both:

1. **Reserve** — immediate capability regardless of supply chain status (this tool)
2. **Domestic production** — long-run reduction in the CRS itself

On the production side, DED's role is:

- Type B co-investment with Intel's 18A AI accelerator program (the only near-term domestic
  advanced node candidate for AI compute chips)
- Expert Reserve Program deployment: semiconductor engineers assigned to domestic AI chip
  design and production programs
- Accelerator program: DED Accelerator for RISC-V based AI architecture (open architecture
  reduces single-vendor dependency regardless of where chips are fabricated)
- Procurement standard: DED and DoD AI system procurement gives preference to chips
  manufactured in OECD-equivalent nations; creates demand pull for domestic and allied
  chip production

The production investments are 5-10 year timelines. The reserve provides coverage during
the transition period, analogous to the role of the Strategic Petroleum Reserve while
domestic clean energy production scales.

---

## Cost Summary

| Component | Capital (5-year) | Annual Operating |
|-----------|-----------------|-----------------|
| National lab compute allocation (Type A) | — | $80-120M |
| DED GPU cluster co-investment (Type B) | $800M-1.2B | $40-60M |
| Distributed edge compute nodes | $400-600M | $60-90M |
| Sovereign AI Model Library | — | $100-150M |
| Cloud provider Type A retainers (priority framework) | — | $50-100M |
| NEID Compute Concentration Risk Module | $50-80M setup | $20-30M |
| **Total capital (5-year)** | **$1.25-1.88B** | |
| **Total annual operating** | | **$350-550M/year** |

**Comparison to EAL:** At $21.6-39.8B/year in unpriced expected annual loss from compute
concentration, the reserve costs 1-2 cents per dollar of coverage — even cheaper than the
rare earth reserve's 4-11 cent ratio. The low cost reflects the leverage: pre-committed
national lab allocation costs almost nothing in peacetime and provides immediate surge
capacity in declared scenarios.

---

## The Evaluation Framework: Identifying Future Cross-Cutting Tools

The Sovereign Compute Reserve emerged from asking a specific question about the scenario
library: *what does every scenario response depend on that isn't specific to any scenario?*

This is the correct evaluation question for identifying cross-cutting DED tools. The process:

**Step 1 — Map the dependencies:** For each major scenario, list what the DED response
machinery requires to function (beyond the commodity-specific programs). In this analysis:
compute (NEID, allocation modeling, AI-accelerated discovery), specialized labor (CRHP
tracks), procurement authority (DPA invocation), and allied intelligence sharing.

**Step 2 — Identify recurrence:** Dependencies that appear across four or more scenarios
without a dedicated tool are candidates for a cross-cutting instrument. Compute appeared
in all seven scenarios analyzed. Permitting delay appeared in five. Allied hoarding appeared
in four.

**Step 3 — Apply the CRS logic:** Quantify the concentration of the cross-cutting dependency.
Does one actor, one geography, or one failure mode threaten the dependency across multiple
scenarios simultaneously? Compute: yes (TSMC/NVIDIA). Permitting: no (it's slow, but
the failure is distributed). Allied hoarding: yes (structural market failure, but not
concentrated in one actor).

**Step 4 — Check the cost ratio:** Is pre-positioning cheaper than crisis response? For
compute: $350-550M/year reserve vs. $21-40B/year EAL → yes. This ratio should be greater
than 5:1 to justify a dedicated tool; if the ratio is 1:2 or worse, the tool is not cost-effective.

**Step 5 — Identify the institutional home:** Does an institution already exist that can
operate the tool, or does DED need to build from scratch? For compute: DOE national labs
already exist, already have the hardware, already have security frameworks. DED co-invests
and gets allocation authority — it doesn't build a new institution.

**Identified gaps from this analysis (not yet addressed):**

| Cross-Cutting Dependency | Appears In | CRS-Equivalent | Existing Institution | Tool Exists? |
|--------------------------|-----------|---------------|---------------------|-------------|
| Compute | 7 scenarios | 0.855 | DOE national labs | **This document** |
| Permitting acceleration | 5 scenarios | N/A (structural, not concentrated) | DOI OSASC | Expert Reserve Program (partial) |
| Allied intelligence sharing | 4 scenarios | N/A (coordination failure) | NSC / NEID | NEID partially |
| Specialized labor reserve | 6 scenarios | N/A (workforce gap, not concentrated) | CRHP + ERP | Yes — these tools exist |
| Heavy logistics / transport | 4 scenarios | Moderate | DOT + FEMA | Partial (fuel contracts; transformer logistics) |

The permitting acceleration gap is the most significant remaining cross-cutting tool not
yet built. It appears across semiconductor fabs, REE mining/processing, domestic energy
infrastructure, and AHLP. The current Expert Reserve Program deploys regulatory experts
to accompany producers through permitting — but there is no dedicated permitting
acceleration authority (analogous to FAST-41 for infrastructure but broader in scope
and DED-activated on scenario declaration). That is the next cross-cutting tool candidate.

---

## Cross-References

- `ded/economics/supply-chain-concentration-risk.md` — CRS methodology; the Compute CRS
  of 0.855 is the highest score in the DED critical asset inventory
- `ded/scenarios/semiconductor-collapse/` — primary scenario where compute reserve
  addresses a second-order vulnerability
- `ded/scenarios/pandemic/` — drug discovery compute as Phase 1 force multiplier
- `ded/scenarios/rare-earth-denial/phase-3-structural-independence.md` — materials
  genomics and ML-guided discovery; the reserve provides the compute
- `ded/scenarios/grid-cyberattack/phase-1-immediate-response.md` — air-gapped grid
  modeling; distributed edge nodes
- `ded/tools/strategic-contracts.md` — Type A/B contract structure; cloud provider
  priority framework uses the same instrument design
- `ded/proposal/mission.md` — DED Accelerator authority; national lab cooperation
  agreements; NEID infrastructure
- `ded/assets/profiles/darpa.md` — DARPA as the model for DED Accelerator programs;
  national lab relationships
