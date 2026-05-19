# DED Funding Options Catalog

**Last Updated:** 2026-05
**Document Type:** Master Revenue Instrument Reference
**Status:** Living document — options added as identified; each option evaluated for
  revenue potential, political practicality, implementation complexity, and DED alignment

---

## Design Principles

**Simplicity of narrative is a primary selection criterion.**

A funding mechanism that raises $3B/year and can be explained in one sentence to any
citizen is more valuable than one that raises $5B/year and requires a policy briefing to
understand. The goal is a system where the average person can trace: *my activity → tax →
fund → my benefit.* The shorter and more direct that chain, the more durable the political
coalition that defends it.

**Circulation loops are structurally superior to one-way transfers.**

A tax that feeds a fund that pays dividends that generate taxable spending that refills
the fund is not just self-sustaining — it is self-reinforcing. Every dollar distributed
returns a fraction through the loop. Identifying and building these loops is a higher
priority than maximizing raw revenue from any single instrument.

**Revenue stacking matters more than single-instrument optimization.**

No single stream should be large enough that its disruption destabilizes the system.
Arms sales fluctuate. Tariffs rise and fall with trade policy. Markets crash. A portfolio
of eight to twelve funding streams — each modest, each from a different economic sector —
is more stable than two large ones. Stack small, diversify widely.

---

## Evaluation Criteria

Each funding option is scored on five dimensions:

| Dimension | Scale | Definition |
|-----------|-------|-----------|
| **Revenue** | $B/year | Estimated annual yield at proposed rate |
| **Political Practicality** | 1–5 | 5 = passable in any Congress; 1 = requires supermajority and favorable moment |
| **Implementation Complexity** | 1–5 | 5 = plug into existing IRS/Treasury mechanism; 1 = requires new agency and definitions |
| **Distortion Risk** | 1–5 | 5 = minimal behavioral change; 1 = significant avoidance, market distortion, or capital flight |
| **Narrative Simplicity** | 1–5 | 5 = one sentence explanation any citizen understands; 1 = requires policy briefing |

**Priority Score** = avg of all five dimensions. Options above 4.0 are primary candidates;
3.0–3.9 are secondary; below 3.0 require a specific policy rationale to include.

---

## Category A: Transaction-Based Levies

These apply to the act of value transfer — every time funds change hands, a fixed or
percentage amount is collected. They are the most directly tied to economic activity and
the strongest loop instruments.

---

### A-1: Penny Transaction Tax — $0.01 per transaction (recipient pays)

**Mechanism:** A flat $0.01 tax is owed by the recipient of every financial transaction
at the moment of settlement. Applies to all transfers of funds — cash register sales,
electronic payments, direct deposits, wire transfers, brokerage settlements, rent
collection, dividend disbursements, payroll. For cash transactions, the tax is collected
from the business recipient at point of sale (already required to record cash receipts
for income tax purposes). For electronic transactions, collected automatically at
clearing.

**Carveout options:**
- Micro-transaction grouping: transactions below $1 may be batched; tax assessed once
  per day per merchant on cumulative small transactions rather than per-item
