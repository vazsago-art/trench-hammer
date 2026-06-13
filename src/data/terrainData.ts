// terrainData.ts — Terrain Setup Generator data and logic
//
// Design goals (community consensus):
//  • 50–70% table coverage
//  • 4–6 large LOS-blocking pieces guaranteed per board
//  • No unbroken line of sight longer than 12" without exposed positioning
//  • ~8–12 scatter pieces (barricades, crates, rubble) on top of core terrain

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TerrainPieceType {
  id: string;
  name: string;
  category: 'ruin' | 'wall' | 'crater' | 'building' | 'trench' | 'rubble' | 'industrial' | 'wreck' | 'scatter';
  widthIn: number;
  heightIn: number;
  shape: 'rect' | 'circle';
  color: string;
  borderColor: string;
  cover: 'Light' | 'Heavy' | 'Full';
  elevation: string;
  /** Completely blocks cross-board line of sight — counts toward the 4–6 LOS-blocker minimum */
  isLOSBlocker: boolean;
  /** Small scatter piece — barricade, crate, rubble pile etc. */
  isScatter: boolean;
  description: string;
}

export interface PlacedTerrain {
  type: TerrainPieceType;
  x: number;
  y: number;
  rotated: boolean;
  label: string;
}

export interface BoardConfig {
  id: string;
  name: string;
  widthIn: number;
  heightIn: number;
  deploymentDepthIn: number;
}

export interface TerrainTheme {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** Weight table for LOS-blocking pieces (guaranteed first pass) */
  losBlockerWeights: Record<string, number>;
  /** Weight table for mid-size terrain (trenches, craters, walls) */
  midWeights: Record<string, number>;
  /** Weight table for scatter (barricades, crates, small rubble) */
  scatterWeights: Record<string, number>;
}

export interface ScenarioConfig {
  id: string;
  name: string;
  description: string;
  centerHeavy: boolean;
  elevationRequired: boolean;
  hazardStrip: boolean;
  hazardNote?: string;
  /** top deployment band / middle no-man's-land / bottom deployment band */
  zoneModifier: [number, number, number];
}

export interface DensityOption {
  id: string;
  name: string;
  /** Guaranteed LOS blocker count */
  losBlockers: number;
  /** Mid-size pieces (trenches, craters, walls, wrecks) */
  midCount: number;
  /** Scatter pieces (barricades, crates, rubble) */
  scatterCount: number;
}

export interface GenerateTerainOptions {
  boardSize: string;
  theme: string;
  scenario: string;
  density: string;
  seed: number;
}

// ─── Seeded RNG ───────────────────────────────────────────────────────────────

class SeededRandom {
  private seed: number;
  constructor(seed: number) { this.seed = seed >>> 0; }

  next(): number {
    this.seed = (Math.imul(1664525, this.seed) + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }

  nextFloat(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.nextFloat(min, max + 1));
  }

  weighted<T>(items: Array<{ item: T; weight: number }>): T {
    const total = items.reduce((s, i) => s + i.weight, 0);
    let r = this.next() * total;
    for (const { item, weight } of items) {
      r -= weight;
      if (r <= 0) return item;
    }
    return items[items.length - 1].item;
  }
}

// ─── Terrain Pieces ───────────────────────────────────────────────────────────

