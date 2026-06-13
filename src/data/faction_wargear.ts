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
 *  "weapons, armour, or equipment" — no Mark of Chaos, or unit already has a deity keyword). */
const MARK_BANNED_UNIT_IDS = new Set([
  'ha_chaos_cultist',
  // Thousand Sons — Tzaangors, Shaman, and Sekhetar Robot already have TZEENTCH keyword
  'ts_tzaangor', 'ts_tzaangor_shaman', 'ts_sekhetar_robot',
  // Death Guard — Poxwalker and Blight-Drone already have NURGLE keyword
  'ha_poxwalker', 'ha_foetid_blight_drone',
]);

/**
 * HA units whose UNIT_WARGEAR_OVERRIDES entry is a COMPLETE armoury list.
 * For these units the override is used as-is (filtered by HA_EXCLUDED_IDS) WITHOUT
 * merging the active subfaction's variantIds. This prevents subfaction ranged weapons
 * (e.g. Thousand Sons inferno boltguns) from leaking into unit types that have
 * explicitly restricted battlkits (e.g. Tzaangor: Pistols + Melee + Armour + Equipment only).
 */
const HA_COMPLETE_OVERRIDE_UNITS = new Set([
  'ts_tzaangor',        // TS: Pistols / Melee / Armour / Equipment only
  'ts_tzaangor_shaman', // TS: Armour / Equipment / exactly one PSYCHIC weapon
  'ha_poxwalker',       // DG: No wargear at all
  'ha_foetid_blight_drone', // DG: Fixed weapon choices (Fleshmower / Twin Plague Spewers / Twin Blight Launchers)
]);

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
  'chaos_icon',
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

/** Orks – 100% unique battlekit, no shared weapons */
const ORK: string[] = [];

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
  'combat_helmet_ha', 'icon_of_vengeance_ha', 'toxin_grenades_ha', 'vox_unit_ha',
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
  'meltagun_ts', 'hand_flamer_ts', 'fatecater_greatbow_ts', 
  // World Eaters
  'axe_of_dismemberment_we', 'blood_harpoon_we', 'heavy_chain_weapon_we', 'twin_chain_blades_we',
  // HA Heavy Melee (Helbrute purchasable weapons)
  'helbrute_hammer_ha', 'power_scourge_ha',
  // HA Special Melee — Raptor-only purchase (shown only to Raptor-upgraded models via getAllowedWargearIds)
  'warp_claws',
  // HA Base Campaign Shop Weapons
  'black_mace_ha', 'blade_of_the_relentless_ha', 'foecleaver_ha', 'orbs_of_unlife_ha', 'shadesword_ha', 'warps_malice_ha',
  // HA Base Campaign Shop Equipment
  'black_rune_of_damnation_ha', 'book_of_the_reviler_ha', 'eye_of_tzeentch_ha', 'gorget_of_eternal_hate_ha',
  'inferno_tome_ha', 'intoxicating_elixir_ha', 'liber_hereticus_ha', 'mantle_of_traitors_ha',
  'orb_of_curze_ha', 'soulsnare_sigil_ha', 'talisman_of_burning_blood_ha', 'warpbreacher_ha',
  // Death Guard Campaign Shop Weapons
  'plaguebringer_dg', 'plague_skull_dg', 'reaper_of_glorious_entropy_dg',
  // Death Guard Campaign Shop Equipment
  'billowing_censer_dg', 'orb_of_decay_dg', 'putrid_periapt_dg', 'revolting_stench_vats_dg', 'suppurating_plate_dg', 'warp_charm_of_nurgle_dg',
  // Thousand Sons Campaign Shop Weapons
  'seers_bane_ts', 'stave_abominus_ts',
  // Thousand Sons Campaign Shop Equipment
  'athenian_scrolls_ts', 'change_wrought_chalice_ts', 'conniving_plate_ts', 'paradoxical_chatterfowl_ts', 'prism_of_echoes_ts', 'umbralefic_crystal_ts', 'warpweave_mantle_ts',
  // World Eaters Campaign Shop Weapons
  'bloodstep_blade_we', 'gorefather_we', 'skullseeker_we',
  // World Eaters Campaign Shop Equipment
  'blood_soaked_mantle_we', 'brazen_rune_we', 'helm_of_brazen_ire_we', 'mighty_skullrack_we', 'infernal_infusion_we', 'talisman_of_rage_we', 'witchskull_totem_we',
];

/** Items always available to every HA variant regardless of subfaction selection */
const HA_SHARED_IDS: string[] = [
  'combat_helmet_ha', 'icon_of_vengeance_ha', 'toxin_grenades_ha', 'vox_unit_ha',
  'helbrute_hammer_ha', 'power_scourge_ha',
];

/** Base HA Campaign Shop items available to all variants except Death Guard, Thousand Sons, World Eaters */
const HA_BASE_CAMPAIGN_SHOP_GENERAL: string[] = [
  'black_mace_ha', 'blade_of_the_relentless_ha', 'gorget_of_eternal_hate_ha',
  'inferno_tome_ha', 'intoxicating_elixir_ha', 'liber_hereticus_ha', 'mantle_of_traitors_ha', 'warps_malice_ha',
  'black_rune_of_damnation_ha',
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
  // Shared Combat Helmet (HA uses combat_helmet_ha variant instead)
  'combat_helmet',
  // Shared Basic Ranged not in HA Armoury
  'las_carbine', 'las_rifle',
  // Shared Pistols not in HA Armoury
  'laspistol', 'stub_pistol', 'volkite_pistol', 'inferno_pistol',
  // Shared Special Ranged not in HA Armoury
  'grenade_launcher', 'combi_weapon', 'longlas', 'hand_flamer',
  // Shared Thrown not in HA Armoury
  'blasting_charge', 'electro_grenades', 'gunk_bombs', 'incendiary_grenades', 'melta_bombs', 'throwing_knives',
  // Shared Basic Melee not in HA Armoury
  'flail',
  // Shared Special Melee not in HA Armoury
  'butchers_cleaver', 'butchers_chain_cleaver', 'goad_lance', 'las_cutter',
  'plasma_blade', 'poison_blade', 'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers',
  // Shared Heavy Melee not in HA Armoury
  'chain_fist', 'heavy_plasma_blade', 'heavy_power_weapon', 'shock_maul',
  // Shared Heavy Ranged not in HA Armoury
  'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon',
  // Twin-linked weapons not in HA Armoury
  'twin_heavy_stubber', 'twin_lascannon',
]);

/**
 * Per-faction excluded IDs.  Items from base composite profiles (IMPERIAL_ALL,
 * CHAOS_ALL, GANGER, XENOS_ELITE, etc.) that the faction's instruction-defined
 * Armoury does NOT include.  Applied in getWargearIdsForUnit().
 */
