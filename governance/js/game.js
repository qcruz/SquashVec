// Governance — Game Engine (Solo Mode)
// Turn structure: Draw 1 card → Play 1 card → Resolve effects → Check win/lose

const CATEGORIES = ['governance', 'economy', 'culture', 'military', 'technology', 'environment'];
const BASE_SCORE = 10;
const WIN_SCORE = 20;
const LOSE_SCORE = 0;
const HAND_SIZE = 5;

// ─── State ────────────────────────────────────────────────────────────────────

let G = null; // game state

function newGameState() {
  const deck = buildDeck(STARTER_DECK);
  const hand = [];
  for (let i = 0; i < HAND_SIZE; i++) {
    if (deck.length > 0) hand.push(deck.shift());
  }

  const categories = {};
  CATEGORIES.forEach(cat => {
    categories[cat] = {
      active: null,         // card object or null
      bonusStack: [],       // array of card objects (add to score)
      instability: [],      // array of card objects (subtract from score)
    };
  });

  return {
    deck,
    discard: [],
    hand,
    categories,
    turn: 1,
    phase: 'play', // 'draw' | 'play' | 'resolve' | 'won' | 'lost'
    log: [],
    pendingAction: null, // for multi-step effects
  };
}

function buildDeck(ids) {
  const deck = ids.map(id => ({ ...CARD_MAP[id], instanceId: Math.random() }));
  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

function categoryScore(cat) {
  const s = G.categories[cat];
  const activeVal = s.active ? s.active.value : 0;
  const bonusVal = s.bonusStack.reduce((sum, c) => sum + (c.value || 0), 0);
  const instabilityVal = s.instability.reduce((sum, c) => sum + (c.value || 0), 0);
  return BASE_SCORE + activeVal + bonusVal - instabilityVal;
}

function checkEndConditions() {
  for (const cat of CATEGORIES) {
    const score = categoryScore(cat);
    if (score >= WIN_SCORE) return { result: 'won', category: cat };
    if (score <= LOSE_SCORE) return { result: 'lost', category: cat };
  }
  return null;
}

// ─── Draw Phase ───────────────────────────────────────────────────────────────

function drawCard() {
  if (G.deck.length === 0) {
    // Reshuffle discard into deck
    G.deck = buildDeck(G.discard.map(c => c.id));
    G.discard = [];
    addLog('Draw pile empty — discard reshuffled into deck.');
  }
  if (G.deck.length === 0) {
    addLog('No cards remain anywhere. Game continues with current hand.');
    return;
  }
  const card = G.deck.shift();
  G.hand.push(card);
  addLog(`Drew: ${card.name}`);
}

// ─── Play Phase ──────────────────────────────────────────────────────────────

// Called when user selects a card from hand to play
function playCard(handIndex) {
  const card = G.hand[handIndex];
  if (!card) return;

  // Check requirements
  const req = card.requires;
  if (req) {
    if (req.activeCardName) {
      const cat = card.options[0]?.targetCategory || card.category;
      if (!G.categories[cat].active || G.categories[cat].active.name !== req.activeCardName) {
        addLog(`Cannot play ${card.name}: requires ${req.activeCardName} as active ${cat}.`);
        return;
      }
    }
    if (req.categoryScore) {
      const score = categoryScore(req.categoryScore.category);
      if (score < req.categoryScore.min) {
        addLog(`Cannot play ${card.name}: requires ${req.categoryScore.category} score ≥ ${req.categoryScore.min} (current: ${score}).`);
        return;
      }
    }
  }

  // Remove from hand
  G.hand.splice(handIndex, 1);

  if (card.type === 'category') {
    if (card.options && card.options.length > 1) {
      // Needs option selection
      G.pendingAction = { type: 'choose_option', card, cardIndex: handIndex };
      render();
      showOptionModal(card);
      return;
    } else {
      // Single option — play directly
      applyCategoryCard(card, card.options[0]);
    }
  } else if (card.type === 'event') {
    resolveEvent(card);
  }

  afterCardPlayed();
}

function applyCategoryCard(card, option) {
  const cat = option.targetCategory || card.category;
  const catState = G.categories[cat];

  // Handle previous active
  const prev = catState.active;

  switch (option.effect) {
    case 'replace_discard_active':
      catState.active = card;
      if (prev) {
        // Previous active goes to that category's instability
        catState.instability.push(prev);
        addLog(`${prev.name} moved to ${cat} instability.`);
      }
      addLog(`${card.name} (+${card.value}) is now your active ${cat} card.`);
      break;

    case 'replace_shuffle_active_if': {
      const condMet = option.condition
        ? checkCondition(option.condition)
        : false;
      catState.active = card;
      if (prev) {
        if (condMet) {
          G.deck.unshift(prev); // shuffle to deck
          shuffleDeck();
          addLog(`${prev.name} shuffled back into the draw deck.`);
        } else {
          catState.instability.push(prev);
          addLog(`Condition not met. ${prev.name} moved to ${cat} instability.`);
        }
      }
      addLog(`${card.name} (+${card.value}) is now your active ${cat} card.`);
      break;
    }

    case 'replace_named_active_to_instability':
      catState.active = card;
      if (prev) {
        catState.instability.push(prev);
        addLog(`${prev.name} moved to ${cat} instability.`);
      }
      addLog(`${card.name} (+${card.value}) is now your active ${cat} card.`);
      break;

    case 'replace_discard_active_plus_solo_bonus':
      catState.active = card;
      if (prev) {
        catState.instability.push(prev);
        addLog(`${prev.name} moved to ${cat} instability.`);
      }
      addLog(`${card.name} (+${card.value}) is now your active ${cat} card.`);
      // Solo bonus: choose category to add +1
      G.pendingAction = { type: 'solo_bonus_1', source: card.name };
      render();
      showSoloBonusModal(card.name);
      return; // render handled separately

    case 'move_env_to_eco_stack': {
      // Move top environment card to economy bonus stack
      const envActive = G.categories['environment'].active;
      if (envActive) {
        G.categories['environment'].active = null;
        G.categories['economy'].bonusStack.push(envActive);
        addLog(`${envActive.name} moved from Environment to Economy bonus stack.`);
      }
      catState.active = card;
      if (prev) {
        catState.instability.push(prev);
      }
      addLog(`${card.name} (+${card.value}) is now your active economy card.`);
      break;
    }

    default:
      // Fallback: standard replace
      catState.active = card;
      if (prev) catState.instability.push(prev);
      addLog(`${card.name} played to ${cat}.`);
  }

  // Handle discard selection if needed (show modal)
  if (card.discardTo && card.discardTo.length > 1) {
    G.pendingAction = { type: 'choose_discard', card };
    render();
    showDiscardModal(card);
    return;
  } else if (card.discardTo && card.discardTo.length === 1) {
    // Auto-discard to only option
    // This applies to when the card ITSELF is discarded (not the previous active)
    // In our model, category cards stay in the stack; they're not "discarded"
    // No action needed here unless effect says to discard self
  }
}

function resolveEvent(card) {
  addLog(`Event: ${card.name}`);

  switch (card.effect) {
    case 'place_self_to_instability': {
      const cat = card.targetInstability.replace('_instability', '');
      G.categories[cat].instability.push(card);
      addLog(`${card.name} placed into ${cat} instability (-${card.value}).`);
      break;
    }

    case 'occupation':
    case 'incursion':
    case 'cultural_exchange': {
      // Show option modal for event choices
      G.pendingAction = { type: 'event_option', card };
      render();
      showEventOptionModal(card);
      return;
    }

    case 'revisionist_history': {
      G.pendingAction = { type: 'choose_instability_pile', card, maxRemove: 1, effect: 'shuffle_to_deck' };
      render();
      showInstabilityModal(card, 1, 'shuffle');
      return;
    }

    case 'contingency_planning': {
      G.pendingAction = { type: 'choose_instability_pile', card, maxRemove: 2, effect: 'shuffle_to_deck' };
      render();
      showInstabilityModal(card, 2, 'shuffle');
      return;
    }

    case 'inspiring_speech': {
      G.pendingAction = { type: 'add_self_to_stack', card };
      render();
      showAddToStackModal(card);
      return;
    }

    default:
      G.discard.push(card);
      addLog(`${card.name} discarded.`);
  }
}

// ─── Effect Resolvers ─────────────────────────────────────────────────────────

function resolveEventOption(card, optionIndex) {
  const opt = card.options[optionIndex];
  closeModal();

  switch (opt.effect) {
    case 'solo_draw_to_economy': {
      const drawn = G.deck.shift();
      if (drawn) {
        G.categories['economy'].bonusStack.push(drawn);
        addLog(`Occupation: ${drawn.name} added to Economy bonus stack.`);
      }
      G.categories['military'].instability.push(card);
      addLog(`Occupation discarded to Military Instability.`);
      break;
    }

    case 'solo_draw_to_environment': {
      const drawn = G.deck.shift();
      if (drawn) {
        G.categories['environment'].bonusStack.push(drawn);
        addLog(`Occupation: ${drawn.name} added to Environment bonus stack.`);
      }
      G.categories['military'].instability.push(card);
      addLog(`Occupation discarded to Military Instability.`);
      break;
    }

    case 'solo_add_tech_instability': {
      const marker = { id: 'pressure_marker', name: 'Incursion Pressure', value: 1, type: 'marker', instanceId: Math.random() };
      G.categories['technology'].instability.push(marker);
      addLog(`Incursion: Technology Instability +1.`);
      G.categories['military'].instability.push(card);
      addLog(`Incursion discarded to Military Instability.`);
      break;
    }

    case 'solo_add_eco_instability': {
      const marker = { id: 'pressure_marker', name: 'Incursion Pressure', value: 1, type: 'marker', instanceId: Math.random() };
      G.categories['economy'].instability.push(marker);
      addLog(`Incursion: Economy Instability +1.`);
      G.categories['military'].instability.push(card);
      addLog(`Incursion discarded to Military Instability.`);
      break;
    }

    case 'solo_shuffle_culture_instability': {
      if (checkCondition(opt.condition)) {
        const pile = G.categories['culture'].instability;
        if (pile.length > 0) {
          const removed = pile.shift(); // remove oldest
          G.deck.push(removed);
          shuffleDeck();
          addLog(`Cultural Exchange: ${removed.name} shuffled back into deck.`);
        } else {
          addLog(`Cultural Exchange: No Culture Instability to remove.`);
        }
      } else {
        addLog(`Cultural Exchange: Matriarchy not active — condition not met.`);
      }
      G.discard.push(card);
      break;
    }

    case 'add_self_to_military': {
      G.categories['military'].bonusStack.push(card);
      addLog(`Cultural Exchange added to Military bonus stack.`);
      break;
    }

    default:
      G.discard.push(card);
  }

  afterCardPlayed();
}

function resolveRemoveInstability(cat, count, mode) {
  closeModal();
  const pile = G.categories[cat].instability;
  if (pile.length === 0) {
    addLog(`No instability in ${cat} to remove.`);
  } else {
    const removed = [];
    for (let i = 0; i < count && pile.length > 0; i++) {
      removed.push(pile.shift()); // oldest first
    }
    if (mode === 'shuffle') {
      removed.forEach(c => G.deck.push(c));
      shuffleDeck();
      addLog(`${removed.map(c => c.name).join(', ')} shuffled back into draw deck from ${cat} instability.`);
    } else {
      removed.forEach(c => G.discard.push(c));
      addLog(`${removed.map(c => c.name).join(', ')} discarded from ${cat} instability.`);
    }
  }
  if (G.pendingAction?.card) G.discard.push(G.pendingAction.card);
  G.pendingAction = null;
  afterCardPlayed();
}

function resolveAddToStack(cat, card) {
  closeModal();
  G.categories[cat].bonusStack.push(card);
  addLog(`${card.name} (+${card.value}) added to ${cat} as bonus.`);
  G.pendingAction = null;
  afterCardPlayed();
}

function resolveSoloBonus(cat) {
  closeModal();
  const marker = { id: 'alliance_bonus', name: 'Alliance Bonus', value: 1, type: 'marker', instanceId: Math.random() };
  G.categories[cat].bonusStack.push(marker);
  addLog(`Alliance: +1 bonus added to ${cat}.`);
  G.pendingAction = null;
  afterCardPlayed();
}

function resolveDiscard(card, discardTarget) {
  closeModal();
  const cat = discardTarget.replace('_instability', '');
  const bonus = card.discardTo?.find(d => d.target === discardTarget)?.bonus;
  // The card itself (when discarded at end of play) goes to the instability pile
  // Actually in the design, category cards stay in the stack — "discard" means
  // if the card is later REMOVED from play, where it goes.
  // For now: just log the choice.
  addLog(`${card.name} will discard to ${discardTarget} if removed.`);
  if (bonus === 'draw_1') {
    drawCard();
    addLog(`Bonus: Drew a card.`);
  }
  G.pendingAction = null;
  afterCardPlayed();
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function checkCondition(cond) {
  if (!cond) return true;
  if (cond.activeCard) {
    const cat = cond.activeCard.category;
    const active = G.categories[cat].active;
    return active && active.name === cond.activeCard.name;
  }
  return false;
}

function shuffleDeck() {
  for (let i = G.deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [G.deck[i], G.deck[j]] = [G.deck[j], G.deck[i]];
  }
}

function addLog(msg) {
  G.log.unshift(`Turn ${G.turn}: ${msg}`);
  if (G.log.length > 50) G.log.pop();
}

function afterCardPlayed() {
  if (G.pendingAction) return; // waiting for user input

  const end = checkEndConditions();
  if (end) {
    G.phase = end.result;
    render();
    showEndModal(end);
    return;
  }

  G.turn++;
  drawCard();
  G.phase = 'play';
  render();
}

// ─── Render ───────────────────────────────────────────────────────────────────

const CAT_COLORS = {
  governance: '#4a90d9',
  economy: '#c8a000',
  culture: '#9b59b6',
  military: '#c0392b',
  technology: '#1abc9c',
  environment: '#27ae60',
};

const CAT_ICONS = {
  governance: '⚖',
  economy: '⚙',
  culture: '🎭',
  military: '⚔',
  technology: '🔬',
  environment: '🌿',
};

function render() {
  renderCategories();
  renderHand();
  renderLog();
  renderDeckCount();
}

function renderCategories() {
  const container = document.getElementById('categories');
  container.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const score = categoryScore(cat);
    const s = G.categories[cat];
    const color = CAT_COLORS[cat];
    const icon = CAT_ICONS[cat];

    const col = document.createElement('div');
    col.className = `category-col${score <= 3 ? ' danger' : score >= 18 ? ' winning' : ''}`;
    col.style.borderTopColor = color;

    // Score bar
    const pct = Math.max(0, Math.min(100, (score / WIN_SCORE) * 100));
    col.innerHTML = `
      <div class="cat-header" style="color:${color}">
        <span class="cat-icon">${icon}</span>
        <span class="cat-name">${cap(cat)}</span>
        <span class="cat-score" style="color:${score <= 3 ? '#e74c3c' : score >= 18 ? '#2ecc71' : '#eee'}">${score}</span>
      </div>
      <div class="score-bar-bg">
        <div class="score-bar-fill" style="width:${pct}%; background:${color}"></div>
        <div class="score-bar-markers">
          <span class="marker-lose">0</span>
          <span class="marker-win">20</span>
        </div>
      </div>
      <div class="cat-active">
        ${s.active ? renderMiniCard(s.active, color) : '<div class="empty-slot">— No card active —</div>'}
      </div>
      ${s.bonusStack.length ? `<div class="cat-bonus">+${s.bonusStack.reduce((a,c)=>a+(c.value||0),0)} bonus (${s.bonusStack.length} card${s.bonusStack.length>1?'s':''})</div>` : ''}
      <div class="cat-instability">
        ${s.instability.length > 0
          ? `<span class="instab-label">Instability:</span> ${s.instability.map(c => `<span class="instab-chip" title="${c.name}">-${c.value}</span>`).join('')}`
          : '<span class="instab-empty">No instability</span>'}
      </div>
    `;
    container.appendChild(col);
  });
}

