/**
 * Tests for exportWarbandAsText – specifically verifying the Rules Reference
 * section that was moved here from the UI modals.
 */
import { exportWarbandAsText, exportWarbandAsJSON } from '../utils/export.js';
import type { Warband, WarbandUnit, CampaignSkill, BattleScar, EliteTrauma } from '../types/index.js';
import { makeCampaignSkill, BATTLE_SCARS, ELITE_TRAUMAS, SKILL_TABLE_LABELS } from '../data/campaignProgression.js';

// ── Minimal factory helpers ───────────────────────────────────────────────────

function makeUnit(overrides: Partial<WarbandUnit> = {}): WarbandUnit {
  return {
    id: 'u1',
    unitId: 'unit-1',
    name: 'Test Trooper',
    count: 1,
    baseCostPerModel: 50,
    costCurrency: 'credits',
    selectedWargear: [],
    totalCost: 50,
    totalGloryCost: 0,
    keywords: [],
    unitType: 'troop',
    ...overrides,
  };
}

function makeWarband(units: WarbandUnit[], overrides: Partial<Warband> = {}): Warband {
  return {
    id: 'wb-test',
    name: 'Test Warband',
    faction: 'test_faction',
    units,
    pointLimit: 500,
    gloryLimit: 0,
    mercenaries: [],
    totalPoints: units.reduce((s, u) => s + u.totalCost, 0),
    totalGlory: units.reduce((s, u) => s + u.totalGloryCost, 0),
    totalModels: units.reduce((s, u) => s + u.count, 0),
    ...overrides,
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('exportWarbandAsText – structure', () => {
  it('always includes the header banner', () => {
    const wb = makeWarband([makeUnit()]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('TRENCH HAMMER WARBAND ROSTER');
  });

  it('includes warband name and faction', () => {
    const wb = makeWarband([makeUnit()], { name: 'Iron Rats', faction: 'astra_militarum' });
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('Warband Name: Iron Rats');
    expect(out).toContain('Faction: astra_militarum');
  });

  it('includes unit name and count', () => {
    const wb = makeWarband([makeUnit({ name: 'Veteran Sergeant', count: 3 })]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('Veteran Sergeant');
    expect(out).toContain('Count: 3 model(s)');
  });

  it('lists selected wargear with cost', () => {
    const unit = makeUnit({
      selectedWargear: [{
        id: 'sword',
        name: 'Power Sword',
        cost: 15,
        costCurrency: 'credits',
        type: 'weapon',
        quantity: 1,
      }],
    });
    const out = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).toContain('Power Sword (15 Credits each)');
  });

  it('shows glory currency correctly', () => {
    const unit = makeUnit({
      costCurrency: 'glory',
      totalCost: 0,
      totalGloryCost: 2,
      selectedWargear: [{
        id: 'relic',
        name: 'Sacred Relic',
        cost: 1,
        costCurrency: 'glory',
        type: 'equipment',
        quantity: 1,
      }],
    });
    const out = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).toContain('Sacred Relic (1 Glory each)');
    expect(out).toContain('2 Glory');
  });

  it('always appends totals section', () => {
    const wb = makeWarband([makeUnit({ totalCost: 75 })]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('TOTAL CREDITS: 75 / 500');
    expect(out).toContain('TOTAL MODELS: 1');
  });

  it('totals line appears after units section even with NO glossary keywords', () => {
    const wb = makeWarband([makeUnit({ keywords: ['UNKNOWN_KW_THAT_IS_NOT_IN_GLOSSARY'] })]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('TOTAL CREDITS');
    expect(out).not.toContain('RULES REFERENCE');
  });
});

describe('exportWarbandAsText – RULES REFERENCE section', () => {
  it('is ABSENT when unit has no keywords', () => {
    const wb = makeWarband([makeUnit({ keywords: [] })]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).not.toContain('RULES REFERENCE');
  });

  it('is ABSENT when all keywords are unknown (not in glossary)', () => {
    const wb = makeWarband([makeUnit({ keywords: ['IMPERIUM', 'FACTION_TAG'] })]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).not.toContain('RULES REFERENCE');
  });

  it('is PRESENT when at least one keyword is in the glossary', () => {
    // CRITICAL is a real glossary keyword
    const wb = makeWarband([makeUnit({ keywords: ['CRITICAL'] })]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('RULES REFERENCE');
  });

  it('contains the keyword name and description when matching glossary entry', () => {
    const wb = makeWarband([makeUnit({ keywords: ['CRITICAL'] })]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('CRITICAL');
    // The description should be a non-empty string indented with 2 spaces
    const lines = out.split('\n');
    const kvIdx = lines.findIndex(l => l === 'CRITICAL');
    expect(kvIdx).toBeGreaterThan(-1);
    expect(lines[kvIdx + 1]).toMatch(/^  .+/);
  });

  it('deduplicates keywords across multiple units', () => {
    const unit1 = makeUnit({ id: 'u1', keywords: ['CRITICAL'] });
    const unit2 = makeUnit({ id: 'u2', keywords: ['CRITICAL'] });
    const wb = makeWarband([unit1, unit2]);
    const out = exportWarbandAsText(wb, 500);
    // CRITICAL should appear exactly once in the Rules Reference section
    const rulesSection = out.slice(out.indexOf('RULES REFERENCE'), out.indexOf('TOTAL CREDITS'));
    const matches = rulesSection.split('\n').filter(l => l === 'CRITICAL');
    expect(matches.length).toBe(1);
  });

  it('collects keywords from ALL units in warband', () => {
    const unit1 = makeUnit({ id: 'u1', keywords: ['CRITICAL'] });
    const unit2 = makeUnit({ id: 'u2', keywords: ['ASSAULT'] });
    const wb = makeWarband([unit1, unit2]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('CRITICAL');
    expect(out).toContain('ASSAULT');
  });

  it('section appears BEFORE the summary totals', () => {
    const wb = makeWarband([makeUnit({ keywords: ['CRITICAL'] })]);
    const out = exportWarbandAsText(wb, 500);
    const rulesIdx  = out.indexOf('RULES REFERENCE');
    const totalsIdx = out.indexOf('TOTAL CREDITS');
    expect(rulesIdx).toBeLessThan(totalsIdx);
  });

  it('mixing known and unknown keywords only references known ones', () => {
    const wb = makeWarband([makeUnit({ keywords: ['CRITICAL', 'FACTION_TAG', 'ASSAULT'] })]);
    const out = exportWarbandAsText(wb, 500);
    // Scope check to within the Rules Reference section only (the keyword also
    // appears in the unit's Keywords: line, which is expected)
    const rulesSection = out.slice(out.indexOf('RULES REFERENCE'), out.indexOf('TOTAL CREDITS'));
    expect(rulesSection).toContain('CRITICAL');
    expect(rulesSection).toContain('ASSAULT');
    expect(rulesSection).not.toContain('FACTION_TAG');
  });

  it('respects glory limit output when gloryLimit > 0', () => {
    const unit = makeUnit({ costCurrency: 'glory', totalCost: 0, totalGloryCost: 3 });
    const wb = makeWarband([unit], { gloryLimit: 10 });
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('TOTAL GLORY:   3 / 10');
  });

  it('shows untracked when gloryLimit is 0 but glory is spent', () => {
    const unit = makeUnit({ costCurrency: 'glory', totalCost: 0, totalGloryCost: 2 });
    const wb = makeWarband([unit], { gloryLimit: 0 });
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('(untracked)');
  });

  it('handles parameterised keywords like AUTOMATIC 2', () => {
    const wb = makeWarband([makeUnit({ keywords: ['AUTOMATIC 2'] })]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('AUTOMATIC 2');
  });

  it('handles mixed-case lookup by normalising to uppercase', () => {
    // exportWarbandAsText gets keywords already from WarbandUnit.keywords (stored uppercase),
    // but expandKeywords also normalises — verify via a lowercase variant just in case
    const wb = makeWarband([makeUnit({ keywords: ['critical'] })]);
    const out = exportWarbandAsText(wb, 500);
    // expandKeywords normalises, so CRITICAL should still appear
    expect(out).toContain('RULES REFERENCE');
  });
});

describe('exportWarbandAsText – empty warband edge case', () => {
  it('handles zero units gracefully', () => {
    const wb = makeWarband([]);
    const out = exportWarbandAsText(wb, 500);
    expect(out).toContain('TRENCH HAMMER WARBAND ROSTER');
    expect(out).toContain('TOTAL CREDITS: 0 / 500');
    expect(out).not.toContain('RULES REFERENCE');
  });
});

// ============================================================================
// Elite Progression fields in text export
// ============================================================================

describe('exportWarbandAsText – elite progression section', () => {
  it('shows [ELITE PROGRESSION] block for elite units', () => {
    const unit = makeUnit({ unitType: 'elite', xp: 3 });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).toContain('[ELITE PROGRESSION]');
    expect(out).toContain('XP: 3');
  });

  it('shows [ELITE PROGRESSION] block for promoted troops', () => {
    const unit = makeUnit({ unitType: 'troop', isPromoted: true, xp: 1 });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).toContain('[ELITE PROGRESSION]');
    expect(out).toContain('XP: 1');
  });

  it('shows "Promoted to Elite" status line for promoted troops', () => {
    const unit = makeUnit({ unitType: 'troop', isPromoted: true });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).toContain('Status: Promoted to Elite');
  });

  it('does NOT show "Promoted" status for native elites', () => {
    const unit = makeUnit({ unitType: 'elite' });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).not.toContain('Status: Promoted to Elite');
  });

  it('defaults XP to 0 when xp field is absent', () => {
    const unit = makeUnit({ unitType: 'elite' });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).toContain('XP: 0');
  });

  it('does NOT show progression block for non-elite non-promoted troops', () => {
    const unit = makeUnit({ unitType: 'troop' });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).not.toContain('[ELITE PROGRESSION]');
    expect(out).not.toContain('XP:');
  });

  it('lists campaign skills with table label and roll', () => {
    const skill: CampaignSkill = makeCampaignSkill('melee', 7);
    const unit = makeUnit({ unitType: 'elite', campaignSkills: [skill] });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).toContain('Campaign Skills:');
    expect(out).toContain(skill.name);
    expect(out).toContain(SKILL_TABLE_LABELS['melee']);
    expect(out).toContain('roll 7');
  });

  it('lists battle scars by name', () => {
    const scar: BattleScar = BATTLE_SCARS[3]; // 'Leg Wound'
    const unit = makeUnit({ unitType: 'elite', battleScars: [scar] });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).toContain('Battle Scars:');
    expect(out).toContain(scar.name);
  });

  it('lists traumas by name', () => {
    const trauma: EliteTrauma = ELITE_TRAUMAS[0]; // 'Shell Shock'
    const unit = makeUnit({ unitType: 'elite', traumas: [trauma] });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).toContain('Traumas:');
    expect(out).toContain(trauma.name);
  });

  it('does not show Campaign Skills header when list is empty', () => {
    const unit = makeUnit({ unitType: 'elite', campaignSkills: [] });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).not.toContain('Campaign Skills:');
  });

  it('does not show Battle Scars header when list is empty', () => {
    const unit = makeUnit({ unitType: 'elite', battleScars: [] });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).not.toContain('Battle Scars:');
  });

  it('does not show Traumas header when list is empty', () => {
    const unit = makeUnit({ unitType: 'elite', traumas: [] });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).not.toContain('Traumas:');
  });

  it('multiple campaign skills all appear in output', () => {
    const skills: CampaignSkill[] = [
      makeCampaignSkill('melee', 7),
      makeCampaignSkill('ranged', 9),
    ];
    const unit = makeUnit({ unitType: 'elite', campaignSkills: skills });
    const out  = exportWarbandAsText(makeWarband([unit]), 500);
    expect(out).toContain(skills[0].name);
    expect(out).toContain(skills[1].name);
  });
});