- Charitable donations: exempt (or apply with immediate matching mechanism)
- Government-to-citizen transfers: exempt (NIT, dividend, disaster relief — taxing the
  government's own distributions would be circular)
- Interbank settlement legs: tax only the final economic recipient, not intermediate
  clearing hops
- HFT / market makers: eligible for volume carve-out or grouping by trading session
  rather than per-trade

**Revenue estimate:**

| Scope | Transactions/Year | Revenue |
|-------|------------------|---------|
| Electronic retail only | ~100B | ~$1.0B |
| All electronic non-securities | ~175B | ~$1.75B |
| All electronic including cash-business settlement | ~250B | ~$2.5B |
| Full cashless economy (post-migration) | ~500B–1T | ~$5–10B |
| Full including securities (with grouping carveout) | ~300B effective | ~$3B |

*Practical near-term estimate: $2–3B/year, growing to $5–8B/year post-cashless migration.*

**The narrative:** *"One penny on every transaction pays for your monthly dividend. When
the economy moves, you get paid."* This is the strongest single-sentence funding narrative
in the entire DED system. Directly links economic activity to citizen benefit. Impossible
to characterize as punitive — it is literally one cent.

**Loop connection:** Penny tax → ASF → monthly dividend → citizen spends → penny tax →
ASF. The fund partially pays for itself through the activity its own distributions generate.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $2–3B (near), $5–8B (cashless) | 4 | 4 | 5 | **5** | **4.4** |

**Status:** Under active evaluation. Recommend adding to ASF as Stream G, contingent on
cashless migration progress for full realization. Near-term adoption justified by narrative
value alone.

---

### A-2: Financial Transaction Surcharge — 0.01% on trades above $1M notional

**Mechanism:** One basis point surcharge on U.S. equity, debt, and derivatives trades
above $1M notional. Calibrated to absorb into institutional bid-ask spreads — invisible
to retail investors. Applied at clearing (DTCC, CME, Options Clearing Corp).

**Revenue:** ~$17–20B/year at current U.S. market volumes. Grows with market activity.

**Already included in ASF as Stream B.**

**Narrative:** "Large institutional trades pay a rounding fee that funds national
investment." Less simple than A-1 but defensible. The $1M threshold creates a clear
"not for the little guy" framing.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $17–20B | 3 | 4 | 4 | 3 | **3.8** |

**Status:** Adopted (ASF Stream B). Highest-revenue transaction instrument by far.

---

### A-3: Currency Exchange / International Transfer Levy — 0.1% on cross-border transfers

**Mechanism:** A 0.1% (10 basis point) levy on all international wire transfers and
currency exchange transactions cleared through U.S. financial institutions. Applies to
both outbound and inbound transfers. Rate is 10× the Financial Transaction Surcharge but
still modest — $10 on a $10,000 remittance.

**Revenue estimate:** U.S. international wire transfer volume ~$5–8T/year through
Fedwire/CHIPS international channels. 0.1% = **$5–8B/year.** Remittances alone
($170B/year out): 0.1% = $170M additional.

**Carveout options:** Government-to-government transfers exempt; humanitarian aid flows
exempt; FX hedging by manufacturers (applied to net position, not gross notional).

**Political consideration:** Moderate resistance from banking lobby; some tension with
remittance-heavy immigrant communities (though 0.1% on a $200 remittance = $0.20 — not
a meaningful burden). Raises "capital controls" concern that is overblown at 0.1% but
will be used rhetorically.

**Narrative:** "When money crosses the border, it leaves a small contribution to the fund
that belongs to all Americans." Moderate simplicity — requires slight explanation of
scope.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $5–8B | 3 | 3 | 4 | 3 | **3.4** |

**Status:** Secondary candidate. High revenue potential; political framing manageable
with remittance carveouts.

---

## Category B: Designated Tax Allocations

These redirect a portion of existing or new taxes to DED programs rather than the general
fund. They are the most politically durable mechanism: they do not raise new taxes on a
net basis (existing revenue is redirected), making them harder to characterize as tax
increases while still building program capital.

---

### B-1: Consumption / Sales Tax Circulation Loop — 5% federal excise + 1% state share

**Mechanism:** 5% of existing federal excise tax receipts (alcohol, tobacco, gasoline,
airline tickets, phone service) automatically deposited to ASF monthly. Separately, states
that opt into the Participation Agreement receive DED program benefits in exchange for
directing 1% of state sales tax collections to ASF.

**Revenue:** ~$4.3B federal excise share + $3–6B state participation = **$7–10B/year.**

**Loop connection:** The strongest circulation loop in the system. ASF dividends are
spent → generate sales and excise tax → a share refills ASF → next dividend is larger.
As dividends grow, so does the refill. The fund becomes partially self-sustaining.

**Already included in ASF as Stream D.**

**Narrative:** "When you spend your dividend, a penny of every sales tax you pay goes
back into the fund that paid it." Perfect loop narrative.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $7–10B | 4 | 4 | 5 | 4 | **4.2** |

**Status:** Adopted (ASF Stream D). Recommend expanding state opt-in incentive package
to accelerate participation.

---

### B-2: Capital Gains Surtax — 0.5% additional on long-term gains above $100k

**Mechanism:** An additional 0.5 percentage point on net long-term capital gains above
$100,000 for individuals, deposited to ASF. Structured as a surtax on top of existing
rates, not a replacement. Applies to securities, real property, business sales.

**Revenue:** ~$5–8B/year.

**Already included in ASF as Stream E.**

**Narrative:** "When investments grow, a fraction of the gain goes into the national
investment fund that pays your dividend." Moderate clarity.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $5–8B | 3 | 4 | 4 | 3 | **3.6** |

**Status:** Adopted (ASF Stream E).

---

### B-3: Estate / Inheritance Tax Enhancement — +2pp on estates above $25M

**Mechanism:** Two percentage point rate increase on federal estate tax for estates above
$25M, with all additional revenue deposited to ASF. Operates on the existing estate tax
structure; does not affect the exemption threshold ($13.6M individual).

**Revenue:** ~$8–12B/year.

**Already included in ASF as Stream F.**

**Narrative:** "The largest estates contribute a small portion to the fund that every
living American receives a dividend from. Wealth built in America benefits all Americans."
Strong generational equity framing.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $8–12B | 3 | 4 | 4 | 4 | **3.8** |

**Status:** Adopted (ASF Stream F).

---

### B-4: Carbon Tax / Carbon Border Adjustment — $40–60/ton CO2

**Mechanism:** A price on carbon emissions applied at the point of production or import.
Domestic producers pay per ton of CO2-equivalent emitted. Foreign goods from
high-carbon manufacturing countries pay a border adjustment equivalent to what a domestic
producer would have paid. Revenue deposited partially to ASF (40%), partially to clean
energy transition programs (60%).

**Revenue estimate:** U.S. emissions ~5.5B tons CO2-equivalent/year.
At $50/ton on ~60% of emissions (industry, transportation, electricity): **~$165B/year.**
40% to ASF = **~$66B/year** — the single largest potential revenue stream in this catalog.

**Political practicality:** The lowest-scored option by this dimension. Carbon pricing
has failed to pass Congress repeatedly despite bipartisan public support at the abstract
level. The Border Carbon Adjustment is more palatable (frames as trade equity, not green
tax) and has recent EU precedent. A border-adjustment-only version raises less revenue
but may be achievable: **$8–15B/year.**

**DED alignment:** Strong. Carbon price is an economic signal that directly serves DED
goals (energy independence, domestic clean manufacturing, reduced oil import dependency).
Revenue would accelerate ASF Strategic Reserve deployment in clean energy. The instrument
is self-reinforcing with DED energy scenario planning.

**Narrative:** "The cost of pollution funds the national investment fund and your monthly
dividend. Clean up the economy and everyone gets paid." Clear but politically loaded.
Border adjustment framing: "Foreign manufacturers who pollute freely pay a fee when
selling into the U.S. market, the same way a domestic manufacturer would. That revenue
goes into the American fund." Much stronger.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $66B (full) / $8–15B (border only) | 2 (full) / 3 (border) | 3 | 4 | 3 | **3.0** (full) / **3.4** (border) |

**Status:** High-value secondary candidate. Border-only version is near-term actionable.
Full carbon price requires favorable political moment. Worth holding as a reserve
instrument — if passed, transforms the ASF funding profile.

---

### B-5: Stock Buyback Excise Expansion — increase from 1% to 2.5%

**Mechanism:** The Inflation Reduction Act (2022) established a 1% excise tax on
corporate stock buybacks. Increasing this to 2.5% and directing the additional 1.5% to
the ASF.

**Revenue:** Current 1% buyback tax raises ~$10–15B/year. The additional 1.5% directed
to ASF: **~$15–22B/year.**

**Political practicality:** Higher than a new tax — expanding an existing mechanism
is procedurally simpler. The 2022 precedent removes the "never been done" objection.
Corporate opposition will be intense; the framing (returning shareholder value extraction
to national wealth) is defensible.

**Distortion:** Some concern that buyback tax accelerates shift to dividends (which are
also taxable to recipients but not to the corporation). Dividend shift would increase
personal income tax revenue — a partial offset. Net distortion: moderate.

**Narrative:** "When corporations buy back their own stock instead of investing in
workers or growth, they pay a small fee into the national investment fund." Clear and
politically compelling — leverages existing public skepticism of buybacks.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $15–22B | 3 | 5 | 3 | 4 | **3.6** |

**Status:** Strong secondary candidate. Recommend adding to ASF funding stack.

---

### B-6: Wealth Tax — annual levy on net worth above $50M

**Mechanism:** An annual 1% tax on net worth above $50M (individuals and trusts), with
50% deposited to ASF and 50% to general fund debt reduction. Modeled on the Warren
wealth tax proposal but at lower rates.

**Revenue estimate:** ~11,000–15,000 U.S. households above $50M threshold.
Combined net worth: ~$20–25T.
1% on ~$15T (after $50M exemption per household) = **~$150B/year.** Split 50/50: **$75B/year to ASF.**

*These estimates are highly uncertain — wealth is hard to value annually and the tax
base would contract through avoidance, trust restructuring, and emigration.*
Realistic net estimate after behavioral adjustment: **$20–40B/year to ASF.**

**Constitutional risk:** High. The U.S. Constitution's "direct tax" clauses (Art. I,
§2 and §9) may require apportionment among states by population, making a federal
wealth tax constitutionally uncertain without a Supreme Court ruling or constitutional
amendment. This is not a dealbreaker but adds implementation uncertainty.

