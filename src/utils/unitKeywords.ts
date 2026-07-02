import type { UnitOption, WarbandUnit } from '../types/index.js';
import { getPromotionKeywords } from './unitPromotion.js';

export function resolveWarbandUnitKeywords(
  unitDef: UnitOption | undefined,
  unit: WarbandUnit,
  factionId: string,
  options?: { includeEliteFromPromotion?: boolean },
): string[] {
  const includeEliteFromPromotion = options?.includeEliteFromPromotion ?? true;

  const baseKeywords = unitDef?.keywords ?? [];
  const subKeywords = unit.appliedSubType?.grantedKeywords ?? [];
  const wargearKeywords = unit.selectedWargear.flatMap(sw => {
    return (sw.grantsKeywords ?? []) as string[];
  });
  const upgradeKeywords = Object.entries(unit.selectedUpgrades ?? {})
    .filter(([, count]) => count > 0)
    .flatMap(([id]) => unitDef?.upgrades?.find(upg => upg.id === id)?.grantedKeywords ?? []);
  const promotionKeywords = getPromotionKeywords(unit.isPromoted, factionId, {
    includeElite: includeEliteFromPromotion,
  });

  return [...new Set([...baseKeywords, ...subKeywords, ...wargearKeywords, ...upgradeKeywords, ...promotionKeywords])];
}
