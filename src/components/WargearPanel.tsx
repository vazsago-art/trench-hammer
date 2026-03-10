import { useState } from 'react';
import { KeywordList } from './KeywordChip.js';
import { Weapon, WeaponReplacementRule } from '../types/index.js';
import {
  sharedBasicRangedWeapons,
  sharedPistols,
  sharedSpecialRangedWeapons,
  sharedHeavyRangedWeapons,
  sharedThrownWeapons,
  sharedBasicMeleeWeapons,
  sharedSpecialMeleeWeapons,
  sharedHeavyMeleeWeapons,
  factionSpecificWeaponIds,
  allWeapons,
} from '../data/weapons.js';
import { armourOptions, equipmentOptions, allFactionEquipment } from '../data/equipment.js';
import { WargearOption } from '../types/index.js';
import {
  computeSlotUsage,
  validateAddWargear,
  lookupWeapon,
  lookupWargear,
} from '../data/wargearSlotValidation.js';
import { WargearInfoModal } from './WargearInfoModal.js';
import './WargearPanel.css';

interface SelectedItem {
  id: string;
  name: string;
  cost: number;
  costCurrency?: 'credits' | 'glory';
  type: 'weapon' | 'armor' | 'equipment';
  quantity: number;
  grantsKeywords?: string[];
  /** When true, this item was auto-applied by the warband variant and cannot be removed. */
  isDefault?: boolean;
}

interface WargearPanelProps {
  unitName: string;
  unitCount: number;
  selectedItems: SelectedItem[];
  /** Default / included wargear from the unit definition. Shown as locked items
   *  that cannot be removed — only replaced (e.g. body-armour upgrades). */
  defaultItems?: SelectedItem[];
  /** Optional allow-list of item IDs. When provided, only items whose IDs
   *  appear in this array are shown in each category. */
  allowedIds?: string[];
  /** Keywords the model already has (used for slot capacity checks) */
  modelKeywords?: string[];
  /** Optional weapon replacement rules: when a weapon of the given type is
   *  equipped, the named default weapon is shown as replaced. */
  weaponReplacementRules?: WeaponReplacementRule[];
  /** When true, this unit cannot be equipped with any additional gear.
   *  A notice is shown and the add-categories section is hidden. */
  cannotEquip?: boolean;
  /** Original full Weapon/WargearOption objects from unit.defaultWargear — used to
   *  power the eye-icon info modal on included equipment rows. */
  rawDefaultWargear?: (Weapon | WargearOption)[];
  onAdd: (item: SelectedItem) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}

type Category = {
  label: string;
  items: (Weapon | WargearOption)[];
  type: 'weapon' | 'armor' | 'equipment';
};

/** IDs of all items that are faction-specific (weapons + equipment/armour). Used for the ★ badge. */
const factionSpecificIds = new Set<string>([
  ...Array.from(factionSpecificWeaponIds),
  ...allFactionEquipment.map(e => e.id),
]);