export const TERRAIN_PIECES: Record<string, TerrainPieceType> = {
  // ── Scatter (small, placed last to fill gaps and break fire lanes) ──────────
  small_crater: {
    id: 'small_crater', name: 'Small Crater', category: 'crater',
    widthIn: 3, heightIn: 3, shape: 'circle',
    color: '#5C4A32', borderColor: '#3a2e1e',
    cover: 'Light', elevation: 'Ground level',
    isLOSBlocker: false, isScatter: true,
    description: 'Shell hole (~3" wide). Use a crater token, foam bowl, or circular recess base.',
  },
  barricade: {
    id: 'barricade', name: 'Barricade', category: 'scatter',
    widthIn: 4, heightIn: 1, shape: 'rect',
    color: '#708090', borderColor: '#4a5a6a',
    cover: 'Heavy', elevation: 'Low barrier (~1" tall)',
    isLOSBlocker: false, isScatter: true,
    description: 'Sandbag line or low barricade (~4"×1"). Use sandbag kits, wooden planks, or barricade sprues.',
  },
  crate_stack: {
    id: 'crate_stack', name: 'Crate Stack', category: 'scatter',
    widthIn: 2, heightIn: 2, shape: 'rect',
    color: '#8A7040', borderColor: '#6a5020',
    cover: 'Heavy', elevation: 'Low (+1.5")',
    isLOSBlocker: false, isScatter: true,
    description: 'Stack of supply crates (~2"×2"). Use resin crates, wooden blocks, or 40mm base stacks.',
  },
  rubble_pile: {
    id: 'rubble_pile', name: 'Rubble Pile', category: 'rubble',
    widthIn: 3, heightIn: 2, shape: 'rect',
    color: '#9A8A78', borderColor: '#6a5a48',
    cover: 'Light', elevation: 'Low (+1")',
    isLOSBlocker: false, isScatter: true,
    description: 'Scattered debris (~3"×2"). Use broken bricks, gravel scatter, or rubble base.',
  },
  fallen_pillar: {
    id: 'fallen_pillar', name: 'Fallen Pillar', category: 'ruin',
    widthIn: 6, heightIn: 1.5, shape: 'rect',
    color: '#B0A090', borderColor: '#807060',
    cover: 'Heavy', elevation: 'Low (+1")',
    isLOSBlocker: false, isScatter: false,
    description: 'Toppled column (~6"×1.5"). Long and narrow. Use a Styrofoam pillar or resin column.',
  },

  // ── Mid-size (craters, trenches, walls, wrecks) ───────────────────────────
  large_crater: {
    id: 'large_crater', name: 'Large Crater', category: 'crater',
    widthIn: 5, heightIn: 5, shape: 'circle',
    color: '#4A3A28', borderColor: '#2e2218',
    cover: 'Heavy', elevation: 'Dug-in (–1" to enemy range)',
    isLOSBlocker: false, isScatter: false,
    description: 'Large bomb crater (~5" wide). Models inside gain Heavy Cover. Use a foam crater or large bowl.',
  },
  dense_rubble: {
    id: 'dense_rubble', name: 'Dense Rubble Field', category: 'rubble',
    widthIn: 5, heightIn: 4, shape: 'rect',
    color: '#7A6A58', borderColor: '#5a4a38',
    cover: 'Light', elevation: 'Difficult Ground',
    isLOSBlocker: false, isScatter: false,
    description: 'Wide collapse zone (~5"×4"). Counts as Difficult Ground. Use a rubble scatter tile.',
  },
  long_wall: {
    id: 'long_wall', name: 'Long Wall', category: 'wall',
    widthIn: 8, heightIn: 1, shape: 'rect',
    color: '#607080', borderColor: '#405060',
    cover: 'Heavy', elevation: 'Medium barrier (~2" tall)',
    isLOSBlocker: false, isScatter: false,
    description: 'Extended wall section (~8"×1"). Blocks LOS for low models. Use wall sprues or Gothic fence sections.',
  },
  trench_section: {
    id: 'trench_section', name: 'Trench Section', category: 'trench',
    widthIn: 8, heightIn: 2, shape: 'rect',
    color: '#6B5A3E', borderColor: '#4a3a1e',
    cover: 'Full', elevation: 'Below ground',
    isLOSBlocker: false, isScatter: false,
    description: 'Dug trench (~8"×2"). Models inside are in Full Cover. Use foam trench kits.',
  },
  short_trench: {
    id: 'short_trench', name: 'Short Trench / Gun Pit', category: 'trench',
    widthIn: 4, heightIn: 2, shape: 'rect',
    color: '#7B6A4E', borderColor: '#5a4a2e',
    cover: 'Heavy', elevation: 'Below ground',
    isLOSBlocker: false, isScatter: false,
    description: 'Short trench or gun pit (~4"×2"). Fits 2–3 models. Use a cut foam section or small trench piece.',
  },
  vehicle_wreck: {
    id: 'vehicle_wreck', name: 'Vehicle Wreck', category: 'wreck',
    widthIn: 5, heightIn: 3, shape: 'rect',
    color: '#7A4A3A', borderColor: '#5a2a1a',
    cover: 'Heavy', elevation: 'Low (+1–2")',
    isLOSBlocker: true, isScatter: false,
    description: 'Burned-out vehicle hull (~5"×3"). Use a ruined tank, APC, or truck terrain piece.',
  },
  industrial_pipes: {
    id: 'industrial_pipes', name: 'Industrial Pipes / Machinery', category: 'industrial',
    widthIn: 4, heightIn: 2, shape: 'rect',
    color: '#556877', borderColor: '#354857',
    cover: 'Heavy', elevation: 'Medium (+2–3")',
    isLOSBlocker: false, isScatter: false,
    description: 'Pipe network, generator, or cogitator bank (~4"×2"). Use sci-fi scatter or AdMech terrain.',
  },

  // ── LOS Blockers (large, placed first to guarantee fire-lane coverage) ─────
  small_ruin: {
    id: 'small_ruin', name: 'Small Ruin', category: 'ruin',
    widthIn: 4, heightIn: 4, shape: 'rect',
    color: '#7A6050', borderColor: '#5a4030',
    cover: 'Heavy', elevation: '1–2 floors',
    isLOSBlocker: true, isScatter: false,
    description: 'Collapsed structure (~4"×4"). Use a small bunker, ruined shrine, or roofless building.',
  },
  large_ruin: {
    id: 'large_ruin', name: 'Large Ruin', category: 'ruin',
    widthIn: 6, heightIn: 6, shape: 'rect',
    color: '#6A5040', borderColor: '#4a3020',
    cover: 'Full', elevation: '2–3 floors',
    isLOSBlocker: true, isScatter: false,
    description: 'Major collapsed building (~6"×6"). Full concealment, climable floors. Use a modular ruin kit.',
  },
  standing_building: {
    id: 'standing_building', name: 'Standing Building', category: 'building',
    widthIn: 5, heightIn: 5, shape: 'rect',
    color: '#505A6A', borderColor: '#303A4A',
    cover: 'Full', elevation: 'Multiple floors',
    isLOSBlocker: true, isScatter: false,
    description: 'Intact or partially intact structure (~5"×5"). Use a modular building, bastion, or hollow terrain block.',
  },
  large_industrial: {
    id: 'large_industrial', name: 'Large Industrial Structure', category: 'industrial',
    widthIn: 6, heightIn: 5, shape: 'rect',
    color: '#445566', borderColor: '#223344',
    cover: 'Full', elevation: 'High (3–4 levels)',
    isLOSBlocker: true, isScatter: false,
    description: 'Silo, refinery tower, or large cogitator array (~6"×5"). Full Cover and high elevation.',
  },
};

