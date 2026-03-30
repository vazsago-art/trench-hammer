import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Warband, WarbandUnit, UnitOption, Ability, UnitUpgrade, WargearOption } from '../types/index.js';
import { getFactionById } from '../data/factions_complete.js';
import { allWeapons } from '../data/weapons.js';
import { allEquipment } from '../data/equipment.js';
import { lookupPsychicPower } from '../data/psychicDisciplines.js';
import { GIFTS_OF_CHAOS } from '../data/gifts_of_chaos.js';
import { lookupWargear, lookupWeapon } from '../data/wargearSlotValidation.js';
import { ALL_MERCENARIES } from '../data/mercenaries.js';
import { expandKeywords } from '../data/keywordGlossary.js';
import { isEliteEligible, SKILL_TABLE_LABELS } from '../data/campaignProgression.js';
import { getPatronById, filterAbilitiesForSubfaction } from '../data/patrons.js';
import { getSubFactionById } from '../data/subfactions.js';
import { getFactionRules } from '../data/factionRules.js';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

// ── Page geometry ─────────────────────────────────────────────────────────
const PW  = 210;        // A4 width  (mm)
const PH  = 297;        // A4 height (mm)
const ML  = 14;         // left / right margin
const MT  = 14;         // top margin
const MB  = 18;         // bottom guard (new page before y reaches PH - MB)
const CW  = PW - ML * 2; // content width

// ── Colour palette ────────────────────────────────────────────────────────
type RGB = [number, number, number];
const C_NAVY:    RGB = [22,  34,  54];
const C_TEAL:    RGB = [14, 116, 144];
const C_ELITE:   RGB = [76,  20, 170];
const C_TROOP:   RGB = [16, 110,  50];
const C_AMBER:   RGB = [146, 64,  14];
const C_WHITE:   RGB = [255, 255, 255];
const C_BODY:    RGB = [15,  20,  30];
const C_MUTED:   RGB = [55,  75,  95];
const C_ALTROW:  RGB = [228, 234, 242];
const C_THBG:    RGB = [35,  52,  72];
const C_PASSIVE: RGB = [16,  72,  38];
const C_ACTION:  RGB = [140, 40,  10];
const C_AURA:    RGB = [68,  20, 130];
const C_SECTION: RGB = [16,  72,  92];
// ── Unicode sanitiser (jsPDF built-in Helvetica only covers Latin-1) ─────────
function safe(text: string): string {
  return text
    .replace(/\u2018|\u2019|\u02BC/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u2013/g, '-')
    .replace(/\u2014/g, '--')
    .replace(/\u2022/g, '*')
    .replace(/\u00B1/g, '+/-')
    .replace(/[^\x00-\xFF]/g, '?');
}
// ── Drawing helpers ───────────────────────────────────────────────────────
function fill(doc: jsPDF, c: RGB) { doc.setFillColor(c[0], c[1], c[2]); }
function stroke(doc: jsPDF, c: RGB) { doc.setDrawColor(c[0], c[1], c[2]); }
function ink(doc: jsPDF, c: RGB) { doc.setTextColor(c[0], c[1], c[2]); }

function rect(doc: jsPDF, x: number, y: number, w: number, h: number, color: RGB) {
  fill(doc, color);
  doc.rect(x, y, w, h, 'F');
}

function linerect(doc: jsPDF, x: number, y: number, w: number, h: number, lineColor: RGB) {
  stroke(doc, lineColor);
  doc.rect(x, y, w, h, 'S');
}

/** Guard: add a new page if `needed` mm won't fit. Returns updated y. */
function guard(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PH - MB) { doc.addPage(); return MT; }
  return y;
}

/** Draw right-aligned text. */
function txtr(doc: jsPDF, text: string, x: number, y: number, size: number, color: RGB, bold = false) {
  doc.setFontSize(size);
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  ink(doc, color);
  doc.text(safe(text), x, y, { align: 'right' });
}

/** finalY after the last autoTable call. */
function tableY(doc: jsPDF): number {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (doc as any).lastAutoTable.finalY ?? 0;
}

// ── Base size helper (matches UnitInfoModal logic) ──────────────────────
function baseSize(unit: UnitOption): string {
  return unit.baseSize ?? '32mm';
}

// ── Stat formatting ───────────────────────────────────────────────────────
function fmtStat(v: number | string | undefined, suffix = ''): string {
  if (v === undefined || v === null) return '—';
  if (typeof v === 'number') return v === 0 ? `${v}${suffix}` : v > 0 ? `+${v}${suffix}` : `${v}${suffix}`;
  return String(v);
}

function fmtCost(unit: WarbandUnit): string {
  const currency = unit.costCurrency ?? 'credits';
  return currency === 'glory'
    ? `${unit.totalGloryCost} Glory`
    : `${unit.totalCost} Credits`;
}

// ── Item database (for resolving descriptions of selected wargear) ─────────
const ITEM_DB = new Map<string, { description?: string; keywords?: string[] }>([
  ...allWeapons.map(w => [w.id, { description: w.description, keywords: w.keywords }] as [string, {description?: string; keywords?: string[]}]),
  ...allEquipment.map(e => [e.id, { description: e.description, keywords: e.keywords }] as [string, {description?: string; keywords?: string[]}]),
]);

function lookupItem(unitOption: UnitOption, itemId: string): { description?: string; keywords?: string[] } {
  const inDefault = unitOption.defaultWargear.find(i => i.id === itemId);
  if (inDefault) return { description: (inDefault as {description?: string}).description, keywords: inDefault.keywords };
  const inAvail = unitOption.availableWargear.find(i => i.id === itemId);
  if (inAvail) return { description: (inAvail as {description?: string}).description, keywords: inAvail.keywords };
  return ITEM_DB.get(itemId) ?? {};
}

