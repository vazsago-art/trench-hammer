/**
 * Wargear Slot Validation
 *
 * Hand / slot rules (per model):
 *   - Ranged hand pool  : 2 hands (non-thrown ranged weapons only)
 *       TWO-HANDED ranged  → 2 ranged hands
 *       PISTOL             → 1 ranged hand  (one-handed)
 *       NO-HANDS ranged    → 0 ranged hands  (e.g. Cyclone Missile Launcher)
 *   - THROWN slot        : max 1 THROWN weapon; costs 0 ranged/melee hands
 *   - Melee hand pool   : 2 hands (separate from ranged)
 *       TWO-HANDED melee   → 2 melee hands
 *       One-handed melee   → 1 melee hand
 *       MAIN HAND ONLY     → 1 melee hand (must be in primary slot)
 *   - Shield slot       : max 1, blocked if a TWO-HANDED ranged weapon is equipped
 *   - Body-armour slot  : max 1
 *   - Headgear slot     : max 1
 *   - Equipment         : unlimited (unless item has limit: 1)
 *
 * Total weapons: max 4 (2 ranged + 2 melee) plus 1 thrown; thrown is a separate slot.
 */

import { SelectedWargear, Weapon, WargearOption } from '../types/index.js';
import { allWeapons } from './weapons.js';
import { armourOptions, equipmentOptions, allFactionEquipment } from './equipment.js';

// ---------------------------------------------------------------------------
// Item registry – centralised lookup by ID
//
// NOTE: ALL_WEAPONS must include every faction-specific weapon array so that
//       lookupWeapon() and computeSlotUsage() can resolve hand-slot costs for
//       non-shared weapons (Harlequins, Aeldari, Orks, Tau, etc.).
//       Using the canonical `allWeapons` export from weapons.ts guarantees
//       this stays in sync as new factions are added.
// ---------------------------------------------------------------------------

const ALL_WEAPONS: Weapon[] = allWeapons;

const ALL_WARGEAR: WargearOption[] = [
  ...armourOptions,
  ...equipmentOptions,
  ...allFactionEquipment,
];

export function lookupWeapon(id: string): Weapon | undefined {
  return ALL_WEAPONS.find(w => w.id === id);
}

export function lookupWargear(id: string): WargearOption | undefined {
  return ALL_WARGEAR.find(w => w.id === id);
}

export function lookupAnyItem(id: string): Weapon | WargearOption | undefined {
  return lookupWeapon(id) ?? lookupWargear(id);
}

// ---------------------------------------------------------------------------
// Weapon classification helpers
// ---------------------------------------------------------------------------

/** Returns true if this weapon item is a ranged (or thrown/heavy) weapon. */
export function isRangedWeapon(weapon: Weapon): boolean {
  return weapon.type === 'ranged' || weapon.type === 'heavy' || weapon.type === 'thrown';
}

/** Returns true if this weapon item is a melee weapon. */
export function isMeleeWeapon(weapon: Weapon): boolean {
  return weapon.type === 'melee';
}

/**
 * How many hand-slots a weapon consumes in its own pool.
 * Explicit `handedness` field takes priority; otherwise derived from keywords.
 */
export function getWeaponHandedness(weapon: Weapon): 'two-handed' | 'one-handed' | 'no-hands' {
  if (weapon.handedness) return weapon.handedness;
  if (weapon.keywords.includes('TWO-HANDED')) return 'two-handed';
  if (weapon.keywords.includes('NO-HANDS') || weapon.keywords.includes('TAKES NO HANDS'))
    return 'no-hands';
  // Thrown weapons are inherently one-handed
  if (weapon.type === 'thrown' || weapon.keywords.includes('THROWN')) return 'one-handed';
  // PISTOLs are one-handed ranged
  if (weapon.keywords.includes('PISTOL')) return 'one-handed';
  // Everything else defaults to one-handed
  return 'one-handed';
}

/**
 * Hand slots consumed in the ranged pool (0 for melee weapons).
 */
