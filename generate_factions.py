"""Generates src/data/factions_complete.ts from authoritative game instruction data."""
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "src", "data", "factions_complete.ts")

LINES = []
def w(*args):
    LINES.append(" ".join(str(a) for a in args))

def esc(s):
    """Escape single quotes for use inside a JS single-quoted string literal."""
    return s.replace("'", "\\'")

def unit(uid, name, cost, minc, maxc, mv, ranged, melee, armour, keywords, faction, utype, desc):
    kw = ", ".join(f"'{esc(k)}'" for k in keywords)
    w(f"export const {uid}: UnitOption = {{")
    w(f"  id: '{uid}', name: '{esc(name)}', baseCost: {cost}, minCount: {minc}, maxCount: {maxc},")
    w(f"  stats: {{ movement: {mv}, rangedSkill: {ranged}, meleeSkill: {melee}, armourSave: {armour}, toughness: 'NORMAL' }},")
    w(f"  keywords: [{kw}],")
    w(f"  faction: '{esc(faction)}', unitType: '{utype}',")
    w(f"  description: '{esc(desc)}',")
    w(f"  defaultWargear: [], availableWargear: [],")
    w(f"}};")
    return uid

def section(title):
    w("")
    w(f"// {'='*74}")
    w(f"// {title}")
    w(f"// {'='*74}")

# ── Header ────────────────────────────────────────────────────────────────────
w("import { Faction, UnitOption } from '../types/index.js';")
w("")

# ==============================================================================
# IMPERIAL FACTIONS
# ==============================================================================

# ── Adeptus Astartes ──────────────────────────────────────────────────────────
section("ADEPTUS ASTARTES")
AA = "adeptus_astartes"
unit("aa_captain",       "Captain",      80,  1, 1,  6,  3,  3, -2, ["ADEPTUS ASTARTES","ELITE","LEADER","TOUGH"],             AA, "elite", "Mandatory leader of the Space Marine warband.")
unit("aa_apothecary",    "Apothecary",   80,  0, 1,  6,  2,  2, -2, ["ADEPTUS ASTARTES","ELITE"],                              AA, "elite", "Healer and gene-seed harvester.")
unit("aa_chaplain",      "Chaplain",     80,  0, 1,  6,  2,  2, -2, ["ADEPTUS ASTARTES","ELITE","ORATOR"],                     AA, "elite", "Spiritual leader of the Chapter.")
unit("aa_librarian",     "Librarian",    80,  0, 1,  6,  2,  2, -2, ["ADEPTUS ASTARTES","ELITE","PSYKER 2"],                   AA, "elite", "Psyker warrior of the Chapter.")
unit("aa_scout_marine",  "Scout Marine", 40,  0,99,  6,  1,  0,  0, ["ADEPTUS ASTARTES","STEALTH"],                            AA, "troop", "Space Marine neophyte recon specialist.")
unit("aa_space_marine",  "Space Marine", 50,  0,99,  6,  2,  1, -2, ["ADEPTUS ASTARTES"],                                      AA, "troop", "Enhanced superhuman warrior in power armour.")
unit("aa_terminator",    "Terminator",  100,  0, 2,  5,  2,  2, -3, ["ADEPTUS ASTARTES","DEEP STRIKE","LARGE","STRONG"],       AA, "troop", "Elite warrior in ancient Terminator armour.")
unit("aa_dreadnought",   "Dreadnought", 180,  0, 1,  6,  2,  2, -3, ["ADEPTUS ASTARTES","FEAR","LARGE","NO PROMOTION","STRONG","TOUGH","VEHICLE"], AA, "troop", "Ancient warrior entombed in a walking combat platform.")

# ── Astra Militarum ───────────────────────────────────────────────────────────
section("ASTRA MILITARUM")
AM = "astra_militarum"
unit("am_castellan",          "Castellan",           70,  1, 1,  6,  2,  2,  0, ["ASTRA MILITARUM","ELITE","LEADER","TOUGH"],                AM, "elite", "Mandatory officer commanding the Imperial Guard warband.")
unit("am_commissar",          "Commissar",            40,  0, 2,  6,  1,  1,  0, ["ASTRA MILITARUM","ELITE","FEAR","NEGATE FEAR"],             AM, "elite", "Political officer ensuring loyalty and discipline.")
unit("am_primaris_psyker",    "Primaris Psyker",      40,  0, 1,  6,  1,  0,  0, ["ASTRA MILITARUM","ELITE","PSYKER 1"],                      AM, "elite", "Sanctioned psychic warrior.")
unit("am_conscript",          "Conscript",            15,  0,99,  6, -1, -1,  0, ["ASTRA MILITARUM"],                                         AM, "troop", "Hastily recruited soldier with minimal training.")
unit("am_guardsman",          "Guardsman",            25,  0,99,  6,  0,  0,  0, ["ASTRA MILITARUM"],                                         AM, "troop", "Disciplined soldier of the Imperial Guard.")
unit("am_veteran_guardsman",  "Veteran Guardsman",    40,  0, 5,  6,  1,  1,  0, ["ASTRA MILITARUM"],                                         AM, "troop", "Battle-hardened soldier with years of combat experience.")
unit("am_ratling_marksman",   "Ratling Marksman",     50,  0, 3,  5,  1, -1,  0, ["ASTRA MILITARUM","INFILTRATOR","SKIRMISHER","STEALTH"],    AM, "troop", "Small abhuman with exceptional marksmanship.")
unit("am_heavy_weapons_squad","Heavy Weapons Squad",  50,  0, 3,  5,  1,  0,  0, ["ASTRA MILITARUM","LARGE"],                                 AM, "troop", "Two-person crew manning a heavy weapons platform.")
unit("am_ogryn",              "Ogryn",                85,  0, 2,  6,  0,  1,  0, ["ASTRA MILITARUM","LARGE","NEGATE FEAR","STRONG","TOUGH"],  AM, "troop", "Massive abhuman warrior with incredible strength.")

# ── Adeptus Custodes ──────────────────────────────────────────────────────────
section("ADEPTUS CUSTODES")
AC = "adeptus_custodes"
unit("ac_shield_captain",         "Shield-Captain",        125, 0, 1,  6,  3,  3, -3, ["CUSTODES","ELITE","LARGE","LEADER","STRONG","TOUGH"],                              AC, "elite", "Golden warrior leading the Custodes warband.")
unit("ac_blade_champion",         "Blade Champion",          85, 0, 1,  6,  0,  3, -3, ["CUSTODES","ELITE","LARGE"],                                                        AC, "elite", "Master swordsman of the Custodes.")
unit("ac_knight_centura",         "Knight-Centura",          75, 0, 1,  6,  2,  2, -3, ["CUSTODES","ELITE"],                                                                AC, "elite", "Anathema Psykana leader and witch-hunter.")
unit("ac_anathema_psykana",       "Anathema Psykana",        40, 0,99,  6,  1,  1,  0, ["CUSTODES","NEGATE FEAR"],                                                          AC, "troop", "Silent Sister witch-hunter serving alongside the Custodes.")
unit("ac_custodian_guard",        "Custodian Guard",         85, 0, 5,  6,  2,  2, -3, ["CUSTODES","LARGE","STRONG"],                                                       AC, "troop", "Elite golden warrior of the Emperor's bodyguard.")
unit("ac_aquilon_terminator",     "Aquilon Terminator",     160, 0, 1,  6,  2,  3, -3, ["CUSTODES","DEEP STRIKE","LARGE","STRONG","VEHICLE"],                               AC, "troop", "Terminator-armoured Custodian warrior.")
unit("ac_contemptor_dreadnought", "Contemptor Dreadnought", 210, 0, 1,  6,  3,  3, -3, ["CUSTODES","FEAR","LARGE","NO PROMOTION","STRONG","TOUGH","VEHICLE"],               AC, "troop", "Ancient Custodes warrior interred in a Dreadnought chassis.")

# ── Adepta Sororitas ──────────────────────────────────────────────────────────
section("ADEPTA SORORITAS")
AS = "adepta_sororitas"
unit("as_canoness",        "Canoness",        75,  1, 1,  6,  2,  2,  0, ["ADEPTUS SORORITAS","ELITE","LEADER","TOUGH"],        AS, "elite", "Mandatory commander of the Sisters of Battle.")
unit("as_dogmata",         "Dogmata",         70,  0, 1,  6,  1,  1,  0, ["ADEPTUS SORORITAS","ELITE","NEGATE FEAR","ORATOR"],  AS, "elite", "Bearer of the holy standard, enforcer of faith.")
unit("as_palatine",        "Palatine",        60,  0, 1,  6,  2,  2,  0, ["ADEPTUS SORORITAS","ELITE"],                        AS, "elite", "Veteran commander and lieutenant of the Canoness.")
unit("as_novitiate",       "Novitiate",       20,  0,99,  6,  0,  0,  0, ["ADEPTUS SORORITAS"],                                AS, "troop", "Trainee Sister of Battle.")
unit("as_battle_sister",   "Battle Sister",   75,  0,99,  6,  1,  1, -2, ["ADEPTUS SORORITAS"],                                AS, "troop", "Faithful warrior-nun clad in power armour. (35cr base + 40cr armour)")
unit("as_repentia",        "Repentia",        60,  0, 4,  7,  0,  2,  0, ["ADEPTUS SORORITAS","FEAR","STRONG"],                AS, "troop", "Penitent warriors seeking absolution through glorious death.")
unit("as_paragon_warsuit", "Paragon Warsuit", 110, 0, 2,  6,  2,  2, -2, ["ADEPTUS SORORITAS","LARGE","STRONG","VEHICLE"],     AS, "troop", "Sister piloting a powerful servo-suit.")
unit("as_penitent_engine", "Penitent Engine", 150, 0, 1,  6,  1,  1, -2, ["ADEPTUS SORORITAS","FEAR","LARGE","NO PROMOTION","STRONG","TOUGH","VEHICLE"], AS, "troop", "Penitent strapped to a bipedal combat walker.")

