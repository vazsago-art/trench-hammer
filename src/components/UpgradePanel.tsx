import { useState } from 'react';
import { UnitUpgrade } from '../types/index.js';
import { KeywordChip } from './KeywordChip.js';
import './UpgradePanel.css';

interface AutoTier {
  name: string;
  description: string;
  cost: number;
}

interface UpgradePanelProps {
  unitName: string;
  upgrades: UnitUpgrade[];
  /** Subfaction auto-applied base tier (e.g. Jakhal) shown as locked at the top */
  autoTiers?: AutoTier[];
  /** Upgrades selected for THIS unit — key = upgradeId, value = 0 or 1 */
  selectedUpgrades: Record<string, number>;
  /**
   * Warband-wide count of units (including this one) that have each upgrade.
   * Used to enforce the per-warband maxCount limit.
   */
  warbandUpgradeCounts: Record<string, number>;
  /** Total warband credit spend — ≥1200 unlocks the maxCountLarge higher limit */
  totalWarbandPoints: number;
  /**
   * Subfaction overrides for upgrade maxCount (keyed by upgradeId).
   * When present, these override the upgrade's own maxCount value.
   */
  upgradeMaxCountOverrides?: Record<string, number>;
  onSet: (upgradeId: string, count: number) => void;
  onClose: () => void;
}