// ── Ability type formatting ───────────────────────────────────────────────
function abilityTypeLabel(type: Ability['type']): string {
  return type === 'passive' ? 'PASSIVE' : type === 'action' ? 'ACTION' : 'AURA';
}
// ── Section header bar ────────────────────────────────────────────────────
function sectionHeader(doc: jsPDF, label: string, y: number): number {
  rect(doc, ML, y, CW, 6, C_SECTION);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  ink(doc, C_WHITE);
  doc.text(label.toUpperCase(), ML + 2.5, y + 4.1);
  return y + 7;
}

// ── Draw cover / summary block ────────────────────────────────────────────
function drawCover(doc: jsPDF, warband: Warband): number {
  let y = MT;

  // Big navy header bar
  rect(doc, ML, y, CW, 18, C_NAVY);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  ink(doc, C_TEAL);
  doc.text('TRENCH HAMMER', ML + 3, y + 7.5);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  ink(doc, [180, 220, 230]);
  doc.text('WARBAND ROSTER', ML + 3, y + 13);
  txtr(doc, new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), ML + CW - 2, y + 13, 8, [180, 220, 230]);
  y += 20;

  // Warband name
  y = guard(doc, y, 12);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  ink(doc, C_NAVY);
  doc.text(safe(warband.name), ML, y + 7);
  y += 10;

  // Faction name (styled)
  const factionDisplay = getFactionById(warband.faction)?.name ?? warband.faction.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  ink(doc, C_TEAL);
  doc.text(safe(factionDisplay), ML, y + 1);
  y += 6;

  // Patron name (if selected)
  const patron = warband.patron ? getPatronById(warband.patron, warband.faction) : undefined;
  if (patron) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    ink(doc, [180, 140, 60]);
    doc.text(safe(`⚜ Patron: ${patron.name}`), ML, y + 1);
    y += 5;
  }

  // Thin separator
  stroke(doc, C_TEAL);
  doc.setLineWidth(0.5);
  doc.line(ML, y, ML + CW, y);
  y += 5;

  // Summary table
  const totalCredits = warband.units.reduce((s, u) => s + u.totalCost, 0);
  const unitGlory    = warband.units.reduce((s, u) => s + u.totalGloryCost, 0);
  const mercGlory    = (warband.mercenaries ?? []).reduce((s, m) => s + m.gloryCost * m.count, 0);
  const totalGlory   = unitGlory + mercGlory;
  const totalModels  = warband.units.reduce((s, u) => s + u.count, 0);
  const elites       = warband.units.filter(u => u.unitType === 'elite').length;
  const troops       = warband.units.filter(u => u.unitType === 'troop').length;
  const totalMercs   = (warband.mercenaries ?? []).reduce((s, m) => s + m.count, 0);

  const summaryRows: string[][] = [
    ['Credits', `${totalCredits} / ${warband.pointLimit}`],
    ...(warband.gloryLimit > 0 || totalGlory > 0
      ? [['Glory', `${totalGlory}${warband.gloryLimit > 0 ? ` / ${warband.gloryLimit}` : ''}`]]
      : []),
    ['Total Models', String(totalModels)],
    ['Elites', String(elites)],
    ['Troops', String(troops)],
    ...(totalMercs > 0 ? [['Mercenaries', `${totalMercs} (${mercGlory} Glory)`]] : []),
    ['Unit Roster', `${warband.units.length} unit${warband.units.length !== 1 ? 's' : ''}`],
  ];

  autoTable(doc, {
    startY: y,
    margin: { left: ML, right: ML },
    tableWidth: 80,
    body: summaryRows,
    styles: { fontSize: 9, cellPadding: 2.2 },
    bodyStyles: { textColor: C_BODY },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 38, textColor: C_BODY },
      1: { cellWidth: 42, textColor: [20, 100, 130] as RGB },
    },
    theme: 'plain',
    alternateRowStyles: { fillColor: C_ALTROW },
  });
  y = tableY(doc) + 8;

  // Separator before units
  stroke(doc, C_TEAL);
  doc.setLineWidth(0.8);
  doc.line(ML, y, ML + CW, y);
  y += 6;

  return y;
}

