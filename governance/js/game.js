// Governance — Game Engine (Solo Mode)
// Design rules: docs/design.md | Card list: docs/cards.md

const CATEGORIES = ['governance', 'economy', 'culture', 'military', 'technology', 'environment'];
const BASE_SCORE = 10;
const WIN_SCORE = 20;
const LOSE_SCORE = 0;
const HAND_SIZE = 5;

const CAT_COLORS = {
  governance: '#4a90d9', economy: '#c8a000', culture: '#9b59b6',
  military: '#c0392b', technology: '#1abc9c', environment: '#27ae60',
};
const CAT_ICONS = {
  governance: '⚖', economy: '⚙', culture: '🎭',
  military: '⚔', technology: '🔬', environment: '🌿',
};

// ─── State ────────────────────────────────────────────────────────────────────

let G = null;

function newGameState() {
  const deck = buildDeck(STARTER_DECK);
  const hand = [];
  for (let i = 0; i < HAND_SIZE; i++) { if (deck.length) hand.push(deck.shift()); }

  const categories = {};
  CATEGORIES.forEach(cat => {
    categories[cat] = {
      active: null,       // one category card at a time
      stack: [],          // event cards stacked here (add to score)
      instability: [],    // cards here subtract from score
    };
  });

  return {
    deck, hand, categories,
    turn: 1,
    log: [],
    pendingAction: null,
    selectedCardIndex: null,   // index into G.hand (play mode)
    selectedOption: 0,
    viewingCard: null,         // { card, location } for inspecting in-play cards
    mustPlayEventId: null,     // instanceId of event drawn on pass — must play before turn ends
    endTurnAfterResolve: false,// set when an option that ends the turn was played
  };
}

