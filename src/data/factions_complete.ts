import { Faction, UnitOption } from '../types/index.js';

import { unitAbilitiesMap } from './unit_abilities.js';
import {
  as_canoness,
  as_dogmata,
  as_palatine,
  as_novitiate,
  as_battle_sister,
  as_repentia,
  as_paragon_warsuit,
  as_penitent_engine
} from './factions/adeptaSororitas.units.js';
import {
  arb_gang_leader,
  arb_gang_champion,
  arb_juve,
  arb_ganger,
  arb_cyber_mastiff,
  arb_sanctioner_automata
} from './factions/adeptusArbites.units.js';
import {
  aa_captain,
  aa_apothecary,
  aa_chaplain,
  aa_librarian,
  aa_scout_marine,
  aa_space_marine,
  aa_terminator,
  aa_dreadnought
} from './factions/adeptusAstartes.units.js';
import {
  ac_shield_captain,
  ac_blade_champion,
  ac_knight_centura,
  ac_anathema_psykana,
  ac_custodian_guard,
  ac_aquilon_terminator,
  ac_contemptor_dreadnought
} from './factions/adeptusCustodes.units.js';
import {
  amec_dominus,
  amec_skitarii_marshal,
  amec_tech_priest,
  amec_skitarii,
  amec_servitor,
  amec_electro_priest,
  amec_sicarian,
  amec_kataphron,
  amec_kastelan_robot
} from './factions/adeptusMechanicus.units.js';
import {
  amin_confessor,
  amin_missionary,
  amin_drill_abbot,
  amin_preacher,
  amin_crusader,
  amin_death_cult_assassin,
  amin_battle_cherub,
  amin_miraculist
} from './factions/adeptusMinistorum.units.js';
import {
  ael_autarch,
  ael_seer,
  ael_warlock,
  ael_guardian,
  ael_aspect_warrior,
  ael_windrider,
  ael_wraith,
  ael_dragonlord,
  ael_dragon_knight,
  ael_wraithseer,
  ael_wraithlord
} from './factions/aeldari.units.js';
import {
  am_castellan,
  am_commissar,
  am_primaris_psyker,
  am_conscript,
  am_guardsman,
  am_veteran_guardsman,
  am_ratling_marksman,
  am_heavy_weapons_squad,
  am_ogryn
} from './factions/astraMilitarum.units.js';
import {
  cc_cult_demagogue,
  cc_heretic_witch,
  cc_chaos_disciple,
  cc_daemon_prince,
  cc_cult_rabble,
  cc_chaos_devotee,
  cc_chaos_ogryn,
  cc_chaos_spawn
} from './factions/chaosCult.units.js';
import {
  cd_daemon_prince,
  cd_chaos_furie,
  cd_bloodmaster,
  cd_skullmaster,
  cd_bloodletter,
  cd_flesh_hound,
  cd_infernal_enrapturess,
  cd_tranceweaver,
  cd_daemonette,
  cd_seeker,
  cd_contorted_epitome,
  cd_poxbringer,
  cd_spoilpox_scrivener,
  cd_plaguebearer,
  cd_nurgling_swarm,
  cd_plague_drone_rider,
  cd_changecaster,
  cd_flamer,
  cd_blue_horror,
  cd_pink_horror,
  cd_screamer
} from './factions/chaosDaemons.units.js';
import {
  dg_chaos_lord,
  dg_chaos_sorcerer,
  dg_plague_marine,
  dg_plague_terminator,
  dg_helbrute,
  dg_chaos_cultist,
  dg_poxwalker,
  dg_foetid_blight_drone
} from './factions/deathGuard.units.js';
import {
  dr_archon,
  dr_haemonculus,
  dr_succubus,
  dr_kabalite_warrior,
  dr_incubus,
  dr_wrack,
  dr_wych,
  dr_reaver,
  dr_cronos,
  dr_talos,
  dr_clawed_fiend,
  dr_khymera,
  dr_razorwing_flock
} from './factions/drukhari.units.js';
import {
  ec_chaos_lord,
  ec_dark_apostle,
  ec_chaos_sorcerer,
  ec_noise_marine,
  ec_possessed,
  ec_chaos_terminator,
  ec_helbrute,
  ec_chaos_cultist,
  ec_lord_kakophonist
} from './factions/emperorsChildren.units.js';
import {
  gc_primus,
  gc_clamavus,
  gc_magus,
  gc_nexos,
  gc_neophyte,
  gc_acolyte,
  gc_aberrant,
  gc_abominant,
  gc_patriarch,
  gc_genestealer_troop
} from './factions/genestealerCults.units.js';
import {
  gk_captain,
  gk_apothecary,
  gk_chaplain,
  gk_librarian,
  gk_scout_marine,
  gk_space_marine,
  gk_terminator,
  gk_dreadnought
} from './factions/greyKnights.units.js';
import {
  hq_troupe_master,
  hq_death_jester,
  hq_shadowseer,
  hq_solitaire,
  hq_mime,
  hq_player,
  hq_skyweaver
} from './factions/harlequins.units.js';
import {
  ha_chaos_lord,
  ha_dark_apostle,
  ha_chaos_sorcerer,
  ha_warpsmith,
  ha_chaos_cultist,
  ha_chaos_space_marine,
  ha_possessed,
  ha_chaos_terminator,
  ha_helbrute,
  ha_poxwalker,
  ha_foetid_blight_drone,
  ha_lord_kakophonist,
  ha_renegade_apothecary,
  ha_exalted_sorcerer,
  ha_tzaangor_shaman,
  ha_tzaangor,
  ha_master_of_executions,
  ha_slaughterbound
} from './factions/hereticAstartes.units.js';
import {
  inq_inquisitor,
  inq_interrogator,
  inq_mystic,
  inq_acolyte,
  inq_jokaero,
  inq_daemonhost
} from './factions/inquisition.units.js';
import {
  lv_kahl,
  lv_brokhyr_iron_master,
  lv_grimnyr,
  lv_hearthkyn,
  lv_cthonian_beserk,
  lv_einhyr_hearthguard,
  lv_brokhyr_thunderkyn,
  lv_ironkin_steeljack,
  lv_hernkyn_pioneer
} from './factions/leaguesOfVotann.units.js';
import {
  ng_gang_leader,
  ng_gang_champion,
  ng_juve,
  ng_ganger,
  ng_cyber_mastiff,
  ng_sanctioner_automata
} from './factions/necromundaGang.units.js';
import {
  nec_necron_lord,
  nec_cryptek,
  nec_royal_warden,
  nec_warrior,
  nec_immortal,
  nec_scarab_swarm,
  nec_tomb_blade,
  nec_lokhust_lord,
  nec_skorpekh_lord,
  nec_hexmark_destroyer,
  nec_lokhust_destroyer,
  nec_ophydian_destroyer,
  nec_skorpekh_destroyer,
  nec_canoptek_spyder,
  nec_apprentek,
  nec_macrocyte_warrior,
  nec_flayed_one,
  nec_flayer_king
} from './factions/necrons.units.js';
import {
  oa_adamus,
  oa_callidus,
  oa_culexus,
  oa_eversor,
  oa_vanus,
  oa_venenum,
  oa_vindicare,
  oa_aspirant
} from './factions/officioAssassinorum.units.js';
import {
  or_warboss,
  or_big_mek,
  or_weirdboy,
  or_gretchin,
  or_boy,
  or_nob,
  or_squig,
  or_deff_dread,
  or_squighog_boy
} from './factions/orks.units.js';
import {
  pc_pirate_captain,
  pc_first_mate,
  pc_pirate_champion,
  pc_pirate,
  pc_pirate_veteran
} from './factions/pirateCrew.units.js';
import {
  rt_lord_captain,
  rt_voidmaster,
  rt_navigator_scion,
  rt_voidsman
} from './factions/rogueTrader.units.js';
import {
  sl_mage_chief,
  sl_oldblood,
  sl_starpriest,
  sl_skirmisher,
  sl_brave,
  sl_battle_mage,
  sl_brute,
  sl_amphi_walker
} from './factions/slanni.units.js';
import {
  tau_ethereal,
  tau_commander,
  tau_cadre_fireblade,
  tau_kroot_shaper,
  tau_fire_warrior,
  tau_drone,
  tau_kroot_carnivore,
  tau_stealth_battlesuit,
  tau_crisis_battlesuit,
  tau_broadside_battlesuit,
  tau_kill_broker,
  tau_krootox_rider
} from './factions/tauEmpire.units.js';
import {
  ts_exalted_sorcerer,
  ts_chaos_sorcerer,
  ts_tzaangor_shaman,
  ts_tzeentch_cultist,
  ts_tzaangor,
  ts_rubric_marine,
  ts_scarab_occult_terminator,
  ts_sekhetar_robot,
  ts_helbrute
} from './factions/thousandSons.units.js';
import {
  ty_hive_tyrant,
  ty_lictor,
  ty_tyrant_guard,
  ty_gaunt_barbgaunt,
  ty_gaunt_gargoyle,
  ty_gaunt_hormagaunt,
  ty_gaunt_neurogaunt,
  ty_gaunt_termagant,
  ty_tyranid_warrior,
  ty_ravener,
  ty_ripper_swarm,
  ty_zoanthrope,
  ty_spore_mine
} from './factions/tyranids.units.js';
import {
  ver_clawlord,
  ver_deathmaster,
  ver_warlock,
  ver_skavenslave,
  ver_clanrat,
  ver_stormvermin,
  ver_weapons_team,
  ver_rat_ogryn,
  ver_doom_flayer
} from './factions/vermintide.units.js';
import {
  we_chaos_lord,
  we_dark_apostle,
  we_berzerker,
  we_jakhal,
  we_eightbound,
  we_chaos_terminator,
  we_helbrute,
  we_master_of_executions,
  we_slaughterbound
} from './factions/worldEaters.units.js';