export function getRangedHandCost(weapon: Weapon): number {
  if (!isRangedWeapon(weapon)) return 0;
  // Thrown / grenades are a separate slot — they never consume hand slots
  if (weapon.type === 'thrown' || weapon.keywords.includes('THROWN')) return 0;
  const h = getWeaponHandedness(weapon);
  if (h === 'no-hands') return 0;
  if (h === 'two-handed') return 2;
  return 1;
}

/**
 * Hand slots consumed in the melee pool (0 for ranged weapons).
 */
export function getMeleeHandCost(weapon: Weapon): number {
  if (!isMeleeWeapon(weapon)) return 0;
  const h = getWeaponHandedness(weapon);
  if (h === 'no-hands') return 0;
  if (h === 'two-handed') return 2;
  return 1;
}

// ---------------------------------------------------------------------------
// Slot usage snapshot
// ---------------------------------------------------------------------------

export interface SlotUsage {
  /** Ranged hand slots consumed (max: maxRangedHands) */
  rangedHandsUsed: number;
  /** Max ranged hand slots available (normally 2) */
  maxRangedHands: number;
  /** Melee hand slots consumed (max: maxMeleeHands) */
  meleeHandsUsed: number;
  /** Max melee hand slots available (normally 2) */
  maxMeleeHands: number;
  /** Whether a shield/heavy-shield is equipped */
  hasShield: boolean;
  /** Whether any TWO-HANDED ranged weapon is equipped (blocks shield) */
  hasTwoHandedRanged: boolean;
  /** Whether body armour is equipped */
  hasBodyArmour: boolean;
  /** Number of headgear items equipped (max 1) */
  headgearCount: number;
  /** Whether a thrown/grenade weapon is equipped (max 1 slot, any kind) */
  hasThrownWeapon: boolean;
  /** Whether a MAIN HAND ONLY weapon is currently equipped (max 1 per model) */
  hasMainHandWeapon: boolean;
  /** Ranged weapon count */
  rangedWeaponCount: number;
  /** Melee weapon count */
  meleeWeaponCount: number;
  /**
   * Whether a vehicle mount with allowsShieldComboTwoHanded is equipped.
   * When true, two-handed melee weapons with Shield Combo can be held despite the reduced hand count.
   */
  hasMountShieldCombo: boolean;
}

/**
 * Compute the current slot usage from the list of selected wargear items.
 *
 * @param selectedItems - currently equipped items on the model
 * @param modelKeywords - keywords the model has (STRONG reduces TWO-HANDED melee cost to 1 hand)
 */
