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

  // Stackable upgrades (maxCount >= 10, e.g. Primaris) are independent of class upgrades.
  // Class upgrades (maxCount < 10) are mutually exclusive with each other.
  const isStackable = (upg: UnitUpgrade) => upg.maxCount >= 10;
  const classUpgradeId = Object.entries(selectedUpgrades).find(([id, cnt]) => {
    if (cnt <= 0) return false;
    const upg = upgrades.find(u => u.id === id);
    return upg && !isStackable(upg);
  })?.[0] ?? null;
  const classUpgrade = upgrades.find(u => u.id === classUpgradeId);

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

        <p className="upgrade-panel-note">
          Each unit can take <strong>at most one class upgrade</strong>.
          Stat boosts (e.g. Primaris) are independent and can be combined with a class upgrade.
        </p>

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
          {upgrades.map(upg => {
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
            const canSelect = takenByOthers < maxAllowed;
            const slotsLeft = maxAllowed - takenByOthers;

            return (
              <div
                key={upg.id}
                className={[
                  'upgrade-card',
                  isSelected ? 'upgrade-card-selected' : '',
                  !canSelect && !isSelected ? 'upgrade-card-full' : '',
                ].join(' ').trim()}
              >
                <div className="upgrade-card-header">
                  <div className="upgrade-name">
                    {isSelected && <span className="upgrade-selected-dot" title="Active upgrade">●</span>}
                    {upg.name}
                  </div>
                  <div className="upgrade-cost">
                    {upg.cost === 0 ? 'Free' : `+${upg.cost} Credits`}
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

                <div className="upgrade-footer">
                  <div className="upgrade-limit">
                    {takenByOthers}/{maxAllowed} units upgraded
                    {isLargeWarband && upg.maxCountLarge != null && ` (1200+ Cr)`}
                    {!canSelect && !isSelected && (
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
                          // For class upgrades: deselect the current class upgrade first,
                          // but leave any stackable upgrades untouched.
                          // For stackable upgrades: just toggle independently.
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
            );
          })}
        </div>

        <div className="upgrade-panel-footer">
          <button className="upgrade-done-btn" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
