# DED Economics: Supply Chain Concentration Risk — Measurement and Pricing

**Category:** Economic Analysis
**Last Updated:** 2026-05
**Related Documents:** `economics/benefits-summary.md` · `economics/historical-baseline.md` · `economics/value-discovery.md`
**Relevant Scenarios:** Rare Earth Denial, Semiconductor Collapse, Shipping Blockade, Oil Restriction
**Status:** Full analysis

---

## Overview

The DED's entire analytical framework rests on the premise that **concentrated supply chains
create geopolitical leverage and economic fragility that markets systematically undervalue**.
This document develops the economic measurement and pricing framework for supply chain
concentration risk — translating qualitative vulnerability assessments into quantitative
expected-value calculations that support the DED investment thesis.

When China controls 85% of rare earth processing, that concentration is simultaneously:
1. A **market risk** (supply disruption probability × disruption cost)
2. A **geopolitical risk** (adversary's ability to weaponize supply → probability of use × cost)
3. An **option value deficit** (the cost of not having domestic alternatives when the crisis occurs)

Current financial markets price none of these correctly. U.S. businesses buy rare earth
inputs at spot prices that embed zero geopolitical risk premium, zero disruption insurance,
and zero option value for domestic alternatives. This systematic underpricing is the market
failure that justifies DED intervention.

---

## 1. Concentration Risk Measurement Framework

### 1.1 Standard HHI Applied to Supply Geography

The Herfindahl-Hirschman Index (HHI) is conventionally used to measure market competition —
the degree to which production is concentrated among a few firms. The DED adapts it to
measure **geographic concentration of production and processing** across countries.

**Geographic Supply HHI:**

```
HHI_geo = Σ (country_share_i)^2 × 10,000
```

Where `country_share_i` is country i's share of global production or processing of the commodity.

**Interpretation (same thresholds as antitrust HHI):**

| HHI Range | Concentration Level | Antitrust Analog |
|-----------|--------------------|--------------------|
| < 1,500 | Unconcentrated — geographically diversified supply | Competitive market |
| 1,500–2,500 | Moderately concentrated — manageable with stockpiles | Moderately concentrated |
| > 2,500 | Highly concentrated — geopolitical leverage exists | Monopolistic |

**Selected Commodity HHI Values (2025 data):**

| Commodity | Top Producer Share | Top 3 Combined | HHI (est.) | Concentration |
|-----------|-------------------|----------------|------------|---------------|
| Rare earth processing | China 85% | ~95% | ~7,400 | Extreme |
| Gallium production | China 80% | ~95% | ~6,500 | Extreme |
| Germanium production | China 60% | ~85% | ~4,000 | Extreme |
| Advanced semiconductor fab (sub-7nm) | TSMC/Taiwan 92% | ~99% | ~8,500 | Extreme |
| Cobalt mining | DRC 70% | ~88% | ~5,100 | Extreme |
| Natural graphite (EV battery grade) | China 65% | ~85% | ~4,500 | Extreme |
| Lithium processing | China 58% | ~82% | ~3,800 | High |
| Pharmaceutical APIs | India+China ~80% | ~85% | ~3,200 | High |
| Commercial shipping chokepoints | Strait of Malacca: 80% of Asia-Pacific volume | N/A | Structural | Extreme |
| Oil production (swing capacity) | OPEC 35% exports; Saudi alone 10% | OPEC 35% | ~1,400 | Moderate |

**Critical observation:** Nearly every commodity on the DED's critical materials list scores in the
"extreme" concentration range. This is not coincidence — decades of cost-optimization offshoring
systematically selected for the cheapest producers, which were frequently single-country
monopolists. The market optimized for unit cost while ignoring concentration risk entirely.

---

### 1.2 DED Concentration Risk Score (CRS)

Geographic HHI alone is insufficient for DED purposes because it treats all concentrated
suppliers equally. China controlling 85% of rare earth processing is qualitatively different
from Australia controlling 85% of iron ore exports. The DED needs a metric that incorporates:

- How much of the concentration is in **adversarial or unstable** countries
- How easily the commodity can be **substituted** if supply is cut
- How much the U.S. is actually **dependent** on imports (vs. domestic production)

**DED Concentration Risk Score formula:**

```
CRS = HHI_geo × ACF × (1 - SUB) × IDF
      ─────────────────────────────────
                 10,000

Where:
  HHI_geo = Geographic supply HHI (0–10,000)
  ACF     = Adversarial Control Fraction (0–1.0)
             Share of global production/processing controlled by nations
             that have demonstrated willingness to weaponize supply
             (China, Russia, and any nation under active U.S. sanctions)
  SUB     = Substitutability Index (0–1.0)
             0 = no substitute exists; 1 = perfect substitute available
             Rare earth magnets in F-35 motors: SUB ≈ 0.05
             Standard steel: SUB ≈ 0.85
  IDF     = Import Dependency Fraction (0–1.0)
             Share of U.S. consumption met by imports
             (1.0 = fully import-dependent; 0 = fully domestic)

Output scale: 0–1.0 (normalized)
  < 0.10 = Low concern
  0.10–0.30 = Moderate concern — monitor
  0.30–0.60 = High concern — stockpile and diversify
  > 0.60 = Critical — emergency pre-positioning required
```

**CRS Values for Key DED Commodities:**

| Commodity | HHI_geo | ACF | SUB | IDF | CRS | Risk Level |
|-----------|---------|-----|-----|-----|-----|------------|
| Rare earth processing | 7,400 | 0.85 | 0.05 | 1.00 | **0.60** | Critical |
| Gallium | 6,500 | 0.80 | 0.10 | 0.98 | **0.46** | High |
| Advanced semiconductors | 8,500 | 0.10* | 0.03 | 0.95 | **0.02** | Low-Moderate† |
| Cobalt | 5,100 | 0.35** | 0.15 | 0.78 | **0.12** | Moderate |
| Graphite (battery grade) | 4,500 | 0.65 | 0.20 | 0.90 | **0.21** | Moderate-High |
| Pharmaceutical APIs | 3,200 | 0.55 | 0.30 | 0.82 | **0.10** | Moderate |
| Natural gas (pipeline) | 1,400 | 0.40*** | 0.60 | 0.10 | **0.003** | Low |

*Taiwan is not adversarial but is under active military threat from adversarial China — separate scenario treatment required.
**DRC is not adversarial but is politically unstable; ACF reflects partial China ownership of DRC mining.
***U.S. domestic gas production is high; IDF is low.

**Advanced semiconductor note:** The CRS formula produces a deceptively low score for
semiconductors because Taiwan is not adversarial (ACF = 0.10). However, China's stated
intent to "reunify" Taiwan transforms an ACF=0.10 into a conditional ACF ≈ 0.90 over a
10–20 year horizon. The semiconductor scenario requires a **threat-conditional CRS** that
models the adversarial takeover probability:

```
CRS_conditional = CRS_base + P(Taiwan adversarial control) × CRS_adversarial_case
CRS_conditional ≈ 0.02 + 0.35 × (8,500 × 0.90 × 0.03 × 0.95 / 10,000)
CRS_conditional ≈ 0.02 + 0.35 × 0.22 ≈ 0.097 → Moderate-High (and rising)
```

This conditional framing reveals why DED investment in domestic semiconductor capacity is
justified now, before the conditional risk materializes — pre-positioning costs 1/5th of
crisis response at any risk level above zero.

---

### 1.3 Converting CRS to Expected Annual Loss (EAL)

The CRS is a dimensionless risk index. To support investment decisions, it must be converted
to a dollar figure. The DED uses **Expected Annual Loss (EAL)**:

```
EAL = Annual Import Value × P(disruption) × Price Impact × Duration Factor × Economic Multiplier

Where:
  Annual Import Value = U.S. annual spending on imports of this commodity (or products containing it)
  P(disruption)       = Annual probability of a supply disruption of 50%+ magnitude
                        Derived from: P = 1 - (1 - P_political)^n × (1 - P_natural)^m
                        where n = # of major chokepoints, m = # of major natural disaster paths
  Price Impact        = Expected price increase × import quantity affected
                        Estimated from historical crisis data (see Section 2)
  Duration Factor     = Expected crisis duration in years
                        Historical median: 1.8 years across DED scenario analogs
  Economic Multiplier = GDP damage / direct commodity cost increase
                        Markets embed ~1.0; DED analysis uses 3–7× based on historical data
                        (supply chain cascade, just-in-time failure, downstream production halt)
```

**EAL Estimates for Key Commodities:**

| Commodity | Annual Import Value | P(disruption/yr) | Price Impact | Duration | Multiplier | **EAL** |
|-----------|--------------------|--------------------|-------------|----------|------------|---------|
| Rare earths (processed) | $3.8B direct; $600B in products | 4% | 5–15× | 2.0 yrs | 5× | **$24–60B/yr** |
| Semiconductors (advanced) | $70B direct; $2.4T in dependent products | 2%* | 3–8× | 2.5 yrs | 4× | **$17–100B/yr** |
| Cobalt | $1.2B direct; $80B in batteries/EVs | 6% | 3× | 1.5 yrs | 3× | **$6–12B/yr** |
| Pharmaceutical APIs | $22B direct; $180B in drugs | 5% | 2× | 1.0 yr | 4× | **$9–18B/yr** |

*2% baseline annual probability for advanced semiconductor denial; threat-conditional P rises to
~7% over a 10-year horizon if Taiwan Strait tensions continue current trajectory.

**Total EAL across DED-priority commodities: ~$56–190B/year**

This is the actuarially correct annual cost of carrying uninsured concentration risk in the
current supply chain structure. The market treats this cost as zero — every buyer pays spot
price as if disruption probability is negligible. The DED's investment case starts here:
**the U.S. is self-insuring a $56–190B/year risk for free, and calling it "free trade."**

---

## 2. Historical Pricing Data — What Markets Missed

The EAL calculation requires price impact estimates. The historical record provides the best
calibration — these are not modeled projections but observed market outcomes.

### 2.1 Rare Earth: 2010 China-Japan Embargo

**Background:** Following a maritime dispute, China halted rare earth exports to Japan in
September 2010. The restriction was informal and lasted ~2 months for direct exports, with
longer effects on processing. China controlled ~97% of global rare earth processing at the time.

**Market response:**

| REE Element | Pre-Embargo Price | Peak Price | Peak Increase | Time to Peak |
|-------------|-------------------|------------|---------------|--------------|
| Cerium oxide | $1.50/kg | $157/kg | **103×** | 14 months |
| Lanthanum oxide | $6/kg | $117/kg | **19×** | 14 months |
| Neodymium oxide | $15/kg | $280/kg | **18×** | 14 months |
| Dysprosium oxide | $65/kg | $2,262/kg | **35×** | 14 months |
| Europium oxide | $440/kg | $5,900/kg | **13×** | 14 months |

**What markets embedded in 2009 REE prices:** Near-zero geopolitical risk premium.
Spot prices reflected only current production costs. No commodity futures market existed
for REEs. No insurance product existed. No government stockpile existed.

**DED lesson:** A 2-month informal export restriction by one country on commodities it
controlled with 97% market share caused 13–103× price spikes that persisted 18+ months.
The U.S. DoD confirmed critical defense programs (F-35, Patriot missile) faced direct supply
risk. Markets had embedded zero probability of this outcome in 2009 prices.

**Baseline disruption cost estimate:** ~$2.5B in direct U.S. import price impact;
~$7–15B in downstream manufacturing disruption and emergency substitution costs.
A comparable event today (China controls ~85% of processing; U.S. now more import-dependent
for finished magnets and NdFeB supply chains) would cost $15–40B.

---

### 2.2 Semiconductors: 2021–2022 Global Shortage

**Background:** COVID-19 demand surge for consumer electronics combined with automotive
sector just-in-time inventory practices created a global semiconductor shortage estimated
at 10–20% below demand across key chip categories. No adversarial action involved —
this was a mild, purely demand-driven shock.

**Market response:**

| Sector | Impact | Duration |
|--------|--------|----------|
| Auto production | ~12M vehicles not produced; $210B revenue loss (global) | 18+ months |
| U.S. auto sector alone | ~3.9M vehicles; ~$70B revenue loss | 18+ months |
| Consumer electronics (global) | ~$50B in delayed production | 12 months |
| Hospital equipment (MRI, monitors) | Months-long delays; unquantified clinical impact | 12+ months |
| Spot chip price premium (certain MCUs) | 3–10× over contract price | 12–18 months |
| **Total global economic impact** | **~$500B** | — |

**What markets embedded in 2019 chip prices:** Near-zero shortage probability.
Automotive OEMs cut chip orders in early 2020 expecting demand collapse; foundries
reallocated capacity to consumer electronics; automotive demand rebounded faster than
expected. Entire crisis was triggered by OEM over-reliance on just-in-time inventory
and a ~10–15% demand imbalance. No geopolitical action required.

**DED lesson:** A 10–15% demand imbalance caused by non-adversarial supply disruption
produced $500B in global losses. A Tier 2 event (Taiwan Strait closure, ASML export denial)
cutting advanced chip supply by 80–90% would produce losses of $2–5T over 2–3 years.
The 2021 shortage is the stress test at 1/8th severity.

**Market failure confirmed:** Advanced chip buyers (Ford, GM, Boeing, Northrop) had
zero hedging instruments, zero strategic inventory requirements, zero alternate-source
contracts. Every buyer was fully exposed to spot price and availability risk.

---

### 2.3 PPE: 2020 N95 Mask Crisis

**Background:** COVID-19 created near-simultaneous global demand for N95 respirators.
U.S. manufacturers had largely offshored production to China; the Strategic National
Stockpile had ~12M masks against a healthcare worker demand of ~300M masks.

**Market response:**

| Metric | Pre-Pandemic | Peak (March 2020) | Change |
|--------|-------------|-------------------|--------|
| N95 wholesale price | ~$0.50–$1.00/mask | $7–$15/mask | **14–30×** |
| Black market/gray market | N/A | $30–$60/mask | **60–120×** |
| Global shortage | N/A | ~2.5B masks (cumulative Q1–Q2 2020) | — |
| SNS reserve at crisis start | 12M N95 (2009 H1N1 stockpile never replenished) | — | — |

**Downstream effects:**
- Healthcare worker COVID infections increased significantly due to reuse/extended use of
  degraded masks
- Hospital systems diverted ICU capacity to staff illness
- State governments bid against each other in open markets, paying 10–30× normal prices
- Federal government seized state purchases, creating political conflict and further market dysfunction

**Market failure confirmed:** No futures or forward market for N95 masks existed. No
mandatory strategic reserve requirement. Production had been 85%+ offshored to China,
which restricted exports in January 2020 before the U.S. declared a public health emergency.

**DED lesson:** A $0.50 commodity with a 5-week demand surge became a $15–60 commodity
because zero strategic inventory existed. The cost of maintaining a 300M-mask rotating reserve
(replacement cost: ~$150M/year) would have eliminated most of the healthcare worker exposure
cost. The actuarially correct annual cost of reserve maintenance vs. the expected crisis
premium: $150M/year prevents $8–15B in emergency procurement costs — a 50–100:1 return.

---

### 2.4 Natural Gas: 2022 European Energy Crisis

**Background:** Russia cut natural gas pipeline flows to Europe by ~80% beginning in
mid-2022 following sanctions over Ukraine invasion. Europe had optimized gas infrastructure
for Russian supply; storage reserves at crisis start were below seasonal average.

**Market response:**

| Metric | Pre-Crisis (2020) | Peak (Aug 2022) | Change |
|--------|------------------|-----------------|--------|
| European TTF gas price | €10–15/MWh | €314/MWh | **20–30×** |
| LNG spot price (Asia-Pacific) | $4–6/MMBtu | $70/MMBtu | **12–18×** |
| German industrial gas price | ~€30/MWh | ~€200/MWh | **7×** |
| German chemical sector output | Baseline | -15% production decline 2022 | — |
| EU GDP impact | Baseline | -1.5 to -2.0% (€250–350B) | — |

**What markets embedded in 2021 European gas contracts:** Near-zero supply cutoff probability.
Long-term supply contracts with Gazprom priced at €20–30/MWh. Storage operators maintained
minimum required reserves. No government held emergency reserves above regulatory minimums.
European industries had no alternative supply contracts because Russian gas was cheaper.

**DED lesson:** A single-supplier dependency of ~40% of European gas needs produced
20–30× price spikes when that supplier weaponized supply. The market had optimized for
the cheapest source with zero adversarial risk premium. German industry, which had built
highly productive value chains around cheap Russian energy, faced permanent competitive
damage as energy prices normalized at 2–4× pre-crisis levels even after the acute crisis passed.

**U.S. application:** The U.S. is the world's largest gas producer and is not gas-import-
dependent. However, the Russia-Europe case is the perfect analog for U.S. rare earth
dependency on China, pharmaceutical API dependency on China/India, and advanced chip
dependency on Taiwan. The market mechanism is identical; only the commodity differs.

---

### 2.5 Pattern Summary: The Systematic Underpricing

Across all four cases, the same pattern holds:

| Crisis | Years of Zero Risk Premium | Disruption Trigger | Price Spike | Recovery Time |
|--------|---------------------------|-------------------|-------------|---------------|
| REE 2010 | 15+ years post-China monopoly formation | Political dispute | 13–103× | 18–24 months |
| Semiconductor 2021 | 10+ years post-Taiwan concentration | Demand imbalance only | 3–10× (spot) | 18 months |
| PPE 2020 | 20+ years post-offshoring | Pandemic demand surge | 14–120× | 6–12 months |
| Natural gas 2022 | 25+ years post-Soviet transition | Geopolitical action | 20–30× | 18–24 months |

**The invariant:** Markets consistently price concentrated supply as if disruption probability
is zero. The duration of zero-premium periods before disruption ranges from 10–25 years.
The price spikes when disruption occurs range from 3× to 120×. In every case, the total
cost of the crisis exceeded the entire cost of pre-positioning reserves and alternatives by
10:1 or more.

This is not a failure of information — market participants knew about the concentration.
It is a structural failure of market incentives: no individual buyer can profitably pre-position
against a shared supply risk. Every buyer rationally free-rides on the assumption that
government or competitors will solve the problem. The DED is the institutional answer to
this coordination failure.

---

## 3. DED Insurance Premium Calculation

### 3.1 Actuarially Fair Premium Framework

An actuarially fair insurance premium for supply chain disruption risk would price:

```
Annual Premium = EAL = Σ [ P(disruption_i) × Cost(disruption_i) × Duration_i ]
```

Using the EAL estimates from Section 1.3 ($56–190B/year), this is what the U.S. economy
*should* be paying annually to self-insure its critical supply chain concentration risk.
Instead, it pays zero — because no one has priced it, structured it, or required it.

**The DED as insurance underwriter:**

DED pre-positioning investments are equivalent to selling insurance at a fraction of actuarially
fair premium, because pre-crisis positioning costs far less than post-crisis response:

| Crisis Mode | Rare Earth Example | Ratio |
|-------------|-------------------|-------|
| Pre-positioned reserve (60-day supply) | ~$1.5B one-time + $200M/year rotation | Baseline |
| Post-crisis emergency procurement | $15–40B in 18 months (10× spike × volume) | 10–20× cost |
| Pre-positioned domestic processing (Phase 2) | $2–4B capital investment | Baseline |
| Emergency domestic production ramp (no capability) | 7–10 years and $15–25B | Impossible in crisis |

**The DED investment thesis stated as an insurance argument:**

The U.S. currently carries ~$56–190B/year in unpriced supply chain concentration risk.
The DED's pre-positioning programs (stockpiles, allied processing capacity, domestic
alternatives) function as insurance policies that reduce this annual expected loss by
40–70%. The premium on that insurance (DED program cost) is approximately:

