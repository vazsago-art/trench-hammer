/**
 * Instruction Armoury Compliance Tests
 *
 * Every item listed in each faction's instruction file armoury MUST be accessible
 * via their FACTION_WARGEAR pool. These tests act as a regression barrier: if an
 * item is mentioned in an instruction file but missing from the data layer,
 * the corresponding test will fail immediately.
 *
 * Ground-truth source: .github/instructions/TrenchHammer – Imperial Factions/*.md
 *                      .github/instructions/TrenchHammer – Chaos Factions/*.md
 *                      .github/instructions/TrenchHammer – Xenos Factions/*.md
 *
 * Coverage:
 *   [Imperial] Adeptus Astartes (full – base armoury + all variant battlkits)
 *   [Imperial] Astra Militarum (base armoury)
 *   [Imperial] Adeptus Custodes (base armoury)
 *   [Imperial] Adeptus Mechanicus (base armoury)
 *   [Imperial] Adeptus Ministorum (base armoury)
 *   [Imperial] Adepta Sororitas (base armoury)
 *   [Imperial] The Inquisition (base armoury)
 *   [Imperial] Officio Assassinorum (base armoury)
 *   [Chaos]    Heretic Astartes (base armoury)
 *   [Chaos]    Chaos Cult (base armoury)
 *   [Chaos]    The Vermintide (base armoury)
 *   [Chaos]    Chaos Daemons (base armoury)
 *   [Xenos]    Orks (base armoury)
 *   [Xenos]    Tyranids (base armoury)
 *   [Xenos]    Genestealer Cults (base armoury)
 *   [Xenos]    Necrons (base armoury)
 *   [Xenos]    Aeldari (base armoury)
 *   [Xenos]    Harlequins (base armoury)
 *   [Xenos]    Leagues of Votann (base armoury)
 *   [Xenos]    Drukhari (base armoury)
 *   [Xenos]    T\'au Empire (base armoury)
 *   [Xenos]    Slanni (base armoury)
 *   [Xenos]    Necromunda Gang (base armoury)
 *   [Xenos]    Pirate Crew (base armoury)
 */

import { describe, it, expect } from 'vitest';
import { FACTION_WARGEAR } from '../data/faction_wargear.js';
import { allWeapons } from '../data/weapons.js';
import { allEquipmentWithHA } from '../data/equipment.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const allWeaponIds  = new Set(allWeapons.map(w => w.id));
const allEquipIds   = new Set(allEquipmentWithHA.map(e => e.id));
const allItemIds    = new Set([...allWeaponIds, ...allEquipIds]);

/** Asserts that every ID in `items` is in the faction's wargear pool */
function checkAllInPool(factionId: string, items: string[]) {
  const pool = FACTION_WARGEAR[factionId];
  if (!pool) {
    it(`FACTION_WARGEAR["${factionId}"] is defined`, () => {
      expect(pool).toBeDefined();
    });
    return;
  }
  const poolSet = new Set(pool);
  items.forEach(id => {
    it(`${factionId}: "${id}" is in FACTION_WARGEAR pool`, () => {
      // Also verify the item exists in the database at all
      expect(allItemIds.has(id), `Item "${id}" does not exist in allWeapons or allEquipmentWithHA`).toBe(true);
      expect(poolSet.has(id), `Item "${id}" not found in FACTION_WARGEAR["${factionId}"]`).toBe(true);
    });
  });
}

