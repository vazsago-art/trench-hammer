/**
 * EliteProgressionModal
 *
 * Campaign progression tracker for any model in a warband.
 * Displays and edits:
 *   - Battle Scars (simple count — at 3 the model dies) — ALL units
 *   - Traumas (named mechanical effects; cleared independently of scars) — ALL units
 *   - Astra Militarum Commendations — ALL AM units
 *   - XP counter (with quick +1 / +5 buttons) — Elite-eligible only
 *   - Campaign Skills gained from skill tables — Elite-eligible only
 *
 * All changes are propagated back via `onChange(updatedUnit)`.
 */

import { useState } from 'react';
import type {
  WarbandUnit,
  CampaignSkill,
  EliteTrauma,
  CampaignSkillTable,
} from '../types/index.js';
import {
  SKILL_TABLES,
  SKILL_TABLE_LABELS,
  ELITE_TRAUMAS,
  ASTRA_MILITARUM_COMMENDATIONS,
  makeCampaignSkill,
} from '../data/campaignProgression.js';
import { getPatronById, filterAbilitiesForSubfaction } from '../data/patrons.js';
import type { PatronAbility } from '../data/patrons.js';
import './EliteProgressionModal.css';

// ── Props ─────────────────────────────────────────────────────────────────────

interface EliteProgressionModalProps {
  unit: WarbandUnit;
  /** Faction id string, e.g. 'astra_militarum'. Used to show faction-specific sections. */
  factionId?: string;
  /** Patron id from the warband, e.g. 'ecclesiastic_cardinal'. */
  patronId?: string;
  /** Display name of the selected subfaction, used to filter patron abilities. */
  subfactionName?: string;
  /** Whether this unit is Elite-eligible (controls XP + Campaign Skills visibility). */
  isElite?: boolean;
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
  const isPatron = skill.source === 'patron';
  return (
    <li className="ep-list-item ep-skill-item">
      <div className="ep-item-header">
        <span className="ep-item-name">
          {isPatron && <span className="ep-patron-badge" title="Patron Skill">⚜</span>}
          {skill.name}
        </span>
        <span className="ep-item-tag">{tableLabel} — Roll {skill.roll}</span>
        <button className="ep-remove-btn" onClick={onRemove} title="Remove skill">✕</button>
      </div>
      <p className="ep-item-desc">{skill.description}</p>
    </li>
  );
}

function TraumaRow({ trauma, onRemove }: { trauma: EliteTrauma; onRemove: () => void }) {
  return (
    <li className="ep-list-item ep-trauma-item">
      <div className="ep-item-header">
        <span className="ep-item-name">{trauma.name}</span>
        {trauma.canRecover && <span className="ep-item-tag ep-tag-recoverable">Recoverable</span>}
        <button className="ep-remove-btn" onClick={onRemove} title="Remove trauma">✕</button>
      </div>
      <p className="ep-item-desc">{trauma.description}</p>
    </li>
  );
}

// ── Patron keyword filter ──────────────────────────────────────────────────────

function isAbilityAvailableForModel(condition: string | undefined, unitKeywords: string[]): boolean {
  if (!condition) return true;
  const kws = unitKeywords.map(k => k.toUpperCase());
  if (condition.includes('Psyker Only')) return kws.some(k => k.startsWith('PSYKER'));
  if (condition.includes('Leader Only')) return kws.includes('LEADER');
  if (/non-Daemon Only/i.test(condition)) return !kws.includes('DAEMON');
  if (condition.includes('Daemon Only')) return kws.includes('DAEMON');
  if (condition.includes('Synapse Only')) return kws.includes('SYNAPSE');
  // Warband-level conditions (LIMIT, Radical, Puritan, faction-specific) → always show
  return true;
}

// ── Patron skill picker ────────────────────────────────────────────────────────

interface PatronSkillPickerProps {
  triggerTable: CampaignSkillTable;
  triggerRoll: number;
  patronId?: string;
  factionId?: string;
  subfactionName?: string;
  unitKeywords: string[];
  alreadyPickedNames: string[];
  onAdd: (skill: CampaignSkill) => void;
}

