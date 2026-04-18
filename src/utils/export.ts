import { Warband } from '../types/index.js';
import { getFactionById } from '../data/factions_complete.js';
import { ALL_MERCENARIES } from '../data/mercenaries.js';
import { expandKeywords } from '../data/keywordGlossary.js';
import { isEliteEligible, SKILL_TABLE_LABELS } from '../data/campaignProgression.js';
import { getSubFactionById } from '../data/subfactions.js';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

/**
 * Migration: patch HA variant warbands whose auto-mark cost was previously 0
 * due to markCostBonus being hard-coded to 0. Adds the correct mark cost to
 * baseCostPerModel and recalculates totalCost / totalGloryCost.
 */
export function migrateAutoMarkCost(wb: Warband): Warband {
  if (wb.faction !== 'heretic_astartes' || !wb.subfaction) return wb;
  const sf = getSubFactionById(wb.faction, wb.subfaction);
  if (!sf?.autoMark) return wb;
  const markCost = sf.autoMark.costOverride;
  const eligibleSet = new Set(sf.autoMark.eligibleUnitIds);
  let changed = false;
  const units = wb.units.map(unit => {
    // Only patch units that have the auto-mark wargear with cost 0
    const hasAutoMark = unit.selectedWargear.some(
      w => w.slot === 'mark' && w.isDefault && w.cost === 0,
    );
    if (!hasAutoMark || !eligibleSet.has(unit.unitId)) return unit;
    changed = true;
    const newBase = unit.baseCostPerModel + markCost;
    const currency = unit.costCurrency ?? 'credits';
    return {
      ...unit,
      baseCostPerModel: newBase,
      totalCost: currency === 'credits'
        ? (unit.totalCost - unit.count * unit.baseCostPerModel) + unit.count * newBase
        : unit.totalCost,
      totalGloryCost: currency === 'glory'
        ? (unit.totalGloryCost - unit.count * unit.baseCostPerModel) + unit.count * newBase
        : unit.totalGloryCost,
    };
  });
  return changed ? { ...wb, units } : wb;
}

/**
 * Migrate legacy built-in mark IDs to canonical IDs, fix their slot and description,
 * and remove incorrect statModifiers (e.g. rangedSkill → INJURY MODIFIER is not a stat).
 */
const LEGACY_MARK_MAP: Record<string, { canonId: string; description: string; grantsKeywords: string[]; statModifiers?: Partial<import('../types/index.js').ModelStats> }> = {
  ha_mark_tzeentch_es: { canonId: 'mark_of_tzeentch', description: 'Ranged attacks have +1 INJURY MODIFIER. Grants TZEENTCH keyword. Included in base cost.', grantsKeywords: ['TZEENTCH'] },
  ha_mark_slaanesh_kak: { canonId: 'mark_of_slaanesh', description: '+2" movement speed, +1 DICE to all Dash Success Rolls. Grants SLAANESH keyword. Included in base cost.', grantsKeywords: ['SLAANESH'], statModifiers: { movement: 2 } },
  ha_mark_khorne_moe: { canonId: 'mark_of_khorne', description: 'Melee attacks have +1 INJURY MODIFIER. Grants KHORNE keyword. Included in base cost.', grantsKeywords: ['KHORNE'] },
  ha_mark_khorne_sb: { canonId: 'mark_of_khorne', description: 'Melee attacks have +1 INJURY MODIFIER. Grants KHORNE keyword. Included in base cost.', grantsKeywords: ['KHORNE'] },
};

export function migrateLegacyMarkIds(wb: Warband): Warband {
  if (wb.faction !== 'heretic_astartes') return wb;
  let changed = false;
  const units = wb.units.map(unit => {
    let unitChanged = false;
    const wargear = unit.selectedWargear.map(w => {
      const fix = LEGACY_MARK_MAP[w.id];
      if (!fix) return w;
      unitChanged = true;
      return {
        ...w,
        id: fix.canonId,
        slot: 'mark' as const,
        description: fix.description,
        grantsKeywords: fix.grantsKeywords,
        statModifiers: fix.statModifiers,
      };
    });
    if (unitChanged) { changed = true; return { ...unit, selectedWargear: wargear }; }
    return unit;
  });
  return changed ? { ...wb, units } : wb;
}

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
    text += `   Keywords: ${unit.keywords.join(', ')}\n`;
    if (isEliteEligible(unit)) {
      text += `   [ELITE PROGRESSION]\n`;
      text += `   XP: ${unit.xp ?? 0}\n`;
      if (unit.isPromoted) text += `   Status: Promoted to Elite\n`;
      if (unit.campaignSkills?.length) {
        text += `   Campaign Skills:\n`;
        unit.campaignSkills.forEach(s =>
          text += `      - ${s.name} (${SKILL_TABLE_LABELS[s.table]}, roll ${s.roll})\n`
        );
      }
      if (unit.battleScars?.length) {
        text += `   Battle Scars:\n`;
        unit.battleScars.forEach(s => text += `      - ${s.name}\n`);
      }
      if (unit.traumas?.length) {
        text += `   Traumas:\n`;
        unit.traumas.forEach(t => text += `      - ${t.name}\n`);
      }
    }
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

