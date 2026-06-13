/**
 * quickBuild.ts
 *
 * Greedy army-builder for new players.
 * Takes a credit/glory budget + play-style preference and returns
 * one (or several) ready-to-load WarbandUnit[] lists.
 *
 * No React imports — safe to call from anywhere.
 */

import type { UnitOption, WarbandUnit, UnitSubType, SelectedWargear, SelectedPsychicPower, Weapon, WargearOption } from '../types/index.js';
import { allFactions } from '../data/factions_complete.js';
import { getAllowedWargearIds } from '../data/faction_wargear.js';
import { lookupWeapon, lookupWargear } from '../data/wargearSlotValidation.js';
import { getDisciplinesForFaction } from '../data/psychicDisciplines.js';
import { getSubFactionById, getDefaultSubFactionId } from '../data/subfactions.js';

// ─── Public types ────────────────────────────────────────────────────────────

export type PlayStyle = 'balanced' | 'aggressive' | 'ranged' | 'horde' | 'elite';

/**
 * The tactical battlefield role assigned to each unit during auto-build.
 * Determines weapon preference and contributes to warband composition analysis.
 * - brawler:    Close-combat specialist; prefers melee weapons + pistol sidearm.
 * - gunner:     Fire-support; prefers long-range weapons; holds a static position.
 * - skirmisher: Mobile shooter; prefers ASSAULT weapons; advances and shoots.
 * - sniper:     Accurate long-range; values IGNORE COVER and AP weapons; stays hidden.
 * - support:    Leader/Icon/SYNAPSE; enables allies; takes a reliable sidearm.
 * - specialist: Psyker, vehicle, or otherwise unique — special-cased equipment logic.
 */
export type BattlefieldRole = 'brawler' | 'gunner' | 'skirmisher' | 'sniper' | 'support' | 'specialist';

export interface QuickBuildConfig {
  /** null = show recommendations for all beginner factions */
  factionId: string | null;
  creditLimit: number;
  gloryLimit: number;
  playStyle: PlayStyle;
  /** Subfaction / warband variant ID. Defaults to 'no_variant' if omitted. */
  subfactionId?: string;
}

export interface QuickBuildLineItem {
  unit: UnitOption;
  count: number;
  creditCost: number;
  /** Auto-applied sub-type, if the unit required one */
  appliedSubType?: UnitSubType;
  /** The tactical battlefield role assigned to this unit during auto-build. */
  tacticalRole: BattlefieldRole;
}

export interface QuickBuildResult {
  factionId: string;
  factionName: string;
  units: QuickBuildLineItem[];
  totalCredits: number;
  totalModels: number;
  playStyle: PlayStyle;
  buildLabel: string;
  factionTip: string;
  playstyleTip: string;
  generalTips: string[];
  /** Ready-to-load WarbandUnit objects */
  warbandUnits: WarbandUnit[];
  /** True if the budget was too tight to build a legal army */
  infeasible?: boolean;
}

// ─── Beginner metadata ───────────────────────────────────────────────────────

export const BEGINNER_FACTION_IDS = [
  'adeptus_astartes',
  'astra_militarum',
  'chaos_cult',
  'orks',
  'necromunda_gang',
] as const;

const FACTION_TIPS: Partial<Record<string, string>> = {
  adeptus_astartes:
    'Space Marines are elite warriors with great armour and stats. Fewer models but each one punches hard — ideal first choice.',
  astra_militarum:
    'The Imperial Guard fights with massed infantry and firepower. Lots of models to learn the rules with, and very familiar to 40k fans.',
  chaos_cult:
    'Cheap, numerous cultists make this forgiving for beginners. Overwhelming numbers compensate for weaker individuals.',
  orks:
    'Big green fighting machines. Low complexity — just charge the enemy! Great for a fun, aggressive first game.',
  necromunda_gang:
    'Flexible gang fighters with cheap base costs. Great for trying many unit types without blowing the whole budget on one model.',
  adeptus_sororitas:
    'Sisters of Battle: faith-driven warriors with solid armour and ranged firepower plus support abilities.',
  heretic_astartes:
    'Chaos Space Marines mirror the loyalists but with darker flavour and access to Marks of Chaos.',
  chaos_daemons:
    'Summoned daemons with powerful special rules. Higher complexity, but fun and thematic.',
  t_au_empire:
    "T'au excel at ranged combat with battlesuits and drones. Very shooty, moderate complexity.",
  necrons:
    'Undying automata that can reanimate after being struck down. Tanky and methodical.',
};

const DEFAULT_FACTION_TIP = 'A capable warband. Read their faction rules for special abilities.';

const PLAY_STYLE_TIPS: Record<PlayStyle, string> = {
  balanced:
    'A balanced mix of elites and troops. No extreme weaknesses — great for learning all the mechanics.',
  aggressive:
    'Close-combat focused. Rush the enemy and win in melee. Keep moving and use terrain for cover on the way in.',
  ranged:
    'Stand back, take cover, and shoot. Focus fire on single targets to take them off the board quickly.',
  horde:
    'Maximum models on a budget. Losing a few hurts less. Overwhelm the enemy with activations and board presence.',
  elite:
    'A small warband of hard-hitting elites. Every model matters — play carefully, use cover, and pick your fights.',
};

