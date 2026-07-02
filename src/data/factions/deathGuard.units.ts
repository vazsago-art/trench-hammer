import { UnitOption } from '../../types/index.js';
import { ha_foetid_blight_drone } from './hereticAstartes.units.js';

// ==========================================================================
// DEATH GUARD (standalone faction Ã¢â‚¬â€ formerly Heretic Astartes variant)
// ==========================================================================
// All Death Guard Heretic Astartes models auto-include Mark of Nurgle (+15cr, included in baseCost).
// Contagion ability baked directly into applicable units.
// MARK OF NURGLE default wargear Ã¢â‚¬â€ shared definition
const DG_MARK_NURGLE = { id: 'mark_of_nurgle', name: 'Mark of Nurgle', type: 'equipment' as const, slot: 'mark' as const, cost: 0,
  keywords: ['MARK OF CHAOS', 'NURGLE'], description: 'Melee attacks have +1 INJURY MODIFIER. Grants NURGLE keyword. Included in base cost.',
  grantsKeywords: ['NURGLE'] };
const DG_PA = { id: 'power_armour', name: 'Power Armour', type: 'armor' as const, slot: 'body-armour' as const, cost: 0,
  keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).', statModifiers: { armourSave: -2 } };
const DG_CONTAGION_ABILITY = { id: 'dg_contagion', name: 'Contagion', type: 'aura' as const,
  description: 'Enemy models within 1" of this model that have 1 or more INFECTION MARKERS have -1 DICE to Hit with all attacks (spending all INFECTION MARKERS on that attack negates this penalty).' };

