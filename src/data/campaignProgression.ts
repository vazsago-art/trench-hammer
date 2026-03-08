/**
 * campaignProgression.ts
 *
 * Static definitions for Elite campaign progression:
 *   - Campaign Skill tables (6 tables, rolls 2–12)
 *   - Battle Scars (from Elite Injury / Battle Scar chart)
 *   - Elite Traumas (companion to Battle Scars)
 *
 * Source: Trench Hammer campaign content instructions.
 */

import type { CampaignSkill, BattleScar, EliteTrauma, CampaignSkillTable } from '../types/index.js';

// ============================================================================
// CAMPAIGN SKILL TABLE ENTRIES
// ============================================================================

/** One row of a skill table before a specific model has rolled it */
export interface SkillTableEntry {
  roll: number;       // 2–12
  name: string;
  description: string;
}

export const SKILL_TABLES: Record<CampaignSkillTable, SkillTableEntry[]> = {
  melee: [
    { roll: 2,  name: 'Patron Skill',          description: 'Pick one of the Skills offered by your Patron.' },
    { roll: 3,  name: 'Stand Firm',             description: 'This model treats the first Down result it suffers during each battle as a Minor Hit (does not affect Down results that replace Out of Action via TOUGH Keyword).' },
    { roll: 4,  name: 'Parry',                  description: 'Enemy models suffer -1 DICE to hit this model with Melee Attacks.' },
    { roll: 5,  name: 'Close Quarters Combat',  description: 'When this model is touching a piece of terrain, it gains +1 DICE to Hit and to Injure with Melee Attacks.' },
    { roll: 6,  name: 'Relentless Charge',      description: 'During Activations that this model has Charged, it gains +1 DICE to Hit with Melee Attacks.' },
    { roll: 7,  name: 'Melee Proficiency',      description: 'Add +1 to the Melee Skill of this model.' },
    { roll: 8,  name: 'Heavy Melee Training',   description: 'This model can ignore the HEAVY Keyword of any one melee weapon it carries. If it can already do this, it gains the STRONG Keyword instead.' },
    { roll: 9,  name: 'Hard as Nails',          description: 'This model treats the first Down result it suffers in each battle as No Result.' },
    { roll: 10, name: 'Champion',               description: 'Melee Weapons that do not have the CLEAVE Keyword which are used by a model with the skill gain the CLEAVE 2 Keyword. In addition, add -1 DICE to the Success Roll for the second Melee Attack made with each Melee Weapon that gains the CLEAVE 2 Keyword.' },
    { roll: 11, name: 'Surgical Strike',        description: 'Once during each of its Activation, this model can cause one of its melee weapon attacks to ignore Armour.' },
    { roll: 12, name: 'Patron Skill',           description: 'Pick one of the Skills offered by your Patron.' },
  ],
  ranged: [
    { roll: 2,  name: 'Patron Skill',           description: 'Pick one of the Skills offered by your Patron.' },
    { roll: 3,  name: 'Hunter',                 description: 'This model ignores all penalties from Cover when making a ranged attack.' },
    { roll: 4,  name: 'Far Shot',               description: 'The range of all of this model\'s ranged weapons that have at least a range of 12" are increased by 6".' },
    { roll: 5,  name: 'Sharp Eyes',             description: 'This model ignores penalties for long range when using ranged weapons.' },
    { roll: 6,  name: 'Sniper\'s Nest',         description: 'This model gains +2 DICE (instead of +1 DICE) when shooting from an elevated position.' },
    { roll: 7,  name: 'Ranged Proficiency',     description: 'Add +1 to the Ranged Skill of this model.' },
    { roll: 8,  name: 'Heavy Ranged Training',  description: 'This model can ignore the HEAVY Keyword of any one ranged weapon it carries. If it can already do this, it gains the STRONG Keyword instead.' },
    { roll: 9,  name: 'Point Blank',            description: 'When this model makes a Melee Attack, it may make a Fight Action with a single Ranged Weapon it is equipped with instead of making any Fight Actions. This attack uses the model\'s Ranged Skill. It can still use its Ranged Attack normally outside of Melee.' },
    { roll: 10, name: 'Hip Shoot',              description: 'Ranged weapons this model is equipped with have ASSAULT.' },
    { roll: 11, name: 'Head Shot',              description: 'Ranged Attacks of this model ignore Armour on a Critical Hit.' },
    { roll: 12, name: 'Patron Skill',           description: 'Pick one of the Skills offered by your Patron.' },
  ],
  stealth: [
    { roll: 2,  name: 'Patron Skill',   description: 'Pick one of the Skills offered by your Patron.' },
    { roll: 3,  name: 'Sixth Sense',    description: 'If this model has no BLOOD MARKERS, treat any Down Result against it as a Minor Hit instead.' },
    { roll: 4,  name: 'Assassinate',    description: 'This model gains +1 DICE to hit against models that have not been Activated this turn.' },
    { roll: 5,  name: 'Shadow Walker',  description: 'This model gains the STEALTH Keyword. (Treat the model as if it already has this skill if it already has STEALTH.)' },
    { roll: 6,  name: 'Athletic',       description: 'This model has +1 DICE to all Climb, Jump, and Diving Charge Success Rolls, and injuries from falling damage against this model are rolled with -1 DICE.' },
    { roll: 7,  name: 'Sprinter',       description: 'Add +1 DICE to all Dash Success Rolls this model takes.' },
    { roll: 8,  name: 'Disengage',      description: 'When this model Retreats, enemy models do not get a free Melee Attack against it.' },
    { roll: 9,  name: 'Incoming',       description: 'When this model Charges, it rolls an additional D6 and picks the highest result. This is cumulative with other such bonuses.' },
    { roll: 10, name: 'Nimble',         description: 'This model does not suffer a penalty to its movement after it Stands.' },
    { roll: 11, name: 'Dodge',          description: 'All Ranged Attacks against this model have an additional -1 DICE to hit.' },
    { roll: 12, name: 'Patron Skill',   description: 'Pick one of the Skills offered by your Patron.' },
  ],
  wildcard: [
    { roll: 2,  name: 'Patron Skill',       description: 'Pick one of the Skills offered by your Patron.' },
    { roll: 3,  name: 'Chosen',             description: 'This model begins each battle with 1 BLESSING MARKER.' },
    { roll: 4,  name: 'Bad Company',        description: 'While this model is in your Warband, your Warband may have 7 ELITE models instead of 6.' },
    { roll: 5,  name: 'But a Scratch',      description: 'You may re-roll any Injuries on the Injury Chart for this model. The second result stands.' },
    { roll: 6,  name: 'Serendipity',        description: 'While this model is in your Warband, your Warband has the Lucky Exploration Skill.' },
    { roll: 7,  name: 'Skill and Expertise',description: 'When you give a model this Skill, choose 1 ACTION on that model\'s Warband Entry, 1 ACTION granted by a piece of battlekit, or 1 Common ACTION apart from Dash, Fight, or Shoot ACTIONS, and write it on your Warband Roster. Add +1 DICE to rolls made as part of the chosen ACTION when they are taken by this model.' },
    { roll: 8,  name: 'Showoff',            description: 'Add 1 additional die to the Promotion Dice pool after each battle.' },
    { roll: 9,  name: 'Glory Hound',        description: 'At the end of each battle, if this model was fielded and was not taken Out of Action, your Warband gains an additional 1 Glory.' },
    { roll: 10, name: 'War Stories',        description: 'At the end of the battle, choose any ELITE model in your Warband except this one. That model gains +1 Experience Point.' },
    { roll: 11, name: 'Psychic Awakening',  description: 'This model gains the PSYKER 1 Keyword (a PSYKER counts as having this skill already). Choose a Shared Discipline or a discipline that at least one model available to your faction can take powers from. This model can take up to three powers from that Discipline. It must be equipped with a PSYCHIC weapon to use these powers, and can always purchase a Force Rod for 3 credits. ORK: Powers are chosen from the Ork Psychic Powers list. NECRON: You must reroll. TYRANID: Powers are chosen from the Tyranids Psychic Powers list. Does not need a PSYCHIC weapon to use powers.' },
    { roll: 12, name: 'Patron Skill',       description: 'Pick one of the Skills offered by your Patron.' },
  ],
  explorer: [
    { roll: 2,  name: 'Patron Skill',       description: 'Pick one of the Skills offered by your Patron.' },
    { roll: 3,  name: 'Wanderlust',         description: 'Whenever you find a location while Exploring and this model is in your Warband, you earn 1 Glory.' },
    { roll: 4,  name: 'Scouring',           description: 'While this model is in your Warband, your Warband has the Duplicate Exploration Skill.' },
    { roll: 5,  name: 'Trader',             description: 'After each exploration, you earn an additional D6×10 credits.' },
    { roll: 6,  name: 'Scavenger',          description: 'While this model is in your Warband, your Warband has the Extra Dice Exploration Skill.' },
    { roll: 7,  name: 'Seasoned Explorer',  description: 'While this model is in your Warband, your Warband has the Reroll Exploration Skill.' },
    { roll: 8,  name: 'Cautious',           description: 'While this model is in your Warband, your Warband has the Careful Exploration Skill.' },
    { roll: 9,  name: 'Look-Out',           description: 'While this model is in your Warband, your Warband has the Set Dice Exploration Skill.' },
    { roll: 10, name: 'Meticulous',         description: 'While this model is in your Warband, your Warband has the Circle Back Exploration Skill.' },
    { roll: 11, name: 'Seeker',             description: 'While this model is in your Warband, your Warband has the Seek Exploration Skill.' },
    { roll: 12, name: 'Patron Skill',       description: 'Pick one of the Skills offered by your Patron.' },
  ],
  psychic: [
    { roll: 2,  name: 'Patron Skill',         description: 'Pick one of the Skills offered by your Patron.' },
    { roll: 3,  name: 'Fortuneteller',         description: 'While this model is in your Warband, your Warband has the Careful and Extra Dice Exploration Skills.' },
    { roll: 4,  name: 'Expanded Mind',         description: 'This model can learn an additional psychic power from among those it is allowed to learn. (It must pay normally.)' },
    { roll: 5,  name: 'Safe Discharge',        description: 'The first time during each of its Activations that this model fails a RISKY PSYCHIC Success Roll, its Activation does not end.' },
    { roll: 6,  name: 'Suppressor',            description: 'This model has +1 DICE when Denying the Witch.' },
    { roll: 7,  name: 'Psychic Proficiency',   description: 'Choose one psychic power that this model knows. This model has +1 DICE on all Success Rolls to use that power.' },
    { roll: 8,  name: 'Wild Talent',           description: 'Randomly select a Shared Psychic Power (roll a D6 for Discipline and a D6 for power), rerolling powers this model already knows. This model learns that power without paying for it, which does not count towards its normal limits or towards your credit limit for a mission.' },
    { roll: 9,  name: 'Burning Bright',        description: 'When this model fails a PSYCHIC Success Roll, it can choose to reroll. Regardless of the result, it is subjected to Perils of the Warp, even if that action was not a psychic power or it would otherwise be unaffected by Perils of the Warp, after the results of the Success Roll.' },
    { roll: 10, name: 'Balanced',              description: 'This model never suffers Perils of the Warp on a roll of 12. The PERILOUS Keyword only applies to numbers between 2 and 2 plus the PERILOUS X value.' },
    { roll: 11, name: 'Psychic Mastery',       description: 'The second power this model uses during each of its Activations has +1 DICE.' },
    { roll: 12, name: 'Patron Skill',          description: 'Pick one of the Skills offered by your Patron.' },
  ],
};