function renderMiniCard(card, color) {
  return `
    <div class="mini-card" style="border-color:${color}">
      <div class="mini-card-name">${card.name}</div>
      <div class="mini-card-value" style="color:${color}">+${card.value}</div>
      ${card.passiveEffect ? '<div class="mini-card-passive">Passive active</div>' : ''}
    </div>
  `;
}

function renderHand() {
  const hand = document.getElementById('hand');
  hand.innerHTML = `<div class="hand-label">Your Hand (${G.hand.length} cards)</div>`;

  G.hand.forEach((card, i) => {
    const color = card.category ? CAT_COLORS[card.category] : '#888';
    const canPlay = canPlayCard(card);

    const el = document.createElement('div');
    el.className = `hand-card${card.type === 'event' ? ' event-card' : ''}${!canPlay ? ' unplayable' : ''}`;
    el.style.borderTopColor = color;
    el.style.setProperty('--cat-color', color);

    el.innerHTML = `
      <div class="hc-type">${card.type === 'event' ? 'EVENT' : cap(card.category || '')}</div>
      <div class="hc-name">${card.name}</div>
      <div class="hc-value" style="color:${color}">${card.value > 0 ? `+${card.value}` : card.type === 'event' ? 'Event' : ''}</div>
      <div class="hc-flavor">${card.flavorText || ''}</div>
      ${!canPlay ? '<div class="hc-req">Requires not met</div>' : ''}
    `;

    if (canPlay) {
      el.addEventListener('click', () => playCard(i));
    }

    hand.appendChild(el);
  });
}