const GENERAL_TIPS = [
  'Start with the standard 700-credit game size to learn the core rules.',
  'Always use terrain — cover is critical. Shooting from behind a wall is much safer.',
  'Blood Markers slow your models: try to remove them or force the enemy to spend theirs.',
  'ELITE models can earn XP and Campaign Skills during a campaign. Protect them!',
  'Read the keywords on your units before the game — they unlock a lot of special plays.',
];

// ─── Scoring ─────────────────────────────────────────────────────────────────

/**
 * Determine the primary battlefield role of a unit based on its stats and keywords.
 * This drives weapon selection and warband composition gap-filling.
 */
function detectUnitRole(unit: UnitOption, extraKws: string[] = []): BattlefieldRole {
  const kws = [...unit.keywords, ...extraKws].map(k => k.toUpperCase());
  const ms = unit.stats.meleeSkill  ?? 2;
  const rs = unit.stats.rangedSkill ?? 2;
  const mv = unit.stats.movement    ?? 6;

  if (kws.includes('VEHICLE')) return 'specialist';
  if (kws.some(k => k === 'PSYKER' || k.startsWith('PSYKER '))) return 'specialist';
  if (kws.some(k => ['SYNAPSE', 'LEADER', 'ICON'].includes(k))) return 'support';
  if (kws.some(k => ['SCOUT', 'CONCEALMENT', 'STEALTH'].includes(k))) return 'sniper';

  if (ms > rs) return 'brawler';
  if (rs > ms) return mv >= 7 ? 'skirmisher' : 'gunner';
  // equal stats: fast models skirmish, slow models brawl
  return mv >= 7 ? 'skirmisher' : 'brawler';
}

function scoreUnit(
  unit: UnitOption,
  style: PlayStyle,
  roleCounts?: Partial<Record<BattlefieldRole, number>>,
): number {
  const ms  = unit.stats.meleeSkill  ?? 2;
  const rs  = unit.stats.rangedSkill ?? 2;
  const as_ = unit.stats.armourSave  ?? 0; // negative = better armour
  const mv  = unit.stats.movement    ?? 6;

  let score = 0;
  switch (style) {
    case 'aggressive':
      score = ms * 4 + mv + (-as_ * 2) + (unit.unitType === 'elite' ? 10 : 0);
      break;
    case 'ranged':
      score = rs * 4 + (-as_) + (unit.unitType === 'elite' ? 8 : 0);
      break;
    case 'horde':
      score = (unit.unitType === 'troop' ? 20 : 0) + Math.max(0, 200 - unit.baseCost);
      break;
    case 'elite':
      score = unit.baseCost + (-as_ * 5) + (unit.unitType === 'elite' ? 30 : 0);
      break;
    case 'balanced':
    default:
      score = (ms + rs) * 3 + (-as_) + mv / 2;
      break;
  }

  // ── Composition gap-filling bonus ────────────────────────────────────────
  // When the warband is missing certain roles, boost units that would fill them.
  if (roleCounts) {
    const unitRole = detectUnitRole(unit);
    const total = Object.values(roleCounts).reduce((s, c) => s + (c ?? 0), 0);
    const roleCount = roleCounts[unitRole] ?? 0;
    // A role absent from the warband gets a strong bonus; an underrepresented role
    // (< 25% of models so far) gets a smaller bonus.
    if (total > 0) {
      const fraction = roleCount / total;
      if (fraction === 0) score += 25;
      else if (fraction < 0.25) score += 12;
    }

    // Balanced style always wants at least one ranged-capable unit
    if (style === 'balanced') {
      const rangedRoles: BattlefieldRole[] = ['gunner', 'skirmisher', 'sniper'];
      const hasRanged = rangedRoles.some(r => (roleCounts[r] ?? 0) > 0);
      if (!hasRanged && rangedRoles.includes(unitRole)) score += 20;
    }
  }

  return score;
}

// ─── Warband-unit factory ────────────────────────────────────────────────────

let _idCounter = 0;

/**
 * Returns true if the unit has at least one weapon (ranged or melee) in its
 * defaultWargear list, meaning it comes armed out of the box.
 */
function hasDefaultWeapon(unit: UnitOption): boolean {
  return unit.defaultWargear.some(w => {
    const type = (w as { type?: string }).type ?? '';
    return ['ranged', 'melee', 'heavy', 'thrown', 'weapon'].includes(type);
  });
}

/** Returns true if the unit's defaultWargear already includes armour. */
function hasDefaultArmour(unit: UnitOption): boolean {
  return unit.defaultWargear.some(w => {
    const type = (w as { type?: string }).type ?? '';
    const slot = (w as { slot?: string }).slot ?? '';
    return type === 'armor' || slot === 'body-armour';
  });
}

/**
 * Returns true if the unit should NOT be auto-equipped with armour.
 * VEHICLEs have structural protection; units with armourSave <= -2 already
 * have strong built-in armour (Power Armour equivalent or better).
 */
