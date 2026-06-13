import { useState, useEffect } from 'react';
import {
  quickBuild,
  PLAY_STYLE_LABELS,
  PLAY_STYLE_ICONS,
  PLAY_STYLE_DESCS,
  ROLE_ICONS,
  ROLE_LABELS,
  ROLE_TIPS,
  type PlayStyle,
  type QuickBuildResult,
} from '../utils/quickBuild.js';
import { allFactions } from '../data/factions_complete.js';
import { factionHasSubFactions, getSubFactions, getDefaultSubFactionId } from '../data/subfactions.js';
import type { WarbandUnit } from '../types/index.js';
import './QuickBuildWizard.css';

interface Props {
  onClose: () => void;
  onApplyBuild: (
    factionId: string,
    subfactionId: string,
    creditLimit: number,
    gloryLimit: number,
    units: WarbandUnit[],
  ) => void;
}

const ALL_PLAY_STYLES: PlayStyle[] = ['balanced', 'aggressive', 'ranged', 'horde', 'elite'];

const CREDIT_PRESETS = [500, 700, 1000, 1200, 1500];

export function QuickBuildWizard({ onClose, onApplyBuild }: Props) {
  // ── Step 1 state ──────────────────────────────────────────────────────────
  const [creditLimit, setCreditLimit] = useState(700);
  const [gloryLimit,  setGloryLimit]  = useState(0);
  const [factionId,   setFactionId]   = useState<string>('__beginner__');
  const [subfactionId, setSubfactionId] = useState<string>('no_variant');
  const [playStyle,   setPlayStyle]   = useState<PlayStyle>('balanced');

  // ── Reset subfaction whenever faction changes ─────────────────────────────
  useEffect(() => {
    if (factionId !== '__beginner__') {
      setSubfactionId(getDefaultSubFactionId(factionId));
    } else {
      setSubfactionId('no_variant');
    }
  }, [factionId]);

  // ── Step 2 state ──────────────────────────────────────────────────────────
  const [step,    setStep]    = useState<1 | 2>(1);
  const [results, setResults] = useState<QuickBuildResult[]>([]);
  /** When "Best for Beginners" produces multiple options, drill into one */
  const [detail,  setDetail]  = useState<QuickBuildResult | null>(null);

  // ── Derived ───────────────────────────────────────────────────────────────
  const isBeginnerMode = factionId === '__beginner__';

  function handleGenerate() {
    const id = isBeginnerMode ? null : factionId;
    const built = quickBuild({ factionId: id, creditLimit, gloryLimit, playStyle, subfactionId: isBeginnerMode ? undefined : subfactionId });
    setResults(built);
    setDetail(isBeginnerMode ? null : (built[0] ?? null));
    setStep(2);
  }

  function handleLoad(result: QuickBuildResult) {
    onApplyBuild(result.factionId, subfactionId, creditLimit, gloryLimit, result.warbandUnits);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="qbw-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="qbw-modal">
        {/* Header */}
        <div className="qbw-header">
          <div className="qbw-header-left">
            <h2 className="qbw-title">🎲 Quick Build</h2>
            <p className="qbw-subtitle">Generate a recommended army for your budget</p>
          </div>
          <button className="qbw-close" onClick={onClose}>✕</button>
        </div>

        {step === 1 && (
          <div className="qbw-body">
            {/* Budget */}
            <section className="qbw-section">
              <h3 className="qbw-section-title">Budget</h3>
              <div className="qbw-budget-row">
                <div className="qbw-field">
                  <label className="qbw-label">Credits</label>
                  <div className="qbw-number-row">
                    <button className="qbw-spin" onClick={() => setCreditLimit(v => Math.max(200, v - 50))}>−</button>
                    <input
                      className="qbw-input"
                      type="number"
                      min={200} max={2000} step={50}
                      value={creditLimit}
                      onChange={e => setCreditLimit(Math.max(200, Math.min(2000, +e.target.value || 700)))}
                    />
                    <button className="qbw-spin" onClick={() => setCreditLimit(v => Math.min(2000, v + 50))}>+</button>
                  </div>
                  <div className="qbw-presets">
                    {CREDIT_PRESETS.map(p => (
                      <button
                        key={p}
                        className={`qbw-preset${creditLimit === p ? ' qbw-preset--active' : ''}`}
                        onClick={() => setCreditLimit(p)}
                      >{p}</button>
                    ))}
                  </div>
                </div>

                <div className="qbw-field">
                  <label className="qbw-label">Glory Points</label>
                  <div className="qbw-number-row">
                    <button className="qbw-spin" onClick={() => setGloryLimit(v => Math.max(0, v - 1))}>−</button>
                    <input
                      className="qbw-input qbw-input--sm"
                      type="number"
                      min={0} max={30} step={1}
                      value={gloryLimit}
                      onChange={e => setGloryLimit(Math.max(0, Math.min(30, +e.target.value || 0)))}
                    />
                    <button className="qbw-spin" onClick={() => setGloryLimit(v => Math.min(30, v + 1))}>+</button>
                  </div>
                  <p className="qbw-hint">0 = disabled (recommended for new players)</p>
                </div>
              </div>
            </section>

            {/* Faction */}
            <section className="qbw-section">
              <h3 className="qbw-section-title">Faction</h3>
              <select
                className="qbw-select"
                value={factionId}
                onChange={e => setFactionId(e.target.value)}
              >
                <option value="__beginner__">✨ Best for Beginners (show top 5)</option>
                <optgroup label="─ All Factions ─────────────">
                  {allFactions.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </optgroup>
              </select>
              {isBeginnerMode && (
                <p className="qbw-hint qbw-hint--info">
                  We'll generate a build for each of our top 5 beginner-friendly factions so you can compare.
                </p>
              )}
            </section>

            {/* Warband Variant (subfaction) — only when a specific faction is chosen and it has variants */}
            {!isBeginnerMode && factionHasSubFactions(factionId) && (
              <section className="qbw-section">
                <h3 className="qbw-section-title">Warband Variant</h3>
                <select
                  className="qbw-select"
                  value={subfactionId}
                  onChange={e => setSubfactionId(e.target.value)}
                >
                  {(getSubFactions(factionId)?.subFactions ?? []).map(sf => (
                    <option key={sf.id} value={sf.id}>{sf.name}</option>
                  ))}
                </select>
              </section>
            )}

            {/* Play style */}
            <section className="qbw-section">
              <h3 className="qbw-section-title">Play Style</h3>
              <div className="qbw-style-grid">
                {ALL_PLAY_STYLES.map(s => (
                  <button
                    key={s}
                    className={`qbw-style-card${playStyle === s ? ' qbw-style-card--active' : ''}`}
                    onClick={() => setPlayStyle(s)}
                  >
                    <span className="qbw-style-icon">{PLAY_STYLE_ICONS[s]}</span>
                    <span className="qbw-style-label">{PLAY_STYLE_LABELS[s]}</span>
                    <span className="qbw-style-desc">{PLAY_STYLE_DESCS[s]}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {step === 2 && !detail && (
          /* ── Beginner multi-card view ───────────────────────────────────── */
          <div className="qbw-body">
            <p className="qbw-results-intro">
              Here are <strong>{results.length}</strong> starter builds for <strong>{creditLimit} credits</strong>.
              Click <em>Load</em> on the one you like, or click a build for details.
            </p>
            <div className="qbw-cards-grid">
              {results.map(r => (
                <div key={r.factionId} className="qbw-faction-card" onClick={() => setDetail(r)}>
                  <div className="qbw-fc-header">
                    <span className="qbw-fc-name">{r.factionName}</span>
                    <span className="qbw-fc-badge">{PLAY_STYLE_ICONS[r.playStyle]} {PLAY_STYLE_LABELS[r.playStyle]}</span>
                  </div>
                  <div className="qbw-fc-stats">
                    <span>{r.totalModels} models</span>
                    <span>{r.totalCredits} cr</span>
                  </div>
                  <p className="qbw-fc-tip">{r.factionTip}</p>
                  <div className="qbw-fc-units">
                    {r.units.slice(0, 4).map((li, i) => (
                      <span key={i} className="qbw-fc-unit">
                        {li.count}× {li.unit.name}
                      </span>
                    ))}
                    {r.units.length > 4 && <span className="qbw-fc-unit qbw-fc-unit--more">+{r.units.length - 4} more</span>}
                  </div>
                  <button className="qbw-load-btn" onClick={e => { e.stopPropagation(); handleLoad(r); }}>
                    ✓ Load This Build
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && detail && (
          /* ── Detail / single-faction view ──────────────────────────────── */
          <div className="qbw-body">
            <div className="qbw-detail-header">
              <div>
                <h3 className="qbw-detail-title">{detail.buildLabel}</h3>
                <div className="qbw-detail-chips">
                  <span className="qbw-chip">{detail.totalModels} models</span>
                  <span className="qbw-chip">{detail.totalCredits} / {creditLimit} cr</span>
                  <span className="qbw-chip">{PLAY_STYLE_ICONS[detail.playStyle]} {PLAY_STYLE_LABELS[detail.playStyle]}</span>
                </div>
              </div>
            </div>

            {/* Unit list */}
            <table className="qbw-unit-table">
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>Type</th>
                  <th>Role</th>
                  <th className="qbw-th-r">×</th>
                  <th className="qbw-th-r">ea.</th>
                  <th className="qbw-th-r">total</th>
                </tr>
              </thead>
              <tbody>
                {detail.units.map((li, i) => (
                  <tr key={i} className={li.unit.unitType === 'elite' ? 'qbw-row-elite' : ''}>
                    <td>
                      {li.unit.name}
                      {li.appliedSubType && (
                        <span className="qbw-subtype-tag"> ({li.appliedSubType.name})</span>
                      )}
                    </td>
                    <td><span className={`qbw-type-badge qbw-type-badge--${li.unit.unitType}`}>{li.unit.unitType}</span></td>
                    <td>
                      <span
                        className={`qbw-role-badge qbw-role-badge--${li.tacticalRole}`}
                        title={ROLE_TIPS[li.tacticalRole]}
                      >
                        {ROLE_ICONS[li.tacticalRole]} {ROLE_LABELS[li.tacticalRole]}
                      </span>
                    </td>
                    <td className="qbw-td-r">{li.count}</td>
                    <td className="qbw-td-r">{li.unit.baseCost} cr</td>
                    <td className="qbw-td-r qbw-td-total">{li.creditCost} cr</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="qbw-tfoot-label">Total</td>
                  <td className="qbw-td-r">{detail.totalModels}</td>
                  <td />
                  <td className="qbw-td-r qbw-td-total">{detail.totalCredits} cr</td>
                </tr>
              </tfoot>
            </table>

            {/* Tips */}
            <div className="qbw-tips-grid">
              <div className="qbw-tip-box qbw-tip-box--faction">
                <h4>About this faction</h4>
                <p>{detail.factionTip}</p>
              </div>
              <div className="qbw-tip-box qbw-tip-box--style">
                <h4>Play style: {PLAY_STYLE_LABELS[detail.playStyle]}</h4>
                <p>{detail.playstyleTip}</p>
              </div>
            </div>

            <details className="qbw-tips-expand">
              <summary>📋 General beginner tips</summary>
              <ul className="qbw-tips-list">
                {detail.generalTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </details>
          </div>
        )}

        {/* Footer */}
        <div className="qbw-footer">
          {step === 1 && (
            <>
              <button className="qbw-btn qbw-btn--secondary" onClick={onClose}>Cancel</button>
              <button className="qbw-btn qbw-btn--primary" onClick={handleGenerate}>
                Generate Build →
              </button>
            </>
          )}
          {step === 2 && !detail && (
            <>
              <button className="qbw-btn qbw-btn--secondary" onClick={() => setStep(1)}>← Back</button>
              <span className="qbw-footer-note">Click a build card for details or load it directly.</span>
            </>
          )}
          {step === 2 && detail && (
            <>
              <button className="qbw-btn qbw-btn--secondary" onClick={() => {
                if (isBeginnerMode) setDetail(null);
                else setStep(1);
              }}>← Back</button>
              <button className="qbw-btn qbw-btn--primary" onClick={() => handleLoad(detail)}>
                ✓ Load This Build
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
