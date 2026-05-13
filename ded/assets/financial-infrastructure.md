# DED Asset Registry: Financial Infrastructure

**Last Updated:** 2026-05
**Category:** Financial Infrastructure — clearing and settlement systems, reserve institutions, exchange infrastructure, payment networks

Financial infrastructure is the circulatory system of the economy. Unlike physical supply chains, financial system failure does not produce visible shortages immediately — but within 24-72 hours of a clearing system failure, payroll stops, businesses cannot pay suppliers, and supply chains halt even if physical goods are available. The 2008 financial crisis demonstrated this; a more severe event would produce full economic paralysis.

Financial infrastructure has a unique DED characteristic: **it can fail completely and invisibly from a cyberattack or cascading institutional failure, with no physical damage whatsoever.**

---

## Payment and Settlement Systems

### Fedwire Funds Service (Federal Reserve)
**Location:** East Rutherford, NJ (primary); Dallas, TX (backup) | **Operator:** Federal Reserve Banks

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Financial fragmentation (primary), grid cyberattack (target), pandemic (operational continuity) |
| Criticality | 3 | Processes ~$4 trillion/day in large-value interbank transfers; if Fedwire goes down, U.S. wholesale financial system stops within hours |
| Adaptability | 1 | Single-purpose; extremely specialized |
| Optimization Gap | 2 | Backup systems exist but have never been fully tested under complete primary failure; OT/IT security hardening is ongoing but full isolation from internet is not possible |
| **DED Score** | **9** | **Tier S** |

---

### CHIPS System (Clearing House Interbank Payments System)
**Location:** New York, NY | **Operator:** The Clearing House

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 2 | Financial fragmentation, grid cyberattack |
| Criticality | 3 | Processes ~$1.8 trillion/day in large-value USD transactions; complements Fedwire; together they handle virtually all wholesale USD payments |
| Adaptability | 1 | Single-purpose |
| Optimization Gap | 1 | Well-secured; backup systems operational |
| **DED Score** | **7** | **Tier A** |

---

### SWIFT (U.S. Node / Correspondent Banking)
**Location:** Distributed globally; U.S. access via major correspondent banks | **Type:** Interbank messaging

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 2 | Financial fragmentation (dollar weaponization context), shipping blockade (trade finance) |
| Criticality | 3 | Russia SWIFT exclusion (2022) demonstrated both the power and the fragility; U.S. dominance of SWIFT is a leverage tool — but also a dependency |
| Adaptability | 2 | Alternative messaging systems exist (CIPS — China; SPFS — Russia); U.S. needs both to maintain SWIFT leverage and to understand the alternative architecture |
| Optimization Gap | 2 | DED needs a SWIFT alternative scenario: what happens if a significant portion of global trade migrates to CIPS? U.S. has not adequately war-gamed this |
| **DED Score** | **8** | **Tier A** |

---

### ACH Network (Automated Clearing House)
**Location:** Distributed | **Operator:** NACHA / Federal Reserve (FedACH)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 2 | Pandemic (payroll continuity), financial fragmentation |
| Criticality | 3 | Processes payroll for most U.S. workers; Social Security, government benefits; vendor payments for most businesses |
| Adaptability | 1 | Single-purpose |
| Optimization Gap | 1 | Well-redundant; FedACH has multiple backup processing centers |
| **DED Score** | **7** | **Tier A** |

---

## Reserve and Monetary Institutions

### Federal Reserve System
**Location:** Washington, DC (Board) + 12 Reserve Banks | **Type:** Central bank

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | All scenarios — the Fed's response capacity affects every other scenario's economic impact |
| Criticality | 3 | Lender of last resort; controls money supply; manages systemic risk; without the Fed's crisis tools (2008, 2020), financial cascades would be catastrophic |
| Adaptability | 3 | Fed has demonstrated ability to create new facilities quickly (PDCF, MMLF, PMCCF, MLF in 2020) |
| Optimization Gap | 2 | Fed's toolset is well-developed for financial crisis; less well-equipped for supply-side shocks (pandemic, oil restriction) where the problem is physical, not financial; coordination with DED physical supply chain response would be novel |
| **DED Score** | **10** | **Tier S** |

**DED Integration Opportunity:** Pre-designed Fed facilities for specific DED scenarios (e.g., a "Critical Supply Chain Stabilization Facility" that provides emergency liquidity to essential food processors, energy producers, or medical manufacturers experiencing demand shock)

---

### U.S. Treasury Department / Exchange Stabilization Fund (ESF)
**Location:** Washington, DC

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Financial fragmentation (dollar defense), all scenarios (emergency fiscal response) |
| Criticality | 3 | ESF is the most flexible federal financial tool: can be deployed without Congressional authorization; Treasury manages national debt and has unique market access |
| Adaptability | 3 | ESF can intervene in currency, credit, and commodity markets; Congress periodically re-authorizes expanded Treasury tools |
| Optimization Gap | 2 | ESF is ~$200B; may be insufficient for a large-scale financial fragmentation scenario; pre-design of Congressional backstop mechanisms would close the gap |
| **DED Score** | **10** | **Tier S** |

