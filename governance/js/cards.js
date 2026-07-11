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
        label: 'Option 2 — Peaceful Transition',
        description: 'Requires active Culture card to be Freedom. Replace Governance and shuffle the replaced card back into the draw deck instead.',
        effect: 'replace',
        targetCategory: 'governance',
        oldCardDest: 'shuffle_if',
        condition: { activeCard: { category: 'culture', name: 'Freedom' } },
        fallbackOldCardDest: 'discard_flow',
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
        label: 'Option 2 — Holy Mandate',
        description: 'Requires active Culture card to be Zealotry. Replace Governance and shuffle the replaced card back into the draw deck.',
        effect: 'replace',
        targetCategory: 'governance',
        oldCardDest: 'shuffle_if',
        condition: { activeCard: { category: 'culture', name: 'Zealotry' } },
        fallbackOldCardDest: 'discard_flow',
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
        description: 'Replace your current Governance. The replaced card is discarded using its own discard options. Solo: gain +1 bonus to any one category of your choice.',
        effect: 'replace_plus_solo_bonus',
        targetCategory: 'governance',
        oldCardDest: 'discard_flow',
      },
      {
        label: 'Option 2 — Mutual Defense',
        description: 'Stack Alliance as a bonus on your active Governance without replacing it (+2 to Governance). Solo: gain +2 bonus to any one category of your choice.',
        effect: 'stack_bonus',
        targetCategory: 'governance',
        soloBonus: 2,
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
        label: 'Option 2 — Democratic Renewal',
        description: 'Replace Democracy. Shuffle Democracy into the draw deck AND remove one Culture Instability card (shuffle it into the deck).',
        effect: 'replace_plus_remove_instability',
        targetCategory: 'governance',
        oldCardDest: 'shuffle',
        removeInstabilityFrom: 'culture',
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
        label: 'Option 2 — Deregulate',
        description: 'Replace your current Economy and shuffle it back into the draw deck instead. Requires: Economy Instability pile is empty.',
        effect: 'replace',
        targetCategory: 'economy',
        oldCardDest: 'shuffle_if',
        condition: { instabilityEmpty: 'economy' },
        fallbackOldCardDest: 'discard_flow',
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
        label: 'Option 2 — Consume the Land',
        description: 'Move your active Environment card to the Economy event stack as a bonus. Replace your current Economy. The replaced card is discarded using its own discard options.',
        effect: 'replace_consume_env',
        targetCategory: 'economy',
        oldCardDest: 'discard_flow',
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
        label: 'Option 2 — Green Recovery',
        description: 'Replace your current Economy and shuffle it back into the draw deck. Remove one Economy Instability card (shuffle it into the deck).',
        effect: 'replace_plus_remove_instability',
        targetCategory: 'economy',
        oldCardDest: 'shuffle',
        removeInstabilityFrom: 'economy',
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
        label: 'Option 2 — Embrace the Past',
        description: 'Replace your current Culture and shuffle it back into the draw deck instead. Requires: Military score is 12 or lower (peaceful society).',
        effect: 'replace',
        targetCategory: 'culture',
        oldCardDest: 'shuffle_if',
        condition: { categoryScoreMax: { category: 'military', max: 12 } },
        fallbackOldCardDest: 'discard_flow',
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
        label: 'Option 2 — Military Backing',
        description: 'Requires Military score ≥ 12. Replace current Culture and shuffle it back into the draw deck instead.',
        effect: 'replace',
        targetCategory: 'culture',
        oldCardDest: 'shuffle_if',
        condition: { categoryScore: { category: 'military', min: 12 } },
        fallbackOldCardDest: 'discard_flow',
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
        label: 'Option 2 — Research Surge',
        description: 'Replace your current Culture. The replaced card is discarded using its own discard options. Draw 2 cards immediately.',
        effect: 'replace_plus_draw',
        targetCategory: 'culture',
        oldCardDest: 'discard_flow',
        drawCount: 2,
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
        label: 'Option 2 — Renaissance',
        description: 'Replace your current Culture, shuffling it back into the draw deck. Remove one Culture Instability card (shuffle it into the deck).',
        effect: 'replace_plus_remove_instability',
        targetCategory: 'culture',
        oldCardDest: 'shuffle',
        removeInstabilityFrom: 'culture',
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
        label: 'Option 2 — Reinforce',
        description: 'Stack this card on your active Military as a bonus (+1) without replacing it. Useful when your active Military card is already strong.',
        effect: 'stack_bonus',
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
        label: 'Option 2 — Martial Code',
        description: 'Requires Governance ≥ 12. Replace current Military and shuffle it back into the draw deck instead.',
        effect: 'replace',
        targetCategory: 'military',
        oldCardDest: 'shuffle_if',
        condition: { categoryScore: { category: 'governance', min: 12 } },
        fallbackOldCardDest: 'discard_flow',
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
        label: 'Option 2 — Versatile Application',
        description: 'Stack this card as a +1 bonus on any one of your category stacks instead of replacing Technology. Choose which category when confirming.',
        effect: 'stack_bonus_any',
        targetCategory: null,
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
        label: 'Option 2 — Academic Partnership',
        description: 'Requires Culture ≥ 12. Replace current Technology and shuffle it back into the draw deck instead.',
        effect: 'replace',
        targetCategory: 'technology',
        oldCardDest: 'shuffle_if',
        condition: { categoryScore: { category: 'culture', min: 12 } },
        fallbackOldCardDest: 'discard_flow',
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
        label: 'Option 2 — Military Expansion',
        description: 'Requires Military ≥ 12. Claim the territory and shuffle the replaced Environment into the deck instead. The military secures the difficult terrain.',
        effect: 'replace',
        targetCategory: 'environment',
        oldCardDest: 'shuffle_if',
        condition: { categoryScore: { category: 'military', min: 12 } },
        fallbackOldCardDest: 'discard_flow',
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
        label: 'Option 2 — Fortify',
        description: 'Claim The Highlands and add a Military bonus (+1) to your Military stack (the terrain provides natural defense). The replaced Environment is discarded using its own discard options.',
        effect: 'replace_plus_stack_bonus',
        targetCategory: 'environment',
        oldCardDest: 'discard_flow',
        bonusCategory: 'military',
        bonusValue: 1,
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
        label: 'Option 2 — Trade Routes',
        description: 'Requires Economy ≥ 12. Claim the territory and shuffle the replaced Environment into the draw deck. The waterways open trade.',
        effect: 'replace',
        targetCategory: 'environment',
        oldCardDest: 'shuffle_if',
        condition: { categoryScore: { category: 'economy', min: 12 } },
        fallbackOldCardDest: 'discard_flow',
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
        label: 'Option 2 — Federal Trade',
        description: 'Claim The Union and remove one Economy Instability card (shuffle it into the deck). The Union enables trade across the heartland.',
        effect: 'replace_plus_remove_instability',
        targetCategory: 'environment',
        oldCardDest: 'discard_flow',
        removeInstabilityFrom: 'economy',
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
        label: 'Option 2 — Maritime Trade',
        description: 'Claim Oceana and add a +1 bonus to your Economy stack (maritime trade routes open). The replaced Environment is discarded using its own discard options.',
        effect: 'replace_plus_stack_bonus',
        targetCategory: 'environment',
        oldCardDest: 'discard_flow',
        bonusCategory: 'economy',
        bonusValue: 1,
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
        description: 'Stack on any one category of your choice as a +1 bonus instead.',
        effect: 'stack_on_any_modal',
        bonusValue: 1,
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
        description: 'Stack on any one category of your choice as a +1 bonus instead. The breakthrough spreads beyond its original field.',
        effect: 'stack_on_any_modal',
        bonusValue: 1,
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
  // UTILITY EVENT CARDS — special effects, recovery, and disruption
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'revisionist_history',
    name: 'Revisionist History',
    type: 'event',
    subtype: 'utility',
    category: null,
    value: 0,
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
    value: 0,
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
    value: 0,
    flavorText: 'Territory taken, resources claimed.',
    options: [
      {
        label: 'Option 1 — Seize Resources',
        description: 'Solo: Draw the top card of the deck and add it as a bonus to your Economy stack.',
        effect: 'solo_draw_to_stack',
        targetCategory: 'economy',
      },
      {
        label: 'Option 2 — Claim Territory',
        description: 'Solo: Draw the top card of the deck and add it as a bonus to your Environment stack.',
        effect: 'solo_draw_to_stack',
        targetCategory: 'environment',
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
    value: 0,
    flavorText: 'A border crossed in the night.',
    options: [
      {
        label: 'Option 1 — Technological Disruption',
        description: 'Solo: External pressure adds −1 to Technology Instability.',
        effect: 'add_instability_pressure',
        targetInstability: 'technology',
        pressureValue: 1,
      },
      {
        label: 'Option 2 — Economic Disruption',
        description: 'Solo: External pressure adds −1 to Economy Instability.',
        effect: 'add_instability_pressure',
        targetInstability: 'economy',
        pressureValue: 1,
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
    value: 0,
    flavorText: 'Ideas cross borders more freely than armies.',
    options: [
      {
        label: 'Option 1 — Exchange',
        description: 'Solo: If Matriarchy is your active Culture, remove one Culture Instability card (shuffle into deck).',
        effect: 'remove_instability_if',
        condition: { activeCard: { category: 'culture', name: 'Matriarchy' } },
        instabilityCategory: 'culture',
      },
      {
        label: 'Option 2 — Mobilize',
        description: 'Stack this card on your Military as a bonus (the cultural exchange strengthens diplomatic channels, which backs your military posture).',
        effect: 'stack_on_category',
        targetCategory: 'military',
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
  // Hazard events (6)
  'worker_strike', 'worker_strike',
  'political_assassination',
  'flood', 'flood',
  // Utility events (5)
  'revisionist_history', 'revisionist_history',
  'contingency_planning',
  'occupation', 'incursion', 'cultural_exchange',
];
