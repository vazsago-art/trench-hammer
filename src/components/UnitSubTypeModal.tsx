import { useState } from 'react';
import { UnitOption, UnitSubType } from '../types/index.js';
import { KeywordChip } from './KeywordChip.js';
import './UnitSubTypeModal.css';

interface Props {
  unit: UnitOption;
  onConfirm: (subType: UnitSubType) => void;
  onCancel: () => void;
}

function costBadge(mod: number): string {
  if (mod === 0) return '';
  return mod > 0 ? `+${mod} Credits` : `${mod} Credits`;
}

export function UnitSubTypeModal({ unit, onConfirm, onCancel }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const subTypes = unit.unitSubTypes ?? [];
  const chosenSubType = subTypes.find(st => st.id === selected) ?? null;

  return (
    <div className="subtype-modal-overlay" onClick={onCancel}>
      <div className="subtype-modal" onClick={e => e.stopPropagation()}>
        <div className="subtype-modal-header">
          <h2>Recruit: {unit.name}</h2>
          <p className="subtype-modal-prompt">
            Choose a Type before adding this unit to your warband.
          </p>
          <button className="subtype-modal-close" onClick={onCancel} aria-label="Close">×</button>
        </div>

        <div className="subtype-options-list">
          {subTypes.map(st => {
            const badge = costBadge(st.creditCostModifier);
            const finalCost = unit.baseCost + st.creditCostModifier;
            const isSelected = selected === st.id;
            return (
              <button
                key={st.id}
                className={`subtype-option-card${isSelected ? ' selected' : ''}`}
                onClick={() => setSelected(st.id)}
              >
                <div className="subtype-option-titlerow">
                  <span className="subtype-option-name">{st.name}</span>
                  <span className="subtype-option-badges">
                    {badge && <span className="subtype-cost-badge">{badge}</span>}
                    {st.limit != null && (
                      <span className="subtype-limit-badge">LIMIT: {st.limit}</span>
                    )}
                    <span className="subtype-final-cost">{finalCost} Credits/model</span>
                  </span>
                </div>
                {st.grantedKeywords && st.grantedKeywords.length > 0 && (
                  <div className="subtype-keywords">
                    {st.grantedKeywords.map(kw => (
                      <KeywordChip key={kw} keyword={kw} className="subtype-keyword-chip" />
                    ))}
                  </div>
                )}
                <p className="subtype-option-desc">{st.description}</p>
              </button>
            );
          })}
        </div>

        <div className="subtype-modal-footer">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button
            className="btn-confirm"
            disabled={!chosenSubType}
            onClick={() => chosenSubType && onConfirm(chosenSubType)}
          >
            Add {chosenSubType ? chosenSubType.name : unit.name}
          </button>
        </div>
      </div>
    </div>
  );
}