# ── Adeptus Mechanicus ────────────────────────────────────────────────────────
section("ADEPTUS MECHANICUS")
AMEC = "adeptus_mechanicus"
unit("amec_dominus",          "Dominus",          65,  1, 1,  6,  2,  2,  0, ["CONTROLLER","ELITE","LARGE","LEADER","MECHANICUS","TOUGH"],                               AMEC, "elite", "Mandatory Magos Dominus leading the war congregation.")
unit("amec_skitarii_marshal", "Skitarii Marshal", 45,  0, 1,  6,  1,  1,  0, ["ELITE","MECHANICUS"],                                                                     AMEC, "elite", "Veteran commander of Skitarii cohorts.")
unit("amec_tech_priest",      "Tech-Priest",      60,  0, 2,  6,  1,  1,  0, ["CONTROLLER","ELITE","MECHANICUS"],                                                        AMEC, "elite", "Servant of the Omnissiah.")
unit("amec_skitarii",         "Skitarii",         40,  0,99,  6,  1,  0,  0, ["MECHANICUS"],                                                                             AMEC, "troop", "Cybernetically enhanced warrior of Mars.")
unit("amec_servitor",         "Servitor",         60,  0, 4,  5,  0,  0, -1, ["ARTIFICIAL","MECHANICUS","NEGATE FEAR","NO PROMOTION","STRONG"],                          AMEC, "troop", "Lobotomised human-machine hybrid worker.")
unit("amec_electro_priest",   "Electro-Priest",   55,  0, 3,  6,  1,  1,  0, ["MECHANICUS"],                                                                             AMEC, "troop", "Fanatical devotee channelling holy voltaic power.")
unit("amec_sicarian",         "Sicarian",         65,  0, 3,  8,  1,  1,  0, ["MECHANICUS","STEALTH"],                                                                   AMEC, "troop", "Agile infiltrator with augmented combat reflexes.")
unit("amec_kataphron",        "Kataphron",        90,  0, 1,  5,  1,  0, -2, ["ARTIFICIAL","LARGE","MECHANICUS","NEGATE SHRAPNEL","NO PROMOTION","STRONG","TOUGH"],      AMEC, "troop", "Heavy Kataphron Breacher or Destroyer (0-2 at 1200cr+).")
unit("amec_kastelan_robot",   "Kastelan Robot",  190,  0, 1,  6,  1,  2, -3, ["ARTIFICIAL","FEAR","LARGE","MECHANICUS","NEGATE GAS","NEGATE SHRAPNEL","NO PROMOTION","STRONG","TOUGH"], AMEC, "troop", "Ancient automaton of immense destructive power.")

# ── Adeptus Ministorum ────────────────────────────────────────────────────────
section("ADEPTUS MINISTORUM")
AMIN = "adeptus_ministorum"
unit("amin_confessor",          "Confessor",          85,  1, 1,  6,  2,  2,  0, ["ECCLESIARCHY","ELITE","LEADER","NEGATE FEAR","ORATOR","TOUGH"], AMIN, "elite", "Mandatory fire-brand leader. (70cr + 15cr rosarius)")
unit("amin_missionary",         "Missionary",         50,  0, 2,  6,  1,  1,  0, ["ECCLESIARCHY","ELITE","NEGATE FEAR","ORATOR"],                 AMIN, "elite", "Travelling preacher of the Imperial Creed.")
unit("amin_drill_abbot",        "Drill Abbot",        50,  0, 1,  6,  0,  1,  0, ["ECCLESIARCHY","ELITE","NEGATE FEAR","STRONG"],                 AMIN, "elite", "Warrior-monk trainer, melee specialist.")
unit("amin_preacher",           "Preacher",           30,  0,99,  6,  0,  0,  0, ["ECCLESIARCHY"],                                               AMIN, "troop", "Faithful foot soldier of the Ministorum.")
unit("amin_crusader",           "Crusader",           45,  0, 4,  6,  0,  1,  0, ["ECCLESIARCHY"],                                               AMIN, "troop", "Armoured holy warrior sworn to protect the faithful.")
unit("amin_death_cult_assassin","Death Cult Assassin",65,  0, 3,  8,  1,  1,  0, ["DEATH CULT","ECCLESIARCHY","INFILTRATOR","STEALTH"],           AMIN, "troop", "Deadly murderer consecrated to the Emperor.")
unit("amin_battle_cherub",      "Battle Cherub",      25,  0, 2,  6,  0,  0,  0, ["ARTIFICIAL","ECCLESIARCHY","FLYING","NO PROMOTION"],           AMIN, "troop", "Servo-cherub support unit.")
unit("amin_miraculist",         "Miraculist",        115,  0, 1,  6,  3,  0,  0, ["ECCLESIARCHY","NO PROMOTION","ORATOR"],                       AMIN, "troop", "Living saint suffused with holy power.")

# ── Officio Assassinorum ──────────────────────────────────────────────────────
section("OFFICIO ASSASSINORUM")
OA = "officio_assassinorum"
unit("oa_adamus",     "Adamus Assassin",   120, 0, 1,  8,  2,  2,  0, ["ASSASSINORUM","ELITE","INFILTRATOR","LEADER","STEALTH","TOUGH"],           OA, "elite", "Adamus Temple assassin.")
unit("oa_callidus",   "Callidus Assassin", 120, 0, 1,  8,  2,  2,  0, ["ASSASSINORUM","DEEP STRIKE","LEADER","STEALTH","TOUGH"],                   OA, "elite", "Callidus Temple shape-changing assassin.")
unit("oa_culexus",    "Culexus Assassin",  150, 0, 1,  8,  2,  2,  0, ["ASSASSINORUM","ELITE","FEAR","DEEP STRIKE","LEADER","STEALTH","TOUGH"],    OA, "elite", "Culexus Temple soul-drinker, anathema to psykers.")
unit("oa_eversor",    "Eversor Assassin",  120, 0, 1,  8,  2,  2,  0, ["ASSASSINORUM","ELITE","FEAR","INFILTRATOR","LEADER","STEALTH","TOUGH"],    OA, "elite", "Eversor Temple berserker assassin.")
unit("oa_vanus",      "Vanus Infocyte",    120, 0, 1,  8,  2,  2,  0, ["ASSASSINORUM","ELITE","INFILTRATOR","LEADER","STEALTH","TOUGH"],           OA, "elite", "Vanus Temple information warfare specialist.")
unit("oa_venenum",    "Venenum Assassin",  120, 0, 1,  8,  2,  2,  0, ["ASSASSINORUM","INFILTRATOR","LEADER","NEGATE GAS","STEALTH","TOUGH"],      OA, "elite", "Venenum Temple poisoner.")
unit("oa_vindicare",  "Vindicare Assassin",120, 0, 1,  8,  2,  2,  0, ["ASSASSINORUM","ELITE","INFILTRATOR","LEADER","STEALTH","TOUGH"],           OA, "elite", "Vindicare Temple sniper.")
unit("oa_aspirant",   "Assassin Aspirant", 50,  0,99,  7,  1,  1,  0, ["ASSASSINORUM","STEALTH"],                                                 OA, "troop", "Trainee operative of the Assassinorum.")

# ── Rogue Trader ──────────────────────────────────────────────────────────────
section("ROGUE TRADER")
RT = "rogue_trader"
unit("rt_lord_captain",    "Lord Captain",    80,  1, 1,  6,  2,  2,  0, ["ELITE","LEADER","ROGUE TRADER","TOUGH"],    RT, "elite", "Mandatory Warrant-bearer commanding the expedition.")
unit("rt_voidmaster",      "Voidmaster",      55,  0, 1,  6,  1,  1,  0, ["ELITE","ROGUE TRADER","STRONG"],           RT, "elite", "Veteran ship officer and combat specialist.")
unit("rt_navigator_scion", "Navigator Scion", 60,  0, 1,  6,  1,  0,  0, ["PSYKER 1","ROGUE TRADER"],                 RT, "elite", "Navigator with the ability to peer into the warp. (+ weapon cost)")
unit("rt_voidsman",        "Voidsman",        30,  0,99,  6,  0,  0,  0, ["ROGUE TRADER"],                            RT, "troop", "Voidborn crew member armed for surface operations.")

