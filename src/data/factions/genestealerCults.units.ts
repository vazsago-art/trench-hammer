import { UnitOption } from '../../types/index.js';

// ==========================================================================
// GENESTEALER CULTS
// ==========================================================================
export const gc_primus: UnitOption = {
  id: 'gc_primus', name: 'Primus', baseCost: 55, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'GENESTEALER CULTS', 'LEADER', 'TOUGH'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Mandatory hybrid leader of the brood.',
  defaultWargear: [], availableWargear: [],
};
export const gc_clamavus: UnitOption = {
  id: 'gc_clamavus', name: 'Clamavus', baseCost: 65, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'GENESTEALER CULTS'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Broadcaster spreading the cult\'s insidious message.',
  defaultWargear: [], availableWargear: [],
};
export const gc_magus: UnitOption = {
  id: 'gc_magus', name: 'Magus', baseCost: 40, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'GENESTEALER CULTS', 'PSYKER 1'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Hybrid psyker. (+ powers)',
  defaultWargear: [], availableWargear: [],
};
export const gc_nexos: UnitOption = {
  id: 'gc_nexos', name: 'Nexos', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'GENESTEALER CULTS', 'STEALTH'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Tactical genius of the uprising.',
  defaultWargear: [], availableWargear: [],
};
export const gc_neophyte: UnitOption = {
  id: 'gc_neophyte', name: 'Neophyte', baseCost: 30, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GENESTEALER CULTS'],
  baseSize: '25-28mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Later-generation human-hybrid cultist.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'gc_neophyte_miner', name: 'Neophyte Miner', cost: 5, maxCount: 2,
      description: 'Ignores the HEAVY Keyword of a single weapon they carry.' },
  ],
};
export const gc_acolyte: UnitOption = {
  id: 'gc_acolyte', name: 'Acolyte', baseCost: 50, minCount: 0, maxCount: 6,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GENESTEALER CULTS', 'SKIRMISHER', 'STEALTH'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Close-combat hybrid fighter.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'gc_metamorph', name: 'Metamorph', cost: 10, maxCount: 99,
      description: 'Gains Metamorph Talon: Melee, CLEAVE 2, HELD. Up to half of your Acolytes (rounded up) can be Metamorphs.' },
    { id: 'gc_acolyte_miner', name: 'Acolyte Miner', cost: 10, maxCount: 2,
      grantedKeywords: ['STRONG'],
      description: 'Gains the STRONG Keyword.' },
  ],
};
export const gc_aberrant: UnitOption = {
  id: 'gc_aberrant', name: 'Aberrant', baseCost: 45, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GENESTEALER CULTS', 'LIMITED POTENTIAL', 'STRONG'],
  baseSize: '32mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Musclebound hybrid brute. Must equip a Heavy Power Weapon, Thunder Hammer, or Two-Handed Hammer (+weapon cost). Cannot equip other items.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'gc_hypermorph', name: 'Hypermorph', cost: 10, maxCount: 1,
      description: 'Up to one Aberrant can be a Hypermorph. Gains Hypermorph Tail: Melee, ASSAULT, WHIP 3", takes no hands, can be used in addition to other weapons with no off-hand penalties.' },
  ],
};
export const gc_abominant: UnitOption = {
  id: 'gc_abominant', name: 'Abominant', baseCost: 100, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 3, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['GENESTEALER CULTS', 'FEAR', 'LARGE', 'NO PROMOTION', 'REGENERATE 1', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Alpha mutant leading Aberrant packs. Includes Familiar weapon. Must equip Heavy Power Weapon or Thunder Hammer (+weapon cost).',
  defaultWargear: [
    { id: 'gc_familiar', name: 'Familiar', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['-1 INJURY DICE', 'CLEAVE 2'],
      description: 'Included in cost. Melee, -1 INJURY DICE, CLEAVE 2, takes no hands, can be used in addition to any other weapons when taking the Fight Action, with no off-hand penalties.' } as unknown as import('../../types/index.js').Weapon,
  ], availableWargear: [],
};

// -- Genestealer Cults Warband Variant: Broodcoven --
export const gc_patriarch: UnitOption = {
  id: 'gc_patriarch', name: 'Patriarch', baseCost: 160, minCount: 1, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'GENESTEALER CULTS', 'LARGE', 'LEADER', 'PSYKER 2', 'STRONG', 'TOUGH'],
  baseSize: '50mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Broodcoven only Ã¢â‚¬â€ mandatory Warband leader. (160cr + cost of psychic powers; includes heavy carapace; ranged N/A)',
  defaultWargear: [
    { id: 'gc_patriarch_claws', name: 'Patriarch Claws Ãƒâ€”2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['VICIOUS 10', '+1 INJURY DICE', 'CRITICAL', 'IGNORE OFF-HAND'],
      description: 'Two Patriarch Claws included in cost. IGNORE OFF-HAND when fighting with both claws. Cannot equip Headgear, Medicae Kit, Grapnel Launcher, or hand-occupying equipment.' },
    { id: 'gc_heavy_carapace', name: 'Heavy Carapace', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'],
      description: 'Included in cost. Grants -2 Armour Save.',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const gc_genestealer_troop: UnitOption = {
  id: 'gc_genestealer_troop', name: 'Genestealer', baseCost: 75, minCount: 0, maxCount: 5,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['FEAR', 'GENESTEALER CULTS', 'INFILTRATOR', 'LARGE', 'STEALTH', 'STRONG'],
  baseSize: '25-28mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Broodcoven only (Purestrain). Recruited as normal Troop for 75 credits. Max 5.',
  defaultWargear: [
    { id: 'gc_rending_claws', name: 'Rending Claws Ãƒâ€”4', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE', 'CRITICAL', 'IGNORE ARMOUR', 'IGNORE OFF-HAND'],
      description: 'Four scything claws. No hand slots required. IGNORE OFF-HAND when attacking with multiple claws.' },
  ], availableWargear: [],
  cannotEquip: true,
};

// -- Genestealer Cults Warband Variant: Malstrain --
export const gc_coalesce: UnitOption = {
  id: 'gc_coalesce', name: 'Coalesce', baseCost: 100, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'FLYING', 'GENESTEALER CULTS', 'LARGE', 'PSYKER 2', 'TOUGH'],
  baseSize: '40mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Malstrain only Ã¢â‚¬â€ psychic leader option. (100cr + cost of powers; includes light carapace; ranged N/A; movement 6"/Flying). Can equip Wild Mutations and Psychic Familiar. Must purchase 2-5 powers from Broodmind and/or Tyranids discipline.',
  defaultWargear: [
    { id: 'gc_feeder_tendrils', name: 'Feeder Tendrils', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CLEAVE 2'],
      description: 'Included in cost.' },
    { id: 'gc_light_carapace', name: 'Light Carapace', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-1 INJURY MODIFIER'],
      description: 'Included in cost. Grants -1 Armour Save.',
      statModifiers: { armourSave: -1 } },
  ], availableWargear: [],
};

export const gc_malstrain_alpha: UnitOption = {
  id: 'gc_malstrain_alpha', name: 'Malstrain Alpha', baseCost: 130, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'GENESTEALER CULTS', 'LARGE', 'LEADER', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'genestealer_cults', unitType: 'elite',
  description: 'Malstrain only Ã¢â‚¬â€ melee leader option. (130cr; includes heavy carapace; ranged N/A). Can equip Wild Mutations. Ability: Vanguard Predator (+1 DICE to Dash, auto-succeed Climb).',
  defaultWargear: [
    { id: 'gc_alpha_claw_l', name: 'Alpha Claw (Left)', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['+1 INJURY DICE', 'CRITICAL'],
      description: 'Included in cost.' },
    { id: 'gc_alpha_claw_r', name: 'Alpha Claw (Right)', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['+1 INJURY DICE', 'CRITICAL'],
      description: 'Included in cost.' },
    { id: 'gc_heavy_carapace_alpha', name: 'Heavy Carapace', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'],
      description: 'Included in cost. Grants -2 Armour Save.',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};

export const gc_malstrain_tyramite: UnitOption = {
  id: 'gc_malstrain_tyramite', name: 'Malstrain Tyramite', baseCost: 60, minCount: 0, maxCount: 4,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FLYING', 'GENESTEALER CULTS'],
  baseSize: '25-28mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Malstrain only Ã¢â‚¬â€ agile tunnel creatures. Can equip Wild Mutations. Ability: Dodge (-1 DICE to Hit against this model).',
  defaultWargear: [
    { id: 'gc_stinger', name: 'Stinger', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['GAS', 'ARMOUR PIERCING 1'],
      description: 'Included in cost.' },
  ], availableWargear: [],
};

export const gc_malstrain_genestealer: UnitOption = {
  id: 'gc_malstrain_genestealer', name: 'Malstrain Genestealer', baseCost: 75, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['FEAR', 'GENESTEALER CULTS', 'LARGE', 'STRONG'],
  baseSize: '25-28mm',
  faction: 'genestealer_cults', unitType: 'troop',
  description: 'Malstrain only Ã¢â‚¬â€ unlimited Genestealers as Troops (75cr each). Lose INFILTRATOR, gain FEAR and LARGE. Can equip Wild Mutations. Up to 2 can be given ELITE keyword.',
  defaultWargear: [
    { id: 'gc_rending_claws_malstrain', name: 'Rending Claws Ãƒâ€”4', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE', 'CRITICAL', 'IGNORE ARMOUR', 'IGNORE OFF-HAND'],
      description: 'Four scything claws. No hand slots required. IGNORE OFF-HAND when attacking with multiple claws.' },
  ], availableWargear: [],
  cannotEquip: true,
};
