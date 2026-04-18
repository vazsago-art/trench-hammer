import { Weapon } from '../types/index.js';

// ============================================================================
// BASIC RANGED WEAPONS
// Source: Shared Battlekit, costs from faction armouries
// ============================================================================
export const sharedBasicRangedWeapons: Weapon[] = [
  {
    id: 'autogun',
    name: 'Autogun',
    type: 'ranged',
    range: 24,
    cost: 20,
    limit: 2,
    keywords: ['AUTOMATIC 2', '-1 INJURY DICE', 'ASSAULT', 'TWO-HANDED'],
    description: '24" AUTOMATIC 2, -1 INJURY DICE, ASSAULT, TWO-HANDED. Has Bayonet Lug and Scope.'
  },
  {
    id: 'automatic_shotgun',
    name: 'Automatic Shotgun',
    type: 'ranged',
    range: 12,
    cost: 15,
    keywords: ['+1 DICE', 'ASSAULT', 'SHOTGUN', 'TWO-HANDED'],
    description: '12" +1 DICE, ASSAULT, SHOTGUN, TWO-HANDED. Has Bayonet Lug and Shield Combo.'
  },
  {
    id: 'blunderbuss',
    name: 'Blunderbuss',
    type: 'ranged',
    range: 10,
    cost: 0,
    handedness: 'two-handed',
    keywords: ['SHRAPNEL', 'TWO-HANDED'],
    description: '10" SHRAPNEL, TWO-HANDED. Has Shield Combo. Fixed kit of the Deep Hive Hunter mercenary — not purchasable from any armoury.'
  },
  {
    id: 'bolt_carbine',
    name: 'Bolt Carbine',
    type: 'ranged',
    range: 18,
    cost: 15,
    keywords: ['VICIOUS 11', 'ASSAULT', 'CRITICAL', 'TWO-HANDED'],
    description: '18" VICIOUS 11, ASSAULT, CRITICAL, TWO-HANDED. Has Scope.'
  },
  {
    id: 'boltgun',
    name: 'Boltgun',
    type: 'ranged',
    range: 24,
    cost: 12,
    keywords: ['VICIOUS 11', 'CRITICAL', 'TWO-HANDED'],
    description: '24" VICIOUS 11, CRITICAL, TWO-HANDED. Has Scope.'
  },
  {
    id: 'las_carbine',
    name: 'Las Carbine',
    type: 'ranged',
    range: 18,
    cost: 10,
    keywords: ['ASSAULT', 'TWO-HANDED'],
    description: '18" ASSAULT, TWO-HANDED. Has Bayonet Lug and Scope.'
  },
  {
    id: 'las_rifle',
    name: 'Las Rifle',
    type: 'ranged',
    range: 24,
    cost: 5,
    keywords: ['TWO-HANDED'],
    description: '24" TWO-HANDED. Has Bayonet Lug and Scope.'
  },
  {
    id: 'shotgun',
    name: 'Shotgun',
    type: 'ranged',
    range: 12,
    cost: 10,
    keywords: ['+1 DICE', 'SHOTGUN', 'TWO-HANDED'],
    description: '12" +1 DICE, SHOTGUN, TWO-HANDED. Has Bayonet Lug and Shield Combo.'
  },
];

// ============================================================================
// PISTOLS
// ============================================================================
export const sharedPistols: Weapon[] = [
  {
    id: 'archeotech_pistol',
    name: 'Archeotech Pistol',
    type: 'ranged',
    range: 12,
    cost: 15,
    keywords: ['PISTOL', 'MASTER-CRAFTED', 'RENDING']
  },
  {
    id: 'assault_bolter',
    name: 'Assault Bolter',
    type: 'ranged',
    range: 12,
    cost: 15,
    keywords: ['VICIOUS 11', 'ASSAULT', 'CRITICAL', 'PISTOL'],
    description: '12" VICIOUS 11, ASSAULT, CRITICAL, PISTOL.'
  },
  {
    id: 'autopistol',
    name: 'Autopistol',
    type: 'ranged',
    range: 12,
    cost: 10,
    keywords: ['ASSAULT', 'PISTOL'],
    description: '12" ASSAULT, PISTOL. Has Scope.'
  },
  {
    id: 'bolt_pistol',
    name: 'Bolt Pistol',
    type: 'ranged',
    range: 12,
    cost: 10,
    keywords: ['VICIOUS 11', 'CRITICAL', 'PISTOL'],
    description: '12" VICIOUS 11, CRITICAL, PISTOL. Has Scope.'
  },
  {
    id: 'condemnor_bolt_pistol',
    name: 'Condemnor Bolt Pistol',
    type: 'ranged',
    range: 12,
    cost: 15,
    limit: 2,
    keywords: ['CRITICAL', 'PISTOL'],
    description: 'Bolt mode: 12" VICIOUS 11, CRITICAL. Crossbow: +1 INJURY DICE vs DAEMON/PSYKER, once per battle. PISTOL.'
  },
  {
    id: 'grav_pistol',
    name: 'Grav Pistol',
    type: 'ranged',
    range: 12,
    cost: 20,
    keywords: ['-1 INJURY DICE', 'IGNORE ARMOUR', 'STUN', 'PISTOL'],
    description: '12" -1 INJURY DICE, IGNORE ARMOUR, STUN, PISTOL. Has Scope.'
  },
  {
    id: 'hand_flamer',
    name: 'Hand Flamer',
    type: 'ranged',
    range: 6,
    cost: 20,
    limit: 1,
    keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-2 INJURY DICE', 'FIRE', 'PISTOL'],
    description: '6" FLAMETHROWER, IGNORE ARMOUR, -2 INJURY DICE, FIRE, PISTOL. Loses FLAMETHROWER in melee.'
  },
  {
    id: 'heavy_bolt_pistol',
    name: 'Heavy Bolt Pistol',
    type: 'ranged',
    range: 12,
    cost: 30,
    limit: 2,
    keywords: ['+1 INJURY DICE', 'VICIOUS 11', 'CRITICAL', 'HEAVY', 'PISTOL'],
    description: '12" +1 INJURY DICE, VICIOUS 11, CRITICAL, HEAVY, PISTOL. TWO-HANDED for non-STRONG models.'
  },
  {
    id: 'hotshot_laspistol',
    name: 'Hotshot Laspistol',
    type: 'ranged',
    range: 12,
    cost: 25,
    limit: 1,
    keywords: ['+1 INJURY MODIFIER', 'RISKY', 'PISTOL'],
    description: '12" +1 INJURY MODIFIER, RISKY, PISTOL. Has Scope.'
  },
  {
    id: 'inferno_pistol',
    name: 'Inferno Pistol',
    type: 'ranged',
    range: 6,
    cost: 1,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['IGNORE ARMOUR', 'RISKY', 'PISTOL'],
    description: '6" IGNORE ARMOUR, RISKY, PISTOL.'
  },
  {
    id: 'laspistol',
    name: 'Laspistol',
    type: 'ranged',
    range: 12,
    cost: 6,
    keywords: ['PISTOL'],
    description: '12" PISTOL. Has Scope.'
  },
  {
    id: 'needle_pistol',
    name: 'Needle Pistol',
    type: 'ranged',
    range: 12,
    cost: 15,
    limit: 2,
    keywords: ['GAS', 'ASSAULT', 'PISTOL'],
    description: '12" GAS, ASSAULT, PISTOL. Has Scope.'
  },
  {
    id: 'plasma_pistol',
    name: 'Plasma Pistol',
    type: 'ranged',
    range: 12,
    cost: 20,
    limit: 1,
    keywords: ['PISTOL'],
    description: 'Normal: 12" ARMOUR PIERCING 1. Overload: +1 INJURY DICE, ARMOUR PIERCING 2, RISKY. PISTOL. Has Scope.'
  },
  {
    id: 'stub_pistol',
    name: 'Stub Pistol',
    type: 'ranged',
    range: 12,
    cost: 20,
    keywords: ['AUTOMATIC 2', '-1 INJURY DICE', 'ASSAULT', 'PISTOL'],
    description: '12" AUTOMATIC 2, -1 INJURY DICE, ASSAULT, PISTOL. Has Scope.'
  },
  {
    id: 'twin_bolt_pistols',
    name: 'Twin Bolt Pistols',
    type: 'ranged',
    range: 12,
    cost: 15,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'VICIOUS 11', 'CRITICAL', 'CUMBERSOME', 'TWO-HANDED', 'PISTOL'],
    description: '12" +1 DICE, VICIOUS 11, CRITICAL, CUMBERSOME, TWO-HANDED, PISTOL.'
  },
  {
    id: 'twin_hand_flamers',
    name: 'Twin Hand Flamers',
    type: 'ranged',
    range: 6,
    cost: 35,
    handedness: 'two-handed',
    keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', 'FIRE', 'CUMBERSOME', 'TWO-HANDED', 'PISTOL'],
    description: '6" FLAMETHROWER, IGNORE ARMOUR, FIRE, CUMBERSOME, TWO-HANDED, PISTOL. Loses FLAMETHROWER in melee.'
  },
  {
    id: 'twin_inferno_pistols',
    name: 'Twin Inferno Pistols',
    type: 'ranged',
    range: 6,
    cost: 30,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'IGNORE ARMOUR', 'RISKY', 'CUMBERSOME', 'TWO-HANDED', 'PISTOL'],
    description: '6" +1 DICE, IGNORE ARMOUR, RISKY, CUMBERSOME, TWO-HANDED, PISTOL.'
  },
  {
    id: 'volkite_pistol',
    name: 'Volkite Pistol',
    type: 'ranged',
    range: 12,
    cost: 2,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['CRITICAL', 'FIRE', 'RISKY', 'PISTOL'],
    description: '12" CRITICAL, FIRE, RISKY, PISTOL. Has Scope.'
  },
  {
    id: 'web_pistol',
    name: 'Web Pistol',
    type: 'ranged',
    range: 12,
    cost: 5,
    keywords: ['IGNORE ARMOUR', '+2 INJURY DICE', 'ASSAULT', 'STUN MARKERS', 'STUN', 'NONLETHAL', 'PISTOL'],
    description: '12" IGNORE ARMOUR, +2 INJURY DICE, STUN MARKERS, ASSAULT, STUN, NONLETHAL, PISTOL. Has Scope.'
  },
];

// ============================================================================
// SPECIAL RANGED WEAPONS
// ============================================================================
export const sharedSpecialRangedWeapons: Weapon[] = [
  {
    id: 'arc_rifle',
    name: 'Arc Rifle',
    type: 'ranged',
    range: 30,
    cost: 25,
    handedness: 'two-handed',
    keywords: ['ARMOUR PIERCING 1', 'STUN', 'TWO-HANDED'],
    description: '30" ARMOUR PIERCING 1, STUN, TWO-HANDED.'
  },
  {
    id: 'automatic_bolt_rifle',
    name: 'Automatic Bolt Rifle',
    type: 'ranged',
    range: 30,
    cost: 20,
    handedness: 'two-handed',
    keywords: ['VICIOUS 11', 'ASSAULT', 'CRITICAL', 'TWO-HANDED'],
    description: '30" VICIOUS 11, ASSAULT, CRITICAL, TWO-HANDED. Has Scope.'
  },
  {
    id: 'bolt_rifle',
    name: 'Bolt Rifle',
    type: 'ranged',
    range: 30,
    cost: 15,
    handedness: 'two-handed',
    keywords: ['VICIOUS 11', 'CRITICAL', 'TWO-HANDED'],
    description: '30" VICIOUS 11, CRITICAL, TWO-HANDED. Has Scope.'
  },
  {
    id: 'bolt_sniper_rifle',
    name: 'Bolt Sniper Rifle',
    type: 'ranged',
    range: 48,
    cost: 30,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'VICIOUS 11', 'CRITICAL', 'HEAVY', 'RISKY', 'TWO-HANDED'],
    description: '48" +1 DICE, VICIOUS 11, CRITICAL, HEAVY, RISKY, TWO-HANDED. Has Scope.'
  },
  {
    id: 'combi_weapon',
    name: 'Combi-Weapon',
    type: 'ranged',
    range: 24,
    cost: 35,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'ASSAULT', 'RISKY', 'TWO-HANDED'],
    description: '24" AUTOMATIC 2, ASSAULT, RISKY, TWO-HANDED. Has Bayonet Lug.'
  },
  {
    id: 'condemnor_boltgun',
    name: 'Condemnor Boltgun',
    type: 'ranged',
    range: 24,
    cost: 15,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['VICIOUS 11', 'CRITICAL', 'TWO-HANDED'],
    description: 'Bolter: 24" VICIOUS 11, CRITICAL. Crossbow: 18" ASSAULT, +1 INJURY DICE vs DAEMON/PSYKER, IGNORE ARMOUR on Critical Hit, once per battle. TWO-HANDED. Has Scope.'
  },
  {
    id: 'flamer',
    name: 'Flamer',
    type: 'ranged',
    range: 8,
    cost: 30,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE', 'TWO-HANDED'],
    description: '8" FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, FIRE, TWO-HANDED.'
  },
  {
    id: 'grav_gun',
    name: 'Grav Gun',
    type: 'ranged',
    range: 24,
    cost: 15,
    handedness: 'two-handed',
    keywords: ['-1 INJURY DICE', 'IGNORE ARMOUR', 'STUN', 'TWO-HANDED'],
    description: '24" -1 INJURY DICE, IGNORE ARMOUR, STUN, TWO-HANDED. Has Scope.'
  },
  {
    id: 'grenadier_gauntlet',
    name: 'Grenadier Gauntlet',
    type: 'ranged',
    range: 12,
    cost: 30,
    keywords: ['IGNORE COVER'],
    description: '12" IGNORE COVER. Frag: BLAST 2", SHRAPNEL. Krak: ARMOUR PIERCING 2. Takes no hands.'
  },
  {
    id: 'grenade_launcher',
    name: 'Grenade Launcher',
    type: 'ranged',
    range: 24,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['IGNORE COVER', 'TWO-HANDED'],
    description: '24" IGNORE COVER, TWO-HANDED. Frag: BLAST 2", SHRAPNEL. Krak: ARMOUR PIERCING 2.'
  },
  {
    id: 'heavy_stubber',
    name: 'Heavy Stubber',
    type: 'ranged',
    range: 36,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'TWO-HANDED'],
    description: '36" AUTOMATIC 2, TWO-HANDED.'
  },
  {
    id: 'hotshot_lasgun',
    name: 'Hotshot Lasgun',
    type: 'ranged',
    range: 24,
    cost: 30,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 INJURY MODIFIER', 'RISKY', 'TWO-HANDED'],
    description: '24" +1 INJURY MODIFIER, RISKY, TWO-HANDED. Has Scope.'
  },
  {
    id: 'longlas',
    name: 'Longlas',
    type: 'ranged',
    range: 48,
    cost: 25,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'CRITICAL', 'RISKY', 'TWO-HANDED'],
    description: '48" +1 DICE, CRITICAL, RISKY, TWO-HANDED. Has Scope.'
  },
  {
    id: 'melta_gun',
    name: 'Melta Gun',
    type: 'ranged',
    range: 12,
    cost: 2,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'RISKY'],
    description: '12" +1 INJURY DICE, IGNORE ARMOUR, RISKY.'
  },
  {
    id: 'needle_rifle',
    name: 'Needle Rifle',
    type: 'ranged',
    range: 18,
    cost: 12,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['GAS', 'TWO-HANDED'],
    description: '18" GAS, TWO-HANDED. Has Scope.'
  },
  {
    id: 'plasma_gun',
    name: 'Plasma Gun',
    type: 'ranged',
    range: 24,
    cost: 30,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['TWO-HANDED'],
    description: 'Normal: 24" ARMOUR PIERCING 1. Overload: +1 INJURY DICE, ARMOUR PIERCING 2, RISKY. TWO-HANDED.'
  },
  {
    id: 'stakethrower',
    name: 'Stakethrower',
    type: 'ranged',
    range: 18,
    cost: 10,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE vs DAEMON/PSYKER', 'CRITICAL', 'TWO-HANDED'],
    description: '18" +1 INJURY DICE vs DAEMON/PSYKER, IGNORE ARMOUR on Critical Hit, CRITICAL, TWO-HANDED. Has Scope and Shield Combo.'
  },
  {
    id: 'storm_bolter',
    name: 'Storm Bolter',
    type: 'ranged',
    range: 24,
    cost: 35,
    limit: 3,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'VICIOUS 11', 'ASSAULT', 'CRITICAL', 'TWO-HANDED'],
    description: '24" AUTOMATIC 2, VICIOUS 11, ASSAULT, CRITICAL, TWO-HANDED. STRONG models can hold in one hand.'
  },
  {
    id: 'tankstopper_rifle',
    name: 'Tankstopper Rifle',
    type: 'ranged',
    range: 36,
    cost: 0,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'TWO-HANDED'],
    description: '36" +1 INJURY DICE, IGNORE ARMOUR, TWO-HANDED. Has Scope. Fixed kit of the Ratling Tankstopper mercenary — not purchasable from any armoury.'
  },
  {
    id: 'webber',
    name: 'Webber',
    type: 'ranged',
    range: 18,
    cost: 10,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['IGNORE ARMOUR', '+2 INJURY DICE', 'STUN MARKERS', 'STUN', 'NONLETHAL', 'BLAST 2"', 'TWO-HANDED'],
    description: '18" IGNORE ARMOUR, +2 INJURY DICE, STUN MARKERS, NONLETHAL, BLAST 2", STUN, TWO-HANDED. Has Scope.'
  },
];

// ============================================================================
// HEAVY RANGED WEAPONS
// ============================================================================
export const sharedHeavyRangedWeapons: Weapon[] = [
  {
    id: 'heavy_heavy_stubber',
    name: 'Heavy Heavy Stubber',
    type: 'heavy',
    range: 36,
    cost: 15,
    keywords: ['HEAVY', 'SUSTAINED 4']
  },
  {
    id: 'incinerator',
    name: 'Incinerator',
    type: 'heavy',
    range: 12,
    cost: 20,
    keywords: ['HEAVY', 'TORRENT D6', 'IGNORES COVER']
  },
  {
    id: 'autocannon',
    name: 'Autocannon',
    type: 'heavy',
    range: 36,
    cost: 30,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'HEAVY', 'TWO-HANDED'],
    description: '36" AUTOMATIC 2, HEAVY, TWO-HANDED.'
  },
  {
    id: 'combi_bolter',
    name: 'Combi-Bolter',
    type: 'heavy',
    range: 24,
    cost: 35,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'VICIOUS 11', 'CRITICAL', 'HEAVY', 'TWO-HANDED'],
    description: '24" AUTOMATIC 2, VICIOUS 11, CRITICAL, HEAVY, TWO-HANDED.'
  },
  {
    id: 'cyclone_missile_launcher',
    name: 'Cyclone Missile Launcher',
    type: 'heavy',
    range: 36,
    cost: 25,
    handedness: 'no-hands',
    keywords: ['IGNORE COVER', 'HEAVY'],
    description: '36" IGNORE COVER, HEAVY, takes no hands. Frag: BLAST 3", SHRAPNEL. Krak: ARMOUR PIERCING 2.'
  },
  {
    id: 'grav_cannon',
    name: 'Grav Cannon',
    type: 'heavy',
    range: 30,
    cost: 45,
    handedness: 'two-handed',
    keywords: ['IGNORE ARMOUR', 'HEAVY', 'STUN', 'TWO-HANDED'],
    description: '30" IGNORE ARMOUR, HEAVY, STUN, TWO-HANDED.'
  },
  {
    id: 'heavy_arc_rifle',
    name: 'Heavy Arc Rifle',
    type: 'heavy',
    range: 30,
    cost: 35,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'HEAVY', 'STUN', 'TWO-HANDED'],
    description: '30" +1 INJURY DICE, HEAVY, STUN, TWO-HANDED.'
  },
  {
    id: 'heavy_bolter',
    name: 'Heavy Bolter',
    type: 'heavy',
    range: 36,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'VICIOUS 11', 'CRITICAL', 'HEAVY', 'TWO-HANDED'],
    description: '36" +1 INJURY DICE, VICIOUS 11, CRITICAL, HEAVY, TWO-HANDED.'
  },
  {
    id: 'heavy_flamer',
    name: 'Heavy Flamer',
    type: 'heavy',
    range: 10,
    cost: 55,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', '-1 INJURY DICE', 'FLAMETHROWER', 'IGNORE ARMOUR', 'FIRE', 'HEAVY', 'TWO-HANDED'],
    description: '10" AUTOMATIC 2, -1 INJURY DICE, FLAMETHROWER, IGNORE ARMOUR, FIRE, HEAVY, TWO-HANDED.'
  },
  {
    id: 'heavy_melta_rifle',
    name: 'Heavy Melta Rifle',
    type: 'heavy',
    range: 24,
    cost: 3,
    costCurrency: 'glory',
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED'],
    description: '24" +1 INJURY DICE, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED.'
  },
  {
    id: 'lascannon',
    name: 'Lascannon',
    type: 'heavy',
    range: 48,
    cost: 30,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['ARMOUR PIERCING 2', 'HEAVY', 'TWO-HANDED'],
    description: '48" ARMOUR PIERCING 2, HEAVY, TWO-HANDED.'
  },
  {
    id: 'mining_laser',
    name: 'Mining Laser',
    type: 'heavy',
    range: 24,
    cost: 25,
    keywords: ['-1 DICE', '+1 INJURY DICE', 'HEAVY', 'ARMOUR PIERCING 2', 'RISKY'],
    description: '24" -1 DICE, +1 INJURY DICE, HEAVY, ARMOUR PIERCING 2, RISKY.'
  },
  {
    id: 'missile_launcher',
    name: 'Missile Launcher',
    type: 'heavy',
    range: 36,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['IGNORE COVER', 'HEAVY', 'TWO-HANDED'],
    description: '36" IGNORE COVER, HEAVY, TWO-HANDED. Frag: BLAST 3", SHRAPNEL. Krak: ARMOUR PIERCING 2.'
  },
  {
    id: 'mole_launcher',
    name: 'Mole Launcher',
    type: 'heavy',
    range: 36,
    cost: 50,
    handedness: 'two-handed',
    keywords: ['BLAST 3"', 'RISKY', 'SHRAPNEL', 'TWO-HANDED'],
    description: '36" BLAST 3", RISKY, SHRAPNEL, TWO-HANDED. Can attack without line of sight.'
  },
  {
    id: 'mortar',
    name: 'Mortar',
    type: 'heavy',
    range: 36,
    cost: 55,
    handedness: 'two-handed',
    keywords: ['IGNORE COVER', 'RELOAD', 'BLAST 3"', 'HEAVY', 'SHRAPNEL', 'SCATTER', 'TWO-HANDED'],
    description: '36" IGNORE COVER, RELOAD, BLAST 3", HEAVY, SHRAPNEL, SCATTER, TWO-HANDED.'
  },
  {
    id: 'multi_melta',
    name: 'Multi Melta',
    type: 'heavy',
    range: 12,
    cost: 4,
    costCurrency: 'glory',
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+2 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED'],
    description: '12" +2 INJURY DICE, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED.'
  },
  {
    id: 'plasma_cannon',
    name: 'Plasma Cannon',
    type: 'heavy',
    range: 36,
    cost: 4,
    costCurrency: 'glory',
    limit: 1,
    handedness: 'two-handed',
    keywords: ['HEAVY', 'TWO-HANDED'],
    description: 'Normal: 36" +1 INJURY DICE, ARMOUR PIERCING 1. Overload: +2 INJURY DICE, ARMOUR PIERCING 2, RISKY. HEAVY, TWO-HANDED.'
  },
  {
    id: 'reaper_chaincannon',
    name: 'Reaper Chaincannon',
    type: 'heavy',
    range: 24,
    cost: 35,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 3', 'RELOAD', '-1 INJURY DICE', 'HEAVY', 'TWO-HANDED'],
    description: '24" AUTOMATIC 3, RELOAD, -1 INJURY DICE, HEAVY, TWO-HANDED.'
  },
  {
    id: 'ripper_gun',
    name: 'Ripper Gun',
    type: 'heavy',
    range: 12,
    cost: 15,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['HEAVY', 'SHOTGUN', 'TWO-HANDED'],
    description: '12" +2 INJURY DICE at Short Range, HEAVY, SHOTGUN, TWO-HANDED. Has Shield Combo.'
  },
  {
    id: 'twin_heavy_stubber',
    name: 'Twin Heavy Stubber',
    type: 'heavy',
    range: 48,
    cost: 50,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', '+1 DICE', 'TWO-HANDED'],
    description: '48" AUTOMATIC 2, +1 DICE, TWO-HANDED.'
  },
  {
    id: 'twin_lascannon',
    name: 'Twin Lascannon',
    type: 'heavy',
    range: 48,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'ARMOUR PIERCING 2', 'HEAVY', 'TWO-HANDED'],
    description: '48" +1 DICE, ARMOUR PIERCING 2, HEAVY, TWO-HANDED.'
  },
  {
    id: 'harpoon_launcher',
    name: 'Harpoon Launcher',
    type: 'heavy',
    range: 18,
    cost: 30,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'HEAVY', 'RISKY', 'TWO-HANDED'],
    description: '18" +1 INJURY DICE, HEAVY, RISKY, TWO-HANDED. On hit vs non-LARGE target: target moves D6" directly towards wielder.'
  },
  {
    id: 'krumper_rivet_cannon',
    name: 'Krumper Rivet Cannon',
    type: 'heavy',
    range: 18,
    cost: 10,
    handedness: 'two-handed',
    keywords: ['-1 DICE', '+1 INJURY DICE', 'ARMOUR PIERCING 2', 'HEAVY', 'RISKY', 'SHOTGUN', 'TWO-HANDED'],
    description: '18" -1 DICE, +1 INJURY DICE, ARMOUR PIERCING 2, HEAVY, RISKY, SHOTGUN, TWO-HANDED.'
  },
  {
    id: 'seismic_cannon',
    name: 'Seismic Cannon',
    type: 'heavy',
    range: 24,
    cost: 25,
    handedness: 'two-handed',
    keywords: ['HEAVY', 'ARMOUR PIERCING 1', 'RISKY', 'STUN', 'TWO-HANDED'],
    description: '24" HEAVY, ARMOUR PIERCING 1, RISKY, STUN, TWO-HANDED. On hit vs non-LARGE target: target moves D3" directly away from wielder.'
  },
];