# ── The Inquisition ───────────────────────────────────────────────────────────
section("THE INQUISITION")
INQ = "the_inquisition"
unit("inq_inquisitor",    "Inquisitor",   70,  1, 1,  6,  2,  2,  0, ["ELITE","INQUISITION","LEADER","NEGATE FEAR","TOUGH"], INQ, "elite", "Mandatory Inquisitor. (55cr + 15cr rosarius)")
unit("inq_interrogator",  "Interrogator", 50,  0, 1,  6,  1,  1,  0, ["ELITE","INQUISITION"],                                INQ, "elite", "Trusted acolyte and second-in-command.")
unit("inq_mystic",        "Mystic",       50,  0, 1,  6,  1,  1,  0, ["ELITE","INQUISITION","PSYKER 1"],                    INQ, "elite", "Sanctioned psyker in service to the Inquisition. (+ weapon + powers)")
unit("inq_acolyte",       "Acolyte",      45,  0,99,  6,  1,  1,  0, ["INQUISITION"],                                       INQ, "troop", "Trusted operative of the Inquisition.")
unit("inq_jokaero",       "Jokaero Weaponsmith",55, 0,2, 6,  1,  1,  0, ["INQUISITION","STRONG"],                            INQ, "troop", "Alien weapons-smith of mysterious origin.")
unit("inq_daemonhost",    "Daemonhost",  135,  0, 1,  6,  1,  2,  0, ["DAEMON","FLYING","INQUISITION","NO PROMOTION","PSYKER","TOUGH"], INQ, "troop", "Ordo Malleus only. Bound daemon in a mortal shell.")

# ── Grey Knights (Adeptus Astartes warband variant) ───────────────────────────
section("GREY KNIGHTS (Adeptus Astartes variant)")
GK = "grey_knights"
unit("gk_captain",      "Captain",      80,  1, 1,  6,  3,  3, -2, ["ADEPTUS ASTARTES","ELITE","LEADER","TOUGH"],                                             GK, "elite", "Mandatory leader of the Grey Knights warband.")
unit("gk_apothecary",   "Apothecary",   80,  0, 1,  6,  2,  2, -2, ["ADEPTUS ASTARTES","ELITE"],                                                              GK, "elite", "Healer and gene-seed harvester.")
unit("gk_chaplain",     "Chaplain",     80,  0, 1,  6,  2,  2, -2, ["ADEPTUS ASTARTES","ELITE","ORATOR"],                                                     GK, "elite", "Spiritual leader of the Chapter.")
unit("gk_librarian",    "Librarian",    80,  0, 1,  6,  2,  2, -2, ["ADEPTUS ASTARTES","ELITE","PSYKER 2"],                                                   GK, "elite", "Psyker warrior of the Chapter.")
unit("gk_scout_marine", "Scout Marine", 40,  0,99,  6,  1,  0,  0, ["ADEPTUS ASTARTES","STEALTH"],                                                            GK, "troop", "Grey Knight neophyte recon specialist.")
unit("gk_space_marine", "Space Marine", 50,  0,99,  6,  2,  1, -2, ["ADEPTUS ASTARTES"],                                                                      GK, "troop", "Enhanced Grey Knight warrior.")
unit("gk_terminator",   "Terminator",  100,  0, 2,  5,  2,  2, -3, ["ADEPTUS ASTARTES","DEEP STRIKE","LARGE","STRONG"],                                      GK, "troop", "Elite warrior in ancient Terminator armour.")
unit("gk_dreadnought",  "Dreadnought", 180,  0, 1,  6,  2,  2, -3, ["ADEPTUS ASTARTES","FEAR","LARGE","NO PROMOTION","STRONG","TOUGH","VEHICLE"],             GK, "troop", "Ancient warrior entombed in a walking combat platform.")

# ── Adeptus Arbites (Necromunda – Palanite Enforcers variant) ─────────────────
section("ADEPTUS ARBITES (Necromunda Palanite Enforcers variant)")
ARB = "adeptus_arbites"
unit("arb_gang_leader",          "Gang Leader",           60,  1, 1,  6,  2,  2,  0, ["ELITE","GANGER","LEADER","TOUGH"],                                           ARB, "elite", "Mandatory Enforcer Sergeant leading the warband.")
unit("arb_gang_champion",        "Gang Champion",         50,  0, 2,  6,  1,  1,  0, ["ELITE","GANGER"],                                                            ARB, "elite", "Veteran Enforcer officer.")
unit("arb_juve",                 "Juve",                  15,  0,99,  6, -1, -1,  0, ["GANGER","NO PROMOTION"],                                                     ARB, "troop", "Rookie Enforcer recruit.")
unit("arb_ganger",               "Ganger",                35,  0,99,  6,  0,  0,  0, ["GANGER"],                                                                    ARB, "troop", "Standard Enforcer trooper.")
unit("arb_cyber_mastiff",        "Hardcase Cyber Mastiff",95,  0, 2,  6,  0,  1, -2, ["ARTIFICIAL","NO PROMOTION"],                                                 ARB, "troop", "Cybernetic attack dog.")
unit("arb_sanctioner_automata",  "Sanctioner Automata",  135,  0, 2,  6,  1,  1, -2, ["ARTIFICIAL","LARGE","NEGATE GAS","NEGATE SHRAPNEL","NO PROMOTION","REGENERATE 1","STRONG","TOUGH"], ARB, "troop", "Heavy combat automaton.")

# ==============================================================================
# CHAOS FACTIONS
# ==============================================================================

# ── Heretic Astartes ──────────────────────────────────────────────────────────
section("HERETIC ASTARTES")
HA = "heretic_astartes"
unit("ha_chaos_lord",        "Chaos Lord",       75,  1, 1,  6,  3,  3, -2, ["ELITE","HERETIC ASTARTES","LARGE","LEADER","TOUGH"],                              HA, "elite", "Mandatory Chaos Space Marine warlord. (+ armour)")
unit("ha_dark_apostle",      "Dark Apostle",     70,  0, 1,  6,  2,  2, -2, ["ELITE","HERETIC ASTARTES","LARGE"],                                               HA, "elite", "Chaos preacher bearing the dark word. (+ armour)")
unit("ha_chaos_sorcerer",    "Chaos Sorcerer",   75,  0, 1,  6,  2,  2, -2, ["ELITE","HERETIC ASTARTES","LARGE","PSYKER 2"],                                    HA, "elite", "Warp-wielding sorcerer of Chaos. (+ armour + powers)")
unit("ha_warpsmith",         "Warpsmith",        70,  0, 1,  6,  2,  2, -2, ["ELITE","HERETIC ASTARTES","LARGE"],                                               HA, "elite", "Dark Mechanicus artificer. (+ armour)")
unit("ha_chaos_cultist",     "Chaos Cultist",    25,  0,99,  6, -1, -1,  0, ["FOLLOWER","HERETIC ASTARTES"],                                                    HA, "troop", "Fanatical cultist devoted to the Dark Gods.")
unit("ha_chaos_space_marine","Chaos Space Marine",95,  0,99,  6,  2,  2, -2, ["HERETIC ASTARTES"],                                                              HA, "troop", "Traitor Space Marine. (55cr + 40cr armour)")
unit("ha_possessed",         "Possessed",        95,  0, 3,  6,  0,  2, -2, ["DAEMON","HERETIC ASTARTES","LARGE","LIMITED POTENTIAL"],                         HA, "troop", "Daemon-possessed Chaos Marine. (55cr + 40cr armour)")
unit("ha_chaos_terminator",  "Chaos Terminator", 145, 0, 2,  6,  2,  3, -3, ["DEEP STRIKE","HERETIC ASTARTES","LARGE","STRONG","VEHICLE"],                     HA, "troop", "Elite warrior in ancient Chaos Terminator armour. (75cr + 70cr armour; 0-3 at 1200cr+)")
unit("ha_helbrute",          "Helbrute",        165,  0, 1,  6,  2,  3, -3, ["FEAR","FOLLOWER","HERETIC ASTARTES","LARGE","NO PROMOTION","STRONG","TOUGH","VEHICLE"], HA, "troop", "Insane warrior entombed in a corrupted Dreadnought.")

# ── Chaos Cult ────────────────────────────────────────────────────────────────
section("CHAOS CULT")
CC = "chaos_cult"
unit("cc_cult_demagogue",  "Cult Demagogue",  75,  1, 1,  6,  2,  2,  0, ["CHAOS CULT","ELITE","LEADER","TOUGH"],       CC, "elite", "Mandatory charismatic leader of the Chaos Cult.")
unit("cc_heretic_witch",   "Heretic Witch",   50,  0, 1,  6,  1,  0,  0, ["CHAOS CULT","ELITE","PSYKER 1"],            CC, "elite", "Unsanctioned psyker twisted by chaos. (+ powers)")
unit("cc_chaos_disciple",  "Chaos Disciple",  60,  0, 2,  6,  1,  1,  0, ["ELITE","CHAOS CULT","STRONG"],              CC, "elite", "Veteran devotee of the dark powers.")
unit("cc_daemon_prince",   "Daemon Prince",  190,  0, 1,  8,  2,  2, -3, ["DAEMON","LARGE","LEADER","STRONG","TOUGH"], CC, "elite", "Campaign-only apotheosised champion of Chaos.")
unit("cc_cult_rabble",     "Cult Rabble",     20,  0,99,  6, -1, -1,  0, ["CHAOS CULT"],                               CC, "troop", "Desperate horde follower of the dark gods.")
unit("cc_chaos_devotee",   "Chaos Devotee",   30,  0,99,  6,  0,  0,  0, ["CHAOS CULT"],                               CC, "troop", "Dedicated worshipper of Chaos.")
unit("cc_chaos_ogryn",     "Chaos Ogryn",     85,  0, 2,  6,  0,  1,  0, ["CHAOS CULT","LARGE","LIMITED POTENTIAL","STRONG","TOUGH"], CC, "troop", "Massive mutated abhuman devoted to Chaos.")
unit("cc_chaos_spawn",     "Chaos Spawn",    125,  0, 2,  8,  0,  1, -2, ["DAEMON","FEAR","LARGE","NO PROMOTION","STRONG","TOUGH"],   CC, "troop", "Mindless chaos entity, reward and punishment in one.")

