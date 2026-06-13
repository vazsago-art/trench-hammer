## Changelog

### Codebase changes applied (v50) — 2026-05-24

#### Battle Report Feature (new)

New files created:
- `src/types/battleReport.ts` — Full data model:
  - `BattleReport` → `{ id, createdAt, missionName?, playerArmyName, opponentArmyName, turns, outcome? }`
  - `BattleTurn` → `{ id, turnNumber, activations, note? }`
  - `BattleActivation` → `{ id, index, armySide ('player'|'opponent'), armyName, modelName, customModelName?, unitType?, actions, note? }`
  - `BattleAction` → `{ id, index, type (ActionType), description, rollResult?, weaponName?, weaponProfile?, targetName?, targetDistance?, attackRolls? }`
  - `AttackRoll` → `{ index, outcome (hit|critical|miss|down|out_of_action), injuryRoll?, injuryModifier?, note?, bloodMarkersAdded?, targetDown?, targetOOA? }`
  - `ActionType` = `'dash' | 'ranged_attack' | 'melee_attack' | 'charge' | 'climb' | 'hide' | 'rally' | 'psychic' | 'other'`

- `src/components/BattleReportLog.tsx` — Full recorder UI:
  - Turn panels (collapsible, add/remove)
  - Activation panels per turn (player vs opponent, model quick-pick from loaded warbands)
  - Action editors (type selector, roll result, weapon/target fields for attacks)
  - Attack roll rows (outcome, injury roll, modifier, blood markers, note)
  - ⬇ Export Report button → downloads formatted `.txt`

- `src/components/BattleReportLog.css` — Styling with `.brlog-` prefix; purple accent theme

- `src/utils/battleReportExport.ts` — `exportBattleReport(report)` → formatted plain-text string

Modified files:
- `src/components/BattleMode.tsx`:
  - Added `useRef` import
  - Added `BattleReportLog` import + `BattleReport` type import
  - Added `createEmptyBattleReport(playerName, opponentName)` helper
  - New state: `showBattleReport`, `battleReport`, `battleReportRef`, `prevOpponentRef`
  - Syncs opponent army name into report when matchup is first loaded
  - New computed values: `playerModelNames`, `opponentModelNames` (for model quick-pick)
  - New header button: `📋 Battle Report` (purple, `.bm-report-btn`) toggles log panel
  - Battle Report panel rendered above the Matchup Loader panel when active

- `src/components/BattleMode.css`:
  - Added `.bm-report-btn` + `.bm-report-btn--active` styles (purple `#a84cc9` / `#c97ae8`)
  - Added `.bm-battle-report-panel` + `.bm-battle-report-panel-header` styles
  - Print media query: hides `.bm-report-btn` and `.bm-battle-report-panel`

- `public/sw.js`: `trench-hammer-v49` → `trench-hammer-v50`

---

### Context for next session

All v1.3.5 game rule changes are complete and deployed (see `trenchhammer_changelog20260509.instructions.md`).

Auto Build Intelligence (deployed v49, same session):
- `src/utils/quickBuild.ts` — `detectUnitRole`, `scoreWeapon`, `pickSecondaryWeapon`, `buildForFaction` all rewritten
- `src/components/QuickBuildWizard.tsx` — Role column + `.qbw-role-badge` chips
- `src/components/QuickBuildWizard.css` — 6 role colour classes

Faction Special Rules fix (deployed v49):
- `src/components/ArmyBuilder.tsx` + `MobileApp.tsx` — `<details open>` collapsible blocks
- `src/components/ArmyBuilder.css` + `MobileApp.css` — `flex-shrink: 0`, chevron `::before`

Current live version: **Trench Hammer 1.3.5 / v50**
