import { lookupWargear, lookupWeapon } from '../data/wargearSlotValidation.js';
import type { SelectedWargear } from '../types/index.js';

type WargearAdjustmentSource = {
  wargearKeywordGrants?: Record<string, string[]>;
  wargearCostOverrides?: Record<string, { cost: number; costCurrency?: 'credits' | 'glory' }>;
};

export function buildEffectiveWargearSelection(
  selectedWargear: SelectedWargear[],
  item: SelectedWargear,
  adjustments?: WargearAdjustmentSource | null,
): SelectedWargear[] {
  const sfGrants = adjustments?.wargearKeywordGrants?.[item.id] ?? [];
  const sfCost = adjustments?.wargearCostOverrides?.[item.id];
  const effectiveItem: SelectedWargear = {
    ...item,
    ...(sfCost ? { cost: sfCost.cost, costCurrency: sfCost.costCurrency ?? 'credits' as const } : {}),
    ...(sfGrants.length > 0 ? { grantsKeywords: [...(item.grantsKeywords ?? []), ...sfGrants] } : {}),
  };

  const existing = selectedWargear.findIndex(w => w.id === effectiveItem.id);
  let newWargear: SelectedWargear[];
  if (existing >= 0) {
    newWargear = selectedWargear.map((w, index) => (index === existing ? effectiveItem : w));
  } else {
    newWargear = [...selectedWargear, effectiveItem];
    const gearDef = lookupWargear(effectiveItem.id);
    if (gearDef?.grantsBonusWeapon) {
      const bonusWeapon = lookupWeapon(gearDef.grantsBonusWeapon);
      if (bonusWeapon && !newWargear.some(w => w.id === bonusWeapon.id)) {
        newWargear = [...newWargear, {
          id: bonusWeapon.id,
          name: bonusWeapon.name,
          cost: 0,
          costCurrency: 'credits' as const,
          type: 'weapon' as const,
          quantity: 1,
          isDefault: true,
          grantsKeywords: bonusWeapon.grantsKeywords ?? [],
          associatedWithId: effectiveItem.id,
        }];
      }
    }
  }

  return newWargear;
}