function shouldSkipAutoArmour(unit: UnitOption): boolean {
  if (unit.keywords.includes('VEHICLE')) return true;
  if ((unit.stats.armourSave ?? 0) <= -2) return true;
  return false;
}

/**
 * Score a weapon for a given unit role, unit stats, and play style.
 * Role is the primary driver; play style is a secondary modifier.
 * Higher = better choice.
 */
function scoreWeapon(
  w: Weapon,
  style: PlayStyle,
  unitRole: BattlefieldRole = 'brawler',
  unitStats?: { meleeSkill: number; rangedSkill: number; movement: number },
): number {
  const kws = w.keywords ?? [];
  let score = 0;

  const isRanged = w.type === 'ranged' || w.type === 'heavy';
  const isMelee  = w.type === 'melee';
  const hasAssault    = kws.includes('ASSAULT');
  const hasPistol     = kws.includes('PISTOL');
  const hasHeavy      = kws.includes('HEAVY');
  const mv = unitStats?.movement ?? 6;

  // ── Keyword value bonuses (universal) ────────────────────────────────────
  for (const kw of kws) {
    if (/^AUTOMATIC\s+\d+/i.test(kw))         score += 6;   // burst fire
    if (/^ARMOUR PIERCING\s+\d+/i.test(kw))   score += 5;   // AP rounds
    if (kw === 'IGNORE ARMOUR')                score += 6;
    if (kw === 'IGNORE COVER')                 score += 3;
    if (/^\+1 DICE/i.test(kw))                score += 5;
    if (/^\+1 INJURY DICE/i.test(kw))         score += 5;
    if (kw === 'CRITICAL')                     score += 3;
    if (/^-1 DICE/i.test(kw))                 score -= 3;   // inaccurate
    if (/^-1 INJURY DICE/i.test(kw))          score -= 2;   // weaker hits
    if (kw === 'RISKY')                        score -= 3;
  }

  // ── Role-based weapon matching ────────────────────────────────────────────
  switch (unitRole) {
    case 'brawler':
      // Melee specialists — melee weapons are strongly preferred.
      // PISTOL is acceptable as a mobile sidearm.
      // HEAVY or slow ranged weapons are a poor fit.
      score += isMelee ? 24 : -8;
      if (hasPistol)  score += 6;   // pistol is still useful for brawlers
      if (hasHeavy)   score -= 10;  // can't charge and fire heavy
      if (hasAssault) score += 4;   // assault weapons can help close the gap
      break;

    case 'gunner':
      // Fire-support — long-range ranged is ideal; HEAVY is acceptable (they stay still).
      score += isRanged ? 22 : -12;
      score += (w.range ?? 6) * 0.6;  // reward range
      if (hasHeavy)   score += 6;   // gunners can afford to go static
      if (hasPistol)  score -= 6;   // too short range
      if (hasAssault) score += 2;   // minor flexibility bonus
      if (isMelee)    score -= 14;
      break;

    case 'skirmisher':
      // Mobile shooters — ASSAULT weapons are ideal; PISTOL is good.
      // Long-range weapons with HEAVY are a bad fit (can't move and shoot).
      score += isRanged ? 12 : -4;
      if (hasAssault)              score += 18;  // main benefit of skirmisher role
      if (hasPistol)               score += 8;   // pistols suit mobile models
      if (hasHeavy)                score -= 14;  // can't advance and fire
      score += (w.range ?? 6) * 0.3;
      // Very fast models (7"+) value high-mobility weapons even more
      if (mv >= 8 && hasAssault)   score += 5;
      break;

    case 'sniper':
      // Accurate, long-range; favours AP + IGNORE COVER; avoids PISTOL / HEAVY.
      score += isRanged ? 18 : -10;
      score += (w.range ?? 6) * 0.9;  // range is the most important
      if (kws.includes('IGNORE COVER'))   score += 10;
      if (kws.some(k => /ARMOUR PIERCING/i.test(k))) score += 8;
      if (hasPistol)  score -= 8;   // too short range
      if (hasHeavy)   score -= 4;   // snipers do stay still, but heavy is limiting
      if (isMelee)    score -= 14;
      break;

    case 'support':
      // Leaders/Icons — they fight but aren't the primary damage dealer.
      // A solid all-round weapon; slight ranged preference for staying safe.
      score += isRanged ? 6 : 2;
      if (hasHeavy)   score -= 8;   // need to stay mobile to support allies
      break;

    case 'specialist':
      // Psykers / vehicles — neutral; handled by psychic power logic separately.
      score += isRanged ? 4 : 0;
      break;
  }

  // ── Stat-based bonus: match weapon type to unit's better skill ───────────
  if (unitStats) {
    const ms = unitStats.meleeSkill;
    const rs = unitStats.rangedSkill;
    if (isMelee  && ms >= 2) score += ms * 3;
    if (isRanged && rs >= 2) score += rs * 3;
    // If the unit's skills are equal, slight preference for the weapon type
    // that suits their movement (mobile → ranged with assault; slow → melee)
    if (ms === rs) {
      if (isRanged && hasAssault && mv >= 6) score += 4;
      if (isMelee  && mv >= 7)              score += 3;
    }
  }

  // ── Play-style secondary modifier (smaller influence than role) ───────────
  switch (style) {
    case 'ranged':    score += isRanged ? 6 : -6; break;
    case 'aggressive': score += isMelee  ? 6 : -4; break;
    case 'horde':     score -= (w.cost ?? 0) * 0.2; break;  // favour cheap
    case 'elite':     score += 3; break;
    case 'balanced':  score += isRanged ? 2 : 0; break;
  }

  return score;
}