# ── Chaos Daemons ─────────────────────────────────────────────────────────────
section("CHAOS DAEMONS")
CD = "chaos_daemons"
unit("cd_daemon_prince",       "Daemon Prince",      210, 0, 1,  8,  2,  2, -3, ["DAEMON","ELITE","LARGE","LEADER","STRONG","TOUGH"],         CD, "elite", "Mighty ascended champion of the Chaos Gods.")
unit("cd_chaos_furie",         "Chaos Furie",         70,  0, 3, 10,  0,  1,  0, ["DAEMON","FLYING","UNDIVIDED"],                             CD, "troop", "Winged undivided lesser daemon.")
# Blood Legion – Khorne
unit("cd_bloodmaster",         "Bloodmaster",         70,  0, 1,  7,  0,  2,  0, ["DAEMON","ELITE","KHORNE"],                                  CD, "elite", "Herald of Khorne.")
unit("cd_skullmaster",         "Skullmaster",         90,  0, 1, 10,  1,  2, -1, ["DAEMON","ELITE","FLYING","KHORNE","VEHICLE"],               CD, "elite", "Herald of Khorne mounted on a Juggernaut.")
unit("cd_bloodletter",         "Bloodletter",         50,  0,99,  7,  0,  2,  0, ["DAEMON","KHORNE"],                                          CD, "troop", "Daemon foot soldier of Khorne.")
unit("cd_flesh_hound",         "Flesh Hound",        100,  0, 3,  8,  0,  1,  0, ["BEAST","DAEMON","KHORNE","LARGE","TOUGH"],                  CD, "troop", "Khornate hunting daemon.")
# Legion of Excess – Slaanesh
unit("cd_infernal_enrapturess","Infernal Enrapturess",115, 0, 1,  7,  1,  1,  0, ["DAEMON","ELITE","SLAANESH"],                               CD, "elite", "Herald of Slaanesh with an infernal instrument.")
unit("cd_tranceweaver",        "Tranceweaver",        70,  0, 1,  7,  1,  1,  0, ["DAEMON","ELITE","PSYKER 1","SLAANESH"],                     CD, "elite", "Psyker Herald of Slaanesh. (+ powers)")
unit("cd_daemonette",          "Daemonette",          60,  0,99,  8,  0,  1,  0, ["DAEMON","SLAANESH"],                                        CD, "troop", "Daemon foot soldier of Slaanesh.")
unit("cd_seeker",              "Seeker",              95,  0, 3, 10,  0,  1, -1, ["DAEMON","FLYING","SLAANESH","VEHICLE"],                      CD, "troop", "Daemonette mounted on a Steed of Slaanesh.")
unit("cd_contorted_epitome",   "Contorted Epitome",   85,  0, 1,  6,  1,  1,  0, ["DAEMON","LARGE","SLAANESH","TOUGH"],                        CD, "troop", "Slaanesh greater daemon construct.")
# Plague Legion – Nurgle
unit("cd_poxbringer",          "Poxbringer",          70,  0, 1,  5,  0,  1,  0, ["DAEMON","ELITE","NURGLE","PSYKER 1"],                       CD, "elite", "Psyker Herald of Nurgle. (+ powers)")
unit("cd_spoilpox_scrivener",  "Spoilpox Scrivener",  70,  0, 1,  5,  1,  1,  0, ["DAEMON","ELITE","NURGLE"],                                  CD, "elite", "Herald of Nurgle keeping the death tally.")
unit("cd_plaguebearer",        "Plaguebearer",        50,  0,99,  5,  0,  1,  0, ["DAEMON","NURGLE"],                                          CD, "troop", "Daemon foot soldier of Nurgle.")
unit("cd_nurgling_swarm",      "Nurgling Swarm",      55,  0, 3,  5,  0,  0,  0, ["DAEMON","LARGE","NO PROMOTION","NURGLE","SWARM","TOUGH"],    CD, "troop", "Writhing mass of tiny Nurgle daemons.")
unit("cd_plague_drone_rider",  "Plague Drone Rider",  110, 0, 1,  7,  0,  1,  0, ["DAEMON","FLYING","LARGE","NURGLE","TOUGH","VEHICLE"],        CD, "troop", "Plaguebearer mounted on a Rot Fly.")
# Scintillating Legion – Tzeentch
unit("cd_changecaster",        "Changecaster",        75,  0, 1,  6,  2,  0,  0, ["DAEMON","ELITE","PSYKER 2","TZEENTCH"],                     CD, "elite", "Psyker Herald of Tzeentch. (+ powers)")
unit("cd_flamer",              "Flamer",              120, 0,99,  6,  0,  0,  0, ["DAEMON","ELITE","FLYING","TZEENTCH"],                        CD, "elite", "Fire-spewing Tzeentch daemon.")
unit("cd_blue_horror",         "Blue Horror",         45,  0,99,  6,  0,  0,  0, ["DAEMON","TZEENTCH"],                                        CD, "troop", "Small splitting Tzeentch daemon.")
unit("cd_pink_horror",         "Pink Horror",        150,  0, 3,  6,  1,  0,  0, ["DAEMON","LARGE","PSYKER 1","SWARM","TZEENTCH","TOUGH"],      CD, "troop", "Dangerously cheerful Tzeentch daemon.")
unit("cd_screamer",            "Screamer",            70,  0, 3,  8,  0,  1, -1, ["DAEMON","FLYING","LARGE","TOUGH","TZEENTCH","VEHICLE"],       CD, "troop", "Disc-shaped flying Tzeentch daemon.")

# ==============================================================================
# XENOS FACTIONS
# ==============================================================================

# ── Orks ──────────────────────────────────────────────────────────────────────
section("ORKS")
OR = "orks"
unit("or_warboss",     "Warboss",    85,  1, 1,  6,  1,  3,  0, ["ELITE","LARGE","LEADER","ORK","STRONG","TOUGH"],           OR, "elite", "Mandatory biggest and meanest Ork.")
unit("or_big_mek",     "Big Mek",   70,  0, 1,  6,  0,  2,  0, ["ELITE","LARGE","ORK","STRONG"],                            OR, "elite", "Ork mekanic and inventor.")
unit("or_weirdboy",    "Weirdboy",  40,  0, 1,  6,  0,  0,  0, ["ELITE","ORK","PSYKER 0"],                                  OR, "elite", "Warp-touched Ork psyker. (35cr + 5cr staff)")
unit("or_gretchin",    "Gretchin",  25,  0,99,  6,  1, -1,  0, ["ORK","STEALTH"],                                           OR, "troop", "Small sneaky Greenskin. Max count = non-Gretchin non-Squig models.")
unit("or_boy",         "Boy",       35,  0,99,  6,  0,  1,  0, ["ORK"],                                                     OR, "troop", "Standard Ork warrior.")
unit("or_nob",         "Nob",       50,  0, 4,  6,  0,  2,  0, ["LARGE","ORK","STRONG"],                                    OR, "troop", "Big tough Ork veteran.")
unit("or_squig",       "Squig",     30,  0, 2,  6,  0,  0,  0, ["BEAST","NO PROMOTION","ORK"],                              OR, "troop", "Bouncy Ork beast.")
unit("or_deff_dread",  "Deff Dread",180, 0, 1,  6,  0,  2, -3, ["ORK","NEGATE SHRAPNEL","NO PROMOTION","STRONG","TOUGH","VEHICLE"], OR, "troop", "Ramshackle Ork walker.")

# ── Drukhari ──────────────────────────────────────────────────────────────────
section("DRUKHARI")
DR = "drukhari"
unit("dr_archon",    "Archon",    85,  1, 1,  7,  3,  3,  0, ["DRUKHARI","ELITE","LEADER","TOUGH"],      DR, "elite", "Mandatory Dark Eldar lord.")
unit("dr_haemonculus","Haemonculus",105, 0,1, 7,  2,  2,  0, ["DRUKHARI","ELITE","FEAR"],               DR, "elite", "Twisted flesh-sculptor of the Drukhari.")
unit("dr_succubus",  "Succubus",   75,  0, 1,  8,  2,  2,  0, ["DRUKHARI","ELITE"],                     DR, "elite", "Deadly arena champion.")
unit("dr_kabalite_warrior","Kabalite Warrior",50, 0,99, 7, 1, 1, 0, ["DRUKHARI"],                       DR, "troop", "Swift and lethal Dark Eldar warrior.")
unit("dr_incubus",   "Incubus",   65,  0, 3,  7,  1,  2,  0, ["DRUKHARI","FEAR"],                      DR, "troop", "Elite close-combat bodyguard.")
unit("dr_wrack",     "Wrack",     65,  0, 3,  7,  1,  1,  0, ["DRUKHARI"],                              DR, "troop", "Haemonculus creation, living weapon.")
unit("dr_wych",      "Wych",      60,  0, 3,  8,  1,  1,  0, ["DRUKHARI"],                              DR, "troop", "Arena fighter and acrobatic warrior.")
unit("dr_reaver",    "Reaver",    90,  0, 2, 10,  1,  1, -1, ["DRUKHARI","FLYING","INFILTRATOR","SKIRMISHER","VEHICLE"], DR, "troop", "Jetbike-riding Drukhari raider.")
unit("dr_cronos",    "Cronos",   150,  0, 1,  7,  2,  1, -2, ["ARTIFICIAL","DRUKHARI","FLYING","LARGE","NO PROMOTION","STRONG","TOUGH"], DR, "troop", "Haemonculus spirit-engine harvesting pain tokens.")
unit("dr_talos",     "Talos",    150,  0, 1,  7,  1,  2, -2, ["ARTIFICIAL","DRUKHARI","FLYING","LARGE","NO PROMOTION","STRONG","TOUGH"], DR, "troop", "Haemonculus pain engine.")