function buildDeck(ids) {
  const deck = ids.map(id => ({ ...CARD_MAP[id], instanceId: Math.random() }));
  shuffle(deck);
  return deck;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

function categoryScore(cat) {
  const s = G.categories[cat];
  const active = s.active ? s.active.value : 0;
  const stacked = s.stack.reduce((n, c) => n + (c.value || 0), 0);
  const instab = s.instability.reduce((n, c) => n + (c.value || 0), 0);
  return BASE_SCORE + active + stacked - instab;
}

function checkEndConditions() {
  for (const cat of CATEGORIES) {
    const s = categoryScore(cat);
    if (s >= WIN_SCORE) return { result: 'won', category: cat };
    if (s <= LOSE_SCORE) return { result: 'lost', category: cat };
  }
  return null;
}

// ─── Draw ─────────────────────────────────────────────────────────────────────

function drawCard() {
  if (!G.deck.length) {
    addLog('No cards remain in the deck.');
    return null;
  }
  const card = G.deck.shift();
  G.hand.push(card);
  addLog(`Drew: ${card.name}`);
  if (card.mustPlayWhenDrawn || card.subtype === 'hazard') {
    G.mustPlayEventId = card.instanceId;
    G.selectedCardIndex = G.hand.length - 1;
    G.selectedOption = 0;
    addLog(`${card.name} — must be played immediately.`);
  }
  return card;
}

// ─── Selection ────────────────────────────────────────────────────────────────

function selectCard(i) {
  if (G.pendingAction) return;
  G.viewingCard = null;
  G.selectedCardIndex = (G.selectedCardIndex === i) ? null : i;
  G.selectedOption = G.selectedCardIndex !== null ? firstEligibleOption(G.hand[G.selectedCardIndex]) : 0;
  render();
}

function deselectCard() {
  G.selectedCardIndex = null;
  G.selectedOption = 0;
  render();
}

function setSelectedOption(i) {
  const card = G.selectedCardIndex !== null ? G.hand[G.selectedCardIndex] : null;
  if (!card || !canPlayOption(card, card.options[i])) return;
  G.selectedOption = i;
  renderCardDetail();
}

function selectCardWithOption(i, optIdx) {
  if (G.pendingAction) return;
  const card = G.hand[i];
  if (!card || !canPlayOption(card, card.options[optIdx])) return;
  G.viewingCard = null;
  G.selectedCardIndex = i;
  G.selectedOption = optIdx;
  render();
}

function togglePanel(contentId, sectionId) {
  const content = document.getElementById(contentId);
  if (!content) return;
  const collapsed = content.classList.toggle('panel-collapsed');
  const btn = content.parentElement.querySelector('.panel-toggle');
  if (btn) btn.textContent = collapsed ? '▸' : '▾';
  if (sectionId) document.getElementById(sectionId).classList.toggle('section-collapsed', collapsed);
}

function togglePanelMinimize() {
  const panel = document.getElementById('right-panel');
  const minimized = panel.classList.toggle('panel-minimized');
  const btn = document.getElementById('panel-minimize-btn');
  if (btn) btn.textContent = minimized ? '▲' : '▼';
}

// Inspect a card that is in play (active slot, stack, or instability)
function viewCard(card, location) {
  G.selectedCardIndex = null;
  G.viewingCard = { card, location };
  renderCardDetail();
}

function clearView() {
  G.viewingCard = null;
  renderCardDetail();
}

// ─── Confirm Play ─────────────────────────────────────────────────────────────

function confirmPlay() {
  const i = G.selectedCardIndex;
  if (i === null) return;
  const card = G.hand[i];
  if (!card || !meetsRequirements(card)) return;

  const isRequiredEvent = G.mustPlayEventId != null && card.instanceId === G.mustPlayEventId;

  G.hand.splice(i, 1);
  G.selectedCardIndex = null;

  let opt = card.options[G.selectedOption] || card.options[0];
  if (!canPlayOption(card, opt)) {
    opt = card.options.find(o => canPlayOption(card, o)) || opt;
  }

  if (card.type === 'category') {
    applyCategoryCard(card, opt);
  } else {
    resolveEventCard(card, opt);
  }

  if (isRequiredEvent || opt.endsTurn) {
    G.mustPlayEventId = null;
    G.endTurnAfterResolve = true;
  }

  G.selectedOption = 0;
  afterCardResolved();
}

function discardUnplayable(i) {
  const card = G.hand[i];
  if (!card || canPlayCard(card)) return;
  G.hand.splice(i, 1);
  G.selectedCardIndex = null;
  G.selectedOption = 0;
  addLog(`${card.name} removed from hand — requirements not met.`);
  applyCardSelfDiscard(card);
  render();
}

function meetsRequirements(card) {
  if (!card.requires) return true;
  const r = card.requires;
  if (r.activeCardName) {
    const cat = card.options?.[0]?.targetCategory || card.category;
    if (!G.categories[cat]?.active || G.categories[cat].active.name !== r.activeCardName) {
      addLog(`Cannot play ${card.name}: active ${cat} must be ${r.activeCardName}.`);
      render(); return false;
    }
  }
  if (r.categoryScore) {
    const s = categoryScore(r.categoryScore.category);
    if (s < r.categoryScore.min) {
      addLog(`Cannot play ${card.name}: ${r.categoryScore.category} must be ≥ ${r.categoryScore.min} (is ${s}).`);
      render(); return false;
    }
  }
  return true;
}

function handHasPlayableCard() {
  return G.hand.some(c => canPlayCard(c));
}

function canPlayCard(card) {
  if (card.options?.length && !card.options.some(o => canPlayOption(card, o))) return false;
  if (!card.requires) return true;
  const r = card.requires;
  if (r.activeCardName) {
    const cat = card.options?.[0]?.targetCategory || card.category;
    if (!G.categories[cat]?.active || G.categories[cat].active.name !== r.activeCardName) return false;
  }
  if (r.categoryScore && categoryScore(r.categoryScore.category) < r.categoryScore.min) return false;
  return true;
}

// ─── Category Card Resolution ─────────────────────────────────────────────────

function applyCategoryCard(card, opt) {
  const cat = opt.targetCategory || card.category;

  // Draw a card and discard this category card without replacing the active
  if (opt.effect === 'draw_and_discard_self') {
    const cat = opt.targetCategory || card.category;
    drawCard();
    addLog(`${card.name}: drew 1 card. Discarding ${card.name}.`);
    triggerOldCardDiscard(card, cat);
    return;
  }

  // Draw a card and shuffle this category card back into the deck
  if (opt.effect === 'draw_and_shuffle_self') {
    drawCard();
    G.deck.push(card); shuffle(G.deck);
    addLog(`${card.name}: drew 1 card. ${card.name} shuffled into deck.`);
    return;
  }

  // Stack bonus (no replacement)
  if (opt.effect === 'stack_bonus') {
    G.categories[cat].stack.push(card);
    addLog(`${card.name} (+${card.value}) stacked on ${cat} as bonus.`);
    return;
  }

  // Stack bonus on any chosen category
  if (opt.effect === 'stack_bonus_any') {
    G.pendingAction = { type: 'stack_self_on_any', card };
    render(); showStackOnAnyModal(card, card.value); return;
  }

  const catState = G.categories[cat];
  const prev = catState.active;

  // Resource cost: remove stacked card(s) from costCategory, then replace or stack active
  if (opt.effect === 'replace_plus_stack_cost') {
    const costCat = opt.costCategory;
    const costAmount = opt.costAmount || 1;
    const costStack = G.categories[costCat].stack;
    if (costStack.length < costAmount) {
      addLog(`${card.name}: Need ${costAmount} resource(s) in ${cap(costCat)} stack to play — cannot play.`);
      applyCardSelfDiscard(card);
      return;
    }
    G.pendingAction = { type: 'replace_with_stack_cost', card, sourceCategory: costCat, targetCategory: cat, costRemaining: costAmount, bonusInstabilityRemoval: true };
    render(); showRemoveStackModal(card, costCat, null); return;
  }

  // Special pre-replacement side effects
  if (opt.effect === 'replace_consume_env') {
    const envActive = G.categories['environment'].active;
    if (envActive) {
      G.categories['environment'].active = null;
      G.categories['economy'].stack.push(envActive);
      addLog(`${envActive.name} consumed from Environment → Economy stack.`);
    }
  }

  if (opt.effect === 'replace_plus_stack_bonus') {
    const bCat = opt.bonusCategory;
    const marker = { id: 'terrain_bonus', name: `${card.name} Bonus`, value: opt.bonusValue, type: 'marker', instanceId: Math.random() };
    G.categories[bCat].stack.push(marker);
    addLog(`${card.name}: +${opt.bonusValue} bonus added to ${bCat}.`);
  }

  if (opt.effect === 'replace_plus_draw') {
    const n = opt.drawCount || 1;
    for (let i = 0; i < n; i++) drawCard();
    addLog(`${card.name}: Drew ${n} card${n > 1 ? 's' : ''}.`);
  }

  if (opt.effect === 'replace_plus_remove_instability') {
    const fromCat = opt.removeInstabilityFrom;
    const pile = G.categories[fromCat].instability;
    if (pile.length) {
      const removed = pile.shift();
      G.deck.push(removed); shuffle(G.deck);
      addLog(`${card.name}: ${removed.name} removed from ${fromCat} instability → deck.`);
    }
  }

  // Replace active
  catState.active = card;
  addLog(`${card.name} (+${card.value}) is now your active ${cat} identity.`);

  handleOldCard(prev, cat, opt);
}

// Handle where the replaced (old active) card goes
function handleOldCard(prev, cat, opt) {
  if (!prev) return;

  let dest = opt.oldCardDest || 'discard_flow';

  if (dest === 'shuffle') {
    G.deck.push(prev); shuffle(G.deck);
    addLog(`${prev.name} shuffled back into the draw deck.`);
    return;
  }

  if (dest === 'shuffle_if') {
    const condMet = opt.condition ? checkCondition(opt.condition) : false;
    if (condMet) {
      G.deck.push(prev); shuffle(G.deck);
      addLog(`${prev.name} shuffled into the draw deck.`);
    } else {
      addLog(`Condition not met — ${prev.name} will be discarded.`);
      triggerOldCardDiscard(prev, cat);
    }
    return;
  }

  // discard_flow: use the old card's own discardTo options
  triggerOldCardDiscard(prev, cat);
}

function triggerOldCardDiscard(card, fromCat) {
  const opts = card.discardTo || [{ target: `${fromCat}_instability`, label: `${cap(fromCat)} Instability` }];
  if (opts.length > 1) {
    G.pendingAction = { type: 'discard_replaced_card', card, fromCat };
    render();
    showDiscardReplacedModal(card);
  } else {
    applyDiscardDest(card, opts[0].target, opts[0].bonus);
    afterCardResolved();
  }
}

function applyDiscardDest(card, target, bonus) {
  if (target === 'shuffle_to_deck') {
    G.deck.push(card); shuffle(G.deck);
    addLog(`${card.name} shuffled into deck.`);
  } else if (target.endsWith('_instability')) {
    const cat = target.replace('_instability', '');
    G.categories[cat].instability.push(card);
    addLog(`${card.name} → ${cat} instability.`);
  } else {
    G.deck.push(card); shuffle(G.deck);
    addLog(`${card.name} shuffled into deck.`);
  }
  if (bonus === 'draw_1') { drawCard(); addLog('Bonus: drew a card.'); }
}

function resolveDiscardReplaced(target) {
  closeModal();
  const { card } = G.pendingAction;
  const discardOpt = card.discardTo?.find(d => d.target === target);
  G.pendingAction = null;
  applyDiscardDest(card, target, discardOpt?.bonus);
  afterCardResolved();
}

// ─── Event Card Resolution ────────────────────────────────────────────────────

function resolveEventCard(card, opt) {
  addLog(`Event: ${card.name}`);

  switch (opt.effect) {

    case 'stack_on_category': {
      const condMet = opt.condition ? checkCondition(opt.condition) : true;
      if (!condMet) {
        addLog(`${card.name}: Condition not met — discarding.`);
        applyCardSelfDiscard(card);
        break;
      }
      G.categories[opt.targetCategory].stack.push(card);
      addLog(`${card.name} (+${card.value}) stacked on ${opt.targetCategory}.`);
      applyEventDiscard(card);
      break;
    }

    case 'stack_on_any_modal':
      G.pendingAction = { type: 'stack_self_on_any', card, bonusValue: opt.bonusValue };
      render(); showStackOnAnyModal(card, opt.bonusValue); return;

    case 'pay_own_stack_then_stack_on_any': {
      const ownCat = opt.ownCategory;
      const stack = G.categories[ownCat].stack;
      if (!stack.length) {
        addLog(`${card.name}: No ${cap(ownCat)} resources to spend — cannot redirect.`);
        applyCardSelfDiscard(card);
        break;
      }
      G.pendingAction = { type: 'pay_stack_stack_on_any', card, sourceCategory: ownCat };
      render(); showRemoveStackModal(card, ownCat, null); return;
    }

    case 'place_self_to_instability': {
      const cat = opt.targetInstability;
      G.categories[cat].instability.push(card);
      addLog(`${card.name} → ${cat} instability (−${card.value}).`);
      break;
    }

    case 'remove_two_military_then_discard_three_hand': {
      if (G.categories.military.stack.length < 2) {
        addLog(`${card.name}: Need 2 Military resources — cannot play.`);
        applyCardSelfDiscard(card); break;
      }
      G.pendingAction = { type: 'military_exercise_cost', card, sourceCategory: 'military', costRemaining: 2, afterEffect: 'discard_three' };
      render(); showRemoveStackModal(card, 'military', null); return;
    }

    case 'remove_two_military_then_draw_two': {
      if (G.categories.military.stack.length < 2) {
        addLog(`${card.name}: Need 2 Military resources — cannot play.`);
        applyCardSelfDiscard(card); break;
      }
      G.pendingAction = { type: 'military_exercise_cost', card, sourceCategory: 'military', costRemaining: 2, afterEffect: 'draw_two' };
      render(); showRemoveStackModal(card, 'military', null); return;
    }

    case 'remove_military_then_discard_hand_self_discard': {
      if (!G.categories.military.stack.length) {
        addLog(`${card.name}: No Military resources to pay cost.`);
        applyCardSelfDiscard(card);
        break;
      }
      G.pendingAction = { type: 'remove_stack_then_hand_discard', card, sourceCategory: 'military' };
      render(); showRemoveStackModal(card, 'military', null); return;
    }

    case 'discard_hand_then_self': {
      const afterInstab = opt.afterInstability || null;
      if (!G.hand.length) {
        addLog(`${card.name}: No cards in hand to discard — skipping.`);
        if (afterInstab) {
          G.categories[afterInstab].instability.push(card);
          addLog(`${card.name} → ${cap(afterInstab)} instability.`);
          afterCardResolved();
        } else {
          applyCardSelfDiscard(card);
          afterCardResolved();
        }
        break;
      }
      G.pendingAction = { type: 'discard_hand_cards', card, remaining: 1, afterInstability: afterInstab };
      render(); showDiscardHandModal(card, 1); return;
    }

    case 'take_resource_to_economy': {
      const srcCats = opt.sourceCategories || ['technology', 'economy'];
      const afterEffect = opt.afterEffect;
      if (afterEffect === 'remove_military_discard_self' && !G.categories.military.stack.length) {
        addLog(`${card.name}: No Military resources to pay cost.`);
        applyCardSelfDiscard(card);
        break;
      }
      const hasResources = srcCats.some(cat => G.categories[cat].stack.length > 0);
      if (!hasResources) {
        addLog(`${card.name}: No resources available to take — skipping.`);
        resolveAfterTake(card, afterEffect);
        return;
      }
      G.pendingAction = { type: 'take_resource_to_economy', card, sourceCategories: srcCats, afterEffect };
      render(); showTakeResourceModal(card, srcCats); return;
    }

    case 'suppress_hazard': {
      const marker = makeMarker(`${card.name} Suppressed`, opt.altValue || 1);
      G.categories[opt.altInstability].instability.push(marker);
      addLog(`${card.name} suppressed — ${opt.altInstability} −${opt.altValue}.`);
      applyCardSelfDiscard(card);
      break;
    }

    case 'remove_instability_modal':
      G.pendingAction = { type: 'remove_instability', card, maxRemove: opt.maxRemove || 1, filter: opt.targetCategory || null, selfDiscardFlow: !!opt.selfDiscardFlow };
      render(); showInstabilityModal(card, opt.maxRemove || 1, opt.targetCategory || null); return;

    case 'remove_lowest_instability_modal':
      G.pendingAction = { type: 'remove_lowest_instability', card, selfDiscardFlow: !!opt.selfDiscardFlow };
      render(); showRemoveLowestInstabilityModal(card); return;

    case 'move_instability_modal':
      G.pendingAction = { type: 'move_instability_src', card, selfDiscardFlow: !!opt.selfDiscardFlow };
      render(); showMoveInstabilitySrcModal(card); return;

    case 'remove_two_instability_modal':
      G.pendingAction = { type: 'remove_two_instability', card, picked: [] };
      render(); showTwoInstabilityModal(card); return;

    case 'multiplayer_only':
      addLog(`${card.name}: Multiplayer option — not available in solo play.`);
      applyCardSelfDiscard(card);
      break;

    case 'draw_and_shuffle_self':
      drawCard();
      G.deck.push(card); shuffle(G.deck);
      addLog(`${card.name}: Drew a card. ${card.name} shuffled back into the deck.`);
      break;

    case 'discard_from_hand_modal': {
      const condMet = opt.condition ? checkCondition(opt.condition) : true;
      if (!condMet) {
        addLog(`${card.name}: Condition not met — no effect. (Hand size: ${G.hand.length + 1})`);
        applyCardSelfDiscard(card);
        break;
      }
      const count = Math.min(opt.count || 1, G.hand.length);
      if (count <= 0) {
        addLog(`${card.name}: No cards in hand to discard — no effect.`);
        applyCardSelfDiscard(card);
        break;
      }
      G.pendingAction = { type: 'discard_hand_cards', card, remaining: count };
      render(); showDiscardHandModal(card, count); return;
    }

    case 'remove_stack_card_and_optionally_place_self': {
      const srcCat = opt.sourceCategory;
      const tgtCat = opt.targetCategory;
      const stack = G.categories[srcCat].stack;
      if (!stack.length) {
        addLog(`${card.name}: No cards in ${cap(srcCat)} stack to remove.`);
        applyCardSelfDiscard(card);
        break;
      }
      G.pendingAction = { type: 'remove_stack_place_self', card, sourceCategory: srcCat, targetCategory: tgtCat };
      render(); showRemoveStackModal(card, srcCat, tgtCat); return;
    }

    case 'remove_stack_card_then_shuffle_self': {
      const srcCat = opt.sourceCategory;
      const stack = G.categories[srcCat].stack;
      if (!stack.length) {
        addLog(`${card.name}: No cards in ${cap(srcCat)} stack to remove.`);
        applyCardSelfDiscard(card);
        break;
      }
      G.pendingAction = { type: 'remove_stack_shuffle_self', card, sourceCategory: srcCat, targetCategory: null };
      render(); showRemoveStackModal(card, srcCat, null); return;
    }

    case 'remove_stack_card_then_remove_instability': {
      const srcCat = opt.sourceCategory;
      const stack = G.categories[srcCat].stack;
      if (!stack.length) {
        addLog(`${card.name}: No cards in ${cap(srcCat)} stack to pay the cost — cannot play.`);
        applyCardSelfDiscard(card);
        break;
      }
      G.pendingAction = { type: 'remove_stack_then_instability', card, sourceCategory: srcCat, maxRemove: opt.maxRemove || 1, selfDiscardFlow: !!opt.selfDiscardFlow };
      render(); showRemoveStackModal(card, srcCat, null); return;
    }

    case 'discard_self':
      applyCardSelfDiscard(card);
      break;

    case 'remove_stack_card_then_discard_self': {
      const srcCat = opt.sourceCategory;
      const stack = G.categories[srcCat].stack;
      if (!stack.length) {
        addLog(`${card.name}: No cards in ${cap(srcCat)} stack to remove.`);
        applyCardSelfDiscard(card);
        break;
      }
      G.pendingAction = { type: 'remove_stack_place_self', card, sourceCategory: srcCat, targetCategory: null };
      render(); showRemoveStackModal(card, srcCat, null); return;
    }

    case 'draw_if_hand_small': {
      const condMet = opt.condition ? checkCondition(opt.condition) : true;
      if (condMet) {
        drawCard(); drawCard();
        addLog(`${card.name}: Drew 2 cards.`);
      } else {
        addLog(`${card.name}: Condition not met — no effect.`);
      }
      applyCardSelfDiscard(card);
      break;
    }

    case 'remove_stack_card_then_remove_or_identity_then_stack': {
      const srcCat = opt.sourceCategory;
      if (!G.categories[srcCat].stack.length) {
        addLog(`${card.name}: No ${cap(srcCat)} resources to pay cost.`);
        applyCardSelfDiscard(card); break;
      }
      G.pendingAction = { type: 'remove_stack_then_remove_or_identity_stack', card, sourceCategory: srcCat, removeCategory: opt.removeCategory, targetCategory: opt.targetCategory };
      render(); showRemoveStackModal(card, srcCat, null); return;
    }

    case 'remove_stack_card_then_discard_hand_then_stack': {
      const srcCat = opt.sourceCategory;
      const tgtCat = opt.targetCategory;
      if (!G.categories[srcCat].stack.length) {
        addLog(`${card.name}: No ${cap(srcCat)} resources to pay cost.`);
        applyCardSelfDiscard(card); break;
      }
      G.pendingAction = { type: 'remove_stack_discard_hand_stack', card, sourceCategory: srcCat, targetCategory: tgtCat };
      render(); showRemoveStackModal(card, srcCat, null); return;
    }

    case 'remove_instability_then_discard_hand_then_stack': {
      const filterCat = opt.instabilityCategory || null;
      const tgtCat = opt.targetCategory;
      const cats = filterCat
        ? [filterCat].filter(c => G.categories[c]?.instability.length > 0)
        : CATEGORIES.filter(c => G.categories[c].instability.length > 0);
      if (!cats.length) {
        addLog(`${card.name}: No ${filterCat ? cap(filterCat) + ' ' : ''}instability to remove.`);
        applyCardSelfDiscard(card); break;
      }
      G.pendingAction = { type: 'remove_instability', card, maxRemove: 1, selfDiscardFlow: false, afterStackOn: tgtCat, filter: filterCat };
      render(); showInstabilityModal(card, 1, filterCat); return;
    }

    case 'remove_stack_card_then_stack_on_category': {
      const srcCat = opt.sourceCategory;
      const stack = G.categories[srcCat].stack;
      if (!stack.length) {
        addLog(`${card.name}: No cards in ${cap(srcCat)} stack to pay the cost.`);
        applyCardSelfDiscard(card); break;
      }
      G.pendingAction = { type: 'remove_stack_place_on_category', card, sourceCategory: srcCat, targetCategory: opt.targetCategory, bonusValue: opt.bonusValue };
      render(); showRemoveStackModal(card, srcCat, null); return;
    }

    case 'discard_from_hand_then_shuffle_self': {
      const count = Math.min(opt.count || 1, G.hand.length);
      if (count <= 0) {
        addLog(`${card.name}: No cards in hand to discard — shuffling self into deck.`);
        G.deck.push(card); shuffle(G.deck); break;
      }
      G.pendingAction = { type: 'discard_hand_cards', card, remaining: count, shuffleSelf: true };
      render(); showDiscardHandModal(card, count); return;
    }

    case 'remove_stack_card_then_remove_n_from_stack': {
      const srcCat = opt.sourceCategory;
      const stack = G.categories[srcCat].stack;
      if (!stack.length) {
        addLog(`${card.name}: No cards in ${cap(srcCat)} stack to pay the cost.`);
        applyCardSelfDiscard(card); break;
      }
      G.pendingAction = { type: 'remove_stack_then_remove_target_stack', card, sourceCategory: srcCat, targetCategory: opt.targetCategory, removeCount: opt.removeCount || 1, selfDiscardFlow: !!opt.selfDiscardFlow };
      render(); showRemoveStackModal(card, srcCat, null); return;
    }

    case 'remove_stack_card_then_place_in_instability': {
      const srcCat = opt.sourceCategory;
      const stack = G.categories[srcCat].stack;
      if (!stack.length) {
        addLog(`${card.name}: No cards in ${cap(srcCat)} stack to pay the cost.`);
        applyCardSelfDiscard(card); break;
      }
      G.pendingAction = { type: 'remove_stack_place_in_instability', card, sourceCategory: srcCat, targetInstability: opt.targetInstability };
      render(); showRemoveStackModal(card, srcCat, null); return;
    }

    default:
      applyCardSelfDiscard(card);
  }
}

// Apply the event card's own discard destination after it resolves
function applyEventDiscard(card) {
  if (!card.discardTo || !card.discardTo.length) return;
  // Events that go to instability are already there (place_self_to_instability handles it)
  // Events that stack are already in the stack
  // This handles cards that need to go to discard pile or instability after stacking
  // For stacking events, they are now IN the stack so we don't discard separately
  // Only utility events that produced a one-time effect get discarded here
  const subtype = card.subtype;
  if (subtype === 'utility' || subtype === 'hazard') {
    // These were already handled in their respective effects
  }
  // Note: stacking events remain IN the stack — applyEventDiscard not needed for them
}

function makeMarker(name, value) {
  return { id: 'marker', name, value, type: 'marker', instanceId: Math.random() };
}

// ─── Post-play Modals ─────────────────────────────────────────────────────────

function showDiscardReplacedModal(card) {
  const color = card.category ? CAT_COLORS[card.category] : '#888';
  const btns = card.discardTo.map(d => `
    <button class="opt-btn" onclick="resolveDiscardReplaced('${d.target}')">
      <strong>${d.label}</strong>
      ${d.bonus === 'draw_1' ? '<small>Bonus: draw 1 card</small>' : ''}
    </button>`).join('');
  openModal(`
    <div class="modal-card-name" style="color:${color}">${card.name} — Discard</div>
    <p class="modal-sub">This card has been removed from play. Choose where it goes:</p>
    <div class="opt-list">${btns}</div>
  `);
}

function showInstabilityModal(card, maxRemove, filterCat) {
  const cats = filterCat
    ? [filterCat].filter(c => G.categories[c]?.instability.length > 0)
    : CATEGORIES.filter(c => G.categories[c].instability.length > 0);

  if (!cats.length) {
    addLog(`${card.name}: No instability to remove.`);
    G.pendingAction = null;
    applyCardSelfDiscard(card);
    afterCardResolved();
    return;
  }

  const btns = cats.map(cat => {
    const pile = G.categories[cat].instability;
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveRemoveInstability('${cat}', ${maxRemove})">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${pile.length} card${pile.length > 1 ? 's' : ''}: ${pile.map(c => c.name).join(', ')}</small>
    </button>`;
  }).join('');

  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose an Instability pile — removes ${maxRemove > 1 ? `up to ${maxRemove}` : '1'} oldest card${maxRemove > 1 ? 's' : ''}, shuffled back into deck.</p>
    <div class="opt-list">${btns}</div>
  `);
}

function showTwoInstabilityModal(card) {
  const cats = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
  if (cats.length < 2) {
    addLog(`${card.name}: Not enough instability piles to distribute.`);
    // Fall back to single removal
    if (cats.length === 1) {
      const removed = G.categories[cats[0]].instability.shift();
      G.deck.push(removed); shuffle(G.deck);
      addLog(`${removed.name} removed from ${cats[0]} instability → deck.`);
    }
    G.pendingAction = null;
    applyCardSelfDiscard(card);
    afterCardResolved();
    return;
  }

  const btns = cats.map(cat => {
    const pile = G.categories[cat].instability;
    const color = CAT_COLORS[cat];
    const picked = G.pendingAction.picked || [];
    const isPicked = picked.includes(cat);
    return `<button class="opt-btn${isPicked ? ' opt-btn-picked' : ''}" style="border-left:3px solid ${color}" onclick="pickTwoInstability('${cat}')">
      <strong style="color:${color}">${cap(cat)} ${isPicked ? '✓' : ''}</strong>
      <small>${pile.map(c => c.name).join(', ')}</small>
    </button>`;
  }).join('');

  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose two Instability piles. One card will be removed from each.</p>
    <div class="opt-list">${btns}</div>
    ${(G.pendingAction.picked || []).length === 1 ? '<p class="modal-sub">Now choose the second pile.</p>' : ''}
  `);
}

function pickTwoInstability(cat) {
  const action = G.pendingAction;
  action.picked = action.picked || [];
  if (action.picked.includes(cat)) return;
  action.picked.push(cat);
  if (action.picked.length < 2) { showTwoInstabilityModal(action.card); return; }

  closeModal();
  action.picked.forEach(c => {
    const pile = G.categories[c].instability;
    if (pile.length) {
      const removed = pile.shift();
      G.deck.push(removed); shuffle(G.deck);
      addLog(`${removed.name} removed from ${c} instability → deck.`);
    }
  });
  G.pendingAction = null;
  applyCardSelfDiscard(action.card);
  afterCardResolved();
}

function resolveRemoveInstability(cat, maxRemove) {
  closeModal();
  const { card, selfDiscardFlow, afterStackOn } = G.pendingAction;
  const pile = G.categories[cat].instability;
  const removed = [];
  for (let i = 0; i < maxRemove && pile.length; i++) removed.push(pile.shift());
  removed.forEach(c => { G.deck.push(c); });
  shuffle(G.deck);
  addLog(`${removed.map(c => c.name).join(', ')} removed from ${cat} instability → deck.`);
  G.pendingAction = null;
  if (afterStackOn) {
    const count = Math.min(1, G.hand.length);
    if (!count) {
      G.categories[afterStackOn].stack.push(card);
      addLog(`${card.name} (+${card.value}) placed on ${cap(afterStackOn)} stack.`);
      afterCardResolved(); return;
    }
    G.pendingAction = { type: 'discard_hand_cards', card, remaining: count, afterStackOn };
    render(); showDiscardHandModal(card, count); return;
  } else {
    applyCardSelfDiscard(card);
  }
  afterCardResolved();
}

function showStackOnAnyModal(card, bonusValue) {
  const btns = CATEGORIES.map(cat => {
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveStackOnAny('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Current score: ${categoryScore(cat)} → will be ${categoryScore(cat) + bonusValue}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Add +${bonusValue} to which category?</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveStackOnAny(cat) {
  closeModal();
  const { card, bonusValue } = G.pendingAction;
  const val = bonusValue || card.value;
  const stackCard = { ...card, value: val, instanceId: Math.random() };
  G.categories[cat].stack.push(stackCard);
  addLog(`${card.name} (+${val}) stacked on ${cat}.`);
  G.pendingAction = null;
  afterCardResolved();
}

function applyCardSelfDiscard(card) {
  const opts = card.discardTo || [{ target: 'shuffle_to_deck' }];
  if (opts.length === 1) {
    applyDiscardDest(card, opts[0].target, opts[0].bonus);
  } else {
    G.pendingAction = { type: 'discard_replaced_card', card, fromCat: card.category };
    render(); showDiscardReplacedModal(card);
  }
}

function showDiscardHandModal(card, remaining) {
  const btns = G.hand.map((c, i) => {
    const color = c.category ? CAT_COLORS[c.category] : '#777';
    const typeLabel = c.type === 'category' ? `${cap(c.category)} Identity` : `${cap(c.subtype || 'event')} event`;
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="pickDiscardHand(${i})">
      <strong style="color:${color}">${c.name}</strong>
      <small>${typeLabel}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose ${remaining} card${remaining > 1 ? 's' : ''} from your hand to discard.</p>
    <div class="opt-list">${btns}</div>
  `);
}

function pickDiscardHand(i) {
  const action = G.pendingAction;
  const discarded = G.hand.splice(i, 1)[0];
  action.remaining--;
  const dest = discarded.discardTo;
  if (!dest || dest.length === 0) {
    G.deck.push(discarded); shuffle(G.deck);
    addLog(`${discarded.name} shuffled into deck.`);
    continueHandDiscardChain();
  } else if (dest.length === 1) {
    applyDiscardDest(discarded, dest[0].target, dest[0].bonus);
    continueHandDiscardChain();
  } else {
    G.pendingAction = { ...action, routingCard: discarded };
    render(); showHandDiscardDestModal(discarded, action.card);
  }
}

function showHandDiscardDestModal(discardedCard, mainCard) {
  const btns = discardedCard.discardTo.map(d => `
    <button class="opt-btn" onclick="resolveHandDiscardDest('${d.target}')">
      <strong>${d.label}</strong>
    </button>`).join('');
  openModal(`
    <div class="modal-card-name">${mainCard.name}</div>
    <p class="modal-sub">Where does <strong>${discardedCard.name}</strong> go?</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveHandDiscardDest(target) {
  closeModal();
  const action = G.pendingAction;
  const { routingCard } = action;
  const dest = routingCard.discardTo?.find(d => d.target === target);
  applyDiscardDest(routingCard, target, dest?.bonus);
  delete action.routingCard;
  G.pendingAction = action;
  continueHandDiscardChain();
}

function continueHandDiscardChain() {
  const action = G.pendingAction;
  if (action.remaining > 0) {
    showDiscardHandModal(action.card, action.remaining);
    return;
  }
  closeModal();
  G.pendingAction = null;
  if (action.afterStackOn) {
    G.categories[action.afterStackOn].stack.push(action.card);
    addLog(`${action.card.name} (+${action.card.value}) placed on ${cap(action.afterStackOn)} stack.`);
    afterCardResolved();
  } else if (action.shuffleSelf) {
    G.deck.push(action.card); shuffle(G.deck);
    addLog(`${action.card.name} shuffled into the deck.`);
    afterCardResolved();
  } else if (action.afterInstability) {
    G.categories[action.afterInstability].instability.push(action.card);
    addLog(`${action.card.name} → ${cap(action.afterInstability)} instability.`);
    afterCardResolved();
  } else {
    applyCardSelfDiscard(action.card);
    afterCardResolved();
  }
}

function showRemoveStackModal(card, srcCat, tgtCat) {
  const stack = G.categories[srcCat].stack;
  if (!stack.length) {
    addLog(`${card.name}: No cards in ${cap(srcCat)} stack.`);
    G.pendingAction = null;
    applyCardSelfDiscard(card);
    afterCardResolved();
    return;
  }
  // Always take the oldest (first) resource — no player choice
  resolveRemoveStackCard(0);
}

function resolveRemoveStackCard(idx) {
  closeModal();
  const { card, sourceCategory, targetCategory, type } = G.pendingAction;
  const removed = G.categories[sourceCategory].stack.splice(idx, 1)[0];
  G.deck.push(removed); shuffle(G.deck);
  addLog(`${removed.name} removed from ${sourceCategory} stack → deck.`);
  if (type === 'pay_stack_stack_on_any') {
    G.pendingAction = { type: 'stack_self_on_any', card, bonusValue: card.value };
    render(); showStackOnAnyModal(card, card.value); return;
  } else if (type === 'remove_stack_then_instability') {
    const { maxRemove, selfDiscardFlow } = G.pendingAction;
    G.pendingAction = { type: 'remove_instability', card, maxRemove, selfDiscardFlow };
    render(); showInstabilityModal(card, maxRemove, null); return;
  } else if (type === 'remove_stack_shuffle_self') {
    G.pendingAction = null;
    G.deck.push(card); shuffle(G.deck);
    addLog(`${card.name} shuffled into the draw deck.`);
    afterCardResolved();
  } else if (type === 'remove_stack_then_hand_discard') {
    const count = Math.min(1, G.hand.length);
    if (count <= 0) {
      G.pendingAction = null;
      addLog(`${card.name}: No cards in hand to discard — skipping.`);
      applyCardSelfDiscard(card);
      afterCardResolved();
      return;
    }
    G.pendingAction = { type: 'discard_hand_cards', card, remaining: count };
    render(); showDiscardHandModal(card, count); return;
  } else if (type === 'military_exercise_cost') {
    const costRemaining = G.pendingAction.costRemaining - 1;
    if (costRemaining > 0) {
      G.pendingAction = { ...G.pendingAction, costRemaining };
      render(); showRemoveStackModal(card, 'military', null); return;
    }
    const { afterEffect } = G.pendingAction;
    G.pendingAction = null;
    if (afterEffect === 'discard_three') {
      const count = Math.min(3, G.hand.length);
      if (count <= 0) { applyCardSelfDiscard(card); afterCardResolved(); return; }
      G.pendingAction = { type: 'discard_hand_cards', card, remaining: count };
      render(); showDiscardHandModal(card, count); return;
    } else if (afterEffect === 'draw_two') {
      drawCard(); drawCard();
      addLog(`${card.name}: Drew 2 cards.`);
      applyCardSelfDiscard(card); afterCardResolved();
    }
    return;
  } else if (type === 'replace_with_stack_cost') {
    const costRemaining = G.pendingAction.costRemaining - 1;
    if (costRemaining > 0) {
      G.pendingAction = { ...G.pendingAction, costRemaining };
      render(); showRemoveStackModal(card, sourceCategory, null); return;
    }
    G.pendingAction = { type: 'replace_or_stack', card, targetCategory, bonusInstabilityRemoval: G.pendingAction.bonusInstabilityRemoval };
    render(); showReplaceOrStackModal(card, targetCategory); return;
  } else if (type === 'remove_stack_then_remove_or_identity_stack') {
    const { removeCategory, targetCategory } = G.pendingAction;
    G.pendingAction = null;
    const removeStack = G.categories[removeCategory].stack;
    if (removeStack.length > 0) {
      const removed2 = removeStack.splice(0, 1)[0];
      G.deck.push(removed2); shuffle(G.deck);
      addLog(`${removed2.name} removed from ${cap(removeCategory)} stack → deck.`);
    } else {
      const identity = G.categories[removeCategory].active;
      if (identity) {
        G.categories[removeCategory].active = null;
        G.categories[removeCategory].instability.push(identity);
        addLog(`${identity.name} (active ${cap(removeCategory)} identity) removed → ${cap(removeCategory)} instability.`);
      } else {
        addLog(`${card.name}: No ${cap(removeCategory)} resources or identity to remove.`);
      }
    }
    G.categories[targetCategory].stack.push(card);
    addLog(`${card.name} (+${card.value}) placed on ${cap(targetCategory)} stack.`);
    afterCardResolved();
  } else if (type === 'remove_stack_discard_hand_stack') {
    const count = Math.min(1, G.hand.length);
    if (!count) {
      G.pendingAction = null;
      G.categories[targetCategory].stack.push(card);
      addLog(`${card.name} (+${card.value}) placed on ${cap(targetCategory)} stack.`);
      afterCardResolved(); return;
    }
    G.pendingAction = { type: 'discard_hand_cards', card, remaining: count, afterStackOn: targetCategory };
    render(); showDiscardHandModal(card, count); return;
  } else if (type === 'remove_stack_place_on_category') {
    const tgtCat = G.pendingAction.targetCategory;
    const val = G.pendingAction.bonusValue !== undefined ? G.pendingAction.bonusValue : card.value;
    const stackedCard = val !== card.value ? { ...card, value: val } : card;
    G.pendingAction = null;
    G.categories[tgtCat].stack.push(stackedCard);
    addLog(`${card.name} (+${val}) placed on ${cap(tgtCat)} stack.`);
    afterCardResolved();
  } else if (type === 'remove_stack_then_remove_target_stack') {
    const { targetCategory: tgtCat, removeCount, selfDiscardFlow } = G.pendingAction;
    const tgtStack = G.categories[tgtCat].stack;
    const toRemove = Math.min(removeCount, tgtStack.length);
    if (toRemove > 0) {
      const removed2 = tgtStack.splice(0, toRemove);
      removed2.forEach(c => { G.deck.push(c); });
      shuffle(G.deck);
      addLog(`${removed2.map(c => c.name).join(', ')} removed from ${cap(tgtCat)} stack → deck.`);
    } else {
      addLog(`${card.name}: No ${cap(tgtCat)} resources to remove.`);
    }
    G.pendingAction = null;
    if (selfDiscardFlow) { applyCardSelfDiscard(card); } else { G.deck.push(card); shuffle(G.deck); }
    afterCardResolved();
  } else if (type === 'remove_stack_place_in_instability') {
    const tgtInstab = G.pendingAction.targetInstability;
    G.pendingAction = null;
    G.categories[tgtInstab].instability.push(card);
    addLog(`${card.name} → ${cap(tgtInstab)} instability (−${card.value}).`);
    afterCardResolved();
  } else if (targetCategory) {
    G.pendingAction = null;
    G.categories[targetCategory].stack.push(card);
    addLog(`${card.name} (+${card.value}) placed on ${cap(targetCategory)} stack.`);
    afterCardResolved();
  } else {
    G.pendingAction = null;
    applyCardSelfDiscard(card);
    afterCardResolved();
  }
}

function showPlaceSelfModal(card, tgtCat) {
  const color = CAT_COLORS[tgtCat];
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Place this card in your ${cap(tgtCat)} Stack?</p>
    <div class="opt-list">
      <button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolvePlaceSelf(true)">
        <strong style="color:${color}">Yes — Stack on ${cap(tgtCat)}</strong>
        <small>+${card.value} to ${cap(tgtCat)} score</small>
      </button>
      <button class="opt-btn" onclick="resolvePlaceSelf(false)">
        <strong>No — Shuffle into deck</strong>
        <small>Card returns to draw deck</small>
      </button>
    </div>
  `);
}

function resolvePlaceSelf(place) {
  closeModal();
  const { card, targetCategory } = G.pendingAction;
  G.pendingAction = null;
  if (place) {
    G.categories[targetCategory].stack.push(card);
    addLog(`${card.name} (+${card.value}) placed on ${targetCategory} stack.`);
  } else {
    applyCardSelfDiscard(card);
  }
  afterCardResolved();
}

function showRemoveLowestInstabilityModal(card) {
  const cats = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
  if (!cats.length) {
    addLog(`${card.name}: No instability anywhere — no effect.`);
    G.pendingAction = null;
    applyCardSelfDiscard(card);
    afterCardResolved(); return;
  }
  const btns = cats.map(cat => {
    const pile = G.categories[cat].instability;
    const lowest = [...pile].sort((a, b) => (a.value || 0) - (b.value || 0))[0];
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveRemoveLowestInstability('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${pile.length} card(s) — lowest: ${lowest.name} (−${lowest.value})</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose a category — lowest instability card will be shuffled into deck.</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveRemoveLowestInstability(cat) {
  closeModal();
  const { card, selfDiscardFlow } = G.pendingAction;
  G.pendingAction = null;
  const pile = G.categories[cat].instability;
  if (!pile.length) { applyCardSelfDiscard(card); afterCardResolved(); return; }
  const lowestIdx = pile.reduce((best, c, i) => (c.value || 0) < (pile[best].value || 0) ? i : best, 0);
  const removed = pile.splice(lowestIdx, 1)[0];
  G.deck.push(removed); shuffle(G.deck);
  addLog(`${removed.name} (lowest instability) removed from ${cat} → deck.`);
  applyCardSelfDiscard(card);
  afterCardResolved();
}

function showMoveInstabilitySrcModal(card) {
  const cats = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
  if (!cats.length) {
    addLog(`${card.name}: No instability to move — no effect.`);
    G.pendingAction = null;
    applyCardSelfDiscard(card);
    afterCardResolved(); return;
  }
  const btns = cats.map(cat => {
    const pile = G.categories[cat].instability;
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMoveInstabilitySrc('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${pile.map(c => c.name).join(', ')}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Move instability from which category?</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveMoveInstabilitySrc(srcCat) {
  closeModal();
  const pile = G.categories[srcCat].instability;
  if (!pile.length) { applyCardSelfDiscard(G.pendingAction.card); afterCardResolved(); return; }
  G.pendingAction = { ...G.pendingAction, type: 'move_instability_dest', srcCat, instCard: pile[0] };
  const destCats = CATEGORIES.filter(c => c !== srcCat);
  const btns = destCats.map(cat => {
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMoveInstabilityDest('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Move ${G.pendingAction.instCard.name} here</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${G.pendingAction.card.name}</div>
    <p class="modal-sub">Move <strong>${G.pendingAction.instCard.name}</strong> (from ${cap(srcCat)}) to which category?</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveMoveInstabilityDest(destCat) {
  closeModal();
  const { card, srcCat, instCard, selfDiscardFlow } = G.pendingAction;
  G.pendingAction = null;
  const srcPile = G.categories[srcCat].instability;
  const idx = srcPile.indexOf(instCard);
  if (idx !== -1) srcPile.splice(idx, 1);
  G.categories[destCat].instability.push(instCard);
  addLog(`${instCard.name} moved from ${srcCat} instability → ${destCat} instability.`);
  applyCardSelfDiscard(card);
  afterCardResolved();
}

function showReplaceOrStackModal(card, cat) {
  // Always replace automatically — no modal needed
  resolveReplaceOrStack('replace');
}

function applyIdentityBenefit(card) {
  if (!card.benefit) return;
  const { resourceCategory, count } = card.benefit;
  const found = [];
  const rest = [];
  for (const c of G.deck) {
    if (found.length < count && c.type === 'event' && c.subtype === 'stacking' && c.category === resourceCategory) {
      found.push(c);
    } else {
      rest.push(c);
    }
  }
  G.deck = rest;
  shuffle(G.deck);
  found.forEach(c => G.hand.push(c));
  if (found.length > 0) {
    addLog(`${card.name} benefit: ${found.map(c => c.name).join(', ')} added to hand.`);
  } else {
    addLog(`${card.name} benefit: No ${cap(resourceCategory)} resources found in deck.`);
  }
}

function resolveReplaceOrStack(choice) {
  closeModal();
  const { card, targetCategory, bonusInstabilityRemoval } = G.pendingAction;
  G.pendingAction = null;
  const cat = targetCategory;

  // Bonus fires first — before old card is discarded — so order never affects the reward
  if (bonusInstabilityRemoval && G.categories[cat].instability.length > 0) {
    const oldest = G.categories[cat].instability.shift();
    G.deck.push(oldest); shuffle(G.deck);
    addLog(`Bonus: ${oldest.name} removed from ${cap(cat)} instability → deck.`);
  }

  // Identity benefit: search deck for matching resources
  applyIdentityBenefit(card);

  if (choice === 'replace') {
    const catState = G.categories[cat];
    const prev = catState.active;
    catState.active = card;
    addLog(`${card.name} (+${card.value}) is now your active ${cap(cat)} identity.`);
    if (prev) { triggerOldCardDiscard(prev, cat); }
    else { afterCardResolved(); }
  } else {
    G.categories[cat].stack.push(card);
    addLog(`${card.name} (+${card.value}) stacked on ${cap(cat)}.`);
    afterCardResolved();
  }
}

function showTakeResourceModal(card, cats) {
  const entries = [];
  cats.forEach(cat => {
    G.categories[cat].stack.forEach((c, idx) => entries.push({ c, cat, idx }));
  });
  const btns = entries.map(({ c, cat, idx }) => {
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveTakeResource('${cat}',${idx})">
      <strong style="color:${color}">${c.name}</strong>
      <small>+${c.value} · ${cap(cat)} Stack → Economy</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose a resource to move to your Economy stack:</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveTakeResource(cat, idx) {
  closeModal();
  const { card, afterEffect } = G.pendingAction;
  const taken = G.categories[cat].stack.splice(idx, 1)[0];
  G.categories.economy.stack.push(taken);
  addLog(`${taken.name} moved from ${cap(cat)} stack → Economy stack.`);
  resolveAfterTake(card, afterEffect);
}

function resolveAfterTake(card, afterEffect) {
  G.pendingAction = null;
  if (afterEffect === 'remove_military_discard_self') {
    G.pendingAction = { type: 'remove_stack_place_self', card, sourceCategory: 'military', targetCategory: null };
    render(); showRemoveStackModal(card, 'military', null);
  } else if (afterEffect === 'place_military_instability') {
    G.categories.military.instability.push(card);
    addLog(`${card.name} → Military instability (−${card.value}).`);
    afterCardResolved();
  }
}

function showEndModal(end) {
  const won = end.result === 'won';
  openModal(`
    <div class="end-title ${won ? 'end-win' : 'end-lose'}">${won ? 'VICTORY' : 'COLLAPSE'}</div>
    <p class="end-sub">${won
      ? `${cap(end.category)} reached ${WIN_SCORE}. Your civilization achieved dominance.`
      : `${cap(end.category)} fell to ${LOSE_SCORE}. Your civilization has collapsed.`}
    </p>
    <div class="end-scores">
      ${CATEGORIES.map(cat => {
        const s = categoryScore(cat);
        return `<div class="end-score-row">
          <span style="color:${CAT_COLORS[cat]}">${cap(cat)}</span>
          <span style="font-weight:bold;color:${s <= 2 ? '#e74c3c' : s >= 18 ? '#2ecc71' : '#eee'}">${s}</span>
        </div>`;
      }).join('')}
    </div>
    <button class="opt-btn" onclick="startGame()" style="margin-top:10px">Play Again</button>
  `);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function canPlayOption(card, opt) {
  if (opt.effect === 'multiplayer_only') return false;
  if (opt.condition && !checkConditionDisplay(opt.condition)) return false;
  switch (opt.effect) {
    case 'replace_plus_stack_cost':
      return G.categories[opt.costCategory].stack.length >= (opt.costAmount || 1);
    case 'remove_stack_card_and_optionally_place_self':
    case 'remove_stack_card_then_shuffle_self':
    case 'remove_stack_card_then_remove_instability':
    case 'remove_stack_card_then_discard_self':
    case 'remove_stack_card_then_stack_on_category':
    case 'remove_stack_card_then_remove_n_from_stack':
    case 'remove_stack_card_then_place_in_instability':
    case 'remove_stack_card_then_discard_hand_then_stack':
    case 'remove_stack_card_then_remove_or_identity_then_stack':
      return G.categories[opt.sourceCategory].stack.length >= 1;
    case 'remove_instability_then_discard_hand_then_stack': {
      const fc = opt.instabilityCategory;
      return fc ? G.categories[fc].instability.length >= 1
                : CATEGORIES.some(c => G.categories[c].instability.length > 0);
    }
    case 'pay_own_stack_then_stack_on_any':
      return G.categories[opt.ownCategory].stack.length >= 1;
    case 'take_resource_to_economy':
      if (opt.afterEffect === 'remove_military_discard_self') {
        return G.categories.military.stack.length >= 1;
      }
      return true;
    case 'remove_two_military_then_discard_three_hand':
    case 'remove_two_military_then_draw_two':
      return G.categories.military.stack.length >= 2;
    case 'remove_military_then_discard_hand_self_discard':
      return G.categories.military.stack.length >= 1;
    case 'discard_hand_then_self':
      return true;
    default:
      return true;
  }
}

function firstEligibleOption(card) {
  const idx = (card.options || []).findIndex(o => canPlayOption(card, o));
  return idx >= 0 ? idx : 0;
}

function checkConditionDisplay(cond) {
  if (!cond) return true;
  // At render time the card is still in hand — check hand size directly, no +1 offset
  if (cond.handMoreThan !== undefined) return G.hand.length > cond.handMoreThan;
  if (cond.handLessThan !== undefined) return G.hand.length < cond.handLessThan;
  return checkCondition(cond);
}

function checkCondition(cond) {
  if (!cond) return true;
  if (cond.activeCard) {
    const a = G.categories[cond.activeCard.category]?.active;
    return a && a.name === cond.activeCard.name;
  }
  if (cond.categoryScore) {
    return categoryScore(cond.categoryScore.category) >= cond.categoryScore.min;
  }
  if (cond.categoryScoreMax) {
    return categoryScore(cond.categoryScoreMax.category) <= cond.categoryScoreMax.max;
  }
  if (cond.instabilityEmpty) {
    return G.categories[cond.instabilityEmpty].instability.length === 0;
  }
  if (cond.instabilityExists !== undefined) {
    return G.categories[cond.instabilityExists].instability.length > 0;
  }
  // Hand size checks: card already removed from hand, +1 accounts for the played card
  if (cond.handMoreThan !== undefined) {
    return (G.hand.length + 1) > cond.handMoreThan;
  }
  if (cond.handLessThan !== undefined) {
    return (G.hand.length + 1) < cond.handLessThan;
  }
  return false;
}

function addLog(msg) {
  G.log.unshift(`T${G.turn}: ${msg}`);
  if (G.log.length > 60) G.log.pop();
}

function afterCardResolved() {
  if (G.pendingAction) return;
  G.viewingCard = null;

  const end = checkEndConditions();
  if (end) { G.phase = end.result; render(); showEndModal(end); return; }

  if (G.endTurnAfterResolve) {
    G.endTurnAfterResolve = false;
    endTurn();
    return;
  }

  // If a must-play card is waiting (drawn mid-effect), preserve its selection
  if (G.mustPlayEventId == null) {
    G.selectedCardIndex = null;
    G.selectedOption = 0;
  }

  render();
}

function endTurn() {
  G.mustPlayEventId = null;
  G.endTurnAfterResolve = false;
  G.selectedCardIndex = null;
  G.selectedOption = 0;
  G.viewingCard = null;
  G.turn++;
  const end = checkEndConditions();
  if (end) { G.phase = end.result; render(); showEndModal(end); return; }
  render();
}

function passTurn() {
  if (G.pendingAction) return;
  if (G.mustPlayEventId != null && handHasPlayableCard()) return;
  if (G.mustPlayEventId != null) {
    addLog('No eligible options — forfeiting must-play event.');
    G.mustPlayEventId = null;
  }

  addLog('Pass.');
  const drawn = drawCard();
  if (!drawn) { endTurn(); return; }

  if (drawn.mustPlayWhenDrawn) {
    // drawCard() already set mustPlayEventId + selectedCardIndex
    render();
  } else if (drawn.type === 'event' && drawn.subtype === 'hazard') {
    G.mustPlayEventId = drawn.instanceId;
    G.selectedCardIndex = G.hand.length - 1;
    G.selectedOption = firstEligibleOption(drawn);
    addLog(`${drawn.name} is a hazard — must be resolved before turn ends.`);
    render();
  } else {
    endTurn();
  }
}

// ─── Render ───────────────────────────────────────────────────────────────────

function render() {
  renderCategories();
  renderHand();
  renderLog();
  renderCardDetail();
  renderDeckCount();
}

function renderCategories() {
  const container = document.getElementById('categories');
  container.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const score = categoryScore(cat);
    const s = G.categories[cat];
    const color = CAT_COLORS[cat];
    const pct = Math.max(0, Math.min(100, (score / WIN_SCORE) * 100));
    const isDanger = score <= 3, isWinning = score >= 18;

    const col = document.createElement('div');
    col.className = `category-col${isDanger ? ' danger' : isWinning ? ' winning' : ''}`;
    col.style.borderTopColor = color;

    // Active card HTML
    let activeHTML = `<div class="empty-slot">— No card active —</div>`;
    if (s.active) {
      activeHTML = `<div class="in-play-card" style="border-left-color:${color}" onclick="viewCard_global('active','${cat}')">
        <div class="ipc-name">${s.active.name}</div>
        <div class="ipc-value">+${s.active.value}</div>
        ${s.active.passiveEffect ? '<div class="ipc-passive">Passive</div>' : ''}
      </div>`;
    }

    // Stack HTML
    let stackHTML = '';
    if (s.stack.length) {
      stackHTML = `<div class="cat-section-label">Event Stack</div>
        <div class="cat-stack">
          ${s.stack.map((c, i) => `
            <div class="stack-chip" onclick="viewCard_stack('${cat}',${i})" title="${c.name}">
              <span class="chip-val">+${c.value}</span> <span class="chip-name">${c.name}</span>
            </div>`).join('')}
        </div>`;
    }

    // Instability HTML
    let instabHTML = `<div class="instab-empty">No instability</div>`;
    if (s.instability.length) {
      instabHTML = s.instability.map((c, i) => `
        <div class="stack-chip instab-chip" onclick="viewCard_instab('${cat}',${i})" title="${c.name}">
          <span class="instab-chip-val">−${c.value}</span>
          <span class="chip-name">${c.name}</span>
        </div>`).join('');
    }

    col.innerHTML = `
      <div class="cat-header" style="color:${color}">
        <span class="cat-icon">${CAT_ICONS[cat]}</span>
        <span class="cat-name">${cap(cat)}</span>
        <span class="cat-score" style="color:${isDanger ? '#e74c3c' : isWinning ? '#2ecc71' : '#eee'}">${score}</span>
      </div>
      <div class="score-bar-bg">
        <div class="score-bar-fill" style="width:${pct}%;background:${color}"></div>
        <div class="score-bar-markers"><span>0</span><span>20</span></div>
      </div>
      <div class="cat-section-label">Identity</div>
      <div class="cat-active-slot">${activeHTML}</div>
      ${stackHTML}
      <div class="cat-section-label instab-section-label">Instability</div>
      <div class="cat-instability">${instabHTML}</div>
    `;
    container.appendChild(col);
  });
}

function renderHand() {
  const label = document.getElementById('hand-label');
  label.textContent = `Your Hand (${G.hand.length}) — Click to inspect · Confirm to play`;

  const hand = document.getElementById('hand');
  hand.innerHTML = '';

  G.hand.forEach((card, i) => {
    const color = card.category ? CAT_COLORS[card.category] : '#777';
    const playable = canPlayCard(card);
    const selected = G.selectedCardIndex === i;

    const tintClass = card.type === 'category' ? 'card-tint-gold'
      : card.subtype === 'stacking' ? 'card-tint-green'
      : card.subtype === 'hazard' ? 'card-tint-red'
      : '';

    const el = document.createElement('div');
    el.className = ['hand-card', card.type === 'event' ? 'event-card' : '', tintClass, !playable ? 'unplayable' : '', selected ? 'selected' : ''].filter(Boolean).join(' ');
    el.style.setProperty('--cat-color', color);

    const subtypeLabel = card.subtype ? ` · ${cap(card.subtype)}` : '';
    const typeLabel = card.type === 'event'
      ? `Event${subtypeLabel}`
      : `${cap(card.category || '')} Identity`;

    const effectSummary = (card.options || []).map(o =>
      `<div class="hc-opt"><span class="hc-opt-label">${o.label}:</span> ${o.description}</div>`
    ).join('');

    const optBtns = (card.options || []).map((opt, oi) => {
      const disabled = !canPlayOption(card, opt);
      const isActive = selected && G.selectedOption === oi;
      return `<button class="hc-opt-btn${isActive ? ' hc-opt-btn-active' : ''}${disabled ? ' hc-opt-btn-disabled' : ''}"
        ${disabled ? 'disabled' : ''}
        onclick="event.stopPropagation(); selectCardWithOption(${i}, ${oi})">Opt ${oi + 1}</button>`;
    }).join('');

    el.innerHTML = `
      <div class="hc-header">
        <span class="hc-type">${typeLabel}</span>
        ${card.value > 0 ? `<span class="hc-val-badge">+${card.value}</span>` : ''}
      </div>
      <div class="hc-name">${card.name}</div>
      <div class="hc-art"></div>
      <div class="hc-effects">${effectSummary}</div>
      ${card.requires ? `<div class="hc-req-tag">${buildReqText(card)}</div>` : ''}
      ${card.mustPlayWhenDrawn ? '<div class="hc-must-play">⚠ Must play when drawn</div>' : ''}
      ${!playable ? '<div class="hc-unplayable">Select to discard</div>' : ''}
      <div class="hc-flavor">${card.flavorText || ''}</div>
      <div class="hc-opt-btns">${optBtns}</div>
    `;

    el.addEventListener('click', () => selectCard(i));
    hand.appendChild(el);
  });
}

function renderLog() {
  document.getElementById('log').innerHTML =
    G.log.slice(0, 35).map(l => `<div class="log-entry">${l}</div>`).join('');
}

function renderCardDetail() {
  const body = document.getElementById('card-detail-body');
  const actions = document.getElementById('card-detail-actions');

  const mustPlay = G.mustPlayEventId != null;
  const handPlayable = handHasPlayableCard();
  const passDisabled = !!G.pendingAction || (mustPlay && handPlayable);
  const passLabel = mustPlay && handPlayable ? '⚠ Play drawn event first' : 'Pass Turn';
  const passBtn = `<button class="pass-btn${passDisabled ? ' pass-btn-disabled' : ''}" onclick="passTurn()" ${passDisabled ? 'disabled' : ''}>${passLabel}</button>`;

  // View mode: inspecting an in-play card
  if (G.viewingCard) {
    const { card, location } = G.viewingCard;
    const color = card.category ? CAT_COLORS[card.category] : '#888';
    body.innerHTML = renderDetailFrame(card, color, location, /*readonly*/true);
    actions.innerHTML = `<button class="deselect-btn" onclick="clearView()">Close</button>${passBtn}`;
    return;
  }

  // Play mode: hand card selected
  const i = G.selectedCardIndex;
  if (i !== null && G.hand[i]) {
    const card = G.hand[i];
    const color = card.category ? CAT_COLORS[card.category] : '#888';
    const playable = canPlayCard(card);
    body.innerHTML = renderDetailFrame(card, color, 'In your hand', /*readonly*/false);
    if (playable) {
      actions.innerHTML = `
        <button class="confirm-btn" onclick="confirmPlay()">Confirm Play</button>
        <button class="deselect-btn" onclick="deselectCard()">Deselect</button>
        ${passBtn}
      `;
    } else {
      actions.innerHTML = `
        <span class="confirm-disabled" style="font-size:12px;color:var(--muted);padding:0 8px">Requirements not met</span>
        <button class="deselect-btn" onclick="deselectCard()">Deselect</button>
        ${passBtn}
      `;
    }
    return;
  }

  // Idle
  body.innerHTML = `<div class="detail-empty">Click any card — in your hand or in play — to inspect it here.</div>`;
  actions.innerHTML = passBtn;
}

function renderDetailFrame(card, color, location, readonly) {
  const subtypeLabel = card.subtype ? ` · ${cap(card.subtype)}` : '';
  const typeStr = card.type === 'event'
    ? `Event Card${subtypeLabel}`
    : `${cap(card.category || '')} Identity`;

  const isMustPlay = card.mustPlayWhenDrawn || card.subtype === 'hazard';
  const mustPlayHTML = isMustPlay ? `
    <div class="detail-must-play">
      <span class="detail-section-label">Must Be Played When Drawn</span>
    </div>` : '';

  const benefitHTML = card.benefit ? `
    <div class="detail-benefit">
      <span class="detail-section-label">Benefit When Played</span>
      <div class="detail-benefit-text">${card.benefit.description}</div>
    </div>` : '';

  const reqHTML = card.requires ? `
    <div class="detail-requires ${canPlayCard(card) ? 'req-met' : 'req-unmet'}">
      <span class="detail-section-label">Requires</span>
      <div>${buildReqText(card)}</div>
    </div>` : '';

  let optionsHTML = '';
  if (card.options?.length) {
    optionsHTML = `<div class="detail-section-label">Play Options</div><div class="detail-opts">`;
    card.options.forEach((opt, oi) => {
      const isMultiplayerOnly = opt.effect === 'multiplayer_only';
      const eligible = !readonly && canPlayOption(card, opt);
      const condMet = opt.condition ? checkCondition(opt.condition) : true;
      const isSelected = eligible && G.selectedOption === oi;
      const ineligibleNote = !isMultiplayerOnly && !eligible
        ? `<span class="opt-cond-unmet">Not enough resources to play this option.</span>` : '';
      const unmetNote = eligible && opt.condition && !condMet
        ? `<span class="opt-cond-unmet">Condition not currently met — will apply fallback.</span>` : '';
      const multiplayerNote = isMultiplayerOnly
        ? `<span class="opt-multiplayer-tag">Multiplayer only — not available in solo play</span>` : '';
      const dimmedClass = isMultiplayerOnly ? ' detail-opt-multiplayer' : (!eligible ? ' detail-opt-dimmed' : '');
      optionsHTML += `
        <div class="detail-opt${isSelected ? ' detail-opt-selected' : ''}${dimmedClass}"
             style="${isSelected ? `border-color:${color}` : ''}"
             ${readonly || !eligible ? '' : `onclick="setSelectedOption(${oi})"`}>
          <div class="detail-opt-label">${opt.label}</div>
          <div class="detail-opt-desc">${opt.description}${opt.effect === 'replace_plus_stack_cost' ? ' <em>Bonus: removes the oldest instability from this category (if any).</em>' : ''} ${ineligibleNote}${unmetNote}${multiplayerNote}</div>
        </div>`;
    });
    optionsHTML += `</div>`;
  } else if (card.effect === 'place_self_to_instability') {
    optionsHTML = `<div class="detail-auto-eff">Goes to instability on resolution.</div>`;
  }

  const discardHTML = card.discardTo?.length ? `
    <div class="detail-discard">
      <span class="detail-section-label">Discard Options (chosen when removed from play)</span>
      <div>${card.discardTo.map(d => d.label + (d.bonus ? ' — draw 1 card' : '')).join(' &nbsp;·&nbsp; ')}</div>
    </div>` : '';

  return `
    <div class="detail-location">${location}</div>
    <div class="detail-card-frame" style="border-top-color:${color}">
      <div class="detail-card-header">
        <div>
          <div class="detail-type">${typeStr}</div>
          <div class="detail-name" style="color:${color}">${card.name}</div>
        </div>
        ${card.value > 0 ? `<div class="detail-value" style="color:${color}">+${card.value}</div>` : ''}
      </div>
      ${mustPlayHTML}
      ${benefitHTML}
      ${reqHTML}
      ${optionsHTML}
      ${discardHTML}
      ${card.flavorText ? `<div class="detail-flavor">"${card.flavorText}"</div>` : ''}
    </div>`;
}

function renderDeckCount() {
  const el = document.getElementById('deck-count');
  if (el) el.textContent = `Turn ${G.turn} · Deck: ${G.deck.length}`;
}

function buildReqText(card) {
  const r = card.requires;
  const parts = [];
  if (r.activeCardName) parts.push(`Active: ${r.activeCardName}`);
  if (r.categoryScore) parts.push(`${cap(r.categoryScore.category)} ≥ ${r.categoryScore.min}`);
  return parts.join(' · ');
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

// ─── Modal helpers ────────────────────────────────────────────────────────────

function openModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// ─── Global onclick bridges (for inline onclick in innerHTML) ─────────────────

window.discardUnplayable = discardUnplayable;
window.pickDiscardHand = pickDiscardHand;
window.passTurn = passTurn;
window.togglePanel = togglePanel;
window.togglePanelMinimize = togglePanelMinimize;
window.selectCardWithOption = selectCardWithOption;

window.viewCard_global = function(type, cat) {
  if (type === 'active') {
    const c = G.categories[cat].active;
    if (c) viewCard(c, `Active ${cap(cat)} Card`);
  }
};
window.viewCard_stack = function(cat, idx) {
  const c = G.categories[cat].stack[idx];
  if (c) viewCard(c, `${cap(cat)} Event Stack`);
};
window.viewCard_instab = function(cat, idx) {
  const c = G.categories[cat].instability[idx];
  if (c) viewCard(c, `${cap(cat)} Instability`);
};
window.clearView = clearView;
window.selectCard = selectCard;
window.deselectCard = deselectCard;
window.setSelectedOption = setSelectedOption;
window.confirmPlay = confirmPlay;
window.resolveDiscardReplaced = resolveDiscardReplaced;
window.resolveRemoveInstability = resolveRemoveInstability;
window.resolveStackOnAny = resolveStackOnAny;
window.pickTwoInstability = pickTwoInstability;
window.resolveRemoveStackCard = resolveRemoveStackCard;
window.resolvePlaceSelf = resolvePlaceSelf;
window.resolveReplaceOrStack = resolveReplaceOrStack;
window.resolveTakeResource = resolveTakeResource;
window.resolveRemoveLowestInstability = resolveRemoveLowestInstability;
window.resolveMoveInstabilitySrc = resolveMoveInstabilitySrc;
window.resolveMoveInstabilityDest = resolveMoveInstabilityDest;
window.startGame = startGame;

// ─── Init ─────────────────────────────────────────────────────────────────────

function startGame() {
  closeModal();
  G = newGameState();
  addLog('Game started. Play cards freely — use Pass Turn to draw and end your turn.');
  render();
}

document.addEventListener('DOMContentLoaded', startGame);
