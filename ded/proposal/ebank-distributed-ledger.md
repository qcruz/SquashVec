# Electronic Banking Infrastructure Proposal: Distributed Partitioned Ledger Network

**Document Type:** DED Concept Proposal — Infrastructure
**Last Updated:** 2026-05
**Status:** Concept — initial design; requires cryptographic review, banking regulatory analysis,
  and Federal Reserve coordination
**DED Integration:** Grid Cyberattack scenario (primary risk addressed); cashless economy
  migration enabler; NEID data layer; NIT/CRHP distribution infrastructure

---

## The Problem This Solves

The elimination of paper currency — the transition to a fully cashless economy — is
economically attractive but creates a single catastrophic vulnerability: the entire
economy's liquidity depends on a functioning digital payment network. A grid cyberattack,
a major infrastructure failure, a cascading software fault, or an extreme weather event
that takes data centers offline does not merely inconvenience commerce. It stops it
entirely. Every transaction — groceries, fuel, payroll, medical payments — becomes
impossible until the network is restored.

This is not a theoretical concern. In 2021, the Colonial Pipeline ransomware attack
took a critical infrastructure system offline within hours of a single intrusion. The
2003 Northeast blackout affected 55 million people across eight states and Canada and
took 4 days to fully restore. A targeted cyberattack on payment infrastructure, or
a correlated attack on the power grid and digital networks simultaneously, would
produce economic paralysis faster and more completely than any previous peacetime crisis.

The current banking system has a resilience layer: physical cash. People experiencing
a payment system failure can use currency. In a cashless economy, that layer does not
exist. The transition to cashless therefore requires building a new resilience layer
before — not after — eliminating the old one.

The proposal in this document is that resilience layer.

---

## Core Architecture: The Distributed Partitioned Ledger Network

### Design Principle

Rather than a single national payment network (fragile, single point of failure), the
payment infrastructure is organized as a hierarchy of independently-operable partitioned
ledger networks, each with unique cryptographic parameters, each capable of processing
transactions in isolation when network connectivity to higher tiers is unavailable.

The hierarchy:

```
National Ledger (Federal Reserve / Treasury)
    │
    ├── Regional Networks (Federal Reserve district level, ~12)
    │       Each independently encrypted
    │       Each capable of operating without national connectivity
    │
    └── Local Bank Nodes (individual bank branches and facilities)
            Each independently encrypted
            Each maintains a full local ledger of local accounts
            Each capable of operating without regional or national connectivity
```

Every tier communicates with its neighbors on scheduled reconciliation cycles.
Every tier can operate independently between reconciliation events.
Every tier uses different cryptographic parameters — defeating the entire system
requires simultaneously compromising multiple independently-designed cryptographic
systems, which is operationally near-impossible.

---

### Tier 1: Local Bank Nodes (the Foundation)

**Physical infrastructure:**

Banks are repurposed as local data centers. This does not require new buildings.
Existing bank branch facilities are converted to house:

- Secure server infrastructure maintaining the local ledger
- Redundant power systems (generator + battery backup; minimum 72-hour autonomous operation)
- Dedicated network hardware for peer-to-peer communication with neighboring nodes
- Card issuance terminals, identity verification systems, and customer service interfaces
- Physical security appropriate to financial data center classification

The bank building, in this model, is fundamentally infrastructure — not primarily a
retail lending office. Its core function is to maintain the integrity and availability
of the local payment ledger.

**The local ledger:**

Each bank node maintains a cryptographically signed ledger of:
- All accounts associated with customers in its jurisdiction
- Current account balances, updated in real time for local transactions
- A complete transaction history for its reconciliation window
- Pending reconciliation items from the prior reconciliation cycle

The local ledger is the authoritative record of economic reality for its jurisdiction
when that node is operating in partition mode. It is not a backup of the national
ledger. It is the primary ledger for local economic activity, continuously synchronized
with higher tiers during normal operation.

**Jurisdiction assignment:**

Every account is assigned a primary node — the local bank serving the account holder's
registered address. The account balance on the national ledger and the local node ledger
are identical under normal operation. When connectivity is unavailable, the local node
ledger is the authoritative source.

---

### Tier 2: Regional Networks

The twelve Federal Reserve districts serve as the natural boundaries for regional
networks. Each regional network:

- Aggregates and reconciles the local node ledgers within its district
- Maintains a regional ledger authoritative for inter-bank transactions within the district
- Communicates with the national ledger on a scheduled cycle (proposed: every 4 hours
  during normal operation)
