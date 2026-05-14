# DED Policy Tool Library

**Last Updated:** 2026-05

---

## Purpose

The DED maintains a catalogue of policy instruments — tools the department can recommend,
deploy, or test to influence economic behavior, stabilize supply chains, or validate
assumptions about how populations and markets respond to specific interventions.

This is distinct from scenario response plans and asset investment cases. Those answer:
*what should be built or stockpiled?* The tool library answers: *what can we do right now,
at what scale, with what expected effect?*

A tool is only useful if its behavior is well-characterized before deployment. The library
documents each tool's historical track record, mechanism of action, DED-specific
applications, scale options, interaction effects with other tools, measurement framework,
and known failure modes.

---

## Tool vs. Program

**Tool:** A general-purpose policy instrument that can be deployed in multiple scenarios
at varying intensity. Examples: direct cash transfers, price controls, tax incentives,
rationing systems, reserve releases, emergency procurement authority.

**Program:** A specific implementation of one or more tools targeting a defined outcome.
Example: the Emergency EV Conversion Program in the oil restriction scenario deploys
tax incentives + point-of-sale rebates + guaranteed buyback simultaneously.

The tool library documents the instruments. Scenario phase files document the programs
that assemble them.

---

## Tool Analysis Template

Every tool entry follows this structure:

```
1. MECHANISM
   How the tool works; what behavior it targets; what market or system it intervenes in

2. DEPLOYMENT LEVELS
   Local / Regional / National / International
   What each level looks like in practice; threshold conditions for escalation

3. SCALE OPTIONS
   Pilot → Limited → Full Deployment
   Size, eligibility, funding requirements, and activation timeline at each scale

4. HISTORICAL PRECEDENTS
   Documented uses with measured outcomes; data sources cited

5. DED APPLICATIONS
   Which scenarios benefit; at what phase; what specific outcome it supports

6. TARGETING VARIANTS
   Geographic / Demographic / Behavioral / Conditional targeting options
   The DED use of most tools is more precise than the blunt historical baseline

7. INTERACTION EFFECTS
   How this tool behaves when deployed alongside other tools
   Known amplification, cancellation, or substitution effects

8. MEASUREMENT FRAMEWORK
   Leading indicators (signal it's working before full effect)
   Primary metrics (direct outcome measurement)
   Lagging indicators (second-order effects; watch for unintended consequences)

9. RISKS AND FAILURE MODES
   Documented ways this tool fails; conditions under which it backfires

10. COST ESTIMATES
    Per-unit cost; total cost at each deployment scale; fiscal mechanism options
```

---

## Tool Categories

| Category | Description | Tools |
|----------|-------------|-------|
| Direct Transfers | Cash or in-kind payments to individuals or businesses | [Stimulus Checks](stimulus-checks.md) · UBI Pilots · Business Survival Loans |
| Price Instruments | Tax, subsidy, price floor/ceiling, surcharge | Gas Tax · Carbon Price · Point-of-Sale Rebate |
| Rationing Systems | Allocation of scarce goods by authority rather than price | Fuel Rationing · Food Allocation · PPE Priority |
| Reserve Deployments | Release from government stockpiles to stabilize supply/price | SPR Drawdown · Grain Reserve Release · SNS Release |
| Emergency Procurement | Government as buyer of last resort; Defense Production Act | DPA Invocation · Federal Supply Contracts · Surge Manufacturing |
| Mandates and Standards | Required behavior from businesses or individuals | Remote Work Mandate · Essential Worker Designation · Building Code |
| Labor Mobilization | Deployment of workforce to specific functions | Cross-Training Programs · Reserve Corps · Civilian Service |
| Financial Instruments | Credit, guarantee, insurance, liquidity facilities | Emergency Loan Guarantee · Fed Facility · Export Credit |
| Trade Tools | Tariffs, export controls, import prioritization | Critical Goods Import Priority · Export License · Sanctions |
| Information Tools | Shaping behavior through data and communication | Early Warning · Price Transparency · Public Procurement Signaling |
| Infrastructure Authority | Fast-track, override, or commandeer infrastructure use | Emergency Permitting · Eminent Domain · Mandatory Access |

