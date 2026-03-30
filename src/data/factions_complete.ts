import { Faction, UnitOption } from '../types/index.js';
import { MARKS_OF_CHAOS_UPGRADES } from './equipment.js';
import { unitAbilitiesMap } from './unit_abilities.js';

/** Injects abilities from unitAbilitiesMap into a unit if the ID has a mapping. */
function wa(unit: UnitOption): UnitOption {
  const abilities = unitAbilitiesMap[unit.id];
  if (!abilities || abilities.length === 0) return unit;
  return { ...unit, abilities };
}

/** Applies ability injection to an entire units array. */
function applyAbilities(units: UnitOption[]): UnitOption[] {
  return units.map(wa);
}


// ==========================================================================
// ADEPTUS ASTARTES
// ==========================================================================
export const aa_captain: UnitOption = {
  id: 'aa_captain', name: 'Captain', baseCost: 110, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'LARGE', 'LEADER', 'TOUGH'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'elite',
  description: 'Mandatory leader of the Space Marine warband. (70cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_apothecary: UnitOption = {
  id: 'aa_apothecary', name: 'Apothecary', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'LARGE'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'elite',
  description: 'Healer and gene-seed harvester.',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
    { id: 'aa_narthecium', name: 'Narthecium', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 1', 'HELD'],
      description: 'HELD — occupies a hand but functions as a medical tool. Enables the Apothecary\'s healing abilities.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_chaplain: UnitOption = {
  id: 'aa_chaplain', name: 'Chaplain', baseCost: 120, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'LARGE'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'elite',
  description: 'Spiritual leader of the Chapter. (80cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
    { id: 'aa_crozius_arcanum', name: 'Crozius Arcanum', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 2', 'LEADER'],
      description: 'Ritual weapon of the Chaplain, a symbol of faith and fury.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_librarian: UnitOption = {
  id: 'aa_librarian', name: 'Librarian', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'LARGE', 'PSYKER 2'],
  baseSize: '40mm',
  faction: 'adeptus_astartes', unitType: 'elite',
  description: 'Psyker warrior of the Chapter.',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_scout_marine: UnitOption = {
  id: 'aa_scout_marine', name: 'Scout Marine', baseCost: 55, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'NO PROMOTION'],
  baseSize: '25-32mm',
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
  id: 'aa_space_marine', name: 'Space Marine', baseCost: 95, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES'],
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
    { id: 'aa_bladeguard', name: 'Bladeguard', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'When making a Charge roll, roll 2D6 and use the highest result. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'aa_devastator', name: 'Devastator', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Ignores the HEAVY Keyword of one ranged weapon they carry. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'aa_vanguard', name: 'Vanguard', cost: 5, maxCount: 2, maxCountLarge: 3,
      grantedKeywords: ['INFILTRATOR'],
      description: 'Gains the INFILTRATOR Keyword. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'aa_primaris', name: 'Primaris', cost: 5, maxCount: 99, statModifiers: { movement: 1 },
      description: '+1" movement. Can be purchased even after recruitment.' },
  ],
};
export const aa_terminator: UnitOption = {
  id: 'aa_terminator', name: 'Terminator', baseCost: 145, minCount: 0, maxCount: 2, maxCountLarge: 3,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'DEEP STRIKE', 'LARGE', 'STRONG', 'VEHICLE'],
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
  id: 'aa_dreadnought', name: 'Dreadnought', baseCost: 170, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'FEAR', 'LARGE', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'adeptus_astartes', unitType: 'troop',
  description: 'Ancient warrior entombed in a walking combat platform.',
  defaultWargear: [
    { id: 'heavy_armour_plating', name: 'Heavy Armour Plating', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-3 INJURY MODIFIER'], description: 'Heavy armour plating built into the Dreadnought chassis (included in unit cost).',
      statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
};

// ==========================================================================
// ASTRA MILITARUM
// ==========================================================================
export const am_castellan: UnitOption = {
  id: 'am_castellan', name: 'Castellan', baseCost: 70, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MILITARUM', 'ELITE', 'LEADER', 'TOUGH'],
  baseSize: '25-28mm',
  faction: 'astra_militarum', unitType: 'elite',
  description: 'Mandatory officer commanding the Imperial Guard warband.',
  defaultWargear: [], availableWargear: [],
};
export const am_commissar: UnitOption = {
  id: 'am_commissar', name: 'Commissar', baseCost: 40, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MILITARUM', 'ELITE'],
  baseSize: '25-28mm',
  faction: 'astra_militarum', unitType: 'elite',
  description: 'Political officer ensuring loyalty and discipline.',
  defaultWargear: [], availableWargear: [],
};
export const am_primaris_psyker: UnitOption = {
  id: 'am_primaris_psyker', name: 'Primaris Psyker', baseCost: 40, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MILITARUM', 'ELITE', 'PSYKER 1'],
  baseSize: '25-28mm',
  faction: 'astra_militarum', unitType: 'elite',
  description: 'Sanctioned psychic warrior.',
  defaultWargear: [], availableWargear: [],
};
export const am_conscript: UnitOption = {
  id: 'am_conscript', name: 'Conscript', baseCost: 18, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FIRETEAM', 'MILITARUM', 'NO PROMOTION'],
  baseSize: '25mm',
  faction: 'astra_militarum', unitType: 'troop',
  description: 'Hastily recruited soldier. Activates as FIRETEAM with another Conscript; counts as half a model for Morale/Field Strength. +7cr for weapons.',
  defaultWargear: [], availableWargear: [],
  cannotEquip: true,
};
export const am_guardsman: UnitOption = {
  id: 'am_guardsman', name: 'Guardsman', baseCost: 30, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MILITARUM'],
  baseSize: '25mm',
  faction: 'astra_militarum', unitType: 'troop',
  description: 'Disciplined soldier of the Imperial Guard.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'am_catachan_trapper', name: 'Catachan Trapper', cost: 10, maxCount: 3,
      requiredSubfactionId: 'catachan_jungle_fighters',
      grantedKeywords: ['NEGATE MINED'],
      description: 'Catachan only. Up to 3 Guardsmen can be upgraded to Trappers (+10 credits). Gains the Mine Layer ability and NEGATE MINED keyword.' },
  ],
};
export const am_veteran_guardsman: UnitOption = {
  id: 'am_veteran_guardsman', name: 'Veteran Guardsman', baseCost: 40, minCount: 0, maxCount: 5,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MILITARUM'],
  baseSize: '25-28mm',
  faction: 'astra_militarum', unitType: 'troop',
  description: 'Battle-hardened soldier with years of combat experience.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'am_drop_trooper', name: 'Drop Trooper', cost: 10, maxCount: 99,
      forbiddenSubfactionIds: ['catachan_jungle_fighters'],
      grantedKeywords: ['DEEP STRIKE'],
      description: 'Up to half the Veteran Guardsmen (rounded up) can be upgraded to Drop Troopers. Gains DEEP STRIKE, no falling injuries, +1 DICE on Diving Charges, and cannot go Down from a failed Diving Charge.' },
    { id: 'am_catachan_hunter', name: 'Catachan Hunter', cost: 10, maxCount: 99,
      requiredSubfactionId: 'catachan_jungle_fighters',
      grantedKeywords: ['INFILTRATOR', 'STEALTH'],
      description: 'Catachan only. Up to half the Veteran Guardsmen (rounded up) can be upgraded to Hunters instead of Drop Troopers (+10 credits). Gains INFILTRATOR and STEALTH keywords.' },
    { id: 'am_catachan_sergeant', name: 'Catachan Sergeant', cost: 0, maxCount: 2,
      requiredSubfactionId: 'catachan_jungle_fighters',
      grantedKeywords: ['ELITE'],
      description: 'Catachan only. Up to 2 Veteran Guardsmen can be Sergeants gaining the ELITE keyword. Sergeants do not count toward the Veteran Guardsman recruitment maximum.' },
  ],
};
export const am_ratling_marksman: UnitOption = {
  id: 'am_ratling_marksman', name: 'Ratling Marksman', baseCost: 50, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MILITARUM', 'SKIRMISHER', 'STEALTH'],
  baseSize: '25mm',
  faction: 'astra_militarum', unitType: 'troop',
  description: 'Small abhuman with exceptional marksmanship.',
  defaultWargear: [], availableWargear: [],
};
export const am_heavy_weapons_squad: UnitOption = {
  id: 'am_heavy_weapons_squad', name: 'Heavy Weapons Squad', baseCost: 45, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['LARGE', 'MILITARUM'],
  baseSize: '50mm',
  faction: 'astra_militarum', unitType: 'troop',
  description: 'Two-person crew manning a heavy weapons platform.',
  defaultWargear: [], availableWargear: [],
};
export const am_ogryn: UnitOption = {
  id: 'am_ogryn', name: 'Ogryn', baseCost: 80, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['LARGE', 'LIMITED POTENTIAL', 'MILITARUM', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'astra_militarum', unitType: 'troop',
  description: 'Massive abhuman warrior with incredible strength.',
  defaultWargear: [], availableWargear: [],
};

// ==========================================================================
// ADEPTUS CUSTODES
// ==========================================================================
export const ac_shield_captain: UnitOption = {
  id: 'ac_shield_captain', name: 'Shield-Captain', baseCost: 175, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['CUSTODES', 'ELITE', 'LARGE', 'LEADER', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'adeptus_custodes', unitType: 'elite',
  description: 'Golden warrior leading the Custodes warband.',
  defaultWargear: [], availableWargear: [],
};
export const ac_blade_champion: UnitOption = {
  id: 'ac_blade_champion', name: 'Blade Champion', baseCost: 135, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['CUSTODES', 'ELITE', 'LARGE', 'STRONG'],
  baseSize: '40mm',
  faction: 'adeptus_custodes', unitType: 'elite',
  description: 'Master swordsman of the Custodes.',
  defaultWargear: [], availableWargear: [],
};
export const ac_knight_centura: UnitOption = {
  id: 'ac_knight_centura', name: 'Knight-Centura', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ANATHEMA', 'CUSTODES', 'ELITE', 'FEAR'],
  baseSize: '32mm',
  faction: 'adeptus_custodes', unitType: 'elite',
  description: 'Anathema Psykana leader and witch-hunter.',
  defaultWargear: [], availableWargear: [],
};
export const ac_anathema_psykana: UnitOption = {
  id: 'ac_anathema_psykana', name: 'Anathema Psykana', baseCost: 55, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ANATHEMA', 'CUSTODES', 'FEAR'],
  baseSize: '32mm',
  faction: 'adeptus_custodes', unitType: 'troop',
  description: 'Silent Sister witch-hunter serving alongside the Custodes.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'ac_witchseeker', name: 'Witchseeker', cost: 10, maxCount: 99,
      description: 'Gains Deny the Witch (as PSYKER 1) and ranged attacks gain the FIRE Keyword.' },
  ],
};
export const ac_custodian_guard: UnitOption = {
  id: 'ac_custodian_guard', name: 'Custodian Guard', baseCost: 135, minCount: 0, maxCount: 5,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['CUSTODES', 'LARGE', 'STRONG'],
  baseSize: '40mm',
  faction: 'adeptus_custodes', unitType: 'troop',
  description: 'Elite golden warrior of the Emperor\'s bodyguard.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'ac_allarus', name: 'Allarus Custodian', cost: 15, maxCount: 2,
      grantedKeywords: ['DEEP STRIKE'],
      description: 'Gains DEEP STRIKE (From Golden Light) and +1 INJURY DICE with attacks against enemy ELITE models (Slayer of Tyrants).' },
    { id: 'ac_warden', name: 'Custodian Warden', cost: 10, maxCount: 2,
      grantedKeywords: ['NEGATE FEAR'],
      description: 'Gains NEGATE FEAR and Living Fortress: the first -1 of its Armour gains IMPERVIOUS.' },
    { id: 'ac_venatari', name: 'Venatari Custodian', cost: 5, maxCount: 2,
      grantedKeywords: ['SKIRMISHER'],
      description: 'Can use Jump Packs and Tarsis Bucklers. Gains SKIRMISHER while wearing a Jump Pack.' },
  ],
};
export const ac_aquilon_terminator: UnitOption = {
  id: 'ac_aquilon_terminator', name: 'Aquilon Terminator', baseCost: 160, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['CUSTODES', 'DEEP STRIKE', 'LARGE', 'STRONG', 'VEHICLE'],
  baseSize: '50mm',
  faction: 'adeptus_custodes', unitType: 'troop',
  description: 'Terminator-armoured Custodian warrior.',
  defaultWargear: [], availableWargear: [],
};
export const ac_contemptor_dreadnought: UnitOption = {
  id: 'ac_contemptor_dreadnought', name: 'Contemptor Dreadnought', baseCost: 210, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['CUSTODES', 'FEAR', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'adeptus_custodes', unitType: 'troop',
  description: 'Ancient Custodes warrior interred in a Dreadnought chassis.',
  defaultWargear: [], availableWargear: [],
};

// ==========================================================================
// ADEPTA SORORITAS
// ==========================================================================
export const as_canoness: UnitOption = {
  id: 'as_canoness', name: 'Canoness', baseCost: 115, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LEADER', 'SORORITAS'],
  baseSize: '32mm',
  faction: 'adepta_sororitas', unitType: 'elite',
  description: 'Mandatory commander of the Sisters of Battle. (75cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const as_dogmata: UnitOption = {
  id: 'as_dogmata', name: 'Dogmata', baseCost: 105, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'SORORITAS'],
  baseSize: '32mm',
  faction: 'adepta_sororitas', unitType: 'elite',
  description: 'Bearer of the holy standard, enforcer of faith. (65cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const as_palatine: UnitOption = {
  id: 'as_palatine', name: 'Palatine', baseCost: 100, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'SORORITAS'],
  baseSize: '32mm',
  faction: 'adepta_sororitas', unitType: 'elite',
  description: 'Veteran commander and lieutenant of the Canoness. (60cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const as_novitiate: UnitOption = {
  id: 'as_novitiate', name: 'Novitiate', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['LIMITED POTENTIAL', 'SORORITAS'],
  baseSize: '25-28mm',
  faction: 'adepta_sororitas', unitType: 'troop',
  description: 'Trainee Sister of Battle.',
  defaultWargear: [], availableWargear: [],
};
export const as_battle_sister: UnitOption = {
  id: 'as_battle_sister', name: 'Battle Sister', baseCost: 75, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['SORORITAS'],
  baseSize: '32mm',
  faction: 'adepta_sororitas', unitType: 'troop',
  description: 'Faithful warrior-nun clad in power armour. (35cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [
    { id: 'as_mortisanctus', name: 'Mortisanctus', cost: 5, maxCount: 1,
      statModifiers: { meleeSkill: 1, rangedSkill: -1 },
      description: '+1 Melee Skill, -1 Ranged Skill. May ignore the HEAVY Keyword of one melee weapon it wields (not TWO-HANDED). Up to 1 per warband.' },
    { id: 'as_retributor', name: 'Retributor', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'May ignore the HEAVY Keyword of one ranged weapon it carries. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'as_sacresant', name: 'Sacresant', cost: 10, maxCount: 2, maxCountLarge: 3,
      statModifiers: { meleeSkill: 1 },
      description: '+1 Melee Skill. Gains BODYGUARD: if any ally within 1" is hit by a ranged or melee weapon (excluding BLAST), you may redirect the hit to this Sacresant instead. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'as_seraphim', name: 'Seraphim', cost: 15, maxCount: 2,
      grantedKeywords: ['SKIRMISHER'],
      description: 'May be equipped with a Jump Pack (purchased separately). While equipped with a Jump Pack, gains SKIRMISHER. While armed with two PISTOL weapons + Jump Pack: may Shoot with one then immediately Shoot with the other; all PISTOL weapons also gain ASSAULT and IGNORE OFF-HAND WEAPON. Up to 2 per warband.' },
    { id: 'as_zephyrim', name: 'Zephyrim', cost: 10, maxCount: 2,
      statModifiers: { meleeSkill: 1 },
      grantedKeywords: ['SKIRMISHER'],
      description: 'May be equipped with a Jump Pack and Power Weapons (purchased separately). While equipped with a Jump Pack, gains SKIRMISHER and +1 Melee Skill. Up to 2 per warband.' },
  ],
};
export const as_repentia: UnitOption = {
  id: 'as_repentia', name: 'Repentia', baseCost: 60, minCount: 0, maxCount: 4,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['NEGATE FEAR', 'NO PROMOTION', 'SORORITAS'],
  baseSize: '25-28mm',
  faction: 'adepta_sororitas', unitType: 'troop',
  description: 'Penitent warriors seeking absolution through glorious death.',
  defaultWargear: [], availableWargear: [],
};
export const as_paragon_warsuit: UnitOption = {
  id: 'as_paragon_warsuit', name: 'Paragon Warsuit', baseCost: 110, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['LARGE', 'SORORITAS', 'STRONG', 'VEHICLE'],
  baseSize: '50mm',
  faction: 'adepta_sororitas', unitType: 'troop',
  description: 'Sister piloting a powerful servo-suit.',
  defaultWargear: [
    { id: 'as_paragon_ccw', name: 'Close Combat Weapon', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: [],
      description: 'Built-in chassis weapon. No hand slots required.' },
  ], availableWargear: [],
};
export const as_penitent_engine: UnitOption = {
  id: 'as_penitent_engine', name: 'Penitent Engine', baseCost: 150, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['LARGE', 'FEAR', 'NO PROMOTION', 'SORORITAS', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '50mm',
  faction: 'adepta_sororitas', unitType: 'troop',
  description: 'Penitent strapped to a bipedal combat walker.',
  defaultWargear: [
    { id: 'as_penitent_buzz_blades', name: 'Penitent Buzz-Blades', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['HEAVY', 'IGNORE ARMOUR', 'RISKY', 'TWO-HANDED'],
      description: 'Chosen at recruitment — mutually exclusive with Penitent Flails.' },
    { id: 'as_penitent_flails', name: 'Penitent Flails', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
      description: 'Chosen at recruitment — mutually exclusive with Penitent Buzz-Blades.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'as_mortifier', name: 'Mortifier', cost: 10, maxCount: 99,
      description: 'When taken Out of Action by a melee attack, may immediately make one melee attack against the attacker before being removed.' },
  ],
};

// ==========================================================================
// ADEPTUS MECHANICUS
// ==========================================================================
export const amec_dominus: UnitOption = {
  id: 'amec_dominus', name: 'Dominus', baseCost: 65, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CONTROLLER', 'ELITE', 'LARGE', 'LEADER', 'MECHANICUS', 'TOUGH'],
  baseSize: '50mm',
  faction: 'adeptus_mechanicus', unitType: 'elite',
  description: 'Mandatory Magos Dominus leading the war congregation.',
  defaultWargear: [], availableWargear: [],
};
export const amec_skitarii_marshal: UnitOption = {
  id: 'amec_skitarii_marshal', name: 'Skitarii Marshal', baseCost: 45, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'MECHANICUS'],
  baseSize: '32mm',
  faction: 'adeptus_mechanicus', unitType: 'elite',
  description: 'Veteran commander of Skitarii cohorts.',
  defaultWargear: [], availableWargear: [],
};
export const amec_tech_priest: UnitOption = {
  id: 'amec_tech_priest', name: 'Tech-Priest', baseCost: 60, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CONTROLLER', 'ELITE', 'MECHANICUS'],
  baseSize: '32mm',
  faction: 'adeptus_mechanicus', unitType: 'elite',
  description: 'Servant of the Omnissiah.',
  defaultWargear: [], availableWargear: [],
};
export const amec_skitarii: UnitOption = {
  id: 'amec_skitarii', name: 'Skitarii', baseCost: 40, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MECHANICUS'],
  baseSize: '25-28mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Cybernetically enhanced warrior of Mars.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'amec_pteraxii', name: 'Pteraxii', cost: 5, maxCount: 2, maxCountLarge: 3,
      grantedKeywords: ['SKIRMISHER'],
      description: 'Can be equipped with Jump Packs (purchased separately). Gains SKIRMISHER while equipped with a Jump Pack.' },
    { id: 'amec_ranger', name: 'Ranger', cost: 5, maxCount: 2, maxCountLarge: 3,
      grantedKeywords: ['INFILTRATOR'],
      description: 'Gains the INFILTRATOR Keyword.' },
    { id: 'amec_vanguard', name: 'Vanguard', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Gains Rad-Saturation: when an enemy Activates within 1" of it, that enemy suffers a BLOOD MARKER (immune if NEGATE GAS).' },
  ],
};
export const amec_servitor: UnitOption = {
  id: 'amec_servitor', name: 'Servitor', baseCost: 60, minCount: 0, maxCount: 4,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'MECHANICUS', 'NEGATE FEAR', 'NO PROMOTION', 'STRONG'],
  baseSize: '25mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Lobotomised human-machine hybrid worker.',
  defaultWargear: [], availableWargear: [],
};
export const amec_electro_priest: UnitOption = {
  id: 'amec_electro_priest', name: 'Electro-Priest', baseCost: 55, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MECHANICUS'],
  baseSize: '32mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Fanatical devotee channelling holy voltaic power.',
  defaultWargear: [], availableWargear: [],
};
export const amec_sicarian: UnitOption = {
  id: 'amec_sicarian', name: 'Sicarian', baseCost: 65, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MECHANICUS', 'STEALTH'],
  baseSize: '32mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Agile infiltrator with augmented combat reflexes.',
  defaultWargear: [], availableWargear: [],
  unitSubTypes: [
    { id: 'infiltrator', name: 'Infiltrator', creditCostModifier: 0,
      grantedKeywords: ['FEAR', 'INFILTRATOR'],
      description: 'The Sicarian gains the FEAR and INFILTRATOR Keywords.' },
    { id: 'ruststalker', name: 'Ruststalker', creditCostModifier: 0,
      description: 'The Sicarian gains +1 DICE to Dash actions, and has a Chordclaw in addition to its other weapons. The Chordclaw is a Melee weapon that takes no hands and can be used to make an extra attack when the Sicarian takes the Fight Action.' },
  ],
};
export const amec_kataphron: UnitOption = {
  id: 'amec_kataphron', name: 'Kataphron', baseCost: 90, minCount: 0, maxCount: 1, maxCountLarge: 2,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'LARGE', 'MECHANICUS', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Heavy Kataphron Breacher or Destroyer (0-2 at 1200cr+).',
  defaultWargear: [], availableWargear: [],
};
export const amec_kastelan_robot: UnitOption = {
  id: 'amec_kastelan_robot', name: 'Kastelan Robot', baseCost: 190, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'FEAR', 'LARGE', 'MECHANICUS', 'NEGATE GAS', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Ancient automaton of immense destructive power.',
  defaultWargear: [
    { id: 'amec_kastelan_fists', name: 'Kastelan Fists', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
      description: 'Counts as Two-Handed Hammers. Built-in chassis weapons.' },
    { id: 'amec_incendine_combustor', name: 'Incendine Combustor', type: 'ranged', range: 8, cost: 0, handedness: 'no-hands',
      keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE'],
      description: 'Integrated flamethrower. Does not count towards normal LIMIT.' },
  ], availableWargear: [],
};