- Can operate independently of the national ledger during national network failure,
  processing intra-district transactions without limit

Regional networks use encryption parameters distinct from both local nodes and the
national ledger. A cryptographic compromise at the local level does not propagate to
the regional level; the regional network maintains its own key management.

---

### Tier 3: National Ledger

The national ledger, operated by the Federal Reserve and Treasury, maintains the
authoritative record of the total money supply, inter-regional transfers, and
macro-level monetary policy parameters (base money quantity, reserve ratios, emergency
throttle limits). It reconciles with regional networks on a regular schedule and
maintains the definitive record that all lower tiers ultimately synchronize to.

The national ledger does not need to be involved in the vast majority of everyday
transactions. Grocery purchases, local payroll, utility payments — these are local
economic activity that the local node ledger handles. The national ledger handles:
cross-regional transfers, monetary policy parameter updates, and the authoritative
settlement that prevents long-term ledger divergence.

---

## The Reconciliation Protocol

### Normal Operation (All Tiers Connected)

Transactions flow in real time: a payment at a local merchant is logged to the
local node ledger and simultaneously transmitted upward for regional and national
confirmation. Confirmations return in milliseconds. The user experience is identical
to the current payment system.

Scheduled reconciliation occurs at set intervals:
- Local-to-regional: every 30 minutes
- Regional-to-national: every 4 hours
- Full network audit: daily, at a low-traffic window

Reconciliation compares ledger states, identifies discrepancies, resolves them using
a protocol hierarchy (national is authoritative for disputed inter-regional amounts;
regional is authoritative for disputed intra-regional amounts; local is authoritative
for disputed intra-local amounts), and updates all tiers to the reconciled state.

### Partition Mode (Local Node Operating Independently)

When a local node loses connectivity to its regional network — due to a cyberattack,
power failure, natural disaster, or any other cause — it enters partition mode
automatically. In partition mode:

**What continues to work:**
- Any transaction between two accounts both homed at the same local node (the majority
  of everyday commerce: local retail, local services, local payroll)
- Account balance inquiries
- Automated recurring transactions (rent, subscriptions, loan payments) already
  scheduled in the local ledger
- NIT/CRHP/ASF government benefit distributions already queued

**What is throttled:**
- Large transactions above the pre-set partition limit (proposed: $2,500 per transaction,
  $5,000 per 24 hours, per account) require a secondary local confirmation step and are
  logged as pending national reconciliation
- Inter-bank transactions (money from an account homed at a different node) are held
  as pending, not rejected — the sender's node records the debit, the transaction is
  queued for settlement when connectivity resumes

**What is rejected:**
- Transactions to or from accounts outside the local network above the throttle limit,
  where the sender's balance cannot be locally verified
- New account openings (require regional verification)

**The bank run problem, eliminated:**

Under this design, a bank run is structurally impossible. There is no physical currency
to withdraw. An account holder can transfer their balance electronically — but if the
destination is outside the local network (another region, another bank), the transaction
is subject to the partition throttle. A large outflow during partition mode is throttled
to the limit; the capital cannot leave faster than the throttle permits. The local
node's balance sheet is protected by physics and protocol, not by reserve ratios.

### Handling Reconciliation Conflicts

When the network restores and reconciliation occurs, the protocol resolves conflicts
in order:

1. **Agreed transactions (the vast majority):** Both ledgers show the same transaction;
   accepted without review.

2. **Local-only transactions (completed during partition):** Transactions that occurred
   at the local level during the partition window, within throttle limits, are accepted
   into the higher ledger automatically.

3. **Conflicted balances (rare):** If a balance discrepancy exists that cannot be
   automatically resolved — for example, if a double-spend was attempted across two
   nodes simultaneously during partition — the conflict is flagged, both transactions
   are temporarily suspended, and a human review process is initiated within 24 hours.
   The funds are locked (not lost) pending resolution.

4. **Fraud detection:** Large volumes of unusual transactions during a partition window
   trigger an automated fraud review before reconciliation is accepted. Transactions
   from accounts not authorized for the local node are flagged for verification.

---

## The Double-Spend Problem in Partition Mode

This is the classical distributed systems problem for offline payment networks: if Alice
has $100 and the network is partitioned, can she spend $80 at Store A (on Node 1) and
then $80 at Store B (on Node 2 in a different partition) before reconciliation?

