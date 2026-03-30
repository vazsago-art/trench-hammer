/**
 * restrictedTo.test.ts
 *
 * Verifies two concerns:
 *
 * 1. filterRestricted() logic – the pure filtering function extracted here
 *    to match the implementation in WargearPanel.tsx exactly.
 *
 * 2. Data integrity – every weapon / equipment item that the instruction files
 *    mark as "Elite Only", "Terminator Only", etc. carries the correct
 *    `restrictedTo` array so WargearPanel shows it only to valid models.
 *
 * Factions / weapon arrays covered:
 *   Shared (force_weapon, fell_dagger, demon_weapon)
 *   Death Guard (great_plague_blade_dg, plaguespurt_gauntlet_dg)
 *   Necrons (gauntlet_of_fire_nec, lords_blade_nec, voidblade, warscythe, staffs …)
 *   Orks (twin_slugga, big_shoota, twin_killsaw)
 *   Drukhari (agoniser_drukhari, demiklaives_drukhari, klaive_drukhari)
 *   Aeldari Aspect weapons (avenger_shuriken_catapult, death_spinner_aeldari …)
 *   Tyranids (piercing_claw, rending_claw, slayer_sabre, toxinjector_harpoon)
 *   Equipment (abhorrent_pheromones, acid_blood, bioplasma_discharger …)
 */

import { describe, it, expect } from 'vitest';
import { allWeapons } from '../data/weapons.js';
import { allEquipmentWithHA } from '../data/equipment.js';

// ============================================================================
// Replicate filterRestricted() exactly as it lives in WargearPanel.tsx
// This makes the test self-contained and independent of the React component.
// ============================================================================

function makeFilterRestricted(modelKeywords: string[]) {
  const kws = modelKeywords.map(k => k.toUpperCase());
  const hasKw = (cond: string) => kws.some(k => k === cond || k.startsWith(cond + ' '));

  return function filterRestricted<T extends { restrictedTo?: string[] }>(items: T[]): T[] {
    return items.filter(item => {
      if (!item.restrictedTo || item.restrictedTo.length === 0) return true;
      return item.restrictedTo.every(cond => {
        if (cond.startsWith('NOT:')) {
          const forbidden = cond.slice(4).toUpperCase();
          return !hasKw(forbidden);
        }
        if (cond.includes('|')) {
          return cond.toUpperCase().split('|').some(k => hasKw(k.trim()));
        }
        return hasKw(cond.toUpperCase());
      });
    });
  };
}

// ============================================================================
// Helper: look up weapon / equipment once
// ============================================================================

function weapon(id: string) {
  const w = allWeapons.find(x => x.id === id);
  if (!w) throw new Error(`weapon "${id}" not found in allWeapons`);
  return w;
}

function equip(id: string) {
  const e = allEquipmentWithHA.find(x => x.id === id);
  if (!e) throw new Error(`equipment "${id}" not found in allEquipmentWithHA`);
  return e;
}

// ============================================================================
// SECTION 1 – filterRestricted() unit tests (logic correctness)
// ============================================================================

describe('filterRestricted – AND gate (single keyword)', () => {
  const item = { id: 'test', restrictedTo: ['ELITE'] };

  it('passes when model has the required keyword', () => {
    const filter = makeFilterRestricted(['ELITE', 'TROOP']);
    expect(filter([item])).toHaveLength(1);
  });

  it('blocks when model lacks the required keyword', () => {
    const filter = makeFilterRestricted(['TROOP']);
    expect(filter([item])).toHaveLength(0);
  });

  it('passes an unrestricted item regardless of model keywords', () => {
    const plain = { id: 'plain', restrictedTo: [] };
    const filter = makeFilterRestricted([]);
    expect(filter([plain])).toHaveLength(1);
  });

  it('passes when restrictedTo is undefined', () => {
    const noRestriction = { id: 'norestrict' } as { id: string; restrictedTo?: string[] };
    const filter = makeFilterRestricted([]);
    expect(filter([noRestriction])).toHaveLength(1);
  });
});

describe('filterRestricted – NOT: prefix', () => {
  const item = { id: 'test', restrictedTo: ['NOT:VEHICLE'] };

  it('passes when model does NOT have the forbidden keyword', () => {
    const filter = makeFilterRestricted(['ELITE']);
    expect(filter([item])).toHaveLength(1);
  });

  it('blocks when model has the forbidden keyword', () => {
    const filter = makeFilterRestricted(['VEHICLE']);
    expect(filter([item])).toHaveLength(0);
  });
});

