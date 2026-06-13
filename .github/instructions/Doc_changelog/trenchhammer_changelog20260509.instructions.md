## Changelog

### Beta 1.3.5 (in progress) — 2026-05-09

General

* Pistoleer type abilities no longer grant ASSAULT. (Seraphim, Inceptor, Inquisitor, Vanus Infocyte, Starstorm, pirate Specialty, Grot Gunslinger, Hired Gun)

Battlekit

* Hand Flamers cost 25 instead of 20
* Weapons with Frag and Krak options no longer have Krak option (Grenadier Gauntlet, Grenade Launcher, Cyclone Missile Launcher, Missile Launcher)
* Cyclone Missile Launcher and Missile Launcher have BLAST 2" instead of 3"
* Twin Heavy Stubber has 36" range, has HEAVY as intended

Campaign

* Champion skill does not apply to weapons that can be used in addition to normal attacks.
* Heavy Melee Training gives +1 INJURY DICE in melee if already STRONG
* Careful Exploration Skill still grant money
* Trader skill gives 2D6x10 credits
* Added Delete Exploration Skill
* Set Dice returns to being used after the roll
* Lookout skill replaced with Escapist
* ANATHEMA models cannot have Psychic Awakening

Mercenaries

* Grot Gunslinger Kustom Grot Blastas have ASSAULT

Adepta Sororitas

* Brazier of Holy Fire's Unleash has 8" range instead of 12" and -1 INJURY DICE
* Twin Storm Bolter has ASSAULT

Adeptus Astartes

* Chaplain's Crozius Arcanum has ICON instead of LEADER

Astra Militarum

* Null Coat is Non-Psyker only (was Elite Only)

Chaos Daemons

* Brass Horns apply a BLOOD MARKER instead of a damage buff
* Spoilpox Scrivener has ELITE as intended
* Death's Heads have -1 INJURY DICE and lose BLAST
* Crystal Tome effect replaced, costs 2 Glory

Heretic Astartes

* Alpha Legion cannot purchase any Marks of Chaos
* Shroud Bombs have THROWN (already equipment type with THROWN keyword in codebase)

Officio Assassinorum

* Culexus Assassin has ANATHEMA keyword

Tyranids

* Synapse Range reduced to 4" normally
* Hive Tyrant and Neurotyrant have 6" Synapse Range
* Neuroloids have normal Synapse Range (4")

---

### Codebase changes applied (v39)

**weapons.ts**
- `hand_flamer`: cost 20 → 25
- `twin_heavy_stubber`: range 48 → 36, added HEAVY keyword
- `cyclone_missile_launcher`: added BLAST 2", SHRAPNEL keywords; removed Krak option from description
- `missile_launcher`: added BLAST 2", SHRAPNEL keywords; removed Krak option from description
- `grenade_launcher`: added BLAST 2", SHRAPNEL keywords; removed Krak option from description
- `grenadier_gauntlet`: added BLAST 2", SHRAPNEL keywords; removed Krak option from description

**faction_wargear.ts**
- Alpha Legion subfaction: now excluded from Marks of Chaos in both unit-override and general paths
- `troop_flag_am` → `regiment_flag_am` in ASTRA_MILITARUM_SPECIFIC_IDS (1.3.4 regression fix)
- Added AM Campaign Shop glory item IDs to ASTRA_MILITARUM_SPECIFIC_IDS

**factions_complete.ts**
- `oa_culexus` (Culexus Assassin): added ANATHEMA keyword

**equipment.ts**
- Added all Astra Militarum Campaign Shop glory items (previously missing):
  - `clarion_proclamatus_am` (2 Glory)
  - `fire_of_judgement_am` (4 Glory)
  - `laurels_of_command_am` (3 Glory)
  - `medal_macharia_am` (3 Glory)
  - `moiraean_lance_am` (4 Glory)
  - `null_coat_am` (3 Glory, Non-Psyker Elite Only)
  - `refractor_field_am` (2 Glory)
  - `relic_of_lost_cadia_am` (4 Glory)
  - `skull_mask_am` (1 Glory)
  - `star_of_terra_am` (7 Glory)
