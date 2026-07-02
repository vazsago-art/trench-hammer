import { UnitOption } from '../../types/index.js';

// ==========================================================================
// NECRONS
// ==========================================================================
export const nec_necron_lord: UnitOption = {
  id: 'nec_necron_lord', name: 'Necron Lord', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'LEADER', 'NECRON', 'NEGATE GAS', 'TOUGH'],
  baseSize: '40mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Necron noble commander (one of Lord/Cryptek must be leader).',
  defaultWargear: [], availableWargear: [],
};
export const nec_cryptek: UnitOption = {
  id: 'nec_cryptek', name: 'Cryptek', baseCost: 105, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'NECRON', 'NEGATE GAS'],
  baseSize: '40-50mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Necron technomancer. (+ staff)',
  unitSubTypes: [
    {
      id: 'nec_cryptek_chronomancer',
      name: 'Chronomancer Discipline',
      description: 'Chronometron: Action + Success +1 DICE (self/ally 6") -> All attacks against target have -1 DICE to Hit until end of Turn. Timesplinter: Action + Success -> Relocate ally 6" to within 6" of Cryptek.',
      creditCostModifier: 0,
    },
    {
      id: 'nec_cryptek_ethermancer',
      name: 'Ethermancer Discipline',
      description: 'Ether Crystal: Action + Success -> Place Storm Marker within 24"; 3" radius counts as Dangerous/Difficult. Lightning Field: Action + Success +1 DICE (self/ally 6") -> Melee attackers suffer STUN MARKERS until end of Turn.',
      creditCostModifier: 0,
    },
    {
      id: 'nec_cryptek_geomancer',
      name: 'Geomancer Discipline',
      description: 'Harp of Dissonance: Action + Success -> Target enemy 6" rolls on Injury table. Seismic Crucible: Action + Success +1 DICE -> All other models within 6" roll Injury (ignore Armour, +1 DICE, STUN instead of BLOOD, OOA -> Down).',
      creditCostModifier: 0,
    },
    {
      id: 'nec_cryptek_plasmancer',
      name: 'Plasmancer Discipline',
      description: 'Harbinger of Destruction: Action + Success -> Self/ally 12" gets +1 DICE Hit/Injure next ranged attack. Living Lightning: Action + Success +1 DICE -> Enemy 8" suffers D3 STUN MARKERS.',
      creditCostModifier: 0,
    },
    {
      id: 'nec_cryptek_psychomancer',
      name: 'Psychomancer Discipline',
      description: 'Harbinger of Despair: Action + Success -> Enemy 24" (not activated) cannot activate until D3 others (or last). Veil of Darkness: Action + Success +1 DICE -> Teleport self to within 8".',
      creditCostModifier: 0,
    },
    {
      id: 'nec_cryptek_technomancer',
      name: 'Technomancer Discipline',
      description: 'Canoptek Repair: Action + Success -> Heal 1 BM (3 on crit) from self/Necron ally 6". Reinforce Metal: Action + Success +1 DICE -> Self/ally 6" takes -1 DICE on incoming Injury rolls until end of Turn.',
      creditCostModifier: 0,
    },
  ],
  defaultWargear: [], availableWargear: [],
};
export const nec_royal_warden: UnitOption = {
  id: 'nec_royal_warden', name: 'Royal Warden', baseCost: 100, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'NECRON', 'NEGATE GAS'],
  baseSize: '32mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Necron officer of the Royal Court.',
  defaultWargear: [], availableWargear: [],
};
export const nec_warrior: UnitOption = {
  id: 'nec_warrior', name: 'Necron Warrior', baseCost: 45, minCount: 0, maxCount: 99,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['NECRON', 'NEGATE GAS', 'NO PROMOTION'],
  baseSize: '32mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Rank-and-file undying Necron soldier.',
  defaultWargear: [], availableWargear: [],
};
export const nec_immortal: UnitOption = {
  id: 'nec_immortal', name: 'Immortal', baseCost: 90, minCount: 0, maxCount: 5,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['NECRON', 'NEGATE GAS'],
  baseSize: '32mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Elite Necron heavy infantry.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'nec_deathmark', name: 'Deathmark', cost: 5, maxCount: 2,
      grantedKeywords: ['INFILTRATOR'],
      description: 'Gains INFILTRATOR and Hyperspace Hunter: ranged attacks have IGNORE COVER. Loses Heavy Gunner.' },
    { id: 'nec_lychguard', name: 'Lychguard', cost: 5, maxCount: 2,
      description: 'Gains Guardian Protocols: can redirect hits from allies within 1" to itself. Loses Heavy Gunner.' },
  ],
};
export const nec_scarab_swarm: UnitOption = {
  id: 'nec_scarab_swarm', name: 'Canoptek Scarab Swarm', baseCost: 70, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'FEAR', 'FLYING', 'LARGE', 'NECRON', 'NEGATE GAS', 'NO PROMOTION', 'SWARM', 'TOUGH'],
  baseSize: '40mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Swarming repair and combat scarabs.',
  defaultWargear: [
    { id: 'nec_feeder_mandibles', name: 'Feeder Mandibles', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['SWEEPING'],
      description: 'SWEEPING Ã¢â‚¬â€ hits all models in base contact simultaneously. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const nec_tomb_blade: UnitOption = {
  id: 'nec_tomb_blade', name: 'Tomb Blade', baseCost: 100, minCount: 0, maxCount: 2,
  stats: { movement: 10, rangedSkill: 1, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['FLYING', 'LARGE', 'LIMITED POTENTIAL', 'NECRON', 'NEGATE GAS', 'SKIRMISHER', 'VEHICLE'],
  baseSize: '32-40mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Fast Necron jetbike.',
  defaultWargear: [], availableWargear: [],
};
export const nec_lokhust_lord: UnitOption = {
  id: 'nec_lokhust_lord', name: 'Lokhust Lord', baseCost: 175, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FLYING', 'LARGE', 'NECRON', 'NEGATE GAS', 'TOUGH'],
  baseSize: '60mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Destroyer Cult variant: mounted lord.',
  defaultWargear: [], availableWargear: [],
};
export const nec_skorpekh_lord: UnitOption = {
  id: 'nec_skorpekh_lord', name: 'Skorpekh Lord', baseCost: 155, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'NECRON', 'NEGATE GAS', 'TOUGH'],
  baseSize: '50mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Destroyer Cult variant: close-combat lord.',
  defaultWargear: [], availableWargear: [],
};
export const nec_hexmark_destroyer: UnitOption = {
  id: 'nec_hexmark_destroyer', name: 'Hexmark Destroyer', baseCost: 160, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'INFILTRATOR', 'NECRON', 'NEGATE GAS', 'TOUGH', 'SIX_ARMS'],
  baseSize: '50mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Destroyer Cult variant: marksman lord. Has six arms, each of which can be equipped with a single one-handed weapon.',
  defaultWargear: [], availableWargear: [],
};
export const nec_lokhust_destroyer: UnitOption = {
  id: 'nec_lokhust_destroyer', name: 'Lokhust Destroyer', baseCost: 115, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['LARGE', 'FLYING', 'NECRON', 'NEGATE GAS'],
  baseSize: '60mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Destroyer Cult variant: flying heavy destroyer.',
  defaultWargear: [], availableWargear: [],
};
export const nec_ophydian_destroyer: UnitOption = {
  id: 'nec_ophydian_destroyer', name: 'Ophydian Destroyer', baseCost: 90, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['BURROW', 'DEEP STRIKE (TUNNEL)', 'LARGE', 'NECRON', 'NEGATE GAS', 'STEALTH'],
  baseSize: '50mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Destroyer Cult variant: burrowing destroyer. (DEEP STRIKE Ã¢â‚¬â€œ TUNNEL)',
  defaultWargear: [], availableWargear: [],
};
export const nec_skorpekh_destroyer: UnitOption = {
  id: 'nec_skorpekh_destroyer', name: 'Skorpekh Destroyer', baseCost: 105, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['LARGE', 'NECRON', 'NEGATE GAS'],
  baseSize: '50mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Destroyer Cult variant: close-combat destroyer.',
  defaultWargear: [], availableWargear: [],
};
export const nec_canoptek_spyder: UnitOption = {
  id: 'nec_canoptek_spyder', name: 'Canoptek Spyder', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'ELITE', 'FLYING', 'LARGE', 'NECRON', 'NEGATE GAS', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Canoptek Court variant: repair spyder.',
  defaultWargear: [
    { id: 'nec_automaton_claws', name: 'Automaton Claws', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'TWO-HANDED'],
      description: 'Powerful manipulator claws built into the Spyder chassis.' },
  ], availableWargear: [],
};
export const nec_apprentek: UnitOption = {
  id: 'nec_apprentek', name: 'Apprentek', baseCost: 95, minCount: 0, maxCount: 3,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['NECRON', 'NEGATE GAS'],
  baseSize: '32mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Canoptek Court variant: lesser technomancer.',
  defaultWargear: [
    { id: 'nec_staff_of_light', name: 'Staff of Light', type: 'melee', cost: 0, isMainHandOnly: true,
      keywords: ['MAIN HAND ONLY', 'HELD'],
      description: 'HELD. Strike: Melee, MAIN HAND ONLY. Solar Lance: 18". Elite Only.' },
  ], availableWargear: [],
};
export const nec_macrocyte_warrior: UnitOption = {
  id: 'nec_macrocyte_warrior', name: 'Macrocyte Warrior', baseCost: 60, minCount: 0, maxCount: 3,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 0, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'FLYING', 'NECRON', 'NEGATE GAS', 'NO PROMOTION'],
  baseSize: '32mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Canoptek Court variant: flying scarab warrior.',
  defaultWargear: [], availableWargear: [],
};
export const nec_flayed_one: UnitOption = {
  id: 'nec_flayed_one', name: 'Flayed One', baseCost: 70, minCount: 0, maxCount: 3,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'FEAR', 'NECRON', 'NEGATE GAS', 'NO PROMOTION', 'STEALTH'],
  baseSize: '25mm',
  faction: 'necrons', unitType: 'troop',
  description: 'Hideous Necrons cursed with an insatiable hunger for flesh.',
  defaultWargear: [
    { id: 'flayer_claws', name: 'Flayer Claws', type: 'melee', cost: 0, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'CRITICAL', 'CUMBERSOME', 'TWO-HANDED'] },
  ], availableWargear: [],
};

export const nec_flayer_king: UnitOption = {
  id: 'nec_flayer_king', name: 'Flayer King', baseCost: 165, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 0, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'ELITE', 'FEAR', 'LEADER', 'NECRON', 'NEGATE GAS', 'STEALTH', 'TOUGH'],
  baseSize: '32-40mm',
  faction: 'necrons', unitType: 'elite',
  description: 'Flayer King variant: mandatory leader.',
  defaultWargear: [
    { id: 'nec_lords_claw', name: "Lord's Claw", type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE OFF-HAND', 'IGNORE ARMOUR', 'CRITICAL'],
      description: 'Two claws of living metal, requiring no hand slots. Treated as having two of these weapons.' },
  ], availableWargear: [],
};