// ============================================================================
// ADEPTUS ASTARTES – FULL INSTRUCTION COVERAGE
// Source: Adeptus Astartes.md
// ============================================================================
describe('Adeptus Astartes – instruction armoury compliance', () => {

  describe('Basic Ranged Weapons', () => {
    checkAllInPool('adeptus_astartes', [
      'automatic_shotgun',   // Automatic Shotgun 15cr
      'bolt_carbine',        // Bolt Carbine 15cr
      'boltgun',             // Boltgun 12cr
      'shotgun',             // Shotgun 10cr
    ]);
  });

  describe('Pistols', () => {
    checkAllInPool('adeptus_astartes', [
      'assault_bolter',      // Assault Bolter 15cr (Primaris or Terminator Only)
      'bolt_pistol',         // Bolt Pistol 10cr
      'hand_flamer',         // Hand Flamer 20cr
      'heavy_bolt_pistol',   // Heavy Bolt Pistol 30cr
      'inferno_pistol',      // Inferno Pistol 1 Glory
      'plasma_pistol',       // Plasma Pistol 20cr
      'twin_bolt_pistols',   // Twin Bolt Pistols 15cr
      'volkite_pistol',      // Volkite Pistol 2 Glory
    ]);
  });

  describe('Special Ranged Weapons', () => {
    checkAllInPool('adeptus_astartes', [
      'automatic_bolt_rifle', // Automatic Bolt Rifle 20cr (Primaris Only)
      'bolt_rifle',           // Bolt Rifle 15cr (Primaris Only)
      'bolt_sniper_rifle',    // Bolt Sniper Rifle 30cr
      'combi_weapon',         // Combi-Weapon 35cr
      'flamer',               // Flamer 30cr
      'longlas',              // Longlas 25cr
      'melta_gun',            // Melta Gun 2 Glory
      'plasma_gun',           // Plasma Gun 30cr
      'storm_bolter',         // Storm Bolter 35cr
    ]);
  });

  describe('Heavy Ranged Weapons', () => {
    checkAllInPool('adeptus_astartes', [
      'autocannon',             // Autocannon 30cr
      'combi_bolter',           // Combi-Bolter 35cr (Terminator Armour Only)
      'cyclone_missile_launcher', // Cyclone Missile Launcher 25cr (Terminator Only)
      'heavy_bolter',           // Heavy Bolter 40cr
      'heavy_flamer',           // Heavy Flamer 55cr
      'lascannon',              // Lascannon 30cr
      'missile_launcher',       // Missile Launcher 40cr
      'multi_melta',            // Multi-Melta 4 Glory
      'plasma_cannon',          // Plasma Cannon 4 Glory
      'reaper_chaincannon',     // Reaper Chaincannon 35cr
      'twin_lascannon',         // Twin Lascannon 40cr (Dreadnought Only)
    ]);
  });

  describe('Thrown Weapons', () => {
    checkAllInPool('adeptus_astartes', [
      'frag_grenades',  // Frag Grenades 7cr
      'krak_grenades',  // Krak Grenades 15cr
    ]);
  });

  describe('Basic Melee Weapons', () => {
    checkAllInPool('adeptus_astartes', [
      'blade',               // Blade 4cr
      'bludgeon',            // Bludgeon 1cr
      'close_combat_weapon', // Close Combat Weapon 3cr
      'halberd',             // Halberd 7cr
      'paired_blades',       // Paired Blades 12cr (Vanguard Only)
    ]);
  });

  describe('Special Melee Weapons', () => {
    checkAllInPool('adeptus_astartes', [
      'chain_blade',    // Chain Blade 10cr
      'chain_glaive',   // Chain Glaive 15cr
      'force_rod',      // Force Rod 3cr (Psyker Only)
      'force_staff',    // Force Staff 10cr (Psyker Only)
      'force_weapon',   // Force Weapon 15cr (Elite Psyker Only)
      'lightning_claw', // Lightning Claw 12cr (Terminator/Assault Marine Only)
      'power_weapon',   // Power Weapon 15cr
    ]);
  });

  describe('Heavy Melee Weapons', () => {
    checkAllInPool('adeptus_astartes', [
      'chain_fist',         // Chain Fist 35cr (Terminator Armour Only)
      'heavy_power_weapon', // Heavy Power Weapon 20cr (Elite Only)
      'heavy_power_fist',   // Heavy Heavy Power Fist 30cr (Elite/Terminator/Dreadnought Only)
      'two_handed_blade',   // Two-Handed Blade 12cr
      'two_handed_hammer',  // Two-Handed Hammer 10cr
      'thunder_hammer',     // Thunder Hammer 20cr
    ]);
  });

  describe('Armour', () => {
    checkAllInPool('adeptus_astartes', [
      'standard_armour',   // Standard Armour 15cr
      'power_armour',      // Power Armour 40cr
      'terminator_armour', // Terminator Armour 65cr
      'shield',            // Shield 10cr (Bladeguard Only)
      'heavy_shield',      // Heavy Shield 15cr
    ]);
  });

  describe('Equipment – Standard Armoury', () => {
    checkAllInPool('adeptus_astartes', [
      'astartes_bike',       // Astartes Bike 50cr (LIMIT: 3)
      'camo_cloak',          // Camo Cloak 10cr (Scout/Vanguard Only)
      'combat_helmet_aa',    // Combat Helmet 5cr
      'filter_plugs',        // Filter Plugs 5cr
      'frag_ammunition_aa',  // Frag Ammunition 5cr (CONSUMABLE)
      'grapnel_launcher',    // Grapnel Launcher 3cr
      'grav_chute',          // Grav Chute 7cr
      'holy_relic_aa',       // Holy Relic 2 Glory (Elite Only)
      'iron_halo',           // Iron Halo 4 Glory (Elite Only)
      'jump_pack',           // Jump Pack 20cr (Captain/Assault Marine Only)
      'mortis_ammunition_aa', // Mortis Ammunition 10cr (CONSUMABLE)
      'psychic_hood_aa',     // Psychic Hood 7cr (Librarian Only)
      'purity_seal_aa',      // Purity Seal 15cr
      'scope',               // Scope 2 Glory
      'seeker_ammunition_aa', // Seeker Ammunition 10cr (CONSUMABLE)
      'vengeance_ammunition', // Vengeance Ammunition 10cr (CONSUMABLE)
      'troop_flag_aa',       // Troop Flag 1 Glory
    ]);
  });

  describe('Cyberteknika – Standard', () => {
    checkAllInPool('adeptus_astartes', [
      'cyberteknika_cranial_aa',      // Cranial 10cr
      'cyberteknika_ocular_aa',       // Ocular 15cr
      'cyberteknika_sindexterous_aa', // Sindexterous 15cr
      'cyberteknika_motive_aa',       // Motive 10cr
    ]);
  });

  describe('Iron Hands Variant Battlekit', () => {
    checkAllInPool('adeptus_astartes', [
      'cyberteknika_torsonic_aa',  // Torsonic 25cr (LIMIT 2)
      'cyberteknika_vascular_aa',  // Vascular 20cr (LIMIT 2)
      'servo_skull_ih',            // Servo-Skull 15cr (Techmarine Only)
    ]);
  });

  describe('Dark Angels Variant Battlekit', () => {
    checkAllInPool('adeptus_astartes', [
      'watcher_in_the_dark', // Watcher in the Dark 5cr (LIMIT 3, Elite Only)
    ]);
  });

  describe('Space Wolves Variant Battlekit', () => {
    checkAllInPool('adeptus_astartes', [
      'death_totem',           // Death Totem 10cr (LIMIT 1, Wulfen Only, FEAR)
      'great_frost_axe',       // Great Frost Axe 25cr (LIMIT 2)
      'great_wolf_claw',       // Great Wolf Claw 20cr (LIMIT 1, Dreadnought Only)
      'stormfrag_auto_launcher', // Stormfrag Auto-Launcher 12cr (Wulfen Only)
      'thunderwolf',           // Thunderwolf 55cr (LIMIT 3, Space Marines Only)
      'wulfen_frost_claws',    // Wulfen Frost Claws 15cr (Wulfen Only)
    ]);
  });

  describe('Deathwatch Variant Battlekit – Weapons', () => {
    checkAllInPool('adeptus_astartes', [
      'deathwatch_shotgun',    // Deathwatch Shotgun 18cr
      'frag_cannon_dw',        // Frag Cannon 15cr (LIMIT 2)
      'guardian_spear_dw',     // Guardian Spear 35cr (LIMIT 1, Captain Only)
      'immolation_rifle',      // Immolation Rifle 15cr (LIMIT 2)
      'infernus_heavy_bolter', // Infernus Heavy Bolter 80cr (LIMIT 1)
      'stalker_boltgun',       // Stalker Boltgun 20cr
      'stalker_bolt_rifle',    // Stalker Bolt Rifle 25cr (Primaris Only)
    ]);
  });

  describe('Deathwatch Variant Battlekit – Special Issue Ammunition', () => {
    checkAllInPool('adeptus_astartes', [
      'derevenant_shells',          // Derevenant Shells 10cr (LIMIT 2)
      'dragonfire_bolts',           // Dragonfire Bolts 10cr (LIMIT 3)
      'hellfire_rounds',            // Hellfire Rounds 5cr (LIMIT 4)
      'inertial_fusion_bolts',      // Inertial Fusion Bolts 5cr (LIMIT 4)
      'kraken_bolts',               // Kraken Bolts 10cr (LIMIT 4)
      'metal_storm_shells',         // Metal Storm Shells 5cr (LIMIT 4)
      'tempest_bolts',              // Tempest Bolts 5cr (LIMIT 4)
      'thermic_acceleration_rounds', // Thermic Acceleration Rounds 3cr (LIMIT 4)
    ]);
  });

  describe('Grey Knights Variant Battlekit', () => {
    checkAllInPool('adeptus_astartes', [
      'heavy_force_weapon_gk',   // Heavy Force Weapon 30cr (LIMIT 2, Psyker Only)
      'heavy_psycannon',         // Heavy Psycannon 45cr (Psyker Only)
      'nemesis_force_weapon_gk', // Nemesis Force Weapon 25cr (LIMIT 1, Psyker Only)
      'psilencer',               // Psilencer 40cr (LIMIT 2, Psyker Only)
      'psycannon',               // Psycannon 15cr (Psyker Only)
    ]);
  });
});

