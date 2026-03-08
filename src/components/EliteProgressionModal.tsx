/**
 * EliteProgressionModal
 *
 * Campaign progression tracker for an individual Elite (or promoted) model.
 * Displays and edits:
 *   - XP counter (with quick +1 / +5 buttons)
 *   - Campaign Skills gained from skill tables
 *   - Battle Scars
 *   - Elite Traumas
 *
 * All changes are propagated back via `onChange(updatedUnit)`.
 */

import { useState } from 'react';
import type {
  WarbandUnit,
  CampaignSkill,
  BattleScar,
  EliteTrauma,
  CampaignSkillTable,
} from '../types/index.js';
import {
  SKILL_TABLES,
  SKILL_TABLE_LABELS,
  BATTLE_SCARS,
  ELITE_TRAUMAS,
  makeCampaignSkill,
} from '../data/campaignProgression.js';
import './EliteProgressionModal.css';

// ── Props ─────────────────────────────────────────────────────────────────────

interface EliteProgressionModalProps {
  unit: WarbandUnit;
  onChange: (updated: WarbandUnit) => void;
  onClose: () => void;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function XpCounter({
  xp,
  onAdd,
  onRemove,
}: {
  xp: number;
  onAdd: (amount: number) => void;
  onRemove: (amount: number) => void;
}) {
  return (
    <div className="ep-xp-block">
      <span className="ep-xp-label">XP</span>
      <button className="ep-xp-btn ep-btn-minus" onClick={() => onRemove(1)} disabled={xp <= 0} title="Remove 1 XP">−</button>
      <span className="ep-xp-value">{xp}</span>
      <button className="ep-xp-btn ep-btn-plus" onClick={() => onAdd(1)} title="+1 XP">+1</button>
      <button className="ep-xp-btn ep-btn-plus5" onClick={() => onAdd(5)} title="+5 XP">+5</button>
    </div>
  );
}

function SkillRow({ skill, onRemove }: { skill: CampaignSkill; onRemove: () => void }) {
  const tableLabel = SKILL_TABLE_LABELS[skill.table];
  return (
    <li className="ep-list-item ep-skill-item">
      <div className="ep-item-header">
        <span className="ep-item-name">{skill.name}</span>
        <span className="ep-item-tag">{tableLabel} — Roll {skill.roll}</span>
        <button className="ep-remove-btn" onClick={onRemove} title="Remove skill">✕</button>
      </div>
      <p className="ep-item-desc">{skill.description}</p>
    </li>
  );
}

function ScarRow({ scar, onRemove }: { scar: BattleScar; onRemove: () => void }) {
  return (
    <li className="ep-list-item ep-scar-item">
      <div className="ep-item-header">
        <span className="ep-item-name">{scar.name}</span>
        <button className="ep-remove-btn" onClick={onRemove} title="Remove scar">✕</button>
      </div>
      <p className="ep-item-desc">{scar.description}</p>
    </li>
  );
}

function TraumaRow({ trauma, onRemove }: { trauma: EliteTrauma; onRemove: () => void }) {
  return (
    <li className="ep-list-item ep-trauma-item">
      <div className="ep-item-header">
        <span className="ep-item-name">{trauma.name}</span>
        <button className="ep-remove-btn" onClick={onRemove} title="Remove trauma">✕</button>
      </div>
      <p className="ep-item-desc">{trauma.description}</p>
    </li>
  );
}

// ── Skill adder panel ─────────────────────────────────────────────────────────

function AddSkillPanel({ onAdd }: { onAdd: (skill: CampaignSkill) => void }) {
  const [table, setTable] = useState<CampaignSkillTable>('melee');
  const [roll, setRoll] = useState<number>(7);

  const tableKeys = Object.keys(SKILL_TABLE_LABELS) as CampaignSkillTable[];

  return (
    <div className="ep-add-panel">
      <h4 className="ep-add-title">Add Campaign Skill</h4>
      <div className="ep-add-row">
        <label className="ep-add-label">Table</label>
        <select
          className="ep-add-select"
          value={table}
          onChange={e => { setTable(e.target.value as CampaignSkillTable); setRoll(7); }}
        >
          {tableKeys.map(k => (
            <option key={k} value={k}>{SKILL_TABLE_LABELS[k]}</option>
          ))}
        </select>
      </div>
      <div className="ep-add-row">
        <label className="ep-add-label">Roll (2–12)</label>
        <select
          className="ep-add-select"
          value={roll}
          onChange={e => setRoll(Number(e.target.value))}
        >
          {SKILL_TABLES[table].map(entry => (
            <option key={entry.roll} value={entry.roll}>{entry.roll} — {entry.name}</option>
          ))}
        </select>
      </div>
      <button
        className="ep-add-btn"
        onClick={() => onAdd(makeCampaignSkill(table, roll))}
      >
        Add Skill
      </button>
    </div>
  );
}

function AddScarPanel({ onAdd }: { onAdd: (scar: BattleScar) => void }) {
  const [selectedId, setSelectedId] = useState<string>(BATTLE_SCARS[0].id);
  const selected = BATTLE_SCARS.find(s => s.id === selectedId) ?? BATTLE_SCARS[0];

  return (
    <div className="ep-add-panel">
      <h4 className="ep-add-title">Add Battle Scar</h4>
      <div className="ep-add-row">
        <label className="ep-add-label">Scar</label>
        <select
          className="ep-add-select"
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
        >
          {BATTLE_SCARS.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      {selected && <p className="ep-add-preview">{selected.description}</p>}
      <button className="ep-add-btn" onClick={() => onAdd({ ...selected, id: `${selected.id}_${Date.now()}` })}>
        Add Scar
      </button>
    </div>
  );
}

function AddTraumaPanel({ onAdd }: { onAdd: (trauma: EliteTrauma) => void }) {
  const [selectedId, setSelectedId] = useState<string>(ELITE_TRAUMAS[0].id);
  const selected = ELITE_TRAUMAS.find(t => t.id === selectedId) ?? ELITE_TRAUMAS[0];

  return (
    <div className="ep-add-panel">
      <h4 className="ep-add-title">Add Trauma</h4>
      <div className="ep-add-row">
        <label className="ep-add-label">Trauma</label>
        <select
          className="ep-add-select"
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
        >
          {ELITE_TRAUMAS.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>
      {selected && <p className="ep-add-preview">{selected.description}</p>}
      <button className="ep-add-btn" onClick={() => onAdd({ ...selected, id: `${selected.id}_${Date.now()}` })}>
        Add Trauma
      </button>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export function EliteProgressionModal({ unit, onChange, onClose }: EliteProgressionModalProps) {
  const xp = unit.xp ?? 0;
  const skills = unit.campaignSkills ?? [];
  const scars = unit.battleScars ?? [];
  const traumas = unit.traumas ?? [];

  // ---- local section tab state ----
  const [activeTab, setActiveTab] = useState<'skills' | 'scars' | 'traumas'>('skills');

  // ---- helpers ----
  function update(patch: Partial<WarbandUnit>) {
    onChange({ ...unit, ...patch });
  }

  function adjustXp(delta: number) {
    update({ xp: Math.max(0, xp + delta) });
  }

  function addSkill(skill: CampaignSkill) {
    update({ campaignSkills: [...skills, skill] });
  }

  function removeSkill(idx: number) {
    update({ campaignSkills: skills.filter((_, i) => i !== idx) });
  }

  function addScar(scar: BattleScar) {
    update({ battleScars: [...scars, scar] });
  }

  function removeScar(idx: number) {
    update({ battleScars: scars.filter((_, i) => i !== idx) });
  }

  function addTrauma(trauma: EliteTrauma) {
    update({ traumas: [...traumas, trauma] });
  }

  function removeTrauma(idx: number) {
    update({ traumas: traumas.filter((_, i) => i !== idx) });
  }

  const isPromotedLabel = unit.isPromoted ? ' (Promoted)' : '';
  const unitTypeLabel = unit.unitType === 'elite' ? 'Elite' : 'Troop';

  return (
    <div className="modal-overlay ep-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content ep-modal" role="dialog" aria-label="Elite Progression">

        {/* ── Header ── */}
        <div className="ep-header">
          <div className="ep-header-left">
            <h2 className="ep-unit-name">{unit.name}</h2>
            <span className="ep-unit-badge">
              {unitTypeLabel}{isPromotedLabel}
            </span>
          </div>
          <button className="modal-close-btn ep-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* ── XP Counter ── */}
        <div className="ep-xp-section">
          <XpCounter
            xp={xp}
            onAdd={adjustXp}
            onRemove={delta => adjustXp(-delta)}
          />
          <p className="ep-xp-hint">
            Elites earn XP from battles, Glorious Deeds, and campaign events.
            Spend XP to roll on Campaign Skill tables.
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className="ep-tabs">
          <button
            className={`ep-tab ${activeTab === 'skills' ? 'ep-tab--active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Campaign Skills {skills.length > 0 && <span className="ep-badge">{skills.length}</span>}
          </button>
          <button
            className={`ep-tab ${activeTab === 'scars' ? 'ep-tab--active' : ''}`}
            onClick={() => setActiveTab('scars')}
          >
            Battle Scars {scars.length > 0 && <span className="ep-badge">{scars.length}</span>}
          </button>
          <button
            className={`ep-tab ${activeTab === 'traumas' ? 'ep-tab--active' : ''}`}
            onClick={() => setActiveTab('traumas')}
          >
            Traumas {traumas.length > 0 && <span className="ep-badge">{traumas.length}</span>}
          </button>
        </div>

        {/* ── Tab content ── */}
        <div className="ep-tab-content">

          {activeTab === 'skills' && (
            <div className="ep-section">
              <AddSkillPanel onAdd={addSkill} />
              {skills.length === 0
                ? <p className="ep-empty">No campaign skills yet.</p>
                : (
                  <ul className="ep-list">
                    {skills.map((s, i) => (
                      <SkillRow key={s.id} skill={s} onRemove={() => removeSkill(i)} />
                    ))}
                  </ul>
                )
              }
            </div>
          )}

          {activeTab === 'scars' && (
            <div className="ep-section">
              <AddScarPanel onAdd={addScar} />
              {scars.length === 0
                ? <p className="ep-empty">No battle scars yet.</p>
                : (
                  <ul className="ep-list">
                    {scars.map((s, i) => (
                      <ScarRow key={s.id} scar={s} onRemove={() => removeScar(i)} />
                    ))}
                  </ul>
                )
              }
            </div>
          )}

          {activeTab === 'traumas' && (
            <div className="ep-section">
              <AddTraumaPanel onAdd={addTrauma} />
              {traumas.length === 0
                ? <p className="ep-empty">No traumas yet.</p>
                : (
                  <ul className="ep-list">
                    {traumas.map((t, i) => (
                      <TraumaRow key={t.id} trauma={t} onRemove={() => removeTrauma(i)} />
                    ))}
                  </ul>
                )
              }
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        <div className="ep-footer">
          <button className="ep-done-btn" onClick={onClose}>Done</button>
        </div>

      </div>
    </div>
  );
}
