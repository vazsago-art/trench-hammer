import { useState } from 'react';
import { GiftOfChaos, SelectedGiftOfChaos } from '../types/index.js';
import './MutationsPanel.css';

interface MutationsPanelProps {
  unitName: string;
  gifts: GiftOfChaos[];
  selectedGifts: SelectedGiftOfChaos[];
  /** Max permanent gifts allowed for this unit (2 for standard, 4 for ELITE/Chaos Spawn) */
  maxGifts: number;
  onAdd: (gift: SelectedGiftOfChaos) => void;
  onRemove: (giftId: string) => void;
  onClose: () => void;
}

export function MutationsPanel({
  unitName,
  gifts,
  selectedGifts,
  maxGifts,
  onAdd,
  onRemove,
  onClose,
}: MutationsPanelProps) {
  const [search, setSearch] = useState('');

  const selectedMap = new Map(selectedGifts.map(g => [g.id, g]));

  const totalCost = selectedGifts.reduce((sum, g) => sum + g.cost, 0);

  const filtered = search.trim()
    ? gifts.filter(
        g =>
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          g.description.toLowerCase().includes(search.toLowerCase()) ||
          g.diceResult.includes(search.trim()),
      )
    : gifts;

  const atMax = selectedGifts.length >= maxGifts;

  return (
    <div
      className="mutations-overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mutations-panel">
        {/* Header */}
        <div className="mutations-header">
          <div>
            <h2>☠ Gifts of Chaos — {unitName}</h2>
            <p className="mutations-subtitle">
              Selected: <strong>{selectedGifts.length}/{maxGifts}</strong>
              {totalCost > 0 && (
                <>
                  {' '}· Cost: <strong>{totalCost} Credits</strong>
                </>
              )}
            </p>
          </div>
          <button className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mutations-scroll-body">
          {/* Rule reminder */}
          <div className="mutations-rule-note">
            <strong>Accursed Gifts:</strong> Each Gift can be gained only once. ELITE models / Chaos
            Spawns may have up to 4; others up to 2. During a one-off battle each costs 10 credits.
          </div>

          {/* Selected gifts summary */}
          {selectedGifts.length > 0 && (
            <div className="mutations-selected">
              <h3>Selected Gifts</h3>
              <div className="mutations-selected-list">
                {selectedGifts.map(g => (
                  <div key={g.id} className="mutations-selected-item">
                    <div className="mutations-sel-info">
                      <span className="mutations-sel-dice">{g.diceResult}</span>
                      <span className="mutations-sel-name">{g.name}</span>
                    </div>
                    <span className="mutations-sel-cost">{g.cost} Credits</span>
                    <button
                      className="btn-remove-mutation"
                      onClick={() => onRemove(g.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search */}
          <div className="mutations-search-row">
            <input
              className="mutations-search"
              type="text"
              placeholder="Search gifts by name, dice result or keyword…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {atMax && (
              <span className="mutations-at-max">Maximum gifts reached</span>
            )}
          </div>

          {/* Gift grid */}
          <div className="mutations-gift-grid">
            {filtered.map(gift => {
              const selected = selectedMap.get(gift.id);
              return (
                <div
                  key={gift.id}
                  className={`mutations-gift-card${selected ? ' gift-selected' : ''}`}
                >
                  <div className="gift-card-header">
                    <span className="gift-dice-badge">{gift.diceResult}</span>
                    <span className="gift-name">{gift.name}</span>
                  </div>
                  <p className="gift-description">{gift.description}</p>
                  <div className="gift-footer">
                    <span className="gift-cost">{gift.cost} Credits</span>
                    {selected ? (
                      <button
                        className="btn-gift-remove"
                        onClick={() => onRemove(gift.id)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="btn-gift-add"
                        disabled={atMax}
                        onClick={() =>
                          onAdd({
                            id: gift.id,
                            name: gift.name,
                            diceResult: gift.diceResult,
                            cost: gift.cost,
                            costCurrency: gift.costCurrency,
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
            {filtered.length === 0 && (
              <p className="mutations-no-results">No gifts match your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
