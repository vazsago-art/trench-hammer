import type { UnitOption } from '../types/index.js';

type UpgradeDef = NonNullable<UnitOption['upgrades']>[number];

function isStackableUpgrade(upg?: Pick<UpgradeDef, 'maxCount' | 'requiredUpgradeId' | 'upgradeGroup'>): boolean {
  return !!upg && ((upg.maxCount ?? 1) >= 10 || !!upg.requiredUpgradeId || !!upg.upgradeGroup);
}

export function resolveUpgradeSelection(
  currentUpgrades: Record<string, number> | undefined,
  upgradeDefs: UnitOption['upgrades'],
  upgradeId: string,
  count: number,
): Record<string, number> {
  const unitUpgrades = upgradeDefs ?? [];
  const upgrade = unitUpgrades.find(upg => upg.id === upgradeId);
  const isStackable = isStackableUpgrade(upgrade);

  let newUpgrades: Record<string, number>;
  if (isStackable) {
    newUpgrades = { ...(currentUpgrades ?? {}) };
    if (count > 0) {
      if (upgrade?.conflictsWithUpgradeIds) {
        for (const conflictId of upgrade.conflictsWithUpgradeIds) {
          delete newUpgrades[conflictId];
        }
      }
      if (upgrade?.upgradeGroup) {
        for (const [id] of Object.entries(newUpgrades)) {
          const existingUpg = unitUpgrades.find(upg => upg.id === id);
          if (existingUpg?.upgradeGroup === upgrade.upgradeGroup && id !== upgradeId) {
            delete newUpgrades[id];
          }
        }
      }
      newUpgrades[upgradeId] = count;
    } else {
      delete newUpgrades[upgradeId];
      for (const [id] of Object.entries(newUpgrades)) {
        const dependent = unitUpgrades.find(upg => upg.id === id);
        if (dependent?.requiredUpgradeId === upgradeId) delete newUpgrades[id];
      }
    }
  } else {
    newUpgrades = {};
    for (const [id, cnt] of Object.entries(currentUpgrades ?? {})) {
      const existingUpg = unitUpgrades.find(upg => upg.id === id);
      if (existingUpg && isStackableUpgrade(existingUpg)) {
        const reqId = existingUpg.requiredUpgradeId;
        const reqUpg = reqId ? unitUpgrades.find(upg => upg.id === reqId) : null;
        const isParentStaying = !reqId || (reqId === upgradeId && count > 0) || (reqUpg && isStackableUpgrade(reqUpg));
        if (isParentStaying) {
          newUpgrades[id] = cnt;
        }
      }
    }
    if (count > 0) newUpgrades[upgradeId] = count;
  }

  return newUpgrades;
}
