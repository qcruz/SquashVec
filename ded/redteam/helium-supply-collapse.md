# DED Red Team Scenario: Federal Helium Reserve Collapse + Qatar Embargo

**Scenario ID:** RT-001
**Last Updated:** 2026-05
**Primary DED Scenarios Activated:** Semiconductor Collapse, Rare Earth Denial (analog), Healthcare Supply
**Estimated Economic Impact:** $80–120B over 24 months
**DED Readiness Assessment:** Moderate — partial program coverage; significant gaps in helium-specific instruments

---

## 1. Situation

### Background

Helium is the second-lightest element and the only one that cannot be synthesized or substituted
for its core industrial functions. Unlike most industrial gases, helium cannot be manufactured —
it is extracted as a byproduct of natural gas production from underground reservoirs where it
accumulated over billions of years from radioactive decay of uranium and thorium. Once vented
to the atmosphere, it is effectively lost forever (it escapes Earth's gravity).

The United States historically controlled global helium supply through the Federal Helium Reserve
in Amarillo, Texas — a $1.3B underground reservoir that held approximately one-third of global
known reserves. Between 2013 and 2023, the U.S. government sold off this reserve under a
congressional mandate to privatize helium, deliberately dispersing the stockpile that had
served as the world's buffer supply.

**2026 global helium supply geography:**
| Source | Global Supply Share | Notes |
|--------|-------------------|-------|
| Qatar (Ras Laffan) | 32% | LNG coproduction; single facility |
| United States (ExxonMobil, Wyoming, etc.) | 24% | Declining; Federal Reserve nearly exhausted |
| Russia (East Siberia) | 26% | Gazprom-operated; politically exposed |
| Algeria | 8% | State-controlled; limited expansion |
| Other | 10% | Small fields; no surge capacity |

### The Triggering Event

**March 2027.** Two events occur within 11 days of each other:

**Event 1 (March 4):** A major compressor failure and subsequent fire at the Ras Laffan
Helium 2 facility in Qatar — the world's largest single helium production facility
(accounting for ~22% of global supply alone) — forces a complete shutdown. The fire,
caused by a hydrogen sulfide release igniting during maintenance, destroys the primary
compression train. Qatar Petroleum engineers estimate 8–14 months to full repair and restart.

**Event 2 (March 15):** Russia, responding to a new U.S./EU sanctions package over the
Belarus border conflict, announces that it will "redirect" helium exports from East Siberia
facilities away from U.S. and European markets to China and India. This removes another
26% of global supply from Western markets.

**Combined effect:** 48% of global helium supply accessible to Western buyers is offline
or denied within 11 days. Spot helium prices, which were $8–12/MCF (thousand cubic feet)
in early 2027, spike to $45–80/MCF within 3 weeks. Liquid helium (used by MRI machines
and semiconductor fabrication) reaches $15–25/liter (vs. $4–6 pre-crisis).

**The Federal Reserve problem:** The U.S. Federal Helium Reserve — the instrument that would
historically have buffered exactly this event — holds only 450 MMscf (million standard cubic
feet), down from 30+ Bcf at its 1994 peak. At 2027 U.S. consumption rates (~45 Bcf/year),
this represents less than 4 days of supply.

---

## 2. Cascade Timeline

### Week 1–2: Price Shock
- Helium spot price reaches $60/MCF; liquid helium shortage begins in hospital markets
- MRI scanner manufacturers (GE HealthCare, Siemens Healthineers, Philips) begin rationing
  liquid helium deliveries to hospitals prioritizing new installations over operating systems
- Semiconductor fabs (TSMC Phoenix, Intel Ohio, Samsung Austin) begin drawing down on-site
  storage; standard on-site buffer is 30–60 days at normal usage
- NEID alert triggers: DED helium price dashboard (if it exists — see Section 6) shows
  Tier 1 alert condition

### Month 1: Hospital Rationing
- Approximately 13,000 MRI scanners in the U.S. require liquid helium for superconducting
  magnet operation. Standard refill cycle: every 6–18 months. At crisis prices, hospital
  budgets cannot sustain normal refill rates.
- ~800 hospitals begin scheduling MRI capacity reductions (fewer procedures per day to
  conserve helium). Elective MRI procedures — the majority of volume — begin 4–6 week
  delays. Emergency MRI capacity maintained with priority allocation.
- Research institutions (universities, national labs) with NMR spectrometers (also
  liquid-helium cooled) begin shutting down instruments; chemistry, materials science,
  and pharmaceutical R&D pauses.

### Month 2–3: Semiconductor Impact
- On-site helium storage at major fabs exhausted or critically low. Helium is used in:
  - Epitaxial growth chambers (inert carrier gas during deposition)
  - Ion implantation (cooling)
  - Leak detection during wafer fabrication
  - Fiber optic manufacturing (cooling during draw)
- TSMC Phoenix reduces production to 70% capacity; Intel Ohio reduces to 60%. Samsung
  Austin maintains higher throughput by outbidding competitors for remaining spot supply.
- Chip delivery timelines extend by 8–12 weeks. Automotive and industrial sectors feel
  this first; consumer electronics absorb inventory from existing pipeline for 4–6 months.

### Month 3–6: Defense and National Security Impact
- **Nuclear weapons maintenance:** Tritium production at Savannah River Site uses helium
  as a coolant and carrier gas. Helium shortage threatens the classified tritium production
  schedule. (Tritium decays at ~5.5%/year; U.S. warhead maintenance requires continuous
  replenishment.)
- **Surveillance and scientific balloons:** High-altitude balloons (weather, surveillance,
  HAARP research) use helium. Military balloon surveillance programs face suspension.
- **Particle accelerators:** Fermilab, SLAC, Jefferson Lab — all superconducting accelerator
  facilities — require liquid helium for magnet cooling. Partial or full shutdowns begin.
  CERN (Geneva) activates emergency helium conservation protocols.

### Month 6–12: Economic Cascade
- Auto industry: semiconductor shortages reduce U.S. vehicle production by estimated
  800k–1.2M units. At $35,000 average vehicle value, $28–42B in GDP not produced.
- Medical device sector: NMR research pause delays pharmaceutical R&D pipelines;
  estimated 18–36 month lag in new drug clinical submissions.
- MRI imaging backlog: 2–4M deferred imaging procedures; downstream diagnostic delays
  contributing to delayed cancer and cardiovascular diagnoses. Healthcare cost impact:
  $8–15B in delayed treatment costs (2–5 year tail).

---

## 3. Economic Damage Estimate

| Category | 24-Month Loss | Methodology |
|----------|--------------|-------------|
| Semiconductor production reduction | $35–50B | 800k–1.2M vehicles @ $35k; $8–12B electronics; $6–10B industrial |
| Healthcare — MRI capacity and diagnostics | $8–15B | Delayed diagnoses; equipment operational costs; elective procedure backlog |
| Research and pharmaceutical R&D delay | $5–10B | Lost research output; delayed drug pipeline (present-value estimate) |
| Industrial manufacturing (leak detection, welding) | $4–8B | Process inefficiency and substitution costs |
| Defense program disruption | Classified | Tritium production schedule; balloon programs |
| Price premium paid (all helium purchases at $45+ vs. $10 baseline) | $12–18B | ~40 Bcf/year U.S. demand × $35 premium × 1.5 years available |
| **Total estimated** | **$64–101B** | Excludes classified defense impact |

---

## 4. DED Program Mapping

### Immediately Activatable (Pre-Built, No New Investment Required)

**Semiconductor Collapse Phase 1 — Priority Reserve Contracts:**
Helium shortage triggers semiconductor production reduction. The existing semiconductor
priority allocation framework (Tier 1–5 by strategic importance) immediately applies:
- Defense semiconductor demand moves to Tier 1 priority for available helium allocation
- Medical device semiconductors move to Tier 2
- Automotive/industrial to Tier 3
- Consumer electronics de-prioritized
- DED covers spot-to-contract spread from emergency reserve for Tier 1/2 purchases

**NEID Alert Activation:**
If helium price indices are built into NEID (they currently are not — see Section 6),
this would trigger automatically. As-is, NEID's semiconductor production tracking would
catch the cascade 4–6 weeks after it begins.

**Expert Reserve Program (ERP) — Materials Scientists:**
DED deploys materials science ERP members to:
- National labs (Argonne, NREL) to accelerate development of helium-lean or helium-free
  MRI magnet cooling systems (high-temperature superconductor alternatives exist but are
  not yet commercial at scale)
- TSMC Phoenix and Intel Ohio as technical advisors on helium conservation protocols
  (closed-loop helium recovery systems can reduce consumption 40–70%)

---

### Requires New DED Action (Type A/B Contracts)

**Helium Recovery System Deployment (Type B):**
The most effective medium-term response is deploying closed-loop helium recovery and
reliquefaction systems at major consuming facilities. These systems recapture helium
that would otherwise vent during use, reducing consumption by 40–70%.

Current status: approximately 20% of large industrial helium users have recovery systems;
80% do not because the economics favored cheap supply over capital investment.

DED Type B co-investment program:
- Target: 500 largest helium consumers (hospitals, fabs, research institutions)
- Capital cost: $300k–$2M per facility for reliquefaction equipment
- DED co-investment: 50% of capital cost; company pays remainder and retains equipment
- Timeline: 60–90 days to source and install (standard industrial gas equipment)
- Expected helium demand reduction: 30–45% at participating facilities
- Total program cost: $400–600M; reduces U.S. helium demand by ~15 Bcf/year

**Hospital Liquid Helium Reserve Contracts (Type A):**
DED pre-negotiates priority allocation contracts with domestic helium suppliers
(ExxonMobil, Matheson, Air Products) guaranteeing hospitals receive liquid helium
at contract prices (below spot) during declared shortage, in exchange for annual
capacity reservation fees:
- 13,000 MRI-equipped hospitals enrolled; ~2,500 with significant clinical dependency
- Annual reservation fee: $15,000–40,000 per hospital
- Price cap during shortage: 150% of 3-year trailing average (vs. current 500–800%)
- Total program cost: $40–100M/year in reservation fees; prevents $8–15B in healthcare disruption

**New Domestic Source Development (Type B — 18-Month Horizon):**
The U.S. has significant untapped helium in natural gas fields in Kansas, Oklahoma, and
the Texas Panhandle that are not currently extracted because they are small and the
economics didn't favor it at $10/MCF. At $45–80/MCF, the economics become compelling
with modest government support:
- Type B contracts with 8–12 small domestic producers to fast-track helium extraction
  from natural gas fields currently being flared or vented
- Capital cost per project: $15–50M
- DED co-investment: 40%; guaranteed floor price: $30/MCF for 5 years
- Total program: $400–800M
- Expected production increase: 3–6 Bcf/year within 18 months; 8–15 Bcf/year within 36 months

**Allied Supply Contracts (Type C — Australia, Canada):**
Australia has emerging helium production (North American Helium in Saskatchewan; Desert
He in Western Australia). These fields are at various stages of development:
- DED Type C offtake contracts at $25–35/MCF floor price for 10 years
- Australia/Canada production ramping to 2–4 Bcf/year within 24 months
- Combined with reduced domestic demand (recovery systems), closes most of the supply gap

---

### Longer-Horizon Programs (DED Accelerator)

**High-Temperature Superconductor (HTS) MRI Development:**
Current MRI machines use low-temperature superconductors requiring liquid helium at 4 Kelvin.
High-temperature superconductors (YBCO, BSCCO) can operate at 20–77 Kelvin — cooled by
liquid nitrogen or mechanical cryo-coolers, not helium. HTS MRI scanners exist at prototype
stage; GE HealthCare and Siemens are developing them, but commercial deployment is 5–8 years
out without acceleration.

DED Accelerator (Type D contracts with GE HealthCare, Siemens Healthineers, Philips):
- $500M–1B over 5 years to compress HTS MRI commercialization by 3–4 years
- IP into DED Asset Register; DED retains royalty-free license; manufacturer retains commercial rights
- Long-run result: U.S. hospital infrastructure transitions to helium-independent MRI over
  10–15 years, eliminating the healthcare vector of this scenario entirely

---

## 5. Optimal Program Combination

### Sequencing and Prioritization

**Day 0–30: Triage and allocation (no new spending)**
1. Activate NEID semiconductor alert → semiconductor priority allocation framework
2. ERP materials scientist deployment to fab and national lab sites
3. Deploy DED emergency procurement authority to DPA-rate helium purchases on spot market
   for defense use (tritium production priority)

**Month 1–3: Defense the most critical fixed assets ($500M–1B)**
4. Hospital liquid helium reserve contracts (Type A) — $40–100M/year; prevent healthcare cascade
5. Emergency helium recovery system grants for top 100 most critical facilities (hospitals +
   fabs with highest defense dependency) — $200–400M; 60-day deployment
6. Allied supply fast-track: initiate Type C negotiations with North American Helium (Canada)
   and Desert He (Australia) — no cost until contracts signed; 90-day negotiation target

**Month 3–12: Close the supply gap ($1–2B)**
7. Full recovery system Type B program (500 facilities) — $400–600M
8. Domestic source development Type B (8–12 producers) — $400–800M; production begins month 18
9. Execute Type C allied contracts at established floor prices

**Month 12–36: Structural independence ($1–2B)**
10. HTS MRI Accelerator launch — $500M–1B over 5 years
11. New domestic fields reaching commercial production; allied supply filling gap
12. Recovery systems reducing aggregate demand by 30–45%

### Cost/Benefit Matrix

| Program | Cost | Benefit | Ratio |
|---------|------|---------|-------|
| Hospital Type A reserve contracts | $100M (2yr) | $8–15B disruption prevented | 80–150:1 |
| Recovery system Type B (top 100 critical) | $400M | $20–35B production continuity | 50–88:1 |
| Allied Type C contracts | $200M (commitment cost) | $15–25B supply gap coverage | 75–125:1 |
| Domestic source Type B | $600M | $10–20B long-run supply security | 17–33:1 |
| HTS MRI Accelerator | $750M | Eliminates $8–15B/shortage healthcare vector permanently | 11–20:1 |
| **Total optimal program** | **~$2–3B** | **$64–101B prevented (this event) + future events** | **>30:1** |

### What to Deprioritize

**SPR-analog helium reserve:** Unlike petroleum, helium cannot be stored in large quantities
without continuous energy input (liquefied helium requires active refrigeration). A strategic
helium reserve would cost $3–5B to build and $200–400M/year to maintain — far less efficient
than investing that money in demand reduction (recovery systems) and supply diversification.
The correct analog is not the SPR but the CHIPS Act: invest in the infrastructure that makes
the vulnerability permanent rather than stockpiling the scarce input.

**Price controls on helium:** At $60–80/MCF, price controls would accelerate consumption
(users don't conserve) while eliminating the economic signal that drives new production
investment. The opposite of what DED needs. Targeted allocation (priority contracts) is
the correct instrument, not price suppression.

---

## 6. What the DED Wouldn't Have

**Critical Gap 1 — No NEID helium monitoring:**
Helium is not currently in NEID's commodity price dashboard. The scenario would be detected
indirectly (semiconductor production alerts) with a 4–6 week lag. Pre-build: add helium
to NEID's industrial gas price and supply monitoring panel; alert triggers at >50% price
increase over 30-day baseline.

**Critical Gap 2 — No pre-enrolled hospital helium reserve list:**
The hospital liquid helium reserve contract program (Type A) requires knowing which hospitals
have MRI machines, their liquid helium consumption rates, and their banking details for
disbursement. This data does not exist in pre-compiled DED-accessible form. Pre-build:
SBA/HHS joint database of MRI-equipped hospital facilities as a standing DED emergency
resource list (similar to the essential business enrollment database).

**Critical Gap 3 — No domestic helium source fast-track permitting:**
The domestic source development Type B program is constrained by permitting timelines
(natural gas field permitting under BLM/EPA): 6–18 months. Without pre-cleared emergency
permitting authority for helium extraction from fields already producing natural gas (adding
a helium extraction train is far simpler than a new field), this program cannot deliver
within the crisis window. Pre-build: amend DED enabling authority to include emergency
permitting acceleration for critical industrial gas extraction from existing licensed fields.

**Critical Gap 4 — No framework for "non-commodity" critical inputs:**
The DED's scenario library is built around commodity supply chains (oil, semiconductors,
food, minerals). Helium is an industrial gas — technically a commodity but not tracked in
standard commodity markets, not covered by existing stockpile legislation, and not
referenced in any DED Phase document. The DED needs a broader "critical industrial inputs"
monitoring category that captures specialty gases (helium, neon, krypton, xenon — all
critical to semiconductor manufacturing) alongside traditional commodities.

---

## 7. Lessons for Pre-Positioning

1. **Add specialty industrial gases to NEID monitoring:** Helium, neon (used in semiconductor
   laser lithography; 90% from Ukraine), krypton, xenon. These are individually small markets
   ($2–8B each) but single-source dependencies for critical manufacturing processes.

2. **Pre-approve helium recovery system tax credits:** A standing 30% investment tax credit
   for helium and specialty gas recovery system installation would cause continuous peacetime
   adoption, gradually reducing U.S. helium demand vulnerability without crisis intervention.
   Cost: ~$50–80M/year in foregone revenue. Benefit: reduces crisis demand shock by 20–30%.

3. **Federal Helium Reserve partial restoration:** Congress should re-authorize a 5 Bcf
   reserve (vs. 30 Bcf peak; modest but meaningful). At $12/MCF storage cost and $10/MCF
   purchase, a 5 Bcf reserve costs ~$110M to build and $15M/year to maintain. This is the
   buffer that could absorb the 30-day price spike while market signals bring new supply online.

4. **HTS MRI mandate for new federal healthcare facilities:** VA hospitals and federal clinics
   should be required to procure HTS (helium-free) MRI equipment as it becomes commercially
   available. Federal procurement as the demand signal that drives the industry to commercial
   scale — the same DARPA/DoD semiconductor anchor buyer logic applied to medical devices.

---

## Cross-References

- `ded/scenarios/semiconductor-collapse/phase-1-triage-and-allocation.md` — priority allocation framework; directly activates
- `ded/assets/profiles/darpa.md` — HTS MRI is a DARPA Accelerator-class R&D program
- `ded/tools/strategic-contracts.md` — Type A/B/C mechanics; hospital reserve contract structure
- `ded/tools/business-survival-loans.md` — BSL for helium-dependent businesses facing shutdown
- `ded/economics/supply-chain-concentration-risk.md` — specialty gas concentration as archetype
