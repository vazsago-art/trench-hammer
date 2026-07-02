import { UnitOption } from '../../types/index.js';

// ==========================================================================
// ADEPTUS CUSTODES
// ==========================================================================
export const ac_shield_captain: UnitOption = {
  id: 'ac_shield_captain', name: 'Shield-Captain', baseCost: 175, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['CUSTODES', 'ELITE', 'LARGE', 'LEADER', 'STRONG'],
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
    { id: 'ac_warden', name: 'Custodian Warden', cost: 15, maxCount: 2,
      grantedKeywords: ['NEGATE FEAR'],
      description: 'Gains NEGATE FEAR and Living Fortress: the first -1 of its Armour gains IMPERVIOUS.' },
    { id: 'ac_venatari', name: 'Venatari Custodian', cost: 5, maxCount: 2,
      grantedKeywords: ['SKIRMISHER'],
      description: 'Can use Jump Packs and Tarsis Bucklers. Gains SKIRMISHER while wearing a Jump Pack.' },
  ],
};
export const ac_aquilon_terminator: UnitOption = {
  id: 'ac_aquilon_terminator', name: 'Aquilon Terminator', baseCost: 165, minCount: 0, maxCount: 1,
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
