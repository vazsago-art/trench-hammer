/**
 * TacticalAnalysis.tsx
 *
 * Modal overlay that shows a quick-build analysis of the current warband.
 * Receives the pre-computed TacticalReport and renders:
 *  - Warband summary (models, elites/troops, avg move, avg armour)
 *  - Combat Style dial (melee ↔ ranged)
 *  - Playstyle dial (objectives ↔ combat)
 *  - Stat bars: Mobility, Durability, Ranged, Melee, Stealth, Psychic
 *  - Advantages / Disadvantages / Tactical Recommendations
 */

import type { TacticalReport } from '../utils/tacticalAnalysis.js';
import './TacticalAnalysis.css';

interface Props {
  report: TacticalReport;
  warbandName: string;
  factionName: string;
  totalPoints: number;
  onClose: () => void;
}

// ── Score bar ─────────────────────────────────────────────────────────────────

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const pct = Math.round((score / 10) * 100);
  return (
    <div className="ta-score-row">
      <span className="ta-score-label">{label}</span>
      <div className="ta-bar-track">
        <div
          className="ta-bar-fill"
          style={{ width: `${pct}%`, background: color }}
          title={`${score}/10`}
        />
      </div>
      <span className="ta-score-value">{score}/10</span>
    </div>
  );
}

// ── Dial (left label ↔ right label with position marker) ─────────────────────

function DialBar({
  leftLabel, rightLabel, value, leftColor, rightColor,
}: {
  leftLabel: string; rightLabel: string;
  value: number;   // 0–10
  leftColor: string; rightColor: string;
}) {
  const pct = Math.round((value / 10) * 100);
  // Pick dominant side label
  const label = value <= 1 ? leftLabel :
    value <= 3 ? `${leftLabel}-Heavy` :
    value <= 4 ? `${leftLabel}-Leaning` :
    value <= 6 ? 'Balanced' :
    value <= 7 ? `${rightLabel}-Leaning` :
    value <= 9 ? `${rightLabel}-Heavy` : rightLabel;

  // Gradient from leftColor to rightColor
  const gradient = `linear-gradient(to right, ${leftColor}, ${rightColor})`;

  return (
    <div className="ta-dial-block">
      <div className="ta-dial-labels">
        <span style={{ color: leftColor }}>{leftLabel}</span>
        <span className="ta-dial-current-label">{label}</span>
        <span style={{ color: rightColor }}>{rightLabel}</span>
      </div>
      <div className="ta-dial-track" style={{ background: gradient }}>
        <div className="ta-dial-marker" style={{ left: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function TacticalAnalysis({ report, warbandName, factionName, totalPoints, onClose }: Props) {
  const {
    mobilityScore, durabilityScore, rangedScore, meleeScore, stealthScore, psychicScore,
    combatStyle, playstyleScore,
    playstyleNote,
    advantages, disadvantages, recommendations,
    totalModels, eliteCount, troopCount,
    avgMovement, avgArmourSave,
  } = report;

  const armourDisplay = avgArmourSave === 0 ? 'None' : `${avgArmourSave}`;

  return (
    <div className="modal-overlay ta-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content ta-modal" role="dialog" aria-label="Tactical Analysis">

        {/* ── Header ── */}
        <div className="ta-header">
          <div className="ta-header-left">
            <h2 className="ta-title">⚡ Tactical Analysis</h2>
            <div className="ta-subtitle">{warbandName} · {factionName}</div>
          </div>
          <button className="modal-close-btn ta-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* ── Summary chips ── */}
        <div className="ta-summary-row">
          <div className="ta-chip">
            <span className="ta-chip-value">{totalModels}</span>
            <span className="ta-chip-label">Models</span>
          </div>
          <div className="ta-chip">
            <span className="ta-chip-value">{eliteCount}</span>
            <span className="ta-chip-label">Elites</span>
          </div>
          <div className="ta-chip">
            <span className="ta-chip-value">{troopCount}</span>
            <span className="ta-chip-label">Troops</span>
          </div>
          <div className="ta-chip">
            <span className="ta-chip-value">{avgMovement}"</span>
            <span className="ta-chip-label">Avg Move</span>
          </div>
          <div className="ta-chip">
            <span className="ta-chip-value">{armourDisplay}</span>
            <span className="ta-chip-label">Avg Armour</span>
          </div>
          <div className="ta-chip">
            <span className="ta-chip-value">{totalPoints}</span>
            <span className="ta-chip-label">pts</span>
          </div>
        </div>

        {/* ── Dials ── */}
        <div className="ta-dials">
          <div className="ta-dial-section">
            <h3 className="ta-section-title">Combat Style</h3>
            <DialBar
              leftLabel="Melee" rightLabel="Ranged"
              value={combatStyle}
              leftColor="#e05050" rightColor="#4090d0"
            />
          </div>
          <div className="ta-dial-section">
            <h3 className="ta-section-title">Playstyle</h3>
            <DialBar
              leftLabel="Objectives" rightLabel="Combat"
              value={playstyleScore}
              leftColor="#50a86e" rightColor="#c05020"
            />
            <p className="ta-playstyle-note">{playstyleNote}</p>
          </div>
        </div>

        {/* ── Stat bars ── */}
        <div className="ta-bars-section">
          <h3 className="ta-section-title">Capability Ratings</h3>
          <ScoreBar label="Mobility"    score={mobilityScore}    color="#e8a020" />
          <ScoreBar label="Durability"  score={durabilityScore}  color="#4090d0" />
          <ScoreBar label="Ranged"      score={rangedScore}      color="#5ab8e8" />
          <ScoreBar label="Melee"       score={meleeScore}       color="#e05050" />
          <ScoreBar label="Stealth"     score={stealthScore}     color="#7060b8" />
          <ScoreBar label="Psychic"     score={psychicScore}     color="#a060e0" />
        </div>

        {/* ── Body: 3 columns ── */}
        <div className="ta-body">

          {/* Advantages */}
          <div className="ta-column">
            <h3 className="ta-col-title ta-col-title--good">✅ Advantages</h3>
            {advantages.length === 0
              ? <p className="ta-empty">No notable advantages identified yet.</p>
              : (
                <ul className="ta-list ta-list--good">
                  {advantages.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              )
            }
          </div>

          {/* Disadvantages */}
          <div className="ta-column">
            <h3 className="ta-col-title ta-col-title--bad">⚠️ Disadvantages</h3>
            {disadvantages.length === 0
              ? <p className="ta-empty">No notable weaknesses identified.</p>
              : (
                <ul className="ta-list ta-list--bad">
                  {disadvantages.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              )
            }
          </div>

          {/* Recommendations */}
          <div className="ta-column">
            <h3 className="ta-col-title ta-col-title--tip">🎯 Tactical Focus</h3>
            <ul className="ta-list ta-list--tip">
              {recommendations.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="ta-footer">
          <button className="ta-close-btn" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  );
}
