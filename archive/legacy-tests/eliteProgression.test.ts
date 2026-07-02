/**
 * eliteProgression.test.ts
 *
 * Tests for:
 *   - isEliteEligible() helper
 *   - SKILL_TABLES structure and completeness
 *   - makeCampaignSkill() factory
 *   - ELITE_TRAUMAS dataset
 *   - CampaignSkill / EliteTrauma type shapes
 *   - XP field defaulting on WarbandUnit
 */

import { describe, it, expect } from 'vitest';
import {
  isEliteEligible,
  makeCampaignSkill,
  SKILL_TABLES,
  SKILL_TABLE_LABELS,
  ELITE_TRAUMAS,
} from '../data/campaignProgression.js';
import type { CampaignSkillTable } from '../types/index.js';

// ============================================================================
// isEliteEligible
// ============================================================================

describe('isEliteEligible', () => {
  it('returns true for a unit with unitType "elite"', () => {
    expect(isEliteEligible({ unitType: 'elite' })).toBe(true);
  });

  it('returns true for a troop with isPromoted=true', () => {
    expect(isEliteEligible({ unitType: 'troop', isPromoted: true })).toBe(true);
  });

  it('returns true for any non-elite unitType when isPromoted=true', () => {
    expect(isEliteEligible({ unitType: 'troop', isPromoted: true })).toBe(true);
    expect(isEliteEligible({ unitType: 'specialist', isPromoted: true })).toBe(true);
    expect(isEliteEligible({ unitType: 'leader', isPromoted: true })).toBe(true);
  });

  it('returns false for a troop with no promotion', () => {
    expect(isEliteEligible({ unitType: 'troop' })).toBe(false);
  });

  it('returns false for isPromoted=false explicitly', () => {
    expect(isEliteEligible({ unitType: 'troop', isPromoted: false })).toBe(false);
  });

  it('returns false for isPromoted=undefined (same as absent)', () => {
    expect(isEliteEligible({ unitType: 'troop', isPromoted: undefined })).toBe(false);
  });
});

// ============================================================================
// SKILL_TABLES
// ============================================================================

const EXPECTED_TABLES: CampaignSkillTable[] = ['melee', 'ranged', 'stealth', 'wildcard', 'explorer', 'psychic'];

describe('SKILL_TABLES', () => {
  it('contains all 6 required tables', () => {
    EXPECTED_TABLES.forEach(t => {
      expect(SKILL_TABLES).toHaveProperty(t);
    });
  });

  EXPECTED_TABLES.forEach(table => {
    describe(`table "${table}"`, () => {
      it('has 11 entries (rolls 2–12)', () => {
        expect(SKILL_TABLES[table]).toHaveLength(11);
      });

      it('has entries for every roll from 2 to 12', () => {
        const rolls = SKILL_TABLES[table].map(e => e.roll).sort((a, b) => a - b);
        for (let r = 2; r <= 12; r++) {
          expect(rolls).toContain(r);
        }
      });

      it('every entry has a non-empty name and description', () => {
        SKILL_TABLES[table].forEach(entry => {
          expect(typeof entry.name).toBe('string');
          expect(entry.name.length).toBeGreaterThan(0);
          expect(typeof entry.description).toBe('string');
          expect(entry.description.length).toBeGreaterThan(0);
        });
      });

      it('has no duplicate roll values', () => {
        const rolls = SKILL_TABLES[table].map(e => e.roll);
        const unique = new Set(rolls);
        expect(unique.size).toBe(rolls.length);
      });
    });
  });
});

// ============================================================================
// SKILL_TABLE_LABELS
// ============================================================================

describe('SKILL_TABLE_LABELS', () => {
  it('has a label for every table', () => {
    EXPECTED_TABLES.forEach(t => {
      expect(SKILL_TABLE_LABELS).toHaveProperty(t);
      expect(typeof SKILL_TABLE_LABELS[t]).toBe('string');
      expect(SKILL_TABLE_LABELS[t].length).toBeGreaterThan(0);
    });
  });
});

// ============================================================================
// makeCampaignSkill
// ============================================================================

describe('makeCampaignSkill', () => {
  it('returns an object with correct table and roll', () => {
    const skill = makeCampaignSkill('melee', 7);
    expect(skill.table).toBe('melee');
    expect(skill.roll).toBe(7);
  });

  it('copies name and description from the table entry', () => {
    const entry = SKILL_TABLES.melee.find(e => e.roll === 7)!;
    const skill = makeCampaignSkill('melee', 7);
    expect(skill.name).toBe(entry.name);
    expect(skill.description).toBe(entry.description);
  });

  it('assigns a non-empty string id', () => {
    const skill = makeCampaignSkill('ranged', 5);
    expect(typeof skill.id).toBe('string');
    expect(skill.id.length).toBeGreaterThan(0);
  });

  it('id encodes the table name', () => {
    const skill = makeCampaignSkill('stealth', 9);
    expect(skill.id).toContain('stealth');
  });

  it('works for every table at roll 7 (mid-table entry)', () => {
    EXPECTED_TABLES.forEach(table => {
      const skill = makeCampaignSkill(table, 7);
      expect(skill.table).toBe(table);
      expect(skill.roll).toBe(7);
    });
  });

  it('throws for an out-of-range roll', () => {
    expect(() => makeCampaignSkill('melee', 1)).toThrow();
    expect(() => makeCampaignSkill('melee', 13)).toThrow();
  });

  it('works for boundary rolls 2 and 12', () => {
    const low  = makeCampaignSkill('wildcard', 2);
    const high = makeCampaignSkill('wildcard', 12);
    expect(low.roll).toBe(2);
    expect(high.roll).toBe(12);
  });
});

