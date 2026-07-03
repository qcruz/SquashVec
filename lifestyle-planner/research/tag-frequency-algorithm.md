# Tag Frequency Algorithm — Detailed Design

**Last Updated:** 2026-05

The frequency optimization system is the core differentiator of this app.
This doc specifies how it works in detail.

---

## The Core Problem

Most recommendation systems optimize for "more of what you liked."
That breaks down because of **hedonic adaptation**: the same activity produces diminishing returns over time, then recovers after a gap.

The system needs to model a **satisfaction curve over time** for each tag, not a static preference score.

```
Satisfaction with "live_music" over time (stylized):

 4.5 |    *         *         *
     |   * *       * *       * *
 3.5 |  *   *     *   *     *
     | *     *   *     *   *
 2.5 |        * *       * *
     |─────────────────────────── time →
      w1 w2 w3 w4 w5 w6 w7 w8 w9

The dips are saturation. The recoveries are reintroduction.
A naive recommender keeps pushing at w3 and kills the curve.
This system detects the approaching dip and spaces the activity.
```

---

## Data Model

### TagProfile (per user, per tag)

```python
@dataclass
class TagProfile:
    tag: str
    user_id: str

    # Interest scores
    base_interest: float        # 0–1; long-run average; slow-moving
    current_weight: float       # 0–1; adjusted for recency and saturation

    # Activity history (rolling windows)
    completions_7d:  int        # times completed in last 7 days
    completions_30d: int
    completions_90d: int

    shows_30d:    int           # times a card with this tag was shown
    accepts_30d:  int           # times accepted/added to plan
    skips_30d:    int

    # Rating history
    ratings:      list[tuple]   # [(date, rating)] — kept last 90 days
    avg_rating_7d:  float
    avg_rating_30d: float
    avg_rating_90d: float

    # Timing
    last_completed: date | None
    days_since_last: int

    # Derived state
    saturation_level: str       # "none" | "mild" | "moderate" | "high"
    optimal_interval_days: float  # how often this tag should appear
    reintroduction_boost: float   # 0–1 temporary boost when re-introducing

    # Population benchmarks (aggregated from all users, anonymized)
    population_avg_interval: float   # average days between for people who like this tag
    population_saturation_threshold: int  # typical completions before ratings drop
```

---

## Algorithm: Computing `current_weight`

`current_weight` is what the planner actually uses when ranking candidate activities.

```python
def compute_weight(profile: TagProfile) -> float:
    w = profile.base_interest   # start from long-run preference

    # 1. Recency penalty — recent overuse reduces weight
    recency_factor = recency_penalty(profile)
    w *= recency_factor

    # 2. Reintroduction boost — if gap > optimal interval, boost
    gap_factor = gap_boost(profile)
    w = min(1.0, w + gap_factor)

    # 3. Saturation penalty — ratings trending down → reduce weight further
    saturation_factor = saturation_adjustment(profile)
    w *= saturation_factor

    # 4. Cross-tag interactions (see below)
    # (applied at planning time, not stored in TagProfile)

    return max(0.05, min(1.0, w))   # clamp; never fully suppress a tag
```

### Recency Penalty

```python
def recency_penalty(p: TagProfile) -> float:
    """
    Penalize tags that have been shown/completed too recently relative
    to their optimal interval.
    """
    if p.days_since_last is None:
        return 1.0   # never done → no penalty

    ratio = p.days_since_last / p.optimal_interval_days

    if ratio >= 1.0:
        return 1.0   # at or past optimal interval → no penalty
    elif ratio >= 0.7:
        return 0.85  # slightly early → mild penalty
    elif ratio >= 0.4:
        return 0.65  # noticeably early
    else:
        return 0.4   # very recent → strong reduction
```

### Gap Boost

