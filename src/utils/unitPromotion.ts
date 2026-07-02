import type { WarbandUnit } from '../types/index.js';

export function getPromotionKeywords(
  isPromoted: boolean | undefined,
  factionId: string,
  options?: { includeElite?: boolean },
): string[] {
  if (!isPromoted) return [];

  const includeElite = options?.includeElite ?? true;
  const promotedKeywords: string[] = [];

  if (includeElite) promotedKeywords.push('ELITE');
  if (factionId === 'thousand_sons') promotedKeywords.push('PSYKER 1');

  return promotedKeywords;
}

/** Toggle promotion state and return an updated unit with synced cost and keywords. */
export function applyPromotionToggle(unit: WarbandUnit, factionId: string): WarbandUnit {
  const isNowPromoted = !unit.isPromoted;

  let newKeywords = [...unit.keywords];
  let newBaseCost = unit.baseCostPerModel;

  if (isNowPromoted) {
    if (!newKeywords.includes('ELITE')) {
      newKeywords.push('ELITE');
    }
    if (factionId === 'thousand_sons' && !newKeywords.includes('PSYKER 1')) {
      newKeywords.push('PSYKER 1');
      newBaseCost += 10;
    }
  } else {
    newKeywords = newKeywords.filter(kw => kw !== 'ELITE');
    if (factionId === 'thousand_sons') {
      newKeywords = newKeywords.filter(kw => kw !== 'PSYKER 1');
      newBaseCost -= 10;
    }
  }

  const costDelta = newBaseCost - unit.baseCostPerModel;
  const newTotalCost = unit.totalCost + (costDelta * unit.count);

  return {
    ...unit,
    isPromoted: isNowPromoted,
    keywords: newKeywords,
    baseCostPerModel: newBaseCost,
    totalCost: newTotalCost,
  };
}
