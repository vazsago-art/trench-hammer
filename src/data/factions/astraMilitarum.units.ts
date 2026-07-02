import { UnitOption } from '../../types/index.js';

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
  id: 'am_conscript', name: 'Conscript', baseCost: 16, minCount: 0, maxCount: 99,
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