export function WargearPanel({
  unitName,
  unitCount,
  selectedItems,
  defaultItems = [],
  allowedIds,
  modelKeywords = [],
  onAdd,
  onRemove,
  onClose,
  weaponReplacementRules,
  cannotEquip,
  rawDefaultWargear = [],
}: WargearPanelProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [infoItem, setInfoItem] = useState<{ item: Weapon | WargearOption; catType: 'weapon' | 'armor' | 'equipment' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedMap = new Map(selectedItems.map(s => [s.id, s]));
  const allowedSet = allowedIds ? new Set(allowedIds) : null;

  // Determine which default items have been replaced by a selected item in the same slot
  // OR by equipping a weapon of a matching type per weaponReplacementRules.
  // OR by an auto-applied locked item that has replacesDefaultId pointing at this item.
  const isDefaultReplaced = (defItem: SelectedItem): boolean => {
    // Auto-mod replacement check: a locked selectedItem explicitly replaces this default by ID
    if (selectedItems.some(sel => (sel as any).replacesDefaultId === defItem.id)) return true;
    // Existing armor-slot replacement check
    const defSlot = (defItem as any).slot as string | undefined
      ?? lookupWargear(defItem.id)?.slot;
    if (defSlot) {
      if (selectedItems.some(sel => {
        const selSlot = (sel as any).slot as string | undefined
          ?? lookupWargear(sel.id)?.slot;
        return selSlot === defSlot;
      })) return true;
    }
    // Weapon replacement rules check
    if (weaponReplacementRules) {
      const rule = weaponReplacementRules.find(r => r.replacedDefaultId === defItem.id);
      if (rule) {
        return selectedItems.some(sel => {
          const weapon = lookupWeapon(sel.id);
          return weapon?.type === rule.whenAddingWeaponType;
        });
      }
    }
    return false;
  };

  // For slot bar: count unreplaced defaults + selected items
  const unreplacedDefaults = defaultItems.filter(d => !isDefaultReplaced(d));
  // Slot usage snapshot (recomputed on every render from selectedItems + unreplaced defaults)
  const usage = computeSlotUsage([...unreplacedDefaults, ...selectedItems], modelKeywords);

  const totalWargearCredits = selectedItems
    .filter(s => (s.costCurrency ?? 'credits') === 'credits')
    .reduce((sum, s) => sum + s.cost * s.quantity, 0);
  const totalWargearGlory = selectedItems
    .filter(s => s.costCurrency === 'glory')
    .reduce((sum, s) => sum + s.cost * s.quantity, 0);
  const wargearSummary = [
    totalWargearCredits > 0 ? `${totalWargearCredits} Credits` : '',
    totalWargearGlory > 0 ? `${totalWargearGlory} Glory` : '',
  ].filter(Boolean).join(' + ') || '0 Credits';

  /** Filter to faction-allowed items, and also by search query when active. */
  function filterItems(items: (Weapon | WargearOption)[]): (Weapon | WargearOption)[] {
    let filtered = allowedSet ? items.filter(item => allowedSet.has(item.id)) : items;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.keywords.some(k => k.toLowerCase().includes(q))
      );
    }
    return filtered;
  }

  /** Faction-specific upgrade items (marks, icons, abilities, mutations, etc.) */
  const factionUpgradeItems: WargearOption[] = allowedSet
    ? allFactionEquipment.filter(item => allowedSet.has(item.id))
    : [];
  // Build categories dynamically, merging faction-specific armour and equipment
  // into their respective shared categories rather than showing a separate tab.
  // Deduplicate by name: if a faction-specific item has the same name as a shared
  // item, the shared item is dropped so only the faction-specific one (with ★) shows.
  const factionArmourItems = factionUpgradeItems.filter(i => i.type === 'armor');
  const factionEquipItems  = factionUpgradeItems.filter(i => i.type !== 'armor');

  const factionEquipNames  = new Set(factionEquipItems.map(i => i.name));
  const factionArmourNames = new Set(factionArmourItems.map(i => i.name));

  const mergedArmour = [
    ...armourOptions.filter(i => !factionArmourNames.has(i.name)),
    ...factionArmourItems,
  ];
  const mergedEquip = [
    ...equipmentOptions.filter(i => !factionEquipNames.has(i.name)),
    ...factionEquipItems,
  ];

  // Faction-specific weapons that belong to this faction's wargear pool.
  // These live in faction weapon arrays (not the shared lists) so must be
  // injected into the matching category buckets manually.
  const factionAllowedWeapons = allowedSet
    ? allWeapons.filter(w => factionSpecificWeaponIds.has(w.id) && allowedSet.has(w.id))
    : [];

  const fwPistol      = factionAllowedWeapons.filter(w => w.keywords.includes('PISTOL'));
  const fwHeavyRanged = factionAllowedWeapons.filter(w => w.type === 'ranged' && w.keywords.includes('HEAVY') && !w.keywords.includes('PISTOL'));
  const fwSpecRanged  = factionAllowedWeapons.filter(w => w.type === 'ranged' && !w.keywords.includes('HEAVY') && !w.keywords.includes('PISTOL'));
  const fwThrown      = factionAllowedWeapons.filter(w => w.type === 'thrown');
  const fwHeavyMelee  = factionAllowedWeapons.filter(w => w.type === 'melee' && w.keywords.includes('HEAVY'));
  const fwSpecMelee   = factionAllowedWeapons.filter(w => w.type === 'melee' && !w.keywords.includes('HEAVY'));

  const CATEGORIES: Category[] = [
    { label: 'Basic Ranged',      items: sharedBasicRangedWeapons,                            type: 'weapon' },
    { label: 'Pistols',           items: [...sharedPistols, ...fwPistol],                     type: 'weapon' },
    { label: 'Special Ranged',    items: [...sharedSpecialRangedWeapons, ...fwSpecRanged],    type: 'weapon' },
    { label: 'Heavy Ranged',      items: [...sharedHeavyRangedWeapons, ...fwHeavyRanged],     type: 'weapon' },
    { label: 'Thrown / Grenades', items: [...sharedThrownWeapons, ...fwThrown],               type: 'weapon' },
    { label: 'Basic Melee',       items: sharedBasicMeleeWeapons,                             type: 'weapon' },
    { label: 'Special Melee',     items: [...sharedSpecialMeleeWeapons, ...fwSpecMelee],      type: 'weapon' },
    { label: 'Heavy Melee',       items: [...sharedHeavyMeleeWeapons, ...fwHeavyMelee],       type: 'weapon' },
    { label: 'Armour',            items: mergedArmour,  type: 'armor' },
    { label: 'Equipment',         items: mergedEquip,   type: 'equipment' },
  ];
  /**
   * Returns the error message if adding this item is not allowed,
   * or null if it can be added.
   */
  function getAddBlockReason(item: Weapon | WargearOption): string | null {
    // Block adding any item that is part of this unit's default (included) equipment,
    // regardless of whether it has been "replaced" by another slot item. The default
    // item is always part of the unit – you cannot buy a second copy for extra cost.
    if (defaultItems.some(d => d.id === item.id)) {
      return `${item.name} is already included in this unit's default equipment.`;
    }
    // For all other slot / hand conflicts, only count purchased items (not defaults that would be replaced).
    const errors = validateAddWargear(selectedItems, item.id, modelKeywords);
    if (errors.length === 0) return null;
    return errors.map(e => e.message).join(' ');
  }

  return (
    <>
      <div className="wargear-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="wargear-panel">
        <div className="wargear-header">
          <div>
            <h2>Wargear — {unitName}</h2>
            <p className="wargear-subtitle">
              {unitCount} model{unitCount !== 1 ? 's' : ''} · Wargear total: <strong>{wargearSummary}</strong>
            </p>
          </div>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        <div className="wargear-scroll-body">

        {/* ── Cannot equip notice ──────────────────────────────── */}
        {cannotEquip && (
          <div className="wg-cannot-equip-notice">
            <span className="wg-cannot-equip-icon">🔒</span>
            <span>This unit cannot be equipped with any additional weapons, armour, or equipment.</span>
          </div>
        )}

        {/* ── Included (default) wargear ─────────────────────────── */}
        {defaultItems.length > 0 && (
          <div className="wargear-included">
            <h3>Included Equipment</h3>
            <div className="wargear-selected-list">
              {defaultItems.map(item => {
                const replaced = isDefaultReplaced(item);
                const rawItem = rawDefaultWargear.find(r => r.id === item.id);
                return (
                  <div key={item.id} className={`wargear-selected-item wg-default-item${replaced ? ' wg-replaced' : ''}`}>
                    <span className="wg-default-lock">{replaced ? '🔄' : '🔒'}</span>
                    <span className="wg-name">{item.name}</span>
                    {rawItem && (
                      <button
                        className="btn-wg-info"
                        title={`View ${item.name} details`}
                        onClick={() => setInfoItem({ item: rawItem, catType: rawItem.type as 'weapon' | 'armor' | 'equipment' })}
                      >👁</button>
                    )}
                    {replaced
                      ? <span className="wg-replaced-label">Replaced</span>
                      : <span className="wg-included-label">Included</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Slot usage bar ─────────────────────────────────────── */}
        {!cannotEquip && <div className="wg-slot-bar">
          <div className={`wg-slot-pill ${usage.rangedHandsUsed >= usage.maxRangedHands ? 'slot-full' : ''}`}>
            🎯 Ranged {usage.rangedHandsUsed}/{usage.maxRangedHands}
          </div>
          <div className={`wg-slot-pill ${usage.meleeHandsUsed >= usage.maxMeleeHands ? 'slot-full' : ''}`}>
            ⚔ Melee {usage.meleeHandsUsed}/{usage.maxMeleeHands}
          </div>
          <div className={`wg-slot-pill ${usage.hasShield ? 'slot-used' : ''} ${usage.hasTwoHandedRanged ? 'slot-blocked' : ''}`}>
            🛡 Shield {usage.hasShield ? '✓' : usage.hasTwoHandedRanged ? '✗' : '○'}
          </div>
          <div className={`wg-slot-pill ${usage.hasBodyArmour ? 'slot-used' : ''}`}>
            🥋 Armour {usage.hasBodyArmour ? '✓' : '○'}
          </div>
          <div className={`wg-slot-pill ${usage.headgearCount > 0 ? 'slot-used' : ''}`}>
            🪖 Headgear {usage.headgearCount}/1
          </div>
          <div className={`wg-slot-pill ${usage.hasThrownWeapon ? 'slot-used' : ''}`}>
            💣 Grenade {usage.hasThrownWeapon ? '✓' : '○'}/1
          </div>
          <div className={`wg-slot-pill ${usage.hasMainHandWeapon ? 'slot-used' : ''}`}>
            ✊ Main Hand {usage.hasMainHandWeapon ? '✓' : '○'}/1
          </div>
        </div>}

        {selectedItems.length > 0 && (
          <div className="wargear-selected">
            <h3>Selected Wargear</h3>
            <div className="wargear-selected-list">
              {selectedItems.map(item => {
                const rawItem = lookupWeapon(item.id) ?? lookupWargear(item.id);
                return (
                <div key={item.id} className={`wargear-selected-item${item.isDefault ? ' wg-auto-applied' : ''}`}>
                  {item.isDefault && <span className="wg-default-lock">🔒</span>}
                  <span className="wg-name">{item.name}</span>
                  {rawItem && (
                    <button
                      className="btn-wg-info"
                      title={`View ${item.name} details`}
                      onClick={() => setInfoItem({ item: rawItem, catType: item.type })}
                    >👁</button>
                  )}
                  {item.isDefault ? (
                    <span className="wg-included-label">Auto-Applied</span>
                  ) : (
                    <>
                      <span className="wg-qty">×{item.quantity}</span>
                      <span className="wg-cost">
                        {item.cost * item.quantity} {item.costCurrency === 'glory' ? 'Glory' : 'Credits'}
                      </span>
                      <div className="wg-qty-controls">
                        <button onClick={() => {
                          if (item.quantity > 1) {
                            onAdd({ ...item, quantity: item.quantity - 1 });
                          } else {
                            onRemove(item.id);
                          }
                        }}>−</button>
                        <button
                          disabled={(() => {
                            const w = lookupWeapon(item.id);
                            if (w?.limit !== undefined && item.quantity >= w.limit) return true;
                            return validateAddWargear(selectedItems, item.id, modelKeywords).length > 0;
                          })()}
                          onClick={() => onAdd({ ...item, quantity: item.quantity + 1 })}
                        >+</button>
                      </div>
                    </>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Search box ───────────────────────────────────────── */}
        {!cannotEquip && (
          <div className="wg-search-bar">
            <span className="wg-search-icon">🔍</span>
            <input
              type="text"
              className="wg-search-input"
              placeholder="Search by name or keyword…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="wg-search-clear" title="Clear search" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        )}

        {!cannotEquip && <div className="wargear-categories">
          {CATEGORIES.map(cat => {
            const visibleItems = filterItems(cat.items);
            if (visibleItems.length === 0) return null;
            // Auto-expand all matching categories when a search is active
            const isOpen = searchQuery.trim() ? visibleItems.length > 0 : openCategory === cat.label;
            return (
              <div key={cat.label} className={`wargear-category${isOpen ? ' open' : ''}`}>
                <div
                  className="wargear-cat-header"
                  role="button"
                  onClick={() => { if (!searchQuery.trim()) setOpenCategory(prev => prev === cat.label ? null : cat.label); }}
                >
                  {cat.label} <span className="wg-cat-count">({visibleItems.length})</span>
                </div>
                {isOpen && <div className="wargear-item-grid">
                  {visibleItems.map(item => {
                    const existing    = selectedMap.get(item.id);
                    const blockReason = existing ? null : getAddBlockReason(item);
                    const isBlocked   = blockReason !== null;

                    return (
                      <div
                        key={item.id}
                        className={`wargear-item ${existing ? 'wg-active' : ''} ${isBlocked ? 'wg-blocked' : ''} ${factionSpecificIds.has(item.id) ? 'wg-variant-item' : ''}`}
                        title={isBlocked ? blockReason ?? undefined : undefined}
                      >
                        {/* Variant ribbon — top-right corner banner for faction-specific items */}
                        {factionSpecificIds.has(item.id) && (
                          <div className="wg-variant-ribbon">VARIANT</div>
                        )}
                        <div className="wg-item-header">
                          <span className="wg-item-name">{item.name}</span>
                          <button
                            className="btn-wg-info"
                            title={`View ${item.name} details`}
                            onClick={e => { e.stopPropagation(); setInfoItem({ item, catType: cat.type }); }}
                          >👁</button>
                        </div>
                        {/* Handedness badge row */}
                        {cat.type === 'weapon' && (
                          <div className="wg-item-badges">
                            {(() => {
                              const kws = item.keywords;
                              if (kws.includes('TWO-HANDED'))   return <span className="wg-badge badge-two">2H</span>;
                              if (kws.includes('PISTOL') || (item as Weapon).type === 'thrown' || kws.includes('THROWN'))
                                return <span className="wg-badge badge-one">1H</span>;
                              if (kws.includes('MAIN HAND ONLY')) return <span className="wg-badge badge-main">MH</span>;
                              return <span className="wg-badge badge-one">1H</span>;
                            })()}
                          </div>
                        )}
                        <div className="wg-item-keywords">
                          <KeywordList
                            keywords={item.keywords.filter(k => !['TWO-HANDED', 'ONE-HANDED', 'THROWN', 'PISTOL'].includes(k)).slice(0, 3)}
                            hide={new Set()}
                          />
                          {item.keywords.filter(k => !['TWO-HANDED', 'ONE-HANDED', 'THROWN', 'PISTOL'].includes(k)).length > 3 && ' …'}
                        </div>
                        {isBlocked && (
                          <div className="wg-block-reason">⛔ {blockReason}</div>
                        )}
                        <div className="wg-item-footer">
                          <span className="wg-item-cost">
                            {item.cost} {(item as any).costCurrency === 'glory' ? 'Glory' : 'Credits'}
                          </span>
                          {existing ? (
                            <div className="wg-item-controls">
                              <button onClick={() => {
                                if (existing.quantity > 1) {
                                  onAdd({ ...existing, quantity: existing.quantity - 1 });
                                } else {
                                  onRemove(item.id);
                                }
                              }}>−</button>
                              <span>{existing.quantity}</span>
                              <button
                                disabled={(() => {
                                  const w = lookupWeapon(item.id);
                                  if (w?.limit !== undefined && existing.quantity >= w.limit) return true;
                                  return validateAddWargear(selectedItems, item.id, modelKeywords).length > 0;
                                })()}
                                onClick={() => onAdd({ ...existing, quantity: existing.quantity + 1 })}
                              >+</button>
                            </div>
                          ) : (
                            <button
                              className="btn-add-wg"
                              disabled={isBlocked}
                              onClick={() => !isBlocked && onAdd({
                                id: item.id,
                                name: item.name,
                                cost: item.cost,
                                costCurrency: (item as any).costCurrency,
                                type: cat.type,
                                quantity: 1,
                                grantsKeywords: (item as any).grantsKeywords,
                              })}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>}
              </div>
            );
          })}
        </div>}{/* /wargear-categories */}

        </div>{/* /wargear-scroll-body */}
      </div>
    </div>
    {infoItem && (
      <WargearInfoModal
        item={infoItem.item}
        catType={infoItem.catType}
        onClose={() => setInfoItem(null)}
      />
    )}
  </>
  );
}
