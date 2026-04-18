/**
 * factionResources.ts
 *
 * Defines faction-specific campaign resources that are tracked throughout a campaign.
 * Resources are earned from exploration choices, mission rewards, and other campaign events.
 */

import type { FactionResourceDef } from '../types/index.js';

export const FACTION_RESOURCES: FactionResourceDef[] = [
  // ── Adeptus Astartes ───────────────────────────────────────────
  {
    id: 'gene_seed',
    name: 'Gene Seed',
    factionIds: ['adeptus_astartes'],
    description: 'Recovered gene seed used to recruit new Astartes. Powerful Gene Seeds immediately promote a recruit to Elite with 2 XP.',
  },

  // ── Adepta Sororitas ───────────────────────────────────────────
  {
    id: 'miracles',
    name: 'Miracles',
    factionIds: ['adepta_sororitas'],
    description: 'Acts of faith witnessed by the Warband, tracked for Trials of Purity and Valor.',
  },

  // ── Adeptus Ministorum ─────────────────────────────────────────
  {
    id: 'flock_points',
    name: 'Flock Points',
    factionIds: ['adeptus_ministorum'],
    description: 'Followers attracted by rousing sermons and acts of devotion. Used to unlock Ministorum abilities and recruit faithful.',
  },

  // ── Astra Militarum ────────────────────────────────────────────
  {
    id: 'commendations',
    name: 'Commendations',
    factionIds: ['astra_militarum'],
    description: 'Awards given for distinguished service. Specific commendation types (Recon Star, etc.) unlock bonuses.',
  },

  // ── Heretic Astartes (general) ─────────────────────────────────
  {
    id: 'dark_gods_reputation',
    name: 'Dark Gods Reputation',
    factionIds: ['heretic_astartes'],
    description: 'Standing with the Dark Gods. Earned from Chaos Shrines, Blood Pits, and other unholy sites.',
  },
  {
    id: 'personal_reputation',
    name: 'Personal Reputation',
    factionIds: ['heretic_astartes'],
    description: 'Individual glory of your Warband leader. Earned from duels and personal victories.',
  },
  {
    id: 'warfleet_reputation',
    name: 'Warfleet Reputation',
    factionIds: ['heretic_astartes'],
    description: 'Standing with the Warfleet. Earned from salvaging ships and naval actions.',
  },

  // ── Heretic Astartes – Thousand Sons ───────────────────────────
  {
    id: 'arcane_points',
    name: 'Arcane Points',
    factionIds: ['heretic_astartes'],
    subfactionIds: ['thousand_sons'],
    description: 'Sorcerous knowledge gathered from relics and arcane sites. Used to unlock psychic abilities.',
  },

  // ── Heretic Astartes – World Eaters ────────────────────────────
  {
    id: 'claimed_skulls',
    name: 'Claimed Skulls',
    factionIds: ['heretic_astartes'],
    subfactionIds: ['world_eaters'],
    description: 'Skulls taken from fallen enemies. Tracked per Elite model. Used to unlock World Eaters abilities.',
  },

  // ── Heretic Astartes – Emperor\'s Children ─────────────────────
  {
    id: 'ingredients_common',
    name: 'Common Ingredients',
    factionIds: ['heretic_astartes'],
    subfactionIds: ['emperors_children'],
    description: 'Common alchemical ingredients used to brew Combat Elixirs.',
  },
  {
    id: 'ingredients_rare',
    name: 'Rare Ingredients',
    factionIds: ['heretic_astartes'],
    subfactionIds: ['emperors_children'],
    description: 'Rare alchemical ingredients used to brew potent Combat Elixirs.',
  },

  // ── Heretic Astartes – Grey Knights ────────────────────────────
  {
    id: 'true_name_points',
    name: 'True Name Points',
    factionIds: ['heretic_astartes'],
    subfactionIds: ['grey_knights'],
    description: 'Fragments of a daemon Nemesis\'s True Name, discovered through exploration and battle.',
  },

  // ── Chaos Daemons ──────────────────────────────────────────────
  {
    id: 'ascendancy_khorne',
    name: 'Ascendancy of Khorne',
    factionIds: ['chaos_daemons'],
    description: 'Favour earned from the Blood God through slaughter and bloodletting.',
  },
  {
    id: 'ascendancy_nurgle',
    name: 'Ascendancy of Nurgle',
    factionIds: ['chaos_daemons'],
    description: 'Favour earned from the Plague Father through infection and decay.',
  },
  {
    id: 'ascendancy_tzeentch',
    name: 'Ascendancy of Tzeentch',
    factionIds: ['chaos_daemons'],
    description: 'Favour earned from the Changer of Ways through arcane knowledge and manipulation.',
  },
  {
    id: 'ascendancy_slaanesh',
    name: 'Ascendancy of Slaanesh',
    factionIds: ['chaos_daemons'],
    description: 'Favour earned from the Dark Prince through excess and sensation.',
  },

  // ── The Vermintide ─────────────────────────────────────────────
  {
    id: 'conniving_points',
    name: 'Conniving Points',
    factionIds: ['the_vermintide'],
    description: 'Scheming and plotting. Tracked per Elite model. Used to unlock Vermintide leadership abilities.',
  },

  // ── Orks ───────────────────────────────────────────────────────
  {
    id: 'stompin_points',
    name: 'Stompin\' Points',
    factionIds: ['orks'],
    description: 'Earned from displays of brute force. Da bigger da stomp, da more da points!',
  },

  // ── Leagues of Votann ──────────────────────────────────────────
  {
    id: 'energy_sources',
    name: 'Energy Sources',
    factionIds: ['leagues_of_votann'],
    description: 'Refined energy reserves. One of four Votann resource types used for League construction.',
  },
  {
    id: 'galactic_intel',
    name: 'Galactic Intel',
    factionIds: ['leagues_of_votann'],
    description: 'Strategic information. One of four Votann resource types used for League planning.',
  },
  {
    id: 'raw_minerals',
    name: 'Raw Minerals',
    factionIds: ['leagues_of_votann'],
    description: 'Unrefined materials. One of four Votann resource types used for League fabrication.',
  },
  {
    id: 'biomatter',
    name: 'Biomatter',
    factionIds: ['leagues_of_votann'],
    description: 'Organic material. One of four Votann resource types used for League bioengineering.',
  },

  // ── Drukhari ───────────────────────────────────────────────────
  {
    id: 'raid_spoils',
    name: 'Raid Spoils',
    factionIds: ['drukhari'],
    description: 'Plunder taken from raids. Used to fund Dark Eldar activities and purchases.',
  },
  {
    id: 'territories',
    name: 'Territories',
    factionIds: ['drukhari'],
    description: 'Claimed territories in the Dark City. Each Territory provides ongoing campaign benefits.',
  },

  // ── T\'au Empire ───────────────────────────────────────────────
  {
    id: 'influence_points',
    name: 'Influence Points',
    factionIds: ['tau_empire'],
    description: 'Political influence earned through diplomacy. Used to convert Demographics and expand the Greater Good.',
  },

  // ── Genestealer Cults ──────────────────────────────────────────
  {
    id: 'infiltration_points',
    name: 'Infiltration Points',
    factionIds: ['genestealer_cults'],
    description: 'Covert influence over local institutions. Used to Control Institutions and expand the cult.',
  },

  // ── Aeldari ────────────────────────────────────────────────────
  {
    id: 'threat',
    name: 'Threat',
    factionIds: ['aeldari'],
    description: 'Attention drawn from She Who Thirsts. Lower is better. Aeldari must carefully manage their Threat level.',
  },
];

/** Get all resources relevant to a given faction and optional subfaction. */
export function getFactionResources(factionId: string, subfactionId?: string): FactionResourceDef[] {
  return FACTION_RESOURCES.filter(r => {
    if (!r.factionIds.includes(factionId)) return false;
    if (r.subfactionIds && subfactionId && !r.subfactionIds.includes(subfactionId)) return false;
    if (r.subfactionIds && !subfactionId) return false;
    return true;
  });
}

/** Build initial factionResources map for a new campaign, setting all values to 0. */
export function buildInitialFactionResources(factionId: string, subfactionId?: string): Record<string, number> {
  const defs = getFactionResources(factionId, subfactionId);
  const map: Record<string, number> = {};
  for (const d of defs) {
    map[d.id] = 0;
  }
  return map;
}