// ─── Board Sizes ──────────────────────────────────────────────────────────────

export const BOARD_SIZES: Record<string, BoardConfig> = {
  '24x24': { id: '24x24', name: '24"×24"', widthIn: 24, heightIn: 24, deploymentDepthIn: 6 },
  '30x24': { id: '30x24', name: '30"×24"', widthIn: 30, heightIn: 24, deploymentDepthIn: 6 },
  '36x36': { id: '36x36', name: '36"×36"', widthIn: 36, heightIn: 36, deploymentDepthIn: 9 },
  '44x30': { id: '44x30', name: '44"×30"', widthIn: 44, heightIn: 30, deploymentDepthIn: 8 },
  '44x44': { id: '44x44', name: '44"×44"', widthIn: 44, heightIn: 44, deploymentDepthIn: 12 },
  '48x48': { id: '48x48', name: '48"×48"', widthIn: 48, heightIn: 48, deploymentDepthIn: 12 },
  '60x44': { id: '60x44', name: '60"×44"', widthIn: 60, heightIn: 44, deploymentDepthIn: 12 },
};

// ─── Density Options ──────────────────────────────────────────────────────────
// Targets:
//  • Sparse  — minimum viable game (~40–50% coverage)
//  • Moderate — recommended (~55–65% coverage) — 4–5 LOS blockers + 8–10 scatter
//  • Dense    — heavily fortified (~65–75% coverage) — 6+ LOS blockers + 12 scatter

export const DENSITY_OPTIONS: DensityOption[] = [
  { id: 'sparse',   name: 'Sparse',   losBlockers: 3, midCount: 4,  scatterCount: 6  },
  { id: 'moderate', name: 'Moderate', losBlockers: 5, midCount: 6,  scatterCount: 10 },
  { id: 'dense',    name: 'Dense',    losBlockers: 7, midCount: 8,  scatterCount: 12 },
];

// ─── Terrain Themes ───────────────────────────────────────────────────────────