const FACTION_EXCLUDED_IDS: Partial<Record<string, ReadonlySet<string>>> = {
  adeptus_astartes: new Set([
    // Equipment not in AA Armoury
    'augury_scanner', 'medicae_kit', 'musical_instrument', 'photo_goggles', 'rosarius', 'shovel', 'vox_unit',
    // Armour
    'heavy_armour',
    // Basic Ranged (only automatic_shotgun, boltgun, shotgun kept)
    'autogun', 'las_carbine', 'las_rifle',
    // Pistols (only bolt_pistol, plasma_pistol kept)
    'autopistol', 'laspistol', 'stub_pistol',
    // Special Ranged (only flamer, combi_weapon, longlas, melta_gun, plasma_gun, storm_bolter kept)
    'grenade_launcher', 'heavy_stubber',
    // Thrown (only frag, krak, smoke kept)
    'blasting_charge', 'electro_grenades', 'gunk_bombs', 'incendiary_grenades', 'melta_bombs', 'throwing_knives', 'toxin_grenades',
    // Basic Melee (flail not in AA)
    'flail',
    // Special Melee
    'butchers_cleaver', 'butchers_chain_cleaver', 'goad_lance', 'las_cutter',
    'plasma_blade', 'poison_blade', 'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers',
    // Heavy Melee
    'eviscerator', 'heavy_plasma_blade', 'shock_maul',
    // Heavy Ranged
    'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon', 'twin_heavy_stubber',
  ]),
  adepta_sororitas: new Set([
    // Equipment
    'augury_scanner', 'camo_cloak', 'grav_chute', 'iron_halo', 'photo_goggles', 'psychic_hood', 'shovel',
    // Armour
    'heavy_armour', 'terminator_armour', 'heavy_shield',
    // Basic Ranged (only autogun, boltgun, las_rifle, shotgun kept)
    'automatic_shotgun', 'las_carbine',
    // Pistols (only autopistol, bolt_pistol, plasma_pistol kept)
    'laspistol', 'stub_pistol',
    // Special Ranged (only flamer, melta_gun, storm_bolter kept)
    'grenade_launcher', 'combi_weapon', 'plasma_gun', 'heavy_stubber', 'longlas',
    // Thrown (only frag, incendiary, krak, melta_bombs, smoke kept)
    'blasting_charge', 'electro_grenades', 'gunk_bombs', 'throwing_knives', 'toxin_grenades',
    // Heavy Ranged (melee already curated via SORORITAS_*_IDS)
    'autocannon', 'lascannon', 'missile_launcher', 'plasma_cannon',
    'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon',
  ]),
  adeptus_mechanicus: new Set([
    // Equipment
    'augury_scanner', 'camo_cloak', 'grav_chute', 'iron_halo', 'photo_goggles', 'psychic_hood', 'rosarius', 'shovel', 'troop_flag',
    // Armour
    'heavy_armour', 'terminator_armour', 'shield', 'heavy_shield',
    // Basic Ranged — AdMech has NONE from shared (all unique)
    'autogun', 'automatic_shotgun', 'boltgun', 'las_carbine', 'las_rifle', 'shotgun',
    // Pistols (only autopistol kept)
    'bolt_pistol', 'laspistol', 'plasma_pistol', 'stub_pistol',
    // Special Ranged (only flamer, heavy_stubber kept)
    'grenade_launcher', 'combi_weapon', 'melta_gun', 'plasma_gun', 'storm_bolter', 'longlas',
    // Thrown (only electro_grenades, frag, krak, smoke kept)
    'blasting_charge', 'gunk_bombs', 'incendiary_grenades', 'melta_bombs', 'throwing_knives', 'toxin_grenades',
    // Basic Melee (only blade, bludgeon, ccw, halberd kept)
    'flail', 'paired_blades',
    // Special Melee (only goad_lance, power_weapon kept)
    'butchers_cleaver', 'butchers_chain_cleaver', 'chain_blade', 'chain_glaive',
    'force_rod', 'force_staff', 'force_weapon', 'lightning_claw',
    'plasma_blade', 'poison_blade', 'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers', 'las_cutter',
    // Heavy Melee — NONE from shared
    'chain_fist', 'eviscerator', 'heavy_plasma_blade', 'heavy_power_fist', 'heavy_power_weapon',
    'shock_maul', 'thunder_hammer', 'two_handed_blade', 'two_handed_hammer',
    // Heavy Ranged (only plasma_cannon kept)
    'autocannon', 'heavy_bolter', 'heavy_flamer', 'lascannon', 'missile_launcher', 'multi_melta',
    'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon',
  ]),
  adeptus_custodes: new Set([
    // Equipment
    'augury_scanner', 'camo_cloak', 'grav_chute', 'iron_halo', 'medicae_kit', 'musical_instrument', 'photo_goggles', 'psychic_hood', 'rosarius', 'shovel', 'troop_flag', 'vox_unit',
    // Armour
    'heavy_armour', 'terminator_armour', 'shield',
    // Basic Ranged (only boltgun kept)
    'autogun', 'automatic_shotgun', 'las_carbine', 'las_rifle', 'shotgun',
    // Pistols (only bolt_pistol kept)
    'autopistol', 'laspistol', 'plasma_pistol', 'stub_pistol',
    // Special Ranged (only flamer, storm_bolter kept)
    'grenade_launcher', 'combi_weapon', 'melta_gun', 'plasma_gun', 'heavy_stubber', 'longlas',
    // Thrown (only frag, krak kept)
    'blasting_charge', 'electro_grenades', 'gunk_bombs', 'incendiary_grenades', 'melta_bombs', 'smoke_grenades', 'throwing_knives', 'toxin_grenades',
    // Basic Melee (only blade, ccw, halberd, paired_blades kept)
    'bludgeon', 'flail',
    // Special Melee — NONE from shared
    'butchers_cleaver', 'butchers_chain_cleaver', 'chain_blade', 'chain_glaive',
    'force_rod', 'force_staff', 'force_weapon', 'goad_lance', 'lightning_claw',
    'plasma_blade', 'poison_blade', 'power_weapon', 'shock_baton', 'shock_stave',
    'twin_butchers_chain_cleavers', 'las_cutter',
    // Heavy Melee (only thunder_hammer, two_handed_blade, two_handed_hammer kept)
    'chain_fist', 'eviscerator', 'heavy_plasma_blade', 'heavy_power_fist', 'heavy_power_weapon', 'shock_maul',
    // Heavy Ranged (only autocannon, heavy_flamer, multi_melta kept)
    'heavy_bolter', 'lascannon', 'missile_launcher', 'plasma_cannon',
    'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon',
  ]),
  adeptus_ministorum: new Set([
    // Equipment
    'camo_cloak', 'grav_chute', 'iron_halo', 'jump_pack', 'psychic_hood', 'shovel',
    // Armour
    'standard_armour', 'heavy_armour', 'power_armour', 'terminator_armour', 'heavy_shield',
    // Basic Ranged (only autogun, automatic_shotgun, las_carbine, las_rifle, shotgun kept)
    'boltgun',
    // Pistols (only autopistol, bolt_pistol, laspistol, stub_pistol kept)
    'plasma_pistol',
    // Special Ranged (only combi_weapon, flamer, grenade_launcher, heavy_stubber, longlas, melta_gun kept)
    'plasma_gun', 'storm_bolter',
    // Thrown (only frag, incendiary, krak, throwing_knives, smoke kept)
    'blasting_charge', 'electro_grenades', 'gunk_bombs', 'melta_bombs', 'toxin_grenades',
    // Special Melee (only chain_blade, chain_glaive, power_weapon kept)
    'butchers_cleaver', 'butchers_chain_cleaver', 'force_rod', 'force_staff', 'force_weapon',
    'goad_lance', 'lightning_claw', 'las_cutter', 'plasma_blade', 'poison_blade',
    'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers',
    // Heavy Melee (only eviscerator, thunder_hammer, two_handed_blade, two_handed_hammer kept)
    'chain_fist', 'heavy_plasma_blade', 'heavy_power_fist', 'heavy_power_weapon', 'shock_maul',
    // Heavy Ranged (only autocannon, heavy_flamer, multi_melta kept)
    'heavy_bolter', 'lascannon', 'missile_launcher', 'plasma_cannon',
    'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon',
  ]),
  officio_assassinorum: new Set([
    // Equipment
    'camo_cloak', 'grav_chute', 'iron_halo', 'jump_pack', 'musical_instrument', 'psychic_hood', 'rosarius', 'shovel', 'troop_flag',
    // Armour
    'heavy_armour', 'power_armour', 'terminator_armour', 'shield', 'heavy_shield',
    // Basic Ranged (only autogun, automatic_shotgun, las_carbine, las_rifle, shotgun kept)
    'boltgun',
    // Pistols (only autopistol, bolt_pistol, laspistol, plasma_pistol kept)
    'stub_pistol',
    // Special Ranged (only flamer, combi_weapon, grenade_launcher, heavy_stubber, longlas, melta_gun, plasma_gun kept)
    'storm_bolter',
    // Thrown (only electro, frag, krak, melta_bombs, throwing_knives, toxin, smoke kept)
    'blasting_charge', 'gunk_bombs', 'incendiary_grenades',
    // Basic Melee (flail not in OA)
    'flail',
    // Special Melee (only chain_blade, chain_glaive, poison_blade, power_weapon kept)
    'butchers_cleaver', 'butchers_chain_cleaver', 'force_rod', 'force_staff', 'force_weapon',
    'goad_lance', 'lightning_claw', 'las_cutter', 'plasma_blade',
    'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers',
    // Heavy Melee (only eviscerator, heavy_power_weapon, two_handed_blade, two_handed_hammer kept)
    'chain_fist', 'heavy_plasma_blade', 'heavy_power_fist', 'shock_maul', 'thunder_hammer',
    // Heavy Ranged (only heavy_flamer, lascannon, missile_launcher, multi_melta kept)
    'autocannon', 'heavy_bolter', 'plasma_cannon',
    'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon',
  ]),
  astra_militarum: new Set([
    // Equipment
    'grav_chute', 'holy_relic', 'iron_halo', 'psychic_hood', 'purity_seal', 'rosarius',
    // Armour
    'terminator_armour',
    // Basic Ranged (only autogun, automatic_shotgun, las_carbine, las_rifle, shotgun kept)
    'boltgun',
    // Pistols (only autopistol, bolt_pistol, laspistol, plasma_pistol kept)
    'stub_pistol',
    // Special Ranged (only flamer, grenade_launcher, heavy_stubber, longlas, melta_gun, plasma_gun kept)
    'combi_weapon', 'storm_bolter',
    // Thrown (only frag, krak kept)
    'blasting_charge', 'electro_grenades', 'gunk_bombs', 'incendiary_grenades', 'melta_bombs', 'smoke_grenades', 'throwing_knives', 'toxin_grenades',
    // Basic Melee (only blade, bludgeon, ccw kept)
    'flail', 'halberd', 'paired_blades',
    // Special Melee
    'butchers_cleaver', 'butchers_chain_cleaver', 'chain_glaive', 'las_cutter',
    'lightning_claw', 'plasma_blade', 'poison_blade', 'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers',
    // Heavy Melee (only heavy_power_fist, thunder_hammer, two_handed_blade, two_handed_hammer kept)
    'chain_fist', 'eviscerator', 'heavy_plasma_blade', 'heavy_power_weapon', 'shock_maul',
    // Heavy Ranged (only autocannon, heavy_bolter, heavy_flamer, lascannon, missile_launcher, multi_melta kept)
    'plasma_cannon', 'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon',
  ]),
  the_inquisition: new Set([
    // Equipment
    'camo_cloak', 'grav_chute', 'iron_halo', 'jump_pack', 'shovel',
    // Armour
    'heavy_armour', 'heavy_shield',
    // Pistols (only autopistol, bolt_pistol, laspistol, plasma_pistol kept)
    'stub_pistol',
    // Special Ranged (only flamer, grenade_launcher, combi_weapon, heavy_stubber, longlas, melta_gun, plasma_gun kept)
    'storm_bolter',
    // Thrown (only frag, incendiary, krak, throwing_knives kept)
    'blasting_charge', 'electro_grenades', 'gunk_bombs', 'melta_bombs', 'smoke_grenades', 'toxin_grenades',
    // Basic Melee (flail not in INQ)
    'flail',
    // Special Melee
    'butchers_cleaver', 'butchers_chain_cleaver', 'goad_lance', 'las_cutter',
    'plasma_blade', 'poison_blade', 'twin_butchers_chain_cleavers',
    // Heavy Melee (only eviscerator, heavy_power_fist, heavy_power_weapon, two_handed_blade, two_handed_hammer kept)
    'chain_fist', 'heavy_plasma_blade', 'shock_maul', 'thunder_hammer',
    // Heavy Ranged (only autocannon, heavy_bolter, heavy_flamer, lascannon, missile_launcher, multi_melta kept)
    'plasma_cannon', 'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon',
  ]),
  // Grey Knights use the same Armoury as Adeptus Astartes
  grey_knights: new Set([
    // Equipment
    'augury_scanner', 'medicae_kit', 'musical_instrument', 'photo_goggles', 'rosarius', 'shovel', 'vox_unit',
    // Armour
    'heavy_armour',
    // Basic Ranged
    'autogun', 'las_carbine', 'las_rifle',
    // Pistols
    'autopistol', 'laspistol', 'stub_pistol',
    // Special Ranged
    'grenade_launcher', 'heavy_stubber',
    // Thrown
    'blasting_charge', 'electro_grenades', 'gunk_bombs', 'incendiary_grenades', 'melta_bombs', 'throwing_knives', 'toxin_grenades',
    // Basic Melee
    'flail',
    // Special Melee
    'butchers_cleaver', 'butchers_chain_cleaver', 'goad_lance', 'las_cutter',
    'plasma_blade', 'poison_blade', 'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers',
    // Heavy Melee
    'eviscerator', 'heavy_plasma_blade', 'shock_maul',
    // Heavy Ranged
    'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon',
  ]),
  chaos_cult: new Set([
    // Equipment
    'camo_cloak', 'grav_chute', 'holy_relic', 'iron_halo', 'jump_pack', 'psychic_hood', 'purity_seal', 'rosarius', 'shovel',
    // Armour
    'terminator_armour', 'heavy_shield',
    // Basic Ranged (only autogun, las_rifle, shotgun kept)
    'automatic_shotgun', 'boltgun', 'las_carbine',
    // Pistols (only autopistol, laspistol, plasma_pistol, stub_pistol kept)
    'bolt_pistol',
    // Special Ranged (only flamer, grenade_launcher, heavy_stubber, longlas, melta_gun, plasma_gun kept)
    'combi_weapon', 'storm_bolter',
    // Thrown (only blasting_charge, gunk_bombs, incendiary_grenades, throwing_knives, toxin_grenades, smoke_grenades kept)
    'electro_grenades', 'frag_grenades', 'krak_grenades', 'melta_bombs',
    // Basic Melee (flail not in CC)
    'flail',
    // HA-specific items in CHAOS_ALL that CC doesn't have
    'reaper_chaincannon', 'cyclone_missile_launcher', 'combi_bolter', 'volkite_pistol',
    'twin_bolt_pistols', 'hand_flamer', 'inferno_pistol',
    'astartes_bike', 'vengeance_ammunition',
    'icon_of_despair', 'icon_of_excess', 'icon_of_flame', 'icon_of_wrath',
    // Special Melee
    'chain_glaive', 'goad_lance', 'las_cutter', 'lightning_claw',
    'plasma_blade', 'poison_blade', 'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers',
    // Heavy Melee (only heavy_power_fist, two_handed_blade, two_handed_hammer kept)
    'chain_fist', 'eviscerator', 'heavy_plasma_blade', 'heavy_power_weapon', 'shock_maul', 'thunder_hammer',
    // Heavy Ranged (only autocannon, heavy_bolter, heavy_flamer, lascannon, missile_launcher, multi_melta, grenadier_gauntlet kept)
    'plasma_cannon', 'harpoon_launcher', 'krumper_rivet_cannon', 'seismic_cannon',
  ]),
  genestealer_cults: new Set([
    // Equipment
    'scope', 'shovel', 'vox_unit',
    // Armour
    'shield', 'heavy_shield',
    // Basic Ranged (only autogun, automatic_shotgun, las_rifle, shotgun kept)
    'las_carbine',
    // Pistols (only autopistol, laspistol, stub_pistol kept)
    'bolt_pistol', 'plasma_pistol',
    // Special Ranged (only flamer, grenade_launcher, heavy_stubber, longlas kept)
    'plasma_gun', 'melta_gun', 'bolt_sniper_rifle', 'stakethrower',
    // Thrown (only blasting_charge, electro_grenades, toxin_grenades, smoke_grenades kept)
    'frag_grenades', 'gunk_bombs', 'incendiary_grenades', 'krak_grenades', 'melta_bombs', 'throwing_knives',
    // Basic Melee (only blade, bludgeon, ccw kept)
    'flail', 'halberd', 'paired_blades',
    // Special Melee
    'butchers_cleaver', 'butchers_chain_cleaver', 'chain_glaive', 'goad_lance', 'las_cutter',
    'lightning_claw', 'plasma_blade', 'poison_blade', 'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers',
    // Heavy Melee from GANGER (only two_handed_hammer kept)
    'eviscerator', 'heavy_power_fist', 'two_handed_blade',
    // Heavy Ranged (only autocannon kept)
    'heavy_bolter', 'harpoon_launcher', 'mole_launcher', 'arc_welder',
  ]),
  leagues_of_votann: new Set([
    // Equipment
    'camo_cloak', 'iron_halo', 'grav_chute', 'photo_goggles',
    // Armour
    'heavy_armour',
    // XENOS_ELITE ranged not in LoV Armoury
    'bolt_rifle', 'flamer', 'plasma_gun', 'bolt_sniper_rifle', 'lascannon', 'heavy_flamer',
    // Pistols (only bolt_pistol kept)
    'autopistol', 'laspistol', 'plasma_pistol', 'stub_pistol',
    // Thrown (only blasting_charge, frag, krak kept)
    'electro_grenades', 'gunk_bombs', 'incendiary_grenades', 'melta_bombs', 'smoke_grenades', 'throwing_knives', 'toxin_grenades',
    // Basic Melee (only blade, bludgeon, ccw, halberd kept)
    'flail', 'paired_blades',
    // Needle/Web not in LoV
    'needle_pistol', 'needle_rifle', 'webber', 'web_pistol',
    // Special Melee (only force_rod, force_staff, plasma_blade kept)
    'butchers_cleaver', 'butchers_chain_cleaver', 'chain_blade', 'chain_glaive', 'force_weapon',
    'goad_lance', 'lightning_claw', 'poison_blade', 'power_weapon',
    'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers', 'las_cutter',
    // Heavy Melee (only heavy_plasma_blade, thunder_hammer, two_handed_blade, two_handed_hammer kept)
    'chain_fist', 'eviscerator', 'heavy_power_fist', 'heavy_power_weapon', 'shock_maul',
  ]),
  pirate_crew: new Set([
    // Equipment
    'camo_cloak', 'shovel',
    // Armour
    'heavy_shield',
    // Pistols (only autopistol, bolt_pistol, laspistol, plasma_pistol kept)
    'stub_pistol',
    // GANGER ranged not in Pirate Armoury
    'bolt_sniper_rifle',
    // Thrown (only blasting_charge, electro, frag, incendiary, krak, throwing_knives, toxin kept)
    'gunk_bombs', 'melta_bombs', 'smoke_grenades',
    // Basic Melee (flail not in Pirate)
    'flail',
    // Special Melee
    'butchers_cleaver', 'butchers_chain_cleaver', 'goad_lance', 'lightning_claw',
    'plasma_blade', 'poison_blade', 'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers',
    // Mining melee not in Pirate Armoury
    'arc_welder', 'heavy_rock_drill', 'heavy_rock_saw',
    // Heavy Ranged not in base GANGER for Pirate
    'heavy_bolter',
  ]),
  the_vermintide: new Set([
    // Equipment
    'camo_cloak', 'medicae_kit',
    // Basic Ranged — Vermintide has NONE from shared
    'autogun', 'las_rifle', 'shotgun', 'las_carbine', 'automatic_shotgun',
    // Pistols (only plasma_pistol kept)
    'autopistol', 'bolt_pistol', 'laspistol', 'stub_pistol',
    // Special Ranged from GANGER (only flamer, grenade_launcher, plasma_gun kept)
    'bolt_sniper_rifle', 'longlas', 'melta_gun', 'heavy_stubber',
    // Needle/Web/Stakethrower not in Vermintide
    'needle_pistol', 'needle_rifle', 'webber', 'web_pistol', 'stakethrower',
    // Thrown (only gunk_bombs, throwing_knives, toxin_grenades kept)
    'blasting_charge', 'electro_grenades', 'frag_grenades', 'incendiary_grenades', 'krak_grenades', 'melta_bombs', 'smoke_grenades',
    // Basic Melee (flail not in Vermintide)
    'flail',
    // Special Melee
    'butchers_cleaver', 'butchers_chain_cleaver', 'chain_blade', 'chain_glaive', 'force_weapon',
    'lightning_claw', 'power_weapon', 'shock_baton', 'shock_stave', 'twin_butchers_chain_cleavers', 'las_cutter',
    // Heavy Melee (only two_handed_blade, two_handed_hammer kept)
    'eviscerator', 'heavy_power_fist',
    // Heavy Ranged / Mining not in Vermintide
    'autocannon', 'heavy_bolter',
    'seismic_cannon', 'arc_welder', 'harpoon_launcher', 'heavy_rock_drill', 'heavy_rock_saw',
  ]),
  necromunda_gang: new Set([
    // Equipment
    'shovel',
    // Armour
    'heavy_shield',
    // Basic Ranged (only automatic_shotgun, las_rifle, shotgun kept)
    'autogun', 'las_carbine',
    // GANGER ranged not in Necromunda
    'bolt_sniper_rifle',
    // Needle/Web: needle_pistol, needle_rifle, webber kept; web_pistol NOT in Necromunda
    'web_pistol',
    // Thrown (only electro, frag, gunk_bombs, incendiary, krak, throwing_knives, toxin kept)
    'blasting_charge', 'melta_bombs', 'smoke_grenades',
    // Special Melee
    'butchers_cleaver', 'butchers_chain_cleaver', 'force_weapon', 'goad_lance',
    'plasma_blade', 'poison_blade', 'twin_butchers_chain_cleavers',
  ]),
  thousand_sons: new Set([
    // Equipment
    'cyclone_missile_launcher', 'ligthning_clasw', 'icon_of_despair', 'icon_of_excess', 'icon_of_wrath', 'mark_of_nurgle', 'mark_of_khorne', 'mark_of_slaanesh', 
  ]) 
};

/** Per-subfaction variant-specific wargear for Heretic Astartes.
 *  When a subfaction is active, only that subfaction's items (plus HA_SHARED_IDS)
 *  are shown instead of the full HA_VARIANT_IDS pool. */
