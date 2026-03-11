/**
 * Sub-faction definitions for factions that require a Warband Variant choice.
 * Currently covers: Heretic Astartes (9 warband variants).
 */

import type { UnitOption } from '../types/index.js';
import {
  // Astra Militarum — used by GSC Brood Brothers + Ministorum Ecclesiastic + Inquisition Hereticus
  am_commissar, am_guardsman, am_veteran_guardsman, am_heavy_weapons_squad,
  // Adepta Sororitas — used by Ministorum Ecclesiastic + Inquisition Hereticus
  as_dogmata, as_palatine, as_battle_sister, as_repentia, as_penitent_engine,
  // Adeptus Astartes — used by Inquisition Malleus/Xenos
  aa_apothecary, aa_chaplain, aa_librarian, aa_space_marine, aa_terminator,
  // Necromunda Gang — used by Inquisition Minoris
  ng_gang_leader, ng_ganger, ng_juve, ng_cyber_mastiff, ng_sanctioner_automata,
  // Drukhari — used by Ynnari
  dr_archon, dr_incubus, dr_wych, dr_reaver,
  // Harlequins — used by Ynnari
  hq_troupe_master, hq_player, hq_death_jester, hq_shadowseer, hq_skyweaver,
  // Genestealer Cults + Tyranids — cross-faction
  gc_patriarch, gc_genestealer_troop,
  ty_gaunt_barbgaunt, ty_gaunt_gargoyle, ty_gaunt_hormagaunt, ty_gaunt_termagant,
  ty_tyranid_warrior, ty_ravener, ty_zoanthrope,
} from './factions_complete.js';

export interface SubFaction {
  id: string;
  name: string;
  /** Short flavour description shown in the selector */
  description: string;
  /** Full rules summary displayed to the player */
  rules: string[];
  /** Patron that must be used (null = any allowed patron) */
  requiredPatron?: string;
  /**
   * Psychic discipline override.  When set, models in this sub-faction use this
   * discipline instead of the parent faction's default discipline.
   */
  psychicDisciplineId?: string;
  /** Dark Pacts special rule is disabled for this warband variant */
  noDarkPacts?: boolean;
  /**
   * Per-unit maxCount overrides for this subfaction.
   * When set, the unit's maxCount is capped to the specified value.
   * E.g. Black Templars caps aa_vanguard to 1.
   */
  unitMaxCountOverrides?: Record<string, number>;
  /** Unit IDs from this faction's roster that cannot be recruited in this subfaction */
  bannedUnitIds?: string[];
  /** Additional units from other factions or special sources available in this subfaction */
  extraUnits?: UnitOption[];
  /**
   * Auto-mark configuration for warband variants such as World Eaters, Death Guard,
   * Emperor's Children, and Thousand Sons. When set, any recruited unit whose id
   * appears in `eligibleUnitIds` automatically receives this mark (applied as a
   * locked SelectedWargear item priced at `costOverride` credits).
   */
  autoMark?: {
    /** ID matching a WargearOption in equipment.ts (mark slot) */
    markId: string;
    /** Display name for the mark, e.g. "Mark of Khorne" */
    markName: string;
    /** Credit cost for this automatic application (may differ from item's normal price) */
    costOverride: number;
    /** Keywords granted to the model by the mark */
    grantedKeywords: string[];
    /** Unit IDs that automatically receive this mark when recruited */
    eligibleUnitIds: string[];
  };
  /**
   * Per-unit auto-applied modifications for warband variants (beyond the mark).
   * Handles Butcher's Nails, Contagion, Rubric Marines, Jakhals, Eightbound, etc.
   * Each entry targets specific unit IDs and applies the listed changes when recruited.
   */
  autoModifications?: Array<{
    /** Unit IDs that receive these modifications */
    unitIds: string[];
    /** Additional credit cost per model (stacks with autoMark if applicable) */
    costModifier?: number;
    /** Keywords to add at recruitment (also stored on first ability grantsKeywords for upgrade persistence) */
    addKeywords?: string[];
    /** Movement stat delta (+1 = faster, -1 = slower) */
    movementDelta?: number;
    /** Ranged Skill stat delta (e.g. Gal Vorbak +1 Ranged Skill). Embedded on first addAbilities item's statModifiers. */
    rangedSkillDelta?: number;
    /** Melee Skill stat delta (e.g. Catachan +1 Melee Skill). Embedded on first addAbilities item's statModifiers. */
    meleeSkillDelta?: number;
    /**
     * Abilities shown as locked wargear-style items in the WargearPanel.
     * Use for warband special rules: Blood Surge, Contagion, Beacon of Rage, etc.
     */
    addAbilities?: Array<{
      id: string;
      name: string;
      description: string;
      cost: number;
    }>;
    /**
     * Replace a default weapon with a custom profile.
     * A locked SelectedWargear item is added with replacesDefaultId = removeId,
     * causing the WargearPanel to show the original weapon as crossed-out.
     */
    replaceDefaultWargear?: {
      removeId: string;
      addItem: {
        id: string;
        name: string;
        description: string;
        cost: number;
      };
    };
  }>;
  /**
   * Extra keywords granted when specific wargear items are equipped.
   * Maps wargear item ID → array of keywords to add (e.g. Raven Guard + jump_pack → DEEP STRIKE).
   * These are injected into the SelectedWargear grantsKeywords at equip time.
   */
  wargearKeywordGrants?: Record<string, string[]>;
  /** Optional flavour quote displayed prominently in the subfaction rules panel */
  quote?: string;
}

export interface FactionSubFactions {
  factionId: string;
  /** Set to true when a sub-faction choice is mandatory (no "No Variant" option) */
  required: boolean;
  subFactions: SubFaction[];
}

// ─── Heretic Astartes Warband Variants ───────────────────────────────────────