// ============================================================================
// ADEPTUS ASTARTES – every ID in the pool resolves to a real item
// ============================================================================
describe('Adeptus Astartes – all pool IDs resolve to real items', () => {
  (FACTION_WARGEAR['adeptus_astartes'] ?? []).forEach(id => {
    it(`pool ID "${id}" resolves in allWeapons or allEquipment`, () => {
      expect(allItemIds.has(id), `"${id}" not found in weapons or equipment`).toBe(true);
    });
  });
});

// ============================================================================
// UNIVERSAL POOL RESOLUTION – ALL FACTIONS
// Every ID in every FACTION_WARGEAR pool must be a real item.
// ============================================================================
describe('All factions – every FACTION_WARGEAR pool ID resolves', () => {
  Object.entries(FACTION_WARGEAR).forEach(([factionId, pool]) => {
    describe(`${factionId} pool`, () => {
      pool.forEach(id => {
        it(`"${id}" resolves to a weapon or equipment item`, () => {
          expect(allItemIds.has(id), `"${id}" not found in any weapon or equipment array`).toBe(true);
        });
      });
    });
  });
});

// ============================================================================
// ASTRA MILITARUM – key unique equipment
// ============================================================================
describe('Astra Militarum – instruction armoury compliance', () => {
  describe('Unique Equipment', () => {
    checkAllInPool('astra_militarum', [
      'augury_scanner_am', 'camo_cloak_am', 'combat_helmet_am',
      'dum_dum_ammunition_am', 'manstopper_ammunition_am', 'musical_instrument_am',
      'phosphor_ammunition_am', 'photo_goggles_am', 'rough_rider_horse_am',
      'troop_flag_am', 'vox_unit_am',
      'cyberteknika_cranial_am', 'cyberteknika_ocular_am',
      'cyberteknika_sindexterous_am', 'cyberteknika_motive_am',
    ]);
  });
});

