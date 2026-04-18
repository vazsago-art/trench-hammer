/**
 * campaignMissions.ts
 *
 * Mission tables and exploration location tables from the Trench Hammer campaign content.
 * Organised by campaign bracket (Games 1-3, 4-8, 9-11, 12).
 */

import type { MissionEntry, ExplorationLocation, CampaignBracket } from '../types/index.js';

// ============================================================================
// MISSION TABLES
// ============================================================================

const MISSIONS_EARLY: MissionEntry[] = [
  { roll: 1, name: 'Claim No Man\'s Land', description: 'From the Trench Crusade rulebook.', isOriginal: true },
  { roll: 2, name: 'The High Ground', description: 'From the Trench Crusade rulebook.', isOriginal: true },
  { roll: 3, name: 'Supply Raid', description: 'From the Trench Crusade rulebook.', isOriginal: true },
  { roll: 4, name: 'Meatgrinder', description: 'New Trench Hammer scenario.' },
  { roll: 5, name: 'Toxic Crossing', description: 'New Trench Hammer scenario.' },
  { roll: 6, name: 'Player\'s Choice', description: 'The player with the fewest Campaign VP chooses one of the Scenarios listed above. If tied, roll-off and the winner chooses.' },
];

const MISSIONS_MID: MissionEntry[] = [
  { roll: 1, name: 'Hunt for Heroes', description: 'From the Trench Crusade rulebook.', isOriginal: true },
  { roll: 2, name: 'Escort Supplies', description: 'New Trench Hammer scenario.' },
  { roll: 3, name: 'Industrial Zone', description: 'New Trench Hammer scenario.' },
  { roll: 4, name: 'High Speed', description: 'New Trench Hammer scenario. (Or Claim No Man\'s Land if appropriate terrain is not available.)' },
  { roll: 5, name: 'Spec Ops', description: 'New Trench Hammer scenario.' },
  { roll: 6, name: 'Player\'s Choice', description: 'The player with the fewest Campaign VP chooses one of the Scenarios listed above. If tied, roll-off and the winner chooses.' },
];

const MISSIONS_LATE: MissionEntry[] = [
  { roll: 1, name: 'From Below', description: 'From the Trench Crusade rulebook. Call Hell Ticks "Xenos Beasts" instead.', isOriginal: true },
  { roll: 2, name: 'Industrial Zone', description: 'New Trench Hammer scenario.' },
  { roll: 3, name: 'Spec Ops', description: 'New Trench Hammer scenario.' },
  { roll: 4, name: 'Fragile Bounty', description: 'New Trench Hammer scenario.' },
  { roll: 5, name: 'The Ritual', description: 'New Trench Hammer scenario.' },
  { roll: 6, name: 'Player\'s Choice', description: 'The player with the fewest Campaign VP chooses one of the Scenarios listed above. If tied, roll-off and the winner chooses.' },
];

const MISSIONS_FINALE: MissionEntry[] = [
  { roll: 1, name: 'The Great War', description: 'From the Trench Crusade rulebook.', isOriginal: true },
  { roll: 2, name: 'The Inferno', description: 'New Trench Hammer scenario.' },
  { roll: 3, name: 'Player\'s Choice', description: 'The player with the fewest Campaign VP chooses one of the Scenarios listed above. If tied, roll-off and the winner chooses.' },
];

export const MISSION_TABLES: Record<CampaignBracket, { label: string; games: string; diceType: string; missions: MissionEntry[] }> = {
  early:  { label: 'Games 1–3',  games: '1-3',  diceType: 'D6', missions: MISSIONS_EARLY },
  mid:    { label: 'Games 4–8',  games: '4-8',  diceType: 'D6', missions: MISSIONS_MID },
  late:   { label: 'Games 9–11', games: '9-11', diceType: 'D6', missions: MISSIONS_LATE },
  finale: { label: 'Game 12',    games: '12',   diceType: 'D3', missions: MISSIONS_FINALE },
};

/** Return the bracket for a given game number. */
export function getBracket(gameNumber: number): CampaignBracket {
  if (gameNumber <= 3) return 'early';
  if (gameNumber <= 8) return 'mid';
  if (gameNumber <= 11) return 'late';
  return 'finale';
}

