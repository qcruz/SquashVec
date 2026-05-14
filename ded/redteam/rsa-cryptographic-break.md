# DED Red Team Scenario: Polynomial-Time Integer Factorization Published

**Scenario ID:** RT-002
**Last Updated:** 2026-05
**Primary DED Scenarios Activated:** Financial Fragmentation (primary), Grid Cyberattack, Semiconductor Collapse
**Estimated Economic Impact:** $2–8T if unmanaged; $400–800B if DED response is rapid
**DED Readiness Assessment:** Poor — DED has almost no pre-built instruments for this specific event; scenario exposes a major gap in the framework
**Classification Note:** This scenario has significant overlap with classified national security planning; DED analysis covers the *economic* response only

---

## 1. Situation

### Background

Modern digital security — banking, e-commerce, government communications, power grid control
systems, the internet itself — rests on the mathematical difficulty of factoring large integers.
RSA-2048 encryption, the standard protecting most financial transactions, HTTPS connections,
and sensitive government communications, requires factoring a 2,048-bit number that is the
product of two large primes. The best known classical algorithm (General Number Field Sieve)
would take longer than the age of the universe on any classical computer.

**The vulnerability:** If a polynomial-time algorithm for integer factorization were discovered —
one that scales feasibly with the size of the number rather than exponentially — RSA encryption
of any key length would be broken. Not "hard to break" — *broken*, retroactively and prospectively.
This is categorically different from a brute-force attack or a quantum computing advance
(which requires physical hardware at scale). A mathematical algorithm can be published,
replicated, and deployed by any actor with a computer within days.

NIST has been developing post-quantum cryptographic standards (CRYSTALS-Kyber, CRYSTALS-Dilithium)
since 2016 precisely because quantum computers threaten RSA. But the transition has been slow:
as of 2027, less than 30% of critical infrastructure has migrated to post-quantum standards.

### The Triggering Event

**September 9, 2027, 06:14 UTC.** A preprint paper titled *"A Polynomial-Time Algorithm for
the Integer Factorization Problem"* is uploaded to arXiv by a team of three mathematicians
at the Beijing Institute of Mathematical Sciences and Applications (BIMSA). The paper is
immediately noticed by the cryptography community.

By 09:00 UTC, three independent verification teams (MIT, ETH Zurich, and the University of
Waterloo) have confirmed the core proof structure is not immediately falsified. By 14:00 UTC,
a team at Carnegie Mellon has implemented a prototype and factored RSA-512 in 47 seconds on
a standard workstation. By 18:00 UTC, a modified version factors RSA-1024. RSA-2048
factorization is estimated at 6–18 hours on high-end hardware.

By the time U.S. markets open on September 10, it is no longer a theoretical result. It is
an operational capability.

**What is immediately broken:**
- RSA encryption (all key lengths; used in HTTPS, SSH, TLS, VPN, S/MIME email)
- Diffie-Hellman key exchange (same mathematical basis)
- Elliptic curve cryptography (ECDSA, ECDH — used in Bitcoin, Ethereum, and most modern
  TLS including TLS 1.3)
- PGP/GPG secure email
- Most VPN protocols
- SSL certificates for every HTTPS website

**What is NOT immediately broken:**
- Symmetric encryption (AES-256) — different mathematical problem; not affected
- CRYSTALS-Kyber / post-quantum algorithms — already deployed in ~30% of critical systems
- Physical security (air-gapped systems, hardware tokens, biometrics)
- Hash functions (SHA-256, SHA-3) — different mathematical basis

---

## 2. Cascade Timeline

### Day 0 (September 10): Market Open

- Federal Reserve and Treasury alert; emergency FSOC (Financial Stability Oversight Council)
  call at 05:30 ET before markets open
- CISA issues emergency advisory for all federal systems to suspend RSA-based authentication
  immediately
- NYSE and NASDAQ open with circuit breakers on standby; within 90 minutes both markets are
  in full circuit breaker halt as bank stocks fall 20–35% in the first hour
- Bitcoin price falls 70% in 4 hours (ECDSA broken; every private key derivable from public
  key); Ethereum falls 75%; total crypto market loses ~$1.2T in 6 hours
- Banks begin suspending online banking portals and mobile apps (all use TLS/RSA)
- Every HTTPS website in the world is theoretically readable by any actor with the algorithm;
  in practice, most attackers haven't yet implemented it — but the window is hours to days

### Day 1–3: Infrastructure Cascade

- **Banking system:** SWIFT, Fedwire, and ACH all use RSA-based authentication at some level.
  SWIFT emergency suspends non-essential transactions; Fedwire operates at 30% volume on
  AES-256 symmetric encryption bridges deployed in emergency mode.