The design addresses this through two mechanisms:

**1. Account jurisdiction assignment:**
Every account is homed to a single primary node. A transaction can only be approved
by the account holder's home node. Store B, on a different node, cannot approve a
debit from an account it does not host — it can only queue the transaction as pending.
Alice cannot spend her $80 twice across two partitions because only one node has
authority over her account.

**2. Cryptographic account state tokens:**
When partition mode begins, each local node issues a cryptographic state token for
every active account — a signed record of the account's balance at partition start,
valid only at that node, and invalidated upon reconnection. Transactions during
partition mode deduct from the local state token balance in real time. The state token
is the local account's authoritative balance during the partition window.

Together, these mechanisms mean that account authority is always local: you can only
spend money from the node that hosts your account, and that node tracks your real-time
balance throughout the partition. Double-spending across partitions is not possible
because the transaction cannot be authorized by a node that doesn't host the account.

---

## The Physical Reserve Tier

### Purpose and Scope

The physical reserve is not intended for everyday use or even for most disaster
scenarios. It is the final fallback tier for extreme and prolonged network failure:
extended wartime infrastructure destruction, catastrophic multi-regional events lasting
weeks rather than hours or days.

The physical reserve consists of:

- **Rare metals:** Gold, silver, and platinum group metals in standardized denominations
  held in secure vault storage at bank node facilities
- **Physical account records:** Encrypted offline backup of account balances as of the
  most recent reconciliation, printable on tamper-evident media
- **Distribution infrastructure:** Card printing, identity verification hardware,
  and supply distribution logistics — the bank facility as a community resource
  distribution point

**Quantity basis:**

Reserve quantity is calculated per facility based on the local population's basic
necessities requirement for a defined period. The target is 90 days of minimum
subsistence-level economic activity for the served population — covering food, fuel,
medicine, and utilities at rationed levels. This is not a full-economy reserve; it is
a last-resort currency for a defined emergency period.

At current gold prices and subsistence estimates, a 90-day reserve for a city of
100,000 people requires approximately 500–800 troy ounces of gold equivalent —
a secure but not enormous physical holding for a local government facility.

**Governance:**

Physical reserves are held and controlled by local government — not the bank operating
the node, not the Federal Reserve, not private shareholders. The bank facility hosts
the vault; local government holds the keys and the legal authority over distribution.

Activation of physical reserves requires a formal declaration by local or state
government. Distribution is on a needs-verified, rationed basis. The physical reserve
is explicitly not a hedge against inflation, not a speculative holding, and not
accessible under any condition short of extended multi-week network failure or
declared wartime emergency.

The connection to the existing Strategic Reserve framework: DED maintains the rare
metals acquisition and distribution protocols as part of the American Sovereign Fund
Strategic Reserve tranche, which already has authority to hold commodity reserves.
Physical bank reserves are a geographically distributed subset of the national
strategic reserve, pre-positioned at the local level.

---

## Full-Service Infrastructure at the Local Node

The bank node facility, because it already serves as the local economic infrastructure
hub, is the natural location for a suite of services that the cashless transition
requires:

**Identity and account management:**
- Account opening with in-person identity verification (biometric + document)
- Account card issuance and replacement
- Lost or compromised card deactivation and replacement within the same session
- Dispute resolution for transaction conflicts