/**
 * Pick the best credit-cost weapon from the faction's allowed pool within budget.
 * Returns null if nothing affordable / suitable is found.
 */
function pickBestWeapon(
  factionId: string,
  subfactionId: string,
  unitId: string,
  unitKeywords: string[],
  playStyle: PlayStyle,
  budget: number,
  unitRole: BattlefieldRole = 'brawler',
  unitStats?: { meleeSkill: number; rangedSkill: number; movement: number },
  excludeIds?: Set<string>,
): SelectedWargear | null {
  const allowedIds = getAllowedWargearIds(factionId, unitId, subfactionId) ?? [];
  const candidates = allowedIds
    .map(id => ({ id, w: lookupWeapon(id) }))
    .filter((c): c is { id: string; w: Weapon } => !!c.w)
    .filter(c => (c.w.costCurrency ?? 'credits') === 'credits')
    .filter(c => (c.w.cost ?? 0) <= budget)
    .filter(c => !excludeIds?.has(c.id))
    // Respect restrictedTo: only pick weapon if unit has all required keywords
    .filter(c => {
      const rt = c.w.restrictedTo;
      if (!rt || rt.length === 0) return true;
      return rt.every(req => {
        if (req.startsWith('NOT:')) return !unitKeywords.includes(req.slice(4));
        return unitKeywords.includes(req);
      });
    });

  if (candidates.length === 0) return null;

  // Score each candidate against the unit's role, stats, and play style
  const best = candidates.reduce((a, b) =>
    scoreWeapon(a.w, playStyle, unitRole, unitStats) >=
    scoreWeapon(b.w, playStyle, unitRole, unitStats) ? a : b,
  );

  return {
    id: best.id,
    name: best.w.name,
    cost: best.w.cost ?? 0,
    costCurrency: 'credits',
    type: 'weapon',
    quantity: 1,
    grantsKeywords: best.w.grantsKeywords ?? [],
  } as SelectedWargear;
}

/**
 * Pick the best affordable armour from the faction's allowed pool.
 * Returns null if nothing fits the budget.
 */
function pickBestArmour(
  factionId: string,
  subfactionId: string,
  unitId: string,
  budget: number,
): SelectedWargear | null {
  const allowedIds = getAllowedWargearIds(factionId, unitId, subfactionId) ?? [];
  // Armour items come from the WargearOption side
  type WargearEntry = { id: string; w: WargearOption };
  const armourCandidates = allowedIds
    .map(id => ({ id, w: lookupWargear(id) }))
    .filter((c): c is WargearEntry => !!c.w)
    .filter(c => c.w.slot === 'body-armour')
    .filter(c => (c.w.costCurrency ?? 'credits') === 'credits')
    .filter(c => c.w.cost <= budget);

  if (armourCandidates.length === 0) return null;

  // Pick highest armour (largest cost within budget = best protection)
  const best = armourCandidates.reduce((a, b) => a.w.cost >= b.w.cost ? a : b);

  return {
    id: best.id,
    name: best.w.name,
    cost: best.w.cost,
    costCurrency: 'credits',
    type: 'armor',
    quantity: 1,
    grantsKeywords: best.w.grantsKeywords ?? [],
  } as SelectedWargear;
}

/**
 * Try to pick a complementary secondary weapon that pairs well with the primary.
 * - Brawlers (melee primary): look for a PISTOL sidearm within budget.
 * - Gunners (ranged primary): look for a cheap melee backup.
 * - Skirmishers: optionally a melee weapon when budget allows.
 * Returns null if nothing suitable / affordable is available.
 */
