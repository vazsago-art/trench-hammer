/**
 * Mercenary eligibility logic.
 *
 * Warband alignment determines which mercenary pool(s) are accessible:
 *  - imperial  → Imperial pool
 *  - chaos     → Chaos pool
 *  - xenos     → Their own faction's Xenos entries (filtered by availableTo)
 *  - outlaw    → Outlaw pool (+ cross-list entries as noted in individual entries)
 *
 * Special cases handled here:
 *  - T'au Auxiliary Cadre subfaction → also gets Imperial + Outlaw pools
 *  - Dark Mechanicum (AdMech variant) → Chaos alignment
 *  - Traitor Guard (AM variant)       → Chaos alignment
 *  - Renegade Space Marines (AA)      → Outlaw alignment (replaces Imperial)
 *  - Night Lords (HA)                 → Chaos + Outlaw pools (optionally count as Outlaw)
 */
import { Mercenary, WarbandAlignment } from '../types/index';
import { ALL_MERCENARIES } from './mercenaries';

// ---------------------------------------------------------------------------
// Faction → Alignment lookup
// ---------------------------------------------------------------------------

/** Base alignment for each faction ID. */
const FACTION_ALIGNMENT: Record<string, WarbandAlignment> = {
  // Imperial
  adepta_sororitas: 'imperial',
  adeptus_astartes: 'imperial',
  adeptus_custodes: 'imperial',
  adeptus_mechanicus: 'imperial',
  adeptus_ministorum: 'imperial',
  astra_militarum: 'imperial',
  officio_assassinorum: 'imperial',
  the_inquisition: 'imperial',
  rogue_trader: 'imperial',
  // Necromunda imperial gangs
  'necromunda_gang:palanite_enforcers': 'imperial',
  'necromunda_gang:adeptus_arbites': 'imperial',
  // Chaos
  heretic_astartes: 'chaos',
  chaos_daemons: 'chaos',
  vermintide: 'chaos',
  // Xenos
  aeldari: 'xenos',
  drukhari: 'xenos',
  genestealer_cults: 'xenos',
  harlequins: 'xenos',
  leagues_of_votann: 'xenos',
  necrons: 'xenos',
  orks: 'xenos',
  slanni: 'xenos',
  t_au_empire: 'xenos',
  tyranids: 'xenos',
  // Outlaw / Necromunda gangs (default to outlaw unless listed above)
  pirate_crew: 'outlaw',
  necromunda_gang: 'outlaw',
};

/**
 * Subfaction overrides that change the base alignment for a faction.
 * Key format: 'factionId:subfactionId'.
 */
const SUBFACTION_ALIGNMENT_OVERRIDE: Record<string, WarbandAlignment> = {
  // Chaos overrides within nominally Imperial factions
  'adeptus_mechanicus:dark_mechanicum': 'chaos',
  'astra_militarum:traitor_guard': 'chaos',
  'necromunda_gang:corpsegrinder_cult': 'chaos',
  // Outlaw overrides within nominally Imperial factions
  'adeptus_astartes:renegade_space_marines': 'outlaw',
  // Necromunda Imperial gangs
  'necromunda_gang:palanite_enforcers': 'imperial',
  'necromunda_gang:adeptus_arbites': 'imperial',
  'necromunda_gang:house_cawdor': 'imperial',
  // Leagues of Votann expressed via Necromunda
  'necromunda_gang:ironhead_squat_prospectors': 'xenos',
};

/**
 * Subfactions that additionally get access to the IMPERIAL mercenary pool
 * on top of their base pool.
 */
const ALSO_IMPERIAL_SUBFACTIONS = new Set([
  't_au_empire:auxiliary_cadre',
]);

/**
 * Subfactions that additionally get access to the OUTLAW mercenary pool.
 */
const ALSO_OUTLAW_SUBFACTIONS = new Set([
  't_au_empire:auxiliary_cadre',
  // Night Lords can optionally count as an Outlaw warband instead of Chaos,
  // so they have access to both chaos and outlaw mercenary pools.
  'heretic_astartes:night_lords',
]);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Resolve the warband alignment for a given faction + optional subfaction.
 */
