import { UnitOption } from '../../types/index.js';

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
    { id: 'ael_ranger', name: 'Ranger', cost: 15, maxCount: 99,
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
  id: 'ael_wraithseer', name: 'Wraithseer', baseCost: 155, minCount: 0, maxCount: 1,
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
