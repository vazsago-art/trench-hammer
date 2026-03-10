import { GiftOfChaos } from '../types/index.js';

/**
 * Gifts of Chaos — Chaos Cult faction special upgrade table.
 * During a one-off battle each can be purchased for 10 credits up to the model's maximum.
 * Campaign: earned via Accursed Gifts special rule (free, 10 credits added to model cost).
 *
 * D66 table — each entry has a diceResult label matching the rules text.
 */
export const GIFTS_OF_CHAOS: GiftOfChaos[] = [
  {
    id: 'gift_11_12_spawnhood',
    diceResult: '11–12',
    name: 'Spawnhood',
    description:
      'Replace the model with a Chaos Spawn. It retains all of its Gifts of Chaos (including this one and costs), but replaces all other statistics. Any armour it was wearing is destroyed. If it was ELITE, it retains any skills it had, but cannot earn XP. Reroll if it is already a Chaos Spawn, or it is gaining this as it is recruited.',
    cost: 10,
  },
  {
    id: 'gift_13_camouflage',
    diceResult: '13',
    name: 'Camouflage',
    description: 'The model gains the STEALTH Keyword.',
    cost: 10,
    grantedKeywords: ['STEALTH'],
  },
  {
    id: 'gift_14_strange_mobility',
    diceResult: '14',
    name: 'Strange Mobility',
    description: 'The model gains the SKIRMISHER Keyword.',
    cost: 10,
    grantedKeywords: ['SKIRMISHER'],
  },
  {
    id: 'gift_15_beastial',
    diceResult: '15',
    name: 'Beastial',
    description:
      'The model gains the BEASTMEN Keyword and the Frenzy ability: When the Bestial model is taken Out of Action, before removing it from the table, it can make a single melee attack against an enemy it is in close combat with. BLOOD MARKERS cannot be spent on this attack\'s Success Roll.',
    cost: 10,
    grantedKeywords: ['BEASTMEN'],
  },
  {
    id: 'gift_16_extra_arm',
    diceResult: '16',
    name: 'Extra Arm',
    description:
      'The model gains an extra arm, which can carry melee and ranged weapons as normal. It can make an additional attack with any weapon in that arm without off-hand penalties. If it cannot normally be equipped, it can be equipped with weapons, a shield, or any battlekit that takes a single hand.',
    cost: 10,
  },
  {
    id: 'gift_21_horns_of_the_beast',
    diceResult: '21',
    name: 'Horns of the Beast',
    description:
      'When the model successfully Charges one or more enemies, one of them gets a BLOOD MARKER.',
    cost: 10,
  },
  {
    id: 'gift_22_barbs_of_hatred',
    diceResult: '22',
    name: 'Barbs of Hatred',
    description:
      'Whenever an enemy causes this model to suffer 1 or more BLOOD MARKERS in melee, that enemy also suffers 1 BLOOD MARKER.',
    cost: 10,
  },
  {
    id: 'gift_23_warp_frenzy',
    diceResult: '23',
    name: 'Warp Frenzy',
    description:
      'The model can make one additional melee attack with a single weapon when it takes the Fight Action, at −1 DICE to Hit, or −2 DICE to Hit if it is a TWO-HANDED weapon (even if wielded in one hand).',
    cost: 10,
  },
  {
    id: 'gift_24_twisted_wings',
    diceResult: '24',
    name: 'Twisted Wings',
    description: 'The model gains the FLYING Keyword.',
    cost: 10,
    grantedKeywords: ['FLYING'],
  },
  {
    id: 'gift_25_strength_of_the_berzerker',
    diceResult: '25',
    name: 'Strength of the Berzerker',
    description:
      'The model gains the STRONG Keyword. If the model was already STRONG, it instead gains +1 INJURY DICE with all melee attacks.',
    cost: 10,
    grantedKeywords: ['STRONG'],
  },
  {
    id: 'gift_26_arcane_occulum',
    diceResult: '26',
    name: 'Arcane Occulum',
    description: 'The model gains +1 to its Ranged Skill.',
    cost: 10,
    statModifiers: { rangedSkill: 1 },
  },
  {
    id: 'gift_31_cerebral_cogitator',
    diceResult: '31',
    name: 'Cerebral Cogitator',
    description:
      'The model can form a FIRETEAM with one other friendly model. It can change which model between battles.',
    cost: 10,
  },
  {
    id: 'gift_32_bloated',
    diceResult: '32',
    name: 'Bloated',
    description:
      'The model gains the LARGE keyword and treats Down results as Minor Hits (does not affect Down results that replace Out of Action via TOUGH Keyword).',
    cost: 10,
    grantedKeywords: ['LARGE'],
  },
  {
    id: 'gift_33_crystalline_body',
    diceResult: '33',
    name: 'Crystalline Body',
    description:
      'The model has −1 to Injury rolls against it, to a maximum of −3 when combined with armour and shields.',
    cost: 10,
  },
  {
    id: 'gift_34_shield_of_force',
    diceResult: '34',
    name: 'Shield of Force',
    description: 'Ranged attacks against the model have −1 DICE to Hit.',
    cost: 10,
  },
  {
    id: 'gift_35_mechanoid',
    diceResult: '35',
    name: 'Mechanoid',
    description: 'The model gains the ARTIFICIAL and NEGATE GAS Keywords.',
    cost: 10,
    grantedKeywords: ['ARTIFICIAL', 'NEGATE GAS'],
  },
  {
    id: 'gift_36_blade_of_chaos',
    diceResult: '36',
    name: 'Blade of Chaos',
    description:
      'Choose one melee weapon the model is equipped with, or the next such weapon equipped by it if it has none. That weapon is fused into it and cannot be removed, becomes HELD, and has +1 DICE to Hit and +1 INJURY DICE.',
    cost: 10,
  },
  {
    id: 'gift_41_witch_eater',
    diceResult: '41',
    name: 'Witch-Eater',
    description:
      'Injury rolls with the PSYCHIC or IGNORE ARMOUR Keyword have −1 INJURY DICE against the model. In addition, it can Deny the Witch as if it had PSYKER 1.',
    cost: 10,
  },
  {
    id: 'gift_42_cosmic_fate',
    diceResult: '42',
    name: 'Cosmic Fate',
    description:
      'At the start of each battle, or when this Gift of Chaos is gained, the model gains 1 BLESSING MARKER.',
    cost: 10,
  },
  {
    id: 'gift_43_venomous',
    diceResult: '43',
    name: 'Venomous',
    description: "The model's melee attacks gain the GAS Keyword.",
    cost: 10,
  },
  {
    id: 'gift_44_unholy_crusader',
    diceResult: '44',
    name: 'Unholy Crusader',
    description: 'The model has +1 DICE on all DASH Success Rolls.',
    cost: 10,
  },
  {
    id: 'gift_45_meteoric_charge',
    diceResult: '45',
    name: 'Meteoric Charge',
    description:
      'When the model Charges, roll 2D6 instead of 1D6 and then add the highest of the two dice to its charge move.',
    cost: 10,
  },
  {
    id: 'gift_46_icy_aura',
    diceResult: '46',
    name: 'Icy Aura',
    description:
      "At the end of the model's Activation, each enemy in close combat with it suffers 1 BLOOD MARKER.",
    cost: 10,
  },
  {
    id: 'gift_51_mind_of_chaos',
    diceResult: '51',
    name: 'Mind of Chaos',
    description:
      'The model gains the PSYKER 1 Keyword. Roll a D6: On a 1–3, randomly select one Shared Discipline — the model can purchase up to three powers from that discipline. On a 4–6 it can purchase up to three powers from the Hereticus Discipline. If it already had the PSYKER Keyword, instead increase the X value of its PSYKER Keyword by 1.',
    cost: 10,
    grantedKeywords: ['PSYKER 1'],
  },
  {
    id: 'gift_52_gun_morph',
    diceResult: '52',
    name: 'Gun Morph',
    description:
      'Choose one non-Grenade ranged weapon the model is equipped with, or the next such weapon equipped by it if it has none. That weapon is fused into it and cannot be removed, becomes HELD, and has +1 DICE to Hit and +1 INJURY DICE.',
    cost: 10,
  },
  {
    id: 'gift_53_all_consuming_hatred',
    diceResult: '53',
    name: 'All-Consuming Hatred',
    description:
      'The model gains the FEAR keyword. If it already has FEAR, instead your opponent has −1 DICE to Morale tests while this model is not Down or Out of Action.',
    cost: 10,
    grantedKeywords: ['FEAR'],
  },
  {
    id: 'gift_54_warp_claws',
    diceResult: '54',
    name: 'Warp Claws',
    description:
      'The model gains two Warp Claw weapons, which are melee weapons that cannot be removed. It can still carry other melee weapons, but loses access to Warp Claws in hands that are holding another melee weapon. Warp Claw: Melee, IGNORE OFF-HAND, CRITICAL.',
    cost: 10,
  },
  {
    id: 'gift_55_lifetaker',
    diceResult: '55',
    name: 'Lifetaker',
    description: 'When the model takes an enemy Out of Action in melee, remove 1 BLOOD MARKER from it.',
    cost: 10,
  },
  {
    id: 'gift_56_blademaster',
    diceResult: '56',
    name: 'Blademaster',
    description: 'The model gains +1 to its Melee Skill.',
    cost: 10,
    statModifiers: { meleeSkill: 1 },
  },
  {
    id: 'gift_61_extra_legs',
    diceResult: '61',
    name: 'Extra Legs',
    description: 'The model cannot be forced to move by any effect an enemy model causes.',
    cost: 10,
  },
  {
    id: 'gift_62_temporal_distortion',
    diceResult: '62',
    name: 'Temporal Distortion',
    description: 'The model has +2" movement speed.',
    cost: 10,
    statModifiers: { movement: 2 },
  },
  {
    id: 'gift_63_masochism',
    diceResult: '63',
    name: 'Masochism',
    description: 'Injury rolls against the model have −1 DICE.',
    cost: 10,
  },
  {
    id: 'gift_64_daemon_skin',
    diceResult: '64',
    name: 'Daemon Skin',
    description: 'The model gains NEGATE FIRE.',
    cost: 10,
    grantedKeywords: ['NEGATE FIRE'],
  },
  {
    id: 'gift_65_fragment_of_immortality',
    diceResult: '65',
    name: 'Fragment of Immortality',
    description:
      'The model gains the TOUGH Keyword. If it already had TOUGH, then instead the model does not fall Down or suffer the normal BLOOD MARKER when it uses its TOUGH Keyword.',
    cost: 10,
    grantedKeywords: ['TOUGH'],
  },
  {
    id: 'gift_66_dark_apotheosis',
    diceResult: '66',
    name: 'Dark Apotheosis',
    description:
      'If the model is not ELITE, and it is eligible for promotion, it immediately becomes ELITE. Then, whether or not it became ELITE, roll for another Gift of Chaos at no additional cost. If the model is already ELITE, replace it with a Daemon Prince. Reroll if it is already a Daemon Prince or is gaining a Gift of Chaos at recruitment.',
    cost: 10,
  },
];