export function getWarbandAlignment(
  factionId: string,
  subfactionId?: string,
): WarbandAlignment {
  const subKey = subfactionId ? `${factionId}:${subfactionId}` : null;
  if (subKey && SUBFACTION_ALIGNMENT_OVERRIDE[subKey]) {
    return SUBFACTION_ALIGNMENT_OVERRIDE[subKey];
  }
  return FACTION_ALIGNMENT[factionId] ?? 'outlaw';
}

/**
 * Return all mercenaries that a warband may hire, accounting for:
 *  - Warband alignment (determines which pool(s) to draw from)
 *  - `availableTo` restrictions (opt-in lists)
 *  - `unavailableTo` restrictions (opt-out lists)
 *  - `leaderKeywordRequired` (filtered out when no matching keywords provided)
 *
 * @param factionId      - The warband's faction ID (e.g. 'adeptus_astartes')
 * @param subfactionId   - Optional subfaction ID (e.g. 'black_templars')
 * @param leaderKeywords - Keywords carried by the warband leader (for restricted mercs)
 */
export function getAvailableMercenaries(
  factionId: string,
  subfactionId?: string,
  leaderKeywords: string[] = [],
): Mercenary[] {
  const alignment = getWarbandAlignment(factionId, subfactionId);
  const subKey = subfactionId ? `${factionId}:${subfactionId}` : null;

  // Build the set of allowed pools for this warband
  const allowedPools = new Set<WarbandAlignment>([alignment]);
  if (subKey) {
    if (ALSO_IMPERIAL_SUBFACTIONS.has(subKey)) allowedPools.add('imperial');
    if (ALSO_OUTLAW_SUBFACTIONS.has(subKey)) allowedPools.add('outlaw');
  }

  return ALL_MERCENARIES.filter((merc) => {
    // 1. Pool check
    if (!allowedPools.has(merc.category)) return false;

    // 2. opt-in (availableTo) check
    if (merc.availableTo && merc.availableTo.length > 0) {
      const allowed = merc.availableTo.some((rule) =>
        ruleMatches(rule, factionId, subfactionId, alignment),
      );
      if (!allowed) return false;
    }

    // 3. opt-out (unavailableTo) check
    if (merc.unavailableTo && merc.unavailableTo.length > 0) {
      const banned = merc.unavailableTo.some((rule) =>
        ruleMatches(rule, factionId, subfactionId, alignment),
      );
      if (banned) return false;
    }

    // 4. Leader keyword requirement
    if (merc.leaderKeywordRequired) {
      const kw = merc.leaderKeywordRequired.toUpperCase();
      if (!leaderKeywords.some((lk) => lk.toUpperCase() === kw)) return false;
    }

    return true;
  });
}

/**
 * Check whether a rule string matches the given warband context.
 *
 * Rule formats:
 *  - Alignment:   'imperial' | 'chaos' | 'xenos' | 'outlaw'
 *  - Faction:     'adeptus_astartes'
 *  - Faction+sub: 'adeptus_astartes:black_templars'
 */
function ruleMatches(
  rule: string,
  factionId: string,
  subfactionId: string | undefined,
  alignment: WarbandAlignment,
): boolean {
  // Alignment match
  if (rule === alignment) return true;
  if (rule === 'imperial' || rule === 'chaos' || rule === 'xenos' || rule === 'outlaw') {
    return rule === alignment;
  }
  // Faction+subfaction match
  if (subfactionId && rule === `${factionId}:${subfactionId}`) return true;
  // Faction-only match (no subfaction qualifier in rule)
  if (!rule.includes(':') && rule === factionId) return true;
  return false;
}

/**
 * Return a grouped summary object for UI rendering.
 * Keys are subcategory names; values are arrays of eligible mercenaries.
 */
export function getGroupedAvailableMercenaries(
  factionId: string,
  subfactionId?: string,
  leaderKeywords: string[] = [],
): Record<string, Mercenary[]> {
  const available = getAvailableMercenaries(factionId, subfactionId, leaderKeywords);
  return available.reduce<Record<string, Mercenary[]>>((acc, merc) => {
    if (!acc[merc.subcategory]) acc[merc.subcategory] = [];
    acc[merc.subcategory].push(merc);
    return acc;
  }, {});
}
