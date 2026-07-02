import { lookupWeapon } from '../data/wargearSlotValidation.js';
import type { SelectedWargear } from '../types/index.js';

const COMBI_SECOND_MODE_IDS: Record<string, string[]> = {
  combi_bolter: ['boltgun', 'flamer', 'grav_gun', 'grenade_launcher', 'melta_gun', 'plasma_gun'],
  inferno_combi_bolter_ts: ['inferno_boltgun_ts', 'flamer', 'grav_gun', 'grenade_launcher', 'melta_gun', 'plasma_gun'],
};

export interface CombiSecondModeOption {
  id: string;
  name: string;
  cost: number;
  costCurrency?: 'credits' | 'glory';
}

export function isCombiWeaponId(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(COMBI_SECOND_MODE_IDS, id);
}

export function getCombiSecondModeOptions(combiId: string): CombiSecondModeOption[] {
  const ids = COMBI_SECOND_MODE_IDS[combiId] ?? [];
  const options: CombiSecondModeOption[] = [];
  for (const id of ids) {
    const weapon = lookupWeapon(id);
    if (!weapon) continue;
    options.push({
      id: weapon.id,
      name: weapon.name,
      cost: weapon.cost,
      costCurrency: weapon.costCurrency,
    });
  }
  return options;
}

export function formatCombiWargearName(baseName: string, secondModeName?: string): string {
  if (!secondModeName) return baseName;
  return `${baseName} [2nd mode: ${secondModeName}]`;
}

export function hasMissingCombiModeSelection(item: Pick<SelectedWargear, 'id' | 'combiSecondModeId'>): boolean {
  return isCombiWeaponId(item.id) && !item.combiSecondModeId;
}

export function getMissingCombiModeWarning(item: Pick<SelectedWargear, 'id' | 'combiSecondModeId'>): string | null {
  if (!hasMissingCombiModeSelection(item)) return null;
  return 'Legacy loadout: this Combi weapon has no recorded second mode.';
}
