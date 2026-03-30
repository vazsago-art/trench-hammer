import { useState } from 'react';
import { Warband } from '../types/index.js';
import { getAllWarbands, deleteWarbandLocal, exportWarbandToMDFile } from '../utils/export.js';
import './SavedArmiesModal.css';

interface Props {
  onLoad: (warband: Warband) => void;
  onClose: () => void;
}

export function SavedArmiesModal({ onLoad, onClose }: Props) {
  const [warbands, setWarbands] = useState<Warband[]>(() => getAllWarbands());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteWarbandLocal(id);
    setWarbands(getAllWarbands());
    setConfirmDeleteId(null);
  };

  return (
    <div className="sam-overlay" onClick={onClose}>
      <div className="sam-modal" onClick={e => e.stopPropagation()}>
        <div className="sam-header">
          <h2>Saved Armies</h2>
          <button className="sam-close" onClick={onClose} title="Close">✕</button>
        </div>

        <div className="sam-body">
          {warbands.length === 0 ? (
            <p className="sam-empty">No saved armies found. Save your current warband using the "Save to Library" button.</p>
          ) : (
            <ul className="sam-list">
              {warbands.map(wb => {
                const totalCredits = wb.units.reduce((s, u) => s + u.totalCost, 0);
                const totalGlory   = wb.units.reduce((s, u) => s + u.totalGloryCost, 0);
                const totalModels  = wb.units.reduce((s, u) => s + u.count, 0);
                const isConfirming = confirmDeleteId === wb.id;

                return (
                  <li key={wb.id} className="sam-item">
                    <div className="sam-item-info">
                      <span className="sam-item-name">{wb.name}</span>
                      <div className="sam-item-tags">
                        <span className="sam-item-faction">{wb.faction.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                        {wb.subfactionName && (
                          <span className="sam-item-variant">{wb.subfactionName}</span>
                        )}
                      </div>
                      <div className="sam-item-stats">
                        <span className="sam-stat">{totalCredits} / {wb.pointLimit} Credits</span>
                        {(wb.gloryLimit > 0 || totalGlory > 0) && (
                          <span className="sam-stat">{totalGlory}{wb.gloryLimit > 0 ? ` / ${wb.gloryLimit}` : ''} Glory</span>
                        )}
                        <span className="sam-stat">{totalModels} model{totalModels !== 1 ? 's' : ''}</span>
                        <span className="sam-stat">{wb.units.length} unit{wb.units.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <div className="sam-item-actions">
                      <button
                        className="sam-btn sam-btn-load"
                        onClick={() => { onLoad(wb); onClose(); }}
                        title="Load this army into the builder"
                      >Load</button>
                      <button
                        className="sam-btn sam-btn-export"
                        onClick={() => exportWarbandToMDFile(wb)}
                        title="Share this army roster as .md file"
                      >Share .md</button>
                      {isConfirming ? (
                        <>
                          <button
                            className="sam-btn sam-btn-delete"
                            onClick={() => handleDelete(wb.id)}
                          >Confirm</button>
                          <button
                            className="sam-btn sam-btn-cancel"
                            onClick={() => setConfirmDeleteId(null)}
                          >Cancel</button>
                        </>
                      ) : (
                        <button
                          className="sam-btn sam-btn-delete"
                          onClick={() => setConfirmDeleteId(wb.id)}
                          title="Delete this saved army"
                        >Delete</button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
