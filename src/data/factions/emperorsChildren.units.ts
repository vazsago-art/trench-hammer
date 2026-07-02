import { UnitOption } from '../../types/index.js';
import { ha_lord_kakophonist } from './hereticAstartes.units.js';

// ==========================================================================
// EMPEROR'S CHILDREN (standalone faction Ã¢â‚¬â€ formerly Heretic Astartes variant)
// ==========================================================================
const EC_MARK_SLAANESH = { id: 'mark_of_slaanesh', name: 'Mark of Slaanesh', type: 'equipment' as const, slot: 'mark' as const, cost: 0,
  keywords: ['MARK OF CHAOS', 'SLAANESH'], description: '+2" movement speed, +1 DICE to all Dash Success Rolls. Grants SLAANESH keyword. Included in base cost.',
  statModifiers: { movement: 2 }, grantsKeywords: ['SLAANESH'] };
const EC_PA = { id: 'power_armour', name: 'Power Armour', type: 'armor' as const, slot: 'body-armour' as const, cost: 0,
  keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).', statModifiers: { armourSave: -2 } };

export const ec_chaos_lord: UnitOption = {
  id: 'ec_chaos_lord', name: 'Chaos Lord', baseCost: 125, minCount: 1, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE', 'LEADER', 'SLAANESH', 'TOUGH'],
  baseSize: '40mm', faction: 'emperors_children', unitType: 'elite',
  description: "Emperor's Children warband lord. Mandatory leader. (75cr + 40cr Power Armour + 10cr Mark of Slaanesh)",
  defaultWargear: [EC_MARK_SLAANESH, EC_PA], availableWargear: [],
};
export const ec_dark_apostle: UnitOption = {
  id: 'ec_dark_apostle', name: 'Dark Apostle', baseCost: 140, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'SLAANESH'],
  baseSize: '40mm', faction: 'emperors_children', unitType: 'elite',
  description: "Dark Apostle. (70cr + 40cr Power Armour + 20cr Accursed Crozius + 10cr Mark of Slaanesh)",
  defaultWargear: [EC_MARK_SLAANESH, EC_PA,
    { id: 'ha_accursed_crozius', name: 'Accursed Crozius', type: 'melee' as const, cost: 0, handedness: 'one-handed' as const,
      keywords: ['ARMOUR PIERCING 2'], description: 'The bearer gains the FEAR Keyword.' },
  ], availableWargear: [],
};
export const ec_chaos_sorcerer: UnitOption = {
  id: 'ec_chaos_sorcerer', name: 'Chaos Sorcerer', baseCost: 125, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'PSYKER 2', 'SLAANESH'],
  baseSize: '40mm', faction: 'emperors_children', unitType: 'elite',
  description: "Emperor's Children sorcerer. (75cr + 40cr Power Armour + 10cr Mark of Slaanesh)",
  defaultWargear: [EC_MARK_SLAANESH, EC_PA], availableWargear: [],
};
export const ec_noise_marine: UnitOption = {
  id: 'ec_noise_marine', name: 'Noise Marine', baseCost: 105, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['HERETIC ASTARTES', 'SLAANESH'],
  baseSize: '32mm', faction: 'emperors_children', unitType: 'troop',
  description: "Slaaneshi Chaos Space Marine. (55cr + 40cr Power Armour + 10cr Mark of Slaanesh)",
  defaultWargear: [EC_MARK_SLAANESH, EC_PA], availableWargear: [],
  upgrades: [
    { id: 'ec_csm_havoc', name: 'Havoc', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Ignore the HEAVY Keyword of one ranged weapon they carry.' },
    { id: 'ec_csm_raptor', name: 'Raptor', cost: 5, maxCount: 2, maxCountLarge: 3, grantedKeywords: ['SKIRMISHER'],
      description: 'Can be equipped with Jump Packs and Warp Claws (purchased separately). While equipped with a Jump Pack, gains the SKIRMISHER Keyword.' },
    { id: 'ec_csm_flawless_blade', name: 'Flawless Blade', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: "+1 DICE to Hit with melee attacks. Cannot use ranged weapons besides Pistols and Grenades." },
  ],
};
export const ec_possessed: UnitOption = {
  id: 'ec_possessed', name: 'Possessed', baseCost: 105, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'HERETIC ASTARTES', 'LARGE', 'LIMITED POTENTIAL', 'SLAANESH'],
  baseSize: '40mm', faction: 'emperors_children', unitType: 'troop',
  description: "Daemon-possessed Slaaneshi Marine. (55cr + 40cr Power Armour + 10cr Mark of Slaanesh)",
  defaultWargear: [EC_MARK_SLAANESH, EC_PA,
    { id: 'ha_mutated_claw', name: 'Mutated Claw', type: 'melee' as const, cost: 0, handedness: 'one-handed' as const,
      keywords: ['CRITICAL'], description: 'Daemonic natural weapon. Takes up one hand.' },
  ], availableWargear: [],
};
export const ec_chaos_terminator: UnitOption = {
  id: 'ec_chaos_terminator', name: 'Chaos Terminator', baseCost: 155, minCount: 0, maxCount: 2, maxCountLarge: 3,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'HERETIC ASTARTES', 'LARGE', 'SLAANESH', 'STRONG', 'VEHICLE'],
  baseSize: '40mm', faction: 'emperors_children', unitType: 'troop',
  description: "Emperor's Children Terminator. (75cr + 70cr Terminator Armour + 10cr Mark of Slaanesh; 0-3 at 1200cr+)",
  defaultWargear: [EC_MARK_SLAANESH,
    { id: 'terminator_armour', name: 'Terminator Armour', type: 'armor' as const, slot: 'body-armour' as const, cost: 0,
      keywords: ['-3 INJURY MODIFIER', 'DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
      description: 'Included in cost. This armour does not count towards any LIMIT.',
      grantsKeywords: ['DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'], statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
};
export const ec_helbrute: UnitOption = {
  id: 'ec_helbrute', name: 'Helbrute', baseCost: 175, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'FOLLOWER', 'HERETIC ASTARTES', 'LARGE', 'NO PROMOTION', 'SLAANESH', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm', faction: 'emperors_children', unitType: 'troop',
  description: "Emperor's Children Helbrute. (Armour plating + 10cr Mark of Slaanesh included in cost)",
  defaultWargear: [EC_MARK_SLAANESH,
    { id: 'ec_helbrute_fists', name: 'Helbrute Fists', type: 'melee' as const, cost: 0, handedness: 'two-handed' as const,
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'], description: 'Count as Two-Handed Hammers in melee.' },
  ], availableWargear: [],
  weaponReplacementRules: [{ replacedDefaultId: 'ec_helbrute_fists', whenAddingWeaponType: 'melee' }],
};
export const ec_chaos_cultist: UnitOption = {
  id: 'ec_chaos_cultist', name: 'Chaos Cultist', baseCost: 45, minCount: 0, maxCount: 99,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FOLLOWER', 'HERETIC ASTARTES', 'SLAANESH'],
  baseSize: '25-28mm', faction: 'emperors_children', unitType: 'troop',
  description: "Slaaneshi Chaos Cultist. (+0/+0, 35cr + 10cr Mark of Slaanesh. Max = number of other non-merc models.)",
  defaultWargear: [EC_MARK_SLAANESH], availableWargear: [],
};
export const ec_lord_kakophonist: UnitOption = {
  ...ha_lord_kakophonist,
  id: 'ec_lord_kakophonist', faction: 'emperors_children',
};
