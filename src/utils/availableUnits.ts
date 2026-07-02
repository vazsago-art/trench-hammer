import type { Ability, Faction, UnitOption } from '../types/index.js';
import type { SubFaction } from '../data/subfactions.js';

interface ResolveAvailableUnitsArgs {
  currentFaction?: Faction;
  currentSubFaction: SubFaction | null;
  variantOptionEnabled?: boolean;
  unitAbilitiesMap: Record<string, Ability[]>;
}

interface ResolveAvailableUnitsResult {
  allAvailableUnits: UnitOption[];
  upgradeMaxCountOverrides: Record<string, number>;
}

function withMappedAbilities(unit: UnitOption, abilitiesMap: Record<string, Ability[]>): UnitOption {
  if ((unit.abilities?.length ?? 0) > 0) return unit;
  const mappedAbilities = abilitiesMap[unit.id];
  if (!mappedAbilities || mappedAbilities.length === 0) return unit;
  return { ...unit, abilities: mappedAbilities };
}

export function resolveAvailableUnits({
  currentFaction,
  currentSubFaction,
  variantOptionEnabled,
  unitAbilitiesMap,
}: ResolveAvailableUnitsArgs): ResolveAvailableUnitsResult {
  const variantCfg = variantOptionEnabled ? currentSubFaction?.variantOption : undefined;

  const bannedUnitIdsSet = new Set<string>([
    ...(currentSubFaction?.bannedUnitIds ?? []),
    ...(variantCfg?.bannedUnitIds ?? []),
  ]);

  const unitMaxCountOverrides: Record<string, number> = {
    ...(currentSubFaction?.unitMaxCountOverrides ?? {}),
    ...(variantCfg?.unitMaxCountOverrides ?? {}),
  };

  const upgradeMaxCountOverrides: Record<string, number> = {
    ...(currentSubFaction?.upgradeMaxCountOverrides ?? {}),
  };

  const allAvailableUnits: UnitOption[] = [
    ...(currentFaction?.units.filter((u) => !bannedUnitIdsSet.has(u.id)).map((u) =>
      unitMaxCountOverrides[u.id] !== undefined
        ? { ...u, maxCount: unitMaxCountOverrides[u.id] }
        : u
    ) ?? []),
    ...(currentSubFaction?.extraUnits?.map((u) => withMappedAbilities(u, unitAbilitiesMap)) ?? []),
    ...(variantCfg?.extraUnits?.map((u) => withMappedAbilities(u, unitAbilitiesMap)) ?? []),
  ];

  return {
    allAvailableUnits,
    upgradeMaxCountOverrides,
  };
}
