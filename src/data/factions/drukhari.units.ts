import { UnitOption } from '../../types/index.js';

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
  stats: { movement: 7, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'DRUKHARI', 'FLYING', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'drukhari', unitType: 'troop',
  description: 'Haemonculus spirit-engine. Gains Pain tokens for friendly models within 9" going Down. +1 Ranged.',
  defaultWargear: [], availableWargear: [],
};
export const dr_talos: UnitOption = {
  id: 'dr_talos', name: 'Talos', baseCost: 150, minCount: 0, maxCount: 1,
  stats: { movement: 7, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
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
  id: 'dr_khymera', name: 'Khymera', baseCost: 90, minCount: 0, maxCount: 2,
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
