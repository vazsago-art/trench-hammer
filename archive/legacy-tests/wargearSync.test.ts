/**
 * Wargear Synchronisation Tests
 *
 * These tests guarantee that:
 * 1. Every weapon ID listed in FACTION_WARGEAR resolves to a real weapon in allWeapons
 * 2. Every faction-specific weapon array ID is registered in factionSpecificWeaponIds
 * 3. FACTION_WARGEAR pools for each of the 8 "new" Xenos + Chaos factions are non-empty
 * 4. WargearPanel bucketing logic surfaces faction weapons correctly by type/keyword
 * 5. Per-faction unit stats, costs, and keywords match the ground-truth instruction files
 *
 * Ground-truth source: .github/instructions/TrenchHammer – Xenos Factions/*.md
 *                      .github/instructions/TrenchHammer – Chaos Factions/Chaos Daemons.md
 *
 * Factions verified in detail:
 *   Harlequins, Slanni, Tyranids, T'au Empire, Orks, Drukhari, Aeldari, Chaos Daemons
 */

import { describe, it, expect } from 'vitest';
import {
  allWeapons,
  factionSpecificWeaponIds,
  drukahriWeapons,
  aeldariWeapons,
  harlequinsWeapons,
  tyranidsWeapons,
  tauEmpireWeapons,
  slanniWeapons,
  orksWeapons,
  chaosDaemonsWeapons,
} from '../data/weapons.js';
import { allEquipmentWithHA } from '../data/equipment.js';
import { FACTION_WARGEAR, getAllowedWargearIds } from '../data/faction_wargear.js';
import { getFactionById } from '../data/factions_complete.js';
import {
  lookupWeapon,
  getWeaponHandedness,
  validateAddWargear,
  validateLoadout,
} from '../data/wargearSlotValidation.js';
import type { SelectedWargear } from '../types/index.js';

// ============================================================================
// SECTION 1 – Weapon ID Existence (every ID in allWeapons)
// ============================================================================

describe('Faction weapon arrays – every ID exists in allWeapons', () => {
  const allWeaponIds = new Set(allWeapons.map(w => w.id));

  function checkAllExist(arrayName: string, arr: { id: string }[]) {
    arr.forEach(w => {
      it(`${arrayName}: "${w.id}" resolves in allWeapons`, () => {
        expect(allWeaponIds.has(w.id)).toBe(true);
      });
    });
  }

  checkAllExist('drukahriWeapons', drukahriWeapons);
  checkAllExist('aeldariWeapons', aeldariWeapons);
  checkAllExist('harlequinsWeapons', harlequinsWeapons);
  checkAllExist('tyranidsWeapons', tyranidsWeapons);
  checkAllExist('tauEmpireWeapons', tauEmpireWeapons);
  checkAllExist('slanniWeapons', slanniWeapons);
  checkAllExist('orksWeapons', orksWeapons);
  checkAllExist('chaosDaemonsWeapons', chaosDaemonsWeapons);
});

// ============================================================================
// SECTION 2 – factionSpecificWeaponIds completeness
// ============================================================================

describe('factionSpecificWeaponIds – all 8 faction arrays are registered', () => {
  const allArrays: { name: string; arr: { id: string }[] }[] = [
    { name: 'drukahriWeapons',       arr: drukahriWeapons },
    { name: 'aeldariWeapons',        arr: aeldariWeapons },
    { name: 'harlequinsWeapons',     arr: harlequinsWeapons },
    { name: 'tyranidsWeapons',       arr: tyranidsWeapons },
    { name: 'tauEmpireWeapons',      arr: tauEmpireWeapons },
    { name: 'slanniWeapons',         arr: slanniWeapons },
    { name: 'orksWeapons',           arr: orksWeapons },
    { name: 'chaosDaemonsWeapons',   arr: chaosDaemonsWeapons },
  ];

  allArrays.forEach(({ name, arr }) => {
    arr.forEach(w => {
      it(`${name}: "${w.id}" is in factionSpecificWeaponIds`, () => {
        expect(factionSpecificWeaponIds.has(w.id)).toBe(true);
      });
    });
  });
});

// ============================================================================
// SECTION 3 – FACTION_WARGEAR pool resolution
// All IDs in each faction's pool must resolve to a weapon OR equipment item
// ============================================================================

describe('FACTION_WARGEAR – all IDs resolve to a weapon or equipment item', () => {
  const allWeaponIds  = new Set(allWeapons.map(w => w.id));
  const allEquipIds   = new Set(allEquipmentWithHA.map(e => e.id));
  const allItemIds    = new Set([...allWeaponIds, ...allEquipIds]);

  const targetFactions = [
    'harlequins',
    'slanni',
    'tyranids',
    't_au_empire',
    'orks',
    'drukhari',
    'aeldari',
    'chaos_daemons',
  ];

  targetFactions.forEach(factionId => {
    describe(`FACTION_WARGEAR["${factionId}"]`, () => {
      it('pool is non-empty', () => {
        expect(FACTION_WARGEAR[factionId]).toBeDefined();
        expect(FACTION_WARGEAR[factionId].length).toBeGreaterThan(0);
      });

      (FACTION_WARGEAR[factionId] ?? []).forEach(id => {
        it(`"${id}" resolves to a weapon or equipment`, () => {
          expect(allItemIds.has(id)).toBe(true);
        });
      });
    });
  });
});

// ============================================================================
// SECTION 4 – WargearPanel bucketing logic
// Given a faction's weapon IDs, each weapon should fall into exactly one
// visual category based on its type and keywords.
// ============================================================================

describe('WargearPanel bucketing – faction weapons land in the correct category', () => {
  /** Mirrors the exact bucketing logic in WargearPanel.tsx */
  function bucket(w: { type: string; keywords: string[] }): string {
    if (w.keywords.includes('PISTOL'))                           return 'pistol';
    if (w.type === 'ranged' && w.keywords.includes('HEAVY'))     return 'heavy_ranged';
    if (w.type === 'ranged')                                      return 'spec_ranged';
    if (w.type === 'thrown')                                      return 'thrown';
    if (w.type === 'melee'  && w.keywords.includes('HEAVY'))     return 'heavy_melee';
    if (w.type === 'melee')                                       return 'spec_melee';
    return 'other';
  }

  // Harlequins: shuriken weapons live in aeldariWeapons (shared with Harlequins faction)
  describe('Harlequins shuriken weapons', () => {
    const shurikenCatapult    = aeldariWeapons.find(w => w.id === 'shuriken_catapult');
    const shurikenPistol      = aeldariWeapons.find(w => w.id === 'shuriken_pistol');
    const twinShurikenPistols = aeldariWeapons.find(w => w.id === 'twin_shuriken_pistols');

    it('shuriken_catapult buckets as spec_ranged (visible in Special Ranged)', () => {
      expect(shurikenCatapult).toBeDefined();
      expect(bucket(shurikenCatapult!)).toBe('spec_ranged');
    });

    it('shuriken_pistol buckets as pistol (visible in Pistols)', () => {
      expect(shurikenPistol).toBeDefined();
      expect(bucket(shurikenPistol!)).toBe('pistol');
    });

    it('twin_shuriken_pistols buckets as pistol (visible in Pistols)', () => {
      expect(twinShurikenPistols).toBeDefined();
      expect(bucket(twinShurikenPistols!)).toBe('pistol');
    });
  });

  // Orks: heavy melee vs special melee separation
  describe('Orks melee weapon bucketing', () => {
    const choppa    = orksWeapons.find(w => w.id === 'choppa');
    const powerKlaw = orksWeapons.find(w => w.id === 'power_klaw');

    it('choppa buckets as spec_melee', () => {
      expect(choppa).toBeDefined();
      expect(bucket(choppa!)).toBe('spec_melee');
    });

    it('power_klaw buckets as heavy_melee', () => {
      expect(powerKlaw).toBeDefined();
      expect(bucket(powerKlaw!)).toBe('heavy_melee');
    });
  });

  // T'au: pulse ranged weapons are spec_ranged
  describe('T\'au Empire ranged weapon bucketing', () => {
    const pulsePistol  = tauEmpireWeapons.find(w => w.id === 'pulse_pistol');
    const pulseRifle   = tauEmpireWeapons.find(w => w.id === 'pulse_rifle');

    it('pulse_pistol buckets as pistol', () => {
      expect(pulsePistol).toBeDefined();
      expect(bucket(pulsePistol!)).toBe('pistol');
    });

    it('pulse_rifle buckets as spec_ranged', () => {
      expect(pulseRifle).toBeDefined();
      expect(bucket(pulseRifle!)).toBe('spec_ranged');
    });
  });

  // Tyranids: all weapons have a valid bucket (no stranded weapons)
  describe('Tyranids – no weapon lands in "other" bucket', () => {
    tyranidsWeapons.forEach(w => {
      it(`"${w.id}" lands in a known bucket`, () => {
        expect(bucket(w)).not.toBe('other');
      });
    });
  });

  // Drukhari: splinter weapons (IDs have _drukhari suffix)
  describe('Drukhari splinter weapon bucketing', () => {
    const splinterPistol = drukahriWeapons.find(w => w.id === 'splinter_pistol_drukhari');
    const splinterRifle  = drukahriWeapons.find(w => w.id === 'splinter_rifle_drukhari');
    const splinterCannon = drukahriWeapons.find(w => w.id === 'splinter_cannon_drukhari');

    it('splinter_pistol buckets as pistol', () => {
      expect(splinterPistol).toBeDefined();
      expect(bucket(splinterPistol!)).toBe('pistol');
    });

    it('splinter_rifle buckets as spec_ranged', () => {
      expect(splinterRifle).toBeDefined();
      expect(bucket(splinterRifle!)).toBe('spec_ranged');
    });

    it('splinter_cannon buckets as heavy_ranged', () => {
      expect(splinterCannon).toBeDefined();
      expect(bucket(splinterCannon!)).toBe('heavy_ranged');
    });
  });
});

