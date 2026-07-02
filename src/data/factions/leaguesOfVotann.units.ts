import { UnitOption } from '../../types/index.js';

// ==========================================================================
// LEAGUES OF VOTANN
// ==========================================================================
const LV_PA = { id: 'power_armour', name: 'Power Armour', type: 'armor' as const, slot: 'body-armour' as const, cost: 0,
  keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).', statModifiers: { armourSave: -2 } };
const LV_HAP = { id: 'heavy_armour_plating', name: 'Heavy Armour Plating', type: 'armor' as const, slot: 'body-armour' as const, cost: 0, 
      keywords: ['-2 INJURY MODIFIER'],  description: 'Heavy Armour Plating (included in unit cost).' , statModifiers: { armourSave: -2 } }
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
  description: 'Elite veteran Kin warrior. (45cr + 40cr armour) Heavily Armoured: first -1 of Armour has IMPERVIOUS.',
  defaultWargear: [LV_PA], availableWargear: [],
};
export const lv_brokhyr_thunderkyn: UnitOption = {
  id: 'lv_brokhyr_thunderkyn', name: 'Brôkhyr Thunderkyn', baseCost: 85, minCount: 0, maxCount: 2,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['LARGE', 'VEHICLE', 'VOTANN'],
  baseSize: '40mm',
  faction: 'leagues_of_votann', unitType: 'troop',
  description: 'Heavy weapons platform. (45cr + 40cr armour; 0-3 at 1200cr+) Heavily Armoured: first -1 of Armour has IMPERVIOUS.',
  defaultWargear: [LV_PA], availableWargear: [],
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
  defaultWargear: [LV_HAP], availableWargear: [],
};
