import { useState, useCallback } from 'react';
import {
  BOARD_SIZES,
  TERRAIN_THEMES,
  SCENARIOS,
  DENSITY_OPTIONS,
  generateTerrain,
  PlacedTerrain,
} from '../data/terrainData.js';
import './TerrainGenerator.css';

interface Props {
  onClose: () => void;
}

const SCALE = 10; // SVG units per inch

export function TerrainGenerator({ onClose }: Props) {
  const [boardSize, setBoardSize] = useState('24x24');
  const [theme,     setTheme]     = useState('urban_ruins');
  const [scenario,  setScenario]  = useState('standard');
  const [density,   setDensity]   = useState('moderate');
  const [setup,     setSetup]     = useState<PlacedTerrain[] | null>(null);

  const doGenerate = useCallback(() => {
    const seed = Math.floor(Math.random() * 1_000_000);
    setSetup(generateTerrain({ boardSize, theme, scenario, density, seed }));
  }, [boardSize, theme, scenario, density]);

  const board          = BOARD_SIZES[boardSize];
  const scenarioConfig = SCENARIOS.find(s => s.id === scenario);
  const svgW           = board.widthIn  * SCALE;
  const svgH           = board.heightIn * SCALE;
  const deployH        = board.deploymentDepthIn * SCALE;

  return (
    <div className="tg-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="tg-panel">

        {/* ── Header ── */}
        <div className="tg-header">
          <span className="tg-title">🗺 Terrain Setup Generator</span>
          <button className="tg-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* ── Body: two-column on desktop, single column on mobile ── */}
        <div className="tg-body">

          {/* Left column: options + generate button */}
          <div className="tg-left-col">
            <div className="tg-options">

              {/* Board Size */}
              <div className="tg-option-group">
                <span className="tg-option-label">Board Size</span>
                <div className="tg-pills">
                  {Object.values(BOARD_SIZES).map(b => (
                    <button
                      key={b.id}
                      className={`tg-pill${boardSize === b.id ? ' active' : ''}`}
                      onClick={() => setBoardSize(b.id)}
                    >{b.name}</button>
                  ))}
                </div>
              </div>

              {/* Density */}
              <div className="tg-option-group">
                <span className="tg-option-label">Density</span>
                <div className="tg-pills">
                  {DENSITY_OPTIONS.map(d => (
                    <button
                      key={d.id}
                      className={`tg-pill${density === d.id ? ' active' : ''}`}
                      onClick={() => setDensity(d.id)}
                    >{d.name}</button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div className="tg-option-group">
                <span className="tg-option-label">Theme</span>
                <select value={theme} onChange={e => setTheme(e.target.value)} className="tg-select">
                  {Object.values(TERRAIN_THEMES).map(t => (
                    <option key={t.id} value={t.id}>{t.icon} {t.name}</option>
                  ))}
                </select>
              </div>

              {/* Scenario */}
              <div className="tg-option-group">
                <span className="tg-option-label">Scenario</span>
                <select value={scenario} onChange={e => setScenario(e.target.value)} className="tg-select">
                  {SCENARIOS.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                {scenarioConfig && (
                  <span className="tg-scenario-desc">{scenarioConfig.description}</span>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button className="tg-generate-btn" onClick={doGenerate}>
              {setup ? '🔄 Regenerate' : '🎲 Generate Terrain Setup'}
            </button>
          </div>

          {/* Right column: board map + setup note */}
          <div className="tg-right-col">
            {setup ? (
              <>
                {/* Hazard note */}
                {scenarioConfig?.hazardStrip && scenarioConfig.hazardNote && (
                  <div className="tg-hazard-note">
                    ⚠️ <strong>Hazard Strip:</strong> {scenarioConfig.hazardNote}
                  </div>
                )}

                <div className="tg-board-wrap">
                  <svg
                    viewBox={`0 0 ${svgW} ${svgH}`}
                    width={svgW}
                    height={svgH}
                    className="tg-board-svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Board background */}
                    <rect x="0" y="0" width={svgW} height={svgH}
                      fill="#3a2e1e" stroke="#5a4a2e" strokeWidth="2" />

                    {/* Grid lines every 6" */}
                    {Array.from({ length: Math.floor(board.widthIn / 6) - 1 }, (_, i) => (
                      <line key={`vg${i}`}
                        x1={(i + 1) * 6 * SCALE} y1="0"
                        x2={(i + 1) * 6 * SCALE} y2={svgH}
                        stroke="#5a4a2e" strokeWidth="0.5" strokeDasharray="4,4" />
                    ))}
                    {Array.from({ length: Math.floor(board.heightIn / 6) - 1 }, (_, i) => (
                      <line key={`hg${i}`}
                        x1="0" y1={(i + 1) * 6 * SCALE}
                        x2={svgW} y2={(i + 1) * 6 * SCALE}
                        stroke="#5a4a2e" strokeWidth="0.5" strokeDasharray="4,4" />
                    ))}

                    {/* Hazard strip */}
                    {scenarioConfig?.hazardStrip && (
                      <rect
                        x="0"
                        y={(board.heightIn / 2 - 2) * SCALE}
                        width={svgW}
                        height={4 * SCALE}
                        fill="rgba(180,60,60,0.22)"
                        stroke="rgba(220,60,60,0.7)"
                        strokeWidth="1.5"
                        strokeDasharray="6,3"
                      />
                    )}

                    {/* Deployment zones */}
                    <rect x="0" y="0" width={svgW} height={deployH}
                      fill="rgba(64,140,255,0.13)"
                      stroke="rgba(64,140,255,0.7)" strokeWidth="1.5" strokeDasharray="8,4" />
                    <text
                      x={svgW / 2} y={deployH / 2}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="rgba(130,180,255,0.9)" fontSize="8" fontFamily="sans-serif"
                    >Player 2 Deployment ({board.deploymentDepthIn}")</text>

                    <rect x="0" y={svgH - deployH} width={svgW} height={deployH}
                      fill="rgba(255,130,60,0.13)"
                      stroke="rgba(255,130,60,0.7)" strokeWidth="1.5" strokeDasharray="8,4" />
                    <text
                      x={svgW / 2} y={svgH - deployH / 2}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="rgba(255,180,130,0.9)" fontSize="8" fontFamily="sans-serif"
                    >Player 1 Deployment ({board.deploymentDepthIn}")</text>

                    {/* Board center marker */}
                    <line
                      x1="0" y1={svgH / 2}
                      x2={svgW} y2={svgH / 2}
                      stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

                    {/* Terrain pieces */}
                    {setup.map(pt => {
                      const pW = (pt.rotated ? pt.type.heightIn : pt.type.widthIn)  * SCALE;
                      const pH = (pt.rotated ? pt.type.widthIn  : pt.type.heightIn) * SCALE;
                      const cx = pt.x * SCALE + pW / 2;
                      const cy = pt.y * SCALE + pH / 2;

                      if (pt.type.shape === 'circle') {
                        const r = Math.min(pW, pH) / 2;
                        return (
                          <g key={pt.label}>
                            <circle cx={cx} cy={cy} r={r}
                              fill={pt.type.color}
                              stroke={pt.type.borderColor} strokeWidth="1.5" />
                            <text x={cx} y={cy}
                              textAnchor="middle" dominantBaseline="middle"
                              fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif"
                            >{pt.label}</text>
                          </g>
                        );
                      }

                      return (
                        <g key={pt.label}>
                          <rect
                            x={pt.x * SCALE} y={pt.y * SCALE}
                            width={pW} height={pH}
                            fill={pt.type.color}
                            stroke={pt.type.borderColor} strokeWidth="1.5" rx="2" />
                          <text x={cx} y={cy}
                            textAnchor="middle" dominantBaseline="middle"
                            fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif"
                          >{pt.label}</text>
                        </g>
                      );
                    })}
                  </svg>

                  <div className="tg-map-key">
                    <span className="tg-map-key-p1">🟠 Player 1 deployment ({board.deploymentDepthIn}")</span>
                    <span className="tg-map-key-p2">🔵 Player 2 deployment ({board.deploymentDepthIn}")</span>
                    {scenarioConfig?.hazardStrip && (
                      <span className="tg-map-key-hazard">🔴 Hazard strip (4" wide)</span>
                    )}
                  </div>
                </div>

                {/* Legend */}
                <div className="tg-legend">
                  <div className="tg-legend-stats">
                    <span className="tg-stat">{setup.length} pieces total</span>
                    <span className="tg-stat tg-stat-los">
                      👁 {setup.filter(p => p.type.isLOSBlocker).length} LOS blockers
                    </span>
                    <span className="tg-stat">
                      🪨 {setup.filter(p => p.type.isScatter).length} scatter
                    </span>
                  </div>
                  {setup.map(pt => {
                    const footW = pt.rotated ? pt.type.heightIn : pt.type.widthIn;
                    const footH = pt.rotated ? pt.type.widthIn  : pt.type.heightIn;
                    return (
                      <div key={pt.label} className="tg-legend-item">
                        <span
                          className="tg-legend-badge"
                          style={{ background: pt.type.color, borderColor: pt.type.borderColor }}
                        >{pt.label}</span>
                        <div className="tg-legend-body">
                          <div className="tg-legend-name-row">
                            <span className="tg-legend-name">{pt.type.name}</span>
                            {pt.type.isLOSBlocker && (
                              <span className="tg-los-badge" title="Blocks line of sight across the board">👁 LOS</span>
                            )}
                            {pt.type.isScatter && (
                              <span className="tg-scatter-badge" title="Scatter piece — breaks fire lanes">scatter</span>
                            )}
                          </div>
                          <span className="tg-legend-meta">
                            {footW}"×{footH}" · {pt.type.cover} Cover · {pt.type.elevation}
                          </span>
                          <span className="tg-legend-desc">{pt.type.description}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Setup note */}
                <div className="tg-setup-note">
                  <strong>How to use:</strong> Place each terrain piece within 1" of the position shown on the map.
                  Pieces marked in the deployment zones should be set up <em>before</em> warbands are deployed.
                  Players alternate placing one piece at a time, starting with the player who won the setup roll.
                  <br /><br />
                  <strong>Coverage guidelines:</strong> Aim for 50–70% table coverage.
                  Include at least 4–6 <em>LOS-blocking</em> pieces that completely break sight lines across the board.
                  No unobstructed line of sight should exceed 12" without a model being in an exposed position.
                </div>
              </>
            ) : (
              <div className="tg-no-map-placeholder">
                <span>🎲</span>
                <p>Configure options and click <strong>Generate Terrain Setup</strong> to create a board layout.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
