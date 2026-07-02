import { UnitOption } from '../../types/index.js';
import { ha_master_of_executions, ha_slaughterbound } from './hereticAstartes.units.js';

// ==========================================================================
// WORLD EATERS (standalone faction Ã¢â‚¬â€ formerly Heretic Astartes variant)
// ==========================================================================
const WE_MARK_KHORNE = { id: 'mark_of_khorne', name: 'Mark of Khorne', type: 'equipment' as const, slot: 'mark' as const, cost: 0,
  keywords: ['MARK OF CHAOS', 'KHORNE'], description: 'Melee attacks have +1 INJURY MODIFIER. Grants KHORNE keyword. Included in base cost.',
  grantsKeywords: ['KHORNE'] };
const WE_PA = { id: 'power_armour', name: 'Power Armour', type: 'armor' as const, slot: 'body-armour' as const, cost: 0,
  keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).', statModifiers: { armourSave: -2 } };
const WE_BLOOD_SURGE = { id: 'we_butchers_nails', name: "Butcher's Nails Ã¢â‚¬â€ Blood Surge", type: 'passive' as const,
  description: "When this model Charges, roll 2D6 instead of 1D6 and add the highest die to its charge move. Cannot be equipped with ranged weapons besides Pistols, THROWN weapons, and Blood Harpoons." };

export const we_chaos_lord: UnitOption = {
  id: 'we_chaos_lord', name: 'Chaos Lord', baseCost: 125, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'KHORNE', 'LARGE', 'LEADER', 'TOUGH'],
  baseSize: '40mm', faction: 'world_eaters', unitType: 'elite',
  description: 'World Eaters warband lord. Mandatory leader. (75cr + 40cr Power Armour + 10cr Mark of Khorne)',
  abilities: [WE_BLOOD_SURGE],
  defaultWargear: [WE_MARK_KHORNE, WE_PA], availableWargear: [],
};
export const we_dark_apostle: UnitOption = {
  id: 'we_dark_apostle', name: 'Dark Apostle', baseCost: 140, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'KHORNE'],
  baseSize: '40mm', faction: 'world_eaters', unitType: 'elite',
  description: 'World Eaters Dark Apostle. (70cr + 40cr Power Armour + 20cr Crozius + 10cr Mark of Khorne)',
  defaultWargear: [WE_MARK_KHORNE, WE_PA,
    { id: 'we_accursed_crozius', name: 'Accursed Crozius', type: 'melee' as const, cost: 0, handedness: 'one-handed' as const,
      keywords: ['ARMOUR PIERCING 2'], description: 'The bearer gains the FEAR Keyword.' },
  ], availableWargear: [],
};
export const we_berzerker: UnitOption = {
  id: 'we_berzerker', name: 'Berzerker', baseCost: 105, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['HERETIC ASTARTES', 'KHORNE'],
  baseSize: '32mm', faction: 'world_eaters', unitType: 'troop',
  description: 'World Eaters Berzerker. (55cr + 40cr Power Armour + 10cr Mark of Khorne)',
  abilities: [WE_BLOOD_SURGE],
  defaultWargear: [WE_MARK_KHORNE, WE_PA], availableWargear: [],
};
export const we_jakhal: UnitOption = {
  id: 'we_jakhal', name: 'Jakhal', baseCost: 45, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FOLLOWER', 'HERETIC ASTARTES', 'KHORNE'],
  baseSize: '25-28mm', faction: 'world_eaters', unitType: 'troop',
  description: 'World Eaters Jakhal (Chaos Cultist). (+0/+0, 35cr + 10cr Mark of Khorne. Max = number of other non-merc models.)',
  abilities: [WE_BLOOD_SURGE],
  defaultWargear: [WE_MARK_KHORNE], availableWargear: [],
  upgrades: [
    { id: 'we_jakhal_goremonger', name: 'Goremonger', cost: 5, maxCount: 99, grantedKeywords: ['INFILTRATOR', 'SKIRMISHER'],
      description: 'Up to half of your Jakhals (rounded up) can be upgraded to Goremongers (+5cr). Grants the INFILTRATOR and SKIRMISHER keywords.' },
  ],
};
export const we_eightbound: UnitOption = {
  id: 'we_eightbound', name: 'Eightbound', baseCost: 115, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'HERETIC ASTARTES', 'KHORNE', 'LARGE', 'LIMITED POTENTIAL'],
  baseSize: '40mm', faction: 'world_eaters', unitType: 'troop',
  description: 'Daemon-possessed World Eaters Possessed (Eightbound). (55cr + 40cr PA + 10cr Mark + 10cr Eightbound)',
  abilities: [
    { id: 'we_beacon_of_rage', name: 'Beacon of Rage', type: 'aura' as const,
      description: 'The Eightbound and each of its allies within 3" of it have +1 DICE to Hit any enemy that has 1 or more BLOOD MARKERS.' },
  ],
  defaultWargear: [WE_MARK_KHORNE, WE_PA,
    { id: 'we_mutated_chainblade', name: 'Mutated Chainblade', type: 'melee' as const, cost: 0, handedness: 'one-handed' as const,
      keywords: ['CRITICAL', 'RISKY', 'SHRAPNEL'], description: 'Eightbound daemonic chain weapon.' },
  ], availableWargear: [],
};
export const we_chaos_terminator: UnitOption = {
  id: 'we_chaos_terminator', name: 'Chaos Terminator', baseCost: 155, minCount: 0, maxCount: 2, maxCountLarge: 3,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'HERETIC ASTARTES', 'KHORNE', 'LARGE', 'STRONG', 'VEHICLE'],
  baseSize: '40mm', faction: 'world_eaters', unitType: 'troop',
  description: 'World Eaters Terminator. (75cr + 70cr Terminator Armour + 10cr Mark of Khorne; 0-3 at 1200cr+). Do not have Blood Surge. Can take any ranged weapons.',
  defaultWargear: [WE_MARK_KHORNE,
    { id: 'terminator_armour', name: 'Terminator Armour', type: 'armor' as const, slot: 'body-armour' as const, cost: 0,
      keywords: ['-3 INJURY MODIFIER', 'DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
      description: 'Included in cost. This armour does not count towards any LIMIT.',
      grantsKeywords: ['DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'], statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
};
export const we_helbrute: UnitOption = {
  id: 'we_helbrute', name: 'Helbrute', baseCost: 175, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'FOLLOWER', 'HERETIC ASTARTES', 'KHORNE', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm', faction: 'world_eaters', unitType: 'troop',
  description: 'World Eaters Helbrute. (Armour plating + 10cr Mark of Khorne included in cost)',
  defaultWargear: [WE_MARK_KHORNE,
    { id: 'we_helbrute_fists', name: 'Helbrute Fists', type: 'melee' as const, cost: 0, handedness: 'two-handed' as const,
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'], description: 'Count as Two-Handed Hammers in melee.' },
  ], availableWargear: [],
  weaponReplacementRules: [{ replacedDefaultId: 'we_helbrute_fists', whenAddingWeaponType: 'melee' }],
};
export const we_master_of_executions: UnitOption = {
  ...ha_master_of_executions,
  id: 'we_master_of_executions', faction: 'world_eaters',
};
export const we_slaughterbound: UnitOption = {
  ...ha_slaughterbound,
  id: 'we_slaughterbound', faction: 'world_eaters',
};
