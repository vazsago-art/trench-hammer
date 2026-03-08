# TrenchHammer Keyword Glossary — Comprehensive Audit Report

**Scope:** All instruction files in `.github/instructions/` (root + all faction subdirectories + Mercenaries/)  
**Target:** `src/data/keywordGlossary.ts`  
**Date:** Beta 1.3.3 (in-progress)

---

## SECTION 1 — All Unique Keywords Found Across ALL Instruction Files

The following table lists every keyword or keyword-like term found in the instructions. Status indicates whether it is from TC base, TH-new, a TH modification, or a faction tag. "In Glossary?" indicates presence in the current `keywordGlossary.ts`.

### 1a. Core Attack & Weapon Keywords

| Keyword | Source | Description Summary | In Glossary? |
|---|---|---|---|
| `ARMOUR PIERCING X` | TC base, TH expanded | Reduces armour/shield -INJURY MODIFIER by X | ✅ (AP, AP1, AP2, AP3) |
| `ASSAULT` | TC base | Allows attacking same Activation as Charge/Fight | ✅ |
| `AUTOMATIC X` | TC base | Make X ranged attacks in one Shoot Action | ✅ (generic, 2, 3) — **missing 4, 5** |
| `BAYONET LUG` | TC base | Required for attaching bayonets | ✅ |
| `BLAST X"` | TC base | Area effect at target point | ✅ (1", 2", 3", 5") |
| `BLOCK` | TC base | Attacker who Charged gets -1 DICE | ✅ |
| `CLEAVE X` | TH new (replaced MULTISTRIKE) | Make X melee attacks in one Fight Action | ✅ (generic, 2, 3) |
| `CRITICAL` | TC base | Critical hit grants +2 INJURY DICE instead of +1 | ✅ |
| `CUMBERSOME` | TC base + TH modifier | Requires two hands even for STRONG | ✅ |
| `DEADLY` | TH new (replaced 3d6 Injury) | Roll 3D6 for injury instead of 2D6 | ✅ |
| `FIRE` | TC base | +1 BLOOD MARKER after injury | ✅ |
| `FLAMETHROWER` | TC base | Ranged attacks auto-succeed | ✅ |
| `GAS` | TC base | +1 BLOOD MARKER after injury | ✅ |
| `GRENADE` | TC base (legacy) | TC grenades rule — **replaced in TH** | ✅ (outdated entry) |
| `HEAVY` | TC base | Max 1 per model; no charge bonus; no move+shoot | ✅ |
| `IGNORE ARMOUR` | TC base | Ignore all armour/shield injury modifiers | ✅ |
| `IGNORE COVER` | TH (replaced GRENADE on thrown weapons) | Ignore -1 DICE from Cover | ✅ |
| `IGNORE LONG RANGE` | TH (replaced GRENADE on thrown weapons) | Ignore -1 DICE from Long Range | ✅ |
| `IGNORE OFF-HAND` | TC base | Ignore -1 DICE penalty for off-hand weapon | ✅ |
| `MAIN HAND ONLY` | TH new | Cannot be used as off-hand attack | ✅ |
| `NONLETHAL` | TH new | Out of Action → Down on injury table | ✅ |
| `PERILOUS ±X` | TH new | Psychic power triggers Perils at extended range | ✅ |
| `PISTOL` | TC base | Can be used as ranged or melee | ✅ |
| `PSYCHIC` | TH clarified | Ability/attack uses PSYKER rules | ✅ |
| `RELOAD` | TC base | Activation ends after using this weapon | ✅ |
| `RISKY` | TC base | Failure ends Activation | ✅ |
| `SCATTER` | TC base | Failed shot scatters to new point | ✅ |
| `SHIELD COMBO` | TC base | Use two-handed weapon alongside a shield | ✅ |
| `SHOTGUN` | TC base | At Long Range, -1 INJURY DICE instead of -1 DICE | ✅ |
| `SHRAPNEL` | TC base | +1 BLOOD MARKER after injury | ✅ |
| `STEALTH` | TH modified | Long Range attacks get extra -1 DICE | ✅ |
| `STUN` | TH new | Causes 1 STUN MARKER in addition to injury | ✅ |
| `STUN MARKERS` | TH new | Weapon places STUN MARKERs instead of BLOOD MARKERs | ✅ |
| `SWEEPING` | TH new | Fight Action hits all enemies within 1" | ✅ |
| `THROWN` | TC base + TH modified | No hands; limit 1 at a time | ✅ (incomplete for TH) |
| `TWO-HANDED` | TC base | Requires both hands | ✅ |
| `VICIOUS X` | TH new/clarified w/ X value | Critical Hit on X or higher | ✅ (generic, 10, 11, 12) — **missing 9** |
| `WHIP X"` | TH new | Melee weapon with ranged attack at X" | ✅ |