export function computeSlotUsage(
  selectedItems: SelectedWargear[],
  modelKeywords: string[] = [],
): SlotUsage {
  // STRONG models can wield TWO-HANDED melee weapons in one hand
  const isStrong = modelKeywords.includes('STRONG');
  const maxRangedHands = 2;
  const maxMeleeHands  = 2;

  let rangedHandsUsed  = 0;
  let meleeHandsUsed   = 0;
  let hasShield        = false;
  let hasTwoHandedRanged = false;
  let hasBodyArmour    = false;
  let headgearCount    = 0;
  let hasThrownWeapon  = false;
  let hasMainHandWeapon = false;
  let rangedWeaponCount = 0;
  let meleeWeaponCount  = 0;
  let hasMountShieldCombo = false;

  for (const item of selectedItems) {
    if (item.type === 'weapon') {
      const weapon = lookupWeapon(item.id);
      if (!weapon) continue;

      if (weapon.type === 'thrown' || weapon.keywords.includes('THROWN')) {
        hasThrownWeapon = true;
      } else if (isRangedWeapon(weapon)) {
        rangedWeaponCount += item.quantity;
        const cost = getRangedHandCost(weapon);
        rangedHandsUsed += cost * item.quantity;
        if (getWeaponHandedness(weapon) === 'two-handed') hasTwoHandedRanged = true;
      } else if (isMeleeWeapon(weapon)) {
        meleeWeaponCount += item.quantity;
        // STRONG models treat TWO-HANDED melee weapons as one-handed
        const rawCost = getMeleeHandCost(weapon);
        const effectiveCost = (isStrong && rawCost === 2) ? 1 : rawCost;
        meleeHandsUsed += effectiveCost * item.quantity;
        if (weapon.isMainHandOnly || weapon.keywords.includes('MAIN HAND ONLY')) {
          hasMainHandWeapon = true;
        }
      }
    } else if (item.type === 'armor') {
      const gear = lookupWargear(item.id);
      if (!gear) continue;

      if (gear.slot === 'shield') {
        hasShield = true;
      } else if (gear.slot === 'body-armour') {
        hasBodyArmour = true;
      }
    } else if (item.type === 'equipment') {
      const gear = lookupWargear(item.id);
      if (!gear) continue;

      if (gear.slot === 'headgear' || gear.keywords.includes('Headgear')) {
        headgearCount++;
      }
      // Mounts (e.g. Astartes Bike) occupy hands: the rider has fewer free hands
      if (gear.occupiesHands && gear.occupiesHands > 0) {
        rangedHandsUsed += gear.occupiesHands;
        meleeHandsUsed  += gear.occupiesHands;
      }
      // Mounted models can hold TWO-HANDED melee weapons with Shield Combo despite reduced hands
      if (gear.allowsShieldComboTwoHanded) {
        hasMountShieldCombo = true;
      }
    }
  }

  return {
    rangedHandsUsed,
    maxRangedHands,
    meleeHandsUsed,
    maxMeleeHands,
    hasShield,
    hasTwoHandedRanged,
    hasBodyArmour,
    headgearCount,
    hasThrownWeapon,
    hasMainHandWeapon,
    rangedWeaponCount,
    meleeWeaponCount,
    hasMountShieldCombo,
  };
}

// ---------------------------------------------------------------------------
// Add-item validation
// ---------------------------------------------------------------------------

export interface WargearSlotError {
  code: string;
  message: string;
}

/**
 * Returns a list of errors if adding `newItem` would violate slot rules,
 * or an empty array if the addition is legal.
 *
 * @param currentItems - already equipped items on the model
 * @param newItemId    - ID of the item the player wants to add
 * @param modelKeywords - keywords on the model (for future expansion)
 */
