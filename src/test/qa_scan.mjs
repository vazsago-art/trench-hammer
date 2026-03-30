/**
 * Comprehensive QA Test Script
 * Parses instruction markdown files and compares unit stat blocks
 * against factions_complete.ts data.
 * 
 * Run: node src/test/qa_scan.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

// ── 1. Parse CODE units from factions_complete.ts ────────────────────────
function parseCodeUnits() {
  const code = fs.readFileSync(path.join(ROOT, 'src/data/factions_complete.ts'), 'utf-8');
  const units = [];

  // Match unit definitions: export const XX: UnitOption = { ... };
  // We'll extract key fields with individual regexes from each block
  const blockRegex = /export const (\w+):\s*UnitOption\s*=\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\};/gs;
  let match;
  
  while ((match = blockRegex.exec(code)) !== null) {
    const varName = match[1];
    const block = match[2];
    
    const idMatch = block.match(/id:\s*'([^']+)'/);
    const nameMatch = block.match(/name:\s*'([^']+)'/);
    const costMatch = block.match(/baseCost:\s*(\d+)/);
    const minMatch = block.match(/minCount:\s*(\d+)/);
    const maxMatch = block.match(/maxCount:\s*(\d+)/);
    const movMatch = block.match(/movement:\s*(\d+)/);
    const rsMatch = block.match(/rangedSkill:\s*(\d+)/);
    const msMatch = block.match(/meleeSkill:\s*(\d+)/);
    const asMatch = block.match(/armourSave:\s*(-?\d+)/);
    const baseMatch = block.match(/baseSize:\s*'([^']+)'/);
    const factionMatch = block.match(/faction:\s*'([^']+)'/);
    
    // Extract keywords array
    const kwMatch = block.match(/keywords:\s*\[([^\]]+)\]/);
    const keywords = kwMatch 
      ? kwMatch[1].match(/'([^']+)'/g)?.map(k => k.replace(/'/g, '')) || []
      : [];
    
    if (idMatch && nameMatch) {
      units.push({
        varName,
        id: idMatch[1],
        name: nameMatch[1],
        baseCost: costMatch ? parseInt(costMatch[1]) : null,
        minCount: minMatch ? parseInt(minMatch[1]) : null,
        maxCount: maxMatch ? parseInt(maxMatch[1]) : null,
        movement: movMatch ? parseInt(movMatch[1]) : null,
        rangedSkill: rsMatch ? parseInt(rsMatch[1]) : null,
        meleeSkill: msMatch ? parseInt(msMatch[1]) : null,
        armourSave: asMatch ? parseInt(asMatch[1]) : null,
        baseSize: baseMatch ? baseMatch[1] : null,
        faction: factionMatch ? factionMatch[1] : null,
        keywords,
      });
    }
  }
  
  return units;
}

// ── 2. Parse INSTRUCTION units from markdown files ───────────────────────
function parseInstructionFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const units = [];
  const fileName = path.basename(filePath);
  
  // Find all stat tables
  // Pattern: | Name | Movement | Ranged | Melee | Armour | Base |
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect header row
    if (line.includes('| Name') && line.includes('Movement') && line.includes('Ranged') && line.includes('Melee') && line.includes('Armour') && line.includes('Base')) {
      // Skip separator line
      if (i + 2 < lines.length) {
        const dataLine = lines[i + 2];
        const cells = dataLine.split('|').map(c => c.trim()).filter(c => c.length > 0);
        
        if (cells.length >= 6) {
          // Look backwards for cost header
          let cost = null;
          let maxCountPrefix = null;
          for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
            const headerLine = lines[j];
            // Match patterns like: "#### 0-1 Daemon Prince (210 Credits..."
            // or "#### Preacher (Cost: 30 Credits)"
            const costHeaderMatch = headerLine.match(/#{2,4}\s*(0-\d+)?\s*([^(\n]+?)\s*\((?:Cost:\s*)?(\d+)\s*Credits?/i);
            if (costHeaderMatch) {
              maxCountPrefix = costHeaderMatch[1] || null;
              cost = parseInt(costHeaderMatch[3], 10);
              break;
            }
          }
          
          // Look forwards for Keywords line
          let keywords = [];
          for (let j = i + 3; j < Math.min(lines.length, i + 60); j++) {
            if (lines[j].match(/^\*\*Keywords\*\*/)) {
              const kwLine = lines[j].replace('**Keywords**', '').replace(/\\/g, '').trim();
              if (kwLine.length > 2) {
                keywords = kwLine.split(',').map(k => k.trim()).filter(k => k.length > 0);
              } else if (j + 1 < lines.length) {
                keywords = lines[j + 1].replace(/\\/g, '').split(',').map(k => k.trim()).filter(k => k.length > 0);
              }
              break;
            }
            // Also match: **Keywords**\n followed by keyword line
            if (lines[j].trim() === '**Keywords**' && j + 1 < lines.length) {
              keywords = lines[j + 1].replace(/\\/g, '').split(',').map(k => k.trim()).filter(k => k.length > 0);
              break;
            }
          }
          
          const unitName = cells[0].replace(/\\/g, '').trim();
          
          units.push({
            name: unitName,
            movement: cells[1].replace(/\\/g, '').trim(),
            ranged: cells[2].replace(/\\/g, '').trim(),
            melee: cells[3].replace(/\\/g, '').trim(),
            armour: cells[4].replace(/\\/g, '').trim(),
            base: cells[5].replace(/\\/g, '').trim(),
            cost,
            maxCountPrefix,
            keywords,
            sourceFile: fileName,
          });
        }
      }
    }
  }
  
  return units;
}