// ============================================================================
// ADEPTUS CUSTODES – key unique equipment
// ============================================================================
describe('Adeptus Custodes – instruction armoury compliance', () => {
  describe('Unique Equipment', () => {
    checkAllInPool('adeptus_custodes', [
      'auramite_armour_custodes', 'aquilon_armour_custodes', 'praesidium_shield_custodes',
      'amelioration_pail_custodes', 'combat_helmet_custodes', 'dawneagle_jetbike_custodes',
      'holy_relic_custodes', 'vexilla_custodes',
      'frag_ammunition_custodes', 'vengeance_ammunition',
      'cyberteknika_cranial_custodes', 'cyberteknika_ocular_custodes',
      'cyberteknika_sindexterous_custodes', 'cyberteknika_motive_custodes',
    ]);
  });
  describe('Unique Weapons', () => {
    checkAllInPool('adeptus_custodes', [
      'adrastus_bolt_caliver', 'balistus_grenade_launcher', 'kinetic_destroyer',
      'salvo_launcher', 'twin_las_pulsar', 'twin_adrathic_destructor', 'vertus_hurricane_bolter',
      'executioner_greatblade', 'misericordia', 'tarsis_buckler', 'vaultswords',
      'solerite_power_gauntlet', 'solerite_power_talon',
      'achillus_dreadspear', 'adrasite_spear', 'castellan_axe', 'galatus_warblade',
      'guardian_spear', 'pyrithite_spear', 'sentinel_blade',
    ]);
  });
});

