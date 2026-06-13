/**
 * BattleReportLog.tsx
 *
 * Full in-game Battle Report recorder.
 * Rendered inside Battle Mode when the "📋 Battle Report" tab is active.
 */

import { useState, useId } from 'react';
import type {
  BattleReport, BattleTurn, BattleActivation, BattleAction,
  ActionType, ArmySide, AttackRoll, AttackOutcome,
} from '../types/battleReport.js';
import { exportBattleReport } from '../utils/battleReportExport.js';
import './BattleReportLog.css';

// ─── Props ───────────────────────────────────────────────────────────────────

interface Props {
  report: BattleReport;
  onChange: (updated: BattleReport) => void;
  /** Model names from the player's warband for quick-pick */
  playerModels: string[];
  /** Model names from the opponent's warband (may be empty if no matchup) */
  opponentModels: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const ACTION_TYPE_LABELS: Record<ActionType, string> = {
  dash:         '🏃 Dash',
  ranged_attack:'🔫 Ranged Attack',
  melee_attack: '⚔ Melee Attack',
  charge:       '⚡ Charge',
  climb:        '🧗 Climb / Jump',
  hide:         '🫥 Hide',
  rally:        '📯 Rally',
  psychic:      '🔮 Psychic',
  other:        '✏ Other',
};

const OUTCOME_LABELS: Record<AttackOutcome, string> = {
  hit:           'HIT',
  critical:      'CRITICAL',
  miss:          'MISS',
  down:          'DOWN',
  out_of_action: 'OUT OF ACTION',
};

const OUTCOME_CLASS: Record<AttackOutcome, string> = {
  hit:           'brlog-roll--hit',
  critical:      'brlog-roll--critical',
  miss:          'brlog-roll--miss',
  down:          'brlog-roll--down',
  out_of_action: 'brlog-roll--ooa',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Single attack roll row inside an action */
function AttackRollRow({
  roll,
  onUpdate,
  onRemove,
}: {
  roll: AttackRoll;
  onUpdate: (r: AttackRoll) => void;
  onRemove: () => void;
}) {
  return (
    <div className="brlog-roll-row">
      <span className="brlog-roll-index">#{roll.index}</span>

      <select
        className={`brlog-roll-outcome ${OUTCOME_CLASS[roll.outcome]}`}
        value={roll.outcome}
        onChange={e => onUpdate({ ...roll, outcome: e.target.value as AttackOutcome })}
      >
        {(Object.keys(OUTCOME_LABELS) as AttackOutcome[]).map(o => (
          <option key={o} value={o}>{OUTCOME_LABELS[o]}</option>
        ))}
      </select>

      {roll.outcome !== 'miss' && (
        <>
          <label className="brlog-roll-label">Injury:</label>
          <input
            type="number"
            className="brlog-roll-num"
            placeholder="D6"
            min={1} max={12}
            value={roll.injuryRoll ?? ''}
            onChange={e => onUpdate({ ...roll, injuryRoll: e.target.value ? parseInt(e.target.value) : undefined })}
          />
          <label className="brlog-roll-label">Mod:</label>
          <input
            type="number"
            className="brlog-roll-num brlog-roll-num--mod"
            placeholder="0"
            min={-6} max={6}
            value={roll.injuryModifier ?? ''}
            onChange={e => onUpdate({ ...roll, injuryModifier: e.target.value ? parseInt(e.target.value) : undefined })}
          />
          <label className="brlog-roll-label">+BM:</label>
          <input
            type="number"
            className="brlog-roll-num brlog-roll-num--bm"
            placeholder="0"
            min={0} max={10}
            value={roll.bloodMarkersAdded ?? ''}
            onChange={e => onUpdate({ ...roll, bloodMarkersAdded: e.target.value ? parseInt(e.target.value) : undefined })}
          />
        </>
      )}

      <input
        type="text"
        className="brlog-roll-note"
        placeholder="note…"
        value={roll.note ?? ''}
        onChange={e => onUpdate({ ...roll, note: e.target.value || undefined })}
      />

      <button className="brlog-remove-btn" onClick={onRemove} title="Remove roll">✕</button>
    </div>
  );
}

/** Single action inside an activation */
function ActionEditor({
  action,
  onUpdate,
  onRemove,
}: {
  action: BattleAction;
  onUpdate: (a: BattleAction) => void;
  onRemove: () => void;
}) {
  const isAttack = action.type === 'ranged_attack' || action.type === 'melee_attack';
  const needsRoll = action.type !== 'other' && action.type !== 'dash';

  const addRoll = () => {
    const rolls = action.attackRolls ?? [];
    const newRoll: AttackRoll = { index: rolls.length + 1, outcome: 'hit' };
    onUpdate({ ...action, attackRolls: [...rolls, newRoll] });
  };

  const updateRoll = (idx: number, r: AttackRoll) => {
    const rolls = (action.attackRolls ?? []).map((existing, i) => i === idx ? r : existing);
    onUpdate({ ...action, attackRolls: rolls });
  };

  const removeRoll = (idx: number) => {
    const rolls = (action.attackRolls ?? [])
      .filter((_, i) => i !== idx)
      .map((r, i) => ({ ...r, index: i + 1 }));
    onUpdate({ ...action, attackRolls: rolls });
  };

  return (
    <div className="brlog-action">
      <div className="brlog-action-header">
        <span className="brlog-action-index">Action {action.index}</span>

        <select
          className="brlog-action-type"
          value={action.type}
          onChange={e => onUpdate({ ...action, type: e.target.value as ActionType, attackRolls: [] })}
        >
          {(Object.entries(ACTION_TYPE_LABELS) as [ActionType, string][]).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        {needsRoll && (
          <select
            className={`brlog-action-result ${action.rollResult === 'success' ? 'brlog-action-result--success' : action.rollResult === 'critical' ? 'brlog-action-result--critical' : action.rollResult === 'failure' ? 'brlog-action-result--failure' : ''}`}
            value={action.rollResult ?? ''}
            onChange={e => onUpdate({ ...action, rollResult: e.target.value as BattleAction['rollResult'] || undefined })}
          >
            <option value="">— result —</option>
            <option value="success">✓ Succeeded</option>
            <option value="critical">✦ Critical</option>
            <option value="failure">✗ Failed</option>
          </select>
        )}

        <button className="brlog-remove-btn" onClick={onRemove} title="Remove action">✕</button>
      </div>

      {/* Attack-specific fields */}
      {isAttack && (
        <div className="brlog-action-attack-meta">
          <input
            type="text"
            className="brlog-input brlog-input--weapon"
            placeholder="Weapon name…"
            value={action.weaponName ?? ''}
            onChange={e => onUpdate({ ...action, weaponName: e.target.value || undefined })}
          />
          <input
            type="text"
            className="brlog-input brlog-input--profile"
            placeholder='Profile, e.g. 24", AUTOMATIC 2, ASSAULT'
            value={action.weaponProfile ?? ''}
            onChange={e => onUpdate({ ...action, weaponProfile: e.target.value || undefined })}
          />
          <input
            type="text"
            className="brlog-input brlog-input--target"
            placeholder="Target model…"
            value={action.targetName ?? ''}
            onChange={e => onUpdate({ ...action, targetName: e.target.value || undefined })}
          />
          {action.type === 'ranged_attack' && (
            <input
              type="number"
              className="brlog-input brlog-input--dist"
              placeholder='Dist "'
              min={0}
              value={action.targetDistance ?? ''}
              onChange={e => onUpdate({ ...action, targetDistance: e.target.value ? parseFloat(e.target.value) : undefined })}
            />
          )}
        </div>
      )}

      {/* Description / free text */}
      <textarea
        className="brlog-action-desc"
        placeholder={isAttack ? 'Additional notes…' : 'Describe what happened…'}
        value={action.description}
        onChange={e => onUpdate({ ...action, description: e.target.value })}
        rows={2}
      />

      {/* Attack rolls */}
      {isAttack && (
        <div className="brlog-rolls">
          {(action.attackRolls ?? []).map((r, i) => (
            <AttackRollRow
              key={r.index}
              roll={r}
              onUpdate={updated => updateRoll(i, updated)}
              onRemove={() => removeRoll(i)}
            />
          ))}
          <button className="brlog-add-roll-btn" onClick={addRoll}>
            + Add Roll
          </button>
        </div>
      )}
    </div>
  );
}

/** Full Activation editor */
function ActivationEditor({
  activation,
  playerModels,
  opponentModels,
  onUpdate,
  onRemove,
}: {
  activation: BattleActivation;
  playerModels: string[];
  opponentModels: string[];
  onUpdate: (a: BattleActivation) => void;
  onRemove: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const addAction = () => {
    const newAction: BattleAction = {
      id: uid(),
      index: (activation.actions.length) + 1,
      type: 'other',
      description: '',
    };
    onUpdate({ ...activation, actions: [...activation.actions, newAction] });
  };

  const updateAction = (idx: number, updated: BattleAction) => {
    const actions = activation.actions.map((a, i) => i === idx ? updated : a);
    onUpdate({ ...activation, actions });
  };

  const removeAction = (idx: number) => {
    const actions = activation.actions
      .filter((_, i) => i !== idx)
      .map((a, i) => ({ ...a, index: i + 1 }));
    onUpdate({ ...activation, actions });
  };

  const allModels = activation.armySide === 'player' ? playerModels : opponentModels;
  const sideClass = activation.armySide === 'player' ? 'brlog-activation--player' : 'brlog-activation--opponent';

  return (
    <div className={`brlog-activation ${sideClass}`}>
      <div className="brlog-activation-header" onClick={() => setCollapsed(c => !c)}>
        <span className="brlog-activation-collapse">{collapsed ? '▶' : '▼'}</span>
        <span className="brlog-activation-num">Activation {activation.index}</span>
        <span className="brlog-activation-side">
          {activation.armySide === 'player' ? '⚔ Your Army' : '🛡 Opponent'}
        </span>
        <span className="brlog-activation-model">
          {activation.customModelName || activation.modelName || '—'}
          {activation.armyName ? ` (${activation.armyName})` : ''}
        </span>
        <span className="brlog-activation-actions-count">{activation.actions.length} action{activation.actions.length !== 1 ? 's' : ''}</span>
        <button
          className="brlog-remove-btn brlog-remove-btn--activation"
          onClick={e => { e.stopPropagation(); onRemove(); }}
          title="Remove activation"
        >✕</button>
      </div>

      {!collapsed && (
        <div className="brlog-activation-body">
          {/* Model / army fields */}
          <div className="brlog-activation-meta">
            <select
              className="brlog-select"
              value={activation.armySide}
              onChange={e => onUpdate({ ...activation, armySide: e.target.value as ArmySide })}
            >
              <option value="player">⚔ Your Army</option>
              <option value="opponent">🛡 Opponent</option>
            </select>

            <input
              type="text"
              className="brlog-input"
              placeholder="Army / warband name"
              value={activation.armyName}
              onChange={e => onUpdate({ ...activation, armyName: e.target.value })}
            />

            {/* Model quick-pick + free text */}
            {allModels.length > 0 ? (
              <select
                className="brlog-select"
                value={activation.modelName}
                onChange={e => onUpdate({ ...activation, modelName: e.target.value, customModelName: undefined })}
              >
                <option value="">— pick model —</option>
                {allModels.map(m => <option key={m} value={m}>{m}</option>)}
                <option value="__custom__">✏ Enter manually…</option>
              </select>
            ) : null}

            {(activation.modelName === '__custom__' || allModels.length === 0) && (
              <input
                type="text"
                className="brlog-input"
                placeholder="Model name"
                value={activation.customModelName ?? ''}
                onChange={e => onUpdate({ ...activation, customModelName: e.target.value })}
              />
            )}
          </div>

          {/* Note for whole activation */}
          <input
            type="text"
            className="brlog-input brlog-input--note"
            placeholder="Activation note (optional)…"
            value={activation.note ?? ''}
            onChange={e => onUpdate({ ...activation, note: e.target.value || undefined })}
          />

          {/* Actions */}
          <div className="brlog-actions-list">
            {activation.actions.map((action, i) => (
              <ActionEditor
                key={action.id}
                action={action}
                onUpdate={updated => updateAction(i, updated)}
                onRemove={() => removeAction(i)}
              />
            ))}
          </div>

          <button className="brlog-add-action-btn" onClick={addAction}>
            + Add Action
          </button>
        </div>
      )}
    </div>
  );
}

/** Single Turn panel */
function TurnPanel({
  turn,
  playerArmyName,
  opponentArmyName,
  playerModels,
  opponentModels,
  onUpdate,
  onRemove,
}: {
  turn: BattleTurn;
  playerArmyName: string;
  opponentArmyName: string;
  playerModels: string[];
  opponentModels: string[];
  onUpdate: (t: BattleTurn) => void;
  onRemove: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const addActivation = (side: ArmySide) => {
    const newActivation: BattleActivation = {
      id: uid(),
      index: turn.activations.length + 1,
      armySide: side,
      armyName: side === 'player' ? playerArmyName : opponentArmyName,
      modelName: '',
      actions: [],
    };
    onUpdate({ ...turn, activations: [...turn.activations, newActivation] });
  };

  const updateActivation = (idx: number, updated: BattleActivation) => {
    const activations = turn.activations.map((a, i) => i === idx ? updated : a);
    onUpdate({ ...turn, activations });
  };

  const removeActivation = (idx: number) => {
    const activations = turn.activations
      .filter((_, i) => i !== idx)
      .map((a, i) => ({ ...a, index: i + 1 }));
    onUpdate({ ...turn, activations });
  };

  return (
    <div className="brlog-turn">
      <div className="brlog-turn-header" onClick={() => setCollapsed(c => !c)}>
        <span className="brlog-turn-collapse">{collapsed ? '▶' : '▼'}</span>
        <h3 className="brlog-turn-title">Turn {turn.turnNumber}</h3>
        <span className="brlog-turn-count">{turn.activations.length} activation{turn.activations.length !== 1 ? 's' : ''}</span>
        <button
          className="brlog-remove-btn brlog-remove-btn--turn"
          onClick={e => { e.stopPropagation(); onRemove(); }}
          title="Remove turn"
        >✕</button>
      </div>

      {!collapsed && (
        <div className="brlog-turn-body">
          {/* Turn note */}
          <input
            type="text"
            className="brlog-input brlog-input--turn-note"
            placeholder="Turn note, e.g. Priority: Thousand Sons…"
            value={turn.note ?? ''}
            onChange={e => onUpdate({ ...turn, note: e.target.value || undefined })}
          />

          {/* Activations */}
          <div className="brlog-activations">
            {turn.activations.map((act, i) => (
              <ActivationEditor
                key={act.id}
                activation={act}
                playerModels={playerModels}
                opponentModels={opponentModels}
                onUpdate={updated => updateActivation(i, updated)}
                onRemove={() => removeActivation(i)}
              />
            ))}
          </div>

          {/* Add activation buttons */}
          <div className="brlog-add-activation-row">
            <button
              className="brlog-add-activation-btn brlog-add-activation-btn--player"
              onClick={() => addActivation('player')}
            >
              + Your Activation
            </button>
            <button
              className="brlog-add-activation-btn brlog-add-activation-btn--opponent"
              onClick={() => addActivation('opponent')}
            >
              + Opponent Activation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BattleReportLog({ report, onChange, playerModels, opponentModels }: Props) {
  const formId = useId();

  const addTurn = () => {
    const newTurn: BattleTurn = {
      id: uid(),
      turnNumber: report.turns.length + 1,
      activations: [],
    };
    onChange({ ...report, turns: [...report.turns, newTurn] });
  };

  const updateTurn = (idx: number, updated: BattleTurn) => {
    const turns = report.turns.map((t, i) => i === idx ? updated : t);
    onChange({ ...report, turns });
  };

  const removeTurn = (idx: number) => {
    const turns = report.turns
      .filter((_, i) => i !== idx)
      .map((t, i) => ({ ...t, turnNumber: i + 1 }));
    onChange({ ...report, turns });
  };

  const handleExport = () => {
    const text = exportBattleReport(report);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = (report.missionName || 'battle-report')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    a.href = url;
    a.download = `${safeName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalActivations = report.turns.reduce((s, t) => s + t.activations.length, 0);
  const totalActions = report.turns.reduce(
    (s, t) => s + t.activations.reduce((sa, a) => sa + a.actions.length, 0), 0,
  );

  return (
    <div className="brlog-root">
      {/* Report header */}
      <div className="brlog-report-header">
        <div className="brlog-report-meta">
          <input
            id={`${formId}-mission`}
            type="text"
            className="brlog-input brlog-input--mission"
            placeholder="Mission / scenario name (optional)…"
            value={report.missionName ?? ''}
            onChange={e => onChange({ ...report, missionName: e.target.value || undefined })}
          />
          <input
            id={`${formId}-outcome`}
            type="text"
            className="brlog-input brlog-input--outcome"
            placeholder="Battle outcome, e.g. Victory — held 3 objectives…"
            value={report.outcome ?? ''}
            onChange={e => onChange({ ...report, outcome: e.target.value || undefined })}
          />
        </div>
        <div className="brlog-report-stats">
          <span className="brlog-report-stat">{report.turns.length} turn{report.turns.length !== 1 ? 's' : ''}</span>
          <span className="brlog-report-stat">{totalActivations} activation{totalActivations !== 1 ? 's' : ''}</span>
          <span className="brlog-report-stat">{totalActions} action{totalActions !== 1 ? 's' : ''}</span>
        </div>
        <button className="brlog-export-btn" onClick={handleExport} title="Download battle report as text file">
          ⬇ Export Report
        </button>
      </div>

      {/* Army name row */}
      <div className="brlog-army-names">
        <div className="brlog-army-name brlog-army-name--player">
          <label>Your Army</label>
          <input
            type="text"
            className="brlog-input"
            value={report.playerArmyName}
            onChange={e => onChange({ ...report, playerArmyName: e.target.value })}
          />
        </div>
        <div className="brlog-army-name brlog-army-name--vs">VS</div>
        <div className="brlog-army-name brlog-army-name--opponent">
          <label>Opponent Army</label>
          <input
            type="text"
            className="brlog-input"
            value={report.opponentArmyName}
            onChange={e => onChange({ ...report, opponentArmyName: e.target.value })}
          />
        </div>
      </div>

      {/* Turns */}
      <div className="brlog-turns">
        {report.turns.length === 0 && (
          <div className="brlog-empty">
            No turns yet. Click <strong>+ Add Turn</strong> to begin recording the battle.
          </div>
        )}
        {report.turns.map((turn, i) => (
          <TurnPanel
            key={turn.id}
            turn={turn}
            playerArmyName={report.playerArmyName}
            opponentArmyName={report.opponentArmyName}
            playerModels={playerModels}
            opponentModels={opponentModels}
            onUpdate={updated => updateTurn(i, updated)}
            onRemove={() => removeTurn(i)}
          />
        ))}
      </div>

      <button className="brlog-add-turn-btn" onClick={addTurn}>
        + Add Turn {report.turns.length + 1}
      </button>
    </div>
  );
}
