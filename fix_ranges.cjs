// Script to add missing range: values to ranged/thrown weapons in weapons.ts
// Parses range from the description string (first number before ")

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'weapons.ts');
let content = fs.readFileSync(filePath, 'utf8');

let fixCount = 0;
let skipCount = 0;
const issues = [];

// Match weapon objects that are type: 'ranged' or type: 'thrown' and DON'T have range:
// Pattern: find lines with type: 'ranged' (or 'thrown') that lack range:
const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this is a single-line weapon definition with type 'ranged' or 'thrown'
  if ((line.includes("type: 'ranged'") || line.includes("type: 'thrown'")) && !line.includes('range:')) {
    // Extract range from description
    const descMatch = line.match(/description:\s*'(\d+)"/);
    if (descMatch) {
      const rangeValue = parseInt(descMatch[1]);
      // Insert range: N after type: 'ranged'/'thrown',
      const newLine = line.replace(
        /type: '(ranged|thrown)'/,
        `type: '$1', range: ${rangeValue}`
      );
      newLines.push(newLine);
      fixCount++;
    } else {
      // Check for "melee-range" or special cases
      const meleeRangeMatch = line.match(/description:\s*'melee-range/i);
      if (meleeRangeMatch) {
        // melee-range = 1" (close combat range)
        const newLine = line.replace(
          /type: '(ranged|thrown)'/,
          `type: '$1', range: 1`
        );
        newLines.push(newLine);
        fixCount++;
      } else {
        // Try multi-line - check next lines for description
        issues.push(`Line ${i+1}: No range found in description - ${line.substring(0, 100)}`);
        newLines.push(line);
        skipCount++;
      }
    }
  } else {
    newLines.push(line);
  }
}

content = newLines.join('\n');
fs.writeFileSync(filePath, content, 'utf8');

console.log(`Fixed: ${fixCount} weapons`);
console.log(`Skipped: ${skipCount} weapons`);
if (issues.length > 0) {
  console.log('\nIssues:');
  issues.forEach(i => console.log(`  ${i}`));
}
