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
    deck, discard: [], hand, categories,
    turn: 1,
    log: [],
    pendingAction: null,
    selectedCardIndex: null,  // index into G.hand (play mode)
    selectedOption: 0,
    viewingCard: null,        // { card, location } for inspecting in-play cards
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
    if (!G.discard.length) { addLog('No cards remain anywhere.'); return; }
    G.deck = buildDeck(G.discard.map(c => c.id));
    G.discard = [];
    addLog('Draw pile empty — discard reshuffled into deck.');
  }
  const card = G.deck.shift();
  G.hand.push(card);
  addLog(`Drew: ${card.name}`);
}

// ─── Selection ────────────────────────────────────────────────────────────────

function selectCard(i) {
  if (G.pendingAction) return;
  G.viewingCard = null;
  G.selectedCardIndex = (G.selectedCardIndex === i) ? null : i;
  G.selectedOption = 0;
  render();
}

function deselectCard() {
  G.selectedCardIndex = null;
  G.selectedOption = 0;
  render();
}

function setSelectedOption(i) {
  G.selectedOption = i;
  renderCardDetail();
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

  G.hand.splice(i, 1);
  G.selectedCardIndex = null;

  const opt = card.options[G.selectedOption] || card.options[0];

  if (card.type === 'category') {
    applyCategoryCard(card, opt);
  } else {
    resolveEventCard(card, opt);
  }

  G.selectedOption = 0;
  afterCardResolved();
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

function canPlayCard(card) {
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

  // Stack bonus (no replacement)
  if (opt.effect === 'stack_bonus') {
    G.categories[cat].stack.push(card);
    addLog(`${card.name} (+${card.value}) stacked on ${cat} as bonus.`);
    if (opt.soloBonus) { triggerSoloBonusModal(card.name, opt.soloBonus); return; }
    return;
  }

  // Stack bonus on any chosen category
  if (opt.effect === 'stack_bonus_any') {
    G.pendingAction = { type: 'stack_self_on_any', card };
    render(); showStackOnAnyModal(card, card.value); return;
  }

  const catState = G.categories[cat];
  const prev = catState.active;

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
  addLog(`${card.name} (+${card.value}) is now your active ${cat} card.`);

  // Handle solo bonus for Alliance opt 1
  if (opt.effect === 'replace_plus_solo_bonus') {
    handleOldCard(prev, cat, opt);
    G.pendingAction = { type: 'solo_bonus', card, bonusValue: opt.soloBonus || 1 };
    render(); showSoloBonusModal(card.name, opt.soloBonus || 1); return;
  }

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
  }
}