```
Rare earth scenario DED cost: ~$30B total (stockpile + allied processing + domestic R&D)
Annual amortized: ~$3B/year
Expected annual loss prevented: $10–30B (40–50% of EAL)
Insurance cost ratio: $3B / $20B EAL prevented = 15 cents per dollar of coverage
```

No private insurance market offers supply chain concentration risk coverage at any price —
the risk is non-diversifiable, correlated across all U.S. importers simultaneously, and
subject to adversarial manipulation. The DED is the only institution positioned to offer
this coverage, and it can offer it at 10–20 cents on the dollar of protected value because
pre-positioning is that much cheaper than crisis response.

---

### 3.2 Commodity-Level Insurance Cost Analysis

**Rare Earth Processing:**

| DED Investment Component | Cost | Annual Amortization |
|--------------------------|------|---------------------|
| 90-day strategic reserve (all 17 REEs) | $4B one-time | $400M/yr (10-yr rotation) |
| Allied processing investment (Australia, Canada) — Type B contracts | $5B | $500M/yr (10-yr) |
| Domestic processing R&D + pilot facilities | $3B | $300M/yr |
| REE-free magnet R&D (rare earth-free alternatives IP) | $1B | $100M/yr |
| **Total annual cost** | — | **$1.3B/year** |
| **EAL without DED** | — | **$24–60B/year** |
| **DED mitigation (estimated 50%)** | — | **$12–30B/year prevented** |
| **Insurance cost ratio** | — | **4–11 cents per dollar** |

