import { UnitOption } from '../../types/index.js';

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
      description: 'The Third Eye opens to blast the target\'s mind. RISKY - take a Risky Success Roll when fired.' },
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
