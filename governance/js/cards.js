// Governance — Card Definitions
// All cards from the design doc starter set.
// Each card has: id, name, type, category, value, options[], discardTo, requires, soloEffect, flavorText

const CARDS = [

  // ─── GOVERNANCE CARDS ───────────────────────────────────────────────────────

  {
    id: 'democracy',
    name: 'Democracy',
    type: 'category',
    category: 'governance',
    value: 2,
    flavorText: 'Power derived from the consent of the governed.',
    options: [
      {
        label: 'Option 1',
        description: 'Discard your current Governance card. Replace it with Democracy.',
        effect: 'replace_discard_active',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2',
        description: 'If your active Culture card is Freedom, shuffle your current Governance card into the draw deck instead of discarding it.',
        effect: 'replace_shuffle_active_if',
        targetCategory: 'governance',
        condition: { activeCard: { category: 'culture', name: 'Freedom' } },
        fallbackEffect: 'replace_discard_active',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability', bonus: 'draw_1' },
    ],
    requires: null,
  },

  {
    id: 'healthy_democracy',
    name: 'Healthy Democracy',
    type: 'category',
    category: 'governance',
    value: 4,
    flavorText: 'When institutions mature, liberty flourishes.',
    options: [
      {
        label: 'Play',
        description: 'Replace Democracy as your active Governance. Move Democracy to Governance Instability.',
        effect: 'replace_named_active_to_instability',
        targetCategory: 'governance',
        requiresActiveName: 'Democracy',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
    requires: { activeCardName: 'Democracy', categoryScore: { category: 'culture', min: 15 } },
  },

  {
    id: 'theocracy',
    name: 'Theocracy',
    type: 'category',
    category: 'governance',
    value: 2,
    flavorText: 'Divine law made civil law.',
    options: [
      {
        label: 'Option 1',
        description: 'Discard your current Governance card. Replace it with Theocracy.',
        effect: 'replace_discard_active',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2',
        description: 'If your active Culture card is Zealotry, shuffle your current Governance into the draw deck.',
        effect: 'replace_shuffle_active_if',
        targetCategory: 'governance',
        condition: { activeCard: { category: 'culture', name: 'Zealotry' } },
        fallbackEffect: 'replace_discard_active',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
  },

  {
    id: 'alliance',
    name: 'Alliance',
    type: 'category',
    category: 'governance',
    value: 2,
    flavorText: 'No civilization stands alone.',
    options: [
      {
        label: 'Play',
        description: 'Become your active Governance card. Solo: Gain +1 bonus to any one category.',
        effect: 'replace_discard_active_plus_solo_bonus',
        targetCategory: 'governance',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
    requires: null,
    soloEffect: 'choose_category_bonus_1',
  },

  // ─── ECONOMY CARDS ──────────────────────────────────────────────────────────

  {
    id: 'free_trade',
    name: 'Free Trade',
    type: 'category',
    category: 'economy',
    value: 2,
    flavorText: 'Open markets, open opportunities.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Economy. Old active card goes to Economy Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'economy',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
    requires: null,
  },

  {
    id: 'industrial_expansion',
    name: 'Industrial Expansion',
    type: 'category',
    category: 'economy',
    value: 4,
    flavorText: 'Growth demands sacrifice — usually someone else\'s.',
    options: [
      {
        label: 'Option 1',
        description: 'Discard current Economy card. Replace it with Industrial Expansion.',
        effect: 'replace_discard_active',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2',
        description: 'Move one Environment card from your Environment stack into your Economy stack as a bonus. Replace current Economy.',
        effect: 'move_env_to_eco_stack',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'environment_instability', label: 'Environment Instability' },
    ],
    requires: null,
  },

  {
    id: 'green_investment',
    name: 'Green Investment',
    type: 'category',
    category: 'economy',
    value: 3,
    flavorText: 'Prosperity that does not cost the earth.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Economy. Old active goes to Economy Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'economy',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
    requires: { categoryScore: { category: 'environment', min: 14 } },
  },

  // ─── CULTURE CARDS ──────────────────────────────────────────────────────────

  {
    id: 'matriarchy',
    name: 'Matriarchy',
    type: 'category',
    category: 'culture',
    value: 2,
    flavorText: 'Society shaped by those who sustain it.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Culture. Old active goes to Culture Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'culture',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
    requires: null,
  },

  {
    id: 'patriarchy',
    name: 'Patriarchy',
    type: 'category',
    category: 'culture',
    value: 2,
    flavorText: 'Order imposed from the top down.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Culture. Old active goes to Culture Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'culture',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
    requires: null,
  },

  {
    id: 'higher_education',
    name: 'Higher Education',
    type: 'category',
    category: 'culture',
    value: 3,
    flavorText: 'Knowledge compounds.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Culture. Old active goes to Culture Instability. While active: you may spend an Economy card to remove one Technology Instability card.',
        effect: 'replace_discard_active',
        targetCategory: 'culture',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
    requires: null,
    passiveEffect: 'economy_removes_tech_instability',
  },

  {
    id: 'renaissance_culture',
    name: 'Renaissance Culture',
    type: 'category',
    category: 'culture',
    value: 5,
    flavorText: 'When art, science, and governance align.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Culture. Old active goes to Culture Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'culture',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
    requires: { categoryScore: { category: 'governance', min: 16 } },
  },

  // ─── MILITARY CARDS ─────────────────────────────────────────────────────────

  {
    id: 'warrior_tradition',
    name: 'Warrior Tradition',
    type: 'category',
    category: 'military',
    value: 3,
    flavorText: 'A people who do not forget how to fight.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Military. Old active goes to Military Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'military',
      },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
    requires: null,
  },

  {
    id: 'citizen_militia',
    name: 'Citizen Militia',
    type: 'category',
    category: 'military',
    value: 1,
    flavorText: 'Every citizen a defender.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Military. Old active goes to Military Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'military',
      },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
    requires: null,
  },

  // ─── TECHNOLOGY CARDS ───────────────────────────────────────────────────────

  {
    id: 'centers_of_learning',
    name: 'Centers of Learning',
    type: 'category',
    category: 'technology',
    value: 2,
    flavorText: 'Knowledge is the only resource that multiplies when shared.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Technology. Old active goes to Technology Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'technology',
      },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
    requires: null,
  },

  {
    id: 'practical_innovation',
    name: 'Practical Innovation',
    type: 'category',
    category: 'technology',
    value: 1,
    flavorText: 'Small improvements, compounded daily.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Technology. Old active goes to Technology Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'technology',
      },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
    requires: null,
  },

  // ─── ENVIRONMENT CARDS ──────────────────────────────────────────────────────

  {
    id: 'great_plains',
    name: 'Great Plains',
    type: 'category',
    category: 'environment',
    value: 2,
    flavorText: 'Endless horizon, endless potential.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Environment. Old active goes to Environment Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
    requires: null,
  },

  {
    id: 'river_canals',
    name: 'River Canals',
    type: 'category',
    category: 'environment',
    value: 3,
    flavorText: 'Civilizations rise where water flows.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Environment. Old active goes to Environment Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
    requires: null,
  },

  {
    id: 'frozen_tundra',
    name: 'Frozen Tundra',
    type: 'category',
    category: 'environment',
    value: 1,
    flavorText: 'Harsh land, resilient people.',
    options: [
      {
        label: 'Play',
        description: 'Replace current Environment. Old active goes to Environment Instability.',
        effect: 'replace_discard_active',
        targetCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
    requires: null,
  },

  // ─── EVENT CARDS ────────────────────────────────────────────────────────────

  {
    id: 'worker_strike',
    name: 'Worker Strike',
    type: 'event',
    category: null,
    value: 2, // instability value when placed
    flavorText: 'Labor withheld is power revealed.',
    effect: 'place_self_to_instability',
    targetInstability: 'economy_instability',
    options: null,
    soloEffect: null,
  },

  {
    id: 'political_assassination',
    name: 'Political Assassination',
    type: 'event',
    category: null,
    value: 2,
    flavorText: 'When power is seized, not earned.',
    effect: 'place_self_to_instability',
    targetInstability: 'governance_instability',
    options: null,
    soloEffect: null,
  },

  {
    id: 'flood',
    name: 'Flood',
    type: 'event',
    category: null,
    value: 2,
    flavorText: 'Nature does not negotiate.',
    effect: 'place_self_to_instability',
    targetInstability: 'environment_instability',
    options: null,
    soloEffect: null,
  },

  {
    id: 'occupation',
    name: 'Occupation',
    type: 'event',
    category: null,
    value: 0,
    flavorText: 'Territory taken, resources claimed.',
    effect: 'occupation',
    discardTo: 'military_instability',
    options: [
      {
        label: 'Option 1 — Seize Resources (Economy)',
        description: 'Solo: Draw the top card of the deck and add it to your Economy stack as a bonus card.',
        effect: 'solo_draw_to_economy',
      },
      {
        label: 'Option 2 — Claim Territory (Environment)',
        description: 'Solo: Draw the top card of the deck and add it to your Environment stack as a bonus card.',
        effect: 'solo_draw_to_environment',
      },
    ],
    soloAdaptation: 'draw_top_to_chosen_stack',
  },

  {
    id: 'incursion',
    name: 'Incursion',
    type: 'event',
    category: null,
    value: 0,
    flavorText: 'A border crossed in the night.',
    effect: 'incursion',
    discardTo: 'military_instability',
    options: [
      {
        label: 'Option 1 — Technological Disruption',
        description: 'Solo: Add 1 point of pressure to Technology Instability.',
        effect: 'solo_add_tech_instability',
      },
      {
        label: 'Option 2 — Economic Disruption',
        description: 'Solo: Add 1 point of pressure to Economy Instability.',
        effect: 'solo_add_eco_instability',
      },
    ],
    soloAdaptation: 'add_instability_pressure',
  },

  {
    id: 'cultural_exchange',
    name: 'Cultural Exchange',
    type: 'event',
    category: null,
    value: 0,
    flavorText: 'Ideas cross borders more freely than armies.',
    effect: 'cultural_exchange',
    discardTo: 'culture_instability',
    options: [
      {
        label: 'Option 1 — Exchange',
        description: 'Solo: If Matriarchy is your active Culture, shuffle one Culture Instability card back into the draw deck.',
        effect: 'solo_shuffle_culture_instability',
        condition: { activeCard: { category: 'culture', name: 'Matriarchy' } },
      },
      {
        label: 'Option 2 — Mobilize',
        description: 'Add this card to your Military stack as a bonus card.',
        effect: 'add_self_to_military',
      },
    ],
    soloAdaptation: 'conditional_culture_recovery',
  },

  {
    id: 'revisionist_history',
    name: 'Revisionist History',
    type: 'event',
    category: null,
    value: 0,
    flavorText: 'The past is negotiable. The future is not.',
    effect: 'revisionist_history',
    options: [
      {
        label: 'Remove Instability',
        description: 'Choose one Instability pile. Remove the oldest card from it and shuffle it into the draw deck.',
        effect: 'remove_oldest_instability',
      },
    ],
    soloAdaptation: null,
  },

  {
    id: 'contingency_planning',
    name: 'Contingency Planning',
    type: 'event',
    category: null,
    value: 0,
    flavorText: 'Hope for the best. Prepare for everything else.',
    effect: 'contingency_planning',
    options: [
      {
        label: 'Consolidate',
        description: 'Choose one Instability pile. Shuffle up to 2 cards from it back into the draw deck.',
        effect: 'shuffle_instability_to_deck',
      },
    ],
    soloAdaptation: null,
  },

  {
    id: 'inspiring_speech',
    name: 'Inspiring Speech',
    type: 'event',
    category: null,
    value: 1,
    flavorText: 'Words that move mountains.',
    effect: 'inspiring_speech',
    discardTo: 'chosen_category_stack',
    options: [
      {
        label: 'Boost a Category',
        description: 'Add this card (+1) to any one of your category stacks as a bonus card.',
        effect: 'add_self_to_chosen_stack',
      },
    ],
    soloAdaptation: null,
  },
];

// Build lookup map by id
const CARD_MAP = {};
CARDS.forEach(c => { CARD_MAP[c.id] = c; });

// Starter deck composition (card ids, duplicates allowed)
const STARTER_DECK = [
  // Governance (5)
  'democracy', 'democracy', 'theocracy', 'alliance', 'healthy_democracy',
  // Economy (6)
  'free_trade', 'free_trade', 'industrial_expansion', 'industrial_expansion', 'green_investment', 'green_investment',
  // Culture (6)
  'matriarchy', 'matriarchy', 'patriarchy', 'higher_education', 'higher_education', 'renaissance_culture',
  // Military (4)
  'warrior_tradition', 'warrior_tradition', 'citizen_militia', 'citizen_militia',
  // Technology (4)
  'centers_of_learning', 'centers_of_learning', 'practical_innovation', 'practical_innovation',
  // Environment (5)
  'great_plains', 'great_plains', 'river_canals', 'river_canals', 'frozen_tundra',
  // Events (10)
  'worker_strike', 'worker_strike',
  'political_assassination',
  'flood', 'flood',
  'occupation',
  'incursion',
  'cultural_exchange',
  'revisionist_history', 'revisionist_history',
  'contingency_planning',
  'inspiring_speech', 'inspiring_speech',
];
