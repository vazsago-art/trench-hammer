import { lookupWargear } from '../data/wargearSlotValidation.js';
import type { SelectedWargear, UnitOption, WarbandUnit } from '../types/index.js';

export function calculateUnitCostTotals(
  unit: WarbandUnit,
  newWargear: SelectedWargear[],
  unitDef?: UnitOption | null,
) {
  const currency = unit.costCurrency ?? 'credits';
  const totals = newWargear.reduce(
    (acc, w) => {
      const qty = w.quantity ?? 1;

      const baseCurrency = w.costCurrency ?? 'credits';
      if (baseCurrency === 'glory') {
        acc.glory += w.cost * qty;
      } else {
        acc.credits += w.cost * qty;
      }

      if (w.combiSecondModeCost != null) {
        const secondCurrency = w.combiSecondModeCostCurrency ?? 'credits';
        if (secondCurrency === 'glory') {
          acc.glory += w.combiSecondModeCost * qty;
        } else {
          acc.credits += w.combiSecondModeCost * qty;
        }
      }

      return acc;
    },
    { credits: 0, glory: 0 },
  );

  let defaultArmourOffset = 0;
  if (unitDef) {
    const hasSelectedBodyArmour = newWargear.some(w => lookupWargear(w.id)?.slot === 'body-armour');
    if (hasSelectedBodyArmour) {
      const defaultBodyItem = unitDef.defaultWargear.find(
        item => lookupWargear(item.id)?.slot === 'body-armour',
      );
      if (defaultBodyItem) {
        defaultArmourOffset = -(lookupWargear(defaultBodyItem.id)?.cost ?? 0);
      }
    }
  }

  return {
    totalCost: (currency === 'credits' ? unit.count * unit.baseCostPerModel : 0) + totals.credits + defaultArmourOffset,
    totalGloryCost: (currency === 'glory' ? unit.count * unit.baseCostPerModel : 0) + totals.glory,
  };
}