# ── Tyranids ──────────────────────────────────────────────────────────────────
section("TYRANIDS")
TY = "tyranids"
unit("ty_hive_tyrant",    "Hive Tyrant",   175, 1, 1,  8,  3,  3, -3, ["ELITE","FEAR","LARGE","LEADER","PSYKER 1","STRONG","SYNAPSE","TOUGH","TYRANID"], TY, "elite", "Mandatory Hive Tyrant. (+10cr for FLYING)")
unit("ty_lictor",         "Lictor",        125, 0, 1,  8,  0,  2, -1, ["FEAR","LARGE","INFILTRATOR","STEALTH","TOUGH","TYRANID"],                       TY, "elite", "Terrifying hunter-killer bioform.")
unit("ty_tyrant_guard",   "Tyrant Guard",  130, 0, 1,  6,  1,  1, -3, ["ELITE","LARGE","STRONG","TOUGH","TYRANID"],                                     TY, "elite", "Bodyguard bioform for the Hive Tyrant.")
unit("ty_gaunt_barbgaunt","Barbgaunt",      50,  0,99,  6,  0,  0, -1, ["LARGE","NO PROMOTION","TYRANID"],                                               TY, "troop", "Artillery biomorph gaunt strain.")
unit("ty_gaunt_gargoyle", "Gargoyle",       40,  0,99,  8,  0,  0,  0, ["FLYING","NO PROMOTION","TYRANID"],                                              TY, "troop", "Flying gaunt biomorph.")
unit("ty_gaunt_hormagaunt","Hormagaunt",    35,  0,99,  8,  0,  1,  0, ["NO PROMOTION","TYRANID"],                                                       TY, "troop", "Fast close-combat gaunt biomorph.")
unit("ty_gaunt_neurogaunt","Neurogaunt",    35,  0,99,  6,  0,  0,  0, ["NO PROMOTION","TYRANID"],                                                       TY, "troop", "Synapse-linked gaunt biomorph.")
unit("ty_gaunt_termagant","Termagant",      35,  0,99,  6,  0,  0,  0, ["NO PROMOTION","SKIRMISHER","TYRANID"],                                          TY, "troop", "Standard ranged gaunt biomorph.")
unit("ty_tyranid_warrior","Tyranid Warrior",95,  0, 3,  6,  1,  1, -1, ["LARGE","STRONG","SYNAPSE","TOUGH","TYRANID"],                                   TY, "troop", "Synapse creature / elite biomorph.")
unit("ty_ravener",        "Ravener",        105, 0, 2,  8,  1,  1, -1, ["BURROW","DEEP STRIKE","LARGE","TOUGH","TYRANID"],                               TY, "troop", "Fast burrowing Tyranid predator. (DEEP STRIKE – TUNNEL)")
unit("ty_ripper_swarm",   "Ripper Swarm",   75,  0, 2,  6, -1,  0,  0, ["BURROW","DEEP STRIKE","FEAR","LARGE","NO PROMOTION","SWARM","TOUGH","TYRANID"], TY, "troop", "Devouring swarm of tiny bioforms. (DEEP STRIKE – TUNNEL)")
unit("ty_zoanthrope",     "Zoanthrope",     90,  0, 1,  6,  1,  0, -1, ["FLYING","LARGE","PSYKER 1","SYNAPSE","TYRANID"],                               TY, "troop", "Psychic synapse creature.")
unit("ty_spore_mine",     "Spore Mine",     25,  0, 5,  5,  0,  0,  0, ["DEEP STRIKE","FLYING","NO PROMOTION","TYRANID"],                                TY, "troop", "Drifting bio-explosive.")

# ── Genestealer Cults ─────────────────────────────────────────────────────────
section("GENESTEALER CULTS")
GC = "genestealer_cults"
unit("gc_primus",      "Primus",     55,  1, 1,  6,  2,  2,  0, ["ELITE","GENESTEALER CULTS","LEADER","TOUGH"],        GC, "elite", "Mandatory hybrid leader of the brood.")
unit("gc_clamavus",    "Clamavus",   65,  0, 1,  6,  1,  1,  0, ["ELITE","FEAR","GENESTEALER CULTS"],                  GC, "elite", "Broadcaster spreading the cult's insidious message.")
unit("gc_magus",       "Magus",      40,  0, 1,  6,  1,  0,  0, ["ELITE","GENESTEALER CULTS","PSYKER 1"],             GC, "elite", "Hybrid psyker. (+ powers)")
unit("gc_nexos",       "Nexos",      50,  0, 1,  6,  1,  1,  0, ["ELITE","GENESTEALER CULTS","STEALTH"],              GC, "elite", "Tactical genius of the uprising.")
unit("gc_neophyte",    "Neophyte",   30,  0,99,  6,  0,  0,  0, ["GENESTEALER CULTS"],                                GC, "troop", "Later-generation human-hybrid cultist.")
unit("gc_acolyte",     "Acolyte",    50,  0, 6,  6,  1,  1,  0, ["GENESTEALER CULTS","SKIRMISHER","STEALTH"],         GC, "troop", "Close-combat hybrid fighter.")
unit("gc_aberrant",    "Aberrant",   60,  0, 3,  6,  0,  2,  0, ["GENESTEALER CULTS","LIMITED POTENTIAL","STRONG"],   GC, "troop", "Musclebound hybrid brute. (50cr + 10cr hammer)")
unit("gc_abominant",   "Abominant", 115,  0, 1,  6,  0,  3,  0, ["GENESTEALER CULTS","LARGE","NEGATE FEAR","NO PROMOTION","REGENERATE 1","STRONG","TOUGH"], GC, "troop", "Alpha mutant leading Aberrant packs. (95cr + 20cr hammer)")

# ── Harlequins ────────────────────────────────────────────────────────────────
section("HARLEQUINS")
HQ = "harlequins"
unit("hq_troupe_master","Troupe Master",110, 1, 1,  8,  2,  2,  0, ["ELITE","FEAR","HARLIQUIN","LEADER","TOUGH"],    HQ, "elite", "Mandatory master of the masque. (95cr + 15cr battlekit)")
unit("hq_death_jester", "Death Jester",105, 0, 1,  8,  3,  1,  0, ["ELITE","FEAR","HARLIQUIN"],                     HQ, "elite", "Morose comedian of death. (90cr + 15cr battlekit)")
unit("hq_shadowseer",   "Shadowseer",  110, 0, 1,  8,  2,  2,  0, ["ELITE","FEAR","HARLIQUIN","PSYKER 2"],          HQ, "elite", "Harlequin psyker. (95cr + 15cr battlekit + powers)")
unit("hq_solitaire",    "Solitaire",   115, 0, 1, 10,  0,  3,  0, ["ELITE","FEAR","HARLIQUIN","STEALTH","TOUGH"],   HQ, "elite", "Lone dancer walking the path of Slaanesh. (100cr + 15cr battlekit)")
unit("hq_mime",         "Mime",         50,  0,99,  8,  0,  0,  0, ["HARLIQUIN","INFILTRATOR"],                      HQ, "troop", "Harlequin infiltrator. (45cr + 5cr). Max = other HARLIQUIN count.")
unit("hq_player",       "Player",       80,  0,99,  8,  1,  1,  0, ["HARLIQUIN"],                                   HQ, "troop", "Harlequin troupe member. (65cr + 15cr battlekit)")
unit("hq_skyweaver",    "Skyweaver",   115,  0, 2, 10,  1,  1, -1, ["FLYING","HARLIQUIN","LARGE","VEHICLE"],         HQ, "troop", "Harlequin jetbike rider. (105cr + 10cr battlekit)")

# ── Leagues of Votann ─────────────────────────────────────────────────────────
section("LEAGUES OF VOTANN")
LV = "leagues_of_votann"
unit("lv_kahl",               "Kahl",               50,  1, 1,  5,  2,  2,  0, ["ELITE","LARGE","LEADER","TOUGH","VOTANN"],                                              LV, "elite", "Mandatory Kin leader.")
unit("lv_brokhyr_iron_master","Brôkhyr Iron-Master", 40,  0, 1,  5,  1,  1,  0, ["ELITE","VOTANN"],                                                                      LV, "elite", "Master engineer of the Leagues.")
unit("lv_grimnyr",            "Grimnyr",             50,  0, 1,  5,  1,  1,  0, ["ELITE","FLYING","LARGE","PSYKER 1","VOTANN"],                                          LV, "elite", "Kin psyker sage. (+ powers)")
unit("lv_hearthkyn",          "Hearthkyn",           20,  0,99,  5,  0,  0,  0, ["VOTANN"],                                                                              LV, "troop", "Standard Kin warrior. (+ armour cost)")
unit("lv_cthonian_beserk",    "Cthonian Beserk",     40,  0, 4,  5,  0,  1,  0, ["STRONG","VOTANN"],                                                                     LV, "troop", "Close-combat specialist of the Leagues.")
unit("lv_einhyr_hearthguard", "Einhyr Hearthguard",  80,  0, 3,  5,  1,  1, -2, ["VOTANN"],                                                                              LV, "troop", "Elite veteran Kin warrior. (40cr + 40cr armour)")
unit("lv_brokhyr_thunderkyn", "Brôkhyr Thunderkyn",  80,  0, 2,  5,  1,  0, -2, ["LARGE","VEHICLE","VOTANN"],                                                            LV, "troop", "Heavy weapons platform. (40cr + 40cr armour; 0-3 at 1200cr+)")
unit("lv_ironkin_steeljack",  "Ironkin Steeljack",  110,  0, 1,  5,  1,  2, -3, ["ARTIFICIAL","LARGE","STRONG","VOTANN"],                                                LV, "troop", "Ironkin combat automaton. (0-2 if no Hernkyn Pioneers)")
unit("lv_hernkyn_pioneer",    "Hernkyn Pioneer",    130,  0, 1,  8,  1,  1, -2, ["FLYING","LARGE","NO PROMOTION","SKIRMISHER","VEHICLE","TOUGH","VOTANN"],               LV, "troop", "Fast-moving Kin skirmisher vehicle.")

