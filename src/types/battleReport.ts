/**
 * battleReport.ts
 *
 * Data model for the in-game Battle Report log.
 * A BattleReport records every Activation in every Turn so the game can be
 * replayed / exported as a readable after-action report.
 */

// ─── Attack sub-roll ─────────────────────────────────────────────────────────

export type AttackOutcome =
  | 'hit'          // normal success
  | 'critical'     // critical success (VICIOUS / CRITICAL keyword triggered)
  | 'miss'         // failed to hit
  | 'down'         // model knocked Down
  | 'out_of_action'; // model taken Out Of Action

export interface AttackRoll {
  /** Sequential number within this attack sequence (1, 2 …) */
  index: number;
  outcome: AttackOutcome;
  /** Injury dice result (blank = not rolled, e.g. miss) */
  injuryRoll?: number;
  /** Total injury modifier applied (negative = better armour) */
  injuryModifier?: number;
  /** Free-text note, e.g. "Model A armour −2" */
  note?: string;
  /** Markers placed on the target as a result */
  bloodMarkersAdded?: number;
  targetDown?: boolean;
  targetOOA?: boolean;
}

// ─── Action ──────────────────────────────────────────────────────────────────

export type ActionType =
  | 'dash'
  | 'ranged_attack'
  | 'melee_attack'
  | 'charge'
  | 'climb'
  | 'hide'
  | 'rally'
  | 'psychic'
  | 'other';

export interface BattleAction {
  id: string;
  /** 1-based index within this activation */
  index: number;
  type: ActionType;
  /** Short summary entered by the user, e.g. "Dash — moves 8", ends behind wall" */
  description: string;
  /** Whether the action required a roll and if it succeeded */
  rollResult?: 'success' | 'failure' | 'critical';
  /** Weapon name used (for attack actions) */
  weaponName?: string;
  /** Weapon profile keywords, e.g. '24", AUTOMATIC 2, ASSAULT' */
  weaponProfile?: string;
  /** Target model name */
  targetName?: string;
  /** Distance to target in inches (ranged) */
  targetDistance?: number;
  /** Individual attack rolls for multi-shot weapons */
  attackRolls?: AttackRoll[];
}

// ─── Activation ──────────────────────────────────────────────────────────────

/** Which army the activating model belongs to */
export type ArmySide = 'player' | 'opponent';

export interface BattleActivation {
  id: string;
  /** 1-based sequential number within the turn */
  index: number;
  armySide: ArmySide;
  /** Warband name for the label, e.g. "Thousand Sons" */
  armyName: string;
  /** Unit/model name, e.g. "Sekhetar Automaton" */
  modelName: string;
  /** Custom model name if set */
  customModelName?: string;
  /** Unit type for colouring */
  unitType?: 'elite' | 'troop';
  /** Ordered list of actions taken during this activation */
  actions: BattleAction[];
  /** Optional free-text note about this activation */
  note?: string;
}

// ─── Turn ────────────────────────────────────────────────────────────────────

export interface BattleTurn {
  id: string;
  /** 1-based turn number */
  turnNumber: number;
  activations: BattleActivation[];
  /** Optional note for the whole turn (e.g. "Priority: Thousand Sons") */
  note?: string;
}

// ─── Report ──────────────────────────────────────────────────────────────────

export interface BattleReport {
  id: string;
  /** ISO date string when the report was created */
  createdAt: string;
  /** Optional mission / scenario name */
  missionName?: string;
  playerArmyName: string;
  opponentArmyName: string;
  turns: BattleTurn[];
  /** Optional final outcome note, e.g. "Victory — held 3 objectives" */
  outcome?: string;
}
