import { UnitOption } from '../../types/index.js';

// ==========================================================================
// ORKS
// ==========================================================================
export const or_warboss: UnitOption = {
  id: 'or_warboss', name: 'Warboss', baseCost: 80, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 3, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'LEADER', 'ORK', 'STRONG', 'TOUGH'],
  baseSize: '40mm',
  faction: 'orks', unitType: 'elite',
  description: 'Mandatory biggest and meanest Ork.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'or_painboss', name: 'Painboss', cost: 30, maxCount: 1,
      description: 'Gains Bioniks (Cyberteknika access), Dok\'s Toolz (-1 DICE to injury rolls against itself), and Sawbonez (can restore a model to 1 Wound). Cannot wear Mega Armour; melee attacks reduced to +2 DICE.' },
  ],
};
export const or_big_mek: UnitOption = {
  id: 'or_big_mek', name: 'Big Mek', baseCost: 70, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LARGE', 'ORK', 'STRONG'],
  baseSize: '40mm',
  faction: 'orks', unitType: 'elite',
  description: 'Ork mekanic and inventor. Kustom Force Field: -1 DICE to injury rolls against itself.',
  defaultWargear: [], availableWargear: [],
};
export const or_weirdboy: UnitOption = {
  id: 'or_weirdboy', name: 'Weirdboy', baseCost: 40, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'ORK', 'PSYKER 0'],
  baseSize: '40mm',
  faction: 'orks', unitType: 'elite',
  description: 'Warp-touched Ork psyker. (35cr + 5cr staff). Deadly Demise: Explodes 3" on death. Waaagh! Energy: +1 Psyker level per friendly Ork within 6".',
  defaultWargear: [
    { id: 'or_weirdboy_staff', name: 'Weirdboy Staff', type: 'melee', cost: 0, handedness: 'one-handed',
      keywords: ['+1 DICE', 'HELD', 'PSYCHIC'],
      description: 'MAIN HAND ONLY. +1 Injury Dice vs DAEMON and PSYKER targets. HELD Ã¢â‚¬â€ occupies a hand slot. Included in unit cost.' },
  ], availableWargear: [],
};
export const or_gretchin: UnitOption = {
  id: 'or_gretchin', name: 'Gretchin', baseCost: 25, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ORK', 'STEALTH'],
  baseSize: '25mm',
  faction: 'orks', unitType: 'troop',
  description: 'Small sneaky Greenskin. Max count = non-Gretchin non-Squig models.',
  defaultWargear: [], availableWargear: [],
};
export const or_boy: UnitOption = {
  id: 'or_boy', name: 'Boy', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ORK'],
  baseSize: '32mm',
  faction: 'orks', unitType: 'troop',
  description: 'Standard Ork warrior.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'or_runtherd', name: 'Runtherd', cost: 5, maxCount: 1,
      description: 'Friendly Gretchin within 6" ignore Cowardice and have +2 DICE to Hit with melee weapons (Ya Filthy Grots!).' },
    { id: 'or_kommando_boy', name: 'Kommando', cost: 10, maxCount: 2, maxCountLarge: 3,
      grantedKeywords: ['INFILTRATOR', 'STEALTH'],
      description: 'Gains INFILTRATOR and STEALTH Keywords.' },
    { id: 'or_mek_boy', name: 'Mek', cost: 5, maxCount: 2, maxCountLarge: 3,
      description: 'Can ignore the HEAVY property of one Kustom Mega-Blasta, Shokka Pistol, Shokk Attack Gun, Traktor Blasta, or Zzap Gun.' },
    { id: 'or_stormboy', name: 'Stormboy', cost: 0, maxCount: 2, maxCountLarge: 3,
      description: 'Can use Jump Rokkits. Must be equipped with a Jump Rokkit to be deployed.' },
  ],
};
export const or_nob: UnitOption = {
  id: 'or_nob', name: 'Nob', baseCost: 50, minCount: 0, maxCount: 4,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['LARGE', 'ORK', 'STRONG'],
  baseSize: '40mm',
  faction: 'orks', unitType: 'troop',
  description: 'Big tough Ork veteran.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'or_kommando_nob', name: 'Kommando Nob', cost: 10, maxCount: 1,
      grantedKeywords: ['INFILTRATOR', 'STEALTH'],
      description: 'Gains INFILTRATOR and STEALTH Keywords.' },
    { id: 'or_stormboy_nob', name: 'Stormboy Nob', cost: 0, maxCount: 1,
      description: 'Can use Jump Rokkits. Must be equipped with a Jump Rokkit to be deployed.' },
  ],
};
export const or_squig: UnitOption = {
  id: 'or_squig', name: 'Squig', baseCost: 30, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['BEAST', 'NO PROMOTION', 'ORK'],
  baseSize: '25mm',
  faction: 'orks', unitType: 'troop',
  description: 'Bouncy Ork beast. Sprinta: +1 DICE to Dash. Squig Farm: Replacement costs 5cr.',
  defaultWargear: [
    { id: 'or_squig_jaws', name: 'Squig Jaws', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['SHRAPNEL'],
      description: 'Natural gnashing attack. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};
export const or_deff_dread: UnitOption = {
  id: 'or_deff_dread', name: 'Deff Dread', baseCost: 180, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 2, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['ORK', 'NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 'orks', unitType: 'troop',
  description: 'Ramshackle Ork walker. Deadly Demise: Explodes 3" on death. Dead Shooty: Can shoot with 2 ranged weapons.',
  defaultWargear: [
    { id: 'or_dread_klaws', name: 'Dread Klaws', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['DEADLY', 'HEAVY', 'RISKY', 'TWO-HANDED'],
      description: 'Massive crushing klaws built into the Deff Dread chassis.' },
  ], availableWargear: [],
};
export const or_squighog_boy: UnitOption = {
  id: 'or_squighog_boy', name: 'Squighog Boy', baseCost: 105, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 0, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['LARGE', 'MOUNTED', 'ORK', 'STRONG', 'TOUGH'],
  baseSize: '75x42mm',
  faction: 'orks', unitType: 'troop',
  description: 'Da Big Hunt variant unit. Wild Ride: +4" to Dash.',
  defaultWargear: [
    { id: 'or_squighog_jaws', name: 'Squighog Jaws', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['ARMOUR PIERCING 1', 'SHRAPNEL'],
      description: 'Natural gnashing attack. Use in addition to other weapons.' },
  ], availableWargear: [],
};