**Political practicality:** Low-moderate. Intense opposition from wealthy individuals
and financial industry. Public support is consistently high in polls (~70%+) but
concentrated opposition from the most politically active donors. Requires Senate
supermajority in practice.

**Narrative:** "The wealthiest Americans pay 1% of what they own each year into the
national fund. Everyone else gets the dividend." Maximum political clarity and populist
appeal. The simplest narrative of any option in this catalog.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $20–40B (realistic) | 2 | 2 | 2 | 5 | **2.8** |

**Status:** Long-term aspirational. Powerful if achievable but faces constitutional and
political barriers that make it unreliable as a primary stream. Include in ASF legislation
as an optional escalation trigger: if Congress chooses to add a wealth tax in the future,
the ASF is the pre-designated recipient.

---

### B-7: Digital Services Tax — 3% on domestic revenue of large digital platforms

**Mechanism:** A 3% tax on the U.S. digital advertising, subscription, marketplace, and
data brokerage revenue of companies with >$1B in global digital revenue. Modeled on
France's DST (1%) and UK DST (2%). Revenue deposited to ASF.

**Revenue estimate:** U.S. digital economy revenues subject to DST: ~$800B–1T/year.
3% = **$24–30B/year.**
*After excluding cloud infrastructure, SaaS, and e-commerce (contested scope):
likely $8–15B/year in practice.*

