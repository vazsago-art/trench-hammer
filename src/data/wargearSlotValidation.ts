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
 *   - HELD weapons       : permanently occupy hands across BOTH pools
 *       A HELD melee weapon also blocks ranged hands (can't put it down)
 *       A HELD ranged weapon also blocks melee hands
 *       STRONG: can hold a TWO-HANDED HELD weapon in one hand (cross-pool cost = 1)
 *       CUMBERSOME: negates the STRONG exception (always 2 hands)
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

/**
 * For a HELD weapon, returns the number of hands it permanently blocks
 * in the OTHER weapon pool (ranged ↔ melee).
 *
 * HELD = weapon is always carried and cannot be set down.
 * - A 1-hand HELD weapon blocks 1 hand from the opposite pool.
 * - A 2-hand HELD weapon blocks 2 hands from the opposite pool.
 * - STRONG: a model can hold a TWO-HANDED HELD weapon in one hand,
 *   reducing both its own-pool and cross-pool cost to 1.
 * - CUMBERSOME: negates the STRONG exception (always 2 hands).
 *
 * Thrown/grenade weapons are exempt (they are not held permanently).
 */
export function getHeldCrossPoolCost(
  weapon: Weapon,
  isStrong: boolean,
  isSekhetar: boolean = false,
): number {
  if (!weapon.keywords.includes('HELD')) return 0;
  // Thrown weapons are not permanently held
  if (weapon.type === 'thrown' || weapon.keywords.includes('THROWN')) return 0;
  const h = getWeaponHandedness(weapon);
  const rawHands = h === 'two-handed' ? 2 : h === 'one-handed' ? 1 : 0;
  if (rawHands === 0) return 0;
  const isCumbersome = weapon.keywords.includes('CUMBERSOME');
  // STRONG reduces 2H HELD to 1 hand (unless CUMBERSOME or SEKHETAR_ROBOT)
  return (isStrong && !isSekhetar && !isCumbersome && rawHands === 2) ? 1 : rawHands;
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
  /** Whether a Mark of Chaos is equipped (max 1 per model) */
  hasMarkOfChaos: boolean;
  /** Number of HEAVY ranged weapons equipped (for SEKHETAR_ROBOT: max 1) */
  heavyRangedCount: number;
  /** Ranged hands blocked by HELD melee weapons (already included in rangedHandsUsed) */
  heldRangedPenalty: number;
  /** Melee hands blocked by HELD ranged weapons (already included in meleeHandsUsed) */
  heldMeleePenalty: number;
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
  const hasSixArms = modelKeywords.includes('SIX_ARMS');
  const isSekhetar = modelKeywords.includes('SEKHETAR_ROBOT');
  const isDreadnought = modelKeywords.includes('DREADNOUGHT_CHASSIS');
  // Dreadnought uses a weapon-count system (max 2 TWO-HANDED/HEAVY weapons) instead of hand slots.
  // Give it a large hand pool so the normal hand validation never false-fires.
  let maxRangedHands = isDreadnought ? 8 : (hasSixArms ? 6 : 2);
  let maxMeleeHands  = isDreadnought ? 8 : (hasSixArms ? 6 : 2);

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
  let hasMarkOfChaos   = false;
  let heavyRangedCount = 0;
  let heldRangedPenalty = 0;
  let heldMeleePenalty  = 0;

  for (const item of selectedItems) {
    if (item.type === 'weapon') {
      const weapon = lookupWeapon(item.id);
      if (!weapon) continue;

      if (weapon.type === 'thrown' || weapon.keywords.includes('THROWN')) {
        hasThrownWeapon = true;
      } else if (isRangedWeapon(weapon)) {
        rangedWeaponCount += item.quantity;
        const cost = getRangedHandCost(weapon);
        // SEKHETAR_ROBOT: TWO-HANDED ranged weapons cost only 1 hand
        const effectiveCost = (isSekhetar && cost === 2) ? 1 : cost;
        rangedHandsUsed += effectiveCost * item.quantity;
        if (getWeaponHandedness(weapon) === 'two-handed') hasTwoHandedRanged = true;
        // Track HEAVY ranged for SEKHETAR_ROBOT limit
        if (weapon.keywords.includes('HEAVY') || weapon.type === 'heavy') {
          heavyRangedCount += item.quantity;
        }
      } else if (isMeleeWeapon(weapon)) {
        meleeWeaponCount += item.quantity;
        // STRONG models treat TWO-HANDED melee weapons as one-handed
        // SEKHETAR_ROBOT overrides STRONG: cannot hold TWO-HANDED melee in one hand
        const rawCost = getMeleeHandCost(weapon);
        const effectiveCost = (isStrong && !isSekhetar && rawCost === 2) ? 1 : rawCost;
        meleeHandsUsed += effectiveCost * item.quantity;
        if (weapon.isMainHandOnly || weapon.keywords.includes('MAIN HAND ONLY')) {
          hasMainHandWeapon = true;
        }
      }

      // ── HELD weapons permanently occupy hands, blocking the OTHER pool ──
      // A HELD weapon cannot be set down, so the hand(s) holding it are
      // unavailable for the other weapon category (ranged ↔ melee).
      const heldCross = getHeldCrossPoolCost(weapon, isStrong, isSekhetar);
      if (heldCross > 0) {
        if (isMeleeWeapon(weapon)) {
          // HELD melee weapon blocks ranged hands
          rangedHandsUsed   += heldCross * item.quantity;
          heldRangedPenalty  += heldCross * item.quantity;
        } else if (isRangedWeapon(weapon)) {
          // HELD ranged weapon blocks melee hands
          meleeHandsUsed    += heldCross * item.quantity;
          heldMeleePenalty   += heldCross * item.quantity;
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
      if (!gear) {
        // Fallback: check the slot directly on the SelectedWargear item
        if (item.slot === 'mark') hasMarkOfChaos = true;
        continue;
      }

      if (gear.slot === 'headgear' || gear.keywords.includes('Headgear')) {
        headgearCount++;
      }
      if (gear.slot === 'mark') {
        hasMarkOfChaos = true;
      }
      // Mounts (e.g. Astartes Bike) occupy hands: the rider has fewer free hands
      if (gear.occupiesHands && gear.occupiesHands > 0) {
        rangedHandsUsed += gear.occupiesHands;
        meleeHandsUsed  += gear.occupiesHands;
      }
      // Built-In Weapon abilities grant extra ranged slots that don't cost hands
      if (gear.grantsExtraRangedSlots && gear.grantsExtraRangedSlots > 0) {
        maxRangedHands += gear.grantsExtraRangedSlots;
      }
      // Mounted models can hold TWO-HANDED melee weapons with Shield Combo despite reduced hands
      if (gear.allowsShieldComboTwoHanded) {
        hasMountShieldCombo = true;
      }
    }
  }

  // SEKHETAR_ROBOT: each HEAVY ranged weapon blocks 1 melee hand
  if (isSekhetar && heavyRangedCount > 0) {
    maxMeleeHands = Math.max(0, maxMeleeHands - heavyRangedCount);
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
    hasMarkOfChaos,
    heavyRangedCount,
    heldRangedPenalty,
    heldMeleePenalty,
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
  unitCount: number = 1,
  perModelLimits?: Record<string, number>,
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

  // ---- DREADNOUGHT_CHASSIS special rules ----------------------------------
  // The Dreadnought can only be equipped with up to 2 TWO-HANDED or HEAVY weapons
  // (melee or ranged) from the Adeptus Astartes scope. It cannot equip equipment,
  // armour (only the built-in chassis plating is allowed), or thrown weapons.
  if (modelKeywords.includes('DREADNOUGHT_CHASSIS')) {
    // Block any equipment (non-weapon wargear)
    if (gear) {
      errors.push({
        code: 'DREADNOUGHT_NO_GEAR',
        message: `The Dreadnought cannot be equipped with equipment or armour — only TWO-HANDED or HEAVY weapons from the Adeptus Astartes armoury.`,
      });
      return errors;
    }
    if (weapon) {
      // Block thrown weapons
      if (weapon.type === 'thrown' || weapon.keywords.includes('THROWN')) {
        errors.push({
          code: 'DREADNOUGHT_NO_THROWN',
          message: `The Dreadnought cannot be equipped with thrown weapons.`,
        });
        return errors;
      }
      // Only allow TWO-HANDED or HEAVY weapons
      const isEligible =
        weapon.keywords.includes('TWO-HANDED') ||
        weapon.keywords.includes('HEAVY') ||
        weapon.type === 'heavy';
      if (!isEligible) {
        errors.push({
          code: 'DREADNOUGHT_WEAPONS_ONLY',
          message: `The Dreadnought can only be equipped with TWO-HANDED or HEAVY weapons.`,
        });
        return errors;
      }
      // Max 2 qualifying weapons (non-default items only)
      const dreadnoughtWeaponCount = currentItems.filter(i => {
        if (i.isDefault) return false;
        const w = lookupWeapon(i.id);
        return w && (
          w.keywords.includes('TWO-HANDED') ||
          w.keywords.includes('HEAVY') ||
          w.type === 'heavy'
        );
      }).reduce((sum, i) => sum + (i.quantity ?? 1), 0);
      if (dreadnoughtWeaponCount >= 2) {
        errors.push({
          code: 'DREADNOUGHT_WEAPON_LIMIT',
          message: `The Dreadnought can only be equipped with up to 2 TWO-HANDED or HEAVY weapons.`,
        });
        return errors;
      }
    }
    return errors;
  }

  // ---- Weapon slot checks -------------------------------------------------
  if (weapon) {
    // Per-weapon quantity limit (e.g. grenades: max 1)
    // SEKHETAR_ROBOT: Heavy Flamer ignores normal limits
    const ignoreLimitForSekhetar = modelKeywords.includes('SEKHETAR_ROBOT') && newItemId === 'heavy_flamer';
    const effectivePerModelLimit = perModelLimits?.[newItemId] ?? weapon.limit;
    if (effectivePerModelLimit !== undefined && !ignoreLimitForSekhetar) {
      const alreadyEquipped = currentItems.find(i => i.id === newItemId);
      // Multiply per-model limit by unitCount: a 2-model unit can carry weapon.limit copies per model
      if (alreadyEquipped && alreadyEquipped.quantity >= effectivePerModelLimit * unitCount) {
        errors.push({
          code: 'WEAPON_LIMIT',
          message: `${weapon.name} can only be equipped ${effectivePerModelLimit} time(s) per model.`,
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
      const isSekhetar = modelKeywords.includes('SEKHETAR_ROBOT');
      // SEKHETAR_ROBOT: TWO-HANDED ranged costs only 1 hand
      const effectiveHandCost = (isSekhetar && handCost === 2) ? 1 : handCost;
      const isHeavy = weapon.keywords.includes('HEAVY') || weapon.type === 'heavy';

      // SEKHETAR_ROBOT: max 1 HEAVY ranged weapon
      if (isSekhetar && isHeavy && usage.heavyRangedCount >= 1) {
        errors.push({
          code: 'SEKHETAR_HEAVY_LIMIT',
          message: `Sekhetar Robot can only carry 1 HEAVY ranged weapon.`,
        });
      }

      // Check ranged hands available
      if (effectiveHandCost > 0 && usage.rangedHandsUsed + effectiveHandCost > usage.maxRangedHands) {
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

      // SEKHETAR_ROBOT: adding a HEAVY ranged weapon would block 1 melee hand
      if (isSekhetar && isHeavy && usage.heavyRangedCount < 1) {
        const projectedMaxMelee = Math.max(0, usage.maxMeleeHands - 1);
        if (usage.meleeHandsUsed > projectedMaxMelee) {
          errors.push({
            code: 'SEKHETAR_HEAVY_BLOCKS_MELEE',
            message: `Equipping a HEAVY ranged weapon would block a melee hand. Remove a melee weapon first.`,
          });
        }
      }

      // Two-handed ranged blocks further one-handed ranged
      // (thrown / grenades are exempt — they are an independent slot)
      // SEKHETAR_ROBOT can mix one-handed and two-handed ranged freely
      const isThrown = weapon.type === 'thrown' || weapon.keywords.includes('THROWN');
      if (!isSekhetar && !isTwo && !isThrown && usage.hasTwoHandedRanged) {
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

      // HELD ranged weapon cross-pool check: blocks melee hands
      if (weapon.keywords.includes('HELD')) {
        const isStrongModel = modelKeywords.includes('STRONG');
        const heldCross = getHeldCrossPoolCost(weapon, isStrongModel, isSekhetar);
        if (heldCross > 0 && usage.meleeHandsUsed + heldCross > usage.maxMeleeHands) {
          errors.push({
            code: 'HELD_BLOCKS_MELEE',
            message: `This HELD weapon permanently occupies ${heldCross} hand(s), but only ${Math.max(0, usage.maxMeleeHands - usage.meleeHandsUsed)} melee hand slot(s) available.`,
          });
        }
      }
    }

    if (isMeleeWeapon(weapon)) {
      const handCost = getMeleeHandCost(weapon);
      const isTwo = getWeaponHandedness(weapon) === 'two-handed';
      const isMainHandOnly = weapon.isMainHandOnly || weapon.keywords.includes('MAIN HAND ONLY');
      // STRONG models treat TWO-HANDED melee as one-handed (costs only 1 melee hand)
      // SEKHETAR_ROBOT overrides STRONG: cannot hold TWO-HANDED melee in one hand
      const isStrong = modelKeywords.includes('STRONG');
      const isSekhetarMelee = modelKeywords.includes('SEKHETAR_ROBOT');
      const effectiveHandCost = (isStrong && !isSekhetarMelee && isTwo) ? 1 : handCost;

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

      // HELD melee weapon cross-pool check: blocks ranged hands
      if (weapon.keywords.includes('HELD')) {
        const heldCross = getHeldCrossPoolCost(weapon, isStrong, isSekhetarMelee);
        if (heldCross > 0 && usage.rangedHandsUsed + heldCross > usage.maxRangedHands) {
          errors.push({
            code: 'HELD_BLOCKS_RANGED',
            message: `This HELD weapon permanently occupies ${heldCross} hand(s), but only ${Math.max(0, usage.maxRangedHands - usage.rangedHandsUsed)} ranged hand slot(s) available.`,
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

    // Mark of Chaos slot (max 1 per model)
    if (gear.slot === 'mark' && usage.hasMarkOfChaos) {
      errors.push({
        code: 'MARK_ALREADY_EQUIPPED',
        message: `Only 1 Mark of Chaos may be equipped per model.`,
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

  // weapon conflictsWith check (e.g. mutually exclusive drone weapons)
  if (weapon?.conflictsWith) {
    for (const conflictId of weapon.conflictsWith) {
      if (currentItems.some(i => i.id === conflictId)) {
        const conflictItem = lookupAnyItem(conflictId);
        errors.push({
          code: 'ITEM_CONFLICT',
          message: `${weapon.name} cannot be combined with ${conflictItem?.name ?? conflictId}.`,
        });
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
    const weapon = lookupWeapon(item.id);
    if (weapon?.conflictsWith) {
      for (const conflictId of weapon.conflictsWith) {
        if (selectedItems.some(i => i.id === conflictId)) {
          const conflictItem = lookupAnyItem(conflictId);
          errors.push({
            code: 'ITEM_CONFLICT',
            message: `${weapon.name} cannot be combined with ${conflictItem?.name ?? conflictId}.`,
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
