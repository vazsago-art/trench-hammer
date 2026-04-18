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
  'Psychic Powers',
  'Markers',
  'Deployment',
  'Campaign',
  'Combat',
  'Perils of the Warp',
] as const;

export type RulesCategory = typeof RULES_CATEGORIES[number];

export const RULES_ENTRIES: RulesEntry[] = [
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