**Political consideration:** DSTs have generated WTO friction when implemented by
European countries — the U.S. retaliated against France's DST with threatened tariffs.
A U.S. domestic DST would face less trade law exposure but intense lobbying from Big Tech.
The Technology Automation Tax (ASF Stream A) partially overlaps this space and is
better scoped.

**Narrative:** "Digital platforms profit from American attention and data. A portion of
that revenue goes into the national fund." Good but requires awareness of what digital
platform revenue is. Less universal than penny tax framing.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $8–15B | 2 | 3 | 3 | 3 | **2.8** |

**Status:** Overlap with Technology Automation Tax makes this redundant unless DST is
scoped specifically to advertising and data monetization revenue not captured by TAT.
Evaluate after TAT is implemented.

---

### B-8: Data Monetization Tax — 0.5% on revenue from selling or licensing user data

**Mechanism:** A tax on the gross revenue companies generate from selling, licensing, or
otherwise commercially exploiting user data — targeting data brokers, ad-tech networks,
and platforms that sell audience targeting. Separate from DST; focuses specifically on
the data transaction, not the advertising transaction.

**Revenue estimate:** U.S. data broker industry: ~$250B/year. Ad-tech targeting revenue
(data-enabled): ~$100B/year. 0.5% on $350B = **~$1.75B/year.**

**Narrative:** "Your data has value. When companies sell it, they pay a fraction into
the national fund that pays your dividend." Excellent narrative — creates explicit link
between personal data exploitation and personal financial benefit. Politically resonant
given public awareness of data privacy issues.

**DED alignment:** Moderate. Primarily a consumer equity instrument; limited direct
connection to supply chain resilience. But the data economy is a strategic asset and
taxing its extraction mirrors the resource royalty logic (public resource generates
public capital).

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $1.75B | 3 | 3 | 4 | 5 | **3.6** |

**Status:** Secondary candidate. Modest revenue but exceptional narrative. Pairs well
with penny tax as a complementary "your activity funds your dividend" message.

---

## Category C: Resource and National Asset Revenue

These capture returns on national assets — military exports, natural resources, spectrum,
intellectual property — that currently generate revenue without a dedicated national
wealth-building mechanism.

---

### C-1: Arms Sales Levy — 7.5% of gross defense export contract value

**Already included in ASF as primary funding stream.**

**Revenue:** ~$17–22B/year at current volumes.

**Narrative:** "When allies buy American weapons, 7.5% goes into the national investment
fund. Security exports build domestic wealth." Strong DED rationale.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $17–22B | 3 | 4 | 4 | 3 | **3.6** |

**Status:** Adopted (ASF primary stream).

---

### C-2: Tariff Revenue Share — 20% of all customs and tariff collections

**Already included in ASF as primary funding stream.**

**Revenue:** $16–60B/year depending on trade policy regime.

**Narrative:** "When foreign goods enter the U.S., importers pay a tariff. 20% of that
goes into the national investment fund." Clear.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $16–60B | 4 | 5 | 4 | 4 | **4.2** |

**Status:** Adopted (ASF primary stream).

---

### C-3: Federal Spectrum Auction Revenue — 100% to ASF

**Mechanism:** All revenue from FCC spectrum license auctions deposited directly to ASF
rather than general fund. Ongoing spectrum lease fees (annual payments from existing
licensees) also directed to ASF.

**Revenue estimate:** Spectrum auctions have raised $20–100B over multi-year cycles.
Annual equivalent: $2–10B/year depending on auction cycle. Ongoing lease fees: ~$1–2B/year.
Practical annual average: **$3–5B/year.**

**Rationale:** Spectrum is a public asset owned by all Americans. Privatizing access to
spectrum via licensing is an extraction of a national resource. The Alaska model applies:
resource extraction → public capital. Currently spectrum revenue disappears into the
general fund without creating national wealth.

**Narrative:** "Spectrum — the airwaves that carry your phone signal — belongs to all
Americans. When telecom companies license it, the revenue goes into the national fund."
Very clean public asset narrative.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $3–5B | 4 | 5 | 5 | 5 | **4.6** |

**Status:** High-priority addition. Redirect of existing revenue (no new tax); clear
public asset rationale; excellent narrative; minimal distortion. Recommend adding to
ASF as Stream G.

---

### C-4: Resource Extraction Royalty Enhancement — additional 3% on federal land

**Already included in ASF as Stream C.**

**Revenue:** ~$6–8B/year additional.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $6–8B | 3 | 5 | 4 | 4 | **4.0** |

**Status:** Adopted (ASF Stream C).

---

### C-5: Federal Intellectual Property Royalty — 15% of licensing revenue on federally funded R&D