function getAllInstructionUnits() {
  const instructionsBase = path.join(ROOT, '.github/instructions');
  const factionDirs = [
    'TrenchHammer - Imperial Factions',
    'TrenchHammer - Chaos Factions',
    'TrenchHammer - Xenos Factions',
    'TrenchHammer - Outlaw Factions',
  ];
  
  const allUnits = [];
  
  for (const dir of factionDirs) {
    const dirPath = path.join(instructionsBase, dir);
    if (!fs.existsSync(dirPath)) continue;
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    
    for (const file of files) {
      // Prefer _20260309 versions when available
      const baseName = file.replace('_20260309', '');
      if (!file.includes('_20260309') && files.some(f2 => f2.includes('_20260309') && f2.replace('_20260309', '') === baseName)) {
        continue;
      }
      
      const units = parseInstructionFile(path.join(dirPath, file));
      allUnits.push(...units);
    }
  }
  
  return allUnits;
}

// ── 3. Comparison helpers ────────────────────────────────────────────────
function normalizeBase(base) {
  return base.replace(/\s+/g, '').replace(/×/g, 'x').toLowerCase();
}

function parseMovement(movStr) {
  const m = movStr.match(/(\d+)/);
  return m ? parseInt(m[1]) : 0;
}

function parseStat(statStr) {
  if (statStr === 'N/A' || statStr === 'n/a') return 0;
  const m = statStr.match(/[+-]?\d+/);
  return m ? parseInt(m[0]) : 0;
}

function findCodeUnit(instrUnit, codeUnits) {
  const nameNorm = instrUnit.name.toLowerCase().trim();
  
  // Try exact name match
  let found = codeUnits.find(u => u.name.toLowerCase() === nameNorm);
  if (found) return found;
  
  // Try with cleaned name (remove special chars)
  const cleanName = nameNorm.replace(/['']/g, "'");
  found = codeUnits.find(u => u.name.toLowerCase().replace(/['']/g, "'") === cleanName);
  if (found) return found;
  
  return null;
}

// ── 4. Run comparison ────────────────────────────────────────────────────
function runComparison() {
  const codeUnits = parseCodeUnits();
  const instrUnits = getAllInstructionUnits();
  const mismatches = [];
  
  console.log(`Code units parsed: ${codeUnits.length}`);
  console.log(`Instruction units parsed: ${instrUnits.length}\n`);
  
  let matched = 0;
  let unmatched = 0;
  const unmatchedList = [];
  
  for (const iu of instrUnits) {
    const cu = findCodeUnit(iu, codeUnits);
    
    if (!cu) {
      unmatched++;
      unmatchedList.push(`${iu.name} (${iu.sourceFile})`);
      continue;
    }
    matched++;
    
    // Compare baseCost
    if (iu.cost !== null && iu.cost !== cu.baseCost) {
      mismatches.push({
        unit: iu.name, unitId: cu.id, field: 'baseCost',
        expected: `${iu.cost}`, actual: `${cu.baseCost}`,
        severity: 'HIGH', source: iu.sourceFile,
      });
    }
    
    // Compare movement
    const instrMov = parseMovement(iu.movement);
    if (cu.movement !== null && instrMov !== cu.movement) {
      mismatches.push({
        unit: iu.name, unitId: cu.id, field: 'movement',
        expected: `${instrMov} (${iu.movement})`, actual: `${cu.movement}`,
        severity: 'HIGH', source: iu.sourceFile,
      });
    }
    
    // Compare rangedSkill
    const instrRS = parseStat(iu.ranged);
    if (cu.rangedSkill !== null && instrRS !== cu.rangedSkill) {
      const sev = (iu.ranged === 'N/A' && cu.rangedSkill === 0) ? 'LOW' : 'MEDIUM';
      mismatches.push({
        unit: iu.name, unitId: cu.id, field: 'rangedSkill',
        expected: `${iu.ranged}`, actual: `${cu.rangedSkill}`,
        severity: sev, source: iu.sourceFile,
      });
    }
    
    // Compare meleeSkill
    const instrMS = parseStat(iu.melee);
    if (cu.meleeSkill !== null && instrMS !== cu.meleeSkill) {
      mismatches.push({
        unit: iu.name, unitId: cu.id, field: 'meleeSkill',
        expected: `${iu.melee}`, actual: `${cu.meleeSkill}`,
        severity: 'HIGH', source: iu.sourceFile,
      });
    }
    
    // Compare armourSave
    const instrAS = parseStat(iu.armour);
    if (cu.armourSave !== null && instrAS !== cu.armourSave) {
      mismatches.push({
        unit: iu.name, unitId: cu.id, field: 'armourSave',
        expected: `${iu.armour}`, actual: `${cu.armourSave}`,
        severity: 'HIGH', source: iu.sourceFile,
      });
    }
    
    // Compare baseSize
    if (cu.baseSize) {
      const instrBase = normalizeBase(iu.base);
      const codeBase = normalizeBase(cu.baseSize);
      if (instrBase !== codeBase) {
        mismatches.push({
          unit: iu.name, unitId: cu.id, field: 'baseSize',
          expected: iu.base, actual: cu.baseSize,
          severity: 'HIGH', source: iu.sourceFile,
        });
      }
    }
    
    // Compare keywords
    if (iu.keywords.length > 0) {
      const instrKW = new Set(iu.keywords.map(k => k.toUpperCase().trim()));
      const codeKW = new Set(cu.keywords.map(k => k.toUpperCase().trim()));
      
      for (const kw of instrKW) {
        if (kw && !codeKW.has(kw)) {
          mismatches.push({
            unit: iu.name, unitId: cu.id, field: 'keyword_missing',
            expected: `Should have: ${kw}`, actual: 'Missing in code',
            severity: 'MEDIUM', source: iu.sourceFile,
          });
        }
      }
      for (const kw of codeKW) {
        if (kw && !instrKW.has(kw)) {
          mismatches.push({
            unit: iu.name, unitId: cu.id, field: 'keyword_extra',
            expected: `Not in instructions: ${kw}`, actual: 'Extra in code',
            severity: 'LOW', source: iu.sourceFile,
          });
        }
      }
    }
  }
  
  console.log(`Matched: ${matched}, Unmatched: ${unmatched}`);
  if (unmatchedList.length > 0) {
    console.log(`\nUnmatched instruction units (no code equivalent found):`);
    for (const u of unmatchedList) {
      console.log(`  - ${u}`);
    }
  }
  
  return mismatches;
}