// ============================================================================
// THROWN WEAPONS (GRENADES)
// ============================================================================
export const sharedThrownWeapons: Weapon[] = [
  {
    id: 'blasting_charge',
    name: 'Blasting Charge',
    type: 'thrown',
    range: 6,
    cost: 15,
    limit: 1,
    keywords: ['+1 INJURY DICE', 'BLAST 3"', 'CONSUMABLE', 'HEAVY', 'SCATTER', 'THROWN'],
    description: '6" +1 INJURY DICE, BLAST 3", CONSUMABLE, HEAVY, SCATTER, THROWN. Ignores armour if lands on model. Once per battle.'
  },
  {
    id: 'electro_grenades',
    name: 'Electro-Grenades',
    type: 'thrown',
    range: 8,
    cost: 10,
    limit: 1,
    keywords: ['IGNORE ARMOUR', '-1 INJURY DICE', 'ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'STUN', 'THROWN'],
    description: '8" IGNORE ARMOUR, -1 INJURY DICE, BLAST 3", STUN, THROWN.'
  },
  {
    id: 'frag_grenades',
    name: 'Frag Grenades',
    type: 'thrown',
    range: 8,
    cost: 7,
    keywords: ['ASSAULT', 'BLAST 2"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'SHRAPNEL', 'THROWN'],
    description: '8" ASSAULT, BLAST 2", SHRAPNEL, THROWN.'
  },
  {
    id: 'gunk_bombs',
    name: 'Gunk Bombs',
    type: 'thrown',
    range: 8,
    cost: 7,
    limit: 1,
    keywords: ['ASSAULT', 'BLAST 2"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'STUN MARKERS', 'STUN', 'THROWN'],
    description: '8" ASSAULT, BLAST 2", STUN MARKERS, STUN, IGNORE COVER, IGNORE LONG RANGE, THROWN.'
  },
  {
    id: 'incendiary_grenades',
    name: 'Incendiary Grenades',
    type: 'thrown',
    range: 8,
    cost: 15,
    limit: 1,
    keywords: ['ASSAULT', 'FIRE', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'],
    description: '8" IGNORE ARMOUR on Critical Hit, ASSAULT, FIRE, THROWN.'
  },
  {
    id: 'krak_grenades',
    name: 'Krak Grenades',
    type: 'thrown',
    range: 8,
    cost: 10,
    limit: 2,
    keywords: ['ASSAULT', 'IGNORE COVER', 'IGNORE LONG RANGE', 'ARMOUR PIERCING 2', 'THROWN'],
    description: '8" ASSAULT, ARMOUR PIERCING 2, THROWN.'
  },
  {
    id: 'melta_bombs',
    name: 'Melta Bombs',
    type: 'thrown',
    range: 6,
    cost: 15,
    limit: 1,
    keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'ASSAULT', 'IGNORE COVER', 'IGNORE LONG RANGE', 'RISKY', 'THROWN'],
    description: '6", +1 INJURY DICE, IGNORE ARMOUR, ASSAULT, RISKY, THROWN.'
  },
  {
    id: 'throwing_knives',
    name: 'Throwing Knives',
    type: 'thrown',
    range: 8,
    cost: 5,
    limit: 1,
    keywords: ['IGNORE LONG RANGE', 'ASSAULT', 'THROWN'],
    description: '8" IGNORE LONG RANGE, ASSAULT, THROWN.'
  },
  {
    id: 'toxin_grenades',
    name: 'Toxin Grenades',
    type: 'thrown',
    range: 8,
    cost: 10,
    limit: 1,
    keywords: ['IGNORE ARMOUR', '-1 INJURY DICE', 'ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'GAS', 'THROWN'],
    description: '8" IGNORE ARMOUR, -1 INJURY DICE, BLAST 3", GAS, THROWN.'
  },
  {
    id: 'psyk_out_grenades',
    name: 'Psyk-Out Grenades',
    type: 'thrown',
    range: 8,
    cost: 7,
    keywords: ['IGNORE ARMOUR', '+1 INJURY DICE vs DAEMON/PSYKER', 'BLAST 2"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'ASSAULT', 'STUN', 'THROWN'],
    description: '8" IGNORE ARMOUR, +1 INJURY DICE vs DAEMON/PSYKER, BLAST 2", IGNORE COVER, IGNORE LONG RANGE, ASSAULT, STUN, THROWN.'
  },
  {
    id: 'smoke_grenades',
    name: 'Smoke Grenades',
    type: 'thrown',
    range: 8,
    cost: 5,
    limit: 1,
    keywords: ['ASSAULT', 'SCATTER', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'],
    description: '8" ASSAULT, SCATTER, IGNORE COVER, IGNORE LONG RANGE, THROWN. Once per battle. No injury — place Smoke marker granting COVER and STEALTH within 3". Removed on 3- at end of Turn, otherwise at end of next Turn.'
  },
];

// ============================================================================
// BASIC MELEE WEAPONS
// ============================================================================
export const sharedBasicMeleeWeapons: Weapon[] = [
  {
    id: 'bayonet',
    name: 'Bayonet',
    type: 'melee',
    cost: 2,
    keywords: ['Shield Combo'],
    description: 'Melee. Can only be used with a weapon with the Bayonet Lug property.'
  },
  {
    id: 'blade',
    name: 'Blade',
    type: 'melee',
    cost: 4,
    keywords: ['CRITICAL'],
    description: 'Melee, CRITICAL.'
  },
  {
    id: 'bludgeon',
    name: 'Bludgeon',
    type: 'melee',
    cost: 1,
    keywords: ['-1 DICE'],
    description: 'Melee, -1 DICE.'
  },
  {
    id: 'close_combat_weapon',
    name: 'Close Combat Weapon',
    type: 'melee',
    cost: 3,
    keywords: [],
    description: 'Melee. Basic combat weapon.'
  },
  {
    id: 'flail',
    name: 'Flail',
    type: 'melee',
    cost: 5,
    isMainHandOnly: true,
    keywords: ['+1 DICE', 'MAIN HAND ONLY'],
    description: 'Melee, +1 DICE, MAIN HAND ONLY.'
  },
  {
    id: 'halberd',
    name: 'Halberd',
    type: 'melee',
    cost: 7,
    handedness: 'two-handed',
    keywords: ['BLOCK', 'TWO-HANDED'],
    description: 'Melee, BLOCK, TWO-HANDED. Has Shield Combo.'
  },
  {
    id: 'paired_blades',
    name: 'Paired Blades',
    type: 'melee',
    cost: 12,
    handedness: 'two-handed',
    keywords: ['CRITICAL', 'IGNORE OFF-HAND', 'TWO-HANDED'],
    description: 'Melee, CRITICAL, IGNORE OFF-HAND. Comes as a pair of two weapons.'
  },
];

// ============================================================================
// SPECIAL MELEE WEAPONS
// ============================================================================
export const sharedSpecialMeleeWeapons: Weapon[] = [
  {
    id: 'butchers_cleaver',
    name: "Butcher's Cleaver",
    type: 'melee',
    cost: 10,
    keywords: ['CRITICAL'],
    description: 'Melee, IGNORE ARMOUR on Critical Hit, CRITICAL.'
  },
  {
    id: 'butchers_chain_cleaver',
    name: "Butcher's Chain Cleaver",
    type: 'melee',
    cost: 15,
    isMainHandOnly: true,
    keywords: ['CRITICAL', 'SHRAPNEL', 'RISKY', 'MAIN HAND ONLY'],
    description: 'Melee, IGNORE ARMOUR on Critical Hit, CRITICAL, SHRAPNEL, RISKY, MAIN HAND ONLY.'
  },
  {
    id: 'chain_blade',
    name: 'Chain Blade',
    type: 'melee',
    cost: 10,
    isMainHandOnly: true,
    keywords: ['CRITICAL', 'RISKY', 'SHRAPNEL', 'MAIN HAND ONLY'],
    description: 'Melee, CRITICAL, RISKY, SHRAPNEL, MAIN HAND ONLY.'
  },
  {
    id: 'chain_glaive',
    name: 'Chain Glaive',
    type: 'melee',
    cost: 15,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['BLOCK', 'CRITICAL', 'RISKY', 'SHRAPNEL', 'TWO-HANDED', 'VICIOUS 11'],
    description: 'Melee, BLOCK, CRITICAL, RISKY, SHRAPNEL, TWO-HANDED, VICIOUS 11.'
  },
  {
    id: 'force_rod',
    name: 'Force Rod',
    type: 'melee',
    cost: 3,
    isMainHandOnly: true,
    keywords: ['+1 INJURY DICE vs DAEMON/PSYKER', 'PSYCHIC', 'HELD', 'MAIN HAND ONLY'],
    description: 'Melee, +1 INJURY DICE vs DAEMON/PSYKER, PSYCHIC, HELD, MAIN HAND ONLY. Psyker Only.',
    restrictedTo: ['PSYKER'],
  },
  {
    id: 'force_staff',
    name: 'Force Staff',
    type: 'melee',
    cost: 10,
    handedness: 'two-handed',
    keywords: ['BLOCK', 'CUMBERSOME', 'PSYCHIC', 'HELD', 'TWO-HANDED'],
    description: 'Strike: Melee +1 INJURY DICE vs DAEMON/PSYKER. Smite: 18". BLOCK, CUMBERSOME, PSYCHIC, HELD, TWO-HANDED. Psyker Only.',
    restrictedTo: ['PSYKER'],
  },
  {
    id: 'force_weapon',
    name: 'Force Weapon',
    type: 'melee',
    cost: 15,
    limit: 2,
    isMainHandOnly: true,
    keywords: ['+1 INJURY DICE', 'PSYCHIC', 'HELD', 'MAIN HAND ONLY'],
    description: 'Melee, +1 INJURY DICE (+1 more vs DAEMON/PSYKER), PSYCHIC, HELD, MAIN HAND ONLY. Elite Psyker Only.',
    restrictedTo: ['ELITE', 'PSYKER'],
  },
  {
    id: 'goad_lance',
    name: 'Goad Lance',
    type: 'melee',
    cost: 20,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE on Charge', 'BLOCK', 'STUN', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE when Charged, BLOCK, STUN, TWO-HANDED. Has Shield Combo.'
  },
  {
    id: 'lightning_claw',
    name: 'Lightning Claw',
    type: 'melee',
    cost: 12,
    keywords: ['ARMOUR PIERCING 1', 'STUN', 'HELD'],
    description: 'Melee, ARMOUR PIERCING 1, STUN, HELD.'
  },
  {
    id: 'plasma_blade',
    name: 'Plasma Blade',
    type: 'melee',
    cost: 15,
    isMainHandOnly: true,
    keywords: ['CRITICAL', 'ARMOUR PIERCING 1', 'MAIN HAND ONLY'],
    description: 'Melee, CRITICAL, ARMOUR PIERCING 1, MAIN HAND ONLY.'
  },
  {
    id: 'poison_blade',
    name: 'Poison Blade',
    type: 'melee',
    cost: 7,
    isMainHandOnly: true,
    keywords: ['CRITICAL', 'GAS', 'MAIN HAND ONLY'],
    description: 'Melee, CRITICAL, GAS, MAIN HAND ONLY.'
  },
  {
    id: 'power_weapon',
    name: 'Power Weapon',
    type: 'melee',
    cost: 15,
    limit: 2,
    isMainHandOnly: true,
    keywords: ['ARMOUR PIERCING 2', 'MAIN HAND ONLY'],
    description: 'Melee, ARMOUR PIERCING 2, MAIN HAND ONLY.'
  },
  {
    id: 'shock_baton',
    name: 'Shock Baton',
    type: 'melee',
    cost: 7,
    keywords: ['STUN'],
    description: 'Melee, STUN.'
  },
  {
    id: 'shock_stave',
    name: 'Shock Stave',
    type: 'melee',
    cost: 10,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['BLOCK', 'STUN', 'TWO-HANDED'],
    description: 'Melee, BLOCK, STUN, TWO-HANDED. Has Shield Combo.'
  },
  {
    id: 'taser_goad',
    name: 'Taser Goad',
    type: 'melee',
    cost: 15,
    handedness: 'two-handed',
    keywords: ['CUMBERSOME', 'TWO-HANDED', 'HELD'],
    description: 'Strike: Melee STUN. Bolt: 12" STUN. CUMBERSOME, TWO-HANDED, HELD.'
  },
  {
    id: 'twin_butchers_chain_cleavers',
    name: "Twin Butcher's Chain Cleavers",
    type: 'melee',
    cost: 23,
    handedness: 'two-handed',
    keywords: ['+1 DICE', '+1 INJURY DICE', 'CRITICAL', 'SHRAPNEL', 'RISKY', 'TWO-HANDED', 'CUMBERSOME'],
    description: "Melee, +1 DICE, +1 INJURY DICE, IGNORE ARMOUR on Critical Hit, CRITICAL, SHRAPNEL, RISKY, TWO-HANDED, CUMBERSOME."
  },
  // ── Adepta Sororitas unique melee weapons ──────────────────────────────────
  {
    id: 'neural_whip_sor',
    name: 'Neural Whip',
    type: 'melee',
    cost: 10,
    limit: 2,
    isMainHandOnly: true,
    keywords: ['CRITICAL', 'STUN', 'WHIP 3"', 'MAIN HAND ONLY'],
    description: 'Melee, IGNORE ARMOUR on Critical Hit, CRITICAL, STUN, WHIP 3". (Sororitas only, LIMIT: 2)'
  },
  {
    id: 'null_rod_sor',
    name: 'Null Rod',
    type: 'melee',
    cost: 15,
    limit: 1,
    keywords: ['+1 INJURY DICE vs DAEMON/PSYKER', 'FEAR'],
    description: 'Melee, +1 INJURY DICE vs DAEMON/PSYKER. Grants FEAR and Deny the Witch (PSYKER 1). (Sororitas only, LIMIT: 1)',
    grantsKeywords: ['FEAR'],
  },
  {
    id: 'power_halberd_sor',
    name: 'Power Halberd',
    type: 'melee',
    cost: 20,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['BLOCK', 'ARMOUR PIERCING 2', 'TWO-HANDED'],
    description: 'Melee, BLOCK, ARMOUR PIERCING 2, TWO-HANDED, Shield Combo. (Sororitas only, LIMIT: 2)'
  },
  {
    id: 'spear_of_the_faithful_sor',
    name: 'Spear of the Faithful',
    type: 'melee',
    cost: 25,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'BLOCK', 'ARMOUR PIERCING 2', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, BLOCK, ARMOUR PIERCING 2, TWO-HANDED, Shield Combo. (Sororitas only, LIMIT: 1, Elite Only)'
  },
  {
    id: 'virge_of_admonition_sor',
    name: 'Virge of Admonition',
    type: 'melee',
    cost: 15,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['STUN', 'TWO-HANDED'],
    description: 'Melee, STUN, TWO-HANDED. Enemies within 8" of wielder have -1 DICE to Dash rolls. (Sororitas only, LIMIT: 1)'
  },
  {
    id: 'brazier_of_holy_fire_sor',
    name: 'Brazier of Holy Fire',
    type: 'melee',
    cost: 15,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['HELD', 'FIRE', '+1 INJURY DICE vs DAEMON/PSYKER', 'MAIN HAND ONLY'],
    description: 'HELD, FIRE. Strike: Melee, MAIN HAND ONLY. Unleash: 12" FLAMETHROWER, IGNORE ARMOUR (once per battle). (Sororitas only, LIMIT: 1)',
  },
  // ── Paragon Warsuit Weapons ──────────────────────────────────────────────
  {
    id: 'twin_storm_bolter_sor',
    name: 'Twin Storm Bolter',
    type: 'ranged',
    range: 24,
    cost: 25,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'TWO-HANDED'],
    description: '24", AUTOMATIC 2, TWO-HANDED. LIMIT: 1. Paragon Warsuit Only. (Sororitas only)',
  },
  {
    id: 'twin_g_launcher_sor',
    name: 'Twin Grenade Launcher',
    type: 'ranged',
    range: 24,
    cost: 30,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['IGNORE COVER', 'BLAST 2"', 'TWO-HANDED'],
    description: '24", IGNORE COVER, BLAST 2", TWO-HANDED. LIMIT: 1. Paragon Warsuit Only. (Sororitas only)',
  },
  // ── Chaos-specific ──────────────────────────────────────────────────────────
  {
    id: 'demon_weapon',
    name: 'Daemon Weapon',
    type: 'melee',
    cost: 3,
    costCurrency: 'glory',
    limit: 1,
    isMainHandOnly: true,
    keywords: ['+2 INJURY DICE', 'PSYCHIC', 'MAIN HAND ONLY'],
    description: 'Melee, +2 INJURY DICE, PSYCHIC, MAIN HAND ONLY. Elite Only, LIMIT: 1.',
    restrictedTo: ['ELITE'],
  },
  {
    id: 'fell_dagger',
    name: 'Fell Dagger',
    type: 'melee',
    cost: 15,
    limit: 1,
    keywords: ['PSYCHIC', 'RISKY'],
    description: 'Melee, PSYCHIC, RISKY. Remove 1 BLOOD MARKER from wielder on a hit that causes BLOOD MARKERS or OOA result. Elite Psyker Only. LIMIT: 1.',
    restrictedTo: ['ELITE', 'PSYKER'],
  },
  {
    id: 'warp_claws',
    name: 'Warp Claws',
    type: 'melee',
    cost: 10,
    keywords: ['IGNORE OFF-HAND'],
    description: 'Melee, IGNORE OFF-HAND. Includes one weapon in each hand. Raptor Only. While equipped with a Jump Pack, when a model equipped with Warp Claws takes an enemy Out of Action in melee during its Activation, if it is not engaged in melee with any other enemy, it can immediately move up to its speed. (Heretic Astartes only)'
  },
  // Chaos Cult — Warp Claw (Gift of Chaos mutation #54, individual claw)
  {
    id: 'warp_claw_cc',
    name: 'Warp Claw',
    type: 'melee',
    cost: 0,
    keywords: ['IGNORE OFF-HAND', 'CRITICAL'],
    description: 'Melee, IGNORE OFF-HAND, CRITICAL. Gained as a pair via Gift of Chaos #54 — cannot be removed. Loses access to these weapons in any hand holding another melee weapon. (Chaos Cult only)'
  },
  // ── Heretic Astartes Variant Battlekit: Alpha Legion ─────────────────────
  {
    id: 'throwing_power_knives_al',
    name: 'Throwing Power Knives',
    type: 'ranged',
    range: 8,
    cost: 20,
    limit: 2,
    keywords: ['IGNORE LONG RANGE', 'ASSAULT', 'ARMOUR PIERCING 2', 'THROWN'],
    description: '8", IGNORE LONG RANGE, ASSAULT, ARMOUR PIERCING 2, THROWN. LIMIT: 2. (Alpha Legion Only)'
  },
  {
    id: 'shroud_bombs_al',
    name: 'Shroud Bombs',
    type: 'ranged',
    cost: 5,
    limit: 4,
    keywords: ['STEALTH'],
    description: 'The equipped model has the STEALTH Keyword. LIMIT: 4. (Alpha Legion Only)'
  },
  // ── Heretic Astartes Variant Battlekit: Death Guard ───────────────────────
  {
    id: 'blight_grenades_dg',
    name: 'Blight Grenades',
    type: 'ranged',
    range: 8,
    cost: 10,
    limit: 3,
    keywords: ['BLAST 2"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'INFECTION MARKERS'],
    description: '8", BLAST 2", IGNORE COVER, IGNORE LONG RANGE, INFECTION MARKERS. LIMIT: 3. (Death Guard Only)'
  },
  {
    id: 'blight_launcher_dg',
    name: 'Blight Launcher',
    type: 'ranged',
    range: 24,
    cost: 35,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['IGNORE COVER', 'BLAST 2"', 'TWO-HANDED', 'INFECTION MARKERS'],
    description: '24", IGNORE COVER, BLAST 2", TWO-HANDED, INFECTION MARKERS. LIMIT: 1. (Death Guard Only)'
  },
  {
    id: 'corrupted_staff_dg',
    name: 'Corrupted Staff',
    type: 'melee',
    cost: 5,
    keywords: ['+1 INJURY DICE', 'INFECTION MARKERS', 'PSYCHIC', 'HELD'],
    description: 'Melee, +1 INJURY DICE against DAEMON or PSYKER, INFECTION MARKERS, PSYCHIC, HELD. Psyker Only. (Death Guard Only)',
    restrictedTo: ['PSYKER'],
  },
  {
    id: 'cursed_plague_bell_dg',
    name: 'Cursed Plague Bell',
    type: 'melee',
    cost: 15,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'PSYCHIC', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY MODIFIER, ARMOUR PIERCING 1 against targets with INFECTION MARKERS, +1 INJURY DICE against DAEMON or PSYKER, HEAVY, PSYCHIC, TWO-HANDED. LIMIT: 1. (Death Guard Only)'
  },
  {
    id: 'great_plague_blade_dg',
    name: 'Great Plague Blade',
    type: 'melee',
    cost: 30,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'CRITICAL', 'ARMOUR PIERCING 2', 'INFECTION MARKERS', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, CRITICAL, ARMOUR PIERCING 2, INFECTION MARKERS, HEAVY, TWO-HANDED. LIMIT: 1. Elite or Terminator Only. (Death Guard Only)',
    restrictedTo: ['ELITE|VEHICLE'],
  },
  {
    id: 'heavy_blight_launcher_dg',
    name: 'Heavy Blight Launcher',
    type: 'ranged',
    range: 36,
    cost: 45,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['IGNORE COVER', 'BLAST 3"', 'HEAVY', 'TWO-HANDED', 'INFECTION MARKERS'],
    description: '36", IGNORE COVER, BLAST 3", HEAVY, TWO-HANDED, INFECTION MARKERS. LIMIT: 1. (Death Guard Only)'
  },
  {
    id: 'heavy_plague_spewer_dg',
    name: 'Heavy Plague Spewer',
    type: 'ranged',
    range: 10,
    cost: 45,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['-1 INJURY DICE', 'FLAMETHROWER', 'IGNORE ARMOUR', 'AUTOMATIC 2', 'GAS', 'HEAVY', 'TWO-HANDED'],
    description: '10", -1 INJURY DICE, FLAMETHROWER, IGNORE ARMOUR, AUTOMATIC 2, GAS, HEAVY, TWO-HANDED. LIMIT: 1. (Death Guard Only)'
  },
  {
    id: 'plague_blade_dg',
    name: 'Plague Blade',
    type: 'melee',
    cost: 7,
    limit: 2,
    keywords: ['INFECTION MARKERS'],
    description: 'Melee, INFECTION MARKERS. LIMIT: 2. (Death Guard Only)'
  },
  {
    id: 'plague_spewer_dg',
    name: 'Plague Spewer',
    type: 'ranged',
    range: 8,
    cost: 30,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', 'GAS', 'TWO-HANDED'],
    description: '8", FLAMETHROWER, IGNORE ARMOUR, GAS, TWO-HANDED. LIMIT: 2. (Death Guard Only)'
  },
  {
    id: 'plaguespurt_gauntlet_dg',
    name: 'Plaguespurt Gauntlet',
    type: 'ranged',
    range: 6,
    cost: 10,
    keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'GAS'],
    description: '6", FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, GAS. Terminator Armour Only. (Death Guard Only)',
    restrictedTo: ['VEHICLE'],
  },
  // ── Heretic Astartes Variant Battlekit: Emperor's Children ────────────────
  {
    id: 'blastmaster_ec',
    name: 'Blastmaster',
    type: 'ranged',
    range: 24,
    cost: 30,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['IGNORE COVER', 'HEAVY', 'ARMOUR PIERCING 2', 'TWO-HANDED'],
    description: '24", IGNORE COVER, HEAVY, ARMOUR PIERCING 2, TWO-HANDED. LIMIT: 2. (Emperor\'s Children Only)'
  },
  {
    id: 'blissblade_ec',
    name: 'Blissblade',
    type: 'melee',
    cost: 12,
    keywords: ['CRITICAL', 'ARMOUR PIERCING 1'],
    description: 'Melee, CRITICAL, ARMOUR PIERCING 1. Elite or Flawless Blade Only. (Emperor\'s Children Only)'
  },
  {
    id: 'phoenix_power_spear_ec',
    name: 'Phoenix Power Spear',
    type: 'melee',
    cost: 15,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'CRITICAL', 'ARMOUR PIERCING 2', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE during Turn in which wielder Charged, CRITICAL, ARMOUR PIERCING 2, TWO-HANDED. LIMIT: 2. (Emperor\'s Children Only)'
  },
  {
    id: 'rapture_lash_ec',
    name: 'Rapture Lash',
    type: 'melee',
    cost: 7,
    keywords: ['IGNORE OFF-HAND'],
    description: 'Melee, ignores penalty for attacking in Off-Hand. (Emperor\'s Children Only)'
  },
  {
    id: 'screamer_pistol_ec',
    name: 'Screamer Pistol',
    type: 'ranged',
    range: 12,
    cost: 15,
    keywords: ['IGNORE COVER', 'ASSAULT', 'PISTOL'],
    description: '12", IGNORE COVER, ASSAULT, PISTOL. (Emperor\'s Children Only)'
  },
  {
    id: 'sonic_blaster_ec',
    name: 'Sonic Blaster',
    type: 'ranged',
    range: 18,
    cost: 15,
    limit: 4,
    handedness: 'two-handed',
    keywords: ['IGNORE COVER', 'ARMOUR PIERCING 1', 'TWO-HANDED'],
    description: '18", IGNORE COVER, ARMOUR PIERCING 1, TWO-HANDED. LIMIT: 4. (Emperor\'s Children Only)'
  },
  {
    id: 'twin_screamer_pistols_ec',
    name: 'Twin Screamer Pistols',
    type: 'ranged',
    range: 12,
    cost: 20,
    limit: 2,
    keywords: ['+1 DICE', 'IGNORE COVER', 'ASSAULT', 'PISTOL'],
    description: '12", +1 DICE, IGNORE COVER, ASSAULT, CUMBERSOME, TWO-HANDED, PISTOL. LIMIT: 2. (Emperor\'s Children Only)'
  },
  // ── Heretic Astartes Variant Battlekit: Iron Warriors ────────────────────
  {
    id: 'shrapnel_bolter_iw',
    name: 'Shrapnel Bolter',
    type: 'ranged',
    range: 18,
    cost: 15,
    limit: 3,
    handedness: 'two-handed',
    keywords: ['VICIOUS 11', 'CRITICAL', 'SHRAPNEL'],
    description: '18", VICIOUS 11, CRITICAL, SHRAPNEL, Scope. LIMIT: 3. (Iron Warriors Only)'
  },
  {
    id: 'shrapnel_cannon_iw',
    name: 'Shrapnel Cannon',
    type: 'ranged',
    range: 30,
    cost: 45,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'SHRAPNEL', 'VICIOUS 11', 'TWO-HANDED'],
    description: '30", +1 INJURY DICE, CRITICAL, HEAVY, SHRAPNEL, VICIOUS 11, CRITICAL. LIMIT: 1. (Iron Warriors Only)'
  },
  {
    id: 'shrapnel_pistol_iw',
    name: 'Shrapnel Pistol',
    type: 'ranged',
    range: 10,
    cost: 12,
    limit: 2,
    keywords: ['VICIOUS 11', 'CRITICAL', 'SHRAPNEL', 'PISTOL'],
    description: '10", VICIOUS 11, CRITICAL, SHRAPNEL, PISTOL, Scope. LIMIT: 2. (Iron Warriors Only)'
  },
  // ── Heretic Astartes Variant Battlekit: Night Lords ──────────────────────
  {
    id: 'terrorchem_vials_nl',
    name: 'Terrorchem Vials',
    type: 'ranged',
    range: 6,
    cost: 20,
    limit: 1,
    keywords: ['-1 INJURY DICE', 'IGNORE ARMOUR', 'GAS', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'],
    description: '6", -1 INJURY DICE, IGNORE ARMOUR, GAS, IGNORE COVER, IGNORE LONG RANGE, THROWN. Target hit must move D3" in chosen direction. LIMIT: 1. (Night Lords Only)'
  },
  // ── Heretic Astartes Variant Battlekit: Thousand Sons ────────────────────
  {
    id: 'inferno_boltgun_ts',
    name: 'Inferno Boltgun',
    type: 'ranged',
    range: 24,
    cost: 15,
    handedness: 'two-handed',
    keywords: ['VICIOUS 11', 'CRITICAL', 'TWO-HANDED'],
    description: '24", VICIOUS 11, ARMOUR PIERCING 1 on Critical Hit, CRITICAL, TWO-HANDED, Scope. (Thousand Sons Only)'
  },
  {
    id: 'inferno_bolt_pistol_ts',
    name: 'Inferno Bolt Pistol',
    type: 'ranged',
    range: 12,
    cost: 12,
    limit: 1,
    keywords: ['VICIOUS 11', 'CRITICAL', 'PISTOL'],
    description: '12", VICIOUS 11, ARMOUR PIERCING 1 on Critical Hit, CRITICAL, PISTOL. LIMIT: 1. (Thousand Sons Only)'
  },
  {
    id: 'inferno_combi_bolter_ts',
    name: 'Inferno Combi-Bolter',
    type: 'ranged',
    range: 24,
    cost: 40,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'VICIOUS 11', 'CRITICAL', 'HEAVY', 'TWO-HANDED'],
    description: '24", AUTOMATIC 2, VICIOUS 11, ARMOUR PIERCING 1 on Critical Hit, CRITICAL, HEAVY, TWO-HANDED. (Thousand Sons Only)'
  },
  {
    id: 'force_stave_ts',
    name: 'Force Stave',
    type: 'melee',
    cost: 20,
    keywords: ['+1 INJURY DICE', 'PSYCHIC', 'HELD'],
    description: 'Melee, +1 INJURY DICE, +1 INJURY DICE against DAEMON or PSYKER, PSYCHIC, HELD. Elite Psyker Only. (Thousand Sons Only)',
    restrictedTo: ['ELITE', 'PSYKER'],
  },
  {
    id: 'power_claw_ts',
    name: 'Power Claw',
    type: 'melee',
    cost: 15,
    limit: 1,
    keywords: ['+1 INJURY DICE', 'HEAVY', 'ARMOUR PIERCING 2'],
    description: 'Melee, +1 INJURY DICE, HEAVY, ARMOUR PIERCING 2. LIMIT: 1. Sekhetar Robot Only. (Thousand Sons Only)',
    restrictedTo: ['ARTIFICIAL'],
  },
  {
    id: 'soulreaper_cannon_ts',
    name: 'Soulreaper Cannon',
    type: 'ranged',
    range: 24,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 3', 'RELOAD', 'HEAVY', 'TWO-HANDED'],
    description: '24", AUTOMATIC 3, RELOAD, HEAVY, TWO-HANDED. LIMIT: 1. (Thousand Sons Only)'
  },
  {
    id: 'meltagun_ts',
    name: 'Meltagun',
    type: 'ranged',
    range: 12,
    cost: 40,
    limit: 1,
    keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'RISKY'],
    description: '12" +1 INJURY DICE, IGNORE ARMOUR, RISKY. LIMIT: 1. Sekhetar Robot Only. (Thousand Sons Only)',
    restrictedTo: ['ARTIFICIAL'],
  },
  {
    id: 'hand_flamer_ts',
    name: 'Hand Flamer',
    type: 'ranged',
    range: 6,
    cost: 20,
    limit: 2,
    keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-2 INJURY DICE', 'FIRE', 'PISTOL'],
    description: '6" FLAMETHROWER, IGNORE ARMOUR, -2 INJURY DICE, FIRE, PISTOL. LIMIT: 2. Elite Only. (Thousand Sons Only)',
    restrictedTo: ['ELITE'],
  },
  // ── Heretic Astartes Variant Battlekit: World Eaters ─────────────────────
  {
    id: 'axe_of_dismemberment_we',
    name: 'Axe of Dismemberment',
    type: 'melee',
    cost: 35,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+2 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee, +2 INJURY DICE, IGNORE ARMOUR of Down enemies, HEAVY, TWO-HANDED. LIMIT: 1. Elite Only. (World Eaters Only)'
  },
  {
    id: 'blood_harpoon_we',
    name: 'Blood Harpoon',
    type: 'melee',
    cost: 12,
    limit: 1,
    keywords: ['ASSAULT', 'CRITICAL', 'WHIP 18"'],
    description: 'Melee, ASSAULT, CRITICAL, WHIP 18". LIMIT: 1. Jakhal Only. (World Eaters Only)'
  },
  {
    id: 'twin_chain_blades_we',
    name: 'Twin Chain Blades',
    type: 'melee',
    cost: 15,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'CRITICAL', 'RISKY', 'SHRAPNEL', 'TWO-HANDED', 'CUMBERSOME'],
    description: 'Melee, +1 DICE, CRITICAL, RISKY, SHRAPNEL, TWO-HANDED, CUMBERSOME. (World Eaters Only)'
  },
  {
    id: 'heavy_chain_weapon_we',
    name: 'Heavy Chain Weapon',
    type: 'melee',
    cost: 20,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'RISKY', 'SHRAPNEL', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, CRITICAL, HEAVY, RISKY, SHRAPNEL, TWO-HANDED. LIMIT: 2. (World Eaters Only)'
  },
  // ── Heretic Astartes Heavy Melee ─────────────────────────────────────────
  {
    id: 'helbrute_hammer_ha',
    name: 'Helbrute Hammer',
    type: 'melee',
    cost: 10,
    handedness: 'two-handed',
    keywords: ['+2 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee, +2 INJURY MODIFIER, HEAVY, TWO-HANDED. (Helbrute Only)'
  },
  {
    id: 'power_scourge_ha',
    name: 'Power Scourge',
    type: 'melee',
    cost: 15,
    handedness: 'two-handed',
    keywords: ['SWEEPING', 'ARMOUR PIERCING 1', 'SHRAPNEL', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee, SWEEPING, ARMOUR PIERCING 1, SHRAPNEL, HEAVY, TWO-HANDED. (Helbrute Only)'
  },
  {
    id: 'las_cutter',
    name: 'Las Cutter',
    type: 'melee',
    cost: 15,
    keywords: ['-1 DICE', 'IGNORE ARMOUR', 'RISKY'],
    description: 'Melee, -1 DICE, IGNORE ARMOUR, RISKY.'
  },
  // ── Genestealer Cults unique melee weapons ───────────────────────────────
  {
    id: 'bonesword_gsc',
    name: 'Bonesword',
    type: 'melee',
    cost: 20,
    limit: 1,
    keywords: ['+1 INJURY DICE', 'CRITICAL'],
    description: 'Melee, +1 INJURY DICE, CRITICAL. Elite Only, LIMIT: 1. (Genestealer Cults only)'
  },
  {
    id: 'lash_whip_gsc',
    name: 'Lash Whip',
    type: 'melee',
    cost: 15,
    limit: 1,
    keywords: ['BLOCK', 'WHIP 3"'],
    description: 'Melee, BLOCK, WHIP 3". Elite Only, LIMIT: 1. (Genestealer Cults only)'
  },
  {
    id: 'toxin_injector_claw',
    name: 'Toxin Injector Claw',
    type: 'melee',
    cost: 7,
    limit: 2,
    isMainHandOnly: true,
    keywords: ['CRITICAL', 'GAS', 'MAIN HAND ONLY'],
    description: 'Melee, CRITICAL, GAS, MAIN HAND ONLY. LIMIT: 2. (Genestealer Cults only)'
  },
  // ── Pirate Crew unique melee weapons ─────────────────────────────────────
  {
    id: 'crackthorn_whip',
    name: 'Crackthorn Whip',
    type: 'melee',
    cost: 12,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['CRITICAL', 'STUN', 'VICIOUS 10', 'WHIP 3"', 'MAIN HAND ONLY'],
    description: 'Melee, CRITICAL, STUN, VICIOUS 10, WHIP 3", MAIN HAND ONLY. LIMIT: 1. (Pirate Crew only)'
  },
];

// ============================================================================
// HEAVY MELEE WEAPONS
// ============================================================================
export const sharedHeavyMeleeWeapons: Weapon[] = [
  {
    id: 'chain_fist',
    name: 'Chain Fist',
    type: 'melee',
    cost: 30,
    limit: 1,
    keywords: ['+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'ARMOUR PIERCING 1', 'RISKY', 'SHRAPNEL', 'HELD'],
    description: 'Melee, +1 INJURY DICE, CRITICAL, HEAVY, ARMOUR PIERCING 1, RISKY, SHRAPNEL, HELD.'
  },
  {
    id: 'eviscerator',
    name: 'Eviscerator',
    type: 'melee',
    cost: 15,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'RISKY', 'SHRAPNEL', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, CRITICAL, HEAVY, RISKY, SHRAPNEL, TWO-HANDED.'
  },
  {
    id: 'heavy_power_fist',
    name: 'Heavy Power Fist',
    type: 'melee',
    cost: 25,
    limit: 2,
    keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'ARMOUR PIERCING 2', 'HELD'],
    description: 'Melee, +1 INJURY MODIFIER, HEAVY, ARMOUR PIERCING 2, HELD.'
  },
  {
    id: 'heavy_power_weapon',
    name: 'Heavy Power Weapon',
    type: 'melee',
    cost: 20,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'HEAVY', 'ARMOUR PIERCING 2', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, HEAVY, ARMOUR PIERCING 2, TWO-HANDED.'
  },
  {
    id: 'thunder_hammer',
    name: 'Thunder Hammer',
    type: 'melee',
    cost: 20,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+2 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee, +2 INJURY MODIFIER, HEAVY, TWO-HANDED.'
  },
  {
    id: 'two_handed_blade',
    name: 'Two-Handed Blade',
    type: 'melee',
    cost: 12,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, CRITICAL, HEAVY, TWO-HANDED.'
  },
  {
    id: 'two_handed_hammer',
    name: 'Two-Handed Hammer',
    type: 'melee',
    cost: 10,
    handedness: 'two-handed',
    keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY MODIFIER, HEAVY, TWO-HANDED.'
  },
  {
    id: 'arc_welder',
    name: 'Arc Welder',
    type: 'melee',
    cost: 40,
    handedness: 'two-handed',
    keywords: ['IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED'],
    description: 'Melee, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED.'
  },
  {
    id: 'heavy_plasma_blade',
    name: 'Heavy Plasma Blade',
    type: 'melee',
    cost: 18,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'ARMOUR PIERCING 1', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, CRITICAL, HEAVY, ARMOUR PIERCING 1, TWO-HANDED.'
  },
  {
    id: 'heavy_rock_drill',
    name: 'Heavy Rock Drill',
    type: 'melee',
    cost: 40,
    handedness: 'two-handed',
    keywords: ['-1 DICE', '+1 INJURY MODIFIER', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED'],
    description: 'Melee, -1 DICE, +1 INJURY MODIFIER, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED.'
  },
  {
    id: 'heavy_rock_saw',
    name: 'Heavy Rock Saw',
    type: 'melee',
    cost: 40,
    handedness: 'two-handed',
    keywords: ['-1 DICE', '+1 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED'],
    description: 'Melee, -1 DICE, +1 INJURY DICE, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED.'
  },
  {
    id: 'shock_maul',
    name: 'Shock Maul',
    type: 'melee',
    cost: 12,
    handedness: 'two-handed',
    keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'STUN', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY MODIFIER, HEAVY, STUN, TWO-HANDED.'
  },
];

// ============================================================================
// NECRONS FACTION WEAPONS
// Source: Necrons.md — Battlekit, Staffs, Destroyer Cult Battlekit
// ============================================================================

export const necronsRangedWeapons: Weapon[] = [
  // Necron Ranged
  {
    id: 'gauss_blaster',
    name: 'Gauss Blaster',
    type: 'heavy',
    range: 24,
    cost: 35,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'ARMOUR PIERCING 1', 'HEAVY', 'TWO-HANDED'],
    description: '24" AUTOMATIC 2, ARMOUR PIERCING 1, HEAVY, TWO-HANDED.',
  },
  {
    id: 'gauss_flayer',
    name: 'Gauss Flayer',
    type: 'ranged',
    range: 24,
    cost: 12,
    handedness: 'two-handed',
    keywords: ['ARMOUR PIERCING 1', 'TWO-HANDED'],
    description: '24" ARMOUR PIERCING 1, TWO-HANDED.',
  },
  {
    id: 'gauss_reaper',
    name: 'Gauss Reaper',
    type: 'ranged',
    range: 12,
    cost: 12,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'SHOTGUN', 'ARMOUR PIERCING 1', 'TWO-HANDED', 'Shield Combo'],
    description: '12" +1 DICE, SHOTGUN, ARMOUR PIERCING 1, TWO-HANDED. Has Shield Combo.',
  },
  {
    id: 'particle_beamer',
    name: 'Particle Beamer',
    type: 'ranged',
    range: 18,
    cost: 10,
    handedness: 'two-handed',
    keywords: ['BLAST 2"', 'TWO-HANDED'],
    description: '18" BLAST 2", TWO-HANDED.',
  },
  {
    id: 'synaptic_disintegrator',
    name: 'Synaptic Disintegrator',
    type: 'ranged',
    range: 48,
    cost: 40,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'CRITICAL', 'ARMOUR PIERCING 2', 'RISKY', 'TWO-HANDED'],
    description: '48" +1 DICE, CRITICAL, ARMOUR PIERCING 2, RISKY, TWO-HANDED. LIMIT: 2.',
  },
  {
    id: 'tesla_carbine',
    name: 'Tesla Carbine',
    type: 'heavy',
    range: 24,
    cost: 25,
    handedness: 'two-handed',
    keywords: ['ASSAULT', 'STUN', 'VICIOUS 11', 'HEAVY', 'TWO-HANDED'],
    description: '24" ASSAULT, STUN, VICIOUS 11, HEAVY, TWO-HANDED. On Critical Hit, repeat attack against another enemy within 3" (no chain).',
  },
  // Necron Pistols
  {
    id: 'gauntlet_of_fire_nec',
    name: 'Gauntlet of Fire',
    type: 'ranged',
    range: 6,
    cost: 30,
    limit: 2,
    isMainHandOnly: true,
    keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE', 'PISTOL', 'MAIN HAND ONLY'],
    description: '6" FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, FIRE, PISTOL, MAIN HAND ONLY. Loses FLAMETHROWER in melee. Elite Only, LIMIT: 2.',
    restrictedTo: ['ELITE'],
  },
  {
    id: 'particle_caster',
    name: 'Particle Caster',
    type: 'ranged',
    range: 12,
    cost: 10,
    keywords: ['ASSAULT', 'PISTOL'],
    description: '12" ASSAULT, PISTOL.',
  },
  {
    id: 'transdimensional_beamer',
    name: 'Transdimensional Beamer',
    type: 'ranged',
    range: 12,
    cost: 10,
    keywords: ['ARMOUR PIERCING 1', 'PISTOL'],
    description: '12" ARMOUR PIERCING 1, PISTOL.',
  },
  // Necron Heavy Ranged
  {
    id: 'gauss_cannon',
    name: 'Gauss Cannon',
    type: 'heavy',
    range: 36,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['ARMOUR PIERCING 2', 'CRITICAL', 'HEAVY', 'TWO-HANDED'],
    description: '36" ARMOUR PIERCING 2, CRITICAL, HEAVY, TWO-HANDED. LIMIT: 1.',
  },
  {
    id: 'heat_ray_nec',
    name: 'Heat Ray',
    type: 'heavy',
    range: 12,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['FLAMETHROWER', 'FIRE', 'HEAVY', 'TWO-HANDED'],
    description: '12" FLAMETHROWER, FIRE, HEAVY, TWO-HANDED. Can target up to 3 different enemies. LIMIT: 1.',
  },
  {
    id: 'particle_shredder',
    name: 'Particle Shredder',
    type: 'heavy',
    range: 18,
    cost: 20,
    handedness: 'two-handed',
    keywords: ['BLAST 3"', 'SHRAPNEL', 'HEAVY', 'TWO-HANDED'],
    description: '18" BLAST 3", SHRAPNEL, HEAVY, TWO-HANDED.',
  },
  {
    id: 'tesla_cannon',
    name: 'Tesla Cannon',
    type: 'heavy',
    range: 36,
    cost: 25,
    handedness: 'two-handed',
    keywords: ['BLAST 3"', 'HEAVY', 'STUN', 'TWO-HANDED'],
    description: '36" BLAST 3", HEAVY, STUN, TWO-HANDED.',
  },
  {
    id: 'twin_gauss_blaster',
    name: 'Twin Gauss Blaster',
    type: 'heavy',
    range: 24,
    cost: 40,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'AUTOMATIC 2', 'HEAVY', 'ARMOUR PIERCING 1', 'TWO-HANDED'],
    description: '24" +1 DICE, AUTOMATIC 2, HEAVY, ARMOUR PIERCING 1, TWO-HANDED. Tomb Blade Only.',
  },
  {
    id: 'twin_tesla_carbine',
    name: 'Twin Tesla Carbine',
    type: 'heavy',
    range: 24,
    cost: 30,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'ASSAULT', 'STUN', 'VICIOUS 11', 'HEAVY', 'TWO-HANDED'],
    description: '24" +1 DICE, ASSAULT, STUN, VICIOUS 11, HEAVY, TWO-HANDED. On Critical Hit, repeat attack within 3" (no chain). Tomb Blade Only.',
  },
  // Destroyer Cult Exclusive Ranged
  {
    id: 'enmitic_annihilator',
    name: 'Enmitic Annihilator',
    type: 'heavy',
    range: 18,
    cost: 30,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'CRITICAL', 'HEAVY', 'TWO-HANDED'],
    description: '18" AUTOMATIC 2, CRITICAL, HEAVY, TWO-HANDED. LIMIT: 2. Destroyer Cult only.',
  },
  {
    id: 'enmitic_disintegrator_pistol',
    name: 'Enmitic Disintegrator Pistol',
    type: 'ranged',
    range: 12,
    cost: 10,
    keywords: ['CRITICAL', 'PISTOL'],
    description: '12" CRITICAL, PISTOL. Destroyer Cult only.',
  },
  {
    id: 'enmitic_exterminator',
    name: 'Enmitic Exterminator',
    type: 'heavy',
    range: 36,
    cost: 55,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 3', 'CRITICAL', 'HEAVY', 'RELOAD', 'TWO-HANDED'],
    description: '36" AUTOMATIC 3, CRITICAL, HEAVY, RELOAD, TWO-HANDED. LIMIT: 1. Destroyer Cult only.',
  },
  {
    id: 'gauss_destructor',
    name: 'Gauss Destructor',
    type: 'heavy',
    range: 48,
    cost: 4,
    costCurrency: 'glory',
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'TWO-HANDED'],
    description: '48" +1 INJURY DICE, IGNORE ARMOUR, HEAVY, TWO-HANDED. 4 Glory, LIMIT: 1. Destroyer Cult only.',
  },
];