// ============================================================================
// SECTION 5 – Harlequins unit data vs instruction file
// Source: .github/instructions/TrenchHammer – Xenos Factions/Harlequins.md
//
// NOTE: Data baseCost = instruction base + mandatory battlekit (intentional all-in cost)
// ============================================================================

describe('Harlequins – unit data matches instruction file', () => {
  const faction = getFactionById('harlequins');

  it('faction exists', () => {
    expect(faction).toBeDefined();
  });

  it('has 7 units', () => {
    expect(faction!.units.length).toBe(7);
  });

  const expectedUnits = [
    'hq_troupe_master',
    'hq_death_jester',
    'hq_shadowseer',
    'hq_solitaire',
    'hq_mime',
    'hq_player',
    'hq_skyweaver',
  ];
  expectedUnits.forEach(id => {
    it(`includes unit: ${id}`, () => {
      expect(faction!.units.find(u => u.id === id)).toBeDefined();
    });
  });

  // Stat checks (baseCost = instruction_base + battlekit, all-in)
  it('Troupe Master: baseCost 110, movement 8, ranged +2, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'hq_troupe_master')!;
    expect(u.baseCost).toBe(110);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Death Jester: baseCost 105, ranged +3, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'hq_death_jester')!;
    expect(u.baseCost).toBe(105);
    expect(u.stats.rangedSkill).toBe(3);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Shadowseer: baseCost 110, ranged +2, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'hq_shadowseer')!;
    expect(u.baseCost).toBe(110);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Solitaire: baseCost 115, movement 10, melee +3, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'hq_solitaire')!;
    expect(u.baseCost).toBe(115);
    expect(u.stats.movement).toBe(10);
    expect(u.stats.meleeSkill).toBe(3);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Mime: baseCost 50, ranged +0, melee +0, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'hq_mime')!;
    expect(u.baseCost).toBe(50);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Player: baseCost 80, ranged +1, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'hq_player')!;
    expect(u.baseCost).toBe(80);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Skyweaver: baseCost 115, movement 10, ranged +1, melee +1, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'hq_skyweaver')!;
    expect(u.baseCost).toBe(115);
    expect(u.stats.movement).toBe(10);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-1);
  });

  // Keyword checks
  it('Troupe Master has ELITE, FEAR, HARLIQUIN, LEADER, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'hq_troupe_master')!;
    ['ELITE', 'FEAR', 'HARLIQUIN', 'LEADER', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Shadowseer has PSYKER keyword', () => {
    const u = faction!.units.find(u => u.id === 'hq_shadowseer')!;
    expect(u.keywords.some(kw => kw.startsWith('PSYKER'))).toBe(true);
  });

  it('Solitaire has STEALTH keyword', () => {
    const u = faction!.units.find(u => u.id === 'hq_solitaire')!;
    expect(u.keywords).toContain('STEALTH');
  });

  it('Mime has INFILTRATOR keyword', () => {
    const u = faction!.units.find(u => u.id === 'hq_mime')!;
    expect(u.keywords).toContain('INFILTRATOR');
  });

  it('Skyweaver has FLYING, LARGE, VEHICLE keywords', () => {
    const u = faction!.units.find(u => u.id === 'hq_skyweaver')!;
    ['FLYING', 'LARGE', 'VEHICLE'].forEach(kw => expect(u.keywords).toContain(kw));
  });
});

// ============================================================================
// SECTION 5b – Harlequins faction wargear pool & upgrades regression tests
// Regression for:
//   - hq_troupe_master / hq_player had UNIT_WARGEAR_OVERRIDES with wrong imperial weapons
//   - All elites/Player were missing upgrades arrays entirely
// The wargear pool Harlequins models draw from is FACTION_WARGEAR['harlequins'].
// getAllowedWargearIds() returns the faction pool when no unit override exists.
// ============================================================================

describe('Harlequins – faction wargear pool contains correct weapons', () => {
  const pool = FACTION_WARGEAR['harlequins'];

  it('pool is defined and non-empty', () => {
    expect(pool).toBeDefined();
    expect(pool.length).toBeGreaterThan(0);
  });

  // Shuriken weapons (core Harlequin ranged kit)
  it('contains shuriken_catapult', () => expect(pool).toContain('shuriken_catapult'));
  it('contains shuriken_rifle', () => expect(pool).toContain('shuriken_rifle'));
  it('contains shuriken_pistol', () => expect(pool).toContain('shuriken_pistol'));
  it('contains twin_shuriken_pistols', () => expect(pool).toContain('twin_shuriken_pistols'));
  it('contains shuriken_cannon_harlequins', () => expect(pool).toContain('shuriken_cannon_harlequins'));

  // Harlequin-specific weapons
  it('contains hallucinogen_grenade_launcher', () => expect(pool).toContain('hallucinogen_grenade_launcher'));
  it('contains fusion_pistol_harlequins', () => expect(pool).toContain('fusion_pistol_harlequins'));
  it('contains harlequins_caress', () => expect(pool).toContain('harlequins_caress'));
  it('contains neuro_disruptor_harlequins', () => expect(pool).toContain('neuro_disruptor_harlequins'));
  it('contains bright_lance_harlequins', () => expect(pool).toContain('bright_lance_harlequins'));
  it('contains haywire_cannon_harlequins', () => expect(pool).toContain('haywire_cannon_harlequins'));
  it('contains prismatic_cannon', () => expect(pool).toContain('prismatic_cannon'));
  it('contains shrieker_cannon', () => expect(pool).toContain('shrieker_cannon'));
  it('contains harlequins_embrace', () => expect(pool).toContain('harlequins_embrace'));
  it('contains harlequins_kiss', () => expect(pool).toContain('harlequins_kiss'));
  it('contains jesters_blade', () => expect(pool).toContain('jesters_blade'));
  it('contains power_blade_harlequins', () => expect(pool).toContain('power_blade_harlequins'));
  it('contains power_glaive_harlequins', () => expect(pool).toContain('power_glaive_harlequins'));

  // Thrown
  it('contains hallucinogen_grenades', () => expect(pool).toContain('hallucinogen_grenades'));
  it('contains haywire_grenades_harlequins', () => expect(pool).toContain('haywire_grenades_harlequins'));
  it('contains prismatic_grenades', () => expect(pool).toContain('prismatic_grenades'));
  it('contains plasma_grenades_aeldari (Harlequins Plasma Grenades)', () => expect(pool).toContain('plasma_grenades_aeldari'));
  it('contains star_bolas', () => expect(pool).toContain('star_bolas'));
  it('contains tanglefoot_grenades', () => expect(pool).toContain('tanglefoot_grenades'));

  // Armour / equipment
  it('contains holo_suit', () => expect(pool).toContain('holo_suit'));
  it('contains flip_belt_harlequins', () => expect(pool).toContain('flip_belt_harlequins'));
  it('contains bio_explosive_ammunition', () => expect(pool).toContain('bio_explosive_ammunition'));

  // Generic melee from XENOS_ELITE → BASIC_MELEE_IDS (blade, paired_blades)
  it('contains blade (via XENOS_ELITE basic melee)', () => expect(pool).toContain('blade'));
  it('contains paired_blades (via XENOS_ELITE basic melee)', () => expect(pool).toContain('paired_blades'));
});

describe('Harlequins – getAllowedWargearIds uses faction pool for all units', () => {
  const factionPool = FACTION_WARGEAR['harlequins'];

  // These two units previously had UNIT_WARGEAR_OVERRIDES with wrong restricted weapon lists
  // (only imperial pistols + generic melee, missing all Harlequins weapons).
  // After fix they must fall back to the full faction pool.
  it('hq_troupe_master falls back to faction pool (no unit override)', () => {
    const pool = getAllowedWargearIds('harlequins', 'hq_troupe_master');
    expect(pool).toEqual(factionPool);
    // Must contain Harlequins-specific weapons (were absent in broken override)
    expect(pool).toContain('shuriken_catapult');
    expect(pool).toContain('harlequins_kiss');
    expect(pool).toContain('hallucinogen_grenade_launcher');
    expect(pool).toContain('fusion_pistol_harlequins');
  });

  it('hq_player falls back to faction pool (no unit override)', () => {
    const pool = getAllowedWargearIds('harlequins', 'hq_player');
    expect(pool).toEqual(factionPool);
    // Must contain Harlequins-specific weapons (were absent in broken override)
    expect(pool).toContain('shuriken_catapult');
    expect(pool).toContain('harlequins_kiss');
    expect(pool).toContain('fusion_pistol_harlequins');
  });

  // Other Harlequin units should also use the faction pool
  ['hq_death_jester', 'hq_shadowseer', 'hq_solitaire', 'hq_mime', 'hq_skyweaver'].forEach(id => {
    it(`${id} uses faction pool`, () => {
      const pool = getAllowedWargearIds('harlequins', id);
      expect(pool).toEqual(factionPool);
    });
  });
});

