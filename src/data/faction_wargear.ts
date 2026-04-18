/**
 * Faction Wargear Definitions
 *
 * Maps faction IDs (and unit IDs for overrides) to lists of allowed weapon/
 * armour/equipment IDs from the shared weapon pool. This drives the filtering
 * inside WargearPanel so that only lore-appropriate options are shown.
 *
 * Weapon IDs come from src/data/weapons.ts and src/data/equipment.ts.
 *
 * Profiles used here:
 *   IMPERIAL_ALL  – common shared imperial loadout
 *   CHAOS_ALL     – imperial + chaos-specific weapons
 *   DAEMON_BASIC  – exact Chaos Daemons armoury (melee/equipment only)
 *   GANGER        – street/underhive weaponry (no heavy melta, no power armour)
 *   ORK           – crude but effective (no precision weapons)
 *   XENOS_ELITE   – sophisticated xenos without heavy imperial tech
 *   MELEE_ONLY    – only melee and thrown weapons
 */

// ---------------------------------------------------------------------------
// Weapon ID buckets — aligned to src/data/weapons.ts
// ---------------------------------------------------------------------------

/**
 * UNIVERSAL LISTS
 * These lists contain only the most common weapons available to almost ALL
 * Imperial/Chaos factions (e.g. Guard, Gangers, Cultists).
 * Specialized weapons (Primaris, Sisters, Scions) are in separate modules below.
 */

const BASIC_RANGED_IDS: string[] = [
  'autogun', 'automatic_shotgun', 'boltgun',
  'las_carbine', 'las_rifle', 'shotgun',
];

const PISTOL_IDS: string[] = [
  'autopistol', 'bolt_pistol',
  'laspistol', 'plasma_pistol', 'stub_pistol',
];

const SPECIAL_RANGED_IDS: string[] = [
  'flamer', 'grenade_launcher',
  'combi_weapon', 'melta_gun', 'plasma_gun', 'storm_bolter',
  'heavy_stubber', 'longlas',
];

const HEAVY_RANGED_IDS: string[] = [
  'autocannon', 'heavy_bolter', 'heavy_flamer',
  'lascannon', 'missile_launcher', 'multi_melta', 'plasma_cannon',
  'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon'
];

const THROWN_IDS: string[] = [
  'blasting_charge', 'electro_grenades', 'frag_grenades', 'gunk_bombs',
  'incendiary_grenades', 'krak_grenades', 'melta_bombs',
  'smoke_grenades', 'throwing_knives', 'toxin_grenades',
];

/** Basic melee weapons available to most factions (bayonet added per-faction below) */
const BASIC_MELEE_IDS: string[] = [
  'blade', 'bludgeon', 'close_combat_weapon', 'flail', 'halberd', 'paired_blades',
];

const SPECIAL_MELEE_IDS: string[] = [
  'butchers_cleaver', 'butchers_chain_cleaver', 'chain_blade', 'chain_glaive',
  'force_rod', 'force_staff', 'force_weapon', 'goad_lance', 'lightning_claw',
  'plasma_blade', 'poison_blade', 'power_weapon', 'shock_baton', 'shock_stave',
  'twin_butchers_chain_cleavers', 'las_cutter'
];

const HEAVY_MELEE_IDS: string[] = [
  'chain_fist', 'eviscerator', 'heavy_plasma_blade', 'heavy_power_fist', 'heavy_power_weapon',
  'shock_maul', 'thunder_hammer', 'two_handed_blade', 'two_handed_hammer',
];

const CHAOS_SPECIFIC_IDS: string[] = [
  'demon_weapon', 'fell_dagger',
];

const ARMOUR_IDS: string[] = [
  'standard_armour', 'heavy_armour', 'power_armour', 'terminator_armour',
  'shield', 'heavy_shield',
];

const EQUIPMENT_IDS: string[] = [
  'augury_scanner', 'camo_cloak', 'combat_helmet', 'filter_plugs',
  'grapnel_launcher', 'grav_chute', 'holy_relic', 'iron_halo',
  'jump_pack', 'medicae_kit', 'photo_goggles', 'psychic_hood',
  'purity_seal', 'rosarius', 'scope', 'shovel', 'troop_flag', 'vox_unit',
];

// ---------------------------------------------------------------------------
// Specialized Modules (Add these to specific factions)
// ---------------------------------------------------------------------------

// Astartes / Primaris Specific
const PRIMARIS_WEAPONS_IDS = [
  'automatic_bolt_rifle', 'bolt_rifle', 'bolt_sniper_rifle', 'bolt_carbine',
  'heavy_bolt_pistol', 'assault_bolter', 'heavy_melta_rifle',
];
const ASTARTES_HEAVY_IDS = ['reaper_chaincannon', 'cyclone_missile_launcher', 'combi_bolter'];
const TWIN_LINKED_IDS = ['twin_bolt_pistols', 'twin_heavy_stubber', 'twin_lascannon'];

// Sisters of Battle Specific
const SORORITAS_WEAPONS_IDS = [
  'condemnor_boltgun', 'hand_flamer', 'twin_hand_flamers',
  'inferno_pistol', 'twin_inferno_pistols',
];

// Tempestus / Kasrkin / Elite Guard
const TEMPESTUS_WEAPONS_IDS = [
  'hotshot_lasgun', 'hotshot_laspistol',
];

// Ogryn
const OGRYN_WEAPONS_IDS = ['ripper_gun', 'grenadier_gauntlet'];

// Misc Modules
const MOLE_LAUNCHER_IDS = ['mole_launcher'];
const MINING_WEAPONS_IDS = ['mining_laser', 'seismic_cannon', 'heavy_rock_drill', 'heavy_rock_saw', 'arc_welder', 'harpoon_launcher'];
const WEB_WEAPONS_IDS = ['webber', 'web_pistol'];
const NEEDLE_WEAPONS_IDS = ['needle_pistol', 'needle_rifle'];
const GRAV_WEAPONS_IDS = ['grav_pistol', 'grav_gun', 'grav_cannon'];
const ARC_WEAPONS_IDS = ['arc_rifle', 'heavy_arc_rifle', 'arc_pistol_admech', 'arc_claw_admech']; // Some AdMech overlap
const VOLKITE_WEAPONS_IDS = ['volkite_pistol'];
const ORK_KOMMANDO_IDS = ['krumper_rivet_cannon'];
const STAKETHROWER_IDS = ['stakethrower'];
const INFERNO_WEAPONS_IDS = ['inferno_pistol', 'twin_inferno_pistols'];

// ---------------------------------------------------------------------------
// Composite profiles
// ---------------------------------------------------------------------------

/** Full imperial arsenal – restricted to common items */
const IMPERIAL_ALL = [
  ...BASIC_RANGED_IDS, ...PISTOL_IDS, ...SPECIAL_RANGED_IDS,
  ...HEAVY_RANGED_IDS, ...THROWN_IDS,
  ...BASIC_MELEE_IDS, ...SPECIAL_MELEE_IDS, ...HEAVY_MELEE_IDS,
  ...ARMOUR_IDS, ...EQUIPMENT_IDS,
];

/** Imperial arsenal WITH Bayonet Lug support (Astra Militarum, Sororitas, etc.) */
const IMPERIAL_WITH_BAYONET = [
  ...IMPERIAL_ALL,
  'bayonet',
];

/** Mark of Chaos IDs – available to most Heretic Astartes models via the Wargear panel */
const MARK_OF_CHAOS_IDS = [
  'mark_of_darkness', 'mark_of_khorne', 'mark_of_nurgle', 'mark_of_slaanesh', 'mark_of_tzeentch',
];

/** Units that CANNOT purchase Marks of Chaos (per instruction: their battlekit lists
 *  "weapons, armour, or equipment" — no Mark of Chaos). */
const MARK_BANNED_UNIT_IDS = new Set(['ha_chaos_cultist']);

/** Chaos arsenal = imperial + chaos-specific weapons + HA Icons & equipment */
const CHAOS_ALL = [
  ...IMPERIAL_ALL,
  'bayonet',
  ...CHAOS_SPECIFIC_IDS,
  // Icons of Chaos
  'chaos_icon', 'icon_of_despair', 'icon_of_excess', 'icon_of_flame', 'icon_of_wrath',
  // HA-specific equipment
  'astartes_bike', 'vengeance_ammunition',
  // Chaos often uses these
  ...ASTARTES_HEAVY_IDS, ...VOLKITE_WEAPONS_IDS,
  'combi_bolter', 'twin_bolt_pistols', 'hand_flamer', 'inferno_pistol',
];

/** Pure daemons */
const DAEMON_BASIC = [
  // Basic Melee
  'blade', 'bludgeon', 'close_combat_weapon', 'halberd',
  // Special Melee (Psyker Only units can pick these)
  'force_rod', 'force_staff',
  // Heavy Melee
  'two_handed_blade', 'two_handed_hammer',
  // Armour
  'shield',
  // Equipment (faction-specific icon is in CHAOS_DAEMON_IDS as 'icon_of_vengeance_daemons')
  'chaos_icon', 'musical_instrument',
];

/** Underhive gangers */
const GANGER = [
  'autogun', 'las_rifle', 'shotgun', 'las_carbine', 'automatic_shotgun',
  ...PISTOL_IDS,
  'flamer', 'plasma_gun', 'grenade_launcher', 'bolt_sniper_rifle',
  'longlas', 'melta_gun', 'heavy_stubber',
  'autocannon', 'heavy_bolter',
  ...THROWN_IDS,
  ...BASIC_MELEE_IDS, 'bayonet', ...SPECIAL_MELEE_IDS,
  'eviscerator', 'heavy_power_fist', 'two_handed_blade', 'two_handed_hammer',
  'standard_armour', 'heavy_armour', 'shield', 'heavy_shield',
  'camo_cloak', 'combat_helmet', 'filter_plugs', 'grapnel_launcher',
  'medicae_kit', 'photo_goggles', 'scope', 'shovel', 'vox_unit',
  // Gangers use some of these:
  ...MINING_WEAPONS_IDS, ...WEB_WEAPONS_IDS, ...NEEDLE_WEAPONS_IDS, ...STAKETHROWER_IDS, ...MOLE_LAUNCHER_IDS,
];

