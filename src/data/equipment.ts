import { WargearOption } from '../types/index.js';

export const armourOptions: WargearOption[] = [
  {
    id: 'standard_armour',
    name: 'Standard Armour',
    type: 'armor',
    slot: 'body-armour',
    cost: 15,
    keywords: ['-1 INJURY MODIFIER'],
    description: 'Light protective gear.',
    statModifiers: { armourSave: -1 },
  },
  {
    id: 'heavy_armour',
    name: 'Heavy Armour',
    type: 'armor',
    slot: 'body-armour',
    cost: 35,
    keywords: ['-2 INJURY MODIFIER', 'HEAVY'],
    description: 'Heavy plated armor.',
    statModifiers: { armourSave: -2 },
  },
  {
    id: 'power_armour',
    name: 'Power Armour',
    type: 'armor',
    slot: 'body-armour',
    cost: 40,
    keywords: ['-2 INJURY MODIFIER'],
    description: 'Powered exoskeleton armour.',
    statModifiers: { armourSave: -2 },
  },
  {
    id: 'terminator_armour',
    name: 'Terminator Armour',
    type: 'armor',
    slot: 'body-armour',
    cost: 65,
    keywords: ['-3 INJURY MODIFIER', 'DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
    description: 'Heavy assault armour suit. Cannot be combined with a Shield or Jump Pack.',
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
    description: 'Hand-held shield. HELD.',
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
    description: 'Large protective shield providing cover. HELD, HEAVY.',
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
    description: 'Prevents enemy deep strike within 16".',
  },
  {
    id: 'camo_cloak',
    name: 'Camo Cloak',
    type: 'equipment',
    slot: 'equipment',
    cost: 10,
    keywords: ['STEALTH'],
    description: 'Grants STEALTH keyword.',
    grantsKeywords: ['STEALTH'],
  },
  {
    id: 'chaos_icon',
    name: 'Chaos Icon',
    type: 'equipment',
    slot: 'equipment',
    cost: 15,
    keywords: ['FEAR'],
    description: 'Bearer gains FEAR keyword.',
    grantsKeywords: ['FEAR'],
  },
  {
    id: 'combat_helmet',
    name: 'Combat Helmet',
    type: 'equipment',
    slot: 'headgear',
    cost: 5,
    keywords: ['NEGATE SHRAPNEL', 'Headgear'],
    description: 'Protects against shrapnel.',
  },
  {
    id: 'filter_plugs',
    name: 'Filter Plugs',
    type: 'equipment',
    slot: 'equipment',
    cost: 5,
    keywords: ['NEGATE GAS'],
    description: 'Protects against gas attacks.',
  },
  {
    id: 'grapnel_launcher',
    name: 'Grapnel Launcher',
    type: 'equipment',
    slot: 'equipment',
    cost: 3,
    keywords: [],
    description: '+1 DICE to climbing.',
  },
  {
    id: 'grav_chute',
    name: 'Grav Chute',
    type: 'equipment',
    slot: 'equipment',
    cost: 7,
    keywords: [],
    description: 'No fall damage, +1 DICE to diving charges.',
  },
  {
    id: 'holy_relic',
    name: 'Holy Relic',
    type: 'equipment',
    slot: 'equipment',
    cost: 2,
    costCurrency: 'glory',
    keywords: ['+1 BLESSING MARKER'],
    description: 'Start with a blessing marker. FAITH factions only.',
  },
  {
    id: 'iron_halo',
    name: 'Iron Halo',
    type: 'equipment',
    slot: 'headgear',
    cost: 4,
    costCurrency: 'glory',
    keywords: ['-1 INJURY DICE', 'Headgear'],
    description: 'Force field generator. ADEPTUS ASTARTES / ADEPTUS CUSTODES only.',
  },
  {
    id: 'jump_pack',
    name: 'Jump Pack',
    type: 'equipment',
    slot: 'equipment',
    cost: 20,
    keywords: ['FLYING', '+2" MOVEMENT'],
    description: 'Grants FLYING keyword and +2" movement. Cannot be used with Terminator Armour.',
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
    description: 'Can remove blood markers from self or a nearby ally.',
  },
  {
    id: 'musical_instrument',
    name: 'Musical Instrument',
    type: 'equipment',
    slot: 'equipment',
    cost: 15,
    limit: 1,
    keywords: ['HELD'],
    description: 'HELD. Friendly models within 4" add +1 DICE to Dash Success Rolls. LIMIT: 1.',
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
    description: '-1 INJURY DICE against psychic attacks, +1 DICE to Deny the Witch.',
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
    description: 'Can dig a foxhole (COVER) during the game.',
  },
  {
    id: 'troop_flag',
    name: 'Troop Flag',
    type: 'equipment',
    slot: 'equipment',
    cost: 1,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['HELD', 'LEADER'],
    description: 'HELD. While bearer is not Down, friendly models within 8" add +1 DICE to Morale rolls. LIMIT: 1.',
  },
  {
    id: 'vox_unit',
    name: 'Vox Unit',
    type: 'equipment',
    slot: 'equipment',
    cost: 5,
    keywords: [],
    description: 'As an Action with a Risky Success Roll, designate one ally within 12" that this model can see. If successful, this model\'s Activation immediately ends and that model\'s Activation begins.',
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
    cost: 1,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['HELD', 'FEAR', 'NURGLE'],
    description: 'HELD. While bearer is not Down, bearer and each NURGLE ally within 4" have FEAR keyword. Mark of Nurgle Only. LIMIT: 1.',
  },
  {
    id: 'icon_of_excess',
    name: 'Icon of Excess',
    type: 'equipment',
    slot: 'equipment',
    cost: 1,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['HELD', 'SLAANESH'],
    description: 'HELD. While bearer is not Down, bearer and each SLAANESH ally within 4" cannot be forced to move by enemy models. Mark of Slaanesh Only. LIMIT: 1.',
  },
  {
    id: 'icon_of_flame',
    name: 'Icon of Flame',
    type: 'equipment',
    slot: 'equipment',
    cost: 1,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['HELD', 'TZEENTCH', 'ARMOUR PIERCING 1 (ranged)'],
    description: 'HELD. While bearer is not Down, bearer and each TZEENTCH ally within 4" gain ARMOUR PIERCING 1 with all ranged attacks. Mark of Tzeentch Only. LIMIT: 1.',
  },
  {
    id: 'icon_of_wrath',
    name: 'Icon of Wrath',
    type: 'equipment',
    slot: 'equipment',
    cost: 1,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['HELD', 'KHORNE', '+1 INJURY MODIFIER (melee, on Charge)'],
    description: 'HELD. While bearer is not Down, bearer and each KHORNE ally within 4" have +1 INJURY MODIFIER with melee attacks during an Activation in which they Charged. Mark of Khorne Only. LIMIT: 1.',
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
    description: 'CONSUMABLE. One-use ammunition upgrade. LIMIT: 2.',
  },
];

export const allHAEquipment = [...marksOfChaos, ...chaosIcons, ...haSpecialEquipment];

// ---------------------------------------------------------------------------
// Heretic Astartes Variants – sub-faction equipment
// ---------------------------------------------------------------------------
export const haVariantEquipment: WargearOption[] = [
  // All HA variants share a Combat Helmet
  { id: 'combat_helmet_ha', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'icon_of_vengeance_ha', name: 'Icon of Vengeance', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'LEADER', 'NEGATE FEAR'], description: 'HELD, LEADER. NEGATE FEAR for bearer and allied models within 8".' },
  { id: 'toxin_grenades_ha', name: 'Toxin Grenades', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['THROWN'], description: 'Thrown toxin grenades with GAS Keyword.' },
  // Death Guard
  { id: 'poison_vents_dg', name: 'Poison Vents', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['NURGLE'], description: 'When an enemy begins its Activation within 1" of this model and has any INFECTION MARKERS, it gains an additional INFECTION MARKER. Non-Cultist Elite Only.' },
  { id: 'mischievous_nurgling_dg', name: 'Mischievous Nurgling', type: 'equipment', slot: 'equipment', cost: 3, limit: 3, keywords: ['NURGLE'], description: 'Once per battle: an enemy in close combat with this model makes a melee attack at -1 DICE to Hit.' },
  // Emperor's Children
  { id: 'sonic_shriekers_ec', name: 'Sonic Shriekers', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['FEAR', 'SLAANESH'], description: 'Model gains the FEAR Keyword. Elite, Chaos Space Marine, or Chaos Terminator Only.' },
  // Night Lords
  { id: 'chain_snare_nl', name: 'Chain Snare', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'When an enemy in close combat Retreats, +1 DICE to Hit and +1 INJURY DICE for this model\'s free attack.' },
  { id: 'comms_jammer_nl', name: 'Comms Jammer', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Enemy models within 3" of this model cannot be targeted by abilities from friendly models outside 3".' },
  { id: 'grisly_trophy_nl', name: 'Grisly Trophy', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['FEAR'], description: 'Model gains FEAR. If already has FEAR, that Keyword cannot be ignored by enemies.' },
  { id: 'ventrilokar_vox_nl', name: 'Ventrilokar Vox', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Risky action: trick one visible enemy within 6" into moving D3" in any direction.' },
  // Thousand Sons
  { id: 'disc_of_tzeentch_ts', name: 'Disc of Tzeentch', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['TZEENTCH', '8" FLYING'], description: 'Rider gains 8" FLYING movement. Elite Only.' },
  // Iron Warriors – Cyberteknika
  { id: 'cyberteknika_cranial_iw', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_iw', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_iw', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_iw', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_torsonic_iw', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'Torsonic cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_vascular_iw', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'Vascular cybernetic enhancement. Cannot be removed or sold.' },
];

// ---------------------------------------------------------------------------
// Chaos Daemons – faction-specific equipment
// ---------------------------------------------------------------------------
export const chaosDaemonEquipment: WargearOption[] = [
  { id: 'chaos_icon_daemons', name: 'Chaos Icon', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['FEAR'], description: 'Chaos faction icon providing bonuses to nearby Chaos models.', grantsKeywords: ['FEAR'] },
  { id: 'icon_of_vengeance_daemons', name: 'Icon of Vengeance', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'LEADER'], description: 'HELD, LEADER. Allied CHAOS models within 8" are immune to FEAR effects.' },
  { id: 'musical_instrument_daemons', name: 'Musical Instrument', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. Friendly models within 4" gain +1 DICE to Dash Success Rolls.' },
  // Blood Legion (Khorne)
  { id: 'banner_of_blood_khorne', name: 'Banner of Blood', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['HELD', 'KHORNE'], description: 'HELD. The bearer and KHORNE allies within 8" roll 2D6 for charge distance (take highest).' },
  { id: 'brass_horns_khorne', name: 'Brass Horns', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['KHORNE'], description: '+1 INJURY MODIFIER on melee attacks during the Turn following a Charge.' },
  { id: 'collar_of_khorne', name: 'Collar of Khorne', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['KHORNE'], description: 'Model cannot be targeted by PSYCHIC attacks. Enemies cannot use psychic powers within 6".' },
  { id: 'cuirass_of_rage_khorne', name: 'Cuirass of Rage', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: ['KHORNE'], description: 'BMs cannot be spent on Success Rolls for melee attacks against this model.' },
  // Legion of Excess (Slaanesh)
  { id: 'rapturous_standard_slaanesh', name: 'Rapturous Standard', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'SLAANESH'], description: 'HELD. Melee attacks against this model and SLAANESH allies within 8" have -1 DICE to Hit.' },
  // Plague Legion (Nurgle)
  { id: 'the_endless_gift_nurgle', name: 'The Endless Gift', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['NURGLE'], description: 'At the end of this model\'s Activation, remove 1 BM. Elite Only.' },
  { id: 'mischievous_nurgling_nurgle', name: 'Mischievous Nurgling', type: 'equipment', slot: 'equipment', cost: 3, limit: 3, keywords: ['NURGLE'], description: 'Once per battle: an enemy in close combat with this model makes a melee attack at -1 DICE to Hit.' },
  { id: 'nurgling_palanquin_nurgle', name: 'Nurgling Palanquin', type: 'equipment', slot: 'equipment', cost: 20, keywords: ['LARGE', 'NURGLE'], description: 'LARGE. This model cannot fall Down from injury. Poxbringer Only.' },
  { id: 'plague_banner_nurgle', name: 'Plague Banner', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'NURGLE'], description: 'HELD. NURGLE allies within 8" add the GAS Keyword to their melee attacks.' },
  { id: 'sloppity_bilepipe_nurgle', name: 'Sloppity Bilepipe', type: 'equipment', slot: 'equipment', cost: 20, limit: 1, keywords: ['HELD', 'FEAR', 'NURGLE'], description: 'HELD, FEAR. NURGLE allies within 8" roll 2D6 for charge distance (take highest).' },
  // Scintillating Legion (Tzeentch)
  { id: 'blasted_standard_tzeentch', name: 'Blasted Standard', type: 'equipment', slot: 'equipment', cost: 20, limit: 1, keywords: ['HELD', 'TZEENTCH'], description: 'HELD. Action: target within 8" gains 1 BM. Models with NEGATE FIRE are immune.' },
  { id: 'disc_of_tzeentch_daemons', name: 'Disc of Tzeentch', type: 'equipment', slot: 'equipment', cost: 15, limit: 2, keywords: ['TZEENTCH', '8" FLYING'], description: '8" FLYING movement.' },
  { id: 'icon_of_tzeentch_daemons', name: 'Icon of Tzeentch', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['TZEENTCH', 'FIRE'], description: 'Blue and Pink Horror Claws gain the FIRE Keyword. Blue or Pink Horror Only.' },
];

