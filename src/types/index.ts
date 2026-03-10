// Core game types for Trench Hammer

/**
 * 'two-handed'  – occupies BOTH hands in its category (ranged or melee)
 * 'one-handed'  – occupies ONE hand in its category
 * 'no-hands'    – special mount / launcher that uses no hand slots (e.g. Cyclone Missile Launcher)
 */
export type WeaponHandedness = 'two-handed' | 'one-handed' | 'no-hands';

export interface Weapon {
  id: string;
  name: string;
  type: 'ranged' | 'melee' | 'thrown' | 'heavy';
  range?: number; // in inches
  cost: number; // cost amount (currency determined by costCurrency)
  costCurrency?: 'credits' | 'glory'; // defaults to 'credits'
  keywords: string[];
  /** How many hand-slots this weapon uses in its category. Derived from keywords if omitted. */
  handedness?: WeaponHandedness;
  /** MAIN HAND ONLY – must go in the primary melee/ranged slot */
  isMainHandOnly?: boolean;
  /** Maximum number of this weapon a model can equip (e.g. 1 for grenades) */
  limit?: number;
  special?: string;
  damage?: number; // INJURY DICE/MODIFIER
  description?: string;
  /** Keywords this weapon grants to the equipped model */
  grantsKeywords?: string[];
}

/**
 * Armour/Equipment slot categories.
 * 'body-armour'  – max 1, mutually exclusive body protection
 * 'shield'       – max 1, HELD off-hand, blocked by two-handed ranged
 * 'headgear'     – max 1, worn on head
 * 'equipment'    – general items; can have multiples unless limit is set
 */
export type WargearSlot = 'body-armour' | 'shield' | 'headgear' | 'equipment' | 'mark';

export interface WargearOption {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'equipment';
  /** Slot category controlling equip limits */
  slot?: WargearSlot;
  cost: number; // cost amount (currency determined by costCurrency)
  costCurrency?: 'credits' | 'glory'; // defaults to 'credits'
  keywords: string[];
  limit?: number; // How many can be taken, e.g., 1 per 5 models
  conflictsWith?: string[]; // IDs of incompatible items
  description?: string;
  /** Keywords this item grants to the equipped model */
  grantsKeywords?: string[];
  /**
   * Stat modifiers applied to the model when this item is equipped.
   * For armour, this drives live recalculation of armourSave displayed in
   * the UnitInfoModal (base stat + sum of all equipped armour modifiers).
   * e.g. Power Armour: { armourSave: -2 }, Shield: { armourSave: -1 }
   */
  statModifiers?: Partial<ModelStats>;
  /**
   * Absolute movement override in inches (e.g. Astartes Bike sets movement to 10" regardless
   * of the unit's base movement). Takes precedence over additive statModifiers.movement.
   */
  movementOverride?: number;
  /**
   * ID of a weapon automatically added as a locked (isDefault) item when this wargear is
   * equipped (e.g. Astartes Bike → Twin Boltgun). Removed when this item is removed.
   */
  grantsBonusWeapon?: string;
  /**
   * Reduces BOTH ranged and melee hand pools by this amount when equipped
   * (e.g. Astartes Bike uses 1 hand to steer, leaving 1 free hand for other weapons).
   */
  occupiesHands?: number;
  /**
   * Whether a model equipped with this item can hold TWO-HANDED weapons despite having only
   * 1 free hand (via Shield Combo rule). E.g. bike riders can still hold Shield Combo weapons.
   */
  allowsShieldComboTwoHanded?: boolean;
  /**
   * Abilities automatically granted to the model when this item is equipped.
   * Each entry is a plain {name, description} object displayed in the unit's ability list.
   */
  grantsAbilities?: Array<{ name: string; description: string }>;
}

export interface ModelStats {
  movement: number; // in inches
  meleeSkill: number; // Skill dice count
  rangedSkill: number; // Skill dice count
  armourSave?: number; // -1, -2, -3, etc.
  toughness?: string; // Keywords like TOUGH, LARGE, etc.
}

/**
 * One selectable sub-type for a unit that requires a type choice on recruitment
 * (e.g. Daemon Prince of Khorne, Sicarian Infiltrator, Gun Drone …).
 */
