# DED Economics — Assumptions Log

**Purpose:** Transparent record of every key assumption used in benefits-summary.md, with rationale, confidence level, and update triggers.
**Last Updated:** 2026-05

Good policy analysis requires explicit assumptions. When assumptions change — because new data emerges, because a scenario is reclassified, or because historical events provide better calibration — this log is updated and the benefits summary is revised accordingly.

---

## Confidence Rating Scale

| Rating | Meaning |
|--------|---------|
| High | Well-supported by multiple historical precedents; uncertainty range <2× |
| Medium | Supported by some data and reasonable analogy; uncertainty range 2-5× |
| Low | Primarily expert judgment or extrapolation; uncertainty range 5-10× |
| Speculative | Limited data; order-of-magnitude estimate only |

---

## Scenario Probability Assumptions

### Methodology
Probabilities represent the estimated likelihood of a scenario reaching Tier 2 or higher severity within a 10-year window. They are informed by:
- Historical frequency of comparable events
- Current trend direction (increasing or decreasing)
- Structural factors (geopolitical concentration, climate trajectory, infrastructure age)
- Expert consensus where available (IPCC, ODNI Worldwide Threat Assessment, DHS Annual Risk Assessment)

| Scenario | Assumed 10-yr Probability | Confidence | Basis | Last Reviewed |
|----------|--------------------------|------------|-------|---------------|
| Pandemic (Tier 2+) | 30% | Medium | COVID is 1 event in ~100 years at Tier 1; Tier 2 is rarer but climate change, antimicrobial resistance, and global travel increase base rate; ODNI cites pandemic as top global threat annually | 2026-05 |
| Drought (severe, multi-year) | 50% | Medium-High | IPCC AR6 projects increased drought frequency and intensity in U.S. Southwest and Midwest; Colorado River is already in a 20+ year mega-drought; NOAA Palmer Drought Severity Index shows 2 of last 10 years as severe | 2026-05 |
| Oil Restriction (25%+ cut, Tier 2) | 20% | Medium | U.S. imports ~6 Mbbl/day; multiple supply disruption vectors (Middle East conflict, OPEC+ coordination, sanctions); 1973 and 1979 provide historical base rates; shale revolution reduces but doesn't eliminate vulnerability | 2026-05 |
| Grid Cyberattack (major, multi-region) | 25% | Medium | CISA and DOE both assess grid attacks as near-certain at some level; question is magnitude; Volt Typhoon pre-positioned malware (2024) on U.S. critical infrastructure demonstrates current threat; 25% for a major event is conservative | 2026-05 |
| Semiconductor Collapse (Tier 2+) | 15% | Low-Medium | TSMC concentration (90% of advanced chips); Taiwan Strait geopolitical risk assessed at 10-20% by most analysts over 10 years; ASML EUV monopoly; 15% is the geopolitical risk estimate plus supply chain disruption probability | 2026-05 |
| Rare Earth Denial (significant restriction) | 20% | Medium | China controls 60-85% of processing for most rare earths; demonstrated willingness to weaponize (2010 Japan incident); U.S.-China trade tension trajectory; 20% reflects an escalation scenario, not a full denial | 2026-05 |
| Shipping Blockade (major chokepoint) | 15% | Low-Medium | Houthi attacks (2024) demonstrated feasibility and willingness; Taiwan Strait and Strait of Hormuz are the high-consequence cases; both have low base rates but are not negligible given geopolitical trends | 2026-05 |
| Financial Fragmentation (significant dollar erosion) | 25% | Low | BRICS currency discussions, CIPS expansion, commodity non-dollar trades are occurring but slow-moving; 25% reflects partial fragmentation (not dollar collapse but meaningful erosion of reserve share from 59% to 40-45%) over 10 years | 2026-05 |
| AI Unemployment (severe disruption, >15% displacement) | 65% | Low-Medium | Goldman Sachs (2023): 300M jobs globally exposed; McKinsey (2023): 40-50% of work tasks automatable; historical technology transitions suggest 65% probability of severe labor market disruption within 10 years is conservative rather than aggressive | 2026-05 |

---

## Unmitigated Loss Estimates

### Methodology
Unmitigated loss = estimated total economic cost of the scenario if it occurs without DED preparation. Includes:
- Direct damage and lost output
- Supply chain cascade multiplier (typically 2-4× direct losses)
- Government emergency response costs
- Does NOT include long-run transition costs (post-crisis recovery treated separately)

