import { Warband, ValidationResult, ValidationError, ValidationWarning } from '../types/index.js';

// Game rule constants
const GAME_RULES = {
  minPointLimit: 200,
  maxPointLimit: 2000,
  minLeaders: 1,
  maxLeaders: 3,
  minTroops: 3,
  maxTroops: 20,
};

/** Total credits (non-glory) spent across all units and their wargear. */
export function calculateWarbandPoints(warband: Warband): number {
  return warband.units.reduce((total, unit) => total + unit.totalCost, 0);
}

/** Total glory spent across all units, wargear, and hired mercenaries. */
export function calculateWarbandGlory(warband: Warband): number {
  const unitGlory = warband.units.reduce((total, unit) => total + unit.totalGloryCost, 0);
  const mercGlory = (warband.mercenaries ?? []).reduce(
    (total, merc) => total + merc.gloryCost * merc.count,
    0,
  );
  return unitGlory + mercGlory;
}

export function calculateTotalModels(warband: Warband): number {
  return warband.units.reduce((total, unit) => total + unit.count, 0);
}

export function calculateUnitCost(
  baseCostPerModel: number,
  count: number,
  wargearCosts: number[]
): number {
  const unitCost = baseCostPerModel * count;
  const wargearCost = wargearCosts.reduce((sum, w) => sum + w, 0);
  return unitCost + wargearCost;
}

export function validateWarband(warband: Warband): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Check credits limit
  const totalPoints = calculateWarbandPoints(warband);
  if (totalPoints > warband.pointLimit) {
    errors.push({
      code: 'POINTS_EXCEEDED',
      message: `Warband exceeds credit limit: ${totalPoints} / ${warband.pointLimit} Credits`,
      severity: 'error',
    });
  }

  // Check glory limit.
  // gloryLimit = 0  → glory spending is completely disabled; any glory spent is an error.
  // gloryLimit > 0  → enforce the cap.
  const totalGlory = calculateWarbandGlory(warband);
  if (warband.gloryLimit === 0 && totalGlory > 0) {
    errors.push({
      code: 'GLORY_EXCEEDED',
      message: `Warband is spending ${totalGlory} Glory but Glory Limit is set to 0 (disabled)`,
      severity: 'error',
    });
  } else if (warband.gloryLimit > 0 && totalGlory > warband.gloryLimit) {
    errors.push({
      code: 'GLORY_EXCEEDED',
      message: `Warband exceeds glory limit: ${totalGlory} / ${warband.gloryLimit} Glory`,
      severity: 'error',
    });
  }

  // Check minimum models
  const totalModels = calculateTotalModels(warband);
  if (totalModels === 0) {
    errors.push({
      code: 'NO_MODELS',
      message: 'Warband must contain at least one model',
      severity: 'error',
    });
  }

  // Check force organization
  const leaderCount = warband.units.filter(u => u.keywords.includes('LEADER')).length;
  const troopCount = warband.units.filter(u => u.unitType === 'troop').length;

  if (leaderCount < GAME_RULES.minLeaders) {
    warnings.push({
      code: 'MIN_LEADERS',
      message: `Recommended minimum ${GAME_RULES.minLeaders} leader(s), you have ${leaderCount}`,
    });
  }

  if (leaderCount > GAME_RULES.maxLeaders) {
    errors.push({
      code: 'MAX_LEADERS',
      message: `Maximum ${GAME_RULES.maxLeaders} leaders allowed, you have ${leaderCount}`,
      severity: 'error',
    });
  }

  if (troopCount < GAME_RULES.minTroops) {
    warnings.push({
      code: 'MIN_TROOPS',
      message: `Recommended minimum ${GAME_RULES.minTroops} troop(s), you have ${troopCount}`,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateUnitSelection(
  unitCount: number,
  minCount: number,
  maxCount: number
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (unitCount < minCount) {
    errors.push({
      code: 'UNIT_MIN',
      message: `Unit requires minimum ${minCount} model(s)`,
      severity: 'error',
    });
  }

  if (unitCount > maxCount) {
    errors.push({
      code: 'UNIT_MAX',
      message: `Unit cannot exceed maximum ${maxCount} model(s)`,
      severity: 'error',
    });
  }

  return errors;
}

export function validateKeywordSynergy(
  selectedFaction: string,
  unitKeywords: string[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check if unit belongs to selected faction
  const hasFactionKeyword = unitKeywords.some(k => k.toLowerCase().includes(selectedFaction.toLowerCase()));
  
  if (!hasFactionKeyword && !unitKeywords.includes('MERCENARY')) {
    errors.push({
      code: 'FACTION_MISMATCH',
      message: 'Unit does not match warband faction (unless it is a MERCENARY)',
      severity: 'error',
    });
  }

  return errors;
}

export function checkWargearConflicts(
  selectedWargearIds: string[],
  allWargear: any[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const wargearId of selectedWargearIds) {
    const wargear = allWargear.find(w => w.id === wargearId);
    if (wargear && wargear.conflictsWith) {
      for (const conflictingId of wargear.conflictsWith) {
        if (selectedWargearIds.includes(conflictingId)) {
          errors.push({
            code: 'WARGEAR_CONFLICT',
            message: `${wargear.name} conflicts with selected equipment`,
            severity: 'error',
          });
        }
      }
    }
  }

  return errors;
}

export function getValidationSummary(result: ValidationResult): string {
  if (result.isValid) {
    return 'Warband is valid!';
  }

  const errorMessages = result.errors
    .map(e => `• ${e.message}`)
    .join('\n');

  return `Warband has errors:\n${errorMessages}`;
}