export const TERRAIN_THEMES: Record<string, TerrainTheme> = {
  urban_ruins: {
    id: 'urban_ruins', name: 'Urban Ruins', icon: '🏚',
    description: 'Collapsed city district with craters and ruins.',
    losBlockerWeights:  { large_ruin: 5, standing_building: 4, small_ruin: 3 },
    midWeights:         { large_crater: 4, dense_rubble: 4, fallen_pillar: 3, vehicle_wreck: 2 },
    scatterWeights:     { rubble_pile: 6, barricade: 4, small_crater: 5, crate_stack: 2 },
  },
  trench_network: {
    id: 'trench_network', name: 'Trench Network', icon: '⚔',
    description: 'Interconnected trench systems with craters and barricades.',
    losBlockerWeights:  { small_ruin: 4, large_ruin: 2, vehicle_wreck: 3 },
    midWeights:         { trench_section: 8, short_trench: 6, long_wall: 4, large_crater: 5 },
    scatterWeights:     { barricade: 8, small_crater: 7, rubble_pile: 3, crate_stack: 3 },
  },
  industrial_zone: {
    id: 'industrial_zone', name: 'Industrial Zone', icon: '🏭',
    description: 'Factory complex with machinery, vehicle wrecks, and high walls.',
    losBlockerWeights:  { large_industrial: 5, standing_building: 4, vehicle_wreck: 4, small_ruin: 2 },
    midWeights:         { industrial_pipes: 8, long_wall: 5, large_crater: 2, dense_rubble: 2 },
    scatterWeights:     { barricade: 6, crate_stack: 8, rubble_pile: 3, small_crater: 2 },
  },
  wasteland: {
    id: 'wasteland', name: 'Wasteland', icon: '💥',
    description: 'Barren, shell-blasted open ground with craters and sparse debris.',
    losBlockerWeights:  { vehicle_wreck: 4, large_ruin: 3, small_ruin: 3 },
    midWeights:         { large_crater: 8, dense_rubble: 5, long_wall: 2, industrial_pipes: 2 },
    scatterWeights:     { small_crater: 10, rubble_pile: 6, barricade: 3, fallen_pillar: 3 },
  },
  gothic: {
    id: 'gothic', name: 'Gothic Cathedral', icon: '⛪',
    description: 'Ancient gothic architecture: pillars, pews, and shattered stonework.',
    losBlockerWeights:  { large_ruin: 6, standing_building: 4, small_ruin: 5 },
    midWeights:         { fallen_pillar: 8, long_wall: 5, large_crater: 2, dense_rubble: 2 },
    scatterWeights:     { rubble_pile: 6, barricade: 5, small_crater: 3, crate_stack: 2 },
  },
  mixed: {
    id: 'mixed', name: 'Mixed', icon: '🌍',
    description: 'Balanced mix of all terrain types.',
    losBlockerWeights:  { large_ruin: 4, standing_building: 3, vehicle_wreck: 3, large_industrial: 3, small_ruin: 3 },
    midWeights:         { large_crater: 4, trench_section: 3, industrial_pipes: 3, long_wall: 3, dense_rubble: 2 },
    scatterWeights:     { small_crater: 5, rubble_pile: 4, barricade: 4, crate_stack: 3, fallen_pillar: 2 },
  },
};

// ─── Scenarios ────────────────────────────────────────────────────────────────

export const SCENARIOS: ScenarioConfig[] = [
  {
    id: 'standard', name: 'Standard / Open Battle',
    description: 'Balanced terrain spread evenly across the board.',
    centerHeavy: false, elevationRequired: false, hazardStrip: false,
    zoneModifier: [0.6, 1.0, 0.6],
  },
  {
    id: 'claim_no_mans_land', name: "Claim No Man's Land",
    description: "Heavy terrain in the center — the contested middle of the board.",
    centerHeavy: true, elevationRequired: false, hazardStrip: false,
    zoneModifier: [0.4, 1.5, 0.4],
  },
  {
    id: 'high_ground', name: 'The High Ground',
    description: 'Elevated terrain dominates the center. Both sides vie for the high ground.',
    centerHeavy: true, elevationRequired: true, hazardStrip: false,
    zoneModifier: [0.5, 1.6, 0.5],
  },
  {
    id: 'supply_raid', name: 'Supply Raid',
    description: 'Open corridors to the center with flanking cover on the flanks.',
    centerHeavy: false, elevationRequired: false, hazardStrip: false,
    zoneModifier: [0.7, 0.9, 0.7],
  },
  {
    id: 'toxic_crossing', name: 'Toxic Crossing',
    description: 'A 4" hazard strip runs across the center of the board.',
    centerHeavy: false, elevationRequired: false, hazardStrip: true,
    hazardNote: 'Mark a 4" wide hazard strip across the center of the board. Models crossing it gain a Corruption token.',
    zoneModifier: [0.8, 0.7, 0.8],
  },
  {
    id: 'industrial_zone_scenario', name: 'Industrial Zone',
    description: 'Dense terrain throughout — industrial theme strongly recommended.',
    centerHeavy: true, elevationRequired: true, hazardStrip: false,
    zoneModifier: [0.9, 1.7, 0.9],
  },
  {
    id: 'spec_ops', name: 'Spec Ops',
    description: 'Corridors of terrain favoring infiltrators and fast movers.',
    centerHeavy: false, elevationRequired: false, hazardStrip: false,
    zoneModifier: [0.6, 1.1, 0.6],
  },
  {
    id: 'meatgrinder', name: 'Meatgrinder',
    description: 'Attacker crosses open ground. Defender has more terrain on their side.',
    centerHeavy: false, elevationRequired: false, hazardStrip: false,
    zoneModifier: [1.3, 0.8, 0.4],
  },
];

