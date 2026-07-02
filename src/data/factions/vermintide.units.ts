import { UnitOption } from '../../types/index.js';

// ==========================================================================
// THE VERMINTIDE
// ==========================================================================
export const ver_clawlord: UnitOption = {
  id: 'ver_clawlord', name: 'Clawlord', baseCost: 60, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LEADER', 'MASTER', 'SKAVEN', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'the_vermintide', unitType: 'elite',
  description: 'Mandatory Vermintide leader. Scheming Skaven warlord.',
  defaultWargear: [], availableWargear: [],
};
export const ver_deathmaster: UnitOption = {
  id: 'ver_deathmaster', name: 'Deathmaster', baseCost: 85, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'INFILTRATOR', 'MASTER', 'SKAVEN', 'STEALTH'],
  baseSize: '25-32mm',
  faction: 'the_vermintide', unitType: 'elite',
  description: 'Elite Skaven assassin. Can teleport via Tunneljack.',
  defaultWargear: [], availableWargear: [],
};
export const ver_warlock: UnitOption = {
  id: 'ver_warlock', name: 'Warlock', baseCost: 45, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'MASTER', 'PSYKER 1', 'SKAVEN'],
  baseSize: '25-32mm',
  faction: 'the_vermintide', unitType: 'elite',
  description: 'Skaven warp-energy psyker. Must equip a PSYCHIC weapon. Purchases powers from Ruin Discipline. Upgrade: Arch-Warlock (+10cr, PSYKER 2, up to 5 powers).',
  defaultWargear: [], availableWargear: [],
};
export const ver_skavenslave: UnitOption = {
  id: 'ver_skavenslave', name: 'Skavenslave', baseCost: 20, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: -1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['FIRETEAM', 'NO PROMOTION', 'SKAVEN'],
  baseSize: '25mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Skaven cannon fodder. Max 2 per MASTER model. Cost 20cr + weapon. Must be equipped with at least one weapon (melee, pistol, armour, or equipment Ã¢â€°Â¤10cr).',
  defaultWargear: [], availableWargear: [],
};
export const ver_clanrat: UnitOption = {
  id: 'ver_clanrat', name: 'Clanrat', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['NO PROMOTION', 'SKAVEN', 'SKIRMISHER'],
  baseSize: '25-28mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Standard Skaven trooper. Upgrades: Night Runner (+15cr, INFILTRATOR STEALTH), Packmaster (+5cr, MASTER), Plague Monk (+10cr), Globodier (+10cr).',
  defaultWargear: [], availableWargear: [],
};
export const ver_stormvermin: UnitOption = {
  id: 'ver_stormvermin', name: 'Stormvermin', baseCost: 45, minCount: 0, maxCount: 5,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MASTER', 'SKAVEN'],
  baseSize: '32mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Elite Skaven guard. Elite Bodyguard: can redirect hits targeting allies within 1".',
  defaultWargear: [], availableWargear: [],
};
export const ver_weapons_team: UnitOption = {
  id: 'ver_weapons_team', name: 'Skaven Weapons Team', baseCost: 40, minCount: 0, maxCount: 3,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['LARGE', 'SKAVEN'],
  baseSize: '60x35mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Skaven crew weapon. Can ignore HEAVY on one ranged weapon.',
  defaultWargear: [], availableWargear: [],
};
export const ver_rat_ogryn: UnitOption = {
  id: 'ver_rat_ogryn', name: 'Rat Ogryn', baseCost: 65, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEAST', 'LARGE', 'LIMITED POTENTIAL', 'SKAVEN', 'STRONG', 'TOUGH'],
  baseSize: '40-50mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Monstrous Skaven brute. Successful Charges inflict a BLOOD MARKER on an enemy.',
  defaultWargear: [], availableWargear: [],
};
export const ver_doom_flayer: UnitOption = {
  id: 'ver_doom_flayer', name: 'Doom Flayer', baseCost: 145, minCount: 0, maxCount: 1,
  stats: { movement: 10, rangedSkill: 1, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['LARGE', 'NO PROMOTION', 'SKAVEN', 'TOUGH', 'VEHICLE'],
  baseSize: '50mm',
  faction: 'the_vermintide', unitType: 'troop',
  description: 'Armoured Skaven war machine. Has one hand for additional weapons (Shield Combo allows two-handed).',
  defaultWargear: [
    { id: 'ver_whirling_blades', name: 'Whirling Blades', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE', 'CRITICAL'],
      description: 'Built-in spinning blades. No hand slots required. Additional +1 INJURY DICE when Charged. Can be used alongside any other melee weapon without off-hand penalties.' },
  ], availableWargear: [],
};
