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
  const deck = buildDeck(LEAN_DECK);
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
    G.deck.push(card);
    addLog(`${card.name}: drew 1 card. ${card.name} placed at bottom of deck.`);
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
    addLog(`${prev.name} placed at bottom of deck.`);
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

function removeCrimeInstability(cardName) {
  const crimeIds = ['crime', 'criminal_conspiracy', 'organized_crime'];
  let count = 0;
  CATEGORIES.forEach(cat => {
    const pile = G.categories[cat].instability;
    for (let i = pile.length - 1; i >= 0; i--) {
      if (crimeIds.includes(pile[i].id)) {
        const removed = pile.splice(i, 1)[0];
        G.deck.push(removed);
        addLog(`${removed.name} removed from ${cap(cat)} instability → deck.`);
        count++;
      }
    }
  });
  if (!count) addLog(`${cardName}: No Crime instability found.`);
}

function resolveEventCard(card, opt) {
  addLog(`Event: ${card.name}`);

  // Global event — cooperative threshold auto-negate
  if (card.cooperativeThreshold !== undefined) {
    const threshCat = card.thresholdCategory;
    const thresh = card.cooperativeThreshold;
    const deckCount = G.deck.filter(c => c.tags && c.tags.includes(threshCat)).length;
    if (deckCount >= thresh) {
      addLog(`${card.name}: Cooperative threshold met (${deckCount}/${thresh} ${cap(threshCat)} cards in deck) — effect negated.`);
      applyCardSelfDiscard(card);
      afterCardResolved();
      return;
    }
  }

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
      G.pendingAction = { type: 'stack_self_on_any', card, bonusValue: opt.bonusValue, choices: opt.choices || null };
      render(); showStackOnAnyModal(card, opt.bonusValue, opt.choices || null); return;

    case 'pay_own_stack_then_stack_on_any': {
      const ownCat = opt.ownCategory;
      const stack = G.categories[ownCat].stack;
      if (!stack.length) {
        addLog(`${card.name}: No ${cap(ownCat)} resources to spend — cannot redirect.`);
        applyCardSelfDiscard(card);
        break;
      }
      G.pendingAction = { type: 'pay_stack_stack_on_any', card, sourceCategory: ownCat, choices: opt.choices || null };
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
      G.pendingAction = { type: 'remove_instability', card, maxRemove: opt.maxRemove || 1, filter: opt.targetCategory || null, selfDiscardFlow: !!opt.selfDiscardFlow, afterShuffle: !!opt.afterShuffle };
      render(); showInstabilityModal(card, opt.maxRemove || 1, opt.targetCategory || null); return;

    case 'remove_lowest_instability_modal':
      G.pendingAction = { type: 'remove_lowest_instability', card, selfDiscardFlow: !!opt.selfDiscardFlow };
      render(); showRemoveLowestInstabilityModal(card); return;

    case 'move_instability_modal':
      G.pendingAction = { type: 'move_instability_src', card, selfDiscardFlow: !!opt.selfDiscardFlow };
      render(); showMoveInstabilitySrcModal(card); return;

    case 'move_newest_resource_to_sparse_stack':
      G.pendingAction = { type: 'move_resource_pick_source', card };
      render(); showMoveResourceSrcModal(card); return;

    case 'move_newest_resource_any':
      G.pendingAction = { type: 'move_newest_res_any_src', card };
      render(); showMoveNewestResSrcModal(card); return;

    case 'move_newest_instability_any':
      G.pendingAction = { type: 'move_newest_instab_src', card };
      render(); showMoveNewestInstabSrcModal(card); return;

    case 'move_newest_resource_then_move_newest_instability':
      G.pendingAction = { type: 'mvr_instab__res_src', card };
      render(); showMvrInstabResSrcModal(card); return;

    case 'remove_newest_resource_then_remove_newest_instability':
      G.pendingAction = { type: 'rmr_instab__res_src', card };
      render(); showRmrInstabResSrcModal(card); return;

    case 'remove_two_instability_modal':
      G.pendingAction = { type: 'remove_two_instability', card, picked: [] };
      render(); showTwoInstabilityModal(card); return;

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
      G.pendingAction = { type: 'remove_stack_then_instability', card, sourceCategory: srcCat, maxRemove: opt.maxRemove || 1, selfDiscardFlow: !!opt.selfDiscardFlow, targetCategory: opt.targetCategory || null, afterShuffle: !!opt.afterShuffle, stackEnd: opt.stackEnd || null };
      render(); showRemoveStackModal(card, srcCat, null); return;
    }

    case 'remove_two_stack_cards_then_remove_instability': {
      const stacks2 = opt.stacks || [];
      const filterCat2 = opt.targetCategory || null;
      const maxRemove2 = opt.maxRemove || 1;
      for (const cat of stacks2) {
        if (!G.categories[cat].stack.length) {
          addLog(`${card.name}: No cards in ${cap(cat)} stack — cannot play.`);
          applyCardSelfDiscard(card); return;
        }
      }
      for (const cat of stacks2) {
        const removed = G.categories[cat].stack.shift();
        G.deck.push(removed); shuffle(G.deck);
        addLog(`${removed.name} removed from ${cap(cat)} stack → deck.`);
      }
      G.pendingAction = { type: 'remove_instability', card, maxRemove: maxRemove2, afterShuffle: true, filter: filterCat2 };
      render(); showInstabilityModal(card, maxRemove2, filterCat2); return;
    }

    case 'discard_hand_then_remove_instability': {
      const filterCat3 = opt.targetCategory || null;
      const maxRemove3 = opt.maxRemove || 1;
      if (!G.hand.length) {
        addLog(`${card.name}: No cards in hand to discard — cannot play.`);
        applyCardSelfDiscard(card); break;
      }
      G.pendingAction = { type: 'discard_hand_cards', card, remaining: 1, afterRemoveInstability: filterCat3, maxRemoveInstability: maxRemove3 };
      render(); showDiscardHandModal(card, 1); return;
    }

    case 'draw_n_then_place_in_instability': {
      const drawN = opt.drawCount || 1;
      const tgtInstab = opt.targetInstability;
      for (let i = 0; i < drawN; i++) drawCard();
      addLog(`${card.name}: Drew ${drawN} card${drawN > 1 ? 's' : ''}.`);
      G.categories[tgtInstab].instability.push(card);
      addLog(`${card.name} → ${cap(tgtInstab)} instability.`);
      G.pendingAction = null;
      afterCardResolved(); return;
    }

    case 'global_event_escape': {
      // Cooperative threshold already checked above — here the player pays to escape
      const escapeCost = opt.escapeCost || [];
      const canEscape = escapeCost.every(cat => G.categories[cat].stack.length > 0);
      if (!canEscape) {
        addLog(`${card.name}: Cannot pay escape cost — applying penalty.`);
        applyGlobalEventPenalty(card);
      } else {
        for (const cat of escapeCost) {
          const removed = G.categories[cat].stack.shift();
          G.deck.push(removed); shuffle(G.deck);
          addLog(`${removed.name} removed from ${cap(cat)} stack → deck.`);
        }
        addLog(`${card.name}: Escaped — penalty avoided.`);
        applyCardSelfDiscard(card);
      }
      afterCardResolved(); break;
    }

    case 'global_event_penalty': {
      // Cooperative threshold already checked above — apply penalty directly
      applyGlobalEventPenalty(card);
      afterCardResolved(); break;
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
      G.pendingAction = { type: 'remove_stack_place_on_category', card, sourceCategory: srcCat, targetCategory: opt.targetCategory, bonusValue: opt.bonusValue, stackEnd: opt.stackEnd };
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

    case 'remove_all_from_stack_shuffle_self': {
      const tgtCat = opt.targetCategory;
      const stack = G.categories[tgtCat].stack;
      const count = stack.length;
      if (count > 0) {
        stack.forEach(c => G.deck.push(c));
        G.categories[tgtCat].stack = [];
        addLog(`${card.name}: All ${count} ${cap(tgtCat)} resource(s) cleared → placed at bottom of deck.`);
      } else {
        addLog(`${card.name}: ${cap(tgtCat)} stack already empty — no effect.`);
      }
      G.deck.push(card); shuffle(G.deck);
      addLog(`${card.name} shuffled into deck.`);
      afterCardResolved();
      break;
    }

    case 'remove_all_from_stack_place_in_instability': {
      const tgtCat = opt.targetCategory;
      const tgtInstab = opt.targetInstability;
      const stack = G.categories[tgtCat].stack;
      const count = stack.length;
      if (count > 0) {
        stack.forEach(c => G.deck.push(c));
        G.categories[tgtCat].stack = [];
        addLog(`${card.name}: All ${count} ${cap(tgtCat)} resource(s) cleared → placed at bottom of deck.`);
      } else {
        addLog(`${card.name}: ${cap(tgtCat)} stack already empty — no effect.`);
      }
      G.categories[tgtInstab].instability.push(card);
      addLog(`${card.name} placed in ${cap(tgtInstab)} Instability.`);
      afterCardResolved();
      break;
    }

    case 'remove_one_from_each_stack': {
      let removed = 0;
      CATEGORIES.forEach(cat => {
        const stack = G.categories[cat].stack;
        if (stack.length > 0) {
          const c = stack.splice(0, 1)[0];
          G.deck.push(c);
          removed++;
          addLog(`${c.name} removed from ${cap(cat)} stack → deck.`);
        }
      });
      if (removed === 0) addLog(`${card.name}: No resources on any stack — no effect.`);
      applyCardSelfDiscard(card);
      afterCardResolved();
      break;
    }

    case 'remove_three_stack_cards_then_bottom': {
      const cats = [opt.sourceCategory1, opt.sourceCategory2, opt.sourceCategory3];
      cats.forEach(cat => {
        const r = G.categories[cat].stack.splice(0, 1)[0];
        if (r) { G.deck.push(r); addLog(`${r.name} removed from ${cap(cat)} stack → bottom of deck.`); }
      });
      G.deck.push(card);
      addLog(`${card.name} placed at bottom of deck.`);
      afterCardResolved();
      break;
    }

    case 'remove_four_stack_cards_then_bottom': {
      const cats = [opt.sourceCategory1, opt.sourceCategory2, opt.sourceCategory3, opt.sourceCategory4];
      cats.forEach(cat => {
        const r = G.categories[cat].stack.splice(0, 1)[0];
        if (r) { G.deck.push(r); addLog(`${r.name} removed from ${cap(cat)} stack → bottom of deck.`); }
      });
      G.deck.push(card);
      addLog(`${card.name} placed at bottom of deck.`);
      afterCardResolved();
      break;
    }

    case 'remove_two_stack_cards_then_bottom': {
      const cat1 = opt.sourceCategory1;
      const cat2 = opt.sourceCategory2;
      const r1 = G.categories[cat1].stack.splice(0, 1)[0];
      if (r1) { G.deck.push(r1); addLog(`${r1.name} removed from ${cap(cat1)} stack → bottom of deck.`); }
      const r2 = G.categories[cat2].stack.splice(0, 1)[0];
      if (r2) { G.deck.push(r2); addLog(`${r2.name} removed from ${cap(cat2)} stack → bottom of deck.`); }
      G.deck.push(card);
      addLog(`${card.name} placed at bottom of deck.`);
      afterCardResolved();
      break;
    }

    case 'stack_on_category_then_discard_hand': {
      const tgtCat = opt.targetCategory;
      const stackCard = { ...card, instanceId: Math.random() };
      G.categories[tgtCat].stack.push(stackCard);
      addLog(`${card.name} (+${card.value}) stacked on ${cap(tgtCat)}.`);
      const count = Math.min(1, G.hand.length);
      if (count <= 0) {
        addLog(`${card.name}: No cards in hand to discard — skipping.`);
        afterCardResolved(); return;
      }
      G.pendingAction = { type: 'discard_hand_cards', card, remaining: count, alreadyPlaced: true };
      render(); showDiscardHandModal(card, count); return;
    }

    case 'remove_two_resources_remove_instability_shuffle_self': {
      G.pendingAction = { type: 'restitution_pick_resource', card, remaining: 2, afterShuffle: true };
      render(); showPickAnyResourceModal(card, 2); return;
    }

    case 'remove_one_resource_remove_instability_discard_self': {
      G.pendingAction = { type: 'restitution_pick_resource', card, remaining: 1, afterShuffle: false };
      render(); showPickAnyResourceModal(card, 1); return;
    }

    case 'remove_two_newest_resources_remove_instability': {
      G.pendingAction = { type: 'managed_pick_newest_res', card, remaining: 2 };
      render(); showPickNewestResourceModal(card, 2); return;
    }

    case 'remove_all_oldest_then_remove_two_instability': {
      CATEGORIES.forEach(cat => {
        const stack = G.categories[cat].stack;
        if (stack.length > 0) {
          const c = stack.splice(0, 1)[0];
          G.deck.push(c);
          addLog(`${c.name} removed from ${cap(cat)} stack (oldest) → bottom of deck.`);
        }
      });
      G.pendingAction = { type: 'managed_pick_instab', card, remaining: 2 };
      render(); showManagedInstabModal(card, 2); return;
    }

    case 'strip_stack_to_oldest_and_instab': {
      G.pendingAction = { type: 'rationalize_strip_pick', card };
      render(); showStripStackModal(card); return;
    }

    case 'remove_three_from_stack_remove_two_instab': {
      G.pendingAction = { type: 'rationalize_res_pick', card };
      render(); showRationalizeResModal(card); return;
    }

    case 'remove_one_from_each_stack_and_each_instab': {
      CATEGORIES.forEach(cat => {
        const stack = G.categories[cat].stack;
        if (stack.length > 0) {
          const c = stack.splice(0, 1)[0];
          G.deck.push(c);
          addLog(`${c.name} removed from ${cap(cat)} stack → bottom of deck.`);
        }
        const pile = G.categories[cat].instability;
        if (pile.length > 0) {
          const c = pile.shift();
          G.deck.push(c);
          addLog(`${c.name} removed from ${cat} instability → bottom of deck.`);
        }
      });
      G.pendingAction = null;
      G.deck.push(card);
      addLog(`${card.name} placed at bottom of deck.`);
      afterCardResolved();
      break;
    }

    case 'remove_three_resources_clear_one_pile': {
      G.pendingAction = { type: 'austerity_pick_res', card, remaining: 3 };
      render(); showAusterityResModal(card, 3); return;
    }

    case 'remove_stack_card_then_remove_crime_instability': {
      const srcCat = opt.sourceCategory;
      const srcStack = G.categories[srcCat].stack;
      if (!srcStack.length) {
        addLog(`${card.name}: No ${cap(srcCat)} resources to pay cost.`);
        applyCardSelfDiscard(card); break;
      }
      const r = srcStack.splice(0, 1)[0];
      G.deck.push(r);
      addLog(`${r.name} removed from ${cap(srcCat)} stack → deck.`);
      removeCrimeInstability(card.name);
      G.categories.governance.instability.push(card);
      addLog(`${card.name} → Governance instability.`);
      afterCardResolved(); break;
    }

    case 'remove_multi_stack_then_remove_crime_instability': {
      const stacks = opt.stacks || [];
      const reqMap = {};
      stacks.forEach(c => reqMap[c] = (reqMap[c] || 0) + 1);
      if (!Object.entries(reqMap).every(([c, n]) => G.categories[c].stack.length >= n)) {
        addLog(`${card.name}: Not enough resources to pay cost.`);
        applyCardSelfDiscard(card); break;
      }
      stacks.forEach(cat => {
        const r = G.categories[cat].stack.splice(0, 1)[0];
        if (r) { G.deck.push(r); addLog(`${r.name} removed from ${cap(cat)} stack → deck.`); }
      });
      removeCrimeInstability(card.name);
      G.categories.governance.instability.push(card);
      addLog(`${card.name} → Governance instability.`);
      afterCardResolved(); break;
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
    const { afterShuffle } = G.pendingAction || {};
    G.pendingAction = null;
    if (afterShuffle) {
      G.deck.push(card); shuffle(G.deck);
      addLog(`${card.name} shuffled into deck.`);
    } else {
      applyCardSelfDiscard(card);
    }
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
    <p class="modal-sub">Choose an Instability pile — removes ${maxRemove > 1 ? `up to ${maxRemove}` : '1'} oldest card${maxRemove > 1 ? 's' : ''}, placed at bottom of deck.</p>
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
  const { card, selfDiscardFlow, afterStackOn, afterShuffle } = G.pendingAction;
  const pile = G.categories[cat].instability;
  const removed = [];
  for (let i = 0; i < maxRemove && pile.length; i++) removed.push(pile.shift());
  removed.forEach(c => { G.deck.push(c); });
  addLog(`${removed.map(c => c.name).join(', ')} removed from ${cat} instability → bottom of deck.`);
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
  } else if (afterShuffle) {
    G.deck.push(card); shuffle(G.deck);
    addLog(`${card.name} shuffled into deck.`);
  } else {
    applyCardSelfDiscard(card);
  }
  afterCardResolved();
}

function showPickAnyResourceModal(card, remaining) {
  const eligible = CATEGORIES.filter(c => G.categories[c].stack.length > 0);
  if (!eligible.length) {
    addLog(`${card.name}: No resources to remove — skipping.`);
    proceedToRestitutionInstability();
    return;
  }
  const btns = eligible.map(cat => {
    const stack = G.categories[cat].stack;
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolvePickAnyResource('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${stack.length} card${stack.length > 1 ? 's' : ''}: ${stack.map(c => c.name).join(', ')}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose a stack — removes the oldest resource. (${remaining} to remove)</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolvePickAnyResource(cat) {
  closeModal();
  const action = G.pendingAction;
  const stack = G.categories[cat].stack;
  if (stack.length > 0) {
    const removed = stack.splice(0, 1)[0];
    G.deck.push(removed); shuffle(G.deck);
    addLog(`${removed.name} removed from ${cap(cat)} stack → deck.`);
  }
  action.remaining -= 1;
  if (action.remaining > 0) {
    render(); showPickAnyResourceModal(action.card, action.remaining); return;
  }
  proceedToRestitutionInstability();
}

function proceedToRestitutionInstability() {
  const { card, afterShuffle } = G.pendingAction;
  G.pendingAction = { type: 'remove_instability', card, maxRemove: 1, filter: null, afterShuffle };
  render(); showInstabilityModal(card, 1, null);
}

// ── Managed Decline: newest resource picker ───────────────────────────────────

function showPickNewestResourceModal(card, remaining) {
  const eligible = CATEGORIES.filter(c => G.categories[c].stack.length > 0);
  if (!eligible.length) {
    addLog(`${card.name}: No resources to remove — skipping.`);
    G.pendingAction = { type: 'managed_pick_instab', card, remaining: 1 };
    render(); showManagedInstabModal(card, 1); return;
  }
  const btns = eligible.map(cat => {
    const stack = G.categories[cat].stack;
    const newest = stack[stack.length - 1];
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolvePickNewestResource('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Newest: ${newest.name}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose a stack — removes the newest resource. (${remaining} to remove)</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolvePickNewestResource(cat) {
  closeModal();
  const action = G.pendingAction;
  const stack = G.categories[cat].stack;
  if (stack.length > 0) {
    const removed = stack.splice(stack.length - 1, 1)[0];
    G.deck.push(removed);
    addLog(`${removed.name} removed from ${cap(cat)} stack (newest) → bottom of deck.`);
  }
  action.remaining -= 1;
  if (action.remaining > 0) {
    render(); showPickNewestResourceModal(action.card, action.remaining); return;
  }
  G.pendingAction = { type: 'managed_pick_instab', card: action.card, remaining: 1 };
  render(); showManagedInstabModal(action.card, 1);
}

// ── Managed Decline: instability picker (chains to deck placement) ────────────

function showManagedInstabModal(card, remaining) {
  const cats = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
  if (!cats.length) {
    addLog(`${card.name}: No instability to remove — skipping.`);
    G.pendingAction = null;
    G.deck.push(card);
    addLog(`${card.name} placed at bottom of deck.`);
    afterCardResolved(); return;
  }
  const btns = cats.map(cat => {
    const pile = G.categories[cat].instability;
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveManagedInstab('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${pile.length} card${pile.length > 1 ? 's' : ''} — oldest: ${pile[0].name}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose an Instability pile — removes oldest card → bottom of deck. (${remaining} to remove)</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveManagedInstab(cat) {
  closeModal();
  const action = G.pendingAction;
  const pile = G.categories[cat].instability;
  if (pile.length > 0) {
    const removed = pile.shift();
    G.deck.push(removed);
    addLog(`${removed.name} removed from ${cat} instability → bottom of deck.`);
  }
  action.remaining -= 1;
  if (action.remaining > 0) {
    render(); showManagedInstabModal(action.card, action.remaining); return;
  }
  G.pendingAction = null;
  G.deck.push(action.card);
  addLog(`${action.card.name} placed at bottom of deck.`);
  afterCardResolved();
}

// ── Rationalization: strip stack to oldest + clear instability pile ────────────

function showStripStackModal(card) {
  const eligible = CATEGORIES.filter(c => G.categories[c].stack.length >= 2);
  if (!eligible.length) {
    addLog(`${card.name}: No stack has 2+ resources — skipping.`);
    G.pendingAction = null;
    G.deck.push(card);
    addLog(`${card.name} placed at bottom of deck.`);
    afterCardResolved(); return;
  }
  const btns = eligible.map(cat => {
    const stack = G.categories[cat].stack;
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveStripStack('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${stack.length} resources — keeps: ${stack[0].name}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose a stack — all resources except the oldest are removed. All instabilities in that category except one are also removed.</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveStripStack(cat) {
  closeModal();
  const { card } = G.pendingAction;
  const stack = G.categories[cat].stack;
  // Remove all resources except index 0 (oldest)
  const removed = stack.splice(1);
  removed.forEach(c => { G.deck.push(c); });
  if (removed.length) addLog(`${removed.map(c => c.name).join(', ')} removed from ${cap(cat)} stack (all but oldest) → bottom of deck.`);
  // Remove all instabilities except index 0 (oldest)
  const pile = G.categories[cat].instability;
  const removedInstab = pile.splice(1);
  removedInstab.forEach(c => { G.deck.push(c); });
  if (removedInstab.length) addLog(`${removedInstab.map(c => c.name).join(', ')} removed from ${cap(cat)} instability (all but oldest) → bottom of deck.`);
  G.pendingAction = null;
  G.deck.push(card);
  addLog(`${card.name} placed at bottom of deck.`);
  afterCardResolved();
}

// ── Rationalization: remove 3 from one stack + 2 instability from one pile ───

function showRationalizeResModal(card) {
  const eligible = CATEGORIES.filter(c => G.categories[c].stack.length > 0);
  if (!eligible.length) {
    addLog(`${card.name}: No resources to remove — skipping to instability.`);
    G.pendingAction = { type: 'rationalize_instab_pick', card };
    render(); showRationalizeInstabModal(card); return;
  }
  const btns = eligible.map(cat => {
    const stack = G.categories[cat].stack;
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveRationalizeRes('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${stack.length} resource${stack.length > 1 ? 's' : ''}: ${stack.map(c => c.name).join(', ')}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose a stack — removes up to 3 oldest resources → bottom of deck.</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveRationalizeRes(cat) {
  closeModal();
  const { card } = G.pendingAction;
  const stack = G.categories[cat].stack;
  const count = Math.min(3, stack.length);
  const removed = stack.splice(0, count);
  removed.forEach(c => { G.deck.push(c); });
  if (removed.length) addLog(`${removed.map(c => c.name).join(', ')} removed from ${cap(cat)} stack → bottom of deck.`);
  G.pendingAction = { type: 'rationalize_instab_pick', card };
  render(); showRationalizeInstabModal(card);
}

function showRationalizeInstabModal(card) {
  const eligible = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
  if (!eligible.length) {
    addLog(`${card.name}: No instability to remove — skipping.`);
    G.pendingAction = null;
    G.deck.push(card);
    addLog(`${card.name} placed at bottom of deck.`);
    afterCardResolved(); return;
  }
  const btns = eligible.map(cat => {
    const pile = G.categories[cat].instability;
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveRationalizeInstab('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${pile.length} card${pile.length > 1 ? 's' : ''} — oldest: ${pile[0].name}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose an Instability pile — removes up to 2 oldest cards → bottom of deck.</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveRationalizeInstab(cat) {
  closeModal();
  const { card } = G.pendingAction;
  const pile = G.categories[cat].instability;
  const count = Math.min(2, pile.length);
  const removed = [];
  for (let i = 0; i < count; i++) removed.push(pile.shift());
  removed.forEach(c => { G.deck.push(c); });
  if (removed.length) addLog(`${removed.map(c => c.name).join(', ')} removed from ${cat} instability → bottom of deck.`);
  G.pendingAction = null;
  G.deck.push(card);
  addLog(`${card.name} placed at bottom of deck.`);
  afterCardResolved();
}

// ── Austerity: pick 3 resources then clear one pile ───────────────────────────

function showAusterityResModal(card, remaining) {
  const eligible = CATEGORIES.filter(c => G.categories[c].stack.length > 0);
  if (!eligible.length) {
    addLog(`${card.name}: No resources to remove — skipping to pile clearance.`);
    G.pendingAction = { type: 'austerity_pick_pile', card };
    render(); showAusterityClearPileModal(card); return;
  }
  const btns = eligible.map(cat => {
    const stack = G.categories[cat].stack;
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveAusterityRes('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Newest: ${stack[stack.length - 1].name}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose a stack — removes the newest resource → bottom of deck. (${remaining} to remove)</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveAusterityRes(cat) {
  closeModal();
  const action = G.pendingAction;
  const stack = G.categories[cat].stack;
  if (stack.length > 0) {
    const removed = stack.splice(stack.length - 1, 1)[0];
    G.deck.push(removed);
    addLog(`${removed.name} removed from ${cap(cat)} stack (newest) → bottom of deck.`);
  }
  action.remaining -= 1;
  if (action.remaining > 0) {
    render(); showAusterityResModal(action.card, action.remaining); return;
  }
  G.pendingAction = { type: 'austerity_pick_pile', card: action.card };
  render(); showAusterityClearPileModal(action.card);
}

function showAusterityClearPileModal(card) {
  const eligible = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
  if (!eligible.length) {
    addLog(`${card.name}: No instability to clear — skipping.`);
    G.pendingAction = null;
    G.deck.push(card);
    addLog(`${card.name} placed at bottom of deck.`);
    afterCardResolved(); return;
  }
  const btns = eligible.map(cat => {
    const pile = G.categories[cat].instability;
    const color = CAT_COLORS[cat];
    const total = pile.reduce((n, c) => n + (c.value || 0), 0);
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveAusterityClearPile('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${pile.length} card${pile.length > 1 ? 's' : ''} — total value: ${total}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose an Instability pile — ALL cards removed → bottom of deck.</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveAusterityClearPile(cat) {
  closeModal();
  const { card } = G.pendingAction;
  const pile = G.categories[cat].instability;
  const removed = pile.splice(0);
  removed.forEach(c => { G.deck.push(c); });
  addLog(`${removed.map(c => c.name).join(', ')} — all ${cat} instability cleared → bottom of deck.`);
  G.pendingAction = null;
  G.deck.push(card);
  addLog(`${card.name} placed at bottom of deck.`);
  afterCardResolved();
}


function showStackOnAnyModal(card, bonusValue, choices = null) {
  const cats = choices || CATEGORIES;
  if (cats.length === 1) { resolveStackOnAny(cats[0]); return; }
  const btns = cats.map(cat => {
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
  } else if (action.afterRemoveInstability) {
    const filterCat = action.afterRemoveInstability;
    const maxRemove = action.maxRemoveInstability || 1;
    G.pendingAction = { type: 'remove_instability', card: action.card, maxRemove, afterShuffle: true, filter: filterCat };
    render(); showInstabilityModal(action.card, maxRemove, filterCat); return;
  } else if (action.alreadyPlaced) {
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
  // Take oldest (first) or newest (last) resource depending on stackEnd — no player choice
  const idx = G.pendingAction.stackEnd === 'newest' ? stack.length - 1 : 0;
  resolveRemoveStackCard(idx);
}

function resolveRemoveStackCard(idx) {
  closeModal();
  const { card, sourceCategory, targetCategory, type } = G.pendingAction;
  const removed = G.categories[sourceCategory].stack.splice(idx, 1)[0];
  G.deck.push(removed); shuffle(G.deck);
  addLog(`${removed.name} removed from ${sourceCategory} stack → deck.`);
  if (type === 'pay_stack_stack_on_any') {
    const choices = G.pendingAction.choices;
    G.pendingAction = { type: 'stack_self_on_any', card, bonusValue: card.value, choices };
    render(); showStackOnAnyModal(card, card.value, choices); return;
  } else if (type === 'remove_stack_then_instability') {
    const { maxRemove, selfDiscardFlow, targetCategory, afterShuffle } = G.pendingAction;
    G.pendingAction = { type: 'remove_instability', card, maxRemove, selfDiscardFlow, afterShuffle, filter: targetCategory };
    render(); showInstabilityModal(card, maxRemove, targetCategory); return;
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
    // Cost paid — apply afterEffect
    const afterEffect = G.pendingAction.afterEffect;
    G.pendingAction = null;
    if (afterEffect === 'draw_two') {
      drawCard(); drawCard();
      addLog(`${card.name}: Drew 2 cards.`);
    } else if (afterEffect === 'discard_three') {
      const count = Math.min(3, G.hand.length);
      if (count > 0) {
        G.pendingAction = { type: 'discard_hand_cards', card, remaining: count };
        render(); showDiscardHandModal(card, count); return;
      }
    }
    applyCardSelfDiscard(card);
    afterCardResolved(); return;
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
      addLog(`${removed2.map(c => c.name).join(', ')} removed from ${cap(tgtCat)} stack → bottom of deck.`);
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






function showMoveResourceSrcModal(card) {
  const sparseTargets = CATEGORIES.filter(c => G.categories[c].stack.length === 1);
  const srcs = CATEGORIES.filter(c => G.categories[c].stack.length >= 1 && sparseTargets.some(t => t !== c));
  const btns = srcs.map(cat => {
    const newest = G.categories[cat].stack[G.categories[cat].stack.length - 1];
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMoveResourceSrc('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Move ${newest.name} (+${newest.value})</small>
    </button>`;
  }).join('');
  openModal(`<p class="modal-sub">Move the newest resource from which stack?</p><div class="opt-list">${btns}</div>`);
}

function resolveMoveResourceSrc(srcCat) {
  closeModal();
  const stack = G.categories[srcCat].stack;
  const movedCard = stack[stack.length - 1];
  G.pendingAction = { ...G.pendingAction, type: 'move_resource_pick_target', srcCat, movedCard };
  const tgts = CATEGORIES.filter(c => c !== srcCat && G.categories[c].stack.length === 1);
  const btns = tgts.map(cat => {
    const existing = G.categories[cat].stack[0];
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMoveResourceTgt('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Alongside ${existing.name} (+${existing.value})</small>
    </button>`;
  }).join('');
  openModal(`<p class="modal-sub">Move <strong>${movedCard.name} (+${movedCard.value})</strong> to which stack?</p><div class="opt-list">${btns}</div>`);
}

function resolveMoveResourceTgt(tgtCat) {
  closeModal();
  const { card, srcCat, movedCard } = G.pendingAction;
  G.pendingAction = null;
  const srcStack = G.categories[srcCat].stack;
  const idx = srcStack.lastIndexOf(movedCard);
  if (idx !== -1) srcStack.splice(idx, 1);
  G.categories[tgtCat].stack.push(movedCard);
  addLog(`${movedCard.name} (+${movedCard.value}) moved from ${cap(srcCat)} → ${cap(tgtCat)} stack.`);
  G.deck.push(card);
  addLog(`${card.name} placed at bottom of deck.`);
  afterCardResolved();
}

function showMoveNewestResSrcModal(card) {
  const srcs = CATEGORIES.filter(c => G.categories[c].stack.length >= 1);
  const btns = srcs.map(cat => {
    const newest = G.categories[cat].stack[G.categories[cat].stack.length - 1];
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMoveNewestResSrc('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Move ${newest.name} (+${newest.value})</small>
    </button>`;
  }).join('');
  openModal(`<p class="modal-sub">Move the newest resource from which stack?</p><div class="opt-list">${btns}</div>`);
}

function resolveMoveNewestResSrc(srcCat) {
  closeModal();
  const stack = G.categories[srcCat].stack;
  const movedCard = stack[stack.length - 1];
  G.pendingAction = { ...G.pendingAction, type: 'move_newest_res_any_tgt', srcCat, movedCard };
  const tgts = CATEGORIES.filter(c => c !== srcCat);
  const btns = tgts.map(cat => {
    const color = CAT_COLORS[cat];
    const stackInfo = G.categories[cat].stack.length
      ? G.categories[cat].stack[G.categories[cat].stack.length - 1].name
      : 'empty';
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMoveNewestResTgt('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${stackInfo}</small>
    </button>`;
  }).join('');
  openModal(`<p class="modal-sub">Move <strong>${movedCard.name} (+${movedCard.value})</strong> to which stack?</p><div class="opt-list">${btns}</div>`);
}

function resolveMoveNewestResTgt(tgtCat) {
  closeModal();
  const { card, srcCat, movedCard } = G.pendingAction;
  G.pendingAction = null;
  const srcStack = G.categories[srcCat].stack;
  const idx = srcStack.lastIndexOf(movedCard);
  if (idx !== -1) srcStack.splice(idx, 1);
  G.categories[tgtCat].stack.push(movedCard);
  addLog(`${movedCard.name} (+${movedCard.value}) moved from ${cap(srcCat)} → ${cap(tgtCat)} stack.`);
  G.deck.push(card);
  addLog(`${card.name} placed at bottom of deck.`);
  afterCardResolved();
}

function showMoveNewestInstabSrcModal(card) {
  const srcs = CATEGORIES.filter(c => G.categories[c].instability.length >= 1);
  const btns = srcs.map(cat => {
    const newest = G.categories[cat].instability[G.categories[cat].instability.length - 1];
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMoveNewestInstabSrc('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Move ${newest.name} (−${newest.value})</small>
    </button>`;
  }).join('');
  openModal(`<p class="modal-sub">Move the newest instability from which pile?</p><div class="opt-list">${btns}</div>`);
}

function resolveMoveNewestInstabSrc(srcCat) {
  closeModal();
  const pile = G.categories[srcCat].instability;
  const movedCard = pile[pile.length - 1];
  G.pendingAction = { ...G.pendingAction, type: 'move_newest_instab_tgt', srcCat, movedCard };
  const tgts = CATEGORIES.filter(c => c !== srcCat);
  const btns = tgts.map(cat => {
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMoveNewestInstabTgt('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
    </button>`;
  }).join('');
  openModal(`<p class="modal-sub">Move <strong>${movedCard.name} (−${movedCard.value})</strong> to which instability pile?</p><div class="opt-list">${btns}</div>`);
}

function resolveMoveNewestInstabTgt(tgtCat) {
  closeModal();
  const { card, srcCat, movedCard } = G.pendingAction;
  G.pendingAction = null;
  const srcPile = G.categories[srcCat].instability;
  const idx = srcPile.lastIndexOf(movedCard);
  if (idx !== -1) srcPile.splice(idx, 1);
  G.categories[tgtCat].instability.push(movedCard);
  addLog(`${movedCard.name} (−${movedCard.value}) moved from ${cap(srcCat)} → ${cap(tgtCat)} instability.`);
  G.deck.push(card);
  addLog(`${card.name} placed at bottom of deck.`);
  afterCardResolved();
}

// ── Chain: move newest resource → move newest instability ────────────────────
function showMvrInstabResSrcModal(card) {
  const srcs = CATEGORIES.filter(c => G.categories[c].stack.length >= 1);
  const btns = srcs.map(cat => {
    const newest = G.categories[cat].stack[G.categories[cat].stack.length - 1];
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMvrInstabResSrc('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong><small>Move ${newest.name} (+${newest.value})</small></button>`;
  }).join('');
  openModal(`<p class="modal-sub">Move newest resource from which stack?</p><div class="opt-list">${btns}</div>`);
}
function resolveMvrInstabResSrc(srcCat) {
  closeModal();
  const movedCard = G.categories[srcCat].stack[G.categories[srcCat].stack.length - 1];
  G.pendingAction = { ...G.pendingAction, type: 'mvr_instab__res_tgt', srcCat, movedCard };
  const tgts = CATEGORIES.filter(c => c !== srcCat);
  const btns = tgts.map(cat => {
    const color = CAT_COLORS[cat];
    const top = G.categories[cat].stack[G.categories[cat].stack.length - 1];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMvrInstabResTgt('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong><small>${top ? top.name : 'empty'}</small></button>`;
  }).join('');
  openModal(`<p class="modal-sub">Move <strong>${movedCard.name} (+${movedCard.value})</strong> to which stack?</p><div class="opt-list">${btns}</div>`);
}
function resolveMvrInstabResTgt(tgtCat) {
  closeModal();
  const { card, srcCat, movedCard } = G.pendingAction;
  const srcStack = G.categories[srcCat].stack;
  const idx = srcStack.lastIndexOf(movedCard);
  if (idx !== -1) srcStack.splice(idx, 1);
  G.categories[tgtCat].stack.push(movedCard);
  addLog(`${movedCard.name} (+${movedCard.value}) moved ${cap(srcCat)} → ${cap(tgtCat)} stack.`);
  G.pendingAction = { ...G.pendingAction, type: 'mvr_instab__instab_src' };
  const instabSrcs = CATEGORIES.filter(c => G.categories[c].instability.length >= 1);
  if (!instabSrcs.length) {
    G.pendingAction = null;
    G.deck.push(card); addLog(`${card.name} placed at bottom of deck.`); afterCardResolved(); return;
  }
  render(); showMvrInstabInstabSrcModal();
}
function showMvrInstabInstabSrcModal() {
  const srcs = CATEGORIES.filter(c => G.categories[c].instability.length >= 1);
  const btns = srcs.map(cat => {
    const newest = G.categories[cat].instability[G.categories[cat].instability.length - 1];
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMvrInstabInstabSrc('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong><small>Move ${newest.name} (−${newest.value})</small></button>`;
  }).join('');
  openModal(`<p class="modal-sub">Move newest instability from which pile?</p><div class="opt-list">${btns}</div>`);
}
function resolveMvrInstabInstabSrc(srcCat) {
  closeModal();
  const movedInstab = G.categories[srcCat].instability[G.categories[srcCat].instability.length - 1];
  G.pendingAction = { ...G.pendingAction, type: 'mvr_instab__instab_tgt', instabSrcCat: srcCat, movedInstab };
  const tgts = CATEGORIES.filter(c => c !== srcCat);
  const btns = tgts.map(cat => {
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveMvrInstabInstabTgt('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong></button>`;
  }).join('');
  openModal(`<p class="modal-sub">Move <strong>${movedInstab.name} (−${movedInstab.value})</strong> to which pile?</p><div class="opt-list">${btns}</div>`);
}
function resolveMvrInstabInstabTgt(tgtCat) {
  closeModal();
  const { card, instabSrcCat, movedInstab } = G.pendingAction;
  G.pendingAction = null;
  const srcPile = G.categories[instabSrcCat].instability;
  const idx = srcPile.lastIndexOf(movedInstab);
  if (idx !== -1) srcPile.splice(idx, 1);
  G.categories[tgtCat].instability.push(movedInstab);
  addLog(`${movedInstab.name} moved ${cap(instabSrcCat)} → ${cap(tgtCat)} instability.`);
  G.deck.push(card);
  addLog(`${card.name} placed at bottom of deck.`);
  afterCardResolved();
}

// ── Chain: remove newest resource → remove newest instability ────────────────
function showRmrInstabResSrcModal(card) {
  const srcs = CATEGORIES.filter(c => G.categories[c].stack.length >= 1);
  const btns = srcs.map(cat => {
    const newest = G.categories[cat].stack[G.categories[cat].stack.length - 1];
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveRmrInstabResSrc('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong><small>Remove ${newest.name} (+${newest.value})</small></button>`;
  }).join('');
  openModal(`<p class="modal-sub">Remove newest resource from which stack?</p><div class="opt-list">${btns}</div>`);
}
function resolveRmrInstabResSrc(srcCat) {
  closeModal();
  const stack = G.categories[srcCat].stack;
  const removed = stack.splice(stack.length - 1, 1)[0];
  G.deck.push(removed);
  addLog(`${removed.name} (+${removed.value}) removed from ${cap(srcCat)} stack → deck.`);
  G.pendingAction = { ...G.pendingAction, type: 'rmr_instab__instab_src' };
  const instabSrcs = CATEGORIES.filter(c => G.categories[c].instability.length >= 1);
  if (!instabSrcs.length) {
    const card = G.pendingAction.card; G.pendingAction = null;
    G.deck.push(card); addLog(`${card.name} placed at bottom of deck.`); afterCardResolved(); return;
  }
  render(); showRmrInstabInstabSrcModal();
}
function showRmrInstabInstabSrcModal() {
  const srcs = CATEGORIES.filter(c => G.categories[c].instability.length >= 1);
  const btns = srcs.map(cat => {
    const newest = G.categories[cat].instability[G.categories[cat].instability.length - 1];
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveRmrInstabInstabSrc('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong><small>Remove ${newest.name} (−${newest.value})</small></button>`;
  }).join('');
  openModal(`<p class="modal-sub">Remove newest instability from which pile?</p><div class="opt-list">${btns}</div>`);
}
function resolveRmrInstabInstabSrc(srcCat) {
  closeModal();
  const pile = G.categories[srcCat].instability;
  const removed = pile.splice(pile.length - 1, 1)[0];
  G.deck.push(removed);
  addLog(`${removed.name} (−${removed.value}) removed from ${cap(srcCat)} instability → deck.`);
  const card = G.pendingAction.card; G.pendingAction = null;
  G.deck.push(card); addLog(`${card.name} placed at bottom of deck.`);
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

function applyGlobalEventPenalty(card) {
  const penaltyType = card.penaltyType || 'remove_stack';
  const targetCategory = card.penaltyCategory;
  const count = card.penaltyCount || 2;
  if (penaltyType === 'remove_stack') {
    const stack = G.categories[targetCategory].stack;
    const actual = Math.min(count, stack.length);
    for (let i = 0; i < actual; i++) {
      const res = stack.shift();
      G.deck.push(res); shuffle(G.deck);
      addLog(`${res.name} removed from ${cap(targetCategory)} stack → deck.`);
    }
    addLog(`${card.name}: Penalty — ${actual} ${cap(targetCategory)} resource(s) shuffled to deck.`);
  } else if (penaltyType === 'deck_to_instability') {
    const actual = Math.min(count, G.deck.length);
    for (let i = 0; i < actual; i++) {
      const drawn = G.deck.shift();
      G.categories[targetCategory].instability.push(drawn);
      addLog(`${drawn.name} → ${cap(targetCategory)} instability.`);
    }
    addLog(`${card.name}: Penalty — ${actual} deck card(s) moved to ${cap(targetCategory)} instability.`);
  }
  applyCardSelfDiscard(card);
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
  if (opt.condition && !checkConditionDisplay(opt.condition)) return false;
  switch (opt.effect) {
    case 'replace_plus_stack_cost':
      return G.categories[opt.costCategory].stack.length >= (opt.costAmount || 1);
    case 'remove_four_stack_cards_then_bottom': {
      // Count how many times each category is referenced; require that many cards in the stack
      const _cats4 = [opt.sourceCategory1, opt.sourceCategory2, opt.sourceCategory3, opt.sourceCategory4];
      const _req4 = {};
      _cats4.forEach(c => _req4[c] = (_req4[c] || 0) + 1);
      return Object.entries(_req4).every(([c, n]) => G.categories[c].stack.length >= n);
    }
    case 'remove_three_stack_cards_then_bottom':
      return G.categories[opt.sourceCategory1].stack.length >= 1 &&
             G.categories[opt.sourceCategory2].stack.length >= 1 &&
             G.categories[opt.sourceCategory3].stack.length >= 1;
    case 'remove_two_stack_cards_then_bottom': {
      const _cats2 = [opt.sourceCategory1, opt.sourceCategory2];
      const _req2 = {};
      _cats2.forEach(c => _req2[c] = (_req2[c] || 0) + 1);
      return Object.entries(_req2).every(([c, n]) => G.categories[c].stack.length >= n);
    }
    case 'remove_stack_card_and_optionally_place_self':
    case 'remove_stack_card_then_shuffle_self':
    case 'remove_stack_card_then_remove_instability':
    case 'remove_stack_card_then_discard_self':
    case 'remove_stack_card_then_stack_on_category':
    case 'remove_stack_card_then_remove_n_from_stack':
    case 'remove_stack_card_then_place_in_instability':
    case 'remove_stack_card_then_discard_hand_then_stack':
    case 'remove_stack_card_then_remove_or_identity_then_stack':
    case 'remove_stack_card_then_remove_crime_instability':
      return G.categories[opt.sourceCategory].stack.length >= 1;
    case 'remove_two_stack_cards_then_remove_instability': {
      const reqCounts = {};
      (opt.stacks || []).forEach(c => { reqCounts[c] = (reqCounts[c] || 0) + 1; });
      return Object.entries(reqCounts).every(([c, n]) => G.categories[c].stack.length >= n);
    }
    case 'discard_hand_then_remove_instability':
      return G.hand.length >= 1;
    case 'global_event_escape':
    case 'global_event_penalty':
      return true;
    case 'remove_multi_stack_then_remove_crime_instability': {
      const _reqCrime = {};
      (opt.stacks || []).forEach(c => _reqCrime[c] = (_reqCrime[c] || 0) + 1);
      return Object.entries(_reqCrime).every(([c, n]) => G.categories[c].stack.length >= n);
    }
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
    case 'move_newest_resource_to_sparse_stack': {
      const sparseTargets = CATEGORIES.filter(c => G.categories[c].stack.length === 1);
      const validSources = CATEGORIES.filter(c => G.categories[c].stack.length >= 1 && sparseTargets.some(t => t !== c));
      return validSources.length > 0;
    }
    case 'move_newest_resource_any':
      return CATEGORIES.some(c => G.categories[c].stack.length >= 1);
    case 'move_newest_instability_any':
      return CATEGORIES.some(c => G.categories[c].instability.length >= 1);
    case 'move_newest_resource_then_move_newest_instability':
    case 'remove_newest_resource_then_remove_newest_instability':
      return CATEGORIES.some(c => G.categories[c].stack.length >= 1);
    case 'remove_two_newest_resources_remove_instability':
    case 'remove_all_oldest_then_remove_two_instability':
      return true;
    case 'strip_stack_to_oldest_and_instab':
      return CATEGORIES.some(c => G.categories[c].stack.length >= 2);
    case 'remove_three_from_stack_remove_two_instab':
      return true;
    case 'remove_one_from_each_stack_and_each_instab':
      return true;
    case 'remove_three_resources_clear_one_pile':
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
  if (cond.allIdentitiesActive) {
    return CATEGORIES.every(c => G.categories[c].active !== null);
  }
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
  if (cond.card_in_instability) {
    const { id, category } = cond.card_in_instability;
    const cats = category ? [category] : CATEGORIES;
    return cats.some(c => G.categories[c].instability.some(card => card.id === id));
  }
  if (cond.card_in_stack) {
    const { id, category } = cond.card_in_stack;
    const cats = category ? [category] : CATEGORIES;
    return cats.some(c => G.categories[c].stack.some(card => card.id === id));
  }
  if (cond.card_not_in_instability) {
    const { id, category } = cond.card_not_in_instability;
    const cats = category ? [category] : CATEGORIES;
    return !cats.some(c => G.categories[c].instability.some(card => card.id === id));
  }
  if (cond.active_identity_is) {
    const { category, id } = cond.active_identity_is;
    return G.categories[category]?.active?.id === id;
  }
  if (cond.active_identity_is_not) {
    const { category, id } = cond.active_identity_is_not;
    return G.categories[category]?.active?.id !== id;
  }
  if (cond.stack_size_gte) {
    const { category, value } = cond.stack_size_gte;
    return G.categories[category].stack.length >= value;
  }
  if (cond.score_gte) {
    const { category, value } = cond.score_gte;
    return categoryScore(category) >= value;
  }
  if (cond.score_lte) {
    const { category, value } = cond.score_lte;
    return categoryScore(category) <= value;
  }
  if (cond.score_is_highest) {
    // In solo, always true (no opponents)
    return true;
  }
  if (cond.score_is_lowest) {
    // In solo, always false (no opponents to be lower than)
    return false;
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

  if (drawn.mustPlayWhenDrawn || drawn.subtype === 'hazard') {
    // drawCard() already set mustPlayEventId, selectedCardIndex, and logged
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
  saveGame();
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

function toggleHandMinimize() {
  const area = document.getElementById('hand-area');
  area.classList.toggle('hand-minimized');
  renderHand(); // re-render label to update button text
}

function renderHand() {
  const area = document.getElementById('hand-area');
  const minimized = area.classList.contains('hand-minimized');
  const label = document.getElementById('hand-label');
  label.innerHTML = `<button class="hand-minimize-btn" onclick="toggleHandMinimize()">${minimized ? '▲ Show' : '▼ Hide'}</button>
    <span>Your Hand (${G.hand.length}) — Click to inspect · Confirm to play</span>`;

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

    const tagsHTML = (card.tags || []).map(t => {
      const CATEGORY_TAGS = new Set(['governance','economy','culture','military','technology','environment']);
      const cls = t === 'hostile' ? ' hc-tag-hostile' : t === 'event' ? ' hc-tag-event' : t === 'exchange' ? ' hc-tag-exchange' : CATEGORY_TAGS.has(t) ? ` hc-tag-${t}` : '';
      return `<span class="hc-tag${cls}">${t}</span>`;
    }).join('');

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
      ${tagsHTML ? `<div class="hc-tags">${tagsHTML}</div>` : ''}
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

  const detailTagsHTML = (card.tags || []).length
    ? `<div class="detail-tags">${(card.tags).map(t => {
        const cls = t === 'hostile' ? ' detail-tag-hostile' : t === 'event' ? ' detail-tag-event' : t === 'exchange' ? ' detail-tag-exchange' : '';
        return `<span class="detail-tag${cls}">${t}</span>`;
      }).join('')}</div>`
    : '';

  const isMustPlay = card.mustPlayWhenDrawn || card.subtype === 'hazard';
  const mustPlayHTML = isMustPlay ? `
    <div class="detail-must-play">
      <span class="detail-section-label">Must Be Played When Drawn</span>
    </div>` : '';

  const benefitHTML = card.benefit ? `
    <div class="detail-benefit">
      <span class="detail-section-label">Identity Benefit</span>
      <div>Adds up to ${card.benefit.count} ${cap(card.benefit.resourceCategory)} resource card${card.benefit.count > 1 ? 's' : ''} from the deck to your hand when played.</div>
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
      const eligible = !readonly && canPlayOption(card, opt);
      const condMet = opt.condition ? checkCondition(opt.condition) : true;
      const isSelected = eligible && G.selectedOption === oi;
      const ineligibleNote = !eligible
        ? `<span class="opt-cond-unmet">Not enough resources to play this option.</span>` : '';
      const unmetNote = eligible && opt.condition && !condMet
        ? `<span class="opt-cond-unmet">Condition not currently met — will apply fallback.</span>` : '';
      const dimmedClass = !eligible ? ' detail-opt-dimmed' : '';
      optionsHTML += `
        <div class="detail-opt${isSelected ? ' detail-opt-selected' : ''}${dimmedClass}"
             style="${isSelected ? `border-color:${color}` : ''}"
             ${readonly || !eligible ? '' : `onclick="setSelectedOption(${oi})"`}>
          <div class="detail-opt-label">${opt.label}</div>
          <div class="detail-opt-desc">${opt.description}${opt.effect === 'replace_plus_stack_cost' ? ' <em>Bonus: removes the oldest instability from this category (if any).</em>' : ''} ${ineligibleNote}${unmetNote}</div>
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
          ${detailTagsHTML}
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
  if (!el) return;
  el.textContent = `Turn ${G.turn} · Deck: ${G.deck.length}`;
  el.onclick = showLibrary;
  el.title = 'Click to browse all cards in the deck';
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

// ─── Autoplay ─────────────────────────────────────────────────────────────────

function blankModeStat() {
  return { games: 0, wins: 0, losses: 0, turnHistory: [], scoreSpread: [], cardPlays: {}, optionPlays: {}, tagPlays: {}, winCats: {}, loseCats: {} };
}

const AUTO = {
  running: false,
  interval: null,
  speed: 200,
  mode: 'random',
  targetCategory: null,   // set when maximizer mode starts a new game
  batch: { active: false, target: 0 },
  stats: { random: blankModeStat(), generalist: blankModeStat(), maximizer: blankModeStat() },
};

function randFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function toggleAutoplay() {
  if (AUTO.running) {
    AUTO.running = false;
    clearInterval(AUTO.interval);
    AUTO.interval = null;
    document.getElementById('autoplay-btn').textContent = '▶ Auto';
    document.getElementById('autoplay-btn').classList.remove('auto-active');
    document.getElementById('autoplay-controls').classList.add('hidden');
  } else {
    AUTO.running = true;
    document.getElementById('autoplay-btn').textContent = '⏸ Pause';
    document.getElementById('autoplay-btn').classList.add('auto-active');
    document.getElementById('autoplay-controls').classList.remove('hidden');
    AUTO.interval = setInterval(autoPlayStep, AUTO.speed);
  }
}

function setAutoSpeed(ms) {
  AUTO.speed = ms;
  document.querySelectorAll('.auto-speed-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.speed === String(ms));
  });
  if (AUTO.running) {
    clearInterval(AUTO.interval);
    AUTO.interval = setInterval(autoPlayStep, ms);
  }
}

function setAutoMode(mode) {
  AUTO.mode = mode;
  document.getElementById('auto-mode-random').classList.toggle('active', mode === 'random');
  document.getElementById('auto-mode-generalist').classList.toggle('active', mode === 'generalist');
  document.getElementById('auto-mode-maximizer').classList.toggle('active', mode === 'maximizer');
  if (mode === 'maximizer' && !AUTO.targetCategory) {
    AUTO.targetCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    addLog(`Maximizer: targeting ${cap(AUTO.targetCategory)}.`);
  }
}

function resetAutoStats() {
  AUTO.stats = { random: blankModeStat(), generalist: blankModeStat(), maximizer: blankModeStat() };
  AUTO.targetCategory = null;
  updateAutoStatsDisplay();
}

function recordAutoGameResult(result, cat) {
  const s = AUTO.stats[AUTO.mode];
  s.games++;
  if (result === 'won') { s.wins++; s.winCats[cat] = (s.winCats[cat] || 0) + 1; }
  else { s.losses++; s.loseCats[cat] = (s.loseCats[cat] || 0) + 1; }
  s.turnHistory.push(G.turn);
  const scores = CATEGORIES.map(c => categoryScore(c));
  s.scoreSpread.push(Math.max(...scores) - Math.min(...scores));

  // Maximizer: pick a new random target for the next game
  if (AUTO.mode === 'maximizer') {
    AUTO.targetCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    addLog(`Maximizer: targeting ${cap(AUTO.targetCategory)} next game.`);
  }

  if (AUTO.batch.active) {
    const totalGames = AUTO.stats.random.games + AUTO.stats.generalist.games + AUTO.stats.maximizer.games;
    const batchStart = AUTO.batch.startGames;
    if (totalGames - batchStart >= AUTO.batch.target) {
      AUTO.batch.active = false;
      if (AUTO.running) toggleAutoplay();
      addLog(`Batch complete: ${AUTO.batch.target} games finished.`);
    }
  }
  updateAutoStatsDisplay();
}

function startBatchRun(n) {
  if (!n || n < 1) return;
  AUTO.batch.active = true;
  AUTO.batch.target = n;
  AUTO.batch.startGames = AUTO.stats.random.games + AUTO.stats.generalist.games + AUTO.stats.maximizer.games;
  const prevSpeed = AUTO.speed;
  setAutoSpeed(20);
  if (!AUTO.running) toggleAutoplay();
  addLog(`Batch started: running ${n} games at max speed (${AUTO.mode} mode).`);
}

function exportAutoStats() {
  const data = {
    exportedAt: new Date().toISOString(),
    random: AUTO.stats.random,
    generalist: AUTO.stats.generalist,
    maximizer: AUTO.stats.maximizer,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `governance-autoplay-stats-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function renderModeStats(s, modeName, extraHeader) {
  if (s.games === 0) return `<div class="astat-mode-empty">${modeName}: no data yet</div>`;

  const wr = ((s.wins / s.games) * 100).toFixed(1) + '%';
  const avg = s.turnHistory.length
    ? (s.turnHistory.reduce((a, b) => a + b, 0) / s.turnHistory.length).toFixed(1) : '—';
  const avgSpread = s.scoreSpread.length
    ? (s.scoreSpread.reduce((a, b) => a + b, 0) / s.scoreSpread.length).toFixed(1) : '—';

  const winEntries = Object.entries(s.winCats).sort((a, b) => b[1] - a[1]);
  const loseEntries = Object.entries(s.loseCats).sort((a, b) => b[1] - a[1]);
  const topCards = Object.entries(s.cardPlays).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const topTags = Object.entries(s.tagPlays || {}).sort((a, b) => b[1] - a[1]).slice(0, 15);

  const optionsByCard = {};
  Object.entries(s.optionPlays).forEach(([key, n]) => {
    const [id, oi] = key.split(':');
    if (!optionsByCard[id]) optionsByCard[id] = [];
    optionsByCard[id].push({ oi: parseInt(oi), n });
  });

  const winChips = winEntries.map(([cat, n]) =>
    `<span class="astat-cat-chip chip-win">${cap(cat)} ×${n}</span>`).join('');
  const loseChips = loseEntries.map(([cat, n]) =>
    `<span class="astat-cat-chip chip-lose">${cap(cat)} ×${n}</span>`).join('');
  const cardRows = topCards.map(([id, n]) => {
    const c = CARDS.find(c => c.id === id);
    const pct = ((n / s.games) * 100).toFixed(0);
    const opts = (optionsByCard[id] || []).sort((a, b) => a.oi - b.oi);
    const optStr = opts.map(({ oi, n: on }) => {
      const label = c?.options?.[oi]?.label?.match(/Option \d+/)?.[0] || `Opt${oi + 1}`;
      return `${label}: ${on}`;
    }).join(' / ');
    return `<div class="astat-row"><span class="astat-label">${c ? c.name : id}</span><span class="astat-value">${n} (${pct}%/g)${optStr ? ' — ' + optStr : ''}</span></div>`;
  }).join('');
  const tagRows = topTags.map(([tag, n]) =>
    `<div class="astat-row"><span class="astat-label">${tag}</span><span class="astat-value">${n}</span></div>`
  ).join('');

  return `
    <div class="astat-mode-header">${modeName}${extraHeader ? ' ' + extraHeader : ''}</div>
    <div class="astat-row"><span class="astat-label">Games</span><span class="astat-value">${s.games}</span></div>
    <div class="astat-row"><span class="astat-label">Wins / Losses</span><span class="astat-value">${s.wins} / ${s.losses} &nbsp;(${wr} win rate)</span></div>
    <div class="astat-row"><span class="astat-label">Avg turns/game</span><span class="astat-value">${avg}</span></div>
    <div class="astat-row"><span class="astat-label">Avg score spread</span><span class="astat-value">${avgSpread} &nbsp;<span class="astat-muted">(max−min cat score at game end)</span></span></div>
    <div class="astat-section">
      <div class="astat-section-title">Win by category</div>
      <div class="astat-cat-row">${winChips || '<span class="astat-muted">—</span>'}</div>
    </div>
    <div class="astat-section">
      <div class="astat-section-title">Lose by category</div>
      <div class="astat-cat-row">${loseChips || '<span class="astat-muted">—</span>'}</div>
    </div>
    <div class="astat-section">
      <div class="astat-section-title">Top cards played (option breakdown)</div>
      ${cardRows}
    </div>
    <div class="astat-section">
      <div class="astat-section-title">Tag plays</div>
      ${tagRows || '<span class="astat-muted">—</span>'}
    </div>
  `;
}

function updateAutoStatsDisplay() {
  const activeS = AUTO.stats[AUTO.mode];
  const totalGames = AUTO.stats.random.games + AUTO.stats.generalist.games + AUTO.stats.maximizer.games;

  const bar = document.getElementById('autoplay-bar');
  const statsSection = document.getElementById('auto-stats-section');
  if (totalGames === 0) {
    bar.classList.add('hidden');
    statsSection.classList.add('hidden');
    return;
  }
  bar.classList.remove('hidden');
  statsSection.classList.remove('hidden');

  // Header bar — active mode summary
  const wr = activeS.games ? ((activeS.wins / activeS.games) * 100).toFixed(1) + '%' : '—';
  const avg = activeS.turnHistory.length
    ? (activeS.turnHistory.reduce((a, b) => a + b, 0) / activeS.turnHistory.length).toFixed(1) : '—';

  document.getElementById('auto-games').textContent = activeS.games;
  document.getElementById('auto-wins').textContent = activeS.wins;
  document.getElementById('auto-losses').textContent = activeS.losses;
  document.getElementById('auto-winrate').textContent = wr;
  document.getElementById('auto-turns').textContent = avg;

  const topEntries = Object.entries(activeS.cardPlays).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const topEl = document.getElementById('auto-topcards');
  topEl.textContent = topEntries.length
    ? 'Top: ' + topEntries.map(([id, n]) => { const c = CARDS.find(c => c.id === id); return `${c ? c.name : id} (${n})`; }).join(' · ')
    : '';

  // Detailed panel — single column for active mode
  const modeName = AUTO.mode.charAt(0).toUpperCase() + AUTO.mode.slice(1);
  const extraHeader = (AUTO.mode === 'maximizer' && AUTO.targetCategory)
    ? `<span class="astat-muted">(targeting ${cap(AUTO.targetCategory)})</span>`
    : '';
  document.getElementById('auto-stats-body').innerHTML = `
    <div class="astat-col">${renderModeStats(activeS, modeName, extraHeader)}</div>
  `;
}

function estimateOptionDelta(card, opt) {
  const eff = opt.effect || '';
  const val = card.value || 1;

  // Stacking effects — add value to a category score
  if (eff === 'stack_on_category' || eff === 'stack_bonus') return val;
  if (eff === 'stack_on_any_modal' || eff === 'stack_bonus_any') return (opt.bonusValue !== undefined ? opt.bonusValue : val);
  if (eff === 'replace_plus_stack_bonus' || eff === 'replace_plus_stack_cost' || eff === 'replace_consume_env') return val + 1;
  if (eff === 'replace_plus_draw') return val + 0.5;
  if (eff === 'replace_plus_remove_instability') return val + 2;
  if (eff === 'pay_own_stack_then_stack_on_any') {
    const ownCat = opt.ownCategory;
    return ownCat && G.categories[ownCat].stack.length ? val : -5;
  }
  if (eff === 'stack_on_category_then_discard_hand') return val - 1;

  // Draw effects
  if (eff === 'draw_and_discard_self' || eff === 'draw_and_shuffle_self') return opt.drawCount || 1;
  if (eff === 'draw_if_hand_small') return G.hand.length < 3 ? 1.5 : 0.5;

  // Instability removal effects — very valuable
  if (eff === 'remove_instability_modal') {
    const total = CATEGORIES.reduce((n, c) => n + G.categories[c].instability.length, 0);
    return total > 0 ? (opt.maxRemove || 1) * 2 : 0;
  }
  if (eff === 'remove_lowest_instability_modal') {
    const total = CATEGORIES.reduce((n, c) => n + G.categories[c].instability.length, 0);
    return total > 0 ? 1.5 : 0;
  }
  if (eff === 'remove_two_instability_modal') {
    const total = CATEGORIES.reduce((n, c) => n + G.categories[c].instability.length, 0);
    return Math.min(total, 2) * 2;
  }
  if (eff === 'move_instability_modal' || eff === 'move_newest_instability_any') {
    const total = CATEGORIES.reduce((n, c) => n + G.categories[c].instability.length, 0);
    return total > 0 ? 1 : 0;
  }
  if (eff === 'suppress_hazard') return 3;

  // Resource manipulation (move/remove resources)
  if (eff === 'move_newest_resource_to_sparse_stack' || eff === 'move_newest_resource_any') return 1;
  if (eff === 'move_newest_resource_then_move_newest_instability') return 2;
  if (eff === 'remove_newest_resource_then_remove_newest_instability') {
    const totalRes = CATEGORIES.reduce((n, c) => n + G.categories[c].stack.length, 0);
    const totalInstab = CATEGORIES.reduce((n, c) => n + G.categories[c].instability.length, 0);
    return totalInstab > 0 ? 1 : -1;
  }
  if (eff === 'remove_two_resources_remove_instability_shuffle_self') return 0;

  // Hazard placement into instability — penalty
  if (eff === 'place_self_to_instability') return -val;

  // Discard hand — moderate penalty
  if (eff === 'discard_hand_then_self') return G.hand.length > 1 ? -1.5 : -3;
  if (eff === 'discard_from_hand_modal') return -(opt.count || 1) * 1.5;
  if (eff === 'discard_from_hand_then_shuffle_self') return -(opt.count || 1) * 1.5 + 0.5;

  // Remove resources then draw — break-even ish
  if (eff === 'remove_two_military_then_draw_two') {
    return G.categories.military.stack.length >= 2 ? 0.5 : -5;
  }
  if (eff === 'remove_two_military_then_discard_three_hand') {
    return G.categories.military.stack.length >= 2 ? -1 : -5;
  }
  if (eff === 'remove_military_then_discard_hand_self_discard') {
    return G.categories.military.stack.length >= 1 ? -1.5 : -5;
  }

  // Discard self — low value but at least it's harmless
  if (eff === 'discard_self') return 0;

  // Remove stack cards — costly but sometimes needed (remove_stack_* effects)
  if (eff === 'remove_stack_card_then_shuffle_self') return -1;
  if (eff === 'remove_stack_card_then_discard_self') return -1;
  if (eff === 'remove_stack_card_and_optionally_place_self') {
    const tgtCat = opt.targetCategory;
    const hasSrc = CATEGORIES.some(c => (opt.sourceCategory ? c === opt.sourceCategory : true) && G.categories[c].stack.length > 0);
    return hasSrc ? (tgtCat ? val - 1 : -1) : -5;
  }
  if (eff === 'remove_stack_card_then_remove_instability') return 1;
  if (eff === 'remove_two_stack_cards_then_remove_instability') {
    const filterCat = opt.targetCategory;
    const instabCount = filterCat ? G.categories[filterCat].instability.length : CATEGORIES.reduce((n, c) => n + G.categories[c].instability.length, 0);
    return instabCount > 0 ? (opt.maxRemove || 1) * 1.5 - 2 : -2;
  }
  if (eff === 'discard_hand_then_remove_instability') {
    const filterCat = opt.targetCategory;
    const instabCount = filterCat ? G.categories[filterCat].instability.length : CATEGORIES.reduce((n, c) => n + G.categories[c].instability.length, 0);
    return instabCount > 0 ? 0.5 : -1;
  }
  if (eff === 'draw_n_then_place_in_instability') {
    const drawN = opt.drawCount || 1;
    return drawN * 0.7 - (card.value || 1) * 1.2;
  }
  if (eff === 'global_event_escape') {
    const escapeCost = opt.escapeCost || [];
    const canEscape = escapeCost.every(cat => G.categories[cat].stack.length > 0);
    return canEscape ? 1 : -(card.penaltyCount || 2) * 1.5;
  }
  if (eff === 'global_event_penalty') {
    const thresh = card.cooperativeThreshold || 4;
    const threshCat = card.thresholdCategory;
    const deckCount = G.deck.filter(c => c.tags && c.tags.includes(threshCat)).length;
    return deckCount >= thresh ? 2 : -(card.penaltyCount || 2) * 1.5;
  }
  if (eff === 'remove_stack_card_then_remove_or_identity_then_stack') return val - 1;
  if (eff === 'remove_stack_card_then_discard_hand_then_stack') return val - 2;
  if (eff === 'remove_instability_then_discard_hand_then_stack') return val;
  if (eff === 'remove_stack_card_then_stack_on_category') return val - 1;
  if (eff === 'remove_stack_card_then_remove_n_from_stack') return -2;
  if (eff === 'remove_stack_card_then_place_in_instability') return -2;
  if (eff === 'take_resource_to_economy') return 1;

  // Heavy resource removal hazards
  if (eff === 'remove_all_from_stack_shuffle_self' || eff === 'remove_all_from_stack_place_in_instability') {
    const srcCat = opt.sourceCategory;
    return srcCat ? -(G.categories[srcCat].stack.length * 1.5) : -3;
  }
  if (eff === 'remove_one_from_each_stack') return -CATEGORIES.filter(c => G.categories[c].stack.length > 0).length;
  if (eff === 'remove_three_stack_cards_then_bottom' || eff === 'remove_four_stack_cards_then_bottom') return -3;
  if (eff === 'remove_two_stack_cards_then_bottom') return -2;
  if (eff === 'remove_two_newest_resources_remove_instability') return -1;
  if (eff === 'remove_all_oldest_then_remove_two_instability') return -2;
  if (eff === 'strip_stack_to_oldest_and_instab') return -3;
  if (eff === 'remove_three_from_stack_remove_two_instab') return -2;
  if (eff === 'remove_one_from_each_stack_and_each_instab') return -3;
  if (eff === 'remove_three_resources_clear_one_pile') return -1;

  // Managed / rationalize / austerity — complex but self-shuffling
  if (eff === 'managed') return 2;
  if (eff === 'rationalize') return 1;
  if (eff === 'austerity') return 2;

  if (eff === 'remove_stack_card_then_remove_crime_instability' || eff === 'remove_multi_stack_then_remove_crime_instability') {
    const crimeIds = ['crime', 'criminal_conspiracy', 'organized_crime'];
    const crimeCount = CATEGORIES.reduce((n, c) => n + G.categories[c].instability.filter(x => crimeIds.includes(x.id)).length, 0);
    const costCount = eff === 'remove_multi_stack_then_remove_crime_instability' ? (opt.stacks || []).length : 1;
    return crimeCount * 2 - costCount;
  }

  // Default: estimate based on card value
  return val * 0.5;
}

function estimateOptionDeltaMaximizer(card, opt, targetCat) {
  const base = estimateOptionDelta(card, opt);
  const eff = opt.effect || '';

  // Stacking directly onto target category — high priority
  const stackingEffects = ['stack_on_category', 'stack_bonus', 'stack_on_any_modal', 'stack_bonus_any',
    'replace_plus_stack_bonus', 'replace_plus_stack_cost', 'replace_plus_draw',
    'replace_plus_remove_instability', 'replace_consume_env',
    'remove_stack_card_then_stack_on_category', 'remove_stack_card_then_discard_hand_then_stack',
    'remove_instability_then_discard_hand_then_stack', 'remove_stack_card_then_remove_or_identity_then_stack'];
  if (stackingEffects.includes(eff) && opt.targetCategory === targetCat) return base + 4;

  // Identity card for target category — high priority
  if (card.type === 'category' && card.category === targetCat) return base + 3;

  // Policy: removing instability from target category — protect it
  const instabRemovalEffects = ['remove_stack_card_then_remove_instability',
    'remove_two_stack_cards_then_remove_instability', 'discard_hand_then_remove_instability'];
  if (instabRemovalEffects.includes(eff) && opt.targetCategory === targetCat) return base + 3;

  // General instability removal when target category pile is threatened — moderate boost
  if ((eff === 'remove_instability_modal' || eff === 'remove_two_instability_modal') &&
      G.categories[targetCat].instability.length > 0) return base + 2;

  // Placing instability onto target category — strongly avoid
  if (opt.targetInstability === targetCat) return base - 5;

  // Paying target category's resources as cost — penalise
  if (opt.sourceCategory === targetCat) return base - 3;
  if ((opt.stacks || []).includes(targetCat)) return base - 3;

  // Global event penalising target category — always escape if possible
  if (card.penaltyCategory === targetCat && eff === 'global_event_escape') return base + 4;
  if (card.penaltyCategory === targetCat && eff === 'global_event_penalty') return base - 4;

  // Policy card that creates instability in target category (draw_n_then_place_in_instability)
  if (eff === 'draw_n_then_place_in_instability' && opt.targetInstability === targetCat) return base - 4;

  return base;
}

function autoPlayStep() {
  if (!G || G.phase === 'won' || G.phase === 'lost') {
    const end = checkEndConditions();
    const result = G.phase;
    const cat = end ? end.category : 'unknown';
    recordAutoGameResult(result, cat);
    closeModal();
    startGame();
    return;
  }

  if (G.pendingAction) {
    resolveAutoPendingAction();
    return;
  }

  // Must-play card waiting
  if (G.mustPlayEventId != null) {
    const mustIdx = G.hand.findIndex(c => c.instanceId === G.mustPlayEventId);
    if (mustIdx >= 0 && canPlayCard(G.hand[mustIdx])) {
      autoSelectAndPlay(mustIdx);
      return;
    }
    // Can't play it — pass (which handles the forfeit)
    passTurn();
    return;
  }

  // Choose a card to play, or pass
  const playable = G.hand
    .map((card, i) => ({ card, i }))
    .filter(({ card }) => canPlayCard(card));

  if (!playable.length) {
    passTurn();
    return;
  }

  if (AUTO.mode === 'generalist') {
    // Score each card by its best eligible option's estimated delta
    let bestEntry = null;
    let bestDelta = -Infinity;
    for (const entry of playable) {
      const eligibleOpts = (entry.card.options || [])
        .map((opt, oi) => ({ opt, oi }))
        .filter(({ opt }) => canPlayOption(entry.card, opt));
      if (!eligibleOpts.length) continue;
      const delta = Math.max(...eligibleOpts.map(({ opt }) => estimateOptionDelta(entry.card, opt)));
      if (delta > bestDelta) { bestDelta = delta; bestEntry = entry; }
    }
    // Only pass if every playable option would hurt us (delta < -1) — otherwise play best
    if (!bestEntry || bestDelta < -1) { passTurn(); return; }
    autoSelectAndPlay(bestEntry.i);
  } else if (AUTO.mode === 'maximizer') {
    const tgt = AUTO.targetCategory || CATEGORIES[0];
    let bestEntry = null;
    let bestDelta = -Infinity;
    for (const entry of playable) {
      const eligibleOpts = (entry.card.options || [])
        .map((opt, oi) => ({ opt, oi }))
        .filter(({ opt }) => canPlayOption(entry.card, opt));
      if (!eligibleOpts.length) continue;
      const delta = Math.max(...eligibleOpts.map(({ opt }) => estimateOptionDeltaMaximizer(entry.card, opt, tgt)));
      if (delta > bestDelta) { bestDelta = delta; bestEntry = entry; }
    }
    if (!bestEntry || bestDelta < -2) { passTurn(); return; }
    autoSelectAndPlay(bestEntry.i);
  } else {
    if (Math.random() < 0.12) { passTurn(); return; }
    autoSelectAndPlay(randFrom(playable).i);
  }
}

function autoSelectAndPlay(handIdx) {
  const card = G.hand[handIdx];
  G.selectedCardIndex = handIdx;

  const eligible = (card.options || [])
    .map((opt, oi) => ({ opt, oi }))
    .filter(({ opt }) => canPlayOption(card, opt));

  let chosen;
  if (AUTO.mode === 'generalist' && eligible.length) {
    chosen = eligible.reduce((best, e) =>
      estimateOptionDelta(card, e.opt) >= estimateOptionDelta(card, best.opt) ? e : best
    );
  } else if (AUTO.mode === 'maximizer' && eligible.length) {
    const tgt = AUTO.targetCategory || CATEGORIES[0];
    chosen = eligible.reduce((best, e) =>
      estimateOptionDeltaMaximizer(card, e.opt, tgt) >= estimateOptionDeltaMaximizer(card, best.opt, tgt) ? e : best
    );
  } else {
    chosen = eligible.length ? randFrom(eligible) : { oi: 0 };
  }
  G.selectedOption = chosen.oi;

  // Track card, option, and tag plays (per mode)
  const ms = AUTO.stats[AUTO.mode];
  ms.cardPlays[card.id] = (ms.cardPlays[card.id] || 0) + 1;
  const optKey = `${card.id}:${chosen.oi}`;
  ms.optionPlays[optKey] = (ms.optionPlays[optKey] || 0) + 1;
  (card.tags || []).forEach(tag => { ms.tagPlays[tag] = (ms.tagPlays[tag] || 0) + 1; });

  confirmPlay();
}

function resolveAutoPendingAction() {
  const action = G.pendingAction;
  const { type, card } = action;

  const smart = AUTO.mode === 'generalist' || AUTO.mode === 'maximizer';
  const isMaximizer = AUTO.mode === 'maximizer';
  const tgtCat = AUTO.targetCategory || CATEGORIES[0];

  // Helper: category with highest score (most buffer, best candidate to absorb instability)
  const highestScoreCat = cats => cats.reduce((a, b) => categoryScore(b) > categoryScore(a) ? b : a);
  // Helper: category with lowest score (most at risk — instability should be removed from here first)
  const lowestScoreCat = cats => cats.reduce((a, b) => categoryScore(b) < categoryScore(a) ? b : a);
  // Helper: instability pile with highest total value (remove from here first)
  const mostInstabCat = cats => cats.reduce((a, b) => {
    const sum = c => G.categories[c].instability.reduce((n, x) => n + (x.value || 0), 0);
    return sum(b) > sum(a) ? b : a;
  });
  // Maximizer helper: prefer target category if present in list, else fall back to fn(cats)
  const preferTarget = (cats, fallback) => (isMaximizer && cats.includes(tgtCat)) ? tgtCat : fallback(cats);
  // Maximizer helper: avoid target category — pick from non-target first, else use fn
  const avoidTarget = (cats, fallback) => {
    if (!isMaximizer) return fallback(cats);
    const nonTgt = cats.filter(c => c !== tgtCat);
    return nonTgt.length ? fallback(nonTgt) : fallback(cats);
  };

  // Hand discard routing (multi-discardTo modal)
  if (action.routingCard) {
    const dests = action.routingCard.discardTo;
    let dest;
    if (smart && dests && dests.length) {
      // Prefer shuffle_to_deck; among instability targets pick highest-score non-target category
      const shuffleDest = dests.find(d => d.target === 'shuffle_to_deck');
      if (shuffleDest) {
        dest = shuffleDest;
      } else {
        const instabDests = dests.filter(d => d.target.endsWith('_instability'));
        if (instabDests.length) {
          // Maximizer: avoid dumping into target category instability
          const safe = isMaximizer ? instabDests.filter(d => !d.target.startsWith(tgtCat)) : instabDests;
          const pool = safe.length ? safe : instabDests;
          dest = pool.reduce((best, d) => {
            const cat = d.target.replace('_instability', '');
            const bestCat = best.target.replace('_instability', '');
            return categoryScore(cat) > categoryScore(bestCat) ? d : best;
          });
        } else {
          dest = randFrom(dests);
        }
      }
    } else {
      dest = dests && dests.length ? randFrom(dests) : { target: 'shuffle_to_deck' };
    }
    resolveHandDiscardDest(dest.target);
    return;
  }

  switch (type) {
    case 'stack_self_on_any': {
      const cats = action.choices || CATEGORIES;
      if (smart) {
        // Maximizer: prefer target category if available; else highest-score category
        const best = preferTarget(cats, highestScoreCat);
        resolveStackOnAny(best);
      } else {
        resolveStackOnAny(randFrom(cats));
      }
      break;
    }
    case 'replace_or_stack': {
      resolveReplaceOrStack('replace');
      break;
    }
    case 'discard_replaced_card': {
      const dests = card.discardTo;
      let dest;
      if (smart && dests && dests.length) {
        const shuffleDest = dests.find(d => d.target === 'shuffle_to_deck');
        if (shuffleDest) {
          dest = shuffleDest;
        } else {
          const instabDests = dests.filter(d => d.target.endsWith('_instability'));
          if (instabDests.length) {
            const safe = isMaximizer ? instabDests.filter(d => !d.target.startsWith(tgtCat)) : instabDests;
            const pool = safe.length ? safe : instabDests;
            dest = pool.reduce((best, d) => {
              const cat = d.target.replace('_instability', '');
              const bestCat = best.target.replace('_instability', '');
              return categoryScore(cat) > categoryScore(bestCat) ? d : best;
            });
          } else { dest = randFrom(dests); }
        }
      } else {
        dest = dests && dests.length ? randFrom(dests) : { target: 'shuffle_to_deck' };
      }
      resolveDiscardReplaced(dest.target);
      break;
    }
    case 'discard_hand_cards': {
      if (!G.hand.length) {
        // Nothing left to discard — force chain to continue
        action.remaining = 0;
        continueHandDiscardChain();
        break;
      }
      if (smart) {
        // Discard the hand card with the lowest estimated value (hazards > resources)
        let worstIdx = 0;
        let worstDelta = Infinity;
        G.hand.forEach((hc, i) => {
          const hasInstab = (hc.discardTo || []).some(d => d.target.endsWith('_instability'));
          const delta = hasInstab ? -(hc.value || 0) * 2.5 : (hc.value || 0);
          if (delta < worstDelta) { worstDelta = delta; worstIdx = i; }
        });
        pickDiscardHand(worstIdx);
      } else {
        pickDiscardHand(Math.floor(Math.random() * G.hand.length));
      }
      break;
    }
    case 'remove_instability': {
      const filter = action.filter;
      const eligible = filter
        ? (G.categories[filter].instability.length ? [filter] : [])
        : CATEGORIES.filter(c => G.categories[c].instability.length > 0);
      if (!eligible.length) {
        G.pendingAction = null;
        applyCardSelfDiscard(card);
        afterCardResolved();
        break;
      }
      // Maximize: remove from the most dangerous pile (lowest score = most at risk)
      const target = smart ? preferTarget(eligible, lowestScoreCat) : randFrom(eligible);
      resolveRemoveInstability(target, action.maxRemove);
      break;
    }
    case 'remove_lowest_instability': {
      const eligible = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
      if (!eligible.length) { G.pendingAction = null; applyCardSelfDiscard(card); afterCardResolved(); break; }
      resolveRemoveLowestInstability(smart ? preferTarget(eligible, lowestScoreCat) : randFrom(eligible));
      break;
    }
    case 'move_instability_src': {
      const eligible = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
      if (!eligible.length) { G.pendingAction = null; applyCardSelfDiscard(card); afterCardResolved(); break; }
      // Move FROM the category with highest total instability (relieve most pressure)
      resolveMoveInstabilitySrc(smart ? mostInstabCat(eligible) : randFrom(eligible));
      break;
    }
    case 'move_instability_dest': {
      const opts = CATEGORIES.filter(c => c !== action.srcCat);
      // Dump into highest-score category (most buffer); maximizer avoids target category
      resolveMoveInstabilityDest(smart ? avoidTarget(opts, highestScoreCat) : randFrom(opts));
      break;
    }
    case 'remove_two_instability': {
      const picked = action.picked || [];
      const eligible = CATEGORIES.filter(c => G.categories[c].instability.length > 0 && !picked.includes(c));
      if (!eligible.length) { G.pendingAction = null; applyCardSelfDiscard(card); afterCardResolved(); break; }
      pickTwoInstability(smart ? preferTarget(eligible, lowestScoreCat) : randFrom(eligible));
      break;
    }
    case 'take_resource_to_economy': {
      const cats = action.sourceCategories.filter(c => G.categories[c].stack.length > 0);
      if (!cats.length) { G.pendingAction = null; applyCardSelfDiscard(card); afterCardResolved(); break; }
      // Take from highest-score category (can afford it); maximizer avoids target category
      const cat = smart ? avoidTarget(cats, highestScoreCat) : randFrom(cats);
      const idx = Math.floor(Math.random() * G.categories[cat].stack.length);
      resolveTakeResource(cat, idx);
      break;
    }
    case 'restitution_pick_resource': {
      const eligible = CATEGORIES.filter(c => G.categories[c].stack.length > 0);
      if (!eligible.length) { proceedToRestitutionInstability(); break; }
      resolvePickAnyResource(smart ? avoidTarget(eligible, highestScoreCat) : randFrom(eligible));
      break;
    }
    case 'managed_pick_newest_res': {
      const eligible = CATEGORIES.filter(c => G.categories[c].stack.length > 0);
      if (!eligible.length) {
        G.pendingAction = { type: 'managed_pick_instab', card, remaining: 1 };
        render(); showManagedInstabModal(card, 1); break;
      }
      resolvePickNewestResource(smart ? avoidTarget(eligible, highestScoreCat) : randFrom(eligible));
      break;
    }
    case 'managed_pick_instab': {
      const eligible = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
      if (!eligible.length) {
        G.pendingAction = null;
        G.deck.push(card);
        addLog(`${card.name} placed at bottom of deck.`);
        afterCardResolved(); break;
      }
      resolveManagedInstab(smart ? preferTarget(eligible, lowestScoreCat) : randFrom(eligible));
      break;
    }
    case 'rationalize_strip_pick': {
      const eligible = CATEGORIES.filter(c => G.categories[c].stack.length >= 2);
      if (!eligible.length) { showStripStackModal(card); break; }
      // Strip highest-score (most redundant); maximizer strips non-target first
      resolveStripStack(smart ? avoidTarget(eligible, highestScoreCat) : randFrom(eligible));
      break;
    }
    case 'rationalize_res_pick': {
      const eligible = CATEGORIES.filter(c => G.categories[c].stack.length > 0);
      if (!eligible.length) {
        G.pendingAction = { type: 'rationalize_instab_pick', card };
        render(); showRationalizeInstabModal(card); break;
      }
      resolveRationalizeRes(smart ? avoidTarget(eligible, highestScoreCat) : randFrom(eligible));
      break;
    }
    case 'rationalize_instab_pick': {
      const eligible = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
      if (!eligible.length) {
        G.pendingAction = null;
        G.deck.push(card);
        addLog(`${card.name} placed at bottom of deck.`);
        afterCardResolved(); break;
      }
      resolveRationalizeInstab(smart ? preferTarget(eligible, lowestScoreCat) : randFrom(eligible));
      break;
    }
    case 'austerity_pick_res': {
      const eligible = CATEGORIES.filter(c => G.categories[c].stack.length > 0);
      if (!eligible.length) {
        G.pendingAction = { type: 'austerity_pick_pile', card };
        render(); showAusterityClearPileModal(card); break;
      }
      resolveAusterityRes(smart ? avoidTarget(eligible, highestScoreCat) : randFrom(eligible));
      break;
    }
    case 'austerity_pick_pile': {
      const eligible = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
      if (!eligible.length) {
        G.pendingAction = null;
        G.deck.push(card);
        addLog(`${card.name} placed at bottom of deck.`);
        afterCardResolved(); break;
      }
      // Clear the pile with highest total instability; maximizer prioritises target category pile
      const pileVal = c => G.categories[c].instability.reduce((n, rc) => n + (rc.value || 0), 0);
      const bestPile = smart
        ? preferTarget(eligible, cats => cats.reduce((a, b) => pileVal(b) > pileVal(a) ? b : a))
        : randFrom(eligible);
      resolveAusterityClearPile(bestPile);
      break;
    }
    case 'move_resource_pick_source': {
      const srcs = CATEGORIES.filter(c => G.categories[c].stack.length >= 1);
      if (!srcs.length) { G.pendingAction = null; applyCardSelfDiscard(card); afterCardResolved(); break; }
      resolveMoveResourceSrc(smart ? avoidTarget(srcs, highestScoreCat) : randFrom(srcs));
      break;
    }
    case 'move_resource_pick_target': {
      const { srcCat } = action;
      const tgts = CATEGORIES.filter(c => c !== srcCat && G.categories[c].stack.length === 1);
      if (!tgts.length) { G.pendingAction = null; G.deck.push(card); addLog(`${card.name} placed at bottom of deck.`); afterCardResolved(); break; }
      resolveMoveResourceTgt(smart ? preferTarget(tgts, highestScoreCat) : randFrom(tgts));
      break;
    }
    case 'move_newest_res_any_src': {
      const srcs = CATEGORIES.filter(c => G.categories[c].stack.length >= 1);
      if (!srcs.length) { G.pendingAction = null; applyCardSelfDiscard(card); afterCardResolved(); break; }
      resolveMoveNewestResSrc(smart ? avoidTarget(srcs, highestScoreCat) : randFrom(srcs));
      break;
    }
    case 'move_newest_res_any_tgt': {
      const { srcCat } = action;
      const tgts = CATEGORIES.filter(c => c !== srcCat);
      if (!tgts.length) { G.pendingAction = null; G.deck.push(card); addLog(`${card.name} placed at bottom of deck.`); afterCardResolved(); break; }
      resolveMoveNewestResTgt(smart ? preferTarget(tgts, highestScoreCat) : randFrom(tgts));
      break;
    }
    case 'move_newest_instab_src': {
      const srcs = CATEGORIES.filter(c => G.categories[c].instability.length >= 1);
      if (!srcs.length) { G.pendingAction = null; applyCardSelfDiscard(card); afterCardResolved(); break; }
      resolveMoveNewestInstabSrc(smart ? mostInstabCat(srcs) : randFrom(srcs));
      break;
    }
    case 'move_newest_instab_tgt': {
      const { srcCat } = action;
      const tgts = CATEGORIES.filter(c => c !== srcCat);
      if (!tgts.length) { G.pendingAction = null; G.deck.push(card); addLog(`${card.name} placed at bottom of deck.`); afterCardResolved(); break; }
      // Dump instability into category with most buffer; maximizer avoids target category
      resolveMoveNewestInstabTgt(smart ? avoidTarget(tgts, highestScoreCat) : randFrom(tgts));
      break;
    }
    case 'mvr_instab__res_src': {
      const srcs = CATEGORIES.filter(c => G.categories[c].stack.length >= 1);
      if (!srcs.length) { G.pendingAction = null; applyCardSelfDiscard(card); afterCardResolved(); break; }
      resolveMvrInstabResSrc(smart ? avoidTarget(srcs, highestScoreCat) : randFrom(srcs));
      break;
    }
    case 'mvr_instab__res_tgt': {
      const { srcCat } = action;
      const tgts = CATEGORIES.filter(c => c !== srcCat);
      if (!tgts.length) { G.pendingAction = null; G.deck.push(card); addLog(`${card.name} placed at bottom of deck.`); afterCardResolved(); break; }
      resolveMvrInstabResTgt(smart ? preferTarget(tgts, highestScoreCat) : randFrom(tgts));
      break;
    }
    case 'mvr_instab__instab_src': {
      const srcs = CATEGORIES.filter(c => G.categories[c].instability.length >= 1);
      if (!srcs.length) { G.pendingAction = null; G.deck.push(card); addLog(`${card.name} placed at bottom of deck.`); afterCardResolved(); break; }
      resolveMvrInstabInstabSrc(smart ? mostInstabCat(srcs) : randFrom(srcs));
      break;
    }
    case 'mvr_instab__instab_tgt': {
      const { instabSrcCat } = action;
      const tgts = CATEGORIES.filter(c => c !== instabSrcCat);
      if (!tgts.length) { G.pendingAction = null; G.deck.push(card); addLog(`${card.name} placed at bottom of deck.`); afterCardResolved(); break; }
      resolveMvrInstabInstabTgt(smart ? avoidTarget(tgts, highestScoreCat) : randFrom(tgts));
      break;
    }
    case 'rmr_instab__res_src': {
      const srcs = CATEGORIES.filter(c => G.categories[c].stack.length >= 1);
      if (!srcs.length) { G.pendingAction = null; applyCardSelfDiscard(card); afterCardResolved(); break; }
      resolveRmrInstabResSrc(smart ? avoidTarget(srcs, highestScoreCat) : randFrom(srcs));
      break;
    }
    case 'rmr_instab__instab_src': {
      const srcs = CATEGORIES.filter(c => G.categories[c].instability.length >= 1);
      if (!srcs.length) { G.pendingAction = null; G.deck.push(card); addLog(`${card.name} placed at bottom of deck.`); afterCardResolved(); break; }
      resolveRmrInstabInstabSrc(smart ? preferTarget(srcs, lowestScoreCat) : randFrom(srcs));
      break;
    }
    default: {
      // All remove_stack_* types auto-resolve through showRemoveStackModal
      if (action.sourceCategory) {
        showRemoveStackModal(card, action.sourceCategory, action.targetCategory || null);
      } else {
        G.pendingAction = null;
        applyCardSelfDiscard(card);
        afterCardResolved();
      }
      break;
    }
  }
}

// ─── Card Library ─────────────────────────────────────────────────────────────

function showLibrary() {
  // Build sorted unique card list from active deck
  const activeDeck = typeof LEAN_DECK !== 'undefined' ? LEAN_DECK : STARTER_DECK;
  const seen = new Set();
  const counts = {};
  activeDeck.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
  const uniqueIds = activeDeck.filter(id => { if (seen.has(id)) return false; seen.add(id); return true; });
  const cards = uniqueIds
    .map(id => CARDS.find(c => c.id === id))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  const subtitle = document.getElementById('library-subtitle');
  subtitle.textContent = `${cards.length} unique cards · ${activeDeck.length} total in deck`;

  const ROW_SIZE = 8;
  let html = '';
  for (let r = 0; r < cards.length; r += ROW_SIZE) {
    const row = cards.slice(r, r + ROW_SIZE);
    html += `<div class="lib-row">`;
    row.forEach(card => {
      const color = card.category ? CAT_COLORS[card.category] : '#777';
      const tintClass = card.type === 'category' ? 'card-tint-gold'
        : card.subtype === 'stacking' ? 'card-tint-green'
        : card.subtype === 'hazard' ? 'card-tint-red'
        : '';
      const subtypeLabel = card.subtype ? ` · ${cap(card.subtype)}` : '';
      const typeLabel = card.type === 'event'
        ? `Event${subtypeLabel}`
        : `${cap(card.category || '')} Identity`;
      const effectSummary = (card.options || []).map(o =>
        `<div class="hc-opt"><span class="hc-opt-label">${o.label}:</span> ${o.description}</div>`
      ).join('');
      const libTagsHTML = (card.tags || []).map(t => {
        const CATEGORY_TAGS = new Set(['governance','economy','culture','military','technology','environment']);
        const cls = t === 'hostile' ? ' hc-tag-hostile' : t === 'event' ? ' hc-tag-event' : t === 'exchange' ? ' hc-tag-exchange' : CATEGORY_TAGS.has(t) ? ` hc-tag-${t}` : '';
        return `<span class="hc-tag${cls}">${t}</span>`;
      }).join('');
      const copiesBadge = counts[card.id] > 1
        ? `<div class="lib-copies-badge">×${counts[card.id]}</div>` : '';
      html += `
        <div class="hand-card ${card.type === 'event' ? 'event-card' : ''} ${tintClass} lib-hand-card"
             style="--cat-color:${color}"
             onclick="selectLibraryCard('${card.id}')">
          ${copiesBadge}
          <div class="hc-header">
            <span class="hc-type">${typeLabel}</span>
            ${card.value > 0 ? `<span class="hc-val-badge">+${card.value}</span>` : ''}
          </div>
          ${libTagsHTML ? `<div class="hc-tags">${libTagsHTML}</div>` : ''}
          <div class="hc-name">${card.name}</div>
          <div class="hc-art"></div>
          <div class="hc-effects">${effectSummary}</div>
          ${card.requires ? `<div class="hc-req-tag">${buildReqText(card)}</div>` : ''}
          ${card.mustPlayWhenDrawn || card.subtype === 'hazard' ? '<div class="hc-must-play">⚠ Must play when drawn</div>' : ''}
          <div class="hc-flavor">${card.flavorText || ''}</div>
        </div>`;
    });
    html += `</div>`;
  }

  document.getElementById('library-grid').innerHTML = html;
  document.getElementById('library-overlay').classList.remove('hidden');
  document.getElementById('lib-float').classList.add('hidden');
}

function selectLibraryCard(id) {
  const card = CARDS.find(c => c.id === id);
  if (!card) return;

  document.querySelectorAll('.lib-hand-card').forEach(el => el.classList.remove('lib-selected'));
  document.querySelectorAll(`.lib-hand-card[onclick="selectLibraryCard('${id}')"]`)
    .forEach(el => el.classList.add('lib-selected'));

  const color = card.category ? CAT_COLORS[card.category] : '#888';
  document.getElementById('lib-float-detail').innerHTML =
    renderDetailFrame(card, color, 'Card Library', /*readonly*/true);
  document.getElementById('lib-float').classList.remove('hidden');
}

function closeLibraryFloat() {
  document.getElementById('lib-float').classList.add('hidden');
  document.querySelectorAll('.lib-hand-card').forEach(el => el.classList.remove('lib-selected'));
}

function closeLibrary() {
  document.getElementById('library-overlay').classList.add('hidden');
  document.getElementById('lib-float').classList.add('hidden');
}

// ─── Global onclick bridges (for inline onclick in innerHTML) ─────────────────

window.resolvePickAnyResource = resolvePickAnyResource;
window.toggleHandMinimize = toggleHandMinimize;
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
window.resolvePickNewestResource = resolvePickNewestResource;
window.resolveManagedInstab = resolveManagedInstab;
window.resolveStripStack = resolveStripStack;
window.resolveRationalizeRes = resolveRationalizeRes;
window.resolveRationalizeInstab = resolveRationalizeInstab;
window.resolveAusterityRes = resolveAusterityRes;
window.resolveAusterityClearPile = resolveAusterityClearPile;
window.resolveRemoveStackCard = resolveRemoveStackCard;
window.resolveReplaceOrStack = resolveReplaceOrStack;
window.resolveMoveNewestInstabTgt = resolveMoveNewestInstabTgt;
window.resolveMvrInstabInstabTgt = resolveMvrInstabInstabTgt;
window.resolveMoveResourceSrc = resolveMoveResourceSrc;
window.resolveMoveResourceTgt = resolveMoveResourceTgt;
window.resolveMoveNewestResSrc = resolveMoveNewestResSrc;
window.resolveMoveNewestResTgt = resolveMoveNewestResTgt;
window.resolveMoveNewestInstabSrc = resolveMoveNewestInstabSrc;
window.resolveMvrInstabResSrc = resolveMvrInstabResSrc;
window.resolveMvrInstabResTgt = resolveMvrInstabResTgt;
window.resolveMvrInstabInstabSrc = resolveMvrInstabInstabSrc;
window.resolveRmrInstabResSrc = resolveRmrInstabResSrc;
window.resolveRmrInstabInstabSrc = resolveRmrInstabInstabSrc;
window.resolveTakeResource = resolveTakeResource;
window.resolveRemoveLowestInstability = resolveRemoveLowestInstability;
window.resolveMoveInstabilitySrc = resolveMoveInstabilitySrc;
window.resolveMoveInstabilityDest = resolveMoveInstabilityDest;
window.startGame = startGame;
window.toggleAutoplay = toggleAutoplay;
window.setAutoSpeed = setAutoSpeed;
window.setAutoMode = setAutoMode;
window.resetAutoStats = resetAutoStats;
window.startBatchRun = startBatchRun;
window.exportAutoStats = exportAutoStats;
window.showLibrary = showLibrary;
window.selectLibraryCard = selectLibraryCard;
window.closeLibraryFloat = closeLibraryFloat;
window.closeLibrary = closeLibrary;

// ─── Save / Load ──────────────────────────────────────────────────────────────

const SAVE_KEY = 'governance_save';

function saveGame() {
  if (AUTO.running) return;
  if (!G || G.log.length <= 1) return; // don't save a brand-new untouched game
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(G));
  } catch (e) { console.warn('Save failed:', e); }
}

function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function resumeGame(saved) {
  closeModal();
  G = saved;
  addLog('Session resumed.');
  render();
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function startGame() {
  closeModal();
  clearSave();
  G = newGameState();
  addLog('Game started. Play cards freely — use Pass Turn to draw and end your turn.');
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = loadSavedState();
  const hasProgress = saved && !saved.phase && (saved.log.length > 1 || saved.turn > 1);
  if (hasProgress) {
    G = saved;
    render();
    openModal(`
      <div class="modal-card-name" style="margin-bottom:12px">Resume Session?</div>
      <p class="modal-sub">Turn ${saved.turn} — ${saved.hand.length} cards in hand, ${saved.deck.length} in deck.</p>
      <div class="opt-list" style="margin-top:14px">
        <button class="opt-btn" onclick="closeModal()">
          <strong>Resume</strong>
          <small>Continue from where you left off</small>
        </button>
        <button class="opt-btn" onclick="startGame()">
          <strong>New Game</strong>
          <small>Discard saved session and start fresh</small>
        </button>
      </div>
    `);
  } else {
    startGame();
  }
});
