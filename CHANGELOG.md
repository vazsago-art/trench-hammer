# Changelog

All notable changes to the Trench Hammer Army Builder application are documented here.

---

## [1.4.2] - 2026-05-30

### Fixed
- **Foetid Blight-Drone weapon mutual exclusion**: The Drone's three integrated weapon options (Fleshmower, Twin Plague Spewers, Twin Blight Launchers) can now only be equipped one at a time — adding any one of them blocks the other two, matching the "choose one" rule from the Death Guard roster. Added `conflictsWith` support to the `Weapon` type and extended `validateAddWargear` / `validateLoadout` in `wargearSlotValidation.ts` to enforce weapon-level conflicts.

---

## [1.4.1] - 2026-05-27

### Fixed
- **Astartes Bike NaN cost bug (mobile)**: Equipping an Astartes Bike on any unit in the mobile layout (`MobileApp.tsx`) caused the unit's price to display "NaN Cr." and contribute 0 to the warband total. Root cause: the auto-added Twin Boltgun bonus weapon was pushed into `selectedWargear` without a `quantity` field, causing `w.cost * w.quantity = 0 * undefined = NaN` in `recalcUnitCosts`. Fixed by building the full `SelectedWargear` object (with `quantity: 1`, `type`, `costCurrency`, `grantsKeywords`) to match the desktop implementation in `ArmyBuilder.tsx`.

---

## [1.0.5] - 2026-03-02

### Added

#### Faction Weapon Databases
Added dedicated weapon arrays for 8 factions that previously had no purchasable weapons in the wargear panel. Each faction now has a full set of faction-specific weapons available in the Army Builder.

| Faction | New Weapons |
|---|---|
| Drukhari | 36 |
| Aeldari | 46 |
| Harlequins | 19 |
| Tyranids | 36 |
| T'au Empire | 48 |
| Slanni | 32 |
| Orks | 44 |
| Chaos Daemons | 14 |
| **Total** | **275** |

Weapon categories covered per faction include: basic ranged, special ranged, heavy ranged, pistols, melee, and thrown weapons as appropriate to each faction's identity.

#### Wargear Pool Integration
- Added 8 `_WEAPON_IDS` arrays in `faction_wargear.ts` mapping each faction's weapons to its purchasable wargear pool.
- Updated `FACTION_WARGEAR` entries for all 8 factions with correct base pool + faction-specific wargear + faction weapon IDs.
- Updated `factionSpecificWeaponIds` Set in `weapons.ts` with all 275 new weapon IDs.
- Updated `allWeapons` export to include all 8 new weapon arrays.

### Fixed

- **Harlequins wargear pool** was missing four shared Aeldari-family ranged weapon IDs (`shuriken_catapult`, `shuriken_rifle`, `shuriken_pistol`, `twin_shuriken_pistols`). These weapons are defined in the Aeldari weapon array and are also valid Harlequins weapons; they have been explicitly added to `HARLEQUINS_WEAPON_IDS`.

---

## [1.0.4] - 2025-02-28

### Added
- Wargear panel with per-model equipment and weapon purchasing
- Unit info modal with full stat block, keywords, and description display
- Wargear info modal with weapon/equipment detail view
- Unit sub-type selection modal (e.g. T'au Drone variants)
- Saved armies modal for local storage management
- PDF export via jsPDF
- Mobile layout (`MobileApp.tsx`) with Capacitor Android build support
- Wargear slot validation engine (`wargearSlotValidation.ts`)
- Keyword glossary data (`keywordGlossary.ts`)
- Unit abilities data (`unit_abilities.ts`)
- Faction-specific wargear data (`faction_wargear.ts`)
- Fixed-kit units database (`fixed_kit_units.ts`) for units with non-standard weapon configurations
- Complete unit definitions for all 33 factions in `factions_complete.ts`

### Changed
- Migrated from `factions.ts` to `factions_complete.ts` with full unit stat blocks for all factions
- Expanded `weapons.ts` with faction-specific weapon arrays for Necrons, Leagues of Votann, Adeptus Mechanicus, Adeptus Custodes, Vermintide, Inquisition, Adeptus Ministorum, Officio Assassinorum, and Chaos Cults

---

## [1.0.3] - 2025-02-24

### Added
- Export utilities for JSON and plain text army list formats (`exportUtils.ts`, `export.ts`)
- Local storage integration for saving and loading armies
- Validation engine (`validation.ts`) with points limit, force organisation, and keyword synergy checks

---

## [1.0.2] - 2025-02-22

### Added
- `UnitInfoModal` component for detailed unit stat viewing
- `WargearPanel` component for in-builder equipment management
- Dark theme CSS overhaul across all components
- `useMobile` hook for responsive layout detection

---

## [1.0.1] - 2025-02-21

### Added
- All 33 playable factions across Imperial, Chaos, Xenos, and Outlaw groups
- 28 stat templates covering all faction archetypes
- Faction color schemes and lore descriptions
- Shared weapon databases: basic ranged, special ranged, heavy ranged, melee, thrown, pistols
- Shared equipment database: armour, shields, field gear

---

## [1.0.0] - 2025-02-20

### Added
- Initial release of the Trench Hammer Army Builder
- React 19 + TypeScript + Vite project scaffold
- `ArmyBuilder` component with faction selector, unit roster, and real-time point calculation
- 3 initial factions: Adeptus Astartes, Astra Militarum, Adeptus Custodes
- 29 weapon definitions, 18 equipment pieces
- PWA manifest and service worker
- Capacitor configuration for Android build target