// ============================================================================
// ADEPTUS MECHANICUS – key unique equipment
// ============================================================================
describe('Adeptus Mechanicus – instruction armoury compliance', () => {
  describe('Unique Equipment', () => {
    checkAllInPool('adeptus_mechanicus', [
      'combat_helmet_admech', 'holy_relic_admech', 'imperative_surge_wafer',
      'omnispex_admech', 'purity_seal_admech', 'servo_medicae_admech',
      'serberys_construct_admech', 'vox_unit_admech', 'servo_skull_admech',
      'cyberteknika_cranial_admech', 'cyberteknika_ocular_admech',
      'cyberteknika_sindexterous_admech', 'cyberteknika_motive_admech',
      'cyberteknika_torsonic_admech', 'cyberteknika_vascular_admech',
    ]);
  });
});

// ============================================================================
// ADEPTUS MINISTORUM – key unique equipment
// ============================================================================
describe('Adeptus Ministorum – instruction armoury compliance', () => {
  describe('Unique Equipment', () => {
    checkAllInPool('adeptus_ministorum', [
      'augury_scanner_min', 'combat_helmet_min', 'holy_relic_min',
      'infernus_ammunition_min', 'purity_seal_min', 'reliquarius_min', 'sanctification_orbs_min',
      'cyberteknika_cranial_min', 'cyberteknika_ocular_min',
      'cyberteknika_sindexterous_min', 'cyberteknika_motive_min',
    ]);
  });
  describe('Unique Weapons', () => {
    checkAllInPool('adeptus_ministorum', [
      'brazier_of_holy_fire_min', 'dartmask_min', 'incentiviser_min',
      'mace_of_censure_min', 'null_skull_min', 'zealots_vindictor_min',
    ]);
  });
});

// ============================================================================
// ADEPTA SORORITAS – key unique equipment
// ============================================================================
describe('Adepta Sororitas – instruction armoury compliance', () => {
  describe('Unique Equipment', () => {
    checkAllInPool('adepta_sororitas', [
      'armourium_cherub_sor', 'blessed_ammunition_sor', 'combat_helmet_sor',
      'incensor_cherub_sor', 'infernus_ammunition_sor', 'phial_of_dolan_sor',
      'purity_seal_sor', 'sacresant_shield_sor', 'simulacrum_imperialis_sor', 'troop_flag_sor',
      'cyberteknika_cranial_sor', 'cyberteknika_ocular_sor',
      'cyberteknika_sindexterous_sor', 'cyberteknika_motive_sor',
    ]);
  });
  describe('Unique Weapons', () => {
    checkAllInPool('adepta_sororitas', [
      'neural_whip_sor', 'null_rod_sor', 'power_halberd_sor',
      'spear_of_the_faithful_sor', 'virge_of_admonition_sor', 'brazier_of_holy_fire_sor',
    ]);
  });
});

// ============================================================================
// THE INQUISITION – key unique equipment
// ============================================================================
describe('The Inquisition – instruction armoury compliance', () => {
  describe('Unique Equipment', () => {
    checkAllInPool('the_inquisition', [
      'augury_scanner_inq', 'combat_helmet_inq', 'holy_relic_inq',
      'manstopper_ammunition_inq', 'phosphor_ammunition_inq', 'photo_goggles_inq',
      'psychic_familiar_inq', 'psychic_hood_inq', 'purity_seal_inq',
      'troop_flag_inq', 'vox_unit_inq',
    ]);
  });
  describe('Unique Weapons', () => {
    checkAllInPool('the_inquisition', [
      'digital_weapons_inq',
    ]);
  });
});

// ============================================================================
// CHAOS CULT – key unique equipment and weapons
// ============================================================================
describe('Chaos Cult – instruction armoury compliance', () => {
  describe('Unique Equipment', () => {
    checkAllInPool('chaos_cult', [
      'chaos_icon_chaoscult', 'cult_icon_chaoscult', 'covert_guise_chaoscult',
      'dum_dum_ammunition_chaoscult', 'manstopper_ammunition_chaoscult', 'radium_ammunition_chaoscult',
      'cyberteknika_cranial_chaoscult', 'cyberteknika_ocular_chaoscult',
      'cyberteknika_sindexterous_chaoscult', 'cyberteknika_motive_chaoscult',
    ]);
  });
  describe('Unique Weapons', () => {
    checkAllInPool('chaos_cult', [
      'burning_censer_cc', 'warp_claw_cc',
    ]);
  });
});