**Advanced Semiconductors:**

| DED Investment Component | Cost | Annual Amortization |
|--------------------------|------|---------------------|
| Domestic advanced fab (CHIPS++ program) | $90B | $9B/yr (10-yr) |
| Strategic chip inventory mandate (30-day) | $15B rolling | $3B/yr |
| Allied fab capacity (Japan, Netherlands) — Type B contracts | $15B | $1.5B/yr |
| Design IP reserve + open-source toolchain | $2B | $200M/yr |
| **Total annual cost** | — | **$13.7B/year** |
| **EAL without DED (threat-conditional)** | — | **$17–100B/year** |
| **DED mitigation (estimated 40%)** | — | **$7–40B/year prevented** |
| **Insurance cost ratio** | — | **35–200 cents per dollar** |

**Semiconductor note:** The semiconductor insurance cost ratio is higher (and in one scenario
exceeds 1:1) because domestic advanced fab capacity is extremely expensive and serves a
threat-conditional risk. The DED investment is still justified on three grounds:
1. The tail risk (Taiwan adversarial control) is catastrophic and near-zero-cost is incorrect
2. Domestic fabs generate $5–15B/year in commercial revenue, sharply reducing net cost
3. The diplomatic value of non-Taiwan allied capacity (Japan, Netherlands) is substantial
   independent of the insurance function