/** Orks – crude but effective (no precision weapons) */
const ORK = [
  'autogun', 'shotgun', 'automatic_shotgun',
  'autopistol', 'bolt_pistol', 'laspistol', 'stub_pistol', 'hand_flamer',
  'flamer', 'plasma_gun', 'grenade_launcher', 'heavy_stubber',
  'heavy_bolter', 'autocannon', 'heavy_flamer',
  ...THROWN_IDS,
  ...BASIC_MELEE_IDS,
  'chain_blade', 'power_weapon', 'chain_glaive',
  'eviscerator', 'heavy_power_fist', 'chain_fist', 'thunder_hammer',
  'two_handed_blade', 'two_handed_hammer',
  'standard_armour', 'heavy_armour', 'shield',
  'combat_helmet', 'filter_plugs', 'grapnel_launcher', 'medicae_kit',
  ...ORK_KOMMANDO_IDS,
];

/** Sophisticated xenos */
const XENOS_ELITE = [
  ...PISTOL_IDS,
  'bolt_rifle', 'flamer', 'plasma_gun', 'bolt_sniper_rifle', 'grenade_launcher',
  'heavy_bolter', 'lascannon', 'autocannon', 'heavy_flamer',
  ...THROWN_IDS,
  ...BASIC_MELEE_IDS, ...SPECIAL_MELEE_IDS, ...HEAVY_MELEE_IDS,
  'standard_armour', 'heavy_armour', 'power_armour', 'shield',
  'camo_cloak', 'combat_helmet', 'filter_plugs', 'iron_halo',
  'jump_pack', 'grav_chute', 'grapnel_launcher', 'medicae_kit',
  'photo_goggles', 'scope',
  // Xenos might have these
  ...NEEDLE_WEAPONS_IDS, ...WEB_WEAPONS_IDS,
];

/** Melee / beast units – only melee and thrown */
const MELEE_ONLY = [
  ...BASIC_MELEE_IDS, ...THROWN_IDS,
  'standard_armour', 'shield',
  'combat_helmet', 'filter_plugs',
];

// ---------------------------------------------------------------------------
// Per-faction specific equipment ID buckets
// ---------------------------------------------------------------------------

const HA_VARIANT_IDS: string[] = [
  'combat_helmet_ha', 'icon_of_vengeance_ha', 'toxin_grenades_ha',
  // Alpha Legion
  'throwing_power_knives_al', 'shroud_bombs_al',
  // Death Guard
  'poison_vents_dg', 'mischievous_nurgling_dg',
  'blight_grenades_dg', 'blight_launcher_dg', 'corrupted_staff_dg', 'cursed_plague_bell_dg',
  'great_plague_blade_dg', 'heavy_blight_launcher_dg', 'heavy_plague_spewer_dg',
  'plague_blade_dg', 'plague_spewer_dg', 'plaguespurt_gauntlet_dg',
  // Emperor's Children
  'sonic_shriekers_ec',
  'blastmaster_ec', 'blissblade_ec', 'phoenix_power_spear_ec', 'rapture_lash_ec',
  'screamer_pistol_ec', 'sonic_blaster_ec', 'twin_screamer_pistols_ec',
  // Iron Warriors
  'cyberteknika_cranial_iw', 'cyberteknika_ocular_iw', 'cyberteknika_sindexterous_iw',
  'cyberteknika_motive_iw', 'cyberteknika_torsonic_iw', 'cyberteknika_vascular_iw',
  'shrapnel_bolter_iw', 'shrapnel_cannon_iw', 'shrapnel_pistol_iw', 'mortar',
  // Night Lords
  'chain_snare_nl', 'comms_jammer_nl', 'grisly_trophy_nl', 'ventrilokar_vox_nl',
  'terrorchem_vials_nl',
  // Thousand Sons
  'disc_of_tzeentch_ts', 'icon_of_flame_ts',
  'inferno_boltgun_ts', 'inferno_bolt_pistol_ts', 'inferno_combi_bolter_ts',
  'force_stave_ts', 'power_claw_ts', 'soulreaper_cannon_ts',
  'meltagun_ts', 'hand_flamer_ts',
  // World Eaters
  'axe_of_dismemberment_we', 'blood_harpoon_we', 'heavy_chain_weapon_we', 'twin_chain_blades_we',
  // HA Heavy Melee (Helbrute purchasable weapons)
  'helbrute_hammer_ha', 'power_scourge_ha',
  // HA Special Melee — Raptor-only purchase (shown only to Raptor-upgraded models via getAllowedWargearIds)
  'warp_claws',
];

/** Items always available to every HA variant regardless of subfaction selection */
const HA_SHARED_IDS: string[] = [
  'combat_helmet_ha', 'icon_of_vengeance_ha', 'toxin_grenades_ha',
  'helbrute_hammer_ha', 'power_scourge_ha',
];

/**
 * Items from the shared EQUIPMENT_IDS / ARMOUR_IDS pools that are NOT in the
 * Heretic Astartes Armoury and must be stripped from the HA wargear list.
 */
const HA_EXCLUDED_IDS: ReadonlySet<string> = new Set([
  // Shared equipment not in HA Armoury
  'augury_scanner', 'camo_cloak', 'holy_relic', 'iron_halo',
  'medicae_kit', 'musical_instrument', 'photo_goggles', 'psychic_hood',
  'purity_seal', 'rosarius', 'troop_flag', 'vox_unit',
  // Shared armour not in HA Armoury
  'heavy_armour',
]);

/**
 * Per-faction excluded IDs.  Items from base composite profiles (IMPERIAL_ALL,
 * CHAOS_ALL, GANGER, XENOS_ELITE, etc.) that the faction's instruction-defined
 * Armoury does NOT include.  Applied in getWargearIdsForUnit().
 */
const FACTION_EXCLUDED_IDS: Partial<Record<string, ReadonlySet<string>>> = {
  adeptus_astartes: new Set([
    'augury_scanner', 'medicae_kit', 'musical_instrument', 'photo_goggles', 'rosarius', 'shovel', 'vox_unit',
    'heavy_armour',
  ]),
  adepta_sororitas: new Set([
    'augury_scanner', 'camo_cloak', 'grav_chute', 'iron_halo', 'photo_goggles', 'psychic_hood', 'shovel',
    'heavy_armour', 'terminator_armour', 'heavy_shield',
  ]),
  adeptus_mechanicus: new Set([
    'augury_scanner', 'camo_cloak', 'grav_chute', 'iron_halo', 'photo_goggles', 'psychic_hood', 'rosarius', 'shovel', 'troop_flag',
    'heavy_armour', 'terminator_armour', 'shield', 'heavy_shield',
  ]),
  adeptus_custodes: new Set([
    'augury_scanner', 'camo_cloak', 'grav_chute', 'iron_halo', 'medicae_kit', 'musical_instrument', 'photo_goggles', 'psychic_hood', 'rosarius', 'shovel', 'troop_flag', 'vox_unit',
    'heavy_armour', 'terminator_armour', 'shield',
  ]),
  adeptus_ministorum: new Set([
    'camo_cloak', 'grav_chute', 'iron_halo', 'jump_pack', 'psychic_hood', 'shovel',
    'standard_armour', 'heavy_armour', 'power_armour', 'terminator_armour', 'heavy_shield',
  ]),
  officio_assassinorum: new Set([
    'camo_cloak', 'grav_chute', 'iron_halo', 'jump_pack', 'musical_instrument', 'psychic_hood', 'rosarius', 'shovel', 'troop_flag',
    'heavy_armour', 'power_armour', 'terminator_armour', 'shield', 'heavy_shield',
  ]),
  astra_militarum: new Set([
    'grav_chute', 'holy_relic', 'iron_halo', 'psychic_hood', 'purity_seal', 'rosarius',
    'terminator_armour',
  ]),
  the_inquisition: new Set([
    'camo_cloak', 'grav_chute', 'iron_halo', 'jump_pack', 'shovel',
    'heavy_armour', 'heavy_shield',
  ]),
  // Grey Knights use the same Armoury as Adeptus Astartes
  grey_knights: new Set([
    'augury_scanner', 'medicae_kit', 'musical_instrument', 'photo_goggles', 'rosarius', 'shovel', 'vox_unit',
    'heavy_armour',
  ]),
  chaos_cult: new Set([
    'camo_cloak', 'grav_chute', 'holy_relic', 'iron_halo', 'jump_pack', 'psychic_hood', 'purity_seal', 'rosarius', 'shovel',
    'terminator_armour', 'heavy_shield',
  ]),
  genestealer_cults: new Set([
    'scope', 'shovel', 'vox_unit',
    'shield', 'heavy_shield',
  ]),
  leagues_of_votann: new Set([
    'camo_cloak', 'iron_halo', 'grav_chute', 'photo_goggles',
    'heavy_armour',
  ]),
  pirate_crew: new Set([
    'camo_cloak', 'shovel',
    'heavy_shield',
  ]),
  the_vermintide: new Set([
    'camo_cloak', 'medicae_kit',
  ]),
  necromunda_gang: new Set([
    'shovel',
    'heavy_shield',
  ]),
};

/** Per-subfaction variant-specific wargear for Heretic Astartes.
 *  When a subfaction is active, only that subfaction's items (plus HA_SHARED_IDS)
 *  are shown instead of the full HA_VARIANT_IDS pool. */
