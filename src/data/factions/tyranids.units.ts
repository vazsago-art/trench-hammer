import { UnitOption } from '../../types/index.js';

// ==========================================================================
// TYRANIDS
// ==========================================================================
export const ty_hive_tyrant: UnitOption = {
  id: 'ty_hive_tyrant', name: 'Hive Tyrant', baseCost: 175, minCount: 1, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'LARGE', 'LEADER', 'PSYKER 1', 'STRONG', 'SYNAPSE', 'TOUGH', 'TYRANID'],
  baseSize: '60mm',
  faction: 'tyranids', unitType: 'elite',
  description: 'Mandatory Hive Tyrant. (+10cr for FLYING)',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'ty_hive_tyrant_winged', name: 'Winged', cost: 10, maxCount: 1,
      grantedKeywords: ['FLYING'],
      description: 'Grants 8" movement and FLYING.' },
  ],
};
export const ty_lictor: UnitOption = {
  id: 'ty_lictor', name: 'Lictor', baseCost: 125, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['FEAR', 'LARGE', 'INFILTRATOR', 'STEALTH', 'TOUGH', 'TYRANID'],
  baseSize: '50mm',
  faction: 'tyranids', unitType: 'elite',
  description: 'Terrifying hunter-killer bioform.',
  defaultWargear: [], availableWargear: [],
};
export const ty_tyrant_guard: UnitOption = {
  id: 'ty_tyrant_guard', name: 'Tyrant Guard', baseCost: 130, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'STRONG', 'TOUGH', 'TYRANID'],
  baseSize: '50mm',
  faction: 'tyranids', unitType: 'elite',
  description: 'Bodyguard bioform for the Hive Tyrant.',
  defaultWargear: [], availableWargear: [],
};
export const ty_gaunt_barbgaunt: UnitOption = {
  id: 'ty_gaunt_barbgaunt', name: 'Barbgaunt', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['NO PROMOTION', 'TYRANID'],
  baseSize: '40mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Artillery biomorph gaunt strain.',
  defaultWargear: [], availableWargear: [],
};
export const ty_gaunt_gargoyle: UnitOption = {
  id: 'ty_gaunt_gargoyle', name: 'Gargoyle', baseCost: 40, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FLYING', 'NO PROMOTION', 'TYRANID'],
  baseSize: '25-28mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Flying gaunt biomorph.',
  defaultWargear: [], availableWargear: [],
};
export const ty_gaunt_hormagaunt: UnitOption = {
  id: 'ty_gaunt_hormagaunt', name: 'Hormagaunt', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['NO PROMOTION', 'TYRANID'],
  baseSize: '25-28mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Fast close-combat gaunt biomorph.',
  defaultWargear: [], availableWargear: [],
};
export const ty_gaunt_neurogaunt: UnitOption = {
  id: 'ty_gaunt_neurogaunt', name: 'Neurogaunt', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['NO PROMOTION', 'TYRANID'],
  baseSize: '25-28mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Synapse-linked gaunt biomorph.',
  defaultWargear: [], availableWargear: [],
};
export const ty_gaunt_termagant: UnitOption = {
  id: 'ty_gaunt_termagant', name: 'Termagant', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['NO PROMOTION', 'SKIRMISHER', 'TYRANID'],
  baseSize: '25-28mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Standard ranged gaunt biomorph.',
  defaultWargear: [], availableWargear: [],
};
export const ty_tyranid_warrior: UnitOption = {
  id: 'ty_tyranid_warrior', name: 'Tyranid Warrior', baseCost: 95, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['LARGE', 'STRONG', 'SYNAPSE', 'TOUGH', 'TYRANID'],
  baseSize: '40-50mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Synapse creature / elite biomorph.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'ty_warrior_winged', name: 'Winged', cost: 15, maxCount: 1,
      grantedKeywords: ['FLYING'],
      description: 'Grants 8" movement and FLYING.' },
  ],
};
export const ty_ravener: UnitOption = {
  id: 'ty_ravener', name: 'Ravener', baseCost: 105, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['BURROW', 'DEEP STRIKE (TUNNEL)', 'LARGE', 'TOUGH', 'TYRANID'],
  baseSize: '40mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Fast burrowing Tyranid predator. (DEEP STRIKE Ã¢â‚¬â€œ TUNNEL)',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'ty_ravener_wrecker', name: 'Wrecker', cost: 5, maxCount: 1,
      description: 'Ignores the HEAVY Keyword of melee weapons.' },
  ],
};
export const ty_ripper_swarm: UnitOption = {
  id: 'ty_ripper_swarm', name: 'Ripper Swarm', baseCost: 75, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BURROW', 'DEEP STRIKE (TUNNEL)', 'FEAR', 'LARGE', 'NO PROMOTION', 'SWARM', 'TOUGH', 'TYRANID'],
  baseSize: '40mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Devouring swarm of tiny bioforms. (DEEP STRIKE Ã¢â‚¬â€œ TUNNEL)',
  defaultWargear: [
    { id: 'ty_spinemaws', name: 'Spinemaws', type: 'ranged', range: 8, cost: 0, handedness: 'no-hands',
      keywords: ['AUTOMATIC 2', 'ASSAULT'],
      description: 'Volleys of organic bio-spines. No hand slots required.' },
    { id: 'ty_swarming_claws', name: 'Swarming Claws', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: [],
      description: 'Hits all models in base contact simultaneously. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const ty_zoanthrope: UnitOption = {
  id: 'ty_zoanthrope', name: 'Zoanthrope', baseCost: 80, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['FLYING', 'LARGE', 'PSYKER 1', 'SYNAPSE', 'TYRANID'],
  baseSize: '40mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Psychic synapse creature. Ranged Skill: N/A (uses psychic powers only).',
  defaultWargear: [], availableWargear: [],
};
export const ty_spore_mine: UnitOption = {
  id: 'ty_spore_mine', name: 'Spore Mine', baseCost: 25, minCount: 0, maxCount: 5,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'FLYING', 'NO PROMOTION', 'TYRANID'],
  baseSize: '25mm',
  faction: 'tyranids', unitType: 'troop',
  description: 'Drifting bio-explosive.',
  defaultWargear: [
    { id: 'ty_spore_burst', name: 'Spore Burst', type: 'ranged', range: 3, cost: 0, handedness: 'no-hands',
      keywords: ['BLAST 3"', 'GAS', 'IGNORE ARMOUR'],
      description: 'Self-destructs when an enemy comes within 3". One-use only. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};