---

### 3.3 The Pre-Positioning Premium: Why Government Must Act

The market cannot price and sell this insurance for structural reasons:

1. **Non-diversifiable risk:** A rare earth supply disruption affects every U.S. importer
   simultaneously. An insurance company that sold REE disruption coverage would face correlated
   claims across its entire book — the inverse of actuarial diversification.

2. **Moral hazard in collection:** If private REE insurance paid out on a China supply cut,
   China's willingness to cut would increase (knowing it triggers payments, creating political
   leverage pressure on insurers). Adversarial supply disruption is susceptible to moral hazard
   that natural disaster insurance is not.

3. **Option value of alternatives requires collective investment:** Pre-building domestic
   REE processing capacity that sits unused during peace creates option value shared by all
   U.S. importers. No individual buyer can capture enough of this shared value to justify
   unilateral investment — classic public goods problem.

4. **Time horizon mismatch:** Pre-positioning investments have 10–25 year payoff horizons.
   Corporate planning horizons are 3–5 years. No private actor has the time horizon to
   rationally hold the correct amount of supply chain insurance.

The DED resolves all four market failures simultaneously: it is the non-diversifiable risk
pooler, the adversarial-risk-insulated buyer (governments can commit credibly not to pay
adversarial supply cuts with diplomatic concessions), the public goods investor in alternatives,
and the multi-decade institution with the required time horizon.