function pickSecondaryWeapon(
  factionId: string,
  subfactionId: string,
  unitId: string,
  unitKeywords: string[],
  budget: number,
  unitRole: BattlefieldRole,
  primaryId: string,
  usedLimitedIds: Set<string>,
): SelectedWargear | null {
  if (budget < 5) return null;

  // Determine the desired secondary weapon type based on role
  const wantPistol  = unitRole === 'brawler';
  const wantMelee   = unitRole === 'gunner' || unitRole === 'skirmisher';
  if (!wantPistol && !wantMelee) return null;

  const allowedIds = getAllowedWargearIds(factionId, unitId, subfactionId) ?? [];
  const candidates = allowedIds
    .map(id => ({ id, w: lookupWeapon(id) }))
    .filter((c): c is { id: string; w: Weapon } => !!c.w)
    .filter(c => c.id !== primaryId)
    .filter(c => (c.w.costCurrency ?? 'credits') === 'credits')
    .filter(c => (c.w.cost ?? 0) <= budget)
    .filter(c => !usedLimitedIds.has(c.id))
    .filter(c => {
      const rt = c.w.restrictedTo;
      if (!rt || rt.length === 0) return true;
      return rt.every(req =>
        req.startsWith('NOT:') ? !unitKeywords.includes(req.slice(4)) : unitKeywords.includes(req),
      );
    })
    .filter(c => {
      if (wantPistol) return (c.w.keywords ?? []).includes('PISTOL');
      if (wantMelee)  return c.w.type === 'melee';
      return false;
    });

  if (candidates.length === 0) return null;

  // Pick cheapest suitable secondary (conserve budget for armour/upgrades)
  const best = candidates.reduce((a, b) => (a.w.cost ?? 0) <= (b.w.cost ?? 0) ? a : b);

  const limit = best.w.limit ?? Infinity;
  if (isFinite(limit) && usedLimitedIds.has(best.id)) return null;

  return {
    id: best.id,
    name: best.w.name,
    cost: best.w.cost ?? 0,
    costCurrency: 'credits',
    type: 'weapon',
    quantity: 1,
    grantsKeywords: best.w.grantsKeywords ?? [],
  } as SelectedWargear;
}

/**
 * Returns a PSYKER level number extracted from unit keywords, e.g. 'PSYKER 2' → 2.
 * Returns 0 if not a psyker.
 */
function psykerLevel(keywords: string[]): number {
  for (const kw of keywords) {
    const m = kw.match(/^PSYKER\s+(\d+)$/i);
    if (m) return parseInt(m[1], 10);
  }
  return 0;
}

/**
 * Picks up to `maxPowers` cheap psychic powers for a psyker unit from the
 * faction's default discipline (or subfaction override discipline).
 */
function pickPsychicPowers(
  factionId: string,
  subfactionId: string,
  level: number,
  creditBudget: number,
  gloryBudget: number,
): SelectedPsychicPower[] {
  const sf = subfactionId !== 'no_variant'
    ? getSubFactionById(factionId, subfactionId)
    : null;
  const disciplineOverride =
    sf?.psychicDisciplineIds ?? (sf?.psychicDisciplineId ? [sf.psychicDisciplineId] : undefined);

  const disciplines = getDisciplinesForFaction(factionId, disciplineOverride);
  if (disciplines.length === 0) return [];

  const disc = disciplines[0];
  // Sort powers cheapest first; skip glory-cost powers if warband has no glory.
  const sorted = [...disc.powers]
    .filter(p => {
      const curr = p.costCurrency ?? 'credits';
      return curr === 'credits' || (curr === 'glory' && gloryBudget > 0);
    })
    .sort((a, b) => a.cost - b.cost);
  const picked: SelectedPsychicPower[] = [];
  let remainingCr = creditBudget;
  let remainingGl = gloryBudget;

  for (const power of sorted) {
    if (picked.length >= level) break;
    const cost = power.cost ?? 0;
    const curr = power.costCurrency ?? 'credits';
    if (curr === 'glory') {
      if (cost > remainingGl) continue;
      remainingGl -= cost;
    } else {
      if (cost > remainingCr) continue;
      remainingCr -= cost;
    }
    picked.push({
      id: power.id,
      name: power.name,
      disciplineId: disc.id,
      disciplineName: disc.name,
      cost,
      costCurrency: curr,
    });
  }
  return picked;
}