function applyDiscardDest(card, target, bonus) {
  if (target === 'shuffle_to_deck') {
    G.deck.push(card); shuffle(G.deck);
    addLog(`${card.name} shuffled into deck.`);
  } else if (target === 'discard_pile') {
    G.discard.push(card);
    addLog(`${card.name} discarded.`);
  } else if (target.endsWith('_instability')) {
    const cat = target.replace('_instability', '');
    G.categories[cat].instability.push(card);
    addLog(`${card.name} → ${cat} instability.`);
  } else {
    G.discard.push(card);
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

    case 'stack_on_category':
      G.categories[opt.targetCategory].stack.push(card);
      addLog(`${card.name} (+${card.value}) stacked on ${opt.targetCategory}.`);
      applyEventDiscard(card);
      break;

    case 'stack_on_any_modal':
      G.pendingAction = { type: 'stack_self_on_any', card, bonusValue: opt.bonusValue };
      render(); showStackOnAnyModal(card, opt.bonusValue); return;

    case 'place_self_to_instability': {
      const cat = opt.targetInstability;
      G.categories[cat].instability.push(card);
      addLog(`${card.name} → ${cat} instability (−${card.value}).`);
      break;
    }

    case 'suppress_hazard': {
      const marker = makeMarker(`${card.name} Suppressed`, opt.altValue || 1);
      G.categories[opt.altInstability].instability.push(marker);
      G.discard.push(card);
      addLog(`${card.name} suppressed — ${opt.altInstability} −${opt.altValue}.`);
      break;
    }

    case 'remove_instability_modal':
      G.pendingAction = { type: 'remove_instability', card, maxRemove: opt.maxRemove || 1, filter: opt.targetCategory || null };
      render(); showInstabilityModal(card, opt.maxRemove || 1, opt.targetCategory || null); return;

    case 'remove_two_instability_modal':
      G.pendingAction = { type: 'remove_two_instability', card, picked: [] };
      render(); showTwoInstabilityModal(card); return;

    case 'remove_instability_if': {
      const condMet = opt.condition ? checkCondition(opt.condition) : true;
      if (condMet) {
        const pile = G.categories[opt.instabilityCategory].instability;
        if (pile.length) {
          const removed = pile.shift();
          G.deck.push(removed); shuffle(G.deck);
          addLog(`${card.name}: ${removed.name} removed from ${opt.instabilityCategory} instability → deck.`);
        } else {
          addLog(`${card.name}: No ${opt.instabilityCategory} instability to remove.`);
        }
      } else {
        addLog(`${card.name}: Condition not met — no effect.`);
      }
      applyEventDiscard(card);
      break;
    }

    case 'solo_draw_to_stack': {
      const drawn = G.deck.shift();
      if (drawn) {
        G.categories[opt.targetCategory].stack.push(drawn);
        addLog(`Occupation: ${drawn.name} added to ${opt.targetCategory} stack.`);
      }
      applyEventDiscard(card);
      break;
    }

    case 'add_instability_pressure': {
      const m = makeMarker('External Pressure', opt.pressureValue || 1);
      G.categories[opt.targetInstability].instability.push(m);
      addLog(`Incursion: ${opt.targetInstability} −${opt.pressureValue}.`);
      applyEventDiscard(card);
      break;
    }

    default:
      G.discard.push(card);
      addLog(`${card.name} discarded.`);
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
    G.discard.push(card);
    G.pendingAction = null;
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
    G.discard.push(card);
    G.pendingAction = null;
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
  G.discard.push(action.card);
  G.pendingAction = null;
  afterCardResolved();
}

function resolveRemoveInstability(cat, maxRemove) {
  closeModal();
  const { card } = G.pendingAction;
  const pile = G.categories[cat].instability;
  const removed = [];
  for (let i = 0; i < maxRemove && pile.length; i++) removed.push(pile.shift());
  removed.forEach(c => { G.deck.push(c); });
  shuffle(G.deck);
  addLog(`${removed.map(c => c.name).join(', ')} removed from ${cat} instability → deck.`);
  G.discard.push(card);
  G.pendingAction = null;
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

function showSoloBonusModal(sourceName, bonusValue) {
  const btns = CATEGORIES.map(cat => {
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveSoloBonus('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Current score: ${categoryScore(cat)}</small>
    </button>`;
  }).join('');
  openModal(`
    <div class="modal-card-name">${sourceName} — Solo Bonus</div>
    <p class="modal-sub">Add +${bonusValue} bonus to which category?</p>
    <div class="opt-list">${btns}</div>
  `);
}

function resolveSoloBonus(cat) {
  closeModal();
  const { card, bonusValue } = G.pendingAction;
  const val = bonusValue || 1;
  const m = makeMarker(`${card.name} Bonus`, val);
  G.categories[cat].stack.push(m);
  addLog(`${card.name}: +${val} bonus added to ${cat}.`);
  G.pendingAction = null;
  afterCardResolved();
}

function triggerSoloBonusModal(name, val) {
  G.pendingAction = { type: 'solo_bonus', bonusValue: val };
  render(); showSoloBonusModal(name, val);
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
  return false;
}

function addLog(msg) {
  G.log.unshift(`T${G.turn}: ${msg}`);
  if (G.log.length > 60) G.log.pop();
}

function afterCardResolved() {
  if (G.pendingAction) return;
  G.selectedCardIndex = null;
  G.selectedOption = 0;
  G.viewingCard = null;

  const end = checkEndConditions();
  if (end) { G.phase = end.result; render(); showEndModal(end); return; }

  G.turn++;
  drawCard();
  render();
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
        <div class="ipc-value" style="color:${color}">+${s.active.value}</div>
        ${s.active.passiveEffect ? '<div class="ipc-passive">Passive</div>' : ''}
      </div>`;
    }

    // Stack HTML
    let stackHTML = '';
    if (s.stack.length) {
      stackHTML = `<div class="cat-section-label">Event Stack</div>
        <div class="cat-stack">
          ${s.stack.map((c, i) => `
            <div class="stack-chip" style="color:${color}" onclick="viewCard_stack('${cat}',${i})" title="${c.name}">
              +${c.value} <span class="chip-name">${c.name}</span>
            </div>`).join('')}
        </div>`;
    }

    // Instability HTML
    let instabHTML = `<div class="instab-empty">No instability</div>`;
    if (s.instability.length) {
      instabHTML = s.instability.map((c, i) => `
        <div class="instab-chip" onclick="viewCard_instab('${cat}',${i})" title="${c.name}">−${c.value}</div>
      `).join('');
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
      <div class="cat-section-label">Active Card</div>
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

    const el = document.createElement('div');
    el.className = ['hand-card', card.type === 'event' ? 'event-card' : '', !playable ? 'unplayable' : '', selected ? 'selected' : ''].filter(Boolean).join(' ');
    el.style.setProperty('--cat-color', color);

    const subtypeLabel = card.subtype ? ` · ${cap(card.subtype)}` : '';
    const typeLabel = card.type === 'event'
      ? `Event${subtypeLabel}`
      : `${cap(card.category || '')} Card`;

    const effectSummary = (card.options || []).map(o =>
      `<div class="hc-opt"><span class="hc-opt-label">${o.label}:</span> ${o.description}</div>`
    ).join('');

    el.innerHTML = `
      <div class="hc-header">
        <span class="hc-type">${typeLabel}</span>
        ${card.value > 0 ? `<span class="hc-val-badge" style="background:${color}22;color:${color};border-color:${color}55">+${card.value}</span>` : ''}
      </div>
      <div class="hc-name">${card.name}</div>
      <div class="hc-art"></div>
      <div class="hc-effects">${effectSummary}</div>
      ${card.requires ? `<div class="hc-req-tag">${buildReqText(card)}</div>` : ''}
      ${!playable ? '<div class="hc-unplayable">Requirements not met</div>' : ''}
      <div class="hc-flavor">${card.flavorText || ''}</div>
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

  // View mode: inspecting an in-play card
  if (G.viewingCard) {
    const { card, location } = G.viewingCard;
    const color = card.category ? CAT_COLORS[card.category] : '#888';
    body.innerHTML = renderDetailFrame(card, color, location, /*readonly*/true);
    actions.innerHTML = `<button class="deselect-btn" onclick="clearView()">Close</button>`;
    return;
  }

  // Play mode: hand card selected
  const i = G.selectedCardIndex;
  if (i !== null && G.hand[i]) {
    const card = G.hand[i];
    const color = card.category ? CAT_COLORS[card.category] : '#888';
    const playable = canPlayCard(card);
    body.innerHTML = renderDetailFrame(card, color, 'In your hand', /*readonly*/false);
    actions.innerHTML = `
      <button class="confirm-btn${!playable ? ' confirm-disabled' : ''}" onclick="confirmPlay()" ${!playable ? 'disabled' : ''}>
        Confirm Play
      </button>
      <button class="deselect-btn" onclick="deselectCard()">Deselect</button>
    `;
    return;
  }

  // Idle
  body.innerHTML = `<div class="detail-empty">Click any card — in your hand or in play — to inspect it here.</div>`;
  actions.innerHTML = '';
}

function renderDetailFrame(card, color, location, readonly) {
  const subtypeLabel = card.subtype ? ` · ${cap(card.subtype)}` : '';
  const typeStr = card.type === 'event'
    ? `Event Card${subtypeLabel}`
    : `${cap(card.category || '')} Card`;

  const reqHTML = card.requires ? `
    <div class="detail-requires ${canPlayCard(card) ? 'req-met' : 'req-unmet'}">
      <span class="detail-section-label">Requires</span>
      <div>${buildReqText(card)}</div>
    </div>` : '';

  let optionsHTML = '';
  if (card.options?.length) {
    optionsHTML = `<div class="detail-section-label">Play Options</div><div class="detail-opts">`;
    card.options.forEach((opt, oi) => {
      const condMet = opt.condition ? checkCondition(opt.condition) : true;
      const isSelected = !readonly && G.selectedOption === oi;
      const unmetNote = opt.condition && !condMet
        ? `<span class="opt-cond-unmet">Condition not currently met — will apply fallback.</span>` : '';
      optionsHTML += `
        <div class="detail-opt${isSelected ? ' detail-opt-selected' : ''}${!condMet && opt.condition ? ' detail-opt-dimmed' : ''}"
             style="${isSelected ? `border-color:${color}` : ''}"
             ${readonly ? '' : `onclick="setSelectedOption(${oi})"`}>
          <div class="detail-opt-label">${opt.label}</div>
          <div class="detail-opt-desc">${opt.description} ${unmetNote}</div>
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
      ${reqHTML}
      ${optionsHTML}
      ${discardHTML}
      ${card.flavorText ? `<div class="detail-flavor">"${card.flavorText}"</div>` : ''}
    </div>`;
}

function renderDeckCount() {
  const el = document.getElementById('deck-count');
  if (el) el.textContent = `Turn ${G.turn} · Deck: ${G.deck.length} · Discard: ${G.discard.length}`;
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
window.resolveSoloBonus = resolveSoloBonus;
window.pickTwoInstability = pickTwoInstability;
window.startGame = startGame;

// ─── Init ─────────────────────────────────────────────────────────────────────

function startGame() {
  closeModal();
  G = newGameState();
  addLog('Game started. Select a card from your hand to begin.');
  render();
}

document.addEventListener('DOMContentLoaded', startGame);
