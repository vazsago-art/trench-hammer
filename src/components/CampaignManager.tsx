import { useState, useMemo, useCallback } from 'react';
import type { Warband, CampaignState, CampaignShopContact } from '../types/index.js';
import {
  MISSION_TABLES, getBracket, getExplorationDiceCount,
  getAvailableExplorationTables, EXPLORATION_TABLES, EXPLORATION_SKILL_DEFS,
} from '../data/campaignMissions.js';
import { getFactionResources, buildInitialFactionResources } from '../data/factionResources.js';
import {
  getPatronById, filterAbilitiesForSubfaction,
  PATRON_WARBAND_EFFECTS, PATRON_WARBAND_EFFECT_CATEGORY_LABELS,
} from '../data/patrons.js';
import type { PatronWarbandEffectCategory } from '../data/patrons.js';
import { getSubFactionById } from '../data/subfactions.js';
import { PatronAbilityChip } from './PatronAbilityChip.js';
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

  const currentSubFactionName = useMemo(
    () => getSubFactionById(selectedFaction, selectedSubFaction)?.name,
    [selectedFaction, selectedSubFaction]
  );

  const selectedPatron = useMemo(
    () => (warband.patron ? getPatronById(warband.patron, selectedFaction) : undefined),
    [warband.patron, selectedFaction]
  );

  const patronAbilities = useMemo(
    () => (selectedPatron ? filterAbilitiesForSubfaction(selectedPatron.abilities, currentSubFactionName) : []),
    [selectedPatron, currentSubFactionName]
  );

  /** Patron skills held by warband models that provide warband-wide campaign effects. */
  const activeWarbandEffects = useMemo(() => {
    const results: Array<{ skillName: string; unitName: string; category: PatronWarbandEffectCategory; summary: string }> = [];
    for (const unit of warband.units) {
      for (const skill of (unit.campaignSkills ?? [])) {
        if (skill.source === 'patron') {
          const effect = PATRON_WARBAND_EFFECTS[skill.name];
          if (effect) results.push({ skillName: skill.name, unitName: unit.name, ...effect });
        }
      }
    }
    return results;
  }, [warband.units]);

  // ── Local UI state ────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'overview' | 'missions' | 'exploration' | 'resources' | 'skills' | 'patron' | 'guide'>('overview');
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
          {(['overview', 'missions', 'exploration', 'resources', 'skills', 'patron', 'guide'] as const).map(t => (
            <button key={t} className={activeTab === t ? 'active' : ''} onClick={() => setActiveTab(t)}>
              {t === 'overview' ? 'Overview' : t === 'missions' ? 'Missions' : t === 'exploration' ? 'Exploration' : t === 'resources' ? 'Resources' : t === 'skills' ? 'Skills' : t === 'patron' ? 'Patron' : '? Guide'}
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
          {activeTab === 'skills' && (            <div className="campaign-skills">
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

          {/* ── PATRON TAB ───────────────────────────────────── */}
          {activeTab === 'patron' && (
            <div className="campaign-patron">
              {!selectedPatron ? (
                <div className="campaign-empty">
                  <p>No Patron selected for this warband.</p>
                  <p className="campaign-hint">Select a Patron in the Army Builder to see their abilities here.</p>
                </div>
              ) : (
                <>
                  <div className="campaign-patron-header">
                    <span className="campaign-patron-icon">⚜</span>
                    <div>
                      <h3 className="campaign-patron-name">{selectedPatron.name}</h3>
                      <p className="campaign-patron-desc">{selectedPatron.description}</p>
                    </div>
                  </div>

                  <div className="campaign-section">
                    <h3>Patron Skills</h3>
                    <p className="campaign-hint">
                      When a model rolls a 2 or 12 on any Skill table, they may choose one of these Patron Skills.
                    </p>
                    <ul className="campaign-patron-skills">
                      {patronAbilities.map((ability, i) => (
                        <li key={i} className="campaign-patron-skill-item">
                          <PatronAbilityChip ability={ability} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeWarbandEffects.length > 0 && (
                    <div className="campaign-section">
                      <h3>Active Warband Effects</h3>
                      <p className="campaign-hint">
                        These Patron Skills are held by models in your warband and provide ongoing benefits during campaign phases.
                      </p>
                      {(['cost', 'limit', 'income', 'battle'] as PatronWarbandEffectCategory[]).map(cat => {
                        const effects = activeWarbandEffects.filter(e => e.category === cat);
                        if (effects.length === 0) return null;
                        return (
                          <div key={cat} className="campaign-warband-effect-group">
                            <div className="campaign-warband-effect-cat-label">
                              {PATRON_WARBAND_EFFECT_CATEGORY_LABELS[cat]}
                            </div>
                            {effects.map((e, i) => (
                              <div key={i} className="campaign-warband-effect-row">
                                <div className="campaign-warband-effect-top">
                                  <span className="campaign-warband-effect-name">⚜ {e.skillName}</span>
                                  <span className="campaign-warband-effect-holder">{e.unitName}</span>
                                </div>
                                <p className="campaign-warband-effect-summary">{e.summary}</p>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="campaign-section campaign-patrons-visit">
                    <h3>⚜ Patron's Visit</h3>
                    <p className="campaign-hint">
                      During the Campaign Phase, your Patron may intercede on your behalf.
                      Spend 1 Reserve Glory to gain 1 Campaign Victory Point — a direct translation of divine favour into strategic advantage.
                    </p>
                    <div className="campaign-patrons-visit-row">
                      <div className="campaign-patrons-visit-stat">
                        <span className="campaign-patrons-visit-label">Reserve Glory</span>
                        <span className="campaign-patrons-visit-value">{campaign.reserveGlory}</span>
                      </div>
                      <button
                        className="campaign-patrons-visit-btn"
                        disabled={campaign.reserveGlory < 1}
                        onClick={() => update({
                          reserveGlory: campaign.reserveGlory - 1,
                          campaignVP: campaign.campaignVP + 1,
                        })}
                      >
                        Exchange 1 Glory → 1 Campaign VP
                      </button>
                      <div className="campaign-patrons-visit-stat">
                        <span className="campaign-patrons-visit-label">Campaign VP</span>
                        <span className="campaign-patrons-visit-value">{campaign.campaignVP}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── GUIDE TAB ─────────────────────────────────────── */}
          {activeTab === 'guide' && (
            <div className="campaign-guide">
              <p className="campaign-guide-intro">
                Step-by-step walkthrough of how the <strong>Patron system</strong> works across every phase of your campaign.
              </p>
              {PATRON_GUIDE_STEPS.map((step, i) => (
                <div key={i} className="campaign-guide-step">
                  <div className="campaign-guide-step-marker">
                    <span className="campaign-guide-step-num">{i + 1}</span>
                    {i < PATRON_GUIDE_STEPS.length - 1 && <div className="campaign-guide-step-line" />}
                  </div>
                  <div className="campaign-guide-step-body">
                    <div className="campaign-guide-step-header">
                      <span className="campaign-guide-step-icon">{step.icon}</span>
                      <div>
                        <div className="campaign-guide-step-phase">{step.phase}</div>
                        <h3 className="campaign-guide-step-title">{step.title}</h3>
                      </div>
                    </div>
                    <p className="campaign-guide-step-desc">{step.description}</p>
                    {step.bullets && (
                      <ul className="campaign-guide-step-bullets">
                        {step.bullets.map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    )}
                    {step.tip && (
                      <div className="campaign-guide-tip">
                        <span className="campaign-guide-tip-label">Tip</span>
                        {step.tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Patron Guide step data ──────────────────────────────────────────────────
const PATRON_GUIDE_STEPS: Array<{
  icon: string;
  phase: string;
  title: string;
  description: string;
  bullets?: string[];
  tip?: string;
}> = [
  {
    icon: '⚜',
    phase: 'Campaign Setup  (once)',
    title: 'Choose Your Patron',
    description:
      'Before your first campaign game, select a Patron for your warband. This choice is permanent — choose based on your faction and playstyle.',
    bullets: [
      'Open the Army Builder → find the Patron section in the warband panel.',
      'Pick from the Patrons available to your faction (Imperial / Chaos / faction-specific).',
      'Come back here to the Patron tab to see all Patron Skills your models can earn.',
    ],
    tip: 'Chaos warbands choose from Chaos Patrons; Imperial warbands from Imperial Patrons. Some Patrons require a specific subfaction.',
  },
  {
    icon: '🗺',
    phase: 'Pre-Game Phase  (each battle)',
    title: 'Apply Battle-Start Patron Effects',
    description:
      'Before deployment, check whether any model holds a Patron Skill that triggers at the start of the game.',
    bullets: [
      'Open Patron tab → Active Warband Effects → "⚔ Battle Setup" category.',
      'Legal Action: after deployment, move one enemy model up to 6" (not into Melee or impassable terrain).',
      'Master of Spies (Inquisition only): roll your Shadow Operation twice and choose one result.',
      'Master of the Void: up to 2 non-Elite ROGUE TRADER models gain DEEP STRIKE for this battle.',
    ],
    tip: 'If no models have Battle Setup skills yet, skip this step. You will unlock them through Elite Progression.',
  },
  {
    icon: '⚔',
    phase: 'During the Battle',
    title: 'Use Patron Abilities on Your Models',
    description:
      'Patron Skills work exactly like regular skills — they are always active on the model that holds them.',
    bullets: [
      'Passive bonuses (e.g. Brazen Hide, Loathsome Grace) are always on.',
      'Triggered abilities (e.g. Profane Zeal, Zealous Persecution) fire when their condition is met.',
      'Active abilities (e.g. Daemonic Whispers, Exalted Possessor) require an Action or Success Roll during that model\'s Activation.',
    ],
    tip: 'Use the Patron tab → Patron Skills list as a quick reference for what each ability does mid-game.',
  },
  {
    icon: '🎲',
    phase: 'Post-Game  →  Elite Progression',
    title: 'Earn Patron Skills on a Roll of 2 or 12',
    description:
      'After the battle, Elite models roll on a Skill Table. A result of 2 or 12 lets that model pick a Patron Skill instead.',
    bullets: [
      'Open Army Builder → select the Elite model → tap Elite Progression.',
      'Roll a skill table. When the result is 2 or 12, the Patron Skill Picker appears automatically.',
      'Browse available skills — filtered for that model\'s keywords (Leader Only, Psyker Only, etc.).',
      'Pick one. The skill is saved with a ⚜ badge. A model cannot take the same Patron Skill twice.',
    ],
    tip: 'Skills with "Leader Only" or "Psyker Only" conditions only appear for qualifying models in the picker.',
  },
  {
    icon: '💰',
    phase: 'Post-Game  →  Quartermaster Step',
    title: 'Apply Cost-Reduction Patron Skills',
    description:
      'If any model holds a Supply Shipment or similar Patron Skill, apply those discounts when buying new equipment.',
    bullets: [
      'Open Patron tab → Active Warband Effects → "💰 Cost Reductions".',
      'Supply Shipment: Armour & Equipment — items costing ≥15cr cost 5cr less (LIMIT: 1 model).',
      'Supply Shipment: Melee Weapons — melee weapons costing ≥10cr cost 5cr less (LIMIT: 1 model).',
      'Supply Shipment: Ranged Weapons — ranged weapons costing ≥20cr cost 5cr less (LIMIT: 1 model).',
      'These discounts are active as long as the skill-holder is in the warband (not dead or retired).',
    ],
    tip: 'Two models cannot stack the same Supply Shipment type. Each LIMIT:1 means only one model in the warband may hold that specific skill.',
  },
  {
    icon: '📋',
    phase: 'Post-Game  →  Reinforcements Step',
    title: 'Check Limit-Increase Patron Skills',
    description:
      'Some Patron Skills permanently raise the LIMIT of certain units, weapons, or equipment.',
    bullets: [
      'Open Patron tab → Active Warband Effects → "📋 Limit Increases".',
      'Organizational Talent: one battlekit item\'s LIMIT increases by 1 (record your choice).',
      'Secret Forces: one Troop type\'s LIMIT increases by 1 (cannot choose LIMIT:1 or LARGE models).',
      'Port Contacts: any one weapon, armour, or equipment LIMIT increases by 1.',
      'Tactical Acumen: one non-ELITE model type\'s limit increases by 1.',
    ],
    tip: 'The app tracks who holds which skill, but the specific item/unit you chose for a Limit increase is yours to note down.',
  },
  {
    icon: '⭐',
    phase: 'Post-Game  →  Income Step',
    title: 'Collect Glory & Credit Income',
    description:
      'After each battle, collect any Glory or Credits granted by Patron Skills.',
    bullets: [
      'Open Patron tab → Active Warband Effects → "⭐ Glory & Credit Income".',
      'Guild Affiliate: earn +2D6×10 credits — roll and add to Reserve Credits in the Overview tab.',
      'Trusted War Leader (Leader Only): earn +1 Reserve Glory.',
      'Inquisitorial Honor (non-Inquisition only): earn +1 Reserve Glory if this model participated.',
      'Acquisitions: your credit limit for missions is permanently increased by 25.',
    ],
    tip: 'Update Reserve Credits and Reserve Glory in the Overview tab after collecting income.',
  },
  {
    icon: '🏆',
    phase: 'Post-Game  →  Patron\'s Visit  (optional)',
    title: 'Trade Glory for Campaign Victory Points',
    description:
      'At any point during the Campaign Phase, your Patron can intercede on your behalf. Spend 1 Reserve Glory to gain 1 Campaign VP.',
    bullets: [
      'Open Patron tab → scroll to Patron\'s Visit at the bottom.',
      'Tap "Exchange 1 Glory → 1 Campaign VP" (button disabled if Reserve Glory is 0).',
      'Reserve Glory decreases by 1; Campaign VP increases by 1.',
      'Use this when you are close to a VP milestone or heading into the Finale.',
    ],
    tip: 'Glory also pays for other campaign actions. Only trade it for VP when you have surplus or urgently need the Campaign VP.',
  },
];
