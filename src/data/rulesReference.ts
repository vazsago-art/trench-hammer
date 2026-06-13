/**
 * rulesReference.ts
 *
 * Searchable rules reference content for the Rules Quick-Reference component.
 * Rules are organized by category. Each rule entry has a title, body (markdown-ish),
 * and optional tags for search filtering.
 */

export interface RulesEntry {
  id: string;
  title: string;
  category: string;
  body: string;
  tags: string[];
}

export const RULES_CATEGORIES = [
  'Turn Structure',
  'Actions',
  'Dice & Rolls',
  'Movement',
  'Ranged Combat',
  'Melee Combat',
  'Injury & Damage',
  'Markers',
  'Morale',
  'Terrain',
  'Deployment',
  'Combat',
  'Keywords',
  'Profiles & Battlekit',
  'Psychic Powers',
  'Perils of the Warp',
  'Campaign',
] as const;

export type RulesCategory = typeof RULES_CATEGORIES[number];

export const RULES_ENTRIES: RulesEntry[] = [
  // ── TURN STRUCTURE ─────────────────────────────────────────────
  {
    id: 'turn_sequence',
    title: 'Turn Sequence',
    category: 'Turn Structure',
    body: `A game is divided into Turns, each split into 3 phases:

1. Initiative Phase — Determine who goes first.
2. Activation Phase — Players alternate activating models.
3. Morale Phase — Check if warbands break.`,
    tags: ['turn', 'phase', 'sequence', 'initiative', 'activation', 'morale'],
  },
  {
    id: 'initiative_phase',
    title: 'Initiative Phase',
    category: 'Turn Structure',
    body: `• Count models in each Warband currently on the battlefield (do NOT count Down or Out of Action models).
• Player with the fewest models has Initiative.
• If tied, roll-off (each player rolls 1D6, highest wins).
• The player with Initiative chooses which player activates first.
• Start of Turn tasks are resolved in the order chosen by the Initiative player.
• Simultaneous activities: Initiative player determines order.`,
    tags: ['initiative', 'first', 'roll-off', 'models', 'count'],
  },
  {
    id: 'activation_phase',
    title: 'Activation Phase',
    category: 'Turn Structure',
    body: `• Players alternate activating models one at a time.
• When it's your turn, pick any un-Activated model in your Warband.
• A model cannot be Activated more than once per Turn.
• If one player runs out of models to activate, the opponent activates remaining models one after another.
• Then proceed to the Morale Phase.`,
    tags: ['activation', 'alternate', 'model', 'turn'],
  },
  {
    id: 'winning_the_game',
    title: 'Winning the Game',
    category: 'Turn Structure',
    body: `• If your opponent's warband flees, you win immediately.
• Otherwise, the winner is determined after the final Turn per scenario rules.`,
    tags: ['win', 'victory', 'flee', 'scenario'],
  },
  // ── ACTIONS ────────────────────────────────────────────────────
  {
    id: 'actions_overview',
    title: 'Actions — Overview',
    category: 'Actions',
    body: `Each ACTION can only be taken once per Activation unless stated otherwise. Actions can be taken in any order.

Available actions:
• Move, Charge, or Retreat (pick ONE of these)
• Dash (in addition to Move/Charge/Retreat)
• Shoot (Ranged Attack)
• Fight (Melee Attack)
• Other (unique actions from Warband Entry, Battlekit, or Campaign Skills)`,
    tags: ['action', 'move', 'charge', 'retreat', 'dash', 'shoot', 'fight'],
  },
  {
    id: 'action_move',
    title: 'Action — Move',
    category: 'Actions',
    body: `Move up to the model's Movement Characteristic in inches, in any direction.

• Cannot move within 1" of an enemy model (must Charge instead).
• Obstacles up to 1" high are crossed without penalty.
• Cannot move across a friendly model unless you have enough movement to clear it entirely.
• Cannot move off the battlefield unless a rule allows it.
• A model starting within 1" of an enemy can only move if it stays within 1" of every enemy it started near, or Retreats.`,
    tags: ['move', 'movement', 'action', 'inches'],
  },
  {
    id: 'action_charge',
    title: 'Action — Charge',
    category: 'Actions',
    body: `Pick a visible enemy within 12". Roll 1D6 and add to Movement Characteristic (max Movement Characteristic of 12"). Move toward target.

• If you finish within 1" of the target, you may Fight.
• Cannot Charge if already within 1" of an enemy.
• Cannot Shoot and Charge/Fight in same Activation unless weapon has ASSAULT keyword.
• Interposing rule: cannot charge past an enemy within 1" of your path — must charge the interposing model instead.`,
    tags: ['charge', 'action', '1d6', 'bonus', 'interposing', 'assault'],
  },
  {
    id: 'action_retreat',
    title: 'Action — Retreat',
    category: 'Actions',
    body: `Only for models within 1" of an enemy. Move up to Movement Characteristic but must end more than 1" from all enemies.

Before retreating, each enemy model within 1" can make 1 melee attack with 1 weapon against the retreating model. If that takes the model Down or Out of Action, it doesn't move.

The attacking model cannot use the Multiple Melee Weapons rule, but CLEAVE still applies.`,
    tags: ['retreat', 'action', 'disengage', 'free attack'],
  },
  {
    id: 'action_dash',
    title: 'Action — Dash',
    category: 'Actions',
    body: `Dash can be taken in addition to Move/Charge/Retreat (before or after).

• Move up to Movement Characteristic in any direction.
• Must take a Risky Success Roll first.
  — Fail = Activation ends immediately.
  — Succeed = move as normal.
• Cannot charge or retreat with a Dash.`,
    tags: ['dash', 'action', 'risky', 'extra movement'],
  },
  {
    id: 'action_shoot',
    title: 'Action — Shoot',
    category: 'Actions',
    body: `Make a Ranged Attack.

• Must be more than 1" from all enemies.
• Must have a Ranged Weapon.
• Cannot Shoot and Charge/Fight in same Activation (unless ASSAULT keyword).`,
    tags: ['shoot', 'action', 'ranged', 'attack'],
  },
  {
    id: 'action_fight',
    title: 'Action — Fight',
    category: 'Actions',
    body: `Make a Melee Attack.

• Must be within 1" of an enemy.
• Must have a Melee Weapon.`,
    tags: ['fight', 'action', 'melee', 'attack', 'close combat'],
  },
  // ── DICE & ROLLS ───────────────────────────────────────────────
  {
    id: 'success_rolls',
    title: 'Success Rolls',
    category: 'Dice & Rolls',
    body: `Procedure:
1. Take 2D6.
2. Add any +DICE or -DICE modifiers.
3. Roll all dice.
4. Pick the 2 highest (if +DICE) or 2 lowest (if -DICE).
5. Add the 2 chosen dice together.
6. Consult the Success Roll Table.

Results:
• 2–6: Failure
• 7–11: Success
• 12+: Critical Success — add +1 INJURY DICE to any resulting Injury Roll`,
    tags: ['success roll', '2d6', 'dice', 'critical', 'failure', 'success'],
  },
  {
    id: 'dice_modifiers',
    title: '+DICE and -DICE Modifiers',
    category: 'Dice & Rolls',
    body: `• +1 DICE = roll 3 dice, pick 2 highest.
• +2 DICE = roll 4 dice, pick 2 highest. And so on.
• -1 DICE = roll 3 dice, pick 2 lowest.
• -2 DICE = roll 4 dice, pick 2 lowest. And so on.

Combining: Cancel pairs of +DICE and -DICE until one type remains.
Example: +2 DICE and -1 DICE → net +1 DICE.

Important:
• +/- DICE only applies to Success Rolls, NOT Injury Rolls.
• +/- INJURY DICE only applies to Injury Rolls, NOT Success Rolls.`,
    tags: ['dice', 'modifier', '+dice', '-dice', 'cancel', 'combine'],
  },
  {
    id: 'risky_success_rolls',
    title: 'Risky Success Rolls',
    category: 'Dice & Rolls',
    body: `Same as a normal Success Roll, but with an additional consequence on failure:

• Failure = model's Activation immediately ends.
• If taken outside the model's Activation, that ACTION immediately ends.

Used for: Dashing, Climbing, Jumping, Dangerous Terrain, and some special abilities.`,
    tags: ['risky', 'success roll', 'activation ends', 'dangerous'],
  },
  {
    id: 'rerolls',
    title: 'Re-Rolls',
    category: 'Dice & Rolls',
    body: `Roll the same dice again. A die cannot be re-rolled more than once.

For XD6 re-rolls: you must re-roll all dice in the group.`,
    tags: ['reroll', 're-roll', 'dice'],
  },
  {
    id: 'd3_rolls',
    title: 'D3 Rolls',
    category: 'Dice & Rolls',
    body: `Roll 1D6 and halve the result, rounding up:
• 1–2 = 1
• 3–4 = 2
• 5–6 = 3`,
    tags: ['d3', 'dice', 'roll', 'half'],
  },
  {
    id: 'roll_off',
    title: 'Rolling Off',
    category: 'Dice & Rolls',
    body: `Each player rolls 1D6. Highest wins. No modifiers apply.

If tied, re-roll.`,
    tags: ['roll-off', 'tie', 'dice', '1d6'],
  },
  {
    id: 'measuring',
    title: 'Measuring Distances',
    category: 'Dice & Rolls',
    body: `• Always measure from base (or nearest part if no base).
• "Within" = distance between nearest points ≤ stated distance.
• Pre-measuring is allowed at any time.
• Fractions: Retain for distances. Round up for all other values.`,
    tags: ['measure', 'distance', 'within', 'pre-measure', 'base'],
  },
  // ── MOVEMENT ───────────────────────────────────────────────────
  {
    id: 'movement_basic',
    title: 'Basic Movement',
    category: 'Movement',
    body: `Pick up the model and move it along a path. Path length ≤ Movement Characteristic.

• Move in any direction/combination, pivot freely.
• Cannot move across a friendly model unless enough movement to clear it entirely.
• Cannot move off the battlefield unless a rule allows it.
• Cannot move within 1" of enemy models (must Charge instead).
• A model starting within 1" of an enemy can only move if it stays within 1" of every enemy it started near, or Retreats.
• Terrain up to 1" high is crossed as Open terrain (no penalty).
• Trench walls up to 3" high are crossed as Open terrain.`,
    tags: ['movement', 'basic', 'path', 'pivot'],
  },
  {
    id: 'climbing',
    title: 'Climbing Sheer Surfaces',
    category: 'Movement',
    body: `Move within 1" of a wall, then declare a Climb.

• Must have enough movement to clear the entire surface (cannot stop halfway).
• Take a Risky Success Roll:
  — Success = move up/down the surface and continue.
  — Failure = can't move further, Activation ends.`,
    tags: ['climb', 'wall', 'sheer', 'risky', 'vertical'],
  },
  {
    id: 'jumping_gaps',
    title: 'Jumping Over Gaps',
    category: 'Movement',
    body: `Gap width must be ≤ half the model's Movement Characteristic.

• Move to the gap edge and take a Risky Success Roll.
  — Success = cross the gap and continue.
  — Failure = model Falls (opponent chooses which side), Activation ends.

Unequal heights:
• Jumping to a higher ledge: add the extra height to the horizontal distance.
• Jumping from higher to lower: apply Jumping Down rules instead.`,
    tags: ['jump', 'gap', 'risky', 'fall'],
  },
  {
    id: 'jumping_down',
    title: 'Jumping Down',
    category: 'Movement',
    body: `Jumping down is free — it does NOT count against movement distance.

• If jumping down 3" or more, it counts as Falling — make an Injury Roll.`,
    tags: ['jump', 'down', 'free', 'fall'],
  },
  {
    id: 'falling',
    title: 'Falling',
    category: 'Movement',
    body: `Model moves to the first flat surface directly below.

If the fall is 3" or more, make an Injury Roll with +1 INJURY DICE per 3" fallen:
• 3–5" = +1 INJURY DICE
• 6–8" = +2 INJURY DICE
• 9–11" = +3 INJURY DICE
• And so on.`,
    tags: ['fall', 'injury', 'height', 'dice'],
  },
  // ── RANGED COMBAT ──────────────────────────────────────────────
  {
    id: 'ranged_attack_sequence',
    title: 'Ranged Attack Sequence',
    category: 'Ranged Combat',
    body: `1. Choose Weapon from the model's profile.
2. Pick Target — must be visible and in range.
3. Check Line of Sight.
4. Check Range — base-to-base distance ≤ weapon range.
5. Determine Modifiers.
6. Take a Success Roll.

Results:
• Failure: Miss, no effect.
• Success: Hit → make an Injury Roll.
• Critical Success: Hit → Injury Roll with +1 INJURY DICE.`,
    tags: ['ranged', 'shooting', 'sequence', 'attack', 'hit', 'miss'],
  },
  {
    id: 'line_of_sight',
    title: 'Line of Sight',
    category: 'Ranged Combat',
    body: `Look from behind the attacking model and check if you can see any part of the target model (excluding base, hands, feet, or carried/attached items like weapons or banners).

• Models see 360° and can pivot freely before checking LoS.
• Partial Line of Sight: Can see part but not all of the target → target is in Cover.
• Points on battlefield/terrain: Treated as 1mm across, 1mm high.`,
    tags: ['line of sight', 'los', 'visibility', 'cover', 'partial'],
  },
  {
    id: 'cover',
    title: 'Cover',
    category: 'Ranged Combat',
    body: `A model is in Cover if it is on or in contact with terrain that is:
• At least ½" high.
• At least as wide as the model's base.
• The terrain lies between it and the attacking model, partially blocking Line of Sight.

Being in Cover gives -1 DICE to ranged attacks targeting the model.`,
    tags: ['cover', 'terrain', 'protection', '-1 dice'],
  },
  {
    id: 'range_bands',
    title: 'Short & Long Range',
    category: 'Ranged Combat',
    body: `• Short Range: Distance ≤ half weapon range. No modifier.
• Long Range: Distance > half weapon range → -1 DICE to the attack.`,
    tags: ['range', 'short', 'long', '-1 dice', 'distance'],
  },
  {
    id: 'ranged_modifiers',
    title: 'Ranged Attack Modifiers',
    category: 'Ranged Combat',
    body: `All modifiers are cumulative:

• Elevated Position: +1 DICE if attacker is at least 3" higher than target.
• Cover: -1 DICE if target is in cover.
• Long Range: -1 DICE if beyond half weapon range.`,
    tags: ['ranged', 'modifier', 'elevated', 'cover', 'long range'],
  },
  {
    id: 'shooting_into_melee',
    title: 'Shooting Into Melee',
    category: 'Ranged Combat',
    body: `If the target is within 1" of any friendly models, roll 1D6:
• 1–3: Must target a friendly model instead.
• 4–6: Can target the intended enemy model.

This randomization only applies to the initial target pick, NOT to BLAST radius hits or BLOOD MARKER placement.`,
    tags: ['shooting', 'melee', 'friendly fire', 'randomize', '1d6'],
  },
  // ── MELEE COMBAT ───────────────────────────────────────────────
  {
    id: 'melee_attack_sequence',
    title: 'Melee Attack Sequence',
    category: 'Melee Combat',
    body: `1. Choose a Melee Weapon from the model's profile.
2. Choose Target — must be within 1" and in Line of Sight.
3. Determine Modifiers.
4. Take a Success Roll.

Results:
• Failure: Miss, no effect.
• Success: Hit → make an Injury Roll.
• Critical Success: Hit → Injury Roll with +1 INJURY DICE.`,
    tags: ['melee', 'attack', 'sequence', 'close combat', 'fight'],
  },
  {
    id: 'melee_modifiers',
    title: 'Melee Attack Modifiers',
    category: 'Melee Combat',
    body: `All modifiers are cumulative:

• Diving Charge: +1 DICE (jumped down 3"+, passed Risky roll).
• Defended Obstacle: -1 DICE if target is in cover with terrain between.
• Off-Hand Weapon: -1 DICE for the second weapon attack.
• FEAR: -1 DICE if target has FEAR keyword (cancelled if both models have FEAR).`,
    tags: ['melee', 'modifier', 'diving', 'obstacle', 'off-hand', 'fear'],
  },
  {
    id: 'multiple_melee_weapons',
    title: 'Multiple Melee Weapons',
    category: 'Melee Combat',
    body: `A model with 2 Melee Weapons can use 1 Fight ACTION to make 2 attacks (one with each weapon).

• The second attack uses the Off-Hand Weapon modifier (-1 DICE).
• Can pick the same or different targets.
• With CLEAVE: Make all attacks with the first weapon, then all Off-Hand attacks with the second weapon.`,
    tags: ['multiple', 'melee', 'off-hand', '-1 dice', 'cleave', 'dual wield'],
  },
  {
    id: 'diving_charge',
    title: 'Diving Charge',
    category: 'Melee Combat',
    body: `During a Charge, if the model Jumps Down 3" or more and lands within 1" of the target:

• Take a Risky Success Roll.
  — Failure: Model is taken Down + make a Falling Injury Roll.
  — Success: No Falling Injury Roll + gain +1 DICE to the next Melee Attack this activation.`,
    tags: ['diving', 'charge', 'jump', 'risky', '+1 dice'],
  },
  // ── INJURY & DAMAGE ────────────────────────────────────────────
  {
    id: 'injury_rolls',
    title: 'Injury Rolls',
    category: 'Injury & Damage',
    body: `Procedure:
1. Take 2D6.
2. Add any +/- INJURY DICE modifiers.
3. Roll all dice.
4. Pick the 2 highest (if +INJURY DICE) or 2 lowest (if -INJURY DICE).
5. Add the 2 chosen dice together.
6. Apply +/- INJURY MODIFIERS (maximum total -INJURY MODIFIER is -3).
7. Consult the Injury Roll Table.

Injury Roll Table:
• 1 or less: No Effect — unharmed.
• 2–6: Minor Hit — place 1 BLOOD MARKER.
• 7–8: Down — place 1 BLOOD MARKER + mark as Down. If already Down, place 2 BLOOD MARKERS instead.
• 9+: Out of Action — removed from play.`,
    tags: ['injury', 'roll', 'damage', 'blood marker', 'down', 'out of action', 'table'],
  },
  {
    id: 'injury_modifiers',
    title: 'Common Injury Modifiers',
    category: 'Injury & Damage',
    body: `All modifiers are cumulative:

• Blessing Markers: Spend to add -1 INJURY DICE each.
• Blood Markers: Opponent spends to add +1 INJURY DICE each.
• Critical Success: +1 INJURY DICE.
• Down target: +1 INJURY DICE for Melee Attacks.
• Armour Characteristic: Model's built-in -INJURY MODIFIER.
• Battlekit: -INJURY MODIFIER from Armour, Shield, etc.
• Abilities/Keywords: As specified.`,
    tags: ['injury', 'modifier', 'armour', 'blessing', 'blood', 'critical'],
  },
  {
    id: 'bloodbath_rolls',
    title: 'Bloodbath Rolls',
    category: 'Injury & Damage',
    body: `Spend 6 BLOOD MARKERS (or 3 if target is Down) to convert an Injury Roll into a Bloodbath Roll.

• Roll 3D6 and add all 3 together.
• +/- INJURY DICE: pick the 3 highest or 3 lowest instead of 2.
• If the attack has the DEADLY keyword: roll 4D6 and add all 4 together (pick 4 highest/lowest).`,
    tags: ['bloodbath', 'blood marker', '3d6', 'deadly', 'spend'],
  },
  {
    id: 'down_result',
    title: 'Down Results',
    category: 'Injury & Damage',
    body: `When a model is taken Down:
• Activation ends immediately (if during its Activation).
• -1 DICE to all Success Rolls for the Down model.
• +1 INJURY DICE for Melee Attacks against a Down target.
• Cannot be moved for any reason (unless it Falls).
• Stands up when next Activated, but Movement Characteristic is halved for that Activation (including Charge Bonus).

Near a ledge (within 1"):
• Take a Success Roll. Failure = Falls from nearest ledge, then taken Down. Success = Down but doesn't fall.`,
    tags: ['down', 'prone', 'halved', 'movement', 'ledge', 'activation ends'],
  },
  // ── MARKERS (existing + new) ──────────────────────────────────
  {
    id: 'blood_markers_core',
    title: 'Blood Markers',
    category: 'Markers',
    body: `Max 6 BLOOD MARKERS per model (ignore further wounds at 6).

Your opponent can spend Blood Markers on your model:
• On your Success Rolls: spend to add -1 DICE each.
• On Injury Rolls against the model: spend to add +1 INJURY DICE each.`,
    tags: ['blood', 'marker', '-1 dice', '+1 injury dice', 'spend', 'opponent'],
  },
  {
    id: 'blessing_markers_core',
    title: 'Blessing Markers',
    category: 'Markers',
    body: `Max 6 BLESSING MARKERS per model.

You can spend Blessing Markers on your own model:
• On your Success Rolls: spend to add +1 DICE each.
• On Injury Rolls against the model: spend to add -1 INJURY DICE each.`,
    tags: ['blessing', 'marker', '+1 dice', '-1 injury dice', 'spend', 'friendly'],
  },
  // ── MORALE ─────────────────────────────────────────────────────
  {
    id: 'morale_check',
    title: 'Morale Check',
    category: 'Morale',
    body: `If half or more of your models are Down or Out of Action (rounded up), take a Morale Check (Success Roll) during the Morale Phase.

Example: 5-model warband → check at 3+ Down/OoA (half of 5 = 2.5, rounds up to 3).

• +1 DICE to Morale Check if you have a LEADER model on the battlefield (not Down/OoA).
• Success: Carry on normally.
• Failure: Warband becomes Shaken.`,
    tags: ['morale', 'check', 'half', 'leader', '+1 dice', 'shaken'],
  },
  {
    id: 'shaken_warbands',
    title: 'Shaken Warbands',
    category: 'Morale',
    body: `When Shaken:
• All Success Rolls become Risky Success Rolls (fail = activation ends).
• Next Turn's Morale Phase: must take another Morale Check even if fewer than half are Down/OoA.
  — Success: No longer Shaken.
  — Failure: Warband flees — you immediately lose the game.`,
    tags: ['shaken', 'risky', 'flee', 'lose', 'morale'],
  },
  {
    id: 'sounding_retreat',
    title: 'Sounding the Retreat',
    category: 'Morale',
    body: `On a failed Morale Check, you may choose to flee immediately (lose the game) instead of becoming Shaken.

This is useful to conserve losses in campaigns.`,
    tags: ['retreat', 'flee', 'voluntary', 'campaign', 'morale'],
  },
  // ── TERRAIN ────────────────────────────────────────────────────
  {
    id: 'terrain_types',
    title: 'Terrain Types',
    category: 'Terrain',
    body: `Four terrain types:

• Open: No impediment, free movement.
• Difficult: Every 1" moved counts as 2" (half speed).
• Dangerous: On Activation in or moving into, take a Risky Success Roll. Fail = Injury Roll + Activation ends. Success = continue; no more rolls for that keyword during that move. May have keywords in brackets (e.g., DANGEROUS TERRAIN (FIRE) → Injury Rolls get FIRE keyword).
• Impassable: Models cannot move onto or across it.

Terrain can be both Difficult AND Dangerous.`,
    tags: ['terrain', 'open', 'difficult', 'dangerous', 'impassable', 'type'],
  },
  {
    id: 'terrain_specific',
    title: 'Specific Terrain Features',
    category: 'Terrain',
    body: `• Landmarks (statues, shrines): Impassable. FLYING models can cross.
• Hills: Usually Open. Block LoS. May give height advantage.
• Linear terrain (walls, hedges): Open if ≤1" high. Climb if >1" high.
• Trench sections: 4–12" long, 2–4" wide. Walls <3" = Open crossing. Walls ≥3" = must Climb/Jump.
• Ruined buildings: Walls climbed as sheer surfaces. Stairs/floors = Open. Rubble = Difficult.
• Corner ruins: L or T shaped walls up to 6" each. Rubble = Difficult.
• Rivers: Dangerous terrain. Must include crossing points (bridges/fords = Open).
• Streams: Difficult terrain. Must include crossing points.`,
    tags: ['terrain', 'landmark', 'hill', 'trench', 'ruin', 'river', 'stream'],
  },
  {
    id: 'battlefield_archetypes',
    title: 'Battlefield Archetypes',
    category: 'Terrain',
    body: `1. No Man's Land: Sparse terrain (trenches, ruins, hills, dangerous/difficult areas, landmarks). Each piece 3"+ apart. Trenches only in deployment zones.

2. Decimated Ruins: Dense ruins (6+ ruined buildings minimum). Ruins placed 3–9" apart. Other terrain 3"+ from other pieces.

3. Trench Lines: Interconnected trenches spanning the battlefield edge to edge. Other terrain 1"+ from trenches, 3"+ from other terrain.`,
    tags: ['battlefield', 'archetype', 'no mans land', 'ruins', 'trench lines', 'setup'],
  },
  // ── DEPLOYMENT (core keywords) ─────────────────────────────────
  {
    id: 'fireteam',
    title: 'FIRETEAM',
    category: 'Deployment',
    body: `A group of 2 models with the FIRETEAM keyword.

• Can be Activated simultaneously — take actions in any order, switch between models freely.
• If either model's Activation ends, both end.
• A model can only be in 1 Fireteam.`,
    tags: ['fireteam', 'pair', 'simultaneous', 'activation'],
  },
  {
    id: 'flying_keyword',
    title: 'FLYING',
    category: 'Deployment',
    body: `Measure movement path through the air (ignore terrain).

• Must end on the battlefield or a terrain piece.
• Still take Risky Success Roll for Dangerous terrain.
• Cannot end on Impassable terrain.
• No Falling Injury Rolls.`,
    tags: ['flying', 'fly', 'air', 'terrain', 'ignore', 'no falling'],
  },
  // ── KEYWORDS ───────────────────────────────────────────────────
  {
    id: 'kw_armour_piercing',
    title: 'ARMOUR PIERCING',
    category: 'Keywords',
    body: `Reduce the target's total -INJURY MODIFIER from Armour and Shields by 1 (minimum 0).`,
    tags: ['armour piercing', 'ap', 'injury modifier', 'armour', 'shield'],
  },
  {
    id: 'kw_assault',
    title: 'ASSAULT',
    category: 'Keywords',
    body: `Ranged attacks with this weapon don't prevent Charging or Fighting in the same Activation.`,
    tags: ['assault', 'charge', 'shoot', 'same activation'],
  },
  {
    id: 'kw_automatic',
    title: 'AUTOMATIC (X)',
    category: 'Keywords',
    body: `Make X Ranged Attacks with one Shoot action. All targets must be within 6" of each other.`,
    tags: ['automatic', 'multiple shots', 'ranged', 'x attacks'],
  },
  {
    id: 'kw_blast',
    title: 'BLAST (X")',
    category: 'Keywords',
    body: `Hit all models within X" of the target with Line of Sight. Friendly models within 1" of hit enemies are also hit.

Miss → nothing happens (unless the weapon also has SCATTER).`,
    tags: ['blast', 'area', 'aoe', 'radius', 'friendly fire'],
  },
  {
    id: 'kw_block',
    title: 'BLOCK',
    category: 'Keywords',
    body: `-1 DICE to Melee Attacks from models that Charged this turn.`,
    tags: ['block', 'shield', 'charge', '-1 dice', 'melee defense'],
  },
  {
    id: 'kw_cleave',
    title: 'CLEAVE (X)',
    category: 'Keywords',
    body: `Make X Melee Attacks with one Fight action. Can target different enemies.`,
    tags: ['cleave', 'multiple attacks', 'melee', 'fight'],
  },
  {
    id: 'kw_critical',
    title: 'CRITICAL',
    category: 'Keywords',
    body: `+2 INJURY DICE on Critical Success (instead of the normal +1).`,
    tags: ['critical', '+2 injury dice', 'bonus'],
  },
  {
    id: 'kw_cumbersome',
    title: 'CUMBERSOME',
    category: 'Keywords',
    body: `Requires 2 hands even with STRONG. Can still be used with Shield Combo.`,
    tags: ['cumbersome', 'two-handed', 'strong', 'shield combo'],
  },
  {
    id: 'kw_deadly',
    title: 'DEADLY',
    category: 'Keywords',
    body: `Injury Roll uses 3D6 (add all 3 together). Pick the 3 highest or 3 lowest instead of 2 for +/- INJURY DICE.`,
    tags: ['deadly', '3d6', 'injury', 'powerful'],
  },
  {
    id: 'kw_fear',
    title: 'FEAR',
    category: 'Keywords',
    body: `-1 DICE to Melee Attacks targeting this model. If both models have FEAR, neither is affected.`,
    tags: ['fear', '-1 dice', 'melee', 'immune'],
  },
  {
    id: 'kw_fire',
    title: 'FIRE',
    category: 'Keywords',
    body: `After the Injury Roll, place 1 extra BLOOD MARKER on the target (even on a No Effect result).`,
    tags: ['fire', 'blood marker', 'extra', 'burn'],
  },
  {
    id: 'kw_flamethrower',
    title: 'FLAMETHROWER',
    category: 'Keywords',
    body: `The Ranged Attack is automatically a Success (no roll required). Cannot achieve a Critical Success.`,
    tags: ['flamethrower', 'auto hit', 'no roll', 'success'],
  },
  {
    id: 'kw_gas',
    title: 'GAS',
    category: 'Keywords',
    body: `After the Injury Roll, place 1 extra BLOOD MARKER on the target (even on a No Effect result).`,
    tags: ['gas', 'blood marker', 'extra', 'poison'],
  },
  {
    id: 'kw_heavy',
    title: 'HEAVY',
    category: 'Keywords',
    body: `• No Charge Bonus.
• Cannot make a Ranged Attack and Move/Charge/Retreat/Dash in the same Activation.
• Maximum of 1 HEAVY item per model.`,
    tags: ['heavy', 'charge', 'movement', 'restriction'],
  },
  {
    id: 'kw_ignore_armour',
    title: 'IGNORE ARMOUR',
    category: 'Keywords',
    body: `Ignore all -INJURY DICE and -INJURY MODIFIERS from Armour and Shields.`,
    tags: ['ignore armour', 'pierce', 'bypass', 'armor'],
  },
  {
    id: 'kw_pistol',
    title: 'PISTOL',
    category: 'Keywords',
    body: `Can be used as either a Ranged OR Melee weapon (both in the same Activation).

As Melee: use the weapon's Ranged or Melee Characteristic. Can be used as an Off-Hand weapon.`,
    tags: ['pistol', 'ranged', 'melee', 'dual', 'off-hand'],
  },
  {
    id: 'kw_reload',
    title: 'RELOAD',
    category: 'Keywords',
    body: `The model's Activation ends after the ACTION that included this attack.`,
    tags: ['reload', 'activation ends', 'slow'],
  },
  {
    id: 'kw_scatter',
    title: 'SCATTER',
    category: 'Keywords',
    body: `On a BLAST miss: scatter distance = 7 minus the Success Roll result.

Opponent moves the impact point that many inches in a direction of their choice (must have LoS to the original target).`,
    tags: ['scatter', 'blast', 'miss', 'deviate', 'opponent'],
  },
  {
    id: 'kw_shotgun',
    title: 'SHOTGUN',
    category: 'Keywords',
    body: `At Long Range: -1 INJURY DICE instead of the normal -1 DICE penalty.`,
    tags: ['shotgun', 'long range', '-1 injury dice'],
  },
  {
    id: 'kw_shrapnel',
    title: 'SHRAPNEL',
    category: 'Keywords',
    body: `After the Injury Roll, place 1 extra BLOOD MARKER on the target (even on a No Effect result).`,
    tags: ['shrapnel', 'blood marker', 'extra', 'fragment'],
  },
  {
    id: 'kw_skirmisher',
    title: 'SKIRMISHER',
    category: 'Keywords',
    body: `When targeted by a Charge, the model may evade D3" before the charge is resolved. Must end 1"+ from all enemies.

This may create an interposing model situation, forcing the charger to redirect.`,
    tags: ['skirmisher', 'evade', 'd3', 'charge', 'dodge'],
  },
  {
    id: 'kw_strong',
    title: 'STRONG',
    category: 'Keywords',
    body: `Negates HEAVY restrictions. Can use 1 two-handed Melee Weapon as one-handed.`,
    tags: ['strong', 'heavy', 'negate', 'one-handed'],
  },
  {
    id: 'kw_tough',
    title: 'TOUGH',
    category: 'Keywords',
    body: `The first Out of Action result is treated as Down instead.`,
    tags: ['tough', 'survive', 'out of action', 'down'],
  },
  {
    id: 'kw_golem',
    title: 'GOLEM',
    category: 'Keywords',
    body: `• Out of Action results become Down (unless from a Bloodbath Roll).
• Cannot remove own BLOOD MARKERS.
• Negates FEAR and GAS.
• Cannot have TOUGH.`,
    tags: ['golem', 'undying', 'blood markers', 'fear', 'gas', 'tough'],
  },
  // ── PROFILES & BATTLEKIT ───────────────────────────────────────
  {
    id: 'model_profiles',
    title: 'Model Profiles',
    category: 'Profiles & Battlekit',
    body: `Each model's profile includes:
• Movement: Distance in inches + base type (e.g., 6"/Infantry).
• Ranged: +/- DICE modifier to Ranged Attack Success Rolls.
• Melee: +/- DICE modifier to Melee Attack Success Rolls.
• Armour: -INJURY MODIFIER value.
• Base: Base size (e.g., 25mm).`,
    tags: ['profile', 'stats', 'movement', 'ranged', 'melee', 'armour', 'base'],
  },
  {
    id: 'battlekit_limits',
    title: 'Battlekit Limits',
    category: 'Profiles & Battlekit',
    body: `• 1× 2-Handed Ranged OR 2× 1-Handed Ranged
• 1× 2-Handed Melee OR 2× 1-Handed Melee
• 1× Grenade type
• 1× Armour
• 1× Shield (restricts to 1-Handed weapons only; no 2-Handed unless Shield Combo)
• Any number of unique Equipment/Special items`,
    tags: ['battlekit', 'loadout', 'limits', 'weapons', 'armour', 'shield', 'grenade'],
  },
  {
    id: 'warband_size',
    title: 'Warband Size',
    category: 'Profiles & Battlekit',
    body: `• Typical warband: 6–20 models.
• Recommended battlefield: 3'×3' or 4'×4' (minimum 24" between forces).`,
    tags: ['warband', 'size', 'models', 'battlefield', 'table'],
  },
  // ── PSYCHIC POWERS ─────────────────────────────────────────────
  {
    id: 'psychic_overview',
    title: 'Psychic Powers — Overview',
    category: 'Psychic Powers',
    body: `Psychic powers are special abilities that PSYKER models have access to. They are purchased like Battlekit and can be purchased after a model is recruited, but cannot be later sold.

To cast a psychic power, a model takes the Cast action (always a Risky Success Roll). The roll has the PSYCHIC Keyword, and the caster gains +DICE equal to its PSYKER X value.

A model can Cast multiple times per Activation, but each subsequent cast suffers a cumulative -1 DICE and PERILOUS ±1.

Note: Attacks with the PSYCHIC keyword (e.g. Force Weapons) are NOT psychic powers — they benefit from PSYKER X but are not subject to cumulative penalties or Deny the Witch.`,
    tags: ['psyker', 'cast', 'psychic', 'power', 'risky'],
  },
  {
    id: 'psychic_attack',
    title: 'Attack Powers',
    category: 'Psychic Powers',
    body: `Attack psychic powers function like weapons with the same kind of statistics but use the model's PSYKER X value for +DICE to Hit instead of Ranged or Melee Skill.

• They do not take up any hands.
• Rules that specify "weapon" rather than "attack" do not apply.
• Melee psychic powers cannot normally be used as or alongside off-hand attacks.
• Using an attack power counts as a normal Shoot or Fight in addition to Cast.`,
    tags: ['attack', 'psychic', 'weapon', 'shoot', 'fight'],
  },
  {
    id: 'psychic_effect',
    title: 'Effect Powers',
    category: 'Psychic Powers',
    body: `An Effect psychic power applies a benefit, penalty, or other effect on a successful roll. It includes:
• Keywords
• Range: Melee, X", or No Range
• Targets: Point, Self, One Ally, X Allies, One Enemy, X Enemies, No Targets, Each Model, Each Model Besides Self
• Duration: Immediate, End of Turn, Next Activation, Target Activation, End of Battle, or Special

Requires line of sight unless it has IGNORE LINE OF SIGHT.

Duration definitions:
• Immediate — Takes place and ends immediately.
• End of Turn — Lasts until the end of the current Turn.
• Next Activation — Lasts until the start of the caster's next Activation.
• Target Activation — Lasts until the end of the target's next Activation (each target tracked individually).
• End of Battle — Lasts until end of battle.
• Special — The power describes its own duration.`,
    tags: ['effect', 'psychic', 'duration', 'target', 'range'],
  },
  {
    id: 'deny_the_witch',
    title: 'Deny the Witch',
    category: 'Psychic Powers',
    body: `When an enemy model uses a psychic power, before they roll, if one of your PSYKER models is within 12" and can see the enemy, your model can attempt to cancel the power.

Your model makes a Success Roll (+DICE equal to its PSYKER X), then the opponent rolls normally.

• If your result ≥ opponent's result → the power automatically fails (can still cause Perils).
• If your result < opponent's result or you fail → the power is used as normal.

Denying counts as a psychic power for cumulative penalty purposes and is subject to Perils.
A PSYKER can Deny the Witch only once per Turn.`,
    tags: ['deny', 'witch', 'psychic', 'counter', 'psyker'],
  },
  // ── PERILS OF THE WARP ─────────────────────────────────────────
  {
    id: 'perils_overview',
    title: 'Perils of the Warp — When it Triggers',
    category: 'Perils of the Warp',
    body: `Whenever a model uses a psychic power, if any Success Roll made as part of that power is a 2 or a 12, the model suffers Perils of the Warp after the power's effects.

The PERILOUS ±X keyword widens the trigger range. For example, PERILOUS ±2 triggers on 2–4 and 10–12. PERILOUS always stacks with itself.`,
    tags: ['perils', 'warp', 'trigger', 'perilous'],
  },
  {
    id: 'perils_table',
    title: 'Perils of the Warp — Table (D6)',
    category: 'Perils of the Warp',
    body: `Roll D6:

1. Dragged Into the Warp — The caster makes a Success Roll with -1 DICE per psychic power used this Turn (including this one). Failure → Out of Action. Success → D3 BLOOD MARKERS.

2. Mental Purge — 1 STUN MARKER. Cannot use the triggering power for the rest of the battle.

3. Power Drain — The caster and each other PSYKER within 12" gain D3 STUN MARKERS each (roll once, use for all).

4. Psychic Backlash — Roll on the Injury chart with IGNORE ARMOUR.

5. Empyric Feedback — 1 BLOOD MARKER.

6. Warp Surge — +1 DICE to all PSYCHIC Success Rolls for the rest of the battle, but powers have PERILOUS ±2. If rolled again, treated as Dragged Into the Warp.`,
    tags: ['perils', 'warp', 'table', 'dragged', 'mental', 'power drain', 'backlash', 'feedback', 'surge'],
  },
  // ── MARKERS ────────────────────────────────────────────────────
  {
    id: 'stun_markers',
    title: 'STUN MARKERS',
    category: 'Markers',
    body: `STUN MARKERS function almost identically to BLOOD MARKERS, except:
• You CANNOT spend them to add +DICE to Injury rolls or cause a Blood Bath.
• You CAN spend them to apply -DICE to Success Rolls (same as BLOOD/INFECTION MARKERS).

A model can have up to 6 STUN MARKERS in addition to any BLOOD or INFECTION MARKERS.

When an effect allows you to remove BLOOD MARKERS, you can remove STUN MARKERS instead, or a mix of both.

Stunlock: When an enemy model activates, you can spend 6 of its STUN MARKERS to Stunlock it — the model falls Down and its Activation ends immediately. If the model is already Down, you can spend 3 STUN MARKERS instead and it remains Down.`,
    tags: ['stun', 'marker', 'stunlock', 'blood', 'down'],
  },
  {
    id: 'blood_markers',
    title: 'BLOOD MARKERS',
    category: 'Markers',
    body: `BLOOD MARKERS are placed on models that suffer injuries. Each can be:
• Spent as -1 DICE for any Action the wounded model takes.
• Spent as +1 DICE when rolling injuries against this model.
• Used to trigger a Blood Bath (6 BLOOD MARKERS → automatic Out of Action).

A model can have up to 6 BLOOD MARKERS.`,
    tags: ['blood', 'marker', 'injury', 'action', 'blood bath'],
  },
  {
    id: 'infection_markers',
    title: 'INFECTION MARKERS',
    category: 'Markers',
    body: `INFECTION MARKERS work like BLOOD MARKERS for all modifier purposes (-DICE to Actions, +DICE to Injury Rolls, can be used in Blood Baths).

A model may have up to 6 INFECTION MARKERS and 6 BLOOD MARKERS simultaneously.

Key difference: If a model activates with 1+ INFECTION MARKERS, it gains +1 INFECTION MARKER (to a max of 6).`,
    tags: ['infection', 'marker', 'blood', 'spreading'],
  },
  {
    id: 'blessing_markers',
    title: 'BLESSING MARKERS',
    category: 'Markers',
    body: `A supernatural or chemical enhancement. Each can be:
• Converted to +1 DICE for any Action the model takes.
• Converted to -1 DICE when rolling injuries against this model.

Granted by the BLESSED (X) keyword when the model is first deployed.`,
    tags: ['blessing', 'marker', 'dice', 'buff'],
  },
  // ── DEPLOYMENT ─────────────────────────────────────────────────
  {
    id: 'deep_strike',
    title: 'DEEP STRIKE',
    category: 'Deployment',
    body: `Models with DEEP STRIKE are kept off the battlefield initially but still count for activation order and morale.

At the start of any turn after the first (if you have ≥1 other model on the table), you can place them anywhere at least 8" from the closest enemy, or anywhere in your deployment zone not in close combat.

After placement, your opponent adjusts the model D3" horizontally in any direction (cannot end in Impassable Terrain).

During its first Turn on the table, a Deep Striking model cannot take mission-specific Actions, interact with mission objects, leave the battlefield, or count for scoring (except by opponent).

If both players have DEEP STRIKE models, alternate placing, starting with the player with more total models. If a player passes, they cannot place more that Turn.`,
    tags: ['deep strike', 'deploy', 'reserve', 'placement'],
  },
  {
    id: 'deep_strike_tunnel',
    title: 'DEEP STRIKE (TUNNEL)',
    category: 'Deployment',
    body: `Functions as DEEP STRIKE, but the model cannot be placed on overhanging terrain or on top of buildings with interiors. It must emerge from the ground.`,
    tags: ['deep strike', 'tunnel', 'deploy', 'burrow'],
  },
  {
    id: 'infiltrator',
    title: 'INFILTRATOR',
    category: 'Deployment',
    body: `When deployed for the first time, an INFILTRATOR can be set up anywhere on the battlefield as long as it is:
• Out of Line of Sight of all enemies
• At least 8" from the closest enemy

Infiltrators deploy after non-Infiltrators. Any that cannot be placed legally are deployed normally in their deployment zone.`,
    tags: ['infiltrator', 'deploy', 'setup', 'stealth'],
  },
  // ── COMBAT ─────────────────────────────────────────────────────
  {
    id: 'sweeping',
    title: 'SWEEPING Weapons',
    category: 'Combat',
    body: `When a model armed with a SWEEPING weapon takes a Fight Action, it can make 1 Melee Attack against each enemy model within 1". Resolve each attack one at a time in any order.`,
    tags: ['sweeping', 'melee', 'fight', 'area'],
  },
  {
    id: 'vicious',
    title: 'VICIOUS X',
    category: 'Combat',
    body: `A weapon with VICIOUS X scores a Critical Hit on any roll of X or higher, if it otherwise would hit.`,
    tags: ['vicious', 'critical', 'hit'],
  },
  {
    id: 'whip',
    title: 'WHIP X"',
    category: 'Combat',
    body: `A melee weapon with WHIP X" can make a ranged attack at X" range with IGNORE LONG RANGE, using the model's Melee Skill. It still counts as a melee weapon for hand requirements.`,
    tags: ['whip', 'melee', 'range'],
  },
  {
    id: 'nonlethal',
    title: 'NONLETHAL',
    category: 'Combat',
    body: `Injury rolls caused by this weapon treat Out of Action results as Down results instead.`,
    tags: ['nonlethal', 'down', 'injury'],
  },
  // ── CAMPAIGN ───────────────────────────────────────────────────
  {
    id: 'campaign_overview',
    title: 'Campaign Structure',
    category: 'Campaign',
    body: `A Trench Hammer campaign is played over up to 12 games, divided into brackets:

• Games 1–3 (Early): 3 Exploration Dice, Common table only
• Games 4–8 (Mid): 4 Exploration Dice, Common + Rare tables
• Games 9–11 (Late): 5 Exploration Dice, Rare + Legendary tables
• Game 12 (Finale): 5 Exploration Dice, Rare + Legendary tables

After each game, players go through the Post-Battle Sequence: injuries, XP, exploration, income, then the Quartermaster step.`,
    tags: ['campaign', 'bracket', 'game', 'structure', 'overview'],
  },
  {
    id: 'exploration',
    title: 'Exploration',
    category: 'Campaign',
    body: `After each battle, you roll Exploration Dice to discover locations.

Dice count: 3 (games 1–3), 4 (games 4–8), 5 (games 9+).

You choose which Exploration Table to roll on based on your game number:
• Games 1–3: Common only
• Games 4–8: Common or Rare
• Games 9+: Rare or Legendary

Assign your dice to tables, then sum the dice assigned to each table to find the location. If the total matches or exceeds a location's result number, you explore it. If not, nothing is found on that table.

Some locations have faction-specific choices in addition to universal choices.`,
    tags: ['exploration', 'dice', 'location', 'table', 'common', 'rare', 'legendary'],
  },
  {
    id: 'exploration_skills',
    title: 'Exploration Skills',
    category: 'Campaign',
    body: `Your Warband can earn Exploration Skills from locations that modify your exploration rolls:

• Careful — Roll 1 fewer Exploration Die (minimum 1).
• Circle Back — Modify one die result by -1.
• Duplicate — Copy one die's result to an additional die.
• Extra Dice — Roll 1 extra Exploration Die.
• Lucky — Roll an extra paired die; keep one, discard the other.
• Reroll — Reroll any single die once.
• Seek — Modify one die result by +1.
• Set Dice — Before rolling, set one die to any number.

Skills are permanent unless noted otherwise.`,
    tags: ['exploration', 'skill', 'dice', 'careful', 'lucky', 'reroll', 'seek'],
  },
  {
    id: 'mercenaries_campaign',
    title: 'Mercenaries in Campaign',
    category: 'Campaign',
    body: `Faction rules DO apply to mercenaries unless otherwise specified, though not if that rule specifies a Keyword a mercenary does not have.

Mercenaries can be recruited during the Quartermaster step and may have Glory costs. Some exploration locations allow recruiting mercenaries at reduced cost.`,
    tags: ['mercenary', 'campaign', 'faction', 'keyword'],
  },
  {
    id: 'shop_contacts',
    title: 'Campaign Shop Contacts',
    category: 'Campaign',
    body: `Exploration locations can establish Shop Contacts, which allow you to purchase battlekit from your Campaign Shop during the Trade step:

• Supplier (Common table): Up to 3 Glory cost
• Black Market (Rare table): Up to 7 Glory cost
• Secret Dealer (Legendary table): Any Glory cost

Once established, these contacts persist for the remainder of the campaign.`,
    tags: ['shop', 'contact', 'trade', 'glory', 'battlekit', 'campaign'],
  },
];

/** Search rules entries by query string (case-insensitive, matches title, body, and tags). */
export function searchRules(query: string): RulesEntry[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return RULES_ENTRIES;
  return RULES_ENTRIES.filter(e =>
    e.title.toLowerCase().includes(lower) ||
    e.body.toLowerCase().includes(lower) ||
    e.tags.some(t => t.includes(lower))
  );
}

/** Get rules entries by category. */
export function getRulesByCategory(category: string): RulesEntry[] {
  return RULES_ENTRIES.filter(e => e.category === category);
}