export interface UnitSubType {
  id: string;
  name: string;           // Full display name, e.g. "Daemon Prince of Khorne"
  description: string;    // Rules text shown in the selection modal
  creditCostModifier: number; // Added to baseCost (may be negative)
  gloryCostModifier?: number;
  grantedKeywords?: string[];  // Keywords added to the unit when this type is chosen
  limit?: number;              // LIMIT:N – max models of this sub-type per warband
  /** Additive stat changes applied on top of the base unit stats (e.g. { movement: 1 } adds +1"). */
  statModifiers?: Partial<ModelStats>;
}

/**
 * A selectable upgrade that changes the role / classification of a model.
 * Upgrades cost additional credits and may grant keywords or abilities.
 * The player picks at most ONE upgrade per model.
 * Examples: Chaos Space Marine → Havoc, Boy → Kommando, Immortal → Deathmark.
 */
export interface UnitUpgrade {
  id: string;
  name: string;
  /** Additional credits cost when this upgrade is applied */
  cost: number;
  /** Rules description displayed to the player */
  description: string;
  /** Max models in a standard warband that can have this upgrade */
  maxCount: number;
  /** Max models in a warband worth 1,200+ credits that can have this upgrade */
  maxCountLarge?: number;
  /** Keywords the model gains when upgraded */
  grantedKeywords?: string[];
  /** Stat changes applied to the model when this upgrade is active (e.g. +1 Melee Skill) */
  statModifiers?: Partial<ModelStats>;
  /**
   * If set, this upgrade is only shown when the warband's selected subfaction matches this ID.
   * Use for subfaction-exclusive upgrades (e.g. Goremonger for World Eaters only).
   */
  requiredSubfactionId?: string;
  /**
   * If set, this upgrade is hidden when the warband's selected subfaction is in this list.
   * Use for upgrades banned by specific subfactions (e.g. Raptor banned for Death Guard and World Eaters).
   */
  forbiddenSubfactionIds?: string[];
}

/**
 * Rule: when the player equips any weapon of `whenAddingWeaponType` to this unit,
 * the default weapon with `replacedDefaultId` is visually marked as "replaced"
 * (it no longer counts for slot usage, and is shown crossed-out in the UI).
 * Removing the last weapon of that type restores the default.
 */
export interface WeaponReplacementRule {
  /** ID of the default weapon that gets replaced */
  replacedDefaultId: string;
  /** Trigger: 'melee' = any added melee weapon triggers the replacement; 'ranged' = ranged */
  whenAddingWeaponType: 'melee' | 'ranged';
}

export interface UnitOption {
  id: string;
  name: string;
  baseCost: number; // Cost per model
  costCurrency?: 'credits' | 'glory'; // defaults to 'credits'; use 'glory' for mercenary units
  minCount: number;
  maxCount: number;
  /** Maximum models allowed when warband is 1,200+ credits (Large warband variant). */
  maxCountLarge?: number;
  stats: ModelStats;
  keywords: string[]; // e.g., [IMPERIUM], [ASTARTES], [LEADER], etc.
  defaultWargear: (Weapon | WargearOption)[];
  availableWargear: (Weapon | WargearOption)[];
  abilities?: Ability[];
  faction: string;
  unitType: 'elite' | 'troop'; // Elite or Troop classification
  description?: string; // Unit fluff/lore
  /** If present the player must pick one of these sub-types when recruiting. */
  unitSubTypes?: UnitSubType[];
  /**
   * Optional rules for automatic default-weapon replacement.
   * When the player adds a weapon matching `whenAddingWeaponType`, the default weapon
   * with `replacedDefaultId` is shown as replaced/crossed-out in the UI.
   */
  weaponReplacementRules?: WeaponReplacementRule[];
  /**
   * When true, the unit cannot be equipped with any additional weapons, armour, or equipment.
   * The Wargear panel will show a notice and hide all equip categories.
   */
  cannotEquip?: boolean;
  /**
   * Optional upgrade choices the player can apply to individual models of this unit.
   * Selecting an upgrade increases the unit cost by the upgrade's cost.
   */
  upgrades?: UnitUpgrade[];
}

/** Category of warband for determining mercenary pool access. */
export type WarbandAlignment = 'imperial' | 'chaos' | 'xenos' | 'outlaw';