---

## Catalog Index

| Tool | Category | File | Scenarios | Last Updated |
|------|----------|------|-----------|--------------|
| Stimulus Checks | Direct Transfers | [stimulus-checks.md](stimulus-checks.md) | Pandemic, AI Unemployment, Oil Restriction, Drought | 2026-05 |
| Tax Return Advance Loans (Semi-Annual) | Direct Transfers | [tax-advance-loans.md](tax-advance-loans.md) | Pandemic, AI Unemployment, Oil Restriction, Drought, Financial Fragmentation | 2026-05 |
| Strategic Contracts and Directed Subsidies | Emergency Procurement / Financial | [strategic-contracts.md](strategic-contracts.md) | All scenarios | 2026-05 |
| Expert Reserve Program (ERP) | Labor Mobilization / Strategic Contracts | [expert-reserve-program.md](expert-reserve-program.md) | All scenarios | 2026-05 |
| *Gas Tax / Fuel Surcharge* | Price Instruments | *see demand-reduction-policy.md* | Oil Restriction | 2026-05 |
| *Point-of-Sale EV Rebate* | Price Instruments | *see demand-reduction-policy.md* | Oil Restriction | 2026-05 |
| *Remote Work Mandate* | Mandates | *see demand-reduction-policy.md* | Oil Restriction, Pandemic | 2026-05 |
| *SPR Drawdown* | Reserve Deployments | *see oil-restriction/supply-chains/energy.md* | Oil Restriction | 2026-05 |
| Mandatory Paid Internship Floor | Labor Mobilization / Human Capital | [internship-floor.md](internship-floor.md) | AI Unemployment (primary), Pandemic, all scenarios | 2026-05 |
| Outcome-Linked Bond Guarantees | Financial Instruments | [outcome-linked-bonds.md](outcome-linked-bonds.md) | Drought (primary), AI Unemployment, Oil Restriction, Semiconductor Collapse | 2026-05 |
| *Rationing Systems* | *Out of scope — see scope note* | [rationing-systems.md](rationing-systems.md) | N/A — DED uses price stabilization instruments instead | 2026-05 |

*Italicized entries exist in scenario files; standalone tool entries are added as the
catalogue is built out.*

---

## Using the Tool Library in Scenario Planning

When a scenario phase plan calls for a policy intervention:

1. **Check the tool library first** — does an analyzed version of this tool already exist?
   Use the documented parameters rather than re-estimating.

2. **Note the scale** — scenario plans should specify which deployment level (pilot/limited/full)
   is appropriate for each phase. Phase 1 tools are typically limited-scale; Phase 2 may go full.

3. **Log interaction effects** — when multiple tools are deployed simultaneously in a scenario
   phase, check the interaction effects section of each tool to flag amplification or
   cancellation risks.

4. **Add to measurement plan** — every scenario phase should inherit the measurement framework
   from each tool it deploys, so impact tracking is built in from the start.

---

## Pilot Testing Doctrine

The DED treats peacetime as an opportunity to test tools before crisis deployment.
A tool that has never been piloted at any scale is a tool whose behavior is unknown.
Unknown behavior under crisis conditions is a compounding risk.

**Pilot doctrine:**
- Every Category A tool (direct transfers, rationing, price controls) should be piloted
  in at least one region before being included in a scenario phase plan
- Pilot design: randomized rollout with control group; minimum 6-month duration;
  independent evaluation before scaling
- Pilot findings are incorporated into the tool entry's Historical Precedents section
- A tool that fails in a pilot should be analyzed for *why* before being included in
  any scenario plan — not simply discarded (understanding failure modes is valuable)