**Mechanism:** Under the Bayh-Dole Act, universities and companies that receive federal
R&D funding can patent and license the resulting inventions. Currently, the federal
government receives a royalty-free license but no share of commercial licensing revenue.
Amending Bayh-Dole to require 15% of gross licensing revenue on federally funded
inventions to be deposited to ASF.

**Revenue estimate:** Total university technology licensing revenue: ~$3B/year; portion
from federally funded R&D: ~$1.5–2B/year. 15% of $2B = **~$300M/year** near-term.
As more federally-funded technologies are commercialized (especially AI, biotech,
clean energy): potential $500M–1B/year by Year 10.

**Rationale:** Federal funding created the IP; a share of its commercial value belongs
to the public that paid for its creation. Aligns with the Expert Reserve Program
Accelerator model where the government retains IP from accelerator-funded research.

**Narrative:** "When research paid for by taxpayers becomes a commercial product, a
portion of the licensing revenue goes into the national fund." Clear but requires some
policy awareness. Better framing: "When a drug discovered with government money becomes
a best-seller, Americans get a share." Strong with pharmaceutical context.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $300M–1B | 3 | 3 | 3 | 4 | **3.2** |

**Status:** Secondary candidate. Modest revenue but strong principled rationale; pairs
with Expert Reserve Program Accelerator IP provisions.

---

### C-6: National Park and Federal Land Lease Revenue — 25% to ASF

**Mechanism:** 25% of all federal land lease, permit, and recreation fee revenue (BLM,
National Park Service, USFS) deposited to ASF. Currently these revenues go to Treasury
general fund or specific agency accounts.

**Revenue estimate:** Total federal land revenue (fees, leases, permits, recreation):
~$3–5B/year. 25% = **$750M–1.25B/year.**

**Narrative:** "Public lands belong to all Americans. A share of what businesses pay
to use them goes into the national fund." Simple and defensible.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $750M–1.25B | 4 | 5 | 5 | 5 | **4.6** |

**Status:** High-priority addition. Trivial to implement; strong narrative; no new tax.
Small revenue but zero cost and excellent precedent. Recommend bundling with Spectrum
(C-3) into an "All National Assets" provision.

---

## Category D: Automation and Technology Revenue

These specifically target the economic transition driven by AI and automation —
capturing a portion of the productivity gains that automation generates at the expense
of labor and directing them to the citizens displaced by or not participating in that
transition.

---

### D-1: Technology Automation Tax — 0.5% on enterprise software revenue above $1B

**Already included in ASF as Stream A.**

**Revenue:** ~$4–6B/year growing at ~12%/year with software market.

**Narrative:** "The largest software companies pay a small fee for every dollar of
revenue they earn automating away jobs. That money goes into the national fund." Good
connection to AI unemployment scenario.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $4–6B | 3 | 4 | 4 | 4 | **3.8** |

**Status:** Adopted (ASF Stream A).

---

### D-2: AI Training Data Levy — fee on commercial use of large training datasets

**Mechanism:** A per-token or per-record levy on training data used commercially by
AI foundation model developers. Collected at the point of training run registration
(require registration of training runs above a compute threshold, as currently proposed
in various AI governance frameworks).

**Revenue estimate:** Early-stage instrument — training run volumes are growing rapidly
but the measurement and collection mechanism does not yet exist. Placeholder estimate:
**$500M–2B/year** by Year 3–5 as the framework is built.

**Rationale:** The value in large language models and AI systems derives substantially
from human-generated data — text, code, images, professional knowledge. That human
contribution is currently uncompensated. A levy on training data use partially redirects
that value to the public.

**Narrative:** "The AI systems that are reshaping the economy were trained on human
knowledge and creativity. A portion of that debt is paid into the national fund."
Compelling but technically abstract.

**Implementation challenge:** Defining and measuring "training data use" at a commercial
scale is a genuinely novel regulatory challenge. Requires AI governance infrastructure
that does not yet exist. This is a Year 5+ instrument.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $500M–2B | 3 | 2 | 3 | 3 | **2.8** |

**Status:** Forward-looking secondary candidate. Revisit as AI governance framework
develops. Strong principled rationale; implementation is the barrier.

---

### D-3: Robot / Automation Capital Expenditure Surcharge — 2% on qualifying automation CapEx

**Mechanism:** A 2% surcharge on capital expenditure for qualifying automation and
robotics systems by companies with >500 employees. Qualifying expenditure: automated
manufacturing systems, robotic process automation, AI-driven workflow systems. Deposited
to the AI Unemployment transition fund (not ASF — a separate program-specific stream).

**Revenue estimate:** U.S. industrial robot installations: ~50,000/year × ~$150,000
average unit cost = ~$7.5B in robot CapEx/year. 2% = **$150M/year from robotics alone.**
Broader automation CapEx (software-driven automation, RPA): ~$20–30B/year.
2% of $30B = **$600M/year.** Total: **~$750M/year** near-term, growing rapidly.