const HA_SUBFACTION_WARGEAR: Record<string, string[]> = {
  alpha_legion:     [...HA_SHARED_IDS, 'throwing_power_knives_al', 'shroud_bombs_al'],
  death_guard:      [...HA_SHARED_IDS,
    'poison_vents_dg', 'mischievous_nurgling_dg',
    'blight_grenades_dg', 'blight_launcher_dg', 'corrupted_staff_dg', 'cursed_plague_bell_dg',
    'great_plague_blade_dg', 'heavy_blight_launcher_dg', 'heavy_plague_spewer_dg',
    'plague_blade_dg', 'plague_spewer_dg', 'plaguespurt_gauntlet_dg',
  ],
  emperors_children: [...HA_SHARED_IDS,
    'sonic_shriekers_ec',
    'blastmaster_ec', 'blissblade_ec', 'phoenix_power_spear_ec', 'rapture_lash_ec',
    'screamer_pistol_ec', 'sonic_blaster_ec', 'twin_screamer_pistols_ec',
  ],
  iron_warriors:    [...HA_SHARED_IDS,
    'cyberteknika_cranial_iw', 'cyberteknika_ocular_iw', 'cyberteknika_sindexterous_iw',
    'cyberteknika_motive_iw', 'cyberteknika_torsonic_iw', 'cyberteknika_vascular_iw',
    'shrapnel_bolter_iw', 'shrapnel_cannon_iw', 'shrapnel_pistol_iw', 'mortar',
  ],
  night_lords:      [...HA_SHARED_IDS,
    'chain_snare_nl', 'comms_jammer_nl', 'grisly_trophy_nl', 'ventrilokar_vox_nl',
    'terrorchem_vials_nl',
  ],
  thousand_sons:    [...HA_SHARED_IDS,
    'disc_of_tzeentch_ts', 'icon_of_flame_ts',
    'inferno_boltgun_ts', 'inferno_bolt_pistol_ts', 'inferno_combi_bolter_ts',
    'force_stave_ts', 'power_claw_ts', 'soulreaper_cannon_ts',
    'meltagun_ts', 'hand_flamer_ts',
    'musical_instrument_ts', 'troop_flag_ts',
  ],
  world_eaters:     [...HA_SHARED_IDS,
    'axe_of_dismemberment_we', 'blood_harpoon_we', 'heavy_chain_weapon_we', 'twin_chain_blades_we',
  ],
  word_bearers:     [...HA_SHARED_IDS],
  renegade_space_marines: [...HA_SHARED_IDS],
  no_variant:       [...HA_SHARED_IDS],
};

const CHAOS_DAEMON_IDS: string[] = [
  'chaos_icon_daemons', 'icon_of_vengeance_daemons', 'musical_instrument_daemons',
  'banner_of_blood_khorne', 'brass_horns_khorne', 'collar_of_khorne', 'cuirass_of_rage_khorne',
  'rapturous_standard_slaanesh',
  'the_endless_gift_nurgle', 'mischievous_nurgling_nurgle', 'nurgling_palanquin_nurgle',
  'plague_banner_nurgle', 'sloppity_bilepipe_nurgle',
  'blasted_standard_tzeentch', 'disc_of_tzeentch_daemons', 'icon_of_tzeentch_daemons',
];

const CHAOS_DAEMONS_WEAPON_IDS: string[] = [
  // Blood Legion
  'scorched_skull_cannon', 'blade_of_blood', 'hellblade_daemon',
  // Legion of Excess
  'lashes_of_torment', 'whips_of_agony', 'alluring_musk',
  // Plague Legion
  'deaths_heads', 'rancid_vomit', 'foul_balesword', 'marotter', 'plaguesword',
  // Scintillating Legion
  'herald_staff', 'ritual_dagger', 'soul_eater_stave',
];

const CHAOS_CULT_IDS: string[] = [
  'chaos_icon_chaoscult', 'cult_icon_chaoscult', 'covert_guise_chaoscult',
  'dum_dum_ammunition_chaoscult', 'manstopper_ammunition_chaoscult', 'musical_instrument', 'radium_ammunition_chaoscult',
  'psychic_familiar_cc',
  // Chaos Cult unique weapons
  'burning_censer_cc',
  // Chaos Cult mutation weapon (Gift of Chaos #54)
  'warp_claw_cc',
  'cyberteknika_cranial_chaoscult', 'cyberteknika_ocular_chaoscult',
  'cyberteknika_sindexterous_chaoscult', 'cyberteknika_motive_chaoscult',
];

const VERMINTIDE_IDS: string[] = [
  'chaos_icon_vermintide', 'book_of_woes_vermintide', 'musical_instrument', 'skavenbrew_vermintide',
  'augury_scanner', 'troop_flag',
  'warp_shovel_vermintide', 'warpstone_charm_vermintide', 'wolf_rat_mount_vermintide',
  'cyberteknika_cranial_vermintide', 'cyberteknika_ocular_vermintide',
  'cyberteknika_sindexterous_vermintide', 'cyberteknika_motive_vermintide',
  'cyberteknika_torsonic_vermintide', 'cyberteknika_vascular_vermintide',
  // Vermintide weapons not in base GANGER pool (plasma_blade is now in shared SPECIAL_MELEE_IDS)
  'heavy_plasma_blade',
  // Vermintide unique ranged
  'doomrocket_ver', 'warpfire_gauntlet_ver', 'warpfuel_rifle_ver', 'warpfuel_shotgun_ver', 'warpvolt_obliterator_ver',
  'warpfuel_pistol_ver', 'warpfuel_jezzail_ver', 'warpvolt_scourger_ver', 'windlauncher_ver',
  'plasma_bombs_ver', 'poison_stars_ver',
  // Vermintide unique melee
  'foetid_blade_ver', 'herding_whip_ver', 'piston_claw_ver', 'plague_censer_ver', 'things_catcher_ver',
  'warpforged_dagger_ver', 'warpstone_staff_ver', 'woe_stave_ver',
  'doomflayer_gauntlets_ver', 'grinderfists_ver', 'shock_gauntlets_ver', 'warpgrinder_ver',
];

const ADEPTUS_ASTARTES_SPECIFIC_IDS: string[] = [
  'combat_helmet_aa', 'frag_ammunition_aa', 'mortis_ammunition_aa',
  'psychic_hood_aa', 'seeker_ammunition_aa', 'holy_relic_aa', 'purity_seal_aa',
  'troop_flag_aa', 'cyberteknika_cranial_aa', 'cyberteknika_ocular_aa',
  'cyberteknika_sindexterous_aa', 'cyberteknika_motive_aa',
  'vengeance_ammunition',
  // Astartes Bike (from HA equipment, shared between AA and HA)
  'astartes_bike',
  // Iron Hands Variant – Torsonic & Vascular Cyberteknika + Servo-Skull
  'cyberteknika_torsonic_aa', 'cyberteknika_vascular_aa', 'servo_skull_ih', 'servo_medicae_ih',
  // Dark Angels Variant
  'watcher_in_the_dark',
  // Space Wolves Variant – equipment items
  'death_totem', 'thunderwolf',
  // Deathwatch Special Issue Ammunition (not CONSUMABLE – reusable)
  'derevenant_shells', 'dragonfire_bolts', 'hellfire_rounds', 'inertial_fusion_bolts',
  'kraken_bolts', 'metal_storm_shells', 'tempest_bolts', 'thermic_acceleration_rounds',
  // Deathwatch Battlekit weapons
  'deathwatch_shotgun', 'frag_cannon_dw', 'guardian_spear_dw', 'immolation_rifle',
  'infernus_heavy_bolter', 'stalker_boltgun', 'stalker_bolt_rifle',
  // Grey Knights Battlekit weapons
  'heavy_force_weapon_gk', 'heavy_psycannon', 'nemesis_force_weapon_gk', 'psilencer', 'psycannon',
  // Space Wolves Battlekit weapons
  'great_frost_axe', 'great_wolf_claw', 'stormfrag_auto_launcher', 'wulfen_frost_claws',
  // AA Campaign Shop weapons
  'animus_malorum_aa', 'burning_blade_aa', 'paragon_blade_aa',
  'psyber_berkut_aa', 'twin_siege_drill_aa', 'xenophase_sword_aa',
  // AA Campaign Shop equipment
  'aegis_armour_aa', 'armour_indomitus_aa', 'arridian_drakehide_cloak_aa', 'centurion_warsuit_aa',
  'honor_vehement_aa', 'icon_of_obstinacy_aa', 'inspired_retribution_aa', 'litany_of_hate_aa',
  'pelt_of_balewolf_aa', 'ravens_talons_aa', 'relic_of_the_primarch_aa', 'shield_eternal_aa',
  'signum_array_aa', 'standard_of_righteous_hatred_aa', 'talisman_of_sundered_souls_aa',
  'tome_of_malcador_aa', 'visage_of_death_aa',
];

const ASTRA_MILITARUM_SPECIFIC_IDS: string[] = [
  'augury_scanner_am', 'camo_cloak_am', 'combat_helmet_am',
  'dum_dum_ammunition_am', 'manstopper_ammunition_am', 'musical_instrument_am',
  'phosphor_ammunition_am', 'photo_goggles_am', 'rough_rider_horse_am',
  'troop_flag_am', 'vox_unit_am', 'cyberteknika_cranial_am', 'cyberteknika_ocular_am',
  'cyberteknika_sindexterous_am', 'cyberteknika_motive_am',
];

const ADEPTUS_MECHANICUS_SPECIFIC_IDS: string[] = [
  'combat_helmet_admech', 'holy_relic_admech', 'imperative_surge_wafer',
  'omnispex_admech', 'purity_seal_admech', 'servo_medicae_admech',
  'serberys_construct_admech', 'vox_unit_admech', 'musical_instrument',
  'cyberteknika_cranial_admech', 'cyberteknika_ocular_admech',
  'cyberteknika_sindexterous_admech', 'cyberteknika_motive_admech',
  'cyberteknika_torsonic_admech', 'cyberteknika_vascular_admech',
  // Adeptus Mechanicus unique ranged
  'arc_lance_admech', 'eradication_ray_admech', 'flechette_carbine_admech', 'galvanic_rifle_admech',
  'phosphor_blaster_admech', 'phosphor_carbine_admech', 'plasma_caliver_admech',
  'radium_carbine_admech', 'transuranic_arquebus_admech', 'volkite_blaster_admech',
  // Adeptus Mechanicus unique pistols
  'arc_pistol_admech', 'eradication_pistol_admech', 'flechette_blaster_admech', 'gamma_pistol_admech',
  'mechanicus_pistol', 'phosphor_pistol_admech', 'phosphor_serpenta_admech', 'twin_mechanicus_pistols',
  // Adeptus Mechanicus unique heavy ranged
  'magnarail_lance_admech', 'phosphor_cannon_admech', 'transonic_cannon_admech',
  // Adeptus Mechanicus unique melee
  'arc_claw_admech', 'electroleech_stave_admech', 'electrostatic_gauntlets_admech',
  'hydraulic_claw_admech', 'omnissian_axe_admech', 'pteraxii_talons_admech',
  'servo_claw_admech', 'transonic_blade_admech', 'transonic_razor_admech',
  'servo_skull_admech',
  // Skitarii Hunter Cohort variant battlekit
  'archeotech_pistol_skh', 'galvanic_caster_skh', 'mindscrambler_grenades_skh',
  'sulphur_breath_skh', 'voltlock_arquebus_skh',
];

