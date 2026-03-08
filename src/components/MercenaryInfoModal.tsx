import React from 'react';
import { Mercenary } from '../types/index.js';
import { KeywordChip } from './KeywordChip.js';
import './MercenaryInfoModal.css';

interface MercenaryInfoModalProps {
  mercenary: Mercenary;
  onClose: () => void;
}

export const MercenaryInfoModal: React.FC<MercenaryInfoModalProps> = ({ mercenary, onClose }) => {
  const hasPsychic = (mercenary.psychicPowers?.length ?? 0) > 0;

  return (
    <div className="merc-info-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="merc-info-panel" role="dialog" aria-modal aria-label={`${mercenary.name} info`}>

        {/* ── Header ───────────────────────────────────────── */}
        <div className="merc-info-header">
          <div className="merc-info-header-left">
            <h2 className="merc-info-name">{mercenary.name}</h2>
            <div className="merc-info-subcat">{mercenary.subcategory}</div>
          </div>
          <div className="merc-info-header-right">
            <div className="merc-info-glory-badge">
              {mercenary.gloryCost} <span>Glory</span>
            </div>
            <button className="merc-info-close-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        {/* ── Stats ────────────────────────────────────────── */}
        {mercenary.stats && (
          <div className="merc-info-section">
            <div className="merc-info-section-title">Stats</div>
            <div className="merc-info-stats-row">
              {[
                { label: 'MOVEMENT', value: mercenary.stats.movement },
                { label: 'RANGED', value: mercenary.stats.ranged },
                { label: 'MELEE', value: mercenary.stats.melee },
                { label: 'ARMOUR', value: mercenary.stats.armour },
                { label: 'BASE', value: mercenary.stats.base },
              ].map(({ label, value }) => (
                <div key={label} className="merc-info-stat-cell">
                  <div className="merc-info-stat-label">{label}</div>
                  <div className="merc-info-stat-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Keywords ─────────────────────────────────────── */}
        {mercenary.keywords && mercenary.keywords.length > 0 && (
          <div className="merc-info-keywords-row">
            {mercenary.keywords.map((kw) => (
              <KeywordChip key={kw} keyword={kw} className="merc-info-keyword-tag" />
            ))}
          </div>
        )}

        {/* ── Battlekit ────────────────────────────────────── */}
        {mercenary.weapons && mercenary.weapons.length > 0 && (
          <div className="merc-info-section">
            <div className="merc-info-section-title">Battlekit</div>
            <table className="merc-info-weapon-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Profile / Rules</th>
                </tr>
              </thead>
              <tbody>
                {mercenary.weapons.map((w, i) => (
                  <tr key={i} className={i % 2 === 1 ? 'alt' : ''}>
                    <td className="weapon-name">{w.name}</td>
                    <td className="weapon-profile">{w.profile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Abilities ────────────────────────────────────── */}
        {mercenary.abilities && mercenary.abilities.length > 0 && (
          <div className="merc-info-section">
            <div className="merc-info-section-title">Abilities</div>
            <div className="merc-info-abilities">
              {mercenary.abilities.map((ab, i) => (
                <div key={i} className="merc-info-ability">
                  <span className="merc-info-ability-name">{ab.name}:</span>
                  <span className="merc-info-ability-desc"> {ab.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Psychic Powers ───────────────────────────────── */}
        {hasPsychic && (
          <div className="merc-info-section merc-info-section--psychic">
            <div className="merc-info-section-title">Psychic Powers</div>
            <div className="merc-info-abilities">
              {mercenary.psychicPowers!.map((p, i) => (
                <div key={i} className="merc-info-ability">
                  <span className="merc-info-ability-name">{p.name}:</span>
                  <span className="merc-info-ability-desc"> {p.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Description note (if any) ─────────────────────── */}
        {mercenary.description && (
          <div className="merc-info-description">{mercenary.description}</div>
        )}

        {/* ── Footer ───────────────────────────────────────── */}
        <div className="merc-info-footer">
          <button className="merc-info-done-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MercenaryInfoModal;