export const necronsMeleeWeapons: Weapon[] = [
  {
    id: 'flayer_claws',
    name: 'Flayer Claws',
    type: 'melee',
    cost: 0,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'CRITICAL', 'CUMBERSOME', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, CRITICAL, CUMBERSOME, TWO-HANDED.',
  },
  {
    id: 'claw_nec',
    name: 'Claw',
    type: 'melee',
    cost: 1,
    keywords: ['-1 DICE'],
    description: 'Melee, -1 DICE.',
  },
  {
    id: 'lords_blade_nec',
    name: "Lord's Blade",
    type: 'melee',
    cost: 15,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+2 INJURY MODIFIER', 'TWO-HANDED'],
    description: 'Melee, +2 INJURY MODIFIER, TWO-HANDED. Elite Only, LIMIT: 1.',
    restrictedTo: ['ELITE'],
  },
  {
    id: 'mace_nec',
    name: 'Mace',
    type: 'melee',
    cost: 3,
    keywords: [],
    description: 'Melee.',
  },
  {
    id: 'sword_nec',
    name: 'Sword',
    type: 'melee',
    cost: 4,
    keywords: ['CRITICAL'],
    description: 'Melee, CRITICAL.',
  },
  {
    id: 'voidblade',
    name: 'Voidblade',
    type: 'melee',
    cost: 15,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['MAIN HAND ONLY'],
    description: 'Melee, MAIN HAND ONLY. If target has armour from any source other than a shield, you may set one injury die to 6 before rolling. Elite or Lychguard Only, LIMIT: 1.',
    restrictedTo: ['ELITE'],
  },
  {
    id: 'warscythe',
    name: 'Warscythe',
    type: 'melee',
    cost: 20,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'CUMBERSOME', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, CUMBERSOME, TWO-HANDED. If target has armour from any source other than a shield, you may set one injury die to 6 before rolling. Elite or Lychguard Only, LIMIT: 1.',
    restrictedTo: ['ELITE'],
  },
  // Necron Staffs (HELD, Strike + Lance mode)
  {
    id: 'abyssal_staff',
    name: 'Abyssal Staff',
    type: 'melee',
    cost: 15,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['CRITICAL', 'MAIN HAND ONLY', 'HELD'],
    description: 'HELD. Strike: Melee, CRITICAL, MAIN HAND ONLY. Abyssal Lance: 18" BLAST 2", CRITICAL. Elite Only, LIMIT: 1.',
    restrictedTo: ['ELITE'],
  },
  {
    id: 'aeonstave',
    name: 'Aeonstave',
    type: 'melee',
    cost: 15,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['MAIN HAND ONLY', 'HELD'],
    description: "HELD. Strike: Melee, MAIN HAND ONLY (on hit, target must succeed at a Success Roll or suffer 1 extra BLOOD MARKER). Entropic Lance: 18\" (same BLOOD MARKER effect). Elite Only, LIMIT: 1.",
    restrictedTo: ['ELITE'],
  },
  {
    id: 'eldritch_lance',
    name: 'Eldritch Lance',
    type: 'melee',
    cost: 25,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['IGNORE ARMOUR', 'MAIN HAND ONLY', 'HELD'],
    description: 'HELD. Strike: Melee, IGNORE ARMOUR, MAIN HAND ONLY. Annihilating Lance: 18" IGNORE ARMOUR. Elite Only, LIMIT: 1.',
    restrictedTo: ['ELITE'],
  },
  {
    id: 'rod_of_covenant',
    name: 'Rod of Covenant',
    type: 'melee',
    cost: 15,
    limit: 2,
    isMainHandOnly: true,
    keywords: ['ARMOUR PIERCING 1', 'MAIN HAND ONLY', 'HELD'],
    description: 'HELD. Strike: Melee, ARMOUR PIERCING 1, MAIN HAND ONLY. Abyssal Lance: 12" ARMOUR PIERCING 2. Non-Cryptek Elite or Lychguard Only, LIMIT: 2.',
    restrictedTo: ['ELITE'],
  },
  {
    id: 'staff_of_light_nec',
    name: 'Staff of Light',
    type: 'melee',
    cost: 10,
    isMainHandOnly: true,
    keywords: ['MAIN HAND ONLY', 'HELD'],
    description: 'HELD. Strike: Melee, MAIN HAND ONLY. Solar Lance: 18". Elite Only.',
    restrictedTo: ['ELITE'],
  },
  {
    id: 'tremorstave',
    name: 'Tremorstave',
    type: 'melee',
    cost: 30,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['+1 INJURY MODIFIER', 'MAIN HAND ONLY', 'HELD'],
    description: 'HELD. Strike: Melee, +1 INJURY MODIFIER, MAIN HAND ONLY. Earthquake: 18" +1 INJURY MODIFIER. Elite Only, LIMIT: 1.',
    restrictedTo: ['ELITE'],
  },
  {
    id: 'voltaic_staff',
    name: 'Voltaic Staff',
    type: 'melee',
    cost: 15,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['STUN', 'MAIN HAND ONLY', 'HELD'],
    description: 'HELD. Strike: Melee, STUN, MAIN HAND ONLY. Lightning Bolt: 18" STUN. Elite Only, LIMIT: 1.',
    restrictedTo: ['ELITE'],
  },
  // Destroyer Cult Exclusive Melee
  {
    id: 'hyperphase_sword_nec',
    name: 'Hyperphase Sword',
    type: 'melee',
    cost: 20,
    keywords: ['IGNORE ARMOUR', 'CRITICAL'],
    description: 'Melee, IGNORE ARMOUR, CRITICAL. Destroyer Cult only.',
  },
  {
    id: 'hyperphase_thresher',
    name: 'Hyperphase Thresher',
    type: 'melee',
    cost: 10,
    keywords: ['-1 INJURY DICE', 'IGNORE ARMOUR', 'CRITICAL'],
    description: 'Melee, -1 INJURY DICE, IGNORE ARMOUR, CRITICAL. Destroyer Cult only.',
  },
];

// ============================================================================
// LEAGUES OF VOTANN FACTION WEAPONS
// Source: Leagues of Votann.md — Unique Battlekit
// ============================================================================

export const leaguesOfVotannRangedWeapons: Weapon[] = [
  // Unique Ranged
  {
    id: 'etacarn_plasma_beamer',
    name: 'EtaCarn Plasma Beamer',
    type: 'ranged',
    range: 18,
    cost: 15,
    handedness: 'two-handed',
    keywords: ['ASSAULT', 'ARMOUR PIERCING 1', 'TWO-HANDED'],
    description: '18" ASSAULT, ARMOUR PIERCING 1, TWO-HANDED.',
  },
  {
    id: 'etacarn_plasma_gun',
    name: 'EtaCarn Plasma Gun',
    type: 'ranged',
    range: 24,
    cost: 15,
    handedness: 'two-handed',
    keywords: ['ARMOUR PIERCING 1', 'TWO-HANDED'],
    description: '24" ARMOUR PIERCING 1, TWO-HANDED.',
  },
  {
    id: 'ion_blaster',
    name: 'Ion Blaster',
    type: 'ranged',
    range: 18,
    cost: 20,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'TWO-HANDED'],
    description: '18" +1 INJURY DICE, TWO-HANDED.',
  },
  {
    id: 'iron_ambassador',
    name: 'Iron Ambassador',
    type: 'ranged',
    range: 24,
    cost: 3,
    costCurrency: 'glory',
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 3', 'ASSAULT', 'RISKY', 'TWO-HANDED'],
    description: '24" AUTOMATIC 3, ASSAULT, RISKY, TWO-HANDED. 3 Glory, LIMIT: 1.',
  },
  {
    id: 'volkanite_disintegrator',
    name: 'Volkanite Disintegrator',
    type: 'ranged',
    range: 18,
    cost: 35,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['ARMOUR PIERCING 2', 'CRITICAL', 'FIRE', 'TWO-HANDED'],
    description: '18" ARMOUR PIERCING 2, CRITICAL, FIRE, TWO-HANDED. LIMIT: 2.',
  },
  // Unique Pistols
  {
    id: 'etacarn_plasma_pistol',
    name: 'EtaCarn Plasma Pistol',
    type: 'ranged',
    range: 12,
    cost: 15,
    limit: 2,
    keywords: ['ARMOUR PIERCING 1', 'PISTOL'],
    description: '12" ARMOUR PIERCING 1, PISTOL. LIMIT: 2.',
  },
  {
    id: 'ion_pistol',
    name: 'Ion Pistol',
    type: 'ranged',
    range: 12,
    cost: 25,
    limit: 2,
    isMainHandOnly: true,
    keywords: ['+1 INJURY DICE', 'PISTOL', 'MAIN HAND ONLY'],
    description: '12" +1 INJURY DICE, PISTOL, MAIN HAND ONLY. Elite Only, LIMIT: 2.',
  },
  // Unique Heavy Ranged
  {
    id: 'heavy_volkanite_disintegrator',
    name: 'Heavy Volkanite Disintegrator',
    type: 'heavy',
    range: 24,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['CRITICAL', 'FIRE', 'HEAVY', 'IGNORE ARMOUR', 'TWO-HANDED'],
    description: '24" CRITICAL, FIRE, HEAVY, IGNORE ARMOUR, TWO-HANDED. LIMIT: 1.',
  },
  {
    id: 'ion_beamer',
    name: 'Ion Beamer',
    type: 'heavy',
    range: 18,
    cost: 25,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'BLAST 2"', 'HEAVY', 'TWO-HANDED'],
    description: '18" +1 INJURY DICE, BLAST 2", HEAVY, TWO-HANDED. LIMIT: 1.',
  },
  {
    id: 'magna_rail_rifle',
    name: 'Magna Rail Rifle',
    type: 'heavy',
    range: 18,
    cost: 45,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+2 INJURY DICE', 'HEAVY', 'TWO-HANDED'],
    description: '18" +2 INJURY DICE, HEAVY, TWO-HANDED. LIMIT: 1.',
  },
  {
    id: 'sp_conversion_beamer',
    name: 'SP Conversion Beamer',
    type: 'heavy',
    range: 24,
    cost: 15,
    handedness: 'two-handed',
    keywords: ['IGNORE LONG RANGE', 'CRITICAL', 'HEAVY', 'TWO-HANDED', 'VICIOUS 10 at Long Range'],
    description: '24" IGNORE LONG RANGE, CRITICAL, HEAVY, TWO-HANDED. VICIOUS 10 when firing at Long Range.',
  },
  // Unique Thrown
  {
    id: 'throwing_plasma_knives',
    name: 'Throwing Plasma Knives',
    type: 'thrown',
    range: 8,
    cost: 7,
    keywords: ['IGNORE LONG RANGE', 'ASSAULT', 'ARMOUR PIERCING 1', 'THROWN'],
    description: '8" IGNORE LONG RANGE, ASSAULT, ARMOUR PIERCING 1, THROWN.',
  },
];

export const leaguesOfVotannMeleeWeapons: Weapon[] = [
  {
    id: 'concussion_gauntlet',
    name: 'Concussion Gauntlet',
    type: 'melee',
    cost: 12,
    limit: 2,
    isMainHandOnly: true,
    keywords: ['STUN', 'MAIN HAND ONLY'],
    description: 'Melee, STUN, MAIN HAND ONLY. On hit vs non-LARGE target: moves target D3" directly away. LIMIT: 2.',
  },
  {
    id: 'heavy_concussion_gauntlet',
    name: 'Heavy Concussion Gauntlet',
    type: 'melee',
    cost: 18,
    isMainHandOnly: true,
    keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'STUN', 'MAIN HAND ONLY'],
    description: 'Melee, +1 INJURY MODIFIER, HEAVY, STUN, MAIN HAND ONLY. On hit vs non-LARGE target: moves target D3+1" directly away. Steeljack Only.',
  },
  {
    id: 'twin_concussion_gauntlets',
    name: 'Twin Concussion Gauntlets',
    type: 'melee',
    cost: 18,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'CUMBERSOME', 'STUN', 'TWO-HANDED'],
    description: 'Melee, +1 DICE, CUMBERSOME, STUN, TWO-HANDED. On hit vs non-LARGE target: moves target D3" directly away. LIMIT: 1.',
  },
  {
    id: 'twin_heavy_concussion_gauntlets',
    name: 'Twin Heavy Concussion Gauntlets',
    type: 'melee',
    cost: 23,
    handedness: 'two-handed',
    keywords: ['+1 DICE', '+1 INJURY MODIFIER', 'CUMBERSOME', 'HEAVY', 'STUN', 'TWO-HANDED'],
    description: 'Melee, +1 DICE, +1 INJURY MODIFIER, CUMBERSOME, HEAVY, STUN, TWO-HANDED. On hit vs non-LARGE target: moves target D3+1" directly away. Steeljack Only.',
  },
  {
    id: 'plasma_blade_lv',
    name: 'Plasma Blade',
    type: 'melee',
    cost: 15,
    limit: 4,
    keywords: ['CRITICAL', 'ARMOUR PIERCING 1'],
    description: 'Melee, CRITICAL, ARMOUR PIERCING 1. LIMIT: 4.',
  },
  {
    id: 'heavy_plasma_blade_lv',
    name: 'Heavy Plasma Blade',
    type: 'melee',
    cost: 18,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['CRITICAL', 'ARMOUR PIERCING 1', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee, CRITICAL, ARMOUR PIERCING 1, HEAVY, TWO-HANDED. LIMIT: 2.',
  },
];

// ============================================================================
// CHAOS CULT FACTION WEAPONS
// ============================================================================

export const chaosCultWeapons: Weapon[] = [
  {
    id: 'burning_censer_cc',
    name: 'Burning Censer',
    type: 'melee',
    cost: 45,
    limit: 1,
    keywords: ['HELD', 'TWO-HANDED', 'FIRE', 'CUMBERSOME'],
    description: 'HELD, TWO-HANDED. Strike: Melee, FIRE, CUMBERSOME. Flame: 6" FLAMETHROWER, +1 INJURY DICE, IGNORE ARMOUR, FIRE. As an Action with a Success Roll: heal self or ally within 6" (remove 1 BM, or 3 BM on critical success). LIMIT: 1. (Chaos Disciple Only)',
  },
];

// ============================================================================
// THE INQUISITION FACTION WEAPONS
// ============================================================================

export const inquisitionWeapons: Weapon[] = [
  {
    id: 'digital_weapons_inq',
    name: 'Digital Weapons',
    type: 'ranged',
    range: 24,
    cost: 35,
    handedness: 'two-handed',
    keywords: ['HEAVY', 'TWO-HANDED'],
    description: 'HEAVY, TWO-HANDED. Focused Strike: 24" +1 INJURY DICE FIRE. Scatter Shot: 12" BLAST 2" ASSAULT SHRAPNEL. (Jokaero Only)',
  },
];

// ============================================================================
// ADEPTUS MINISTORUM FACTION WEAPONS
// ============================================================================

export const adeptusMiniStorumWeapons: Weapon[] = [
  {
    id: 'brazier_of_holy_fire_min',
    name: 'Brazier of Holy Fire',
    type: 'melee',
    cost: 15,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['HELD', 'FIRE', '+1 INJURY DICE vs DAEMON/PSYKER', 'MAIN HAND ONLY'],
    description: 'HELD, FIRE. Strike: Melee, MAIN HAND ONLY. Unleash: 12" FLAMETHROWER, IGNORE ARMOUR (once per battle). (Adeptus Ministorum)',
  },
  {
    id: 'dartmask_min',
    name: 'Dartmask',
    type: 'ranged',
    range: 6,
    cost: 5,
    limit: 2,
    keywords: ['IGNORE LONG RANGE', 'GAS', 'ASSAULT', 'THROWN'],
    description: '6", IGNORE LONG RANGE, GAS, ASSAULT, THROWN. LIMIT: 2.',
  },
  {
    id: 'incentiviser_min',
    name: 'Incentiviser',
    type: 'melee',
    cost: 10,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['CUMBERSOME', 'STUN', 'TWO-HANDED'],
    description: 'Melee, CUMBERSOME, STUN, TWO-HANDED. As Action: grant ally within 1" +1 DICE to Dash. LIMIT: 1.',
  },
  {
    id: 'mace_of_censure_min',
    name: 'Mace of Censure',
    type: 'melee',
    cost: 15,
    limit: 1,
    keywords: ['+1 INJURY MODIFIER', 'STUN'],
    description: 'Melee, +1 INJURY MODIFIER, STUN. LIMIT: 1. (Elite Only)',
  },
  {
    id: 'null_skull_min',
    name: 'Null Skull',
    type: 'melee',
    cost: 15,
    limit: 1,
    keywords: ['+1 INJURY DICE vs DAEMON/PSYKER', 'FEAR', 'DENY THE WITCH'],
    description: 'Melee, +1 INJURY DICE vs DAEMON/PSYKER. Carrier gains FEAR and can Deny the Witch as PSYKER 1.',
  },
  {
    id: 'zealots_vindictor_min',
    name: "Zealot's Vindictor",
    type: 'melee',
    cost: 45,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['TWO-HANDED', 'HELD', 'CRITICAL', 'RISKY', 'SHRAPNEL', 'CUMBERSOME', 'ASSAULT'],
    description: 'TWO-HANDED, HELD. Chain Blade: Melee, CRITICAL, RISKY, SHRAPNEL, CUMBERSOME. Torch: 8", ASSAULT, FLAMETHROWER, IGNORE ARMOUR, FIRE. LIMIT: 1.',
  },
];

// ============================================================================
// OFFICIO ASSASSINORUM FACTION WEAPONS
// ============================================================================

