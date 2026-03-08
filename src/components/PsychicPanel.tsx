import { useState } from 'react';
import { PsychicDiscipline, SelectedPsychicPower } from '../types/index.js';
import './PsychicPanel.css';

interface PsychicPanelProps {
  unitName: string;
  disciplines: PsychicDiscipline[];
  selectedPowers: SelectedPsychicPower[];
  onAdd: (power: SelectedPsychicPower) => void;
  onRemove: (powerId: string) => void;
  onClose: () => void;
}

export function PsychicPanel({
  unitName,
  disciplines,
  selectedPowers,
  onAdd,
  onRemove,
  onClose,
}: PsychicPanelProps) {
  const [openDiscipline, setOpenDiscipline] = useState<string | null>(
    disciplines.length === 1 ? disciplines[0].id : null
  );

  const selectedMap = new Map(selectedPowers.map(p => [p.id, p]));

  const totalCredits = selectedPowers
    .filter(p => (p.costCurrency ?? 'credits') === 'credits')
    .reduce((sum, p) => sum + p.cost, 0);
  const totalGlory = selectedPowers
    .filter(p => p.costCurrency === 'glory')
    .reduce((sum, p) => sum + p.cost, 0);

  const costSummary = [
    totalCredits > 0 ? `${totalCredits} Credits` : '',
    totalGlory > 0 ? `${totalGlory} Glory` : '',
  ].filter(Boolean).join(' + ') || '0 Credits';

  return (
    <>
      <div
        className="psychic-overlay"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="psychic-panel">
          <div className="psychic-header">
            <div>
              <h2>Psychic Powers — {unitName}</h2>
              <p className="psychic-subtitle">
                Powers cost: <strong>{costSummary}</strong>
              </p>
            </div>
            <button className="btn-close" onClick={onClose}>✕</button>
          </div>

          <div className="psychic-scroll-body">

            {/* Selected powers summary */}
            {selectedPowers.length > 0 && (
              <div className="psychic-selected">
                <h3>Selected Powers</h3>
                <div className="psychic-selected-list">
                  {selectedPowers.map(p => (
                    <div key={p.id} className="psychic-selected-item">
                      <div className="psychic-sel-info">
                        <span className="psychic-sel-name">{p.name}</span>
                        <span className="psychic-sel-disc">{p.disciplineName}</span>
                      </div>
                      <span className="psychic-sel-cost">
                        {p.cost} {p.costCurrency === 'glory' ? 'Glory' : 'Credits'}
                      </span>
                      <button
                        className="btn-remove-psychic"
                        onClick={() => onRemove(p.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discipline accordions */}
            <div className="psychic-disciplines">
              {disciplines.map(disc => {
                const isOpen = openDiscipline === disc.id;
                return (
                  <div
                    key={disc.id}
                    className={`psychic-discipline${isOpen ? ' open' : ''}`}
                  >
                    <div
                      className="psychic-disc-header"
                      role="button"
                      onClick={() =>
                        setOpenDiscipline(prev => prev === disc.id ? null : disc.id)
                      }
                    >
                      {disc.name}
                      <span className="psychic-disc-count">({disc.powers.length})</span>
                    </div>

                    {isOpen && (
                      <div className="psychic-power-grid">
                        {disc.powers.map(power => {
                          const selected = selectedMap.get(power.id);
                          return (
                            <div
                              key={power.id}
                              className={`psychic-power-card${selected ? ' power-selected' : ''}`}
                            >
                              <div className="power-card-header">
                                <span className="power-name">{power.name}</span>
                                <span className={`power-type-badge ${power.powerType === 'Attack' ? 'badge-attack' : 'badge-effect'}`}>
                                  {power.powerType}
                                </span>
                              </div>
                              <div className="power-meta">
                                <span className="power-range">📏 {power.range}</span>
                                <span className="power-timing">⏱ {power.timing}</span>
                                <span className="power-target">🎯 {power.target}</span>
                              </div>
                              <p className="power-description">{power.description}</p>
                              <div className="power-footer">
                                <span className="power-cost">
                                  {power.cost} {power.costCurrency === 'glory' ? 'Glory' : 'Credits'}
                                </span>
                                {selected ? (
                                  <button
                                    className="btn-power-remove"
                                    onClick={() => onRemove(power.id)}
                                  >
                                    Remove
                                  </button>
                                ) : (
                                  <button
                                    className="btn-power-add"
                                    onClick={() =>
                                      onAdd({
                                        id: power.id,
                                        name: power.name,
                                        disciplineId: disc.id,
                                        disciplineName: disc.name,
                                        cost: power.cost,
                                        costCurrency: power.costCurrency,
                                      })
                                    }
                                  >
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>{/* /psychic-scroll-body */}
        </div>
      </div>
    </>
  );
}