const ADEPTUS_CUSTODES_SPECIFIC_IDS: string[] = [
  'auramite_armour_custodes', 'aquilon_armour_custodes', 'praesidium_shield_custodes',
  'amelioration_pail_custodes', 'combat_helmet_custodes', 'dawneagle_jetbike_custodes',
  'holy_relic_custodes', 'vexilla_custodes',
  'cyberteknika_cranial_custodes', 'cyberteknika_ocular_custodes',
  'cyberteknika_sindexterous_custodes', 'cyberteknika_motive_custodes',
  // Adeptus Custodes unique ranged
  'adrastus_bolt_caliver', 'balistus_grenade_launcher', 'kinetic_destroyer',
  'salvo_launcher', 'twin_las_pulsar', 'twin_adrathic_destructor', 'vertus_hurricane_bolter',
  // Adeptus Custodes unique melee
  'executioner_greatblade', 'interceptor_lance_custodes', 'misericordia', 'tarsis_buckler', 'vaultswords',
  'solerite_power_gauntlet', 'solerite_power_talon',
  // Adeptus Custodes combined weapons
  'achillus_dreadspear', 'adrasite_spear', 'castellan_axe', 'galatus_warblade',
  'guardian_spear', 'pyrithite_spear', 'sentinel_blade',
  'frag_ammunition_custodes', 'vengeance_ammunition',
  'psyk_out_grenades',
];

const ADEPTUS_MINISTORUM_SPECIFIC_IDS: string[] = [
  'augury_scanner_min', 'combat_helmet_min', 'holy_relic_min',
  'infernus_ammunition_min', 'musical_instrument', 'purity_seal_min', 'reliquarius_min', 'sanctification_orbs_min',
  // Adeptus Ministorum unique weapons
  'brazier_of_holy_fire_min', 'dartmask_min', 'incentiviser_min',
  'mace_of_censure_min', 'null_skull_min', 'zealots_vindictor_min',
  'cyberteknika_cranial_min', 'cyberteknika_ocular_min',
  'cyberteknika_sindexterous_min', 'cyberteknika_motive_min',
];

const THE_INQUISITION_SPECIFIC_IDS: string[] = [
  'augury_scanner_inq', 'combat_helmet_inq', 'holy_relic_inq',
  'manstopper_ammunition_inq', 'musical_instrument', 'phosphor_ammunition_inq', 'photo_goggles_inq',
  'psychic_familiar_inq', 'psychic_hood_inq', 'purity_seal_inq',
  'troop_flag_inq', 'vox_unit_inq',
  // The Inquisition unique weapons
  'digital_weapons_inq',
];

/** Ordo Xenos — Xenos Artifacts: up to 4 total (1 each) from Aeldari/Drukhari/Votann/Necrons/T'au */
const ORDO_XENOS_ARTIFACT_IDS: string[] = [
  // Aeldari
  'avenger_shuriken_catapult', 'death_spinner_aeldari', 'mist_staff',
  'plasma_grenades_aeldari', 'shuriken_cannon', 'shuriken_catapult', 'shuriken_pistol',
  // Drukhari
  'agoniser_drukhari', 'splinter_cannon_drukhari', 'splinter_pistol_drukhari', 'splinter_rifle_drukhari',
  // Leagues of Votann
  'ion_blaster', 'ion_pistol', 'magna_rail_rifle', 'volkanite_disintegrator',
  // Necrons
  'gauss_blaster', 'gauss_cannon', 'gauss_flayer', 'gauss_reaper', 'tesla_cannon', 'voidblade',
  // T'au Empire
  'bladestave_tau', 'emp_grenades_tau', 'honor_blade_tau', 'photon_grenades',
  'pulse_blaster', 'pulse_carbine', 'pulse_rifle', 'rail_rifle_tau',
];

const ADEPTA_SORORITAS_SPECIFIC_IDS: string[] = [
  'armourium_cherub_sor', 'blessed_ammunition_sor', 'combat_helmet_sor',
  'incensor_cherub_sor', 'infernus_ammunition_sor', 'musical_instrument', 'phial_of_dolan_sor',
  'purity_seal_sor', 'sacresant_shield_sor', 'simulacrum_imperialis_sor', 'troop_flag_sor',
  'cyberteknika_cranial_sor', 'cyberteknika_ocular_sor',
  'cyberteknika_sindexterous_sor', 'cyberteknika_motive_sor',
  // Paragon Warsuit weapons
  'twin_storm_bolter_sor', 'twin_g_launcher_sor',
  // Campaign Shop items
  'beneficence_chainsword_sor', 'casket_of_penance_sor', 'holy_judgement_sor',
  'litanies_of_faith_sor', 'quicksilver_veil_sor', 'relic_paragon_warsuit_sor',
  'saints_pulpit_sor', 'sorrowsong_sor', 'tears_of_saint_celestine_sor', 'tears_of_the_emperor_sor',
];

// Sororitas-correct special melee (no force weapons, no gang/shock weapons)
const SORORITAS_SPECIAL_MELEE_IDS: string[] = [
  'chain_blade', 'power_weapon',
  // Sororitas-exclusive:
  'neural_whip_sor', 'null_rod_sor', 'power_halberd_sor',
  'spear_of_the_faithful_sor', 'virge_of_admonition_sor', 'brazier_of_holy_fire_sor',
];
// Sororitas-correct heavy melee (subset only)
const SORORITAS_HEAVY_MELEE_IDS: string[] = [
  'eviscerator', 'heavy_power_weapon', 'two_handed_blade', 'two_handed_hammer',
];
// Full Sororitas wargear profile
const SORORITAS_WARGEAR: string[] = [
  ...BASIC_RANGED_IDS, ...PISTOL_IDS, ...SPECIAL_RANGED_IDS, ...HEAVY_RANGED_IDS, ...THROWN_IDS,
  ...BASIC_MELEE_IDS, 'bayonet',
  ...SORORITAS_SPECIAL_MELEE_IDS,
  ...SORORITAS_HEAVY_MELEE_IDS,
  ...ARMOUR_IDS, ...EQUIPMENT_IDS,
  ...ADEPTA_SORORITAS_SPECIFIC_IDS,
  // Add back specific items moved to modules
  ...INFERNO_WEAPONS_IDS, ...STAKETHROWER_IDS, 'condemnor_bolt_pistol',
];

const OFFICIO_ASSASSINORUM_SPECIFIC_IDS: string[] = [
  'synskin_bodyglove', 'sentinel_array_oa', 'spy_mask_oa', 'holy_relic_oa', 'purity_seal_oa',
  // Officio Assassinorum unique melee
  'hookfang_oa', 'neuro_gauntlet_oa', 'nemesii_blade_oa', 'phase_sword_oa', 'sympatic_dataspike_oa',
  // Officio Assassinorum unique ranged
  'exitus_rifle_oa', 'exitus_pistol_oa', 'needlespine_blaster_oa', 'neural_shredder_oa', 'toxin_ejector_oa',
  'digital_laser_oa', 'digital_laser_array_oa',
  // Officio Assassinorum unique thrown
  'poison_globes_oa', 'psyk_out_grenades_oa',
];

const TYRANIDS_SPECIFIC_IDS: string[] = [
  'abhorrent_pheromones', 'adrenal_glands', 'acid_blood', 'acid_maw',
  'balemind_membrane', 'bioplasma_discharger', 'bonded_exoskeleton',
  'dermic_symbiosis', 'enhanced_senses', 'flesh_hooks', 'membranous_mobility',
  'metamorphic_regrowth', 'temperature_adaptation', 'toxin_sacs',
];

const TYRANIDS_WEAPON_IDS: string[] = [
  // Melee
  'chitinous_claw', 'piercing_claw', 'rending_claw', 'scything_talon', 'toxic_scythe',
  // Heavy Melee
  'bone_cleaver', 'bonesword_tyranid', 'crushing_claw', 'lash_whip_tyranid', 'slayer_sabre',
  // Ranged
  'devourer', 'fleshborer', 'shardlauncher', 'spike_rifle', 'spinefists', 'strangleweb',
  // Heavy Ranged
  'barbed_strangler', 'barblauncher', 'deathspitter', 'heavy_devourer', 'heavy_venom_cannon',
  'impaler_cannon', 'miasma_cannon', 'shockcannon', 'strangethorn_cannon', 'toxinjector_harpoon', 'venom_cannon',
  // Thrown
  'blinding_venom', 'electroshock_grubs', 'desiccator_larvae', 'shreddershard_beetles', 'toxic_glands', 'venom_blast',
  // Tail Weapons
  'bone_mace', 'pincer_tail', 'tail_blade',
];

const TAU_EMPIRE_SPECIFIC_IDS: string[] = [
  'ka_chak_tarr', 'kindled_blade_tau', 'krep_chak', 'onager_gauntlet_tau',
  'battle_armour_tau', 'shield_generator_tau', 'iridium_armour',
  'air_purifiers_tau', 'automated_repair_system', 'battlesuit_support_system',
  'comms_unit_tau', 'energy_shield_tau', 'firesight_drone_controller',
  'hover_drone_tau', 'kroothawk_flock', 'medical_kit_tau',
  'multispectrum_sensor_suite', 'protected_servos_tau',
  'vectored_manoeuvring_thrusters', 'weapon_support_system',
  // Campaign Shop
  'advanced_em_scrambler', 'borthrod_gland', 'multi_sensory_discouragement_array',
  'neuro_empathic_nullifier', 'ohrtus_lantern', 'puretide_engram_neurochip',
  'seismic_destabiliser', 'serenity_tau', 'solid_image_projection_unit',
];

