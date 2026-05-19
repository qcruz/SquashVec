# Cashless Economy Migration Plan

**Document Type:** DED Major Legislative and Program Proposal
**Last Updated:** 2026-05
**Status:** Concept — requires Federal Reserve, Treasury, and Congressional coordination
**Dependency:** `ded/proposal/ebank-distributed-ledger.md` — the Distributed Partitioned
  Ledger Network is a prerequisite; cashless migration does not proceed until the
  eBank infrastructure achieves defined coverage and resilience milestones
**Timeline:** 20 years from legislative authorization to legal tender sunset

---

## The Case for Elimination

The United States currently has approximately $2.3 trillion in paper currency and coin
outstanding. Of that, an estimated $1.5 trillion — roughly two-thirds — is held outside
the United States, used as a store of value and informal payment currency in countries
with weaker monetary systems. The remaining $800 billion circulates domestically.

Cash performs two domestic functions: payment and privacy. It is anonymous, requires no
infrastructure, and works when digital systems do not. These are genuine virtues.
Cash also performs three functions that impose large costs on the public:

**Enabling the tax gap.** The IRS estimates the annual federal tax gap at approximately
$600 billion — taxes legally owed but not collected. The majority of this gap is in
underreported self-employment income and unreported cash business receipts. Cash
is the primary mechanism by which otherwise-taxable economic activity is conducted
without a record. Closing even 40% of the cash-enabled portion of the tax gap would
generate $80–120 billion per year in additional federal revenue — without raising any
tax rate.

**Enabling criminal finance.** Drug trafficking, human trafficking, money laundering,
and organized crime operate almost entirely in cash. Financial crime that leaves a
digital trail is not financial crime — it is quickly identified and prosecuted. The
cash economy is not just a convenience for criminals; it is their operating
infrastructure. Eliminating it does not eliminate crime, but it dramatically raises
the cost and traceability of criminal finance.

**Imposing collection and security costs.** The Federal Reserve spends approximately
$1 billion per year printing currency and minting coin. Banks spend tens of billions
annually on cash handling, armored transport, vault security, and counterfeit
detection. Retailers spend additional billions on cash management, till counting,
and deposit logistics. These costs are deadweight — they produce no economic value;
they are the friction cost of maintaining a payment technology that is two centuries
old.

Against these costs, the case for maintaining cash permanently is largely the
argument that eliminating it creates risks that current infrastructure cannot manage.
The Distributed Partitioned Ledger Network proposal addresses those risks directly.
With that infrastructure in place, the argument for permanent cash maintenance
becomes substantially weaker.

This document is the migration plan: how to move from the current mixed system to
a fully cashless economy, in what sequence, with what protections for which populations,
and on what timeline.

---

## Governing Principles

**1. Infrastructure before mandate.** The cashless transition does not advance faster
than the eBank node network provides universal access. No population is pushed off
cash before they have a viable, accessible, and reliable digital alternative. This
is not a soft preference — it is a hard sequencing requirement. Violating it produces
the India 2016 demonetization outcome: economic chaos concentrated among the poorest
and least-connected populations.

**2. Incentives before requirements.** DED's operating principle applies: economic
mechanisms are preferred over mandates. The goal is to make digital payment so
obviously preferable — lower cost, more convenient, more secure — that cash use
declines naturally before any legal mandate is required. Mandates are the backstop
for the final transition, not the primary driver.

**3. Privacy is non-negotiable.** A cashless economy without strong privacy protections
is a surveillance infrastructure. Privacy architecture (per the eBank development
paths) must be legislated before the legal tender sunset, not promised afterward.
If the privacy framework is not in place, the legal tender sunset does not proceed.
This is a hard precondition, not a soft preference.

**4. The foreign dollar problem is managed, not ignored.** Approximately $1.5 trillion
in U.S. currency is held abroad. The redemption window for foreign holders must be
long enough and accessible enough to avoid defaulting on the international store-of-
value function of the dollar — which would cause direct damage to the dollar's reserve
currency role.

**5. The seigniorage gap is replaced explicitly.** Treasury currently earns approximately
$30–50 billion per year from currency seigniorage (the difference between the face
value of currency and its production cost). This revenue disappears in a cashless
economy. A replacement revenue mechanism must be legislated before currency is retired.

---

## Fiscal Mechanics

### Seigniorage Replacement

Seigniorage in a cashless economy is replaced by two mechanisms:

**Digital ledger maintenance fee:** A small per-account annual fee assessed on all
distributed ledger accounts — proposed at $12/year ($1/month). At 200 million adult
accounts, this generates $2.4 billion/year. Low-income accounts (NIT recipients,
CRHP enrollees) are exempt; the fee is assessed only on accounts above a defined
balance threshold. This is substantially less than current seigniorage revenue, but
captures some of the infrastructure maintenance cost.

**Transaction settlement levy:** A fractional basis-point levy on all settled
transactions above a defined size threshold (proposed: 0.5 basis points on transactions
above $500; 1 basis point on transactions above $5,000). At current U.S. electronic
transaction volumes, this generates an estimated $15–25 billion/year. Exempt:
transactions between NIT/CRHP recipient accounts and essential services (grocery,
utility, medical, housing).

Together, these two mechanisms replace approximately $17–28 billion of the current
$30–50 billion in seigniorage revenue. The remainder is offset by the tax gap recovery
from cashless transition — if even 30% of the cash-enabled tax gap is recovered,
the net fiscal position of the transition is strongly positive.

**Net fiscal estimate:**
- Lost seigniorage: −$30–50B/year
- Digital ledger fee + settlement levy: +$17–28B/year
- Tax gap recovery (30% of cash-enabled gap): +$80–120B/year
- Reduced cash handling costs (Treasury/banking sector): +$15–25B/year
- **Net annual fiscal improvement: +$82–123B/year at steady state**

The cashless transition is not a fiscal cost. It is a significant fiscal improvement,
primarily through tax gap recovery.

### Merchant Fee Problem

Electronic payment processing fees — charged by card networks and payment processors
to merchants — average 1.5–3% per transaction. For small-margin businesses (grocery,
gas, restaurant), these fees can exceed net profit margins. This is the single largest
business-side objection to cashless, and it is legitimate: the current card fee
structure transfers wealth from merchants and consumers to payment networks.

The migration plan addresses this through two mechanisms:

**Distributed ledger processing fee cap:** Transactions processed through the eBank
distributed ledger network are subject to a regulated maximum processing fee — proposed
at 0.25% for retail transactions, 0% for government benefit payments and NIT
distributions. This is not a price control on private card networks; it is a rate
for the government-operated settlement infrastructure. Private card networks can
charge whatever they like, but merchants who route through the distributed ledger
pay the regulated rate. Competition from the distributed ledger creates downward
pressure on private network fees without prohibition.

**Small merchant digital transition credit:** Small businesses (under $5M in annual
revenue) that transition to cashless or near-cashless operation receive a refundable
tax credit of 40% of their digital payment processing fees for a 5-year period.
This credit phases out as the regulated distributed ledger rate reduces total merchant
processing costs. The credit is funded from the transaction settlement levy.

---

## Population-Specific Transition Plans

The transition timeline varies by population segment. Each segment has specific
barriers and specific mechanisms to address them. No segment is compelled to go
cashless before its barriers are resolved.

### Segment 1: Fully Banked, Digitally Fluent (estimated 60% of population)

This population is already effectively cashless for most transactions. The transition
for this segment is primarily legal — updating payment preferences, replacing remaining
cash use cases (tips, small informal transactions, vending) with digital equivalents.

**Mechanisms:** Consumer cashless adoption credit ($50 credit for demonstrating
12 months of cashless operation); digital tip and small payment infrastructure
mandated for businesses in Phase 2; P2P payment standardization (universal
interoperability between payment apps through the distributed ledger network).

**Timeline:** Phase 1 voluntary; Phase 3 legal mandate is essentially a formality
for this segment.

### Segment 2: Banked but Partial Cash Users (estimated 25% of population)

This population has bank accounts but uses cash for specific use cases: informal
economy work, privacy-sensitive purchases, small merchants that prefer cash, distrust
of digital tracking. Some in this segment use cash deliberately; others use it by
habit or because their transaction patterns haven't been served well by current
digital infrastructure.

**Mechanisms:** Phase 1 incentives address the cost and convenience barriers. Privacy
architecture (differential privacy + tiered access) addresses the tracking concern —
explicit, legislated privacy protections backed by criminal penalties for unauthorized
data access. The distributed ledger's 0.25% processing rate eliminates the "cash
is cheaper for the merchant" dynamic that currently makes cash socially preferred
in some transactions.

**Timeline:** Phase 2 voluntary transition expected to capture most of this segment.
Phase 3 legal mandate captures the remainder.