| Scenario | Assumed Loss | Confidence | Primary Basis | Scale Adjustment from Historical |
|----------|-------------|------------|---------------|----------------------------------|
| Pandemic (Tier 2) | $8T | Medium | COVID-19 actual: $7.9T (CBO 10-yr GDP) to $16T (Fed NY); Tier 2 is comparable to COVID in scale | 1:1 analog to COVID; Tier 2 uses $8T mid-point |
| Drought (severe, multi-year) | $800B | Medium | 2012 = $77B; multi-year Tier 2 affects both Corn Belt and California simultaneously for 3+ years; 10× scale is conservative | 10× single-season event; supported by RAND 2023 Southwest drought projections |
| Oil Restriction (25%+) | $3.5T | Low-Medium | 1973 embargo (7% cut, 1 year) = ~$600B (2026$); 25% cut for 2 years = 3.5× severity × 2× duration = 7× → ~$4.2T; discounted to $3.5T for partial domestic offset | Multi-year scaling of 1973 event |
| Grid Cyberattack (major) | $1.2T | Low-Medium | 2003 blackout (2 days, 55M people) = $8B; EHV transformer attack scenario = 18 months × 70% population = ~400× 2003 event → $3.2T; discounted by 60% for partial functionality maintained | FERC classified study indirect; scaled from 2003 event |
| Semiconductor Collapse | $2.8T | Low | 2021-22 shortage (Tier 1, 15% supply cut) = $500B; Tier 2 (80-90% advanced chip supply cut) = 5-6× over 2-3 years = $2.5-3T | Scaled from 2021-22 shortage magnitude × supply cut ratio |
| Rare Earth Denial | $600B | Low | No direct U.S. historical analog; Japan 2010 rare earth restriction provides partial data (~$3B direct for Japan); U.S. scale and broader application implies 200× Japan event | Extrapolation from Japan 2010 + downstream dependency mapping |
| Shipping Blockade | $1.5T | Low | 2021 Suez Canal blockage (6 days) = ~$10B/day global; sustained chokepoint closure at Hormuz or Taiwan Strait = 2+ years of partial disruption → $1-2T range | Suez per-day rate × duration scaling |
| Financial Fragmentation | $4T | Speculative | 2008 crisis (domestic trigger) = $13T 10-yr GDP gap; partial dollar fragmentation is less severe but still structural; $4T represents 30% of 2008 magnitude for a less-acute but more persistent event | Fraction of 2008 event; high uncertainty |
| AI Unemployment (severe) | $1.2T | Low-Medium | Historical tech transitions (agricultural mechanization, manufacturing offshoring): 5-15 year GDP gaps in affected sectors; 40% labor force disruption at 10% income impact for 3 years = ~$2T; DED programs (safety net, retraining) compress this; $1.2T is post-DED partial scenario | Historical tech transition data; BLS occupational exposure estimates |

---

## DED Mitigation Effectiveness Assumptions

### Methodology
Mitigation percentage = fraction of unmitigated losses that DED programs prevent or reduce. This is the most uncertain parameter in the model. Calibration uses:
- Historical comparison of prepared vs. unprepared responses to similar events (e.g., countries with better pandemic preparedness had shorter economic disruptions)
- Logic model: which specific programs prevent which specific losses
- Expert judgment on implementation quality

| Scenario | Assumed Mitigation | Confidence | Primary Mechanism |
|----------|-------------------|------------|-------------------|
| Pandemic | 50% | Medium | SNS rebuild prevents healthcare collapse (30%); paid sick leave improves compliance (10%); essential worker framework prevents supply cascade (10%) |
| Drought | 55% | Medium | Water management prevents aquifer collapse (20%); grain reserve smooths supply shock (15%); crop diversification reduces yield loss (10%); early warning reduces response lag (10%) |
| Oil Restriction | 45% | Medium | Demand reduction programs (15%); SPR drawdown bridge (10%); renewable buildout reduces dependency (20%) |
| Grid Cyberattack | 60% | Low-Medium | Transformer reserve dramatically reduces outage duration (40%); hardened controls reduce cascade (10%); pre-built recovery plan reduces restoration time (10%) |
| Semiconductor Collapse | 40% | Low | Domestic capacity provides partial fallback (20%); design-for-resilience reduces critical-only dependency (10%); stockpile bridge (10%) |
| Rare Earth Denial | 50% | Medium | Domestic processing + allied diversification (30%); substitution research (10%); stockpile (10%) |
| Shipping Blockade | 35% | Low | Inland alternatives partly absorb (15%); domestic inventory buffers (10%); allied re-routing (10%) |
| Financial Fragmentation | 30% | Speculative | Dollar defense through energy policy and ally coordination (15%); financial system resilience tools (10%); SWIFT alternative development (5%) |
| AI Unemployment | 40% | Low-Medium | Safety net prevents extreme displacement (15%); retraining channels workers to new sectors (15%); productivity dividend policy distributes gains (10%) |