const TAU_EMPIRE_WEAPON_IDS: string[] = [
  // Ranged
  'dart_bow_tau', 'dvorgite_skinner', 'ion_rifle_tau', 'kroot_carbine', 'kroot_rifle',
  'kroot_shaper_rifle', 'kroot_scattergun', 'pulse_blaster', 'pulse_carbine', 'pulse_rifle',
  'rail_rifle_tau', 'semi_automatic_gl', 'tanglebomb_launcher',
  // Pistols
  'kroot_pistol', 'pulse_pistol', 'twin_pulse_pistols',
  // Heavy Ranged
  'londaxi_tribalest', 'repeater_cannon_tau', 'tanglecannon',
  // Battlesuit Weapons
  'battlesuit_blade', 'burst_cannon_tau', 'cyclic_ion_blaster', 'fragmentation_projector',
  'fusion_blaster_tau', 'he_fusion_blaster', 'hi_plasma_rifle', 'ho_burst_cannon',
  'missile_pod_tau', 'plasma_rifle_tau', 'smart_missile_system', 'tau_flamer', 'twin_burst_cannon',
  // Heavy Battlesuit
  'heavy_burst_cannon', 'heavy_rail_rifle', 'high_yield_missile_pods', 'seeker_missile',
  'twin_plasma_rifle_tau', 'twin_smart_missile_system',
  // Melee
  'bladestave_tau', 'equalizer_tau', 'honor_blade_tau', 'kroot_bayonet', 'short_blade_tau',
  // Thrown
  'blast_javelin_tau', 'emp_grenades_tau', 'hunting_javelins', 'photon_grenades', 'tri_blades_tau',
  // Campaign Shop Weapons
  'ka_chak_tarr', 'kindled_blade_tau', 'krep_chak', 'onager_gauntlet_tau',
];

const SLANNI_SPECIFIC_IDS: string[] = [
  'energy_field_slanni', 'ceremonial_armour_slanni', 'psy_barrier_slanni',
  'force_shield_slanni', 'astrolith_slanni', 'gravity_disruptor_slanni',
  'hover_palanquin_slanni', 'slanni_helmet', 'stealth_field_slanni',
  'inoculation_slanni', 'musical_instrument_slanni', 'troop_icon_slanni',
];

const SLANNI_WEAPON_IDS: string[] = [
  // Ranged
  'beam_rifle', 'charge_rifle', 'charge_shotgun', 'gravity_rifle', 'beam_sniper_rifle',
  'net_launcher', 'heat_rifle', 'scatter_rifle', 'slanni_flamer',
  // Pistols
  'charge_pistol', 'gravity_projector', 'beam_pistol', 'heat_pistol', 'net_pistol', 'neuro_disruptor_slanni',
  // Heavy Ranged
  'distortion_cannon_slanni', 'gravity_cannon', 'heavy_beamer', 'scatter_cannon_slanni',
  // Melee
  'astromancers_staff', 'glaive_slanni', 'mage_staff',
  // Heavy Melee
  'celestite_warmace', 'gravity_fist',
  // Combined
  'beam_spear', 'searing_mace', 'scatter_glaive', 'gravity_hammer',
  // Thrown
  'gravity_bombs', 'net_bombs', 'hypertoxin_grenades', 'plasma_grenades_slanni',
];

const ORKS_SPECIFIC_IDS: string[] = [
  'eavy_armour_orks', 'ded_ard_armour', 'mega_armour_orks',
  'ammo_runt', 'ard_hat_orks', 'bosspole_orks', 'distraction_grot',
  'grot_gunner', 'grot_oiler', 'grot_orderly', 'iron_gob_orks',
  'jump_rokkit_orks', 'personal_tellyporta', 'squig_bomb', 'warbike_orks',
  'cyberteknika_cranial_orks', 'cyberteknika_ocular_orks',
  'cyberteknika_sindexterous_orks', 'cyberteknika_motive_orks',
  'cyberteknika_torsonic_orks', 'cyberteknika_vascular_orks',
];

const ORKS_WEAPON_IDS: string[] = [
  // Ranged
  'burna', 'shoota', 'speshul_shoota', 'thump_gun',
  // Pistols
  'grot_blasta', 'kustom_mega_slugga', 'rokkit_pistol', 'shokka_pistol', 'slugga', 'twin_slugga',
  // Heavy Ranged
  'big_shoota', 'deffgun', 'kombi_weapon_orks', 'kustom_mega_blasta', 'kustom_shoota',
  'rokkit_launcha', 'shokk_attack_gun', 'skorcha', 'traktor_blasta', 'twin_dakkagun', 'zzap_gun',
  // Melee
  'breacha_ram', 'chain_choppa', 'choppa', 'grabba_stikk', 'grot_prod', 'lil_stikka',
  'power_snappa', 'twin_choppas', 'weirdboy_staff',
  // Heavy Melee
  'big_choppa', 'drilla_orks', 'killsaw', 'knucklebusta', 'power_klaw',
  'smash_hammer_orks', 'power_stabba', 'tankhammer', 'twin_killsaw', 'uge_choppa',
  // Thrown
  'firey_stikkbombs', 'krak_stikkbombs', 'stikkbomb', 'throwing_knives_orks',
];

const NECRONS_SPECIFIC_IDS: string[] = [
  'dispersion_shield_necrons', 'engrammatic_entangler', 'gravity_displacement_pack',
  'heart_of_darkness_necrons', 'canoptek_cloak', 'nebuloscope',
  'necrodermal_plating', 'phylactery_necrons', 'plasmacyte_accelerator',
  'plasmacyte_reanimator', 'shadowloom_necrons', 'shieldvanes_necrons',
  'tachyon_arrow_necrons', 'translocation_shroud',
];

const LEAGUES_OF_VOTANN_SPECIFIC_IDS: string[] = [
  'ancestral_crest', 'grey_crest', 'preymark_crest', 'rampart_crest',
  'teleport_crest', 'weavefield_crest', 'combat_helmet_votann',
  'exoarmour_grenade_launcher', 'mass_driver_accelerators', 'multispectral_visor_votann',
  'rollbar_searchlight', 'scope_votann', 'troop_flag_votann', 'vox_unit_votann',
  'musical_instrument_votann',
];

// ---------------------------------------------------------------------------
// Necron faction weapon IDs — sourced from src/data/weapons.ts (necronsRangedWeapons,
// necronsMeleeWeapons)
// ---------------------------------------------------------------------------

const NECRONS_STANDARD_WEAPON_IDS: string[] = [
  // Standard ranged
  'gauss_flayer', 'gauss_reaper', 'particle_beamer',
  'synaptic_disintegrator',
  // Pistols
  'gauntlet_of_fire_nec', 'particle_caster', 'transdimensional_beamer',
  // Heavy ranged
  'gauss_blaster', 'tesla_carbine',
  'gauss_cannon', 'heat_ray_nec', 'particle_shredder', 'tesla_cannon',
  'twin_gauss_blaster', 'twin_tesla_carbine',
  // Melee
  'claw_nec', 'lords_blade_nec', 'mace_nec', 'sword_nec', 'voidblade', 'warscythe',
  // Staffs (HELD)
  'abyssal_staff', 'aeonstave', 'eldritch_lance', 'rod_of_covenant',
  'staff_of_light_nec', 'tremorstave', 'voltaic_staff',
];

const NECRONS_DESTROYER_WEAPON_IDS: string[] = [
  'enmitic_annihilator', 'enmitic_disintegrator_pistol', 'enmitic_exterminator',
  'gauss_destructor',
  'hyperphase_sword_nec', 'hyperphase_thresher',
];

// ---------------------------------------------------------------------------
// Leagues of Votann faction weapon IDs — sourced from src/data/weapons.ts
// (leaguesOfVotannRangedWeapons, leaguesOfVotannMeleeWeapons)
// ---------------------------------------------------------------------------

const LEAGUES_OF_VOTANN_WEAPON_IDS: string[] = [
  // Ranged
  'etacarn_plasma_beamer', 'etacarn_plasma_gun', 'ion_blaster', 'iron_ambassador',
  'volkanite_disintegrator',
  // Pistols
  'etacarn_plasma_pistol', 'ion_pistol',
  // Heavy ranged
  'heavy_volkanite_disintegrator', 'ion_beamer', 'magna_rail_rifle', 'sp_conversion_beamer',
  // Thrown
  'throwing_plasma_knives',
  // Melee
  'concussion_gauntlet', 'heavy_concussion_gauntlet',
  'twin_concussion_gauntlets', 'twin_heavy_concussion_gauntlets',
  'plasma_blade_lv', 'heavy_plasma_blade_lv',
];

const HARLEQUINS_SPECIFIC_IDS: string[] = [
  'holo_suit', 'bio_explosive_ammunition', 'flip_belt_harlequins',
];

const HARLEQUINS_WEAPON_IDS: string[] = [
  // Ranged
  'hallucinogen_grenade_launcher',
  // Shared Aeldari-family ranged (Harlequins use these but they are defined in aeldariWeapons)
  'shuriken_catapult', 'shuriken_rifle',
  // Pistols
  'fusion_pistol_harlequins', 'harlequins_caress', 'neuro_disruptor_harlequins',
  'shuriken_pistol', 'twin_shuriken_pistols',
  // Heavy Ranged
  'bright_lance_harlequins', 'haywire_cannon_harlequins', 'prismatic_cannon',
  'shrieker_cannon', 'shuriken_cannon_harlequins',
  // Melee
  'harlequins_embrace', 'harlequins_kiss', 'jesters_blade', 'power_blade_harlequins', 'power_glaive_harlequins',
  // Thrown
  'hallucinogen_grenades', 'haywire_grenades_harlequins', 'prismatic_grenades', 'star_bolas', 'tanglefoot_grenades',
  'plasma_grenades_aeldari',
];

const GENESTEALER_CULTS_SPECIFIC_IDS: string[] = [
  'atalan_bike', 'atalan_quad', 'camo_cloak_gsc', 'cult_icon_gsc',
  'psychic_familiar_gsc', 'combat_helmet_gsc', 'photo_goggles_gsc',
  'scope_gsc', 'vox_unit_gsc',
  'cyberteknika_cranial_gsc', 'cyberteknika_ocular_gsc',
  'cyberteknika_sindexterous_gsc', 'cyberteknika_motive_gsc',
  // GSC unique melee weapons
  'bonesword_gsc', 'lash_whip_gsc', 'toxin_injector_claw',
  // GSC heavy melee / ranged not in base GANGER pool
  'heavy_rock_drill', 'heavy_rock_saw', 'seismic_cannon', 'thunder_hammer',
];