/** Build a CampaignSkill from a table and a roll value */
export function makeCampaignSkill(table: CampaignSkillTable, roll: number): CampaignSkill {
  const entry = SKILL_TABLES[table].find(e => e.roll === roll);
  if (!entry) throw new Error(`No skill found for table "${table}" roll ${roll}`);
  return {
    id: `${table}_${roll}_${Date.now()}`,
    table,
    roll,
    name: entry.name,
    description: entry.description,
  };
}

// ============================================================================
// BATTLE SCARS
// These are the standard Trench Crusade Elite Battle Scars (D12 table).
// After a battle where an Elite model was taken Out of Action,
// it rolls on this table.
// ============================================================================

export const BATTLE_SCARS: BattleScar[] = [
  { id: 'scar_1',  name: 'Impressive Scar',      description: 'This model gains +1 DICE on Intimidation and similar social rolls. (Cosmetic — no mechanical penalty.)' },
  { id: 'scar_2',  name: 'Head Wound',            description: 'This model suffers -1 DICE on all Psychic Success Rolls. If it is not a PSYKER, it instead begins each battle with 1 BLOOD MARKER.' },
  { id: 'scar_3',  name: 'Arm Wound',             description: 'One of this model\'s weapon hands is weakened. Choose one ranged or melee weapon it carries — that weapon permanently has -1 DICE to hit.' },
  { id: 'scar_4',  name: 'Leg Wound',             description: 'This model\'s movement is reduced by 1".' },
  { id: 'scar_5',  name: 'Chest Wound',           description: 'This model begins each battle with 1 BLOOD MARKER.' },
  { id: 'scar_6',  name: 'Eye Wound',             description: 'This model suffers -1 DICE on all ranged attack Hit rolls beyond 12".' },
  { id: 'scar_7',  name: 'Old Break',             description: 'This model suffers -1 DICE on all Dash Success Rolls.' },
  { id: 'scar_8',  name: 'Nerve Damage',          description: 'Once per battle, when this model makes a Success Roll (including attacks), you must first remove 1 BLOOD MARKER from it if it has any, or else this model cannot make that roll.' },
  { id: 'scar_9',  name: 'Recurring Illness',     description: 'At the start of each battle, roll a D6. On a 1, this model begins the battle with D3 BLOOD MARKERS.' },
  { id: 'scar_10', name: 'Trauma',                description: 'This model must also roll on the Elite Trauma chart.' },
  { id: 'scar_11', name: 'Full Recovery',         description: 'This model suffers no lasting effects. Remove this entry when recorded.' },
  { id: 'scar_12', name: 'Hardened Veteran',      description: 'This model has seen it all. It gains +1 to its Toughness characteristic (apply as a permanent -1 to opponent Injury rolls against this model).' },
];

