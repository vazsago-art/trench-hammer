/**
 * Unit tests for src/data/keywordGlossary.ts
 *
 * Tests: getKeywordDescription, expandKeywords
 */
import {
  getKeywordDescription,
  expandKeywords,
  KEYWORD_GLOSSARY,
} from '../data/keywordGlossary';

// ── getKeywordDescription ─────────────────────────────────────────────────────

describe('getKeywordDescription', () => {
  it('returns a description for an exact-match keyword', () => {
    const desc = getKeywordDescription('FEAR');
    expect(desc).toBeDefined();
    expect(desc).toContain('DICE');
  });

  it('normalises lower-case input (case-insensitive lookup)', () => {
    expect(getKeywordDescription('fear')).toBe(getKeywordDescription('FEAR'));
  });

  it('normalises mixed-case input', () => {
    expect(getKeywordDescription('Tough')).toBe(getKeywordDescription('TOUGH'));
  });

  it('trims surrounding whitespace before lookup', () => {
    expect(getKeywordDescription('  FLYING  ')).toBe(getKeywordDescription('FLYING'));
  });

  it('returns description for PSYKER 1 (exact match)', () => {
    const desc = getKeywordDescription('PSYKER 1');
    expect(desc).toBeDefined();
    expect(typeof desc).toBe('string');
  });

  it('returns description for PSYKER 2 (exact match)', () => {
    const desc = getKeywordDescription('PSYKER 2');
    expect(desc).toBeDefined();
  });

  it('falls back to prefix match for an unlisted parameterised variant (PSYKER 5)', () => {
    // No "PSYKER 5" entry; should fall back to base "PSYKER" definition
    const desc = getKeywordDescription('PSYKER 5');
    expect(desc).toBeDefined();
    expect(desc).toBe(KEYWORD_GLOSSARY['PSYKER']);
  });

  it('falls back to VICIOUS base for VICIOUS 9 (not in glossary explicitly)', () => {
    const desc = getKeywordDescription('VICIOUS 9');
    expect(desc).toBeDefined();
    expect(desc).toBe(KEYWORD_GLOSSARY['VICIOUS']);
  });

  it('falls back to AUTOMATIC base for AUTOMATIC 5', () => {
    const desc = getKeywordDescription('AUTOMATIC 5');
    expect(desc).toBeDefined();
    expect(desc).toBe(KEYWORD_GLOSSARY['AUTOMATIC']);
  });

  it('falls back to ARMOUR PIERCING base for ARMOUR PIERCING 4', () => {
    const desc = getKeywordDescription('ARMOUR PIERCING 4');
    expect(desc).toBeDefined();
    expect(desc).toBe(KEYWORD_GLOSSARY['ARMOUR PIERCING']);
  });

  it('NEGATE MINED has its own specific glossary entry (does NOT fall back to NEGATE base)', () => {
    const desc = getKeywordDescription('NEGATE MINED');
    expect(desc).toBeDefined();
    // NEGATE MINED has its own entry — it should NOT equal the generic NEGATE base description
    expect(desc).not.toBe(KEYWORD_GLOSSARY['NEGATE']);
    expect(desc).toContain('MINED');
  });

  it('returns a faction-tag description for ASTARTES (faction tags are now in the glossary)', () => {
    const desc = getKeywordDescription('ASTARTES');
    expect(desc).toBeDefined();
    expect(desc).toContain('Faction Tag');
  });

  it('returns a faction-tag description for ORK (faction tags are now in the glossary)', () => {
    const desc = getKeywordDescription('ORK');
    expect(desc).toBeDefined();
    expect(desc).toContain('Faction Tag');
  });

  it('returns undefined for an empty string', () => {
    expect(getKeywordDescription('')).toBeUndefined();
  });

  it('returns undefined for a completely unknown string', () => {
    expect(getKeywordDescription('TOTALLY_UNKNOWN_XYZ')).toBeUndefined();
  });
});

// ── expandKeywords ────────────────────────────────────────────────────────────

describe('expandKeywords', () => {
  it('returns empty array for empty input', () => {
    expect(expandKeywords([])).toEqual([]);
  });

  it('returns empty array when no keywords have glossary entries', () => {
    // Use keywords that are truly absent from the glossary
    expect(expandKeywords(['TOTALLY_UNKNOWN_XYZ', 'ANOTHER_UNKNOWN', 'FAKE_KW'])).toEqual([]);
  });

  it('returns an entry for each keyword that has a glossary definition', () => {
    const result = expandKeywords(['FEAR', 'TOUGH']);
    expect(result).toHaveLength(2);
    expect(result[0].keyword).toBe('FEAR');
    expect(result[1].keyword).toBe('TOUGH');
  });

  it('each entry contains both keyword and description strings', () => {
    const [entry] = expandKeywords(['FLYING']);
    expect(typeof entry.keyword).toBe('string');
    expect(typeof entry.description).toBe('string');
    expect(entry.description.length).toBeGreaterThan(0);
  });

  it('deduplicates repeated keywords', () => {
    const result = expandKeywords(['FEAR', 'FEAR', 'FEAR']);
    expect(result).toHaveLength(1);
    expect(result[0].keyword).toBe('FEAR');
  });

  it('deduplicates case-insensitively', () => {
    const result = expandKeywords(['FEAR', 'fear']);
    expect(result).toHaveLength(1);
  });

  it('skips truly unknown keywords without erroring', () => {
    const result = expandKeywords(['TOTALLY_UNKNOWN_XYZ', 'FEAR', 'ANOTHER_FAKE', 'FLYING']);
    const kwNames = result.map(r => r.keyword);
    expect(kwNames).toContain('FEAR');
    expect(kwNames).toContain('FLYING');
    expect(kwNames).not.toContain('TOTALLY_UNKNOWN_XYZ');
    expect(kwNames).not.toContain('ANOTHER_FAKE');
  });

  it('handles parameterised keywords (PSYKER 1)', () => {
    const result = expandKeywords(['PSYKER 1']);
    expect(result).toHaveLength(1);
    expect(result[0].keyword).toBe('PSYKER 1');
  });
});
