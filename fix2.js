const fs = require('fs');
const path = 'src/data/factions_complete.ts';
let code = fs.readFileSync(path, 'utf8');

// fix kakophonist
code = code.replace(
  /defaultWargear: \[\s*\{\s*id: 'power_armour', name: 'Power Armour',/g,
  (match, offset, str) => {
    // Only apply for specific units based on nearby text.
    // Actually we can just do specific regexes for each unit.
    return match;
  }
);

// Actually, simpler to just replace using specific context.
code = code.replace(
  /description: "Emperor's Children only[^\n]*\n\s*defaultWargear: \[\s*\{\s*id: 'power_armour'/g,
  `description: "Emperor's Children only. (65cr + 40cr Power Armour + Mark of Slaanesh; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_slaanesh_kak', name: 'Mark of Slaanesh', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['SLAANESH'], description: '+2" Movement. Included in base cost.', statModifiers: { movement: 2 } },
    { id: 'power_armour'`
);

code = code.replace(
  /description: "Thousand Sons only[^\n]*\n\s*defaultWargear: \[\s*\{\s*id: 'power_armour'/g,
  `description: "Thousand Sons only. (65cr + 40cr Power Armour + Mark of Tzeentch; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_tzeentch_es', name: 'Mark of Tzeentch', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['TZEENTCH'], description: '+1 Ranged Skill. Included in base cost.', statModifiers: { rangedSkill: 1 } },
    { id: 'power_armour'`
);

code = code.replace(
  /description: "Word Bearers only[^\n]*\n\s*defaultWargear: \[\s*\{\s*id: 'power_armour'/g,
  `description: "Word Bearers only. (65cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_khorne_moe', name: 'Mark of Khorne', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['KHORNE'], description: '+1 Melee Skill. Included in base cost.', statModifiers: { meleeSkill: 1 } },
    { id: 'power_armour'`
);

code = code.replace(
  /description: "World Eaters only[^\n]*\n\s*defaultWargear: \[\s*\{\s*id: 'power_armour'/g,
  `description: "World Eaters only. (65cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_khorne_sb', name: 'Mark of Khorne', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['KHORNE'], description: '+1 Melee Skill. Included in base cost.', statModifiers: { meleeSkill: 1 } },
    { id: 'power_armour'`
);

fs.writeFileSync(path, code);
console.log("Done regex replace");