export * from './factions/adeptaSororitas.units.js';
export * from './factions/adeptusArbites.units.js';
export * from './factions/adeptusAstartes.units.js';
export * from './factions/adeptusCustodes.units.js';
export * from './factions/adeptusMechanicus.units.js';
export * from './factions/adeptusMinistorum.units.js';
export * from './factions/aeldari.units.js';
export * from './factions/astraMilitarum.units.js';
export * from './factions/chaosCult.units.js';
export * from './factions/chaosDaemons.units.js';
export * from './factions/deathGuard.units.js';
export * from './factions/drukhari.units.js';
export * from './factions/emperorsChildren.units.js';
export * from './factions/genestealerCults.units.js';
export * from './factions/greyKnights.units.js';
export * from './factions/harlequins.units.js';
export * from './factions/hereticAstartes.units.js';
export * from './factions/inquisition.units.js';
export * from './factions/leaguesOfVotann.units.js';
export * from './factions/necromundaGang.units.js';
export * from './factions/necrons.units.js';
export * from './factions/officioAssassinorum.units.js';
export * from './factions/orks.units.js';
export * from './factions/pirateCrew.units.js';
export * from './factions/rogueTrader.units.js';
export * from './factions/slanni.units.js';
export * from './factions/tauEmpire.units.js';
export * from './factions/thousandSons.units.js';
export * from './factions/tyranids.units.js';
export * from './factions/vermintide.units.js';
export * from './factions/worldEaters.units.js';