# ── Slanni ────────────────────────────────────────────────────────────────────
section("SLANNI")
SL = "slanni"
unit("sl_mage_chief",  "Mage Chief",  60,  1, 1,  6,  1,  1,  0, ["ELITE","LARGE","LEADER","PSYKER 3","SLANN","TOUGH"], SL, "elite", "Mandatory cold-blooded psyker warlord. (+ powers)")
unit("sl_oldblood",    "Oldblood",    65,  0, 1,  6,  1,  2,  0, ["ELITE","NEGATE FEAR","SLANN","STRONG"],              SL, "elite", "Ancient cold-blooded veteran warrior.")
unit("sl_starpriest",  "Starpriest",  60,  0, 1,  8,  1,  0,  0, ["ELITE","PSYKER 1","SKIRMISHER","SLANN"],             SL, "elite", "Skink priest attuned to celestial energies. (+ powers)")
unit("sl_skirmisher",  "Skirmisher",  40,  0,99,  8,  0, -1,  0, ["SKIRMISHER","SLANN"],                                SL, "troop", "Fast Skink warrior.")
unit("sl_brave",       "Brave",       45,  0, 6,  6,  1,  1,  0, ["SLANN"],                                             SL, "troop", "Saurus warrior.")
unit("sl_battle_mage", "Battle Mage", 40,  0, 3,  6,  1,  0,  0, ["PSYKER 1","SLANN"],                                  SL, "troop", "Skink psyker. (+ powers)")
unit("sl_brute",       "Brute",       70,  0, 2,  6,  0,  2, -1, ["LARGE","SLANN","STRONG"],                            SL, "troop", "Large cold-blooded brute warrior.")
unit("sl_amphi_walker","Amphi Walker",160, 0, 1,  8,  1,  1, -3, ["LARGE","NEGATE SHRAPNEL","SLANN","STRONG","TOUGH","VEHICLE"], SL, "troop", "Ancient Slann warmachine.")

# ── Necrons ───────────────────────────────────────────────────────────────────
section("NECRONS")
NEC = "necrons"
# Standard elites (one of Lord or Cryptek must be taken as leader)
unit("nec_necron_lord",   "Necron Lord",   115, 0, 1,  5,  2,  2, -3, ["ELITE","LARGE","LEADER","NECRON","NEGATE GAS","TOUGH"],            NEC, "elite", "Necron noble commander (one of Lord/Cryptek must be leader).")
unit("nec_cryptek",       "Cryptek",       105, 0, 1,  5,  1,  0, -2, ["ELITE","LARGE","NECRON","NEGATE GAS"],                             NEC, "elite", "Necron technomancer. (+ staff)")
unit("nec_royal_warden",  "Royal Warden",   85, 0, 1,  5,  1,  1, -2, ["ELITE","NECRON","NEGATE GAS"],                                     NEC, "elite", "Necron officer of the Royal Court.")
# Standard troops
unit("nec_warrior",       "Necron Warrior", 70, 0,99,  5,  0,  0, -2, ["NECRON","NEGATE GAS","NO PROMOTION"],                              NEC, "troop", "Rank-and-file undying Necron soldier.")
unit("nec_immortal",      "Immortal",       95, 0, 5,  5,  1,  1, -3, ["NECRON","NEGATE GAS"],                                             NEC, "troop", "Elite Necron heavy infantry.")
unit("nec_scarab_swarm",  "Canoptek Scarab Swarm",70, 0,3, 8, 0, 0, 0,["ARTIFICIAL","FEAR","FLYING","LARGE","NECRON","NEGATE GAS","NO PROMOTION","SWARM","TOUGH"], NEC, "troop", "Swarming repair and combat scarabs.")
unit("nec_tomb_blade",    "Tomb Blade",    100, 0, 2, 10,  1,  0, -1, ["FLYING","LARGE","LIMITED POTENTIAL","NECRON","NEGATE GAS","SKIRMISHER","VEHICLE"], NEC, "troop", "Fast Necron jetbike.")
# Destroyer Cult variant
unit("nec_lokhust_lord",     "Lokhust Lord",     145, 0, 1,  8,  2,  1, -2, ["ELITE","FLYING","LARGE","NECRON","NEGATE GAS","TOUGH"],                      NEC, "elite", "Destroyer Cult variant: mounted lord.")
unit("nec_skorpekh_lord",    "Skorpekh Lord",    125, 0, 1,  8,  0,  3, -2, ["ELITE","LARGE","NECRON","NEGATE GAS","TOUGH"],                               NEC, "elite", "Destroyer Cult variant: close-combat lord.")
unit("nec_hexmark_destroyer","Hexmark Destroyer",160, 0, 1,  8,  2,  1, -2, ["ELITE","LARGE","INFILTRATOR","NECRON","NEGATE GAS","TOUGH"],                 NEC, "elite", "Destroyer Cult variant: marksman lord.")
unit("nec_lokhust_destroyer","Lokhust Destroyer",115, 0, 2,  8,  1,  0, -2, ["LARGE","FLYING","NECRON","NEGATE GAS"],                                      NEC, "troop", "Destroyer Cult variant: flying heavy destroyer.")
unit("nec_ophydian_destroyer","Ophydian Destroyer",90,0,2, 8, 0,  2, -1, ["BURROW","DEEP STRIKE","LARGE","NECRON","NEGATE GAS","STEALTH"],                 NEC, "troop", "Destroyer Cult variant: burrowing destroyer. (DEEP STRIKE – TUNNEL)")
unit("nec_skorpekh_destroyer","Skorpekh Destroyer",105,0,2, 8, 0,  2, -2, ["LARGE","NECRON","NEGATE GAS"],                                                 NEC, "troop", "Destroyer Cult variant: close-combat destroyer.")
# Canoptek Court variant
unit("nec_canoptek_spyder", "Canoptek Spyder",  110, 0, 1,  5,  1,  0, -2, ["ARTIFICIAL","ELITE","FLYING","LARGE","NECRON","NEGATE GAS","VEHICLE"],        NEC, "elite", "Canoptek Court variant: repair spyder.")
unit("nec_apprentek",       "Apprentek",         95, 0, 3,  5,  1,  1, -2, ["NECRON","NEGATE GAS"],                                                        NEC, "troop", "Canoptek Court variant: lesser technomancer.")
unit("nec_macrocyte_warrior","Macrocyte Warrior", 60, 0, 3,  5,  0,  0, -1, ["ARTIFICIAL","FLYING","NECRON","NEGATE GAS","NO PROMOTION"],                   NEC, "troop", "Canoptek Court variant: flying scarab warrior.")
# Flayer King variant
unit("nec_flayer_king",     "Flayer King",       165, 0, 1,  5,  0,  3, -3, ["DEEP STRIKE","ELITE","FEAR","LEADER","NECRON","NEGATE GAS","STEALTH","TOUGH"], NEC, "elite", "Flayer King variant: mandatory leader.")

