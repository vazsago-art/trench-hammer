const fs = require('fs');
const path = 'src/data/factions_complete.ts';
let code = fs.readFileSync(path, 'utf8');

// Normalize newlines in code
code = code.replace(/\r\n/g, '\n');

const kakophonistText = `  description: "Emperor's Children only. (65cr + 40cr Power Armour + Mark of Slaanesh; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },`;

const kakophonistNew = `  description: "Emperor's Children only. (65cr + 40cr Power Armour + Mark of Slaanesh; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_slaanesh_kak', name: 'Mark of Slaanesh', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['SLAANESH'], description: '+2" Movement. Included in base cost.', statModifiers: { movement: 2 } },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },`;

code = code.replace(kakophonistText, kakophonistNew);

const exaltedSorcererText = `  description: "Thousand Sons only. (80cr + 40cr Power Armour + Mark of Tzeentch; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },`;

const exaltedSorcererNew = `  description: "Thousand Sons only. (80cr + 40cr Power Armour + Mark of Tzeentch; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_tzeentch_es', name: 'Mark of Tzeentch', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['TZEENTCH'], description: '+1 Ranged Skill. Included in base cost.', statModifiers: { rangedSkill: 1 } },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },`;
      
code = code.replace(exaltedSorcererText, exaltedSorcererNew);

const moeText = `  description: "Word Bearers only. (65cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },`;
      
const moeNew = `  description: "Word Bearers only. (65cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_khorne_moe', name: 'Mark of Khorne', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['KHORNE'], description: '+1 Melee Skill. Included in base cost.', statModifiers: { meleeSkill: 1 } },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },`;

code = code.replace(moeText, moeNew);

const sbText = `  description: "World Eaters only. (65cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },`;

const sbNew = `  description: "World Eaters only. (65cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)",
  defaultWargear: [
    { id: 'ha_mark_khorne_sb', name: 'Mark of Khorne', type: 'equipment', slot: 'equipment', cost: 0,
      keywords: ['KHORNE'], description: '+1 Melee Skill. Included in base cost.', statModifiers: { meleeSkill: 1 } },
    { id: 'power_armour', name: 'Power Armour', type: 'armor', slot: 'body-armour', cost: 0,
      keywords: ['-2 INJURY MODIFIER'], description: 'Included in cost. Can be swapped to Terminator Armour (+25cr).',
      statModifiers: { armourSave: -2 } },`;

code = code.replace(sbText, sbNew);

fs.writeFileSync(path, code);
console.log("Done");