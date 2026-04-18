import { useState, useMemo, useCallback } from 'react';
import type { Warband, CampaignState, CampaignShopContact } from '../types/index.js';
import {
  MISSION_TABLES, getBracket, getExplorationDiceCount,
  getAvailableExplorationTables, EXPLORATION_TABLES, EXPLORATION_SKILL_DEFS,
} from '../data/campaignMissions.js';
import { getFactionResources, buildInitialFactionResources } from '../data/factionResources.js';
import './CampaignManager.css';

interface Props {
  warband: Warband;
  selectedFaction: string;
  selectedSubFaction: string;
  onUpdateWarband: (fn: (prev: Warband) => Warband) => void;
  onClose: () => void;
}

function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/** Initialise a fresh campaign state for this faction / subfaction. */
function initCampaign(factionId: string, subfactionId?: string): CampaignState {
  return {
    gameNumber: 1,
    campaignVP: 0,
    reserveCredits: 0,
    reserveGlory: 0,
    explorationSkills: [],
    factionResources: buildInitialFactionResources(factionId, subfactionId),
    exploredLocations: [],
    shopContacts: [],
    notes: '',
  };
}

export function CampaignManager({
  warband, selectedFaction, selectedSubFaction, onUpdateWarband, onClose,
}: Props) {
  // If campaign doesn't exist yet, we initialise on first render
  const campaign: CampaignState = warband.campaign ?? initCampaign(selectedFaction, selectedSubFaction);

  const update = useCallback((patch: Partial<CampaignState>) => {
    onUpdateWarband(prev => ({
      ...prev,
      campaign: { ...(prev.campaign ?? initCampaign(selectedFaction, selectedSubFaction)), ...patch },
    }));
  }, [onUpdateWarband, selectedFaction, selectedSubFaction]);

  // Ensure campaign object is persisted if it didn't exist
  if (!warband.campaign) {
    onUpdateWarband(prev => ({ ...prev, campaign: initCampaign(selectedFaction, selectedSubFaction) }));
  }

  const bracket = getBracket(campaign.gameNumber);
  const missionTable = MISSION_TABLES[bracket];
  const explorationDiceCount = getExplorationDiceCount(campaign.gameNumber);
  const availableTables = getAvailableExplorationTables(campaign.gameNumber);
  const factionResourceDefs = useMemo(
    () => getFactionResources(selectedFaction, selectedSubFaction),
    [selectedFaction, selectedSubFaction]
  );

  // ── Local UI state ────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'overview' | 'missions' | 'exploration' | 'resources' | 'skills'>('overview');
  const [missionRoll, setMissionRoll] = useState<number | null>(null);
  const [explorationDice, setExplorationDice] = useState<number[]>([]);
  const [explorationAssignment, setExplorationAssignment] = useState<Record<string, number[]>>({});

  // ── Mission roller ────────────────────────────────────────────
  const handleRollMission = () => {
    const max = bracket === 'finale' ? 3 : 6;
    setMissionRoll(rollDice(max));
  };

  // ── Exploration roller ────────────────────────────────────────
  const handleRollExploration = () => {
    const dice: number[] = [];
    for (let i = 0; i < explorationDiceCount; i++) dice.push(rollDice(6));
    setExplorationDice(dice);
    setExplorationAssignment({});
  };

  const assignDie = (dieIdx: number, table: string) => {
    setExplorationAssignment(prev => {
      const next = { ...prev };
      // Remove die from any existing assignment
      for (const t of Object.keys(next)) {
        next[t] = (next[t] || []).filter(i => i !== dieIdx);
        if (next[t].length === 0) delete next[t];
      }
      // Assign to new table
      if (!next[table]) next[table] = [];
      next[table] = [...next[table], dieIdx];
      return next;
    });
  };

  const getTableTotal = (table: string) =>
    (explorationAssignment[table] || []).reduce((sum, idx) => sum + explorationDice[idx], 0);

  const getExplorationResult = (table: string) => {
    const total = getTableTotal(table);
    if (total === 0) return null;
    const locations = EXPLORATION_TABLES[table as keyof typeof EXPLORATION_TABLES]?.locations || [];
    // Find largest result <= total
    let best = null;
    for (const loc of locations) {
      if (loc.result <= total && (!best || loc.result > best.result)) best = loc;
    }
    return best;
  };

  // ── Resource helpers ──────────────────────────────────────────
  const adjustResource = (id: string, delta: number) => {
    const current = campaign.factionResources[id] ?? 0;
    const next = Math.max(0, current + delta);
    update({ factionResources: { ...campaign.factionResources, [id]: next } });
  };

  // ── Shop contact helpers ──────────────────────────────────────
  const addShopContact = (contact: CampaignShopContact) => {
    if (campaign.shopContacts.some(c => c.name === contact.name)) return;
    update({ shopContacts: [...campaign.shopContacts, contact] });
  };

  const removeShopContact = (name: string) => {
    update({ shopContacts: campaign.shopContacts.filter(c => c.name !== name) });
  };

  // ── Exploration skill helpers ─────────────────────────────────
  const addExplorationSkill = (skill: string) => {
    update({ explorationSkills: [...campaign.explorationSkills, skill] });
  };

  const removeExplorationSkill = (idx: number) => {
    update({ explorationSkills: campaign.explorationSkills.filter((_, i) => i !== idx) });
  };

  return (
    <div className="campaign-overlay" onClick={onClose}>
      <div className="campaign-modal" onClick={e => e.stopPropagation()}>
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="campaign-header">
          <h2>Campaign Manager</h2>
          <button className="campaign-close" onClick={onClose}>✕</button>
        </div>

        {/* ── Tabs ────────────────────────────────────────────── */}
        <div className="campaign-tabs">
          {(['overview', 'missions', 'exploration', 'resources', 'skills'] as const).map(t => (
            <button key={t} className={activeTab === t ? 'active' : ''} onClick={() => setActiveTab(t)}>
              {t === 'overview' ? 'Overview' : t === 'missions' ? 'Missions' : t === 'exploration' ? 'Exploration' : t === 'resources' ? 'Resources' : 'Skills'}
            </button>
          ))}
        </div>

        {/* ── Body ────────────────────────────────────────────── */}
        <div className="campaign-body">
          {/* ── OVERVIEW TAB ──────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="campaign-overview">
              <div className="campaign-stat-grid">
                <div className="campaign-stat">
                  <label>Game #</label>
                  <div className="campaign-stat-controls">
                    <button onClick={() => update({ gameNumber: Math.max(1, campaign.gameNumber - 1) })}>−</button>
                    <span className="campaign-stat-value">{campaign.gameNumber}</span>
                    <button onClick={() => update({ gameNumber: Math.min(12, campaign.gameNumber + 1) })}>+</button>
                  </div>
                  <div className="campaign-stat-sub">{missionTable.label} bracket</div>
                </div>

                <div className="campaign-stat">
                  <label>Campaign VP</label>
                  <div className="campaign-stat-controls">
                    <button onClick={() => update({ campaignVP: Math.max(0, campaign.campaignVP - 1) })}>−</button>
                    <span className="campaign-stat-value">{campaign.campaignVP}</span>
                    <button onClick={() => update({ campaignVP: campaign.campaignVP + 1 })}>+</button>
                  </div>
                </div>

                <div className="campaign-stat">
                  <label>Reserve Credits</label>
                  <div className="campaign-stat-controls">
                    <button onClick={() => update({ reserveCredits: Math.max(0, campaign.reserveCredits - 25) })}>−25</button>
                    <span className="campaign-stat-value">{campaign.reserveCredits}</span>
                    <button onClick={() => update({ reserveCredits: campaign.reserveCredits + 25 })}>+25</button>
                  </div>
                </div>

                <div className="campaign-stat">
                  <label>Reserve Glory</label>
                  <div className="campaign-stat-controls">
                    <button onClick={() => update({ reserveGlory: Math.max(0, campaign.reserveGlory - 1) })}>−</button>
                    <span className="campaign-stat-value">{campaign.reserveGlory}</span>
                    <button onClick={() => update({ reserveGlory: campaign.reserveGlory + 1 })}>+</button>
                  </div>
                </div>
              </div>

              {/* Shop contacts */}
              <div className="campaign-section">
                <h3>Shop Contacts</h3>
                {campaign.shopContacts.length === 0 ? (
                  <p className="campaign-empty">No shop contacts established yet.</p>
                ) : (
                  <div className="campaign-contact-list">
                    {campaign.shopContacts.map(c => (
                      <div key={c.name} className="campaign-contact">
                        <span>{c.name} — up to {c.maxGloryCost} Glory</span>
                        <button onClick={() => removeShopContact(c.name)} title="Remove">✕</button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="campaign-contact-add">
                  <button onClick={() => addShopContact({ name: 'Supplier', maxGloryCost: 3 })}>+ Supplier (≤3)</button>
                  <button onClick={() => addShopContact({ name: 'Black Market', maxGloryCost: 7 })}>+ Black Market (≤7)</button>
                  <button onClick={() => addShopContact({ name: 'Secret Dealer', maxGloryCost: 999 })}>+ Secret Dealer (any)</button>
                </div>
              </div>

              {/* Notes field */}
              <div className="campaign-section">
                <h3>Campaign Notes</h3>
                <textarea
                  className="campaign-notes"
                  value={campaign.notes}
                  onChange={e => update({ notes: e.target.value })}
                  placeholder="Jot down anything relevant to your campaign…"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* ── MISSIONS TAB ─────────────────────────────────── */}
          {activeTab === 'missions' && (
            <div className="campaign-missions">
              <div className="campaign-section">
                <h3>{missionTable.label} — Roll {missionTable.diceType}</h3>
                <button className="campaign-roll-btn" onClick={handleRollMission}>
                  🎲 Roll Mission
                </button>
                {missionRoll !== null && (
                  <div className="campaign-roll-result">
                    Rolled: <strong>{missionRoll}</strong>
                  </div>
                )}
              </div>

              <div className="campaign-mission-list">
                {missionTable.missions.map(m => (
                  <div
                    key={m.roll}
                    className={`campaign-mission${missionRoll === m.roll ? ' highlight' : ''}`}
                  >
                    <div className="campaign-mission-roll">{m.roll}</div>
                    <div className="campaign-mission-info">
                      <strong>{m.name}</strong>
                      {m.isOriginal && <span className="mission-tag-original">TC</span>}
                      <p>{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── EXPLORATION TAB ──────────────────────────────── */}
          {activeTab === 'exploration' && (
            <div className="campaign-exploration">
              <div className="campaign-section">
                <h3>Exploration — {explorationDiceCount} Dice</h3>
                <p className="campaign-hint">
                  Available tables: {availableTables.map(t => EXPLORATION_TABLES[t].label).join(', ')}
                </p>
                <button className="campaign-roll-btn" onClick={handleRollExploration}>
                  🎲 Roll {explorationDiceCount} Exploration Dice
                </button>
              </div>

              {explorationDice.length > 0 && (
                <>
                  <div className="campaign-dice-row">
                    {explorationDice.map((val, idx) => {
                      // Find which table this die is assigned to
                      let assignedTable = '';
                      for (const [table, indices] of Object.entries(explorationAssignment)) {
                        if (indices.includes(idx)) assignedTable = table;
                      }
                      return (
                        <div key={idx} className="campaign-die">
                          <div className="campaign-die-value">{val}</div>
                          <div className="campaign-die-assign">
                            {availableTables.map(t => (
                              <button
                                key={t}
                                className={assignedTable === t ? 'active' : ''}
                                onClick={() => assignDie(idx, t)}
                              >
                                {t[0].toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Results per table */}
                  <div className="campaign-exploration-results">
                    {availableTables.map(table => {
                      const total = getTableTotal(table);
                      const location = getExplorationResult(table);
                      if (total === 0) return null;
                      return (
                        <div key={table} className="campaign-explore-result">
                          <h4>{EXPLORATION_TABLES[table].label} Table — Total: {total}</h4>
                          {location ? (
                            <div className="explore-location">
                              <div className="explore-location-name">
                                <strong>{location.name}</strong> (result {location.result}+)
                              </div>
                              {location.universalChoices.length > 0 && (
                                <div className="explore-choices">
                                  <div className="explore-choices-label">Universal:</div>
                                  {location.universalChoices.map(c => (
                                    <div key={c.name} className="explore-choice">
                                      <strong>{c.name}:</strong> {c.description}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {location.factionChoices.length > 0 && (
                                <div className="explore-choices faction">
                                  <div className="explore-choices-label">Faction-specific:</div>
                                  {location.factionChoices.map(c => (
                                    <div key={c.name} className="explore-choice">
                                      <strong>{c.name}</strong> <span className="explore-condition">{c.conditionLabel}</span>: {c.description}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="explore-location-empty">
                              No location found (total too low for this table).
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Explored history */}
              {campaign.exploredLocations.length > 0 && (
                <div className="campaign-section">
                  <h3>Explored Locations</h3>
                  <div className="campaign-explored-list">
                    {campaign.exploredLocations.map((name, i) => (
                      <span key={i} className="explored-tag">{name}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── RESOURCES TAB ────────────────────────────────── */}
          {activeTab === 'resources' && (
            <div className="campaign-resources">
              {factionResourceDefs.length === 0 ? (
                <div className="campaign-empty">
                  This faction has no tracked campaign resources.
                </div>
              ) : (
                <div className="campaign-resource-grid">
                  {factionResourceDefs.map(r => (
                    <div key={r.id} className="campaign-resource">
                      <div className="campaign-resource-info">
                        <strong>{r.name}</strong>
                        <span className="campaign-resource-desc">{r.description}</span>
                      </div>
                      <div className="campaign-stat-controls">
                        <button onClick={() => adjustResource(r.id, -1)}>−</button>
                        <span className="campaign-stat-value">{campaign.factionResources[r.id] ?? 0}</span>
                        <button onClick={() => adjustResource(r.id, 1)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── SKILLS TAB ───────────────────────────────────── */}
          {activeTab === 'skills' && (
            <div className="campaign-skills">
              <div className="campaign-section">
                <h3>Exploration Skills</h3>
                {campaign.explorationSkills.length === 0 ? (
                  <p className="campaign-empty">No exploration skills acquired yet.</p>
                ) : (
                  <div className="campaign-skill-list">
                    {campaign.explorationSkills.map((skill, i) => (
                      <div key={i} className="campaign-skill-tag">
                        <strong>{skill}</strong>
                        {EXPLORATION_SKILL_DEFS[skill] && (
                          <span className="campaign-skill-desc"> — {EXPLORATION_SKILL_DEFS[skill]}</span>
                        )}
                        <button onClick={() => removeExplorationSkill(i)} title="Remove">✕</button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="campaign-skill-add">
                  <span>Add skill:</span>
                  {Object.keys(EXPLORATION_SKILL_DEFS).map(skill => (
                    <button key={skill} onClick={() => addExplorationSkill(skill)}>
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill reference */}
              <div className="campaign-section">
                <h3>Skill Reference</h3>
                <div className="campaign-skill-ref">
                  {Object.entries(EXPLORATION_SKILL_DEFS).map(([name, desc]) => (
                    <div key={name} className="skill-ref-entry">
                      <strong>{name}</strong>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