/** Injects abilities from unitAbilitiesMap into a unit if the ID has a mapping. */
function wa(unit: UnitOption): UnitOption {
  const abilities = unitAbilitiesMap[unit.id];
  if (!abilities || abilities.length === 0) return unit;
  return { ...unit, abilities };
}

/** Applies ability injection to an entire units array. */
function applyAbilities(units: UnitOption[]): UnitOption[] {
  return units.map(wa);
}

/**
 * Creates a copy of a UnitOption remapped to a new faction, optionally filtering upgrades.
 * Used to create standalone faction unit definitions from HA variant templates.
 */

/** Strips requiredSubfactionId from an upgrade (makes it universally available within a faction). */

// ============================================================================
// FACTION OBJECTS
// ============================================================================

export const faction_adeptus_astartes: Faction = {
  id: 'adeptus_astartes',
  name: 'Adeptus Astartes',
  keywords: [],
  description: 'The Space Marines, genetically enhanced warriors of the Emperor.',
  units: applyAbilities([aa_captain, aa_apothecary, aa_chaplain, aa_librarian, aa_scout_marine, aa_space_marine, aa_terminator, aa_dreadnought]),
};

export const faction_astra_militarum: Faction = {
  id: 'astra_militarum',
  name: 'Astra Militarum',
  keywords: [],
  description: 'The vast armies of the Imperial Guard, humanity\'s shield.',
  units: applyAbilities([am_castellan, am_commissar, am_primaris_psyker, am_conscript, am_guardsman, am_veteran_guardsman, am_ratling_marksman, am_heavy_weapons_squad, am_ogryn]),
};

