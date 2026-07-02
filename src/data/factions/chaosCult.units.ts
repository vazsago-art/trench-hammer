import { UnitOption } from '../../types/index.js';

// ==========================================================================
// CHAOS CULT
export const cc_cult_demagogue: UnitOption = {
  id: 'cc_cult_demagogue', name: 'Cult Demagogue', baseCost: 75, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CHAOS CULT', 'ELITE', 'LEADER', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'chaos_cult', unitType: 'elite',
  description: 'Mandatory charismatic leader of the Chaos Cult.',
  defaultWargear: [], availableWargear: [],
};
export const cc_heretic_witch: UnitOption = {
  id: 'cc_heretic_witch', name: 'Heretic Witch', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CHAOS CULT', 'ELITE', 'PSYKER 1'],
  baseSize: '25-32mm',
  faction: 'chaos_cult', unitType: 'elite',
  description: 'Unsanctioned psyker twisted by chaos. (+ powers)',
  defaultWargear: [], availableWargear: [],
};
export const cc_chaos_disciple: UnitOption = {
  id: 'cc_chaos_disciple', name: 'Chaos Disciple', baseCost: 60, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'CHAOS CULT', 'STRONG'],
  baseSize: '25-32mm',
  faction: 'chaos_cult', unitType: 'elite',
  description: 'Veteran devotee of the dark powers.',
  defaultWargear: [], availableWargear: [],
};
export const cc_daemon_prince: UnitOption = {
  id: 'cc_daemon_prince', name: 'Daemon Prince', baseCost: 190, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LARGE', 'LEADER', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'chaos_cult', unitType: 'elite',
  description: 'Campaign-only apotheosised champion of Chaos.',
  defaultWargear: [
    { id: 'cc_hellforged_weapon', name: 'Hellforged Weapon', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'HEAVY', 'TWO-HANDED'],
      description: 'When attacking, choose to make an extra attack against a different enemy or gain ARMOUR PIERCING 2.' },
    { id: 'cc_infernal_cannon', name: 'Infernal Cannon', type: 'heavy', range: 24, cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'BLAST 2"', 'HEAVY', 'SHRAPNEL', 'TWO-HANDED'] },
  ], availableWargear: [],
  unitSubTypes: [
    { id: 'darkness', name: 'Daemon Prince of Darkness', creditCostModifier: -20,
      grantedKeywords: ['UNDIVIDED'],
      description: 'The Daemon Prince and all allied models within 6" of it have the STEALTH Keyword. It gains the UNDIVIDED Keyword. It can be equipped with equipment from any of the Legions\u2019 Battlekit Lists.' },
    { id: 'khorne', name: 'Daemon Prince of Khorne', creditCostModifier: 0,
      grantedKeywords: ['KHORNE'],
      description: 'The Daemon Prince\u2019s melee attacks have an additional +1 INJURY MODIFIER, and it gains the KHORNE Keyword. It can be equipped with equipment from the Blood Legion Battlekit List.' },
    { id: 'nurgle', name: 'Daemon Prince of Nurgle', creditCostModifier: 0,
      grantedKeywords: ['NURGLE'],
      description: 'The Daemon Prince treats Down results as Minor Hits (does not affect Down results that replace Out of Action via TOUGH Keyword), and it gains the NURGLE Keyword. It can be equipped with equipment from the Plague Legion Battlekit List.' },
    { id: 'slaanesh', name: 'Daemon Prince of Slaanesh', creditCostModifier: 0,
      grantedKeywords: ['SLAANESH'],
      statModifiers: { movement: 1 },
      description: 'The Daemon Prince gains +1" movement speed, +1 DICE to all Dash Success Rolls, and the SLAANESH Keyword. It can be equipped with equipment from the Legion of Excess Battlekit List.' },
    { id: 'tzeentch', name: 'Daemon Prince of Tzeentch', creditCostModifier: 0,
      grantedKeywords: ['TZEENTCH'],
      description: 'The Daemon Prince\u2019s ranged attacks have an additional +1 INJURY MODIFIER, and it gains the TZEENTCH Keyword. It can be equipped with equipment from the Scintillating Legion Battlekit List.' },
  ],
  upgrades: [
    { id: 'cc_daemon_prince_wings', name: 'Wings', cost: 10, maxCount: 1,
      grantedKeywords: ['FLYING'],
      description: 'Grants 8" FLYING movement. Can be combined with any deity sub-type.' },
  ],
};
export const cc_cult_rabble: UnitOption = {
  id: 'cc_cult_rabble', name: 'Cult Rabble', baseCost: 20, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CHAOS CULT', 'NO PROMOTION'],
  baseSize: '25-28mm',
  faction: 'chaos_cult', unitType: 'troop',
  description: 'Desperate horde follower of the dark gods. Can upgrade to Chaos Devotee (+10 credits).',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'cc_rabble_to_devotee', name: 'Chaos Devotee', cost: 10, maxCount: 99,
      statModifiers: { rangedSkill: 1, meleeSkill: 1 },
      description: 'Upgrade to Chaos Devotee: +1 Ranged Skill, +1 Melee Skill. Keeps any special abilities.' },
  ],
};
export const cc_chaos_devotee: UnitOption = {
  id: 'cc_chaos_devotee', name: 'Chaos Devotee', baseCost: 30, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CHAOS CULT'],
  baseSize: '25-28mm',
  faction: 'chaos_cult', unitType: 'troop',
  description: 'Dedicated worshipper of Chaos.',
  defaultWargear: [], availableWargear: [],
};
export const cc_chaos_ogryn: UnitOption = {
  id: 'cc_chaos_ogryn', name: 'Chaos Ogryn', baseCost: 85, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['CHAOS CULT', 'LARGE', 'LIMITED POTENTIAL', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'chaos_cult', unitType: 'troop',
  description: 'Massive mutated abhuman devoted to Chaos.',
  defaultWargear: [], availableWargear: [],
};
export const cc_chaos_spawn: UnitOption = {
  id: 'cc_chaos_spawn', name: 'Chaos Spawn', baseCost: 125, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH'],
  baseSize: '50mm',
  faction: 'chaos_cult', unitType: 'troop',
  description: 'Mindless chaos entity, reward and punishment in one.',
  defaultWargear: [
    { id: 'cc_hideous_mutations', name: 'Hideous Mutations', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CLEAVE D3', '+1 INJURY DICE'],
      description: 'Natural chaos mutations growing across its body. Cannot be removed.' },
  ], availableWargear: [],
  cannotEquip: true,
};