// ── Draw a single stat cell ───────────────────────────────────────────────
function drawStatCell(doc: jsPDF, label: string, value: string, x: number, y: number, w: number, h: number) {
  rect(doc, x, y, w, h, [215, 225, 238]);
  linerect(doc, x, y, w, h, [160, 178, 200]);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  ink(doc, C_MUTED);
  doc.text(label, x + w / 2, y + 3.5, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  ink(doc, C_BODY);
  doc.text(value, x + w / 2, y + h - 2.0, { align: 'center' });
}

// ── Draw one unit card ────────────────────────────────────────────────────
function drawUnitCard(
  doc: jsPDF,
  wbu: WarbandUnit,
  unitOption: UnitOption,
  y: number
): number {

  // Estimate minimum height for the header block and at least one section
  y = guard(doc, y, 32);

  // ── Unit header bar ──────────────────────────────────────────────────
  const headerH = 9;
  rect(doc, ML, y, CW, headerH, C_NAVY);

  // Unit name
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  ink(doc, C_WHITE);
  doc.text(safe(wbu.name), ML + 3, y + 6.2);

  // Elite / Troop badge
  const badgeColor = wbu.unitType === 'elite' ? C_ELITE : C_TROOP;
  const badgeLabel = wbu.unitType === 'elite' ? 'ELITE' : 'TROOP';
  const badgeW = 14;
  const badgeX = ML + CW - badgeW - 2;
  rect(doc, badgeX, y + 1.5, badgeW, 5.5, badgeColor);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  ink(doc, C_WHITE);
  doc.text(badgeLabel, badgeX + badgeW / 2, y + 5.5, { align: 'center' });

  // Count × cost
  const costStr = `×${wbu.count}  ${fmtCost(wbu)}`;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  ink(doc, [160, 210, 220]);
  doc.text(costStr, badgeX - 3, y + 6.2, { align: 'right' });
  y += headerH + 1;

  // ── Stats row – mirror buildResolvedUnit logic exactly ─────────────────
  y = guard(doc, y, 14);
  const statH = 12;

  // Sub-type modifiers
  const subMods = wbu.appliedSubType?.statModifiers ?? {};

  // Wargear movement bonus (e.g. Jump Pack +2") — also falls back to sw.statModifiers
  // for auto-mod items (Rubric Marines −1", Jakhals +1") not found in the lookup table.
  const wgMovementBonus = wbu.selectedWargear.reduce((sum, sw) => {
    const r = lookupWargear(sw.id);
    return sum + (r?.statModifiers?.movement ?? sw.statModifiers?.movement ?? 0);
  }, 0);

  // Wargear ranged-skill bonus (e.g. Gal Vorbak +1 Ranged Skill)
  const wgRangedSkillBonus = wbu.selectedWargear.reduce((sum, sw) => {
    const r = lookupWargear(sw.id);
    return sum + (r?.statModifiers?.rangedSkill ?? sw.statModifiers?.rangedSkill ?? 0);
  }, 0);

  // Armour-save calculation (same as buildResolvedUnit)
  const defaultArmourMod = (unitOption.defaultWargear as Array<{ statModifiers?: { armourSave?: number } }>)
    .reduce((sum, item) => sum + (item.statModifiers?.armourSave ?? 0), 0);
  const selectedArmourMod = wbu.selectedWargear.reduce((sum, sw) => {
    const r = lookupWargear(sw.id) as WargearOption & { statModifiers?: { armourSave?: number } };
    return sum + (r?.statModifiers?.armourSave ?? 0);
  }, 0);
  const hasSelectedBodyArmour = wbu.selectedWargear.some(sw => lookupWargear(sw.id)?.slot === 'body-armour');
  const bareArmourSave = (unitOption.stats.armourSave ?? 0) - defaultArmourMod;
  const effectiveBodyArmour = hasSelectedBodyArmour ? selectedArmourMod : defaultArmourMod + selectedArmourMod;
  const effectiveArmourSave = bareArmourSave + effectiveBodyArmour + (subMods.armourSave ?? 0);

  const effectiveMovement = unitOption.stats.movement + (subMods.movement ?? 0) + wgMovementBonus;
  const effectiveRanged   = unitOption.stats.rangedSkill + (subMods.rangedSkill ?? 0) + wgRangedSkillBonus;
  const effectiveMelee    = unitOption.stats.meleeSkill  + (subMods.meleeSkill  ?? 0);

  const stats = [
    { label: 'MOVEMENT', value: `${effectiveMovement}"` },
    { label: 'RANGED',   value: fmtStat(effectiveRanged) },
    { label: 'MELEE',    value: fmtStat(effectiveMelee) },
    { label: 'ARMOUR',   value: fmtStat(effectiveArmourSave) },
    { label: 'BASE',     value: baseSize(unitOption) },
    ...(wbu.count > 1 ? [{ label: 'COUNT', value: `x${wbu.count}` }] : []),
  ];

  const statW = Math.floor(CW / stats.length);
  const statsLeft = ML;
  stats.forEach((s, i) => {
    const lastW = i === stats.length - 1 ? CW - statW * (stats.length - 1) : statW;
    drawStatCell(doc, s.label, s.value, statsLeft + i * statW, y, lastW, statH);
  });
  y += statH + 2;

  // ── Sub-type row ──────────────────────────────────────────────────────
  if (wbu.appliedSubType) {
    y = guard(doc, y, 12);
    const stDesc = safe(wbu.appliedSubType.description);
    const stDescLines: string[] = doc.splitTextToSize(stDesc, CW - 6) as string[];
    const stH = Math.max(10, stDescLines.length * 4.5 + 6);
    const stY = y;
    rect(doc, ML, stY, CW, stH, [255, 245, 210]);
    linerect(doc, ML, stY, CW, stH, [200, 130, 20]);
    // Left accent bar
    rect(doc, ML, stY, 3, stH, C_AMBER);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    ink(doc, C_AMBER);
    doc.text(`SELECTED OPTION: ${safe(wbu.appliedSubType.name.toUpperCase())}`, ML + 5, stY + 4.5);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    ink(doc, C_BODY);
    stDescLines.forEach((line, i) => doc.text(line, ML + 5, stY + 9 + i * 4.5));
    y += stH + 3;
  }

  // ── Keywords row ──────────────────────────────────────────────────────
  y = guard(doc, y, 8);
  const kwText = safe(wbu.keywords.join('  |  '));
  const kwLines: string[] = doc.splitTextToSize(kwText, CW - 6) as string[];
  const kwH = Math.max(8, kwLines.length * 4.5 + 3);
  rect(doc, ML, y, CW, kwH, [220, 228, 240]);
  linerect(doc, ML, y, CW, kwH, [155, 175, 200]);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  ink(doc, C_MUTED);
  kwLines.forEach((line, i) => doc.text(line, ML + 2.5, y + 5 + i * 4.5));
  y += kwH + 3;

  // ── Default Battlekit ─────────────────────────────────────────────────
  // Filter out any default items that have been replaced
  const visibleDefaultWargear = unitOption.defaultWargear.filter(item => {
    // 1. Explicit replacesDefaultId
    if (wbu.selectedWargear.some(sw => sw.replacesDefaultId === item.id)) return false;
    // 2. Slot-based replacement
    const defSlot = (item as { slot?: string }).slot;
    if (defSlot && wbu.selectedWargear.some(sw => lookupWargear(sw.id)?.slot === defSlot)) return false;
    // 3. weaponReplacementRules
    const wrRule = (unitOption.weaponReplacementRules ?? []).find(r => r.replacedDefaultId === item.id);
    if (wrRule) {
      const replaced = wbu.selectedWargear.some(sw => {
        const wp = lookupWeapon(sw.id);
        if (wp) return wp.type === wrRule.whenAddingWeaponType;
        return sw.type === 'weapon'
          && (item as { type?: string }).type === wrRule.whenAddingWeaponType;
      });
      if (replaced) return false;
    }
    return true;
  });
  if (visibleDefaultWargear.length > 0) {
    y = guard(doc, y, 14);
    y = sectionHeader(doc, 'Default Battlekit', y);

    const kitRows = visibleDefaultWargear.map(item => {
      const isWeapon = (item as {type?: string}).type === 'ranged'
                    || (item as {type?: string}).type === 'melee'
                    || (item as {type?: string}).type === 'thrown'
                    || (item as {type?: string}).type === 'heavy'
                    || item.type === 'weapon';
      const typeLabel = isWeapon ? 'Weapon' : 'Gear';
      const rangeStr  = (item as {range?: number}).range ? `${(item as {range?: number}).range}"` : '-';
      const kwStr     = safe(item.keywords?.join(', ') ?? '');
      const descStr   = safe((item as {description?: string}).description ?? '');
      return [safe(item.name), typeLabel, isWeapon ? rangeStr : '-', kwStr, descStr];
    });

    autoTable(doc, {
      startY: y,
      margin: { left: ML, right: ML },
      tableWidth: CW,
      head: [['Name', 'Type', 'Range', 'Keywords', 'Description']],
      body: kitRows,
      styles: { fontSize: 7.5, cellPadding: 1.8, overflow: 'linebreak' },
      headStyles: { fillColor: C_THBG, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: C_ALTROW },
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold' },
        1: { cellWidth: 14 },
        2: { cellWidth: 12, halign: 'center' },
        3: { cellWidth: 48 },
        4: { cellWidth: 'auto' },
      },
    });
    y = tableY(doc) + 4;
  }

  // ── Selected / Equipped Wargear ───────────────────────────────────────
  if (wbu.selectedWargear.length > 0) {
    y = guard(doc, y, 14);
    y = sectionHeader(doc, 'Equipped Upgrades', y);

    const upgRows = wbu.selectedWargear.map(sw => {
      const resolved = lookupItem(unitOption, sw.id);
      const kwStr = safe([
        ...(resolved.keywords ?? []),
        ...(sw.grantsKeywords?.map(k => `[GRANTS ${k}]`) ?? []),
      ].join(', '));
      const descStr = safe(resolved.description ?? '');
      const costStr = sw.costCurrency === 'glory' ? `${sw.cost} G` : `${sw.cost} Cr`;
      const qtyStr  = sw.quantity > 1 ? `x${sw.quantity}` : '';
      return [
        safe(`${sw.name}${qtyStr ? ' ' + qtyStr : ''}`),
        sw.type,
        kwStr,
        costStr,
        descStr,
      ];
    });

    autoTable(doc, {
      startY: y,
      margin: { left: ML, right: ML },
      tableWidth: CW,
      head: [['Name', 'Type', 'Keywords', 'Cost', 'Description']],
      body: upgRows,
      styles: { fontSize: 7.5, cellPadding: 1.8, overflow: 'linebreak' },
      headStyles: { fillColor: C_THBG, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: C_ALTROW },
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold' },
        1: { cellWidth: 16 },
        2: { cellWidth: 48 },
        3: { cellWidth: 14, halign: 'center' },
        4: { cellWidth: 'auto' },
      },
    });
    y = tableY(doc) + 4;
  }

  // ── Abilities ─────────────────────────────────────────────────────────
  // Include upgrade abilities in the list (prepend them so they appear first)
  const upgradeAbilitiesForPDF = (unitOption.upgrades ?? [] as UnitUpgrade[])
    .filter((upg: UnitUpgrade) => ((wbu.selectedUpgrades ?? {})[upg.id] ?? 0) > 0)
    .map((upg: UnitUpgrade) => ({
      id: `upgrade-${upg.id}`,
      name: `⬆ ${upg.name}`,
      description: upg.description,
      type: 'passive' as Ability['type'],
    }));
  const abilities = [...upgradeAbilitiesForPDF, ...(unitOption.abilities ?? []).filter(a => !a.id.startsWith('subtype-'))];
  if (abilities.length > 0) {
    y = guard(doc, y, 14);
    y = sectionHeader(doc, 'Abilities', y);

    const abilRows = abilities.map(ab => [abilityTypeLabel(ab.type), safe(ab.name), safe(ab.description)]);

    autoTable(doc, {
      startY: y,
      margin: { left: ML, right: ML },
      tableWidth: CW,
      head: [['Type', 'Ability', 'Rules']],
      body: abilRows,
      styles: { fontSize: 7.5, cellPadding: 1.8, overflow: 'linebreak' },
      headStyles: { fillColor: C_THBG, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: C_ALTROW },
      columnStyles: {
        0: { cellWidth: 18, fontStyle: 'bold', halign: 'center' },
        1: { cellWidth: 38, fontStyle: 'bold' },
        2: { cellWidth: 'auto' },
      },
      didParseCell: (data) => {
        // Colour-code Type badge using autoTable's own styling (never touches doc state)
        if (data.column.index === 0 && data.section === 'body') {
          const rawArr = Array.isArray(data.row.raw) ? data.row.raw : [];
          const raw = String(rawArr[0] ?? '');
          data.cell.styles.fillColor = raw === 'PASSIVE' ? [220, 240, 228] as RGB
            : raw === 'ACTION' ? [254, 226, 214] as RGB
            : [237, 225, 254] as RGB;
          data.cell.styles.textColor = raw === 'PASSIVE' ? C_PASSIVE
            : raw === 'ACTION' ? C_ACTION
            : C_AURA;
        }
      },
    });
    y = tableY(doc) + 4;
  }

  // ── Applied Upgrade Class ───────────────────────────────────────────────
  const appliedUpgs = Object.entries(wbu.selectedUpgrades ?? {})
    .filter(([, cnt]) => cnt > 0)
    .map(([uid]) => (unitOption.upgrades ?? [] as UnitUpgrade[]).find((u: UnitUpgrade) => u.id === uid))
    .filter((u): u is UnitUpgrade => !!u);
  if (appliedUpgs.length > 0) {
    y = guard(doc, y, 14);
    y = sectionHeader(doc, 'Applied Upgrade', y);
    const upgClassRows = appliedUpgs.map(upg => [
      safe(upg.name),
      safe(upg.grantedKeywords?.join(', ') ?? '—'),
      `+${upg.cost} Cr`,
      safe(upg.description),
    ]);
    autoTable(doc, {
      startY: y,
      margin: { left: ML, right: ML },
      tableWidth: CW,
      head: [['Upgrade', 'Grants Keywords', 'Cost', 'Rules']],
      body: upgClassRows,
      styles: { fontSize: 7.5, cellPadding: 1.8, overflow: 'linebreak' },
      headStyles: { fillColor: [90, 60, 10] as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: [252, 244, 220] as RGB },
      columnStyles: {
        0: { cellWidth: 28, fontStyle: 'bold', textColor: [180, 140, 20] as RGB },
        1: { cellWidth: 40 },
        2: { cellWidth: 14, halign: 'center' },
        3: { cellWidth: 'auto' },
      },
    });
    y = tableY(doc) + 4;
  }

  // ── Psychic Powers ─────────────────────────────────────────────────────
  const psychicPowers = wbu.selectedPsychicPowers ?? [];
  if (psychicPowers.length > 0) {
    y = guard(doc, y, 14);
    y = sectionHeader(doc, 'Psychic Powers', y);
    const psychicRows = psychicPowers.map(sp => {
      const full = lookupPsychicPower(sp.disciplineId, sp.id);
      const costStr = sp.costCurrency === 'glory' ? `${sp.cost} G` : `${sp.cost} Cr`;
      return [
        safe(sp.name),
        safe(sp.disciplineName),
        full ? `${full.powerType}  ${full.range}  ${full.timing}` : '—',
        costStr,
        full ? safe(full.description) : '—',
      ];
    });
    autoTable(doc, {
      startY: y,
      margin: { left: ML, right: ML },
      tableWidth: CW,
      head: [['Power', 'Discipline', 'Type / Range / Timing', 'Cost', 'Effect']],
      body: psychicRows,
      styles: { fontSize: 7.5, cellPadding: 1.8, overflow: 'linebreak' },
      headStyles: { fillColor: [50, 20, 90] as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: [240, 232, 252] as RGB },
      columnStyles: {
        0: { cellWidth: 28, fontStyle: 'bold', textColor: [160, 80, 200] as RGB },
        1: { cellWidth: 32 },
        2: { cellWidth: 42 },
        3: { cellWidth: 14, halign: 'center' },
        4: { cellWidth: 'auto' },
      },
    });
    y = tableY(doc) + 4;
  }

  // ── Mutations (Gifts of Chaos) ────────────────────────────────────
  const giftsOfChaos = wbu.selectedGiftsOfChaos ?? [];
  if (giftsOfChaos.length > 0) {
    y = guard(doc, y, 14);
    y = sectionHeader(doc, 'Mutations (Gifts of Chaos)', y);
    const giftRows = giftsOfChaos.map(g => {
      const full = GIFTS_OF_CHAOS.find(x => x.id === g.id);
      const costStr = g.costCurrency === 'glory' ? `${g.cost} G` : `${g.cost} Cr`;
      const statParts: string[] = [];
      if (full?.statModifiers?.movement)    statParts.push(`+${full.statModifiers.movement}" Mov`);
      if (full?.statModifiers?.rangedSkill) statParts.push(`+${full.statModifiers.rangedSkill} RS`);
      if (full?.statModifiers?.meleeSkill)  statParts.push(`+${full.statModifiers.meleeSkill} MS`);
      if (full?.statModifiers?.armourSave)  statParts.push(`${(full.statModifiers.armourSave ?? 0) >= 0 ? '+' : ''}${full.statModifiers.armourSave} AS`);
      const kwStr = (full?.grantedKeywords ?? []).join(', ');
      const effectParts: string[] = [];
      if (statParts.length) effectParts.push(statParts.join(', '));
      if (kwStr) effectParts.push(`Grants: ${kwStr}`);
      if (full?.description) effectParts.push(safe(full.description));
      return [
        safe(g.name),
        safe(g.diceResult),
        costStr,
        effectParts.join('  |  '),
      ];
    });
    autoTable(doc, {
      startY: y,
      margin: { left: ML, right: ML },
      tableWidth: CW,
      head: [['Mutation', 'D66', 'Cost', 'Effect']],
      body: giftRows,
      styles: { fontSize: 7.5, cellPadding: 1.8, overflow: 'linebreak' },
      headStyles: { fillColor: [80, 20, 20] as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: [252, 230, 230] as RGB },
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold', textColor: [180, 50, 50] as RGB },
        1: { cellWidth: 16, halign: 'center' },
        2: { cellWidth: 14, halign: 'center' },
        3: { cellWidth: 'auto' },
      },
    });
    y = tableY(doc) + 4;
  }

  // ── Elite Progression ──────────────────────────────────────────
  if (isEliteEligible(wbu)) {
    y = guard(doc, y, 14);
    y = sectionHeader(doc, 'Elite Progression', y);

    // XP / promoted banner
    const xpLabel = `XP: ${wbu.xp ?? 0}${wbu.isPromoted ? '   ●  Promoted to Elite' : ''}`;
    y = guard(doc, y, 8);
    rect(doc, ML, y, CW, 7, [240, 232, 252] as RGB);
    linerect(doc, ML, y, CW, 7, [150, 100, 200] as RGB);
    rect(doc, ML, y, 3, 7, C_ELITE);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    ink(doc, C_ELITE);
    doc.text(safe(xpLabel), ML + 6, y + 4.8);
    y += 9;

    // Campaign Skills
    if (wbu.campaignSkills && wbu.campaignSkills.length > 0) {
      y = guard(doc, y, 10);
      const skillRows = wbu.campaignSkills.map(s => [
        safe(s.name),
        safe(`${SKILL_TABLE_LABELS[s.table]} — roll ${s.roll}`),
        safe(s.description),
      ]);
      autoTable(doc, {
        startY: y,
        margin: { left: ML, right: ML },
        head: [['Skill', 'Table', 'Effect']],
        body: skillRows,
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 1.6, overflow: 'linebreak' },
        headStyles: { fillColor: [50, 20, 90] as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
        alternateRowStyles: { fillColor: [240, 232, 252] as RGB },
        columnStyles: {
          0: { cellWidth: 38, fontStyle: 'bold', textColor: C_ELITE },
          1: { cellWidth: 44 },
          2: { cellWidth: 'auto' },
        },
      });
      y = tableY(doc) + 4;
    }

    // Battle Scars
    if (wbu.battleScars && wbu.battleScars.length > 0) {
      y = guard(doc, y, 10);
      const scarRows = wbu.battleScars.map(s => [
        safe(s.name),
        safe(s.description),
      ]);
      autoTable(doc, {
        startY: y,
        margin: { left: ML, right: ML },
        head: [['Battle Scar', 'Effect']],
        body: scarRows,
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 1.6, overflow: 'linebreak' },
        headStyles: { fillColor: [90, 20, 20] as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
        alternateRowStyles: { fillColor: [252, 240, 240] as RGB },
        columnStyles: {
          0: { cellWidth: 44, fontStyle: 'bold', textColor: [180, 40, 40] as RGB },
          1: { cellWidth: 'auto' },
        },
      });
      y = tableY(doc) + 4;
    }

    // Traumas
    if (wbu.traumas && wbu.traumas.length > 0) {
      y = guard(doc, y, 10);
      const traumaRows = wbu.traumas.map(t => [
        safe(t.name),
        safe(t.description),
      ]);
      autoTable(doc, {
        startY: y,
        margin: { left: ML, right: ML },
        head: [['Trauma', 'Effect']],
        body: traumaRows,
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 1.6, overflow: 'linebreak' },
        headStyles: { fillColor: [60, 40, 10] as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
        alternateRowStyles: { fillColor: [252, 248, 232] as RGB },
        columnStyles: {
          0: { cellWidth: 44, fontStyle: 'bold', textColor: [140, 80, 20] as RGB },
          1: { cellWidth: 'auto' },
        },
      });
      y = tableY(doc) + 4;
    }
  }

  // ── Unit footer rule ──────────────────────────────────────────────────
  y = guard(doc, y, 4);
  doc.setLineWidth(0.2);
  stroke(doc, [200, 210, 220]);
  doc.line(ML, y, ML + CW, y);
  y += 6;

  return y;
}