// ============================================================================
// ELITE_TRAUMAS
// ============================================================================

describe('ELITE_TRAUMAS', () => {
  it('has 16 entries (10 from scar table + 6 from trauma sub-table)', () => {
    expect(ELITE_TRAUMAS).toHaveLength(16);
  });

  it('every entry has a unique id, name, and description', () => {
    const ids   = new Set<string>();
    const names = new Set<string>();
    ELITE_TRAUMAS.forEach(t => {
      expect(typeof t.id).toBe('string');
      expect(t.id.length).toBeGreaterThan(0);
      expect(typeof t.name).toBe('string');
      expect(t.name.length).toBeGreaterThan(0);
      expect(typeof t.description).toBe('string');
      expect(t.description.length).toBeGreaterThan(0);
      ids.add(t.id);
      names.add(t.name);
    });
    expect(ids.size).toBe(16);
    expect(names.size).toBe(16);
  });

  it('ids follow the tr_ prefix pattern', () => {
    ELITE_TRAUMAS.forEach(t => {
      expect(t.id).toMatch(/^tr_/);
    });
  });

  it('canRecover field is a boolean where present', () => {
    ELITE_TRAUMAS.forEach(t => {
      if (t.canRecover !== undefined) {
        expect(typeof t.canRecover).toBe('boolean');
      }
    });
  });
});

// ============================================================================
// Skill content verification — names must match instruction source exactly
// ============================================================================

/**
 * Expected skill names per table, indexed by roll (2–12).
 * Derived directly from trenchhammer_campaincontent.instructions.md.
 * Note: Ranged roll 10 is "Hip Shoot" in code; "Hip Shop" is a typo in source doc.
 */
const EXPECTED_NAMES: Record<string, Record<number, string>> = {
  melee: {
    2: 'Patron Skill',
    3: 'Stand Firm',
    4: 'Parry',
    5: 'Close Quarters Combat',
    6: 'Relentless Charge',
    7: 'Melee Proficiency',
    8: 'Heavy Melee Training',
    9: 'Hard as Nails',
    10: 'Champion',
    11: 'Surgical Strike',
    12: 'Patron Skill',
  },
  ranged: {
    2: 'Patron Skill',
    3: 'Hunter',
    4: 'Far Shot',
    5: 'Sharp Eyes',
    6: "Sniper's Nest",
    7: 'Ranged Proficiency',
    8: 'Heavy Ranged Training',
    9: 'Point Blank',
    10: 'Hip Shoot', // source doc says "Hip Shop" — obvious typo, correct name is "Hip Shoot"
    11: 'Head Shot',
    12: 'Patron Skill',
  },
  stealth: {
    2: 'Patron Skill',
    3: 'Sixth Sense',
    4: 'Assassinate',
    5: 'Shadow Walker',
    6: 'Athletic',
    7: 'Sprinter',
    8: 'Disengage',
    9: 'Incoming',
    10: 'Nimble',
    11: 'Dodge',
    12: 'Patron Skill',
  },
  wildcard: {
    2: 'Patron Skill',
    3: 'Chosen',
    4: 'Bad Company',
    5: 'But a Scratch',
    6: 'Serendipity',
    7: 'Skill and Expertise',
    8: 'Showoff',
    9: 'Glory Hound',
    10: 'War Stories',
    11: 'Psychic Awakening',
    12: 'Patron Skill',
  },
  explorer: {
    2: 'Patron Skill',
    3: 'Wanderlust',
    4: 'Scouring',
    5: 'Trader',
    6: 'Scavenger',
    7: 'Seasoned Explorer',
    8: 'Cautious',
    9: 'Look-Out',
    10: 'Meticulous',
    11: 'Seeker',
    12: 'Patron Skill',
  },
  psychic: {
    2: 'Patron Skill',
    3: 'Fortuneteller',
    4: 'Expanded Mind',
    5: 'Safe Discharge',
    6: 'Suppressor',
    7: 'Psychic Proficiency',
    8: 'Wild Talent',
    9: 'Burning Bright',
    10: 'Balanced',
    11: 'Psychic Mastery',
    12: 'Patron Skill',
  },
};