describe('filterRestricted – OR group (pipe-separated)', () => {
  const item = { id: 'test', restrictedTo: ['ELITE|VEHICLE'] };

  it('passes when model has the first keyword in the group', () => {
    const filter = makeFilterRestricted(['ELITE']);
    expect(filter([item])).toHaveLength(1);
  });

  it('passes when model has the second keyword in the group', () => {
    const filter = makeFilterRestricted(['VEHICLE']);
    expect(filter([item])).toHaveLength(1);
  });

  it('blocks when model has neither keyword in the group', () => {
    const filter = makeFilterRestricted(['TROOP']);
    expect(filter([item])).toHaveLength(0);
  });
});

describe('filterRestricted – combined AND + NOT conditions', () => {
  // Must have VEHICLE but must NOT have STEALTH (mirrors iridium_armour_tau)
  const item = { id: 'test', restrictedTo: ['VEHICLE', 'NOT:STEALTH'] };

  it('passes when model is VEHICLE and not STEALTH', () => {
    const filter = makeFilterRestricted(['VEHICLE']);
    expect(filter([item])).toHaveLength(1);
  });

  it('blocks when model is VEHICLE but also STEALTH', () => {
    const filter = makeFilterRestricted(['VEHICLE', 'STEALTH']);
    expect(filter([item])).toHaveLength(0);
  });

  it('blocks when model is neither VEHICLE nor STEALTH', () => {
    const filter = makeFilterRestricted(['ELITE']);
    expect(filter([item])).toHaveLength(0);
  });
});

describe('filterRestricted – combined AND: ELITE + VEHICLE (OR)', () => {
  // Requires ELITE AND (KROOT or VEHICLE)  — e.g. kroothawk_flock_tau
  const item = { id: 'test', restrictedTo: ['ELITE', 'KROOT|VEHICLE'] };

  it('passes when model is ELITE and KROOT', () => {
    const filter = makeFilterRestricted(['ELITE', 'KROOT']);
    expect(filter([item])).toHaveLength(1);
  });

  it('passes when model is ELITE and VEHICLE', () => {
    const filter = makeFilterRestricted(['ELITE', 'VEHICLE']);
    expect(filter([item])).toHaveLength(1);
  });

  it('blocks when model is ELITE but has neither KROOT nor VEHICLE', () => {
    const filter = makeFilterRestricted(['ELITE']);
    expect(filter([item])).toHaveLength(0);
  });

  it('blocks when model is KROOT but not ELITE', () => {
    const filter = makeFilterRestricted(['KROOT']);
    expect(filter([item])).toHaveLength(0);
  });
});

// ============================================================================
// SECTION 2 – Weapons: Elite-Only (restrictedTo: ['ELITE'])
// ============================================================================

describe('Elite-Only weapons – restrictedTo is set correctly', () => {
  // Shared melee
  const eliteOnlyWeaponIds = [
    'demon_weapon',
    // Necrons
    'gauntlet_of_fire_nec',
    'lords_blade_nec',
    'voidblade',
    'warscythe',
    'abyssal_staff',
    'aeonstave',
    'eldritch_lance',
    'rod_of_covenant',
    'staff_of_light_nec',
    'tremorstave',
    'voltaic_staff',
    // Orks
    'twin_slugga',
    'big_shoota',
    'twin_killsaw',
    // Drukhari
    'agoniser_drukhari',
    'demiklaives_drukhari',
    'klaive_drukhari',
    // Aeldari Aspect weapons
    'avenger_shuriken_catapult',
    'death_spinner_aeldari',
    'dragon_fusion_gun',
    'firepike_aeldari',
    'lasblaster_aeldari',
    'death_weavers',
    'dragon_fusion_pistol',
    'sunpistol_aeldari',
    'banshee_blade',
    'power_blade_aeldari',
    'power_glaive_aeldari',
    'scorpion_chainsword',
    'paired_chainsabres',
    // Tyranids
    'piercing_claw',
    'rending_claw',
    'slayer_sabre',
    'toxinjector_harpoon',
  ];

  const eliteModel = makeFilterRestricted(['ELITE']);
  const troopModel = makeFilterRestricted(['TROOP']);

  eliteOnlyWeaponIds.forEach(id => {
    it(`"${id}" has restrictedTo: ['ELITE']`, () => {
      const w = weapon(id);
      expect(w.restrictedTo).toBeDefined();
      expect(w.restrictedTo).toContain('ELITE');
    });

    it(`"${id}" is shown to ELITE models`, () => {
      const w = weapon(id);
      expect(eliteModel([w])).toHaveLength(1);
    });

    it(`"${id}" is hidden from non-ELITE models`, () => {
      const w = weapon(id);
      expect(troopModel([w])).toHaveLength(0);
    });
  });
});