```python
def gap_boost(p: TagProfile) -> float:
    """
    When an activity hasn't appeared in a while, boost it back.
    Based on 'reintroduction effect' in hedonic adaptation literature.
    """
    if p.days_since_last is None:
        return 0.2   # new tag → mild boost (novelty)

    ratio = p.days_since_last / p.optimal_interval_days

    if ratio < 1.0:
        return 0.0   # not due yet
    elif ratio < 1.5:
        return 0.05  # slightly overdue
    elif ratio < 2.5:
        return 0.15  # noticeably overdue — bump it up
    else:
        return 0.25  # long gap — strong reintroduction push
```

### Saturation Adjustment

```python
def saturation_adjustment(p: TagProfile) -> float:
    """
    Detect if ratings are declining (adaptation happening).
    Reduce weight proportionally to how fast ratings are falling.
    """
    if p.avg_rating_30d == 0 or p.avg_rating_90d == 0:
        return 1.0

    rating_trend = p.avg_rating_30d - p.avg_rating_90d  # negative = declining

    if rating_trend >= -0.2:
        return 1.0       # stable or improving
    elif rating_trend >= -0.5:
        p.saturation_level = "mild"
        return 0.80
    elif rating_trend >= -0.9:
        p.saturation_level = "moderate"
        return 0.60
    else:
        p.saturation_level = "high"
        return 0.35      # significantly reduced but not zero
```

---

## Algorithm: Updating `optimal_interval_days`

The optimal interval is not fixed — it's learned per user.

```python
def update_optimal_interval(p: TagProfile):
    """
    Find the inter-completion interval that correlates with highest ratings.
    Runs weekly.
    """
    if len(p.ratings) < 6:
        # Not enough data — use population benchmark
        p.optimal_interval_days = p.population_avg_interval
        return

    # Build (gap_before_completion, rating) pairs from history
    pairs = []
    sorted_completions = sorted(p.completion_history, key=lambda x: x.date)
    for i in range(1, len(sorted_completions)):
        gap = (sorted_completions[i].date - sorted_completions[i-1].date).days
        rating = sorted_completions[i].rating
        if rating is not None:
            pairs.append((gap, rating))

    if len(pairs) < 3:
        return

    # Bin gaps into buckets: 1–3d, 4–7d, 8–14d, 15–30d, 30d+
    buckets = {
        "1-3":   [r for g, r in pairs if 1  <= g <= 3],
        "4-7":   [r for g, r in pairs if 4  <= g <= 7],
        "8-14":  [r for g, r in pairs if 8  <= g <= 14],
        "15-30": [r for g, r in pairs if 15 <= g <= 30],
        "30+":   [r for g, r in pairs if g > 30],
    }

    # Find the bucket with the highest average rating (min 2 samples)
    best_bucket = max(
        ((k, sum(v)/len(v)) for k, v in buckets.items() if len(v) >= 2),
        key=lambda x: x[1],
        default=None
    )

    if best_bucket:
        bucket_midpoints = {"1-3": 2, "4-7": 5, "8-14": 11, "15-30": 22, "30+": 35}
        p.optimal_interval_days = bucket_midpoints[best_bucket[0]]
```

---

## Algorithm: Balance Enforcement

Even with optimal per-tag weights, the planner can drift toward one dimension.
A weekly balance check enforces the six-dimension framework.

```python
DIMENSION_TARGETS = {
    "physical_active":  (3, 5),     # (min_days_per_week, max_days_per_week)
    "outdoor":          (3, 6),
    "social":           (2, 5),
    "novel":            (1, 3),
    "creative":         (1, 4),
    "calm":             (2, 4),
}

def get_balance_nudges(weekly_summary: dict) -> list[str]:
    """
    Returns dimension keys that should be boosted this week.
    These override tag weights at planning time.
    """
    nudges = []
    for dim, (min_d, max_d) in DIMENSION_TARGETS.items():
        actual = weekly_summary.get(dim, 0)
        if actual < min_d:
            nudges.append({"dimension": dim, "direction": "boost", "deficit": min_d - actual})
        elif actual > max_d:
            nudges.append({"dimension": dim, "direction": "suppress", "excess": actual - max_d})
    return nudges
```