**Automated distribution:**
- NIT monthly payments scheduled and distributed through local node ledger
- CRHP reservist compensation processed locally
- American Sovereign Fund dividend distributions
- Government benefit payments (Social Security, disability, veterans' benefits)
- Loan origination, payment scheduling, and collection
- Subscription and recurring payment management

**Emergency functions:**
- Physical reserve distribution in extreme scenarios
- Emergency account access for displaced persons (verified against national ledger
  backup and biometric confirmation)
- CRHP emergency coordination — the bank facility is a pre-designated CRHP
  mobilization point during declared emergencies

The bank facility in this model is not primarily a place to talk to a loan officer.
It is the local node of the national economic infrastructure — the place where physical
and digital economic identity meet, where the last-resort fallback systems are housed,
and where the local community's economic continuity is maintained regardless of what
is happening at higher levels of the network.

---

## Eliminating the Bank Reserve Requirement

Traditional banking requires reserves: banks must hold a fraction of deposits as liquid
assets, available to honor withdrawal demands. The reserve requirement exists because
customers might demand cash faster than the bank can liquidate assets.

In a cashless economy with a partitioned ledger network, the reserve requirement's
function is replaced entirely:

- **No physical cash withdrawals:** The event that reserves protect against — a run
  of customers demanding physical currency — cannot occur. There is no currency to run on.

- **Partition throttling replaces reserve-based liquidity:** During a partition event
  (the digital equivalent of a bank run scenario), outflows are limited by the throttle
  protocol. Capital cannot leave the local node faster than the throttle permits.
  The throttle is a circuit breaker; reserves were a buffer. Circuit breakers are
  more effective.

- **Account balances are cryptographically verified:** Because every transaction is
  logged in real time against a verified account balance, fractional reserve confusion
  (the disconnect between deposits and available funds) is eliminated. Every account
  has a provable real-time balance.

Banks in this model can lend against their capital — the same lending function they
perform today — but the lending is not constrained by reserve ratios as a liquidity
management tool. Credit standards, capital adequacy ratios, and interest rate
mechanisms remain the primary constraints on lending. The reserve requirement is
retired as an artifact of a cash-based system.

---

## Monetary Policy Under the Distributed Network

The Federal Reserve's monetary policy tools change in a cashless, partitioned-ledger
environment:

**What remains:**
- Interest rate setting (the fed funds rate continues to anchor credit markets)
- Open market operations (buying and selling securities to adjust money supply)
- Discount window lending to banks and regional networks
- Capital adequacy requirements for bank node operators

**What becomes more powerful:**
- **Direct account-level monetary operations:** The Federal Reserve can credit or
  debit any account in the national ledger directly. Helicopter money — stimulus
  payments, emergency distributions — reaches every account simultaneously with no
  intermediary. The NIT payment is not a check mailed or a bank transfer requested;
  it is a direct credit to the national ledger, propagated to local nodes at the
  next reconciliation.

- **Negative interest rates (if warranted):** Cash holdings resist negative rates
  because people can hold physical currency at 0% return. With no physical currency,
  the Fed can set negative rates on excess reserves and pass them through to accounts
  in a deflationary or demand-stimulation scenario. This is a theoretically significant
  expansion of monetary policy tools.

- **Emergency throttle authority:** During a partition event, the Fed can remotely
  set throttle limits for all nodes within a regional network — a macro-prudential
  circuit breaker that prevents capital flight from a distressed region without
  requiring individual bank action.

**What changes:**
- **The money creation mechanism:** Banks create money by lending — a deposit is made,
  a loan is issued against it, the loan creates a new deposit. This mechanism continues
  but becomes fully auditable in real time. The national ledger knows the total money
  supply at every moment, not just at quarterly reporting intervals. Monetary policy
  can be more precisely calibrated because the data is complete and current.

- **Seigniorage:** The government currently earns revenue from the physical currency
  it issues (the face value of currency exceeds the cost to produce it). In a cashless
  system, seigniorage must be replaced by explicit mechanisms — transaction fees,
  account fees, or direct Fed profit remittance to Treasury. This is a fiscal design
  question that needs resolution in the migration planning.

---

## Security Architecture

### Why Multi-Layer Encryption Defeats Systemic Attack

The critical security property of the distributed partitioned network is that no single
cryptographic compromise can bring down the full system. Each tier operates with
independently designed cryptographic parameters:

- Local node encryption uses a distinct key generation system from the regional network
- Regional network encryption is distinct from the national ledger
- Neighboring local nodes use different encryption parameters from each other

An attacker who compromises the encryption of one local node has access to the ledger
of that node only. They cannot propagate the compromise to neighboring nodes because
the cryptographic systems are independent. They cannot use the compromise to attack
the regional network because the regional layer has different keys and different
algorithms. The blast radius of any single cryptographic failure is the single node.

This contrasts sharply with the current payment infrastructure: SWIFT, ACH, and the
Federal Reserve's FedWire system share common protocols. A successful attack on the
protocol layer propagates immediately.

### Air-Gap Capability

Each local node is designed to operate fully air-gapped — with no live network
connectivity — using only its local ledger and the cryptographic state tokens issued
at the start of the partition. Air-gap operation is not the default; it is the ultimate
fallback when all network connectivity is unavailable.

Maintaining air-gap capability requires that the full local ledger and all required
cryptographic keys are stored on local hardware, not cloud-hosted. This is a departure
from the current trend in banking toward cloud-hosted core banking systems, and it
is an intentional design constraint. The resilience value of air-gap capability
exceeds the efficiency cost of local hardware maintenance.

### Physical Security

Bank node facilities housing server infrastructure require physical security beyond
current retail bank standards:

- Data center-grade physical access controls (biometric + key card + security personnel)
- Tamper-evident hardware
- Secure destruction protocols for decommissioned hardware
- Physical backup power sufficient for 72-hour autonomous operation minimum
- Hardened communications infrastructure (multiple redundant uplinks; at least one
  satellite-based uplink not dependent on local ground infrastructure)

The physical security standard is that of a Tier 3 commercial data center, which is
achievable at the scale of an individual bank branch facility.

---

## DED Integration Points

### Grid Cyberattack Scenario

The distributed partitioned ledger network directly resolves the central vulnerability
identified in the Grid Cyberattack scenario: a successful attack on national payment
infrastructure no longer produces economic paralysis. Local nodes continue processing
local transactions in partition mode. Throttles prevent mass capital flight. Physical
reserves activate if the partition extends beyond the defined duration threshold.
The scenario moves from Tier 2 (major crisis) to Tier 1 (managed disruption).

### National Economic Intelligence Dashboard

Every transaction passing through the distributed ledger is, in aggregate, a complete
real-time picture of economic activity. The NEID receives transaction-level data
(anonymized and aggregated for privacy) from each node on the reconciliation schedule.
This is a dramatically richer data source than current economic statistics, which rely
on surveys, tax filings, and quarterly reports. The NEID can detect:

- Regional economic slowdowns in real time (transaction volume decline in specific nodes)
- Commodity price spikes (payment flows to specific merchants or categories)
- Supply chain disruptions (payment failures in specific transaction categories)
- Emerging bank stress (unusual transaction patterns at specific nodes)

This turns every reconciliation cycle into a macro-economic health check.

### NIT / CRHP / ASF Distribution

Government benefit distributions — Negative Income Tax payments, Civilian Reserve
compensation, American Sovereign Fund dividends — are distributed through the national
ledger as direct account credits, propagated to local nodes at the next reconciliation.
The bank node facility handles in-person distribution for account holders who need
assistance, replacement cards, or identity verification.

This is the full-service local interface that replaces the current fragmented system
of direct deposits, prepaid cards, and check-cashing services used by unbanked
populations. The bank node is the universal point of economic participation — for
the fully connected and the marginally connected alike.

### Civilian Reserve Deployment

Bank node facilities are pre-designated Civilian Reserve mobilization points.
CRHP-enrolled technicians with data center and network operations skills are the
reserve maintenance workforce for the node infrastructure. In an emergency that requires
the network to operate in partition mode for an extended period, CRHP-trained personnel
are available to support node operation, physical security augmentation, and physical
reserve distribution logistics.

---

## Banking Sector Transformation

The distributed partitioned ledger model fundamentally changes what a bank does —
and what its obligations are.

**Today:** A bank is a financial intermediary. It takes deposits, lends against them,
and earns the spread between deposit rates and lending rates. Its physical presence
is primarily customer service and lending origination.

**In this model:** A bank is a combination of financial intermediary and critical
infrastructure operator. It still lends. But it also operates a node in the national
payment infrastructure — which means its physical facilities, its technical systems,
and its operational continuity are matters of national interest, not merely private
business decisions.

This changes the regulatory relationship. Banks that operate nodes receive:
- A formal infrastructure operator designation (analogous to electric utilities)
- Regulatory standards covering uptime, physical security, encryption compliance,
  and reconciliation performance
- Access to subsidized infrastructure financing (DED Type B co-investment for node
  facility upgrades)
- Protection from certain competitive pressures (as infrastructure operators,
  not purely as commercial competitors)

Banks that operate nodes also accept:
- Mandatory uptime and reliability standards
- Physical reserve hosting obligations (local government controls the reserve;
  bank provides the vault and the facility)
- Participation in the CRHP reserve maintenance workforce program
- Real-time reporting obligations to the NEID
- Prohibition on abandoning node operation without a replacement operator designated

The banking sector's political economy shifts: banks that currently resist regulation
as commercial competitors have a stronger reason to accept infrastructure standards
as infrastructure operators. The regulatory relationship is not adversarial; it is
the normal relationship between a regulated utility and its regulator.

---

## Implementation Phases

### Phase 1 (Years 1–3): Infrastructure Foundation

- Federal Reserve and DED establish the technical standards for local node compliance:
  encryption parameters, uptime requirements, reconciliation protocols, physical security
- Pilot program: 5–10 cities in different Federal Reserve districts deploy the first
  local nodes, operating in parallel with the existing payment system (not replacing it)
- Test partition mode in controlled scenarios; validate reconciliation protocol;
  identify failure modes
- DED co-investment contracts (Type B) for pilot node facilities
- CRHP training pipeline for network operations technicians begins
- Regulatory framework drafted: bank infrastructure operator designation, utility-style
  standards, physical reserve hosting requirements

### Phase 2 (Years 3–8): National Buildout

- Full national node network built out across all bank branch locations meeting the
  physical and technical standards
- Regional networks established at Federal Reserve district level
- Cashless economy pilot in Phase 1 cities: voluntary cashless for the full population,
  with cash still accepted (dual-system operation)
- Physical reserves positioned at each node facility under local government control
- NEID integration: transaction data feeds begin flowing from node reconciliation cycles
- NIT and CRHP distributions migrated to direct-credit model

### Phase 3 (Years 8–15): Cashless Transition

- Once node network is fully operational, resilience-tested, and universally accessible,
  begin formal cashless transition
- Legal tender status of physical currency phased out on a defined schedule
- Physical currency redemption period: 3 years to exchange notes and coins for account
  credit at any local node
- After redemption period: physical currency is no longer legal tender; all transactions
  are through the distributed ledger network

---

## Open Questions for Iteration

The following design questions are identified but not resolved in this initial concept.
Each requires additional analysis:

1. **Lending and money creation during partition:** If a bank node is in partition mode,
   can it originate new loans? New loans create new money in the ledger — which would
   need to reconcile with the national money supply. Proposed: new loan origination above
   a defined threshold requires regional confirmation; small consumer credit is local.

2. **Cross-node transactions during partition:** What happens if someone in a partitioned
   city needs to pay a business in a non-partitioned city? Proposed: the transaction
   queues at the sending node; the business is notified of pending status; the transaction
   settles at the next reconciliation.

3. **Who builds and operates the nodes in areas with no existing bank branch?**
   Rural areas with limited banking access are the hardest case. Options: postal bank
   nodes (USPS facilities); government-operated nodes; mobile nodes. This is the unbanked
   population problem in physical infrastructure form.

4. **Privacy architecture:** Local node operators can see all local transactions. This
   is a surveillance capability. What privacy protections prevent nodes from using
   transaction data commercially or sharing it with unauthorized parties? A cryptographic
   privacy layer (similar to zero-knowledge proof systems) that allows NEID aggregate
   reporting without individual transaction visibility to node operators is technically
   feasible but needs specification.

5. **International transactions:** Cross-border payments in a cashless system require
   foreign counterpart systems or international settlement mechanisms. The distributed
   ledger architecture does not extend automatically to international transactions.
   SWIFT replacement or integration needs design.

6. **Cryptocurrency and stablecoins:** The distributed partitioned ledger effectively
   provides what private cryptocurrencies claim to provide — a resilient, distributed,
   cryptographically secure payment system — but under federal governance and with
   monetary policy integration. The regulatory relationship with private cryptocurrencies
   in a world where this system exists needs resolution.

7. **Physical reserve quantity calibration:** The 90-day subsistence reserve estimate
   needs actuarial analysis. What is the realistic maximum duration of an extreme network
   failure? What level of economic activity needs to be supported? How does the reserve
   interact with existing DED Strategic Reserve holdings?

---

## Cross-References

- `ded/scenarios/grid-cyberattack/` — primary scenario addressed by this infrastructure
- `ded/tools/sovereign-compute-reserve.md` — analogous pattern: distributed sovereign
  infrastructure as resilience against centralized single-point-of-failure
- `ded/proposal/american-sovereign-fund.md` — Strategic Reserve tranche; physical rare
  metals reserve integration
- `ded/proposal/universal-basic-income.md` — NIT distribution via direct account credit
- `ded/proposal/civilian-reserve-health/` — CRHP network operations technicians as
  node maintenance workforce
- `ded/tools/permitting-acceleration-authority.md` — node facility construction
  permitting acceleration mechanisms apply
- `ded/economics/supply-chain-concentration-risk.md` — NEID data quality improvement
  from real-time transaction ledger feeds