export const faction_adeptus_custodes: Faction = {
  id: 'adeptus_custodes',
  name: 'Adeptus Custodes',
  keywords: [],
  description: 'The golden warriors who guard the Emperor of Mankind.',
  units: applyAbilities([ac_shield_captain, ac_blade_champion, ac_knight_centura, ac_anathema_psykana, ac_custodian_guard, ac_aquilon_terminator, ac_contemptor_dreadnought]),
};

export const faction_adepta_sororitas: Faction = {
  id: 'adepta_sororitas',
  name: 'Adepta Sororitas',
  keywords: [],
  description: 'The Sisters of Battle, warrior-nuns of the Imperial faith.',
  units: applyAbilities([as_canoness, as_dogmata, as_palatine, as_novitiate, as_battle_sister, as_repentia, as_paragon_warsuit, as_penitent_engine]),
};

export const faction_adeptus_mechanicus: Faction = {
  id: 'adeptus_mechanicus',
  name: 'Adeptus Mechanicus',
  keywords: [],
  description: 'The machine-priests of Mars and their cybernetic legions.',
  units: applyAbilities([amec_dominus, amec_skitarii_marshal, amec_tech_priest, amec_skitarii, amec_servitor, amec_electro_priest, amec_sicarian, amec_kataphron, amec_kastelan_robot]),
};

export const faction_adeptus_ministorum: Faction = {
  id: 'adeptus_ministorum',
  name: 'Adeptus Ministorum',
  keywords: [],
  description: 'The Ecclesiarchy\'s faithful militia, spreading the Imperial Creed by fire and sword.',
  units: applyAbilities([amin_confessor, amin_missionary, amin_drill_abbot, amin_preacher, amin_crusader, amin_death_cult_assassin, amin_battle_cherub, amin_miraculist]),
};

export const faction_officio_assassinorum: Faction = {
  id: 'officio_assassinorum',
  name: 'Officio Assassinorum',
  keywords: [],
  description: 'The Emperor\'s hidden blade. No mandatory leader; max 6 elite models.',
  units: applyAbilities([oa_adamus, oa_callidus, oa_culexus, oa_eversor, oa_vanus, oa_venenum, oa_vindicare, oa_aspirant]),
};

export const faction_rogue_trader: Faction = {
  id: 'rogue_trader',
  name: 'Rogue Trader',
  keywords: [],
  description: 'Explorers beyond the light of the Astronomican, armed with a Warrant of Trade.',
  units: applyAbilities([rt_lord_captain, rt_voidmaster, rt_navigator_scion, rt_voidsman]),
};

export const faction_the_inquisition: Faction = {
  id: 'the_inquisition',
  name: 'The Inquisition',
  keywords: [],
  description: 'The secret police of the Imperium, hunting heresy in all its forms.',
  units: applyAbilities([inq_inquisitor, inq_interrogator, inq_mystic, inq_acolyte, inq_jokaero, inq_daemonhost]),
};

export const faction_grey_knights: Faction = {
  id: 'grey_knights',
  name: 'Grey Knights',
  keywords: [],
  description: 'Daemon-hunting Space Marines of the Grey Knights Chapter. Fight against the supernatural.',
  units: applyAbilities([gk_captain, gk_apothecary, gk_chaplain, gk_librarian, gk_scout_marine, gk_space_marine, gk_terminator, gk_dreadnought]),
};

