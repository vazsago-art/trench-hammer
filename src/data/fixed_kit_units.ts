/**
 * Fixed / Built-In Kit Units
 *
 * Contains every unit across all 33 TrenchHammer faction files that has
 * weapons and/or equipment INCLUDED in their base cost as fixed / built-in
 * gear — either because the text says "always equipped with X, included in
 * its cost/statistics," "cannot be equipped with any other weapons, armour,
 * or equipment," "must be equipped with X (included)," or because the unit
 * is a beast/construct whose stat block lists inherent natural weapons or
 * built-in armour plating that does not have to be purchased separately.
 *
 * Weapon keyword abbreviations used throughout:
 *   MELEE | RANGED | AP = ARMOUR PIERCING | IA = IGNORE ARMOUR | IC = IGNORE COVER
 *   AP1/AP2 = ARMOUR PIERCING 1/2 | InjD = INJURY DICE | InjM = INJURY MODIFIER
 */

export interface FixedWeapon {
  name: string;
  type: "Melee" | "Ranged" | "Both";
  range?: string;
  keywords: string[];
  notes?: string;
}

export interface FixedArmour {
  name: string;
  modifier: number; // negative = bonus (e.g. -3 means -3 to injury rolls)
  keywords?: string[];
  notes?: string;
}

export interface FixedEquipment {
  name: string;
  effect: string;
}