/** Return the number of exploration dice for a given game number. */
export function getExplorationDiceCount(gameNumber: number): number {
  if (gameNumber <= 3) return 3;
  if (gameNumber <= 8) return 4;
  return 5; // games 9+
}

/** Return which exploration tables are available for a given game number. */
export function getAvailableExplorationTables(gameNumber: number): ('common' | 'rare' | 'legendary')[] {
  if (gameNumber <= 3) return ['common'];
  if (gameNumber <= 8) return ['common', 'rare'];
  return ['rare', 'legendary']; // games 9+
}

// ============================================================================
// EXPLORATION LOCATION TABLES
// ============================================================================

const COMMON_LOCATIONS: ExplorationLocation[] = [
  {
    result: 4, name: 'Fallen Champion',
    universalChoices: [
      { name: 'Loot', description: 'Now or during any quartermaster step, you can purchase a single piece of battlekit from your Campaign Shop that costs up to 9 Glory, paying for it as normal.' },
    ],
    factionChoices: [
      { name: 'Memorialize', description: 'You earn 2 Glory.', condition: ['NOT:tyranids'], conditionLabel: '(non-Tyranid Only)' },
      { name: 'Consecrate', description: 'Treat this exploration as if you finished an additional battle for the purposes of the Trial of Purity or Trial of Valor.', condition: ['adepta_sororitas'], conditionLabel: '(Adepta Sororitas Only)' },
      { name: 'Retrieve', description: 'You earn 2 Glory, and add a Gene Seed to your reserves.', condition: ['adeptus_astartes'], conditionLabel: '(Adeptus Astartes Only)' },
      { name: 'Procession', description: 'You earn 10 Flock Points.', condition: ['adeptus_ministorum'], conditionLabel: '(Adeptus Ministorum Only)' },
      { name: 'Lord Over', description: 'You earn 1 Glory and your Warband leader gains 4 Conniving Points.', condition: ['the_vermintide'], conditionLabel: '(Vermintide Only)' },
    ],
  },
  {
    result: 5, name: 'Trained Beast',
    universalChoices: [],
    factionChoices: [
      { name: 'Adopt', description: 'Add one beast mercenary to your Warband, ignoring normal limits. Roll a D6: 1. Grapplehawk, 2. Gyrinx Cat, 3. Borewyrm Swarm, 4. Giant Wasteland Rat, 5. Millisaur, 6. Giant Grapplehawk.', condition: ['NOT:tyranids'], conditionLabel: '(non-Tyranid Only)' },
      { name: 'Sell', description: 'You earn 1 Glory.', condition: ['NOT:tyranids'], conditionLabel: '(non-Tyranid Only)' },
      { name: 'Slaughter', description: 'One of your Elite models gains 2D6 Claimed Skulls.', condition: ['heretic_astartes:world_eaters'], conditionLabel: '(World Eaters Only)' },
      { name: 'Stomp', description: 'You earn 4 Stompin\' Points.', condition: ['orks'], conditionLabel: '(Orks Only)' },
      { name: 'Consume', description: 'You earn 2 Glory.', condition: ['tyranids'], conditionLabel: '(Tyranid Only)' },
    ],
  },
  {
    result: 6, name: 'Chaos Shrine',
    universalChoices: [],
    factionChoices: [
      { name: 'Destroy', description: 'You earn 2 Glory.', condition: ['NOT:chaos'], conditionLabel: '(non-Chaos Only)' },
      { name: 'Pray', description: 'Up to two Elite models of your choice each earn 2 additional XP.', condition: ['chaos'], conditionLabel: '(Chaos Only)' },
      { name: 'Dark Knowledge', description: 'Your Warband gains the Lucky Exploration Skill.', condition: ['chaos'], conditionLabel: '(Chaos Only)' },
      { name: 'Foul Ceremony', description: 'Each of your eligible Elite models can roll for an additional Permanent Mutation.', condition: ['chaos_cult'], conditionLabel: '(Chaos Cult Only)' },
      { name: 'Dedicate', description: 'You earn 1 Glory. You can add 1 Ascendancy to any god of your choice.', condition: ['chaos_daemons'], conditionLabel: '(Chaos Daemons Only)' },
      { name: 'Claim', description: 'Add D3 to your Dark Gods Reputation.', condition: ['heretic_astartes'], conditionLabel: '(Heretic Astartes Only)' },
      { name: 'Deconsecrate', description: 'Up to two Elite models of your choice each earn 2 additional XP.', condition: ['adepta_sororitas', 'adeptus_ministorum', 'heretic_astartes:grey_knights', 'the_inquisition:ordo_malleus'], conditionLabel: '(Adepta Sororitas, Adeptus Ministorum, Grey Knights, or Ordo Malleus Only)' },
    ],
  },
  {
    result: 8, name: 'Xenos Ruins',
    universalChoices: [
      { name: 'Study', description: 'Each of your Elite models earns 1 additional XP.' },
    ],
    factionChoices: [
      { name: 'Salvage', description: 'Now or during any quartermaster step, you can purchase a single piece of battlekit from your Campaign Shop that costs up to 5 Glory, paying for it as normal.', condition: ['xenos', 'outlaw', 'the_vermintide', 'pirate_crew'], conditionLabel: '(Xenos, Rogue Trader, Vermintide, or Pirate Crew Only)' },
      { name: 'Preach Against', description: 'You earn 5 Flock Points. (Must be chosen if possible.)', condition: ['adeptus_ministorum'], conditionLabel: '(Adeptus Ministorum Only, must be chosen)' },
      { name: 'Abhor', description: 'Treat this exploration as if you finished an additional battle for the purposes of the Trial of Faith or Trial of Righteousness.', condition: ['adepta_sororitas'], conditionLabel: '(Adepta Sororitas Only, must be chosen)' },
      { name: 'Destroy', description: 'You earn 2 Glory.', condition: ['adeptus_astartes:deathwatch', 'the_inquisition:ordo_xenos'], conditionLabel: '(Deathwatch or Ordo Xenos Only, must be chosen)' },
      { name: 'Claim', description: 'You can immediately purchase two random Territories for free.', condition: ['drukhari'], conditionLabel: '(Drukhari Only)' },
      { name: 'Acquire', description: 'You earn 30 Energy Sources.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 9, name: 'Supplier',
    universalChoices: [
      { name: 'Establish Contact', description: 'For the remainder of the campaign, you can purchase battlekit from your Campaign Shop that costs 3 Glory or less during the Trade step, paying for it normally.' },
    ],
    factionChoices: [
      { name: 'Infect Supplies', description: 'You earn 1 Glory. Add 4 to the Ascendancy of Nurgle.', condition: ['chaos_daemons'], conditionLabel: '(Chaos Daemons Only)' },
      { name: 'Recruit', description: 'You earn 1 additional Infiltration Point.', condition: ['genestealer_cults'], conditionLabel: '(Genestealer Cults Only)' },
      { name: 'Convert', description: 'You earn 1 additional Influence Point.', condition: ['tau_empire'], conditionLabel: '(T\'au Empire Only)' },
      { name: 'Make a Deal', description: 'The next Campaign Shop battlekit you purchase costs 1 less Glory.', condition: ['pirate_crew'], conditionLabel: '(Pirate Crew Only)' },
    ],
  },
  {
    result: 10, name: 'Ammunition Cache',
    universalChoices: [
      { name: 'Take', description: 'Choose one Ammunition Equipment from the Shared Equipment list. You gain D3 of that ammunition, no cost, ignoring normal limits (bring only 1 per mission). Requires compatible weapons.' },
      { name: 'Convert', description: 'Choose one Ammunition from your Armoury or Equipment List. You gain D3 of that ammunition, no cost, ignoring normal limits (bring only 1 per mission). This equipment has CONSUMABLE.' },
      { name: 'Sell', description: 'You earn an additional 100 credits.' },
    ],
    factionChoices: [],
  },
  {
    result: 11, name: 'Relic Cache',
    universalChoices: [
      { name: 'Supplies', description: 'Now or during any quartermaster step, you can purchase a single piece of battlekit from your Campaign Shop that costs up to 5 Glory, paying for it as normal.' },
      { name: 'Relics', description: 'You earn 1 Glory.' },
    ],
    factionChoices: [
      { name: 'Arcane Secrets', description: 'You earn 2 additional Arcane Points.', condition: ['heretic_astartes:thousand_sons'], conditionLabel: '(Thousand Sons Only)' },
      { name: 'Raid', description: 'You earn 3 additional Raid Spoils.', condition: ['drukhari'], conditionLabel: '(Drukhari Only)' },
    ],
  },
  {
    result: 14, name: 'Survivor',
    universalChoices: [
      { name: 'Recruit Survivor', description: 'You can add a faction-specific survivor model to your Warband, even if it would exceed normal limits. Check your faction\'s survivor entry for the specific model and loadout.' },
    ],
    factionChoices: [],
  },
  {
    result: 16, name: 'City Ruins',
    universalChoices: [
      { name: 'Find Vantage', description: 'During your next Exploration, you have the Set Dice Exploration Skill twice.' },
      { name: 'Scavenge', description: 'Now or during any quartermaster step, you can purchase a single piece of battlekit from your Campaign Shop that costs up to 4 Glory, paying for it as normal.' },
      { name: 'Recuperate', description: 'You can purchase models and battlekit until you have total credits worth up to your next mission\'s credit limit, without paying for it.' },
    ],
    factionChoices: [
      { name: 'Scout', description: 'One model of your choice earns the Recon Star Commendation.', condition: ['astra_militarum'], conditionLabel: '(Astra Militarum Only)' },
      { name: 'Pharmacy Raid', description: 'You find D3 Common Ingredients and 1 Rare Ingredient.', condition: ['heretic_astartes:emperors_children'], conditionLabel: '(Emperor\'s Children Only)' },
      { name: 'Acquire', description: 'You earn 30 Galactic Intel.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 18, name: 'Slag Field',
    universalChoices: [
      { name: 'Disassemble', description: 'You earn an additional 75 credits.' },
      { name: 'Salvage', description: 'Now or during any quartermaster step, you can purchase a single piece of battlekit from your Campaign Shop that costs up to 5 Glory, paying for it as normal.' },
    ],
    factionChoices: [
      { name: 'Acquire', description: 'You earn 30 Raw Minerals.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 20, name: 'Battlefield',
    universalChoices: [
      { name: 'Loot', description: 'You can add up to 100 credits worth of battlekit from your Armoury or Equipment List to your reserves.' },
      { name: 'Study', description: 'Your Warband gains your choice of Extra Dice or Careful Exploration Skill during your next exploration.' },
    ],
    factionChoices: [
      { name: 'Acquire', description: 'You earn 30 Biomatter.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
];

const RARE_LOCATIONS: ExplorationLocation[] = [
  {
    result: 5, name: 'Archeotech Cache',
    universalChoices: [
      { name: 'Take', description: 'You gain a random Power Source, and roll a D2 (D3 for Adeptus Mechanicus): weapon part, force field part, or techno-arcana. Use the Adeptus Mechanicus rules to reconstruct into usable battlekit.' },
    ],
    factionChoices: [],
  },
  {
    result: 6, name: 'High Ranking Captive',
    universalChoices: [
      { name: 'Ransom', description: 'You earn 300 credits.' },
      { name: 'Imprison', description: 'Now or during any quartermaster step, you can purchase a single piece of battlekit from your Campaign Shop that costs up to 10 Glory, paying for it as normal.' },
      { name: 'Indenture', description: 'You gain the Set Dice Exploration Skill.' },
    ],
    factionChoices: [
      { name: 'Execute', description: 'You earn 3 Glory.', condition: ['tyranids'], conditionLabel: '(Tyranids must choose this option)' },
      { name: 'Crump', description: 'You earn 6 Stompin\' Points.', condition: ['orks'], conditionLabel: '(Orks Only)' },
    ],
  },
  {
    result: 8, name: 'Xenotech Cache',
    universalChoices: [
      { name: 'Repurpose', description: 'Take up to 3 pieces of battlekit from any Xenos Factions\' Armoury or Equipment list, worth up to 100 credits combined. No cost, but counts towards credit limits.' },
    ],
    factionChoices: [
      { name: 'Take', description: 'Now or during any quartermaster step, you can purchase a single piece of battlekit from your Campaign Shop that costs up to 8 Glory, paying for it as normal.', condition: ['xenos', 'outlaw', 'the_vermintide', 'pirate_crew'], conditionLabel: '(Xenos, Rogue Trader, Vermintide, or Pirate Crew Only)' },
      { name: 'Meditate', description: 'Reduce your current Threat by D3.', condition: ['aeldari'], conditionLabel: '(Aeldari Only)' },
      { name: 'Acquire', description: 'You earn 60 Energy Sources.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 9, name: 'Black Market',
    universalChoices: [
      { name: 'Establish Contact', description: 'For the remainder of the campaign, you can purchase battlekit from your Campaign Shop that costs 7 Glory or less during the Trade step, paying for it normally.' },
    ],
    factionChoices: [
      { name: 'Recruit', description: 'The next time you choose an Institution, you earn 2 Infiltration Points immediately.', condition: ['genestealer_cults'], conditionLabel: '(Genestealer Cults Only)' },
      { name: 'Convert', description: 'The next time you choose a Demographic, you earn 2 Infiltration Points immediately.', condition: ['tau_empire'], conditionLabel: '(T\'au Empire Only)' },
      { name: 'Make a Deal', description: 'The next Campaign Shop battlekit you purchase costs 2 less Glory.', condition: ['pirate_crew'], conditionLabel: '(Pirate Crew Only)' },
    ],
  },
  {
    result: 11, name: 'Crash Site',
    universalChoices: [
      { name: 'Salvage', description: 'Now or during any quartermaster step, you can purchase a single piece of battlekit from your Campaign Shop that costs up to 6 Glory, paying for it as normal.' },
      { name: 'Report', description: 'You earn 2 Glory.' },
    ],
    factionChoices: [
      { name: 'Acquire', description: 'You earn 60 Galactic Intel.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 13, name: 'Augmetic Workshop',
    universalChoices: [
      { name: 'Replace', description: 'You can remove one Trauma, though not the corresponding Battle Scar, from one Elite model in your Warband.' },
    ],
    factionChoices: [],
  },
  {
    result: 14, name: 'Drug Lab',
    universalChoices: [
      { name: 'Take', description: 'You find D3 random Combat Elixirs (Emperor\'s Children rules). If you do not use them during the next battle, they are lost.' },
      { name: 'Indulge', description: 'For the remainder of the campaign, your Warband rolls Morale tests with +1 DICE.' },
    ],
    factionChoices: [
      { name: 'Steal', description: 'You earn 2D3 additional Raid Spoils.', condition: ['drukhari'], conditionLabel: '(Drukhari Only)' },
      { name: 'Destroy', description: 'You earn 2 Glory.', condition: ['adepta_sororitas', 'adeptus_ministorum', 'tyranids'], conditionLabel: '(Adepta Sororitas, Adeptus Ministorum, or Tyranids — must choose)' },
    ],
  },
  {
    result: 17, name: 'Mining Operation',
    universalChoices: [
      { name: 'Trade', description: 'You earn 150 additional credits.' },
      { name: 'Construct', description: 'Now or during any quartermaster step, you can purchase a single piece of battlekit from your Campaign Shop that costs up to 5 Glory, paying for it as normal.' },
    ],
    factionChoices: [
      { name: 'Acquire', description: 'You earn 60 Raw Minerals.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 19, name: 'Promethium Deposit',
    universalChoices: [
      { name: 'Rearm', description: 'You can add up to 150 credits worth of battlekit from your Armoury or Equipment List to your reserves.' },
      { name: 'Refuel', description: 'One VEHICLE model in your Warband gains +2 DICE to all Dash Success Rolls during your next battle.' },
    ],
    factionChoices: [
      { name: 'Huff', description: 'You earn 1 Glory. Add 4 to the Ascendancy of Slaanesh.', condition: ['chaos_daemons'], conditionLabel: '(Chaos Daemons Only)' },
      { name: 'Acquire', description: 'You earn 60 Biomatter.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 24, name: 'Mercenary Company',
    universalChoices: [
      { name: 'Recruit', description: 'Now or during any quartermaster step, you can recruit one mercenary, reducing its cost by up to 2 Glory.' },
    ],
    factionChoices: [
      { name: 'Duel', description: 'You earn 1 Glory. Add D3 to your Personal Reputation.', condition: ['heretic_astartes'], conditionLabel: '(Heretic Astartes Only)' },
      { name: 'Fight', description: 'You earn 6 Stompin\' Points.', condition: ['orks'], conditionLabel: '(Orks Only)' },
    ],
  },
  {
    result: 28, name: 'Warp Rift',
    universalChoices: [
      { name: 'Mark Location', description: 'Your Warband gains the Circle Back Exploration Skill.' },
    ],
    factionChoices: [
      { name: 'Summon', description: 'Now or during any future quartermaster step, you can recruit one DAEMON mercenary, reducing its cost by 2 Glory.', condition: ['chaos'], conditionLabel: '(Chaos Only)' },
      { name: 'Syphon', description: 'Choose one PSYKER model, then roll D6: 1. Elite Trauma chart. 2–5. +2 XP. 6. Learn a random Shared Psychic Power for free.', condition: ['HAS_PSYKER'], conditionLabel: '(requires PSYKER model)' },
      { name: 'Travel', description: 'Roll D6: 1. Random Elite rolls Trauma chart. 2–5. Gain Careful and Extra Dice Exploration Skills. 6. Choose another unexplored location from Common or Uncommon tables.', condition: ['NOT:aeldari', 'NOT:drukhari', 'NOT:harlequins', 'NOT:tau_empire', 'NOT:tyranids'], conditionLabel: '(not Aeldari, Drukhari, Harlequins, T\'au, or Tyranids)' },
      { name: 'Gaze', description: 'Reduce your current Threat by 2D3.', condition: ['aeldari'], conditionLabel: '(Aeldari Only)' },
      { name: 'Discover', description: 'Give your Nemesis 3 True Name Points.', condition: ['heretic_astartes:grey_knights'], conditionLabel: '(Grey Knights Only)' },
    ],
  },
];

const LEGENDARY_LOCATIONS: ExplorationLocation[] = [
  {
    result: 6, name: 'Relic of the Ages',
    universalChoices: [
      { name: 'Claim', description: 'You earn 10 Glory.' },
    ],
    factionChoices: [
      { name: 'Steal', description: 'You earn 20 additional Raid Spoils.', condition: ['drukhari'], conditionLabel: '(Drukhari Only)' },
    ],
  },
  {
    result: 8, name: 'Gene Bank',
    universalChoices: [
      { name: 'Integrate', description: 'Choose one Elite model. For the rest of the campaign, at the start of each of its Activations, remove 1 BLOOD or INFECTION MARKER from it. If removed, gain 1 BLESSING MARKER.' },
    ],
    factionChoices: [
      { name: 'Recover', description: 'Add 3 Powerful Gene Seeds to your reserves. When used, the recruited model is immediately promoted to Elite and earns 2 XP.', condition: ['adeptus_astartes'], conditionLabel: '(Adeptus Astartes Only)' },
    ],
  },
  {
    result: 10, name: 'Secret Dealer',
    universalChoices: [
      { name: 'Establish Contact', description: 'For the remainder of the campaign, you can purchase any battlekit from your Campaign Shop, paying for it normally.' },
    ],
    factionChoices: [
      { name: 'Assassinate', description: 'You earn 2 Glory and one Elite model earns 2 additional XP.', condition: ['officio_assassinorum'], conditionLabel: '(Officio Assassinorum Only)' },
      { name: 'Plot-Plan', description: 'You earn 1 Glory and one Elite model (besides leader) earns 10 Conniving Points.', condition: ['the_vermintide'], conditionLabel: '(Vermintide Only)' },
      { name: 'Recruit', description: 'Choose an Institution you do not Control. You now Control that Institution.', condition: ['genestealer_cults'], conditionLabel: '(Genestealer Cults Only)' },
      { name: 'Convert', description: 'Choose a Demographic you have not Converted. Convert that Demographic.', condition: ['tau_empire'], conditionLabel: '(T\'au Empire Only)' },
      { name: 'Make a Deal', description: 'The next Campaign Shop battlekit you purchase costs 3 less Glory.', condition: ['pirate_crew'], conditionLabel: '(Pirate Crew Only)' },
    ],
  },
  {
    result: 13, name: 'Legendary Weapon',
    universalChoices: [
      { name: 'Return', description: 'You earn 4 Glory.' },
      { name: 'Wield', description: 'Now or during any quartermaster step, you can purchase a single piece of battlekit from your Campaign Shop, reducing its price by 1 Glory.' },
    ],
    factionChoices: [],
  },
  {
    result: 15, name: 'Lost Champion',
    universalChoices: [
      { name: 'Recruit Champion', description: 'You can add a faction-specific champion model to your Warband, even if it would exceed normal limits. If you have room for another Elite, you can immediately promote it. Check your faction\'s lost champion entry for the specific model and loadout.' },
    ],
    factionChoices: [],
  },
  {
    result: 17, name: 'Derelict Ship',
    universalChoices: [
      { name: 'Salvage', description: 'Now or during any quartermaster step, you can purchase any single piece of battlekit from your Campaign Shop that costs up to 8 Glory, paying for it as normal.' },
    ],
    factionChoices: [
      { name: 'Send to Fleet', description: 'You earn 1 Glory. Add D3 to your Warfleet Reputation.', condition: ['heretic_astartes'], conditionLabel: '(Heretic Astartes Only)' },
      { name: 'Loot', description: 'You earn 5 additional Raid Spoils.', condition: ['drukhari'], conditionLabel: '(Drukhari Only)' },
      { name: 'Acquire', description: 'You earn 100 Energy Sources.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 18, name: 'Blackstone Deposit',
    universalChoices: [
      { name: 'Sell', description: 'You earn an additional 200 credits.' },
      { name: 'Upgrade', description: 'Up to 2 pieces of armour or models with -1+ armour gain NEGATE FIRE, NEGATE GAS, or NEGATE SHRAPNEL (your choice).' },
      { name: 'Craft', description: 'Now or during any quartermaster step, you can purchase any amount of battlekit from your Campaign Shop up to a total cost of 7 Glory, paying for it as normal.' },
    ],
    factionChoices: [
      { name: 'Acquire', description: 'You earn 100 Raw Minerals.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 20, name: 'War Machine',
    universalChoices: [
      { name: 'Claim', description: 'You earn 2 Glory.' },
      { name: 'Disassemble', description: 'Now or during any quartermaster step, you can purchase any single piece of battlekit from your Campaign Shop, paying for it as normal.' },
    ],
    factionChoices: [
      { name: 'Extract', description: 'You find two pieces of archeotech, randomly chosen from among any type(s) you choose.', condition: ['adeptus_mechanicus'], conditionLabel: '(Adeptus Mechanicus Only)' },
      { name: 'Acquire', description: 'You earn 30 Biomatter, 30 Energy Sources, 30 Galactic Intel, and 30 Raw Minerals.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
      { name: 'Kaboom', description: 'You earn 8 Stompin\' Points.', condition: ['orks'], conditionLabel: '(Orks Only)' },
    ],
  },
  {
    result: 23, name: 'Blood Pit',
    universalChoices: [],
    factionChoices: [
      { name: 'Burn', description: 'You earn 3 Glory.', condition: ['NOT:chaos'], conditionLabel: '(non-Chaos Only)' },
      { name: 'Anoint', description: 'One Elite model of your choice earns an additional 5 XP.', condition: ['chaos'], conditionLabel: '(Chaos Only)' },
      { name: 'Blood Ritual', description: 'Each eligible model can roll for an additional Permanent Mutation, and each Elite model earns 1 XP.', condition: ['chaos_cult'], conditionLabel: '(Chaos Cult Only)' },
      { name: 'Blood for the Blood God', description: 'You earn 2 Glory. Add 4 to the Ascendancy of Khorne.', condition: ['chaos_daemons'], conditionLabel: '(Chaos Daemons Only)' },
      { name: 'Claim', description: 'You earn 1 Glory. Add D3 to your Dark Gods Reputation.', condition: ['heretic_astartes'], conditionLabel: '(Heretic Astartes Only)' },
      { name: 'Bathe', description: 'One Elite model gains 20 Claimed Skulls.', condition: ['heretic_astartes:world_eaters'], conditionLabel: '(World Eaters Only)' },
      { name: 'Deconsecrate', description: 'Up to three Elite models each earn 2 additional XP.', condition: ['adepta_sororitas', 'adeptus_ministorum', 'heretic_astartes:grey_knights', 'the_inquisition:ordo_malleus'], conditionLabel: '(Adepta Sororitas, Adeptus Ministorum, Grey Knights, or Ordo Malleus Only)' },
      { name: 'Acquire', description: 'You earn 100 Biomatter.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 30, name: 'Secret Library',
    universalChoices: [
      { name: 'Secret Weakness', description: 'Choose one Elite model and one type (Imperial, Chaos, Xenos, Outlaw). That model has +1 INJURY DICE against that type for the rest of the campaign.' },
    ],
    factionChoices: [
      { name: 'Psychic Knowledge', description: 'Choose one PSYKER model. It learns a random Shared Psychic Power for free, ignoring normal limits.', condition: ['HAS_PSYKER'], conditionLabel: '(requires PSYKER model)' },
      { name: 'Knowledge for Tzeentch', description: 'You earn 2 Glory. Add 4 to the Ascendancy of Tzeentch.', condition: ['chaos_daemons'], conditionLabel: '(Chaos Daemons Only)' },
      { name: 'Arcane Knowledge', description: 'You earn 5 additional Arcane Points.', condition: ['heretic_astartes:thousand_sons'], conditionLabel: '(Thousand Sons Only)' },
      { name: 'Prophecies', description: 'Reduce your current Threat to 0.', condition: ['aeldari'], conditionLabel: '(Aeldari Only)' },
      { name: 'Acquire', description: 'You earn 100 Galactic Intel.', condition: ['leagues_of_votann'], conditionLabel: '(Leagues of Votann Only)' },
    ],
  },
  {
    result: 36, name: 'Webway Gate',
    universalChoices: [
      { name: 'Travel', description: 'Choose any other location you have not yet explored from any Exploration table and explore that location. You still earn credits based on your original roll.' },
    ],
    factionChoices: [],
  },
];

export const EXPLORATION_TABLES: Record<'common' | 'rare' | 'legendary', { label: string; locations: ExplorationLocation[] }> = {
  common:    { label: 'Common', locations: COMMON_LOCATIONS },
  rare:      { label: 'Rare', locations: RARE_LOCATIONS },
  legendary: { label: 'Legendary', locations: LEGENDARY_LOCATIONS },
};

// ============================================================================
// EXPLORATION SKILLS — warband-level skills gained from exploration
// ============================================================================

export const EXPLORATION_SKILL_DEFS: Record<string, string> = {
  'Duplicate': 'After you roll, select any Exploration Die and add another die with an identical result, including any modifications, to your total.',
  'Careful': 'You may roll 1 fewer Exploration Die, to a minimum of 1.',
  'Circle Back': 'Modify one Exploration Die result by -1.',
  'Extra Dice': 'You may roll 1 extra Exploration Die.',
  'Lucky': 'Roll an extra Exploration Die that is paired with one of your other dice. After you roll, choose one die in the pair to keep and one to discard.',
  'Reroll': 'Reroll any single Exploration Die once.',
  'Seek': 'Modify one Exploration Die result by +1.',
  'Set Dice': 'Before rolling, select any one Exploration Die and set it to a number you want instead of rolling it.',
};