export function validateAddWargear(
  currentItems: SelectedWargear[],
  newItemId: string,
  modelKeywords: string[] = [],
): WargearSlotError[] {
  const errors: WargearSlotError[] = [];
  const usage = computeSlotUsage(currentItems, modelKeywords);

  // Look up the item being added
  const weapon = lookupWeapon(newItemId);
  const gear   = lookupWargear(newItemId);

  if (!weapon && !gear) {
    // Unknown item – skip validation
    return [];
  }

  // ---- Weapon slot checks -------------------------------------------------
  if (weapon) {
    // Per-weapon quantity limit (e.g. grenades: max 1)
    if (weapon.limit !== undefined) {
      const alreadyEquipped = currentItems.find(i => i.id === newItemId);
      if (alreadyEquipped && alreadyEquipped.quantity >= weapon.limit!) {
        errors.push({
          code: 'WEAPON_LIMIT',
          message: `${weapon.name} can only be equipped ${weapon.limit} time(s) per model.`,
        });
        return errors;
      }
    }

    // Thrown / grenade slot: only ONE grenade of ANY kind per model
    const isThisThrown = weapon.type === 'thrown' || weapon.keywords.includes('THROWN');
    if (isThisThrown) {
      const existingThrown = currentItems.find(i => {
        const w = lookupWeapon(i.id);
        return w && (w.type === 'thrown' || w.keywords.includes('THROWN')) && i.id !== newItemId;
      });
      if (existingThrown) {
        const existingWeapon = lookupWeapon(existingThrown.id);
        errors.push({
          code: 'GRENADE_SLOT_FULL',
          message: `Only 1 grenade/thrown weapon may be equipped. Remove ${existingWeapon?.name ?? existingThrown.id} first.`,
        });
        return errors;
      }
    }

    if (isRangedWeapon(weapon)) {
      const handCost = getRangedHandCost(weapon);
      const isTwo = getWeaponHandedness(weapon) === 'two-handed';

      // Check ranged hands available
      if (handCost > 0 && usage.rangedHandsUsed + handCost > usage.maxRangedHands) {
        if (isTwo) {
          errors.push({
            code: 'NO_RANGED_HANDS_TWO',
            message: `Cannot equip two-handed ranged weapon: only ${usage.maxRangedHands - usage.rangedHandsUsed} ranged hand slot(s) remaining.`,
          });
        } else {
          errors.push({
            code: 'NO_RANGED_HANDS_ONE',
            message: `Cannot equip another one-handed ranged weapon: no ranged hand slots remaining.`,
          });
        }
      }

      // Two-handed ranged blocks further one-handed ranged
      // (thrown / grenades are exempt — they are an independent slot)
      const isThrown = weapon.type === 'thrown' || weapon.keywords.includes('THROWN');
      if (!isTwo && !isThrown && usage.hasTwoHandedRanged) {
        errors.push({
          code: 'TWO_HANDED_RANGED_CONFLICT',
          message: `Cannot equip a one-handed ranged weapon while a two-handed ranged weapon is equipped.`,
        });
      }

      // If adding two-handed ranged, the shield must not already be there
      if (isTwo && usage.hasShield) {
        errors.push({
          code: 'TWO_HANDED_BLOCKS_SHIELD',
          message: `Cannot equip a two-handed ranged weapon while a Shield is equipped. Remove the Shield first.`,
        });
      }
    }

    if (isMeleeWeapon(weapon)) {
      const handCost = getMeleeHandCost(weapon);
      const isTwo = getWeaponHandedness(weapon) === 'two-handed';
      const isMainHandOnly = weapon.isMainHandOnly || weapon.keywords.includes('MAIN HAND ONLY');
      // STRONG models treat TWO-HANDED melee as one-handed (costs only 1 melee hand)
      const isStrong = modelKeywords.includes('STRONG');
      const effectiveHandCost = (isStrong && isTwo) ? 1 : handCost;

      // Only one MAIN HAND ONLY weapon allowed (there is only one main hand)
      if (isMainHandOnly && usage.hasMainHandWeapon) {
        errors.push({
          code: 'MAIN_HAND_ALREADY_USED',
          message: `Only 1 MAIN HAND ONLY weapon can be equipped — the main hand is already occupied.`,
        });
      }

      // Mounted models with Shield Combo can hold a two-handed melee weapon despite 1 occupied hand
      const mountAllowsTwoHanded = isTwo && usage.hasMountShieldCombo;
      if (effectiveHandCost > 0 && usage.meleeHandsUsed + effectiveHandCost > usage.maxMeleeHands && !mountAllowsTwoHanded) {
        if (isTwo && !isStrong) {
          errors.push({
            code: 'NO_MELEE_HANDS_TWO',
            message: `Cannot equip two-handed melee weapon: only ${usage.maxMeleeHands - usage.meleeHandsUsed} melee hand slot(s) remaining.`,
          });
        } else {
          errors.push({
            code: 'NO_MELEE_HANDS_ONE',
            message: `Cannot equip another melee weapon: no melee hand slots remaining.`,
          });
        }
      }
    }
  }

  // ---- Armour / equipment slot checks ------------------------------------
  if (gear) {
    // Shield slot
    if (gear.slot === 'shield') {
      if (usage.hasShield) {
        errors.push({
          code: 'SHIELD_ALREADY_EQUIPPED',
          message: `Only 1 Shield may be equipped.`,
        });
      }
      if (usage.hasTwoHandedRanged) {
        errors.push({
          code: 'SHIELD_BLOCKED_BY_TWO_HANDED_RANGED',
          message: `Cannot equip a Shield while a two-handed ranged weapon is equipped.`,
        });
      }
    }

    // Body armour slot
    if (gear.slot === 'body-armour' && usage.hasBodyArmour) {
      errors.push({
        code: 'ARMOUR_ALREADY_EQUIPPED',
        message: `Only 1 body armour may be equipped. Remove the existing armour first.`,
      });
    }

    // Headgear slot
    if (
      (gear.slot === 'headgear' || gear.keywords.includes('Headgear')) &&
      usage.headgearCount >= 1
    ) {
      errors.push({
        code: 'HEADGEAR_ALREADY_EQUIPPED',
        message: `Only 1 headgear item may be equipped.`,
      });
    }

    // conflictsWith check
    if (gear.conflictsWith) {
      for (const conflictId of gear.conflictsWith) {
        if (currentItems.some(i => i.id === conflictId)) {
          const conflictItem = lookupAnyItem(conflictId);
          errors.push({
            code: 'ITEM_CONFLICT',
            message: `${gear.name} cannot be combined with ${conflictItem?.name ?? conflictId}.`,
          });
        }
      }
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Full loadout validation (for already-selected items)
// ---------------------------------------------------------------------------

export interface LoadoutValidationResult {
  isValid: boolean;
  errors: WargearSlotError[];
  usage: SlotUsage;
  /** Derived keywords that should be added to the model from equipped items */
  grantedKeywords: string[];
}

/**
 * Validate the complete wargear loadout of a model and compute granted keywords.
 */
export function validateLoadout(
  selectedItems: SelectedWargear[],
  modelKeywords: string[] = [],
): LoadoutValidationResult {
  const errors: WargearSlotError[] = [];
  const usage = computeSlotUsage(selectedItems, modelKeywords);

  // Ranged hands overflow
  if (usage.rangedHandsUsed > usage.maxRangedHands) {
    errors.push({
      code: 'RANGED_HANDS_EXCEEDED',
      message: `Ranged hand slots exceeded: ${usage.rangedHandsUsed} / ${usage.maxRangedHands}.`,
    });
  }

  // Melee hands overflow
  if (usage.meleeHandsUsed > usage.maxMeleeHands) {
    errors.push({
      code: 'MELEE_HANDS_EXCEEDED',
      message: `Melee hand slots exceeded: ${usage.meleeHandsUsed} / ${usage.maxMeleeHands}.`,
    });
  }

  // Shield + two-handed ranged conflict
  if (usage.hasShield && usage.hasTwoHandedRanged) {
    errors.push({
      code: 'SHIELD_TWO_HANDED_CONFLICT',
      message: `Shield cannot be equipped alongside a two-handed ranged weapon.`,
    });
  }

  // conflictsWith checks across full loadout
  for (const item of selectedItems) {
    const gear = lookupWargear(item.id);
    if (gear?.conflictsWith) {
      for (const conflictId of gear.conflictsWith) {
        if (selectedItems.some(i => i.id === conflictId)) {
          const conflictItem = lookupAnyItem(conflictId);
          errors.push({
            code: 'ITEM_CONFLICT',
            message: `${gear.name} cannot be combined with ${conflictItem?.name ?? conflictId}.`,
          });
        }
      }
    }
  }

  // Collect granted keywords from all equipped items
  const grantedKeywords: string[] = [];
  for (const item of selectedItems) {
    const anyItem = lookupAnyItem(item.id);
    if (anyItem?.grantsKeywords) {
      for (const kw of anyItem.grantsKeywords) {
        if (!grantedKeywords.includes(kw)) grantedKeywords.push(kw);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    usage,
    grantedKeywords,
  };
}

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------

/** Human-readable summary of current hand usage, e.g. "Ranged: 1/2  Melee: 2/2" */
export function formatSlotSummary(usage: SlotUsage): string {
  return `Ranged: ${usage.rangedHandsUsed}/${usage.maxRangedHands}  ·  Melee: ${usage.meleeHandsUsed}/${usage.maxMeleeHands}`;
}
