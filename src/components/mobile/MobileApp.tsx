import { useRef, useState } from 'react';
import { Warband, WarbandUnit, UnitOption, UnitSubType, SelectedWargear, WargearOption, SelectedPsychicPower, SelectedGiftOfChaos, UnitUpgrade, WarbandMercenary, Mercenary, MercenaryStats, SharedWarbandProps } from '../../types/index.js';
import { getFactionById, allFactions } from '../../data/factions_complete.js';
import {
  calculateWarbandPoints,
  calculateWarbandGlory,
  calculateTotalModels,
  validateWarband,
} from '../../data/validation.js';
import { getAllowedWargearIds } from '../../data/faction_wargear.js';
import { validateLoadout, lookupWargear, lookupWeapon } from '../../data/wargearSlotValidation.js';
import { saveWarbandLocal, exportWarbandToMDFile, importWarbandFromJSON } from '../../utils/export.js';
import { exportWarbandToPDF } from '../../utils/pdfExport.js';
import { WargearPanel } from '../WargearPanel.js';
import { PsychicPanel } from '../PsychicPanel.js';
import { MutationsPanel } from '../MutationsPanel.js';
import { GIFTS_OF_CHAOS } from '../../data/gifts_of_chaos.js';
import { KeywordChip } from '../KeywordChip.js';
import { UpgradePanel } from '../UpgradePanel.js';
import { UnitInfoModal } from '../UnitInfoModal.js';
import { UnitSubTypeModal } from '../UnitSubTypeModal.js';
import { SavedArmiesModal } from '../SavedArmiesModal.js';
import { getDisciplinesForFaction, factionHasPsychicDisciplines } from '../../data/psychicDisciplines.js';
import { factionHasSubFactions, getSubFactions, getSubFactionById, getDefaultSubFactionId } from '../../data/subfactions.js';
import MercenaryPanel from '../MercenaryPanel.js';
import { MercenaryInfoModal } from '../MercenaryInfoModal.js';
import { ALL_MERCENARIES } from '../../data/mercenaries.js';
import { EliteProgressionModal } from '../EliteProgressionModal.js';
import { isEliteEligible } from '../../data/campaignProgression.js';
import { getPatronsForFaction, getPatronById, filterAbilitiesForSubfaction } from '../../data/patrons.js';
import { PatronAbilityChip } from '../PatronAbilityChip.js';
import './MobileApp.css';

type Tab = 'build' | 'army' | 'validate' | 'export';