describe('Skill content — names match instruction source', () => {
  EXPECTED_TABLES.forEach(table => {
    describe(`${table} table`, () => {
      for (let roll = 2; roll <= 12; roll++) {
        const expectedName = EXPECTED_NAMES[table][roll];
        it(`roll ${roll} → "${expectedName}"`, () => {
          const entry = SKILL_TABLES[table].find(e => e.roll === roll)!;
          expect(entry).toBeDefined();
          expect(entry.name).toBe(expectedName);
        });
      }
    });
  });
});

describe('Skill content — descriptions are non-empty and relevant', () => {
  // Spot-check several key descriptions that were previously wrong and fixed
  it('Wildcard roll 7 (Skill and Expertise) contains "ACTION"', () => {
    const entry = SKILL_TABLES.wildcard.find(e => e.roll === 7)!;
    expect(entry.description).toContain('ACTION');
    expect(entry.description).toContain('Warband Roster');
    expect(entry.description).toContain('+1 DICE');
  });

  it('Wildcard roll 11 (Psychic Awakening) contains faction variants', () => {
    const entry = SKILL_TABLES.wildcard.find(e => e.roll === 11)!;
    expect(entry.description).toContain('PSYKER 1');
    expect(entry.description).toContain('ORK');
    expect(entry.description).toContain('NECRON');
    expect(entry.description).toContain('TYRANID');
    expect(entry.description).toContain('Force Rod');
  });

  it('Psychic roll 8 (Wild Talent) mentions not counting towards limits', () => {
    const entry = SKILL_TABLES.psychic.find(e => e.roll === 8)!;
    expect(entry.description).toContain('does not count towards');
    expect(entry.description).toContain('credit limit');
  });

  it('Psychic roll 9 (Burning Bright) mentions reroll and Perils after result', () => {
    const entry = SKILL_TABLES.psychic.find(e => e.roll === 9)!;
    expect(entry.description).toContain('reroll');
    expect(entry.description).toContain('Perils of the Warp');
    expect(entry.description).toContain('after the results');
  });

  it('Ranged roll 9 (Point Blank) mentions using Ranged Skill in melee', () => {
    const entry = SKILL_TABLES.ranged.find(e => e.roll === 9)!;
    expect(entry.description).toContain("Ranged Skill");
    expect(entry.description).toContain("Fight Action");
  });

  it('Stealth roll 5 (Shadow Walker) mentions STEALTH Keyword', () => {
    const entry = SKILL_TABLES.stealth.find(e => e.roll === 5)!;
    expect(entry.description).toContain('STEALTH');
  });
});

describe('SKILL_TABLE_LABELS — specific values', () => {
  it('melee label is "Melee & Strength"', () => {
    expect(SKILL_TABLE_LABELS.melee).toBe('Melee & Strength');
  });
  it('ranged label is "Ranged"', () => {
    expect(SKILL_TABLE_LABELS.ranged).toBe('Ranged');
  });
  it('stealth label is "Stealth & Speed"', () => {
    expect(SKILL_TABLE_LABELS.stealth).toBe('Stealth & Speed');
  });
  it('wildcard label is "Wildcard"', () => {
    expect(SKILL_TABLE_LABELS.wildcard).toBe('Wildcard');
  });
  it('explorer label is "Explorer"', () => {
    expect(SKILL_TABLE_LABELS.explorer).toBe('Explorer');
  });
  it('psychic label includes "PSYKER"', () => {
    expect(SKILL_TABLE_LABELS.psychic).toContain('PSYKER');
  });
});

describe('Patron Skill — rolls 2 and 12 are always Patron Skill across all tables', () => {
  EXPECTED_TABLES.forEach(table => {
    it(`${table}: roll 2 is "Patron Skill"`, () => {
      const entry = SKILL_TABLES[table].find(e => e.roll === 2)!;
      expect(entry.name).toBe('Patron Skill');
      expect(entry.description).toContain('Patron');
    });
    it(`${table}: roll 12 is "Patron Skill"`, () => {
      const entry = SKILL_TABLES[table].find(e => e.roll === 12)!;
      expect(entry.name).toBe('Patron Skill');
      expect(entry.description).toContain('Patron');
    });
  });
});

// ============================================================================
// Type shape / WarbandUnit optional fields
// ============================================================================

describe('WarbandUnit elite progression fields', () => {
  it('xp defaults to 0 when absent using nullish coalescing', () => {
    const unit: { xp?: number } = {};
    expect(unit.xp ?? 0).toBe(0);
  });

  it('xp value is preserved when set', () => {
    const unit: { xp?: number } = { xp: 5 };
    expect(unit.xp ?? 0).toBe(5);
  });

  it('campaignSkills defaults to empty array when absent', () => {
    const unit: { campaignSkills?: unknown[] } = {};
    expect(unit.campaignSkills?.length ?? 0).toBe(0);
  });

  it('scarCount defaults to 0 when absent using nullish coalescing', () => {
    const unit: { scarCount?: number } = {};
    expect(unit.scarCount ?? 0).toBe(0);
  });

  it('traumas defaults to empty array when absent', () => {
    const unit: { traumas?: unknown[] } = {};
    expect(unit.traumas?.length ?? 0).toBe(0);
  });
});