### Segment 3: Underbanked (estimated 13% of population)

Underbanked households have a bank account but also use cash, check-cashing services,
money orders, and prepaid cards for transactions their bank accounts don't serve well.
The barriers are typically: distance from a bank branch, account fees that make low-
balance accounts uneconomical, distrust of traditional banks from past negative
experiences, and lack of digital literacy or device access.

**Mechanisms:**
- eBank USPS node network eliminates the distance barrier (31,000 USPS locations
  versus ~70,000 bank branches, with far better rural distribution)
- No-fee basic distributed ledger accounts (the regulated account carries no minimum
  balance requirement and no monthly fee below the NIT threshold)
- NIT and CRHP distribution through direct distributed ledger credit eliminates the
  check-cashing intermediary entirely — recipients don't need a traditional bank account
  to receive government benefits
- Digital literacy support through CRHP training programs and eBank node in-person
  assistance

**Timeline:** Underbanked population conversion is primarily a Phase 1–2 task.
Legal mandate does not apply until this segment has had full access to eBank node
infrastructure for a minimum of 3 years.

### Segment 4: Unbanked (estimated 4.5% of population, ~14.5 million adults)

The unbanked population has no bank account of any kind. The barriers are overlapping:
no government ID (undocumented immigrants; some homeless individuals); no fixed
address (homeless population); account history problems (ChexSystems records that
disqualify from traditional banking); distrust; geographic access; digital access.

This segment is the hardest case and the most important to get right. Forcing cash
elimination before universal account access is achieved for this population is
regressive by construction.

**Mechanisms:**

Identity barrier: The distributed ledger account requires identity verification, but
the verification standard for a basic account is lower than current bank KYC
requirements. A government-issued ID — including a state ID, passport, or the
new eBank-issued account card (which itself requires only biometric verification
at a CRHP mobile unit or USPS node) — is sufficient. For populations without any
government ID, the eBank node CRHP staff can conduct biometric enrollment under
a provisional account that becomes permanent upon identity establishment.

Address barrier: Distributed ledger accounts do not require a fixed address.
Account holders designate a primary node (their local eBank facility) as their
account home. USPS general delivery addresses are accepted as account registration
addresses. Homeless service providers can serve as account sponsors for clients
in their programs.

ChexSystems barrier: The basic distributed ledger account is not subject to
ChexSystems screening. It is a payments account, not a credit account; past
banking problems do not affect eligibility. Overdraft is not possible on the
basic account (transactions are declined if the balance is insufficient, rather
than creating overdraft debt).

Undocumented immigrants: A consular ID (Matrícula Consular) or foreign passport
is accepted for basic account enrollment. This population's economic activity —
wages, rent, purchases — currently occurs largely in cash. Bringing it into the
distributed ledger system is fiscally positive (partial tax gap recovery) and
benefits the account holders (theft protection, payment security, access to NIT
for eligible individuals). The immigration status of the account holder is not
reported to immigration enforcement as a result of account activity — a statutory
firewall, not a policy preference, enforceable by criminal penalty.

**Timeline:** The unbanked conversion is the binding constraint on the entire
migration timeline. The legal tender sunset date is set only after unbanked account
penetration reaches 95% of this segment — verified by FDIC survey — and after
eBank node infrastructure has been operational in unbanked-concentrated areas
for a minimum of 5 years.

### Segment 5: Elderly Population (estimated 15% of adult population over 70)

Older Americans use cash at higher rates than any other demographic — approximately
34% of transactions for adults over 65, versus 12% for adults under 45 (Federal
Reserve Diary of Consumer Payment Choice, 2024). The barriers are familiarity,
digital literacy, device access, and distrust of digital systems.

**Mechanisms:**
- No-digital alternative maintained throughout Phase 1 and Phase 2: every eBank
  node facility offers full in-person account services, card-based (not app-based)
  payment, and staff assistance
- Account cards are the primary interface — no smartphone required; the distributed
  ledger account works via a standard chip card at any payment terminal
- Extended in-person service hours at USPS and eBank nodes, with CRHP-staffed
  assistance for account management, bill payment, and transaction support
- Social Security, Medicare, and veteran's benefit transition fully managed by eBank
  node staff with no self-service requirement

**Timeline:** Elderly population conversion is Phase 2 work. Phase 3 legal mandate
includes an extended 5-year supplemental transition period during which elderly
individuals (verified by age) can continue to use physical currency at any eBank
node, receiving distributed ledger credit in exchange, without the formal legal
tender sunset applying to them until their personal transition is complete.