- **Power grid SCADA:** Most substation control systems use TLS/RSA for remote management.
  NERC emergency directive orders all utilities to switch to air-gapped manual operations
  immediately — but only ~40% have been trained and equipped for manual operation. The rest
  have partial or inadequate manual fallback capability.
- **Internet routing:** BGP routing uses cryptographic signatures; compromised BGP could
  enable route hijacking at scale. Major CDNs and ISPs begin emergency transition to
  post-quantum routing authentication.
- **Mobile networks:** 5G uses RSA in its initial handshake protocols; 4G uses RSA
  extensively. Some carriers begin suspending service to prevent interception; others
  continue with the risk.
- **Military and intelligence:** Most classified systems use separate NSA-approved
  cryptographic suites that include post-quantum elements; classified systems are more
  resilient. Unclassified military systems (logistics, supply chain, personnel) are exposed.

### Day 3–14: The Retroactive Problem

The most underappreciated dimension of a cryptographic break is **retroactivity**. Every
RSA-encrypted message ever sent can now be decrypted if it was intercepted and stored.

Intelligence agencies (NSA, GCHQ, FSB, MSS) have been conducting "harvest now, decrypt
later" collection operations for years — collecting encrypted communications they couldn't
decrypt, waiting for eventual cryptanalytic advances. With the algorithm published:
- Classified diplomatic communications from the past 5–10 years may be decryptable
- Corporate merger negotiations, litigation strategy, proprietary technology designs
- Personal financial records, health records, communications

This retroactive exposure is impossible to reverse. Its scale is unknown and unknowable.
The DED-relevant consequence: businesses and individuals learn their past financial
transactions are readable; confidence in digital commerce collapses not just for future
transactions but retroactively.

### Week 2–4: Financial System Partial Restoration

Emergency deployment of post-quantum cryptography is underway but uneven:
- Large banks (JPMorgan, Bank of America, Citigroup) had partial CRYSTALS-Kyber deployment;
  achieve 60–80% restoration of digital banking within 2 weeks
- Community banks and credit unions with no post-quantum infrastructure are functionally
  offline for 4–8 weeks while they obtain and deploy updated software
- Payment processors (Visa, Mastercard): Visa achieves 70% transaction capacity within 10 days;
  Mastercard 55%; American Express 80% (most aggressive post-quantum adoption pre-crisis)
- ACH / Fedwire: Treasury and Fed restore full capacity on post-quantum protocols within
  14 days for the core Fedwire backbone; ACH downstream from community banks takes longer

### Month 1–3: Structural Damage Assessment

- 2,800–3,400 community banks and credit unions with inadequate IT departments cannot complete
  post-quantum migration without external technical assistance; estimated 400–600 become
  functionally insolvent as customer confidence erodes and deposits flee to larger institutions
- Small and medium businesses dependent on RSA-era payment infrastructure (legacy POS
  systems, older ERP software) face upgrade costs of $50k–$500k; many cannot afford this
  without assistance
- The global PKI (Public Key Infrastructure) — the entire system of SSL certificates, certificate
  authorities, and trusted roots — must be rebuilt from scratch on post-quantum algorithms;
  estimated 12–18 months for full industry-wide migration

---

## 3. Economic Damage Estimate

Estimating this scenario is inherently uncertain because it depends on response speed.
The table shows unmanaged vs. well-managed outcomes.

| Category | Unmanaged (18+ month recovery) | DED-Assisted (6-month recovery) |
|----------|-------------------------------|--------------------------------|
| Financial sector disruption (bank runs, market decline, lost transactions) | $1.5–3T | $300–500B |
| Crypto market collapse | $1.2–2T permanent | $1.2–2T (unavoidable) |
| Business disruption (e-commerce, digital payments offline) | $800B–1.5T | $80–150B |
| Infrastructure remediation (PKI rebuild, software updates) | $400–600B | $150–250B |
| Community bank failures (deposit insurance, FDIC resolution) | $200–400B | $50–80B |
| Retroactive intelligence/IP exposure (present-value estimate) | Incalculable | Incalculable |
| **Total estimated** | **$4–8T** | **$1.8–3T** |

The $2–5T gap between unmanaged and DED-assisted represents the value of rapid, coordinated response.

---

## 4. DED Program Mapping

### What Activates Immediately

**Financial Fragmentation Phase 1 — Payment Continuity:**
The financial fragmentation scenario's Phase 1 instruments are directly applicable:
- **Allied currency swap lines:** Banking system disruption makes dollar clearing unreliable;
  Fed's standing swap lines with ECB, Bank of England, Bank of Japan, etc. activate
  immediately to backstop international payment continuity during the transition period
- **Trade finance reserve facility:** Treasury backstop for critical import finance prevents
  the payment system disruption from translating into a physical goods shortage