describe('Harlequins – Pivotal Role upgrades (Troupe Master)', () => {
  const faction = getFactionById('harlequins')!;
  const u = () => faction.units.find(u => u.id === 'hq_troupe_master')!;

  it('has exactly 3 upgrades', () => {
    expect(u().upgrades?.length).toBe(3);
  });

  it("Darkness' Bite upgrade exists with cost 10", () => {
    const up = u().upgrades?.find(x => x.id === 'hq_tm_darknesses_bite');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(10);
  });
  it('Prince of Light upgrade exists with cost 10', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_tm_prince_of_light');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(10);
  });
  it("Twilight's Grasp upgrade exists with cost 15", () => {
    const up = u().upgrades?.find(x => x.id === 'hq_tm_twilights_grasp');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(15);
  });
});

describe('Harlequins – Pivotal Role upgrades (Death Jester)', () => {
  const faction = getFactionById('harlequins')!;
  const u = () => faction.units.find(u => u.id === 'hq_death_jester')!;

  it('has exactly 3 upgrades', () => {
    expect(u().upgrades?.length).toBe(3);
  });

  it('Harvester of Torment upgrade exists with cost 20', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_dj_harvester_of_torment');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(20);
  });
  it('Humbling Cruelty upgrade exists with cost 10', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_dj_humbling_cruelty');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(10);
  });
  it('The Jest Inescapable upgrade exists with cost 10', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_dj_jest_inescapable');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(10);
  });
});

describe('Harlequins – Pivotal Role upgrades (Shadowseer)', () => {
  const faction = getFactionById('harlequins')!;
  const u = () => faction.units.find(u => u.id === 'hq_shadowseer')!;

  it('has exactly 3 upgrades', () => {
    expect(u().upgrades?.length).toBe(3);
  });

  it('Agent of Bedlam upgrade exists with cost 10', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_ss_agent_of_bedlam');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(10);
  });
  it('Gloomwake upgrade exists with cost 15', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_ss_gloomwake');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(15);
  });
  it('Veil of Illusion upgrade exists with cost 15', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_ss_veil_of_illusion');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(15);
  });
});

describe('Harlequins – Pivotal Role upgrades (Solitaire)', () => {
  const faction = getFactionById('harlequins')!;
  const u = () => faction.units.find(u => u.id === 'hq_solitaire')!;

  it('has exactly 3 upgrades', () => {
    expect(u().upgrades?.length).toBe(3);
  });

  it('Chromatic Rush upgrade exists with cost 10', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_sol_chromatic_rush');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(10);
  });
  it('Shocking Emergence upgrade exists with cost 10', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_sol_shocking_emergence');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(10);
  });
  it('Unnatural Acrobatics upgrade exists with cost 20', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_sol_unnatural_acrobatics');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(20);
  });
});

describe('Harlequins – Supporting Role upgrades (Player)', () => {
  const faction = getFactionById('harlequins')!;
  const u = () => faction.units.find(u => u.id === 'hq_player')!;

  it('has exactly 4 upgrades', () => {
    expect(u().upgrades?.length).toBe(4);
  });

  it('Acrobat upgrade exists with cost 10', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_pl_acrobat');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(10);
  });
  it('Dancer upgrade exists with cost 5', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_pl_dancer');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(5);
  });
  it('Mourner upgrade exists with cost 10', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_pl_mourner');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(10);
  });
  it('Slayer upgrade exists with cost 5', () => {
    const up = u().upgrades?.find(x => x.id === 'hq_pl_slayer');
    expect(up).toBeDefined();
    expect(up!.cost).toBe(5);
  });
});

describe('Harlequins – no unit missing upgrades where instruction mandates them', () => {
  const faction = getFactionById('harlequins')!;

  const unitsRequiringUpgrades = [
    'hq_troupe_master', 'hq_death_jester', 'hq_shadowseer', 'hq_solitaire', 'hq_player',
  ];
  unitsRequiringUpgrades.forEach(id => {
    it(`${id} has upgrades array with at least 1 entry`, () => {
      const u = faction.units.find(u => u.id === id)!;
      expect(u.upgrades).toBeDefined();
      expect(u.upgrades!.length).toBeGreaterThan(0);
    });
  });

  const unitsWithNoUpgrades = ['hq_mime', 'hq_skyweaver'];
  unitsWithNoUpgrades.forEach(id => {
    it(`${id} correctly has no upgrades (troops/vehicles don't have Pivotal Role)`, () => {
      const u = faction.units.find(u => u.id === id)!;
      // upgrades may be undefined or empty — either is fine for these units
      const count = u.upgrades?.length ?? 0;
      expect(count).toBe(0);
    });
  });
});

// ============================================================================
// SECTION 6 – Slanni unit data vs instruction file
// Source: .github/instructions/TrenchHammer – Xenos Factions/Slanni.md
// ============================================================================

describe('Slanni – unit data matches instruction file', () => {
  const faction = getFactionById('slanni');

  it('faction exists', () => {
    expect(faction).toBeDefined();
  });

  const expectedUnits = [
    'sl_mage_chief',
    'sl_oldblood',
    'sl_starpriest',
    'sl_skirmisher',
    'sl_brave',
    'sl_battle_mage',
    'sl_brute',
    'sl_amphi_walker',
  ];
  expectedUnits.forEach(id => {
    it(`includes unit: ${id}`, () => {
      expect(faction!.units.find(u => u.id === id)).toBeDefined();
    });
  });

  it('Mage Chief: baseCost 60, movement 6, ranged +1, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'sl_mage_chief')!;
    expect(u.baseCost).toBe(60);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Oldblood: baseCost 65, ranged +1, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'sl_oldblood')!;
    expect(u.baseCost).toBe(65);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Starpriest: baseCost 60, movement 8, ranged +1, melee +0, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'sl_starpriest')!;
    expect(u.baseCost).toBe(60);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Skirmisher: baseCost 40, movement 8, ranged +0, melee -1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'sl_skirmisher')!;
    expect(u.baseCost).toBe(40);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(-1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Brave: baseCost 45, movement 6, ranged +1, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'sl_brave')!;
    expect(u.baseCost).toBe(45);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Battle Mage: baseCost 40, movement 6, ranged +1, melee +0, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'sl_battle_mage')!;
    expect(u.baseCost).toBe(40);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Brute: baseCost 70, movement 6, ranged +0, melee +2, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'sl_brute')!;
    expect(u.baseCost).toBe(70);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(-1);
  });

  it('Amphi Walker: baseCost 160, movement 8, ranged +1, melee +1, armour -3', () => {
    const u = faction!.units.find(u => u.id === 'sl_amphi_walker')!;
    expect(u.baseCost).toBe(160);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-3);
  });

  // Keyword checks
  it('Mage Chief has ELITE, LARGE, LEADER, PSYKER, SLANN, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'sl_mage_chief')!;
    ['ELITE', 'LARGE', 'LEADER', 'SLANN', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
    expect(u.keywords.some(kw => kw.startsWith('PSYKER'))).toBe(true);
  });

  it('Oldblood has NEGATE FEAR keyword', () => {
    const u = faction!.units.find(u => u.id === 'sl_oldblood')!;
    expect(u.keywords).toContain('NEGATE FEAR');
  });

  it('Skirmisher has SKIRMISHER keyword', () => {
    const u = faction!.units.find(u => u.id === 'sl_skirmisher')!;
    expect(u.keywords).toContain('SKIRMISHER');
  });

  it('Amphi Walker has LARGE, NEGATE SHRAPNEL, SLANN, STRONG, TOUGH, VEHICLE', () => {
    const u = faction!.units.find(u => u.id === 'sl_amphi_walker')!;
    ['LARGE', 'NEGATE SHRAPNEL', 'SLANN', 'STRONG', 'TOUGH', 'VEHICLE'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });
});

// ============================================================================
// SECTION 7 – Tyranids unit data vs instruction file
// Source: .github/instructions/TrenchHammer – Xenos Factions/Tyranids.md
// ============================================================================

