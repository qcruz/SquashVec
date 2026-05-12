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

The department continuously runs a planning loop across all critical systems:

1. **Identify** — which systems are critical and currently vulnerable
2. **Map** — the full dependency graph of each system
3. **Substitute** — what replaces each dependency if it fails
4. **Preserve** — maintain dormant capacity and restart-ready plans
5. **Transition** — pre-built emergency conversion playbooks
6. **Simulate** — stress-test continuously, not only during crises

This produces a living set of contingency plans updated by ongoing research,
not a static report filed and forgotten.

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

## How to Deepen a Branch

To go deeper into any supply chain or scenario:

1. Add a new file inside the relevant `supply-chains/` subdirectory
2. Or add a new `supply-chains/<chain>.md` under a scenario folder
3. Reference it from the scenario phase file or the base supply-chain index
4. Update the table above

The goal is a tree structure where every node can be expanded indefinitely.
