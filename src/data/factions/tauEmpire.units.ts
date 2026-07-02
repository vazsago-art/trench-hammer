import { UnitOption } from '../../types/index.js';

// ==========================================================================
// T'AU EMPIRE
// ==========================================================================
export const tau_ethereal: UnitOption = {
  id: 'tau_ethereal', name: 'Ethereal', baseCost: 65, minCount: 1, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'LEADER', 'MARKERLIGHT', 'T\'AU'],
  baseSize: '32-40mm',
  faction: 't_au_empire', unitType: 'elite',
  description: 'Mandatory Ethereal caste leader. Battlekit: Any T\'au weapons, armour, or equipment.',
  defaultWargear: [], availableWargear: [],
  abilities: [
    {
      id: 'tau_ethereal_coordinated_leadership',
      name: 'Coordinated Leadership',
      description: 'After you deploy your models, choose up to two pairs of other T\'AU models in your Warband. Those pairs form FIRETEAMS so long as the Ethereal is on the battlefield.',
      type: 'passive',
    },
    {
      id: 'tau_ethereal_failure_is_not_an_option',
      name: 'Failure Is Not an Option',
      description: 'While the Ethereal is on the battlefield and not Down, you have an additional +1 DICE to Morale Tests.',
      type: 'passive',
    },
  ],
  unitSubTypes: [
    {
      id: 'tau_ethereal_power_of_tides',
      name: 'Power of Tides',
      creditCostModifier: 0,
      description: 'Invocation. As an Action with a Risky Success Roll, this Ethereal can choose itself or one T\'AU ally within 6" that it can see. That model has +1 INJURY DICE with the next attack it makes.',
    },
    {
      id: 'tau_ethereal_sense_of_stone',
      name: 'Sense of Stone',
      creditCostModifier: 0,
      description: 'Invocation. As an Action with a Risky Success Roll, this Ethereal can choose itself or one T\'AU ally within 6" that it can see. That model has an additional -1 INJURY MODIFIER, stacking up to -3, and the first -1 of its armour has IMPERVIOUS, until the end of the current Turn.',
    },
    {
      id: 'tau_ethereal_storm_of_fire',
      name: 'Storm of Fire',
      creditCostModifier: 0,
      description: 'Invocation. As an Action with a Risky Success Roll, this Ethereal can choose itself or one T\'AU ally within 6" that it can see. That model has +1 DICE to Hit and ignores Long Range and Cover with its next ranged attack.',
    },
    {
      id: 'tau_ethereal_unifying_mantra',
      name: 'Unifying Mantra',
      creditCostModifier: 0,
      description: 'Invocation. This Ethereal and its T\'AU allies within 12" of it have NEGATE FEAR.',
    },
    {
      id: 'tau_ethereal_wisdom_of_the_guides',
      name: 'Wisdom of the Guides',
      creditCostModifier: 0,
      description: 'Invocation. As an Action with no Success Roll, this Ethereal can choose one enemy that it can see that has not yet activated this Turn. The Ethereal\'s Activation immediately ends and the chosen model\'s Activation begins.',
    },
    {
      id: 'tau_ethereal_zephyrs_grace',
      name: 'Zephyr\'s Grace',
      creditCostModifier: 0,
      description: 'Invocation. As an Action with a Risky Success Roll, this Ethereal can choose itself or one T\'AU ally within 6" that it can see. That model has +1 DICE the next time it makes a Dash Success Roll, and it has +3" movement during that Dash.',
    },
  ],
};
export const tau_commander: UnitOption = {
  id: 'tau_commander', name: 'Commander', baseCost: 115, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 2, meleeSkill: 1, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FLYING', 'LARGE', 'MARKERLIGHT', 'STRONG', 'T\'AU', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 't_au_empire', unitType: 'elite',
  description: 'T\'au Commander battlesuit. Battlekit: Battlesuit Plating (built-in), any other Battlesuit Only weapons, armour, or equipment; up to 3 hands of ranged weapons. Treated as equipped with a Close Combat Weapon if 2 free hands in melee. Ability: Battlesuit Armaments (while equipped with 2+ ranged weapons, may Shoot with 2 of them in one Activation; either/both can be replaced with a Markerlight attempt using that weapon\'s range).',
  defaultWargear: [], availableWargear: [],
};
export const tau_cadre_fireblade: UnitOption = {
  id: 'tau_cadre_fireblade', name: 'Cadre Fireblade', baseCost: 55, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'MARKERLIGHT', 'T\'AU'],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'elite',
  description: 'Elite Fire Warrior leader. Battlekit: Any T\'au weapons, armour, or equipment. Ability: Crack Shot (ranged attacks of this model and each friendly T\'AU model within 6" ignore Armour on a Critical Hit).',
  defaultWargear: [], availableWargear: [],
};
export const tau_kroot_shaper: UnitOption = {
  id: 'tau_kroot_shaper', name: 'Kroot Shaper', baseCost: 55, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['KROOT', 'STEALTH', 'T\'AU'],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'elite',
  description: 'Kroot pack leader. Battlekit: Any melee weapons, Kroot Only ranged weapons, or Kroot Only equipment.',
  defaultWargear: [], availableWargear: [],
  abilities: [
    {
      id: 'tau_kroot_shaper_long_stride',
      name: 'Long Stride',
      description: 'The Kroot Shaper has +1 DICE to all Dash Success Rolls.',
      type: 'passive',
    },
  ],
  unitSubTypes: [
    {
      id: 'tau_kroot_shaper_flesh',
      name: 'Flesh Shaper',
      creditCostModifier: 0,
      description: 'Path. Whenever this model or another friendly KROOT model within 12" of it takes an enemy Out of Action, remove 1 BLOOD MARKER from that KROOT model and, if this is the first time this ability has targeted that model this battle, Injury rolls made against it have -1 DICE for the remainder of the battle.',
    },
    {
      id: 'tau_kroot_shaper_trail',
      name: 'Trail Shaper',
      creditCostModifier: 0,
      description: 'Path. Before deployment each battle, this model and up to two non-ELITE KROOT models in your Warband gain the DEEP STRIKE Keyword for the duration of the battle. When using DEEP STRIKE this way, they must be deployed all at once, each within 3" of the others.',
    },
    {
      id: 'tau_kroot_shaper_war',
      name: 'War Shaper',
      creditCostModifier: 0,
      description: 'Path. As an Action with a Success Roll, this model can allow one friendly KROOT model within 12" that is Down to stand up. In addition, when this model or another friendly KROOT model within 12" of it Charges, roll 2D6 instead of 1D6 and add the highest result to the charge move.',
    },
  ],
};
export const tau_fire_warrior: UnitOption = {
  id: 'tau_fire_warrior', name: 'Fire Warrior', baseCost: 35, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: -1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MARKERLIGHT', 'T\'AU'],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'Standard T\'au ranged infantry. Battlekit: Any T\'au weapons, armour, or equipment. Upgrade: Pathfinder (+5cr, grants INFILTRATOR; up to half of your Fire Warriors, rounded down, can be Pathfinders).',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'tau_pathfinder', name: 'Pathfinder', cost: 5, maxCount: 99,
      grantedKeywords: ['INFILTRATOR'],
      description: 'Gains the INFILTRATOR Keyword. Up to half of your Fire Warriors (rounded down) can be Pathfinders.' },
  ],
};
export const tau_drone: UnitOption = {
  id: 'tau_drone', name: 'T\'au Drone', baseCost: 25, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: -1, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ARTIFICIAL', 'FLYING', 'NO PROMOTION', 'T\'AU'],
  baseSize: '32mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'Support drone (+type cost). Max drones = non-KROOT T\'AU models in warband. Battlekit: Only from its Type (no additional wargear). Ability: Drone Control (at battle start, forms a FIRETEAM with one chosen non-ARTIFICIAL, non-KROOT T\'AU model in your warband).',
  defaultWargear: [], availableWargear: [],
  unitSubTypes: [
    { id: 'grav_inhibitor', name: 'Grav-Inhibitor Drone', creditCostModifier: 5, limit: 1,
      description: 'Equipped with a Grav-Inhibitor Field. Enemies that Charge the Grav-Inhibitor Drone or one of its allies within 3" of it cannot add the normal D6 (or D3 or other replacement) to their Charge distance.' },
    { id: 'guardian', name: 'Guardian Drone', creditCostModifier: 5, limit: 2,
      description: 'Equipped with a Guardian Shield Generator. The Guardian Drone and any ally within 3" of it treat Down Injury results as Minor Hits instead. Does not apply to Down results that already replaced another result (e.g. TOUGH).' },
    { id: 'gun', name: 'Gun Drone', creditCostModifier: 20,
      description: 'Equipped with Twin Pulse Carbines. 20", +1 DICE, ASSAULT.' },
    { id: 'marker', name: 'Marker Drone', creditCostModifier: 5, limit: 2,
      grantedKeywords: ['MARKERLIGHT'],
      description: 'Has the MARKERLIGHT Keyword, and is treated as wielding a ranged weapon with a range of 24" for the purpose of placing Markerlight tokens.' },
    { id: 'missile', name: 'Missile Drone', creditCostModifier: 15, limit: 2,
      description: 'Equipped with a Missile Pod.' },
    { id: 'pulse_accelerator', name: 'Pulse Accelerator Drone', creditCostModifier: 0, limit: 1,
      description: 'Equipped with a Pulse Accelerator. The Ã¢â‚¬Å“PulseÃ¢â‚¬Â weapons of friendly models within 3" of this drone have +6" to their range.' },
    { id: 'recon', name: 'Recon Drone', creditCostModifier: 60, limit: 1,
      grantedKeywords: ['INFILTRATOR', 'LARGE'],
      statModifiers: { armourSave: -1 },
      description: 'Equipped with a Burst Cannon and heavy armour plating (-2 armour instead of -1). Has +1 DICE to Hit with all attacks (+1 to Ranged, +0 to Melee), the INFILTRATOR Keyword, and the LARGE Keyword.' },
    { id: 'shield', name: 'Shield Drone', creditCostModifier: 5,
      description: 'Equipped with an Energy Shield and has the Interpose ability. If any ally within 1" is hit by a ranged or melee weapon (excluding BLAST), you can redirect the hit to this drone instead.' },
    { id: 'sniper', name: 'Sniper Drone', creditCostModifier: 25, limit: 3,
      description: 'Equipped with a Longshot Pulse Rifle. 48", +1 DICE.' },
    { id: 'tactical_support_turret', name: 'Tactical Support Turret', creditCostModifier: 15,
      grantedKeywords: ['LARGE'],
      description: 'Stands on a 40mm base and has the LARGE Keyword. Equipped with a Smart Missile System. Cannot move or be forced to move (movement speed counts as 0").' },
  ],
};
export const tau_kroot_carnivore: UnitOption = {
  id: 'tau_kroot_carnivore', name: 'Kroot Carnivore', baseCost: 40, minCount: 0, maxCount: 4,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['KROOT', 'STEALTH', 'T\'AU'],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'Kroot hunter warband member. Battlekit: Any melee weapons, Kroot Only weapons, or Kroot Only equipment; up to half (rounded down) can also carry 1 additional T\'au weapon. Ability: Long Stride (+1 DICE to all Dash Success Rolls). Upgrades: Farstalker (+10cr, INFILTRATOR+SKIRMISHER; up to half rounded up), Kroot Gunner (+5cr; 1 model ignores HEAVY on 1 ranged weapon).',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'tau_farstalker', name: 'Farstalker', cost: 10, maxCount: 99,
      grantedKeywords: ['INFILTRATOR', 'SKIRMISHER'],
      description: 'Gains INFILTRATOR and SKIRMISHER keywords. Up to half of your Kroot Carnivores (rounded up) can be Farstalkers.' },
    { id: 'tau_kroot_gunner', name: 'Kroot Gunner', cost: 5, maxCount: 1,
      description: 'Ignores the HEAVY Keyword of one ranged weapon it carries.' },
  ],
};
export const tau_stealth_battlesuit: UnitOption = {
  id: 'tau_stealth_battlesuit', name: 'Stealth Battlesuit', baseCost: 110, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['FLYING', 'INFILTRATOR', 'MARKERLIGHT', 'STEALTH', 'T\'AU', 'VEHICLE'],
  baseSize: '32mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'XV25 Stealth battlesuit. Battlekit: Battlesuit Plating (built-in), any 1 Battlesuit Only weapon, any Battlesuit Only equipment. Treated as equipped with a Close Combat Weapon if 2 free hands in melee. Abilities: Cloaking Field (Risky Action +1 DICE: hide behind any line-of-sight blocking scenery the model touches Ã¢â‚¬â€ blocks ranged targeting/Charges until model moves, shoots, or enemy comes within 1.5"), Homing Beacon (allies with DEEP STRIKE or INFILTRATOR can deploy fully within 3" of this model even if visible or near enemies; DEEP STRIKE not adjusted by D3").',
  defaultWargear: [], availableWargear: [],
};
export const tau_crisis_battlesuit: UnitOption = {
  id: 'tau_crisis_battlesuit', name: 'Crisis Battlesuit', baseCost: 135, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 1, meleeSkill: 0, armourSave: -2, toughness: 'NORMAL' },
  keywords: ['FLYING', 'LARGE', 'MARKERLIGHT', 'STRONG', 'T\'AU', 'TOUGH', 'VEHICLE'],
  baseSize: '50mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'XV8 Crisis battlesuit. Battlekit: Battlesuit Plating (built-in), any other Battlesuit Only weapons, armour, or equipment. Treated as equipped with a Close Combat Weapon if 2 free hands in melee. Ability: Battlesuit Armaments (while equipped with 2 ranged weapons, may Shoot with each during its Activation; either/both can be replaced with a Markerlight attempt using that weapon\'s range).',
  defaultWargear: [], availableWargear: [],
};
export const tau_broadside_battlesuit: UnitOption = {
  id: 'tau_broadside_battlesuit', name: 'Broadside Battlesuit', baseCost: 125, minCount: 0, maxCount: 1,
  stats: { movement: 5, rangedSkill: 1, meleeSkill: 0, armourSave: -3, toughness: 'NORMAL' },
  keywords: ['LARGE', 'NO PROMOTION', 'STRONG', 'T\'AU', 'TOUGH', 'VEHICLE'],
  baseSize: '60mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'Retaliation Cadre variant: heavy support battlesuit. Battlekit: Heavy Battlesuit Plating (built-in), any other Battlesuit Only weapons, armour, or equipment. Treated as equipped with a Two-Handed Hammer if 2 free hands in melee. Ability: Battlesuit Armaments (while equipped with 2 ranged weapons, may Shoot with each in its Activation).',
  defaultWargear: [], availableWargear: [],
};
export const tau_kill_broker: UnitOption = {
  id: 'tau_kill_broker', name: 'Kill Broker', baseCost: 75, minCount: 0, maxCount: 1,
  stats: { movement: 6, rangedSkill: 2, meleeSkill: 2, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['ELITE', 'KROOT', 'STEALTH', 'T\'AU'],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'elite',
  description: 'Kroot Kinband variant: mercenary leader. Battlekit: Any melee weapons, Kroot Only ranged weapons, or Kroot Only equipment. Abilities: Call the Kill (Action/no roll: mark one visible enemy Ã¢â‚¬â€ all KROOT attacks vs that mark gain ARMOUR PIERCING 1 this Turn, stacking with other sources), Long Stride (+1 DICE to all Dash Success Rolls), Victory Shriek (when mark is taken OoA: immediately use Call the Kill again, then up to 1 KROOT ally within 6" gains +1 Injury Dice with all attacks until end of its next Activation).',
  defaultWargear: [], availableWargear: [],
};
export const tau_krootox_rider: UnitOption = {
  id: 'tau_krootox_rider', name: 'Krootox Rider', baseCost: 115, minCount: 0, maxCount: 2,
  stats: { movement: 6, rangedSkill: 1, meleeSkill: 2, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['LARGE', 'KROOT', 'LIMITED POTENTIAL', 'MOUNTED', 'T\'AU', 'TOUGH'],
  baseSize: '50mm',
  faction: 't_au_empire', unitType: 'troop',
  description: 'Kroot Kinband variant: Kroot mounted on Krootox (0-3 in warband worth 1200cr+). Battlekit: Thick Hide and 2 Krootox Fists (Melee, +1 Injury Modifier, no hands) built-in; can equip Kroot Only weapons or equipment using 1 hand (two-handed items allowed via Shield Combo). Ability: Long Stride (+1 DICE to all Dash Success Rolls). Upgrades: Rampager (+10cr, Linebreaker Ã¢â‚¬â€ enemy suffers 1 Blood Marker on successful Charge), Thunderer (+10cr, Weapon Mount Ã¢â‚¬â€ can equip 1 Two-Handed ranged weapon ignoring HEAVY).',
  defaultWargear: [], availableWargear: [],
  upgrades: [
    { id: 'tau_rampager', name: 'Rampager', cost: 10, maxCount: 1,
      description: 'Gains Linebreaker: when it successfully charges an enemy, that enemy suffers a BLOOD MARKER.' },
    { id: 'tau_thunderer', name: 'Thunderer', cost: 10, maxCount: 1,
      description: 'Gains Weapon Mount: can be equipped with a single TWO-HANDED ranged weapon, ignoring its HEAVY Keyword.' },
  ],
};
export const tau_auxiliary: UnitOption = {
  id: 'tau_auxiliary', name: "T'au Auxiliary", baseCost: 30, minCount: 0, maxCount: 99,
  stats: { movement: 6, rangedSkill: 0, meleeSkill: 0, armourSave: 0, toughness: 'NORMAL' },
  keywords: ['MARKERLIGHT', "T'AU"],
  baseSize: '25-28mm',
  faction: 't_au_empire', unitType: 'troop',
  description: "Auxiliary Cadre variant: alien troops of the Greater Good. Battlekit: Any weapons, armour, or equipment from the T'au Empire Battlekit list. Choose a Species when recruited.",
  defaultWargear: [], availableWargear: [],
  unitSubTypes: [
    { id: 'tau_aux_demiurg', name: 'Demiurg', creditCostModifier: -5,
      description: 'The Demiurg has -1" to its movement speed. Heavily Armoured: The first -1 of the Demiurg\'s Armour, if any, has IMPERVIOUS.' },
    { id: 'tau_aux_guevesa', name: "Gue'vesa", creditCostModifier: 0,
      description: 'The Gue\'vesa has no special modifications.' },
    { id: 'tau_aux_hrenian', name: 'Hrenian', creditCostModifier: 10,
      statModifiers: { rangedSkill: 1 },
      description: 'The Hrenian has +1 Ranged Skill.' },
    { id: 'tau_aux_morralian', name: 'Morralian', creditCostModifier: 10,
      statModifiers: { meleeSkill: 1 },
      description: 'The Morralian has +1 Melee Skill.' },
    { id: 'tau_aux_tarellian', name: 'Tarellian', creditCostModifier: 10,
      statModifiers: { movement: 2 },
      description: 'The Tarellian has +2" movement speed.' },
    { id: 'tau_aux_thraxian', name: 'Thraxian', creditCostModifier: 10,
      description: 'Multi-Armed: The Thraxian has an additional hand for both melee and ranged combat. It can attack with an additional weapon whenever it takes the Fight or Shoot Action, without off-hand penalties.' },
  ],
  upgrades: [
    { id: 'tau_auxiliary_veteran', name: 'Veteran', cost: 20, maxCount: 3,
      description: 'Grants +1 Ranged Skill and +1 Melee Skill. Up to 3 of your T\'au Auxiliaries can be Veterans.' },
  ],
};
export const tau_vespid_strain_leader: UnitOption = {
  id: 'tau_vespid_strain_leader', name: 'Vespid Stingwing (Strain Leader)', baseCost: 130, minCount: 0, maxCount: 1,
  stats: { movement: 8, rangedSkill: 3, meleeSkill: 3, armourSave: -1, toughness: 'NORMAL' },
  keywords: ['ELITE', 'FLYING', 'INFILTRATOR', 'SKIRMISHER', "T'AU", 'VESPID'],
  baseSize: '25mm',
  faction: 't_au_empire', unitType: 'elite',
  cannotEquip: true,
  description: "Auxiliary Cadre variant: Vespid Strain Leader (Auxiliary Leadership). Does not count towards the limit of Vespid Stingwing Mercenaries. Hard carapace armour is included in its statistics. You cannot change its battlekit in any way.",
  abilities: [
    { id: 'tau_vespid_airborne_agility', name: 'Airborne Agility', description: 'The Vespid Stingwing has +1 DICE to all Dash Success Rolls.', type: 'passive' },
  ],
  defaultWargear: [
    { id: 'neutron_blaster_vespid', name: 'Neutron Blaster', type: 'ranged', range: 18, cost: 0, handedness: 'two-handed',
      keywords: ['ARMOUR PIERCING 1', 'ASSAULT', 'CRITICAL', 'TWO-HANDED'],
      description: '18", ARMOUR PIERCING 1 if wielder moved at least 5" during this Activation, ASSAULT, CRITICAL, TWO-HANDED.' },
    { id: 'stingwing_claws_vespid', name: 'Stingwing Claws', type: 'melee', cost: 0, handedness: 'two-handed',
      keywords: ['ARMOUR PIERCING 1', 'TWO-HANDED'],
      description: 'Melee, ARMOUR PIERCING 1, TWO-HANDED.' },
  ],
  availableWargear: [],
};
