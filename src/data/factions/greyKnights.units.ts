import { UnitOption } from '../../types/index.js';

// ==========================================================================
// GREY KNIGHTS (Adeptus Astartes variant)
// ==========================================================================
export const gk_captain: UnitOption = {
  id: 'gk_captain', name: 'Captain', baseCost: 110, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'LEADER', 'TOUGH'],
  baseSize: '40mm',
  faction: 'grey_knights', unitType: 'elite',
  description: 'Mandatory leader of the Grey Knights warband. (70cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const gk_apothecary: UnitOption = {
  id: 'gk_apothecary', name: 'Apothecary', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE'],
  baseSize: '40mm',
  faction: 'grey_knights', unitType: 'elite',
  description: 'Healer and gene-seed harvester.',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
    { id: 'gk_narthecium', name: 'Narthecium', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 1', 'HELD'],
      description: 'HELD Ã¢â‚¬â€ occupies a hand but functions as a medical tool. Enables the Apothecary\'s healing abilities.' },
  ], availableWargear: [],
};
export const gk_chaplain: UnitOption = {
  id: 'gk_chaplain', name: 'Chaplain', baseCost: 120, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE'],
  baseSize: '40mm',
  faction: 'grey_knights', unitType: 'elite',
  description: 'Spiritual leader of the Chapter. (80cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
    { id: 'gk_crozius_arcanum', name: 'Crozius Arcanum', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 2', 'ICON'],
      description: 'Ritual weapon of the Chaplain, a symbol of faith and fury.' },
  ], availableWargear: [],
};
export const gk_librarian: UnitOption = {
  id: 'gk_librarian', name: 'Librarian', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'PSYKER 2'],
  baseSize: '40mm',
  faction: 'grey_knights', unitType: 'elite',
  description: 'Psyker warrior of the Chapter.',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const gk_scout_marine: UnitOption = {
  id: 'gk_scout_marine', name: 'Scout Marine', baseCost: 55, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'NO PROMOTION'],
  baseSize: '25-32mm',
  faction: 'grey_knights', unitType: 'troop',
  description: 'Grey Knight neophyte recon specialist.',
  defaultWargear: [
    { id: 'standard_armour', name: 'Standard Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-1 INJURY MODIFIER'], description: 'Mandatory Standard Armour (included in unit cost).',
      statModifiers: { armourSave: -1 } },
  ], availableWargear: [],
};
export const gk_space_marine: UnitOption = {
  id: 'gk_space_marine', name: 'Space Marine', baseCost: 95, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES'],
  baseSize: '32mm',
  faction: 'grey_knights', unitType: 'troop',
  description: 'Enhanced Grey Knight warrior.',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const gk_terminator: UnitOption = {
  id: 'gk_terminator', name: 'Terminator', baseCost: 145, minCount: 0, maxCount: 3, maxCountLarge: 4,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'DEEP STRIKE', 'LARGE', 'STRONG', 'VEHICLE'],
  baseSize: '40mm',
  faction: 'grey_knights', unitType: 'troop',
  description: 'Elite warrior in ancient Terminator armour.',
  defaultWargear: [
    { id: 'terminator_armour', name: 'Terminator Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-3 INJURY MODIFIER'], description: 'Mandatory Terminator Armour (included in unit cost).',
      statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
};
export const gk_dreadnought: UnitOption = {
  id: 'gk_dreadnought', name: 'Dreadnought', baseCost: 170, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'DREADNOUGHT_CHASSIS', 'FEAR', 'LARGE', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'grey_knights', unitType: 'troop',
  description: 'Ancient warrior entombed in a walking combat platform. Can be equipped with up to 2 TWO-HANDED or HEAVY weapons (melee or ranged). Cannot equip equipment, armour (beyond chassis plating), or thrown weapons.',
  abilities: [
    { id: 'gk_dreadnought_armaments', name: 'Dreadnought Armaments', description: 'While equipped with two ranged weapons, the Dreadnought can make a Shoot Action with both of them during its Activation.', type: 'passive' },
    { id: 'gk_dreadnought_wisdom', name: 'Wisdom of the Ancients', description: 'Other friendly ASTARTES models within 3" of the Dreadnought have +1 DICE to Hit with all attacks.', type: 'aura' },
    { id: 'gk_dreadnought_ccw', name: 'Unarmed Chassis', description: 'If the Dreadnought is equipped with only ranged weapons and no melee weapons, it also counts as being equipped with a Close Combat Weapon.', type: 'passive' },
  ],
  defaultWargear: [
    { id: 'heavy_armour_plating', name: 'Heavy Armour Plating', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-3 INJURY MODIFIER'], description: 'Heavy armour plating built into the Dreadnought chassis (included in unit cost).',
      statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
};