export const faction_adeptus_arbites: Faction = {
  id: 'adeptus_arbites',
  name: 'Adeptus Arbites',
  keywords: [],
  description: 'The Adeptus Arbites Ã¢â‚¬â€ Imperial law-enforcers maintaining order across the Imperium.',
  units: applyAbilities([arb_gang_leader, arb_gang_champion, arb_juve, arb_ganger, arb_cyber_mastiff, arb_sanctioner_automata]),
};

export const faction_heretic_astartes: Faction = {
  id: 'heretic_astartes',
  name: 'Heretic Astartes',
  keywords: [],
  description: 'Traitor Space Marines and their cultist followers. Choose a Warband Variant (Legion) as a subfaction.',
  units: applyAbilities([
    ha_chaos_lord, ha_dark_apostle, ha_chaos_sorcerer, ha_warpsmith,
    ha_chaos_cultist, ha_chaos_space_marine, ha_possessed, ha_chaos_terminator, ha_helbrute,
    // Renegade Space Marines warband variant
    ha_renegade_apothecary,
    // Death Guard warband variant (shown only when death_guard subfaction is selected)
    ha_poxwalker, ha_foetid_blight_drone,
    // Emperor's Children warband variant
    ha_lord_kakophonist,
    // Thousand Sons warband variant
    ha_exalted_sorcerer, ha_tzaangor_shaman, ha_tzaangor, ts_sekhetar_robot,
    // World Eaters warband variant
    ha_master_of_executions, ha_slaughterbound,
  ]),
};

export const faction_death_guard: Faction = {
  id: 'death_guard',
  name: 'Death Guard',
  keywords: [],
  description: "Servants of Nurgle who spread plague and pestilence. Patron must be Nurgle (Shared Patron).",
  units: applyAbilities([dg_chaos_lord, dg_chaos_sorcerer, dg_plague_marine, dg_plague_terminator, dg_helbrute, dg_chaos_cultist, dg_poxwalker, dg_foetid_blight_drone]),
};

export const faction_emperors_children: Faction = {
  id: 'emperors_children',
  name: "Emperor's Children",
  keywords: [],
  description: "Disciples of Slaanesh who seek sensation and excess above all else. Patron must be Slaanesh (Shared Patron).",
  units: applyAbilities([ec_chaos_lord, ec_dark_apostle, ec_chaos_sorcerer, ec_noise_marine, ec_possessed, ec_chaos_terminator, ec_helbrute, ec_chaos_cultist, ec_lord_kakophonist]),
};

export const faction_thousand_sons: Faction = {
  id: 'thousand_sons',
  name: 'Thousand Sons',
  keywords: [],
  description: "Sorcerers of Tzeentch and their Rubric Marine legions. Patron must be Tzeentch (Shared Patron).",
  units: applyAbilities([ts_exalted_sorcerer, ts_chaos_sorcerer, ts_tzaangor_shaman, ts_tzeentch_cultist, ts_tzaangor, ts_rubric_marine, ts_scarab_occult_terminator, ts_sekhetar_robot, ts_helbrute]),
};

export const faction_world_eaters: Faction = {
  id: 'world_eaters',
  name: 'World Eaters',
  keywords: [],
  description: "Khorne's berserkers who know only slaughter, harvesting skulls for the Blood God. Patron must be Khorne (Shared Patron).",
  units: applyAbilities([we_chaos_lord, we_dark_apostle, we_berzerker, we_jakhal, we_eightbound, we_chaos_terminator, we_helbrute, we_master_of_executions, we_slaughterbound]),
};

export const faction_chaos_cult: Faction = {
  id: 'chaos_cult',
  name: 'Chaos Cult',
  keywords: [],
  description: 'Fanatical worshippers of the Chaos Gods.',
  units: applyAbilities([cc_cult_demagogue, cc_heretic_witch, cc_chaos_disciple, cc_daemon_prince, cc_cult_rabble, cc_chaos_devotee, cc_chaos_ogryn, cc_chaos_spawn]),
};

