import { UnitOption } from '../../types/index.js';

// ==========================================================================
// ADEPTUS MECHANICUS
// ==========================================================================
export const amec_dominus: UnitOption = {
  id: 'amec_dominus', name: 'Dominus', baseCost: 65, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CONTROLLER', 'ELITE', 'LARGE', 'LEADER', 'MECHANICUS', 'TOUGH'],
  baseSize: '50mm',
  faction: 'adeptus_mechanicus', unitType: 'elite',
  description: 'Mandatory Magos Dominus leading the war congregation.',
  defaultWargear: [], availableWargear: [],
};
export const amec_skitarii_marshal: UnitOption = {
  id: 'amec_skitarii_marshal', name: 'Skitarii Marshal', baseCost: 45, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'MECHANICUS'],
  baseSize: '32mm',
  faction: 'adeptus_mechanicus', unitType: 'elite',
  description: 'Veteran commander of Skitarii cohorts.',
  defaultWargear: [], availableWargear: [],
};
export const amec_tech_priest: UnitOption = {
  id: 'amec_tech_priest', name: 'Tech-Priest', baseCost: 60, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CONTROLLER', 'ELITE', 'MECHANICUS'],
  baseSize: '32mm',
  faction: 'adeptus_mechanicus', unitType: 'elite',
  description: 'Servant of the Omnissiah.',
  defaultWargear: [], availableWargear: [],
};
export const amec_skitarii: UnitOption = {
  id: 'amec_skitarii', name: 'Skitarii', baseCost: 40, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MECHANICUS'],
  baseSize: '25-28mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Cybernetically enhanced warrior of Mars.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'amec_pteraxii', name: 'Pteraxii', cost: 5, maxCount: 2, maxCountLarge: 3,
      grantedKeywords: ['SKIRMISHER'],
      description: 'Can be equipped with Jump Packs (purchased separately). Gains SKIRMISHER while equipped with a Jump Pack.' },
    { id: 'amec_ranger', name: 'Ranger', cost: 5, maxCount: 2, maxCountLarge: 3,
      grantedKeywords: ['INFILTRATOR'],
      description: 'Gains the INFILTRATOR Keyword.' },
    { id: 'amec_vanguard', name: 'Vanguard', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Gains Rad-Saturation: when an enemy Activates within 1" of it, that enemy suffers a BLOOD MARKER (immune if NEGATE GAS).' },
  ],
};
export const amec_servitor: UnitOption = {
  id: 'amec_servitor', name: 'Servitor', baseCost: 60, minCount: 0, maxCount: 4,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'MECHANICUS', 'NEGATE FEAR', 'NO PROMOTION', 'STRONG'],
  baseSize: '25mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Lobotomised human-machine hybrid worker.',
  defaultWargear: [], availableWargear: [],
};
export const amec_electro_priest: UnitOption = {
  id: 'amec_electro_priest', name: 'Electro-Priest', baseCost: 55, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MECHANICUS'],
  baseSize: '32mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Fanatical devotee channelling holy voltaic power.',
  defaultWargear: [], availableWargear: [],
};
export const amec_sicarian: UnitOption = {
  id: 'amec_sicarian', name: 'Sicarian', baseCost: 65, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MECHANICUS', 'STEALTH'],
  baseSize: '32mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Agile infiltrator with augmented combat reflexes.',
  defaultWargear: [], availableWargear: [],
  unitSubTypes: [
    { id: 'infiltrator', name: 'Infiltrator', creditCostModifier: 0,
      grantedKeywords: ['FEAR', 'INFILTRATOR'],
      description: 'The Sicarian gains the FEAR and INFILTRATOR Keywords.' },
    { id: 'ruststalker', name: 'Ruststalker', creditCostModifier: 0,
      description: 'The Sicarian gains +1 DICE to Dash actions, and has a Chordclaw in addition to its other weapons. The Chordclaw is a Melee weapon that takes no hands and can be used to make an extra attack when the Sicarian takes the Fight Action.' },
  ],
};
export const amec_kataphron: UnitOption = {
  id: 'amec_kataphron', name: 'Kataphron', baseCost: 90, minCount: 0, maxCount: 1, maxCountLarge: 2,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'LARGE', 'MECHANICUS', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Heavy Kataphron Breacher or Destroyer (0-2 at 1200cr+).',
  defaultWargear: [], availableWargear: [],
};
export const amec_kastelan_robot: UnitOption = {
  id: 'amec_kastelan_robot', name: 'Kastelan Robot', baseCost: 190, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'FEAR', 'LARGE', 'MECHANICUS', 'NEGATE GAS', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'adeptus_mechanicus', unitType: 'troop',
  description: 'Ancient automaton of immense destructive power.',
  defaultWargear: [
    { id: 'amec_kastelan_fists', name: 'Kastelan Fists', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
      description: 'Counts as Two-Handed Hammers. Built-in chassis weapons.' },
    { id: 'amec_incendine_combustor', name: 'Incendine Combustor', type: 'ranged', range: 8, cost: 0, handedness: 'no-hands',
      keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE'],
      description: 'Integrated flamethrower. Does not count towards normal LIMIT.' },
  ], availableWargear: [],
};