**Rationale:** Mirrors the Automation Tax Credit concept — creates a financial signal
that the cost of automation includes a contribution to the transition of displaced
workers. Not a penalty large enough to deter automation; a fee large enough to fund
the transition programs it necessitates.

**Narrative:** "Companies that buy robots and AI systems contribute 2% of that purchase
price into the fund that trains the workers they are replacing." Direct and logical
causal chain.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $750M–2B | 3 | 3 | 4 | 5 | **3.8** |

**Status:** Secondary candidate for AI Unemployment program funding specifically.
Different target fund than ASF — builds the AI Unemployment transition account.

---

## Category E: Financial Sector and Investment Revenue

---

### E-1: Systemic Risk Surcharge — annual levy on SIFI balance sheet above $1T

**Mechanism:** An annual 0.15% (15 basis point) surcharge on the total assets of
Systemically Important Financial Institutions (SIFIs) above $1T in total assets. Deposited
50% to ASF, 50% to a dedicated Financial Stability Reserve (FSRIC).

**Revenue estimate:** U.S. SIFIs with >$1T in assets: JPMorgan (~$3.9T), Bank of America
(~$3.3T), Citigroup (~$2.4T), Wells Fargo (~$1.9T), Goldman Sachs (~$1.6T), Morgan
Stanley (~$1.2T), others. Total ~$15T in qualifying assets.
0.15% on $15T = **$22.5B/year.** Split 50/50: **$11B/year to ASF.**

**Rationale:** SIFIs impose systemic risk on the economy — as demonstrated in 2008.
The surcharge prices that risk. Currently, stress testing and capital requirements are
the only mechanisms; the surcharge creates an explicit revenue stream from the risk
externality, used to fund national resilience programs.

**Narrative:** "The largest banks pose a risk to the entire economy. They pay a fee for
that risk, which goes into the national investment fund." Clear and resonant post-2008.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $11B/year | 2 | 3 | 3 | 4 | **3.0** |

**Status:** Secondary candidate. High revenue potential; significant banking lobby
opposition; constitutional and regulatory complexity in defining SIFI scope. Better
political moment: after the next financial crisis.

---

### E-2: Cryptocurrency Transaction Tax — 0.1% on crypto-to-fiat and crypto-to-crypto exchanges

**Mechanism:** A 0.1% tax on all cryptocurrency transactions executed on U.S.-registered
exchanges or by U.S. persons on foreign exchanges (via Form 1099 reporting now required).
Collected at exchange clearing. Deposited to ASF.

**Revenue estimate:** U.S. crypto trading volume: highly variable. At 2024 volumes
($2–4T/year in U.S.-resident trading): 0.1% = **$2–4B/year.** At peak volumes ($10T+):
$10B+.

**Distortion:** Some trading migrates offshore to unregulated exchanges. However, recent
IRS 1099-DA requirements mean U.S. crypto tax reporting infrastructure already exists —
collection is structurally feasible.

**Narrative:** "Cryptocurrency transactions pay the same small fee as any other financial
transaction." Neutral framing — avoids singling out crypto, applies the same logic as
the Financial Transaction Surcharge.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $2–4B | 3 | 3 | 3 | 4 | **3.2** |

**Status:** Secondary candidate. Revenue is meaningful but volatile. Pending crypto
regulation clarity — revisit as regulatory framework stabilizes.

---

## Category F: Government Enterprise and Investment Returns

These capture returns on government-as-investor — equity positions, loan portfolios,
and program returns that currently flow to general fund or are untracked.

---

### F-1: ASF Investment Returns — compounding fund income

**Already the central mechanism.** The ASF's own returns (5.5% blended on growing AUM)
compound from Year 1. By Year 10, annual investment returns (~$60B at base case) dwarf
all external revenue streams combined.

**Not a separate funding stream — it is the fund itself.**

---

### F-2: Strategic Contract Equity Return Recycling

**Mechanism:** Equity positions and royalties acquired through Type B and Type D
strategic contracts generate returns as the companies mature. Rather than depositing
these returns to general fund, they are recycled into ASF Tranche 1 (Strategic Reserve).

**Revenue estimate:** Highly dependent on portfolio performance. If DED acquires equity
stakes in 50+ strategic companies over 15 years, and those companies perform at industry
average (10–15%/year for early-stage strategic investments): **$1–5B/year** by Year 15,
growing as portfolio matures.

**This is not new revenue — it is returns on already-committed DED investments.**
Including it here as a reminder to close the loop: DED strategic contract returns should
flow back to ASF, not disappear into agency operating budgets.

---

### F-3: Federal Loan Portfolio Interest — retained interest from strategic loan programs

**Mechanism:** Interest earned on federal direct lending programs (SBA loans, USDA farm
loans, Export-Import Bank, student loans) currently flows to Treasury. A designated
share — proposed 10% of net interest received — is deposited to ASF.

**Revenue estimate:** Federal direct lending generates ~$40–60B/year in interest receipts.
10% = **$4–6B/year.**

