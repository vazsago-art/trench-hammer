import { UnitOption } from '../../types/index.js';

// ==========================================================================
// THOUSAND SONS (standalone faction Ã¢â‚¬â€ formerly Heretic Astartes variant)
// ==========================================================================
// Based on 2026-06-07 full writeup. All HERETIC ASTARTES TZEENTCH units include Mark of Tzeentch.
const TS_PA = { id: 'power_armour', name: 'Power Armour', type: 'armor' as const, slot: 'body-armour' as const, cost: 0,
  keywords: ['-2 INJURY MODIFIER'], description: 'Mandatory Power Armour (included in unit cost).', statModifiers: { armourSave: -2 } };
const TS_TA = { id: 'terminator_armour', name: 'Terminator Armour', type: 'armor' as const, slot: 'body-armour' as const, cost: 0,
  keywords: ['-3 INJURY MODIFIER', 'DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'],
  description: 'Included in cost. This armour does not count towards any LIMIT.',
  grantsKeywords: ['DEEP STRIKE', 'STRONG', 'VEHICLE', 'LARGE'], statModifiers: { armourSave: -3 } };

const ability_AS = { id: 'ts_arcane_shield', name: 'Arcane Shield', type: 'aura' as const, description: 'The first -1 of the Exalted Sorcerer\'s Armour, and the first -1 of the Armour of its TZEENTCH allies within 6" of it, have IMPERVIOUS.' };
const ability_BC = { id: 'ts_black_carapace', name: 'Black Carapace', type: 'passive' as const, description: 'This model treats any Down result from the Injury Roll Table as a Minor Hit instead. This does not apply to Down results that already replaced another result.' };
const ability_MOT = { id: 'ts_mark_of_tzeentch', name: 'Mark of Tzeentch', type: 'passive' as const, description: 'The model’s non-THROWN ranged attacks made at Long Range (even if they ignore the penalty or automatically hit) have +1 INJURY MODIFIER.' };
const ability_BP = { id: 'ts_bestial_prophet', name: 'Bestial Prophet', type: 'aura' as const,
      description: 'Each other friendly BEASTMEN model within 6" of the Tzaangor Shaman has +1 DICE to Hit with all attacks.' };
const ability_SB = { id: 'ts_sacrificial_blessing', name: 'Sacrificial Blessing', type: 'action' as const,
      description: 'When this model takes a PSYCHIC Success Roll or makes a PSYCHIC attack, you can choose one friendly BEASTMEN model within 1" to sacrifice (taken Out of Action). The Tzaangor Shaman has +2 DICE to the Success Roll.' };