describe('Tyranids – unit data matches instruction file', () => {
  const faction = getFactionById('tyranids');

  it('faction exists', () => {
    expect(faction).toBeDefined();
  });

  const expectedUnits = [
    'ty_hive_tyrant',
    'ty_lictor',
    'ty_tyrant_guard',
    'ty_gaunt_barbgaunt',
    'ty_gaunt_gargoyle',
    'ty_gaunt_hormagaunt',
    'ty_gaunt_neurogaunt',
    'ty_gaunt_termagant',
    'ty_tyranid_warrior',
    'ty_ravener',
    'ty_ripper_swarm',
    'ty_zoanthrope',
    'ty_spore_mine',
  ];
  expectedUnits.forEach(id => {
    it(`includes unit: ${id}`, () => {
      expect(faction!.units.find(u => u.id === id)).toBeDefined();
    });
  });

  it('Hive Tyrant: baseCost 175, movement 8, ranged +3, melee +3, armour -3', () => {
    const u = faction!.units.find(u => u.id === 'ty_hive_tyrant')!;
    expect(u.baseCost).toBe(175);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(3);
    expect(u.stats.meleeSkill).toBe(3);
    expect(u.stats.armourSave).toBe(-3);
  });

  it('Lictor: baseCost 125, movement 8, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'ty_lictor')!;
    expect(u.baseCost).toBe(125);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.armourSave).toBe(-1);
  });

  it('Tyrant Guard: baseCost 130, movement 6, ranged +1, melee +1, armour -3', () => {
    const u = faction!.units.find(u => u.id === 'ty_tyrant_guard')!;
    expect(u.baseCost).toBe(130);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-3);
  });

  it('Hormagaunt (Gaunt variant): baseCost 35, movement 8, ranged +0, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'ty_gaunt_hormagaunt')!;
    expect(u.baseCost).toBe(35);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Termagant (Gaunt variant): baseCost 35, movement 6, armour 0, SKIRMISHER', () => {
    const u = faction!.units.find(u => u.id === 'ty_gaunt_termagant')!;
    expect(u.baseCost).toBe(35);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.armourSave).toBe(0);
    expect(u.keywords).toContain('SKIRMISHER');
  });

  it('Barbgaunt: baseCost 50, movement 6, armour -1, LARGE', () => {
    const u = faction!.units.find(u => u.id === 'ty_gaunt_barbgaunt')!;
    expect(u.baseCost).toBe(50);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.armourSave).toBe(-1);
    expect(u.keywords).toContain('LARGE');
    expect(u.keywords).toContain('NO PROMOTION');
    expect(u.keywords).toContain('TYRANID');
  });

  it('Gargoyle: baseCost 40, movement 8, armour 0, FLYING', () => {
    const u = faction!.units.find(u => u.id === 'ty_gaunt_gargoyle')!;
    expect(u.baseCost).toBe(40);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.armourSave).toBe(0);
    expect(u.keywords).toContain('FLYING');
    expect(u.keywords).toContain('NO PROMOTION');
    expect(u.keywords).toContain('TYRANID');
  });

  it('Neurogaunt: baseCost 35, movement 6, ranged 0, melee 0, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'ty_gaunt_neurogaunt')!;
    expect(u.baseCost).toBe(35);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(0);
    expect(u.keywords).toContain('NO PROMOTION');
    expect(u.keywords).toContain('TYRANID');
  });

  it('Tyranid Warrior: baseCost 95, movement 6, ranged +1, melee +1, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'ty_tyranid_warrior')!;
    expect(u.baseCost).toBe(95);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-1);
  });

  it('Ravener: baseCost 105, movement 8, ranged +1, melee +1, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'ty_ravener')!;
    expect(u.baseCost).toBe(105);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-1);
  });

  it('Ripper Swarm: baseCost 75, movement 6, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'ty_ripper_swarm')!;
    expect(u.baseCost).toBe(75);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Zoanthrope: baseCost 85, movement 6, ranged +0, melee +0, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'ty_zoanthrope')!;
    expect(u.baseCost).toBe(85);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(-1);
  });

  it('Spore Mine: baseCost 25, movement 5, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'ty_spore_mine')!;
    expect(u.baseCost).toBe(25);
    expect(u.stats.movement).toBe(5);
    expect(u.stats.armourSave).toBe(0);
  });

  // Keyword checks
  it('Hive Tyrant has ELITE, FEAR, LARGE, LEADER, SYNAPSE, TOUGH, TYRANID', () => {
    const u = faction!.units.find(u => u.id === 'ty_hive_tyrant')!;
    ['ELITE', 'FEAR', 'LARGE', 'LEADER', 'SYNAPSE', 'TOUGH', 'TYRANID'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Lictor has FEAR, INFILTRATOR, STEALTH, TOUGH, TYRANID', () => {
    const u = faction!.units.find(u => u.id === 'ty_lictor')!;
    ['FEAR', 'INFILTRATOR', 'STEALTH', 'TOUGH', 'TYRANID'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Hormagaunt has NO PROMOTION, TYRANID', () => {
    const u = faction!.units.find(u => u.id === 'ty_gaunt_hormagaunt')!;
    expect(u.keywords).toContain('NO PROMOTION');
    expect(u.keywords).toContain('TYRANID');
  });

  it('Ravener has BURROW, DEEP STRIKE (TUNNEL), TYRANID', () => {
    const u = faction!.units.find(u => u.id === 'ty_ravener')!;
    expect(u.keywords).toContain('BURROW');
    expect(u.keywords).toContain('DEEP STRIKE (TUNNEL)');
    expect(u.keywords).toContain('TYRANID');
  });

  it('Ripper Swarm has SWARM, FEAR, BURROW, DEEP STRIKE (TUNNEL), NO PROMOTION', () => {
    const u = faction!.units.find(u => u.id === 'ty_ripper_swarm')!;
    ['SWARM', 'FEAR', 'BURROW', 'DEEP STRIKE (TUNNEL)', 'NO PROMOTION'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Zoanthrope has FLYING, LARGE, SYNAPSE, TYRANID', () => {
    const u = faction!.units.find(u => u.id === 'ty_zoanthrope')!;
    ['FLYING', 'LARGE', 'SYNAPSE', 'TYRANID'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Spore Mine has DEEP STRIKE, FLYING, NO PROMOTION, TYRANID', () => {
    const u = faction!.units.find(u => u.id === 'ty_spore_mine')!;
    ['DEEP STRIKE', 'FLYING', 'NO PROMOTION', 'TYRANID'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });
});

// ============================================================================
// SECTION 8 – T'au Empire unit data vs instruction file
// Source: .github/instructions/TrenchHammer – Xenos Factions/T'au Empire.md
// ============================================================================

describe("T'au Empire – unit data matches instruction file", () => {
  const faction = getFactionById('t_au_empire');

  it('faction exists', () => {
    expect(faction).toBeDefined();
  });

  const expectedUnits = [
    'tau_ethereal',
    'tau_commander',
    'tau_cadre_fireblade',
    'tau_kroot_shaper',
    'tau_fire_warrior',
    'tau_drone',
    'tau_kroot_carnivore',
    'tau_stealth_battlesuit',
    'tau_crisis_battlesuit',
    'tau_broadside_battlesuit',
    'tau_kill_broker',
    'tau_krootox_rider',
  ];
  expectedUnits.forEach(id => {
    it(`includes unit: ${id}`, () => {
      expect(faction!.units.find(u => u.id === id)).toBeDefined();
    });
  });

  it('Ethereal: baseCost 65', () => {
    const u = faction!.units.find(u => u.id === 'tau_ethereal')!;
    expect(u.baseCost).toBe(65);
  });

  it('Commander: baseCost 115, movement 8, ranged +2, melee +1, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'tau_commander')!;
    expect(u.baseCost).toBe(115);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-2);
  });

  it('Fire Warrior: baseCost 35, ranged +1, melee -1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'tau_fire_warrior')!;
    expect(u.baseCost).toBe(35);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(-1);
    expect(u.stats.armourSave).toBe(0);
  });

  it("T'au Drone: baseCost 25, movement 6, ranged +0, melee -1, armour -1", () => {
    const u = faction!.units.find(u => u.id === 'tau_drone')!;
    expect(u.baseCost).toBe(25);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(-1);
    expect(u.stats.armourSave).toBe(-1);
  });

  it('Kroot Carnivore: baseCost 40, movement 6, ranged +0, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'tau_kroot_carnivore')!;
    expect(u.baseCost).toBe(40);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Stealth Battlesuit: baseCost 110, movement 6, ranged +1, melee +0, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'tau_stealth_battlesuit')!;
    expect(u.baseCost).toBe(110);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(-2);
  });

  it('Crisis Battlesuit: baseCost 135, movement 8, ranged +1, melee +0, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'tau_crisis_battlesuit')!;
    expect(u.baseCost).toBe(135);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(-2);
  });

  // Keyword checks
  it("T'au Drone has ARTIFICIAL, FLYING, NO PROMOTION, T'AU", () => {
    const u = faction!.units.find(u => u.id === 'tau_drone')!;
    ['ARTIFICIAL', 'FLYING', 'NO PROMOTION', 'T\'AU'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Kroot Carnivore has KROOT, STEALTH, T\'AU', () => {
    const u = faction!.units.find(u => u.id === 'tau_kroot_carnivore')!;
    ['KROOT', 'STEALTH', 'T\'AU'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Stealth Battlesuit has FLYING, INFILTRATOR, STEALTH, VEHICLE', () => {
    const u = faction!.units.find(u => u.id === 'tau_stealth_battlesuit')!;
    ['FLYING', 'INFILTRATOR', 'STEALTH', 'VEHICLE'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Crisis Battlesuit has FLYING, LARGE, STRONG, TOUGH, VEHICLE', () => {
    const u = faction!.units.find(u => u.id === 'tau_crisis_battlesuit')!;
    ['FLYING', 'LARGE', 'STRONG', 'TOUGH', 'VEHICLE'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Broadside Battlesuit: baseCost 125, movement 5, ranged +1, melee 0, armour -3', () => {
    const u = faction!.units.find(u => u.id === 'tau_broadside_battlesuit')!;
    expect(u.baseCost).toBe(125);
    expect(u.stats.movement).toBe(5);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(-3);
    ['LARGE', 'NO PROMOTION', 'STRONG', 'T\'AU', 'TOUGH', 'VEHICLE'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Kill Broker: baseCost 75, movement 6, ranged +2, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'tau_kill_broker')!;
    expect(u.baseCost).toBe(75);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
    ['ELITE', 'KROOT', 'STEALTH', 'T\'AU'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Krootox Rider: baseCost 115, movement 6, ranged +1, melee +2, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'tau_krootox_rider')!;
    expect(u.baseCost).toBe(115);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(-1);
    ['LARGE', 'KROOT', 'LIMITED POTENTIAL', 'MOUNTED', 'T\'AU', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });
});

// ============================================================================
// SECTION 9 – Orks unit data vs instruction file
// Source: .github/instructions/TrenchHammer – Xenos Factions/Orks.md
// ============================================================================

describe('Orks – unit data matches instruction file', () => {
  const faction = getFactionById('orks');

  it('faction exists', () => {
    expect(faction).toBeDefined();
  });

  const expectedUnits = [
    'or_warboss',
    'or_big_mek',
    'or_weirdboy',
    'or_gretchin',
    'or_boy',
    'or_nob',
    'or_squig',
    'or_deff_dread',
  ];
  expectedUnits.forEach(id => {
    it(`includes unit: ${id}`, () => {
      expect(faction!.units.find(u => u.id === id)).toBeDefined();
    });
  });

  it('Warboss: baseCost 85, movement 6, ranged +1, melee +3, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'or_warboss')!;
    expect(u.baseCost).toBe(85);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(3);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Big Mek: baseCost 70, movement 6, ranged +0, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'or_big_mek')!;
    expect(u.baseCost).toBe(70);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Weirdboy: baseCost 40, movement 6, ranged +0, melee +0, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'or_weirdboy')!;
    expect(u.baseCost).toBe(40);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Gretchin: baseCost 25, movement 6, ranged +1, melee -1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'or_gretchin')!;
    expect(u.baseCost).toBe(25);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(-1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Boy: baseCost 35, movement 6, ranged +0, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'or_boy')!;
    expect(u.baseCost).toBe(35);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Nob: baseCost 50, movement 6, ranged +0, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'or_nob')!;
    expect(u.baseCost).toBe(50);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Squig: baseCost 30, movement 6, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'or_squig')!;
    expect(u.baseCost).toBe(30);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Deff Dread: baseCost 180, movement 6, ranged +0, melee +2, armour -3', () => {
    const u = faction!.units.find(u => u.id === 'or_deff_dread')!;
    expect(u.baseCost).toBe(180);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(-3);
  });

  // Keyword checks
  it('Warboss has ELITE, LARGE, LEADER, ORK, STRONG, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'or_warboss')!;
    ['ELITE', 'LARGE', 'LEADER', 'ORK', 'STRONG', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Weirdboy has ELITE, ORK, PSYKER', () => {
    const u = faction!.units.find(u => u.id === 'or_weirdboy')!;
    ['ELITE', 'ORK'].forEach(kw => expect(u.keywords).toContain(kw));
    expect(u.keywords.some(kw => kw.startsWith('PSYKER'))).toBe(true);
  });

  it('Gretchin has ORK, STEALTH', () => {
    const u = faction!.units.find(u => u.id === 'or_gretchin')!;
    ['ORK', 'STEALTH'].forEach(kw => expect(u.keywords).toContain(kw));
  });

  it('Nob has LARGE, ORK, STRONG', () => {
    const u = faction!.units.find(u => u.id === 'or_nob')!;
    ['LARGE', 'ORK', 'STRONG'].forEach(kw => expect(u.keywords).toContain(kw));
  });

  it('Squig has BEAST, NO PROMOTION, ORK', () => {
    const u = faction!.units.find(u => u.id === 'or_squig')!;
    ['BEAST', 'NO PROMOTION', 'ORK'].forEach(kw => expect(u.keywords).toContain(kw));
  });

  it('Deff Dread has NEGATE SHRAPNEL, NO PROMOTION, STRONG, TOUGH, VEHICLE', () => {
    const u = faction!.units.find(u => u.id === 'or_deff_dread')!;
    ['NEGATE SHRAPNEL', 'NO PROMOTION', 'STRONG', 'TOUGH', 'VEHICLE'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });
});

