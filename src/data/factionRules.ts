/**
 * Faction Special Rules
 * Quick-reference text for all factions, displayed below the faction selector
 * in the Army Builder. Format: rule name in **bold.** followed by description.
 */

import { UnitOption } from "../types";
import { cd_blue_horror, cd_pink_horror, cd_screamer } from "./factions_complete";

export interface FactionSpecialRulesData {
  title: string;
  rules: string[];
  quote?: string;

  variantOption?: {
      /** Checkbox label shown to the player (e.g. "Changehost", "Daemonkin") */
      label: string;
      /** Rules summary lines shown when the variant is active */
      rules: string[];
      /** Unit IDs additionally banned when the variant is active */
      bannedUnitIds: string[];
      /** Additional per-unit maxCount overrides merged with the subfaction's own overrides */
      unitMaxCountOverrides: Record<string, number>;
      /** Extra units from other factions made available when the variant is active */
      extraUnits: UnitOption[];
    };
}

/** Map from faction ID → special rules block. */
export const FACTION_RULES: Record<string, FactionSpecialRulesData> = {

  // ── Imperial Factions ──────────────────────────────────────────────────────

  adeptus_astartes: {
    title: 'Adeptus Astartes Special Rules',
    rules: [
      '**And They Shall Know No Fear.** Your ASTARTES models have NEGATE FEAR.',
      '**The Rubicon Primaris.** Any non-mercenary ASTARTES model (except Dreadnoughts) can take the Primaris upgrade for +5 credits (even after recruitment), gaining +1″ movement. During a campaign, when such a model is a casualty or suffers a Battle Scar, you may pay 5 credits and roll D6: on 4+ the model is saved and upgraded; on 1-3 it still counts as a casualty or suffers the Scar (but is still upgraded if it survives).',
      '**Gene Seeds.** During a campaign, when an ASTARTES model becomes a casualty, roll 1D6. On a 4+ (or 3+ with an Apothecary) add a Gene Seed to your reserves. Spend one Gene Seed when recruiting an ASTARTES model to reduce its cost by 30 credits.',
    ],
  },

  astra_militarum: {
    title: 'Astra Militarum Special Rules',
    rules: [
      '**Voice of Command.** As an Action (+1 DICE), an Elite model within 6″ can issue an Order to one non-Elite MILITARUM model, applying its benefit until end of Turn. Orders include: **Duty and Honour!** (+1 Injury Dice melee), **First Rank, Fire! Second Rank, Fire!** (Bloodbath at 3 Blood Markers ranged), **Fix Bayonets!** (free melee attack when charged), **Move! Move! Move!** (+2″ movement, +1 DICE Dash/Climb/Jump), **Take Aim!** (+1 DICE to Hit ranged, ignores Long Range), **Take Cover!** (-1 flat to Injury rolls, -2 if in cover, max -3 combined with Armour).',
      '**Commendations** (Campaign). After each battle, you may award one Commendation to a qualifying model, permanently granting it a benefit. Commendations include bonuses to melee, exploration, promotion, ranged, and morale. A model can hold any number of Commendations (one of each).',
    ],
  },

  adeptus_custodes: {
    title: 'Adeptus Custodes Special Rules',
    rules: [
      '**Endeavors** (Campaign). At Warband creation, generate 3 Imperatives at random (rerolling duplicates) — these form your Endeavor. Complete them in order, one per battle. Imperatives include tasks like controlling your deployment zone, taking enemies OOA by Turn 3, winning the battle, eliminating enemy Elites, and more. Completing all three earns an Endeavor Reward (2 Glory, extra Promotion die, Elite XP, etc.). Failing one causes Dishonor (ignore next 1 Glory per incomplete Imperative). Completing two and abandoning earns a random reward.',
    ],
  },

  adepta_sororitas: {
    title: 'Adepta Sororitas Special Rules',
    rules: [
      '**Miracles.** You maintain a Miracle pool (starts at 0 each battle). Gain 1 Miracle when a SORORITAS Elite takes an enemy Elite OOA (Slay), when your own Elite is taken OOA (Martyr), or when you pass a Morale test (Hold). Spend Miracles as BLESSING MARKERS on any of your SORORITAS models.',
      '**Sacred Martyrdom** (Campaign). When an Elite model is killed (e.g. receives its 3rd Battle Scar), earn 1 Glory (+1 if it had 10+ XP, +1 if it was a Saint Potentia).',
      '**Saint Potentia** (Campaign). Choose one Elite as your Saint Potentia. Each battle, choose a Trial for it. Completing all five Trials makes it a Living Saint — removes all Traumas/Battle Scars, no more Elite Trauma rolls after being OOA, and all Injury rolls against it have -1 DICE.',
    ],
  },

  adeptus_mechanicus: {
    title: 'Adeptus Mechanicus Special Rules',
    rules: [
      '**Canticles of the Omnissiah.** At the start of each Turn, choose one Canticle (cannot repeat the same one in consecutive Turns, unless chosen randomly). Options: (1) Reroll one die on ranged Hit rolls; (2) Reroll one Injury die in melee; (3) +1 DICE Dash; (4) +1 DICE Morale; (5) BLOCK for MECHANICUS; (6) STEALTH for MECHANICUS (or -1 DICE to Hit for models already STEALTHED).',
      '**The Search For Archeotech** (Campaign). Each battle, your opponent places a 1″ Archeotech marker. Any model in contact can attempt to recover it (Action + Success Roll). If carried at battle\'s end, roll to determine its type (Power Source, Weapon Part, Force Field Part, or Techno-Arcana) and then its precise effect. Combine a Power Source with another component to create functioning Archeotech battlekit equippable by non-Mercenary MECHANICUS models.',
    ],
  },

  adeptus_ministorum: {
    title: 'Adeptus Ministorum Special Rules',
    rules: [
      '**Battle Hymns.** At the start of each Turn, choose one Hymn. Each ORATOR model (while not Down) speaks it, granting its benefit to themselves and each friendly ECCLESIARCHY model within 6″: (1) **The Emperor Protects** — The first -1 of armour has IMPERVIOUS, -DICE to Injury cannot be negated; (2) **The Emperor\'s Strength** — ARMOUR PIERCING 1 for all melee, stacking with other sources; (3) **The Righteousness of the Emperor** — +1 DICE to Hit with ranged attacks within half range.',
      '**Rally the Flock** (Campaign). Track Flock points (start 0). Earn Flock by holding your deployment zone, taking half enemies OOA, keeping an ORATOR up all battle, a first Glorious Deed by an Elite or Miraculist, or an ORATOR reaching the enemy deployment zone. Spend Flock to reduce Mercenary Glory cost, avoid Elite Trauma rolls, replace casualties for free, or gain Exploration Skills.',
    ],
  },

  officio_assassinorum: {
    title: 'Officio Assassinorum Special Rules',
    rules: [
      '**Execution Force.** Your Warband has no leader. You must include at least one Elite model. Whenever an effect targets your warband leader, choose any one of your Elite models.',
      '**Assassination Targets.** At the start of each battle, secretly choose one of your Elite models and one of your opponent\'s Elite models. If your chosen Elite takes the opponent\'s chosen Elite OOA, it earns 1 additional XP. If it fails, it earns 1 fewer XP that battle.',
    ],
  },

  rogue_trader: {
    title: 'Rogue Trader Special Rules',
    rules: [
      '**Best of the Best.** You can have up to 1 additional Elite per 500 credits in your Warband. You can recruit Elite models from Imperial, Outlaw, Aeldari, Drukhari, and Leagues of Votann Factions (max 1 per Faction, 3 for Necromunda Gang from different gangs). These models gain the ROGUE TRADER Keyword. For each LEADER recruited this way, add 15 credits and remove the LEADER Keyword.',
      '**Warrant of Trade.** You never track credits — you can always afford anything costing only credits. However, you may only hold up to 20% more than the current battle\'s credit limit worth of models and battlekit at any time, and may only bring the normal credit limit to each battle.',
    ],
  },

  the_inquisition: {
    title: 'Inquisition Special Rules',
    rules: [
      '**Ordo.** When creating your Warband, choose one Ordo. You may take special models and battlekit from that Ordo only, plus your Chamber Militant\'s Armoury. Follow any additional Ordo-specific special rules.',
      '**Requisitions** (Campaign). Your Warband begins with 11 Glory but only 500 credits, and your Credit Threshold is always 200 credits lower than normal. Whenever you Reinforce, gain 4 additional Glory. In one-off games, you have 200 fewer credits and 11 more Glory.',
      '**Shadow Operations** (Campaign). At the start of each battle, roll D6 for your Shadow Operation: Agent Provocateur (secretly target an enemy Elite; earn XP if they\'re OOA), Ancient Artefact (recover a placed marker), Diabolical Ritual (uncover 3 ritual markers), Informant (contact an informant marker), Sympathiser (hold enemy deployment zone), or Threat of Uprising (outnumber enemy in your own zone). Succeed to grant 1 bonus XP to a chosen Elite.',
    ],
  },

  grey_knights: {
    title: 'Grey Knights Special Rules',
    rules: [
      '**Daemon Hunters.** All GREY KNIGHTS models are immune to FEAR and have +1 DICE to Hit when fighting DAEMON models.',
      '**And They Shall Know No Fear.** Grey Knights treat Down results from the Injury Roll Table as Minor Hits instead (Black Carapace).',
      '**Psychic Mastery.** Grey Knights use the Dominus and Sanctus psychic disciplines. All Grey Knights are highly resistant to daemonic corruption.',
      '**Gene Seeds** (Campaign). Track Gene Seed quality. Each victory and Glorious Deed increases quality; injuries that affect ASTARTES models decrease it. High quality unlocks special campaign bonuses.',
    ],
  },

  adeptus_arbites: {
    title: 'Adeptus Arbites Special Rules',
    rules: [
      '**Law and Order.** Adeptus Arbites models have the ARBITES Keyword. Their Hardcase Cyber Mastiffs have NEGATE GAS on their Bite attack.',
      '**Gang.** GANGER models can promote to Elites through campaign XP.',
      '**Fast Learners.** GANGER Juves that survive battles gain XP at double the normal rate.',
      '**Enforcer Tactics.** Adeptus Arbites have access to Palanite Enforcer-specific wargear and campaign rules.',
    ],
  },

  // ── Chaos Factions ─────────────────────────────────────────────────────────

  heretic_astartes: {
    title: 'Heretic Astartes Special Rules',
    rules: [
      '**Dark Pacts.** As an Action (Success Roll), any HERETIC ASTARTES model can make a Dark Pact. On success, it gains +1 DICE to Hit or +1 INJURY DICE with all weapons until end of Activation. Regardless, it gains 1 BLOOD MARKER at end of Activation.',
      '**Dread Reputation** (Campaign). Track Personal, Dark Gods, and Warfleet Reputations (each starts at 4, range 1–8). All decrease by 1 per battle; increase for Glorious Deeds, wins, ties. Favoured (7–8) grants bonus XP, free Marks of Chaos, or Exploration Skills. Forsaken (1–2) can cause leadership challenges, forced Elite Trauma rolls, or prevents spending Glory on battlekit/Mercenaries.',
      '**Choose a Warband Variant (Legion):** Alpha Legion, Death Guard, Emperor\'s Children, Iron Warriors, Night Lords, Renegade Space Marines, Thousand Sons, Word Bearers, World Eaters (or no variant).',
    ],
  },

  death_guard: {
    title: 'Death Guard Special Rules',
    rules: [
      '**Patron.** Your Patron must be the Nurgle Shared Patron.',
      '**Mark of Nurgle.** All HERETIC ASTARTES models automatically have Mark of Nurgle (included in unit cost). Ranged attacks against this model or allies within 3" have -1 DICE to Hit; melee attacks have +1 INJURY MODIFIER.',
      '**Contagion.** HERETIC ASTARTES models with Mark of Nurgle: enemy models within 1" of this model that have 1+ INFECTION MARKERS have -1 DICE to Hit with all attacks (spending all INFECTION MARKERS negates this).',
      '**Spreaders of Disease** (Campaign). Replaces Dread Reputation with a Virulence Points system. Accumulate INFECTION MARKERS on enemies to generate VP.',
      '**No Dark Pacts.** Cannot make Dark Pacts. Cannot include Dark Apostles, Warpsmiths, Possessed, or Raptors.',
      '**Contagion Psychic Discipline.** Uses the Contagion Psychic Discipline instead of the standard Heretic Astartes Discipline.',
      '**Poxwalkers.** Can take Poxwalkers as Troops. Can take a Foetid Blight-Drone instead of a Helbrute.',
      '**Tallyband Variant.** Optionally form a Tallyband: Cannot include Chaos Cultists or Helbrutes; max 4 Plague Marines; can recruit Plague Legion Daemon Troop models.',
    ],
  },

  emperors_children: {
    title: "Emperor's Children Special Rules",
    rules: [
      '**Patron.** Your Patron must be the Slaanesh Shared Patron.',
      '**Mark of Slaanesh.** All HERETIC ASTARTES models have Mark of Slaanesh (included in unit cost). +2" movement, +1 DICE to all Dash Success Rolls, +1 INJURY MODIFIER to ranged attacks.',
      '**No Dark Pacts.** Cannot make Dark Pacts. Cannot include Warpsmiths or Shrivetalon upgrades.',
      '**Combat Elixirs** (Campaign). Replaces Dread Reputation; collect Ingredient markers and craft powerful consumables.',
      '**Flawless Blades.** Up to 2 (or 3) Noise Marines can be upgraded to Flawless Blades: +1 DICE to Hit in melee, Pistols/Grenades only for ranged.',
      '**Lord Kakophonist.** Can recruit a Lord Kakophonist as an Elite.',
      '**Excess Psychic Discipline.** Uses the Excess Psychic Discipline.',
      '**Carnival of Excess Variant.** Optionally form a Carnival of Excess: cannot include Chaos Cultists or Helbrutes; max 4 Noise Marines; can recruit Legion of Excess Daemon Troop models.',
    ],
  },

  thousand_sons: {
    title: 'Thousand Sons Special Rules',
    quote: 'MAGNUS DID NOTHING WRONG.',
    rules: [
      '**Aspiring Sorcerers.** Any model you promote to an Elite gains the PSYKER 1 Keyword, and its cost is increased by 10 for the purposes of credit limits. When the model is promoted, choose the Change or Vengeance Psychic Discipline. That model may purchase up to two powers from the chosen discipline. It must be equipped with a PSYCHIC Weapon in order to use any Psychic Power.',
      '**Cabal of Sorcerers** (Battle). Keep track of your Cabal Points during each battle, beginning at 0 at the start of the battle. At the start of each Turn, you gain Cabal Points equal to the combined total PSYKER X values of all of your HERETIC ASTARTES TZEENTCH models on the battlefield. You can spend the listed Cabal Points to perform one of the following Rituals when one of your HERETIC ASTARTES TZEENTCH takes the Cast Action, before any Success Roll:'
      + '\n - Cabbalistic Focus (3 Cabal Points). Enemies cannot Deny the Witch against the power.'
      + '\n - Echoes From The Warp (5 Cabal Points). If the result of the Success roll is 10 or higher, the caster gains 1 BLESSING MARKER.'
      + '\n - Imbued Manifestation (4 Cabal Points). If the power has a range of 6” or more, you can increase its range by 6”.'
      + '\n - Kindred Sorcerers (2 Cabal Points). The caster has +1 DICE to Success Rolls for this power.'
      + '\n - Malevolent Charge (4 Cabal Points). If the power inflicts any injuries, those injuries have +1 INJURY DICE.'
      + '\n - Pact From Beyond (5 Cabal Points). The caster does not suffer Perils of the Warp on a result of 12 for this power. The PERILOUS Keyword only applies to numbers between 2 and 2 plus the PERILOUS X value for it.'
      + '\n - Psychic Maelstrom (5 Cabal Points). The caster can use a power that any other friendly TZEENTCH PSYKER on the battlefield knows, as if it knew that power.'
      + '\n - Warp Sight (3 Cabal Points). If the power requires the caster to see one or more models, you can choose another friendly TZEENTCH model on the battlefield. You can use that model’s line of sight instead of the caster’s for this power. This does not affect range.'
      + '\n - Wrath Of The Immaterium (5 Cabal Points). The caster has +1 DICE to Success Rolls for this power, and reduce the X value of the PERILOUS X Keyword for the Success Roll by 2, to a minimum of 0.',
      '**Discover the Arcane** (Campaign). Instead of the Dread Reputation special rule, during a campaign, keep track of your Arcane Points, beginning at 0. At the start of each battle, before deployment, your opponent places three 1” Arcana markers anywhere that is exactly half the battlefield size away from your deployment zone (18” away for 3’x3’ board, 24” away for a 4’x4’ board), but not within 6” of a battlefield edge or another marker, or on Impassable Terrain or completely surrounded by it.'
      +'\nAt any point during the battle, one of your PSYKER models can make a Success Roll to try to study an Arcana marker while it is in contact with it. On a success, remove the marker and you earn 1 Arcane Point.'
      +'\nDuring the quartermaster step between battles, you can empower one of your Elite PSYKER models with arcane knowledge. It gains a benefit depending on how many Arcane Points you have, then reset your Arcane points to 0. The benefit is either an Arcane Relic, which functions as battlekit but cannot be removed or sold, or an Arcane Power, which is an additional psychic power the model knows, which does not count towards its limit. Each model can gain only up to 1 Arcane Relic and up to 1 Arcane Power in this way.'
      +'\n - 5-9 Arcane Points:'
      +'\n     - Arcane Relic: Text Of Warp-Blown Ash. Once per battle, when the bearer would suffer Perils of the Warp, you can choose for it to ignore that Perils of the Warp.'
      +'\n     - Arcane Power: Thief Of Fate. 18”, AUTOMATIC 3, PSYCHIC, RISKY. All attacks must target the same model.'
      +'\n - 10-14 Arcane Points:'
      +'\n     - Arcane Relic: Boonstone. Once per battle, the bearer can gain +2 DICE to any PSYCHIC Success Roll it takes, including an attack.'
      +'\n     - Arcane Power: Visions Of Doom. As an Action with a Risky Success Roll with +1 DICE, the caster can choose one enemy within 18” of it that it can see. On a success, the target suffers -1 DICE to all Success Rolls and Injury rolls have +1 DICE against it until the end of the current Turn.'
      +'\n - 15+ Arcane Points:'
      +'\n     - Arcane Relic: Mesmeric Stave. +1 INJURY DICE against targets with DAEMON or PSYKER Keyword, PSYCHIC, HELD'
      +'\n          - Strike: Melee, +1 INJURY DICE'
      +'\n          - Shoot: 18”, +1 INJURY DICE, ASSAULT'
      +'\n     - Arcane Power: Binding Flames. As an Action with a Risky Success Roll with +1 DICE, the caster can choose itself or one ally within 18” of it that it can see. On a success, until the end of the current Turn, attacks against the target have -1 DICE to Hit and -1 INJURY DICE against the chosen model.',
      '**Patron.** Your Patron must be the Tzeentch Shared Patron.',
      '**Warband Variant: Changehost** Optionally form a Changehost: cannot include Tzeentch Cultists or Sekhetar Robots; max 4 Rubric Marines; can recruit Scintillating Legion Daemon Troop models.'
      +'\n - Limited Recruits. You cannot take any Tzeentch Cultists or Sekhetar Robots, and you cannot recruit any Summoned Mercenaries. You can take a maximum of 4 Rubric Marines.'
      +'\n - Daemon Support. You can recruit Scintillating Legion Troop models from the Chaos Daemons faction.',
    ],
    variantOption: {
        label: 'Warband Variant: Changehost',
        rules: [
          '**Limited Recruits.** You cannot take any Tzeentch Cultists or Sekhetar Robots, and you cannot recruit any Summoned Mercenaries. You can take a maximum of 4 Rubric Marines.',
          '**Daemon Support.** You can recruit Scintillating Legion Troop models from the Chaos Daemons faction.',
        ],
        bannedUnitIds: ['ts_chaos_cultist', 'ts_sekhetar_robot'],
        unitMaxCountOverrides: { ts_rubric_marine: 4 },
        extraUnits: [cd_blue_horror, cd_pink_horror, cd_screamer],
      },
  },

  world_eaters: {
    title: 'World Eaters Special Rules',
    rules: [
      '**Patron.** Your Patron must be the Khorne Shared Patron.',
      '**Mark of Khorne.** All HERETIC ASTARTES models have Mark of Khorne (included in unit cost). Melee attacks have +1 INJURY MODIFIER.',
      '**No Dark Pacts.** Cannot make Dark Pacts. Cannot include Chaos Sorcerers, Warpsmiths, Raptors, or Havocs.',
      '**Blood Surge (Butcher\'s Nails).** HERETIC ASTARTES KHORNE Berzerkers and Jakhals: when Charging, roll 2D6 instead of 1D6 and add the highest die. Cannot equip ranged weapons besides Pistols, THROWN weapons, and Blood Harpoons.',
      '**Eightbound.** Possessed become Eightbound (+10cr): replace Mutated Claw with Mutated Chainblade (CRITICAL, RISKY, SHRAPNEL). All Eightbound and allies within 3" have +1 DICE to Hit enemies with 1+ BLOOD MARKERS.',
      '**World Eaters Terminators.** Do not have Blood Surge and can take any ranged weapons.',
      '**Daemonkin Variant.** Optionally form a Daemonkin: can recruit Blood Legion Daemon Troop models (Bloodletters, Flesh Hounds).',
    ],
  },

  chaos_cult: {
    title: 'Chaos Cult Special Rules',
    rules: [
      '**Accursed Gifts.** Your CHAOS CULT models can gain Gifts of Chaos (permanent or temporary; each only once). During a campaign, after each battle, grant one model a permanent Gift (Elites can roll twice and choose). Permanent Gifts do not increase a model\'s cost (cost 5 credits for one-off games). Elites and Chaos Spawns can hold up to 4 permanent Gifts; other models up to 2. Roll D66 for the Gift effect from a table of 36 results — including mutations like STEALTH, SKIRMISHER, FLYING, STRONG, PSYKER, TOUGH, and the dangerous Spawnhood or Dark Apotheosis.',
    ],
  },

  chaos_daemons: {
    title: 'Chaos Daemons Special Rules',
    rules: [
      '**Daemon Legions.** Recruit from any of the four Legions (Blood Legion, Scintillating Legion, Plague Legion, Heralds of Ruin). Your leader\'s Keyword (KHORNE/NURGLE/SLAANESH/TZEENTCH/UNDIVIDED) restricts which opposing Legion units you can recruit.',
      '**Warp Entities.** At the start of each battle, up to half of your DAEMON models (rounded up) gain DEEP STRIKE.',
      '**The Great Game** (Campaign). Track Ascendency for Khorne, Tzeentch, Nurgle, and Slaanesh (start 4/3/2/1). Each gains D3 Ascendency per battle; your leader\'s god gains extra for wins. The god with highest Ascendency grants rerolls to matching models; lowest Ascendency imposes -1 DICE to Hit enemies of other gods. Every 4 battles, grant XP rewards based on standings, then reset.',
    ],
  },

  the_vermintide: {
    title: 'Vermintide Special Rules',
    rules: [
      '**Warp Tunnels.** Your SKAVEN models have the BURROW Keyword.',
      '**Conniving Power Struggle** (Campaign). Track Conniving Points for each Elite (leader starts at 10; others at 0). Points rise by winning, performing Glorious Deeds, eliminating enemy Elites, and when allies are OOA. If the Warband leader hits 20+ and leads all others in points → Masterstroke: earn 2 Glory and 2 bonus XP. If any non-leader Elite surpasses the Warband leader → Power Upset: roll D6 — Banishment, Beaten Down, Grudging Respect, or Ascension (new Warband leader).',
    ],
  },

  // ── Xenos Factions ─────────────────────────────────────────────────────────

  orks: {
    title: 'Ork Special Rules',
    rules: [
      '**Waaagh!** Once per battle at the start of any Turn, declare a Waaagh! Until end of Turn: ORK models charge with 2D6 (take highest), melee attacks gain +1 DICE to Hit, and Injury rolls against ORK models have -1 DICE.',
      '**Stomp \'Em Good** (Campaign). Track Stompin\' Points (0–50 max). Gain points for Glorious Deeds, winning, taking the enemy leader OOA, Elites reaching 15 XP, and per-battle momentum. Your WAAAGH! progresses through four Stages (Gathering → Escalating → Thunderous → All-Conquering), each granting benefits like bonus XP for Elites, Campaign Shop access restricted to the Warband leader, and 2 Glory per battle at max. Higher stages also require Ruction Tests that can cause roster penalties on failure.',
    ],
  },

  drukhari: {
    title: 'Drukhari Special Rules',
    rules: [
      '**Power From Pain.** Models with Pain(X) abilities spend X BLOOD MARKERS from non-ARTIFICIAL enemies to activate them. All DRUKHARI models always have: Pain(1): +1 DICE to a Dash; Pain(1): +1 DICE to Hit with one attack.',
      '**Territorial Dominance** (Campaign). Designate an Ascendant Lord (Archon/Haemonculus/Succubus). Track Raid Spoils. Each battle, recover a Spoils marker for D3 Raid Spoils (+another D3 for winning). Spend Spoils to purchase Territories (12 types). Controlling 3+ of the same type unlocks a special ability. Ascendant Lord type grants additional bonuses (Archon: steal Territories from Drukhari opponents; Haemonculus: spend Spoils to ignore Trauma/Casualty rolls for Haemonculus-type models; Succubus: reduced Arena cost).',
    ],
  },

  tyranids: {
    title: 'Tyranids Special Rules',
    rules: [
      '**Shadow in the Warp.** Enemy Warbands roll Morale Tests with -1 DICE (Orks, Necrons, T\'au and other Tyranids ignore this). While a Tyranid Warband is in battle, Perils of the Warp do not apply — instead, models have a cumulative -2 DICE per psychic power used in a Turn (instead of -1 DICE).',
      '**Synapse.** SYNAPSE models extend a 6″ aura: TYRANID models Within Synapse Range gain +1 DICE to Dash Actions.',
      '**Retrieve Biomass** (Campaign). When a TYRANID model is killed, recover half its credit cost (rounded up) and half its Glory cost (rounded down). If an opponent\'s model is Captured, you cannot return it — instead earn 50 credits (100 if LARGE and non-VEHICLE), or half if MECHANICUS.',
    ],
  },

  genestealer_cults: {
    title: 'Genestealer Cults Special Rules',
    rules: [
      '**Cult Ambush.** Before deployment, choose up to half your GENESTEALER CULTS models (rounded up) to Ambush. They gain DEEP STRIKE. Place four 32mm Cult Ambush markers (8″+ from enemies, not in line of sight). Models in reserve using DEEP STRIKE must deploy within 3″ of one of these markers and 1″+ from enemies.',
      '**Infiltration** (Campaign). Choose a target Institution (Community/Industry/Military/Politics/Religion/Resources) or roll randomly. Track Infiltration Points (earn 1 when the battle\'s condition is met). After gaining 3 Infiltration Points, Control that Institution and gain its permanent Reward (extra models, +25 credits, Elite XP, leader skill choice, 2 Glory, or Campaign Shop access), then reset and choose a new target.',
    ],
  },

  harlequins: {
    title: 'Harlequins Special Rules',
    rules: [
      '**Luck of the Laughing God.** Once per battle per 600 credits in your limit, reroll any one Success Roll by a HARLEQUIN or one Injury roll against one. At the start of each battle, optionally roll up to 6 D6: if all results are different, gain 1 additional reroll per die. Any matching result negates all bonus rerolls.',
      '**Grand Performances** (Campaign). Select a Tale (Cegorach\'s Lament / The Forging of Anaris / etc.) and complete its Rehearsal Phase requirements over multiple battles for Rehearsal Rewards. Then begin the Grand Performance in a single battle, earning Accolade points for specific feats. Earn Glory, bonus XP, and Battle Scar removal based on total Accolades (Masterpiece 10+, Accomplished 4–9, Amateurish 0–3).',
    ],
  },

  leagues_of_votann: {
    title: 'Leagues of Votann Special Rules',
    rules: [
      '**Eye of the Ancestors.** When an enemy takes one of your non-ARTIFICIAL VOTANN models OOA, give that enemy 1 Grudge token (max 2 per model). With 1 Grudge token, VOTANN models have +1 DICE to Hit that model. With 2, they also have +1 INJURY DICE.',
      '**Acquisitions** (Campaign). At the end of each battle, earn Resources (Raw Minerals, Biomatter, Energy Sources, or Galactic Intel) based on your credit limit — rolling D6 to determine the type. Spend Resources during Trade steps to purchase permanent Assets for your Warband (exploration bonuses, resource generation, re-deploy abilities, Mercenary refunds, etc.).',
    ],
  },

  slanni: {
    title: 'Slanni Special Rules',
    rules: [
      '**Cold Blooded.** While your Warband is Shaken from failing a Morale test, your models\' Success Rolls are NOT automatically Risky (though a second failed Morale test still causes tactical retreat).',
      '**Divination of The Stars** (Campaign). At Warband creation, randomly select two Divinations (from 6 options). Track Divination Points. Earn 1 Divination Point per battle when the condition is met (e.g. Elite in opponent\'s deployment zone, Elite scores a Glorious Deed, carry a Star Relic, take half enemies OOA). Spend Divination Points to reroll Elite Trauma rolls, grant Elite XP, reduce Mercenary costs, or reroll Exploration Dice.',
    ],
  },

  necrons: {
    title: 'Necron Special Rules',
    rules: [
      '**Reanimation Protocols.** The first time each NECRON model would be taken OOA (2nd if TOUGH), it is treated as Down instead — mark it Reanimating. If the model has not been activated this Turn, it is considered to have done so. At the start of its Activation while Reanimating, it makes a Success Roll with +1 DICE: on success, it stands up normally; on failure, it stays Down and Reanimating and its Activation ends. **Once one of your models reanimates, no other model can make this roll during the same Turn.** At battle\'s end, one more Success Roll with +1 DICE; fail = finally taken OOA. While Reanimating, it can be attacked as normal and Injury rolls against it gain +1 DICE and IGNORE ARMOUR.',
      '**Dynastic Epithets** (Campaign). After each battle where your Warband leader scored a Glorious Deed and was not taken OOA, give it a new Epithet and choose one Dynastic Ability (up to 5 total per model). Abilities include re-deploying models, purchasing Campaign Shop items, recruiting extra Royal Wardens, recovering battlekit from casualties, earning Glory or credits, and more.',
    ],
  },

  aeldari: {
    title: 'Aeldari Special Rules',
    rules: [
      '**Battle Focus.** At the start of each Turn, gain Focus Points (1 per 300 credits in your limit). Spend them on: Fall Back (prevent free attacks on Retreat), Flitting Shadows (give STEALTH to a model before a ranged attack), Opportunity Seized (free 3″ move after an enemy Retreats), Star Engines (+3″ movement for a VEHICLE), Sudden Strike (reroll charge die), or Swift as the Wind (+1 DICE to a Dash roll). Unspent Focus Points are lost at end of Turn.',
      '**Guiding Fate** (Campaign). Generate 3 Threads of Fate by rolling from a table of 6 (rerolling duplicates), and track your Threat (starts at 1). Each Thread has three stages (Dawning, Waning, Frayed); active a Thread per battle, completing its stage requirements to lower Threat (3/2/1 respectively). Failing escalates the Thread. At end of Turn, Threat rises D3 (+3 if you lost). At 13+, all Threads fail. Once all Threads end, earn rewards or penalties based on final Threat level (0–4: 3 Glory + XP; 5–8: 2 Glory + XP; 9–12: 1 Glory; 13+: Elite Trauma rolls).',
    ],
  },

  t_au_empire: {
    title: 'T\'au Empire Special Rules',
    rules: [
      '**For the Greater Good.** A model with the MARKERLIGHT keyword can declare it is marking a target instead of shooting — instead of an attack roll, the target simply gains 1 Markerlight token. Ranged attacks against models with Markerlight tokens have +1 DICE to Hit. Your models can spend Markerlight tokens as BLOOD MARKERS on ranged Injury rolls. All Markerlight tokens are removed at end of each Turn.',
      '**Expanding The Empire** (Campaign). Choose a target Demographic (Brutal/Convicted/Downtrodden/Logical/Prosperous/Superstitious). Track Influence Points. Earn 1 Influence Point per battle when the Demographic\'s condition is met. After 3 Influence Points, you have Converted the Demographic and permanently gain its Reward (2 Glory, Elite XP, extra models, +50 credits + 100 credits, or leader skill choice), then reset and choose a new Demographic.',
    ],
  },

  // ── Outlaw Factions ────────────────────────────────────────────────────────

  necromunda_gang: {
    title: 'Necromunda Gang Special Rules',
    rules: [
      '**Gang.** When creating your Warband, choose one Gang. You may only take special models and battlekit from that gang. If a piece of battlekit appears in both the Shared Armoury and your Gang\'s Armoury, use your Gang\'s Armoury for the cost and LIMIT.',
      '**Fast Learners.** Roll an additional Promotion Die at the end of each battle. When a model is promoted to Elite, it immediately gains a Campaign Skill — choose a Skill Chart, roll 2D6 (rerolling 2 or 12), and gain that skill in addition to any XP-granted skills.',
    ],
  },

  pirate_crew: {
    title: 'Pirate Crew Special Rules',
    rules: [
      '**Backgrounds.** When recruiting a PIRATE model, choose one Background (Beastman, Dark Eldar, Death Worlder, Eldar Corsair, Feral Worlder, Forge Worlder, Gretchin Freebooter, Hive Worlder, Kroot, Kin, Noble, Ogryn, Ork Freebooter, Piscean, Ratling, Slanni Brave/Brute/Skirmisher, Tarellian, Voidborn, or Zoat). Each Background grants unique Keywords, stat modifiers, special abilities, and/or access to additional Battlekit lists.',
      '**Specialties.** When recruiting a PIRATE model, optionally choose a paid Specialty (Cannoneer, Duelist, Grenadier, Heavy, Heretek, Hunter, Knife Fighter, Mechanic, Pistoleer, Psyker, Reaver, Rigger, Sapper, Sneak, Tactician, or Void Terror) granting a specific combat or utility ability.',
      '**Black Market Acquisitions.** You can purchase Campaign Shop battlekit without Exploration permission, so long as its Glory cost ≤ the number of battles you have fought (or 1 for every 100 credits over 700 your Warband is Worth for a one-off battle). You can also buy from the Campaign Shop of any other Faction (except Chaos Daemons, Orks for non-ORK models, Necrons, and Tyranids), replacing Faction Keywords with PIRATE.',
    ],
  },
};

/** Returns the special rules for a given faction ID, or null if none exist. */
export function getFactionRules(factionId: string): FactionSpecialRulesData | null {
  return FACTION_RULES[factionId] ?? null;
}
