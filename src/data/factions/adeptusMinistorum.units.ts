import { UnitOption } from '../../types/index.js';

// ==========================================================================
// ADEPTUS MINISTORUM
// ==========================================================================
export const amin_confessor: UnitOption = {
  id: 'amin_confessor', name: 'Confessor', baseCost: 85, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY', 'ELITE', 'LEADER', 'NEGATE FEAR', 'ORATOR', 'TOUGH'],
  baseSize: '25-32mm',
  faction: 'adeptus_ministorum', unitType: 'elite',
  description: 'Mandatory fire-brand leader. (70cr + 15cr rosarius)',
  defaultWargear: [], availableWargear: [],
};
export const amin_missionary: UnitOption = {
  id: 'amin_missionary', name: 'Missionary', baseCost: 50, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY', 'ELITE', 'NEGATE FEAR', 'ORATOR'],
  baseSize: '25-32mm',
  faction: 'adeptus_ministorum', unitType: 'elite',
  description: 'Travelling preacher of the Imperial Creed.',
  defaultWargear: [], availableWargear: [],
};
export const amin_drill_abbot: UnitOption = {
  id: 'amin_drill_abbot', name: 'Drill Abbot', baseCost: 50, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY', 'ELITE', 'NEGATE FEAR', 'STRONG'],
  baseSize: '25-28mm',
  faction: 'adeptus_ministorum', unitType: 'elite',
  description: 'Warrior-monk trainer, melee specialist.',
  defaultWargear: [], availableWargear: [],
};
export const amin_preacher: UnitOption = {
  id: 'amin_preacher', name: 'Preacher', baseCost: 30, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY'],
  baseSize: '25mm',
  faction: 'adeptus_ministorum', unitType: 'troop',
  description: 'Faithful foot soldier of the Ministorum.',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'amin_conflagrator', name: 'Conflagrator', cost: 10, maxCount: 2,
      description: 'Ignores the HEAVY Keyword of one ranged weapon they carry. Up to 2 per warband.' },
  ],
};
export const amin_crusader: UnitOption = {
  id: 'amin_crusader', name: 'Crusader', baseCost: 45, minCount: 0, maxCount: 4,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY'],
  baseSize: '25mm',
  faction: 'adeptus_ministorum', unitType: 'troop',
  description: 'Armoured holy warrior sworn to protect the faithful.',
  defaultWargear: [], availableWargear: [],
};
export const amin_death_cult_assassin: UnitOption = {
  id: 'amin_death_cult_assassin', name: 'Death Cult Assassin', baseCost: 65, minCount: 0, maxCount: 3,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['DEATH CULT', 'ECCLESIARCHY', 'INFILTRATOR', 'STEALTH'],
  baseSize: '25mm',
  faction: 'adeptus_ministorum', unitType: 'troop',
  description: 'Deadly murderer consecrated to the Emperor.',
  defaultWargear: [], availableWargear: [],
};
export const amin_battle_cherub: UnitOption = {
  id: 'amin_battle_cherub', name: 'Battle Cherub', baseCost: 25, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'ECCLESIARCHY', 'FLYING', 'NO PROMOTION'],
  baseSize: '25mm',
  faction: 'adeptus_ministorum', unitType: 'troop',
  description: 'Servo-cherub support unit.',
  defaultWargear: [], availableWargear: [],
};
export const amin_miraculist: UnitOption = {
  id: 'amin_miraculist', name: 'Miraculist', baseCost: 125, minCount: 0, maxCount: 1, maxCountLarge: 2,
  stats: { movement: 6, rangedSkill: 3, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ECCLESIARCHY', 'NEGATE FIRE', 'NO PROMOTION', 'ORATOR'],
  baseSize: '25-28mm',
  faction: 'adeptus_ministorum', unitType: 'troop',
  description: 'Living saint suffused with holy power. Has NEGATE FIRE and Levitate ability. Can take 2 in warbands of 1200cr+.',
  defaultWargear: [
    { id: 'amin_burning_hands', name: 'Burning Hands', type: 'melee', cost: 0, handedness: 'no-hands',
      keywords: ['+1 INJURY DICE', 'IGNORE ARMOUR', 'FIRE'],
      description: 'Auto-hits. Once per battle. No hand slots required.' },
    { id: 'amin_holy_light', name: 'Holy Light', type: 'ranged', range: 12, cost: 0, handedness: 'no-hands',
      keywords: ['IGNORE COVER', 'IGNORE ARMOUR', 'CRITICAL', 'FIRE'],
      description: 'Once per battle. No hand slots required.' },
    { id: 'amin_wreath_in_fire', name: 'Wreath in Fire', type: 'ranged', range: 0, cost: 0, handedness: 'no-hands',
      keywords: ['BLAST 6"', 'FLAMETHROWER', 'IGNORE ARMOUR', 'FIRE'],
      description: 'Once per battle. No hand slots required.' },
  ], availableWargear: [],
  cannotEquip: true,
};
