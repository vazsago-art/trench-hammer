import { UnitOption } from '../../types/index.js';

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
