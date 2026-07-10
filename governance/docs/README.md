# Governance

A solo strategy card game played in the browser. Guide your civilization through six competing categories — balance growth, manage instability, and reach 20 points in any one category before it collapses.

---

## How to Play

Open `index.html` in a browser. No server required.

**Turn structure:**
1. Draw 1 card from the deck
2. Play 1 card from your hand
3. Resolve all effects immediately
4. Win/loss is checked after every card played

**Win:** Any category score reaches 20
**Lose:** Any category score falls to 0

**Category score** = 10 (base) + active card value + bonus stack values − instability pile values

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | Game page — open this in a browser |
| `css/style.css` | MTG-inspired dark theme |
| `js/cards.js` | All card definitions + starter deck |
| `js/game.js` | Game engine: state, scoring, rendering, modals |
| `docs/cards.md` | **Primary card tracking file** — edit this to add/balance cards |
| `docs/README.md` | This file |

---

## Categories

| Category | Color | Role |
|----------|-------|------|
| Governance | Blue | Unlocks advanced cards; prerequisite for late-game plays |
| Economy | Gold | Fast growth; generates instability; consumes Environment |
| Culture | Purple | Slow, powerful; difficult to stabilize; strong late game |
| Military | Red | Enables steals and disruption; generates Culture instability |
| Technology | Teal | Mid-game strength; boosts Military; costly to Culture |
| Environment | Green | Resource base; consumed by Economy/Technology; late-game recovery |

---

## Adding Cards

1. Edit `docs/cards.md` — add a row with `🔲 Planned` status
2. Add the card object to the `CARDS` array in `js/cards.js`
3. Add the card `id` to `STARTER_DECK` in `js/cards.js` to include it in play
4. Update `docs/cards.md` status to `✅ Implemented`

---

## Starter Deck (46 cards)

- 5 Governance cards
- 6 Economy cards
- 6 Culture cards
- 4 Military cards
- 4 Technology cards
- 5 Environment cards
- 13 Event cards (negative events, recovery tools, and bonuses)
