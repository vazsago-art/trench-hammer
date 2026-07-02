import { UnitOption } from '../../types/index.js';

// ==========================================================================
// ADEPTA SORORITAS
// ==========================================================================
export const as_canoness: UnitOption = {
  id: 'as_canoness', name: 'Canoness', baseCost: 115, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LEADER', 'SORORITAS'],
  baseSize: '32mm',
  faction: 'adepta_sororitas', unitType: 'elite',
  description: 'Mandatory commander of the Sisters of Battle. (75cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const as_dogmata: UnitOption = {
  id: 'as_dogmata', name: 'Dogmata', baseCost: 105, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FEAR', 'SORORITAS'],
  baseSize: '32mm',
  faction: 'adepta_sororitas', unitType: 'elite',
  description: 'Bearer of the holy standard, enforcer of faith. (65cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const as_palatine: UnitOption = {
  id: 'as_palatine', name: 'Palatine', baseCost: 100, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'SORORITAS'],
  baseSize: '32mm',
  faction: 'adepta_sororitas', unitType: 'elite',
  description: 'Veteran commander and lieutenant of the Canoness. (60cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const as_novitiate: UnitOption = {
  id: 'as_novitiate', name: 'Novitiate', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['LIMITED POTENTIAL', 'SORORITAS'],
  baseSize: '25-28mm',
  faction: 'adepta_sororitas', unitType: 'troop',
  description: 'Trainee Sister of Battle.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    // Campaign: Novice ability Ã¢â‚¬â€ promotes to Battle Sister
    { id: 'as_novitiate_promoted', name: 'Promoted to Battle Sister (Novice)', cost: 0, maxCount: 99,
      statModifiers: { rangedSkill: 1 },
      description: 'Campaign: Novice ability triggered. This model is now a Battle Sister (+1 Ranged Skill). LIMITED POTENTIAL no longer applies Ã¢â‚¬â€ she is eligible for promotion immediately. SPECIAL: She permanently retains her Impetuous Fervor ability even as a Battle Sister. Must be equipped with Power Armour (purchase separately, 40 credits) before the next mission. Ã¢Å¡Â  Credit limit note: she uses the Battle Sister cost (75cr) for mission credit calculations regardless of which mode she is in Ã¢â‚¬â€ use the higher of the two costs at all times.' },
    // Battle Sister upgrades (only available after promotion) Ã¢â‚¬â€ share warband limits with Battle Sisters
    { id: 'as_mortisanctus', name: 'Mortisanctus', cost: 5, maxCount: 1,
      requiredUpgradeId: 'as_novitiate_promoted',
      statModifiers: { meleeSkill: 1, rangedSkill: -1 },
      description: '+1 Melee Skill, -1 Ranged Skill. May ignore the HEAVY Keyword of one melee weapon it wields (not TWO-HANDED). Up to 1 per warband.' },
    { id: 'as_retributor', name: 'Retributor', cost: 5, maxCount: 2, maxCountLarge: 3,
      requiredUpgradeId: 'as_novitiate_promoted',
      description: 'May ignore the HEAVY Keyword of one ranged weapon it carries. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'as_sacresant', name: 'Sacresant', cost: 10, maxCount: 2, maxCountLarge: 3,
      requiredUpgradeId: 'as_novitiate_promoted',
      statModifiers: { meleeSkill: 1 },
      description: '+1 Melee Skill. Gains BODYGUARD: if any ally within 1" is hit by a ranged or melee weapon (excluding BLAST), you may redirect the hit to this Sacresant instead. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'as_seraphim', name: 'Seraphim', cost: 15, maxCount: 2,
      requiredUpgradeId: 'as_novitiate_promoted',
      grantedKeywords: ['SKIRMISHER'],
      description: 'May be equipped with a Jump Pack (purchased separately). While equipped with a Jump Pack, gains SKIRMISHER. While armed with two PISTOL weapons + Jump Pack: may Shoot with one then immediately Shoot with the other; PISTOL weapons gain IGNORE OFF-HAND WEAPON. Up to 2 per warband.' },
    { id: 'as_zephyrim', name: 'Zephyrim', cost: 10, maxCount: 2,
      requiredUpgradeId: 'as_novitiate_promoted',
      statModifiers: { meleeSkill: 1 },
      grantedKeywords: ['SKIRMISHER'],
      description: 'May be equipped with a Jump Pack and Power Weapons (purchased separately). While equipped with a Jump Pack, gains SKIRMISHER and +1 Melee Skill. Up to 2 per warband.' },
  ],
};
export const as_battle_sister: UnitOption = {
  id: 'as_battle_sister', name: 'Battle Sister', baseCost: 75, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['SORORITAS'],
  baseSize: '32mm',
  faction: 'adepta_sororitas', unitType: 'troop',
  description: 'Faithful warrior-nun clad in power armour. (35cr base + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [
    // Campaign: Penitence of Cowardice Ã¢â‚¬â€ tracks that this Battle Sister has been demoted to Repentia
    { id: 'as_demoted_repentia', name: 'Demoted to Repentia (Penitence)', cost: 0, maxCount: 99,
      statModifiers: { movement: 2, rangedSkill: -1, meleeSkill: 1 },
      description: 'Campaign: Penitence of Cowardice triggered. This model is now a Repentia (Move +2", +1 Melee, Ã¢Ë†â€™1 Ranged). She loses Battle Sister upgrades and Power Armour (armour is reserved in armoury Ã¢â‚¬â€ cannot be sold/equipped until she returns). Uses Repentia cost for mission credit calculations. Upgrade her back via the Repentance ability when eligible.' },
    { id: 'as_mortisanctus', name: 'Mortisanctus', cost: 5, maxCount: 1,
      statModifiers: { meleeSkill: 1, rangedSkill: -1 },
      description: '+1 Melee Skill, -1 Ranged Skill. May ignore the HEAVY Keyword of one melee weapon it wields (not TWO-HANDED). Up to 1 per warband.' },
    { id: 'as_retributor', name: 'Retributor', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'May ignore the HEAVY Keyword of one ranged weapon it carries. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'as_sacresant', name: 'Sacresant', cost: 10, maxCount: 2, maxCountLarge: 3,
      statModifiers: { meleeSkill: 1 },
      description: '+1 Melee Skill. Gains BODYGUARD: if any ally within 1" is hit by a ranged or melee weapon (excluding BLAST), you may redirect the hit to this Sacresant instead. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'as_seraphim', name: 'Seraphim', cost: 15, maxCount: 2,
      grantedKeywords: ['SKIRMISHER'],
      description: 'May be equipped with a Jump Pack (purchased separately). While equipped with a Jump Pack, gains SKIRMISHER. While armed with two PISTOL weapons + Jump Pack: may Shoot with one then immediately Shoot with the other; PISTOL weapons gain IGNORE OFF-HAND WEAPON. Up to 2 per warband.' },
    { id: 'as_zephyrim', name: 'Zephyrim', cost: 10, maxCount: 2,
      statModifiers: { meleeSkill: 1 },
      grantedKeywords: ['SKIRMISHER'],
      description: 'May be equipped with a Jump Pack and Power Weapons (purchased separately). While equipped with a Jump Pack, gains SKIRMISHER and +1 Melee Skill. Up to 2 per warband.' },
  ],
};
export const as_repentia: UnitOption = {
  id: 'as_repentia', name: 'Repentia', baseCost: 60, minCount: 0, maxCount: 4,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['NEGATE FEAR', 'NO PROMOTION', 'SORORITAS'],
  baseSize: '25-28mm',
  faction: 'adepta_sororitas', unitType: 'troop',
  description: 'Penitent warriors seeking absolution through glorious death.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    // Campaign: Repentance ability Ã¢â‚¬â€ promotes to Battle Sister
    { id: 'as_repentia_promoted', name: 'Promoted to Battle Sister (Repentance)', cost: 0, maxCount: 99,
      grantedKeywords: ['NEGATE FEAR'],
      statModifiers: { movement: -2, rangedSkill: 1, meleeSkill: -1 },
      description: 'Campaign: Repentance ability triggered. This model is now a Battle Sister (Move Ã¢Ë†â€™2", +1 Ranged Skill, Melee returns to +0). She permanently retains NEGATE FEAR (already present). NO PROMOTION no longer applies Ã¢â‚¬â€ use the Ã¢â€ â€˜ Promote button to mark her eligible for Elite promotion. Must pay 20 credits for Power Armour (discounted) or take a reserved suit from armoury. If ever demoted back, Power Armour becomes "reserved" in armoury. Ã¢Å¡Â  Credit limit note: always use the HIGHER cost (Battle Sister = 75cr) for mission credit calculations, even while in Repentia mode.' },
    // Battle Sister upgrades (only available after promotion) Ã¢â‚¬â€ share warband limits with Battle Sisters
    { id: 'as_mortisanctus', name: 'Mortisanctus', cost: 5, maxCount: 1,
      requiredUpgradeId: 'as_repentia_promoted',
      statModifiers: { meleeSkill: 1, rangedSkill: -1 },
      description: '+1 Melee Skill, -1 Ranged Skill. May ignore the HEAVY Keyword of one melee weapon it wields (not TWO-HANDED). Up to 1 per warband.' },
    { id: 'as_retributor', name: 'Retributor', cost: 5, maxCount: 2, maxCountLarge: 3,
      requiredUpgradeId: 'as_repentia_promoted',
      description: 'May ignore the HEAVY Keyword of one ranged weapon it carries. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'as_sacresant', name: 'Sacresant', cost: 10, maxCount: 2, maxCountLarge: 3,
      requiredUpgradeId: 'as_repentia_promoted',
      statModifiers: { meleeSkill: 1 },
      description: '+1 Melee Skill. Gains BODYGUARD: if any ally within 1" is hit by a ranged or melee weapon (excluding BLAST), you may redirect the hit to this Sacresant instead. Up to 2 per warband (3 in a warband of 1,200 credits or more).' },
    { id: 'as_seraphim', name: 'Seraphim', cost: 15, maxCount: 2,
      requiredUpgradeId: 'as_repentia_promoted',
      grantedKeywords: ['SKIRMISHER'],
      description: 'May be equipped with a Jump Pack (purchased separately). While equipped with a Jump Pack, gains SKIRMISHER. While armed with two PISTOL weapons + Jump Pack: may Shoot with one then immediately Shoot with the other; PISTOL weapons gain IGNORE OFF-HAND WEAPON. Up to 2 per warband.' },
    { id: 'as_zephyrim', name: 'Zephyrim', cost: 10, maxCount: 2,
      requiredUpgradeId: 'as_repentia_promoted',
      statModifiers: { meleeSkill: 1 },
      grantedKeywords: ['SKIRMISHER'],
      description: 'May be equipped with a Jump Pack and Power Weapons (purchased separately). While equipped with a Jump Pack, gains SKIRMISHER and +1 Melee Skill. Up to 2 per warband.' },
  ],
};
export const as_paragon_warsuit: UnitOption = {
  id: 'as_paragon_warsuit', name: 'Paragon Warsuit', baseCost: 110, minCount: 0, maxCount: 2,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['LARGE', 'SORORITAS', 'STRONG', 'VEHICLE'],
  baseSize: '50mm',
  faction: 'adepta_sororitas', unitType: 'troop',
  description: 'Sister piloting a powerful servo-suit.',
  defaultWargear: [
    { id: 'as_paragon_ccw', name: 'Close Combat Weapon', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: [],
      description: 'Built-in chassis weapon. No hand slots required.' },
  ], availableWargear: [],
};
export const as_penitent_engine: UnitOption = {
  id: 'as_penitent_engine', name: 'Penitent Engine', baseCost: 150, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['LARGE', 'FEAR', 'NO PROMOTION', 'SORORITAS', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '50mm',
  faction: 'adepta_sororitas', unitType: 'troop',
  description: 'Penitent strapped to a bipedal combat walker.',
  defaultWargear: [
    { id: 'as_penitent_buzz_blades', name: 'Penitent Buzz-Blades', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['HEAVY', 'IGNORE ARMOUR', 'RISKY', 'TWO-HANDED'],
      description: 'Chosen at recruitment Ã¢â‚¬â€ mutually exclusive with Penitent Flails.' },
    { id: 'as_penitent_flails', name: 'Penitent Flails', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
      description: 'Chosen at recruitment Ã¢â‚¬â€ mutually exclusive with Penitent Buzz-Blades.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'as_mortifier', name: 'Mortifier', cost: 10, maxCount: 99,
      description: 'When taken Out of Action by a melee attack, may immediately make one melee attack against the attacker before being removed.' },
  ],
};
