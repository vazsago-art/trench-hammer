/**
 * Keyword Glossary
 * Combined from:
 *   - Trench Crusade Digital Rulebook (pages 52–57) — source of truth for base Keywords
 *   - trenchhammer_newkeywords.instructions.md — TrenchHammer-specific additions
 *
 * Keys are uppercase normalised (trim + toUpperCase) for lookups.
 */
export const KEYWORD_GLOSSARY: Record<string, string> = {
  // ── Core modifiers ───────────────────────────────────────────────────────
  '+/- INJURY DICE':
    'Dice added to or subtracted from Injury Rolls. If on a weapon, only applies to attacks made with it.',
  '+/- INJURY MODIFIER':
    'Modifier applied to the result of an Injury Roll. If on a weapon, only applies to attacks made with it.',
  '+DICE':
    'Add one extra die to the 2D6 pool and pick the two highest. Each additional +DICE adds one more die.',
  '-DICE':
    'Add one extra die to the 2D6 pool and pick the two lowest. Each additional -DICE adds one more die.',

  // ── A ────────────────────────────────────────────────────────────────────
  'ACTION':
    'An activity a model can carry out when Activated. Common Actions: Move, Dash, Shoot, Fight.',
  'AMMUNITION':
    'When the model is deployed, declare which Ranged Weapon this Battlekit applies to. That weapon gains the listed Keyword until end of the game. The chosen weapon cannot already have BLAST, FIRE, GAS, or SHRAPNEL, and cannot have more than one AMMUNITION applied.',
  'ANATHEMA':
    '(TrenchHammer) Adeptus Custodes sub-type tag. Marks a model as part of the Anathema Psykana — the Custodes\' anti-psyker sisterhood. Models with ANATHEMA can access the Anathematic Diadem Campaign Shop item (enemies within 12" of the equipped model have -1 DICE on all PSYCHIC Success Rolls). Anathema Psykana troopers and the Knight-Centura elite carry this keyword. ANATHEMA models have the "Daughter of the Abyss" ability: injury rolls with the PSYCHIC or IGNORE ARMOUR Keyword have -1 INJURY DICE against them.',
  'ARMOUR PIERCING':
    'Reduces the target\'s total -INJURY MODIFIER from its Armour and/or Shields by the listed value (minimum 0). E.g. AP 1 against Standard Armour + Shield turns -2 into -1.',
  'ARMOUR PIERCING 1':
    'Reduces the target\'s total -INJURY MODIFIER from Armour/Shields by 1 (minimum 0).',
  'ARMOUR PIERCING 2':
    'Reduces the target\'s total -INJURY MODIFIER from Armour/Shields by 2 (minimum 0).',
  'ARMOUR PIERCING 3':
    'Reduces the target\'s total -INJURY MODIFIER from Armour/Shields by 3 (minimum 0).',
  'ARTIFICIAL':
    'This model is not of natural biological origin — it is constructed from non-organic elements.',
  'ASSAULT':
    'Ranged attacks with this weapon do not prevent the model from also taking a Charge or Fight ACTION in the same Activation.',
  'AUTOMATIC':
    'When you Shoot with this weapon, make X Ranged Attacks one after another. Attacks can target different models as long as they are all within 6" of each other. Resolve each attack fully before the next. BLOOD/BLESSING MARKERS spent only modify the attack they are spent on.',
  'AUTOMATIC 2':
    'Make 2 Ranged Attacks one after another (targets must be within 6" of each other). BLOOD/BLESSING MARKERS spent only modify the attack they are spent on.',
  'AUTOMATIC 3':
    'Make 3 Ranged Attacks one after another (targets must be within 6" of each other). BLOOD/BLESSING MARKERS spent only modify the attack they are spent on.',

  // ── B ────────────────────────────────────────────────────────────────────
  'BAYONET LUG':
    'Bayonets can only be attached to weapons with this property.',
  'BEAST':
    '(TrenchHammer) Unit type tag. This model is an animal or creature (not a constructed or supernatural entity). Appears on Rough Rider Horses, Battlemutts, Kroot-related animals, and similar mounts or beasts of war. Some abilities and restrictions specifically target or exclude BEAST models.',
  'BEASTMEN':
    '(TrenchHammer) Cross-faction sub-type tag. This model is a mutant beast-humanoid. In the Astra Militarum, Beastmen (Gors) can be recruited as troops (up to 3) and always carry LIMITED POTENTIAL. In Heretic Astartes (Tzeentch subfaction), Tzaangors and Tzaangor Shamans carry this keyword — the Tzaangor Shaman\u2019s \u201cBestial Prophet\u201d ability targets friendly BEASTMEN models within 6\u201d, and \u201cSacrificial Blessing\u201d sacrifices a BEASTMEN model within 1\u201d for a psychic bonus.',
  'BLACK GRAIL':
    'This model is part of the Cult of the Black Grail Faction (Tag).',
  'BLAST':
    'Pick a target point within range and line of sight. On a hit, every model with line of sight to that point within the blast radius is hit; also friendly models within 1" of a hit enemy are hit. Make an Injury Roll for each. On a Critical, only the chosen target gains the extra +INJURY DICE.',
  'BLAST 1"':  'Blast radius 1". Every model within 1" of the target point with line of sight to it is hit.',
  'BLAST 2"':  'Blast radius 2". Every model within 2" of the target point with line of sight to it is hit.',
  'BLAST 3"':  'Blast radius 3". Every model within 3" of the target point with line of sight to it is hit.',
  'BLAST 5"':  'Blast radius 5". Every model within 5" of the target point with line of sight to it is hit.',
  'BLESSED':
    'When deployed, place X BLESSING MARKERS beside this model.',
  'BLESSING MARKER':
    'Supernatural/chemical enhancement marker. Spend 1 to add +1 DICE to any of this model\'s Actions, or -1 DICE to an Injury Roll made against it.',
  'BLOCK':
    'Add -1 DICE for Melee Attacks targeting a model with this Keyword (or a weapon with this Keyword) if the attacker made a Charge ACTION before attacking this Turn.',
  'BLOOD MARKER':
    'Placed on models when they suffer an injury. Spend 1 to apply -1 DICE to any Action this model takes, or +1 DICE to an Injury Roll made against it. Used in Bloodbath rolls.',
  'BURROW':
    '(TrenchHammer) When moving, this model ignores Difficult and Impassable Terrain and other models. Cannot end movement inside Impassable Terrain, in close combat with a non-Charge target, or leave close combat without Retreating. Does not set off Dangerous Terrain unless ending its move in contact with it. Cannot use BURROW and FLYING simultaneously.',

  // ── C ────────────────────────────────────────────────────────────────────
  'CLEAVE':
    'When taking a Fight ACTION with this weapon, make X Melee Attacks one after another (can target different models). Resolve each attack fully before the next. BLOOD/BLESSING MARKERS spent only modify the attack they are spent on.',
  'CLEAVE 2':
    'Make up to 2 Melee Attacks with this weapon in one Fight Action, one after another (can target different models). BLOOD/BLESSING MARKERS spent only modify the attack they are spent on.',
  'CLEAVE 3':
    'Make up to 3 Melee Attacks with this weapon in one Fight Action, one after another (can target different models). BLOOD/BLESSING MARKERS spent only modify the attack they are spent on.',
  'CONSUMABLE':
    'In a Campaign, this Battlekit is lost at the end of any game in which it is used.',
  'CONTROLLER':
    '(TrenchHammer) Adeptus Mechanicus rank tag. Servitors, Tech-Thralls, and Servitor-type models that are within 6\u201d of a friendly CONTROLLER model benefit from \u201cMindlock\u201d: they have +1 DICE to Hit with all attacks. Appears on Tech-Priests, Archmagi, and similar Mechanicus leaders. Also appears on the Iron Father (ASTARTES + MECHANICUS).',
  'COVER':
    'A model or terrain piece with this Keyword grants the Cover or Defended Obstacle attack modifier to models behind or within it.',
  'CRITICAL':
    'A Critical Success on an attack with this weapon adds +2 INJURY DICE instead of the usual +1.',
  'CUMBERSOME':
    'Requires two hands to use, even for STRONG models. Can still be used alongside a Shield if the weapon has the Shield Combo property. (TrenchHammer) Also prevents a STRONG model from wielding a TWO-HANDED HELD weapon in one hand for melee.',

  // ── D ────────────────────────────────────────────────────────────────────
  'DANGEROUS':
    '(TrenchHammer) When the model misses with this weapon (or in the context stated), make an Injury Roll against the model itself. Replaces older "injure self on a miss" phrasing. DANGEROUS (+X INJURY DICE) adds extra dice to the self-injury roll.',
  'DANGEROUS TERRAIN':
    'When a model Activates in this terrain or moves into it, take a Risky Success Roll. On a Success, continue as normal (no further rolls for moving through more DANGEROUS TERRAIN this move). On a Failure, make an Injury Roll for the model and its Activation ends. DANGEROUS TERRAIN (KEYWORD) adds that keyword to any resulting Injury Rolls.',
  'DEADLY':
    'When making an Injury Roll for an attack with this weapon, roll 3D6 and add all 3 dice together (instead of 2D6). +/-INJURY DICE are applied by picking the highest/lowest 3 dice instead of 2.',
  'DEATH CULT':
    '(TrenchHammer) Adeptus Ministorum unit sub-type tag. Marks a model as a Death Cult Assassin. Required for access to Death Cult-restricted battlekit in the Ministorum armoury (e.g. Paired Blades, Throwing Knives marked \u201cDeath Cult Only\u201d). Death Cult Assassins also carry INFILTRATOR and STEALTH.',
  'DEEP STRIKE':
    '(TrenchHammer) Deploy off-table. From Turn 2 onward, place the model anywhere at least 8" from the nearest enemy (or in your deployment zone if no valid spot exists). Opponent then adjusts it D3" horizontally in a direction of their choice. Cannot score objectives or interact with mission objects on its first Turn.',
  'DEEP STRIKE (TUNNEL)':
    '(TrenchHammer) Uses DEEP STRIKE rules but cannot be placed on overhanging terrain or building rooftops — must emerge from the ground.',
  'DEMONIC':
    'This model has NEGATE FIRE.',
  'DEPLOYABLE':
    'This Battlekit is represented by a physical model or terrain piece that is set up on the battlefield during the game.',
  'DIFFICULT TERRAIN':
    'Every 1" a model moves across terrain with this Keyword counts as 2".',

  // ── E ────────────────────────────────────────────────────────────────────
  'ELITE':
    'The most senior and heroic models in a Warband. Subject to special campaign and warband rules (Tag).',

  // ── F ────────────────────────────────────────────────────────────────────
  'FEAR':
    'Add -1 DICE to Melee Attacks targeting a model with this Keyword. Models that cause FEAR are immune to FEAR themselves.',
  'FIRE':
    'After making the Injury Roll for an attack with this Keyword, place 1 extra BLOOD MARKER next to the target (even if the result is No Effect).',
  'FIRETEAM':
    'Two FIRETEAM models Activate simultaneously. Actions can be taken in any order, switching freely between them. If either model\'s Activation ends early, the other\'s ends immediately too. A model cannot be in more than 1 Fireteam.',
  'FLAMETHROWER':
    'Ranged Attacks with this weapon automatically succeed (no Success Roll). This means the attack cannot achieve a Critical Success.',
  'FLYING':
    'When making a move, the model measures its path through the air, ignoring intervening models and terrain (but must start and end on a legal surface). Must still take Risky Success Rolls for Dangerous Terrain if activated or ending there. Cannot end its move on Impassable Terrain. Does not make an Injury Roll if it falls.',
  'FOLLOWER':
    '(TrenchHammer) Heretic Astartes sub-type tag. Marks a model as a cultist, bound creature, or devoted minion serving the Chaos warband (distinct from full Chaos Space Marines). The Dark Apostle\u2019s \u201cDark Zealotry\u201d Action targets FOLLOWER models: on a Risky Success Roll with +1 DICE, all friendly FOLLOWER models that are Down and within 12\u201d of the Dark Apostle may immediately stand up. Appears on Cultists, Plague Beasts, Tzaangors, Sekhetar Robots, and similar bound/devoted units.',
  'FUMBLE':
    '(TrenchHammer) If the Attack Roll with this weapon results in the lowest possible value (a 1 by default, or a higher range if specified — e.g. FUMBLE (2-4) means a roll of 2, 3, or 4 causes a Fumble), the weapon malfunctions: instead of resolving normally, the attack deviates and the thrower itself (and any other models within the blast radius of the new position) may be affected as if hit. Grenade-type THROWN weapons across all factions have this Keyword.',

  // ── G ────────────────────────────────────────────────────────────────────
  'GAS':
    'After the Injury Roll, place 1 extra BLOOD MARKER next to the target (even on No Effect).',
  'GOLEM':
    'Treats Out of Action results as Down (unless from a Bloodbath Roll). Cannot remove BLOOD MARKERS from a friendly GOLEM (opponent can use them normally). Has NEGATE FEAR and NEGATE GAS. Cannot have TOUGH.',
  'GOETIC':
    'Goetic Spells require spending X BLOOD MARKERS (from any model in the battle — friendly or enemy — that does not have DEMONIC or BLACK GRAIL). Markers are removed from play. No Action Roll is needed. Each Goetic Spell can be used only once per Activation.',
  'GRENADE':
    '(Retired in TrenchHammer) The TC GRENADE Keyword has been replaced in TrenchHammer. Grenade weapons now explicitly list THROWN + IGNORE COVER + IGNORE LONG RANGE on each weapon. A model may equip only 1 THROWN piece of Battlekit at a time. See THROWN, IGNORE COVER, IGNORE LONG RANGE.',


  // ── H ────────────────────────────────────────────────────────────────────
  'HEAVY':
    'A model cannot have more than 1 piece of HEAVY Battlekit. Does not receive a Charge Bonus. If a Ranged Weapon, cannot be fired in the same Activation as a Move, Charge, Retreat, or Dash.',
  'HELD':
    'Requires one hand to carry at all times. A model with HELD can also carry either a 1-Handed Weapon OR a Shield — not both (even with Shield Combo). May still carry Grenades. (TrenchHammer override) A STRONG model can wield a TWO-HANDED HELD weapon in one hand for melee (allowing it to also carry another melee weapon), but it still takes up both hands for ranged. CUMBERSOME prevents this exception.',
  'HERETIC':
    'This model is a member of the Heretic Legions Faction (Tag).',
  'HRUD':
    '(TrenchHammer) Xenos race tag. Marks a model as a Hrud — a mysterious, rat-like Xenos species known for their entropic fields and temporal anomalies. Appears on the Hrud mercenary unit (available in Slanni warbands). The Hrud has: Entropic Field (PSYCHIC) making all enemy Success Rolls within 8\u201d Risky, Out of Time (-1 DICE to all attacks against it), Timewarp (teleport Action), and Toxic Skin (enemy melee attackers gain 1 BLOOD MARKER; NEGATE GAS is immune).',

  // ── I ────────────────────────────────────────────────────────────────────
  'ICON':
    '(TrenchHammer) This model is better at mission-specific objectives. While this model is not Down, it counts as fulfilling any warband-size requirement for mission objectives by itself. Standardises older special wording on banners, flags, and similar items that granted bonuses for holding objectives.',
  'IGNORE ARMOUR':
    'Ignore all -INJURY DICE and -INJURY MODIFIERS from the target\'s Armour Characteristic and any Armour or Shield Battlekit it has.',
  'IGNORE ARMOUR on Critical Hit':
    'On a Critical Hit, ignore all -INJURY DICE and -INJURY MODIFIERS from the target\'s Armour Characteristic and any Armour or Shield Battlekit it has. Normal (non-critical) hits do not ignore armour.',
  'ARMOUR PIERCING 1 on Critical Hit':
    'On a Critical Hit, reduces the target\'s total -INJURY MODIFIER from Armour/Shields by 1 (minimum 0). Normal (non-critical) hits do not benefit from this armour piercing.',
  'ARMOUR PIERCING 2 on Critical Hit':
    'On a Critical Hit, reduces the target\'s total -INJURY MODIFIER from Armour/Shields by 2 (minimum 0). Normal (non-critical) hits do not benefit from this armour piercing.',
  'IGNORE COVER':
    'Ignore the -1 DICE modifier for a target in Cover when making this attack.',
  'IGNORE LONG RANGE':
    'Ignore the -1 DICE penalty for attacks at Long Range.',
  'IGNORE OFF-HAND':
    'Ignore the -1 DICE penalty for attacks made with an off-hand weapon. This model treats its off-hand weapon as a primary weapon for the purpose of Success Roll modifiers.',
  'IMPASSABLE TERRAIN':
    'Models cannot be moved onto or across terrain with this Keyword (except models with FLYING).',
  'IMPERVIOUS':
    'ARMOUR PIERCING and IGNORE ARMOUR effects do not affect the -INJURY DICE and -INJURY MODIFIERS provided by this piece of Battlekit. Other Battlekit on the same model is affected normally.',
  'INFECTION MARKER':
    'Works exactly like BLOOD MARKERS for dice modification. A model may have up to 6 INFECTION MARKERS alongside up to 6 BLOOD MARKERS. A model that Activates with 1+ INFECTION MARKERS gains +1 INFECTION MARKER (up to max 6).',
  'INFECTION MARKERS':
    'Works exactly like BLOOD MARKERS for dice modification. A model may have up to 6 INFECTION MARKERS alongside up to 6 BLOOD MARKERS. A model that Activates with 1+ INFECTION MARKERS gains +1 INFECTION MARKER (up to max 6). (Plural form — same as INFECTION MARKER)',
  'INFILTRATOR':
    'When deployed, this model can be set up anywhere on the battlefield that is out of enemy line of sight and at least 8" from the closest enemy. INFILTRATORS are deployed after all other models. If no valid spot exists, deploy normally.',

  // ── K ────────────────────────────────────────────────────────────────────
  'KROOT':
    '(TrenchHammer) T\u2019au Empire sub-faction tag. Marks a model as a Kroot warrior, hunter, or beast. Kroot-specific battlekit is labelled \u201cKroot Only\u201d and is accessible only by KROOT models. Kroot Shaper Paths (Flesh Shaper, Trail Shaper, War Shaper) target friendly KROOT models — e.g. Trail Shaper grants up to two non-ELITE KROOT models DEEP STRIKE for the battle; Flesh Shaper removes BLOOD MARKERS when KROOT models take enemies Out of Action. Appears on Kroot Carnivores, Kroot Shapers, Kroot Riders, and similar Kroot units.',

  // ── L ────────────────────────────────────────────────────────────────────
  'LARGE':
    '(TrenchHammer) Model is larger than normal (typically 40mm+ base). Not affected by certain size-restricted abilities or push effects.',
  'LEADER':
    'Add +1 DICE to Morale Checks while your Warband has at least 1 non-Down, non-Out-of-Action LEADER model on the battlefield.',
  'LIMIT':
    'You can only purchase up to X of this Battlekit for your Warband. Finding more via looting or exploration may break this limit.',
  'LIMITED POTENTIAL':
    '(TrenchHammer) This model can learn only up to 3 skills from XP gain if it becomes (or already is) Elite.',

  // ── M ────────────────────────────────────────────────────────────────────
  'MAIN HAND ONLY':
    '(TrenchHammer) This weapon cannot be used to make off-hand attacks.',
  'MARKERLIGHT':
    '(TrenchHammer) T\u2019au Empire keyword. A model with MARKERLIGHT can declare that it is marking an enemy model instead of shooting for that Action, placing a Markerlight token on the target. All T\u2019au ranged attacks against a marked model have +1 DICE to Hit. T\u2019au models can spend Markerlight tokens like BLOOD MARKERS on injury rolls for ranged attacks against the marked target. All Markerlight tokens are removed at the end of each Turn. Marker Drones also have MARKERLIGHT and are treated as having a ranged weapon with 24\u201d range for the purpose of placing tokens.',
  'MASTER':
    '(TrenchHammer) The Vermintide (Skaven) rank tag. Marks a senior Skaven model. Force organisation: you may field only up to 2 Skavenslaves per MASTER model in your Warband. The \u201cCowardice\u201d ability on Skavenslaves and Clanrats is suppressed while a friendly MASTER SKAVEN model is within 6\u201d. The Packmaster upgrade grants a Clanrat the MASTER Keyword (+5 credits). Also appears on elite Skaven units (Clawlord, Deathmaster, Warlock, Stormvermin).',
  'MINED':
    'When a model moves into contact with a Marker or terrain piece with MINED (and does not have NEGATE MINED), the mine detonates: make an Injury Roll with SHRAPNEL for that model, then the Marker/terrain loses MINED. FLYING models only detonate a mine if they finish their move in contact with it.',
  'MOUNTED':
    '(TrenchHammer) Movement and unit-type tag. This model is mounted on a creature, bike, or mechanical mount. Used on Kroot Riders, Aeldari Windriders, Ork Bikers, and similar cavalry/biker units. Windriders in the Aeldari \u201cExiles\u201d Warband Variant lose the VEHICLE Keyword and gain MOUNTED instead. MOUNTED models are subject to distinct movement abilities and restrictions compared to VEHICLE models.',

  // ── N ────────────────────────────────────────────────────────────────────
  'NEGATE':
    'NEGATE [KEYWORD]: this model is not affected by the specified Keyword\'s Effect. E.g. NEGATE SHRAPNEL ignores the Shrapnel effect.',
  'NEGATE FIRE':      'This model ignores the FIRE Keyword effect (the extra Blood Marker is not placed).',
  'NEGATE FEAR':      'This model ignores the FEAR Keyword effect.',
  'NEGATE GAS':       'This model ignores the GAS Keyword effect.',
  'NEGATE HEAVY':     'This model is not affected by Battlekit with the HEAVY Keyword.',
  'NEGATE MINED':     'This model does not detonate MINED Markers or terrain pieces when moving into contact with them.',
  'NEGATE SHRAPNEL':  'This model ignores the SHRAPNEL Keyword effect.',
  'NEGATE BLAST':     'This model ignores the BLAST Keyword effect.',
  'NEW ANTIOCH':      'This model is part of the Principality of New Antioch Faction (Tag).',
  'NO PROMOTION':     '(TrenchHammer) This model cannot be promoted to Elite during a campaign.',
  'NONLETHAL':
    '(TrenchHammer) Injury rolls caused by this weapon treat Out of Action results as Down results instead.',

  // ── O ────────────────────────────────────────────────────────────────────
  'ORATOR':
    '(TrenchHammer) Adeptus Ministorum keyword. ORATOR models project Battle Hymns each Turn. While within 6\u201d of an ORATOR that is not Down, friendly ECCLESIARCHY models benefit from the chosen Turn\u2019s Battle Hymn effect. Key ORATOR units: Confessor (ELITE, LEADER, NEGATE FEAR, ORATOR, TOUGH), Drill Abbot (ELITE, NEGATE FEAR, ORATOR), Preacher (NO PROMOTION, ORATOR). Multiple ORATORS in a warband allow different Hymns or redundancy.',

  // ── P ────────────────────────────────────────────────────────────────────
  'PERILOUS':
    '(TrenchHammer) A psychic power with PERILOUS ±X causes Perils of the Warp on rolls of 2 to (2+X) and from (12−X) to 12. PERILOUS always stacks with itself. Example: PERILOUS ±2 triggers Perils on 2–4 and 10–12.',
  'PILGRIM':
    'This model is part of the Trench Pilgrim Faction (Tag).',
  'PISTOL':
    'Can be used as either a Melee or Ranged Weapon, and as both in the same Activation. As Ranged: use listed range and attacker\'s Ranged Characteristic. As Melee: use attacker\'s Ranged or Melee Characteristic; may be used as an Off-Hand weapon.',
  'PSYKER':
    '(TrenchHammer) Capable of using psychic powers. The X value is added as +DICE when using psychic powers, and replaces Ranged or Melee Skill for attacks with PSYCHIC weapons.',
  'PSYKER 0': '(TrenchHammer) Can use psychic powers with +0 bonus dice. The Weirdboy starts at PSYKER 0 and increases to a maximum of PSYKER 3 via its Waaagh! Energy ability (+1 per friendly ORK within 6", maximum 3).',
  'PSYKER 1': '(TrenchHammer) Can use psychic powers with +1 DICE bonus to all psychic rolls.',
  'PSYKER 2': '(TrenchHammer) Can use psychic powers with +2 DICE bonus to all psychic rolls.',
  'PSYKER 3': '(TrenchHammer) Can use psychic powers with +3 DICE bonus to all psychic rolls.',
  'PSYCHIC':
    '(TrenchHammer) Applies to Abilities and attacks. All psychic powers have it by default. Note: PSYCHIC attacks benefit from the caster\'s PSYKER X value but do not need a Cast Action unless they are a psychic power.',
  'PUTRESCERE':
    'Arcana Putrescere spells (PUTRESCERE X) require spending X INFECTION MARKERS from any model within 12" of the caster (friendly or enemy). Markers are removed from play. No Action Roll needed unless specified. Each Arcana can be used only once per Activation.',

  // ── R ────────────────────────────────────────────────────────────────────
  'REGENERATE':
    'When you Activate a model with REGENERATE (X), before taking any Actions you may remove up to X BLOOD MARKERS from it.',
  'RELOAD':
    'After making an attack with this weapon, the model\'s Activation ends immediately after that ACTION completes.',
  'RISKY':
    'The Success Roll for this Battlekit becomes a Risky Success Roll — the model\'s Activation (or current ACTION) ends if the roll is a Failure. Has no additional effect if the roll is already Risky.',

  // ── S ────────────────────────────────────────────────────────────────────
  'SCATTER':
    'If the Success Roll for an attack with this weapon fails, the target point scatters: subtract the roll from 7 to find the distance (e.g. roll of 4 → 3" scatter). Opponent chooses the direction to a valid visible point. Then resolve the BLAST as normal from the new point.',
  'SHIELD COMBO':
    'For the purpose of wielding this 2-Handed weapon, the Trench Shield does not take up a hand and still functions normally.',
  'SHOTGUN':
    'At Long Range, add -1 INJURY DICE to rolls for this weapon instead of the usual -1 DICE to Hit.',
  'SHRAPNEL':
    'After the Injury Roll, place 1 extra BLOOD MARKER next to the target (even on No Effect).',
  'SKIRMISHER':
    'If targeted by a Charge while not within 1" of an enemy, roll a D3 and move that many inches (must end 1"+ from all enemies) before the Charge resolves. If an interposing model results, the charger must target it instead.',
  'STEALTH':
    '(TrenchHammer) Long Range attacks against this model suffer an additional -1 DICE to Hit. Attacks that already ignore the Long Range penalty also ignore STEALTH.',
  'STRONG':
    'This model is not affected by Battlekit with the HEAVY Keyword. In addition, it can wield one TWO-HANDED Melee Weapon as if it were 1-Handed for melee. (TrenchHammer) It can also wield a TWO-HANDED HELD weapon in one hand for melee (not ranged); CUMBERSOME prevents this exception.',
  'STUN':
    '(TrenchHammer) This weapon causes a STUN MARKER in addition to the normal Injury Roll result, even if no BLOOD MARKER was gained. If the weapon also has STUN MARKERS, STUN provides an additional STUN MARKER on top.',
  'STUN MARKERS':
    '(TrenchHammer) This weapon places STUN MARKERS instead of BLOOD MARKERS (including via other Keywords like FIRE, GAS, or SHRAPNEL). STUN MARKERS work like BLOOD MARKERS for -DICE on Success Rolls but cannot be spent to add +DICE to Injury rolls or to cause Bloodbaths. Maximum 6 per model (in addition to BLOOD and INFECTION MARKERS). STUNLOCK: When an enemy model Activates, you may spend 6 of its STUN MARKERS to cause it to fall Down and immediately end its Activation (spend only 3 if the model is Down, in which case it remains Down).',
  'SULTANATE':
    'This model is part of the Sultanate of the Iron Wall Faction (Tag).',
  'SWARM':
    '(TrenchHammer) This model cannot fall Down for any reason. Weapons with the BLAST Keyword have +1 INJURY DICE against it.',
  'SWEEPING':
    '(TrenchHammer) When this model takes a Fight Action, make 1 Melee Attack against every enemy model within 1" of it. Resolve each attack one at a time in the order of your choice.',
  'SYNAPSE':
    '(TrenchHammer) Tyranids keyword. While within 4\u201d of a model with SYNAPSE (or within 6\u201d of a Hive Tyrant or Neurotyrant with SYNAPSE), a model with the TYRANID Keyword is considered Within Synapse Range. A model Within Synapse Range has +1 DICE to Dash Actions. The patron skill \u201cDirect Guidance (Synapse Only)\u201d requires the model to have SYNAPSE.',

  // ── T ────────────────────────────────────────────────────────────────────
  'THE COURT':
    'This model is part of The Court of the Seven-Headed Serpent Faction (Tag).',
  'THROWN':
    'This Battlekit takes up no hands. A model can be equipped with only 1 THROWN piece of Battlekit at a time.',
  'TOUGH':
    'The first time this model suffers an Out of Action result on the Injury Table, treat it as a Down result instead.',
  'TURBO-BOOST':
    '(TrenchHammer) The rider gains +1 DICE to all Dash Success Rolls but cannot climb sheer surfaces.',
  'TWO-HANDED':
    'This weapon requires both hands when used in its category (ranged or melee). A STRONG model may use a TWO-HANDED Melee Weapon as 1-Handed for melee.',

  // ── V ────────────────────────────────────────────────────────────────────
  'VEHICLE':
    '(TrenchHammer) This model is a vehicle-scale unit, subject to specific vehicle rules.',
  'VICIOUS':
    'This weapon scores a Critical Hit on any roll equal to or higher than X (if it would otherwise hit).',
  'VICIOUS 10': 'Scores a Critical Hit on any roll of 10 or higher (if it would otherwise hit).',
  'VICIOUS 11': 'Scores a Critical Hit on any roll of 11 or higher (if it would otherwise hit).',
  'VICIOUS 12': 'Scores a Critical Hit only on a roll of 12 (if it would otherwise hit).',

  // ── W ────────────────────────────────────────────────────────────────────
  'WHIP':
    '(TrenchHammer) This melee weapon can make a ranged attack with a range equal to X inches, using the model\'s Melee Skill, with IGNORE LONG RANGE. Still counts as a melee weapon for the hands it occupies.',

  // ── TrenchHammer Faction Tags ────────────────────────────────────────────
  // These mark a model as part of a specific 40K-era faction in TrenchHammer.
  // They have no rules effect on their own, but are referenced by faction
  // abilities, patron bonuses, and subfaction rules.
  'AELDARI':           '(TrenchHammer) Faction Tag. This model is part of the Aeldari faction.',
  'ASSASSINORUM':      '(TrenchHammer) Faction Tag. This model is part of the Officio Assassinorum faction.',
  'ASTARTES':          '(TrenchHammer) Faction Tag. This model is part of the Adeptus Astartes faction.',
  'CHAOS CULT':        '(TrenchHammer) Faction Tag. This model is part of the Chaos Cult faction.',
  'CUSTODES':          '(TrenchHammer) Faction Tag. This model is part of the Adeptus Custodes faction.',
  'DAEMON':            '(TrenchHammer) Faction Tag. This model is a Chaos Daemon.',
  'DARK MECHANICUM':   '(TrenchHammer) Faction Tag. This model is part of the Dark Mechanicum — Chaos-aligned tech-heretics. Appears on Hell-Forge Hereteks and Negavolt Cultists recruited as Dark Mechanicum mercenaries.',
  'DRUKHARI':          '(TrenchHammer) Faction Tag. This model is part of the Drukhari faction.',
  'ECCLESIARCHY':      '(TrenchHammer) Faction Tag. This model is part of the Adeptus Ministorum faction.',
  'GANGER':            '(TrenchHammer) Faction Tag. This model is part of a Necromunda Gang faction.',
  'GENESTEALER CULTS': '(TrenchHammer) Faction Tag. This model is part of the Genestealer Cults faction.',
  'HARLEQUIN':         '(TrenchHammer) Faction Tag. This model is part of the Harlequins faction.',
  'HERETIC ASTARTES':  '(TrenchHammer) Faction Tag. This model is part of the Heretic Astartes faction.',
  'INQUISITION':       '(TrenchHammer) Faction Tag. This model is part of The Inquisition faction.',
  'MECHANICUS':        '(TrenchHammer) Faction Tag. This model is part of the Adeptus Mechanicus faction.',
  'MILITARUM':         '(TrenchHammer) Faction Tag. This model is part of the Astra Militarum faction.',
  'NECRON':            '(TrenchHammer) Faction Tag. This model is part of the Necrons faction.',
  'ORK':               '(TrenchHammer) Faction Tag. This model is part of the Orks faction.',
  'PIRATE':            '(TrenchHammer) Faction Tag. This model is part of the Pirate Crew faction.',
  'ROGUE TRADER':      '(TrenchHammer) Faction Tag. This model is part of the Rogue Trader faction.',
  'SKAVEN':            '(TrenchHammer) Faction Tag. This model is part of The Vermintide (Skaven) faction.',
  'SLANN':             '(TrenchHammer) Faction Tag. This model is part of the Slanni faction.',
  'SORORITAS':         '(TrenchHammer) Faction Tag. This model is part of the Adepta Sororitas faction.',
  'T\'AU':             '(TrenchHammer) Faction Tag. This model is part of the T\'au Empire faction.',
  'TYRANID':           '(TrenchHammer) Faction Tag. This model is part of the Tyranids faction.',
  'VOTANN':            '(TrenchHammer) Faction Tag. This model is part of the Leagues of Votann faction.',

  // ── Chaos God Marks (granted by TrenchHammer subfaction rules) ───────────
  'KHORNE':   '(TrenchHammer) Chaos Mark. This model bears the Mark of Khorne. Referenced by World Eaters subfaction rules and Khorne patron abilities.',
  'NURGLE':   '(TrenchHammer) Chaos Mark. This model bears the Mark of Nurgle. Referenced by Death Guard subfaction rules and Nurgle patron abilities.',
  'SLAANESH': '(TrenchHammer) Chaos Mark. This model bears the Mark of Slaanesh. Referenced by Emperor\'s Children subfaction rules and Slaanesh patron abilities.',
  'TZEENTCH': '(TrenchHammer) Chaos Mark. This model bears the Mark of Tzeentch. Referenced by Thousand Sons subfaction rules and Tzeentch patron abilities.',
  'UNDIVIDED':
    '(TrenchHammer) Chaos Mark. This model serves Chaos Undivided — it bears no single god\u2019s mark. Referenced by Chaos Daemons Ascendency rules (UNDIVIDED Daemons can contribute to all gods\u2019 Ascendency totals), the Master of the Union patron skill (a DAEMON with UNDIVIDED cannot be chosen for it), and the Daemon Prince of Darkness upgrade. Distinct from units with a specific Mark (KHORNE, NURGLE, SLAANESH, or TZEENTCH).',
};