/** Basic stat block for a mercenary (simpler than UnitOption.stats). */
export interface MercenaryStats {
  /** e.g. "8\"/Infantry" or "6\"/Flying" */
  movement: string;
  /** e.g. "+2" or "N/A" */
  ranged: string;
  /** e.g. "+2" or "+1" */
  melee: string;
  /** e.g. "0", "-1", "-2" */
  armour: string;
  /** e.g. "32mm", "40mm", "50mm" */
  base: string;
}

/** A weapon / equipment entry in a mercenary's battlekit. */
export interface MercenaryWeapon {
  name: string;
  /** Keywords / profile text, e.g. "CRITICAL, AP1" or "12\", ASSAULT, PISTOL" */
  profile: string;
}

/** A named ability for a mercenary. */
export interface MercenaryAbility {
  name: string;
  description: string;
}

/**
 * A selectable option for a mercenary that must be chosen at recruitment.
 * Examples: Gun Servitor weapon choice, Killa Kan weapon, Daemon Prince mark.
 */
export interface MercenaryRecruitOption {
  id: string;
  /** Short label shown in the selector, e.g. "Heavy Bolter" or "Ordo Malleus" */
  label: string;
  /** One-line description of what this option provides */
  description: string;
  /** Additional glory cost when this option is selected (e.g. +1 for Mortar) */
  gloryCostModifier?: number;
  /**
   * Per-option stat overrides applied on top of the base stats when this option is chosen.
   * Only the specified fields are replaced; others remain from the base.
   */
  statsOverride?: Partial<MercenaryStats>;
  /**
   * When set, completely replaces the mercenary's weapons list when this option is active.
   * Use to show only the weapons relevant to the chosen loadout.
   */
  weaponsOverride?: MercenaryWeapon[];
  /**
   * When set, completely replaces the mercenary's abilities list when this option is active.
   */
  abilitiesOverride?: MercenaryAbility[];
  /**
   * When set, completely replaces the mercenary's psychic powers list when this option is active.
   */
  psychicPowersOverride?: MercenaryAbility[];
  /**
   * Keywords added to the base keyword list when this option is active.
   */
  keywordsAdd?: string[];
}

/** A single mercenary entry in the master catalog. */
export interface Mercenary {
  id: string;
  name: string;
  gloryCost: number;
  /** Additional glory cost for optional variant (e.g. winged Daemon Prince). */
  variantGloryCost?: number;
  variantName?: string;
  /** Mercenary pool that provides this entry. */
  category: WarbandAlignment;
  /** Sub-group label shown in the panel (e.g. "Ecclesiarchy", "Space Marine"). */
  subcategory: string;
  /** Maximum number allowed per warband (default 1). */
  maxCount: number;
  /**
   * If set, only these alignments OR specific 'factionId' OR 'factionId:subfactionId' strings
   * can take this mercenary.  If undefined, all factions of the matching category can take it.
   */
  availableTo?: string[];
  /**
   * Factions/subfactions that CANNOT take this mercenary even if they would otherwise qualify.
   * Values: 'factionId' or 'factionId:subfactionId'.
   */
  unavailableTo?: string[];
  /** If set, the warband leader must carry this keyword to unlock this mercenary. */
  leaderKeywordRequired?: string;
  keywords?: string[];
  description?: string;
  /** Stat block (movement / ranged / melee / armour / base). */
  stats?: MercenaryStats;
  /** Battlekit — weapons and equipment the mercenary carries. */
  weapons?: MercenaryWeapon[];
  /** Special rules / abilities. */
  abilities?: MercenaryAbility[];
  /** Psychic powers (for psyker mercenaries). */
  psychicPowers?: MercenaryAbility[];
  /** Prompt shown when the player must make a recruit-time choice. */
  recruitPrompt?: string;
  /** Mutually-exclusive options the player chooses from when first hiring this mercenary. */
  recruitOptions?: MercenaryRecruitOption[];
  /** Optional upgrades that can be toggled on/off after hiring (e.g. Wings for Daemon Prince). */
  mercUpgrades?: MercenaryUpgrade[];
}

export interface MercenaryUpgrade {
  id: string;
  /** Short display label, e.g. "Wings" */
  label: string;
  /** Full description of what this upgrade does */
  description: string;
  /** Cost in Glory (0 = free) */
  gloryCostModifier: number;
  /** Optional note shown to player (e.g. "NURGLE leader only") */
  condition?: string;
}