**Political consideration:** Linking student loan interest to ASF funding is politically
mixed — could be attacked as "profiting from student debt." Clean framing: limit to
business lending (SBA, ExIm, USDA commercial) where the profit motive of the borrower
is explicit.

**Narrative:** "A portion of the interest paid on government business loans goes into
the national investment fund. The economy finances itself." Moderate clarity.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $4–6B (business loans only) | 3 | 4 | 5 | 3 | **3.4** |

**Status:** Secondary candidate. Recommend scoping to business and export lending only
to avoid student loan political toxicity.

---

### F-4: Federal Reserve Remittance Allocation — 20% of Fed remittances to Treasury

**Mechanism:** The Federal Reserve remits its profits (operating income minus expenses)
to the U.S. Treasury annually. These remittances have ranged from $5B to $109B/year
depending on interest rates and the Fed's portfolio. A designated 20% of remittances,
when they exceed $30B/year, is deposited to ASF.

**Revenue estimate:** Long-run average Fed remittances ~$50–80B/year in normal rate
environments. 20% of amounts above $30B = **$4–10B/year** on average, $0 in years of
Fed losses.

**Design note:** The remittance cap prevents ASF from being funded by Fed balance sheet
expansion — only genuine operating profit above the baseline feeds the fund. This
prevents perverse incentives.

**Narrative:** "The Federal Reserve earns income managing the nation's money supply.
A share of that income goes into the national investment fund." Specialized knowledge
required; not a public-facing narrative instrument.

| Revenue | Political Practicality | Implementation | Distortion Risk | Narrative Simplicity | **Priority Score** |
|---------|----------------------|----------------|-----------------|---------------------|-------------------|
| $4–10B (avg) | 3 | 4 | 5 | 2 | **3.2** |

**Status:** Secondary candidate. Good revenue in normal rate environments; zero during
Fed loss periods. Useful as a ceiling-funded supplement.

---

## Master Summary Table

| ID | Name | Revenue ($/year) | Political | Implementation | Distortion | Narrative | **Priority** | Status |
|----|------|-----------------|-----------|----------------|------------|-----------|-------------|--------|
| A-1 | Penny Transaction Tax | $2–3B (→$5–8B cashless) | 4 | 4 | 5 | **5** | **4.4** | Evaluate for adoption |
| A-2 | Financial Transaction Surcharge | $17–20B | 3 | 4 | 4 | 3 | 3.8 | **Adopted (Stream B)** |
| A-3 | Cross-Border Transfer Levy | $5–8B | 3 | 3 | 4 | 3 | 3.4 | Secondary |
| B-1 | Consumption Loop (Sales Tax) | $7–10B | 4 | 4 | 5 | 4 | **4.2** | **Adopted (Stream D)** |
| B-2 | Capital Gains Surtax | $5–8B | 3 | 4 | 4 | 3 | 3.6 | **Adopted (Stream E)** |
| B-3 | Estate Tax Enhancement | $8–12B | 3 | 4 | 4 | 4 | 3.8 | **Adopted (Stream F)** |
| B-4 | Carbon Tax / Border Adjustment | $8–15B (border) / $66B (full) | 2–3 | 3 | 4 | 3 | 3.0–3.4 | Aspirational / Border near-term |
| B-5 | Stock Buyback Excise Expansion | $15–22B | 3 | 5 | 3 | 4 | 3.6 | **Add to ASF** |
| B-6 | Wealth Tax | $20–40B | 2 | 2 | 2 | 5 | 2.8 | Long-term aspirational |
| B-7 | Digital Services Tax | $8–15B | 2 | 3 | 3 | 3 | 2.8 | Overlaps TAT; hold |
| B-8 | Data Monetization Tax | $1.75B | 3 | 3 | 4 | 5 | 3.6 | Secondary |
| C-1 | Arms Sales Levy | $17–22B | 3 | 4 | 4 | 3 | 3.6 | **Adopted (primary)** |
| C-2 | Tariff Revenue Share | $16–60B | 4 | 5 | 4 | 4 | **4.2** | **Adopted (primary)** |
| C-3 | Federal Spectrum Revenue | $3–5B | 4 | 5 | 5 | 5 | **4.6** | **Add to ASF** |
| C-4 | Resource Extraction Royalty | $6–8B | 3 | 5 | 4 | 4 | 4.0 | **Adopted (Stream C)** |
| C-5 | Federal IP / Bayh-Dole Royalty | $300M–1B | 3 | 3 | 3 | 4 | 3.2 | Secondary |
| C-6 | National Park / Land Lease | $750M–1.25B | 4 | 5 | 5 | 5 | **4.6** | **Add to ASF** |
| D-1 | Technology Automation Tax | $4–6B | 3 | 4 | 4 | 4 | 3.8 | **Adopted (Stream A)** |
| D-2 | AI Training Data Levy | $500M–2B | 3 | 2 | 3 | 3 | 2.8 | Year 5+ revisit |
| D-3 | Automation CapEx Surcharge | $750M–2B | 3 | 3 | 4 | 5 | 3.8 | AI Unemployment fund target |
| E-1 | Systemic Risk Surcharge (SIFIs) | $11B | 2 | 3 | 3 | 4 | 3.0 | Post-crisis instrument |
| E-2 | Cryptocurrency Transaction Tax | $2–4B | 3 | 3 | 3 | 4 | 3.2 | Pending regulatory clarity |
| F-2 | Strategic Contract Returns | $1–5B | 5 | 4 | 5 | 3 | 4.2 | **Loop — close now** |
| F-3 | Federal Loan Interest Allocation | $4–6B | 3 | 4 | 5 | 3 | 3.4 | Secondary (business loans) |
| F-4 | Fed Remittance Allocation | $4–10B | 3 | 4 | 5 | 2 | 3.2 | Secondary |