// ============================================================================
// SECTION 10 – Drukhari unit data vs instruction file
// Source: .github/instructions/TrenchHammer – Xenos Factions/Drukhari.md
// ============================================================================

describe('Drukhari – unit data matches instruction file', () => {
  const faction = getFactionById('drukhari');

  it('faction exists', () => {
    expect(faction).toBeDefined();
  });

  const expectedUnits = [
    'dr_archon',
    'dr_haemonculus',
    'dr_succubus',
    'dr_kabalite_warrior',
    'dr_incubus',
    'dr_wrack',
    'dr_wych',
    'dr_reaver',
    'dr_cronos',
    'dr_talos',
  ];
  expectedUnits.forEach(id => {
    it(`includes unit: ${id}`, () => {
      expect(faction!.units.find(u => u.id === id)).toBeDefined();
    });
  });

  it('Archon: baseCost 85, movement 7, ranged +3, melee +3, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'dr_archon')!;
    expect(u.baseCost).toBe(85);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(3);
    expect(u.stats.meleeSkill).toBe(3);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Haemonculus: baseCost 105, movement 7, ranged +2, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'dr_haemonculus')!;
    expect(u.baseCost).toBe(105);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Succubus: baseCost 75, movement 8, ranged +2, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'dr_succubus')!;
    expect(u.baseCost).toBe(75);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Kabalite Warrior: baseCost 50, movement 7, ranged +1, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'dr_kabalite_warrior')!;
    expect(u.baseCost).toBe(50);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Incubus: baseCost 65, movement 7, ranged +1, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'dr_incubus')!;
    expect(u.baseCost).toBe(65);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Wrack: baseCost 65, movement 7, ranged +1, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'dr_wrack')!;
    expect(u.baseCost).toBe(65);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Wych: baseCost 60, movement 8, ranged +1, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'dr_wych')!;
    expect(u.baseCost).toBe(60);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Reaver: baseCost 90, movement 10, ranged +1, melee +1, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'dr_reaver')!;
    expect(u.baseCost).toBe(90);
    expect(u.stats.movement).toBe(10);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-1);
  });

  // Keyword checks
  it('Archon has DRUKHARI, ELITE, LEADER, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'dr_archon')!;
    ['DRUKHARI', 'ELITE', 'LEADER', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Haemonculus has DRUKHARI, ELITE, FEAR', () => {
    const u = faction!.units.find(u => u.id === 'dr_haemonculus')!;
    ['DRUKHARI', 'ELITE', 'FEAR'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Incubus has DRUKHARI, FEAR', () => {
    const u = faction!.units.find(u => u.id === 'dr_incubus')!;
    ['DRUKHARI', 'FEAR'].forEach(kw => expect(u.keywords).toContain(kw));
  });

  it('Reaver has DRUKHARI, FLYING, INFILTRATOR, SKIRMISHER, VEHICLE', () => {
    const u = faction!.units.find(u => u.id === 'dr_reaver')!;
    ['DRUKHARI', 'FLYING', 'INFILTRATOR', 'SKIRMISHER', 'VEHICLE'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Cronos: baseCost 150, movement 7, ranged +2, melee +1, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'dr_cronos')!;
    expect(u.baseCost).toBe(150);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-2);
    ['ARTIFICIAL', 'DRUKHARI', 'FLYING', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Talos: baseCost 150, movement 7, ranged +1, melee +2, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'dr_talos')!;
    expect(u.baseCost).toBe(150);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(-2);
    ['ARTIFICIAL', 'DRUKHARI', 'FLYING', 'LARGE', 'NO PROMOTION', 'STRONG', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });
});

// ============================================================================
// SECTION 11 – Aeldari unit data vs instruction file
// Source: .github/instructions/TrenchHammer – Xenos Factions/Aeldari.md
// ============================================================================

