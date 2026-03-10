/**
 * TrenchHammer — Patron definitions per faction.
 *
 * Patrons are selected at Warband creation. Each has a list of named skills.
 * When a model rolls 2 or 12 on any skill table they pick one Patron Skill.
 *
 * Ability `condition` field mirrors source notation such as:
 *   "(Psyker Only)", "(LIMIT: 1)", "(Leader Only)", "(Warband Only)", etc.
 */

export interface PatronAbility {
  name: string;
  description: string;
  /** Optional restriction shown in the source (e.g. "Psyker Only", "LIMIT: 1") */
  condition?: string;
}

export interface Patron {
  id: string;
  name: string;
  description: string;
  abilities: PatronAbility[];
}

// ══════════════════════════════════════════════════════════════════════════════
// SHARED PATRONS — defined once and referenced by multiple factions below.
// ══════════════════════════════════════════════════════════════════════════════

const ADMINISTRATUM_PREFECTUS: Patron = {
  id: 'administratum_prefectus',
  name: 'Administratum Prefectus',
  description: "A high-ranking official of the Administratum whose red tape and legal authority shape the warband's resources and conduct.",
  abilities: [
    { name: 'Arrest Order', description: 'At the start of the battle, choose one enemy model. This model has +1 DICE to Hit and +1 INJURY DICE that model during this battle with all attacks, and it can choose to gain +1 DICE to any Dash Success Roll, but if it does and succeeds, it must move in as close as possible to the chosen enemy as its movement allows.' },
    { name: 'Legal Action', description: 'At the start of the battle, after the deployment, select one enemy model. You can move this model up to 6" in any direction you wish, though not into Melee combat, into impassable terrain, or out of the battlefield.' },
    { name: 'Punishable Offense', description: 'Whenever an enemy successfully Charges this model, that enemy gains a BLOOD MARKER.' },
    { name: 'Red Tape', description: 'Any enemy Charging this model can only use their base Movement characteristics and not add a D6 to their charge distance.' },
    { name: 'Restraint Protocols', description: 'Enemies cannot Retreat from this model.' },
    { name: 'Threat Response', description: 'Once during each Turn, when an enemy ends its movement within 12" of this model, this model may immediately make an attack with a ranged weapon against that enemy if otherwise able.' },
  ],
};

const ECCLESIASTIC_CARDINAL: Patron = {
  id: 'ecclesiastic_cardinal',
  name: 'Ecclesiastic Cardinal',
  description: "A senior figure of the Imperial Cult who channels the Emperor's divine will to inspire and purge.",
  abilities: [
    { name: 'Ardent Eradication', description: 'When this model causes a Down enemy to roll on the Injury chart with a ranged attack, you may set 1 Die to 6 and roll the rest as normal.' },
    { name: 'Ecclesiastic Inspiration', description: 'At the start of each battle that this model participates in, you gain 1 Miracle.', condition: 'Adepta Sororitas Warband Only' },
    { name: 'Fervent Brawl', description: 'This model is always considered to be equipped with a Close Combat Weapon if it has a free hand in melee, and its attacks with this weapon have +1 DICE and +1 INJURY DICE.' },
    { name: 'Rally the Flock', description: 'At the end of each battle that this model took part in, you gain D3+1 Flock points.', condition: 'Adeptus Ministorum Warband Only' },
    { name: 'Redeemed Through Fire', description: "This model's attacks with the FIRE Keyword have +1 INJURY DICE." },
    { name: 'Unwavering Devotion', description: 'Whenever this model rolls on the Elite Trauma Chart, you can roll twice and choose one of the results.' },
    { name: 'Zealous Persecution', description: 'Whenever this model takes an enemy Out of Action, this model gains 1 BLESSING MARKER.' },
  ],
};

const THE_INDOMITUS_CRUSADE: Patron = {
  id: 'the_indomitus_crusade',
  name: 'The Indomitus Crusade',
  description: "Roboute Guilliman's galaxy-spanning crusade provides tactical guidance, personnel, and materiel to the warband.",
  abilities: [
    { name: 'Adaptive Tactics', description: 'Select any skill you want from the Wild Card Skills.' },
    { name: 'Medical Talent', description: 'Once after each battle, when this model or another in your Warband rolls on the Elite Trauma Chart, or makes a casualty test, you can reroll. The second result stands.' },
    { name: 'Organizational Talent', description: 'While this model is in your Warband, increase the LIMIT of one piece of battlekit you are allowed to take by 1. Each piece of battlekit can be chosen only once.' },
    { name: 'Supply Shipment: Armour and Equipment', description: 'The cost of any suit of armour or equipment worth 15 credits or more is reduced by 5 credits if the model with this skill is part of the Warband. Note that weapons bought with this lower cost will make it easier for you to fit under the Threshold value.', condition: 'LIMIT: 1' },
    { name: 'Supply Shipment: Melee Weapons', description: 'The cost of any melee weapon worth 10 credits or more is reduced by 5 credits if the model with this skill is part of the Warband. Note that weapons bought with this lower cost will make it easier for you to fit under the Threshold value.', condition: 'LIMIT: 1' },
    { name: 'Supply Shipment: Ranged Weapons', description: 'The cost of any ranged weapon worth 20 credits or more is reduced by 5 credits if the model with this skill is part of the Warband. Note that weapons bought with this lower cost make it easier for you to fit under the Threshold value.', condition: 'LIMIT: 1' },
  ],
};

const LORD_INQUISITOR: Patron = {
  id: 'lord_inquisitor',
  name: 'Lord Inquisitor',
  description: 'One of the most powerful agents of the Imperium. Choose Puritan or Radical when this Patron is selected.',
  abilities: [
    { name: 'Bound Entity', description: 'The model gains the DEEP STRIKE Keyword.', condition: 'Radical Only' },
    { name: 'Highly Placed Ally', description: 'This model gains the Set Dice Exploration Skill.' },
    { name: 'Inquisitorial Honor', description: 'At the end of each battle, you gain 1 Glory if this model participated.', condition: 'non-Inquisition Warband Only' },
    { name: 'Master of Spies', description: 'While this model is in your Warband, you can roll twice for your Shadow Operation at the start of each battle, choosing one result.', condition: 'Inquisition Warband Only' },
    { name: 'Secret Forces', description: "While this model is in your Warband, increase the LIMIT of one type of Troop you are allowed to take by 1. You cannot choose a model with a LIMIT of 1 or that has the LARGE Keyword, and each Troop type can be chosen only once." },
    { name: 'Trained by a Legend', description: 'This model gains the INFILTRATOR and STEALTH Keywords.' },
    { name: 'Upholder of the Creed', description: 'You have +1 DICE to Morale tests while this model is on the battlefield and not Down.', condition: 'Puritan Only' },
    { name: 'Void Trader', description: 'This model gains the Lucky Exploration Skill.' },
  ],
};

const CHAOS_UNDIVIDED: Patron = {
  id: 'chaos_undivided',
  name: 'Chaos Undivided',
  description: 'The combined power of all four Chaos Gods, offering gifts that transcend individual allegiance.',
  abilities: [
    { name: 'Daemonic Whispers', description: 'With a successful Success Roll this model can force any single enemy model with 24" that is touching any Cover, but not in Melee combat, to move 1", leaving the Cover. The chosen model is moved by your opponent, and cannot take the model into Melee combat or into other Cover.' },
    { name: 'Diabolist', description: "This model's psychic powers that cause Injuries (including attacks) have +1 INJURY DICE.", condition: 'Psyker Only' },
    { name: 'Exalted Possession', description: "This model gains the DAEMON Keyword, its movement speed is increased by 2\", and all injury rolls made against it have -1 DICE, but it gains 1 BLOOD MARKER at the end of each of its Activations.", condition: 'non-Daemon Only' },
    { name: 'Exalted Possessor', description: 'With a successful Success Roll this model can force any opponent it is in melee combat with to make one of its own Melee attacks against itself. You can choose which weapon to use.', condition: 'Daemon Only' },
    { name: 'Hate-Fuelled Demagogue', description: 'This model and each friendly model within 6" of it gain the CRITICAL Keyword on all attacks they make.' },
    { name: 'Master Of The Union', description: 'As an Action with a Success Roll, this model can choose one other friendly DAEMON within 6" that it can see. If this model is a DAEMON, it must choose a model that does not share any of the following Keywords with it: KHORNE, NURGLE, SLAANESH, TZEENTCH, UNDIVIDED. If it succeeds, remove 1 BLOOD MARKER from the chosen model. If a BLOOD MARKER is removed in this way, the chosen model gains a BLESSING MARKER.' },
    { name: 'Profane Zeal', description: 'During an Activation in which it Charged, this model has +1 DICE to Hit and +1 INJURY DICE with melee attacks.' },
  ],
};

const CHAOS_WARLORD: Patron = {
  id: 'chaos_warlord',
  name: 'Chaos Warlord',
  description: "A brutal champion of Chaos whose presence drives the warband to ever greater acts of violence and conquest.",
  abilities: [
    { name: 'Flames of Spite', description: 'With a successful Risky Success Roll, this model can choose one enemy within 6" that it can see. That model must roll on the Injury chart. This injury has the FIRE Keyword.' },
    { name: 'Lord of Terror', description: 'This model gains the FEAR Keyword.' },
    { name: 'Merciless Overseer', description: 'Friendly non-Elite, non-mercenary models within 3" of this model have +1 DICE to Hit with all attacks.' },
    { name: 'Paragon Of Hatred', description: "This model's melee attacks hit each enemy it is in melee with." },
    { name: 'Trusted War Leader', description: 'At the end of each battle, you earn an additional 1 Glory.', condition: 'Leader Only' },
    { name: 'Veteran Raider', description: 'Enemy models never get free attacks against this model when it Retreats, and this model can move out of Melee Combat using its Standard Move, Charge, or Dash.' },
  ],
};

const PATRON_KHORNE: Patron = {
  id: 'khorne',
  name: 'Khorne',
  description: 'The Blood God demands skulls and slaughter. His blessings reward unbridled martial fury.',
  abilities: [
    { name: 'Aspect Of Death', description: "This model's attacks have +1 DICE to Hit and to Injure against Down enemies." },
    { name: 'Brazen Hide', description: "This model's armour improves by -1, stacking up to -3." },
    { name: 'Devastating Blow', description: 'Whenever this model hits with a melee attack, the target also suffers a STUN MARKER.' },
    { name: 'Glory Of Battle', description: "This model's movement speed increases by 2\"." },
    { name: 'Immense Power', description: "Injuries caused by this model's melee attacks have a +1 flat bonus and cannot have -DICE applied to them." },
    { name: 'Rage Incarnate', description: 'When this model is taken Out of Action, before removing it from the table, it can make a single melee attack against an enemy it is in close combat with. BLOOD MARKERS cannot be spent on this attack\'s Success Roll.' },
  ],
};

