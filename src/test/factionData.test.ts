/**
 * Faction data verification tests
 *
 * These tests verify that all faction units have:
 * - Required properties (id, name, baseCost, keywords, faction, unitType)
 * - Valid stats (movement, rangedSkill, meleeSkill, armourSave)
 * - Abilities registered in unit_abilities.ts (if defined)
 * - Correct unit counts per faction
 *
 * Covered factions: ALL 26 factions in allFactions
 * Focus factions: necrons, leagues_of_votann (player-reported issues)
 */

import { describe, it, expect } from 'vitest';
import { allFactions, getFactionById } from '../data/factions_complete.js';
import { unitAbilitiesMap as UNIT_ABILITIES } from '../data/unit_abilities.js';
import { ALL_MERCENARIES } from '../data/mercenaries.js';
import { getDisciplinesForFaction } from '../data/psychicDisciplines.js';
import { getSubFactions, getSubFactionById } from '../data/subfactions.js';

function getMercenariesForFaction(factionId: string) {
  return ALL_MERCENARIES.filter(m => m.availableTo?.includes(factionId));
}

// ============================================================================
// HELPER ASSERTIONS
// ============================================================================

// ============================================================================
// UNIVERSAL FACTION STRUCTURE TESTS
// ============================================================================

describe('All factions – structural integrity', () => {
  it('allFactions contains at least 26 factions', () => {
    expect(allFactions.length).toBeGreaterThanOrEqual(26);
  });

  allFactions.forEach(faction => {
    describe(`Faction: ${faction.name} (${faction.id})`, () => {
      it('has required fields', () => {
        expect(faction.id).toBeTruthy();
        expect(faction.name).toBeTruthy();
        expect(Array.isArray(faction.units)).toBe(true);
      });

      it('has at least one unit', () => {
        expect(faction.units.length).toBeGreaterThan(0);
      });

      faction.units.forEach(unit => {
        describe(`Unit: ${unit.name}`, () => {
          it('has required unit fields', () => {
            expect(unit.id).toBeTruthy();
            expect(unit.name).toBeTruthy();
            expect(typeof unit.baseCost).toBe('number');
            expect(Array.isArray(unit.keywords)).toBe(true);
            expect(unit.faction).toBe(faction.id);
            expect(['elite', 'troop']).toContain(unit.unitType);
          });

          it('has valid stats', () => {
            expect(unit.stats).toBeDefined();
            expect(typeof unit.stats.movement).toBe('number');
            expect(typeof unit.stats.rangedSkill).toBe('number');
            expect(typeof unit.stats.meleeSkill).toBe('number');
            expect(typeof unit.stats.armourSave).toBe('number');
          });

          it('has non-negative baseCost', () => {
            expect(unit.baseCost).toBeGreaterThanOrEqual(0);
          });

          it('has at least one keyword', () => {
            expect(unit.keywords.length).toBeGreaterThan(0);
          });
        });
      });
    });
  });
});

// ============================================================================
// NECRONS – DETAILED VERIFICATION
// ============================================================================