describe('Aeldari – unit data matches instruction file', () => {
  const faction = getFactionById('aeldari');

  it('faction exists', () => {
    expect(faction).toBeDefined();
  });

  const expectedUnits = [
    'ael_autarch',
    'ael_seer',
    'ael_warlock',
    'ael_guardian',
    'ael_aspect_warrior',
    'ael_windrider',
    'ael_wraith',
    'ael_dragonlord',
    'ael_dragon_knight',
    'ael_wraithseer',
    'ael_wraithlord',
  ];
  expectedUnits.forEach(id => {
    it(`includes unit: ${id}`, () => {
      expect(faction!.units.find(u => u.id === id)).toBeDefined();
    });
  });

  it('Autarch: baseCost 75, movement 7, ranged +3, melee +3, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'ael_autarch')!;
    expect(u.baseCost).toBe(75);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(3);
    expect(u.stats.meleeSkill).toBe(3);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Seer: baseCost 65, movement 7, ranged +2, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'ael_seer')!;
    expect(u.baseCost).toBe(65);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Warlock: baseCost 45, movement 7, ranged +1, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'ael_warlock')!;
    expect(u.baseCost).toBe(45);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Guardian: baseCost 45, movement 7, ranged +1, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'ael_guardian')!;
    expect(u.baseCost).toBe(45);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Aspect Warrior: baseCost 65, movement 7, ranged +2, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'ael_aspect_warrior')!;
    expect(u.baseCost).toBe(65);
    expect(u.stats.movement).toBe(7);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Windrider: baseCost 90, movement 10, ranged +1, melee +1, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'ael_windrider')!;
    expect(u.baseCost).toBe(90);
    expect(u.stats.movement).toBe(10);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-1);
  });

  it('Wraith: baseCost 120, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'ael_wraith')!;
    expect(u.baseCost).toBe(120);
    expect(u.stats.armourSave).toBe(-2);
  });

  it('Dragonlord: baseCost 110, movement 8, ranged +3, melee +3, armour 0, MOUNTED LEADER', () => {
    const u = faction!.units.find(u => u.id === 'ael_dragonlord')!;
    expect(u.baseCost).toBe(110);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(3);
    expect(u.stats.meleeSkill).toBe(3);
    expect(u.stats.armourSave).toBe(0);
    ['AELDARI', 'ELITE', 'LARGE', 'LEADER', 'MOUNTED', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Dragon Knight: baseCost 85, movement 8, ranged +2, melee +2, armour 0, MOUNTED LARGE', () => {
    const u = faction!.units.find(u => u.id === 'ael_dragon_knight')!;
    expect(u.baseCost).toBe(85);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
    ['AELDARI', 'LARGE', 'MOUNTED'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Wraithseer: baseCost 145, movement 6, ranged +2, melee +2, armour -3, PSYKER VEHICLE', () => {
    const u = faction!.units.find(u => u.id === 'ael_wraithseer')!;
    expect(u.baseCost).toBe(145);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(-3);
    ['AELDARI', 'ELITE', 'LARGE', 'STRONG', 'TOUGH', 'VEHICLE'].forEach(kw =>
      expect(u.keywords).toContain(kw));
    expect(u.keywords.some(kw => kw.startsWith('PSYKER'))).toBe(true);
  });

  it('Wraithlord: baseCost 140, movement 6, ranged +2, melee +2, armour -3, NO PROMOTION VEHICLE', () => {
    const u = faction!.units.find(u => u.id === 'ael_wraithlord')!;
    expect(u.baseCost).toBe(140);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(-3);
    ['AELDARI', 'LARGE', 'NO PROMOTION', 'STRONG', 'VEHICLE'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  // Keyword checks
  it('Autarch has AELDARI, ELITE, LEADER, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'ael_autarch')!;
    ['AELDARI', 'ELITE', 'LEADER', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Seer has AELDARI, ELITE, PSYKER', () => {
    const u = faction!.units.find(u => u.id === 'ael_seer')!;
    ['AELDARI', 'ELITE'].forEach(kw => expect(u.keywords).toContain(kw));
    expect(u.keywords.some(kw => kw.startsWith('PSYKER'))).toBe(true);
  });

  it('Warlock has AELDARI, ELITE, PSYKER', () => {
    const u = faction!.units.find(u => u.id === 'ael_warlock')!;
    ['AELDARI', 'ELITE'].forEach(kw => expect(u.keywords).toContain(kw));
    expect(u.keywords.some(kw => kw.startsWith('PSYKER'))).toBe(true);
  });

  it('Windrider has AELDARI, FLYING, VEHICLE', () => {
    const u = faction!.units.find(u => u.id === 'ael_windrider')!;
    ['AELDARI', 'FLYING', 'VEHICLE'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });
});

// ============================================================================
// SECTION 12 – Chaos Daemons unit data vs instruction file
// Source: .github/instructions/TrenchHammer – Chaos Factions/Chaos Daemons.md
// ============================================================================

describe('Chaos Daemons – unit data matches instruction file', () => {
  const faction = getFactionById('chaos_daemons');

  it('faction exists', () => {
    expect(faction).toBeDefined();
  });

  const expectedUnits = [
    'cd_daemon_prince',
    'cd_chaos_furie',
    'cd_bloodmaster',
    'cd_skullmaster',
    'cd_bloodletter',
    'cd_flesh_hound',
    'cd_infernal_enrapturess',
    'cd_tranceweaver',
    'cd_daemonette',
    'cd_seeker',
    'cd_contorted_epitome',
    'cd_poxbringer',
    'cd_spoilpox_scrivener',
    'cd_plaguebearer',
    'cd_nurgling_swarm',
    'cd_plague_drone_rider',
    'cd_changecaster',
    'cd_flamer',
    'cd_blue_horror',
    'cd_pink_horror',
    'cd_screamer',
  ];
  expectedUnits.forEach(id => {
    it(`includes unit: ${id}`, () => {
      expect(faction!.units.find(u => u.id === id)).toBeDefined();
    });
  });

  it('Daemon Prince: baseCost 210, movement 8, ranged +2, melee +2, armour -3', () => {
    const u = faction!.units.find(u => u.id === 'cd_daemon_prince')!;
    expect(u.baseCost).toBe(210);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(-3);
  });

  it('Chaos Furie: baseCost 70, movement 10, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'cd_chaos_furie')!;
    expect(u.baseCost).toBe(70);
    expect(u.stats.movement).toBe(10);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Bloodmaster: baseCost 70, movement 6, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'cd_bloodmaster')!;
    expect(u.baseCost).toBe(70);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Skullmaster: baseCost 90, movement 8, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'cd_skullmaster')!;
    expect(u.baseCost).toBe(90);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Bloodletter: baseCost 50, movement 6, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'cd_bloodletter')!;
    expect(u.baseCost).toBe(50);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Flesh Hound: baseCost 100, movement 8, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'cd_flesh_hound')!;
    expect(u.baseCost).toBe(100);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Infernal Enrapturess: baseCost 115, movement 8, ranged +2, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'cd_infernal_enrapturess')!;
    expect(u.baseCost).toBe(115);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Tranceweaver: baseCost 70, movement 8, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'cd_tranceweaver')!;
    expect(u.baseCost).toBe(70);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Daemonette: baseCost 60, movement 8, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'cd_daemonette')!;
    expect(u.baseCost).toBe(60);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Seeker: baseCost 95, movement 10, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'cd_seeker')!;
    expect(u.baseCost).toBe(95);
    expect(u.stats.movement).toBe(10);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  // Keyword checks
  it('Daemon Prince has DAEMON, ELITE, LARGE, LEADER, STRONG, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'cd_daemon_prince')!;
    ['DAEMON', 'ELITE', 'LARGE', 'LEADER', 'STRONG', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Chaos Furie has DAEMON, FLYING, UNDIVIDED', () => {
    const u = faction!.units.find(u => u.id === 'cd_chaos_furie')!;
    ['DAEMON', 'FLYING', 'UNDIVIDED'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Bloodmaster has DAEMON, ELITE, KHORNE, LEADER, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'cd_bloodmaster')!;
    ['DAEMON', 'ELITE', 'KHORNE', 'LEADER', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Flesh Hound has DAEMON, LARGE, NO PROMOTION, KHORNE', () => {
    const u = faction!.units.find(u => u.id === 'cd_flesh_hound')!;
    ['DAEMON', 'LARGE', 'NO PROMOTION', 'KHORNE'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Infernal Enrapturess has DAEMON, ELITE, LARGE, LEADER, SLAANESH, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'cd_infernal_enrapturess')!;
    ['DAEMON', 'ELITE', 'LARGE', 'LEADER', 'SLAANESH', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Tranceweaver has DAEMON, ELITE, PSYKER, SLAANESH', () => {
    const u = faction!.units.find(u => u.id === 'cd_tranceweaver')!;
    ['DAEMON', 'ELITE', 'SLAANESH'].forEach(kw => expect(u.keywords).toContain(kw));
    expect(u.keywords.some(kw => kw.startsWith('PSYKER'))).toBe(true);
  });

  it('Daemonette has DAEMON, FEAR, SLAANESH', () => {
    const u = faction!.units.find(u => u.id === 'cd_daemonette')!;
    ['DAEMON', 'FEAR', 'SLAANESH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Seeker has DAEMON, LARGE, INFILTRATOR, SLAANESH', () => {
    const u = faction!.units.find(u => u.id === 'cd_seeker')!;
    ['DAEMON', 'LARGE', 'INFILTRATOR', 'SLAANESH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  // --- Slaanesh extras ---
  it('Contorted Epitome: baseCost 85, movement 8, melee +1, armour 0, LARGE SLAANESH', () => {
    const u = faction!.units.find(u => u.id === 'cd_contorted_epitome')!;
    expect(u.baseCost).toBe(85);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'LARGE', 'SLAANESH'].forEach(kw => expect(u.keywords).toContain(kw));
  });

  // --- Nurgle ---
  it('Poxbringer: baseCost 70, movement 6, ranged +1, melee +2, armour 0, NURGLE PSYKER', () => {
    const u = faction!.units.find(u => u.id === 'cd_poxbringer')!;
    expect(u.baseCost).toBe(70);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'LEADER', 'NURGLE', 'TOUGH'].forEach(kw => expect(u.keywords).toContain(kw));
    expect(u.keywords.some(kw => kw.startsWith('PSYKER'))).toBe(true);
  });

  it('Spoilpox Scrivener: baseCost 70, movement 6, ranged +1, melee +1, armour 0, LARGE NURGLE', () => {
    const u = faction!.units.find(u => u.id === 'cd_spoilpox_scrivener')!;
    expect(u.baseCost).toBe(70);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'LARGE', 'NURGLE'].forEach(kw => expect(u.keywords).toContain(kw));
  });

  it('Plaguebearer: baseCost 50, movement 6, melee +1, armour 0, NURGLE', () => {
    const u = faction!.units.find(u => u.id === 'cd_plaguebearer')!;
    expect(u.baseCost).toBe(50);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'NURGLE'].forEach(kw => expect(u.keywords).toContain(kw));
  });

  it('Nurgling Swarm: baseCost 55, movement 6, armour 0, SWARM NURGLE LARGE', () => {
    const u = faction!.units.find(u => u.id === 'cd_nurgling_swarm')!;
    expect(u.baseCost).toBe(55);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'LARGE', 'LIMITED POTENTIAL', 'NURGLE', 'SWARM', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Plague Drone Rider: baseCost 110, movement 8, armour 0, FLYING NURGLE LARGE', () => {
    const u = faction!.units.find(u => u.id === 'cd_plague_drone_rider')!;
    expect(u.baseCost).toBe(110);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'FEAR', 'FLYING', 'LARGE', 'NURGLE', 'TOUGH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  // --- Tzeentch ---
  it('Changecaster: baseCost 75, movement 6, ranged +2, melee +1, armour 0, TZEENTCH PSYKER', () => {
    const u = faction!.units.find(u => u.id === 'cd_changecaster')!;
    expect(u.baseCost).toBe(75);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'ELITE', 'LEADER', 'TOUGH', 'TZEENTCH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
    expect(u.keywords.some(kw => kw.startsWith('PSYKER'))).toBe(true);
  });

  it('Flamer: baseCost 120, movement 8, ranged +2, melee +1, armour 0, FLYING TZEENTCH', () => {
    const u = faction!.units.find(u => u.id === 'cd_flamer')!;
    expect(u.baseCost).toBe(120);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'ELITE', 'FLYING', 'TZEENTCH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Blue Horror: baseCost 45, movement 6, ranged +1, melee 0, armour 0, TZEENTCH', () => {
    const u = faction!.units.find(u => u.id === 'cd_blue_horror')!;
    expect(u.baseCost).toBe(45);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'LIMITED POTENTIAL', 'TZEENTCH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });

  it('Pink Horror: baseCost 150, movement 6, ranged +2, melee +1, armour 0, TZEENTCH', () => {
    const u = faction!.units.find(u => u.id === 'cd_pink_horror')!;
    expect(u.baseCost).toBe(150);
    expect(u.stats.movement).toBe(6);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'TZEENTCH'].forEach(kw => expect(u.keywords).toContain(kw));
  });

  it('Screamer: baseCost 70, movement 10, melee +1, armour 0, FLYING NO PROMOTION TZEENTCH', () => {
    const u = faction!.units.find(u => u.id === 'cd_screamer')!;
    expect(u.baseCost).toBe(70);
    expect(u.stats.movement).toBe(10);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
    ['DAEMON', 'FLYING', 'NO PROMOTION', 'TZEENTCH'].forEach(kw =>
      expect(u.keywords).toContain(kw));
  });
});
// ============================================================================
// SECTION 6 – Hand Slot Validation (faction weapon lookup regression)
//
// Root-cause: wargearSlotValidation.ts built ALL_WEAPONS from the shared shared
// arrays only + empty `specializedWeapons`, so lookupWeapon() returned undefined
// for every faction-specific weapon.  computeSlotUsage() skipped unknown weapons
// with `if (!weapon) continue`, meaning two-handed faction weapons cost 0 hands
// and could be stacked without limit.
//
// Fix: ALL_WEAPONS = allWeapons (the canonical complete export from weapons.ts).
// ============================================================================

/** Minimal SelectedWargear fixture for the validation helpers. */
function sw(id: string): SelectedWargear {
  return { id, name: id, cost: 0, type: 'weapon', quantity: 1 };
}

describe('Hand slot validation – lookupWeapon resolves faction-specific weapons', () => {
  const samples: { id: string; faction: string }[] = [
    // Aeldari
    { id: 'shuriken_catapult',           faction: 'Aeldari' },
    { id: 'shuriken_rifle',              faction: 'Aeldari' },
    { id: 'avenger_shuriken_catapult',   faction: 'Aeldari' },
    // Harlequins
    { id: 'harlequins_kiss',             faction: 'Harlequins' },
    { id: 'harlequins_embrace',          faction: 'Harlequins' },
    { id: 'shrieker_cannon',             faction: 'Harlequins' },
    { id: 'haywire_cannon_harlequins',   faction: 'Harlequins' },
    { id: 'bright_lance_harlequins',     faction: 'Harlequins' },
    { id: 'fusion_pistol_harlequins',    faction: 'Harlequins' },
    { id: 'hallucinogen_grenade_launcher', faction: 'Harlequins' },
    { id: 'jesters_blade',               faction: 'Harlequins' },
    // Slanni
    { id: 'slanni_flamer',               faction: 'Slanni' },
  ];

  samples.forEach(({ id, faction }) => {
    it(`lookupWeapon('${id}') [${faction}] returns a weapon object`, () => {
      const w = lookupWeapon(id);
      expect(w).toBeDefined();
      expect(w!.id).toBe(id);
    });
  });
});

describe('Hand slot validation – getWeaponHandedness detects two-handed faction weapons', () => {
  const twoHandedIds = [
    'shuriken_catapult',           // Aeldari ranged
    'shuriken_rifle',              // Aeldari ranged
    'avenger_shuriken_catapult',   // Aeldari ranged
    'shrieker_cannon',             // Harlequins heavy ranged
    'haywire_cannon_harlequins',   // Harlequins heavy ranged
    'bright_lance_harlequins',     // Harlequins heavy ranged
    'hallucinogen_grenade_launcher', // Harlequins basic ranged
    'jesters_blade',               // Harlequins melee
    'slanni_flamer',               // Slanni ranged
  ];

  twoHandedIds.forEach(id => {
    it(`getWeaponHandedness('${id}') === 'two-handed'`, () => {
      const w = lookupWeapon(id);
      expect(w).toBeDefined();
      expect(getWeaponHandedness(w!)).toBe('two-handed');
    });
  });
});

describe('Hand slot validation – MAIN HAND ONLY faction weapons are detected correctly', () => {
  const mainHandIds = ['harlequins_kiss', 'harlequins_embrace'];

  mainHandIds.forEach(id => {
    it(`lookupWeapon('${id}') has MAIN HAND ONLY keyword or isMainHandOnly flag`, () => {
      const w = lookupWeapon(id);
      expect(w).toBeDefined();
      const isMainHand = w!.isMainHandOnly === true || w!.keywords.includes('MAIN HAND ONLY');
      expect(isMainHand).toBe(true);
    });
  });
});

describe('Hand slot validation – two-handed ranged weapons block further ranged assignments', () => {
  it('empty loadout: adding shuriken_catapult (2H ranged) is allowed', () => {
    const errors = validateAddWargear([], 'shuriken_catapult');
    const slotErrors = errors.filter(e =>
      e.code === 'NO_RANGED_HANDS_TWO' || e.code === 'NO_RANGED_HANDS_ONE',
    );
    expect(slotErrors).toHaveLength(0);
  });

  it('after shuriken_catapult: adding shuriken_rifle (2H ranged) is blocked with NO_RANGED_HANDS_TWO', () => {
    const current = [sw('shuriken_catapult')];
    const errors = validateAddWargear(current, 'shuriken_rifle');
    expect(errors.some(e => e.code === 'NO_RANGED_HANDS_TWO')).toBe(true);
  });

  it('after shuriken_catapult: adding a pistol (fusion_pistol_harlequins) is blocked with TWO_HANDED_RANGED_CONFLICT', () => {
    const current = [sw('shuriken_catapult')];
    const errors = validateAddWargear(current, 'fusion_pistol_harlequins');
    expect(errors.some(e => e.code === 'TWO_HANDED_RANGED_CONFLICT')).toBe(true);
  });

  it('after shrieker_cannon: adding haywire_cannon_harlequins (2H ranged) is blocked', () => {
    const current = [sw('shrieker_cannon')];
    const errors = validateAddWargear(current, 'haywire_cannon_harlequins');
    expect(errors.some(e => e.code === 'NO_RANGED_HANDS_TWO')).toBe(true);
  });

  it('after slanni_flamer: adding shuriken_catapult (2H ranged) is blocked', () => {
    const current = [sw('slanni_flamer')];
    const errors = validateAddWargear(current, 'shuriken_catapult');
    expect(errors.some(e => e.code === 'NO_RANGED_HANDS_TWO')).toBe(true);
  });
});

describe('Hand slot validation – two-handed melee weapons block further melee assignments', () => {
  it('empty loadout: adding jesters_blade (2H melee) is allowed', () => {
    const errors = validateAddWargear([], 'jesters_blade');
    const slotErrors = errors.filter(e =>
      e.code === 'NO_MELEE_HANDS_TWO' || e.code === 'NO_MELEE_HANDS_ONE',
    );
    expect(slotErrors).toHaveLength(0);
  });

  it('after jesters_blade: adding another 2H melee weapon is blocked with NO_MELEE_HANDS_TWO', () => {
    const current = [sw('jesters_blade')];
    const errors = validateAddWargear(current, 'jesters_blade');
    expect(errors.some(e => e.code === 'NO_MELEE_HANDS_TWO')).toBe(true);
  });

  it('after jesters_blade (2H): adding harlequins_kiss (1H MAIN HAND ONLY) is blocked', () => {
    const current = [sw('jesters_blade')];
    const errors = validateAddWargear(current, 'harlequins_kiss');
    // Either NO_MELEE_HANDS_ONE or NO_MELEE_HANDS_TWO must trigger
    const blocked = errors.some(e =>
      e.code === 'NO_MELEE_HANDS_ONE' || e.code === 'NO_MELEE_HANDS_TWO',
    );
    expect(blocked).toBe(true);
  });
});

describe('Hand slot validation – validateLoadout catches overflow for faction weapon loadouts', () => {
  it('loadout with two 2H ranged faction weapons is invalid (RANGED_HANDS_EXCEEDED)', () => {
    const items = [sw('shuriken_catapult'), sw('shuriken_rifle')];
    const result = validateLoadout(items);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.code === 'RANGED_HANDS_EXCEEDED')).toBe(true);
  });

  it('loadout with two 2H melee faction weapons is invalid (MELEE_HANDS_EXCEEDED)', () => {
    const items = [sw('jesters_blade'), sw('jesters_blade')];
    const result = validateLoadout(items);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.code === 'MELEE_HANDS_EXCEEDED')).toBe(true);
  });

  it('loadout with single 2H ranged and single 2H melee faction weapons is valid', () => {
    const items = [sw('shuriken_catapult'), sw('jesters_blade')];
    const result = validateLoadout(items);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('loadout with single 2H ranged faction weapon alone is valid', () => {
    const items = [sw('shuriken_catapult')];
    const result = validateLoadout(items);
    expect(result.isValid).toBe(true);
  });

  it('computeSlotUsage correctly charges 2 ranged hands for shuriken_catapult (was 0 before fix)', () => {
    const items = [sw('shuriken_catapult')];
    const result = validateLoadout(items);
    expect(result.usage.rangedHandsUsed).toBe(2);
    expect(result.usage.hasTwoHandedRanged).toBe(true);
  });

  it('computeSlotUsage correctly charges 2 melee hands for jesters_blade (was 0 before fix)', () => {
    const items = [sw('jesters_blade')];
    const result = validateLoadout(items);
    expect(result.usage.meleeHandsUsed).toBe(2);
  });
});

// ============================================================================
// SECTION 7 – Faction pool desync regression tests
//
// Verified fixes:
//   A. plasma_blade + las_cutter promoted from missing to SPECIAL_MELEE_IDS
//   B. harpoon_launcher + krumper_rivet_cannon + seismic_cannon added to HEAVY_RANGED_IDS
//   C. Duplicate cleanup: las_cutter removed from PIRATE_CREW / NECROMUNDA specific IDs,
//      plasma_blade removed from VERMINTIDE specific IDs
// ============================================================================

describe('Shared pool desync fixes – SPECIAL_MELEE_IDS additions', () => {
  const imperialFactions = ['adeptus_astartes', 'astra_militarum', 'adeptus_custodes', 'adeptus_mechanicus', 'the_inquisition'];
  const chaosFactions = ['heretic_astartes', 'chaos_cult'];
  const xenosFactions = ['harlequins', 'leagues_of_votann', 'aeldari', 'slanni'];
  const allFactions = [...imperialFactions, ...chaosFactions, ...xenosFactions];

  ['plasma_blade', 'las_cutter'].forEach(weaponId => {
    allFactions.forEach(factionId => {
      it(`${factionId} pool contains '${weaponId}' (now in SPECIAL_MELEE_IDS)`, () => {
        const pool = getAllowedWargearIds(factionId, `unit_dummy_${factionId}`);
        expect(pool).toBeDefined();
        expect(pool!.includes(weaponId)).toBe(true);
      });
    });
  });

  it('las_cutter appears exactly once in pirate_crew pool (no duplicate after cleanup)', () => {
    const pool = getAllowedWargearIds('pirate_crew', 'unit_dummy');
    expect(pool).toBeDefined();
    const count = pool!.filter(id => id === 'las_cutter').length;
    expect(count).toBe(1);
  });

  it('las_cutter appears exactly once in necromunda_gang pool (no duplicate after cleanup)', () => {
    const pool = getAllowedWargearIds('necromunda_gang', 'unit_dummy');
    expect(pool).toBeDefined();
    const count = pool!.filter(id => id === 'las_cutter').length;
    expect(count).toBe(1);
  });

  it('plasma_blade appears exactly once in the_vermintide pool (no duplicate after cleanup)', () => {
    const pool = getAllowedWargearIds('the_vermintide', 'unit_dummy');
    expect(pool).toBeDefined();
    const count = pool!.filter(id => id === 'plasma_blade').length;
    expect(count).toBe(1);
  });
});

describe('Shared pool desync fixes – HEAVY_RANGED_IDS additions', () => {
  // HEAVY_RANGED_IDS is spread into IMPERIAL_ALL and CHAOS_ALL only.
  // XENOS factions use a hand-crafted XENOS_ELITE base that lists specific heavy weapons
  // individually, so they are tested separately via their own faction weapon ID arrays.
  const imperialFactions = ['adeptus_astartes', 'astra_militarum', 'adeptus_custodes', 'adeptus_mechanicus', 'the_inquisition', 'grey_knights', 'adepta_sororitas'];
  const chaosFactions = ['heretic_astartes', 'chaos_cult'];
  const imperialChaosFactions = [...imperialFactions, ...chaosFactions];

  ['harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon'].forEach(weaponId => {
    imperialChaosFactions.forEach(factionId => {
      it(`${factionId} pool contains '${weaponId}' (now in HEAVY_RANGED_IDS → IMPERIAL_ALL/CHAOS_ALL)`, () => {
        const pool = getAllowedWargearIds(factionId, `unit_dummy_${factionId}`);
        expect(pool).toBeDefined();
        expect(pool!.includes(weaponId)).toBe(true);
      });
    });
  });

  // GANGER-based factions get harpoon_launcher and seismic_cannon via faction-specific IDs
  it('pirate_crew pool contains harpoon_launcher (via PIRATE_CREW_SPECIFIC_IDS)', () => {
    const pool = getAllowedWargearIds('pirate_crew', 'unit_dummy');
    expect(pool!.includes('harpoon_launcher')).toBe(true);
  });

  it('necromunda_gang pool contains harpoon_launcher (via NECROMUNDA_GANG_SPECIFIC_IDS)', () => {
    const pool = getAllowedWargearIds('necromunda_gang', 'unit_dummy');
    expect(pool!.includes('harpoon_launcher')).toBe(true);
  });

  it('genestealer_cults pool contains seismic_cannon (via GENESTEALER_CULTS_SPECIFIC_IDS)', () => {
    const pool = getAllowedWargearIds('genestealer_cults', 'unit_dummy');
    expect(pool!.includes('seismic_cannon')).toBe(true);
  });
});