const PATRON_NURGLE: Patron = {
  id: 'nurgle',
  name: 'Nurgle',
  description: 'The Plague Lord bestows foul resilience and pestilential gifts upon those who embrace decay.',
  abilities: [
    { name: 'Acidic Ichor', description: "This model's melee attacks gain ARMOUR PIERCING 1, stacking with other sources of ARMOUR PIERCING." },
    { name: 'Arch-Contaminator', description: 'As long as at least one INFECTION MARKER is spent, this model needs to spend 1 fewer BLOOD MARKERS/INFECTION MARKERS to cause a Bloodbath.' },
    { name: 'Foul Effluents', description: 'Whenever an enemy model activates while within 1" of this model, that enemy suffers a BLOOD MARKER. A model with NEGATE GAS is not affected.' },
    { name: 'Heaving Mass', description: 'This model gains the LARGE Keyword if it did not already have it, and whenever it successfully Charges one or more enemies, one of those enemies gains a STUN MARKER.' },
    { name: 'Overflowing Fecundity', description: "At the start of each of this model's Activations, remove 1 BLOOD MARKER from it." },
    { name: 'Plague Fly Hive', description: 'This model and each friendly NURGLE or CHAOS CULT model within 3" of it have the STEALTH Keyword.' },
  ],
};

const PATRON_SLAANESH: Patron = {
  id: 'slaanesh',
  name: 'Slaanesh',
  description: 'The Dark Prince rewards those who pursue sensation and perfection to its most extreme extremes.',
  abilities: [
    { name: 'Faultless Duellist', description: 'This model scores a Critical Hit with melee attacks on a result of 10 or higher.' },
    { name: 'Glutton For Punishment', description: 'BLOOD MARKERS cannot be spent on this model\'s attacks. In addition, while this model has 3 or more BLOOD MARKERS, it has +1 DICE to Hit with all attacks.' },
    { name: 'Intoxicating Musk', description: 'Enemies within 1" of this model have -1 DICE to Hit with melee attacks. Models with NEGATE GAS are immune.' },
    { name: 'Loathsome Grace', description: "This model's movement speed increases by 2\"." },
    { name: 'The Murderdance', description: 'Immediately after this model Charges, it can make a single additional attack with one of its melee weapons.' },
    { name: 'Unbound Arrogance', description: 'Whenever this model makes a melee attack, you and your opponent each secretly choose a number between 1 and 3, then simultaneously reveal your choices. If the numbers differ, this model has +DICE equal to the number you chose to Hit with that attack. If they are the same, this model has -1 DICE to Hit instead.' },
  ],
};

const PATRON_TZEENTCH: Patron = {
  id: 'tzeentch',
  name: 'Tzeentch',
  description: 'The Architect of Fate weaves inscrutable plans, offering gifts of change and sorcerous power.',
  abilities: [
    { name: 'Aetherstride', description: 'This model ignores Difficult and Dangerous Terrain, and does not suffer Injury rolls due to falling, nor does it suffer an Injury roll due to failing a Diving Charge.' },
    { name: 'Arrogance Of Aeons', description: 'This model has +1 DICE to Deny the Witch, and can do so at a range of up to 18".', condition: 'Psyker Only' },
    { name: 'Fractal Mind', description: 'This model can choose to use an additional psychic power before beginning to count how many powers it has used during its Activation. That power has PERILOUS ±1.', condition: 'Psyker Only' },
    { name: 'Incorporeal Form', description: 'Injury rolls made against this model have an additional -1 DICE unless they have the FIRE, GAS, or PSYCHIC Keyword.' },
    { name: 'Lorekeeper Of Tzeentch', description: "The range of all of this model's psychic powers is increased by 6\".", condition: 'Psyker Only' },
    { name: 'Tyrant of the Warp', description: 'This model does not suffer Perils of the Warp unless the power it is using has PERILOUS, but reduce the PERILOUS value by 1. (PERILOUS ±0 still allows it to suffer Perils of the Warp on a 2 or 12.)', condition: 'Psyker Only' },
  ],
};

const HERETEK_LORD: Patron = {
  id: 'heretek_lord',
  name: 'Heretek Lord',
  description: 'A fallen Tech-Priest who blends dark machine lore with heretical power to forge weapons and fortify warriors.',
  abilities: [
    { name: 'Architect Of Destruction', description: "This model's weapons with BLAST increase their BLAST radius by 2\"." },
    { name: 'Bastion', description: 'Enemies that Charged during this Turn have -1 INJURY DICE against this model, and cannot force this model to move.' },
    { name: 'Daemonsmith', description: 'Injury rolls made against friendly VEHICLE models within 3" of this model have -1 DICE.' },
    { name: 'Implacable Taskmaster', description: 'The first time this model moves during each of its Activations, one friendly model within 6" of it can also move up to half of its own movement speed. This movement can bring that model into close combat, but also provides free attacks as if it Retreated if it leaves close combat.' },
    { name: 'Siege Lord', description: 'If the target of any of this model\'s ranged attack would have an armour modifier of -2 or higher, you may set one die of the injury roll to a 6 before the roll is made. The rest of the dice for the injury roll are rolled as normal.' },
    { name: 'Unyielding Mettle', description: 'Up to the first -2 of this model\'s armour has IMPERVIOUS.' },
  ],
};