export const officioAssassinorumWeapons: Weapon[] = [
  // Melee
  {
    id: 'hookfang_oa',
    name: 'Hookfang',
    type: 'melee',
    cost: 10,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['GAS', 'INFECTION MARKERS', 'MAIN HAND ONLY'],
    description: 'Melee, GAS, INFECTION MARKERS, MAIN HAND ONLY. LIMIT: 1. (Venenum only)',
  },
  {
    id: 'neuro_gauntlet_oa',
    name: 'Neuro Gauntlet',
    type: 'melee',
    cost: 25,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['IGNORE ARMOUR', 'STUN', 'MAIN HAND ONLY'],
    description: 'Melee, IGNORE ARMOUR, STUN (causes 2 extra STUN MARKERS), MAIN HAND ONLY. LIMIT: 1. (Eversor Only)',
  },
  {
    id: 'nemesii_blade_oa',
    name: 'Nemesii Blade',
    type: 'melee',
    cost: 10,
    limit: 1,
    keywords: ['CRITICAL', 'ARMOUR PIERCING 1'],
    description: 'Melee, CRITICAL, ARMOUR PIERCING 1. LIMIT: 1. (Adamus Only)',
  },
  {
    id: 'phase_sword_oa',
    name: 'Phase Sword',
    type: 'melee',
    cost: 20,
    limit: 1,
    keywords: ['IGNORE ARMOUR', 'CRITICAL'],
    description: 'Melee, IGNORE ARMOUR, CRITICAL. LIMIT: 1. (Callidus Only)',
  },
  {
    id: 'sympatic_dataspike_oa',
    name: 'Sympatic Dataspike',
    type: 'melee',
    cost: 20,
    keywords: ['CRITICAL', 'ARMOUR PIERCING 2', 'STUN'],
    description: 'Melee, CRITICAL, ARMOUR PIERCING 2, STUN. (Vanus Only)',
  },
  // Ranged
  {
    id: 'exitus_rifle_oa',
    name: 'Exitus Rifle',
    type: 'ranged',
    range: 48,
    cost: 45,
    handedness: 'two-handed',
    keywords: ['+1 DICE', '+1 INJURY DICE', 'CRITICAL', 'ARMOUR PIERCING 1', 'TWO-HANDED'],
    description: '48", +1 DICE, Ignores -DICE to Injury, +1 INJURY DICE, CRITICAL, ARMOUR PIERCING 1, TWO-HANDED, Scope. (Vindicare Only)',
  },
  {
    id: 'exitus_pistol_oa',
    name: 'Exitus Pistol',
    type: 'ranged',
    range: 12,
    keywords: ['ASSAULT', 'CRITICAL', 'PISTOL'],
    cost: 15,
    limit: 1,
    description: '12" or Melee (always uses Ranged skill), Ignores -DICE to Injury, ASSAULT, CRITICAL, PISTOL, Scope. LIMIT: 1. (Vindicare Only)',
  },
  {
    id: 'needlespine_blaster_oa',
    name: 'Needlespine Blaster',
    type: 'ranged',
    range: 12,
    cost: 15,
    limit: 2,
    keywords: ['PISTOL', 'GAS', 'CRITICAL'],
    description: '12", PISTOL. Spine: GAS. Bolt: CRITICAL on 11+. Both profiles fired on Shoot. LIMIT: 2.',
  },
  {
    id: 'neural_shredder_oa',
    name: 'Neural Shredder',
    type: 'ranged',
    range: 12,
    cost: 35,
    handedness: 'two-handed',
    keywords: ['IGNORE ARMOUR', 'ASSAULT', 'STUN', 'TWO-HANDED'],
    description: '12", IGNORE ARMOUR, ASSAULT, STUN, TWO-HANDED. (Callidus Only)',
  },
  {
    id: 'toxin_ejector_oa',
    name: 'Toxin Ejector',
    type: 'ranged',
    range: 8,
    cost: 45,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', '-1 INJURY DICE', 'FLAMETHROWER', 'IGNORE ARMOUR', 'GAS', 'TWO-HANDED'],
    description: '8", AUTOMATIC 2, -1 INJURY DICE, FLAMETHROWER, IGNORE ARMOUR, GAS, TWO-HANDED. (Venenum Only)',
  },
  // Thrown
  {
    id: 'poison_globes_oa',
    name: 'Poison Globes',
    type: 'ranged',
    range: 8,
    cost: 15,
    keywords: ['IGNORE ARMOUR', 'ASSAULT', 'BLAST 3"', 'GAS', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'],
    description: '8", IGNORE ARMOUR, ASSAULT, BLAST 3", GAS, IGNORE COVER, IGNORE LONG RANGE, THROWN. (Venenum Only)',
  },
  {
    id: 'psyk_out_grenades_oa',
    name: 'Psyk-Out Grenades',
    type: 'ranged',
    range: 8,
    cost: 7,
    keywords: ['IGNORE ARMOUR', '+1 INJURY DICE vs DAEMON/PSYKER', 'BLAST 2"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'ASSAULT', 'STUN', 'THROWN'],
    description: '8", IGNORE ARMOUR, +1 INJURY DICE vs DAEMON/PSYKER, BLAST 2", IGNORE COVER, IGNORE LONG RANGE, ASSAULT, STUN, THROWN. (Culexus Only)',
  },
  // Digital Lasers
  {
    id: 'digital_laser_oa',
    name: 'Digital Laser',
    type: 'ranged',
    range: 6,
    cost: 5,
    limit: 3,
    handedness: 'no-hands',
    keywords: ['PISTOL', '-1 INJURY DICE'],
    description: '6", PISTOL, -1 INJURY DICE, takes no hands. Can be used in addition to any other attacks. Once per battle. LIMIT: 3.',
  },
  {
    id: 'digital_laser_array_oa',
    name: 'Digital Laser Array',
    type: 'ranged',
    range: 6,
    costCurrency: 'glory',
    cost: 2,
    limit: 1,
    handedness: 'no-hands',
    keywords: ['PISTOL', '-1 INJURY DICE'],
    restrictedTo: ['Elite'],
    description: '6", PISTOL, -1 INJURY DICE, takes no hands. Can be used in addition to any other attacks. Cannot be combined with a Digital Laser. LIMIT: 1, Elite Only. (Campaign Shop)',
  },
];

// ============================================================================
// VERMINTIDE FACTION WEAPONS
// ============================================================================

export const vermintideWeapons: Weapon[] = [
  // Ranged
  {
    id: 'doomrocket_ver',
    name: 'Doomrocket',
    type: 'ranged',
    range: 24,
    handedness: 'two-handed',
    cost: 40,
    keywords: ['-1 DICE', '+1 INJURY DICE', 'IGNORE COVER', 'BLAST 2"', 'SCATTER', 'SHRAPNEL', 'TWO-HANDED'],
    description: '24", -1 DICE, +1 INJURY DICE, IGNORE COVER, BLAST 2", SCATTER, SHRAPNEL, TWO-HANDED. On roll of 2 hits attacker instead. (Warlock Only)',
  },
  {
    id: 'warpfire_gauntlet_ver',
    name: 'Warpfire Gauntlet',
    type: 'melee',
    cost: 40,
    limit: 1,
    keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE', 'PISTOL'],
    description: '8", FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, FIRE, PISTOL. LIMIT: 1. (Psyker Only)',
  },
  {
    id: 'warpfuel_rifle_ver',
    name: 'Warpfuel Rifle',
    type: 'ranged',
    range: 24,
    cost: 10,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'RISKY', 'TWO-HANDED'],
    description: '24", +1 DICE, RISKY, TWO-HANDED, roll on injury table on a miss. Scope.',
  },
  {
    id: 'warpfuel_shotgun_ver',
    name: 'Warpfuel Shotgun',
    type: 'ranged',
    range: 12,
    cost: 20,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'ASSAULT', 'RISKY', 'SHOTGUN', 'TWO-HANDED'],
    description: '12", +1 DICE, ASSAULT, RISKY, SHOTGUN, TWO-HANDED, roll on injury table on a miss. Shield Combo. LIMIT: 2.',
  },
  {
    id: 'warpvolt_obliterator_ver',
    name: 'Warpvolt Obliterator',
    type: 'ranged',
    range: 16,
    cost: 25,
    handedness: 'two-handed',
    keywords: ['-1 INJURY DICE', 'AUTOMATIC 2', 'RISKY', 'STUN', 'TWO-HANDED'],
    description: '16", -1 INJURY DICE, AUTOMATIC 2, RISKY, STUN, TWO-HANDED. (Warlock Only)',
  },
  // Pistol
  {
    id: 'warpfuel_pistol_ver',
    name: 'Warpfuel Pistol',
    type: 'ranged',
    range: 12,
    cost: 6,
    keywords: ['+1 DICE', 'PISTOL', 'RISKY'],
    description: '12", +1 DICE, PISTOL, RISKY, roll on injury table on a miss.',
  },
  // Heavy ranged
  {
    id: 'warpfuel_jezzail_ver',
    name: 'Warpfuel Jezzail',
    type: 'ranged',
    range: 36,
    cost: 25,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 DICE', '+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'RISKY', 'TWO-HANDED'],
    description: '36", +1 DICE, +1 INJURY DICE, CRITICAL, HEAVY, RISKY, TWO-HANDED, roll on injury table on a miss. Shield Combo, Scope. LIMIT: 2.',
  },
  {
    id: 'warpvolt_scourger_ver',
    name: 'Warpvolt Scourger',
    type: 'ranged',
    range: 18,
    cost: 35,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'HEAVY', 'RISKY', 'STUN', 'TWO-HANDED'],
    description: '18", AUTOMATIC 2, HEAVY, RISKY, STUN, TWO-HANDED. LIMIT: 1.',
  },
  {
    id: 'windlauncher_ver',
    name: 'Windlauncher',
    type: 'ranged',
    range: 36,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['-1 INJURY DICE', 'BLAST 3"', 'GAS', 'IGNORE ARMOUR', 'IGNORE COVER', 'HEAVY', 'TWO-HANDED'],
    description: '36", -1 INJURY DICE, BLAST 3", GAS, IGNORE ARMOUR, IGNORE COVER, HEAVY, TWO-HANDED. LIMIT: 1.',
  },
  // Thrown
  {
    id: 'plasma_bombs_ver',
    name: 'Plasma Bombs',
    type: 'ranged',
    range: 6,
    cost: 10,
    keywords: ['ASSAULT', 'BLAST 2"', 'FIRE', 'IGNORE COVER', 'IGNORE LONG RANGE', 'RISKY', 'THROWN'],
    description: '6", ASSAULT, BLAST 2", FIRE, IGNORE COVER, IGNORE LONG RANGE, RISKY, THROWN.',
  },
  {
    id: 'poison_stars_ver',
    name: 'Poison Stars',
    type: 'ranged',
    range: 6,
    cost: 7,
    keywords: ['GAS', 'IGNORE LONG RANGE', 'THROWN'],
    description: '6", GAS, IGNORE LONG RANGE, THROWN. (Night Runner Only)',
  },
  // Melee
  {
    id: 'foetid_blade_ver',
    name: 'Foetid Blade',
    type: 'melee',
    cost: 7,
    keywords: ['INFECTION MARKERS'],
    description: 'Melee, INFECTION MARKERS. (Plague Monk Only)',
  },
  {
    id: 'herding_whip_ver',
    name: 'Herding Whip',
    type: 'melee',
    cost: 7,
    limit: 1,
    keywords: ['ASSAULT', 'IGNORE LONG RANGE', 'WHIP 3"'],
    description: 'Melee, ASSAULT, IGNORE LONG RANGE, WHIP 3". Friendly BEAST within 6" get +1 DICE to Dash. LIMIT: 1. (Packmaster Only)',
  },
  {
    id: 'piston_claw_ver',
    name: 'Piston Claw',
    type: 'melee',
    cost: 15,
    limit: 1,
    isMainHandOnly: true,
    keywords: ['ARMOUR PIERCING 2', 'MAIN HAND ONLY'],
    description: 'Melee, ARMOUR PIERCING 2, MAIN HAND ONLY. LIMIT: 1. (Elite Only)',
  },
  {
    id: 'plague_censer_ver',
    name: 'Plague Censer',
    type: 'melee',
    cost: 12,
    handedness: 'two-handed',
    keywords: ['GAS', 'TWO-HANDED'],
    description: 'Melee, GAS, TWO-HANDED. Enemies within 1" without NEGATE GAS have -1 DICE to all Success Rolls. (Plague Monk Only)',
  },
  {
    id: 'things_catcher_ver',
    name: "Things Catcher",
    type: 'melee',
    cost: 10,
    limit: 1,
    keywords: ['CRITICAL', 'STUN'],
    description: 'Melee, CRITICAL, STUN. Enemies cannot Retreat from wielder. LIMIT: 1. (Packmaster Only)',
  },
  {
    id: 'warpforged_dagger_ver',
    name: 'Warpforged Dagger',
    type: 'melee',
    cost: 15,
    limit: 1,
    keywords: ['PSYCHIC', 'RISKY'],
    description: 'Melee, PSYCHIC, RISKY. Remove 1 BLOOD MARKER on a hit that causes BM or OOA. LIMIT: 1. (Psyker Only)',
    restrictedTo: ['PSYKER'],
  },
  {
    id: 'warpstone_staff_ver',
    name: 'Warpstone Staff',
    type: 'melee',
    cost: 2,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['+1 INJURY DICE', 'PSYCHIC', 'RISKY', '+1 INJURY DICE vs DAEMON/PSYKER'],
    description: 'Melee, +1 INJURY DICE, PSYCHIC, RISKY. Additional +1 INJURY DICE against DAEMON or PSYKER. 2 Glory, LIMIT: 1. (Psyker Only)',
    restrictedTo: ['PSYKER'],
  },
  {
    id: 'woe_stave_ver',
    name: 'Woe Stave',
    type: 'melee',
    cost: 10,
    limit: 1,
    keywords: ['BLOCK', 'INFECTION MARKERS'],
    description: 'Melee, BLOCK, INFECTION MARKERS. LIMIT: 1. (Plague Monk Only)',
  },
  // Heavy melee
  {
    id: 'doomflayer_gauntlets_ver',
    name: 'Doomflayer Gauntlets',
    type: 'melee',
    cost: 35,
    keywords: ['+1 INJURY DICE', 'HEAVY'],
    description: 'Melee, +1 INJURY DICE, HEAVY (+1 more if Charged). Pair of two weapons. (Rat Ogryn Only)',
  },
  {
    id: 'grinderfists_ver',
    name: 'Grinderfists',
    type: 'melee',
    cost: 45,
    keywords: ['ARMOUR PIERCING 2', 'HEAVY', 'DEEP STRIKE'],
    description: 'Melee, ARMOUR PIERCING 2, HEAVY. Pair of two. Grants DEEP STRIKE. (Rat Ogryn Only)',
  },
  {
    id: 'shock_gauntlets_ver',
    name: 'Shock Gauntlets',
    type: 'melee',
    cost: 35,
    keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'STUN'],
    description: 'Melee, +1 INJURY MODIFIER, HEAVY, STUN. Pair of two. (Rat Ogryn Only)',
  },
  {
    id: 'warpgrinder_ver',
    name: 'Warpgrinder',
    type: 'melee',
    cost: 45,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY MODIFIER', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED', 'DEEP STRIKE'],
    description: 'Melee, +1 INJURY MODIFIER, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED. Grants DEEP STRIKE. LIMIT: 1. (Skaven only)',
  },
];

// ============================================================================
// ADEPTUS MECHANICUS FACTION WEAPONS
// ============================================================================

export const adeptusMechanicusWeapons: Weapon[] = [
  // Ranged
  {
    id: 'arc_lance_admech',
    name: 'Arc Lance',
    type: 'ranged',
    range: 12,
    cost: 15,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['ASSAULT', 'STUN', 'TWO-HANDED'],
    description: '12", ASSAULT, STUN, TWO-HANDED. LIMIT: 1.',
  },
  {
    id: 'arc_pistol_admech',
    name: 'Arc Pistol',
    type: 'ranged',
    range: 12,
    cost: 15,
    limit: 1,
    keywords: ['ASSAULT', 'STUN', 'PISTOL'],
    description: '12", ASSAULT, STUN, PISTOL. LIMIT: 1.',
  },
  {
    id: 'eradication_ray_admech',
    name: 'Eradication Ray',
    type: 'ranged',
    range: 24,
    cost: 2,
    costCurrency: 'glory',
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY MODIFIER', 'ARMOUR PIERCING 1', 'TWO-HANDED'],
    description: '24", +1 INJURY MODIFIER, ARMOUR PIERCING 1 within 12", TWO-HANDED. LIMIT: 1. Elite Only.',
  },
  {
    id: 'flechette_carbine_admech',
    name: 'Flechette Carbine',
    type: 'ranged',
    range: 18,
    cost: 35,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'ASSAULT', 'AUTOMATIC 2', '-1 INJURY DICE', 'SHRAPNEL', 'TWO-HANDED'],
    description: '18", +1 DICE if behind terrain, ASSAULT, AUTOMATIC 2, -1 INJURY DICE, SHRAPNEL, TWO-HANDED. LIMIT: 2.',
  },
  {
    id: 'galvanic_rifle_admech',
    name: 'Galvanic Rifle',
    type: 'ranged',
    range: 30,
    cost: 15,
    limit: 3,
    handedness: 'two-handed',
    keywords: ['STUN', 'TWO-HANDED'],
    description: '30", STUN, TWO-HANDED. LIMIT: 3.',
  },
  {
    id: 'phosphor_blaster_admech',
    name: 'Phosphor Blaster',
    type: 'ranged',
    range: 24,
    cost: 10,
    handedness: 'two-handed',
    keywords: ['IGNORE COVER', 'TWO-HANDED'],
    description: '24", IGNORE COVER, TWO-HANDED.',
  },
  {
    id: 'phosphor_carbine_admech',
    name: 'Phosphor Carbine',
    type: 'ranged',
    range: 18,
    cost: 15,
    handedness: 'two-handed',
    keywords: ['IGNORE COVER', 'ASSAULT', 'TWO-HANDED'],
    description: '18", IGNORE COVER, ASSAULT, TWO-HANDED.',
  },
  {
    id: 'plasma_caliver_admech',
    name: 'Plasma Caliver',
    type: 'ranged',
    range: 30,
    cost: 35,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['ARMOUR PIERCING 1', 'TWO-HANDED'],
    description: '30", TWO-HANDED. Normal: ARMOUR PIERCING 1. Overload: +1 INJURY DICE, ARMOUR PIERCING 1, RISKY. LIMIT: 1. Elite Only.',
  },
  {
    id: 'radium_carbine_admech',
    name: 'Radium Carbine',
    type: 'ranged',
    range: 18,
    cost: 20,
    handedness: 'two-handed',
    keywords: ['ASSAULT', 'GAS', 'TWO-HANDED'],
    description: '18", ASSAULT, GAS, TWO-HANDED.',
  },
  {
    id: 'transuranic_arquebus_admech',
    name: 'Transuranic Arquebus',
    type: 'ranged',
    range: 36,
    cost: 35,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['IGNORE ARMOUR', 'TWO-HANDED'],
    description: '36", IGNORE ARMOUR, TWO-HANDED. LIMIT: 1.',
  },
  {
    id: 'volkite_blaster_admech',
    name: 'Volkite Blaster',
    type: 'ranged',
    range: 24,
    cost: 2,
    costCurrency: 'glory',
    limit: 1,
    handedness: 'two-handed',
    keywords: ['CRITICAL', 'FIRE', 'RISKY', 'TWO-HANDED'],
    description: '24", CRITICAL, FIRE, RISKY, TWO-HANDED. LIMIT: 1.',
  },
  // Pistols
  {
    id: 'eradication_pistol_admech',
    name: 'Eradication Pistol',
    type: 'ranged',
    range: 12,
    cost: 1,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['ARMOUR PIERCING 1', 'PISTOL'],
    description: '12", ARMOUR PIERCING 1 within 6", PISTOL. LIMIT: 1. Elite Only.',
  },
  {
    id: 'flechette_blaster_admech',
    name: 'Flechette Blaster',
    type: 'ranged',
    range: 12,
    cost: 15,
    keywords: ['-1 INJURY DICE', '+1 DICE', 'ASSAULT', 'SHRAPNEL', 'PISTOL'],
    description: '12", -1 INJURY DICE, +1 DICE if behind terrain, ASSAULT, SHRAPNEL, PISTOL. Elite/Sicarian Only.',
  },
  {
    id: 'gamma_pistol_admech',
    name: 'Gamma Pistol',
    type: 'ranged',
    range: 12,
    cost: 2,
    costCurrency: 'glory',
    limit: 1,
    keywords: ['IGNORE ARMOUR', 'PISTOL'],
    description: '12", IGNORE ARMOUR, PISTOL. LIMIT: 1. Elite Only.',
  },
  {
    id: 'mechanicus_pistol',
    name: 'Mechanicus Pistol',
    type: 'ranged',
    range: 12,
    cost: 7,
    keywords: ['CRITICAL', 'PISTOL'],
    description: '12", CRITICAL, PISTOL.',
  },
  {
    id: 'phosphor_pistol_admech',
    name: 'Phosphor Pistol',
    type: 'ranged',
    range: 12,
    cost: 7,
    keywords: ['IGNORE COVER', 'PISTOL'],
    description: '12", IGNORE COVER, PISTOL.',
  },
  {
    id: 'phosphor_serpenta_admech',
    name: 'Phosphor Serpenta',
    type: 'ranged',
    range: 18,
    cost: 12,
    keywords: ['IGNORE COVER', 'PISTOL'],
    description: '18", IGNORE COVER, PISTOL. Elite/Sicarian Only.',
  },
  {
    id: 'twin_mechanicus_pistols',
    name: 'Twin Mechanicus Pistols',
    type: 'ranged',
    range: 12,
    cost: 15,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'CRITICAL', 'CUMBERSOME', 'TWO-HANDED', 'PISTOL'],
    description: '12", +1 DICE, CRITICAL, CUMBERSOME, TWO-HANDED, PISTOL. LIMIT: 2.',
  },
  // Heavy ranged
  {
    id: 'magnarail_lance_admech',
    name: 'Magnarail Lance',
    type: 'ranged',
    range: 36,
    cost: 30,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'HEAVY', 'TWO-HANDED'],
    description: '36", +1 INJURY DICE, HEAVY, TWO-HANDED. LIMIT: 2.',
  },
  {
    id: 'phosphor_cannon_admech',
    name: 'Phosphor Cannon',
    type: 'ranged',
    range: 36,
    cost: 40,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'IGNORE COVER', 'HEAVY', 'TWO-HANDED'],
    description: '36", AUTOMATIC 2, IGNORE COVER, HEAVY, TWO-HANDED. LIMIT: 2.',
  },
  {
    id: 'transonic_cannon_admech',
    name: 'Transonic Cannon',
    type: 'ranged',
    range: 12,
    cost: 25,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', 'HEAVY', 'TWO-HANDED'],
    description: '12", FLAMETHROWER, IGNORE ARMOUR, HEAVY, TWO-HANDED. LIMIT: 2.',
  },
  // Melee
  {
    id: 'arc_claw_admech',
    name: 'Arc Claw',
    type: 'melee',
    cost: 7,
    keywords: ['STUN'],
    description: 'Melee, STUN. Dominus/Tech-Priest/Servitor/Kataphron Only.',
  },
  {
    id: 'electroleech_stave_admech',
    name: 'Electroleech Stave',
    type: 'melee',
    cost: 15,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'STUN', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, STUN, TWO-HANDED. Electro-Priest Only.',
  },
  {
    id: 'electrostatic_gauntlets_admech',
    name: 'Electrostatic Gauntlets',
    type: 'melee',
    cost: 25,
    keywords: ['HELD', 'STUN', 'IGNORE OFF-HAND'],
    description: 'HELD, pair of gauntlets. Strike: Melee, STUN, IGNORE OFF-HAND. Bolt: 12" STUN (each gauntlet fires on Shoot). Electro-Priest Only.',
  },
  {
    id: 'hydraulic_claw_admech',
    name: 'Hydraulic Claw',
    type: 'melee',
    cost: 15,
    keywords: ['+1 INJURY DICE', 'HEAVY'],
    description: 'Melee, +1 INJURY DICE, HEAVY. Dominus/Tech-Priest/Servitor/Kataphron Only.',
  },
  {
    id: 'omnissian_axe_admech',
    name: 'Omnissian Axe',
    type: 'melee',
    cost: 15,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'ARMOUR PIERCING 2', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, ARMOUR PIERCING 2, TWO-HANDED. Dominus/Tech-Priest Only.',
  },
  {
    id: 'pteraxii_talons_admech',
    name: 'Pteraxii Talons',
    type: 'melee',
    cost: 5,
    handedness: 'two-handed',
    keywords: ['SHRAPNEL', 'TWO-HANDED'],
    description: 'Melee, SHRAPNEL, TWO-HANDED. Pteraxii Only.',
  },
  {
    id: 'servo_claw_admech',
    name: 'Servo Claw',
    type: 'melee',
    cost: 2,
    keywords: [],
    description: 'Melee. Dominus/Tech-Priest/Servitor/Kataphron Only.',
  },
  {
    id: 'transonic_blade_admech',
    name: 'Transonic Blade',
    type: 'melee',
    cost: 7,
    keywords: ['IGNORE ARMOUR on Critical Hit', 'CRITICAL'],
    description: 'Melee, IGNORE ARMOUR on Critical Hit, CRITICAL.',
  },
  {
    id: 'transonic_razor_admech',
    name: 'Transonic Razor',
    type: 'melee',
    cost: 15,
    handedness: 'two-handed',
    keywords: ['IGNORE ARMOUR on Critical Hit', '+1 INJURY DICE', 'CRITICAL', 'TWO-HANDED'],
    description: 'Melee, IGNORE ARMOUR on Critical Hit, +1 INJURY DICE, CRITICAL, TWO-HANDED.',
  },
  // ── Skitarii Hunter Cohort Variant Battlekit ─────────────────────────────
  {
    id: 'archeotech_pistol_skh',
    name: 'Archeotech Pistol',
    type: 'ranged',
    range: 12,
    cost: 12,
    keywords: ['ASSAULT', 'PISTOL'],
    description: '12", ASSAULT, PISTOL. (Skitarii Hunter Cohort Only)'
  },
  {
    id: 'galvanic_caster_skh',
    name: 'Galvanic Caster',
    type: 'ranged',
    range: 30,
    cost: 30,
    handedness: 'two-handed',
    keywords: ['ARMOUR PIERCING 1', 'TWO-HANDED', 'HELD'],
    description: 'Combined weapon. Galvanic Rifle: 30", +1 INJURY DICE, TWO-HANDED. Phosphor Pistol: 12", ASSAULT, PISTOL. HELD. 30 credits combined. (Skitarii Hunter Cohort Only)'
  },
  {
    id: 'mindscrambler_grenades_skh',
    name: 'Mindscrambler Grenades',
    type: 'ranged',
    range: 8,
    cost: 15,
    keywords: ['ASSAULT', 'BLAST 2"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'STUN', 'THROWN'],
    description: '8", ASSAULT, BLAST 2", IGNORE COVER, IGNORE LONG RANGE, STUN, THROWN. (Skitarii Hunter Cohort Only)'
  },
  {
    id: 'sulphur_breath_skh',
    name: 'Sulphur Breath',
    type: 'ranged',
    range: 8,
    cost: 45,
    handedness: 'no-hands',
    keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'GAS', 'ASSAULT'],
    description: '8", FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, GAS, ASSAULT, takes no hands. Serberys Only. (Skitarii Hunter Cohort Only)'
  },
  {
    id: 'voltlock_arquebus_skh',
    name: 'Voltlock Arquebus',
    type: 'ranged',
    range: 18,
    cost: 10,
    handedness: 'two-handed',
    keywords: ['IGNORE ARMOUR', 'TWO-HANDED'],
    description: '18", IGNORE ARMOUR, TWO-HANDED. (Skitarii Hunter Cohort Only)'
  },
];

// ============================================================================
// ADEPTUS CUSTODES FACTION WEAPONS
// ============================================================================

export const adeptusCustodesWeapons: Weapon[] = [
  // Ranged
  {
    id: 'adrastus_bolt_caliver',
    name: 'Adrastus Bolt Caliver',
    type: 'ranged',
    range: 30,
    cost: 30,
    limit: 3,
    handedness: 'two-handed',
    keywords: ['TWO-HANDED', 'VICIOUS 11', 'CRITICAL', 'IGNORE ARMOUR'],
    description: 'TWO-HANDED, Scope. Bolter: 30" VICIOUS 11, CRITICAL. Disintegrator: 12" IGNORE ARMOUR. LIMIT: 3.',
  },
  {
    id: 'balistus_grenade_launcher',
    name: 'Balistus Grenade Launcher',
    type: 'ranged',
    range: 18,
    cost: 15,
    keywords: ['BLAST 2"', 'ASSAULT', 'SHRAPNEL', 'THROWN'],
    description: '18", BLAST 2", ASSAULT, SHRAPNEL, THROWN. LIMIT: 1. Non-Anathema Elite Only.',
  },
  {
    id: 'kinetic_destroyer',
    name: 'Kinetic Destroyer',
    type: 'ranged',
    range: 12,
    cost: 20,
    keywords: ['ASSAULT', 'ARMOUR PIERCING 1', 'PISTOL'],
    description: '12", ASSAULT, ARMOUR PIERCING 1, PISTOL, Scope.',
  },
  {
    id: 'salvo_launcher',
    name: 'Salvo Launcher',
    type: 'ranged',
    range: 24,
    cost: 25,
    keywords: ['ARMOUR PIERCING 2', 'HEAVY'],
    description: '24", ARMOUR PIERCING 2, HEAVY. Dawneagle Only.',
  },
  {
    id: 'twin_las_pulsar',
    name: 'Twin Las-Pulsar',
    type: 'ranged',
    range: 24,
    cost: 40,
    keywords: ['+1 DICE', '+1 INJURY DICE', 'HEAVY'],
    description: '24", +1 DICE, +1 INJURY DICE, HEAVY. Contemptor Only.',
  },
  {
    id: 'twin_adrathic_destructor',
    name: 'Twin Adrathic Destructor',
    type: 'ranged',
    range: 18,
    cost: 35,
    keywords: ['+1 DICE', 'IGNORE ARMOUR'],
    description: '18", +1 DICE, IGNORE ARMOUR at Short Range. Aquilon Armour Only.',
  },
  {
    id: 'vertus_hurricane_bolter',
    name: 'Vertus Hurricane Bolter',
    type: 'ranged',
    range: 18,
    cost: 40,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'VICIOUS 11', 'CRITICAL', 'HEAVY', 'TWO-HANDED'],
    description: '18", AUTOMATIC 2, VICIOUS 11, CRITICAL, HEAVY, TWO-HANDED. LIMIT: 1.',
  },
  // Melee
  {
    id: 'executioner_greatblade',
    name: 'Executioner Greatblade',
    type: 'melee',
    cost: 20,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', '+1 INJURY DICE vs DAEMON/PSYKER', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE (+1 more vs DAEMON/PSYKER), TWO-HANDED.',
  },
  {
    id: 'interceptor_lance_custodes',
    name: 'Interceptor Lance',
    type: 'melee',
    cost: 15,
    handedness: 'two-handed',
    keywords: ['BLOCK', '+1 INJURY DICE on Charge', 'ARMOUR PIERCING 1'],
    description: 'Melee, BLOCK, +1 INJURY DICE if the wielder Charged during this Activation, ARMOUR PIERCING 1. Has Shield Combo.',
  },
  {
    id: 'misericordia',
    name: 'Misericordia',
    type: 'melee',
    cost: 15,
    limit: 2,
    keywords: ['IGNORE ARMOUR'],
    description: 'Melee, IGNORE ARMOUR of Down targets. LIMIT: 2.',
  },
  {
    id: 'tarsis_buckler',
    name: 'Tarsis Buckler',
    type: 'melee',
    cost: 10,
    limit: 1,
    keywords: ['HELD', 'BLOCK'],
    description: 'Melee, HELD. Melee attacks have -1 DICE to Hit wielder. LIMIT: 1. Venatari Only.',
  },
  {
    id: 'vaultswords',
    name: 'Vaultswords',
    type: 'melee',
    cost: 20,
    handedness: 'two-handed',
    keywords: ['CUMBERSOME', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee, CUMBERSOME, HEAVY, TWO-HANDED. Behemor: +2 INJURY DICE. Hurricanus: CLEAVE 2. Victus: IGNORE ARMOUR. LIMIT: 1. Blade Champion Only.',
  },
  {
    id: 'solerite_power_gauntlet',
    name: 'Solerite Power Gauntlet',
    type: 'melee',
    cost: 45,
    keywords: ['+1 INJURY MODIFIER', 'IGNORE ARMOUR', 'HEAVY'],
    description: 'Melee, +1 INJURY MODIFIER, IGNORE ARMOUR, HEAVY. Aquilon Only.',
  },
  {
    id: 'solerite_power_talon',
    name: 'Solerite Power Talon',
    type: 'melee',
    cost: 60,
    keywords: ['+2 INJURY DICE', 'IGNORE ARMOUR', 'CRITICAL', 'HEAVY', 'RISKY'],
    description: 'Melee, +2 INJURY DICE, IGNORE ARMOUR, CRITICAL, HEAVY, RISKY. Aquilon Only.',
  },
  // Combined weapons (ranged+melee)
  {
    id: 'achillus_dreadspear',
    name: 'Achillus Dreadspear',
    type: 'melee',
    cost: 50,
    keywords: ['BLOCK', 'HEAVY', 'HELD', 'CUMBERSOME', '+1 INJURY DICE', 'IGNORE ARMOUR'],
    description: 'BLOCK, HEAVY, HELD. Strike: Melee, CUMBERSOME, +1 INJURY DICE (+1 if Charged) IGNORE ARMOUR. Shoot: 12" +2 INJURY DICE at Short Range. Contemptor Only.',
  },
  {
    id: 'adrasite_spear',
    name: 'Adrasite Spear',
    type: 'melee',
    cost: 30,
    handedness: 'two-handed',
    keywords: ['BLOCK', 'HEAVY', 'TWO-HANDED', 'HELD', 'ARMOUR PIERCING 2', 'CUMBERSOME'],
    description: 'BLOCK, HEAVY, TWO-HANDED, HELD. Strike: Melee, ARMOUR PIERCING 2, CUMBERSOME. Shoot: 18" ASSAULT, IGNORE ARMOUR at Short Range.',
  },
  {
    id: 'castellan_axe',
    name: 'Castellan Axe',
    type: 'melee',
    cost: 35,
    handedness: 'two-handed',
    keywords: ['HEAVY', 'TWO-HANDED', 'HELD', '+1 INJURY DICE', 'ARMOUR PIERCING 2', 'CUMBERSOME'],
    description: 'HEAVY, TWO-HANDED, HELD. Strike: Melee, +1 INJURY DICE, ARMOUR PIERCING 2, CUMBERSOME. Shoot: 24" +1 INJURY DICE.',
  },
  {
    id: 'galatus_warblade',
    name: 'Galatus Warblade',
    type: 'melee',
    cost: 60,
    handedness: 'two-handed',
    keywords: ['HEAVY', 'TWO-HANDED', 'HELD', 'CRITICAL', '+1 INJURY DICE', 'IGNORE ARMOUR'],
    description: 'HEAVY, TWO-HANDED, HELD. Strike: Melee, CRITICAL, +1 INJURY DICE, IGNORE ARMOUR. Shoot: 10" AUTOMATIC 2, FLAMETHROWER, IGNORE ARMOUR, FIRE, HEAVY. Contemptor Only.',
  },
  {
    id: 'guardian_spear',
    name: 'Guardian Spear',
    type: 'melee',
    cost: 30,
    handedness: 'two-handed',
    keywords: ['BLOCK', 'HEAVY', 'TWO-HANDED', 'HELD', 'ARMOUR PIERCING 2', 'CUMBERSOME'],
    description: 'BLOCK, HEAVY, TWO-HANDED, HELD. Strike: Melee, ARMOUR PIERCING 2, CUMBERSOME. Shoot: 24" +1 INJURY DICE.',
  },
  {
    id: 'pyrithite_spear',
    name: 'Pyrithite Spear',
    type: 'melee',
    cost: 45,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['BLOCK', 'HEAVY', 'TWO-HANDED', 'HELD', 'ARMOUR PIERCING 2', 'CUMBERSOME', 'RISKY'],
    description: 'BLOCK, HEAVY, TWO-HANDED, HELD. Strike: Melee, ARMOUR PIERCING 2, CUMBERSOME. Shoot: 12" +1 INJURY DICE, IGNORE ARMOUR, RISKY. LIMIT: 1.',
  },
  {
    id: 'sentinel_blade',
    name: 'Sentinel Blade',
    type: 'melee',
    cost: 25,
    handedness: 'two-handed',
    keywords: ['HEAVY', 'TWO-HANDED', 'HELD', 'ARMOUR PIERCING 2', 'MAIN HAND ONLY'],
    description: 'HEAVY, TWO-HANDED, HELD. Strike: Melee, ARMOUR PIERCING 2, MAIN HAND ONLY. Shoot: 12" +1 INJURY DICE, ASSAULT.',
  },
];

