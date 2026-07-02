import { UnitOption } from '../../types/index.js';

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
  keywords: ['ARTIFICIAL', 'NEGATE GAS', 'NO PROMOTION'],
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
