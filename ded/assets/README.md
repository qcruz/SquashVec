# DED Strategic Asset Registry

## Purpose

The Strategic Asset Registry (SAR) is a living inventory of the United States' most economically significant resources, facilities, institutions, and systems — evaluated not by market value but by **strategic value to DED contingency operations**.

Market value and DED value are often misaligned. A rare earth refinery in Nevada may be worth $400M on a balance sheet and worth $400B in a semiconductor or defense collapse scenario. A community college with an engineering machine shop may be strategically irrelevant in normal times and a critical retraining hub during AI unemployment. The SAR captures this gap.

The registry serves three purposes:
1. **Mapping** — show what assets exist and where they concentrate
2. **Rating** — score each asset by cross-scenario strategic value
3. **Optimization** — identify the gap between current use and DED-optimal use, and the policy levers to close it

---

## DED Asset Score Methodology

Each asset receives a **DED Score (1–10)** computed from four dimensions:

### Dimension 1: Scenario Breadth (1–3)
How many DED scenarios does this asset materially affect?
- 1: Relevant to 1 scenario
- 2: Relevant to 2–3 scenarios
- 3: Relevant to 4+ scenarios

### Dimension 2: Criticality Within Scenarios (1–3)
Within the scenarios it affects, how critical is this asset?
- 1: Useful but substitutable within 12 months
- 2: Important; substitution requires 1–5 years
- 3: Single point of failure or no substitution available within 5 years

### Dimension 3: Adaptability (1–2)
Can this asset be repurposed or expanded beyond its current use for DED purposes?
- 1: Specialized; limited repurposing potential
- 2: Adaptable; can serve multiple DED functions with moderate investment

### Dimension 4: Optimization Gap (1–2)
How much unrealized DED value exists compared to current use?
- 1: Already near DED-optimal or gap is minor
- 2: Significant gap — current use underutilizes strategic potential; policy intervention could unlock major value

**DED Score = Breadth + Criticality + Adaptability + Optimization Gap (max 10)**

### Score Tiers
| Score | Tier | Designation |
|-------|------|-------------|
| 9–10 | Tier S | National Strategic Priority — warrants permanent DED monitoring and investment |
| 7–8 | Tier A | High Strategic Value — should be included in contingency planning and subsidy review |
| 5–6 | Tier B | Moderate Strategic Value — relevant to specific scenario clusters |
| 3–4 | Tier C | Contextual Value — important in specific scenarios but limited breadth or adaptability |
| 1–2 | Tier D | Limited DED relevance — track but low priority |

---

## Asset Categories

| Category | File | Description |
|----------|------|-------------|
| Physical Resources | [physical-resources.md](physical-resources.md) | Water, minerals, fossil fuels, agricultural land, renewable potential |
| Industrial Capacity | [industrial-capacity.md](industrial-capacity.md) | Manufacturing, processing, refining, chemical production |
| Critical Infrastructure | [critical-infrastructure.md](critical-infrastructure.md) | Grid, pipelines, ports, rail, telecommunications, water systems |
| Research Institutions | [research-institutions.md](research-institutions.md) | National labs, universities, R&D centers, defense research |
| Human Capital | [human-capital.md](human-capital.md) | Skilled workforce concentrations, training infrastructure, institutional knowledge |
| Financial Infrastructure | [financial-infrastructure.md](financial-infrastructure.md) | Clearing systems, reserve institutions, exchange infrastructure |

---

## High-Value Asset Profiles

The highest-scoring assets (Tier S and A) receive individual deep-dive profiles in `profiles/`:

| Asset | Score | Profile |
|-------|-------|---------|
| [U.S. Strategic Petroleum Reserve](profiles/strategic-petroleum-reserve.md) | 9 | Oil restriction, pandemic, grid attack |
| [Tennessee Valley Authority](profiles/tennessee-valley-authority.md) | 9 | Grid cyberattack, drought, industrial |
| [U.S. National Laboratory Network](profiles/national-labs.md) | 10 | Cross-scenario research, materials, energy, biodefense |
| [Mississippi River System](profiles/mississippi-river.md) | 10 | Drought, shipping blockade, agriculture, industrial |
| [Corn Belt Agricultural Complex](profiles/corn-belt.md) | 9 | Drought, oil restriction (fertilizer), pandemic (food), AI unemployment |
| [U.S. Semiconductor Fabrication Base](profiles/semiconductor-fabs.md) | 8 | Semiconductor collapse, grid attack, financial fragmentation |
| [Gulf Coast Refinery Complex](profiles/gulf-coast-refinery.md) | 9 | Oil restriction, industrial, grid, shipping blockade |
| [DARPA / Federal R&D Apparatus](profiles/federal-rd.md) | 9 | Cross-scenario innovation capacity |

*Profiles are added as scenarios are deepened. See individual category files for full asset inventories.*

---

## How to Update This Registry

### Adding a New Asset
1. Identify the asset and its category
2. Score it across all four dimensions; compute DED Score
3. Add to the appropriate category file with: name, location, current use, DED use, score breakdown, optimization gap
4. If score is 7+, create a profile in `profiles/`
5. Cross-reference relevant scenario files

### Updating an Existing Asset
- Re-score if new scenario is added that changes relevance
- Update optimization gap if policy changes have closed or widened it
- Note real-world changes (facility closure, ownership change, capacity expansion)

### Periodic Review
- Full registry review annually (triggered by DED status review cycle)
- Targeted review when a new scenario is added or an existing scenario is significantly updated
- "Optimization gap closed" flag when a DED-recommended policy has been implemented

---

## Key Principles

**DED value is relational, not absolute.** An asset's score depends on the scenario set. As new scenarios are added, existing asset scores may change. Always re-score when a new scenario is added.

**Concentration is a risk multiplier.** When multiple critical supply chains depend on a single asset or facility, that asset's criticality score should reflect the full downstream exposure, not just its direct function.

**The optimization gap is the policy agenda.** The difference between current use and DED-optimal use is not a critique — it is the basis for a targeted subsidy, reserve contract, or regulatory adjustment. Every high-gap asset is a policy opportunity.