---

## Recommended Additions to ASF

Based on this catalog, the following are not yet adopted but score high enough to
recommend adding to the American Sovereign Fund funding stack:

| Addition | Revenue | Why Add |
|----------|---------|---------|
| **A-1: Penny Transaction Tax** | $2–3B now; $5–8B cashless | Highest narrative clarity in the catalog; circulation loop; Year 1 adoption for political value even at low revenue |
| **B-5: Stock Buyback Excise Expansion** | $15–22B | Builds on existing mechanism; strong narrative; high revenue |
| **C-3: Federal Spectrum Revenue** | $3–5B | No new tax; public asset; trivial to implement; excellent narrative |
| **C-6: National Park / Land Lease Share** | $750M–1.25B | No new tax; public asset; pairs with spectrum in "national assets" provision |

**With these additions, ASF total annual contributions (base case):**

| Stream | Revenue |
|--------|---------|
| Arms sales (7.5%) | $17B |
| Tariff revenue (20%) | $16B |
| Technology Automation Tax | $4B |
| Financial Transaction Surcharge | $17B |
| Resource Royalty Enhancement | $6B |
| Consumption Loop (Stream D) | $7B |
| Capital Gains Surtax (Stream E) | $5B |
| Estate Tax Enhancement (Stream F) | $8B |
| Penny Transaction Tax (proposed Stream G) | $2.5B |
| Stock Buyback Excise Expansion (proposed H) | $15B |
| Spectrum + Land Revenue (proposed I) | $4B |
| **Total** | **~$101.5B/year base case** |

With full adoption and mid-case estimates: **$140–160B/year.**
At high case (elevated tariffs, active arms market, mature cashless economy): **$200B+/year.**

---

## Circulation Loop Map

The following diagram shows how the strongest funding instruments connect into
self-reinforcing loops:

```
ECONOMIC ACTIVITY
       │
       ▼
[Penny Tax — $0.01/transaction] ──────────────────────────────────┐
[Sales Tax Loop — 1% state share] ─────────────────────────────┐  │
[Financial Transaction Surcharge — 0.01% large trades] ───────┐│  │
[Arms / Tariffs / Resources / Spectrum] ───────────────────┐  ││  │
                                                           │  ││  │
                                                           ▼  ▼▼  ▼
                                              ┌─────────────────────┐
                                              │  AMERICAN SOVEREIGN │
                                              │        FUND         │
                                              │    ($80–200B/yr in) │
                                              └─────────┬───────────┘
                                                        │
                              ┌─────────────────────────┴──────────────┐
                              │                                         │
                              ▼                                         ▼
                    [MONTHLY DIVIDEND]                    [STRATEGIC RESERVE]
                    Citizens spend ──────┐                DED investment ─────┐
                                         │                                     │
                    [Capital gains on                    [Equity returns &
                     dividend spending] ─┘                 IP royalties] ──────┘
                              │                                         │
                              └─────────────────────────────────────────┘
                                              │
                                              ▼
                                    BACK INTO THE FUND
```

**The ideal DED funding system is not a tax system — it is a circulation system.**
Money moves through the economy, leaves a small trace at each movement, accumulates
into national capital, is distributed back to citizens, moves through the economy again.
The system is self-sustaining at scale; the bigger the economy, the larger the fund;
the larger the fund, the larger the dividend; the larger the dividend, the more
spending; the more spending, the more transactions; the more transactions, the more
the fund receives.

---

## Next Evaluation Steps

The following options are next in queue for full deep-dive analysis:

1. **Penny Transaction Tax (A-1)** — full implementation design, carveout structure,
   cashless migration integration, legislative vehicle
2. **Stock Buyback Excise Expansion (B-5)** — scope definition, transition from IRA
   mechanism, interaction with existing corporate tax
3. **Carbon Border Adjustment (B-4 partial)** — WTO compliance, EU coordination,
   revenue estimate refinement, ASF vs. clean energy split
4. **Data Monetization Tax (B-8)** — definition of qualifying revenue, enforcement via
   existing FTC data broker registry, interaction with privacy legislation

Options below 3.0 priority score (B-6 Wealth Tax, D-2 AI Training Data, B-7 DST) are
held pending political moment or implementation framework development.
