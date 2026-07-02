import { UnitOption } from '../../types/index.js';

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
  keywords: ['ANATHEMA', 'ASSASSINORUM', 'ELITE', 'FEAR', 'DEEP STRIKE', 'LEADER', 'STEALTH', 'TOUGH'],
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