---

### FDIC (Federal Deposit Insurance Corporation)
**Location:** Washington, DC

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 2 | Financial fragmentation, pandemic (bank stress) |
| Criticality | 3 | Deposit insurance is the single most important financial stability mechanism; bank runs require FDIC to prevent panic-driven collapse |
| Adaptability | 1 | Single core function; some flexibility in resolution powers |
| Optimization Gap | 1 | Deposit Insurance Fund is adequately capitalized; systemic risk resolution authority (Dodd-Frank) provides extended toolkit |
| **DED Score** | **7** | **Tier A** |

---

## Exchange and Market Infrastructure

### CME Group (Chicago Mercantile Exchange)
**Location:** Chicago, IL + New York, NY | **Type:** Derivatives exchange

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Financial fragmentation, oil restriction (oil futures), drought (agricultural futures — corn, wheat, soybeans), pandemic (volatility management) |
| Criticality | 3 | CME is the primary price discovery mechanism for oil, natural gas, agricultural commodities, interest rates, and currencies; if CME stops, producers and consumers lose the ability to hedge risk |
| Adaptability | 2 | Exchange can list new contracts quickly; has adapted to 24/7 global markets |
| Optimization Gap | 2 | DED needs emergency circuit breaker protocols pre-designed with CME for commodity markets during supply crises; ad-hoc position limits in 2022 energy crisis were improvised |
| **DED Score** | **10** | **Tier S** |

**DED Value:** In an oil restriction scenario, CME oil futures price discovery is critical for government allocation decisions. In a drought, CME grain futures signal food security risk weeks before physical supply problems appear. DED should have real-time access to futures market data as a leading indicator.

---

### NYSE / NASDAQ (Equity Markets)
**Location:** New York, NY | **Type:** Equity exchange

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 2 | Financial fragmentation, pandemic (economic confidence) |
| Criticality | 2 | Equity markets are important for capital formation and confidence; can be closed (as on 9/11) without immediate supply chain impact |
| Adaptability | 1 | Core function is equity trading; limited DED adaptability |
| Optimization Gap | 1 | Market halt protocols (circuit breakers) already well-designed; Reg SHO, market-maker obligations provide stability |
| **DED Score** | **6** | **Tier B** |

---

### DTCC (Depository Trust & Clearing Corporation)
**Location:** New York, NY + Tampa, FL (backup) | **Type:** Securities clearing and settlement

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 2 | Financial fragmentation, grid cyberattack |
| Criticality | 3 | Clears and settles >$2 quadrillion/year in securities transactions; failure would freeze capital markets entirely |
| Adaptability | 1 | Single-purpose |
| Optimization Gap | 1 | Robust backup systems; designation as systemically important financial market utility (SIFMU) ensures regulatory oversight |
| **DED Score** | **7** | **Tier A** |

---

## Dollar Reserve Status

### U.S. Dollar Reserve Currency Status
**Type:** Systemic financial asset | **Mechanism:** Global acceptance of USD for trade, reserves, and debt

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Scenario Breadth | 3 | Financial fragmentation (primary), oil restriction (petrodollar), shipping blockade (trade finance), rare earth denial (commodity pricing) |
| Criticality | 3 | Reserve status enables U.S. to run persistent deficits, impose sanctions, and fund emergencies at low cost; its erosion would be the most consequential financial event in decades |
| Adaptability | 2 | Treasury and Fed can take active steps to defend reserve status; U.S. can also use it offensively (sanctions, SWIFT exclusion) |
| Optimization Gap | 2 | BRICS alternative currency discussions, CIPS expansion, and commodity trading in non-dollar currencies are gradual threats; U.S. has no proactive reserve status defense strategy — it is mostly reactive |
| **DED Score** | **10** | **Tier S** |

**DED Strategic Note:** This is the only "asset" in the registry that is not a physical place or institution — it is a collective belief enforced by economic relationships. Preserving it requires active policy (LNG exports in non-dollar currencies should trigger review; commodity pricing agreements should be USD-denominated; allied reserve currency cooperation should be formalized).

---

## Summary: Financial Infrastructure by DED Score

| Asset | Score | Tier |
|-------|-------|------|
| Federal Reserve System | 10 | S |
| U.S. Treasury / ESF | 10 | S |
| CME Group (Commodity Exchange) | 10 | S |
| USD Reserve Currency Status | 10 | S |
| Fedwire Funds Service | 9 | S |
| SWIFT (U.S. Node) | 8 | A |
| CHIPS System | 7 | A |
| ACH Network | 7 | A |
| FDIC | 7 | A |
| DTCC | 7 | A |
| NYSE / NASDAQ | 6 | B |