// ---------------------------------------------------------------------------
// Chaos Cult – faction-specific equipment
// ---------------------------------------------------------------------------
export const chaosCultEquipment: WargearOption[] = [
  { id: 'chaos_icon_chaoscult', name: 'Chaos Icon', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['FEAR'], description: 'Chaos faction icon.', grantsKeywords: ['FEAR'] },
  { id: 'cult_icon_chaoscult', name: 'Cult Icon', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'LEADER'], description: 'Cult leadership icon.' },
  { id: 'covert_guise_chaoscult', name: 'Covert Guise', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['INFILTRATOR'], description: 'Model gains the INFILTRATOR Keyword. Cult Devotee Only.', grantsKeywords: ['INFILTRATOR'] },
  { id: 'dum_dum_ammunition_chaoscult', name: 'Dum-Dum Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: 'Special ammunition upgrade. CONSUMABLE.' },
  { id: 'manstopper_ammunition_chaoscult', name: 'Manstopper Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'Manstopper round upgrade. CONSUMABLE.' },
  { id: 'radium_ammunition_chaoscult', name: 'Radium Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['CONSUMABLE'], description: 'Radium round upgrade. CONSUMABLE.' },
  { id: 'cyberteknika_cranial_chaoscult', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_chaoscult', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_chaoscult', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_chaoscult', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
];

// ---------------------------------------------------------------------------
// The Vermintide – faction-specific equipment
// ---------------------------------------------------------------------------
export const vermintideEquipment: WargearOption[] = [
  { id: 'chaos_icon_vermintide', name: 'Chaos Icon', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['FEAR'], description: 'Chaos faction icon.', grantsKeywords: ['FEAR'] },
  { id: 'book_of_woes_vermintide', name: 'Book of Woes', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['HELD'], description: 'HELD. Action + Risky: target enemy within range gains 1 BM (D3 on Critical Success). Plague Monk Only.' },
  { id: 'skavenbrew_vermintide', name: 'Skavenbrew', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['CONSUMABLE'], description: '+1 DICE to melee attacks but -1 DICE to Injury rolls against this model, and gain 1 BM at start of each Activation. CONSUMABLE. Skavenslave or Clanrat Only.' },
  { id: 'warp_shovel_vermintide', name: 'Warp Shovel', type: 'equipment', slot: 'equipment', cost: 15, limit: 3, keywords: ['DEEP STRIKE'], description: 'Shovel with DEEP STRIKE. Clanrat Only.', grantsKeywords: ['DEEP STRIKE'] },
  { id: 'warpstone_charm_vermintide', name: 'Warpstone Charm', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'STUN MARKERS count as BMs for melee Injury rolls.' },
  { id: 'wolf_rat_mount_vermintide', name: 'Wolf Rat Mount', type: 'equipment', slot: 'equipment', cost: 40, limit: 3, keywords: ['LARGE', 'SKIRMISHER', 'MOUNTED', '10" movement'], description: 'LARGE, SKIRMISHER, MOUNTED, 10" movement. Built-in Snapping Jaws attack.' },
  { id: 'cyberteknika_cranial_vermintide', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_vermintide', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_vermintide', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_vermintide', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_torsonic_vermintide', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'Torsonic cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_vascular_vermintide', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'Vascular cybernetic enhancement. Cannot be removed or sold.' },
];

// ---------------------------------------------------------------------------
// Adeptus Astartes – faction-specific equipment
// ---------------------------------------------------------------------------
export const adeptusAstartesEquipment: WargearOption[] = [
  { id: 'combat_helmet_aa', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'frag_ammunition_aa', name: 'Frag Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['CONSUMABLE'], description: 'Fragmentation ammunition upgrade. CONSUMABLE.' },
  { id: 'mortis_ammunition_aa', name: 'Mortis Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'Mortis pattern ammunition upgrade. CONSUMABLE.' },
  { id: 'psychic_hood_aa', name: 'Psychic Hood', type: 'equipment', slot: 'headgear', cost: 7, keywords: [], description: 'Psychic dampening hood. Librarian Only.' },
  { id: 'seeker_ammunition_aa', name: 'Seeker Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'Seeker pattern ammunition upgrade. CONSUMABLE.' },
  { id: 'holy_relic_aa', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', keywords: [], description: 'Sacred Imperial relic. Elite Only.' },
  { id: 'purity_seal_aa', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Purity seal providing spiritual protection.' },
  { id: 'troop_flag_aa', name: 'Troop Flag', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'LEADER'], description: 'Chapter battle standard.' },
  { id: 'cyberteknika_cranial_aa', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_aa', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_aa', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_aa', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
  // Iron Hands Variant – reduced-cost cyberteknika + Torsonic & Vascular + Servo-Skull
  { id: 'cyberteknika_torsonic_aa', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'Torsonic cybernetic enhancement. Cannot be removed or sold. Iron Hands only (25cr).' },
  { id: 'cyberteknika_vascular_aa', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'Vascular cybernetic enhancement. Cannot be removed or sold. Iron Hands only (20cr).' },
  { id: 'servo_skull_ih', name: 'Servo-Skull', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: '+1 INJURY MODIFIER with all attacks. Techmarine Only. (Iron Hands only)' },
  // Dark Angels Variant
  { id: 'watcher_in_the_dark', name: 'Watcher in the Dark', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: [], description: 'Once per battle when the equipped model is hit by an attack, the Injury roll has -1 DICE. Elite Only. (Dark Angels only)' },
  // Space Wolves Variant – equipment mounts
  { id: 'death_totem', name: 'Death Totem', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['FEAR'], description: 'The equipped model gains the FEAR Keyword. LIMIT: 1. Wulfen Only. (Space Wolves only)', grantsKeywords: ['FEAR'] },
  { id: 'thunderwolf', name: 'Thunderwolf', type: 'equipment', slot: 'equipment', cost: 55, limit: 3, keywords: ['LARGE', 'BEAST', '10" movement'], description: 'Mounted on a wolf. Gains LARGE, BEAST, 10"/Infantry movement. Equipped with Jaws (Melee, CRITICAL, free alongside other melee). Thunderous Charge: +1 DICE to Dash/Climb/Jump, Charging hits an enemy gains BLOOD MARKER. LIMIT: 3. Space Marines Only. (Space Wolves only)' },
  // Deathwatch Variant – Special Issue Ammunition (not CONSUMABLE, not limited to 1)
  { id: 'derevenant_shells', name: 'Derevenant Shells', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['AMMUNITION'], description: 'AMMUNITION (special). On a hit, after the normal Injury roll, target rolls on Injury table again with -2 DICE. Other properties do not apply to second roll. LIMIT: 2. Deathwatch only.' },
  { id: 'dragonfire_bolts', name: 'Dragonfire Bolts', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['AMMUNITION', 'FIRE'], description: 'AMMUNITION (FIRE). LIMIT: 3. Deathwatch only.' },
  { id: 'hellfire_rounds', name: 'Hellfire Rounds', type: 'equipment', slot: 'equipment', cost: 5, limit: 4, keywords: ['AMMUNITION', 'GAS'], description: 'AMMUNITION (GAS). LIMIT: 4. Deathwatch only.' },
  { id: 'inertial_fusion_bolts', name: 'Inertial Fusion Bolts', type: 'equipment', slot: 'equipment', cost: 5, limit: 4, keywords: ['AMMUNITION'], description: 'AMMUNITION (special). Injury rolls caused by these attacks cannot benefit from -DICE. LIMIT: 4. Deathwatch only.' },
  { id: 'kraken_bolts', name: 'Kraken Bolts', type: 'equipment', slot: 'equipment', cost: 10, limit: 4, keywords: ['AMMUNITION', 'ARMOUR PIERCING 1'], description: 'AMMUNITION (ARMOUR PIERCING 1). LIMIT: 4. Deathwatch only.' },
  { id: 'metal_storm_shells', name: 'Metal Storm Shells', type: 'equipment', slot: 'equipment', cost: 5, limit: 4, keywords: ['AMMUNITION', 'SHRAPNEL'], description: 'AMMUNITION (SHRAPNEL). LIMIT: 4. Deathwatch only.' },
  { id: 'tempest_bolts', name: 'Tempest Bolts', type: 'equipment', slot: 'equipment', cost: 5, limit: 4, keywords: ['AMMUNITION'], description: 'AMMUNITION (+1 INJURY DICE vs ARTIFICIAL, MECHANICUS, or VEHICLE). LIMIT: 4. Deathwatch only.' },
  { id: 'thermic_acceleration_rounds', name: 'Thermic Acceleration Rounds', type: 'equipment', slot: 'equipment', cost: 3, limit: 4, keywords: ['AMMUNITION'], description: 'AMMUNITION (special). Attacks ignore all penalties to Hit besides Cover and Long Range, and range penalties/limits. LIMIT: 4. Deathwatch only.' },
  // AA Campaign Shop – universal items
  { id: 'armour_indomitus_aa', name: 'Armour Indomitus', type: 'armor', slot: 'body-armour', cost: 6, costCurrency: 'glory', limit: 1, keywords: ['-2 INJURY MODIFIER', 'IMPERVIOUS'], description: '-2 to Injury rolls, IMPERVIOUS. LIMIT: 1. (AA Campaign Shop)', statModifiers: { armourSave: -2 } },
  { id: 'honor_vehement_aa', name: 'Honor Vehement', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Whenever the equipped model or a friendly ASTARTES model within 6" Charges, roll 2D6 instead of 1D6 for charge distance (take highest). LIMIT: 1. Elite Only. (AA Campaign Shop)' },
  { id: 'relic_of_the_primarch_aa', name: 'Relic of the Primarch', type: 'equipment', slot: 'equipment', cost: 5, costCurrency: 'glory', limit: 1, keywords: ['HELD'], description: 'HELD. Once per battle, as an Action requiring no roll, unveil the relic: each friendly ASTARTES model within 6" has +1 DICE to Hit and +1 INJURY DICE with all melee attacks until the end of the current Turn. LIMIT: 1. Captain Only. (AA Campaign Shop)' },
  { id: 'shield_eternal_aa', name: 'Shield Eternal', type: 'armor', slot: 'shield', cost: 2, costCurrency: 'glory', keywords: ['-1 INJURY MODIFIER', 'IMPERVIOUS', 'HELD'], description: 'Counts as a Shield (-1 to Injury rolls) but has IMPERVIOUS. HELD. Elite Only. (AA Campaign Shop)', statModifiers: { armourSave: -1 } },
  { id: 'standard_of_righteous_hatred_aa', name: 'Standard of Righteous Hatred', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['HELD'], description: 'HELD. When the carrier or an ASTARTES ally within 12" is taken Out of Action, that model can make a single melee attack before being removed. BLOOD MARKERS cannot be spent on this attack. LIMIT: 1. (AA Campaign Shop)' },
  // AA Campaign Shop – subfaction-specific
  { id: 'aegis_armour_aa', name: 'Aegis Armour', type: 'armor', slot: 'body-armour', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['PSYCHIC WARD'], description: 'Injury rolls with the PSYCHIC or IGNORE ARMOUR Keyword have -1 INJURY DICE against the equipped model. LIMIT: 1. Elite Only. Grey Knights Only. (AA Campaign Shop)', statModifiers: { armourSave: 0 } },
  { id: 'arridian_drakehide_cloak_aa', name: 'Arridian Drakehide Cloak', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Injury rolls made against the equipped model have -1 DICE, or -2 DICE if they have the FIRE Keyword. LIMIT: 1. Elite Only. Salamanders Only. (AA Campaign Shop)' },
  { id: 'centurion_warsuit_aa', name: 'Centurion Warsuit', type: 'equipment', slot: 'equipment', cost: 8, costCurrency: 'glory', limit: 1, keywords: ['STRONG', 'TOUGH', 'VEHICLE'], description: 'Armour improves to -3 (no shield stacking). Gains STRONG, TOUGH, VEHICLE. Max 3" Dash. If already TOUGH, can use it twice per battle (first use removes the warsuit). Replaces normal weapons with warsuit weapons (chosen on purchase: Combi-Bolter/Missile Launcher/Krak Grenades + Grav Cannon/Heavy Bolter/Heavy Flamer/Lascannon(+2 Glory for Multi-Melta) + two Two-Handed Hammers or Twin Siege Drill). Each ranged warsuit weapon can be fired per Activation. LIMIT: 1. Wearing Power Armour Only. (AA Campaign Shop)', grantsKeywords: ['STRONG', 'TOUGH', 'VEHICLE'] },
  { id: 'icon_of_obstinacy_aa', name: 'Icon of Obstinacy', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model and ASTARTES allies within 6" cannot be forcibly moved by the enemy. LIMIT: 1. Elite Only. Imperial Fists Only. (AA Campaign Shop)' },
  { id: 'inspired_retribution_aa', name: 'Inspired Retribution', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', keywords: [], description: 'After the Chaplain or a friendly ASTARTES model within 6" is attacked in melee, the Chaplain can make a Success Roll. On a success, the attacking model gains a BLOOD MARKER. Chaplain Only. No Variant Only. Cannot be sold. (AA Campaign Shop)' },
  { id: 'litany_of_hate_aa', name: 'Litany of Hate', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', keywords: [], description: 'BLOOD MARKERS cannot be spent on the attacks of the Chaplain or any friendly ASTARTES model within 6" of it. Chaplain Only. Black Templars Only. Cannot be sold. (AA Campaign Shop)' },
  { id: 'pelt_of_balewolf_aa', name: 'Pelt of Balewolf', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['FEAR'], description: 'The equipped model gains the FEAR Keyword. Elite Only. Space Wolves Only. (AA Campaign Shop)', grantsKeywords: ['FEAR'] },
  { id: 'ravens_talons_aa', name: "Raven's Talons", type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', keywords: [], description: 'When the equipped model successfully Charges one or more enemies, one of those enemies gains a BLOOD MARKER. Equipped with Jump Pack Only. Raven Guard Only. (AA Campaign Shop)' },
  { id: 'signum_array_aa', name: 'Signum Array', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'Whenever the equipped model makes a ranged attack against an enemy, allies have +1 DICE to Hit that same enemy with ranged attacks until the end of the current Turn. LIMIT: 1. Elite Only. Iron Hands Only. (AA Campaign Shop)' },
  { id: 'talisman_of_sundered_souls_aa', name: 'Talisman of Sundered Souls', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model ignores the first Perils of the Warp roll it would make during each battle. LIMIT: 1. Librarian Only. (AA Campaign Shop)' },
  { id: 'tome_of_malcador_aa', name: 'Tome of Malcador', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'The equipped model can learn one additional psychic power from any of its normal disciplines, or from any Shared Discipline. Must pay for this power as normal. LIMIT: 1. Librarian Only. (AA Campaign Shop)' },
  { id: 'visage_of_death_aa', name: 'Visage of Death', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['FEAR'], description: 'The equipped model gains the FEAR Keyword. Elite Only. Blood Angels Only. (AA Campaign Shop)', grantsKeywords: ['FEAR'] },
];

// ---------------------------------------------------------------------------
// Astra Militarum – faction-specific equipment
// ---------------------------------------------------------------------------
export const astraMilitarumEquipment: WargearOption[] = [
  { id: 'augury_scanner_am', name: 'Augury Scanner', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Scanner device for detecting enemies.' },
  { id: 'camo_cloak_am', name: 'Camo Cloak', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['STEALTH'], description: 'Camouflage cloak improving concealment.', grantsKeywords: ['STEALTH'] },
  { id: 'combat_helmet_am', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'dum_dum_ammunition_am', name: 'Dum-Dum Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: 'Dum-dum bullet upgrade. CONSUMABLE.' },
  { id: 'manstopper_ammunition_am', name: 'Manstopper Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'Manstopper round upgrade. CONSUMABLE.' },
  { id: 'musical_instrument_am', name: 'Musical Instrument', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. +1 DICE to Dash for allies within 4".' },
  { id: 'phosphor_ammunition_am', name: 'Phosphor Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['CONSUMABLE'], description: 'Phosphor round upgrade. CONSUMABLE.' },
  { id: 'photo_goggles_am', name: 'Photo Goggles', type: 'equipment', slot: 'equipment', cost: 3, keywords: [], description: 'Enhanced vision goggles.' },
  { id: 'rough_rider_horse_am', name: 'Rough Rider Horse', type: 'equipment', slot: 'equipment', cost: 40, limit: 3, keywords: ['BEAST MOUNT', '10" movement'], description: 'BEAST MOUNT, 10"/Infantry. +1 DICE to Dash, Climb, and Jump Success Rolls. Elite or Veteran Only (max 1 Elite).' },
  { id: 'troop_flag_am', name: 'Troop Flag', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'LEADER'], description: 'Faction battle standard.' },
  { id: 'vox_unit_am', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Communications device.' },
  { id: 'cyberteknika_cranial_am', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_am', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_am', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_am', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
];

// ---------------------------------------------------------------------------
// Adeptus Mechanicus – faction-specific equipment
// ---------------------------------------------------------------------------
export const adeptusMechanicusEquipment: WargearOption[] = [
  { id: 'combat_helmet_admech', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'holy_relic_admech', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', keywords: [], description: 'Sacred relic of the Omnissiah. Elite Only.' },
  { id: 'imperative_surge_wafer', name: 'Imperative Surge-Wafer', type: 'equipment', slot: 'equipment', cost: 15, limit: 3, keywords: ['CONSUMABLE'], description: '+2" movement for entire battle. CONSUMABLE. Elite Only.' },
  { id: 'omnispex_admech', name: 'Omnispex', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Ranged attacks from this model ignore Cover. Skitarii or Marshal Only.' },
  { id: 'purity_seal_admech', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Purity seal providing spiritual protection.' },
  { id: 'servo_medicae_admech', name: 'Servo-Medicae', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Healing servo-device; removes BMs from injured allies.' },
  { id: 'serberys_construct_admech', name: 'Serberys Construct', type: 'equipment', slot: 'equipment', cost: 45, limit: 3, keywords: ['ARTIFICIAL', 'SKIRMISHER', 'VEHICLE MOUNT', '10" movement'], description: 'ARTIFICIAL, SKIRMISHER, VEHICLE MOUNT, 10"/Infantry movement. Skitarii or Marshal Only.' },
  { id: 'vox_unit_admech', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Communications device.' },
  { id: 'cyberteknika_cranial_admech', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_admech', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_admech', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_admech', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_torsonic_admech', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'Torsonic cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_vascular_admech', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'Vascular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'servo_skull_admech', name: 'Servo-Skull', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: '+1 INJURY MODIFIER with all attacks. Dominus or Tech-Priest Only.' },
];

// ---------------------------------------------------------------------------
// Adeptus Custodes – faction-specific equipment
// ---------------------------------------------------------------------------
export const adeptusCustodesEquipment: WargearOption[] = [
  { id: 'auramite_armour_custodes', name: 'Auramite Armour', type: 'armor', slot: 'body-armour', cost: 50, keywords: ['-3 INJURY MODIFIER', 'HEAVY'], description: '-3 INJURY MODIFIER, HEAVY. Elite or Custodian Guard Only.', statModifiers: { armourSave: -3 } },
  { id: 'aquilon_armour_custodes', name: 'Aquilon Armour', type: 'armor', slot: 'body-armour', cost: 70, limit: 1, keywords: ['-3 INJURY MODIFIER', 'HEAVY', 'DEEP STRIKE', 'STRONG', 'VEHICLE'], description: '-3 INJURY MODIFIER, HEAVY, DEEP STRIKE, STRONG, VEHICLE.', grantsKeywords: ['DEEP STRIKE', 'STRONG', 'VEHICLE'], statModifiers: { armourSave: -3 } },
  { id: 'praesidium_shield_custodes', name: 'Praesidium Shield', type: 'armor', slot: 'shield', cost: 20, limit: 1, keywords: ['HELD', 'COVER', 'HEAVY'], description: 'HELD, COVER, HEAVY. The first -1 of armour has IMPERVIOUS. Shield-Captain or Contemptor Only.' },
  { id: 'amelioration_pail_custodes', name: 'Amelioration Pail', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 3, keywords: ['CONSUMABLE'], description: 'Remove 1 BM as a free action. CONSUMABLE.' },
  { id: 'combat_helmet_custodes', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'dawneagle_jetbike_custodes', name: 'Dawneagle Jetbike', type: 'equipment', slot: 'equipment', cost: 60, limit: 1, keywords: ['VEHICLE MOUNT', '10" FLYING'], description: 'VEHICLE MOUNT, 10" FLYING. Built-in weapon slot. Turbo-Boost ability. Custodian Guard or Shield-Captain Only.' },
  { id: 'holy_relic_custodes', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', keywords: [], description: 'Sacred relic of the Emperor. Elite Only.' },
  { id: 'vexilla_custodes', name: 'Vexilla', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['HELD'], description: 'HELD. Bearer and all non-Down allies automatically pass all Morale Tests. Non-Anathema Psykana Only.' },
  { id: 'cyberteknika_cranial_custodes', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_custodes', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_custodes', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_custodes', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'frag_ammunition_custodes', name: 'Frag Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['CONSUMABLE'], description: 'Fragmentation ammunition upgrade. CONSUMABLE.' },
];

// ---------------------------------------------------------------------------
// Adeptus Ministorum – faction-specific equipment
// ---------------------------------------------------------------------------
export const adeptusMinistorumEquipment: WargearOption[] = [
  { id: 'augury_scanner_min', name: 'Augury Scanner', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Scanner device for detecting enemies.' },
  { id: 'combat_helmet_min', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'holy_relic_min', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Sacred Ministorum relic. Elite Only.' },
  { id: 'infernus_ammunition_min', name: 'Infernus Ammunition', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['CONSUMABLE', 'FIRE'], description: 'Incendiary ammunition with FIRE Keyword. CONSUMABLE.' },
  { id: 'purity_seal_min', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 10, keywords: [], description: 'Purity seal (Ministorum pricing: 10cr).' },
  { id: 'reliquarius_min', name: 'Reliquarius', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['HELD'], description: 'HELD. -1 DICE on Injury rolls against the bearer and allies within 4".' },
  { id: 'sanctification_orbs_min', name: 'Sanctification Orbs', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 1, keywords: [], description: 'FIRE keyword attacks by allies within 8" gain +1 INJURY DICE. Bearer cannot carry thrown weapons.' },
  { id: 'cyberteknika_cranial_min', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_min', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_min', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_min', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
];

// ---------------------------------------------------------------------------
// The Inquisition – faction-specific equipment
// ---------------------------------------------------------------------------
export const theInquisitionEquipment: WargearOption[] = [
  { id: 'augury_scanner_inq', name: 'Augury Scanner', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Scanner device.' },
  { id: 'combat_helmet_inq', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'holy_relic_inq', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', keywords: [], description: 'Sacred Inquisitorial relic. Elite Only.' },
  { id: 'manstopper_ammunition_inq', name: 'Manstopper Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'Manstopper round upgrade. CONSUMABLE.' },
  { id: 'phosphor_ammunition_inq', name: 'Phosphor Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE'], description: 'Phosphor round upgrade. CONSUMABLE.' },
  { id: 'photo_goggles_inq', name: 'Photo Goggles', type: 'equipment', slot: 'equipment', cost: 3, keywords: [], description: 'Enhanced vision goggles.' },
  { id: 'psychic_familiar_inq', name: 'Psychic Familiar', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Psychic familiar assisting the bearer.' },
  { id: 'psychic_hood_inq', name: 'Psychic Hood', type: 'equipment', slot: 'headgear', cost: 7, keywords: [], description: 'Psychic dampening hood. Psyker Inquisitor Only.' },
  { id: 'purity_seal_inq', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Purity seal.' },
  { id: 'troop_flag_inq', name: 'Troop Flag', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'LEADER'], description: 'Inquisitorial battle standard.' },
  { id: 'vox_unit_inq', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Communications device.' },
];

// ---------------------------------------------------------------------------
// Adepta Sororitas – faction-specific equipment
// ---------------------------------------------------------------------------
export const adeptaSororitasEquipment: WargearOption[] = [
  { id: 'armourium_cherub_sor', name: 'Armourium Cherub', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'Once per battle: +1 DICE to Hit with ranged attacks during one Activation.' },
  { id: 'blessed_ammunition_sor', name: 'Blessed Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['CONSUMABLE'], description: 'AMMUNITION upgrade for bolt weapons: gains IGNORE LONG RANGE.' },
  { id: 'combat_helmet_sor', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'incensor_cherub_sor', name: 'Incensor Cherub', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'When spending a Miracle point, gain 1 additional Miracle point. Elite Only.' },
  { id: 'infernus_ammunition_sor', name: 'Infernus Ammunition', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['CONSUMABLE', 'FIRE'], description: 'Incendiary ammunition with FIRE Keyword. CONSUMABLE.' },
  { id: 'phial_of_dolan_sor', name: 'Phial of Dolan', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 2, keywords: ['CONSUMABLE'], description: '+1 DICE to melee attacks and NEGATE FEAR for this model\'s Activation. CONSUMABLE.' },
  { id: 'purity_seal_sor', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Purity seal.' },
  { id: 'sacresant_shield_sor', name: 'Sacresant Shield', type: 'armor', slot: 'body-armour', cost: 20, keywords: ['-1 INJURY MODIFIER', 'HELD', 'Shield Combo'], description: '-1 INJURY MODIFIER, HELD, Shield Combo. Built-in Bolt Pistol. Sacresant Only.', statModifiers: { armourSave: -1 } },
  { id: 'simulacrum_imperialis_sor', name: 'Simulacrum Imperialis', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: ['HELD'], description: 'HELD. -1 DICE on Injury rolls against the bearer and allies within 4".' },
  { id: 'troop_flag_sor', name: 'Troop Flag', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'LEADER'], description: 'Sororitas battle standard.' },
  { id: 'cyberteknika_cranial_sor', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_sor', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_sor', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_sor', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
];

// ---------------------------------------------------------------------------
// Officio Assassinorum – faction-specific equipment
// ---------------------------------------------------------------------------
export const officioAssassinorumEquipment: WargearOption[] = [
  { id: 'synskin_bodyglove', name: 'Synskin Bodyglove', type: 'armor', slot: 'body-armour', cost: 20, keywords: ['-1 INJURY MODIFIER', 'IMPERVIOUS'], description: '-1 INJURY MODIFIER, IMPERVIOUS. Elite Only.', statModifiers: { armourSave: -1 } },
  { id: 'sentinel_array_oa', name: 'Sentinel Array', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Model can Charge an enemy it cannot see.' },
  { id: 'spy_mask_oa', name: 'Spy Mask', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Ignore Long Range penalties.' },
  { id: 'holy_relic_oa', name: 'Holy Relic', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Sacred relic providing divine protection. Elite Only.' },
  { id: 'purity_seal_oa', name: 'Purity Seal', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Purity seal granting spiritual protection.' },
];

// ---------------------------------------------------------------------------
// Tyranids – faction-specific equipment
// ---------------------------------------------------------------------------
export const tyranidsEquipment: WargearOption[] = [
  { id: 'abhorrent_pheromones', name: 'Abhorrent Pheromones', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['FEAR'], description: 'The model gains the FEAR Keyword. Elite Only.', grantsKeywords: ['FEAR'] },
  { id: 'adrenal_glands', name: 'Adrenal Glands', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: [], description: '+1 DICE on Dash Success Rolls. Gaunt Only.' },
  { id: 'acid_blood', name: 'Acid Blood', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Enemy suffers 1 BM when it causes any BMs against this model in melee. Elite Only.' },
  { id: 'acid_maw', name: 'Acid Maw', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: [], description: 'Melee attacks gain ARMOUR PIERCING 1. Gaunt Only.' },
  { id: 'balemind_membrane', name: 'Balemind Membrane', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: [], description: 'Enemies cannot Deny the Witch against this model\'s psychic powers. Psyker Only.' },
  { id: 'bioplasma_discharger', name: 'Bioplasma Discharger', type: 'equipment', slot: 'equipment', cost: 4, costCurrency: 'glory', limit: 1, keywords: ['FIRE'], description: 'All melee weapons gain the FIRE Keyword. Elite Only.' },
  { id: 'bonded_exoskeleton', name: 'Bonded Exoskeleton', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['IMPERVIOUS'], description: 'The model\'s armour gains the IMPERVIOUS Keyword. Elite with -2 or higher Armour modifier only.' },
  { id: 'dermic_symbiosis', name: 'Dermic Symbiosis', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'The model gains NEGATE SHRAPNEL.' },
  { id: 'enhanced_senses', name: 'Enhanced Senses', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: [], description: 'The model can Charge an enemy it cannot see.' },
  { id: 'flesh_hooks', name: 'Flesh Hooks', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'Enemies cannot Retreat while within 1" of this model. Elite or Tyranid Warrior Only.' },
  { id: 'membranous_mobility', name: 'Membranous Mobility', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: '+1 DICE on Climb, Jump, and Diving Charge Success Rolls.' },
  { id: 'metamorphic_regrowth', name: 'Metamorphic Regrowth', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', limit: 2, keywords: ['REGENERATE 1'], description: 'At the start of this model\'s Activation, remove 1 BM.' },
  { id: 'temperature_adaptation', name: 'Temperature Adaptation', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['NEGATE FIRE'], description: 'The model gains NEGATE FIRE.' },
  { id: 'toxin_sacs', name: 'Toxin Sacs', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 2, keywords: [], description: 'Melee attacks cause INFECTION MARKERS instead of BMs.' },
];

// ---------------------------------------------------------------------------
// T'au Empire – faction-specific equipment
// ---------------------------------------------------------------------------
export const tauEmpireEquipment: WargearOption[] = [
  { id: 'battle_armour_tau', name: 'Battle Armour', type: 'armor', slot: 'body-armour', cost: 17, keywords: ['-1 INJURY MODIFIER', 'NEGATE SHRAPNEL'], description: '-1 INJURY MODIFIER, NEGATE SHRAPNEL.', statModifiers: { armourSave: -1 } },
  { id: 'shield_generator_tau', name: 'Shield Generator', type: 'armor', slot: 'body-armour', cost: 10, keywords: ['-1 INJURY MODIFIER', 'HELD'], description: '-1 INJURY MODIFIER, HELD. Battlesuit Only.', statModifiers: { armourSave: -1 } },
  { id: 'iridium_armour', name: 'Iridium Armour', type: 'armor', slot: 'body-armour', cost: 3, costCurrency: 'glory', limit: 2, keywords: ['-3 INJURY MODIFIER'], description: 'Armour improves to -3 INJURY MODIFIER. Non-Stealth Battlesuit Only.', statModifiers: { armourSave: -3 } },
  { id: 'air_purifiers_tau', name: 'Air Purifiers', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['NEGATE GAS'], description: 'NEGATE GAS. Battlesuit Only.' },
  { id: 'automated_repair_system', name: 'Automated Repair System', type: 'equipment', slot: 'equipment', cost: 3, costCurrency: 'glory', keywords: ['REGENERATE 1'], description: 'REGENERATE 1. Battlesuit Only.' },
  { id: 'battlesuit_support_system', name: 'Battlesuit Support System', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'This model\'s attacks have -1 DICE to Hit when Retreating. Battlesuit Only.' },
  { id: 'comms_unit_tau', name: 'Comms Unit', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Risky action: transfer this model\'s Activation to an allied model within 12".' },
  { id: 'energy_shield_tau', name: 'Energy Shield', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Converts Down results to Minor Hits. Shield Drone or Elite Battlesuit Only.' },
  { id: 'firesight_drone_controller', name: 'Firesight Drone Controller', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'The Sniper Drone in your Warband gains +1 INJURY DICE.' },
  { id: 'hover_drone_tau', name: 'Hover Drone', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['8" FLYING'], description: 'The Ethereal gains 8" FLYING movement. Ethereal Only.' },
  { id: 'kroothawk_flock', name: 'Kroothawk Flock', type: 'equipment', slot: 'equipment', cost: 7, limit: 1, keywords: [], description: 'Ignore Cover for ranged attacks against targets within 6". Elite Kroot Only.' },
  { id: 'medical_kit_tau', name: 'Medical Kit', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'Remove 1 BM, or stand up an allied model within 1". Non-Battlesuit Only.' },
  { id: 'multispectrum_sensor_suite', name: 'Multispectrum Sensor Suite', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: [], description: 'Enemy DEEP STRIKE or INFILTRATOR models must set up 16" or more away from this model.' },
  { id: 'protected_servos_tau', name: 'Protected Servos', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL. Battlesuit Only.' },
  { id: 'vectored_manoeuvring_thrusters', name: 'Vectored Manoeuvring Thrusters', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: ['SKIRMISHER'], description: 'Model gains the SKIRMISHER Keyword. Flying Battlesuit Only.', grantsKeywords: ['SKIRMISHER'] },
  { id: 'weapon_support_system', name: 'Weapon Support System', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'Ignore all attack roll penalties besides Cover, Long Range, and BLOOD MARKERS (including INFECTION and STUN), as well as penalties or limits to range of ranged weapons. Battlesuit Only.' },
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
  { id: 'musical_instrument_slanni', name: 'Musical Instrument', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. Friendly models within 4" gain +1 DICE to Dash Success Rolls.' },
  { id: 'troop_icon_slanni', name: 'Troop Icon', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['HELD', 'LEADER'], description: 'HELD, LEADER.' },
];

// ---------------------------------------------------------------------------
// Orks – faction-specific equipment
// ---------------------------------------------------------------------------
export const orksEquipment: WargearOption[] = [
  { id: 'eavy_armour_orks', name: "'Eavy Armour", type: 'armor', slot: 'body-armour', cost: 10, keywords: ['-1 INJURY MODIFIER'], description: '-1 INJURY MODIFIER. Counts as D3 for charge distance unless STRONG.', statModifiers: { armourSave: -1 } },
  { id: 'ded_ard_armour', name: "Ded 'Ard Armour", type: 'armor', slot: 'body-armour', cost: 3, costCurrency: 'glory', limit: 2, keywords: ['-2 INJURY MODIFIER', 'HEAVY'], description: '-2 INJURY MODIFIER, HEAVY. Elite or Nob Only.', statModifiers: { armourSave: -2 } },
  { id: 'mega_armour_orks', name: 'Mega Armour', type: 'armor', slot: 'body-armour', cost: 50, limit: 2, keywords: ['-3 INJURY MODIFIER', 'HEAVY', 'VEHICLE', 'LARGE'], description: '-3 INJURY MODIFIER, HEAVY, VEHICLE, LARGE. Down results become Minor Hits. Elite or Nob Only.', grantsKeywords: ['VEHICLE', 'LARGE'], statModifiers: { armourSave: -3 } },
  { id: 'ammo_runt', name: 'Ammo Runt', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['ASSISTANT'], description: 'Once per battle, continue Activation after a failed Risky attack roll. ASSISTANT.' },
  { id: 'ard_hat_orks', name: "'Ard Hat", type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'bosspole_orks', name: 'Bosspole', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'LEADER'], description: 'HELD (by Gretchin), LEADER. Elite or Gretchin Only.' },
  { id: 'distraction_grot', name: 'Distraction Grot', type: 'equipment', slot: 'equipment', cost: 3, keywords: ['CONSUMABLE', 'ASSISTANT'], description: 'Once per battle: -1 DICE to enemy Injury roll against this model. Kommando Only.' },
  { id: 'grot_gunner', name: 'Grot Gunner', type: 'equipment', slot: 'equipment', cost: 20, keywords: ['ASSISTANT'], description: '+1 Ranged Skill with Warbike\'s Built-In Shoota. Warbike Only.' },
  { id: 'grot_oiler', name: 'Grot Oiler', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['ASSISTANT'], description: 'Once per battle: remove 1 BM. Mega Armour or Deff Dread Only.' },
  { id: 'grot_orderly', name: 'Grot Orderly', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['ASSISTANT'], description: 'Once per battle: +2 DICE to Sawbonez roll. Painboss Only.' },
  { id: 'iron_gob_orks', name: 'Iron Gob', type: 'equipment', slot: 'equipment', cost: 15, limit: 3, keywords: ['FEAR'], description: 'Model gains the FEAR Keyword. Elite or Nob Only.', grantsKeywords: ['FEAR'] },
  { id: 'jump_rokkit_orks', name: 'Jump Rokkit', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'Once per Activation: move 12" FLYING (Risky). Stormboy Only.' },
  { id: 'personal_tellyporta', name: 'Personal Tellyporta', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['DEEP STRIKE'], description: 'Model gains the DEEP STRIKE Keyword. Mek Only.', grantsKeywords: ['DEEP STRIKE'] },
  { id: 'squig_bomb', name: 'Squig Bomb', type: 'equipment', slot: 'equipment', cost: 20, keywords: ['BLAST 3"'], description: 'Detonate for a BLAST 3" explosion. Squig Only.' },
  { id: 'warbike_orks', name: 'Warbike', type: 'equipment', slot: 'equipment', cost: 50, limit: 3, keywords: ['LARGE', 'VEHICLE', '10" movement'], description: 'LARGE, VEHICLE, 10" movement. Built-In Shoota. Drive-by Dakka ability.' },
  { id: 'cyberteknika_cranial_orks', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_orks', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_orks', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_orks', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 5, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_torsonic_orks', name: 'Torsonic Cyberteknika', type: 'equipment', slot: 'equipment', cost: 25, limit: 2, keywords: ['PERMANENT'], description: 'Torsonic cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_vascular_orks', name: 'Vascular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['PERMANENT'], description: 'Vascular cybernetic enhancement. Cannot be removed or sold.' },
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
  { id: 'scope_votann', name: 'Scope', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Scope upgrade.' },
  { id: 'troop_flag_votann', name: 'Troop Flag', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', limit: 1, keywords: ['HELD', 'LEADER'], description: 'Troop Flag.' },
  { id: 'vox_unit_votann', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Communications device.' },
  { id: 'musical_instrument_votann', name: 'Musical Instrument', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. +1 DICE to Dash for allies within 4".' },
];

// ---------------------------------------------------------------------------
// Harlequins – faction-specific equipment
// ---------------------------------------------------------------------------
export const harlequinsEquipment: WargearOption[] = [
  { id: 'holo_suit', name: 'Holo-Suit', type: 'armor', slot: 'body-armour', cost: 10, keywords: ['-1 DICE to Hit (attacks)'], description: 'All attacks against this model have -1 DICE to Hit.', statModifiers: { armourSave: 0 } },
  { id: 'bio_explosive_ammunition', name: 'Bio-Explosive Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: ['CONSUMABLE', 'BLAST 2"'], description: 'When a target is taken Out of Action, it explodes as a BLAST 2" SHRAPNEL attack. For Shuriken weapons only.' },
  { id: 'flip_belt_harlequins', name: 'Flip Belt', type: 'equipment', slot: 'equipment', cost: 5, keywords: [], description: 'Automatically succeed on Climb and Jump actions, no injury from falling, +1 DICE on Diving Charges.' },
];

// ---------------------------------------------------------------------------
// Genestealer Cults – faction-specific equipment
// ---------------------------------------------------------------------------
export const genestealerCultsEquipment: WargearOption[] = [
  { id: 'atalan_bike', name: 'Atalan Bike', type: 'equipment', slot: 'equipment', cost: 25, limit: 3, keywords: ['LARGE', 'VEHICLE', '10" movement'], description: 'LARGE, VEHICLE, 10" movement. Demolition Run and Outrider abilities. Neophyte Only.' },
  { id: 'atalan_quad', name: 'Atalan Quad', type: 'equipment', slot: 'equipment', cost: 45, limit: 1, keywords: ['LARGE', 'VEHICLE', '-1 INJURY MODIFIER'], description: 'LARGE, VEHICLE, 10" movement, -1 INJURY MODIFIER. Turbo-Boost ability. Neophyte Only.' },
  { id: 'camo_cloak_gsc', name: 'Camo Cloak', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['STEALTH'], description: 'Camouflage cloak.', grantsKeywords: ['STEALTH'] },
  { id: 'cult_icon_gsc', name: 'Cult Icon', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD', 'LEADER'], description: 'Faction icon providing leadership benefits.' },
  { id: 'psychic_familiar_gsc', name: 'Psychic Familiar', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: [], description: 'Psychic familiar assisting the bearer.' },
  { id: 'combat_helmet_gsc', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 5, keywords: ['NEGATE SHRAPNEL'], description: 'NEGATE SHRAPNEL.' },
  { id: 'photo_goggles_gsc', name: 'Photo Goggles', type: 'equipment', slot: 'equipment', cost: 3, keywords: [], description: 'Enhanced vision goggles.' },
  { id: 'scope_gsc', name: 'Scope', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 2, keywords: [], description: 'Scope upgrade.' },
  { id: 'vox_unit_gsc', name: 'Vox Unit', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Communications device.' },
  { id: 'cyberteknika_cranial_gsc', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_gsc', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_gsc', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_gsc', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
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
  { id: 'scourge_wings', name: 'Scourge Wings', type: 'equipment', slot: 'equipment', cost: 30, limit: 2, keywords: ['8" FLYING', 'INFILTRATOR', 'SKIRMISHER'], description: '8" FLYING, INFILTRATOR, SKIRMISHER. Archon or Kabalite Only.', grantsKeywords: ['INFILTRATOR', 'SKIRMISHER'] },
  { id: 'shadow_field_drukhari', name: 'Shadow Field', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 2, keywords: [], description: 'Down results become Minor Hits. Elite Only.' },
  { id: 'soul_seeker_ammunition', name: 'Soul Seeker Ammunition', type: 'equipment', slot: 'equipment', cost: 5, limit: 2, keywords: ['CONSUMABLE', 'IGNORE COVER'], description: 'AMMUNITION (IGNORE COVER) for Splinter weapons. CONSUMABLE.' },
  { id: 'tormentor_helm', name: 'Tormentor Helm', type: 'equipment', slot: 'headgear', cost: 10, keywords: ['IGNORE LONG RANGE'], description: '8", ASSAULT, IGNORE LONG RANGE, SHRAPNEL, THROWN. Built-in thrown weapon. Incubus Only.' },
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
  { id: 'isitha_kasra', name: 'Isitha Kasra', type: 'equipment', slot: 'equipment', cost: 15, limit: 1, keywords: ['HELD'], description: 'HELD. Friendly models within 4" gain +1 DICE to Dash Success Rolls.' },
  { id: 'jetbike_aeldari', name: 'Jetbike', type: 'equipment', slot: 'equipment', cost: 25, keywords: ['10" FLYING', 'VEHICLE', 'MOUNT'], description: '10" FLYING movement, VEHICLE, MOUNT. Shining Spear Only.' },
  { id: 'jetbike_shimmershield', name: 'Jetbike Shimmershield', type: 'equipment', slot: 'equipment', cost: 15, keywords: [], description: 'Down results become Minor Hits. Shining Spear Only.' },
  { id: 'mandiblasters_aeldari', name: 'Mandiblasters', type: 'equipment', slot: 'equipment', cost: 7, keywords: [], description: 'Enemies that Charge this model gain 1 BM before combat. Striking Scorpion Only.' },
  { id: 'shimmershield_aeldari', name: 'Shimmershield', type: 'equipment', slot: 'equipment', cost: 2, costCurrency: 'glory', limit: 1, keywords: [], description: 'Down results become Minor Hits. Elite Only.' },
  { id: 'spirit_stone_aeldari', name: 'Spirit Stone', type: 'equipment', slot: 'equipment', cost: 6, costCurrency: 'glory', limit: 1, keywords: [], description: 'The first psychic power used each Activation does not count towards the limit. Psyker Only.' },
  { id: 'swooping_hawk_wings', name: 'Swooping Hawk Wings', type: 'equipment', slot: 'equipment', cost: 25, keywords: ['10" FLYING'], description: '10" FLYING movement. Autarch or Swooping Hawk Only.' },
];

// ---------------------------------------------------------------------------
// Pirate Crew – faction-specific equipment
// ---------------------------------------------------------------------------
export const pirateCrewEquipment: WargearOption[] = [
  { id: 'blade_venom_pirate', name: 'Blade Venom', type: 'equipment', slot: 'equipment', cost: 5, limit: 3, keywords: ['CONSUMABLE', 'GAS'], description: 'Blade and CCW weapons gain the GAS Keyword for one battle. CONSUMABLE.' },
  { id: 'cyber_parrot', name: 'Cyber Parrot', type: 'equipment', slot: 'equipment', cost: 3, keywords: [], description: 'Once per battle: force an enemy to have -1 DICE to Hit in melee. Elite Only.' },
  { id: 'pirate_bike', name: 'Pirate Bike', type: 'equipment', slot: 'equipment', cost: 20, limit: 2, keywords: ['LARGE', 'VEHICLE', '10" movement'], description: 'LARGE, VEHICLE, 10" movement. +1 DICE to Dash Success Rolls.' },
  { id: 'pirate_trophy', name: 'Pirate Trophy', type: 'equipment', slot: 'equipment', cost: 15, limit: 3, keywords: ['FEAR'], description: 'Model gains the FEAR Keyword.', grantsKeywords: ['FEAR'] },
  { id: 'manstopper_ammunition_pirate', name: 'Manstopper Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'Manstopper round upgrade. CONSUMABLE.' },
  { id: 'radium_ammunition_pirate', name: 'Radium Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 2, keywords: ['CONSUMABLE'], description: 'Radium round upgrade. CONSUMABLE.' },
  { id: 'cyberteknika_cranial_pirate', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_pirate', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_pirate', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 15, keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_pirate', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 10, keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
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
  { id: 'heavy_hunting_rig_venators', name: 'Heavy Hunting Rig', type: 'armor', slot: 'body-armour', cost: 50, keywords: ['-3 INJURY MODIFIER', 'LARGE', 'VEHICLE'], description: '-3 INJURY MODIFIER, LARGE, VEHICLE. Venators Elite Only.', statModifiers: { armourSave: -3 } },
  { id: 'yeld_hunting_rig_venators', name: 'Yeld Hunting Rig', type: 'armor', slot: 'body-armour', cost: 60, keywords: ['-2 INJURY MODIFIER', '8" FLYING', 'INFILTRATOR', 'STEALTH', 'VEHICLE'], description: '-2 INJURY MODIFIER, 8" FLYING, INFILTRATOR, STEALTH, VEHICLE. Venators.', grantsKeywords: ['INFILTRATOR', 'STEALTH'], statModifiers: { armourSave: -2 } },
  { id: 'sthenian_hunting_rig_venators', name: 'Sthenian Hunting Rig', type: 'armor', slot: 'body-armour', cost: 65, keywords: ['-3 INJURY MODIFIER', 'LARGE', 'VEHICLE'], description: '-3 INJURY MODIFIER, LARGE, VEHICLE. Venators Hunt Leader Only.', statModifiers: { armourSave: -3 } },
  { id: 'mirror_shield_venators', name: 'Mirror Shield', type: 'armor', slot: 'body-armour', cost: 15, keywords: ['-1 INJURY MODIFIER', 'Shield'], description: '-1 INJURY MODIFIER. Built-in melee weapon. Venators Hunting Rig Only.', statModifiers: { armourSave: -1 } },
  { id: 'incendiary_grenades_venators', name: 'Incendiary Grenades', type: 'equipment', slot: 'equipment', cost: 15, limit: 2, keywords: ['THROWN', 'FIRE'], description: 'Thrown incendiary grenades. Venators.' },
  // Palanite Enforcers
  { id: 'magnacles_enforcers', name: 'Magnacles', type: 'equipment', slot: 'equipment', cost: 10, limit: 3, keywords: [], description: 'Enemy models in close combat cannot stand up from being Down. Palanite Enforcers.' },
  { id: 'nuncio_aquila_enforcers', name: 'Nuncio Aquila', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['FEAR'], description: 'Model gains the FEAR Keyword. Palanite Enforcers.', grantsKeywords: ['FEAR'] },
  // Psychic (available to psyker models)
  { id: 'psychic_familiar_nec', name: 'Psychic Familiar', type: 'equipment', slot: 'equipment', cost: 5, limit: 1, keywords: [], description: 'Once per battle, when the owner makes a PSYCHIC attack or takes a PSYCHIC Success Roll, it can add +1 DICE to that roll. LIMIT: 1.' },
  // Necromunda Shared Armoury cyberteknika (all gangs, 1 Glory each)
  { id: 'cyberteknika_cranial_nec', name: 'Cranial Cyberteknika', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['PERMANENT'], description: 'Cranial cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_ocular_nec', name: 'Ocular Cyberteknika', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['PERMANENT'], description: 'Ocular cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_sindexterous_nec', name: 'Sindexterous Cyberteknika', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['PERMANENT'], description: 'Sindexterous cybernetic enhancement. Cannot be removed or sold.' },
  { id: 'cyberteknika_motive_nec', name: 'Motive Cyberteknika', type: 'equipment', slot: 'equipment', cost: 1, costCurrency: 'glory', keywords: ['PERMANENT'], description: 'Motive cybernetic enhancement. Cannot be removed or sold.' },
  // Necromunda shared ammo
  { id: 'manstopper_ammunition_nec', name: 'Manstopper Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'Manstopper round upgrade. CONSUMABLE.' },
  { id: 'radium_ammunition_nec', name: 'Radium Ammunition', type: 'equipment', slot: 'equipment', cost: 10, limit: 1, keywords: ['CONSUMABLE'], description: 'Radium round upgrade. CONSUMABLE.' },
];

// ---------------------------------------------------------------------------
// Combined master exports
// ---------------------------------------------------------------------------

/** All faction-specific equipment arrays combined */
export const allFactionEquipment: WargearOption[] = [
  ...allHAEquipment,
  ...haVariantEquipment,
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