export const faction_chaos_daemons: Faction = {
  id: 'chaos_daemons',
  name: 'Chaos Daemons',
  keywords: [],
  description: 'Manifestations of the Ruinous Powers from the immaterium.',
  units: applyAbilities([cd_daemon_prince, cd_chaos_furie, cd_bloodmaster, cd_skullmaster, cd_bloodletter, cd_flesh_hound, cd_infernal_enrapturess, cd_tranceweaver, cd_daemonette, cd_seeker, cd_contorted_epitome, cd_poxbringer, cd_spoilpox_scrivener, cd_plaguebearer, cd_nurgling_swarm, cd_plague_drone_rider, cd_changecaster, cd_flamer, cd_blue_horror, cd_pink_horror, cd_screamer]),
};

export const faction_the_vermintide: Faction = {
  id: 'the_vermintide',
  name: 'The Vermintide',
  keywords: [],
  description: 'Scheming Skaven ratmen surging from the tunnels beneath the trenches.',
  units: applyAbilities([ver_clawlord, ver_deathmaster, ver_warlock, ver_skavenslave, ver_clanrat, ver_stormvermin, ver_weapons_team, ver_rat_ogryn, ver_doom_flayer]),
};

export const faction_orks: Faction = {
  id: 'orks',
  name: 'Orks',
  keywords: [],
  description: 'The savage Greenskin tide, living for warfare.',
  units: applyAbilities([or_warboss, or_big_mek, or_weirdboy, or_gretchin, or_boy, or_nob, or_squig, or_deff_dread, or_squighog_boy]),
};

export const faction_drukhari: Faction = {
  id: 'drukhari',
  name: 'Drukhari',
  keywords: [],
  description: 'The Dark Eldar raiders of Commorragh.',
  units: applyAbilities([dr_archon, dr_haemonculus, dr_succubus, dr_kabalite_warrior, dr_incubus, dr_wrack, dr_wych, dr_reaver, dr_cronos, dr_talos, dr_clawed_fiend, dr_khymera, dr_razorwing_flock]),
};

export const faction_tyranids: Faction = {
  id: 'tyranids',
  name: 'Tyranids',
  keywords: [],
  description: 'The Tyranid swarm, a galaxy-devouring force of pure biological horror.',
  units: applyAbilities([ty_hive_tyrant, ty_lictor, ty_tyrant_guard, ty_gaunt_barbgaunt, ty_gaunt_gargoyle, ty_gaunt_hormagaunt, ty_gaunt_neurogaunt, ty_gaunt_termagant, ty_tyranid_warrior, ty_ravener, ty_ripper_swarm, ty_zoanthrope, ty_spore_mine]),
};

export const faction_genestealer_cults: Faction = {
  id: 'genestealer_cults',
  name: 'Genestealer Cults',
  keywords: [],
  description: 'The hidden fifth column of the Tyranid advance.',
  units: applyAbilities([gc_primus, gc_patriarch, gc_clamavus, gc_magus, gc_nexos, gc_neophyte, gc_acolyte, gc_genestealer_troop, gc_aberrant, gc_abominant]),
};

export const faction_harlequins: Faction = {
  id: 'harlequins',
  name: 'Harlequins',
  keywords: [],
  description: 'The mercurial warriors of the Laughing God.',
  units: applyAbilities([hq_troupe_master, hq_death_jester, hq_shadowseer, hq_solitaire, hq_mime, hq_player, hq_skyweaver]),
};

export const faction_leagues_of_votann: Faction = {
  id: 'leagues_of_votann',
  name: 'Leagues of Votann',
  keywords: [],
  description: 'The Kin of the Leagues of Votann, stocky industrious warriors.',
  units: applyAbilities([lv_kahl, lv_brokhyr_iron_master, lv_grimnyr, lv_hearthkyn, lv_cthonian_beserk, lv_einhyr_hearthguard, lv_brokhyr_thunderkyn, lv_ironkin_steeljack, lv_hernkyn_pioneer]),
};