// ============================================================================
// SECTION 2b – Weapons: Elite+Psyker (restrictedTo: ['ELITE', 'PSYKER'])
// ============================================================================

describe('Elite+Psyker weapons – restrictedTo is set correctly', () => {
  const elitePsykerWeaponIds = ['force_weapon', 'fell_dagger', 'force_stave_ts'];

  const elitePsykerModel = makeFilterRestricted(['ELITE', 'PSYKER 3']);
  const eliteOnlyModel = makeFilterRestricted(['ELITE']);
  const troopModel = makeFilterRestricted(['TROOP']);

  elitePsykerWeaponIds.forEach(id => {
    it(`"${id}" has restrictedTo containing ELITE and PSYKER`, () => {
      const w = weapon(id);
      expect(w.restrictedTo).toBeDefined();
      expect(w.restrictedTo).toContain('ELITE');
      expect(w.restrictedTo).toContain('PSYKER');
    });

    it(`"${id}" is shown to ELITE PSYKER 3 models (prefix match)`, () => {
      const w = weapon(id);
      expect(elitePsykerModel([w])).toHaveLength(1);
    });

    it(`"${id}" is hidden from ELITE-only models (no PSYKER)`, () => {
      const w = weapon(id);
      expect(eliteOnlyModel([w])).toHaveLength(0);
    });

    it(`"${id}" is hidden from non-ELITE models`, () => {
      const w = weapon(id);
      expect(troopModel([w])).toHaveLength(0);
    });
  });
});

// ============================================================================
// SECTION 3 – Weapons with OR gates (ELITE|VEHICLE pattern)
// ============================================================================

describe('Elite OR Terminator weapons', () => {
  it('great_plague_blade_dg is restricted to ELITE|VEHICLE', () => {
    const w = weapon('great_plague_blade_dg');
    expect(w.restrictedTo).toBeDefined();
    // restrictedTo array must contain one entry with OR syntax for ELITE and VEHICLE
    const hasOrEntry = w.restrictedTo!.some(c => c.includes('|') &&
      c.toUpperCase().split('|').map(s => s.trim()).includes('ELITE') &&
      c.toUpperCase().split('|').map(s => s.trim()).includes('VEHICLE')
    );
    expect(hasOrEntry).toBe(true);
  });

  it('great_plague_blade_dg is shown to ELITE models', () => {
    const w = weapon('great_plague_blade_dg');
    const filter = makeFilterRestricted(['ELITE']);
    expect(filter([w])).toHaveLength(1);
  });

  it('great_plague_blade_dg is shown to VEHICLE (Terminator) models', () => {
    const w = weapon('great_plague_blade_dg');
    const filter = makeFilterRestricted(['VEHICLE']);
    expect(filter([w])).toHaveLength(1);
  });

  it('great_plague_blade_dg is hidden from plain TROOP models', () => {
    const w = weapon('great_plague_blade_dg');
    const filter = makeFilterRestricted(['TROOP']);
    expect(filter([w])).toHaveLength(0);
  });
});

describe('Terminator-Only weapons', () => {
  it('plaguespurt_gauntlet_dg is restricted to VEHICLE', () => {
    const w = weapon('plaguespurt_gauntlet_dg');
    expect(w.restrictedTo).toContain('VEHICLE');
  });

  it('plaguespurt_gauntlet_dg is shown to VEHICLE models', () => {
    const w = weapon('plaguespurt_gauntlet_dg');
    const filter = makeFilterRestricted(['VEHICLE']);
    expect(filter([w])).toHaveLength(1);
  });

  it('plaguespurt_gauntlet_dg is hidden from non-VEHICLE ELITE models', () => {
    const w = weapon('plaguespurt_gauntlet_dg');
    const filter = makeFilterRestricted(['ELITE']);
    expect(filter([w])).toHaveLength(0);
  });
});

// ============================================================================
// SECTION 4 – Equipment: Elite-Only items
// ============================================================================

