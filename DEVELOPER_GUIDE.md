# 🛠️ Trench Hammer Army Builder - Developer Guide

## Overview

This guide covers everything you need to know to use, maintain, and expand the Trench Hammer Army Builder application.

---

## 📖 Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Adding Content](#adding-content)
5. [Building Features](#building-features)
6. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites
- Node.js 18+ (included in setup)
- npm 9+ (included with Node.js)
- VS Code or any text editor

### Installation
```bash
cd D:\Development\TrenchHammer\WebApplication
npm install
```

### Running Development Server
```bash
npm run dev
```
Opens automatically at http://localhost:5173

### Building for Production
```bash
npm run build
npm run preview
```

---

## Project Structure

### Core Directories

```
src/
├── components/        # React UI components
├── data/             # Game data (factions, weapons, equipment)
├── types/            # TypeScript type definitions
└── utils/            # Utility functions (export, storage)
```

### Key Files

#### **UI Components** (`src/components/`)
```typescript
ArmyBuilder.tsx       # Main interface component (400+ lines)
├─ Sidebar controls    • Faction selector
                      • Point limit input
                      • Warband naming
                      • Validation status
└─ Main content       • Available units grid
                      • Selected units list

ArmyBuilder.css       # Complete styling (400+ lines)
├─ Color scheme       # Dark theme optimized for gaming
├─ Layout             # Flex-based responsive design
├─ Components         # Cards, inputs, buttons, lists
└─ Animations         # Smooth transitions and effects
```

#### **Game Data** (`src/data/`)
```typescript
weapons.ts            # Weapon definitions (29+ items)
├─ Basic ranged       weapons = [autogun, boltgun, ...]
├─ Pistols            weapons = [bolt_pistol, ...]
├─ Special ranged     weapons = [bolt_rifle, flamer, ...]
├─ Heavy weapons      weapons = [heavy_bolter, ...]
├─ Melee weapons      weapons = [blade, power_weapon, ...]
└─ Thrown weapons     weapons = [frag_grenades, ...]

equipment.ts          # Armor and gear (18+ items)
├─ Armor options      armour = [standard, heavy, power, ...]
└─ Equipment          equipment = [jump_pack, medicae_kit, ...]

factions.ts           # Factions and units (3 sample factions)
├─ Adeptus Astartes   units = [space_marine, ...]
├─ Astra Militarum    units = [guardsman, ...]
└─ Adeptus Custodes   units = [custodian_guard, ...]

validation.ts         # Rules validation logic
├─ Points checking
├─ Force organization
├─ Keyword synergy
└─ Wargear conflicts
```

#### **Type Definitions** (`src/types/`)
```typescript
index.ts              # Complete game type system
├─ Weapon            interface defines ranged/melee weapons
├─ WargearOption     interface for equipment
├─ UnitOption        interface for available units
├─ Warband           interface for army list
├─ WarbandUnit       interface for selected units
├─ Faction           interface for factions
├─ ModelStats        interface for unit statistics
└─ ValidationResult  interface for rule checking
```

#### **Utilities** (`src/utils/`)
```typescript
exportUtils.ts        # Export and storage functions
├─ exportWarbandAsJSON()     convert to JSON
├─ exportWarbandAsText()     pretty print format
├─ downloadFile()            trigger browser download
├─ saveWarbandLocal()        IndexedDB storage
├─ getAllWarbands()          retrieve stored lists
└─ deleteWarbandLocal()      remove from storage
```

---

## Core Components

### ArmyBuilder Component

The main UI component handling all user interaction.

#### State Management
```typescript
const [selectedFaction, setSelectedFaction] = useState<string>();
const [pointLimit, setPointLimit] = useState<number>(500);
const [warband, setWarband] = useState<Warband>({
  id: string;
  name: string;
  faction: string;
  pointLimit: number;
  units: WarbandUnit[];
  totalPoints: number;
  totalModels: number;
});
```

#### Key Functions
```typescript
handleFactionChange()        // Update selected faction
handlePointLimitChange()     // Set points limit
handleAddUnit()              // Add unit to roster
handleRemoveUnit()           // Remove unit from roster
handleChangeUnitCount()      // Adjust model count
```

#### Render Flow
1. **Header** - Title and description
2. **Sidebar** - Controls and summary
3. **Main Content** - Units grid and roster
4. **Real-time Updates** - Points and validation

---

## Adding Content

### How to Add a New Weapon

Edit `src/data/weapons.ts`:

```typescript
const newWeapon: Weapon = {
  id: 'unique_id',
  name: 'Weapon Name',
  type: 'ranged' | 'melee' | 'thrown' | 'heavy',
  range: 24,  // in inches
  cost: 5,    // in credits
  keywords: ['KEYWORD1', 'KEYWORD2'],
  description: 'What this weapon does'
};

// Add to appropriate array
sharedBasicRangedWeapons.push(newWeapon);
```

### How to Add New Equipment

Edit `src/data/equipment.ts`:

```typescript
const newEquipment: WargearOption = {
  id: 'unique_id',
  name: 'Equipment Name',
  type: 'armor' | 'equipment',
  cost: 3,
  keywords: ['KEYWORD'],
  description: 'Effect'
};

armourOptions.push(newEquipment);  // or equipmentOptions
```

### How to Add a New Faction

Edit `src/data/factions.ts`:

```typescript
// 1. Create a unit
const newUnit: UnitOption = {
  id: 'unit_id',
  name: 'Unit Name',
  baseCost: 10,
  minCount: 1,
  maxCount: 10,
  stats: {
    movement: 6,
    meleeSkill: 2,
    rangedSkill: 2,
    armourSave: -1
  },
  keywords: ['FACTION_KEYWORD', 'UNIT_TYPE'],
  faction: 'faction_id',
  defaultWargear: [weapon1, weapon2],
  availableWargear: [weapon3, equipment1]
};

// 2. Create faction
const newFaction: Faction = {
  id: 'faction_id',
  name: 'Faction Name',
  keywords: ['FACTION_KEYWORD'],
  color: '#HEXCOLOR',
  description: 'Faction description',
  units: [newUnit]
};

// 3. Add to array
allFactions.push(newFaction);
```

---

## Building Features

### Feature: Equipment Selection UI

To implement wargear selection for units:

1. **Create Component** - `src/components/WargearSelector.tsx`
```typescript
interface Props {
  unit: WarbandUnit;
  availableWargear: (Weapon | WargearOption)[];
  onSelect: (wargear: SelectedWargear[]) => void;
}

export function WargearSelector({ unit, availableWargear, onSelect }: Props) {
  // Render checkboxes/dropdowns for each wargear option
  // Calculate costs
  // Enforce limits
}
```

2. **Add to UI** - Update `ArmyBuilder.tsx`
```typescript
<WarbandUnit.selectedWargear.map((wargear) => (
  <div key={wargear.id} className="wargear-item">{wargear.name}</div>
))}
```

3. **Update Validation** - Add to `validation.ts`
```typescript
export function validateWargear(unit: WarbandUnit): ValidationError[] {
  // Check limits, conflicts, etc.
}
```

### Feature: Campaign Tracking

1. **Extend Type System** - Update `src/types/index.ts`
```typescript
export interface CampaignProgress {
  battleCount: number;
  gloryPoints: number;
  injuries: Injury[];
  advancedSkills: string[];
}
```

2. **Create Campaign Component** - `src/components/CampaignTracker.tsx`

3. **Add Storage** - Extend `exportUtils.ts`
```typescript
export function saveCampaignLocal(campaign: CampaignProgress) {
  localStorage.setItem('campaign', JSON.stringify(campaign));
}
```

---

## Troubleshooting

### Dev Server Won't Start
```bash
# Check Node.js
node --version

# Clear node_modules
del /s node_modules
npm install

# Try different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Check TypeScript
npx tsc --noEmit

# Clear dist folder
del /s dist
npm run build
```

### Hot Module Reload Not Working
- Check file saved properly
- Browser cache may need clearing (Ctrl+Shift+R)
- Try closing and reopening dev server

### Missing Faction/Unit
1. Check `src/data/factions.ts` has export
2. Check `allFactions` array includes it
3. Run `npm run build` to verify no TS errors

---

## Performance Tips

### Bundle Size
Current: 202KB JS (63KB gzipped)
- React is ~40KB of this
- Split code has minimal impact due to SPA nature

### Optimization Ideas
1. Lazy load faction data
2. Implement virtual scrolling for large lists
3. Cache expensive calculations
4. Use useMemo for validation

### Testing Performance
```bash
# Build and analyze
npm run build
# Check dist/ file sizes
```

---

## Common Tasks

### Add a New Faction (Step by Step)
1. Create weapon definitions in `weapons.ts` (if custom)
2. Create equipment in `equipment.ts` (if custom)
3. Create unit definitions
4. Create faction object
5. Export from `factions.ts`
6. Test with dev server

### Export to PDF (Coming Soon)
1. Install `pdfkit` or `jsPDF`
2. Create `src/utils/pdfExport.ts`
3. Add button to UI
4. Test download functionality

### Save Multiple Armies (Ready to Use)
Uses existing code in `exportUtils.ts`:
```typescript
// Save
saveWarbandLocal(warband);

// Load all
const armies = getAllWarbands();

// Load specific
const army = loadWarbandLocal('warband-001');

// Delete
deleteWarbandLocal('warband-001');
```

---

## Code Style

### TypeScript Standards
- Strict mode enabled (`"strict": true` in tsconfig.json)
- All types explicitly defined
- No `any` types allowed
- Interfaces for contracts

### Component Standards
- Functional components with hooks
- Props interfaces defined
- CSS module patterns
- Clear prop drilling or context for complex state

### Naming Conventions
- Components: `PascalCase` (`ArmyBuilder.tsx`)
- Functions: `camelCase` (`handleFactionChange`)
- Constants: `UPPER_SNAKE_CASE` (in validation rules)
- Files: `kebab-case` or component name

---

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Trench Crusade Rules](https://trenchcrusade.com/rules)
- [Community Discord](https://discord.gg/NY2Uttmukv)

---

## Support & Contribution

Found a bug? Have a suggestion?
- Create an issue in GitHub
- Post in Discord community
- Submit a pull request with improvements

**Remember**: This is a community tool for fans. All contributions should respect the original game designers and Publishers' intellectual property.

---

**Last Updated**: February 20, 2026
**Status**: Active Development Ready