/**
 * Generate a human-readable Markdown roster.
 * The raw JSON is embedded at the bottom inside a ```thjson code fence
 * so the same .md file can be re-imported into the app.
 */
export function exportWarbandAsMD(warband: Warband): string {
  const totalCredits = warband.units.reduce((sum, u) => sum + u.totalCost, 0);
  const unitGlory    = warband.units.reduce((sum, u) => sum + u.totalGloryCost, 0);
  const mercGlory    = (warband.mercenaries ?? []).reduce((sum, m) => sum + m.gloryCost * m.count, 0);
  const totalGlory   = unitGlory + mercGlory;
  const totalModels  = warband.units.reduce((sum, u) => sum + u.count, 0);
  const totalMercs   = (warband.mercenaries ?? []).reduce((sum, m) => sum + m.count, 0);
  const date = new Date().toLocaleDateString();

  let md = `# ⚔️ ${warband.name}\n`;
  md += `### Trench Hammer — Warband Roster\n\n`;

  md += `| | |\n|---|---|\n`;
  md += `| **Faction** | ${warband.faction.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} |\n`;
  if (warband.subfactionName) md += `| **Variant** | ${warband.subfactionName} |\n`;
  md += `| **Credits** | ${totalCredits} / ${warband.pointLimit} |\n`;
  if (warband.gloryLimit > 0 || totalGlory > 0) {
    md += `| **Glory** | ${totalGlory}${warband.gloryLimit > 0 ? ` / ${warband.gloryLimit}` : ''} |\n`;
  }
  md += `| **Models** | ${totalModels} |\n`;
  if (totalMercs > 0) md += `| **Mercenaries** | ${totalMercs} |\n`;
  md += `| **Date** | ${date} |\n\n`;
  md += `---\n\n## Units\n\n`;

  warband.units.forEach((unit, idx) => {
    const currency = unit.costCurrency ?? 'credits';
    const costLabel = currency === 'glory'
      ? `${unit.totalGloryCost} Glory`
      : `${unit.totalCost} Credits`;
    const perModel = currency === 'glory'
      ? `${unit.baseCostPerModel} Glo/model`
      : `${unit.baseCostPerModel} Cr/model`;

    md += `### ${idx + 1}. ${unit.name}`;
    if (unit.count > 1) md += ` ×${unit.count}`;
    md += ` — ${costLabel}`;
    if (unit.count > 1) md += ` (${perModel})`;
    md += '\n\n';

    if (unit.appliedSubType) {
      md += `> **Selected Option:** ${unit.appliedSubType.name}\n`;
      md += `> ${unit.appliedSubType.description}\n\n`;
    }

    md += `**Keywords:** ${unit.keywords.map(k => `\`${k}\``).join(' ')}\n\n`;

    const hasWargear  = unit.selectedWargear.length > 0;
    const hasPsychic  = (unit.selectedPsychicPowers ?? []).length > 0;
    const hasUpgrades = Object.keys(unit.selectedUpgrades ?? {}).length > 0;

    if (hasWargear || hasPsychic || hasUpgrades) {
      md += `| Equipment | Cost |\n|---|---|\n`;
      unit.selectedWargear.forEach(w => {
        const wCur = w.costCurrency === 'glory' ? 'Glo' : 'Cr';
        const total = w.cost * w.quantity;
        md += `| ${w.name}${w.quantity > 1 ? ` ×${w.quantity}` : ''} | +${total} ${wCur} |\n`;
      });
      (unit.selectedPsychicPowers ?? []).forEach(p => {
        const pCur = p.costCurrency === 'glory' ? 'Glo' : 'Cr';
        md += `| 🔮 ${p.name} | +${p.cost} ${pCur} |\n`;
      });
      if (unit.selectedUpgrades) {
        // Resolve upgrade name from faction data
        const factionUnits = getFactionById(warband.faction)?.units ?? [];
        const unitDef = factionUnits.find(u => u.id === unit.unitId);
        Object.entries(unit.selectedUpgrades).forEach(([upgId, cnt]) => {
          if (cnt <= 0) return;
          const upg = unitDef?.upgrades?.find(u => u.id === upgId);
          const upgName = upg ? upg.name : upgId;
          const upgKw = upg?.grantedKeywords?.length ? ` _(grants ${upg.grantedKeywords.join(', ')})_` : '';
          const upgCost = upg ? `+${upg.cost} Cr` : '—';
          md += `| ⬆ ${upgName}${upgKw} | ${upgCost} |\n`;
        });
      }
      md += '\n';
    }

    if (isEliteEligible(unit)) {
      md += `**Elite Progression:** XP ${unit.xp ?? 0}`;
      if (unit.isPromoted) md += ` _(Promoted to Elite)_`;
      md += '\n\n';
      if (unit.campaignSkills?.length) {
        md += `**Campaign Skills:**\n\n`;
        unit.campaignSkills.forEach(s => {
          md += `- **${s.name}** _(${SKILL_TABLE_LABELS[s.table]}, roll ${s.roll})_ — ${s.description}\n`;
        });
        md += '\n';
      }
      if (unit.battleScars?.length) {
        md += `**Battle Scars:**\n\n`;
        unit.battleScars.forEach(s => {
          md += `- **${s.name}** — ${s.description}\n`;
        });
        md += '\n';
      }
      if (unit.traumas?.length) {
        md += `**Traumas:**\n\n`;
        unit.traumas.forEach(t => {
          md += `- **${t.name}** — ${t.description}\n`;
        });
        md += '\n';
      }
    }
  });

  // ── Mercenaries section ───────────────────────────────────────────────────
  const hiredMercs = warband.mercenaries ?? [];
  if (hiredMercs.length > 0) {
    md += `---\n\n## Mercenaries\n\n`;
    hiredMercs.forEach((wm) => {
      const merc = ALL_MERCENARIES.find((m) => m.id === wm.mercenaryId);
      const countLabel = wm.count > 1 ? ` ×${wm.count}` : '';
      const gloryCostLabel = wm.count > 1
        ? `${wm.gloryCost * wm.count} Glory (${wm.gloryCost} Glo/model)`
        : `${wm.gloryCost} Glory`;
      md += `### ${wm.name}${countLabel} — ${gloryCostLabel}\n\n`;

      if (merc) {
        if (merc.keywords?.length) {
          md += `**Keywords:** ${merc.keywords.map(k => `\`${k}\``).join(' ')}\n\n`;
        }
        if (merc.stats) {
          const s = merc.stats;
          md += `| MOVEMENT | RANGED | MELEE | ARMOUR | BASE |\n`;
          md += `|:---:|:---:|:---:|:---:|:---:|\n`;
          md += `| ${s.movement} | ${s.ranged} | ${s.melee} | ${s.armour} | ${s.base} |\n\n`;
        }
        if (merc.weapons?.length) {
          md += `**Battlekit:**\n\n`;
          md += `| Name | Profile |\n|---|---|\n`;
          merc.weapons.forEach((w) => {
            md += `| ${w.name} | ${w.profile} |\n`;
          });
          md += `\n`;
        }
        if (merc.abilities?.length) {
          md += `**Abilities:**\n\n`;
          merc.abilities.forEach((ab) => {
            md += `- **${ab.name}:** ${ab.description}\n`;
          });
          md += `\n`;
        }
        if (merc.psychicPowers?.length) {
          md += `**Psychic Powers:**\n\n`;
          merc.psychicPowers.forEach((p) => {
            md += `- **${p.name}:** ${p.description}\n`;
          });
          md += `\n`;
        }
        if (merc.description) {
          md += `> ${merc.description}\n\n`;
        }
      }
    });
  }

  // ── Rules Reference ────────────────────────────────────────────────────
  const allKwMd: string[] = [];
  warband.units.forEach(u => allKwMd.push(...u.keywords));
  (warband.mercenaries ?? []).forEach(wm => {
    const merc = ALL_MERCENARIES.find(m => m.id === wm.mercenaryId);
    if (merc?.keywords) allKwMd.push(...merc.keywords);
  });
  const rulesEntriesMd = expandKeywords(allKwMd);
  if (rulesEntriesMd.length > 0) {
    md += `---\n\n## Rules Reference\n\n`;
    md += `| Keyword | Effect |\n|---|---|\n`;
    rulesEntriesMd.forEach(({ keyword, description }) => {
      md += `| **${keyword}** | ${description} |\n`;
    });
    md += '\n';
  }

  md += `---\n\n## Summary\n\n`;
  md += `- **Total Credits:** ${totalCredits} / ${warband.pointLimit}`;
  if (totalCredits > warband.pointLimit) md += ' ⚠️ OVER LIMIT';
  md += '\n';
  if (warband.gloryLimit > 0) md += `- **Total Glory:** ${totalGlory} / ${warband.gloryLimit}\n`;
  else if (totalGlory > 0) md += `- **Total Glory:** ${totalGlory}\n`;
  md += `- **Total Models:** ${totalModels}\n`;
  md += `- **Units:** ${warband.units.length}\n`;
  if (totalMercs > 0) md += `- **Mercenaries:** ${totalMercs} (${mercGlory} Glory)\n`;
  md += '\n';

  md += `---\n\n`;
  md += `*Generated by [Trench Hammer Army Builder](https://github.com/TrenchHammer) v${__APP_VERSION__} on ${date}.*\n`;
  md += `*To re-import this roster, copy the JSON block below and use "Paste to Import" in the app.*\n\n`;
  md += `\`\`\`json\n`;
  md += exportWarbandAsJSON(warband);
  md += `\n\`\`\`\n`;

  return md;
}

/**
 * Try to use the Capacitor Share API (Android/iOS) or Web Share API,
 * falling back to an anchor-click download on desktop browsers.
 */
async function shareOrDownload(content: string, filename: string, mimeType: string): Promise<void> {
  // Native Android/iOS via Capacitor: write file to cache then share it
  if (Capacitor.isNativePlatform()) {
    try {
      await Filesystem.writeFile({
        path: filename,
        data: content,
        directory: Directory.Cache,
        encoding: Encoding.UTF8,
      });
      const fileResult = await Filesystem.getUri({
        path: filename,
        directory: Directory.Cache,
      });
      await Share.share({
        title: filename,
        url: fileResult.uri,
        dialogTitle: 'Share or save warband roster',
      });
      return;
    } catch (err) {
      // User cancelled share
      if ((err as Error)?.message?.includes('Share canceled') ||
          (err as Error)?.message?.includes('canceled')) return;
      console.error('Capacitor share error:', err);
    }
  }

  // Web: try Web Share API with file support
  const blob = new Blob([content], { type: mimeType });
  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
    try {
      const file = new File([blob], filename, { type: mimeType });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: filename });
        return;
      }
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
    }
  }

  // Desktop fallback: trigger browser download via hidden anchor
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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
  if (!stored) return [];
  const raw: Warband[] = JSON.parse(stored);
  return raw.map(wb => migrateLegacyMarkIds(migrateAutoMarkCost(wb)));
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

