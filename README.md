# Trench Hammer - Army Builder

A web application for building, validating, and managing warbands for the **Trench Hammer** wargame—a fan-made fusion of Trench Crusade mechanics with the Warhammer 40,000 universe.

## About Trench Hammer

**Trench Hammer** combines:
- **Core Rules**: Trench Crusade skirmish mechanics
- **Universe & Models**: Warhammer 40,000 factions and lore
- **Gameplay**: Fast-paced narrative-driven wargaming

This tool helps you:
- ✅ Build legal warbands by faction
- ✅ Calculate points automatically
- ✅ Validate force organization
- ✅ Manage equipment and weapons
- ✅ Save and export your armies

## Features (In Development)

- **Army Builder**: Add units and customize equipment
- **Point Calculator**: Real-time cost tracking
- **Validation Engine**: Check force organization and keyword synergy
- **Faction Support**: Imperial, Chaos, Xenos, and more (25+)
- **Export/Save**: Store your armies locally
- **Offline Support**: Works without internet

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3
- **Type System**: Full TypeScript support

## Getting Started

### Prerequisites
- Node.js 18+ (automatically added to PATH)
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start dev server (opens in browser)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The project structure:
```
src/
├── components/       # React components (WIP)
├── data/            # Game data (weapons, units, factions)
├── types/           # TypeScript type definitions
│   └── index.ts     # Core game types
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Game Data

Currently loaded:
- **3 sample factions**: Adeptus Astartes, Astra Militarum, Adeptus Custodes
- **Weapons**: Basic ranged, special, heavy, melee, thrown
- **Equipment**: Armor, shields, field gear
- **Validation**: Points limits, force organization, keyword synergy

## Next Steps

1. **Phase 1**: Complete faction and unit database
2. **Phase 2**: Build Army Builder UI with drag-and-drop
3. **Phase 3**: Add skill tree and campaign tracking
4. **Phase 4**: Export to PDF and tournament formats

## Contributing

This is a fan project for the Trench Hammer community. All game data is based on community rules documents.

## License

MIT License - See [LICENSE](LICENSE) file

## Repository

All game rules and data are stored in `.github/instructions/` for reference and validation.

---

**Join us on Discord**: https://discord.gg/NY2Uttmukv (Trench Crusade Community)