const HERETIC_ASTARTES_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Standard)',
    description: 'A standard Heretic Astartes warband with no warband variant.',
    // Standard has no subfaction-exclusive recruits — hide all variant-only units
    bannedUnitIds: [
      'ha_poxwalker', 'ha_foetid_blight_drone',            // Death Guard only
      'ha_lord_kakophonist',                                // Emperor's Children only
      'ha_renegade_apothecary',                             // Renegade Space Marines only
      'ha_exalted_sorcerer', 'ha_tzaangor_shaman',          // Thousand Sons only
      'ha_tzaangor', 'ha_sekhetar_robot',                   // Thousand Sons only
      'ha_master_of_executions', 'ha_slaughterbound',       // World Eaters only
    ],
    rules: [
      'Uses Dark Pacts special rule.',
      'Uses the standard Dread Reputation system.',
      'Uses the Heretic Astartes Psychic Discipline.',
      'May purchase Foecleaver from the Campaign Shop (Elite Only).',
    ],
  },
  {
    id: 'alpha_legion',
    name: 'Alpha Legion',
    description: 'Masters of deception and infiltration. Enemies are never sure who they are fighting.',
    noDarkPacts: true,
    requiredPatron: 'Alpharius',
    bannedUnitIds: [
      'ha_dark_apostle',                                    // Less Corrupt rule
      'ha_poxwalker', 'ha_foetid_blight_drone',            // Death Guard only
      'ha_lord_kakophonist',                                // Emperor's Children only
      'ha_renegade_apothecary',                             // Renegade Space Marines only
      'ha_exalted_sorcerer', 'ha_tzaangor_shaman',          // Thousand Sons only
      'ha_tzaangor', 'ha_sekhetar_robot',                   // Thousand Sons only
      'ha_master_of_executions', 'ha_slaughterbound',       // World Eaters only
    ],
    autoModifications: [
      {
        // Dedicated to Deception: all HERETIC ASTARTES Alpha Legion models permanently have Lies and Obfuscation
        unitIds: ['ha_chaos_lord', 'ha_chaos_sorcerer', 'ha_warpsmith', 'ha_chaos_cultist', 'ha_chaos_space_marine', 'ha_possessed', 'ha_chaos_terminator', 'ha_helbrute'],
        addAbilities: [{
          id: 'al_lies_and_obfuscation',
          name: 'Lies and Obfuscation',
          description: 'Enemies treat this model as if 2" further away when measuring the range of abilities and weapons (range >1") and when declaring Charges. Enemies reduce their Charge distance by 2" when charging this model.',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Cannot include Dark Apostles; max 1 Possessed.',
      'Maximum 1 of each Mark of Chaos.',
      'No Dark Pacts. Instead, all HERETIC ASTARTES models have Lies and Obfuscation: enemies measure range and Charge as if 2" further away.',
      'Patron must be Alpharius.',
      'Hidden in Plain Sight: at battle start, up to half your HERETIC ASTARTES models (rounded down) gain INFILTRATOR for that battle.',
      'Many Heads of the Hydra: when your LEADER is taken Out of Action, another non-Cultist, non-Vehicle model gains LEADER until end of battle.',
      'Up to 2 (or 3 in 1,200+ credit warbands) Chaos Space Marines can be upgraded to Saboteurs (+10 credits) with the Mine Layer ability and NEGATE MINED.',
      'Adds Throwing Power Knives (20 credits, LIMIT 2) and Shroud Bombs (5 credits, LIMIT 4) to armoury.',
    ],
  },
  {
    id: 'death_guard',
    name: 'Death Guard',
    description: "Servants of Nurgle, spreading plague and pestilence across the battlefield.",
    noDarkPacts: true,
    requiredPatron: 'Nurgle (Shared Patron)',
    // Rot Focused: cannot include Dark Apostles, Warpsmiths, Possessed, or Raptors.
    // Also hide all other subfaction-exclusive units.
    bannedUnitIds: [
      'ha_dark_apostle', 'ha_warpsmith', 'ha_possessed',    // Rot Focused rule
      'ha_lord_kakophonist',                                // Emperor's Children only
      'ha_renegade_apothecary',                             // Renegade Space Marines only
      'ha_exalted_sorcerer', 'ha_tzaangor_shaman',          // Thousand Sons only
      'ha_tzaangor', 'ha_sekhetar_robot',                   // Thousand Sons only
      'ha_master_of_executions', 'ha_slaughterbound',       // World Eaters only
    ],
    psychicDisciplineId: 'contagion_discipline',
    autoMark: {
      markId: 'mark_of_nurgle',
      markName: 'Mark of Nurgle',
      costOverride: 15,
      grantedKeywords: ['NURGLE'],
      eligibleUnitIds: ['ha_chaos_lord', 'ha_chaos_sorcerer', 'ha_chaos_cultist', 'ha_chaos_space_marine', 'ha_chaos_terminator', 'ha_helbrute'],
    },
    autoModifications: [
      {
        // Contagion ability auto-applied to all non-Cultist HA models
        unitIds: ['ha_chaos_lord', 'ha_chaos_sorcerer', 'ha_chaos_space_marine', 'ha_chaos_terminator', 'ha_helbrute'],
        addAbilities: [{
          id: 'dg_contagion',
          name: 'Contagion',
          description: 'Enemy models within 1" of this model that have 1 or more INFECTION MARKERS have -1 DICE to Hit with all attacks (spending all INFECTION MARKERS on that attack negates this penalty).',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Cannot include Dark Apostles, Warpsmiths, Possessed, or Raptors.',
      'All eligible models automatically have Mark of Nurgle (+15 credits each) and gain Contagion.',
      'No Dark Pacts. Patron must be the Nurgle Shared Patron.',
      'Spreaders of Disease: replaces Dread Reputation with a Virulence Points campaign system.',
      'Can take Poxwalkers as Troops.',
      'Can take a Foetid Blight-Drone instead of a Helbrute.',
      'Uses the Contagion Psychic Discipline instead of the Heretic Astartes Discipline.',
      'Access to Death Guard-specific wargear: Blight Grenades, Blight Launcher, Plague Blade, etc.',
    ],
  },
  {
    id: 'emperors_children',
    name: "Emperor's Children",
    description: 'Disciples of Slaanesh who seek sensation and excess above all else.',
    noDarkPacts: true,
    requiredPatron: 'Slaanesh (Shared Patron)',
    // Elegance: cannot include Warpsmiths (Shrivetalons are upgrades, not unit IDs).
    // Also hide all other subfaction-exclusive units.
    bannedUnitIds: [
      'ha_warpsmith',                                       // Elegance rule
      'ha_poxwalker', 'ha_foetid_blight_drone',            // Death Guard only
      'ha_renegade_apothecary',                             // Renegade Space Marines only
      'ha_exalted_sorcerer', 'ha_tzaangor_shaman',          // Thousand Sons only
      'ha_tzaangor', 'ha_sekhetar_robot',                   // Thousand Sons only
      'ha_master_of_executions', 'ha_slaughterbound',       // World Eaters only
    ],
    psychicDisciplineId: 'excess_discipline',
    autoMark: {
      markId: 'mark_of_slaanesh',
      markName: 'Mark of Slaanesh',
      costOverride: 10,
      grantedKeywords: ['SLAANESH'],
      eligibleUnitIds: ['ha_chaos_lord', 'ha_dark_apostle', 'ha_chaos_sorcerer', 'ha_chaos_cultist', 'ha_chaos_space_marine', 'ha_chaos_terminator', 'ha_helbrute'],
    },
    rules: [
      'Cannot include Warpsmiths or Shrivetalons.',
      'All eligible models automatically have Mark of Slaanesh (+10 credits each).',
      'No Dark Pacts. Patron must be the Slaanesh Shared Patron.',
      'Combat Elixirs: replaces Dread Reputation; collect Ingredient markers and craft powerful consumables.',
      'Up to 2 (or 3) Chaos Space Marines can be upgraded to Flawless Blades (+5 credits): +1 DICE to Hit in melee, pistols/grenades only for ranged.',
      'Can recruit a Lord Kakophonist as an Elite.',
      'Uses the Excess Psychic Discipline instead of the Heretic Astartes Discipline.',
      'Adds Blastmaster, Blissblade, Sonic Blaster, Screamer Pistol, and more to armoury.',
      'Optionally form a Carnival of Excess, recruiting Chaos Daemons troops.',
    ],
  },
  {
    id: 'iron_warriors',
    name: 'Iron Warriors',
    description: 'Masters of siege warfare and machinery, bound to the machine spirit.',
    noDarkPacts: true,
    // Mechanical Horror: cannot recruit Dark Apostles. Also hide all other variant-exclusive units.
    bannedUnitIds: [
      'ha_dark_apostle',                                    // Mechanical Horror rule
      'ha_poxwalker', 'ha_foetid_blight_drone',            // Death Guard only
      'ha_lord_kakophonist',                                // Emperor's Children only
      'ha_renegade_apothecary',                             // Renegade Space Marines only
      'ha_exalted_sorcerer', 'ha_tzaangor_shaman',          // Thousand Sons only
      'ha_tzaangor', 'ha_sekhetar_robot',                   // Thousand Sons only
      'ha_master_of_executions', 'ha_slaughterbound',       // World Eaters only
    ],
    psychicDisciplineId: 'technomancy',
    rules: [
      'No Dark Pacts. Maximum 1 of each Mark of Chaos (except Mark of Darkness). Patron cannot be Chaos Undivided.',
      'Cannot recruit Dark Apostles; can recruit up to 2 Warpsmiths.',
      'Can recruit 1 Obliterator Mercenary as a Troop for 215 credits.',
      'Heavy Gunners: additional Havoc upgrade available. Only 1 Shrivetalon and 1 Raptor maximum.',
      'Heavier Guns: can purchase Mortar (50 credits), Shrapnel Bolter, Shrapnel Cannon, Shrapnel Pistol.',
      'Iron Within, Iron Without: can purchase Cyberteknika Equipment upgrades.',
      'Uses the Technomancy Shared Discipline instead of the Heretic Astartes Discipline.',
    ],
  },
  {
    id: 'night_lords',
    name: 'Night Lords',
    description: 'Terror troops who hunt in darkness, breaking their foes\' will before the killing blow.',
    noDarkPacts: true,
    requiredPatron: 'Legacy of Curze',
    bannedUnitIds: [
      'ha_chaos_cultist', 'ha_dark_apostle',                 // No Pointless Faith rule
      'ha_poxwalker', 'ha_foetid_blight_drone',            // Death Guard only
      'ha_lord_kakophonist',                                // Emperor's Children only
      'ha_renegade_apothecary',                             // Renegade Space Marines only
      'ha_exalted_sorcerer', 'ha_tzaangor_shaman',          // Thousand Sons only
      'ha_tzaangor', 'ha_sekhetar_robot',                   // Thousand Sons only
      'ha_master_of_executions', 'ha_slaughterbound',       // World Eaters only
    ],
    autoModifications: [
      {
        // In Midnight Clad: all HERETIC ASTARTES Night Lords models permanently have STEALTH
        unitIds: ['ha_chaos_lord', 'ha_chaos_sorcerer', 'ha_warpsmith', 'ha_chaos_space_marine', 'ha_possessed', 'ha_chaos_terminator', 'ha_helbrute'],
        addKeywords: ['STEALTH'],
        addAbilities: [{
          id: 'nl_in_midnight_clad',
          name: 'In Midnight Clad — STEALTH',
          description: 'This model has the STEALTH Keyword. Cannot be targeted by ranged attacks from beyond half range unless the attacker has a direct unobscured line of sight.',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Cannot recruit Cultists or Dark Apostles. Patron must be Legacy of Curze.',
      'Can optionally count as an Outlaw Warband instead of Chaos.',
      'No Dark Pacts. All HERETIC ASTARTES models gain the STEALTH Keyword.',
      'Maximum 1 of each Mark of Chaos (except Mark of Darkness).',
      'Terror Tactics: 1 additional Raptor and Shrivetalon upgrade; max 1 Havoc.',
      'Curseclaw: 1 Possessed can be equipped with a Jump Pack.',
      'Depredator: 1 Raptor can be upgraded to ignore HEAVY on one melee weapon (+5 credits).',
      'Warp Talons: up to 2 Raptors gain DEEP STRIKE (+10 credits each).',
      'Adds Chain Snare, Comms Jammer, Grisly Trophy, Ventrilokar Vox, Terrorchem Vials.',
    ],
  },
  {
    id: 'renegade_space_marines',
    name: 'Renegade Space Marines',
    description: 'Loyalist Astartes who have turned their backs on the Imperium without fully embracing Chaos.',
    noDarkPacts: true,
    requiredPatron: 'Pirate Lord (Shared Patron)',
    // Untainted: cannot recruit Dark Apostles, Warpsmiths, Possessed, or Helbrutes.
    // Also hide all other subfaction-exclusive units.
    bannedUnitIds: [
      'ha_dark_apostle', 'ha_warpsmith', 'ha_possessed', 'ha_helbrute', // Untainted rule
      'ha_poxwalker', 'ha_foetid_blight_drone',            // Death Guard only
      'ha_lord_kakophonist',                                // Emperor's Children only
      'ha_exalted_sorcerer', 'ha_tzaangor_shaman',          // Thousand Sons only
      'ha_tzaangor', 'ha_sekhetar_robot',                   // Thousand Sons only
      'ha_master_of_executions', 'ha_slaughterbound',       // World Eaters only
    ],
    psychicDisciplineId: 'librarius',
    autoModifications: [
      {
        // Dark Raiders: all HERETIC ASTARTES Renegade Space Marine models have +1 DICE to all Dash Success Rolls
        unitIds: ['ha_chaos_lord', 'ha_chaos_sorcerer', 'ha_chaos_cultist', 'ha_chaos_space_marine', 'ha_chaos_terminator'],
        addAbilities: [{
          id: 'rsm_dark_raiders',
          name: 'Dark Raiders — +1 DICE to Dash',
          description: '+1 DICE to all Dash Success Rolls (replaces Dark Pacts ability).',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Counts as an Outlaw Warband instead of a Chaos Warband.',
      'No Dark Pacts. All HERETIC ASTARTES models have +1 DICE to all Dash Success Rolls instead.',
      'Patron must be the Pirate Lord Shared Patron.',
      'Cannot recruit Dark Apostles, Warpsmiths, Possessed, or Helbrutes.',
      'Cannot purchase any Marks of Chaos.',
      'Psychic powers drawn from the Adeptus Astartes Librarius Psychic Discipline.',
      'Can recruit 1 Renegade Apothecary as an Elite (70 credits + armour).',
    ],
  },
  {
    id: 'thousand_sons',
    name: 'Thousand Sons',
    description: 'Sorcerers of Tzeentch and their enthralled Rubric Marines marching to the will of Magnus.',
    quote: 'MAGNUS DID NOTHING WRONG.',
    noDarkPacts: true,
    requiredPatron: 'Tzeentch (Shared Patron)',
    // Exalted: cannot include Chaos Lords, Dark Apostles, Warpsmiths, Raptors, or Possessed.
    // Also hide all other subfaction-exclusive units.
    bannedUnitIds: [
      'ha_chaos_lord', 'ha_dark_apostle', 'ha_warpsmith', 'ha_possessed', // Exalted rule
      'ha_poxwalker', 'ha_foetid_blight_drone',            // Death Guard only
      'ha_lord_kakophonist',                                // Emperor's Children only
      'ha_renegade_apothecary',                             // Renegade Space Marines only
      'ha_master_of_executions', 'ha_slaughterbound',       // World Eaters only
    ],
    autoMark: {
      markId: 'mark_of_tzeentch',
      markName: 'Mark of Tzeentch',
      costOverride: 10,
      grantedKeywords: ['TZEENTCH'],
      eligibleUnitIds: ['ha_chaos_sorcerer', 'ha_chaos_cultist', 'ha_chaos_space_marine', 'ha_chaos_terminator', 'ha_helbrute'],
    },
    autoModifications: [
      {
        // Rubric Marines: all Chaos Space Marines move 5" instead of 6" and have NEGATE GAS
        unitIds: ['ha_chaos_space_marine'],
        movementDelta: -1,
        addKeywords: ['NEGATE GAS'],
        addAbilities: [{
          id: 'ts_rubric_marines',
          name: 'Rubric Marines',
          description: 'Movement is 5" instead of 6". When activated within 6" of a friendly PSYKER, +1 DICE to all Dash actions during that Activation. Has NEGATE GAS.',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Cannot include Chaos Lords, Dark Apostles, Warpsmiths, Raptors, or Possessed.',
      'All eligible models automatically have Mark of Tzeentch (+10 credits each).',
      'No Dark Pacts. Patron must be the Tzeentch Shared Patron.',
      'Discover the Arcane: replaces Dread Reputation; gather Arcane Points to unlock relics and powers.',
      'Rubric Marines: Chaos Space Marines have 5" speed but +1 DICE to Dash when within 6" of a PSYKER; NEGATE GAS.',
      'Warp Coven: can recruit up to 2 Chaos Sorcerers; must recruit 1 Exalted Sorcerer as leader.',
      'Can recruit Tzaangor Shaman (Elite) and Tzaangors (Troops).',
      'Can recruit a Sekhetar Robot as a Troop.',
      'Psychic Sorcerers may choose from Change Discipline, Vengeance Discipline, or Heretic Astartes Discipline.',
      'Optionally form a Changehost, recruiting Chaos Daemons troops.',
    ],
  },
  {
    id: 'word_bearers',
    name: 'Word Bearers',
    description: 'Devout worshippers of the Dark Gods who summon daemons to fight alongside them.',
    psychicDisciplineId: 'malefic_discipline',
    requiredPatron: 'Chaos Undivided (Shared Patron)',
    bannedUnitIds: [
      'ha_chaos_lord',                                      // The Faithful rule
      'ha_poxwalker', 'ha_foetid_blight_drone',            // Death Guard only
      'ha_lord_kakophonist',                                // Emperor's Children only
      'ha_renegade_apothecary',                             // Renegade Space Marines only
      'ha_exalted_sorcerer', 'ha_tzaangor_shaman',          // Thousand Sons only
      'ha_tzaangor', 'ha_sekhetar_robot',                   // Thousand Sons only
      'ha_master_of_executions', 'ha_slaughterbound',       // World Eaters only
    ],
    autoModifications: [
      {
        // Gal Vorbak: Possessed are upgraded — cost +10 credits and Ranged Skill +1
        unitIds: ['ha_possessed'],
        costModifier: 10,
        rangedSkillDelta: 1,
        addAbilities: [{
          id: 'wb_gal_vorbak',
          name: 'Gal Vorbak',
          description: '+10 credits. Ranged Skill +1. May be equipped with one one-handed ranged weapon. Up to 5 Gal Vorbak can be recruited.',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Cannot include a Chaos Lord. Must include at least 1 Dark Apostle or Chaos Sorcerer as Warband Leader (gains LEADER and TOUGH)',
      'Patron must be the Chaos Undivided Shared Patron.',
      'Blessed: can take up to 4 of each Mark of Chaos (except Mark of Darkness); Cultists can take Marks of Chaos.',
      'Gal Vorbak: Possessed are upgraded (+10 credits), gaining +1 Ranged Skill and allowing a one-handed ranged weapon. Can recruit up to 5.',
      'Uses the Malefic Psychic Discipline instead of the Heretic Astartes Discipline.',
      'Malefic powers include Cursed Earth, Incursion (daemon summoning), Infernal Power, Mutated Invigoration, Possession, Sacrifice.',
    ],
  },
  {
    id: 'world_eaters',
    name: 'World Eaters',
    description: "Khorne's berserkers who know only slaughter, harvesting skulls for the Blood God.",
    noDarkPacts: true,
    requiredPatron: 'Khorne (Shared Patron)',
    bannedUnitIds: [
      'ha_chaos_sorcerer', 'ha_warpsmith',                  // Martial Power rule
      'ha_poxwalker', 'ha_foetid_blight_drone',            // Death Guard only
      'ha_lord_kakophonist',                                // Emperor's Children only
      'ha_renegade_apothecary',                             // Renegade Space Marines only
      'ha_exalted_sorcerer', 'ha_tzaangor_shaman',          // Thousand Sons only
      'ha_tzaangor', 'ha_sekhetar_robot',                   // Thousand Sons only
      'ha_raptor', 'ha_havoc',                              // Martial Power rule
    ],
    autoMark: {
      markId: 'mark_of_khorne',
      markName: 'Mark of Khorne',
      costOverride: 10,
      grantedKeywords: ['KHORNE'],
      eligibleUnitIds: ['ha_chaos_lord', 'ha_dark_apostle', 'ha_chaos_cultist', 'ha_chaos_space_marine', 'ha_possessed', 'ha_chaos_terminator', 'ha_helbrute'],
    },
    autoModifications: [
      {
        // Butcher's Nails: Blood Surge ability (ranged restriction: Pistols/THROWN weapons/Blood Harpoons only)
        unitIds: ['ha_chaos_lord', 'ha_chaos_cultist', 'ha_chaos_space_marine', 'ha_chaos_terminator'],
        addAbilities: [{
          id: 'we_butchers_nails',
          name: "Butcher's Nails — Blood Surge",
          description: 'When this model Charges, roll 2D6 instead of 1D6 and add the highest die to its charge move. Cannot be equipped with ranged weapons besides Pistols, THROWN weapons, and Blood Harpoons.',
          cost: 0,
        }],
      },
      {
        // Eightbound: Possessed cost +10cr, Mutated Claw → Mutated Chainblade, Beacon of Rage
        unitIds: ['ha_possessed'],
        costModifier: 10,
        replaceDefaultWargear: {
          removeId: 'ha_mutated_claw',
          addItem: {
            id: 'we_mutated_chainblade',
            name: 'Mutated Chainblade (Eightbound)',
            description: 'Melee, CRITICAL, RISKY, SHRAPNEL',
            cost: 0,
          },
        },
        addAbilities: [{
          id: 'we_beacon_of_rage',
          name: 'Beacon of Rage (Eightbound)',
          description: 'The Eightbound and each of its allies within 3" of it have +1 DICE to Hit any enemy that has 1 or more BLOOD MARKERS.',
          cost: 0,
        }],
      },
      {
        // Jakhals: Chaos Cultists automatically become Jakhals — +1" movement, +1 Melee Skill, Chain Blades/Glaives, +10cr
        unitIds: ['ha_chaos_cultist'],
        costModifier: 10,
        movementDelta: 1,
        addAbilities: [{
          id: 'we_jakhals',
          name: 'Jakhal',
          description: 'Automatically applied (World Eaters). +1" movement speed, +1 Melee Skill, can use Chain Blades and Chain Glaives (+10 credits). Up to half (rounded up) can be further upgraded to Goremongers (+5 credits, INFILTRATOR and SKIRMISHER keywords).',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Cannot include Chaos Sorcerers, Warpsmiths, Raptors, or Havocs.',
      'All eligible models automatically have Mark of Khorne (+10 credits each).',
      'No Dark Pacts. Patron must be the Khorne Shared Patron.',
      'The Skull Harvest: replaces Dread Reputation; Elite models gain Claimed Skulls and offer them to Khorne for XP and Glory.',
      "Butcher's Nails: Chaos Lord, Cultists (Jakhals/Goremongers), Chaos Space Marines, and Chaos Terminators gain Blood Surge (2D6 charge, take highest) but cannot use ranged weapons besides Pistols, THROWN weapons, and Blood Harpoons.",
      'Eightbound: Possessed are upgraded (+10 credits) with Mutated Chainblades (CRITICAL, RISKY, SHRAPNEL) and Beacon of Rage.',
      'Jakhals: Cultists get +1" movement, +1 Melee Skill, Chain Blades/Glaives (+10 credits). Up to half can be Goremongers with INFILTRATOR and SKIRMISHER (+5 credits).',
      'Can recruit a Master of Executions and a Slaughterbound as Elites.',
      'Adds Chain Glaives (up to 4), Axe of Dismemberment, Blood Harpoon, Heavy Chain Weapon.',
      'Optionally form a Daemonkin Warband, recruiting Chaos Daemons troops.',
    ],
  },
];

// ─── Chaos Daemons Warband Variants ────────────────────────────────────────────

const CHAOS_DAEMONS_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Mixed)',
    description: 'A mixed Chaos Daemons warband drawing from multiple Legions.',
    rules: [
      'Can recruit from any Legion (Blood, Excess, Plague, Scintillating).',
      'Leader keyword determines which opposing Legion is forbidden.',
      'Uses the Chaos Daemons disciplines: Soulstain, Warprot, and Tzeentch.',
    ],
  },
  {
    id: 'followers_of_khorne',
    name: 'Followers of Khorne',
    description: 'A pure Khorne warband dedicated to the Blood God alone.',
    requiredPatron: 'Khorne (Shared Patron)',
    rules: [
      'Khorne Alone: cannot take models without the KHORNE Keyword.',
      'Khorne Disciples: can take Heretic Astartes models with KHORNE Mark as Mercenaries.',
      'No psychic powers — Khorne despises all sorcery.',
    ],
  },
  {
    id: 'followers_of_nurgle',
    name: 'Followers of Nurgle',
    description: 'A pure Nurgle warband spreading plague and decay.',
    requiredPatron: 'Nurgle (Shared Patron)',
    psychicDisciplineId: 'warprot',
    rules: [
      'Nurgle Alone: cannot take models without the NURGLE Keyword.',
      'Nurgle Disciples: can take Heretic Astartes models with NURGLE Mark as Mercenaries.',
      'Uses the Warprot Psychic Discipline.',
    ],
  },
  {
    id: 'followers_of_slaanesh',
    name: 'Followers of Slaanesh',
    description: 'A pure Slaanesh warband devoted to sensation and excess.',
    requiredPatron: 'Slaanesh (Shared Patron)',
    psychicDisciplineId: 'soulstain',
    rules: [
      'Slaanesh Alone: cannot take models without the SLAANESH Keyword.',
      'Slaanesh Disciples: can take Heretic Astartes models with SLAANESH Mark as Mercenaries.',
      'Uses the Soulstain Psychic Discipline.',
    ],
  },
  {
    id: 'followers_of_tzeentch',
    name: 'Followers of Tzeentch',
    description: 'A pure Tzeentch warband weaving the webs of fate.',
    requiredPatron: 'Tzeentch (Shared Patron)',
    psychicDisciplineId: 'tzeentch_discipline',
    rules: [
      'Tzeentch Alone: cannot take models without the TZEENTCH Keyword.',
      'Tzeentch Disciples: can take Heretic Astartes models with TZEENTCH Mark as Mercenaries.',
      'Uses the Tzeentch Psychic Discipline.',
    ],
  },
  {
    id: 'followers_of_vashtor',
    name: 'Followers of Vashtor',
    description: 'An Undivided warband aligned with the Dark Mechanicum Heretek Lord.',
    requiredPatron: 'Heretek Lord (Shared Patron)',
    rules: [
      'Aligned With Heretek: Warband Leader must have the UNDIVIDED Keyword. Patron must be a Heretek Lord.',
      'Hellforged: DAEMON models in your Warband have the ARTIFICIAL Keyword.',
      'Access to Dark Mechanicum-aligned weapons and upgrades.',
    ],
  },
];

// ─── Adepta Sororitas Warband Variants ─────────────────────────────────────────

const ADEPTA_SORORITAS_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Standard)',
    description: 'A standard Adepta Sororitas warband with no special doctrine.',
    rules: [
      'Standard Adepta Sororitas army rules apply.',
      'Uses the Miracles and Sacred Martyrdom special rules.',
    ],
  },
  {
    id: 'army_of_faith',
    name: 'Army of Faith',
    description: 'A jump-pack focused warband that descends from the heavens in a blaze of glory.',
    rules: [
      'The Faithful: cannot take Penitent Engines; max 2 Repentia.',
      'Angelic Descent: max 1 Retributor and 1 Sacrosant, but up to 3 Seraphim and 3 Zephyrim.',
      'Blinding Radiance: spend 1 Miracle to give -1 DICE to Hit against a model with a Jump Pack.',
      'Shield of Faith: spending a Miracle on an Injury roll grants the model additional -1 Armour for that roll.',
    ],
  },
  {
    id: 'hallowed_martyrs',
    name: 'Hallowed Martyrs',
    description: 'A warband that draws strength from sacrifice, gaining Miracles as sisters fall.',
    rules: [
      'Holy Charge: cannot upgrade Battle Sisters to Retributors or Seraphim.',
      'Blood of Martyrs: earn 1 Miracle each time a non-Elite SORORITAS model is taken Out of Action.',
      'Spirit of the Martyr: spend 1 Miracle when a SORORITAS model is taken Out of Action to allow it one free melee attack first.',
      'Divine Intervention: spend 3 Miracles when an ELITE SORORITAS model is taken Out of Action to treat it as a Down result instead.',
    ],
  },
  {
    id: 'penitent_host',
    name: 'Penitent Host',
    description: 'A warband built on squads of Repentia and Penitent Engines seeking redemption through death.',
    rules: [
      'Repentia Superior: Canoness replaces The Passion with Overseer of Redemption ability.',
      'Penitents: can recruit any number of Repentia and up to 2 Penitent Engines.',
      'Vows of Atonement: replaces Miracles with a choice each Turn among Absolution in Battle, Death Before Disgrace, or The Path of the Penitent.',
      'Penitent Flock: replaces Sacred Martyrdom and Saint Potentia with Rally the Flock (from Adeptus Ministorum).',
    ],
  },
];

// ─── Adeptus Astartes Chapter Variants ─────────────────────────────────────────

const ADEPTUS_ASTARTES_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Chapter (Standard)',
    description: 'A standard Space Marine warband with no specific chapter rules.',
    rules: [
      'And They Shall Know No Fear: your ASTARTES models have NEGATE FEAR (they ignore the FEAR Keyword effect).',
      'Uses the Librarius Psychic Discipline.',
    ],
  },
  {
    id: 'black_templars',
    name: 'Black Templars',
    description: 'Zealous crusaders who hate psykers and charge without hesitation.',
    bannedUnitIds: ['aa_librarian'],
    unitMaxCountOverrides: { aa_vanguard: 1 },
    rules: [
      'Templar Vows: replaces And They Shall Know No Fear. At battle start choose one Vow: Suffer Not the Unclean to Live / Uphold the Honour of the Emperor / Abhor the Witch Destroy the Witch / Accept Any Challenge No Matter the Odds.',
      'Sword Brethren: can upgrade 2 additional Astartes to Bladeguards; max 1 Vanguard.',
      'Distrust of Psykers: cannot recruit any Librarians.',
    ],
  },
  {
    id: 'blood_angels',
    name: 'Blood Angels',
    description: 'Noble warriors cursed with the Red Thirst and the Black Rage, fighting with unmatched ferocity.',
    psychicDisciplineId: 'sanguinary',
    unitMaxCountOverrides: { aa_vanguard: 1 },
    rules: [
      'The Red Thirst: replaces And They Shall Know No Fear. During a Charge activation, all non-Dreadnought ASTARTES models have +1 INJURY DICE in melee against targets with BLOOD MARKERS.',
      'The Black Rage: cannot upgrade models to Primaris at death or Scar. Instead, models can fall to the Black Rage, becoming Death Company with new rules.',
      'Upon Wings of Fire: can upgrade 2 additional Astartes to Assault Marines; max 1 Vanguard.',
      'Uses the Sanguinary Psychic Discipline (chapter-specific powers).',
    ],
  },
  {
    id: 'dark_angels',
    name: 'Dark Angels',
    description: 'Secretive Unforgiven who hunt Fallen with Deathwing Terminators and Ravenwing bikers.',
    psychicDisciplineId: 'interromancy',
    unitMaxCountOverrides: { aa_vanguard: 1 },
    rules: [
      'The Unforgiven: do NOT benefit from And They Shall Know No Fear.',
      'Deathwing: can recruit up to 3 Terminators (4 in 1200+ credit warbands), and purchase up to 2 suits of Terminator Armour for Elite models.',
      'Ravenwing: can purchase up to 4 Astartes Bikes; up to 2 Elites can be equipped with them.',
      'Bladeguard Veterans: can upgrade 2 additional Astartes to Bladeguard; max 1 Vanguard.',
      'Implacable: Dreadnoughts have +1 INJURY DICE with melee attacks against models with the TOUGH Keyword.',
      'Adds Watcher in the Dark (5 credits) to battlekit.',
      'Uses the Interromancy Psychic Discipline (chapter-specific powers).',
    ],
  },
  {
    id: 'deathwatch',
    name: 'Deathwatch',
    description: 'Multi-chapter xenos hunters armed with exotic Special Issue Ammunition.',
    bannedUnitIds: ['aa_scout_marine'],
    psychicDisciplineId: 'xenopurge',
    rules: [
      'Special Issue Ammunition: replaces And They Shall Know No Fear. Non-Dreadnought ASTARTES can equip up to two AMMUNITION types.',
      '8 ammo types: Derevenant Shells, Dragonfire Bolts, Hellfire Rounds, Inertial Fusion Bolts, Kraken Bolts, Metal Storm Shells, Tempest Bolts, Thermic Acceleration Rounds.',
      'Inquisition Loyalty: can recruit Inquisition models.',
      'Veterans: cannot recruit Scout Marines.',
      'Uses the Xenopurge Psychic Discipline and Deathwatch-exclusive battlekit.',
    ],
  },
  {
    id: 'grey_knights_chapter',
    name: 'Grey Knights',
    description: 'The secret daemon-hunters of the Imperium, every battle-brother a powerful psyker.',
    bannedUnitIds: ['aa_scout_marine'],
    psychicDisciplineId: 'dominus',
    autoModifications: [
      {
        // Brotherhood of Psykers: all non-PSYKER ASTARTES gain PSYKER 1
        unitIds: ['aa_captain', 'aa_apothecary', 'aa_chaplain', 'aa_space_marine', 'aa_terminator'],
        addKeywords: ['PSYKER 1'],
        addAbilities: [{
          id: 'gk_brotherhood_of_psykers',
          name: 'Brotherhood of Psykers',
          description: 'Replaces And They Shall Know No Fear. This model gains PSYKER 1 — it can attempt to use Psychic powers and Deny the Witch.',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Brotherhood of Psykers: replaces And They Shall Know No Fear. ASTARTES without PSYKER gain PSYKER 1.',
      'Daemonic Nemesis: extensive campaign system for hunting daemons.',
      'Inquisition Loyalty, Master Psyker, Terminator Brotherhood, Boots on the Ground, Completed Trials, First Born.',
      'Uses the Dominus and Sanctus Psychic Disciplines plus Specialized Arsenal.',
      'Access to Grey Knights-exclusive battlekit.',
    ],
  },
  {
    id: 'imperial_fists',
    name: 'Imperial Fists',
    description: 'Master builders and siege specialists, their armour impervious.',
    psychicDisciplineId: 'geokinesis',
    unitMaxCountOverrides: { aa_vanguard: 1 },
    rules: [
      'Architects of War: replaces And They Shall Know No Fear. -1 to Armour for your ASTARTES models has IMPERVIOUS.',
      'Legacy of Dorn: unique campaign system.',
      'Uses the Geokinesis Psychic Discipline (chapter-specific powers).',
    ],
  },
  {
    id: 'iron_hands',
    name: 'Iron Hands',
    description: 'Cold and mechanical warriors who embrace cybernetics above all else.',
    psychicDisciplineId: 'technomancy',
    rules: [
      'Technical Minded: replaces And They Shall Know No Fear. Can purchase Cyberteknika at reduced prices (Cranial 5/Ocular 10/Sindexterous 10/Motive 5/Torsonic 25/Vascular 20).',
      'Techmarines: can recruit additional Techmarines.',
      'Calculated Fury: unique ability.',
      'Uses the Technomancy Shared Discipline.',
      'Access to Servo-Skull battlekit.',
    ],
  },
  {
    id: 'legion_of_the_damned',
    name: 'Legion of the Damned',
    description: 'Ghostly warriors who materialise to aid embattled defenders and then vanish.',
    bannedUnitIds: ['aa_terminator', 'aa_dreadnought'],
    autoModifications: [
      {
        // Burning Specters: all recruitable ASTARTES have NEGATE FEAR and NEGATE FIRE (Terminators/Dreadnoughts are banned)
        unitIds: ['aa_captain', 'aa_apothecary', 'aa_chaplain', 'aa_librarian', 'aa_space_marine', 'aa_scout_marine'],
        addKeywords: ['NEGATE FEAR', 'NEGATE FIRE'],
        addAbilities: [{
          id: 'lotd_burning_specters',
          name: 'Burning Specters',
          description: 'Replaces And They Shall Know No Fear. This model has NEGATE FEAR (ignores the FEAR Keyword effect) and NEGATE FIRE (ignores the FIRE Keyword effect).',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Apparitions: replaces And They Shall Know No Fear. Up to half of non-VEHICLE ASTARTES gain DEEP STRIKE at battle start.',
      'Eternal: special rules for the undying Legionnaires.',
      'Legionnaires: cannot take Terminators or Dreadnoughts.',
      'Burning Specters: all ASTARTES have NEGATE FEAR and NEGATE FIRE.',
      'Mysterious: cannot recruit any Mercenaries.',
    ],
  },
  {
    id: 'raven_guard',
    name: 'Raven Guard',
    description: 'Masters of stealth who strike from the shadows with jump pack-equipped warriors.',
    psychicDisciplineId: 'umbramancy',
    unitMaxCountOverrides: { aa_devastator: 1, aa_assault_marine: 4 },
    wargearKeywordGrants: { 'jump_pack': ['DEEP STRIKE'] },
    autoModifications: [
      {
        // Surgical Strikes: all non-VEHICLE ASTARTES — gain DEEP STRIKE when equipped with a Jump Pack
        unitIds: ['aa_captain', 'aa_apothecary', 'aa_chaplain', 'aa_librarian', 'aa_space_marine', 'aa_scout_marine'],
        addAbilities: [{
          id: 'rg_surgical_strikes',
          name: 'Surgical Strikes',
          description: 'Replaces And They Shall Know No Fear. While equipped with a Jump Pack, this model gains the DEEP STRIKE Keyword and can be deployed using the Surgical Strike (Deep Strike) ability.',
          cost: 0,
        }],
      },
      {
        // On Darkened Wings: force org rule — 2 extra Assault Marines allowed, max 1 Devastator
        unitIds: ['aa_space_marine'],
        addAbilities: [{
          id: 'rg_on_darkened_wings',
          name: 'On Darkened Wings',
          description: 'You can upgrade 2 additional Astartes to Assault Marines (beyond the normal limit), but you can upgrade only 1 Astartes to a Devastator.',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Surgical Strikes: replaces And They Shall Know No Fear. ASTARTES with Jump Packs gain DEEP STRIKE.',
      'On Darkened Wings: can upgrade 2 additional Astartes to Assault Marines, but only 1 can be a Devastator.',
      'Uses the Umbramancy Psychic Discipline (chapter-specific powers).',
    ],
  },
  {
    id: 'salamanders',
    name: 'Salamanders',
    description: 'Fire-worshippers immune to flame who specialise in melta and flamer weapons.',
    psychicDisciplineId: 'pyromancy',
    autoModifications: [
      {
        // Promethean Cult: all ASTARTES have NEGATE FIRE
        unitIds: ['aa_captain', 'aa_apothecary', 'aa_chaplain', 'aa_librarian', 'aa_space_marine', 'aa_terminator', 'aa_dreadnought', 'aa_scout_marine'],
        addKeywords: ['NEGATE FIRE'],
        addAbilities: [{
          id: 'sal_promethean_cult',
          name: 'Promethean Cult',
          description: 'Replaces And They Shall Know No Fear. This model has NEGATE FIRE — it ignores all effects of the FIRE Keyword on weapons and hazards.',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Promethean Cult: replaces And They Shall Know No Fear. All ASTARTES have NEGATE FIRE.',
      'Land-Bound: cannot upgrade any Astartes to Assault Troopers.',
      'Uses the Pyromancy Shared Discipline.',
      'Expanded armoury: Flamers, Heavy Flamers, Melta Guns, Multi Melta, Incendiary Grenades.',
    ],
  },
  {
    id: 'space_wolves',
    name: 'Space Wolves',
    description: 'Fierce warriors of Fenris who fight alongside wolves and use the Tempestas discipline.',
    bannedUnitIds: ['aa_scout_marine'],
    psychicDisciplineId: 'tempestas',
    unitMaxCountOverrides: { aa_vanguard: 0, aa_assault_marine: 0, aa_bladeguard: 0 },
    rules: [
      'Sagas: replaces And They Shall Know No Fear. Whenever a model scores a Glorious Deed or takes an enemy ELITE Out of Action, it has +1 DICE to all attacks until end of battle.',
      'Wolf Priest: unique Elite model.',
      'Wolves of Winter: cannot recruit Scout Marines, cannot upgrade Astartes to Assault Marines/Bladeguard/Devastators/Vanguards, and cannot purchase Astartes Bikes. Can instead recruit up to 3 Fenrisian Wolves and 3 Wulfen; up to half of Astartes can wear Standard Armour instead of Power Armour.',
      'Berserk Charge: +1 DICE to Hit when making melee attacks during a Charge activation.',
      'Headstrong: must Charge the closest visible enemy when Charging.',
      'Uses the Tempestas Psychic Discipline (chapter-specific powers).',
    ],
  },
  {
    id: 'white_scars',
    name: 'White Scars',
    description: 'Swift cavalry warriors who prize their bike squadrons above all.',
    psychicDisciplineId: 'stormspeaking',
    rules: [
      'Devastating Charge: replaces And They Shall Know No Fear. Astartes Bikes that successfully Charge give one enemy a BLOOD MARKER.',
      'Biker Phalanx: can purchase up to 6 Astartes Bikes.',
      'Uses the Stormspeaking Psychic Discipline (chapter-specific powers).',
    ],
  },
];

// ─── Adeptus Mechanicus Warband Variants ───────────────────────────────────────

const ADEPTUS_MECHANICUS_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Standard)',
    description: 'A standard Adeptus Mechanicus warband.',
    rules: [
      'Standard Adeptus Mechanicus army rules apply.',
      'Uses the Technomancy Psychic Discipline.',
    ],
  },
  {
    id: 'dark_mechanicum_variant',
    name: 'Dark Mechanicum',
    description: 'Heretek Tech-Priests who have turned to Chaos, twisting machines with daemonic power.',
    requiredPatron: 'Heretek Lord (Shared Patron)',
    rules: [
      'Hereteks: counts as a Chaos Warband. Patron must be the Heretek Lord Shared Patron.',
      'Dark Soldiers: max 4 Skitarii and 1 Sicarian; can include any number of Servitors.',
      'Scyllax Horrors: can include up to 2 Scyllax Automata (DAEMON/FEAR/STEALTH/ARTIFICIAL) as Troops.',
      'Daemon Engines: Kataphrons and Kastelan Robots gain the DAEMON Keyword.',
    ],
  },
  {
    id: 'data_psalm_conclave',
    name: 'Data-Psalm Conclave',
    description: 'A Cult Mechanicus warband of Tech-Priests and their Servitor thralls.',
    requiredPatron: 'Fabricator Locum',
    bannedUnitIds: ['amec_skitarii_marshal', 'amec_skitarii', 'amec_sicarian', 'amec_kataphron'],
    rules: [
      'Cult Mechanicus: cannot include Skitarii Marshals, Skitarii, Sicarians, or Kataphrons. Patron must be a Fabricator Locum.',
      'Priests of Mars: can include up to 3 Tech-Priests.',
      'Servitor Soldiers: unlimited Servitors without the Expendable ability.',
      'Tech-Thralls: can recruit unlimited Tech-Thralls as Troops.',
      'Battle Priests: can recruit up to 3 Myrmidons as Troops.',
    ],
  },
  {
    id: 'skitarii_hunter_cohort',
    name: 'Skitarii Hunter Cohort',
    description: 'An elite Skitarii strike force without Tech-Priest oversight.',
    requiredPatron: 'Skitarii Overseer',
    bannedUnitIds: ['amec_dominus', 'amec_tech_priest', 'amec_servitor', 'amec_electro_priest', 'amec_kastelan_robot'],
    rules: [
      'Skitarii Alone: cannot include Dominus, Tech-Priests, Servitors, Electro-Priests, or Kastelan Robots. Patron must be Skitarii Overseer.',
      'Sicarian Princeps: must include at least 1 Sicarian; one is a Princeps (+20 credits, +2 Ranged, +2 Melee, LEADER/TOUGH).',
      "Officer's Guards: can include up to 2 Skitarii Huscarls as special troops.",
      'Kataphron Heavy Support: can include up to 2 Kataphrons.',
      'Skitarii Special Arms: adds Shields and 6 unique weapons to armoury.',
    ],
  },
];

// ─── Cross-Faction Unit Helpers ────────────────────────────────────────────────
// These helper units are used as extraUnits in subfactions that recruit from other factions.

// ── Adepta Sororitas units (Ministorum Ecclesiastic + Inquisition Hereticus) ──
const min_dogmata: UnitOption = { ...as_dogmata, maxCount: 1, description: 'Ecclesiastic/Hereticus only. Max 1 (or 0–1 Palatine instead).' };
const min_palatine: UnitOption = { ...as_palatine, maxCount: 1, description: 'Ecclesiastic/Hereticus only. Max 1 (or 0–1 Dogmata instead).' };
const min_battle_sister: UnitOption = { ...as_battle_sister, maxCount: 4, description: 'Ecclesiastic only. Up to 4 Battle Sisters (max 1 Retributor, 1 Sacresant, 1 Seraphim/Zephyrim).' };
const min_battle_sister_hereticus: UnitOption = { ...as_battle_sister, id: 'as_battle_sister_heret', maxCount: 3, description: 'Ordo Hereticus only. Up to 3 Battle Sisters (max 1 Retributor, 1 Seraphim/Zephyrim).' };
const min_repentia_3: UnitOption = { ...as_repentia, maxCount: 3, description: 'Ecclesiastic only. Up to 3 Repentia.' };
const min_repentia_4: UnitOption = { ...as_repentia, id: 'as_repentia_heret', maxCount: 4, description: 'Ordo Hereticus only. Up to 4 Repentia.' };
const min_penitent_engine: UnitOption = { ...as_penitent_engine, maxCount: 1, description: 'Ecclesiastic only. Up to 1 Penitent Engine (not alongside a Miraculist).' };

// ── Adeptus Astartes units (Inquisition Malleus / Xenos) ──────────────────────
const inq_gk_chaplain: UnitOption = { ...aa_chaplain, id: 'aa_chaplain_malleus', maxCount: 1, description: 'Ordo Malleus only. Grey Knights Chaplain (max 1, choose Chaplain OR Librarian).' };
const inq_gk_librarian: UnitOption = { ...aa_librarian, id: 'aa_librarian_malleus', maxCount: 1, description: 'Ordo Malleus only. Grey Knights Librarian (max 1, choose Chaplain OR Librarian).' };
const inq_gk_astartes: UnitOption = { ...aa_space_marine, id: 'aa_space_marine_malleus', maxCount: 2, description: 'Ordo Malleus only. Grey Knights Astartes. Up to 2.' };
const inq_gk_terminator: UnitOption = { ...aa_terminator, id: 'aa_terminator_malleus', maxCount: 1, description: 'Ordo Malleus only. Grey Knights Terminator. Up to 1.' };
const inq_dw_apothecary: UnitOption = { ...aa_apothecary, id: 'aa_apothecary_xenos', maxCount: 1, description: 'Ordo Xenos only. Deathwatch Apothecary (max 1, choose Apothecary OR Chaplain).' };
const inq_dw_chaplain: UnitOption = { ...aa_chaplain, id: 'aa_chaplain_xenos', maxCount: 1, description: 'Ordo Xenos only. Deathwatch Chaplain (max 1, choose Chaplain OR Apothecary).' };
const inq_dw_astartes: UnitOption = { ...aa_space_marine, id: 'aa_space_marine_xenos', maxCount: 4, description: 'Ordo Xenos only. Deathwatch Astartes. Up to 4.' };

// ── Necromunda Gang units (Inquisition Ordo Minoris) ──────────────────────────
const inq_arb_sergeant: UnitOption = { ...ng_gang_leader, id: 'ng_gang_leader_minoris', maxCount: 1, description: 'Ordo Minoris only. Arbites Sergeant (Gang Leader). Max 1.' };
const inq_arb_patrolman: UnitOption = { ...ng_ganger, id: 'ng_ganger_minoris', maxCount: 5, description: 'Ordo Minoris only. Arbites Patrolman (Ganger). Up to 5.' };
const inq_arb_rookie: UnitOption = { ...ng_juve, id: 'ng_juve_minoris', maxCount: 5, description: 'Ordo Minoris only. Arbites Rookie (Juve). Up to 5.' };
const inq_arb_mastiff: UnitOption = { ...ng_cyber_mastiff, id: 'ng_cyber_mastiff_minoris', maxCount: 2, description: 'Ordo Minoris only. Hardcase Cyber Mastiff. Up to 2.' };
const inq_arb_sanctioner: UnitOption = { ...ng_sanctioner_automata, id: 'ng_sanctioner_minoris', maxCount: 1, description: 'Ordo Minoris only. Sanctioner Automata. Up to 1.' };

// ── Drukhari + Harlequins units (Ynnari) ──────────────────────────────────────
const yn_dr_archon: UnitOption = { ...dr_archon, id: 'dr_archon_ynnari', maxCount: 1, description: 'Ynnari only. Drukhari Archon (shares Elite slot with Troupe Master/own Autarch; max 1 of each).' };
const yn_dr_incubus: UnitOption = { ...dr_incubus, id: 'dr_incubus_ynnari', maxCount: 2, description: 'Ynnari only. Drukhari Incubi. Up to 2.' };
const yn_dr_wych: UnitOption = { ...dr_wych, id: 'dr_wych_ynnari', maxCount: 2, description: 'Ynnari only. Drukhari Wyches. Up to 2.' };
const yn_dr_reaver: UnitOption = { ...dr_reaver, id: 'dr_reaver_ynnari', maxCount: 2, description: 'Ynnari only. Drukhari Reavers. Up to 2.' };
const yn_hq_troupe_master: UnitOption = { ...hq_troupe_master, id: 'hq_troupe_master_ynnari', maxCount: 1, description: 'Ynnari only. Harlequin Troupe Master (shares Elite slot; max 1 of each leader type).' };
const yn_hq_player: UnitOption = { ...hq_player, id: 'hq_player_ynnari', maxCount: 2, description: 'Ynnari only. Harlequin Players. Up to 2.' };
const yn_hq_death_jester: UnitOption = { ...hq_death_jester, id: 'hq_death_jester_ynnari', maxCount: 1, description: 'Ynnari only. Harlequin Death Jester. Up to 1.' };
const yn_hq_shadowseer: UnitOption = { ...hq_shadowseer, id: 'hq_shadowseer_ynnari', maxCount: 1, description: 'Ynnari only. Harlequin Shadowseer. Up to 1.' };
const yn_hq_skyweaver: UnitOption = { ...hq_skyweaver, id: 'hq_skyweaver_ynnari', maxCount: 2, description: 'Ynnari only. Harlequin Skyweavers. Up to 2.' };

// ─── Adeptus Ministorum Warband Variants ──────────────────────────────────────

const ADEPTUS_MINISTORUM_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Standard)',
    description: 'A standard Adeptus Ministorum warband.',
    rules: [
      'Standard Adeptus Ministorum army rules apply.',
      'Battle Hymns, Rally the Flock, Orators special rules.',
    ],
  },
  {
    id: 'ecclesiastic_militant_force',
    name: 'Ecclesiastic Militant Force',
    description: 'A force augmented with Adepta Sororitas warriors fighting under the Ministorum banner.',
    bannedUnitIds: ['min_crusader', 'min_death_cult_assassin', 'min_drill_abbot'],
    extraUnits: [
      min_dogmata,
      min_palatine,
      min_battle_sister,
      min_repentia_3,
      min_penitent_engine,
    ],
    rules: [
      'Sororitas Support: can recruit up to 1 Dogmata or Palatine, up to 4 Battle Sisters (max 1 Retributor, 1 Sacrosant, 1 Seraphim/Zephyrim), and up to 3 Repentia.',
      'Can also recruit up to 1 Penitent Engine (but not alongside a Miraculist).',
      'Fervor: Battle Hymns apply to SORORITAS models; Palatine Rapturous Blows works as if discarding a Miracle when near an ORATOR.',
      'Decree Passive: cannot recruit Crusaders, Death Cult Assassins, or Drill Abbots.',
    ],
  },
];

// ─── Astra Militarum Warband Variants ─────────────────────────────────────────

const ASTRA_MILITARUM_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Standard)',
    description: 'A standard Astra Militarum regiment.',
    rules: [
      'Standard Astra Militarum army rules apply.',
      'Voice of Command, Drop Troopers, and Psykana Discipline available.',
    ],
  },
  {
    id: 'catachan_jungle_fighters',
    name: 'Catachan Jungle Fighters',
    description: 'Brutal jungle warriors with unmatched melee skill and guerrilla expertise.',
    requiredPatron: 'Lord General Militant',
    bannedUnitIds: ['am_conscript', 'am_ratling_marksman'],
    unitMaxCountOverrides: { am_commissar: 1, am_ogryn: 1, am_veteran_guardsman: 7 },
    autoModifications: [
      {
        // Big Muscles: Primaris Psykers, Guardsmen, Veterans, and Heavy Weapons Squads have +1 Melee Skill (+5 credits each)
        unitIds: ['am_primaris_psyker', 'am_guardsman', 'am_veteran_guardsman', 'am_heavy_weapons_squad'],
        costModifier: 5,
        meleeSkillDelta: 1,
        addAbilities: [{
          id: 'cat_big_muscles',
          name: 'Big Muscles (Catachan)',
          description: '+1 Melee Skill (+5 credits). Catachan fighters are renowned for their raw physical power in close quarters.',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Big Muscles: Primaris Psykers, Guardsmen, Veteran Guardsmen, and Heavy Weapons Squads have +1 Melee Skill (+5 credits each). Cannot recruit Conscripts.',
      'Trap Setting: up to 3 Guardsmen can be upgraded to Trappers (+10 credits) with the Mine Layer ability.',
      "Jungle Stealth: instead of Drop Troopers, up to half of Veteran Guardsmen (rounded up) can be Hunters (+10 credits) with INFILTRATOR and STEALTH.",
      'Survivors: up to 2 Veteran Guardsmen can be Sergeants with the ELITE Keyword.',
      'Commissar Distrust: max 1 Commissar.',
      'Human Focus: no Ratlings; max 1 Ogryn. Patron must be a Lord General Militant.',
    ],
  },
  {
    id: 'death_korp_of_krieg',
    name: 'Death Korp of Krieg',
    description: 'Grim trench warfare specialists who gladly die for the Emperor.',
    requiredPatron: 'Lord General Militant',
    bannedUnitIds: ['am_ratling_marksman', 'am_ogryn'],
    unitMaxCountOverrides: { am_heavy_weapons_squad: 4 },
    rules: [
      'Born to Die: +1 DICE to all Morale tests.',
      'Entrenched: can recruit up to 4 Heavy Weapons Squads and take up to 2 Mortars.',
      'Sappers: cannot upgrade Veteran Guardsmen to Drop Troopers. Instead, up to 2 can be Sappers (+15 credits) with the Mine Layer ability.',
      'Krieg Alone: no Ratlings or Ogryn. Patron must be a Lord General Militant.',
    ],
  },
  {
    id: 'imperial_navy',
    name: 'Imperial Navy',
    description: 'Void-born Naval ratings armed with exotic Naval hardware.',
    requiredPatron: 'Lord Admiral',
    rules: [
      'Naval Authority: patron must be a Lord Admiral.',
      'Light Weaponry: max 1 Heavy Weapons Squad; no Heavy Bolters, Heavy Flamers, Mortars, Multi-Meltas, or Twin Heavy Stubbers.',
      'Naval Battlekit: can purchase Shields, Blasting Charges, C.A.T. Unit, Gheistskull Detonator, Void Armour.',
    ],
  },
  {
    id: 'ratling_regiment',
    name: 'Ratling Regiment',
    description: 'An entire warband of diminutive Ratlings living high on the hog.',
    bannedUnitIds: ['am_conscript'],
    rules: [
      'Chill Times: no Commissars or Conscripts.',
      'Light Weaponry: no Heavy Weapons Squads.',
      'All Ratlings: MILITARUM models (except Marksmen/Ogryn/Trailblazers/Battlemutts/Tankstoppers) have +1 Ranged Skill, -1 Melee Skill, SKIRMISHER, Clamber and Small abilities.',
      'Ratling Elites: can take up to 2 Ratling Trailblazers.',
      'Battlemutts: can recruit up to 2 Battlemutts.',
      'Ogryn Allies: can recruit up to 3 Ogryn.',
      'Tankstopper: can take 1 Ratling Tankstopper Mercenary as a Troop.',
      'Expensive Taste: earn D3x5 fewer credits when Exploring.',
    ],
  },
  {
    id: 'traitor_guard',
    name: 'Traitor Guard',
    description: 'Imperial Guard who have turned to Chaos, now fighting for the Dark Gods.',
    requiredPatron: 'Chaos Warlord or Chaos Undivided (Shared Patron)',
    psychicDisciplineId: 'hereticus',
    bannedUnitIds: ['am_commissar', 'am_conscript'],
    unitMaxCountOverrides: { am_ogryn: 1, am_ratling_marksman: 1, am_primaris_psyker: 2 },
    extraUnits: [
      {
        id: 'tg_enforcer', name: 'Enforcer', baseCost: 65, minCount: 0, maxCount: 1,
        stats: { movement: 6, rangedSkill: 1, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
        keywords: ['ELITE', 'MILITARUM', 'STRONG'],
        faction: 'astra_militarum', unitType: 'elite',
        description: 'Traitor Guard only (0-1 Elite). A brutal overseer who inspires allies through violence. Grueling Disciplinarian: can attack friendly models within 1"; when it causes a friendly to take BLOOD MARKERS or be taken OOA, one other friendly within 12" activates next with +1 DICE on all Success Rolls (and +1 INJURY DICE if OOA).',
        abilities: [{
          id: 'tg_grueling_disciplinarian',
          name: 'Grueling Disciplinarian',
          type: 'action' as const,
          description: 'The Enforcer can attack friendly models within 1" of it. Whenever it causes a friendly model to take 1 or more BLOOD MARKERS or takes a friendly model Out of Action, you can choose one other friendly model within 12" that has not yet activated this Turn. That model activates next with +1 DICE to all Success Rolls (and +1 INJURY DICE with all attacks if the friendly was taken Out of Action).',
        }],
        defaultWargear: [], availableWargear: [],
      },
      {
        id: 'tg_gor', name: 'Gor', baseCost: 45, minCount: 0, maxCount: 3,
        stats: { movement: 6, rangedSkill: 0, meleeSkill: 1, armourSave: 0, toughness: 'NORMAL' },
        keywords: ['BEASTMEN', 'LIMITED POTENTIAL', 'MILITARUM'],
        faction: 'astra_militarum', unitType: 'troop',
        description: 'Traitor Guard only (0-3 Troops). Beastmen fighters. Choose a Mutation when recruiting: Bloodgor (KHORNE, 2D6 charge), Fellgor (free melee attack when OOA), Pestigor (NURGLE, Down→Minor Hit, -1" move), Slaangor (SLAANESH, move 3" on first BLOOD MARKER each turn), Tzaangor (+1 Ranged, SKIRMISHER, TZEENTCH).',
        defaultWargear: [], availableWargear: [],
      },
    ],
    autoModifications: [
      {
        // Rogue Psykers: Primaris Psykers become PSYKER 2, gain PERILOUS keyword
        unitIds: ['am_primaris_psyker'],
        addKeywords: ['PSYKER 2', 'PERILOUS'],
        addAbilities: [{
          id: 'tg_power_unleashed',
          name: 'Rogue Psyker — Power Unleashed',
          description: 'This model is known as a Rogue Psyker. It has PSYKER 2 instead of PSYKER 1 and PERILOUS ±2 with all psychic powers. Uses the Hereticus Discipline instead of the Psykana Discipline.',
          cost: 0,
        }],
      },
    ],
    rules: [
      'Traitors: counts as a Chaos Warband. Patron must be Chaos Warlord or Chaos Undivided.',
      'Rule of Force: no Commissars or Conscripts; can recruit 1 Enforcer as an Elite.',
      'Rogue Psykers: Primaris Psykers become PSYKER 2 (can recruit 2); use Hereticus Discipline (Chaos Cult) instead of Psykana. Have PERILOUS ±2.',
      'Beastmen: can recruit up to 3 Gor as Troops (5 Mutation options: Bloodgor/Fellgor/Pestigor/Slaangor/Tzaangor).',
      'Hard to Corrupt: max 1 Ratling Marksman and 1 Ogryn.',
    ],
  },
];

// ─── The Inquisition Ordos ─────────────────────────────────────────────────────

const THE_INQUISITION_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Ordo (Standard)',
    description: 'A standard Inquisition warband without a specific Ordo affiliation.',
    rules: [
      'Standard Inquisition army rules apply.',
      'Access to Biomancy, Divination, Telepathy, Telekinesis, and Pyromancy disciplines.',
    ],
  },
  {
    id: 'ordo_hereticus',
    name: 'Ordo Hereticus',
    description: 'The witch-finders of the Inquisition, supported by Sisters of Battle.',
    extraUnits: [
      min_dogmata,
      min_palatine,
      min_battle_sister_hereticus,
      min_repentia_4,
    ],
    rules: [
      'Chamber Militant: Sisters of Battle. Can recruit up to 1 Dogmata or Palatine, up to 3 Battle Sisters (max 1 Retributor and 1 Seraphim/Zephyrim), and up to 4 Repentia.',
      'Miraculous Hunt: gains the Miracles special rule from the Adepta Sororitas Faction.',
    ],
  },
  {
    id: 'ordo_malleus',
    name: 'Ordo Malleus',
    description: 'Daemon hunters who fight alongside Grey Knights.',
    psychicDisciplineId: 'dominus',
    extraUnits: [
      inq_gk_chaplain,
      inq_gk_librarian,
      inq_gk_astartes,
      inq_gk_terminator,
    ],
    rules: [
      'Chamber Militant: Grey Knights. Can recruit up to 1 Chaplain or Librarian, up to 2 Astartes, and 1 Terminator using Grey Knights chapter rules.',
      'Access to Dominus and Sanctus Psychic Disciplines.',
      'Bound Daemonhost: can recruit up to 1 Daemonhost (unique model with psychic attacks and abilities).',
    ],
  },
  {
    id: 'ordo_xenos',
    name: 'Ordo Xenos',
    description: 'Alien hunters who fight alongside Deathwatch and wield xenos artefacts.',
    extraUnits: [
      inq_dw_apothecary,
      inq_dw_chaplain,
      inq_dw_astartes,
    ],
    rules: [
      'Chamber Militant: Deathwatch. Can recruit up to 1 Apothecary or Chaplain and up to 4 Astartes using Deathwatch chapter rules.',
      'Xenopurge Discipline: INQUISITION PSYKER models can choose the Xenopurge Discipline from Deathwatch.',
      'Xenos Artifacts: can purchase up to 4 unique xenos weapons (1 each) from Aeldari, Drukhari, Leagues of Votann, Necrons, and T\'au Empire armouries.',
      'Can purchase 1 item from Aeldari, Drukhari, Leagues of Votann, or T\'au Empire Campaign Shops.',
    ],
  },
  {
    id: 'ordo_minoris',
    name: 'Ordo Minoris',
    description: 'A broad mandate Inquisition force supported by Adeptus Arbites.',
    extraUnits: [
      inq_arb_sergeant,
      inq_arb_patrolman,
      inq_arb_rookie,
      inq_arb_mastiff,
      inq_arb_sanctioner,
    ],
    rules: [
      'Chamber Militant: Adeptus Arbites. Can recruit up to 1 Sergeant, 5 Patrolmen, 5 Rookies, 2 Hardcase Cyber Mastiffs, and 1 Sanctioner Automata from the Palanite Enforcers gang.',
      'Arbites recruits retain their Gang-specific rules and can equip from the Inquisition Armoury.',
    ],
  },
];

// ─── Necromunda Gang Gangs (selection required) ────────────────────────────────

const NECROMUNDA_GANG_SUBFACTIONS: SubFaction[] = [
  {
    id: 'ash_waste_nomads',
    name: 'Ash Waste Nomads',
    description: 'Desert wanderers who command mighty sand-skimmers and savage beasts of the wastes.',
    rules: [
      'Summoning: roll D6s (one per Elite) at battle start; spend dice to summon spirit creatures (Styr\'ghar/Dae\'ghar/Tyr/Char\'ghar/Vau\'ghar/Myr\'ghar on 1-6).',
      'Leader (Chieftain): Swift (+1" movement).',
      'Champions: Watcher (Accurate: +1 Ranged) or Stormcaller (Call the Storm: -1 DICE to ranged vs allies in 6").',
      'Gangers: Warriors. Juves: Scouts (upgradeable to Dust Runners: +2" movement).',
      'Beast Riders: cannot purchase Ridgerunners.',
      'Unique troops: Arthromite Duneskuttler, Arthromite Spinewyrm.',
    ],
  },
  {
    id: 'corpsegrinder_cult',
    name: 'Corpsegrinder Cult',
    description: 'Khorne-worshipping cannibals who invoke the Blood God for battle fury.',
    requiredPatron: 'Gang Overlord or Khorne (Shared Patron)',
    rules: [
      "Chaos Cult: counts as a Chaos Warband. Patron can be a Gang Overlord or Khorne Shared Patron.",
      'Blessed By The Lord Of Skin & Sinew: Risky Success Roll to invoke — success removes 1 BLOOD MARKER and grants +1 DICE to Hit/Injure in melee; failure means Injury chart.',
      'Leader (Butcher): First to the Fray (2D6 charge, use highest).',
      'Champions: Cutter (Dervish: ignores off-hand penalties) or Ripper (Powerful: STRONG).',
      'Gangers: Skinners. Juves: Initiates (upgradeable to Fresh Meat: Delicious ability).',
    ],
  },
  {
    id: 'house_cawdor',
    name: 'House Cawdor',
    description: 'Fanatical Chaos-aligned scavengers who fuel themselves with religious fervour called Miracles.',
    rules: [
      'Allegiance: choice of Imperial or Outlaw Warband at creation.',
      'Path of Faith: Miracle pool (0 at battle start); gain 1 for slaying an enemy Elite, losing own Elite, or passing Morale test. Spend as BLESSING MARKERS.',
      'Leader (Word-Keeper or Priest): The Path We Follow (Risky Success Roll to gain 1 Miracle).',
      'Champions: Deacon (strike on Charge) or Firebrand (Miracle on first kill per Turn).',
      'Gangers: Brethren. Juves: Bonepickers (upgradeable to Zealots: immune to FEAR).',
      'Ridge Walkers: cannot purchase Ridgerunners.',
      'Unique troops: Bomb Delivery Rat, Sheen Bird (FLYING), Stig-Shambler.',
    ],
  },
  {
    id: 'house_delaque',
    name: 'House Delaque',
    description: 'Silent shadow-dwellers whose entire gang is saturated with psychic potential.',
    rules: [
      'Allegiance: choice of Imperial or Outlaw Warband at creation.',
      'Psychoteric Choirs: +1 DICE to all PSYCHIC rolls while within 3" of another PSYKER ally.',
      'Leader (Master of Shadow): PSYKER 2 with 1 discipline (up to 4 powers), PERILOUS ±1.',
      'Champions: Nacht-Ghul (INFILTRATOR/STEALTH) or Phantom (PSYKER 1, up to 3 powers).',
      'Gangers: Ghosts. Juves: Shadows (upgradeable to Psy-Gheists: PSYKER 1, 2 powers).',
      '3 unique Psychic Disciplines: Darkness, Delusion, Madness.',
      'Unique creatures: Cephalopod Spektor, Piscean Spektor (PSYKER 1), Psychoterric Wyrm, Spyker (PSYKER 2/FLYING).',
    ],
  },
  {
    id: 'house_escher',
    name: 'House Escher',
    description: 'Fierce female warriors who master alchemical Chems and deadly combat.',
    rules: [
      'Allegiance: choice of Imperial or Outlaw Warband at creation.',
      'Chem-Alchemy: can ignore CONSUMABLE on Chem Equipment; GANGER models can equip up to 2 Chems.',
      'Leader (Queen/Alchemist): can equip up to 3 Chem Equipment.',
      'Champions: Death Maiden (+1 INJURY DICE with GAS weapons) or Matriarch (+1 INJURY DICE non-Long Range ranged).',
      'Gangers: Sisters. Juves: Little Sisters (upgradeable to Wyld Runners: +1 DICE to Dash).',
      'Hover Bikers: cannot purchase Ridgerunners.',
      '7 unique Chem Equipment items. Unique animals: Khimerix, Phelynx Cat, Phyrr Cat.',
    ],
  },
  {
    id: 'house_goliath',
    name: 'House Goliath',
    description: 'Hulking muscle-bound brawlers who dismiss the concept of ranged superiority.',
    rules: [
      'Allegiance: choice of Imperial or Outlaw Warband at creation.',
      'Gene Smithing: GANGER models ignore HEAVY for one weapon; ELITE models have the STRONG Keyword.',
      'Leader (Forge Tyrant/Hardy): melee attacks have -1 INJURY DICE against it.',
      'Champions: Stimmer (Bulked Up: +1 INJURY DICE melee, LARGE) or Forge Boss (redirect hits to itself from allies within 1").',
      'Gangers: Bruisers. Juves: Bullies (upgradeable to Forge-Born: NEGATE FIRE).',
      'Maulers: cannot purchase Ridgerunners.',
      'Unique troops: Sumpkroc, \'Zerker (LARGE/STRONG/TOUGH).',
    ],
  },
  {
    id: 'house_orlock',
    name: 'House Orlock',
    description: 'The Road Crew — tough road warriors who build their legend through Glorious Deeds.',
    rules: [
      'Allegiance: choice of Imperial or Outlaw Warband at creation.',
      'Legendary Names: ELITE GANGER models gain extra skills at 2/4/7/10/14/18 Glorious Deeds.',
      'Leader (Road Champion/Living Legend): gains twice as much Glory per Glorious Deed.',
      'Champions: Arms Master (gains LEADER Keyword) or Road Sergeant (self and allies within 4" get +1 DICE to Dash).',
      'Gangers: Gunners. Juves: Greenhorns (upgradeable to Wreckers: Jump Booster FLYING move).',
      'Road Warriors: can purchase up to 3 Ridgerunners.',
      'Unique troops: Cyber Mastiff, Lugger (ARTIFICIAL/LARGE/STRONG/TOUGH).',
    ],
  },
  {
    id: 'ironhead_squat_prospectors',
    name: 'Ironhead Squat Prospectors',
    description: 'Stout Squat miners who delve deep and strike hard.',
    rules: [
      'Kin: counts as Xenos (Leagues of Votann) Warband and your choice of Outlaw or Imperium. Patron can be a Guildmaster.',
      'Squats: -1" movement but the first -1 of their Armour has IMPERVIOUS, and they cost 10 fewer credits.',
      'Leader (Charter Master/Prospecting): has INFILTRATOR; can give INFILTRATOR to 2 non-Elite models at battle start.',
      'Champions (Drill Masters/Heavy Drilling): STRONG Keyword.',
      'Gangers: Drill-Kyn. Juves: Diggers (upgradeable to Burrowers: DEEP STRIKE(TUNNEL)).',
      'Unique troops: Techmite (ARTIFICIAL/NEGATE GAS), Exo-Driller (LARGE/STRONG/TOUGH/VEHICLE).',
    ],
  },
  {
    id: 'venators',
    name: 'Venators',
    description: 'Hired bounty hunters and elite prey-stalkers armed with exotic Hunting Rigs.',
    rules: [
      'Hunter Type: choose Arsenal (weapon cost discounts, no Hunting Rigs) or Spyre Hunters (Imperium Warband, all must have Hunting Rigs, patron = Wealthy Noble).',
      'Bounties: gain D6x5 credits each time an enemy ELITE is taken Out of Action.',
      'Leader (Hunt Leader): optionally replaces Around The Block with PSYKER 1 (1 Shared Discipline, 3 powers).',
      'Champions: Hunt Champions. Gangers: Hunters.',
      'Cannot recruit Juves.',
      'Unique Hunting Rigs: standard, Heavy, Yeld (FLYING/INFILTRATOR/STEALTH), Sthenian, Mirror Shield.',
      'Unique troop: Caryatid Prime (BEAST/FLYING).',
    ],
  },
  {
    id: 'palanite_enforcers',
    name: 'Palanite Enforcers',
    description: 'The law — heavily-armed Enforcers who operate as an Imperial Warband. Also used as the rules base for Adeptus Arbites (see "Adeptus Arbites" variant below).',
    requiredPatron: 'Administratum Prefectus (Shared Patron)',
    rules: [
      'Imperial Authority: counts as an Imperium Warband. Patron must be the Administratum Prefectus Shared Patron.',
      'Ruthless Efficiency: GANGER models never randomly target when shooting into melee; always choose target.',
      'Leader (Captain/Mark For Justice): action to designate one enemy as a target — GANGER models score Critical Hit on 10+ against it until end of Turn.',
      'Champions (Sergeants/Heavy Hitter): total +2 Melee Skill.',
      'Gangers: Patrolmen. Juves: Rookies (upgradeable to Hotshots: Headstrong — 2D6 charge, use highest).',
      'Unique troops: Hardcase Cyber Mastiff, Sanctioner Automata (LARGE/REGEN/STRONG/TOUGH).',
      'Armoury additions: Bolt Carbine (15cr), Boltgun (12cr), Concussion Carbine (15cr, LIMIT 2), Grenade Launcher (40cr, LIMIT 1), Webber (10cr, LIMIT 2), Web Pistol (5cr, LIMIT 3), Seismic Cannon (25cr, LIMIT 1), Electro-Grenades (7cr), Shock Baton (5cr), Shock Stave (7cr, LIMIT 2), Shock Maul (12cr, LIMIT 1), Magnacles (10cr, LIMIT 3), Nuncio Aquila (10cr, LIMIT 1), Shield (10cr).',
    ],
  },
  {
    id: 'adeptus_arbites',
    name: 'Adeptus Arbites',
    description: 'The Judge Dredd-style enforcers of Imperial law. Uses all Palanite Enforcer rules — different in-universe name, identical mechanics.',
    requiredPatron: 'Administratum Prefectus (Shared Patron)',
    rules: [
      'Played as Palanite Enforcers: uses all Palanite Enforcer special rules and armoury. The names are re-flavoured for the Arbites theme.',
      'Imperial Authority: counts as an Imperium Warband. Patron must be the Administratum Prefectus Shared Patron.',
      'Ruthless Efficiency: GANGER models never randomly target when shooting into melee; always choose target.',
      'Leader (Judge/Mark For Justice): action to designate one enemy as a target — GANGER models score Critical Hit on 10+ against it until end of Turn.',
      'Champions (Arbitrators/Heavy Hitter): total +2 Melee Skill.',
      'Gangers: Patrolmen (Arbitrators). Juves: Rookies (upgradeable to Hotshots: Headstrong — 2D6 charge, use highest).',
      'Unique troops: Hardcase Cyber Mastiff, Sanctioner Automata (LARGE/REGEN/STRONG/TOUGH).',
      'Armoury: same as Palanite Enforcers — Shock Batons, Shock Staves, Shock Maul, Web Pistol, Webber, Concussion Carbine, Boltgun, Bolt Carbine, Magnacles, Nuncio Aquila, Shield, etc.',
    ],
  },];

// ─── Aeldari Warband Variants ──────────────────────────────────────────────────

const AELDARI_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Craftworld)',
    description: 'A standard Craftworld Aeldari warband.',
    rules: [
      'Standard Aeldari rules: Strands of Fate, Guiding Fate special rules.',
      'Uses the Runes of Battle, Runes of Fate, and Runes of Fortune disciplines.',
    ],
  },
  {
    id: 'corsairs',
    name: 'Corsairs',
    description: 'Aeldari pirates who sail the stars beyond the Web, counting as an Outlaw Warband.',
    requiredPatron: 'Pirate Lord (Shared Patron)',
    rules: [
      'Outlaws: counts as both an Outlaw Warband and a Xenos (Aeldari) Warband. Patron must be the Pirate Lord Shared Patron.',
      'Pirate Life: cannot recruit Wraiths; up to 5 Guardians can be upgraded to Rangers.',
      'Void Dreamers: Seers and Warlocks must use the Void Discipline instead of normal disciplines.',
      'Path of the Outcast: Aspect Warriors become Voidscarred with Outcast Aspects (Malevolent/Ravager/Shade Runner/Starstorm/Voidstorm).',
      'Repurposed Weapons: can purchase up to 2 Wraith Cannons, 2 Ghost Blades, 1 Force Shield.',
      'Limited Arsenal: cannot purchase various Craftworld-specific wargear.',
    ],
  },
  {
    id: 'exodites',
    name: 'Exodites',
    description: 'Aeldari colonists who ride mighty creatures and forsook the fall of their kin.',
    rules: [
      'Exiles: cannot recruit Autarchs or Aspect Warriors. Patron cannot be a Phoenix Lord. Windriders lose VEHICLE and gain MOUNTED.',
      'Dragonlord: must include a Dragonlord (LARGE/MOUNTED/LEADER/TOUGH) as Warband leader.',
      'Dragon Knights: can include up to 6 Dragon Knights (LARGE/MOUNTED) as Troops.',
      'Knightly Lances: can purchase any number of Laser Lances and Star Lances.',
      'Rustic Lifestyle: limited access to high-tech Craftworld wargear.',
    ],
  },
  {
    id: 'spirit_conclave',
    name: 'Spirit Conclave',
    description: 'A warband built around Wraith constructs guided by a powerful Wraithseer.',
    rules: [
      'Wraithseer: cannot take Seers; Patron cannot be a Phoenix Lord; can take 1 Wraithseer (PSYKER 2/TOUGH) as Elite.',
      'Wraith Focus: no Windriders; max 3 Aspect Warriors; can take up to 4 Wraiths.',
      'Wraithlord: can take 1 Wraithlord (NO PROMOTION) as a Troop.',
      'Conclave Weapons: Ghost Glaive (Wraith Only) and Ghostspear (Wraithseer Only) added to armoury.',
    ],
  },
  {
    id: 'ynnari',
    name: 'Ynnari',
    description: "Followers of Ynnead who draw strength from the death of all, combining Aeldari, Drukhari, and Harlequins.",
    requiredPatron: 'Ynnead, the Whispering God',
    bannedUnitIds: ['ael_haemonculus', 'ael_wrack', 'ael_grotesque', 'hq_solitaire', 'ael_mandrake'],
    extraUnits: [
      yn_dr_archon,
      yn_dr_incubus,
      yn_dr_wych,
      yn_dr_reaver,
      yn_hq_troupe_master,
      yn_hq_player,
      yn_hq_death_jester,
      yn_hq_shadowseer,
      yn_hq_skyweaver,
    ],
    rules: [
      "Followers of Ynnead: Patron must be Ynnead, the Whispering God.",
      'Combined Forces: can take models from Aeldari, Drukhari, and Harlequins Factions.',
      'Strength From Death: replaces Strands of Fate. Whenever any model is taken Out of Action, one of your AELDARI/DRUKHARI/HARLEQUIN models within 6" gains a BLESSING MARKER.',
      'Souls for Ynnead: replaces Guiding Fate; collect Soul Points, then choose one of 5 Soul Bond options.',
      'Revenant Psychic Discipline: Gaze of Ynnead / Storm of Whispers / Word of the Phoenix / Unbind Souls / Shield of Ynnead / Ancestor\'s Grace.',
      'Unique: The Yncarne (PSYKER 2/FLYING/TOUGH) can be summoned for 35 Soul Points.',
    ],
  },
];

// ─── Drukhari Warband Variants ─────────────────────────────────────────────────

const DRUKHARI_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Kabal)',
    description: 'A standard Drukhari Kabal warband.',
    rules: [
      'Standard Drukhari rules: Power From Pain, Dark Flight.',
      'Standard Drukhari armoury and units.',
    ],
  },
  {
    id: 'court_of_the_archon',
    name: 'Court of the Archon',
    description: "An Archon's personal retinue of unique and deadly individual champions.",
    bannedUnitIds: ['dr_haemonculus', 'dr_succubus', 'dr_wrack', 'dr_wych'],
    rules: [
      'Court Alone: cannot recruit Haemonculi, Succubi, Wracks, or Wyches. Instead can recruit up to 6 Incubi.',
      'Court Inner Circle: can recruit up to 1 Lhamaean, 1 Medusae, 1 Sslyth, and 1 Ur-Ghul as Elites.',
      'Court Battlekit: adds Sslyth Battle-Blade (12 credits, Sslyth Only — Melee, +1 INJURY DICE, HEAVY, TWO-HANDED).',
    ],
  },
  {
    id: 'haemonculus_coven',
    name: 'Haemonculus Coven',
    description: 'Flesh-sculptors and pain-artists who surround themselves with grotesque creations.',
    requiredPatron: 'Dark Science',
    bannedUnitIds: ['dr_archon', 'dr_succubus', 'dr_incubus', 'dr_wych'],
    rules: [
      'Haemonculi: cannot recruit Archons, Succubi, Incubi, Wyches, or Reavers. Can recruit up to 3 Haemonculi and any number of Wracks. At least 1 Haemonculus required and is the Warband leader (LEADER/TOUGH).',
      'Grotesquerie: can recruit up to 3 Grotesques (LARGE/TOUGH) as Troops.',
      'Patron must be Dark Science.',
    ],
  },
  {
    id: 'wych_cult',
    name: 'Wych Cult',
    description: 'Arena gladiators whose lithe and deadly Wyches fight for the thrill of combat.',
    requiredPatron: 'The Arena (optional)',
    bannedUnitIds: ['dr_archon', 'dr_haemonculus', 'dr_incubus', 'dr_wrack'],
    rules: [
      'Wyches: cannot recruit Archons, Haemonculi, Incubi, or Wracks. Can recruit up to 2 Succubi and any number of Wyches. At least 1 Succubus required and is the Warband leader (LEADER/TOUGH).',
      'The Arena: patron can optionally be The Arena.',
      'Beastmaster: can recruit 1 Beastmaster as an Elite, plus up to 1 Clawed Fiend, 2 Khymerae, and 3 Razorwing Flocks as Troops.',
    ],
  },
];

// ─── Genestealer Cults Warband Variants ───────────────────────────────────────

// Brood Brothers: Veteran Guardsman without Drop Trooper upgrade, max 3
const brood_veteran_guardsman: UnitOption = {
  ...am_veteran_guardsman,
  id: 'am_veteran_guardsman_brood',
  maxCount: 3,
  upgrades: [
    {
      id: 'am_lieutenant',
      name: 'Lieutenant',
      cost: 0,
      maxCount: 1,
      grantedKeywords: ['ELITE'],
      description: 'Up to 1 Veteran Guardsman in the warband can be promoted to Lieutenant, gaining the ELITE Keyword.',
    },
  ],
  description: 'Brood Brothers only. Veteran Guardsman (no Drop Trooper upgrade). Max 3.',
};

// Final Day: Tyranid Gaunts with subfaction-appropriate maxCounts (no Neurogaunts)
const fd_barbgaunt: UnitOption = {
  ...ty_gaunt_barbgaunt,
  maxCount: 1,
  description: 'Final Day only. Max 1 Barbgaunt (part of 5-Gaunt combined limit).',
};
const fd_gargoyle: UnitOption = {
  ...ty_gaunt_gargoyle,
  maxCount: 4,
  description: 'Final Day only. Part of 5-Gaunt combined limit (max 1 Barbgaunt; no Neurogaunts).',
};
const fd_hormagaunt: UnitOption = {
  ...ty_gaunt_hormagaunt,
  maxCount: 5,
  description: 'Final Day only. Part of 5-Gaunt combined limit (max 1 Barbgaunt; no Neurogaunts).',
};
const fd_termagant: UnitOption = {
  ...ty_gaunt_termagant,
  maxCount: 5,
  description: 'Final Day only. Part of 5-Gaunt combined limit (max 1 Barbgaunt; no Neurogaunts).',
};
const fd_warrior: UnitOption = {
  ...ty_tyranid_warrior,
  maxCount: 2,
  description: 'Final Day only. Max 2 Tyranid Warriors.',
};
const fd_ravener: UnitOption = {
  ...ty_ravener,
  maxCount: 2,
  description: 'Final Day only. Max 2 Raveners (no Ravener Prime upgrade).',
};
const fd_zoanthrope: UnitOption = {
  ...ty_zoanthrope,
  maxCount: 1,
  description: 'Final Day only. Max 1 Zoanthrope.',
};

const GENESTEALER_CULTS_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Standard)',
    description: 'A standard Genestealer Cults warband.',
    rules: [
      'Standard Genestealer Cults rules: Cult Ambush, Broodmind Discipline.',
      'Standard unit roster and armoury.',
    ],
  },
  {
    id: 'brood_brothers',
    name: 'Brood Brothers',
    description: 'A militarised cult warband that has deeply infiltrated the local Astra Militarum.',
    bannedUnitIds: ['gc_clamavus', 'gc_nexos'],
    extraUnits: [
      { ...am_commissar, maxCount: 1 },
      { ...am_guardsman, maxCount: 6 },
      brood_veteran_guardsman,
      { ...am_heavy_weapons_squad, maxCount: 2 },
    ],
    rules: [
      'Military Infiltration: can recruit up to 1 Commissar, 6 Guardsmen, 3 Veteran Guardsmen (no Drop Troopers), and 2 Heavy Weapons Teams from Astra Militarum. 1 Veteran Guardsman can be a Lieutenant (ELITE).',
      'Military Cult: cannot recruit Clamavus or Nexos.',
      'Military Strategy: gains Voice of Command from Astra Militarum.',
      'Crossfire: each ranged attack by a MILITARUM model gives the target a Crossfire token; GENESTEALER CULTS models attacking that target gain +1 DICE to Hit.',
    ],
  },
  {
    id: 'broodcoven',
    name: 'Broodcoven',
    description: 'A cult ruled directly by a mighty Patriarch, the purest vessel of the Hive Mind.',
    bannedUnitIds: ['gc_primus', 'gc_magus'],
    extraUnits: [gc_patriarch, gc_genestealer_troop],
    rules: [
      'Rule of the Patriarch: cannot take Primus or Magus. Must take a Patriarch (160 credits, PSYKER 2/FEAR/LARGE/LEADER/TOUGH) as Warband leader.',
      'Purestrain: can recruit up to 3 Genestealers as Troops (75 credits each).',
    ],
  },
  {
    id: 'the_final_day',
    name: 'The Final Day',
    description: 'The cult is consumed by the arrival of the Hive Fleet, mixing Tyranids among their ranks.',
    requiredPatron: 'The Hive Mind (optional)',
    extraUnits: [fd_barbgaunt, fd_gargoyle, fd_hormagaunt, fd_termagant, fd_warrior, fd_ravener, fd_zoanthrope],
    rules: [
      'Arrival of the Star Children: can recruit up to 5 Gaunts total (max 1 Barbgaunt, no Neurogaunts), 2 Tyranid Warriors, 2 Raveners (no Prime), and 1 Zoanthrope from the Tyranids Faction. Patron can be The Hive Mind.',
      'Hive Mind Expansion: gains Synapse rule from Tyranids.',
      'Psychic Parasitism: TYRANID models can drain life from nearby non-TYRANID GENESTEALER CULTS models.',
      'No More Hiding: do not have Cult Ambush.',
      'Converted to Biomass: max 3 Acolytes and 2 Aberrants.',
      'Out With the Old: max 1 each of Mining Lasers, Seismic Cannons, Heavy Rock Drills, Heavy Rock Saws, and Blasting Charges.',
    ],
  },
];

// ─── Necrons Warband Variants ──────────────────────────────────────────────────

const NECRONS_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Standard)',
    description: 'A standard Necron Dynasty warband.',
    rules: [
      'Standard Necron rules: Living Metal (Reanimation), Quantum Shielding.',
      'Standard unit roster including Warriors, Immortals, Scarab Swarms, Tomb Blades.',
    ],
  },
  {
    id: 'canoptek_court',
    name: 'Canoptek Court',
    description: 'A Cryptek-led research expedition supported by Canoptek constructs.',
    bannedUnitIds: ['nec_necron_lord', 'nec_royal_warden', 'nec_tomb_blade'],
    rules: [
      'Cryptek Hierarchy: cannot include Necron Lords, Royal Wardens, or Tomb Blades.',
      'Cryptek Leadership: can include up to 3 Crypteks (each different Discipline); one is Warband leader (LEADER/TOUGH).',
      'Canoptek Servants: can include 1 Canoptek Spyder, up to 2 Tomb Crawlers, and up to 3 Macrocyte Warriors as Troops.',
      'Apprentices: can include one Apprentek per Cryptek in the warband.',
    ],
  },
  {
    id: 'destroyer_cult',
    name: 'Destroyer Cult',
    description: 'Nihilistic Destroyers driven mad with the desire to exterminate all life.',
    requiredPatron: 'Obliteration',
    bannedUnitIds: ['nec_necron_lord', 'nec_cryptek', 'nec_royal_warden', 'nec_scarab_swarm', 'nec_tomb_blade'],
    rules: [
      'Distrusted: cannot include Necron Lords, Crypteks, Royal Wardens, Canoptek Scarab Swarms, or Tomb Blades. Max 4 Warriors and 2 Immortals.',
      'Destroyer Lords: can include up to 1 Hexmark Destroyer, 1 Lokhust Lord, and 1 Skorpekh Lord as Elites. Must include at least 1 as Warband leader.',
      'Destroyers: can include up to 2 each of Lokhust Destroyers, Ophydian Destroyers, and Skorpekh Destroyers.',
      'Flayer Magnets: can recruit up to 3 Flayed Ones as Troops (70 credits each).',
      'Acceleration: up to 3 Plasmacyte Accelerators; no Plasmacyte Reanimators.',
      'Patron must be Obliteration. Access to Destroyer-exclusive battlekit.',
    ],
  },
  {
    id: 'court_of_the_flayer_king',
    name: 'Court of the Flayer King',
    description: 'A Flayed One horde led by an insane Flayer King infected with the Flayer Virus.',
    requiredPatron: 'The Flayer Virus',
    bannedUnitIds: ['nec_necron_lord', 'nec_tomb_blade'],
    rules: [
      'Hated: cannot include Necron Lords or Tomb Blades. Max 4 Warriors and 2 Immortals.',
      'Flayer Hordes: can recruit unlimited Flayed Ones as Troops (70 credits each).',
      'Ascendant Flayer: must include a Flayer King (DEEP STRIKE/FEAR/LEADER/STEALTH/TOUGH) as Warband leader.',
      'Flayer Virus: patron must be The Flayer Virus. Most NECRON models have the FEAR Keyword and Flesh Hunger ability (+1 DICE to Hit in melee models with BLOOD MARKERS).',
      'Flayer Technology: Crypteks must choose the Fleshmancer Discipline (Madness of the Blood/Eviscerating Call).',
    ],
  },
];

// ─── Orks Warband Variants ─────────────────────────────────────────────────────

const ORKS_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Standard)',
    description: 'A standard Ork mob.',
    rules: [
      'Standard Ork rules: Mob Rule, Waaagh!, Ere We Go.',
      'Standard unit roster: Warboss, Nobs, Boyz, Gretchin, Deff Dread, Warbikes.',
    ],
  },
  {
    id: 'da_big_hunt',
    name: 'Da Big Hunt',
    description: 'A Squighog-riding hunting mob that chases the biggest prey across the wastes.',
    bannedUnitIds: ['or_deff_dread'],
    rules: [
      'Squig Riders: can recruit up to 3 Squighog Boyz (LARGE/MOUNTED/STRONG/TOUGH) as Troops.',
      'Beast Snaggaz: can recruit up to 4 Squigs.',
      'Low Tek: cannot take Mega Armour or Warbikes; cannot recruit a Deff Dread; max 1 Mek upgrade.',
      'Da Big Hunt Battlekit: adds Saddlegit (Squighog Boy Only — extra Grot Blasta or Chain Choppa) and Stikka (8", ASSAULT, ARMOUR PIERCING 1, PISTOL) to armoury.',
    ],
  },
];

// ─── T'au Empire Warband Variants ─────────────────────────────────────────────

const T_AU_EMPIRE_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Standard)',
    description: "A standard T'au hunter cadre.",
    rules: [
      "Standard T'au rules: For the Greater Good, Markerlight system, Seeker Missiles.",
      'Standard unit roster: Ethereal, Commander, Fire Warriors, Kroot, Battlesuits, Drones.',
    ],
  },
  {
    id: 'auxiliary_cadre',
    name: 'Auxiliary Cadre',
    description: "A warband of T'au Auxiliary aliens supporting the Greater Good with minimal Fire Warriors.",
    requiredPatron: 'Ethereal Supreme or Farsight Leader',
    rules: [
      'Separate Battleforce: cannot take Ethereals or Commanders; can recruit only as many Fire Warriors as T\'au Auxiliaries and Mercenaries combined. Choose an Elite as Warband leader (LEADER/TOUGH).',
      'Auxiliary Leadership: can recruit 1 Vespid Stingwing Strain Leader as an Elite (+2 Ranged, +2 Melee).',
      "Farsight Auxiliaries: patron can be Ethereal Supreme or Farsight Leader.",
      'Auxiliary Soldiers: unlimited T\'au Auxiliary Troops (6 Species: Demiurg (-5cr, IMPERVIOUS first -1 Armour)/Gue\'vesa/Hrenian (+10cr, +1 Ranged)/Morralian (+10cr, +1 Melee)/Tarellian (+10cr, +2" move)/Thraxian (+10cr, Multi-Armed)).',
      'Auxiliary Support: warband begins with 11 Glory but only 500 credits; Credit Threshold 200 lower.',
      'Minor Drone Support: up to 1 T\'au Drone for every 2 other models.',
    ],
  },
  {
    id: 'farsight_enclave',
    name: 'Farsight Enclave',
    description: "Tau warriors who follow Commander Farsight's independent military philosophy.",
    requiredPatron: 'Farsight Leader',
    bannedUnitIds: ['tau_ethereal'],
    rules: [
      'Without Ethereals: cannot recruit Ethereals. Must recruit a Commander as Warband leader (gains LEADER).',
      'Heroes of the Enclave: can recruit a second Commander (+30 credits extra).',
      "Aggressive Footing: Markerlight tokens can only be placed within half maximum range, but always apply 2 tokens instead of 1.",
      'Patron must be a Farsight Leader.',
    ],
  },
  {
    id: 'retaliation_cadre',
    name: 'Retaliation Cadre',
    description: "An elite battlesuit-heavy cadre focused entirely on Crisis and Stealth Battlesuits.",
    requiredPatron: 'Ethereal Supreme or Farsight Leader',
    rules: [
      'Battlesuit Cadre: cannot recruit Ethereals, Cadre Fireblades, Kroot Shapers, Fire Warriors, or Kroot Carnivores. Must have Commander as Warband leader.',
      "Farsight Cadres: patron can be Ethereal Supreme or Farsight Leader.",
      'Battlesuit Focus: up to 2 (or 3 at 1,200+ credits) Crisis Battlesuits, one can be ELITE. Up to 3 Stealth Battlesuits, one can be ELITE.',
      'Broadside Battlesuit: can recruit up to 1 Broadside Battlesuit (LARGE/STRONG/TOUGH/VEHICLE) as a Troop.',
      'Drone Support: up to 2 T\'au Drones for each other model in the warband.',
    ],
  },
  {
    id: 'kroot_kinband',
    name: 'Kroot Kinband',
    description: "A Kroot-only warband of the T'au's mercenary hunter allies.",
    requiredPatron: 'Shaper Chief',
    rules: [
      'Kroot Alone: cannot include Ethereals, Commanders, Cadre Fireblades, Fire Warriors, Crisis, or Stealth Battlesuits; can recruit unlimited Kroot Carnivores (up to 2/3 as Kroot Gunners). Patron must be a Shaper Chief.',
      'Skirmish Fighters: replaces For the Greater Good; enemies have -1 DICE to Hit KROOT with ranged attacks.',
      "Kroot Elite: up to 3 Kroot Shapers (each with a different Path) and 1 Kill Broker (STEALTH/ELITE) as Elites. One is Warband leader (LEADER/TOUGH). Leader can equip non-Kroot weapons and a Beastly Mount (80 credits: LARGE/MOUNTED/SKIRMISHER).",
      'Kroot Hounds: up to 3 Kroot Hound Mercenaries as Troops (50 credits each).',
      'Krootox Riders: up to 2 (or 3 at 1,200+ credits) Krootox Riders (LARGE/MOUNTED/TOUGH) as Troops.',
      'Kroot Weapons: up to 2 Dvorgite Skinners, 2 Repeater Cannons, 2 Tanglecannons, and 3 Blast Javelins.',
    ],
  },
];