---

## 4. The Option Value of Domestic Capacity

### 4.1 Domestic Capacity as a Real Option

A real option is the right, but not the obligation, to take an action at a future date.
Domestic manufacturing capacity that can be idle during peacetime but activated in crisis
is precisely a real option — specifically, a **call option** on crisis resilience.

**Option parameters for domestic rare earth processing:**

```
Underlying asset (S): Cost savings from domestic production during a crisis
                      = (crisis spot price - domestic production cost) × annual volume
                      = ($150/kg - $30/kg domestic) × 20,000 tons = $2.4B/year in crisis

Strike price (K):     Cost of maintaining and activating domestic capacity
                      = $800M/year operating + $200M activation
                      = ~$1B/year

Expiry (T):           Time horizon for which the option is valuable
                      = 20 years (until domestic/allied alternatives fully commercialized
                        and Chinese monopoly broken via REE-free magnets)

Volatility (σ):       Price volatility of REE spot markets (historically high: σ ≈ 0.80)
                      High volatility increases option value — the option is worth more
                      when price swings are larger

Risk-free rate (r):   4% (current U.S. Treasury 10-year)
```

**Black-Scholes option value (illustrative):**

Using BSM with S=$2.4B, K=$1B, T=20yr, σ=0.80, r=0.04:

```
d1 = [ln(2.4/1.0) + (0.04 + 0.5 × 0.64) × 20] / (0.80 × √20) = 2.46
d2 = d1 - 0.80 × √20 = 2.46 - 3.58 = -1.12

N(d1) = 0.993; N(d2) = 0.131

Call value = 2.4 × 0.993 - 1.0 × e^(-0.04×20) × 0.131
           = 2.38 - 0.45 × 0.131 = 2.38 - 0.059 ≈ $2.32B/year

20-year NPV of option: $2.32B × [1 - e^(-0.04×20)] / 0.04 ≈ $31.5B
```

**The DED investment in domestic REE processing costs ~$8B over 10 years ($800M/year).
The real option value of that capacity is ~$31.5B NPV — a 3.9:1 ratio before counting
any direct crisis mitigation value.**

This analysis is conservative in two ways:
1. It uses only one crisis period; multiple crises over 20 years multiply the option value
2. It does not count the diplomatic leverage value of U.S.-controlled processing capacity
   (which allied nations will pay for in trade concessions to access)

---

### 4.2 Option Value Even When Never Exercised

A key insight for political messaging: **the option has value even if the crisis never occurs.**

An insurance policy has value even if you never file a claim. The option value is the
reduction in expected loss — the probability-weighted cost of not having the option:

```
Value of domestic capacity option (never exercised) =
  P(crisis) × [Crisis cost without capacity - Crisis cost with capacity]
= 0.20 × [$30B (no capacity) - $5B (with capacity)]
= 0.20 × $25B = $5B expected value

Present value (20-year horizon):
= $5B × [1 - e^(-0.04×20)] / 0.04 ≈ $68B
```

**The domestic capacity is worth ~$68B in expected value even if it is never used.**

This is the correct answer to the political objection "we built all these facilities and
never needed them." Never needing them is the success condition — but the option still had
enormous value, just as unexercised insurance has enormous value to a household that never
burns down.

---

### 4.3 Option Portfolio: Three Domestic Capacity Categories

The DED holds a portfolio of real options across three capacity types:

**Type 1 — Stockpile Options (lowest cost, shortest duration, easiest to value)**
- Physical reserves of critical materials
- Option to draw down at crisis prices vs. paying spot
- Example: 90-day REE reserve = $4B → option value = $8–15B (2× minimum)
- Best for: commodities with stable technology (oil, metals, APIs)

**Type 2 — Processing Capacity Options (medium cost, 10–15 year duration)**
- Domestic or allied processing facilities that can be activated/ramped
- Option to process domestically when adversarial processing is unavailable
- Example: REE processing facility = $3B → option value = $15–30B
- Best for: commodities where processing (not mining) is the concentration point

**Type 3 — Technology Substitution Options (highest cost, longest duration, largest value)**
- R&D programs that develop alternatives eliminating the dependency entirely
- Option to exit the commodity's supply chain entirely
- Example: REE-free magnet program = $1B → option value if successful = $50–200B
  (permanent elimination of REE geopolitical leverage across all platforms)
- Best for: commodities embedded in military and industrial technology stacks

The DED's optimal portfolio holds all three types because they operate on different timescales:
- Stockpile options protect the first 6–24 months of a crisis
- Processing capacity protects months 6–36 and the subsequent 10–15 years
- Technology substitution eliminates the risk entirely on a 15–25 year horizon

---

## 5. Cross-Scenario Concentration Risk Map

This section maps concentration risk scores (from Section 1.2) to DED scenarios to identify
which scenarios are most exposed to market-failure underpricing.

| Scenario | Primary Commodity Exposure | CRS | EAL (annual) | DED Investment Type |
|----------|---------------------------|-----|-------------|---------------------|
| Rare Earth Denial | REE processing, NdFeB magnets | 0.60 (Critical) | $24–60B | All three option types |
| Semiconductor Collapse | Advanced logic chips (Taiwan) | 0.097 conditional | $17–100B conditional | Stockpile + domestic fab |
| Oil Restriction | Crude oil (OPEC swing capacity) | Low (domestic buffer) | $30–80B (Tier 2 event) | SPR stockpile option |
| Pharmaceutical shortage | APIs (China/India) | 0.10 (Moderate) | $9–18B | Stockpile + reshoring |
| Shipping Blockade | Container routing (Malacca/Suez) | Structural — chokepoint | $40–120B (30-day blockade) | Modal redundancy |
| Grid Cyberattack | EHV transformers (GOES steel) | Moderate (US + Korea + Japan) | $50–200B (major event) | Strategic spare reserve |
| Drought | Agricultural inputs, water | Domestic (low concentration risk) | $50–800B (multi-year) | Water infrastructure |
| Pandemic | Pharmaceutical APIs + PPE | 0.10–0.20 | $15–30B/year baseline | SNS + domestic production |