/**
 * Parse and validate a warband from text input.
 * Handles both raw JSON and .md files that contain an embedded
 * ```json ... ``` (or legacy ```thjson ... ```) code block.
 * Assigns a fresh `id` to avoid collisions.
 * Returns the Warband on success, null if malformed/invalid.
 */
export function importWarbandFromJSON(input: string): Warband | null {
  let jsonString = input.trim();

  // Extract JSON from a markdown code fence (```json or legacy ```thjson)
  const mdMatch = jsonString.match(/```(?:json|thjson)\s*([\s\S]*?)\s*```/);
  if (mdMatch) {
    jsonString = mdMatch[1].trim();
  }

  try {
    const data = JSON.parse(jsonString);
    if (
      typeof data !== 'object' || data === null ||
      typeof data.name !== 'string' ||
      typeof data.faction !== 'string' ||
      !Array.isArray(data.units)
    ) {
      return null;
    }
    return migrateLegacyMarkIds(migrateAutoMarkCost({
      ...data,
      id: `warband-${Date.now()}`,
    } as Warband));
  } catch {
    return null;
  }
}

/**
 * Share or download the warband as a human-readable Markdown file (.md).
 * The file contains a full roster AND embedded JSON for re-importing.
 */
export async function exportWarbandToMDFile(warband: Warband): Promise<void> {
  const md = exportWarbandAsMD(warband);
  const safeName = warband.name.replace(/[^a-z0-9_\-]/gi, '_') || 'warband';
  await shareOrDownload(md, `${safeName}-roster.md`, 'text/markdown');
}