export const ts_exalted_sorcerer: UnitOption = {
  id: 'ts_exalted_sorcerer', name: 'Exalted Sorcerer', baseCost: 160, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'LARGE', 'LEADER', 'NEGATE FEAR', 'PSYKER 3', 'TOUGH', 'TZEENTCH'],
  baseSize: '40mm', faction: 'thousand_sons', unitType: 'elite',
  description: 'Thousand Sons mandatory warband leader. (120cr + 40cr Power Armour). Can swap to Terminator Armour for +25cr.\nMay purchase up to five powers from the Change Psychic Discipline and/or Vengeance Psychic Discipline, and must purchase at least 2 powers in total.',
  abilities: [ability_AS, ability_BC, ability_MOT],
  defaultWargear: [TS_PA], availableWargear: [],
};
export const ts_chaos_sorcerer: UnitOption = {
  id: 'ts_chaos_sorcerer', name: 'Chaos Sorcerer', baseCost: 145, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'HERETIC ASTARTES', 'NEGATE FEAR','PSYKER 2', 'TZEENTCH'],
  baseSize: '40mm', faction: 'thousand_sons', unitType: 'elite',
  description: 'Thousand Sons sorcerer (up to 2). (105cr + 40cr Power Armour). Can swap to Terminator Armour for +25cr.\nMay purchase up to four powers from the Change Psychic Discipline or Vengeance Psychic Discipline, and must purchase at least 1 power in total.',
  abilities: [
    ability_BC,
    ability_MOT,
  ],
  defaultWargear: [TS_PA], availableWargear: [],
};
export const ts_tzaangor_shaman: UnitOption = {
  id: 'ts_tzaangor_shaman', name: 'Tzaangor Shaman', baseCost: 60, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEASTMEN', 'ELITE', 'HERETIC ASTARTES', 'PSYKER 1', 'TZEENTCH'],
  baseSize: '32-40mm', faction: 'thousand_sons', unitType: 'elite',
  description: 'Thousand Sons beastman psyker. Must equip exactly one PSYCHIC weapon.\nMay purchase up to three powers from the Change Psychic Discipline or Vengeance Psychic Discipline, and must purchase at least 1 power in total.',
  abilities: [
    ability_BP, ability_SB
  ],
  defaultWargear: [], availableWargear: [],
};
export const ts_tzeentch_cultist: UnitOption = {
  id: 'ts_tzeentch_cultist', name: 'Tzeentch Cultist', baseCost: 30, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['HERETIC ASTARTES', 'TZEENTCH', 'NO PROMOTION'],
  baseSize: '25-28mm', faction: 'thousand_sons', unitType: 'troop',
  description: 'Chaos Cultist devoted to Tzeentch (30cr, mark included). Max = number of other non-merc models.',
  abilities: [
    { id: 'ts_expendable', name: 'Expendable', type: 'passive' as const,
      description: 'The Tzeentch Cultist is not counted as part of your Warband for the purposes of Morale.' },
    { id: 'ts_for_the_lord_of_change', name: 'For the Lord of Change!', type: 'passive' as const,
      description: 'When the Tzeentch Cultist is taken Out of Action, you can give a BLESSING MARKER to one other friendly TZEENTCH model on the battlefield.' },
    { id: 'ts_mark_of_tzeentch', name: 'Mark of Tzeentch', type: 'passive' as const,
      description: 'The model’s non-THROWN ranged attacks made at Long Range (even if they ignore the penalty or automatically hit) have +1 INJURY MODIFIER.' },
    ],
  defaultWargear: [], availableWargear: [],
};
export const ts_tzaangor: UnitOption = {
  id: 'ts_tzaangor', name: 'Tzaangor', baseCost: 40, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEASTMEN', 'HERETIC ASTARTES', 'LIMITED POTENTIAL', 'SKIRMISHER', 'TZEENTCH'],
  baseSize: '32mm', faction: 'thousand_sons', unitType: 'troop',
  description: 'Beastman mutant of Tzeentch. Can equip Pistols, Fatecater Greatbow, melee weapons, armour including Shields, or equipment from the Thousand Sons Armoury.',
  defaultWargear: [], availableWargear: [],
};
export const ts_rubric_marine: UnitOption = {
  id: 'ts_rubric_marine', name: 'Rubric Marine', baseCost: 115, minCount: 0, maxCount: 99,
  stats: { movement: 5, rangedSkill: 2, meleeSkill: 2, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['HERETIC ASTARTES', 'NEGATE FEAR', 'TZEENTCH'],
  baseSize: '32mm', faction: 'thousand_sons', unitType: 'troop',
  description: 'Thousand Sons Rubric Marine. (75cr + 40cr Power Armour, movement 5")',
  abilities: [
    ability_BC,
    ability_MOT,
    { id: 'ts_rm_sorcery_powered', name: 'Sorcery Powered', type: 'passive' as const,
      description: 'When Activated, if the Rubric Marine is within 6” of one of your PSYKER models (including itself), it has +1 DICE to all Dash actions during that Activation.' },
  ],
  defaultWargear: [TS_PA], availableWargear: [],
  upgrades: [
    { id: 'ts_csm_havoc', name: 'Havoc', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Ignore the HEAVY Keyword of one ranged weapon they carry.' },
  ],
};
export const ts_scarab_occult_terminator: UnitOption = {
  id: 'ts_scarab_occult_terminator', name: 'Scarab Occult Terminator', baseCost: 155, minCount: 0, maxCount: 2, maxCountLarge: 3,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DEEP STRIKE', 'HERETIC ASTARTES', 'NEGATE FEAR', 'LARGE', 'STRONG', 'TZEENTCH', 'VEHICLE'],
  baseSize: '40mm', faction: 'thousand_sons', unitType: 'troop',
  description: 'Terminator-armoured Thousand Sons warrior. (90cr + 65cr Terminator Armour; 0-3 at 1200cr+)\nCan be equipped with a Hellfyre Missile Rack only if it already has another ranged weapon, and it cannot attack with both at the same time',
  abilities: [
    ability_BC,
    { id: 'ts_rites_of_coalescence', name: 'Rites of Coalescence', type: 'passive' as const,
      description: 'While the Scarab Occult Terminator is within 6” of one of your PSYKER models (including itself), Critical Hits do not grant the normal +1 INJURY DICE against it. The CRITICAL Keyword still functions normally.' },
    ability_MOT,
    { id: 'ts_terminator_armour', name: 'Terminator Armour', type: 'passive' as const,
      description: 'The Scarab Occult Terminator can wield a TWO-HANDED ranged weapon in one hand instead of a TWO-HANDED melee weapon due to its STRONG Keyword. Due to the bulk of its armour, the Chaos Terminator rolls only a D3 for extra charge distance instead of a D6.' },
  ],
  defaultWargear: [TS_TA], availableWargear: [],
};
export const ts_sekhetar_robot: UnitOption = {
  id: 'ts_sekhetar_robot', name: 'Sekhetar Robot', baseCost: 170, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'HERETIC ASTARTES', 'INFILTRATOR', 'LARGE', 'NEGATE GAS', 'NEGATE FEAR', 'NO PROMOTION', 'SEKHETAR_ROBOT', 'STEALTH', 'STRONG', 'TOUGH', 'TZEENTCH'],
  baseSize: '40mm',
  faction: 'thousand_sons', unitType: 'troop',
  description: 'The Sekhetar Robot is equipped with armour plating and a Hellfyre Missile Rack, included in its cost and statistics above. It can be equipped with any Basic melee weapons, a Power Claw, and any ranged weapons from the Thousand Sons Armoury. It can carry up to two TWO-HANDED ranged weapons, only one of which can be HEAVY, but cannot hold a TWO-HANDED melee weapon in one hand, and if it carries a HEAVY ranged weapon in one hand, that hand cannot hold a melee weapon. It can be equipped with a Heavy Flamer, ignoring the normal limits.',
  abilities: [
    { id: 'ts_robotic_armaments', name: 'Robotic Armaments', type: 'passive' as const,
      description: 'While equipped with two ranged weapons besides its Hellfyre Missile Rack, the Sekhetar Robot can make a Shoot Action with both of them during its Activation. It cannot fire any other weapon if it attacks with its Hellfyre Missile Rack.' },
    { id: 'ts_prophetic_sentinel', name: 'Prophetic Sentinel', type: 'passive' as const,
      description: 'When an enemy model Charges this model, it can make a single ranged attack against that enemy before it moves with a weapon other than its Hellfyre Missile Rack.' },
  ],
  defaultWargear: [
    { id: 'armour_plating_sekhetar_ts', name: 'Armour Plating', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost.',
      statModifiers: { armourSave: -2 } },
    { id: 'hellfyre_missile_rack_ts', name: 'Hellfyre Missile Rack', type: 'ranged', cost: 0, handedness: 'no-hands',
      keywords: ['36"', 'IGNORE COVER', 'FIRE', 'HEAVY', 'THROWN'],
      description: 'Included in cost. 36", IGNORE COVER, FIRE. Cannot be fired with another weapon.' } as unknown as import('../../types/index.js').Weapon,
  ], availableWargear: [],
};
export const ts_helbrute: UnitOption = {
  id: 'ts_helbrute', name: 'Helbrute', baseCost: 185, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 3, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FEAR', 'HERETIC ASTARTES', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH', 'TZEENTCH', 'VEHICLE'],
  baseSize: '60mm', faction: 'thousand_sons', unitType: 'troop',
  description: 'The Helbrute’s plating provides it armour, included in the statistics above. Its empty fists count as Two-Handed Hammers in melee. It can optionally be equipped with either a Helbrute Hammer or Power Scourge, replacing one of its fists, and up to one HEAVY ranged weapon, which must be purchased separately. It cannot use any other weapons, armour, or equipment.',
  abilities: [
    { id: 'ts_hb_crazed', name: 'Crazed', type: 'passive' as const, description: 'The Helbrute cannot Retreat from melee combat.' },
    ability_MOT,
  ],
  defaultWargear: [
    { id: 'ts_helbrute_fists', name: 'Helbrute Fists', type: 'melee' as const, cost: 0, handedness: 'two-handed' as const,
      keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'], description: 'Count as Two-Handed Hammers in melee.' },
  ], availableWargear: [],
  weaponReplacementRules: [{ replacedDefaultId: 'ts_helbrute_fists', whenAddingWeaponType: 'melee' }],
};