// ── Draw a single mercenary card ──────────────────────────────────────────
const C_MERC: RGB = [100, 40, 10];
const C_MERC_LIGHT: RGB = [205, 127, 50];

function drawMercenaryCard(
  doc: jsPDF,
  wmName: string,
  wmCount: number,
  wmGlory: number,
  mercId: string,
  y: number
): number {
  const merc = ALL_MERCENARIES.find(m => m.id === mercId);

  y = guard(doc, y, 24);

  // ── Header bar ─────────────────────────────────────────────────────────
  const headerH = 9;
  rect(doc, ML, y, CW, headerH, C_MERC);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  ink(doc, C_WHITE);
  doc.text(safe(wmName), ML + 3, y + 6.2);

  // MERC badge
  const badgeW = 14;
  const badgeX = ML + CW - badgeW - 2;
  rect(doc, badgeX, y + 1.5, badgeW, 5.5, C_MERC_LIGHT);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  ink(doc, C_WHITE);
  doc.text('MERC', badgeX + badgeW / 2, y + 5.5, { align: 'center' });

  // Count × glory
  const countStr = `×${wmCount}  ${wmGlory * wmCount} Glory`;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  ink(doc, [235, 200, 160]);
  doc.text(countStr, badgeX - 3, y + 6.2, { align: 'right' });
  y += headerH + 1;

  if (!merc) {
    // No detail data — simple note
    y = guard(doc, y, 7);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    ink(doc, C_MUTED);
    doc.text('(No detail data available)', ML + 3, y + 4.5);
    y += 8;
  } else {
    // ── Stats row ─────────────────────────────────────────────────────────
    if (merc.stats) {
      y = guard(doc, y, 14);
      const statH = 12;
      const statList = [
        { label: 'MOVEMENT', value: merc.stats.movement },
        { label: 'RANGED',   value: merc.stats.ranged },
        { label: 'MELEE',    value: merc.stats.melee },
        { label: 'ARMOUR',   value: merc.stats.armour },
        { label: 'BASE',     value: merc.stats.base },
        ...(wmCount > 1 ? [{ label: 'COUNT', value: `x${wmCount}` }] : []),
      ];
      const statW = Math.floor(CW / statList.length);
      statList.forEach((s, i) => {
        const lastW = i === statList.length - 1 ? CW - statW * (statList.length - 1) : statW;
        drawStatCell(doc, s.label, s.value, ML + i * statW, y, lastW, statH);
      });
      y += statH + 2;
    }

    // ── Keywords ─────────────────────────────────────────────────────────
    if (merc.keywords?.length) {
      y = guard(doc, y, 8);
      const kwText = safe(merc.keywords.join('  |  '));
      const kwLines: string[] = doc.splitTextToSize(kwText, CW - 6) as string[];
      const kwH = Math.max(8, kwLines.length * 4.5 + 3);
      rect(doc, ML, y, CW, kwH, [220, 228, 240]);
      linerect(doc, ML, y, CW, kwH, [155, 175, 200]);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      ink(doc, C_MUTED);
      kwLines.forEach((line, i) => doc.text(line, ML + 2.5, y + 5 + i * 4.5));
      y += kwH + 3;
    }

    // ── Battlekit ─────────────────────────────────────────────────────────
    if (merc.weapons?.length) {
      y = guard(doc, y, 14);
      y = sectionHeader(doc, 'Battlekit', y);
      const kitRows = merc.weapons.map(w => [safe(w.name), safe(w.profile)]);
      autoTable(doc, {
        startY: y,
        margin: { left: ML, right: ML },
        tableWidth: CW,
        head: [['Name', 'Profile / Rules']],
        body: kitRows,
        styles: { fontSize: 7.5, cellPadding: 1.8, overflow: 'linebreak' },
        headStyles: { fillColor: C_MERC as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
        alternateRowStyles: { fillColor: C_ALTROW },
        columnStyles: {
          0: { cellWidth: 42, fontStyle: 'bold' },
          1: { cellWidth: 'auto' },
        },
      });
      y = tableY(doc) + 4;
    }

    // ── Abilities ─────────────────────────────────────────────────────────
    if (merc.abilities?.length) {
      y = guard(doc, y, 14);
      y = sectionHeader(doc, 'Abilities', y);
      const abilRows = merc.abilities.map(ab => [safe(ab.name), safe(ab.description)]);
      autoTable(doc, {
        startY: y,
        margin: { left: ML, right: ML },
        tableWidth: CW,
        head: [['Ability', 'Rules']],
        body: abilRows,
        styles: { fontSize: 7.5, cellPadding: 1.8, overflow: 'linebreak' },
        headStyles: { fillColor: C_MERC as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
        alternateRowStyles: { fillColor: [252, 244, 230] as RGB },
        columnStyles: {
          0: { cellWidth: 40, fontStyle: 'bold', textColor: C_MERC_LIGHT as RGB },
          1: { cellWidth: 'auto' },
        },
      });
      y = tableY(doc) + 4;
    }

    // ── Psychic Powers ─────────────────────────────────────────────────────
    if (merc.psychicPowers?.length) {
      y = guard(doc, y, 14);
      y = sectionHeader(doc, 'Psychic Powers', y);
      const psyRows = merc.psychicPowers.map(p => [safe(p.name), safe(p.description)]);
      autoTable(doc, {
        startY: y,
        margin: { left: ML, right: ML },
        tableWidth: CW,
        head: [['Power', 'Rules']],
        body: psyRows,
        styles: { fontSize: 7.5, cellPadding: 1.8, overflow: 'linebreak' },
        headStyles: { fillColor: [50, 20, 90] as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
        alternateRowStyles: { fillColor: [240, 232, 252] as RGB },
        columnStyles: {
          0: { cellWidth: 40, fontStyle: 'bold', textColor: [160, 80, 200] as RGB },
          1: { cellWidth: 'auto' },
        },
      });
      y = tableY(doc) + 4;
    }
  }

  // ── Footer rule ────────────────────────────────────────────────────────
  y = guard(doc, y, 4);
  doc.setLineWidth(0.2);
  stroke(doc, [200, 180, 150]);
  doc.line(ML, y, ML + CW, y);
  y += 6;

  return y;
}

// ── Main export entry point ───────────────────────────────────────────────
export async function exportWarbandToPDF(warband: Warband): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Resolve faction units map for quick lookup
  const factionUnits = getFactionById(warband.faction)?.units ?? [];
  const unitMap = new Map<string, UnitOption>(factionUnits.map(u => [u.id, u]));

  // Draw cover + summary
  let y = drawCover(doc, warband);

  // ── Patron Details section ────────────────────────────────────────────
  const patronFull = warband.patron ? getPatronById(warband.patron, warband.faction) : undefined;
  if (patronFull) {
    y = guard(doc, y, 20);
    // Section header
    rect(doc, ML, y, CW, 7, C_AMBER);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    ink(doc, C_WHITE);
    doc.text(safe('  PATRON: ' + patronFull.name.toUpperCase()), ML + 2, y + 5);
    y += 9;

    // Patron description
    y = guard(doc, y, 10);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    ink(doc, C_MUTED);
    const patronDescLines = doc.splitTextToSize(safe(patronFull.description), CW - 2);
    doc.text(patronDescLines, ML + 1, y + 4);
    y += patronDescLines.length * 4 + 5;

    // Abilities table
    const visibleAbilities = filterAbilitiesForSubfaction(patronFull.abilities, warband.subfactionName);
    if (visibleAbilities.length > 0) {
      y = guard(doc, y, 10);
      autoTable(doc, {
        startY: y,
        margin: { left: ML, right: ML },
        tableWidth: CW,
        head: [['Patron Ability', 'Condition', 'Effect']],
        body: visibleAbilities.map(a => [
          safe(a.name),
          a.condition ? safe(a.condition) : '',
          safe(a.description),
        ]),
        styles: { fontSize: 7.5, cellPadding: 2.2, overflow: 'linebreak' },
        headStyles: { fillColor: [102, 50, 8] as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
        alternateRowStyles: { fillColor: C_ALTROW as RGB },
        columnStyles: {
          0: { cellWidth: 42, fontStyle: 'bold', textColor: [200, 130, 30] as RGB },
          1: { cellWidth: 28, fontStyle: 'italic', textColor: C_MUTED as RGB },
          2: { cellWidth: 'auto' },
        },
      });
      y = tableY(doc) + 6;
    }
  }

  // ── Faction Special Rules section ──────────────────────────────────
  const factionRulesData = getFactionRules(warband.faction);
  if (factionRulesData && factionRulesData.rules.length > 0) {
    y = guard(doc, y, 20);
    const C_FACTION_BLUE: RGB = [22, 70, 140];
    rect(doc, ML, y, CW, 7, C_FACTION_BLUE);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    ink(doc, C_WHITE);
    doc.text(safe('  ' + factionRulesData.title.toUpperCase()), ML + 2, y + 5);
    y += 9;

    // Parse each rule: split on **Rule Name.** Description
    const ruleRows: [string, string][] = factionRulesData.rules.map(rule => {
      const m = rule.match(/^\*\*(.*?)\*\*\s*(.*)$/s);
      return m ? [safe(m[1]), safe(m[2])] : ['', safe(rule)];
    });

    y = guard(doc, y, 10);
    autoTable(doc, {
      startY: y,
      margin: { left: ML, right: ML },
      tableWidth: CW,
      body: ruleRows,
      styles: { fontSize: 7.5, cellPadding: 2.2, overflow: 'linebreak' },
      alternateRowStyles: { fillColor: C_ALTROW as RGB },
      columnStyles: {
        0: { cellWidth: 48, fontStyle: 'bold', textColor: [100, 160, 230] as RGB },
        1: { cellWidth: 'auto' },
      },
      theme: 'plain',
    });
    y = tableY(doc) + 6;
  }

  // ── Subfaction / Faction Rules section ───────────────────────────────
  if (warband.subfaction && warband.subfaction !== 'no_variant') {
    const sfData = getSubFactionById(warband.faction, warband.subfaction);
    if (sfData && sfData.rules.length > 0) {
      y = guard(doc, y, 20);
      // Section header
      rect(doc, ML, y, CW, 7, C_SECTION);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      ink(doc, C_WHITE);
      doc.text(safe('  FACTION RULES: ' + sfData.name.toUpperCase()), ML + 2, y + 5);
      y += 9;

      // Subfaction description
      if (sfData.description) {
        y = guard(doc, y, 8);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        ink(doc, C_MUTED);
        const sfDescLines = doc.splitTextToSize(safe(sfData.description), CW - 2);
        doc.text(sfDescLines, ML + 1, y + 4);
        y += sfDescLines.length * 4 + 5;
      }

      // Rules as numbered table
      y = guard(doc, y, 10);
      autoTable(doc, {
        startY: y,
        margin: { left: ML, right: ML },
        tableWidth: CW,
        body: sfData.rules.map((r, i) => [safe(String(i + 1) + '.'), safe(r)]),
        styles: { fontSize: 7.5, cellPadding: 2.2, overflow: 'linebreak' },
        alternateRowStyles: { fillColor: C_ALTROW as RGB },
        columnStyles: {
          0: { cellWidth: 8, fontStyle: 'bold', textColor: C_TEAL as RGB },
          1: { cellWidth: 'auto' },
        },
        theme: 'plain',
      });
      y = tableY(doc) + 6;
    }
  }

  // Group by elite first, then troop
  const sortedUnits = [...warband.units].sort((a, b) => {
    if (a.unitType === b.unitType) return 0;
    return a.unitType === 'elite' ? -1 : 1;
  });

  let lastType: string | null = null;

  for (const wbu of sortedUnits) {
    const unitOption = unitMap.get(wbu.unitId);
    if (!unitOption) continue;

    // Category divider (ELITES / TROOPS)
    if (wbu.unitType !== lastType) {
      y = guard(doc, y, 12);
      const catLabel = wbu.unitType === 'elite' ? '  ELITES' : '  TROOPS';
      const catColor: RGB = wbu.unitType === 'elite' ? C_ELITE : C_TROOP;
      rect(doc, ML, y, CW, 7, catColor);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      ink(doc, C_WHITE);
      doc.text(catLabel, ML + 2, y + 5);
      y += 9;
      lastType = wbu.unitType;
    }

    y = drawUnitCard(doc, wbu, unitOption, y);
  }

  // ── Mercenaries section ───────────────────────────────────────────────
  const hiredMercs = warband.mercenaries ?? [];
  if (hiredMercs.length > 0) {
    y = guard(doc, y, 16);
    // Category divider bar
    rect(doc, ML, y, CW, 7, C_MERC);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    ink(doc, C_WHITE);
    doc.text('  MERCENARIES', ML + 2, y + 5);
    y += 9;

    for (const wm of hiredMercs) {
      y = drawMercenaryCard(doc, wm.name, wm.count, wm.gloryCost, wm.mercenaryId, y);
    }
  }
  // ── Rules Reference appendix ─────────────────────────────────────
  const allKw: string[] = [];
  warband.units.forEach(u => allKw.push(...u.keywords));
  const rulesEntries = expandKeywords(allKw);
  if (rulesEntries.length > 0) {
    y = guard(doc, y, 16);
    rect(doc, ML, y, CW, 7, C_NAVY);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    ink(doc, C_TEAL);
    doc.text('  RULES REFERENCE', ML + 2, y + 5);
    y += 9;

    autoTable(doc, {
      startY: y,
      margin: { left: ML, right: ML },
      tableWidth: CW,
      head: [['Keyword', 'Effect']],
      body: rulesEntries.map(({ keyword, description }) => [safe(keyword), safe(description)]),
      styles: { fontSize: 7.5, cellPadding: 2, overflow: 'linebreak' },
      headStyles: { fillColor: C_THBG as RGB, textColor: C_WHITE, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: C_ALTROW as RGB },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold', textColor: [224, 160, 48] as RGB },
        1: { cellWidth: 'auto' },
      },
    });
    y = tableY(doc) + 4;
  }
  // ── Footer on every page ──────────────────────────────────────────────
  const totalPages = (doc as jsPDF & { getNumberOfPages: () => number }).getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    ink(doc, C_MUTED);
    doc.text(
      `Trench Hammer Army Builder  -  ${safe(warband.name)}  (${safe(getFactionById(warband.faction)?.name ?? warband.faction)})`,
      ML,
      PH - 6
    );
    txtr(doc, `Page ${p} / ${totalPages}`, ML + CW, PH - 6, 7, C_MUTED);
  }

  // ── Save ──────────────────────────────────────────────────────────────
  const safeName = warband.name.replace(/[^a-z0-9_\-]/gi, '_') || 'warband';
  const fileName = `${safeName}-roster.pdf`;

  if (Capacitor.isNativePlatform()) {
    // On Android/iOS: write to Documents via Filesystem then open share sheet
    try {
      const base64 = doc.output('datauristring').split(',')[1];
      await Filesystem.writeFile({
        path: fileName,
        data: base64,
        directory: Directory.Cache,
      });
      const fileResult = await Filesystem.getUri({
        path: fileName,
        directory: Directory.Cache,
      });
      await Share.share({
        title: `${warband.name} Roster`,
        text: `Trench Hammer roster for ${warband.name}`,
        url: fileResult.uri,
        dialogTitle: 'Open or share PDF roster',
      });
    } catch (err) {
      console.error('PDF save error:', err);
      // Fallback: open as data URI
      const dataUri = doc.output('datauristring');
      window.open(dataUri, '_blank');
    }
  } else {
    doc.save(fileName);
  }
}
