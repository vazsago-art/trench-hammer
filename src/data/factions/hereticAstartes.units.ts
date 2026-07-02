import { UnitOption } from '../../types/index.js';

// ==========================================================================
// HERETIC ASTARTES
// ==========================================================================
export const ha_chaos_lord: UnitOption = {
  id: 'ha_chaos_lord', name: 'Chaos Lord', baseCost: 115, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE', 'LEADER', 'TOUGH'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Mandatory Chaos Space Marine warlord. (75cr + 40cr Power Armour; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [
    // Death Guard: Lord of Rot upgrades (Chaos Lord takes one of these)
    { id: 'dg_shroud_of_disease', name: 'Shroud of Disease', cost: 20, maxCount: 1,
      requiredSubfactionId: 'death_guard',
      upgradeGroup: 'dg_lord_of_rot',
      description: 'Death Guard only. Ranged attacks made against this model or any of its allies within 3" have -1 DICE to Hit.' },
    { id: 'dg_vector_of_disease', name: 'Vector of Disease', cost: 10, maxCount: 1,
      requiredSubfactionId: 'death_guard',
      upgradeGroup: 'dg_lord_of_rot',
      description: 'Death Guard only. When this model Charges, or an ally ends a Charge within 3" of it, that model gains +1 INJURY DICE with its melee attacks during that Activation.' },
    { id: 'dg_virulent_aura', name: 'Virulent Aura', cost: 15, maxCount: 1,
      requiredSubfactionId: 'death_guard',
      upgradeGroup: 'dg_lord_of_rot',
      description: 'Death Guard only. The ranged weapons of this model and each of its allies within 3" of it gain the CRITICAL Keyword. Attacks that automatically hit or that already have CRITICAL instead have +1 INJURY DICE.' },
  ],
};
export const ha_dark_apostle: UnitOption = {
  id: 'ha_dark_apostle', name: 'Dark Apostle', baseCost: 130, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Chaos preacher bearing the dark word. (70cr + 40cr Power Armour + 20cr Crozius; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
    { id: 'ha_accursed_crozius', name: 'Accursed Crozius', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 2'],
      description: 'The bearer gains the FEAR Keyword.' },
  ], availableWargear: [],
};
export const ha_chaos_sorcerer: UnitOption = {
  id: 'ha_chaos_sorcerer', name: 'Chaos Sorcerer', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'PSYKER 2'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Warp-wielding sorcerer of Chaos. (75cr + 40cr Power Armour; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const ha_warpsmith: UnitOption = {
  id: 'ha_warpsmith', name: 'Warpsmith', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE'],
  baseSize: '60x35mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Dark Mechanicus artificer. (70cr + 40cr Power Armour; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const ha_chaos_cultist: UnitOption = {
  id: 'ha_chaos_cultist', name: 'Chaos Cultist', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FOLLOWER', 'HERETIC ASTARTES'],
  baseSize: '25-28mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Fanatical cultist devoted to the Dark Gods.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    {
      id: 'ha_cultist_goremonger',
      name: 'Goremonger',
      cost: 5,
      maxCount: 99,
      grantedKeywords: ['INFILTRATOR', 'SKIRMISHER'],
      requiredSubfactionId: 'world_eaters',
      description: 'World Eaters only. Up to half of your Jakhals (rounded up) can be upgraded to Goremongers (+5cr). Grants the INFILTRATOR and SKIRMISHER keywords.',
    },
  ],
};
export const ha_chaos_space_marine: UnitOption = {
  id: 'ha_chaos_space_marine', name: 'Chaos Space Marine', baseCost: 95, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['HERETIC ASTARTES'],
  baseSize: '32mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Traitor Space Marine. (55cr + 40cr Power Armour)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost.',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
  upgrades: [
    { id: 'ha_csm_havoc', name: 'Havoc', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Ignore the HEAVY Keyword of one ranged weapon they carry.' },
    { id: 'ha_csm_shrivetalon', name: 'Shrivetalon', cost: 10, maxCount: 2, maxCountLarge: 3,
      forbiddenSubfactionIds: ['emperors_children'],
      grantedKeywords: ['FEAR'],
      description: 'Grants the FEAR Keyword. (Not available to Emperor\'s Children Ã¢â‚¬â€ Elegance rule)' },
    { id: 'ha_csm_raptor', name: 'Raptor', cost: 5, maxCount: 2, maxCountLarge: 3,
      forbiddenSubfactionIds: ['death_guard', 'world_eaters'],
      grantedKeywords: ['SKIRMISHER'],
      description: 'Can be equipped with Jump Packs and Warp Claws (purchased separately). While equipped with a Jump Pack, gains the SKIRMISHER Keyword. (Not available to Death Guard or World Eaters)' },
    { id: 'ha_csm_saboteur', name: 'Saboteur', cost: 10, maxCount: 2, maxCountLarge: 3,
      requiredSubfactionId: 'alpha_legion',
      description: 'Alpha Legion only. Ignores the HEAVY Keyword of Blast Charges. Has NEGATE MINED. Mine Layer ability: As an Action (+2 DICE), mine a touched terrain piece (Ã¢â€°Â¤8"Ãƒâ€”8") Ã¢â‚¬â€ on success it is MINED.' },
    { id: 'ha_csm_flawless_blade', name: 'Flawless Blade', cost: 5, maxCount: 2, maxCountLarge: 3,
      requiredSubfactionId: 'emperors_children',
      description: "Emperor's Children only. +1 DICE to Hit with melee attacks. Cannot use ranged weapons besides Pistols and Grenades." },
    // Night Lords Upgrades
    { id: 'nl_depredator', name: 'Depredator', cost: 5, maxCount: 1,
      requiredSubfactionId: 'night_lords',
      requiredUpgradeId: 'ha_csm_raptor',
      conflictsWithUpgradeIds: ['nl_warp_talon'],
      grantedKeywords: [],
      description: 'Night Lords only (Requires Raptor). Ignore the HEAVY Keyword on one melee weapon.' },
    { id: 'nl_warp_talon', name: 'Warp Talon', cost: 10, maxCount: 2,
      requiredSubfactionId: 'night_lords',
      requiredUpgradeId: 'ha_csm_raptor',
      conflictsWithUpgradeIds: ['nl_depredator'],
      grantedKeywords: ['DEEP STRIKE'],
      description: 'Night Lords only (Requires Raptor). Grants DEEP STRIKE.' },
    // Death Guard: Plague Marine Champion upgrades (each grants ELITE; model takes one, max 2 per warband)
    { id: 'dg_plague_champ_extraction', name: 'Extraction of Fresh Disease', cost: 15, maxCount: 2,
      requiredSubfactionId: 'death_guard',
      grantedKeywords: ['ELITE'],
      upgradeGroup: 'dg_plague_champion',
      description: 'Death Guard only. Plague Marine Champion (gains ELITE). When this model takes an enemy model Out of Action in melee, one other enemy within 6" of it suffers 1 INFECTION MARKER.' },
    { id: 'dg_plague_champ_malicious', name: 'Malicious Calculations', cost: 15, maxCount: 2,
      requiredSubfactionId: 'death_guard',
      grantedKeywords: ['ELITE'],
      upgradeGroup: 'dg_plague_champion',
      description: 'Death Guard only. Plague Marine Champion (gains ELITE). BLOOD MARKERS cannot be spent on the attacks of this model or any of its allies within 3" of it.' },
    { id: 'dg_plague_champ_putrefying', name: 'Putrefying Stink', cost: 15, maxCount: 2,
      requiredSubfactionId: 'death_guard',
      grantedKeywords: ['ELITE'],
      upgradeGroup: 'dg_plague_champion',
      description: 'Death Guard only. Plague Marine Champion (gains ELITE). Enemy models that charge this model or one of its allies within 3" of it do not add a D6 to their charge roll and must use only their normal movement distance.' },
    { id: 'dg_plague_champ_narthecium', name: 'Tainted Narthecium', cost: 10, maxCount: 2,
      requiredSubfactionId: 'death_guard',
      grantedKeywords: ['ELITE'],
      upgradeGroup: 'dg_plague_champion',
      description: 'Death Guard only. Plague Marine Champion (gains ELITE). As an Action (+1 DICE Success Roll), heal itself or a NURGLE model within 1": remove 1 BLOOD MARKER (or 3 on critical success).' },
    { id: 'dg_plague_champ_tocsin', name: 'Tocsin of Misery', cost: 15, maxCount: 2,
      requiredSubfactionId: 'death_guard',
      grantedKeywords: ['ELITE'],
      upgradeGroup: 'dg_plague_champion',
      description: 'Death Guard only. Plague Marine Champion (gains ELITE). At the end of each Turn, each enemy within 3" of this model that has at least 1 BLOOD MARKER gains an additional BLOOD MARKER.' },
  ],
};
export const ha_possessed: UnitOption = {
  id: 'ha_possessed', name: 'Possessed', baseCost: 95, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'HERETIC ASTARTES', 'LARGE', 'LIMITED POTENTIAL'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Daemon-possessed Chaos Marine. (55cr + 40cr Power Armour; can also equip melee weapons, armour, equipment, or Marks of Chaos)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER', 'IMPERVIOUS'], description: 'Included in cost. Daemonic Armour Ã¢â‚¬â€ Power Armour has IMPERVIOUS.',
      statModifiers: { armourSave: -2 } },
    { id: 'ha_mutated_claw', name: 'Mutated Claw', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['CRITICAL'],
      description: 'Daemonic natural weapon. Takes up one hand. The Possessed can also be equipped with melee weapons, armour, equipment, or Marks of Chaos.' },
  ], availableWargear: [],
  upgrades: [
    { id: 'nl_curseclaw', name: 'Curseclaw (Jump Pack)', cost: 20, maxCount: 1,
      requiredSubfactionId: 'night_lords',
      grantedKeywords: ['FLYING'],
      statModifiers: { movement: 2 },
      description: 'Night Lords only. Equipped with Jump Pack (+2" Move, FLYING).' },
  ],
};
export const ha_chaos_terminator: UnitOption = {
  id: 'ha_chaos_terminator', name: 'Chaos Terminator', baseCost: 145, minCount: 0, maxCount: 2, maxCountLarge: 3,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'HERETIC ASTARTES', 'LARGE', 'STRONG', 'VEHICLE'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Elite warrior in ancient Chaos Terminator armour. (75cr + 70cr Terminator Armour; 0-3 at 1200cr+)',
  defaultWargear: [
    { id: 'terminator_armour', name: 'Terminator Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-3 INJURY MODIFIER', 'DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
      description: 'Included in cost. This armour does not count towards any LIMIT.',
      grantsKeywords: ['DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
      statModifiers: { armourSave: -3 } },
  ], availableWargear: [],
};
export const ha_helbrute: UnitOption = {
  id: 'ha_helbrute', name: 'Helbrute', baseCost: 165, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'FOLLOWER', 'HERETIC ASTARTES', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Insane warrior entombed in a corrupted Dreadnought. (Armour plating included in cost)',
  defaultWargear: [
    { id: 'ha_helbrute_fists', name: 'Helbrute Fists', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
      description: 'Count as Two-Handed Hammers in melee. If equipped only with ranged weapons also counts as a close combat weapon.' },
  ], availableWargear: [],
  // Rule: equipping a Helbrute Hammer or Power Scourge (the only melee options) replaces the fists
  weaponReplacementRules: [
    { replacedDefaultId: 'ha_helbrute_fists', whenAddingWeaponType: 'melee' },
  ],
};

// -- Heretic Astartes Warband Variant: Death Guard --
export const ha_poxwalker: UnitOption = {
  id: 'ha_poxwalker', name: 'Poxwalker', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FEAR', 'FOLLOWER', 'HERETIC ASTARTES', 'NEGATE GAS', 'NO PROMOTION', 'NURGLE'],
  baseSize: '25-28mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Death Guard only. Shambling plague-zombie. Cannot take any weapons, armour, or equipment (counts as Close Combat Weapon).',
  defaultWargear: [], availableWargear: [],
  cannotEquip: true,
};
export const ha_foetid_blight_drone: UnitOption = {
  id: 'ha_foetid_blight_drone', name: 'Foetid Blight-Drone', baseCost: 180, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['FEAR', 'FLYING', 'FOLLOWER', 'HERETIC ASTARTES', 'LARGE', 'NO PROMOTION', 'NURGLE', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Death Guard only. Hovering daemon engine. Choose one: Fleshmower (+0cr), Twin Plague Spewers (+45cr), or Twin Blight Launchers (+55cr). Cannot be taken with a Helbrute.',
  defaultWargear: [
    { id: 'ha_blight_drone_slam', name: 'Slam', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['INFECTION MARKERS'],
      description: 'Equipped when no other melee weapon is taken.' },
  ], availableWargear: [],
  weaponReplacementRules: [
    { replacedDefaultId: 'ha_blight_drone_slam', whenAddingWeaponType: 'melee' },
  ],
};

// -- Heretic Astartes Warband Variant: Emperor's Children --
export const ha_lord_kakophonist: UnitOption = {
  id: 'ha_lord_kakophonist', name: 'Lord Kakophonist', baseCost: 105, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE', 'SLAANESH'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: "Emperor's Children only. (65cr + 40cr Power Armour + Mark of Slaanesh; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_slaanesh_kak', name: 'Mark of Slaanesh', type: 'equipment', slot: 'mark', cost: 0,
      keywords: ['MARK OF CHAOS', 'SLAANESH'], description: '+2" movement speed, +1 DICE to all Dash Success Rolls. Grants SLAANESH keyword. Included in base cost.',
      statModifiers: { movement: 2 }, grantsKeywords: ['SLAANESH'] },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};

// -- Heretic Astartes Warband Variant: Renegade Space Marines --
export const ha_renegade_apothecary: UnitOption = {
  id: 'ha_renegade_apothecary', name: 'Renegade Apothecary', baseCost: 110, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Renegade Space Marines only. (70cr + 40cr Power Armour; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
    { id: 'ha_narthecium', name: 'Narthecium', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['ARMOUR PIERCING 1', 'HELD'],
      description: 'Included in cost. As an Action (+1 DICE), heal self or friendly ASTARTES within 1": remove 1 (or 3 on Critical) BLOOD MARKERS.' },
  ], availableWargear: [],
};

// -- Heretic Astartes Warband Variant: Thousand Sons --
export const ha_exalted_sorcerer: UnitOption = {
  id: 'ha_exalted_sorcerer', name: 'Exalted Sorcerer', baseCost: 125, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE', 'LEADER', 'PSYKER 3', 'TOUGH', 'TZEENTCH'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Thousand Sons only Ã¢â‚¬â€ mandatory Warband leader. (85cr + 40cr Power Armour + Mark of Tzeentch; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'mark_of_tzeentch', name: 'Mark of Tzeentch', type: 'equipment', slot: 'mark', cost: 0,
      keywords: ['MARK OF CHAOS', 'TZEENTCH'], description: 'Ranged attacks have +1 INJURY MODIFIER. Grants TZEENTCH keyword. Included in base cost.',
      grantsKeywords: ['TZEENTCH'] },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const ha_tzaangor_shaman: UnitOption = {
  id: 'ha_tzaangor_shaman', name: 'Tzaangor Shaman', baseCost: 60, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEASTMEN', 'ELITE', 'FOLLOWER', 'HERETIC ASTARTES', 'PSYKER 1', 'TZEENTCH'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'Thousand Sons only. Must equip exactly one PSYCHIC weapon. Can equip any armour or equipment from HA Armoury including Shields.',
  defaultWargear: [
    { id: 'ha_baleful_devolution', name: 'Baleful Devolution', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['PSYCHIC'],
      description: 'Psychic ability (Effect): 12", One Enemy, Immediate Ã¢â‚¬â€ target gains 1 STUN MARKER (or D3 on Critical Success).' },
  ], availableWargear: [],
};
export const ha_tzaangor: UnitOption = {
  id: 'ha_tzaangor', name: 'Tzaangor', baseCost: 40, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEASTMEN', 'FOLLOWER', 'HERETIC ASTARTES', 'LIMITED POTENTIAL', 'SKIRMISHER', 'TZEENTCH'],
  baseSize: '32mm',
  faction: 'heretic_astartes', unitType: 'troop',
  description: 'Thousand Sons only. Can equip Pistols, melee weapons, armour (including Shields), or equipment from HA Armoury.',
  defaultWargear: [], availableWargear: [],
};

// -- Heretic Astartes Warband Variant: World Eaters --
export const ha_master_of_executions: UnitOption = {
  id: 'ha_master_of_executions', name: 'Master of Executions', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'KHORNE', 'LARGE', 'STRONG'],
  baseSize: '40mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'World Eaters only. (75cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'mark_of_khorne', name: 'Mark of Khorne', type: 'equipment', slot: 'mark', cost: 0,
      keywords: ['MARK OF CHAOS', 'KHORNE'], description: 'Melee attacks have +1 INJURY MODIFIER. Grants KHORNE keyword. Included in base cost.',
      grantsKeywords: ['KHORNE'] },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],
};
export const ha_slaughterbound: UnitOption = {
  id: 'ha_slaughterbound', name: 'Slaughterbound', baseCost: 175, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 3, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'ELITE', 'FEAR', 'HERETIC ASTARTES', 'KHORNE', 'LARGE', 'LIMITED POTENTIAL', 'REGENERATE 1', 'TOUGH'],
  baseSize: '32mm',
  faction: 'heretic_astartes', unitType: 'elite',
  description: 'World Eaters only. (135cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)',
  defaultWargear: [
    { id: 'mark_of_khorne', name: 'Mark of Khorne', type: 'equipment', slot: 'mark', cost: 0,
      keywords: ['MARK OF CHAOS', 'KHORNE'], description: 'Melee attacks have +1 INJURY MODIFIER. Grants KHORNE keyword. Included in base cost.',
      grantsKeywords: ['KHORNE'] },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
    { id: 'ha_daemonic_claw', name: 'Daemonic Claw', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['+2 INJURY DICE', 'CRITICAL', 'RISKY', 'HELD'],
      description: 'Included in cost. Always takes up one hand for melee and ranged.' },
  ], availableWargear: [],
};