- **Commodity-backed payment alternatives:** Pre-designed barter/commodity frameworks for
  the most critical import categories; activated while digital payment systems restore

**Grid Cyberattack Phase 1 — Emergency Infrastructure:**
The grid cyberattack response framework is partially applicable:
- **Air-gapped control system activation:** Pre-positioned air-gapped backup control systems
  at priority substations now become the primary control mechanism; DED contracts activate
- **CRHP Grid Restoration Track:** Electricians and SCADA technicians deployed to substations
  transitioning to manual/backup control operations
- **Emergency fuel priority contracts:** If grid instability follows from control system
  disruption, fuel priority contracts for hospitals and water treatment activate

### New DED Actions Required

**Emergency Technical Assistance Corps (ETAC) — New Program:**
The most critical gap: 2,800–3,400 community banks and credit unions have no path to post-quantum
migration without external technical help. The DED does not currently have a technology
deployment corps. This is the closest analog to CRHP but for cybersecurity technicians.

Proposed emergency program (Type A contracts with private sector IT firms):
- DED contracts with 20–30 major IT services firms (IBM, Accenture, Deloitte, KPMG, regional
  MSPs) to deploy "Post-Quantum Migration Teams" to community financial institutions at
  government-subsidized rates
- Tiered by institution size: smallest (< $500M assets) receive free deployment; medium
  ($500M–$5B) receive 50% subsidy; larger are self-funded
- Target: 3,000 institutions migrated within 90 days
- Cost: $4–8B; prevents $200–400B in community bank failures and FDIC exposure

**Business Survival Loans — Cryptographic Transition Variant:**
Small and medium businesses cannot afford emergency post-quantum software upgrades, hardware
security module replacement, and PKI re-enrollment. BSL-style bridge loans:
- $25k–$200k per business for cryptographic infrastructure upgrade
- 0% interest; revenue-contingent repayment (same structure as business-survival-loans.md)
- Eligibility: businesses with documented >50% revenue decline due to payment system disruption
- Target: 500k–1M eligible businesses; average $75k
- Total program: $37–75B; prevents $200B+ in permanent small business closures

**Strategic Semiconductor Reserve — Emergency Draw:**
Post-quantum migration requires immediate production of:
- Hardware Security Modules (HSMs) — dedicated cryptographic hardware; Entrust, Thales,
  nCipher are primary manufacturers; typical lead time 8–16 weeks
- Trusted Platform Module (TPM) chips — embedded in every device for secure boot;
  production scaling needed for rapid device updates
DED invokes strategic chip reserve for defense and financial sector priority allocation;
emergency procurement authority activates for HSM manufacturing surge.

### Longer-Horizon Response

**National Post-Quantum Infrastructure Program (NPQIP):**
This scenario will occur eventually — either via mathematical advance (this scenario) or
via quantum computing. The DED should establish an NPQIP:
- Type B contracts with all critical infrastructure operators (financial, energy, healthcare,
  telecommunications) for post-quantum migration completion within 36 months
- DED co-invests 30% of migration costs; operators fund the rest
- NEID tracking: post-quantum migration percentage by sector (current: ~30% average)
- Mandate: DED procurement standards require post-quantum cryptography for all DED contract
  parties within 24 months of program launch
- Cost: $50–80B total; spread over 3 years; funded by revenue from existing DED IP assets
  and targeted appropriation

**This program should exist NOW, before RT-002 occurs.** It is the pre-positioning investment
that converts this from a $4–8T disaster to a $400–800B managed disruption.

---

## 5. Optimal Program Combination

### Phase 1 (Day 0–14): Stop the Bleeding

The goal in the first two weeks is to prevent the financial cascade from becoming permanent.
Every day of payment system outage is approximately $50–80B in economic activity suspended.

| Action | Instrument | Cost | Priority |
|--------|-----------|------|----------|
| Fed swap lines activation | Financial Fragmentation Phase 1 | Near-zero | Immediate |
| Trade finance reserve facility | Financial Fragmentation Phase 1 | $50–100B contingent | Immediate |
| Air-gapped grid control activation | Grid Cyberattack Phase 1 | Pre-built (activate contracts) | Immediate |
| CRHP grid technician deployment | Grid Cyberattack Phase 1 | $200–500M | 48 hours |
| Crypto BSL program launch | New Type A | $37–75B | 72 hours |
| ETAC community bank deployment | New Type A | $4–8B | 72 hours |

### Phase 2 (Week 2 – Month 3): Restore Commerce