---

## Program Cost Assumptions

### Methodology
Program costs use:
- Direct federal program cost estimates (legislative, CBO scoring, OMB estimates where available)
- Engineering estimates for infrastructure programs (unit costs × scale)
- Historical precedents (SNS cost, SPR cost, CHIPS Act cost) as calibration anchors

| Program | Cost Estimate | Confidence | Basis |
|---------|--------------|------------|-------|
| SNS full rebuild (PPE + medications) | $50B one-time | High | Actual SNS FY costs + gap to 180-day target |
| SPR rebuild (370M to 700M barrels) | $24B | High | ~$80/barrel average × 330M barrels |
| Domestic rare earth processing | $5B | Medium | Industry estimates for Lynas-scale processing facility × 3 facilities |
| Nuclear life extension (existing fleet) | $50B over 5 yrs | Medium | Industry cost benchmarks; ~$500-800M/reactor for major refurbishment |
| Emergency permitting reform | <$500M (legislative) | High | Agency cost; no capital required |
| Universal broadband | $80B | Medium | NTIA BEAD program + remaining gap estimates |
| GOES second facility | $2B | Medium | Steel industry capital cost benchmarks for specialty mill |
| Grid transformer strategic reserve | $10B | Medium | ~200 EHV transformers × $30-50M each |
| Pharmaceutical API reshoring (top 50) | $30B | Medium | FDA facility cost benchmarks; includes purchase guarantee fund |
| Agricultural extension expansion | $5B over 10 yrs | High | USDA extension budget history; workforce cost |
| Strategic grain reserve | $10B/year | Medium | Elevator contract cost benchmarks; logistics |
| Skilled trades apprenticeship expansion | $15B | Medium | Dept. of Labor apprenticeship program cost benchmarks |
| CDL training program | $5B | High | Existing CDL program costs; scale × target |
| Paid sick leave (federal backstop) | $15-20B/year | Medium | CBO small employer mandate scoring analogs |

---

## Assumptions to Flag for External Review

The following assumptions are most consequential and most uncertain. External expert review recommended before any formal Congressional budget submission:

1. **Pandemic 30% probability** — Should be reviewed by CDC, NIH pandemic risk assessment team. Post-COVID, some analysts argue higher; some argue COVID was a once-in-50-year event.

2. **Grid cyberattack $1.2T loss** — The FERC 2014 classified study on EHV transformer attacks has never been publicly released. This estimate is derived from scaling public data. The actual classified estimate should inform this number.

3. **DED mitigation effectiveness (all scenarios)** — These percentages are the most analytically uncertain numbers in the document. A proper effectiveness analysis would use agent-based modeling with historical analogs. RAND Corporation, CNA, and CSIS have conducted comparable analyses for defense programs.

4. **AI unemployment 65% probability** — The broadest range of analyst opinion; some economists argue technology transitions are absorbed without mass permanent unemployment; others argue AGI creates a structurally different labor market. This assumption is the most contested.

5. **Financial fragmentation $4T loss** — There is no close historical analog for a partial reserve currency erosion scenario. This is the most speculative number in the model and should be treated with the widest error bars.

---

## Review Schedule

| Review Type | Frequency | Trigger |
|------------|-----------|---------|
| Probability estimates update | Annually | ODNI Worldwide Threat Assessment publication (Feb/Mar); IPCC reports |
| Loss estimate update | When events occur | Any real-world event in a DED scenario category |
| Program cost update | Biennially | OMB capital cost indices; industry benchmark updates |
| Full assumptions audit | Every 3 years | Or when total expected benefit estimate changes by >20% |
| External peer review | Every 5 years | Recommend RAND, CBO, or comparable institution |
