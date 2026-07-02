import type { SelectedGiftOfChaos } from '../types/index.js';

export function addGiftToSelection(
  currentGifts: SelectedGiftOfChaos[] | undefined,
  gift: SelectedGiftOfChaos,
): SelectedGiftOfChaos[] | null {
  const existing = (currentGifts ?? []).find(g => g.id === gift.id);
  if (existing) return null;
  return [...(currentGifts ?? []), gift];
}

export function removeGiftFromSelection(
  currentGifts: SelectedGiftOfChaos[] | undefined,
  giftId: string,
): SelectedGiftOfChaos[] {
  return (currentGifts ?? []).filter(g => g.id !== giftId);
}
