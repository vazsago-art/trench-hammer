import React, { useState, useMemo } from 'react';
import './MercenaryPanel.css';
import { WarbandMercenary } from '../types/index';
import { Mercenary } from '../types/index';
import { getGroupedAvailableMercenaries } from '../data/mercenaryEligibility';
import { MercenaryInfoModal } from './MercenaryInfoModal';

interface MercenaryPanelProps {
  factionId: string;
  subfactionId?: string;
  /** Keywords of the warband leader (used for `leaderKeywordRequired` checks). */
  leaderKeywords?: string[];
  /** Currently hired mercenaries for this warband. */
  mercenaries: WarbandMercenary[];
  /** Current glory spent (total, including non-mercenary glory). */
  currentGlory: number;
  /** Glory cap (0 = no cap). */
  gloryLimit: number;
  /** Called when the list of hired mercenaries changes. */
  onChange: (mercenaries: WarbandMercenary[]) => void;
  /** Called when the user sets a new glory cap value. */
  onGloryLimitChange: (limit: number) => void;
  onClose: () => void;
}

const MercenaryPanel: React.FC<MercenaryPanelProps> = ({
  factionId,
  subfactionId,
  leaderKeywords = [],
  mercenaries,
  currentGlory,
  gloryLimit,
  onChange,
  onGloryLimitChange,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [infoMerc, setInfoMerc] = useState<Mercenary | null>(null);
  const [pickingOptionForMercId, setPickingOptionForMercId] = useState<string | null>(null);

  // Grouped available mercenaries for this faction
  const groupedMercs = useMemo(
    () => getGroupedAvailableMercenaries(factionId, subfactionId, leaderKeywords),
    [factionId, subfactionId, leaderKeywords],
  );

  // Total glory just from mercenaries
  const mercGlory = mercenaries.reduce((t, m) => t + m.gloryCost * m.count, 0);
  const overLimit = gloryLimit > 0 && currentGlory > gloryLimit;

  // Count for a given mercenary id
  const getCount = (id: string): number =>
    mercenaries.find((m) => m.mercenaryId === id)?.count ?? 0;

  const handleAdd = (merc: Mercenary) => {
    const current = getCount(merc.id);
    if (current >= merc.maxCount) return;
    const existing = mercenaries.find((m) => m.mercenaryId === merc.id);
    if (existing) {
      onChange(
        mercenaries.map((m) =>
          m.mercenaryId === merc.id ? { ...m, count: m.count + 1 } : m,
        ),
      );
    } else {
      onChange([
        ...mercenaries,
        {
          mercenaryId: merc.id,
          name: merc.name,
          gloryCost: merc.gloryCost,
          count: 1,
        },
      ]);
    }
  };

  const handleRemove = (merc: Mercenary) => {
    const current = getCount(merc.id);
    if (current <= 0) return;
    if (current === 1) {
      onChange(mercenaries.filter((m) => m.mercenaryId !== merc.id));
    } else {
      onChange(
        mercenaries.map((m) =>
          m.mercenaryId === merc.id ? { ...m, count: m.count - 1 } : m,
        ),
      );
    }
  };

  /** Called when the user picks a recruit option for a merc that requires one. */
  const completeHire = (merc: Mercenary, optionId: string) => {
    const option = merc.recruitOptions?.find((o) => o.id === optionId);
    const gloryCost = merc.gloryCost + (option?.gloryCostModifier ?? 0);
    onChange([
      ...mercenaries,
      {
        mercenaryId: merc.id,
        name: merc.name,
        gloryCost,
        count: 1,
        selectedRecruitOptionId: optionId,
      },
    ]);
    setPickingOptionForMercId(null);
  };

  // Filter by search
  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groupedMercs;
    const q = search.toLowerCase();
    const result: Record<string, Mercenary[]> = {};
    for (const [sub, list] of Object.entries(groupedMercs)) {
      const filtered = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.subcategory.toLowerCase().includes(q) ||
          (m.description ?? '').toLowerCase().includes(q),
      );
      if (filtered.length) result[sub] = filtered;
    }
    return result;
  }, [groupedMercs, search]);

  const totalHired = mercenaries.reduce((t, m) => t + m.count, 0);
  const subcategories = Object.keys(filteredGroups).sort();

  return (
    <>
    <div className="mercenary-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mercenary-panel" role="dialog" aria-modal aria-label="Hire Mercenaries">
        {/* ── Header ── */}
        <div className="mercenary-header">
          <div className="mercenary-header-left">
            <h2>Hire Mercenaries</h2>
            <p>Mercenaries are paid in Glory, not Credits.</p>
            <div className="mercenary-limit-row">
              <label htmlFor="glory-cap">Glory cap:</label>
              <input
                id="glory-cap"
                type="number"
                min={0}
                max={999}
                step={1}
                value={gloryLimit === 0 ? '' : gloryLimit}
                placeholder="none"
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  onGloryLimitChange(isNaN(v) ? 0 : Math.max(0, v));
                }}
              />
              <span>{gloryLimit > 0 ? `(${currentGlory} / ${gloryLimit} Glory)` : '(no cap)'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className={`mercenary-glory-badge${overLimit ? ' over-limit' : ''}`}>
              ⚔ {mercGlory} Glory
            </div>
            <button className="mercenary-close-btn" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="mercenary-toolbar">
          <label htmlFor="merc-search">Search:</label>
          <input
            id="merc-search"
            className="mercenary-search"
            type="text"
            placeholder="Filter mercenaries…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ── Content ── */}
        <div className="mercenary-content">
          {subcategories.length === 0 ? (
            <div className="mercenary-empty">
              {search
                ? 'No mercenaries match your search.'
                : 'No mercenaries are available for this warband.'}
            </div>
          ) : (
            subcategories.map((sub) => (
              <div key={sub} className="merc-subcategory">
                <div className="merc-subcategory-title">{sub}</div>
                {filteredGroups[sub].map((merc) => {
                  const count = getCount(merc.id);
                  const atMax = count >= merc.maxCount;

                  const hired = mercenaries.find((m) => m.mercenaryId === merc.id);
                  const chosenOption = hired?.selectedRecruitOptionId
                    ? merc.recruitOptions?.find((o) => o.id === hired.selectedRecruitOptionId)
                    : undefined;
                  const isPicking = pickingOptionForMercId === merc.id;

                  return (
                    <div
                      key={merc.id}
                      className={`merc-row${count > 0 ? ' hired' : ''}${isPicking ? ' picking' : ''}`}
                    >
                      {/* Line 1: Name + description */}
                      <div className="merc-row-line1">
                        <span className="merc-name">{merc.name}</span>
                        {merc.description && (
                          <span className="merc-desc"> — {merc.description}</span>
                        )}
                      </div>

                      {/* Line 2: ℹ button + cost + options toggle + count controls */}
                      <div className="merc-row-line2">
                        {merc.stats ? (
                          <button
                            className="merc-info-btn"
                            onClick={() => setInfoMerc(merc)}
                            aria-label={`View ${merc.name} details`}
                            title="View details"
                          >
                            ℹ
                          </button>
                        ) : <span className="merc-info-placeholder" />}

                        <div className="merc-glory-cost">
                          {merc.gloryCost}<span> Glory</span>
                        </div>

                        {/* Options toggle button — always visible when merc has choices */}
                        {merc.recruitOptions?.length ? (
                          <button
                            className={`merc-options-toggle${isPicking ? ' active' : ''}${chosenOption ? ' chosen' : ''}`}
                            onClick={() => setPickingOptionForMercId(isPicking ? null : merc.id)}
                            title={chosenOption ? `Chosen: ${chosenOption.label}` : (merc.recruitPrompt ?? 'Choose an option')}
                          >
                            {chosenOption ? `⚙ ${chosenOption.label}` : '⚙ Choose…'}
                          </button>
                        ) : null}

                        <div className="merc-count-controls">
                          <button
                            className="merc-count-btn"
                            onClick={() => handleRemove(merc)}
                            disabled={count === 0}
                            aria-label={`Remove ${merc.name}`}
                          >
                            −
                          </button>
                          <span className="merc-count-display">{count}</span>
                          <button
                            className="merc-count-btn"
                            onClick={() => {
                              if (merc.recruitOptions?.length && count === 0 && !hired?.selectedRecruitOptionId) {
                                setPickingOptionForMercId(merc.id);
                              } else {
                                handleAdd(merc);
                              }
                            }}
                            disabled={atMax}
                            aria-label={`Add ${merc.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Inline option picker — expands below when open */}
                      {isPicking && merc.recruitOptions && (
                        <div className="merc-option-picker">
                          <span className="merc-option-prompt">{merc.recruitPrompt ?? 'Choose an option:'}</span>
                          <div className="merc-option-buttons">
                            {merc.recruitOptions.map((opt) => (
                              <button
                                key={opt.id}
                                className={`merc-option-btn${chosenOption?.id === opt.id ? ' selected' : ''}`}
                                title={opt.description}
                                onClick={() => {
                                  if (count === 0) {
                                    completeHire(merc, opt.id);
                                  } else {
                                    // Update option on already-hired merc
                                    onChange(mercenaries.map((m) =>
                                      m.mercenaryId === merc.id
                                        ? { ...m, selectedRecruitOptionId: opt.id, gloryCost: merc.gloryCost + (opt.gloryCostModifier ?? 0) }
                                        : m
                                    ));
                                    setPickingOptionForMercId(null);
                                  }
                                }}
                              >
                                {opt.label}{opt.gloryCostModifier ? ` (+${opt.gloryCostModifier} Glory)` : ''}
                              </button>
                            ))}
                            <button
                              className="merc-option-cancel"
                              onClick={() => setPickingOptionForMercId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* ── Footer ── */}
        <div className="mercenary-footer">
          <div className="mercenary-footer-stats">
            <div className={`mercenary-footer-total${overLimit ? ' over-limit' : ''}`}>
              {mercGlory} Glory spent on mercenaries
              {gloryLimit > 0 && ` / ${gloryLimit} cap`}
              {overLimit && ' — OVER LIMIT'}
            </div>
            <div className="mercenary-footer-count">
              {totalHired} mercenari{totalHired === 1 ? 'y' : 'es'} hired
            </div>
          </div>
          <button className="mercenary-done-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>

      {infoMerc && (
        <MercenaryInfoModal mercenary={infoMerc} onClose={() => setInfoMerc(null)} />
      )}
    </>
  );
};

export default MercenaryPanel;
