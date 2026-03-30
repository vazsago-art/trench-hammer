import { Weapon, WargearOption } from '../types/index.js';
import { KeywordChip, KeywordList } from './KeywordChip.js';
import './WargearInfoModal.css';

interface WargearInfoModalProps {
  item: Weapon | WargearOption;
  /** Category type so we know how to render it */
  catType: 'weapon' | 'armor' | 'equipment';
  costOverride?: number;
  costCurrencyOverride?: 'credits' | 'glory';
  onClose: () => void;
}

// ── Helpers (weapons) ─────────────────────────────────────────────────────────

function weaponTypeLabel(w: Weapon): string {
  if (w.type === 'thrown' || w.keywords.includes('THROWN')) return 'GRENADE';
  if (w.keywords.includes('TWO-HANDED') && w.type === 'melee') return '2H Melee';
  if (w.keywords.includes('TWO-HANDED')) return '2H Ranged';
  if (w.keywords.includes('PISTOL')) return 'Pistol';
  if (w.type === 'heavy') return '2H Ranged';
  if (w.type === 'melee') return '1H Melee';
  return '1H Ranged';
}

function weaponRangeLabel(w: Weapon): string {
  if (w.type === 'melee') return '—';
  return w.range !== undefined ? `${w.range}"` : '—';
}

// ── Component ─────────────────────────────────────────────────────────────────

export function WargearInfoModal({ item, catType, costOverride, costCurrencyOverride, onClose }: WargearInfoModalProps) {
  const isWeapon = catType === 'weapon';
  const weapon   = isWeapon ? (item as Weapon) : null;
  const gear     = !isWeapon ? (item as WargearOption) : null;
  const effectiveCost = costOverride ?? item.cost;
  const effectiveCostCurrency = costCurrencyOverride ?? (item as any).costCurrency;

  const costLabel =
    effectiveCostCurrency === 'glory'
      ? `${effectiveCost} Glory`
      : `${effectiveCost} Credits`;

  return (
    <div className="wginfo-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="wginfo-panel">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="wginfo-header">
          <div>
            <h3 className="wginfo-title">{item.name}</h3>
            <p className="wginfo-subtitle">
              {isWeapon ? 'Weapon' : gear?.type === 'armor' ? 'Armour' : 'Equipment'} · {costLabel}
            </p>
          </div>
          <button className="wginfo-close" onClick={onClose}>✕</button>
        </div>

        {/* ── Scrollable body ────────────────────────────────────── */}
        <div className="wginfo-body">

          {/* ── Weapon table ──────────────────────────────────────── */}
          {weapon && (
            <section className="wginfo-section">
              <h4 className="wginfo-section-title">Weapon Profile</h4>
              <div className="wginfo-table-wrap">
                <table className="wginfo-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Range</th>
                      <th>Rules</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>{weapon.name}</strong></td>
                      <td>
                        <span className={`wginfo-type-badge type-${weapon.type}`}>
                          {weaponTypeLabel(weapon)}
                        </span>
                      </td>
                      <td>{weaponRangeLabel(weapon)}</td>
                      <td className="wginfo-keywords-cell"><KeywordList keywords={weapon.keywords} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {weapon.description && (
                <p className="wginfo-description">{weapon.description}</p>
              )}
            </section>
          )}

          {/* ── Battlekit table ───────────────────────────────────── */}
          {gear && (
            <section className="wginfo-section">
              <h4 className="wginfo-section-title">Battlekit Profile</h4>
              <div className="wginfo-table-wrap">
                <table className="wginfo-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Slot</th>
                      <th>Keywords</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>{gear.name}</strong></td>
                      <td>{gear.type === 'armor' ? 'Armour' : 'Equipment'}</td>
                      <td>{gear.slot ?? '—'}</td>
                      <td className="wginfo-keywords-cell">
                        <KeywordList keywords={gear.keywords} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {gear.description && (
                <p className="wginfo-description">{gear.description}</p>
              )}
              {gear.grantsKeywords && gear.grantsKeywords.length > 0 && (
                <p className="wginfo-grants">
                  <strong>Grants keywords:</strong>{' '}
                  {gear.grantsKeywords.map((kw, i) => (
                    <span key={kw}>
                      {i > 0 && <span className="kw-sep">, </span>}
                      <KeywordChip keyword={kw} />
                    </span>
                  ))}
                </p>
              )}
              {gear.conflictsWith && gear.conflictsWith.length > 0 && (
                <p className="wginfo-conflicts">
                  <strong>Cannot combine with:</strong>{' '}
                  {gear.conflictsWith.join(', ')}
                </p>
              )}
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