const PIRATE_LORD: Patron = {
  id: 'pirate_lord',
  name: 'Pirate Lord',
  description: "A ruthless void-pirate whose network of contacts and brutal reputation opens doors across the galaxy.",
  abilities: [
    { name: 'The Boot', description: 'Downed Enemy models in Melee Combat with this model cannot automatically Stand at the start of their Activation.' },
    { name: 'Pillager', description: 'This model gains the Re-roll Exploration Skill twice.' },
    { name: 'Port Contacts', description: 'While this model is in your warband, you can increase your LIMIT for any weapon, armour, or equipment by 1. Each piece of battlekit can only be increased once in this way.' },
    { name: 'Scar Collector', description: 'This model can suffer up to 2 additional Battle Scars before being killed.' },
    { name: 'Walk the Plank', description: 'Enemy models within 3" of this model automatically fail all Success Rolls made to avoid falling when Downed, and suffer +1 DICE INJURY to the Injury roll caused by such a fall.' },
    { name: 'Whale Hunter', description: 'When this model makes a Melee Attack Success Roll against a LARGE enemy, they roll 3d6 to hit instead of 2d6, totalling the sum, to Hit.' },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// FACTION PATRONS
// ══════════════════════════════════════════════════════════════════════════════

export const FACTION_PATRONS: Record<string, Patron[]> = {

  // ── ADEPTUS ASTARTES ──────────────────────────────────────────────────────
  adeptus_astartes: [
    {
      id: 'chapter_master',
      name: 'Chapter Master',
      description: 'A venerable lord of the Adeptus Astartes. Grants three universal skills plus three subfaction-specific skills. If no subfaction is chosen, the Codex Astartes skills apply.',
      abilities: [
        // Universal
        { name: 'Champion Of Humanity', description: 'This model has +1 DICE to Hit and +1 INJURY DICE with melee attacks against Elite enemies, but must attack an Elite target when making a melee attack if possible.' },
        { name: "The Imperium's Sword", description: 'Select any skill you want from the Melee & Strength Skills.' },
        { name: 'Storm Of Fire', description: 'Select any skill you want from the Ranged Skills.' },
        // Codex / no subfaction
        { name: 'Adept Of The Codex', description: 'While this model is on the Battlefield, you cannot fail Morale tests.', condition: 'No Subfaction' },
        { name: 'Master Of Strategy', description: 'After you activate this model, you decide the next 3 models to activate, following the normal limits (i.e. the second will usually be your own model again). If you choose a model in a Fireteam, the model\'s owner decides if it will activate as a Fireteam or individually.', condition: 'No Subfaction' },
        { name: 'Warden of Macragge', description: 'When an enemy ends its movement within 6" of this model, this model can immediately make a single ranged attack against that enemy if it is otherwise able to do so.', condition: 'No Subfaction' },
        // Black Templars
        { name: 'Epitome Of Piety', description: 'This model can Deny the Witch as if it had PSYKER 1. If it is already a PSYKER, it has +1 DICE when Denying the Witch.', condition: 'Black Templars Only' },
        { name: 'Oathkeeper', description: 'If any ally within 1" of this model is hit by a ranged or melee weapon (excluding BLAST weapons), you can choose to redirect the hit to this model instead. Determine the injuries exactly as if the weapon just hit this model.', condition: 'Black Templars Only' },
        { name: 'Paragon Of Fury', description: 'During an Activation in which it Charged, this model has +1 DICE to Hit and +1 INJURY DICE with melee attacks.', condition: 'Black Templars Only' },
        // Blood Angels
        { name: 'Gift Of Foresight', description: 'Once during each battle, you can reroll one Success Roll this model takes, or an injury roll made against it.', condition: 'Blood Angels Only' },
        { name: 'Heroic Bearing', description: "This model's Actions, Abilities, Skills, and psychic powers can treat its allies as if they were 3\" closer than they are.", condition: 'Blood Angels Only' },
        { name: 'Soulwarden', description: 'The first -1 of armour of this model and each friendly ASTARTES model within 6" of it have IMPERVIOUS.', condition: 'Blood Angels Only' },
        // Dark Angels
        { name: 'Honour Of The First Legion', description: 'Whenever an enemy model ends its movement within 6" of this model, this model can immediately Charge that enemy.', condition: 'Dark Angels Only' },
        { name: 'Calibanite Knight', description: 'This model scores a Critical Hit with melee attacks on a result of 10 or higher.', condition: 'Dark Angels Only' },
        { name: 'Stubborn Tenacity', description: 'When this model would be taken Out of Action, you can instead treat the result as a Down result. If you do, it is automatically taken Out of Action at the end of the current Turn.', condition: 'Dark Angels Only' },
        // Deathwatch
        { name: 'Castellan Of The Black Vault', description: 'When you choose this skill, you can purchase any battlekit from your Campaign Shop, with its cost reduced by 1 Glory, but any battlekit purchased in this way can be equipped only by this model.', condition: 'Deathwatch Only' },
        { name: 'Nowhere To Hide', description: "This model's ranged attacks ignores the STEALTH Keyword, and it can declare a Charge against an enemy it cannot see.", condition: 'Deathwatch Only' },
        { name: 'The Ties That Bind', description: 'This model may form a FIRETEAM with any one non-ELITE model of the Warband. In addition, the first time either model fails a Risky Success Roll during a Fireteam Activation, the Activation does not end.', condition: 'Deathwatch Only' },
        // Grey Knights
        { name: 'First To The Fray', description: 'At the start of each battle, after deployment, this model can move up to 6".', condition: 'Grey Knights Only' },
        { name: 'Psychic Epitome', description: 'This model has +1 DICE to Hit with all attacks that have the PSYCHIC Keyword.', condition: 'Grey Knights Only' },
        { name: 'Unyielding Anvil', description: 'This model cannot be forced to move.', condition: 'Grey Knights Only' },
        // Imperial Fists
        { name: 'Architect Of War', description: 'This model is always considered In Cover and Defending an Obstacle, and the first -1 of its armour has IMPERVIOUS.', condition: 'Imperial Fists Only' },
        { name: 'Hand Of Dorn', description: 'At the start of each battle, this model gains D3 BLESSING MARKERS.', condition: 'Imperial Fists Only' },
        { name: 'Siege Master', description: "If the target of any of this model's ranged attack would have an armour modifier of -2 or higher, you may set one die of the injury roll to a 6 before the roll is made. The rest of the dice for the injury roll are rolled as normal.", condition: 'Imperial Fists Only' },
        // Iron Hands
        { name: 'Adept Of The Omnissiah', description: 'As an Action with a Success Roll, this model can attempt to repair itself or a friendly MECHANICUS, ARTIFICIAL, or VEHICLE model within 6" of it. If it succeeds, remove 1 BLOOD MARKER from that model. If this model is a Techmarine, instead its Blessing of the Omnissiah Ability removes D3 BLOOD MARKERs instead of 1.', condition: 'Iron Hands Only' },
        { name: 'Merciless Logic', description: 'This model has +1 DICE to Hit and +1 INJURY DICE against enemies that are Down.', condition: 'Iron Hands Only' },
        { name: 'Student Of History', description: 'After this model takes an enemy model Out of Action or knocks it Down, this model can move up to half its movement speed. This movement can allow this model to enter melee combat, but it provides free attacks as if it Retreated if it was in close combat already, except from the enemy that triggered this effect.', condition: 'Iron Hands Only' },
        // Legion of the Damned
        { name: 'All-Consuming Flames', description: "This model's melee attacks gain FIRE.", condition: 'Legion of the Damned Only' },
        { name: 'Ethereal Approach', description: 'When this model is deployed, normally or via INFILTRATOR or DEEP STRIKE, it becomes invisible, and enemies cannot target it with ranged attacks or Charges. Weapons with the Keyword BLAST it as normal if it is in the radius of the weapon. This effect ends if this model moves from its exact position in any way, it makes a Ranged Attack, or an enemy model comes within 1.5" of it.', condition: 'Legion of the Damned Only' },
        { name: 'Undying', description: 'You no longer must roll on the Elite Trauma table for this model.', condition: 'Legion of the Damned Only' },
        // Raven Guard
        { name: 'Echo Of The Ravenspire', description: 'Once during each battle, as an Action that requires no roll, if this model is at least 6" away from all enemies that can see it, you can remove this model from the battlefield, then place it back on the battlefield anywhere at least 8" away from all enemies.', condition: 'Raven Guard Only' },
        { name: 'Feigned Flight', description: 'When this model Retreats, it can then Charge during the same Activation.', condition: 'Raven Guard Only' },
        { name: 'Shadowmaster', description: 'While this model is in cover from such an attack, enemies cannot make attacks against this model at Long Range (even if that attack ignores Cover and/or Long Range, or automatically hits).', condition: 'Raven Guard Only' },
        // Salamanders
        { name: 'Lord Of Fire', description: "This model's attacks with the FIRE Keyword have +1 INJURY DICE.", condition: 'Salamanders Only' },
        { name: 'Miraculous Constitution', description: 'When this model rolls on the Elite Trauma Chart, roll three times and choose any of the results.', condition: 'Salamanders Only' },
        { name: 'Patient And Determined', description: 'Once during each of its Activations, instead of rolling to hit with a ranged attack, this model can choose to hit automatically.', condition: 'Salamanders Only' },
        // Space Wolves
        { name: 'Aura Of Majesty', description: "This model's Actions, Abilities, Skills, and psychic powers can treat its allies as if they were 3\" closer than they are.", condition: 'Space Wolves Only' },
        { name: 'Beastslayer', description: 'This model has +1 INJURY DICE enemy models that have the LARGE Keyword.', condition: 'Space Wolves Only' },
        { name: 'Resolve Of The Bear', description: "The first -2 of this model's Armour has IMPERVIOUS.", condition: 'Space Wolves Only' },
        // White Scars
        { name: "Hunter's Instinct", description: 'This model has +1 INJURY DICE enemies Elite models with all attacks it makes.', condition: 'White Scars Only' },
        { name: 'Master Rider', description: 'While this model is on an Astartes Bike, it can declare a Charge up to 16" away, and it has +2" movement speed during Charges.', condition: 'White Scars Only' },
        { name: 'Master Of Snares', description: 'Whenever an enemy model successfully Charges this model, that enemy suffers 1 BLOOD MARKER.', condition: 'White Scars Only' },
      ],
    },
    THE_INDOMITUS_CRUSADE,
  ],

  // ── GREY KNIGHTS ─────────────────────────────────────────────────────────
  grey_knights: [
    {
      id: 'chapter_master',
      name: 'Chapter Master',
      description: 'The supreme commander of the Grey Knights, a paragon of purity and psychic might.',
      abilities: [
        { name: 'First To The Fray', description: 'At the start of each battle, after deployment, this model can move up to 6".', condition: 'Grey Knights Only' },
        { name: 'Psychic Epitome', description: 'This model has +1 DICE to Hit with all attacks that have the PSYCHIC Keyword.', condition: 'Grey Knights Only' },
        { name: 'Unyielding Anvil', description: 'This model cannot be forced to move.', condition: 'Grey Knights Only' },
      ],
    },
    THE_INDOMITUS_CRUSADE,
  ],

  // ── ADEPTA SORORITAS ─────────────────────────────────────────────────────
  adepta_sororitas: [
    {
      id: 'abbess_sanctorum',
      name: 'Abbess Sanctorum',
      description: "The supreme leader of the Adepta Sororitas whose burning faith and iron will forge warriors into instruments of the Emperor's vengeance.",
      abilities: [
        { name: 'Beacon Of Faith', description: 'At the start of this model\'s Activation, you can spend 1 Miracle in order to remove 1 BLOOD MARKER from this model. If a BLOOD MARKER is removed in this way, give this model a BLESSING MARKER.' },
        { name: 'Executioner Of Heretics', description: 'Whenever this model takes an enemy model Out of Action, you earn a Miracle, in addition to any you would normally earn.' },
        { name: 'Indomitable Belief', description: 'This model cannot be forced to move.' },
        { name: 'Inspiring Orator', description: 'Whenever you spend a Miracle on a Success Roll for this model or an ally within 3" of it, you can set one die\'s value to 6 before rolling instead of rolling it.' },
        { name: 'Pure Of Will', description: 'This model can Deny the Witch as if it had PSYKER 1. If it is already a PSYKER, it has +1 DICE when Denying the Witch.' },
        { name: 'Righteous Rage', description: 'This model can spend BLESSING MARKERS (including Miracles) on Injury rolls they cause to enemy models as if they were BLOOD MARKERS on that enemy.' },
      ],
    },
    ECCLESIASTIC_CARDINAL,
    LORD_INQUISITOR,
  ],

  // ── ADEPTUS CUSTODES ─────────────────────────────────────────────────────
  adeptus_custodes: [
    {
      id: 'captain_general',
      name: 'Captain-General',
      description: "The supreme commander of the Adeptus Custodes who hones each warrior under his command into a peerless guardian of the Emperor.",
      abilities: [
        { name: 'Champion of the Imperium', description: 'If any ally within 1" of this model is hit by a ranged or melee weapon (excluding BLAST weapons), you can choose to redirect the hit to this model instead. Determine the injuries exactly as if the weapon just hit this model.' },
        { name: 'Impregnable Mind', description: 'This model cannot be forced to move.' },
        { name: 'Master Of Martial Strategy', description: 'After you activate this model, you decide the next 3 models to activate, following the normal limits (i.e. the second will usually be your own model again). If you choose a model in a Fireteam, the model\'s owner decides if it will activate as a Fireteam or individually.' },
        { name: 'Peerless Warrior', description: 'This model has +1 INJURY DICE with all attacks.' },
        { name: 'Radiant Mantle', description: 'All attacks made against this model have -1 DICE to Hit.' },
        { name: 'Superior Creation', description: 'This model has NEGATE FIRE, NEGATE GAS, and NEGATE SHRAPNEL.', condition: 'Non-Psykana Only' },
      ],
    },
    THE_INDOMITUS_CRUSADE,
  ],

  // ── ADEPTUS MECHANICUS ───────────────────────────────────────────────────
  adeptus_mechanicus: [
    {
      id: 'fabricator_locum',
      name: 'Fabricator Locum',
      description: "A senior Magos who directs the warband with cold, calculating precision, optimising each warrior as an extension of the Omnissiah's will.",
      abilities: [
        { name: 'Emotionless Clarity', description: 'This model and each friendly MECHANICUS model within 6" of it ignore the FEAR Keyword.' },
        { name: 'Masterwork Bionics', description: 'This model has +1 DICE to all Climb, Dash, Jump, and Diving Charge Success Rolls.' },
        { name: 'First-Hand Field Testing', description: 'The first attack this model makes with a ranged weapon during each of its Activations has ARMOUR PIERCING 1, stacking with all other sources of ARMOUR PIERCING.' },
        { name: 'Necromechanic', description: 'This model has +1 DICE to use Actions that remove BLOOD MARKERS from friendly models, and whenever it would remove exactly 1 BLOOD MARKER with such an Action, it removes D3 instead.' },
        { name: 'Cartogrammatist', description: 'This model gains the Exploration Skill of your choice.' },
        { name: 'Supervisory Radiance', description: 'Friendly non-Elite MECHANICUS models within 3" of this model have +1 DICE to Hit with all attacks.' },
      ],
    },
    {
      id: 'skitarii_overseer',
      name: 'Skitarii Overseer',
      description: "A high-ranking officer of the Skitarii Legions who coordinates fire and manoeuvre through the Omnissiah's digital web.",
      abilities: [
        { name: 'Archived Engagements', description: 'All attacks have -1 DICE to Hit this model.' },
        { name: 'Battle-Sphere Uplink', description: 'Select any skill you want from the Ranged Skills.' },
        { name: 'Eyes Of The Omnissiah', description: 'This model ignores all -DICE to Hit with ranged attacks.' },
        { name: 'Firepoint Telemetry Cache', description: 'This model is always considered in Cover and gains the STEALTH Keyword.' },
        { name: 'Multitasking Cortex', description: 'This model may form a FIRETEAM with any one non-ELITE model of the Warband. In addition, the first time either model fails a Risky Success Roll during a Fireteam Activation, the Activation does not end.' },
        { name: 'Programmed Retreat', description: 'Enemy models never get free attacks against this model when it Retreats, and this model can move out of Melee Combat using its Standard Move, Charge, or Dash.' },
      ],
    },
  ],

  // ── ADEPTUS MINISTORUM ──────────────────────────────────────────────────
  adeptus_ministorum: [
    ECCLESIASTIC_CARDINAL,
    LORD_INQUISITOR,
  ],

  // ── ASTRA MILITARUM ──────────────────────────────────────────────────────
  astra_militarum: [
    {
      id: 'lord_general_militant',
      name: 'Lord General Militant',
      description: 'A decorated senior commander of the Astra Militarum whose voice carries the weight of entire campaigns.',
      abilities: [
        { name: 'Bellowing Voice', description: 'This model can issue Orders to allies within 18" instead of 6".' },
        { name: 'Draconian Disciplinarian', description: 'This model can attack friendly models within 1" of it. Whenever it causes a friendly model to take 1 or more BLOOD MARKERS or takes a friendly model Out of Action, you can choose one other friendly MILITARUM model within 12" of this model that has not yet activated this Turn. That model activates after this model\'s Activation ends, and it has +1 DICE to all Success Rolls during that Activation. If the first friendly model was taken Out of Action, it also has +1 INJURY DICE with all attacks during that Activation.' },
        { name: 'Faithful Servant of the Throne', description: 'This model can Deny the Witch as if it had PSYKER 1. If it is already a PSYKER, it has +1 DICE when Denying the Witch.' },
        { name: 'Iron Discipline', description: 'This model can suffer up to 2 additional Battle Scars before being killed.' },
        { name: 'Lead From The Front', description: 'During an Activation in which it Charged, this model has +1 DICE to Hit and +1 INJURY DICE with melee attacks.' },
        { name: 'Master Tactician', description: 'After you activate this model, you decide the next 3 models to activate, following the normal limits (i.e. the second will usually be your own model again). If you choose a model in a Fireteam, the model\'s owner decides if it will activate as a Fireteam or individually.' },
      ],
    },
    ADMINISTRATUM_PREFECTUS,
    THE_INDOMITUS_CRUSADE,
    LORD_INQUISITOR,
  ],

  // ── THE INQUISITION ───────────────────────────────────────────────────────
  the_inquisition: [
    LORD_INQUISITOR,
  ],

  // ── OFFICIO ASSASSINORUM ─────────────────────────────────────────────────
  officio_assassinorum: [
    {
      id: 'grand_master_of_assassins',
      name: 'Grand Master of Assassins',
      description: 'The supreme authority of the Officio Assassinorum who directs operatives with cold precision. Mandatory for Officio Assassinorum warbands.',
      abilities: [
        { name: 'Ensnaring Traps', description: 'Whenever an enemy model successfully Charges this model, that enemy suffers 1 BLOOD MARKER.' },
        { name: 'Extremis Sanction: Melee', description: 'All melee attacks this model makes need 1 less BLOOD MARKER to cause a Bloodbath.' },
        { name: 'Extremis Sanction: Ranged', description: 'All ranged attacks this model makes need 1 less BLOOD MARKER to cause a Bloodbath.' },
        { name: 'Perfect Reflexes: Pounce', description: 'Once during each Turn, when an enemy ends its movement within 6" of this model, this model may immediately Charge that enemy.' },
        { name: 'Perfect Reflexes: Snapshot', description: 'Once during each Turn, when an enemy ends its movement within 6" of this model, this model may immediately make a single ranged attack against that enemy, if it is otherwise able to do so.' },
        { name: 'Will-Sapping Salvo', description: 'Whenever this model hits with a ranged attack, the target also suffers a STUN MARKER.' },
      ],
    },
  ],

  // ── ROGUE TRADER ─────────────────────────────────────────────────────────
  rogue_trader: [
    {
      id: 'warrant_of_trade',
      name: 'Warrant of Trade',
      description: 'An ancient Imperial charter that grants unprecedented authority to explore and trade beyond the boundaries of the Imperium. Mandatory for Rogue Trader warbands.',
      abilities: [
        { name: 'Acquisitions', description: 'While this model is in your Warband, your credit limit for missions is increased by 50.', condition: 'LIMIT: 1' },
        { name: "Emperor's Judgement", description: 'Once per battle, as an Action that does not require a roll, this model can choose a point on the battlefield within 24" that it can see. Each model within 3" of that point that does not have any terrain directly above it must roll on the Injury chart.', condition: 'LIMIT: 1, Lord Captain, Voidmaster, or Navigator Scion Only' },
        { name: 'Expert Training', description: 'Choose any skill you want from any non-Patron Skill Table.' },
        { name: 'Fleetmaster', description: 'This model gains the Circle Back and Seek Exploration Skills.' },
        { name: 'Master of the Void', description: 'At the start of each battle, before deployment, if this model is participating in the battle, you can give up to 2 non-Elite ROGUE TRADER models in your Warband the DEEP STRIKE Keyword until the end of the battle.', condition: 'LIMIT: 2' },
        { name: 'Personal Teleportarium Chamber', description: 'This model gains DEEP STRIKE.', condition: 'LIMIT: 3' },
      ],
    },
  ],

  // ── NECROMUNDA GANG (also Adeptus Arbites) ───────────────────────────────
  necromunda_gang: [
    {
      id: 'gang_overlord',
      name: 'Gang Overlord',
      description: "A powerful gang boss whose web of favours, debts, and fear holds the warband together.",
      abilities: [
        { name: 'Crushing Blow', description: 'When this model Downs an enemy with a melee attack (even if it is already Down), that enemy suffers an additional STUN MARKER.' },
        { name: 'Gang Territory', description: 'This model gains the Set Dice Exploration Skill.' },
        { name: 'Overpower', description: 'Select any skill you want from the Melee & Strength Skills.' },
        { name: 'Mighty Leap', description: 'This model automatically succeeds when it takes the Jump Success Roll.' },
        { name: 'Fearsome', description: 'This model gains the FEAR Keyword.' },
        { name: 'True Grit', description: 'Injury rolls made against this model as a result of falling, Dangerous Terrain, or non-attack Abilities or psychic powers have -2 DICE.' },
      ],
    },
    {
      id: 'sump_lord',
      name: 'Sump Lord',
      description: 'A cunning outlaw ruler of the underhive who thrives in filth and shadow.',
      abilities: [
        { name: 'Catfall', description: 'This model does not suffer Injury rolls as a result of falling, and it does not fall Down or suffer an Injury roll due to failing a Diving Charge.' },
        { name: 'Down and Dirty', description: 'This model ignores the penalties to Success Roll rolls from being Down. Additionally, this model gains +1 DICE to Hit and Injure Down enemy models with Melee Attacks.' },
        { name: 'In the Shadows', description: 'Select any skill you want from the Stealth & Speed Skills.' },
        { name: 'Iron Jaw', description: 'Injury rolls made against this model as a result of melee attacks have -1 DICE.' },
        { name: 'Lie Low', description: 'While this model is in cover against such an attack, enemies cannot make ranged attacks at Long Range against it (even if the attack normally ignores Cover or Long Range, or hits automatically).' },
        { name: 'Tunnel Rat', description: 'This model gains the Seek and Circle Back Exploration skills.' },
      ],
    },
    {
      id: 'wealthy_noble',
      name: 'Wealthy Noble',
      description: 'A powerful Imperial patron with deep pockets and political connections who bankrolls the warband.',
      abilities: [
        { name: 'Counter Attack', description: 'When an enemy makes a melee attack against this model, this model can make a melee attack against that enemy afterwards, if it is not taken Out of Action. It can do so only once during each model\'s Activation.' },
        { name: 'Expedition Funding', description: 'This model gains the Extra Dice Exploration Skill twice.' },
        { name: 'Firearm Procurement', description: 'The cost of any ranged weapon worth 20 ducats or more is reduced by 5 ducats if the model with this skill is part of the Warband. Note that weapons bought with this lower cost make it easier for you to fit under the Threshold value.', condition: 'LIMIT: 1' },
        { name: 'Hotshot', description: 'Select any skill you want from the Ranged Skills.' },
        { name: 'Inspirational', description: 'This model and its allies within 6" have the NEGATE FEAR Keyword.' },
        { name: 'Team Work', description: 'This model may form a FIRETEAM with any one non-ELITE model of the Warband. In addition, the first time either model fails a Risky Success Roll during a Fireteam Activation, the Activation does not end.' },
      ],
    },
  ],

  // ── HERETIC ASTARTES ─────────────────────────────────────────────────────
  // Alpha Legion must use Alpharius (mandatory).
  // Night Lords must use Legacy of Curze (mandatory).
  // Renegade Space Marines use Pirate Lord.
  // Emperor's Children use Slaanesh; Death Guard use Nurgle;
  // World Eaters use Khorne; Thousand Sons use Tzeentch.
  // Base warband and others may use Chaos Undivided, Chaos Warlord, or Heretek Lord.
  heretic_astartes: [
    {
      id: 'alpharius',
      name: 'Alpharius',
      description: 'The Primarch of the Alpha Legion — or perhaps a cunning proxy. Mandatory for Alpha Legion warbands.',
      abilities: [
        { name: 'Clandestine', description: 'Ranged attacks made against this model automatically miss on a result of 7 or 8.' },
        { name: 'Covert Control', description: 'At the start of the battle, after the deployment, select one enemy model. You can move this model up to 6" in any direction you wish, though not into Melee combat, into impassable terrain, or out of the battlefield.' },
        { name: 'Cult Leader', description: 'Friendly Cultist models within 3" of this model have +1 DICE to Hit with all attacks.' },
        { name: 'Headhunter', description: 'This model\'s attacks cannot have their target changed, and Injury rolls caused by them cannot have -DICE applied to them.' },
        { name: 'Infiltrate and Subvert', description: 'This model has +1 DICE to all Success Rolls specific to the current mission, it counts as two models for the purpose of counting how many models you have within a certain location, and it counts as being worth 50 more credits for the purposes of any VP you earn. Finally, while this model is on the battlefield and not Down, it counts as an additional model for the purpose of morale (but it is not counted as 2 for your starting number of models).' },
        { name: 'Master Of Diversion', description: 'At the start of each battle, after deployment, you may redeploy this model and up to 2 of your other non-INFILTRATOR models, or 1 INFILTRATOR model.' },
      ],
    },
    {
      id: 'legacy_of_curze',
      name: 'Legacy of Curze',
      description: 'The dark inheritance of the Night Haunter, shaping Night Lords into predators of the shadows. Mandatory for Night Lords warbands.',
      abilities: [
        { name: 'Dirty Fighter', description: 'Whenever an enemy model misses this model with a melee attack, this model can make a single melee attack against that enemy.' },
        { name: 'Killing Fury', description: 'During an Activation in which it Charged, this model has +1 INJURY DICE with melee attacks, and its melee attacks hit each enemy it is engaged in close combat with.' },
        { name: 'Murderous Reputation', description: 'This model has +1 DICE to Hit with melee attacks against enemies that are affected by its FEAR Keyword. This skill has no effect for a model without FEAR.' },
        { name: "Night Haunter's Curse", description: 'As an Action with a Risky Success Roll, this model can choose one enemy model it can see within 6". On a success, that enemy must roll on the Injury chart, ignoring armour.' },
        { name: 'One Piece At A Time', description: 'Whenever this model hits with a melee attack and causes any BLOOD MARKERS, the target also suffers 1 STUN MARKER.' },
        { name: 'One With The Shadows', description: 'While this model is in cover from such an attack, enemies cannot make attacks against this model at Long Range (even if that attack ignores Cover and/or Long Range, or automatically hits).' },
      ],
    },
    CHAOS_UNDIVIDED,
    CHAOS_WARLORD,
    HERETEK_LORD,
    PATRON_KHORNE,
    PATRON_NURGLE,
    PATRON_SLAANESH,
    PATRON_TZEENTCH,
    PIRATE_LORD,
  ],

  // ── CHAOS DAEMONS ────────────────────────────────────────────────────────
  // Patron is determined by faction leader keyword:
  // KHORNE → Khorne, NURGLE → Nurgle, SLAANESH → Slaanesh,
  // TZEENTCH → Tzeentch, UNDIVIDED → Chaos Undivided.
  chaos_daemons: [
    PATRON_KHORNE,
    PATRON_NURGLE,
    PATRON_SLAANESH,
    PATRON_TZEENTCH,
    CHAOS_UNDIVIDED,
  ],

  // ── CHAOS CULT ───────────────────────────────────────────────────────────
  chaos_cult: [
    CHAOS_UNDIVIDED,
    PATRON_KHORNE,
    PATRON_NURGLE,
    PATRON_SLAANESH,
    PATRON_TZEENTCH,
  ],

  // ── AELDARI ──────────────────────────────────────────────────────────────
  aeldari: [
    {
      id: 'autarch_council',
      name: 'Autarch Council',
      description: "A council of Autarchs whose mastery of the Paths grants unparalleled strategic and martial insight.",
      abilities: [
        { name: 'Ambush of Blades', description: "During an Activation in which it Charged, this model's melee attacks have ARMOUR PIERCING 1, stacking with other sources of ARMOUR PIERCING, and if such an attack scores a Critical Hit, the injury roll has +1 DICE, in addition to the normal +1 DICE for a Critical Hit and the CRITICAL Keyword." },
        { name: 'Enduring Resolve', description: 'This model can Deny the Witch as if it had PSYKER 1. If it is already a PSYKER, it has +1 DICE when Denying the Witch.' },
        { name: "Falcon's Swiftness", description: 'This model\'s movement speed is increased by 2".' },
        { name: 'Mark of the Incomparable Hunter', description: 'This model has +1 INJURY DICE against enemy Elite models.' },
        { name: 'Master of Ambush', description: 'At the start of each battle, after deployment, you may redeploy this model and up to 2 of your other non-INFILTRATOR models, or 1 INFILTRATOR model.' },
        { name: 'To Their Final Breath', description: 'Enemies cannot Retreat from this model.' },
      ],
    },
    {
      id: 'phoenix_lord',
      name: 'Phoenix Lord',
      description: 'One of the legendary Aeldari Phoenix Lords. Choose an Aspect when selected: Dark Reaper, Dire Avenger, Fire Dragon, Howling Banshee, Shining Spear, Striking Scorpion, Swooping Hawk, or Warp Spider. Grants 3 universal skills plus 3 aspect-specific skills.',
      abilities: [
        // Universal
        { name: 'Aspect Armoury', description: 'While this model is in your Warband, increase the LIMIT of one piece of battlekit you are allowed to take by 1, so long as it is limited to the Aspect of your choosing or Elite or that Aspect. Each piece of battlekit can be chosen only once.' },
        { name: 'Aspect Mastery', description: 'While this model is in your Warband, you can recruit one additional Aspect Warrior of the Aspect you chose for this Patron so long as you already have two.', condition: 'LIMIT: 1' },
        { name: 'Combat Specialization', description: 'This model gains your choice of either +1 Ranged Skill or +1 Melee Skill.' },
        // Dark Reaper
        { name: 'Doom Incarnate', description: 'Whenever this model takes an enemy Down or Out of Action, your opponent has -1 DICE to Morale tests at the end of that Turn.', condition: 'Dark Reaper Only' },
        { name: 'Dark Reaper Training', description: 'This model can equip Dark Reaper Only battlekit and gains the Inescapable Accuracy and Reaper Arsenal Abilities of the Dark Reaper Aspect Warrior.', condition: 'Dark Reaper Only, Non-Vehicle Non-Aspect Warrior Only' },
        { name: 'Harvester of Souls', description: 'This model and each ally within 6" of it has CRITICAL with all attacks.', condition: 'Dark Reaper Only' },
        // Dire Avenger
        { name: 'Dire Avenger Training', description: 'This model can equip Dire Avenger Only battlekit and gains the Bladestorm Ability of the Dire Avenger Aspect Warrior.', condition: 'Dire Avenger Only, Non-Vehicle Non-Aspect Warrior Only' },
        { name: 'Hand of Asuryan', description: 'Once during each battle, this model can choose to score a Critical Hit instead of rolling to Hit with a ranged attack, so long as that attack is not being rolled with -DICE (i.e. it does not have more -DICE than +DICE).', condition: 'Dire Avenger Only' },
        { name: 'Shield of Grace', description: 'While this model is equipped with two non-HEAVY melee weapons, melee attacks have -1 DICE to Hit it.', condition: 'Dire Avenger Only' },
        // Fire Dragon
        { name: 'Burning Lance', description: "Increase the range of this model's TWO-HANDED ranged weapons by 6\", and the range of all of its other ranged weapons by 3\".", condition: 'Fire Dragon Only' },
        { name: 'Fire Dragon Training', description: 'This model can equip Fire Dragon Only battlekit and gains the Assured Destruction Ability of the Fire Dragon Aspect Warrior.', condition: 'Fire Dragon Only, Non-Vehicle Non-Aspect Warrior Only' },
        { name: 'Unquenchable Resolve', description: 'BLOOD MARKERS cannot be spent on the Success Rolls of attacks this model makes, and it has +1 DICE to Hit with all attacks if it has 3 or more BLOOD MARKERS.', condition: 'Fire Dragon Only' },
        // Howling Banshee
        { name: 'Howling Banshee Training', description: 'This model can equip Howling Banshee Only battlekit and gains the Acrobatic Ability of the Howling Banshee Aspect Warrior.', condition: 'Howling Banshee Only, Non-Vehicle Non-Aspect Warrior Only' },
        { name: 'Storm of Silence', description: 'This model is always treated as having rolled the maximum result when determining Charge distance.', condition: 'Howling Banshee Only' },
        { name: 'Whirling Death', description: "This model's melee attacks target every enemy within 1\" of it (roll to hit once, and to injure individually).", condition: 'Howling Banshee Only' },
        // Shining Spear
        { name: 'Celestial Hunter', description: 'This model has +1 DICE and +1 INJURY DICE on all attacks it makes against a model with TOUGH.', condition: 'Shining Spear Only' },
        { name: 'Seventh Sky Strike', description: 'While equipped with a Jetbike, when this model Charges one or more enemies, one of those enemies must roll on the Injury chart.', condition: 'Shining Spear Only' },
        { name: 'Shining Spear Training', description: 'This model can equip Shining Spear Only battlekit and gains the Aerobatic Grace Ability of the Shining Spear Aspect Warrior while equipped with a Jetbike.', condition: 'Shining Spear Only, Non-Vehicle Non-Aspect Warrior Only' },
        // Striking Scorpion
        { name: 'Death by a Thousand Stings', description: 'When this model scores a Critical Hit with a melee weapon, it can choose to suffer -1 INJURY DICE for the injury roll. If the target is not taken Out of Action by that attack, this model can make another attack with the same weapon against that enemy. This can be done only once during each Activation.', condition: 'Striking Scorpion Only' },
        { name: 'Shadow Hunter', description: 'Attacks against this model have an additional -1 DICE if this model is in Cover, even if that attack has IGNORE COVER.', condition: 'Striking Scorpion Only' },
        { name: 'Striking Scorpion Training', description: 'This model can equip Striking Scorpion Only battlekit and gains the Shadow Strike Ability of the Striking Scorpion Aspect Warrior.', condition: 'Striking Scorpion Only, Non-Vehicle Non-Aspect Warrior Only' },
        // Swooping Hawk
        { name: 'Cloudstrider', description: 'This model gains +1" movement speed and the SKIRMISHER Keyword.', condition: 'Swooping Hawk Only' },
        { name: 'Cry of the Wind', description: 'This model gains DEEP STRIKE while equipped with Swooping Hawk Wings.', condition: 'Swooping Hawk Only' },
        { name: 'Swooping Hawk Training', description: 'This model can equip Swooping Hawk Only battlekit and gains the Flyover Ability of the Swooping Hawk Aspect Warrior while equipped with Swooping Hawk Wings.', condition: 'Swooping Hawk Only, Non-Vehicle Non-Aspect Warrior Only' },
        // Warp Spider
        { name: 'Empyric Ambush', description: 'After this model uses its Flickerjump Ability, it has +1 DICE and +1 INJURY DICE with melee attacks until the end of its Activation.', condition: 'Warp Spider Only' },
        { name: 'Warp Spider Training', description: 'This model can equip Warp Spider Only Equipment and gains the Flickerjump Ability of the Warp Spider Aspect Warrior.', condition: 'Warp Spider Only, Non-Vehicle Non-Aspect Warrior Only' },
        { name: 'Whispering Web', description: "This model's allies have VICIOUS 9 with all attacks made against enemies that this model has hit with a ranged attack during the same Turn.", condition: 'Warp Spider Only' },
      ],
    },
    {
      id: 'seer_council',
      name: 'Seer Council',
      description: "An assembly of Farseers and Warlocks who channel the power of the skein to guide the warband's fate.",
      abilities: [
        { name: 'An Eye on Distant Events', description: "This model's ranged attacks ignore Long Range and it gains the STEALTH Keyword." },
        { name: "Fate's Messenger", description: 'This model treats any Down result from the Injury Roll Table as a Minor Hits instead. This does not apply to Down results that already replaced another result, such as with TOUGH.' },
        { name: 'Fate Reader', description: 'As an Action with a Success Roll, this model can read fate. On a success, it gains a BLESSING MARKER.' },
        { name: 'Forewarned', description: 'Enemy models must be set up at least 16" away from this model when using the DEEP STRIKE or INFILTRATOR Keywords.' },
        { name: 'Presentiment of Dread', description: 'This model gains the FEAR Keyword.' },
        { name: 'Seer of the Shifting Vector', description: 'Once during each battle, you can reroll one Success Roll this model takes, or an injury roll made against it.' },
      ],
    },
  ],

  // ── DRUKHARI ─────────────────────────────────────────────────────────────
  drukhari: [
    {
      id: 'commorragh',
      name: 'Commorragh',
      description: 'The Dark City itself — its ancient power, labyrinthine politics, and soul-thirsting hunger drive the warband. Mandatory for Drukhari warbands.',
      abilities: [
        { name: 'Ancient Evil', description: 'While this model is on the battlefield and not Down, your opponent has -1 DICE to Morale tests. This effect does not stack.' },
        { name: 'Deathly Perfectionist', description: 'Select any skill you want from the Ranged Skills.' },
        { name: 'Famed Savagery', description: 'During Activations that this model has Charged, it gains +1 DICE to Hit and +1 INJURY DICE with melee attacks.' },
        { name: 'Hatred Eternal', description: 'Injury rolls made against this model as a result of ranged attacks or psychic powers have -1 DICE.' },
        { name: 'Labyrinthine Cunning', description: 'After you activate this model, you decide the next 3 models to activate, following the normal limits (i.e. the second will usually be your own model again). If you choose a model in a Fireteam, the model\'s owner decides if it will activate as a Fireteam or individually.' },
        { name: 'Soul Thirst', description: 'Whenever this model takes an enemy Out of Action, remove 1 BLOOD MARKER from it.' },
      ],
    },
  ],

  // ── GENESTEALER CULTS ────────────────────────────────────────────────────
  genestealer_cults: [
    {
      id: 'the_four_armed_emperor',
      name: 'The Four-Armed Emperor',
      description: 'The divine Patriarch whose psychic call unites all xenos-touched believers. Mandatory for Genestealer Cults warbands.',
      abilities: [
        { name: 'Alien Majesty', description: 'This model gains FEAR.' },
        { name: 'Biomorph Adaptation', description: 'This model has +1 INJURY DICE with melee attacks.' },
        { name: 'Born Survivor', description: 'Injury rolls made against this model as a result of melee attacks are made at -1 DICE.' },
        { name: 'Focus of Adoration', description: 'When this model is hit, it can choose one non-Elite ally within 3" of it. That model becomes the target of the hit instead, even if it would normally be out of range.' },
        { name: 'Preternatural Speed', description: 'When an enemy Charges this model, if this model has not Activated this Turn, it can immediately take the Fight Action against that enemy before it takes any further actions. This can be done only once per Turn, and this model counts as having already taken the Fight Action during its Activation this Turn.' },
        { name: 'Shadow Stalker', description: 'Attacks made against this model have -1 DICE to Hit.' },
      ],
    },
  ],

  // ── NECRONS ───────────────────────────────────────────────────────────────
  necrons: [
    {
      id: 'dynasty_overlord',
      name: 'Dynasty Overlord',
      description: 'An ancient Necron lord whose inexorable will and eternal patience guide the warband. Mandatory for standard Necron warbands.',
      abilities: [
        { name: 'Enduring Will', description: 'A result of 7 on the Injury table counts as a Minor Hit against this model.' },
        { name: 'Eternal Madness', description: 'Injury rolls caused by the melee attacks of this model cannot have -DICE applied to them.' },
        { name: 'Honorable Combatant', description: 'This model has +1 DICE to Hit and +1 INJURY DICE with melee attacks against Elite enemies, but must attack an Elite target when making a melee attack if possible.' },
        { name: 'Immortal Pride', description: 'Injuries caused by weapons that ignore armour or have ARMOUR PIERCING 2 (with or without a minimum) have -1 DICE against this model.' },
        { name: 'Implacable Conqueror', description: 'When this model Charges, or a friendly NECRON model begins a Charge within 6" of it, roll 2D6 instead of 1D6 and then add the highest of the two dice to the charge move.' },
        { name: 'Thrall of the Silent King', description: 'Once per game, this model can re-roll all the dice or any single die for one Success Roll, or an Injury roll it causes.' },
      ],
    },
    {
      id: 'obliteration',
      name: 'Obliteration',
      description: "The drive to eradicate all organic life utterly — the Destroyer Cult's unending purpose. Used by Destroyer Cult warbands.",
      abilities: [
        { name: 'Extermination Protocols', description: 'This model has IGNORE COVER and IGNORE LONG RANGE when making ranged attacks.' },
        { name: 'Burrowing Nightmare', description: 'This model gains BURROW. If it already had BURROW, its movement speed is increased by 2" instead.' },
        { name: 'Disintegration Capacitors', description: "This model's ranged attacks gain ARMOUR PIERCING 1, stacking with any other ARMOUR PIERCING they have." },
        { name: 'Malevolent Arcing', description: 'Whenever an enemy hits this model with a melee attack, that enemy suffers 1 BLOOD MARKER.' },
        { name: 'Murderous Reanimation', description: 'When this model takes an enemy Out of Action, you can remove 1 BLOOD MARKER from it.' },
        { name: 'The Spoor of Frailty', description: 'This model has +1 DICE to Hit and +1 INJURY DICE against enemies that are Down.' },
      ],
    },
    {
      id: 'the_flayer_virus',
      name: 'The Flayer Virus',
      description: 'The ancient psychic curse of the Flayed Ones that drives them to hunger for flesh and bone. Mandatory for Court of the Flayer King warbands.',
      abilities: [
        { name: 'Blood-Fueled Cruelty', description: 'When an enemy in close combat with this model Retreats, this model has +1 DICE to Hit and +1 INJURY DICE for its free attack against that model.' },
        { name: 'Blood Rites', description: 'When this model causes a Bloodbath, you can remove D3 BLOOD MARKERS from it.' },
        { name: 'Deathless Rise', description: 'This model has +2 DICE to Success Rolls made to Reanimate.' },
        { name: 'Dimensional Breach', description: 'The model gains the DEEP STRIKE Keyword.' },
        { name: 'Shadow of Drazak', description: 'Ranged attacks made against this model have -1 DICE to Hit.' },
        { name: 'Storm of Flensing Blades', description: 'During Activations that this model has Charged, it gains +1 DICE to Hit with melee attacks. In addition, this model ignores the penalties for attacking with an off-hand weapon.' },
      ],
    },
  ],

  // ── ORKS ─────────────────────────────────────────────────────────────────
  orks: [
    {
      id: 'gork',
      name: 'Gork',
      description: "The brutal Ork god of savage cunning who rewards the biggest, hardest fighters. Pick Gork or Mork when creating your warband.",
      abilities: [
        { name: "'Ard As Nails", description: 'BLOOD MARKERS on this model cannot be spent to add +DICE to Injury rolls against this model. Other bonuses to the Injury rolls apply, and Bloodbath against this model works as normal.' },
        { name: "Big Crumpin'", description: 'Each time this model takes an enemy model out of Action, this model gains a BLESSING MARKER.' },
        { name: 'Big Gob', description: "This model's Actions, Abilities, Skills, and psychic powers can treat its allies as if they were 3\" closer than they are." },
        { name: 'Big Muscles', description: 'Select any skill you want from the Melee & Strength Skills.' },
        { name: "Brutal But Kunnin'", description: 'The first time during each of its Activations that this model misses with a melee attack, it can repeat that attack against the same target.' },
        { name: 'Ded Choppy', description: 'While this model is in your Warband, the cost of any melee weapon worth 10 credits or more is reduced by 5 credits. This effect does not stack. Note that weapons bought with this lower cost will make it easier for you to fit under the Threshold value.' },
      ],
    },
    {
      id: 'mork',
      name: 'Mork',
      description: "The cunning Ork god of brutal intelligence who rewards sneaky and kunnin' fighters. Pick Gork or Mork when creating your warband.",
      abilities: [
        { name: 'Dakkalad', description: 'While this model is in your Warband, the cost of any ranged weapon worth 10 credits or more is reduced by 5 credits. This effect does not stack. Note that weapons bought with this lower cost will make it easier for you to fit under the Threshold value.' },
        { name: 'Killy Git', description: 'Each time this model takes an enemy model out of Action, this model gains a BLESSING MARKER.' },
        { name: "Kunnin' But Brutal", description: 'When an enemy Charges this model, if this model has not Activated this Turn, it can immediately take the Fight Action against that enemy before it takes any further actions. This can be done only once per Turn, and this model counts as having already taken the Fight Action during its Activation this Turn.' },
        { name: 'Loud Gob', description: "This model's Actions, Abilities, Skills, and psychic powers can treat its allies as if they were 3\" closer than they are." },
        { name: 'Sneaky Git', description: 'Select any skill you want from the Stealth & Speed Skills.' },
        { name: "Stomp 'Em", description: 'When this model causes a Down enemy to roll on the Injury chart with a melee attack, you may set 1 Die to 6 and roll the rest as normal.' },
      ],
    },
  ],

  // ── T'AU EMPIRE ───────────────────────────────────────────────────────────
  tau_empire: [
    {
      id: 'ethereal_supreme',
      name: 'Ethereal Supreme',
      description: "The supreme spiritual and military authority of the T'au, guiding the warband with the Greater Good. Mandatory for most T'au warbands.",
      abilities: [
        { name: 'Academy Luminary', description: 'The model gains one of the Invocations listed for the Ethereal model. If it is an Ethereal, it cannot take the same Invocation twice.' },
        { name: 'Exemplar Of The Kauyon', description: 'At the start of each battle, after deployment, you may redeploy this model and up to 2 of your other non-INFILTRATOR models, or 1 INFILTRATOR model.' },
        { name: "Exemplar Of The Mont'ka", description: 'This model has +1 INJURY DICE with ranged attacks that are not made at Long Range (regardless of the penalty actually applying).' },
        { name: 'Precision Of The Hunter', description: 'All ranged attacks this model makes need 1 less BLOOD MARKER to cause a Bloodbath.' },
        { name: 'Through Boldness, Victory', description: 'As an Action with no roll required, this model can choose itself or an ally within 12". The chosen model can immediately move up to 3" towards any one enemy it can see. This movement can bring the model into melee combat, but counts as a Retreat if it moves away from an enemy.' },
        { name: 'Through Unity, Devastation', description: 'This model and each ally within 6" of it gain CRITICAL on ranged attacks against targets with any Markelight tokens.' },
      ],
    },
    {
      id: 'farsight_leader',
      name: 'Farsight Leader',
      description: 'Commander Farsight or another high-ranking member of the Farsight Enclave. Used by Farsight Enclave and Retaliation Cadre warbands.',
      abilities: [
        { name: 'Aggressive Tactician', description: 'At the start of the battle, after deployment, this model can move up to 6" if it was not deployed as an INFILTRATOR.' },
        { name: 'A Ghost Walks Among Us', description: 'Select any skill you want from the Stealth & Speed Skills.' },
        { name: 'Blooded Through War', description: 'This model gains the FEAR Keyword.' },
        { name: 'Hero of the Enclaves', description: 'If any ally within 1" of this model is hit by a ranged or melee weapon (excluding BLAST weapons), you can choose to redirect the hit to this model instead. Determine the injuries exactly as if the weapon just hit this model.' },
        { name: 'Master of the Killing Blow', description: 'This model counts Markerlight tokens as 2 BLOOD MARKERS for the purpose of Bloodbaths.' },
        { name: 'Tactical Acumen', description: 'You can increase the number of models that are normally limited (such as Crisis Battlesuits) by 1. This does not include ELITE Models. Once purchased, this extra model is part of the warband even if this skill is lost.', condition: 'LIMIT: 1' },
      ],
    },
    {
      id: 'shaper_chief',
      name: 'Shaper Chief',
      description: "The master hunter of a Kroot Kinband whose primal authority shapes the warband's martial approach. Mandatory for Kroot Kinband warbands.",
      abilities: [
        { name: 'Master of the Hunt', description: 'This model and each of its KROOT allies within 6" of it ignore cover when making ranged attacks against enemies within 12" of them.' },
        { name: 'Pack Leader', description: 'When this model Charges, or one of its KROOT allies begins a Charge within 6" of it, you can reroll the Charge dice once.' },
        { name: 'Nomadic Hunter', description: 'This model and each of its KROOT allies within 6" of it have +1 DICE to all Dash Success Rolls during an Activation in which they hit with a ranged attack.' },
        { name: "Predator's Pounce", description: 'While Charging, this model ignores Difficult and Dangerous Terrain, it automatically passes any Climb or Jump Success Roll.' },
        { name: 'Prey Slayer', description: 'This model has +1 DICE to Hit and +1 INJURY DICE against enemies that are Down.' },
        { name: 'Technological Trophy', description: "You can purchase any one weapon that does not cost Glory for this model from the following Warbands' Armoury/Battlekit List: any Imperial or Outlaw Warband, Chaos Cult, Heretic Astartes, Aeldari, Drukhari, Genestealer Cults, Harlequins, or Leagues of Votann. Only this model can carry that weapon, but it can be repurchased if lost." },
      ],
    },
  ],

  // ── TYRANIDS ─────────────────────────────────────────────────────────────
  tyranids: [
    {
      id: 'the_hive_mind',
      name: 'The Hive Mind',
      description: 'The vast alien intelligence that directs the Tyranid swarm with perfect, terrible purpose. Mandatory for Tyranid warbands.',
      abilities: [
        { name: 'Adaptive Biology', description: 'The model has NEGATE FIRE and NEGATE GAS.' },
        { name: 'Alien Cunning', description: 'Enemy models never get free attacks against the model when it Retreats, and the model can move out of Melee Combat using its Standard Move, Charge, or Dash.' },
        { name: 'Direct Guidance', description: 'When the model activates, you can choose up to one other friendly non-Elite TYRANID model that is Within Synapse Range of it that has not yet activated during this Turn. Activate that model alongside this model as if they had the FIRETEAM Keyword. That model has +1 DICE to Hit with all attacks during this Activation.', condition: 'Synapse Only' },
        { name: 'Heightened Reflexes', description: 'Once during each Turn, when an enemy model ends its movement within 12" of this model, this model can make a single ranged attack against that enemy.' },
        { name: 'Synaptic Lynchpin', description: 'The model gains the SYNAPSE Keyword. If it already has SYNAPSE, instead allies are Within Synapse Range while they are within an additional 3" of this model.' },
        { name: 'Synaptic Tendrils', description: 'The first time this model fails a Risky Success Roll during each of its Activations, its Activation continues instead of ending.' },
      ],
    },
  ],

  // ── LEAGUES OF VOTANN ────────────────────────────────────────────────────
  leagues_of_votann: [
    {
      id: 'ancestor_core',
      name: 'Ancestor Core',
      description: 'The ancient machine intelligence that preserves Kin wisdom and heritage across millennia.',
      abilities: [
        { name: 'A Long List', description: 'When this model takes an enemy that has one or more Grudge tokens Out of Action, you can give a Grudge token to any other enemy it can see, either within 18" of it or within 6" of the enemy model.' },
        { name: 'Ancestral Power', description: 'The range of all of this model\'s psychic powers is increased by 6".', condition: 'Psyker Only' },
        { name: 'Bequest of the Votann', description: 'At the beginning of the battle, select any one Success Roll (aside from a Charge or a standard Melee/Ranged Attacks) by any enemy model. This Success Roll cannot target, affect or damage the Rightfully Guided model in any way.' },
        { name: 'Grim Demeanor', description: 'This model and its VOTANN allies within 12" of it ignore the FEAR Keyword of enemies.' },
        { name: 'Kinbond', description: 'This model may form a FIRETEAM with any one non-ELITE model of the Warband. In addition, the first time either model fails a Risky Success Roll during a Fireteam Activation, the Activation does not end.' },
        { name: 'Warrior Lord', description: 'Injury rolls caused by the melee attacks of this model cannot have -DICE applied to them.' },
      ],
    },
    {
      id: 'guildmaster',
      name: 'Guildmaster',
      description: "A master of Kin commerce and craft whose expertise shapes the warband's equipment and conduct.",
      abilities: [
        { name: 'Ancestral Bearing', description: "This model's Actions, Abilities, and psychic powers can treat its allies as if they were 3\" closer than they are." },
        { name: 'Experienced Eye', description: 'The cost of any suit of armour or equipment worth 15 credits or more is reduced by 5 credits if the model with this skill is part of the Warband. This does not stack.' },
        { name: 'Guild Affiliate', description: 'At the end of each battle, you earn an additional D6x10 credits.' },
        { name: 'Luck Has. Need Keeps. Toil Earns.', description: 'This model has +1 DICE to all Success Rolls specific to the current mission, it counts as two models for the purpose of counting how many models you have within a certain location, and it counts as being worth 50 more credits for the purposes of any VP you earn. Finally, while this model is on the battlefield and not Down, it counts as an additional model for the purpose of morale (but it is not counted as 2 for your starting number of models).' },
        { name: 'Master Armourer', description: "This model's armour increases by -1 if it is wearing any armour at all. This does not stack with shields." },
        { name: 'Unrelenting Toil', description: 'This model has +1 DICE to all Success Rolls besides attacks, Dash, or using psychic powers.' },
      ],
    },
  ],

  // ── SLANNI ───────────────────────────────────────────────────────────────
  slanni: [
    {
      id: 'great_mage',
      name: 'Great Mage',
      description: 'An ancient Slann Mage-Priest whose inscrutable plans span millennia and whose power shapes the battlefield. Mandatory for Slanni warbands.',
      abilities: [
        { name: 'Dominating Mind', description: 'This model has +1 DICE to Deny the Witch and enemies have -1 DICE to Deny the Witch against it.', condition: 'Psyker Only' },
        { name: 'Higher State of Consciousness', description: 'After you activate this model, you decide the next 3 models to activate, following the normal limits (i.e. the second will usually be your own model again). If you choose a model in a Fireteam, the model\'s owner decides if it will activate as a Fireteam or individually.' },
        { name: 'Lord of Celestial Resonance', description: 'This model begins the game with D3 BLESSING MARKERS.' },
        { name: 'Thickly Scaled Hide', description: 'Injury rolls made against this model have -1, stacking with Armour and similar effects up to -3.' },
        { name: 'Vengeful Defender', description: 'This model has +1 DICE and +1 INJURY DICE when making melee attacks against a model that Charged during this Turn.' },
        { name: 'Wrath of Aeons', description: 'This model has +1 INJURY DICE to injuries caused by its psychic powers.', condition: 'Psyker Only' },
      ],
    },
  ],

  // ── HARLEQUINS ───────────────────────────────────────────────────────────
  harlequins: [
    {
      id: 'cegorach_the_laughing_god',
      name: 'Cegorach, the Laughing God',
      description: 'The trickster deity of the Aeldari, whose boundless jest shapes fate itself. Choose Light, Dark, or Twilight when this Patron is selected. Mandatory for Harlequin warbands.',
      abilities: [
        // Universal
        { name: 'A Foot in the Future', description: 'When this model declares a Charge, before rolling for charge distance, it can make a single melee attack against the target of that Charge as if they were in close combat. If that attack causes the enemy to suffer any BLOOD MARKERS, the Charge succeeds automatically.' },
        { name: 'The Final Joke', description: "When this model is taken Out of Action, before removing it from the table, it can make a single melee attack against an enemy it is in close combat with. BLOOD MARKERS cannot be spent on this attack's Success Roll." },
        { name: 'Fractal Storm', description: "This model's armour improves by -1, stacking up to -3." },
        { name: 'Skystrider', description: 'This model gains FLYING.' },
        { name: 'Webway Walker', description: 'This model gains the DEEP STRIKE Keyword.' },
        // Masque-specific
        { name: 'Player of the Light', description: 'This model always charges the maximum distance possible rather than rolling.', condition: 'Light Only' },
        { name: 'Player of the Dark', description: 'The first time during each of its Activations that this model causes an enemy model to suffer 1 or more BLOOD MARKERS as the result of a melee attack, that enemy suffers 1 additional STUN MARKER.', condition: 'Dark Only' },
        { name: 'Player of the Twilight', description: 'Once per battle, you can reroll any one Success Roll this model makes, or an Injury roll made against this model, without spending a use of your Luck of the Laughing God special rule.', condition: 'Twilight Only' },
      ],
    },
  ],

  // ── PIRATE CREW ──────────────────────────────────────────────────────────
  // Pirate Lord is mandatory. Chaos Aligned variant may also use Chaos Warlord or Heretek Lord.
  pirate_crew: [
    PIRATE_LORD,
    CHAOS_WARLORD,
    HERETEK_LORD,
  ],

  // ── THE VERMINTIDE ───────────────────────────────────────────────────────
  the_vermintide: [
    {
      id: 'the_great_horned_rat',
      name: 'The Great Horned Rat',
      description: "The Chaos god of the Skaven whose blessings make his champions more dangerous, more resilient, and more ravenous for slaughter. Mandatory for Vermintide warbands.",
      abilities: [
        { name: 'Choking Fumes', description: 'Enemies within 1" of this model that do not have NEGATE GAS have -1 DICE to all Success Rolls.' },
        { name: 'Mindless And Rabid', description: 'This model gains FEAR if it does not already have it.' },
        { name: 'Obscenely Good Fortune', description: 'This model begins each battle with D3 BLESSING MARKERS.' },
        { name: 'Scurrying Menace', description: 'This model gains the SKIRMISHER Keyword if it does not already have it, and it can move an additional 2" when it uses SKIRMISHER.' },
        { name: 'Truly Ravenous', description: 'Once during each of its Activations, when this model inflicts 1 or more BLOOD MARKERS on an enemy with a melee attack, remove 1 BLOOD MARKER from this model.' },
        { name: 'Vermindoom Vanguard', description: 'This model has +1 INJURY DICE with its melee attacks.' },
      ],
    },
  ],

  // ── DARK MECHANICUM ──────────────────────────────────────────────────────
  dark_mechanicum: [
    {
      id: 'fabricator_locum',
      name: 'Fabricator Locum',
      description: 'A senior Magos — or fallen Heretek — who directs the warband with cold, calculating precision.',
      abilities: [
        { name: 'Emotionless Clarity', description: 'This model and each friendly MECHANICUS model within 6" of it ignore the FEAR Keyword.' },
        { name: 'Masterwork Bionics', description: 'This model has +1 DICE to all Climb, Dash, Jump, and Diving Charge Success Rolls.' },
        { name: 'First-Hand Field Testing', description: 'The first attack this model makes with a ranged weapon during each of its Activations has ARMOUR PIERCING 1, stacking with all other sources of ARMOUR PIERCING.' },
        { name: 'Necromechanic', description: 'This model has +1 DICE to use Actions that remove BLOOD MARKERS from friendly models, and whenever it would remove exactly 1 BLOOD MARKER with such an Action, it removes D3 instead.' },
        { name: 'Cartogrammatist', description: 'This model gains the Exploration Skill of your choice.' },
        { name: 'Supervisory Radiance', description: 'Friendly non-Elite MECHANICUS models within 3" of this model have +1 DICE to Hit with all attacks.' },
      ],
    },
    {
      id: 'skitarii_overseer',
      name: 'Skitarii Overseer',
      description: 'A high-ranking officer who coordinates fire and manoeuvre through corrupted binharic protocols.',
      abilities: [
        { name: 'Archived Engagements', description: 'All attacks have -1 DICE to Hit this model.' },
        { name: 'Battle-Sphere Uplink', description: 'Select any skill you want from the Ranged Skills.' },
        { name: 'Eyes Of The Omnissiah', description: 'This model ignores all -DICE to Hit with ranged attacks.' },
        { name: 'Firepoint Telemetry Cache', description: 'This model is always considered in Cover and gains the STEALTH Keyword.' },
        { name: 'Multitasking Cortex', description: 'This model may form a FIRETEAM with any one non-ELITE model of the Warband. In addition, the first time either model fails a Risky Success Roll during a Fireteam Activation, the Activation does not end.' },
        { name: 'Programmed Retreat', description: 'Enemy models never get free attacks against this model when it Retreats, and this model can move out of Melee Combat using its Standard Move, Charge, or Dash.' },
      ],
    },
    HERETEK_LORD,
    CHAOS_UNDIVIDED,
  ],

};

// ── Helper functions used by UI components ─────────────────────────────────

/** Returns the list of available Patrons for a given faction key. */
export function getPatronsForFaction(factionId: string): Patron[] {
  return FACTION_PATRONS[factionId] ?? [];
}

/**
 * Finds a specific Patron by its id within a faction's patron list.
 * Falls back to searching all factions if factionId is not provided.
 */
export function getPatronById(patronId: string, factionId?: string): Patron | undefined {
  if (factionId) {
    return (FACTION_PATRONS[factionId] ?? []).find(p => p.id === patronId);
  }
  for (const patrons of Object.values(FACTION_PATRONS)) {
    const found = patrons.find(p => p.id === patronId);
    if (found) return found;
  }
  return undefined;
}

/**
 * Filters a patron's abilities to only those relevant to the currently
 * selected subfaction.
 *
 * Logic:
 * - Abilities with NO condition are always shown.
 * - Abilities whose condition contains "Only" but does NOT contain the current
 *   subfaction name are hidden (e.g. "Black Templars Only" is hidden when the
 *   selected subfaction is "Blood Angels").
 * - "No Subfaction" abilities are shown only when no specific subfaction is
 *   selected (subfactionName is empty, undefined, or 'no_variant' / 'No Variant').
 * - Non-subfaction conditions like "Psyker Only", "LIMIT: 1", "Dark Reaper",
 *   "Light Only" etc. are always shown (they relate to model restrictions, not
 *   faction selection).
 *
 * @param abilities   Full list of abilities from a Patron.
 * @param subfactionName  Display name of the currently selected subfaction,
 *                        e.g. "Black Templars". Pass undefined / '' for no subfaction.
 */
export function filterAbilitiesForSubfaction(
  abilities: PatronAbility[],
  subfactionName: string | undefined,
): PatronAbility[] {
  // Names that indicate "no specific subfaction" in the condition field
  const isNoSubfaction =
    !subfactionName ||
    subfactionName === '' ||
    subfactionName.toLowerCase() === 'no variant' ||
    subfactionName.toLowerCase() === 'no_variant' ||
    subfactionName.toLowerCase() === 'standard';

  // Known subfaction names that can appear in conditions.
  // Abilities gated with "X Only" where X matches one of these are
  // considered subfaction-gated and should be filtered.
  const SUBFACTION_KEYWORDS = [
    'Black Templars',
    'Blood Angels',
    'Dark Angels',
    'Deathwatch',
    'Grey Knights',
    'Imperial Fists',
    'Iron Hands',
    'Legion of the Damned',
    'Raven Guard',
    'Salamanders',
    'Space Wolves',
    'Ultramarines',
    'White Scars',
    // Chaos subfactions
    'Alpha Legion',
    'Death Guard',
    "Emperor's Children",
    'Iron Warriors',
    'Night Lords',
    'Thousand Sons',
    'World Eaters',
    // Aeldari masques / aspects  (handled as model-level conditions, always shown)
    // Necromunda gang types (Outlaw / Imperial) are shown; they're model conditions
  ];

  return abilities.filter(ability => {
    const condition = ability.condition;
    if (!condition) return true; // no restriction — always show

    // "No Subfaction" abilities
    if (condition === 'No Subfaction') return isNoSubfaction;

    // Check if this condition is a subfaction gate (e.g. "Black Templars Only")
    const matchedSubfaction = SUBFACTION_KEYWORDS.find(sf =>
      condition.includes(sf),
    );

    if (matchedSubfaction) {
      // Show only when the current subfaction matches
      return (
        subfactionName !== undefined &&
        subfactionName !== '' &&
        subfactionName.includes(matchedSubfaction)
      );
    }

    // All other conditions (Psyker Only, LIMIT: 1, Dark Reaper, Light Only, etc.)
    // are model/unit-level restrictions, always show them
    return true;
  });
}

// ── Convenience export of shared patrons for use elsewhere ─────────────────
export const SHARED_PATRONS = {
  ADMINISTRATUM_PREFECTUS,
  ECCLESIASTIC_CARDINAL,
  THE_INDOMITUS_CRUSADE,
  LORD_INQUISITOR,
  CHAOS_UNDIVIDED,
  CHAOS_WARLORD,
  PATRON_KHORNE,
  PATRON_NURGLE,
  PATRON_SLAANESH,
  PATRON_TZEENTCH,
  HERETEK_LORD,
  PIRATE_LORD,
};
