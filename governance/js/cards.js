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
    tags: ['identity', 'culture', 'governance'],
    flavorText: 'Power derived from the consent of the governed.',
    options: [
      {
        label: 'Option 1 — Reform',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'culture', 'governance'],
    flavorText: 'Divine law made civil law.',
    options: [
      {
        label: 'Option 1 — Decree',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
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
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 2,
    tags: ['exchange', 'culture', 'governance', 'military'],
    flavorText: 'No civilization stands alone.',
    options: [
      {
        label: 'Option 1 — Form Alliance',
        description: 'Remove the oldest Culture resource from your stack → place this card on your Governance stack.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'culture',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Peace Accord',
        description: 'Remove 1 Military instability → shuffle this card into the deck.',
        effect: 'remove_instability_modal',
        targetCategory: 'military',
        afterShuffle: true,
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'republic',
    name: 'Republic',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 2,
    tags: ['identity', 'culture', 'governance'],
    flavorText: 'Power through representation, not birth.',
    options: [
      {
        label: 'Option 1 — Establish the Republic',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'governance'],
    flavorText: 'Power consolidated among the few.',
    options: [
      {
        label: 'Option 1 — Consolidate Power',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'culture', 'governance'],
    flavorText: 'A crown constrained by law.',
    options: [
      {
        label: 'Option 1 — Ratify the Constitution',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'governance', 'military'],
    flavorText: 'Order through absolute authority.',
    options: [
      {
        label: 'Option 1 — Seize Control',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'culture', 'governance'],
    flavorText: 'Power drawn from the anger of the many.',
    options: [
      {
        label: 'Option 1 — Rise of the People',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
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

  {
    id: 'republic',
    name: 'Republic',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 2,
    tags: ['identity', 'culture', 'governance'],
    flavorText: 'Power through representation, not birth.',
    options: [
      {
        label: 'Option 1 — Establish the Republic',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'governance'],
    flavorText: 'Power consolidated among the few.',
    options: [
      {
        label: 'Option 1 — Consolidate Power',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
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
    tags: ['identity', 'culture', 'governance'],
    flavorText: 'A crown constrained by law.',
    options: [
      {
        label: 'Option 1 — Ratify the Constitution',
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'culture',
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
    id: 'dictatorship',
    name: 'Dictatorship',
    type: 'category',
    subtype: 'institution',
    category: 'governance',
    value: 3,
    tags: ['identity', 'governance', 'military'],
    flavorText: 'Order through absolute authority.',
    options: [
      {
        label: 'Option 1 — Seize Control',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Governance with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'culture', 'governance'],
    flavorText: 'Power drawn from the anger of the many.',
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
    tags: ['identity', 'economy', 'environment'],
    flavorText: 'Open markets, open opportunities.',
    options: [
      {
        label: 'Option 1 — Open Markets',
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'environment', 'technology'],
    flavorText: 'Growth demands sacrifice — usually someone else\'s.',
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
    tags: ['identity', 'economy', 'environment'],
    flavorText: 'Prosperity that does not cost the earth.',
    options: [
      {
        label: 'Option 1 — Sustainable Growth',
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'environment'],
    flavorText: 'The earth sustains all.',
    options: [
      {
        label: 'Option 1 — Work the Land',
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'governance'],
    flavorText: 'Resources directed by the state.',
    options: [
      {
        label: 'Option 1 — Central Planning',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'governance'],
    flavorText: 'Capital creates capital.',
    options: [
      {
        label: 'Option 1 — Charter the Banks',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
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

  {
    id: 'agrarian_economy',
    name: 'Agrarian Economy',
    type: 'category',
    subtype: 'institution',
    category: 'economy',
    value: 1,
    tags: ['identity', 'economy', 'environment'],
    flavorText: 'The earth sustains all.',
    options: [
      {
        label: 'Option 1 — Work the Land',
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'environment',
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
    id: 'command_economy',
    name: 'Command Economy',
    type: 'category',
    subtype: 'institution',
    category: 'economy',
    value: 2,
    tags: ['identity', 'economy', 'governance'],
    flavorText: 'Resources directed by the state.',
    options: [
      {
        label: 'Option 1 — Central Planning',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'governance',
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
    tags: ['identity', 'economy', 'governance'],
    flavorText: 'Capital creates capital.',
    options: [
      {
        label: 'Option 1 — Charter the Banks',
        description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Replace or stack your current Economy with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'governance',
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
    tags: ['identity', 'culture', 'economy'],
    flavorText: 'Society shaped by those who sustain it.',
    options: [
      {
        label: 'Option 1 — Establish',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'culture', 'economy'],
    flavorText: 'Order imposed from the top down.',
    options: [
      {
        label: 'Option 1 — Assert Order',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'culture', 'economy', 'technology'],
    flavorText: 'Knowledge compounds.',
    options: [
      {
        label: 'Option 1 — Found Institutions',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
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
    id: 'renaissance_culture',
    name: 'Renaissance Culture',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 5,
    tags: ['identity', 'culture', 'governance'],
    flavorText: 'When art, science, and governance align.',
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
    tags: ['identity', 'culture', 'economy'],
    flavorText: 'Knowledge passed by word of mouth.',
    options: [
      {
        label: 'Option 1 — Preserve the Stories',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'culture', 'economy', 'governance'],
    flavorText: 'Belief structures that outlast empires.',
    options: [
      {
        label: 'Option 1 — Found the Order',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'culture', 'economy'],
    flavorText: 'Wealth as social currency.',
    options: [
      {
        label: 'Option 1 — Rise of Commerce',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'culture', 'technology'],
    flavorText: 'Reason as the highest authority.',
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

  {
    id: 'oral_tradition',
    name: 'Oral Tradition',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 1,
    tags: ['identity', 'culture', 'economy'],
    flavorText: 'Knowledge passed by word of mouth.',
    options: [
      {
        label: 'Option 1 — Preserve the Stories',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
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
    id: 'religious_order',
    name: 'Religious Order',
    type: 'category',
    subtype: 'institution',
    category: 'culture',
    value: 2,
    tags: ['identity', 'culture', 'economy', 'governance'],
    flavorText: 'Belief structures that outlast empires.',
    options: [
      {
        label: 'Option 1 — Found the Order',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
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
    tags: ['identity', 'culture', 'economy'],
    flavorText: 'Wealth as social currency.',
    options: [
      {
        label: 'Option 1 — Rise of Commerce',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Culture with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
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
    tags: ['identity', 'culture', 'technology'],
    flavorText: 'Reason as the highest authority.',
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
    tags: ['identity', 'culture', 'military'],
    flavorText: 'Security through shields, not swords.',
    options: [
      {
        label: 'Option 1 — Conscript',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'military'],
    flavorText: 'Strike first. Strike hard. Leave no doubt.',
    options: [
      {
        label: 'Option 1 — Honor the Tradition',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'military'],
    flavorText: 'Hold the line. Let them come to us.',
    options: [
      {
        label: 'Option 1 — Hold the Line',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'military'],
    flavorText: 'Neither sword nor shield — both, as the moment demands.',
    options: [
      {
        label: 'Option 1 — Launch the Fleet',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'military'],
    flavorText: 'Match every blow. No more, no less.',
    options: [
      {
        label: 'Option 1 — Commission the Army',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'military', 'technology'],
    flavorText: 'Bring enough, and leave no question unanswered.',
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

  {
    id: 'defensive_doctrine',
    name: 'Defensive Doctrine',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 1,
    tags: ['identity', 'economy', 'military'],
    flavorText: 'Hold the line. Let them come to us.',
    options: [
      {
        label: 'Option 1 — Hold the Line',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
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
    id: 'adaptable_force',
    name: 'Adaptable Force',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 2,
    tags: ['identity', 'economy', 'military'],
    flavorText: 'Neither sword nor shield — both, as the moment demands.',
    options: [
      {
        label: 'Option 1 — Launch the Fleet',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
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
    tags: ['identity', 'economy', 'military'],
    flavorText: 'Match every blow. No more, no less.',
    options: [
      {
        label: 'Option 1 — Commission the Army',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Military with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
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
    id: 'overwhelming_force',
    name: 'Overwhelming Force',
    type: 'category',
    subtype: 'institution',
    category: 'military',
    value: 4,
    tags: ['identity', 'military', 'technology'],
    flavorText: 'Bring enough, and leave no question unanswered.',
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
        description: 'Draw 1 card. Discard this card.',
        effect: 'draw_and_discard_self',
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
    tags: ['identity', 'economy', 'technology'],
    flavorText: 'If it works, it is worth doing.',
    options: [
      {
        label: 'Option 1 — Apply What Works',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'environment', 'technology'],
    flavorText: 'The horizon exists to be crossed.',
    options: [
      {
        label: 'Option 1 — Push the Frontier',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'technology'],
    flavorText: 'Move fast enough to grow. Slow enough not to break.',
    options: [
      {
        label: 'Option 1 — Steady Advance',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'technology'],
    flavorText: 'Knowledge organized is knowledge multiplied.',
    options: [
      {
        label: 'Option 1 — Establish the Method',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'military', 'technology'],
    flavorText: 'The future demands sacrifice.',
    options: [
      {
        label: 'Option 1 — Push Without Limits',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'culture', 'technology'],
    flavorText: 'Understanding must come before application.',
    options: [
      {
        label: 'Option 1 — Build the Framework',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Replace or stack your current Technology with this card. Replaced cards get discarded.',
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

  {
    id: 'iron_working',
    name: 'Iron Working',
    type: 'category',
    subtype: 'institution',
    category: 'technology',
    value: 2,
    tags: ['identity', 'technology'],
    flavorText: 'Metal shaped to human will.',
    options: [
      {
        label: 'Option 1 — Forge the Future',
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
    id: 'written_records',
    name: 'Written Records',
    type: 'category',
    subtype: 'institution',
    category: 'technology',
    value: 2,
    tags: ['identity', 'technology'],
    flavorText: 'Knowledge preserved across generations.',
    options: [
      {
        label: 'Option 1 — Codify',
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
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
  },

  {
    id: 'advanced_engineering',
    name: 'Advanced Engineering',
    type: 'category',
    subtype: 'institution',
    category: 'technology',
    value: 3,
    tags: ['identity', 'military', 'technology'],
    flavorText: 'Building beyond the possible.',
    options: [
      {
        label: 'Option 1 — Commission the Corps',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Replace your current Technology with Advanced Engineering.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'military',
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
    id: 'mathematics',
    name: 'Mathematics',
    type: 'category',
    subtype: 'institution',
    category: 'technology',
    value: 3,
    tags: ['identity', 'culture', 'technology'],
    flavorText: 'The language beneath all else.',
    options: [
      {
        label: 'Option 1 — Abstract Thinking',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Replace your current Technology with Mathematics.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'culture',
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
    tags: ['identity', 'environment', 'military'],
    flavorText: 'Harsh. Vast. Unyielding.',
    options: [
      {
        label: 'Option 1 — Settle',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'environment', 'military'],
    flavorText: 'High ground commands the horizon.',
    options: [
      {
        label: 'Option 1 — Claim',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'environment'],
    flavorText: 'Where rivers carve the shape of nations.',
    options: [
      {
        label: 'Option 1 — Settle',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'environment', 'governance'],
    flavorText: 'The heartland, contested and coveted.',
    options: [
      {
        label: 'Option 1 — Unify',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'environment', 'military'],
    flavorText: 'The sea gives and the sea takes.',
    options: [
      {
        label: 'Option 1 — Coastal Claim',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'environment'],
    flavorText: 'Grain and growth, season after season.',
    options: [
      {
        label: 'Option 1 — Settle the Plains',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'environment', 'military'],
    flavorText: 'Harsh land builds harder people.',
    options: [
      {
        label: 'Option 1 — Endure the Waste',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
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
    tags: ['identity', 'economy', 'environment'],
    flavorText: 'Where rivers meet, civilizations flourish.',
    options: [
      {
        label: 'Option 1 — Settle the Delta',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
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
    id: 'the_fertile_plains',
    name: 'The Fertile Plains',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 2,
    tags: ['identity', 'economy', 'environment'],
    flavorText: 'Grain and growth, season after season.',
    options: [
      {
        label: 'Option 1 — Settle the Plains',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
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
    id: 'the_desert_wastes',
    name: 'The Desert Wastes',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 1,
    tags: ['identity', 'environment', 'military'],
    flavorText: 'Harsh land builds harder people.',
    options: [
      {
        label: 'Option 1 — Endure the Waste',
        description: 'Remove 1 Military resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'military',
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
    id: 'the_river_delta',
    name: 'The River Delta',
    type: 'category',
    subtype: 'territory',
    category: 'environment',
    value: 3,
    tags: ['identity', 'economy', 'environment'],
    flavorText: 'Where rivers meet, civilizations flourish.',
    options: [
      {
        label: 'Option 1 — Settle the Delta',
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Replace or stack your current Territory with this card. Replaced cards get discarded.',
        effect: 'replace_plus_stack_cost',
        costCategory: 'economy',
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
    value: 1,
    tags: ['exchange', 'culture', 'governance', 'technology'],
    flavorText: 'A well-run state hums like a quiet machine.',
    options: [
      {
        label: 'Option 1 — Streamline Technology',
        description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Place this card in your Governance Stack (+1).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'technology',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Streamline Culture',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Place this card in your Economy Stack (+1).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'economy',
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
    tags: ['exchange', 'culture', 'economy'],
    flavorText: 'The price of civilization, collected quarterly.',
    options: [
      {
        label: 'Option 1 — Collect from Culture',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Place this card in your Economy Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Reinvest',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    tags: ['resource', 'economy', 'governance', 'military'],
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
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Stack this card on Governance or Military as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'economy',
        choices: ['governance', 'military'],
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
    tags: ['resource', 'economy', 'governance'],
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
    id: 'tax_increase',
    name: 'Tax Increase',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 2,
    tags: ['resource', 'economy', 'governance', 'military'],
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
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Stack this card on Governance or Military as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'economy',
        choices: ['governance', 'military'],
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
    tags: ['resource', 'economy', 'governance'],
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
    tags: ['resource', 'culture', 'environment', 'governance'],
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
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Stack this card on Governance or Environment as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'culture',
        choices: ['governance', 'environment'],
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
    tags: ['resource', 'economy', 'governance', 'military'],
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
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Governance as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'military',
        choices: ['economy', 'governance'],
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
    tags: ['exchange', 'culture', 'economy', 'military', 'technology'],
    flavorText: 'An idea that changes everything.',
    options: [
      {
        label: 'Option 1 — Advance the Field',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Place this card in your Technology Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'economy',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Share the Discovery',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Place this card in your Military Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'military',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },
  {
    id: 'patent_license',
    name: 'Patent License',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 1,
    tags: ['exchange', 'economy', 'technology'],
    flavorText: 'Knowledge moves where capital flows.',
    options: [
      {
        label: 'Option 1 — License In',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Place this card on your Technology stack (+1).',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'economy',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — License Out',
        description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Place this card on your Economy stack (+1).',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'technology',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'venture_capital',
    name: 'Venture Capital',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 2,
    tags: ['exchange', 'economy', 'technology'],
    flavorText: 'Bet on the future.',
    options: [
      {
        label: 'Option 1 — Fund R&D',
        description: 'Remove the oldest Economy resource from your stack. Discard 1 card from your hand. Place this card on your Technology stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'economy',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Portfolio Exit',
        description: 'Remove the oldest Technology resource from your stack. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'technology',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'technology_transfer',
    name: 'Technology Transfer',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 2,
    tags: ['exchange', 'governance', 'military', 'technology'],
    flavorText: 'Innovation crosses borders when incentives align.',
    options: [
      {
        label: 'Option 1 — Defense Spinoff',
        description: 'Remove the oldest Military resource from your stack. Discard 1 card from your hand. Place this card on your Technology stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'military',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Public Funding',
        description: 'Remove the oldest Governance resource from your stack. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'governance',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'automation_drive',
    name: 'Automation Drive',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 2,
    tags: ['exchange', 'economy', 'technology'],
    flavorText: 'Efficiency demands sacrifice.',
    options: [
      {
        label: 'Option 1 — Mechanize',
        description: 'Remove the oldest Economy resource from your stack. Discard 1 card from your hand. Place this card on your Technology stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'economy',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Optimize Systems',
        description: 'Remove the oldest Technology resource from your stack. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'technology',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'abundant_harvest',
    name: 'Abundant Harvest',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    tags: ['resource', 'culture', 'environment', 'technology'],
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
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    tags: ['resource'],
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
    tags: ['resource', 'culture', 'military'],
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
        description: 'If you have instability in your Military stack, place this card in your Military Stack (+1).',
        effect: 'stack_on_category',
        targetCategory: 'military',
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
    tags: ['resource', 'economy', 'environment', 'governance'],
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
        description: 'If you have instability in your Environment stack, place this card in your Environment Stack (+1).',
        effect: 'stack_on_category',
        targetCategory: 'environment',
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
    tags: ['exchange', 'culture', 'governance', 'military'],
    flavorText: 'Those who uphold the state in its hour of need.',
    options: [
      {
        label: 'Option 1 — Cultural Loyalty',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Place this card in your Governance Stack (+1).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Political Enforcement',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Place this card in your Military Stack (+1).',
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
    tags: ['resource', 'economy', 'governance', 'military'],
    flavorText: 'Roads, aqueducts, walls — the skeleton of civilization.',
    options: [
      {
        label: 'Option 1 — Fund the Works',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Place this card in your Governance Stack (+2).',
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
    tags: ['exchange', 'culture', 'economy', 'governance'],
    flavorText: 'Written rights outlast the rulers who grant them.',
    options: [
      {
        label: 'Option 1 — Codify Rights',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Place this card in your Governance Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Enforce the Charter',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Place this card in your Economy Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'governance',
        targetCategory: 'economy',
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
    tags: ['resource', 'economy', 'environment'],
    flavorText: 'Goods flow where roads and rivers lead.',
    options: [
      {
        label: 'Option 1 — Open the Routes',
        description: 'Remove the oldest Economy resource from your stack. Stack this card as a +2 bonus on Culture.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'economy',
        targetCategory: 'culture',
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
    tags: ['resource', 'economy'],
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
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Stack this card on Governance or Military as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'economy',
        choices: ['governance', 'military'],
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
    tags: ['exchange', 'culture', 'governance'],
    flavorText: 'When the people speak through art.',
    options: [
      {
        label: 'Option 1 — State Patronage',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Place this card in your Culture Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'governance',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Cultural Reform',
        description: 'Remove the oldest Governance instability card and shuffle it into the draw deck. Place this card at the bottom of the deck.',
        effect: 'remove_instability_modal',
        maxRemove: 1,
        targetCategory: 'governance',
        selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },
  {
    id: 'heritage_fund',
    name: 'Heritage Fund',
    type: 'event',
    subtype: 'stacking',
    category: 'culture',
    value: 1,
    tags: ['exchange', 'culture', 'economy', 'governance'],
    flavorText: 'Culture grows where resources are invested.',
    options: [
      {
        label: 'Option 1 — Economic Subsidy',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Place this card on your Culture stack (+1).',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'economy',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — State Program',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Place this card on your Economy stack (+1).',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'governance',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'cultural_diplomacy',
    name: 'Cultural Diplomacy',
    type: 'event',
    subtype: 'stacking',
    category: 'culture',
    value: 2,
    tags: ['exchange', 'culture', 'economy', 'governance'],
    flavorText: 'Nations shape each other through the exchange of ideas.',
    options: [
      {
        label: 'Option 1 — Joint Investment',
        description: 'Remove the oldest Economy resource from your stack. Discard 1 card from your hand. Place this card on your Culture stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'economy',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Military Alliance',
        description: 'Remove the oldest Governance resource from your stack. Discard 1 card from your hand. Place this card on your Military stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'governance',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
    requires: null,
  },

  {
    id: 'folk_songs',
    name: 'Folk Songs',
    type: 'event',
    subtype: 'stacking',
    category: 'culture',
    value: 1,
    tags: ['resource', 'culture'],
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
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Stack this card on Governance or Environment as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'culture',
        choices: ['governance', 'environment'],
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
    tags: ['policy', 'military'],
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

  // — Military utility events —

  {
    id: 'military_exercise',
    name: 'Military Exercise',
    type: 'event',
    subtype: 'utility',
    category: 'military',
    value: 1,
    tags: ['policy', 'military'],
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
    tags: ['resource', 'economy', 'military'],
    flavorText: 'Strategy outlasts strength.',
    options: [
      {
        label: 'Option 1 — Fund the Campaign',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Place this card in your Military Stack (+2).',
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
    id: 'conscription',
    name: 'Conscription',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 1,
    tags: ['exchange', 'culture', 'economy', 'military'],
    flavorText: 'When the call comes, everyone answers.',
    options: [
      {
        label: 'Option 1 — Economic Levy',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Place this card on your Military stack (+1).',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'economy',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Civic Duty',
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Place this card on your Governance stack (+1).',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'culture',
        targetCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'military_instability', label: 'Military Instability' },
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
    requires: null,
  },

  {
    id: 'arms_trade',
    name: 'Arms Trade',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 2,
    tags: ['exchange', 'economy', 'military'],
    flavorText: 'Every weapon sold is a policy statement.',
    options: [
      {
        label: 'Option 1 — Export Surplus',
        description: 'Remove the oldest Military resource from your stack. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'military',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Import Weapons',
        description: 'Remove the oldest Economy resource from your stack. Discard 1 card from your hand. Place this card on your Military stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'economy',
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
    id: 'border_fortification',
    name: 'Border Fortification',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 1,
    tags: ['resource', 'military'],
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
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Governance as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'military',
        choices: ['economy', 'governance'],
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
    tags: ['resource', 'economy', 'technology'],
    flavorText: 'Discovery funded, discovery made.',
    options: [
      {
        label: 'Option 1 — Allocate Funding',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Place this card in your Technology Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'economy',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Redirect Grants',
        description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Place this card in your Economy or Culture Stack (+2).',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'technology',
        choices: ['economy', 'culture'],
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
    tags: ['resource', 'technology'],
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
        description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Environment as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'technology',
        choices: ['economy', 'environment'],
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
    tags: ['resource', 'environment'],
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
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },
  {
    id: 'land_reclamation',
    name: 'Land Reclamation',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    tags: ['exchange', 'economy', 'environment', 'technology'],
    flavorText: 'Restoration begins with investment.',
    options: [
      {
        label: 'Option 1 — Funding Drive',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Place this card on your Environment stack (+1).',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'economy',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Tech Remediation',
        description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Place this card on your Culture stack (+1).',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'technology',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
  },

  {
    id: 'conservation_program',
    name: 'Conservation Program',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 2,
    tags: ['exchange', 'economy', 'environment', 'governance'],
    flavorText: 'The land repays those who protect it.',
    options: [
      {
        label: 'Option 1 — National Preserve',
        description: 'Remove the oldest Economy resource from your stack. Discard 1 card from your hand. Place this card on your Environment stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'economy',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Cultural Heritage Initiative',
        description: 'Remove the oldest Governance resource from your stack. Discard 1 card from your hand. Place this card on your Culture stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'governance',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
    requires: null,
  },

  {
    id: 'land_survey',
    name: 'Land Survey',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 1,
    tags: ['resource', 'environment'],
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
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    tags: ['resource', 'economy', 'governance', 'military'],
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
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Military as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'governance',
        choices: ['economy', 'military'],
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
    tags: ['resource', 'economy', 'governance', 'military'],
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
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Military as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'governance',
        choices: ['economy', 'military'],
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
    tags: ['resource', 'economy', 'governance', 'military'],
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
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Stack this card on Governance or Military as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'economy',
        choices: ['governance', 'military'],
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
    tags: ['resource', 'economy'],
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
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Stack this card on Governance or Military as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'economy',
        choices: ['governance', 'military'],
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
    tags: ['resource', 'culture', 'environment', 'governance'],
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
        description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Stack this card on Governance or Environment as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'culture',
        choices: ['governance', 'environment'],
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  // — Military resource-focused stacking events —

  {
    id: 'veteran_forces',
    name: 'Veteran Forces',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 1,
    tags: ['resource', 'economy', 'governance', 'military'],
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
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Governance as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'military',
        choices: ['economy', 'governance'],
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
    tags: ['resource', 'economy', 'environment', 'technology'],
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
        description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Environment as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'technology',
        choices: ['economy', 'environment'],
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
    tags: ['resource', 'economy', 'environment', 'technology'],
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
        description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Environment as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'technology',
        choices: ['economy', 'environment'],
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
    tags: ['resource', 'culture', 'environment', 'technology'],
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
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    value: 1,
    tags: ['resource', 'culture', 'environment', 'technology'],
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
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    value: 1,
    tags: ['resource', 'environment'],
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
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    tags: ['resource', 'environment'],
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
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    tags: ['resource', 'environment'],
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
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    tags: ['resource', 'environment'],
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
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    tags: ['resource', 'environment'],
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
        description: 'Remove the oldest Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    tags: ['resource', 'economy', 'governance', 'military'],
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
        description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Military as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'governance',
        choices: ['economy', 'military'],
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
    tags: ['resource', 'economy', 'governance', 'military'],
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
        description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Military as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'governance',
        choices: ['economy', 'military'],
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
    tags: ['resource', 'economy', 'governance', 'military'],
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
        description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Stack this card on Governance or Military as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'economy',
        choices: ['governance', 'military'],
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
    tags: ['resource', 'economy'],
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
    tags: ['resource', 'culture', 'environment', 'governance'],
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
        description: 'Remove 1 Culture resource from your stack and shuffle it into the draw deck. Stack this card on Governance or Environment as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'culture',
        choices: ['governance', 'environment'],
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  // — Military resource-focused stacking events —

  // — Technology resource-focused stacking events —

  {
    id: 'invention_workshop',
    name: 'Invention Workshop',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 1,
    tags: ['resource', 'economy', 'environment', 'technology'],
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
        description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Environment as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'technology',
        choices: ['economy', 'environment'],
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
    tags: ['resource', 'economy', 'environment', 'technology'],
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
        description: 'Remove 1 Technology resource from your stack and shuffle it into the draw deck. Stack this card on Economy or Environment as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'technology',
        choices: ['economy', 'environment'],
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
    tags: ['resource', 'culture', 'environment', 'technology'],
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
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +1 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    value: 1,
    tags: ['resource', 'culture', 'environment', 'technology'],
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
        description: 'Remove 1 Environment resource from your stack and shuffle it into the draw deck. Stack this card on Culture or Technology as a +2 resource.',
        effect: 'pay_own_stack_then_stack_on_any',
        ownCategory: 'environment',
        choices: ['culture', 'technology'],
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
    value: 1,
    tags: ['resource', 'environment'],
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
    tags: ['resource', 'environment'],
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
    tags: ['resource', 'environment'],
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
    tags: ['resource', 'environment'],
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
    tags: ['resource', 'environment'],
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
    tags: ['resource', 'economy', 'governance'],
    flavorText: 'Diplomacy and commerce, two faces of the same coin.',
    options: [
      {
        label: 'Option 1 — Negotiate',
        description: 'Stack on Economy or Governance as a +1 bonus.',
        effect: 'stack_on_any_modal',
        bonusValue: 1,
        choices: ['economy', 'governance'],
      },
      {
        label: 'Option 2 — Return Empty-Handed',
        description: 'Shuffle this card into the draw deck and draw a card.',
        effect: 'draw_and_shuffle_self',
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
    tags: ['resource', 'economy', 'governance', 'military'],
    flavorText: 'Roads, aqueducts, walls — the skeleton of civilization.',
    options: [
      {
        label: 'Option 1 — Fund the Works',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Place this card in your Governance Stack (+2).',
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
    tags: ['exchange', 'culture', 'economy', 'governance'],
    flavorText: 'Written rights outlast the rulers who grant them.',
    options: [
      {
        label: 'Option 1 — Codify Rights',
        description: 'Remove a resource from your Culture stack and shuffle it into the draw deck. You may place this card in your Governance Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'culture',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Enforce the Charter',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Place this card in your Economy Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'governance',
        targetCategory: 'economy',
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
    tags: ['resource', 'economy', 'environment'],
    flavorText: 'Goods flow where roads and rivers lead.',
    options: [
      {
        label: 'Option 1 — Open the Routes',
        description: 'Remove a resource from your Environment stack and shuffle it into the draw deck. You may place this card in your Economy Stack (+2).',
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
    tags: ['resource', 'economy'],
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
    tags: ['exchange', 'culture', 'governance'],
    flavorText: 'When the people speak through art.',
    options: [
      {
        label: 'Option 1 — State Patronage',
        description: 'Remove a resource from your Governance stack and shuffle it into the draw deck. You may place this card in your Culture Stack (+2).',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'governance',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Cultural Reform',
        description: 'Remove the oldest Governance instability card and shuffle it into the draw deck. Place this card at the bottom of the deck.',
        effect: 'remove_instability_modal',
        maxRemove: 1,
        targetCategory: 'governance',
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
    tags: ['resource', 'culture'],
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

  // — Military stacking events —

  {
    id: 'war_council',
    name: 'War Council',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 2,
    tags: ['resource', 'economy', 'military'],
    flavorText: 'Strategy outlasts strength.',
    options: [
      {
        label: 'Option 1 — Fund the Campaign',
        description: 'Remove a resource from your Economy stack and shuffle it into the draw deck. You may place this card in your Military Stack (+2).',
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
    tags: ['resource', 'military'],
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
    tags: ['resource', 'economy', 'technology'],
    flavorText: 'Discovery funded, discovery made.',
    options: [
      {
        label: 'Option 1 — Allocate Funding',
        description: 'Remove a resource from your Economy stack and shuffle it into the draw deck. You may place this card in your Technology Stack (+2).',
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
    tags: ['resource', 'technology'],
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
    tags: ['resource', 'environment'],
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
    tags: ['resource', 'environment'],
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

  // — General stacking events —

  {
    id: 'trade_delegation',
    name: 'Trade Delegation',
    type: 'event',
    subtype: 'stacking',
    category: null,
    value: 1,
    tags: ['resource', 'economy', 'governance'],
    flavorText: 'Diplomacy and commerce, two faces of the same coin.',
    options: [
      {
        label: 'Option 1 — Negotiate',
        description: 'Stack on Economy or Governance as a +1 bonus.',
        effect: 'stack_on_any_modal',
        bonusValue: 1,
        choices: ['economy', 'governance'],
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
    tags: ['instability', 'economy'],
    flavorText: 'Labor withheld is power revealed.',
    options: [
      {
        label: 'Option 1 — Suffer the Strike',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Meet Their Demands',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    tags: ['instability', 'military'],
    flavorText: 'When power is seized, not earned.',
    options: [
      {
        label: 'Option 1 — Suffer the Chaos',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Foil the Plot',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    tags: ['instability', 'economy'],
    flavorText: 'Nature does not negotiate.',
    options: [
      {
        label: 'Option 1 — Absorb the Loss',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Emergency Response',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    tags: ['instability', 'governance'],
    flavorText: 'Power rots from the inside.',
    options: [
      {
        label: 'Option 1 — Suffer the Scandal',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Root Out Corruption',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    tags: ['instability', 'culture', 'economy'],
    flavorText: 'Disease spreads where borders cannot.',
    options: [
      {
        label: 'Option 1 — Suffer the Outbreak',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Emergency Response',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    tags: ['instability', 'economy'],
    flavorText: 'The sky withholds what the earth needs.',
    options: [
      {
        label: 'Option 1 — Absorb the Famine',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Import Supplies',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    tags: ['instability', 'governance'],
    flavorText: 'The governed withdraw their consent.',
    options: [
      {
        label: 'Option 1 — Suppress the Uprising',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    tags: ['instability', 'governance'],
    flavorText: 'Power seized in darkness rarely holds in light.',
    options: [
      {
        label: 'Option 1 — Suppress the Coup',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    tags: ['instability', 'environment', 'military'],
    flavorText: 'The ground beneath certainty gives way.',
    options: [
      { label: 'Option 1 — Struck', description: 'Send to Environment instability.', effect: 'discard_self' },
      { label: 'Option 2 — Prepare', description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'military' },
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
    tags: ['instability', 'environment', 'technology'],
    flavorText: "Nature's indifferent fury leaves little standing.",
    options: [
      { label: 'Option 1 — Swept Away', description: 'Send to Environment instability.', effect: 'discard_self' },
      { label: 'Option 2 — Shelter In Place', description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'technology' },
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
    tags: ['instability', 'economy', 'environment'],
    flavorText: 'Cold that does not relent. Supplies that do not last.',
    options: [
      { label: 'Option 1 — Endure the Cold', description: 'Send to Environment instability.', effect: 'discard_self' },
      { label: 'Option 2 — Emergency Reserves', description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
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
    tags: ['instability', 'economy', 'environment'],
    flavorText: 'The heat does not break. Crops wither. Tempers rise.',
    options: [
      { label: 'Option 1 — Suffer the Heat', description: 'Send to Environment instability.', effect: 'discard_self' },
      { label: 'Option 2 — Emergency Rationing', description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
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
    tags: ['instability', 'economy', 'environment'],
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
    tags: ['instability', 'economy', 'environment'],
    flavorText: 'The heat does not break. Crops wither. Tempers rise.',
    options: [
      { label: 'Option 1 — Suffer the Heat', description: 'Send to Environment instability.', effect: 'discard_self' },
      { label: 'Option 2 — Emergency Rationing', description: 'Remove 1 Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'forest_fire',
    name: 'Forest Fire',
    type: 'event',
    subtype: 'hazard',
    category: 'environment',
    value: 3,
    tags: ['instability', 'event', 'environment', 'technology'],
    mustPlayWhenDrawn: true,
    mustPlayWhenDrawn: true,
    flavorText: 'What took centuries to grow is gone in a season.',
    options: [
      {
        label: 'Option 1 — Uncontrolled Burn',
        description: 'Place this card in Environment Instability.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Aerial Suppression',
        description: 'Remove the oldest Technology resource → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'technology',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'environmental_collapse',
    name: 'Environmental Collapse',
    type: 'event',
    subtype: 'hazard',
    category: 'environment',
    value: 4,
    tags: ['instability', 'event', 'economy', 'environment', 'technology'],
    flavorText: 'When the systems that sustain life begin to fail, no policy can outrun the consequences.',
    mustPlayWhenDrawn: true,
    options: [
      {
        label: 'Option 1 — Emergency Intervention',
        description: 'Remove 2 Economy AND 2 Technology resources → place this card at the bottom of the deck.',
        effect: 'remove_four_stack_cards_then_bottom',
        sourceCategory1: 'economy',
        sourceCategory2: 'economy',
        sourceCategory3: 'technology',
        sourceCategory4: 'technology',
      },
      {
        label: 'Option 2 — Ecological Ruin',
        description: 'Remove ALL resources from your Environment stack → bottom of deck. Place this card in Environment Instability.',
        effect: 'remove_all_from_stack_place_in_instability',
        targetCategory: 'environment',
        targetInstability: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'forest_fire',
    name: 'Forest Fire',
    type: 'event',
    subtype: 'hazard',
    category: 'environment',
    value: 3,
    tags: ['instability', 'event', 'environment', 'technology'],
    flavorText: 'What took centuries to grow is gone in a season.',
    options: [
      {
        label: 'Option 1 — Uncontrolled Burn',
        description: 'Place this card in Environment Instability.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Aerial Suppression',
        description: 'Remove the oldest Technology resource → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'technology',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'environmental_collapse',
    name: 'Environmental Collapse',
    type: 'event',
    subtype: 'hazard',
    category: 'environment',
    value: 4,
    tags: ['instability', 'event', 'economy', 'environment', 'technology'],
    flavorText: 'When the systems that sustain life begin to fail, no policy can outrun the consequences.',
    mustPlayWhenDrawn: true,
    options: [
      {
        label: 'Option 1 — Emergency Intervention',
        description: 'Remove 2 Economy AND 2 Technology resources → place this card at the bottom of the deck.',
        effect: 'remove_four_stack_cards_then_bottom',
        sourceCategory1: 'economy',
        sourceCategory2: 'economy',
        sourceCategory3: 'technology',
        sourceCategory4: 'technology',
      },
      {
        label: 'Option 2 — Ecological Ruin',
        description: 'Remove ALL resources from your Environment stack → bottom of deck. Place this card in Environment Instability.',
        effect: 'remove_all_from_stack_place_in_instability',
        targetCategory: 'environment',
        targetInstability: 'environment',
      },
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
    tags: ['instability', 'economy', 'governance'],
    flavorText: 'Factions fracture the halls of power.',
    options: [
      { label: 'Option 1 — Gridlock', description: 'Send to Governance instability.', effect: 'discard_self' },
      { label: 'Option 2 — Appease', description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
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
    tags: ['instability', 'economy', 'governance'],
    flavorText: 'Markets contract. Belts tighten.',
    options: [
      { label: 'Option 1 — Downturn', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — Stimulus', description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
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
    tags: ['instability', 'economy', 'governance'],
    flavorText: 'Borrowed prosperity has a due date.',
    options: [
      { label: 'Option 1 — Borrowed Time', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — Austerity', description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
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
    tags: ['instability', 'governance', 'military'],
    flavorText: 'When order fails, chaos fills the vacuum.',
    options: [
      { label: 'Option 1 — Uncontrolled', description: 'Send to Governance instability.', effect: 'discard_self' },
      { label: 'Option 2 — Crackdown', description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'military' },
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
    tags: ['instability', 'culture', 'governance'],
    flavorText: 'A generation questions everything it was taught.',
    options: [
      { label: 'Option 1 — Rising Tension', description: 'Send to Culture instability.', effect: 'discard_self' },
      { label: 'Option 2 — Channel the Energy', description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
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
    tags: ['instability', 'economy', 'technology'],
    flavorText: 'The path forward goes dark.',
    options: [
      { label: 'Option 1 — Dead End', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Pivot Funding', description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
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
    tags: ['instability', 'culture', 'governance'],
    flavorText: 'The people make their displeasure known.',
    options: [
      { label: 'Option 1 — Popular Anger', description: 'Send to Governance instability.', effect: 'discard_self' },
      { label: 'Option 2 — Reform', description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'culture' },
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
    tags: ['instability', 'economy', 'technology'],
    flavorText: 'Progress brings unintended consequences.',
    options: [
      { label: 'Option 1 — Fallout', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Contain the Damage', description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
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
    tags: ['instability', 'culture', 'governance'],
    flavorText: 'Secrets rarely stay secret.',
    options: [
      { label: 'Option 1 — Exposed', description: 'Send to Governance instability.', effect: 'discard_self' },
      { label: 'Option 2 — Spin It', description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'culture' },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  // — Economy hazards —

  {
    id: 'market_crash',
    name: 'Market Crash',
    type: 'event', subtype: 'hazard', category: 'economy', value: 3,
    tags: ['instability', 'economy', 'governance'],
    flavorText: 'Confidence evaporates. Overnight, everything is worth less.',
    options: [
      { label: 'Option 1 — Freefall', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — State Intervention', description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'trade_war',
    name: 'Trade War',
    type: 'event', subtype: 'hazard', category: 'economy', value: 2,
    tags: ['instability', 'economy', 'military'],
    flavorText: 'Tariffs answered with tariffs. No one wins.',
    options: [
      { label: 'Option 1 — Absorb the Costs', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — Show of Force', description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'military' },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'supply_shortage',
    name: 'Supply Shortage',
    type: 'event', subtype: 'hazard', category: 'economy', value: 2,
    tags: ['instability', 'economy', 'technology'],
    flavorText: 'The shelves empty before anyone sees it coming.',
    options: [
      { label: 'Option 1 — Accept the Scarcity', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — Innovate Around It', description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'technology' },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'hyperinflation',
    name: 'Hyperinflation',
    type: 'event', subtype: 'hazard', category: 'economy', value: 3,
    tags: ['instability', 'economy'],
    flavorText: 'When money loses meaning, so does everything built on it.',
    options: [
      { label: 'Option 1 — Collapse', description: 'Send to Economy instability.', effect: 'discard_self' },
      { label: 'Option 2 — Austerity Measures', description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  // — Culture hazards —

  {
    id: 'cultural_suppression',
    name: 'Cultural Suppression',
    type: 'event', subtype: 'hazard', category: 'culture', value: 2,
    tags: ['instability', 'culture', 'governance'],
    flavorText: 'What cannot be expressed festers into resentment.',
    options: [
      { label: 'Option 1 — Silence Prevails', description: 'Send to Culture instability.', effect: 'discard_self' },
      { label: 'Option 2 — Reform from Above', description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'generational_divide',
    name: 'Generational Divide',
    type: 'event', subtype: 'hazard', category: 'culture', value: 2,
    tags: ['instability', 'culture'],
    flavorText: 'The old and the young no longer speak the same language.',
    options: [
      { label: 'Option 1 — Let It Fracture', description: 'Send to Culture instability.', effect: 'discard_self' },
      { label: 'Option 2 — Shared Story', description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'culture' },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'loss_of_faith',
    name: 'Loss of Faith',
    type: 'event', subtype: 'hazard', category: 'culture', value: 2,
    tags: ['instability', 'culture'],
    flavorText: 'When belief collapses, the structures built on it follow.',
    options: [
      { label: 'Option 1 — Drift', description: 'Send to Culture instability.', effect: 'discard_self' },
      { label: 'Option 2 — Cultural Renewal', description: 'Remove the oldest Culture resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'culture' },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'brain_drain',
    name: 'Brain Drain',
    type: 'event', subtype: 'hazard', category: 'culture', value: 2,
    tags: ['instability', 'culture', 'economy'],
    flavorText: 'The best leave for somewhere they are valued.',
    options: [
      { label: 'Option 1 — Accept the Loss', description: 'Send to Culture instability.', effect: 'discard_self' },
      { label: 'Option 2 — Incentivize Return', description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  // — Military hazards —

  {
    id: 'mutiny',
    name: 'Mutiny',
    type: 'event', subtype: 'hazard', category: 'military', value: 3,
    tags: ['instability', 'governance', 'military'],
    flavorText: 'When those who carry arms turn them inward.',
    options: [
      { label: 'Option 1 — Lose Control', description: 'Send to Military instability.', effect: 'discard_self' },
      { label: 'Option 2 — Restore Order', description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'desertion',
    name: 'Desertion',
    type: 'event', subtype: 'hazard', category: 'military', value: 2,
    tags: ['instability', 'economy', 'military'],
    flavorText: 'Soldiers vote with their feet.',
    options: [
      { label: 'Option 1 — Suffer the Losses', description: 'Send to Military instability.', effect: 'discard_self' },
      { label: 'Option 2 — Pay for Loyalty', description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'border_skirmish',
    name: 'Border Skirmish',
    type: 'event', subtype: 'hazard', category: 'military', value: 2,
    tags: ['instability', 'military'],
    flavorText: 'A small conflict that threatens to become something larger.',
    options: [
      { label: 'Option 1 — Absorb the Blow', description: 'Send to Military instability.', effect: 'discard_self' },
      { label: 'Option 2 — Show of Strength', description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'military' },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'arms_shortage',
    name: 'Arms Shortage',
    type: 'event', subtype: 'hazard', category: 'military', value: 2,
    tags: ['instability', 'economy', 'military'],
    flavorText: 'A force without equipment is no force at all.',
    options: [
      { label: 'Option 1 — Go Without', description: 'Send to Military instability.', effect: 'discard_self' },
      { label: 'Option 2 — Emergency Procurement', description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  // — Technology hazards —

  {
    id: 'remote_attack',
    name: 'Remote Attack',
    type: 'event', subtype: 'hazard', category: 'technology', value: 2,
    tags: ['instability', 'military', 'technology'],
    flavorText: 'The enemy strikes without a face or a border.',
    options: [
      { label: 'Option 1 — Absorb the Breach', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Counter Response', description: 'Remove the oldest Military resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'military' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'failed_experiment',
    name: 'Failed Experiment',
    type: 'event', subtype: 'hazard', category: 'technology', value: 2,
    tags: ['instability', 'economy', 'technology'],
    flavorText: 'Not all progress goes forward.',
    options: [
      { label: 'Option 1 — Write It Off', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Redirect Funding', description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'economy' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'obsolescence',
    name: 'Obsolescence',
    type: 'event', subtype: 'hazard', category: 'technology', value: 2,
    tags: ['instability', 'technology'],
    flavorText: 'What led yesterday falls behind today.',
    options: [
      { label: 'Option 1 — Fall Behind', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Reinvest', description: 'Remove the oldest Technology resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'technology' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'record_breach',
    name: 'Record Breach',
    type: 'event', subtype: 'hazard', category: 'technology', value: 2,
    tags: ['instability', 'governance', 'technology'],
    flavorText: 'Private knowledge made public. Trust, once broken, is slow to rebuild.',
    options: [
      { label: 'Option 1 — Exposed', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Contain the Fallout', description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'corruption',
    name: 'Corruption',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    tags: ['instability', 'governance'],
    flavorText: 'Power rots from the inside.',
    options: [
      {
        label: 'Option 1 — Suffer the Scandal',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Root Out Corruption',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    id: 'drought',
    name: 'Drought',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    tags: ['instability', 'economy'],
    flavorText: 'The sky withholds what the earth needs.',
    options: [
      {
        label: 'Option 1 — Absorb the Famine',
        description: 'Discard this card to one of its instability destinations.',
        effect: 'discard_self',
      },
      {
        label: 'Option 2 — Import Supplies',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the draw deck. Shuffle this card into the draw deck.',
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
    tags: ['instability', 'governance'],
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
    tags: ['instability', 'governance'],
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
    tags: ['instability', 'environment', 'military'],
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
    tags: ['instability', 'environment', 'technology'],
    flavorText: "Nature's indifferent fury leaves little standing.",
    options: [
      { label: 'Option 1 — Swept Away', description: 'Send to Environment instability.', effect: 'discard_self' },
      { label: 'Option 2 — Shelter In Place', description: 'Remove 1 Technology resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'technology' },
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
    tags: ['instability', 'economy', 'governance'],
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
    tags: ['instability', 'economy', 'governance'],
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
    tags: ['instability', 'economy', 'governance'],
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
    tags: ['instability', 'governance', 'military'],
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
    tags: ['instability', 'culture', 'governance'],
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
    tags: ['instability', 'economy', 'technology'],
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
    tags: ['instability', 'culture', 'governance'],
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
    tags: ['instability', 'economy', 'technology'],
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
    tags: ['instability', 'culture', 'governance'],
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
    tags: ['instability', 'economy', 'governance'],
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
    tags: ['instability', 'economy', 'military'],
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
    tags: ['instability', 'economy', 'technology'],
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
    tags: ['instability', 'economy'],
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
    tags: ['instability', 'culture', 'governance'],
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
    tags: ['instability', 'culture'],
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
    tags: ['instability', 'culture'],
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
    tags: ['instability', 'culture', 'economy'],
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
    tags: ['instability', 'governance', 'military'],
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
    tags: ['instability', 'economy', 'military'],
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
    tags: ['instability', 'military'],
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
    tags: ['instability', 'economy', 'military'],
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
    tags: ['instability', 'military', 'technology'],
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
    tags: ['instability', 'economy', 'technology'],
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
    tags: ['instability', 'technology'],
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
    tags: ['instability', 'governance', 'technology'],
    flavorText: 'Private knowledge made public. Trust, once broken, is slow to rebuild.',
    options: [
      { label: 'Option 1 — Exposed', description: 'Send to Technology instability.', effect: 'discard_self' },
      { label: 'Option 2 — Contain the Fallout', description: 'Remove 1 Governance resource from your stack and shuffle it into the draw deck. Shuffle this card into the deck.', effect: 'remove_stack_card_then_shuffle_self', sourceCategory: 'governance' },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'misinformation',
    name: 'Misinformation',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 2,
    tags: ['instability', 'culture', 'technology'],
    flavorText: 'Truth becomes a matter of who controls the signal.',
    options: [
      {
        label: 'Option 1 — False Narrative Spreads',
        description: 'Place this card in Culture Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'culture',
      },
      {
        label: 'Option 2 — Platform Accountability',
        description: 'Remove the oldest Technology resource → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'technology',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'surveillance_state',
    name: 'Surveillance State',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 3,
    tags: ['instability', 'economy', 'technology'],
    flavorText: 'Safety was the promise. Control is the result.',
    options: [
      {
        label: 'Option 1 — Normalized Control',
        description: 'Place this card in Economy Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'economy',
      },
      {
        label: 'Option 2 — Oversight Commission',
        description: 'Remove 1 Economy AND 1 Technology resource → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_two_stack_cards_then_bottom',
        sourceCategory1: 'economy',
        sourceCategory2: 'technology',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'cyber_warfare',
    name: 'Cyber Warfare',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 3,
    tags: ['instability', 'military', 'technology'],
    flavorText: 'The battlefield has no geography. The damage is invisible until it is not.',
    options: [
      {
        label: 'Option 1 — Defenseless',
        description: 'Place this card in Technology Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'technology',
      },
      {
        label: 'Option 2 — Cyber Defense Operation',
        description: 'Remove 1 Military AND 1 Technology resource → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_two_stack_cards_then_bottom',
        sourceCategory1: 'military',
        sourceCategory2: 'technology',
      },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'technological_collapse',
    name: 'Technological Collapse',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 4,
    tags: ['instability', 'economy', 'governance', 'technology'],
    flavorText: 'When infrastructure fails, everything built on top of it fails with it.',
    options: [
      {
        label: 'Option 1 — System Failure',
        description: 'Place this card in Technology Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'technology',
      },
      {
        label: 'Option 2 — Emergency Restoration',
        description: 'Remove 1 Technology, 1 Economy, AND 1 Governance resource → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_three_stack_cards_then_bottom',
        sourceCategory1: 'technology',
        sourceCategory2: 'economy',
        sourceCategory3: 'governance',
      },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'misinformation',
    name: 'Misinformation',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 2,
    tags: ['instability', 'culture', 'technology'],
    flavorText: 'Truth becomes a matter of who controls the signal.',
    options: [
      {
        label: 'Option 1 — False Narrative Spreads',
        description: 'Place this card in Culture Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'culture',
      },
      {
        label: 'Option 2 — Platform Accountability',
        description: 'Remove the oldest Technology resource → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'technology',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'surveillance_state',
    name: 'Surveillance State',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 3,
    tags: ['instability', 'economy', 'technology'],
    flavorText: 'Safety was the promise. Control is the result.',
    options: [
      {
        label: 'Option 1 — Normalized Control',
        description: 'Place this card in Economy Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'economy',
      },
      {
        label: 'Option 2 — Oversight Commission',
        description: 'Remove 1 Economy AND 1 Technology resource → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_two_stack_cards_then_bottom',
        sourceCategory1: 'economy',
        sourceCategory2: 'technology',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'cyber_warfare',
    name: 'Cyber Warfare',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 3,
    tags: ['instability', 'military', 'technology'],
    flavorText: 'The battlefield has no geography. The damage is invisible until it is not.',
    options: [
      {
        label: 'Option 1 — Defenseless',
        description: 'Place this card in Technology Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'technology',
      },
      {
        label: 'Option 2 — Cyber Defense Operation',
        description: 'Remove 1 Military AND 1 Technology resource → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_two_stack_cards_then_bottom',
        sourceCategory1: 'military',
        sourceCategory2: 'technology',
      },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'technological_collapse',
    name: 'Technological Collapse',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 4,
    tags: ['instability', 'economy', 'governance', 'technology'],
    flavorText: 'When infrastructure fails, everything built on top of it fails with it.',
    options: [
      {
        label: 'Option 1 — System Failure',
        description: 'Place this card in Technology Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'technology',
      },
      {
        label: 'Option 2 — Emergency Restoration',
        description: 'Remove 1 Technology, 1 Economy, AND 1 Governance resource → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_three_stack_cards_then_bottom',
        sourceCategory1: 'technology',
        sourceCategory2: 'economy',
        sourceCategory3: 'governance',
      },
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
    tags: ['instability', 'event'],
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
  // MUST-PLAY EVENT CARDS — resolve immediately when drawn
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'indecisiveness',
    name: 'Indecisiveness',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 1,
    tags: ['instability', 'event'],
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

  // ─── Management Philosophy — Governance Utility Cards ──────────────────────

  {
    id: 'consolidation',
    name: 'Consolidation',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'Strength comes from focus, not breadth.',
    options: [
      {
        label: 'Option 1 — Full Consolidation',
        description: 'Choose a category. Remove the oldest 2 instability cards from that pile and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_instability_modal', maxRemove: 2, selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Broad Consolidation',
        description: 'Remove the oldest instability card from each of 2 different categories and shuffle them into the deck.',
        effect: 'remove_two_instability_modal',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }, { target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'structural_consolidation',
    name: 'Structural Consolidation',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'True reform costs something. The question is what you are willing to pay.',
    options: [
      {
        label: 'Option 1 — Resource Investment',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the deck. Remove the oldest 2 instability from any category and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'governance', maxRemove: 2, selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Redistribution',
        description: 'Move the oldest instability card from one category to another. Shuffle this card into the deck.',
        effect: 'move_instability_modal', selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'managed_decline',
    name: 'Managed Decline',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'Not every battle can be won. Choose where to concede and where to hold.',
    options: [
      {
        label: 'Option 1 — Strategic Sacrifice',
        description: 'Discard 2 cards from your hand. Shuffle this card into the deck.',
        effect: 'discard_from_hand_modal', count: 2,
      },
      {
        label: 'Option 2 — Focused Relief',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the deck. Remove the oldest instability from any category and shuffle it into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'governance', maxRemove: 1, selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'rationalization',
    name: 'Rationalization',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'What cannot be justified cannot be sustained.',
    options: [
      {
        label: 'Option 1 — Strip to Core',
        description: 'Choose a stack with 2+ resources. Remove all resources except the oldest → bottom of deck. Remove all instabilities from that category except one → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'strip_stack_to_oldest_and_instab',
      },
      {
        label: 'Option 2 — Aggressive Cuts',
        description: 'Choose any stack — remove up to 3 oldest resources → bottom of deck. Choose any instability pile — remove up to 2 oldest cards → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_three_from_stack_remove_two_instab',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }, { target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'austerity',
    name: 'Austerity',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'economy', 'governance'],
    flavorText: 'Short-term pain for long-term stability.',
    options: [
      {
        label: 'Option 1 — Fiscal Cuts',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the deck. Remove the oldest 3 instability from any category and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'economy', maxRemove: 3, selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Administrative Cuts',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the deck. Remove the oldest 2 instability from any category and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'governance', maxRemove: 2, selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'preparedness',
    name: 'Preparedness',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'The time to repair the roof is when the sun is shining.',
    options: [
      {
        label: 'Option 1 — Full Survey',
        description: 'Draw 2 cards. Send this card to Governance or Culture instability.',
        effect: 'draw_if_hand_small',
      },
      {
        label: 'Option 2 — Quick Assessment',
        description: 'Draw 1 card. Shuffle this card into the deck.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'crisis_protocol',
    name: 'Crisis Protocol',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'When the system breaks, the response must be immediate.',
    options: [
      {
        label: 'Option 1 — Emergency Response',
        description: 'Remove the oldest instability from any category and shuffle it into the deck. Shuffle this card into the deck.',
        effect: 'remove_instability_modal', maxRemove: 1, selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Rapid Deployment',
        description: 'Remove the oldest instability from each of 2 different categories and shuffle them into the deck.',
        effect: 'remove_two_instability_modal',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }, { target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'grand_strategy',
    name: 'Grand Strategy',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance', 'military'],
    flavorText: 'Tactics win battles. Strategy wins civilizations.',
    options: [
      {
        label: 'Option 1 — Long View',
        description: 'Draw 2 cards. Shuffle this card into the deck.',
        effect: 'draw_if_hand_small',
      },
      {
        label: 'Option 2 — Resource Allocation',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the deck. Remove the oldest 2 instability from any category and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'military', maxRemove: 2, selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'redundancy_systems',
    name: 'Redundancy Systems',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance', 'technology'],
    flavorText: 'A civilization without backups is one crisis from collapse.',
    options: [
      {
        label: 'Option 1 — Build Redundancy',
        description: 'Discard 1 card from your hand. Shuffle this card into the deck.',
        effect: 'discard_from_hand_modal', count: 1,
      },
      {
        label: 'Option 2 — Failsafe',
        description: 'Remove the oldest Technology resource from your stack and shuffle it into the deck. Remove the oldest 2 instability from any category and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'technology', maxRemove: 2, selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'adaptive_management',
    name: 'Adaptive Management',
    type: 'event', subtype: 'utility', category: 'governance', value: 2,
    tags: ['policy', 'economy', 'governance', 'military'],
    flavorText: 'The strongest civilizations are those that learn while moving.',
    options: [
      {
        label: 'Option 1 — Adaptive Response',
        description: 'Remove the oldest instability from any category and shuffle it into the deck. Shuffle this card into the deck.',
        effect: 'remove_instability_modal', maxRemove: 1, selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Strategic Investment',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the deck. Stack +2 on Economy or Military.',
        effect: 'pay_own_stack_then_stack_on_any', ownCategory: 'governance', choices: ['economy', 'military'],
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'martial_law',
    name: 'Martial Law',
    type: 'event',
    subtype: 'utility',
    category: 'governance',
    value: 3,
    tags: ['policy', 'governance', 'military'],
    flavorText: 'When the law fails, force fills the vacuum.',
    options: [
      {
        label: 'Option 1 — Emergency Crackdown (Dictatorship)',
        description: 'Dictatorship must be active. Remove the oldest Military resource from your stack → remove all Crime instability from all categories. Place this card in Governance instability.',
        effect: 'remove_stack_card_then_remove_crime_instability',
        sourceCategory: 'military',
        condition: { active_identity_is: { category: 'governance', id: 'dictatorship' } },
      },
      {
        label: 'Option 2 — Costly Enforcement',
        description: 'Remove the oldest Military resource and 2 oldest Governance resources from your stacks → remove all Crime instability from all categories. Place this card in Governance instability.',
        effect: 'remove_multi_stack_then_remove_crime_instability',
        stacks: ['military', 'governance', 'governance'],
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
  },

  // ─── Economy Policy Cards ────────────────────────────────────────────────────

  {
    id: 'market_correction',
    name: 'Market Correction',
    type: 'event', subtype: 'utility', category: 'economy', value: 1,
    tags: ['policy', 'economy'],
    flavorText: 'Markets correct. The question is who pays the price.',
    options: [
      {
        label: 'Option 1 — Tighten Supply',
        description: 'Remove the newest Economy resource from your stack → remove 1 Economy instability, shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'economy', targetCategory: 'economy', maxRemove: 1, stackEnd: 'newest', afterShuffle: true,
      },
      {
        label: 'Option 2 — Stimulus',
        description: 'Draw 1 card. Place this card in Economy instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 1, targetInstability: 'economy',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'deficit_spending',
    name: 'Deficit Spending',
    type: 'event', subtype: 'utility', category: 'economy', value: 1,
    tags: ['policy', 'economy'],
    flavorText: 'Borrow against the future to stabilize the present.',
    options: [
      {
        label: 'Option 1 — Budget Cuts',
        description: 'Discard 1 card from your hand → remove 1 Economy instability, shuffle this card into the deck.',
        effect: 'discard_hand_then_remove_instability', targetCategory: 'economy', maxRemove: 1,
      },
      {
        label: 'Option 2 — Spend Forward',
        description: 'Draw 1 card. Place this card in Economy instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 1, targetInstability: 'economy',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'debt_restructuring',
    name: 'Debt Restructuring',
    type: 'event', subtype: 'utility', category: 'economy', value: 2,
    tags: ['policy', 'economy'],
    flavorText: 'Old debts can be reordered. They cannot be erased.',
    options: [
      {
        label: 'Option 1 — Austerity Path',
        description: 'Remove the oldest Economy resource from your stack → remove up to 2 Economy instability, shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'economy', targetCategory: 'economy', maxRemove: 2, afterShuffle: true,
      },
      {
        label: 'Option 2 — Inflate Away',
        description: 'Draw 2 cards. Place this card in Economy instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 2, targetInstability: 'economy',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'fiscal_consolidation',
    name: 'Fiscal Consolidation',
    type: 'event', subtype: 'utility', category: 'economy', value: 2,
    tags: ['policy', 'economy', 'governance'],
    flavorText: 'Fiscal discipline requires political will.',
    options: [
      {
        label: 'Option 1 — Cross-Sector Reform',
        description: 'Remove the oldest Economy resource and oldest Governance resource from your stacks → remove up to 3 Economy instability, shuffle this card into the deck.',
        effect: 'remove_two_stack_cards_then_remove_instability', stacks: ['economy', 'governance'], targetCategory: 'economy', maxRemove: 3,
      },
      {
        label: 'Option 2 — Emergency Liquidity',
        description: 'Draw 2 cards. Place this card in Economy instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 2, targetInstability: 'economy',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'economic_overhaul',
    name: 'Economic Overhaul',
    type: 'event', subtype: 'utility', category: 'economy', value: 3,
    tags: ['policy', 'economy', 'governance'],
    flavorText: 'Total restructuring demands sacrifice from every sector.',
    options: [
      {
        label: 'Option 1 — Full Reform',
        description: 'Remove the oldest Economy resource and oldest Governance resource from your stacks → remove up to 4 Economy instability, shuffle this card into the deck.',
        effect: 'remove_two_stack_cards_then_remove_instability', stacks: ['economy', 'governance'], targetCategory: 'economy', maxRemove: 4,
      },
      {
        label: 'Option 2 — Print and Hope',
        description: 'Draw 3 cards. Place this card in Economy instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 3, targetInstability: 'economy',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // ─── Culture Policy Cards ─────────────────────────────────────────────────────

  {
    id: 'social_harmony',
    name: 'Social Harmony',
    type: 'event', subtype: 'utility', category: 'culture', value: 1,
    tags: ['policy', 'culture'],
    flavorText: 'Cohesion is not built in crisis — it is spent there.',
    options: [
      {
        label: 'Option 1 — Invest in Unity',
        description: 'Remove the newest Culture resource from your stack → remove 1 Culture instability, shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'culture', targetCategory: 'culture', maxRemove: 1, stackEnd: 'newest', afterShuffle: true,
      },
      {
        label: 'Option 2 — Let Tensions Rise',
        description: 'Draw 1 card. Place this card in Culture instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 1, targetInstability: 'culture',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'populist_appeal',
    name: 'Populist Appeal',
    type: 'event', subtype: 'utility', category: 'culture', value: 1,
    tags: ['policy', 'culture'],
    flavorText: 'The crowd demands a voice. The price of listening is often culture itself.',
    options: [
      {
        label: 'Option 1 — Appeasement',
        description: 'Discard 1 card from your hand → remove 1 Culture instability, shuffle this card into the deck.',
        effect: 'discard_hand_then_remove_instability', targetCategory: 'culture', maxRemove: 1,
      },
      {
        label: 'Option 2 — Stoke the Crowd',
        description: 'Draw 1 card. Place this card in Culture instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 1, targetInstability: 'culture',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'cultural_reconciliation',
    name: 'Cultural Reconciliation',
    type: 'event', subtype: 'utility', category: 'culture', value: 2,
    tags: ['policy', 'culture'],
    flavorText: 'Reconciliation costs more than silence, and lasts longer.',
    options: [
      {
        label: 'Option 1 — Truth Commission',
        description: 'Remove the oldest Culture resource from your stack → remove up to 2 Culture instability, shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'culture', targetCategory: 'culture', maxRemove: 2, afterShuffle: true,
      },
      {
        label: 'Option 2 — Bury the Past',
        description: 'Draw 2 cards. Place this card in Culture instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 2, targetInstability: 'culture',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'national_reckoning',
    name: 'National Reckoning',
    type: 'event', subtype: 'utility', category: 'culture', value: 2,
    tags: ['policy', 'culture', 'governance'],
    flavorText: 'A civilization that cannot face its history cannot build its future.',
    options: [
      {
        label: 'Option 1 — State Apology',
        description: 'Remove the oldest Culture resource and oldest Governance resource from your stacks → remove up to 3 Culture instability, shuffle this card into the deck.',
        effect: 'remove_two_stack_cards_then_remove_instability', stacks: ['culture', 'governance'], targetCategory: 'culture', maxRemove: 3,
      },
      {
        label: 'Option 2 — Deny and Deflect',
        description: 'Draw 2 cards. Place this card in Culture instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 2, targetInstability: 'culture',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'cultural_renaissance',
    name: 'Cultural Renaissance',
    type: 'event', subtype: 'utility', category: 'culture', value: 3,
    tags: ['policy', 'culture', 'economy'],
    flavorText: 'Renewal requires destroying what came before.',
    options: [
      {
        label: 'Option 1 — Full Investment',
        description: 'Remove the oldest Culture resource and oldest Economy resource from your stacks → remove up to 4 Culture instability, shuffle this card into the deck.',
        effect: 'remove_two_stack_cards_then_remove_instability', stacks: ['culture', 'economy'], targetCategory: 'culture', maxRemove: 4,
      },
      {
        label: 'Option 2 — Creative Destruction',
        description: 'Draw 3 cards. Place this card in Culture instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 3, targetInstability: 'culture',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // ─── Military Policy Cards ────────────────────────────────────────────────────

  {
    id: 'ceasefire',
    name: 'Ceasefire',
    type: 'event', subtype: 'utility', category: 'military', value: 1,
    tags: ['policy', 'military'],
    flavorText: 'Silence on the battlefield is not peace. It is preparation.',
    options: [
      {
        label: 'Option 1 — Stand Down',
        description: 'Remove the newest Military resource from your stack → remove 1 Military instability, shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'military', targetCategory: 'military', maxRemove: 1, stackEnd: 'newest', afterShuffle: true,
      },
      {
        label: 'Option 2 — Rearm',
        description: 'Draw 1 card. Place this card in Military instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 1, targetInstability: 'military',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'fortified_peace',
    name: 'Fortified Peace',
    type: 'event', subtype: 'utility', category: 'military', value: 1,
    tags: ['policy', 'military'],
    flavorText: 'Peace maintained by force is still force.',
    options: [
      {
        label: 'Option 1 — Diplomatic Concession',
        description: 'Discard 1 card from your hand → remove 1 Military instability, shuffle this card into the deck.',
        effect: 'discard_hand_then_remove_instability', targetCategory: 'military', maxRemove: 1,
      },
      {
        label: 'Option 2 — Escalate',
        description: 'Draw 1 card. Place this card in Military instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 1, targetInstability: 'military',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'war_of_attrition',
    name: 'War of Attrition',
    type: 'event', subtype: 'utility', category: 'military', value: 2,
    tags: ['policy', 'military'],
    flavorText: 'The side that can endure longest does not win — it merely survives.',
    options: [
      {
        label: 'Option 1 — Grind It Out',
        description: 'Remove the oldest Military resource from your stack → remove up to 2 Military instability, shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'military', targetCategory: 'military', maxRemove: 2, afterShuffle: true,
      },
      {
        label: 'Option 2 — Press the Offensive',
        description: 'Draw 2 cards. Place this card in Military instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 2, targetInstability: 'military',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'force_projection',
    name: 'Force Projection',
    type: 'event', subtype: 'utility', category: 'military', value: 2,
    tags: ['policy', 'economy', 'military'],
    flavorText: 'Power abroad requires solvency at home.',
    options: [
      {
        label: 'Option 1 — Sustained Campaign',
        description: 'Remove the oldest Military resource and oldest Economy resource from your stacks → remove up to 3 Military instability, shuffle this card into the deck.',
        effect: 'remove_two_stack_cards_then_remove_instability', stacks: ['military', 'economy'], targetCategory: 'military', maxRemove: 3,
      },
      {
        label: 'Option 2 — Overextend',
        description: 'Draw 2 cards. Place this card in Military instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 2, targetInstability: 'military',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'total_mobilization',
    name: 'Total Mobilization',
    type: 'event', subtype: 'utility', category: 'military', value: 3,
    tags: ['policy', 'economy', 'military'],
    flavorText: 'Every sector is conscripted. There are no civilians in a total war.',
    options: [
      {
        label: 'Option 1 — War Economy',
        description: 'Remove the oldest Military resource and oldest Economy resource from your stacks → remove up to 4 Military instability, shuffle this card into the deck.',
        effect: 'remove_two_stack_cards_then_remove_instability', stacks: ['military', 'economy'], targetCategory: 'military', maxRemove: 4,
      },
      {
        label: 'Option 2 — Mass Conscription',
        description: 'Draw 3 cards. Place this card in Military instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 3, targetInstability: 'military',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // ─── Technology Policy Cards ──────────────────────────────────────────────────

  {
    id: 'patent_reform',
    name: 'Patent Reform',
    type: 'event', subtype: 'utility', category: 'technology', value: 1,
    tags: ['policy', 'technology'],
    flavorText: 'Who owns knowledge shapes what gets built.',
    options: [
      {
        label: 'Option 1 — Open Licensing',
        description: 'Remove the newest Technology resource from your stack → remove 1 Technology instability, shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'technology', targetCategory: 'technology', maxRemove: 1, stackEnd: 'newest', afterShuffle: true,
      },
      {
        label: 'Option 2 — Monopolize',
        description: 'Draw 1 card. Place this card in Technology instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 1, targetInstability: 'technology',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'open_source_initiative',
    name: 'Open Source Initiative',
    type: 'event', subtype: 'utility', category: 'technology', value: 1,
    tags: ['policy', 'technology'],
    flavorText: 'Shared infrastructure raises all boats — and removes some moats.',
    options: [
      {
        label: 'Option 1 — Release the Codebase',
        description: 'Discard 1 card from your hand → remove 1 Technology instability, shuffle this card into the deck.',
        effect: 'discard_hand_then_remove_instability', targetCategory: 'technology', maxRemove: 1,
      },
      {
        label: 'Option 2 — Rapid Proliferation',
        description: 'Draw 1 card. Place this card in Technology instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 1, targetInstability: 'technology',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'rd_investment',
    name: 'R&D Investment',
    type: 'event', subtype: 'utility', category: 'technology', value: 2,
    tags: ['policy', 'technology'],
    flavorText: 'Discovery cannot be scheduled, but it can be funded.',
    options: [
      {
        label: 'Option 1 — Long-Term Program',
        description: 'Remove the oldest Technology resource from your stack → remove up to 2 Technology instability, shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'technology', targetCategory: 'technology', maxRemove: 2, afterShuffle: true,
      },
      {
        label: 'Option 2 — Moonshot',
        description: 'Draw 2 cards. Place this card in Technology instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 2, targetInstability: 'technology',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'digital_transformation',
    name: 'Digital Transformation',
    type: 'event', subtype: 'utility', category: 'technology', value: 2,
    tags: ['policy', 'economy', 'technology'],
    flavorText: 'Digitizing the economy creates efficiencies and dependencies in equal measure.',
    options: [
      {
        label: 'Option 1 — Infrastructure Overhaul',
        description: 'Remove the oldest Technology resource and oldest Economy resource from your stacks → remove up to 3 Technology instability, shuffle this card into the deck.',
        effect: 'remove_two_stack_cards_then_remove_instability', stacks: ['technology', 'economy'], targetCategory: 'technology', maxRemove: 3,
      },
      {
        label: 'Option 2 — Move Fast',
        description: 'Draw 2 cards. Place this card in Technology instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 2, targetInstability: 'technology',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'technological_revolution',
    name: 'Technological Revolution',
    type: 'event', subtype: 'utility', category: 'technology', value: 3,
    tags: ['policy', 'economy', 'technology'],
    flavorText: 'Every revolution obsoletes those who built what it replaces.',
    options: [
      {
        label: 'Option 1 — Systematic Upgrade',
        description: 'Remove the oldest Technology resource and oldest Economy resource from your stacks → remove up to 4 Technology instability, shuffle this card into the deck.',
        effect: 'remove_two_stack_cards_then_remove_instability', stacks: ['technology', 'economy'], targetCategory: 'technology', maxRemove: 4,
      },
      {
        label: 'Option 2 — Disruption Wave',
        description: 'Draw 3 cards. Place this card in Technology instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 3, targetInstability: 'technology',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // ─── Environment Policy Cards ─────────────────────────────────────────────────

  {
    id: 'conservation_policy',
    name: 'Conservation Policy',
    type: 'event', subtype: 'utility', category: 'environment', value: 1,
    tags: ['policy', 'environment'],
    flavorText: 'What is preserved today is not lost to tomorrow.',
    options: [
      {
        label: 'Option 1 — Land Protection',
        description: 'Remove the newest Environment resource from your stack → remove 1 Environment instability, shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'environment', targetCategory: 'environment', maxRemove: 1, stackEnd: 'newest', afterShuffle: true,
      },
      {
        label: 'Option 2 — Exploit First',
        description: 'Draw 1 card. Place this card in Environment instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 1, targetInstability: 'environment',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'controlled_burn',
    name: 'Controlled Burn',
    type: 'event', subtype: 'utility', category: 'environment', value: 1,
    tags: ['policy', 'environment'],
    flavorText: 'Sometimes you must burn what you built to prevent a larger fire.',
    options: [
      {
        label: 'Option 1 — Prescribed Burn',
        description: 'Discard 1 card from your hand → remove 1 Environment instability, shuffle this card into the deck.',
        effect: 'discard_hand_then_remove_instability', targetCategory: 'environment', maxRemove: 1,
      },
      {
        label: 'Option 2 — Let It Burn',
        description: 'Draw 1 card. Place this card in Environment instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 1, targetInstability: 'environment',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'ecological_restoration',
    name: 'Ecological Restoration',
    type: 'event', subtype: 'utility', category: 'environment', value: 2,
    tags: ['policy', 'environment'],
    flavorText: 'Restoration requires removing what replaced what was lost.',
    options: [
      {
        label: 'Option 1 — Rewild',
        description: 'Remove the oldest Environment resource from your stack → remove up to 2 Environment instability, shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'environment', targetCategory: 'environment', maxRemove: 2, afterShuffle: true,
      },
      {
        label: 'Option 2 — Strip and Recover',
        description: 'Draw 2 cards. Place this card in Environment instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 2, targetInstability: 'environment',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'climate_accord',
    name: 'Climate Accord',
    type: 'event', subtype: 'utility', category: 'environment', value: 2,
    tags: ['policy', 'economy', 'environment'],
    flavorText: 'Every signatory trades short-term cost for long-term survival.',
    options: [
      {
        label: 'Option 1 — Binding Commitment',
        description: 'Remove the oldest Environment resource and oldest Economy resource from your stacks → remove up to 3 Environment instability, shuffle this card into the deck.',
        effect: 'remove_two_stack_cards_then_remove_instability', stacks: ['environment', 'economy'], targetCategory: 'environment', maxRemove: 3,
      },
      {
        label: 'Option 2 — Withdraw',
        description: 'Draw 2 cards. Place this card in Environment instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 2, targetInstability: 'environment',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'new_deal',
    name: 'New Deal',
    type: 'event', subtype: 'utility', category: 'environment', value: 3,
    tags: ['policy', 'economy', 'environment'],
    flavorText: 'Rebuilding the relationship between civilization and its environment demands everything.',
    options: [
      {
        label: 'Option 1 — Full Transition',
        description: 'Remove the oldest Environment resource and oldest Economy resource from your stacks → remove up to 4 Environment instability, shuffle this card into the deck.',
        effect: 'remove_two_stack_cards_then_remove_instability', stacks: ['environment', 'economy'], targetCategory: 'environment', maxRemove: 4,
      },
      {
        label: 'Option 2 — Promise and Delay',
        description: 'Draw 3 cards. Place this card in Environment instability.',
        effect: 'draw_n_then_place_in_instability', drawCount: 3, targetInstability: 'environment',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // ─── Management Philosophy — Governance Utility Cards ──────────────────────

  {
    id: 'consolidation',
    name: 'Consolidation',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'Strength comes from focus, not breadth.',
    options: [
      {
        label: 'Option 1 — Full Consolidation',
        description: 'Choose a category. Remove the oldest 2 instability cards from that pile and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_instability_modal', maxRemove: 2, selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Broad Consolidation',
        description: 'Remove the oldest instability card from each of 2 different categories and shuffle them into the deck.',
        effect: 'remove_two_instability_modal',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }, { target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'structural_consolidation',
    name: 'Structural Consolidation',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'True reform costs something. The question is what you are willing to pay.',
    options: [
      {
        label: 'Option 1 — Resource Investment',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the deck. Take the oldest 2 instability from any category and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'governance', maxRemove: 2, selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Redistribution',
        description: 'Move the oldest instability card from one category to another. Shuffle this card into the deck.',
        effect: 'move_instability_modal', selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'managed_decline',
    name: 'Managed Decline',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'Not every battle can be won. Choose where to concede and where to hold.',
    options: [
      {
        label: 'Option 1 — Strategic Sacrifice',
        description: 'Discard 2 cards from your hand. Shuffle this card into the deck.',
        effect: 'discard_from_hand_modal', count: 2,
      },
      {
        label: 'Option 2 — Focused Relief',
        description: 'Take the oldest resource from your Governance stack and shuffle it into the deck. Take the oldest instability from any category and shuffle it into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'governance', maxRemove: 1, selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'rationalization',
    name: 'Rationalization',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'What cannot be justified cannot be sustained.',
    options: [
      {
        label: 'Option 1 — Strip to Core',
        description: 'Choose a stack with 2+ resources. Remove all resources except the oldest → bottom of deck. Remove all instabilities from that category except one → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'strip_stack_to_oldest_and_instab',
      },
      {
        label: 'Option 2 — Aggressive Cuts',
        description: 'Choose any stack — remove up to 3 oldest resources → bottom of deck. Choose any instability pile — remove up to 2 oldest cards → bottom of deck. Place this card at the bottom of the deck.',
        effect: 'remove_three_from_stack_remove_two_instab',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }, { target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'austerity',
    name: 'Austerity',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'economy', 'governance'],
    flavorText: 'Short-term pain for long-term stability.',
    options: [
      {
        label: 'Option 1 — Fiscal Cuts',
        description: 'Remove the oldest Economy resource from your stack and shuffle it into the deck. Remove the oldest 3 instability from any category and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'economy', maxRemove: 3, selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Administrative Cuts',
        description: 'Take the oldest resource from your Governance stack and shuffle it into the deck. Take the oldest 2 instability from any category and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'governance', maxRemove: 2, selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'preparedness',
    name: 'Preparedness',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'The time to repair the roof is when the sun is shining.',
    options: [
      {
        label: 'Option 1 — Full Survey',
        description: 'Draw 2 cards. Send this card to Governance or Culture instability.',
        effect: 'draw_if_hand_small',
      },
      {
        label: 'Option 2 — Quick Assessment',
        description: 'Draw 1 card. Shuffle this card into the deck.',
        effect: 'draw_and_shuffle_self',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'crisis_protocol',
    name: 'Crisis Protocol',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'When the system breaks, the response must be immediate.',
    options: [
      {
        label: 'Option 1 — Emergency Response',
        description: 'Take the oldest instability from any category and shuffle it into the deck. Shuffle this card into the deck.',
        effect: 'remove_instability_modal', maxRemove: 1, selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Rapid Deployment',
        description: 'Take the oldest instability from each of 2 different categories and shuffle them into the deck.',
        effect: 'remove_two_instability_modal',
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'grand_strategy',
    name: 'Grand Strategy',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance', 'military'],
    flavorText: 'Tactics win battles. Strategy wins civilizations.',
    options: [
      {
        label: 'Option 1 — Long View',
        description: 'Draw 2 cards. Shuffle this card into the deck.',
        effect: 'draw_if_hand_small',
      },
      {
        label: 'Option 2 — Resource Allocation',
        description: 'Remove the oldest Military resource from your stack and shuffle it into the deck. Take the oldest 2 instability from any category and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'military', maxRemove: 2, selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'redundancy_systems',
    name: 'Redundancy Systems',
    type: 'event', subtype: 'utility', category: 'governance', value: 1,
    tags: ['policy', 'governance', 'technology'],
    flavorText: 'A civilization without backups is one crisis from collapse.',
    options: [
      {
        label: 'Option 1 — Build Redundancy',
        description: 'Discard 1 card from your hand. Shuffle this card into the deck.',
        effect: 'discard_from_hand_modal', count: 1,
      },
      {
        label: 'Option 2 — Failsafe',
        description: 'Remove the oldest Technology resource from your stack and shuffle it into the deck. Take the oldest 2 instability from any category and shuffle them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_instability', sourceCategory: 'technology', maxRemove: 2, selfDiscardFlow: true,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'adaptive_management',
    name: 'Adaptive Management',
    type: 'event', subtype: 'utility', category: 'governance', value: 2,
    tags: ['policy', 'economy', 'governance', 'military'],
    flavorText: 'The strongest civilizations are those that learn while moving.',
    options: [
      {
        label: 'Option 1 — Adaptive Response',
        description: 'Take the oldest instability from any category and shuffle it into the deck. Shuffle this card into the deck.',
        effect: 'remove_instability_modal', maxRemove: 1, selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Strategic Investment',
        description: 'Take the oldest resource from your Governance stack and shuffle it into the deck. Stack +2 on Economy or Military.',
        effect: 'pay_own_stack_then_stack_on_any', ownCategory: 'governance', choices: ['economy', 'military'],
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'revisionist_history',
    name: 'Revisionist History',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    tags: ['policy', 'governance'],
    flavorText: 'The past is negotiable. The future is not.',
    options: [
      {
        label: 'Option 1 — Rewrite',
        description: 'Remove the oldest Governance resource from your stack and shuffle it into the draw deck. Then choose one Instability pile — remove the oldest card from it and shuffle it into the draw deck. Discard this card.',
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
    tags: ['policy'],
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
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'occupation',
    name: 'Occupation',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    tags: ['policy', 'hostile', 'culture', 'environment'],
    flavorText: 'Territory taken, resources claimed.',
    options: [
      {
        label: 'Option 1 — Seize and Advance',
        description: 'Choose an available environment or culture resource in play and add it to your own Economy stack. Remove the oldest Military resource from your stack and shuffle it into the draw deck. Discard this card.',
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
    tags: ['policy', 'hostile', 'economy', 'technology'],
    flavorText: 'A border crossed in the night.',
    options: [
      {
        label: 'Option 1 — Strike and Withdraw',
        description: 'Choose an available technology or economy resource in play and add it to your own Economy stack. Remove the oldest Military resource from your stack and shuffle it into the draw deck. Discard this card.',
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
    subtype: 'stacking',
    category: 'economy',
    value: 1,
    tags: ['exchange', 'hostile', 'culture', 'economy', 'governance'],
    flavorText: 'Power does not always wear armor.',
    options: [
      {
        label: 'Option 1 — Economic Pressure',
        description: 'Remove the oldest Governance resource from your stack. Discard 1 card from your hand. Place this card on your Economy stack (+1).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'governance',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Cultural Leverage',
        description: 'Remove the oldest Culture instability. Discard 1 card from your hand. Place this card on your Economy stack (+1).',
        effect: 'remove_instability_then_discard_hand_then_stack',
        instabilityCategory: 'culture',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'sanctions',
    name: 'Sanctions',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 1,
    tags: ['exchange', 'hostile', 'culture', 'economy', 'governance'],
    flavorText: 'Power does not always wear armor.',
    options: [
      {
        label: 'Option 1 — Economic Pressure',
        description: 'Remove the oldest Governance resource from your stack. Discard 1 card from your hand. Place this card on your Economy stack (+1).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'governance',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Cultural Leverage',
        description: 'Remove the oldest Culture instability. Discard 1 card from your hand. Place this card on your Economy stack (+1).',
        effect: 'remove_instability_then_discard_hand_then_stack',
        instabilityCategory: 'culture',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'cultural_exchange',
    name: 'Cultural Exchange',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    tags: ['policy', 'culture'],
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
    tags: ['policy'],
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
    tags: ['policy'],
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
    id: 'disarmament',
    name: 'Disarmament',
    type: 'event',
    subtype: 'utility',
    category: 'military',
    value: 1,
    tags: ['policy', 'governance', 'military', 'technology'],
    flavorText: 'What is laid down cannot be turned against you.',
    options: [
      {
        label: 'Option 1 — Demilitarize',
        description: 'Remove the oldest Governance resource from your stack. Remove up to 3 Military resources from your stack, shuffling them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_n_from_stack',
        sourceCategory: 'governance',
        targetCategory: 'military',
        removeCount: 3,
        selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Convert Assets',
        description: 'Remove the oldest Military resource from your stack. Stack this card as a +1 bonus on Technology.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'military',
        targetCategory: 'technology',
        bonusValue: 1,
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  {
    id: 'social_upheaval',
    name: 'Social Upheaval',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 1,
    tags: ['instability', 'culture'],
    flavorText: 'When the people move, institutions shake.',
    options: [
      {
        label: 'Option 1 — Weather the Storm',
        description: 'Discard 3 cards from your hand. Shuffle this card into the deck.',
        effect: 'discard_from_hand_then_shuffle_self',
        count: 3,
      },
      {
        label: 'Option 2 — Concede Ground',
        description: 'Remove the oldest Culture resource from your stack. Send this card to Governance or Culture instability.',
        effect: 'remove_stack_card_then_discard_self',
        sourceCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'destabilization',
    name: 'Destabilization',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 3,
    tags: ['exchange', 'hostile', 'culture', 'governance', 'military'],
    flavorText: 'Force projected outward reshapes the world within.',
    options: [
      {
        label: 'Option 1 — Undermine',
        description: 'Remove the oldest Military resource from your stack. Place this card in any Culture instability stack on the board (−3 to Culture).',
        effect: 'remove_stack_card_then_place_in_instability',
        sourceCategory: 'military',
        targetInstability: 'culture',
      },
      {
        label: 'Option 2 — Convert Resources',
        description: 'Remove the oldest Governance resource from your stack. Stack this card as a +3 bonus on Culture.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'governance',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  {
    id: 'direct_attack',
    name: 'Direct Attack',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 3,
    tags: ['exchange', 'hostile', 'governance', 'military'],
    flavorText: 'Strike precisely. Strike decisively.',
    options: [
      {
        label: 'Option 1 — Seize Governance',
        description: 'Remove the oldest Military resource from your stack. Remove the oldest Military resource (or your active Military identity if stack is empty). Place this card on your Governance stack (+3).',
        effect: 'remove_stack_card_then_remove_or_identity_then_stack',
        sourceCategory: 'military',
        removeCategory: 'military',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Military Supremacy',
        description: 'Remove the oldest Military resource from your stack. Remove the oldest Governance resource (or your active Governance identity if stack is empty). Place this card on your Military stack (+3).',
        effect: 'remove_stack_card_then_remove_or_identity_then_stack',
        sourceCategory: 'military',
        removeCategory: 'governance',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  {
    id: 'arms_package',
    name: 'Arms Package',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 2,
    tags: ['exchange', 'hostile', 'culture', 'economy', 'governance'],
    flavorText: 'Weapons are just another form of trade.',
    options: [
      {
        label: 'Option 1 — Government Contract',
        description: 'Remove the oldest Governance resource from your stack. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'governance',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Cultural Goodwill',
        description: 'Remove the oldest Culture instability. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_instability_then_discard_hand_then_stack',
        instabilityCategory: 'culture',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'disarmament',
    name: 'Disarmament',
    type: 'event',
    subtype: 'utility',
    category: 'military',
    value: 1,
    tags: ['policy', 'governance', 'military', 'technology'],
    flavorText: 'What is laid down cannot be turned against you.',
    options: [
      {
        label: 'Option 1 — Demilitarize',
        description: 'Remove the oldest Governance resource from your stack. Remove up to 3 Military resources from your stack, shuffling them into the deck. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_remove_n_from_stack',
        sourceCategory: 'governance',
        targetCategory: 'military',
        removeCount: 3,
        selfDiscardFlow: true,
      },
      {
        label: 'Option 2 — Convert Assets',
        description: 'Remove the oldest Military resource from your stack. Stack this card as a +1 bonus on Technology.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'military',
        targetCategory: 'technology',
        bonusValue: 1,
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  {
    id: 'social_upheaval',
    name: 'Social Upheaval',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 1,
    tags: ['instability', 'culture'],
    flavorText: 'When the people move, institutions shake.',
    options: [
      {
        label: 'Option 1 — Weather the Storm',
        description: 'Discard 3 cards from your hand. Shuffle this card into the deck.',
        effect: 'discard_from_hand_then_shuffle_self',
        count: 3,
      },
      {
        label: 'Option 2 — Concede Ground',
        description: 'Remove the oldest Culture resource from your stack. Send this card to Governance or Culture instability.',
        effect: 'remove_stack_card_then_discard_self',
        sourceCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'destabilization',
    name: 'Destabilization',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 3,
    tags: ['exchange', 'hostile', 'culture', 'governance', 'military'],
    flavorText: 'Force projected outward reshapes the world within.',
    options: [
      {
        label: 'Option 1 — Undermine',
        description: 'Pay 1 Military resource. Place this card in any Culture instability stack on the board (−3 to Culture).',
        effect: 'remove_stack_card_then_place_in_instability',
        sourceCategory: 'military',
        targetInstability: 'culture',
      },
      {
        label: 'Option 2 — Convert Resources',
        description: 'Pay 1 Governance resource. Stack this card as a +3 bonus on Culture.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'governance',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  {
    id: 'direct_attack',
    name: 'Direct Attack',
    type: 'event',
    subtype: 'stacking',
    category: 'military',
    value: 3,
    tags: ['exchange', 'hostile', 'governance', 'military'],
    flavorText: 'Strike precisely. Strike decisively.',
    options: [
      {
        label: 'Option 1 — Seize Governance',
        description: 'Remove the oldest Military resource from your stack. Remove the oldest Military resource (or your active Military identity if stack is empty). Place this card on your Governance stack (+3).',
        effect: 'remove_stack_card_then_remove_or_identity_then_stack',
        sourceCategory: 'military',
        removeCategory: 'military',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Military Supremacy',
        description: 'Remove 1 Military resource. Remove 1 Governance resource (or your active Governance identity if none remain). Place this card on your Military stack (+3).',
        effect: 'remove_stack_card_then_remove_or_identity_then_stack',
        sourceCategory: 'military',
        removeCategory: 'governance',
        targetCategory: 'military',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  {
    id: 'arms_package',
    name: 'Arms Package',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 2,
    tags: ['exchange', 'hostile', 'culture', 'economy', 'governance'],
    flavorText: 'Weapons are just another form of trade.',
    options: [
      {
        label: 'Option 1 — Government Contract',
        description: 'Remove 1 Governance resource. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'governance',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Cultural Goodwill',
        description: 'Remove 1 Culture instability. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_instability_then_discard_hand_then_stack',
        instabilityCategory: 'culture',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  // ─── Governance Hostile Cards ────────────────────────────────────────────────

  {
    id: 'regulatory_capture',
    name: 'Regulatory Capture',
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 2,
    tags: ['resource', 'hostile', 'economy', 'governance'],
    flavorText: 'The rule-makers become the ruled.',
    options: [
      {
        label: 'Option 1 — Favorable Ruling',
        description: 'Remove 1 Governance resource. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'governance',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Institutional Drain',
        description: 'Remove 1 Economy instability. Discard 1 card from your hand. Place this card on your Governance stack (+2).',
        effect: 'remove_instability_then_discard_hand_then_stack',
        instabilityCategory: 'economy',
        targetCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'emergency_powers',
    name: 'Emergency Powers',
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 3,
    tags: ['resource', 'hostile', 'culture', 'governance', 'military'],
    flavorText: 'In a crisis, legality bends.',
    options: [
      {
        label: 'Option 1 — Declare Emergency',
        description: 'Remove 1 Governance resource. Place this card in Culture Instability (−3).',
        effect: 'remove_stack_card_then_place_in_instability',
        sourceCategory: 'governance',
        targetInstability: 'culture',
      },
      {
        label: 'Option 2 — Seize Control',
        description: 'Remove 1 Military resource. Stack this card as +3 on Governance.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'military',
        targetCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  // ─── Culture Hostile Cards ───────────────────────────────────────────────────

  {
    id: 'propaganda_campaign',
    name: 'Propaganda Campaign',
    type: 'event',
    subtype: 'stacking',
    category: 'culture',
    value: 2,
    tags: ['resource', 'hostile', 'culture', 'governance'],
    flavorText: 'Shape the story before it shapes you.',
    options: [
      {
        label: 'Option 1 — Narrative Control',
        description: 'Remove 1 Culture resource. Discard 1 card from your hand. Place this card on your Governance stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'culture',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Undermine Dissent',
        description: 'Remove 1 Governance instability. Discard 1 card from your hand. Place this card on your Culture stack (+2).',
        effect: 'remove_instability_then_discard_hand_then_stack',
        instabilityCategory: 'governance',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'cultural_erasure',
    name: 'Cultural Erasure',
    type: 'event',
    subtype: 'stacking',
    category: 'culture',
    value: 3,
    tags: ['resource', 'hostile', 'culture', 'governance'],
    flavorText: 'History is written by the victors.',
    options: [
      {
        label: 'Option 1 — Suppress',
        description: 'Remove 1 Culture resource. Place this card in Governance Instability (−3).',
        effect: 'remove_stack_card_then_place_in_instability',
        sourceCategory: 'culture',
        targetInstability: 'governance',
      },
      {
        label: 'Option 2 — Rewrite History',
        description: 'Remove 1 Governance resource. Stack this card as +3 on Culture.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'governance',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  // ─── Technology Hostile Cards ────────────────────────────────────────────────

  {
    id: 'cyber_attack',
    name: 'Cyber Attack',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 2,
    tags: ['resource', 'hostile', 'economy', 'governance', 'technology'],
    flavorText: 'No borders in the digital domain.',
    options: [
      {
        label: 'Option 1 — System Breach',
        description: 'Remove 1 Technology resource. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'technology',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Data Exfiltration',
        description: 'Remove 1 Governance instability. Discard 1 card from your hand. Place this card on your Technology stack (+2).',
        effect: 'remove_instability_then_discard_hand_then_stack',
        instabilityCategory: 'governance',
        targetCategory: 'technology',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'patent_warfare',
    name: 'Patent Warfare',
    type: 'event',
    subtype: 'stacking',
    category: 'technology',
    value: 3,
    tags: ['resource', 'hostile', 'economy', 'military', 'technology'],
    flavorText: 'Ideas, locked behind walls.',
    options: [
      {
        label: 'Option 1 — IP Lockdown',
        description: 'Remove 1 Technology resource. Place this card in Economy Instability (−3).',
        effect: 'remove_stack_card_then_place_in_instability',
        sourceCategory: 'technology',
        targetInstability: 'economy',
      },
      {
        label: 'Option 2 — Market Block',
        description: 'Remove 1 Military resource. Stack this card as +3 on Technology.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'military',
        targetCategory: 'technology',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  // ─── Environment Hostile Cards ───────────────────────────────────────────────

  {
    id: 'resource_extraction',
    name: 'Resource Extraction',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 2,
    tags: ['resource', 'hostile', 'economy', 'environment'],
    flavorText: 'The land gives; we take.',
    options: [
      {
        label: 'Option 1 — Forced Exploitation',
        description: 'Remove 1 Environment resource. Discard 1 card from your hand. Place this card on your Economy stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'environment',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Debt for Nature',
        description: 'Remove 1 Economy instability. Discard 1 card from your hand. Place this card on your Environment stack (+2).',
        effect: 'remove_instability_then_discard_hand_then_stack',
        instabilityCategory: 'economy',
        targetCategory: 'environment',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  {
    id: 'industrial_pollution',
    name: 'Industrial Pollution',
    type: 'event',
    subtype: 'stacking',
    category: 'environment',
    value: 3,
    tags: ['resource', 'hostile', 'economy', 'environment'],
    flavorText: 'Progress measured in parts per million.',
    options: [
      {
        label: 'Option 1 — Externalize Costs',
        description: 'Remove 1 Environment resource. Place this card in Economy Instability (−3).',
        effect: 'remove_stack_card_then_place_in_instability',
        sourceCategory: 'environment',
        targetInstability: 'economy',
      },
      {
        label: 'Option 2 — Greenwash',
        description: 'Remove 1 Economy resource. Stack this card as +3 on Environment.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'economy',
        targetCategory: 'environment',
      },
    ],
    discardTo: [
      { target: 'environment_instability', label: 'Environment Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
  },

  // ─── Global Event Cards ──────────────────────────────────────────────────────

  {
    id: 'global_recession',
    name: 'Global Recession',
    type: 'event',
    subtype: 'hazard',
    category: 'economy',
    value: 2,
    tags: ['instability', 'event', 'economy', 'governance', 'technology'],
    mustPlayWhenDrawn: true,
    cooperativeThreshold: 4,
    thresholdCategory: 'economy',
    penaltyCategory: 'economy',
    penaltyCount: 2,
    penaltyType: 'remove_stack',
    flavorText: 'Markets fall. Everyone suffers.',
    options: [
      {
        label: 'Option 1 — Emergency Response',
        description: 'Pay 1 Economy + 1 Governance + 1 Technology resource to avert the impact. (If 4+ Economy cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_escape',
        escapeCost: ['economy', 'governance', 'technology'],
      },
      {
        label: 'Option 2 — Accept the Loss',
        description: 'Remove 2 Economy resources from your stack (shuffled to deck). (If 4+ Economy cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_penalty',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'constitutional_crisis',
    name: 'Constitutional Crisis',
    type: 'event',
    subtype: 'hazard',
    category: 'governance',
    value: 2,
    tags: ['instability', 'event', 'economy', 'governance', 'military'],
    mustPlayWhenDrawn: true,
    cooperativeThreshold: 4,
    thresholdCategory: 'governance',
    penaltyCategory: 'governance',
    penaltyCount: 2,
    penaltyType: 'deck_to_instability',
    flavorText: 'When the law breaks, everything else follows.',
    options: [
      {
        label: 'Option 1 — Restore Order',
        description: 'Pay 1 Governance + 1 Military + 1 Economy resource to contain the crisis. (If 4+ Governance cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_escape',
        escapeCost: ['governance', 'military', 'economy'],
      },
      {
        label: 'Option 2 — Let It Burn',
        description: 'Draw the top 2 cards from the deck and place them in Governance Instability. (If 4+ Governance cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_penalty',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'mass_uprising',
    name: 'Mass Uprising',
    type: 'event',
    subtype: 'hazard',
    category: 'culture',
    value: 2,
    tags: ['instability', 'event', 'culture', 'economy', 'governance'],
    mustPlayWhenDrawn: true,
    cooperativeThreshold: 4,
    thresholdCategory: 'culture',
    penaltyCategory: 'culture',
    penaltyCount: 2,
    penaltyType: 'remove_stack',
    flavorText: 'Discontent has a tipping point.',
    options: [
      {
        label: 'Option 1 — Concessions',
        description: 'Pay 1 Culture + 1 Governance + 1 Economy resource to defuse tensions. (If 4+ Culture cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_escape',
        escapeCost: ['culture', 'governance', 'economy'],
      },
      {
        label: 'Option 2 — Suppress',
        description: 'Remove 2 Culture resources from your stack (shuffled to deck). (If 4+ Culture cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_penalty',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'arms_escalation',
    name: 'Arms Escalation',
    type: 'event',
    subtype: 'hazard',
    category: 'military',
    value: 2,
    tags: ['instability', 'event', 'economy', 'military', 'technology'],
    mustPlayWhenDrawn: true,
    cooperativeThreshold: 4,
    thresholdCategory: 'military',
    penaltyCategory: 'military',
    penaltyCount: 2,
    penaltyType: 'deck_to_instability',
    flavorText: 'Every escalation demands a response.',
    options: [
      {
        label: 'Option 1 — Stand Down',
        description: 'Pay 1 Military + 1 Economy + 1 Technology resource to de-escalate. (If 4+ Military cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_escape',
        escapeCost: ['military', 'economy', 'technology'],
      },
      {
        label: 'Option 2 — Match the Threat',
        description: 'Draw the top 2 cards from the deck and place them in Military Instability. (If 4+ Military cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_penalty',
      },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'tech_collapse',
    name: 'Tech Collapse',
    type: 'event',
    subtype: 'hazard',
    category: 'technology',
    value: 2,
    tags: ['instability', 'event', 'economy', 'governance', 'technology'],
    mustPlayWhenDrawn: true,
    cooperativeThreshold: 4,
    thresholdCategory: 'technology',
    penaltyCategory: 'technology',
    penaltyCount: 2,
    penaltyType: 'remove_stack',
    flavorText: 'Systems fail. Dependencies cascade.',
    options: [
      {
        label: 'Option 1 — Emergency Patch',
        description: 'Pay 1 Technology + 1 Economy + 1 Governance resource to contain the failure. (If 4+ Technology cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_escape',
        escapeCost: ['technology', 'economy', 'governance'],
      },
      {
        label: 'Option 2 — Accept Downtime',
        description: 'Remove 2 Technology resources from your stack (shuffled to deck). (If 4+ Technology cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_penalty',
      },
    ],
    discardTo: [{ target: 'technology_instability', label: 'Technology Instability' }],
  },

  {
    id: 'climate_crisis',
    name: 'Climate Crisis',
    type: 'event',
    subtype: 'hazard',
    category: 'environment',
    value: 3,
    tags: ['instability', 'event', 'economy', 'environment', 'technology'],
    mustPlayWhenDrawn: true,
    cooperativeThreshold: 5,
    thresholdCategory: 'environment',
    penaltyCategory: 'environment',
    penaltyCount: 3,
    penaltyType: 'remove_stack',
    flavorText: 'The bill arrives for decades of deferred costs.',
    options: [
      {
        label: 'Option 1 — Emergency Investment',
        description: 'Pay 1 Environment + 1 Economy + 1 Technology resource to mitigate the impact. (If 5+ Environment cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_escape',
        escapeCost: ['environment', 'economy', 'technology'],
      },
      {
        label: 'Option 2 — Absorb the Damage',
        description: 'Remove 3 Environment resources from your stack (shuffled to deck). (If 5+ Environment cards are in the draw deck, this card is negated automatically.)',
        effect: 'global_event_penalty',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'census',
    name: 'Census',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    tags: ['policy'],
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

  {
    id: 'free_trade_agreement',
    name: 'Free Trade Agreement',
    type: 'event',
    subtype: 'stacking',
    category: 'economy',
    value: 1,
    tags: ['exchange', 'economy', 'governance'],
    flavorText: 'Open borders enrich both sides — or so the theory goes.',
    options: [
      {
        label: 'Option 1 — Coalition Trade (Alliance active)',
        description: 'Requires Alliance in any stack. Place this card on your Economy stack for free.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
        condition: { card_in_stack: { id: 'alliance' } },
      },
      {
        label: 'Option 2 — Open Market',
        description: 'Remove the oldest Governance resource from your stack → place this card on your Economy stack.',
        effect: 'remove_stack_card_then_stack_on_category',
        sourceCategory: 'governance',
        targetCategory: 'economy',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  // ─── Labor & Population ───────────────────────────────────────────────────

  {
    id: 'labor_shortage',
    name: 'Labor Shortage',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    tags: ['instability', 'economy'],
    flavorText: 'Empty factories, idle fields, unfilled ranks.',
    options: [
      {
        label: 'Option 1 — Workforce Investment',
        description: 'Remove 1 resource from your Economy stack → place this card at the bottom of the deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'economy',
      },
      {
        label: 'Option 2 — Accept the Shortage',
        description: 'Place this card in Economy Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'economy',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'population_decline',
    name: 'Population Decline',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    tags: ['instability', 'culture', 'economy'],
    flavorText: 'A civilization that cannot sustain itself cannot endure.',
    options: [
      {
        label: 'Option 1 — Emergency Response',
        description: 'Remove 1 resource from your Economy stack AND 1 from your Culture stack → place this card at the bottom of the deck.',
        effect: 'remove_two_stack_cards_then_bottom',
        sourceCategory1: 'economy',
        sourceCategory2: 'culture',
      },
      {
        label: 'Option 2 — Demographic Crisis',
        description: 'Place this card in Economy Instability or Culture Instability (your choice).',
        effect: 'discard_self',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'immigration',
    name: 'Immigration',
    type: 'event',
    subtype: null,
    category: null,
    value: 2,
    tags: ['resource', 'culture', 'economy'],
    flavorText: 'Every wave of new arrivals reshapes what a civilization becomes.',
    options: [
      {
        label: 'Option 1 — Economic Integration',
        description: 'Place this card on your Economy stack.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Cultural Integration',
        description: 'Place this card on your Culture stack. Discard 1 card from hand.',
        effect: 'stack_on_category_then_discard_hand',
        targetCategory: 'culture',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  // ─── Crime arc ────────────────────────────────────────────────────────────

  {
    id: 'crime',
    name: 'Crime',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    tags: ['instability', 'governance'],
    flavorText: 'Where laws are weak, the criminal thrives.',
    options: [
      {
        label: 'Option 1 — Law Enforcement',
        description: 'Remove 1 resource from your Governance stack → place this card at the bottom of the deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'governance',
      },
      {
        label: 'Option 2 — Accept the Loss',
        description: 'Place this card in Economy or Military Instability (your choice).',
        effect: 'discard_self',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  {
    id: 'criminal_conspiracy',
    name: 'Criminal Conspiracy',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    tags: ['instability', 'governance', 'military'],
    flavorText: 'Corruption spreads like roots — unseen until the tree falls.',
    options: [
      {
        label: 'Option 1 — Coordinated Crackdown',
        description: 'Remove 1 resource from your Governance stack AND 1 from your Military stack → place this card at the bottom of the deck.',
        effect: 'remove_two_stack_cards_then_bottom',
        sourceCategory1: 'governance',
        sourceCategory2: 'military',
      },
      {
        label: 'Option 2 — Systemic Corruption',
        description: 'Discard 1 card from hand. Place this card in Military Instability.',
        effect: 'discard_hand_then_self',
        afterInstability: 'military',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'organized_crime',
    name: 'Organized Crime',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 4,
    tags: ['instability', 'economy', 'governance', 'military'],
    flavorText: 'It does not hide in the shadows. It operates in plain sight.',
    options: [
      {
        label: 'Option 1 — Full Suppression',
        description: 'Remove 1 Governance, 1 Military, AND 1 Economy resource → place this card at the bottom of the deck.',
        effect: 'remove_three_stack_cards_then_bottom',
        sourceCategory1: 'governance',
        sourceCategory2: 'military',
        sourceCategory3: 'economy',
        condition: { card_not_in_instability: { id: 'criminal_conspiracy' } },
      },
      {
        label: 'Option 1 — Full Suppression (Entrenched)',
        description: 'Criminal networks run deep. Remove 1 Governance, 1 Military, 1 Economy, AND 1 Technology resource → place this card at the bottom of the deck.',
        effect: 'remove_four_stack_cards_then_bottom',
        sourceCategory1: 'governance',
        sourceCategory2: 'military',
        sourceCategory3: 'economy',
        sourceCategory4: 'technology',
        condition: { card_in_instability: { id: 'criminal_conspiracy' } },
      },
      {
        label: 'Option 2 — Criminal State',
        description: 'Discard 2 cards from hand. Place this card in Economy or Culture Instability (your choice).',
        effect: 'discard_from_hand_modal',
        count: 2,
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  // ─── Crime arc ────────────────────────────────────────────────────────────

  {
    id: 'crime',
    name: 'Crime',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    tags: ['instability', 'governance'],
    flavorText: 'Where laws are weak, the criminal thrives.',
    options: [
      {
        label: 'Option 1 — Law Enforcement',
        description: 'Remove 1 resource from your Governance stack → place this card at the bottom of the deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'governance',
      },
      {
        label: 'Option 2 — Accept the Loss',
        description: 'Place this card in Economy or Governance Instability (your choice).',
        effect: 'discard_self',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'governance_instability', label: 'Governance Instability' },
    ],
  },

  {
    id: 'criminal_conspiracy',
    name: 'Criminal Conspiracy',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    tags: ['instability', 'governance', 'military'],
    flavorText: 'Corruption spreads like roots — unseen until the tree falls.',
    options: [
      {
        label: 'Option 1 — Coordinated Crackdown',
        description: 'Remove 1 resource from your Governance stack AND 1 from your Military stack → place this card at the bottom of the deck.',
        effect: 'remove_two_stack_cards_then_bottom',
        sourceCategory1: 'governance',
        sourceCategory2: 'military',
      },
      {
        label: 'Option 2 — Systemic Corruption',
        description: 'Discard 1 card from hand. Place this card in Governance Instability.',
        effect: 'discard_hand_then_self',
        afterInstability: 'governance',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'organized_crime',
    name: 'Organized Crime',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 4,
    tags: ['instability', 'economy', 'governance', 'military'],
    flavorText: 'It does not hide in the shadows. It operates in plain sight.',
    options: [
      {
        label: 'Option 1 — Full Suppression',
        description: 'Remove 1 resource from your Governance stack, 1 from your Military stack, AND 1 from your Economy stack → place this card at the bottom of the deck.',
        effect: 'remove_three_stack_cards_then_bottom',
        sourceCategory1: 'governance',
        sourceCategory2: 'military',
        sourceCategory3: 'economy',
      },
      {
        label: 'Option 2 — Criminal State',
        description: 'Discard 2 cards from hand. Place this card in Governance Instability.',
        effect: 'discard_from_hand_modal',
        count: 2,
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'restitution',
    name: 'Restitution',
    type: 'event',
    subtype: null,
    category: null,
    value: 1,
    tags: ['policy'],
    flavorText: 'Accountability begins where power admits its cost.',
    options: [
      {
        label: 'Option 1 — Full Restitution',
        description: 'Remove any two of your resources. Remove any one of your instabilities. Shuffle this card into the deck.',
        effect: 'remove_two_resources_remove_instability_shuffle_self',
      },
      {
        label: 'Option 2 — Partial Restitution',
        description: 'Remove any one of your resources. Remove any one of your instabilities. Discard this card.',
        effect: 'remove_one_resource_remove_instability_discard_self',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'technology_instability', label: 'Technology Instability' },
      { target: 'environment_instability', label: 'Environment Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
  },

  // ─── Labor & Population ───────────────────────────────────────────────────

  {
    id: 'labor_shortage',
    name: 'Labor Shortage',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    tags: ['instability', 'economy'],
    flavorText: 'Empty factories, idle fields, unfilled ranks.',
    options: [
      {
        label: 'Option 1 — Workforce Investment',
        description: 'Remove 1 resource from your Economy stack → place this card at the bottom of the deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'economy',
      },
      {
        label: 'Option 2 — Accept the Shortage',
        description: 'Place this card in Economy Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'economy',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'population_decline',
    name: 'Population Decline',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    tags: ['instability', 'culture', 'economy'],
    flavorText: 'A civilization that cannot sustain itself cannot endure.',
    options: [
      {
        label: 'Option 1 — Emergency Response',
        description: 'Remove 1 resource from your Economy stack AND 1 from your Culture stack → place this card at the bottom of the deck.',
        effect: 'remove_two_stack_cards_then_bottom',
        sourceCategory1: 'economy',
        sourceCategory2: 'culture',
      },
      {
        label: 'Option 2 — Demographic Crisis',
        description: 'Place this card in Economy Instability or Culture Instability (your choice).',
        effect: 'discard_self',
      },
    ],
    discardTo: [
      { target: 'economy_instability', label: 'Economy Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
    ],
  },

  {
    id: 'immigration',
    name: 'Immigration',
    type: 'event',
    subtype: null,
    category: null,
    value: 2,
    tags: ['resource', 'culture', 'economy'],
    flavorText: 'Every wave of new arrivals reshapes what a civilization becomes.',
    options: [
      {
        label: 'Option 1 — Economic Integration',
        description: 'Place this card on your Economy stack.',
        effect: 'stack_on_category',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Cultural Integration',
        description: 'Place this card on your Culture stack. Discard 1 card from hand.',
        effect: 'stack_on_category_then_discard_hand',
        targetCategory: 'culture',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  // ─── Late-game hazards ────────────────────────────────────────────────────

  {
    id: 'insider_trading',
    name: 'Insider Trading',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    tags: ['instability', 'economy'],
    flavorText: 'When the market is a game, only the house wins.',
    options: [
      {
        label: 'Option 1 — Regulatory Crackdown',
        description: 'Requires all 6 identities to be active. Remove ALL resources from your Economy stack → deck. Shuffle this card into the deck.',
        effect: 'remove_all_from_stack_shuffle_self',
        targetCategory: 'economy',
        condition: { allIdentitiesActive: true },
      },
      {
        label: 'Option 2 — Systemic Rot',
        description: 'Remove the oldest resource from every category stack that has cards. Discard this card to Economy Instability.',
        effect: 'remove_one_from_each_stack',
      },
    ],
    discardTo: [{ target: 'economy_instability', label: 'Economy Instability' }],
  },

  {
    id: 'state_capture',
    name: 'State Capture',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    tags: ['instability', 'governance'],
    flavorText: 'The state does not fall — it is simply redirected.',
    options: [
      {
        label: 'Option 1 — Anti-Corruption Drive',
        description: 'Requires all 6 identities to be active. Remove ALL resources from your Governance stack → deck. Shuffle this card into the deck.',
        effect: 'remove_all_from_stack_shuffle_self',
        targetCategory: 'governance',
        condition: { allIdentitiesActive: true },
      },
      {
        label: 'Option 2 — Institutional Capture',
        description: 'Remove the oldest resource from every category stack that has cards. Discard this card to Governance Instability.',
        effect: 'remove_one_from_each_stack',
      },
    ],
    discardTo: [{ target: 'governance_instability', label: 'Governance Instability' }],
  },

  {
    id: 'cultural_purge',
    name: 'Cultural Purge',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    tags: ['instability', 'culture'],
    flavorText: 'History is rewritten by those who control the present.',
    options: [
      {
        label: 'Option 1 — Cultural Revival',
        description: 'Requires all 6 identities to be active. Remove ALL resources from your Culture stack → deck. Shuffle this card into the deck.',
        effect: 'remove_all_from_stack_shuffle_self',
        targetCategory: 'culture',
        condition: { allIdentitiesActive: true },
      },
      {
        label: 'Option 2 — Systematic Erasure',
        description: 'Remove the oldest resource from every category stack that has cards. Discard this card to Culture Instability.',
        effect: 'remove_one_from_each_stack',
      },
    ],
    discardTo: [{ target: 'culture_instability', label: 'Culture Instability' }],
  },

  {
    id: 'treason',
    name: 'Treason',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    tags: ['instability', 'military'],
    flavorText: 'Loyalty is the first casualty of a failing state.',
    options: [
      {
        label: 'Option 1 — Military Tribunal',
        description: 'Requires all 6 identities to be active. Remove ALL resources from your Military stack → deck. Shuffle this card into the deck.',
        effect: 'remove_all_from_stack_shuffle_self',
        targetCategory: 'military',
        condition: { allIdentitiesActive: true },
      },
      {
        label: 'Option 2 — Fractured Command',
        description: 'Remove the oldest resource from every category stack that has cards. Discard this card to Military Instability.',
        effect: 'remove_one_from_each_stack',
      },
    ],
    discardTo: [{ target: 'military_instability', label: 'Military Instability' }],
  },

  {
    id: 'toxic_spill',
    name: 'Toxic Spill',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 2,
    tags: ['instability', 'environment', 'technology'],
    flavorText: 'What industry discards, the land absorbs.',
    options: [
      {
        label: 'Option 1 — Containment Operation',
        description: 'Remove the oldest Technology resource from your stack → place this card at the bottom of the deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'technology',
      },
      {
        label: 'Option 2 — Environmental Damage',
        description: 'Place this card in Environment Instability.',
        effect: 'place_self_to_instability',
        targetInstability: 'environment',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'pollution',
    name: 'Pollution',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    tags: ['instability', 'environment'],
    flavorText: 'What we dump into the ground, we drink tomorrow.',
    options: [
      {
        label: 'Option 1 — Environmental Remediation',
        description: 'Requires all 6 identities to be active. Remove ALL resources from your Environment stack → deck. Shuffle this card into the deck.',
        effect: 'remove_all_from_stack_shuffle_self',
        targetCategory: 'environment',
        condition: { allIdentitiesActive: true },
      },
      {
        label: 'Option 2 — Contained Damage',
        description: 'Remove the oldest resource from every category stack that has cards. Discard this card to Environment Instability.',
        effect: 'remove_one_from_each_stack',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  {
    id: 'pollution',
    name: 'Pollution',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 3,
    tags: ['instability', 'environment'],
    flavorText: 'The cost of growth, deferred to those who cannot pay it.',
    options: [
      {
        label: 'Option 1 — Clean Up',
        description: 'Requires all 6 identities to be active. Remove ALL resources from your Environment stack → deck. Shuffle this card into the deck.',
        effect: 'remove_all_from_stack_shuffle_self',
        targetCategory: 'environment',
        condition: { allIdentitiesActive: true },
      },
      {
        label: 'Option 2 — Industrial Externality',
        description: 'Remove the oldest resource from every category stack that has cards. Discard this card to Environment Instability.',
        effect: 'remove_one_from_each_stack',
      },
    ],
    discardTo: [{ target: 'environment_instability', label: 'Environment Instability' }],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // IDENTITY COMPANIONS — one per identity card
  // Opt 1: remove newest resource + oldest instability from a fixed category
  // Opt 2: if matching identity is active, place as resource on target stack
  // ═══════════════════════════════════════════════════════════════════════════

  // — Governance identity companions —

  {
    id: 'electoral_mandate',
    name: 'Electoral Mandate',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'governance', 'exp'],
    flavorText: 'A mandate from the people carries an obligation to spend it.',
    options: [
      {
        label: 'Option 1 — Civil Drawdown',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'holy_decree',
    name: 'Holy Decree',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'governance', 'exp'],
    flavorText: 'Divine law leaves little room for negotiation.',
    options: [
      {
        label: 'Option 1 — Tithe',
        description: 'Remove the newest Economy resource from your stack and the oldest Economy instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'senate_motion',
    name: 'Senate Motion',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'governance', 'exp'],
    flavorText: 'Every vote in the legislature is one not spent on progress.',
    options: [
      {
        label: 'Option 1 — Regulatory Delay',
        description: 'Remove the newest Technology resource from your stack and the oldest Technology instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'closed_circle',
    name: 'Closed Circle',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'governance', 'exp'],
    flavorText: 'Power concentrates. Everything else gets squeezed out.',
    options: [
      {
        label: 'Option 1 — Cultural Suppression',
        description: 'Remove the newest Culture resource from your stack and the oldest Culture instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'royal_assent',
    name: 'Royal Assent',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'governance', 'exp'],
    flavorText: 'The crown endorses. The army stands down.',
    options: [
      {
        label: 'Option 1 — Demobilization',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'iron_will',
    name: 'Iron Will',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'governance', 'exp'],
    flavorText: 'Conformity is the price of order.',
    options: [
      {
        label: 'Option 1 — Cultural Crackdown',
        description: 'Remove the newest Culture resource from your stack and the oldest Culture instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'rally_the_base',
    name: 'Rally the Base',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'governance', 'exp'],
    flavorText: 'The crowd roars. The land pays.',
    options: [
      {
        label: 'Option 1 — Resource Nationalism',
        description: 'Remove the newest Environment resource from your stack and the oldest Environment instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // — Economy identity companions —

  {
    id: 'open_market',
    name: 'Open Market',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'economy', 'exp'],
    flavorText: 'What the market opens, it also extracts.',
    options: [
      {
        label: 'Option 1 — Resource Extraction',
        description: 'Remove the newest Environment resource from your stack and the oldest Environment instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'factory_output',
    name: 'Factory Output',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'economy', 'exp'],
    flavorText: 'The smoke is the price of progress.',
    options: [
      {
        label: 'Option 1 — Industrial Pollution',
        description: 'Remove the newest Environment resource from your stack and the oldest Environment instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'carbon_budget',
    name: 'Carbon Budget',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'economy', 'exp'],
    flavorText: 'Restraint costs politically. It pays planetarily.',
    options: [
      {
        label: 'Option 1 — Regulatory Overhead',
        description: 'Remove the newest Governance resource from your stack and the oldest Governance instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'harvest_season',
    name: 'Harvest Season',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'economy', 'exp'],
    flavorText: 'The plow outlasts the sword.',
    options: [
      {
        label: 'Option 1 — Peaceful Commons',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'state_directive',
    name: 'State Directive',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'economy', 'exp'],
    flavorText: 'The plan supersedes the individual.',
    options: [
      {
        label: 'Option 1 — Cultural Conformity',
        description: 'Remove the newest Culture resource from your stack and the oldest Culture instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'credit_expansion',
    name: 'Credit Expansion',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'economy', 'exp'],
    flavorText: 'Money borrowed is power deferred.',
    options: [
      {
        label: 'Option 1 — Defense Diversion',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // — Culture identity companions —

  {
    id: 'community_council',
    name: 'Community Council',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'culture', 'exp'],
    flavorText: 'Consensus takes time. Wars take soldiers.',
    options: [
      {
        label: 'Option 1 — Demilitarize',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'established_order',
    name: 'Established Order',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'culture', 'exp'],
    flavorText: 'Tradition has a price. So does breaking it.',
    options: [
      {
        label: 'Option 1 — Economic Constraint',
        description: 'Remove the newest Economy resource from your stack and the oldest Economy instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'academic_program',
    name: 'Academic Program',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'culture', 'exp'],
    flavorText: 'Knowledge is the only investment that compounds without limit.',
    options: [
      {
        label: 'Option 1 — Tuition Cost',
        description: 'Remove the newest Economy resource from your stack and the oldest Economy instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'patron_of_the_arts',
    name: 'Patron of the Arts',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'culture', 'exp'],
    flavorText: 'Genius blooms where swords are set aside.',
    options: [
      {
        label: 'Option 1 — Peace Dividend',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'living_memory',
    name: 'Living Memory',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'culture', 'exp'],
    flavorText: 'What the elders remember, no archive can hold.',
    options: [
      {
        label: 'Option 1 — Reject the Written Word',
        description: 'Remove the newest Technology resource from your stack and the oldest Technology instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'technology',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'charitable_works',
    name: 'Charitable Works',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'culture', 'exp'],
    flavorText: 'The tithe builds the church. The church builds the state.',
    options: [
      {
        label: 'Option 1 — Church Levy',
        description: 'Remove the newest Economy resource from your stack and the oldest Economy instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'commercial_charter',
    name: 'Commercial Charter',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'culture', 'exp'],
    flavorText: 'Merchants make treaties where armies make graves.',
    options: [
      {
        label: 'Option 1 — Stand Down',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'natural_philosophy',
    name: 'Natural Philosophy',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'culture', 'exp'],
    flavorText: 'Reason dismantles thrones. It also arms revolutions.',
    options: [
      {
        label: 'Option 1 — Challenge Authority',
        description: 'Remove the newest Governance resource from your stack and the oldest Governance instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // — Military identity companions —

  {
    id: 'forward_advance',
    name: 'Forward Advance',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'military', 'exp'],
    flavorText: 'The land gives way to the campaign.',
    options: [
      {
        label: 'Option 1 — Scorched Earth',
        description: 'Remove the newest Environment resource from your stack and the oldest Environment instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'treaty_obligations',
    name: 'Treaty Obligations',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'military', 'exp'],
    flavorText: 'A signed agreement costs gold. Breaking it costs more.',
    options: [
      {
        label: 'Option 1 — Protection Cost',
        description: 'Remove the newest Economy resource from your stack and the oldest Economy instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'fortification',
    name: 'Fortification',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'military', 'exp'],
    flavorText: 'Walls are expensive. Invasions are more so.',
    options: [
      {
        label: 'Option 1 — Defense Spending',
        description: 'Remove the newest Economy resource from your stack and the oldest Economy instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'tactical_redeployment',
    name: 'Tactical Redeployment',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'military', 'exp'],
    flavorText: 'A force that can pivot is a force that endures.',
    options: [
      {
        label: 'Option 1 — Civil Disruption',
        description: 'Remove the newest Culture resource from your stack and the oldest Culture instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'measured_action',
    name: 'Measured Action',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'military', 'exp'],
    flavorText: 'Restraint, practiced long enough, becomes culture.',
    options: [
      {
        label: 'Option 1 — Political Capital',
        description: 'Remove the newest Governance resource from your stack and the oldest Governance instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'total_war',
    name: 'Total War',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'military', 'exp'],
    flavorText: 'Everything bends to the war effort. Everything.',
    options: [
      {
        label: 'Option 1 — Emergency Powers',
        description: 'Remove the newest Governance resource from your stack and the oldest Governance instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // — Technology identity companions —

  {
    id: 'applied_solutions',
    name: 'Applied Solutions',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'technology', 'exp'],
    flavorText: 'Efficiency above aesthetics. Results above tradition.',
    options: [
      {
        label: 'Option 1 — Cultural Trade-off',
        description: 'Remove the newest Culture resource from your stack and the oldest Culture instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'frontier_science',
    name: 'Frontier Science',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'technology', 'exp'],
    flavorText: 'Discovery requires moving beyond what has already been mapped.',
    options: [
      {
        label: 'Option 1 — Regulatory Bypass',
        description: 'Remove the newest Governance resource from your stack and the oldest Governance instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'risk_assessment',
    name: 'Risk Assessment',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'technology', 'exp'],
    flavorText: 'Safety frameworks take time to build. Accidents happen faster.',
    options: [
      {
        label: 'Option 1 — Economic Drag',
        description: 'Remove the newest Economy resource from your stack and the oldest Economy instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'research_protocol',
    name: 'Research Protocol',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'technology', 'exp'],
    flavorText: 'The method precedes the discovery.',
    options: [
      {
        label: 'Option 1 — Grant Spending',
        description: 'Remove the newest Economy resource from your stack and the oldest Economy instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'breakthrough',
    name: 'Breakthrough',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'technology', 'exp'],
    flavorText: 'What it enables, it does not control.',
    options: [
      {
        label: 'Option 1 — Environmental Cost',
        description: 'Remove the newest Environment resource from your stack and the oldest Environment instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'environment',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'academic_consensus',
    name: 'Academic Consensus',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'technology', 'exp'],
    flavorText: 'Slow knowledge. Durable knowledge.',
    options: [
      {
        label: 'Option 1 — Military Diversion',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  // — Environment identity companions —

  {
    id: 'harsh_terrain',
    name: 'Harsh Terrain',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'environment', 'exp'],
    flavorText: 'The north does not produce wealth. It produces endurance.',
    options: [
      {
        label: 'Option 1 — Economic Hardship',
        description: 'Remove the newest Economy resource from your stack and the oldest Economy instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'highland_law',
    name: 'Highland Law',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'environment', 'exp'],
    flavorText: 'Clans write law with elevation, not ink.',
    options: [
      {
        label: 'Option 1 — Standing Down',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'river_trade',
    name: 'River Trade',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'environment', 'exp'],
    flavorText: 'The river does not take sides. Commerce does.',
    options: [
      {
        label: 'Option 1 — Demobilization',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'federal_compact',
    name: 'Federal Compact',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'environment', 'exp'],
    flavorText: 'Unity requires someone to give something up.',
    options: [
      {
        label: 'Option 1 — Cultural Compromise',
        description: 'Remove the newest Culture resource from your stack and the oldest Culture instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'maritime_routes',
    name: 'Maritime Routes',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'environment', 'exp'],
    flavorText: 'The sea routes bypass every land-bound authority.',
    options: [
      {
        label: 'Option 1 — Regulatory Bypass',
        description: 'Remove the newest Governance resource from your stack and the oldest Governance instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'grain_surplus',
    name: 'Grain Surplus',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'environment', 'exp'],
    flavorText: 'A full granary argues better than any general.',
    options: [
      {
        label: 'Option 1 — Administrative Burden',
        description: 'Remove the newest Governance resource from your stack and the oldest Governance instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'desert_adaptation',
    name: 'Desert Adaptation',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'environment', 'exp'],
    flavorText: 'Scarcity is the mother of invention.',
    options: [
      {
        label: 'Option 1 — Cultural Austerity',
        description: 'Remove the newest Culture resource from your stack and the oldest Culture instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'culture',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'delta_culture',
    name: 'Delta Culture',
    type: 'event', subtype: 'utility', category: null, value: 1,
    tags: ['policy', 'environment', 'exp'],
    flavorText: 'Where rivers meet, civilizations bloom.',
    options: [
      {
        label: 'Option 1 — Peaceful Trade',
        description: 'Remove the newest Military resource from your stack and the oldest Military instability → deck.',
        effect: 'remove_newest_resource_and_oldest_instability',
        targetCategory: 'military',
      },
      {
        label: 'Option 2 — Recirculate',
        description: 'Shuffle this card into the deck and draw a card.',
        effect: 'draw_and_shuffle_self',
        drawCount: 1,
      },
    ],
    discardTo: [{ target: 'shuffle_to_deck', label: 'Shuffle into deck' }],
  },

  {
    id: 'purge',
    name: 'Purge',
    type: 'event',
    subtype: 'stacking',
    category: 'governance',
    value: 2,
    tags: ['exchange', 'hostile', 'governance', 'economy', 'culture', 'military'],
    flavorText: 'Power secured through elimination of the disloyal.',
    options: [
      {
        label: 'Option 1 — Political Purge',
        description: 'Remove the oldest Economy resource from your stack. Place this card on your Governance stack (+2). You may instead shuffle this card into the deck.',
        effect: 'remove_stack_card_and_optionally_place_self',
        sourceCategory: 'economy',
        targetCategory: 'governance',
      },
      {
        label: 'Option 2 — Show of Strength',
        description: 'Remove the oldest Military resource from your stack. Discard 1 card from your hand. Place this card on your Culture stack (+2).',
        effect: 'remove_stack_card_then_discard_hand_then_stack',
        sourceCategory: 'military',
        targetCategory: 'culture',
      },
    ],
    discardTo: [
      { target: 'governance_instability', label: 'Governance Instability' },
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'economy_instability', label: 'Economy Instability' },
    ],
    requires: null,
  },

  {
    id: 'dissent',
    name: 'Dissent',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 1,
    tags: ['policy', 'culture', 'governance'],
    flavorText: 'The voice of the people does not silence itself.',
    options: [
      {
        label: 'Option 1 — Speak Out',
        description: 'Shuffle 2 cards from your hand into the deck and draw 2 cards. Place this card into Culture instability.',
        effect: 'shuffle_hand_draw_self_to_instability',
        count: 2,
        instabilityCategory: 'culture',
      },
      {
        label: 'Option 2 — Channel It',
        description: 'Remove the oldest Governance resource from your stack. Shuffle this card into the deck.',
        effect: 'remove_stack_card_then_shuffle_self',
        sourceCategory: 'governance',
      },
    ],
    discardTo: [
      { target: 'culture_instability', label: 'Culture Instability' },
      { target: 'military_instability', label: 'Military Instability' },
    ],
    requires: null,
  },

  {
    id: 'sabotage',
    name: 'Sabotage',
    type: 'event',
    subtype: 'hazard',
    category: null,
    value: 1,
    tags: ['instability', 'technology'],
    flavorText: 'No civilization is safe from within.',
    options: [
      {
        label: 'Option 1 — Target Technology',
        description: 'Requires all 6 identities to be active. Remove ALL resources from your Technology stack → deck. Shuffle this card into the deck.',
        effect: 'remove_all_from_stack_shuffle_self',
        targetCategory: 'technology',
        condition: { allIdentitiesActive: true },
      },
      {
        label: 'Option 2 — Broad Sabotage',
        description: 'Remove the oldest resource from every category stack that has cards. Discard this card to Technology Instability.',
        effect: 'remove_one_from_each_stack',
      },
    ],
    discardTo: [
      { target: 'technology_instability', label: 'Technology Instability' },
    ],
  },
];

// ─── Lookup map ───────────────────────────────────────────────────────────────
const CARD_MAP = {};
CARDS.forEach(c => { CARD_MAP[c.id] = c; });

// ─── Starter deck ─────────────────────────────────────────────────────────────
const STARTER_DECK = [
  // Governance (9)
  'democracy', 'democracy', 'theocracy',
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
  'alliance', 'alliance',
  'free_trade_agreement', 'free_trade_agreement',
  'efficient_administration', 'tax_collection', 'tax_collection', 'tax_collection', 'tax_collection','tax_increase', 'tax_increase', 'tax_decrease', 'tax_decrease', 'tax_increase', 'tax_increase', 'tax_decrease', 'tax_decrease',
  'cultural_festival', 'cultural_festival', 'cultural_festival', 'cultural_festival', 'military_campaign',
  'scientific_breakthrough',
  'abundant_harvest', 'abundant_harvest', 'abundant_harvest', 'abundant_harvest', 'abundant_harvest',
  'inspiring_speech', 'inspiring_speech',
  'activists', 'activists', 'unions', 'unions', 'loyalists', 'loyalists', 'loyalists', 'loyalists',
  'public_works', 'civic_charter',
  'trade_routes', 'trade_routes', 'trade_routes','market_expansion',
  'artistic_movement', 'artistic_movement', 'artistic_movement', 'folk_songs', 'folk_songs', 'folk_songs', 'folk_songs',
  'war_council', 'war_council', 'war_council','border_fortification', 'border_fortification', 'border_fortification','research_grants', 'research_grants', 'research_grants', 'research_grants', 'cartography', 'cartography', 'cartography', 'cartography',
  'river_network', 'river_network', 'river_network', 'river_network', 'river_network','land_survey', 'land_survey', 'land_survey', 'land_survey', 'land_survey','trade_delegation',
  // Resource-focused stacking
  'civic_assembly', 'civic_assembly', 'public_decree', 'public_decree',
  'surplus_goods', 'surplus_goods', 'surplus_goods', 'surplus_goods','trade_surplus', 'trade_surplus', 'trade_surplus', 'trade_surplus','oral_history', 'oral_history', 'oral_history', 'oral_history',
  'veteran_forces', 'veteran_forces', 'veteran_forces', 'veteran_forces','invention_workshop', 'invention_workshop', 'invention_workshop', 'invention_workshop', 'applied_science', 'applied_science', 'applied_science', 'applied_science',
  'frozen_tundra', 'frozen_tundra', 'frozen_tundra', 'frozen_tundra', 'frozen_tundra','dense_forests', 'dense_forests', 'mineral_deposits', 'mineral_deposits',
  'rare_plants', 'rare_plants', 'rich_soil', 'rich_soil', 'natural_springs', 'natural_springs', 'coastal_fisheries', 'coastal_fisheries',
  'dense_forests', 'dense_forests', 'dense_forests','mineral_deposits', 'mineral_deposits', 'mineral_deposits','rare_plants', 'rare_plants', 'rare_plants','rich_soil', 'rich_soil', 'rich_soil','natural_springs', 'natural_springs', 'natural_springs','coastal_fisheries', 'coastal_fisheries', 'coastal_fisheries',// Must-play events
  'indecisiveness', 'indecisiveness', 'indecisiveness', 'indecisiveness',
  // Hazard events — natural/environmental
  'worker_strike', 'worker_strike',
  'political_assassination',
  'flood', 'flood',
  'corruption', 'corruption', 'epidemic', 'drought', 'rebellion', 'coup_attempt', 'coup_attempt',
  'earthquake', 'tornado', 'harsh_winter', 'harsh_winter', 'scorched_summer', 'scorched_summer',
  'forest_fire', 'forest_fire', 'environmental_collapse',
  // Hazard events — social/political
  'political_strife', 'crime_wave', 'public_backlash', 'leaked_report',
  'recession', 'national_debt', 'market_crash', 'trade_war', 'supply_shortage', 'hyperinflation',
  'youthful_dissent', 'cultural_suppression', 'generational_divide', 'loss_of_faith', 'brain_drain',
  // Hazard events — technology/research
  'stalled_research', 'adverse_side_effects', 'remote_attack', 'failed_experiment', 'obsolescence', 'record_breach',
  'misinformation', 'misinformation', 'surveillance_state', 'cyber_warfare', 'technological_collapse',
  // Hazard events — military
  'mutiny', 'mutiny', 'desertion', 'desertion', 'border_skirmish', 'border_skirmish', 'arms_shortage',
  // Hazard events — targeted
  'social_upheaval', 'social_upheaval', 'social_upheaval', 'social_upheaval',
  'sabotage', 'sabotage',
  'insider_trading', 'state_capture', 'cultural_purge', 'treason',
  'pollution', 'toxic_spill', 'toxic_spill',
  // Crime arc
  'crime', 'crime', 'crime',
  'criminal_conspiracy', 'criminal_conspiracy',
  'organized_crime',
  // Labor & population
  'labor_shortage', 'labor_shortage',
  'population_decline',
  'immigration', 'immigration',
  // Utility events
  'martial_law', 'martial_law',
  'revisionist_history', 'revisionist_history',
  'contingency_planning',
  'occupation', 'incursion', 'sanctions', 'military_exercise', 'military_exercise', 'military_exercise','cultural_exchange',
  'peace_treaty', 'diplomatic_mission', 'census',
  'disarmament', 'disarmament',
  'destabilization', 'destabilization',
  'direct_attack', 'direct_attack', 'arms_package', 'arms_package',
  // Hostile cards — governance
  'regulatory_capture', 'emergency_powers',
  // Hostile cards — culture
  'propaganda_campaign', 'cultural_erasure',
  // Hostile cards — technology
  'cyber_attack', 'patent_warfare',
  // Hostile cards — environment
  'resource_extraction', 'industrial_pollution',
  // Global event cards (1 copy each)
  'global_recession', 'constitutional_crisis', 'mass_uprising',
  'arms_escalation', 'tech_collapse', 'climate_crisis',
  'restitution', 'restitution',
  // Economy policy cards
  'market_correction', 'market_correction',
  'deficit_spending',
  'debt_restructuring', 'debt_restructuring',
  'fiscal_consolidation',
  'economic_overhaul',
  // Culture policy cards
  'social_harmony', 'social_harmony',
  'populist_appeal',
  'cultural_reconciliation', 'cultural_reconciliation',
  'national_reckoning',
  'cultural_renaissance',
  // Military policy cards
  'ceasefire', 'ceasefire',
  'fortified_peace',
  'war_of_attrition', 'war_of_attrition',
  'force_projection',
  'total_mobilization',
  // Technology policy cards
  'patent_reform', 'patent_reform',
  'open_source_initiative',
  'rd_investment', 'rd_investment',
  'digital_transformation',
  'technological_revolution',
  // Environment policy cards
  'conservation_policy', 'conservation_policy',
  'controlled_burn',
  'ecological_restoration', 'ecological_restoration',
  'climate_accord',
  'new_deal',
  // Management philosophy (2× each — primary recovery tools)
  'consolidation', 'consolidation',
  'structural_consolidation', 'structural_consolidation',
  'managed_decline', 'managed_decline',
  'rationalization', 'rationalization',
  'austerity', 'austerity',
  'preparedness', 'preparedness',
  'crisis_protocol', 'crisis_protocol',
  'grand_strategy', 'grand_strategy',
  'redundancy_systems', 'redundancy_systems',
  'adaptive_management', 'adaptive_management',
  // Culture exchange (new)
  'heritage_fund',
  'cultural_diplomacy',
  // Environment exchange (new)
  'land_reclamation',
  'conservation_program',
  // Military exchange (new)
  'conscription', 'conscription',
  'arms_trade',
  // Technology exchange (new)
  'patent_license', 'patent_license',
  'venture_capital', 'venture_capital',
  'technology_transfer',
  'automation_drive',
];
// BALANCED BUILD — STAGE 1 — 2026-07-22
// Snapshot: 328 slots. Governance/culture/tech/env resources balanced.
// Identity companions (41), policy cards (5×5), hostile/global events included.
const LEAN_DECK = [

  // Governance (9)
  'democracy', 'theocracy',
  'republic', 'oligarchy', 'constitutional_monarchy', 'dictatorship', 'populist_governance',
  // Economy (9)
  'free_trade', 'industrial_expansion', 'green_investment',
  'agrarian_economy', 'command_economy', 'banking_system',
  // Culture (10)
  'matriarchy', 'patriarchy', 'higher_education', 'renaissance_culture',
  'oral_tradition', 'religious_order', 'merchant_class', 'enlightenment',
  // Military (8)
  'aggressive_doctrine', 'protectorate',
  'defensive_doctrine', 'adaptable_force', 'proportional_response', 'overwhelming_force',
  // Technology (8)
  'pragmatism', 'explore_the_unknown',
  'cautious_progress', 'systematic_inquiry', 'progress_at_all_costs', 'theoretical_foundations',
  // Environment (9)
  'the_great_north', 'the_highlands', 'the_waterlands', 'the_union', 'oceana',
  'the_fertile_plains', 'the_desert_wastes', 'the_river_delta',
  // Stacking events
  'alliance',
  'free_trade_agreement', 'free_trade_agreement',
  'efficient_administration', 'efficient_administration', 'efficient_administration', 'efficient_administration', 'tax_collection', 'tax_collection', 'tax_collection', 'tax_collection','tax_increase', 'tax_decrease',
  'cultural_festival', 'cultural_festival', 'cultural_festival', 'cultural_festival', 'cultural_festival', 'military_campaign',
  'scientific_breakthrough',
  'abundant_harvest', 'abundant_harvest', 'abundant_harvest', 'abundant_harvest', 'abundant_harvest',
  'inspiring_speech',
  'activists', 'activists', 'activists', 'activists', 'unions', 'unions', 'unions', 'unions', 'loyalists', 'loyalists', 'loyalists', 'loyalists',
  'public_works', 'public_works', 'public_works', 'public_works', 'civic_charter', 'civic_charter', 'civic_charter', 'civic_charter',
  'trade_routes', 'market_expansion',
  'artistic_movement', 'artistic_movement', 'artistic_movement', 'artistic_movement', 'folk_songs', 'folk_songs', 'folk_songs', 'folk_songs', 'folk_songs',
  'war_council', 'war_council', 'war_council','border_fortification', 'border_fortification', 'border_fortification', 'border_fortification','research_grants', 'research_grants', 'research_grants', 'cartography', 'cartography', 'cartography', 'cartography', 'cartography',
  'river_network', 'river_network', 'river_network', 'river_network', 'river_network','land_survey', 'land_survey', 'land_survey', 'land_survey', 'land_survey','trade_delegation',
  // Resource-focused stacking
  'civic_assembly', 'civic_assembly', 'civic_assembly', 'civic_assembly', 'public_decree', 'public_decree', 'public_decree', 'public_decree',
  'surplus_goods', 'trade_surplus', 'oral_history', 'oral_history', 'oral_history', 'oral_history', 'oral_history',
  'veteran_forces', 'veteran_forces', 'veteran_forces','invention_workshop', 'invention_workshop', 'invention_workshop', 'applied_science', 'applied_science', 'applied_science',
  'frozen_tundra', 'frozen_tundra', 'frozen_tundra', 'frozen_tundra','dense_forests', 'dense_forests', 'mineral_deposits', 'mineral_deposits',
  'rare_plants', 'rare_plants', 'rich_soil', 'rich_soil', 'natural_springs', 'natural_springs', 'coastal_fisheries', 'coastal_fisheries',
  'dense_forests', 'dense_forests', 'dense_forests','mineral_deposits', 'mineral_deposits', 'mineral_deposits','rare_plants', 'rare_plants', 'rare_plants','rich_soil', 'rich_soil', 'rich_soil','natural_springs', 'natural_springs', 'natural_springs','coastal_fisheries', 'coastal_fisheries', 'coastal_fisheries',// Must-play events
  'indecisiveness',
  // Hazard events — natural/environmental
  'worker_strike',
  'political_assassination',
  'flood',
  'corruption', 'epidemic', 'drought', 'rebellion', 'coup_attempt',
  'earthquake', 'tornado', 'harsh_winter', 'scorched_summer',
  'forest_fire', 'environmental_collapse',
  // Hazard events — social/political
  'political_strife', 'crime_wave', 'public_backlash', 'leaked_report',
  'recession', 'national_debt', 'market_crash', 'trade_war', 'supply_shortage', 'hyperinflation',
  'youthful_dissent', 'cultural_suppression', 'generational_divide', 'loss_of_faith', 'brain_drain',
  // Hazard events — technology/research
  'stalled_research', 'adverse_side_effects', 'remote_attack', 'failed_experiment', 'obsolescence', 'record_breach',
  'misinformation', 'surveillance_state', 'cyber_warfare', 'technological_collapse',
  // Hazard events — military
  'mutiny', 'desertion', 'border_skirmish', 'arms_shortage',
  // Hazard events — targeted
  'social_upheaval',
  'sabotage',
  'insider_trading', 'state_capture', 'cultural_purge', 'treason',
  'pollution', 'toxic_spill',
  // Crime arc
  'crime',
  'criminal_conspiracy',
  'organized_crime',
  // Labor & population
  'labor_shortage',
  'population_decline',
  'immigration',
  // Utility events
  'martial_law',
  'revisionist_history',
  'contingency_planning',
  'occupation', 'incursion', 'sanctions', 'sanctions', 'military_exercise', 'military_exercise', 'military_exercise','cultural_exchange',
  'peace_treaty', 'diplomatic_mission', 'census',
  'disarmament',
  'destabilization',
  'direct_attack', 'arms_package', 'arms_package',
  'dissent',
  // Hostile cards — governance
  'purge', 'regulatory_capture', 'emergency_powers',
  // Hostile cards — culture
  'propaganda_campaign', 'cultural_erasure',
  // Hostile cards — technology
  'cyber_attack', 'patent_warfare',
  // Hostile cards — environment
  'resource_extraction', 'industrial_pollution',
  // Global event cards (1 copy each)
  'global_recession', 'constitutional_crisis', 'mass_uprising',
  'arms_escalation', 'tech_collapse', 'climate_crisis',
  'restitution',
  // Economy policy cards
  'market_correction',
  'deficit_spending',
  'debt_restructuring',
  'fiscal_consolidation',
  'economic_overhaul',
  // Culture policy cards
  'social_harmony',
  'populist_appeal',
  'cultural_reconciliation',
  'national_reckoning',
  'cultural_renaissance',
  // Military policy cards
  'ceasefire',
  'fortified_peace',
  'war_of_attrition',
  'force_projection',
  'total_mobilization',
  // Technology policy cards
  'patent_reform',
  'open_source_initiative',
  'rd_investment',
  'digital_transformation',
  'technological_revolution',
  // Environment policy cards
  'conservation_policy',
  'controlled_burn',
  'ecological_restoration',
  'climate_accord',
  'new_deal',
  // Management philosophy (2× each — primary recovery tools)
  'consolidation',
  'structural_consolidation',
  'managed_decline',
  'rationalization',
  'austerity',
  'preparedness',
  'crisis_protocol',
  'grand_strategy',
  'redundancy_systems',
  'adaptive_management',
  // Culture exchange (new)
  'heritage_fund',
  'cultural_diplomacy',
  // Environment exchange (new)
  'land_reclamation',
  'conservation_program',
  // Military exchange (new)
  'conscription',
  'arms_trade',
  // Technology exchange (new)
  'patent_license',
  'venture_capital',
  'technology_transfer', 'technology_transfer', 'technology_transfer',
  'automation_drive',
  // Identity companion cards (1 per identity)
  'electoral_mandate', 'holy_decree', 'senate_motion', 'closed_circle', 'royal_assent', 'iron_will', 'rally_the_base',
  'open_market', 'factory_output', 'carbon_budget', 'harvest_season', 'state_directive', 'credit_expansion',
  'community_council', 'established_order', 'academic_program', 'patron_of_the_arts', 'living_memory', 'charitable_works', 'commercial_charter', 'natural_philosophy',
  'forward_advance', 'treaty_obligations', 'fortification', 'tactical_redeployment', 'measured_action', 'total_war',
  'applied_solutions', 'frontier_science', 'risk_assessment', 'research_protocol', 'breakthrough', 'academic_consensus',
  'harsh_terrain', 'highland_law', 'river_trade', 'federal_compact', 'maritime_routes', 'grain_surplus', 'desert_adaptation', 'delta_culture',

];