# ── Aeldari ───────────────────────────────────────────────────────────────────
section("AELDARI")
AEL = "aeldari"
unit("ael_autarch",      "Autarch",   75,  1, 1,  7,  3,  3,  0, ["AELDARI","ELITE","LEADER","TOUGH"],   AEL, "elite", "Mandatory Aeldari warband leader.")
unit("ael_seer",         "Seer",      65,  0, 1,  7,  2,  2,  0, ["AELDARI","ELITE","PSYKER 2"],         AEL, "elite", "Aeldari Farseer psyker. (+ weapon + powers)")
unit("ael_warlock",      "Warlock",   45,  0, 2,  7,  1,  1,  0, ["AELDARI","ELITE","PSYKER 1"],         AEL, "elite", "Aeldari Warlock psyker. (+ weapon + powers)")
unit("ael_guardian",     "Guardian",  45,  0,99,  7,  1,  1,  0, ["AELDARI"],                            AEL, "troop", "Citizen-soldier of the Craftworld.")
unit("ael_aspect_warrior","Aspect Warrior",65, 0,6, 7, 2, 2,  0, ["AELDARI"],                            AEL, "troop", "Dedicated Path warrior. 8 aspect types; LIMIT 2 per type.")
unit("ael_windrider",    "Windrider", 90,  0, 2, 10,  1,  1, -1, ["AELDARI","FLYING","VEHICLE"],          AEL, "troop", "Jetbike-mounted Craftworld warrior.")
unit("ael_wraith",       "Wraith",   120,  0, 2,  6,  1,  1, -2, ["AELDARI","LARGE","NO PROMOTION","STRONG","TOUGH","VEHICLE"], AEL, "troop", "Ghostly wraithbone warrior construct.")
# Exodites variant
unit("ael_dragonlord",   "Dragonlord",110, 1, 1,  8,  3,  3,  0, ["AELDARI","ELITE","LARGE","LEADER","MOUNTED","TOUGH"], AEL, "elite", "Exodites variant: mandatory Dragonlord leader.")
unit("ael_dragon_knight","Dragon Knight",85,0, 6,  8,  2,  2,  0, ["AELDARI","LARGE","MOUNTED"],          AEL, "troop", "Exodites variant: cold-one rider.")
# Spirit Conclave variant
unit("ael_wraithseer",   "Wraithseer",145, 0, 1,  6,  2,  2, -3, ["AELDARI","ELITE","LARGE","PSYKER 2","STRONG","TOUGH","VEHICLE"], AEL, "elite", "Spirit Conclave variant: wraithbone psyker. (+ weapon + powers)")
unit("ael_wraithlord",   "Wraithlord",140, 0, 1,  6,  2,  2, -3, ["AELDARI","LARGE","NO PROMOTION","STRONG","VEHICLE"],              AEL, "troop", "Spirit Conclave variant: mighty wraithbone walker.")

# ── T'au Empire ───────────────────────────────────────────────────────────────
section("T'AU EMPIRE")
TAU = "t_au_empire"
unit("tau_ethereal",         "Ethereal",         65,  1, 1,  6,  1,  1,  0, ["ELITE","LEADER","MARKERLIGHT","T'AU"],                                                   TAU, "elite", "Mandatory Ethereal caste leader.")
unit("tau_commander",        "Commander",        115, 0, 1,  8,  2,  1, -2, ["ELITE","FLYING","LARGE","MARKERLIGHT","STRONG","T'AU","TOUGH","VEHICLE"],               TAU, "elite", "T'au Commander battlesuit.")
unit("tau_cadre_fireblade",  "Cadre Fireblade",  55,  0, 1,  6,  2,  1,  0, ["ELITE","MARKERLIGHT","T'AU"],                                                           TAU, "elite", "Elite Fire Warrior leader.")
unit("tau_kroot_shaper",     "Kroot Shaper",     55,  0, 1,  6,  1,  2,  0, ["KROOT","STEALTH","T'AU"],                                                               TAU, "elite", "Kroot pack leader.")
unit("tau_fire_warrior",     "Fire Warrior",     35,  0,99,  6,  1, -1,  0, ["MARKERLIGHT","T'AU"],                                                                   TAU, "troop", "Standard T'au ranged infantry.")
unit("tau_drone",            "T'au Drone",       25,  0,99,  6,  0, -1, -1, ["ARTIFICIAL","FLYING","NO PROMOTION","T'AU"],                                            TAU, "troop", "Support drone. (+ type cost). Max = non-KROOT models.")
unit("tau_kroot_carnivore",  "Kroot Carnivore",  40,  0, 4,  6,  0,  1,  0, ["KROOT","STEALTH","T'AU"],                                                               TAU, "troop", "Kroot hunter warband member.")
unit("tau_stealth_battlesuit","Stealth Battlesuit",110,0,2, 6, 1,  0, -2, ["FLYING","INFILTRATOR","MARKERLIGHT","STEALTH","T'AU","VEHICLE"],                         TAU, "troop", "Stealthy XV25 battlesuit.")
unit("tau_crisis_battlesuit","Crisis Battlesuit",135, 0, 1,  8,  1,  0, -2, ["FLYING","LARGE","MARKERLIGHT","STRONG","T'AU","TOUGH","VEHICLE"],                       TAU, "troop", "XV8 Crisis battlesuit.")
# Retaliation Cadre variant
unit("tau_broadside_battlesuit","Broadside Battlesuit",125,0,1,5, 1,  0, -3, ["LARGE","NO PROMOTION","STRONG","T'AU","TOUGH","VEHICLE"],                             TAU, "troop", "Retaliation Cadre variant: heavy support battlesuit.")
# Kroot Kinband variant
unit("tau_kill_broker",      "Kill Broker",      75,  0, 1,  6,  2,  2,  0, ["ELITE","KROOT","STEALTH","T'AU"],                                                       TAU, "elite", "Kroot Kinband variant: mercenary leader.")
unit("tau_krootox_rider",    "Krootox Rider",    115, 0, 2,  6,  1,  2, -1, ["LARGE","KROOT","LIMITED POTENTIAL","MOUNTED","T'AU","TOUGH"],                           TAU, "troop", "Kroot Kinband variant: Kroot mounted on Krootox. (0-3 at 1200cr+)")

# ==============================================================================
# OUTLAW FACTIONS
# ==============================================================================

# ── Necromunda Gang ───────────────────────────────────────────────────────────
section("NECROMUNDA GANG")
NG = "necromunda_gang"
unit("ng_gang_leader",         "Gang Leader",           60,  1, 1,  6,  2,  2,  0, ["ELITE","GANGER","LEADER","TOUGH"],                                                      NG, "elite", "Mandatory leader of the gang warband.")
unit("ng_gang_champion",       "Gang Champion",         50,  0, 2,  6,  1,  1,  0, ["ELITE","GANGER"],                                                                       NG, "elite", "Veteran ganger officer.")
unit("ng_juve",                "Juve",                  15,  0,99,  6, -1, -1,  0, ["GANGER","NO PROMOTION"],                                                                NG, "troop", "Young gang prospect.")
unit("ng_ganger",              "Ganger",                35,  0,99,  6,  0,  0,  0, ["GANGER"],                                                                                NG, "troop", "Standard gang member. Bruiser +1 melee; Shooter +1 ranged.")
unit("ng_cyber_mastiff",       "Hardcase Cyber Mastiff",95,  0, 2,  6,  0,  1, -2, ["ARTIFICIAL","NO PROMOTION"],                                                            NG, "troop", "Palanite Enforcers variant: cybernetic attack dog.")
unit("ng_sanctioner_automata", "Sanctioner Automata",   135, 0, 2,  6,  1,  1, -2, ["ARTIFICIAL","LARGE","NEGATE GAS","NEGATE SHRAPNEL","NO PROMOTION","REGENERATE 1","STRONG","TOUGH"], NG, "troop", "Palanite Enforcers variant: heavy combat automaton.")

# ── Pirate Crew ───────────────────────────────────────────────────────────────
section("PIRATE CREW")
PC = "pirate_crew"
unit("pc_pirate_captain",  "Pirate Captain",  65,  1, 1,  6,  2,  2,  0, ["ELITE","LEADER","PIRATE","TOUGH"],  PC, "elite", "Mandatory captain commanding the pirate crew.")
unit("pc_first_mate",      "First Mate",      50,  0, 1,  6,  1,  1,  0, ["ELITE","PIRATE"],                   PC, "elite", "Second-in-command of the pirate vessel.")
unit("pc_pirate_champion", "Pirate Champion", 45,  0, 2,  6,  1,  1,  0, ["ELITE","PIRATE"],                   PC, "elite", "Experienced pirate officer.")
unit("pc_pirate",          "Pirate",          35,  0,99,  6,  0,  0,  0, ["PIRATE"],                            PC, "troop", "Standard voidborn pirate.")
unit("pc_pirate_veteran",  "Pirate Veteran",  45,  0,99,  6,  1,  1,  0, ["PIRATE"],                            PC, "troop", "Seasoned pirate with battle experience.")

# ==============================================================================
# FACTION DEFINITIONS
# ==============================================================================
w("")
w("// ============================================================================")
w("// FACTION OBJECTS")
w("// ============================================================================")
w("")

def faction_obj(fid, name, units_list, desc, keywords=None):
    uids = ", ".join(units_list)
    kw = keywords or []
    kw_str = ", ".join(f"'{k}'" for k in kw)
    w(f"export const faction_{fid.replace('-','_')}: Faction = {{")
    w(f"  id: '{esc(fid)}',")
    w(f"  name: '{esc(name)}',")
    w(f"  keywords: [{kw_str}],")
    w(f"  description: '{esc(desc)}',")
    w(f"  units: [{uids}],")
    w(f"}};")
    w("")

faction_obj("adeptus_astartes", "Adeptus Astartes",
    ["aa_captain","aa_apothecary","aa_chaplain","aa_librarian",
     "aa_scout_marine","aa_space_marine","aa_terminator","aa_dreadnought"],
    "The Space Marines, genetically enhanced warriors of the Emperor.")

faction_obj("astra_militarum", "Astra Militarum",
    ["am_castellan","am_commissar","am_primaris_psyker",
     "am_conscript","am_guardsman","am_veteran_guardsman",
     "am_ratling_marksman","am_heavy_weapons_squad","am_ogryn"],
    "The vast armies of the Imperial Guard, humanity's shield.")

faction_obj("adeptus_custodes", "Adeptus Custodes",
    ["ac_shield_captain","ac_blade_champion","ac_knight_centura",
     "ac_anathema_psykana","ac_custodian_guard",
     "ac_aquilon_terminator","ac_contemptor_dreadnought"],
    "The golden warriors who guard the Emperor of Mankind.")