const DRUKHARI_SPECIFIC_IDS: string[] = [
  'kabalite_armour', 'wychsuit', 'incubus_warsuit', 'ghostplate_armour',
  'antitox_drukhari', 'drukhari_helmet', 'goblet_of_spite',
  'gruesome_talismens', 'hellion_skyboard', 'hell_mask_drukhari',
  'scourge_wings', 'shadow_field_drukhari', 'soul_seeker_ammunition', 'tormentor_helm',
];

const DRUKHARI_WEAPON_IDS: string[] = [
  // Ranged
  'blaster_drukhari', 'hexrifle_drukhari', 'liquifier_gun_drukhari', 'ossefactor_drukhari',
  'shredder_drukhari', 'spirit_syphon_drukhari', 'spirit_vortex_drukhari', 'splinter_rifle_drukhari',
  'splinter_pods_drukhari', 'terrorfex_drukhari', 'twin_haywire_blaster_drukhari',
  'twin_heat_lance_drukhari', 'twin_liquifier_gun_drukhari', 'twin_splinter_cannon_drukhari',
  // Pistols
  'blast_pistol_drukhari', 'splinter_pistol_drukhari', 'stinger_pistol_drukhari',
  // Heavy Ranged
  'dark_lance_drukhari', 'heat_lance_drukhari', 'splinter_cannon_drukhari',
  // Melee
  'agoniser_drukhari', 'chain_flail_drukhari', 'demiklaives_drukhari', 'hekatarii_blade_drukhari',
  'hellglaive_drukhari', 'huskblade_drukhari', 'klaive_drukhari', 'macro_scalpel_drukhari',
  'scissorhand_drukhari', 'spirit_leech_tentacles_drukhari', 'spirit_probe_drukhari', 'talos_ichor_injector_drukhari',
  // Thrown
  'haywire_grenades_drukhari', 'plasma_grenade_drukhari', 'xenospasm_grenades_drukhari', 'wraithbone_grenades_drukhari',
];

const AELDARI_SPECIFIC_IDS: string[] = [
  'aeldari_helmet', 'banshee_mask', 'blood_of_isha',
  'mesh_armour_aeldari', 'aspect_armour', 'wraithbone_armour',
  'celestial_shield_aeldari', 'force_shield_aeldari',
  'cloak_of_shadow', 'flip_belt_aeldari', 'ghosthelm_aeldari',
  'guardian_platform', 'isitha_kasra', 'jetbike_aeldari', 'jetbike_shimmershield',
  'mandiblasters_aeldari', 'shimmershield_aeldari', 'spirit_stone_aeldari', 'swooping_hawk_wings',
];

const AELDARI_WEAPON_IDS: string[] = [
  // Ranged
  'avenger_shuriken_catapult', 'cloudsweeper_aeldari', 'death_spinner_aeldari', 'dragon_fusion_gun',
  'dragons_breath_flamer', 'firepike_aeldari', 'hawks_talon', 'lasblaster_aeldari',
  'long_rifle_aeldari', 'shuriken_catapult', 'shuriken_rifle', 'spinneret_rifle',
  // Pistols
  'death_weavers', 'dragon_fusion_pistol', 'shuriken_pistol', 'sunpistol_aeldari', 'twin_shuriken_pistols',
  // Heavy Ranged
  'bright_lance_aeldari', 'distortion_scythe', 'reaper_launcher', 'scatter_laser', 'shuriken_cannon',
  'starcannon', 'tempest_launcher', 'twin_shuriken_catapult', 'wraithcannon',
  // Melee
  'banshee_blade', 'biting_blade', 'diresword', 'ghost_blade_aeldari', 'mirrorswords',
  'mist_staff', 'power_blade_aeldari', 'power_glaive_aeldari', 'scorpion_chainsword',
  'witchblade', 'witch_staff',
  // Combined
  'laser_lance', 'paired_chainsabres', 'scorpions_claw', 'singing_spear', 'star_lance',
  // Thrown
  'haywire_grenades_aeldari', 'melta_bombs_aeldari', 'plasma_grenades_aeldari', 'triskeles',
];

const PIRATE_CREW_SPECIFIC_IDS: string[] = [
  'blade_venom_pirate', 'cyber_parrot', 'musical_instrument', 'pirate_bike', 'pirate_trophy',
  'crackthorn_whip',
  // Pirate Crew weapons not in base GANGER pool
  // las_cutter is now in shared SPECIAL_MELEE_IDS (available via GANGER spread)
  'harpoon_launcher', 'seismic_cannon', 'krumper_rivet_cannon', 'thunder_hammer',
  'augury_scanner', 'troop_flag', 'jump_pack',
  'manstopper_ammunition_pirate', 'radium_ammunition_pirate',
  'cyberteknika_cranial_pirate', 'cyberteknika_ocular_pirate',
  'cyberteknika_sindexterous_pirate', 'cyberteknika_motive_pirate',
];

const NECROMUNDA_GANG_SPECIFIC_IDS: string[] = [
  'caryatid_nec', 'ridgerunner_nec', 'frenzon_nec', 'ghast_nec',
  'slaught_nec', 'spur_nec', 'stinger_mould_nec', 'stim_slug_cache_nec',
  'ash_cloak_nec', 'dustback_halamite_nec', 'sky_mantle_nec',
  'frightening_mask_nec', 'terrifying_mask_nec',
  'cult_icon_cawdor', 'ridge_walker_cawdor',
  'asbestos_mandilion_cawdor', 'cherub_cawdor',
  'displacer_field_delaque', 'digital_laser_delaque',
  'cutter_escher', 'bad_blood_escher', 'brain_lock_escher', 'hyper_escher',
  'jolt_escher', 'night_night_escher', 'puke_escher', 'wide_eye_escher',
  'mauler_goliath', 'dum_dum_ammunition_goliath',
  'outrider_quad_orlock',
  'arachni_rig_vansaar', 'servo_medicae_vansaar', 'shock_ammunition_vansaar',
  'cyberteknika_cranial_vansaar', 'cyberteknika_ocular_vansaar',
  'cyberteknika_sindexterous_vansaar', 'cyberteknika_motive_vansaar',
  'cyberteknika_torsonic_vansaar', 'cyberteknika_vascular_vansaar',
  'svenotar_trike_squat', 'telescopic_sight_squat',
  'hunting_rig_venators', 'heavy_hunting_rig_venators',
  'yeld_hunting_rig_venators', 'sthenian_hunting_rig_venators',
  'mirror_shield_venators', 'incendiary_grenades_venators',
  'magnacles_enforcers', 'nuncio_aquila_enforcers',
  'photon_flash_grenades_enforcers', 'dum_dum_ammunition_enforcers', 'shock_ammunition_enforcers',
  // Ash Waste Nomads
  'venom_caster_nomads', 'bone_talons_nomads', 'insective_knife_nomads',
  'toxin_whip_nomads', 'venom_stave_nomads', 'venom_sacs_nomads',
  'ash_orchid_venom_nomads', 'duststalker_mandible_nomads',
  'milk_of_harpy_nomads', 'tears_of_storm_nomads',
  'blast_carbine_nomads', 'blast_rifle_nomads',
  // Delegation
  'gun_skull_delegation', 'digital_laser_delegation', 'digital_laser_array_delegation',
  'shockwhip_delegation', 'sling_gun_delegation', 'cult_icon_delegation',
  'displacer_field_delegation', 'refractor_field_delegation',
  // Ratskins
  'longbow_ratskins', 'slingshot_ratskins', 'good_luck_charm_ratskins',
  'barbed_arrows_ratskins', 'explosive_arrows_ratskins', 'poison_arrows_ratskins',
  'blade_venom_ratskins',
  // Scavvies
  'scatter_cannon_scavvies', 'spear_gun_scavvies',
  // Necromunda Gang weapons not in base GANGER pool
  // las_cutter is now in shared SPECIAL_MELEE_IDS (available via GANGER spread)
  'blunderbuss_polearm', 'psychic_familiar_nec',
  'harpoon_launcher', 'seismic_cannon', 'heavy_rock_drill',
  'arc_welder', 'shock_maul', 'thunder_hammer',
  'heavy_rock_saw', 'rotary_flensing_saw',
  'augury_scanner',
  'cyberteknika_cranial_nec', 'cyberteknika_ocular_nec',
  'cyberteknika_sindexterous_nec', 'cyberteknika_motive_nec',
  'manstopper_ammunition_nec', 'radium_ammunition_nec',
  'grav_chute',
];

// ---------------------------------------------------------------------------
// Per-faction allowed wargear IDs
// ---------------------------------------------------------------------------