function PatronSkillPicker({
  triggerTable, triggerRoll, patronId, factionId, subfactionName,
  unitKeywords, alreadyPickedNames, onAdd,
}: PatronSkillPickerProps) {
  const patron = patronId ? getPatronById(patronId, factionId) : undefined;

  if (!patron) {
    return (
      <div className="ep-patron-picker ep-patron-picker--empty">
        <span className="ep-patron-picker-icon">⚜</span>
        <p>No Patron selected. Set a Patron in the Army Builder to pick Patron Skills.</p>
      </div>
    );
  }

  const allAbilities: PatronAbility[] = filterAbilitiesForSubfaction(patron.abilities, subfactionName);
  const available = allAbilities.filter(a =>
    !alreadyPickedNames.includes(a.name) &&
    isAbilityAvailableForModel(a.condition, unitKeywords)
  );
  const alreadyTaken = allAbilities.filter(a => alreadyPickedNames.includes(a.name));

  function pickAbility(ability: PatronAbility) {
    onAdd({
      id: `patron_${ability.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`,
      table: triggerTable,
      roll: triggerRoll,
      name: ability.name,
      description: ability.description,
      source: 'patron',
    });
  }

  return (
    <div className="ep-patron-picker">
      <div className="ep-patron-picker-header">
        <span className="ep-patron-picker-icon">⚜</span>
        <span className="ep-patron-picker-name">{patron.name}</span>
      </div>
      {available.length === 0 ? (
        <p className="ep-patron-picker-empty">
          This model has already picked all available Patron Skills.
        </p>
      ) : (
        <ul className="ep-patron-skill-list">
          {available.map((ability, i) => (
            <li key={i} className="ep-patron-skill-option">
              <div className="ep-patron-skill-option-top">
                <div>
                  <strong className="ep-patron-skill-option-name">{ability.name}</strong>
                  {ability.condition && (
                    <span className="ep-patron-skill-condition">{ability.condition}</span>
                  )}
                </div>
                <button className="ep-patron-skill-pick-btn" onClick={() => pickAbility(ability)}>
                  Pick ⚜
                </button>
              </div>
              <p className="ep-patron-skill-desc">{ability.description}</p>
            </li>
          ))}
        </ul>
      )}
      {alreadyTaken.length > 0 && (
        <p className="ep-patron-picker-taken">
          Already taken: {alreadyTaken.map(a => a.name).join(', ')}
        </p>
      )}
    </div>
  );
}

// ── Skill adder panel ─────────────────────────────────────────────────────────

interface AddSkillPanelProps {
  onAdd: (skill: CampaignSkill) => void;
  patronId?: string;
  factionId?: string;
  subfactionName?: string;
  unitKeywords: string[];
  alreadyPickedPatronSkillNames: string[];
}

function AddSkillPanel({
  onAdd, patronId, factionId, subfactionName, unitKeywords, alreadyPickedPatronSkillNames,
}: AddSkillPanelProps) {
  const [table, setTable] = useState<CampaignSkillTable>('melee');
  const [roll, setRoll] = useState<number>(7);

  const tableKeys = Object.keys(SKILL_TABLE_LABELS) as CampaignSkillTable[];
  const currentEntry = SKILL_TABLES[table].find(e => e.roll === roll);
  const isPatronSkill = currentEntry?.name === 'Patron Skill';

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
      {isPatronSkill ? (
        <PatronSkillPicker
          triggerTable={table}
          triggerRoll={roll}
          patronId={patronId}
          factionId={factionId}
          subfactionName={subfactionName}
          unitKeywords={unitKeywords}
          alreadyPickedNames={alreadyPickedPatronSkillNames}
          onAdd={onAdd}
        />
      ) : (
        <button
          className="ep-add-btn"
          onClick={() => onAdd(makeCampaignSkill(table, roll))}
        >
          Add Skill
        </button>
      )}
    </div>
  );
}