| Action | Instrument | Cost | Priority |
|--------|-----------|------|----------|
| Strategic chip reserve + HSM manufacturing surge | Semiconductor Phase 1 | $2–5B | Week 2 |
| Full ETAC deployment to all community banks | New Type A | Ongoing | Week 2–12 |
| BSL disbursement to small businesses | BSL crypto variant | $37–75B | Week 3 |
| TRAL crisis activation (Level 1) | TRAL | $40–60B/quarter | Week 3 |
| Stimulus checks (non-filers, cash economy workers) | Stimulus | $50–80B | Month 1 |

### Phase 3 (Month 3–36): Structural Rebuild

| Action | Instrument | Cost | Priority |
|--------|-----------|------|----------|
| NPQIP launch (should already exist) | Type B | $50–80B over 3 years | Month 1 |
| PKI rebuild standards development | NIST coordination (no DED cost) | $0 direct | Month 1 |
| Retroactive exposure mitigation | Classified / CISA-led | N/A | Ongoing |

### What DED Cannot Do

- **Reverse the cryptographic break.** The algorithm is published; it cannot be unpublished.
  Mathematical facts cannot be declared national security emergencies.
- **Restore cryptocurrency value.** ECDSA-based cryptocurrencies are permanently broken;
  blockchain assets on those chains are irrecoverable. DED cannot backstop this.
- **Prevent the retroactive exposure.** Harvested communications are decryptable now.
  DED's role is economic stabilization; retroactive intelligence damage is a separate response.
- **Replace the internet's PKI overnight.** The migration will take 12–24 months regardless
  of investment. DED can fund it but cannot compress the human expertise and coordination
  required to replace global certificate infrastructure.

---

## 6. What the DED Wouldn't Have

**Critical Gap 1 — No technology deployment corps:**
The CRHP is a physical labor reserve (electricians, technicians). There is no equivalent
for cybersecurity and IT migration specialists. The ETAC concept in this scenario is a
new program that does not currently exist in the DED framework.

**Pre-build:** Establish a Cybersecurity Reserve Corps (CRC) within CRHP — 5,000+ certified
IT security professionals enrolled, with specialization in post-quantum cryptography migration.
Annual training requirement: 40 hours. Deployment activation: within 96 hours of declaration.
Cost: $100–150M/year to maintain; $2–5B to deploy in a crisis.

**Critical Gap 2 — No cryptographic infrastructure monitoring in NEID:**
NEID monitors commodity prices and supply chain indicators. It does not monitor the
cryptographic security posture of critical infrastructure. Post-quantum migration percentage
by sector should be a NEID standing dashboard metric — both as a preparedness indicator
and as a leading indicator of vulnerability.

**Pre-build:** NEID Cryptographic Resilience Index — quarterly survey of post-quantum
migration status at systemically important financial institutions, critical infrastructure
operators, and major federal systems. Alert threshold: any sector below 50% migration.

**Critical Gap 3 — No pre-authorized emergency payment system protocols:**
When digital payment systems fail, what is the backup? The financial fragmentation scenario
assumes the dollar payment system is disrupted by geopolitics; this scenario assumes the
cryptographic layer fails. The underlying payment mechanisms are different. DED should have
pre-designed paper-based, in-person, and AES-256 symmetric fallback payment protocols for
all systemically important financial institutions — documented, tested, and ready to activate.

---

## 7. Lessons for Pre-Positioning

1. **Launch NPQIP now.** The cryptographic break in this scenario is presented as a single
   sudden event, but the Harvest Now/Decrypt Later threat is already operational. Every month
   of delay in post-quantum migration increases the retroactive exposure accumulating in
   adversary archives.

2. **Establish the Cybersecurity Reserve Corps.** The CRHP model works for physical skills;
   extend it to cyber. A 5,000-person CRC with post-quantum specialization, deployable in
   96 hours, converts this scenario from existential to manageable.

3. **Mandate post-quantum for all DED contract parties.** Every Type A/B/C/D contract DED
   signs should include a post-quantum cryptography requirement. DED's procurement leverage
   is the most efficient tool for driving adoption across the critical infrastructure supply chain.

4. **Separate economic and security response authorities.** This scenario requires simultaneous
   classified intelligence response (NSA, ODNI, DoD) and economic response (DED, Treasury,
   Fed). Pre-designed interagency authorities preventing these from conflicting or creating
   a response vacuum should be in the DED enabling legislation.

---

## Cross-References

- `ded/scenarios/financial-fragmentation/overview.md` — payment continuity instruments activate directly
- `ded/scenarios/grid-cyberattack/phase-1-immediate-response.md` — air-gapped control systems
- `ded/scenarios/semiconductor-collapse/phase-1-triage-and-allocation.md` — HSM/TPM chip prioritization
- `ded/tools/business-survival-loans.md` — cryptographic transition variant
- `ded/tools/strategic-contracts.md` — ETAC as emergency Type A contract structure
- `ded/assets/profiles/darpa.md` — DARPA post-quantum cryptography research programs