// ==========================================================================
// ADEPTUS MINISTORUM
// ==========================================================================
export const amin_confessor: UnitOption = {
  id: 'amin_confessor', name: 'Confessor', baseCost: 85, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY', 'ELITE', 'LEADER', 'NEGATE FEAR', 'ORATOR', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'adeptus_ministorum', unitType: 'elite',
  description: 'Mandatory fire-brand leader. (70cr + 15cr rosarius)',
  defaultWargear: [], availableWargear: [],
};
export const amin_missionary: UnitOption = {
  id: 'amin_missionary', name: 'Missionary', baseCost: 50, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY', 'ELITE', 'NEGATE FEAR', 'ORATOR'],
  baseSize: '25-32mm',
  faction: 'adeptus_ministorum', unitType: 'elite',
  description: 'Travelling preacher of the Imperial Creed.',
  defaultWargear: [], availableWargear: [],
};
export const amin_drill_abbot: UnitOption = {
  id: 'amin_drill_abbot', name: 'Drill Abbot', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY', 'ELITE', 'NEGATE FEAR', 'STRONG'],
  baseSize: '25-28mm',
  faction: 'adeptus_ministorum', unitType: 'elite',
  description: 'Warrior-monk trainer, melee specialist.',
  defaultWargear: [], availableWargear: [],
};
export const amin_preacher: UnitOption = {
  id: 'amin_preacher', name: 'Preacher', baseCost: 30, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY'],
  baseSize: '25mm',
  faction: 'adeptus_ministorum', unitType: 'troop',
  description: 'Faithful foot soldier of the Ministorum.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'amin_conflagrator', name: 'Conflagrator', cost: 10, maxCount: 2,
      description: 'Ignores the HEAVY Keyword of one ranged weapon they carry. Up to 2 per warband.' },
  ],
};
export const amin_crusader: UnitOption = {
  id: 'amin_crusader', name: 'Crusader', baseCost: 45, minCount: 0, maxCount: 4,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY'],
  baseSize: '25mm',
  faction: 'adeptus_ministorum', unitType: 'troop',
  description: 'Armoured holy warrior sworn to protect the faithful.',
  defaultWargear: [], availableWargear: [],
};
export const amin_death_cult_assassin: UnitOption = {
  id: 'amin_death_cult_assassin', name: 'Death Cult Assassin', baseCost: 65, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DEATH CULT', 'ECCLESIARCHY', 'INFILTRATOR', 'STEALTH'],
  baseSize: '25mm',
  faction: 'adeptus_ministorum', unitType: 'troop',
  description: 'Deadly murderer consecrated to the Emperor.',
  defaultWargear: [], availableWargear: [],
};
export const amin_battle_cherub: UnitOption = {
  id: 'amin_battle_cherub', name: 'Battle Cherub', baseCost: 25, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'ECCLESIARCHY', 'FLYING', 'NO PROMOTION'],
  baseSize: '25mm',
  faction: 'adeptus_ministorum', unitType: 'troop',
  description: 'Servo-cherub support unit.',
  defaultWargear: [], availableWargear: [],
};
export const amin_miraculist: UnitOption = {
  id: 'amin_miraculist', name: 'Miraculist', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY', 'NO PROMOTION', 'ORATOR'],
  baseSize: '25-28mm',
  faction: 'adeptus_ministorum', unitType: 'troop',
  description: 'Living saint suffused with holy power.',
  defaultWargear: [
    { id: 'amin_burning_hands', name: 'Burning Hands', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'FIRE'],
      description: 'Auto-hits. Once per battle. No hand slots required.' },
    { id: 'amin_holy_light', name: 'Holy Light', type: 'ranged', range: 12, cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE COVER', 'IGNORE ARMOUR', 'CRITICAL', 'FIRE'],
      description: 'Once per battle. No hand slots required.' },
    { id: 'amin_wreath_in_fire', name: 'Wreath in Fire', type: 'ranged', range: 0, cost: 0, handedness: 'no-hands',
      keywords: ['BLAST 6"', 'FLAMETHROWER', 'IGNORE ARMOUR', 'FIRE'],
      description: 'Once per battle. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};

// ==========================================================================
// OFFICIO ASSASSINORUM
// ==========================================================================
export const oa_adamus: UnitOption = {
  id: 'oa_adamus', name: 'Adamus Assassin', baseCost: 120, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ASSASSINORUM', 'ELITE', 'INFILTRATOR', 'LEADER', 'STEALTH', 'TOUGH'],
  baseSize: '32mm',
  faction: 'officio_assassinorum', unitType: 'elite',
  description: 'Adamus Temple assassin.',
  defaultWargear: [], availableWargear: [],
};
export const oa_callidus: UnitOption = {
  id: 'oa_callidus', name: 'Callidus Assassin', baseCost: 120, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ASSASSINORUM', 'DEEP STRIKE', 'LEADER', 'STEALTH', 'TOUGH'],
  baseSize: '32mm',
  faction: 'officio_assassinorum', unitType: 'elite',
  description: 'Callidus Temple shape-changing assassin.',
  defaultWargear: [], availableWargear: [],
};
export const oa_culexus: UnitOption = {
  id: 'oa_culexus', name: 'Culexus Assassin', baseCost: 150, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ASSASSINORUM', 'ELITE', 'FEAR', 'DEEP STRIKE', 'LEADER', 'STEALTH', 'TOUGH'],
  baseSize: '32mm',
  faction: 'officio_assassinorum', unitType: 'elite',
  description: 'Culexus Temple soul-drinker, anathema to psykers.',
  defaultWargear: [
    { id: 'oa_animus_speculum', name: 'Animus Speculum', type: 'ranged', range: 18, cost: 0, handedness: 'no-hands',
      keywords: ['+2 INJURY DICE', '+1 INJURY DICE vs DAEMON/PSYKER'],
      description: '18", +2 INJURY DICE, additional +1 INJURY DICE against targets with DAEMON or PSYKER Keyword. No hand slots required.' },
    { id: 'oa_life_draining_touch', name: 'Life-Draining Touch', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE ARMOUR', 'PSYCHIC', '+1 INJURY DICE vs DAEMON/PSYKER'],
      description: 'Melee, IGNORE ARMOUR, +1 INJURY DICE against targets with DAEMON or PSYKER Keyword, PSYCHIC. If this attack causes any BLOOD MARKERS or takes the target Out of Action, remove one BLOOD MARKER from the attacker. No hand slots required.' },
    { id: 'combat_helmet', name: 'Combat Helmet', type: 'equipment', slot: 'headgear', cost: 0,
      keywords: ['NEGATE SHRAPNEL', 'Headgear'],
      description: 'Included in cost. The model has NEGATE SHRAPNEL. Counts as Headgear.' },
  ], availableWargear: [],
};
export const oa_eversor: UnitOption = {
  id: 'oa_eversor', name: 'Eversor Assassin', baseCost: 120, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ASSASSINORUM', 'ELITE', 'FEAR', 'INFILTRATOR', 'LEADER', 'STEALTH', 'TOUGH'],
  baseSize: '32mm',
  faction: 'officio_assassinorum', unitType: 'elite',
  description: 'Eversor Temple berserker assassin.',
  defaultWargear: [], availableWargear: [],
};
export const oa_vanus: UnitOption = {
  id: 'oa_vanus', name: 'Vanus Infocyte', baseCost: 120, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ASSASSINORUM', 'ELITE', 'INFILTRATOR', 'LEADER', 'STEALTH', 'TOUGH'],
  baseSize: '32mm',
  faction: 'officio_assassinorum', unitType: 'elite',
  description: 'Vanus Temple information warfare specialist.',
  defaultWargear: [
    { id: 'augury_scanner', name: 'Augury Scanner', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: [],
      description: 'Included in cost, does not count towards the normal LIMIT. Enemy models must set up at least 16" away from this model when using the DEEP STRIKE or INFILTRATOR Keywords.' },
  ], availableWargear: [],
};
export const oa_venenum: UnitOption = {
  id: 'oa_venenum', name: 'Venenum Assassin', baseCost: 120, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ASSASSINORUM', 'INFILTRATOR', 'LEADER', 'NEGATE GAS', 'STEALTH', 'TOUGH'],
  baseSize: '32mm',
  faction: 'officio_assassinorum', unitType: 'elite',
  description: 'Venenum Temple poisoner.',
  defaultWargear: [], availableWargear: [],
};
export const oa_vindicare: UnitOption = {
  id: 'oa_vindicare', name: 'Vindicare Assassin', baseCost: 120, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ASSASSINORUM', 'ELITE', 'INFILTRATOR', 'LEADER', 'STEALTH', 'TOUGH'],
  baseSize: '32mm',
  faction: 'officio_assassinorum', unitType: 'elite',
  description: 'Vindicare Temple sniper.',
  defaultWargear: [], availableWargear: [],
};
export const oa_aspirant: UnitOption = {
  id: 'oa_aspirant', name: 'Assassin Aspirant', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 7, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ASSASSINORUM', 'STEALTH'],
  baseSize: '25mm',
  faction: 'officio_assassinorum', unitType: 'troop',
  description: 'Trainee operative of the Assassinorum.',
  defaultWargear: [], availableWargear: [],
};

// ==========================================================================
// ROGUE TRADER
// ==========================================================================
export const rt_lord_captain: UnitOption = {
  id: 'rt_lord_captain', name: 'Lord Captain', baseCost: 80, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LEADER', 'ROGUE TRADER', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'rogue_trader', unitType: 'elite',
  description: 'Mandatory Warrant-bearer commanding the expedition.',
  defaultWargear: [], availableWargear: [],
};
export const rt_voidmaster: UnitOption = {
  id: 'rt_voidmaster', name: 'Voidmaster', baseCost: 55, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'ROGUE TRADER', 'STRONG'],
  baseSize: '25-32mm',
  faction: 'rogue_trader', unitType: 'elite',
  description: 'Veteran ship officer and combat specialist.',
  defaultWargear: [], availableWargear: [],
};
export const rt_navigator_scion: UnitOption = {
  id: 'rt_navigator_scion', name: 'Navigator Scion', baseCost: 60, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['PSYKER 1', 'ROGUE TRADER'],
  baseSize: '25mm',
  faction: 'rogue_trader', unitType: 'elite',
  description: 'Navigator with the ability to peer into the warp. (+ weapon cost)',
  defaultWargear: [
    { id: 'rt_third_eye', name: 'Third Eye', type: 'ranged', range: 12, cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE ARMOUR', 'PSYCHIC', 'RISKY'],
      description: 'The Third Eye opens to blast the target\'s mind. RISKY — take a Risky Success Roll when fired.' },
  ], availableWargear: [],
};
export const rt_voidsman: UnitOption = {
  id: 'rt_voidsman', name: 'Voidsman', baseCost: 30, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ROGUE TRADER'],
  baseSize: '25mm',
  faction: 'rogue_trader', unitType: 'troop',
  description: 'Voidborn crew member armed for surface operations.',
  defaultWargear: [], availableWargear: [],
};

// ==========================================================================
// THE INQUISITION
// ==========================================================================
export const inq_inquisitor: UnitOption = {
  id: 'inq_inquisitor', name: 'Inquisitor', baseCost: 70, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'INQUISITION', 'LEADER', 'NEGATE FEAR', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'the_inquisition', unitType: 'elite',
  description: 'Mandatory Inquisitor. (55cr + 15cr rosarius)',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'inq_duelist', name: 'Duelist', cost: 10, maxCount: 1,
      description: 'When charged by an enemy, may immediately make one free melee attack against them before the combat begins.' },
    { id: 'inq_frightening_reputation', name: 'Frightening Reputation', cost: 5, maxCount: 1,
      grantedKeywords: ['FEAR'],
      description: 'Gains the FEAR Keyword.' },
    { id: 'inq_great_strength', name: 'Great Strength', cost: 10, maxCount: 1,
      grantedKeywords: ['STRONG'],
      description: 'Gains the STRONG Keyword.' },
    { id: 'inq_pistoleer', name: 'Pistoleer', cost: 10, maxCount: 1,
      description: 'May shoot twice with PISTOL weapons in one Shoot Action; both pistols gain ASSAULT and IGNORE OFF-HAND WEAPON.' },
    { id: 'inq_psyker', name: 'Psyker', cost: 5, maxCount: 1,
      grantedKeywords: ['PSYKER 1'],
      description: 'Gains the PSYKER 1 Keyword, access to one Shared Psychic Discipline, and may know up to 4 psychic powers. Requires a PSYCHIC weapon to be equipped.' },
  ],
};
export const inq_interrogator: UnitOption = {
  id: 'inq_interrogator', name: 'Interrogator', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'INQUISITION'],
  baseSize: '25-32mm',
  faction: 'the_inquisition', unitType: 'elite',
  description: 'Trusted acolyte and second-in-command.',
  defaultWargear: [], availableWargear: [],
};
export const inq_mystic: UnitOption = {
  id: 'inq_mystic', name: 'Mystic', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'INQUISITION', 'PSYKER 1'],
  baseSize: '25-28mm',
  faction: 'the_inquisition', unitType: 'elite',
  description: 'Sanctioned psyker in service to the Inquisition. (+ weapon + powers)',
  defaultWargear: [], availableWargear: [],
};
export const inq_acolyte: UnitOption = {
  id: 'inq_acolyte', name: 'Acolyte', baseCost: 45, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['INQUISITION'],
  baseSize: '25mm',
  faction: 'the_inquisition', unitType: 'troop',
  description: 'Trusted operative of the Inquisition.',
  defaultWargear: [], availableWargear: [],
};
export const inq_jokaero: UnitOption = {
  id: 'inq_jokaero', name: 'Jokaero Weaponsmith', baseCost: 55, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['INQUISITION', 'STRONG'],
  baseSize: '25-28mm',
  faction: 'the_inquisition', unitType: 'troop',
  description: 'Alien weapons-smith of mysterious origin.',
  defaultWargear: [], availableWargear: [],
};
export const inq_daemonhost: UnitOption = {
  id: 'inq_daemonhost', name: 'Daemonhost', baseCost: 135, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FLYING', 'INQUISITION', 'NO PROMOTION', 'PSYKER', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'the_inquisition', unitType: 'troop',
  description: 'Ordo Malleus only. Bound daemon in a mortal shell.',
  defaultWargear: [
    { id: 'inq_energy_torrent', name: 'Energy Torrent', type: 'ranged', range: 24, cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE COVER', 'BLAST 2"', 'PSYCHIC', 'RISKY'],
      description: 'Daemonic warp energy released in a torrent. RISKY.' },
    { id: 'inq_unholy_gaze', name: 'Unholy Gaze', type: 'ranged', range: 18, cost: 0, handedness: 'no-hands',
      keywords: ['ARMOUR PIERCING 1', 'PSYCHIC', 'RISKY', 'STUN'],
      description: 'The gaze of the bound daemon paralyses and wounds. RISKY.' },
    { id: 'inq_warp_grasp', name: 'Warp Grasp', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE ARMOUR', 'PSYCHIC', 'RISKY'],
      description: 'A warp-infused grip tears the soul. RISKY.' },
  ], availableWargear: [],
  cannotEquip: true,
};