### 1b. Model & Ability Keywords

| Keyword | Source | Description Summary | In Glossary? |
|---|---|---|---|
| `ARTIFICIAL` | TC base | Constructed non-organic model | ✅ |
| `BEAST` | TH new | Animal mount/creature model type | ❌ **MISSING** |
| `BEASTMEN` | TH new | Sub-faction tag for mutant beastmen | ❌ **MISSING** |
| `BLESSED` | TC base | Start with X BLESSING MARKERs | ✅ |
| `BLESSING MARKER` | TC base/TH | Enhancement marker: +1 DICE to actions | ✅ |
| `BLOOD MARKER` | TC base | Injury marker: spent for -1 DICE | ✅ |
| `BURROW` | TH new | Ignore terrain when moving | ✅ |
| `CONSUMABLE` | TC base | Lost after use in campaign | ✅ |
| `COVER` | TC base | Grants cover save modifier | ✅ |
| `DANGEROUS TERRAIN` | TC base | Risky roll when activating within or entering | ✅ |
| `DEATH CULT` | TH new | Sub-faction tag for Death Cult models | ❌ **MISSING** |
| `DEEP STRIKE` | TH modified | Off-table deployment from Turn 2 | ✅ |
| `DEEP STRIKE (TUNNEL)` | TH new | Deep Strike restricted to ground level | ✅ |
| `DEMONIC` | TC base | Has NEGATE FIRE | ✅ |
| `DEPLOYABLE` | TC base | Represented by physical object on battlefield | ✅ |
| `DIFFICULT TERRAIN` | TC base | Each 1" counts as 2" | ✅ |
| `ELITE` | TC base | Senior model; special campaign rules | ✅ |
| `FEAR` | TC base | -1 DICE to melee attacks against this model | ✅ |
| `FIRETEAM` | TC base | Two models activate simultaneously | ✅ |
| `FLYING` | TH added as keyword | Move through air ignoring terrain | ✅ |
| `GOLEM` | TC base | OoA → Down; cannot remove blood markers | ✅ |
| `GOETIC` | TC base | Spell system requiring BLOOD MARKER cost | ✅ |
| `HELD` | TC base + TH modified | Requires one hand always | ✅ |
| `IMPASSABLE TERRAIN` | TC base | Cannot move onto or across | ✅ |
| `IMPERVIOUS` | TC base | AP/IGNORE ARMOUR don't affect this piece of kit | ✅ |
| `INFECTION MARKER` | TC base | Like BLOOD MARKER; spreads each Activation | ✅ |
| `INFILTRATOR` | TC base | Deploy anywhere out of LoS, 8"+ from enemies | ✅ |
| `LARGE` | TH new | Larger model; immune to push/pull size restrictions | ✅ (vague desc) |
| `LEADER` | TC base | +1 DICE to Morale while on battlefield | ✅ |
| `LIMITED POTENTIAL` | TH new | Can learn only up to 3 skills | ✅ |
| `MARKERLIGHT` | TH new | T'au targeting keyword enabling Markerlight tokens | ❌ **MISSING** |
| `MINED` | TH new | Terrain/marker detonates on contact | ✅ |
| `NO PROMOTION` | TH new | Cannot be promoted to Elite | ✅ |
| `ORATOR` | TH new | Adeptus Ministorum sub-faction tag for hymn system | ❌ **MISSING** |
| `PSYKER X` | TH modified | +X DICE to psychic uses | ✅ (generic, 1, 2, 3) |
| `PUTRESCERE` | TC base | Spell system using INFECTION MARKERs | ✅ |
| `REGENERATE X` | TH new keyword | Remove X BLOOD MARKERs each Activation | ✅ |
| `SKIRMISHER` | TC base | Can dodge Charges with D3" move | ✅ |
| `STRONG` | TC base | Ignores HEAVY; wields 2H weapons 1-handed | ✅ |
| `SWARM` | TH new | Cannot fall Down; BLAST has +1 INJURY DICE | ✅ |
| `SYNAPSE` | TH new | Tyranids keyword granting bonuses to nearby TYRANID models | ❌ **MISSING** |
| `TOUGH` | TC base | First OoA → Down instead | ✅ |
| `TURBO-BOOST` | TH new | +1 DICE Dash; cannot climb | ✅ |
| `VEHICLE` | TH new keyword | Vehicle-scale model with special rules | ✅ |

### 1c. Campaign & Faction System Keywords