export const dg_chaos_lord: UnitOption = {
  id: 'dg_chaos_lord', name: 'Chaos Lord', baseCost: 130, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE', 'LEADER', 'NURGLE', 'TOUGH'],
  baseSize: '40mm', faction: 'death_guard', unitType: 'elite',
  description: 'Death Guard warband lord. Mandatory leader. (75cr + 40cr Power Armour + 15cr Mark of Nurgle)',
  abilities: [DG_CONTAGION_ABILITY],
  defaultWargear: [DG_MARK_NURGLE, DG_PA], availableWargear: [],
  upgrades: [
    { id: 'dg_shroud_of_disease', name: 'Shroud of Disease', cost: 20, maxCount: 1, upgradeGroup: 'dg_lord_of_rot',
      description: 'Ranged attacks made against this model or any of its allies within 3" have -1 DICE to Hit.' },
    { id: 'dg_vector_of_disease', name: 'Vector of Disease', cost: 10, maxCount: 1, upgradeGroup: 'dg_lord_of_rot',
      description: 'When this model Charges, or an ally ends a Charge within 3" of it, that model gains +1 INJURY DICE with its melee attacks during that Activation.' },
    { id: 'dg_virulent_aura', name: 'Virulent Aura', cost: 15, maxCount: 1, upgradeGroup: 'dg_lord_of_rot',
      description: 'The ranged weapons of this model and each of its allies within 3" of it gain the CRITICAL Keyword. Attacks that automatically hit or that already have CRITICAL instead have +1 INJURY DICE.' },
  ],
};
export const dg_chaos_sorcerer: UnitOption = {
  id: 'dg_chaos_sorcerer', name: 'Chaos Sorcerer', baseCost: 130, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'NURGLE', 'PSYKER 2'],
  baseSize: '40mm', faction: 'death_guard', unitType: 'elite',
  description: 'Death Guard psyker sorcerer. (75cr + 40cr Power Armour + 15cr Mark of Nurgle)',
  defaultWargear: [DG_MARK_NURGLE, DG_PA], availableWargear: [],
};
export const dg_plague_marine: UnitOption = {
  id: 'dg_plague_marine', name: 'Plague Marine', baseCost: 110, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['HERETIC ASTARTES', 'NURGLE'],
  baseSize: '32mm', faction: 'death_guard', unitType: 'troop',
  description: 'Death Guard Chaos Space Marine. (55cr + 40cr Power Armour + 15cr Mark of Nurgle)',
  abilities: [DG_CONTAGION_ABILITY],
  defaultWargear: [DG_MARK_NURGLE, DG_PA], availableWargear: [],
  upgrades: [
    { id: 'dg_csm_havoc', name: 'Havoc', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Ignore the HEAVY Keyword of one ranged weapon they carry.' },
    { id: 'dg_plague_champ_extraction', name: 'Extraction of Fresh Disease', cost: 15, maxCount: 2, grantedKeywords: ['ELITE'], upgradeGroup: 'dg_plague_champion',
      description: 'Plague Marine Champion (gains ELITE). When this model takes an enemy model Out of Action in melee, one other enemy within 6" of it suffers 1 INFECTION MARKER.' },
    { id: 'dg_plague_champ_malicious', name: 'Malicious Calculations', cost: 15, maxCount: 2, grantedKeywords: ['ELITE'], upgradeGroup: 'dg_plague_champion',
      description: 'Plague Marine Champion (gains ELITE). BLOOD MARKERS cannot be spent on the attacks of this model or any of its allies within 3" of it.' },
    { id: 'dg_plague_champ_putrefying', name: 'Putrefying Stink', cost: 15, maxCount: 2, grantedKeywords: ['ELITE'], upgradeGroup: 'dg_plague_champion',
      description: 'Plague Marine Champion (gains ELITE). Enemy models that charge this model or one of its allies within 3" of it do not add a D6 to their charge roll.' },
    { id: 'dg_plague_champ_narthecium', name: 'Tainted Narthecium', cost: 10, maxCount: 2, grantedKeywords: ['ELITE'], upgradeGroup: 'dg_plague_champion',
      description: 'Plague Marine Champion (gains ELITE). As an Action (+1 DICE), heal itself or a NURGLE model within 1": remove 1 BLOOD MARKER (or 3 on critical success).' },
    { id: 'dg_plague_champ_tocsin', name: 'Tocsin of Misery', cost: 15, maxCount: 2, grantedKeywords: ['ELITE'], upgradeGroup: 'dg_plague_champion',
      description: 'Plague Marine Champion (gains ELITE). At the end of each Turn, each enemy within 3" of this model that has at least 1 BLOOD MARKER gains an additional BLOOD MARKER.' },
  ],
};
export const dg_plague_terminator: UnitOption = {
  id: 'dg_plague_terminator', name: 'Plague Terminator', baseCost: 160, minCount: 0, maxCount: 2, maxCountLarge: 3,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'HERETIC ASTARTES', 'LARGE', 'NURGLE', 'STRONG', 'VEHICLE'],
  baseSize: '40mm', faction: 'death_guard', unitType: 'troop',
  description: 'Death Guard Terminator. (75cr + 70cr Terminator Armour + 15cr Mark of Nurgle; 0-3 at 1200cr+)',
  abilities: [DG_CONTAGION_ABILITY],
  defaultWargear: [DG_MARK_NURGLE,
    { id: 'terminator_armour', name: 'Terminator Armour', type: 'armor' as const, slot: 'body-armour' as const, cost: 0,
      keywords: ['-3 INJURY MODIFIER', 'DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
      description: 'Included in cost. This armour does not count towards any LIMIT.',
      grantsKeywords: ['DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'], statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
};
export const dg_helbrute: UnitOption = {
  id: 'dg_helbrute', name: 'Helbrute', baseCost: 180, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'FOLLOWER', 'HERETIC ASTARTES', 'LARGE', 'NO PROMOTION', 'NURGLE', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm', faction: 'death_guard', unitType: 'troop',
  description: 'Death Guard Helbrute daemon engine. (Armour plating + 15cr Mark of Nurgle included in cost)',
  abilities: [DG_CONTAGION_ABILITY],
  defaultWargear: [DG_MARK_NURGLE,
    { id: 'dg_helbrute_fists', name: 'Helbrute Fists', type: 'melee' as const, cost: 0, handedness: 'two-handed' as const,
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
      description: 'Count as Two-Handed Hammers in melee.' },
  ], availableWargear: [],
  weaponReplacementRules: [{ replacedDefaultId: 'dg_helbrute_fists', whenAddingWeaponType: 'melee' }],
};
export const dg_chaos_cultist: UnitOption = {
  id: 'dg_chaos_cultist', name: 'Chaos Cultist', baseCost: 50, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FOLLOWER', 'HERETIC ASTARTES', 'NURGLE'],
  baseSize: '25-28mm', faction: 'death_guard', unitType: 'troop',
  description: 'Chaos Cultist devoted to Nurgle. (+0/+0, 35cr + 15cr Mark of Nurgle. Max = number of other non-merc models.)',
  defaultWargear: [DG_MARK_NURGLE], availableWargear: [],
};
export const dg_poxwalker: UnitOption = {
  id: 'dg_poxwalker', name: 'Poxwalker', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FEAR', 'FOLLOWER', 'HERETIC ASTARTES', 'NEGATE GAS', 'NO PROMOTION', 'NURGLE'],
  baseSize: '25-28mm', faction: 'death_guard', unitType: 'troop',
  description: 'Shambling plague-zombie. Cannot take any weapons, armour, or equipment (counts as Close Combat Weapon).',
  defaultWargear: [], availableWargear: [], cannotEquip: true,
};
export const dg_foetid_blight_drone: UnitOption = {
  ...ha_foetid_blight_drone,
  id: 'dg_foetid_blight_drone', faction: 'death_guard',
};
