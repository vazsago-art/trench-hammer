import { WargearOption } from '../types/index.js';

export const armourOptions: WargearOption[] = [
  {
    id: 'standard_armour',
    name: 'Standard Armour',
    type: 'armor',
    slot: 'body-armour',
    cost: 15,
    keywords: ['-1 INJURY MODIFIER'],
    description: '-1 INJURY MODIFIER. Reduces injury roll results against this model by 1.',
    statModifiers: { armourSave: -1 },
  },
  {
    id: 'heavy_armour',
    name: 'Heavy Armour',
    type: 'armor',
    slot: 'body-armour',
    cost: 35,
    keywords: ['-2 INJURY MODIFIER', 'HEAVY'],
    description: '-2 INJURY MODIFIER, HEAVY. Due to its bulk, even a STRONG wearer rolls only a D3 for extra charge distance instead of a D6.',
    statModifiers: { armourSave: -2 },
  },
  {
    id: 'power_armour',
    name: 'Power Armour',
    type: 'armor',
    slot: 'body-armour',
    cost: 40,
    keywords: ['-2 INJURY MODIFIER'],
    description: '-2 INJURY MODIFIER. Advanced powered exoskeleton that reduces injury roll results against this model by 2.',
    statModifiers: { armourSave: -2 },
  },
  {
    id: 'terminator_armour',
    name: 'Terminator Armour',
    type: 'armor',
    slot: 'body-armour',
    cost: 65,
    keywords: ['-3 INJURY MODIFIER', 'DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
    description: '-3 INJURY MODIFIER. Model gains the DEEP STRIKE, STRONG, and VEHICLE Keywords, as well as LARGE if not already LARGE. Due to its bulk, the wearer rolls only a D3 for extra charge distance instead of a D6. Terminator Armour cannot be combined with a Shield, nor used with a Jump Pack.',
    conflictsWith: ['shield', 'heavy_shield', 'jump_pack', 'astartes_bike'],
    grantsKeywords: ['DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
    statModifiers: { armourSave: -3 },
  },
  {
    id: 'shield',
    name: 'Shield',
    type: 'armor',
    slot: 'shield',
    cost: 10,
    keywords: ['-1 INJURY MODIFIER', 'HELD'],
    description: '-1 INJURY MODIFIER, HELD. A hand-held shield carried in one hand.',
    conflictsWith: ['heavy_shield', 'terminator_armour'],
    statModifiers: { armourSave: -1 },
  },
  {
    id: 'heavy_shield',
    name: 'Heavy Shield',
    type: 'armor',
    slot: 'shield',
    cost: 15,
    keywords: ['HELD', 'HEAVY', 'COVER'],
    description: 'HELD, HEAVY, COVER. A large protective shield that grants the model COVER. Counts as a Shield for the purposes of the Shield Combo property.',
    conflictsWith: ['shield', 'terminator_armour'],
  },
];

export const equipmentOptions: WargearOption[] = [
  {
    id: 'augury_scanner',
    name: 'Augury Scanner',
    type: 'equipment',
    slot: 'equipment',
    cost: 10,
    keywords: [],
    description: 'Enemy models must be set up at least 16" away from this model when using the DEEP STRIKE or INFILTRATOR Keywords.',
  },
  {
    id: 'camo_cloak',
    name: 'Camo Cloak',
    type: 'equipment',
    slot: 'equipment',
    cost: 10,
    keywords: ['STEALTH'],
    description: 'A model equipped with a Camo Cloak gains the STEALTH Keyword. Long Range attacks against this model suffer an additional -1 DICE to Hit. Attacks that ignore Long Range penalties also ignore STEALTH.',
    grantsKeywords: ['STEALTH'],
  },
  {
    id: 'chaos_icon',
    name: 'Chaos Icon',
    type: 'equipment',
    slot: 'equipment',
    cost: 15,
    keywords: ['FEAR'],
    description: 'The equipped model gains the FEAR Keyword, causing terror in nearby enemies.',
    grantsKeywords: ['FEAR'],
  },
    {
    id: 'chaos_sigil',
    name: 'Chaos Sigil',
    type: 'equipment',
    slot: 'equipment',
    cost: 15,
    keywords: ['FEAR'],
    description: 'The equipped model gains the FEAR Keyword, causing terror in nearby enemies.',
    grantsKeywords: ['FEAR'],
  },
  {
    id: 'combat_helmet',
    name: 'Combat Helmet',
    type: 'equipment',
    slot: 'headgear',
    cost: 5,
    keywords: ['NEGATE SHRAPNEL', 'Headgear'],
    description: 'The model has NEGATE SHRAPNEL, ignoring the SHRAPNEL keyword on attacks against it. Counts as Headgear.',
  },
  {
    id: 'filter_plugs',
    name: 'Filter Plugs',
    type: 'equipment',
    slot: 'equipment',
    cost: 5,
    keywords: ['NEGATE GAS'],
    description: 'The model has NEGATE GAS, ignoring the GAS keyword on attacks against it.',
  },
  {
    id: 'grapnel_launcher',
    name: 'Grapnel Launcher',
    type: 'equipment',
    slot: 'equipment',
    cost: 3,
    keywords: [],
    description: 'A model with this launcher adds +1 DICE to any Climb Success Rolls.',
  },
  {
    id: 'grav_chute',
    name: 'Grav Chute',
    type: 'equipment',
    slot: 'equipment',
    cost: 7,
    limit: 2,
    keywords: [],
    description: 'The equipped model does not suffer Injury rolls due to falling. It also has +1 DICE to Diving Charge Success Rolls and does not fall Down or suffer an Injury roll due to failing a Diving Charge.',
  },
  {
    id: 'holy_relic',
    name: 'Holy Relic',
    type: 'equipment',
    slot: 'equipment',
    cost: 2,
    costCurrency: 'glory',
    keywords: ['+1 BLESSING MARKER'],
    description: 'This model starts each game with +1 BLESSING MARKER.',
  },
  {
    id: 'iron_halo',
    name: 'Iron Halo',
    type: 'equipment',
    slot: 'headgear',
    cost: 4,
    costCurrency: 'glory',
    keywords: ['-1 INJURY DICE', 'Headgear'],
    description: 'Injury rolls made against this model have -1 INJURY DICE. Counts as Headgear.',
  },
  {
    id: 'jump_pack',
    name: 'Jump Pack',
    type: 'equipment',
    slot: 'equipment',
    cost: 20,
    keywords: ['FLYING', '+2" MOVEMENT'],
    description: 'The model gains FLYING and +2" movement speed, but cannot carry any HEAVY equipment or become mounted on any equipment.',
    conflictsWith: ['terminator_armour'],
    grantsKeywords: ['FLYING'],
    statModifiers: { movement: 2 },
  },
  {
    id: 'medicae_kit',
    name: 'Medicae Kit',
    type: 'equipment',
    slot: 'equipment',
    cost: 5,
    keywords: [],
    description: 'Models with a Medicae Kit can take a Risky Success Roll and choose themself or one ally within 1". On a success, remove one BLOOD MARKER from the target, or if it is Down, you can instead allow it to stand up.',
  },
  {
    id: 'musical_instrument',
    name: 'Musical Instrument',
    type: 'equipment',
    slot: 'equipment',
    cost: 15,
    limit: 1,
    keywords: ['HELD'],
    description: 'HELD. Any friendly models within 4" of the musician who is not Down can add +1 DICE to their Dash Success Rolls. LIMIT: 1.',
  },
  {
    id: 'photo_goggles',
    name: 'Photo-Goggles',
    type: 'equipment',
    slot: 'headgear',
    cost: 3,
    keywords: ['Headgear'],
    description: 'The equipped model ignores the STEALTH Keyword when making ranged attacks. In addition, the range of its weapons cannot be reduced. Counts as Headgear.',
  },
  {
    id: 'psychic_hood',
    name: 'Psychic Hood',
    type: 'equipment',
    slot: 'headgear',
    cost: 7,
    keywords: ['Headgear'],
    description: 'Injury rolls with the PSYCHIC Keyword have -1 INJURY DICE against the wearer, and it has +1 DICE when Denying the Witch. Counts as Headgear.',
  },
  {
    id: 'purity_seal',
    name: 'Purity Seal',
    type: 'equipment',
    slot: 'equipment',
    cost: 15,
    limit: 1,
    keywords: [],
    description: 'When a model equipped with a Purity Seal fails a Risky Success Roll, that model may use this item. If it does, its Activation is not ended. Can be used once per battle. LIMIT: 1.',
  },
  {
    id: 'rosarius',
    name: 'Rosarius',
    type: 'equipment',
    slot: 'equipment',
    cost: 15,
    keywords: [],
    description: 'The wearer treats Down results as Minor Hits (does not affect Down results that replace Out of Action via TOUGH Keyword).',
  },
  {
    id: 'scope',
    name: 'Scope',
    type: 'equipment',
    slot: 'equipment',
    cost: 2,
    costCurrency: 'glory',
    limit: 1,
    keywords: [],
    description: 'Negates the penalty for Long Range if the model has not moved during this Activation. Only usable with weapons that have the Scope property. LIMIT: 1.',
  },
  {
    id: 'shovel',
    name: 'Shovel',
    type: 'equipment',
    slot: 'equipment',
    cost: 5,
    keywords: [],
    description: 'A model deployed on Open terrain has the COVER Keyword until it moves away from its starting position. In addition, the model can use a Shovel as a 2-Handed Melee Weapon instead of using any other Melee Weapons it has.',
  },
  {
    id: 'vox_unit',
    name: 'Vox Unit',
    type: 'equipment',
    slot: 'equipment',
    cost: 15,
    limit: 1,
    keywords: ['HELD'],
    description: 'HELD. While bearer is not Down, friendly models within 4" add +1 DICE to their Dash Success Rolls. LIMIT: 1.',
  },
  {
    id: 'troop_flag',
    name: 'Troop Flag',
    type: 'equipment',
    slot: 'equipment',
    cost: 15,
    limit: 1,
    keywords: ['HELD', 'ICON'],
    description: 'HELD. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1.',
    grantsKeywords: ['ICON'],
  },
];

export const allEquipment = [...armourOptions, ...equipmentOptions];

// ---------------------------------------------------------------------------
// Heretic Astartes – Marks of Chaos (max 1 per model, 'mark' slot)
// ---------------------------------------------------------------------------
export const marksOfChaos: WargearOption[] = [
  {
    id: 'mark_of_darkness',
    name: 'Mark of Darkness',
    type: 'equipment',
    slot: 'mark',
    cost: 10,
    limit: 1,
    keywords: ['MARK OF CHAOS'],
    description: 'Ranged attacks have -1 DICE to Hit this model. Max 1 Mark per model.',
  },
  {
    id: 'mark_of_khorne',
    name: 'Mark of Khorne',
    type: 'equipment',
    slot: 'mark',
    cost: 15,
    limit: 2,
    keywords: ['MARK OF CHAOS', 'KHORNE', '+1 INJURY MODIFIER (melee)'],
    description: 'Melee attacks have +1 INJURY MODIFIER. Grants KHORNE keyword. LIMIT: 2 per Warband. Max 1 Mark per model.',
    grantsKeywords: ['KHORNE'],
    restrictedTo: ['NOT:PSYKER'],
  },
  {
    id: 'mark_of_nurgle',
    name: 'Mark of Nurgle',
    type: 'equipment',
    slot: 'mark',
    cost: 15,
    limit: 2,
    keywords: ['MARK OF CHAOS', 'NURGLE', '-1 INJURY DICE (against model)'],
    description: 'Injury rolls against model have -1 DICE (Bloodbath ignores). Grants NURGLE keyword. Model moves only half as far when Dashing. LIMIT: 2 per Warband. Max 1 Mark per model.',
    grantsKeywords: ['NURGLE'],
  },
  {
    id: 'mark_of_slaanesh',
    name: 'Mark of Slaanesh',
    type: 'equipment',
    slot: 'mark',
    cost: 15,
    limit: 2,
    keywords: ['MARK OF CHAOS', 'SLAANESH', '+2" movement', '+1 DICE Dash'],
    description: '+2" movement speed and +1 DICE to all Dash Success Rolls. Grants SLAANESH keyword. LIMIT: 2 per Warband. Max 1 Mark per model.',
    grantsKeywords: ['SLAANESH'],
    statModifiers: { movement: 2 },
  },
  {
    id: 'mark_of_tzeentch',
    name: 'Mark of Tzeentch',
    type: 'equipment',
    slot: 'mark',
    cost: 15,
    limit: 2,
    keywords: ['MARK OF CHAOS', 'TZEENTCH', '+1 INJURY MODIFIER (ranged)'],
    description: 'Ranged attacks have +1 INJURY MODIFIER. Grants TZEENTCH keyword. LIMIT: 2 per Warband. Max 1 Mark per model.',
    grantsKeywords: ['TZEENTCH'],
  },
];

// ---------------------------------------------------------------------------
// Heretic Astartes – Icons of Chaos (HELD, faction-specific effects)
// ---------------------------------------------------------------------------
export const chaosIcons: WargearOption[] = [
  {
    id: 'icon_of_despair',
    name: 'Icon of Despair',
    type: 'equipment',
    slot: 'equipment',
    cost: 10,
    limit: 1,
    keywords: ['HELD', 'ICON', 'NURGLE'],
    description: 'HELD, ICON. While bearer is not Down, enemy models that are not immune to FEAR have -1 DICE to all their actions against bearer and NURGLE allies within 4". Mark of Nurgle Only. LIMIT: 1.',
    grantsKeywords: ['ICON'],
  },
  {
    id: 'icon_of_excess',
    name: 'Icon of Excess',
    type: 'equipment',
    slot: 'equipment',
    cost: 10,
    limit: 1,
    keywords: ['HELD', 'ICON', 'SLAANESH'],
    description: 'HELD, ICON. While bearer is not Down, bearer and SLAANESH allies within 4" cannot fall off elevated terrain and ignore Difficult and Dangerous Terrain. Mark of Slaanesh Only. LIMIT: 1.',
    grantsKeywords: ['ICON'],
  },
  {
    id: 'icon_of_flame',
    name: 'Icon of Flame',
    type: 'equipment',
    slot: 'equipment',
    cost: 10,
    limit: 1,
    keywords: ['HELD', 'ICON', 'TZEENTCH', 'IGNORE COVER (ranged)'],
    description: 'HELD, ICON. While bearer is not Down, bearer and TZEENTCH allies within 4" ignore Cover with all ranged attacks. Mark of Tzeentch Only. LIMIT: 1.',
    grantsKeywords: ['ICON'],
  },
  {
    id: 'icon_of_wrath',
    name: 'Icon of Wrath',
    type: 'equipment',
    slot: 'equipment',
    cost: 10,
    limit: 1,
    keywords: ['HELD', 'ICON', 'KHORNE'],
    description: 'HELD, ICON. While bearer is not Down, bearer and KHORNE allies within 4" may move up to 3" before declaring a Charge. Mark of Khorne Only. LIMIT: 1.',
    grantsKeywords: ['ICON'],
  },
];

// ---------------------------------------------------------------------------
// Heretic Astartes – Astartes Bike & Vengeance Ammunition
// ---------------------------------------------------------------------------
export const haSpecialEquipment: WargearOption[] = [
  {
    id: 'astartes_bike',
    name: 'Astartes Bike',
    type: 'equipment',
    slot: 'equipment',
    cost: 50,
    limit: 3,
    keywords: ['LARGE', 'VEHICLE', '10" movement', 'TURBO-BOOST'],
    description: 'Model becomes LARGE VEHICLE with 10" movement. Gains Twin Boltgun (can fire alongside other ranged weapons) and Turbo-Boost (+1 DICE to Dash, cannot climb sheer surfaces). One hand free for other weapons. Cannot combine with Terminator Armour. Max 1 Elite on bike. LIMIT: 3.',
    conflictsWith: ['terminator_armour'],
    grantsKeywords: ['LARGE', 'VEHICLE', 'TURBO-BOOST'],
    movementOverride: 10,
    grantsBonusWeapon: 'twin_boltgun',
    occupiesHands: 1,
    allowsShieldComboTwoHanded: true,
    grantsAbilities: [
      {
        name: 'Turbo-Boost',
        description: 'The rider has +1 DICE to all Dash Success Rolls, but it cannot climb sheer surfaces.',
      },
    ],
  },
  {
    id: 'vengeance_ammunition',
    name: 'Vengeance Ammunition',
    type: 'equipment',
    slot: 'equipment',
    cost: 10,
    limit: 2,
    keywords: ['CONSUMABLE'],
    description: 'AMMUNITION (ARMOUR PIERCING 1). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). CONSUMABLE. LIMIT: 2.',
  },
];

export const allHAEquipment = [...marksOfChaos, ...chaosIcons, ...haSpecialEquipment];

// ---------------------------------------------------------------------------
// Heretic Astartes Variants – sub-faction equipment
// ---------------------------------------------------------------------------
export const haVariantEquipment: WargearOption[] = [
  // All HA variants share a Combat Helmet and Vox Unit
  { id: 'combat_helmet_ha', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'vox_unit_ha', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. While bearer is not Down, friendly models within 4" add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  { id: 'icon_of_vengeance_ha', name: 'Icon of Vengeance', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'ICON', 'NEGATE FEAR'], description: 'HELD, ICON. NEGATE FEAR for bearer and allied models within 8". Mark of Darkness Only. LIMIT: 1.', grantsKeywords: ['ICON'] },
  // Death Guard
  { id: 'poison_vents_dg', name: 'Poison Vents', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['NURGLE'], description: 'When an enemy begins its Activation within 1" of this model and has any INFECTION MARKERS, it gains an additional INFECTION MARKER. Non-Cultist Elite Only.' },
  { id: 'mischievous_nurgling_dg', name: 'Mischievous Nurgling', type: 'equipment', slot: 'equipment', cost: 3, limit: 3, keywords: ['NURGLE'], description: 'Once per battle: an enemy in close combat with this model makes a melee attack at -1 DICE to Hit.' },
  // Emperor's Children
  { id: 'sonic_shriekers_ec', name: 'Sonic Shriekers', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['FEAR', 'SLAANESH'], description: 'Model gains the FEAR Keyword. Elite, Chaos Space Marine, or Chaos Terminator Only.' },
  // Night Lords
  { id: 'chain_snare_nl', name: 'Chain Snare', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'When an enemy in close combat Retreats, +1 DICE to Hit and +1 INJURY DICE for this model\'s free attack.' },
  { id: 'comms_jammer_nl', name: 'Comms Jammer', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Enemy models within 3" of this model cannot be targeted by abilities from friendly models outside 3".' },
  { id: 'grisly_trophy_nl', name: 'Grisly Trophy', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['FEAR'], description: 'Model gains FEAR. If already has FEAR, that Keyword cannot be ignored by enemies.' },
  { id: 'ventrilokar_vox_nl', name: 'Ventrilokar Vox', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'As an Action with a Risky Success Roll: trick one visible enemy within 6" into moving D3" in any direction (including falling, provoking free attacks, etc.).' },
  { id: 'terrorchem_vials_nl', name: 'Terrorchem Vials', type: 'equipment', slot: 'equipment', cost: 20, limit: 1, keywords: ['6"', '-1 INJURY DICE', 'IGNORE ARMOUR', 'GAS', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'], description: '6", -1 INJURY DICE, IGNORE ARMOUR, GAS, IGNORE COVER, IGNORE LONG RANGE, THROWN. Target hit moves D3" in your choice of direction.' },
  // Alpha Legion
  { id: 'shroud_bombs_al', name: 'Shroud Bombs', type: 'equipment', slot: 'equipment', cost: 5, limit: 4, keywords: ['STEALTH', 'THROWN'], description: 'THROWN. The equipped model has the STEALTH Keyword. Can be used as a grenade. LIMIT: 4. (Alpha Legion Only)', grantsKeywords: ['STEALTH'] },
  // Iron Warriors – Cyberteknika
  { id: 'cyberteknika_cranial_iw', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_iw', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_iw', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_iw', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_torsonic_iw', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Injuries against this model are rolled with -1 DICE. Ignores Trauma penalties (prevents gaining): Chest Wound. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_vascular_iw', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to all Dash Success Rolls. Ignores Trauma penalties (prevents gaining): Severe Nerve Damage, Shell-Shocked. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  // ===================== Heretic Astartes Base Campaign Shop Equipment =====================
  { id: 'black_rune_of_damnation_ha', name: 'Black Rune of Damnation', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['-1 INJURY MODIFIER'], description: 'Bearer and friendly Cultists within 6" have -1 INJURY MODIFIER (stacking with armour up to a maximum of -3). When a model uses a psychic power within 12" of this model, it has PERILOUS ±2 and rolls twice on the Perils of the Warp table (owner chooses result). 3 Glory. LIMIT: 1. Cultist Only.' },
  { id: 'book_of_the_reviler_ha', name: 'Book of the Reviler', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['HELD'], description: 'HELD. If carried by a Dark Apostle: +1 DICE to Hit and +1 INJURY DICE with all melee attacks. If carried by another model: that model gains the Malign Sacrifice ability. 3 Glory. LIMIT: 1. Word Bearers Only, Dark Apostle or Cultist Only.' },
  { id: 'eye_of_tzeentch_ha', name: 'Eye of Tzeentch', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: '+1 DICE to all PSYCHIC Success Rolls, including attacks. 5 Glory. LIMIT: 1. Psyker with Mark of Tzeentch Only.' },
  { id: 'gorget_of_eternal_hate_ha', name: 'Gorget of Eternal Hate', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'When the bearer is taken Out of Action, one enemy model within 6" suffers D3 BLOOD MARKERS. 2 Glory. LIMIT: 1.' },
  { id: 'inferno_tome_ha', name: 'Inferno Tome', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'TWO-HANDED'], description: 'HELD, TWO-HANDED. Bearer gains FIRETEAM Keyword and forms a Fireteam with a Dark Apostle. While not Down within 6" of that Dark Apostle, it grants Litany of Despair: enemies within 8" have -1 DICE to all Success Rolls. 3 Glory. LIMIT: 1. Cultist Only.' },
  { id: 'intoxicating_elixir_ha', name: 'Intoxicating Elixir', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['CONSUMABLE'], description: 'Once per battle, as an Action with no roll, the bearer can drink it. Until end of Turn: can make an additional melee attack with one weapon when taking a Fight Action, and injury rolls have -1 DICE against it. CONSUMABLE. 3 Glory. LIMIT: 1. Mark of Slaanesh Only.' },
  { id: 'liber_hereticus_ha', name: 'Liber Hereticus', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: ['HELD'], description: 'HELD. The first psychic power used during each of the bearer\'s Activations does not count towards the Using Multiple Powers rules. 5 Glory. LIMIT: 1. Psyker Only.' },
  { id: 'mantle_of_traitors_ha', name: 'Mantle of Traitors', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: '+1 DICE to Hit with melee attacks. Once per Turn, the bearer can ignore range and line of sight when targeting one other friendly model with an Ability or Action. 4 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'orb_of_curze_ha', name: 'Orb of Curze', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'After the bearer activates, you choose the enemy model that activates next, obeying all normal activation rules. 3 Glory. LIMIT: 1. Night Lords Only, Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'soulsnare_sigil_ha', name: 'Soulsnare Sigil', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'When the bearer takes an enemy model Out of Action with a melee attack, remove 1 BLOOD MARKER from the bearer. 3 Glory. LIMIT: 1. Emperor\'s Children Only.' },
  { id: 'talisman_of_burning_blood_ha', name: 'Talisman of Burning Blood', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once during each Turn, if the bearer Downs or takes an enemy Out of Action in melee, it can move up to its speed and enter melee as if it Charged, then make a single extra melee attack. 4 Glory. LIMIT: 1. Mark of Khorne Only.' },
  { id: 'warpbreacher_ha', name: 'Warpbreacher', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'As an Action with a Success Roll, infuse a friendly ARTIFICIAL, MECHANICUS, or VEHICLE model within 1" with a daemon. On success, that model has +1 INJURY MODIFIER with all weapons until end of its next Activation. 3 Glory. LIMIT: 1. Iron Warriors Only, Chaos Lord or Warpsmith Only.' },
  // ===================== Death Guard Campaign Shop Equipment =====================
  { id: 'billowing_censer_dg', name: 'Billowing Censer', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'When the bearer or a friendly HERETIC ASTARTES+NURGLE model within 6" is taken Out of Action, one enemy within 3" of it suffers 1 BLOOD MARKER. 3 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'orb_of_decay_dg', name: 'Orb of Decay', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once per battle, as an Action with no roll, each non-NURGLE model within 6" must roll on the Injury table. This effect has the GAS Keyword; against targets not in cover it has IGNORE ARMOUR. 5 Glory. LIMIT: 1.' },
  { id: 'putrid_periapt_dg', name: 'Putrid Periapt', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Choose a power from the Contagion Discipline costing 7 credits or less when purchased; the bearer can use that power as if it already knew it. When the bearer takes an enemy Out of Action with a psychic power, remove 1 BLOOD MARKER from the bearer. 3 Glory. LIMIT: 1. Psyker Only.' },
  { id: 'revolting_stench_vats_dg', name: 'Revolting Stench-Vats', type: 'equipment', slot: 'equipment', cost: 7, costCurrency: 'glory', limit: 1, keywords: [], description: 'Enemy models within 6" cannot benefit from +DICE to Success Rolls beyond their Ranged/Melee Skill, nor can Injuries they cause benefit from +DICE beyond what is provided by their weapon. 7 Glory. LIMIT: 1.' },
  { id: 'suppurating_plate_dg', name: 'Suppurating Plate', type: 'equipment', slot: 'body-armour', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['-1 INJURY MODIFIER'], description: 'Additional -1 to Injury rolls (does not stack with shields). Whenever an enemy hits the wearer with a melee attack, that enemy suffers 1 BLOOD MARKER (NEGATE GAS models unaffected). 4 Glory. LIMIT: 1. Elite Wearing Power Armour Only.', restrictedTo: ['ELITE'] },
  { id: 'warp_charm_of_nurgle_dg', name: 'Warp Charm of Nurgle', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: "The bearer's Contagion Ability radius is increased by 3\". 4 Glory. LIMIT: 1. Elite Only.", restrictedTo: ['ELITE'] },
  // ===================== World Eaters Campaign Shop Equipment =====================
  { id: 'blood_soaked_mantle_we', name: 'Blood-Soaked Mantle', type: 'equipment', slot: 'equipment', cost: 8, costCurrency: 'glory', limit: 1, keywords: [], description: 'When the bearer takes an enemy model Out of Action in melee, it gains a stacking +1 DICE to Injury rolls for all further melee attacks for the remainder of the battle. 8 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'brazen_rune_we', name: 'Brazen Rune', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls that have the PSYCHIC or IGNORE ARMOUR Keyword are made with -1 INJURY DICE against the bearer. 2 Glory. LIMIT: 1.' },
  { id: 'helm_of_brazen_ire_we', name: 'Helm of Brazen Ire', type: 'equipment', slot: 'headgear', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls made against the wearer are made with -1 DICE. 5 Glory. LIMIT: 1. Headgear.' },
  { id: 'mighty_skullrack_we', name: 'Mighty Skullrack', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'Friendly Non-Elite models within 6" of the bearer score a Critical Hit on 11+ with melee attacks. The first time the bearer takes an enemy Out of Action in melee, the effect range increases by 9" until end of battle. 4 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'infernal_infusion_we', name: 'Infernal Infusion', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once during each battle, you can add 3" to the equipped model\'s movement speed for the duration of its Activation. 2 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'talisman_of_rage_we', name: 'Talisman of Rage', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The bearer receives +1 INJURY DICE when scoring a Critical Hit in melee, stacking with the normal Critical Hit benefit and the CRITICAL Keyword. 2 Glory. LIMIT: 1.' },
  { id: 'witchskull_totem_we', name: 'Witchskull Totem', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'PSYCHIC Success Rolls, including attacks, taken within 12" of the bearer have -1 DICE. 2 Glory. LIMIT: 1.' },
];

// ---------------------------------------------------------------------------
// Thousand Sons – faction-specific equipment
// ---------------------------------------------------------------------------
export const thousandSonsEquipment: WargearOption[] = [
  // Thousand Sons 
  { id: 'disc_of_tzeentch_ts', name: 'Disc of Tzeentch', type: 'equipment', slot: 'equipment', cost: 30, keywords: ['TZEENTCH', '8" FLYING'], description: 'Rider gains 8" FLYING movement. Elite Only.', restrictedTo: ['ELITE'], movementOverride: 8, grantsKeywords: ['FLYING'] },
  { id: 'icon_of_flame_ts', name: 'Icon of Flame', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['HELD', 'ICON'], description: 'While the bearer is not Down, it and each of its TZEENTCH allies within 4” of it gain IGNORE COVER with all ranged attacks.', grantsKeywords: ['ICON'] },
  { id: 'sigil_of_flame_ts', name: 'Sigil of Flame', type: 'equipment', slot: 'equipment', cost: 7, limit: 1, keywords: ['TZEENTCH', 'IGNORE COVER (ranged)'], description: 'The equipped model’s ranged attacks have IGORE COVER.'},
  { id: 'brayhorn_ts', name: 'Brayhorn', type: 'equipment', slot: 'equipment', cost: 7, limit: 1, keywords: ['HELD'], description: 'Unless this model is Down, friendly BEASTMEN models within 4” of it can add +1 DICE to their Dash Success Rolls.'},
  { id: 'herd_banner_ts', name: 'Herd Banner', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['HELD', 'ICON'], description: 'Injury rolls against the equipped model and each friendly BEASTMEN model within 4" of it have -1 INJURY DICE.'},
  // ===================== Thousand Sons Campaign Shop Equipment =====================
  { id: 'athenian_scrolls_ts', name: 'Athenian Scrolls', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once during each battle, when the bearer uses a psychic power, it can gain +1 DICE to that Success Roll, as well as each subsequent time it uses that same power during the same battle. 3 Glory. LIMIT: 1. Exalted Sorcerer Only.', restrictedTo: ['ELITE'] },
  { id: 'change_wrought_chalice_ts', name: 'Change-Wrought Chalice', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'Choose one power from the Discipline of Change or Discipline of Vengeance costing 10 credits or less. The bearer knows that power in addition to its other powers. 1 Glory. LIMIT: 1. Tzaangor Shaman Only.' },
  { id: 'conniving_plate_ts', name: 'Conniving Plate', type: 'equipment', slot: 'body-armour', cost: 5, costCurrency: 'glory', limit: 1, keywords: ['-1 INJURY MODIFIER'], description: 'Additional -1 to Injury rolls (does not stack with shields). An enemy cannot make more than one melee attack against the wearer during any single Activation. 5 Glory. LIMIT: 1. Elite Wearing Power Armour Only.', restrictedTo: ['ELITE'] },
  { id: 'eye_of_tzeentch_ts', name: 'Eye Of Tzeentch', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model has +1 DICE to all PSYCHIC Success Rolls, including attacks.'},
  { id: 'paradoxical_chatterfowl_ts', name: 'Paradoxical Chatterfowl', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Enemy models within 1" of the bearer have -1 DICE to Hit with Melee Attacks. 2 Glory. LIMIT: 1.' },
  { id: 'prism_of_echoes_ts', name: 'Prism of Echoes', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'The bearer can affect allied models with its psychic powers at twice the normal range. 3 Glory. LIMIT: 1.' },
  { id: 'umbralefic_crystal_ts', name: 'Umbralefic Crystal', type: 'equipment', slot: 'equipment', cost: 9, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once per battle, as an Action with no roll, choose this model or one friendly model within 6". Remove that model from the table, then place it anywhere at least 8" away from all enemy models. 6 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'warpweave_mantle_ts', name: 'Warpweave Mantle', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Whenever an enemy Charges the wearer from further than 3" away and rolls 4 or more on the charge distance die, it must end its movement further than 1" away from the wearer. 3 Glory. LIMIT: 1.' },
];

// ---------------------------------------------------------------------------
// Chaos Daemons – faction-specific equipment
// ---------------------------------------------------------------------------
export const chaosDaemonEquipment: WargearOption[] = [
  { id: 'chaos_icon_daemons', name: 'Chaos Sigil', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['FEAR', 'ICON'], description: 'The equipped model gains the FEAR Keyword. While bearer is not Down, counts as fulfilling any warband-size requirement for mission objectives. ICON keyword.', grantsKeywords: ['FEAR', 'ICON'] },
  { id: 'musical_instrument_daemons', name: 'Instrument of Chaos', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. Any friendly models within 4" of the bearer who is not Down can add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  // Blood Legion (Khorne)
  { id: 'banner_of_blood_khorne', name: 'Banner of Blood', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['HELD', 'ICON', 'KHORNE'], description: 'HELD, ICON. The bearer and KHORNE allies within 8" roll 2D6 for charge distance (take highest).' },
  { id: 'brass_horns_khorne', name: 'Brass Horns', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['KHORNE'], description: 'When the model successfully Charges one or more enemies, one of those enemies gains a BLOOD MARKER. LIMIT: 3. Blood Legion (Khorne) only.' },
  { id: 'collar_of_khorne', name: 'Collar of Khorne', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['KHORNE'], description: 'Model cannot be targeted by PSYCHIC attacks. Enemies cannot use psychic powers within 6".' },
  { id: 'cuirass_of_rage_khorne', name: 'Cuirass of Rage', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['KHORNE'], description: 'BMs cannot be spent on Success Rolls for melee attacks against this model.' },
  // Legion of Excess (Slaanesh)
  { id: 'rapturous_standard_slaanesh', name: 'Rapturous Standard', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['HELD', 'ICON', 'SLAANESH'], description: 'HELD, ICON. Melee attacks against this model and SLAANESH allies within 8" have -1 DICE to Hit.' },
  // Plague Legion (Nurgle)
  { id: 'the_endless_gift_nurgle', name: 'The Endless Gift', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['NURGLE'], description: 'At the end of this model\'s Activation, remove 1 BM. Elite Only.' },
  { id: 'mischievous_nurgling_nurgle', name: 'Mischievous Nurgling', type: 'equipment', slot: 'equipment', cost: 3, limit: 3, keywords: ['NURGLE'], description: 'Once per battle: an enemy in close combat with this model makes a melee attack at -1 DICE to Hit.' },
  { id: 'nurgling_palanquin_nurgle', name: 'Nurgling Palanquin', type: 'equipment', slot: 'equipment', cost: 20, keywords: ['LARGE', 'NURGLE'], description: 'LARGE. This model cannot fall Down from injury. Poxbringer Only.' },
  { id: 'plague_banner_nurgle', name: 'Plague Banner', type: 'equipment', slot: 'equipment', cost: 25, limit: 1, keywords: ['HELD', 'ICON', 'NURGLE'], description: 'HELD, ICON. NURGLE allies within 8" add the GAS Keyword to their melee attacks.' },
  { id: 'sloppity_bilepipe_nurgle', name: 'Sloppity Bilepipe', type: 'equipment', slot: 'equipment', cost: 25, limit: 1, keywords: ['HELD', 'FEAR', 'NURGLE'], description: 'HELD, FEAR. This model gains the FEAR Keyword. NURGLE allies within 8" of it Charges, roll 2D6 instead of 1D6 and then add the highest of the two dice to their charge move.' },
  // Scintillating Legion (Tzeentch)
  { id: 'blasted_standard_tzeentch', name: 'Blasted Standard', type: 'equipment', slot: 'equipment', cost: 20, limit: 1, keywords: ['HELD', 'ICON', 'TZEENTCH'], description: 'HELD, ICON. As an Action with a Success Roll: target one visible enemy within 8". On success, that enemy suffers an Injury Roll with the FIRE Keyword. Models with NEGATE FIRE are immune.' },
  { id: 'crystal_tome_tzeentch', name: 'Crystal Tome', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['TZEENTCH'], description: 'As an Action that requires no roll, the equipped model can choose an enemy it can see within 12". Until the end of the current Turn, that enemy has -1 DICE on all Success Rolls. 2 Glory. LIMIT: 1. Elite Only. Scintillating Legion only.', restrictedTo: ['ELITE'] },
  { id: 'disc_of_tzeentch_daemons', name: 'Disc of Tzeentch', type: 'equipment', slot: 'equipment', cost: 30, limit: 2, keywords: ['TZEENTCH', '8" FLYING'], description: '8" FLYING movement.', movementOverride: 8, grantsKeywords: ['FLYING'] },
  { id: 'icon_of_tzeentch_daemons', name: 'Icon of Tzeentch', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['TZEENTCH', 'FIRE'], description: 'Blue and Pink Horror Claws gain the FIRE Keyword. Blue or Pink Horror Only.' },
];

// ---------------------------------------------------------------------------
// Chaos Cult – faction-specific equipment
// ---------------------------------------------------------------------------
export const chaosCultEquipment: WargearOption[] = [
  { id: 'chaos_icon_chaoscult', name: 'Chaos Sigil', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['FEAR', 'ICON'], description: 'The equipped model gains the FEAR Keyword. While bearer is not Down, counts as fulfilling any warband-size requirement for mission objectives. ICON keyword.', grantsKeywords: ['FEAR', 'ICON'] },
  { id: 'cult_icon_chaoscult', name: 'Cult Icon', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'LEADER'], description: 'HELD. As an Action with a Success Roll with +1 DICE, the carrier can attempt to heal itself or a friendly model within 6". If it succeeds, remove 1 BLOOD MARKER from that model, or 3 BLOOD MARKERS if the Success Roll was a Critical Success.' },
  { id: 'covert_guise_chaoscult', name: 'Covert Guise', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['INFILTRATOR'], description: 'Model gains the INFILTRATOR Keyword. Cult Devotee Only.', grantsKeywords: ['INFILTRATOR'] },
  { id: 'dum_dum_ammunition_chaoscult', name: 'Dum-Dum Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: 'AMMUNITION (CRITICAL). For Autogun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'manstopper_ammunition_chaoscult', name: 'Manstopper Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (+1 INJURY MODIFIER against any target that has no armour, including shields). For Autogun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'radium_ammunition_chaoscult', name: 'Radium Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['CONSUMABLE'], description: 'AMMUNITION (GAS). For Autogun, Automatic Shotgun, Shotgun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'psychic_familiar_cc', name: 'Psychic Familiar', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Once per battle, when the owner makes a PSYCHIC attack or takes a PSYCHIC Success Roll, it can add +1 DICE to that roll.' },
  { id: 'cyberteknika_cranial_chaoscult', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_chaoscult', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_chaoscult', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_chaoscult', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
];

// ---------------------------------------------------------------------------
// The Vermintide – faction-specific equipment
// ---------------------------------------------------------------------------
export const vermintideEquipment: WargearOption[] = [
  { id: 'chaos_icon_vermintide', name: 'Chaos Sigil', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['FEAR', 'ICON'], description: 'The equipped model gains the FEAR Keyword. While bearer is not Down, counts as fulfilling any warband-size requirement for mission objectives. ICON keyword.', grantsKeywords: ['FEAR', 'ICON'] },
  { id: 'book_of_woes_vermintide', name: 'Book of Woes', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['HELD'], description: 'HELD. As an Action with a Risky Success Roll: target one visible enemy within 12". On success, that enemy gains 1 BM. On Critical Success, gains D3 BMs instead. Plague Monk Only.' },
  { id: 'skavenbrew_vermintide', name: 'Skavenbrew', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['CONSUMABLE'], description: '+1 DICE to melee attacks but -1 DICE to Injury rolls against this model, and gain 1 BM at start of each Activation. CONSUMABLE. Skavenslave or Clanrat Only.' },
  { id: 'warp_shovel_vermintide', name: 'Warp Shovel', type: 'equipment', slot: 'equipment', cost: 15, limit: 3, keywords: ['DEEP STRIKE'], description: 'Shovel with DEEP STRIKE. Clanrat Only.', grantsKeywords: ['DEEP STRIKE'] },
  { id: 'warpstone_charm_vermintide', name: 'Warpstone Charm', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'STUN MARKERS count as BMs for melee Injury rolls.' },
  { id: 'wolf_rat_mount_vermintide', name: 'Wolf Rat Mount', type: 'equipment', slot: 'equipment', cost: 40, limit: 3, keywords: ['LARGE', 'SKIRMISHER', 'MOUNTED', '10" movement'], description: 'LARGE, SKIRMISHER, MOUNTED, 10" movement. Built-in Snapping Jaws attack.' },
  { id: 'cyberteknika_cranial_vermintide', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_vermintide', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_vermintide', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_vermintide', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_torsonic_vermintide', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Injuries against this model are rolled with -1 DICE. Ignores Trauma penalties (prevents gaining): Chest Wound. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_vascular_vermintide', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to all Dash Success Rolls. Ignores Trauma penalties (prevents gaining): Severe Nerve Damage, Shell-Shocked. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
];

// ---------------------------------------------------------------------------
// Adeptus Astartes – faction-specific equipment
// ---------------------------------------------------------------------------
export const adeptusAstartesEquipment: WargearOption[] = [
  { id: 'combat_helmet_aa', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'frag_ammunition_aa', name: 'Frag Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (BLAST 2", SHRAPNEL, -1 INJURY DICE). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). CONSUMABLE.' },
  { id: 'mortis_ammunition_aa', name: 'Mortis Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (GAS). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). CONSUMABLE.' },
  { id: 'psychic_hood_aa', name: 'Psychic Hood', type: 'equipment', slot: 'headgear', cost: 7, keywords: [], description: 'Injury rolls with the PSYCHIC Keyword have -1 INJURY DICE against the wearer, and it has +1 DICE when Denying the Witch. Counts as Headgear. Librarian Only.' },
  { id: 'seeker_ammunition_aa', name: 'Seeker Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (IGNORE COVER). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). CONSUMABLE.' },
  { id: 'holy_relic_aa', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', keywords: [], description: 'This model starts each game with +1 BLESSING MARKER. Elite Only.' },
  { id: 'purity_seal_aa', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'When a model equipped with a Purity Seal fails a Risky Success Roll, that model may use this item. If it does, its Activation is not ended. Can be used once per battle. LIMIT: 1.' },
  { id: 'imperial_icon_aa', name: 'Imperial Icon', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON', 'NEGATE FEAR'], description: 'HELD. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1. Gains ICON keyword.', grantsKeywords: ['ICON'] },
  { id: 'cyberteknika_cranial_aa', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_aa', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_aa', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_aa', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  // Vox Unit – Astartes-specific version at correct armoury cost
  { id: 'vox_unit_aa', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. While bearer is not Down, friendly models within 4" add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  // Iron Hands Variant – reduced-cost cyberteknika + Torsonic & Vascular + Servo-Skull
  { id: 'cyberteknika_torsonic_aa', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Injuries against this model are rolled with -1 DICE. Ignores Trauma penalties (prevents gaining): Chest Wound. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained. Iron Hands only (25 credits).' },
  { id: 'cyberteknika_vascular_aa', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to all Dash Success Rolls. Ignores Trauma penalties (prevents gaining): Severe Nerve Damage, Shell-Shocked. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained. Iron Hands only (20 credits).' },
  { id: 'servo_skull_ih', name: 'Servo-Skull', type: 'armor', slot: 'equipment', cost: 15, keywords: ['+1 INJURY MODIFIER'], description: '+1 INJURY MODIFIER with all attacks. Techmarine Only. (Iron Hands only)' },
  { id: 'servo_medicae_ih', name: 'Servo-Medicae', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Counts as a Medicae Kit, but gains +1 DICE on the Success Roll to use it. The user can take a Risky Success Roll and choose themself or one ally within 1". On a success, remove one BLOOD MARKER from the target, or if it is Down, allow it to stand up. (Iron Hands only)' },
  // Dark Angels Variant
  { id: 'watcher_in_the_dark', name: 'Watcher in the Dark', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: [], description: 'Once per battle when the equipped model is hit by an attack, the Injury roll has -1 DICE. Elite Only. (Dark Angels only)' },
  // Space Wolves Variant – equipment mounts
  { id: 'death_totem', name: 'Death Totem', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['FEAR'], description: 'The equipped model gains the FEAR Keyword. LIMIT: 1. Wulfen Only. (Space Wolves only)', grantsKeywords: ['FEAR'] },
  { id: 'thunderwolf', name: 'Thunderwolf', type: 'equipment', slot: 'equipment', cost: 55, limit: 3, keywords: ['LARGE', 'BEAST', '10" movement'], description: 'Mounted on a wolf. Gains LARGE, BEAST, 10"/Infantry movement. Equipped with Jaws (Melee, CRITICAL, free alongside other melee). Thunderous Charge: +1 DICE to Dash/Climb/Jump, Charging hits an enemy gains BLOOD MARKER. LIMIT: 3. Space Marines Only. (Space Wolves only)' },
  // Deathwatch Variant – Special Issue Ammunition (not CONSUMABLE, not limited to 1)
  { id: 'derevenant_shells', name: 'Derevenant Shells', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['AMMUNITION'], description: 'AMMUNITION (special). On a hit, after the normal Injury roll, target rolls on Injury table again with -2 DICE. Other properties do not apply to second roll. LIMIT: 2. Deathwatch only.' },
  { id: 'dragonfire_bolts', name: 'Dragonfire Bolts', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['AMMUNITION', 'FIRE'], description: 'AMMUNITION (FIRE). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). LIMIT: 3. Deathwatch only.' },
  { id: 'hellfire_rounds', name: 'Hellfire Rounds', type: 'equipment', slot: 'equipment', cost: 5, limit: 4, keywords: ['AMMUNITION', 'GAS'], description: 'AMMUNITION (GAS). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). LIMIT: 4. Deathwatch only.' },
  { id: 'inertial_fusion_bolts', name: 'Inertial Fusion Bolts', type: 'equipment', slot: 'equipment', cost: 5, limit: 4, keywords: ['AMMUNITION'], description: 'AMMUNITION (special). Injury rolls caused by these attacks cannot benefit from -DICE. LIMIT: 4. Deathwatch only.' },
  { id: 'kraken_bolts', name: 'Kraken Bolts', type: 'equipment', slot: 'equipment', cost: 10, limit: 4, keywords: ['AMMUNITION', 'ARMOUR PIERCING 1'], description: 'AMMUNITION (ARMOUR PIERCING 1). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). LIMIT: 4. Deathwatch only.' },
  { id: 'metal_storm_shells', name: 'Metal Storm Shells', type: 'equipment', slot: 'equipment', cost: 5, limit: 4, keywords: ['AMMUNITION', 'SHRAPNEL'], description: 'AMMUNITION (SHRAPNEL). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). LIMIT: 4. Deathwatch only.' },
  { id: 'tempest_bolts', name: 'Tempest Bolts', type: 'equipment', slot: 'equipment', cost: 5, limit: 4, keywords: ['AMMUNITION'], description: 'AMMUNITION (+1 INJURY DICE vs ARTIFICIAL, MECHANICUS, or VEHICLE). LIMIT: 4. Deathwatch only.' },
  { id: 'thermic_acceleration_rounds', name: 'Thermic Acceleration Rounds', type: 'equipment', slot: 'equipment', cost: 3, limit: 4, keywords: ['AMMUNITION'], description: 'AMMUNITION (special). Attacks ignore all penalties to Hit besides Cover and Long Range, and range penalties/limits. LIMIT: 4. Deathwatch only.' },
  // AA Campaign Shop – universal items
  { id: 'malodraxian_standard_aa', name: 'Malodraxian Standard', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['HELD'], description: 'HELD. While the carrier is not Down, the first -1 of its Armour and the Armour of each of its ASTARTES allies within 4" have IMPERVIOUS. LIMIT: 1. Elite Only. (AA Campaign Shop)', restrictedTo: ['ELITE'] },
  { id: 'armour_indomitus_aa', name: 'Armour Indomitus', type: 'armor', slot: 'body-armour', cost: 6, costCurrency: 'glory', limit: 1, keywords: ['-2 INJURY MODIFIER', 'IMPERVIOUS'], description: '-2 to Injury rolls, IMPERVIOUS. Counts as Power Armour for models that must wear Power Armour. LIMIT: 1. (AA Campaign Shop)', statModifiers: { armourSave: -2 } },
  { id: 'honor_vehement_aa', name: 'Honor Vehement', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Whenever the equipped model or a friendly ASTARTES model within 6" Charges, roll 2D6 instead of 1D6 for charge distance (take highest). LIMIT: 1. Elite Only. (AA Campaign Shop)' },
  { id: 'relic_of_the_primarch_aa', name: 'Relic of the Primarch', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: ['HELD'], description: 'HELD. Once per battle, as an Action requiring no roll, unveil the relic: each friendly ASTARTES model on the battlefield has +1 DICE to Hit and +1 INJURY DICE with all melee attacks until the end of the current Turn. LIMIT: 1. Captain Only. (AA Campaign Shop)' },
  { id: 'shield_eternal_aa', name: 'Shield Eternal', type: 'armor', slot: 'shield', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['-1 INJURY MODIFIER', 'IMPERVIOUS', 'HELD'], description: 'Counts as a Shield (-1 to Injury rolls) but has IMPERVIOUS. HELD. LIMIT: 1. Elite Only. (AA Campaign Shop)', statModifiers: { armourSave: -1 } },
  { id: 'standard_of_righteous_hatred_aa', name: 'Standard of Righteous Hatred', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'ICON'], description: 'HELD, ICON. When the carrier or an ASTARTES ally within 12" is taken Out of Action, that model can make a single melee attack before being removed. BLOOD MARKERS cannot be spent on this attack. LIMIT: 1. (AA Campaign Shop)', grantsKeywords: ['ICON'] },
  // AA Campaign Shop – subfaction-specific
  { id: 'aegis_armour_aa', name: 'Aegis Sigils', type: 'armor', slot: 'body-armour', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['PSYCHIC WARD'], description: 'Injury rolls with the PSYCHIC or IGNORE ARMOUR Keyword have -1 INJURY DICE against the equipped model. LIMIT: 1. Elite Only. Grey Knights Only. (AA Campaign Shop)', statModifiers: { armourSave: 0 } },
  { id: 'arridian_drakehide_cloak_aa', name: 'Arridian Drakehide Cloak', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls made against the equipped model have -1 DICE, or -2 DICE if they have the FIRE Keyword. LIMIT: 1. Elite Only. Salamanders Only. (AA Campaign Shop)' },
  { id: 'centurion_warsuit_aa', name: 'Centurion Warsuit', type: 'equipment', slot: 'equipment', cost: 8, costCurrency: 'glory', limit: 1, keywords: ['STRONG', 'TOUGH', 'VEHICLE'], description: 'Armour improves to -3 (no shield stacking). Gains STRONG, TOUGH, VEHICLE. Max 3" Dash. If already TOUGH, can use it twice per battle (first use removes the warsuit). Replaces normal weapons with warsuit weapons (chosen on purchase: Combi-Bolter/Missile Launcher/Krak Grenades + Grav Cannon/Heavy Bolter/Heavy Flamer/Lascannon(+2 Glory for Multi-Melta) + two Two-Handed Hammers or Twin Siege Drill). Each ranged warsuit weapon can be fired per Activation. LIMIT: 1. Wearing Power Armour Only. (AA Campaign Shop)', grantsKeywords: ['STRONG', 'TOUGH', 'VEHICLE'] },
  { id: 'icon_of_obstinacy_aa', name: 'Icon of Obstinacy', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model and ASTARTES allies within 6" cannot be forcibly moved by the enemy, and never fall as a result of being Downed. LIMIT: 1. Elite Only. Imperial Fists Only. (AA Campaign Shop)' },
  { id: 'inspired_retribution_aa', name: 'Inspired Retribution', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', keywords: [], description: 'After the Chaplain or a friendly ASTARTES model within 6" is attacked in melee, the Chaplain can make a Success Roll. On a success, the attacking model gains a BLOOD MARKER. Chaplain Only. No Variant Only. Cannot be sold. (AA Campaign Shop)' },
  { id: 'litany_of_hate_aa', name: 'Litany of Hate', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', keywords: [], description: 'BLOOD MARKERS cannot be spent on the attacks of the Chaplain or any friendly ASTARTES model within 6" of it. Chaplain Only. Black Templars Only. Cannot be sold. (AA Campaign Shop)' },
  { id: 'pelt_of_balewolf_aa', name: 'Pelt of Balewolf', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', keywords: [], description: 'Enemies within 3" of the equipped model treat all of their enemies as if they had the FEAR Keyword. Elite Only. Space Wolves Only. (AA Campaign Shop)', restrictedTo: ['ELITE'] },
  { id: 'ravens_talons_aa', name: "Raven's Talons", type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 3, keywords: [], description: 'When the equipped model successfully Charges one or more enemies, one of those enemies gains a BLOOD MARKER. Equipped with Jump Pack Only. Raven Guard Only. (AA Campaign Shop)' },
  { id: 'signum_array_aa', name: 'Signum Array', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Whenever the equipped model hits with a non-THROWN ranged attack against an enemy, it and allies have VICIOUS 11 against that same enemy with all non-THROWN ranged attacks until the end of the current Turn. If such an attack already has VICIOUS 11, it gains VICIOUS 10 instead. LIMIT: 1. Elite Only. Iron Hands Only. (AA Campaign Shop)' },
  { id: 'talisman_of_sundered_souls_aa', name: 'Talisman of Sundered Souls', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model ignores the first Perils of the Warp roll it would make during each battle. LIMIT: 1. Librarian Only. (AA Campaign Shop)' },
  { id: 'tome_of_malcador_aa', name: 'Tome of Malcador', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model can learn one additional psychic power from any of its normal disciplines, or from any Shared Discipline. Must pay for this power as normal. LIMIT: 1. Librarian Only. (AA Campaign Shop)' },
  { id: 'visage_of_death_aa', name: 'Visage of Death', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['FEAR'], description: 'The equipped model gains the FEAR Keyword. Elite Only. Blood Angels Only. (AA Campaign Shop)', grantsKeywords: ['FEAR'], restrictedTo: ['ELITE'] },
  { id: 'troop_flag_aa', name: 'Troop Flag', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON'], description: 'HELD. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1.', grantsKeywords: ['ICON'] },
];

// ---------------------------------------------------------------------------
// Astra Militarum – faction-specific equipment
// ---------------------------------------------------------------------------
export const astraMilitarumEquipment: WargearOption[] = [
  { id: 'augury_scanner_am', name: 'Augury Scanner', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Enemy models must be set up at least 16" away from this model when using the DEEP STRIKE or INFILTRATOR Keywords.' },
  { id: 'camo_cloak_am', name: 'Camo Cloak', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['STEALTH'], description: 'A model equipped with a Camo Cloak gains the STEALTH Keyword. Long Range attacks against this model suffer an additional -1 DICE to Hit. Attacks that ignore Long Range penalties also ignore STEALTH.', grantsKeywords: ['STEALTH'] },
  { id: 'combat_helmet_am', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'dum_dum_ammunition_am', name: 'Dum-Dum Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: 'AMMUNITION (CRITICAL). For Autogun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'manstopper_ammunition_am', name: 'Manstopper Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (+1 INJURY MODIFIER against any target that has no armour, including shields). For Autogun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'musical_instrument_am', name: 'Musical Instrument', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. Any friendly models within 4" of the musician who is not Down can add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  { id: 'phosphor_ammunition_am', name: 'Phosphor Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (IGNORE COVER). For Autogun, Automatic Shotgun, Shotgun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'photo_goggles_am', name: 'Photo Goggles', type: 'equipment', slot: 'equipment', cost: 3, keywords: [], description: 'The equipped model ignores the STEALTH Keyword when making ranged attacks. In addition, the range of its weapons cannot be reduced.' },
  { id: 'rough_rider_horse_am', name: 'Rough Rider Horse', type: 'equipment', slot: 'equipment', cost: 40, limit: 3, keywords: ['BEAST MOUNT', '10" movement'], description: 'BEAST MOUNT, 10"/Infantry. +1 DICE to Dash, Climb, and Jump Success Rolls. Elite or Veteran Only (max 1 Elite).' },
  { id: 'regiment_flag_am', name: 'Regiment Flag', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON', 'NEGATE FEAR'], description: 'HELD. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1.', grantsKeywords: ['ICON'] },
  { id: 'vox_unit_am', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. While bearer is not Down, friendly models within 4" add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  { id: 'cyberteknika_cranial_am', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_am', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_am', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_am', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  // ── Astra Militarum Campaign Shop ────────────────────────────────────────
  { id: 'clarion_proclamatus_am', name: 'Clarion Proclamatus', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 2, keywords: [], description: 'The equipped model can issue Orders to allies up to 24" away. 2 Glory. LIMIT: 2. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'fire_of_judgement_am', name: 'Fire Of Judgement', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['18"', 'PISTOL', '+1 INJURY MODIFIER', 'RISKY'], description: '18", PISTOL, +1 INJURY MODIFIER, -DICE cannot be applied to the Injury roll, RISKY. 4 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'laurels_of_command_am', name: 'Laurels Of Command', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', keywords: [], description: 'The equipped model can issue two Orders during each of its Activations. 3 Glory. Castellan Only.' },
  { id: 'medal_macharia_am', name: 'Medal Macharia', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once during each of its Activations, when the equipped model issues an Order, it can choose two Orders for the target to benefit from instead of one. 3 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'moiraean_lance_am', name: 'Moiraean Lance', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['12"', 'ARMOUR PIERCING 1', 'RISKY', 'PISTOL'], description: '12", ARMOUR PIERCING 1, RISKY, PISTOL. When used to make a ranged attack, draw a straight line 1mm wide from the attacker to the target. On a hit, all models along that line, friendly or enemy, are hit. 4 Glory. LIMIT: 1.' },
  { id: 'null_coat_am', name: 'Null Coat', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls with the PSYCHIC or IGNORE ARMOUR Keyword have -1 INJURY DICE against the equipped model. In addition, it can Deny the Witch as if it had PSYKER 1. 3 Glory. LIMIT: 1. Non-Psyker Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'refractor_field_am', name: 'Refractor Field Generator', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model treats Down results as Minor Hits (does not affect Down results that replace Out of Action via TOUGH Keyword). 2 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'relic_of_lost_cadia_am', name: 'Relic of Lost Cadia', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once per battle, as an Action that requires no roll, the equipped model can display the relic. Until the end of the current Turn, the bearer and each of its MILITARUM allies within 12" of it that can see it have +1 DICE to Hit and CRITICAL with all attacks. 4 Glory. LIMIT: 1. Castellan Only.' },
  { id: 'skull_mask_am', name: 'Skull Mask Of Acheron', type: 'equipment', slot: 'headgear', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['FEAR'], description: 'The equipped model gains the FEAR Keyword. 1 Glory. LIMIT: 1.', grantsKeywords: ['FEAR'] },
  { id: 'star_of_terra_am', name: 'Star Of Terra', type: 'equipment', slot: 'equipment', cost: 7, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls made against the equipped model have -1 INJURY DICE. In addition, the equipped model treats Down results as Minor Hits (does not affect Down results that replace Out of Action via TOUGH Keyword). Finally, the first time the equipped model scores a Glorious Deed during each battle, you gain an additional 1 Glory. 7 Glory. Castellan Only.' },
  { id: 'troop_flag_am', name: 'Troop Flag', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON'], description: 'HELD. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1.', grantsKeywords: ['ICON'] },
];

// ---------------------------------------------------------------------------
// Adeptus Mechanicus – faction-specific equipment
// ---------------------------------------------------------------------------
export const adeptusMechanicusEquipment: WargearOption[] = [
  { id: 'combat_helmet_admech', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'holy_relic_admech', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', keywords: [], description: 'This model starts each game with +1 BLESSING MARKER. Elite Only.' },
  { id: 'imperative_surge_wafer', name: 'Imperative Surge-Wafer', type: 'equipment', slot: 'equipment', cost: 15, limit: 3, keywords: ['CONSUMABLE'], description: '+2" movement for entire battle. CONSUMABLE. Elite Only.' },
  { id: 'omnispex_admech', name: 'Omnispex', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Ranged attacks from this model ignore Cover. Skitarii or Marshal Only.' },
  { id: 'purity_seal_admech', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'When a model equipped with a Purity Seal fails a Risky Success Roll, that model may use this item. If it does, its Activation is not ended. Can be used once per battle. LIMIT: 1.' },
  { id: 'servo_medicae_admech', name: 'Servo-Medicae', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Counts as a Medicae Kit, but gains +1 DICE on the Success Roll to use it. The user can take a Risky Success Roll and choose themself or one ally within 1". On a success, remove one BLOOD MARKER from the target, or if it is Down, allow it to stand up.' },
  { id: 'serberys_construct_admech', name: 'Serberys Construct', type: 'equipment', slot: 'equipment', cost: 45, limit: 3, keywords: ['ARTIFICIAL', 'SKIRMISHER', 'VEHICLE MOUNT', '10" movement'], description: 'ARTIFICIAL, SKIRMISHER, VEHICLE MOUNT, 10"/Infantry movement. Skitarii or Marshal Only.' },
  { id: 'vox_unit_admech', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. While bearer is not Down, friendly models within 4" add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  { id: 'cyberteknika_cranial_admech', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_admech', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_admech', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_admech', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_torsonic_admech', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Injuries against this model are rolled with -1 DICE. Ignores Trauma penalties (prevents gaining): Chest Wound. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_vascular_admech', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to all Dash Success Rolls. Ignores Trauma penalties (prevents gaining): Severe Nerve Damage, Shell-Shocked. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'servo_skull_admech', name: 'Servo-Skull', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: '+1 INJURY MODIFIER with all attacks. Dominus or Tech-Priest Only.' },
];

// ---------------------------------------------------------------------------
// Adeptus Custodes – faction-specific equipment
// ---------------------------------------------------------------------------
export const adeptusCustodesEquipment: WargearOption[] = [
  { id: 'auramite_armour_custodes', name: 'Auramite Armour', type: 'armor', slot: 'body-armour', cost: 50, keywords: ['-3 INJURY MODIFIER', 'HEAVY'], description: '-3 INJURY MODIFIER, HEAVY. Elite or Custodian Guard Only.', statModifiers: { armourSave: -3 } },
  { id: 'aquilon_armour_custodes', name: 'Aquilon Armour', type: 'armor', slot: 'body-armour', cost: 70, limit: 1, keywords: ['-3 INJURY MODIFIER', 'HEAVY', 'DEEP STRIKE', 'VEHICLE'], description: '-3 INJURY MODIFIER, HEAVY, DEEP STRIKE, VEHICLE. It can wield a TWO-HANDED ranged weapon in one hand instead of a TWO-HANDED melee weapon due to its STRONG Keyword.', grantsKeywords: ['DEEP STRIKE', 'VEHICLE'], statModifiers: { armourSave: -3 } },
  { id: 'praesidium_shield_custodes', name: 'Praesidium Shield', type: 'armor', slot: 'shield', cost: 40, limit: 1, keywords: ['HELD', 'COVER', 'HEAVY'], description: 'HELD, COVER, HEAVY. The first -2 of the bearer\'s armour has IMPERVIOUS. Counts as a Shield, including for Shield Combo. Shield-Captain or Contemptor Only.' },
  { id: 'amelioration_pail_custodes', name: 'Amelioration Pail', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 3, keywords: ['CONSUMABLE'], description: 'Remove 1 BM as a free action. CONSUMABLE.' },
  { id: 'combat_helmet_custodes', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'dawneagle_jetbike_custodes', name: 'Dawneagle Jetbike', type: 'equipment', slot: 'equipment', cost: 60, limit: 1, keywords: ['VEHICLE MOUNT', '10" FLYING'], description: 'VEHICLE MOUNT, 10" FLYING. Built-in weapon slot. Turbo-Boost ability. Custodian Guard or Shield-Captain Only.' },
  { id: 'holy_relic_custodes', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', keywords: [], description: 'This model starts each game with +1 BLESSING MARKER. Elite Only.' },
  { id: 'vexilla_custodes', name: 'Vexilla', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['HELD'], description: 'HELD. Bearer and all non-Down allies automatically pass all Morale Tests. Non-Anathema Psykana Only.' },
  { id: 'cyberteknika_cranial_custodes', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_custodes', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_custodes', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_custodes', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'frag_ammunition_custodes', name: 'Frag Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (BLAST 2", SHRAPNEL, -1 INJURY DICE). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). CONSUMABLE.' },
  { id: 'vox_unit_custodes', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. While bearer is not Down, friendly models within 4" add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  // Campaign Shop
  { id: 'anathematic_diadem_custodes', name: 'Anathematic Diadem', type: 'equipment', slot: 'headgear', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Enemies within 12" have -1 DICE on all PSYCHIC Success Rolls, including attacks. Bearer has +1 DICE when Denying the Witch. 2 Glory. LIMIT: 1. ANATHEMA Only.', restrictedTo: ['ELITE'] },
  { id: 'arae_shrike_custodes', name: 'Arae-Shrike', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Enemy models must set up at least 16" away from this model when using DEEP STRIKE or INFILTRATOR. Enemy models within 12" cannot target allies further than 1" away with abilities, battlekit, or psychic powers. 2 Glory. LIMIT: 1.' },
  { id: 'auspice_mantle_custodes', name: 'Auspice Mantle', type: 'equipment', slot: 'equipment', cost: 9, costCurrency: 'glory', limit: 1, keywords: [], description: 'Ranged attacks cannot be made against the bearer if the attacker is more than 12" away. 9 Glory. LIMIT: 1.' },
  { id: 'epoch_auspice_custodes', name: 'Epoch Auspice', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['STEALTH'], description: 'The bearer and each ally within 3" has the STEALTH Keyword. 3 Glory. LIMIT: 1.' },
  { id: 'lucent_aureole_custodes', name: 'Lucent Aureole', type: 'equipment', slot: 'equipment', cost: 6, costCurrency: 'glory', limit: 1, keywords: ['IMPERVIOUS'], description: 'The first -2 of the bearer\'s Armour has IMPERVIOUS. 6 Glory. LIMIT: 1. Non-PSYKANA Only.', restrictedTo: ['ELITE'] },
  { id: 'mortis_gyre_custodes', name: 'Mortis Gyre', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls caused by melee weapons the bearer wields cannot be modified by -DICE. 3 Glory. LIMIT: 1.' },
  { id: 'twilight_pallium_custodes', name: 'Twilight Pallium', type: 'equipment', slot: 'equipment', cost: 8, costCurrency: 'glory', limit: 1, keywords: [], description: 'As an Action with a Success Roll, the bearer can teleport to a location within 1" of any enemy model on the battlefield. This counts as a Charge Action for action limitations and the ASSAULT Keyword. Can only be used once per battle. 8 Glory. LIMIT: 1.' },
];

// ---------------------------------------------------------------------------
// Adeptus Ministorum – faction-specific equipment
// ---------------------------------------------------------------------------
export const adeptusMinistorumEquipment: WargearOption[] = [
  { id: 'augury_scanner_min', name: 'Augury Scanner', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Enemy models must be set up at least 16" away from this model when using the DEEP STRIKE or INFILTRATOR Keywords.' },
  { id: 'combat_helmet_min', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'holy_relic_min', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'This model starts each game with +1 BLESSING MARKER. Elite Only.' },
  { id: 'infernus_ammunition_min', name: 'Infernus Ammunition', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['CONSUMABLE', 'FIRE'], description: 'AMMUNITION (FIRE). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). CONSUMABLE.' },
  { id: 'purity_seal_min', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: 'When a model equipped with a Purity Seal fails a Risky Success Roll, that model may use this item. If it does, its Activation is not ended. Can be used once per battle. LIMIT: 1.' },
  { id: 'reliquarius_min', name: 'Reliquarius', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['HELD'], description: 'HELD. -1 DICE on Injury rolls against the bearer and allies within 4".' },
  { id: 'sanctification_orbs_min', name: 'Sanctification Orbs', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'FIRE keyword attacks by allies within 8" gain +1 INJURY DICE. Bearer cannot carry thrown weapons.' },
  { id: 'cyberteknika_cranial_min', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_min', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_min', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_min', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
];

// ---------------------------------------------------------------------------
// The Inquisition – faction-specific equipment
// ---------------------------------------------------------------------------
export const theInquisitionEquipment: WargearOption[] = [
  { id: 'augury_scanner_inq', name: 'Augury Scanner', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Enemy models must be set up at least 16" away from this model when using the DEEP STRIKE or INFILTRATOR Keywords.' },
  { id: 'combat_helmet_inq', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'holy_relic_inq', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', keywords: [], description: 'This model starts each game with +1 BLESSING MARKER. Elite Only.' },
  { id: 'manstopper_ammunition_inq', name: 'Manstopper Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (+1 INJURY MODIFIER against any target that has no armour, including shields). For Autogun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'phosphor_ammunition_inq', name: 'Phosphor Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: 'AMMUNITION (IGNORE COVER). For Autogun, Automatic Shotgun, Shotgun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'photo_goggles_inq', name: 'Photo Goggles', type: 'equipment', slot: 'equipment', cost: 3, keywords: [], description: 'The equipped model ignores the STEALTH Keyword when making ranged attacks. In addition, the range of its weapons cannot be reduced.' },
  { id: 'psychic_familiar_inq', name: 'Psychic Familiar', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Once per battle, when the owner makes a PSYCHIC attack or takes a PSYCHIC Success Roll, it can add +1 DICE to that roll.' },
  { id: 'psychic_hood_inq', name: 'Psychic Hood', type: 'equipment', slot: 'headgear', cost: 7, keywords: [], description: 'Injury rolls with the PSYCHIC Keyword have -1 INJURY DICE against the wearer, and it has +1 DICE when Denying the Witch. Counts as Headgear. Psyker Inquisitor Only.' },
  { id: 'purity_seal_inq', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'When a model equipped with a Purity Seal fails a Risky Success Roll, that model may use this item. If it does, its Activation is not ended. Can be used once per battle. LIMIT: 1.' },
  { id: 'imperial_icon_inq', name: 'Imperial Icon', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON', 'NEGATE FEAR'], description: 'HELD. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1.', grantsKeywords: ['ICON'] },
  { id: 'vox_unit_inq', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. While bearer is not Down, friendly models within 4" add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  { id: 'troop_flag_inq', name: 'Troop Flag', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON'], description: 'HELD. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1.', grantsKeywords: ['ICON'] },
];

// ---------------------------------------------------------------------------
// Adepta Sororitas – faction-specific equipment
// ---------------------------------------------------------------------------
export const adeptaSororitasEquipment: WargearOption[] = [
  { id: 'armourium_cherub_sor', name: 'Armourium Cherub', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'Once per battle: +1 DICE to Hit with ranged attacks during one Activation.' },
  { id: 'blessed_ammunition_sor', name: 'Blessed Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['CONSUMABLE'], description: 'AMMUNITION upgrade for bolt weapons: gains IGNORE LONG RANGE.' },
  { id: 'combat_helmet_sor', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'incensor_cherub_sor', name: 'Incensor Cherub', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'When spending a Miracle point, gain 1 additional Miracle point. Elite Only.' },
  { id: 'infernus_ammunition_sor', name: 'Infernus Ammunition', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['CONSUMABLE', 'FIRE'], description: 'AMMUNITION (FIRE). For bolt weapons only (Bolt Carbine, Boltgun, Bolt Rifle, Bolt Sniper Rifle, Assault Bolter, Bolt Pistol, or Heavy Bolt Pistol). CONSUMABLE.' },
  { id: 'phial_of_dolan_sor', name: 'Phial of Dolan', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 2, keywords: ['CONSUMABLE'], description: '+1 DICE to melee attacks and NEGATE FEAR for this model\'s Activation. CONSUMABLE.' },
  { id: 'purity_seal_sor', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'When a model equipped with a Purity Seal fails a Risky Success Roll, that model may use this item. If it does, its Activation is not ended. Can be used once per battle. LIMIT: 1.' },
  { id: 'sacresant_shield_sor', name: 'Sacresant Shield', type: 'armor', slot: 'shield', cost: 20, keywords: ['-1 INJURY MODIFIER', 'HELD', 'Shield Combo'], description: '-1 INJURY MODIFIER, HELD, Shield Combo. Built-in Bolt Pistol. Sacresant Only.', conflictsWith: ['shield', 'heavy_shield'], statModifiers: { armourSave: -1 } },
  { id: 'simulacrum_imperialis_sor', name: 'Simulacrum Imperialis', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['HELD'], description: 'HELD. -1 DICE on Injury rolls against the bearer and allies within 4".' },
  { id: 'imperial_icon_sor', name: 'Imperial Icon', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON', 'NEGATE FEAR'], description: 'HELD. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1.', grantsKeywords: ['ICON'] },
  { id: 'cyberteknika_cranial_sor', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_sor', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_sor', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_sor', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  // Campaign Shop items
  { id: 'beneficence_chainsword_sor', name: 'Beneficence Chainsword', type: 'weapon', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: ['CLEAVE 2', 'CRITICAL', 'RISKY', 'SHRAPNEL', 'MAIN HAND ONLY'], description: 'Melee, CLEAVE 2, CRITICAL, RISKY, SHRAPNEL, MAIN HAND ONLY. Elite Only.' },
  { id: 'casket_of_penance_sor', name: 'Casket of Penance', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'As an Action with no Success Roll, the carrier can rebuke its foes. The equipped model and each enemy within 6" of it each gain a BLOOD MARKER. Penitent Host Only.' },
  { id: 'holy_judgement_sor', name: 'Holy Judgement', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'As an Action with a Risky Success Roll, this model can select any enemy model within 12" that it can see. If successful, the enemy model suffers one BLOOD MARKER. Dogmata Only; cannot be sold.' },
  { id: 'litanies_of_faith_sor', name: 'Litanies of Faith', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'Whenever this model or an ally within 6" of it spends one or more BLESSING MARKERS on a Success Roll, it counts as having spent 1 additional BLESSING MARKER.' },
  { id: 'quicksilver_veil_sor', name: 'Quicksilver Veil', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once during each battle, you can add 3" to the equipped model\'s movement speed for the duration of its Activation. Elite Only.' },
  { id: 'relic_paragon_warsuit_sor', name: 'Relic Paragon Warsuit', type: 'equipment', slot: 'equipment', cost: 6, costCurrency: 'glory', limit: 1, keywords: ['LARGE', 'STRONG', 'VEHICLE'], description: 'The equipped model is mounted in a paragon warsuit. Gains LARGE, STRONG, VEHICLE, 8" movement, -3 Armour (replaces existing). Can equip 1 two-handed melee, 1 two-handed ranged, and Twin G-Launchers or Twin Storm Bolters. Elite Only.', grantsKeywords: ['LARGE', 'STRONG', 'VEHICLE'] },
  { id: 'saints_pulpit_sor', name: "Saint's Pulpit", type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: ['LARGE', 'VEHICLE', 'FLYING', 'COVER'], description: 'Mounted on floating pulpit. Gains LARGE, VEHICLE, FLYING, COVER, 8" movement, always treated as 3" above current location. Weapon Mount: ignore HEAVY of one ranged weapon. Cannot combine with Relic Paragon Warsuit. Canoness Only.', grantsKeywords: ['LARGE', 'VEHICLE', 'FLYING', 'COVER'] },
  { id: 'sorrowsong_sor', name: 'Sorrowsong', type: 'weapon', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['PISTOL'], description: '18", PISTOL, Scope. Normal Shot: ARMOUR PIERCING 1. Overload: +2 INJURY DICE, ARMOUR PIERCING 2, RISKY, roll on injury table on miss. Elite Only.' },
  { id: 'tears_of_saint_celestine_sor', name: 'Tears of Saint Celestine', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'As an Action with a Success Roll, attempt to heal self or one friendly non-ARTIFICIAL model within 6". Success: remove 1 BLOOD MARKER (or 3 on Critical Success).' },
  { id: 'tears_of_the_emperor_sor', name: 'Tears of the Emperor', type: 'weapon', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'IGNORE ARMOUR', 'THROWN'], description: '8", ASSAULT, BLAST 3", IGNORE COVER, IGNORE LONG RANGE, IGNORE ARMOUR, THROWN. +1 INJURY DICE against DAEMON. Elite Only.' },
  { id: 'troop_flag_sor', name: 'Troop Flag', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON'], description: 'HELD. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1.', grantsKeywords: ['ICON'] },
];

// ---------------------------------------------------------------------------
// Officio Assassinorum – faction-specific equipment
// ---------------------------------------------------------------------------
export const officioAssassinorumEquipment: WargearOption[] = [
  { id: 'synskin_bodyglove', name: 'Synskin Bodyglove', type: 'armor', slot: 'body-armour', cost: 20, keywords: ['-1 INJURY MODIFIER', 'IMPERVIOUS'], description: '-1 INJURY MODIFIER, IMPERVIOUS. Elite Only.', statModifiers: { armourSave: -1 } },
  { id: 'sentinel_array_oa', name: 'Sentinel Array', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Model can Charge an enemy it cannot see.' },
  { id: 'spy_mask_oa', name: 'Spy Mask', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Ignore Long Range penalties.' },
  { id: 'holy_relic_oa', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'This model starts each game with +1 BLESSING MARKER. Elite Only.' },
  { id: 'purity_seal_oa', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'When a model equipped with a Purity Seal fails a Risky Success Roll, that model may use this item. If it does, its Activation is not ended. Can be used once per battle. LIMIT: 1.' },
];

// ---------------------------------------------------------------------------
// Tyranids – faction-specific equipment
// ---------------------------------------------------------------------------
export const tyranidsEquipment: WargearOption[] = [
  { id: 'abhorrent_pheromones', name: 'Abhorrent Pheromones', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['FEAR'], description: 'The model gains the FEAR Keyword. Elite Only.', grantsKeywords: ['FEAR'], restrictedTo: ['ELITE'] },
  { id: 'adrenal_glands', name: 'Adrenal Glands', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: [], description: '+1 DICE on Dash Success Rolls. Gaunt Only.' },
  { id: 'acid_blood', name: 'Acid Blood', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Enemy suffers 1 BM when it causes any BMs against this model in melee. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'acid_maw', name: 'Acid Maw', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: [], description: 'Melee attacks gain ARMOUR PIERCING 1. Gaunt Only.' },
  { id: 'balemind_membrane', name: 'Balemind Membrane', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'Enemies cannot Deny the Witch against this model\'s psychic powers. Psyker Only.' },
  { id: 'bioplasma_discharger', name: 'Bioplasma Discharger', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['FIRE'], description: 'All melee weapons gain the FIRE Keyword. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'bonded_exoskeleton', name: 'Bonded Exoskeleton', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['IMPERVIOUS'], description: 'The model\'s armour gains the IMPERVIOUS Keyword. Elite with -2 or higher Armour modifier only.', restrictedTo: ['ELITE'] },
  { id: 'dermic_symbiosis', name: 'Dermic Symbiosis', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'The model gains NEGATE SHRAPNEL.' },
  { id: 'enhanced_senses', name: 'Enhanced Senses', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: [], description: 'The model can Charge an enemy it cannot see.' },
  { id: 'flesh_hooks', name: 'Flesh Hooks', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'Enemies cannot Retreat while within 1" of this model. Elite or Tyranid Warrior Only.', restrictedTo: ['ELITE'] },
  { id: 'membranous_mobility', name: 'Membranous Mobility', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: '+1 DICE on Climb, Jump, and Diving Charge Success Rolls.' },
  { id: 'metamorphic_regrowth', name: 'Metamorphic Regrowth', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 2, keywords: ['REGENERATE 1'], description: 'At the start of this model\'s Activation, remove 1 BM.' },
  { id: 'temperature_adaptation', name: 'Temperature Adaptation', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['NEGATE FIRE'], description: 'The model gains NEGATE FIRE.' },
  { id: 'toxin_sacs', name: 'Toxin Sacs', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 2, keywords: [], description: 'Melee attacks cause INFECTION MARKERS instead of BMs.' },
  // Campaign Shop
  { id: 'gestation_sac_ty', name: 'Gestation Sac', type: 'equipment', slot: 'equipment', cost: 7, costCurrency: 'glory', limit: 1, keywords: [], description: 'As an Action with a Risky Success Roll, birth warriors. On a success, place two new Hormagaunt models within 1" of this model, each with 2 Scything Talon. They do not count toward Morale but can activate this Turn. Not added to Warband. Can only succeed once per battle. 7 Glory. LIMIT: 1. LARGE Elite Only.', restrictedTo: ['ELITE', 'LARGE'] },
  { id: 'norn_crown_ty', name: 'Norn Crown', type: 'equipment', slot: 'equipment', cost: 8, costCurrency: 'glory', limit: 1, keywords: [], description: 'Allies are Within Synapse Range while within 12" of this model. Each other TYRANID model within 12" has +1 DICE to Hit with all melee attacks. 8 Glory. LIMIT: 1. Warband Leader Only.', restrictedTo: ['LEADER'] },
  { id: 'the_passenger_ty', name: 'The Passenger', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model has +1 DICE to all Dash Success Rolls. 3 Glory. LIMIT: 1.' },
  { id: 'pathogenesis_ty', name: 'Pathogenesis', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model has +1 DICE to Hit with all ranged attacks, and the range of all of its ranged weapons with at least 18" range are increased by 6". 4 Glory. LIMIT: 1.' },
  { id: 'resonance_barb_ty', name: 'Resonance Barb', type: 'equipment', slot: 'equipment', cost: 6, costCurrency: 'glory', limit: 1, keywords: [], description: 'When purchased, choose one Tyranid psychic power costing 7cr or fewer. The equipped model knows the chosen power. In addition, +1 DICE to all PSYCHIC Success Rolls, including attacks. 6 Glory. LIMIT: 1. Psyker Only.' },
  { id: 'spirit_leech_cortex_ty', name: 'Spirit-Leech Cortex', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'When the equipped model takes an enemy Out of Action with a PSYCHIC attack, remove 1 BLOOD MARKER from it. 1 Glory. LIMIT: 1. Psyker Only.' },
  { id: 'dirgeheart_of_kharis', name: 'Dirgeheart of Kharis', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Enemies within 3" of the equipped model treat all of their enemies as if they had the FEAR Keyword. 2 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'maw_claws_of_thyrax', name: "Maw-Claws of Thyrax", type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Whenever the equipped model takes an enemy Out of Action with a melee weapon, remove 1 BLOOD MARKER from it. 2 Glory. LIMIT: 1.' },
  { id: 'ymgarl_factor_ty', name: 'The Ymgarl Factor', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model begins each battle with 2 BLESSING MARKERS. 5 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
];

// ---------------------------------------------------------------------------
// T'au Empire – faction-specific equipment
// ---------------------------------------------------------------------------
export const tauEmpireEquipment: WargearOption[] = [
  { id: 'battle_armour_tau', name: 'Battle Armour', type: 'armor', slot: 'body-armour', cost: 17, keywords: ['-1 INJURY MODIFIER', 'NEGATE SHRAPNEL'], description: '-1 INJURY MODIFIER, NEGATE SHRAPNEL.', statModifiers: { armourSave: -1 } },
  { id: 'shield_generator_tau', name: 'Shield Generator', type: 'armor', slot: 'body-armour', cost: 10, keywords: ['-1 INJURY MODIFIER', 'HELD'], description: '-1 INJURY MODIFIER, HELD. Battlesuit Only.', statModifiers: { armourSave: -1 }, restrictedTo: ['VEHICLE'] },
  { id: 'iridium_armour', name: 'Iridium Armour', type: 'armor', slot: 'body-armour', cost: 3, costCurrency: 'glory', limit: 2, keywords: ['-3 INJURY MODIFIER'], description: 'Armour improves to -3 INJURY MODIFIER. Non-Stealth Battlesuit Only.', statModifiers: { armourSave: -3 }, restrictedTo: ['VEHICLE', 'NOT:STEALTH'] },
  { id: 'air_purifiers_tau', name: 'Air Purifiers', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['NEGATE GAS'], description: 'NEGATE GAS. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'automated_repair_system', name: 'Automated Repair System', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', keywords: ['REGENERATE 1'], description: 'REGENERATE 1. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'battlesuit_support_system', name: 'Battlesuit Support System', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'This model\'s attacks have -1 DICE to Hit when Retreating. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'comms_unit_tau', name: 'Comms Unit', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. While bearer is not Down, friendly models within 4" add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  { id: 'energy_shield_tau', name: 'Energy Shield', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Converts Down results to Minor Hits. Shield Drone or Elite Battlesuit Only.', restrictedTo: ['ELITE', 'VEHICLE'] },
  { id: 'firesight_drone_controller', name: 'Firesight Drone Controller', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'The Sniper Drone in your Warband gains +1 INJURY DICE.' },
  { id: 'hover_drone_tau', name: 'Hover Drone', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['8" FLYING'], description: 'The Ethereal gains 8" FLYING movement. Ethereal Only.', restrictedTo: ['LEADER'] },
  { id: 'kroothawk_flock', name: 'Kroothawk Flock', type: 'equipment', slot: 'equipment', cost: 7, limit: 1, keywords: [], description: 'Ignore Cover for ranged attacks against targets within 6". Elite Kroot Only.', restrictedTo: ['ELITE', 'KROOT'] },
  { id: 'medical_kit_tau', name: 'Medical Kit', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'Remove 1 BM, or stand up an allied model within 1". Non-Battlesuit Only.', restrictedTo: ['NOT:VEHICLE'] },
  { id: 'multispectrum_sensor_suite', name: 'Multispectrum Sensor Suite', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Enemy DEEP STRIKE or INFILTRATOR models must set up 16" or more away from this model.' },
  { id: 'protected_servos_tau', name: 'Protected Servos', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'vectored_manoeuvring_thrusters', name: 'Vectored Manoeuvring Thrusters', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['SKIRMISHER'], description: 'Model gains the SKIRMISHER Keyword. Flying Battlesuit Only.', grantsKeywords: ['SKIRMISHER'], restrictedTo: ['VEHICLE', 'FLYING'] },
  { id: 'weapon_support_system', name: 'Weapon Support System', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'Ignore all attack roll penalties besides Cover, Long Range, and BLOOD MARKERS (including INFECTION and STUN), as well as penalties or limits to range of ranged weapons. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  // Campaign Shop
  { id: 'advanced_em_scrambler', name: 'Advanced EM Scrambler', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Enemy models must be set up at least 16" away from this model when using DEEP STRIKE or INFILTRATOR. As an Action requiring no roll, choose one enemy within 12" this model can see; that enemy cannot be affected or targeted by any ally Ability or Action until the end of the current Turn. 3 Glory. LIMIT: 1. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'borthrod_gland', name: 'Borthrod Gland', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model and each KROOT ally within 6" have +1 DICE to Hit with melee attacks. LIMIT: 1. Elite Kroot Only.', restrictedTo: ['ELITE', 'KROOT'] },
  { id: 'multi_sensory_discouragement_array', name: 'Multi-Sensory Discouragement Array', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Enemy models that charge the equipped model or one of its allies within 3" of it do not add a D6 to their charge roll and must use only their normal movement distance. LIMIT: 1.' },
  { id: 'neuro_empathic_nullifier', name: 'Neuro-Empathic Nullifier', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'As an Action requiring no roll, choose one enemy within 24" this model can see; that enemy cannot activate until your opponent has activated D3 other models, or until there is no choice. LIMIT: 1. Ethereal Only.', restrictedTo: ['LEADER'] },
  { id: 'ohrtus_lantern', name: "Ohr'tu's Lantern", type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['MARKERLIGHT'], description: 'The equipped model applies twice as many Markerlight tokens. LIMIT: 1.' },
  { id: 'puretide_engram_neurochip', name: 'Puretide Engram Neurochip', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: "At the end of the equipped model's Activation, choose one of your models that has not yet activated; that model's Activation begins immediately. Counts as Battlesuit Only for models that can equip only Battlesuit battlekit. LIMIT: 1. Elite Only.", restrictedTo: ['ELITE'] },
  { id: 'seismic_destabiliser', name: 'Seismic Destabiliser', type: 'equipment', slot: 'equipment', cost: 7, costCurrency: 'glory', limit: 1, keywords: [], description: 'As an Action with a Risky Success Roll with +1 DICE, choose any piece of terrain up to 8"×8" within 12" this model can see. That terrain is destroyed and removed from the table. All models inside, touching, or on top of it must immediately roll on the Injury Chart with +1 INJURY DICE; if not taken Out of Action they are placed on the ground in their previous spots. Can only succeed once per battle. 7 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'serenity_tau', name: 'Serenity', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['ICON'], description: 'ICON. While the equipped model is on the battlefield and not Down, you automatically pass all Morale tests. 1 Glory. LIMIT: 1. Ethereal Only.', restrictedTo: ['LEADER'] },
  { id: 'solid_image_projection_unit', name: 'Solid-Image Projection Unit', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls made against the equipped model have -1 INJURY DICE. 4 Glory. LIMIT: 1. Elite Battlesuit Only.', restrictedTo: ['ELITE', 'VEHICLE'] },
];

// ---------------------------------------------------------------------------
// Slanni – faction-specific equipment
// ---------------------------------------------------------------------------
export const slanniEquipment: WargearOption[] = [
  { id: 'energy_field_slanni', name: 'Energy Field', type: 'armor', slot: 'body-armour', cost: 15, keywords: ['-1 INJURY MODIFIER'], description: '-1 INJURY MODIFIER.', statModifiers: { armourSave: -1 } },
  { id: 'ceremonial_armour_slanni', name: 'Ceremonial Armour', type: 'armor', slot: 'body-armour', cost: 35, keywords: ['-2 INJURY MODIFIER', 'HEAVY'], description: '-2 INJURY MODIFIER, HEAVY.', statModifiers: { armourSave: -2 } },
  { id: 'psy_barrier_slanni', name: 'Psy-Barrier', type: 'armor', slot: 'body-armour', cost: 30, keywords: ['-1 INJURY MODIFIER', 'IMPERVIOUS'], description: '-1 INJURY MODIFIER, IMPERVIOUS, Down results become Minor Hits. Psyker Only.', statModifiers: { armourSave: -1 } },
  { id: 'force_shield_slanni', name: 'Force Shield', type: 'armor', slot: 'body-armour', cost: 10, keywords: ['-1 INJURY MODIFIER', 'HELD'], description: '-1 INJURY MODIFIER, HELD, Shield Combo.', statModifiers: { armourSave: -1 } },
  { id: 'astrolith_slanni', name: 'Astrolith', type: 'equipment', slot: 'equipment', cost: 20, limit: 1, keywords: ['HELD'], description: 'HELD. Once per Turn, +1 DICE on psychic powers for friendly models within 6". Start of Activation: remove 1 BM from bearer.' },
  { id: 'gravity_disruptor_slanni', name: 'Gravity Disruptor', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: 'Automatically succeed on Climb and Jump actions, no injury from falling, +1 DICE on Diving Charges. LIMIT:4.' },
  { id: 'hover_palanquin_slanni', name: 'Hover Palanquin', type: 'equipment', slot: 'equipment', cost: 30, limit: 3, keywords: ['LARGE', 'VEHICLE', '6" FLYING'], description: 'LARGE, VEHICLE, 6" FLYING, -1 INJURY MODIFIER. Psyker Only.' },
  { id: 'slanni_helmet', name: 'Slanni Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'stealth_field_slanni', name: 'Stealth Field', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['INFILTRATOR', 'STEALTH'], description: 'Model gains INFILTRATOR and STEALTH Keywords. Skirmisher Only.', grantsKeywords: ['INFILTRATOR', 'STEALTH'] },
  { id: 'inoculation_slanni', name: 'Inoculation', type: 'equipment', slot: 'equipment', cost: 3, keywords: ['NEGATE GAS'], description: 'NEGATE GAS. Cannot be removed or sold once purchased.' },
  { id: 'musical_instrument_slanni', name: 'Musical Instrument', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. Any friendly models within 4" of the musician who is not Down can add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  { id: 'troop_icon_slanni', name: 'Troop Icon', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON', 'NEGATE FEAR'], description: 'HELD, ICON. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1.', grantsKeywords: ['ICON'] },
  // Campaign Shop
  { id: 'bloodrage_pendant_slanni', name: 'Bloodrage Pendant', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'When the equipped model makes a Melee Attack, it can make an additional Melee Attack with -1 DICE to Hit using a single melee weapon it is equipped with. -2 DICE instead if TWO-HANDED. 5 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'cloak_of_feathers_slanni', name: 'Cloak of Feathers', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['FLYING'], description: 'The equipped model gains 10" movement and FLYING. 4 Glory. LIMIT: 1. Priest or Skirmisher Only.' },
  { id: 'crystalline_skull_slanni', name: 'Crystalline Skull', type: 'equipment', slot: 'equipment', cost: 6, costCurrency: 'glory', limit: 1, keywords: [], description: 'Track the number of psychic powers successfully cast (max 10). Once per battle, as an Action with no roll, if at least one psychic power was cast, choose one enemy within 12". That enemy rolls on the Injury table with +1 INJURY DICE for every 2 psychic powers cast. 6 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'incandescent_rectrices_slanni', name: 'Incandescent Rectrices', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['REGENERATE 1'], description: 'REGENERATE 1. 3 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'prism_of_amyntok_slanni', name: 'Prism of Amyntok', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'As an Action with a Success Roll, choose one enemy within 12" this model can see. On a success, that enemy gains 1 BLOOD MARKER. Can only succeed once per battle. 1 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'relocation_orb_slanni', name: 'Relocation Orb', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once per battle, when the equipped model suffers 1 or more BLOOD MARKERS, remove it from the battlefield then place it within 12" of its previous position, at least 3" away from all enemies. 4 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'throne_of_lost_gods_slanni', name: 'Throne of the Lost Gods', type: 'equipment', slot: 'equipment', cost: 8, costCurrency: 'glory', limit: 1, keywords: ['LARGE', 'VEHICLE', 'FLYING'], description: 'Counts as a Hover Palanquin, including for limits. +4" movement. Injury rolls against this model have -1 INJURY DICE. 8 Glory. LIMIT: 1. Mage Chief Only.', restrictedTo: ['LEADER'] },
  { id: 'zoetic_dial_slanni', name: 'Zoetic Dial', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'At the start of the battle, secretly note a Turn number besides 1. At the start of that Turn, reveal your choice and remove all BLOOD MARKERS from the equipped model. 3 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
];

// ---------------------------------------------------------------------------
// Orks – faction-specific equipment
// ---------------------------------------------------------------------------
export const orksEquipment: WargearOption[] = [
  { id: 'eavy_armour_orks', name: "'Eavy Armour", type: 'armor', slot: 'body-armour', cost: 10, keywords: ['-1 INJURY MODIFIER'], description: '-1 INJURY MODIFIER. Counts as D3 for charge distance unless STRONG.', statModifiers: { armourSave: -1 } },
  { id: 'ded_ard_armour', name: "Ded 'Ard Armour", type: 'armor', slot: 'body-armour', cost: 3, costCurrency: 'glory', limit: 2, keywords: ['-2 INJURY MODIFIER', 'HEAVY'], description: '-2 INJURY MODIFIER, HEAVY. Elite or Nob Only.', statModifiers: { armourSave: -2 }, restrictedTo: ['ELITE'] },
  { id: 'mega_armour_orks', name: 'Mega Armour', type: 'armor', slot: 'body-armour', cost: 50, limit: 2, keywords: ['-3 INJURY MODIFIER', 'HEAVY', 'VEHICLE', 'LARGE'], description: '-3 INJURY MODIFIER, HEAVY, VEHICLE, LARGE. Down results become Minor Hits. Elite or Nob Only.', grantsKeywords: ['VEHICLE', 'LARGE'], statModifiers: { armourSave: -3 }, restrictedTo: ['ELITE'] },
  { id: 'ammo_runt', name: 'Ammo Runt', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['ASSISTANT'], description: '+1 DICE to Hit with all attacks. ASSISTANT.' },
  { id: 'ard_hat_orks', name: "'Ard Hat", type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'bosspole_orks', name: 'Bosspole', type: 'equipment', slot: 'equipment', cost: 20, limit: 1, keywords: [], description: 'Unless this model is Down, friendly models within 4" can add +1 DICE to their Dash Success Rolls. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'distraction_grot', name: 'Distraction Grot', type: 'equipment', slot: 'equipment', cost: 3, keywords: ['CONSUMABLE', 'ASSISTANT'], description: 'Once per battle: -1 DICE to enemy Injury roll against this model. Kommando Only.' },
  { id: 'grot_gunner', name: 'Grot Gunner', type: 'equipment', slot: 'equipment', cost: 20, keywords: ['ASSISTANT'], description: '+1 Ranged Skill with Warbike\'s Built-In Shoota. Warbike Only.' },
  { id: 'grot_oiler', name: 'Grot Oiler', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['ASSISTANT'], description: 'Once per battle: remove 1 BM. Mega Armour or Deff Dread Only.' },
  { id: 'grot_orderly', name: 'Grot Orderly', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['ASSISTANT'], description: 'Once per battle: +2 DICE to Sawbonez roll. Painboss Only.' },
  { id: 'iron_gob_orks', name: 'Iron Gob', type: 'equipment', slot: 'equipment', cost: 15, limit: 3, keywords: ['FEAR'], description: 'Model gains the FEAR Keyword. Elite or Nob Only.', grantsKeywords: ['FEAR'], restrictedTo: ['ELITE'] },
  { id: 'jump_rokkit_orks', name: 'Jump Rokkit', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'Once per Activation: move 12" FLYING (Risky). Stormboy Only.' },
  { id: 'personal_tellyporta', name: 'Personal Tellyporta', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['DEEP STRIKE'], description: 'Model gains the DEEP STRIKE Keyword. Mek Only.', grantsKeywords: ['DEEP STRIKE'] },
  { id: 'squig_bomb', name: 'Squig Bomb', type: 'equipment', slot: 'equipment', cost: 20, keywords: ['BLAST 3"'], description: 'Detonate for a BLAST 3" explosion. Squig Only.' },
  { id: 'waaagh_banner_orks', name: "Waaagh! Banner", type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON', 'NEGATE FEAR'], description: 'HELD, ICON. While bearer is not Down, friendly ORKS models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'], grantsKeywords: ['ICON'] },
  { id: 'warbike_orks', name: 'Warbike', type: 'equipment', slot: 'equipment', cost: 45, limit: 3, keywords: ['LARGE', 'VEHICLE', '10" movement'], description: 'LARGE, VEHICLE, 10" movement. Built-In Shoota. Drive-by Dakka ability.' },
  { id: 'cyberteknika_cranial_orks', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_orks', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_orks', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_orks', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_torsonic_orks', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Injuries against this model are rolled with -1 DICE. Ignores Trauma penalties (prevents gaining): Chest Wound. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_vascular_orks', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to all Dash Success Rolls. Ignores Trauma penalties (prevents gaining): Severe Nerve Damage, Shell-Shocked. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  // Campaign Shop
  { id: 'beasthide_mantle_orks', name: 'Beasthide Mantle', type: 'armor', slot: 'body-armour', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['-1 INJURY MODIFIER', 'STEALTH'], description: '-1 INJURY MODIFIER (stacking with armour up to -3), STEALTH. 4 Glory. LIMIT: 1. Da Big Hunt Only.', grantsKeywords: ['STEALTH'], statModifiers: { armourSave: -1 } },
  { id: 'da_krushin_armour', name: "Da Krushin' Armour", type: 'armor', slot: 'body-armour', cost: 7, costCurrency: 'glory', limit: 1, keywords: ['-3 INJURY MODIFIER', 'HEAVY', 'VEHICLE', 'LARGE'], description: "Counts as Mega Armour. When the wearer successfully Charges one or more enemies, those enemies each suffer 1 BLOOD MARKER. 7 Glory. LIMIT: 1. Elite Only.", grantsKeywords: ['VEHICLE', 'LARGE'], statModifiers: { armourSave: -3 }, restrictedTo: ['ELITE'] },
  { id: 'scorched_gitbonez_orks', name: 'Scorched Gitbonez', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: '+1 DICE to Hit with PSYCHIC attacks. When suffering Perils of the Warp, reroll the result once. 3 Glory. LIMIT: 1. Psyker Only.' },
  { id: 'supa_cybork_body_orks', name: 'Supa-Cybork Body', type: 'equipment', slot: 'equipment', cost: 6, costCurrency: 'glory', limit: 1, keywords: ['PERMANENT'], description: 'PERMANENT. Has the benefits of Cranial, Motive, Ocular, Sindexterous, Torsonic, and Vascular Cyberteknika. 6 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'gitstoppa_rounds_orks', name: 'Gitstoppa Rounds', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 2, keywords: ['AMMUNITION'], description: 'AMMUNITION (CRITICAL, VICIOUS 10). Shoota, Slugga, Twin Slugga, Big Shoota, or Dakkagun only. Not CONSUMABLE. 1 Glory. LIMIT: 2.' },
  { id: 'wazgit_kopper_skullkap', name: "Wazgit's Kopper Skullkap", type: 'equipment', slot: 'headgear', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'VICIOUS 11 with Attack psychic powers. On a Critical Hit with an Attack psychic power, repeat the attack once. 4 Glory. LIMIT: 1. Psyker Only.' },
];

// ---------------------------------------------------------------------------
// Necrons – faction-specific equipment
// ---------------------------------------------------------------------------
export const necronsEquipment: WargearOption[] = [
  { id: 'dispersion_shield_necrons', name: 'Dispersion Shield', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['HELD', 'COVER'], description: 'HELD, COVER, Shield Combo. Royal Warden or Immortal Only.' },
  { id: 'engrammatic_entangler', name: 'Engrammatic Entangler', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', keywords: ['CONSUMABLE'], description: 'Remove all Battle Scars from one Elite model between battles. CONSUMABLE.' },
  { id: 'gravity_displacement_pack', name: 'Gravity Displacement Pack', type: 'equipment', slot: 'equipment', cost: 25, keywords: ['10" FLYING'], description: '10" FLYING movement. Lychguard Only.' },
  { id: 'heart_of_darkness_necrons', name: 'Heart of Darkness', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['REGENERATE 1'], description: 'REGENERATE 1. Elite Only.' },
  { id: 'canoptek_cloak', name: 'Canoptek Cloak', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: 'Once per battle: +3" to this model\'s movement. Cryptek Only.' },
  { id: 'nebuloscope', name: 'Nebuloscope', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: 'Ranged attacks ignore Cover. Tomb Blade Only.' },
  { id: 'necrodermal_plating', name: 'Necrodermal Plating', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'phylactery_necrons', name: 'Phylactery', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', keywords: [], description: 'While this model is Reanimating, injury rolls do not gain the additional +1 INJURY DICE and IGNORE ARMOUR against it (the effects of being Down and other normal injury effects still apply). Leader Only.' },
  { id: 'plasmacyte_accelerator', name: 'Plasmacyte Accelerator', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Once per battle: +2 DICE to one attack or Dash Success Roll.' },
  { id: 'plasmacyte_reanimator', name: 'Plasmacyte Reanimator', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Once per battle: force a failed Reanimate roll to succeed. 10 credits, LIMIT: 1, Elite Only.' },
  { id: 'shadowloom_necrons', name: 'Shadowloom', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: '-1 DICE to Hit for ranged attacks against this model. Tomb Blade Only.' },
  { id: 'shieldvanes_necrons', name: 'Shieldvanes', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['-2 INJURY MODIFIER'], description: 'Armour improves to -2 INJURY MODIFIER, but -2" movement. Tomb Blade Only.' },
  { id: 'tachyon_arrow_necrons', name: 'Tachyon Arrow', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['CONSUMABLE', 'IGNORE ARMOUR'], description: '48" ranged attack with IGNORE ARMOUR and +1 INJURY DICE. Once per battle. Necron Lord Only.' },
  { id: 'translocation_shroud', name: 'Translocation Shroud', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', keywords: [], description: '+1 DICE to Dash Success Rolls. Can move through terrain and models when Dashing. Necron Lord Only.' },
  // Campaign Shop
  { id: 'infinity_mantle_nec', name: 'Infinity Mantle', type: 'armor', slot: 'body-armour', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['-1 INJURY DICE'], description: 'Injury rolls against the wearer have -1 INJURY DICE. 4 Glory. LIMIT: 1. Necron Lord Only.', restrictedTo: ['ELITE'] },
  { id: 'nanoscarab_casket_nec', name: 'Nanoscarab Casket', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model does not roll on the Elite Trauma table when it otherwise would. It cannot gain Battle Scars or Traumas in any other way. 4 Glory. LIMIT: 1.' },
  { id: 'resurrection_orb_nec', name: 'Resurrection Orb', type: 'equipment', slot: 'equipment', cost: 7, costCurrency: 'glory', keywords: [], description: 'Once per battle, as an Action (no Success Roll required), each friendly Reanimating NECRON model within 18" is no longer Reanimating and stands up. 7 Glory. Necron Lord Only.', restrictedTo: ['ELITE'] },
  { id: 'sovereign_coronel_nec', name: 'Sovereign Coronel', type: 'equipment', slot: 'headgear', cost: 6, costCurrency: 'glory', limit: 1, keywords: [], description: 'Other friendly NECRON models within 9" have +1 DICE to Hit with all attacks. 6 Glory. LIMIT: 1. Necron Lord Only.', restrictedTo: ['ELITE'] },
  { id: 'transdimensional_shroud_nec', name: 'Transdimensional Shroud', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Ranged attacks made against the equipped model have -1 DICE to Hit. 3 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'vanquishers_mask_nec', name: "Vanquisher's Mask", type: 'equipment', slot: 'headgear', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Melee attacks made against the wearer have -1 DICE to Hit. 2 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
];

// ---------------------------------------------------------------------------
// Leagues of Votann – faction-specific equipment
// ---------------------------------------------------------------------------
export const leaguesOfVotannEquipment: WargearOption[] = [
  { id: 'ancestral_crest', name: 'Ancestral Crest', type: 'equipment', slot: 'headgear', cost: 4, costCurrency: 'glory', limit: 1, keywords: [], description: 'This model starts each battle with 2 BLESSING MARKERS. Elite Only.' },
  { id: 'grey_crest', name: 'Grey Crest', type: 'equipment', slot: 'headgear', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'All attacks against this model have -1 DICE to Hit. Elite Only.' },
  { id: 'preymark_crest', name: 'Preymark Crest', type: 'equipment', slot: 'headgear', cost: 10, limit: 1, keywords: [], description: 'Ignore Long Range penalties for this model and VOTANN allies within 6". Elite or Steeljack Only.' },
  { id: 'rampart_crest', name: 'Rampart Crest', type: 'equipment', slot: 'headgear', cost: 20, limit: 1, keywords: [], description: '-1 DICE on Injury rolls against this model. Elite Only.' },
  { id: 'teleport_crest', name: 'Teleport Crest', type: 'equipment', slot: 'headgear', cost: 10, limit: 3, keywords: ['DEEP STRIKE'], description: 'Model gains the DEEP STRIKE Keyword. Elite or Hearthguard Only.', grantsKeywords: ['DEEP STRIKE'] },
  { id: 'weavefield_crest', name: 'Weavefield Crest', type: 'equipment', slot: 'headgear', cost: 15, keywords: [], description: 'Down results become Minor Hits for this model and allies within 6". Elite or Hearthguard Only.' },
  { id: 'combat_helmet_votann', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'exoarmour_grenade_launcher', name: 'Exoarmour Grenade Launcher', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'Increases Frag and Krak Grenade range by 4". Hearthguard Only.' },
  { id: 'mass_driver_accelerators', name: 'Mass Driver Accelerators', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'Roll 2D6 for charge distance, take the highest. Hearthguard Only.' },
  { id: 'multispectral_visor_votann', name: 'Multispectral Visor', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'Ignore all attack roll penalties besides Cover, Long Range, and BLOOD MARKERS (including INFECTION and STUN), as well as penalties or limits to range of ranged weapons.' },
  { id: 'rollbar_searchlight', name: 'Rollbar Searchlight', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: 'Ignore Long Range penalties. Pioneer Only.' },
  { id: 'scope_votann', name: 'Scope', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Negates the penalty for Long Range if the model has not moved during this Activation. Only usable with weapons that have the Scope property. LIMIT: 1.' },
  { id: 'vox_unit_votann', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. While bearer is not Down, friendly models within 4" add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  // Campaign Shop
  { id: 'grudge_end_votann', name: "Grudge's End", type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: "At the start of each battle, choose one Boltgun or Bolt Pistol the equipped model is wielding. That weapon has +1 INJURY DICE and ARMOUR PIERCING 1 against enemies with at least 1 Grudge Token until end of battle. 2 Glory. LIMIT: 1." },
  { id: 'kahyrm_war_plate_votann', name: "Kâhyrm's War Plate", type: 'armor', slot: 'body-armour', cost: 9, costCurrency: 'glory', limit: 1, keywords: ['-2 INJURY MODIFIER', 'TOUGH'], description: 'Counts as Power Armour, providing -2 INJURY MODIFIER. The equipped model gains the TOUGH Keyword. 9 Glory. LIMIT: 1. Elite Only.', grantsKeywords: ['TOUGH'], statModifiers: { armourSave: -2 }, restrictedTo: ['ELITE'] },
  { id: 'recyc_converter_votann', name: 'Recyc Converter', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'When the equipped model takes an enemy Out of Action with a Volkanite Disintegrator, Forgestar, Ion Blaster, or Grav Gun, gain Resources based on the enemy type. 2 Glory. LIMIT: 1.' },
  { id: 'thyrikite_plate_votann', name: 'Thyrikite Plate', type: 'armor', slot: 'body-armour', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['-3 INJURY MODIFIER'], description: '-3 INJURY MODIFIER. 4 Glory. LIMIT: 1.', statModifiers: { armourSave: -3 } },
  { id: 'warpestryk_votann', name: "Wârpestryk", type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['DEEP STRIKE'], description: 'DEEP STRIKE. Once during each of its Activations, when the equipped model moves, it can teleport, ignoring all terrain and models in between. Still must Retreat to leave melee and Charge to enter melee. 3 Glory. LIMIT: 1. Deep Strike Only.', grantsKeywords: ['DEEP STRIKE'] },
  { id: 'wayfarers_grace_votann', name: "Wayfarer's Grace", type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['REGENERATE 1'], description: 'REGENERATE 1. 3 Glory. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'troop_flag_votann', name: 'Troop Flag', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'ICON'], description: 'HELD. While bearer is not Down, friendly models within 8" are immune to FEAR and the bearer counts as fulfilling any warband-size requirement for mission objectives. LIMIT: 1.', grantsKeywords: ['ICON'] },
];

// ---------------------------------------------------------------------------
// Harlequins – faction-specific equipment
// ---------------------------------------------------------------------------
export const harlequinsEquipment: WargearOption[] = [
  { id: 'holo_suit', name: 'Holo-Suit', type: 'armor', slot: 'body-armour', cost: 10, keywords: ['-1 DICE to Hit (attacks)'], description: 'All attacks against this model have -1 DICE to Hit.', statModifiers: { armourSave: 0 } },
  { id: 'bio_explosive_ammunition', name: 'Bio-Explosive Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['CONSUMABLE', 'BLAST 2"'], description: 'When a target is taken Out of Action, it explodes as a BLAST 2" SHRAPNEL attack. For Shuriken weapons only.' },
  { id: 'flip_belt_harlequins', name: 'Flip Belt', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'Automatically succeed on Climb and Jump actions, no injury from falling, +1 DICE on Diving Charges.' },
  // Campaign Shop
  { id: 'laughing_god_eye_harlequins', name: "Laughing God's Eye", type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls from attacks that hit automatically, or from anything other than an attack, against the bearer and allies within 6" have -1 INJURY DICE. 3 Glory. LIMIT: 1.' },
  { id: 'mask_of_secrets_harlequins', name: 'Mask of Secrets', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'Enemy models within 6" cannot benefit from any +DICE to their Success Rolls besides Ranged Skill, Melee Skill, and PSYKER X, nor can Injuries they cause benefit from any +DICE besides those from their weapons. 5 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'raiment_of_laughing_god', name: 'Raiment of the Laughing God', type: 'equipment', slot: 'equipment', cost: 9, costCurrency: 'glory', limit: 1, keywords: [], description: '+1 DICE to all Success Rolls. At the start of the battle, when rolling Luck of the Laughing God, reroll any number of dice once. 9 Glory. LIMIT: 1. No Pivotal Role Upgrade Only.' },
  { id: 'starmist_raiment_harlequins', name: 'Starmist Raiment', type: 'armor', slot: 'body-armour', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['-2 INJURY MODIFIER'], description: '-2 INJURY MODIFIER. 4 Glory. LIMIT: 1.', statModifiers: { armourSave: -2 } },
  { id: 'suit_of_hidden_knives', name: 'Suit of Hidden Knives', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Equipped with an extra Blade at no cost. Whenever taking the Fight Action, make an extra attack with this Blade with no off-hand penalties. 3 Glory. LIMIT: 1.' },
];

// ---------------------------------------------------------------------------
// Genestealer Cults – faction-specific equipment
// ---------------------------------------------------------------------------
export const genestealerCultsEquipment: WargearOption[] = [
  { id: 'atalan_bike', name: 'Atalan Bike', type: 'equipment', slot: 'equipment', cost: 25, limit: 3, keywords: ['LARGE', 'VEHICLE', '10" movement'], description: 'LARGE, VEHICLE, 10" movement. Demolition Run and Outrider abilities. Neophyte Only.' },
  { id: 'atalan_quad', name: 'Atalan Quad', type: 'equipment', slot: 'equipment', cost: 45, limit: 1, keywords: ['LARGE', 'VEHICLE', '-1 INJURY MODIFIER'], description: 'LARGE, VEHICLE, 10" movement, -1 INJURY MODIFIER (does not stack with shield). Built-In Weapon: rider can equip up to 1 additional non-Grenade ranged weapon at no hand cost. Turbo-Boost: +1 DICE to Dash, cannot climb sheer surfaces. Rider has only one hand to carry other weapons (two-handed weapons allowed via Shield Combo). Cannot be chosen for Cult Ambush. Neophyte Only.', occupiesHands: 1, allowsShieldComboTwoHanded: true, grantsExtraRangedSlots: 1 },
  { id: 'camo_cloak_gsc', name: 'Camo Cloak', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['STEALTH'], description: 'A model equipped with a Camo Cloak gains the STEALTH Keyword. Long Range attacks against this model suffer an additional -1 DICE to Hit. Attacks that ignore Long Range penalties also ignore STEALTH.', grantsKeywords: ['STEALTH'] },
  { id: 'cult_icon_gsc', name: 'Cult Icon', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'LEADER'], description: 'HELD. As an Action with a Success Roll with +1 DICE, the carrier can attempt to heal itself or a friendly model within 6". If it succeeds, remove 1 BLOOD MARKER from that model, or 3 BLOOD MARKERS if the Success Roll was a Critical Success.' },
  { id: 'psychic_familiar_gsc', name: 'Psychic Familiar', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'Once per battle, when the owner makes a PSYCHIC attack or takes a PSYCHIC Success Roll, it can add +1 DICE to that roll.' },
  { id: 'combat_helmet_gsc', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'photo_goggles_gsc', name: 'Photo Goggles', type: 'equipment', slot: 'equipment', cost: 3, keywords: [], description: 'The equipped model ignores the STEALTH Keyword when making ranged attacks. In addition, the range of its weapons cannot be reduced.' },
  { id: 'scope_gsc', name: 'Scope', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 2, keywords: [], description: 'Negates the penalty for Long Range if the model has not moved during this Activation. Only usable with weapons that have the Scope property. LIMIT: 1.' },
  { id: 'vox_unit_gsc', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. While bearer is not Down, friendly models within 4" add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  { id: 'cyberteknika_cranial_gsc', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_gsc', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_gsc', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_gsc', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  // Campaign Shop
  { id: 'amulet_of_voidwyrm_gsc', name: 'Amulet of the Voidwyrm', type: 'equipment', slot: 'equipment', cost: 7, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once per battle, before an Injury roll for this model, you can cause that roll to automatically be a Minor Hit. This choice is made after BLOOD MARKERS are spent. 7 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'crouchling_gsc', name: 'Crouchling', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'Whenever the owner makes a PSYCHIC attack or takes a PSYCHIC Success Roll, it can add +1 DICE to that roll. Cannot be combined with a Psychic Familiar. 5 Glory. LIMIT: 1.' },
  { id: 'crown_of_ascendancy_gsc', name: 'Crown of Ascendancy', type: 'equipment', slot: 'headgear', cost: 6, costCurrency: 'glory', limit: 1, keywords: [], description: 'The first psychic power used during each of the Patriarch\'s Activations does not count towards the Using Multiple Powers rules. While this model is not Out of Action, you have +1 DICE to Morale tests. 6 Glory. LIMIT: 1. Patriarch Only.', restrictedTo: ['ELITE'] },
  { id: 'elixir_of_dark_vistas_gsc', name: 'Elixir of Dark Vistas', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['CONSUMABLE'], description: 'The bearer earns an additional 2 XP at the end of the battle. CONSUMABLE. 1 Glory. LIMIT: 1. Leader Only.' },
  { id: 'pennant_of_ascension_gsc', name: 'Pennant of Ascension', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'Friendly models within 6" of the bearer have +1 DICE to Hit with all attacks. 5 Glory. LIMIT: 1. Model with Cult Icon Only.' },
  { id: 'pervasion_veil_gsc', name: 'Pervasion Veil', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['FLYING', '8" MOVEMENT'], description: 'The bearer gains a movement speed of 8" and FLYING. 3 Glory. LIMIT: 1. Non-Patriarch, Non-Vehicle Only.', grantsKeywords: ['FLYING'] },
  { id: 'stratodais_gsc', name: 'Stratodais', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'The bearer has +1 DICE and can move up to two Cult Ambush markers when using its Cult Infiltration Ability. 1 Glory. LIMIT: 1. Nexos Only.' },
  { id: 'unwilling_orb_gsc', name: 'Unwilling Orb', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The bearer can Deny the Witch an additional time each Turn. The first Deny the Witch does not count towards Using Multiple Powers for that Turn. 2 Glory. LIMIT: 1. Psyker Only.', restrictedTo: ['ELITE'] },
  { id: 'voice_of_liberator_gsc', name: 'Voice of the Liberator', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Increase the range of the bearer\'s Voice of New Truths Ability by 4". 3 Glory. LIMIT: 1. Clamavus Only.', restrictedTo: ['ELITE'] },
];

// ---------------------------------------------------------------------------
// Drukhari – faction-specific equipment
// ---------------------------------------------------------------------------
export const drukhariEquipment: WargearOption[] = [
  { id: 'kabalite_armour', name: 'Kabalite Armour', type: 'armor', slot: 'body-armour', cost: 15, keywords: ['-1 INJURY MODIFIER'], description: '-1 INJURY MODIFIER.', statModifiers: { armourSave: -1 } },
  { id: 'wychsuit', name: 'Wychsuit', type: 'armor', slot: 'body-armour', cost: 20, keywords: ['-1 INJURY MODIFIER', 'IMPERVIOUS'], description: '-1 INJURY MODIFIER, IMPERVIOUS. Elite or Wych Only.', statModifiers: { armourSave: -1 } },
  { id: 'incubus_warsuit', name: 'Incubus Warsuit', type: 'armor', slot: 'body-armour', cost: 40, keywords: ['-2 INJURY MODIFIER'], description: '-2 INJURY MODIFIER. Elite or Incubus Only.', statModifiers: { armourSave: -2 } },
  { id: 'ghostplate_armour', name: 'Ghostplate Armour', type: 'armor', slot: 'body-armour', cost: 50, keywords: ['-3 INJURY MODIFIER'], description: '-3 INJURY MODIFIER. Archon Only.', statModifiers: { armourSave: -3 } },
  { id: 'antitox_drukhari', name: 'Antitox', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['NEGATE GAS'], description: 'NEGATE GAS.' },
  { id: 'drukhari_helmet', name: 'Drukhari Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'goblet_of_spite', name: 'Goblet of Spite', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Charging enemies must target this model instead of others. Succubus or Wych Only.' },
  { id: 'gruesome_talismens', name: 'Gruesome Talismens', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Once per battle: do not end Activation on a failed Risky roll.' },
  { id: 'hellion_skyboard', name: 'Hellion Skyboard', type: 'equipment', slot: 'equipment', cost: 30, limit: 2, keywords: ['10" FLYING'], description: '10" FLYING movement. Succubus or Wych Only.' },
  { id: 'hell_mask_drukhari', name: 'Hell Mask', type: 'equipment', slot: 'headgear', cost: 7, limit: 2, keywords: ['FEAR'], description: 'Model gains the FEAR Keyword. Wrack Only.', grantsKeywords: ['FEAR'] },
  { id: 'scourge_wings', name: 'Scourge Wings', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['8" FLYING', 'INFILTRATOR', 'SKIRMISHER'], description: '8" FLYING, INFILTRATOR, SKIRMISHER. Archon or Kabalite Only.', grantsKeywords: ['INFILTRATOR', 'SKIRMISHER'] },
  { id: 'shadow_field_drukhari', name: 'Shadow Field', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 2, keywords: [], description: 'Down results become Minor Hits. Elite Only.' },
  { id: 'soul_seeker_ammunition', name: 'Soul Seeker Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE', 'IGNORE COVER'], description: 'AMMUNITION (IGNORE COVER) for Splinter weapons. CONSUMABLE.' },
  { id: 'tormentor_helm', name: 'Tormentor Helm', type: 'equipment', slot: 'headgear', cost: 12, keywords: ['IGNORE LONG RANGE'], description: '8", ASSAULT, IGNORE LONG RANGE, SHRAPNEL, THROWN. Built-in thrown weapon. Incubus Only.' },
  // Campaign Shop
  { id: 'casket_of_suffering_drukhari', name: 'Casket of Suffering', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls made against the bearer have -1 INJURY DICE. 3 Glory. LIMIT: 1. Non-Haemonculus, Non-Wrack Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'helm_of_spite_drukhari', name: 'Helm of Spite', type: 'equipment', slot: 'headgear', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model can Deny the Witch as if it had PSYKER 2. If it succeeds, the enemy PSYKER automatically suffers Perils of the Warp (if it would already, it suffers them only once). 2 Glory. LIMIT: 1.' },
  { id: 'master_clone_field_drukhari', name: 'Master Clone Field', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: [], description: 'All attacks made against the wearer have -1 DICE to Hit. 5 Glory. LIMIT: 1.' },
  { id: 'nightmare_doll_drukhari', name: 'Nightmare Doll', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['-1 INJURY MODIFIER'], description: '-1 INJURY MODIFIER. 3 Glory. LIMIT: 1. Haemonculus Only.', restrictedTo: ['ELITE'] },
];

// ---------------------------------------------------------------------------
// Aeldari – faction-specific equipment
// ---------------------------------------------------------------------------
export const aeldariEquipment: WargearOption[] = [
  { id: 'aeldari_helmet', name: 'Aeldari Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'banshee_mask', name: 'Banshee Mask', type: 'equipment', slot: 'headgear', cost: 10, keywords: ['FEAR'], description: 'Model gains the FEAR Keyword. Autarch or Howling Banshee Only.', grantsKeywords: ['FEAR'] },
  { id: 'blood_of_isha', name: 'Blood of Isha', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['REGENERATE 1'], description: 'REGENERATE 1. Elite Only.' },
  { id: 'mesh_armour_aeldari', name: 'Mesh Armour', type: 'armor', slot: 'body-armour', cost: 15, keywords: ['-1 INJURY MODIFIER'], description: '-1 INJURY MODIFIER.', statModifiers: { armourSave: -1 } },
  { id: 'aspect_armour', name: 'Aspect Armour', type: 'armor', slot: 'body-armour', cost: 40, keywords: ['-2 INJURY MODIFIER'], description: '-2 INJURY MODIFIER. Elite or Aspect Warrior Only.', statModifiers: { armourSave: -2 } },
  { id: 'wraithbone_armour', name: 'Wraithbone Armour', type: 'armor', slot: 'body-armour', cost: 50, keywords: ['-2 INJURY MODIFIER', 'IMPERVIOUS'], description: '-2 INJURY MODIFIER, IMPERVIOUS. Elite Psyker Only.', statModifiers: { armourSave: -2 } },
  { id: 'celestial_shield_aeldari', name: 'Celestial Shield', type: 'armor', slot: 'body-armour', cost: 10, keywords: ['-1 INJURY MODIFIER', 'HELD'], description: '-1 INJURY MODIFIER, HELD, Shield Combo. Guardian Only.', statModifiers: { armourSave: -1 } },
  { id: 'force_shield_aeldari', name: 'Force Shield', type: 'armor', slot: 'body-armour', cost: 10, keywords: ['HELD'], description: 'HELD, Shield Combo. Down results become Minor Hits. Wraith Only.' },
  { id: 'cloak_of_shadow', name: 'Cloak of Shadow', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['STEALTH'], description: 'Model gains the STEALTH Keyword. Warlock Only.', grantsKeywords: ['STEALTH'] },
  { id: 'flip_belt_aeldari', name: 'Flip Belt', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: [], description: 'Automatically succeed on Climb and Jump actions, no injury from falling, +1 DICE on Diving Charges.' },
  { id: 'ghosthelm_aeldari', name: 'Ghosthelm', type: 'equipment', slot: 'headgear', cost: 5, keywords: [], description: 'Negate Perils of the Warp on a 4+. Psyker Only.' },
  { id: 'guardian_platform', name: 'Guardian Platform', type: 'equipment', slot: 'equipment', cost: 20, limit: 1, keywords: ['LARGE', 'TOUGH'], description: 'LARGE, TOUGH. Guardian can choose Serpent\'s Scale or Weapon Platform. Non-Ranger Guardian Only.' },
  { id: 'isitha_kasra', name: 'Isitha Kasra', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. Any friendly models within 4" of the musician who is not Down can add +1 DICE to their Dash Success Rolls. LIMIT: 1.' },
  { id: 'jetbike_aeldari', name: 'Jetbike', type: 'equipment', slot: 'equipment', cost: 25, keywords: ['10" FLYING', 'VEHICLE', 'MOUNT'], description: '10" FLYING movement, VEHICLE, MOUNT. Shining Spear Only.' },
  { id: 'jetbike_shimmershield', name: 'Jetbike Shimmershield', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Down results become Minor Hits. Shining Spear Only.' },
  { id: 'mandiblasters_aeldari', name: 'Mandiblasters', type: 'equipment', slot: 'equipment', cost: 7, keywords: [], description: 'Enemies that Charge this model gain 1 BM before combat. Striking Scorpion Only.' },
  { id: 'shimmershield_aeldari', name: 'Shimmershield', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Down results become Minor Hits. Elite Only.' },
  { id: 'spirit_stone_aeldari', name: 'Spirit Stone', type: 'equipment', slot: 'equipment', cost: 6, costCurrency: 'glory', limit: 1, keywords: [], description: 'The first psychic power used each Activation does not count towards the limit. Psyker Only.' },
  { id: 'swooping_hawk_wings', name: 'Swooping Hawk Wings', type: 'equipment', slot: 'equipment', cost: 25, keywords: ['10" FLYING'], description: '10" FLYING movement. Autarch or Swooping Hawk Only.' },
  // Campaign Shop Equipment
  { id: 'aegis_of_eldanesh_aeldari', name: 'Aegis of Eldanesh', type: 'armor', slot: 'body-armour', cost: 8, costCurrency: 'glory', limit: 1, keywords: ['-2 INJURY MODIFIER', 'IMPERVIOUS'], description: '-2 INJURY MODIFIER, IMPERVIOUS. In addition, all Injury rolls against the wearer have -1 INJURY DICE. 8 Glory. LIMIT: 1. Autarch Only.', statModifiers: { armourSave: -2 }, restrictedTo: ['ELITE'] },
  { id: 'banner_of_asuryan_aeldari', name: 'Banner of Asuryan', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['ICON'], description: 'ICON. At the start of each Turn, if the bearer is not Down or Out of Action, you gain 1 additional Focus Point. 3 Glory. LIMIT: 1. Autarch Only.', restrictedTo: ['ELITE'] },
  { id: 'cloak_of_shadewalker_aeldari', name: 'Cloak of the Shadewalker', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Ranged attacks have -1 DICE to Hit the bearer. 3 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'cronescream_aeldari', name: 'Cronescream', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'As an Action with a Success Roll, the bearer can unleash a scream at one enemy within 1". On a success, that enemy suffers 1 BLOOD MARKER. 2 Glory. LIMIT: 1. Elite Howling Banshee Only.', restrictedTo: ['ELITE'] },
  { id: 'dragons_fury_aeldari', name: "Dragon's Fury", type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'When an enemy successfully Charges the bearer, that enemy suffers 1 BLOOD MARKER. A model with NEGATE FIRE is immune. 2 Glory. LIMIT: 1. Elite Fire Dragon Only.', restrictedTo: ['ELITE'] },
  { id: 'khaines_lance_aeldari', name: "Khaine's Lance", type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Whenever the equipped model successfully charges one or more enemies, one of them suffers 1 BLOOD MARKER. 2 Glory. LIMIT: 1. Elite Shining Spear Only.', restrictedTo: ['ELITE'] },
  { id: 'phoenix_gem_aeldari', name: 'Phoenix Gem', type: 'equipment', slot: 'equipment', cost: 8, costCurrency: 'glory', limit: 1, keywords: [], description: 'When the bearer would be taken Out of Action, you can instead remove it from the battlefield and it suffers no effect from that Injury (even from Keywords like GAS). At the end of the Turn, place it back on the battlefield as close as possible to its previous position. 8 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'phoenix_plume_aeldari', name: 'Phoenix Plume', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls made against the wearer have -1 INJURY DICE. 3 Glory. LIMIT: 1. Elite Swooping Hawk Only.', restrictedTo: ['ELITE'] },
  { id: 'rune_of_faolchu_aeldari', name: "Rune of Faolchú", type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'As a Success Roll, the bearer can choose one enemy it can see within 18". On a success, attacks against that enemy have VICIOUS 11 until the end of the current Turn. 2 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'shrine_skull_aeldari', name: 'Shrine Skull', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'Whenever the bearer takes at least one enemy Out of Action with a ranged attack, your opponent has -1 DICE to Morale tests at the end of the current Turn. 1 Glory. LIMIT: 1. Elite Dark Reaper Only.', restrictedTo: ['ELITE'] },
  { id: 'sunstorm_aeldari', name: 'Sunstorm', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'The model has +2" to its movement speed. 3 Glory. LIMIT: 1. Windrider, Shining Spear, or Skyrunner Only.' },
  { id: 'weeping_stones_aeldari', name: 'Weeping Stones', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once per battle, the bearer can reroll any one Success Roll it makes, or one Injury roll made against it. 2 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
];

// ---------------------------------------------------------------------------
// Pirate Crew – faction-specific equipment
// ---------------------------------------------------------------------------
export const pirateCrewEquipment: WargearOption[] = [
  { id: 'blade_venom_pirate', name: 'Blade Venom', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['CONSUMABLE', 'GAS'], description: 'Blades, Close Combat Weapons, Paired Blades, Throwing Knives, and Two-Handed Blades the model is equipped with each gain the GAS Keyword for the duration of the battle. CONSUMABLE.' },
  { id: 'cyber_parrot', name: 'Cyber Parrot', type: 'equipment', slot: 'equipment', cost: 3, keywords: [], description: 'Once per battle: force an enemy to have -1 DICE to Hit in melee. Elite Only.' },
  { id: 'jump_pack_pirate', name: 'Jump Pack', type: 'equipment', slot: 'equipment', cost: 15, limit: 2, keywords: ['FLYING', '+2" MOVEMENT'], description: 'The model gains FLYING and +2" movement speed, but cannot carry any HEAVY equipment or become mounted on any equipment. Pirate Crew Rigger Only.', conflictsWith: ['terminator_armour'], grantsKeywords: ['FLYING'], statModifiers: { movement: 2 } },
  { id: 'pirate_bike', name: 'Pirate Bike', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['LARGE', 'VEHICLE', '10" movement'], description: 'LARGE, VEHICLE, 10" movement. +1 DICE to Dash Success Rolls.' },
  { id: 'pirate_trophy', name: 'Pirate Trophy', type: 'equipment', slot: 'equipment', cost: 15, limit: 3, keywords: ['FEAR'], description: 'Model gains the FEAR Keyword.', grantsKeywords: ['FEAR'] },
  { id: 'manstopper_ammunition_pirate', name: 'Manstopper Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (+1 INJURY MODIFIER against any target that has no armour, including shields). For Autogun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'radium_ammunition_pirate', name: 'Radium Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['CONSUMABLE'], description: 'AMMUNITION (GAS). For Autogun, Automatic Shotgun, Shotgun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'cyberteknika_cranial_pirate', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_pirate', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_pirate', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_pirate', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
];

// ---------------------------------------------------------------------------
// Necromunda Gang – faction-specific equipment
// ---------------------------------------------------------------------------
export const necromundasGangEquipment: WargearOption[] = [
  // Base Gang Items
  { id: 'caryatid_nec', name: 'Caryatid', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once per battle: force an enemy to reroll a Success Roll at -2 DICE.' },
  { id: 'ridgerunner_nec', name: 'Ridgerunner', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['LARGE', 'VEHICLE', '10" movement'], description: 'LARGE, VEHICLE, 10" movement. +1 DICE to Dash.' },
  { id: 'frenzon_nec', name: 'Frenzon', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['CONSUMABLE'], description: '+1 DICE to melee attacks but must always Charge the nearest enemy. CONSUMABLE.' },
  { id: 'ghast_nec', name: 'Ghast', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['CONSUMABLE'], description: 'Grants a random psychic discipline and PSYKER 1 for one battle. CONSUMABLE.' },
  { id: 'slaught_nec', name: 'Slaught', type: 'equipment', slot: 'equipment', cost: 15, limit: 2, keywords: ['CONSUMABLE'], description: '+1 INJURY DICE to melee attacks for one battle. CONSUMABLE.' },
  { id: 'spur_nec', name: 'Spur', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['CONSUMABLE'], description: '+1" movement for one battle. CONSUMABLE.' },
  { id: 'stinger_mould_nec', name: 'Stinger Mould', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['CONSUMABLE'], description: 'Ignore one Trauma effect for one battle. CONSUMABLE.' },
  // Ash Waste Nomads
  { id: 'ash_cloak_nec', name: 'Ash Cloak', type: 'equipment', slot: 'equipment', cost: 7, keywords: ['NEGATE FIRE', 'NEGATE GAS'], description: 'NEGATE FIRE, NEGATE GAS. Ash Waste Nomads only.' },
  { id: 'dustback_halamite_nec', name: 'Dustback Halamite', type: 'equipment', slot: 'equipment', cost: 20, limit: 3, keywords: ['BEAST MOUNT', '10" movement'], description: 'BEAST MOUNT, 10"/Infantry movement, +2 DICE to Jump. Ash Waste Nomads only.' },
  { id: 'sky_mantle_nec', name: 'Sky Mantle', type: 'equipment', slot: 'equipment', cost: 7, keywords: ['STEALTH'], description: 'STEALTH. Ash Waste Nomads only.', grantsKeywords: ['STEALTH'] },
  // Corpsegrinder Cult
  { id: 'frightening_mask_nec', name: 'Frightening Mask', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['FEAR'], description: 'Model gains the FEAR Keyword. Corpsegrinder Cult Elite Only.', grantsKeywords: ['FEAR'] },
  { id: 'terrifying_mask_nec', name: 'Terrifying Mask', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['FEAR'], description: 'FEAR, and enemies have -1 DICE to Morale tests against this model. Corpsegrinder Butcher Only.', grantsKeywords: ['FEAR'] },
  // House Cawdor
  { id: 'cult_icon_cawdor', name: 'Cult Icon', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'LEADER'], description: 'Faction leadership icon. House Cawdor.' },
  { id: 'ridge_walker_cawdor', name: 'Ridge Walker', type: 'equipment', slot: 'equipment', cost: 15, limit: 4, keywords: ['VEHICLE MOUNT', 'LARGE'], description: 'VEHICLE MOUNT, LARGE, 10"/Infantry movement. House Cawdor.' },
  // House Delaque
  { id: 'displacer_field_delaque', name: 'Displacer Field', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: 'All attacks against this model have -1 DICE to Hit. House Delaque Spyker Only.' },
  // House Escher
  { id: 'cutter_escher', name: 'Cutter', type: 'equipment', slot: 'equipment', cost: 45, limit: 3, keywords: ['LARGE', 'VEHICLE', '10" FLYING'], description: 'Hover bike MOUNT. LARGE, VEHICLE, 10" FLYING. House Escher.' },
  { id: 'bad_blood_escher', name: 'Bad Blood', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'When this model is hit in melee and suffers BMs, the attacker also suffers 1 BM. House Escher.' },
  { id: 'brain_lock_escher', name: 'Brain Lock', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'Model cannot be affected by PSYCHIC attacks or abilities. House Escher.' },
  { id: 'hyper_escher', name: 'Hyper', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: '+2" movement, +1 DICE to Dash, but -1 DICE to Hit with all attacks. Escher consumable.' },
  { id: 'jolt_escher', name: 'Jolt', type: 'equipment', slot: 'equipment', cost: 7, limit: 2, keywords: ['CONSUMABLE'], description: 'The first Down result of the battle is treated as a Minor Hit. Escher consumable.' },
  { id: 'night_night_escher', name: 'Night Night', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['CONSUMABLE'], description: 'If taken Out of Action, no Casualty roll at end of battle. Escher consumable.' },
  { id: 'puke_escher', name: 'Puke', type: 'equipment', slot: 'equipment', cost: 3, limit: 3, keywords: ['CONSUMABLE', 'NEGATE GAS'], description: 'NEGATE GAS. Escher consumable.' },
  { id: 'wide_eye_escher', name: 'Wide-Eye', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: 'Ignore all attack roll penalties besides Cover, Long Range, and BLOOD MARKERS (including INFECTION and STUN). Escher consumable.' },
  // House Goliath
  { id: 'mauler_goliath', name: 'Mauler', type: 'equipment', slot: 'equipment', cost: 50, limit: 2, keywords: ['LARGE', 'VEHICLE', '8" movement', '-1 INJURY MODIFIER'], description: 'Heavy bike MOUNT. LARGE, VEHICLE, 8"/Infantry, -1 INJURY MODIFIER. House Goliath.' },
  // House Orlock
  { id: 'outrider_quad_orlock', name: 'Outrider Quad', type: 'equipment', slot: 'equipment', cost: 65, limit: 2, keywords: ['LARGE', 'VEHICLE', 'TOUGH', '10" movement', '-1 INJURY MODIFIER'], description: 'Quad bike MOUNT. LARGE, VEHICLE, TOUGH, 10"/Infantry, -1 INJURY MODIFIER. House Orlock.' },
  // House Van Saar
  { id: 'arachni_rig_vansaar', name: 'Arachni Rig', type: 'armor', slot: 'body-armour', cost: 80, limit: 2, keywords: ['-2 INJURY MODIFIER', 'LARGE', 'VEHICLE', '8" FLYING'], description: '-2 INJURY MODIFIER, LARGE, VEHICLE, 8" FLYING. House Van Saar.', statModifiers: { armourSave: -2 } },
  { id: 'servo_medicae_vansaar', name: 'Servo-Medicae', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Healing device. House Van Saar.' },
  { id: 'cyberteknika_cranial_vansaar', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold. House Van Saar.' },
  { id: 'cyberteknika_ocular_vansaar', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold. House Van Saar.' },
  { id: 'cyberteknika_sindexterous_vansaar', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold. House Van Saar.' },
  { id: 'cyberteknika_motive_vansaar', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold. House Van Saar.' },
  { id: 'cyberteknika_torsonic_vansaar', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'Torsonic cybernetic enhancement. Cannot be removed or sold. House Van Saar.' },
  { id: 'cyberteknika_vascular_vansaar', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'Vascular cybernetic enhancement. Cannot be removed or sold. House Van Saar.' },
  // Ironhead Squat Prospectors
  { id: 'svenotar_trike_squat', name: 'Svenotar Trike', type: 'equipment', slot: 'equipment', cost: 30, limit: 2, keywords: ['LARGE', 'VEHICLE', '8" movement'], description: 'Trike MOUNT. LARGE, VEHICLE, 8"/Infantry. Ironhead Squat Prospectors.' },
  { id: 'telescopic_sight_squat', name: 'Telescopic Sight', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: [], description: 'Ignore Long Range penalty if not moved this Activation. Ironhead Squat Prospectors.' },
  // Venators
  { id: 'hunting_rig_venators', name: 'Hunting Rig', type: 'armor', slot: 'body-armour', cost: 40, keywords: ['-2 INJURY MODIFIER', 'VEHICLE'], description: '-2 INJURY MODIFIER, VEHICLE Keyword. Venators.', statModifiers: { armourSave: -2 } },
  { id: 'heavy_hunting_rig_venators', name: 'Heavy Hunting Rig', type: 'armor', slot: 'body-armour', cost: 50, keywords: ['-3 INJURY MODIFIER', 'LARGE', 'VEHICLE'], description: '-3 INJURY MODIFIER, LARGE, VEHICLE. Venators Elite Only.', statModifiers: { armourSave: -3 }, restrictedTo: ['ELITE'] },
  { id: 'yeld_hunting_rig_venators', name: 'Yeld Hunting Rig', type: 'armor', slot: 'body-armour', cost: 60, keywords: ['-2 INJURY MODIFIER', '8" FLYING', 'INFILTRATOR', 'STEALTH', 'VEHICLE'], description: '-2 INJURY MODIFIER, 8" FLYING, INFILTRATOR, STEALTH, VEHICLE. Venators.', grantsKeywords: ['INFILTRATOR', 'STEALTH'], statModifiers: { armourSave: -2 } },
  { id: 'sthenian_hunting_rig_venators', name: 'Sthenian Hunting Rig', type: 'armor', slot: 'body-armour', cost: 65, keywords: ['-3 INJURY MODIFIER', 'LARGE', 'VEHICLE'], description: '-3 INJURY MODIFIER, LARGE, VEHICLE. Venators Hunt Leader Only.', statModifiers: { armourSave: -3 } },
  { id: 'mirror_shield_venators', name: 'Mirror Shield', type: 'armor', slot: 'body-armour', cost: 15, keywords: ['-1 INJURY MODIFIER', 'Shield'], description: 'Counts as a Shield, including for Shield Combo. -1 INJURY MODIFIER. Built-in melee weapon: on hit, target cannot attack Retreating enemies until end of Turn. Venators Hunting Rig Only.', statModifiers: { armourSave: -1 } },
  { id: 'incendiary_grenades_venators', name: 'Incendiary Grenades', type: 'equipment', slot: 'equipment', cost: 15, limit: 2, keywords: ['THROWN', 'FIRE'], description: 'Thrown incendiary grenades. Venators.' },
  // Palanite Enforcers
  { id: 'magnacles_enforcers', name: 'Magnacles', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: [], description: 'Enemy models in close combat cannot stand up from being Down. Palanite Enforcers.' },
  { id: 'nuncio_aquila_enforcers', name: 'Nuncio Aquila', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['FEAR'], description: 'Model gains the FEAR Keyword. Palanite Enforcers.', grantsKeywords: ['FEAR'] },
  { id: 'photon_flash_grenades_enforcers', name: 'Photon Flash Grenades', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['THROWN', 'STUN'], description: '8", ASSAULT, BLAST 3", IGNORE COVER, IGNORE LONG RANGE, STUN, THROWN, can be used in melee using Ranged skill. Causes no injury but applies a STUN MARKER. On hit, target cannot attack Retreating enemies until end of Turn. Palanite Enforcers.' },
  { id: 'dum_dum_ammunition_enforcers', name: 'Dum-Dum Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: 'AMMUNITION (CRITICAL). Autogun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE. Palanite Enforcers.' },
  { id: 'shock_ammunition_enforcers', name: 'Shock Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['CONSUMABLE', 'STUN'], description: 'AMMUNITION (STUN). One Autogun, Automatic Shotgun, Shotgun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE. Palanite Enforcers.' },
  // House Cawdor
  { id: 'asbestos_mandilion_cawdor', name: 'Asbestos Mandilion', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['NEGATE FIRE'], description: 'The equipped model gains NEGATE FIRE. House Cawdor.', grantsKeywords: ['NEGATE FIRE'] },
  { id: 'cherub_cawdor', name: 'Cherub', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'Once per battle, when this model spends a Miracle, you gain 1 Miracle. House Cawdor Elite Only.' },
  // House Delaque
  { id: 'digital_laser_delaque', name: 'Digital Laser', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['PISTOL'], description: '6", PISTOL, -1 INJURY DICE, takes no hands, can be used in addition to any other attacks. Once per battle. House Delaque.' },
  // House Goliath
  { id: 'dum_dum_ammunition_goliath', name: 'Dum-Dum Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: 'AMMUNITION (CRITICAL). Autogun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE. House Goliath.' },
  // House Van Saar
  { id: 'shock_ammunition_vansaar', name: 'Shock Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['CONSUMABLE', 'STUN'], description: 'AMMUNITION (STUN). One Autogun, Automatic Shotgun, Shotgun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE. House Van Saar.' },
  // Ash Waste Nomads - weapons
  { id: 'venom_caster_nomads', name: 'Venom Caster', type: 'equipment', slot: 'equipment', cost: 20, limit: 1, keywords: ['GAS', 'FLAMETHROWER', 'IGNORE ARMOUR'], description: '8", -1 INJURY DICE, GAS, FLAMETHROWER, IGNORE ARMOUR, TWO-HANDED. Ash Waste Nomads.' },
  { id: 'bone_talons_nomads', name: 'Bone Talons', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['CLEAVE 2', 'VICIOUS 11'], description: 'Melee, CLEAVE 2, VICIOUS 11, TWO-HANDED, Cumbersome. Ash Waste Nomads.' },
  { id: 'insective_knife_nomads', name: 'Insective Knife', type: 'equipment', slot: 'equipment', cost: 7, limit: 1, keywords: ['GAS'], description: 'Melee, GAS, MAIN HAND ONLY. Ash Waste Nomads.' },
  { id: 'toxin_whip_nomads', name: 'Toxin Whip', type: 'equipment', slot: 'equipment', cost: 18, limit: 1, keywords: ['GAS', 'WHIP 3"'], description: 'Melee, BLOCK, GAS, WHIP 3", MAIN HAND ONLY. Ash Waste Nomads.' },
  { id: 'venom_stave_nomads', name: 'Venom Stave', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['GAS'], description: 'Melee, BLOCK, GAS, TWO-HANDED, Shield Combo. Ash Waste Nomads.' },
  // Ash Waste Nomads - equipment & chems
  { id: 'venom_sacs_nomads', name: 'Venom Sacs', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: "This model's attacks with GAS have +1 INJURY DICE and RISKY. Ash Waste Nomads." },
  { id: 'ash_orchid_venom_nomads', name: 'Ash Orchid Venom', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['CONSUMABLE'], description: 'The model has REGENERATE 1, but has -1 DICE to all Success Rolls besides attacks. CONSUMABLE. Ash Waste Nomads.' },
  { id: 'duststalker_mandible_nomads', name: "Duststalker's Mandible", type: 'equipment', slot: 'equipment', cost: 15, limit: 2, keywords: ['CONSUMABLE'], description: 'The model ignores the STEALTH Keyword and has IGNORE COVER and RISKY with its ranged attacks; whenever it suffers any STUN MARKERS, it suffers 1 additional STUN MARKER. CONSUMABLE. Ash Waste Nomads.' },
  { id: 'milk_of_harpy_nomads', name: 'Milk of the Harpy', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['CONSUMABLE'], description: "The model gains +2\" movement speed, but if it does not end its Activation at least 5\" away from where it began, it suffers 1 BLOOD MARKER. CONSUMABLE. Ash Waste Nomads." },
  { id: 'tears_of_storm_nomads', name: 'Tears of the Storm', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['CONSUMABLE'], description: 'Once per Activation, the model can make an additional Shoot or Fight attack. When Activated more than 1" from enemies, must Dash first (3" in a straight line away). If Down, stands up and moves 3" away. CONSUMABLE. Ash Waste Nomads.' },
  { id: 'blast_carbine_nomads', name: 'Blast Carbine', type: 'equipment', slot: 'equipment', cost: 12, limit: 2, keywords: ['ASSAULT', 'CRITICAL'], description: '18", ASSAULT, CRITICAL. Ash Waste Nomads.' },
  { id: 'blast_rifle_nomads', name: 'Blast Rifle', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['CRITICAL'], description: '24", CRITICAL. Ash Waste Nomads.' },
  // Delegation
  { id: 'gun_skull_delegation', name: 'Gun Skull', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: '12", ASSAULT, takes no hands, can make an additional attack when the wielder takes the Shoot Action. Delegation Master of Coin/Bone Scrivener Only.' },
  { id: 'digital_laser_delegation', name: 'Digital Laser', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['PISTOL'], description: '6", PISTOL, -1 INJURY DICE, takes no hands, can be used in addition to any other attacks. Once per battle. Delegation Elite Only.' },
  { id: 'digital_laser_array_delegation', name: 'Digital Laser Array', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['PISTOL'], description: '6", PISTOL, -1 INJURY DICE, takes no hands, can be used in addition to any other attacks. Cannot be combined with a Digital Laser. Delegation Master Charlatan Only.' },
  { id: 'shockwhip_delegation', name: 'Shockwhip', type: 'equipment', slot: 'equipment', cost: 7, keywords: ['STUN', 'WHIP 3"'], description: 'Melee, STUN, WHIP 3". Delegation Chain Lord Only.' },
  { id: 'sling_gun_delegation', name: 'Sling Gun', type: 'equipment', slot: 'equipment', cost: 12, keywords: [], description: '24", ARMOUR PIERCING 1 on Critical Hit, TWO-HANDED. Delegation Cold Trader Only.' },
  { id: 'cult_icon_delegation', name: 'Cult Icon', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['HELD'], description: 'HELD. As an Action with a Success Roll (+1 DICE), attempt to heal itself or a friendly model within 6". Success removes 1 BLOOD MARKER (3 on Critical). Delegation Skinflint/Syphonite/Bone Scrivener/Pyromagir/Shackleman Only.' },
  { id: 'displacer_field_delegation', name: 'Displacer Field', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: 'Attacks against the equipped model have -1 DICE to Hit. Cannot be combined with a Refractor Field. Delegation Leader/Mindfrayed Only.' },
  { id: 'refractor_field_delegation', name: 'Refractor Field', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: 'The equipped model treats Down results as Minor Hits (does not affect Down via TOUGH). Cannot be combined with a Displacer Field. Delegation Leader/Pyromagir Only.' },
  // Ratskins - weapons
  { id: 'longbow_ratskins', name: 'Longbow', type: 'equipment', slot: 'equipment', cost: 3, keywords: ['RELOAD'], description: '24", RELOAD, TWO-HANDED. Ratskins.' },
  { id: 'slingshot_ratskins', name: 'Slingshot', type: 'equipment', slot: 'equipment', cost: 2, keywords: [], description: '12", TWO-HANDED. Ratskins.' },
  // Ratskins - equipment
  { id: 'good_luck_charm_ratskins', name: 'Good Luck Charm', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: 'When the equipped model fails a Risky Success Roll, it may use this item to not end its Activation. Once per battle. Ratskins Elite Only.' },
  { id: 'barbed_arrows_ratskins', name: 'Barbed Arrows', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: 'AMMUNITION (SHRAPNEL). Longbow Only. CONSUMABLE. Ratskins.' },
  { id: 'explosive_arrows_ratskins', name: 'Explosive Arrows', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (BLAST 2", SHRAPNEL, -1 INJURY DICE). Longbow Only. CONSUMABLE. Ratskins.' },
  { id: 'poison_arrows_ratskins', name: 'Poison Arrows', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['CONSUMABLE', 'GAS'], description: 'AMMUNITION (GAS). Longbow Only. CONSUMABLE. Ratskins.' },
  { id: 'blade_venom_ratskins', name: 'Blade Venom', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE', 'GAS'], description: 'Blades, Close Combat Weapons, Paired Blades, Throwing Knives, and Two-Handed Blades the model is equipped with each gain the GAS Keyword for the duration of the battle. CONSUMABLE. Ratskins.' },
  // Scavvies - weapons
  { id: 'scatter_cannon_scavvies', name: 'Scatter Cannon', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['HEAVY', 'SHRAPNEL'], description: '18", BLAST 2", SHRAPNEL, HEAVY, TWO-HANDED, Shield Combo. Scavvies.' },
  { id: 'spear_gun_scavvies', name: 'Spear Gun', type: 'equipment', slot: 'equipment', cost: 20, limit: 1, keywords: ['HEAVY'], description: '24", +1 INJURY DICE, HEAVY, TWO-HANDED. Scavvies.' },
  // Necromunda Gang Shared Armoury
  { id: 'stim_slug_cache_nec', name: 'Stim-Slug Cache', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Once per battle at start of Activation: Remove D3 BLOOD MARKERS OR gain +2" movement and +1 DICE to Hit. Then roll INJURY with IGNORE ARMOUR and -1 INJURY DICE. Elite Only.' },
  // Psychic (available to psyker models)
  { id: 'psychic_familiar_nec', name: 'Psychic Familiar', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Once per battle, when the owner makes a PSYCHIC attack or takes a PSYCHIC Success Roll, it can add +1 DICE to that roll. LIMIT: 1.' },
  // Necromunda Shared Armoury cyberteknika (all gangs, 1 Glory each)
  { id: 'cyberteknika_cranial_nec', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Critical Hits do not grant the normal +1 DICE against this model; the CRITICAL Keyword still functions normally. Ignores Trauma penalties (prevents gaining): Dark Memory, Head Wound, Paranoia. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_ocular_nec', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for shooting at Long Range. Ignores Trauma penalties (prevents gaining): Insomniac, Lost an Eye. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_sindexterous_nec', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. Ignores the penalty for attacking with the off-hand. Ignores Trauma penalties (prevents gaining): Hand Wound, Lost Arm. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  { id: 'cyberteknika_motive_nec', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['PERMANENT'], description: 'PERMANENT. Cannot be removed or sold. +1 DICE to Climb, Jump, and Diving Charge Success Rolls, and to rolls to avoid falling off raised terrain. Ignores Trauma penalties (prevents gaining): Leg Wounded, Muscle Damage. If this Cyberteknika would prevent an injury type, roll a D6 first: on 1-3 it is destroyed but the injury is not sustained.' },
  // Necromunda shared ammo
  { id: 'manstopper_ammunition_nec', name: 'Manstopper Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (+1 INJURY MODIFIER against any target that has no armour, including shields). For Autogun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
  { id: 'radium_ammunition_nec', name: 'Radium Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'AMMUNITION (GAS). For Autogun, Automatic Shotgun, Shotgun, Autopistol, Stub Pistol, or Heavy Stubber only. CONSUMABLE.' },
];

// ---------------------------------------------------------------------------
// Combined master exports
// ---------------------------------------------------------------------------

/** All faction-specific equipment arrays combined */
export const allFactionEquipment: WargearOption[] = [
  ...allHAEquipment,
  ...haVariantEquipment,
  ...thousandSonsEquipment,
  ...chaosDaemonEquipment,
  ...chaosCultEquipment,
  ...vermintideEquipment,
  ...adeptusAstartesEquipment,
  ...astraMilitarumEquipment,
  ...adeptusMechanicusEquipment,
  ...adeptusCustodesEquipment,
  ...adeptusMinistorumEquipment,
  ...theInquisitionEquipment,
  ...adeptaSororitasEquipment,
  ...officioAssassinorumEquipment,
  ...tyranidsEquipment,
  ...tauEmpireEquipment,
  ...slanniEquipment,
  ...orksEquipment,
  ...necronsEquipment,
  ...leaguesOfVotannEquipment,
  ...harlequinsEquipment,
  ...genestealerCultsEquipment,
  ...drukhariEquipment,
  ...aeldariEquipment,
  ...pirateCrewEquipment,
  ...necromundasGangEquipment,
];

/** Master registry: shared equipment + all faction-specific equipment */
export const allEquipmentWithHA = [...armourOptions, ...equipmentOptions, ...allFactionEquipment];

export function getEquipmentById(id: string): WargearOption | undefined {
  return allEquipmentWithHA.find(e => e.id === id);
}
