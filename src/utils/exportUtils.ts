import { Warband } from '../types/index.js';
import { expandKeywords } from '../data/keywordGlossary.js';

export function exportWarbandAsJSON(warband: Warband): string {
  return JSON.stringify(warband, null, 2);
}

export function exportWarbandAsText(warband: Warband, pointLimit: number, gloryLimit?: number): string {
  let text = '='.repeat(60) + '\n';
  text += 'TRENCH HAMMER WARBAND ROSTER\n';
  text += '='.repeat(60) + '\n\n';

  text += `Warband Name: ${warband.name}\n`;
  text += `Faction: ${warband.faction}\n`;
  text += `Date: ${new Date().toLocaleDateString()}\n\n`;

  text += 'UNITS:\n';
  text += '-'.repeat(60) + '\n';

  warband.units.forEach((unit, idx) => {
    const currency = unit.costCurrency ?? 'credits';
    const unitTotal = currency === 'glory'
      ? `${unit.totalGloryCost} Glory`
      : `${unit.totalCost} Credits`;
    text += `\n${idx + 1}. ${unit.name}\n`;
    text += `   Count: ${unit.count} model(s)\n`;
    text += `   Base Cost: ${unit.baseCostPerModel} ${currency === 'glory' ? 'Glory' : 'Credits'}/model\n`;
    text += `   Unit Total: ${unitTotal}\n`;
    if (unit.appliedSubType) {
      text += `   Selected Option: ${unit.appliedSubType.name}\n`;
      text += `      ${unit.appliedSubType.description}\n`;
    }
    if (unit.selectedWargear.length > 0) {
      text += `   Wargear:\n`;
      unit.selectedWargear.forEach(w => {
        const wCurrency = w.costCurrency === 'glory' ? 'Glory' : 'Credits';
        text += `      - ${w.name} (${w.cost} ${wCurrency} each)\n`;
      });
    }
    if ((unit.selectedPsychicPowers ?? []).length > 0) {
      text += `   Psychic Powers:\n`;
      (unit.selectedPsychicPowers ?? []).forEach(p => {
        const pCurrency = p.costCurrency === 'glory' ? 'Glory' : 'Credits';
        text += `      - ${p.name} [${p.disciplineName}] (+${p.cost} ${pCurrency})\n`;
      });
    }
    if ((unit.selectedGiftsOfChaos ?? []).length > 0) {
      text += `   Mutations (Gifts of Chaos):\n`;
      (unit.selectedGiftsOfChaos ?? []).forEach(g => {
        const gCurrency = g.costCurrency === 'glory' ? 'Glory' : 'Credits';
        text += `      - ${g.name} [D66: ${g.diceResult}] (+${g.cost} ${gCurrency})\n`;
      });
    }
    text += `   Keywords: ${unit.keywords.join(', ')}\n`;
  });

  // ── Rules Reference ────────────────────────────────────────────────────
  const allKw: string[] = [];
  warband.units.forEach(u => allKw.push(...u.keywords));
  const rulesEntries = expandKeywords(allKw);
  if (rulesEntries.length > 0) {
    text += '\n' + '='.repeat(60) + '\n';
    text += 'RULES REFERENCE\n';
    text += '='.repeat(60) + '\n';
    rulesEntries.forEach(({ keyword, description }) => {
      text += `\n${keyword}\n`;
      text += `  ${description}\n`;
    });
  }

  text += '\n' + '-'.repeat(60) + '\n';
  const totalCredits = warband.units.reduce((sum, u) => sum + u.totalCost, 0);
  const totalGlory   = warband.units.reduce((sum, u) => sum + u.totalGloryCost, 0);
  const effectiveGloryLimit = gloryLimit ?? warband.gloryLimit;

  text += `TOTAL CREDITS: ${totalCredits} / ${pointLimit}\n`;
  if (effectiveGloryLimit > 0 || totalGlory > 0) {
    text += `TOTAL GLORY:   ${totalGlory}${effectiveGloryLimit > 0 ? ` / ${effectiveGloryLimit}` : ' (untracked)'}\n`;
  }
  text += `TOTAL MODELS: ${warband.units.reduce((sum, u) => sum + u.count, 0)}\n`;
  text += '='.repeat(60) + '\n';

  return text;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function saveWarbandLocal(warband: Warband) {
  const warbands = getAllWarbands();
  const existingIdx = warbands.findIndex(w => w.id === warband.id);
  
  if (existingIdx >= 0) {
    warbands[existingIdx] = warband;
  } else {
    warbands.push(warband);
  }

  localStorage.setItem('trench_hammer_warbands', JSON.stringify(warbands));
}

export function getAllWarbands(): Warband[] {
  const stored = localStorage.getItem('trench_hammer_warbands');
  return stored ? JSON.parse(stored) : [];
}

export function loadWarbandLocal(id: string): Warband | undefined {
  const warbands = getAllWarbands();
  return warbands.find(w => w.id === id);
}

export function deleteWarbandLocal(id: string) {
  const warbands = getAllWarbands();
  const filtered = warbands.filter(w => w.id !== id);
  localStorage.setItem('trench_hammer_warbands', JSON.stringify(filtered));
}