---

## Legal Framework

### Current Legal Tender Law

Under 31 U.S.C. § 5103, U.S. coins and currency are legal tender for all debts,
public charges, taxes, and dues. This law does not require private parties to accept
cash — courts have consistently held that businesses can refuse cash — but it does
require acceptance of cash for government obligations and establishes the baseline
status of currency.

Eliminating cash requires amending § 5103 and the Federal Reserve Act provisions
governing currency issuance. This is a Congressional action; no executive authority
is sufficient for the legal tender transition.

### Legislative Package

**The Currency Modernization Act (proposed)** contains four components:

**Title I — Distributed Ledger Infrastructure Authorization:** Authorizes the Federal
Reserve and DED to build, operate, and regulate the eBank distributed partitioned
ledger network. Establishes the eBank node operator designation, technical standards,
and regulatory framework. This title can be enacted immediately — it does not sunset
cash and does not require any population to change behavior.

**Title II — Universal Account Access Guarantee:** Guarantees every U.S. resident
the right to a no-fee basic distributed ledger account, regardless of immigration
status, credit history, or fixed address. Establishes the lower KYC standard for
basic accounts. Creates the statutory firewall preventing immigration enforcement
use of account data. This title can be enacted simultaneously with Title I.

**Title III — Privacy Framework:** Establishes the statutory privacy architecture —
differential privacy for NEID reporting, tiered access with court authorization
for law enforcement, criminal penalties for unauthorized data access, and the
independent privacy oversight authority. **This title must be enacted and in force
for a minimum of 3 years before Title IV takes effect.** Privacy protections must
be proven in practice, not merely legislated on paper, before currency is retired.

**Title IV — Legal Tender Transition:** Specifies the legal tender sunset date
(defined as a fixed number of years after all preconditions are met, not a calendar
date). Establishes the currency redemption window (5 years for domestic holders;
7 years for foreign holders with accessible redemption channels). Defines the
post-sunset status of physical currency (legal for private acceptance if both
parties agree; not valid for tax payments or government obligations; collectible value
determined by market).

Titles I and II: enactable in the current Congress.
Title III: enactable after eBank pilot network demonstrates functionality.
Title IV: enactable only after Title III has been in force 3 years and all
population-specific access milestones are verified.

---

## The Foreign Dollar Problem

Approximately $1.5 trillion in U.S. currency circulates outside the United States.
This currency functions as a store of value, an informal payment medium, and a
de facto reserve currency in countries with unstable domestic currencies — Ecuador,
El Salvador, Cambodia, Zimbabwe, and many others use dollars informally or formally.

The legal tender sunset creates an obligation to these holders. Defaulting on that
obligation — announcing that dollar bills are worthless after a fixed date without
providing accessible redemption — would damage the dollar's international credibility
and the trust that underlies its reserve currency role. It would also impose large
losses on the world's poorest populations, who hold physical dollars precisely because
they distrust their own banking systems.

**Foreign redemption framework:**

The 7-year foreign redemption window allows foreign holders to exchange physical
currency for distributed ledger account credits through three channels:

- **U.S. embassy and consulate network:** All U.S. diplomatic facilities accept
  physical currency for distributed ledger credit during the redemption window.
  Foreign nationals receive a limited-use distributed ledger account that can
  hold dollar-denominated balances and transact internationally through the bilateral
  CBDC bridge infrastructure.

- **Foreign central bank redemption:** Central banks and licensed financial institutions
  in foreign countries can present physical currency in bulk to the Federal Reserve
  for distributed ledger credit to their institutional accounts. This is the primary
  channel for the large informal dollar economies — Ecuador, Cambodia, and others —
  where dollars are widely held but individual access to U.S. diplomatic facilities
  is limited.

- **International post network:** USPS coordinates with the Universal Postal Union
  to allow physical currency to be mailed to designated redemption centers in
  exchange for distributed ledger credit. Accessible to individuals in countries
  with postal systems but limited U.S. diplomatic presence.

**Post-redemption window:** Physical currency that is not presented for redemption
within the window retains its face value as a collectible but is no longer redeemable
by the Treasury. The unredeemed balance — estimated to be a small fraction of total
outstanding, as the 7-year window provides ample opportunity — becomes a permanent
Treasury gain, analogous to unredeemed gift cards.

---