// ============================================================================
// JSON export round-trip for elite progression fields
// ============================================================================

describe('exportWarbandAsJSON – elite progression round-trip', () => {
  it('serialises and preserves xp', () => {
    const unit = makeUnit({ unitType: 'elite', xp: 7 });
    const json = exportWarbandAsJSON(makeWarband([unit]));
    const parsed = JSON.parse(json);
    expect(parsed.units[0].xp).toBe(7);
  });

  it('serialises and preserves isPromoted', () => {
    const unit = makeUnit({ unitType: 'troop', isPromoted: true });
    const json = exportWarbandAsJSON(makeWarband([unit]));
    const parsed = JSON.parse(json);
    expect(parsed.units[0].isPromoted).toBe(true);
  });

  it('serialises and preserves campaignSkills', () => {
    const skill: CampaignSkill = makeCampaignSkill('stealth', 8);
    const unit = makeUnit({ unitType: 'elite', campaignSkills: [skill] });
    const json = exportWarbandAsJSON(makeWarband([unit]));
    const parsed = JSON.parse(json);
    expect(parsed.units[0].campaignSkills).toHaveLength(1);
    expect(parsed.units[0].campaignSkills[0].name).toBe(skill.name);
    expect(parsed.units[0].campaignSkills[0].table).toBe('stealth');
    expect(parsed.units[0].campaignSkills[0].roll).toBe(8);
  });

  it('serialises and preserves battleScars', () => {
    const scar: BattleScar = BATTLE_SCARS[1]; // 'Head Wound'
    const unit = makeUnit({ unitType: 'elite', battleScars: [scar] });
    const json = exportWarbandAsJSON(makeWarband([unit]));
    const parsed = JSON.parse(json);
    expect(parsed.units[0].battleScars).toHaveLength(1);
    expect(parsed.units[0].battleScars[0].id).toBe(scar.id);
    expect(parsed.units[0].battleScars[0].name).toBe(scar.name);
  });

  it('serialises and preserves traumas', () => {
    const trauma: EliteTrauma = ELITE_TRAUMAS[2]; // 'Flashbacks'
    const unit = makeUnit({ unitType: 'elite', traumas: [trauma] });
    const json = exportWarbandAsJSON(makeWarband([unit]));
    const parsed = JSON.parse(json);
    expect(parsed.units[0].traumas).toHaveLength(1);
    expect(parsed.units[0].traumas[0].id).toBe(trauma.id);
    expect(parsed.units[0].traumas[0].name).toBe(trauma.name);
  });

  it('omits undefined progression fields when unit has none', () => {
    const unit = makeUnit({ unitType: 'troop' });
    const json = exportWarbandAsJSON(makeWarband([unit]));
    const parsed = JSON.parse(json);
    // Fields should be absent (undefined serialises to omitted in JSON)
    expect(parsed.units[0].xp).toBeUndefined();
    expect(parsed.units[0].isPromoted).toBeUndefined();
    expect(parsed.units[0].campaignSkills).toBeUndefined();
    expect(parsed.units[0].battleScars).toBeUndefined();
    expect(parsed.units[0].traumas).toBeUndefined();
  });
});