describe('Elite-Only equipment – restrictedTo is set correctly', () => {
  const eliteOnlyEquipIds = [
    // Tyranids
    'abhorrent_pheromones',
    'acid_blood',
    'bioplasma_discharger',
    'bonded_exoskeleton',
    'flesh_hooks',
    // AA Campaign Shop
    'pelt_of_balewolf_aa',
    'visage_of_death_aa',
    // Orks
    'ded_ard_armour',
    'mega_armour_orks',
    'iron_gob_orks',
    // Venators
    'heavy_hunting_rig_venators',
  ];

  const eliteModel = makeFilterRestricted(['ELITE']);
  const troopModel = makeFilterRestricted(['TROOP']);

  eliteOnlyEquipIds.forEach(id => {
    it(`equipment "${id}" has restrictedTo containing 'ELITE'`, () => {
      const e = equip(id);
      expect(e.restrictedTo).toBeDefined();
      expect(e.restrictedTo).toContain('ELITE');
    });

    it(`equipment "${id}" is shown to ELITE models`, () => {
      const e = equip(id);
      expect(eliteModel([e])).toHaveLength(1);
    });

    it(`equipment "${id}" is hidden from non-ELITE models`, () => {
      const e = equip(id);
      expect(troopModel([e])).toHaveLength(0);
    });
  });
});

// ============================================================================
// SECTION 5 – Equipment: VEHICLE-gated (Battlesuit / Terminator armour only)
// ============================================================================

describe('VEHICLE-gated equipment', () => {
  const vehicleEquipIds = [
    'shield_generator_tau',
    'air_purifiers_tau',
    'automated_repair_system',
    'battlesuit_support_system',
    'protected_servos_tau',
    'weapon_support_system',
    'advanced_em_scrambler',
  ];

  const vehicleModel = makeFilterRestricted(['VEHICLE']);
  const infantryModel = makeFilterRestricted(['ELITE']);

  vehicleEquipIds.forEach(id => {
    it(`equipment "${id}" is shown to VEHICLE models`, () => {
      const e = equip(id);
      expect(vehicleModel([e])).toHaveLength(1);
    });

    it(`equipment "${id}" is hidden from non-VEHICLE models`, () => {
      const e = equip(id);
      expect(infantryModel([e])).toHaveLength(0);
    });
  });
});

// ============================================================================
// SECTION 6 – Unrestricted weapons should remain visible to everyone
// ============================================================================

describe('Unrestricted weapons – always visible', () => {
  const unrestrictedIds = [
    'blade',
    'close_combat_weapon',
    'las_rifle',
    'boltgun',
    'frag_grenades',
    'chitinous_claw',
    'scything_talon',
  ];

  const basicFilter = makeFilterRestricted([]);

  unrestrictedIds.forEach(id => {
    it(`"${id}" is shown to all models (no restrictedTo)`, () => {
      const w = weapon(id);
      expect(basicFilter([w])).toHaveLength(1);
    });
  });
});

// ============================================================================
// SECTION 7 – grantsKeywords sanity check on key restriction-triggering items
// ============================================================================

describe('grantsKeywords on equipment that gate other items', () => {
  it('terminator_armour grants VEHICLE keyword (enabling Terminator-Only gate)', () => {
    const e = equip('terminator_armour');
    expect(e.grantsKeywords).toContain('VEHICLE');
  });

  it('jump_pack grants FLYING keyword', () => {
    const e = equip('jump_pack');
    expect(e.grantsKeywords).toContain('FLYING');
  });

  it('mega_armour_orks grants VEHICLE and LARGE keywords', () => {
    const e = equip('mega_armour_orks');
    expect(e.grantsKeywords).toContain('VEHICLE');
    expect(e.grantsKeywords).toContain('LARGE');
  });

  it('abhorrent_pheromones grants FEAR keyword', () => {
    const e = equip('abhorrent_pheromones');
    expect(e.grantsKeywords).toContain('FEAR');
  });

  it('iron_gob_orks grants FEAR keyword', () => {
    const e = equip('iron_gob_orks');
    expect(e.grantsKeywords).toContain('FEAR');
  });

  it('pelt_of_balewolf_aa grants FEAR keyword', () => {
    const e = equip('pelt_of_balewolf_aa');
    expect(e.grantsKeywords).toContain('FEAR');
  });

  it('visage_of_death_aa grants FEAR keyword', () => {
    const e = equip('visage_of_death_aa');
    expect(e.grantsKeywords).toContain('FEAR');
  });
});