export function MobileApp({
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
  const validation     = validateWarband(warband);
  const totalPoints    = calculateWarbandPoints(warband);
  const totalGlory     = calculateWarbandGlory(warband);
  const totalModels    = calculateTotalModels(warband);

  // ── UI state ───────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]               = useState<Tab>('build');
  const [wargearUnitIdx, setWargearUnitIdx]     = useState<number | null>(null);
  const [psychicUnitIdx, setPsychicUnitIdx]     = useState<number | null>(null);
  const [mutationUnitIdx, setMutationUnitIdx]   = useState<number | null>(null);
  const [upgradeUnitIdx, setUpgradeUnitIdx]     = useState<number | null>(null);
  const [infoUnit, setInfoUnit]                 = useState<UnitOption | null>(null);
  const [infoWargear, setInfoWargear]           = useState<SelectedWargear[] | undefined>(undefined);
  const [infoSelectedUpgrades, setInfoSelectedUpgrades] = useState<Record<string, number>>({});
  const [infoPsychicPowers, setInfoPsychicPowers] = useState<SelectedPsychicPower[]>([]);
  const [infoGiftsOfChaos, setInfoGiftsOfChaos] = useState<SelectedGiftOfChaos[]>([]);
  const [infoWarbandUnit, setInfoWarbandUnit] = useState<WarbandUnit | null>(null);
  const [pendingSubTypeUnit, setPendingSubTypeUnit] = useState<UnitOption | null>(null);
  const [showSavedModal, setShowSavedModal]     = useState(false);
  const [showMercenaryPanel, setShowMercenaryPanel] = useState(false);
  const [infoMercenary, setInfoMercenary] = useState<Mercenary | null>(null);
  const [expandedMercId, setExpandedMercId] = useState<string | null>(null);
  const [saveMsg, setSaveMsg]                   = useState<{ text: string; ok: boolean } | null>(null);
  const [expandedUnit, setExpandedUnit]         = useState<string | null>(null);
  const [unitBrowserOpen, setUnitBrowserOpen]   = useState(false);
  const [showNewBuildConfirm, setShowNewBuildConfirm] = useState(false);
  const [showImportModal, setShowImportModal]     = useState(false);
  const [importPasteText, setImportPasteText]     = useState('');
  const [eliteProgressionIdx, setEliteProgressionIdx] = useState<number | null>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  // ── Helpers ────────────────────────────────────────────────────────────
  const flashMsg = (text: string, ok: boolean) => {
    setSaveMsg({ text, ok });
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const hasUnsavedContent = () =>
    warband.units.length > 0 || warband.name !== 'My Warband';

  const createFreshWarband = () => {
    const defaultFaction = allFactions[0].id;
    setSelectedFaction(defaultFaction);
    setSelectedSubFaction('no_variant');
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
    setExpandedUnit(null);
    setActiveTab('build');
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
    if (saveFirst) {
      saveWarbandLocal(warband);
    }
    createFreshWarband();
    if (saveFirst) flashMsg('Saved! Starting new build…', true);
  };

  const loadWarband = (wb: Warband) => {
    setSelectedFaction(wb.faction);
    setSelectedSubFaction(wb.subfaction ?? 'no_variant');
    setPointLimit(wb.pointLimit);
    setGloryLimit(wb.gloryLimit);
    setWarband({ ...wb, mercenaries: wb.mercenaries ?? [] });
  };

  const handleMercenariesChange = (mercs: WarbandMercenary[]) => {
    setWarband(prev => ({ ...prev, mercenaries: mercs }));
  };

  const handleGloryLimitFromPanel = (limit: number) => {
    setGloryLimit(limit);
    setWarband(prev => ({ ...prev, gloryLimit: limit }));
  };

  // ── Faction / config handlers ─────────────────────────────────────────
  const handleFactionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const defaultSF = getDefaultSubFactionId(id);
    setSelectedFaction(id);
    setSelectedSubFaction(defaultSF);
    setWarband(prev => ({ ...prev, faction: id, subfaction: defaultSF === 'no_variant' ? undefined : defaultSF, subfactionName: undefined, patron: undefined, units: [], mercenaries: [] }));
  };

  const handleSubFactionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSubFactionId = e.target.value;
    const sf = getSubFactionById(selectedFaction, newSubFactionId);
    setSelectedSubFaction(newSubFactionId);
    setWarband(prev => ({
      ...prev,
      subfaction: newSubFactionId === 'no_variant' ? undefined : newSubFactionId,
      subfactionName: newSubFactionId === 'no_variant' ? undefined : (sf?.name ?? undefined),
      units: [],
      mercenaries: [],
    }));
  };

  const handlePointLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    setPointLimit(v);
    setWarband(prev => ({ ...prev, pointLimit: v }));
  };

  const handleGloryLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10) || 0;
    setGloryLimit(v);
    setWarband(prev => ({ ...prev, gloryLimit: v }));
  };

  // ── Unit add / remove ─────────────────────────────────────────────────
  const handleAddUnit = (unit: UnitOption) => {
    if (unit.unitSubTypes && unit.unitSubTypes.length > 0) {
      setPendingSubTypeUnit(unit);
      return;
    }
    commitAddUnit(unit, null);
  };

  const commitAddUnit = (unit: UnitOption, subType: UnitSubType | null) => {
    const currency    = unit.costCurrency ?? 'credits';
    const costMod     = subType?.creditCostModifier ?? 0;
    const displayName = subType ? subType.name : unit.name;

    // Auto-apply mark for warband variants (e.g. World Eaters → Mark of Khorne)
    const autoMark = currentSubFaction?.autoMark;
    const shouldApplyMark = !!(autoMark && autoMark.eligibleUnitIds.includes(unit.id));
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
          ...(i === 0 && (mod.movementDelta != null || mod.rangedSkillDelta != null || mod.meleeSkillDelta != null)
            ? { statModifiers: {
                ...(mod.movementDelta    != null ? { movement:    mod.movementDelta    } : {}),
                ...(mod.rangedSkillDelta != null ? { rangedSkill: mod.rangedSkillDelta } : {}),
                ...(mod.meleeSkillDelta  != null ? { meleeSkill:  mod.meleeSkillDelta  } : {}),
              }}
            : {}),
        });
      }
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
          grantsKeywords: [],
          statModifiers: statMods,
        });
      }
    }

    const effectiveCost = unit.baseCost + costMod + markCostBonus + modCostBonus;
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
      totalCost:      currency === 'credits' ? effectiveCost : 0,
      totalGloryCost: currency === 'glory'   ? effectiveCost : 0,
      keywords:       [...new Set([...unit.keywords, ...(subType?.grantedKeywords ?? []), ...autoMarkKeywords, ...modKeywords])],
      unitType:       unit.unitType,
      selectedSubType: subType?.id,
      subTypeName:    subType?.name,
      appliedSubType: subType ?? undefined,
    };
    setWarband(prev => ({ ...prev, units: [...prev.units, newUnit] }));
    // Switch to Army tab so user sees the added unit
    setActiveTab('army');
    setUnitBrowserOpen(false);
  };

  const handleConfirmSubType = (subType: UnitSubType) => {
    if (!pendingSubTypeUnit) return;
    commitAddUnit(pendingSubTypeUnit, subType);
    setPendingSubTypeUnit(null);
  };

  const handleRemoveUnit = (unitIndex: number) => {
    setWarband(prev => ({ ...prev, units: prev.units.filter((_, i) => i !== unitIndex) }));
  };

  const handleChangeUnitCount = (unitIndex: number, newCount: number) => {
    if (newCount < 1) return;
    const unitDef = allAvailableUnits.find(u => u.id === warband.units[unitIndex]?.unitId);
    if (unitDef && newCount > unitDef.maxCount) return;
    setWarband(prev => {
      const units = [...prev.units];
      const u = { ...units[unitIndex] };
      const currency = u.costCurrency ?? 'credits';
      const creditWg = u.selectedWargear.filter(w => (w.costCurrency ?? 'credits') === 'credits').reduce((s, w) => s + w.cost * w.quantity, 0);
      const gloryWg  = u.selectedWargear.filter(w => w.costCurrency === 'glory').reduce((s, w) => s + w.cost * w.quantity, 0);
      u.count         = newCount;
      u.totalCost     = (currency === 'credits' ? newCount * u.baseCostPerModel : 0) + creditWg;
      u.totalGloryCost = (currency === 'glory'  ? newCount * u.baseCostPerModel : 0) + gloryWg;
      units[unitIndex] = u;
      return { ...prev, units };
    });
  };

  function recalcUnitCosts(
    unit: Warband['units'][number],
    newWargear: SelectedWargear[],
    unitDef?: UnitOption | null,
  ) {
    const currency  = unit.costCurrency ?? 'credits';
    const creditWg  = newWargear.filter(w => (w.costCurrency ?? 'credits') === 'credits').reduce((s, w) => s + w.cost * w.quantity, 0);
    const gloryWg   = newWargear.filter(w => w.costCurrency === 'glory').reduce((s, w) => s + w.cost * w.quantity, 0);

    // When user equips a purchased body-armour that replaces the unit's default armour
    // (whose cost is baked into baseCostPerModel), deduct the default armour's real cost.
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

    return {
      totalCost:       (currency === 'credits' ? unit.count * unit.baseCostPerModel : 0) + creditWg + defaultArmourOffset,
      totalGloryCost:  (currency === 'glory'   ? unit.count * unit.baseCostPerModel : 0) + gloryWg,
    };
  }

  const handleAddWargear = (unitIndex: number, item: SelectedWargear) => {
    setWarband(prev => {
      const units = [...prev.units];
      const u = { ...units[unitIndex] };
      // Inject subfaction keyword grants (e.g. Raven Guard + Jump Pack → DEEP STRIKE)
      const sfGrants = currentSubFaction?.wargearKeywordGrants?.[item.id] ?? [];
      const effectiveItem: SelectedWargear = sfGrants.length > 0
        ? { ...item, grantsKeywords: [...(item.grantsKeywords ?? []), ...sfGrants] }
        : item;
      const existing = u.selectedWargear.findIndex(w => w.id === effectiveItem.id);
      let newWg = existing >= 0
        ? u.selectedWargear.map((w, i) => (i === existing ? effectiveItem : w))
        : [...u.selectedWargear, effectiveItem];

      // Auto-add any bonus weapon granted by this wargear (e.g. Twin Boltgun from Astartes Bike)
      if (existing < 0) {
        const gearDef = lookupWargear(effectiveItem.id);
        if (gearDef?.grantsBonusWeapon) {
          const bonusWeapon = lookupWeapon(gearDef.grantsBonusWeapon);
          if (bonusWeapon && !newWg.some(w => w.id === bonusWeapon.id)) {
            newWg = [
              ...newWg,
              {
                id: bonusWeapon.id,
                name: bonusWeapon.name,
                cost: 0,
                isDefault: true,
                associatedWithId: effectiveItem.id,
              } as SelectedWargear,
            ];
          }
        }
      }

      const unitDef = allAvailableUnits.find(ud => ud.id === u.unitId);
      const calc = recalcUnitCosts(u, newWg, unitDef);
      const psychicCredits = (u.selectedPsychicPowers ?? []).filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const giftCredits0 = (u.selectedGiftsOfChaos ?? []).reduce((s, g) => s + g.cost, 0);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + ((u.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost, 0);
      // Recompute live keywords: unitDef base + subtype + wargear grants + upgrade grants
      const baseKw = unitDef?.keywords ?? [];
      const subKw = u.appliedSubType?.grantedKeywords ?? [];
      const wgKw = newWg.flatMap(w => w.grantsKeywords ?? []);
      const upgKw = Object.entries(u.selectedUpgrades ?? {})
        .filter(([, cnt]) => cnt > 0)
        .flatMap(([id]) => unitDef?.upgrades?.find(ud => ud.id === id)?.grantedKeywords ?? []);
      const newKeywords = [...new Set([...baseKw, ...subKw, ...wgKw, ...upgKw])];
      units[unitIndex] = { ...u, selectedWargear: newWg, keywords: newKeywords, totalCost: calc.totalCost + psychicCredits + giftCredits0 + upgradeCreditCost, totalGloryCost: calc.totalGloryCost };
      return { ...prev, units };
    });
  };

  const handleRemoveWargear = (unitIndex: number, wargearId: string) => {
    setWarband(prev => {
      const units = [...prev.units];
      const u = { ...units[unitIndex] };
      // Guard: never remove auto-applied (isDefault) wargear such as variant marks
      if (u.selectedWargear.find(w => w.id === wargearId)?.isDefault) return prev;
      // Also remove any bonus items that were auto-added alongside this wargear (e.g. Twin Boltgun from Astartes Bike)
      const newWg = u.selectedWargear.filter(w => w.id !== wargearId && w.associatedWithId !== wargearId);
      const unitDef = allAvailableUnits.find(ud => ud.id === u.unitId);
      const calc  = recalcUnitCosts(u, newWg, unitDef);
      const psychicCredits = (u.selectedPsychicPowers ?? []).filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const giftCredits1 = (u.selectedGiftsOfChaos ?? []).reduce((s, g) => s + g.cost, 0);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + ((u.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost, 0);
      // Recompute live keywords after wargear removal
      const baseKw = unitDef?.keywords ?? [];
      const subKw = u.appliedSubType?.grantedKeywords ?? [];
      const wgKw = newWg.flatMap(w => w.grantsKeywords ?? []);
      const upgKw = Object.entries(u.selectedUpgrades ?? {})
        .filter(([, cnt]) => cnt > 0)
        .flatMap(([id]) => unitDef?.upgrades?.find(ud => ud.id === id)?.grantedKeywords ?? []);
      const newKeywords = [...new Set([...baseKw, ...subKw, ...wgKw, ...upgKw])];
      units[unitIndex] = { ...u, selectedWargear: newWg, keywords: newKeywords, totalCost: calc.totalCost + psychicCredits + giftCredits1 + upgradeCreditCost, totalGloryCost: calc.totalGloryCost };
      return { ...prev, units };
    });
  };

  const handleAddPsychicPower = (unitIndex: number, power: SelectedPsychicPower) => {
    setWarband(prev => {
      const units = [...prev.units];
      const u = { ...units[unitIndex] };
      const existing = (u.selectedPsychicPowers ?? []).find(p => p.id === power.id);
      if (existing) return prev;
      const newPowers = [...(u.selectedPsychicPowers ?? []), power];
      const psychicCredits = newPowers.filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const psychicGlory   = newPowers.filter(p => p.costCurrency === 'glory').reduce((s, p) => s + p.cost, 0);
      const unitDef = allAvailableUnits.find(ud => ud.id === u.unitId);
      const calc = recalcUnitCosts(u, u.selectedWargear, unitDef);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + ((u.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost, 0);
      const giftCredits2 = (u.selectedGiftsOfChaos ?? []).reduce((s, g) => s + g.cost, 0);
      units[unitIndex] = {
        ...u,
        selectedPsychicPowers: newPowers,
        totalCost:      calc.totalCost + psychicCredits + giftCredits2 + upgradeCreditCost,
        totalGloryCost: calc.totalGloryCost + psychicGlory,
      };
      return { ...prev, units };
    });
  };

  const handleRemovePsychicPower = (unitIndex: number, powerId: string) => {
    setWarband(prev => {
      const units = [...prev.units];
      const u = { ...units[unitIndex] };
      const newPowers = (u.selectedPsychicPowers ?? []).filter(p => p.id !== powerId);
      const psychicCredits = newPowers.filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const psychicGlory   = newPowers.filter(p => p.costCurrency === 'glory').reduce((s, p) => s + p.cost, 0);
      const unitDef = allAvailableUnits.find(ud => ud.id === u.unitId);
      const calc = recalcUnitCosts(u, u.selectedWargear, unitDef);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + ((u.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost, 0);
      const giftCredits3 = (u.selectedGiftsOfChaos ?? []).reduce((s, g) => s + g.cost, 0);
      units[unitIndex] = {
        ...u,
        selectedPsychicPowers: newPowers,
        totalCost:      calc.totalCost + psychicCredits + giftCredits3 + upgradeCreditCost,
        totalGloryCost: calc.totalGloryCost + psychicGlory,
      };
      return { ...prev, units };
    });
  };

  const handleAddGift = (unitIndex: number, gift: SelectedGiftOfChaos) => {
    setWarband(prev => {
      const units = [...prev.units];
      const u = { ...units[unitIndex] };
      const existing = (u.selectedGiftsOfChaos ?? []).find(g => g.id === gift.id);
      if (existing) return prev;
      const newGifts = [...(u.selectedGiftsOfChaos ?? []), gift];
      const giftCredits = newGifts.reduce((s, g) => s + g.cost, 0);
      const unitDef = allAvailableUnits.find(ud => ud.id === u.unitId);
      const calc = recalcUnitCosts(u, u.selectedWargear, unitDef);
      const psychicCredits = (u.selectedPsychicPowers ?? []).filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + ((u.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost, 0);
      units[unitIndex] = {
        ...u,
        selectedGiftsOfChaos: newGifts,
        totalCost: calc.totalCost + psychicCredits + giftCredits + upgradeCreditCost,
      };
      return { ...prev, units };
    });
  };

  const handleRemoveGift = (unitIndex: number, giftId: string) => {
    setWarband(prev => {
      const units = [...prev.units];
      const u = { ...units[unitIndex] };
      const newGifts = (u.selectedGiftsOfChaos ?? []).filter(g => g.id !== giftId);
      const giftCredits = newGifts.reduce((s, g) => s + g.cost, 0);
      const unitDef = allAvailableUnits.find(ud => ud.id === u.unitId);
      const calc = recalcUnitCosts(u, u.selectedWargear, unitDef);
      const psychicCredits = (u.selectedPsychicPowers ?? []).filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + ((u.selectedUpgrades ?? {})[upg.id] ?? 0) * upg.cost, 0);
      units[unitIndex] = {
        ...u,
        selectedGiftsOfChaos: newGifts,
        totalCost: calc.totalCost + psychicCredits + giftCredits + upgradeCreditCost,
      };
      return { ...prev, units };
    });
  };

  const handleSetUpgrade = (unitIndex: number, upgradeId: string, count: number) => {
    setWarband(prev => {
      const units = [...prev.units];
      const u = { ...units[unitIndex] };
      const unitDef = allAvailableUnits.find(ud => ud.id === u.unitId);
      const upgrade = unitDef?.upgrades?.find(upg => upg.id === upgradeId);
      // Upgrades with maxCount >= 10 are "stackable" stat boosts (e.g. Primaris) that
      // can coexist with a class upgrade. Upgrades with maxCount < 10 are mutually exclusive
      // class upgrades (e.g. Assault Marine, Bladeguard) — only one may be active at a time.
      const isStackable = (upgrade?.maxCount ?? 1) >= 10;
      let newUpgrades: Record<string, number>;
      if (isStackable) {
        // Keep everything; only update this one upgrade
        newUpgrades = { ...(u.selectedUpgrades ?? {}) };
        if (count > 0) newUpgrades[upgradeId] = 1;
        else delete newUpgrades[upgradeId];
      } else {
        // Clear other exclusive (non-stackable) upgrades, but preserve stackable ones
        newUpgrades = {};
        for (const [id, cnt] of Object.entries(u.selectedUpgrades ?? {})) {
          const existingUpg = unitDef?.upgrades?.find(upg => upg.id === id);
          if (existingUpg && existingUpg.maxCount >= 10) {
            newUpgrades[id] = cnt; // preserve stackable
          }
        }
        if (count > 0) newUpgrades[upgradeId] = 1;
      }
      const upgradeCreditCost = (unitDef?.upgrades ?? []).reduce((sum, upg) => sum + (newUpgrades[upg.id] ?? 0) * upg.cost, 0);
      const calc = recalcUnitCosts(u, u.selectedWargear, unitDef);
      const psychicCredits = (u.selectedPsychicPowers ?? []).filter(p => (p.costCurrency ?? 'credits') === 'credits').reduce((s, p) => s + p.cost, 0);
      // Recompute live keywords from ALL active upgrades
      const baseKw = unitDef?.keywords ?? [];
      const subKw = u.appliedSubType?.grantedKeywords ?? [];
      const wgKw = u.selectedWargear.flatMap(w => w.grantsKeywords ?? []);
      const upgKw = Object.entries(newUpgrades)
        .filter(([, cnt]) => cnt > 0)
        .flatMap(([id]) => unitDef?.upgrades?.find(upg => upg.id === id)?.grantedKeywords ?? []);
      const newKeywords = [...new Set([...baseKw, ...subKw, ...wgKw, ...upgKw])];
      units[unitIndex] = {
        ...u,
        selectedUpgrades: newUpgrades,
        keywords: newKeywords,
        totalCost: calc.totalCost + psychicCredits + (u.selectedGiftsOfChaos ?? []).reduce((s, g) => s + g.cost, 0) + upgradeCreditCost,
      };
      return { ...prev, units };
    });
  };

  function buildResolvedUnit(unitDef: UnitOption, wbu: Warband['units'][number]): UnitOption {
    const sub = wbu.appliedSubType;
    const m = sub?.statModifiers ?? {};

    // Compute the armourSave contributed by the unit's defaultWargear items
    const defaultArmourMod = (unitDef.defaultWargear as Array<{ statModifiers?: { armourSave?: number } }>)
      .reduce((sum, item) => sum + (item.statModifiers?.armourSave ?? 0), 0);

    // Compute the armour+shield contribution from items the player has equipped
    const selectedArmourMod = wbu.selectedWargear.reduce((sum, sw) => {
      const resolved: WargearOption | undefined = lookupWargear(sw.id);
      return sum + ((resolved as WargearOption & { statModifiers?: { armourSave?: number } })?.statModifiers?.armourSave ?? 0);
    }, 0);

    // Detect whether selected wargear contains any body-armour slot item
    const hasSelectedBodyArmour = wbu.selectedWargear.some(sw => {
      const resolved = lookupWargear(sw.id);
      return resolved?.slot === 'body-armour';
    });

    const bareArmourSave = (unitDef.stats.armourSave ?? 0) - defaultArmourMod;
    const effectiveBodyArmour = hasSelectedBodyArmour
      ? selectedArmourMod
      : defaultArmourMod + selectedArmourMod;

    const effectiveArmourSave = bareArmourSave + effectiveBodyArmour + (m.armourSave ?? 0);

    // Sum any movement bonuses/penalties granted by equipped wargear (e.g. Jump Pack +2")
    // Also reads statModifiers directly from item when lookupWargear returns nothing
    // (used for auto-mod items like Rubric Marines −1" or Jakhals +1").
    const wargearMovementBonus = wbu.selectedWargear.reduce((sum, sw) => {
      const resolved = lookupWargear(sw.id);
      return sum + (resolved?.statModifiers?.movement ?? sw.statModifiers?.movement ?? 0);
    }, 0);

    // Check for a movement override (e.g. Astartes Bike forces movement to 10" exactly)
    const movementOverrideItem = wbu.selectedWargear.find(sw => {
      const resolved = lookupWargear(sw.id);
      return (resolved?.movementOverride != null) || (sw.movementOverride != null);
    });
    const wargearMovementOverride = movementOverrideItem
      ? (lookupWargear(movementOverrideItem.id)?.movementOverride ?? movementOverrideItem.movementOverride ?? null)
      : null;

    // Sum any ranged skill bonuses from wargear (e.g. Gal Vorbak +1 Ranged Skill)
    const wargearRangedSkillBonus = wbu.selectedWargear.reduce((sum, sw) => {
      const resolved = lookupWargear(sw.id);
      return sum + (resolved?.statModifiers?.rangedSkill ?? sw.statModifiers?.rangedSkill ?? 0);
    }, 0);

    const effectiveStats = {
      movement:    wargearMovementOverride != null
        ? wargearMovementOverride
        : unitDef.stats.movement + (m.movement ?? 0) + wargearMovementBonus,
      rangedSkill: unitDef.stats.rangedSkill + (m.rangedSkill ?? 0) + wargearRangedSkillBonus,
      meleeSkill:  unitDef.stats.meleeSkill  + (m.meleeSkill  ?? 0),
      armourSave:  effectiveArmourSave,
      toughness:   m.toughness ?? unitDef.stats.toughness,
    };

    // Aggregate stat modifiers from active Gifts of Chaos mutations
    const activeGifts = (wbu.selectedGiftsOfChaos ?? []).map(sg => GIFTS_OF_CHAOS.find(g => g.id === sg.id)).filter(Boolean);
    const giftMods = activeGifts.reduce((acc, g) => {
      const gm = g!.statModifiers ?? {};
      return {
        movement:    (acc.movement    ?? 0) + (gm.movement    ?? 0),
        rangedSkill: (acc.rangedSkill ?? 0) + (gm.rangedSkill ?? 0),
        meleeSkill:  (acc.meleeSkill  ?? 0) + (gm.meleeSkill  ?? 0),
        armourSave:  (acc.armourSave  ?? 0) + (gm.armourSave  ?? 0),
      };
    }, {} as Partial<{ movement: number; rangedSkill: number; meleeSkill: number; armourSave: number }>);
    const effectiveStatsWithGifts = {
      ...effectiveStats,
      movement:    (wargearMovementOverride != null ? wargearMovementOverride : effectiveStats.movement) + (giftMods.movement ?? 0),
      rangedSkill: effectiveStats.rangedSkill + (giftMods.rangedSkill ?? 0),
      meleeSkill:  effectiveStats.meleeSkill  + (giftMods.meleeSkill  ?? 0),
      armourSave:  effectiveStats.armourSave  + (giftMods.armourSave  ?? 0),
    };

    // Collect abilities from any selected upgrade
    const upgradeAbilities = (unitDef.upgrades ?? [])
      .filter(upg => ((wbu.selectedUpgrades ?? {})[upg.id] ?? 0) > 0)
      .map(upg => ({
        id: `upgrade-${upg.id}`,
        name: `⬆ ${upg.name}`,
        description: upg.description,
        type: 'passive' as const,
      }));

    // Collect abilities and keywords granted by equipped wargear (e.g. Turbo-Boost from Astartes Bike)
    const wargearGrantedAbilities = wbu.selectedWargear.flatMap(sw => {
      const resolved = lookupWargear(sw.id);
      return (resolved?.grantsAbilities ?? []).map(a => ({
        id: `wargear-${sw.id}-${a.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: a.name,
        description: a.description,
        type: 'passive' as const,
      }));
    });

    const wargearGrantedKeywords = wbu.selectedWargear.flatMap(sw => {
      const resolved = lookupWargear(sw.id);
      return resolved?.grantsKeywords ?? (sw as SelectedWargear & { grantsKeywords?: string[] }).grantsKeywords ?? [];
    });
    // Keywords granted by Gifts of Chaos mutations
    const giftGrantedKeywords = activeGifts.flatMap(g => g!.grantedKeywords ?? []);

    // Always use the live wbu.keywords (includes upgrade/wargear grants), plus any wargear-granted keywords
    const baseKeywords = wbu.keywords.length > 0 ? wbu.keywords : unitDef.keywords;
    const resolvedKeywords = [...new Set([...baseKeywords, ...wargearGrantedKeywords, ...giftGrantedKeywords])];

    // Collect subfaction rule abilities from autoMod items stored in selectedWargear
    const subfactionRuleAbilities = wbu.selectedWargear
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
        stats: effectiveStatsWithGifts,
        abilities: [...subfactionRuleAbilities, ...upgradeAbilities, ...wargearGrantedAbilities, ...giftAbilities, ...(unitDef.abilities ?? [])],
      };
    }

    return {
      ...unitDef,
      name:     wbu.subTypeName ?? unitDef.name,
      baseCost: wbu.baseCostPerModel,
      keywords: resolvedKeywords,
      stats:    effectiveStatsWithGifts,
      abilities: [
        { id: `subtype-${sub.id}`, name: sub.name, description: sub.description, type: 'passive' as const },
        ...subfactionRuleAbilities,
        ...upgradeAbilities,
        ...wargearGrantedAbilities,
        ...giftAbilities,
        ...(unitDef.abilities ?? []),
      ],
    };
  }

  // ── Export / Library handlers ─────────────────────────────────────────
  const handleSaveLocal = () => { saveWarbandLocal(warband); flashMsg('Army saved!', true); };

  const handleExportMD = async () => {
    try {
      await exportWarbandToMDFile(warband);
    } catch {
      flashMsg('Export failed', false);
    }
  };

  const handleExportPDF  = async () => {
    try {
      await exportWarbandToPDF(warband);
      flashMsg('PDF saved!', true);
    } catch {
      flashMsg('PDF export failed', false);
    }
  };

  // File-picker import (works on many Android devices, but may fail in some WebViews)
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const imported = importWarbandFromJSON(reader.result as string);
      if (!imported) { flashMsg('Import failed: invalid file.', false); }
      else { loadWarband(imported); setShowImportModal(false); flashMsg(`Loaded "${imported.name}"`, true); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Paste-text import — reliable on all platforms including Android WebView
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

  // ── Credit pct bar helper ─────────────────────────────────────────────
  const creditPct = Math.min(100, Math.round((totalPoints / pointLimit) * 100));
  const isOverLimit = totalPoints > pointLimit;
  const validErrors = (validation.errors ?? []).length + (validation.warnings ?? []).length;

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="mapp">

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <header className="mapp-topbar">
        <div className="mapp-topbar-left">
          <span className="mapp-topbar-name">{warband.name}</span>
          <span className="mapp-topbar-faction">{currentFaction?.name ?? selectedFaction}</span>
        </div>
        <div className="mapp-topbar-right">
          <span className={`mapp-credit-badge ${isOverLimit ? 'over' : ''}`}>
            {totalPoints}<span className="mapp-credit-sep">/</span>{pointLimit}
            <span className="mapp-credit-label"> Cr</span>
          </span>
          {totalModels > 0 && (
            <span className="mapp-model-badge">{totalModels} models</span>
          )}
        </div>
      </header>

      {/* Credit utilisation bar */}
      <div className="mapp-progress-track">
        <div
          className={`mapp-progress-fill ${isOverLimit ? 'over' : ''}`}
          style={{ width: `${creditPct}%` }}
        />
      </div>

      {/* Flash message toast */}
      {saveMsg && (
        <div className={`mapp-toast ${saveMsg.ok ? 'ok' : 'err'}`}>{saveMsg.text}</div>
      )}

      {/* ── Tab content ──────────────────────────────────────────────── */}
      <div className="mapp-content">

        {/* ══ BUILD TAB ═══════════════════════════════════════════════ */}
        {activeTab === 'build' && (
          <div className="mapp-tab">

            {/* Warband config card */}
            <div className="mcard">
              <div className="mcard-title">Warband Setup</div>
              <label className="mfield-label">Name</label>
              <input
                className="mfield-input"
                type="text"
                value={warband.name}
                onChange={e => setWarband(prev => ({ ...prev, name: e.target.value }))}
              />
              <label className="mfield-label">Faction</label>
              <select className="mfield-select" value={selectedFaction} onChange={handleFactionChange}>
                {allFactions.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
              {factionHasSubFactions(selectedFaction) && (() => {
                const sfData = getSubFactions(selectedFaction);
                const activeSF = sfData?.subFactions.find(sf => sf.id === selectedSubFaction);
                return (
                  <>
                    <label className="mfield-label">Warband Variant</label>
                    <select className="mfield-select" value={selectedSubFaction} onChange={handleSubFactionChange}>
                      {sfData?.subFactions.map(sf => (
                        <option key={sf.id} value={sf.id}>{sf.name}</option>
                      ))}
                    </select>
                    {activeSF && (selectedSubFaction !== 'no_variant' || (getSubFactions(selectedFaction)?.required ?? false)) && (
                      <div className="msubfaction-rules">
                        <div className="msubfaction-desc">{activeSF.description}</div>
                        <ul className="msubfaction-rule-list">
                          {activeSF.rules.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                );
              })()}
              {/* View Rules button - removed; info shown inline */}

              {/* Patron select */}
              {getPatronsForFaction(selectedFaction).length > 0 && (
                <>
                  <label className="mfield-label">Patron</label>
                  <select
                    className="mfield-select"
                    value={warband.patron ?? ''}
                    onChange={e => setWarband(prev => ({ ...prev, patron: e.target.value || undefined }))}
                  >
                    <option value="">— None selected —</option>
                    {getPatronsForFaction(selectedFaction).map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </>
              )}
              {warband.patron && (() => {
                const p = getPatronById(warband.patron!, selectedFaction);
                if (!p) return null;
                const visibleAbilities = filterAbilitiesForSubfaction(p.abilities, currentSubFaction?.name);
                return (
                  <div className="m-patron-info-panel">
                    <div className="m-patron-info-header">⚜ Patron: {p.name}</div>
                    <p className="m-patron-info-desc">{p.description}</p>
                    <ul className="m-patron-info-skills">
                      {visibleAbilities.map((a, i) => (
                        <li key={i}>
                          <PatronAbilityChip ability={a} />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

              <div className="mfield-row">
                <div className="mfield-col">
                  <label className="mfield-label">Credits Limit</label>
                  <input className="mfield-input" type="number" min="200" max="2000" value={pointLimit} onChange={handlePointLimitChange} />
                </div>
                <div className="mfield-col">
                  <label className="mfield-label">Glory Limit</label>
                  <input className="mfield-input" type="number" min="0" max="100" value={gloryLimit} onChange={handleGloryLimitChange} placeholder="0 = off" />
                </div>
              </div>
            </div>

            {/* New Build + Unit browser */}
            <div className="mbtn-row">
              <button
                className="mbtn mbtn-new mbtn-half"
                onClick={handleNewBuild}
              >
                🆕 New Build
              </button>
              <button
                className="mbtn mbtn-primary mbtn-half"
                onClick={() => setUnitBrowserOpen(true)}
              >
                + Add Units
              </button>
            </div>

            {/* Quick unit count summary by faction category */}
            {warband.units.length > 0 && (
              <div className="mcard">
                <div className="mcard-title">Roster Quick View</div>
                {warband.units.map((u, i) => (
                  <div key={u.id} className="mquick-row">
                    <span className={`mquick-badge ${u.unitType}`}>{u.unitType === 'elite' ? 'E' : 'T'}</span>
                    <span className="mquick-name">{u.name}{u.count > 1 ? ` ×${u.count}` : ''}</span>
                    <span className="mquick-cost">
                      {(u.costCurrency ?? 'credits') === 'glory' ? `${u.totalGloryCost}G` : `${u.totalCost}Cr`}
                    </span>
                    <button className="mquick-remove" onClick={() => handleRemoveUnit(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ ARMY TAB ════════════════════════════════════════════════ */}
        {activeTab === 'army' && (
          <div className="mapp-tab">
            {warband.units.length === 0 ? (
              <div className="mempty">
                <div className="mempty-icon">⚔</div>
                <p>No units yet.</p>
                <button className="mbtn mbtn-primary" onClick={() => setActiveTab('build')}>
                  Go to Build
                </button>
              </div>
            ) : (
              [...warband.units]
                .map((unit, origIdx) => ({ unit, origIdx }))
                .sort((a, b) => {
                  const order: Record<string, number> = { elite: 0, troop: 1 };
                  return (order[a.unit.unitType] ?? 1) - (order[b.unit.unitType] ?? 1);
                })
                .map(({ unit, origIdx: idx }) => {
                const isExpanded = expandedUnit === unit.id;
                const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
                const loadout = validateLoadout(unit.selectedWargear, unit.keywords);
                return (
                  <div key={unit.id} className={`munit-card ${isExpanded ? 'expanded' : ''}`}>

                    {/* Card header (always visible) */}
                    <button
                      className="munit-header"
                      onClick={() => setExpandedUnit(isExpanded ? null : unit.id)}
                    >
                      <div className="munit-header-left">
                        <span className={`munit-type-badge ${unit.unitType}`}>
                          {unit.unitType === 'elite' ? 'ELITE' : 'TROOP'}
                        </span>
                        <span className="munit-name">{unit.name}</span>
                        {!loadout.isValid && <span className="munit-warn-dot" title="Wargear issues">!</span>}
                        {/* Psyker validation: warn if unit has PSYKER X (X≥1) but no powers selected */}
                        {factionHasPsychicDisciplines(selectedFaction) &&
                          unit.keywords.some(k => { const m = k.match(/^PSYKER (\d+)$/); return m != null && parseInt(m[1]) >= 1; }) &&
                          (unit.selectedPsychicPowers ?? []).length === 0 && (
                          <span className="munit-psyker-warn" title="This psyker must have at least one psychic power selected.">⚠</span>
                        )}
                      </div>
                      <div className="munit-header-right">
                        <span className="munit-cost">
                          {(unit.costCurrency ?? 'credits') === 'glory'
                            ? `${unit.totalGloryCost} G`
                            : `${unit.totalCost} Cr`}
                        </span>
                        <span className="munit-chevron">{isExpanded ? '▲' : '▼'}</span>
                      </div>
                    </button>

                    {/* Expanded body */}
                    {isExpanded && (
                      <div className="munit-body">

                        {/* Sub-type badge */}
                        {unit.appliedSubType && (
                          <div className="munit-subtype">
                            <span className="munit-subtype-name">{unit.appliedSubType.name}</span>
                          </div>
                        )}

                        {/* Keywords */}
                        <div className="munit-keywords">
                          {unit.keywords.map(kw => (
                            <KeywordChip key={kw} keyword={kw} className="mkw-chip" />
                          ))}
                        </div>

                        {/* Active upgrade info */}
                        {(() => {
                          const selEntry = Object.entries(unit.selectedUpgrades ?? {}).find(([, cnt]) => cnt > 0);
                          if (!selEntry) return null;
                          const [uid] = selEntry;
                          const upg = unitDef?.upgrades?.find((u2: UnitUpgrade) => u2.id === uid);
                          if (!upg) return null;
                          return (
                            <div className="munit-upgrade-info">
                              <div className="munit-upgrade-title">⬆ {upg.name}</div>
                              {upg.grantedKeywords && upg.grantedKeywords.length > 0 && (
                                <div className="munit-upgrade-kws">
                                  {upg.grantedKeywords.map(kw => (
                                    <KeywordChip key={kw} keyword={kw} className="mkw-chip mkw-upgrade" />
                                  ))}
                                </div>
                              )}
                              <div className="munit-upgrade-desc">{upg.description}</div>
                            </div>
                          );
                        })()}

                        {/* Psychic powers */}
                        {(unit.selectedPsychicPowers ?? []).length > 0 && (
                          <div className="munit-psychic-list">
                            <div className="munit-section-label">🔮 Psychic Powers</div>
                            {(unit.selectedPsychicPowers ?? []).map(p => (
                              <div key={p.id} className="munit-psychic-item">
                                <span className="munit-psychic-name">{p.name}</span>
                                <span className="munit-psychic-meta">
                                  {p.disciplineName} · {p.cost}{p.costCurrency === 'glory' ? 'G' : 'Cr'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Default (included) wargear */}
                        {(() => {
                          const mUnitDef = allAvailableUnits.find(u2 => u2.id === unit.unitId);
                          const defItems = mUnitDef?.defaultWargear ?? [];
                          if (defItems.length === 0) return null;
                          return (
                            <div className="munit-wargear-list">
                              {defItems.map(item => {
                                const slot = (item as WargearOption).slot;
                                const replaced = slot
                                  ? unit.selectedWargear.some(sw => lookupWargear(sw.id)?.slot === slot)
                                  : false;
                                return (
                                  <span key={item.id} className={`mwg-tag mwg-tag-default${replaced ? ' mwg-tag-replaced' : ''}`}>
                                    {replaced ? '🔄' : '🔒'} {item.name}
                                    <span className="mwg-cost mwg-included-label">{replaced ? 'Replaced' : 'Included'}</span>
                                  </span>
                                );
                              })}
                            </div>
                          );
                        })()}

                        {/* Currently equipped wargear + upgrades */}
                        {(unit.selectedWargear.length > 0 || Object.keys(unit.selectedUpgrades ?? {}).length > 0) && (
                          <div className="munit-wargear-list">
                            {unit.selectedWargear.map(w => (
                              <span key={w.id} className="mwg-tag">
                                {w.name}{w.quantity > 1 ? ` ×${w.quantity}` : ''}
                                <span className="mwg-cost">
                                  {w.cost * w.quantity}{w.costCurrency === 'glory' ? 'G' : 'Cr'}
                                </span>
                              </span>
                            ))}
                            {Object.entries(unit.selectedUpgrades ?? {}).map(([uid, cnt]) => {
                              if (cnt <= 0) return null;
                              const upg = (unitDef?.upgrades ?? []).find((u: UnitUpgrade) => u.id === uid);
                              if (!upg) return null;
                              return (
                                <span key={uid} className="upgrade-tag">
                                  ⬆ {upg.name} ×{cnt}{upg.cost > 0 ? ` (+${cnt * upg.cost} Cr)` : ''}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {/* Wargear validation errors */}
                        {!loadout.isValid && (
                          <div className="munit-loadout-errors">
                            {loadout.errors.map((e, i) => (
                              <div key={i} className="munit-loadout-err">⚠ {e.message}</div>
                            ))}
                          </div>
                        )}

                        {/* Count stepper + action buttons */}
                        <div className="munit-controls">
                          <div className="munit-stepper">
                            <button className="mstepper-btn" onClick={() => handleChangeUnitCount(idx, unit.count - 1)}>−</button>
                            <span className="mstepper-val">{unit.count}</span>
                            <button className="mstepper-btn" onClick={() => { const max = unitDef?.maxCount ?? 99; if (unit.count < max) handleChangeUnitCount(idx, unit.count + 1); }}>+</button>
                            <span className="mstepper-label">models</span>
                          </div>
                        </div>

                        <div className="munit-actions">
                          <button className="mbtn mbtn-info mbtn-sm" onClick={() => {
                            if (unitDef) { setInfoUnit(buildResolvedUnit(unitDef, unit)); setInfoWargear(unit.selectedWargear); setInfoSelectedUpgrades(unit.selectedUpgrades ?? {}); setInfoPsychicPowers(unit.selectedPsychicPowers ?? []); setInfoGiftsOfChaos(unit.selectedGiftsOfChaos ?? []); setInfoWarbandUnit(unit); }
                          }}>Info</button>
                          <button className="mbtn mbtn-gear mbtn-sm" onClick={() => setWargearUnitIdx(idx)}>⚙ Wargear</button>
                          {(() => {
                            const visibleUpgrades = (unitDef?.upgrades ?? []).filter(upg =>
                              (!upg.requiredSubfactionId || upg.requiredSubfactionId === selectedSubFaction) &&
                              (!upg.forbiddenSubfactionIds || !upg.forbiddenSubfactionIds.includes(selectedSubFaction))
                            );
                            const hasAutoTiers = unit.selectedWargear.some(sw => sw.isSubfactionRule && sw.description);
                            return (visibleUpgrades.length > 0 || hasAutoTiers) ? (
                              <button className="mbtn mbtn-upgrade mbtn-sm" onClick={() => setUpgradeUnitIdx(idx)}>⬆ Upgrades</button>
                            ) : null;
                          })()}
                          {factionHasPsychicDisciplines(selectedFaction) && unit.keywords.some(k => k.startsWith('PSYKER')) && (
                            <button className="mbtn mbtn-psychic mbtn-sm" onClick={() => setPsychicUnitIdx(idx)}>🔮 Psychic</button>
                          )}
                          {selectedFaction === 'chaos_cult' && (
                            <button className="mbtn mbtn-mutations mbtn-sm" onClick={() => setMutationUnitIdx(idx)}>☠ Mutations</button>
                          )}
                          {isEliteEligible(unit) && (
                            <button className="mbtn mbtn-sm btn-elite-xp" onClick={() => setEliteProgressionIdx(idx)}>★ XP: {unit.xp ?? 0}</button>
                          )}
                          <button className="mbtn mbtn-danger mbtn-sm" onClick={() => handleRemoveUnit(idx)}>✕ Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
            {/* ── Hire Mercenaries ── */}
            <div className="m-merc-section">
              <button
                className="mbtn mbtn-mercs mbtn-full"
                onClick={() => setShowMercenaryPanel(true)}
              >
                ⚔ Hire Mercenaries
                {(warband.mercenaries?.length ?? 0) > 0 && (
                  <span className="m-merc-count"> ({warband.mercenaries.reduce((t, m) => t + m.count, 0)} hired)</span>
                )}
              </button>
              {(warband.mercenaries?.length ?? 0) > 0 && (
                <div className="m-merc-list">
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

                    // Build effective mercenary definition: merge chosen option overrides so the
                    // info modal shows the exact stats/weapons/abilities for the selected loadout.
                    const effectiveMerc = def && chosenOpt
                      ? {
                          ...def,
                          stats: chosenOpt.statsOverride
                            ? { ...def.stats, ...chosenOpt.statsOverride } as MercenaryStats
                            : def.stats,
                          weapons: chosenOpt.weaponsOverride ?? def.weapons,
                          abilities: chosenOpt.abilitiesOverride ?? def.abilities,
                          psychicPowers: chosenOpt.psychicPowersOverride ?? def.psychicPowers,
                          keywords: chosenOpt.keywordsAdd
                            ? [...(def.keywords ?? []), ...chosenOpt.keywordsAdd]
                            : def.keywords,
                        }
                      : def;

                    return (
                      <div key={merc.mercenaryId} className={`m-merc-card${isExpanded ? ' expanded' : ''}`}>
                        {/* ── Main row ── */}
                        <div className="m-merc-row">
                          <span className="m-merc-name">
                            {merc.name}{merc.count > 1 ? ` ×${merc.count}` : ''}
                            {chosenOpt && <span className="m-merc-option-label"> ({chosenOpt.label})</span>}
                            {selectedUpgrades.length > 0 && selectedUpgrades.map(uid => {
                              const u = def?.mercUpgrades?.find(x => x.id === uid);
                              return u ? <span key={uid} className="m-merc-upgrade-badge"> +{u.label}</span> : null;
                            })}
                          </span>
                          <span className="m-merc-glory">{totalGlory * merc.count} Glory</span>
                          {/* ⚙ Options button — only for mercs with choices or upgrades */}
                          {(def?.recruitOptions?.length || hasUpgrades) && (
                            <button
                              className={`m-merc-options-btn${isExpanded ? ' active' : ''}`}
                              title="Options & Upgrades"
                              onClick={() => setExpandedMercId(isExpanded ? null : merc.mercenaryId)}
                            >⚙</button>
                          )}
                          <button
                            className="m-merc-info-btn"
                            title={`View ${merc.name} details`}
                            onClick={() => { if (effectiveMerc) setInfoMercenary(effectiveMerc); }}
                          >👁</button>
                          <button
                            className="m-merc-remove"
                            onClick={() =>
                              handleMercenariesChange(
                                warband.mercenaries.filter((m) => m.mercenaryId !== merc.mercenaryId),
                              )
                            }
                          >✕</button>
                        </div>

                        {/* ── Expanded options ── */}
                        {isExpanded && (
                          <div className="m-merc-options-panel">
                            {/* Recruit choices (mutually exclusive) */}
                            {def?.recruitOptions && def.recruitOptions.length > 0 && (
                              <div className="m-merc-options-group">
                                <div className="m-merc-options-label">{def.recruitPrompt ?? 'Choose type:'}</div>
                                <div className="m-merc-options-btns">
                                  {def.recruitOptions.map((opt) => (
                                    <button
                                      key={opt.id}
                                      className={`m-merc-opt-btn${merc.selectedRecruitOptionId === opt.id ? ' selected' : ''}`}
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
                            {/* Optional upgrades (toggle) */}
                            {hasUpgrades && (
                              <div className="m-merc-options-group">
                                <div className="m-merc-options-label">Upgrades:</div>
                                <div className="m-merc-options-btns">
                                  {def!.mercUpgrades!.map((upg) => {
                                    const active = selectedUpgrades.includes(upg.id);
                                    return (
                                      <button
                                        key={upg.id}
                                        className={`m-merc-opt-btn${active ? ' selected' : ''}`}
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
              )}
            </div>
          </div>
        )}
        {activeTab === 'validate' && (
          <div className="mapp-tab">

            {/* Summary stats */}
            <div className="mcard">
              <div className="mcard-title">Summary</div>
              <div className="mstats-grid">
                <div className="mstat-cell">
                  <span className="mstat-label">Credits</span>
                  <span className={`mstat-value ${isOverLimit ? 'err' : 'ok'}`}>{totalPoints} / {pointLimit}</span>
                </div>
                {gloryLimit > 0 && (
                  <div className="mstat-cell">
                    <span className="mstat-label">Glory</span>
                    <span className={`mstat-value ${totalGlory > gloryLimit ? 'err' : 'ok'}`}>{totalGlory} / {gloryLimit}</span>
                  </div>
                )}
                {gloryLimit === 0 && totalGlory > 0 && (
                  <div className="mstat-cell">
                    <span className="mstat-label">Glory</span>
                    <span className="mstat-value warn">{totalGlory}</span>
                  </div>
                )}
                <div className="mstat-cell">
                  <span className="mstat-label">Models</span>
                  <span className="mstat-value">{totalModels}</span>
                </div>
                <div className="mstat-cell">
                  <span className="mstat-label">Units</span>
                  <span className="mstat-value">{warband.units.length}</span>
                </div>
                <div className="mstat-cell">
                  <span className="mstat-label">Elites</span>
                  <span className="mstat-value">{warband.units.filter(u => u.unitType === 'elite').length}</span>
                </div>
                <div className="mstat-cell">
                  <span className="mstat-label">Troops</span>
                  <span className="mstat-value">{warband.units.filter(u => u.unitType === 'troop').length}</span>
                </div>
              </div>
            </div>

            {/* Validation status */}
            <div className={`mcard mcard-status ${validation.isValid && validErrors === 0 ? 'valid' : 'invalid'}`}>
              <div className="mcard-title">Validation</div>
              {validation.isValid && validErrors === 0 ? (
                <div className="mvalid-ok">✓ Warband is valid!</div>
              ) : (
                <>
                  {(validation.errors ?? []).map((e, i) => (
                    <div key={i} className="mvalid-error">✗ {e.message}</div>
                  ))}
                  {(validation.warnings ?? []).map((w, i) => (
                    <div key={i} className="mvalid-warn">⚠ {w.message}</div>
                  ))}
                </>
              )}
            </div>

            {/* Per-unit wargear issues */}
            {warband.units.map(unit => {
              const loadout = validateLoadout(unit.selectedWargear, unit.keywords);
              if (loadout.isValid) return null;
              return (
                <div key={unit.id} className="mcard mcard-status invalid">
                  <div className="mcard-title">{unit.name}</div>
                  {loadout.errors.map((e, i) => (
                    <div key={i} className="mvalid-error">✗ {e.message}</div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* ══ EXPORT TAB ══════════════════════════════════════════════ */}
        {activeTab === 'export' && (
          <div className="mapp-tab">

            <div className="mcard">
              <div className="mcard-title">Save &amp; Load</div>
              <button className="mbtn mbtn-save mbtn-full" onClick={handleSaveLocal}>
                <span className="mbtn-icon">💾</span> Save to Library
              </button>
              <button className="mbtn mbtn-load mbtn-full" onClick={() => setShowSavedModal(true)}>
                <span className="mbtn-icon">📂</span> Load from Library
              </button>
            </div>

            <div className="mcard">
              <div className="mcard-title">Export / Share</div>
              <p className="mcard-desc">
                Share your roster with other apps (Google Drive, WhatsApp, email, etc.).
                The .md file includes all unit data and can be re-imported into the app.
              </p>
              <button className="mbtn mbtn-share mbtn-full" onClick={handleExportMD}>
                <span className="mbtn-icon">📄</span> Share Roster (.md)
              </button>
            </div>

            <div className="mcard">
              <div className="mcard-title">Import</div>
              <p className="mcard-desc">
                Load a warband from a .md roster file or paste the JSON data directly.
              </p>
              <button className="mbtn mbtn-import mbtn-full" onClick={() => setShowImportModal(true)}>
                <span className="mbtn-icon">⬆</span> Import Warband
              </button>
              <input
                ref={importInputRef}
                type="file"
                accept=".md,.json,text/markdown,application/json,text/plain"
                style={{ display: 'none' }}
                onChange={handleImportFile}
              />
            </div>

            <div className="mcard">
              <div className="mcard-title">Print Roster</div>
              <p className="mcard-desc">
                Generates a full A4 PDF with all units, wargear, abilities and rules.
              </p>
              <button className="mbtn mbtn-pdf mbtn-full" onClick={handleExportPDF}>
                <span className="mbtn-icon">🖨</span> Export Print PDF
              </button>
            </div>

            <div className="mcard mcard-about">
              <div className="mcard-title">About</div>
              <div className="mabout-grid">
                <div className="mabout-row">
                  <span className="mabout-label">App</span>
                  <span className="mabout-value">Trench Hammer Army Builder</span>
                </div>
                <div className="mabout-row">
                  <span className="mabout-label">Author</span>
                  <span className="mabout-value">{__APP_AUTHOR__}</span>
                </div>
                <div className="mabout-row">
                  <span className="mabout-label">Powered by</span>
                  <span className="mabout-value">GitHub Copilot (Claude Sonnet)</span>
                </div>
                <div className="mabout-row">
                  <span className="mabout-label">Version</span>
                  <span className="mabout-value">
                    <span className="mversion-badge">v{__APP_VERSION__}</span>
                  </span>
                </div>
                <div className="mabout-row">
                  <span className="mabout-label">Ruleset</span>
                  <span className="mabout-value">Trench Hammer Beta 1.3.3</span>
                </div>
                <div className="mabout-row">
                  <span className="mabout-label">Platform</span>
                  <span className="mabout-value">Android (Capacitor)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom navigation ─────────────────────────────────────── */}
      <nav className="mapp-tabnav">
        <button
          className={`mtab ${activeTab === 'build' ? 'active' : ''}`}
          onClick={() => setActiveTab('build')}
        >
          <span className="mtab-icon">🔧</span>
          <span className="mtab-label">Build</span>
        </button>
        <button
          className={`mtab ${activeTab === 'army' ? 'active' : ''}`}
          onClick={() => setActiveTab('army')}
        >
          <span className="mtab-icon">⚔</span>
          <span className="mtab-label">Army{warband.units.length > 0 ? ` (${warband.units.length})` : ''}</span>
        </button>
        <button
          className={`mtab ${activeTab === 'validate' ? 'active' : ''} ${validErrors > 0 ? 'has-issues' : ''}`}
          onClick={() => setActiveTab('validate')}
        >
          <span className="mtab-icon">{validErrors > 0 ? '⚠' : '✓'}</span>
          <span className="mtab-label">Validate</span>
        </button>
        <button
          className={`mtab ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
        >
          <span className="mtab-icon">📤</span>
          <span className="mtab-label">Export</span>
        </button>
      </nav>

      {/* ── Unit browser slide-up sheet ───────────────────────────── */}
      {unitBrowserOpen && (
        <div className="msheet-overlay" onClick={() => setUnitBrowserOpen(false)}>
          <div className="msheet" onClick={e => e.stopPropagation()}>
            <div className="msheet-header">
              <span className="msheet-title">Add Unit — {currentFaction?.name}</span>
              <button className="msheet-close" onClick={() => setUnitBrowserOpen(false)}>✕</button>
            </div>
            <div className="msheet-body">
              {(['elite', 'troop'] as const).map(cat => {
                const units = allAvailableUnits.filter(u => u.unitType === cat);
                if (units.length === 0) return null;
                return (
                  <div key={cat}>
                    <div className={`msheet-cat-header ${cat}`}>{cat === 'elite' ? 'Elites' : 'Troops'}</div>
                    {units.map(unit => (
                      <div key={unit.id} className="msheet-unit-row">
                        <div className="msheet-unit-info">
                          <span className="msheet-unit-name">{unit.name}</span>
                          <span className="msheet-unit-cost">
                            {unit.baseCost} {unit.costCurrency === 'glory' ? 'Glory' : 'Cr'}/model
                          </span>
                          <span className="msheet-unit-kws">
                            {unit.keywords.slice(0, 4).map((kw, i) => (
                              <span key={kw}>
                                {i > 0 && <span className="msheet-kw-sep"> · </span>}
                                <KeywordChip keyword={kw} className="msheet-kw" />
                              </span>
                            ))}
                          </span>
                        </div>
                        <div className="msheet-unit-btns">
                          <button
                            className="mbtn mbtn-ghost mbtn-sm"
                            onClick={() => { setInfoUnit(unit); setInfoWargear(undefined); setInfoWarbandUnit(null); }}
                          >👁</button>
                          <button
                            className="mbtn mbtn-primary mbtn-sm"
                            onClick={() => handleAddUnit(unit)}
                          >Add</button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Shared modals ────────────────────────────────────────────── */}
      {showSavedModal && (
        <SavedArmiesModal onLoad={wb => { loadWarband(wb); setShowSavedModal(false); }} onClose={() => setShowSavedModal(false)} />
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

      {pendingSubTypeUnit && (
        <UnitSubTypeModal
          unit={pendingSubTypeUnit}
          onConfirm={handleConfirmSubType}
          onCancel={() => setPendingSubTypeUnit(null)}
        />
      )}

      {/* ── New Build confirmation dialog ────────────────────────── */}
      {showNewBuildConfirm && (
        <div className="mnewbuild-overlay" onClick={() => setShowNewBuildConfirm(false)}>
          <div className="mnewbuild-dialog" onClick={e => e.stopPropagation()}>
            <div className="mnewbuild-title">Start New Build?</div>
            <p className="mnewbuild-msg">
              Your warband <strong>"{warband.name}"</strong> has unsaved changes.
              Save it to the Library first?
            </p>
            <div className="mnewbuild-actions">
              <button
                className="mbtn mbtn-save mnewbuild-btn"
                onClick={() => handleConfirmNewBuild(true)}
              >
                💾 Save &amp; New
              </button>
              <button
                className="mbtn mbtn-danger mnewbuild-btn"
                onClick={() => handleConfirmNewBuild(false)}
              >
                🗑 Discard
              </button>
              <button
                className="mbtn mbtn-ghost mnewbuild-btn"
                onClick={() => setShowNewBuildConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {wargearUnitIdx !== null && (() => {
        const unit = warband.units[wargearUnitIdx];
        const allowedIds = getAllowedWargearIds(selectedFaction, unit.unitId);
        const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
        const defaultItems: SelectedWargear[] = (unitDef?.defaultWargear ?? []).map(item => ({
          id: item.id,
          name: item.name,
          cost: 0,
          type: item.type as 'weapon' | 'armor' | 'equipment',
          slot: (item as WargearOption).slot,
          quantity: 1,
          isDefault: true,
          grantsKeywords: (item as WargearOption).grantsKeywords,
        }));
        return (
          <WargearPanel
            key={unit.id}
            unitName={unit.name}
            unitCount={unit.count}
            selectedItems={unit.selectedWargear}
            allowedIds={allowedIds}
            modelKeywords={unit.keywords}
            defaultItems={defaultItems}
            onAdd={item => handleAddWargear(wargearUnitIdx, item)}
            onRemove={id => handleRemoveWargear(wargearUnitIdx, id)}
            onClose={() => setWargearUnitIdx(null)}
            weaponReplacementRules={unitDef?.weaponReplacementRules}
            cannotEquip={unitDef?.cannotEquip}
            rawDefaultWargear={unitDef?.defaultWargear ?? []}
          />
        );
      })()}

      {upgradeUnitIdx !== null && (() => {
        const unit = warband.units[upgradeUnitIdx];
        const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
        const visibleUpgrades = (unitDef?.upgrades ?? []).filter(upg =>
          (!upg.requiredSubfactionId || upg.requiredSubfactionId === selectedSubFaction) &&
          (!upg.forbiddenSubfactionIds || !upg.forbiddenSubfactionIds.includes(selectedSubFaction))
        );
        const autoTiers = unit.selectedWargear
          .filter(sw => sw.isSubfactionRule && sw.description)
          .map(sw => ({ name: sw.name, description: sw.description!, cost: sw.cost }));
        if (!unitDef || (visibleUpgrades.length === 0 && autoTiers.length === 0)) return null;
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
            autoTiers={autoTiers}
            upgrades={visibleUpgrades}
            selectedUpgrades={unit.selectedUpgrades ?? {}}
            warbandUpgradeCounts={warbandUpgradeCounts}
            totalWarbandPoints={totalPoints}
            upgradeMaxCountOverrides={unitMaxCountOverrides}
            onSet={(upgradeId, count) => handleSetUpgrade(upgradeUnitIdx, upgradeId, count)}
            onClose={() => setUpgradeUnitIdx(null)}
          />
        );
      })()}

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

      {psychicUnitIdx !== null && (() => {
        const unit = warband.units[psychicUnitIdx];
        const activeSF = selectedSubFaction && selectedSubFaction !== 'no_variant'
          ? getSubFactionById(selectedFaction, selectedSubFaction)
          : null;
        const disciplines = getDisciplinesForFaction(selectedFaction, activeSF?.psychicDisciplineId);
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

      {/* ── Import warband modal ──────────────────────────────────── */}
      {showImportModal && (
        <div className="mimport-overlay" onClick={() => setShowImportModal(false)}>
          <div className="mimport-dialog" onClick={e => e.stopPropagation()}>
            <div className="mimport-header">
              <span className="mimport-title">Import Warband</span>
              <button className="msheet-close" onClick={() => setShowImportModal(false)}>✕</button>
            </div>

            <p className="mimport-desc">
              Paste the contents of a <code>.thjson</code> or <code>.md</code> roster
              file below, then tap <strong>Load</strong>.
            </p>
            <textarea
              className="mimport-textarea"
              placeholder={'Paste .thjson or .md file contents here…'}
              value={importPasteText}
              onChange={e => setImportPasteText(e.target.value)}
              rows={10}
            />

            <div className="mimport-actions">
              <button
                className="mbtn mbtn-primary mimport-btn"
                disabled={!importPasteText.trim()}
                onClick={handleImportFromPaste}
              >
                ⬆ Load
              </button>
              <button
                className="mbtn mbtn-ghost mimport-btn"
                onClick={() => importInputRef.current?.click()}
              >
                📂 Pick File
              </button>
              <button
                className="mbtn mbtn-ghost mimport-btn"
                onClick={() => { setShowImportModal(false); setImportPasteText(''); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Elite progression modal */}
      {eliteProgressionIdx !== null && (() => {
        const unit = warband.units[eliteProgressionIdx];
        return (
          <EliteProgressionModal
            unit={unit}
            onChange={(updated: WarbandUnit) => setWarband(prev => {
              const units = [...prev.units];
              units[eliteProgressionIdx] = updated;
              return { ...prev, units };
            })}
            onClose={() => setEliteProgressionIdx(null)}
          />
        );
      })()}

      {/* Mercenary info modal */}
      {infoMercenary && (
        <MercenaryInfoModal
          mercenary={infoMercenary}
          onClose={() => setInfoMercenary(null)}
        />
      )}
    </div>
  );
}
