# DED Analytical Methodology

Every DED analysis — regardless of scenario — follows the same six-step loop.
This document defines the loop and how to apply it.

---

## The DED Mandate — Economic and Fiscal Instruments Only

The DED does not manage crises. It does not ration fuel, operate grain reserves, or
issue emergency orders. Those functions belong to existing agencies: FEMA, USDA, DOE,
HHS, state emergency management.

**The DED's exclusive instrument set is economic and fiscal:**
- Strategic contracts that financially incentivize private actors to maintain, build, or
  redirect capabilities the nation needs
- Research programs (Accelerators, ERP deployments) that produce IP and technological
  capabilities as national assets
- Financial instruments (loan guarantees, tax credits, advance payment programs) that
  make the economically correct choice also the privately rational choice
- Civilian labor deployment (CRHP reserve) as a low-cost, rapidly mobilizable workforce
  for infrastructure build-out and repair
- Economic intelligence that monitors leading cost indicators — energy, food, water,
  housing, and manufacturing input prices — before they become crises

**Every DED intervention addresses an economic concern first:**
Rising energy costs. Rising food prices. Rising water utility rates. Rising construction
costs. These are the DED's triggering conditions — not only existential supply failure.
A 30% rise in residential electricity rates is a DED-scope concern before it is a FEMA
concern. The department's job is to act at the economic indicator stage, not the
emergency stage.

**The military cost connection:**
Every cost increase in energy, food, water, transportation, and manufacturing is also
a direct increase in the cost of maintaining military readiness. The Department of
Defense spends ~$20B/year on energy, ~$5B/year on food service and rations, and trillions
on platforms built with steel, semiconductors, and specialized materials subject to
supply disruption. DED's economic interventions protect military purchasing power and
procurement stability — this is the constitutional defense justification for the department's
authority and budget.

**What the DED does not do:**
It does not implement rationing systems, manage emergency food distribution, operate
utility infrastructure, or issue mandates to private businesses outside of contract terms
voluntarily agreed. Where those functions are needed, DED pre-positions the economic
conditions that make other agencies' jobs easier — and funds the preparation before
the crisis, not the response during it.

---

## The Core Loop

```
1. IDENTIFY      Which systems are critical? Which are currently vulnerable?
      ↓
2. MAP           What is the full physical dependency graph of each system?
      ↓
3. SUBSTITUTE    What replaces each node if it fails? What is the lag time?
      ↓
4. PRESERVE      What dormant capacity must be maintained for rapid restart?
      ↓
5. TRANSITION    What is the pre-built conversion sequence if substitution is needed?
      ↓
6. SIMULATE      Stress-test the plan. Find gaps. Repeat from step 1.
```

**The loop produces economic intervention packages, not operational directives.**
Each step culminates in a fiscal or contractual action the DED can take in peacetime
to ensure the transition path exists when needed. Step 4 (Preserve) is not "stockpile
grain" — it is "fund Type C strategic reserve contracts with grain elevator operators."
Step 5 (Transition) is not "mandate crop shifts" — it is "pre-build the financial
incentive package that makes voluntary crop shifts economically rational."

---

## Step 1: Identify Critical Systems

A critical system is one whose failure causes cascading damage across multiple
sectors within a short time window (weeks to months).

**Identification criteria:**
- Breadth: how many other systems depend on it?
- Speed: how quickly does failure propagate?
- Substitutability: how hard is it to replace in the short term?
- Concentration: how many single points of failure does it have?

**Examples of critical systems:**
- Liquid fuels (oil, diesel, jet fuel)
- Nitrogen fertilizer
- Electrical grid
- Semiconductor supply
- Freight rail and port access
- Freshwater for agriculture
- Pharmaceuticals and medical supply chains

---

## Step 2: Map Dependencies

For each critical system, build a **dependency graph**: a structured map of
what the system requires to function, where those inputs come from, and
what the system produces that other systems need.

**A dependency map includes:**
- Primary inputs (what does it consume?)
- Input sources (domestic vs. foreign, concentrated vs. distributed)
- Logistics path (how do inputs arrive?)
- Outputs (what does it produce?)
- Downstream dependents (what breaks if output stops?)
- Time-to-failure (how long before downstream systems feel the disruption?)
- Substitution options at each node

**Format:** Each supply chain file in `supply-chains/` contains this map.

---

## Step 3: Substitution Analysis

For each node in the dependency graph, identify substitutes:

| Substitute Type | Description | Lag Time |
|---|---|---|
| Drop-in | Same input, different source | Days–weeks |
| Process change | Different input, same output | Weeks–months |
| Product change | Different output, same function | Months–years |
| Demand reduction | Less of the output needed | Immediate–months |
| Technology shift | New system replaces old | Years |

The substitution analysis answers: **how long does adaptation take, and what
does it cost?** This determines the urgency of response in each phase.

---

## Step 4: Preserve Dormant Capacity

Some substitutes exist but are not currently active. These require:
- Tooling and equipment maintained but idle
- Engineering knowledge retained (staff, documentation, training)
- Physical infrastructure kept in restart-ready condition
- Periodic readiness drills (like reserve military units for industry)

The DED maintains a **Dormant Capacity Register**: a classified inventory of
industrial facilities, equipment, and expertise that can be reactivated under
emergency declaration.

---

## Step 5: Pre-Build Transition Plans

For each major substitution path, pre-write the activation sequence:

1. Legal authority required (existing law, emergency declaration, new authorization)
2. Resource sequence (what is mobilized first, in what order)
3. Prioritization framework (who gets what, in what order, with what enforcement)
4. Industrial conversion steps (which factories retool, to produce what, by when)
5. Public communication strategy (framing, timeline, what is asked of citizens)
6. Metrics for success and exit criteria

The goal: when a disruption begins, the plan is already written.
The response is execution, not invention.

---

## Step 6: Simulate

Plans that have not been tested have unknown failure modes.

**Simulation types:**
- **Tabletop exercises**: senior officials walk through a scenario, making decisions
  against the plan. Gaps and contradictions surface.
- **Quantitative modeling**: estimate resource flows, lag times, economic impacts
  under different disruption severities.
- **Industry war games**: include private sector partners — they know where the
  real dependencies are.
- **Red team analysis**: assign a team to actively find ways the plan fails.

Simulations feed back into Step 1, updating the criticality assessments.

---

## Scenario Severity Tiers

Every scenario is analyzed at three severity tiers, corresponding to different
levels of supply disruption:

| Tier | Disruption Level | Example |
|---|---|---|
| **Tier 1** | 10–25% reduction | Regional conflict affecting one supplier |
| **Tier 2** | 25–60% reduction | Major producer embargo or collapse |
| **Tier 3** | 60–100% reduction | Global supply denial or catastrophic failure |

Plans exist for all three tiers. Tier 3 plans are the most resource-intensive
to maintain but the most valuable when needed.

---

## Document Conventions

- Each **scenario** file (`scenarios/<name>/`) contains situation-specific analysis
- Each **supply chain** file (`supply-chains/<chain>/`) contains the base dependency map
- Scenario files reference supply-chain files and add scenario-specific overlays
- Phase files (`phase-1-`, `phase-2-`, `phase-3-`) organize by response time horizon:
  - **Phase 1**: 0–6 months (immediate stabilization)
  - **Phase 2**: 6 months–5 years (structural adaptation)
  - **Phase 3**: 5–20 years (long-term resilience)