// ==========================================================================
// GREY KNIGHTS (Adeptus Astartes variant)
// ==========================================================================
export const gk_captain: UnitOption = {
  id: 'gk_captain', name: 'Captain', baseCost: 110, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'LARGE', 'LEADER', 'TOUGH'],
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
  keywords: ['ASTARTES', 'ELITE', 'LARGE'],
  baseSize: '40mm',
  faction: 'grey_knights', unitType: 'elite',
  description: 'Healer and gene-seed harvester.',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
    { id: 'gk_narthecium', name: 'Narthecium', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 1', 'HELD'],
      description: 'HELD — occupies a hand but functions as a medical tool. Enables the Apothecary\'s healing abilities.' },
  ], availableWargear: [],
};
export const gk_chaplain: UnitOption = {
  id: 'gk_chaplain', name: 'Chaplain', baseCost: 120, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'LARGE'],
  baseSize: '40mm',
  faction: 'grey_knights', unitType: 'elite',
  description: 'Spiritual leader of the Chapter. (80cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
    { id: 'gk_crozius_arcanum', name: 'Crozius Arcanum', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 2', 'LEADER'],
      description: 'Ritual weapon of the Chaplain, a symbol of faith and fury.' },
  ], availableWargear: [],
};
export const gk_librarian: UnitOption = {
  id: 'gk_librarian', name: 'Librarian', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ASTARTES', 'ELITE', 'LARGE', 'PSYKER 2'],
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
  keywords: ['ASTARTES', 'FEAR', 'LARGE', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'grey_knights', unitType: 'troop',
  description: 'Ancient warrior entombed in a walking combat platform.',
  defaultWargear: [
    { id: 'heavy_armour_plating', name: 'Heavy Armour Plating', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-3 INJURY MODIFIER'], description: 'Heavy armour plating built into the Dreadnought chassis (included in unit cost).',
      statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
};

// ==========================================================================
// ADEPTUS ARBITES (Necromunda Palanite Enforcers variant)
// ==========================================================================
export const arb_gang_leader: UnitOption = {
  id: 'arb_gang_leader', name: 'Gang Leader', baseCost: 60, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'GANGER', 'LEADER', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'adeptus_arbites', unitType: 'elite',
  description: 'Mandatory Enforcer Sergeant leading the warband.',
  defaultWargear: [], availableWargear: [],
};
export const arb_gang_champion: UnitOption = {
  id: 'arb_gang_champion', name: 'Gang Champion', baseCost: 50, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'GANGER'],
  baseSize: '25-32mm',
  faction: 'adeptus_arbites', unitType: 'elite',
  description: 'Veteran Enforcer officer.',
  defaultWargear: [], availableWargear: [],
};
export const arb_juve: UnitOption = {
  id: 'arb_juve', name: 'Juve', baseCost: 15, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GANGER', 'NO PROMOTION'],
  baseSize: '25-28mm',
  faction: 'adeptus_arbites', unitType: 'troop',
  description: 'Rookie Enforcer recruit.',
  defaultWargear: [], availableWargear: [],
};
export const arb_ganger: UnitOption = {
  id: 'arb_ganger', name: 'Ganger', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GANGER'],
  baseSize: '25-32mm',
  faction: 'adeptus_arbites', unitType: 'troop',
  description: 'Standard Enforcer trooper.',
  defaultWargear: [], availableWargear: [],
};
export const arb_cyber_mastiff: UnitOption = {
  id: 'arb_cyber_mastiff', name: 'Hardcase Cyber Mastiff', baseCost: 95, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'NO PROMOTION'],
  baseSize: '25mm',
  faction: 'adeptus_arbites', unitType: 'troop',
  description: 'Cybernetic attack dog.',
  defaultWargear: [
    { id: 'arb_savage_bite', name: 'Savage Bite', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['ARMOUR PIERCING 1'],
      description: 'Steel-reinforced cyber jaw attack. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const arb_sanctioner_automata: UnitOption = {
  id: 'arb_sanctioner_automata', name: 'Sanctioner Automata', baseCost: 135, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'LARGE', 'NEGATE GAS', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'REGENERATE 1', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'adeptus_arbites', unitType: 'troop',
  description: 'Heavy combat automaton.',
  defaultWargear: [
    { id: 'arb_pacifier_assault_claw', name: 'Pacifier Assault Claw', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['CRITICAL'],
      description: 'Built-in chassis weapon. Included in cost.' },
  ], availableWargear: [],
};

// ==========================================================================
// HERETIC ASTARTES
// ==========================================================================
export const ha_chaos_lord: UnitOption = {
  id: 'ha_chaos_lord', name: 'Chaos Lord', baseCost: 115, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE', 'LEADER', 'TOUGH'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Mandatory Chaos Space Marine warlord. (75cr + 40cr Power Armour; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [...MARKS_OF_CHAOS_UPGRADES],
};
export const ha_dark_apostle: UnitOption = {
  id: 'ha_dark_apostle', name: 'Dark Apostle', baseCost: 130, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Chaos preacher bearing the dark word. (70cr + 40cr Power Armour + 20cr Crozius; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
    { id: 'ha_accursed_crozius', name: 'Accursed Crozius', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 2'],
      description: 'The bearer gains the FEAR Keyword.' },
  ], availableWargear: [],
  upgrades: [...MARKS_OF_CHAOS_UPGRADES],
};
export const ha_chaos_sorcerer: UnitOption = {
  id: 'ha_chaos_sorcerer', name: 'Chaos Sorcerer', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE', 'PSYKER 2'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Warp-wielding sorcerer of Chaos. (75cr + 40cr Power Armour; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [...MARKS_OF_CHAOS_UPGRADES],
};
export const ha_warpsmith: UnitOption = {
  id: 'ha_warpsmith', name: 'Warpsmith', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE'],
  baseSize: '60x35mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Dark Mechanicus artificer. (70cr + 40cr Power Armour; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [...MARKS_OF_CHAOS_UPGRADES],
};
export const ha_chaos_cultist: UnitOption = {
  id: 'ha_chaos_cultist', name: 'Chaos Cultist', baseCost: 25, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FOLLOWER', 'HERETIC ASTARTES'],
  baseSize: '25-28mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Fanatical cultist devoted to the Dark Gods.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    {
      id: 'ha_cultist_goremonger',
      name: 'Goremonger',
      cost: 5,
      maxCount: 99,
      grantedKeywords: ['INFILTRATOR'],
      requiredSubfactionId: 'world_eaters',
      description: 'World Eaters only. Up to half of your Jakhals (rounded up) can be upgraded to Goremongers (+5cr). Grants the INFILTRATOR keyword.',
    },
    // Restrict Marks to Word Bearers for Cultists (standard rules forbid them for others)
    ...MARKS_OF_CHAOS_UPGRADES.map(u => ({ ...u, requiredSubfactionId: 'word_bearers' })),
  ],
};
export const ha_chaos_space_marine: UnitOption = {
  id: 'ha_chaos_space_marine', name: 'Chaos Space Marine', baseCost: 95, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['HERETIC ASTARTES'],
  baseSize: '32mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Traitor Space Marine. (55cr + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost.',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [
    { id: 'ha_csm_havoc', name: 'Havoc', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Ignore the HEAVY Keyword of one ranged weapon they carry.' },
    { id: 'ha_csm_shrivetalon', name: 'Shrivetalon', cost: 10, maxCount: 2, maxCountLarge: 3,
      forbiddenSubfactionIds: ['emperors_children'],
      grantedKeywords: ['FEAR'],
      description: 'Grants the FEAR Keyword. (Not available to Emperor\'s Children — Elegance rule)' },
    { id: 'ha_csm_raptor', name: 'Raptor', cost: 5, maxCount: 2, maxCountLarge: 3,
      forbiddenSubfactionIds: ['death_guard', 'world_eaters'],
      grantedKeywords: ['SKIRMISHER'],
      description: 'Can be equipped with Jump Packs and Warp Claws (purchased separately). While equipped with a Jump Pack, gains the SKIRMISHER Keyword. (Not available to Death Guard or World Eaters)' },
    { id: 'ha_csm_saboteur', name: 'Saboteur', cost: 10, maxCount: 2, maxCountLarge: 3,
      requiredSubfactionId: 'alpha_legion',
      description: 'Alpha Legion only. Ignores the HEAVY Keyword of Blast Charges. Has NEGATE MINED. Mine Layer ability: As an Action (+2 DICE), mine a touched terrain piece (≤8"×8") — on success it is MINED.' },
    { id: 'ha_csm_flawless_blade', name: 'Flawless Blade', cost: 5, maxCount: 2, maxCountLarge: 3,
      requiredSubfactionId: 'emperors_children',
      description: "Emperor's Children only. +1 DICE to Hit with melee attacks. Cannot use ranged weapons besides Pistols and Grenades." },
    // Night Lords Upgrades
    { id: 'nl_depredator', name: 'Depredator', cost: 5, maxCount: 1,
      requiredSubfactionId: 'night_lords',
      requiredUpgradeId: 'ha_csm_raptor',
      conflictsWithUpgradeIds: ['nl_warp_talon'],
      grantedKeywords: [],
      description: 'Night Lords only (Requires Raptor). Ignore the HEAVY Keyword on one melee weapon.' },
    { id: 'nl_warp_talon', name: 'Warp Talon', cost: 10, maxCount: 2,
      requiredSubfactionId: 'night_lords',
      requiredUpgradeId: 'ha_csm_raptor',
      conflictsWithUpgradeIds: ['nl_depredator'],
      grantedKeywords: ['DEEP STRIKE'],
      description: 'Night Lords only (Requires Raptor). Grants DEEP STRIKE.' },
    ...MARKS_OF_CHAOS_UPGRADES,
  ],
};
export const ha_possessed: UnitOption = {
  id: 'ha_possessed', name: 'Possessed', baseCost: 95, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'HERETIC ASTARTES', 'LARGE', 'LIMITED POTENTIAL'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Daemon-possessed Chaos Marine. (55cr + 40cr Power Armour; can also equip melee weapons, armour, equipment, or Marks of Chaos)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER', 'IMPERVIOUS'], description: 'Included in cost. Daemonic Armour — Power Armour has IMPERVIOUS.',
      statModifiers: { armourSave: -2 } },
    { id: 'ha_mutated_claw', name: 'Mutated Claw', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['CRITICAL'],
      description: 'Daemonic natural weapon. Takes up one hand. The Possessed can also be equipped with melee weapons, armour, equipment, or Marks of Chaos.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'nl_curseclaw', name: 'Curseclaw (Jump Pack)', cost: 20, maxCount: 1,
      requiredSubfactionId: 'night_lords',
      grantedKeywords: ['FLYING'],
      statModifiers: { movement: 2 },
      description: 'Night Lords only. Equipped with Jump Pack (+2" Move, FLYING).' },
    ...MARKS_OF_CHAOS_UPGRADES,
  ],
};
export const ha_chaos_terminator: UnitOption = {
  id: 'ha_chaos_terminator', name: 'Chaos Terminator', baseCost: 145, minCount: 0, maxCount: 2, maxCountLarge: 3,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'HERETIC ASTARTES', 'LARGE', 'STRONG', 'VEHICLE'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Elite warrior in ancient Chaos Terminator armour. (75cr + 70cr Terminator Armour; 0-3 at 1200cr+)',
  defaultWargear: [
    { id: 'terminator_armour', name: 'Terminator Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-3 INJURY MODIFIER', 'DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
      description: 'Included in cost. This armour does not count towards any LIMIT.',
      grantsKeywords: ['DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
      statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
  upgrades: [...MARKS_OF_CHAOS_UPGRADES],
};
export const ha_helbrute: UnitOption = {
  id: 'ha_helbrute', name: 'Helbrute', baseCost: 165, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['FEAR', 'FOLLOWER', 'HERETIC ASTARTES', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Insane warrior entombed in a corrupted Dreadnought. (Armour plating included in cost)',
  defaultWargear: [
    { id: 'ha_helbrute_fists', name: 'Helbrute Fists', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
      description: 'Count as Two-Handed Hammers in melee. If equipped only with ranged weapons also counts as a close combat weapon.' },
  ], availableWargear: [],
  upgrades: [...MARKS_OF_CHAOS_UPGRADES],
  // Rule: equipping a Helbrute Hammer or Power Scourge (the only melee options) replaces the fists
  weaponReplacementRules: [
    { replacedDefaultId: 'ha_helbrute_fists', whenAddingWeaponType: 'melee' },
  ],
};

// -- Heretic Astartes Warband Variant: Death Guard --
export const ha_poxwalker: UnitOption = {
  id: 'ha_poxwalker', name: 'Poxwalker', baseCost: 40, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FEAR', 'FOLLOWER', 'HERETIC ASTARTES', 'NEGATE GAS', 'NO PROMOTION', 'NURGLE'],
  baseSize: '25-28mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Death Guard only. Shambling plague-zombie. Cannot take any weapons, armour, or equipment (counts as Close Combat Weapon).',
  defaultWargear: [], availableWargear: [],
  cannotEquip: true,
};
export const ha_foetid_blight_drone: UnitOption = {
  id: 'ha_foetid_blight_drone', name: 'Foetid Blight-Drone', baseCost: 180, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['FEAR', 'FLYING', 'FOLLOWER', 'HERETIC ASTARTES', 'LARGE', 'NO PROMOTION', 'NURGLE', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Death Guard only. Hovering daemon engine. Choose one: Fleshmower (+0cr), Twin Plague Spewers (+45cr), or Twin Blight Launchers (+55cr). Cannot be taken with a Helbrute.',
  defaultWargear: [
    { id: 'ha_blight_drone_slam', name: 'Slam', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['INFECTION MARKERS'],
      description: 'Equipped when no other melee weapon is taken.' },
  ], availableWargear: [],
};

// -- Heretic Astartes Warband Variant: Emperor's Children --
export const ha_lord_kakophonist: UnitOption = {
  id: 'ha_lord_kakophonist', name: 'Lord Kakophonist', baseCost: 105, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE', 'SLAANESH'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: "Emperor's Children only. (65cr + 40cr Power Armour + Mark of Slaanesh; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};

// -- Heretic Astartes Warband Variant: Renegade Space Marines --
export const ha_renegade_apothecary: UnitOption = {
  id: 'ha_renegade_apothecary', name: 'Renegade Apothecary', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Renegade Space Marines only. (70cr + 40cr Power Armour; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
    { id: 'ha_narthecium', name: 'Narthecium', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 1', 'HELD'],
      description: 'Included in cost. As an Action (+1 DICE), heal self or friendly ASTARTES within 1": remove 1 (or 3 on Critical) BLOOD MARKERS.' },
  ], availableWargear: [],
  upgrades: [...MARKS_OF_CHAOS_UPGRADES],
};

// -- Heretic Astartes Warband Variant: Thousand Sons --
export const ha_exalted_sorcerer: UnitOption = {
  id: 'ha_exalted_sorcerer', name: 'Exalted Sorcerer', baseCost: 125, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE', 'LEADER', 'PSYKER 3', 'TOUGH', 'TZEENTCH'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Thousand Sons only — mandatory Warband leader. (85cr + 40cr Power Armour + Mark of Tzeentch; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const ha_tzaangor_shaman: UnitOption = {
  id: 'ha_tzaangor_shaman', name: 'Tzaangor Shaman', baseCost: 60, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEASTMEN', 'ELITE', 'FOLLOWER', 'HERETIC ASTARTES', 'PSYKER 1', 'TZEENTCH'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Thousand Sons only. Must equip exactly one PSYCHIC weapon. Can equip any armour or equipment from HA Armoury including Shields.',
  defaultWargear: [
    { id: 'ha_baleful_devolution', name: 'Baleful Devolution', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['PSYCHIC'],
      description: 'Psychic ability (Effect): 12", One Enemy, Immediate — target gains 1 STUN MARKER (or D3 on Critical Success).' },
  ], availableWargear: [],
};
export const ha_tzaangor: UnitOption = {
  id: 'ha_tzaangor', name: 'Tzaangor', baseCost: 40, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEASTMEN', 'FOLLOWER', 'HERETIC ASTARTES', 'LIMITED POTENTIAL', 'SKIRMISHER', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Thousand Sons only. Can equip Pistols, melee weapons, armour (including Shields), or equipment from HA Armoury.',
  defaultWargear: [], availableWargear: [],
};
export const ha_sekhetar_robot: UnitOption = {
  id: 'ha_sekhetar_robot', name: 'Sekhetar Robot', baseCost: 170, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'FOLLOWER', 'HERETIC ASTARTES', 'INFILTRATOR', 'NEGATE GAS', 'NO PROMOTION', 'STEALTH', 'STRONG', 'TOUGH', 'TZEENTCH'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Thousand Sons only. Armour plating and Hellfyre Missile Rack included in cost.',
  defaultWargear: [
    { id: 'ha_armour_plating_sekhetar', name: 'Armour Plating', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost.',
      statModifiers: { armourSave: -2 } },
    { id: 'ha_hellfyre_missile_rack', name: 'Hellfyre Missile Rack', type: 'ranged', cost: 0, handedness: 'no-hands',
      keywords: ['36"', 'IGNORE COVER', 'FIRE'],
      description: 'Included in cost. 36", IGNORE COVER, FIRE. Cannot be fired with another weapon.' } as unknown as import('../types/index.js').Weapon,
  ], availableWargear: [],
};

// -- Heretic Astartes Warband Variant: World Eaters --
export const ha_master_of_executions: UnitOption = {
  id: 'ha_master_of_executions', name: 'Master of Executions', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'KHORNE', 'LARGE', 'STRONG'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'World Eaters only. (75cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const ha_slaughterbound: UnitOption = {
  id: 'ha_slaughterbound', name: 'Slaughterbound', baseCost: 175, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'FEAR', 'HERETIC ASTARTES', 'KHORNE', 'LARGE', 'LIMITED POTENTIAL', 'REGENERATE 1', 'TOUGH'],
  baseSize: '32mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'World Eaters only. (135cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
    { id: 'ha_daemonic_claw', name: 'Daemonic Claw', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['+2 INJURY DICE', 'CRITICAL', 'RISKY', 'HELD'],
      description: 'Included in cost. Always takes up one hand for melee and ranged.' },
  ], availableWargear: [],
};

// ==========================================================================
// CHAOS CULT
// ==========================================================================
export const cc_cult_demagogue: UnitOption = {
  id: 'cc_cult_demagogue', name: 'Cult Demagogue', baseCost: 75, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CHAOS CULT', 'ELITE', 'LEADER', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'chaos_cult', unitType: 'elite',
  description: 'Mandatory charismatic leader of the Chaos Cult.',
  defaultWargear: [], availableWargear: [],
};
export const cc_heretic_witch: UnitOption = {
  id: 'cc_heretic_witch', name: 'Heretic Witch', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CHAOS CULT', 'ELITE', 'PSYKER 1'],
  baseSize: '25-32mm',
  faction: 'chaos_cult', unitType: 'elite',
  description: 'Unsanctioned psyker twisted by chaos. (+ powers)',
  defaultWargear: [], availableWargear: [],
};
export const cc_chaos_disciple: UnitOption = {
  id: 'cc_chaos_disciple', name: 'Chaos Disciple', baseCost: 60, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'CHAOS CULT', 'STRONG'],
  baseSize: '25-32mm',
  faction: 'chaos_cult', unitType: 'elite',
  description: 'Veteran devotee of the dark powers.',
  defaultWargear: [], availableWargear: [],
};
export const cc_daemon_prince: UnitOption = {
  id: 'cc_daemon_prince', name: 'Daemon Prince', baseCost: 190, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LARGE', 'LEADER', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'chaos_cult', unitType: 'elite',
  description: 'Campaign-only apotheosised champion of Chaos.',
  defaultWargear: [
    { id: 'cc_hellforged_weapon', name: 'Hellforged Weapon', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'HEAVY', 'TWO-HANDED'],
      description: 'When attacking, choose to make an extra attack against a different enemy or gain ARMOUR PIERCING 2.' },
    { id: 'cc_infernal_cannon', name: 'Infernal Cannon', type: 'heavy', range: 24, cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'BLAST 2"', 'HEAVY', 'SHRAPNEL', 'TWO-HANDED'] },
  ], availableWargear: [],
  unitSubTypes: [
    { id: 'darkness', name: 'Daemon Prince of Darkness', creditCostModifier: -20,
      grantedKeywords: ['UNDIVIDED'],
      description: 'The Daemon Prince and all allied models within 6" of it have the STEALTH Keyword. It gains the UNDIVIDED Keyword. It can be equipped with equipment from any of the Legions\u2019 Battlekit Lists.' },
    { id: 'khorne', name: 'Daemon Prince of Khorne', creditCostModifier: 0,
      grantedKeywords: ['KHORNE'],
      description: 'The Daemon Prince\u2019s melee attacks have an additional +1 INJURY MODIFIER, and it gains the KHORNE Keyword. It can be equipped with equipment from the Blood Legion Battlekit List.' },
    { id: 'nurgle', name: 'Daemon Prince of Nurgle', creditCostModifier: 0,
      grantedKeywords: ['NURGLE'],
      description: 'The Daemon Prince treats Down results as Minor Hits (does not affect Down results that replace Out of Action via TOUGH Keyword), and it gains the NURGLE Keyword. It can be equipped with equipment from the Plague Legion Battlekit List.' },
    { id: 'slaanesh', name: 'Daemon Prince of Slaanesh', creditCostModifier: 0,
      grantedKeywords: ['SLAANESH'],
      statModifiers: { movement: 1 },
      description: 'The Daemon Prince gains +1" movement speed, +1 DICE to all Dash Success Rolls, and the SLAANESH Keyword. It can be equipped with equipment from the Legion of Excess Battlekit List.' },
    { id: 'tzeentch', name: 'Daemon Prince of Tzeentch', creditCostModifier: 0,
      grantedKeywords: ['TZEENTCH'],
      description: 'The Daemon Prince\u2019s ranged attacks have an additional +1 INJURY MODIFIER, and it gains the TZEENTCH Keyword. It can be equipped with equipment from the Scintillating Legion Battlekit List.' },
  ],
  upgrades: [
    { id: 'cc_daemon_prince_wings', name: 'Wings', cost: 10, maxCount: 1,
      grantedKeywords: ['FLYING'],
      description: 'Grants 8" FLYING movement. Can be combined with any deity sub-type.' },
  ],
};
export const cc_cult_rabble: UnitOption = {
  id: 'cc_cult_rabble', name: 'Cult Rabble', baseCost: 20, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CHAOS CULT'],
  baseSize: '25-28mm',
  faction: 'chaos_cult', unitType: 'troop',
  description: 'Desperate horde follower of the dark gods.',
  defaultWargear: [], availableWargear: [],
};
export const cc_chaos_devotee: UnitOption = {
  id: 'cc_chaos_devotee', name: 'Chaos Devotee', baseCost: 30, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CHAOS CULT'],
  baseSize: '25-28mm',
  faction: 'chaos_cult', unitType: 'troop',
  description: 'Dedicated worshipper of Chaos.',
  defaultWargear: [], availableWargear: [],
};
export const cc_chaos_ogryn: UnitOption = {
  id: 'cc_chaos_ogryn', name: 'Chaos Ogryn', baseCost: 85, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CHAOS CULT', 'LARGE', 'LIMITED POTENTIAL', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'chaos_cult', unitType: 'troop',
  description: 'Massive mutated abhuman devoted to Chaos.',
  defaultWargear: [], availableWargear: [],
};
export const cc_chaos_spawn: UnitOption = {
  id: 'cc_chaos_spawn', name: 'Chaos Spawn', baseCost: 125, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH'],
  baseSize: '50mm',
  faction: 'chaos_cult', unitType: 'troop',
  description: 'Mindless chaos entity, reward and punishment in one.',
  defaultWargear: [
    { id: 'cc_hideous_mutations', name: 'Hideous Mutations', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CLEAVE D3', '+1 INJURY DICE'],
      description: 'Natural chaos mutations growing across its body. Cannot be removed.' },
  ], availableWargear: [],
  cannotEquip: true,
};

// ==========================================================================
// CHAOS DAEMONS
// ==========================================================================
export const cd_daemon_prince: UnitOption = {
  id: 'cd_daemon_prince', name: 'Daemon Prince', baseCost: 210, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'LARGE', 'LEADER', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Mighty ascended champion of the Chaos Gods.',
  defaultWargear: [
    { id: 'cd_hellforged_weapon', name: 'Hellforged Weapon', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'HEAVY', 'TWO-HANDED'],
      description: 'When attacking, choose to make an extra attack against a different enemy or gain ARMOUR PIERCING 2.' },
    { id: 'cd_infernal_cannon', name: 'Infernal Cannon', type: 'heavy', range: 24, cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'BLAST 2"', 'HEAVY', 'SHRAPNEL', 'TWO-HANDED'] },
  ], availableWargear: [],
  unitSubTypes: [
    { id: 'darkness', name: 'Daemon Prince of Darkness', creditCostModifier: -20,
      grantedKeywords: ['UNDIVIDED'],
      description: 'The Daemon Prince and all allied models within 6" of it have the STEALTH Keyword. It gains the UNDIVIDED Keyword. It can be equipped with equipment from any of the Legions\u2019 Battlekit Lists.' },
    { id: 'khorne', name: 'Daemon Prince of Khorne', creditCostModifier: 0,
      grantedKeywords: ['KHORNE'],
      description: 'The Daemon Prince\u2019s melee attacks have an additional +1 INJURY MODIFIER, and it gains the KHORNE Keyword. It can be equipped with equipment from the Blood Legion Battlekit List.' },
    { id: 'nurgle', name: 'Daemon Prince of Nurgle', creditCostModifier: 0,
      grantedKeywords: ['NURGLE'],
      description: 'The Daemon Prince treats Down results as Minor Hits (does not affect Down results that replace Out of Action via TOUGH Keyword), and it gains the NURGLE Keyword. It can be equipped with equipment from the Plague Legion Battlekit List.' },
    { id: 'slaanesh', name: 'Daemon Prince of Slaanesh', creditCostModifier: 0,
      grantedKeywords: ['SLAANESH'],
      statModifiers: { movement: 1 },
      description: 'The Daemon Prince gains +1" movement speed, +1 DICE to all Dash Success Rolls, and the SLAANESH Keyword. It can be equipped with equipment from the Legion of Excess Battlekit List.' },
    { id: 'tzeentch', name: 'Daemon Prince of Tzeentch', creditCostModifier: 0,
      grantedKeywords: ['TZEENTCH'],
      description: 'The Daemon Prince\u2019s ranged attacks have an additional +1 INJURY MODIFIER, and it gains the TZEENTCH Keyword. It can be equipped with equipment from the Scintillating Legion Battlekit List.' },
  ],
  upgrades: [
    { id: 'cd_daemon_prince_wings', name: 'Wings', cost: 10, maxCount: 1,
      grantedKeywords: ['FLYING'],
      description: 'Grants 8" FLYING movement. Can be combined with any deity sub-type.' },
  ],
};
export const cd_chaos_furie: UnitOption = {
  id: 'cd_chaos_furie', name: 'Chaos Furie', baseCost: 70, minCount: 0, maxCount: 3,
  stats: { movement: 10, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FLYING', 'UNDIVIDED'],
  baseSize: '25mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Winged undivided lesser daemon.',
  defaultWargear: [
    { id: 'cd_daemonic_claw', name: 'Daemonic Claw ×2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE OFF-HAND'],
      description: 'Two natural claws requiring no hand slots. No off-hand penalty when attacking with both.' },
  ], availableWargear: [],
  // Rule: any equipped melee weapon or hand-using item replaces a Daemonic Claw per hand used
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_daemonic_claw', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_bloodmaster: UnitOption = {
  id: 'cd_bloodmaster', name: 'Bloodmaster', baseCost: 70, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'KHORNE', 'LEADER', 'TOUGH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Herald of Khorne.',
  defaultWargear: [], availableWargear: [],
};
export const cd_skullmaster: UnitOption = {
  id: 'cd_skullmaster', name: 'Skullmaster', baseCost: 90, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'LARGE', 'KHORNE', 'TOUGH'],
  baseSize: '60mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Herald of Khorne mounted on a Juggernaut.',
  defaultWargear: [
    { id: 'cd_juggernauts_bladed_horn', name: 'Juggernaut\'s Bladed Horn', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE'],
      description: 'Gains +1 INJURY DICE during the Charge turn. The Skullmaster can make an extra melee attack with this weapon when it takes the Fight Action.' },
  ], availableWargear: [],
};
export const cd_bloodletter: UnitOption = {
  id: 'cd_bloodletter', name: 'Bloodletter', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'KHORNE'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Daemon foot soldier of Khorne.',
  defaultWargear: [], availableWargear: [],
};
export const cd_flesh_hound: UnitOption = {
  id: 'cd_flesh_hound', name: 'Flesh Hound', baseCost: 100, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LARGE', 'NO PROMOTION', 'KHORNE'],
  baseSize: '60x35mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Khornate hunting daemon.',
  defaultWargear: [
    { id: 'cd_burning_roar', name: 'Burning Roar', type: 'ranged', range: 8, cost: 0, handedness: 'no-hands',
      keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE'] },
    { id: 'cd_gore_drenched_fangs', name: 'Gore-Drenched Fangs', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE'] },
  ], availableWargear: [],
  cannotEquip: true,
};
export const cd_infernal_enrapturess: UnitOption = {
  id: 'cd_infernal_enrapturess', name: 'Infernal Enrapturess', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'LARGE', 'LEADER', 'SLAANESH', 'TOUGH'],
  baseSize: '60x35mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Herald of Slaanesh with an infernal instrument.',
  defaultWargear: [
    { id: 'cd_heartstring_lyre', name: 'Heartstring Lyre', type: 'ranged', range: 24, cost: 0, handedness: 'two-handed',
      keywords: ['TWO-HANDED'],
      description: 'Choose one mode — Cacophonous Melody: 18", IGNORE COVER, ASSAULT, BLAST 2"; or Euphonic Blast: 24", IGNORE ARMOUR, IGNORE COVER.' },
    { id: 'cd_slashing_claw_enrap', name: 'Slashing Claw ×2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CRITICAL', 'IGNORE OFF-HAND'],
      description: 'Two claws, no hands required. No off-hand penalty.' },
  ], availableWargear: [],
  // Rule: melee weapons replace Slashing Claws (one claw per hand used; shown as full replacement)
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_slashing_claw_enrap', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_tranceweaver: UnitOption = {
  id: 'cd_tranceweaver', name: 'Tranceweaver', baseCost: 70, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'PSYKER 1', 'SLAANESH'],
  baseSize: '25mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Psyker Herald of Slaanesh. (+ powers)',
  defaultWargear: [
    { id: 'cd_slashing_claw_trw', name: 'Slashing Claw ×2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CRITICAL', 'IGNORE OFF-HAND'],
      description: 'Two claws, no hands required. No off-hand penalty.' },
  ], availableWargear: [],
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_slashing_claw_trw', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_daemonette: UnitOption = {
  id: 'cd_daemonette', name: 'Daemonette', baseCost: 60, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'SLAANESH'],
  baseSize: '25mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Daemon foot soldier of Slaanesh.',
  defaultWargear: [
    { id: 'cd_slashing_claw_daem', name: 'Slashing Claw ×2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CRITICAL', 'IGNORE OFF-HAND'],
      description: 'Two claws, no hands required. No off-hand penalty.' },
  ], availableWargear: [],
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_slashing_claw_daem', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_seeker: UnitOption = {
  id: 'cd_seeker', name: 'Seeker', baseCost: 95, minCount: 0, maxCount: 3,
  stats: { movement: 10, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'INFILTRATOR', 'LARGE', 'SLAANESH'],
  baseSize: '60x35mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Daemonette mounted on a Steed of Slaanesh.',
  defaultWargear: [
    { id: 'cd_lashing_tongue', name: 'Lashing Tongue', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: [],
      description: 'The Seeker can make an extra melee attack with this weapon when it takes the Fight Action.' },
    { id: 'cd_slashing_claw_seek', name: 'Slashing Claw ×2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CRITICAL', 'IGNORE OFF-HAND'],
      description: 'Two claws, no hands required. No off-hand penalty.' },
  ], availableWargear: [],
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_slashing_claw_seek', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_contorted_epitome: UnitOption = {
  id: 'cd_contorted_epitome', name: 'Contorted Epitome', baseCost: 85, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LARGE', 'SLAANESH'],
  baseSize: '75x42mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Slaanesh greater daemon construct.',
  defaultWargear: [
    { id: 'cd_coiled_tentacles', name: 'Coiled Tentacles', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['CLEAVE 2', 'BLOCK', 'CRITICAL', 'CUMBERSOME', 'TWO-HANDED', 'WHIP 3"'] },
  ], availableWargear: [],
  cannotEquip: true,
};
export const cd_poxbringer: UnitOption = {
  id: 'cd_poxbringer', name: 'Poxbringer', baseCost: 70, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LEADER', 'NURGLE', 'PSYKER 1', 'TOUGH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Psyker Herald of Nurgle. (+ powers)',
  defaultWargear: [], availableWargear: [],
};
export const cd_spoilpox_scrivener: UnitOption = {
  id: 'cd_spoilpox_scrivener', name: 'Spoilpox Scrivener', baseCost: 70, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LARGE', 'NURGLE'],
  baseSize: '40mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Herald of Nurgle keeping the death tally.',
  defaultWargear: [], availableWargear: [],
};
export const cd_plaguebearer: UnitOption = {
  id: 'cd_plaguebearer', name: 'Plaguebearer', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'NURGLE'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Daemon foot soldier of Nurgle.',
  defaultWargear: [], availableWargear: [],
};
export const cd_nurgling_swarm: UnitOption = {
  id: 'cd_nurgling_swarm', name: 'Nurgling Swarm', baseCost: 55, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LARGE', 'LIMITED POTENTIAL', 'NURGLE', 'SWARM', 'TOUGH'],
  baseSize: '50mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Writhing mass of tiny Nurgle daemons.',
  defaultWargear: [
    { id: 'cd_nurgling_ccw', name: 'Close Combat Weapon (innate)', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: [],
      description: 'Always counts as equipped with a close combat weapon. No hand slots used.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const cd_plague_drone_rider: UnitOption = {
  id: 'cd_plague_drone_rider', name: 'Plague Drone Rider', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'FLYING', 'LARGE', 'NURGLE', 'TOUGH'],
  baseSize: '60mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Plaguebearer mounted on a Rot Fly.',
  defaultWargear: [
    { id: 'cd_foul_mouthparts', name: 'Foul Mouthparts', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CRITICAL'],
      description: 'Natural weapon, no hands required. The Plague Drone Rider can make an extra melee attack with this weapon when it takes the Fight Action.' },
  ], availableWargear: [],
};
export const cd_changecaster: UnitOption = {
  id: 'cd_changecaster', name: 'Changecaster', baseCost: 75, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'LEADER', 'PSYKER 1', 'TOUGH', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Psyker Herald of Tzeentch. (+ powers)',
  defaultWargear: [
    { id: 'cd_arcane_fireball', name: 'Arcane Fireball', type: 'ranged', range: 18, cost: 0, handedness: 'one-handed',
      keywords: ['FIRE', 'PSYCHIC', 'RISKY'],
      description: 'Uses the ranged hand. RISKY — take a Risky Success Roll when firing.' },
  ], availableWargear: [],
};
export const cd_flamer: UnitOption = {
  id: 'cd_flamer', name: 'Flamer', baseCost: 120, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'FLYING', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Fire-spewing Tzeentch daemon.',
  defaultWargear: [
    { id: 'cd_fire_of_tzeentch', name: 'Fire of Tzeentch', type: 'ranged', range: 18, cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE COVER', 'FIRE', 'PSYCHIC'] },
    { id: 'cd_flickering_flames', name: 'Flickering Flames', type: 'ranged', range: 8, cost: 0, handedness: 'no-hands',
      keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE', 'PSYCHIC'] },
    { id: 'cd_flamer_mouth', name: 'Flamer Mouth', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['FIRE'] },
  ], availableWargear: [],
  cannotEquip: true,
};
export const cd_blue_horror: UnitOption = {
  id: 'cd_blue_horror', name: 'Blue Horror', baseCost: 45, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LIMITED POTENTIAL', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Small splitting Tzeentch daemon.',
  defaultWargear: [
    { id: 'cd_coruscating_blue_flames', name: 'Coruscating Blue Flames', type: 'ranged', range: 18, cost: 0, handedness: 'two-handed',
      keywords: ['-1 INJURY DICE', 'FIRE', 'PSYCHIC', 'RISKY', 'TWO-HANDED'] },
    { id: 'cd_blue_claws', name: 'Blue Claws', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['-1 INJURY DICE', 'TWO-HANDED'] },
  ], availableWargear: [],
  cannotEquip: true,
};
export const cd_pink_horror: UnitOption = {
  id: 'cd_pink_horror', name: 'Pink Horror', baseCost: 150, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Dangerously cheerful Tzeentch daemon.',
  defaultWargear: [
    { id: 'cd_coruscating_pink_flames', name: 'Coruscating Pink Flames', type: 'ranged', range: 18, cost: 0, handedness: 'two-handed',
      keywords: ['FIRE', 'PSYCHIC', 'RISKY', 'TWO-HANDED'] },
    { id: 'cd_pink_claws', name: 'Pink Claws', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['TWO-HANDED'] },
  ], availableWargear: [],
  // Rule: any equipped melee weapon replaces the included Pink Claws
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_pink_claws', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_screamer: UnitOption = {
  id: 'cd_screamer', name: 'Screamer', baseCost: 70, minCount: 0, maxCount: 3,
  stats: { movement: 10, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FLYING', 'NO PROMOTION', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Disc-shaped flying Tzeentch daemon.',
  defaultWargear: [
    { id: 'cd_lamprey_maw', name: 'Lamprey Maw', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'TWO-HANDED'] },
  ], availableWargear: [],
  cannotEquip: true,
};

// ==========================================================================
// THE VERMINTIDE
// ==========================================================================
export const ver_clawlord: UnitOption = {
  id: 'ver_clawlord', name: 'Clawlord', baseCost: 60, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LEADER', 'MASTER', 'SKAVEN', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'the_vermintide', unitType: 'elite',
  description: 'Mandatory Vermintide leader. Scheming Skaven warlord.',
  defaultWargear: [], availableWargear: [],
};
export const ver_deathmaster: UnitOption = {
  id: 'ver_deathmaster', name: 'Deathmaster', baseCost: 85, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'INFILTRATOR', 'MASTER', 'SKAVEN', 'STEALTH'],
  baseSize: '25-32mm',
  faction: 'the_vermintide', unitType: 'elite',
  description: 'Elite Skaven assassin. Can teleport via Tunneljack.',
  defaultWargear: [], availableWargear: [],
};
export const ver_warlock: UnitOption = {
  id: 'ver_warlock', name: 'Warlock', baseCost: 45, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'MASTER', 'PSYKER 1', 'SKAVEN'],
  baseSize: '25-32mm',
  faction: 'the_vermintide', unitType: 'elite',
  description: 'Skaven warp-energy psyker. Must equip a PSYCHIC weapon. Purchases powers from Ruin Discipline. Upgrade: Arch-Warlock (+10cr, PSYKER 2, up to 5 powers).',
  defaultWargear: [], availableWargear: [],
};
export const ver_skavenslave: UnitOption = {
  id: 'ver_skavenslave', name: 'Skavenslave', baseCost: 20, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FIRETEAM', 'NO PROMOTION', 'SKAVEN'],
  baseSize: '25mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Skaven cannon fodder. Max 2 per MASTER model. Cost 20cr + weapon. Must be equipped with at least one weapon (melee, pistol, armour, or equipment ≤10cr).',
  defaultWargear: [], availableWargear: [],
};
export const ver_clanrat: UnitOption = {
  id: 'ver_clanrat', name: 'Clanrat', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['NO PROMOTION', 'SKAVEN', 'SKIRMISHER'],
  baseSize: '25-28mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Standard Skaven trooper. Upgrades: Night Runner (+15cr, INFILTRATOR STEALTH), Packmaster (+5cr, MASTER), Plague Monk (+10cr), Globodier (+10cr).',
  defaultWargear: [], availableWargear: [],
};
export const ver_stormvermin: UnitOption = {
  id: 'ver_stormvermin', name: 'Stormvermin', baseCost: 45, minCount: 0, maxCount: 5,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MASTER', 'SKAVEN'],
  baseSize: '32mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Elite Skaven guard. Elite Bodyguard: can redirect hits targeting allies within 1".',
  defaultWargear: [], availableWargear: [],
};
export const ver_weapons_team: UnitOption = {
  id: 'ver_weapons_team', name: 'Skaven Weapons Team', baseCost: 40, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['LARGE', 'SKAVEN'],
  baseSize: '60x35mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Skaven crew weapon. Can ignore HEAVY on one ranged weapon.',
  defaultWargear: [], availableWargear: [],
};
export const ver_rat_ogryn: UnitOption = {
  id: 'ver_rat_ogryn', name: 'Rat Ogryn', baseCost: 65, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEAST', 'LARGE', 'LIMITED POTENTIAL', 'SKAVEN', 'STRONG', 'TOUGH'],
  baseSize: '40-50mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Monstrous Skaven brute. Successful Charges inflict a BLOOD MARKER on an enemy.',
  defaultWargear: [], availableWargear: [],
};
export const ver_doom_flayer: UnitOption = {
  id: 'ver_doom_flayer', name: 'Doom Flayer', baseCost: 145, minCount: 0, maxCount: 1,
  stats: { movement: 10, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['LARGE', 'NO PROMOTION', 'SKAVEN', 'TOUGH', 'VEHICLE'],
  baseSize: '50mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Armoured Skaven war machine. Has one hand for additional weapons (Shield Combo allows two-handed).',
  defaultWargear: [
    { id: 'ver_whirling_blades', name: 'Whirling Blades', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE', 'CRITICAL'],
      description: 'Built-in spinning blades. No hand slots required. Additional +1 INJURY DICE when Charged. Can be used alongside any other melee weapon without off-hand penalties.' },
  ], availableWargear: [],
};

// ==========================================================================
// ORKS
// ==========================================================================
export const or_warboss: UnitOption = {
  id: 'or_warboss', name: 'Warboss', baseCost: 85, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 3, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'LEADER', 'ORK', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'orks', unitType: 'elite',
  description: 'Mandatory biggest and meanest Ork.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'or_painboss', name: 'Painboss', cost: 30, maxCount: 1,
      description: 'Gains Bioniks (Cyberteknika access), Dok\'s Toolz (-1 DICE to injury rolls against itself), and Sawbonez (can restore a model to 1 Wound). Cannot wear Mega Armour; melee attacks reduced to +2 DICE.' },
  ],
};
export const or_big_mek: UnitOption = {
  id: 'or_big_mek', name: 'Big Mek', baseCost: 70, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'ORK', 'STRONG'],
  baseSize: '40mm',
  faction: 'orks', unitType: 'elite',
  description: 'Ork mekanic and inventor. Kustom Force Field: -1 DICE to injury rolls against itself.',
  defaultWargear: [], availableWargear: [],
};
export const or_weirdboy: UnitOption = {
  id: 'or_weirdboy', name: 'Weirdboy', baseCost: 40, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'ORK', 'PSYKER 0'],
  baseSize: '40mm',
  faction: 'orks', unitType: 'elite',
  description: 'Warp-touched Ork psyker. (35cr + 5cr staff). Deadly Demise: Explodes 3" on death. Waaagh! Energy: +1 Psyker level per friendly Ork within 6".',
  defaultWargear: [
    { id: 'or_weirdboy_staff', name: 'Weirdboy Staff', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['+1 DICE', 'HELD', 'PSYCHIC'],
      description: 'MAIN HAND ONLY. +1 Injury Dice vs DAEMON and PSYKER targets. HELD — occupies a hand slot. Included in unit cost.' },
  ], availableWargear: [],
};
export const or_gretchin: UnitOption = {
  id: 'or_gretchin', name: 'Gretchin', baseCost: 25, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ORK', 'STEALTH'],
  baseSize: '25mm',
  faction: 'orks', unitType: 'troop',
  description: 'Small sneaky Greenskin. Max count = non-Gretchin non-Squig models.',
  defaultWargear: [], availableWargear: [],
};
export const or_boy: UnitOption = {
  id: 'or_boy', name: 'Boy', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ORK'],
  baseSize: '32mm',
  faction: 'orks', unitType: 'troop',
  description: 'Standard Ork warrior.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'or_runtherd', name: 'Runtherd', cost: 5, maxCount: 1,
      description: 'Friendly Gretchin within 6" ignore Cowardice and have +2 DICE to Hit with melee weapons (Ya Filthy Grots!).' },
    { id: 'or_kommando_boy', name: 'Kommando', cost: 10, maxCount: 2, maxCountLarge: 3,
      grantedKeywords: ['INFILTRATOR', 'STEALTH'],
      description: 'Gains INFILTRATOR and STEALTH Keywords.' },
    { id: 'or_mek_boy', name: 'Mek', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Can ignore the HEAVY property of one Kustom Mega-Blasta, Shokka Pistol, Shokk Attack Gun, Traktor Blasta, or Zzap Gun.' },
    { id: 'or_stormboy', name: 'Stormboy', cost: 0, maxCount: 2, maxCountLarge: 3,
      description: 'Can use Jump Rokkits. Must be equipped with a Jump Rokkit to be deployed.' },
  ],
};
export const or_nob: UnitOption = {
  id: 'or_nob', name: 'Nob', baseCost: 50, minCount: 0, maxCount: 4,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['LARGE', 'ORK', 'STRONG'],
  baseSize: '40mm',
  faction: 'orks', unitType: 'troop',
  description: 'Big tough Ork veteran.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'or_kommando_nob', name: 'Kommando Nob', cost: 10, maxCount: 1,
      grantedKeywords: ['INFILTRATOR', 'STEALTH'],
      description: 'Gains INFILTRATOR and STEALTH Keywords.' },
    { id: 'or_stormboy_nob', name: 'Stormboy Nob', cost: 0, maxCount: 1,
      description: 'Can use Jump Rokkits. Must be equipped with a Jump Rokkit to be deployed.' },
  ],
};
export const or_squig: UnitOption = {
  id: 'or_squig', name: 'Squig', baseCost: 30, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEAST', 'NO PROMOTION', 'ORK'],
  baseSize: '25mm',
  faction: 'orks', unitType: 'troop',
  description: 'Bouncy Ork beast. Sprinta: +1 DICE to Dash. Squig Farm: Replacement costs 5cr.',
  defaultWargear: [
    { id: 'or_squig_jaws', name: 'Squig Jaws', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['SHRAPNEL'],
      description: 'Natural gnashing attack. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const or_deff_dread: UnitOption = {
  id: 'or_deff_dread', name: 'Deff Dread', baseCost: 180, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ORK', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'orks', unitType: 'troop',
  description: 'Ramshackle Ork walker. Deadly Demise: Explodes 3" on death. Dead Shooty: Can shoot with 2 ranged weapons.',
  defaultWargear: [
    { id: 'or_dread_klaws', name: 'Dread Klaws', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['DEADLY', 'HEAVY', 'RISKY', 'TWO-HANDED'],
      description: 'Massive crushing klaws built into the Deff Dread chassis.' },
  ], availableWargear: [],
};
export const or_squighog_boy: UnitOption = {
  id: 'or_squighog_boy', name: 'Squighog Boy', baseCost: 105, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['LARGE', 'MOUNTED', 'ORK', 'STRONG', 'TOUGH'],
  baseSize: '75x42mm',
  faction: 'orks', unitType: 'troop',
  description: 'Da Big Hunt variant unit. Wild Ride: +4" to Dash.',
  defaultWargear: [
    { id: 'or_squighog_jaws', name: 'Squighog Jaws', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['ARMOUR PIERCING 1', 'SHRAPNEL'],
      description: 'Natural gnashing attack. Use in addition to other weapons.' },
  ], availableWargear: [],
};

// ==========================================================================
// DRUKHARI
// ==========================================================================
export const dr_archon: UnitOption = {
  id: 'dr_archon', name: 'Archon', baseCost: 85, minCount: 1, maxCount: 1,
  stats: { movement: 7, rangedSkill: 3, meleeSkill: 3, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DRUKHARI', 'ELITE', 'LEADER', 'TOUGH'],
  baseSize: '25-28mm',
  faction: 'drukhari', unitType: 'elite',
  description: 'Mandatory Dark Eldar lord.',
  defaultWargear: [], availableWargear: [],
};
export const dr_haemonculus: UnitOption = {
  id: 'dr_haemonculus', name: 'Haemonculus', baseCost: 105, minCount: 0, maxCount: 1,
  stats: { movement: 7, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DRUKHARI', 'ELITE', 'FEAR'],
  baseSize: '25-28mm',
  faction: 'drukhari', unitType: 'elite',
  description: 'Twisted flesh-sculptor of the Drukhari.',
  defaultWargear: [], availableWargear: [],
};
export const dr_succubus: UnitOption = {
  id: 'dr_succubus', name: 'Succubus', baseCost: 75, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DRUKHARI', 'ELITE'],
  baseSize: '25-28mm',
  faction: 'drukhari', unitType: 'elite',
  description: 'Deadly arena champion.',
  defaultWargear: [], availableWargear: [],
};
export const dr_kabalite_warrior: UnitOption = {
  id: 'dr_kabalite_warrior', name: 'Kabalite Warrior', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 7, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DRUKHARI'],
  baseSize: '25-28mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Swift and lethal Dark Eldar warrior.',
  defaultWargear: [], availableWargear: [],
};
export const dr_incubus: UnitOption = {
  id: 'dr_incubus', name: 'Incubus', baseCost: 65, minCount: 0, maxCount: 3,
  stats: { movement: 7, rangedSkill: 1, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DRUKHARI', 'FEAR'],
  baseSize: '25-28mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Elite close-combat bodyguard.',
  defaultWargear: [], availableWargear: [],
};
export const dr_wrack: UnitOption = {
  id: 'dr_wrack', name: 'Wrack', baseCost: 65, minCount: 0, maxCount: 3,
  stats: { movement: 7, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DRUKHARI'],
  baseSize: '25-28mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Haemonculus creation, living weapon.',
  defaultWargear: [], availableWargear: [],
};
export const dr_wych: UnitOption = {
  id: 'dr_wych', name: 'Wych', baseCost: 60, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DRUKHARI'],
  baseSize: '25-28mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Arena fighter and acrobatic warrior.',
  defaultWargear: [], availableWargear: [],
};
export const dr_reaver: UnitOption = {
  id: 'dr_reaver', name: 'Reaver', baseCost: 90, minCount: 0, maxCount: 2,
  stats: { movement: 10, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['DRUKHARI', 'FLYING', 'INFILTRATOR', 'SKIRMISHER', 'VEHICLE'],
  baseSize: '32mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Jetbike-riding Drukhari raider.',
  defaultWargear: [], availableWargear: [],
};
export const dr_cronos: UnitOption = {
  id: 'dr_cronos', name: 'Cronos', baseCost: 150, minCount: 0, maxCount: 1,
  stats: { movement: 7, rangedSkill: 2, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'DRUKHARI', 'FLYING', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Haemonculus spirit-engine harvesting pain tokens.',
  defaultWargear: [], availableWargear: [],
};
export const dr_talos: UnitOption = {
  id: 'dr_talos', name: 'Talos', baseCost: 150, minCount: 0, maxCount: 1,
  stats: { movement: 7, rangedSkill: 1, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'DRUKHARI', 'FLYING', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Haemonculus pain engine.',
  defaultWargear: [], availableWargear: [],
};
export const dr_clawed_fiend: UnitOption = {
  id: 'dr_clawed_fiend', name: 'Clawed Fiend', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['BEAST', 'DRUKHARI', 'FEAR', 'LARGE', 'NO PROMOTION', 'TOUGH'],
  baseSize: '50mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Beastmaster pet. Includes Fists, Stinger, Thick Hide. Ability: Rage (+1 Hit in melee on Charge).',
  defaultWargear: [
    { id: 'dr_clawed_fiend_fists', name: 'Fists', type: 'melee', cost: 0, handedness: 'no-hands', keywords: ['CLEAVE 2', '+1 INJURY MODIFIER'], description: 'Built-in.' },
    { id: 'dr_clawed_fiend_stinger', name: 'Stinger', type: 'melee', cost: 0, handedness: 'no-hands', keywords: ['GAS'], description: 'Built-in.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const dr_khymera: UnitOption = {
  id: 'dr_khymera', name: 'Khymera', baseCost: 75, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEAST', 'DAEMON', 'DRUKHARI', 'FEAR', 'LARGE', 'NO PROMOTION'],
  baseSize: '40mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Beastmaster pet. Includes Khymerae Talons. Abilities: Agile Beast (+1 Climb/Dash/Jump), Daemonic Resistance (-1 Injury DICE vs it).',
  defaultWargear: [
    { id: 'dr_khymera_talons', name: 'Khymerae Talons', type: 'melee', cost: 0, handedness: 'no-hands', keywords: ['CLEAVE 2', 'CRITICAL'], description: 'Built-in.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const dr_razorwing_flock: UnitOption = {
  id: 'dr_razorwing_flock', name: 'Razorwing Flock', baseCost: 80, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEAST', 'DRUKHARI', 'FEAR', 'FLYING', 'LARGE', 'NO PROMOTION', 'SWARM', 'TOUGH'],
  baseSize: '40mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Beastmaster pet. Includes Razorwing Feathers. Ability: Harassing Swarm (+1 Hit/Injure vs retreating enemy free attack).',
  defaultWargear: [
    { id: 'dr_razorwing_feathers', name: 'Razorwing Feathers', type: 'melee', cost: 0, handedness: 'no-hands', keywords: ['CRITICAL', 'SWEEPING'], description: 'Built-in.' },
  ], availableWargear: [],
  cannotEquip: true,
};

// ==========================================================================
// TYRANIDS
// ==========================================================================
export const ty_hive_tyrant: UnitOption = {
  id: 'ty_hive_tyrant', name: 'Hive Tyrant', baseCost: 175, minCount: 1, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'LARGE', 'LEADER', 'PSYKER 1', 'STRONG', 'SYNAPSE', 'TOUGH', 'TYRANID'],
  baseSize: '60mm',
  faction: 'tyranids', unitType: 'elite',
  description: 'Mandatory Hive Tyrant. (+10cr for FLYING)',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'ty_hive_tyrant_winged', name: 'Winged', cost: 10, maxCount: 1,
      grantedKeywords: ['FLYING'],
      description: 'Grants 8" movement and FLYING.' },
  ],
};
export const ty_lictor: UnitOption = {
  id: 'ty_lictor', name: 'Lictor', baseCost: 125, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['FEAR', 'LARGE', 'INFILTRATOR', 'STEALTH', 'TOUGH', 'TYRANID'],
  baseSize: '50mm',
  faction: 'tyranids', unitType: 'elite',
  description: 'Terrifying hunter-killer bioform.',
  defaultWargear: [], availableWargear: [],
};
export const ty_tyrant_guard: UnitOption = {
  id: 'ty_tyrant_guard', name: 'Tyrant Guard', baseCost: 130, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'STRONG', 'TOUGH', 'TYRANID'],
  baseSize: '50mm',
  faction: 'tyranids', unitType: 'elite',
  description: 'Bodyguard bioform for the Hive Tyrant.',
  defaultWargear: [], availableWargear: [],
};
export const ty_gaunt_barbgaunt: UnitOption = {
  id: 'ty_gaunt_barbgaunt', name: 'Barbgaunt', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['LARGE', 'NO PROMOTION', 'TYRANID'],
  baseSize: '40mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Artillery biomorph gaunt strain.',
  defaultWargear: [], availableWargear: [],
};
export const ty_gaunt_gargoyle: UnitOption = {
  id: 'ty_gaunt_gargoyle', name: 'Gargoyle', baseCost: 40, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FLYING', 'NO PROMOTION', 'TYRANID'],
  baseSize: '25-28mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Flying gaunt biomorph.',
  defaultWargear: [], availableWargear: [],
};
export const ty_gaunt_hormagaunt: UnitOption = {
  id: 'ty_gaunt_hormagaunt', name: 'Hormagaunt', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['NO PROMOTION', 'TYRANID'],
  baseSize: '25-28mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Fast close-combat gaunt biomorph.',
  defaultWargear: [], availableWargear: [],
};
export const ty_gaunt_neurogaunt: UnitOption = {
  id: 'ty_gaunt_neurogaunt', name: 'Neurogaunt', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['NO PROMOTION', 'TYRANID'],
  baseSize: '25-28mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Synapse-linked gaunt biomorph.',
  defaultWargear: [], availableWargear: [],
};
export const ty_gaunt_termagant: UnitOption = {
  id: 'ty_gaunt_termagant', name: 'Termagant', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['NO PROMOTION', 'SKIRMISHER', 'TYRANID'],
  baseSize: '25-28mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Standard ranged gaunt biomorph.',
  defaultWargear: [], availableWargear: [],
};
export const ty_tyranid_warrior: UnitOption = {
  id: 'ty_tyranid_warrior', name: 'Tyranid Warrior', baseCost: 95, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['LARGE', 'STRONG', 'SYNAPSE', 'TOUGH', 'TYRANID'],
  baseSize: '40-50mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Synapse creature / elite biomorph.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'ty_warrior_winged', name: 'Winged', cost: 15, maxCount: 1,
      grantedKeywords: ['FLYING'],
      description: 'Grants 8" movement and FLYING.' },
  ],
};
export const ty_ravener: UnitOption = {
  id: 'ty_ravener', name: 'Ravener', baseCost: 105, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['BURROW', 'DEEP STRIKE (TUNNEL)', 'LARGE', 'TOUGH', 'TYRANID'],
  baseSize: '40mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Fast burrowing Tyranid predator. (DEEP STRIKE – TUNNEL)',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'ty_ravener_wrecker', name: 'Wrecker', cost: 5, maxCount: 1,
      description: 'Ignores the HEAVY Keyword of melee weapons.' },
  ],
};
export const ty_ripper_swarm: UnitOption = {
  id: 'ty_ripper_swarm', name: 'Ripper Swarm', baseCost: 75, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BURROW', 'DEEP STRIKE (TUNNEL)', 'FEAR', 'LARGE', 'NO PROMOTION', 'SWARM', 'TOUGH', 'TYRANID'],
  baseSize: '40mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Devouring swarm of tiny bioforms. (DEEP STRIKE – TUNNEL)',
  defaultWargear: [
    { id: 'ty_spinemaws', name: 'Spinemaws', type: 'ranged', range: 8, cost: 0, handedness: 'no-hands',
      keywords: ['AUTOMATIC 2', 'ASSAULT'],
      description: 'Volleys of organic bio-spines. No hand slots required.' },
    { id: 'ty_swarming_claws', name: 'Swarming Claws', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: [],
      description: 'Hits all models in base contact simultaneously. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const ty_zoanthrope: UnitOption = {
  id: 'ty_zoanthrope', name: 'Zoanthrope', baseCost: 85, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['FLYING', 'LARGE', 'PSYKER 1', 'SYNAPSE', 'TYRANID'],
  baseSize: '40mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Psychic synapse creature. Ranged Skill: N/A (uses psychic powers only).',
  defaultWargear: [], availableWargear: [],
};
export const ty_spore_mine: UnitOption = {
  id: 'ty_spore_mine', name: 'Spore Mine', baseCost: 25, minCount: 0, maxCount: 5,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'FLYING', 'NO PROMOTION', 'TYRANID'],
  baseSize: '25mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Drifting bio-explosive.',
  defaultWargear: [
    { id: 'ty_spore_burst', name: 'Spore Burst', type: 'ranged', range: 3, cost: 0, handedness: 'no-hands',
      keywords: ['BLAST 3"', 'GAS', 'IGNORE ARMOUR'],
      description: 'Self-destructs when an enemy comes within 3". One-use only. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};

// ==========================================================================
// GENESTEALER CULTS
// ==========================================================================
export const gc_primus: UnitOption = {
  id: 'gc_primus', name: 'Primus', baseCost: 55, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'GENESTEALER CULTS', 'LEADER', 'TOUGH'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Mandatory hybrid leader of the brood.',
  defaultWargear: [], availableWargear: [],
};
export const gc_clamavus: UnitOption = {
  id: 'gc_clamavus', name: 'Clamavus', baseCost: 65, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'GENESTEALER CULTS'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Broadcaster spreading the cult\'s insidious message.',
  defaultWargear: [], availableWargear: [],
};
export const gc_magus: UnitOption = {
  id: 'gc_magus', name: 'Magus', baseCost: 40, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'GENESTEALER CULTS', 'PSYKER 1'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Hybrid psyker. (+ powers)',
  defaultWargear: [], availableWargear: [],
};
export const gc_nexos: UnitOption = {
  id: 'gc_nexos', name: 'Nexos', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'GENESTEALER CULTS', 'STEALTH'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Tactical genius of the uprising.',
  defaultWargear: [], availableWargear: [],
};
export const gc_neophyte: UnitOption = {
  id: 'gc_neophyte', name: 'Neophyte', baseCost: 30, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GENESTEALER CULTS'],
  baseSize: '25-28mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Later-generation human-hybrid cultist.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'gc_neophyte_miner', name: 'Neophyte Miner', cost: 5, maxCount: 2,
      description: 'Ignores the HEAVY Keyword of a single weapon they carry.' },
  ],
};
export const gc_acolyte: UnitOption = {
  id: 'gc_acolyte', name: 'Acolyte', baseCost: 50, minCount: 0, maxCount: 6,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GENESTEALER CULTS', 'SKIRMISHER', 'STEALTH'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Close-combat hybrid fighter.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'gc_metamorph', name: 'Metamorph', cost: 15, maxCount: 99,
      description: 'Gains Metamorph Talon: Melee, CLEAVE 2, HELD. Up to half of your Acolytes (rounded down) can be Metamorphs.' },
    { id: 'gc_acolyte_miner', name: 'Acolyte Miner', cost: 10, maxCount: 2,
      grantedKeywords: ['STRONG'],
      description: 'Gains the STRONG Keyword.' },
  ],
};
export const gc_aberrant: UnitOption = {
  id: 'gc_aberrant', name: 'Aberrant', baseCost: 60, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GENESTEALER CULTS', 'LIMITED POTENTIAL', 'STRONG'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Musclebound hybrid brute. (50cr + 10cr hammer)',
  defaultWargear: [
    { id: 'gc_two_handed_hammer', name: 'Two-Handed Hammer', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
      description: 'Included in cost at recruitment.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const gc_abominant: UnitOption = {
  id: 'gc_abominant', name: 'Abominant', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 3, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GENESTEALER CULTS', 'LARGE', 'NEGATE FEAR', 'NO PROMOTION', 'REGENERATE 1', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Alpha mutant leading Aberrant packs. (95cr + 20cr hammer)',
  defaultWargear: [
    { id: 'gc_thunder_hammer', name: 'Thunder Hammer', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
      description: 'Included in cost at recruitment.' },
  ], availableWargear: [],
  cannotEquip: true,
};

// -- Genestealer Cults Warband Variant: Broodcoven --
export const gc_patriarch: UnitOption = {
  id: 'gc_patriarch', name: 'Patriarch', baseCost: 160, minCount: 1, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'GENESTEALER CULTS', 'LARGE', 'LEADER', 'PSYKER 2', 'STRONG', 'TOUGH'],
  baseSize: '50mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Broodcoven only — mandatory Warband leader. (160cr + cost of psychic powers; includes heavy carapace; ranged N/A)',
  defaultWargear: [
    { id: 'gc_patriarch_claws', name: 'Patriarch Claws ×2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['VICIOUS 10', '+1 INJURY DICE', 'CRITICAL', 'IGNORE OFF-HAND'],
      description: 'Two Patriarch Claws included in cost. IGNORE OFF-HAND when fighting with both claws. Cannot equip Headgear, Medicae Kit, Grapnel Launcher, or hand-occupying equipment.' },
    { id: 'gc_heavy_carapace', name: 'Heavy Carapace', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'],
      description: 'Included in cost. Grants -2 Armour Save.',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const gc_genestealer_troop: UnitOption = {
  id: 'gc_genestealer_troop', name: 'Genestealer', baseCost: 75, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['FEAR', 'GENESTEALER CULTS', 'INFILTRATOR', 'LARGE', 'STEALTH', 'STRONG'],
  baseSize: '25-28mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Broodcoven only (Purestrain). Recruited as normal Troop for 75 credits. Max 3.',
  defaultWargear: [
    { id: 'gc_rending_claws', name: 'Rending Claws ×4', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE', 'CRITICAL', 'IGNORE ARMOUR', 'IGNORE OFF-HAND'],
      description: 'Four scything claws. No hand slots required. IGNORE OFF-HAND when attacking with multiple claws.' },
  ], availableWargear: [],
  cannotEquip: true,
};

// ==========================================================================
// HARLEQUINS
// ==========================================================================
export const hq_troupe_master: UnitOption = {
  id: 'hq_troupe_master', name: 'Troupe Master', baseCost: 110, minCount: 1, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'HARLIQUIN', 'LEADER', 'TOUGH'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'elite',
  description: 'Mandatory master of the masque. (95cr + 15cr battlekit)',
  defaultWargear: [
    { id: 'hq_holo_suit_tm', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Included in cost.' },
    { id: 'hq_flip_belt_tm', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'hq_tm_darknesses_bite',   name: "Darkness' Bite",   cost: 10, maxCount: 1,
      description: 'When the Troupe Master takes the Fight Action, it can make one additional attack with one of its weapons.' },
    { id: 'hq_tm_prince_of_light',   name: 'Prince of Light',  cost: 10, maxCount: 1,
      description: 'The Troupe Master and all friendly HARLEQUIN models within 6" of it can declare a Charge against an enemy they cannot see.' },
    { id: 'hq_tm_twilights_grasp',   name: "Twilight's Grasp", cost: 15, maxCount: 1,
      description: "At the end of each of its Activations, each enemy model in close combat with the Troupe Master suffers 1 BLOOD MARKER." },
  ],
};
export const hq_death_jester: UnitOption = {
  id: 'hq_death_jester', name: 'Death Jester', baseCost: 105, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'HARLIQUIN'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'elite',
  description: 'Morose comedian of death. (90cr + 15cr battlekit)',
  defaultWargear: [
    { id: 'hq_holo_suit_dj', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Included in cost.' },
    { id: 'hq_flip_belt_dj', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'hq_dj_harvester_of_torment', name: 'Harvester of Torment',  cost: 20, maxCount: 1,
      description: 'When the Death Jester makes a non-BLAST ranged attack that hits, it can make one additional identical non-BLAST ranged attack against any enemy model within 3" of the original target.' },
    { id: 'hq_dj_humbling_cruelty',    name: 'Humbling Cruelty',      cost: 10, maxCount: 1,
      description: 'If an enemy model is hit by a non-BLAST ranged attack made by the Death Jester, that model is Shaken until the end of its next Activation.' },
    { id: 'hq_dj_jest_inescapable',    name: 'The Jest Inescapable',  cost: 10, maxCount: 1,
      description: 'All non-BLAST ranged attacks made by the Death Jester have +12" range.' },
  ],
};
export const hq_shadowseer: UnitOption = {
  id: 'hq_shadowseer', name: 'Shadowseer', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'HARLIQUIN', 'PSYKER 2'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'elite',
  description: 'Harlequin psyker. (95cr + 15cr battlekit + powers)',
  defaultWargear: [
    { id: 'hq_holo_suit_ss', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Included in cost.' },
    { id: 'hq_flip_belt_ss', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'hq_ss_agent_of_bedlam',  name: 'Agent of Bedlam',   cost: 10, maxCount: 1,
      description: 'Enemy models within 6" of the Shadowseer have -1 DICE to all non-attack Success Rolls.' },
    { id: 'hq_ss_gloomwake',        name: 'Gloomwake',          cost: 15, maxCount: 1,
      description: 'The Shadowseer and all friendly HARLEQUIN models within 6" of it gain the STEALTH keyword.' },
    { id: 'hq_ss_veil_of_illusion', name: 'Veil of Illusion',  cost: 15, maxCount: 1,
      description: 'Enemy models within 6" of the Shadowseer have -1 INJURY DICE with all attacks.' },
  ],
};
export const hq_solitaire: UnitOption = {
  id: 'hq_solitaire', name: 'Solitaire', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 10, rangedSkill: 0, meleeSkill: 3, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'HARLIQUIN', 'STEALTH', 'TOUGH'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'elite',
  description: 'Lone dancer walking the path of Slaanesh. (100cr + 15cr battlekit)',
  defaultWargear: [
    { id: 'hq_holo_suit_sol', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Included in cost.' },
    { id: 'hq_flip_belt_sol', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'hq_sol_chromatic_rush',       name: 'Chromatic Rush',        cost: 10, maxCount: 1,
      description: 'When the Solitaire declares a Charge, it can charge up to 16". Roll 2D6 and take the highest result.' },
    { id: 'hq_sol_shocking_emergence',   name: 'Shocking Emergence',    cost: 10, maxCount: 1, grantedKeywords: ['DEEP STRIKE'],
      description: 'The Solitaire gains the DEEP STRIKE keyword.' },
    { id: 'hq_sol_unnatural_acrobatics', name: 'Unnatural Acrobatics',  cost: 20, maxCount: 1,
      description: 'All attacks made against the Solitaire have an additional -1 DICE to Hit.' },
  ],
};
export const hq_mime: UnitOption = {
  id: 'hq_mime', name: 'Mime', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['HARLIQUIN', 'INFILTRATOR'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'troop',
  description: 'Harlequin infiltrator. (45cr + 5cr). Max = other HARLIQUIN count.',
  defaultWargear: [
    { id: 'hq_flip_belt_mime', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
};
export const hq_player: UnitOption = {
  id: 'hq_player', name: 'Player', baseCost: 80, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['HARLIQUIN'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'troop',
  description: 'Harlequin troupe member. (65cr + 15cr battlekit)',
  defaultWargear: [
    { id: 'hq_holo_suit_pl', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Included in cost.' },
    { id: 'hq_flip_belt_pl', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'hq_pl_acrobat', name: 'Acrobat', cost: 10, maxCount: 99,
      description: 'This model does not trigger free attacks when Retreating, and can leave close combat with a standard move.' },
    { id: 'hq_pl_dancer',  name: 'Dancer',  cost: 5,  maxCount: 99, grantedKeywords: ['SKIRMISHER'],
      description: 'This model gains the SKIRMISHER keyword.' },
    { id: 'hq_pl_mourner', name: 'Mourner', cost: 10, maxCount: 99, grantedKeywords: ['FEAR'],
      description: 'This model gains the FEAR keyword.' },
    { id: 'hq_pl_slayer',  name: 'Slayer',  cost: 5,  maxCount: 99,
      description: 'When this model charges, it has +1 DICE to Hit with all attacks during that activation.' },
  ],
};
export const hq_skyweaver: UnitOption = {
  id: 'hq_skyweaver', name: 'Skyweaver', baseCost: 115, minCount: 0, maxCount: 2,
  stats: { movement: 10, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['FLYING', 'HARLIQUIN', 'LARGE', 'VEHICLE'],
  baseSize: '60x35mm',
  faction: 'harlequins', unitType: 'troop',
  description: 'Harlequin jetbike rider. (105cr + 10cr battlekit)',
  defaultWargear: [
    { id: 'hq_holo_suit_sw', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Armour -1 already included in stats. Included in cost.' },
  ], availableWargear: [],
};

// ==========================================================================
// LEAGUES OF VOTANN
// ==========================================================================
export const lv_kahl: UnitOption = {
  id: 'lv_kahl', name: 'Kahl', baseCost: 55, minCount: 1, maxCount: 1,
  stats: { movement: 5, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'LEADER', 'TOUGH', 'VOTANN'],
  baseSize: '40mm',
  faction: 'leagues_of_votann', unitType: 'elite',
  description: 'Mandatory Kin leader. Heavily Armoured: first -1 of Armour has IMPERVIOUS.',
  defaultWargear: [], availableWargear: [],
};
export const lv_brokhyr_iron_master: UnitOption = {
  id: 'lv_brokhyr_iron_master', name: 'Brôkhyr Iron-Master', baseCost: 45, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'VOTANN'],
  baseSize: '32mm',
  faction: 'leagues_of_votann', unitType: 'elite',
  description: 'Master engineer of the Leagues. Heavily Armoured: first -1 of Armour has IMPERVIOUS.',
  defaultWargear: [], availableWargear: [],
};
export const lv_grimnyr: UnitOption = {
  id: 'lv_grimnyr', name: 'Grimnyr', baseCost: 55, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FLYING', 'LARGE', 'PSYKER 1', 'VOTANN'],
  baseSize: '40mm',
  faction: 'leagues_of_votann', unitType: 'elite',
  description: 'Kin psyker sage. (+ powers) Heavily Armoured: first -1 of Armour has IMPERVIOUS.',
  defaultWargear: [], availableWargear: [],
};
export const lv_hearthkyn: UnitOption = {
  id: 'lv_hearthkyn', name: 'Hearthkyn', baseCost: 25, minCount: 0, maxCount: 99,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['VOTANN'],
  baseSize: '25-32mm',
  faction: 'leagues_of_votann', unitType: 'troop',
  description: 'Standard Kin warrior. (+ armour cost) Heavily Armoured: first -1 of Armour has IMPERVIOUS.',
  defaultWargear: [], availableWargear: [],
};
export const lv_cthonian_beserk: UnitOption = {
  id: 'lv_cthonian_beserk', name: 'Cthonian Beserk', baseCost: 40, minCount: 0, maxCount: 4,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['STRONG', 'VOTANN'],
  baseSize: '25-32mm',
  faction: 'leagues_of_votann', unitType: 'troop',
  description: 'Close-combat specialist of the Leagues.',
  defaultWargear: [], availableWargear: [],
};
export const lv_einhyr_hearthguard: UnitOption = {
  id: 'lv_einhyr_hearthguard', name: 'Einhyr Hearthguard', baseCost: 85, minCount: 0, maxCount: 3,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['VOTANN'],
  baseSize: '32mm',
  faction: 'leagues_of_votann', unitType: 'troop',
  description: 'Elite veteran Kin warrior. (40cr + 45cr armour) Heavily Armoured: first -1 of Armour has IMPERVIOUS.',
  defaultWargear: [], availableWargear: [],
};
export const lv_brokhyr_thunderkyn: UnitOption = {
  id: 'lv_brokhyr_thunderkyn', name: 'Brôkhyr Thunderkyn', baseCost: 85, minCount: 0, maxCount: 2,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['LARGE', 'VEHICLE', 'VOTANN'],
  baseSize: '40mm',
  faction: 'leagues_of_votann', unitType: 'troop',
  description: 'Heavy weapons platform. (40cr + 45cr armour; 0-3 at 1200cr+) Heavily Armoured: first -1 of Armour has IMPERVIOUS.',
  defaultWargear: [], availableWargear: [],
};
export const lv_ironkin_steeljack: UnitOption = {
  id: 'lv_ironkin_steeljack', name: 'Ironkin Steeljack', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'LARGE', 'STRONG', 'VOTANN'],
  baseSize: '40mm',
  faction: 'leagues_of_votann', unitType: 'troop',
  description: 'Ironkin combat automaton. (0-2 if no Hernkyn Pioneers) Heavily Armoured: first -1 of Armour has IMPERVIOUS.',
  defaultWargear: [], availableWargear: [],
};
export const lv_hernkyn_pioneer: UnitOption = {
  id: 'lv_hernkyn_pioneer', name: 'Hernkyn Pioneer', baseCost: 135, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['FLYING', 'LARGE', 'NO PROMOTION', 'SKIRMISHER', 'VEHICLE', 'TOUGH', 'VOTANN'],
  baseSize: '90x52mm',
  faction: 'leagues_of_votann', unitType: 'troop',
  description: 'Fast-moving Kin skirmisher vehicle. Heavily Armoured: first -1 of Armour has IMPERVIOUS.',
  defaultWargear: [], availableWargear: [],
};

// ==========================================================================
// SLANNI
// ==========================================================================
export const sl_mage_chief: UnitOption = {
  id: 'sl_mage_chief', name: 'Mage Chief', baseCost: 60, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'LEADER', 'PSYKER 3', 'SLANN', 'TOUGH'],
  baseSize: '32-40mm',
  faction: 'slanni', unitType: 'elite',
  description: 'Mandatory cold-blooded psyker warlord. (+ powers)',
  defaultWargear: [], availableWargear: [],
};
export const sl_oldblood: UnitOption = {
  id: 'sl_oldblood', name: 'Oldblood', baseCost: 65, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'NEGATE FEAR', 'SLANN', 'STRONG'],
  baseSize: '32mm',
  faction: 'slanni', unitType: 'elite',
  description: 'Ancient cold-blooded veteran warrior.',
  defaultWargear: [], availableWargear: [],
};
export const sl_starpriest: UnitOption = {
  id: 'sl_starpriest', name: 'Starpriest', baseCost: 60, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'PSYKER 1', 'SKIRMISHER', 'SLANN'],
  baseSize: '25-28mm',
  faction: 'slanni', unitType: 'elite',
  description: 'Skink priest attuned to celestial energies. (+ powers)',
  defaultWargear: [], availableWargear: [],
};
export const sl_skirmisher: UnitOption = {
  id: 'sl_skirmisher', name: 'Skirmisher', baseCost: 40, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['SKIRMISHER', 'SLANN'],
  baseSize: '25-28mm',
  faction: 'slanni', unitType: 'troop',
  description: 'Fast Skink warrior.',
  defaultWargear: [], availableWargear: [],
};
export const sl_brave: UnitOption = {
  id: 'sl_brave', name: 'Brave', baseCost: 45, minCount: 0, maxCount: 6,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['SLANN'],
  baseSize: '32mm',
  faction: 'slanni', unitType: 'troop',
  description: 'Saurus warrior.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'sl_guardian', name: 'Guardian', cost: 15, maxCount: 2, maxCountLarge: 3,
      grantedKeywords: ['STRONG'],
      description: 'Gains the STRONG Keyword and the Loyal Protector ability: if any ally within 1" is hit by a ranged or melee weapon (excluding BLAST), you may redirect the hit to this Guardian instead. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
  ],
};
export const sl_battle_mage: UnitOption = {
  id: 'sl_battle_mage', name: 'Battle Mage', baseCost: 40, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['PSYKER 1', 'SLANN'],
  baseSize: '25-32mm',
  faction: 'slanni', unitType: 'troop',
  description: 'Skink psyker. (+ powers)',
  defaultWargear: [], availableWargear: [],
};
export const sl_brute: UnitOption = {
  id: 'sl_brute', name: 'Brute', baseCost: 70, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['LARGE', 'SLANN', 'STRONG'],
  baseSize: '32-40mm',
  faction: 'slanni', unitType: 'troop',
  description: 'Large cold-blooded brute warrior.',
  defaultWargear: [], availableWargear: [],
};
export const sl_amphi_walker: UnitOption = {
  id: 'sl_amphi_walker', name: 'Amphi Walker', baseCost: 160, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['LARGE', 'NEGATE SHRAPNEL', 'SLANN', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '50-60mm',
  faction: 'slanni', unitType: 'troop',
  description: 'Ancient Slann warmachine.',
  defaultWargear: [
    { id: 'sl_heavy_kick', name: 'Heavy Kick', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY MODIFIER', 'HEAVY'],
      description: 'Thunderous stomping attack from the walker\'s legs. No hand slots required.' },
  ], availableWargear: [],
};

// ==========================================================================
// NECRONS
// ==========================================================================
export const nec_necron_lord: UnitOption = {
  id: 'nec_necron_lord', name: 'Necron Lord', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'LEADER', 'NECRON', 'NEGATE GAS', 'TOUGH'],
  baseSize: '40mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Necron noble commander (one of Lord/Cryptek must be leader).',
  defaultWargear: [], availableWargear: [],
};
export const nec_cryptek: UnitOption = {
  id: 'nec_cryptek', name: 'Cryptek', baseCost: 105, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'NECRON', 'NEGATE GAS'],
  baseSize: '40-50mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Necron technomancer. (+ staff)',
  unitSubTypes: [
    {
      id: 'nec_cryptek_chronomancer',
      name: 'Chronomancer Discipline',
      description: 'Chronometron: Action + Success +1 DICE (self/ally 6") -> All attacks against target have -1 DICE to Hit until end of Turn. Timesplinter: Action + Success -> Relocate ally 6" to within 6" of Cryptek.',
      creditCostModifier: 0,
    },
    {
      id: 'nec_cryptek_ethermancer',
      name: 'Ethermancer Discipline',
      description: 'Ether Crystal: Action + Success -> Place Storm Marker within 24"; 3" radius counts as Dangerous/Difficult. Lightning Field: Action + Success +1 DICE (self/ally 6") -> Melee attackers suffer STUN MARKERS until end of Turn.',
      creditCostModifier: 0,
    },
    {
      id: 'nec_cryptek_geomancer',
      name: 'Geomancer Discipline',
      description: 'Harp of Dissonance: Action + Success -> Target enemy 6" rolls on Injury table. Seismic Crucible: Action + Success +1 DICE -> All other models within 6" roll Injury (ignore Armour, +1 DICE, STUN instead of BLOOD, OOA -> Down).',
      creditCostModifier: 0,
    },
    {
      id: 'nec_cryptek_plasmancer',
      name: 'Plasmancer Discipline',
      description: 'Harbinger of Destruction: Action + Success -> Self/ally 12" gets +1 DICE Hit/Injure next ranged attack. Living Lightning: Action + Success +1 DICE -> Enemy 8" suffers D3 STUN MARKERS.',
      creditCostModifier: 0,
    },
    {
      id: 'nec_cryptek_psychomancer',
      name: 'Psychomancer Discipline',
      description: 'Harbinger of Despair: Action + Success -> Enemy 24" (not activated) cannot activate until D3 others (or last). Veil of Darkness: Action + Success +1 DICE -> Teleport self to within 8".',
      creditCostModifier: 0,
    },
    {
      id: 'nec_cryptek_technomancer',
      name: 'Technomancer Discipline',
      description: 'Canoptek Repair: Action + Success -> Heal 1 BM (3 on crit) from self/Necron ally 6". Reinforce Metal: Action + Success +1 DICE -> Self/ally 6" takes -1 DICE on incoming Injury rolls until end of Turn.',
      creditCostModifier: 0,
    },
  ],
  defaultWargear: [], availableWargear: [],
};
export const nec_royal_warden: UnitOption = {
  id: 'nec_royal_warden', name: 'Royal Warden', baseCost: 85, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'NECRON', 'NEGATE GAS'],
  baseSize: '32mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Necron officer of the Royal Court.',
  defaultWargear: [], availableWargear: [],
};
export const nec_warrior: UnitOption = {
  id: 'nec_warrior', name: 'Necron Warrior', baseCost: 70, minCount: 0, maxCount: 99,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['NECRON', 'NEGATE GAS', 'NO PROMOTION'],
  baseSize: '32mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Rank-and-file undying Necron soldier.',
  defaultWargear: [], availableWargear: [],
};
export const nec_immortal: UnitOption = {
  id: 'nec_immortal', name: 'Immortal', baseCost: 95, minCount: 0, maxCount: 5,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 1, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['NECRON', 'NEGATE GAS'],
  baseSize: '32mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Elite Necron heavy infantry.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'nec_deathmark', name: 'Deathmark', cost: 10, maxCount: 2,
      grantedKeywords: ['INFILTRATOR'],
      description: 'Gains INFILTRATOR and Hyperspace Hunter: ranged attacks have IGNORE COVER.' },
    { id: 'nec_lychguard', name: 'Lychguard', cost: 10, maxCount: 2,
      description: 'Gains Guardian Protocols: can redirect hits from allies within 1" to itself.' },
  ],
};
export const nec_scarab_swarm: UnitOption = {
  id: 'nec_scarab_swarm', name: 'Canoptek Scarab Swarm', baseCost: 70, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'FEAR', 'FLYING', 'LARGE', 'NECRON', 'NEGATE GAS', 'NO PROMOTION', 'SWARM', 'TOUGH'],
  baseSize: '40mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Swarming repair and combat scarabs.',
  defaultWargear: [
    { id: 'nec_feeder_mandibles', name: 'Feeder Mandibles', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['SWEEPING'],
      description: 'SWEEPING — hits all models in base contact simultaneously. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const nec_tomb_blade: UnitOption = {
  id: 'nec_tomb_blade', name: 'Tomb Blade', baseCost: 100, minCount: 0, maxCount: 2,
  stats: { movement: 10, rangedSkill: 1, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['FLYING', 'LARGE', 'LIMITED POTENTIAL', 'NECRON', 'NEGATE GAS', 'SKIRMISHER', 'VEHICLE'],
  baseSize: '32-40mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Fast Necron jetbike.',
  defaultWargear: [], availableWargear: [],
};
export const nec_lokhust_lord: UnitOption = {
  id: 'nec_lokhust_lord', name: 'Lokhust Lord', baseCost: 160, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FLYING', 'LARGE', 'NECRON', 'NEGATE GAS', 'TOUGH'],
  baseSize: '60mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Destroyer Cult variant: mounted lord.',
  defaultWargear: [], availableWargear: [],
};
export const nec_skorpekh_lord: UnitOption = {
  id: 'nec_skorpekh_lord', name: 'Skorpekh Lord', baseCost: 140, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'NECRON', 'NEGATE GAS', 'TOUGH'],
  baseSize: '50mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Destroyer Cult variant: close-combat lord.',
  defaultWargear: [], availableWargear: [],
};
export const nec_hexmark_destroyer: UnitOption = {
  id: 'nec_hexmark_destroyer', name: 'Hexmark Destroyer', baseCost: 160, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'INFILTRATOR', 'NECRON', 'NEGATE GAS', 'TOUGH'],
  baseSize: '50mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Destroyer Cult variant: marksman lord.',
  defaultWargear: [], availableWargear: [],
};
export const nec_lokhust_destroyer: UnitOption = {
  id: 'nec_lokhust_destroyer', name: 'Lokhust Destroyer', baseCost: 115, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['LARGE', 'FLYING', 'NECRON', 'NEGATE GAS'],
  baseSize: '60mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Destroyer Cult variant: flying heavy destroyer.',
  defaultWargear: [], availableWargear: [],
};
export const nec_ophydian_destroyer: UnitOption = {
  id: 'nec_ophydian_destroyer', name: 'Ophydian Destroyer', baseCost: 90, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['BURROW', 'DEEP STRIKE (TUNNEL)', 'LARGE', 'NECRON', 'NEGATE GAS', 'STEALTH'],
  baseSize: '50mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Destroyer Cult variant: burrowing destroyer. (DEEP STRIKE – TUNNEL)',
  defaultWargear: [], availableWargear: [],
};
export const nec_skorpekh_destroyer: UnitOption = {
  id: 'nec_skorpekh_destroyer', name: 'Skorpekh Destroyer', baseCost: 105, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['LARGE', 'NECRON', 'NEGATE GAS'],
  baseSize: '50mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Destroyer Cult variant: close-combat destroyer.',
  defaultWargear: [], availableWargear: [],
};
export const nec_canoptek_spyder: UnitOption = {
  id: 'nec_canoptek_spyder', name: 'Canoptek Spyder', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'ELITE', 'FLYING', 'LARGE', 'NECRON', 'NEGATE GAS', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Canoptek Court variant: repair spyder.',
  defaultWargear: [
    { id: 'nec_automaton_claws', name: 'Automaton Claws', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'TWO-HANDED'],
      description: 'Powerful manipulator claws built into the Spyder chassis.' },
  ], availableWargear: [],
};
export const nec_apprentek: UnitOption = {
  id: 'nec_apprentek', name: 'Apprentek', baseCost: 95, minCount: 0, maxCount: 3,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['NECRON', 'NEGATE GAS'],
  baseSize: '32mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Canoptek Court variant: lesser technomancer.',
  defaultWargear: [
    { id: 'nec_staff_of_light', name: 'Staff of Light', type: 'melee', cost: 0, isMainHandOnly: true,
      keywords: ['MAIN HAND ONLY', 'HELD'],
      description: 'HELD. Strike: Melee, MAIN HAND ONLY. Solar Lance: 18". Elite Only.' },
  ], availableWargear: [],
};
export const nec_macrocyte_warrior: UnitOption = {
  id: 'nec_macrocyte_warrior', name: 'Macrocyte Warrior', baseCost: 60, minCount: 0, maxCount: 3,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'FLYING', 'NECRON', 'NEGATE GAS', 'NO PROMOTION'],
  baseSize: '32mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Canoptek Court variant: flying scarab warrior.',
  defaultWargear: [], availableWargear: [],
};
export const nec_flayer_king: UnitOption = {
  id: 'nec_flayer_king', name: 'Flayer King', baseCost: 165, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'ELITE', 'FEAR', 'LEADER', 'NECRON', 'NEGATE GAS', 'STEALTH', 'TOUGH'],
  baseSize: '32-40mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Flayer King variant: mandatory leader.',
  defaultWargear: [
    { id: 'nec_lords_claw', name: "Lord's Claw", type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE OFF-HAND', 'IGNORE ARMOUR', 'CRITICAL'],
      description: 'Two claws of living metal, requiring no hand slots. Treated as having two of these weapons.' },
  ], availableWargear: [],
};

// ==========================================================================
// AELDARI
// ==========================================================================
export const ael_autarch: UnitOption = {
  id: 'ael_autarch', name: 'Autarch', baseCost: 75, minCount: 1, maxCount: 1,
  stats: { movement: 7, rangedSkill: 3, meleeSkill: 3, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['AELDARI', 'ELITE', 'LEADER', 'TOUGH'],
  baseSize: '25-28mm',
  faction: 'aeldari', unitType: 'elite',
  description: 'Mandatory Aeldari warband leader.',
  defaultWargear: [], availableWargear: [],
};
export const ael_seer: UnitOption = {
  id: 'ael_seer', name: 'Seer', baseCost: 65, minCount: 0, maxCount: 1,
  stats: { movement: 7, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['AELDARI', 'ELITE', 'PSYKER 2'],
  baseSize: '25-28mm',
  faction: 'aeldari', unitType: 'elite',
  description: 'Aeldari Farseer psyker. (+ weapon + powers)',
  defaultWargear: [], availableWargear: [],
};
export const ael_warlock: UnitOption = {
  id: 'ael_warlock', name: 'Warlock', baseCost: 45, minCount: 0, maxCount: 2,
  stats: { movement: 7, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['AELDARI', 'ELITE', 'PSYKER 1'],
  baseSize: '25-28mm',
  faction: 'aeldari', unitType: 'elite',
  description: 'Aeldari Warlock psyker. (+ weapon + powers)',
  defaultWargear: [], availableWargear: [],
};
export const ael_guardian: UnitOption = {
  id: 'ael_guardian', name: 'Guardian', baseCost: 45, minCount: 0, maxCount: 99,
  stats: { movement: 7, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['AELDARI'],
  baseSize: '25-28mm',
  faction: 'aeldari', unitType: 'troop',
  description: 'Citizen-soldier of the Craftworld.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'ael_ranger', name: 'Ranger', cost: 10, maxCount: 99,
      grantedKeywords: ['INFILTRATOR', 'SKIRMISHER', 'STEALTH'],
      description: 'Gains INFILTRATOR, SKIRMISHER, and STEALTH Keywords. Up to half of your Guardians (rounded down) can be Rangers.' },
  ],
};
export const ael_aspect_warrior: UnitOption = {
  id: 'ael_aspect_warrior', name: 'Aspect Warrior', baseCost: 65, minCount: 0, maxCount: 16,
  stats: { movement: 7, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['AELDARI'],
  baseSize: '28-32mm',
  faction: 'aeldari', unitType: 'troop',
  description: 'Dedicated Path warrior. Select an Aspect Path.',
  defaultWargear: [], availableWargear: [],
  unitSubTypes: [
    {
      id: 'ael_dark_reaper', name: 'Dark Reaper', creditCostModifier: 0, limit: 2,
      description: 'Gains Inescapable Accuracy (ignores hit penalties except Cover/Long Range; ignores range limits) and Reaper Arsenal (ignores HEAVY on 1 ranged weapon).',
    },
    {
      id: 'ael_dire_avenger', name: 'Dire Avenger', creditCostModifier: 0, limit: 2,
      description: 'Gains Bladestorm: All attacks have VICIOUS 10.',
    },
    {
      id: 'ael_fire_dragon', name: 'Fire Dragon', creditCostModifier: 0, limit: 2,
      description: 'Gains Assured Destruction: Ranged IGNORE ARMOUR attacks automatically set one Injury die to a 6 if target relies on Armour (excluding Shields).',
    },
    {
      id: 'ael_howling_banshee', name: 'Howling Banshee', creditCostModifier: 0, limit: 2,
      description: 'Gains Acrobatic: No free attacks on Retreat; can voluntarily leave melee via Standard Move/Charge/Dash.',
    },
    {
      id: 'ael_shining_spear', name: 'Shining Spear', creditCostModifier: 0, limit: 2,
      description: 'Gains Aerobatic Grace (-1 DICE to be Hit by Ranged) and Jetbike rules. MUST equip Jetbike (25pts).',
    },
    {
      id: 'ael_striking_scorpion', name: 'Striking Scorpion', creditCostModifier: 0, limit: 2,
      grantedKeywords: ['INFILTRATOR'],
      description: 'Gains Shadow Strike: Has INFILTRATOR and can Charge enemies it cannot see.',
    },
    {
      id: 'ael_swooping_hawk', name: 'Swooping Hawk', creditCostModifier: 0, limit: 2,
      description: 'Gains Flyover (move through models; free Thrown attack after moving through enemy) and Wings rules. MUST equip Swooping Hawk Wings (25pts).',
    },
    {
      id: 'ael_warp_spider', name: 'Warp Spider', creditCostModifier: 0, limit: 2,
      description: 'Gains Flickerjump: Action (Risky +1 DICE) to teleport 6". On failure, suffer Injury roll.',
    },
  ],
};
export const ael_windrider: UnitOption = {
  id: 'ael_windrider', name: 'Windrider', baseCost: 90, minCount: 0, maxCount: 2,
  stats: { movement: 10, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['AELDARI', 'FLYING', 'VEHICLE'],
  baseSize: '32-40mm',
  faction: 'aeldari', unitType: 'troop',
  description: 'Jetbike-mounted Craftworld warrior.',
  defaultWargear: [], availableWargear: [],
};
export const ael_wraith: UnitOption = {
  id: 'ael_wraith', name: 'Wraith', baseCost: 120, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['AELDARI', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '40mm',
  faction: 'aeldari', unitType: 'troop',
  description: 'Ghostly wraithbone warrior construct.',
  defaultWargear: [], availableWargear: [],
};
export const ael_dragonlord: UnitOption = {
  id: 'ael_dragonlord', name: 'Dragonlord', baseCost: 110, minCount: 1, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 3, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['AELDARI', 'ELITE', 'LARGE', 'LEADER', 'MOUNTED', 'TOUGH'],
  baseSize: '60mm',
  faction: 'aeldari', unitType: 'elite',
  description: 'Exodites variant: mandatory Dragonlord leader.',
  defaultWargear: [], availableWargear: [],
};
export const ael_dragon_knight: UnitOption = {
  id: 'ael_dragon_knight', name: 'Dragon Knight', baseCost: 85, minCount: 0, maxCount: 6,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['AELDARI', 'LARGE', 'MOUNTED'],
  baseSize: '60x35mm',
  faction: 'aeldari', unitType: 'troop',
  description: 'Exodites variant: cold-one rider.',
  defaultWargear: [], availableWargear: [],
};
export const ael_wraithseer: UnitOption = {
  id: 'ael_wraithseer', name: 'Wraithseer', baseCost: 145, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['AELDARI', 'ELITE', 'LARGE', 'PSYKER 2', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'aeldari', unitType: 'elite',
  description: 'Spirit Conclave variant: wraithbone psyker. (+ weapon + powers)',
  defaultWargear: [], availableWargear: [],
};
export const ael_wraithlord: UnitOption = {
  id: 'ael_wraithlord', name: 'Wraithlord', baseCost: 140, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['AELDARI', 'LARGE', 'NO PROMOTION', 'STRONG', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'aeldari', unitType: 'troop',
  description: 'Spirit Conclave variant: mighty wraithbone walker.',
  defaultWargear: [], availableWargear: [],
};

// ==========================================================================
// T'AU EMPIRE
// ==========================================================================
export const tau_ethereal: UnitOption = {
  id: 'tau_ethereal', name: 'Ethereal', baseCost: 65, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LEADER', 'MARKERLIGHT', 'T\'AU'],
  baseSize: '32-40mm',
  faction: 't_au_empire', unitType: 'elite',
  description: 'Mandatory Ethereal caste leader. Battlekit: Any T\'au weapons, armour, or equipment.',
  defaultWargear: [], availableWargear: [],
  abilities: [
    {
      id: 'tau_ethereal_coordinated_leadership',
      name: 'Coordinated Leadership',
      description: 'After you deploy your models, choose up to two pairs of other T\'AU models in your Warband. Those pairs form FIRETEAMS so long as the Ethereal is on the battlefield.',
      type: 'passive',
    },
    {
      id: 'tau_ethereal_failure_is_not_an_option',
      name: 'Failure Is Not an Option',
      description: 'While the Ethereal is on the battlefield and not Down, you have an additional +1 DICE to Morale Tests.',
      type: 'passive',
    },
  ],
  unitSubTypes: [
    {
      id: 'tau_ethereal_power_of_tides',
      name: 'Power of Tides',
      creditCostModifier: 0,
      description: 'Invocation. As an Action with a Risky Success Roll, this Ethereal can choose itself or one T\'AU ally within 6" that it can see. That model has +1 INJURY DICE with the next attack it makes.',
    },
    {
      id: 'tau_ethereal_sense_of_stone',
      name: 'Sense of Stone',
      creditCostModifier: 0,
      description: 'Invocation. As an Action with a Risky Success Roll, this Ethereal can choose itself or one T\'AU ally within 6" that it can see. That model has an additional -1 armour, stacking up to -3, and the first -1 of its armour has IMPERVIOUS, until the end of the current Turn.',
    },
    {
      id: 'tau_ethereal_storm_of_fire',
      name: 'Storm of Fire',
      creditCostModifier: 0,
      description: 'Invocation. As an Action with a Risky Success Roll, this Ethereal can choose itself or one T\'AU ally within 6" that it can see. That model has +1 DICE to Hit and ignores Long Range and Cover with its next ranged attack.',
    },
    {
      id: 'tau_ethereal_unifying_mantra',
      name: 'Unifying Mantra',
      creditCostModifier: 0,
      description: 'Invocation. This Ethereal and its T\'AU allies within 12" of it have NEGATE FEAR.',
    },
    {
      id: 'tau_ethereal_wisdom_of_the_guides',
      name: 'Wisdom of the Guides',
      creditCostModifier: 0,
      description: 'Invocation. As an Action with no Success Roll, this Ethereal can choose one enemy that it can see that has not yet activated this Turn. The Ethereal\'s Activation immediately ends and the chosen model\'s Activation begins.',
    },
    {
      id: 'tau_ethereal_zephyrs_grace',
      name: 'Zephyr\'s Grace',
      creditCostModifier: 0,
      description: 'Invocation. As an Action with a Risky Success Roll, this Ethereal can choose itself or one T\'AU ally within 6" that it can see. That model has +1 DICE the next time it makes a Dash Success Roll, and it has +3" movement during that Dash.',
    },
  ],
};
export const tau_commander: UnitOption = {
  id: 'tau_commander', name: 'Commander', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FLYING', 'LARGE', 'MARKERLIGHT', 'STRONG', 'T\'AU', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 't_au_empire', unitType: 'elite',
  description: 'T\'au Commander battlesuit. Battlekit: Battlesuit Plating (built-in), any other Battlesuit Only weapons, armour, or equipment; up to 3 hands of ranged weapons. Treated as equipped with a Close Combat Weapon if 2 free hands in melee. Ability: Battlesuit Armaments (while equipped with 2+ ranged weapons, may Shoot with 2 of them in one Activation; either/both can be replaced with a Markerlight attempt using that weapon\'s range).',
  defaultWargear: [], availableWargear: [],
};
export const tau_cadre_fireblade: UnitOption = {
  id: 'tau_cadre_fireblade', name: 'Cadre Fireblade', baseCost: 55, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'MARKERLIGHT', 'T\'AU'],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'elite',
  description: 'Elite Fire Warrior leader. Battlekit: Any T\'au weapons, armour, or equipment. Ability: Crack Shot (ranged attacks of this model and each friendly T\'AU model within 6" ignore Armour on a Critical Hit).',
  defaultWargear: [], availableWargear: [],
};
export const tau_kroot_shaper: UnitOption = {
  id: 'tau_kroot_shaper', name: 'Kroot Shaper', baseCost: 55, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['KROOT', 'STEALTH', 'T\'AU'],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'elite',
  description: 'Kroot pack leader. Battlekit: Any melee weapons, Kroot Only ranged weapons, or Kroot Only equipment.',
  defaultWargear: [], availableWargear: [],
  abilities: [
    {
      id: 'tau_kroot_shaper_long_stride',
      name: 'Long Stride',
      description: 'The Kroot Shaper has +1 DICE to all Dash Success Rolls.',
      type: 'passive',
    },
  ],
  unitSubTypes: [
    {
      id: 'tau_kroot_shaper_flesh',
      name: 'Flesh Shaper',
      creditCostModifier: 0,
      description: 'Path. Whenever this model or another friendly KROOT model within 12" of it takes an enemy Out of Action, remove 1 BLOOD MARKER from that KROOT model and, if this is the first time this ability has targeted that model this battle, Injury rolls made against it have -1 DICE for the remainder of the battle.',
    },
    {
      id: 'tau_kroot_shaper_trail',
      name: 'Trail Shaper',
      creditCostModifier: 0,
      description: 'Path. Before deployment each battle, this model and up to two non-ELITE KROOT models in your Warband gain the DEEP STRIKE Keyword for the duration of the battle. When using DEEP STRIKE this way, they must be deployed all at once, each within 3" of the others.',
    },
    {
      id: 'tau_kroot_shaper_war',
      name: 'War Shaper',
      creditCostModifier: 0,
      description: 'Path. As an Action with a Success Roll, this model can allow one friendly KROOT model within 12" that is Down to stand up. In addition, when this model or another friendly KROOT model within 12" of it Charges, roll 2D6 instead of 1D6 and add the highest result to the charge move.',
    },
  ],
};
export const tau_fire_warrior: UnitOption = {
  id: 'tau_fire_warrior', name: 'Fire Warrior', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MARKERLIGHT', 'T\'AU'],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'Standard T\'au ranged infantry. Battlekit: Any T\'au weapons, armour, or equipment. Upgrade: Pathfinder (+5cr, grants INFILTRATOR; up to half of your Fire Warriors, rounded down, can be Pathfinders).',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'tau_pathfinder', name: 'Pathfinder', cost: 5, maxCount: 99,
      grantedKeywords: ['INFILTRATOR'],
      description: 'Gains the INFILTRATOR Keyword. Up to half of your Fire Warriors (rounded down) can be Pathfinders.' },
  ],
};
export const tau_drone: UnitOption = {
  id: 'tau_drone', name: 'T\'au Drone', baseCost: 25, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: -1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'FLYING', 'NO PROMOTION', 'T\'AU'],
  baseSize: '32mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'Support drone (+type cost). Max drones = non-KROOT T\'AU models in warband. Battlekit: Only from its Type (no additional wargear). Ability: Drone Control (at battle start, forms a FIRETEAM with one chosen non-ARTIFICIAL, non-KROOT T\'AU model in your warband).',
  defaultWargear: [], availableWargear: [],
  unitSubTypes: [
    { id: 'grav_inhibitor', name: 'Grav-Inhibitor Drone', creditCostModifier: 5, limit: 1,
      description: 'Equipped with a Grav-Inhibitor Field. Enemies that Charge the Grav-Inhibitor Drone or one of its allies within 3" of it cannot add the normal D6 (or D3 or other replacement) to their Charge distance.' },
    { id: 'guardian', name: 'Guardian Drone', creditCostModifier: 5, limit: 2,
      description: 'Equipped with a Guardian Shield Generator. The Guardian Drone and any ally within 3" of it treat Down Injury results as Minor Hits instead. Does not apply to Down results that already replaced another result (e.g. TOUGH).' },
    { id: 'gun', name: 'Gun Drone', creditCostModifier: 20,
      description: 'Equipped with Twin Pulse Carbines. 20", +1 DICE, ASSAULT.' },
    { id: 'marker', name: 'Marker Drone', creditCostModifier: 5, limit: 2,
      grantedKeywords: ['MARKERLIGHT'],
      description: 'Has the MARKERLIGHT Keyword, and is treated as wielding a ranged weapon with a range of 24" for the purpose of placing Markerlight tokens.' },
    { id: 'missile', name: 'Missile Drone', creditCostModifier: 15, limit: 2,
      description: 'Equipped with a Missile Pod.' },
    { id: 'pulse_accelerator', name: 'Pulse Accelerator Drone', creditCostModifier: 0, limit: 1,
      description: 'Equipped with a Pulse Accelerator. The “Pulse” weapons of friendly models within 3" of this drone have +6" to their range.' },
    { id: 'recon', name: 'Recon Drone', creditCostModifier: 60, limit: 1,
      grantedKeywords: ['INFILTRATOR'],
      statModifiers: { armourSave: -1 },
      description: 'Equipped with a Burst Cannon and heavy armour plating (-2 armour instead of -1). Has +1 DICE to Hit with all attacks (+1 to Ranged, +0 to Melee) and the INFILTRATOR Keyword.' },
    { id: 'shield', name: 'Shield Drone', creditCostModifier: 5,
      description: 'Equipped with an Energy Shield and has the Interpose ability. If any ally within 1" is hit by a ranged or melee weapon (excluding BLAST), you can redirect the hit to this drone instead.' },
    { id: 'sniper', name: 'Sniper Drone', creditCostModifier: 25, limit: 3,
      description: 'Equipped with a Longshot Pulse Rifle. 48", +1 DICE.' },
    { id: 'tactical_support_turret', name: 'Tactical Support Turret', creditCostModifier: 15,
      grantedKeywords: ['LARGE'],
      description: 'Stands on a 40mm base and has the LARGE Keyword. Equipped with a Smart Missile System. Cannot move or be forced to move (movement speed counts as 0").' },
  ],
};
export const tau_kroot_carnivore: UnitOption = {
  id: 'tau_kroot_carnivore', name: 'Kroot Carnivore', baseCost: 40, minCount: 0, maxCount: 4,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['KROOT', 'STEALTH', 'T\'AU'],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'Kroot hunter warband member. Battlekit: Any melee weapons, Kroot Only weapons, or Kroot Only equipment; up to half (rounded down) can also carry 1 additional T\'au weapon. Ability: Long Stride (+1 DICE to all Dash Success Rolls). Upgrades: Farstalker (+10cr, INFILTRATOR+SKIRMISHER; up to half rounded up), Kroot Gunner (+5cr; 1 model ignores HEAVY on 1 ranged weapon).',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'tau_farstalker', name: 'Farstalker', cost: 10, maxCount: 99,
      grantedKeywords: ['INFILTRATOR', 'SKIRMISHER'],
      description: 'Gains INFILTRATOR and SKIRMISHER keywords. Up to half of your Kroot Carnivores (rounded up) can be Farstalkers.' },
    { id: 'tau_kroot_gunner', name: 'Kroot Gunner', cost: 5, maxCount: 1,
      description: 'Ignores the HEAVY Keyword of one ranged weapon it carries.' },
  ],
};
export const tau_stealth_battlesuit: UnitOption = {
  id: 'tau_stealth_battlesuit', name: 'Stealth Battlesuit', baseCost: 110, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['FLYING', 'INFILTRATOR', 'MARKERLIGHT', 'STEALTH', 'T\'AU', 'VEHICLE'],
  baseSize: '32mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'XV25 Stealth battlesuit. Battlekit: Battlesuit Plating (built-in), any 1 Battlesuit Only weapon, any Battlesuit Only equipment. Treated as equipped with a Close Combat Weapon if 2 free hands in melee. Abilities: Cloaking Field (Risky Action +1 DICE: hide behind any line-of-sight blocking scenery the model touches — blocks ranged targeting/Charges until model moves, shoots, or enemy comes within 1.5"), Homing Beacon (allies with DEEP STRIKE or INFILTRATOR can deploy fully within 3" of this model even if visible or near enemies; DEEP STRIKE not adjusted by D3").',
  defaultWargear: [], availableWargear: [],
};
export const tau_crisis_battlesuit: UnitOption = {
  id: 'tau_crisis_battlesuit', name: 'Crisis Battlesuit', baseCost: 135, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['FLYING', 'LARGE', 'MARKERLIGHT', 'STRONG', 'T\'AU', 'TOUGH', 'VEHICLE'],
  baseSize: '50mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'XV8 Crisis battlesuit. Battlekit: Battlesuit Plating (built-in), any other Battlesuit Only weapons, armour, or equipment. Treated as equipped with a Close Combat Weapon if 2 free hands in melee. Ability: Battlesuit Armaments (while equipped with 2 ranged weapons, may Shoot with each during its Activation; either/both can be replaced with a Markerlight attempt using that weapon\'s range).',
  defaultWargear: [], availableWargear: [],
};
export const tau_broadside_battlesuit: UnitOption = {
  id: 'tau_broadside_battlesuit', name: 'Broadside Battlesuit', baseCost: 125, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 0, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['LARGE', 'NO PROMOTION', 'STRONG', 'T\'AU', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'Retaliation Cadre variant: heavy support battlesuit. Battlekit: Heavy Battlesuit Plating (built-in), any other Battlesuit Only weapons, armour, or equipment. Treated as equipped with a Two-Handed Hammer if 2 free hands in melee. Ability: Battlesuit Armaments (while equipped with 2 ranged weapons, may Shoot with each in its Activation).',
  defaultWargear: [], availableWargear: [],
};
export const tau_kill_broker: UnitOption = {
  id: 'tau_kill_broker', name: 'Kill Broker', baseCost: 75, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'KROOT', 'STEALTH', 'T\'AU'],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'elite',
  description: 'Kroot Kinband variant: mercenary leader. Battlekit: Any melee weapons, Kroot Only ranged weapons, or Kroot Only equipment. Abilities: Call the Kill (Action/no roll: mark one visible enemy — all KROOT attacks vs that mark gain ARMOUR PIERCING 1 this Turn, stacking with other sources), Long Stride (+1 DICE to all Dash Success Rolls), Victory Shriek (when mark is taken OoA: immediately use Call the Kill again, then up to 1 KROOT ally within 6" gains +1 Injury Dice with all attacks until end of its next Activation).',
  defaultWargear: [], availableWargear: [],
};
export const tau_krootox_rider: UnitOption = {
  id: 'tau_krootox_rider', name: 'Krootox Rider', baseCost: 115, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['LARGE', 'KROOT', 'LIMITED POTENTIAL', 'MOUNTED', 'T\'AU', 'TOUGH'],
  baseSize: '50mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'Kroot Kinband variant: Kroot mounted on Krootox (0-3 in warband worth 1200cr+). Battlekit: Thick Hide and 2 Krootox Fists (Melee, +1 Injury Modifier, no hands) built-in; can equip Kroot Only weapons or equipment using 1 hand (two-handed items allowed via Shield Combo). Ability: Long Stride (+1 DICE to all Dash Success Rolls). Upgrades: Rampager (+10cr, Linebreaker — enemy suffers 1 Blood Marker on successful Charge), Thunderer (+10cr, Weapon Mount — can equip 1 Two-Handed ranged weapon ignoring HEAVY).',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'tau_rampager', name: 'Rampager', cost: 10, maxCount: 1,
      description: 'Gains Linebreaker: when it successfully charges an enemy, that enemy suffers a BLOOD MARKER.' },
    { id: 'tau_thunderer', name: 'Thunderer', cost: 10, maxCount: 1,
      description: 'Gains Weapon Mount: can be equipped with a single TWO-HANDED ranged weapon, ignoring its HEAVY Keyword.' },
  ],
};

// ==========================================================================
// NECROMUNDA GANG
// ==========================================================================
export const ng_gang_leader: UnitOption = {
  id: 'ng_gang_leader', name: 'Gang Leader', baseCost: 60, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'GANGER', 'LEADER', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'necromunda_gang', unitType: 'elite',
  description: 'Mandatory leader of the gang warband.',
  defaultWargear: [], availableWargear: [],
};
export const ng_gang_champion: UnitOption = {
  id: 'ng_gang_champion', name: 'Gang Champion', baseCost: 50, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'GANGER'],
  baseSize: '25-32mm',
  faction: 'necromunda_gang', unitType: 'elite',
  description: 'Veteran ganger officer.',
  defaultWargear: [], availableWargear: [],
};
export const ng_juve: UnitOption = {
  id: 'ng_juve', name: 'Juve', baseCost: 15, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GANGER', 'NO PROMOTION'],
  baseSize: '25-28mm',
  faction: 'necromunda_gang', unitType: 'troop',
  description: 'Young gang prospect.',
  defaultWargear: [], availableWargear: [],
};
export const ng_ganger: UnitOption = {
  id: 'ng_ganger', name: 'Ganger', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GANGER'],
  baseSize: '25-32mm',
  faction: 'necromunda_gang', unitType: 'troop',
  description: 'Standard gang member. Bruiser +1 melee; Shooter +1 ranged.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'ng_heavy', name: 'Heavy', cost: 5, maxCount: 2,
      description: 'Ignores the HEAVY Keyword of one piece of battlekit they carry. Can still carry only one piece of HEAVY battlekit, and it still takes up the normal number of hands.' },
  ],
};
export const ng_cyber_mastiff: UnitOption = {
  id: 'ng_cyber_mastiff', name: 'Hardcase Cyber Mastiff', baseCost: 95, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'NO PROMOTION'],
  baseSize: '25mm',
  faction: 'necromunda_gang', unitType: 'troop',
  description: 'Palanite Enforcers variant: cybernetic attack dog.',
  defaultWargear: [
    { id: 'ng_savage_bite', name: 'Savage Bite', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['ARMOUR PIERCING 1'],
      description: 'Steel-reinforced cyber jaw attack. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const ng_sanctioner_automata: UnitOption = {
  id: 'ng_sanctioner_automata', name: 'Sanctioner Automata', baseCost: 135, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'LARGE', 'NEGATE GAS', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'REGENERATE 1', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'necromunda_gang', unitType: 'troop',
  description: 'Palanite Enforcers variant: heavy combat automaton.',
  defaultWargear: [
    { id: 'ng_pacifier_assault_claw', name: 'Pacifier Assault Claw', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['CRITICAL'],
      description: 'Built-in chassis weapon. Included in cost.' },
  ], availableWargear: [],
};

// ==========================================================================
// PIRATE CREW
// ==========================================================================
export const pc_pirate_captain: UnitOption = {
  id: 'pc_pirate_captain', name: 'Pirate Captain', baseCost: 65, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LEADER', 'PIRATE', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'pirate_crew', unitType: 'elite',
  description: 'Mandatory captain commanding the pirate crew.',
  defaultWargear: [], availableWargear: [],
};
export const pc_first_mate: UnitOption = {
  id: 'pc_first_mate', name: 'First Mate', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'PIRATE'],
  baseSize: '25-32mm',
  faction: 'pirate_crew', unitType: 'elite',
  description: 'Second-in-command of the pirate vessel.',
  defaultWargear: [], availableWargear: [],
};
export const pc_pirate_champion: UnitOption = {
  id: 'pc_pirate_champion', name: 'Pirate Champion', baseCost: 45, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'PIRATE'],
  baseSize: '25-32mm',
  faction: 'pirate_crew', unitType: 'elite',
  description: 'Experienced pirate officer.',
  defaultWargear: [], availableWargear: [],
};
export const pc_pirate: UnitOption = {
  id: 'pc_pirate', name: 'Pirate', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['PIRATE'],
  baseSize: '25-32mm',
  faction: 'pirate_crew', unitType: 'troop',
  description: 'Standard voidborn pirate.',
  defaultWargear: [], availableWargear: [],
};
export const pc_pirate_veteran: UnitOption = {
  id: 'pc_pirate_veteran', name: 'Pirate Veteran', baseCost: 45, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['PIRATE'],
  baseSize: '25-32mm',
  faction: 'pirate_crew', unitType: 'troop',
  description: 'Seasoned pirate with battle experience.',
  defaultWargear: [], availableWargear: [],
};

// ============================================================================
// FACTION OBJECTS
// ============================================================================

export const faction_adeptus_astartes: Faction = {
  id: 'adeptus_astartes',
  name: 'Adeptus Astartes',
  keywords: [],
  description: 'The Space Marines, genetically enhanced warriors of the Emperor.',
  units: applyAbilities([aa_captain, aa_apothecary, aa_chaplain, aa_librarian, aa_scout_marine, aa_space_marine, aa_terminator, aa_dreadnought]),
};

export const faction_astra_militarum: Faction = {
  id: 'astra_militarum',
  name: 'Astra Militarum',
  keywords: [],
  description: 'The vast armies of the Imperial Guard, humanity\'s shield.',
  units: applyAbilities([am_castellan, am_commissar, am_primaris_psyker, am_conscript, am_guardsman, am_veteran_guardsman, am_ratling_marksman, am_heavy_weapons_squad, am_ogryn]),
};

export const faction_adeptus_custodes: Faction = {
  id: 'adeptus_custodes',
  name: 'Adeptus Custodes',
  keywords: [],
  description: 'The golden warriors who guard the Emperor of Mankind.',
  units: applyAbilities([ac_shield_captain, ac_blade_champion, ac_knight_centura, ac_anathema_psykana, ac_custodian_guard, ac_aquilon_terminator, ac_contemptor_dreadnought]),
};

export const faction_adepta_sororitas: Faction = {
  id: 'adepta_sororitas',
  name: 'Adepta Sororitas',
  keywords: [],
  description: 'The Sisters of Battle, warrior-nuns of the Imperial faith.',
  units: applyAbilities([as_canoness, as_dogmata, as_palatine, as_novitiate, as_battle_sister, as_repentia, as_paragon_warsuit, as_penitent_engine]),
};

export const faction_adeptus_mechanicus: Faction = {
  id: 'adeptus_mechanicus',
  name: 'Adeptus Mechanicus',
  keywords: [],
  description: 'The machine-priests of Mars and their cybernetic legions.',
  units: applyAbilities([amec_dominus, amec_skitarii_marshal, amec_tech_priest, amec_skitarii, amec_servitor, amec_electro_priest, amec_sicarian, amec_kataphron, amec_kastelan_robot]),
};

export const faction_adeptus_ministorum: Faction = {
  id: 'adeptus_ministorum',
  name: 'Adeptus Ministorum',
  keywords: [],
  description: 'The Ecclesiarchy\'s faithful militia, spreading the Imperial Creed by fire and sword.',
  units: applyAbilities([amin_confessor, amin_missionary, amin_drill_abbot, amin_preacher, amin_crusader, amin_death_cult_assassin, amin_battle_cherub, amin_miraculist]),
};

export const faction_officio_assassinorum: Faction = {
  id: 'officio_assassinorum',
  name: 'Officio Assassinorum',
  keywords: [],
  description: 'The Emperor\'s hidden blade. No mandatory leader; max 6 elite models.',
  units: applyAbilities([oa_adamus, oa_callidus, oa_culexus, oa_eversor, oa_vanus, oa_venenum, oa_vindicare, oa_aspirant]),
};

export const faction_rogue_trader: Faction = {
  id: 'rogue_trader',
  name: 'Rogue Trader',
  keywords: [],
  description: 'Explorers beyond the light of the Astronomican, armed with a Warrant of Trade.',
  units: applyAbilities([rt_lord_captain, rt_voidmaster, rt_navigator_scion, rt_voidsman]),
};

export const faction_the_inquisition: Faction = {
  id: 'the_inquisition',
  name: 'The Inquisition',
  keywords: [],
  description: 'The secret police of the Imperium, hunting heresy in all its forms.',
  units: applyAbilities([inq_inquisitor, inq_interrogator, inq_mystic, inq_acolyte, inq_jokaero, inq_daemonhost]),
};

export const faction_grey_knights: Faction = {
  id: 'grey_knights',
  name: 'Grey Knights',
  keywords: [],
  description: 'Adeptus Astartes warband variant. Daemon-hunting Space Marines of the Grey Knights Chapter.',
  units: applyAbilities([gk_captain, gk_apothecary, gk_chaplain, gk_librarian, gk_scout_marine, gk_space_marine, gk_terminator, gk_dreadnought]),
};

export const faction_adeptus_arbites: Faction = {
  id: 'adeptus_arbites',
  name: 'Adeptus Arbites',
  keywords: [],
  description: 'Necromunda Gang (Palanite Enforcers) variant. The law-enforcers of the Imperium.',
  units: applyAbilities([arb_gang_leader, arb_gang_champion, arb_juve, arb_ganger, arb_cyber_mastiff, arb_sanctioner_automata]),
};

export const faction_heretic_astartes: Faction = {
  id: 'heretic_astartes',
  name: 'Heretic Astartes',
  keywords: [],
  description: 'Traitor Space Marines and their cultist followers.',
  units: applyAbilities([
    ha_chaos_lord, ha_dark_apostle, ha_chaos_sorcerer, ha_warpsmith,
    ha_chaos_cultist, ha_chaos_space_marine, ha_possessed, ha_chaos_terminator, ha_helbrute,
    // Death Guard warband variant
    ha_poxwalker, ha_foetid_blight_drone,
    // Emperor's Children warband variant
    ha_lord_kakophonist,
    // Renegade Space Marines warband variant
    ha_renegade_apothecary,
    // Thousand Sons warband variant
    ha_exalted_sorcerer, ha_tzaangor_shaman, ha_tzaangor, ha_sekhetar_robot,
    // World Eaters warband variant
    ha_master_of_executions, ha_slaughterbound,
  ]),
};

export const faction_chaos_cult: Faction = {
  id: 'chaos_cult',
  name: 'Chaos Cult',
  keywords: [],
  description: 'Fanatical worshippers of the Chaos Gods.',
  units: applyAbilities([cc_cult_demagogue, cc_heretic_witch, cc_chaos_disciple, cc_daemon_prince, cc_cult_rabble, cc_chaos_devotee, cc_chaos_ogryn, cc_chaos_spawn]),
};

export const faction_chaos_daemons: Faction = {
  id: 'chaos_daemons',
  name: 'Chaos Daemons',
  keywords: [],
  description: 'Manifestations of the Ruinous Powers from the immaterium.',
  units: applyAbilities([cd_daemon_prince, cd_chaos_furie, cd_bloodmaster, cd_skullmaster, cd_bloodletter, cd_flesh_hound, cd_infernal_enrapturess, cd_tranceweaver, cd_daemonette, cd_seeker, cd_contorted_epitome, cd_poxbringer, cd_spoilpox_scrivener, cd_plaguebearer, cd_nurgling_swarm, cd_plague_drone_rider, cd_changecaster, cd_flamer, cd_blue_horror, cd_pink_horror, cd_screamer]),
};

export const faction_the_vermintide: Faction = {
  id: 'the_vermintide',
  name: 'The Vermintide',
  keywords: [],
  description: 'Scheming Skaven ratmen surging from the tunnels beneath the trenches.',
  units: applyAbilities([ver_clawlord, ver_deathmaster, ver_warlock, ver_skavenslave, ver_clanrat, ver_stormvermin, ver_weapons_team, ver_rat_ogryn, ver_doom_flayer]),
};

export const faction_orks: Faction = {
  id: 'orks',
  name: 'Orks',
  keywords: [],
  description: 'The savage Greenskin tide, living for warfare.',
  units: applyAbilities([or_warboss, or_big_mek, or_weirdboy, or_gretchin, or_boy, or_nob, or_squig, or_deff_dread, or_squighog_boy]),
};

export const faction_drukhari: Faction = {
  id: 'drukhari',
  name: 'Drukhari',
  keywords: [],
  description: 'The Dark Eldar raiders of Commorragh.',
  units: applyAbilities([dr_archon, dr_haemonculus, dr_succubus, dr_kabalite_warrior, dr_incubus, dr_wrack, dr_wych, dr_reaver, dr_cronos, dr_talos, dr_clawed_fiend, dr_khymera, dr_razorwing_flock]),
};

export const faction_tyranids: Faction = {
  id: 'tyranids',
  name: 'Tyranids',
  keywords: [],
  description: 'The Tyranid swarm, a galaxy-devouring force of pure biological horror.',
  units: applyAbilities([ty_hive_tyrant, ty_lictor, ty_tyrant_guard, ty_gaunt_barbgaunt, ty_gaunt_gargoyle, ty_gaunt_hormagaunt, ty_gaunt_neurogaunt, ty_gaunt_termagant, ty_tyranid_warrior, ty_ravener, ty_ripper_swarm, ty_zoanthrope, ty_spore_mine]),
};

export const faction_genestealer_cults: Faction = {
  id: 'genestealer_cults',
  name: 'Genestealer Cults',
  keywords: [],
  description: 'The hidden fifth column of the Tyranid advance.',
  units: applyAbilities([gc_primus, gc_patriarch, gc_clamavus, gc_magus, gc_nexos, gc_neophyte, gc_acolyte, gc_genestealer_troop, gc_aberrant, gc_abominant]),
};

export const faction_harlequins: Faction = {
  id: 'harlequins',
  name: 'Harlequins',
  keywords: [],
  description: 'The mercurial warriors of the Laughing God.',
  units: applyAbilities([hq_troupe_master, hq_death_jester, hq_shadowseer, hq_solitaire, hq_mime, hq_player, hq_skyweaver]),
};

export const faction_leagues_of_votann: Faction = {
  id: 'leagues_of_votann',
  name: 'Leagues of Votann',
  keywords: [],
  description: 'The Kin of the Leagues of Votann, stocky industrious warriors.',
  units: applyAbilities([lv_kahl, lv_brokhyr_iron_master, lv_grimnyr, lv_hearthkyn, lv_cthonian_beserk, lv_einhyr_hearthguard, lv_brokhyr_thunderkyn, lv_ironkin_steeljack, lv_hernkyn_pioneer]),
};

export const faction_slanni: Faction = {
  id: 'slanni',
  name: 'Slanni',
  keywords: [],
  description: 'Cold-blooded warriors of the Old Ones\' ancient plan.',
  units: applyAbilities([sl_mage_chief, sl_oldblood, sl_starpriest, sl_skirmisher, sl_brave, sl_battle_mage, sl_brute, sl_amphi_walker]),
};

export const faction_necrons: Faction = {
  id: 'necrons',
  name: 'Necrons',
  keywords: [],
  description: 'The undying machine warriors of the Necrons, returning from aeons of slumber.',
  units: applyAbilities([nec_necron_lord, nec_cryptek, nec_royal_warden, nec_warrior, nec_immortal, nec_scarab_swarm, nec_tomb_blade, nec_lokhust_lord, nec_skorpekh_lord, nec_hexmark_destroyer, nec_lokhust_destroyer, nec_ophydian_destroyer, nec_skorpekh_destroyer, nec_canoptek_spyder, nec_apprentek, nec_macrocyte_warrior, nec_flayer_king]),
};

export const faction_aeldari: Faction = {
  id: 'aeldari',
  name: 'Aeldari',
  keywords: [],
  description: 'The ancient Craftworld Eldar, fighting to preserve their dying race.',
  units: applyAbilities([ael_autarch, ael_seer, ael_warlock, ael_guardian, ael_aspect_warrior, ael_windrider, ael_wraith, ael_dragonlord, ael_dragon_knight, ael_wraithseer, ael_wraithlord]),
};

export const faction_t_au_empire: Faction = {
  id: 't_au_empire',
  name: 'T\'au Empire',
  keywords: [],
  description: 'The T\'au and their auxiliaries, united under the Greater Good.',
  units: applyAbilities([tau_ethereal, tau_commander, tau_cadre_fireblade, tau_kroot_shaper, tau_fire_warrior, tau_drone, tau_kroot_carnivore, tau_stealth_battlesuit, tau_crisis_battlesuit, tau_broadside_battlesuit, tau_kill_broker, tau_krootox_rider]),
};

export const faction_necromunda_gang: Faction = {
  id: 'necromunda_gang',
  name: 'Necromunda Gang',
  keywords: [],
  description: 'The underhive gangs of Necromunda, fighting for territory and survival.',
  units: applyAbilities([ng_gang_leader, ng_gang_champion, ng_juve, ng_ganger, ng_cyber_mastiff, ng_sanctioner_automata]),
};

export const faction_pirate_crew: Faction = {
  id: 'pirate_crew',
  name: 'Pirate Crew',
  keywords: [],
  description: 'Voidborn pirates raiding the spaceways and port-worlds.',
  units: applyAbilities([pc_pirate_captain, pc_first_mate, pc_pirate_champion, pc_pirate, pc_pirate_veteran]),
};

export const allFactions: Faction[] = [
  faction_adeptus_astartes,
  faction_astra_militarum,
  faction_adeptus_custodes,
  faction_adepta_sororitas,
  faction_adeptus_mechanicus,
  faction_adeptus_ministorum,
  faction_officio_assassinorum,
  faction_rogue_trader,
  faction_the_inquisition,
  faction_grey_knights,
  faction_adeptus_arbites,
  faction_heretic_astartes,
  faction_chaos_cult,
  faction_chaos_daemons,
  faction_the_vermintide,
  faction_orks,
  faction_drukhari,
  faction_tyranids,
  faction_genestealer_cults,
  faction_harlequins,
  faction_leagues_of_votann,
  faction_slanni,
  faction_necrons,
  faction_aeldari,
  faction_t_au_empire,
  faction_necromunda_gang,
  faction_pirate_crew,
];

export function getFactionById(id: string): Faction | undefined {
  return allFactions.find(f => f.id === id);
}

export function getUnitsByFaction(factionId: string): UnitOption[] {
  const faction = getFactionById(factionId);
  return faction ? faction.units : [];
}
