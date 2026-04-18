const fs = require('fs');
const path = 'src/data/factions_complete.ts';
let lines = fs.readFileSync(path, 'utf8').split('\n');

function replaceWargear(unitId, markId, markName, markKeywords, markDesc, statMod) {
  const start = lines.findIndex(l => l.includes(\`id: '\${unitId}'\`));
  if (start === -1) {
    console.log("NOT FOUND: ", unitId);
    return;
  }
  
  // Find defaultWargear
  let wgLine = -1;
  for (let i = start; i < start + 20; i++) {
    if (lines[i].includes('defaultWargear: [')) {
      wgLine = i;
      break;
    }
  }
  
  if (wgLine !== -1) {
    const r = lines[wgLine].endsWith('\\r') ? '\\r' : '';
    // insert right after wgLine
    const newLine1 = \`    { id: '\${markId}', name: '\${markName}', type: 'equipment', slot: 'equipment', cost: 0,\` + r;
    const newLine2 = \`      keywords: [\${markKeywords}], description: '\${markDesc}', statModifiers: { \${statMod} } },\` + r;
    
    // check if it's already there
    if (!lines[wgLine + 1].includes(markId)) {
      lines.splice(wgLine + 1, 0, newLine1, newLine2);
      console.log("Replaced for", unitId);
    } else {
      console.log("Already has it for", unitId);
    }
  }
}

replaceWargear('ha_lord_kakophonist', 'ha_mark_slaanesh_kak', 'Mark of Slaanesh', "'SLAANESH'", '+2" Movement. Included in base cost.', 'movement: 2');

replaceWargear('ha_exalted_sorcerer', 'ha_mark_tzeentch_es', 'Mark of Tzeentch', "'TZEENTCH'", '+1 Ranged Skill. Included in base cost.', 'rangedSkill: 1');

replaceWargear('ha_master_of_executions', 'ha_mark_khorne_moe', 'Mark of Khorne', "'KHORNE'", '+1 Melee Skill. Included in base cost.', 'meleeSkill: 1');

replaceWargear('ha_slaughterbound', 'ha_mark_khorne_sb', 'Mark of Khorne', "'KHORNE'", '+1 Melee Skill. Included in base cost.', 'meleeSkill: 1');

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log("Done inserting lines.");
