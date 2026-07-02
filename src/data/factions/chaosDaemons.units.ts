import { UnitOption } from '../../types/index.js';

// ==========================================================================
// CHAOS DAEMONS
// ==========================================================================
export const cd_daemon_prince: UnitOption = {
  id: 'cd_daemon_prince', name: 'Daemon Prince', baseCost: 210, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'LARGE', 'LEADER', 'STRONG', 'TOUGH'],
  baseSize: '60mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Mighty ascended champion of the Chaos Gods.',
  defaultWargear: [
    { id: 'cd_hellforged_weapon', name: 'Hellforged Weapon', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'HEAVY', 'TWO-HANDED'],
      description: 'When attacking, choose to make an extra attack against a different enemy or gain ARMOUR PIERCING 2.' },
    { id: 'cd_infernal_cannon', name: 'Infernal Cannon', type: 'heavy', range: 24, cost: 0, handedness: 'two-handed',
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
    { id: 'cd_daemon_prince_wings', name: 'Wings', cost: 10, maxCount: 1,
      grantedKeywords: ['FLYING'],
      description: 'Grants 8" FLYING movement. Can be combined with any deity sub-type.' },
  ],
};
export const cd_chaos_furie: UnitOption = {
  id: 'cd_chaos_furie', name: 'Chaos Furie', baseCost: 70, minCount: 0, maxCount: 3,
  stats: { movement: 10, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FLYING', 'UNDIVIDED'],
  baseSize: '25mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Winged undivided lesser daemon.',
  defaultWargear: [
    { id: 'cd_daemonic_claw', name: 'Daemonic Claw Ãƒâ€”2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE OFF-HAND'],
      description: 'Two natural claws requiring no hand slots. No off-hand penalty when attacking with both.' },
  ], availableWargear: [],
  // Rule: any equipped melee weapon or hand-using item replaces a Daemonic Claw per hand used
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_daemonic_claw', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_bloodmaster: UnitOption = {
  id: 'cd_bloodmaster', name: 'Bloodmaster', baseCost: 70, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'KHORNE', 'LEADER', 'TOUGH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Herald of Khorne.',
  defaultWargear: [], availableWargear: [],
};
export const cd_skullmaster: UnitOption = {
  id: 'cd_skullmaster', name: 'Skullmaster', baseCost: 90, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'LARGE', 'KHORNE', 'TOUGH'],
  baseSize: '60mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Herald of Khorne mounted on a Juggernaut.',
  defaultWargear: [
    { id: 'cd_juggernauts_bladed_horn', name: 'Juggernaut\'s Bladed Horn', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE'],
      description: 'Gains +1 INJURY DICE during the Charge turn. The Skullmaster can make an extra melee attack with this weapon when it takes the Fight Action.' },
  ], availableWargear: [],
};
export const cd_bloodletter: UnitOption = {
  id: 'cd_bloodletter', name: 'Bloodletter', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'KHORNE'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Daemon foot soldier of Khorne.',
  defaultWargear: [], availableWargear: [],
};
export const cd_flesh_hound: UnitOption = {
  id: 'cd_flesh_hound', name: 'Flesh Hound', baseCost: 100, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LARGE', 'NO PROMOTION', 'KHORNE'],
  baseSize: '60x35mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Khornate hunting daemon.',
  defaultWargear: [
    { id: 'cd_burning_roar', name: 'Burning Roar', type: 'ranged', range: 8, cost: 0, handedness: 'no-hands',
      keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE'] },
    { id: 'cd_gore_drenched_fangs', name: 'Gore-Drenched Fangs', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE'] },
  ], availableWargear: [],
};
export const cd_infernal_enrapturess: UnitOption = {
  id: 'cd_infernal_enrapturess', name: 'Infernal Enrapturess', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'LARGE', 'LEADER', 'SLAANESH', 'TOUGH'],
  baseSize: '60x35mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Herald of Slaanesh with an infernal instrument.',
  defaultWargear: [
    { id: 'cd_heartstring_lyre', name: 'Heartstring Lyre', type: 'ranged', range: 24, cost: 0, handedness: 'two-handed',
      keywords: ['TWO-HANDED'],
      description: 'Choose one mode Ã¢â‚¬â€ Cacophonous Melody: 18", IGNORE COVER, ASSAULT, BLAST 2"; or Euphonic Blast: 24", IGNORE ARMOUR, IGNORE COVER.' },
    { id: 'cd_slashing_claw_enrap', name: 'Slashing Claw Ãƒâ€”2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CRITICAL', 'IGNORE OFF-HAND'],
      description: 'Two claws, no hands required. No off-hand penalty.' },
  ], availableWargear: [],
  // Rule: melee weapons replace Slashing Claws (one claw per hand used; shown as full replacement)
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_slashing_claw_enrap', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_tranceweaver: UnitOption = {
  id: 'cd_tranceweaver', name: 'Tranceweaver', baseCost: 70, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'PSYKER 1', 'SLAANESH'],
  baseSize: '25mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Psyker Herald of Slaanesh. (+ powers)',
  defaultWargear: [
    { id: 'cd_slashing_claw_trw', name: 'Slashing Claw Ãƒâ€”2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CRITICAL', 'IGNORE OFF-HAND'],
      description: 'Two claws, no hands required. No off-hand penalty.' },
  ], availableWargear: [],
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_slashing_claw_trw', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_daemonette: UnitOption = {
  id: 'cd_daemonette', name: 'Daemonette', baseCost: 60, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'SLAANESH'],
  baseSize: '25mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Daemon foot soldier of Slaanesh.',
  defaultWargear: [
    { id: 'cd_slashing_claw_daem', name: 'Slashing Claw Ãƒâ€”2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CRITICAL', 'IGNORE OFF-HAND'],
      description: 'Two claws, no hands required. No off-hand penalty.' },
  ], availableWargear: [],
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_slashing_claw_daem', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_seeker: UnitOption = {
  id: 'cd_seeker', name: 'Seeker', baseCost: 95, minCount: 0, maxCount: 3,
  stats: { movement: 10, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'INFILTRATOR', 'LARGE', 'SLAANESH'],
  baseSize: '60x35mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Daemonette mounted on a Steed of Slaanesh.',
  defaultWargear: [
    { id: 'cd_lashing_tongue', name: 'Lashing Tongue', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: [],
      description: 'The Seeker can make an extra melee attack with this weapon when it takes the Fight Action.' },
    { id: 'cd_slashing_claw_seek', name: 'Slashing Claw Ãƒâ€”2', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CRITICAL', 'IGNORE OFF-HAND'],
      description: 'Two claws, no hands required. No off-hand penalty.' },
  ], availableWargear: [],
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_slashing_claw_seek', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_contorted_epitome: UnitOption = {
  id: 'cd_contorted_epitome', name: 'Contorted Epitome', baseCost: 85, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LARGE', 'SLAANESH'],
  baseSize: '75x42mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Slaanesh greater daemon construct.',
  defaultWargear: [
    { id: 'cd_coiled_tentacles', name: 'Coiled Tentacles', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['CLEAVE 2', 'BLOCK', 'CRITICAL', 'CUMBERSOME', 'TWO-HANDED', 'WHIP 3"'] },
  ], availableWargear: [],
  cannotEquip: true,
};
export const cd_poxbringer: UnitOption = {
  id: 'cd_poxbringer', name: 'Poxbringer', baseCost: 70, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LEADER', 'NURGLE', 'PSYKER 1', 'TOUGH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Psyker Herald of Nurgle. (+ powers)',
  defaultWargear: [], availableWargear: [],
};
export const cd_spoilpox_scrivener: UnitOption = {
  id: 'cd_spoilpox_scrivener', name: 'Spoilpox Scrivener', baseCost: 70, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'NURGLE'],
  baseSize: '40mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Herald of Nurgle keeping the death tally.',
  defaultWargear: [], availableWargear: [],
};
export const cd_plaguebearer: UnitOption = {
  id: 'cd_plaguebearer', name: 'Plaguebearer', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'NURGLE'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Daemon foot soldier of Nurgle.',
  defaultWargear: [], availableWargear: [],
};
export const cd_nurgling_swarm: UnitOption = {
  id: 'cd_nurgling_swarm', name: 'Nurgling Swarm', baseCost: 55, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LARGE', 'LIMITED POTENTIAL', 'NURGLE', 'SWARM', 'TOUGH'],
  baseSize: '50mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Writhing mass of tiny Nurgle daemons.',
  defaultWargear: [
    { id: 'cd_nurgling_ccw', name: 'Close Combat Weapon (innate)', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: [],
      description: 'Always counts as equipped with a close combat weapon. No hand slots used.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const cd_plague_drone_rider: UnitOption = {
  id: 'cd_plague_drone_rider', name: 'Plague Drone Rider', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'FLYING', 'LARGE', 'NURGLE', 'TOUGH'],
  baseSize: '60mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Plaguebearer mounted on a Rot Fly.',
  defaultWargear: [
    { id: 'cd_foul_mouthparts', name: 'Foul Mouthparts', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['CRITICAL'],
      description: 'Natural weapon, no hands required. The Plague Drone Rider can make an extra melee attack with this weapon when it takes the Fight Action.' },
  ], availableWargear: [],
};
export const cd_changecaster: UnitOption = {
  id: 'cd_changecaster', name: 'Changecaster', baseCost: 75, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'LEADER', 'PSYKER 1', 'TOUGH', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Psyker Herald of Tzeentch. (+ powers)',
  defaultWargear: [
    { id: 'cd_arcane_fireball', name: 'Arcane Fireball', type: 'ranged', range: 18, cost: 0, handedness: 'one-handed',
      keywords: ['FIRE', 'PSYCHIC', 'RISKY'],
      description: 'Uses the ranged hand. RISKY Ã¢â‚¬â€ take a Risky Success Roll when firing.' },
  ], availableWargear: [],
};
export const cd_flamer: UnitOption = {
  id: 'cd_flamer', name: 'Flamer', baseCost: 120, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'FLYING', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'elite',
  description: 'Fire-spewing Tzeentch daemon.',
  defaultWargear: [
    { id: 'cd_fire_of_tzeentch', name: 'Fire of Tzeentch', type: 'ranged', range: 18, cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE COVER', 'FIRE', 'PSYCHIC'] },
    { id: 'cd_flickering_flames', name: 'Flickering Flames', type: 'ranged', range: 8, cost: 0, handedness: 'no-hands',
      keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE', 'PSYCHIC'] },
    { id: 'cd_flamer_mouth', name: 'Flamer Mouth', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['FIRE'] },
  ], availableWargear: [],
  cannotEquip: true,
};
export const cd_blue_horror: UnitOption = {
  id: 'cd_blue_horror', name: 'Blue Horror', baseCost: 45, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'LIMITED POTENTIAL', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Small splitting Tzeentch daemon.',
  defaultWargear: [
    { id: 'cd_coruscating_blue_flames', name: 'Coruscating Blue Flames', type: 'ranged', range: 18, cost: 0, handedness: 'two-handed',
      keywords: ['-1 INJURY DICE', 'FIRE', 'PSYCHIC', 'RISKY', 'TWO-HANDED'] },
    { id: 'cd_blue_claws', name: 'Blue Claws', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['-1 INJURY DICE', 'TWO-HANDED'] },
  ], availableWargear: [],
};
export const cd_pink_horror: UnitOption = {
  id: 'cd_pink_horror', name: 'Pink Horror', baseCost: 150, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Dangerously cheerful Tzeentch daemon.',
  defaultWargear: [
    { id: 'cd_coruscating_pink_flames', name: 'Coruscating Pink Flames', type: 'ranged', range: 18, cost: 0, handedness: 'two-handed',
      keywords: ['FIRE', 'PSYCHIC', 'RISKY', 'TWO-HANDED'] },
    { id: 'cd_pink_claws', name: 'Pink Claws', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['TWO-HANDED'] },
  ], availableWargear: [],
  // Rule: any equipped melee weapon replaces the included Pink Claws
  weaponReplacementRules: [
    { replacedDefaultId: 'cd_pink_claws', whenAddingWeaponType: 'melee' },
  ],
};
export const cd_screamer: UnitOption = {
  id: 'cd_screamer', name: 'Screamer', baseCost: 70, minCount: 0, maxCount: 3,
  stats: { movement: 10, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FLYING', 'NO PROMOTION', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'chaos_daemons', unitType: 'troop',
  description: 'Disc-shaped flying Tzeentch daemon.',
  defaultWargear: [
    { id: 'cd_lamprey_maw', name: 'Lamprey Maw', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY DICE', 'TWO-HANDED'] },
  ], availableWargear: [],
  cannotEquip: true,
};
