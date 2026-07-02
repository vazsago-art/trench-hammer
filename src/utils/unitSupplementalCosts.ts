import type { SelectedGiftOfChaos, SelectedPsychicPower, UnitOption, WarbandUnit } from '../types/index.js';

type SupplementalCostArgs = {
  selectedUpgrades?: Record<string, number>;
  selectedPsychicPowers?: SelectedPsychicPower[];
  selectedGiftsOfChaos?: SelectedGiftOfChaos[];
};

export function calculateUnitSupplementalCosts(
  unit: WarbandUnit,
  unitDef: UnitOption | undefined,
  overrides?: SupplementalCostArgs,
) {
  const selectedUpgrades = overrides?.selectedUpgrades ?? unit.selectedUpgrades ?? {};
  const selectedPsychicPowers = overrides?.selectedPsychicPowers ?? unit.selectedPsychicPowers ?? [];
  const selectedGiftsOfChaos = overrides?.selectedGiftsOfChaos ?? unit.selectedGiftsOfChaos ?? [];

  const psychicCredits = selectedPsychicPowers
    .filter(p => (p.costCurrency ?? 'credits') === 'credits')
    .reduce((sum, p) => sum + p.cost, 0);
  const psychicGlory = selectedPsychicPowers
    .filter(p => p.costCurrency === 'glory')
    .reduce((sum, p) => sum + p.cost, 0);
  const giftCredits = selectedGiftsOfChaos.reduce((sum, g) => sum + g.cost, 0);
  const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce(
    (sum, upg) => sum + (selectedUpgrades[upg.id] ?? 0) * upg.cost,
    0,
  );

  return {
    psychicCredits,
    psychicGlory,
    giftCredits,
    upgradeCreditCost,
  } as const;
}
