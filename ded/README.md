# Department of Economic Defense — Project Files

This directory contains the working proposal and research for a hypothetical
**Department of Economic Defense (DED)**: a federal agency designed to identify,
model, and prepare for economic disruptions caused by war, pandemic, climate events,
supply chain collapse, or other systemic shocks.

The department's core insight is that modern economies are **physical dependency
networks**, not merely markets. Disruptions do not respect sector boundaries —
an oil shortage is simultaneously a food crisis, a logistics crisis, an industrial
crisis, and a social stability crisis. The DED treats these as integrated systems.

---

## Core Function

The DED's exclusive instrument set is **economic and fiscal**: strategic contracts,
financial incentives, R&D programs, civilian labor deployment, and economic intelligence.
It does not manage crises, implement rationing, or operate infrastructure. It pre-positions
the economic conditions that make the right response rational before a crisis forces it.

The department continuously runs a planning loop across all critical systems:

1. **Identify** — which systems are critical and currently vulnerable
2. **Map** — the full dependency graph of each system
3. **Substitute** — what replaces each dependency if it fails
4. **Preserve** — pre-build the financial contracts that keep dormant capacity alive
5. **Transition** — pre-build the incentive packages that make voluntary adaptation economical
6. **Simulate** — stress-test continuously; update economic cost projections

Every step produces a **fiscal or contractual action** — not an operational directive.
The output is a portfolio of pre-built interventions ready to deploy, not a crisis
management manual for a department that doesn't run operations.

---

## Document Structure

```
proposal/           The pitch: mission, mandate, policy framework
framework/          Analytical methodology and templates
scenarios/          Situation-specific response plans by disruption type
supply-chains/      Underlying dependency maps (cross-scenario)
```

### Scenarios

Each scenario lives in `scenarios/<name>/` and contains:
- `overview.md` — scenario definition, severity tiers, triggering conditions
- `phase-1-*.md`, `phase-2-*.md`, `phase-3-*.md` — response by time horizon
- `supply-chains/` — how each critical chain is affected in this specific scenario

### Supply Chains

`supply-chains/` holds the **base dependency maps** — agnostic to any specific
scenario. Each file maps: what the chain produces, what it depends on, where the
single points of failure are, and what the substitution options are.

Scenario files reference these base maps and add scenario-specific overlays
(e.g., "under oil restriction, this chain fails at node X within Y weeks").

---

## Active Scenarios

| Scenario | Status | Detail Level |
|---|---|---|
| [Oil Restriction](scenarios/oil-restriction/overview.md) | In progress | Phases 1–3, demand policy, supply chains (transport, agriculture, energy, industrial) |
| [Pandemic](scenarios/pandemic/overview.md) | Overview complete | Severity tiers, cascade timeline, phase responses |
| [Drought](scenarios/drought/overview.md) | Overview complete | Severity tiers, cascade timeline, phase responses |
| [Semiconductor Collapse](scenarios/semiconductor-collapse/overview.md) | Overview complete | Severity tiers, cascade timeline, phase responses |
| [Grid Cyberattack](scenarios/grid-cyberattack/overview.md) | Overview complete | Severity tiers, cascade timeline, phase responses |
| [Rare Earth Denial](scenarios/rare-earth-denial/overview.md) | Overview complete | Chinese supply concentration, downstream effects, phase responses |
| [Shipping Blockade](scenarios/shipping-blockade/overview.md) | Overview complete | Chokepoint analysis, trade share, phase responses |
| [Financial Fragmentation](scenarios/financial-fragmentation/overview.md) | Overview complete | Dollar weaponization framing, severity tiers, phase responses |
| [AI Unemployment](scenarios/ai-unemployment/overview.md) | Overview complete | Vulnerable occupation analysis, safety net and transition policy |

---

## Economics and Instrument Library

| Document | Purpose |
|----------|---------|
| `economics/benefits-summary.md` | Combined $6.3T–$13.2T expected benefit case (loss avoidance + value creation) |
| `economics/value-discovery.md` | 8 IP/platform opportunities with investment cases and agreement anatomy |
| `economics/historical-instruments.md` | Historical precedent for all DED economic tools: anchor buying, trade restrictions, IP rights and seizure, compulsory licensing |
| `economics/ip-licensing-as-trade-tool.md` | How DED IP becomes a trade negotiation instrument; pharma licensing / IP swap mechanism [STUB] |
| `economics/historical-baseline.md` | Historical crisis loss data (sourced) |
| `economics/assumptions-log.md` | Confidence ratings and data sources for all estimates |

---

## Standalone Programs — DED-Derived

A secondary output of the DED's analysis is the identification of policy instruments that
have significant standalone value independent of any crisis scenario — programs worth
pursuing on their own merits, whose design was sharpened by DED scenario planning.

| Program | File | Standalone Case |
|---------|------|-----------------|
| **Workforce Development Floor** | `proposal/workforce-development-floor.md` | Requires every employer (≥100 FTE) to maintain 1 paid intern per 100 employees. Creates ~1M new paid work experiences/year at near-zero federal cost, funded entirely by private employers. 35–40:1 projected ROI. Addresses the disappearing entry-level on-ramp as AI eliminates routine positions — a structural labor market fix the market will not self-correct. |
| **Outcome-Linked Bond Guarantees** | `tools/outcome-linked-bonds.md` | Government-guaranteed bonds that pay higher interest when adverse economic outcomes occur (crop yield decline, energy price spikes, regional unemployment rises). Converts unpredictable emergency subsidy obligations into pre-committed contingent guarantees priced by private markets. Primary example: inverse crop yield bonds as farmer and insurer hedge, reducing direct farm subsidy expenditure in bad years. |
| **Space Resource Extraction Incentives** | `proposal/space-mining-incentives.md` | DED as anchor buyer and co-investor in commercial space mining — Accelerator (Type D contracts, $3–5B/5yr), Advance Purchase Commitments at 90% of terrestrial spot price, Strategic Space Resource Reserve, and International Space Mining Framework. Eliminates Chinese/DRC leverage over platinum group metals, cobalt, and nickel over a 10–20 year horizon. The only path to geopolitically independent supply of materials that constrain the 21st-century defense and clean energy economy. |
| **Synthetic Protein Program** | `proposal/synthetic-protein-program.md` | DED Accelerator, federal anchor buying (DoD/BOP/VA), and bioreactor infrastructure co-investment to compress cultivated and precision-fermentation protein to commercial scale 8–12 years ahead of unassisted development. Reduces agricultural water demand 82–96% per kg of protein, reduces fertilizer exposure to natural gas price shocks, creates pathogen-immune distributed protein supply independent of maritime shipping. ~$6–9B committed over 5 years; reduces drought, oil restriction, and food shortage scenario severity permanently. |

These programs emerged from DED scenario analysis but do not require a crisis to justify
deployment — they reduce structural vulnerabilities and government fiscal exposure in normal
operating conditions.

---

## How to Deepen a Branch

To go deeper into any supply chain or scenario:

1. Add a new file inside the relevant `supply-chains/` subdirectory
2. Or add a new `supply-chains/<chain>.md` under a scenario folder
3. Reference it from the scenario phase file or the base supply-chain index
4. Update the table above

The goal is a tree structure where every node can be expanded indefinitely.