export function UpgradePanel({
  unitName,
  upgrades,
  autoTiers,
  selectedUpgrades,
  warbandUpgradeCounts,
  totalWarbandPoints,
  upgradeMaxCountOverrides,
  onSet,
  onClose,
}: UpgradePanelProps) {
  const isLargeWarband = totalWarbandPoints >= 1200;

  // Track which upgrade is being previewed in each group tab bar
  // (key = group name, value = upgradeId being previewed or null)
  const [previewInGroup, setPreviewInGroup] = useState<Record<string, string>>({});

  // Stackable upgrades (maxCount >= 10, e.g. Primaris) are independent of class upgrades.
  // Nested upgrades (with requiredUpgradeId) are stackable with their parent.
  // upgradeGroup upgrades are stackable (not cleared by class change) but mutually exclusive within their group.
  // Class upgrades (maxCount < 10, no group) are mutually exclusive with each other.
  const isStackable = (upg: UnitUpgrade) => upg.maxCount >= 10 || !!upg.requiredUpgradeId || !!upg.upgradeGroup;
  const classUpgradeId = Object.entries(selectedUpgrades).find(([id, cnt]) => {
    if (cnt <= 0) return false;
    const upg = upgrades.find(u => u.id === id);
    return upg && !isStackable(upg);
  })?.[0] ?? null;
  const classUpgrade = upgrades.find(u => u.id === classUpgradeId);

  // Compute upgrade groups (e.g. 'background', 'specialty' for Pirate Crew)
  const groupNames = [...new Set(upgrades.filter(u => u.upgradeGroup).map(u => u.upgradeGroup!))];
  // Whether any non-stackable, non-group class upgrades exist
  const hasClassUpgrades = upgrades.some(u => !isStackable(u));

  return (
    <div className="upgrade-panel-overlay" onClick={onClose}>
      <div className="upgrade-panel" onClick={e => e.stopPropagation()}>

        <div className="upgrade-panel-header">
          <div>
            <h2 className="upgrade-panel-title">Unit Upgrade</h2>
            <div className="upgrade-panel-subtitle">{unitName}</div>
          </div>
          <button className="upgrade-close-btn" onClick={onClose}>✕</button>
        </div>

        {classUpgrade && (
          <div className="upgrade-current-notice">
            Class upgrade: <strong>{classUpgrade.name}</strong>
            {classUpgrade.cost > 0 && ` (+${classUpgrade.cost} Credits)`}
          </div>
        )}

        {hasClassUpgrades && (
          <p className="upgrade-panel-note">
            Each unit can take <strong>at most one class upgrade</strong>.
            Stat boosts (e.g. Primaris) are independent and can be combined with a class upgrade.
          </p>
        )}

        <div className="upgrade-panel-body">
          {autoTiers && autoTiers.length > 0 && (
            <>
              {autoTiers.map(tier => (
                <div key={tier.name} className="upgrade-card upgrade-card-auto">
                  <div className="upgrade-card-header">
                    <div className="upgrade-name">
                      <span className="upgrade-auto-dot">⚡</span>
                      {tier.name}
                      <span className="upgrade-auto-badge">Auto-applied</span>
                    </div>
                    <div className="upgrade-cost">
                      {tier.cost === 0 ? 'Included' : `+${tier.cost} Credits`}
                    </div>
                  </div>
                  <div className="upgrade-description">{tier.description}</div>
                </div>
              ))}
              {upgrades.length > 0 && (
                <div className="upgrade-subtier-label">↳ Optional sub-upgrade</div>
              )}
            </>
          )}

          {/* Render upgrade groups (e.g. Background and Specialty for Pirate Crew) as tab selectors */}
          {groupNames.map(group => {
            const groupUpgrades = upgrades.filter(u => u.upgradeGroup === group);
            const selectedInGroup = groupUpgrades.find(u => (selectedUpgrades[u.id] ?? 0) > 0);
            const groupLabel = group.charAt(0).toUpperCase() + group.slice(1);

            // The previewed tab = explicit preview state, or fall back to selected, or first in list
            const previewId = previewInGroup[group] ?? selectedInGroup?.id ?? groupUpgrades[0]?.id ?? null;
            const previewUpg = groupUpgrades.find(u => u.id === previewId) ?? null;

            return (
              <div key={group} className="upgrade-group-section">
                <div className="upgrade-group-header">
                  <span className="upgrade-group-label">{groupLabel}</span>
                  {selectedInGroup
                    ? <span className="upgrade-group-selected"> – <strong>{selectedInGroup.name}</strong></span>
                    : <span className="upgrade-group-none"> – none chosen</span>
                  }
                </div>

                {/* Tab pill buttons — one per option */}
                <div className="upgrade-group-tabs">
                  {groupUpgrades.map(u => {
                    const isActive = u.id === previewId;
                    const isChosen = (selectedUpgrades[u.id] ?? 0) > 0;
                    const costStr = u.cost === 0 ? '+0' : u.cost > 0 ? `+${u.cost}` : `${u.cost}`;
                    return (
                      <button
                        key={u.id}
                        className={[
                          'upgrade-group-tab',
                          isActive ? 'upgrade-group-tab--active' : '',
                          isChosen ? 'upgrade-group-tab--chosen' : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => setPreviewInGroup(prev => ({ ...prev, [group]: u.id }))}
                        title={u.description}
                      >
                        {u.name} <span className="upgrade-group-tab-cost">{costStr}cr</span>
                        {isChosen && <span className="upgrade-group-tab-check"> ✓</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Detail card for the previewed option */}
                {previewUpg && (() => {
                  const upg = previewUpg;
                  const stackable = isStackable(upg);
                  const isSelected = (selectedUpgrades[upg.id] ?? 0) > 0;
                  const subfactionMax = upgradeMaxCountOverrides?.[upg.id];
                  const maxAllowed = subfactionMax != null
                    ? subfactionMax
                    : isLargeWarband && upg.maxCountLarge != null
                      ? upg.maxCountLarge
                      : upg.maxCount;
                  const takenByOthers = (warbandUpgradeCounts[upg.id] ?? 0) - (isSelected ? 1 : 0);
                  const canSelect = takenByOthers < maxAllowed;

                  return (
                    <div className={['upgrade-group-detail', isSelected ? 'upgrade-group-detail--selected' : ''].filter(Boolean).join(' ')}>
                      <div className="upgrade-group-detail-header">
                        <span className="upgrade-group-detail-name">
                          {isSelected && <span className="upgrade-selected-dot" title="Active">●</span>}
                          {upg.name}
                        </span>
                        <span className="upgrade-cost">
                          {upg.cost === 0 ? 'Free' : upg.cost > 0 ? `+${upg.cost} Credits` : `${upg.cost} Credits`}
                        </span>
                      </div>

                      {upg.grantedKeywords && upg.grantedKeywords.length > 0 && (
                        <div className="upgrade-keywords">
                          <span className="upgrade-kw-label">Grants:</span>
                          {upg.grantedKeywords.map(kw => (
                            <KeywordChip key={kw} keyword={kw} className="upgrade-kw-chip" />
                          ))}
                        </div>
                      )}

                      <div className="upgrade-description">{upg.description}</div>

                      <div className="upgrade-footer">
                        <div className="upgrade-limit">
                          {takenByOthers}/{maxAllowed === 99 ? '∞' : maxAllowed} units
                          {!canSelect && !isSelected && (
                            <span className="upgrade-full-label"> · Warband full</span>
                          )}
                        </div>
                        <div className="upgrade-action-row">
                          {isSelected ? (
                            <button
                              className="upgrade-btn-action upgrade-btn-remove"
                              onClick={() => onSet(upg.id, 0)}
                            >
                              ✕ Remove
                            </button>
                          ) : (
                            <button
                              className="upgrade-btn-action upgrade-btn-select"
                              disabled={!canSelect}
                              onClick={() => {
                                if (!stackable && classUpgradeId) onSet(classUpgradeId, 0);
                                onSet(upg.id, 1);
                              }}
                            >
                              ⬆ Select
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Children (e.g. sub-specialties) */}
                      {upgrades.filter(c => c.requiredUpgradeId === upg.id).length > 0 && (
                        <div style={{ marginTop: '0.5rem' }}>
                          {renderUpgrades(upgrades.filter(c => c.requiredUpgradeId === upg.id), true)}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          })}

          {/* Render non-group upgrades (class + stackable) */}
          {renderUpgrades(upgrades.filter(u => !u.requiredUpgradeId && !u.upgradeGroup), false)}
        </div>

        <div className="upgrade-panel-footer">
          <button className="upgrade-done-btn" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );

  function renderUpgrades(list: UnitUpgrade[], isChild: boolean) {
    return list.map(upg => {
      const stackable = isStackable(upg);
      const isSelected = stackable
        ? (selectedUpgrades[upg.id] ?? 0) > 0
        : classUpgradeId === upg.id;
      const subfactionMax = upgradeMaxCountOverrides?.[upg.id];
      const maxAllowed = subfactionMax != null
        ? subfactionMax
        : isLargeWarband && upg.maxCountLarge != null
          ? upg.maxCountLarge
          : upg.maxCount;
      const takenByOthers = (warbandUpgradeCounts[upg.id] ?? 0) - (isSelected ? 1 : 0);
      const slotsLeft = maxAllowed - takenByOthers;
      
      // Parent constraint logic for nested upgrades
      const parentId = upg.requiredUpgradeId;
      const isParentSelected = !parentId || (selectedUpgrades[parentId] ?? 0) > 0;
      const canSelect = takenByOthers < maxAllowed && isParentSelected;

      // Children of this upgrade
      const children = upgrades.filter(c => c.requiredUpgradeId === upg.id);

      return (
        <div key={upg.id} style={isChild ? { marginLeft: '2rem', borderLeft: '2px solid #444', paddingLeft: '0.5rem' } : undefined}>
          <div
            className={[
              'upgrade-card',
              isSelected ? 'upgrade-card-selected' : '',
              !canSelect && !isSelected ? 'upgrade-card-full' : '',
            ].join(' ').trim()}
            style={!isParentSelected ? { opacity: 0.6, pointerEvents: 'none' } : undefined}
          >
            <div className="upgrade-card-header">
              <div className="upgrade-name">
                {isSelected && <span className="upgrade-selected-dot" title="Active upgrade">●</span>}
                {upg.name}
              </div>
              <div className="upgrade-cost">
                {upg.cost === 0 ? 'Free' : upg.cost > 0 ? `+${upg.cost} Credits` : `${upg.cost} Credits`}
              </div>
            </div>

            {upg.grantedKeywords && upg.grantedKeywords.length > 0 && (
              <div className="upgrade-keywords">
                <span className="upgrade-kw-label">Grants:</span>
                {upg.grantedKeywords.map(kw => (
                  <KeywordChip key={kw} keyword={kw} className="upgrade-kw-chip" />
                ))}
              </div>
            )}

            <div className="upgrade-description">{upg.description}</div>
            
            {!isParentSelected && parentId && (
               <div className="upgrade-req-warning" style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '4px' }}>
                 ⚠ Requires parent upgrade selection
               </div>
            )}

            <div className="upgrade-footer">
              <div className="upgrade-limit">
                {takenByOthers}/{maxAllowed} units upgraded
                {isLargeWarband && upg.maxCountLarge != null && ` (1200+ Cr)`}
                {!canSelect && !isSelected && isParentSelected && (
                  <span className="upgrade-full-label"> · Warband full</span>
                )}
                {canSelect && !isSelected && slotsLeft > 0 && (
                  <span className="upgrade-slots-left"> · {slotsLeft} slot{slotsLeft !== 1 ? 's' : ''} left</span>
                )}
              </div>
              <div className="upgrade-action-row">
                {isSelected ? (
                  <button
                    className="upgrade-btn-action upgrade-btn-remove"
                    onClick={() => onSet(upg.id, 0)}
                  >
                    ✕ Remove
                  </button>
                ) : (
                  <button
                    className="upgrade-btn-action upgrade-btn-select"
                    disabled={!canSelect}
                    onClick={() => {
                      // Handle MARK mutual exclusivity (max 1 MARK per model)
                      if (upg.keywords?.includes('MARK')) {
                        const existingMarkId = upgrades.find(u => 
                          u.keywords?.includes('MARK') && (selectedUpgrades[u.id] ?? 0) > 0
                        )?.id;
                        if (existingMarkId && existingMarkId !== upg.id) {
                          onSet(existingMarkId, 0);
                        }
                      }
                      
                      // Handle mutual exclusivity defined in conflictsWithUpgradeIds
                      if (upg.conflictsWithUpgradeIds) {
                        for (const conflictId of upg.conflictsWithUpgradeIds) {
                          if ((selectedUpgrades[conflictId] ?? 0) > 0) {
                             onSet(conflictId, 0);
                          }
                        }
                      }

                      // For class upgrades: deselect the current class upgrade first,
                      // but leave any stackable upgrades untouched.
                      // For stackable upgrades (including upgradeGroup): just toggle independently.
                      // Group mutual-exclusivity is handled server-side in handleSetUpgrade.
                      if (!stackable && classUpgradeId) onSet(classUpgradeId, 0);
                      onSet(upg.id, 1);
                    }}
                  >
                    ⬆ Select
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Render Children Recursively */}
          {children.length > 0 && renderUpgrades(children, true)}
        </div>
      );
    });
  }
}
