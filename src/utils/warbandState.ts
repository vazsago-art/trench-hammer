import type { Warband } from '../types/index.js';

export function createEmptyWarband(
  factionId: string,
  pointLimit = 700,
  gloryLimit = 0
): Warband {
  return {
    id: `warband-${Date.now()}`,
    name: 'My Warband',
    faction: factionId,
    pointLimit,
    gloryLimit,
    units: [],
    mercenaries: [],
    totalPoints: 0,
    totalGlory: 0,
    totalModels: 0,
  };
}

export function hasUnsavedWarbandContent(warband: Warband): boolean {
  return warband.units.length > 0 || warband.name !== 'My Warband';
}

export function normalizeLoadedWarband(warband: Warband): Warband {
  return {
    ...warband,
    mercenaries: warband.mercenaries ?? [],
  };
}

export function applyFactionChangeToWarband(
  previous: Warband,
  factionId: string,
  defaultSubFactionId: string
): Warband {
  return {
    ...previous,
    faction: factionId,
    subfaction: defaultSubFactionId === 'no_variant' ? undefined : defaultSubFactionId,
    subfactionName: undefined,
    patron: undefined,
    units: [],
    mercenaries: [],
  };
}

export function applySubFactionChangeToWarband(
  previous: Warband,
  subFactionId: string,
  subFactionName?: string
): Warband {
  return {
    ...previous,
    subfaction: subFactionId === 'no_variant' ? undefined : subFactionId,
    subfactionName: subFactionId === 'no_variant' ? undefined : subFactionName,
    variantOptionEnabled: undefined,
    units: [],
    mercenaries: [],
  };
}
