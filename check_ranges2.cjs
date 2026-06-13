const fs = require('fs');
const content = fs.readFileSync('src/data/weapons.ts', 'utf8');

// Parse all weapon objects and check for missing range on ranged/thrown types
// This handles both single-line { id: ..., type: 'ranged', range: N, ... }
// and multi-line { id: ...,\n  type: 'ranged',\n  range: N, ... }

// Match weapon blocks: from { to }
const weaponRegex = /\{[^{}]*?id:\s*'([^']+)'[^{}]*?type:\s*'(ranged|thrown)'[^{}]*?\}/gs;
let match;
let missing = 0;
let total = 0;

while ((match = weaponRegex.exec(content)) !== null) {
  total++;
  const block = match[0];
  const id = match[1];
  const type = match[2];
  
  if (!block.includes('range:')) {
    missing++;
    // Get line number
    const lineNum = content.substring(0, match.index).split('\n').length;
    console.log(`MISSING range: ${id} (${type}) at line ${lineNum}`);
  }
}

console.log(`\nTotal ranged/thrown weapons: ${total}`);
console.log(`Missing range: ${missing}`);