export const FACTION_WARGEAR: Record<string, string[]> = {
  // === IMPERIAL ===
  adeptus_astartes:      [...IMPERIAL_ALL, ...PRIMARIS_WEAPONS_IDS, ...ASTARTES_HEAVY_IDS, ...TWIN_LINKED_IDS, 'hand_flamer', 'inferno_pistol', 'volkite_pistol', ...ADEPTUS_ASTARTES_SPECIFIC_IDS],
  astra_militarum:       [...IMPERIAL_WITH_BAYONET, ...TEMPESTUS_WEAPONS_IDS, ...OGRYN_WEAPONS_IDS, ...ASTRA_MILITARUM_SPECIFIC_IDS, 'heavy_stubber', 'twin_heavy_stubber', 'mortar'],
  adeptus_custodes:      [...IMPERIAL_ALL, ...ADEPTUS_CUSTODES_SPECIFIC_IDS, 'guardian_spear', 'sentinel_blade'],
  adepta_sororitas:      [...SORORITAS_WARGEAR, ...SORORITAS_WEAPONS_IDS, 'hand_flamer'], // Explicitly add hand flamer
  adeptus_mechanicus:    [...IMPERIAL_WITH_BAYONET, ...ARC_WEAPONS_IDS, ...VOLKITE_WEAPONS_IDS, ...GRAV_WEAPONS_IDS, ...ADEPTUS_MECHANICUS_SPECIFIC_IDS],
  // Ministorum uses Eviscerator (in HEAVY_MELEE_IDS common?), Inferno Pistols, Stakethrower
  adeptus_ministorum:    [...IMPERIAL_ALL, ...ADEPTUS_MINISTORUM_SPECIFIC_IDS, ...INFERNO_WEAPONS_IDS, ...STAKETHROWER_IDS, 'hand_flamer'],
  officio_assassinorum:  [...IMPERIAL_WITH_BAYONET, ...OFFICIO_ASSASSINORUM_SPECIFIC_IDS, ...NEEDLE_WEAPONS_IDS],
  rogue_trader:          [...IMPERIAL_ALL, ...NEEDLE_WEAPONS_IDS, ...WEB_WEAPONS_IDS, 'hand_flamer', 'inferno_pistol', 'archeotech_pistol'],
  the_inquisition:       [...IMPERIAL_WITH_BAYONET, ...THE_INQUISITION_SPECIFIC_IDS, ...NEEDLE_WEAPONS_IDS, ...STAKETHROWER_IDS, ...INFERNO_WEAPONS_IDS, 'condemnor_bolt_pistol', 'hand_flamer'],
  grey_knights:          [...IMPERIAL_ALL, ...ASTARTES_HEAVY_IDS, 'storm_bolter', 'incinerator', 'psycannon', 'psilencer', 'hand_flamer'],
  
  // Arbites use generic gear but usually not heavy mining equipment/mole launchers
  adeptus_arbites:       [...GANGER.filter(id => !MOLE_LAUNCHER_IDS.includes(id) && !MINING_WEAPONS_IDS.includes(id))],

  // === CHAOS ===
  heretic_astartes:      [...CHAOS_ALL, ...ASTARTES_HEAVY_IDS, ...HA_VARIANT_IDS, ...TWIN_LINKED_IDS, 'mark_of_darkness', 'mark_of_khorne', 'mark_of_nurgle', 'mark_of_slaanesh', 'mark_of_tzeentch'],
  // grenadier_gauntlet is Ogryn-only in Chaos Cult — gated via UNIT_WARGEAR_OVERRIDES for cc_chaos_ogryn.
  chaos_cult:            [...CHAOS_ALL.filter(id => id !== 'grenadier_gauntlet'), ...CHAOS_CULT_IDS, 'heavy_stubber', 'heavy_heavy_stubber'], 
  chaos_daemons:         [...DAEMON_BASIC, ...CHAOS_DAEMON_IDS, ...CHAOS_DAEMONS_WEAPON_IDS],
  the_vermintide:        [...GANGER, ...VERMINTIDE_IDS, 'augury_scanner', 'musical_instrument', 'troop_flag', 'power_armour'],

  // === XENOS ===
  orks:                  [...ORK, ...ORKS_SPECIFIC_IDS, ...ORKS_WEAPON_IDS],
  tyranids:              [...MELEE_ONLY, ...TYRANIDS_SPECIFIC_IDS, ...TYRANIDS_WEAPON_IDS],
  // GSC shouldn't have Mole Launcher (verified) but uses GANGER base
  // GANGER includes MINING/MOLE naturally. GSC uses these.
  genestealer_cults:     [...GANGER, ...GENESTEALER_CULTS_SPECIFIC_IDS, 'hand_flamer'],
  harlequins:            [...XENOS_ELITE.filter(id => !MOLE_LAUNCHER_IDS.includes(id)), ...HARLEQUINS_SPECIFIC_IDS, ...HARLEQUINS_WEAPON_IDS],
  leagues_of_votann:     [...XENOS_ELITE.filter(id => !MOLE_LAUNCHER_IDS.includes(id)), ...MOLE_LAUNCHER_IDS, ...LEAGUES_OF_VOTANN_SPECIFIC_IDS, ...LEAGUES_OF_VOTANN_WEAPON_IDS], // Votann HAS Mole Launcher
  slanni:                [...XENOS_ELITE.filter(id => !MOLE_LAUNCHER_IDS.includes(id)), ...SLANNI_SPECIFIC_IDS, ...SLANNI_WEAPON_IDS],
  necrons:               [...XENOS_ELITE.filter(id => !MOLE_LAUNCHER_IDS.includes(id)), ...NECRONS_SPECIFIC_IDS, ...NECRONS_STANDARD_WEAPON_IDS, ...NECRONS_DESTROYER_WEAPON_IDS],
  aeldari:               [...XENOS_ELITE.filter(id => !MOLE_LAUNCHER_IDS.includes(id)), ...AELDARI_SPECIFIC_IDS, ...AELDARI_WEAPON_IDS],
  t_au_empire:           ['blade', 'bludgeon', ...TAU_EMPIRE_SPECIFIC_IDS, ...TAU_EMPIRE_WEAPON_IDS],
  drukhari:              [...XENOS_ELITE.filter(id => !MOLE_LAUNCHER_IDS.includes(id)), ...DRUKHARI_SPECIFIC_IDS, ...DRUKHARI_WEAPON_IDS],

  // === OUTLAW ===
  necromunda_gang:       [...GANGER, ...NECROMUNDA_GANG_SPECIFIC_IDS, 'hand_flamer', 'augury_scanner', 'grav_chute', 'power_armour'], 
  pirate_crew:           [...GANGER.filter(id => !MOLE_LAUNCHER_IDS.includes(id)), ...PIRATE_CREW_SPECIFIC_IDS, 'augury_scanner', 'jump_pack', 'musical_instrument', 'troop_flag', 'power_armour'],
};

// ---------------------------------------------------------------------------
// Per-unit overrides (unit-specific additional restrictions or grants)
//
// These REPLACE the faction default when present.
// ---------------------------------------------------------------------------

export const UNIT_WARGEAR_OVERRIDES: Record<string, string[]> = {
  // Chaos Cult Ogryn — can access grenadier_gauntlet (gated from other Chaos Cult models)
  cc_chaos_ogryn: [...CHAOS_ALL, 'grenadier_gauntlet', ...CHAOS_CULT_IDS],
  // Space Marine Terminators
  aa_terminator: [
    'storm_bolter', 'combi_bolter', 'heavy_bolter', 'autocannon', 'lascannon',
    'missile_launcher', 'heavy_flamer', 'cyclone_missile_launcher',
    'bolt_pistol', 'plasma_pistol', 'heavy_bolt_pistol',
    ...BASIC_MELEE_IDS, ...SPECIAL_MELEE_IDS, ...HEAVY_MELEE_IDS,
    'terminator_armour', 'shield',
    'augury_scanner', 'iron_halo', 'psychic_hood',
  ],
  ha_chaos_terminator: [
    'storm_bolter', 'combi_bolter', 'heavy_bolter', 'autocannon', 'lascannon',
    'missile_launcher', 'heavy_flamer', 'reaper_chaincannon',
    'bolt_pistol', 'plasma_pistol',
    ...BASIC_MELEE_IDS, ...SPECIAL_MELEE_IDS, ...HEAVY_MELEE_IDS,
    ...CHAOS_SPECIFIC_IDS,
    'terminator_armour', 'shield',
    'augury_scanner', 'purity_seal', 'shovel',
  ],
  // Aquilon Terminators (Custodes)
  ac_aquilon_terminator: [
    'storm_bolter', 'heavy_bolter', 'lascannon',
    'bolt_pistol', 'plasma_pistol',
    ...SPECIAL_MELEE_IDS, ...HEAVY_MELEE_IDS,
    'terminator_armour', 'shield',
    'iron_halo', 'augury_scanner',
  ],
  // Astra Militarum conscripts – very limited gear
  am_conscript: [
    'autogun', 'las_rifle', 'shotgun', 'las_carbine',
    'laspistol', 'autopistol', 'stub_pistol',
    'frag_grenades', 'krak_grenades',
    ...BASIC_MELEE_IDS, 'bayonet',
    'standard_armour', 'shield',
    'combat_helmet', 'filter_plugs',
  ],
  // Psyker models
  aa_librarian: [
    'bolt_pistol', 'plasma_pistol',
    'force_staff', 'force_weapon', 'power_weapon', 'lightning_claw',
    'power_armour', 'terminator_armour', 'shield',
    'psychic_hood', 'iron_halo', 'purity_seal', 'rosarius',
  ],
  // Tyranid Warriors
  ty_tyranid_warrior: [
    'flamer', 'grenade_launcher', 'autocannon',
    ...BASIC_MELEE_IDS, ...SPECIAL_MELEE_IDS, ...HEAVY_MELEE_IDS,
    'standard_armour',
    'combat_helmet',
  ],
  ty_hive_tyrant: [
    'flamer', 'heavy_flamer', 'heavy_bolter', 'lascannon', 'autocannon',
    'laspistol',
    ...SPECIAL_MELEE_IDS, ...HEAVY_MELEE_IDS,
    'power_armour', 'heavy_armour',
    'combat_helmet',
  ],
  // Ork Deff Dread
  or_deff_dread: [
    'autocannon', 'heavy_bolter', 'heavy_flamer', 'lascannon',
    ...HEAVY_MELEE_IDS,
    'heavy_armour',
  ],
  // Genestealer Aberrant
  gc_aberrant: [
    ...HEAVY_MELEE_IDS,
    'close_combat_weapon', 'blade', 'bludgeon',
    'standard_armour', 'shield',
    'combat_helmet',
  ],
  // Death Cult Assassins
  amin_death_cult_assassin: [
    'blade', 'close_combat_weapon', 'paired_blades',
    'chain_blade', 'power_weapon', 'lightning_claw', 'poison_blade',
    'camo_cloak', 'combat_helmet',
  ],
  // Officio Assassinorum
  oa_vindicare: [
    'bolt_sniper_rifle', 'longlas',
    'laspistol', 'autopistol',
    'blade', 'close_combat_weapon', 'power_weapon', 'poison_blade',
    'camo_cloak', 'combat_helmet', 'filter_plugs', 'melta_bombs',
  ],
  oa_eversor: [
    'autopistol',
    ...BASIC_MELEE_IDS, ...SPECIAL_MELEE_IDS,
    'chain_fist', 'heavy_power_fist',
    'melta_bombs', 'poison_blade',
    'camo_cloak', 'combat_helmet', 'filter_plugs', 'purity_seal',
  ],
  oa_callidus: [
    'laspistol',
    'blade', 'close_combat_weapon', 'power_weapon', 'lightning_claw', 'poison_blade',
    'camo_cloak', 'combat_helmet',
  ],
  // Space Wolves Wulfen — Stormfrag Auto-Launcher + melee weapons + armour + equipment
  aa_wulfen: [
    'stormfrag_auto_launcher',
    ...BASIC_MELEE_IDS, ...SPECIAL_MELEE_IDS, ...HEAVY_MELEE_IDS,
    'wulfen_frost_claws',
    'standard_armour', 'heavy_armour', 'shield', 'heavy_shield',
    'augury_scanner', 'camo_cloak', 'combat_helmet', 'filter_plugs',
    'grapnel_launcher', 'iron_halo', 'purity_seal', 'death_totem',
    'combat_helmet_aa', 'holy_relic_aa', 'purity_seal_aa',
  ],
  // Sekhetar Robot — basic melee + Power Claw + full HA ranged armoury + Heavy Flamer (ignoring limits)
  ha_sekhetar_robot: [
    // Basic melee + Power Claw only (per rules: "any Basic melee weapons, a Power Claw")
    ...BASIC_MELEE_IDS,
    'power_claw_ts',
    // "any ranged weapons from the Heretic Astartes Armoury"
    ...BASIC_RANGED_IDS, ...PISTOL_IDS, ...SPECIAL_RANGED_IDS,
    ...HEAVY_RANGED_IDS, ...THROWN_IDS,
    ...ASTARTES_HEAVY_IDS, ...TWIN_LINKED_IDS,
    ...CHAOS_SPECIFIC_IDS,
    'hand_flamer', 'inferno_pistol', 'combi_bolter', 'twin_bolt_pistols',
    'disc_of_tzeentch_ts', 'inferno_boltgun_ts', 'inferno_bolt_pistol_ts', 'inferno_combi_bolter_ts',
    'soulreaper_cannon_ts', 'meltagun_ts', 'hand_flamer_ts',
    'vengeance_ammunition',
  ],
  // Necrons Hexmark Destroyer — six one-handed weapon slots + Necrons equipment
  nec_hexmark_destroyer: [
    'gauntlet_of_fire_nec', 'particle_caster', 'transdimensional_beamer', 'enmitic_disintegrator_pistol',
    'claw_nec', 'mace_nec', 'sword_nec', 'voidblade', 'hyperphase_sword_nec', 'hyperphase_thresher',
    'engrammatic_entangler', 'heart_of_darkness', 'necrodermal_plating', 'phylactery_nec',
    'plasmacyte_accelerator', 'plasmacyte_reanimator', 'tachyon_arrow_nec', 'translocation_shroud_nec',
    'arrow_of_infinity_nec', 'infinity_mantle_nec', 'nanoscarab_casket_nec', 'resurrection_orb_nec',
    'sovereign_coronel_nec', 'transdimensional_shroud_nec', 'vanquishers_mask_nec',
  ],
};

