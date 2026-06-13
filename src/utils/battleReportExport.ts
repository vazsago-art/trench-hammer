/**
 * battleReportExport.ts
 *
 * Converts a BattleReport into a human-readable plain-text string
 * suitable for saving as a .txt file or copying to a forum post.
 */

import type { BattleReport, BattleActivation, BattleAction, AttackRoll } from '../types/battleReport.js';

function line(ch = '─', n = 60): string {
  return ch.repeat(n);
}

function formatRoll(roll: AttackRoll): string {
  const outcome = roll.outcome.replace(/_/g, ' ').toUpperCase();
  const parts: string[] = [`  Shot ${roll.index}: ${outcome}`];
  if (roll.injuryRoll !== undefined) {
    parts.push(`Injury Roll: ${roll.injuryRoll}`);
  }
  if (roll.injuryModifier !== undefined && roll.injuryModifier !== 0) {
    const modStr = roll.injuryModifier < 0
      ? `Injury Modifier: ${roll.injuryModifier}`
      : `Injury Modifier: +${roll.injuryModifier}`;
    parts.push(modStr);
  }
  if (roll.bloodMarkersAdded) {
    const extras: string[] = [];
    for (let i = 0; i < roll.bloodMarkersAdded; i++) extras.push('BLOOD MARKER');
    if (roll.targetDown)    extras.push('DOWN');
    if (roll.targetOOA)     extras.push('OUT OF ACTION');
    if (extras.length) parts.push(`→ ${extras.join(' & ')}`);
  }
  if (roll.note) parts.push(`(${roll.note})`);
  return parts.join(' — ');
}

function formatAction(action: BattleAction, indent = '  '): string {
  const lines: string[] = [];
  const typeLabel = action.type.replace(/_/g, ' ').toUpperCase();
  let header = `${indent}Action ${action.index} [${typeLabel}]`;
  if (action.rollResult) header += ` — ${action.rollResult.toUpperCase()}`;
  lines.push(header);

  if (action.weaponName) {
    let weaponLine = `${indent}  Weapon: ${action.weaponName}`;
    if (action.weaponProfile) weaponLine += ` (${action.weaponProfile})`;
    lines.push(weaponLine);
  }

  if (action.targetName) {
    let targetLine = `${indent}  Target: ${action.targetName}`;
    if (action.targetDistance !== undefined) targetLine += ` at ${action.targetDistance}"`;
    lines.push(targetLine);
  }

  if (action.description?.trim()) {
    lines.push(`${indent}  ${action.description.trim()}`);
  }

  if (action.attackRolls?.length) {
    for (const roll of action.attackRolls) {
      lines.push(indent + formatRoll(roll));
    }
  }

  return lines.join('\n');
}

function formatActivation(act: BattleActivation, indent = ''): string {
  const lines: string[] = [];
  const side = act.armySide === 'player' ? '⚔ Your Army' : '🛡 Opponent';
  const model = act.customModelName || act.modelName || 'Unknown Model';
  lines.push(`${indent}Activation ${act.index} — ${side} — ${act.armyName} — ${model}`);
  if (act.note) lines.push(`${indent}  Note: ${act.note}`);
  for (const action of act.actions) {
    lines.push(formatAction(action, indent + '  '));
  }
  return lines.join('\n');
}

export function exportBattleReport(report: BattleReport): string {
  const sections: string[] = [];

  sections.push(line('═'));
  sections.push('  BATTLE REPORT — TRENCH HAMMER');
  sections.push(line('═'));
  sections.push('');

  const date = new Date(report.createdAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  sections.push(`  Date:     ${date}`);
  if (report.missionName) sections.push(`  Mission:  ${report.missionName}`);
  sections.push(`  Armies:   ${report.playerArmyName}  vs  ${report.opponentArmyName}`);
  if (report.outcome) sections.push(`  Outcome:  ${report.outcome}`);
  sections.push('');

  for (const turn of report.turns) {
    sections.push(line('─'));
    let turnHeader = `TURN ${turn.turnNumber}`;
    if (turn.note) turnHeader += `  —  ${turn.note}`;
    sections.push(turnHeader);
    sections.push(line('─'));

    if (turn.activations.length === 0) {
      sections.push('  (no activations recorded)');
    } else {
      for (const act of turn.activations) {
        sections.push('');
        sections.push(formatActivation(act));
      }
    }
    sections.push('');
  }

  sections.push(line('═'));
  if (report.outcome) {
    sections.push(`  RESULT: ${report.outcome}`);
    sections.push(line('═'));
  }

  return sections.join('\n');
}