## The Full Migration Timeline

### Phase 0 (Years 1–2): Legislative Foundation

- Currency Modernization Act Titles I and II enacted
- Federal Reserve and DED establish technical standards for eBank node compliance
- Pilot program: 10 cities across Federal Reserve districts; parallel operation with
  cash (no mandate, no incentives withdrawn yet)
- Privacy framework legislation drafted; public comment period; civil society review
- International: bilateral discussions with major dollar-holding economies on foreign
  redemption framework

### Phase 1 (Years 2–7): Infrastructure Buildout and Voluntary Adoption

**Infrastructure:**
- Full national eBank node network built to coverage standards (all counties with
  at least one compliant node; USPS postal nodes in rural areas without commercial
  bank branch; CRHP mobile units operational)
- Partition mode resilience tested in controlled scenarios across at least 3 Federal
  Reserve districts
- Physical rare metals reserves positioned at node facilities under local government
  authority

**Voluntary adoption incentives:**
- Consumer cashless adoption credit: $50 credit to any adult who demonstrates
  12 consecutive months of distributed ledger account activity above a minimum threshold
- Small merchant digital transition credit: 40% refundable credit on processing fees
  for cashless or near-cashless small businesses
- Distributed ledger maximum processing fee (0.25%) published and operational —
  creates merchant cost advantage for ledger-routed transactions over cash
- NIT, CRHP, Social Security, and all federal benefit distributions converted to
  direct distributed ledger credit; paper checks and direct deposit to legacy accounts
  still available during transition

**Access milestones required before Phase 2:**
- Distributed ledger account penetration: ≥85% of adult population
- Unbanked segment account penetration: ≥80%
- Rural eBank node coverage: ≥95% of counties
- Elderly in-person service access: ≥99% of adults over 70 within 15 miles of an
  accessible node facility

### Phase 2 (Years 7–14): Managed Decline

**Currency Modernization Act Title III enacted (privacy framework).**
The 3-year observation period begins. During this period, privacy protections are
tested in practice: independent privacy authority publishes annual compliance reports;
any systemic violation triggers a Phase 2 extension.

**Cash acceptance:** Private businesses are no longer required to accept cash (this
is already true under current law; Phase 2 clarifies and regularizes it). Government
facilities and federally regulated businesses continue to accept cash. Cash remains
legal tender for all obligations.

**Declining incentives for cash:**
- Federal Reserve gradually reduces new currency printing as existing currency wears
  out; replacement rate reduced from 100% to 60% of worn currency by Phase 2 end
- ATM network permitted to decline without replacement requirement in areas with
  full eBank node coverage
- Cash handling costs explicitly reported by banks as a regulatory disclosure,
  creating market pressure to reduce cash operations

**Access milestones required before Phase 3:**
- Distributed ledger account penetration: ≥97% of adult population
- Unbanked segment account penetration: ≥95%
- Elderly population digital access: ≥90% (with in-person alternative permanently
  available for the remainder)
- Privacy framework 3-year observation period complete with no systemic violations
- eBank node network resilience: demonstrated partition-mode operation in at least
  2 real (non-simulated) network events with no material economic disruption
- International: foreign redemption framework operational in at least 30 countries
  accounting for ≥80% of estimated foreign dollar holdings

### Phase 3 (Years 14–20): Legal Tender Transition

**Currency Modernization Act Title IV enacted.** Legal tender sunset date announced —
proposed 5 years from Title IV enactment, allowing adequate public notice and
final redemption window.

**Domestic redemption window (5 years):**
- Any domestic holder of physical currency can exchange it for distributed ledger
  credit at any eBank node facility or USPS node, face value, no fees, no questions
- Currency exchange is available until the final sunset date; no early cutoff
- High-volume media campaign explaining the redemption process; multi-language,
  multi-channel

**Foreign redemption window (7 years from Title IV):**
- Embassy, foreign central bank, and international postal channels operational
  from Title IV enactment
- Federal Reserve publishes monthly outstanding currency statistics so markets
  can track redemption progress

**Post-sunset:**
- Physical currency is no longer valid for tax payments, government obligations,
  or any legally mandated payment
- Private acceptance of physical currency remains legal if both parties agree
  (antique value, collector market, informal agreement)
- Unredeemed currency becomes a permanent Treasury asset (gain recognized over
  the redemption window as currency is not presented)
- Elderly supplemental period: individuals over 70 may present physical currency
  for distributed ledger credit at any eBank node for an additional 5 years
  beyond the general sunset date

