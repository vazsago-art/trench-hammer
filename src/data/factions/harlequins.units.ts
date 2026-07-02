import { UnitOption } from '../../types/index.js';

// ==========================================================================
// HARLEQUINS
// ==========================================================================
export const hq_troupe_master: UnitOption = {
  id: 'hq_troupe_master', name: 'Troupe Master', baseCost: 110, minCount: 1, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'HARLIQUIN', 'LEADER', 'TOUGH'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'elite',
  description: 'Mandatory master of the masque. (95cr + 15cr battlekit)',
  defaultWargear: [
    { id: 'hq_holo_suit_tm', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Included in cost.' },
    { id: 'hq_flip_belt_tm', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'hq_tm_darknesses_bite',   name: "Darkness' Bite",   cost: 10, maxCount: 1,
      description: 'When the Troupe Master takes the Fight Action, it can make one additional attack with one of its weapons.' },
    { id: 'hq_tm_prince_of_light',   name: 'Prince of Light',  cost: 10, maxCount: 1,
      description: 'The Troupe Master and all friendly HARLEQUIN models within 6" of it can declare a Charge against an enemy they cannot see.' },
    { id: 'hq_tm_twilights_grasp',   name: "Twilight's Grasp", cost: 15, maxCount: 1,
      description: "At the end of each of its Activations, each enemy model in close combat with the Troupe Master suffers 1 BLOOD MARKER." },
  ],
};
export const hq_death_jester: UnitOption = {
  id: 'hq_death_jester', name: 'Death Jester', baseCost: 105, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'HARLIQUIN'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'elite',
  description: 'Morose comedian of death. (90cr + 15cr battlekit)',
  defaultWargear: [
    { id: 'hq_holo_suit_dj', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Included in cost.' },
    { id: 'hq_flip_belt_dj', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'hq_dj_harvester_of_torment', name: 'Harvester of Torment',  cost: 20, maxCount: 1,
      description: 'When the Death Jester makes a non-BLAST ranged attack that hits, it can make one additional identical non-BLAST ranged attack against any enemy model within 3" of the original target.' },
    { id: 'hq_dj_humbling_cruelty',    name: 'Humbling Cruelty',      cost: 10, maxCount: 1,
      description: 'If an enemy model is hit by a non-BLAST ranged attack made by the Death Jester, that model is Shaken until the end of its next Activation.' },
    { id: 'hq_dj_jest_inescapable',    name: 'The Jest Inescapable',  cost: 10, maxCount: 1,
      description: 'All non-BLAST ranged attacks made by the Death Jester have +12" range.' },
  ],
};
export const hq_shadowseer: UnitOption = {
  id: 'hq_shadowseer', name: 'Shadowseer', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'HARLIQUIN', 'PSYKER 2'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'elite',
  description: 'Harlequin psyker. (95cr + 15cr battlekit + powers)',
  defaultWargear: [
    { id: 'hq_holo_suit_ss', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Included in cost.' },
    { id: 'hq_flip_belt_ss', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'hq_ss_agent_of_bedlam',  name: 'Agent of Bedlam',   cost: 10, maxCount: 1,
      description: 'Enemy models within 6" of the Shadowseer have -1 DICE to all non-attack Success Rolls.' },
    { id: 'hq_ss_gloomwake',        name: 'Gloomwake',          cost: 15, maxCount: 1,
      description: 'The Shadowseer and all friendly HARLEQUIN models within 6" of it gain the STEALTH keyword.' },
    { id: 'hq_ss_veil_of_illusion', name: 'Veil of Illusion',  cost: 15, maxCount: 1,
      description: 'Enemy models within 6" of the Shadowseer have -1 INJURY DICE with all attacks.' },
  ],
};
export const hq_solitaire: UnitOption = {
  id: 'hq_solitaire', name: 'Solitaire', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 10, rangedSkill: 0, meleeSkill: 3, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'HARLIQUIN', 'STEALTH', 'TOUGH'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'elite',
  description: 'Lone dancer walking the path of Slaanesh. (100cr + 15cr battlekit)',
  defaultWargear: [
    { id: 'hq_holo_suit_sol', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Included in cost.' },
    { id: 'hq_flip_belt_sol', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'hq_sol_chromatic_rush',       name: 'Chromatic Rush',        cost: 10, maxCount: 1,
      description: 'When the Solitaire declares a Charge, it can charge up to 16". Roll 2D6 and take the highest result.' },
    { id: 'hq_sol_shocking_emergence',   name: 'Shocking Emergence',    cost: 10, maxCount: 1, grantedKeywords: ['DEEP STRIKE'],
      description: 'The Solitaire gains the DEEP STRIKE keyword.' },
    { id: 'hq_sol_unnatural_acrobatics', name: 'Unnatural Acrobatics',  cost: 20, maxCount: 1,
      description: 'All attacks made against the Solitaire have an additional -1 DICE to Hit.' },
  ],
};
export const hq_mime: UnitOption = {
  id: 'hq_mime', name: 'Mime', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['HARLIQUIN', 'INFILTRATOR'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'troop',
  description: 'Harlequin infiltrator. (45cr + 5cr). Max = other HARLIQUIN count.',
  defaultWargear: [
    { id: 'hq_flip_belt_mime', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
};
export const hq_player: UnitOption = {
  id: 'hq_player', name: 'Player', baseCost: 80, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['HARLIQUIN'],
  baseSize: '25-28mm',
  faction: 'harlequins', unitType: 'troop',
  description: 'Harlequin troupe member. (65cr + 15cr battlekit)',
  defaultWargear: [
    { id: 'hq_holo_suit_pl', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Included in cost.' },
    { id: 'hq_flip_belt_pl', name: 'Flip Belt', type: 'equipment', cost: 0, keywords: [],
      description: 'Auto-succeed Climb and Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'hq_pl_acrobat', name: 'Acrobat', cost: 10, maxCount: 99,
      description: 'This model does not trigger free attacks when Retreating, and can leave close combat with a standard move.' },
    { id: 'hq_pl_dancer',  name: 'Dancer',  cost: 5,  maxCount: 99, grantedKeywords: ['SKIRMISHER'],
      description: 'This model gains the SKIRMISHER keyword.' },
    { id: 'hq_pl_mourner', name: 'Mourner', cost: 10, maxCount: 99, grantedKeywords: ['FEAR'],
      description: 'This model gains the FEAR keyword.' },
    { id: 'hq_pl_slayer',  name: 'Slayer',  cost: 5,  maxCount: 99,
      description: 'When this model charges, it has +1 DICE to Hit with all attacks during that activation.' },
  ],
};
export const hq_skyweaver: UnitOption = {
  id: 'hq_skyweaver', name: 'Skyweaver', baseCost: 115, minCount: 0, maxCount: 2,
  stats: { movement: 10, rangedSkill: 1, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['FLYING', 'HARLIQUIN', 'LARGE', 'VEHICLE'],
  baseSize: '60x35mm',
  faction: 'harlequins', unitType: 'troop',
  description: 'Harlequin jetbike rider. (105cr + 10cr battlekit)',
  defaultWargear: [
    { id: 'hq_holo_suit_sw', name: 'Holo Suit', type: 'equipment', cost: 0, keywords: [],
      description: 'All attacks have -1 DICE to Hit against the wearer. Armour -1 already included in stats. Included in cost.' },
  ], availableWargear: [],
};
