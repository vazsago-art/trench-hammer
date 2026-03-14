import { useRef, useState, type ReactNode } from 'react';
import { Warband, UnitOption, UnitSubType, SelectedWargear, WargearOption, SelectedPsychicPower, SelectedGiftOfChaos, UnitUpgrade, WarbandMercenary, Mercenary, WarbandUnit, MercenaryStats, SharedWarbandProps } from '../types/index.js';
import { getFactionById, allFactions } from '../data/factions_complete.js';
import { calculateWarbandPoints, calculateWarbandGlory, calculateTotalModels, validateWarband } from '../data/validation.js';
import { getAllowedWargearIds } from '../data/faction_wargear.js';
import { validateLoadout } from '../data/wargearSlotValidation.js';
import { lookupWargear, lookupWeapon } from '../data/wargearSlotValidation.js';
import { saveWarbandLocal, exportWarbandToMDFile, importWarbandFromJSON } from '../utils/export.js';
import { exportWarbandToPDF } from '../utils/pdfExport.js';
import { WargearPanel } from './WargearPanel.js';
import { PsychicPanel } from './PsychicPanel.js';
import { MutationsPanel } from './MutationsPanel.js';
import { GIFTS_OF_CHAOS } from '../data/gifts_of_chaos.js';
import { UpgradePanel } from './UpgradePanel.js';
import { UnitInfoModal } from './UnitInfoModal.js';
import { UnitSubTypeModal } from './UnitSubTypeModal.js';
import { SavedArmiesModal } from './SavedArmiesModal.js';
import { KeywordChip, KeywordList } from './KeywordChip.js';
import { getDisciplinesForFaction, factionHasPsychicDisciplines } from '../data/psychicDisciplines.js';
import { factionHasSubFactions, getSubFactions, getSubFactionById, getDefaultSubFactionId } from '../data/subfactions.js';
import MercenaryPanel from './MercenaryPanel.js';
import { MercenaryInfoModal } from './MercenaryInfoModal.js';
import { ALL_MERCENARIES } from '../data/mercenaries.js';
import { EliteProgressionModal } from './EliteProgressionModal.js';
import { isEliteEligible } from '../data/campaignProgression.js';
import { getPatronsForFaction, getPatronById, filterAbilitiesForSubfaction } from '../data/patrons.js';
import { PatronAbilityChip } from './PatronAbilityChip.js';
import { getFactionRules } from '../data/factionRules.js';
import './ArmyBuilder.css';