// ─── Tyranids Warband Variants ─────────────────────────────────────────────────

const TYRANIDS_SUBFACTIONS: SubFaction[] = [
  {
    id: 'no_variant',
    name: 'No Variant (Standard)',
    description: 'A standard Tyranid hunting swarm directed by a Hive Tyrant.',
    rules: [
      'Standard Tyranid rules: Synapse, Shadow in the Warp, Hive Fleet special rules.',
      'Uses the Tyranids Psychic Discipline.',
    ],
  },
  {
    id: 'assimilation_swarm',
    name: 'Assimilation Swarm',
    description: 'A Malanthrope-led force focused on absorbing biomass from the battlefield.',
    rules: [
      'Assimilators: cannot take a Hive Tyrant; must include a Malanthrope (FLYING/LARGE/LEADER/SYNAPSE/TOUGH) as Warband leader.',
      'Rear Guard: cannot take Raveners or Lictors.',
      'Toxic Retinue: can recruit up to 2 Venomthrope Mercenaries (85 credits each) as Troops.',
      'Heavy Spores: Venomthropes\' Foul Spores ability range extended to 9".',
      'Biomass Processors: can recruit up to 4 Ripper Swarms; they gain the Feed The Swarm ability (heal self or TYRANID ally within 1" with a Risky Success Roll).',
    ],
  },
  {
    id: 'hive_guardians',
    name: 'Hive Guardians',
    description: 'A Hive Tyrant surrounded by loyal guards defending the bio-node.',
    rules: [
      'Royal Guard: cannot recruit Lictors; can recruit up to 2 Tyranid Guards.',
      'Nesting: cannot recruit Raveners; can recruit up to 4 Tyranid Warriors and 3 Ripper Swarms. Ripper Swarms lose DEEP STRIKE but gain +0 Ranged and +1 Melee Skill.',
      'Spore Production: can recruit up to 2 Mucoloid Spores (DEEP STRIKE/FLYING/LARGE/NO PROMOTION) as Troops. When any Spore Mine or Mucoloid is a casualty, replace for free.',
    ],
  },
  {
    id: 'subterranean_assault',
    name: 'Subterranean Assault',
    description: 'A Ravener-heavy force that erupts from beneath the ground.',
    rules: [
      'Ravener Hive: cannot recruit Hive Tyrants, Barbgaunts, Gargoyles, or Neurogaunts; max 1 Tyranid Warrior. Can recruit up to 3 Ripper Swarms and 5 Raveners. One Ravener must be Warband leader (Ravener Prime) with ELITE/LEADER/SYNAPSE.',
      'Precise Tunnelers: models with DEEP STRIKE (TUNNEL) are NOT adjusted D3" when deployed.',
      'Limited Spores: max 1 Spore Mine.',
    ],
  },
  {
    id: 'synaptic_nexus',
    name: 'Synaptic Nexus',
    description: 'A psyker-heavy force led by the most powerful psychic predator in the Hive Fleet.',
    rules: [
      'Neurotyrant: cannot take a Hive Tyrant; must take a Neurotyrant (ELITE/FLYING/LARGE/LEADER/PSYKER 3/SYNAPSE/TOUGH) as Warband leader.',
      'Neurolictor: cannot take a Lictor; can recruit 1 Neurolictor (ELITE/LARGE/INFILTRATOR/PSYKER 1/STEALTH/SYNAPSE/TOUGH) as an Elite.',
      'Psychic Hive: cannot recruit Tyrant Guards or Raveners; can recruit up to 2 Zoanthropes, one can be ELITE.',
      'Neuroloids: can recruit up to 2 Neuroloids (FLYING/SYNAPSE) as Troops.',
      'Limited Spores: max 1 Spore Mine.',
    ],
  },
  {
    id: 'vanguard_onslaught',
    name: 'Vanguard Onslaught',
    description: 'A monstrous-hunter force led by terrifying Lictors who preceded the main swarm.',
    rules: [
      'Vanguard: cannot recruit a Hive Tyrant; can recruit up to 2 Lictors. Must recruit at least 1 Lictor as Warband leader (ELITE/LEADER/SYNAPSE).',
      'Forerunners: cannot recruit Ripper Swarms; max 2 Tyranid Warriors. Can recruit up to 3 Von Ryan\'s Leapers Mercenaries (120 credits each) as Troops with access to Tyranids Battlekit.',
    ],
  },
];