function makeWarbandUnit(
  unit: UnitOption,
  count: number,
  factionId: string,
  subfactionId: string,
  playStyle: PlayStyle,
  wargearBudgetPerModel: number,
  gloryBudget: number,
  /** Tracks IDs of limited-use items already allocated across this build */
  usedLimitedIds: Set<string>,
  subType?: UnitSubType,
): WarbandUnit {
  const id = `qb-${++_idCounter}-${unit.id}`;
  const extraKws = subType?.grantedKeywords ?? [];
  const allKws = [...new Set([...unit.keywords, ...extraKws])];

  // Detect unit's battlefield role to drive weapon selection
  const unitRole = detectUnitRole(unit, extraKws);
  const unitStats = {
    meleeSkill:  unit.stats.meleeSkill  ?? 2,
    rangedSkill: unit.stats.rangedSkill ?? 2,
    movement:    unit.stats.movement    ?? 6,
  };

  const autoWargear: SelectedWargear[] = [];
  let remaining = wargearBudgetPerModel;

  // ── 0. Auto-select: one Background upgrade for Pirates/units with backgrounds
  const autoUpgrades: Record<string, number> = {};
  if (unit.upgrades?.length) {
    const backgrounds = unit.upgrades.filter(u => u.upgradeGroup === 'background');
    if (backgrounds.length > 0) {
      const pick = backgrounds
        .filter(b => b.cost >= 0)
        .sort((a, b) => a.cost - b.cost)[0]
        ?? backgrounds.sort((a, b) => a.cost - b.cost)[0];
      autoUpgrades[pick.id] = 1;
      remaining -= (pick.cost ?? 0);
    }
  }

  // ── 1. Auto-equip: primary weapon matched to the unit's battlefield role ──
  let primaryWeaponId: string | null = null;
  if (!unit.cannotEquip && !hasDefaultWeapon(unit)) {
    const weapon = pickBestWeapon(
      factionId, subfactionId, unit.id, allKws, playStyle, remaining,
      unitRole, unitStats,
    );
    if (weapon) {
      const weaponDef = lookupWeapon(weapon.id);
      const limit = weaponDef?.limit ?? Infinity;
      if (!isFinite(limit) || !usedLimitedIds.has(weapon.id)) {
        autoWargear.push(weapon);
        remaining -= weapon.cost;
        primaryWeaponId = weapon.id;
        if (isFinite(limit)) usedLimitedIds.add(weapon.id);
      }
    }
  }

  // ── 2. Auto-equip: secondary weapon (sidearm / backup) ───────────────────
  // Only attempt when the unit has budget remaining and a primary was picked.
  // Brawlers get a pistol sidearm; gunners/skirmishers get a melee backup.
  if (!unit.cannotEquip && primaryWeaponId && remaining >= 10 && unitRole !== 'specialist') {
    const secondary = pickSecondaryWeapon(
      factionId, subfactionId, unit.id, allKws,
      Math.floor(remaining * 0.5),  // spend at most half remaining on secondary
      unitRole, primaryWeaponId, usedLimitedIds,
    );
    if (secondary) {
      const secDef = lookupWeapon(secondary.id);
      const limit = secDef?.limit ?? Infinity;
      if (!isFinite(limit) || !usedLimitedIds.has(secondary.id)) {
        autoWargear.push(secondary);
        remaining -= secondary.cost;
        if (isFinite(limit)) usedLimitedIds.add(secondary.id);
      }
    }
  }

  // ── 3. Auto-equip: armour if unit has none ────────────────────────────────
  if (!unit.cannotEquip && !hasDefaultArmour(unit) && !shouldSkipAutoArmour(unit) && remaining >= 10) {
    const armour = pickBestArmour(factionId, subfactionId, unit.id, remaining);
    if (armour) {
      autoWargear.push(armour);
      remaining -= armour.cost;
    }
  }

  // ── 4. Auto-equip: psychic powers for PSYKER units ───────────────────────
  const level = psykerLevel(allKws);
  const autoPsychic: SelectedPsychicPower[] = level > 0
    ? pickPsychicPowers(factionId, subfactionId, level, remaining, gloryBudget)
    : [];
  remaining -= autoPsychic.reduce((s, p) => s + p.cost, 0);

  const extraCostPerModel = wargearBudgetPerModel - remaining;
  const upgradeCostTotal = Object.entries(autoUpgrades).reduce((s, [uid, cnt]) => {
    const upg = unit.upgrades?.find(u => u.id === uid);
    return s + (upg?.cost ?? 0) * cnt;
  }, 0);
  const totalCost = (unit.baseCost + extraCostPerModel) * count + upgradeCostTotal;

  return {
    id,
    unitId: unit.id,
    name: unit.name,
    count,
    baseCostPerModel: unit.baseCost,
    costCurrency: 'credits',
    selectedWargear: autoWargear,
    selectedUpgrades: autoUpgrades,
    totalCost,
    totalGloryCost: 0,
    keywords: allKws,
    unitType: unit.unitType,
    ...(autoPsychic.length > 0 ? { selectedPsychicPowers: autoPsychic } : {}),
    ...(subType ? {
      selectedSubType: subType.id,
      subTypeName: subType.name,
      appliedSubType: subType,
    } : {}),
    schemaVersion: 1,
  } as WarbandUnit;
}

// ─── Core builder ────────────────────────────────────────────────────────────