function canPlayCard(card) {
  if (!card.requires) return true;
  const req = card.requires;
  if (req.activeCardName) {
    const cat = card.options?.[0]?.targetCategory || card.category;
    if (!G.categories[cat].active || G.categories[cat].active.name !== req.activeCardName) return false;
  }
  if (req.categoryScore) {
    const score = categoryScore(req.categoryScore.category);
    if (score < req.categoryScore.min) return false;
  }
  return true;
}

function renderLog() {
  const log = document.getElementById('log');
  log.innerHTML = G.log.slice(0, 20).map(l => `<div class="log-entry">${l}</div>`).join('');
}

function renderDeckCount() {
  const el = document.getElementById('deck-count');
  if (el) el.textContent = `Deck: ${G.deck.length} | Discard: ${G.discard.length}`;
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── Modals ───────────────────────────────────────────────────────────────────

function showOptionModal(card) {
  const color = card.category ? CAT_COLORS[card.category] : '#888';
  const optionsHTML = card.options.map((opt, i) => {
    const condMet = opt.condition ? checkCondition(opt.condition) : true;
    const disabled = opt.condition && !condMet ? 'disabled' : '';
    const note = opt.condition && !condMet ? '<span class="opt-unmet">(Condition not met)</span>' : '';
    return `
      <button class="opt-btn" onclick="applySelectedOption(${i})" ${disabled} style="border-color:${color}">
        <strong>${opt.label}</strong><br>
        <small>${opt.description}</small>
        ${note}
      </button>
    `;
  }).join('');

  openModal(`
    <div class="modal-card-name" style="color:${color}">${card.name}</div>
    <p class="modal-sub">Choose how to play this card:</p>
    <div class="opt-list">${optionsHTML}</div>
    <button class="cancel-btn" onclick="cancelPlay()">Return to Hand</button>
  `);
}

function applySelectedOption(optIndex) {
  closeModal();
  const { card } = G.pendingAction;
  G.pendingAction = null;
  applyCategoryCard(card, card.options[optIndex]);
  afterCardPlayed();
}

function cancelPlay() {
  closeModal();
  if (G.pendingAction?.card) {
    G.hand.push(G.pendingAction.card); // return to hand
  }
  G.pendingAction = null;
  render();
}

function showEventOptionModal(card) {
  const optionsHTML = card.options.map((opt, i) => {
    const condMet = opt.condition ? checkCondition(opt.condition) : true;
    const disabled = opt.condition && !condMet ? 'disabled' : '';
    const note = opt.condition && !condMet ? '<span class="opt-unmet">(Condition not met — will have no effect)</span>' : '';
    return `
      <button class="opt-btn" onclick="resolveEventOption(${i})" ${disabled && opt.condition && !condMet ? '' : ''}>
        <strong>${opt.label}</strong><br>
        <small>${opt.description}</small>
        ${note}
      </button>
    `;
  }).join('');

  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">${card.flavorText || ''}</p>
    <div class="opt-list">${optionsHTML}</div>
  `);
}

function resolveEventOption(optIndex) {
  const card = G.pendingAction.card;
  G.pendingAction = null;
  resolveEventOption_impl(card, optIndex);
}
// avoid naming collision
function resolveEventOption_impl(card, optIndex) {
  resolveEventOption2(card, optIndex);
}
function resolveEventOption2(card, i) {
  closeModal();
  const opt = card.options[i];

  switch (opt.effect) {
    case 'solo_draw_to_economy': {
      const drawn = G.deck.shift();
      if (drawn) { G.categories['economy'].bonusStack.push(drawn); addLog(`Occupation: ${drawn.name} → Economy bonus.`); }
      G.categories['military'].instability.push(card);
      addLog(`Occupation → Military Instability.`);
      break;
    }
    case 'solo_draw_to_environment': {
      const drawn = G.deck.shift();
      if (drawn) { G.categories['environment'].bonusStack.push(drawn); addLog(`Occupation: ${drawn.name} → Environment bonus.`); }
      G.categories['military'].instability.push(card);
      addLog(`Occupation → Military Instability.`);
      break;
    }
    case 'solo_add_tech_instability': {
      const m = { id: 'pressure', name: 'Incursion Pressure', value: 1, type: 'marker', instanceId: Math.random() };
      G.categories['technology'].instability.push(m);
      addLog(`Incursion: Technology −1.`);
      G.categories['military'].instability.push(card);
      break;
    }
    case 'solo_add_eco_instability': {
      const m = { id: 'pressure', name: 'Incursion Pressure', value: 1, type: 'marker', instanceId: Math.random() };
      G.categories['economy'].instability.push(m);
      addLog(`Incursion: Economy −1.`);
      G.categories['military'].instability.push(card);
      break;
    }
    case 'solo_shuffle_culture_instability': {
      const condMet = opt.condition ? checkCondition(opt.condition) : true;
      if (condMet) {
        const pile = G.categories['culture'].instability;
        if (pile.length > 0) {
          const removed = pile.shift();
          G.deck.push(removed); shuffleDeck();
          addLog(`Cultural Exchange: ${removed.name} shuffled into deck.`);
        } else addLog(`Cultural Exchange: No Culture Instability to remove.`);
      } else addLog(`Cultural Exchange: Matriarchy not active.`);
      G.discard.push(card);
      break;
    }
    case 'add_self_to_military': {
      G.categories['military'].bonusStack.push(card);
      addLog(`Cultural Exchange → Military bonus (+${card.value || 0}).`);
      break;
    }
    default:
      G.discard.push(card);
  }
  afterCardPlayed();
}

function showInstabilityModal(card, maxRemove, mode) {
  const catsWithInstab = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
  if (catsWithInstab.length === 0) {
    closeModal();
    addLog(`${card.name}: No instability to remove anywhere.`);
    G.discard.push(card);
    G.pendingAction = null;
    afterCardPlayed();
    return;
  }

  const btns = catsWithInstab.map(cat => {
    const pile = G.categories[cat].instability;
    return `<button class="opt-btn" onclick="resolveRemoveInstability('${cat}', ${maxRemove}, '${mode}')">
      ${cap(cat)} (${pile.length} card${pile.length > 1 ? 's' : ''}: ${pile.map(c=>c.name).join(', ')})
    </button>`;
  }).join('');

  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose an Instability pile to clear (removes up to ${maxRemove} oldest card${maxRemove > 1 ? 's' : ''}):</p>
    <div class="opt-list">${btns}</div>
  `);
}