**Key finding:** The highest-concentration-risk scenarios (Rare Earth, Semiconductor) have
the largest economic multipliers when they occur but moderate probability. The lowest-
concentration-risk scenario (Drought) has domestic causes but is highest-probability.
The DED's cross-scenario investment portfolio is correctly diversified across both dimensions.

---

## 6. DED Intervention Triggers: CRS-Based Decision Rules

The CRS measurement framework supports automatic intervention thresholds — pre-defined
rules that trigger DED action without requiring political decision-making in crisis conditions:

| CRS Range | DED Action Required | Congressional Notification |
|-----------|--------------------|-----------------------------|
| < 0.10 | Annual monitoring only; NEID dashboard update | Annual report |
| 0.10–0.20 | Initiate market study; evaluate stockpile options | 90-day report if rising |
| 0.20–0.40 | Activate Type A/B contracts for diversification; begin stockpile build | 30-day notification |
| 0.40–0.60 | Emergency stockpile mandate; allied processing investment; Accelerator program launch | Immediate JCED notification |
| > 0.60 | Full mobilization: stockpile draw authority, domestic processing activation, technology substitution fast-track | Emergency declaration review |

**Advantage of rule-based triggers:** Prevents the political economy failure where DED
investments are cut when prices are low (no visible crisis) and demanded only after prices
have already spiked. The CRS is a leading indicator — it measures structural vulnerability
before the crisis occurs, not after.

**Comparison to current U.S. practice:** The U.S. currently has no systematic CRS-equivalent
measurement for supply chain concentration. The 2021 semiconductor shortage and 2020 PPE crisis
both occurred with zero advance government awareness of the developing CRS increase.
The NEID (National Economic Intelligence Dashboard) is the DED institutional structure
that maintains this measurement and enforces the trigger rules.

---

## 7. Integration with DED Investment Thesis

This document provides the microeconomic foundation for the top-line claims in
`economics/benefits-summary.md`. The chain:

```
1. Markets systematically price supply chain concentration risk at zero
   → Demonstrated in Section 2 (four historical cases)

2. The actuarially correct annual cost of this unpriced risk is $56–190B/year
   → Derived in Section 1.3 (EAL calculation)

3. DED pre-positioning provides this insurance at 10–20 cents per dollar of coverage
   → Demonstrated in Section 3.2 (commodity-level insurance cost)

4. Domestic capacity holds additional option value even if never exercised
   → Quantified in Section 4 (real options analysis; $31–68B NPV examples)

5. CRS-based decision rules prevent the political cycle from undermining the investment
   → Section 6 (trigger framework)
```

**The combined argument:** The U.S. economy currently carries $56–190B/year in uninsured
supply chain risk. The DED reduces that exposure by 40–60% at a program cost of $3–15B/year
per commodity cluster — a 10:1 to 50:1 actuarial return. No private market can provide this
coverage. The DED is not a government cost center; it is the U.S. economy's supply chain
insurance underwriter, providing coverage that does not exist in any commercial market at
any price.

---

## Cross-References

- `ded/economics/benefits-summary.md` — top-line expected value; this document provides
  the microeconomic derivation for the $4.8T–$9.2T Category A benefit estimate
- `ded/economics/historical-baseline.md` — historical loss data; primary source for Section 2
- `ded/economics/value-discovery.md` — Type 3 options (technology substitution) connect
  directly to IP licensing revenue opportunities
- `ded/scenarios/rare-earth-denial/overview.md` — primary application scenario
- `ded/scenarios/semiconductor-collapse/overview.md` — conditional CRS application
- `ded/assets/README.md` — DED Score Optimization Gap dimension uses CRS as input
- `ded/tools/outcome-linked-bonds.md` — inverse crop yield bonds as market-based
  concentration risk pricing mechanism; complements Section 3 insurance framework
- `ded/proposal/mission.md` — NEID infrastructure that maintains CRS measurement