function buildForFaction(
  factionId: string,
  creditLimit: number,
  gloryLimit: number,
  playStyle: PlayStyle,
  subfactionId: string,
): QuickBuildResult {
  const faction = allFactions.find(f => f.id === factionId);
  const infeasible: QuickBuildResult = {
    factionId,
    factionName: faction?.name ?? factionId,
    units: [],
    totalCredits: 0,
    totalModels: 0,
    playStyle,
    buildLabel: `${faction?.name ?? factionId}`,
    factionTip: FACTION_TIPS[factionId] ?? DEFAULT_FACTION_TIP,
    playstyleTip: PLAY_STYLE_TIPS[playStyle],
    generalTips: GENERAL_TIPS,
    warbandUnits: [],
    infeasible: true,
  };

  if (!faction) return infeasible;

  // Filter out subfaction-banned units
  const sf = subfactionId !== 'no_variant' ? getSubFactionById(factionId, subfactionId) : null;
  const bannedIds = new Set(sf?.bannedUnitIds ?? []);

  // Only use credits-cost units (skip mercenary/glory-cost entries)
  const pool = faction.units.filter(
    u => (u.costCurrency ?? 'credits') === 'credits' && !bannedIds.has(u.id),
  );

  // --- Mandatory units (minCount > 0) -----------------------------------------
  const mandatory = pool.filter(u => u.minCount > 0);
  const optional  = pool.filter(u => u.minCount === 0);

  const lineItems: QuickBuildLineItem[] = [];

  let spent = 0;

  // Tiered wargear estimate: elites can afford more gear than troops.
  // These are rough estimates used only for budget reservation; actual
  // equipment is assigned per-model based on remaining budget later.
  const WARGEAR_ELITE = 55;   // expected spend per elite model
  const WARGEAR_TROOP = 30;   // expected spend per troop model

  // Warband role tracker — used to boost scoring for gap-filling
  const roleCounts: Partial<Record<BattlefieldRole, number>> = {};
  const addRoles = (unit: UnitOption, count: number, extraKws: string[] = []) => {
    const role = detectUnitRole(unit, extraKws);
    roleCounts[role] = (roleCounts[role] ?? 0) + count;
  };

  for (const unit of mandatory) {
    const subType = unit.unitSubTypes?.[0];
    const extraKws = subType?.grantedKeywords ?? [];
    const subtypeCostMod = subType?.creditCostModifier ?? 0;
    const wargearEst = unit.unitType === 'elite' ? WARGEAR_ELITE : WARGEAR_TROOP;
    const costPerModel = unit.baseCost + subtypeCostMod + wargearEst;
    const count = unit.minCount;
    const totalCost = costPerModel * count;
    const role = detectUnitRole(unit, extraKws);

    lineItems.push({ unit, count, creditCost: totalCost, appliedSubType: subType, tacticalRole: role });
    addRoles(unit, count, extraKws);
    spent += totalCost;
  }

  if (spent > creditLimit) return infeasible;

  // Reserve ~5 % buffer
  const usableBudget = creditLimit - Math.floor(creditLimit * 0.05);
  let remaining = usableBudget - spent;

  // --- Optional units (scored + greedy fill) ----------------------------------
  // Re-score after each addition so the composition gap-filling adapts live.
  // Sort once by base score; re-evaluating fully each iteration is too slow,
  // so we re-sort only after adding a unit that changes the role balance.
  const optionalPool = [...optional];

  while (remaining > 0 && optionalPool.length > 0) {
    // Score against current role counts for gap-filling
    const scored = optionalPool
      .map(u => ({ unit: u, score: scoreUnit(u, playStyle, roleCounts) }))
      .sort((a, b) => b.score - a.score);

    let added = false;
    for (const { unit } of scored) {
      const subType = unit.unitSubTypes?.[0];
      const extraKws = subType?.grantedKeywords ?? [];
      const subtypeCostMod = subType?.creditCostModifier ?? 0;
      const wargearEst = unit.unitType === 'elite' ? WARGEAR_ELITE : WARGEAR_TROOP;
      const costPerModel = unit.baseCost + subtypeCostMod + wargearEst;

      if (costPerModel > remaining) continue;

      let count = Math.floor(remaining / costPerModel);
      const maxCount = sf?.unitMaxCountOverrides?.[unit.id] ?? unit.maxCount;
      count = Math.min(count, maxCount);
      if (count <= 0) continue;

      // Count caps by play style
      if (playStyle === 'elite'  && unit.unitType === 'elite') count = Math.min(count, 2);
      if (playStyle !== 'horde'  && unit.unitType === 'troop') count = Math.min(count, 3);
      if (playStyle === 'horde'  && unit.unitType === 'troop') count = Math.min(count, maxCount);

      const totalCost = costPerModel * count;
      const role = detectUnitRole(unit, extraKws);
      lineItems.push({ unit, count, creditCost: totalCost, appliedSubType: subType, tacticalRole: role });
      addRoles(unit, count, extraKws);
      remaining -= totalCost;

      // Remove from pool so it isn't picked again
      optionalPool.splice(optionalPool.indexOf(unit), 1);
      added = true;
      break;  // Re-sort after each addition to honour new role counts
    }
    if (!added) break;  // Nothing affordable left
  }

  // --- Ensure at least one ELITE when none came from mandatory units ----------
  const hasElite = lineItems.some(li => li.unit.keywords.includes('ELITE'));
  if (!hasElite) {
    const elites = optionalPool.filter(u => u.keywords.includes('ELITE'));
    const cheapestElite = elites
      .map(u => {
        const subType = u.unitSubTypes?.[0];
        const subtypeCostMod = subType?.creditCostModifier ?? 0;
        return { unit: u, cost: u.baseCost + subtypeCostMod + WARGEAR_ELITE, subType };
      })
      .filter(e => e.cost <= remaining + (lineItems.length > 0 ? lineItems[lineItems.length - 1].creditCost : 0))
      .sort((a, b) => a.cost - b.cost)[0];
    if (cheapestElite) {
      if (cheapestElite.cost > remaining && lineItems.length > 0) {
        const last = lineItems[lineItems.length - 1];
        lineItems.pop();
        remaining += last.creditCost;
      }
      if (cheapestElite.cost <= remaining) {
        const role = detectUnitRole(cheapestElite.unit, cheapestElite.subType?.grantedKeywords ?? []);
        lineItems.push({
          unit: cheapestElite.unit,
          count: 1,
          creditCost: cheapestElite.cost,
          appliedSubType: cheapestElite.subType,
          tacticalRole: role,
        });
        remaining -= cheapestElite.cost;
      }
    }
  }

  const totalCredits = lineItems.reduce((s, l) => s + l.creditCost, 0);
  const totalModels  = lineItems.reduce((s, l) => s + l.count,      0);

  const styleLabel = playStyle.charAt(0).toUpperCase() + playStyle.slice(1);

  // Tiered wargear budget: elites get more, troops get less.
  // Any leftover budget from unit selection is divided proportionally
  // between elite and troop slots (2:1 ratio).
  const eliteModelCount = lineItems
    .filter(li => li.unit.unitType === 'elite')
    .reduce((s, li) => s + li.count, 0);
  const troopModelCount = totalModels - eliteModelCount;

  // Weighted "virtual model count" for budget distribution
  const weightedTotal = eliteModelCount * 2 + troopModelCount;
  const budgetPerWeight = weightedTotal > 0
    ? Math.floor(remaining / weightedTotal)
    : 0;
  const eliteWargearBudget = WARGEAR_ELITE + budgetPerWeight * 2;
  const troopWargearBudget  = WARGEAR_TROOP + budgetPerWeight;

  const usedLimitedIds = new Set<string>();

  const warbandUnits = lineItems.map(li => {
    const wargearBudget = li.unit.unitType === 'elite' ? eliteWargearBudget : troopWargearBudget;
    return makeWarbandUnit(
      li.unit, li.count, factionId, subfactionId, playStyle,
      wargearBudget, gloryLimit, usedLimitedIds, li.appliedSubType,
    );
  });

  return {
    factionId,
    factionName: faction.name,
    units: lineItems,
    totalCredits,
    totalModels,
    playStyle,
    buildLabel: `${styleLabel} ${faction.name}`,
    factionTip: FACTION_TIPS[factionId] ?? DEFAULT_FACTION_TIP,
    playstyleTip: PLAY_STYLE_TIPS[playStyle],
    generalTips: GENERAL_TIPS,
    warbandUnits,
  };
}