// ─── Registry ─────────────────────────────────────────────────────────────────

export const FACTION_SUBFACTIONS: FactionSubFactions[] = [
  // Chaos Factions
  {
    factionId: 'heretic_astartes',
    required: false,
    subFactions: HERETIC_ASTARTES_SUBFACTIONS,
  },
  {
    factionId: 'chaos_daemons',
    required: false,
    subFactions: CHAOS_DAEMONS_SUBFACTIONS,
  },
  // Imperial Factions
  {
    factionId: 'adepta_sororitas',
    required: false,
    subFactions: ADEPTA_SORORITAS_SUBFACTIONS,
  },
  {
    factionId: 'adeptus_astartes',
    required: false,
    subFactions: ADEPTUS_ASTARTES_SUBFACTIONS,
  },
  {
    factionId: 'adeptus_mechanicus',
    required: false,
    subFactions: ADEPTUS_MECHANICUS_SUBFACTIONS,
  },
  {
    factionId: 'adeptus_ministorum',
    required: false,
    subFactions: ADEPTUS_MINISTORUM_SUBFACTIONS,
  },
  {
    factionId: 'astra_militarum',
    required: false,
    subFactions: ASTRA_MILITARUM_SUBFACTIONS,
  },
  {
    factionId: 'the_inquisition',
    required: false,
    subFactions: THE_INQUISITION_SUBFACTIONS,
  },
  // Outlaw Factions
  {
    factionId: 'necromunda_gang',
    required: true,  // Must choose a gang type — there is no "standard" Necromunda Gang
    subFactions: NECROMUNDA_GANG_SUBFACTIONS,
  },
  // Xenos Factions
  {
    factionId: 'aeldari',
    required: false,
    subFactions: AELDARI_SUBFACTIONS,
  },
  {
    factionId: 'drukhari',
    required: false,
    subFactions: DRUKHARI_SUBFACTIONS,
  },
  {
    factionId: 'genestealer_cults',
    required: false,
    subFactions: GENESTEALER_CULTS_SUBFACTIONS,
  },
  {
    factionId: 'necrons',
    required: false,
    subFactions: NECRONS_SUBFACTIONS,
  },
  {
    factionId: 'orks',
    required: false,
    subFactions: ORKS_SUBFACTIONS,
  },
  {
    factionId: 't_au_empire',
    required: false,
    subFactions: T_AU_EMPIRE_SUBFACTIONS,
  },
  {
    factionId: 'tyranids',
    required: false,
    subFactions: TYRANIDS_SUBFACTIONS,
  },
];