// ─── Generation Algorithm ─────────────────────────────────────────────────────
//
// Three-pass strategy:
//  1. Place guaranteed LOS blockers spread across board columns (breaks fire lanes ≤12")
//  2. Place mid-size terrain (craters, trenches, walls) to increase coverage
//  3. Scatter fill — barricades, crates, rubble dropped into remaining gaps
//
// Board zones: 3 columns × 3 bands (top-deploy / mid / bottom-deploy)
// LOS blockers are distributed across columns so no lane wider than ~8" is clear.

export function generateTerrain(options: GenerateTerainOptions): PlacedTerrain[] {
  const { boardSize, theme, scenario, density, seed } = options;

  const board          = BOARD_SIZES[boardSize];
  const themeConfig    = TERRAIN_THEMES[theme];
  const scenarioConfig = SCENARIOS.find(s => s.id === scenario) ?? SCENARIOS[0];
  const densityConfig  = DENSITY_OPTIONS.find(d => d.id === density) ?? DENSITY_OPTIONS[1];
  const rng            = new SeededRandom(seed);

  const placed: PlacedTerrain[] = [];
  const LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let labelIdx = 0;

  const deployDepth = board.deploymentDepthIn;
  const midStart    = deployDepth;
  const midEnd      = board.heightIn - deployDepth;
  const midHeight   = midEnd - midStart;
  const NUM_COLS    = 3;
  const colW        = board.widthIn / NUM_COLS;

  interface Zone {
    x: number; y: number; w: number; h: number;
    band: 0 | 1 | 2;
    col: 0 | 1 | 2;
  }

  const bandY = [0, midStart, midEnd];
  const bandH = [deployDepth, midHeight, deployDepth];

  const allZones: Zone[] = [];
  for (let band = 0; band < 3; band++)
    for (let col = 0; col < NUM_COLS; col++)
      allZones.push({ x: col * colW, y: bandY[band], w: colW, h: bandH[band], band: band as 0|1|2, col: col as 0|1|2 });

  // ── Helpers ────────────────────────────────────────────────────────────────

  const buildPool = (weights: Record<string, number>) =>
    Object.entries(weights)
      .filter(([id]) => TERRAIN_PIECES[id] !== undefined)
      .map(([id, w]) => ({ item: TERRAIN_PIECES[id], weight: w }));

  const MARGIN    = 0.5;
  const PIECE_GAP = 0.75;

  const tryPlace = (piece: TerrainPieceType, zone: Zone, rotated: boolean): { x: number; y: number } | null => {
    const pW = rotated ? piece.heightIn : piece.widthIn;
    const pH = rotated ? piece.widthIn  : piece.heightIn;
    const minX = zone.x + MARGIN;
    const maxX = zone.x + zone.w - pW - MARGIN;
    const minY = zone.y + MARGIN;
    const maxY = zone.y + zone.h - pH - MARGIN;

    if (maxX < minX || maxY < minY) return null;

    for (let attempt = 0; attempt < 30; attempt++) {
      const x = rng.nextFloat(minX, maxX);
      const y = rng.nextFloat(minY, maxY);
      let valid = true;
      for (const p of placed) {
        const p2W = p.rotated ? p.type.heightIn : p.type.widthIn;
        const p2H = p.rotated ? p.type.widthIn  : p.type.heightIn;
        if (
          x - PIECE_GAP < p.x + p2W && x + pW + PIECE_GAP > p.x &&
          y - PIECE_GAP < p.y + p2H && y + pH + PIECE_GAP > p.y
        ) { valid = false; break; }
      }
      if (valid) return { x: Math.round(x * 2) / 2, y: Math.round(y * 2) / 2 };
    }
    return null;
  };

  const addPiece = (piece: TerrainPieceType, zone: Zone): boolean => {
    if (labelIdx >= LABELS.length) return false;
    const rotated = piece.widthIn !== piece.heightIn && rng.next() < 0.45;
    const pos = tryPlace(piece, zone, rotated);
    if (!pos) return false;
    placed.push({ type: piece, x: pos.x, y: pos.y, rotated, label: LABELS[labelIdx++] });
    return true;
  };

  // ── Pass 1: LOS Blockers ───────────────────────────────────────────────────
  // Distribute across all 3 columns (and prefer center for center-heavy scenarios)
  // to ensure no fire lane is open longer than ~12" in any direction.

  const losPool = buildPool(themeConfig.losBlockerWeights);
  const needed  = densityConfig.losBlockers;

  // Column priority: always fill each column at least once, then centre gets extras
  const losCols: (0|1|2)[] = [];
  for (let i = 0; i < needed; i++) {
    if      (i < 3)                                       losCols.push(i as 0|1|2);        // one per column
    else if (scenarioConfig.centerHeavy && i % 2 === 0)  losCols.push(1);                  // centre extras
    else                                                   losCols.push((i % 3) as 0|1|2);
  }

  // Shuffle column list to avoid predictable left→right order
  for (let i = losCols.length - 1; i > 0; i--) {
    const j = rng.nextInt(0, i);
    [losCols[i], losCols[j]] = [losCols[j], losCols[i]];
  }

  for (let i = 0; i < needed; i++) {
    const col  = losCols[i] ?? (rng.nextInt(0, 2) as 0|1|2);
    const band: 0|1|2 = 1; // prefer mid-band for LOS blockers
    const zone = allZones.find(z => z.band === band && z.col === col)!;
    const piece = rng.weighted(losPool.map(p => ({
      ...p,
      // elevationRequired scenario: triple-weight elevated pieces in center
      weight: (scenarioConfig.elevationRequired && col === 1)
        ? p.weight * (['building','industrial','ruin'].includes(p.item.category) ? 3 : 1)
        : p.weight,
    })));
    if (!addPiece(piece, zone)) {
      // fallback: try any zone in same column
      for (const z of allZones.filter(z => z.col === col)) {
        if (addPiece(piece, z)) break;
      }
    }
  }

  // ── Pass 2: Mid terrain ────────────────────────────────────────────────────

  const midPool = buildPool(themeConfig.midWeights);
  const [topMod, midMod, botMod] = scenarioConfig.zoneModifier;

  const midTarget = densityConfig.midCount;
  for (let i = 0; i < midTarget; i++) {
    // Weight zones by scenario band modifiers
    const zoneWeights = allZones.map(z => {
      const bandMod = z.band === 0 ? topMod : z.band === 1 ? midMod : botMod;
      const colMod  = (scenarioConfig.centerHeavy && z.col === 1) ? 1.4 : 0.9;
      return { item: z, weight: bandMod * colMod };
    });
    const zone  = rng.weighted(zoneWeights);
    const piece = rng.weighted(midPool);
    addPiece(piece, zone);
  }

  // ── Pass 3: Scatter fill ───────────────────────────────────────────────────
  // Dropped across the whole board to break any remaining open fire lanes.
  // Scatter is intentionally spread into ALL zones including deployment.

  const scatterPool = buildPool(themeConfig.scatterWeights);
  const scatterTarget = densityConfig.scatterCount;

  for (let i = 0; i < scatterTarget; i++) {
    // Interleave scatter across columns so it breaks long sightlines evenly
    const col: 0|1|2 = (i % 3) as 0|1|2;
    // Alternate between bands for even spread
    const band: 0|1|2 = ([1, 0, 2, 1, 2, 0][i % 6] ?? 1) as 0|1|2;
    const zone  = allZones.find(z => z.col === col && z.band === band)
                ?? allZones[rng.nextInt(0, allZones.length - 1)];
    const piece = rng.weighted(scatterPool);
    addPiece(piece, zone);
  }

  return placed;
}