| Keyword | Source | Description Summary | In Glossary? |
|---|---|---|---|
| `ACTION` | TC base | In-Activation activity | ✅ |
| `AMMUNITION` | TH new | Apply keyword to weapon at start of battle | ✅ |
| `LIMIT` | TC base | Max units of this kit per Warband | ✅ |
| `STUNLOCK` | TH new rule | Spend 6 STUN MARKERs to end an enemy's activation | ❌ (rule, not keyword — debatable) |

### 1d. Faction Tags (TrenchHammer-Specific)

| Keyword | In Glossary? |
|---|---|
| `AELDARI` | ✅ |
| `ASSASSINORUM` | ✅ |
| `ASTARTES` | ✅ |
| `CHAOS CULT` | ✅ |
| `CUSTODES` | ✅ |
| `DAEMON` | ✅ |
| `DRUKHARI` | ✅ |
| `ECCLESIARCHY` | ✅ |
| `GANGER` | ✅ |
| `GENESTEALER CULTS` | ✅ |
| `HARLEQUIN` | ✅ |
| `HERETIC ASTARTES` | ✅ |
| `INQUISITION` | ✅ |
| `KROOT` | ❌ **MISSING** (T'au sub-faction tag; present on Kroot units and Kroot-access battlekit) |
| `MECHANICUS` | ✅ |
| `MILITARUM` | ✅ |
| `NECRON` | ✅ |
| `ORK` | ✅ |
| `PIRATE` | ✅ |
| `ROGUE TRADER` | ✅ |
| `SKAVEN` | ✅ |
| `SLANN` | ✅ |
| `SORORITAS` | ✅ |
| `T'AU` | ✅ |
| `TYRANID` | ✅ |
| `VOTANN` | ✅ |

### 1e. Chaos God Mark Keywords

| Keyword | In Glossary? |
|---|---|
| `KHORNE` | ✅ |
| `NURGLE` | ✅ |
| `SLAANESH` | ✅ |
| `TZEENTCH` | ✅ |
| `UNDIVIDED` | ❌ **MISSING** (listed in `trenchhammer_newkeywords.instructions.md` as a faction tag; used by Chaos Undivided patron and Heretic Astartes Mark of Darkness) |

### 1f. TC Base Faction Tags (present in TC digital rulebook)

| Keyword | In Glossary? |
|---|---|
| `BLACK GRAIL` | ✅ |
| `HERETIC` | ✅ |
| `NEW ANTIOCH` | ✅ |
| `PILGRIM` | ✅ |
| `SULTANATE` | ✅ |
| `THE COURT` | ✅ |

---

## SECTION 2 — Special Rules / Abilities NOT Currently Covered in `keywordGlossary.ts`

These are named game mechanics that appear throughout the instruction files, that are NOT keywords and thus not appropriate for the glossary, but may warrant documentation notes.

| Rule Name | Faction(s) | Summary |
|---|---|---|
| **STUNLOCK** | All (uses STUN MARKERs) | Spend 6 STUN MARKERs on an enemy's activation to end it immediately (3 if the model is Down). This is a mechanic defined in `trenchhammer_newrules.instructions.md`, not a keyword tag itself. Could potentially be a glossary entry. |
| **Reanimation Protocols** | Necrons | First OoA → treated as Down (marked as "Reanimating"). Reanimate rolls each activation; while Reanimating, armour is ignored & +1 INJURY DICE to all injury rolls. |
| **Battle Focus** | Aeldari | Per-Turn Focus Point economy enabling several movement/attack modifiers. |
| **Waaagh!** | Orks | Once-per-battle WAAAGH! declaration granting charge bonus, +1 DICE to-hit in melee, -1 DICE against injuries. |
| **Shadow in the Warp** | Tyranids | Enemy Warbands roll Morale with -1 DICE. Replaces Perils of the Warp with -2 DICE cumulative modifier per power used. |
| **For the Greater Good / Markerlight Tokens** | T'au Empire | Models with MARKERLIGHT keyword can mark instead of shoot; marked enemies grant +1 DICE to hit and their BLOOD MARKERs can be spent like normal by T'au for ranged injury rolls. |
| **Pain(X)** | Drukhari | Spend X BLOOD MARKERs from non-ARTIFICIAL enemy models to trigger an effect. Each DRUKHARI model has Pain(1) effects by default. |
| **Power From Pain** | Drukhari | Framework granting all Drukhari Pain(X) access per activation. |
| **SYNAPSE Range** | Tyranids | TYRANID models within 6" of a SYNAPSE model are "Within Synapse Range" and gain +1 DICE to Dash. |
| **Canticles of the Omnissiah** | Adeptus Mechanicus | Cycle of 6 canticles that rotate each Round, providing group bonuses (this *is* in `.github/instructions` documentation). |
| **Voice of Command / Orders** | Astra Militarum | Astra Militarum leader can issue one of 6 named Orders per Turn to modify nearby units. |
| **Battle Hymns** | Adeptus Ministorum | ORATOR models can activate one of 3 hymns per game using an Action, with Warband-wide effects. |
| **Gifts of Chaos** | Chaos Cult | D66 table of permanent mutations that trigger at specific events or can be purchased after battles. |
| **Archeotech System** | Adeptus Mechanicus / Dark Mechanicum | Power Source + Weapon Part + Techno-Arcana combinatorial system giving unique per-battle effects. |
| **Marks of Chaos** | Heretic Astartes | Mark of Khorne/Nurgle/Slaanesh/Tzeentch/Darkness — per-model modifiers granting faction tags and stat changes. |
| **Dark Pacts** | Heretic Astartes | Each Turn: spend BLOOD MARKERs from friendly models to gain specific bonus effects (charge, injury, morale). |
| **Threads of Fate** | Aeldari | 3-stage persistent campaign objective system; completing/failing changes Threat level and ends with Warband-wide rewards or trauma. |
| **WAAAGH! Stages** | Orks | 4-stage escalating power system tracked by Stompin' Points with Orky Ruction tests on failure. |
| **Dynamic Epithets** | Necrons | Each battle: Necron Lord that earns a Glorious Deed unlocks a new named Dynastic Ability. |
| **Cult Ambush** | Genestealer Cults | Alternative deployment using 4 placed markers; selected models deploy within 3" of a marker. |
| **Grand Performances** | Harlequins | 3 Tales with Rehearsal requirements leading to scored Grand Performance battles with tiered Glory rewards. |
| **Acquisitions System** | Leagues of Votann | Earn 4 Resource types between battles; spend on permanent Warband-wide Assets. |
| **Territorial Dominance** | Drukhari | Earn Raid Spoils each battle; spend on Territories; owning 3+ of same type unlocks special abilities. |
| **Perils of the Warp table** | All PSYKER factions | 6-row table rolled on a 2d6 when a model suffers Perils. Defined in `trenchhammer_newrules.instructions.md`. |
| **Deny the Witch** | All PSYKER factions | Any model with PSYKER can attempt to block a psychic power within 18" as a reaction. |
| **Using Multiple Powers** | All PSYKER factions | Each additional psychic power used by one model in one Activation adds -1 DICE cumulative, plus cumulative PERILOUS ±1. |
| **ASSISTANT** | Orks, Necromunda | Some models can carry ASSISTANT items (max 1 per model); functions as a keyword-like restriction — not formally a keyword. |

---

## SECTION 3 — Keywords / Rules ENTIRELY MISSING from `keywordGlossary.ts`

These keywords appear in unit stat blocks, weapon profiles, or battlekit rules in the instruction files and are **not present at all** in the current glossary.

### 3.1 Model/Unit Keywords That Need Glossary Entries

| Keyword | Where Found | Suggested Definition |
|---|---|---|
| `UNDIVIDED` | `trenchhammer_newkeywords.instructions.md` (faction tag list); Heretic Astartes (Mark of Chaos Undivided patron mechanics); Chaos Daemons; Chaos-Cult patron | **(TrenchHammer) Chaos Mark. This model bears no single god's mark (or bears the mark of Chaos Undivided). Referenced by Chaos Undivided patron abilities and the Heretic Astartes Mark of Darkness.** |
| `BEAST` | Astra Militarum — Rough Rider Horse ("LARGE, BEAST Keyword, VEHICLE") | **(TrenchHammer) This model is a living creature that serves as a mount or independent creature, rather than a machine. May interact with specific bestiary rules.** |
| `BEASTMEN` | Chaos-Cult (Gift 15 "Beastial" grants BEASTMEN Keyword); Pirate Crew (Beastman Background: "gains the BEASTMEN Keyword") | **(TrenchHammer) Faction/type tag. This model is a Chaos-tainted beastman. Referenced by certain Chaos patron abilities and Pirate Crew background interactions.** |
| `SYNAPSE` | Tyranids — multiple units (Hive Tyrant, Neurogaunt, Tyranid Warriors); Hive Mind Patron skill "Synaptic Lynchpin"; Campaign Shop item "Norn Crown" | **(TrenchHammer) This model projects Synapse network. TYRANID models within 6" of a SYNAPSE model are Within Synapse Range and gain +1 DICE to Dash Actions.** |
| `MARKERLIGHT` | T'au Empire — Ethereal keyword list ("ELITE, LEADER, MARKERLIGHT, T'AU"); required by Commander sub-rules; Firesight Drone Controller | **(TrenchHammer) T'au targeting keyword. Instead of attacking, a model with MARKERLIGHT can place a Markerlight token on an enemy. Marked enemies can be hit +1 DICE and their BLOOD MARKERs can be spent by T'au ranged attacks for injury. Tokens are removed at end of Turn.** |
| `KROOT` | T'au Empire — all Kroot unit keyword lists; Kroot-Only battlekit restrictions; Kroothawk Flock equipment; Pirate Crew Kroot Background | **(TrenchHammer) Faction/type sub-tag for T'au Empire. This model is a Kroot warrior. Required for Kroot-only battlekit access.** |
| `ORATOR` | Adeptus Ministorum — drives the Battle Hymns mechanic (only ORATOR models can use hymns); Confessors and Missionaries have this keyword | **(TrenchHammer) Adeptus Ministorum sub-faction tag. This model can lead Battle Hymns. As an Action with a Success Roll, the ORATOR can activate one of its Warband's Battle Hymns for the duration of the game.** |
| `DEATH CULT` | Adeptus Ministorum — Death Cult Assassin unit keyword list ("DRUKHARI, DEATH CULT, INFILTRATOR, STEALTH") | **(TrenchHammer) Adeptus Ministorum sub-faction tag. This model is a member of a Death Cult. Referenced by certain Ministorum abilities and faction interactions.** |

### 3.2 Game Mechanic Keywords Used in Multiple Faction Files

| Missing Entry | Context | Notes |
|---|---|---|
| `VICIOUS 9` | Aeldari Patron "Whispering Web" grants VICIOUS 9 to all attacks against a hit target for that Turn | The `getKeywordDescription()` function uses prefix matching so it falls back to the generic `VICIOUS` entry, but there is no explicit VICIOUS 9 entry for display in the UI |
| `AUTOMATIC 4` | T'au Empire "HO Burst Cannon" has AUTOMATIC 2 (doubled by a patron skill to effectively 4); Necromunda Gang "Da Dead Shiny Shoota" has AUTOMATIC 5 | Same prefix-match fallback issue; explicit entries for 4 and 5 would improve display |
| `AUTOMATIC 5` | Orks "Da Dead Shiny Shoota: 18", AUTOMATIC 5, HEAVY, RISKY" in Campaign Shop | — |

---

## SECTION 4 — Keywords / Rules in `keywordGlossary.ts` with INCORRECT or INCOMPLETE Descriptions

| Keyword | Current Description Issue | Recommended Fix |
|---|---|---|
| `GRENADE` | The description ("Does not count towards ranged weapons a model can carry... Can be used as many times as desired per game") describes the **TC original GRENADE keyword**. In TrenchHammer, per `trenchhammer_changelog.instructions.md`, the GRENADE keyword was **entirely replaced** by IGNORE COVER + IGNORE LONG RANGE on grenade weapons. No TrenchHammer faction file uses the GRENADE keyword on any weapon. The current entry will confuse players. | Add a `(LEGACY — TC 1.0 only)` marker and note: *"In TrenchHammer, the GRENADE Keyword no longer exists on weapons. Thrown grenades instead use IGNORE COVER and IGNORE LONG RANGE. This entry is retained for reference to TC base rules only."* |
| `THROWN` | Current description: "This Battlekit takes up no hands. A model can be equipped with only 1 THROWN piece of Battlekit at a time." This is the TC definition. TrenchHammer extends THROWN to cover reusable non-grenade weapons (Throwing Knives, Javelines, Tri-Blades, Net Bombs, etc.). These items do NOT have CONSUMABLE. The 1-per-model limit still applies, but the "can be used as many times as desired" flavour of the TC grenade rule is gone — instead THROWN weapons simply aren't CONSUMABLE unless stated. | Update: *"(TrenchHammer) This weapon takes up no hands. A model may be equipped with only 1 THROWN Battlekit at a time. Unless also CONSUMABLE, it can be used any number of times. In TrenchHammer, THROWN covers both grenades and non-grenade thrown weapons (knives, javelins, etc.)."* |
| `LARGE` | Current: "Not affected by certain size-restricted abilities or push effects." Vague — doesn't explain what these are. | Update to: *"(TrenchHammer) This model is larger than normal (typically 40mm+ base). LARGE models cannot be moved or pulled by weapon effects or abilities that specify they only affect non-LARGE targets (e.g. Harpoon Launcher pull, Traktor Blasta pull, Toxinjector Harpoon drag)."* |
| `PSYKER` | The entry description says "replaces Ranged or Melee Skill for attacks with PSYCHIC weapons." This is slightly unclear — the PSYKER X value is used **in addition to** (as a +DICE bonus) skill, or **replaces** the skill value for determining hit rolls, depending on interpretation. The wording in `trenchhammer_newkeywords.instructions.md` says "PSYKER X replaces Ranged or Melee Skill value on rolls with PSYCHIC weapons." This should actually say the X value IS the effective skill, not a bonus on top. | Clarify: *"The PSYKER X value replaces the model's Ranged or Melee Skill when making attacks with PSYCHIC weapons (i.e., use X instead of the normal Skill value). X is also treated as the implicit +DICE bonus when using psychic powers."* |
| `STUN` | Current: "This weapon causes a STUN MARKER in addition to the normal Injury Roll result, even if no BLOOD MARKER was gained." Missing that specific weapons can override the STUN quantity. The Neuro Gauntlet (Officio Assassinorum) states: *"causes 2 additional STUN MARKERS instead of 1 due to the STUN Keyword"* — that weapon overrides the quantity. Similarly the Solar Staff (Necrons) description notes "Causes double STUN MARKERS." | Add note: *"Some weapons or abilities may specify a different number of STUN MARKERs than 1. Such values override the default of 1 from this Keyword."* |
| `REGENERATE` | Current uses notation `REGENERATE (X)` but all usages in faction files write it as `REGENERATE 1` (without parentheses). Minor inconsistency. | Change notation to `REGENERATE X` in the description body for consistency. |
| `WHIP` | Current: "This melee weapon can make a ranged attack with a range equal to X inches, using the model's Melee Skill, with IGNORE LONG RANGE. Still counts as a melee weapon for the hands it occupies." Omits the edge-case behaviour of Tyranid tail weapons with WHIP: those can also make an *additional out-of-action-phase fight attack* on the same activation, not just a ranged attack. However that is a Tyranid-specific rule for tail weapons, not the WHIP keyword itself. | No change to definition needed; confirm that Tyranid Tail weapon additional attack rule is a model-specific ability, not part of WHIP keyword itself. |
| `CLEAVE` | Generic description mentions "make X Melee Attacks" but doesn't clarify that unlike SWEEPING, the targets do not auto-attack-all adjacents — you choose each target. | Add clarification: *"Unlike SWEEPING, CLEAVE targets are chosen individually and the weapon is used for each; does not automatically include all adjacent enemies."* |
| `AUTOMATIC` | Generic description says "Attacks can target different models as long as they are all within 6" of each other." The Ork Big Shoota (AUTOMATIC 3, RELOAD) and some other weapons add RELOAD — the current AUTOMATIC entry doesn't note RELOAD interaction. | Minor: add a mention that AUTOMATIC attacks happen one-after-another and each can be resolved with BLOOD/BLESSING MARKERS independently. (The current description says this but could be clearer that each is a separate full attack roll.) |
| `INFECTION MARKER` / `INFECTION MARKERS` | The glossary has both forms (singular and plural) with identical descriptions, plus "(Plural form — same as INFECTION MARKER)" on the plural. | This is intentional dual-entry but the plural note in the description is redundant. Remove the parenthetical from the INFECTION MARKERS entry to avoid confusion. |
| `DEEP STRIKE` | Current says "Cannot score objectives or interact with mission objects on its first Turn." This restriction matches the instructions, but should clarify this refers to any Turn-1 deployment restrictions (the model cannot interact with objectives on the Turn it arrives, regardless of which Turn that is). | Minor: rephrase to "Cannot score objectives or interact with mission objects during the Turn it arrives via Deep Strike." |
| `IMPERVIOUS` | Current: "ARMOUR PIERCING and IGNORE ARMOUR effects do not affect the -INJURY DICE and -INJURY MODIFIERS provided by this piece of Battlekit." The Adeptus Ministorum Battle Hymn "The Emperor Protects" says it grants IMPERVIOUS to ALL models' armour AND *"also allows -DICE even when prevented."* This is a patron bonus beyond the keyword itself, but the keyword entry should note that IMPERVIOUS also prevents effects that would prevent the armour bonus from applying. | Minor clarification: *"...and any effect that would reduce or nullify the bonus from this Battlekit also has no effect while IMPERVIOUS applies."* |

---

## SECTION 5 — Special Weapon Effects Found Only in Specific Weapon/Unit Rules That May Need Glossary Entries

The following are unique weapon effects that appear on specific weapons, are NOT covered by any existing keyword, and appear frequently enough to warrant either a dedicated keyword or at least a glossary note.

### 5.1 "Cannot Apply -DICE to Injury Rolls" Effect
**Found on:** Exitus Rifle & Exitus Pistol (Officio Assassinorum), Apollonian Spear (Adeptus Custodes Campaign Shop), Castigator (Adeptus Ministorum), Shadesword (Heretic Astartes), Fire of Judgement (Astra Militarum), Voidreaper (Necrons), Reaper of Obliterax (Tyranids)

**Issue:** This is a recurring effect on at least 7 weapons across multiple factions. It is currently written as bespoke flavour text on each weapon rather than a shared keyword. If this game effect is common enough to appear on 7+ weapons, it should either:
- Be formalised as a keyword (e.g. `INEVITABLE` or `IMMUTABLE INJURY`) so the glossary can define it once, OR  
- At minimum be noted in the glossary as a named effect that players will encounter

**Recommended:** Add a keyword `INEVITABLE` (or similar) with definition: *"(TrenchHammer) Injury rolls caused by this weapon cannot benefit from any -DICE (from armour, shields, abilities, etc.)."* — then update all 7+ weapon entries to use the keyword.

### 5.2 "Causes Double BLOOD MARKERS"  
**Found on:** Orbs of Unlife (Heretic Astartes), implicitly Macro-Scalpel / Scissorhand (Drukhari — "causes 1 additional BLOOD MARKER if it causes any BLOOD MARKERs")

**Issue:** Two distinct weapon-level effects: (a) flat +1 BLOOD MARKER on any hit, (b) doubling all BLOOD MARKERs caused. These are not formalised as keywords.

**Recommended:** No new keyword needed for (a) — this is already handled by FIRE/GAS/SHRAPNEL mechanics. The specific "+1 BLOOD MARKER if any were caused" is unique to Drukhari weapons and can remain as weapon-specific text. However, Orbs of Unlife's "double BLOOD MARKERS" is unusual and should be noted as weapon-specific.

### 5.3 INFECTION MARKERS from a weapon (not GAS)
**Found on:** Hookfang (Officio Assassinorum) — "GAS, INFECTION MARKERS (including from GAS Keyword)"; Toxic Scythe (Tyranids) — "INFECTION MARKERS, CRITICAL"; Hexrifle (Drukhari) — "INFECTION MARKERS"; Toxic Glands thrown (Tyranids) — "INFECTION MARKERS"; Toxin Sacs equipment (Tyranids) — "melee attacks cause INFECTION MARKERS instead of BLOOD MARKERs"

**Issue:** INFECTION MARKERS as a *weapon keyword* (meaning the weapon causes INFECTION MARKERs instead of / in addition to BLOOD MARKERs) is used across multiple factions. The glossary entry covers INFECTION MARKERs as a *type of token*, but does not explain what it means when INFECTION MARKERS appears as a *weapon keyword* (i.e., on hits, place INFECTION MARKERs instead of the usual BLOOD MARKERs).

**Recommended:** Add a note to the INFECTION MARKERS glossary entry: *"When INFECTION MARKERS appears as a weapon keyword, attacks with that weapon cause INFECTION MARKERs on hits (using GAS/SHRAPNEL/FIRE-like placement rules) instead of causing BLOOD MARKERs through those keywords. This stacks with the spreading mechanic."*

### 5.4 "Set One Die to 6 Before Rolling" (Armour-Override Effect)
**Found on:** Voidblade, Warscythe (Necrons) — "If target has an armour modifier from any source other than a shield, you may set one die of the injury roll to a 6 before the roll."

**Issue:** This is a Necron-specific effect requiring precision understanding. Not a keyword but a unique weapon interaction. Well-documented on the individual weapons. No new keyword needed, but worth noting in the wiki/FAQ.

### 5.5 AMMUNITION Keyword — Confirmed Usages
The `AMMUNITION` keyword entry in the glossary is correct and present. Confirmed usages found in faction files:
- Manstopper Ammunition (Necromunda/Pirate) — AMMUNITION (as-written)  
- Radium Ammunition (Necromunda/Pirate) — AMMUNITION  
- Gitstoppa Rounds (Orks) — not AMMUNITION keyword but a per-battle choice (technically a different mechanic)
- Soul Seeker Ammunition (Drukhari) — `AMMUNITION (IGNORE COVER)` — correctly uses the keyword format per the glossary definition  
- Bio-Explosive Ammunition (Harlequins) — `AMMUNITION (special)` — uses the keyword format with a named special effect  

The Drukhari and Harlequin usage of `AMMUNITION (named-keyword)` format is consistent with the glossary definition. The glossary definition should note that the special keyword applied via AMMUNITION **cannot** already be on the weapon, per the existing restriction.

### 5.6 Pain(X) Token System (Drukhari)
**Found on:** Multiple Drukhari units and abilities throughout the faction file.

**Issue:** Pain tokens are NOT BLOOD MARKERs — they are "from non-ARTIFICIAL enemies." They are a separate economy. The keyword `PAIN` or `PAIN(X)` does not appear in the glossary.

**Recommended:** Add a glossary entry:  
`PAIN(X)`: *"(TrenchHammer — Drukhari) A Drukhari special ability requiring the expenditure of X BLOOD MARKERs from non-ARTIFICIAL enemy models currently on the battlefield. If insufficient BLOOD MARKERs exist on eligible targets, the ability cannot be used."*

### 5.7 Hallucinogen/Forced Movement Effect
**Found on:** Hallucinogen Grenade Launcher (Harlequins), Hallucinogen Grenades, Wraithbone Grenades (Drukhari), Terrorfex Wraithbone profile, The Horror (Tyranid psychic power), Mass Hypnosis / Mind Control / Telepathic Summons (Genestealer Cults / Slanni psychic powers)

**Issue:** Multiple weapons/powers force enemy models to move D3" in a direction. This uses the phrase "counts as a Charge and/or Retreat as appropriate." No keyword formalises this. It is weapon-specific text in each case.

**Recommended:** No new keyword needed — this is a special effect described per-weapon. Worth noting as a recurring pattern in the developer guide.

---

## SUMMARY — Priority Action List

### HIGH PRIORITY (Missing Keywords That Affect Gameplay Logic)

1. **Add `UNDIVIDED`** — Chaos Mark tag, explicitly listed in `trenchhammer_newkeywords.instructions.md` as a faction tag alongside KHORNE/NURGLE/SLAANESH/TZEENTCH. Currently the only Chaos mark not in the glossary.

2. **Add `SYNAPSE`** — Tyranid faction keyword on multiple unit stat blocks; drives the Synapse Range bonus (+1 DICE to Dash). Players need to know what this keyword means.

3. **Add `MARKERLIGHT`** — T'au keyword present in Ethereal's keyword list; the entire "For the Greater Good" T'au special rule hinges on this keyword. Essential for understanding how the faction works.

4. **Fix `GRENADE`** — Mark as legacy/TC-only or update to state that TrenchHammer does not use this keyword (replaced by IGNORE COVER + IGNORE LONG RANGE on all grenade-type weapons).

5. **Fix `THROWN`** — Update description to reflect TH expansion: covers all thrown weapons including non-grenades (knives, javelins, etc.); reusable unless CONSUMABLE.

6. **Add `BEAST`** — Keyword present on Rough Rider Horse (Astra Militarum). Needed for rules interactions that check for BEAST vs VEHICLE vs INFANTRY.

7. **Consider `INEVITABLE` (or similar)** — Formalise the "injury rolls cannot benefit from -DICE" effect found on 7+ weapons. Without a keyword, every weapon that has this effect requires manual rule lookup.

### MEDIUM PRIORITY (Missing Tags That May Drive UI/UX Logic)

8. **Add `KROOT`** — T'au sub-faction tag used on multiple units and as a battlekit access gate.

9. **Add `BEASTMEN`** — Sub-faction tag used in Chaos Cult gifts and Pirate Crew Background.

10. **Add `ORATOR`** — Ministorum keyword driving the Battle Hymn activation system.

11. **Add `DEATH CULT`** — Ministorum sub-faction tag.

12. **Add `PAIN(X)` entry** — Drukhari-specific spending system that is distinct from standard BLOOD MARKER usage.

### LOW PRIORITY (Description Improvements)

13. Update `LARGE` description to specify push/pull immunity semantics.

14. Clarify `PSYKER` definition re: "replaces vs. adds-to" Skill value.

15. Add note to `STUN` re: weapons that override the default STUN MARKER quantity.

16. Standardise `REGENERATE X` notation (remove parentheses from description text).

17. Add `AUTOMATIC 5` and optionally `AUTOMATIC 4` explicit entries.

18. Add `VICIOUS 9` explicit entry for completeness.

19. Clean up `INFECTION MARKERS` plural entry — remove the parenthetical "(Plural form — same as INFECTION MARKER)".

20. Add note to `INFECTION MARKERS` entry explaining its use as a *weapon keyword* (placing markers on hits analogously to GAS/SHRAPNEL).

---

*End of Audit Report — TrenchHammer Beta 1.3.3*
