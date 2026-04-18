const fs = require('fs');

const path = 'src/data/factions_complete.ts';
let code = fs.readFileSync(path, 'utf8');

// fix kakophonist
code = code.replace(
  `Emperor's Children only. (65cr + 40cr Power Armour + Mark of Slaanesh; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],`,
  `Emperor's Children only. (65cr + 40cr Power Armour + Mark of Slaanesh; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_slaanesh_kak', name: 'Mark of Slaanesh', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['SLAANESH'], description: '+2" Movement. Included in base cost.', statModifiers: { movement: 2 } },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],`
);

// fix exalted sorcerer
code = code.replace(
  `Thousand Sons only. (65cr + 40cr Power Armour + Mark of Tzeentch; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],`,
  `Thousand Sons only. (65cr + 40cr Power Armour + Mark of Tzeentch; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_tzeentch_es', name: 'Mark of Tzeentch', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['TZEENTCH'], description: '+1 Ranged Skill. Included in base cost.', statModifiers: { rangedSkill: 1 } },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],`
);

// fix master of executions
code = code.replace(
  `Word Bearers only. (65cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],`,
  `Word Bearers only. (65cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_khorne_moe', name: 'Mark of Khorne', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['KHORNE'], description: '+1 Melee Skill. Included in base cost.', statModifiers: { meleeSkill: 1 } },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],`
);

// fix slaughterbound
code = code.replace(
  `World Eaters only. (65cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],`,
  `World Eaters only. (65cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_khorne_sb', name: 'Mark of Khorne', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['KHORNE'], description: '+1 Melee Skill. Included in base cost.', statModifiers: { meleeSkill: 1 } },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },
  ], availableWargear: [],`
);

fs.writeFileSync(path, code);
console.log("Done");
