// Governance — Card Definitions
// Design rules: docs/design.md | Card list: docs/cards.md
//
// All cards must have: 2 play options, 1–2 discard options.
// Discard destination is chosen at removal time, not play time.
// Category cards: one active per category at a time.
// Event cards: stack on active category cards, go to instability, or produce utility effects.
// Environment category cards use geographic location names only.

const CARDS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // GOVERNANCE — CATEGORY CARDS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'democracy',
    name: 'Democracy',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 2,
    flavorText: 'Power derived from the consent of the governed.',
    options: [
      {
        label: 'Option 1 — Reform',
        description: 'Replace your current Governance. The replaced card is discarded — choose where it goes using its own discard options.',
        effect: 'replace',
        targetCategory: 'governance',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability', bonus: 'draw_1' },
    ],
    requires: null,
  },

  {
    id: 'theocracy',
    name: 'Theocracy',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 2,
    flavorText: 'Divine law made civil law.',
    options: [
      {
        label: 'Option 1 — Decree',
        description: 'Replace your current Governance. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'governance',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'governance',
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
    subtype: 'institution',
    category: 'governance',
    value: 2,
    flavorText: 'No civilization stands alone.',
    options: [
      {
        label: 'Option 1 — Form Alliance',
        description: 'Replace your current Governance. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'governance',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
    requires: null,
  },

  {
    id: 'healthy_democracy',
    name: 'Healthy Democracy',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 4,
    flavorText: 'When institutions mature, liberty flourishes.',
    options: [
      {
        label: 'Option 1 — Mature Institutions',
        description: 'Replace Democracy as your active Governance. Democracy is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'governance',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
    requires: { activeCardName: 'Democracy', categoryScore: { category: 'culture', min: 15 } },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ECONOMY — CATEGORY CARDS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'free_trade',
    name: 'Free Trade',
    type: 'category',
    subtype: 'institution',
    category: 'economy',
    value: 2,
    flavorText: 'Open markets, open opportunities.',
    options: [
      {
        label: 'Option 1 — Open Markets',
        description: 'Replace your current Economy. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'economy',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'industrial_expansion',
    name: 'Industrial Expansion',
    type: 'category',
    subtype: 'institution',
    category: 'economy',
    value: 4,
    flavorText: 'Growth demands sacrifice — usually someone else\'s.',
    options: [
      {
        label: 'Option 1 — Expand Industry',
        description: 'Replace your current Economy. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'economy',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
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
    subtype: 'institution',
    category: 'economy',
    value: 3,
    flavorText: 'Prosperity that does not cost the earth.',
    options: [
      {
        label: 'Option 1 — Sustainable Growth',
        description: 'Replace your current Economy. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'economy',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: { categoryScore: { category: 'environment', min: 14 } },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CULTURE — CATEGORY CARDS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'matriarchy',
    name: 'Matriarchy',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 2,
    flavorText: 'Society shaped by those who sustain it.',
    options: [
      {
        label: 'Option 1 — Establish',
        description: 'Replace your current Culture. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'culture',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
  },

  {
    id: 'patriarchy',
    name: 'Patriarchy',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 2,
    flavorText: 'Order imposed from the top down.',
    options: [
      {
        label: 'Option 1 — Assert Order',
        description: 'Replace your current Culture. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'culture',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
  },

  {
    id: 'higher_education',
    name: 'Higher Education',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 3,
    flavorText: 'Knowledge compounds.',
    options: [
      {
        label: 'Option 1 — Found Institutions',
        description: 'Replace your current Culture. The replaced card is discarded using its own discard options. While active: you may spend an Economy card to remove one Technology Instability card.',
        effect: 'replace',
        targetCategory: 'culture',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
    passiveEffect: 'economy_removes_tech_instability',
  },

  {
    id: 'renaissance_culture',
    name: 'Renaissance Culture',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 5,
    flavorText: 'When art, science, and governance align.',
    options: [
      {
        label: 'Option 1 — Cultural Apex',
        description: 'Replace your current Culture. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'culture',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: { categoryScore: { category: 'governance', min: 16 } },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MILITARY — CATEGORY CARDS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'citizen_militia',
    name: 'Citizen Militia',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 1,
    flavorText: 'Every citizen a defender.',
    options: [
      {
        label: 'Option 1 — Conscript',
        description: 'Replace your current Military. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'military',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'military_instability', label: 'Military Instability' },
    ],
    requires: null,
  },

  {
    id: 'warrior_tradition',
    name: 'Warrior Tradition',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 3,
    flavorText: 'A people who do not forget how to fight.',
    options: [
      {
        label: 'Option 1 — Honor the Tradition',
        description: 'Replace your current Military. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'military',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'military_instability', label: 'Military Instability' },
    ],
    requires: null,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECHNOLOGY — CATEGORY CARDS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'practical_innovation',
    name: 'Practical Innovation',
    type: 'category',
    subtype: 'institution',
    category: 'technology',
    value: 1,
    flavorText: 'Small improvements, compounded daily.',
    options: [
      {
        label: 'Option 1 — Apply',
        description: 'Replace your current Technology. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'technology',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'technology',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
    ],
    requires: null,
  },

  {
    id: 'centers_of_learning',
    name: 'Centers of Learning',
    type: 'category',
    subtype: 'institution',
    category: 'technology',
    value: 2,
    flavorText: 'Knowledge is the only resource that multiplies when shared.',
    options: [
      {
        label: 'Option 1 — Establish',
        description: 'Replace your current Technology. The replaced card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'technology',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'technology',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
    ],
    requires: null,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENVIRONMENT — CATEGORY CARDS (geographic location names only)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'the_great_north',
    name: 'The Great North',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 1,
    flavorText: 'Harsh. Vast. Unyielding.',
    options: [
      {
        label: 'Option 1 — Settle',
        description: 'Claim The Great North as your active territory. The replaced Environment card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'environment',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'environment',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
    ],
    requires: null,
  },

  {
    id: 'the_highlands',
    name: 'The Highlands',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 2,
    flavorText: 'High ground commands the horizon.',
    options: [
      {
        label: 'Option 1 — Claim',
        description: 'Claim The Highlands as your active territory. The replaced Environment card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'environment',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'environment',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
    ],
    requires: null,
  },

  {
    id: 'the_waterlands',
    name: 'The Waterlands',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 2,
    flavorText: 'Where rivers carve the shape of nations.',
    options: [
      {
        label: 'Option 1 — Settle',
        description: 'Claim The Waterlands as your active territory. The replaced Environment card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'environment',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'environment',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'the_union',
    name: 'The Union',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 3,
    flavorText: 'The heartland, contested and coveted.',
    options: [
      {
        label: 'Option 1 — Unify',
        description: 'Claim The Union as your active territory. The replaced Environment card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'environment',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'environment',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
    ],
    requires: null,
  },

  {
    id: 'oceana',
    name: 'Oceana',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 3,
    flavorText: 'The sea gives and the sea takes.',
    options: [
      {
        label: 'Option 1 — Coastal Claim',
        description: 'Claim Oceana as your active territory. The replaced Environment card is discarded using its own discard options.',
        effect: 'replace',
        targetCategory: 'environment',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
        targetCategory: 'environment',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STACKING EVENT CARDS — stack on active category cards, adding to score
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'efficient_administration',
    name: 'Efficient Administration',
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 2,
    flavorText: 'A well-run state hums like a quiet machine.',
    options: [
      {
        label: 'Option 1 — Streamline',
        description: 'Stack on your active Governance card. Adds +2 to Governance score.',
        effect: 'stack_on_category',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Administrative Amnesty',
        description: 'Remove the oldest card from Governance Instability and shuffle it back into the draw deck.',
        effect: 'remove_instability_modal',
        targetCategory: 'governance',
        maxRemove: 1,
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
  },

  {
    id: 'tax_collection',
    name: 'Tax Collection',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 2,
    flavorText: 'The price of civilization, collected quarterly.',
    options: [
      {
        label: 'Option 1 — Fill the Treasury',
        description: 'Stack on your active Economy card. Adds +2 to Economy score.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Redistribute Revenue',
        description: 'Stack on any one category of your choice as a +2 bonus instead.',
        effect: 'stack_on_any_modal',
        bonusValue: 2,
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'cultural_festival',
    name: 'Cultural Festival',
    type: 'event',
    subtype: 'stacking',
    category: 'culture',
    value: 2,
    flavorText: 'A people who celebrate together, endure together.',
    options: [
      {
        label: 'Option 1 — National Celebration',
        description: 'Stack on your active Culture card. Adds +2 to Culture score.',
        effect: 'stack_on_category',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Catharsis',
        description: 'Remove the oldest card from Culture Instability and shuffle it back into the draw deck.',
        effect: 'remove_instability_modal',
        targetCategory: 'culture',
        maxRemove: 1,
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'military_campaign',
    name: 'Military Campaign',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 2,
    flavorText: 'Victory abroad. Questions at home.',
    options: [
      {
        label: 'Option 1 — Press the Advance',
        description: 'Stack on your active Military card. Adds +2 to Military score.',
        effect: 'stack_on_category',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Secure the Frontier',
        description: 'Remove the oldest card from Environment Instability and shuffle it into the draw deck.',
        effect: 'remove_instability_modal',
        targetCategory: 'environment',
        maxRemove: 1,
      },
    ],
    discardTo: [
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  {
    id: 'scientific_breakthrough',
    name: 'Scientific Breakthrough',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 3,
    flavorText: 'An idea that changes everything.',
    options: [
      {
        label: 'Option 1 — Advance the Field',
        description: 'Stack on your active Technology card. Adds +3 to Technology score.',
        effect: 'stack_on_category',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Share the Discovery',
        description: 'Stack on any one category of your choice as a +3 bonus instead. The breakthrough spreads beyond its original field.',
        effect: 'stack_on_any_modal',
        bonusValue: 3,
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'abundant_harvest',
    name: 'Abundant Harvest',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 2,
    flavorText: 'The land provides. For now.',
    options: [
      {
        label: 'Option 1 — Store the Surplus',
        description: 'Stack on your active Environment card. Adds +2 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Sell the Surplus',
        description: 'Stack on your active Economy card as a +2 bonus instead. Convert environmental abundance into economic growth.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
    ],
  },

  {
    id: 'inspiring_speech',
    name: 'Inspiring Speech',
    type: 'event',
    subtype: 'stacking',
    category: null,
    value: 1,
    flavorText: 'Words that move mountains.',
    options: [
      {
        label: 'Option 1 — Galvanize',
        description: 'Stack on any one category of your choice as a +1 bonus.',
        effect: 'stack_on_any_modal',
        bonusValue: 1,
      },
      {
        label: 'Option 2 — Clear the Air',
        description: 'Remove the oldest card from any one Instability pile and shuffle it into the draw deck.',
        effect: 'remove_instability_modal',
        maxRemove: 1,
      },
    ],
    discardTo: [
      { target: 'discard_pile', label: 'Discard Pile' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HAZARD EVENT CARDS — go to instability, subtracting from score
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'worker_strike',
    name: 'Worker Strike',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    flavorText: 'Labor withheld is power revealed.',
    options: [
      {
        label: 'Option 1 — Suffer the Strike',
        description: 'Place into Economy Instability (−2). Workers have brought the economy to a halt.',
        effect: 'place_self_to_instability',
        targetInstability: 'economy',
      },
      {
        label: 'Option 2 — Suppress',
        description: 'Discard this card to avoid Economy Instability. Instead add −1 to Governance Instability (political cost of suppression).',
        effect: 'suppress_hazard',
        altInstability: 'governance',
        altValue: 1,
      },
    ],
    discardTo: [{ target: 'discard_pile', label: 'Discard Pile' }],
  },

  {
    id: 'political_assassination',
    name: 'Political Assassination',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    flavorText: 'When power is seized, not earned.',
    options: [
      {
        label: 'Option 1 — Suffer the Chaos',
        description: 'Place into Governance Instability (−2). The assassination destabilizes your institutions.',
        effect: 'place_self_to_instability',
        targetInstability: 'governance',
      },
      {
        label: 'Option 2 — Foil the Plot',
        description: 'Discard this card. Add −1 to Military Instability instead (the costly intervention to prevent the assassination).',
        effect: 'suppress_hazard',
        altInstability: 'military',
        altValue: 1,
      },
    ],
    discardTo: [{ target: 'discard_pile', label: 'Discard Pile' }],
  },

  {
    id: 'flood',
    name: 'Flood',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    flavorText: 'Nature does not negotiate.',
    options: [
      {
        label: 'Option 1 — Absorb the Loss',
        description: 'Place into Environment Instability (−2). The flood damages your territories.',
        effect: 'place_self_to_instability',
        targetInstability: 'environment',
      },
      {
        label: 'Option 2 — Emergency Response',
        description: 'Discard this card. Add −1 to Economy Instability instead (emergency spending diverts resources).',
        effect: 'suppress_hazard',
        altInstability: 'economy',
        altValue: 1,
      },
    ],
    discardTo: [{ target: 'discard_pile', label: 'Discard Pile' }],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MUST-PLAY EVENT CARDS — resolve immediately when drawn
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'indecisiveness',
    name: 'Indecisiveness',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 1,
    mustPlayWhenDrawn: true,
    flavorText: 'A civilization paralyzed by its own choices.',
    options: [
      {
        label: 'Option 1 — Analysis Paralysis',
        description: 'If you have more than 5 cards in hand (including this one), choose 2 to discard.',
        effect: 'discard_from_hand_modal',
        count: 2,
        condition: { handMoreThan: 5 },
      },
      {
        label: 'Option 2 — Draw from Doubt',
        description: 'If you have fewer than 3 cards in hand (including this one), draw 1 card.',
        effect: 'draw_if_hand_small',
        condition: { handLessThan: 3 },
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UTILITY EVENT CARDS — special effects, recovery, and disruption
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'revisionist_history',
    name: 'Revisionist History',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    flavorText: 'The past is negotiable. The future is not.',
    options: [
      {
        label: 'Option 1 — Rewrite',
        description: 'Choose one Instability pile. Remove the oldest card from it and shuffle it into the draw deck.',
        effect: 'remove_instability_modal',
        maxRemove: 1,
      },
      {
        label: 'Option 2 — Bury It Deeper',
        description: 'Choose one Instability pile. Remove the two oldest cards from it and shuffle them into the draw deck.',
        effect: 'remove_instability_modal',
        maxRemove: 2,
      },
    ],
    discardTo: [{ target: 'discard_pile', label: 'Discard Pile' }],
  },

  {
    id: 'contingency_planning',
    name: 'Contingency Planning',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    flavorText: 'Hope for the best. Prepare for everything else.',
    options: [
      {
        label: 'Option 1 — Prepare',
        description: 'Choose one Instability pile. Shuffle up to 2 cards from it back into the draw deck.',
        effect: 'remove_instability_modal',
        maxRemove: 2,
      },
      {
        label: 'Option 2 — Distribute the Pain',
        description: 'Remove 1 card from each of any two Instability piles and shuffle them into the draw deck.',
        effect: 'remove_two_instability_modal',
        maxRemove: 1,
      },
    ],
    discardTo: [{ target: 'discard_pile', label: 'Discard Pile' }],
  },

  {
    id: 'occupation',
    name: 'Occupation',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    flavorText: 'Territory taken, resources claimed.',
    options: [
      {
        label: 'Option 1 — Seize Resources',
        description: 'Take one stacked card from a player with lower Military and add it to your Economy stack. (Multiplayer only — not available in solo play.)',
        effect: 'multiplayer_only',
      },
      {
        label: 'Option 2 — Consolidate Holdings',
        description: 'Draw a card. Shuffle this card back into the draw deck.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'incursion',
    name: 'Incursion',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    flavorText: 'A border crossed in the night.',
    options: [
      {
        label: 'Option 1 — Border Incursion',
        description: 'Discard one stacked card from another player\'s Technology or Economy stack. (Multiplayer only — not available in solo play.)',
        effect: 'multiplayer_only',
      },
      {
        label: 'Option 2 — Fortify the Border',
        description: 'Stack on your active Military as a +1 bonus.',
        effect: 'stack_on_category',
        targetCategory: 'military',
      },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'cultural_exchange',
    name: 'Cultural Exchange',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    flavorText: 'Ideas cross borders more freely than armies.',
    options: [
      {
        label: 'Option 1 — Exchange Program',
        description: 'An allied player removes one Culture Instability card. (Multiplayer only — not available in solo play.)',
        effect: 'multiplayer_only',
      },
      {
        label: 'Option 2 — Cultural Enrichment',
        description: 'Stack on your active Culture as a +1 bonus.',
        effect: 'stack_on_category',
        targetCategory: 'culture',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },
];

// ─── Lookup map ───────────────────────────────────────────────────────────────
const CARD_MAP = {};
CARDS.forEach(c => { CARD_MAP[c.id] = c; });

// ─── Starter deck ─────────────────────────────────────────────────────────────
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
  // Environment (6)
  'the_great_north', 'the_highlands', 'the_waterlands', 'the_union', 'the_union', 'oceana',
  // Stacking events (9)
  'efficient_administration', 'tax_collection', 'tax_collection',
  'cultural_festival', 'military_campaign',
  'scientific_breakthrough', 'abundant_harvest', 'abundant_harvest',
  'inspiring_speech', 'inspiring_speech',
  // Must-play events (4)
  'indecisiveness', 'indecisiveness', 'indecisiveness', 'indecisiveness',
  // Hazard events (6)
  'worker_strike', 'worker_strike',
  'political_assassination',
  'flood', 'flood',
  // Utility events (5)
  'revisionist_history', 'revisionist_history',
  'contingency_planning',
  'occupation', 'incursion', 'cultural_exchange',
];
