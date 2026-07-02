import { UnitOption } from '../../types/index.js';

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
  keywords: ['ARTIFICIAL', 'NEGATE GAS', 'NO PROMOTION'],
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