// ============================================================================
// DRUKHARI FACTION WEAPONS
// ============================================================================
export const drukahriWeapons: Weapon[] = [
  // Ranged
  { id: 'blaster_drukhari', name: 'Blaster', type: 'ranged', cost: 25, limit: 2, handedness: 'two-handed', keywords: ['IGNORE ARMOUR', 'ASSAULT', 'TWO-HANDED'], description: '18", IGNORE ARMOUR, ASSAULT, TWO-HANDED. LIMIT: 2.' },
  { id: 'hexrifle_drukhari', name: 'Hexrifle', type: 'ranged', cost: 25, limit: 2, handedness: 'two-handed', keywords: ['INFECTION MARKERS', 'TWO-HANDED'], description: '36", INFECTION MARKERS, TWO-HANDED. LIMIT: 2. Haemonculus or Wrack Only.' },
  { id: 'liquifier_gun_drukhari', name: 'Liquifier Gun', type: 'ranged', cost: 25, limit: 1, handedness: 'two-handed', keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'GAS', 'TWO-HANDED'], description: '8", FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, GAS, TWO-HANDED. LIMIT: 1.' },
  { id: 'ossefactor_drukhari', name: 'Ossefactor', type: 'ranged', cost: 20, handedness: 'two-handed', keywords: ['CRITICAL', 'ARMOUR PIERCING 2', 'TWO-HANDED'], description: '24", CRITICAL, ARMOUR PIERCING 2, TWO-HANDED. On Critical Hit, gains BLAST 2". Haemonculus or Wrack Only.' },
  { id: 'shredder_drukhari', name: 'Shredder', type: 'ranged', cost: 25, limit: 2, handedness: 'two-handed', keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'SHRAPNEL', 'TWO-HANDED'], description: '8", FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, SHRAPNEL, TWO-HANDED. LIMIT: 2.' },
  { id: 'spirit_syphon_drukhari', name: 'Spirit Syphon', type: 'ranged', cost: 40, handedness: 'two-handed', keywords: ['AUTOMATIC 2', '-1 INJURY DICE', 'FLAMETHROWER', 'IGNORE ARMOUR', 'HEAVY', 'TWO-HANDED'], description: '10", AUTOMATIC 2, -1 INJURY DICE, FLAMETHROWER, IGNORE ARMOUR, HEAVY, TWO-HANDED. Cronos Only.' },
  { id: 'spirit_vortex_drukhari', name: 'Spirit Vortex', type: 'ranged', cost: 15, handedness: 'two-handed', keywords: ['IGNORE COVER', 'BLAST 3"', 'HEAVY', 'TWO-HANDED'], description: '18", IGNORE COVER, BLAST 3", HEAVY, TWO-HANDED. Cronos Only.' },
  { id: 'splinter_rifle_drukhari', name: 'Splinter Rifle', type: 'ranged', cost: 15, handedness: 'two-handed', keywords: ['SHRAPNEL', 'TWO-HANDED'], description: '24", SHRAPNEL, TWO-HANDED.' },
  { id: 'splinter_pods_drukhari', name: 'Splinter Pods', type: 'ranged', cost: 20, handedness: 'two-handed', keywords: ['ASSAULT', 'SHRAPNEL', 'TWO-HANDED'], description: '18", ASSAULT, SHRAPNEL, TWO-HANDED. Take up no hands. Hellion Skyboard Only.' },
  { id: 'terrorfex_drukhari', name: 'Terrorfex', type: 'ranged', cost: 40, limit: 1, keywords: ['IGNORE COVER'], description: '24", IGNORE COVER. Takes no hands. Xenospasm: BLAST 3", SHRAPNEL. Wraithbone: target moves D3" away on a hit. LIMIT: 1.' },
  { id: 'twin_haywire_blaster_drukhari', name: 'Twin Haywire Blaster', type: 'ranged', cost: 35, limit: 1, handedness: 'two-handed', keywords: ['+1 DICE', 'IGNORE ARMOUR', '-1 INJURY DICE', 'BLAST 3"', 'HEAVY', 'STUN', 'TWO-HANDED'], description: '24", +1 DICE, IGNORE ARMOUR, -1 INJURY DICE non-ARTIFICIAL/VEHICLE, BLAST 3", HEAVY, STUN, TWO-HANDED. LIMIT: 1. Talos Only.' },
  { id: 'twin_heat_lance_drukhari', name: 'Twin Heat Lance', type: 'ranged', cost: 150, limit: 1, handedness: 'two-handed', keywords: ['+1 DICE', '+1 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED'], description: '18", +1 DICE, +1 INJURY DICE, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED. 5 Glory. LIMIT: 1. Talos Only.' },
  { id: 'twin_liquifier_gun_drukhari', name: 'Twin Liquifier Gun', type: 'ranged', cost: 45, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'GAS', 'HEAVY', 'TWO-HANDED'], description: '10", AUTOMATIC 2, FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, GAS, HEAVY, TWO-HANDED. LIMIT: 1. Talos Only.' },
  { id: 'twin_splinter_cannon_drukhari', name: 'Twin Splinter Cannon', type: 'ranged', cost: 55, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', '+1 DICE', 'HEAVY', 'SHRAPNEL'], description: '36", AUTOMATIC 2, +1 DICE, HEAVY, SHRAPNEL. LIMIT: 1. Talos Only.' },
  // Pistols
  { id: 'blast_pistol_drukhari', name: 'Blast Pistol', type: 'ranged', cost: 20, limit: 2, keywords: ['IGNORE ARMOUR', 'ASSAULT', 'PISTOL'], description: '6", IGNORE ARMOUR, ASSAULT, PISTOL. LIMIT: 2.' },
  { id: 'splinter_pistol_drukhari', name: 'Splinter Pistol', type: 'ranged', cost: 12, keywords: ['SHRAPNEL', 'PISTOL'], description: '12", SHRAPNEL, PISTOL.' },
  { id: 'stinger_pistol_drukhari', name: 'Stinger Pistol', type: 'ranged', cost: 12, keywords: ['GAS', 'PISTOL'], description: '12", GAS, PISTOL.' },
  // Heavy Ranged
  { id: 'dark_lance_drukhari', name: 'Dark Lance', type: 'ranged', cost: 90, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'TWO-HANDED'], description: '36", +1 INJURY DICE, IGNORE ARMOUR, HEAVY, TWO-HANDED. 3 Glory. LIMIT: 1.' },
  { id: 'heat_lance_drukhari', name: 'Heat Lance', type: 'ranged', cost: 90, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'FIRE', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED'], description: '18", +1 INJURY DICE, FIRE, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED. 3 Glory. LIMIT: 1.' },
  { id: 'splinter_cannon_drukhari', name: 'Splinter Cannon', type: 'ranged', cost: 45, limit: 2, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'HEAVY', 'SHRAPNEL', 'TWO-HANDED'], description: '36", AUTOMATIC 2, HEAVY, SHRAPNEL, TWO-HANDED. LIMIT: 2.' },
  // Melee
  { id: 'agoniser_drukhari', name: 'Agoniser', type: 'melee', cost: 15, isMainHandOnly: true, keywords: ['CRITICAL', 'ARMOUR PIERCING 1', 'MAIN HAND ONLY'], description: 'Melee, CRITICAL, ARMOUR PIERCING 1, MAIN HAND ONLY. Elite, Wych, or Reaver Only.', restrictedTo: ['ELITE'] },
  { id: 'chain_flail_drukhari', name: 'Chain Flail', type: 'melee', cost: 10, handedness: 'two-handed', keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'], description: 'Melee, +1 INJURY MODIFIER, HEAVY, TWO-HANDED.' },
  { id: 'demiklaives_drukhari', name: 'Demiklaives', type: 'melee', cost: 20, handedness: 'two-handed', keywords: ['CRITICAL', 'TWO-HANDED'], description: 'Melee, CRITICAL, TWO-HANDED. Single Blade: +1 INJURY DICE. Dual Blades: CLEAVE 2. Elite or Incubus Only.', restrictedTo: ['ELITE'] },
  { id: 'hekatarii_blade_drukhari', name: 'Hekatarii Blade', type: 'melee', cost: 3, keywords: [], description: 'Melee.' },
  { id: 'hellglaive_drukhari', name: 'Hellglaive', type: 'melee', cost: 25, limit: 2, handedness: 'two-handed', keywords: ['HELD', 'BLOCK', 'TWO-HANDED'], description: 'HELD, BLOCK, TWO-HANDED, Shield Combo. Strike: Melee. Shoot: 24", SHRAPNEL. LIMIT: 2.' },
  { id: 'huskblade_drukhari', name: 'Huskblade', type: 'melee', cost: 90, limit: 1, handedness: 'two-handed', keywords: ['+2 INJURY DICE', 'CRITICAL', 'TWO-HANDED'], description: 'Melee, +2 INJURY DICE, CRITICAL, TWO-HANDED. 3 Glory. LIMIT: 1. Archon Only.' },
  { id: 'klaive_drukhari', name: 'Klaive', type: 'melee', cost: 15, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'CRITICAL', 'CUMBERSOME', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, CRITICAL, CUMBERSOME, TWO-HANDED. Elite or Incubus Only.', restrictedTo: ['ELITE'] },
  { id: 'macro_scalpel_drukhari', name: 'Macro-Scalpel', type: 'melee', cost: 30, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, TWO-HANDED. Causes 1 additional BLOOD MARKER if it causes any. Haemonculus Only.' },
  { id: 'scissorhand_drukhari', name: 'Scissorhand', type: 'melee', cost: 20, isMainHandOnly: true, keywords: ['MAIN HAND ONLY'], description: 'Melee, MAIN HAND ONLY. Causes 1 additional BLOOD MARKER if it causes any. Haemonculus or Wrack Only.' },
  { id: 'spirit_leech_tentacles_drukhari', name: 'Spirit-Leech Tentacles', type: 'melee', cost: 12, handedness: 'two-handed', keywords: ['CLEAVE 2', 'TWO-HANDED', 'HEAVY'], description: 'Melee, CLEAVE 2, TWO-HANDED, HEAVY. Enemies cannot Retreat from the wielder. Cronos Only.' },
  { id: 'spirit_probe_drukhari', name: 'Spirit Probe', type: 'melee', cost: 15, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, HEAVY, TWO-HANDED. Gain 1 additional Pain token on a hit. Cronos Only.' },
  { id: 'talos_ichor_injector_drukhari', name: 'Talos Ichor Injector', type: 'melee', cost: 15, keywords: ['GAS', 'ARMOUR PIERCING 1'], description: 'Melee, GAS, ARMOUR PIERCING 1. Talos Only.' },
  // Thrown
  { id: 'haywire_grenades_drukhari', name: 'Haywire Grenades', type: 'ranged', cost: 12, keywords: ['IGNORE ARMOUR', '-1 INJURY DICE', 'ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'STUN', 'THROWN'], description: '8", IGNORE ARMOUR, -1 INJURY DICE non-ARTIFICIAL/VEHICLE, ASSAULT, BLAST 3", IGNORE COVER, IGNORE LONG RANGE, STUN, THROWN.' },
  { id: 'plasma_grenade_drukhari', name: 'Plasma Grenade', type: 'ranged', cost: 15, keywords: ['ASSAULT', 'BLAST 2"', 'FIRE', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'], description: '8", ASSAULT, BLAST 2", FIRE, IGNORE COVER, IGNORE LONG RANGE, THROWN.' },
  { id: 'xenospasm_grenades_drukhari', name: 'Xenospasm Grenades', type: 'ranged', cost: 10, keywords: ['ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'SHRAPNEL', 'THROWN'], description: '8", ASSAULT, BLAST 3", IGNORE COVER, IGNORE LONG RANGE, SHRAPNEL, THROWN.' },
  { id: 'wraithbone_grenades_drukhari', name: 'Wraithbone Grenades', type: 'ranged', cost: 10, limit: 3, keywords: ['ASSAULT', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'], description: '8", ASSAULT, IGNORE COVER, IGNORE LONG RANGE, THROWN. Target moves D3" away on a hit unless unaffected by FEAR. LIMIT: 3.' },
];

// ============================================================================
// AELDARI FACTION WEAPONS
// ============================================================================
export const aeldariWeapons: Weapon[] = [
  // Ranged
  { id: 'avenger_shuriken_catapult', name: 'Avenger Shuriken Catapult', type: 'ranged', cost: 35, limit: 2, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'ASSAULT', 'ARMOUR PIERCING 1 on Critical Hit', 'TWO-HANDED'], description: '18", AUTOMATIC 2, ASSAULT, ARMOUR PIERCING 1 on Critical Hit, TWO-HANDED. LIMIT: 2. Elite or Dire Avenger Only.', restrictedTo: ['ELITE'] },
  { id: 'cloudsweeper_aeldari', name: 'Cloudsweeper', type: 'ranged', cost: 35, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'ASSAULT', 'CRITICAL', 'TWO-HANDED'], description: '24", AUTOMATIC 2, ASSAULT, CRITICAL, TWO-HANDED. LIMIT: 1. Swooping Hawk Only.' },
  { id: 'death_spinner_aeldari', name: 'Death Spinner', type: 'ranged', cost: 20, limit: 2, handedness: 'two-handed', keywords: ['BLAST 2"', 'ARMOUR PIERCING 1', 'TWO-HANDED'], description: '12", BLAST 2", ARMOUR PIERCING 1, TWO-HANDED. LIMIT: 2. Elite or Warp Spider Only.', restrictedTo: ['ELITE'] },
  { id: 'dragon_fusion_gun', name: 'Dragon Fusion Gun', type: 'ranged', cost: 35, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'TWO-HANDED'], description: '12", +1 INJURY DICE, IGNORE ARMOUR, TWO-HANDED. LIMIT: 1. Elite or Fire Dragon Only.', restrictedTo: ['ELITE'] },
  { id: 'dragons_breath_flamer', name: "Dragon's Breath Flamer", type: 'ranged', cost: 55, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', '-1 INJURY DICE', 'FLAMETHROWER', 'IGNORE ARMOUR', 'FIRE', 'TWO-HANDED'], description: '10", AUTOMATIC 2, -1 INJURY DICE, FLAMETHROWER, IGNORE ARMOUR, FIRE, TWO-HANDED. LIMIT: 1. Fire Dragon Only.' },
  { id: 'firepike_aeldari', name: 'Firepike', type: 'ranged', cost: 40, limit: 1, handedness: 'two-handed', keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE', 'TWO-HANDED'], description: '16", FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, FIRE, TWO-HANDED. LIMIT: 1. Elite or Fire Dragon Only.', restrictedTo: ['ELITE'] },
  { id: 'hawks_talon', name: "Hawk's Talon", type: 'ranged', cost: 40, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'CRITICAL', 'ARMOUR PIERCING 1', 'TWO-HANDED'], description: '24", +1 INJURY DICE, CRITICAL, ARMOUR PIERCING 1, TWO-HANDED. LIMIT: 1. Swooping Hawk Only.' },
  { id: 'lasblaster_aeldari', name: 'Lasblaster', type: 'ranged', cost: 30, limit: 2, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'CRITICAL', 'TWO-HANDED'], description: '24", +1 INJURY DICE, CRITICAL, TWO-HANDED. LIMIT: 2. Elite or Swooping Hawk Only.', restrictedTo: ['ELITE'] },
  { id: 'long_rifle_aeldari', name: 'Long Rifle', type: 'ranged', cost: 40, limit: 2, handedness: 'two-handed', keywords: ['+1 DICE', 'CRITICAL', 'TWO-HANDED'], description: '48", +1 DICE, CRITICAL, TWO-HANDED. LIMIT: 2.' },
  { id: 'shuriken_catapult', name: 'Shuriken Catapult', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['ARMOUR PIERCING 1 on Critical Hit', 'TWO-HANDED'], description: '18", ARMOUR PIERCING 1 on Critical Hit, TWO-HANDED.' },
  { id: 'shuriken_rifle', name: 'Shuriken Rifle', type: 'ranged', cost: 12, handedness: 'two-handed', keywords: ['ARMOUR PIERCING 1 on Critical Hit', 'TWO-HANDED'], description: '24", ARMOUR PIERCING 1 on Critical Hit, TWO-HANDED.' },
  { id: 'spinneret_rifle', name: 'Spinneret Rifle', type: 'ranged', cost: 20, limit: 1, handedness: 'two-handed', keywords: ['IGNORE ARMOUR', 'TWO-HANDED'], description: '18", IGNORE ARMOUR, TWO-HANDED. LIMIT: 1. Warp Spider Only.' },
  // Pistols
  { id: 'death_weavers', name: 'Death Weavers', type: 'ranged', cost: 20, keywords: ['BLAST 2"', 'ARMOUR PIERCING 1', 'PISTOL'], description: '6", BLAST 2", ARMOUR PIERCING 1, PISTOL. Comes as a pair; attack with each on Shoot. Elite or Warp Spider Only.', restrictedTo: ['ELITE'] },
  { id: 'dragon_fusion_pistol', name: 'Dragon Fusion Pistol', type: 'ranged', cost: 30, keywords: ['IGNORE ARMOUR', 'RISKY', 'PISTOL'], description: '6", IGNORE ARMOUR, RISKY, PISTOL. 1 Glory. Elite or Fire Dragon Only.', restrictedTo: ['ELITE'] },
  { id: 'shuriken_pistol', name: 'Shuriken Pistol', type: 'ranged', cost: 7, keywords: ['ARMOUR PIERCING 1 on Critical Hit', 'PISTOL'], description: '12", ARMOUR PIERCING 1 on Critical Hit, PISTOL.' },
  { id: 'sunpistol_aeldari', name: 'Sunpistol', type: 'ranged', cost: 12, keywords: ['ASSAULT', 'CRITICAL', 'PISTOL'], description: '12", ASSAULT, CRITICAL, PISTOL. Elite or Swooping Hawk Only.', restrictedTo: ['ELITE'] },
  { id: 'twin_shuriken_pistols', name: 'Twin Shuriken Pistols', type: 'ranged', cost: 12, limit: 2, handedness: 'two-handed', keywords: ['+1 DICE', 'ARMOUR PIERCING 1 on Critical Hit', 'CUMBERSOME', 'TWO-HANDED', 'PISTOL'], description: '12", +1 DICE, ARMOUR PIERCING 1 on Critical Hit, CUMBERSOME, TWO-HANDED, PISTOL. LIMIT: 2.' },
  // Heavy Ranged
  { id: 'bright_lance_aeldari', name: 'Bright Lance', type: 'ranged', cost: 35, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'TWO-HANDED'], description: '36", +1 INJURY DICE, HEAVY, TWO-HANDED. LIMIT: 1.' },
  { id: 'distortion_scythe', name: 'Distortion Scythe', type: 'ranged', cost: 120, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', '+1 INJURY DICE', 'FLAMETHROWER', 'IGNORE ARMOUR', 'HEAVY', 'PSYCHIC', 'TWO-HANDED'], description: '10", AUTOMATIC 2, +1 INJURY DICE, FLAMETHROWER, IGNORE ARMOUR, HEAVY, PSYCHIC, TWO-HANDED. 4 Glory. LIMIT: 1. Wraith Only.' },
  { id: 'reaper_launcher', name: 'Reaper Launcher', type: 'ranged', cost: 45, limit: 2, handedness: 'two-handed', keywords: ['IGNORE COVER', 'HEAVY', 'TWO-HANDED'], description: '48", IGNORE COVER, HEAVY, TWO-HANDED. LIMIT: 2. Starshot: +1 INJURY DICE. Starswarm: BLAST 2", SHRAPNEL. Dark Reaper or Wraith Only.' },
  { id: 'scatter_laser', name: 'Scatter Laser', type: 'ranged', cost: 30, limit: 2, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'HEAVY', 'TWO-HANDED'], description: '36", AUTOMATIC 2, HEAVY, TWO-HANDED. LIMIT: 2.' },
  { id: 'shuriken_cannon', name: 'Shuriken Cannon', type: 'ranged', cost: 35, limit: 3, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'ARMOUR PIERCING 1', 'TWO-HANDED'], description: '24", +1 INJURY DICE, HEAVY, ARMOUR PIERCING 1, TWO-HANDED. LIMIT: 3.' },
  { id: 'starcannon', name: 'Starcannon', type: 'ranged', cost: 120, limit: 1, handedness: 'two-handed', keywords: ['+2 INJURY DICE', 'ARMOUR PIERCING 2', 'HEAVY', 'TWO-HANDED'], description: '36", +2 INJURY DICE, ARMOUR PIERCING 2, HEAVY, TWO-HANDED. 4 Glory. LIMIT: 1.' },
  { id: 'tempest_launcher', name: 'Tempest Launcher', type: 'ranged', cost: 45, limit: 1, handedness: 'two-handed', keywords: ['IGNORE COVER', 'BLAST 4"', 'HEAVY', 'SHRAPNEL', 'TWO-HANDED'], description: '36", IGNORE COVER, BLAST 4", HEAVY, SHRAPNEL, TWO-HANDED. LIMIT: 1. Dark Reaper or Wraith Only.' },
  { id: 'twin_shuriken_catapult', name: 'Twin Shuriken Catapult', type: 'ranged', cost: 15, handedness: 'two-handed', keywords: ['+1 DICE', 'HEAVY', 'ARMOUR PIERCING 1 on Critical Hit', 'TWO-HANDED'], description: '18", +1 DICE, HEAVY, ARMOUR PIERCING 1 on Critical Hit, TWO-HANDED.' },
  { id: 'wraithcannon', name: 'Wraithcannon', type: 'ranged', cost: 30, handedness: 'two-handed', keywords: ['+2 INJURY DICE', 'HEAVY', 'TWO-HANDED'], description: '18", +2 INJURY DICE, HEAVY, TWO-HANDED. Wraith Only.' },
  // Melee
  { id: 'banshee_blade', name: 'Banshee Blade', type: 'melee', cost: 23, keywords: ['+1 INJURY DICE', 'CRITICAL'], description: 'Melee, +1 INJURY DICE, CRITICAL. Elite or Howling Banshee Only.', restrictedTo: ['ELITE'] },
  { id: 'biting_blade', name: 'Biting Blade', type: 'melee', cost: 25, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'CRITICAL', 'RISKY', 'SHRAPNEL', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, CRITICAL, RISKY, SHRAPNEL, TWO-HANDED. LIMIT: 1. Striking Scorpion Only.' },
  { id: 'diresword', name: 'Diresword', type: 'melee', cost: 20, limit: 1, isMainHandOnly: true, keywords: ['IGNORE ARMOUR', 'MAIN HAND ONLY'], description: 'Melee, IGNORE ARMOUR, MAIN HAND ONLY. LIMIT: 1. Dire Avenger Only.' },
  { id: 'ghost_blade_aeldari', name: 'Ghost Blade', type: 'melee', cost: 15, keywords: ['+1 INJURY DICE', 'HEAVY'], description: 'Melee, +1 INJURY DICE, HEAVY. Wraith Only.' },
  { id: 'mirrorswords', name: 'Mirrorswords', type: 'melee', cost: 12, limit: 1, handedness: 'two-handed', keywords: ['CRITICAL', 'ARMOUR PIERCING 2', 'IGNORE OFF-HAND', 'TWO-HANDED'], description: 'Melee, CRITICAL, ARMOUR PIERCING 2, IGNORE OFF-HAND. Comes as a pair. LIMIT: 1. Howling Banshee Only.' },
  { id: 'mist_staff', name: 'Mist Staff', type: 'melee', cost: 20, isMainHandOnly: true, keywords: ['+1 INJURY DICE', 'PSYCHIC', 'HELD', 'MAIN HAND ONLY'], description: 'Melee, +1 INJURY DICE, PSYCHIC, HELD, MAIN HAND ONLY. Psyker Only.', restrictedTo: ['PSYKER'] },
  { id: 'power_blade_aeldari', name: 'Power Blade', type: 'melee', cost: 15, limit: 3, isMainHandOnly: true, keywords: ['CRITICAL', 'ARMOUR PIERCING 2', 'MAIN HAND ONLY'], description: 'Melee, CRITICAL, ARMOUR PIERCING 2, MAIN HAND ONLY. LIMIT: 3. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'power_glaive_aeldari', name: 'Power Glaive', type: 'melee', cost: 20, limit: 2, handedness: 'two-handed', keywords: ['BLOCK', 'ARMOUR PIERCING 2', 'TWO-HANDED'], description: 'Melee, BLOCK, ARMOUR PIERCING 2, TWO-HANDED, Shield Combo. LIMIT: 2. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'scorpion_chainsword', name: 'Scorpion Chainsword', type: 'melee', cost: 10, limit: 2, isMainHandOnly: true, keywords: ['CRITICAL', 'RISKY', 'SHRAPNEL', 'MAIN HAND ONLY'], description: 'Melee, CRITICAL, RISKY, SHRAPNEL, MAIN HAND ONLY. LIMIT: 2. Elite or Striking Scorpion Only.', restrictedTo: ['ELITE'] },
  { id: 'witchblade', name: 'Witchblade', type: 'melee', cost: 15, limit: 3, isMainHandOnly: true, keywords: ['+1 INJURY DICE', 'PSYCHIC', 'HELD', 'MAIN HAND ONLY'], description: 'Melee, +1 INJURY DICE, +1 INJURY DICE vs DAEMON/PSYKER, PSYCHIC, HELD, MAIN HAND ONLY. LIMIT: 3. Psyker Only.', restrictedTo: ['PSYKER'] },
  { id: 'witch_staff', name: 'Witch Staff', type: 'melee', cost: 3, isMainHandOnly: true, keywords: ['PSYCHIC', 'HELD', 'MAIN HAND ONLY'], description: 'Melee, +1 INJURY DICE vs DAEMON/PSYKER, PSYCHIC, HELD, MAIN HAND ONLY. Psyker Only.', restrictedTo: ['PSYKER'] },
  // Combined
  { id: 'laser_lance', name: 'Laser Lance', type: 'melee', cost: 12, limit: 2, handedness: 'two-handed', keywords: ['TWO-HANDED', 'HELD'], description: 'TWO-HANDED, HELD, Shield Combo. Strike: Melee, +1 INJURY DICE if Charged. Shoot: 6", IGNORE LONG RANGE, ASSAULT. LIMIT: 2.' },
  { id: 'paired_chainsabres', name: 'Paired Chainsabres', type: 'melee', cost: 40, limit: 1, keywords: ['HELD'], description: 'Comes as pair, HELD. Strike: Melee, IGNORE OFF-HAND, CRITICAL, RISKY, SHRAPNEL. Shoot: 12", ARMOUR PIERCING 1 on Critical Hit. LIMIT: 1. Elite or Striking Scorpion Only.', restrictedTo: ['ELITE'] },
  { id: 'scorpions_claw', name: "Scorpion's Claw", type: 'melee', cost: 25, limit: 1, keywords: ['HELD'], description: 'HELD. Strike: Melee, ARMOUR PIERCING 2. Shoot: 12", ASSAULT, ARMOUR PIERCING 1 on Critical Hit. LIMIT: 1. Striking Scorpion Only.' },
  { id: 'singing_spear', name: 'Singing Spear', type: 'melee', cost: 25, handedness: 'two-handed', keywords: ['PSYCHIC', 'TWO-HANDED', 'HELD'], description: 'PSYCHIC, TWO-HANDED, HELD, Shield Combo. Strike: Melee. Throw: 12", +1 INJURY DICE, ASSAULT. Psyker Only.', restrictedTo: ['PSYKER'] },
  { id: 'star_lance', name: 'Star Lance', type: 'melee', cost: 20, limit: 2, handedness: 'two-handed', keywords: ['TWO-HANDED', 'HELD'], description: 'TWO-HANDED, HELD, Shield Combo. Strike: Melee, ARMOUR PIERCING 1, +1 INJURY DICE if Charged. Shoot: 6", IGNORE LONG RANGE, +1 INJURY DICE, ASSAULT. LIMIT: 2. Shining Spear Only.' },
  // Thrown
  { id: 'haywire_grenades_aeldari', name: 'Haywire Grenades', type: 'ranged', cost: 12, limit: 2, keywords: ['IGNORE ARMOUR', '-1 INJURY DICE', 'ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'STUN', 'THROWN'], description: '8", IGNORE ARMOUR, -1 INJURY DICE non-ARTIFICIAL/VEHICLE, ASSAULT, BLAST 3", IGNORE COVER, IGNORE LONG RANGE, STUN, THROWN. LIMIT: 2.' },
  { id: 'melta_bombs_aeldari', name: 'Melta Bombs', type: 'ranged', cost: 15, limit: 1, keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'ASSAULT', 'IGNORE COVER', 'IGNORE LONG RANGE', 'RISKY', 'THROWN'], description: '6", +1 INJURY DICE, IGNORE ARMOUR, ASSAULT, IGNORE COVER, IGNORE LONG RANGE, RISKY, THROWN. LIMIT: 1. Fire Dragon Only.' },
  { id: 'plasma_grenades_aeldari', name: 'Plasma Grenades', type: 'ranged', cost: 15, keywords: ['ASSAULT', 'BLAST 2"', 'FIRE', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'], description: '8", ASSAULT, BLAST 2", FIRE, IGNORE COVER, IGNORE LONG RANGE, THROWN.' },
  { id: 'triskeles', name: 'Triskeles', type: 'ranged', cost: 8, keywords: ['IGNORE LONG RANGE', 'ASSAULT', 'CRITICAL', 'THROWN'], description: '12", IGNORE LONG RANGE, ASSAULT, CRITICAL, THROWN.' },
];

// ============================================================================
// HARLEQUINS FACTION WEAPONS
// ============================================================================
export const harlequinsWeapons: Weapon[] = [
  // Ranged
  { id: 'hallucinogen_grenade_launcher', name: 'Hallucinogen Grenade Launcher', type: 'ranged', cost: 25, limit: 2, handedness: 'two-handed', keywords: ['BLAST 3"', 'TWO-HANDED'], description: '18", BLAST 3", TWO-HANDED. Hit targets must move D3" in direction of opponent\'s choice. LIMIT: 2.' },
  // Pistols
  { id: 'fusion_pistol_harlequins', name: 'Fusion Pistol', type: 'ranged', cost: 25, limit: 2, keywords: ['IGNORE ARMOUR', 'RISKY', 'PISTOL'], description: '6", IGNORE ARMOUR, RISKY, PISTOL. LIMIT: 2.' },
  { id: 'harlequins_caress', name: "Harlequin's Caress", type: 'ranged', cost: 25, limit: 3, keywords: ['FLAMETHROWER', 'ASSAULT', 'PISTOL'], description: "6\", FLAMETHROWER, ASSAULT, PISTOL. Loses FLAMETHROWER in melee. LIMIT: 3." },
  { id: 'neuro_disruptor_harlequins', name: 'Neuro Disruptor', type: 'ranged', cost: 30, limit: 1, keywords: ['-1 INJURY DICE', 'IGNORE ARMOUR', 'ASSAULT', 'STUN', 'PISTOL'], description: '12", -1 INJURY DICE, IGNORE ARMOUR, ASSAULT, STUN, PISTOL. LIMIT: 1. Elite Psyker Only.' },
  // Heavy Ranged
  { id: 'bright_lance_harlequins', name: 'Bright Lance', type: 'ranged', cost: 35, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'TWO-HANDED'], description: '36", +1 INJURY DICE, HEAVY, TWO-HANDED. LIMIT: 1.' },
  { id: 'haywire_cannon_harlequins', name: 'Haywire Cannon', type: 'ranged', cost: 20, limit: 1, handedness: 'two-handed', keywords: ['IGNORE ARMOUR', '-1 INJURY DICE', 'HEAVY', 'STUN', 'TWO-HANDED'], description: '24", IGNORE ARMOUR, -1 INJURY DICE non-ARTIFICIAL/VEHICLE, HEAVY, STUN, TWO-HANDED. LIMIT: 1.' },
  { id: 'prismatic_cannon', name: 'Prismatic Cannon', type: 'ranged', cost: 90, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'TWO-HANDED'], description: '36", +1 INJURY DICE, IGNORE ARMOUR, HEAVY, TWO-HANDED. 3 Glory. LIMIT: 1.' },
  { id: 'shrieker_cannon', name: 'Shrieker Cannon', type: 'ranged', cost: 45, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'GAS', 'HEAVY', 'ARMOUR PIERCING 1', 'TWO-HANDED'], description: '24", +1 INJURY DICE, GAS, HEAVY, ARMOUR PIERCING 1, TWO-HANDED. LIMIT: 1. Death Jester Only.' },
  { id: 'shuriken_cannon_harlequins', name: 'Shuriken Cannon', type: 'ranged', cost: 35, limit: 2, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'ARMOUR PIERCING 1', 'TWO-HANDED'], description: '24", +1 INJURY DICE, HEAVY, ARMOUR PIERCING 1, TWO-HANDED. LIMIT: 2.' },
  // Melee
  { id: 'harlequins_embrace', name: "Harlequin's Embrace", type: 'melee', cost: 20, isMainHandOnly: true, keywords: ['IGNORE ARMOUR', 'MAIN HAND ONLY'], description: 'Melee, IGNORE ARMOUR, MAIN HAND ONLY.' },
  { id: 'harlequins_kiss', name: "Harlequin's Kiss", type: 'melee', cost: 20, isMainHandOnly: true, keywords: ['+1 INJURY DICE', 'MAIN HAND ONLY'], description: 'Melee, +1 INJURY DICE, MAIN HAND ONLY.' },
  { id: 'jesters_blade', name: "Jester's Blade", type: 'melee', cost: 10, handedness: 'two-handed', keywords: ['BLOCK', 'CRITICAL', 'TWO-HANDED'], description: 'Melee, BLOCK, CRITICAL, TWO-HANDED.' },
  { id: 'power_blade_harlequins', name: 'Power Blade', type: 'melee', cost: 15, isMainHandOnly: true, keywords: ['ARMOUR PIERCING 2', 'MAIN HAND ONLY'], description: 'Melee, ARMOUR PIERCING 2, MAIN HAND ONLY. Elite Only.' },
  { id: 'power_glaive_harlequins', name: 'Power Glaive', type: 'melee', cost: 15, handedness: 'two-handed', keywords: ['BLOCK', 'ARMOUR PIERCING 2', 'TWO-HANDED'], description: 'Melee, BLOCK, ARMOUR PIERCING 2, TWO-HANDED, Shield Combo. Skyweaver Only.' },
  // Thrown
  { id: 'hallucinogen_grenades', name: 'Hallucinogen Grenades', type: 'ranged', cost: 20, limit: 2, keywords: ['ASSAULT', 'BLAST 3"', 'THROWN'], description: '8", ASSAULT, BLAST 3", THROWN. Hit targets must move D3" on a hit. LIMIT: 2.' },
  { id: 'haywire_grenades_harlequins', name: 'Haywire Grenades', type: 'ranged', cost: 12, limit: 2, keywords: ['IGNORE ARMOUR', '-1 INJURY DICE', 'ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'STUN', 'THROWN'], description: '8", IGNORE ARMOUR, -1 INJURY DICE non-ARTIFICIAL/VEHICLE, ASSAULT, BLAST 3", IGNORE COVER, IGNORE LONG RANGE, STUN, THROWN. LIMIT: 2.' },
  { id: 'prismatic_grenades', name: 'Prismatic Grenades', type: 'ranged', cost: 10, keywords: ['BLAST 2"', 'THROWN'], description: '8", BLAST 2", THROWN. +1 DICE to Hit enemies hit by this attack during the same Activation.' },
  { id: 'star_bolas', name: 'Star Bolas', type: 'ranged', cost: 20, keywords: ['ASSAULT', 'BLAST 3"', 'FIRE', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'], description: '12", ASSAULT, BLAST 3", FIRE, IGNORE COVER, IGNORE LONG RANGE, THROWN. Skyweaver Only.' },
  { id: 'tanglefoot_grenades', name: 'Tanglefoot Grenades', type: 'ranged', cost: 10, limit: 3, keywords: ['+1 INJURY DICE', 'ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'IGNORE ARMOUR', 'NONLETHAL', 'STUN', 'THROWN'], description: '8", +1 INJURY DICE, ASSAULT, BLAST 3", IGNORE COVER, IGNORE LONG RANGE, IGNORE ARMOUR, NONLETHAL, STUN MARKERS, STUN, THROWN. LIMIT: 3.' },
];

// ============================================================================
// TYRANIDS FACTION WEAPONS
// ============================================================================
export const tyranidsWeapons: Weapon[] = [
  // Melee
  { id: 'chitinous_claw', name: 'Chitinous Claw', type: 'melee', cost: 3, keywords: [], description: 'Melee.' },
  { id: 'piercing_claw', name: 'Piercing Claw', type: 'melee', cost: 15, limit: 4, keywords: ['CRITICAL', 'ARMOUR PIERCING 1'], description: 'Melee, CRITICAL, ARMOUR PIERCING 1. LIMIT: 4. Elite or Tyranid Warrior Only.', restrictedTo: ['ELITE'] },
  { id: 'rending_claw', name: 'Rending Claw', type: 'melee', cost: 15, limit: 2, keywords: ['ARMOUR PIERCING 2'], description: 'Melee, ARMOUR PIERCING 2. LIMIT: 2. Elite or Ravener Only.', restrictedTo: ['ELITE'] },
  { id: 'scything_talon', name: 'Scything Talon', type: 'melee', cost: 4, keywords: ['CRITICAL'], description: 'Melee, CRITICAL.' },
  { id: 'toxic_scythe', name: 'Toxic Scythe', type: 'melee', cost: 7, limit: 2, keywords: ['INFECTION MARKERS', 'CRITICAL'], description: 'Melee, INFECTION MARKERS, CRITICAL. LIMIT: 2. Ravener Only.' },
  // Heavy Melee
  { id: 'bone_cleaver', name: 'Bone Cleaver', type: 'melee', cost: 120, limit: 1, isMainHandOnly: true, keywords: ['+2 INJURY DICE', 'HEAVY', 'MAIN HAND ONLY'], description: 'Melee, +2 INJURY DICE, HEAVY, MAIN HAND ONLY. 4 Glory. LIMIT: 1.' },
  { id: 'bonesword_tyranid', name: 'Bonesword', type: 'melee', cost: 15, isMainHandOnly: true, keywords: ['+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'MAIN HAND ONLY'], description: 'Melee, +1 INJURY DICE, CRITICAL, HEAVY, MAIN HAND ONLY.' },
  { id: 'crushing_claw', name: 'Crushing Claw', type: 'melee', cost: 15, keywords: ['+1 INJURY MODIFIER', 'HEAVY'], description: 'Melee, +1 INJURY MODIFIER, HEAVY.' },
  { id: 'lash_whip_tyranid', name: 'Lash Whip', type: 'melee', cost: 10, keywords: ['BLOCK', 'HEAVY', 'WHIP 3"'], description: 'Melee, BLOCK, HEAVY, WHIP 3". Max 1 per model.' },
  { id: 'slayer_sabre', name: 'Slayer Sabre', type: 'melee', cost: 30, limit: 1, isMainHandOnly: true, keywords: ['+1 INJURY DICE', 'CRITICAL', 'FIRE', 'HEAVY', 'MAIN HAND ONLY'], description: 'Melee, +1 INJURY DICE, CRITICAL, FIRE, HEAVY, MAIN HAND ONLY. 1 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  // Ranged
  { id: 'devourer', name: 'Devourer', type: 'ranged', cost: 5, handedness: 'two-handed', keywords: ['TWO-HANDED'], description: '18", TWO-HANDED.' },
  { id: 'fleshborer', name: 'Fleshborer', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['ASSAULT', 'TWO-HANDED'], description: '18", ASSAULT, TWO-HANDED.' },
  { id: 'shardlauncher', name: 'Shardlauncher', type: 'ranged', cost: 15, handedness: 'two-handed', keywords: ['IGNORE COVER', 'BLAST 2"', 'SHRAPNEL', 'TWO-HANDED'], description: '18", IGNORE COVER, BLAST 2", SHRAPNEL, TWO-HANDED.' },
  { id: 'spike_rifle', name: 'Spike Rifle', type: 'ranged', cost: 12, handedness: 'two-handed', keywords: ['ARMOUR PIERCING 1', 'TWO-HANDED'], description: '24", ARMOUR PIERCING 1, TWO-HANDED.' },
  { id: 'spinefists', name: 'Spinefists', type: 'ranged', cost: 12, handedness: 'two-handed', keywords: ['+1 DICE', 'ASSAULT', 'TWO-HANDED'], description: '12", +1 DICE, ASSAULT, TWO-HANDED.' },
  { id: 'strangleweb', name: 'Strangleweb', type: 'ranged', cost: 20, limit: 2, handedness: 'two-handed', keywords: ['FLAMETHROWER', 'STUN', 'TWO-HANDED'], description: '12", FLAMETHROWER, STUN, TWO-HANDED. LIMIT: 2.' },
  // Heavy Ranged
  { id: 'barbed_strangler', name: 'Barbed Strangler', type: 'ranged', cost: 20, limit: 2, handedness: 'two-handed', keywords: ['BLAST 2"', 'HEAVY', 'STUN', 'TWO-HANDED'], description: '24", BLAST 2", HEAVY, STUN, TWO-HANDED. LIMIT: 2.' },
  { id: 'barblauncher', name: 'Barblauncher', type: 'ranged', cost: 15, limit: 2, handedness: 'two-handed', keywords: ['IGNORE COVER', 'BLAST 2"', 'HEAVY', 'SHRAPNEL', 'TWO-HANDED'], description: '24", IGNORE COVER, BLAST 2", HEAVY, SHRAPNEL, TWO-HANDED. LIMIT: 2.' },
  { id: 'deathspitter', name: 'Deathspitter', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['GAS', 'HEAVY', 'TWO-HANDED'], description: '24", GAS, HEAVY, TWO-HANDED.' },
  { id: 'heavy_devourer', name: 'Heavy Devourer', type: 'ranged', cost: 20, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'TWO-HANDED'], description: '18", +1 INJURY DICE, HEAVY, TWO-HANDED.' },
  { id: 'heavy_venom_cannon', name: 'Heavy Venom Cannon', type: 'ranged', cost: 45, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'BLAST 2"', 'HEAVY', 'ARMOUR PIERCING 2', 'TWO-HANDED'], description: '36", +1 INJURY DICE, BLAST 2", HEAVY, ARMOUR PIERCING 2, TWO-HANDED. LIMIT: 1.' },
  { id: 'impaler_cannon', name: 'Impaler Cannon', type: 'ranged', cost: 25, handedness: 'two-handed', keywords: ['IGNORE COVER', 'HEAVY', 'ARMOUR PIERCING 1', 'TWO-HANDED'], description: '36", IGNORE COVER, HEAVY, ARMOUR PIERCING 1, TWO-HANDED.' },
  { id: 'miasma_cannon', name: 'Miasma Cannon', type: 'ranged', cost: 180, limit: 1, handedness: 'two-handed', keywords: ['IGNORE ARMOUR', 'BLAST 3"', 'GAS', 'TWO-HANDED'], description: '36", IGNORE ARMOUR, BLAST 3", GAS, TWO-HANDED. 6 Glory. LIMIT: 1.' },
  { id: 'shockcannon', name: 'Shockcannon', type: 'ranged', cost: 60, limit: 1, keywords: ['IGNORE ARMOUR', 'HEAVY', 'STUN'], description: '24", IGNORE ARMOUR, HEAVY, STUN. 2 Glory. LIMIT: 1.' },
  { id: 'strangethorn_cannon', name: 'Strangethorn Cannon', type: 'ranged', cost: 40, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'BLAST 2"', 'HEAVY', 'STUN', 'TWO-HANDED'], description: '36", +1 INJURY DICE, BLAST 2", HEAVY, STUN, TWO-HANDED. LIMIT: 1.' },
  { id: 'toxinjector_harpoon', name: 'Toxinjector Harpoon', type: 'ranged', cost: 90, limit: 1, handedness: 'two-handed', keywords: ['IGNORE COVER', 'IGNORE LONG RANGE', 'SHRAPNEL', 'TWO-HANDED'], description: '10", TWO-HANDED, IGNORE COVER, IGNORE LONG RANGE, SHRAPNEL. 3 Glory. LIMIT: 1. Elite Only. Causes no injury but BLOOD MARKER; pulls non-LARGE target to wielder.', restrictedTo: ['ELITE'] },
  { id: 'venom_cannon', name: 'Venom Cannon', type: 'ranged', cost: 25, limit: 1, handedness: 'two-handed', keywords: ['BLAST 2"', 'HEAVY', 'ARMOUR PIERCING 2', 'TWO-HANDED'], description: '24", BLAST 2", HEAVY, ARMOUR PIERCING 2, TWO-HANDED. LIMIT: 1.' },
  // Thrown
  { id: 'blinding_venom', name: 'Blinding Venom', type: 'ranged', cost: 5, keywords: ['GAS', 'THROWN'], description: 'Melee, GAS, THROWN. Gargoyle Only. Causes no injury but BLOOD MARKER; target cannot attack models that Retreat from it until end of Turn.' },
  { id: 'electroshock_grubs', name: 'Electroshock Grubs', type: 'ranged', cost: 7, limit: 2, keywords: ['ASSAULT', 'IGNORE COVER', 'IGNORE LONG RANGE', 'STUN', 'THROWN'], description: '6", ASSAULT, IGNORE COVER, IGNORE LONG RANGE, STUN, THROWN. LIMIT: 2.' },
  { id: 'desiccator_larvae', name: 'Desiccator Larvae', type: 'ranged', cost: 10, limit: 2, keywords: ['ASSAULT', 'IGNORE ARMOUR', 'GAS', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'], description: '6", ASSAULT, IGNORE ARMOUR, GAS, IGNORE COVER, IGNORE LONG RANGE, THROWN. LIMIT: 2.' },
  { id: 'shreddershard_beetles', name: 'Shreddershard Beetles', type: 'ranged', cost: 5, limit: 2, keywords: ['ASSAULT', 'BLAST 2"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'SHRAPNEL', 'THROWN'], description: '6", ASSAULT, BLAST 2", IGNORE COVER, IGNORE LONG RANGE, SHRAPNEL, THROWN. LIMIT: 2.' },
  { id: 'toxic_glands', name: 'Toxic Glands', type: 'ranged', cost: 5, limit: 1, keywords: ['ASSAULT', 'IGNORE LONG RANGE', 'INFECTION MARKERS', 'THROWN'], description: '6", ASSAULT, IGNORE LONG RANGE, INFECTION MARKERS, THROWN. LIMIT: 1. Ravener Only.' },
  { id: 'venom_blast', name: 'Venom Blast', type: 'ranged', cost: 30, limit: 1, keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', 'GAS', 'THROWN'], description: '8", FLAMETHROWER, IGNORE ARMOUR, GAS, THROWN. LIMIT: 1. Ravener Only.' },
  // Tail Weapons
  { id: 'bone_mace', name: 'Bone Mace', type: 'melee', cost: 12, limit: 1, keywords: ['ASSAULT', 'HEAVY', 'STUN', 'WHIP 3"'], description: 'Melee, ASSAULT, HEAVY, STUN, WHIP 3". Takes no hands; extra attack on Fight. LIMIT: 1. Hive Tyrant or Ravener Only.' },
  { id: 'pincer_tail', name: 'Pincer Tail', type: 'melee', cost: 10, keywords: ['ASSAULT', 'WHIP 3"'], description: 'Melee, ASSAULT, WHIP 3". Takes no hands; extra attack on Fight. Hive Tyrant or Ravener Only.' },
  { id: 'tail_blade', name: 'Tail Blade', type: 'melee', cost: 12, keywords: ['ASSAULT', 'CRITICAL', 'WHIP 3"'], description: 'Melee, ASSAULT, CRITICAL, WHIP 3". Takes no hands; extra attack on Fight. Hive Tyrant or Ravener Only.' },
];

// ============================================================================
// T'AU EMPIRE FACTION WEAPONS
// ============================================================================
export const tauEmpireWeapons: Weapon[] = [
  // Ranged
  { id: 'dart_bow_tau', name: 'Dart Bow', type: 'ranged', cost: 12, handedness: 'two-handed', keywords: ['CRITICAL', 'TWO-HANDED'], description: '24", CRITICAL, TWO-HANDED. Attacks can use Melee Skill. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'dvorgite_skinner', name: 'Dvorgite Skinner', type: 'ranged', cost: 30, limit: 1, handedness: 'two-handed', keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', 'GAS', 'TWO-HANDED'], description: '8", FLAMETHROWER, IGNORE ARMOUR, GAS, TWO-HANDED. LIMIT: 1. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'ion_rifle_tau', name: 'Ion Rifle', type: 'ranged', cost: 25, limit: 1, keywords: ['+1 INJURY DICE'], description: '30", +1 INJURY DICE. Standard/Overload profiles. LIMIT: 1.' },
  { id: 'kroot_carbine', name: 'Kroot Carbine', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['ASSAULT', 'TWO-HANDED'], description: '18", ASSAULT, TWO-HANDED. Bayonet Lug. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'kroot_rifle', name: 'Kroot Rifle', type: 'ranged', cost: 5, handedness: 'two-handed', keywords: ['TWO-HANDED'], description: '24", TWO-HANDED. Bayonet Lug. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'kroot_shaper_rifle', name: 'Kroot Shaper Rifle', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['ARMOUR PIERCING 1', 'TWO-HANDED'], description: '24", ARMOUR PIERCING 1, TWO-HANDED. Bayonet Lug. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'kroot_scattergun', name: 'Kroot Scattergun', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['+1 DICE', 'SHOTGUN', 'TWO-HANDED'], description: '12", +1 DICE, SHOTGUN, TWO-HANDED. Bayonet Lug. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'pulse_blaster', name: 'Pulse Blaster', type: 'ranged', cost: 15, limit: 2, handedness: 'two-handed', keywords: ['ASSAULT', 'TWO-HANDED'], description: '10", ASSAULT, TWO-HANDED. Can take two Shoot Actions per Activation. LIMIT: 2.' },
  { id: 'pulse_carbine', name: 'Pulse Carbine', type: 'ranged', cost: 12, handedness: 'two-handed', keywords: ['ASSAULT', 'TWO-HANDED'], description: '20", ASSAULT, TWO-HANDED.' },
  { id: 'pulse_rifle', name: 'Pulse Rifle', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['TWO-HANDED'], description: '30", TWO-HANDED.' },
  { id: 'rail_rifle_tau', name: 'Rail Rifle', type: 'ranged', cost: 40, limit: 1, handedness: 'two-handed', keywords: ['IGNORE ARMOUR', 'CRITICAL', 'TWO-HANDED'], description: '30", IGNORE ARMOUR, CRITICAL, TWO-HANDED. LIMIT: 1.' },
  { id: 'semi_automatic_gl', name: 'Semi-Automatic GL', type: 'ranged', cost: 40, limit: 1, handedness: 'two-handed', keywords: ['IGNORE COVER', 'BLAST 2"', 'TWO-HANDED'], description: '18", IGNORE COVER, BLAST 2", TWO-HANDED. EMP: IGNORE ARMOUR, -1 INJURY DICE, BLAST 3", STUN. Fusion: ARMOUR PIERCING 2. LIMIT: 1.' },
  { id: 'tanglebomb_launcher', name: 'Tanglebomb Launcher', type: 'ranged', cost: 10, limit: 2, handedness: 'two-handed', keywords: ['IGNORE ARMOUR', '+2 INJURY DICE', 'STUN MARKERS', 'NONLETHAL', 'BLAST 2"', 'STUN', 'TWO-HANDED'], description: '24", IGNORE ARMOUR, +2 INJURY DICE, STUN MARKERS, NONLETHAL, BLAST 2", STUN, TWO-HANDED. LIMIT: 2. Kroot Only.', restrictedTo: ['KROOT'] },
  // Pistols
  { id: 'kroot_pistol', name: 'Kroot Pistol', type: 'ranged', cost: 5, keywords: ['PISTOL'], description: '12", PISTOL. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'pulse_pistol', name: 'Pulse Pistol', type: 'ranged', cost: 10, keywords: ['PISTOL'], description: '16", PISTOL.' },
  { id: 'twin_pulse_pistols', name: 'Twin Pulse Pistols', type: 'ranged', cost: 15, limit: 2, handedness: 'two-handed', keywords: ['+1 DICE', 'CUMBERSOME', 'TWO-HANDED', 'PISTOL'], description: '16", +1 DICE, CUMBERSOME, TWO-HANDED, PISTOL. LIMIT: 2.' },
  // Heavy Ranged
  { id: 'londaxi_tribalest', name: 'Londaxi Tribalest', type: 'ranged', cost: 35, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'ARMOUR PIERCING 1', 'TWO-HANDED'], description: '18", +1 INJURY DICE, HEAVY, ARMOUR PIERCING 1, TWO-HANDED. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'repeater_cannon_tau', name: 'Repeater Cannon', type: 'ranged', cost: 45, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'ASSAULT', 'HEAVY', 'TWO-HANDED'], description: '36", AUTOMATIC 2, ASSAULT, HEAVY, TWO-HANDED. LIMIT: 1. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'tanglecannon', name: 'Tanglecannon', type: 'ranged', cost: 15, limit: 1, handedness: 'two-handed', keywords: ['IGNORE ARMOUR', '+2 INJURY DICE', 'STUN MARKERS', 'NONLETHAL', 'BLAST 3"', 'HEAVY', 'STUN', 'TWO-HANDED'], description: '36", IGNORE ARMOUR, +2 INJURY DICE, STUN MARKERS, NONLETHAL, BLAST 3", HEAVY, STUN, TWO-HANDED. LIMIT: 1. Kroot Only.', restrictedTo: ['KROOT'] },
  // Battlesuit Weapons
  { id: 'battlesuit_blade', name: 'Battlesuit Blade', type: 'melee', cost: 15, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'CRITICAL', 'CUMBERSOME', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, CRITICAL, CUMBERSOME, TWO-HANDED. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'burst_cannon_tau', name: 'Burst Cannon', type: 'ranged', cost: 15, keywords: ['+1 DICE'], description: '18", +1 DICE. Recon Drone or Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'cyclic_ion_blaster', name: 'Cyclic Ion Blaster', type: 'ranged', cost: 90, handedness: 'two-handed', keywords: ['AUTOMATIC 2', '+1 INJURY DICE'], description: '18", AUTOMATIC 2, +1 INJURY DICE. 3 Glory. Standard/Overload profiles. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'fragmentation_projector', name: 'Fragmentation Projector', type: 'ranged', cost: 35, keywords: ['IGNORE COVER', 'BLAST 3"', 'SHRAPNEL'], description: '24", IGNORE COVER, BLAST 3", SHRAPNEL. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'fusion_blaster_tau', name: 'Fusion Blaster', type: 'ranged', cost: 40, limit: 2, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'TWO-HANDED'], description: '12", +1 INJURY DICE, IGNORE ARMOUR, TWO-HANDED. LIMIT: 2. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'he_fusion_blaster', name: 'HE Fusion Blaster', type: 'ranged', cost: 150, limit: 1, handedness: 'two-handed', keywords: ['+2 INJURY DICE', 'IGNORE ARMOUR', 'TWO-HANDED'], description: '18", +2 INJURY DICE, IGNORE ARMOUR, TWO-HANDED. 5 Glory. LIMIT: 1. Elite Battlesuit Only.', restrictedTo: ['ELITE', 'VEHICLE'] },
  { id: 'hi_plasma_rifle', name: 'HI Plasma Rifle', type: 'ranged', cost: 60, limit: 1, keywords: ['+1 INJURY MODIFIER', 'ARMOUR PIERCING 1'], description: '18", +1 INJURY MODIFIER, ARMOUR PIERCING 1. 2 Glory. LIMIT: 1. Elite Battlesuit Only.', restrictedTo: ['ELITE', 'VEHICLE'] },
  { id: 'ho_burst_cannon', name: 'HO Burst Cannon', type: 'ranged', cost: 90, limit: 1, keywords: ['AUTOMATIC 2', '+1 DICE'], description: '18", AUTOMATIC 2, +1 DICE. 3 Glory. LIMIT: 1. Elite Battlesuit Only.', restrictedTo: ['ELITE', 'VEHICLE'] },
  { id: 'missile_pod_tau', name: 'Missile Pod', type: 'ranged', cost: 20, keywords: ['IGNORE COVER'], description: '30", IGNORE COVER. Missile Drone or Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'plasma_rifle_tau', name: 'Plasma Rifle', type: 'ranged', cost: 35, keywords: ['+1 INJURY MODIFIER', 'ARMOUR PIERCING 1'], description: '18", +1 INJURY MODIFIER, ARMOUR PIERCING 1. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'smart_missile_system', name: 'Smart Missile System', type: 'ranged', cost: 25, keywords: ['IGNORE COVER', 'IGNORE LONG RANGE'], description: '30", IGNORE COVER, IGNORE LONG RANGE. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'tau_flamer', name: "T'au Flamer", type: 'ranged', cost: 30, limit: 2, keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE'], description: '8", FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, FIRE. LIMIT: 2. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'twin_burst_cannon', name: 'Twin Burst Cannon', type: 'ranged', cost: 60, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', '+1 DICE', 'TWO-HANDED'], description: '18", AUTOMATIC 2, +1 DICE, TWO-HANDED. 2 Glory. LIMIT: 1. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  // Heavy Battlesuit Weapons
  { id: 'heavy_burst_cannon', name: 'Heavy Burst Cannon', type: 'ranged', cost: 50, handedness: 'two-handed', keywords: ['AUTOMATIC 2', '+1 INJURY DICE', 'HEAVY', 'TWO-HANDED'], description: '36", AUTOMATIC 2, +1 INJURY DICE, HEAVY, TWO-HANDED. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'heavy_rail_rifle', name: 'Heavy Rail Rifle', type: 'ranged', cost: 90, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'RELOAD', 'CRITICAL', 'HEAVY', 'TWO-HANDED'], description: '48", +1 INJURY DICE, IGNORE ARMOUR, RELOAD, CRITICAL, HEAVY, TWO-HANDED. 3 Glory. LIMIT: 1. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'high_yield_missile_pods', name: 'High-Yield Missile Pods', type: 'ranged', cost: 40, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'IGNORE COVER', 'HEAVY', 'TWO-HANDED'], description: '30", AUTOMATIC 2, IGNORE COVER, HEAVY, TWO-HANDED. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'seeker_missile', name: 'Seeker Missile', type: 'ranged', cost: 35, handedness: 'two-handed', keywords: ['DEADLY', 'IGNORE COVER', 'IGNORE LONG RANGE', 'CONSUMABLE', 'HEAVY', 'TWO-HANDED'], description: '48", DEADLY, IGNORE COVER, IGNORE LONG RANGE, CONSUMABLE, HEAVY, TWO-HANDED. Can only be used once per battle. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'twin_plasma_rifle_tau', name: 'Twin Plasma Rifle', type: 'ranged', cost: 35, handedness: 'two-handed', keywords: ['+1 DICE', '+1 INJURY MODIFIER', 'HEAVY', 'ARMOUR PIERCING 1', 'TWO-HANDED'], description: '18", +1 DICE, +1 INJURY MODIFIER, HEAVY, ARMOUR PIERCING 1, TWO-HANDED. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  { id: 'twin_smart_missile_system', name: 'Twin Smart Missile System', type: 'ranged', cost: 35, handedness: 'two-handed', keywords: ['+1 DICE', 'IGNORE COVER', 'IGNORE LONG RANGE', 'HEAVY', 'TWO-HANDED'], description: '30", +1 DICE, IGNORE COVER, IGNORE LONG RANGE, HEAVY, TWO-HANDED. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
  // Melee
  { id: 'bladestave_tau', name: 'Bladestave', type: 'melee', cost: 5, limit: 3, handedness: 'two-handed', keywords: ['CRITICAL', 'CUMBERSOME', 'TWO-HANDED'], description: 'Melee, CRITICAL, CUMBERSOME, TWO-HANDED. Enemies cannot Retreat from close combat. LIMIT: 3.' },
  { id: 'equalizer_tau', name: 'Equalizer', type: 'melee', cost: 25, limit: 1, isMainHandOnly: true, keywords: ['IGNORE ARMOUR', 'MAIN HAND ONLY'], description: 'Melee, IGNORE ARMOUR, MAIN HAND ONLY. LIMIT: 1. Ethereal Only.', restrictedTo: ['LEADER'] },
  { id: 'honor_blade_tau', name: 'Honor Blade', type: 'melee', cost: 15, isMainHandOnly: true, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'CUMBERSOME', 'TWO-HANDED', 'MAIN HAND ONLY'], description: 'Melee, +1 INJURY DICE, CUMBERSOME, TWO-HANDED, MAIN HAND ONLY. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'kroot_bayonet', name: 'Kroot Bayonet', type: 'melee', cost: 3, keywords: ['CRITICAL'], description: 'Melee, CRITICAL. Kroot Only. Counts as Bayonet for Bayonet Lug.', restrictedTo: ['KROOT'] },
  { id: 'short_blade_tau', name: 'Short Blade', type: 'melee', cost: 3, keywords: [], description: 'Melee.' },
  // Thrown
  { id: 'blast_javelin_tau', name: 'Blast Javelin', type: 'ranged', cost: 15, limit: 1, keywords: ['ASSAULT', '+1 INJURY DICE', 'IGNORE ARMOUR', 'PISTOL', 'THROWN', 'CONSUMABLE'], description: '18", ASSAULT, +1 INJURY DICE, IGNORE ARMOUR, PISTOL, THROWN, CONSUMABLE. LIMIT: 1. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'emp_grenades_tau', name: 'EMP Grenades', type: 'ranged', cost: 12, limit: 2, keywords: ['IGNORE ARMOUR', '-1 INJURY DICE', 'ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'STUN', 'THROWN'], description: '8", IGNORE ARMOUR, -1 INJURY DICE non-ARTIFICIAL/VEHICLE, ASSAULT, BLAST 3", IGNORE COVER, IGNORE LONG RANGE, STUN, THROWN. LIMIT: 2.' },
  { id: 'hunting_javelins', name: 'Hunting Javelins', type: 'ranged', cost: 15, keywords: ['ASSAULT', 'PISTOL', 'THROWN'], description: '18", ASSAULT, PISTOL, THROWN. +1 INJURY DICE in melee if Charged this Activation. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'photon_grenades', name: 'Photon Grenades', type: 'ranged', cost: 10, keywords: ['ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'STUN', 'THROWN'], description: '8", ASSAULT, BLAST 3", IGNORE COVER, IGNORE LONG RANGE, STUN, THROWN. Causes no injury but STUN MARKER. Target cannot attack models that Retreat until end of Turn.' },
  { id: 'tri_blades_tau', name: 'Tri-Blades', type: 'ranged', cost: 5, keywords: ['IGNORE LONG RANGE', 'ASSAULT', 'THROWN'], description: '12", IGNORE LONG RANGE, ASSAULT, THROWN. Kroot Only.', restrictedTo: ['KROOT'] },
  // Campaign Shop Weapons
  { id: 'ka_chak_tarr', name: "Ka'chak'tarr", type: 'ranged', cost: 90, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'IGNORE COVER', 'ASSAULT', 'ARMOUR PIERCING 1', 'TWO-HANDED'], description: '24", AUTOMATIC 2, IGNORE COVER, ASSAULT, ARMOUR PIERCING 1, TWO-HANDED. Enemies cannot change the target of attacks made with this weapon. 3 Glory. LIMIT: 1. Kroot Only.', restrictedTo: ['KROOT'] },
  { id: 'kindled_blade_tau', name: 'Kindled Blade', type: 'melee', cost: 90, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'CUMBERSOME', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, CUMBERSOME, TWO-HANDED. Friendly non-ARTIFICIAL, non-VEHICLE, non-KROOT T\'au models within 9" of the bearer have +1 DICE to Hit with all attacks. 3 Glory. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'krep_chak', name: "Krep'chak", type: 'melee', cost: 90, limit: 1, keywords: ['CLEAVE 2', 'CRITICAL'], description: "Melee, CLEAVE 2, CRITICAL. The first time the equipped model takes an enemy Out of Action in melee during each battle, this weapon gains +1 INJURY DICE and ARMOUR PIERCING 1 until the end of the battle. 3 Glory. LIMIT: 1. Kroot Only.", restrictedTo: ['KROOT'] },
  { id: 'onager_gauntlet_tau', name: 'Onager Gauntlet', type: 'melee', cost: 60, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY MODIFIER', 'IGNORE ARMOUR', 'CUMBERSOME', 'HEAVY', 'TWO-HANDED'], description: 'Melee, +1 INJURY MODIFIER, IGNORE ARMOUR, CUMBERSOME, HEAVY, TWO-HANDED. 2 Glory. LIMIT: 1. Battlesuit Only.', restrictedTo: ['VEHICLE'] },
];

// ============================================================================
// SLANNI FACTION WEAPONS
// ============================================================================
export const slanniWeapons: Weapon[] = [
  // Ranged
  { id: 'beam_rifle', name: 'Beam Rifle', type: 'ranged', cost: 25, handedness: 'two-handed', keywords: ['+1 INJURY MODIFIER', 'TWO-HANDED'], description: '24", +1 INJURY MODIFIER, TWO-HANDED.' },
  { id: 'charge_rifle', name: 'Charge Rifle', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['VICIOUS 11', 'TWO-HANDED'], description: '24", VICIOUS 11, TWO-HANDED.' },
  { id: 'charge_shotgun', name: 'Charge Shotgun', type: 'ranged', cost: 12, handedness: 'two-handed', keywords: ['SHOTGUN', 'VICIOUS 11', 'TWO-HANDED'], description: '12", SHOTGUN, VICIOUS 11, TWO-HANDED, Shield Combo.' },
  { id: 'gravity_rifle', name: 'Gravity Rifle', type: 'ranged', cost: 30, limit: 2, handedness: 'two-handed', keywords: ['IGNORE ARMOUR', 'STUN', 'TWO-HANDED'], description: '18", IGNORE ARMOUR, STUN, TWO-HANDED. LIMIT: 2.' },
  { id: 'beam_sniper_rifle', name: 'Beam Sniper Rifle', type: 'ranged', cost: 40, limit: 1, handedness: 'two-handed', keywords: ['+1 DICE', '+1 INJURY MODIFIER', 'CRITICAL', 'RISKY', 'TWO-HANDED'], description: '48", +1 DICE, +1 INJURY MODIFIER, CRITICAL, RISKY, TWO-HANDED. LIMIT: 1.' },
  { id: 'net_launcher', name: 'Net Launcher', type: 'ranged', cost: 10, limit: 3, handedness: 'two-handed', keywords: ['+2 INJURY DICE', 'BLAST 2"', 'IGNORE ARMOUR', 'NONLETHAL', 'STUN MARKERS', 'STUN', 'TWO-HANDED'], description: '18", +2 INJURY DICE, BLAST 2", IGNORE ARMOUR, NONLETHAL, STUN MARKERS, STUN, TWO-HANDED. LIMIT: 3.' },
  { id: 'heat_rifle', name: 'Heat Rifle', type: 'ranged', cost: 15, limit: 2, keywords: ['CRITICAL', 'FIRE'], description: '24", CRITICAL, FIRE. LIMIT: 2.' },
  { id: 'scatter_rifle', name: 'Scatter Rifle', type: 'ranged', cost: 40, limit: 1, handedness: 'two-handed', keywords: ['ASSAULT', 'AUTOMATIC 2', 'TWO-HANDED'], description: '24", ASSAULT, AUTOMATIC 2, TWO-HANDED. LIMIT: 1.' },
  { id: 'slanni_flamer', name: 'Slanni Flamer', type: 'ranged', cost: 35, limit: 2, handedness: 'two-handed', keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE', 'TWO-HANDED'], description: '12", FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, FIRE, TWO-HANDED. LIMIT: 2.' },
  // Pistols
  { id: 'charge_pistol', name: 'Charge Pistol', type: 'ranged', cost: 7, keywords: ['VICIOUS 11', 'PISTOL'], description: '12", VICIOUS 11, PISTOL.' },
  { id: 'gravity_projector', name: 'Gravity Projector', type: 'ranged', cost: 90, limit: 1, keywords: ['IGNORE ARMOUR', 'STUN', 'PISTOL'], description: '12", IGNORE ARMOUR, STUN, PISTOL. 3 Glory. LIMIT: 1.' },
  { id: 'beam_pistol', name: 'Beam Pistol', type: 'ranged', cost: 25, limit: 2, keywords: ['+1 INJURY MODIFIER', 'PISTOL'], description: '12", +1 INJURY MODIFIER, PISTOL. LIMIT: 2.' },
  { id: 'heat_pistol', name: 'Heat Pistol', type: 'ranged', cost: 20, limit: 1, keywords: ['CRITICAL', 'FIRE', 'PISTOL'], description: '12", CRITICAL, FIRE, PISTOL. LIMIT: 1.' },
  { id: 'net_pistol', name: 'Net Pistol', type: 'ranged', cost: 5, limit: 2, keywords: ['+2 INJURY DICE', 'IGNORE ARMOUR', 'NONLETHAL', 'PISTOL', 'STUN MARKERS', 'STUN'], description: '12", +2 INJURY DICE, IGNORE ARMOUR, NONLETHAL, PISTOL, STUN MARKERS, STUN. LIMIT: 2.' },
  { id: 'neuro_disruptor_slanni', name: 'Neuro Disruptor', type: 'ranged', cost: 30, limit: 2, keywords: ['-1 INJURY DICE', 'ASSAULT', 'IGNORE ARMOUR', 'PISTOL'], description: '12", -1 INJURY DICE, ASSAULT, IGNORE ARMOUR, PISTOL. LIMIT: 2. Elite Psyker Only.' },
  // Heavy Ranged
  { id: 'distortion_cannon_slanni', name: 'Distortion Cannon', type: 'ranged', cost: 120, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', '-1 INJURY DICE', '+1 INJURY DICE', 'FLAMETHROWER', 'IGNORE ARMOUR', 'HEAVY', 'PSYCHIC', 'TWO-HANDED'], description: '10", AUTOMATIC 2, -1 INJURY DICE, FLAMETHROWER, +1 INJURY DICE, IGNORE ARMOUR, HEAVY, PSYCHIC, TWO-HANDED. 4 Glory. LIMIT: 1.' },
  { id: 'gravity_cannon', name: 'Gravity Cannon', type: 'ranged', cost: 50, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'STUN', 'TWO-HANDED'], description: '36", +1 INJURY DICE, IGNORE ARMOUR, HEAVY, STUN, TWO-HANDED. LIMIT: 1.' },
  { id: 'heavy_beamer', name: 'Heavy Beamer', type: 'ranged', cost: 40, limit: 2, handedness: 'two-handed', keywords: ['+1 DICE', '+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'RISKY', 'TWO-HANDED'], description: '48", +1 DICE, +1 INJURY DICE, CRITICAL, HEAVY, RISKY, TWO-HANDED. LIMIT: 2.' },
  { id: 'scatter_cannon_slanni', name: 'Scatter Cannon', type: 'ranged', cost: 50, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 3', 'HEAVY', 'RELOAD', 'TWO-HANDED'], description: '36", AUTOMATIC 3, HEAVY, RELOAD, TWO-HANDED. LIMIT: 1.' },
  // Melee
  { id: 'astromancers_staff', name: "Astromancer's Staff", type: 'melee', cost: 90, keywords: ['PSYCHIC', 'HELD'], description: 'Melee, PSYCHIC, HELD. 3 Glory. Starpriest Only. Allies within 3" always Charge max distance; enemies charging bearer/allies within 3" do not add D6.' },
  { id: 'glaive_slanni', name: 'Glaive', type: 'melee', cost: 7, handedness: 'two-handed', keywords: ['BLOCK', 'TWO-HANDED'], description: 'Melee, BLOCK, TWO-HANDED, Shield Combo.' },
  { id: 'mage_staff', name: 'Mage Staff', type: 'melee', cost: 5, isMainHandOnly: true, keywords: ['+1 DICE', 'PSYCHIC', 'HELD', 'MAIN HAND ONLY'], description: 'Melee, +1 DICE, +1 INJURY DICE vs DAEMON/PSYKER, PSYCHIC, HELD, MAIN HAND ONLY. Psyker Only.', restrictedTo: ['PSYKER'] },
  // Heavy Melee
  { id: 'celestite_warmace', name: 'Celestite Warmace', type: 'melee', cost: 25, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'], description: 'Melee, +1 INJURY MODIFIER, HEAVY, IGNORE ARMOUR on Critical Hit, TWO-HANDED. LIMIT: 1.' },
  { id: 'gravity_fist', name: 'Gravity Fist', type: 'melee', cost: 15, limit: 2, keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'STUN'], description: 'Melee, +1 INJURY MODIFIER, HEAVY, STUN. LIMIT: 2.' },
  // Combined
  { id: 'beam_spear', name: 'Beam Spear', type: 'melee', cost: 25, handedness: 'two-handed', keywords: ['BLOCK', 'TWO-HANDED', 'HELD'], description: 'BLOCK, TWO-HANDED, HELD, Shield Combo. Strike: Melee, +1 INJURY DICE if Charged. Beam Shot: 18", +1 INJURY MODIFIER.' },
  { id: 'searing_mace', name: 'Searing Mace', type: 'melee', cost: 25, limit: 2, handedness: 'two-handed', keywords: ['CRITICAL', 'FIRE', 'TWO-HANDED', 'HELD'], description: 'CRITICAL, FIRE, TWO-HANDED, HELD. Strike: Melee, +1 INJURY DICE. Heat Ray: 18". LIMIT: 2.' },
  { id: 'scatter_glaive', name: 'Scatter Glaive', type: 'melee', cost: 25, limit: 2, handedness: 'two-handed', keywords: ['BLOCK', 'TWO-HANDED', 'HELD'], description: 'BLOCK, TWO-HANDED, HELD, Shield Combo. Strike: Melee, +1 INJURY DICE. Scatter Laser: 12", AUTOMATIC 2. LIMIT: 2.' },
  { id: 'gravity_hammer', name: 'Gravity Hammer', type: 'melee', cost: 35, limit: 2, handedness: 'two-handed', keywords: ['HEAVY', 'TWO-HANDED', 'HELD'], description: 'HEAVY, TWO-HANDED, HELD. Strike: Melee, +1 INJURY MODIFIER, IGNORE ARMOUR, STUN. Gravity Blast: 12", IGNORE ARMOUR, STUN. LIMIT: 2.' },
  // Thrown
  { id: 'gravity_bombs', name: 'Gravity Bombs', type: 'ranged', cost: 20, limit: 1, keywords: ['+1 INJURY DICE', 'BLAST 2"', 'IGNORE ARMOUR', 'ASSAULT', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'], description: '8", +1 INJURY DICE, BLAST 2", IGNORE ARMOUR, ASSAULT, IGNORE COVER, IGNORE LONG RANGE, THROWN. LIMIT: 1.' },
  { id: 'net_bombs', name: 'Net Bombs', type: 'ranged', cost: 7, keywords: ['+2 INJURY DICE', 'ASSAULT', 'BLAST 2"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'IGNORE ARMOUR', 'NONLETHAL', 'STUN MARKERS', 'STUN'], description: '8", +2 INJURY DICE, ASSAULT, BLAST 2", IGNORE COVER, IGNORE LONG RANGE, IGNORE ARMOUR, NONLETHAL, STUN MARKERS, STUN.' },
  { id: 'hypertoxin_grenades', name: 'Hypertoxin Grenades', type: 'ranged', cost: 15, limit: 2, keywords: ['IGNORE ARMOUR', 'ASSAULT', 'BLAST 3"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'GAS', 'THROWN'], description: '8", IGNORE ARMOUR, ASSAULT, BLAST 3", IGNORE COVER, IGNORE LONG RANGE, GAS, THROWN. LIMIT: 2.' },
  { id: 'plasma_grenades_slanni', name: 'Plasma Grenades', type: 'ranged', cost: 15, keywords: ['ASSAULT', 'BLAST 2"', 'FIRE', 'IGNORE COVER', 'IGNORE LONG RANGE', 'THROWN'], description: '8", ASSAULT, BLAST 2", FIRE, IGNORE COVER, IGNORE LONG RANGE, THROWN.' },
];

// ============================================================================
// ORKS FACTION WEAPONS
// ============================================================================
export const orksWeapons: Weapon[] = [
  // Ranged
  { id: 'burna', name: 'Burna', type: 'ranged', cost: 30, limit: 3, handedness: 'two-handed', keywords: ['FLAMETHROWER', 'IGNORE ARMOUR', '-1 INJURY DICE', 'FIRE', 'TWO-HANDED'], description: '8", FLAMETHROWER, IGNORE ARMOUR, -1 INJURY DICE, FIRE, TWO-HANDED. LIMIT: 3.' },
  { id: 'shoota', name: 'Shoota', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'RISKY', 'TWO-HANDED'], description: '18", AUTOMATIC 2, RISKY, TWO-HANDED.' },
  { id: 'speshul_shoota', name: 'Speshul Shoota', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['ASSAULT', 'RISKY', 'SHOTGUN', 'TWO-HANDED'], description: '12", ASSAULT, RISKY, SHOTGUN, TWO-HANDED.' },
  { id: 'thump_gun', name: 'Thump Gun', type: 'ranged', cost: 10, handedness: 'two-handed', keywords: ['BLAST 2"', 'RISKY', 'SHRAPNEL', 'TWO-HANDED'], description: '12", BLAST 2", RISKY, SHRAPNEL, TWO-HANDED.' },
  // Pistols
  { id: 'grot_blasta', name: 'Grot Blasta', type: 'ranged', cost: 5, keywords: ['PISTOL'], description: '12", PISTOL. Gretchin Only.' },
  { id: 'kustom_mega_slugga', name: 'Kustom Mega Slugga', type: 'ranged', cost: 10, limit: 1, keywords: ['BLAST 2"', 'ARMOUR PIERCING 2', 'RISKY', 'STUN', 'PISTOL'], description: '12", BLAST 2", ARMOUR PIERCING 2, RISKY, STUN, PISTOL. Self-hit on miss. LIMIT: 1. Mek or Big Mek Only.' },
  { id: 'rokkit_pistol', name: 'Rokkit Pistol', type: 'ranged', cost: 5, keywords: ['HEAVY', 'RISKY', 'ARMOUR PIERCING 1', 'PISTOL'], description: '12", HEAVY, RISKY, ARMOUR PIERCING 1, PISTOL.' },
  { id: 'shokka_pistol', name: 'Shokka Pistol', type: 'ranged', cost: 5, keywords: ['ASSAULT', 'HEAVY', 'PISTOL', 'RISKY', 'STUN'], description: '12", ASSAULT, HEAVY, PISTOL, RISKY, STUN. Mek or Big Mek Only.' },
  { id: 'slugga', name: 'Slugga', type: 'ranged', cost: 3, keywords: ['ASSAULT', 'RISKY', 'PISTOL'], description: '12", ASSAULT, RISKY, PISTOL.' },
  { id: 'twin_slugga', name: 'Twin Slugga', type: 'ranged', cost: 15, limit: 2, keywords: ['AUTOMATIC 2', 'ASSAULT', 'HEAVY', 'RISKY', 'PISTOL'], description: '12", AUTOMATIC 2, ASSAULT, HEAVY, RISKY, PISTOL. LIMIT: 2. Elite Only.', restrictedTo: ['ELITE'] },
  // Heavy Ranged
  { id: 'big_shoota', name: 'Big Shoota', type: 'ranged', cost: 35, handedness: 'two-handed', keywords: ['AUTOMATIC 3', 'HEAVY', 'RELOAD', 'RISKY', 'TWO-HANDED'], description: '36", AUTOMATIC 3, HEAVY, RELOAD, RISKY, TWO-HANDED. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'deffgun', name: 'Deffgun', type: 'ranged', cost: 60, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', '+1 INJURY DICE', 'HEAVY', 'RISKY', 'TWO-HANDED'], description: '36", AUTOMATIC 2, +1 INJURY DICE, HEAVY, RISKY, TWO-HANDED. 2 Glory. LIMIT: 1.' },
  { id: 'kombi_weapon_orks', name: 'Kombi-Weapon', type: 'ranged', cost: 30, limit: 3, keywords: ['AUTOMATIC 2', 'ASSAULT', 'CRITICAL', 'HEAVY', 'RISKY'], description: '24", AUTOMATIC 2, ASSAULT, CRITICAL, HEAVY, RISKY. LIMIT: 3.' },
  { id: 'kustom_mega_blasta', name: 'Kustom Mega-Blasta', type: 'ranged', cost: 20, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'ARMOUR PIERCING 2', 'RISKY', 'TWO-HANDED'], description: '24", +1 INJURY DICE, HEAVY, ARMOUR PIERCING 2, RISKY, TWO-HANDED. Self-hit on miss. LIMIT: 1. Mek or Big Mek Only.' },
  { id: 'kustom_shoota', name: 'Kustom Shoota', type: 'ranged', cost: 25, limit: 2, keywords: ['AUTOMATIC 3', '-1 INJURY DICE', 'HEAVY', 'RISKY'], description: '18", AUTOMATIC 3, -1 INJURY DICE, HEAVY, RISKY. LIMIT: 2.' },
  { id: 'rokkit_launcha', name: 'Rokkit Launcha', type: 'ranged', cost: 25, limit: 3, handedness: 'two-handed', keywords: ['IGNORE COVER', 'BLAST 3"', 'HEAVY', 'RISKY', 'SHRAPNEL', 'TWO-HANDED'], description: '24", IGNORE COVER, BLAST 3", HEAVY, RISKY, SHRAPNEL, TWO-HANDED. LIMIT: 3.' },
  { id: 'shokk_attack_gun', name: 'Shokk Attack Gun', type: 'ranged', cost: 60, handedness: 'two-handed', keywords: ['IGNORE COVER', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'STUN', 'TWO-HANDED'], description: '48", IGNORE COVER, IGNORE ARMOUR, HEAVY, RISKY, STUN, TWO-HANDED. 2 Glory. Attacker rolls injury on a miss. Mek or Big Mek Only.' },
  { id: 'skorcha', name: 'Skorcha', type: 'ranged', cost: 55, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', '-1 INJURY DICE', 'FLAMETHROWER', 'IGNORE ARMOUR', 'FIRE', 'HEAVY', 'TWO-HANDED'], description: '10", AUTOMATIC 2, -1 INJURY DICE, FLAMETHROWER, IGNORE ARMOUR, FIRE, HEAVY, TWO-HANDED. LIMIT: 1.' },
  { id: 'traktor_blasta', name: 'Traktor Blasta', type: 'ranged', cost: 25, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'RISKY', 'TWO-HANDED'], description: '36", +1 INJURY DICE, HEAVY, RISKY, TWO-HANDED. Non-LARGE hit moved D6" toward wielder. LIMIT: 1. Mek or Big Mek Only.' },
  { id: 'twin_dakkagun', name: 'Twin Dakkagun', type: 'ranged', cost: 35, handedness: 'two-handed', keywords: ['AUTOMATIC 3', '+1 DICE', '-1 INJURY DICE', 'HEAVY', 'RISKY', 'TWO-HANDED'], description: '18", AUTOMATIC 3, +1 DICE, -1 INJURY DICE, HEAVY, RISKY, TWO-HANDED. Warbike Only.' },
  { id: 'zzap_gun', name: 'Zzap Gun', type: 'ranged', cost: 25, limit: 2, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'RISKY', 'STUN', 'TWO-HANDED'], description: '36", +1 INJURY DICE, HEAVY, RISKY, STUN, TWO-HANDED. LIMIT: 2. Mek or Big Mek Only.' },
  // Melee — Ork-specific
  { id: 'breacha_ram', name: 'Breacha Ram', type: 'melee', cost: 10, limit: 2, handedness: 'two-handed', keywords: ['-1 DICE', '+1 INJURY DICE', 'TWO-HANDED'], description: 'Melee, -1 DICE, +1 INJURY DICE, TWO-HANDED. LIMIT: 2.' },
  { id: 'chain_choppa', name: 'Chain Choppa', type: 'melee', cost: 10, keywords: ['CRITICAL', 'RISKY', 'SHRAPNEL'], description: 'Melee, CRITICAL, RISKY, SHRAPNEL.' },
  { id: 'choppa', name: 'Choppa', type: 'melee', cost: 4, keywords: ['CRITICAL'], description: 'Melee, CRITICAL.' },
  { id: 'grabba_stikk', name: 'Grabba Stikk', type: 'melee', cost: 7, handedness: 'two-handed', keywords: ['TWO-HANDED'], description: 'Melee, TWO-HANDED. Enemies cannot Retreat. Runtherd Only.' },
  { id: 'grot_prod', name: 'Grot-Prod', type: 'melee', cost: 7, handedness: 'two-handed', keywords: ['TWO-HANDED', 'RISKY', 'STUN'], description: 'Melee, TWO-HANDED, RISKY, STUN. Runtherd Only.' },
  { id: 'lil_stikka', name: "Lil' Stikka", type: 'melee', cost: 3, keywords: [], description: 'Melee.' },
  { id: 'power_snappa', name: 'Power Snappa', type: 'melee', cost: 15, limit: 2, keywords: ['CRITICAL', 'ARMOUR PIERCING 1', 'RISKY'], description: 'Melee, CRITICAL, ARMOUR PIERCING 1, RISKY. LIMIT: 2.' },
  { id: 'twin_choppas', name: 'Twin Choppas', type: 'melee', cost: 12, handedness: 'two-handed', keywords: ['CRITICAL', 'IGNORE OFF-HAND', 'TWO-HANDED'], description: 'Melee, CRITICAL, IGNORE OFF-HAND. Comes as a pair. Elite or Kommando Only.' },
  { id: 'weirdboy_staff', name: 'Weirdboy Staff', type: 'melee', cost: 5, isMainHandOnly: true, keywords: ['+1 DICE', '+1 INJURY DICE vs DAEMON/PSYKER', 'PSYCHIC', 'HELD', 'MAIN HAND ONLY'], description: 'Melee, +1 DICE, +1 INJURY DICE vs DAEMON/PSYKER, PSYCHIC, HELD, MAIN HAND ONLY. Psyker Only.', restrictedTo: ['PSYKER'] },
  // Heavy Melee
  { id: 'big_choppa', name: 'Big Choppa', type: 'melee', cost: 12, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, CRITICAL, HEAVY, TWO-HANDED.' },
  { id: 'drilla_orks', name: 'Drilla', type: 'melee', cost: 40, limit: 1, handedness: 'two-handed', keywords: ['-1 DICE', '+1 INJURY MODIFIER', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED'], description: 'Melee, -1 DICE, +1 INJURY MODIFIER, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED. LIMIT: 1.' },
  { id: 'killsaw', name: 'Killsaw', type: 'melee', cost: 40, limit: 1, handedness: 'two-handed', keywords: ['-1 DICE', '+1 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED'], description: 'Melee, -1 DICE, +1 INJURY DICE, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED. LIMIT: 1.' },
  { id: 'knucklebusta', name: 'Knucklebusta', type: 'melee', cost: 20, limit: 2, keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'ARMOUR PIERCING 1', 'RISKY'], description: 'Melee, +1 INJURY MODIFIER, HEAVY, ARMOUR PIERCING 1, RISKY. LIMIT: 2.' },
  { id: 'power_klaw', name: 'Power Klaw', type: 'melee', cost: 30, limit: 1, keywords: ['+2 INJURY DICE', 'CRITICAL', 'HEAVY', 'ARMOUR PIERCING 2', 'RISKY'], description: 'Melee, +2 INJURY DICE, CRITICAL, HEAVY, ARMOUR PIERCING 2, RISKY. LIMIT: 1.' },
  { id: 'smash_hammer_orks', name: 'Smash Hammer', type: 'melee', cost: 10, handedness: 'two-handed', keywords: ['+1 INJURY MODIFIER', 'HEAVY', 'TWO-HANDED'], description: 'Melee, +1 INJURY MODIFIER, HEAVY, TWO-HANDED.' },
  { id: 'power_stabba', name: 'Power Stabba', type: 'melee', cost: 15, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'HEAVY', 'ARMOUR PIERCING 1', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, HEAVY, ARMOUR PIERCING 1, TWO-HANDED. LIMIT: 1.' },
  { id: 'tankhammer', name: 'Tankhammer', type: 'melee', cost: 25, limit: 2, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, IGNORE ARMOUR, HEAVY, TWO-HANDED. On a hit, wielder suffers 1 BLOOD MARKER. LIMIT: 2.' },
  { id: 'twin_killsaw', name: 'Twin Killsaw', type: 'melee', cost: 50, limit: 1, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'HEAVY', 'RISKY', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, IGNORE ARMOUR, HEAVY, RISKY, TWO-HANDED. LIMIT: 1. Elite Only.', restrictedTo: ['ELITE'] },
  { id: 'uge_choppa', name: "'Uge Choppa", type: 'melee', cost: 50, limit: 1, handedness: 'two-handed', keywords: ['DEADLY', 'CRITICAL', 'HEAVY', 'TWO-HANDED'], description: "Melee, DEADLY, CRITICAL, HEAVY, TWO-HANDED. LIMIT: 1. Warboss Only." },
  // Thrown
  { id: 'firey_stikkbombs', name: 'Firey Stikkbombs', type: 'ranged', cost: 10, limit: 2, keywords: ['IGNORE ARMOUR on Critical', 'ASSAULT', 'FIRE', 'IGNORE COVER', 'IGNORE LONG RANGE', 'RISKY', 'THROWN'], description: '8", IGNORE ARMOUR on Critical, ASSAULT, FIRE, IGNORE COVER, IGNORE LONG RANGE, RISKY, THROWN. LIMIT: 2.' },
  { id: 'krak_stikkbombs', name: 'Krak Stikkbombs', type: 'ranged', cost: 7, limit: 2, keywords: ['ASSAULT', 'IGNORE COVER', 'IGNORE LONG RANGE', 'ARMOUR PIERCING 2', 'RISKY', 'THROWN'], description: '8", ASSAULT, IGNORE COVER, IGNORE LONG RANGE, ARMOUR PIERCING 2, RISKY, THROWN. LIMIT: 2.' },
  { id: 'stikkbomb', name: 'Stikkbomb', type: 'ranged', cost: 5, keywords: ['ASSAULT', 'BLAST 2"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'RISKY', 'SHRAPNEL', 'THROWN'], description: '8", ASSAULT, BLAST 2", IGNORE COVER, IGNORE LONG RANGE, RISKY, SHRAPNEL, THROWN.' },
  { id: 'throwing_knives_orks', name: 'Throwing Knives', type: 'ranged', cost: 5, keywords: ['IGNORE LONG RANGE', 'ASSAULT', 'THROWN'], description: '8", IGNORE LONG RANGE, ASSAULT, THROWN. Kommando Only.' },
];

// ============================================================================
// CHAOS DAEMONS LEGION WEAPONS
// ============================================================================
export const chaosDaemonsWeapons: Weapon[] = [
  // Blood Legion
  { id: 'scorched_skull_cannon', name: 'Scorched Skull Cannon', type: 'ranged', cost: 15, limit: 2, handedness: 'two-handed', keywords: ['BLAST 2"', 'FIRE', 'RISKY', 'TWO-HANDED'], description: '24", BLAST 2", FIRE, RISKY, TWO-HANDED. LIMIT: 2. Blood Legion.' },
  { id: 'blade_of_blood', name: 'Blade of Blood', type: 'melee', cost: 18, limit: 2, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'VICIOUS 10', 'CRITICAL', 'TWO-HANDED'], description: 'Melee, +1 INJURY DICE, VICIOUS 10, CRITICAL, TWO-HANDED. LIMIT: 2. Blood Legion.' },
  { id: 'hellblade_daemon', name: 'Hellblade', type: 'melee', cost: 7, handedness: 'two-handed', keywords: ['VICIOUS 10', 'CRITICAL', 'TWO-HANDED'], description: 'Melee, VICIOUS 10, CRITICAL, TWO-HANDED. Blood Legion.' },
  // Legion of Excess
  { id: 'lashes_of_torment', name: 'Lashes of Torment', type: 'melee', cost: 10, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'ASSAULT', 'CUMBERSOME', 'CLEAVE 2', 'STUN', 'TWO-HANDED', 'WHIP 6"'], description: 'Melee, AUTOMATIC 2, ASSAULT, CUMBERSOME, CLEAVE 2, STUN, TWO-HANDED, WHIP 6". Cannot use AUTOMATIC and CLEAVE in same activation. Legion of Excess.' },
  { id: 'whips_of_agony', name: 'Whips Of Agony', type: 'melee', cost: 60, limit: 1, handedness: 'two-handed', keywords: ['AUTOMATIC 2', 'ASSAULT', 'CRITICAL', 'CUMBERSOME', 'CLEAVE 2', 'STUN', 'WHIP 12"', 'TWO-HANDED'], description: 'Melee, AUTOMATIC 2, ASSAULT, CRITICAL, CUMBERSOME, CLEAVE 2, STUN, WHIP 12", TWO-HANDED. 2 Glory. LIMIT: 1. Legion of Excess.' },
  { id: 'alluring_musk', name: 'Alluring Musk', type: 'ranged', cost: 35, limit: 1, keywords: ['IGNORE COVER', 'IGNORE LONG RANGE', 'GAS', 'THROWN'], description: '8", IGNORE COVER, Long Range, GAS, THROWN. LIMIT: 1. Pulls target into melee. Enemies cannot Retreat from wielder. Legion of Excess.' },
  // Plague Legion
  { id: 'deaths_heads', name: "Death's Heads", type: 'ranged', cost: 7, keywords: ['IGNORE ARMOUR', 'BLAST 2"', 'INFECTION MARKERS'], description: '12", IGNORE ARMOUR, BLAST 2", INFECTION MARKERS. Plague Legion.' },
  { id: 'rancid_vomit', name: 'Rancid Vomit', type: 'ranged', cost: 5, keywords: ['ASSAULT', 'BLAST 2"', 'GAS', 'THROWN'], description: '6", ASSAULT, BLAST 2", GAS, THROWN. Plague Legion.' },
  { id: 'foul_balesword', name: 'Foul Balesword', type: 'melee', cost: 15, limit: 2, handedness: 'two-handed', keywords: ['+1 INJURY DICE', 'TWO-HANDED', 'INFECTION MARKERS'], description: 'Melee, +1 INJURY DICE, TWO-HANDED, INFECTION MARKERS. LIMIT: 2. Plague Legion.' },
  { id: 'marotter', name: 'Marotter', type: 'melee', cost: 5, limit: 2, keywords: ['GAS'], description: 'Melee, GAS. LIMIT: 2. Elite Only. Plague Legion.' },
  { id: 'plaguesword', name: 'Plaguesword', type: 'melee', cost: 5, handedness: 'two-handed', keywords: ['INFECTION MARKERS', 'TWO-HANDED'], description: 'Melee, INFECTION MARKERS, TWO-HANDED. Plague Legion.' },
  // Scintillating Legion
  { id: 'herald_staff', name: 'Herald Staff', type: 'melee', cost: 10, isMainHandOnly: true, keywords: ['+1 INJURY MODIFIER', 'PSYCHIC', 'HELD'], description: 'Melee, +1 INJURY MODIFIER, PSYCHIC, HELD. Psyker Only. Scintillating Legion.', restrictedTo: ['PSYKER'] },
  { id: 'ritual_dagger', name: 'Ritual Dagger', type: 'melee', cost: 23, limit: 1, keywords: ['+2 INJURY MODIFIER', 'CRITICAL'], description: '+2 INJURY MODIFIER, CRITICAL. LIMIT: 1. Elite Only. Scintillating Legion.' },
  { id: 'soul_eater_stave', name: 'Soul-Eater Stave', type: 'melee', cost: 30, limit: 1, isMainHandOnly: true, keywords: ['+1 INJURY DICE vs DAEMON/PSYKER', 'PSYCHIC', 'HELD'], description: 'Melee, +1 INJURY DICE vs DAEMON/PSYKER, PSYCHIC, HELD. 1 Glory. LIMIT: 1. Psyker Only. Remove BLOOD MARKER when taking enemy OOA with PSYCHIC. Scintillating Legion.' },
];

// ============================================================================
// ADEPTUS ASTARTES – VARIANT BATTLEKIT WEAPONS
// These weapons are only available through specific Warband Variant battlkits.
// ============================================================================
export const adeptusAstartesVariantWeapons: Weapon[] = [
  // --- Deathwatch Battlekit ---
  {
    id: 'deathwatch_shotgun',
    name: 'Deathwatch Shotgun',
    type: 'ranged',
    range: 18,
    cost: 18,
    handedness: 'two-handed',
    keywords: ['+1 DICE', 'ASSAULT', 'SHOTGUN', 'TWO-HANDED'],
    description: '18" +1 DICE, ASSAULT, SHOTGUN, Bayonet Lug, Shield Combo, TWO-HANDED.'
  },
  {
    id: 'frag_cannon_dw',
    name: 'Frag Cannon',
    type: 'ranged',
    range: 18,
    cost: 15,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['BLAST 2"', 'SHRAPNEL', 'TWO-HANDED'],
    description: '18" BLAST 2", SHRAPNEL, TWO-HANDED. LIMIT: 2. (Deathwatch only)'
  },
  {
    id: 'guardian_spear_dw',
    name: 'Guardian Spear (Deathwatch)',
    type: 'melee',
    cost: 35,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['BLOCK', 'TWO-HANDED'],
    description: 'Combo weapon. Strike: Melee, CLEAVE 2. Shoot: 24" +1 INJURY DICE. BLOCK, TWO-HANDED, Shield Combo. LIMIT: 1. Captain Only. (Deathwatch only)'
  },
  {
    id: 'immolation_rifle',
    name: 'Immolation Rifle',
    type: 'ranged',
    range: 24,
    cost: 15,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['FIRE', 'TWO-HANDED'],
    description: '24" FIRE, TWO-HANDED. LIMIT: 2. (Deathwatch only)'
  },
  {
    id: 'infernus_heavy_bolter',
    name: 'Infernus Heavy Bolter',
    type: 'ranged',
    range: 36,
    cost: 80,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['HEAVY', 'TWO-HANDED'],
    description: 'Combo weapon. Bolter: 36" +1 INJURY DICE, VICIOUS 11, CRITICAL. Flamer: 10" AUTOMATIC 2, -1 INJURY DICE, FLAMETHROWER, IGNORE ARMOUR, FIRE. HEAVY, TWO-HANDED. LIMIT: 1. (Deathwatch only)'
  },
  {
    id: 'stalker_boltgun',
    name: 'Stalker Boltgun',
    type: 'ranged',
    range: 30,
    cost: 20,
    handedness: 'two-handed',
    keywords: ['VICIOUS 11', 'CRITICAL', 'TWO-HANDED'],
    description: '30" +1 DICE if fired from behind cover, VICIOUS 11, CRITICAL, has Scope, TWO-HANDED. (Deathwatch only)'
  },
  {
    id: 'stalker_bolt_rifle',
    name: 'Stalker Bolt Rifle',
    type: 'ranged',
    range: 36,
    cost: 25,
    handedness: 'two-handed',
    keywords: ['VICIOUS 11', 'CRITICAL', 'TWO-HANDED'],
    description: '36" +1 DICE if fired from behind cover, VICIOUS 11, CRITICAL, has Scope, TWO-HANDED. Primaris Only. (Deathwatch only)'
  },
  // --- Grey Knights Battlekit ---
  {
    id: 'psycannon',
    name: 'Psycannon',
    type: 'ranged',
    range: 24,
    cost: 15,
    handedness: 'two-handed',
    keywords: ['VICIOUS 11', 'CRITICAL', 'PSYCHIC', 'TWO-HANDED'],
    description: '24" VICIOUS 11, +1 INJURY DICE against DAEMON or PSYKER, CRITICAL, PSYCHIC, TWO-HANDED. Psyker Only. (Grey Knights only)',
    restrictedTo: ['PSYKER'],
  },
  {
    id: 'psilencer',
    name: 'Psilencer',
    type: 'ranged',
    range: 24,
    cost: 40,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['AUTOMATIC 2', 'ASSAULT', 'PSYCHIC', 'TWO-HANDED'],
    description: '24" AUTOMATIC 2, ASSAULT, PSYCHIC, TWO-HANDED. LIMIT: 2. Psyker Only. (Grey Knights only)',
    restrictedTo: ['PSYKER'],
  },
  {
    id: 'heavy_psycannon',
    name: 'Heavy Psycannon',
    type: 'ranged',
    range: 24,
    cost: 45,
    handedness: 'two-handed',
    keywords: ['VICIOUS 11', '+1 INJURY DICE', 'CRITICAL', 'HEAVY', 'PSYCHIC', 'TWO-HANDED'],
    description: '24" VICIOUS 11, +1 INJURY DICE, +1 INJURY DICE vs DAEMON/PSYKER, CRITICAL, HEAVY, PSYCHIC, TWO-HANDED. Psyker Only. (Grey Knights only)',
    restrictedTo: ['PSYKER'],
  },
  {
    id: 'heavy_force_weapon_gk',
    name: 'Heavy Force Weapon',
    type: 'melee',
    cost: 30,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+2 INJURY DICE', 'HEAVY', 'PSYCHIC', 'TWO-HANDED', 'HELD'],
    description: 'Melee +2 INJURY DICE, +1 INJURY DICE vs DAEMON/PSYKER, HEAVY, PSYCHIC, TWO-HANDED, HELD. LIMIT: 2. Psyker Only. (Grey Knights only)',
    restrictedTo: ['PSYKER'],
  },
  {
    id: 'nemesis_force_weapon_gk',
    name: 'Nemesis Force Weapon',
    type: 'melee',
    cost: 25,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['BLOCK', 'CUMBERSOME', 'PSYCHIC', 'TWO-HANDED', 'HELD'],
    description: 'Combo. Strike: Melee +1 INJURY DICE, +1 vs DAEMON/PSYKER, PSYCHIC. Bolter: 24" VICIOUS 11, CRITICAL. BLOCK, CUMBERSOME, TWO-HANDED, HELD. LIMIT: 1. (Grey Knights only)'
  },
  // --- AA Campaign Shop weapons ---
  {
    id: 'animus_malorum_aa',
    name: 'Animus Malorum',
    type: 'melee',
    cost: 8,
    costCurrency: 'glory' as const,
    limit: 1,
    handedness: 'one-handed',
    keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR'],
    description: 'Melee, +1 INJURY DICE, IGNORE ARMOUR. Injury rolls caused by this weapon cost 1 fewer BLOOD MARKER to cause a Bloodbath. If an enemy is taken Out of Action by this weapon, immediately remove all BLOOD MARKERS, INFECTION MARKERS, and STUN MARKERS from the equipped model or one of its ASTARTES allies within 12". LIMIT: 1. Elite Only. Legion of the Damned Only.',
  },
  {
    id: 'burning_blade_aa',
    name: 'Burning Blade',
    type: 'melee',
    cost: 1,
    costCurrency: 'glory' as const,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['+1 INJURY DICE', 'FIRE', 'TWO-HANDED'],
    description: 'Melee, +1 INJURY DICE, FIRE, TWO-HANDED. LIMIT: 1. (AA Campaign Shop)',
  },
  {
    id: 'paragon_blade_aa',
    name: 'Paragon Blade',
    type: 'melee',
    cost: 3,
    costCurrency: 'glory' as const,
    limit: 1,
    handedness: 'one-handed',
    keywords: ['+1 INJURY DICE', 'CRITICAL', 'ARMOUR PIERCING 2'],
    description: 'Melee, +1 INJURY DICE, CRITICAL, ARMOUR PIERCING 2. LIMIT: 1. Elite Only. (AA Campaign Shop)',
  },
  {
    id: 'psyber_berkut_aa',
    name: 'Psyber-Berkut',
    type: 'ranged',
    range: 12,
    cost: 3,
    costCurrency: 'glory' as const,
    limit: 1,
    handedness: 'one-handed',
    keywords: ['+1 DICE', 'RANGED HAND'],
    description: '12" +1 DICE to Hit. Can be used in addition to any other weapon when taking the Shoot Action (takes up a ranged hand as normal). LIMIT: 1. Mounted on Astartes Bike Only. White Scars Only. (AA Campaign Shop)',
  },
  {
    id: 'twin_siege_drill_aa',
    name: 'Twin Siege Drill',
    type: 'melee',
    cost: 0,
    handedness: 'two-handed',
    keywords: ['+1 DICE', '+1 INJURY MODIFIER', 'IGNORE ARMOUR', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee, +1 DICE, +1 INJURY MODIFIER, IGNORE ARMOUR, HEAVY. Built-in weapon of the Centurion Warsuit. Cannot be purchased separately. (AA Campaign Shop)',
  },
  {
    id: 'xenophase_sword_aa',
    name: 'Xenophase Sword',
    type: 'melee',
    cost: 1,
    costCurrency: 'glory' as const,
    limit: 1,
    handedness: 'one-handed',
    keywords: ['IGNORE ARMOUR', 'CRITICAL'],
    description: 'Melee, IGNORE ARMOUR, CRITICAL. LIMIT: 1. Elite Only. Deathwatch Only. (AA Campaign Shop)',
  },
  // --- Space Wolves Battlekit ---
  {
    id: 'great_frost_axe',
    name: 'Great Frost Axe',
    type: 'melee',
    cost: 25,
    limit: 2,
    handedness: 'two-handed',
    keywords: ['+2 INJURY DICE', 'CRITICAL', 'HEAVY', 'TWO-HANDED'],
    description: 'Melee +2 INJURY DICE, CRITICAL, HEAVY, TWO-HANDED. LIMIT: 2. (Space Wolves only)'
  },
  {
    id: 'great_wolf_claw',
    name: 'Great Wolf Claw',
    type: 'melee',
    cost: 20,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['CRITICAL', 'ARMOUR PIERCING 2', 'TWO-HANDED'],
    description: 'Melee CRITICAL, ARMOUR PIERCING 2, TWO-HANDED. LIMIT: 1. Dreadnought Only. (Space Wolves only)'
  },
  {
    id: 'stormfrag_auto_launcher',
    name: 'Stormfrag Auto-Launcher',
    type: 'ranged',
    range: 12,
    cost: 12,
    handedness: 'no-hands',
    keywords: ['ASSAULT', 'BLAST 2"', 'IGNORE COVER', 'IGNORE LONG RANGE', 'SHRAPNEL'],
    description: '12" ASSAULT, BLAST 2", IGNORE COVER, IGNORE LONG RANGE, SHRAPNEL. Takes no hands. Wulfen Only. (Space Wolves only)'
  },
  {
    id: 'wulfen_frost_claws',
    name: 'Wulfen Frost Claws',
    type: 'melee',
    cost: 15,
    handedness: 'one-handed',
    keywords: ['CRITICAL', 'ARMOUR PIERCING 1', 'IGNORE OFF-HAND'],
    description: 'Melee CRITICAL, ARMOUR PIERCING 1, IGNORE OFF-HAND. Comes as a pair of two weapons. Wulfen Only. (Space Wolves only)'
  },
];

// ============================================================================
// NECROMUNDA GANG FACTION-SPECIFIC WEAPONS
// Source: Necromunda Gang.md — House Cawdor Unique Battlekit
// ============================================================================
export const necromundaGangWeapons: Weapon[] = [
  {
    id: 'blunderbuss_polearm',
    name: 'Blunderbuss Polearm',
    type: 'melee',
    cost: 10,
    handedness: 'two-handed',
    limit: 2,
    keywords: ['BLOCK', 'CUMBERSOME', 'TWO-HANDED'],
    description: 'Combo weapon (House Cawdor). Strike: Melee, BLOCK, CUMBERSOME, TWO-HANDED. Shoot: 10", SHRAPNEL. LIMIT: 2.'
  },
  {
    id: 'rotary_flensing_saw',
    name: 'Rotary Flensing Saw',
    type: 'melee',
    cost: 30,
    limit: 1,
    handedness: 'two-handed',
    keywords: ['HEAVY', '+1 INJURY DICE', 'CRITICAL', 'RISKY', 'TWO-HANDED'],
    description: 'Slash: Melee +1 INJURY DICE, CRITICAL, HEAVY, RISKY, TWO-HANDED. Whirl: 4" ASSAULT (uses Melee skill). LIMIT: 1. (Corpsegrinder Cult only)'
  },
];

// ============================================================================
// SPECIALIZED / FACTION-SPECIFIC WEAPONS
// ============================================================================
/**
 * IDs of all faction-exclusive weapons (used by WargearPanel to show the ★ faction badge).
 * These weapons appear inside the standard shared-melee categories but are only visible
 * to factions/units that include them in their allowed wargear list.
 */
export const factionSpecificWeaponIds = new Set<string>([
  // T'au melee additions
  'ka_chak_tarr', 'kindled_blade_tau', 'krep_chak', 'onager_gauntlet_tau',
  // Adepta Sororitas
  'neural_whip_sor', 'null_rod_sor', 'power_halberd_sor',
  'spear_of_the_faithful_sor', 'virge_of_admonition_sor', 'brazier_of_holy_fire_sor',
  // Sororitas Paragon Warsuit weapons
  'twin_storm_bolter_sor', 'twin_g_launcher_sor',
  // Chaos (Heretic Astartes / Chaos Cult / Chaos Daemons)
  'demon_weapon', 'fell_dagger', 'warp_claws',
  // Heretic Astartes heavy melee
  'helbrute_hammer_ha', 'power_scourge_ha',
  // Heretic Astartes variant battlekit weapons
  'throwing_power_knives_al', 'shroud_bombs_al',
  'blight_grenades_dg', 'blight_launcher_dg', 'corrupted_staff_dg', 'cursed_plague_bell_dg',
  'great_plague_blade_dg', 'heavy_blight_launcher_dg', 'heavy_plague_spewer_dg',
  'plague_blade_dg', 'plague_spewer_dg', 'plaguespurt_gauntlet_dg',
  'blastmaster_ec', 'blissblade_ec', 'phoenix_power_spear_ec', 'rapture_lash_ec',
  'screamer_pistol_ec', 'sonic_blaster_ec', 'twin_screamer_pistols_ec',
  'shrapnel_bolter_iw', 'shrapnel_cannon_iw', 'shrapnel_pistol_iw',
  'terrorchem_vials_nl',
  'inferno_boltgun_ts', 'inferno_bolt_pistol_ts', 'inferno_combi_bolter_ts',
  'force_stave_ts', 'power_claw_ts', 'soulreaper_cannon_ts',
  'meltagun_ts', 'hand_flamer_ts',
  'axe_of_dismemberment_we', 'blood_harpoon_we', 'heavy_chain_weapon_we',
  // Chaos Cult
  'burning_censer_cc',
  // The Inquisition
  'digital_weapons_inq',
  // Adeptus Ministorum
  'brazier_of_holy_fire_min', 'dartmask_min', 'incentiviser_min',
  'mace_of_censure_min', 'null_skull_min', 'zealots_vindictor_min',
  // Officio Assassinorum
  'hookfang_oa', 'neuro_gauntlet_oa', 'nemesii_blade_oa', 'phase_sword_oa', 'sympatic_dataspike_oa',
  'exitus_rifle_oa', 'exitus_pistol_oa', 'needlespine_blaster_oa', 'neural_shredder_oa', 'toxin_ejector_oa',
  'poison_globes_oa', 'psyk_out_grenades_oa',
  // Vermintide
  'doomrocket_ver', 'warpfire_gauntlet_ver', 'warpfuel_rifle_ver', 'warpfuel_shotgun_ver', 'warpvolt_obliterator_ver',
  'warpfuel_pistol_ver', 'warpfuel_jezzail_ver', 'warpvolt_scourger_ver', 'windlauncher_ver',
  'plasma_bombs_ver', 'poison_stars_ver',
  'foetid_blade_ver', 'herding_whip_ver', 'piston_claw_ver', 'plague_censer_ver', 'things_catcher_ver',
  'warpforged_dagger_ver', 'warpstone_staff_ver', 'woe_stave_ver',
  'doomflayer_gauntlets_ver', 'grinderfists_ver', 'shock_gauntlets_ver', 'warpgrinder_ver',
  // Adeptus Mechanicus
  'arc_lance_admech', 'arc_pistol_admech', 'eradication_ray_admech', 'flechette_carbine_admech', 'galvanic_rifle_admech',
  'phosphor_blaster_admech', 'phosphor_carbine_admech', 'plasma_caliver_admech',
  'radium_carbine_admech', 'transuranic_arquebus_admech', 'volkite_blaster_admech',
  'eradication_pistol_admech', 'flechette_blaster_admech', 'gamma_pistol_admech',
  'mechanicus_pistol', 'phosphor_pistol_admech', 'phosphor_serpenta_admech', 'twin_mechanicus_pistols',
  'magnarail_lance_admech', 'phosphor_cannon_admech', 'transonic_cannon_admech',
  'arc_claw_admech', 'electroleech_stave_admech', 'electrostatic_gauntlets_admech',
  'hydraulic_claw_admech', 'omnissian_axe_admech', 'pteraxii_talons_admech',
  'servo_claw_admech', 'transonic_blade_admech', 'transonic_razor_admech',
  // Skitarii Hunter Cohort variant weapons
  'archeotech_pistol_skh', 'galvanic_caster_skh', 'mindscrambler_grenades_skh',
  'sulphur_breath_skh', 'voltlock_arquebus_skh',
  // Adeptus Custodes
  'adrastus_bolt_caliver', 'balistus_grenade_launcher', 'kinetic_destroyer',
  'salvo_launcher', 'twin_las_pulsar', 'twin_adrathic_destructor', 'vertus_hurricane_bolter',
  'executioner_greatblade', 'misericordia', 'tarsis_buckler', 'vaultswords',
  'solerite_power_gauntlet', 'solerite_power_talon',
  'achillus_dreadspear', 'adrasite_spear', 'castellan_axe', 'galatus_warblade',
  'guardian_spear', 'pyrithite_spear', 'sentinel_blade',
  // Necrons
  'gauss_blaster', 'gauss_flayer', 'gauss_reaper', 'particle_beamer',
  'synaptic_disintegrator', 'tesla_carbine',
  'gauntlet_of_fire_nec', 'particle_caster', 'transdimensional_beamer',
  'gauss_cannon', 'heat_ray_nec', 'particle_shredder', 'tesla_cannon',
  'twin_gauss_blaster', 'twin_tesla_carbine',
  'enmitic_annihilator', 'enmitic_disintegrator_pistol', 'enmitic_exterminator', 'gauss_destructor',
  'claw_nec', 'lords_blade_nec', 'mace_nec', 'sword_nec', 'voidblade', 'warscythe',
  'abyssal_staff', 'aeonstave', 'eldritch_lance', 'rod_of_covenant',
  'staff_of_light_nec', 'tremorstave', 'voltaic_staff',
  'hyperphase_sword_nec', 'hyperphase_thresher',
  // Leagues of Votann
  'etacarn_plasma_beamer', 'etacarn_plasma_gun', 'ion_blaster', 'iron_ambassador',
  'volkanite_disintegrator', 'etacarn_plasma_pistol', 'ion_pistol',
  'heavy_volkanite_disintegrator', 'ion_beamer', 'magna_rail_rifle', 'sp_conversion_beamer',
  'throwing_plasma_knives',
  'concussion_gauntlet', 'heavy_concussion_gauntlet',
  'twin_concussion_gauntlets', 'twin_heavy_concussion_gauntlets',
  'plasma_blade_lv', 'heavy_plasma_blade_lv',
  // Genestealer Cults
  'bonesword_gsc', 'lash_whip_gsc', 'toxin_injector_claw',
  // Pirate Crew
  'crackthorn_whip',
  // Drukhari
  'blaster_drukhari', 'hexrifle_drukhari', 'liquifier_gun_drukhari', 'ossefactor_drukhari',
  'shredder_drukhari', 'spirit_syphon_drukhari', 'spirit_vortex_drukhari', 'splinter_rifle_drukhari',
  'splinter_pods_drukhari', 'terrorfex_drukhari', 'twin_haywire_blaster_drukhari',
  'twin_heat_lance_drukhari', 'twin_liquifier_gun_drukhari', 'twin_splinter_cannon_drukhari',
  'blast_pistol_drukhari', 'splinter_pistol_drukhari', 'stinger_pistol_drukhari',
  'dark_lance_drukhari', 'heat_lance_drukhari', 'splinter_cannon_drukhari',
  'agoniser_drukhari', 'chain_flail_drukhari', 'demiklaives_drukhari', 'hekatarii_blade_drukhari',
  'hellglaive_drukhari', 'huskblade_drukhari', 'klaive_drukhari', 'macro_scalpel_drukhari',
  'scissorhand_drukhari', 'spirit_leech_tentacles_drukhari', 'spirit_probe_drukhari', 'talos_ichor_injector_drukhari',
  'haywire_grenades_drukhari', 'plasma_grenade_drukhari', 'xenospasm_grenades_drukhari', 'wraithbone_grenades_drukhari',
  // Aeldari
  'avenger_shuriken_catapult', 'cloudsweeper_aeldari', 'death_spinner_aeldari', 'dragon_fusion_gun',
  'dragons_breath_flamer', 'firepike_aeldari', 'hawks_talon', 'lasblaster_aeldari',
  'long_rifle_aeldari', 'shuriken_catapult', 'shuriken_rifle', 'spinneret_rifle',
  'death_weavers', 'dragon_fusion_pistol', 'shuriken_pistol', 'sunpistol_aeldari', 'twin_shuriken_pistols',
  'bright_lance_aeldari', 'distortion_scythe', 'reaper_launcher', 'scatter_laser', 'shuriken_cannon',
  'starcannon', 'tempest_launcher', 'twin_shuriken_catapult', 'wraithcannon',
  'banshee_blade', 'biting_blade', 'diresword', 'ghost_blade_aeldari', 'mirrorswords',
  'mist_staff', 'power_blade_aeldari', 'power_glaive_aeldari', 'scorpion_chainsword',
  'witchblade', 'witch_staff',
  'laser_lance', 'paired_chainsabres', 'scorpions_claw', 'singing_spear', 'star_lance',
  'haywire_grenades_aeldari', 'melta_bombs_aeldari', 'plasma_grenades_aeldari', 'triskeles',
  // Harlequins
  'hallucinogen_grenade_launcher',
  'fusion_pistol_harlequins', 'harlequins_caress', 'neuro_disruptor_harlequins',
  'bright_lance_harlequins', 'haywire_cannon_harlequins', 'prismatic_cannon',
  'shrieker_cannon', 'shuriken_cannon_harlequins',
  'harlequins_embrace', 'harlequins_kiss', 'jesters_blade', 'power_blade_harlequins', 'power_glaive_harlequins',
  'hallucinogen_grenades', 'haywire_grenades_harlequins', 'prismatic_grenades', 'star_bolas', 'tanglefoot_grenades',
  // Tyranids
  'chitinous_claw', 'piercing_claw', 'rending_claw', 'scything_talon', 'toxic_scythe',
  'bone_cleaver', 'bonesword_tyranid', 'crushing_claw', 'lash_whip_tyranid', 'slayer_sabre',
  'devourer', 'fleshborer', 'shardlauncher', 'spike_rifle', 'spinefists', 'strangleweb',
  'barbed_strangler', 'barblauncher', 'deathspitter', 'heavy_devourer', 'heavy_venom_cannon',
  'impaler_cannon', 'miasma_cannon', 'shockcannon', 'strangethorn_cannon', 'toxinjector_harpoon', 'venom_cannon',
  'blinding_venom', 'electroshock_grubs', 'desiccator_larvae', 'shreddershard_beetles', 'toxic_glands', 'venom_blast',
  'bone_mace', 'pincer_tail', 'tail_blade',
  // T'au Empire
  'dart_bow_tau', 'dvorgite_skinner', 'ion_rifle_tau', 'kroot_carbine', 'kroot_rifle',
  'kroot_shaper_rifle', 'kroot_scattergun', 'pulse_blaster', 'pulse_carbine', 'pulse_rifle',
  'rail_rifle_tau', 'semi_automatic_gl', 'tanglebomb_launcher',
  'kroot_pistol', 'pulse_pistol', 'twin_pulse_pistols',
  'londaxi_tribalest', 'repeater_cannon_tau', 'tanglecannon',
  'battlesuit_blade', 'burst_cannon_tau', 'cyclic_ion_blaster', 'fragmentation_projector',
  'fusion_blaster_tau', 'he_fusion_blaster', 'hi_plasma_rifle', 'ho_burst_cannon',
  'missile_pod_tau', 'plasma_rifle_tau', 'smart_missile_system', 'tau_flamer', 'twin_burst_cannon',
  'heavy_burst_cannon', 'heavy_rail_rifle', 'high_yield_missile_pods', 'seeker_missile',
  'twin_plasma_rifle_tau', 'twin_smart_missile_system',
  'bladestave_tau', 'equalizer_tau', 'honor_blade_tau', 'kroot_bayonet', 'short_blade_tau',
  'blast_javelin_tau', 'emp_grenades_tau', 'hunting_javelins', 'photon_grenades', 'tri_blades_tau',
  // Slanni
  'beam_rifle', 'charge_rifle', 'charge_shotgun', 'gravity_rifle', 'beam_sniper_rifle',
  'net_launcher', 'heat_rifle', 'scatter_rifle', 'slanni_flamer',
  'charge_pistol', 'gravity_projector', 'beam_pistol', 'heat_pistol', 'net_pistol', 'neuro_disruptor_slanni',
  'distortion_cannon_slanni', 'gravity_cannon', 'heavy_beamer', 'scatter_cannon_slanni',
  'astromancers_staff', 'glaive_slanni', 'mage_staff',
  'celestite_warmace', 'gravity_fist',
  'beam_spear', 'searing_mace', 'scatter_glaive', 'gravity_hammer',
  'gravity_bombs', 'net_bombs', 'hypertoxin_grenades', 'plasma_grenades_slanni',
  // Orks
  'burna', 'shoota', 'speshul_shoota', 'thump_gun',
  'grot_blasta', 'kustom_mega_slugga', 'rokkit_pistol', 'shokka_pistol', 'slugga', 'twin_slugga',
  'big_shoota', 'deffgun', 'kombi_weapon_orks', 'kustom_mega_blasta', 'kustom_shoota',
  'rokkit_launcha', 'shokk_attack_gun', 'skorcha', 'traktor_blasta', 'twin_dakkagun', 'zzap_gun',
  'breacha_ram', 'chain_choppa', 'choppa', 'grabba_stikk', 'grot_prod', 'lil_stikka',
  'power_snappa', 'twin_choppas', 'weirdboy_staff',
  'big_choppa', 'drilla_orks', 'killsaw', 'knucklebusta', 'power_klaw',
  'smash_hammer_orks', 'power_stabba', 'tankhammer', 'twin_killsaw', 'uge_choppa',
  'firey_stikkbombs', 'krak_stikkbombs', 'stikkbomb', 'throwing_knives_orks',
  // Necromunda Gang (House Cawdor / Corpsegrinder Cult)
  'blunderbuss_polearm', 'rotary_flensing_saw',
  // Adeptus Astartes Variant Battlekit weapons
  // Deathwatch
  'deathwatch_shotgun', 'frag_cannon_dw', 'guardian_spear_dw', 'immolation_rifle',
  'infernus_heavy_bolter', 'stalker_boltgun', 'stalker_bolt_rifle',
  // Grey Knights
  'psycannon', 'psilencer', 'heavy_psycannon', 'heavy_force_weapon_gk', 'nemesis_force_weapon_gk',
  // Space Wolves
  'great_frost_axe', 'great_wolf_claw', 'stormfrag_auto_launcher', 'wulfen_frost_claws',
  // AA Campaign Shop weapons
  'animus_malorum_aa', 'burning_blade_aa', 'paragon_blade_aa',
  'psyber_berkut_aa', 'twin_siege_drill_aa', 'xenophase_sword_aa',
  // Chaos Daemons Legions
  'scorched_skull_cannon', 'blade_of_blood', 'hellblade_daemon',
  'lashes_of_torment', 'whips_of_agony', 'alluring_musk',
  'deaths_heads', 'rancid_vomit', 'foul_balesword', 'marotter', 'plaguesword',
  'herald_staff', 'ritual_dagger', 'soul_eater_stave',
]);

/** @deprecated All faction weapons are now included in the shared category arrays. */
export const specializedWeapons: Weapon[] = [];

// ============================================================================
// RANGED WEAPON COLLECTIONS
// ============================================================================
export const allRangedWeapons: Weapon[] = [
  ...sharedBasicRangedWeapons,
  ...sharedPistols,
  ...sharedSpecialRangedWeapons,
  ...sharedHeavyRangedWeapons,
];

export const allMeleeWeapons: Weapon[] = [
  ...sharedBasicMeleeWeapons,
  ...sharedSpecialMeleeWeapons,
  ...sharedHeavyMeleeWeapons,
];

// ---------------------------------------------------------------------------
// Vehicle-mounted weapons (NO-HANDS — do not consume hand slots)
// Automatically equipped by vehicle mounts such as Astartes Bike.
// ---------------------------------------------------------------------------
export const vehicleMountedWeapons: Weapon[] = [
  {
    id: 'twin_boltgun',
    name: 'Twin Boltgun',
    type: 'ranged',
    range: 24,
    cost: 0,
    handedness: 'no-hands',
    keywords: ['+1 DICE', 'VICIOUS 11', 'CRITICAL', 'NO-HANDS'],
    description: '24" +1 DICE, VICIOUS 11, CRITICAL. Vehicle-mounted (uses no hands). Can be used alongside any other ranged weapon when the rider takes the Shoot Action.',
  },
];

export const allWeapons: Weapon[] = [
  ...allRangedWeapons,
  ...sharedThrownWeapons,
  ...allMeleeWeapons,
  // Necron faction weapons
  ...necronsRangedWeapons,
  ...necronsMeleeWeapons,
  // Leagues of Votann faction weapons
  ...leaguesOfVotannRangedWeapons,
  ...leaguesOfVotannMeleeWeapons,
  // Chaos Cult faction weapons
  ...chaosCultWeapons,
  // The Inquisition faction weapons
  ...inquisitionWeapons,
  // Adeptus Ministorum faction weapons
  ...adeptusMiniStorumWeapons,
  // Officio Assassinorum faction weapons
  ...officioAssassinorumWeapons,
  // Vermintide faction weapons
  ...vermintideWeapons,
  // Adeptus Mechanicus faction weapons
  ...adeptusMechanicusWeapons,
  // Adeptus Custodes faction weapons
  ...adeptusCustodesWeapons,
  // Drukhari faction weapons
  ...drukahriWeapons,
  // Aeldari faction weapons
  ...aeldariWeapons,
  // Harlequins faction weapons
  ...harlequinsWeapons,
  // Tyranids faction weapons
  ...tyranidsWeapons,
  // T'au Empire faction weapons
  ...tauEmpireWeapons,
  // Slanni faction weapons
  ...slanniWeapons,
  // Orks faction weapons
  ...orksWeapons,
  // Chaos Daemons legion weapons
  ...chaosDaemonsWeapons,
  // Necromunda Gang faction weapons
  ...necromundaGangWeapons,
  // Adeptus Astartes variant battlekit weapons (Deathwatch, Grey Knights, Space Wolves)
  ...adeptusAstartesVariantWeapons,
  // Vehicle-mounted weapons (NO-HANDS, e.g. Twin Boltgun for Astartes Bike)
  ...vehicleMountedWeapons,
  // specializedWeapons removed – all faction weapons are now in the arrays above
];

// Keep legacy alias for backwards compatibility
export const allSharedWeapons = allWeapons;

export function getWeaponById(id: string): Weapon | undefined {
  return allWeapons.find(w => w.id === id);
}
