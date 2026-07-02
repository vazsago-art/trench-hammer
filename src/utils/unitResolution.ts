import { GIFTS_OF_CHAOS } from '../data/gifts_of_chaos.js';
import { lookupWargear } from '../data/wargearSlotValidation.js';
import type { SelectedWargear, UnitOption, WarbandUnit, WargearOption } from '../types/index.js';

export type ResolvedUnitCore = {
  effectiveStats: {
    movement: number;
    rangedSkill: number;
    meleeSkill: number;
    armourSave: number;
    toughness: number;
  };
  resolvedKeywords: string[];
  activeGifts: NonNullable<ReturnType<typeof resolveUnitCore>['activeGifts']>;
};

export function resolveUnitCore(unitDef: UnitOption, unit: WarbandUnit) {
  const sub = unit.appliedSubType;
  const mods = sub?.statModifiers ?? {};

  const defaultArmourMod = (unitDef.defaultWargear as Array<{ statModifiers?: { armourSave?: number } }> | undefined ?? [])
    .reduce((sum, item) => sum + (item.statModifiers?.armourSave ?? 0), 0);

  const selectedArmourMod = unit.selectedWargear.reduce((sum, sw) => {
    const resolved: WargearOption | undefined = lookupWargear(sw.id);
    return sum + ((resolved as WargearOption & { statModifiers?: { armourSave?: number } })?.statModifiers?.armourSave ?? 0);
  }, 0);

  const hasSelectedBodyArmour = unit.selectedWargear.some(sw => lookupWargear(sw.id)?.slot === 'body-armour');
  const bareArmourSave = (unitDef.stats.armourSave ?? 0) - defaultArmourMod;
  const effectiveBodyArmour = hasSelectedBodyArmour ? selectedArmourMod : defaultArmourMod + selectedArmourMod;

  const wargearMovementOverrideItem = unit.selectedWargear.find(sw => {
    const resolved = lookupWargear(sw.id);
    return (resolved?.movementOverride != null) || (sw.movementOverride != null);
  });
  const wargearMovementOverride = wargearMovementOverrideItem
    ? (lookupWargear(wargearMovementOverrideItem.id)?.movementOverride ?? wargearMovementOverrideItem.movementOverride ?? null)
    : null;

  const wargearMovementBonus = unit.selectedWargear.reduce((sum, sw) => {
    const resolved = lookupWargear(sw.id);
    return sum + (resolved?.statModifiers?.movement ?? sw.statModifiers?.movement ?? 0);
  }, 0);
  const wargearRangedSkillBonus = unit.selectedWargear.reduce((sum, sw) => {
    const resolved = lookupWargear(sw.id);
    return sum + (resolved?.statModifiers?.rangedSkill ?? sw.statModifiers?.rangedSkill ?? 0);
  }, 0);
  const wargearMeleeSkillBonus = unit.selectedWargear.reduce((sum, sw) => {
    const resolved = lookupWargear(sw.id);
    return sum + (resolved?.statModifiers?.meleeSkill ?? sw.statModifiers?.meleeSkill ?? 0);
  }, 0);

  const upgradeMods = (unitDef.upgrades ?? [])
    .filter(upg => ((unit.selectedUpgrades ?? {})[upg.id] ?? 0) > 0)
    .reduce((acc, upg) => {
      const modifier = upg.statModifiers ?? {};
      return {
        movement: (acc.movement ?? 0) + (modifier.movement ?? 0),
        rangedSkill: (acc.rangedSkill ?? 0) + (modifier.rangedSkill ?? 0),
        meleeSkill: (acc.meleeSkill ?? 0) + (modifier.meleeSkill ?? 0),
        armourSave: (acc.armourSave ?? 0) + (modifier.armourSave ?? 0),
      };
    }, {} as Partial<{ movement: number; rangedSkill: number; meleeSkill: number; armourSave: number }>);

  const activeGifts = (unit.selectedGiftsOfChaos ?? []).map(sg => GIFTS_OF_CHAOS.find(g => g.id === sg.id)).filter(Boolean);
  const giftMods = activeGifts.reduce((acc, gift) => {
    const modifier = gift!.statModifiers ?? {};
    return {
      movement: (acc.movement ?? 0) + (modifier.movement ?? 0),
      rangedSkill: (acc.rangedSkill ?? 0) + (modifier.rangedSkill ?? 0),
      meleeSkill: (acc.meleeSkill ?? 0) + (modifier.meleeSkill ?? 0),
      armourSave: (acc.armourSave ?? 0) + (modifier.armourSave ?? 0),
    };
  }, {} as Partial<{ movement: number; rangedSkill: number; meleeSkill: number; armourSave: number }>);

  const effectiveStats = {
    movement: wargearMovementOverride != null
      ? wargearMovementOverride + (giftMods.movement ?? 0)
      : unitDef.stats.movement + (mods.movement ?? 0) + wargearMovementBonus + (upgradeMods.movement ?? 0) + (giftMods.movement ?? 0),
    rangedSkill: unitDef.stats.rangedSkill + (mods.rangedSkill ?? 0) + wargearRangedSkillBonus + (upgradeMods.rangedSkill ?? 0) + (giftMods.rangedSkill ?? 0),
    meleeSkill: unitDef.stats.meleeSkill + (mods.meleeSkill ?? 0) + wargearMeleeSkillBonus + (upgradeMods.meleeSkill ?? 0) + (giftMods.meleeSkill ?? 0),
    armourSave: bareArmourSave + effectiveBodyArmour + (mods.armourSave ?? 0) + (upgradeMods.armourSave ?? 0) + (giftMods.armourSave ?? 0),
    toughness: mods.toughness ?? unitDef.stats.toughness,
  };

  const wargearGrantedKeywords = unit.selectedWargear.flatMap(sw => {
    const resolved = lookupWargear(sw.id);
    return resolved?.grantsKeywords ?? (sw as SelectedWargear & { grantsKeywords?: string[] }).grantsKeywords ?? [];
  });
  const giftGrantedKeywords = activeGifts.flatMap(gift => gift!.grantedKeywords ?? []);
  const baseKeywords = unit.keywords.length > 0 ? unit.keywords : unitDef.keywords;
  const resolvedKeywords = [...new Set([...baseKeywords, ...wargearGrantedKeywords, ...giftGrantedKeywords])];

  return {
    effectiveStats,
    resolvedKeywords,
    activeGifts,
  } as const;
}
