/**
 * campaignProgression.ts
 *
 * Static definitions for Elite campaign progression:
 *   - Campaign Skill tables (6 tables, rolls 2–12)
 *   - Elite Traumas (all named mechanical effects from the Battle Scar / Trauma tables)
 *   - Astra Militarum Commendations
 *
 * RULES CLARIFICATION (Goober):
 *   Battle Scars are a plain count (0–3). At 3 scars the model permanently dies.
 *   The named entries (Head Wound, Shell Shock, etc.) are ALL Traumas.
 *   Some Traumas can be cleared but the scar count remains.
 *
 * Source: Trench Hammer campaign content instructions.
 */

import type { CampaignSkill, EliteTrauma, CampaignSkillTable } from '../types/index.js';

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
    { roll: 8,  name: 'Heavy Melee Training',   description: 'This model can ignore the HEAVY Keyword of any one melee weapon it carries. If it can already do this, it gains the STRONG Keyword instead. If it already has the STRONG Keyword, it gains +1 INJURY DICE with melee attacks instead.' },
    { roll: 9,  name: 'Hard as Nails',          description: 'This model treats the first Down result it suffers in each battle as No Result.' },
    { roll: 10, name: 'Champion',               description: 'Melee Weapons that do not have the CLEAVE Keyword which are used by a model with the skill gain the CLEAVE 2 Keyword. In addition, add -1 DICE to the Success Roll for the second Melee Attack made with each Melee Weapon that gains the CLEAVE 2 Keyword. This does not apply to weapons that can be used in addition to normal attacks.' },
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
    { roll: 11, name: 'Psychic Awakening',  description: 'ANATHEMA models cannot take this skill. This model gains the PSYKER 1 Keyword (a PSYKER counts as having this skill already). Choose a Shared Discipline or a discipline that at least one model available to your faction can take powers from. This model can take up to three powers from that Discipline. It must be equipped with a PSYCHIC weapon to use these powers, and can always purchase a Force Rod for 3 credits. ORK: Powers are chosen from the Ork Psychic Powers list. NECRON: You must reroll. TYRANID: Powers are chosen from the Tyranids Psychic Powers list. Does not need a PSYCHIC weapon to use powers.' },
    { roll: 12, name: 'Patron Skill',       description: 'Pick one of the Skills offered by your Patron.' },
  ],
  explorer: [
    { roll: 2,  name: 'Patron Skill',       description: 'Pick one of the Skills offered by your Patron.' },
    { roll: 3,  name: 'Wanderlust',         description: 'Whenever you find a location while Exploring and this model is in your Warband, you earn 1 Glory.' },
    { roll: 4,  name: 'Scouring',           description: 'While this model is in your Warband, your Warband has the Duplicate Exploration Skill.' },
    { roll: 5,  name: 'Trader',             description: 'After each exploration, you earn an additional 2D6×10 credits.' },
    { roll: 6,  name: 'Scavenger',          description: 'While this model is in your Warband, your Warband has the Extra Dice Exploration Skill.' },
    { roll: 7,  name: 'Seasoned Explorer',  description: 'While this model is in your Warband, your Warband has the Reroll Exploration Skill.' },
    { roll: 8,  name: 'Cautious',           description: 'While this model is in your Warband, your Warband has the Careful Exploration Skill.' },
    { roll: 9,  name: 'Escapist',           description: 'While this model is in your Warband, your Warband has the Delete Exploration Skill.' },
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
// ELITE TRAUMAS
// All named mechanical effects from both the Battle Scar table and the
// Trauma sub-table. When a model is taken Out of Action and fails its casualty
// check, its scar count increases by 1. The player may also add one of these
// Traumas to record the named effect rolled. Traumas can be individually
// removed (recovery / treatment) while the scar count remains unchanged.
// ============================================================================

export const ELITE_TRAUMAS: EliteTrauma[] = [
  // ── From the Battle Scar table ────────────────────────────────────────────
  { id: 'tr_impressive_scar',   name: 'Impressive Scar',      canRecover: false,
    description: 'A cosmetic disfigurement. +1 DICE on Intimidation and similar social rolls. No mechanical penalty.' },
  { id: 'tr_head_wound',        name: 'Head Wound',           canRecover: false,
    description: '-1 DICE on all Psychic Success Rolls. If not a PSYKER, begins each battle with 1 BLOOD MARKER instead.' },
  { id: 'tr_arm_wound',         name: 'Arm Wound',            canRecover: false,
    description: 'Choose one ranged or melee weapon this model carries — that weapon permanently has -1 DICE to hit.' },
  { id: 'tr_leg_wound',         name: 'Leg Wound',            canRecover: false,
    description: 'This model’s movement is reduced by 1".' },
  { id: 'tr_chest_wound',       name: 'Chest Wound',          canRecover: false,
    description: 'This model begins each battle with 1 BLOOD MARKER.' },
  { id: 'tr_eye_wound',         name: 'Eye Wound',            canRecover: false,
    description: '-1 DICE on all ranged attack Hit rolls against targets beyond 12".' },
  { id: 'tr_old_break',         name: 'Old Break',            canRecover: false,
    description: '-1 DICE on all Dash Success Rolls.' },
  { id: 'tr_nerve_damage',      name: 'Nerve Damage',         canRecover: false,
    description: 'Once per battle, when making a Success Roll, must first remove 1 BLOOD MARKER if it has any, or cannot make that roll.' },
  { id: 'tr_recurring_illness', name: 'Recurring Illness',    canRecover: true,
    description: 'At the start of each battle, roll a D6. On a 1, begins the battle with D3 BLOOD MARKERS.' },
  { id: 'tr_hardened_veteran',  name: 'Hardened Veteran',     canRecover: false,
    description: 'This model has seen it all. Gains +1 Toughness characteristic (permanently -1 to opponent Injury rolls against this model).' },
  // ── From the Trauma sub-table ─────────────────────────────────────────────
  { id: 'tr_shell_shock',       name: 'Shell Shock',          canRecover: true,
    description: '-1 DICE on the first Success Roll made during this model’s first Activation each battle.' },
  { id: 'tr_paranoia',          name: 'Paranoia',             canRecover: true,
    description: 'Must re-roll successful Retreat rolls once.' },
  { id: 'tr_flashbacks',        name: 'Flashbacks',           canRecover: true,
    description: 'At the start of the first Activation each battle, roll a D6. On a 1, suffers 1 STUN MARKER.' },
  { id: 'tr_recklessness',      name: 'Recklessness',         canRecover: true,
    description: 'Must always make at least one Charge or Dash action each Activation if able to do so.' },
  { id: 'tr_overconfidence',    name: 'Overconfidence',       canRecover: true,
    description: 'Can never voluntarily Retreat from melee while it has fewer than 3 BLOOD MARKERS.' },
  { id: 'tr_battle_hardened',   name: 'Battle Hardened',      canRecover: false,
    description: 'The ordeal helped this model grow stronger. No negative effect — the model has overcome its trauma.' },
];

// ============================================================================
// HELPERS
// ============================================================================

/** Returns true if a WarbandUnit should track XP / progression */
export function isEliteEligible(unit: { unitType: string; isPromoted?: boolean; keywords?: string[] }): boolean {
  return unit.unitType === 'elite' || unit.isPromoted === true || (unit.keywords?.includes('ELITE') ?? false);
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

// ============================================================================
// ASTRA MILITARUM COMMENDATIONS
// Awarded to individual models after each battle at the player's discretion.
// The model must meet the stated requirements. A model may hold multiple
// commendations but only one of each type.
// ============================================================================

export interface AstraCommendation {
  id: string;
  name: string;
  /** Condition that must be met during the battle for the award to be valid */
  requirements: string;
  /** Permanent benefit granted */
  benefit: string;
  /** Additional eligibility restrictions, if any */
  restrictions?: string;
  /** If true, only one model in the entire warband may ever hold this commendation */
  uniquePerWarband?: boolean;
}

export const ASTRA_MILITARUM_COMMENDATIONS: AstraCommendation[] = [
  {
    id: 'cm_bastion_honour',
    name: 'Bastion Honour',
    requirements: 'Took at least 2 enemy models Out of Action in melee this battle.',
    benefit: 'Once per battle, when this model is Charged, it may immediately make a Melee Attack against the charging model before the charge resolves.',
    restrictions: 'Non-Elite, non-Ogryn models only.',
  },
  {
    id: 'cm_celeris_heart',
    name: 'Celeris Heart',
    requirements: 'Retreated from melee at least twice this battle.',
    benefit: 'Gains the SKIRMISHER keyword.',
  },
  {
    id: 'cm_decoration_of_duty',
    name: 'Decoration of Duty',
    requirements: 'Deployed in at least 8 consecutive battles as an Elite, including this one.',
    benefit: '+2 XP immediately.',
    restrictions: 'Elite models only.',
  },
  {
    id: 'cm_decree_of_dispensation',
    name: 'Decree of Dispensation',
    requirements: 'Lost at least 3 battles including this one.',
    benefit: 'Leader gains the Extra Dice and Reroll Exploration Skills.',
    restrictions: 'Leader only.',
    uniquePerWarband: true,
  },
  {
    id: 'cm_honourifica_imperialis',
    name: 'Honourifica Imperialis',
    requirements: 'Holds at least 5 other Commendations and scored a Glorious Deed this battle.',
    benefit: 'Earn 3 Glory immediately.',
    restrictions: 'Elite models only.',
  },
  {
    id: 'cm_laurels_of_purity',
    name: 'Laurels of Purity',
    requirements: 'Was affected by at least 2 enemy Psychic Actions this battle without being taken Out of Action.',
    benefit: 'May Deny the Witch as if it has the PSYKER 1 keyword.',
    restrictions: 'Non-Psyker models only.',
  },
  {
    id: 'cm_lord_commanders_sigilum',
    name: "Lord Commander's Sigilum",
    requirements: 'Took at least 3 enemy models Out of Action this battle.',
    benefit: '+1 XP at the end of each future battle in which this model takes at least 3 enemies Out of Action.',
    restrictions: 'Elite models only.',
  },
  {
    id: 'cm_medallion_resolute',
    name: 'Medallion Resolute',
    requirements: 'Was on the battlefield when your warband succeeded on a Morale test this battle.',
    benefit: 'While Down, this model does not count as Down for Morale purposes.',
  },
  {
    id: 'cm_medal_of_laudable_service',
    name: 'Medal of Laudable Service',
    requirements: 'Deployed in at least 6 consecutive battles including this one.',
    benefit: 'Immediately promoted to Elite (in addition to any other promotions).',
    restrictions: 'Non-Elite models only.',
  },
  {
    id: 'cm_merit_of_strategium',
    name: 'Merit of the Strategium',
    requirements: 'Earned Victory Points this battle in a way other than taking enemies Out of Action.',
    benefit: 'After deployment, may re-deploy anywhere in your own deployment zone. (INFILTRATOR keyword cannot be used for this re-deployment.)',
  },
  {
    id: 'cm_oculus_laureate',
    name: 'Oculus Laureate',
    requirements: 'Has accumulated at least 5 Glorious Deeds in total, including at least 1 this battle.',
    benefit: 'At the end of each further battle, if not taken Out of Action, earns 1 Glory.',
    restrictions: 'Leader only.',
  },
  {
    id: 'cm_order_of_adamantine_chain',
    name: 'Order of the Adamantine Chain',
    requirements: 'Issued at least 3 Orders, took at least 1 enemy Out of Action, and was not taken Out of Action this battle.',
    benefit: '+1 XP immediately.',
    restrictions: 'Elite models only.',
  },
  {
    id: 'cm_recon_star',
    name: 'Recon Star',
    requirements: 'Ended the battle in the enemy\'s deployment zone.',
    benefit: 'Gains the player\'s choice of the Seek or Circle Back Exploration Skill.',
  },
  {
    id: 'cm_star_of_fidelity',
    name: 'Star of Fidelity',
    requirements: 'Was issued an Order during every Turn of the battle.',
    benefit: 'Can be issued an Order by any Elite model within 24" instead of the normal 6".',
    restrictions: 'Non-Elite models only.',
  },
  {
    id: 'cm_survivalist_commendation',
    name: 'Survivalist Commendation',
    requirements: 'Succeeded on at least 2 casualty tests, including one at the end of this battle.',
    benefit: 'May re-roll each casualty test once (second result stands). If later promoted to Elite, may also re-roll each Elite Trauma roll once.',
    restrictions: 'Non-Elite models only.',
  },
];
