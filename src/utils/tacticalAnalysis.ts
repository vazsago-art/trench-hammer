/**
 * tacticalAnalysis.ts
 *
 * Pure analysis utility — takes a Warband + the resolved unit definitions
 * and returns a TacticalReport with scores, advantages, disadvantages, and
 * play-style recommendations.
 *
 * No React imports; safe to call from anywhere.
 */

import type { Warband, UnitOption } from '../types/index.js';

// ─── Output types ─────────────────────────────────────────────────────────────

export interface TacticalReport {
  /** 0–10 */
  mobilityScore:    number;
  durabilityScore:  number;
  rangedScore:      number;
  meleeScore:       number;
  stealthScore:     number;
  psychicScore:     number;

  /** 0 = pure melee … 10 = pure ranged */
  combatStyle: number;
  /** 0 = pure objectives … 10 = pure combat */
  playstyleScore: number;

  combatStyleLabel: string;
  playstyleLabel:   string;
  /** One-sentence description of the play-style recommendation. */
  playstyleNote: string;

  advantages:      string[];
  disadvantages:   string[];
  recommendations: string[];

  totalModels:    number;
  eliteCount:     number;
  troopCount:     number;
  avgMovement:    number;
  avgArmourSave:  number;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

// ─── Main analysis function ───────────────────────────────────────────────────

export function analyseTactical(
  warband: Warband,
  allAvailableUnits: UnitOption[],
): TacticalReport {
  const { units } = warband;

  if (units.length === 0) return emptyReport();

  // ── Basic counts ──────────────────────────────────────────────────────────

  const totalModels = units.reduce((s, u) => s + u.count, 0);
  const eliteCount  = units.filter(u => u.unitType === 'elite').reduce((s, u) => s + u.count, 0);
  const troopCount  = totalModels - eliteCount;

  // ── Keyword aggregation (weighted by model count) ─────────────────────────

  /** Returns how many individual models carry at least one keyword matching `pattern`. */
  const kwModels = (pattern: string): number =>
    units.reduce((sum, wu) => {
      const hit = wu.keywords.some(k => k.toUpperCase().includes(pattern.toUpperCase()));
      return sum + (hit ? wu.count : 0);
    }, 0);

  const hasKw = (pattern: string) => kwModels(pattern) > 0;

  // ── Movement & Armour averages ─────────────────────────────────────────────

  let movSum = 0, movN = 0;
  let armSum = 0, armN = 0;

  for (const wu of units) {
    const def = allAvailableUnits.find(u => u.id === wu.unitId);
    if (!def) continue;

    // Movement: prefer movementOverride from wargear, then add stat deltas
    const moveOverride = wu.selectedWargear.find(sw => sw.movementOverride != null)?.movementOverride ?? null;
    const wargearMovDelta = wu.selectedWargear.reduce((s, sw) => s + (sw.statModifiers?.movement ?? 0), 0);
    const subMov = wu.appliedSubType?.statModifiers?.movement ?? 0;
    const effectiveMov = moveOverride != null
      ? moveOverride
      : def.stats.movement + wargearMovDelta + subMov;

    movSum += effectiveMov * wu.count;
    movN   += wu.count;

    // Armour
    const wargearArmDelta = wu.selectedWargear.reduce((s, sw) => s + (sw.statModifiers?.armourSave ?? 0), 0);
    const subArm = wu.appliedSubType?.statModifiers?.armourSave ?? 0;
    const effectiveArm = (def.stats.armourSave ?? 0) + wargearArmDelta + subArm;
    armSum += effectiveArm * wu.count;
    armN   += wu.count;
  }

  const avgMovement   = movN > 0 ? movSum / movN : 5;
  const avgArmourSave = armN > 0 ? armSum / armN : 0;

  // ── Weapon analysis ───────────────────────────────────────────────────────

  type WeaponType = 'ranged' | 'melee' | 'thrown' | 'heavy';

  let rangedWeaponModels = 0;
  let meleeWeaponModels  = 0;
  let hasBlast     = false;
  let hasCleave    = false;
  let hasAP        = false;
  let hasCritical  = false;
  let hasAutomatic = false;
  let hasDeadly    = false;
  let hasHeavy     = false;

  for (const wu of units) {
    const def = allAvailableUnits.find(u => u.id === wu.unitId);
    if (!def) continue;

    // Build a lookup: id → weapon type + keywords
    const weaponMap = new Map<string, { wType: WeaponType; kws: string[] }>();
    for (const item of [...def.defaultWargear, ...def.availableWargear]) {
      if (!('type' in item)) continue;
      const w = item as { id: string; type?: string; keywords?: string[] };
      if (!w.type || !['ranged', 'melee', 'thrown', 'heavy'].includes(w.type)) continue;
      weaponMap.set(w.id, { wType: w.type as WeaponType, kws: w.keywords ?? [] });
    }

    // Determine what weapons this unit actually has equipped
    // Prefer selectedWargear weapons; fall back to defaultWargear
    const replacedDefaultIds = new Set(
      wu.selectedWargear.map(sw => sw.replacesDefaultId).filter(Boolean) as string[],
    );
    const selectedWeaponIds = new Set(
      wu.selectedWargear.filter(sw => sw.type === 'weapon').map(sw => sw.id),
    );

    // Collect effective weapon IDs
    const effectiveWeaponIds: string[] = [
      // defaults that haven't been replaced
      ...def.defaultWargear
        .filter(item => {
          const w = item as { id?: string; type?: string };
          if (!w.type || !['ranged', 'melee', 'thrown', 'heavy'].includes(w.type)) return false;
          return !replacedDefaultIds.has(w.id ?? '');
        })
        .map(item => (item as { id: string }).id),
      // player-selected weapons
      ...Array.from(selectedWeaponIds),
    ];

    // Deduplicate
    const seen = new Set<string>();
    for (const id of effectiveWeaponIds) {
      if (seen.has(id)) continue;
      seen.add(id);

      const entry = weaponMap.get(id);
      if (!entry) continue;

      const { wType, kws } = entry;
      const kwsUpper = kws.map(k => k.toUpperCase());

      if (wType === 'ranged' || wType === 'heavy' || wType === 'thrown') {
        rangedWeaponModels += wu.count;
        if (wType === 'heavy') hasHeavy = true;
      } else {
        meleeWeaponModels += wu.count;
      }

      if (kwsUpper.some(k => k.startsWith('BLAST')))           hasBlast     = true;
      if (kwsUpper.some(k => k.startsWith('CLEAVE')))          hasCleave    = true;
      if (kwsUpper.some(k => k.startsWith('ARMOUR PIERCING'))) hasAP        = true;
      if (kwsUpper.includes('CRITICAL'))                        hasCritical  = true;
      if (kwsUpper.some(k => k.startsWith('AUTOMATIC')))       hasAutomatic = true;
      if (kwsUpper.includes('DEADLY'))                          hasDeadly    = true;
    }
  }

  const totalWeaponModels = rangedWeaponModels + meleeWeaponModels;

  // ── Psychic powers ────────────────────────────────────────────────────────

  const totalPsychicPowers = units.reduce((s, u) => s + (u.selectedPsychicPowers?.length ?? 0), 0);

  // ── Scores ────────────────────────────────────────────────────────────────

  // Mobility (0–10)
  let mobilityScore =
    avgMovement <= 4  ? 2 :
    avgMovement <= 5  ? 4 :
    avgMovement <= 6  ? 5 :
    avgMovement <= 7  ? 7 :
    avgMovement <= 8  ? 8 :
    avgMovement <= 9  ? 9 : 10;
  if (hasKw('FLYING'))     mobilityScore = clamp(mobilityScore + 2, 0, 10);
  if (hasKw('SCOUT'))      mobilityScore = clamp(mobilityScore + 1, 0, 10);
  if (hasKw('INFILTRATOR'))mobilityScore = clamp(mobilityScore + 1, 0, 10);
  if (hasKw('FAST'))       mobilityScore = clamp(mobilityScore + 1, 0, 10);
  if (hasKw('BEAST'))      mobilityScore = clamp(mobilityScore + 1, 0, 10);

  // Durability (0–10)
  let durabilityScore =
    avgArmourSave >= 0    ? 1 :
    avgArmourSave >= -0.5 ? 2 :
    avgArmourSave >= -1   ? 3 :
    avgArmourSave >= -1.5 ? 4 :
    avgArmourSave >= -2   ? 5 :
    avgArmourSave >= -2.5 ? 6 :
    avgArmourSave >= -3   ? 7 :
    avgArmourSave >= -3.5 ? 8 :
    avgArmourSave >= -4   ? 9 : 10;
  if (hasKw('TOUGH'))      durabilityScore = clamp(durabilityScore + 2, 0, 10);
  if (hasKw('VEHICLE'))    durabilityScore = clamp(durabilityScore + 2, 0, 10);
  if (hasKw('BLESSED'))    durabilityScore = clamp(durabilityScore + 1, 0, 10);
  if (hasKw('LARGE'))      durabilityScore = clamp(durabilityScore + 1, 0, 10);
  if (hasKw('DEMONIC'))    durabilityScore = clamp(durabilityScore + 1, 0, 10);
  if (hasKw('ARTIFICIAL')) durabilityScore = clamp(durabilityScore + 1, 0, 10);

  // Ranged Power (0–10)
  let rangedScore = totalWeaponModels > 0
    ? Math.round((rangedWeaponModels / totalWeaponModels) * 6)
    : 3;
  if (hasAutomatic) rangedScore = clamp(rangedScore + 2, 0, 10);
  if (hasBlast)     rangedScore = clamp(rangedScore + 1, 0, 10);
  if (hasHeavy)     rangedScore = clamp(rangedScore + 1, 0, 10);
  if (hasAP)        rangedScore = clamp(rangedScore + 1, 0, 10);

  // Melee Power (0–10)
  let meleeScore = totalWeaponModels > 0
    ? Math.round((meleeWeaponModels / totalWeaponModels) * 6)
    : 3;
  if (hasCleave)    meleeScore = clamp(meleeScore + 2, 0, 10);
  if (hasCritical)  meleeScore = clamp(meleeScore + 1, 0, 10);
  if (hasDeadly)    meleeScore = clamp(meleeScore + 1, 0, 10);
  if (hasKw('FEAR'))meleeScore = clamp(meleeScore + 1, 0, 10);

  // Stealth (0–10)
  const stealthScore = clamp(
    Math.min(4, kwModels('STEALTH'))
    + Math.min(3, kwModels('INFILTRATOR'))
    + Math.min(2, kwModels('DEATH CULT'))
    + Math.min(1, kwModels('SCOUT')),
    0, 10,
  );

  // Psychic (0–10)
  let psychicScore = 0;
  if (hasKw('PSYKER')) psychicScore += 4;
  psychicScore += Math.min(6, totalPsychicPowers * 2);
  psychicScore = clamp(psychicScore, 0, 10);

  // ── Combat Style (0 = melee … 10 = ranged) ────────────────────────────────

  const combatStyle = totalWeaponModels > 0
    ? Math.round((rangedWeaponModels / totalWeaponModels) * 10)
    : 5;

  // ── Playstyle (0 = objectives … 10 = combat) ─────────────────────────────

  let playstyleScore = 5;

  // Model count
  if      (totalModels >= 15) playstyleScore -= 3;
  else if (totalModels >= 12) playstyleScore -= 2;
  else if (totalModels >= 9)  playstyleScore -= 1;
  else if (totalModels <= 5)  playstyleScore += 2;
  else if (totalModels <= 7)  playstyleScore += 1;

  // Stealth/infiltration → objective grabbers
  if      (stealthScore >= 5) playstyleScore -= 2;
  else if (stealthScore >= 3) playstyleScore -= 1;

  // Combat power
  if (meleeScore >= 8 || rangedScore >= 8) playstyleScore += 2;
  else if (meleeScore >= 6 || rangedScore >= 6) playstyleScore += 1;

  // Keywords
  if (hasKw('TOUGH') || hasKw('VEHICLE')) playstyleScore += 1;
  if (hasKw('FEAR'))                      playstyleScore += 1;
  if (hasKw('DEEP STRIKE'))               playstyleScore -= 1;

  playstyleScore = clamp(playstyleScore, 0, 10);

  // ── Labels ────────────────────────────────────────────────────────────────

  const combatStyleLabel =
    combatStyle <= 1 ? 'Pure Melee' :
    combatStyle <= 3 ? 'Melee-Heavy' :
    combatStyle <= 4 ? 'Melee-Leaning' :
    combatStyle <= 6 ? 'Balanced' :
    combatStyle <= 7 ? 'Ranged-Leaning' :
    combatStyle <= 9 ? 'Ranged-Heavy' : 'Pure Ranged';

  const playstyleLabel =
    playstyleScore <= 2 ? 'Objective Specialist' :
    playstyleScore <= 4 ? 'Objective-Focused' :
    playstyleScore <= 6 ? 'Balanced' :
    playstyleScore <= 8 ? 'Combat-Oriented' : 'Combat Monster';

  const playstyleNote =
    playstyleScore <= 2
      ? 'Built to control the board. Spread across objectives and avoid unnecessary fights — your model count is your greatest weapon.'
    : playstyleScore <= 4
      ? 'Good at capturing objectives while maintaining reasonable combat capability. Prioritize position over elimination.'
    : playstyleScore <= 6
      ? 'Can fight and hold objectives equally. Adapt to the scenario — some rounds fight, some rounds run for objectives.'
    : playstyleScore <= 8
      ? 'Wins through attrition and firepower. Eliminate threats first, then claim objectives from an uncontested position.'
      : 'Lives and dies by combat. Engage aggressively, destroy enemy activation count, then sweep objectives at will.';

  // ── Advantages ────────────────────────────────────────────────────────────

  const advantages: string[] = [];

  if      (mobilityScore >= 8) advantages.push('Exceptional mobility — can sprint to distant objectives and reposition each turn');
  else if (mobilityScore >= 6) advantages.push('Good mobility — able to contest multiple objectives across a standard board');

  if (hasKw('FLYING'))      advantages.push('FLYING units bypass terrain entirely and can attack from unexpected angles');
  if (hasKw('INFILTRATOR')) advantages.push('INFILTRATORS deploy ahead of your lines for aggressive early-game pressure on objectives');
  if (hasKw('DEEP STRIKE')) advantages.push('DEEP STRIKE units can threaten any part of the board from Turn 2 onward');
  if (hasKw('SCOUT'))       advantages.push('SCOUT models can redeploy before battle — very hard for opponents to plan around');
  if (hasKw('STEALTH'))     advantages.push('STEALTH units are harder to target, excelling at holding objectives under fire');

  if      (durabilityScore >= 8) advantages.push('Heavily armoured — can sustain significant punishment before models go down');
  else if (durabilityScore >= 6) advantages.push('Solid armour saves — resilient against standard weapons');

  if (hasKw('TOUGH'))       advantages.push('TOUGH models are extremely hard to remove — ideal objective anchors');
  if (hasKw('VEHICLE'))     advantages.push('VEHICLE unit(s) provide heavy firepower and act as powerful battlefield anchors');
  if (hasKw('FEAR'))        advantages.push('FEAR imposes -1 DICE on melee attackers — strong in extended close combats');
  if (hasKw('BLESSED'))     advantages.push('BLESSED markers allow spending to reduce injury rolls — spikes survivability in key moments');

  if      (meleeScore >= 8) advantages.push('Dominant melee force — close combat is where you devastate opponents');
  else if (meleeScore >= 6) advantages.push('Strong melee capability — wins most close-combat exchanges');

  if      (rangedScore >= 8) advantages.push('Superior firepower — can suppress and eliminate targets without closing distance');
  else if (rangedScore >= 6) advantages.push('Good ranged output — effectively controls fire lanes');

  if (hasBlast)     advantages.push('BLAST weapons punish clustered enemies — hit multiple targets per activation');
  if (hasAutomatic) advantages.push('AUTOMATIC weapons generate overwhelming fire volume — multiple attacks per activation');
  if (hasAP)        advantages.push('ARMOUR PIERCING weapons punch through heavy armour that other warbands cannot crack');
  if (hasCleave)    advantages.push('CLEAVE weapons cut through multiple enemies in one Fight action');
  if (hasCritical)  advantages.push('CRITICAL weapons deliver extreme burst damage on critical hits');
  if (hasDeadly)    advantages.push('DEADLY weapons roll 3D6 injury — almost guarantee removing targets from action');

  if (psychicScore >= 5) advantages.push('Psychic support provides battlefield-wide buffs and disruption options opponents must respect');

  if (totalModels >= 12)
    advantages.push(`Large warband (${totalModels} models) can hold multiple objectives simultaneously`);

  // ── Disadvantages ─────────────────────────────────────────────────────────

  const disadvantages: string[] = [];

  if      (totalModels <= 5) disadvantages.push(`Very small warband (${totalModels} models) — cannot realistically hold more than 1 objective`);
  else if (totalModels <= 7) disadvantages.push(`Small model count (${totalModels} models) — limited presence across a full board`);

  if      (mobilityScore <= 3) disadvantages.push('Very slow — careful route planning from deployment is essential; opponents will out-position you');
  else if (mobilityScore <= 4) disadvantages.push('Below-average movement — faster warbands may out-position you on objectives');

  if      (durabilityScore <= 2) disadvantages.push('Extremely fragile — losing a single model can cripple your activation count');
  else if (durabilityScore <= 4) disadvantages.push('Light armour — heavily dependent on terrain cover to survive');

  if (!hasKw('STEALTH') && !hasKw('INFILTRATOR'))
    disadvantages.push('No stealth or infiltration — opponents always know your positions from Turn 1; you will absorb the first activation');

  if (totalWeaponModels > 0 && rangedScore <= 2)
    disadvantages.push('Very limited ranged capability — must close distance; exposed to fire on approach');
  if (totalWeaponModels > 0 && meleeScore <= 2)
    disadvantages.push('Weak in melee — avoid close combat with dedicated fighters');

  if (!hasAP)
    disadvantages.push('No Armour Piercing — heavily armoured targets (TOUGH, VEHICLE, -3 save or better) will shrug off most attacks');

  if (eliteCount === 0)
    disadvantages.push('No Elite models — unable to gain XP or Campaign Skills in extended campaign play');
  if (troopCount === 0)
    disadvantages.push('No troop bodies — powerful models but critically thin for objective holding across a board');

  // ── Recommendations ───────────────────────────────────────────────────────

  const recommendations: string[] = [];

  if (playstyleScore <= 3) {
    recommendations.push('Focus on board control: activate multiple models towards objectives each turn rather than chasing kills — your model count is your core advantage');
    recommendations.push('Trade defensively — only fight when you must; protecting activation count matters more than eliminating threats');
  } else if (playstyleScore <= 6) {
    recommendations.push('Balance aggression and objectives: contest one objective aggressively and hold one defensively each game');
    recommendations.push('Read the scenario — some missions reward combat more than others; adjust your approach game by game');
  } else {
    recommendations.push('Play aggressively: close distance fast and eliminate high-priority targets early to gut your opponent\'s scoring capability');
    recommendations.push('Objectives are secondary to denial — kill first, then claim objectives from an uncontested position');
  }

  if (hasKw('INFILTRATOR') && hasKw('STEALTH')) {
    recommendations.push('Place INFILTRATORS on key objectives early, then use STEALTH models to screen and protect them — use STEALTH to body-block fire lanes');
  } else if (hasKw('INFILTRATOR')) {
    recommendations.push('Deploy INFILTRATORS aggressively onto central or enemy-side objectives before they can be contested');
  }

  if (hasKw('DEEP STRIKE')) {
    recommendations.push('Hold Deep Strike units off-board; deploy reactively in Turn 2 to threaten objectives or flanks your opponent is ignoring');
  }

  if (mobilityScore >= 7 && playstyleScore >= 5) {
    recommendations.push('Use superior mobility to pick fights on your terms — engage isolated units and disengage before reinforcements arrive');
  }

  if (durabilityScore <= 3) {
    recommendations.push('Always move into cover — every terrain piece is your ally; never advance in the open unless you can reach melee this activation');
  }

  if (psychicScore >= 4) {
    recommendations.push('Position psykers centrally so their powers can reach both flanks — psychic models are multipliers for everything around them');
  }

  if (hasBlast) {
    recommendations.push('Force opponents to choose between bunching for objective control or spreading to avoid BLAST — both play into your hands');
  }

  if (avgArmourSave <= -3) {
    recommendations.push('Your armour is strong enough to advance in the open — use it to apply pressure and force your opponent to react to you');
  }

  if (meleeScore >= 7 && mobilityScore >= 6) {
    recommendations.push('Pair mobile melee units with a ranged threat — opponents defending against your gun line expose themselves to your charge');
  }

  if (!hasAP && durabilityScore <= 3) {
    recommendations.push('Consider hiring mercenaries with AP weapons or BLAST to cover the gap in your anti-armour and anti-horde capability');
  }

  // ── Return ────────────────────────────────────────────────────────────────

  return {
    mobilityScore,
    durabilityScore,
    rangedScore,
    meleeScore,
    stealthScore,
    psychicScore,
    combatStyle,
    playstyleScore,
    combatStyleLabel,
    playstyleLabel,
    playstyleNote,
    advantages,
    disadvantages,
    recommendations,
    totalModels,
    eliteCount,
    troopCount,
    avgMovement:   Math.round(avgMovement   * 10) / 10,
    avgArmourSave: Math.round(avgArmourSave * 10) / 10,
  };
}

function emptyReport(): TacticalReport {
  return {
    mobilityScore: 0, durabilityScore: 0, rangedScore: 0, meleeScore: 0,
    stealthScore: 0,  psychicScore: 0,
    combatStyle: 5, playstyleScore: 5,
    combatStyleLabel: '—', playstyleLabel: '—',
    playstyleNote: 'Add units to your warband to generate a tactical analysis.',
    advantages: [], disadvantages: [],
    recommendations: ['Add units to your warband to see tactical recommendations.'],
    totalModels: 0, eliteCount: 0, troopCount: 0,
    avgMovement: 0, avgArmourSave: 0,
  };
}