/**
 * Get the list of allowed wargear IDs for a given unit within a faction.
 * Unit overrides take precedence; otherwise returns the faction default.
 * Returns undefined when no mapping exists (permissive fallback).
 *
 * @param subfactionId  Optional active subfaction ID — used to restrict HA variant wargear
 *                      to only the active subfaction's specific items.
 * @param selectedUpgrades  Optional map of upgrade IDs → count for the unit instance.
 *                          Used to gate Raptor-only equipment (warp_claws, jump_pack)
 *                          behind the ha_csm_raptor upgrade.
 */
export function getAllowedWargearIds(
  factionId: string,
  unitId: string,
  subfactionId?: string,
  selectedUpgrades?: Record<string, number>,
): string[] | undefined {
  // Unit-specific overrides take precedence over faction defaults
  // EXCEPT for Heretic Astartes, which needs subfaction-aware merging below.
  if (UNIT_WARGEAR_OVERRIDES[unitId] && factionId !== 'heretic_astartes') {
    return UNIT_WARGEAR_OVERRIDES[unitId];
  }

  let baseIds = FACTION_WARGEAR[factionId];
  if (!baseIds) return undefined;

  // ── Heretic Astartes: subfaction-aware variant gear + Raptor gating ──
  if (factionId === 'heretic_astartes') {
    const hasRaptor = !!selectedUpgrades && (
      (selectedUpgrades['ha_csm_raptor'] ?? 0) > 0 ||
      (selectedUpgrades['nl_depredator'] ?? 0) > 0 ||
      (selectedUpgrades['nl_warp_talon'] ?? 0) > 0
    );
    
    const activeVariant = subfactionId && subfactionId !== 'no_variant' ? subfactionId : null;
    // When a real subfaction is active include only its variant gear; when no variant is
    // selected show no variant-specific items (only the CHAOS_ALL base pool).
    const variantIds: string[] = activeVariant
      ? (HA_SUBFACTION_WARGEAR[activeVariant] ?? [])
      : HA_SHARED_IDS;

    // If a unit-specific override exists, merge it with the active variant gear
    // so subfaction-specific weapons (e.g. Force Stave for Thousand Sons Sorcerer) appear.
    const unitOverride = UNIT_WARGEAR_OVERRIDES[unitId];
    if (unitOverride) {
      const ids = [...unitOverride, ...variantIds]
        .filter(id => !HA_EXCLUDED_IDS.has(id));
      // Add marks for units that can take them
      if (subfactionId !== 'renegade_space_marines' && !MARK_BANNED_UNIT_IDS.has(unitId)) {
        ids.push(...MARK_OF_CHAOS_IDS);
      }
      return Array.from(new Set(ids));
    }
      
    // Build allowed list: base CHAOS_ALL + subfaction variant IDs + shared Heavy/Twin weapons
    // Note: We deliberately rebuild this to exclude "other subfaction" gear that might be in FACTION_WARGEAR default
    let ids: string[] = [
      ...CHAOS_ALL, 
      ...variantIds, 
      ...ASTARTES_HEAVY_IDS, 
      ...TWIN_LINKED_IDS,
    ];

    // Marks of Chaos: available to most HA units, but NOT Renegade SM (no marks at all)
    // and NOT Cultists (their battlekit excludes marks).
    if (subfactionId !== 'renegade_space_marines' && !MARK_BANNED_UNIT_IDS.has(unitId)) {
      ids.push(...MARK_OF_CHAOS_IDS);
    }

    if (hasRaptor) {
      ids = [...ids, 'warp_claws', 'jump_pack'];
    } else {
      // Jump Packs availability logic:
      // - Chaos Lord: innate
      // - Night Lords Possessed: via Curseclaw rule
      const canTakeJumpPack = 
        unitId === 'ha_chaos_lord' || 
        (subfactionId === 'night_lords' && unitId === 'ha_possessed');

      if (canTakeJumpPack) {
         if (!ids.includes('jump_pack')) ids.push('jump_pack');
      } else {
         ids = ids.filter(id => id !== 'jump_pack');
      }
    }

    // Strip shared equipment / armour not in the HA Armoury
    ids = ids.filter(id => !HA_EXCLUDED_IDS.has(id));

    // Deduplicate while preserving order
    return Array.from(new Set(ids));
  }

  // ── Per-faction excluded items filter helper ──
  const excluded = FACTION_EXCLUDED_IDS[factionId];
  const applyExclusions = (ids: string[]) =>
    excluded ? ids.filter(id => !excluded.has(id)) : ids;

  // ── The Inquisition: Ordo Xenos adds Xenos Artifacts to the wargear pool ──
  if (factionId === 'the_inquisition') {
    if (subfactionId === 'ordo_xenos') {
      return applyExclusions([...baseIds, ...ORDO_XENOS_ARTIFACT_IDS]);
    }
    return applyExclusions(baseIds);
  }

  // ── Adeptus Astartes: Jump Pack only for Captain or Assault Marine upgrade ──
  if (factionId === 'adeptus_astartes') {
    const hasAssaultMarine = (selectedUpgrades?.['aa_assault_marine'] ?? 0) > 0;
    if (unitId !== 'aa_captain' && !hasAssaultMarine) {
      return applyExclusions(baseIds.filter(id => id !== 'jump_pack'));
    }
    return applyExclusions(baseIds);
  }

  // ── Adepta Sororitas: Jump Pack only for Canoness, Seraphim, or Zephyrim upgrade ──
  if (factionId === 'adepta_sororitas') {
    const hasSeraphim = (selectedUpgrades?.['as_seraphim'] ?? 0) > 0;
    const hasZephyrim = (selectedUpgrades?.['as_zephyrim'] ?? 0) > 0;
    if (unitId !== 'as_canoness' && !hasSeraphim && !hasZephyrim) {
      return applyExclusions(baseIds.filter(id => id !== 'jump_pack'));
    }
    return applyExclusions(baseIds);
  }

  // ── Adeptus Custodes: Jump Pack only for Custodian Guard with Venatari upgrade ──
  if (factionId === 'adeptus_custodes') {
    const hasVenatari = (selectedUpgrades?.['ac_venatari'] ?? 0) > 0;
    if (!hasVenatari) {
      return applyExclusions(baseIds.filter(id => id !== 'jump_pack'));
    }
    return applyExclusions(baseIds);
  }

  // ── Adeptus Mechanicus: Jump Pack only for Skitarii with Pteraxii upgrade ──
  if (factionId === 'adeptus_mechanicus') {
    const hasPteraxii = (selectedUpgrades?.['amec_pteraxii'] ?? 0) > 0;
    if (!hasPteraxii) {
      return applyExclusions(baseIds.filter(id => id !== 'jump_pack'));
    }
    return applyExclusions(baseIds);
  }

  // ── Astra Militarum: Jump Pack only for Veteran Guardsman with Drop Trooper upgrade ──
  if (factionId === 'astra_militarum') {
    const hasDropTrooper = (selectedUpgrades?.['am_drop_trooper'] ?? 0) > 0;
    if (!hasDropTrooper) {
      return applyExclusions(baseIds.filter(id => id !== 'jump_pack'));
    }
    return applyExclusions(baseIds);
  }

  // ── Pirate Crew: Jump Pack is Rigger Only — Rigger unit not yet implemented,
  //    strip from all current units until Rigger is added. ──
  if (factionId === 'pirate_crew') {
    return applyExclusions(baseIds.filter(id => id !== 'jump_pack'));
  }

  // ── Leagues of Votann: Jump Pack only for Hearthkyn ──
  if (factionId === 'leagues_of_votann') {
    if (unitId !== 'lv_hearthkyn') {
      return applyExclusions(baseIds.filter(id => id !== 'jump_pack'));
    }
    return applyExclusions(baseIds);
  }

  return applyExclusions(baseIds);
}