const HA_SUBFACTION_WARGEAR: Record<string, string[]> = {
  alpha_legion:     [...HA_SHARED_IDS, 'throwing_power_knives_al', 'blasting_charge_al', 'melta_bombs_al', 'shroud_bombs_al',
    ...HA_BASE_CAMPAIGN_SHOP_GENERAL, 'shadesword_ha', 'orbs_of_unlife_ha', 'talisman_of_burning_blood_ha', 'eye_of_tzeentch_ha',
  ],
  death_guard:      [...HA_SHARED_IDS,
    'poison_vents_dg', 'mischievous_nurgling_dg',
    'blight_grenades_dg', 'blight_launcher_dg', 'corrupted_staff_dg', 'cursed_plague_bell_dg',
    'great_plague_blade_dg', 'heavy_blight_launcher_dg', 'heavy_plague_spewer_dg',
    'plague_blade_dg', 'plague_spewer_dg', 'plaguespurt_gauntlet_dg',
    // Death Guard Campaign Shop (+ only Orbs of Unlife from base HA shop)
    'orbs_of_unlife_ha',
    'plaguebringer_dg', 'plague_skull_dg', 'reaper_of_glorious_entropy_dg',
    'billowing_censer_dg', 'orb_of_decay_dg', 'putrid_periapt_dg', 'revolting_stench_vats_dg', 'suppurating_plate_dg', 'warp_charm_of_nurgle_dg',
  ],
  emperors_children: [...HA_SHARED_IDS,
    'sonic_shriekers_ec',
    'blastmaster_ec', 'blissblade_ec', 'phoenix_power_spear_ec', 'rapture_lash_ec',
    'screamer_pistol_ec', 'sonic_blaster_ec', 'twin_screamer_pistols_ec',
    ...HA_BASE_CAMPAIGN_SHOP_GENERAL, 'soulsnare_sigil_ha', 'orbs_of_unlife_ha', 'talisman_of_burning_blood_ha', 'eye_of_tzeentch_ha',
  ],
  iron_warriors:    [...HA_SHARED_IDS,
    'cyberteknika_cranial_iw', 'cyberteknika_ocular_iw', 'cyberteknika_sindexterous_iw',
    'cyberteknika_motive_iw', 'cyberteknika_torsonic_iw', 'cyberteknika_vascular_iw',
    'shrapnel_bolter_iw', 'shrapnel_cannon_iw', 'shrapnel_pistol_iw', 'mortar',
    ...HA_BASE_CAMPAIGN_SHOP_GENERAL, 'warpbreacher_ha', 'orbs_of_unlife_ha', 'talisman_of_burning_blood_ha', 'eye_of_tzeentch_ha',
  ],
  night_lords:      [...HA_SHARED_IDS,
    'chain_snare_nl', 'comms_jammer_nl', 'grisly_trophy_nl', 'ventrilokar_vox_nl',
    'terrorchem_vials_nl',
    ...HA_BASE_CAMPAIGN_SHOP_GENERAL, 'orb_of_curze_ha', 'orbs_of_unlife_ha', 'talisman_of_burning_blood_ha', 'eye_of_tzeentch_ha',
  ],
  thousand_sons:    [
    // Basic Ranged Weapons
    'autogun', 'automatic_shotgun', 'bolt_carbine', 'boltgun', 'shotgun',
    // Pistols
    'autopistol', 'bolt_pistol', 'heavy_bolt_pistol', 'inferno_bolt_pistol', 'plasma_pistol', 'twin_bolt_pistol',
    // Special Ranged Weapons
    'fatecater_greatbow_ts', 'flamer', 'heavy_stubber', 'inferno_boltgun_ts', 'melta_gun', 'plasma_gun', 'storm_bolter',
    // Heavy Ranged Weapons
    'heavy_bolter', 'heavy_flamer', 'hellfyre_missile_rack_ts', 'inferno_combi_bolter_ts', 'lascannon', 'multi_melta', 'plasma_cannon', 'reaper_chain_cannon', 'soulreaper_cannon_ts',
    // Thrown Weapons
    'frag_grenades', 'krak_grenades', 'toxin_grenades', 'smoke_grenades',
    // Basic Melee Weapons
    'bayonet', 'blade', 'bludgeon', 'close_combat_weapon', 'halberd',
    // Special Melee Weapons
    'chain_blade', 'daemon_weapon', 'divining_spear_ts', 'fell_dagger_ts', 'force_rod', 'force_staff', 'force_stave_ts', 'force_weapon', 'power_weapon',
    // Heavy Melee Weapons
    'eviscerator', 'hellbrute_hammer_ts', 'heavy_power_fist', 'power_claw_ts', 'power_scourge_ts', 'two_handed_blade', 'two_handed_hammer', 'thunder_hammer',
    // Armour
    'standard_armour', 'power_armour', 'terminator_armour', 'shield', 'heavy_shield', 
    // Equipment
    'astartes_bike', 'brayhorn_ts', 'chaos_sigil', 'combat_helmet', 
    'disc_of_tzeentch_ts', 'filter_plugs', 'grapnel_launcher', 'grav_chute', 'icon_of_flame_ts',
    'herd_banner_ts', 'scope', 'shovel', 'sigil_of_flame_ts', 'vengeance_ammunition', 'vox_unit',
    // Thousand Sons Campaign Shop (+ only Eye of Tzeentch from base HA shop)
    'athenian_scrolls_ts', 'change_wrought_chalice_ts', 'conniving_plate_ts',
    'eye_of_tzeentch_ts', 'paradoxical_chatterfowl_ts', 'prism_of_echoes_ts',
    'seers_bane_ts', 'stave_abominus_ts', 'umbralefic_crystal_ts',
    'warpweave_mantle_ts'
  ],
  world_eaters:     [...HA_SHARED_IDS,
    'axe_of_dismemberment_we', 'blood_harpoon_we', 'heavy_chain_weapon_we', 'twin_chain_blades_we',
    // World Eaters Campaign Shop (+ only Talisman of Burning Blood from base HA shop)
    'talisman_of_burning_blood_ha',
    'bloodstep_blade_we', 'gorefather_we', 'skullseeker_we',
    'blood_soaked_mantle_we', 'brazen_rune_we', 'helm_of_brazen_ire_we', 'mighty_skullrack_we', 'infernal_infusion_we', 'talisman_of_rage_we', 'witchskull_totem_we',
  ],
  word_bearers:     [...HA_SHARED_IDS,
    ...HA_BASE_CAMPAIGN_SHOP_GENERAL, 'book_of_the_reviler_ha', 'orbs_of_unlife_ha', 'talisman_of_burning_blood_ha', 'eye_of_tzeentch_ha',
  ],
  renegade_space_marines: [...HA_SHARED_IDS,
    ...HA_BASE_CAMPAIGN_SHOP_GENERAL, 'orbs_of_unlife_ha', 'talisman_of_burning_blood_ha', 'eye_of_tzeentch_ha',
  ],
  no_variant:       [...HA_SHARED_IDS,
    ...HA_BASE_CAMPAIGN_SHOP_GENERAL, 'foecleaver_ha', 'orbs_of_unlife_ha', 'talisman_of_burning_blood_ha', 'eye_of_tzeentch_ha',
  ],
};

const CHAOS_DAEMON_IDS: string[] = [
  'chaos_icon_daemons', 'musical_instrument_daemons',
  'banner_of_blood_khorne', 'brass_horns_khorne', 'collar_of_khorne', 'cuirass_of_rage_khorne',
  'rapturous_standard_slaanesh',
  'the_endless_gift_nurgle', 'mischievous_nurgling_nurgle', 'nurgling_palanquin_nurgle',
  'plague_banner_nurgle', 'sloppity_bilepipe_nurgle',
  'blasted_standard_tzeentch', 'crystal_tome_tzeentch', 'disc_of_tzeentch_daemons', 'icon_of_tzeentch_daemons',
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
  'dum_dum_ammunition_chaoscult', 'manstopper_ammunition_chaoscult', 'radium_ammunition_chaoscult',
  'psychic_familiar_cc',
  // Chaos Cult unique weapons
  'burning_censer_cc',
  // Chaos Cult mutation weapon (Gift of Chaos #54)
  'warp_claw_cc',
  'cyberteknika_cranial_chaoscult', 'cyberteknika_ocular_chaoscult',
  'cyberteknika_sindexterous_chaoscult', 'cyberteknika_motive_chaoscult',
];

const VERMINTIDE_IDS: string[] = [
  'chaos_icon_vermintide', 'book_of_woes_vermintide', 'skavenbrew_vermintide',
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
  'troop_flag_aa', 'vox_unit_aa', 'cyberteknika_cranial_aa', 'cyberteknika_ocular_aa',
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
  'tome_of_malcador_aa', 'visage_of_death_aa', 'malodraxian_standard_aa',
];

const ASTRA_MILITARUM_SPECIFIC_IDS: string[] = [
  'augury_scanner_am', 'camo_cloak_am', 'combat_helmet_am',
  'dum_dum_ammunition_am', 'manstopper_ammunition_am',
  'phosphor_ammunition_am', 'photo_goggles_am', 'rough_rider_horse_am',
  'regiment_flag_am', 'vox_unit_am', 'cyberteknika_cranial_am', 'cyberteknika_ocular_am',
  'cyberteknika_sindexterous_am', 'cyberteknika_motive_am',
  // Campaign Shop (Glory)
  'clarion_proclamatus_am', 'fire_of_judgement_am', 'laurels_of_command_am',
  'medal_macharia_am', 'moiraean_lance_am', 'null_coat_am',
  'refractor_field_am', 'relic_of_lost_cadia_am', 'skull_mask_am', 'star_of_terra_am',
];

const ADEPTUS_MECHANICUS_SPECIFIC_IDS: string[] = [
  'combat_helmet_admech', 'holy_relic_admech', 'imperative_surge_wafer',
  'omnispex_admech', 'purity_seal_admech', 'servo_medicae_admech',
  'serberys_construct_admech', 'vox_unit_admech',
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
  'vox_unit_custodes',
  // Campaign Shop
  'anathematic_diadem_custodes', 'arae_shrike_custodes', 'auspice_mantle_custodes',
  'epoch_auspice_custodes', 'lucent_aureole_custodes', 'mortis_gyre_custodes', 'twilight_pallium_custodes',
  'apollonian_spear_custodes', 'auriferous_orbs_custodes', 'sword_of_oblivion_custodes',
];

const ADEPTUS_MINISTORUM_SPECIFIC_IDS: string[] = [
  'augury_scanner_min', 'combat_helmet_min', 'holy_relic_min',
  'infernus_ammunition_min', 'purity_seal_min', 'reliquarius_min', 'sanctification_orbs_min',
  // Adeptus Ministorum unique weapons
  'brazier_of_holy_fire_min', 'dartmask_min', 'incentiviser_min',
  'mace_of_censure_min', 'null_skull_min', 'zealots_vindictor_min',
  'cyberteknika_cranial_min', 'cyberteknika_ocular_min',
  'cyberteknika_sindexterous_min', 'cyberteknika_motive_min',
];

const THE_INQUISITION_SPECIFIC_IDS: string[] = [
  'augury_scanner_inq', 'combat_helmet_inq', 'holy_relic_inq',
  'manstopper_ammunition_inq', 'phosphor_ammunition_inq', 'photo_goggles_inq',
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
  'incensor_cherub_sor', 'infernus_ammunition_sor', 'phial_of_dolan_sor',
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
  // Campaign Shop
  'gestation_sac_ty', 'norn_crown_ty', 'the_passenger_ty', 'pathogenesis_ty',
  'resonance_barb_ty', 'spirit_leech_cortex_ty', 'dirgeheart_of_kharis',
  'maw_claws_of_thyrax', 'ymgarl_factor_ty',
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
  // Campaign Shop
  'shardgullet_ty', 'reaper_of_obliterax',
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
  // Campaign Shop
  'bloodrage_pendant_slanni', 'cloak_of_feathers_slanni', 'crystalline_skull_slanni',
  'incandescent_rectrices_slanni', 'prism_of_amyntok_slanni', 'relocation_orb_slanni',
  'throne_of_lost_gods_slanni', 'zoetic_dial_slanni',
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
  // Campaign Shop
  'blade_of_realities_slanni', 'spacefolder_stave_slanni',
];

const ORKS_SPECIFIC_IDS: string[] = [
  'eavy_armour_orks', 'ded_ard_armour', 'mega_armour_orks',
  'ammo_runt', 'ard_hat_orks', 'bosspole_orks', 'distraction_grot',
  'grot_gunner', 'grot_oiler', 'grot_orderly', 'iron_gob_orks',
  'jump_rokkit_orks', 'personal_tellyporta', 'squig_bomb', 'warbike_orks',
  'cyberteknika_cranial_orks', 'cyberteknika_ocular_orks',
  'cyberteknika_sindexterous_orks', 'cyberteknika_motive_orks',
  'cyberteknika_torsonic_orks', 'cyberteknika_vascular_orks',
  // Campaign Shop
  'beasthide_mantle_orks', 'da_krushin_armour', 'scorched_gitbonez_orks',
  'supa_cybork_body_orks', 'gitstoppa_rounds_orks', 'wazgit_kopper_skullkap',
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
  // Campaign Shop
  'choppa_of_da_great_waaagh', 'da_dead_shiny_shoota', 'da_killa_klaw',
  'da_souped_up_shokka', 'headwoppas_killchoppa',
];

const NECRONS_SPECIFIC_IDS: string[] = [
  'dispersion_shield_necrons', 'engrammatic_entangler', 'gravity_displacement_pack',
  'heart_of_darkness_necrons', 'canoptek_cloak', 'nebuloscope',
  'necrodermal_plating', 'phylactery_necrons', 'plasmacyte_accelerator',
  'plasmacyte_reanimator', 'shadowloom_necrons', 'shieldvanes_necrons',
  'tachyon_arrow_necrons', 'translocation_shroud',
  // Campaign Shop
  'infinity_mantle_nec', 'nanoscarab_casket_nec', 'resurrection_orb_nec',
  'sovereign_coronel_nec', 'transdimensional_shroud_nec', 'vanquishers_mask_nec',
];

const LEAGUES_OF_VOTANN_SPECIFIC_IDS: string[] = [
  'ancestral_crest', 'grey_crest', 'preymark_crest', 'rampart_crest',
  'teleport_crest', 'weavefield_crest', 'combat_helmet_votann',
  'exoarmour_grenade_launcher', 'mass_driver_accelerators', 'multispectral_visor_votann',
  'rollbar_searchlight', 'scope_votann', 'troop_flag_votann', 'vox_unit_votann',
  // Campaign Shop
  'grudge_end_votann', 'kahyrm_war_plate_votann', 'recyc_converter_votann',
  'thyrikite_plate_votann', 'warpestryk_votann', 'wayfarers_grace_votann',
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
  // Campaign Shop
  'arrow_of_infinity_nec', 'conduit_of_stars_nec', 'solar_staff_nec', 'voidreaper_nec',
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
  // Campaign Shop
  'captive_abyss_votann', 'exactor_votann', 'forgestar_votann', 'murmuring_stave_votann',
];

const HARLEQUINS_SPECIFIC_IDS: string[] = [
  'holo_suit', 'bio_explosive_ammunition', 'flip_belt_harlequins',
  // Campaign Shop
  'laughing_god_eye_harlequins', 'mask_of_secrets_harlequins', 'raiment_of_laughing_god',
  'starmist_raiment_harlequins', 'suit_of_hidden_knives',
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
  // Campaign Shop
  'crescendo_harlequins', 'cegorach_rose_harlequins', 'serpent_tail_harlequins', 'storied_sword_harlequins',
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
  // Campaign Shop
  'amulet_of_voidwyrm_gsc', 'crouchling_gsc', 'crown_of_ascendancy_gsc',
  'elixir_of_dark_vistas_gsc', 'pennant_of_ascension_gsc', 'pervasion_veil_gsc',
  'stratodais_gsc', 'unwilling_orb_gsc', 'voice_of_liberator_gsc',
  'dagger_of_swift_sacrifice_gsc', 'gift_from_beyond_gsc', 'oppressors_bane_gsc',
];