/** A mercenary added to the player's warband. */
export interface WarbandMercenary {
  mercenaryId: string;
  name: string;
  gloryCost: number;
  count: number;
  /** Selected recruit option id (only set for mercs that have recruitOptions). */
  selectedRecruitOptionId?: string;
  /** Selected optional upgrade ids (Wings, Plague Ogryn conversion, etc.). */
  selectedUpgrades?: string[];
}

export interface Warband {
  id: string;
  name: string;
  faction: string;
  /** Sub-faction / Warband Variant selected at army creation (e.g. "death_guard" for Heretic Astartes). */
  subfaction?: string;
  /** Display name of the chosen sub-faction (e.g. "Death Guard"). */
  subfactionName?: string;
  patron?: string;
  pointLimit: number;  // Credits limit
  gloryLimit: number;  // Glory limit (0 = no cap on mercenary glory)
  units: WarbandUnit[];
  mercenaries: WarbandMercenary[];
  totalPoints: number;  // Total credits spent
  totalGlory: number;   // Total glory spent on mercenaries
  totalModels: number;
}

// ---------------------------------------------------------------------------
// Elite Progression — XP, Battle Scars, Traumas, Campaign Skills
// ---------------------------------------------------------------------------

export type CampaignSkillTable =
  | 'melee'
  | 'ranged'
  | 'stealth'
  | 'wildcard'
  | 'explorer'
  | 'psychic';

export interface CampaignSkill {
  /** Unique identifier, e.g. "melee_7" */
  id: string;
  /** Source skill table */
  table: CampaignSkillTable;
  /** Dice result that produced this skill (2–12) */
  roll: number;
  /** Skill name, e.g. "Melee Proficiency" */
  name: string;
  /** Full skill description */
  description: string;
}

export interface BattleScar {
  id: string;
  name: string;
  description: string;
}

export interface EliteTrauma {
  id: string;
  name: string;
  description: string;
}

export interface WarbandUnit {
  id: string;
  unitId: string;
  name: string;
  count: number; // How many models in this unit
  baseCostPerModel: number;
  costCurrency: 'credits' | 'glory'; // currency for baseCostPerModel
  selectedWargear: SelectedWargear[];
  /** Psychic powers selected for this unit, keyed by disciplineId */
  selectedPsychicPowers?: SelectedPsychicPower[];
  /** Gifts of Chaos (mutations) selected for this unit — Chaos Cult only */
  selectedGiftsOfChaos?: SelectedGiftOfChaos[];
  totalCost: number;      // total credits spent on this unit (0 if glory unit)
  totalGloryCost: number; // total glory spent on this unit (0 if credits unit)
  keywords: string[];
  unitType: 'elite' | 'troop'; // Elite or Troop classification
  /** Chosen sub-type id, if the unit required a type selection on recruitment */
  selectedSubType?: string;
  /** Display name of the chosen sub-type (e.g. "Daemon Prince of Khorne") */
  subTypeName?: string;
  /** Full sub-type object stored at recruitment time for stat/buff resolution */
  appliedSubType?: UnitSubType;
  /**
   * Upgrades applied to models of this unit.
   * key = upgradeId, value = number of models with this upgrade.
   */
  selectedUpgrades?: Record<string, number>;

  // --- Elite / Promoted progression (campaign tracking) ---
  /** True when a troop-type model has been promoted to Elite status mid-campaign */
  isPromoted?: boolean;
  /**
   * Experience Points earned by this model.
   * Only tracked for Elite models (unitType === 'elite') and promoted models.
   */
  xp?: number;
  /** Campaign Skills gained by this Elite model (rolled from skill tables). */
  campaignSkills?: CampaignSkill[];
  /** Battle Scars suffered by this Elite model. */
  battleScars?: BattleScar[];
  /** Traumas suffered by this Elite model (companion to Battle Scars). */
  traumas?: EliteTrauma[];
}

export interface PsychicPower {
  id: string;
  name: string;
  cost: number;
  costCurrency?: 'credits' | 'glory'; // defaults to 'credits'
  powerType: 'Effect' | 'Attack';
  range: string;
  target: string;
  timing: string;
  description: string;
}

