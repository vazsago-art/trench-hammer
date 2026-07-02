import { UnitOption } from '../../types/index.js';

// ==========================================================================
// THE INQUISITION
// ==========================================================================
export const inq_inquisitor: UnitOption = {
  id: 'inq_inquisitor', name: 'Inquisitor', baseCost: 70, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'INQUISITION', 'LEADER', 'NEGATE FEAR', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'the_inquisition', unitType: 'elite',
  description: 'Mandatory Inquisitor. (55cr + 15cr rosarius)',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'inq_duelist', name: 'Duelist', cost: 10, maxCount: 1,
      description: 'When charged by an enemy, may immediately make one free melee attack against them before the combat begins.' },
    { id: 'inq_frightening_reputation', name: 'Frightening Reputation', cost: 5, maxCount: 1,
      grantedKeywords: ['FEAR'],
      description: 'Gains the FEAR Keyword.' },
    { id: 'inq_great_strength', name: 'Great Strength', cost: 10, maxCount: 1,
      grantedKeywords: ['STRONG'],
      description: 'Gains the STRONG Keyword.' },
    { id: 'inq_pistoleer', name: 'Pistoleer', cost: 10, maxCount: 1,
      description: 'May shoot twice with PISTOL weapons in one Shoot Action; both pistols gain IGNORE OFF-HAND WEAPON.' },
    { id: 'inq_psyker', name: 'Psyker', cost: 5, maxCount: 1,
      grantedKeywords: ['PSYKER 1'],
      description: 'Gains the PSYKER 1 Keyword, access to one Shared Psychic Discipline, and may know up to 4 psychic powers. Requires a PSYCHIC weapon to be equipped.' },
  ],
};
export const inq_interrogator: UnitOption = {
  id: 'inq_interrogator', name: 'Interrogator', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'INQUISITION'],
  baseSize: '25-32mm',
  faction: 'the_inquisition', unitType: 'elite',
  description: 'Trusted acolyte and second-in-command.',
  defaultWargear: [], availableWargear: [],
};
export const inq_mystic: UnitOption = {
  id: 'inq_mystic', name: 'Mystic', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'INQUISITION', 'PSYKER 1'],
  baseSize: '25-28mm',
  faction: 'the_inquisition', unitType: 'elite',
  description: 'Sanctioned psyker in service to the Inquisition. (+ weapon + powers)',
  defaultWargear: [], availableWargear: [],
};
export const inq_acolyte: UnitOption = {
  id: 'inq_acolyte', name: 'Acolyte', baseCost: 45, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['INQUISITION'],
  baseSize: '25mm',
  faction: 'the_inquisition', unitType: 'troop',
  description: 'Trusted operative of the Inquisition.',
  defaultWargear: [], availableWargear: [],
};
export const inq_jokaero: UnitOption = {
  id: 'inq_jokaero', name: 'Jokaero Weaponsmith', baseCost: 55, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['INQUISITION', 'STRONG'],
  baseSize: '25-28mm',
  faction: 'the_inquisition', unitType: 'troop',
  description: 'Alien weapons-smith of mysterious origin.',
  defaultWargear: [], availableWargear: [],
};
export const inq_daemonhost: UnitOption = {
  id: 'inq_daemonhost', name: 'Daemonhost', baseCost: 135, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DAEMON', 'FLYING', 'INQUISITION', 'NO PROMOTION', 'PSYKER', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'the_inquisition', unitType: 'troop',
  description: 'Ordo Malleus only. Bound daemon in a mortal shell.',
  defaultWargear: [
    { id: 'inq_energy_torrent', name: 'Energy Torrent', type: 'ranged', range: 24, cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE COVER', 'BLAST 2"', 'PSYCHIC', 'RISKY'],
      description: 'Daemonic warp energy released in a torrent. RISKY.' },
    { id: 'inq_unholy_gaze', name: 'Unholy Gaze', type: 'ranged', range: 18, cost: 0, handedness: 'no-hands',
      keywords: ['ARMOUR PIERCING 1', 'PSYCHIC', 'RISKY', 'STUN'],
      description: 'The gaze of the bound daemon paralyses and wounds. RISKY.' },
    { id: 'inq_warp_grasp', name: 'Warp Grasp', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE ARMOUR', 'PSYCHIC', 'RISKY'],
      description: 'A warp-infused grip tears the soul. RISKY.' },
  ], availableWargear: [],
  cannotEquip: true,
};
