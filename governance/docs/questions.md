# Governance — Open Design Questions

Answer these when ready. Each confirmed answer should be reflected in `docs/design.md` and implemented in code.

---

- [x] Should stacked event cards stay in place when the active category card is replaced, or be cleared?
  **Answer:** Stacks persist. Replacing an identity does not clear the event stack — the new identity becomes the new foundation and existing stacked events remain. Identity card resource costs remove the **oldest** resource from the cost category (not newest), making upgrades feel meaningful without double-penalizing built stacks.
- [x] Should there be a maximum hand size?
  **Answer:** No enforced maximum. Hand pressure is created organically by discard-forcing event cards (Social Upheaval, Criminal Conspiracy, Military Exercise, etc.). Holding a large hand is a calculated risk — cards like Social Upheaval can wipe the hand entirely. Most cards are designed to be played quickly; extended holds are a deliberate strategy (e.g. military surprise plays). Future card design should continue to include discard-forcing events as the primary mechanism for hand discipline.
- [x] Should event stacks have a maximum size per category?
  **Answer:** No cap. Large, complex stacks are the goal. The game is designed as a Jenga-like civilization builder — resources and instabilities accumulate over time in careful balance, requiring more and more synergies to sustain. A sudden hazard or political shift can cascade dramatically (e.g. a military-dominant society pivoting to an education-focused one). Instabilities should always be slowly building; synergy between active identity and event cards is the primary management mechanism. See design.md — Synergy Design and Long Game sections.
- [x] Should the "draw 1 card" bonus on Democracy's discard option remain?
  **Answer:** Yes — keep it. Cultural instabilities are the hardest to remove in the deck (fewest removal options by design), so accepting one is a meaningful sacrifice. The draw card is the correct material compensation. This mechanic may expand to other cards: accepting a hard-to-remove instability in exchange for a card draw is a valid design pattern. Thematically: democracy's knowledge becoming a cultural instability represents the social cost of retained free knowledge — the draw card is that knowledge.
- [x] Are there planned multiplayer rules changes that affect card options?
  **Answer:** Every card option must be playable in solo — no `multiplayer_only` dead options. Cards intended for multiplayer (Surprise Attack, Occupation, etc.) will have effects worded so that the solo interpretation is meaningful on its own. In multiplayer, military disruption cards affect opponent stacks; in solo, they have an equivalent self-affecting cost/benefit. The `multiplayer_only` effect has been removed from all cards and should never be used going forward.
- [x] Should Alliance have different mechanics in multiplayer vs. solo?
  **Answer:** Alliance is being redesigned from a Governance identity card into a special Governance stacking event (+2) that anchors a synergy network. Other cards (Free Trade Agreement, etc.) check whether Alliance is in any stack and become stronger or cheaper when it is. This is the foundation of a "diplomacy/coalition" card family.
  - **Alliance (redesigned):** Value +2, Governance event. Opt 1: Pay oldest Culture resource → stack on Governance. Opt 2: Remove 1 Military instability → shuffle self into deck. Discard: Governance or Culture instability.
  - **Free Trade Agreement (new):** Value +1, Economy event. Opt 1: If Alliance in any stack → stack on Economy for free; otherwise pay oldest Governance resource → stack on Economy. Opt 2: Swap any Technology resource in play with oldest Economy resource → shuffle self into deck. Discard: Governance or Military instability.
  - **Implementation needed:** New `card_in_stack` condition type in `checkCondition` (similar to existing `card_in_instability`). Current Alliance identity card in cards.js must be removed or replaced. Requires owner confirmation before code changes.