export interface FixedKitUnit {
  id: string;
  displayName: string;
  faction: string;
  subfaction?: string; // Warband Variant / Gang / Ordo
  fixedWeapons?: FixedWeapon[];
  fixedArmour?: FixedArmour;
  fixedEquipment?: FixedEquipment[];
  canEquipOtherWeapons?: boolean; // true = has fixed kit BUT may also purchase more
  notes?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAOS CULT
// ─────────────────────────────────────────────────────────────────────────────
const CHAOS_CULT: FixedKitUnit[] = [
  {
    id: "cc_daemon_prince",
    displayName: "Daemon Prince",
    faction: "Chaos Cult",
    fixedWeapons: [
      {
        name: "Hellforged Weapon",
        type: "Melee",
        keywords: ["+1 INJURY DICE", "HEAVY", "TWO-HANDED"],
      },
      {
        name: "Infernal Cannon",
        type: "Ranged",
        range: '24"',
        keywords: ["+1 INJURY DICE", "BLAST 2\"", "HEAVY", "SHRAPNEL", "TWO-HANDED"],
      },
    ],
    fixedArmour: { name: "Daemonic Hellplate", modifier: -3, notes: "Included in cost" },
    canEquipOtherWeapons: false,
  },
  {
    id: "cc_chaos_spawn",
    displayName: "Chaos Spawn",
    faction: "Chaos Cult",
    fixedWeapons: [
      {
        name: "Hideous Mutations",
        type: "Melee",
        keywords: ["CLEAVE D3", "+1 INJURY DICE"],
      },
    ],
    fixedArmour: { name: "Thick Hide", modifier: -2, notes: "Included in cost" },
    canEquipOtherWeapons: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HERETIC ASTARTES
// ─────────────────────────────────────────────────────────────────────────────
const HERETIC_ASTARTES: FixedKitUnit[] = [
  {
    id: "ha_dark_apostle",
    displayName: "Dark Apostle",
    faction: "Heretic Astartes",
    fixedWeapons: [
      {
        name: "Accursed Crozius",
        type: "Melee",
        keywords: ["ARMOUR PIERCING 2"],
        notes: "Wielder gains FEAR",
      },
    ],
    fixedEquipment: [
      { name: "Power Armour or Terminator Armour", effect: "Included in cost; player chooses which" },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "ha_possessed",
    displayName: "Possessed",
    faction: "Heretic Astartes",
    fixedWeapons: [
      {
        name: "Mutated Claw",
        type: "Melee",
        keywords: ["CRITICAL"],
      },
    ],
    fixedEquipment: [{ name: "Power Armour", effect: "Included in cost" }],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "ha_eightbound",
    displayName: "Eightbound",
    faction: "Heretic Astartes",
    subfaction: "World Eaters (Possessed variant)",
    fixedWeapons: [
      {
        name: "Mutated Chainblade",
        type: "Melee",
        keywords: ["CRITICAL", "RISKY", "SHRAPNEL"],
        notes: "Replaces Mutated Claw for World Eaters Possessed",
      },
    ],
    fixedEquipment: [{ name: "Power Armour", effect: "Included in cost" }],
    canEquipOtherWeapons: false,
  },
  {
    id: "ha_helbrute",
    displayName: "Helbrute",
    faction: "Heretic Astartes",
    fixedWeapons: [
      {
        name: "Helbrute Fists",
        type: "Melee",
        keywords: ["TWO-HANDED"],
        notes: "Count as Two-Handed Hammers (+1 INJURY MODIFIER, HEAVY, TWO-HANDED)",
      },
    ],
    fixedArmour: { name: "Armour Plating", modifier: -3, notes: "Included in statistics" },
    canEquipOtherWeapons: true,
    notes: "Can equip ranged weapons; if only ranged weapons equipped, still counts as having a CCW",
  },
  {
    id: "ha_poxwalker",
    displayName: "Poxwalker",
    faction: "Heretic Astartes",
    subfaction: "Death Guard",
    fixedWeapons: [
      {
        name: "Close Combat Weapon (innate)",
        type: "Melee",
        keywords: [],
        notes: "Has no hands; always counts as equipped with a CCW",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any weapons, armour, or equipment",
  },
  {
    id: "ha_foetid_blight_drone",
    displayName: "Foetid Blight-Drone",
    faction: "Heretic Astartes",
    subfaction: "Death Guard",
    fixedWeapons: [
      {
        name: "Fleshmower (option A)",
        type: "Melee",
        keywords: ["HEAVY", "SHRAPNEL", "TWO-HANDED"],
        notes: "Automatically hits all models in melee with wielder; choose one of the three weapon options",
      },
      {
        name: "Twin Blight Launchers (option B)",
        type: "Ranged",
        range: '36"',
        keywords: ["+1 DICE", "IGNORE COVER", "BLAST 3\"", "HEAVY", "INFECTION MARKERS", "TWO-HANDED"],
        notes: "One of three weapon options",
      },
      {
        name: "Twin Plague Spewers (option C)",
        type: "Ranged",
        range: '10"',
        keywords: ["FLAMETHROWER", "IGNORE ARMOUR", "-1 INJURY DICE", "AUTOMATIC 2", "GAS", "HEAVY", "TWO-HANDED"],
        notes: "One of three weapon options",
      },
      {
        name: "Slam (fallback)",
        type: "Melee",
        keywords: ["INFECTION MARKERS"],
        notes: "Used if the Drone has no melee weapon equipped",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Equipped with player's choice of one of the three weapon options; no other weapons besides the built-in",
  },
  {
    id: "ha_renegade_apothecary",
    displayName: "Renegade Apothecary",
    faction: "Heretic Astartes",
    subfaction: "Renegade Space Marines",
    fixedWeapons: [
      {
        name: "Narthecium",
        type: "Melee",
        keywords: ["ARMOUR PIERCING 1", "HELD"],
      },
    ],
    fixedEquipment: [
      { name: "Power Armour or Terminator Armour", effect: "Included in cost; player chooses which" },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "ts_sekhetar_robot",
    displayName: "Sekhetar Automata",
    faction: "Thousand Sons",
    fixedWeapons: [
      {
        name: "Hellfyre Missile Rack",
        type: "Ranged",
        range: '36"',
        keywords: ["IGNORE COVER", "FIRE"],
      },
    ],
    fixedArmour: { name: "Armour Plating", modifier: -2, notes: "Included in cost" },
    canEquipOtherWeapons: true,
  },
  {
    id: "ha_slaughterbound",
    displayName: "Slaughterbound",
    faction: "Heretic Astartes",
    subfaction: "World Eaters",
    fixedWeapons: [
      {
        name: "Daemonic Claw",
        type: "Melee",
        keywords: ["+2 INJURY DICE", "CRITICAL", "RISKY", "HELD"],
      },
    ],
    fixedEquipment: [
      { name: "Mark of Khorne", effect: "Included in cost" },
      { name: "Power Armour or Terminator Armour", effect: "Included in cost" },
    ],
    canEquipOtherWeapons: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// THE VERMINTIDE
// ─────────────────────────────────────────────────────────────────────────────
const VERMINTIDE: FixedKitUnit[] = [
  {
    id: "vt_doom_flayer",
    displayName: "Doom-Flayer",
    faction: "The Vermintide",
    fixedWeapons: [
      {
        name: "Whirling Blades",
        type: "Melee",
        keywords: ["+1 INJURY DICE", "CRITICAL"],
        notes: "Additional +1 INJURY DICE during Charge activation; IGNORE OFF-HAND penalty",
      },
    ],
    fixedArmour: { name: "Armour Plating", modifier: -2, notes: "Included in cost" },
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADEPTA SORORITAS
// ─────────────────────────────────────────────────────────────────────────────
const ADEPTA_SORORITAS: FixedKitUnit[] = [
  {
    id: "as_paragon_warsuit",
    displayName: "Paragon Warsuit",
    faction: "Adepta Sororitas",
    fixedWeapons: [
      {
        name: "Close Combat Weapon (built-in)",
        type: "Melee",
        keywords: [],
        notes: "Included in cost",
      },
    ],
    fixedArmour: { name: "Heavy Armour Plating", modifier: -3, notes: "Included in cost" },
    canEquipOtherWeapons: true,
    notes: "Can also equip ranged weapons from the Sororitas armoury",
  },
  {
    id: "as_penitent_engine",
    displayName: "Penitent Engine",
    faction: "Adepta Sororitas",
    fixedWeapons: [
      {
        name: "Penitent Buzz-Blades × 2 (option A)",
        type: "Melee",
        keywords: ["HEAVY", "IGNORE ARMOUR", "RISKY"],
        notes: "One of three weapon loadout options",
      },
      {
        name: "Penitent Flails × 2 (option B)",
        type: "Melee",
        keywords: ["+1 INJURY MODIFIER", "HEAVY"],
        notes: "One of three weapon loadout options",
      },
      {
        name: "Penitent Buzz-Blade + Penitent Flail (option C)",
        type: "Melee",
        keywords: [],
        notes: "One of each — one of three weapon loadout options",
      },
    ],
    fixedArmour: { name: "Armour Plating", modifier: -2, notes: "Included in cost" },
    canEquipOtherWeapons: false,
    notes: "Player chooses one weapon loadout at recruitment; cannot otherwise equip",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADEPTUS ASTARTES
// ─────────────────────────────────────────────────────────────────────────────
const ADEPTUS_ASTARTES: FixedKitUnit[] = [
  {
    id: "aa_apothecary",
    displayName: "Apothecary",
    faction: "Adeptus Astartes",
    fixedWeapons: [
      {
        name: "Narthecium",
        type: "Melee",
        keywords: ["ARMOUR PIERCING 1", "HELD"],
      },
    ],
    fixedEquipment: [
      { name: "Power Armour or Terminator Armour", effect: "Included in cost; player chooses which" },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "aa_chaplain",
    displayName: "Chaplain",
    faction: "Adeptus Astartes",
    fixedWeapons: [
      {
        name: "Crozius Arcanum",
        type: "Melee",
        keywords: ["ARMOUR PIERCING 2", "LEADER"],
        notes: "Wielder grants LEADER keyword to nearby allies (faction ability)",
      },
    ],
    fixedEquipment: [
      { name: "Power Armour or Terminator Armour", effect: "Included in cost; player chooses which" },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "aa_dreadnought",
    displayName: "Dreadnought",
    faction: "Adeptus Astartes",
    fixedArmour: { name: "Heavy Armour Plating", modifier: -3, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "If equipped only with ranged weapons, also counts as equipped with a CCW",
  },
  {
    id: "aa_fenrisian_wolf",
    displayName: "Fenrisian Wolf",
    faction: "Adeptus Astartes",
    subfaction: "Space Wolves",
    fixedWeapons: [
      {
        name: "Teeth and Claws",
        type: "Melee",
        keywords: ["CLEAVE 2"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any weapons, armour, or equipment",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADEPTUS MECHANICUS
// ─────────────────────────────────────────────────────────────────────────────
const ADEPTUS_MECHANICUS: FixedKitUnit[] = [
  {
    id: "adm_servitor",
    displayName: "Servitor",
    faction: "Adeptus Mechanicus",
    fixedArmour: { name: "Light Armour Plating", modifier: -1, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
  },
  {
    id: "adm_kataphron",
    displayName: "Kataphron Battle Servitor",
    faction: "Adeptus Mechanicus",
    fixedArmour: { name: "Armour Plating", modifier: -2, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
  },
  {
    id: "adm_kastelan_robot",
    displayName: "Kastelan Robot",
    faction: "Adeptus Mechanicus",
    fixedWeapons: [
      {
        name: "Kastelan Fists",
        type: "Melee",
        keywords: ["+1 INJURY MODIFIER", "HEAVY"],
        notes: "Included in cost",
      },
      {
        name: "Flamethrower (built-in)",
        type: "Ranged",
        range: '8"',
        keywords: ["FLAMETHROWER", "IGNORE ARMOUR", "-1 INJURY DICE", "FIRE"],
        notes: "Included in cost; does not count towards normal LIMIT",
      },
    ],
    fixedArmour: { name: "Heavy Armour Plating", modifier: -3, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Can equip additional ranged weapons from the Mechanicus armoury",
  },
  {
    id: "adm_sicarian_ruststalker",
    displayName: "Sicarian Ruststalker",
    faction: "Adeptus Mechanicus",
    fixedWeapons: [
      {
        name: "Chordclaw",
        type: "Melee",
        keywords: [],
        notes: "Takes no hands; grants an extra attack whenever the wielder takes the Fight Action",
      },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "adm_scyllax_automata",
    displayName: "Scyllax Automata",
    faction: "Adeptus Mechanicus",
    subfaction: "Dark Mechanicum",
    fixedWeapons: [
      {
        name: "Dismembering Mechadendrites",
        type: "Melee",
        keywords: ["CRITICAL"],
        notes: "Mode: Whirl — hits all targets in melee during wielder's Activation; Mode: Dismember — +1 INJURY DICE, ARMOUR PIERCING 1",
      },
    ],
    fixedArmour: { name: "Armour Plating", modifier: -2, notes: "Included in cost" },
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADEPTUS CUSTODES
// ─────────────────────────────────────────────────────────────────────────────
const ADEPTUS_CUSTODES: FixedKitUnit[] = [
  {
    id: "ac_shield_captain",
    displayName: "Shield-Captain",
    faction: "Adeptus Custodes",
    fixedEquipment: [
      {
        name: "Auramite Armour or Aquilon Armour",
        effect:
          "Auramite: -3, HEAVY. Aquilon: -3, HEAVY, DEEP STRIKE, STRONG, VEHICLE. Included in cost; player chooses one.",
      },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "ac_custodian_guard",
    displayName: "Custodian Guard",
    faction: "Adeptus Custodes",
    fixedEquipment: [
      { name: "Auramite Armour", effect: "-3 INJURY MODIFIER, HEAVY. Included in cost." },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "ac_aquilon_terminator",
    displayName: "Aquilon Terminator",
    faction: "Adeptus Custodes",
    fixedEquipment: [
      { name: "Aquilon Armour", effect: "-3 INJURY MODIFIER, HEAVY, DEEP STRIKE, STRONG, VEHICLE. Included in cost." },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "ac_contemptor_dreadnought",
    displayName: "Contemptor Dreadnought",
    faction: "Adeptus Custodes",
    fixedArmour: { name: "Heavy Armour Plating", modifier: -3, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "If equipped only with ranged weapons, also counts as equipped with a CCW",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADEPTUS MINISTORUM
// ─────────────────────────────────────────────────────────────────────────────
const ADEPTUS_MINISTORUM: FixedKitUnit[] = [
  {
    id: "ami_miraculist",
    displayName: "The Miraculist",
    faction: "Adeptus Ministorum",
    fixedWeapons: [
      {
        name: "Burning Hands",
        type: "Melee",
        keywords: ["+1 INJURY DICE", "IGNORE ARMOUR", "FIRE"],
        notes: "Hits automatically; once per battle",
      },
      {
        name: "Holy Light",
        type: "Ranged",
        range: '12"',
        keywords: ["IGNORE COVER", "IGNORE ARMOUR", "CRITICAL", "FIRE"],
        notes: "Once per battle",
      },
      {
        name: "Wreath In Fire",
        type: "Ranged",
        range: '0" / BLAST 6"',
        keywords: ["FLAMETHROWER", "IGNORE ARMOUR", "FIRE"],
        notes: "Once per battle",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ASTRA MILITARUM
// ─────────────────────────────────────────────────────────────────────────────
const ASTRA_MILITARUM: FixedKitUnit[] = [
  {
    id: "am_conscript",
    displayName: "Conscript",
    faction: "Astra Militarum",
    fixedWeapons: [
      {
        name: "Lasgun",
        type: "Ranged",
        range: '24"',
        keywords: ["TWO-HANDED"],
      },
      {
        name: "Bayonet",
        type: "Melee",
        keywords: [],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Must be equipped with a Lasgun and Bayonet; cannot equip anything else",
  },
  {
    id: "am_battlemutt",
    displayName: "Battlemutt",
    faction: "Astra Militarum",
    subfaction: "Ratling Regiment",
    fixedWeapons: [
      {
        name: "Bite",
        type: "Melee",
        keywords: [],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment (Standard Armour is the only allowable addition)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// OFFICIO ASSASSINORUM
// ─────────────────────────────────────────────────────────────────────────────
const OFFICIO_ASSASSINORUM: FixedKitUnit[] = [
  {
    id: "oa_culexus_assassin",
    displayName: "Culexus Assassin",
    faction: "Officio Assassinorum",
    fixedWeapons: [
      {
        name: "Animus Speculum",
        type: "Ranged",
        range: '18"',
        keywords: ["+2 INJURY DICE"],
        notes: "Additional +1 INJURY DICE against DAEMON or PSYKER models. Cannot be removed.",
      },
      {
        name: "Life-Draining Touch",
        type: "Melee",
        keywords: ["IGNORE ARMOUR", "PSYCHIC"],
        notes: "+1 INJURY DICE against DAEMON or PSYKER; removes 1 BLOOD MARKER from attacker on any hit. Cannot be removed.",
      },
    ],
    fixedEquipment: [
      { name: "Combat Helmet", effect: "NEGATE SHRAPNEL. Included in cost; cannot be removed." },
    ],
    canEquipOtherWeapons: false,
    notes: "Always equipped with these; cannot be removed",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ROGUE TRADER
// ─────────────────────────────────────────────────────────────────────────────
const ROGUE_TRADER: FixedKitUnit[] = [
  {
    id: "rt_navigator_scion",
    displayName: "Navigator Scion",
    faction: "Rogue Trader",
    fixedWeapons: [
      {
        name: "Third Eye",
        type: "Ranged",
        range: '12"',
        keywords: ["IGNORE ARMOUR", "PSYCHIC", "RISKY"],
        notes: "Psychic power included in cost (Attack type)",
      },
    ],
    canEquipOtherWeapons: true,
    notes: "Third Eye is a psychic power included in the Navigator Scion's price",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// THE INQUISITION
// ─────────────────────────────────────────────────────────────────────────────
const THE_INQUISITION: FixedKitUnit[] = [
  {
    id: "ti_inquisitor",
    displayName: "Inquisitor",
    faction: "The Inquisition",
    fixedEquipment: [
      { name: "Rosarius", effect: "-1 INJURY MODIFIER (shield-like). Included in cost." },
    ],
    canEquipOtherWeapons: true,
    notes: "The Rosarius is included in cost but the Inquisitor may otherwise equip freely",
  },
  {
    id: "ti_daemonhost",
    displayName: "Daemonhost",
    faction: "The Inquisition",
    subfaction: "Ordo: Malleus",
    fixedWeapons: [
      {
        name: "Energy Torrent",
        type: "Ranged",
        range: '24"',
        keywords: ["IGNORE COVER", "BLAST 2\"", "PSYCHIC", "RISKY"],
      },
      {
        name: "Unholy Gaze",
        type: "Ranged",
        range: '18"',
        keywords: ["ARMOUR PIERCING 1", "PSYCHIC", "RISKY", "STUN"],
      },
      {
        name: "Warp Grasp",
        type: "Melee",
        keywords: ["IGNORE ARMOUR", "PSYCHIC", "RISKY"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any weapons, armour, or equipment — psychic powers provide all attacks",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NECROMUNDA GANG
// ─────────────────────────────────────────────────────────────────────────────
const NECROMUNDA_GANG: FixedKitUnit[] = [
  // Ash Waste Nomads
  {
    id: "ng_arthromite_duneskuttler",
    displayName: "Arthromite Duneskuttler",
    faction: "Necromunda Gang",
    subfaction: "Ash Waste Nomads",
    fixedWeapons: [
      {
        name: "Mandibles",
        type: "Melee",
        keywords: ["CLEAVE 2", "+1 INJURY DICE"],
      },
    ],
    fixedArmour: { name: "Heavy Carapace", modifier: -3, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "ng_arthromite_spinewyrm",
    displayName: "Arthromite Spinewyrm",
    faction: "Necromunda Gang",
    subfaction: "Ash Waste Nomads",
    fixedWeapons: [
      {
        name: "Anticoagulant Bite",
        type: "Melee",
        keywords: ["GAS"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  // House Cawdor
  {
    id: "ng_bomb_delivery_rat",
    displayName: "Bomb Delivery Rat",
    faction: "Necromunda Gang",
    subfaction: "House Cawdor",
    fixedWeapons: [
      {
        name: "Bomb (self-destruct)",
        type: "Ranged",
        range: "BLAST 3\"",
        keywords: ["BLAST 3\""],
        notes: "Triggered at will or when enemy comes within 3\"; BLAST 3\" targeting the rat itself. Models within 1\" roll injuries with +1 DICE. Rat is automatically a casualty.",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Equipped with its Bomb and nothing else; counts as equipped with a CCW",
  },
  {
    id: "ng_stig_shambler",
    displayName: "Stig-Shambler",
    faction: "Necromunda Gang",
    subfaction: "House Cawdor",
    fixedWeapons: [
      {
        name: "Twin-Linked Heavy Stubber",
        type: "Ranged",
        range: '36"',
        keywords: ["+1 DICE", "AUTOMATIC 2"],
        notes: "Included in cost and statistics",
      },
      {
        name: "Two-Handed Hammer",
        type: "Melee",
        keywords: ["+1 INJURY MODIFIER", "HEAVY", "TWO-HANDED"],
        notes: "Included in cost and statistics",
      },
    ],
    fixedEquipment: [{ name: "Standard Armour", effect: "-1 INJURY MODIFIER. Included in cost." }],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  // House Delaque
  {
    id: "ng_cephalopod_spektor",
    displayName: "Cephalopod Spektor",
    faction: "Necromunda Gang",
    subfaction: "House Delaque",
    fixedWeapons: [
      {
        name: "Shock Tendrils",
        type: "Melee",
        keywords: ["FIRE", "TWO-HANDED"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "ng_piscean_spektor",
    displayName: "Piscean Spektor",
    faction: "Necromunda Gang",
    subfaction: "House Delaque",
    fixedWeapons: [
      {
        name: "Psychomantic Claw",
        type: "Melee",
        keywords: ["FIRE"],
        notes: "Two Claws (IGNORE OFF-HAND)",
      },
    ],
    fixedArmour: { name: "Light Armour Plating", modifier: -1, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "ng_psychoterric_wyrm",
    displayName: "Psychoterric Wyrm",
    faction: "Necromunda Gang",
    subfaction: "House Delaque",
    fixedWeapons: [
      {
        name: "Ferocious Jaws",
        type: "Melee",
        keywords: ["CRITICAL"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  // House Escher
  {
    id: "ng_khimerix",
    displayName: "Khimerix",
    faction: "Necromunda Gang",
    subfaction: "House Escher",
    fixedWeapons: [
      {
        name: "Chemical Cloud Breath",
        type: "Ranged",
        range: '6"',
        keywords: ["AUTOMATIC 2", "FLAMETHROWER", "IGNORE ARMOUR", "-1 INJURY DICE", "GAS"],
      },
      {
        name: "Claws",
        type: "Melee",
        keywords: ["CLEAVE 2", "CRITICAL"],
        notes: "Khimerix melee profile uses CLEAVE 2.",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "ng_phelynx_cat",
    displayName: "Phelynx",
    faction: "Necromunda Gang",
    subfaction: "House Escher",
    fixedWeapons: [
      {
        name: "Venomous Bite",
        type: "Melee",
        keywords: ["GAS", "RISKY"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "ng_phyrr_cat",
    displayName: "Phyrr Cat",
    faction: "Necromunda Gang",
    subfaction: "House Escher",
    fixedWeapons: [
      {
        name: "Sharp Talon",
        type: "Melee",
        keywords: ["CRITICAL"],
        notes: "Two talons; IGNORE OFF-HAND",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  // House Goliath
  {
    id: "ng_sumpkroc",
    displayName: "Sumpkroc",
    faction: "Necromunda Gang",
    subfaction: "House Goliath",
    fixedWeapons: [
      {
        name: "Ferocious Jaws",
        type: "Melee",
        keywords: ["+1 INJURY DICE", "CRITICAL"],
      },
    ],
    fixedArmour: { name: "Natural Hide", modifier: -1, notes: "Included in statistics" },
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "ng_zerker",
    displayName: "'Zerker",
    faction: "Necromunda Gang",
    subfaction: "House Goliath",
    fixedWeapons: [
      {
        name: "Open Fist",
        type: "Melee",
        keywords: ["+1 INJURY MODIFIER"],
        notes: "Two fists; IGNORE OFF-HAND",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  // House Orlock
  {
    id: "ng_cyber_mastiff",
    displayName: "Cyber Mastiff",
    faction: "Necromunda Gang",
    subfaction: "House Orlock",
    fixedWeapons: [
      {
        name: "Savage Bite",
        type: "Melee",
        keywords: ["ARMOUR PIERCING 1"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  // House Van Saar
  {
    id: "ng_servo_suit",
    displayName: "Servo-Suit",
    faction: "Necromunda Gang",
    subfaction: "House Van Saar",
    fixedWeapons: [
      {
        name: "Servo Arms",
        type: "Melee",
        keywords: ["IGNORE OFF-HAND"],
        notes: "Four arms; all can attack as part of one Fight Action. Each ranged weapon equipped removes one arm.",
      },
    ],
    fixedArmour: { name: "Heavy Armour Plating", modifier: -2, notes: "Included in cost and statistics (upgrade to -3 available)" },
    canEquipOtherWeapons: true,
    notes: "Can equip up to two TWO-HANDED ranged weapons (each removes one Servo Arm); cannot equip other armour/equipment",
  },
  {
    id: "ng_cyberachnid",
    displayName: "Cyberachnid",
    faction: "Necromunda Gang",
    subfaction: "House Van Saar",
    fixedWeapons: [
      {
        name: "Venomous Bite",
        type: "Melee",
        keywords: ["GAS"],
      },
      {
        name: "Web Projector",
        type: "Ranged",
        range: '12"',
        keywords: ["+1 INJURY DICE", "ASSAULT", "IGNORE ARMOUR", "NONLETHAL", "STUN MARKERS", "STUN"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "ng_techmite",
    displayName: "Techmite",
    faction: "Necromunda Gang",
    subfaction: "Ironhead Squat Prospectors",
    fixedArmour: { name: "Light Armour Plating", modifier: -1, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Can equip Techmite-specific weapons (Arc Welder, Claw, Drill, Laser) and limited equipment",
  },
  {
    id: "ng_exo_driller",
    displayName: "Exo-Driller",
    faction: "Necromunda Gang",
    subfaction: "Ironhead Squat Prospectors",
    fixedArmour: { name: "Heavy Armour Plating", modifier: -3, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Can equip any weapon or equipment from the Necromunda Gang Shared Armoury or Ironhead Squat Armoury",
  },
  // Palanite Enforcers
  {
    id: "ng_hardcase_cyber_mastiff",
    displayName: "Hardcase Cyber Mastiff",
    faction: "Necromunda Gang",
    subfaction: "Palanite Enforcers",
    fixedWeapons: [
      {
        name: "Savage Bite",
        type: "Melee",
        keywords: ["ARMOUR PIERCING 1", "NEGATE GAS"],
      },
    ],
    fixedArmour: { name: "Heavy Plating", modifier: -2, notes: "Included in statistics" },
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "ng_sanctioner_automata",
    displayName: "Sanctioner Automata",
    faction: "Necromunda Gang",
    subfaction: "Palanite Enforcers",
    fixedWeapons: [
      {
        name: "Pacifier Assault Claw",
        type: "Melee",
        keywords: ["CRITICAL"],
        notes: "Occupies one hand in melee; included in cost",
      },
    ],
    fixedArmour: { name: "Heavy Armour Plating", modifier: -2, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Can equip additional weapons from the Necromunda Gang Shared Armoury or Palanite Enforcers Armoury; cannot equip other armour or equipment",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PIRATE CREW
// Note: No Pirate Crew units have fixed built-in weapons baked into their cost.
// The Zoat background grants -2 Armour from natural scales, but it is a
// background option for generic Pirate models, not a distinct fixed-kit unit.
// ─────────────────────────────────────────────────────────────────────────────
const PIRATE_CREW: FixedKitUnit[] = [];

// ─────────────────────────────────────────────────────────────────────────────
// AELDARI
// ─────────────────────────────────────────────────────────────────────────────
const AELDARI: FixedKitUnit[] = [
  {
    id: "ae_windrider",
    displayName: "Windrider",
    faction: "Aeldari",
    fixedArmour: { name: "Mesh Armour", modifier: -1, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Has only one hand for melee (can hold two-handed with Shield Combo); can equip any Aeldari weapons/equipment",
  },
  {
    id: "ae_wraithseer",
    displayName: "Wraithseer",
    faction: "Aeldari",
    subfaction: "Spirit Conclave",
    fixedArmour: { name: "Wraithbone Plating", modifier: -3, notes: "Included in statistics" },
    canEquipOtherWeapons: true,
    notes: "Must equip at least one PSYCHIC weapon; can also equip a Force Shield",
  },
  {
    id: "ae_wraithlord",
    displayName: "Wraithlord",
    faction: "Aeldari",
    subfaction: "Spirit Conclave",
    fixedArmour: { name: "Wraithbone Plating", modifier: -3, notes: "Included in statistics" },
    canEquipOtherWeapons: true,
    notes: "Counts as Wraith for battlekit limits; can equip any Aeldari weapons and a Force Shield",
  },
  {
    id: "ae_yncarne",
    displayName: "The Yncarne",
    faction: "Aeldari",
    subfaction: "Ynnari",
    fixedWeapons: [
      {
        name: "Swirling Soul Energy",
        type: "Ranged",
        range: '6"',
        keywords: ["ASSAULT"],
        notes: "Automatically hits each enemy within range",
      },
      {
        name: "Vilith-zhar, the Sword of Souls — Piercing Strike",
        type: "Melee",
        keywords: ["IGNORE ARMOUR", "+1 INJURY DICE"],
        notes: "-DICE cannot be applied to the Injury roll",
      },
      {
        name: "Vilith-zhar, the Sword of Souls — Sweeping Blow",
        type: "Melee",
        keywords: ["SWEEPING", "IGNORE ARMOUR"],
      },
    ],
    fixedArmour: { name: "Armour Plating", modifier: -2, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment; acquirable only via Ynnari Soul Bond",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DRUKHARI
// ─────────────────────────────────────────────────────────────────────────────
const DRUKHARI: FixedKitUnit[] = [
  {
    id: "dru_reaver",
    displayName: "Reaver",
    faction: "Drukhari",
    fixedArmour: { name: "Mesh Armour", modifier: -1, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Has only one hand for melee (can hold two-handed with Shield Combo); jetbike — FLYING, VEHICLE",
  },
  {
    id: "dru_cronos",
    displayName: "Cronos",
    faction: "Drukhari",
    fixedArmour: { name: "Heavy Armour Plating", modifier: -2, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Can equip a Spirit Syphon, Spirit Vortex, Spirit Probe, and/or Spirit-Leech Tentacles; cannot equip any other weapons, armour, or equipment",
  },
  {
    id: "dru_talos",
    displayName: "Talos",
    faction: "Drukhari",
    fixedArmour: { name: "Heavy Armour Plating", modifier: -2, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Can equip weapons from the Drukhari Equipped List (including Wrack/Haemonculus weapons); cannot equip other armour or equipment",
  },
  {
    id: "dru_medusae",
    displayName: "Medusae",
    faction: "Drukhari",
    subfaction: "Court of the Archon",
    fixedWeapons: [
      {
        name: "Eyeburst",
        type: "Ranged",
        range: '10"',
        keywords: ["AUTOMATIC 2", "FLAMETHROWER", "-1 INJURY DICE", "IGNORE ARMOUR"],
        notes: "On Minor Hit result, a non-Down target falls Down. Included in cost.",
      },
    ],
    canEquipOtherWeapons: true,
    notes: "Can also equip melee weapons, armour, or equipment from the Drukhari Battlekit list",
  },
  {
    id: "dru_ur_ghul",
    displayName: "Ur-Ghul",
    faction: "Drukhari",
    subfaction: "Court of the Archon",
    fixedWeapons: [
      {
        name: "Ur-Ghul Talons",
        type: "Melee",
        keywords: ["ARMOUR PIERCING 1", "IGNORE OFF-HAND"],
        notes: "Two talons, included in cost",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "dru_clawed_fiend",
    displayName: "Clawed Fiend",
    faction: "Drukhari",
    subfaction: "Wych Cult",
    fixedWeapons: [
      {
        name: "Fists",
        type: "Melee",
        keywords: ["CLEAVE 2", "+1 INJURY MODIFIER"],
      },
      {
        name: "Stinger",
        type: "Melee",
        keywords: ["GAS"],
      },
    ],
    fixedArmour: { name: "Thick Hide", modifier: -1, notes: "Included in cost" },
    canEquipOtherWeapons: false,
    notes: "Can attack with Fists and Stinger as part of the same Fight Action. Cannot equip anything else.",
  },
  {
    id: "dru_khymera",
    displayName: "Khymera",
    faction: "Drukhari",
    subfaction: "Wych Cult",
    fixedWeapons: [
      {
        name: "Khymerae Talons",
        type: "Melee",
        keywords: ["CLEAVE 2", "CRITICAL"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "dru_razorwing_flock",
    displayName: "Razorwing Flock",
    faction: "Drukhari",
    subfaction: "Wych Cult",
    fixedWeapons: [
      {
        name: "Razorwing Feathers",
        type: "Melee",
        keywords: ["CRITICAL"],
        notes: "Hits all targets in melee during wielder's Activation",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "dru_grotesque",
    displayName: "Grotesque",
    faction: "Drukhari",
    subfaction: "Haemonculus Coven",
    fixedWeapons: [
      {
        name: "Liquifier Gun",
        type: "Ranged",
        range: '8"',
        keywords: ["FLAMETHROWER", "IGNORE ARMOUR", "-1 INJURY DICE", "GAS", "TWO-HANDED"],
        notes: "Does not count towards normal LIMIT",
      },
      {
        name: "Monstrous Weapons",
        type: "Melee",
        keywords: ["+1 INJURY DICE", "HEAVY"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons, armour, or equipment",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HARLEQUINS
// ─────────────────────────────────────────────────────────────────────────────
const HARLEQUINS: FixedKitUnit[] = [
  {
    id: "hq_troupe_master",
    displayName: "Troupe Master",
    faction: "Harlequins",
    fixedEquipment: [
      { name: "Holo Suit", effect: "All attacks have -1 DICE to Hit against the wearer. Included in cost." },
      { name: "Flip Belt", effect: "Auto-succeed Climb/Jump rolls; +1 DICE Diving Charge; no falling damage. Included in cost." },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "hq_death_jester",
    displayName: "Death Jester",
    faction: "Harlequins",
    fixedEquipment: [
      { name: "Holo Suit", effect: "All attacks have -1 DICE to Hit. Included in cost." },
      { name: "Flip Belt", effect: "Auto-succeed Climb/Jump; no fall damage. Included in cost." },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "hq_shadowseer",
    displayName: "Shadowseer",
    faction: "Harlequins",
    fixedEquipment: [
      { name: "Holo Suit", effect: "All attacks have -1 DICE to Hit. Included in cost." },
      { name: "Flip Belt", effect: "Auto-succeed Climb/Jump; no fall damage. Included in cost." },
    ],
    canEquipOtherWeapons: true,
    notes: "Must also equip at least one PSYCHIC weapon (purchased separately)",
  },
  {
    id: "hq_solitaire",
    displayName: "Solitaire",
    faction: "Harlequins",
    fixedEquipment: [
      { name: "Holo Suit", effect: "All attacks have -1 DICE to Hit. Included in cost." },
      { name: "Flip Belt", effect: "Auto-succeed Climb/Jump; no fall damage. Included in cost." },
    ],
    canEquipOtherWeapons: true,
    notes: "Melee weapons only",
  },
  {
    id: "hq_mime",
    displayName: "Mime",
    faction: "Harlequins",
    fixedEquipment: [
      { name: "Flip Belt", effect: "Auto-succeed Climb/Jump; no fall damage. Included in cost." },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "hq_player",
    displayName: "Player",
    faction: "Harlequins",
    fixedEquipment: [
      { name: "Holo Suit", effect: "All attacks have -1 DICE to Hit. Included in cost." },
      { name: "Flip Belt", effect: "Auto-succeed Climb/Jump; no fall damage. Included in cost." },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "hq_skyweaver",
    displayName: "Skyweaver",
    faction: "Harlequins",
    fixedEquipment: [
      { name: "Holo Suit", effect: "All attacks have -1 DICE to Hit. Included in cost." },
    ],
    fixedArmour: { name: "Light Armour Plating", modifier: -1, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Has only one hand for melee (can hold two-handed with Shield Combo); FLYING, VEHICLE",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LEAGUES OF VOTANN
// ─────────────────────────────────────────────────────────────────────────────
const LEAGUES_OF_VOTANN: FixedKitUnit[] = [
  {
    id: "lov_einhyr_hearthguard",
    displayName: "Einhyr Hearthguard",
    faction: "Leagues of Votann",
    fixedEquipment: [
      { name: "Power Armour", effect: "-2 INJURY MODIFIER. Must be equipped; included in cost and statistics." },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "lov_brokhyr_thunderkyn",
    displayName: "Brôkhyr Thunderkyn",
    faction: "Leagues of Votann",
    fixedEquipment: [
      { name: "Power Armour", effect: "-2 INJURY MODIFIER. Must be equipped; included in cost and statistics." },
    ],
    canEquipOtherWeapons: true,
  },
  {
    id: "lov_ironkin_steeljack",
    displayName: "Ironkin Steeljack",
    faction: "Leagues of Votann",
    fixedArmour: { name: "Heavy Armour Plating", modifier: -3, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
  },
  {
    id: "lov_hernkyn_pioneer",
    displayName: "Hernkyn Pioneer",
    faction: "Leagues of Votann",
    fixedArmour: { name: "Heavy Armour Plating", modifier: -2, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "FLYING, VEHICLE",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NECRONS
// ─────────────────────────────────────────────────────────────────────────────
const NECRONS: FixedKitUnit[] = [
  {
    id: "nc_necron_lord",
    displayName: "Necron Lord",
    faction: "Necrons",
    fixedArmour: { name: "Necrodermis", modifier: -3, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
  },
  {
    id: "nc_cryptek",
    displayName: "Cryptek",
    faction: "Necrons",
    fixedArmour: { name: "Necrodermis", modifier: -2, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
    notes: "Must be equipped with exactly one Staff (from the Necrons armoury, paid separately)",
  },
  {
    id: "nc_royal_warden",
    displayName: "Royal Warden",
    faction: "Necrons",
    fixedArmour: { name: "Necrodermis", modifier: -2, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
  },
  {
    id: "nc_warrior",
    displayName: "Necron Warrior",
    faction: "Necrons",
    fixedArmour: { name: "Necrodermis", modifier: -2, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
  },
  {
    id: "nc_immortal",
    displayName: "Immortal",
    faction: "Necrons",
    fixedArmour: { name: "Necrodermis", modifier: -3, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
  },
  {
    id: "nc_canoptek_scarab_swarm",
    displayName: "Canoptek Scarab Swarm",
    faction: "Necrons",
    fixedWeapons: [
      {
        name: "Feeder Mandibles",
        type: "Melee",
        keywords: [],
        notes: "Hits all targets in melee during wielder's Activation",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Always equipped with Feeder Mandibles; cannot be equipped with any other weapons or equipment",
  },
  {
    id: "nc_canoptek_spyder",
    displayName: "Canoptek Spyder",
    faction: "Necrons",
    subfaction: "Canoptek Court",
    fixedWeapons: [
      {
        name: "Automaton Claws",
        type: "Melee",
        keywords: ["+1 INJURY DICE", "TWO-HANDED"],
        notes: "Included in cost",
      },
    ],
    fixedArmour: { name: "Necrodermis", modifier: -2, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
    notes: "Can also equip ranged weapons from the Necrons Battlekit list",
  },
  {
    id: "nc_apprentek",
    displayName: "Apprentek",
    faction: "Necrons",
    fixedWeapons: [
      {
        name: "Staff of Light",
        type: "Ranged",
        range: '18"',
        keywords: ["ARMOUR PIERCING 1"],
        notes: "Included in cost; ignores normal restrictions on equipping it",
      },
    ],
    fixedArmour: { name: "Necrodermis", modifier: -2, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
  },
  {
    id: "nc_macrocyte_warrior",
    displayName: "Macrocyte Warrior",
    faction: "Necrons",
    fixedArmour: { name: "Necrodermis", modifier: -1, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
    notes: "FLYING",
  },
  {
    id: "nc_lokhust_lord",
    displayName: "Lokhust Lord",
    faction: "Necrons",
    subfaction: "Destroyer Cult",
    fixedArmour: { name: "Necrodermis", modifier: -2, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
    notes: "FLYING",
  },
  {
    id: "nc_skorpekh_lord",
    displayName: "Skorpekh Lord",
    faction: "Necrons",
    subfaction: "Destroyer Cult",
    fixedArmour: { name: "Necrodermis", modifier: -2, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
  },
  {
    id: "nc_hexmark_destroyer",
    displayName: "Hexmark Destroyer",
    faction: "Necrons",
    subfaction: "Destroyer Cult",
    fixedArmour: { name: "Necrodermis", modifier: -2, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
    notes: "Has six arms, each holding one one-handed weapon (weapons chosen from armoury)",
  },
  {
    id: "nc_lokhust_destroyer",
    displayName: "Lokhust Destroyer",
    faction: "Necrons",
    subfaction: "Destroyer Cult",
    fixedArmour: { name: "Necrodermis", modifier: -2, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
    notes: "FLYING",
  },
  {
    id: "nc_ophydian_destroyer",
    displayName: "Ophydian Destroyer",
    faction: "Necrons",
    subfaction: "Destroyer Cult",
    fixedArmour: { name: "Necrodermis", modifier: -1, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
    notes: "BURROW, DEEP STRIKE (TUNNEL); melee weapons only",
  },
  {
    id: "nc_skorpekh_destroyer",
    displayName: "Skorpekh Destroyer",
    faction: "Necrons",
    subfaction: "Destroyer Cult",
    fixedArmour: { name: "Necrodermis", modifier: -2, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
  },
  {
    id: "nc_flayer_king",
    displayName: "Flayer King",
    faction: "Necrons",
    subfaction: "Court of the Flayer King",
    fixedWeapons: [
      {
        name: "Lord's Claw",
        type: "Melee",
        keywords: ["IGNORE OFF-HAND", "IGNORE ARMOUR", "CRITICAL"],
        notes: "Two claws",
      },
    ],
    fixedArmour: { name: "Necrodermis", modifier: -3, notes: "Included in statistics above" },
    canEquipOtherWeapons: true,
    notes: "Can equip equipment from Necron Battlekit list",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ORKS
// ─────────────────────────────────────────────────────────────────────────────
const ORKS: FixedKitUnit[] = [
  {
    id: "ork_weirdboy",
    displayName: "Weirdboy",
    faction: "Orks",
    fixedWeapons: [
      {
        name: "Weirdboy Staff",
        type: "Melee",
        keywords: ["+1 DICE", "PSYCHIC", "HELD", "MAIN HAND ONLY"],
        notes: "+1 INJURY DICE against DAEMON or PSYKER models. Included in cost above.",
      },
    ],
    canEquipOtherWeapons: true,
    notes: "Must be equipped with the Weirdboy Staff (included in cost); can also equip other weapons/equipment",
  },
  {
    id: "ork_squig",
    displayName: "Squig",
    faction: "Orks",
    fixedWeapons: [
      {
        name: "Squig Jaws",
        type: "Melee",
        keywords: ["SHRAPNEL"],
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Equipped with its Squig Jaws and can be fitted with a Squig Bomb; cannot equip any other weapons, armour, or equipment",
  },
  {
    id: "ork_deff_dread",
    displayName: "Deff Dread",
    faction: "Orks",
    fixedWeapons: [
      {
        name: "Dread Klaws",
        type: "Melee",
        keywords: ["DEADLY", "HEAVY", "RISKY"],
        notes: "Included in cost and statistics",
      },
    ],
    fixedArmour: { name: "Heavy Armour Plating", modifier: -3, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Can equip up to two ranged weapons (can carry two TWO-HANDED ranged weapons); up to one Assistant equipment",
  },
  {
    id: "ork_squighog_boy",
    displayName: "Squighog Boy",
    faction: "Orks",
    subfaction: "Da Big Hunt",
    fixedWeapons: [
      {
        name: "Squighog Jaws",
        type: "Melee",
        keywords: ["ARMOUR PIERCING 1", "SHRAPNEL"],
        notes: "Included in cost. Can attack with these jaws in addition to any other weapons when taking the Fight Action.",
      },
    ],
    canEquipOtherWeapons: true,
    notes: "Can equip Pistols, Stikkas, melee weapons, armour, or equipment from the Orks Armoury",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TYRANIDS
// ─────────────────────────────────────────────────────────────────────────────
const TYRANIDS: FixedKitUnit[] = [
  {
    id: "ty_hive_tyrant",
    displayName: "Hive Tyrant",
    faction: "Tyranids",
    fixedArmour: {
      name: "Super Dense Carapace",
      modifier: -3,
      notes: "Part of physical biology; included in statistics above",
    },
    canEquipOtherWeapons: true,
  },
  {
    id: "ty_tyrant_guard",
    displayName: "Tyrant Guard",
    faction: "Tyranids",
    fixedArmour: {
      name: "Armoured Shell",
      modifier: -3,
      notes: "Part of physical biology; included in statistics above",
    },
    canEquipOtherWeapons: true,
  },
  {
    id: "ty_ripper_swarm",
    displayName: "Ripper Swarm",
    faction: "Tyranids",
    fixedWeapons: [
      {
        name: "Spinemaws",
        type: "Ranged",
        range: '8"',
        keywords: ["AUTOMATIC 2", "ASSAULT"],
      },
      {
        name: "Swarming Claws",
        type: "Melee",
        keywords: [],
        notes: "Hits all targets in melee during wielder's Activation",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Always equipped with Spinemaws and Swarming Claws; cannot be equipped with any other weapons or equipment",
  },
  {
    id: "ty_spore_mine",
    displayName: "Spore Mine",
    faction: "Tyranids",
    fixedWeapons: [
      {
        name: "Spore Burst (self-destruct)",
        type: "Ranged",
        range: "BLAST 3\"",
        keywords: ["BLAST 3\"", "GAS", "IGNORE ARMOUR"],
        notes: "Triggered any time during Activation or when an enemy comes within 3\"; mine is automatically a casualty",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any weapons or equipment",
  },
  {
    id: "ty_mucolid_spore",
    displayName: "Mucolid Spore",
    faction: "Tyranids",
    subfaction: "Hive Guardians",
    fixedWeapons: [
      {
        name: "Spore Explosion (self-destruct)",
        type: "Ranged",
        range: "BLAST 3\"",
        keywords: ["BLAST 3\"", "+1 INJURY DICE", "GAS", "IGNORE ARMOUR"],
        notes: "Triggered any time during Activation or when an enemy comes within 3\"; spore is automatically a casualty",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any weapons or equipment",
  },
  {
    id: "ty_malanthrope",
    displayName: "Malanthrope",
    faction: "Tyranids",
    subfaction: "Assimilation Swarm",
    fixedWeapons: [
      {
        name: "Grasping Tail — Lash",
        type: "Melee",
        keywords: ["SHRAPNEL"],
        notes: "Enemies cannot Retreat from the wielder. One of three modes.",
      },
      {
        name: "Grasping Tail — Spear",
        type: "Melee",
        keywords: ["ARMOUR PIERCING 2"],
        notes: "One of three modes; enemies cannot Retreat from wielder",
      },
      {
        name: "Grasping Tail — Swipe",
        type: "Melee",
        keywords: ["SWEEPING"],
        notes: "One of three modes; enemies cannot Retreat from wielder",
      },
    ],
    canEquipOtherWeapons: true,
    notes: "Grasping Tail is included in price; can also equip equipment from the Tyranids Battlekit list",
  },
  {
    id: "ty_neurotyrant",
    displayName: "Neurotyrant",
    faction: "Tyranids",
    subfaction: "Synaptic Nexus",
    fixedWeapons: [
      {
        name: "Barbed Lashes",
        type: "Melee",
        keywords: ["CLEAVE 2", "SHRAPNEL", "BLOCK"],
        notes: "Included in price",
      },
    ],
    canEquipOtherWeapons: true,
    notes: "Can also equip equipment from the Tyranids Battlekit list",
  },
  {
    id: "ty_neuroloid",
    displayName: "Neuroloid",
    faction: "Tyranids",
    subfaction: "Synaptic Nexus",
    fixedWeapons: [
      {
        name: "Barbed Lash",
        type: "Melee",
        keywords: ["SHRAPNEL", "BLOCK"],
        notes: "Included in price",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Cannot be equipped with any other weapons or equipment",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GENESTEALER CULTS
// ─────────────────────────────────────────────────────────────────────────────
const GENESTEALER_CULTS: FixedKitUnit[] = [
  {
    id: "gc_aberrant",
    displayName: "Aberrant",
    faction: "Genestealer Cults",
    fixedWeapons: [
      {
        name: "Two-Handed Hammer",
        type: "Melee",
        keywords: ["+1 INJURY MODIFIER", "HEAVY", "TWO-HANDED"],
        notes: "Included in price",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Must be equipped with a Two-Handed Hammer; cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "gc_abominant",
    displayName: "Abominant",
    faction: "Genestealer Cults",
    fixedWeapons: [
      {
        name: "Thunder Hammer",
        type: "Melee",
        keywords: ["+1 INJURY MODIFIER", "HEAVY", "TWO-HANDED"],
        notes: "Included in price",
      },
    ],
    canEquipOtherWeapons: false,
    notes: "Equipped with a Thunder Hammer; cannot be equipped with any other weapons, armour, or equipment",
  },
  {
    id: "gc_patriarch",
    displayName: "Patriarch",
    faction: "Genestealer Cults",
    subfaction: "Broodcoven",
    fixedWeapons: [
      {
        name: "Patriarch Claws",
        type: "Melee",
        keywords: ["VICIOUS 10", "+1 INJURY DICE", "CRITICAL"],
        notes: "Two claws; IGNORE OFF-HAND. Included in cost.",
      },
    ],
    fixedArmour: { name: "Heavy Carapace", modifier: -2, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Can equip most equipment from the Genestealer Cults Armoury (no headgear, Medicae Kit, Grapnel Launcher, or hand-occupying equipment)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SLANNI
// ─────────────────────────────────────────────────────────────────────────────
const SLANNI: FixedKitUnit[] = [
  {
    id: "sl_brute",
    displayName: "Brute",
    faction: "Slanni",
    fixedArmour: {
      name: "Heavy Scales",
      modifier: -1,
      notes: "Natural biological armour; included in statistics above. Stacks with worn armour up to -3.",
    },
    canEquipOtherWeapons: true,
  },
  {
    id: "sl_amphi_walker",
    displayName: "Amphi Walker",
    faction: "Slanni",
    fixedWeapons: [
      {
        name: "Heavy Kick",
        type: "Melee",
        keywords: ["+1 flat to injuries", "HEAVY"],
        notes: "Included in cost",
      },
    ],
    fixedArmour: { name: "Heavy Armour Plating", modifier: -3, notes: "Included in cost and statistics" },
    canEquipOtherWeapons: true,
    notes: "Can also equip any single ranged weapon from the Slanni Battlekit list",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// T'AU EMPIRE
// ─────────────────────────────────────────────────────────────────────────────
const TAU_EMPIRE: FixedKitUnit[] = [
  {
    id: "tau_tau_drone_base",
    displayName: "T'au Drone (base)",
    faction: "T'au Empire",
    fixedArmour: { name: "Light Armour Plating", modifier: -1, notes: "Included in price and statistics" },
    canEquipOtherWeapons: false,
    notes: "Type-specific weapon/equipment is fixed at recruitment. Always counts as equipped with a CCW. Cannot equip anything other than its Type.",
  },
  {
    id: "tau_gun_drone",
    displayName: "T'au Drone — Gun Drone",
    faction: "T'au Empire",
    fixedWeapons: [
      {
        name: "Twin Pulse Carbines",
        type: "Ranged",
        range: '20"',
        keywords: ["+1 DICE", "ASSAULT"],
        notes: "Fixed type weapon; included",
      },
    ],
    fixedArmour: { name: "Light Armour Plating", modifier: -1, notes: "Included in price and statistics" },
    canEquipOtherWeapons: false,
  },
  {
    id: "tau_missile_drone",
    displayName: "T'au Drone — Missile Drone",
    faction: "T'au Empire",
    fixedWeapons: [
      {
        name: "Missile Pod",
        type: "Ranged",
        range: '30"',
        keywords: ["IGNORE COVER"],
        notes: "Fixed type weapon; included",
      },
    ],
    fixedArmour: { name: "Light Armour Plating", modifier: -1, notes: "Included in price and statistics" },
    canEquipOtherWeapons: false,
  },
  {
    id: "tau_sniper_drone",
    displayName: "T'au Drone — Sniper Drone",
    faction: "T'au Empire",
    fixedWeapons: [
      {
        name: "Longshot Pulse Rifle",
        type: "Ranged",
        range: '48"',
        keywords: ["+1 DICE"],
        notes: "Fixed type weapon; included",
      },
    ],
    fixedArmour: { name: "Light Armour Plating", modifier: -1, notes: "Included in price and statistics" },
    canEquipOtherWeapons: false,
  },
  {
    id: "tau_recon_drone",
    displayName: "T'au Drone — Recon Drone",
    faction: "T'au Empire",
    fixedWeapons: [
      {
        name: "Burst Cannon",
        type: "Ranged",
        range: '18"',
        keywords: ["+1 DICE"],
        notes: "Fixed type weapon; included",
      },
    ],
    fixedArmour: {
      name: "Heavy Armour Plating",
      modifier: -2,
      notes: "Upgraded to -2 instead of -1 for this type; included",
    },
    canEquipOtherWeapons: false,
  },
  {
    id: "tau_commander",
    displayName: "Commander",
    faction: "T'au Empire",
    fixedArmour: { name: "Battlesuit Plating", modifier: -2, notes: "Included in price and statistics" },
    canEquipOtherWeapons: true,
    notes: "FLYING, LARGE, VEHICLE, STRONG; can equip up to three hands worth of ranged weapons; always counts as having a CCW if two free hands",
  },
  {
    id: "tau_stealth_battlesuit",
    displayName: "Stealth Battlesuit",
    faction: "T'au Empire",
    fixedArmour: { name: "Battlesuit Plating", modifier: -2, notes: "Included in price" },
    canEquipOtherWeapons: true,
    notes: "FLYING, VEHICLE; can equip one Battlesuit Only weapon and Battlesuit Only equipment; always counts as having a CCW if two free hands",
  },
  {
    id: "tau_crisis_battlesuit",
    displayName: "Crisis Battlesuit",
    faction: "T'au Empire",
    fixedArmour: { name: "Battlesuit Plating", modifier: -2, notes: "Included in price" },
    canEquipOtherWeapons: true,
    notes: "FLYING, LARGE, VEHICLE; can equip Battlesuit Only weapons and equipment; can shoot with each of two ranged weapons per activation",
  },
  {
    id: "tau_broadside_battlesuit",
    displayName: "Broadside Battlesuit",
    faction: "T'au Empire",
    subfaction: "Retaliation Cadre",
    fixedArmour: { name: "Heavy Battlesuit Plating", modifier: -3, notes: "Included in price" },
    canEquipOtherWeapons: true,
    notes: "LARGE, VEHICLE; can equip Battlesuit Only weapons and equipment; counts as Two-Handed Hammer if two free hands in melee",
  },
  {
    id: "tau_krootox_rider",
    displayName: "Krootox Rider",
    faction: "T'au Empire",
    subfaction: "Kroot Kinband",
    fixedWeapons: [
      {
        name: "Krootox Fists",
        type: "Melee",
        keywords: ["+1 INJURY MODIFIER"],
        notes: "Two fists; take no hands. Can attack with each fist plus any other melee weapons (second fist counts as off-hand). Included in price.",
      },
    ],
    fixedArmour: { name: "Thick Hide", modifier: -1, notes: "Included in price" },
    canEquipOtherWeapons: true,
    notes: "Has only one hand for other weapons (can hold two-handed with Shield Combo); can equip Kroot Only weapons and equipment",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MASTER EXPORT — all factions grouped
// ─────────────────────────────────────────────────────────────────────────────
export const FIXED_KIT_UNITS_BY_FACTION: Record<string, FixedKitUnit[]> = {
  "Chaos Cult": CHAOS_CULT,
  "Heretic Astartes": HERETIC_ASTARTES,
  "The Vermintide": VERMINTIDE,
  "Adepta Sororitas": ADEPTA_SORORITAS,
  "Adeptus Astartes": ADEPTUS_ASTARTES,
  "Adeptus Mechanicus": ADEPTUS_MECHANICUS,
  "Adeptus Custodes": ADEPTUS_CUSTODES,
  "Adeptus Ministorum": ADEPTUS_MINISTORUM,
  "Astra Militarum": ASTRA_MILITARUM,
  "Officio Assassinorum": OFFICIO_ASSASSINORUM,
  "Rogue Trader": ROGUE_TRADER,
  "The Inquisition": THE_INQUISITION,
  "Necromunda Gang": NECROMUNDA_GANG,
  "Pirate Crew": PIRATE_CREW,
  Aeldari: AELDARI,
  Drukhari: DRUKHARI,
  Harlequins: HARLEQUINS,
  "Leagues of Votann": LEAGUES_OF_VOTANN,
  Necrons: NECRONS,
  Orks: ORKS,
  Tyranids: TYRANIDS,
  "Genestealer Cults": GENESTEALER_CULTS,
  Slanni: SLANNI,
  "T'au Empire": TAU_EMPIRE,
};

/** Flat array of every fixed-kit unit across all factions */
export const ALL_FIXED_KIT_UNITS: FixedKitUnit[] = Object.values(
  FIXED_KIT_UNITS_BY_FACTION
).flat();

export default FIXED_KIT_UNITS_BY_FACTION;