---

## Scenario Interaction: How the Cashless Economy Changes DED's Portfolio

### Grid Cyberattack Scenario

**Without the eBank network:** Cashless economy + grid cyberattack = complete economic
paralysis. No transactions possible. Critical failure.

**With the eBank network:** Local nodes operate in partition mode. Throttles prevent
mass capital flight. Physical reserves activate if partition extends beyond 7 days.
The scenario moves from catastrophic to manageable.

The cashless migration and the eBank network are not separable proposals — the
migration only proceeds because the eBank network eliminates the primary risk.

### Financial Fragmentation Scenario

A fully cashless economy with distributed ledger infrastructure is significantly more
resistant to financial fragmentation than the current system. Local nodes can operate
independently of the national financial system for extended periods. A financial crisis
that disrupts national credit markets does not immediately stop local commerce — the
local ledger continues to process local transactions on the local ledger balance.

The absence of cash also eliminates bank runs, which are the primary transmission
mechanism from financial crisis to economic panic. A depositor who cannot withdraw
cash cannot run on the bank. The account balance is recorded on the cryptographic
ledger; it does not disappear in a liquidity crisis.

### AI Unemployment Scenario

A cashless economy with direct distributed ledger credit for NIT and CRHP payments
dramatically simplifies the Phase 1 triage response to AI-driven displacement.
NIT payments reach every eligible account within minutes of the reconciliation cycle.
No check clearing, no bank processing delays, no unbanked recipients waiting for
prepaid cards. The economic stimulus from rapid, reliable NIT distribution reaches
households faster and with less friction — which matters when the goal is to prevent
acute financial distress during a displacement event.

---

## Political Economy

### Coalition

**Strong allies:**
- Law enforcement and Treasury: the tax gap recovery and criminal finance disruption
  arguments are compelling to both
- Banking sector (with caveats): banks reduce cash handling costs; eBank node
  infrastructure regulation gives them a stable revenue base as infrastructure operators
- Tech and fintech industry: cashless economy expands the addressable market for
  digital financial services
- Deficit hawks: net fiscal improvement of $80–120B/year is the strongest single
  fiscal argument in the portfolio

**Opposition:**
- Privacy advocates: addressed by making Title III a hard precondition for Title IV;
  privacy advocates become conditional supporters once the statutory protections are enacted
- Small merchants: addressed by the distributed ledger processing fee cap and the
  merchant transition credit
- Rural constituencies: addressed by USPS node coverage as a precondition milestone
- Elderly advocacy: addressed by the supplemental transition period and permanent
  in-person access guarantee
- Libertarian/anti-surveillance: the hardest political opposition; requires consistent
  and enforceable privacy protections plus a compelling counter-argument (cash is not
  anonymous to criminals who use it at scale; the distributed ledger with privacy
  protections is more anonymous than a credit card, which is already how most people pay)

### Messaging

The migration is not framed as "eliminating cash." It is framed as:
- "Closing the tax gap so honest taxpayers aren't subsidizing those who don't pay"
- "Making your money safe — it can't be stolen, lost, or counterfeited"
- "Every American gets a free account at their local bank, with their money protected
  by the same cryptography that secures the Pentagon"
- "We're not taking anything away — we're giving you 5 years to exchange your cash
  for money that's safer, faster, and works everywhere"

---

## Cross-References

- `ded/proposal/ebank-distributed-ledger.md` — prerequisite infrastructure; all
  technical architecture for partition mode, reconciliation, and physical reserves
- `ded/proposal/universal-basic-income.md` — NIT direct distributed ledger credit;
  the cashless system makes NIT distribution faster and cheaper
- `ded/proposal/civilian-reserve-health/` — CRHP mobile node units; CRHP network
  operations technician training pipeline
- `ded/scenarios/grid-cyberattack/` — primary scenario the eBank network addresses;
  cashless migration is contingent on this scenario being resolved
- `ded/scenarios/financial-fragmentation/` — cashless + distributed ledger reduces
  fragmentation scenario severity
- `ded/scenarios/ai-unemployment/` — cashless NIT distribution improves Phase 1 triage
- `ded/economics/fiscal-integration.md` — seigniorage replacement revenue and tax gap
  recovery should be incorporated into Year 10/30 fiscal projections
- `ded/proposal/political-economy-playbook.md` — coalition analysis and legislative
  vehicle should be added to the playbook in a future update
