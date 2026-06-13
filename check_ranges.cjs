const fs = require('fs');
const content = fs.readFileSync('src/data/weapons.ts', 'utf8');
const lines = content.split('\n');
let missing = 0;
const results = [];

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const isRangedLine = l.includes("type: 'ranged'") || l.includes("type: 'thrown'");
  if (isRangedLine && !l.includes('range:')) {
    missing++;
    results.push(`Line ${i+1}: ${l.trim().substring(0, 140)}`);
  }
}

results.forEach(r => console.log(r));
console.log(`\nTotal ranged/thrown weapons missing range: ${missing}`);
