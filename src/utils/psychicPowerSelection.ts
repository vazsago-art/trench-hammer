import type { SelectedPsychicPower } from '../types/index.js';

export function addPsychicPowerToSelection(
  currentPowers: SelectedPsychicPower[] | undefined,
  power: SelectedPsychicPower,
): SelectedPsychicPower[] | null {
  const existing = (currentPowers ?? []).find(p => p.id === power.id);
  if (existing) return null;
  return [...(currentPowers ?? []), power];
}

export function removePsychicPowerFromSelection(
  currentPowers: SelectedPsychicPower[] | undefined,
  powerId: string,
): SelectedPsychicPower[] {
  return (currentPowers ?? []).filter(p => p.id !== powerId);
}