faction_obj("adepta_sororitas", "Adepta Sororitas",
    ["as_canoness","as_dogmata","as_palatine",
     "as_novitiate","as_battle_sister","as_repentia",
     "as_paragon_warsuit","as_penitent_engine"],
    "The Sisters of Battle, warrior-nuns of the Imperial faith.")

faction_obj("adeptus_mechanicus", "Adeptus Mechanicus",
    ["amec_dominus","amec_skitarii_marshal","amec_tech_priest",
     "amec_skitarii","amec_servitor","amec_electro_priest",
     "amec_sicarian","amec_kataphron","amec_kastelan_robot"],
    "The machine-priests of Mars and their cybernetic legions.")

faction_obj("adeptus_ministorum", "Adeptus Ministorum",
    ["amin_confessor","amin_missionary","amin_drill_abbot",
     "amin_preacher","amin_crusader","amin_death_cult_assassin",
     "amin_battle_cherub","amin_miraculist"],
    "The Ecclesiarchy's faithful militia, spreading the Imperial Creed by fire and sword.")

faction_obj("officio_assassinorum", "Officio Assassinorum",
    ["oa_adamus","oa_callidus","oa_culexus","oa_eversor",
     "oa_vanus","oa_venenum","oa_vindicare","oa_aspirant"],
    "The Emperor's hidden blade. No mandatory leader; max 6 elite models.")

faction_obj("rogue_trader", "Rogue Trader",
    ["rt_lord_captain","rt_voidmaster","rt_navigator_scion","rt_voidsman"],
    "Explorers beyond the light of the Astronomican, armed with a Warrant of Trade.")

faction_obj("the_inquisition", "The Inquisition",
    ["inq_inquisitor","inq_interrogator","inq_mystic",
     "inq_acolyte","inq_jokaero","inq_daemonhost"],
    "The secret police of the Imperium, hunting heresy in all its forms.")

faction_obj("grey_knights", "Grey Knights",
    ["gk_captain","gk_apothecary","gk_chaplain","gk_librarian",
     "gk_scout_marine","gk_space_marine","gk_terminator","gk_dreadnought"],
    "Adeptus Astartes warband variant. Daemon-hunting Space Marines of the Grey Knights Chapter.")

faction_obj("adeptus_arbites", "Adeptus Arbites",
    ["arb_gang_leader","arb_gang_champion","arb_juve","arb_ganger",
     "arb_cyber_mastiff","arb_sanctioner_automata"],
    "Necromunda Gang (Palanite Enforcers) variant. The law-enforcers of the Imperium.")

faction_obj("heretic_astartes", "Heretic Astartes",
    ["ha_chaos_lord","ha_dark_apostle","ha_chaos_sorcerer","ha_warpsmith",
     "ha_chaos_cultist","ha_chaos_space_marine","ha_possessed",
     "ha_chaos_terminator","ha_helbrute"],
    "Traitor Space Marines and their cultist followers.")

faction_obj("chaos_cult", "Chaos Cult",
    ["cc_cult_demagogue","cc_heretic_witch","cc_chaos_disciple","cc_daemon_prince",
     "cc_cult_rabble","cc_chaos_devotee","cc_chaos_ogryn","cc_chaos_spawn"],
    "Fanatical worshippers of the Chaos Gods.")

faction_obj("chaos_daemons", "Chaos Daemons",
    ["cd_daemon_prince","cd_chaos_furie",
     "cd_bloodmaster","cd_skullmaster","cd_bloodletter","cd_flesh_hound",
     "cd_infernal_enrapturess","cd_tranceweaver","cd_daemonette","cd_seeker","cd_contorted_epitome",
     "cd_poxbringer","cd_spoilpox_scrivener","cd_plaguebearer","cd_nurgling_swarm","cd_plague_drone_rider",
     "cd_changecaster","cd_flamer","cd_blue_horror","cd_pink_horror","cd_screamer"],
    "Manifestations of the Ruinous Powers from the immaterium.")

faction_obj("orks", "Orks",
    ["or_warboss","or_big_mek","or_weirdboy",
     "or_gretchin","or_boy","or_nob","or_squig","or_deff_dread"],
    "The savage Greenskin tide, living for warfare.")

faction_obj("drukhari", "Drukhari",
    ["dr_archon","dr_haemonculus","dr_succubus",
     "dr_kabalite_warrior","dr_incubus","dr_wrack","dr_wych",
     "dr_reaver","dr_cronos","dr_talos"],
    "The Dark Eldar raiders of Commorragh.")

faction_obj("tyranids", "Tyranids",
    ["ty_hive_tyrant","ty_lictor","ty_tyrant_guard",
     "ty_gaunt_barbgaunt","ty_gaunt_gargoyle","ty_gaunt_hormagaunt",
     "ty_gaunt_neurogaunt","ty_gaunt_termagant",
     "ty_tyranid_warrior","ty_ravener","ty_ripper_swarm",
     "ty_zoanthrope","ty_spore_mine"],
    "The Tyranid swarm, a galaxy-devouring force of pure biological horror.")

faction_obj("genestealer_cults", "Genestealer Cults",
    ["gc_primus","gc_clamavus","gc_magus","gc_nexos",
     "gc_neophyte","gc_acolyte","gc_aberrant","gc_abominant"],
    "The hidden fifth column of the Tyranid advance.")

faction_obj("harlequins", "Harlequins",
    ["hq_troupe_master","hq_death_jester","hq_shadowseer","hq_solitaire",
     "hq_mime","hq_player","hq_skyweaver"],
    "The mercurial warriors of the Laughing God.")

faction_obj("leagues_of_votann", "Leagues of Votann",
    ["lv_kahl","lv_brokhyr_iron_master","lv_grimnyr",
     "lv_hearthkyn","lv_cthonian_beserk","lv_einhyr_hearthguard",
     "lv_brokhyr_thunderkyn","lv_ironkin_steeljack","lv_hernkyn_pioneer"],
    "The Kin of the Leagues of Votann, stocky industrious warriors.")

faction_obj("slanni", "Slanni",
    ["sl_mage_chief","sl_oldblood","sl_starpriest",
     "sl_skirmisher","sl_brave","sl_battle_mage","sl_brute","sl_amphi_walker"],
    "Cold-blooded warriors of the Old Ones' ancient plan.")

faction_obj("necrons", "Necrons",
    ["nec_necron_lord","nec_cryptek","nec_royal_warden",
     "nec_warrior","nec_immortal","nec_scarab_swarm","nec_tomb_blade",
     "nec_lokhust_lord","nec_skorpekh_lord","nec_hexmark_destroyer",
     "nec_lokhust_destroyer","nec_ophydian_destroyer","nec_skorpekh_destroyer",
     "nec_canoptek_spyder","nec_apprentek","nec_macrocyte_warrior",
     "nec_flayer_king"],
    "The undying machine warriors of the Necrons, returning from aeons of slumber.")

faction_obj("aeldari", "Aeldari",
    ["ael_autarch","ael_seer","ael_warlock",
     "ael_guardian","ael_aspect_warrior","ael_windrider","ael_wraith",
     "ael_dragonlord","ael_dragon_knight",
     "ael_wraithseer","ael_wraithlord"],
    "The ancient Craftworld Eldar, fighting to preserve their dying race.")

faction_obj("t_au_empire", "T'au Empire",
    ["tau_ethereal","tau_commander","tau_cadre_fireblade","tau_kroot_shaper",
     "tau_fire_warrior","tau_drone","tau_kroot_carnivore",
     "tau_stealth_battlesuit","tau_crisis_battlesuit",
     "tau_broadside_battlesuit","tau_kill_broker","tau_krootox_rider"],
    "The T'au and their auxiliaries, united under the Greater Good.")

faction_obj("necromunda_gang", "Necromunda Gang",
    ["ng_gang_leader","ng_gang_champion",
     "ng_juve","ng_ganger",
     "ng_cyber_mastiff","ng_sanctioner_automata"],
    "The underhive gangs of Necromunda, fighting for territory and survival.")

faction_obj("pirate_crew", "Pirate Crew",
    ["pc_pirate_captain","pc_first_mate","pc_pirate_champion",
     "pc_pirate","pc_pirate_veteran"],
    "Voidborn pirates raiding the spaceways and port-worlds.")

# ==============================================================================
# EXPORTS
# ==============================================================================
w("export const allFactions: Faction[] = [")
for fid in [
    "adeptus_astartes","astra_militarum","adeptus_custodes","adepta_sororitas",
    "adeptus_mechanicus","adeptus_ministorum","officio_assassinorum",
    "rogue_trader","the_inquisition","grey_knights","adeptus_arbites",
    "heretic_astartes","chaos_cult","chaos_daemons",
    "orks","drukhari","tyranids","genestealer_cults","harlequins",
    "leagues_of_votann","slanni","necrons","aeldari","t_au_empire",
    "necromunda_gang","pirate_crew",
]:
    w(f"  faction_{fid},")
w("];")
w("")
w("export function getFactionById(id: string): Faction | undefined {")
w("  return allFactions.find(f => f.id === id);")
w("}")
w("")
w("export function getUnitsByFaction(factionId: string): UnitOption[] {")
w("  const faction = getFactionById(factionId);")
w("  return faction ? faction.units : [];")
w("}")
w("")

content = "\n".join(LINES)
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Written {len(LINES)} lines to {OUTPUT}")
