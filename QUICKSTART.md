# Quick Start Guide - Trench Hammer Army Builder

## 🚀 Get Started in 2 Minutes

### Step 1: Open Terminal
Open PowerShell or CMD in the `WebApplication` folder.

### Step 2: Install & Run
```bash
npm install && npm run dev
```

The app will automatically open at **http://localhost:5173/**

### Step 3: Build Your Warband
1. **Select a Faction** (dropdown at top-left)
2. **Set Point Limit** (default: 500 pts)
3. **Click "Add Unit"** to add models to your roster
4. **Adjust Counts** with the number input
5. **Watch Points Update** in real-time
6. **Check Validation** (green = valid, red = errors)

---

## 📱 Features Ready to Use

✅ **Faction Selection**
- Adeptus Astartes
- Astra Militarum  
- Adeptus Custodes

✅ **Real-Time Calculations**
- Point totals
- Model counts
- Cost breakdown per unit

✅ **Validation**
- Points limit enforcement
- Force organization checking
- Keyword verification

✅ **Warband Management**
- Add/remove units
- Adjust unit sizes
- Name your warband
- Track summary stats

---

## 🛠️ Development Commands

```bash
# Start development server (with live reload)
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview

# Check for TypeScript errors
npx tsc --noEmit
```

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `src/components/ArmyBuilder.tsx` | Main UI component |
| `src/data/factions.ts` | Faction & unit data |
| `src/data/weapons.ts` | Weapon definitions |
| `src/data/equipment.ts` | Armor & gear |
| `src/data/validation.ts` | Rules validation |
| `src/types/index.ts` | TypeScript types |

---

## ❓ FAQ

**Q: How do I add more factions?**
A: Edit `src/data/factions.ts` and add new faction definitions.

**Q: Can I customize weapons?**
A: Equipment customization UI coming in Phase 2. Update `src/data/weapons.ts` to add new weapons.

**Q: How do I save my army?**
A: Automatic local storage support is ready in `src/utils/exportUtils.ts`.

**Q: Does it work offline?**
A: Yes! The app works entirely in your browser with no internet needed.

**Q: What about mobile?**
A: Mobile responsive design is built-in. Use on any device!

---

## 🔗 Useful Links

- **Trench Crusade Rules**: https://trenchcrusade.com/rules
- **Community Discord**: https://discord.gg/NY2Uttmukv
- **Game Data**: `.github/instructions/` folder

---

## 💪 Ready to Contribute?

Want to add features? Here are some quick wins:

1. **Add more factions** to the database
2. **Implement equipment selection** UI
3. **Add campaign tracking** for injuries
4. **Create faction ability cards**
5. **Build export to PDF**

All foundation code is ready - just follow the patterns!

---

**Happy building, General! ⚔️**

Start with `npm run dev` and begin creating warbands!
