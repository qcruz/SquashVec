# Claude Instructions — Governance Project

## Before Adding Any Game Content

**Always read these files before making changes:**

1. `docs/design.md` — authoritative design rules and card anatomy requirements
2. `docs/cards.md` — master card list with all current cards and their status

Verify that any proposed change is consistent with both documents before writing code.

---

## Rules for Adding Cards

> **No card may be added to or modified in `js/cards.js` without explicit owner confirmation.**
> New card ideas go to `docs/planned-cards.md` first. Cards are reviewed and approved before implementation.

All new cards must conform to the following (from `docs/design.md`):

- **All cards have exactly two play options.** No card may have one or zero options. Both options must be meaningfully different.
- **All cards have one or two discard options.** These define where the card goes when removed from play — not when it is played.
- **Discard is chosen at removal time**, not at play time. Never show a discard modal when a card is played; only when a card leaves play.
- **Category cards**: one active per category at a time. Playing a new one replaces the current active.
- **Event cards**: resolve immediately; may stack on active category cards (adding to score), go to instability (subtracting from score), or produce utility effects.
- **Environment category cards** must use geographic location names (The Great North, The Union, Oceana, The Waterlands, The Highlands, etc.). No specific resources or landmarks.
- **All effects resolve immediately.** No delayed or ongoing triggered abilities.

---

## Rules for Changing Game Mechanics

> **All additions to game rules and design must be confirmed by the owner before implementation.**

If a user message requests a mechanical change that is not already in `docs/design.md`:

1. Propose the change in plain language.
2. Ask for explicit confirmation before writing any code.
3. After confirmation, update `docs/design.md` first, then implement in code.
4. Update `docs/cards.md` to reflect any new or changed cards.

Do not implement unconfirmed mechanics, even if they seem like natural extensions of existing rules.

---

## Rules for Code Changes

- Implement only what has been confirmed by the owner.
- Do not add cards to `js/cards.js` or `STARTER_DECK` without first updating `docs/cards.md`.
- Do not rename or remove existing cards without owner confirmation.
- After any significant change, commit and push to the remote for review before continuing.

---

## Project Structure

```
governance/
├── index.html          Game entry point (open in browser, no server needed)
├── css/style.css       MTG-inspired dark theme
├── js/
│   ├── cards.js        Card definitions + STARTER_DECK
│   └── game.js         Game engine: state, scoring, render, modals
├── docs/
│   ├── design.md       ← Authoritative design rules (read before any changes)
│   ├── cards.md        ← Master card list (primary tracking artifact)
│   └── README.md       Project overview and file guide
└── CLAUDE.md           ← This file
```

---

## Summary Checklist Before Any Change

- [ ] Read `docs/design.md`
- [ ] Read `docs/cards.md`
- [ ] Confirm proposed change aligns with design rules
- [ ] If it's a new rule or mechanic: get owner confirmation first
- [ ] Update docs before or alongside code changes
- [ ] Commit and push after completing any batch of changes