export interface SelectedPsychicPower {
  id: string;
  name: string;
  disciplineId: string;
  disciplineName: string;
  cost: number;
  costCurrency?: 'credits' | 'glory';
}

export interface PsychicDiscipline {
  id: string;
  name: string;
  factionIds: string[]; // factions that have access to this discipline
  powers: PsychicPower[];
}

// ---------------------------------------------------------------------------
// Gifts of Chaos (Chaos Cult mutations)
// ---------------------------------------------------------------------------

export interface GiftOfChaos {
  id: string;
  /** D66 dice result label, e.g. "11-12" or "54" */
  diceResult: string;
  name: string;
  description: string;
  /** Credit cost when purchased during a one-off battle (default: 10) */
  cost: number;
  costCurrency?: 'credits' | 'glory'; // defaults to 'credits'
  /** Keywords granted to the bearer when this mutation is active */
  grantedKeywords?: string[];
  /** Stat modifiers applied to the bearer while this mutation is active */
  statModifiers?: {
    movement?: number;
    rangedSkill?: number;
    meleeSkill?: number;
    armourSave?: number;
  };
}

export interface SelectedGiftOfChaos {
  id: string;
  name: string;
  diceResult: string;
  cost: number;
  costCurrency?: 'credits' | 'glory';
}

export interface SelectedWargear {
  id: string;
  name: string;
  cost: number;
  costCurrency?: 'credits' | 'glory'; // defaults to 'credits'
  type: 'weapon' | 'armor' | 'equipment';
  /** Slot category – carried over from WargearOption for default-replacement tracking */
  slot?: WargearSlot;
  quantity: number;
  /** Keywords granted to the model by this item */
  grantsKeywords?: string[];
  /** True when this item is part of the unit's default/included equipment (baseCost already includes its cost) */
  isDefault?: boolean;
  /** Description text for abilities stored as wargear items (used by isSubfactionRule items) */
  description?: string;
  /**
   * Stat modifiers carried directly on this wargear item (e.g. movement delta for Rubric Marines or
   * Jakhals). Used as a fallback when the item ID is not in the equipment/weapon lookup tables.
   */
  statModifiers?: Partial<ModelStats>;
  /**
   * ID of a default weapon this locked item replaces (e.g. Eightbound Mutated Chainblade replaces
   * 'ha_mutated_claw'). When set, the WargearPanel will show that default weapon as crossed-out.
   */
  replacesDefaultId?: string;
  /**
   * Absolute movement override carried on this selected item (mirrors WargearOption.movementOverride).
   * Used when the item is stored in selectedWargear and needs to override unit movement in resolveUnit.
   */
  movementOverride?: number;
  /**
   * Set on auto-added bonus items (e.g. Twin Boltgun added by Astartes Bike). Points to the parent
   * item's ID. The bonus item is automatically removed when its parent is removed.
   */
  associatedWithId?: string;
  /**
   * True for ability/rule items automatically applied by subfaction rules (e.g. Blood Surge, Eightbound).
   * These are displayed in a separate "Subfaction Rules" section rather than in the wargear list.
   */
  isSubfactionRule?: boolean;
}

export interface Faction {
  id: string;
  name: string;
  keywords: string[];
  color?: string;
  description?: string;
  units: UnitOption[];
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  type: 'passive' | 'action' | 'aura';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  code: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationWarning {
  code: string;
  message: string;
}

export interface GameRules {
  minPointLimit: number;
  maxPointLimit: number;
  minLeaders: number;
  maxLeaders: number;
  minElites: number;
  maxElites: number;
  minTroops: number;
  maxTroops: number;
}

/** State shared between ArmyBuilder (desktop) and MobileApp (mobile/tablet)
 *  so that resizing the window never resets the current warband build. */
export interface SharedWarbandProps {
  selectedFaction: string;
  setSelectedFaction: (v: string) => void;
  selectedSubFaction: string;
  setSelectedSubFaction: (v: string) => void;
  pointLimit: number;
  setPointLimit: (v: number) => void;
  gloryLimit: number;
  setGloryLimit: (v: number) => void;
  warband: Warband;
  setWarband: (v: Warband | ((prev: Warband) => Warband)) => void;
}