/**
 * Look up the description for a keyword string.
 * Normalises the key before lookup. Handles "VICIOUS X", "AUTOMATIC X", etc.
 */
export function getKeywordDescription(keyword: string): string | undefined {
  const normalised = keyword.trim().toUpperCase();
  if (KEYWORD_GLOSSARY[normalised]) return KEYWORD_GLOSSARY[normalised];

  // Try prefix matches for parameterised keywords
  const prefixes = [
    'ARMOUR PIERCING', 'AUTOMATIC', 'VICIOUS', 'BLAST', 'BLESSED',
    'CLEAVE', 'DANGEROUS', 'DANGEROUS TERRAIN', 'FUMBLE', 'GOETIC', 'ICON', 'IGNORE ARMOUR', 'PERILOUS',
    'PUTRESCERE', 'PSYKER', 'REGENERATE', 'LIMIT', 'NEGATE', 'WHIP',
  ];
  for (const prefix of prefixes) {
    if (normalised.startsWith(prefix)) {
      const baseDesc = KEYWORD_GLOSSARY[prefix];
      if (baseDesc) return baseDesc;
    }
  }
  return undefined;
}

/**
 * Given a list of keyword strings, return those that have a glossary entry,
 * deduplicated, with their descriptions.
 */
export function expandKeywords(
  keywords: string[],
): Array<{ keyword: string; description: string }> {
  const seen = new Set<string>();
  const result: Array<{ keyword: string; description: string }> = [];
  for (const kw of keywords) {
    const desc = getKeywordDescription(kw);
    if (desc && !seen.has(kw.trim().toUpperCase())) {
      seen.add(kw.trim().toUpperCase());
      result.push({ keyword: kw, description: desc });
    }
  }
  return result;
}
