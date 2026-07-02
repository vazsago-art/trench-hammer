import { UnitOption } from '../../types/index.js';

// ==========================================================================
// ADEPTUS ASTARTES
// ==========================================================================
export const aa_captain: UnitOption = {
  id: 'aa_captain', name: 'Captain', baseCost: 120, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'LEADER', 'TOUGH'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'elite',
  description: 'Mandatory leader of the Space Marine warband. (80cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_standard_armour_swap', name: 'Standard Armour', cost: -25, maxCount: 99,
      statModifiers: { armourSave: 1 },
      requiredSubfactionId: 'space_wolves',
      description: 'Wolves of Winter: replaces Power Armour with Standard Armour (Ã¢Ë†â€™1 Armour Save, saves 25 credits). Up to half of your Astartes (rounded down) may take this option.' },
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_apothecary: UnitOption = {
  id: 'aa_apothecary', name: 'Apothecary', baseCost: 120, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'NEGATE FEAR'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'elite',
  description: 'Healer and gene-seed harvester.',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
    { id: 'aa_narthecium', name: 'Narthecium', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 1', 'HELD'],
      description: 'HELD Ã¢â‚¬â€ occupies a hand but functions as a medical tool. Enables the Apothecary\'s healing abilities.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_chaplain: UnitOption = {
  id: 'aa_chaplain', name: 'Chaplain', baseCost: 130, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'NEGATE FEAR'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'elite',
  description: 'Spiritual leader of the Chapter. (90cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
    { id: 'aa_crozius_arcanum', name: 'Crozius Arcanum', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 2', 'ICON'],
      description: 'Ritual weapon of the Chaplain, a symbol of faith and fury.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_standard_armour_swap', name: 'Standard Armour', cost: -25, maxCount: 99,
      statModifiers: { armourSave: 1 },
      requiredSubfactionId: 'space_wolves',
      description: 'Wolves of Winter: replaces Power Armour with Standard Armour (Ã¢Ë†â€™1 Armour Save, saves 25 credits). Up to half of your Astartes (rounded down) may take this option.' },
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_librarian: UnitOption = {
  id: 'aa_librarian', name: 'Librarian', baseCost: 125, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'PSYKER 2', 'NEGATE FEAR'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'elite',
  description: 'Psyker warrior of the Chapter.',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_standard_armour_swap', name: 'Standard Armour', cost: -25, maxCount: 99,
      statModifiers: { armourSave: 1 },
      requiredSubfactionId: 'space_wolves',
      description: 'Wolves of Winter: replaces Power Armour with Standard Armour (Ã¢Ë†â€™1 Armour Save, saves 25 credits). Up to half of your Astartes (rounded down) may take this option.' },
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_scout_marine: UnitOption = {
  id: 'aa_scout_marine', name: 'Scout Marine', baseCost: 55, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'NO PROMOTION'],
  baseSize: '32mm',
  faction: 'adeptus_astartes', unitType: 'troop',
  description: 'Space Marine neophyte recon specialist.',
  defaultWargear: [
    { id: 'standard_armour', name: 'Standard Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-1 INJURY MODIFIER'], description: 'Mandatory Standard Armour (included in unit cost).',
      statModifiers: { armourSave: -1 } },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_space_marine: UnitOption = {
  id: 'aa_space_marine', name: 'Space Marine', baseCost: 105, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'NEGATE FEAR'],
  baseSize: '32mm',
  faction: 'adeptus_astartes', unitType: 'troop',
  description: 'Enhanced superhuman warrior in power armour.',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_assault_marine', name: 'Assault Marine', cost: 5, maxCount: 2, maxCountLarge: 3,
      grantedKeywords: ['SKIRMISHER'],
      description: 'Can be equipped with a Jump Pack. While wearing a Jump Pack, gains the SKIRMISHER Keyword. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'aa_inceptor', name: 'Inceptor', cost: 15, maxCount: 1, countsAsUpgradeIds: ['aa_assault_marine'],
      grantedKeywords: ['SKIRMISHER'],
      perModelWargearLimits: { plasma_pistol: 2 },
      description: 'Grants Assault Marine benefits and counts toward Assault Marine limits. Pistoleer: if equipped with 2 PISTOL weapons it can Shoot with one then immediately Shoot with the other; PISTOL weapons gain IGNORE OFF-HAND WEAPON. Can be equipped with up to 2 Plasma Pistols.' },
    { id: 'aa_suppressor', name: 'Suppressor', cost: 15, maxCount: 1, countsAsUpgradeIds: ['aa_assault_marine', 'aa_devastator'],
      grantedKeywords: ['SKIRMISHER'],
      description: 'Grants Assault Marine and Devastator benefits and counts toward both limits. Can carry one HEAVY ranged weapon while equipped with a Jump Pack.' },
    { id: 'aa_bladeguard', name: 'Bladeguard', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'When making a Charge roll, roll 2D6 and use the highest result. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'aa_devastator', name: 'Devastator', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Ignores the HEAVY Keyword of one ranged weapon they carry. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'aa_vanguard', name: 'Vanguard', cost: 5, maxCount: 2, maxCountLarge: 3,
      grantedKeywords: ['INFILTRATOR'],
      description: 'Gains the INFILTRATOR Keyword. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'aa_standard_armour_swap', name: 'Standard Armour', cost: -25, maxCount: 99,
      statModifiers: { armourSave: 1 },
      requiredSubfactionId: 'space_wolves',
      description: 'Wolves of Winter: replaces Power Armour with Standard Armour (Ã¢Ë†â€™1 Armour Save, saves 25 credits). Up to half of your Astartes (rounded down) may take this option.' },
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_terminator: UnitOption = {
  id: 'aa_terminator', name: 'Terminator', baseCost: 155, minCount: 0, maxCount: 2, maxCountLarge: 3,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'DEEP STRIKE', 'LARGE', 'NEGATE FEAR', 'STRONG', 'VEHICLE'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'troop',
  description: 'Elite warrior in ancient Terminator armour.',
  defaultWargear: [
    { id: 'terminator_armour', name: 'Terminator Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-3 INJURY MODIFIER'], description: 'Mandatory Terminator Armour (included in unit cost).',
      statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_dreadnought: UnitOption = {
  id: 'aa_dreadnought', name: 'Venerable Dreadnought', baseCost: 170, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'DREADNOUGHT_CHASSIS', 'FEAR', 'LARGE', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  description: 'The Venerable Dreadnought is equipped with heavy armour plating, included in the cost and its statistics above. Instead of normal limits for hands, the Venerable Dreadnought can be equipped with up to a total of two TWO-HANDED and/or HEAVY weapons, melee or ranged. It must still obey the CUMBERSOME Keyword when fighting in melee. If it is equipped with only ranged weapons, it also counts as being equipped with a Close Combat Weapon.',
  baseSize: '60mm',
  faction: 'adeptus_astartes', unitType: 'troop',
  abilities: [
    { id: 'aa_dreadnought_armaments', name: 'Dreadnought Armaments', description: 'While equipped with two ranged weapons, the Venerable Deadnought can make a Shoot Action with both of them during its Activation.', type: 'passive' },
    { id: 'aa_dreadnought_wisdom', name: 'Wisdom of the Ancients', description: 'Other friendly ASTARTES models within 6” of the Venerable Dreadnought have NEGATE FEAR.', type: 'aura' },
    { id: 'aa_dreadnought_ccw', name: 'Unarmed Chassis', description: 'If the Dreadnought is equipped with only ranged weapons and no melee weapons, it also counts as being equipped with a Close Combat Weapon.', type: 'passive' },
  ],
  defaultWargear: [
    { id: 'heavy_armour_plating', name: 'Heavy Armour Plating', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-3 INJURY MODIFIER'], description: 'Heavy armour plating built into the Dreadnought chassis (included in unit cost).',
      statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
};
// --- Space Wolves extra units (added via subfaction extraUnits) ---
export const aa_fenrisian_wolf: UnitOption = {
  id: 'aa_fenrisian_wolf', name: 'Fenrisian Wolf', baseCost: 60, minCount: 0, maxCount: 3,
  stats: { movement: 10, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEAST', 'LARGE', 'NO PROMOTION'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'troop',
  description: 'Loyal predatory beast of Fenris. Cannot be equipped with any weapons, armour, or equipment.',
  cannotEquip: true,
  abilities: [
    { id: 'aa_fenrisian_wolf_predatory_instinct', name: 'Predatory Instinct', description: 'When an enemy within 12" Charges an ally, the Fenrisian Wolf can immediately activate before the Charge roll (if it hasn\'t activated this Turn). Its first action must be to Charge that enemy; if it fails to reach close combat its Activation ends. Then normal activation order resumes.', type: 'passive' },
    { id: 'aa_fenrisian_wolf_hunting_hound', name: 'Hunting Hound', description: '+1 DICE on all Dash, Climb, and Jump Success Rolls.', type: 'passive' },
  ],
  defaultWargear: [
    { id: 'aa_teeth_and_claws', name: 'Teeth and Claws', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['CLEAVE 2'],
      description: 'Melee, CLEAVE 2. Built-in natural weapon.' },
  ], availableWargear: [],
};
export const aa_wulfen: UnitOption = {
  id: 'aa_wulfen', name: 'Wulfen', baseCost: 95, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 2, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'BEAST', 'LARGE', 'LIMITED POTENTIAL', 'STRONG'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'troop',
  description: 'Feral Space Wolf consumed by the Curse of the Wulfen. (80cr base + 15cr Standard Armour)',
  abilities: [
    { id: 'aa_wulfen_savage_frenzy', name: 'Savage Frenzy', description: 'When an enemy in close combat Retreats, the Wulfen has +1 DICE to Hit and +1 INJURY DICE for its free attack against that model.', type: 'passive' },
    { id: 'aa_wulfen_wulfen_howl', name: 'Wulfen Howl', description: 'The Wulfen and any allies within 6" roll 2D6 instead of 1D6 when determining Charge distance, taking the highest result.', type: 'aura' },
  ],
  defaultWargear: [
    { id: 'standard_armour', name: 'Standard Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-1 INJURY MODIFIER'], description: 'Mandatory Standard Armour (included in unit cost).',
      statModifiers: { armourSave: -1 } },
  ], availableWargear: [],
};