// ─── Public entry point ──────────────────────────────────────────────────────

/**
 * Generate one build per requested faction (or one per BEGINNER_FACTION_IDS
 * when factionId is null).  Infeasible results (budget too low) are dropped
 * unless they are the only result.
 */
export function quickBuild(config: QuickBuildConfig): QuickBuildResult[] {
  const { factionId, creditLimit, gloryLimit, playStyle } = config;
  const subfactionId = config.subfactionId ?? 'no_variant';

  const factionIds: string[] = factionId
    ? [factionId]
    : [...BEGINNER_FACTION_IDS];

  const results = factionIds.map(id => {
    // For beginner mode each faction uses its own default subfaction
    const sfId = factionId ? subfactionId : getDefaultSubFactionId(id);
    return buildForFaction(id, creditLimit, gloryLimit, playStyle, sfId);
  });

  // Filter out infeasible unless everything is infeasible
  const feasible = results.filter(r => !r.infeasible);
  return feasible.length > 0 ? feasible : results;
}

export const PLAY_STYLE_LABELS: Record<PlayStyle, string> = {
  balanced:   'Balanced',
  aggressive: 'Aggressive',
  ranged:     'Ranged',
  horde:      'Horde',
  elite:      'Elite',
};

export const PLAY_STYLE_ICONS: Record<PlayStyle, string> = {
  balanced:   '⚖',
  aggressive: '⚔',
  ranged:     '🎯',
  horde:      '💀',
  elite:      '★',
};

export const PLAY_STYLE_DESCS: Record<PlayStyle, string> = {
  balanced:   'Mix of elites & troops',
  aggressive: 'Melee-heavy fighters',
  ranged:     'Shoot from a distance',
  horde:      'Many cheap models',
  elite:      'Few powerful models',
};

export const ROLE_LABELS: Record<BattlefieldRole, string> = {
  brawler:    'Brawler',
  gunner:     'Gunner',
  skirmisher: 'Skirmisher',
  sniper:     'Sniper',
  support:    'Support',
  specialist: 'Specialist',
};

export const ROLE_ICONS: Record<BattlefieldRole, string> = {
  brawler:    '⚔',
  gunner:     '🔫',
  skirmisher: '💨',
  sniper:     '🎯',
  support:    '★',
  specialist: '✦',
};

/** Short one-line description of how to use each battlefield role. */
export const ROLE_TIPS: Record<BattlefieldRole, string> = {
  brawler:    'Close-combat specialist. Advance on the enemy and win in melee.',
  gunner:     'Fire-support. Hold ground or take cover and shoot at long range.',
  skirmisher: 'Mobile shooter. Advance and shoot — favours ASSAULT weapons.',
  sniper:     'Precision ranged. Stay hidden, pick off key targets from range.',
  support:    'Leader / Icon. Stays near allies to grant bonuses and hold objectives.',
  specialist: 'Unique role (psyker, vehicle). Follow the unit\'s special rules.',
};