describe('Necrons faction – detailed verification', () => {
  const faction = getFactionById('necrons');

  it('faction exists', () => {
    expect(faction).toBeDefined();
  });

  // ── Unit presence ──────────────────────────────────────────────────────────
  const expectedUnits = [
    'nec_necron_lord',
    'nec_cryptek',
    'nec_royal_warden',
    'nec_warrior',
    'nec_immortal',
    'nec_scarab_swarm',
    'nec_tomb_blade',
    'nec_lokhust_lord',
    'nec_skorpekh_lord',
    'nec_hexmark_destroyer',
    'nec_lokhust_destroyer',
    'nec_ophydian_destroyer',
    'nec_skorpekh_destroyer',
    'nec_canoptek_spyder',
    'nec_apprentek',
    'nec_macrocyte_warrior',
    'nec_flayer_king',
  ];

  expectedUnits.forEach(unitId => {
    it(`includes unit: ${unitId}`, () => {
      const unit = faction!.units.find(u => u.id === unitId);
      expect(unit).toBeDefined();
    });
  });

  it('has exactly 17 units', () => {
    expect(faction!.units.length).toBe(17);
  });

  // ── Stat checks ────────────────────────────────────────────────────────────
  it('Necron Lord: baseCost 115, melee +2, ranged +2, armour -3', () => {
    const u = faction!.units.find(u => u.id === 'nec_necron_lord')!;
    expect(u.baseCost).toBe(115);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(-3);
  });

  it('Cryptek: baseCost 105, ranged +1, melee +0, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'nec_cryptek')!;
    expect(u.baseCost).toBe(105);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(-2);
  });

  it('Royal Warden: baseCost 85, ranged +1, melee +1, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'nec_royal_warden')!;
    expect(u.baseCost).toBe(85);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-2);
  });

  it('Necron Warrior: baseCost 70, ranged +0, melee +0, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'nec_warrior')!;
    expect(u.baseCost).toBe(70);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(-2);
  });

  it('Immortal: baseCost 95, ranged +1, melee +1, armour -3', () => {
    const u = faction!.units.find(u => u.id === 'nec_immortal')!;
    expect(u.baseCost).toBe(95);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-3);
  });

  it('Canoptek Scarab Swarm: baseCost 70, movement 8, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'nec_scarab_swarm')!;
    expect(u.baseCost).toBe(70);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Tomb Blade: baseCost 100, movement 10, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'nec_tomb_blade')!;
    expect(u.baseCost).toBe(100);
    expect(u.stats.movement).toBe(10);
    expect(u.stats.armourSave).toBe(-1);
  });

  it('Canoptek Spyder: baseCost 110, ranged +1, melee 0, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'nec_canoptek_spyder')!;
    expect(u.baseCost).toBe(110);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(-2);
  });

  it('Apprentek: baseCost 95, ranged +1, melee +1, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'nec_apprentek')!;
    expect(u.baseCost).toBe(95);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-2);
  });

  it('Macrocyte Warrior: baseCost 60, armour -1', () => {
    const u = faction!.units.find(u => u.id === 'nec_macrocyte_warrior')!;
    expect(u.baseCost).toBe(60);
    expect(u.stats.armourSave).toBe(-1);
  });

  it('Flayer King: baseCost 165, melee +3, armour -3', () => {
    const u = faction!.units.find(u => u.id === 'nec_flayer_king')!;
    expect(u.baseCost).toBe(165);
    expect(u.stats.meleeSkill).toBe(3);
    expect(u.stats.armourSave).toBe(-3);
  });

  // ── Keyword checks ─────────────────────────────────────────────────────────
  it('Necron Lord has ELITE, LARGE, LEADER, NECRON, NEGATE GAS, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'nec_necron_lord')!;
    ['ELITE', 'LARGE', 'LEADER', 'NECRON', 'NEGATE GAS', 'TOUGH'].forEach(kw => {
      expect(u.keywords).toContain(kw);
    });
  });

  it('Cryptek has ELITE, LARGE, NECRON, NEGATE GAS keywords', () => {
    const u = faction!.units.find(u => u.id === 'nec_cryptek')!;
    ['ELITE', 'LARGE', 'NECRON', 'NEGATE GAS'].forEach(kw => {
      expect(u.keywords).toContain(kw);
    });
  });

  it('Necron Warrior has NO PROMOTION keyword', () => {
    const u = faction!.units.find(u => u.id === 'nec_warrior')!;
    expect(u.keywords).toContain('NO PROMOTION');
  });

  it('Canoptek Scarab Swarm has ARTIFICIAL, FEAR, FLYING, LARGE, SWARM, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'nec_scarab_swarm')!;
    ['ARTIFICIAL', 'FEAR', 'FLYING', 'LARGE', 'SWARM', 'TOUGH'].forEach(kw => {
      expect(u.keywords).toContain(kw);
    });
  });

  it('Ophydian Destroyer has DEEP STRIKE (TUNNEL) keyword', () => {
    const u = faction!.units.find(u => u.id === 'nec_ophydian_destroyer')!;
    expect(u.keywords).toContain('DEEP STRIKE (TUNNEL)');
  });

  it('Hexmark Destroyer has INFILTRATOR keyword', () => {
    const u = faction!.units.find(u => u.id === 'nec_hexmark_destroyer')!;
    expect(u.keywords).toContain('INFILTRATOR');
  });

  it('Flayer King has DEEP STRIKE, ELITE, FEAR, LEADER, STEALTH, TOUGH', () => {
    const u = faction!.units.find(u => u.id === 'nec_flayer_king')!;
    ['DEEP STRIKE', 'ELITE', 'FEAR', 'LEADER', 'STEALTH', 'TOUGH'].forEach(kw => {
      expect(u.keywords).toContain(kw);
    });
  });

  it('Tomb Blade has VEHICLE, SKIRMISHER, LIMITED POTENTIAL keywords', () => {
    const u = faction!.units.find(u => u.id === 'nec_tomb_blade')!;
    ['VEHICLE', 'SKIRMISHER', 'LIMITED POTENTIAL'].forEach(kw => {
      expect(u.keywords).toContain(kw);
    });
  });

  // ── Abilities checks ───────────────────────────────────────────────────────
  it('Necron Lord has ability: My Will Be Done', () => {
    const abilities = UNIT_ABILITIES['nec_necron_lord'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'My Will Be Done')).toBe(true);
  });

  it('Cryptek has ability: Hover', () => {
    const abilities = UNIT_ABILITIES['nec_cryptek'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Hover')).toBe(true);
  });

  it('Royal Warden has ability: Engrammatic Logic', () => {
    const abilities = UNIT_ABILITIES['nec_royal_warden'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Engrammatic Logic')).toBe(true);
  });

  it('Canoptek Scarab Swarm has ability: Self-Destruction', () => {
    const abilities = UNIT_ABILITIES['nec_scarab_swarm'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Self-Destruction')).toBe(true);
  });

  it('Tomb Blade has ability: Weapon Mount', () => {
    const abilities = UNIT_ABILITIES['nec_tomb_blade'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Weapon Mount')).toBe(true);
  });

  it('Lokhust Lord has abilities: Destroyer Cult, Driven By Hatred, Heavy Gunner', () => {
    const abilities = UNIT_ABILITIES['nec_lokhust_lord'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Destroyer Cult')).toBe(true);
    expect(abilities.some(a => a.name === 'Driven By Hatred')).toBe(true);
    expect(abilities.some(a => a.name === 'Heavy Gunner')).toBe(true);
  });

  it('Skorpekh Lord has abilities: Crimson Harvest, United In Destruction', () => {
    const abilities = UNIT_ABILITIES['nec_skorpekh_lord'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Crimson Harvest')).toBe(true);
    expect(abilities.some(a => a.name === 'United In Destruction')).toBe(true);
  });

  it('Hexmark Destroyer has abilities: Inescapable Death, Multi-Threat Eliminator', () => {
    const abilities = UNIT_ABILITIES['nec_hexmark_destroyer'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Inescapable Death')).toBe(true);
    expect(abilities.some(a => a.name === 'Multi-Threat Eliminator')).toBe(true);
  });

  it('Lokhust Destroyer has abilities: Hard-Wired for Destruction, Heavy Gunner', () => {
    const abilities = UNIT_ABILITIES['nec_lokhust_destroyer'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Hard-Wired for Destruction')).toBe(true);
    expect(abilities.some(a => a.name === 'Heavy Gunner')).toBe(true);
  });

  it('Ophydian Destroyer has ability: Tunnelling Horror', () => {
    const abilities = UNIT_ABILITIES['nec_ophydian_destroyer'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Tunnelling Horror')).toBe(true);
  });

  it('Skorpekh Destroyer has ability: Whirling Onslaught', () => {
    const abilities = UNIT_ABILITIES['nec_skorpekh_destroyer'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Whirling Onslaught')).toBe(true);
  });

  it('Canoptek Spyder has abilities: Canoptek Swarm, Gloom Prism', () => {
    const abilities = UNIT_ABILITIES['nec_canoptek_spyder'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Canoptek Swarm')).toBe(true);
    expect(abilities.some(a => a.name === 'Gloom Prism')).toBe(true);
  });

  it('Apprentek has 6 discipline abilities', () => {
    const abilities = UNIT_ABILITIES['nec_apprentek'];
    expect(abilities).toBeDefined();
    expect(abilities.length).toBe(6);
  });

  it('Macrocyte Warrior has ability: Endless Reanimation', () => {
    const abilities = UNIT_ABILITIES['nec_macrocyte_warrior'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Endless Reanimation')).toBe(true);
  });

  it('Flayer King has abilities: Bloodlust, Controlled Hunger', () => {
    const abilities = UNIT_ABILITIES['nec_flayer_king'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Bloodlust')).toBe(true);
    expect(abilities.some(a => a.name === 'Controlled Hunger')).toBe(true);
  });

  // ── Upgrades checks ────────────────────────────────────────────────────────
  it('Immortal has Deathmark and Lychguard upgrades', () => {
    const u = faction!.units.find(u => u.id === 'nec_immortal')!;
    expect(u.upgrades).toBeDefined();
    expect(u.upgrades!.some(upg => upg.name === 'Deathmark')).toBe(true);
    expect(u.upgrades!.some(upg => upg.name === 'Lychguard')).toBe(true);
  });

  // ── Mercenaries ────────────────────────────────────────────────────────────
  it('has 6 Necron-specific mercenaries', () => {
    const mercs = getMercenariesForFaction('necrons');
    const necronMercs = mercs.filter(m => (m as any).subcategory === 'Necrons');
    expect(necronMercs.length).toBe(6);
  });

  it('mercenaries include: Flayed One, Canoptek Reanimator, Canoptek Wraith, Lokhust Destroyer, Ophydian Destroyer, Skorpekh Destroyer', () => {
    const mercs = getMercenariesForFaction('necrons');
    const names = mercs.map(m => m.name);
    ['Flayed One', 'Canoptek Reanimator', 'Canoptek Wraith', 'Lokhust Destroyer', 'Ophydian Destroyer', 'Skorpekh Destroyer'].forEach(n => {
      expect(names).toContain(n);
    });
  });

  it('Flayed One glory cost is 2', () => {
    const mercs = getMercenariesForFaction('necrons');
    const flayed = mercs.find(m => m.name === 'Flayed One');
    expect(flayed).toBeDefined();
    expect(flayed!.gloryCost).toBe(2);
  });

  it('Ophydian Destroyer glory cost is 4', () => {
    const mercs = getMercenariesForFaction('necrons');
    const m = mercs.find(m => m.name === 'Ophydian Destroyer');
    expect(m).toBeDefined();
    expect(m!.gloryCost).toBe(4);
  });
});

// ============================================================================
// LEAGUES OF VOTANN – DETAILED VERIFICATION
// ============================================================================

describe('Leagues of Votann faction – detailed verification', () => {
  const faction = getFactionById('leagues_of_votann');

  it('faction exists', () => {
    expect(faction).toBeDefined();
  });

  // ── Unit presence ──────────────────────────────────────────────────────────
  const expectedUnits = [
    'lv_kahl',
    'lv_brokhyr_iron_master',
    'lv_grimnyr',
    'lv_hearthkyn',
    'lv_cthonian_beserk',
    'lv_einhyr_hearthguard',
    'lv_brokhyr_thunderkyn',
    'lv_ironkin_steeljack',
    'lv_hernkyn_pioneer',
  ];

  expectedUnits.forEach(unitId => {
    it(`includes unit: ${unitId}`, () => {
      const unit = faction!.units.find(u => u.id === unitId);
      expect(unit).toBeDefined();
    });
  });

  it('has exactly 9 units', () => {
    expect(faction!.units.length).toBe(9);
  });

  // ── Stat checks ────────────────────────────────────────────────────────────
  it('Kâhl: baseCost 55, ranged +2, melee +2, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'lv_kahl')!;
    expect(u.baseCost).toBe(55);
    expect(u.stats.rangedSkill).toBe(2);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Brôkhyr Iron-Master: baseCost 45, ranged +1, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'lv_brokhyr_iron_master')!;
    expect(u.baseCost).toBe(45);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Grimnyr: baseCost 55, ranged +1, melee +1, armour 0', () => {
    const u = faction!.units.find(u => u.id === 'lv_grimnyr')!;
    expect(u.baseCost).toBe(55);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(0);
  });

  it('Hearthkyn: baseCost 25, ranged +0, melee +0', () => {
    const u = faction!.units.find(u => u.id === 'lv_hearthkyn')!;
    expect(u.baseCost).toBe(25);
    expect(u.stats.rangedSkill).toBe(0);
    expect(u.stats.meleeSkill).toBe(0);
  });

  it('Cthonian Beserk: baseCost 40, melee +1, maxCount 4', () => {
    const u = faction!.units.find(u => u.id === 'lv_cthonian_beserk')!;
    expect(u.baseCost).toBe(40);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.maxCount).toBe(4);
  });

  it('Einhyr Hearthguard: baseCost 85, ranged +1, melee +1, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'lv_einhyr_hearthguard')!;
    expect(u.baseCost).toBe(85);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-2);
  });

  it('Brôkhyr Thunderkyn: baseCost 85, ranged +1, melee +0, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'lv_brokhyr_thunderkyn')!;
    expect(u.baseCost).toBe(85);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(0);
    expect(u.stats.armourSave).toBe(-2);
  });

  it('Ironkin Steeljack: baseCost 115, ranged +1, melee +2, armour -3', () => {
    const u = faction!.units.find(u => u.id === 'lv_ironkin_steeljack')!;
    expect(u.baseCost).toBe(115);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(2);
    expect(u.stats.armourSave).toBe(-3);
  });

  it('Hernkyn Pioneer: baseCost 135, movement 8, ranged +1, melee +1, armour -2', () => {
    const u = faction!.units.find(u => u.id === 'lv_hernkyn_pioneer')!;
    expect(u.baseCost).toBe(135);
    expect(u.stats.movement).toBe(8);
    expect(u.stats.rangedSkill).toBe(1);
    expect(u.stats.meleeSkill).toBe(1);
    expect(u.stats.armourSave).toBe(-2);
  });

  // ── Keyword checks ─────────────────────────────────────────────────────────
  it('Kâhl has ELITE, LARGE, LEADER, TOUGH, VOTANN', () => {
    const u = faction!.units.find(u => u.id === 'lv_kahl')!;
    ['ELITE', 'LARGE', 'LEADER', 'TOUGH', 'VOTANN'].forEach(kw => {
      expect(u.keywords).toContain(kw);
    });
  });

  it('Grimnyr has ELITE, FLYING, LARGE, PSYKER 1, VOTANN', () => {
    const u = faction!.units.find(u => u.id === 'lv_grimnyr')!;
    ['ELITE', 'FLYING', 'LARGE', 'PSYKER 1', 'VOTANN'].forEach(kw => {
      expect(u.keywords).toContain(kw);
    });
  });

  it('Cthonian Beserk has STRONG, VOTANN', () => {
    const u = faction!.units.find(u => u.id === 'lv_cthonian_beserk')!;
    expect(u.keywords).toContain('STRONG');
    expect(u.keywords).toContain('VOTANN');
  });

  it('Brôkhyr Thunderkyn has LARGE, VEHICLE, VOTANN', () => {
    const u = faction!.units.find(u => u.id === 'lv_brokhyr_thunderkyn')!;
    ['LARGE', 'VEHICLE', 'VOTANN'].forEach(kw => {
      expect(u.keywords).toContain(kw);
    });
  });

  it('Ironkin Steeljack has ARTIFICIAL, LARGE, STRONG, VOTANN', () => {
    const u = faction!.units.find(u => u.id === 'lv_ironkin_steeljack')!;
    ['ARTIFICIAL', 'LARGE', 'STRONG', 'VOTANN'].forEach(kw => {
      expect(u.keywords).toContain(kw);
    });
  });

  it('Hernkyn Pioneer has FLYING, LARGE, NO PROMOTION, SKIRMISHER, VEHICLE, TOUGH, VOTANN', () => {
    const u = faction!.units.find(u => u.id === 'lv_hernkyn_pioneer')!;
    ['FLYING', 'LARGE', 'NO PROMOTION', 'SKIRMISHER', 'VEHICLE', 'TOUGH', 'VOTANN'].forEach(kw => {
      expect(u.keywords).toContain(kw);
    });
  });

  // ── Abilities checks ───────────────────────────────────────────────────────
  it('Kâhl has ability: Grim Efficiency', () => {
    const abilities = UNIT_ABILITIES['lv_kahl'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Grim Efficiency')).toBe(true);
  });

  it("Brôkhyr Iron-Master has ability: Brôkhyr's Guild", () => {
    const abilities = UNIT_ABILITIES['lv_brokhyr_iron_master'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === "Brôkhyr's Guild")).toBe(true);
  });

  it('Cthonian Beserk has abilities: Cyberstimms, Rage', () => {
    const abilities = UNIT_ABILITIES['lv_cthonian_beserk'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Cyberstimms')).toBe(true);
    expect(abilities.some(a => a.name === 'Rage')).toBe(true);
  });

  it('Einhyr Hearthguard has abilities: Decisive Destruction, Oathband Bodyguard', () => {
    const abilities = UNIT_ABILITIES['lv_einhyr_hearthguard'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Decisive Destruction')).toBe(true);
    expect(abilities.some(a => a.name === 'Oathband Bodyguard')).toBe(true);
  });

  it('Brôkhyr Thunderkyn has abilities: Breaching Fire, Heavy Gunner', () => {
    const abilities = UNIT_ABILITIES['lv_brokhyr_thunderkyn'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Breaching Fire')).toBe(true);
    expect(abilities.some(a => a.name === 'Heavy Gunner')).toBe(true);
  });

  it('Ironkin Steeljack has abilities: Merciless Eradication, Purge Response', () => {
    const abilities = UNIT_ABILITIES['lv_ironkin_steeljack'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Merciless Eradication')).toBe(true);
    expect(abilities.some(a => a.name === 'Purge Response')).toBe(true);
  });

  it('Hernkyn Pioneer has ability: Weapon Mount', () => {
    const abilities = UNIT_ABILITIES['lv_hernkyn_pioneer'];
    expect(abilities).toBeDefined();
    expect(abilities.some(a => a.name === 'Weapon Mount')).toBe(true);
  });

  // ── Psychic disciplines ────────────────────────────────────────────────────
  it('has Skeinwrought psychic discipline', () => {
    const disciplines = getDisciplinesForFaction('leagues_of_votann');
    expect(disciplines.length).toBeGreaterThanOrEqual(1);
    expect(disciplines.some(d => d.id === 'skeinwrought')).toBe(true);
  });

  it('Skeinwrought discipline has exactly 6 powers', () => {
    const disciplines = getDisciplinesForFaction('leagues_of_votann');
    const skeinwrought = disciplines.find(d => d.id === 'skeinwrought')!;
    expect(skeinwrought.powers.length).toBe(6);
  });

  it('Skeinwrought powers include: Ancestral Wrath, Fortify, Crushing Contempt, Grimnyr\'s Regard, Grudgepyre, Null Vortex', () => {
    const disciplines = getDisciplinesForFaction('leagues_of_votann');
    const skeinwrought = disciplines.find(d => d.id === 'skeinwrought')!;
    const powerNames = skeinwrought.powers.map(p => p.name);
    ['Ancestral Wrath', 'Fortify', 'Crushing Contempt', "Grimnyr's Regard", 'Grudgepyre', 'Null Vortex'].forEach(n => {
      expect(powerNames).toContain(n);
    });
  });

  // ── Mercenaries ────────────────────────────────────────────────────────────
  it('has 6 Leagues of Votann-specific mercenaries', () => {
    const mercs = getMercenariesForFaction('leagues_of_votann');
    const lovMercs = mercs.filter(m => (m as any).subcategory === 'Leagues of Votann');
    expect(lovMercs.length).toBe(6);
  });

  it('mercenaries include: Arkanyst Evaluator, C-ORV, E-COG, Hernkyn Jaegir, Hernkyn Riflekyn, Squat Exo-Driller', () => {
    const mercs = getMercenariesForFaction('leagues_of_votann');
    const names = mercs.map(m => m.name);
    ['Arkanyst Evaluator', 'C-ORV', 'E-COG', 'Hernkyn Jaegir', 'Hernkyn Riflekyn', 'Squat Exo-Driller'].forEach(n => {
      expect(names).toContain(n);
    });
  });
});

// ============================================================================
// HERETIC ASTARTES – Auto-Mark and Variant Unit Visibility Tests
// ============================================================================

/**
 * Returns the set of unit IDs that a subfaction makes available (faction units minus banned).
 */
function getVisibleUnitIds(factionId: string, subfactionId: string): Set<string> {
  const faction = getFactionById(factionId);
  const sf = getSubFactionById(factionId, subfactionId);
  const banned = new Set<string>(sf?.bannedUnitIds ?? []);
  const base = (faction?.units ?? []).map(u => u.id).filter(id => !banned.has(id));
  const extra = (sf?.extraUnits ?? []).map(u => u.id);
  return new Set([...base, ...extra]);
}

describe('Heretic Astartes – variant-exclusive units are hidden from wrong subfactions', () => {
  // Variant-exclusive unit IDs grouped by the only subfaction that should show them
  const DG_ONLY    = ['ha_poxwalker', 'ha_foetid_blight_drone'];
  const EC_ONLY    = ['ha_lord_kakophonist'];
  const RSM_ONLY   = ['ha_renegade_apothecary'];
  const TS_ONLY    = ['ha_exalted_sorcerer', 'ha_tzaangor_shaman', 'ha_tzaangor', 'ha_sekhetar_robot'];
  const WE_ONLY    = ['ha_master_of_executions', 'ha_slaughterbound'];

  const ownership: Record<string, string[]> = {
    death_guard:          DG_ONLY,
    emperors_children:    EC_ONLY,
    renegade_space_marines: RSM_ONLY,
    thousand_sons:        TS_ONLY,
    world_eaters:         WE_ONLY,
  };

  const ALL_SUBFACTIONS = getSubFactions('heretic_astartes')!.subFactions.map(sf => sf.id);

  // For each variant-exclusive set, every OTHER subfaction must not show those units
  Object.entries(ownership).forEach(([ownerSfId, exclusiveIds]) => {
    const otherSfs = ALL_SUBFACTIONS.filter(id => id !== ownerSfId);
    otherSfs.forEach(sfId => {
      exclusiveIds.forEach(unitId => {
        it(`${sfId} does NOT show ${unitId} (belongs to ${ownerSfId})`, () => {
          const visible = getVisibleUnitIds('heretic_astartes', sfId);
          expect(visible.has(unitId)).toBe(false);
        });
      });
    });
  });

  // Also verify the owner DOES see its own exclusive units
  Object.entries(ownership).forEach(([ownerSfId, exclusiveIds]) => {
    exclusiveIds.forEach(unitId => {
      it(`${ownerSfId} DOES show its own exclusive unit: ${unitId}`, () => {
        const visible = getVisibleUnitIds('heretic_astartes', ownerSfId);
        expect(visible.has(unitId)).toBe(true);
      });
    });
  });
});

describe('Heretic Astartes – auto-mark eligibleUnitIds are complete and correct', () => {
  const markSubfactions: Array<{
    sfId: string;
    markId: string;
    expectedEligible: string[];
    expectedNotEligible: string[]; // units that have mark built-in or shouldn't get it
  }> = [
    {
      sfId: 'world_eaters',
      markId: 'mark_of_khorne',
      expectedEligible: [
        'ha_chaos_lord', 'ha_dark_apostle', 'ha_chaos_cultist',
        'ha_chaos_space_marine', 'ha_possessed', 'ha_chaos_terminator', 'ha_helbrute',
      ],
      // Master of Executions and Slaughterbound have mark built-in to defaultWargear
      expectedNotEligible: ['ha_master_of_executions', 'ha_slaughterbound'],
    },
    {
      sfId: 'death_guard',
      markId: 'mark_of_nurgle',
      expectedEligible: [
        'ha_chaos_lord', 'ha_chaos_sorcerer', 'ha_chaos_cultist',
        'ha_chaos_space_marine', 'ha_chaos_terminator', 'ha_helbrute',
      ],
      // Poxwalkers and Blight-Drone have their own Nurgle rules, not Nurgle Disciples auto-mark
      expectedNotEligible: ['ha_poxwalker', 'ha_foetid_blight_drone'],
    },
    {
      sfId: 'emperors_children',
      markId: 'mark_of_slaanesh',
      expectedEligible: [
        'ha_chaos_lord', 'ha_dark_apostle', 'ha_chaos_sorcerer',
        'ha_chaos_cultist', 'ha_chaos_space_marine', 'ha_chaos_terminator', 'ha_helbrute',
      ],
      // Lord Kakophonist has mark built-in to defaultWargear (cost already included)
      expectedNotEligible: ['ha_lord_kakophonist'],
    },
    {
      sfId: 'thousand_sons',
      markId: 'mark_of_tzeentch',
      expectedEligible: [
        'ha_chaos_sorcerer', 'ha_chaos_cultist',
        'ha_chaos_space_marine', 'ha_chaos_terminator', 'ha_helbrute',
      ],
      // Exalted Sorcerer has mark built-in; Tzaangors and Sekhetar Robot already have TZEENTCH keyword
      expectedNotEligible: ['ha_exalted_sorcerer', 'ha_tzaangor_shaman', 'ha_tzaangor', 'ha_sekhetar_robot'],
    },
  ];

  markSubfactions.forEach(({ sfId, markId, expectedEligible, expectedNotEligible }) => {
    const sf = getSubFactionById('heretic_astartes', sfId)!;

    it(`${sfId}: autoMark is defined with markId="${markId}"`, () => {
      expect(sf.autoMark).toBeDefined();
      expect(sf.autoMark!.markId).toBe(markId);
    });

    expectedEligible.forEach(unitId => {
      it(`${sfId}: ${unitId} is in autoMark.eligibleUnitIds (gets auto-mark)`, () => {
        expect(sf.autoMark!.eligibleUnitIds).toContain(unitId);
      });
    });

    expectedNotEligible.forEach(unitId => {
      it(`${sfId}: ${unitId} is NOT in autoMark.eligibleUnitIds (has built-in mark or own effect)`, () => {
        expect(sf.autoMark!.eligibleUnitIds).not.toContain(unitId);
      });
    });
  });
});

describe('Heretic Astartes – built-in marks on subfaction-exclusive units', () => {
  const faction = getFactionById('heretic_astartes')!;

  it('ha_lord_kakophonist has a built-in Slaanesh mark in defaultWargear', () => {
    const unit = faction.units.find(u => u.id === 'ha_lord_kakophonist')!;
    const mark = unit.defaultWargear?.find(w => (w.keywords ?? []).includes('SLAANESH'));
    expect(mark).toBeDefined();
    expect(mark!.id).toBe('ha_mark_slaanesh_kak');
  });

  it('ha_mark_slaanesh_kak has statModifiers.movement = 2 (+2" speed)', () => {
    const unit = faction.units.find(u => u.id === 'ha_lord_kakophonist')!;
    const mark = unit.defaultWargear?.find(w => w.id === 'ha_mark_slaanesh_kak') as any;
    expect(mark?.statModifiers?.movement).toBe(2);
  });

  it('ha_exalted_sorcerer has a built-in Tzeentch mark in defaultWargear', () => {
    const unit = faction.units.find(u => u.id === 'ha_exalted_sorcerer')!;
    const mark = unit.defaultWargear?.find(w => (w.keywords ?? []).includes('TZEENTCH'));
    expect(mark).toBeDefined();
    expect(mark!.id).toBe('ha_mark_tzeentch_es');
  });

  it('ha_master_of_executions has a built-in Khorne mark in defaultWargear', () => {
    const unit = faction.units.find(u => u.id === 'ha_master_of_executions')!;
    const mark = unit.defaultWargear?.find(w => (w.keywords ?? []).includes('KHORNE'));
    expect(mark).toBeDefined();
    expect(mark!.id).toBe('ha_mark_khorne_moe');
  });

  it('ha_slaughterbound has a built-in Khorne mark in defaultWargear', () => {
    const unit = faction.units.find(u => u.id === 'ha_slaughterbound')!;
    const mark = unit.defaultWargear?.find(w => (w.keywords ?? []).includes('KHORNE'));
    expect(mark).toBeDefined();
    expect(mark!.id).toBe('ha_mark_khorne_sb');
  });
});
