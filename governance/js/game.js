// Governance — Game Engine (Solo Mode)
// Turn structure: Draw 1 card → Play 1 card → Resolve effects → Check win/lose

const CATEGORIES = ['governance', 'economy', 'culture', 'military', 'technology', 'environment'];
const BASE_SCORE = 10;
const WIN_SCORE = 20;
const LOSE_SCORE = 0;
const HAND_SIZE = 5;

// ─── State ────────────────────────────────────────────────────────────────────

let G = null;

function newGameState() {
  const deck = buildDeck(STARTER_DECK);
  const hand = [];
  for (let i = 0; i < HAND_SIZE; i++) {
    if (deck.length > 0) hand.push(deck.shift());
  }

  const categories = {};
  CATEGORIES.forEach(cat => {
    categories[cat] = {
      active: null,
      bonusStack: [],
      instability: [],
    };
  });

  return {
    deck,
    discard: [],
    hand,
    categories,
    turn: 1,
    phase: 'play',
    log: [],
    pendingAction: null,
    selectedCardIndex: null,  // index into G.hand
    selectedOption: 0,        // which option button is active in the detail panel
  };
}

function buildDeck(ids) {
  const deck = ids.map(id => ({ ...CARD_MAP[id], instanceId: Math.random() }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

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

// ─── Draw ─────────────────────────────────────────────────────────────────────

function drawCard() {
  if (G.deck.length === 0) {
    G.deck = buildDeck(G.discard.map(c => c.id));
    G.discard = [];
    addLog('Draw pile empty — discard reshuffled into deck.');
  }
  if (G.deck.length === 0) {
    addLog('No cards remain. Game continues with current hand.');
    return;
  }
  const card = G.deck.shift();
  G.hand.push(card);
  addLog(`Drew: ${card.name}`);
}

// ─── Selection (click in hand) ────────────────────────────────────────────────

function selectCard(i) {
  if (G.pendingAction) return; // mid-resolution, don't change selection
  if (G.selectedCardIndex === i) {
    G.selectedCardIndex = null; // deselect on second click
  } else {
    G.selectedCardIndex = i;
    G.selectedOption = 0; // reset to first option
  }
  render();
}

function deselectCard() {
  G.selectedCardIndex = null;
  G.selectedOption = 0;
  render();
}

function setSelectedOption(i) {
  G.selectedOption = i;
  renderCardDetail(); // just refresh the detail panel
}

// ─── Confirm Play ─────────────────────────────────────────────────────────────

function confirmPlay() {
  const i = G.selectedCardIndex;
  if (i === null || i === undefined) return;
  const card = G.hand[i];
  if (!card) return;

  // Validate requirements
  if (!meetsRequirements(card)) return;

  // Remove from hand
  G.hand.splice(i, 1);
  G.selectedCardIndex = null;

  if (card.type === 'category') {
    const option = card.options[G.selectedOption] || card.options[0];
    applyCategoryCard(card, option);
  } else if (card.type === 'event') {
    card._chosenOption = G.selectedOption; // pass panel selection into event resolver
    resolveEvent(card);
  }

  G.selectedOption = 0;
  afterCardPlayed();
}

function meetsRequirements(card) {
  if (!card.requires) return true;
  const req = card.requires;
  if (req.activeCardName) {
    const cat = card.options?.[0]?.targetCategory || card.category;
    if (!G.categories[cat]?.active || G.categories[cat].active.name !== req.activeCardName) {
      addLog(`Cannot play ${card.name}: requires ${req.activeCardName} as active ${cat}.`);
      render();
      return false;
    }
  }
  if (req.categoryScore) {
    const score = categoryScore(req.categoryScore.category);
    if (score < req.categoryScore.min) {
      addLog(`Cannot play ${card.name}: requires ${req.categoryScore.category} ≥ ${req.categoryScore.min} (current: ${score}).`);
      render();
      return false;
    }
  }
  return true;
}

function canPlayCard(card) {
  if (!card.requires) return true;
  const req = card.requires;
  if (req.activeCardName) {
    const cat = card.options?.[0]?.targetCategory || card.category;
    if (!G.categories[cat]?.active || G.categories[cat].active.name !== req.activeCardName) return false;
  }
  if (req.categoryScore) {
    if (categoryScore(req.categoryScore.category) < req.categoryScore.min) return false;
  }
  return true;
}

// ─── Apply Category Card ──────────────────────────────────────────────────────

function applyCategoryCard(card, option) {
  const cat = option.targetCategory || card.category;
  const catState = G.categories[cat];
  const prev = catState.active;

  switch (option.effect) {
    case 'replace_discard_active':
      catState.active = card;
      if (prev) { catState.instability.push(prev); addLog(`${prev.name} → ${cat} instability.`); }
      addLog(`${card.name} (+${card.value}) is now your active ${cat} card.`);
      break;

    case 'replace_shuffle_active_if': {
      const condMet = option.condition ? checkCondition(option.condition) : false;
      catState.active = card;
      if (prev) {
        if (condMet) {
          G.deck.push(prev); shuffleDeck();
          addLog(`${prev.name} shuffled back into the draw deck.`);
        } else {
          catState.instability.push(prev);
          addLog(`Condition not met — ${prev.name} → ${cat} instability.`);
        }
      }
      addLog(`${card.name} (+${card.value}) is now your active ${cat} card.`);
      break;
    }

    case 'replace_named_active_to_instability':
      catState.active = card;
      if (prev) { catState.instability.push(prev); addLog(`${prev.name} → ${cat} instability.`); }
      addLog(`${card.name} (+${card.value}) is now your active ${cat} card.`);
      break;

    case 'replace_discard_active_plus_solo_bonus':
      catState.active = card;
      if (prev) { catState.instability.push(prev); addLog(`${prev.name} → ${cat} instability.`); }
      addLog(`${card.name} (+${card.value}) is now your active ${cat} card.`);
      G.pendingAction = { type: 'solo_bonus_1', source: card.name };
      render();
      showSoloBonusModal(card.name);
      return;

    case 'move_env_to_eco_stack': {
      const envActive = G.categories['environment'].active;
      if (envActive) {
        G.categories['environment'].active = null;
        G.categories['economy'].bonusStack.push(envActive);
        addLog(`${envActive.name} moved from Environment → Economy bonus stack.`);
      } else {
        addLog(`No Environment card to move — proceeding without transfer.`);
      }
      catState.active = card;
      if (prev) { catState.instability.push(prev); }
      addLog(`${card.name} (+${card.value}) is now your active economy card.`);
      break;
    }

    default:
      catState.active = card;
      if (prev) catState.instability.push(prev);
      addLog(`${card.name} played to ${cat}.`);
  }

  // If card has multiple discard destinations, let player choose (post-play)
  if (card.discardTo && card.discardTo.length > 1) {
    G.pendingAction = { type: 'choose_discard', card };
    render();
    showDiscardModal(card);
  }
}

// ─── Resolve Event ────────────────────────────────────────────────────────────

function resolveEvent(card) {
  addLog(`Event: ${card.name}`);

  switch (card.effect) {
    case 'place_self_to_instability': {
      const cat = card.targetInstability.replace('_instability', '');
      G.categories[cat].instability.push(card);
      addLog(`${card.name} placed into ${cat} instability (−${card.value}).`);
      break;
    }

    case 'occupation':
    case 'incursion':
    case 'cultural_exchange': {
      // Options were already chosen in the detail panel — use selectedOption
      // But these events were already confirmed with an option selected.
      // We need to know which option was chosen. Pass it via a temp property.
      resolveEventOption2(card, card._chosenOption ?? 0);
      return; // resolveEventOption2 handles afterCardPlayed
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

function resolveEventOption2(card, i) {
  const opt = card.options?.[i];
  if (!opt) { G.discard.push(card); afterCardPlayed(); return; }

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
      } else addLog(`Cultural Exchange: Matriarchy not active — no effect.`);
      G.discard.push(card);
      break;
    }
    case 'add_self_to_military': {
      G.categories['military'].bonusStack.push(card);
      addLog(`Cultural Exchange → Military bonus.`);
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
    for (let i = 0; i < count && pile.length > 0; i++) removed.push(pile.shift());
    if (mode === 'shuffle') {
      removed.forEach(c => G.deck.push(c)); shuffleDeck();
      addLog(`${removed.map(c => c.name).join(', ')} shuffled back into deck from ${cat} instability.`);
    } else {
      removed.forEach(c => G.discard.push(c));
      addLog(`${removed.map(c => c.name).join(', ')} discarded from ${cat} instability.`);
    }
  }
  if (G.pendingAction?.card) G.discard.push(G.pendingAction.card);
  G.pendingAction = null;
  afterCardPlayed();
}

function resolveAddToStack(cat) {
  closeModal();
  const card = G.pendingAction.card;
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

function resolveDiscard(discardTarget) {
  closeModal();
  const card = G.pendingAction.card;
  const entry = card.discardTo?.find(d => d.target === discardTarget);
  addLog(`${card.name} will discard to ${discardTarget} if removed.`);
  if (entry?.bonus === 'draw_1') { drawCard(); addLog(`Bonus: Drew a card.`); }
  G.pendingAction = null;
  afterCardPlayed();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function checkCondition(cond) {
  if (!cond) return true;
  if (cond.activeCard) {
    const active = G.categories[cond.activeCard.category]?.active;
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
  G.log.unshift(`T${G.turn}: ${msg}`);
  if (G.log.length > 60) G.log.pop();
}

function afterCardPlayed() {
  if (G.pendingAction) return;
  G.selectedCardIndex = null;
  G.selectedOption = 0;

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
    const icon = CAT_ICONS[cat];
    const pct = Math.max(0, Math.min(100, (score / WIN_SCORE) * 100));

    const col = document.createElement('div');
    col.className = `category-col${score <= 3 ? ' danger' : score >= 18 ? ' winning' : ''}`;
    col.style.borderTopColor = color;

    col.innerHTML = `
      <div class="cat-header" style="color:${color}">
        <span class="cat-icon">${icon}</span>
        <span class="cat-name">${cap(cat)}</span>
        <span class="cat-score" style="color:${score <= 3 ? '#e74c3c' : score >= 18 ? '#2ecc71' : '#eee'}">${score}</span>
      </div>
      <div class="score-bar-bg">
        <div class="score-bar-fill" style="width:${pct}%; background:${color}"></div>
        <div class="score-bar-markers"><span>0</span><span>20</span></div>
      </div>
      <div class="cat-active">
        ${s.active ? renderMiniCard(s.active, color) : '<div class="empty-slot">— No card active —</div>'}
      </div>
      ${s.bonusStack.length ? `<div class="cat-bonus">+${s.bonusStack.reduce((a,c)=>a+(c.value||0),0)} bonus (${s.bonusStack.map(c=>c.name).join(', ')})</div>` : ''}
      <div class="cat-instability">
        ${s.instability.length > 0
          ? `<span class="instab-label">Instability:</span>${s.instability.map(c=>`<span class="instab-chip" title="${c.name}">−${c.value}</span>`).join('')}`
          : '<span class="instab-empty">No instability</span>'}
      </div>
    `;
    container.appendChild(col);
  });
}

function renderMiniCard(card, color) {
  return `
    <div class="mini-card" style="border-left-color:${color}">
      <div class="mini-card-name">${card.name}</div>
      <div class="mini-card-value" style="color:${color}">+${card.value}</div>
      ${card.passiveEffect ? '<div class="mini-card-passive">Passive active</div>' : ''}
    </div>
  `;
}

function renderHand() {
  const label = document.getElementById('hand-label');
  label.textContent = `Your Hand (${G.hand.length} cards) — Click to inspect, then Confirm to play`;

  const hand = document.getElementById('hand');
  hand.innerHTML = '';

  G.hand.forEach((card, i) => {
    const color = card.category ? CAT_COLORS[card.category] : '#777';
    const playable = canPlayCard(card);
    const selected = G.selectedCardIndex === i;

    const el = document.createElement('div');
    el.className = [
      'hand-card',
      card.type === 'event' ? 'event-card' : '',
      !playable ? 'unplayable' : '',
      selected ? 'selected' : '',
    ].filter(Boolean).join(' ');
    el.style.setProperty('--cat-color', color);

    // Build a short effect summary for display on the card
    const effectSummary = buildEffectSummary(card);

    el.innerHTML = `
      <div class="hc-header">
        <span class="hc-type">${card.type === 'event' ? 'Event' : cap(card.category || '')}</span>
        ${card.value > 0 ? `<span class="hc-value-badge" style="background:${color}22;color:${color};border-color:${color}44">+${card.value}</span>` : ''}
      </div>
      <div class="hc-name">${card.name}</div>
      <div class="hc-art-box"></div>
      <div class="hc-effect">${effectSummary}</div>
      ${card.requires ? `<div class="hc-req-badge">${buildReqText(card)}</div>` : ''}
      ${!playable ? '<div class="hc-unplayable-note">Req. not met</div>' : ''}
      <div class="hc-flavor">${card.flavorText || ''}</div>
    `;

    el.addEventListener('click', () => selectCard(i));
    hand.appendChild(el);
  });
}

function buildEffectSummary(card) {
  if (card.type === 'event') {
    if (card.options && card.options.length > 0) {
      return card.options.map(o => `<span class="eff-opt-label">${o.label}:</span> ${o.description}`).join('<br>');
    }
    if (card.effect === 'place_self_to_instability') {
      return `Goes to ${cap(card.targetInstability?.replace('_instability','') || '')} Instability (−${card.value}).`;
    }
    return '';
  }
  // Category card
  if (!card.options) return '';
  return card.options.map(o => `<span class="eff-opt-label">${o.label}:</span> ${o.description}`).join('<br>');
}

function buildReqText(card) {
  const r = card.requires;
  const parts = [];
  if (r.activeCardName) parts.push(`Requires active: ${r.activeCardName}`);
  if (r.categoryScore) parts.push(`Requires ${cap(r.categoryScore.category)} ≥ ${r.categoryScore.min}`);
  return parts.join(' · ');
}

function renderLog() {
  const log = document.getElementById('log');
  log.innerHTML = G.log.slice(0, 30).map(l => `<div class="log-entry">${l}</div>`).join('');
}

function renderCardDetail() {
  const body = document.getElementById('card-detail-body');
  const i = G.selectedCardIndex;

  if (i === null || i === undefined || !G.hand[i]) {
    body.innerHTML = `<div class="detail-empty">Click a card in your hand to inspect it.</div>`;
    return;
  }

  const card = G.hand[i];
  const color = card.category ? CAT_COLORS[card.category] : '#777';
  const playable = canPlayCard(card);

  // Build options section
  let optionsHTML = '';
  if (card.options && card.options.length > 0) {
    optionsHTML = `<div class="detail-section-label">Play Options</div><div class="detail-opts">`;
    card.options.forEach((opt, oi) => {
      const condMet = opt.condition ? checkCondition(opt.condition) : true;
      const isSelected = G.selectedOption === oi;
      const unmet = !condMet ? ' <span class="opt-cond-unmet">(Condition not met — will default to Option 1)</span>' : '';
      optionsHTML += `
        <div class="detail-opt${isSelected ? ' detail-opt-selected' : ''}${!condMet ? ' detail-opt-unmet' : ''}"
             onclick="setSelectedOption(${oi})" style="${isSelected ? `border-color:${color}` : ''}">
          <div class="detail-opt-label">${opt.label}</div>
          <div class="detail-opt-desc">${opt.description}${unmet}</div>
        </div>`;
    });
    optionsHTML += `</div>`;
  } else if (card.effect === 'place_self_to_instability') {
    optionsHTML = `<div class="detail-section-label">Effect (Auto)</div>
      <div class="detail-auto-effect">Immediately placed into ${cap(card.targetInstability?.replace('_instability','') || '')} Instability (−${card.value}).</div>`;
  }

  // Requirements block
  let reqHTML = '';
  if (card.requires) {
    const met = playable;
    reqHTML = `<div class="detail-requires ${met ? 'req-met' : 'req-unmet'}">
      <span class="detail-section-label">Requires</span>
      <div>${buildReqText(card)}</div>
    </div>`;
  }

  // Discard note
  let discardHTML = '';
  if (card.discardTo && card.discardTo.length > 0) {
    discardHTML = `<div class="detail-discard">
      <span class="detail-section-label">Discard To (choose after play)</span>
      <div>${card.discardTo.map(d => d.label + (d.bonus ? ' — draw 1 card' : '')).join(' or ')}</div>
    </div>`;
  }

  body.innerHTML = `
    <div class="detail-card-frame" style="border-top-color:${color}">
      <div class="detail-card-header">
        <div>
          <div class="detail-type">${card.type === 'event' ? 'Event Card' : cap(card.category || '') + ' Card'}</div>
          <div class="detail-name" style="color:${color}">${card.name}</div>
        </div>
        ${card.value > 0 ? `<div class="detail-value" style="color:${color}">+${card.value}</div>` : ''}
      </div>
      ${reqHTML}
      ${optionsHTML}
      ${discardHTML}
      <div class="detail-flavor">"${card.flavorText || ''}"</div>
    </div>
    <div class="detail-actions">
      <button class="confirm-btn${!playable ? ' confirm-disabled' : ''}"
              onclick="confirmPlay()"
              ${!playable ? 'disabled title="Requirements not met"' : ''}>
        Confirm Play
      </button>
      <button class="deselect-btn" onclick="deselectCard()">Deselect</button>
    </div>
  `;
}

function renderDeckCount() {
  const el = document.getElementById('deck-count');
  if (el) el.textContent = `Turn ${G.turn} · Deck: ${G.deck.length} · Discard: ${G.discard.length}`;
}

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}

// ─── Modals (post-play choices only) ─────────────────────────────────────────

function showInstabilityModal(card, maxRemove, mode) {
  const catsWithInstab = CATEGORIES.filter(c => G.categories[c].instability.length > 0);
  if (catsWithInstab.length === 0) {
    addLog(`${card.name}: No instability anywhere to remove.`);
    G.discard.push(card);
    G.pendingAction = null;
    afterCardPlayed();
    return;
  }

  const btns = catsWithInstab.map(cat => {
    const pile = G.categories[cat].instability;
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveRemoveInstability('${cat}', ${maxRemove}, '${mode}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>${pile.length} card${pile.length > 1 ? 's' : ''}: ${pile.map(c=>c.name).join(', ')}</small>
    </button>`;
  }).join('');

  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose an Instability pile — removes up to ${maxRemove} oldest card${maxRemove > 1 ? 's' : ''}, shuffled back into the deck.</p>
    <div class="opt-list">${btns}</div>
  `);
}

function showAddToStackModal(card) {
  const btns = CATEGORIES.map(cat => {
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveAddToStack('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Current score: ${categoryScore(cat)}</small>
    </button>`;
  }).join('');

  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Add +${card.value} bonus to which category stack?</p>
    <div class="opt-list">${btns}</div>
  `);
}

function showSoloBonusModal(sourceName) {
  const btns = CATEGORIES.map(cat => {
    const color = CAT_COLORS[cat];
    return `<button class="opt-btn" style="border-left:3px solid ${color}" onclick="resolveSoloBonus('${cat}')">
      <strong style="color:${color}">${cap(cat)}</strong>
      <small>Current score: ${categoryScore(cat)}</small>
    </button>`;
  }).join('');

  openModal(`
    <div class="modal-card-name">${sourceName} — Solo Bonus</div>
    <p class="modal-sub">Add +1 Alliance bonus to which category?</p>
    <div class="opt-list">${btns}</div>
  `);
}

function showDiscardModal(card) {
  const btns = card.discardTo.map(d => `
    <button class="opt-btn" onclick="resolveDiscard('${d.target}')">
      <strong>${d.label}</strong>
      ${d.bonus ? `<small>Bonus: Draw 1 card</small>` : ''}
    </button>
  `).join('');

  openModal(`
    <div class="modal-card-name">${card.name}</div>
    <p class="modal-sub">Choose where ${card.name} will discard if later removed from play:</p>
    <div class="opt-list">${btns}</div>
  `);
}

function showEndModal(end) {
  const won = end.result === 'won';
  openModal(`
    <div class="end-title ${won ? 'end-win' : 'end-lose'}">${won ? 'VICTORY' : 'COLLAPSE'}</div>
    <p class="end-sub">
      ${won
        ? `${cap(end.category)} reached ${WIN_SCORE}. Your civilization has achieved dominance.`
        : `${cap(end.category)} fell to ${LOSE_SCORE}. Your civilization has collapsed.`}
    </p>
    <div class="end-scores">
      ${CATEGORIES.map(cat => {
        const score = categoryScore(cat);
        const color = CAT_COLORS[cat];
        return `<div class="end-score-row">
          <span style="color:${color}">${cap(cat)}</span>
          <span style="font-weight:bold">${score}</span>
        </div>`;
      }).join('')}
    </div>
    <button class="opt-btn" onclick="startGame()" style="margin-top:8px">Play Again</button>
  `);
}

function openModal(html) {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-content').innerHTML = html;
  overlay.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function startGame() {
  closeModal();
  G = newGameState();
  addLog('Game started. Select a card from your hand to begin.');
  render();
}

// Expose globals for inline onclick handlers
window.selectCard = selectCard;
window.deselectCard = deselectCard;
window.setSelectedOption = setSelectedOption;
window.confirmPlay = confirmPlay;
window.resolveRemoveInstability = resolveRemoveInstability;
window.resolveAddToStack = resolveAddToStack;
window.resolveSoloBonus = resolveSoloBonus;
window.resolveDiscard = resolveDiscard;
window.startGame = startGame;

document.addEventListener('DOMContentLoaded', startGame);