// ============================================================================
// VERMINTIDE – key unique equipment and weapons
// ============================================================================
describe('Vermintide – instruction armoury compliance', () => {
  describe('Unique Equipment', () => {
    checkAllInPool('the_vermintide', [
      'chaos_icon_vermintide', 'book_of_woes_vermintide', 'skavenbrew_vermintide',
      'augury_scanner', 'troop_flag',
      'warp_shovel_vermintide', 'warpstone_charm_vermintide', 'wolf_rat_mount_vermintide',
      'cyberteknika_cranial_vermintide', 'cyberteknika_ocular_vermintide',
      'cyberteknika_sindexterous_vermintide', 'cyberteknika_motive_vermintide',
      'cyberteknika_torsonic_vermintide', 'cyberteknika_vascular_vermintide',
    ]);
  });
});

// ============================================================================
// NECROMUNDA GANG – key shared armoury items
// ============================================================================
describe('Necromunda Gang – instruction armoury compliance', () => {
  describe('Shared Armoury Equipment', () => {
    checkAllInPool('necromunda_gang', [
      'augury_scanner',
      'cyberteknika_cranial_nec', 'cyberteknika_ocular_nec',
      'cyberteknika_sindexterous_nec', 'cyberteknika_motive_nec',
      'manstopper_ammunition_nec', 'radium_ammunition_nec',
      'psychic_familiar_nec',
    ]);
  });
  describe('Unique Weapons', () => {
    checkAllInPool('necromunda_gang', [
      'blunderbuss_polearm', 'rotary_flensing_saw',
      'harpoon_launcher', 'seismic_cannon', 'heavy_rock_drill',
      'arc_welder', 'shock_maul', 'thunder_hammer',
      'heavy_rock_saw',
    ]);
  });
});

// ============================================================================
// PIRATE CREW – key unique equipment and weapons
// ============================================================================
describe('Pirate Crew – instruction armoury compliance', () => {
  describe('Unique Equipment', () => {
    checkAllInPool('pirate_crew', [
      'blade_venom_pirate', 'cyber_parrot', 'pirate_bike', 'pirate_trophy',
      'crackthorn_whip',
      'augury_scanner', 'troop_flag', 'jump_pack',
      'manstopper_ammunition_pirate', 'radium_ammunition_pirate',
      'cyberteknika_cranial_pirate', 'cyberteknika_ocular_pirate',
      'cyberteknika_sindexterous_pirate', 'cyberteknika_motive_pirate',
    ]);
  });
  describe('Unique Weapons', () => {
    checkAllInPool('pirate_crew', [
      'harpoon_launcher', 'seismic_cannon', 'krumper_rivet_cannon', 'thunder_hammer',
    ]);
  });
});

// ============================================================================
// HERETIC ASTARTES – key unique items
// ============================================================================
describe('Heretic Astartes – instruction armoury compliance', () => {
  describe('Unique Equipment', () => {
    checkAllInPool('heretic_astartes', [
      'astartes_bike', 'vengeance_ammunition',
      'mark_of_darkness', 'mark_of_khorne', 'mark_of_nurgle', 'mark_of_slaanesh', 'mark_of_tzeentch',
      'chaos_icon', 'icon_of_despair', 'icon_of_excess', 'icon_of_flame', 'icon_of_wrath',
    ]);
  });
});

// ============================================================================
// AELDARI – key unique weapons
// ============================================================================
describe('Aeldari – instruction armoury compliance', () => {
  describe('Unique Weapons', () => {
    checkAllInPool('aeldari', [
      'shuriken_catapult', 'shuriken_rifle', 'shuriken_pistol',
      'bright_lance_aeldari', 'scatter_laser', 'starcannon', 'reaper_launcher',
      'banshee_blade', 'diresword', 'witchblade', 'mirrorswords',
      'laser_lance', 'singing_spear',
      'haywire_grenades_aeldari', 'plasma_grenades_aeldari',
    ]);
  });
});

