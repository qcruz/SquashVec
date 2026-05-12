# Scenario Template

Use this template when creating a new scenario under `scenarios/<name>/`.

---

## overview.md

```markdown
# Scenario: <Name>

## Scenario Definition
[What is the disruption? What causes it? What is its geographic scope?]

## Why This Scenario Matters
[How does it cascade? Which sectors are hit first, second, third?]

## Severity Tiers
| Tier | Disruption Level | Trigger Example |
|---|---|---|
| Tier 1 | 10–25% reduction | [Example] |
| Tier 2 | 25–60% reduction | [Example] |
| Tier 3 | 60–100% | [Example] |

## Cascade Timeline
| Timeframe | Primary Effects | Secondary Effects |
|---|---|---|
| Week 1–2 | | |
| Month 1–3 | | |
| Month 3–6 | | |
| Year 1–2 | | |

## Response Documents
- [Phase 1: Immediate Stabilization](phase-1-stabilization.md)
- [Phase 2: Medium-Term Adaptation](phase-2-adaptation.md)
- [Phase 3: Long-Term Structural Change](phase-3-structural.md)

## Supply Chain Deep Dives
- [Chain 1](supply-chains/chain1.md)
- [Chain 2](supply-chains/chain2.md)
```

---

## phase-1-stabilization.md

**Time horizon:** 0–6 months  
**Objective:** Prevent panic, cascading shortages, and economic collapse.

Sections:
- Existing legal tools that can be activated immediately
- Demand reduction measures (fastest lever)
- Prioritization frameworks (who gets what)
- Social stability measures

---

## phase-2-adaptation.md

**Time horizon:** 6 months–5 years  
**Objective:** Structurally reduce dependence on the disrupted input.

Sections:
- Substitution programs (what replaces the disrupted input)
- Industrial mobilization (what gets converted, at what scale)
- Supply chain redundancy buildout
- Cross-sector coordination

---

## phase-3-structural.md

**Time horizon:** 5–20 years  
**Objective:** Build an economy that is no longer vulnerable to this disruption class.

Sections:
- Structural changes to physical infrastructure
- Policy changes to incentive structure
- Long-term metrics and targets
- Connection to other scenarios (shared resilience investments)

---

## supply-chains/<chain>.md

For each critical supply chain affected by this scenario, create a file at
`scenarios/<name>/supply-chains/<chain>.md` with:

- Dependency map (what the chain needs, what it produces)
- Failure sequence (how this specific scenario degrades this chain, and when)
- Substitution options (specific to this scenario's constraints)
- Pre-built requirements (what must be ready before the crisis)
- Cross-reference to base map in `supply-chains/`
