import { Ability } from '../types/index.js';

/**
 * Lookup map: unitId → Ability[]
 * Applied to all faction units at runtime via applyAbilities() in factions_complete.ts
 */
export const unitAbilitiesMap: Record<string, Ability[]> = {

  // ========================================================================
  // ADEPTUS ASTARTES / GREY KNIGHTS (shared ability definitions)
  // ========================================================================
  aa_captain: [
    { id: 'aa_captain_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'aa_captain_finest_hour', name: 'Finest Hour', description: 'Once per battle, make one additional melee attack when taking the Fight Action.', type: 'passive' },
  ],
  aa_apothecary: [
    { id: 'aa_apothecary_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'aa_apothecary_narthecium_healing', name: 'Narthecium Healing', description: 'Action +1 DICE — heal self or ASTARTES ally within 1", remove 1 BLOOD MARKER (3 on critical).', type: 'action' },
  ],
  aa_chaplain: [
    { id: 'aa_chaplain_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'aa_chaplain_spiritual_leader', name: 'Spiritual Leader', description: 'Risky Action with Success Roll — self or ASTARTES ally within 6" gains 1 BLESSING MARKER.', type: 'action' },
  ],
  aa_librarian: [
    { id: 'aa_librarian_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
  ],
  aa_scout_marine: [
    { id: 'aa_scout_marine_initiate', name: 'Initiate', description: 'After 2+ missions, or achieving a Glorious Deed or taking an Elite Out of Action, can be upgraded to Space Marine.', type: 'passive' },
  ],
  aa_space_marine: [
    { id: 'aa_space_marine_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
  ],
  aa_terminator: [
    { id: 'aa_terminator_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'aa_terminator_terminator_armour', name: 'Terminator Armour', description: 'Rolls only D3 for extra charge distance instead of D6.', type: 'passive' },
  ],
  aa_dreadnought: [
    { id: 'aa_dreadnought_dreadnought_armaments', name: 'Dreadnought Armaments', description: 'While equipped with two ranged weapons, can Shoot with both during Activation.', type: 'passive' },
    { id: 'aa_dreadnought_wisdom_of_the_ancients', name: 'Wisdom of the Ancients', description: 'Friendly ASTARTES within 3" have +1 DICE to Hit with all attacks.', type: 'aura' },
  ],

  // Grey Knights (same abilities, different IDs)
  gk_captain: [
    { id: 'gk_captain_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'gk_captain_finest_hour', name: 'Finest Hour', description: 'Once per battle, make one additional melee attack when taking the Fight Action.', type: 'passive' },
  ],
  gk_apothecary: [
    { id: 'gk_apothecary_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'gk_apothecary_narthecium_healing', name: 'Narthecium Healing', description: 'Action +1 DICE — heal self or ASTARTES ally within 1", remove 1 BLOOD MARKER (3 on critical).', type: 'action' },
  ],
  gk_chaplain: [
    { id: 'gk_chaplain_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'gk_chaplain_spiritual_leader', name: 'Spiritual Leader', description: 'Risky Action with Success Roll — self or ASTARTES ally within 6" gains 1 BLESSING MARKER.', type: 'action' },
  ],
  gk_librarian: [
    { id: 'gk_librarian_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
  ],
  gk_scout_marine: [
    { id: 'gk_scout_marine_initiate', name: 'Initiate', description: 'After 2+ missions, or achieving a Glorious Deed or taking an Elite Out of Action, can be upgraded to Space Marine.', type: 'passive' },
  ],
  gk_space_marine: [
    { id: 'gk_space_marine_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
  ],
  gk_terminator: [
    { id: 'gk_terminator_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'gk_terminator_terminator_armour', name: 'Terminator Armour', description: 'Rolls only D3 for extra charge distance instead of D6.', type: 'passive' },
  ],
  gk_dreadnought: [
    { id: 'gk_dreadnought_dreadnought_armaments', name: 'Dreadnought Armaments', description: 'While equipped with two ranged weapons, can Shoot with both during Activation.', type: 'passive' },
    { id: 'gk_dreadnought_wisdom_of_the_ancients', name: 'Wisdom of the Ancients', description: 'Friendly ASTARTES within 3" have +1 DICE to Hit with all attacks.', type: 'aura' },
  ],

  // ========================================================================
  // ADEPTUS CUSTODES
  // ========================================================================
  ac_shield_captain: [
    { id: 'ac_shield_captain_aegis_of_the_emperor', name: 'Aegis of the Emperor', description: 'Out of Action results become Down unless caused by Bloodbath; BLOOD MARKERs are only removable via Amelioration Pail.', type: 'passive' },
    { id: 'ac_shield_captain_master_of_stances', name: 'Master of Stances', description: 'Choose ARMOUR PIERCING 1 or CRITICAL on each melee attack before rolling.', type: 'passive' },
    { id: 'ac_shield_captain_stand_vigil', name: 'Stand Vigil', description: 'Down results become Minor Hits.', type: 'passive' },
    { id: 'ac_shield_captain_strategic_mastery', name: 'Strategic Mastery', description: 'No roll — choose any model that has not yet activated; end own Activation and begin that model\'s Activation immediately.', type: 'action' },
  ],
  ac_blade_champion: [
    { id: 'ac_blade_champion_aegis_of_the_emperor', name: 'Aegis of the Emperor', description: 'Out of Action results become Down unless caused by Bloodbath; BLOOD MARKERs are only removable via Amelioration Pail.', type: 'passive' },
    { id: 'ac_blade_champion_martial_inspiration', name: 'Martial Inspiration', description: 'Self and allies within 3" have CRITICAL on melee attacks.', type: 'aura' },
    { id: 'ac_blade_champion_stand_vigil', name: 'Stand Vigil', description: 'Down results become Minor Hits.', type: 'passive' },
    { id: 'ac_blade_champion_swift_onslaught', name: 'Swift Onslaught', description: 'When Charging, roll 2D6 and take the highest result.', type: 'passive' },
  ],
  ac_knight_centura: [
    { id: 'ac_knight_centura_corner_the_quarry', name: 'Corner the Quarry', description: 'Enemies in melee with this model cannot Retreat.', type: 'passive' },
    { id: 'ac_knight_centura_daughter_of_the_abyss', name: 'Daughter of the Abyss', description: 'PSYCHIC and IGNORE ARMOUR injury rolls made against this model have -1 INJURY DICE.', type: 'passive' },
    { id: 'ac_knight_centura_deny_the_witch', name: 'Deny the Witch', description: 'Can attempt to Deny the Witch as if PSYKER 1.', type: 'passive' },
    { id: 'ac_knight_centura_seekers_instincts', name: "Seeker's Instincts", description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
  ],
  ac_anathema_psykana: [
    { id: 'ac_anathema_psykana_daughter_of_the_abyss', name: 'Daughter of the Abyss', description: 'PSYCHIC and IGNORE ARMOUR injury rolls made against this model have -1 INJURY DICE.', type: 'passive' },
    { id: 'ac_anathema_psykana_deft_parry', name: 'Deft Parry', description: 'Melee attacks against this model have -1 DICE to Hit.', type: 'passive' },
  ],
  ac_custodian_guard: [
    { id: 'ac_custodian_guard_aegis_of_the_emperor', name: 'Aegis of the Emperor', description: 'Out of Action results become Down unless caused by Bloodbath; BLOOD MARKERs are only removable via Amelioration Pail.', type: 'passive' },
    { id: 'ac_custodian_guard_stand_vigil', name: 'Stand Vigil', description: 'Down results become Minor Hits.', type: 'passive' },
  ],
  ac_aquilon_terminator: [
    { id: 'ac_aquilon_terminator_aegis_of_the_emperor', name: 'Aegis of the Emperor', description: 'Out of Action results become Down unless caused by Bloodbath; BLOOD MARKERs are only removable via Amelioration Pail.', type: 'passive' },
    { id: 'ac_aquilon_terminator_stand_vigil', name: 'Stand Vigil', description: 'Down results become Minor Hits.', type: 'passive' },
  ],
  ac_contemptor_dreadnought: [
    { id: 'ac_contemptor_dreadnought_dread_foe', name: 'Dread Foe', description: 'When successfully Charges one or more enemies, those models must immediately roll on the Injury table.', type: 'passive' },
    { id: 'ac_contemptor_dreadnought_dreadnought_armaments', name: 'Dreadnought Armaments', description: 'While equipped with two ranged weapons, can Shoot with both during Activation.', type: 'passive' },
    { id: 'ac_contemptor_dreadnought_unyielding_ancient', name: 'Unyielding Ancient', description: 'All injury rolls made against this model have -1 INJURY DICE.', type: 'passive' },
  ],

  // ========================================================================
  // ADEPTA SORORITAS
  // ========================================================================
  as_canoness: [
    { id: 'as_canoness_acts_of_faith', name: 'Acts of Faith', description: 'First time per Turn taking an enemy Out of Action, gain 1 Miracle.', type: 'passive' },
    { id: 'as_canoness_the_emperors_grace', name: "The Emperor's Grace", description: 'Once per battle, when taken Out of Action, treat the result as No Effect instead.', type: 'passive' },
    { id: 'as_canoness_the_passion', name: 'The Passion', description: 'Other friendly SORORITAS within 6" have +1 DICE to Hit with melee attacks.', type: 'aura' },
  ],
  as_dogmata: [
    { id: 'as_dogmata_hand_of_the_emperor', name: 'Hand of the Emperor', description: 'Risky Success Roll — gain 1 Miracle on success.', type: 'action' },
    { id: 'as_dogmata_unflinching_determination', name: 'Unflinching Determination', description: 'Friendly models within 6" gain NEGATE FEAR (or +1 DICE to Hit vs FEAR targets if they already have NEGATE FEAR).', type: 'aura' },
  ],
  as_palatine: [
    { id: 'as_palatine_fury_of_the_righteous', name: 'Fury of the Righteous', description: 'Self and allies within 6" have VICIOUS 11 with all attacks (or VICIOUS 10 if already VICIOUS 11).', type: 'aura' },
    { id: 'as_palatine_rapturous_blows', name: 'Rapturous Blows', description: 'On a melee hit, spend 1 Miracle to grant +1 INJURY DICE and an additional BLOOD MARKER.', type: 'passive' },
  ],
  as_novitiate: [
    { id: 'as_novitiate_impetuous_fervor', name: 'Impetuous Fervor', description: 'When Charging, roll 2D6 and add the highest result to the charge move.', type: 'passive' },
  ],
  as_battle_sister: [
    { id: 'as_battle_sister_penitence_of_cowardice', name: 'Penitence of Cowardice', description: 'After failing a Morale test during a battle, up to 2 Battle Sisters can be demoted to Repentia at battle end.', type: 'passive' },
  ],
  as_repentia: [
    { id: 'as_repentia_armour_of_faith', name: 'Armour of Faith', description: 'All injury rolls made against this model have -1 INJURY DICE.', type: 'passive' },
    { id: 'as_repentia_penitent_frenzy', name: 'Penitent Frenzy', description: 'Can ignore the HEAVY Keyword of one melee weapon.', type: 'passive' },
    { id: 'as_repentia_repentance', name: 'Repentance', description: 'If achieves a Glorious Deed or takes an Elite Out of Action, can be upgraded to Battle Sister.', type: 'passive' },
    { id: 'as_repentia_unfettered_movement', name: 'Unfettered Movement', description: '+1 DICE to all Climb, Dash, Jump, and Diving Charge rolls.', type: 'passive' },
  ],
  as_penitent_engine: [
    { id: 'as_penitent_engine_endless_suffering', name: 'Endless Suffering', description: '+1 DICE to Dash Success Rolls.', type: 'passive' },
    { id: 'as_penitent_engine_pay_penance', name: 'Pay Penance', description: 'When taken Out of Action or when TOUGH prevents Out of Action, give 1 BLESSING MARKER to another friendly SORORITAS model.', type: 'passive' },
  ],

  // ========================================================================
  // ADEPTUS MECHANICUS
  // ========================================================================
  amec_dominus: [
    { id: 'amec_dominus_lord_of_the_machine_cult', name: 'Lord of the Machine Cult', description: 'Action +1 DICE — change the current active Canticle on a success.', type: 'action' },
    { id: 'amec_dominus_mechadendrites', name: 'Mechadendrites', description: 'Counts as an extra hand for melee and ranged; can attack with an additional weapon without off-hand penalty.', type: 'passive' },
  ],
  amec_skitarii_marshal: [
    { id: 'amec_skitarii_marshal_data_uplink', name: 'Data Uplink', description: 'Success Roll — one Down friendly model stands up.', type: 'action' },
  ],
  amec_tech_priest: [
    { id: 'amec_tech_priest_mechadendrites', name: 'Mechadendrites', description: 'Counts as an extra hand for melee and ranged combat.', type: 'passive' },
  ],
  amec_servitor: [
    { id: 'amec_servitor_expendable', name: 'Expendable', description: 'Not counted for Morale.', type: 'passive' },
    { id: 'amec_servitor_mindlock', name: 'Mindlock', description: 'While within 6" of a CONTROLLER ally, gains +1 DICE to Hit.', type: 'passive' },
    { id: 'amec_servitor_painless', name: 'Painless', description: 'All injury rolls made against this model have -1 DICE.', type: 'passive' },
    { id: 'amec_servitor_property', name: 'Property', description: 'Can be sold for its full credit value between battles.', type: 'passive' },
  ],
  amec_electro_priest: [
    { id: 'amec_electro_priest_electro_shock', name: 'Electro-Shock', description: 'On a successful Charge, the target enemy suffers a STUN MARKER.', type: 'passive' },
    { id: 'amec_electro_priest_fanatical_devotion', name: 'Fanatical Devotion', description: 'All injury rolls made against this model have -1 DICE.', type: 'passive' },
  ],
  amec_kastelan_robot: [
    { id: 'amec_kastelan_robot_kastelen_armaments', name: 'Kastelen Armaments', description: 'While equipped with two ranged weapons, can Shoot with both during Activation.', type: 'passive' },
    { id: 'amec_kastelan_robot_repulsor_grid', name: 'Repulsor Grid', description: 'Self and ADEPTUS MECHANICUS allies within 3" treat Down results as Minor Hits.', type: 'aura' },
    { id: 'amec_kastelan_robot_robotic_bodyguard', name: 'Robotic Bodyguard', description: 'Can redirect any hit on an ally within 1" to itself (excluding BLAST attacks).', type: 'passive' },
  ],

  // ========================================================================
  // ADEPTUS MINISTORUM
  // ========================================================================
  amin_confessor: [
    { id: 'amin_confessor_commanding_declamation', name: 'Commanding Declamation', description: 'Once per battle, when an enemy within 6" makes a Success Roll, cause it to roll at -2 DICE.', type: 'passive' },
    { id: 'amin_confessor_lead_the_procession', name: 'Lead The Procession', description: 'Whenever this model Moves, Retreats, or Charges, friendly ECCLESIARCHY models within 6" can move up to 3" first.', type: 'aura' },
  ],
  amin_missionary: [
    { id: 'amin_missionary_spread_the_word', name: 'Spread The Word Of The God-Emperor', description: 'While not within 6" of any other friendly model, has VICIOUS 10 with all attacks.', type: 'passive' },
  ],
  amin_drill_abbot: [
    { id: 'amin_drill_abbot_schola_progenium_disciplinarian', name: 'Schola Progenium Disciplinarian', description: 'BLOOD and STUN MARKERs cannot be spent on attack Success Rolls of self or ECCLESIARCHY allies within 6".', type: 'aura' },
  ],
  amin_preacher: [
    { id: 'amin_preacher_carry_the_faith', name: 'Carry the Faith', description: 'Always considered to be in ORATOR range as long as one friendly ORATOR model is on the battlefield and not Down.', type: 'passive' },
  ],
  amin_crusader: [
    { id: 'amin_crusader_irrepressable_purpose', name: 'Irrepressable Purpose', description: 'When taken Out of Action, can make one melee attack against an enemy in close combat before being removed.', type: 'passive' },
    { id: 'amin_crusader_warrior_of_faith', name: 'Warrior of Faith', description: 'Can ignore the HEAVY Keyword of one melee weapon.', type: 'passive' },
  ],
  amin_death_cult_assassin: [
    { id: 'amin_death_cult_assassin_bladed_stance', name: 'Bladed Stance', description: 'When an enemy Charges this model (before it has activated this Turn), can immediately take the Fight Action against that enemy.', type: 'passive' },
  ],
  amin_battle_cherub: [
    { id: 'amin_battle_cherub_companion', name: 'Companion', description: 'Selects one non-ARTIFICIAL, non-BEAST model at battle start. Forms a FIRETEAM with that model.', type: 'passive' },
  ],
  amin_miraculist: [
    { id: 'amin_miraculist_armour_of_faith', name: 'Armour of Faith', description: 'All injury rolls made against this model have -1 DICE.', type: 'passive' },
    { id: 'amin_miraculist_the_emperors_grace', name: "The Emperor's Grace", description: 'Once per battle, when taken Out of Action, treat the result as No Effect.', type: 'passive' },
  ],

  // ========================================================================
  // OFFICIO ASSASSINORUM
  // ========================================================================
  oa_adamus: [
    { id: 'oa_adamus_deaths_artisan', name: "Death's Artisan", description: '+1 INJURY DICE on all attacks against TOUGH enemies.', type: 'passive' },
    { id: 'oa_adamus_decapitation_strike', name: 'Decapitation Strike', description: 'When attacking with a Blade weapon with no other melee attacks this Activation, can grant +2 INJURY DICE but Activation ends immediately after.', type: 'action' },
    { id: 'oa_adamus_fleet', name: 'Fleet', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'oa_adamus_lightning_reflexes', name: 'Lightning Reflexes', description: 'All attacks against this model have -1 DICE to Hit.', type: 'passive' },
  ],
  oa_callidus: [
    { id: 'oa_callidus_acrobatic_escape', name: 'Acrobatic Escape', description: 'Never suffers free attacks when Retreating; can leave melee using a Standard Move, Charge, or Dash.', type: 'passive' },
    { id: 'oa_callidus_fleet', name: 'Fleet', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'oa_callidus_lightning_reflexes', name: 'Lightning Reflexes', description: 'All attacks against this model have -1 DICE to Hit.', type: 'passive' },
  ],
  oa_culexus: [
    { id: 'oa_culexus_abomination', name: 'Abomination', description: 'PSYCHIC and IGNORE ARMOUR injury rolls made against this model have -1 INJURY DICE.', type: 'passive' },
    { id: 'oa_culexus_fleet', name: 'Fleet', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'oa_culexus_lightning_reflexes', name: 'Lightning Reflexes', description: 'All attacks against this model have -1 DICE to Hit.', type: 'passive' },
  ],
  oa_eversor: [
    { id: 'oa_eversor_deadly_demise', name: 'Deadly Demise', description: 'When taken Out of Action, every model within 3" must roll on the Injury table (-1 DICE if in cover).', type: 'passive' },
    { id: 'oa_eversor_fleet', name: 'Fleet', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'oa_eversor_frenzon', name: 'Frenzon', description: 'When Charging, roll 2D6 and take the highest result.', type: 'passive' },
    { id: 'oa_eversor_lightning_reflexes', name: 'Lightning Reflexes', description: 'All attacks against this model have -1 DICE to Hit.', type: 'passive' },
    { id: 'oa_eversor_overkill', name: 'Overkill', description: 'Once per Activation, when taking an enemy Out of Action or Down in melee, can move full movement and make one additional melee attack.', type: 'passive' },
  ],
  oa_vanus: [
    { id: 'oa_vanus_ambidextrous', name: 'Ambidextrous', description: 'Ignores off-hand penalties; gains special benefits when attacking with PISTOL weapons in each hand.', type: 'passive' },
    { id: 'oa_vanus_autotomic_servo_limbs', name: 'Autotomic Servo-Limbs', description: 'Never suffers free attacks when Retreating; can leave melee using a Standard Move, Charge, or Dash.', type: 'passive' },
    { id: 'oa_vanus_fleet', name: 'Fleet', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'oa_vanus_lightning_reflexes', name: 'Lightning Reflexes', description: 'All attacks against this model have -1 DICE to Hit.', type: 'passive' },
    { id: 'oa_vanus_noospheric_interloper', name: 'Noospheric Interloper', description: 'After this model finishes activating, you decide the next 3 models to activate (from either side), then normal activation order resumes.', type: 'passive' },
  ],
  oa_venenum: [
    { id: 'oa_venenum_fleet', name: 'Fleet', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'oa_venenum_lightning_reflexes', name: 'Lightning Reflexes', description: 'All attacks against this model have -1 DICE to Hit.', type: 'passive' },
    { id: 'oa_venenum_unnatural_conditioning', name: 'Unnatural Conditioning', description: 'Instead of gaining an INFECTION MARKER at the start of Activation when already carrying one, remove one INFECTION MARKER instead.', type: 'passive' },
  ],
  oa_vindicare: [
    { id: 'oa_vindicare_deadshot', name: 'Deadshot', description: 'IGNORE COVER on all ranged attacks.', type: 'passive' },
    { id: 'oa_vindicare_fleet', name: 'Fleet', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'oa_vindicare_lightning_reflexes', name: 'Lightning Reflexes', description: 'All attacks against this model have -1 DICE to Hit.', type: 'passive' },
  ],

  // ========================================================================
  // ROGUE TRADER
  // ========================================================================
  rt_lord_captain: [
    { id: 'rt_lord_captain_personal_flair', name: 'Personal Flair', description: 'Begins with three Campaign Skills chosen from any non-Patron skill charts.', type: 'passive' },
  ],
  rt_voidmaster: [
    { id: 'rt_voidmaster_disciplinarian', name: 'Disciplinarian', description: 'Friendly non-elite ROGUE TRADER models within 6" have +1 DICE to Hit with ranged attacks.', type: 'aura' },
  ],
  rt_navigator_scion: [
    { id: 'rt_navigator_scion_calm_the_tides', name: 'Calm the Tides', description: 'Self and any model within 8" do not suffer Perils of the Warp effects.', type: 'aura' },
    { id: 'rt_navigator_scion_gaze_into_the_empyrean', name: 'Gaze Into the Empyrean', description: 'Enemy DEEP STRIKE and INFILTRATOR models must deploy at least 16" away from this model.', type: 'passive' },
  ],

  // ========================================================================
  // THE INQUISITION
  // ========================================================================
  inq_interrogator: [
    { id: 'inq_interrogator_inquisitorial_tomes', name: 'Inquisitorial Tomes', description: 'No roll — remove Tomeskull marker, then place it within 12". Choose: Denunciation (friendly within 3" gains +1 DICE to Hit) or Sanctification (enemies within 3" suffer -1 DICE to Hit). Lasts until next Activation.', type: 'action' },
  ],
  inq_mystic: [
    { id: 'inq_mystic_psychic_beacon', name: 'Psychic Beacon', description: 'Allies with DEEP STRIKE or INFILTRATOR can deploy within 3" of this model even if too close to the enemy.', type: 'passive' },
  ],
  inq_acolyte: [
    { id: 'inq_acolyte_experienced', name: 'Experienced', description: 'Even though not Elite, begins with one Campaign Skill.', type: 'passive' },
  ],
  inq_jokaero: [
    { id: 'inq_jokaero_inconceivable_customisation', name: 'Inconceivable Customisation', description: 'At battle start, roll D3: 1=+1 DICE to Hit (ranged); 2=ARMOUR PIERCING 1 (ranged); 3=Down results become Minor Hits.', type: 'passive' },
  ],
  inq_daemonhost: [
    { id: 'inq_daemonhost_daemonic_speed', name: 'Daemonic Speed', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'inq_daemonhost_malefic_warding', name: 'Malefic Warding', description: 'While within 8" of a friendly Inquisitor, all injury rolls made against this model have -1 DICE.', type: 'passive' },
    { id: 'inq_daemonhost_re_knit_host_form', name: 'Re-Knit Host Form', description: 'At the start of each Activation, remove D3 BLOOD MARKERs.', type: 'passive' },
  ],

  // ========================================================================
  // HERETIC ASTARTES
  // ========================================================================
  ha_chaos_lord: [
    { id: 'ha_chaos_lord_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'ha_chaos_lord_soul_gorge', name: 'Soul Gorge', description: 'When taking an enemy Out of Action in melee, remove 1 BLOOD MARKER from self.', type: 'passive' },
  ],
  ha_dark_apostle: [
    { id: 'ha_dark_apostle_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'ha_dark_apostle_dark_zealotry', name: 'Dark Zealotry', description: 'Risky Action +1 DICE — all friendly FOLLOWER models that are Down within 12" can immediately stand up.', type: 'action' },
    { id: 'ha_dark_apostle_malign_sacrifice', name: 'Malign Sacrifice', description: 'Can attack friendly models within 1". When causing BLOOD MARKERs or OOA on a friendly, one other ally within 12" activates after the current Activation with +1 DICE to all Success Rolls.', type: 'passive' },
  ],
  ha_chaos_sorcerer: [
    { id: 'ha_chaos_sorcerer_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
  ],
  ha_warpsmith: [
    { id: 'ha_warpsmith_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'ha_warpsmith_enrage_machine_spirits', name: 'Enrage Machine Spirits', description: 'Enemies within 8" have -1 DICE on all Ranged Attacks.', type: 'aura' },
    { id: 'ha_warpsmith_master_of_mechanisms', name: 'Master of Mechanisms', description: 'Success Roll — repair an ARTIFICIAL, MECHANICUS, or VEHICLE ally within 1", removing 1 BLOOD MARKER (3 on critical).', type: 'action' },
  ],
  ha_chaos_cultist: [
    { id: 'ha_chaos_cultist_expendable', name: 'Expendable', description: 'Not counted for Morale.', type: 'passive' },
    { id: 'ha_chaos_cultist_for_the_dark_gods', name: 'For the Dark Gods!', description: 'When taken Out of Action, give 1 BLESSING MARKER to another friendly HERETIC ASTARTES model on the battlefield.', type: 'passive' },
  ],
  ha_chaos_space_marine: [
    { id: 'ha_chaos_space_marine_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
  ],
  ha_possessed: [
    { id: 'ha_possessed_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'ha_possessed_daemonic_armour', name: 'Daemonic Armour', description: 'This model\'s Power Armour has IMPERVIOUS.', type: 'passive' },
    { id: 'ha_possessed_vessel_of_chaos', name: 'Vessel of Chaos', description: 'At the start of each Activation, roll D3: 1 = +1 INJURY DICE on melee attacks; 2 = ARMOUR PIERCING 2; 3 = +1 DICE to Dash Success Rolls.', type: 'passive' },
  ],
  ha_chaos_terminator: [
    { id: 'ha_chaos_terminator_black_carapace', name: 'Black Carapace', description: 'Treats any Down result from the Injury Roll Table as a Minor Hit instead. Does not apply to Down results that already replaced another result (e.g. from TOUGH).', type: 'passive' },
    { id: 'ha_chaos_terminator_terminator_armour', name: 'Terminator Armour', description: 'Rolls only D3 for extra charge distance instead of D6.', type: 'passive' },
  ],
  ha_helbrute: [
    { id: 'ha_helbrute_crazed', name: 'Crazed', description: 'Cannot Retreat from melee combat.', type: 'passive' },
  ],

  // ========================================================================
  // CHAOS CULT
  // ========================================================================
  cc_cult_demagogue: [
    { id: 'cc_cult_demagogue_bestow_gift', name: 'Bestow Gift', description: 'No roll — mutate self or an ally within 12". The target gains a temporary Gift of Chaos for the battle.', type: 'action' },
    { id: 'cc_cult_demagogue_incite_slaughter', name: 'Incite Slaughter', description: 'Risky Success Roll — one CHAOS CULT model within 12" can immediately make a single melee attack.', type: 'action' },
    { id: 'cc_cult_demagogue_incite_urgency', name: 'Incite Urgency', description: 'Risky Success Roll — one CHAOS CULT model within 12" can immediately take a Standard Move or Retreat.', type: 'action' },
    { id: 'cc_cult_demagogue_mutations', name: 'Mutations', description: 'Gains a permanent Gift of Chaos on recruitment (roll twice, choose one).', type: 'passive' },
  ],
  cc_heretic_witch: [
    { id: 'cc_heretic_witch_mutations', name: 'Mutations', description: 'Gains a permanent Gift of Chaos on recruitment (roll twice, choose one).', type: 'passive' },
  ],
  cc_chaos_disciple: [
    { id: 'cc_chaos_disciple_wild_mutations', name: 'Wild Mutations', description: 'Gains two permanent Gifts of Chaos on recruitment.', type: 'passive' },
  ],
  cc_daemon_prince: [
    { id: 'cc_daemon_prince_augmented', name: 'Augmented', description: 'If this model gains a Gift of Chaos requiring a weapon, choose an existing weapon or equip one appropriately.', type: 'passive' },
    { id: 'cc_daemon_prince_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cc_daemon_prince_overlord', name: 'Overlord', description: 'Is the Warband leader; any other LEADER models in the Warband lose the LEADER Keyword while this model is present.', type: 'passive' },
  ],
  cc_cult_rabble: [
    { id: 'cc_cult_rabble_for_the_dark_gods', name: 'For the Dark Gods!', description: 'When taken Out of Action, give 1 BLESSING MARKER to another friendly CHAOS CULT model on the battlefield.', type: 'passive' },
  ],
  cc_chaos_devotee: [
    { id: 'cc_chaos_devotee_uncontrolled_mutations', name: 'Uncontrolled Mutations', description: 'Gains a permanent Gift of Chaos on recruitment.', type: 'passive' },
  ],
  cc_chaos_ogryn: [
    { id: 'cc_chaos_ogryn_uncontrolled_mutations', name: 'Uncontrolled Mutations', description: 'Gains a permanent Gift of Chaos on recruitment.', type: 'passive' },
    { id: 'cc_chaos_ogryn_wall_of_muscle', name: 'Wall of Muscle', description: 'All injury rolls made against this model have -1 DICE.', type: 'passive' },
  ],
  cc_chaos_spawn: [
    { id: 'cc_chaos_spawn_augmented', name: 'Augmented', description: 'If this model gains a Gift of Chaos requiring a weapon, equip one appropriately.', type: 'passive' },
    { id: 'cc_chaos_spawn_mind_breaking_mutations', name: 'Mind-Breaking Mutations', description: 'Enemies within 3" treat all their enemies as if they had the FEAR Keyword.', type: 'aura' },
  ],

  // ========================================================================
  // CHAOS DAEMONS
  // ========================================================================
  cd_daemon_prince: [
    { id: 'cd_daemon_prince_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_daemon_prince_overlord', name: 'Overlord', description: 'Can recruit this model alongside one other model with the LEADER Keyword as long as they share a Chaos God Keyword (KHORNE, NURGLE, SLAANESH, or TZEENTCH). If so, the other model loses LEADER and this model is the warband leader.', type: 'passive' },
  ],
  cd_chaos_furie: [
    { id: 'cd_chaos_furie_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_chaos_furie_prey_on_the_weak', name: 'Prey on the Weak', description: 'The Chaos Furie ignores the Armour of Down enemies.', type: 'passive' },
  ],
  cd_bloodmaster: [
    { id: 'cd_bloodmaster_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_bloodmaster_a_gory_path', name: 'A Gory Path', description: 'The first time each Turn the Bloodmaster takes an enemy Out of Action with a melee attack, it and each KHORNE ally within 8" can move up to 3" toward the nearest visible enemy (even entering or leaving melee).', type: 'passive' },
    { id: 'cd_bloodmaster_master_of_blood', name: 'Master of Blood', description: 'Whenever this model or an allied KHORNE model within 8" hits with an attack, the Injury roll gains a +1 flat bonus.', type: 'aura' },
  ],
  cd_skullmaster: [
    { id: 'cd_skullmaster_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
  ],
  cd_bloodletter: [
    { id: 'cd_bloodletter_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_bloodletter_bane_of_cowards', name: 'Bane of Cowards', description: 'When an enemy in close combat Retreats, this model has +1 DICE to Hit and +1 INJURY DICE for its free attack against that model.', type: 'passive' },
  ],
  cd_flesh_hound: [
    { id: 'cd_flesh_hound_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_flesh_hound_hunter_from_the_warp', name: 'Hunter from the Warp', description: '+1 DICE to all Dash, Climb, and Jump Success Rolls.', type: 'passive' },
  ],
  cd_infernal_enrapturess: [
    { id: 'cd_infernal_enrapturess_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_infernal_enrapturess_discordant_disruption', name: 'Discordant Disruption', description: 'Cannot be targeted by PSYCHIC attacks; enemy PSYCHIC Success Rolls cannot be used within 6" of this model.', type: 'aura' },
    { id: 'cd_infernal_enrapturess_harmonic_alignment', name: 'Harmonic Alignment', description: 'Action with Success Roll — remove 1 BLOOD MARKER from self or an ally within 6" (3 on critical).', type: 'action' },
  ],
  cd_tranceweaver: [
    { id: 'cd_tranceweaver_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
  ],
  cd_daemonette: [
    { id: 'cd_daemonette_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_daemonette_graceful', name: 'Graceful', description: 'On a Dash roll of 10+, automatically succeeds Climb and Jump rolls made as part of that movement.', type: 'passive' },
  ],
  cd_seeker: [
    { id: 'cd_seeker_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_seeker_unholy_speed', name: 'Unholy Speed', description: '+1 DICE to all Dash and Jump Success Rolls.', type: 'passive' },
  ],
  cd_contorted_epitome: [
    { id: 'cd_contorted_epitome_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_contorted_epitome_horrible_fascination', name: 'Horrible Fascination', description: 'Enemies cannot Retreat from combat with this model. Can take an Action (+1 DICE Success Roll) to lure a visible enemy within 9" into base contact.', type: 'passive' },
  ],
  cd_poxbringer: [
    { id: 'cd_poxbringer_contagion', name: 'Contagion', description: 'Injury rolls against enemies with INFECTION MARKERs while in melee with this model have +1 DICE.', type: 'passive' },
    { id: 'cd_poxbringer_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_poxbringer_disgustingly_resilient', name: 'Disgustingly Resilient', description: 'Down results on the Injury table become Minor Hits instead.', type: 'passive' },
    { id: 'cd_poxbringer_herald_of_nurgle', name: 'Herald of Nurgle', description: 'Self and NURGLE allies within 7" score a Critical Hit on a roll of 11+.', type: 'aura' },
    { id: 'cd_poxbringer_inevitable', name: 'Inevitable', description: 'Moves only half as far when Dashing (3").', type: 'passive' },
  ],
  cd_spoilpox_scrivener: [
    { id: 'cd_spoilpox_scrivener_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_spoilpox_scrivener_disgustingly_resilient', name: 'Disgustingly Resilient', description: 'Down results on the Injury table become Minor Hits instead.', type: 'passive' },
    { id: 'cd_spoilpox_scrivener_inevitable', name: 'Inevitable', description: 'Moves only half as far when Dashing (3").', type: 'passive' },
    { id: 'cd_spoilpox_scrivener_keep_counting', name: 'Keep Counting!', description: 'When self or a NURGLE ally within 7" applies INFECTION MARKERs to an enemy, that model can immediately move 3".', type: 'aura' },
    { id: 'cd_spoilpox_scrivener_meet_your_quota', name: 'Meet Your Quota!', description: 'When self or a NURGLE ally within 7" gives an enemy 3 or more INFECTION MARKERs on a single attack, remove 1 BLOOD MARKER from an allied model.', type: 'aura' },
  ],
  cd_plaguebearer: [
    { id: 'cd_plaguebearer_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_plaguebearer_disgustingly_resilient', name: 'Disgustingly Resilient', description: 'Down results on the Injury table become Minor Hits instead.', type: 'passive' },
    { id: 'cd_plaguebearer_inevitable', name: 'Inevitable', description: 'Moves only half as far when Dashing (3").', type: 'passive' },
    { id: 'cd_plaguebearer_infected_outbreak', name: 'Infected Outbreak', description: 'Enemies in melee with any INFECTION MARKERs have -1 DICE to all Success Rolls.', type: 'passive' },
  ],
  cd_nurgling_swarm: [
    { id: 'cd_nurgling_swarm_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_nurgling_swarm_inevitable', name: 'Inevitable', description: 'Moves only half as far when Dashing (3").', type: 'passive' },
    { id: 'cd_nurgling_swarm_mischief_makers', name: 'Mischief Makers', description: 'Enemies in melee with Nurgling Swarms have -1 DICE to Hit with all attacks, even against non-Nurgling targets.', type: 'passive' },
  ],
  cd_plague_drone_rider: [
    { id: 'cd_plague_drone_rider_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_plague_drone_rider_disgustingly_resilient', name: 'Disgustingly Resilient', description: 'Down results on the Injury table become Minor Hits instead.', type: 'passive' },
  ],
  cd_changecaster: [
    { id: 'cd_changecaster_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_changecaster_storm_of_mutating_sorcery', name: 'Storm of Mutating Sorcery', description: 'When hitting with a PSYCHIC attack, the target has -1 DICE to its next Success Roll this Turn.', type: 'passive' },
  ],
  cd_flamer: [
    { id: 'cd_flamer_bounding_leaps', name: 'Bounding Leaps', description: 'Enemies never get free attacks when this model Retreats; can leave melee using a Standard Move, Charge, or Dash.', type: 'passive' },
    { id: 'cd_flamer_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
  ],
  cd_blue_horror: [
    { id: 'cd_blue_horror_brimstone', name: 'Brimstone', description: 'When taken Out of Action, choose up to two visible enemies within 6" — each must succeed on a Success Roll or gain 1 BLOOD MARKER.', type: 'passive' },
  ],
  cd_pink_horror: [
    { id: 'cd_pink_horror_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_pink_horror_split', name: 'Split', description: 'When taken Out of Action, place two Blue Horrors as close as possible to its location. They join the battle for the remainder but do not count for Morale.', type: 'passive' },
  ],
  cd_screamer: [
    { id: 'cd_screamer_daemonic_resistance', name: 'Daemonic Resistance', description: 'Injuries rolled against this model have -1 DICE.', type: 'passive' },
    { id: 'cd_screamer_slashing_dive', name: 'Slashing Dive', description: 'Can move within melee range without Charging. The first time per Activation it moves through an enemy\'s base, that enemy gains 1 BLOOD MARKER.', type: 'passive' },
  ],

  // ========================================================================
  // AELDARI
  // ========================================================================
  ael_autarch: [
    { id: 'ael_autarch_path_of_command', name: 'Path of Command', description: 'Other friendly AELDARI within 3" have +1 DICE to Hit with all attacks.', type: 'aura' },
    { id: 'ael_autarch_superlative_strategist', name: 'Superlative Strategist', description: 'When this model\'s Activation ends, choose one unactivated friendly model to begin its Activation immediately.', type: 'passive' },
  ],
  ael_windrider: [
    { id: 'ael_windrider_swift_demise', name: 'Swift Demise', description: '+1 DICE to Hit with ranged attacks against the closest possible target.', type: 'passive' },
    { id: 'ael_windrider_weapon_mount', name: 'Weapon Mount', description: 'Can ignore the HEAVY Keyword of one ranged weapon.', type: 'passive' },
  ],
  ael_wraith: [
    { id: 'ael_wraith_malevolent_souls', name: 'Malevolent Souls', description: 'When taken Out of Action, can make one melee attack before being removed; BLOOD MARKERs cannot be spent to modify this roll.', type: 'passive' },
    { id: 'ael_wraith_psychic_guidance', name: 'Psychic Guidance', description: 'While an AELDARI PSYCHIC ally is within 3", this model has +1 DICE to Hit with all attacks.', type: 'passive' },
  ],
  ael_wraithlord: [
    { id: 'ael_wraithlord_fated_hero', name: 'Fated Hero', description: 'Once per battle, when taken Out of Action for any reason, treat the result as No Effect instead.', type: 'passive' },
    { id: 'ael_wraithlord_psychic_guidance', name: 'Psychic Guidance', description: 'While an AELDARI PSYCHIC ally is within 3", this model has +1 to Hit with all attack Success Rolls.', type: 'passive' },
  ],

  // ========================================================================
  // DRUKHARI
  // ========================================================================
  dr_archon: [
    { id: 'dr_archon_overlord', name: 'Overlord', description: 'Pain(2) — As an Action with no roll, place a BLESSING MARKER on itself or an ally within 6".', type: 'action' },
    { id: 'dr_archon_towering_arrogance', name: 'Towering Arrogance', description: 'Self and allies within 6" have NEGATE FEAR.', type: 'aura' },
  ],
  dr_haemonculus: [
    { id: 'dr_haemonculus_fear_incarnate', name: 'Fear Incarnate', description: 'Enemies within 6" treat all their enemies as if they had the FEAR Keyword.', type: 'aura' },
    { id: 'dr_haemonculus_feel_no_pain', name: 'Feel No Pain', description: 'All injury rolls made against this model have -1 DICE.', type: 'passive' },
    { id: 'dr_haemonculus_fleshcraft', name: 'Fleshcraft', description: 'Pain(1) — Success Roll — heal self or an ally within 6", removing 1 BLOOD MARKER (3 on critical).', type: 'action' },
    { id: 'dr_haemonculus_master_of_pain', name: 'Master of Pain', description: 'Pain(1) — No roll — give one visible enemy within 12" 1 BLOOD MARKER.', type: 'action' },
  ],
  dr_succubus: [
    { id: 'dr_succubus_bloody_spectacle', name: 'Bloody Spectacle', description: 'When taking an enemy Out of Action, this model gains 1 BLESSING MARKER.', type: 'passive' },
    { id: 'dr_succubus_combat_drugs', name: 'Combat Drugs', description: 'Pain(1) — When an enemy Charges this model, make a single melee attack against it before it acts.', type: 'action' },
    { id: 'dr_succubus_storm_of_blades', name: 'Storm of Blades', description: 'Ignores all penalties for attacking with off-hand weapons.', type: 'passive' },
  ],
  dr_kabalite_warrior: [
    { id: 'dr_kabalite_warrior_sadistic_raider', name: 'Sadistic Raider', description: 'Pain(1) — On a melee hit, add +1 DICE to the Injury roll (once per hit).', type: 'action' },
  ],
  dr_incubus: [
    { id: 'dr_incubus_decapitating_strike', name: 'Decapitating Strike', description: 'Pain(1) — Give a melee attack VICIOUS 10 before rolling (once per attack).', type: 'action' },
    { id: 'dr_incubus_tormentor', name: 'Tormentor', description: '+1 DICE to Hit in melee against enemies affected by FEAR.', type: 'passive' },
  ],
  dr_wrack: [
    { id: 'dr_wrack_experimental_enhancements', name: 'Experimental Enhancements', description: 'Pain(1) — When taking the Fight Action, can make one additional melee attack.', type: 'action' },
    { id: 'dr_wrack_feel_no_pain', name: 'Feel No Pain', description: 'All injury rolls made against this model have -1 DICE.', type: 'passive' },
    { id: 'dr_wrack_the_torturers_craft', name: "The Torturer's Craft", description: 'When taking an enemy Out of Action, give 1 BLOOD MARKER to another visible enemy within 6".', type: 'passive' },
  ],
  dr_wych: [
    { id: 'dr_wych_acrobatic_gladiator', name: 'Acrobatic Gladiator', description: 'Pain(1) — When Charging, can cause this model\'s charge movement to automatically be 12".', type: 'action' },
    { id: 'dr_wych_no_escape', name: 'No Escape', description: '+1 DICE to Hit and +1 INJURY DICE on the free attack when an enemy in melee Retreats.', type: 'passive' },
  ],
  dr_reaver: [
    { id: 'dr_reaver_weapon_mount', name: 'Weapon Mount', description: 'Can ignore the HEAVY Keyword of one ranged weapon.', type: 'passive' },
  ],
  dr_cronos: [
    { id: 'dr_cronos_feel_no_pain', name: 'Feel No Pain', description: 'All injury rolls made against this model have -1 DICE.', type: 'passive' },
    { id: 'dr_cronos_pain_parasite', name: 'Pain Parasite', description: 'When causing BLOOD MARKERs on enemies, gains Pain tokens. Self and DRUKHARI allies within 9" can spend these tokens as BLOOD MARKERs on enemies for Pain(X) abilities.', type: 'aura' },
  ],
  dr_talos: [
    { id: 'dr_talos_feel_no_pain', name: 'Feel No Pain', description: 'All injury rolls made against this model have -1 DICE.', type: 'passive' },
    { id: 'dr_talos_pain_engine', name: 'Pain Engine', description: 'Pain(2) — Choose one: +1 DICE to Dash rolls OR +1 DICE to Hit, until end of battle (each option usable once).', type: 'action' },
  ],

  // ========================================================================
  // GENESTEALER CULTS
  // ========================================================================
  gc_primus: [
    { id: 'gc_primus_decoys_and_misdirection', name: 'Decoys and Misdirection', description: 'After deployment, remove up to three models from the table, then redeploy them among the removed models and Cult Ambush selections.', type: 'action' },
  ],
  gc_clamavus: [
    { id: 'gc_clamavus_scrambler_array', name: 'Scrambler Array', description: 'Enemy DEEP STRIKE and INFILTRATOR models must deploy at least 16" away from this model.', type: 'passive' },
    { id: 'gc_clamavus_voice_of_new_truths', name: 'Voice of New Truths', description: 'Enemy models within 8" have -1 DICE to all actions.', type: 'aura' },
  ],
  gc_nexos: [
    { id: 'gc_nexos_cult_infiltration', name: 'Cult Infiltration', description: 'Success Roll — choose a Cult Ambush marker within 24" and move it up to 6", ignoring terrain.', type: 'action' },
  ],
  gc_aberrant: [
    { id: 'gc_aberrant_aberrant_biology', name: 'Aberrant Biology', description: 'All injury rolls made against this model are made at -1 DICE.', type: 'passive' },
    { id: 'gc_aberrant_hulking_bodyguard', name: 'Hulking Bodyguard', description: 'Can redirect any hit on an ally within 1" to itself (excluding BLAST attacks).', type: 'passive' },
  ],
  gc_abominant: [
    { id: 'gc_abominant_the_chosen_one', name: 'The Chosen One', description: 'All injury rolls made against this model are made at -2 DICE.', type: 'passive' },
    { id: 'gc_abominant_heavy_swing', name: 'Heavy Swing', description: 'When making a melee attack, targets every enemy within 1" of this model.', type: 'passive' },
  ],

  // ========================================================================
  // HARLEQUINS
  // ========================================================================
  hq_troupe_master: [
    { id: 'hq_troupe_master_swift', name: 'Swift', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
  ],
  hq_death_jester: [
    { id: 'hq_death_jester_deadly_hunter', name: 'Deadly Hunter', description: 'Can ignore the HEAVY Keyword of one ranged weapon.', type: 'passive' },
    { id: 'hq_death_jester_swift', name: 'Swift', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
  ],
  hq_shadowseer: [
    { id: 'hq_shadowseer_swift', name: 'Swift', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
  ],
  hq_solitaire: [
    { id: 'hq_solitaire_blur_of_movement', name: 'Blur of Movement', description: '+2 DICE to all Dash Success Rolls.', type: 'passive' },
  ],
  hq_player: [
    { id: 'hq_player_swift', name: 'Swift', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
  ],
  hq_skyweaver: [
    { id: 'hq_skyweaver_swift', name: 'Swift', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'hq_skyweaver_weapon_mount', name: 'Weapon Mount', description: 'Can ignore the HEAVY Keyword of one ranged weapon.', type: 'passive' },
  ],

  // ========================================================================
  // NECRONS
  // ========================================================================
  nec_necron_lord: [
    { id: 'nec_necron_lord_my_will_be_done', name: 'My Will Be Done', description: 'At the start or end of own Activation, choose an ally within 12" — begin its Activation immediately (once per Activation).', type: 'action' },
  ],
  nec_cryptek: [
    { id: 'nec_cryptek_hover', name: 'Hover', description: 'Does not suffer injuries from falling. Cannot fall Down or suffer injury from a failed Diving Charge.', type: 'passive' },
  ],
  nec_royal_warden: [
    { id: 'nec_royal_warden_engrammatic_logic', name: 'Engrammatic Logic', description: 'Success Roll — select a Down (not Reanimating) NECRON within 12"; it stands up.', type: 'action' },
  ],
  nec_scarab_swarm: [
    { id: 'nec_scarab_swarm_self_destruction', name: 'Self-Destruction', description: 'After hitting an enemy in melee, can roll on the Injury table against itself to give the target one additional BLOOD MARKER.', type: 'action' },
  ],
  nec_tomb_blade: [
    { id: 'nec_tomb_blade_weapon_mount', name: 'Weapon Mount', description: 'Ignores the HEAVY property of ranged weapons.', type: 'passive' },
  ],
  nec_lokhust_lord: [
    { id: 'nec_lokhust_lord_destroyer_cult', name: 'Destroyer Cult', description: 'Self and NECRON allies within 6" have VICIOUS 11 with ranged attacks.', type: 'aura' },
    { id: 'nec_lokhust_lord_driven_by_hatred', name: 'Driven By Hatred', description: '+1 DICE to Hit against enemies with BLOOD MARKERs; +1 INJURY DICE if the target has 3 or more BLOOD MARKERs.', type: 'passive' },
    { id: 'nec_lokhust_lord_heavy_gunner', name: 'Heavy Gunner', description: 'Can ignore the HEAVY Keyword of one ranged weapon.', type: 'passive' },
  ],
  nec_skorpekh_lord: [
    { id: 'nec_skorpekh_lord_crimson_harvest', name: 'Crimson Harvest', description: 'When Charging one or more enemies, each enemy charged gains 1 BLOOD MARKER.', type: 'passive' },
    { id: 'nec_skorpekh_lord_united_in_destruction', name: 'United In Destruction', description: 'Self and NECRON allies within 6" have VICIOUS 11 with melee attacks.', type: 'aura' },
  ],
  nec_hexmark_destroyer: [
    { id: 'nec_hexmark_destroyer_inescapable_death', name: 'Inescapable Death', description: 'Once per Turn, when an enemy within 12" begins or ends a movement, can make a ranged attack against it.', type: 'passive' },
    { id: 'nec_hexmark_destroyer_multi_threat_eliminator', name: 'Multi-Threat Eliminator', description: 'Can take a Shoot or Fight Action with each weapon during Activation with no off-hand penalty; can make ranged attacks while in melee (not against models currently in melee).', type: 'passive' },
  ],
  nec_lokhust_destroyer: [
    { id: 'nec_lokhust_destroyer_hard_wired_for_destruction', name: 'Hard-Wired for Destruction', description: '+1 DICE to Hit against the closest available target.', type: 'passive' },
    { id: 'nec_lokhust_destroyer_heavy_gunner', name: 'Heavy Gunner', description: 'Can ignore the HEAVY Keyword of one ranged weapon.', type: 'passive' },
  ],
  nec_ophydian_destroyer: [
    { id: 'nec_ophydian_destroyer_tunnelling_horror', name: 'Tunnelling Horror', description: 'If takes an enemy Out of Action in melee and is not in melee with other enemies, can immediately move up to its movement speed.', type: 'passive' },
  ],
  nec_skorpekh_destroyer: [
    { id: 'nec_skorpekh_destroyer_whirling_onslaught', name: 'Whirling Onslaught', description: 'When making a melee attack after Charging, those attacks have SWEEPING.', type: 'passive' },
  ],
  nec_canoptek_spyder: [
    { id: 'nec_canoptek_spyder_canoptek_swarm', name: 'Canoptek Swarm', description: 'Success Roll — repair an ARTIFICIAL or VEHICLE ally within 6", removing 1 BLOOD MARKER (3 on critical).', type: 'action' },
    { id: 'nec_canoptek_spyder_gloom_prism', name: 'Gloom Prism', description: 'Injury rolls against self and allies within 6" have -1 DICE if the attack roll included any bonus DICE before applying.', type: 'aura' },
  ],
  nec_apprentek: [
    { id: 'nec_apprentek_chronomancer_chronometron', name: 'Chronometron (Chronomancer)', description: 'Success Roll — choose self or an ally within 6"; all attacks against that model have -1 DICE to Hit until end of Turn.', type: 'action' },
    { id: 'nec_apprentek_ethermancer_lightning_field', name: 'Lightning Field (Ethermancer)', description: 'Success Roll — choose self or an ally within 6"; until end of Turn, each time an enemy makes a melee attack against that model, the attacker suffers 1 STUN MARKER.', type: 'action' },
    { id: 'nec_apprentek_geomancer_seismic_crucible', name: 'Seismic Crucible (Geomancer)', description: 'Success Roll — each other model within 6" rolls on the Injury table ignoring Armour with +1 INJURY DICE, suffering STUN MARKERs instead of BLOOD MARKERs, treating Out of Action as Down.', type: 'action' },
    { id: 'nec_apprentek_plasmancer_living_lightning', name: 'Living Lightning (Plasmancer)', description: 'Success Roll — one enemy within 8" gains D3 STUN MARKERs.', type: 'action' },
    { id: 'nec_apprentek_psychomancer_veil_of_darkness', name: 'Veil of Darkness (Psychomancer)', description: 'Success Roll — remove this model and place it within 8" at a location not on/surrounded by Impassable Terrain.', type: 'action' },
    { id: 'nec_apprentek_technomancer_reinforce_metal', name: 'Reinforce Metal (Technomancer)', description: 'Success Roll — choose self or an ally within 6"; all Injury rolls against that model have -1 DICE until end of Turn.', type: 'action' },
  ],
  nec_macrocyte_warrior: [
    { id: 'nec_macrocyte_warrior_endless_reanimation', name: 'Endless Reanimation', description: 'Can use Reanimation Protocols any number of times per battle, not just once.', type: 'passive' },
  ],
  nec_flayer_king: [
    { id: 'nec_flayer_king_bloodlust', name: 'Bloodlust', description: '+1 DICE to Hit in melee against any model with BLOOD MARKERs; +1 flat to Injury rolls per BLOOD MARKER on the target.', type: 'passive' },
    { id: 'nec_flayer_king_controlled_hunger', name: 'Controlled Hunger', description: 'Allies within 6" can choose not to Charge first due to Flesh Hunger.', type: 'aura' },
  ],

  // ========================================================================
  // ORKS
  // ========================================================================
  or_warboss: [
    { id: 'or_warboss_da_biggest_and_da_best', name: 'Da Biggest and da Best', description: 'While Waaagh! is active, can make one additional attack with the Fight Action.', type: 'passive' },
    { id: 'or_warboss_might_is_right', name: 'Might Is Right', description: 'Friendly ORK models within 3" have +1 to Hit with melee weapons.', type: 'aura' },
  ],
  or_big_mek: [
    { id: 'or_big_mek_kustom_force_field', name: 'Kustom Force Field', description: 'Injury rolls made against the Big Mek have -1 DICE.', type: 'passive' },
  ],
  or_weirdboy: [
    { id: 'or_weirdboy_deadly_demise', name: 'Deadly Demise', description: 'When taken Out of Action, every model within 3" must roll on the Injury table (-1 DICE if in cover).', type: 'passive' },
    { id: 'or_weirdboy_waaagh_energy', name: 'Waaagh! Energy', description: 'Increases PSYKER X by 1 for each friendly ORK within 6", to a maximum of PSYKER 3.', type: 'passive' },
  ],
  or_gretchin: [
    { id: 'or_gretchin_cowardice', name: 'Cowardice', description: 'Charging is always a Risky Success Roll for this model.', type: 'passive' },
    { id: 'or_gretchin_expendable', name: 'Expendable', description: 'Not counted for Morale.', type: 'passive' },
    { id: 'or_gretchin_small', name: 'Small', description: 'Cannot carry HEAVY battlekit; if this model gains STRONG, the two cancel each other out.', type: 'passive' },
  ],
  or_squig: [
    { id: 'or_squig_sprinta', name: 'Sprinta', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'or_squig_squig_farm', name: 'Squig Farm', description: 'When a casualty, can be replaced for only 5 credits during post-battle.', type: 'passive' },
  ],
  or_deff_dread: [
    { id: 'or_deff_dread_deadly_demise', name: 'Deadly Demise', description: 'When taken Out of Action, every model within 3" must roll on the Injury table (-1 DICE if in cover).', type: 'passive' },
    { id: 'or_deff_dread_dead_shooty', name: 'Dead Shooty', description: 'While equipped with two ranged weapons, can Shoot with each during Activation.', type: 'passive' },
  ],

  // ========================================================================
  // LEAGUES OF VOTANN
  // ========================================================================
  lv_kahl: [
    { id: 'lv_kahl_grim_efficiency', name: 'Grim Efficiency', description: 'As an Action (no roll required), give 1 Grudge Token to one enemy model within 18" that this model can see.', type: 'action' },
  ],
  lv_brokhyr_iron_master: [
    { id: 'lv_brokhyr_iron_master_brokhyrs_guild', name: "Brôkhyr's Guild", description: "Success Roll — repair itself or a friendly ARTIFICIAL or VEHICLE model within 6\", removing 1 BLOOD MARKER (3 on Critical Success).", type: 'action' },
  ],
  lv_cthonian_beserk: [
    { id: 'lv_cthonian_beserk_cyberstimms', name: 'Cyberstimms', description: 'When taken Out of Action, before removing from the table, can make one melee attack against an enemy in close combat. BLOOD MARKERs cannot be spent on this roll.', type: 'passive' },
    { id: 'lv_cthonian_beserk_rage', name: 'Rage', description: 'Injury rolls against this model have -1 DICE.', type: 'passive' },
  ],
  lv_einhyr_hearthguard: [
    { id: 'lv_einhyr_hearthguard_decisive_destruction', name: 'Decisive Destruction', description: '+1 DICE to Hit with ranged attacks made against the closest possible target.', type: 'passive' },
    { id: 'lv_einhyr_hearthguard_oathband_bodyguard', name: 'Oathband Bodyguard', description: 'Can redirect any hit (excluding BLAST) on an ally within 1" to itself.', type: 'passive' },
  ],
  lv_brokhyr_thunderkyn: [
    { id: 'lv_brokhyr_thunderkyn_breaching_fire', name: 'Breaching Fire', description: 'When hitting with a ranged HEAVY weapon, the target cannot benefit from Cover until the end of the current Turn.', type: 'passive' },
    { id: 'lv_brokhyr_thunderkyn_heavy_gunner', name: 'Heavy Gunner', description: 'Can ignore the HEAVY Keyword of one ranged weapon it carries.', type: 'passive' },
  ],
  lv_ironkin_steeljack: [
    { id: 'lv_ironkin_steeljack_merciless_eradication', name: 'Merciless Eradication', description: 'When an enemy in melee Retreats, has +1 DICE to Hit and +1 INJURY DICE for its free attack against that model.', type: 'passive' },
    { id: 'lv_ironkin_steeljack_purge_response', name: 'Purge Response', description: 'Once per Turn, when an enemy ends its movement within 6", can make one ranged attack against it.', type: 'passive' },
  ],
  lv_hernkyn_pioneer: [
    { id: 'lv_hernkyn_pioneer_weapon_mount', name: 'Weapon Mount', description: 'Can ignore the HEAVY Keyword of one ranged weapon it wields.', type: 'passive' },
  ],

  // ========================================================================
  // SLANNI
  // ========================================================================
  sl_mage_chief: [
    { id: 'sl_mage_chief_foresight', name: 'Foresight', description: 'Does not suffer Perils of the Warp on a roll of 12. PERILOUS only applies to rolls between 2 and 2+X.', type: 'passive' },
  ],
  sl_oldblood: [
    { id: 'sl_oldblood_alpha_predator', name: 'Alpha Predator', description: 'Has VICIOUS X with melee attacks, where X = 12 minus the current BLOOD MARKERs on the target (minimum VICIOUS 6).', type: 'passive' },
  ],
  sl_starpriest: [
    { id: 'sl_starpriest_leap', name: 'Leap', description: '+2 DICE to Climb and Jump Success Rolls; never injured from falling; +1 DICE to Diving Charge rolls; no injury from a failed Diving Charge.', type: 'passive' },
    { id: 'sl_starpriest_scry_the_stars', name: 'Scry the Stars', description: 'Success Roll — self or an ally within 6" gains 1 BLESSING MARKER.', type: 'action' },
  ],
  sl_skirmisher: [
    { id: 'sl_skirmisher_leap', name: 'Leap', description: '+2 DICE to Climb and Jump Success Rolls; never injured from falling; +1 DICE to Diving Charge rolls.', type: 'passive' },
  ],
  sl_brave: [
    { id: 'sl_brave_predator', name: 'Predator', description: 'Has VICIOUS 11 with melee attacks against targets with 1 or more BLOOD MARKERs.', type: 'passive' },
  ],
  sl_brute: [
    { id: 'sl_brute_brutal_blows', name: 'Brutal Blows', description: 'When making a melee attack with a HEAVY melee weapon, can target two enemies in melee — the Success Roll is made once and hits both.', type: 'passive' },
    { id: 'sl_brute_heavy_scales', name: 'Heavy Scales', description: 'Injury rolls made against this model have -1, stacking with Armour up to a maximum of -3.', type: 'passive' },
  ],
  sl_amphi_walker: [
    { id: 'sl_amphi_walker_field_generator', name: 'Field Generator', description: 'This model\'s -2 Armour has IMPERVIOUS. Treats Down results as Minor Hits.', type: 'passive' },
    { id: 'sl_amphi_walker_massive_leap', name: 'Massive Leap', description: 'Automatically succeeds Climb and Jump rolls; never injured from falling; +1 DICE to Diving Charge rolls.', type: 'passive' },
  ],

  // ========================================================================
  // T'AU EMPIRE
  // ========================================================================
  tau_ethereal: [
    { id: 'tau_ethereal_coordinated_leadership', name: 'Coordinated Leadership', description: 'After deployment, choose up to two pairs of other T\'AU models in your Warband — they form FIREtEAMs while the Ethereal is on the battlefield.', type: 'passive' },
    { id: 'tau_ethereal_failure_is_not_an_option', name: 'Failure Is Not an Option', description: '+1 DICE to all Morale Tests while this model is on the battlefield and not Down.', type: 'passive' },
    { id: 'tau_ethereal_power_of_tides', name: 'Power of Tides', description: 'Risky — itself or one T\'AU ally within 6" has +1 INJURY DICE on its next attack.', type: 'action' },
    { id: 'tau_ethereal_sense_of_stone', name: 'Sense of Stone', description: 'Risky — an ally within 6" gains an additional -1 to its armour save (up to -3), AND the first -1 of its armour has IMPERVIOUS, until the end of the Turn.', type: 'action' },
    { id: 'tau_ethereal_storm_of_fire', name: 'Storm of Fire', description: 'Risky — itself or one T\'AU ally within 6" has +1 DICE to Hit, ignores Long Range and Cover on its next ranged attack.', type: 'action' },
    { id: 'tau_ethereal_unifying_mantra', name: 'Unifying Mantra', description: 'Self and T\'AU allies within 12" have NEGATE FEAR.', type: 'aura' },
    { id: 'tau_ethereal_wisdom_of_the_guides', name: 'Wisdom of the Guides', description: 'No Success Roll — choose one enemy in sight that has not yet activated this Turn. This Ethereal\'s Activation ends immediately and that enemy\'s Activation begins.', type: 'action' },
    { id: 'tau_ethereal_zephyrs_grace', name: "Zephyr's Grace", description: 'Risky — an ally within 6" has +1 DICE on its next Dash roll, AND +3" movement during that Dash.', type: 'action' },
  ],
  tau_commander: [
    { id: 'tau_commander_battlesuit_armaments', name: 'Battlesuit Armaments', description: 'While equipped with two or more ranged weapons, can Shoot with two of them during Activation (or replace either with placing a Markerlight).', type: 'passive' },
  ],
  tau_cadre_fireblade: [
    { id: 'tau_cadre_fireblade_crack_shot', name: 'Crack Shot', description: 'Ranged attacks by self and T\'AU allies within 6" ignore Armour on a Critical Hit.', type: 'aura' },
  ],
  tau_kroot_shaper: [
    { id: 'tau_kroot_shaper_long_stride', name: 'Long Stride', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
  ],
  tau_kroot_carnivore: [
    { id: 'tau_kroot_carnivore_long_stride', name: 'Long Stride', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
  ],
  tau_stealth_battlesuit: [
    { id: 'tau_stealth_battlesuit_cloaking_field', name: 'Cloaking Field', description: 'Risky +1 DICE — hide if touching scenery that blocks line of sight. While hidden, enemies cannot target this model with ranged attacks or Charges. Hidden state ends if the model moves, attacks, or an enemy comes within 1.5".', type: 'action' },
    { id: 'tau_stealth_battlesuit_homing_beacon', name: 'Homing Beacon', description: 'Allies with DEEP STRIKE or INFILTRATOR can deploy within 3" of this model; DEEP STRIKE distance is not adjusted by D3.', type: 'passive' },
  ],
  tau_crisis_battlesuit: [
    { id: 'tau_crisis_battlesuit_battlesuit_armaments', name: 'Battlesuit Armaments', description: 'While equipped with two ranged weapons, can Shoot with each during Activation.', type: 'passive' },
  ],
  tau_broadside_battlesuit: [
    { id: 'tau_broadside_battlesuit_battlesuit_armaments', name: 'Battlesuit Armaments', description: 'While equipped with two ranged weapons, can Shoot with each during Activation.', type: 'passive' },
  ],
  tau_kill_broker: [
    { id: 'tau_kill_broker_call_the_kill', name: 'Call the Kill', description: 'No roll — choose a visible enemy as mark until end of Turn; KROOT attacks against the mark have ARMOUR PIERCING 1.', type: 'action' },
    { id: 'tau_kill_broker_long_stride', name: 'Long Stride', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
    { id: 'tau_kill_broker_victory_shriek', name: 'Victory Shriek', description: 'When the mark is taken Out of Action, can immediately use Call the Kill again; one KROOT ally within 6" gains +1 INJURY DICE until the end of its next Activation.', type: 'passive' },
  ],
  tau_krootox_rider: [
    { id: 'tau_krootox_rider_long_stride', name: 'Long Stride', description: '+1 DICE to all Dash Success Rolls.', type: 'passive' },
  ],

  // ========================================================================
  // TYRANIDS
  // ========================================================================
  ty_hive_tyrant: [
    { id: 'ty_hive_tyrant_many_limbed', name: 'Many-Limbed', description: '+1 DICE to Hit with melee attacks (except from Tail Weapons) if not equipped with ranged weapons (except Tail or THROWN weapons).', type: 'passive' },
    { id: 'ty_hive_tyrant_onslaught', name: 'Onslaught', description: 'PSYCHIC Aura — Self and TYRANID allies within Synapse range gain CRITICAL on all ranged attacks.', type: 'aura' },
    { id: 'ty_hive_tyrant_will_of_the_hive_mind', name: 'Will of the Hive Mind', description: 'All TYRANID allies within 9" are considered Within Synapse Range.', type: 'passive' },
  ],
  ty_lictor: [
    { id: 'ty_lictor_camouflage', name: 'Camouflage', description: 'All ranged attacks against this model have -1 DICE to Hit.', type: 'passive' },
    { id: 'ty_lictor_feeder_tendrils', name: 'Feeder Tendrils', description: 'The first time per Activation this model causes a BLOOD MARKER in melee, remove one BLOOD MARKER from self.', type: 'passive' },
    { id: 'ty_lictor_pheromone_trails', name: 'Pheromone Trails', description: 'Allies with DEEP STRIKE or INFILTRATOR can deploy within 3" of this model even if too close to enemies.', type: 'passive' },
    { id: 'ty_lictor_vanguard_predator', name: 'Vanguard Predator', description: '+1 DICE to Dash rolls; auto-succeeds Climb and Jump rolls; +1 DICE to Diving Charge rolls.', type: 'passive' },
  ],
  ty_tyrant_guard: [
    { id: 'ty_tyrant_guard_guardian_organism', name: 'Guardian Organism', description: 'Can redirect any hit on an ally within 1" to itself (excluding BLAST attacks).', type: 'passive' },
    { id: 'ty_tyrant_guard_many_limbed', name: 'Many-Limbed', description: '+1 DICE to Hit with melee attacks if not equipped with ranged weapons (besides THROWN).', type: 'passive' },
  ],
  ty_tyranid_warrior: [
    { id: 'ty_tyranid_warrior_many_limbed', name: 'Many-Limbed', description: '+1 DICE to Hit with melee attacks if not equipped with ranged weapons (besides THROWN).', type: 'passive' },
  ],
  ty_ravener: [
    { id: 'ty_ravener_death_from_below', name: 'Death From Below', description: 'When taking an enemy Out of Action in melee while not in melee with other enemies, can immediately move up to half movement speed.', type: 'passive' },
    { id: 'ty_ravener_many_limbed', name: 'Many-Limbed', description: '+1 DICE to Hit with melee attacks (except Tail Weapons) if not equipped with ranged weapons besides Tail/THROWN.', type: 'passive' },
  ],
  ty_ripper_swarm: [
    { id: 'ty_ripper_swarm_skittering', name: 'Skittering', description: '+1 DICE to all Climb, Jump, and Diving Charge Success Rolls.', type: 'passive' },
  ],
  ty_spore_mine: [
    { id: 'ty_spore_mine_expendable', name: 'Expendable', description: 'Not counted for Morale.', type: 'passive' },
    { id: 'ty_spore_mine_spore_burst', name: 'Spore Burst', description: 'Can trigger at any point during Activation or when an enemy comes within 3": BLAST 3", GAS, IGNORE ARMOUR centred on this model. This model is automatically a casualty afterwards.', type: 'action' },
    { id: 'ty_spore_mine_tiny', name: 'Tiny', description: 'Injury rolls made against this model have +1 DICE.', type: 'passive' },
  ],
  ty_zoanthrope: [
    { id: 'ty_zoanthrope_spirit_leech', name: 'Spirit Leech', description: 'When taking an enemy Out of Action with a PSYCHIC attack, remove 1 BLOOD MARKER from self.', type: 'passive' },
    { id: 'ty_zoanthrope_warp_field', name: 'Warp Field', description: 'PSYCHIC Aura — Self and allies within 3" treat Down results as Minor Hits.', type: 'aura' },
  ],
  ty_gaunt_termagant: [
    { id: 'ty_gaunt_termagant_skittering', name: 'Skittering', description: '+1 DICE to all Climb, Jump, and Diving Charge Success Rolls.', type: 'passive' },
  ],
  ty_gaunt_hormagaunt: [
    { id: 'ty_gaunt_hormagaunt_skittering', name: 'Skittering', description: '+1 DICE to all Climb, Jump, and Diving Charge Success Rolls.', type: 'passive' },
  ],
  ty_gaunt_gargoyle: [
    { id: 'ty_gaunt_gargoyle_skittering', name: 'Skittering', description: '+1 DICE to all Climb, Jump, and Diving Charge Success Rolls.', type: 'passive' },
  ],
  ty_gaunt_neurogaunt: [
    { id: 'ty_gaunt_neurogaunt_skittering', name: 'Skittering', description: '+1 DICE to all Climb, Jump, and Diving Charge Success Rolls.', type: 'passive' },
  ],
  ty_gaunt_barbgaunt: [
    { id: 'ty_gaunt_barbgaunt_skittering', name: 'Skittering', description: '+1 DICE to all Climb, Jump, and Diving Charge Success Rolls.', type: 'passive' },
  ],

  // ========================================================================
  // NECROMUNDA GANG / ADEPTUS ARBITES
  // ========================================================================
  ng_gang_leader: [
    { id: 'ng_gang_leader_around_the_hive', name: 'Around the Hive', description: 'Begins with one Campaign Skill: choose two skill charts, roll 2D6 on each (reroll results of 2 or 12), and choose one of the rolled skills.', type: 'passive' },
  ],
  ng_gang_champion: [
    { id: 'ng_gang_champion_experienced', name: 'Experienced', description: 'Begins with one Campaign Skill: choose one skill chart, roll 2D6 (reroll results of 2 or 12), and gain that skill.', type: 'passive' },
  ],
  ng_juve: [
    { id: 'ng_juve_new_kid', name: 'New Kid', description: 'After 2+ missions, or achieving a Glorious Deed or taking an Elite Out of Action, can be upgraded to Ganger for free.', type: 'passive' },
  ],
  arb_cyber_mastiff: [
    { id: 'arb_cyber_mastiff_cyber_swiftness', name: 'Cyber Swiftness', description: '+1 DICE to all Dash and Jump Success Rolls.', type: 'passive' },
    { id: 'arb_cyber_mastiff_loyal_protector', name: 'Loyal Protector', description: 'Enemies in melee with this model cannot attack its designated owner.', type: 'passive' },
    { id: 'arb_cyber_mastiff_pet', name: 'Pet', description: 'Forms a FIRETEAM with one selected GANGER model at battle start.', type: 'passive' },
    { id: 'arb_cyber_mastiff_watchdog', name: 'Watchdog', description: 'If both this model and its owner are legal Charge targets, an enemy cannot choose to Charge its owner instead.', type: 'passive' },
  ],
  arb_sanctioner_automata: [
    { id: 'arb_sanctioner_automata_mobile_bulwark', name: 'Mobile Bulwark', description: 'Friendly non-LARGE models can treat this model as Cover; always considered large enough to provide Cover.', type: 'passive' },
  ],

  // ========================================================================
  // PIRATE CREW
  // ========================================================================
  pc_pirate_captain: [
    { id: 'pc_pirate_captain_experience', name: "Captain's Experience", description: 'The Pirate Captain can select up to three Specialties.', type: 'passive' },
    { id: 'pc_pirate_captain_orders', name: "Captain's Orders", description: "As an Action with a Success Roll, the Pirate Captain can shout orders at one ally it can see within 12\" of it. On a success, the Pirate Captain's Activation ends and that model's Activation begins.", type: 'action' },
  ],
  pc_first_mate: [
    { id: 'pc_first_mate_experience', name: "First Mate's Experience", description: 'The First Mate can select up to two Specialties.', type: 'passive' },
    { id: 'pc_first_mate_second_in_command', name: 'Second in Command', description: "While your Warband leader is Out of Action, the First Mate gains the LEADER Keyword.", type: 'passive' },
  ],
  pc_pirate_champion: [
    { id: 'pc_pirate_champion_experience', name: "Champion's Experience", description: 'The Pirate Champion can select up to two Specialties.', type: 'passive' },
  ],
};