// ── 5. Internal consistency checks ───────────────────────────────────────
function runConsistency() {
  const codeUnits = parseCodeUnits();
  const mismatches = [];
  
  for (const u of codeUnits) {
    // LARGE keyword + small base
    if (u.keywords.includes('LARGE') && u.baseSize) {
      const baseNum = parseInt(u.baseSize.match(/\d+/)?.[0] || '32');
      if (baseNum <= 32) {
        mismatches.push({
          unit: u.name, unitId: u.id, field: 'LARGE+small_base',
          expected: 'LARGE → base > 32mm', actual: u.baseSize,
          severity: 'HIGH', source: 'consistency',
        });
      }
    }
    
    // VEHICLE keyword + small base
    if (u.keywords.includes('VEHICLE') && u.baseSize) {
      const baseNum = parseInt(u.baseSize.match(/\d+/)?.[0] || '32');
      if (baseNum < 40) {
        mismatches.push({
          unit: u.name, unitId: u.id, field: 'VEHICLE+small_base',
          expected: 'VEHICLE → base >= 40mm', actual: u.baseSize,
          severity: 'MEDIUM', source: 'consistency',
        });
      }
    }
    
    // Missing baseSize
    if (!u.baseSize) {
      mismatches.push({
        unit: u.name, unitId: u.id, field: 'baseSize',
        expected: 'defined', actual: 'missing',
        severity: 'MEDIUM', source: 'consistency',
      });
    }
    
    // Movement = 0
    if (u.movement !== null && u.movement <= 0) {
      mismatches.push({
        unit: u.name, unitId: u.id, field: 'movement',
        expected: '> 0', actual: `${u.movement}`,
        severity: 'HIGH', source: 'consistency',
      });
    }
  }
  
  return mismatches;
}

// ── 6. Main ──────────────────────────────────────────────────────────────
console.log('='.repeat(80));
console.log('COMPREHENSIVE QA SCAN: Instruction Files vs Code Data + Consistency');
console.log('='.repeat(80));
console.log();

const compMismatches = runComparison();
console.log();

const consMismatches = runConsistency();

const all = [...compMismatches, ...consMismatches];
const severityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
all.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

console.log();
console.log('='.repeat(80));
console.log('MISMATCHES FOUND');
console.log('='.repeat(80));

const high = all.filter(m => m.severity === 'HIGH');
const med = all.filter(m => m.severity === 'MEDIUM');
const low = all.filter(m => m.severity === 'LOW');

console.log(`\nTotal: ${all.length} | HIGH: ${high.length} | MEDIUM: ${med.length} | LOW: ${low.length}\n`);

for (const m of all) {
  console.log(`[${m.severity.padEnd(6)}] ${m.unit} (${m.unitId}) — ${m.field}`);
  console.log(`         Expected: ${m.expected}`);
  console.log(`         Actual:   ${m.actual}`);
  console.log(`         Source:   ${m.source}`);
  console.log();
}
