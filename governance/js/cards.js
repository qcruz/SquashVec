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
    benefit: { description: 'You may take the first two Culture resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'culture', count: 2 },
    options: [
      {
        label: 'Option 1 — Reform',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'culture',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Culture resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'culture', count: 2 },
    options: [
      {
        label: 'Option 1 — Decree',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'culture',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Military resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'military', count: 2 },
    options: [
      {
        label: 'Option 1 — Form Alliance',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'military',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
    requires: null,
  },

  {
    id: 'republic',
    name: 'Republic',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 2,
    flavorText: 'Power through representation, not birth.',
    benefit: { description: 'You may take the first two Governance resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'governance', count: 2 },
    options: [
      {
        label: 'Option 1 — Establish the Republic',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'culture',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    id: 'oligarchy',
    name: 'Oligarchy',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 2,
    flavorText: 'Power consolidated among the few.',
    benefit: { description: 'You may take the first two Economy resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'economy', count: 2 },
    options: [
      {
        label: 'Option 1 — Consolidate Power',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'constitutional_monarchy',
    name: 'Constitutional Monarchy',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 3,
    flavorText: 'A crown constrained by law.',
    benefit: { description: 'You may take the first two Culture resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'culture', count: 2 },
    options: [
      {
        label: 'Option 1 — Ratify the Constitution',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'culture',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
    requires: null,
  },

  {
    id: 'dictatorship',
    name: 'Dictatorship',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 3,
    flavorText: 'Order through absolute authority.',
    benefit: { description: 'You may take the first two Military resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'military', count: 2 },
    options: [
      {
        label: 'Option 1 — Seize Control',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'military',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
    requires: null,
  },

  {
    id: 'populist_governance',
    name: 'Populist Governance',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 2,
    flavorText: 'Power drawn from the anger of the many.',
    benefit: { description: 'You may take the first two Culture resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'culture', count: 2 },
    options: [
      {
        label: 'Option 1 — Rise of the People',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'culture',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
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
    benefit: { description: 'You may take the first two Economy resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'economy', count: 2 },
    options: [
      {
        label: 'Option 1 — Open Markets',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'environment',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'shuffle_to_deck', label: 'Shuffle into deck' },
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
    benefit: { description: 'You may take the first two Technology resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'technology', count: 2 },
    options: [
      {
        label: 'Option 1 — Expand Industry',
        description: 'Remove 2 Environment resources from your stack and shuffle them into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'environment',
        costAmount: 2,
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Environment resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'environment', count: 2 },
    options: [
      {
        label: 'Option 1 — Sustainable Growth',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'environment',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'agrarian_economy',
    name: 'Agrarian Economy',
    type: 'category',
    subtype: 'institution',
    category: 'economy',
    value: 1,
    flavorText: 'The earth sustains all.',
    benefit: { description: 'You may take the first two Environment resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'environment', count: 2 },
    options: [
      {
        label: 'Option 1 — Work the Land',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'environment',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    id: 'command_economy',
    name: 'Command Economy',
    type: 'category',
    subtype: 'institution',
    category: 'economy',
    value: 2,
    flavorText: 'Resources directed by the state.',
    benefit: { description: 'You may take the first two Governance resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'governance', count: 2 },
    options: [
      {
        label: 'Option 1 — Central Planning',
        description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'governance',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
    requires: null,
  },

  {
    id: 'banking_system',
    name: 'Banking System',
    type: 'category',
    subtype: 'institution',
    category: 'economy',
    value: 3,
    flavorText: 'Capital creates capital.',
    benefit: { description: 'You may take the first two Economy resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'economy', count: 2 },
    options: [
      {
        label: 'Option 1 — Charter the Banks',
        description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'governance',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
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
    benefit: { description: 'You may take the first two Culture resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'culture', count: 2 },
    options: [
      {
        label: 'Option 1 — Establish',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Culture resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'culture', count: 2 },
    options: [
      {
        label: 'Option 1 — Assert Order',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Technology resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'technology', count: 2 },
    options: [
      {
        label: 'Option 1 — Found Institutions',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Culture resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'culture', count: 2 },
    options: [
      {
        label: 'Option 1 — Cultural Apex',
        description: 'Remove 2 Governance resources from your stack and shuffle them into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'governance',
        costAmount: 2,
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
  },

  {
    id: 'oral_tradition',
    name: 'Oral Tradition',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 1,
    flavorText: 'Knowledge passed by word of mouth.',
    benefit: { description: 'You may take the first two Culture resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'culture', count: 2 },
    options: [
      {
        label: 'Option 1 — Preserve the Stories',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
  },

  {
    id: 'religious_order',
    name: 'Religious Order',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 2,
    flavorText: 'Belief structures that outlast empires.',
    benefit: { description: 'You may take the first two Governance resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'governance', count: 2 },
    options: [
      {
        label: 'Option 1 — Found the Order',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
    requires: null,
  },

  {
    id: 'merchant_class',
    name: 'Merchant Class',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 3,
    flavorText: 'Wealth as social currency.',
    benefit: { description: 'You may take the first two Economy resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'economy', count: 2 },
    options: [
      {
        label: 'Option 1 — Rise of Commerce',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'enlightenment',
    name: 'Enlightenment',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 4,
    flavorText: 'Reason as the highest authority.',
    benefit: { description: 'You may take the first two Technology resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'technology', count: 2 },
    options: [
      {
        label: 'Option 1 — Age of Reason',
        description: 'Remove 2 Technology resources from your stack and shuffle them into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'technology',
        costAmount: 2,
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MILITARY — CATEGORY CARDS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'protectorate',
    name: 'Protectorate',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 1,
    flavorText: 'Security through shields, not swords.',
    benefit: { description: 'You may take the first two Military resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'military', count: 2 },
    options: [
      {
        label: 'Option 1 — Conscript',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'culture',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'military_instability', label: 'Military Instability' },
    ],
    requires: null,
  },

  {
    id: 'aggressive_doctrine',
    name: 'Aggressive Doctrine',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 3,
    flavorText: 'Strike first. Strike hard. Leave no doubt.',
    benefit: { description: 'You may take the first two Military resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'military', count: 2 },
    options: [
      {
        label: 'Option 1 — Honor the Tradition',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'military_instability', label: 'Military Instability' },
    ],
    requires: null,
  },

  {
    id: 'defensive_doctrine',
    name: 'Defensive Doctrine',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 1,
    flavorText: 'Hold the line. Let them come to us.',
    benefit: { description: 'You may take the first two Military resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'military', count: 2 },
    options: [
      {
        label: 'Option 1 — Hold the Line',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'military_instability', label: 'Military Instability' },
    ],
    requires: null,
  },

  {
    id: 'adaptable_force',
    name: 'Adaptable Force',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 2,
    flavorText: 'Neither sword nor shield — both, as the moment demands.',
    benefit: { description: 'You may take the first two Military resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'military', count: 2 },
    options: [
      {
        label: 'Option 1 — Launch the Fleet',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'military_instability', label: 'Military Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'proportional_response',
    name: 'Proportional Response',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 3,
    flavorText: 'Match every blow. No more, no less.',
    benefit: { description: 'You may take the first two Military resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'military', count: 2 },
    options: [
      {
        label: 'Option 1 — Commission the Army',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'military_instability', label: 'Military Instability' },
    ],
    requires: null,
  },

  {
    id: 'overwhelming_force',
    name: 'Overwhelming Force',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 4,
    flavorText: 'Bring enough, and leave no question unanswered.',
    benefit: { description: 'You may take the first two Military resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'military', count: 2 },
    options: [
      {
        label: 'Option 1 — Build the Corps',
        description: 'Remove 2 Technology resources from your stack and shuffle them into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'technology',
        costAmount: 2,
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'military_instability', label: 'Military Instability' },
      { target: 'technology_instability', label: 'Technology Instability' },
    ],
    requires: null,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECHNOLOGY — CATEGORY CARDS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'pragmatism',
    name: 'Pragmatism',
    type: 'category',
    subtype: 'philosophy',
    category: 'technology',
    value: 1,
    flavorText: 'If it works, it is worth doing.',
    benefit: { description: 'You may take the first two Technology resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'technology', count: 2 },
    options: [
      {
        label: 'Option 1 — Apply What Works',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
    ],
    requires: null,
  },

  {
    id: 'explore_the_unknown',
    name: 'Explore the Unknown',
    type: 'category',
    subtype: 'philosophy',
    category: 'technology',
    value: 2,
    flavorText: 'The horizon exists to be crossed.',
    benefit: { description: 'You may take the first two Environment resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'environment', count: 2 },
    options: [
      {
        label: 'Option 1 — Push the Frontier',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'environment_instability', label: 'Environment Instability' },
    ],
    requires: null,
  },

  {
    id: 'cautious_progress',
    name: 'Cautious Progress',
    type: 'category',
    subtype: 'philosophy',
    category: 'technology',
    value: 2,
    flavorText: 'Move fast enough to grow. Slow enough not to break.',
    benefit: { description: 'You may take the first two Technology resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'technology', count: 2 },
    options: [
      {
        label: 'Option 1 — Steady Advance',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
    ],
    requires: null,
  },

  {
    id: 'systematic_inquiry',
    name: 'Systematic Inquiry',
    type: 'category',
    subtype: 'philosophy',
    category: 'technology',
    value: 2,
    flavorText: 'Knowledge organized is knowledge multiplied.',
    benefit: { description: 'You may take the first two Technology resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'technology', count: 2 },
    options: [
      {
        label: 'Option 1 — Establish the Method',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
  },

  {
    id: 'progress_at_all_costs',
    name: 'Progress at All Costs',
    type: 'category',
    subtype: 'philosophy',
    category: 'technology',
    value: 3,
    flavorText: 'The future demands sacrifice.',
    benefit: { description: 'You may take the first two Technology resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'technology', count: 2 },
    options: [
      {
        label: 'Option 1 — Push Without Limits',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'military',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'environment_instability', label: 'Environment Instability' },
    ],
    requires: null,
  },

  {
    id: 'theoretical_foundations',
    name: 'Theoretical Foundations',
    type: 'category',
    subtype: 'philosophy',
    category: 'technology',
    value: 3,
    flavorText: 'Understanding must come before application.',
    benefit: { description: 'You may take the first two Technology resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'technology', count: 2 },
    options: [
      {
        label: 'Option 1 — Build the Framework',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'culture',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Environment resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'environment', count: 2 },
    options: [
      {
        label: 'Option 1 — Settle',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'military',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Military resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'military', count: 2 },
    options: [
      {
        label: 'Option 1 — Claim',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'military',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Economy resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'economy', count: 2 },
    options: [
      {
        label: 'Option 1 — Settle',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Governance resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'governance', count: 2 },
    options: [
      {
        label: 'Option 1 — Unify',
        description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'governance',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    benefit: { description: 'You may take the first two Economy resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'economy', count: 2 },
    options: [
      {
        label: 'Option 1 — Coastal Claim',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'military',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    id: 'the_fertile_plains',
    name: 'The Fertile Plains',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 2,
    flavorText: 'Grain and growth, season after season.',
    benefit: { description: 'You may take the first two Environment resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'environment', count: 2 },
    options: [
      {
        label: 'Option 1 — Settle the Plains',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    id: 'the_desert_wastes',
    name: 'The Desert Wastes',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 1,
    flavorText: 'Harsh land builds harder people.',
    benefit: { description: 'You may take the first two Military resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'military', count: 2 },
    options: [
      {
        label: 'Option 1 — Endure the Waste',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'military',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
        targetCategory: 'environment',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
    ],
    requires: null,
  },

  {
    id: 'the_river_delta',
    name: 'The River Delta',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 3,
    flavorText: 'Where rivers meet, civilizations flourish.',
    benefit: { description: 'You may take the first two Economy resource cards from the draw deck and add them to your hand. Shuffle the draw deck.', resourceCategory: 'economy', count: 2 },
    options: [
      {
        label: 'Option 1 — Settle the Delta',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
      },
      {
        label: 'Option 2 — Hold Off',
        description: 'Draw 1 card. Shuffle this card into the draw deck.',
        effect: 'draw_and_shuffle_self',
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
    value: 1,
    flavorText: 'A well-run state hums like a quiet machine.',
    options: [
      {
        label: 'Option 1 — Streamline Technology',
        description: 'Remove a resource from your Technology stack and shuffle it into the draw deck. Place this card in your Governance Stack (+1).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'technology',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Streamline Culture',
        description: 'Remove a resource from your Culture stack and shuffle it into the draw deck. Place this card in your Governance Stack (+1).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'governance',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
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
        label: 'Option 1 — Collect from Culture',
        description: 'Remove a resource from your Culture stack and shuffle it into the draw deck. Place this card in your Economy Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Reinvest',
        description: 'Remove a resource from your Economy stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'tax_increase',
    name: 'Tax Increase',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 2,
    flavorText: 'Revenue rises. So does resentment.',
    options: [
      {
        label: 'Option 1 — Collect Revenue',
        description: 'Stack on your active Economy card. Adds +2 to Economy score.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Fund the State',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'economy',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'tax_decrease',
    name: 'Tax Decrease',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 1,
    flavorText: 'Popular today. Costly tomorrow.',
    options: [
      {
        label: 'Option 1 — Public Relief',
        description: 'Stack on your active Governance card. Adds +1 to Governance score.',
        effect: 'stack_on_category',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Stimulate the Market',
        description: 'Stack on your active Economy card. Adds +1 to Economy score.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
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
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'culture',
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
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'military',
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
    value: 2,
    flavorText: 'An idea that changes everything.',
    options: [
      {
        label: 'Option 1 — Advance the Field',
        description: 'Remove a resource from your Economy stack and shuffle it into the draw deck. Place this card in your Technology Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'economy',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Share the Discovery',
        description: 'Remove a resource from your Culture stack and shuffle it into the draw deck. Place this card in your Military Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'military',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'abundant_harvest',
    name: 'Abundant Harvest',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    flavorText: 'The land provides. For now.',
    options: [
      {
        label: 'Option 1 — Store the Surplus',
        description: 'Stack on your active Environment card. Adds +1 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
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
      { target: 'shuffle_to_deck', label: 'Shuffle into deck' },
    ],
  },

  {
    id: 'activists',
    name: 'Activists',
    type: 'event',
    subtype: 'stacking',
    category: 'culture',
    value: 1,
    flavorText: 'Where institutions fail, the people organize.',
    options: [
      {
        label: 'Option 1 — Cultural Pressure',
        description: 'If you have instability in your Culture stack, place this card in your Culture Stack (+1).',
        effect: 'stack_on_category',
        targetCategory: 'culture',
        condition: { instabilityExists: 'culture' },
      },
      {
        label: 'Option 2 — Military Protest',
        description: 'If you have instability in your Military stack, place this card in your Culture Stack (+1).',
        effect: 'stack_on_category',
        targetCategory: 'culture',
        condition: { instabilityExists: 'military' },
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'unions',
    name: 'Unions',
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 1,
    flavorText: 'Organized labor reshapes the social contract.',
    options: [
      {
        label: 'Option 1 — Economic Rights',
        description: 'If you have instability in your Economy stack, place this card in your Governance Stack (+1).',
        effect: 'stack_on_category',
        targetCategory: 'governance',
        condition: { instabilityExists: 'economy' },
      },
      {
        label: 'Option 2 — Environmental Advocacy',
        description: 'If you have instability in your Environment stack, place this card in your Governance Stack (+1).',
        effect: 'stack_on_category',
        targetCategory: 'governance',
        condition: { instabilityExists: 'environment' },
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
  },

  {
    id: 'loyalists',
    name: 'Loyalists',
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 1,
    flavorText: 'Those who uphold the state in its hour of need.',
    options: [
      {
        label: 'Option 1 — Cultural Loyalty',
        description: 'Remove a resource from your Culture stack and shuffle it into the draw deck. Place this card in your Governance Stack (+1).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Political Enforcement',
        description: 'Remove a resource from your Governance stack and shuffle it into the draw deck. Place this card in your Military Stack (+1).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'governance',
        targetCategory: 'military',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // — Governance stacking events —

  {
    id: 'public_works',
    name: 'Public Works',
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 2,
    flavorText: 'Roads, aqueducts, walls — the skeleton of civilization.',
    options: [
      {
        label: 'Option 1 — Fund the Works',
        description: 'Remove a resource from your Economy stack and shuffle it into the draw deck. Place this card in your Governance Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'economy',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Redirect Funds',
        description: 'If you have instability in your Military stack, place this card in your Governance Stack (+2).',
        effect: 'stack_on_category',
        targetCategory: 'governance',
        condition: { instabilityExists: 'military' },
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'civic_charter',
    name: 'Civic Charter',
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 2,
    flavorText: 'Written rights outlast the rulers who grant them.',
    options: [
      {
        label: 'Option 1 — Codify Rights',
        description: 'Remove a resource from your Culture stack and shuffle it into the draw deck. Place this card in your Governance Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Stack on Governance',
        description: 'Stack on your active Governance card. Adds +2 to Governance score.',
        effect: 'stack_on_category',
        targetCategory: 'governance',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  // — Economy stacking events —

  {
    id: 'trade_routes',
    name: 'Trade Routes',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 2,
    flavorText: 'Goods flow where roads and rivers lead.',
    options: [
      {
        label: 'Option 1 — Open the Routes',
        description: 'Remove a resource from your Environment stack and shuffle it into the draw deck. Place this card in your Economy Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'environment',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Stack on Economy',
        description: 'Stack on your active Economy card. Adds +2 to Economy score.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'market_expansion',
    name: 'Market Expansion',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 1,
    flavorText: 'A new stall, a new surplus.',
    options: [
      {
        label: 'Option 1 — Grow the Market',
        description: 'Stack on your active Economy card. Adds +1 to Economy score.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'economy',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  // — Culture stacking events —

  {
    id: 'artistic_movement',
    name: 'Artistic Movement',
    type: 'event',
    subtype: 'stacking',
    category: 'culture',
    value: 2,
    flavorText: 'When the people speak through art.',
    options: [
      {
        label: 'Option 1 — State Patronage',
        description: 'Remove a resource from your Governance stack and shuffle it into the draw deck. Place this card in your Culture Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'governance',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Cultural Reform',
        description: 'Remove a Governance instability card and shuffle it into the draw deck. Shuffle this card into the deck.',
        effect: 'remove_instability_modal',
        maxRemove: 1,
        sourceCategory: 'governance',
        selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'folk_songs',
    name: 'Folk Songs',
    type: 'event',
    subtype: 'stacking',
    category: 'culture',
    value: 1,
    flavorText: 'Memory and meaning carried in melody.',
    options: [
      {
        label: 'Option 1 — Sing Together',
        description: 'Stack on your active Culture card. Adds +1 to Culture score.',
        effect: 'stack_on_category',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'culture',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  // — Military utility events —

  {
    id: 'military_exercise',
    name: 'Military Exercise',
    type: 'event',
    subtype: 'utility',
    category: 'military',
    value: 1,
    flavorText: 'Strength forged through sacrifice and repetition.',
    options: [
      {
        label: 'Option 1 — Full Drill',
        description: 'Remove two resources from your Military stack and shuffle them into the draw deck. Choose any three cards from your hand and discard them.',
        effect: 'remove_two_military_then_discard_three_hand',
      },
      {
        label: 'Option 2 — Rapid Deployment',
        description: 'Remove two resources from your Military stack and shuffle them into the draw deck. Draw two cards.',
        effect: 'remove_two_military_then_draw_two',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // — Military stacking events —

  {
    id: 'war_council',
    name: 'War Council',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 2,
    flavorText: 'Strategy outlasts strength.',
    options: [
      {
        label: 'Option 1 — Fund the Campaign',
        description: 'Remove a resource from your Economy stack and shuffle it into the draw deck. Place this card in your Military Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'economy',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Stack on Military',
        description: 'Stack on your active Military card. Adds +2 to Military score.',
        effect: 'stack_on_category',
        targetCategory: 'military',
      },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'border_fortification',
    name: 'Border Fortification',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 1,
    flavorText: 'Stone and timber between us and them.',
    options: [
      {
        label: 'Option 1 — Fortify',
        description: 'Stack on your active Military card. Adds +1 to Military score.',
        effect: 'stack_on_category',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'military',
      },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  // — Technology stacking events —

  {
    id: 'research_grants',
    name: 'Research Grants',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 2,
    flavorText: 'Discovery funded, discovery made.',
    options: [
      {
        label: 'Option 1 — Allocate Funding',
        description: 'Remove a resource from your Economy stack and shuffle it into the draw deck. Place this card in your Technology Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'economy',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Stack on Technology',
        description: 'Stack on your active Technology card. Adds +2 to Technology score.',
        effect: 'stack_on_category',
        targetCategory: 'technology',
      },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'cartography',
    name: 'Cartography',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 1,
    flavorText: 'To map the world is to begin to master it.',
    options: [
      {
        label: 'Option 1 — Chart the Land',
        description: 'Stack on your active Technology card. Adds +1 to Technology score.',
        effect: 'stack_on_category',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Technology resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'technology',
      },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  // — Environment stacking events —

  {
    id: 'river_network',
    name: 'River Network',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    flavorText: 'Control the water, control the region.',
    options: [
      {
        label: 'Option 1 — Manage the Rivers',
        description: 'Stack on your active Environment card. Adds +1 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'land_survey',
    name: 'Land Survey',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    flavorText: 'Every boundary drawn begins a claim.',
    options: [
      {
        label: 'Option 1 — Survey the Territory',
        description: 'Stack on your active Environment card. Adds +1 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  // — Governance resource-focused stacking events —

  {
    id: 'civic_assembly',
    name: 'Civic Assembly',
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 1,
    flavorText: 'The people convene. Something shifts.',
    options: [
      {
        label: 'Option 1 — Convene',
        description: 'Stack on your active Governance card. Adds +1 to Governance score.',
        effect: 'stack_on_category',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'governance',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'public_decree',
    name: 'Public Decree',
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 2,
    flavorText: 'The state speaks. What it says, holds.',
    options: [
      {
        label: 'Option 1 — Issue the Decree',
        description: 'Stack on your active Governance card. Adds +2 to Governance score.',
        effect: 'stack_on_category',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'governance',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  // — Economy resource-focused stacking events —

  {
    id: 'surplus_goods',
    name: 'Surplus Goods',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 1,
    flavorText: 'More than needed. For now.',
    options: [
      {
        label: 'Option 1 — Hold the Surplus',
        description: 'Stack on your active Economy card. Adds +1 to Economy score.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'economy',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'trade_surplus',
    name: 'Trade Surplus',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 2,
    flavorText: 'The ledger tips in our favor.',
    options: [
      {
        label: 'Option 1 — Reinvest',
        description: 'Stack on your active Economy card. Adds +2 to Economy score.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'economy',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  // — Culture resource-focused stacking events —

  {
    id: 'oral_history',
    name: 'Oral History',
    type: 'event',
    subtype: 'stacking',
    category: 'culture',
    value: 1,
    flavorText: 'Stories outlast stone.',
    options: [
      {
        label: 'Option 1 — Preserve the Stories',
        description: 'Stack on your active Culture card. Adds +1 to Culture score.',
        effect: 'stack_on_category',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'culture',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  // — Military resource-focused stacking events —

  {
    id: 'battle_hardened',
    name: 'Battle Hardened',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 1,
    flavorText: 'What does not break, tempers.',
    options: [
      {
        label: 'Option 1 — Harden the Forces',
        description: 'Stack on your active Military card. Adds +1 to Military score.',
        effect: 'stack_on_category',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'military',
      },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  // — Technology resource-focused stacking events —

  {
    id: 'invention_workshop',
    name: 'Invention Workshop',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 1,
    flavorText: 'Where tools are born.',
    options: [
      {
        label: 'Option 1 — Tinker',
        description: 'Stack on your active Technology card. Adds +1 to Technology score.',
        effect: 'stack_on_category',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Technology resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'technology',
      },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'applied_science',
    name: 'Applied Science',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 2,
    flavorText: 'Theory put to work.',
    options: [
      {
        label: 'Option 1 — Put It to Use',
        description: 'Stack on your active Technology card. Adds +2 to Technology score.',
        effect: 'stack_on_category',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Technology resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'technology',
      },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  // — Environment resource-focused stacking events —

  {
    id: 'frozen_tundra',
    name: 'Frozen Tundra',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    flavorText: 'What the cold preserves, it preserves forever.',
    options: [
      {
        label: 'Option 1 — Endure',
        description: 'Stack on your active Environment card. Adds +1 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'dense_forests',
    name: 'Dense Forests',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 2,
    flavorText: 'Timber, shelter, shadow — the forest gives without asking.',
    options: [
      {
        label: 'Option 1 — Claim the Canopy',
        description: 'Stack on your active Environment card. Adds +2 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'mineral_deposits',
    name: 'Mineral Deposits',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 2,
    flavorText: 'Wealth buried just beneath the surface.',
    options: [
      {
        label: 'Option 1 — Extract',
        description: 'Stack on your active Environment card. Adds +2 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'rare_plants',
    name: 'Rare Plants',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    flavorText: 'Medicines, dyes, and poisons — all from the same root.',
    options: [
      {
        label: 'Option 1 — Cultivate',
        description: 'Stack on your active Environment card. Adds +1 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'rich_soil',
    name: 'Rich Soil',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    flavorText: 'The foundation of every great civilization.',
    options: [
      {
        label: 'Option 1 — Till and Sow',
        description: 'Stack on your active Environment card. Adds +1 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'natural_springs',
    name: 'Natural Springs',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    flavorText: 'Clean water is the oldest form of wealth.',
    options: [
      {
        label: 'Option 1 — Protect the Source',
        description: 'Stack on your active Environment card. Adds +1 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'coastal_fisheries',
    name: 'Coastal Fisheries',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    flavorText: 'The sea feeds those willing to brave it.',
    options: [
      {
        label: 'Option 1 — Cast the Nets',
        description: 'Stack on your active Environment card. Adds +1 to Environment score.',
        effect: 'stack_on_category',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Focus Elsewhere',
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on any category as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  // — General stacking events —

  {
    id: 'trade_delegation',
    name: 'Trade Delegation',
    type: 'event',
    subtype: 'stacking',
    category: null,
    value: 1,
    flavorText: 'Diplomacy and commerce, two faces of the same coin.',
    options: [
      {
        label: 'Option 1 — Negotiate',
        description: 'Stack on any one category of your choice as a +1 bonus.',
        effect: 'stack_on_any_modal',
        bonusValue: 1,
      },
      {
        label: 'Option 2 — Return Empty-Handed',
        description: 'Shuffle this card into the draw deck and draw a card.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
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
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Meet Their Demands',
        description: 'Remove 1 resource from your Economy stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
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
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Foil the Plot',
        description: 'Remove 1 resource from your Military stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
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
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Emergency Response',
        description: 'Remove 1 resource from your Economy stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'corruption',
    name: 'Corruption',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    flavorText: 'Power rots from the inside.',
    options: [
      {
        label: 'Option 1 — Suffer the Scandal',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Root Out Corruption',
        description: 'Remove 1 resource from your Governance stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'epidemic',
    name: 'Epidemic',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    flavorText: 'Disease spreads where borders cannot.',
    options: [
      {
        label: 'Option 1 — Suffer the Outbreak',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Emergency Response',
        description: 'Remove a resource from your Economy stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
  },

  {
    id: 'drought',
    name: 'Drought',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    flavorText: 'The sky withholds what the earth needs.',
    options: [
      {
        label: 'Option 1 — Absorb the Famine',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Import Supplies',
        description: 'Remove 1 resource from your Economy stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'rebellion',
    name: 'Rebellion',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    flavorText: 'The governed withdraw their consent.',
    options: [
      {
        label: 'Option 1 — Suppress the Uprising',
        description: 'Remove a resource from your Governance stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'governance',
      },
      {
        label: 'Option 2 — Lose Control',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'military_instability', label: 'Military Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'coup_attempt',
    name: 'Coup Attempt',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    flavorText: 'Power seized in darkness rarely holds in light.',
    options: [
      {
        label: 'Option 1 — Suppress the Coup',
        description: 'Remove a resource from your Governance stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'governance',
      },
      {
        label: 'Option 2 — Lose Control',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INSTABILITY EVENTS — environmental, social, economic, and technological hazards
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'earthquake',
    name: 'Earthquake',
    type: 'event',
    subtype: 'hazard',
    category: 'environment',
    value: 2,
    flavorText: 'The ground beneath certainty gives way.',
    options: [
      { label: 'Option 1 — Struck', description: 'Send to Environment instability.', effect: 'discard_self' },
      { label: 'Option 2 — Prepare', description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'military' },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'tornado',
    name: 'Tornado',
    type: 'event',
    subtype: 'hazard',
    category: 'environment',
    value: 2,
    flavorText: "Nature's indifferent fury leaves little standing.",
    options: [
      { label: 'Option 1 — Swept Away', description: 'Send to Environment instability.', effect: 'discard_self' },
      { label: 'Option 2 — Shelter In Place', description: 'Remove 1 Technology resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'technology' },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'harsh_winter',
    name: 'Harsh Winter',
    type: 'event',
    subtype: 'hazard',
    category: 'environment',
    value: 2,
    flavorText: 'Cold that does not relent. Supplies that do not last.',
    options: [
      { label: 'Option 1 — Endure the Cold', description: 'Send to Environment instability.', effect: 'discard_self' },
      { label: 'Option 2 — Emergency Reserves', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'scorched_summer',
    name: 'Scorched Summer',
    type: 'event',
    subtype: 'hazard',
    category: 'environment',
    value: 2,
    flavorText: 'The heat does not break. Crops wither. Tempers rise.',
    options: [
      { label: 'Option 1 — Suffer the Heat', description: 'Send to Environment instability.', effect: 'discard_self' },
      { label: 'Option 2 — Emergency Rationing', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'political_strife',
    name: 'Political Strife',
    type: 'event',
    subtype: 'hazard',
    category: 'governance',
    value: 2,
    flavorText: 'Factions fracture the halls of power.',
    options: [
      { label: 'Option 1 — Gridlock', description: 'Send to Governance instability.', effect: 'discard_self' },
      { label: 'Option 2 — Appease', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'recession',
    name: 'Recession',
    type: 'event',
    subtype: 'hazard',
    category: 'economy',
    value: 2,
    flavorText: 'Markets contract. Belts tighten.',
    options: [
      { label: 'Option 1 — Downturn', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — Stimulus', description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'national_debt',
    name: 'National Debt',
    type: 'event',
    subtype: 'hazard',
    category: 'economy',
    value: 3,
    flavorText: 'Borrowed prosperity has a due date.',
    options: [
      { label: 'Option 1 — Borrowed Time', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — Austerity', description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'crime_wave',
    name: 'Crime Wave',
    type: 'event',
    subtype: 'hazard',
    category: 'governance',
    value: 1,
    flavorText: 'When order fails, chaos fills the vacuum.',
    options: [
      { label: 'Option 1 — Uncontrolled', description: 'Send to Governance instability.', effect: 'discard_self' },
      { label: 'Option 2 — Crackdown', description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'military' },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'youthful_dissent',
    name: 'Youthful Dissent',
    type: 'event',
    subtype: 'hazard',
    category: 'culture',
    value: 1,
    flavorText: 'A generation questions everything it was taught.',
    options: [
      { label: 'Option 1 — Rising Tension', description: 'Send to Culture instability.', effect: 'discard_self' },
      { label: 'Option 2 — Channel the Energy', description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'stalled_research',
    name: 'Stalled Research',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 2,
    flavorText: 'The path forward goes dark.',
    options: [
      { label: 'Option 1 — Dead End', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Pivot Funding', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'public_backlash',
    name: 'Public Backlash',
    type: 'event',
    subtype: 'hazard',
    category: 'governance',
    value: 2,
    flavorText: 'The people make their displeasure known.',
    options: [
      { label: 'Option 1 — Popular Anger', description: 'Send to Governance instability.', effect: 'discard_self' },
      { label: 'Option 2 — Reform', description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'culture' },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'adverse_side_effects',
    name: 'Adverse Side Effects',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 2,
    flavorText: 'Progress brings unintended consequences.',
    options: [
      { label: 'Option 1 — Fallout', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Contain the Damage', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'leaked_report',
    name: 'Leaked Report',
    type: 'event',
    subtype: 'hazard',
    category: 'governance',
    value: 2,
    flavorText: 'Secrets rarely stay secret.',
    options: [
      { label: 'Option 1 — Exposed', description: 'Send to Governance instability.', effect: 'discard_self' },
      { label: 'Option 2 — Spin It', description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'culture' },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  // — Economy hazards —

  {
    id: 'market_crash',
    name: 'Market Crash',
    type: 'event', subtype: 'hazard', category: 'economy', value: 3,
    flavorText: 'Confidence evaporates. Overnight, everything is worth less.',
    options: [
      { label: 'Option 1 — Freefall', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — State Intervention', description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'trade_war',
    name: 'Trade War',
    type: 'event', subtype: 'hazard', category: 'economy', value: 2,
    flavorText: 'Tariffs answered with tariffs. No one wins.',
    options: [
      { label: 'Option 1 — Absorb the Costs', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — Show of Force', description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'military' },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'supply_shortage',
    name: 'Supply Shortage',
    type: 'event', subtype: 'hazard', category: 'economy', value: 2,
    flavorText: 'The shelves empty before anyone sees it coming.',
    options: [
      { label: 'Option 1 — Accept the Scarcity', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — Innovate Around It', description: 'Remove 1 Technology resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'technology' },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'hyperinflation',
    name: 'Hyperinflation',
    type: 'event', subtype: 'hazard', category: 'economy', value: 3,
    flavorText: 'When money loses meaning, so does everything built on it.',
    options: [
      { label: 'Option 1 — Collapse', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — Austerity Measures', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  // — Culture hazards —

  {
    id: 'cultural_suppression',
    name: 'Cultural Suppression',
    type: 'event', subtype: 'hazard', category: 'culture', value: 2,
    flavorText: 'What cannot be expressed festers into resentment.',
    options: [
      { label: 'Option 1 — Silence Prevails', description: 'Send to Culture instability.', effect: 'discard_self' },
      { label: 'Option 2 — Reform from Above', description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'generational_divide',
    name: 'Generational Divide',
    type: 'event', subtype: 'hazard', category: 'culture', value: 2,
    flavorText: 'The old and the young no longer speak the same language.',
    options: [
      { label: 'Option 1 — Let It Fracture', description: 'Send to Culture instability.', effect: 'discard_self' },
      { label: 'Option 2 — Shared Story', description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'culture' },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'loss_of_faith',
    name: 'Loss of Faith',
    type: 'event', subtype: 'hazard', category: 'culture', value: 2,
    flavorText: 'When belief collapses, the structures built on it follow.',
    options: [
      { label: 'Option 1 — Drift', description: 'Send to Culture instability.', effect: 'discard_self' },
      { label: 'Option 2 — Cultural Renewal', description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'culture' },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'brain_drain',
    name: 'Brain Drain',
    type: 'event', subtype: 'hazard', category: 'culture', value: 2,
    flavorText: 'The best leave for somewhere they are valued.',
    options: [
      { label: 'Option 1 — Accept the Loss', description: 'Send to Culture instability.', effect: 'discard_self' },
      { label: 'Option 2 — Incentivize Return', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  // — Military hazards —

  {
    id: 'mutiny',
    name: 'Mutiny',
    type: 'event', subtype: 'hazard', category: 'military', value: 3,
    flavorText: 'When those who carry arms turn them inward.',
    options: [
      { label: 'Option 1 — Lose Control', description: 'Send to Military instability.', effect: 'discard_self' },
      { label: 'Option 2 — Restore Order', description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'desertion',
    name: 'Desertion',
    type: 'event', subtype: 'hazard', category: 'military', value: 2,
    flavorText: 'Soldiers vote with their feet.',
    options: [
      { label: 'Option 1 — Suffer the Losses', description: 'Send to Military instability.', effect: 'discard_self' },
      { label: 'Option 2 — Pay for Loyalty', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'border_skirmish',
    name: 'Border Skirmish',
    type: 'event', subtype: 'hazard', category: 'military', value: 2,
    flavorText: 'A small conflict that threatens to become something larger.',
    options: [
      { label: 'Option 1 — Absorb the Blow', description: 'Send to Military instability.', effect: 'discard_self' },
      { label: 'Option 2 — Show of Strength', description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'military' },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'arms_shortage',
    name: 'Arms Shortage',
    type: 'event', subtype: 'hazard', category: 'military', value: 2,
    flavorText: 'A force without equipment is no force at all.',
    options: [
      { label: 'Option 1 — Go Without', description: 'Send to Military instability.', effect: 'discard_self' },
      { label: 'Option 2 — Emergency Procurement', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  // — Technology hazards —

  {
    id: 'remote_attack',
    name: 'Remote Attack',
    type: 'event', subtype: 'hazard', category: 'technology', value: 2,
    flavorText: 'The enemy strikes without a face or a border.',
    options: [
      { label: 'Option 1 — Absorb the Breach', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Counter Response', description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'military' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'failed_experiment',
    name: 'Failed Experiment',
    type: 'event', subtype: 'hazard', category: 'technology', value: 2,
    flavorText: 'Not all progress goes forward.',
    options: [
      { label: 'Option 1 — Write It Off', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Redirect Funding', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'obsolescence',
    name: 'Obsolescence',
    type: 'event', subtype: 'hazard', category: 'technology', value: 2,
    flavorText: 'What led yesterday falls behind today.',
    options: [
      { label: 'Option 1 — Fall Behind', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Reinvest', description: 'Remove 1 Technology resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'technology' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'record_breach',
    name: 'Record Breach',
    type: 'event', subtype: 'hazard', category: 'technology', value: 2,
    flavorText: 'Private knowledge made public. Trust, once broken, is slow to rebuild.',
    options: [
      { label: 'Option 1 — Exposed', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Contain the Fallout', description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
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
        description: 'If you have more than 5 cards in hand (including this one), choose 1 to discard. Indecisiveness shuffles into the deck.',
        effect: 'discard_from_hand_modal',
        count: 1,
        condition: { handMoreThan: 5 },
      },
      {
        label: 'Option 2 — Draw from Doubt',
        description: 'If you have 5 or fewer cards in hand (including this one), draw 2 cards. Indecisiveness shuffles into the deck.',
        effect: 'draw_if_hand_small',
        condition: { handLessThan: 6 },
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
        description: 'Remove 1 resource from your Governance stack and shuffle it into the draw deck. Then choose one Instability pile — remove the oldest card from it and shuffle it into the draw deck. Discard this card.',
        effect: 'remove_stack_card_then_remove_instability',
        sourceCategory: 'governance',
        maxRemove: 1,
        selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Return to the Archives',
        description: 'Shuffle this card into the draw deck and draw a card.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'technology_instability', label: 'Technology Instability' },
    ],
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
        label: 'Option 1 — Triage',
        description: 'Choose a category. Shuffle the lowest-value instability card from that pile back into the draw deck. Discard this card.',
        effect: 'remove_lowest_instability_modal',
        selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Redirect',
        description: 'Move 1 instability card from one category to another. Discard this card.',
        effect: 'move_instability_modal',
        selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
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
        label: 'Option 1 — Seize and Advance',
        description: 'Choose an available environment or culture resource in play and add it to your own Economy stack. Remove a resource from your Military stack and shuffle it into the draw deck. Discard this card.',
        effect: 'take_resource_to_economy',
        sourceCategories: ['environment', 'culture'],
        afterEffect: 'remove_military_discard_self',
      },
      {
        label: 'Option 2 — Dig In',
        description: 'Choose an available environment or culture resource in play and add it to your own Economy stack. Place this card in your Military Instability.',
        effect: 'take_resource_to_economy',
        sourceCategories: ['environment', 'culture'],
        afterEffect: 'place_military_instability',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
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
        label: 'Option 1 — Strike and Withdraw',
        description: 'Choose an available technology or economy resource in play and add it to your own Economy stack. Remove a resource from your Military stack and shuffle it into the draw deck. Discard this card.',
        effect: 'take_resource_to_economy',
        sourceCategories: ['technology', 'economy'],
        afterEffect: 'remove_military_discard_self',
      },
      {
        label: 'Option 2 — Hold the Line',
        description: 'Choose an available technology or economy resource in play and add it to your own Economy stack. Place this card in your Military Instability.',
        effect: 'take_resource_to_economy',
        sourceCategories: ['technology', 'economy'],
        afterEffect: 'place_military_instability',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'sanctions',
    name: 'Sanctions',
    type: 'event',
    subtype: 'utility',
    category: 'military',
    value: 1,
    flavorText: 'Power does not always wear armor.',
    options: [
      {
        label: 'Option 1 — Economic Pressure',
        description: 'Remove a resource from your Military stack and shuffle it into the draw deck. Choose any card in your hand — it must be discarded. Discard this card.',
        effect: 'remove_military_then_discard_hand_self_discard',
      },
      {
        label: 'Option 2 — Hold the Line',
        description: 'Choose any card in your hand — it must be discarded. Place this card in your Military Instability.',
        effect: 'discard_hand_then_self',
        afterInstability: 'military',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
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
        label: 'Option 1 — Open Dialogue',
        description: 'Remove one card from Culture Instability and shuffle it into the draw deck. Discard this card.',
        effect: 'remove_instability_modal',
        targetCategory: 'culture',
        maxRemove: 1,
        selfDiscardFlow: true,
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

  {
    id: 'peace_treaty',
    name: 'Peace Treaty',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    flavorText: 'The most expensive document ever signed.',
    options: [
      {
        label: 'Option 1 — End the Conflict',
        description: 'Choose the Military or Governance Instability pile. Remove up to 2 oldest cards from it and shuffle them into the draw deck.',
        effect: 'remove_instability_modal',
        maxRemove: 2,
      },
      {
        label: 'Option 2 — Stall for Time',
        description: 'Shuffle this card into the draw deck and draw a card.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'diplomatic_mission',
    name: 'Diplomatic Mission',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    flavorText: 'An envoy sent with hope and no guarantees.',
    options: [
      {
        label: 'Option 1 — Negotiate Peace',
        description: 'Choose one Instability pile. Remove up to 2 oldest cards from it and shuffle them into the draw deck. Then discard this card.',
        effect: 'remove_instability_modal',
        maxRemove: 2,
        selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Return with Intelligence',
        description: 'Shuffle this card into the draw deck and draw a card.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'census',
    name: 'Census',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    flavorText: 'To count the people is to begin to govern them.',
    options: [
      {
        label: 'Option 1 — Count the Cost',
        description: 'Remove the oldest card from any one Instability pile and shuffle it into the draw deck. Then discard this card.',
        effect: 'remove_instability_modal',
        maxRemove: 1,
        selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Assess and Plan',
        description: 'Shuffle this card into the draw deck and draw a card.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },
];

// ─── Lookup map ───────────────────────────────────────────────────────────────
const CARD_MAP = {};
CARDS.forEach(c => { CARD_MAP[c.id] = c; });

// ─── Starter deck ─────────────────────────────────────────────────────────────
const STARTER_DECK = [
  // Governance (9)
  'democracy', 'democracy', 'theocracy', 'alliance',
  'republic', 'republic', 'oligarchy', 'constitutional_monarchy', 'dictatorship', 'populist_governance',
  // Economy (9)
  'free_trade', 'free_trade', 'industrial_expansion', 'industrial_expansion', 'green_investment', 'green_investment',
  'agrarian_economy', 'agrarian_economy', 'command_economy', 'banking_system',
  // Culture (10)
  'matriarchy', 'matriarchy', 'patriarchy', 'higher_education', 'higher_education', 'renaissance_culture',
  'oral_tradition', 'oral_tradition', 'religious_order', 'merchant_class', 'enlightenment',
  // Military (8)
  'aggressive_doctrine', 'aggressive_doctrine', 'protectorate', 'protectorate',
  'defensive_doctrine', 'defensive_doctrine', 'adaptable_force', 'proportional_response', 'overwhelming_force',
  // Technology (8)
  'pragmatism', 'pragmatism', 'explore_the_unknown', 'explore_the_unknown',
  'cautious_progress', 'cautious_progress', 'systematic_inquiry', 'progress_at_all_costs', 'theoretical_foundations',
  // Environment (9)
  'the_great_north', 'the_highlands', 'the_waterlands', 'the_union', 'the_union', 'oceana',
  'the_fertile_plains', 'the_fertile_plains', 'the_desert_wastes', 'the_river_delta',
  // Stacking events
  'efficient_administration', 'tax_collection', 'tax_collection', 'tax_increase', 'tax_increase', 'tax_decrease', 'tax_decrease',
  'cultural_festival', 'military_campaign',
  'scientific_breakthrough',
  'abundant_harvest', 'abundant_harvest', 'abundant_harvest', 'abundant_harvest', 'abundant_harvest', 'abundant_harvest',
  'inspiring_speech', 'inspiring_speech',
  'activists', 'activists', 'unions', 'unions', 'loyalists', 'loyalists',
  'public_works', 'civic_charter',
  'trade_routes', 'market_expansion',
  'artistic_movement', 'folk_songs',
  'war_council', 'border_fortification',
  'research_grants', 'cartography',
  'river_network', 'river_network', 'river_network', 'river_network',
  'land_survey', 'land_survey', 'land_survey', 'land_survey',
  'trade_delegation',
  // Resource-focused stacking
  'civic_assembly', 'civic_assembly', 'public_decree', 'public_decree',
  'surplus_goods', 'surplus_goods', 'trade_surplus', 'trade_surplus',
  'oral_history', 'oral_history',
  'battle_hardened', 'battle_hardened',
  'invention_workshop', 'invention_workshop', 'applied_science', 'applied_science',
  'frozen_tundra', 'frozen_tundra', 'frozen_tundra', 'frozen_tundra', 'frozen_tundra', 'frozen_tundra',
  'dense_forests', 'dense_forests', 'mineral_deposits', 'mineral_deposits',
  'rare_plants', 'rare_plants', 'rich_soil', 'rich_soil', 'natural_springs', 'natural_springs', 'coastal_fisheries', 'coastal_fisheries',
  // Must-play events (4)
  'indecisiveness', 'indecisiveness', 'indecisiveness', 'indecisiveness',
  // Hazard events
  'worker_strike', 'worker_strike',
  'political_assassination',
  'flood', 'flood',
  'corruption', 'corruption', 'epidemic', 'drought', 'rebellion', 'coup_attempt',
  'earthquake', 'tornado', 'harsh_winter', 'scorched_summer',
  'political_strife', 'crime_wave', 'public_backlash', 'leaked_report',
  'recession', 'national_debt', 'market_crash', 'trade_war', 'supply_shortage', 'hyperinflation',
  'youthful_dissent', 'cultural_suppression', 'generational_divide', 'loss_of_faith', 'brain_drain',
  'stalled_research', 'adverse_side_effects', 'remote_attack', 'failed_experiment', 'obsolescence', 'record_breach',
  'mutiny', 'desertion', 'border_skirmish', 'arms_shortage',
  // Utility events (8)
  'revisionist_history', 'revisionist_history',
  'contingency_planning',
  'occupation', 'incursion', 'sanctions', 'military_exercise', 'cultural_exchange',
  'peace_treaty', 'diplomatic_mission', 'census',
];