/** Returns the sub-faction definitions for a given faction, or null if the faction has none. */
export function getSubFactions(factionId: string): FactionSubFactions | null {
  return FACTION_SUBFACTIONS.find(f => f.factionId === factionId) ?? null;
}

/** Returns true if this faction supports sub-faction selection. */
export function factionHasSubFactions(factionId: string): boolean {
  return FACTION_SUBFACTIONS.some(f => f.factionId === factionId);
}

/** Returns a single sub-faction definition by faction ID and sub-faction ID. */
export function getSubFactionById(factionId: string, subFactionId: string): SubFaction | null {
  const entry = FACTION_SUBFACTIONS.find(f => f.factionId === factionId);
  if (!entry) return null;
  return entry.subFactions.find(sf => sf.id === subFactionId) ?? null;
}

/**
 * Returns the default sub-faction ID for the given faction.
 * For required factions (e.g. Necromunda Gang), defaults to the first sub-faction in the list.
 * For optional factions, defaults to 'no_variant'.
 */
export function getDefaultSubFactionId(factionId: string): string {
  const entry = FACTION_SUBFACTIONS.find(f => f.factionId === factionId);
  if (!entry) return 'no_variant';
  if (entry.required && entry.subFactions.length > 0) {
    return entry.subFactions[0].id;
  }
  return 'no_variant';
}
