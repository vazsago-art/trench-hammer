import type { FactionLoreEntry } from '../data/factionLore.js';
import './LoreModal.css';

interface LoreModalProps {
  lore: FactionLoreEntry;
  onClose: () => void;
}

export function LoreModal({ lore, onClose }: LoreModalProps) {
  return (
    <div className="lore-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lore-modal">
        {/* Header */}
        <header className="lore-header">
          <div>
            <h2 className="lore-title">{lore.name}</h2>
            {lore.motto && <p className="lore-motto">{lore.motto}</p>}
          </div>
          <button className="lore-close-btn" onClick={onClose}>✕ Close</button>
        </header>

        {/* Overview */}
        <section className="lore-section">
          <h3 className="lore-section-title">Overview</h3>
          <p className="lore-text">{lore.overview}</p>
        </section>

        {/* History */}
        <section className="lore-section">
          <h3 className="lore-section-title">History</h3>
          <p className="lore-text">{lore.history}</p>
        </section>

        {/* Notable Traits */}
        <section className="lore-section">
          <h3 className="lore-section-title">Notable Traits</h3>
          <ul className="lore-list">
            {lore.notableTraits.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </section>

        {/* Key Figures */}
        <section className="lore-section">
          <h3 className="lore-section-title">Key Figures</h3>
          <ul className="lore-list lore-list--figures">
            {lore.keyFigures.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </section>

        {/* Combat Doctrine */}
        <section className="lore-section">
          <h3 className="lore-section-title">Combat Doctrine</h3>
          <p className="lore-text">{lore.combatDoctrine}</p>
        </section>

        {/* Why Play */}
        <section className="lore-section lore-why-play">
          <h3 className="lore-section-title">Why Play This Faction?</h3>
          <p className="lore-text">{lore.whyPlay}</p>
        </section>
      </div>
    </div>
  );
}