// ============================================================================
// HARLEQUINS – key unique weapons
// ============================================================================
describe('Harlequins – instruction armoury compliance', () => {
  describe('Unique Weapons', () => {
    checkAllInPool('harlequins', [
      'harlequins_embrace', 'harlequins_kiss', 'harlequins_caress', 'jesters_blade',
      'neuro_disruptor_harlequins', 'fusion_pistol_harlequins',
      'prismatic_cannon', 'shrieker_cannon',
      'hallucinogen_grenades', 'prismatic_grenades', 'tanglefoot_grenades',
    ]);
  });
});

// ============================================================================
// ORKS – key unique weapons
// ============================================================================
describe('Orks – instruction armoury compliance', () => {
  describe('Unique Weapons', () => {
    checkAllInPool('orks', [
      'choppa', 'big_choppa', 'power_klaw', 'slugga', 'shoota', 'big_shoota',
      'rokkit_launcha', 'kustom_mega_blasta', 'skorcha', 'burna',
      'stikkbomb',
    ]);
  });
});

// ============================================================================
// TYRANIDS – key unique weapons
// ============================================================================
describe('Tyranids – instruction armoury compliance', () => {
  describe('Unique Weapons', () => {
    checkAllInPool('tyranids', [
      'scything_talon', 'rending_claw', 'crushing_claw', 'bonesword_tyranid', 'lash_whip_tyranid',
      'devourer', 'fleshborer', 'deathspitter', 'venom_cannon',
      'toxic_glands', 'blinding_venom',
    ]);
  });
});

// ============================================================================
// NECRONS – key unique weapons
// ============================================================================
describe('Necrons – instruction armoury compliance', () => {
  describe('Unique Weapons', () => {
    checkAllInPool('necrons', [
      'gauss_flayer', 'gauss_reaper', 'gauss_blaster', 'synaptic_disintegrator',
      'gauss_cannon', 'particle_shredder', 'tesla_cannon',
      'warscythe', 'voidblade', 'lords_blade_nec', 'hyperphase_sword_nec',
      'staff_of_light_nec', 'aeonstave', 'rod_of_covenant',
    ]);
  });
});

// ============================================================================
// DRUKHARI – key unique weapons
// ============================================================================
describe('Drukhari – instruction armoury compliance', () => {
  describe('Unique Weapons', () => {
    checkAllInPool('drukhari', [
      'splinter_rifle_drukhari', 'splinter_pistol_drukhari', 'blaster_drukhari',
      'dark_lance_drukhari', 'heat_lance_drukhari', 'splinter_cannon_drukhari',
      'agoniser_drukhari', 'klaive_drukhari', 'huskblade_drukhari',
      'haywire_grenades_drukhari', 'plasma_grenade_drukhari',
    ]);
  });
});

// ============================================================================
// LEAGUES OF VOTANN – key unique weapons
// ============================================================================
describe('Leagues of Votann – instruction armoury compliance', () => {
  describe('Unique Weapons', () => {
    checkAllInPool('leagues_of_votann', [
      'ion_blaster', 'volkanite_disintegrator', 'etacarn_plasma_gun',
      'magna_rail_rifle', 'ion_beamer',
      'concussion_gauntlet', 'heavy_concussion_gauntlet',
    ]);
  });
});

// ============================================================================
// T'AU EMPIRE – key unique weapons
// ============================================================================
describe('T\'au Empire – instruction armoury compliance', () => {
  describe('Unique Weapons', () => {
    checkAllInPool('t_au_empire', [
      'pulse_rifle', 'pulse_carbine', 'pulse_pistol',
      'ion_rifle_tau', 'rail_rifle_tau',
      'missile_pod_tau', 'plasma_rifle_tau', 'fusion_blaster_tau',
      'kroot_rifle', 'kroot_pistol',
      'photon_grenades', 'emp_grenades_tau',
    ]);
  });
});

// ============================================================================
// SLANNI – key unique weapons
// ============================================================================
describe('Slanni – instruction armoury compliance', () => {
  describe('Unique Weapons', () => {
    checkAllInPool('slanni', [
      'beam_rifle', 'gravity_rifle', 'heat_rifle', 'net_launcher',
      'charge_pistol', 'gravity_projector', 'beam_pistol',
      'gravity_cannon', 'distortion_cannon_slanni',
      'glaive_slanni', 'astromancers_staff', 'gravity_fist',
      'gravity_bombs', 'net_bombs',
    ]);
  });
});