// ============================================================================
// ELITE TRAUMAS
// Companion injuries gained alongside (or instead of) some Battle Scars.
// Rolled on a D6 after suffering the "Trauma" Battle Scar result,
// or after other campaign events that reference the Elite Trauma chart.
// ============================================================================

export const ELITE_TRAUMAS: EliteTrauma[] = [
  { id: 'trauma_1', name: 'Shell Shock',       description: 'This model always has -1 DICE on the first Success Roll it makes during its first Activation each battle.' },
  { id: 'trauma_2', name: 'Paranoia',          description: 'This model must re-roll successful Retreat rolls once.' },
  { id: 'trauma_3', name: 'Flashbacks',        description: 'At the start of this model\'s first Activation each battle, roll a D6. On a 1, it suffers 1 STUN MARKER.' },
  { id: 'trauma_4', name: 'Recklessness',      description: 'This model must always make at least one Charge or Dash action each Activation if it is able to do so.' },
  { id: 'trauma_5', name: 'Overconfidence',    description: 'This model can never voluntarily Retreat from melee while it has fewer than 3 BLOOD MARKERS.' },
  { id: 'trauma_6', name: 'Battle Hardened',   description: 'The trauma helped this model grow stronger. Treat this as No Effect — the model has overcome its ordeal.' },
];

// ============================================================================
// HELPERS
// ============================================================================

/** Returns true if a WarbandUnit should track XP / progression */
export function isEliteEligible(unit: { unitType: string; isPromoted?: boolean }): boolean {
  return unit.unitType === 'elite' || unit.isPromoted === true;
}

/** Skill table display labels */
export const SKILL_TABLE_LABELS: Record<CampaignSkillTable, string> = {
  melee:    'Melee & Strength',
  ranged:   'Ranged',
  stealth:  'Stealth & Speed',
  wildcard: 'Wildcard',
  explorer: 'Explorer',
  psychic:  'Psychic (PSYKER only)',
};
