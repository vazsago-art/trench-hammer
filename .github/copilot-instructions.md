## Trench Hammer Army Builder — Project Context

### Overview
A fan-made web app for building and managing army lists for **Trench Hammer**, a skirmish wargame
combining Trench Crusade core mechanics with Warhammer 40K lore/factions. Built by "Goober" (Chris Ramsley).

### Tech Stack
- **Framework**: React 18 + TypeScript + Vite (PWA)
- **Root**: `d:\Development\TrenchHammer\WebApplication`
- **Build**: `npm run build` → `tsc && vite build`
- **Dev server**: `npm run dev` → http://localhost:5173 (HMR enabled)
- **Deploy**: `npm run deploy` → `gh-pages -d dist` (pushes `dist/` to `gh-pages` branch only)
- **⚠ DEPLOY RULE**: NEVER run `git push` / `git commit` on source code. The git repo is used ONLY for GitHub Pages deployment via `npm run deploy`.

### Current Version
- **App version**: Trench Hammer **1.4.0** / date: **June 7, 2026**
- **Service worker cache**: `trench-hammer-v53` (in `public/sw.js`)
- **Version string locations**: `src/components/ArmyBuilder.tsx` and `src/components/mobile/MobileApp.tsx`

### Key File Locations
| Path | Purpose |
|------|---------|
| `src/App.tsx` | Root component, routes between ArmyBuilder/BattleMode |
| `src/components/ArmyBuilder.tsx` | Main desktop army builder UI |
| `src/components/mobile/MobileApp.tsx` | Mobile layout (≤900px breakpoint) |
| `src/components/BattleMode.tsx` | Full-screen battle view with opponent matchup + Battle Report |
| `src/components/BattleReportLog.tsx` | Battle Report recorder component |
| `src/components/QuickBuildWizard.tsx` | AI auto-build wizard with role badges |
| `src/types/index.ts` | Core type definitions (Warband, UnitOption, WarbandUnit, etc.) |
| `src/types/battleReport.ts` | Battle Report data model types |
| `src/data/factions_complete.ts` | All faction + unit definitions |
| `src/data/weapons.ts` | Shared weapon database |
| `src/data/equipment.ts` | Shared equipment/battlekit database |
| `src/data/mercenaries.ts` | Mercenary unit definitions |
| `src/data/keywordGlossary.ts` | Keyword definitions and descriptions |
| `src/data/campaignProgression.ts` | XP, skills, scars, traumas |
| `src/data/campaignMissions.ts` | Campaign mission definitions |
| `src/data/faction_wargear.ts` | Faction-specific wargear lists |
| `src/utils/quickBuild.ts` | Auto-build logic with battlefield role detection |
| `src/utils/battleReportExport.ts` | Exports BattleReport to formatted .txt |
| `src/utils/export.ts` | Warband save/load, JSON/text export |
| `src/utils/shareUrl.ts` | Share link encode/decode |
| `public/sw.js` | Service worker (bump version string on every deploy) |

### Mobile vs Desktop
- `window.innerWidth ≤ 900px` → renders `MobileApp.tsx` + `MobileApp.css`
- `> 900px` → renders `ArmyBuilder.tsx` + `ArmyBuilder.css`
- Both components must be kept in sync for any UI feature added

### App Version String Convention
When bumping the version, update ALL of these:
1. `src/components/ArmyBuilder.tsx` — version string in JSX
2. `src/components/mobile/MobileApp.tsx` — version string + date in JSX
3. `public/sw.js` — `const CACHE_NAME = 'trench-hammer-vNN'` (increment NN)

### Implemented Features (as of v50)
- [x] Faction selection (25+ factions, 100+ subfactions)
- [x] Unit selection + wargear assignment with point tracking
- [x] Real-time point/model count validation
- [x] Campaign mode: XP, skills, battle scars, traumas, Elite Progression
- [x] Battle Mode: full-screen read-only combat roster with stat cards
- [x] Matchup system: load opponent's army (paste share link or pick from library)
- [x] **Battle Report Log**: turn-by-turn recorder integrated in Battle Mode
  - Per-turn activations (player/opponent), with army + model quick-pick
  - Per-activation actions: dash, ranged attack, melee, charge, psychic, etc.
  - Attack rolls per shot: outcome, injury roll, modifiers, blood markers
  - ⬇ Export to formatted `.txt` file
- [x] Quick Build Wizard: auto-generates a warband with battlefield role detection
  - Roles: brawler, gunner, skirmisher, sniper, support, specialist
  - Role-aware weapon scoring + secondary weapon selection
  - Composition gap-filling + role badges in UI
- [x] Psychic Powers panel
- [x] Mutations / Gifts of Chaos panel
- [x] Mercenaries panel
- [x] Patron abilities panel
- [x] Upgrades panel
- [x] Wargear info modals
- [x] Rules Reference quick panel
- [x] Faction/Warband rules side panels (collapsible)
- [x] Save/load warbands (localStorage)
- [x] Export: JSON, Markdown text, share URL
- [x] PWA (offline-first service worker)
- [x] Print / Save as PDF

### Battle Report Data Model (`src/types/battleReport.ts`)
```
BattleReport → turns: BattleTurn[]
BattleTurn → turnNumber, activations: BattleActivation[]
BattleActivation → armySide ('player'|'opponent'), modelName, actions: BattleAction[]
BattleAction → type (ActionType), description, weaponName?, attackRolls?: AttackRoll[]
AttackRoll → outcome (hit|critical|miss|down|out_of_action), injuryRoll?, injuryModifier?, bloodMarkersAdded?
```

### Quick Build Role System (`src/utils/quickBuild.ts`)
- `detectUnitRole(unit, extraKws)` → `BattlefieldRole`
- Roles: `brawler | gunner | skirmisher | sniper | support | specialist`
- `scoreWeapon(w, style, unitRole, unitStats)` — role-aware scoring
- `pickSecondaryWeapon(...)` — adds pistol sidearm (brawler) or melee backup (gunner)
- `buildForFaction(...)` — tiered budgets, live role tracking, composition gap-filling
- Exports: `ROLE_LABELS`, `ROLE_ICONS`, `ROLE_TIPS`

### Coding Conventions
- All data lookups via helper functions (e.g. `getFactionById`, `lookupWeapon`, `lookupWargear`)
- Unit resolution: `buildResolvedUnit(unitDef, warbandUnit)` — computes effective stats from base + wargear + upgrades + gifts
- Opponent unit resolution: `resolveOpponentUnit(unitDef, wu)` in BattleMode (mirrors above without closure)
- CSS uses BEM-style prefixes per component (`.bm-` for BattleMode, `.brlog-` for BattleReportLog, `.qbw-` for QuickBuildWizard)
- `__APP_VERSION__` injected from `package.json` via `vite.config.ts`

### Game Rules Summary
- Skirmish wargame, 300–700 credit warbands
- Stats: Movement ("), Ranged Skill (+/-), Melee Skill (+/-), Armour Save (negative = better)
- Blood Markers, Down state, Out of Action, Injury Dice rolls
- Keywords: ASSAULT, HEAVY, PISTOL, AUTOMATIC N, BLAST N", ARMOUR PIERCING N, VICIOUS, IGNORE COVER, LEADER, ICON, PSYKER, SYNAPSE, FLYING, VEHICLE, etc.
- Elites: promoted in campaign; gain XP → skills table rolls
- Campaign: Exploration, post-battle injuries (scars), Trauma table

