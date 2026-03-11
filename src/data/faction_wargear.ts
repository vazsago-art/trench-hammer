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
 *   IMPERIAL_ALL  – full shared imperial loadout (all categories)
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

const BASIC_RANGED_IDS: string[] = [
  'autogun', 'automatic_shotgun', 'bolt_carbine', 'boltgun',
  'las_carbine', 'las_rifle', 'shotgun',
];

const PISTOL_IDS: string[] = [
  'assault_bolter', 'autopistol', 'bolt_pistol', 'condemnor_bolt_pistol',
  'grav_pistol', 'hand_flamer', 'heavy_bolt_pistol', 'hotshot_laspistol',
  'inferno_pistol', 'laspistol', 'needle_pistol', 'plasma_pistol',
  'stub_pistol', 'twin_bolt_pistols', 'twin_hand_flamers', 'twin_inferno_pistols',
  'volkite_pistol', 'web_pistol',
];

const SPECIAL_RANGED_IDS: string[] = [
  'arc_rifle', 'automatic_bolt_rifle', 'bolt_rifle', 'bolt_sniper_rifle',
  'combi_weapon', 'condemnor_boltgun', 'flamer', 'grav_gun',
  'grenadier_gauntlet', 'grenade_launcher', 'heavy_stubber', 'hotshot_lasgun',
  'longlas', 'melta_gun', 'needle_rifle', 'plasma_gun',
  'stakethrower', 'storm_bolter', 'webber',
];

const HEAVY_RANGED_IDS: string[] = [
  'autocannon', 'combi_bolter', 'cyclone_missile_launcher', 'grav_cannon',
  'harpoon_launcher', 'heavy_arc_rifle', 'heavy_bolter', 'heavy_flamer', 'heavy_melta_rifle',
  'krumper_rivet_cannon', 'lascannon', 'mining_laser', 'missile_launcher', 'mole_launcher',
  'mortar', 'multi_melta', 'plasma_cannon', 'reaper_chaincannon',
  'ripper_gun', 'seismic_cannon', 'twin_heavy_stubber', 'twin_lascannon',
];

const THROWN_IDS: string[] = [
  'blasting_charge', 'electro_grenades', 'frag_grenades', 'gunk_bombs',
  'incendiary_grenades', 'krak_grenades', 'melta_bombs', 'throwing_knives',
  'toxin_grenades',
];

/** Basic melee weapons available to most factions (bayonet added per-faction below) */
const BASIC_MELEE_IDS: string[] = [
  'blade', 'bludgeon', 'close_combat_weapon', 'flail', 'halberd', 'paired_blades',
];

const SPECIAL_MELEE_IDS: string[] = [
  'butchers_cleaver', 'butchers_chain_cleaver', 'chain_blade', 'chain_glaive',
  'force_rod', 'force_staff', 'force_weapon', 'goad_lance', 'las_cutter', 'lightning_claw',
  'plasma_blade', 'poison_blade', 'power_weapon', 'shock_baton', 'shock_stave', 'taser_goad',
  'twin_butchers_chain_cleavers',
];

const HEAVY_MELEE_IDS: string[] = [
  'arc_welder', 'chain_fist', 'eviscerator', 'heavy_plasma_blade', 'heavy_power_fist', 'heavy_power_weapon',
  'heavy_rock_drill', 'heavy_rock_saw', 'shock_maul', 'thunder_hammer', 'two_handed_blade', 'two_handed_hammer',
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
// Composite profiles
// ---------------------------------------------------------------------------

/** Full imperial arsenal – all shared weapons + equipment (no bayonet by default) */
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

/** Chaos arsenal = imperial + daemon weapons + Marks of Chaos + HA Icons & equipment */
const CHAOS_ALL = [
  ...IMPERIAL_ALL,
  'bayonet',
  ...CHAOS_SPECIFIC_IDS,
  // Marks of Chaos
  'mark_of_darkness', 'mark_of_khorne', 'mark_of_nurgle', 'mark_of_slaanesh', 'mark_of_tzeentch',
  // Icons of Chaos
  'chaos_icon', 'icon_of_despair', 'icon_of_excess', 'icon_of_flame', 'icon_of_wrath',
  // HA-specific equipment
  'astartes_bike', 'vengeance_ammunition',
];

/**
 * Pure daemons – exact Chaos Daemons armoury from instruction file.
 * Basic Melee: Blade(4cr), Bludgeon(1cr), CCW(3cr), Halberd(7cr)
 * Special Melee (Psyker Only): Force Rod(3cr), Force Staff(10cr)
 * Heavy Melee: Two-Handed Blade(12cr), Two-Handed Hammer(10cr)
 * Armour: Shield(10cr)
 * Equipment: Chaos Icon(15cr), Icon of Vengeance(1 Glory), Musical Instrument(15cr)
 * No ranged weapons, no bayonet, no grenades in base armoury.
 */
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

/** Underhive gangers – no heavy tech weapons or power armour */
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
];