const DRUKHARI_SPECIFIC_IDS: string[] = [
  'kabalite_armour', 'wychsuit', 'incubus_warsuit', 'ghostplate_armour',
  'antitox_drukhari', 'drukhari_helmet', 'goblet_of_spite',
  'gruesome_talismens', 'hellion_skyboard', 'hell_mask_drukhari',
  'scourge_wings', 'shadow_field_drukhari', 'soul_seeker_ammunition', 'tormentor_helm',
  // Campaign Shop
  'casket_of_suffering_drukhari', 'helm_of_spite_drukhari', 'master_clone_field_drukhari', 'nightmare_doll_drukhari',
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
  'scissorhand_drukhari', 'spirit_leech_tentacles_drukhari', 'spirit_probe_drukhari', 'talos_ichor_injector_drukhari', 'torturers_tools_drukhari',
  // Thrown
  'haywire_grenades_drukhari', 'plasma_grenade_drukhari', 'soulshard_grenades_drukhari', 'xenospasm_grenades_drukhari', 'wraithbone_grenades_drukhari',
  // Campaign Shop Weapons
  'animus_vitae_drukhari', 'djin_blade_drukhari', 'parasite_kiss_drukhari', 'tormentrix_drukhari', 'triptych_whip_drukhari',
];

const AELDARI_SPECIFIC_IDS: string[] = [
  'aeldari_helmet', 'banshee_mask', 'blood_of_isha',
  'mesh_armour_aeldari', 'aspect_armour', 'wraithbone_armour',
  'celestial_shield_aeldari', 'force_shield_aeldari',
  'cloak_of_shadow', 'flip_belt_aeldari', 'ghosthelm_aeldari',
  'guardian_platform', 'isitha_kasra', 'jetbike_aeldari', 'jetbike_shimmershield',
  'mandiblasters_aeldari', 'shimmershield_aeldari', 'spirit_stone_aeldari', 'swooping_hawk_wings',
  // Campaign Shop
  'aegis_of_eldanesh_aeldari', 'banner_of_asuryan_aeldari', 'cloak_of_shadewalker_aeldari',
  'cronescream_aeldari', 'dragons_fury_aeldari', 'khaines_lance_aeldari',
  'phoenix_gem_aeldari', 'phoenix_plume_aeldari', 'rune_of_faolchu_aeldari',
  'shrine_skull_aeldari', 'sunstorm_aeldari', 'weeping_stones_aeldari',
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
  // Campaign Shop
  'avenging_blade_aeldari', 'exile_glaive_aeldari', 'firesabre_aeldari',
  'shard_of_anaris_aeldari', 'shadowsting_aeldari', 'spiders_bite_aeldari',
];