function showAddToStackModal(card) {
  const btns = CATEGORIES.map(cat => {
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-color:${color}" onclick="resolveAddToStack('${cat}', G.pendingAction.card)">
      <strong>${cap(cat)}</strong> (currently ${categoryScore(cat)} pts)
    </button>`;
  }).join('');

  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Add +${card.value} bonus to which category?</p>
    <div class="opt-list">${btns}</div>
  `);
}

function showSoloBonusModal(sourceName) {
  const btns = CATEGORIES.map(cat => {
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-color:${color}" onclick="resolveSoloBonus('${cat}')">
      <strong>${cap(cat)}</strong> (currently ${categoryScore(cat)} pts)
    </button>`;
  }).join('');

  openModal(`
    <div class="modal-card-name">${sourceName} — Solo Bonus</div>
    <p class="modal-sub">Alliance played: Add +1 bonus point to which category?</p>
    <div class="opt-list">${btns}</div>
  `);
}

function showDiscardModal(card) {
  const btns = card.discardTo.map(d => `
    <button class="opt-btn" onclick="resolveDiscard(G.pendingAction.card, '${d.target}')">
      ${d.label}${d.bonus ? ' (draw 1 card)' : ''}
    </button>
  `).join('');

  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose where this card will be discarded when removed from play:</p>
    <div class="opt-list">${btns}</div>
  `);
}

function showEndModal(end) {
  const won = end.result === 'won';
  openModal(`
    <div class="end-title ${won ? 'end-win' : 'end-lose'}">
      ${won ? 'VICTORY' : 'COLLAPSE'}
    </div>
    <p class="end-sub">
      ${won
        ? `${cap(end.category)} reached ${WIN_SCORE}! Your civilization has achieved dominance.`
        : `${cap(end.category)} fell to ${LOSE_SCORE}. Your civilization has collapsed.`}
    </p>
    <div class="end-scores">
      ${CATEGORIES.map(cat => `<div class="end-score-row"><span>${cap(cat)}</span><span>${categoryScore(cat)}</span></div>`).join('')}
    </div>
    <button class="opt-btn" onclick="startGame()">Play Again</button>
  `);
}

function openModal(html) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = html;
  overlay.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function startGame() {
  closeModal();
  G = newGameState();
  drawCard(); // initial draw (already drawn HAND_SIZE in newGameState, this adds turn 1 draw)
  // Actually let's skip the extra draw on start — hand is already filled
  G.deck.unshift(...G.hand.splice(HAND_SIZE)); // trim to exactly HAND_SIZE
  addLog('Game started. Draw a card and build your civilization.');
  render();
}

// expose resolveRemoveInstability globally for onclick
window.resolveRemoveInstability = resolveRemoveInstability;
window.resolveAddToStack = resolveAddToStack;
window.resolveSoloBonus = resolveSoloBonus;
window.resolveDiscard = resolveDiscard;
window.resolveEventOption = (i) => {
  const card = G.pendingAction.card;
  G.pendingAction = null;
  resolveEventOption2(card, i);
};
window.applySelectedOption = applySelectedOption;
window.cancelPlay = cancelPlay;
window.startGame = startGame;
window.G = null; // set on init

document.addEventListener('DOMContentLoaded', () => {
  startGame();
});