export const faction_slanni: Faction = {
  id: 'slanni',
  name: 'Slanni',
  keywords: [],
  description: 'Cold-blooded warriors of the Old Ones\' ancient plan.',
  units: applyAbilities([sl_mage_chief, sl_oldblood, sl_starpriest, sl_skirmisher, sl_brave, sl_battle_mage, sl_brute, sl_amphi_walker]),
};

export const faction_necrons: Faction = {
  id: 'necrons',
  name: 'Necrons',
  keywords: [],
  description: 'The undying machine warriors of the Necrons, returning from aeons of slumber.',
  units: applyAbilities([nec_necron_lord, nec_cryptek, nec_royal_warden, nec_warrior, nec_immortal, nec_scarab_swarm, nec_tomb_blade, nec_lokhust_lord, nec_skorpekh_lord, nec_hexmark_destroyer, nec_lokhust_destroyer, nec_ophydian_destroyer, nec_skorpekh_destroyer, nec_canoptek_spyder, nec_apprentek, nec_macrocyte_warrior, nec_flayed_one, nec_flayer_king]),
};

export const faction_aeldari: Faction = {
  id: 'aeldari',
  name: 'Aeldari',
  keywords: [],
  description: 'The ancient Craftworld Eldar, fighting to preserve their dying race.',
  units: applyAbilities([ael_autarch, ael_seer, ael_warlock, ael_guardian, ael_aspect_warrior, ael_windrider, ael_wraith, ael_dragonlord, ael_dragon_knight, ael_wraithseer, ael_wraithlord]),
};

export const faction_t_au_empire: Faction = {
  id: 't_au_empire',
  name: 'T\'au Empire',
  keywords: [],
  description: 'The T\'au and their auxiliaries, united under the Greater Good.',
  units: applyAbilities([tau_ethereal, tau_commander, tau_cadre_fireblade, tau_kroot_shaper, tau_fire_warrior, tau_drone, tau_kroot_carnivore, tau_stealth_battlesuit, tau_crisis_battlesuit, tau_broadside_battlesuit, tau_kill_broker, tau_krootox_rider]),
};

export const faction_necromunda_gang: Faction = {
  id: 'necromunda_gang',
  name: 'Necromunda Gang',
  keywords: [],
  description: 'The underhive gangs of Necromunda, fighting for territory and survival.',
  units: applyAbilities([ng_gang_leader, ng_gang_champion, ng_juve, ng_ganger, ng_cyber_mastiff, ng_sanctioner_automata]),
};

export const faction_pirate_crew: Faction = {
  id: 'pirate_crew',
  name: 'Pirate Crew',
  keywords: [],
  description: 'Voidborn pirates raiding the spaceways and port-worlds.',
  units: applyAbilities([pc_pirate_captain, pc_first_mate, pc_pirate_champion, pc_pirate, pc_pirate_veteran]),
};


export const allFactions: Faction[] = [
  faction_adeptus_astartes,
  faction_astra_militarum,
  faction_adeptus_custodes,
  faction_adepta_sororitas,
  faction_adeptus_mechanicus,
  faction_adeptus_ministorum,
  faction_officio_assassinorum,
  faction_rogue_trader,
  faction_the_inquisition,
  faction_grey_knights,
  faction_adeptus_arbites,
  faction_heretic_astartes,
  faction_death_guard,
  faction_emperors_children,
  faction_thousand_sons,
  faction_world_eaters,
  faction_chaos_cult,
  faction_chaos_daemons,
  faction_the_vermintide,
  faction_orks,
  faction_drukhari,
  faction_tyranids,
  faction_genestealer_cults,
  faction_harlequins,
  faction_leagues_of_votann,
  faction_slanni,
  faction_necrons,
  faction_aeldari,
  faction_t_au_empire,
  faction_necromunda_gang,
  faction_pirate_crew,
];

export function getFactionById(id: string): Faction | undefined {
  return allFactions.find(f => f.id === id);
}

export function getUnitsByFaction(factionId: string): UnitOption[] {
  const faction = getFactionById(factionId);
  return faction ? faction.units : [];
}