const PIRATE_CREW_SPECIFIC_IDS: string[] = [
  'blade_venom_pirate', 'cyber_parrot', 'pirate_bike', 'pirate_trophy',
  'crackthorn_whip',
  // Pirate Crew weapons not in base GANGER pool
  // las_cutter is now in shared SPECIAL_MELEE_IDS (available via GANGER spread)
  'harpoon_launcher', 'seismic_cannon', 'krumper_rivet_cannon', 'thunder_hammer',
  'augury_scanner', 'troop_flag',
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
  heretic_astartes:      [...CHAOS_ALL, ...ASTARTES_HEAVY_IDS, ...HA_VARIANT_IDS, ...TWIN_LINKED_IDS, 'bolt_carbine', 'heavy_bolt_pistol', 'mark_of_darkness', 'mark_of_khorne', 'mark_of_nurgle', 'mark_of_slaanesh', 'mark_of_tzeentch'],
  // Standalone variants use their subfaction-specific wargear pools
  death_guard:           [...HA_SUBFACTION_WARGEAR['death_guard']],
  emperors_children:     [...HA_SUBFACTION_WARGEAR['emperors_children']],
  thousand_sons:         [
                        // Basic Ranged Weapons
                        'autogun', 'automatic_shotgun', 'bolt_carbine', 'boltgun', 'shotgun',
                        // Pistols
                        'autopistol', 'bolt_pistol', 'heavy_bolt_pistol', 'inferno_bolt_pistol', 'plasma_pistol', 'twin_bolt_pistol',
                        // Special Ranged Weapons
                        'fatecater_greatbow_ts', 'flamer', 'heavy_stubber', 'inferno_boltgun_ts', 'melta_gun', 'plasma_gun', 'storm_bolter',
                        // Heavy Ranged Weapons
                        'heavy_bolter', 'heavy_flamer', 'hellfyre_missile_rack_ts', 'inferno_combi_bolter_ts', 'lascannon', 'multi_melta', 'plasma_cannon', 'reaper_chain_cannon', 'soulreaper_cannon_ts',
                        // Thrown Weapons
                        'frag_grenades', 'krak_grenades', 'toxin_grenades', 'smoke_grenades',
                        // Basic Melee Weapons
                        'bayonet', 'blade', 'bludgeon', 'close_combat_weapon', 'halberd',
                        // Special Melee Weapons
                        'chain_blade', 'daemon_weapon', 'divining_spear_ts', 'fell_dagger_ts', 'force_rod', 'force_staff', 'force_stave_ts', 'force_weapon', 'power_weapon',
                        // Heavy Melee Weapons
                        'eviscerator', 'hellbrute_hammer_ts', 'heavy_power_fist', 'power_claw_ts', 'power_scourge_ts', 'two_handed_blade', 'two_handed_hammer', 'thunder_hammer',
                        // Armour
                        'standard_armour', 'power_armour', 'terminator_armour', 'shield', 'heavy_shield', 
                        // Equipment
                        'astartes_bike', 'brayhorn_ts', 'chaos_sigil', 'combat_helmet', 
                        'disc_of_tzeentch_ts', 'filter_plugs', 'grapnel_launcher', 'grav_chute', 'icon_of_flame_ts',
                        'herd_banner_ts', 'scope', 'shovel', 'sigil_of_flame_ts', 'vengeance_ammunition', 'vox_unit',
                        // Thousand Sons Campaign Shop (+ only Eye of Tzeentch from base HA shop)
                        'athenian_scrolls_ts', 'change_wrought_chalice_ts', 'conniving_plate_ts',
                        'eye_of_tzeentch_ts', 'paradoxical_chatterfowl_ts', 'prism_of_echoes_ts',
                        'seers_bane_ts', 'stave_abominus_ts', 'umbralefic_crystal_ts',
                         'warpweave_mantle_ts'
                        ],
  world_eaters:          [...HA_SUBFACTION_WARGEAR['world_eaters']],
  // grenadier_gauntlet is Ogryn-only in Chaos Cult — gated via UNIT_WARGEAR_OVERRIDES for cc_chaos_ogryn.
  chaos_cult:            [...CHAOS_ALL.filter(id => id !== 'grenadier_gauntlet'), ...CHAOS_CULT_IDS, 'heavy_stubber', 'heavy_heavy_stubber'], 
  chaos_daemons:         [...DAEMON_BASIC, ...CHAOS_DAEMON_IDS, ...CHAOS_DAEMONS_WEAPON_IDS],
  the_vermintide:        [...GANGER, ...VERMINTIDE_IDS, 'augury_scanner', 'troop_flag', 'power_armour'],

  // === XENOS ===
  orks:                  [...ORK, ...ORKS_SPECIFIC_IDS, ...ORKS_WEAPON_IDS],
  tyranids:              [...MELEE_ONLY, ...TYRANIDS_SPECIFIC_IDS, ...TYRANIDS_WEAPON_IDS],
  // GSC shouldn't have Mole Launcher (verified) but uses GANGER base
  // GANGER includes MINING/MOLE naturally. GSC uses these.
  genestealer_cults:     [...GANGER, ...GENESTEALER_CULTS_SPECIFIC_IDS, 'hand_flamer'],
  harlequins:            [...HARLEQUINS_SPECIFIC_IDS, ...HARLEQUINS_WEAPON_IDS],
  leagues_of_votann:     [...XENOS_ELITE.filter(id => !MOLE_LAUNCHER_IDS.includes(id)), ...MOLE_LAUNCHER_IDS, ...LEAGUES_OF_VOTANN_SPECIFIC_IDS, ...LEAGUES_OF_VOTANN_WEAPON_IDS], // Votann HAS Mole Launcher
  slanni:                [...SLANNI_SPECIFIC_IDS, ...SLANNI_WEAPON_IDS],
  necrons:               [...NECRONS_SPECIFIC_IDS, ...NECRONS_STANDARD_WEAPON_IDS, ...NECRONS_DESTROYER_WEAPON_IDS],
  aeldari:               [...AELDARI_SPECIFIC_IDS, ...AELDARI_WEAPON_IDS],
  t_au_empire:           ['blade', 'bludgeon', ...TAU_EMPIRE_SPECIFIC_IDS, ...TAU_EMPIRE_WEAPON_IDS],
  drukhari:              [...DRUKHARI_SPECIFIC_IDS, ...DRUKHARI_WEAPON_IDS],

  // === OUTLAW ===
  necromunda_gang:       [...GANGER, ...NECROMUNDA_GANG_SPECIFIC_IDS, 'hand_flamer', 'augury_scanner', 'grav_chute', 'power_armour'], 
  pirate_crew:           [...GANGER.filter(id => !MOLE_LAUNCHER_IDS.includes(id)), ...PIRATE_CREW_SPECIFIC_IDS, 'augury_scanner', 'troop_flag', 'jump_pack', 'power_armour'],
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
    ...BASIC_MELEE_IDS,
    'chain_blade', 'chain_glaive', 'force_rod', 'force_staff', 'force_weapon', 'lightning_claw', 'power_weapon',
    'chain_fist', 'heavy_power_fist', 'heavy_power_weapon', 'thunder_hammer', 'two_handed_blade', 'two_handed_hammer',
    'terminator_armour', 'shield',
    'augury_scanner', 'iron_halo', 'psychic_hood',
  ],
  ha_chaos_terminator: [
    'storm_bolter', 'combi_bolter', 'heavy_bolter', 'autocannon', 'lascannon',
    'missile_launcher', 'heavy_flamer', 'reaper_chaincannon',
    'bolt_pistol', 'plasma_pistol',
    ...BASIC_MELEE_IDS,
    'chain_blade', 'chain_glaive', 'force_rod', 'force_staff', 'force_weapon', 'lightning_claw', 'power_weapon',
    'heavy_power_fist', 'thunder_hammer', 'two_handed_blade', 'two_handed_hammer',
    ...CHAOS_SPECIFIC_IDS,
    'terminator_armour', 'shield',
    'augury_scanner', 'purity_seal', 'shovel',
  ],
  // Aquilon Terminators (Custodes) — no shared special melee; only Custodes heavy melee
  ac_aquilon_terminator: [
    'storm_bolter', 'heavy_bolter', 'lascannon',
    'bolt_pistol', 'plasma_pistol',
    'thunder_hammer', 'two_handed_blade', 'two_handed_hammer',
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
  // Tyranid Warriors — all Tyranid weapons + biomorphs (no shared/imperial weapons)
  ty_tyranid_warrior: [...TYRANIDS_WEAPON_IDS, ...TYRANIDS_SPECIFIC_IDS],
  ty_hive_tyrant: [...TYRANIDS_WEAPON_IDS, ...TYRANIDS_SPECIFIC_IDS],
  // Ork Deff Dread — Ork-allowed heavy melee only
  or_deff_dread: [
    'autocannon', 'heavy_bolter', 'heavy_flamer', 'lascannon',
    'chain_fist', 'eviscerator', 'heavy_power_fist', 'thunder_hammer', 'two_handed_blade', 'two_handed_hammer',
    'heavy_armour',
  ],
  // Genestealer Aberrant — heavy melee only (cannot equip other items per Battlekit rules)
  gc_aberrant: [
    'heavy_power_weapon', 'thunder_hammer', 'two_handed_hammer',
    'close_combat_weapon', 'blade', 'bludgeon',
    'standard_armour', 'shield',
    'combat_helmet',
  ],
  // Genestealer Abominant — heavy melee only (cannot equip other items per Battlekit rules)
  gc_abominant: [
    'heavy_power_weapon', 'thunder_hammer',
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
  oa_aspirant: [
    // Basic ranged
    'lasgun', 'autogun', 'shotgun', 'suppression_lasgun',
    'laspistol', 'autopistol', 'stub_pistol',
    // Basic melee
    ...BASIC_MELEE_IDS,
    'chain_blade',
    // Basic equipment
    'camo_cloak', 'combat_helmet', 'filter_plugs', 'medicae_kit',
    'frag_grenade', 'smoke_grenade', 'krak_grenade',
  ],
  oa_eversor: [
    'autopistol',
    ...BASIC_MELEE_IDS,
    'chain_blade', 'chain_glaive', 'poison_blade', 'power_weapon',
    'chain_fist', 'heavy_power_fist',
    'melta_bombs',
    'camo_cloak', 'combat_helmet', 'filter_plugs', 'purity_seal',
  ],
  oa_callidus: [
    'laspistol',
    'blade', 'close_combat_weapon', 'power_weapon', 'lightning_claw', 'poison_blade',
    'camo_cloak', 'combat_helmet',
  ],
  // Space Wolves Wulfen — Stormfrag Auto-Launcher + AA-allowed melee + armour + equipment
  aa_wulfen: [
    'stormfrag_auto_launcher',
    ...BASIC_MELEE_IDS,
    'chain_blade', 'chain_glaive', 'force_rod', 'force_staff', 'force_weapon', 'lightning_claw', 'power_weapon',
    'chain_fist', 'heavy_power_fist', 'heavy_power_weapon', 'thunder_hammer', 'two_handed_blade', 'two_handed_hammer',
    'wulfen_frost_claws',
    'standard_armour', 'heavy_armour', 'shield', 'heavy_shield',
    'augury_scanner', 'camo_cloak', 'combat_helmet', 'filter_plugs',
    'grapnel_launcher', 'iron_halo', 'purity_seal', 'death_totem',
    'combat_helmet_aa', 'holy_relic_aa', 'purity_seal_aa',
  ],
  // Sekhetar Robot — basic melee + Power Claw + HA-allowed ranged armoury + Heavy Flamer
  ts_sekhetar_robot: [
    // Basic melee + Power Claw only (per rules: "any Basic melee weapons, a Power Claw")
    ...BASIC_MELEE_IDS,
    'power_claw_ts',
    // "any ranged weapons from the Heretic Astartes Armoury" — HA-specific heavy ranged only
    ...BASIC_RANGED_IDS, ...PISTOL_IDS, ...SPECIAL_RANGED_IDS,
    ...THROWN_IDS,
    'autocannon', 'combi_bolter', 'cyclone_missile_launcher', 'heavy_bolter',
    'heavy_flamer', 'lascannon', 'missile_launcher', 'multi_melta',
    'plasma_cannon', 'reaper_chaincannon',
    ...TWIN_LINKED_IDS,
    ...CHAOS_SPECIFIC_IDS,
    'hand_flamer', 'inferno_pistol', 'twin_bolt_pistols',
    'inferno_boltgun_ts', 'inferno_bolt_pistol_ts', 'inferno_combi_bolter_ts',
    'soulreaper_cannon_ts', 'meltagun_ts', 'hand_flamer_ts',
    'vengeance_ammunition',
  ],

  // Tzaangor (Thousand Sons) — Pistols / Melee / Armour (incl. Shields) / HA Equipment only.
  // COMPLETE override: variantIds NOT merged (HA_COMPLETE_OVERRIDE_UNITS). No Marks (MARK_BANNED_UNIT_IDS).
  // Rule: "Pistols, melee weapons, armour including Shields, or equipment from the Heretic Astartes Armoury."
  // TS-specific additions for Tzaangors: Musical Instrument and Troop Flag.
  ts_tzaangor: [
    // Pistols (laspistol/stub_pistol excluded by HA_EXCLUDED_IDS)
    ...PISTOL_IDS,
    'twin_bolt_pistols',
    'inferno_bolt_pistol_ts',
    'fatecater_greatbow_ts',
    // Melee — basic, special, heavy (chain_fist/eviscerator/heavy_plasma_blade/heavy_power_weapon/shock_maul excluded by HA_EXCLUDED_IDS; Helbrute-only items not listed)
    ...BASIC_MELEE_IDS, 'bayonet',
    ...SPECIAL_MELEE_IDS,
    ...CHAOS_SPECIFIC_IDS,
    ...HEAVY_MELEE_IDS,
    // Armour incl. Shields — NOT Power Armour or Terminator Armour (Elite/CSM only per HA armoury description)
    'standard_armour', 'shield', 'heavy_shield',
    // Equipment (augury_scanner/camo_cloak/holy_relic/iron_halo/medicae_kit/
    //   photo_goggles/psychic_hood/purity_seal/rosarius/vox_unit excluded by HA_EXCLUDED_IDS)
    ...EQUIPMENT_IDS,
    'chaos_icon', 'combat_helmet_ha', 'icon_of_vengeance_ha',
    'icon_of_despair', 'icon_of_excess', 'icon_of_flame', 'icon_of_wrath',
    'astartes_bike', 'vengeance_ammunition', 'toxin_grenades_ha',
  ],

  // Tzaangor Shaman (Thousand Sons) — Armour + HA Equipment + exactly one PSYCHIC weapon.
  // COMPLETE override: variantIds NOT merged (HA_COMPLETE_OVERRIDE_UNITS). No Marks (MARK_BANNED_UNIT_IDS).
  // Rule: "armour or equipment from the HA Armoury (including Shields), must equip exactly one PSYCHIC weapon."
  ts_tzaangor_shaman: [
    // PSYCHIC weapons (must equip exactly one per rules)
    ...CHAOS_SPECIFIC_IDS,           // demon_weapon, fell_dagger (both PSYCHIC per HA unique battlekit)
    'force_rod', 'force_staff', 'force_weapon',   // PSYCHIC special melee from Shared Battlekit
    'force_stave_ts',                // TS-specific Elite Psyker PSYCHIC melee
    // Armour (Shaman is ELITE — Power Armour and Terminator Armour allowed; heavy_armour excluded by HA_EXCLUDED_IDS)
    ...ARMOUR_IDS,
    // Equipment (HA armoury; many items excluded by HA_EXCLUDED_IDS)
    ...EQUIPMENT_IDS,
    'chaos_icon', 'combat_helmet_ha', 'icon_of_vengeance_ha',
    'icon_of_despair', 'icon_of_excess', 'icon_of_flame', 'icon_of_wrath',
    'astartes_bike', 'vengeance_ammunition', 'toxin_grenades_ha',
    'disc_of_tzeentch_ts',           // Elite Only in TS battlekit; Shaman is ELITE
  ],

  // Poxwalker (Death Guard) — Cannot take any weapons, armour, or equipment.
  // COMPLETE override (HA_COMPLETE_OVERRIDE_UNITS). No Marks (MARK_BANNED_UNIT_IDS).
  ha_poxwalker: [],

  // Foetid Blight-Drone (Death Guard) — Choose one of: Fleshmower (+0cr), Twin Plague Spewers (+45cr), or Twin Blight Launchers (+55cr).
  // COMPLETE override (HA_COMPLETE_OVERRIDE_UNITS). No Marks (MARK_BANNED_UNIT_IDS).
  ha_foetid_blight_drone: ['fleshmower_ha', 'twin_plague_spewers_ha', 'twin_blight_launchers_ha'],
  // Necrons Hexmark Destroyer — six one-handed weapon slots + Necrons equipment
  nec_hexmark_destroyer: [
    'gauntlet_of_fire_nec', 'particle_caster', 'transdimensional_beamer', 'enmitic_disintegrator_pistol',
    'claw_nec', 'mace_nec', 'sword_nec', 'voidblade', 'hyperphase_sword_nec', 'hyperphase_thresher',
    'engrammatic_entangler', 'heart_of_darkness', 'necrodermal_plating', 'phylactery_nec',
    'plasmacyte_accelerator', 'plasmacyte_reanimator', 'tachyon_arrow_nec', 'translocation_shroud_nec',
    'arrow_of_infinity_nec', 'infinity_mantle_nec', 'nanoscarab_casket_nec', 'resurrection_orb_nec',
    'sovereign_coronel_nec', 'transdimensional_shroud_nec', 'vanquishers_mask_nec',
  ],

  // ── Adepta Sororitas ──────────────────────────────────────────────────────

  // Repentia — melee weapons from Sororitas Armoury ONLY. No armour, no equipment, no ranged.
  // Rule: "can be equipped with any melee weapons from the Adepta Sororitas Battlekit List … cannot be equipped with any armour or equipment."
  // Excludes: power_halberd_sor (Elite/Sacresant), spear_of_the_faithful_sor (Elite), power_weapon (Elite/Sacresant/Zephyrim), heavy_power_weapon (Mortisanctus/Paragon Warsuit)
  as_repentia: [
    ...BASIC_MELEE_IDS, 'bayonet',
    // Sororitas special melee available to Repentia:
    'brazier_of_holy_fire_sor', 'chain_blade', 'neural_whip_sor', 'null_rod_sor',
    'virge_of_admonition_sor',  // non-Novitiate Only — Repentia qualifies
    // Sororitas heavy melee available to Repentia:
    'eviscerator',              // explicitly: Elite, Mortisanctus, OR Repentia Only
    'two_handed_blade', 'two_handed_hammer',
  ],

  // Penitent Engine — single ranged weapon only. No additional melee, no armour, no equipment.
  // Rule: "can be equipped with a single ranged weapon … cannot use any other weapons, armour, or equipment."
  as_penitent_engine: [
    // Basic Ranged (Sororitas armoury)
    ...BASIC_RANGED_IDS,
    // Special Ranged (Sororitas armoury only — no plasma_gun, grenade_launcher, etc.)
    'condemnor_boltgun', 'flamer', 'melta_gun', 'stakethrower', 'storm_bolter',
    // Heavy Ranged (Sororitas armoury)
    'heavy_bolter', 'heavy_flamer', 'multi_melta',
    // No pistols (arm-mounted walker — "a single ranged weapon" means arm weapon, not sidearm)
    // No thrown, no melee additions, no armour, no equipment
  ],

  // Paragon Warsuit — two-handed melee + heavy ranged + paragon-only twins + limited equipment.
  // Rule: "cannot be equipped with any other weapons or armour, but can be equipped with any
  //         equipment from the Adepta Sororitas Armoury besides a Grapnel Launcher, Medicae Kit,
  //         or HELD battlekit."
  as_paragon_warsuit: [
    // Two-handed melee (Sororitas armoury — available to Paragon Warsuit)
    'virge_of_admonition_sor',  // TWO-HANDED, non-Novitiate Only — warsuit qualifies
    'heavy_power_weapon',       // explicitly: Mortisanctus or Paragon Warsuit Only
    'two_handed_blade', 'two_handed_hammer',
    // NOT: eviscerator (Elite/Mortisanctus/Repentia Only — Paragon Warsuit not listed)
    // NOT: power_halberd_sor (Elite or Sacresant Only)
    // NOT: spear_of_the_faithful_sor (Elite Only)
    // Heavy ranged — two-handed arm weapons (Sororitas armoury)
    'heavy_bolter', 'heavy_flamer', 'multi_melta',
    // Paragon Warsuit exclusive twin weapons (Paragon Warsuit Only note still applies)
    'twin_storm_bolter_sor', 'twin_g_launcher_sor',
    // Equipment — all Sororitas armoury equipment EXCEPT: Grapnel Launcher, Medicae Kit, HELD items, Jump Pack
    // HELD exclusions: simulacrum_imperialis_sor, sacresant_shield_sor, brazier_of_holy_fire_sor
    'armourium_cherub_sor', 'blessed_ammunition_sor', 'combat_helmet_sor',
    'incensor_cherub_sor', 'infernus_ammunition_sor',
    'phial_of_dolan_sor', 'purity_seal_sor', 'troop_flag_sor',
    'cyberteknika_cranial_sor', 'cyberteknika_ocular_sor',
    'cyberteknika_sindexterous_sor', 'cyberteknika_motive_sor',
    // Shared equipment pool (not excluded by Sororitas faction exclusions, not forbidden for warsuit)
    'combat_helmet', 'filter_plugs', 'holy_relic', 'purity_seal', 'rosarius', 'scope', 'troop_flag', 'vox_unit',
    // Campaign shop items valid for Paragon Warsuit
    'litanies_of_faith_sor', 'quicksilver_veil_sor', 'relic_paragon_warsuit_sor',
    'tears_of_saint_celestine_sor',
  ],

  // ── Adeptus Astartes ─────────────────────────────────────────────────────

  // Fenrisian Wolf — cannot equip anything. cannotEquip:true on the unit also suppresses the
  // wargear button in the UI, but this enforces the empty pool at the data layer too.
  aa_fenrisian_wolf: [],

  // ── Tyranids ─────────────────────────────────────────────────────────────

  // Lictor — only Tyranid bioweapons (no shared MELEE_ONLY imperial weapons from faction default)
  ty_lictor: [...TYRANIDS_WEAPON_IDS, ...TYRANIDS_SPECIFIC_IDS],

  // Tyrant Guard — same: only Tyranid bioweapons
  ty_tyrant_guard: [...TYRANIDS_WEAPON_IDS, ...TYRANIDS_SPECIFIC_IDS],

  // ── Chaos Daemons ─────────────────────────────────────────────────────────

  // Contorted Epitome — body-weapon construct; cannot equip (cannotEquip:true in unit def).
  cd_contorted_epitome: [],

  // Chaos Furie — undivided flying daemon. Basic DAEMON_BASIC melee + undivided icons only.
  cd_chaos_furie: [
    ...DAEMON_BASIC,
    'chaos_icon_daemons', 'musical_instrument_daemons',
  ],

  // Flesh Hound — Khorne beast. Collar of Khorne ONLY (cannotEquip:true removed from unit def).
  cd_flesh_hound: ['collar_of_khorne'],

  // Blue Horror — Tzeentch lesser daemon. Icon of Tzeentch ONLY (cannotEquip:true removed).
  cd_blue_horror: ['icon_of_tzeentch_daemons'],

  // Skullmaster — Blood Legion herald on Juggernaut. Blood Legion weapons/icons; no Skull Cannon.
  cd_skullmaster: [
    'blade_of_blood', 'hellblade_daemon',
    ...DAEMON_BASIC,
    'chaos_icon_daemons', 'musical_instrument_daemons',
    'banner_of_blood_khorne', 'brass_horns_khorne', 'collar_of_khorne', 'cuirass_of_rage_khorne',
  ],

  // Infernal Enrapturess — Legion of Excess herald. LoE weapons/icons; no alluring_musk.
  cd_infernal_enrapturess: [
    'lashes_of_torment', 'whips_of_agony',
    ...DAEMON_BASIC,
    'chaos_icon_daemons', 'musical_instrument_daemons',
    'rapturous_standard_slaanesh',
  ],

  // ── Chaos Cult ────────────────────────────────────────────────────────────

  // Chaos Spawn — mindless entity; cannot equip (cannotEquip:true in unit def).
  cc_chaos_spawn: [],

  // Cult Rabble — melee + CC-specific equipment only; no ranged.
  cc_cult_rabble: [
    ...BASIC_MELEE_IDS, 'bayonet',
    ...CHAOS_CULT_IDS,
    'chaos_icon',
    'standard_armour', 'shield',
    'combat_helmet', 'filter_plugs',
  ],

  // ── Heretic Astartes ──────────────────────────────────────────────────────

  // Possessed — daemon-fused Chaos Marine: melee, armour, equipment only; no ranged/thrown.
  // HA merge appends active variant gear (HA_SHARED_IDS + subfaction items) + Marks of Chaos.
  ha_possessed: [
    'bayonet',
    ...BASIC_MELEE_IDS,
    'chain_blade', 'chain_glaive', 'force_rod', 'force_staff', 'force_weapon',
    'lightning_claw', 'power_weapon',
    'heavy_power_fist', 'thunder_hammer', 'two_handed_blade', 'two_handed_hammer',
    ...CHAOS_SPECIFIC_IDS,
    'standard_armour', 'power_armour', 'terminator_armour', 'shield', 'heavy_shield',
    'filter_plugs', 'grapnel_launcher', 'grav_chute', 'scope', 'shovel',
  ],

  // Helbrute — corrupted Dreadnought walker: heavy ranged + helbrute 2H melee only.
  // HA merge appends HA_SHARED_IDS (which already has helbrute_hammer_ha/power_scourge_ha)
  // + active variant gear + Marks of Chaos.
  ha_helbrute: [
    'helbrute_hammer_ha', 'power_scourge_ha',
    'autocannon', 'heavy_bolter', 'heavy_flamer', 'lascannon',
    'missile_launcher', 'multi_melta', 'plasma_cannon',
    'reaper_chaincannon', 'combi_bolter', 'cyclone_missile_launcher',
  ],

  // ── Adeptus Custodes ──────────────────────────────────────────────────────

  // Blade Champion — melee specialist; no ranged weapons allowed.
  ac_blade_champion: [
    ...BASIC_MELEE_IDS, ...SPECIAL_MELEE_IDS, ...HEAVY_MELEE_IDS, ...THROWN_IDS,
    // Custodes-specific melee and combined weapons
    'executioner_greatblade', 'interceptor_lance_custodes', 'misericordia', 'tarsis_buckler', 'vaultswords',
    'solerite_power_gauntlet', 'solerite_power_talon',
    'achillus_dreadspear', 'adrasite_spear', 'castellan_axe', 'galatus_warblade',
    'guardian_spear', 'pyrithite_spear', 'sentinel_blade',
    // Armour
    ...ARMOUR_IDS,
    'auramite_armour_custodes', 'aquilon_armour_custodes', 'praesidium_shield_custodes',
    // Equipment
    ...EQUIPMENT_IDS,
    'amelioration_pail_custodes', 'combat_helmet_custodes', 'dawneagle_jetbike_custodes',
    'holy_relic_custodes', 'vexilla_custodes',
    'frag_ammunition_custodes', 'vengeance_ammunition', 'psyk_out_grenades',
    'cyberteknika_cranial_custodes', 'cyberteknika_ocular_custodes',
    'cyberteknika_sindexterous_custodes', 'cyberteknika_motive_custodes',
  ],

  // ── The Inquisition ───────────────────────────────────────────────────────

  // Daemonhost — bound daemon; cannot equip (cannotEquip:true in unit def).
  inq_daemonhost: [],

  // ── Adeptus Ministorum ────────────────────────────────────────────────────

  // Miraculist — divine construct; cannot equip (cannotEquip:true in unit def).
  amin_miraculist: [],

  // ── Orks ──────────────────────────────────────────────────────────────────

  // Squig — beast; cannot equip (cannotEquip:true in unit def).
  or_squig: [],

  // Squighog Boy — mounted Ork: pistols + melee + thrown + Ork armour/equipment; no other ranged.
  or_squighog_boy: [
    // Ork pistols
    'grot_blasta', 'kustom_mega_slugga', 'rokkit_pistol', 'shokka_pistol', 'slugga', 'twin_slugga',
    // Ork melee
    'breacha_ram', 'chain_choppa', 'choppa', 'grabba_stikk', 'grot_prod', 'lil_stikka',
    'power_snappa', 'twin_choppas', 'weirdboy_staff',
    'big_choppa', 'drilla_orks', 'killsaw', 'knucklebusta', 'power_klaw',
    'smash_hammer_orks', 'power_stabba', 'tankhammer', 'twin_killsaw', 'uge_choppa',
    // Ork thrown
    'firey_stikkbombs', 'krak_stikkbombs', 'stikkbomb', 'throwing_knives_orks',
    // Ork armour and equipment
    ...ORKS_SPECIFIC_IDS,
  ],

  // ── Tyranids ─────────────────────────────────────────────────────────────

  // Ripper Swarm — mindless devourer; cannot equip (cannotEquip:true in unit def).
  ty_ripper_swarm: [],

  // Spore Mine — living bomb; cannot equip (cannotEquip:true in unit def).
  ty_spore_mine: [],

  // Zoanthrope — psychic synapse creature: melee biomorphs + biomorphs only; no ranged bio-weapons.
  ty_zoanthrope: [
    'chitinous_claw', 'piercing_claw', 'rending_claw', 'scything_talon', 'toxic_scythe',
    'bone_cleaver', 'bonesword_tyranid', 'crushing_claw', 'lash_whip_tyranid', 'slayer_sabre',
    'bone_mace', 'pincer_tail', 'tail_blade',
    ...TYRANIDS_SPECIFIC_IDS,
  ],

  // ── Drukhari ──────────────────────────────────────────────────────────────

  // Clawed Fiend — beast; cannot equip (cannotEquip:true in unit def).
  dr_clawed_fiend: [],

  // Khymera — daemon beast; cannot equip (cannotEquip:true in unit def).
  dr_khymera: [],

  // Razorwing Flock — beast swarm; cannot equip (cannotEquip:true in unit def).
  dr_razorwing_flock: [],

  // Cronos — spirit-harvesting construct: spirit weapons only.
  dr_cronos: [
    'spirit_syphon_drukhari', 'spirit_vortex_drukhari',
    'spirit_probe_drukhari', 'spirit_leech_tentacles_drukhari',
  ],

  // Talos — pain engine construct: Drukhari weapons only; no armour/equipment additions.
  dr_talos: [...DRUKHARI_WEAPON_IDS],

  // Succubus — arena champion: pistols + melee + thrown + DR armour/equipment; no other ranged.
  dr_succubus: [
    'blast_pistol_drukhari', 'splinter_pistol_drukhari', 'stinger_pistol_drukhari',
    'agoniser_drukhari', 'chain_flail_drukhari', 'demiklaives_drukhari', 'hekatarii_blade_drukhari',
    'hellglaive_drukhari', 'huskblade_drukhari', 'klaive_drukhari', 'macro_scalpel_drukhari',
    'scissorhand_drukhari',
    'haywire_grenades_drukhari', 'plasma_grenade_drukhari',
    'xenospasm_grenades_drukhari', 'wraithbone_grenades_drukhari',
    ...DRUKHARI_SPECIFIC_IDS,
  ],

  // Wych — arena fighter: same as Succubus (pistols + melee + thrown + DR armour/equipment).
  dr_wych: [
    'blast_pistol_drukhari', 'splinter_pistol_drukhari', 'stinger_pistol_drukhari',
    'agoniser_drukhari', 'chain_flail_drukhari', 'demiklaives_drukhari', 'hekatarii_blade_drukhari',
    'hellglaive_drukhari', 'huskblade_drukhari', 'klaive_drukhari', 'macro_scalpel_drukhari',
    'scissorhand_drukhari',
    'haywire_grenades_drukhari', 'plasma_grenade_drukhari',
    'xenospasm_grenades_drukhari', 'wraithbone_grenades_drukhari',
    ...DRUKHARI_SPECIFIC_IDS,
  ],

  // Incubus — elite melee bodyguard: DR melee (including klaive/demiklaives) + DR armour/equipment.
  dr_incubus: [
    'agoniser_drukhari', 'chain_flail_drukhari', 'demiklaives_drukhari',
    'hellglaive_drukhari', 'huskblade_drukhari', 'klaive_drukhari',
    'haywire_grenades_drukhari', 'plasma_grenade_drukhari',
    ...DRUKHARI_SPECIFIC_IDS,
  ],

  // ── Necrons ───────────────────────────────────────────────────────────────

  // Canoptek Scarab Swarm — construct swarm; cannot equip (cannotEquip:true in unit def).
  nec_scarab_swarm: [],

  // Ophydian Destroyer — burrowing destroyer: Necron melee + equipment only; no ranged.
  nec_ophydian_destroyer: [
    'claw_nec', 'mace_nec', 'sword_nec', 'voidblade',
    'hyperphase_sword_nec', 'hyperphase_thresher',
    ...NECRONS_SPECIFIC_IDS,
  ],

  // Flayer King — Flayer King variant leader: no additional weapons (built-in Lord's Claw); equipment only.
  nec_flayer_king: [...NECRONS_SPECIFIC_IDS],

  // Apprentek — Canoptek Court technomancer: equipment only (built-in Staff of Light).
  nec_apprentek: [...NECRONS_SPECIFIC_IDS],

  // ── T'au Empire ───────────────────────────────────────────────────────────

  // T'au Drone — support construct: no additional wargear (equipped per sub-type only).
  tau_drone: [],

  // Kroot Shaper — Kroot pack leader: melee + Kroot-only ranged + Kroot-only equipment.
  tau_kroot_shaper: [
    'bladestave_tau', 'equalizer_tau', 'honor_blade_tau', 'kroot_bayonet', 'short_blade_tau',
    'dart_bow_tau', 'dvorgite_skinner', 'kroot_carbine', 'kroot_rifle',
    'kroot_shaper_rifle', 'kroot_scattergun', 'semi_automatic_gl',
    'kroot_pistol',
    'blast_javelin_tau', 'hunting_javelins', 'tri_blades_tau',
    'battle_armour_tau', 'air_purifiers_tau', 'comms_unit_tau',
    'energy_shield_tau', 'kroothawk_flock', 'medical_kit_tau',
    'multispectrum_sensor_suite',
  ],

  // T'au Commander — battlesuit specialist: battlesuit weapons/armour/equipment only.
  tau_commander: [
    'battlesuit_blade', 'equalizer_tau', 'short_blade_tau',
    'burst_cannon_tau', 'cyclic_ion_blaster', 'fragmentation_projector',
    'fusion_blaster_tau', 'he_fusion_blaster', 'hi_plasma_rifle', 'ho_burst_cannon',
    'missile_pod_tau', 'plasma_rifle_tau', 'smart_missile_system', 'tau_flamer', 'twin_burst_cannon',
    'heavy_burst_cannon', 'heavy_rail_rifle', 'high_yield_missile_pods', 'seeker_missile',
    'twin_plasma_rifle_tau', 'twin_smart_missile_system',
    'battle_armour_tau', 'shield_generator_tau', 'iridium_armour',
    'air_purifiers_tau', 'automated_repair_system', 'battlesuit_support_system',
    'comms_unit_tau', 'energy_shield_tau', 'firesight_drone_controller',
    'hover_drone_tau', 'medical_kit_tau',
    'multispectrum_sensor_suite', 'protected_servos_tau',
    'vectored_manoeuvring_thrusters', 'weapon_support_system',
    'advanced_em_scrambler', 'borthrod_gland', 'multi_sensory_discouragement_array',
    'neuro_empathic_nullifier', 'ohrtus_lantern', 'puretide_engram_neurochip',
    'seismic_destabiliser', 'serenity_tau', 'solid_image_projection_unit',
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
  // Standalone Chaos Legions: delegate to Heretic Astartes logic using the faction ID as the subfaction key
  const STANDALONE_HA_LEGIONS = new Set(['death_guard', 'emperors_children', 'thousand_sons', 'world_eaters']);
  if (STANDALONE_HA_LEGIONS.has(factionId)) {
    return getAllowedWargearIds('heretic_astartes', unitId, factionId, selectedUpgrades);
  }
  // Unit-specific overrides take precedence over faction defaults
  // EXCEPT for Heretic Astartes, which needs subfaction-aware merging below.
  // Always apply per-faction exclusions so unit overrides using broad arrays
  // (e.g. cc_chaos_ogryn using CHAOS_ALL) still respect faction armoury limits.
  // ── Standalone HA variants: delegate to heretic_astartes logic with fixed subfaction ──
  const HA_STANDALONE_FACTION_MAP: Record<string, string> = {
    death_guard: 'death_guard',
    emperors_children: 'emperors_children',
    thousand_sons: 'thousand_sons',
    world_eaters: 'world_eaters',
  };
  if (HA_STANDALONE_FACTION_MAP[factionId]) {
    // Delegate to heretic_astartes path using the faction as its own subfaction
    return getAllowedWargearIds('heretic_astartes', unitId, HA_STANDALONE_FACTION_MAP[factionId], selectedUpgrades);
  }

  if (UNIT_WARGEAR_OVERRIDES[unitId] && factionId !== 'heretic_astartes') {
    const excluded = FACTION_EXCLUDED_IDS[factionId];
    const ids = UNIT_WARGEAR_OVERRIDES[unitId];
    return excluded ? ids.filter(id => !excluded.has(id)) : ids;
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
    // EXCEPTION: units in HA_COMPLETE_OVERRIDE_UNITS have fully-specified armouries and
    // must NOT be merged with variantIds (prevents e.g. Tzaangor seeing heavy ranged TS weapons).
    const unitOverride = UNIT_WARGEAR_OVERRIDES[unitId];
    if (unitOverride) {
      const mergedIds = HA_COMPLETE_OVERRIDE_UNITS.has(unitId)
        ? [...unitOverride]
        : [...unitOverride, ...variantIds];
      const ids = mergedIds.filter(id => !HA_EXCLUDED_IDS.has(id));
      // Add marks for units that can take them
      if (subfactionId !== 'renegade_space_marines' && subfactionId !== 'alpha_legion' && !MARK_BANNED_UNIT_IDS.has(unitId)) {
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
      // Primaris weapons available to HA
      'bolt_carbine', 'heavy_bolt_pistol',
    ];

    // Marks of Chaos: available to most HA units, but NOT Renegade SM (no marks at all)
    // and NOT Alpha Legion, and NOT Cultists (their battlekit excludes marks).
    if (subfactionId !== 'renegade_space_marines' && subfactionId !== 'alpha_legion' && !MARK_BANNED_UNIT_IDS.has(unitId)) {
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

  // ── Adeptus Astartes: Jump Pack only for Captain, Assault Marine, Inceptor, or Suppressor upgrade ──
  if (factionId === 'adeptus_astartes') {
    const hasAssaultMarine = (selectedUpgrades?.['aa_assault_marine'] ?? 0) > 0;
    const hasInceptor = (selectedUpgrades?.['aa_inceptor'] ?? 0) > 0;
    const hasSuppressor = (selectedUpgrades?.['aa_suppressor'] ?? 0) > 0;
    let filteredIds: string[];
    if (unitId !== 'aa_captain' && !hasAssaultMarine && !hasInceptor && !hasSuppressor) {
      filteredIds = applyExclusions(baseIds.filter(id => id !== 'jump_pack'));
    } else {
      filteredIds = applyExclusions(baseIds);
    }
    // Salamanders Battlekit: can purchase up to 3 Incendiary Grenades (excluded from base AA armoury)
    if (subfactionId === 'salamanders' && !filteredIds.includes('incendiary_grenades')) {
      filteredIds.push('incendiary_grenades');
    }
    return filteredIds;
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

  // ── Leagues of Votann: Jump Pack only for Hearthkyn ──
  if (factionId === 'leagues_of_votann') {
    if (unitId !== 'lv_hearthkyn') {
      return applyExclusions(baseIds.filter(id => id !== 'jump_pack'));
    }
    return applyExclusions(baseIds);
  }

  return applyExclusions(baseIds);
}

// ─────────────────────────────────────────────────────────────────────────────
//  FACTION-SPECIFIC WARGEAR NOTES
//  Per-faction restriction notes for shared (and faction-specific) items.
//  Maps factionId → weaponId → short restriction string displayed in the UI.
// ─────────────────────────────────────────────────────────────────────────────

const FACTION_WARGEAR_NOTES: Record<string, Record<string, string>> = {

  // ═══════════════════════════════════════════════════════════════════════════
  //  CHAOS FACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  heretic_astartes: {
    // Pistols
    plasma_pistol:           'Elite Only',
    // Heavy Ranged
    combi_bolter:            'Wearing Terminator Armour or Helbrute Only',
    cyclone_missile_launcher:'Chaos Launcher Terminator Only',
    heavy_flamer:            'Helbrute Only',
    multi_melta:             'Helbrute Only',
    plasma_cannon:           'Helbrute Only',
    // Basic Melee
    paired_blades:           'Shrivetalon Only',
    // Special Melee
    chain_blade:             'Elite or Chaos Space Marines Only',
    chain_glaive:            'Elite Only',
    demon_weapon:            'Elite Only',
    fell_dagger:             'Elite Psyker Only',
    force_rod:               'Psyker Only',
    force_staff:             'Psyker Only',
    force_weapon:            'Elite Psyker Only',
    lightning_claw:          'Chaos Terminator or Raptor Only',
    power_weapon:            'Elite Only',
    warp_claws:              'Raptor Only',
    // Heavy Melee
    helbrute_hammer_ha:      'Helbrute Only',
    heavy_power_fist:        'Elite Only',
    power_scourge_ha:        'Helbrute Only',
    // Foetid Blight-Drone integrated weapons
    fleshmower_ha:           'Foetid Blight-Drone Only. Choose one of Fleshmower / Twin Plague Spewers / Twin Blight Launchers.',
    twin_plague_spewers_ha:  'Foetid Blight-Drone Only. Choose one of Fleshmower / Twin Plague Spewers / Twin Blight Launchers.',
    twin_blight_launchers_ha:'Foetid Blight-Drone Only. Choose one of Fleshmower / Twin Plague Spewers / Twin Blight Launchers.',
    // Armour
    power_armour:            'Elite or Chaos Space Marine Only',
    terminator_armour:       'LIMIT: 1 besides Chaos Terminators, Elite or Chaos Terminator Only',
    shield:                  'Cultist Only',
    // Marks of Chaos
    mark_of_darkness:        'Max 1 Mark per model',
    mark_of_khorne:          'Max 1 Mark per model',
    mark_of_nurgle:          'Max 1 Mark per model',
    mark_of_slaanesh:        'Max 1 Mark per model',
    mark_of_tzeentch:        'Max 1 Mark per model',
    // Equipment
    astartes_bike:           'Max 1 Elite on Bike',
    icon_of_despair:         'Mark of Nurgle Only',
    icon_of_excess:          'Mark of Slaanesh Only',
    icon_of_flame:           'Mark of Tzeentch Only',
    icon_of_vengeance_ha:    'Mark of Darkness Only',
    icon_of_wrath:           'Mark of Khorne Only',
    jump_pack:               'Chaos Lord or Raptor Only',
  },

  thousand_sons: {
    // Basic Ranged Weapons
    autogun:                 'LIMIT: 2',
    // Pistols
    heavy_bolt_pistol:       'LIMIT: 1',
    inferno_bolt_pistol_ts:     'LIMIT: 1',
    plasma_pistol:           'LIMIT: 1, Elite Only',
    twin_bolt_pistol:        'LIMIT: 2',
    // Special Ranged Weapons
    fatecater_greatbow:      'LIMIT: 1, Tzaangor Only',
    flamer:                  'LIMIT: 3',
    heavy_stubber:           'LIMIT: 1',
    inferno_boltgun_ts:      'Thousand Sons Only',
    melta_gun:               'LIMIT: 1',
    plasma_gun:              'LIMIT: 1',
    storm_bolter:            'LIMIT: 3',
    // Heavy Ranged Weapons
    heavy_bolter:            'LIMIT: 1',
    heavy_flamer:            'Wearing Terminator Armour or Helbrute Only, Sekhetar Robot can ignore this restriction',
    hellfyre_missile_rack_ts:'Chaos Terminator or Sekhetar Robot Only',
    inferno_combi_bolter_ts: 'LIMIT: 1',
    lascannon:               'LIMIT: 1',
    multi_melta:             'Helbrute Only',
    plasma_cannon:           'Helbrute Only',
    reaper_chaincannon:      'LIMIT: 1',
    soulreaper_cannon_ts:    'LIMIT: 1',
    // Thrown Weapons
    krak_grenade:            'LIMIT: 2',
    toxin_grenade:           'LIMIT: 1',
    smoke_grenade:           'LIMIT: 1',
    // Special Melee
    chain_blade:             'Elite or Tzaangor Only',
    demon_weapon:            'LIMIT: 1, Elite Only',
    divining_spear:          'LIMIT: 1, Tzaangor Only',
    fell_dagger:             'LIMIT: 1, Elite Psyker Only',
    force_rod:               'Psyker Only',
    force_staff:             'Psyker Only',
    force_stave_ts:          'Elite Psyker Only',
    force_weapon:            'LIMIT: 2, Elite Psyker Only',
    power_weapon:            'LIMIT: 2, Elite Only',
    // Heavy Melee Weapons
    eviscerator:             'LIMIT: 1',
    helbrute_hammer_ha:      'Helbrute Only',
    heavy_power_fist:        'LIMIT: 1, Elite Only',
    power_claw_ts:           'LIMIT: 1, Sekhetar Robot Only',
    power_scourge_ha:        'Helbrute Only',
    thunder_hammer:          'LIMIT: 1',
    // Armour
    power_armour:            'Elite or Rubric Marine Only',
    terminator_armour:       'LIMIT: 1, Elite Only',
    shield:                  'Cultist or Tzaangor Only',
    // Equipment
    astartes_bike:           'LIMIT: 3, Max 1 Elite on Bike',
    brayhorn_ts:             'LIMIT: 1, Tzaangor Only',
    combat_helmet:           'Headgear',
    disc_of_tzeentch_ts:     'Elite Only',
    grav_chute:              'LIMIT: 2',
    icon_of_flame:           'LIMIT: 1 total Icon, Mark of Tzeentch Only',
    herd_banner_ts:          'LIMIT: 1, Tzaangor Only',
    scope:                   'LIMIT: 1',
    sigil_of_flame_ts:       'LIMIT: 1, Rubric Marine Only',
    vengeance_ammunition:    'LIMIT: 2, CONSUMABLE',
    vox_unit:                'LIMIT: 1',
  },

  chaos_cult: {
    plasma_pistol:           'Elite Only',
    stub_pistol:             'Elite or Devotee Only',
    grenadier_gauntlet:      'Ogryn Only',
    butchers_chain_cleaver:  'Elite Only',
    chain_blade:             'Elite Only',
    demon_weapon:            'Elite Only',
    fell_dagger:             'Elite Psyker Only',
    force_rod:               'Psyker Only',
    force_staff:             'Psyker Only',
    force_weapon:            'Elite Psyker Only',
    power_weapon:            'Elite Only',
    heavy_power_fist:        'Elite Only',
    burning_censer_cc:       'Chaos Disciple Only',
    power_armour:            'Elite Only',
    covert_guise_chaoscult:  'Cult Devotee Only',
  },

  chaos_daemons: {
    force_rod:                     'Psyker Only',
    force_staff:                   'Psyker Only',
    collar_of_khorne:              'Flesh Hound Only',
    marotter:                      'Elite Only',
    nurgling_palanquin_nurgle:     'Poxbringer Only',
    herald_staff:                  'Psyker Only',
    ritual_dagger:                 'Elite Only',
    soul_eater_stave:              'Psyker Only',
    icon_of_tzeentch_daemons:      'Blue or Pink Horror Only',
  },

  the_vermintide: {
    doomrocket_ver:          'Warlock Only',
    warpvolt_obliterator_ver:'Warlock Only',
    hand_flamer:             'Elite Only',
    plasma_pistol:           'Elite Only',
    poison_stars_ver:        'Night Runner Only',
    throwing_knives:         'Night Runner Only',
    paired_blades:           'Deathmaster or Night Runner Only',
    foetid_blade_ver:        'Plague Monk Only',
    force_rod:               'Psyker Only',
    force_staff:             'Psyker Only',
    herding_whip_ver:        'Packmaster Only',
    plague_censer_ver:       'Plague Monk Only',
    poison_blade:            'Elite or Night Runner Only',
    piston_claw_ver:         'Elite Only, Max 1 per model',
    warpfire_gauntlet_ver:   'Psyker Only',
    warpforged_dagger_ver:   'Psyker Only',
    warpstone_staff_ver:     'Psyker Only',
    things_catcher_ver:      'Packmaster Only',
    woe_stave_ver:           'Plague Monk Only',
    doomflayer_gauntlets_ver:'Rat Ogryn Only',
    grinderfists_ver:        'Rat Ogryn Only',
    shock_gauntlets_ver:     'Rat Ogryn Only',
    warpgrinder_ver:         'Skaven Weapons Team Only',
    book_of_woes_vermintide: 'Plague Monk Only',
    skavenbrew_vermintide:   'Skavenslave or Clanrat Only',
    warp_shovel_vermintide:  'Clanrat Only',
    wolf_rat_mount_vermintide:'Clawlord, Clanrat, or Stormvermin Only',
    power_armour:            'Elite, Stormvermin, or Rat Ogryn Only',
    heavy_shield:            'Rat Ogryn Only',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  IMPERIAL FACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  adeptus_astartes: {
    assault_bolter:          'Primaris or Terminator Only',
    inferno_pistol:          'Elite Only',
    plasma_pistol:           'Elite or Inceptor Only',
    automatic_bolt_rifle:    'Primaris Only',
    bolt_rifle:              'Primaris Only',
    combi_bolter:            'Terminator Armour Only',
    cyclone_missile_launcher:'Terminator Only',
    twin_lascannon:          'Dreadnought Only',
    paired_blades:           'Vanguard Only',
    force_rod:               'Psyker Only',
    force_staff:             'Psyker Only',
    force_weapon:            'Elite Psyker Only',
    lightning_claw:          'Terminator or Assault Marine Only',
    chain_fist:              'Terminator Armour Only',
    heavy_power_weapon:      'Elite Only',
    heavy_power_fist:        'Elite, Terminator Armour, or Dreadnought Only',
    power_armour:            'Elite or Space Marines Only',
    terminator_armour:       'LIMIT: 1 besides Terminators, Elite or Terminator Only',
    shield:                  'Bladeguard Only',
    astartes_bike:           'Max 1 Elite on Bike',
    camo_cloak:              'Scout Marine or Vanguard Only',
    holy_relic:              'Elite Only',
    iron_halo:               'Elite Only',
    jump_pack:               'Captain or Assault Marine Only',
    psychic_hood:            'Librarian Only',
  },

  adepta_sororitas: {
    hand_flamer:             'Elite or Battle Sister Only',
    inferno_pistol:          'Elite Only',
    plasma_pistol:           'Elite Only',
    twin_g_launcher_sor:     'Paragon Warsuit Only',
    twin_storm_bolter_sor:   'Paragon Warsuit Only',
    power_halberd_sor:       'Elite or Sacresant Only',
    power_weapon:            'Elite, Sacresant, or Zephyrim Only',
    spear_of_the_faithful_sor:'Elite Only',
    virge_of_admonition_sor: 'non-Novitiate Only',
    eviscerator:             'Elite, Mortisanctus, or Repentia Only',
    heavy_power_weapon:      'Mortisanctus or Paragon Warsuit Only',
    power_armour:            'Elite or Battle Sister Only',
    sacresant_shield_sor:    'Sacresant Only',
    holy_relic:              'Elite Only',
    incensor_cherub_sor:     'Elite Only',
    jump_pack:               'Canoness, Seraphim, or Zephyrim Only',
    rosarius:                'Elite Only',
  },

  adeptus_custodes: {
    balistus_grenade_launcher:'Non-Anathema Elite Only',
    stakethrower:            'Anathema Only',
    storm_bolter:            'Non-Anathema Only',
    autocannon:              'Contemptor Only',
    combi_bolter:            'Contemptor Only',
    heavy_flamer:            'Contemptor Only',
    multi_melta:             'Contemptor Only',
    reaper_chaincannon:      'Non-Anathema Only',
    salvo_launcher:          'Dawneagle Only',
    twin_las_pulsar:         'Contemptor Only',
    twin_adrathic_destructor:'Aquilon Armour Only',
    psyk_out_grenades:       'Anathema Only',
    tarsis_buckler:          'Venatari Only, Max 1 per model',
    vaultswords:             'Blade Champion Only',
    solerite_power_gauntlet: 'Aquilon Only',
    solerite_power_talon:    'Aquilon Only',
    achillus_dreadspear:     'Contemptor Only',
    galatus_warblade:        'Contemptor Only',
    auramite_armour_custodes:'Non-Anathema Only',
    aquilon_armour_custodes: 'LIMIT: 1 besides Aquilon Terminators, Non-Anathema Elite or Aquilon Terminator Only',
    praesidium_shield_custodes:'Shield-Captain or Contemptor Only',
    dawneagle_jetbike_custodes:'Custodian or Shield-Captain Only',
    grapnel_launcher:        'Anathema Only',
    holy_relic:              'Elite Only',
    jump_pack:               'Venatari Only',
    vexilla_custodes:        'non-Anathema Only',
  },

  adeptus_mechanicus: {
    eradication_ray_admech:  'Elite Only',
    flamer:                  'Kataphron Only',
    plasma_caliver_admech:   'Elite Only',
    eradication_pistol:      'Elite Only',
    flechette_blaster_admech:'Elite or Sicarian Only',
    gamma_pistol_admech:     'Elite Only',
    phosphor_serpenta_admech: 'Elite or Sicarian Only',
    arc_claw_admech:         'Dominus, Tech-Priest, Servitor, or Kataphron Only',
    electroleech_stave_admech:'Electro-Priest Only',
    electrostatic_gauntlets_admech:'Electro-Priest Only',
    hydraulic_claw_admech:   'Dominus, Tech-Priest, Servitor, or Kataphron Only',
    omnissian_axe_admech:    'Dominus or Tech-Priest Only',
    power_weapon:            'Elite Only',
    pteraxii_talons_admech:  'Pteraxii Only',
    servo_claw_admech:       'Dominus, Tech-Priest, Servitor, or Kataphron Only',
    power_armour:            'Dominus or Tech-Priest Only',
    holy_relic:              'Elite Only',
    imperative_surge_wafer:  'Elite Only',
    jump_pack:               'Pteraxii Only',
    omnispex_admech:         'Skitarii or Skitarii Marshal Only',
    servo_skull_admech:      'Dominus or Tech-Priest Only',
    serberys_construct_admech:'Skitarii or Marshal Only',
  },

  adeptus_ministorum: {
    bolt_pistol:             'Elite or Battle Cherub Only',
    inferno_pistol:          'Elite Only',
    stub_pistol:             'Elite Only',
    dartmask_min:            'Death Cult Only',
    throwing_knives:         'Death Cult Only',
    smoke_grenades:          'Death Cult Only',
    paired_blades:           'Death Cult Only',
    incentiviser_min:        'Battle Cherub Only',
    mace_of_censure_min:     'Elite Only',
    power_weapon:            'Elite Only',
    shield:                  'Crusader Only',
    grapnel_launcher:        'Death Cult Only',
    holy_relic:              'Elite Only',
    rosarius:                'Elite Only',
  },

  astra_militarum: {
    hotshot_lasgun:          'Elite Only',
    bolt_pistol:             'Elite Only',
    hotshot_laspistol:       'Elite Only',
    plasma_pistol:           'Elite Only',
    grenadier_gauntlet:      'Ogryn Only',
    mortar:                  'Heavy Weapon Squad Only',
    chain_blade:             'Elite or Gor Only',
    force_rod:               'Psyker Only',
    force_staff:             'Psyker Only',
    force_weapon:            'Elite Psyker Only',
    power_weapon:            'Elite Only',
    heavy_power_fist:        'Elite Only',
    thunder_hammer:          'Ogryn Only',
    power_armour:            'Elite Only',
    shield:                  'non-Ogryn Only',
    heavy_shield:            'Ogryn Only',
    jump_pack:               'Drop Trooper Only',
    rough_rider_horse_am:    'Elite or Veteran Only, Max 1 Elite on Horse',
  },

  officio_assassinorum: {
    exitus_rifle_oa:         'Vindicare Only',
    neural_shredder_oa:      'Callidus Only',
    toxin_ejector_oa:        'Venenum Only',
    exitus_pistol_oa:        'Vindicare Only',
    hand_flamer:             'Elite Only',
    inferno_pistol:          'Elite Only',
    plasma_pistol:           'Elite Only',
    poison_globes_oa:        'Venenum Only',
    psyk_out_grenades:       'Culexus Only',
    hookfang_oa:             'Venenum Only',
    neuro_gauntlet_oa:       'Eversor Only',
    nemesii_blade_oa:        'Adamus Only',
    phase_sword_oa:          'Callidus Only',
    power_weapon:            'Elite Only',
    sympatic_dataspike_oa:   'Vanus Only',
    eviscerator:             'Elite Only',
    heavy_power_weapon:      'Elite Only',
    synskin_bodyglove:       'Elite Only',
    holy_relic:              'Elite Only',
  },

  the_inquisition: {
    digital_weapons_inq:     'Jokaero Only',
    hand_flamer:             'Elite Only',
    inferno_pistol:          'Elite Only',
    plasma_pistol:           'Elite Only',
    force_rod:               'Psyker Only',
    force_staff:             'Psyker Only',
    force_weapon:            'Elite Psyker Only',
    lightning_claw:          'Elite Only',
    power_weapon:            'Elite Only',
    heavy_power_weapon:      'Elite Only',
    heavy_power_fist:        'Elite Only',
    power_armour:            'Elite Only',
    terminator_armour:       'Inquisitor Only',
    shield:                  'non-Jokaero Only',
    holy_relic:              'Elite Only',
    psychic_hood:            'Psyker Inquisitor Only',
    rosarius:                'Inquisitor Only',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  XENOS FACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  orks: {
    grot_blasta:             'Gretchin Only',
    kustom_mega_slugga:      'Mek or Big Mek Only',
    shokka_pistol:           'Mek or Big Mek Only',
    twin_slugga:             'Elite Only',
    big_shoota:              'Elite Only',
    kustom_mega_blasta:      'Mek or Big Mek Only',
    shokk_attack_gun:        'Mek or Big Mek Only',
    traktor_blasta:          'Mek or Big Mek Only',
    zzap_gun:                'Mek or Big Mek Only',
    twin_dakkagun:           'Warbike Only',
    grabba_stikk:            'Runtherd Only',
    grot_prod:               'Runtherd Only',
    twin_choppas:            'Elite or Kommando Only',
    weirdboy_staff:          'Psyker Only',
    twin_killsaw:            'Elite Only',
    uge_choppa:              'Warboss Only',
    throwing_knives:         'Kommando Only',
    ded_ard_armour:          'Elite or Nob Only',
    mega_armour_orks:        'Elite or Nob Only',
    bosspole_orks:           'Elite or Gretchin Only',
    distraction_grot:        'Kommando Only',
    grot_gunner:             'Warbike Only',
    grot_oiler:              'Mega Armour or Deff Dread Only',
    grot_orderly:            'Painboss Only',
    iron_gob_orks:           'Elite or Nob Only',
    jump_rokkit_orks:        'Stormboy Only',
    personal_tellyporta:     'Mek Only',
    squig_bomb:              'Squig Only',
    warbike_orks:            'Elite or Boy Only',
  },

  tyranids: {
    piercing_claw:           'Elite or Tyranid Warrior Only',
    rending_claw:            'Elite or Ravener Only',
    toxic_scythe:            'Ravener Only',
    slayer_sabre:            'Elite Only',
    blinding_venom:          'Gargoyle Only',
    toxic_glands:            'Ravener Only',
    venom_blast:             'Ravener Only',
    bone_mace:               'Hive Tyrant or Ravener Only',
    pincer_tail:             'Hive Tyrant or Ravener Only',
    tail_blade:              'Hive Tyrant or Ravener Only',
    abhorrent_pheromones:    'Elite Only',
    adrenal_glands:          'Gaunt Only',
    acid_blood:              'Elite Only',
    acid_maw:                'Gaunt Only',
    balemind_membrane:       'Psyker Only',
    bioplasma_discharger:    'Elite Only',
    bonded_exoskeleton:      'Elite with −2 or higher Armour Only',
    flesh_hooks:             'Elite or Tyranid Warrior Only',
  },

  genestealer_cults: {
    stub_pistol:             'Elite Only',
    bonesword_gsc:           'Elite Only',
    chain_blade:             'Elite Only',
    force_rod:               'Psyker Only',
    force_staff:             'Psyker Only',
    force_weapon:            'Elite Psyker Only',
    lash_whip_gsc:           'Elite Only',
    power_weapon:            'Elite Only',
    thunder_hammer:          'Abominant Only',
    atalan_bike:             'Neophyte Only',
    atalan_quad:             'Neophyte Only',
  },

  harlequins: {
    neuro_disruptor_harlequins:'Elite Psyker Only',
    shrieker_cannon:         'Death Jester Only',
    mist_staff:              'Psyker Only',
    power_blade_harlequins:  'Elite Only',
    power_glaive_harlequins: 'Skyweaver Only',
    witchblade:              'Psyker Only',
    witch_staff:             'Psyker Only',
    star_bolas:              'Skyweaver Only',
  },

  leagues_of_votann: {
    ion_pistol:              'Elite Only',
    grenadier_gauntlet:      'Hearthguard Only',
    force_rod:               'Psyker Only',
    force_staff:             'Psyker Only',
    heavy_concussion_gauntlet:'Steeljack Only',
    twin_heavy_concussion_gauntlets:'Steeljack Only',
    thunder_hammer:          'Elite Only',
    shield:                  'Elite or Hearthguard Only',
    ancestral_crest:         'Elite Only',
    exoarmour_grenade_launcher:'Hearthguard Only',
    grey_crest:              'Elite Only',
    jump_pack:               'Hearthkyn Only',
    mass_driver_accelerators:'Hearthguard Only',
    preymark_crest:          'Elite or Steeljack Only',
    rampart_crest:           'Elite Only',
    rollbar_searchlight:     'Pioneer Only',
    teleport_crest:          'Elite or Hearthguard Only',
    weavefield_crest:        'Elite or Hearthguard Only',
  },

  slanni: {
    neuro_disruptor_slanni:  'Elite Psyker Only',
    astromancers_staff:      'Starpriest Only',
    mage_staff:              'Psyker Only',
    psy_barrier_slanni:      'Psyker Only',
    hover_palanquin_slanni:  'Psyker Only',
    stealth_field_slanni:    'Skirmisher Only',
  },

  necrons: {
    gauntlet_of_fire_nec:    'Elite Only',
    twin_gauss_blaster:      'Tomb Blade Only',
    twin_tesla_carbine:      'Tomb Blade Only',
    lords_blade_nec:         'Elite Only',
    voidblade:               'Elite or Lychguard Only',
    warscythe:               'Elite or Lychguard Only',
    abyssal_staff:           'Elite Only',
    aeonstave:               'Elite Only',
    eldritch_lance:          'Elite Only',
    rod_of_covenant:         'non-Cryptek Elite or Lychguard Only',
    staff_of_light_nec:      'Elite Only',
    tremorstave:             'Elite Only',
    voltaic_staff:           'Elite Only',
    dispersion_shield_necrons:'Royal Warden or Immortal Only',
    gravity_displacement_pack:'Lychguard Only',
    heart_of_darkness_necrons:'Elite Only',
    canoptek_cloak:          'Cryptek Only',
    nebuloscope:             'Tomb Blade Only',
    phylactery_necrons:      'Leader Only',
    plasmacyte_reanimator:   'Elite Only',
    shadowloom_necrons:      'Tomb Blade Only',
    shieldvanes_necrons:     'Tomb Blade Only',
    tachyon_arrow_necrons:   'Necron Lord Only',
    translocation_shroud:    'Necron Lord Only',
  },

  aeldari: {
    avenger_shuriken_catapult:'Elite or Dire Avenger Only',
    cloudsweeper_aeldari:    'Swooping Hawk Only',
    death_spinner_aeldari:   'Elite or Warp Spider Only',
    dragon_fusion_gun:       'Elite or Fire Dragon Only',
    dragons_breath_flamer:   'Fire Dragon Only',
    firepike_aeldari:        'Elite or Fire Dragon Only',
    hawks_talon:             'Swooping Hawk Only',
    lasblaster_aeldari:      'Elite or Swooping Hawk Only',
    death_weavers:           'Elite or Warp Spider Only',
    dragon_fusion_pistol:    'Elite or Fire Dragon Only',
    sunpistol_aeldari:       'Elite or Swooping Hawk Only',
    distortion_scythe:       'Wraith Only',
    reaper_launcher:         'Dark Reaper or Wraith Only',
    tempest_launcher:        'Dark Reaper or Wraith Only',
    wraithcannon:            'Wraith Only',
    banshee_blade:           'Elite or Howling Banshee Only',
    biting_blade:            'Striking Scorpion Only',
    diresword:               'Dire Avenger Only',
    ghost_blade_aeldari:     'Wraith Only',
    mirrorswords:            'Howling Banshee Only',
    mist_staff:              'Psyker Only',
    scorpion_chainsword:     'Elite or Striking Scorpion Only',
    paired_chainsabres:      'Elite or Striking Scorpion Only',
    scorpions_claw:          'Striking Scorpion Only',
    singing_spear:           'Psyker Only',
    star_lance:              'Shining Spear Only',
    melta_bombs_aeldari:     'Fire Dragon Only',
    aspect_armour:           'Elite or Aspect Warrior Only',
    wraithbone_armour:       'Elite Psyker Only',
    celestial_shield_aeldari:'Guardian Only',
    force_shield_aeldari:    'Wraith Only',
    banshee_mask:            'Autarch or Howling Banshee Only',
    blood_of_isha:           'Elite Only',
    cloak_of_shadow:         'Warlock Only',
    ghosthelm_aeldari:       'Psyker Only',
    guardian_platform:       'non-Ranger Guardian Only',
    jetbike_aeldari:         'Shining Spear Only',
    jetbike_shimmershield:   'Shining Spear Only',
    mandiblasters_aeldari:   'Striking Scorpion Only',
    shimmershield_aeldari:   'Elite Only',
    spirit_stone_aeldari:    'Psyker Only',
    swooping_hawk_wings:     'Autarch or Swooping Hawk Only',
  },

  t_au_empire: {
    dart_bow_tau:            'Kroot Only',
    dvorgite_skinner:        'Kroot Only',
    kroot_carbine:           'Kroot Only',
    kroot_rifle:             'Kroot Only',
    kroot_shaper_rifle:      'Kroot Only',
    kroot_scattergun:        'Kroot Only',
    kroot_pistol:            'Kroot Only',
    londaxi_tribalest:       'Kroot Only',
    repeater_cannon_tau:     'Kroot Only',
    tanglecannon:            'Kroot Only',
    tanglebomb_launcher:     'Kroot Only',
    burst_cannon_tau:        'Battlesuit Only',
    cyclic_ion_blaster:      'Battlesuit Only',
    tau_flamer:              'Battlesuit Only',
    fusion_blaster_tau:      'Battlesuit Only',
    missile_pod_tau:         'Battlesuit Only',
    plasma_rifle_tau:        'Battlesuit Only',
    he_fusion_blaster:       'Elite Battlesuit Only',
    hi_plasma_rifle:         'Elite Battlesuit Only',
    ho_burst_cannon:         'Elite Battlesuit Only',
    heavy_burst_cannon:      'Battlesuit Only',
    heavy_rail_rifle:        'Battlesuit Only',
    high_yield_missile_pods: 'Battlesuit Only',
    seeker_missile:          'Battlesuit Only',
    twin_burst_cannon:       'Battlesuit Only',
    twin_plasma_rifle_tau:   'Battlesuit Only',
    twin_smart_missile_system:'Battlesuit Only',
    smart_missile_system:    'Battlesuit Only',
    fragmentation_projector: 'Battlesuit Only',
    equalizer_tau:           'Ethereal Only',
    honor_blade_tau:         'Elite Only',
    kroot_bayonet:           'Kroot Only',
    blast_javelin_tau:       'Kroot Only',
    hunting_javelins:        'Kroot Only',
    tri_blades_tau:          'Kroot Only',
    battlesuit_blade:        'Battlesuit Only',
    shield_generator_tau:    'Battlesuit Only',
    air_purifiers_tau:       'Battlesuit Only',
    automated_repair_system: 'Battlesuit Only',
    battlesuit_support_system:'Battlesuit Only',
    energy_shield_tau:       'Shield Drone or Elite Battlesuit Only',
    hover_drone_tau:         'Ethereal Only',
    iridium_armour:          'non-Stealth Battlesuit Only',
    kroothawk_flock:         'Elite Kroot Only',
    protected_servos_tau:    'Battlesuit Only',
    vectored_manoeuvring_thrusters:'Flying Battlesuit Only',
    weapon_support_system:   'Battlesuit Only',
  },

  drukhari: {
    hexrifle_drukhari:       'Haemonculus or Wrack Only',
    ossefactor_drukhari:     'Haemonculus or Wrack Only',
    spirit_syphon_drukhari:  'Cronos Only',
    spirit_vortex_drukhari:  'Cronos Only',
    splinter_pods_drukhari:  'Hellion Skyboard Only',
    twin_haywire_blaster_drukhari:'Talos Only',
    twin_heat_lance_drukhari:'Talos Only',
    twin_liquifier_gun_drukhari:'Talos Only',
    twin_splinter_cannon_drukhari:'Talos Only',
    agoniser_drukhari:       'Elite, Wych, or Reaver Only',
    demiklaives_drukhari:    'Elite or Incubus Only',
    huskblade_drukhari:      'Archon Only',
    klaive_drukhari:         'Elite or Incubus Only',
    macro_scalpel_drukhari:  'Haemonculus Only',
    scissorhand_drukhari:    'Haemonculus or Wrack Only',
    spirit_leech_tentacles_drukhari:'Cronos Only',
    spirit_probe_drukhari:   'Cronos Only',
    talos_ichor_injector_drukhari:'Talos Only',
    torturers_tools_drukhari:    'Haemonculus, Talos, or Wrack Only',
    tormentor_helm:          'Incubus Only',
    wychsuit:                'Elite or Wych Only',
    incubus_warsuit:         'Elite or Incubus Only',
    ghostplate_armour:       'Archon Only',
    goblet_of_spite:         'Succubus or Wych Only',
    hellion_skyboard:        'Succubus or Wych Only',
    hell_mask_drukhari:      'Wrack Only',
    scourge_wings:           'Archon or Kabalite Warrior Only',
    shadow_field_drukhari:   'Elite Only',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  OUTLAW FACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  pirate_crew: {
    inferno_pistol:          'Elite Only',
    plasma_pistol:           'Elite Only',
    volkite_pistol:          'Elite Only',
    force_rod:               'Psyker Only',
    force_staff:             'Psyker Only',
    force_weapon:            'Elite Psyker Only',
    power_weapon:            'Elite Only',
    heavy_power_fist:        'Elite Only',
    thunder_hammer:          'Elite Only',
    cyber_parrot:            'Elite Only',
    jump_pack:               'Rigger Only',
    power_armour:            'Elite Only',
  },
};

/**
 * Returns the faction-specific wargear notes map for the given faction,
 * or an empty object if none exist.
 */
export function getFactionWargearNotes(factionId: string): Record<string, string> {
  return FACTION_WARGEAR_NOTES[factionId] ?? {};
}