When `nudges` contains `{"dimension": "outdoor", "direction": "boost"}`, the planner prompt is modified:

```
[balance injection into planner prompt]
"This week the user has had only 1 outdoor activity (target: 3–5).
Prioritize outdoor or nature-adjacent options today even if slightly
below their top preference tags."
```

---

## Algorithm: Cold Start

New users have no history. Strategy:

**Week 1:** Use population averages for the city as weight priors. Treat every completion as a strong signal (high learning rate). Run the optimal_interval update after every 3 completions.

**Week 2–4:** Transition from population priors to personal data using a weighted blend:
```
weight = population_prior * (1 - blend) + personal_estimate * blend
blend = min(1.0, completions_for_tag / 8)
```

**After 30 days:** Fully personalized. Population data only used as a sanity check.

---

## Population-Level Insights (Cross-User)

Anonymized aggregate data enables:

1. **Default optimal intervals** — "Most people with 'live_music' interest enjoy it 2–3x/week"
2. **Saturation thresholds** — "Hiking ratings typically start declining after 5 consecutive weeks"
3. **Seasonal patterns** — "Outdoor activity weight should increase for Austin users in Oct–Nov and Feb–Mar (best weather windows)"
4. **Cross-tag synergies** — "Users who do 'yoga' and 'hiking' in the same week tend to rate both higher than when they do either alone"
5. **Day-of-week patterns** — "Saturday morning market scores 0.3 higher than Tuesday morning market for the same venue"

These feed into the prior distributions for new users and the balance enforcement targets.

---

## What Gets Stored Per Event Completion

```python
CompletionRecord {
    user_id:       str
    card_id:       str
    tags:          list[str]
    balance_dims:  dict          # {"physical": "active", "social": "solo", ...}
    date:          date
    day_of_week:   str
    time_block:    str           # morning / afternoon / evening
    weather:       str           # sunny / cloudy / rain (from weather API)

    # User state at time of activity
    readiness_score:  float | None   # from wearable, 0–100
    morning_mood:     int | None     # 1–3 from morning tap

    # Outcome
    rating:           int | None     # 1–5 stars, if given
    skip_reason:      str | None     # if not completed after being planned
    completion_flag:  bool           # was it actually done?

    # Gap since last same-tag activity
    days_since_last_same_tag: int | None
}
```

This is the training data for the frequency model. Every row is a data point telling us: "at this gap, in this weather, with this energy, this type of activity got this rating."

---

## Example: Full Tag Profile for a User at 90 Days

```
Tag: "live_music"
  base_interest:      0.82       (strong interest, stable over 90 days)
  current_weight:     0.74       (mild recency penalty — went last Thursday)
  completions_7d:     1
  completions_30d:    6
  avg_rating_7d:      3.5        (slightly below 90d avg → mild saturation signal)
  avg_rating_90d:     4.1
  days_since_last:    3
  optimal_interval:   4.5 days   (learned: user rates highest after 4–5 day gaps)
  saturation_level:   "mild"

  → System will not suggest live music in the next 1–2 days.
    Will boost it on Day 5 with a gap_boost of +0.10.

Tag: "hiking"
  base_interest:      0.70
  current_weight:     0.91       (boosted — hasn't hiked in 12 days, optimal is 7)
  days_since_last:    12
  avg_rating_30d:     4.5
  reintroduction_boost: 0.22

  → Hiking will appear prominently in this weekend's itinerary.
    Planner note: "You haven't hiked in almost two weeks."

Tag: "gaming"
  base_interest:      0.55
  current_weight:     0.28       (high saturation — 8 gaming sessions in 30 days)
  saturation_level:   "high"
  avg_rating_30d:     2.8        vs avg_rating_90d: 3.9

  → Gaming suppressed for 2–3 weeks. Will reintroduce as a suggestion
    after gap with expected rating recovery.
    Balance flag: "indoor sedentary" dimension high — outdoor nudge active.
```