/** Renders a string with **bold** markdown markers as JSX with <strong> elements. */
function renderFormattedText(text: string): ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export function ArmyBuilder({
  selectedFaction, setSelectedFaction,
  selectedSubFaction, setSelectedSubFaction,
  pointLimit, setPointLimit,
  gloryLimit, setGloryLimit,
  warband, setWarband,
}: SharedWarbandProps) {

  const currentFaction = getFactionById(selectedFaction);
  const currentSubFaction = getSubFactionById(selectedFaction, selectedSubFaction);
  const bannedUnitIdsSet = new Set<string>(currentSubFaction?.bannedUnitIds ?? []);
  const unitMaxCountOverrides = currentSubFaction?.unitMaxCountOverrides ?? {};
  const allAvailableUnits: UnitOption[] = [
    ...(currentFaction?.units.filter(u => !bannedUnitIdsSet.has(u.id)).map(u =>
      unitMaxCountOverrides[u.id] !== undefined
        ? { ...u, maxCount: unitMaxCountOverrides[u.id] }
        : u
    ) ?? []),
    ...(currentSubFaction?.extraUnits ?? []),
  ];
  const validation = validateWarband(warband);
  const totalPoints = calculateWarbandPoints(warband);
  const totalGlory = calculateWarbandGlory(warband);
  const totalModels = calculateTotalModels(warband);

  /** Index of the unit whose wargear panel is open (null = panel closed) */
  const [wargearUnitIdx, setWargearUnitIdx] = useState<number | null>(null);
  /** Index of the unit whose psychic powers panel is open (null = panel closed) */
  const [psychicUnitIdx, setPsychicUnitIdx] = useState<number | null>(null);
  const [mutationUnitIdx, setMutationUnitIdx] = useState<number | null>(null);
  /** Index of the unit whose upgrade panel is open (null = panel closed) */
  const [upgradeUnitIdx, setUpgradeUnitIdx] = useState<number | null>(null);

  /**
   * Unit info modal state.
   * infoUnit  – the UnitOption being shown.
   * infoWargear – if defined, modal shows selected mode (equipped wargear + rules).
   */
  const [infoUnit, setInfoUnit] = useState<UnitOption | null>(null);
  const [infoWargear, setInfoWargear] = useState<SelectedWargear[] | undefined>(undefined);
  const [infoSelectedUpgrades, setInfoSelectedUpgrades] = useState<Record<string, number>>({});
  const [infoPsychicPowers, setInfoPsychicPowers] = useState<SelectedPsychicPower[]>([]);
  const [infoGiftsOfChaos, setInfoGiftsOfChaos] = useState<SelectedGiftOfChaos[]>([]);
  const [infoWarbandUnit, setInfoWarbandUnit] = useState<WarbandUnit | null>(null);

  /** Unit awaiting sub-type selection (null = modal closed) */
  const [pendingSubTypeUnit, setPendingSubTypeUnit] = useState<UnitOption | null>(null);

  // ── Mercenary panel state ───────────────────────────────────────────────
  const [showMercenaryPanel, setShowMercenaryPanel] = useState(false);
  const [infoMercenary, setInfoMercenary] = useState<Mercenary | null>(null);
  const [expandedMercId, setExpandedMercId] = useState<string | null>(null);

  /** Index of unit whose Elite Progression modal is open (null = closed) */
  const [eliteProgressionIdx, setEliteProgressionIdx] = useState<number | null>(null);

  // ── Save / Export / Import / Load state ──────────────────────────────────
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [showNewBuildConfirm, setShowNewBuildConfirm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importPasteText, setImportPasteText] = useState('');
  const importInputRef = useRef<HTMLInputElement>(null);

  const flashMsg = (text: string, ok: boolean) => {
    setSaveMsg({ text, ok });
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const hasUnsavedContent = () =>
    warband.units.length > 0 || warband.name !== 'My Warband';

  const createFreshWarband = () => {
    const defaultFaction = allFactions[0].id;
    const defaultSF = getDefaultSubFactionId(defaultFaction);
    setSelectedFaction(defaultFaction);
    setSelectedSubFaction(defaultSF);
    setPointLimit(700);
    setGloryLimit(0);
    setWarband({
      id: `warband-${Date.now()}`,
      name: 'My Warband',
      faction: defaultFaction,
      pointLimit: 700,
      gloryLimit: 0,
      units: [],
      mercenaries: [],
      totalPoints: 0,
      totalGlory: 0,
      totalModels: 0,
    });
    flashMsg('New build started!', true);
  };

  const handleNewBuild = () => {
    if (hasUnsavedContent()) {
      setShowNewBuildConfirm(true);
    } else {
      createFreshWarband();
    }
  };

  const handleConfirmNewBuild = (saveFirst: boolean) => {
    setShowNewBuildConfirm(false);
    if (saveFirst) saveWarbandLocal(warband);
    createFreshWarband();
    if (saveFirst) flashMsg('Saved! Starting new build…', true);
  };

  const handleSaveLocal = () => {
    saveWarbandLocal(warband);
    flashMsg('Army saved to library!', true);
  };

  const handleExportMD = async () => {
    await exportWarbandToMDFile(warband);
  };

  const handleExportPDF = () => {
    exportWarbandToPDF(warband);
    flashMsg('Generating PDF...', true);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const imported = importWarbandFromJSON(result);
      if (!imported) {
        flashMsg('Import failed: invalid file.', false);
      } else {
        loadWarband(imported);
        setShowImportModal(false);
        flashMsg(`Loaded "${imported.name}" from file.`, true);
      }
    };
    reader.readAsText(file);
    // Reset so the same file can be re-imported
    e.target.value = '';
  };

  // Paste-text import — reliable on all platforms
  const handleImportFromPaste = () => {
    const imported = importWarbandFromJSON(importPasteText);
    if (!imported) {
      flashMsg('Invalid data — check the text and try again.', false);
    } else {
      loadWarband(imported);
      setImportPasteText('');
      setShowImportModal(false);
      flashMsg(`Loaded "${imported.name}"`, true);
    }
  };

  /** Replace the current builder state with a loaded warband. */
  const loadWarband = (wb: Warband) => {
    setSelectedFaction(wb.faction);
    setSelectedSubFaction(wb.subfaction ?? 'no_variant');
    setPointLimit(wb.pointLimit);
    setGloryLimit(wb.gloryLimit);
    setWarband({ ...wb, mercenaries: wb.mercenaries ?? [] });
  };

  /** Update the warband's hired mercenary list. */
  const handleMercenariesChange = (mercs: WarbandMercenary[]) => {
    setWarband(prev => ({ ...prev, mercenaries: mercs }));
  };

  /** Update the glory cap from the mercenary panel. */
  const handleGloryLimitFromPanel = (limit: number) => {
    setGloryLimit(limit);
    setWarband(prev => ({ ...prev, gloryLimit: limit }));
  };

  const handleFactionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFactionId = e.target.value;
    const defaultSF = getDefaultSubFactionId(newFactionId);
    setSelectedFaction(newFactionId);
    setSelectedSubFaction(defaultSF);
    setWarband(prev => ({
      ...prev,
      faction: newFactionId,
      subfaction: defaultSF === 'no_variant' ? undefined : defaultSF,
      subfactionName: undefined,
      patron: undefined,
      units: [], // Clear units when changing faction
      mercenaries: [], // Clear mercenaries when changing faction
    }));
  };

  const handleSubFactionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSubFactionId = e.target.value;
    const sf = getSubFactionById(selectedFaction, newSubFactionId);
    setSelectedSubFaction(newSubFactionId);
    setWarband(prev => ({
      ...prev,
      subfaction: newSubFactionId === 'no_variant' ? undefined : newSubFactionId,
      subfactionName: newSubFactionId === 'no_variant' ? undefined : (sf?.name ?? undefined),
      units: [], // Clear units when changing subfaction
      mercenaries: [], // Clear mercenaries when changing subfaction
    }));
  };

  const handlePointLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setPointLimit(newLimit);
    setWarband(prev => ({
      ...prev,
      pointLimit: newLimit,
    }));
  };

  const handleGloryLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(e.target.value, 10) || 0;
    setGloryLimit(newLimit);
    setWarband(prev => ({
      ...prev,
      gloryLimit: newLimit,
    }));
  };

  const handleAddUnit = (unit: UnitOption) => {
    // If the unit requires a type selection, open the sub-type modal first
    if (unit.unitSubTypes && unit.unitSubTypes.length > 0) {
      setPendingSubTypeUnit(unit);
      return;
    }
    commitAddUnit(unit, null);
  };

  /** Called after sub-type is confirmed (or directly for units with no sub-types). */
  const commitAddUnit = (unit: UnitOption, subType: UnitSubType | null) => {
    const currency = unit.costCurrency ?? 'credits';
    const costMod = subType?.creditCostModifier ?? 0;
    const extraKeywords = subType?.grantedKeywords ?? [];
    const displayName = subType ? subType.name : unit.name;

    // Auto-apply mark for warband variants (e.g. World Eaters → Mark of Khorne)
    const autoMark = currentSubFaction?.autoMark;
    const shouldApplyMark = !!(autoMark && autoMark.eligibleUnitIds.includes(unit.id));
    // Auto-mark cost is added to baseCostPerModel so it scales correctly with unit count
    const markCostBonus = shouldApplyMark ? autoMark!.costOverride : 0;

    // Auto-apply warband modifications (Butcher's Nails, Contagion, Rubric Marines, Jakhals, Eightbound…)
    const matchingMods = (currentSubFaction?.autoModifications ?? []).filter(mod =>
      mod.unitIds.includes(unit.id)
    );
    const modCostBonus = matchingMods.reduce((sum, mod) => sum + (mod.costModifier ?? 0), 0);
    const modKeywords: string[] = matchingMods.flatMap(mod => mod.addKeywords ?? []);

    // Build locked SelectedWargear items from abilities + weapon replacements
    const modWargear: SelectedWargear[] = [];
    for (const mod of matchingMods) {
      // Ability items (locked display). The first ability carries any movementDelta as statModifiers.
      const abilities = mod.addAbilities ?? [];
      for (let i = 0; i < abilities.length; i++) {
        const ability = abilities[i];
        modWargear.push({
          id: ability.id,
          name: ability.name,
          cost: ability.cost,
          description: ability.description,
          costCurrency: 'credits' as const,
          type: 'equipment' as const,
          quantity: 1,
          isDefault: true,
          isSubfactionRule: true,
          // First ability item carries: keyword grants (addKeywords) + stat modifiers — both survive upgrade recompute via wgKw
          grantsKeywords: i === 0 ? (mod.addKeywords ?? []) : [],
          // Attach movementDelta and/or rangedSkillDelta and/or meleeSkillDelta as statModifiers on the first ability item
          ...(i === 0 && (mod.movementDelta != null || mod.rangedSkillDelta != null || mod.meleeSkillDelta != null)
            ? { statModifiers: {
                ...(mod.movementDelta    != null ? { movement:    mod.movementDelta    } : {}),
                ...(mod.rangedSkillDelta != null ? { rangedSkill: mod.rangedSkillDelta } : {}),
                ...(mod.meleeSkillDelta  != null ? { meleeSkill:  mod.meleeSkillDelta  } : {}),
              }}
            : {}),
        });
      }
      // Weapon replacement item (locked, replaces a default weapon)
      if (mod.replaceDefaultWargear) {
        const { removeId, addItem } = mod.replaceDefaultWargear;
        modWargear.push({
          id: addItem.id,
          name: addItem.name,
          cost: addItem.cost,
          costCurrency: 'credits' as const,
          type: 'weapon' as const,
          quantity: 1,
          isDefault: true,
          grantsKeywords: [],
          replacesDefaultId: removeId,
        });
      }
      // If there are no abilities but there IS a stat delta, create a dedicated stat item
      if ((mod.addAbilities ?? []).length === 0 && (mod.movementDelta != null || mod.rangedSkillDelta != null || mod.meleeSkillDelta != null)) {
        const statMods = {
          ...(mod.movementDelta    != null ? { movement:    mod.movementDelta    } : {}),
          ...(mod.rangedSkillDelta != null ? { rangedSkill: mod.rangedSkillDelta } : {}),
          ...(mod.meleeSkillDelta  != null ? { meleeSkill:  mod.meleeSkillDelta  } : {}),
        };
        modWargear.push({
          id: `mod_stat_${unit.id}_${mod.unitIds.join('_')}`,
          name: Object.entries(statMods).map(([k, v]) => `${k} ${(v as number) > 0 ? '+' : ''}${v}`).join(', '),
          cost: 0,
          costCurrency: 'credits' as const,
          type: 'equipment' as const,
          quantity: 1,
          isDefault: true,
          isSubfactionRule: true,
          grantsKeywords: [],
          statModifiers: statMods,
        });
      }
    }

    const effectiveCost = unit.baseCost + costMod + markCostBonus + modCostBonus;
    // Auto-mark wargear entry shown as a locked item (cost: 0 — already in baseCostPerModel)
    const autoMarkWargear: SelectedWargear[] = shouldApplyMark ? [{
      id: autoMark!.markId,
      name: autoMark!.markName,
      cost: 0,
      costCurrency: 'credits' as const,
      type: 'equipment' as const,
      slot: 'mark' as const,
      quantity: 1,
      isDefault: true,
      grantsKeywords: autoMark!.grantedKeywords,
    }] : [];
    const autoMarkKeywords = shouldApplyMark ? autoMark!.grantedKeywords : [];

    const newUnit = {
      id: `unit-${Date.now()}`,
      unitId: unit.id,
      name: displayName,
      count: 1,
      baseCostPerModel: effectiveCost,
      costCurrency: currency,
      selectedWargear: [...autoMarkWargear, ...modWargear],
      totalCost: currency === 'credits' ? effectiveCost : 0,
      totalGloryCost: currency === 'glory' ? effectiveCost : 0,
      keywords: [...new Set([...unit.keywords, ...extraKeywords, ...autoMarkKeywords, ...modKeywords])],
      unitType: unit.unitType,
      selectedSubType: subType?.id,
      subTypeName: subType?.name,
      appliedSubType: subType ?? undefined,
    };
    setWarband(prev => ({ ...prev, units: [...prev.units, newUnit] }));
  };

  /**
   * Build a resolved UnitOption that reflects the chosen sub-type's name,
   * keywords, stat modifiers and rules text, AND the effective armour save
   * from any equipped body-armour / shield in selectedWargear.
   * Used when opening the info modal for a unit already in the warband.
   */
  function buildResolvedUnit(unitDef: UnitOption, warbandUnit: Warband['units'][number]): UnitOption {
    const sub = warbandUnit.appliedSubType;
    const mods = sub?.statModifiers ?? {};

    // Compute the armourSave contributed by the unit's defaultWargear items
    const defaultArmourMod = (unitDef.defaultWargear as Array<{ statModifiers?: { armourSave?: number } }>)
      .reduce((sum, item) => sum + (item.statModifiers?.armourSave ?? 0), 0);

    // Compute the armour+shield contribution from items the player has equipped in the WargearPanel
    const selectedArmourMod = warbandUnit.selectedWargear.reduce((sum, sw) => {
      const resolved: WargearOption | undefined = lookupWargear(sw.id);
      return sum + ((resolved as WargearOption & { statModifiers?: { armourSave?: number } })?.statModifiers?.armourSave ?? 0);
    }, 0);

    // If the player has equipped a body-armour item, it replaces the default armour contribution.
    // Detect whether selectedWargear contains any body-armour slot item.
    const hasSelectedBodyArmour = warbandUnit.selectedWargear.some(sw => {
      const resolved = lookupWargear(sw.id);
      return resolved?.slot === 'body-armour';
    });

    // Base armourSave = stats value minus the default-wargear armour modifier
    const bareArmourSave = (unitDef.stats.armourSave ?? 0) - defaultArmourMod;

    // If the player explicitly equipped a body-armour in their selectedWargear, replace default armour contribution
    const effectiveBodyArmour = hasSelectedBodyArmour
      ? selectedArmourMod           // full override: bare + selected armour + selected shield (all in selectedArmourMod)
      : defaultArmourMod + selectedArmourMod;  // keep default armour, add any extra from selectedWargear (e.g. shield)

    const effectiveArmourSave = bareArmourSave + effectiveBodyArmour + (mods.armourSave ?? 0);

    // Check for movement override from equipped wargear (e.g. Astartes Bike sets movement to 10")
    const movementOverrideItem = warbandUnit.selectedWargear.find(sw => {
      const resolved = lookupWargear(sw.id);
      return (resolved?.movementOverride != null) || (sw.movementOverride != null);
    });
    const wargearMovementOverride = movementOverrideItem
      ? (lookupWargear(movementOverrideItem.id)?.movementOverride ?? movementOverrideItem.movementOverride ?? null)
      : null;

    // Sum any movement bonuses/penalties granted by equipped wargear (e.g. Jump Pack +2")
    // Also reads statModifiers directly from item if lookupWargear returns nothing
    // (used for auto-mod items like Rubric Marines −1" or Jakhals +1").
    const wargearMovementBonus = warbandUnit.selectedWargear.reduce((sum, sw) => {
      const resolved = lookupWargear(sw.id);
      return sum + (resolved?.statModifiers?.movement ?? sw.statModifiers?.movement ?? 0);
    }, 0);
    // Sum any ranged skill bonuses from wargear (e.g. Gal Vorbak +1 Ranged Skill)
    const wargearRangedSkillBonus = warbandUnit.selectedWargear.reduce((sum, sw) => {
      const resolved = lookupWargear(sw.id);
      return sum + (resolved?.statModifiers?.rangedSkill ?? sw.statModifiers?.rangedSkill ?? 0);
    }, 0);

    // Sum any melee skill bonuses from wargear (e.g. Big Muscles automod +1 Melee Skill)
    const wargearMeleeSkillBonus = warbandUnit.selectedWargear.reduce((sum, sw) => {
      const resolved = lookupWargear(sw.id);
      return sum + (resolved?.statModifiers?.meleeSkill ?? sw.statModifiers?.meleeSkill ?? 0);
    }, 0);

    // Aggregate stat modifiers from active upgrades (e.g. Battle Sister Mortisanctus +1M/-1R)
    const upgradeMods = (unitDef.upgrades ?? [])
      .filter(upg => ((warbandUnit.selectedUpgrades ?? {})[upg.id] ?? 0) > 0)
      .reduce((acc, upg) => {
        const m = upg.statModifiers ?? {};
        return {
          movement:    (acc.movement    ?? 0) + (m.movement    ?? 0),
          rangedSkill: (acc.rangedSkill ?? 0) + (m.rangedSkill ?? 0),
          meleeSkill:  (acc.meleeSkill  ?? 0) + (m.meleeSkill  ?? 0),
          armourSave:  (acc.armourSave  ?? 0) + (m.armourSave  ?? 0),
        };
      }, {} as Partial<{ movement: number; rangedSkill: number; meleeSkill: number; armourSave: number }>);

    // Aggregate stat modifiers from active Gifts of Chaos mutations
    const activeGifts = (warbandUnit.selectedGiftsOfChaos ?? []).map(sg => GIFTS_OF_CHAOS.find(g => g.id === sg.id)).filter(Boolean);
    const giftMods = activeGifts.reduce((acc, g) => {
      const m = g!.statModifiers ?? {};
      return {
        movement:    (acc.movement    ?? 0) + (m.movement    ?? 0),
        rangedSkill: (acc.rangedSkill ?? 0) + (m.rangedSkill ?? 0),
        meleeSkill:  (acc.meleeSkill  ?? 0) + (m.meleeSkill  ?? 0),
        armourSave:  (acc.armourSave  ?? 0) + (m.armourSave  ?? 0),
      };
    }, {} as Partial<{ movement: number; rangedSkill: number; meleeSkill: number; armourSave: number }>);

    const effectiveStats = {
      movement:    wargearMovementOverride != null
        ? wargearMovementOverride + (giftMods.movement ?? 0)
        : unitDef.stats.movement    + (mods.movement    ?? 0) + wargearMovementBonus + (upgradeMods.movement ?? 0) + (giftMods.movement ?? 0),
      rangedSkill: unitDef.stats.rangedSkill + (mods.rangedSkill ?? 0) + wargearRangedSkillBonus + (upgradeMods.rangedSkill ?? 0) + (giftMods.rangedSkill ?? 0),
      meleeSkill:  unitDef.stats.meleeSkill  + (mods.meleeSkill  ?? 0) + wargearMeleeSkillBonus + (upgradeMods.meleeSkill ?? 0) + (giftMods.meleeSkill ?? 0),
      armourSave:  effectiveArmourSave + (upgradeMods.armourSave ?? 0) + (giftMods.armourSave ?? 0),
      toughness:   mods.toughness ?? unitDef.stats.toughness,
    };

    // Collect abilities from any selected upgrades
    const upgradeAbilities = (unitDef.upgrades ?? [])
      .filter(upg => ((warbandUnit.selectedUpgrades ?? {})[upg.id] ?? 0) > 0)
      .map(upg => ({
        id: `upgrade-${upg.id}`,
        name: `⬆ ${upg.name}`,
        description: upg.description,
        type: 'passive' as const,
      }));
    // Always use the live warbandUnit.keywords (includes upgrade/wargear grants)
    // Also merge in any keywords granted by currently equipped wargear (e.g. LARGE/VEHICLE from bike)
    const wargearGrantedKeywords = warbandUnit.selectedWargear.flatMap(sw => {
      const resolved = lookupWargear(sw.id);
      return resolved?.grantsKeywords ?? sw.grantsKeywords ?? [];
    });
    // Keywords granted by Gifts of Chaos mutations
    const giftGrantedKeywords = activeGifts.flatMap(g => g!.grantedKeywords ?? []);
    const baseKeywords = warbandUnit.keywords.length > 0 ? warbandUnit.keywords : unitDef.keywords;
    const resolvedKeywords = [...new Set([...baseKeywords, ...wargearGrantedKeywords, ...giftGrantedKeywords])];

    // Collect abilities granted by equipped wargear (e.g. Turbo-Boost from Astartes Bike)
    const wargearGrantedAbilities = warbandUnit.selectedWargear.flatMap(sw => {
      const resolved = lookupWargear(sw.id);
      return (resolved?.grantsAbilities ?? []).map(a => ({
        id:          `wargear-${sw.id}-${a.name.toLowerCase().replace(/\s+/g, '-')}`,
        name:        a.name,
        description: a.description,
        type:        'passive' as const,
      }));
    });

    // Collect subfaction rule abilities from autoMod items stored in selectedWargear
    const subfactionRuleAbilities = warbandUnit.selectedWargear
      .filter(sw => sw.isSubfactionRule && sw.description)
      .map(sw => ({
        id: `subfaction-${sw.id}`,
        name: sw.name,
        description: sw.description!,
        type: 'passive' as const,
      }));

    // Abilities derived from active Gifts of Chaos mutations
    const giftAbilities = activeGifts.map(g => ({
      id: `gift-${g!.id}`,
      name: `☣ ${g!.name}`,
      description: g!.description,
      type: 'passive' as const,
    }));

    if (!sub) {
      return {
        ...unitDef,
        keywords: resolvedKeywords,
        stats: effectiveStats,
        abilities: [...subfactionRuleAbilities, ...upgradeAbilities, ...wargearGrantedAbilities, ...giftAbilities, ...(unitDef.abilities ?? [])],
      };
    }

    const subTypeAbility = {
      id:          `subtype-${sub.id}`,
      name:        sub.name,
      description: sub.description,
      type:        'passive' as const,
    };
    return {
      ...unitDef,
      name:     warbandUnit.subTypeName ?? unitDef.name,
      baseCost: warbandUnit.baseCostPerModel,
      keywords: resolvedKeywords,
      stats:    effectiveStats,
      abilities: [subTypeAbility, ...subfactionRuleAbilities, ...upgradeAbilities, ...wargearGrantedAbilities, ...giftAbilities, ...(unitDef.abilities ?? [])],
    };
  }

  const handleConfirmSubType = (subType: UnitSubType) => {
    if (!pendingSubTypeUnit) return;
    commitAddUnit(pendingSubTypeUnit, subType);
    setPendingSubTypeUnit(null);
  };

  const handleRemoveUnit = (unitIndex: number) => {
    setWarband(prev => ({
      ...prev,
      units: prev.units.filter((_, idx) => idx !== unitIndex),
    }));
  };

  const handleCloneUnit = (unitIndex: number) => {
    setWarband(prev => {
      const source = prev.units[unitIndex];
      const clone = {
        ...source,
        id: `unit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        selectedWargear: source.selectedWargear.map(w => ({ ...w })),
        selectedUpgrades: source.selectedUpgrades ? { ...source.selectedUpgrades } : undefined,
        selectedPsychicPowers: source.selectedPsychicPowers ? [...source.selectedPsychicPowers] : undefined,
        selectedGiftsOfChaos: source.selectedGiftsOfChaos ? [...source.selectedGiftsOfChaos] : undefined,
      };
      return { ...prev, units: [...prev.units, clone] };
    });
  };

  /** Recalculate totals for a unit based on its currency and wargear.
   * @param unitDef When provided, the real cost of a replaced default body-armour is
   *   deducted (it was already included in baseCostPerModel).
   */
  function recalcUnitCosts(
    unit: Warband['units'][number],
    newWargear: SelectedWargear[],
    unitDef?: UnitOption | null,
  ) {
    const currency = unit.costCurrency ?? 'credits';
    const creditWargear = newWargear
      .filter(w => (w.costCurrency ?? 'credits') === 'credits')
      .reduce((sum, w) => sum + w.cost * w.quantity, 0);
    const gloryWargear = newWargear
      .filter(w => w.costCurrency === 'glory')
      .reduce((sum, w) => sum + w.cost * w.quantity, 0);
    const baseCreditCost = currency === 'credits' ? unit.count * unit.baseCostPerModel : 0;
    const baseGloryCost  = currency === 'glory'   ? unit.count * unit.baseCostPerModel : 0;

    // When the user equips a purchased body-armour that replaces the unit's default
    // body-armour (whose real cost is already baked into baseCostPerModel), subtract
    // the real cost of the default armour so it isn't double-counted.
    let defaultArmourOffset = 0;
    if (unitDef) {
      const hasSelectedBodyArmour = newWargear.some(w => lookupWargear(w.id)?.slot === 'body-armour');
      if (hasSelectedBodyArmour) {
        const defaultBodyItem = unitDef.defaultWargear.find(
          item => lookupWargear(item.id)?.slot === 'body-armour',
        );
        if (defaultBodyItem) {
          defaultArmourOffset = -(lookupWargear(defaultBodyItem.id)?.cost ?? 0);
        }
      }
    }

    // Gather keywords granted by the new wargear selection
    const grantedKeywords: string[] = [];
    for (const w of newWargear) {
      if (w.grantsKeywords) {
        for (const kw of w.grantsKeywords) {
          if (!grantedKeywords.includes(kw)) grantedKeywords.push(kw);
        }
      }
    }

    return {
      totalCost:       baseCreditCost + creditWargear + defaultArmourOffset,
      totalGloryCost:  baseGloryCost  + gloryWargear,
      // Merge base unit keywords with wargear-granted keywords
      grantedKeywords,
    };
  }

  /** Add or replace a wargear item on the unit at `unitIndex`. */
  const handleAddWargear = (unitIndex: number, item: SelectedWargear) => {
    setWarband(prev => {
      const updatedUnits = [...prev.units];
      const unit = { ...updatedUnits[unitIndex] };
      // Inject subfaction keyword grants (e.g. Raven Guard + Jump Pack → DEEP STRIKE)
      const sfGrants = currentSubFaction?.wargearKeywordGrants?.[item.id] ?? [];
      const effectiveItem: SelectedWargear = sfGrants.length > 0
        ? { ...item, grantsKeywords: [...(item.grantsKeywords ?? []), ...sfGrants] }
        : item;
      const existing = unit.selectedWargear.findIndex(w => w.id === effectiveItem.id);
      let newWargear: SelectedWargear[];
      if (existing >= 0) {
        newWargear = unit.selectedWargear.map((w, i) => (i === existing ? effectiveItem : w));
      } else {
        newWargear = [...unit.selectedWargear, effectiveItem];
        // Auto-add bonus weapon if the equipped item grants one (e.g. Astartes Bike → Twin Boltgun)
        const gearDef = lookupWargear(effectiveItem.id);
        if (gearDef?.grantsBonusWeapon) {
          const bonusWeapon = lookupWeapon(gearDef.grantsBonusWeapon);
          if (bonusWeapon && !newWargear.some(w => w.id === bonusWeapon.id)) {
            newWargear = [...newWargear, {
              id: bonusWeapon.id,
              name: bonusWeapon.name,
              cost: 0,
              costCurrency: 'credits' as const,
              type: 'weapon' as const,
              quantity: 1,
              isDefault: true,
              grantsKeywords: bonusWeapon.grantsKeywords ?? [],
              associatedWithId: effectiveItem.id,
            }];
          }
        }
      }
      const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
      const calcs = recalcUnitCosts(unit, newWargear, unitDef);
      const psychicCredits = (unit.selectedPsychicPowers ?? []).filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const giftCredits0 = (unit.selectedGiftsOfChaos ?? []).reduce((s, g) => s + g.cost, 0);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => {
        return sum + ((unit.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost;
      }, 0);
      // Recompute live keywords: unitDef base + subtype + wargear grants + upgrade grants
      const baseKw = unitDef?.keywords ?? [];
      const subKw = unit.appliedSubType?.grantedKeywords ?? [];
      const wgKw = newWargear.flatMap(w => w.grantsKeywords ?? []);
      const upgKw = Object.entries(unit.selectedUpgrades ?? {})
        .filter(([, cnt]) => cnt > 0)
        .flatMap(([id]) => unitDef?.upgrades?.find(u => u.id === id)?.grantedKeywords ?? []);
      const newKeywords = [...new Set([...baseKw, ...subKw, ...wgKw, ...upgKw])];
      updatedUnits[unitIndex] = {
        ...unit,
        selectedWargear: newWargear,
        keywords:       newKeywords,
        totalCost:      calcs.totalCost + psychicCredits + giftCredits0 + upgradeCreditCost,
        totalGloryCost: calcs.totalGloryCost,
      };
      return { ...prev, units: updatedUnits };
    });
  };

  /** Remove a wargear item (by id) from the unit at `unitIndex`. */
  const handleRemoveWargear = (unitIndex: number, wargearId: string) => {
    setWarband(prev => {
      const updatedUnits = [...prev.units];
      const unit = { ...updatedUnits[unitIndex] };
      // Guard: never remove pure default wargear (auto-marks, auto-modifications)
      // Items with associatedWithId are bonus items auto-added by another item – only removable
      // indirectly when their parent item is removed, not by direct user action.
      if (unit.selectedWargear.find(w => w.id === wargearId)?.isDefault) return prev;
      // Remove the target item AND any bonus items that were auto-added alongside it
      const newWargear = unit.selectedWargear.filter(
        w => w.id !== wargearId && w.associatedWithId !== wargearId
      );
      const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
      const calcs = recalcUnitCosts(unit, newWargear, unitDef);
      const psychicCredits = (unit.selectedPsychicPowers ?? []).filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const giftCredits1 = (unit.selectedGiftsOfChaos ?? []).reduce((s, g) => s + g.cost, 0);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => {
        return sum + ((unit.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost;
      }, 0);
      // Recompute live keywords after wargear removal
      const baseKw = unitDef?.keywords ?? [];
      const subKw = unit.appliedSubType?.grantedKeywords ?? [];
      const wgKw = newWargear.flatMap(w => w.grantsKeywords ?? []);
      const upgKw = Object.entries(unit.selectedUpgrades ?? {})
        .filter(([, cnt]) => cnt > 0)
        .flatMap(([id]) => unitDef?.upgrades?.find(u => u.id === id)?.grantedKeywords ?? []);
      const newKeywords = [...new Set([...baseKw, ...subKw, ...wgKw, ...upgKw])];
      updatedUnits[unitIndex] = {
        ...unit,
        selectedWargear: newWargear,
        keywords:       newKeywords,
        totalCost:      calcs.totalCost + psychicCredits + giftCredits1 + upgradeCreditCost,
        totalGloryCost: calcs.totalGloryCost,
      };
      return { ...prev, units: updatedUnits };
    });
  };

  /** Add a psychic power to the unit at `unitIndex`. */
  const handleAddPsychicPower = (unitIndex: number, power: SelectedPsychicPower) => {
    setWarband(prev => {
      const updatedUnits = [...prev.units];
      const unit = { ...updatedUnits[unitIndex] };
      const existing = (unit.selectedPsychicPowers ?? []).find(p => p.id === power.id);
      if (existing) return prev; // already added
      const newPowers = [...(unit.selectedPsychicPowers ?? []), power];
      const psychicCredits = newPowers.filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const psychicGlory   = newPowers.filter(p => p.costCurrency === 'glory').reduce((s, p) => s + p.cost, 0);
      const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
      const calcs = recalcUnitCosts(unit, unit.selectedWargear, unitDef);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + ((unit.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost, 0);
      updatedUnits[unitIndex] = {
        ...unit,
        selectedPsychicPowers: newPowers,
        totalCost:      calcs.totalCost + psychicCredits + upgradeCreditCost,
        totalGloryCost: calcs.totalGloryCost + psychicGlory,
      };
      return { ...prev, units: updatedUnits };
    });
  };

  /** Set the count for an upgrade on the unit at `unitIndex`. */
  const handleSetUpgrade = (unitIndex: number, upgradeId: string, count: number) => {
    setWarband(prev => {
      const updatedUnits = [...prev.units];
      const unit = { ...updatedUnits[unitIndex] };
      const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
      const upgrade = unitDef?.upgrades?.find(u => u.id === upgradeId);
      // Upgrades with maxCount >= 10 are "stackable" stat boosts (e.g. Primaris) that
      // can coexist with a class upgrade. Upgrades with maxCount < 10 are mutually exclusive
      // class upgrades (e.g. Assault Marine, Bladeguard) — only one may be active at a time.
      const isStackable = (upgrade?.maxCount ?? 1) >= 10;
      let newUpgrades: Record<string, number>;
      if (isStackable) {
        // Keep everything; only update this one upgrade
        newUpgrades = { ...(unit.selectedUpgrades ?? {}) };
        if (count > 0) newUpgrades[upgradeId] = 1;
        else delete newUpgrades[upgradeId];
      } else {
        // Clear other exclusive (non-stackable) upgrades, but preserve stackable ones
        newUpgrades = {};
        for (const [id, cnt] of Object.entries(unit.selectedUpgrades ?? {})) {
          const existingUpg = unitDef?.upgrades?.find(u => u.id === id);
          if (existingUpg && existingUpg.maxCount >= 10) {
            newUpgrades[id] = cnt; // preserve stackable
          }
        }
        if (count > 0) newUpgrades[upgradeId] = 1;
      }
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => {
        return sum + (newUpgrades[upg.id] ?? 0) * upg.cost;
      }, 0);
      const calcs = recalcUnitCosts(unit, unit.selectedWargear, unitDef);
      const psychicCredits = (unit.selectedPsychicPowers ?? []).filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      // Recompute live keywords from ALL active upgrades
      const baseKw = unitDef?.keywords ?? [];
      const subKw = unit.appliedSubType?.grantedKeywords ?? [];
      const wgKw = unit.selectedWargear.flatMap(w => w.grantsKeywords ?? []);
      const upgKw = Object.entries(newUpgrades)
        .filter(([, cnt]) => cnt > 0)
        .flatMap(([id]) => unitDef?.upgrades?.find(u => u.id === id)?.grantedKeywords ?? []);
      const newKeywords = [...new Set([...baseKw, ...subKw, ...wgKw, ...upgKw])];
      updatedUnits[unitIndex] = {
        ...unit,
        selectedUpgrades: newUpgrades,
        keywords: newKeywords,
        totalCost: calcs.totalCost + psychicCredits + (unit.selectedGiftsOfChaos ?? []).reduce((s, g) => s + g.cost, 0) + upgradeCreditCost,
      };
      return { ...prev, units: updatedUnits };
    });
  };

  /** Add a Gift of Chaos to the unit at `unitIndex`. */
  const handleAddGift = (unitIndex: number, gift: SelectedGiftOfChaos) => {
    setWarband(prev => {
      const updatedUnits = [...prev.units];
      const unit = { ...updatedUnits[unitIndex] };
      const existing = (unit.selectedGiftsOfChaos ?? []).find(g => g.id === gift.id);
      if (existing) return prev;
      const newGifts = [...(unit.selectedGiftsOfChaos ?? []), gift];
      const giftCredits = newGifts.reduce((s, g) => s + g.cost, 0);
      const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
      const calcs = recalcUnitCosts(unit, unit.selectedWargear, unitDef);
      const psychicCredits = (unit.selectedPsychicPowers ?? []).filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + ((unit.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost, 0);
      updatedUnits[unitIndex] = {
        ...unit,
        selectedGiftsOfChaos: newGifts,
        totalCost: calcs.totalCost + psychicCredits + giftCredits + upgradeCreditCost,
      };
      return { ...prev, units: updatedUnits };
    });
  };

  /** Remove a Gift of Chaos (by id) from the unit at `unitIndex`. */
  const handleRemoveGift = (unitIndex: number, giftId: string) => {
    setWarband(prev => {
      const updatedUnits = [...prev.units];
      const unit = { ...updatedUnits[unitIndex] };
      const newGifts = (unit.selectedGiftsOfChaos ?? []).filter(g => g.id !== giftId);
      const giftCredits = newGifts.reduce((s, g) => s + g.cost, 0);
      const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
      const calcs = recalcUnitCosts(unit, unit.selectedWargear, unitDef);
      const psychicCredits = (unit.selectedPsychicPowers ?? []).filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + ((unit.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost, 0);
      updatedUnits[unitIndex] = {
        ...unit,
        selectedGiftsOfChaos: newGifts,
        totalCost: calcs.totalCost + psychicCredits + giftCredits + upgradeCreditCost,
      };
      return { ...prev, units: updatedUnits };
    });
  };

  /** Remove a psychic power (by id) from the unit at `unitIndex`. */
  const handleRemovePsychicPower = (unitIndex: number, powerId: string) => {
    setWarband(prev => {
      const updatedUnits = [...prev.units];
      const unit = { ...updatedUnits[unitIndex] };
      const newPowers = (unit.selectedPsychicPowers ?? []).filter(p => p.id !== powerId);
      const psychicCredits = newPowers.filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const psychicGlory   = newPowers.filter(p => p.costCurrency === 'glory').reduce((s, p) => s + p.cost, 0);
      const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
      const calcs = recalcUnitCosts(unit, unit.selectedWargear, unitDef);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + ((unit.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost, 0);
      const giftCredits3 = (unit.selectedGiftsOfChaos ?? []).reduce((s, g) => s + g.cost, 0);
      updatedUnits[unitIndex] = {
        ...unit,
        selectedPsychicPowers: newPowers,
        totalCost:      calcs.totalCost + psychicCredits + giftCredits3 + upgradeCreditCost,
        totalGloryCost: calcs.totalGloryCost + psychicGlory,
      };
      return { ...prev, units: updatedUnits };
    });
  };

  return (
    <div className="army-builder">
      <header className="builder-header">
        <h1>Trench Hammer - Army Builder</h1>
        <p>Build and validate your warbands</p>
      </header>

      <main className="builder-main">
        <aside className="builder-sidebar">
          <h2>Warband Settings</h2>
          
          <div className="form-group">
            <label htmlFor="faction-select">Faction:</label>
            <select
              id="faction-select"
              value={selectedFaction}
              onChange={handleFactionChange}
            >
              {allFactions.map(faction => (
                <option key={faction.id} value={faction.id}>
                  {faction.name}
                </option>
              ))}
            </select>
          </div>

          {/* Faction Special Rules */}
          {(() => {
            const factionRules = getFactionRules(selectedFaction);
            if (!factionRules) return null;
            return (
              <div className="faction-rules">
                <div className="faction-rules-title">{factionRules.title}</div>
                <ul className="faction-rules-list">
                  {factionRules.rules.map((rule, i) => (
                    <li key={i}>{renderFormattedText(rule)}</li>
                  ))}
                </ul>
              </div>
            );
          })()}

          {factionHasSubFactions(selectedFaction) && (() => {
            const sfData = getSubFactions(selectedFaction);
            const activeSF = sfData?.subFactions.find(sf => sf.id === selectedSubFaction);
            return (
              <>
                <div className="form-group">
                  <label htmlFor="subfaction-select">Warband Variant:</label>
                  <select
                    id="subfaction-select"
                    value={selectedSubFaction}
                    onChange={handleSubFactionChange}
                  >
                    {sfData?.subFactions.map(sf => (
                      <option key={sf.id} value={sf.id}>
                        {sf.name}
                      </option>
                    ))}
                  </select>
                </div>
                {activeSF && (selectedSubFaction !== 'no_variant' || (getSubFactions(selectedFaction)?.required ?? false)) && (
                  <div className="subfaction-rules">
                    <div className="subfaction-desc">{activeSF.description}</div>
                    {activeSF.quote && (
                      <blockquote className="subfaction-quote">{activeSF.quote}</blockquote>
                    )}
                    <ul className="subfaction-rule-list">
                      {activeSF.rules.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            );
          })()}

          {/* Patron selection */}
          {getPatronsForFaction(selectedFaction, selectedSubFaction).length > 0 && (
            <div className="form-group">
              <label htmlFor="patron-select">Patron:</label>
              <select
                id="patron-select"
                value={warband.patron ?? ''}
                onChange={e => setWarband(prev => ({ ...prev, patron: e.target.value || undefined }))}
              >
                <option value="">— None selected —</option>
                {getPatronsForFaction(selectedFaction, selectedSubFaction).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}
          {warband.patron && (() => {
            const p = getPatronById(warband.patron!, selectedFaction);
            if (!p) return null;
            const visibleAbilities = filterAbilitiesForSubfaction(p.abilities, currentSubFaction?.name);
            return (
              <div className="patron-info-panel">
                <div className="patron-info-header">⚜ Patron: {p.name}</div>
                <p className="patron-info-desc">{p.description}</p>
                <ul className="patron-info-skills">
                  {visibleAbilities.map((a, i) => (
                    <li key={i}>
                      <PatronAbilityChip ability={a} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}

          <div className="form-group">
            <label htmlFor="point-limit">Credits Limit:</label>
            <input
              id="point-limit"
              type="number"
              min="200"
              max="2000"
              value={pointLimit}
              onChange={handlePointLimitChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="glory-limit">Glory Limit:</label>
            <input
              id="glory-limit"
              type="number"
              min="0"
              max="100"
              value={gloryLimit}
              onChange={handleGloryLimitChange}
              placeholder="0 = not used"
            />
            <small className="form-hint">Set to 0 to disable Glory tracking</small>
          </div>

          <div className="form-group">
            <label htmlFor="warband-name">Warband Name:</label>
            <input
              id="warband-name"
              type="text"
              value={warband.name}
              onChange={(e) =>
                setWarband(prev => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="summary">
            <h3>Summary</h3>
            {warband.subfactionName && (
              <div className="summary-subfaction">
                <span className="subfaction-badge">{warband.subfactionName}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Credits:</span>
              <span className={totalPoints > pointLimit ? 'error' : 'success'}>
                {totalPoints} / {pointLimit}
              </span>
            </div>
            {(gloryLimit > 0 || totalGlory > 0) && (
              <div className="summary-row">
                <span>Glory:</span>
                {gloryLimit > 0 ? (
                  <span className={totalGlory > gloryLimit ? 'error' : 'success'}>
                    {totalGlory} / {gloryLimit}
                  </span>
                ) : (
                  <span className="warning">{totalGlory} (no cap)</span>
                )}
              </div>
            )}
            {(warband.mercenaries?.length ?? 0) > 0 && (
              <div className="summary-row">
                <span>Mercenaries:</span>
                <span>{warband.mercenaries.reduce((t, m) => t + m.count, 0)} hired</span>
              </div>
            )}
            <div className="summary-row">
              <span>Total Models:</span>
              <span>{totalModels}</span>
            </div>
            <div className="summary-row">
              <span>Units:</span>
              <span>{warband.units.length}</span>
            </div>
          </div>

          {/* ── Save / Export / Import / Load ─────────────────────────── */}
          <div className="army-io">
            <h3>Army Library</h3>
            <div className="army-io-grid">
              <button className="btn-army-io btn-new" onClick={handleNewBuild} title="Start a fresh warband build">
                🆕 New
              </button>
              <button className="btn-army-io btn-save" onClick={handleSaveLocal} title="Save current army to your local library">
                💾 Save
              </button>
              <button className="btn-army-io btn-share" onClick={handleExportMD} title="Share roster as readable Markdown (.md) — includes embedded data for reimport">
                📄 Share .md
              </button>
              <button className="btn-army-io btn-import" onClick={() => setShowImportModal(true)} title="Import a .md or .json army file">
                ⬆ Import
              </button>
              <button className="btn-army-io btn-load" onClick={() => setShowSavedModal(true)} title="Browse your saved armies">
                📂 Library
              </button>
              <button className="btn-army-io btn-pdf" onClick={handleExportPDF} title="Export army as a printable PDF roster">
                🖨 Print PDF
              </button>
            </div>
            {saveMsg && (
              <div className={`army-io-msg ${saveMsg.ok ? 'army-io-ok' : 'army-io-err'}`}>
                {saveMsg.text}
              </div>
            )}
            {/* Hidden file input for import */}
            <input
              ref={importInputRef}
              type="file"
              accept=".md,.json,text/markdown,application/json,text/plain"
              style={{ display: 'none' }}
              onChange={handleImportFile}
            />
          </div>

          <div className="validation-status">
            <h3>Validation</h3>
            {validation.isValid ? (
              <div className="valid">✓ Warband is valid!</div>
            ) : (
              <div className="invalid">
                {validation.errors.map((error, idx) => (
                  <div key={idx} className="error-msg">
                    • {error.message}
                  </div>
                ))}
              </div>
            )}
            {validation.warnings.length > 0 && (
              <div className="warnings">
                {validation.warnings.map((warn, idx) => (
                  <div key={idx} className="warning-msg">
                    ⚠ {warn.message}
                  </div>
                ))}
              </div>
            )}
            {/* Per-unit wargear slot violations */}
            {warband.units.map((unit, _idx) => {
              const loadout = validateLoadout(unit.selectedWargear, unit.keywords);
              if (loadout.isValid) return null;
              return (
                <div key={unit.id} className="warnings">
                  <strong style={{ color: '#e74c3c' }}>{unit.name}:</strong>
                  {loadout.errors.map((e, ei) => (
                    <div key={ei} className="error-msg">• {e.message}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </aside>

        <section className="builder-content">
          <div className="units-panel">
            <h2>Available Units</h2>
            {(['elite', 'troop'] as const).map(category => {
              const categoryUnits = allAvailableUnits.filter(u => u.unitType === category);
              if (categoryUnits.length === 0) return null;
              return (
                <div key={category} className="unit-category-section">
                  <h3 className="unit-category-header">
                    {category === 'elite' ? 'Elites' : 'Troops'}
                  </h3>
                  <div className="units-grid">
                    {categoryUnits.map(unit => (
                      <div key={unit.id} className="unit-card">
                        <div className="unit-card-title-row">
                          <h4>{unit.name}</h4>
                          <button
                            className="btn-unit-info"
                            title={`View ${unit.name} details`}
                            onClick={() => { setInfoUnit(unit); setInfoWargear(undefined); setInfoWarbandUnit(null); }}
                          >👁</button>
                        </div>
                        <div className="unit-info">
                          <p>
                            <strong>Cost:</strong> {unit.baseCost}{' '}
                            {unit.costCurrency === 'glory' ? 'Glory' : 'Credits'}/model
                          </p>
                          <p><strong>Limit:</strong> {unit.maxCount >= 99 ? 'N/A' : `${unit.minCount}–${unit.maxCount}`}</p>
                          <p className="keywords">
                            <KeywordList keywords={unit.keywords} hide={new Set()} />
                          </p>
                        </div>
                        {(() => {
                          const currentCount = warband.units.filter(u => u.unitId === unit.id).length;
                          const atLimit = currentCount >= unit.maxCount;
                          return (
                            <button
                              onClick={() => handleAddUnit(unit)}
                              className="btn-add-unit"
                              disabled={atLimit}
                              title={atLimit ? `Limit reached (${unit.maxCount})` : undefined}
                            >
                              {(() => { const cap = unit.maxCount >= 99 ? '∞' : unit.maxCount; return atLimit ? `Limit (${currentCount}/${cap})` : `Add Unit (${currentCount}/${cap})`; })()}
                            </button>
                          );
                        })()}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="selected-units-panel">
            <div className="selected-units-header-row">
              <h2>Selected Units</h2>
              <button
                className="btn-hire-mercenaries"
                onClick={() => setShowMercenaryPanel(true)}
                title="Hire mercenaries (paid in Glory)"
              >
                ⚔ Hire Mercenaries{(warband.mercenaries?.length ?? 0) > 0 ? ` (${warband.mercenaries.reduce((t, m) => t + m.count, 0)} hired)` : ''}
              </button>
            </div>
            {warband.units.length === 0 ? (
              <p className="empty-state">No units selected. Add units from the left.</p>
            ) : (
              <div className="selected-units-list">
                {[...warband.units]
                  .map((unit, origIdx) => ({ unit, idx: origIdx }))
                  .sort((a, b) => {
                    const order: Record<string, number> = { elite: 0, troop: 1 };
                    return (order[a.unit.unitType] ?? 1) - (order[b.unit.unitType] ?? 1);
                  })
                  .map(({ unit, idx }) => (
                  <div key={unit.id} className="selected-unit">
                    <div className="unit-header">
                      <h4>{unit.name}</h4>
                      <span className="unit-cost">
                        {(unit.costCurrency ?? 'credits') === 'glory'
                          ? `${unit.totalGloryCost} Glory`
                          : `${unit.totalCost} Credits`}
                      </span>
                      {/* Psyker validation: warn if unit has PSYKER X (X≥1) but no powers selected */}
                      {factionHasPsychicDisciplines(selectedFaction) &&
                        unit.keywords.some(k => { const m = k.match(/^PSYKER (\d+)$/); return m != null && parseInt(m[1]) >= 1; }) &&
                        (unit.selectedPsychicPowers ?? []).length === 0 && (
                        <span className="psyker-warning-badge" title="This psyker must have at least one psychic power selected.">
                          ⚠ Needs Power
                        </span>
                      )}
                      {isEliteEligible(unit) && (
                        <button
                          className="btn-elite-xp"
                          title={`Campaign progression for ${unit.name} (XP: ${unit.xp ?? 0})`}
                          onClick={() => setEliteProgressionIdx(idx)}
                        >
                          ★ XP: {unit.xp ?? 0}
                        </button>
                      )}
                      <button
                        className="btn-unit-info"
                        title={`View ${unit.name} details`}
                        onClick={() => {
                          const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
                          if (unitDef) { setInfoUnit(buildResolvedUnit(unitDef, unit)); setInfoWargear(unit.selectedWargear); setInfoSelectedUpgrades(unit.selectedUpgrades ?? {}); setInfoPsychicPowers(unit.selectedPsychicPowers ?? []); setInfoGiftsOfChaos(unit.selectedGiftsOfChaos ?? []); setInfoWarbandUnit(unit); }
                        }}
                      >👁</button>
                    </div>
                    {/* Sub-type applied badge + stat buffs + granted keywords */}
                    {unit.appliedSubType && (
                      <div className="selected-unit-subtype">
                        <span className="subtype-applied-badge">{unit.appliedSubType.name}</span>
                        {unit.appliedSubType.statModifiers && Object.keys(unit.appliedSubType.statModifiers).length > 0 && (
                          <span className="subtype-stat-pills">
                            {unit.appliedSubType.statModifiers.movement != null && (
                              <span className="subtype-stat-pill">MOV {unit.appliedSubType.statModifiers.movement > 0 ? '+' : ''}{unit.appliedSubType.statModifiers.movement}&quot;</span>
                            )}
                            {unit.appliedSubType.statModifiers.meleeSkill != null && (
                              <span className="subtype-stat-pill">MELEE {unit.appliedSubType.statModifiers.meleeSkill > 0 ? '+' : ''}{unit.appliedSubType.statModifiers.meleeSkill}</span>
                            )}
                            {unit.appliedSubType.statModifiers.rangedSkill != null && (
                              <span className="subtype-stat-pill">RANGED {unit.appliedSubType.statModifiers.rangedSkill > 0 ? '+' : ''}{unit.appliedSubType.statModifiers.rangedSkill}</span>
                            )}
                            {unit.appliedSubType.statModifiers.armourSave != null && (
                              <span className="subtype-stat-pill">ARMOUR {unit.appliedSubType.statModifiers.armourSave > 0 ? '+' : ''}{unit.appliedSubType.statModifiers.armourSave}</span>
                            )}
                          </span>
                        )}
                        {unit.appliedSubType.grantedKeywords && unit.appliedSubType.grantedKeywords.length > 0 && (
                          <span className="subtype-granted-kws">
                            {unit.appliedSubType.grantedKeywords.map(kw => (
                              <KeywordChip key={kw} keyword={kw} className="subtype-kw-chip" />
                            ))}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="unit-body">
                      <button
                        className="btn-wargear"
                        onClick={() => setWargearUnitIdx(idx)}
                        title="Open wargear upgrade panel"
                      >
                        ⚙ Wargear
                      </button>
                      {(() => {
                        const unitDef2 = allAvailableUnits.find(u => u.id === unit.unitId);
                        const visibleUpgrades = (unitDef2?.upgrades ?? []).filter(upg =>
                          (!upg.requiredSubfactionId || upg.requiredSubfactionId === selectedSubFaction) &&
                          (!upg.forbiddenSubfactionIds || !upg.forbiddenSubfactionIds.includes(selectedSubFaction))
                        );
                        const hasAutoTiers = unit.selectedWargear.some(sw => sw.isSubfactionRule && sw.description);
                        return (visibleUpgrades.length > 0 || hasAutoTiers) ? (
                          <button
                            className="btn-upgrade"
                            onClick={() => setUpgradeUnitIdx(idx)}
                            title="Open unit upgrades panel"
                          >
                            ⬆ Upgrades
                          </button>
                        ) : null;
                      })()}
                      {factionHasPsychicDisciplines(selectedFaction) && unit.keywords.some(k => k.startsWith('PSYKER')) && (
                        <button
                          className="btn-psychic"
                          onClick={() => setPsychicUnitIdx(idx)}
                          title="Open psychic powers panel"
                        >
                          🔮 Psychic
                        </button>
                      )}
                      {selectedFaction === 'chaos_cult' && (
                        <button
                          className="btn-mutations"
                          onClick={() => setMutationUnitIdx(idx)}
                          title={(unit.selectedGiftsOfChaos?.length ?? 0) > 0
                            ? `Mutations: ${unit.selectedGiftsOfChaos!.map(g => g.name).join(', ')}`
                            : 'Open Gifts of Chaos mutations panel'}
                        >
                          ☠ Mutations{(unit.selectedGiftsOfChaos?.length ?? 0) > 0 ? ` (${unit.selectedGiftsOfChaos!.length})` : ''}
                        </button>
                      )}
                      {(() => {
                        const unitDef3 = allAvailableUnits.find(u => u.id === unit.unitId);
                        const currentCount = warband.units.filter(u => u.unitId === unit.unitId).length;
                        const atMax = !!unitDef3 && currentCount >= unitDef3.maxCount;
                        return (
                          <div className="unit-actions-right">
                            <button
                              className="btn-clone"
                              title={atMax ? `Limit reached (${currentCount}/${unitDef3?.maxCount})` : 'Clone this unit with all its configuration'}
                              disabled={atMax}
                              onClick={() => handleCloneUnit(idx)}
                            >
                              ⧉ Clone
                            </button>
                            <button
                              onClick={() => handleRemoveUnit(idx)}
                              className="btn-remove"
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                    {/* Wargear summary: default (included) items first, then purchased upgrades */}
                    {(() => {
                      const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
                      const defItems = unitDef?.defaultWargear ?? [];
                      const selItems = unit.selectedWargear;
                      const psychicItems = unit.selectedPsychicPowers ?? [];
                      if (defItems.length === 0 && selItems.length === 0 && psychicItems.length === 0) return null;
                      return (
                        <div className="unit-wargear-summary">
                          {defItems
                            .filter(item => {
                              // 1. Explicit replacesDefaultId
                              if (selItems.some(sel => sel.replacesDefaultId === item.id)) return false;
                              // 2. Slot-based replacement (e.g. Terminator Armour replaces Power Armour)
                              const defSlot = (item as WargearOption).slot ?? lookupWargear(item.id)?.slot;
                              if (defSlot && selItems.some(sel =>
                                (sel.slot ?? lookupWargear(sel.id)?.slot) === defSlot)) return false;
                              // 3. weaponReplacementRules (e.g. adding any melee weapon replaces default fists/claws)
                              const wrRules = unitDef?.weaponReplacementRules ?? [];
                              const wrRule = wrRules.find(r => r.replacedDefaultId === item.id);
                              if (wrRule) {
                                const replaced = selItems.some(sel => {
                                  const wp = lookupWeapon(sel.id);
                                  if (wp) return wp.type === wrRule.whenAddingWeaponType;
                                  // Fallback: if weapon not in registry, match by SelectedWargear type
                                  // and the replaced item's own type
                                  return sel.type === 'weapon'
                                    && (item as { type?: string }).type === wrRule.whenAddingWeaponType;
                                });
                                if (replaced) return false;
                              }
                              return true;
                            })
                            .map(item => (
                              <span key={item.id} className="wargear-tag wargear-tag-default">
                                🔒 {item.name}
                              </span>
                            ))}
                          {selItems.filter(w => w.isSubfactionRule).map(w => (
                            <span key={w.id} className="wargear-tag wargear-tag-rule" title={w.name}>
                              ⚡ {w.name}
                            </span>
                          ))}
                          {selItems.filter(w => !w.isSubfactionRule).map(w => (
                            <span key={w.id} className="wargear-tag">
                              {w.name}{w.quantity > 1 ? ` ×${w.quantity}` : ''}{' '}
                              ({w.cost * w.quantity}{w.costCurrency === 'glory' ? ' Glory' : ' Credits'})
                            </span>
                          ))}
                          {psychicItems.map(p => (
                            <span key={p.id} className="psychic-tag">
                              🔮 {p.name}{' '}
                              ({p.cost}{p.costCurrency === 'glory' ? ' Glory' : ' Credits'})
                            </span>
                          ))}
                          {(() => {
                            const unitDefU = allAvailableUnits.find(u => u.id === unit.unitId);
                            const upgrades = unitDefU?.upgrades ?? [];
                            const selUpg = unit.selectedUpgrades ?? {};
                            return Object.entries(selUpg).map(([uid, cnt]) => {
                              if (cnt <= 0) return null;
                              const upg = upgrades.find((u: UnitUpgrade) => u.id === uid);
                              if (!upg) return null;
                              return (
                                <span key={uid} className="upgrade-tag" title={upg.description}>
                                  ⬆ {upg.name}{upg.cost > 0 ? ` (+${upg.cost} Cr)` : ''}
                                  {upg.grantedKeywords?.map(kw => (
                                    <span key={kw} className="upgrade-tag-kw">{kw}</span>
                                  ))}
                                </span>
                              );
                            });
                          })()}
                        </div>
                      );
                    })()}
                  </div>
                ))}
              </div>
            )}
            {/* ── Hired Mercenaries ── */}
            {(warband.mercenaries?.length ?? 0) > 0 && (
              <div className="hired-mercenaries-section">
                <h3 className="hired-mercs-title">⚔ Hired Mercenaries</h3>
                <div className="selected-units-list">
                  {warband.mercenaries.map((merc) => {
                    const def = ALL_MERCENARIES.find((m) => m.id === merc.mercenaryId);
                    const chosenOpt = def?.recruitOptions?.find((o) => o.id === merc.selectedRecruitOptionId);
                    const hasUpgrades = (def?.mercUpgrades?.length ?? 0) > 0;
                    const isExpanded = expandedMercId === merc.mercenaryId;
                    const selectedUpgrades = merc.selectedUpgrades ?? [];

                    const totalGlory = merc.gloryCost + selectedUpgrades.reduce((sum, uid) => {
                      const upg = def?.mercUpgrades?.find((u) => u.id === uid);
                      return sum + (upg?.gloryCostModifier ?? 0);
                    }, 0);

                    const effectiveMerc = def && chosenOpt
                      ? {
                          ...def,
                          stats: chosenOpt.statsOverride ? { ...def.stats, ...chosenOpt.statsOverride } as MercenaryStats : def.stats,
                          weapons: chosenOpt.weaponsOverride ?? def.weapons,
                          abilities: chosenOpt.abilitiesOverride ?? def.abilities,
                          psychicPowers: chosenOpt.psychicPowersOverride ?? def.psychicPowers,
                          keywords: chosenOpt.keywordsAdd ? [...(def.keywords ?? []), ...chosenOpt.keywordsAdd] : def.keywords,
                        }
                      : def;

                    return (
                      <div key={merc.mercenaryId} className={`selected-unit merc-hired-row${isExpanded ? ' expanded' : ''}`}>
                        <div className="unit-header">
                          <h4>
                            {merc.name}{merc.count > 1 ? ` ×${merc.count}` : ''}
                            {chosenOpt && <span className="merc-option-label"> ({chosenOpt.label})</span>}
                            {selectedUpgrades.map(uid => {
                              const u = def?.mercUpgrades?.find(x => x.id === uid);
                              return u ? <span key={uid} className="merc-upgrade-badge"> +{u.label}</span> : null;
                            })}
                          </h4>
                          <span className="unit-cost merc-glory-tag">{totalGlory * merc.count} Glory</span>
                          {(def?.recruitOptions?.length || hasUpgrades) && (
                            <button
                              className={`btn-merc-options${isExpanded ? ' active' : ''}`}
                              title="Options &amp; Upgrades"
                              onClick={() => setExpandedMercId(isExpanded ? null : merc.mercenaryId)}
                            >⚙</button>
                          )}
                          <button
                            className="btn-merc-info"
                            title={`View ${merc.name} details`}
                            onClick={() => { if (effectiveMerc) setInfoMercenary(effectiveMerc); }}
                          >&#128065;</button>
                          <button
                            className="btn-remove"
                            onClick={() =>
                              handleMercenariesChange(
                                warband.mercenaries.filter((m) => m.mercenaryId !== merc.mercenaryId),
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>

                        {/* ── Expanded options panel ── */}
                        {isExpanded && (
                          <div className="merc-options-panel">
                            {def?.recruitOptions && def.recruitOptions.length > 0 && (
                              <div className="merc-options-group">
                                <div className="merc-options-label">{def.recruitPrompt ?? 'Choose type:'}</div>
                                <div className="merc-options-btns">
                                  {def.recruitOptions.map((opt) => (
                                    <button
                                      key={opt.id}
                                      className={`merc-opt-btn${merc.selectedRecruitOptionId === opt.id ? ' selected' : ''}`}
                                      title={opt.description}
                                      onClick={() => handleMercenariesChange(
                                        warband.mercenaries.map((m) =>
                                          m.mercenaryId === merc.mercenaryId
                                            ? { ...m, selectedRecruitOptionId: opt.id, gloryCost: def.gloryCost + (opt.gloryCostModifier ?? 0) }
                                            : m
                                        )
                                      )}
                                    >
                                      {opt.label}{opt.gloryCostModifier ? ` (+${opt.gloryCostModifier}⚔)` : ''}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            {hasUpgrades && (
                              <div className="merc-options-group">
                                <div className="merc-options-label">Upgrades:</div>
                                <div className="merc-options-btns">
                                  {def!.mercUpgrades!.map((upg) => {
                                    const active = selectedUpgrades.includes(upg.id);
                                    return (
                                      <button
                                        key={upg.id}
                                        className={`merc-opt-btn${active ? ' selected' : ''}`}
                                        title={upg.description}
                                        onClick={() => {
                                          const next = active
                                            ? selectedUpgrades.filter((u) => u !== upg.id)
                                            : [...selectedUpgrades, upg.id];
                                          const extraGlory = next.reduce((sum, uid) => {
                                            const u = def!.mercUpgrades!.find((x) => x.id === uid);
                                            return sum + (u?.gloryCostModifier ?? 0);
                                          }, 0);
                                          handleMercenariesChange(
                                            warband.mercenaries.map((m) =>
                                              m.mercenaryId === merc.mercenaryId
                                                ? { ...m, selectedUpgrades: next, gloryCost: def!.gloryCost + extraGlory }
                                                : m
                                            )
                                          );
                                        }}
                                      >
                                        {active ? '✓ ' : ''}{upg.label}
                                        {upg.gloryCostModifier > 0 ? ` (+${upg.gloryCostModifier}⚔)` : upg.gloryCostModifier < 0 ? ` (${upg.gloryCostModifier}⚔)` : ' (free)'}
                                        {upg.condition ? ` — ${upg.condition}` : ''}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Saved Armies modal */}
      {showSavedModal && (
        <SavedArmiesModal
          onLoad={loadWarband}
          onClose={() => setShowSavedModal(false)}
        />
      )}

      {/* New Build confirmation dialog */}
      {showNewBuildConfirm && (
        <div className="mimport-overlay" onClick={() => setShowNewBuildConfirm(false)}>
          <div className="mimport-dialog" onClick={e => e.stopPropagation()}>
            <div className="mimport-header">
              <span className="mimport-title">Start New Build?</span>
              <button className="msheet-close" onClick={() => setShowNewBuildConfirm(false)}>✕</button>
            </div>
            <p className="mimport-desc">
              Your warband <strong>&quot;{warband.name}&quot;</strong> has unsaved changes. Save it to the Library first?
            </p>
            <div className="mimport-actions">
              <button className="mbtn mbtn-save mimport-btn" onClick={() => handleConfirmNewBuild(true)}>💾 Save &amp; New</button>
              <button className="mbtn mbtn-danger mimport-btn" onClick={() => handleConfirmNewBuild(false)}>🗑 Discard</button>
              <button className="mbtn mbtn-ghost mimport-btn" onClick={() => setShowNewBuildConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Paste / file import modal */}
      {showImportModal && (
        <div className="mimport-overlay" onClick={() => setShowImportModal(false)}>
          <div className="mimport-dialog" onClick={e => e.stopPropagation()}>
            <div className="mimport-header">
              <span className="mimport-title">Import Warband</span>
              <button className="msheet-close" onClick={() => setShowImportModal(false)}>✕</button>
            </div>
            <p className="mimport-desc">
              Paste the contents of a <code>.thjson</code> or <code>.md</code> roster file below, then click <strong>Load</strong>.
            </p>
            <textarea
              className="mimport-textarea"
              placeholder="Paste .thjson or .md file contents here…"
              value={importPasteText}
              onChange={e => setImportPasteText(e.target.value)}
              rows={10}
            />
            <div className="mimport-actions">
              <button
                className="mbtn mbtn-primary mimport-btn"
                disabled={!importPasteText.trim()}
                onClick={handleImportFromPaste}
              >⬆ Load</button>
              <button
                className="mbtn mbtn-ghost mimport-btn"
                onClick={() => importInputRef.current?.click()}
              >📂 Pick File</button>
              <button
                className="mbtn mbtn-ghost mimport-btn"
                onClick={() => { setShowImportModal(false); setImportPasteText(''); }}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Mercenary panel */}
      {showMercenaryPanel && (
        <MercenaryPanel
          factionId={selectedFaction}
          subfactionId={selectedSubFaction !== 'no_variant' ? selectedSubFaction : undefined}
          leaderKeywords={warband.units.find(u => u.keywords.includes('LEADER'))?.keywords ?? []}
          mercenaries={warband.mercenaries ?? []}
          currentGlory={totalGlory}
          gloryLimit={gloryLimit}
          onChange={handleMercenariesChange}
          onGloryLimitChange={handleGloryLimitFromPanel}
          onClose={() => setShowMercenaryPanel(false)}
        />
      )}

      {/* Unit info modal */}
      {infoUnit && (
        <UnitInfoModal
          unit={infoUnit}
          selectedWargear={infoWargear}
          selectedUpgrades={infoSelectedUpgrades}
          selectedPsychicPowers={infoPsychicPowers}
          selectedGiftsOfChaos={infoGiftsOfChaos}
          warbandUnit={infoWarbandUnit ?? undefined}
          onClose={() => { setInfoUnit(null); setInfoWargear(undefined); setInfoSelectedUpgrades({}); setInfoPsychicPowers([]); setInfoGiftsOfChaos([]); setInfoWarbandUnit(null); }}
        />
      )}

      {/* Sub-type selection modal */}
      {pendingSubTypeUnit && (
        <UnitSubTypeModal
          unit={pendingSubTypeUnit}
          onConfirm={handleConfirmSubType}
          onCancel={() => setPendingSubTypeUnit(null)}
        />
      )}

      {/* Wargear upgrade panel (modal overlay) */}
      {wargearUnitIdx !== null && (() => {
        const unit = warband.units[wargearUnitIdx];
        const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
        const allowedIds = getAllowedWargearIds(selectedFaction, unit.unitId, selectedSubFaction, unit.selectedUpgrades ?? {});
        // Build the locked "included" list from the unit's defaultWargear
        const defaultItems: SelectedWargear[] = (unitDef?.defaultWargear ?? []).map(item => ({
          id: item.id,
          name: item.name,
          cost: 0,
          type: item.type as 'weapon' | 'armor' | 'equipment',
          slot: (item as WargearOption).slot,
          quantity: 1,
          isDefault: true,
          grantsKeywords: (item as any).grantsKeywords,
        }));
        return (
          <WargearPanel
            key={unit.id}
            unitName={unit.name}
            unitCount={unit.count}
            selectedItems={unit.selectedWargear}
            defaultItems={defaultItems}
            allowedIds={allowedIds}
            modelKeywords={unit.keywords}
            onAdd={(item) => handleAddWargear(wargearUnitIdx, item)}
            onRemove={(id) => handleRemoveWargear(wargearUnitIdx, id)}
            onClose={() => setWargearUnitIdx(null)}
            weaponReplacementRules={unitDef?.weaponReplacementRules}
            cannotEquip={unitDef?.cannotEquip}
            rawDefaultWargear={unitDef?.defaultWargear ?? []}
          />
        );
      })()}

      {/* Unit upgrades panel (modal overlay) */}
      {upgradeUnitIdx !== null && (() => {
        const unit = warband.units[upgradeUnitIdx];
        const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
        const hasAutoTiers = unit.selectedWargear.some(sw => sw.isSubfactionRule && sw.description);
        if (!unitDef || (!hasAutoTiers && (!unitDef.upgrades || unitDef.upgrades.length === 0))) return null;
        const warbandUpgradeCounts = warband.units.reduce((acc, wu) => {
          Object.entries(wu.selectedUpgrades ?? {}).forEach(([uid, cnt]) => {
            if (cnt > 0) acc[uid] = (acc[uid] ?? 0) + 1;
          });
          return acc;
        }, {} as Record<string, number>);
        return (
          <UpgradePanel
            key={`upgrades-${unit.id}`}
            unitName={unit.name}
            autoTiers={unit.selectedWargear
              .filter(sw => sw.isSubfactionRule && sw.description)
              .map(sw => ({ name: sw.name, description: sw.description!, cost: sw.cost }))}
            upgrades={(unitDef.upgrades ?? []).filter(upg =>
              (!upg.requiredSubfactionId || upg.requiredSubfactionId === selectedSubFaction) &&
              (!upg.forbiddenSubfactionIds || !upg.forbiddenSubfactionIds.includes(selectedSubFaction))
            )}
            selectedUpgrades={unit.selectedUpgrades ?? {}}
            warbandUpgradeCounts={warbandUpgradeCounts}
            totalWarbandPoints={calculateWarbandPoints(warband)}
            upgradeMaxCountOverrides={unitMaxCountOverrides}
            onSet={(upgradeId, count) => handleSetUpgrade(upgradeUnitIdx, upgradeId, count)}
            onClose={() => setUpgradeUnitIdx(null)}
          />
        );
      })()}

      {/* Mercenary info modal */}
      {infoMercenary && (
        <MercenaryInfoModal mercenary={infoMercenary} onClose={() => setInfoMercenary(null)} />
      )}

      {/* Elite Progression modal (XP, Campaign Skills, Battle Scars, Traumas) */}
      {eliteProgressionIdx !== null && (() => {
        const unit = warband.units[eliteProgressionIdx];
        if (!unit) return null;
        return (
          <EliteProgressionModal
            unit={unit}
            onChange={(updated) => {
              setWarband(prev => {
                const units = [...prev.units];
                units[eliteProgressionIdx] = updated;
                return { ...prev, units };
              });
            }}
            onClose={() => setEliteProgressionIdx(null)}
          />
        );
      })()}

      {/* Gifts of Chaos mutations panel (Chaos Cult only) */}
      {mutationUnitIdx !== null && (() => {
        const unit = warband.units[mutationUnitIdx];
        const isChaosSpawn = unit.unitId === 'cc_chaos_spawn';
        const isElite = unit.unitType === 'elite' || (unit.keywords ?? []).includes('ELITE') || !!unit.isPromoted;
        const maxGifts = (isChaosSpawn || isElite) ? 4 : 2;
        return (
          <MutationsPanel
            key={`mutations-${unit.id}`}
            unitName={unit.name}
            gifts={GIFTS_OF_CHAOS}
            selectedGifts={unit.selectedGiftsOfChaos ?? []}
            maxGifts={maxGifts}
            onAdd={(gift) => handleAddGift(mutationUnitIdx, gift)}
            onRemove={(id) => handleRemoveGift(mutationUnitIdx, id)}
            onClose={() => setMutationUnitIdx(null)}
          />
        );
      })()}

      {/* Psychic powers panel (modal overlay) */}
      {psychicUnitIdx !== null && (() => {
        const unit = warband.units[psychicUnitIdx];
        const activeSF = selectedSubFaction && selectedSubFaction !== 'no_variant'
          ? getSubFactionById(selectedFaction, selectedSubFaction)
          : null;
        const disciplines = getDisciplinesForFaction(selectedFaction, activeSF?.psychicDisciplineIds ?? activeSF?.psychicDisciplineId);
        if (disciplines.length === 0) return null;
        return (
          <PsychicPanel
            key={`psychic-${unit.id}`}
            unitName={unit.name}
            disciplines={disciplines}
            selectedPowers={unit.selectedPsychicPowers ?? []}
            onAdd={(power) => handleAddPsychicPower(psychicUnitIdx, power)}
            onRemove={(id) => handleRemovePsychicPower(psychicUnitIdx, id)}
            onClose={() => setPsychicUnitIdx(null)}
          />
        );
      })()}
    </div>
  );
}