function AddTraumaPanel({ onAdd, existing: _existing }: { onAdd: (trauma: EliteTrauma) => void; existing: EliteTrauma[] }) {
  const options = ELITE_TRAUMAS; // show all; player decides duplicates
  const [selectedId, setSelectedId] = useState<string>(options[0]?.id ?? '');
  const selected = options.find(t => t.id === selectedId) ?? options[0];

  return (
    <div className="ep-add-panel">
      <h4 className="ep-add-title">Add Trauma</h4>
      <p className="ep-add-hint">
        Adding a Trauma also adds 1 Battle Scar. Removing a Trauma does <em>not</em> remove the scar.
      </p>
      <div className="ep-add-row">
        <label className="ep-add-label">Trauma</label>
        <select
          className="ep-add-select"
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
        >
          {options.map(t => (
            <option key={t.id} value={t.id}>{t.name}{t.canRecover ? ' ✦' : ''}</option>
          ))}
        </select>
      </div>
      {selected && <p className="ep-add-preview">{selected.description}</p>}
      <button className="ep-add-btn" onClick={() => {
        if (selected) onAdd({ ...selected, id: `${selected.id}_${Date.now()}` });
      }}>
        Add Trauma (+1 Scar)
      </button>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export function EliteProgressionModal({ unit, factionId, patronId, subfactionName, isElite = false, onChange, onClose }: EliteProgressionModalProps) {
  const xp = unit.xp ?? 0;
  const skills = unit.campaignSkills ?? [];
  const scarCount = unit.scarCount ?? 0;
  const traumas = unit.traumas ?? [];
  const commendations = unit.commendations ?? [];
  const isAM = factionId === 'astra_militarum';

  // ---- local section tab state ----
  type Tab = 'skills' | 'scars' | 'traumas' | 'commendations';
  const [activeTab, setActiveTab] = useState<Tab>(isElite ? 'skills' : 'scars');

  // ---- helpers ----
  function update(patch: Partial<WarbandUnit>) {
    onChange({ ...unit, ...patch });
  }

  function adjustXp(delta: number) {
    update({ xp: Math.max(0, xp + delta) });
  }

  function addSkill(skill: CampaignSkill) {
    const isPsychicAwakening = skill.name === 'Psychic Awakening';
    const alreadyPsyker = unit.keywords.some(k => /^PSYKER\s+\d+$/i.test(k));
    const newKws = isPsychicAwakening && !alreadyPsyker
      ? [...unit.keywords, 'PSYKER 1']
      : unit.keywords;
    update({ campaignSkills: [...skills, skill], keywords: newKws });
  }

  function removeSkill(idx: number) {
    const removedSkill = skills[idx];
    const wasPsychicAwakening = removedSkill?.name === 'Psychic Awakening';
    const remainingSkills = skills.filter((_, i) => i !== idx);
    const stillHasPA = remainingSkills.some(s => s.name === 'Psychic Awakening');
    const newKws = wasPsychicAwakening && !stillHasPA
      ? unit.keywords.filter(k => k !== 'PSYKER 1')
      : unit.keywords;
    update({ campaignSkills: remainingSkills, keywords: newKws });
  }

  function adjustScarCount(delta: number) {
    update({ scarCount: Math.max(0, scarCount + delta) });
  }

  function addTrauma(trauma: EliteTrauma) {
    // Each Trauma also adds 1 Battle Scar
    update({ traumas: [...traumas, trauma], scarCount: scarCount + 1 });
  }

  function removeTrauma(idx: number) {
    // Removing a Trauma does NOT remove a scar — scar count stays
    update({ traumas: traumas.filter((_, i) => i !== idx) });
  }

  function toggleCommendation(id: string) {
    if (commendations.includes(id)) {
      update({ commendations: commendations.filter(c => c !== id) });
    } else {
      update({ commendations: [...commendations, id] });
    }
  }

  const isPromotedLabel = unit.isPromoted ? ' (Promoted)' : '';
  const unitTypeLabel = unit.unitType === 'elite' ? 'Elite' : 'Troop';
  const isDead = scarCount >= 3;

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

        {/* ── XP Counter (Elite-eligible only) ── */}
        {isElite && (
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
        )}

        {/* ── Tabs ── */}
        <div className="ep-tabs">
          {isElite && (
            <button
              className={`ep-tab ${activeTab === 'skills' ? 'ep-tab--active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              Campaign Skills {skills.length > 0 && <span className="ep-badge">{skills.length}</span>}
            </button>
          )}
          <button
            className={`ep-tab ${activeTab === 'scars' ? 'ep-tab--active' : ''}`}
            onClick={() => setActiveTab('scars')}
          >
            Battle Scars <span className={`ep-badge ${isDead ? 'ep-badge--danger' : ''}`}>{scarCount}/3</span>
          </button>
          <button
            className={`ep-tab ${activeTab === 'traumas' ? 'ep-tab--active' : ''}`}
            onClick={() => setActiveTab('traumas')}
          >
            Traumas {traumas.length > 0 && <span className="ep-badge">{traumas.length}</span>}
          </button>
          {isAM && (
            <button
              className={`ep-tab ${activeTab === 'commendations' ? 'ep-tab--active' : ''}`}
              onClick={() => setActiveTab('commendations')}
            >
              Commendations {commendations.length > 0 && <span className="ep-badge">{commendations.length}</span>}
            </button>
          )}
        </div>

        {/* ── Tab content ── */}
        <div className="ep-tab-content">

          {isElite && activeTab === 'skills' && (
            <div className="ep-section">
              <AddSkillPanel
                onAdd={addSkill}
                patronId={patronId}
                factionId={factionId}
                subfactionName={subfactionName}
                unitKeywords={unit.keywords}
                alreadyPickedPatronSkillNames={skills.filter(s => s.source === 'patron').map(s => s.name)}
              />
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
              <div className="ep-scar-counter-block">
                <p className="ep-scar-rule">
                  Battle Scars are a count. At <strong>3 Battle Scars</strong> the model is permanently removed from your roster.
                  The named mechanical effects from rolling on the injury table are <strong>Traumas</strong> (see Traumas tab).
                </p>
                <div className="ep-scar-counter">
                  <button
                    className="ep-xp-btn ep-btn-minus"
                    onClick={() => adjustScarCount(-1)}
                    disabled={scarCount <= 0}
                    title="Remove 1 Battle Scar"
                  >−</button>
                  <span className={`ep-scar-value ${isDead ? 'ep-scar-value--dead' : scarCount === 2 ? 'ep-scar-value--warning' : ''}`}>
                    {scarCount}
                  </span>
                  <button
                    className="ep-xp-btn ep-btn-plus"
                    onClick={() => adjustScarCount(1)}
                    title="Add 1 Battle Scar"
                  >+</button>
                </div>
                {isDead && (
                  <div className="ep-scar-death-warning">
                    ⚠ 3 Battle Scars — this model is permanently removed from your roster.
                  </div>
                )}
                {!isDead && scarCount === 2 && (
                  <div className="ep-scar-caution">
                    ⚠ 2 Battle Scars — one more scar and this model dies!
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'traumas' && (
            <div className="ep-section">
              <AddTraumaPanel onAdd={addTrauma} existing={traumas} />
              <p className="ep-trauma-note">
                ✦ = Recoverable trauma (may be cleared between battles; scar count remains). Removing a Trauma here does <em>not</em> reduce the Battle Scar count.
              </p>
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

          {activeTab === 'commendations' && isAM && (
            <div className="ep-section">
              <p className="ep-commendation-intro">
                Astra Militarum Commendations are awarded after each battle. A model may hold multiple commendations but only one of each.
                Tick a commendation to record it for this model.
              </p>
              <ul className="ep-list ep-commendation-list">
                {ASTRA_MILITARUM_COMMENDATIONS.map(cm => {
                  const held = commendations.includes(cm.id);
                  return (
                    <li key={cm.id} className={`ep-list-item ep-commendation-item ${held ? 'ep-commendation-item--held' : ''}`}>
                      <div className="ep-item-header">
                        <label className="ep-commendation-label">
                          <input
                            type="checkbox"
                            className="ep-commendation-check"
                            checked={held}
                            onChange={() => toggleCommendation(cm.id)}
                          />
                          <span className="ep-item-name">{cm.name}</span>
                        </label>
                        {cm.uniquePerWarband && <span className="ep-item-tag ep-tag-unique">Once per warband</span>}
                      </div>
                      {cm.restrictions && <p className="ep-item-restriction">Eligible: {cm.restrictions}</p>}
                      <p className="ep-item-req"><strong>Requirement:</strong> {cm.requirements}</p>
                      <p className="ep-item-benefit"><strong>Benefit:</strong> {cm.benefit}</p>
                    </li>
                  );
                })}
              </ul>
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