/** Orks – brutal simplicity; no force weapons, no precision tech */
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
  'shrapnel_bolter_iw', 'shrapnel_cannon_iw', 'shrapnel_pistol_iw',
  // Night Lords
  'chain_snare_nl', 'comms_jammer_nl', 'grisly_trophy_nl', 'ventrilokar_vox_nl',
  'terrorchem_vials_nl',
  // Thousand Sons
  'disc_of_tzeentch_ts',
  'inferno_boltgun_ts', 'inferno_bolt_pistol_ts', 'inferno_combi_bolter_ts',
  'force_stave_ts', 'power_claw_ts', 'soulreaper_cannon_ts',
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
    'shrapnel_bolter_iw', 'shrapnel_cannon_iw', 'shrapnel_pistol_iw',
  ],
  night_lords:      [...HA_SHARED_IDS,
    'chain_snare_nl', 'comms_jammer_nl', 'grisly_trophy_nl', 'ventrilokar_vox_nl',
    'terrorchem_vials_nl',
  ],
  thousand_sons:    [...HA_SHARED_IDS,
    'disc_of_tzeentch_ts',
    'inferno_boltgun_ts', 'inferno_bolt_pistol_ts', 'inferno_combi_bolter_ts',
    'force_stave_ts', 'power_claw_ts', 'soulreaper_cannon_ts',
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
  'cyberteknika_torsonic_aa', 'cyberteknika_vascular_aa', 'servo_skull_ih',
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
  'executioner_greatblade', 'misericordia', 'tarsis_buckler', 'vaultswords',
  'solerite_power_gauntlet', 'solerite_power_talon',
  // Adeptus Custodes combined weapons
  'achillus_dreadspear', 'adrasite_spear', 'castellan_axe', 'galatus_warblade',
  'guardian_spear', 'pyrithite_spear', 'sentinel_blade',
  'frag_ammunition_custodes', 'vengeance_ammunition',
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

const ADEPTA_SORORITAS_SPECIFIC_IDS: string[] = [
  'armourium_cherub_sor', 'blessed_ammunition_sor', 'combat_helmet_sor',
  'incensor_cherub_sor', 'infernus_ammunition_sor', 'musical_instrument', 'phial_of_dolan_sor',
  'purity_seal_sor', 'sacresant_shield_sor', 'simulacrum_imperialis_sor', 'troop_flag_sor',
  'cyberteknika_cranial_sor', 'cyberteknika_ocular_sor',
  'cyberteknika_sindexterous_sor', 'cyberteknika_motive_sor',
  // Paragon Warsuit weapons
  'twin_storm_bolter_sor', 'twin_g_launcher_sor',
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
];

const OFFICIO_ASSASSINORUM_SPECIFIC_IDS: string[] = [
  'synskin_bodyglove', 'sentinel_array_oa', 'spy_mask_oa', 'holy_relic_oa', 'purity_seal_oa',
  // Officio Assassinorum unique melee
  'hookfang_oa', 'neuro_gauntlet_oa', 'nemesii_blade_oa', 'phase_sword_oa', 'sympatic_dataspike_oa',
  // Officio Assassinorum unique ranged
  'exitus_rifle_oa', 'exitus_pistol_oa', 'needlespine_blaster_oa', 'neural_shredder_oa', 'toxin_ejector_oa',
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
  'battle_armour_tau', 'shield_generator_tau', 'iridium_armour',
  'air_purifiers_tau', 'automated_repair_system', 'battlesuit_support_system',
  'comms_unit_tau', 'energy_shield_tau', 'firesight_drone_controller',
  'hover_drone_tau', 'kroothawk_flock', 'medical_kit_tau',
  'multispectrum_sensor_suite', 'protected_servos_tau',
  'vectored_manoeuvring_thrusters', 'weapon_support_system',
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
  'slaught_nec', 'spur_nec', 'stinger_mould_nec',
  'ash_cloak_nec', 'dustback_halamite_nec', 'sky_mantle_nec',
  'frightening_mask_nec', 'terrifying_mask_nec',
  'cult_icon_cawdor', 'ridge_walker_cawdor',
  'displacer_field_delaque',
  'cutter_escher', 'bad_blood_escher', 'brain_lock_escher', 'hyper_escher',
  'jolt_escher', 'night_night_escher', 'puke_escher', 'wide_eye_escher',
  'mauler_goliath',
  'outrider_quad_orlock',
  'arachni_rig_vansaar', 'servo_medicae_vansaar',
  'cyberteknika_cranial_vansaar', 'cyberteknika_ocular_vansaar',
  'cyberteknika_sindexterous_vansaar', 'cyberteknika_motive_vansaar',
  'cyberteknika_torsonic_vansaar', 'cyberteknika_vascular_vansaar',
  'svenotar_trike_squat', 'telescopic_sight_squat',
  'hunting_rig_venators', 'heavy_hunting_rig_venators',
  'yeld_hunting_rig_venators', 'sthenian_hunting_rig_venators',
  'mirror_shield_venators', 'incendiary_grenades_venators',
  'magnacles_enforcers', 'nuncio_aquila_enforcers',
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
];

// ---------------------------------------------------------------------------
// Per-faction allowed wargear IDs
// ---------------------------------------------------------------------------

export const FACTION_WARGEAR: Record<string, string[]> = {
  // === IMPERIAL ===
  adeptus_astartes:      [...IMPERIAL_ALL, ...ADEPTUS_ASTARTES_SPECIFIC_IDS],
  astra_militarum:       [...IMPERIAL_WITH_BAYONET, ...ASTRA_MILITARUM_SPECIFIC_IDS],
  adeptus_custodes:      [...IMPERIAL_ALL, ...ADEPTUS_CUSTODES_SPECIFIC_IDS],
  adepta_sororitas:      SORORITAS_WARGEAR,
  adeptus_mechanicus:    [...IMPERIAL_WITH_BAYONET, ...ADEPTUS_MECHANICUS_SPECIFIC_IDS],
  adeptus_ministorum:    [...IMPERIAL_ALL, ...ADEPTUS_MINISTORUM_SPECIFIC_IDS],
  officio_assassinorum:  [...IMPERIAL_WITH_BAYONET, ...OFFICIO_ASSASSINORUM_SPECIFIC_IDS],
  rogue_trader:          IMPERIAL_ALL,
  the_inquisition:       [...IMPERIAL_WITH_BAYONET, ...THE_INQUISITION_SPECIFIC_IDS],
  grey_knights:          IMPERIAL_ALL,
  adeptus_arbites:       GANGER,

  // === CHAOS ===
  heretic_astartes:      [...CHAOS_ALL, ...HA_VARIANT_IDS],
  // grenadier_gauntlet is Ogryn-only in Chaos Cult — gated via UNIT_WARGEAR_OVERRIDES for cc_chaos_ogryn.
  chaos_cult:            [...CHAOS_ALL.filter(id => id !== 'grenadier_gauntlet'), ...CHAOS_CULT_IDS],
  chaos_daemons:         [...DAEMON_BASIC, ...CHAOS_DAEMON_IDS, ...CHAOS_DAEMONS_WEAPON_IDS],
  the_vermintide:        [...GANGER, ...VERMINTIDE_IDS],

  // === XENOS ===
  orks:                  [...ORK, ...ORKS_SPECIFIC_IDS, ...ORKS_WEAPON_IDS],
  tyranids:              [...MELEE_ONLY, ...TYRANIDS_SPECIFIC_IDS, ...TYRANIDS_WEAPON_IDS],
  genestealer_cults:     [...GANGER, ...GENESTEALER_CULTS_SPECIFIC_IDS],
  harlequins:            [...XENOS_ELITE, ...HARLEQUINS_SPECIFIC_IDS, ...HARLEQUINS_WEAPON_IDS],
  leagues_of_votann:     [...XENOS_ELITE, ...LEAGUES_OF_VOTANN_SPECIFIC_IDS, ...LEAGUES_OF_VOTANN_WEAPON_IDS],
  slanni:                [...XENOS_ELITE, ...SLANNI_SPECIFIC_IDS, ...SLANNI_WEAPON_IDS],
  necrons:               [...XENOS_ELITE, ...NECRONS_SPECIFIC_IDS, ...NECRONS_STANDARD_WEAPON_IDS, ...NECRONS_DESTROYER_WEAPON_IDS],
  aeldari:               [...XENOS_ELITE, ...AELDARI_SPECIFIC_IDS, ...AELDARI_WEAPON_IDS],
  t_au_empire:           [...XENOS_ELITE, ...TAU_EMPIRE_SPECIFIC_IDS, ...TAU_EMPIRE_WEAPON_IDS],
  drukhari:              [...XENOS_ELITE, ...DRUKHARI_SPECIFIC_IDS, ...DRUKHARI_WEAPON_IDS],

  // === OUTLAW ===
  necromunda_gang:       [...GANGER, ...NECROMUNDA_GANG_SPECIFIC_IDS],
  pirate_crew:           [...GANGER, ...PIRATE_CREW_SPECIFIC_IDS],
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
    'augury_scanner', 'purity_seal',
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
  ha_chaos_sorcerer: [
    'bolt_pistol', 'plasma_pistol',
    'force_staff', 'force_weapon', 'power_weapon', 'demon_weapon', 'warp_claws',
    'power_armour', 'terminator_armour', 'shield',
    'psychic_hood', 'purity_seal',
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
  // T'au Fire Warriors
  tau_fire_warrior: [
    'las_rifle', 'bolt_rifle', 'grenade_launcher',
    'frag_grenades', 'krak_grenades',
    ...BASIC_MELEE_IDS,
    'standard_armour',
    'combat_helmet', 'filter_plugs',
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
  if (UNIT_WARGEAR_OVERRIDES[unitId]) {
    return UNIT_WARGEAR_OVERRIDES[unitId];
  }

  let baseIds = FACTION_WARGEAR[factionId];
  if (!baseIds) return undefined;

  // ── Heretic Astartes: subfaction-aware variant gear + Raptor gating ──
  if (factionId === 'heretic_astartes' && subfactionId) {
    const hasRaptor = !!(selectedUpgrades && (selectedUpgrades['ha_csm_raptor'] ?? 0) > 0);
    // Pick only the active subfaction's variant gear (falls back to full pool if unknown subfaction)
    const variantIds = HA_SUBFACTION_WARGEAR[subfactionId] ?? HA_VARIANT_IDS;
    // Build allowed list: base CHAOS_ALL + subfaction variant IDs + Raptor-gated items
    let ids: string[] = [...CHAOS_ALL, ...variantIds];
    if (hasRaptor) {
      ids = [...ids, 'warp_claws'];
    } else {
      // Remove jump_pack for CSM models without Raptor upgrade (Raptor upgrade description:
      // "Can be equipped with Jump Packs")
      if (unitId === 'ha_chaos_space_marine') {
        ids = ids.filter(id => id !== 'jump_pack');
      }
    }
    // Deduplicate while preserving order
    return Array.from(new Set(ids));
  }

  return baseIds;
}
