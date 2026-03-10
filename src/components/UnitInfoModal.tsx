import { UnitOption, WarbandUnit, SelectedWargear, Weapon, WargearOption, UnitUpgrade, SelectedPsychicPower, SelectedGiftOfChaos } from '../types/index.js';
import { lookupWeapon, lookupWargear } from '../data/wargearSlotValidation.js';
import { lookupPsychicPower } from '../data/psychicDisciplines.js';
import { GIFTS_OF_CHAOS } from '../data/gifts_of_chaos.js';
import { KeywordChip, KeywordList } from './KeywordChip.js';
import { SKILL_TABLE_LABELS } from '../data/campaignProgression.js';
import { isEliteEligible } from '../data/campaignProgression.js';
import './UnitInfoModal.css';

interface UnitInfoModalProps {
  unit: UnitOption;
  /**
   * When provided the modal is in "selected" mode: shows equipped wargear
   * tables and inline keyword definitions at the bottom.
   * When undefined, shows the bare unit card without wargear.
   */
  selectedWargear?: SelectedWargear[];
  /** Upgrades the warband unit has applied (key = upgradeId, value = 0|1). */
  selectedUpgrades?: Record<string, number>;
  /** Psychic powers selected for this warband unit. */
  selectedPsychicPowers?: SelectedPsychicPower[];
  /** Mutations (Gifts of Chaos) selected for this warband unit. */
  selectedGiftsOfChaos?: SelectedGiftOfChaos[];
  /** The live WarbandUnit (when viewing a recruited unit) — used to show XP/progression. */
  warbandUnit?: WarbandUnit;
  onClose: () => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function movementLabel(unit: UnitOption): string {
  // All units in this game use the Infantry movement table regardless of VEHICLE keyword.
  // VEHICLE/FLYING keywords affect cover and targeting, not the movement type name.
  const isFlying = unit.keywords.includes('FLYING');
  return `${unit.stats.movement}"/${isFlying ? 'Flying' : 'Infantry'}`;
}

function armourLabel(save?: number): string {
  if (!save || save === 0) return '—';
  return `${save}`;
}

/**
 * For "selected mode" info display: compute the effective armour save
 * by summing wargear statModifiers from the selectedWargear list
 * on top of the unit's already-resolved stats.
 * NOTE: unit.stats is already the resolved stats (from buildResolvedUnit),
 * so this label is just a display pass-through.
 */
function effectiveArmourLabel(unit: UnitOption, selectedWargear: SelectedWargear[] | undefined): string {
  const base = unit.stats.armourSave ?? 0;
  if (!selectedWargear || selectedWargear.length === 0) return armourLabel(base);
  // Check if any selected armour items contribute stat modifiers
  let extraFromSelected = 0;
  for (const sw of selectedWargear) {
    const gear = lookupWargear(sw.id);
    if (gear?.slot === 'shield' && (gear as WargearOption & { statModifiers?: { armourSave?: number } }).statModifiers?.armourSave) {
      extraFromSelected += (gear as WargearOption & { statModifiers?: { armourSave?: number } }).statModifiers!.armourSave!;
    }
  }
  const effective = base + extraFromSelected;
  if (effective === 0) return '—';
  return `${effective}`;
}

function baseSize(unit: UnitOption): string {
  if (unit.keywords.includes('VEHICLE')) return 'Large base';
  if (unit.keywords.includes('LARGE')) return '40mm';
  return '32mm';
}

/** Human-readable weapon type column (matches the spec example). */
function weaponTypeLabel(w: Weapon): string {
  if (w.type === 'thrown' || w.keywords.includes('THROWN')) return 'GRENADE';
  if (w.keywords.includes('TWO-HANDED') && w.type === 'melee') return '2H Melee';
  if (w.keywords.includes('TWO-HANDED')) return '2H Ranged';
  if (w.keywords.includes('PISTOL')) return 'Pistol';
  if (w.type === 'heavy') return '2H Ranged';
  if (w.type === 'melee') return '1H Melee';
  return '1H Ranged';
}

function weaponRangeLabel(w: Weapon): string {
  if (w.type === 'melee') return '—';
  if (w.range === undefined) return '—';
  return `${w.range}"`;
}

/** Type guard: distinguish Weapon (type is melee/ranged/heavy/thrown) from WargearOption. */
function isWeapon(item: Weapon | WargearOption): item is Weapon {
  return ['melee', 'ranged', 'heavy', 'thrown'].includes((item as Weapon).type);
}

// ── Component ────────────────────────────────────────────────────────────────

export function UnitInfoModal({ unit, selectedWargear, selectedUpgrades, selectedPsychicPowers, selectedGiftsOfChaos, warbandUnit, onClose }: UnitInfoModalProps) {
  const isSelectedMode = selectedWargear !== undefined;

  // Split equipped wargear into weapons vs battlekit
  const equippedWeapons: Array<{ sw: SelectedWargear; w: Weapon }> = [];
  const equippedBattlekit: Array<{ sw: SelectedWargear; g: WargearOption }> = [];

  if (isSelectedMode && selectedWargear) {
    for (const sw of selectedWargear) {
      const weapon = lookupWeapon(sw.id);
      if (weapon) {
        equippedWeapons.push({ sw, w: weapon });
        continue;
      }
      const gear = lookupWargear(sw.id);
      if (gear) equippedBattlekit.push({ sw, g: gear });
    }
  }

  // Separate subtype ability from regular abilities
  const subTypeAbility = unit.abilities?.find(ab => ab.id.startsWith('subtype-')) ?? null;
  const regularAbilities = unit.abilities?.filter(ab => !ab.id.startsWith('subtype-')) ?? [];

  const costLabel =
    unit.costCurrency === 'glory'
      ? `${unit.baseCost} Glory/model`
      : `${unit.baseCost} Credits/model`;

  return (
    <div className="unit-info-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="unit-info-panel">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="unit-info-header">
          <div>
            <h2 className="unit-info-title">{unit.name}</h2>
            <p className="unit-info-subtitle">
              {unit.unitType === 'elite' ? 'Elite' : 'Troop'} · {costLabel}
              {unit.minCount > 0 || unit.maxCount < 99
                ? ` · ${unit.minCount}–${unit.maxCount === 99 ? '∞' : unit.maxCount} models`
                : ''}
            </p>
            {unit.description && (
              <p className="unit-info-lore">{unit.description}</p>
            )}
          </div>
          <button className="unit-info-close" onClick={onClose}>✕</button>
        </div>

        {/* ── Scrollable body ──────────────────────────────────────── */}
        <div className="unit-info-body">

          {/* ── Sub-type rule banner (selected mode, typed units) ──── */}
          {subTypeAbility && (
            <section className="unit-info-section unit-subtype-section">
              <h3 className="unit-info-section-title unit-subtype-title">
                ⚔ Unit Type: {subTypeAbility.name}
              </h3>
              <p className="unit-subtype-rules">{subTypeAbility.description}</p>
            </section>
          )}

          {/* ── Stats table ──────────────────────────────────────── */}
          <section className="unit-info-section">
            <h3 className="unit-info-section-title">Profile</h3>
            <div className="unit-info-table-wrap">
              <table className="unit-info-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Movement</th>
                    <th>Ranged</th>
                    <th>Melee</th>
                    <th>Armour</th>
                    <th>Base</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>{unit.name}</strong></td>
                    <td>{movementLabel(unit)}</td>
                    <td>+{unit.stats.rangedSkill}</td>
                    <td>+{unit.stats.meleeSkill}</td>
                    <td>{isSelectedMode ? effectiveArmourLabel(unit, selectedWargear) : armourLabel(unit.stats.armourSave)}</td>
                    <td>{baseSize(unit)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Default Battlekit (always visible) ───────────────── */}
          {unit.defaultWargear.length > 0 && (() => {
            const defWeapons = unit.defaultWargear.filter(isWeapon) as Weapon[];
            const defGear = unit.defaultWargear.filter(item => !isWeapon(item)) as WargearOption[];
            return (
              <>
                {defWeapons.length > 0 && (
                  <section className="unit-info-section unit-default-kit-section">
                    <h3 className="unit-info-section-title">
                      Default Battlekit
                      <span className="unit-default-kit-badge">Included in cost</span>
                    </h3>
                    <div className="unit-info-table-wrap">
                      <table className="unit-info-table">
                        <thead>
                          <tr>
                            <th>Weapon</th>
                            <th>Type</th>
                            <th>Range</th>
                            <th>Rules</th>
                          </tr>
                        </thead>
                        <tbody>
                          {defWeapons.map(w => (
                            <tr key={w.id}>
                              <td><strong>{w.name}</strong></td>
                              <td><span className={`weapon-type-badge type-${w.type}`}>{weaponTypeLabel(w)}</span></td>
                              <td>{weaponRangeLabel(w)}</td>
                              <td className="keywords-cell"><KeywordList keywords={w.keywords} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {defWeapons.some(w => w.description) && (
                      <ul className="unit-info-abilities unit-default-kit-notes">
                        {defWeapons.filter(w => w.description).map(w => (
                          <li key={`${w.id}-desc`}><strong>{w.name}:</strong> {w.description}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                )}
                {defGear.length > 0 && (
                  <section className="unit-info-section unit-default-kit-section">
                    {defWeapons.length === 0 && (
                      <h3 className="unit-info-section-title">
                        Default Battlekit
                        <span className="unit-default-kit-badge">Included in cost</span>
                      </h3>
                    )}
                    <ul className="unit-info-abilities">
                      {defGear.map(g => (
                        <li key={g.id}>
                          <strong>{g.name}.</strong>{' '}
                          {g.description ?? (g.keywords.length
                            ? <KeywordList keywords={g.keywords} hide={new Set()} />
                            : '')}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            );
          })()}

          {/* ── Equipped Weapons (selected mode only) ────────────── */}
          {isSelectedMode && equippedWeapons.length > 0 && (
            <section className="unit-info-section">
              <h3 className="unit-info-section-title">Weapons</h3>
              <div className="unit-info-table-wrap">
                <table className="unit-info-table">
                  <thead>
                    <tr>
                      <th>Weapon</th>
                      <th>Type</th>
                      <th>Range</th>
                      <th>Rules</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equippedWeapons.map(({ sw, w }) => (
                      <tr key={sw.id}>
                        <td><strong>{w.name}</strong>{sw.quantity > 1 ? ` ×${sw.quantity}` : ''}</td>
                        <td><span className={`weapon-type-badge type-${w.type}`}>{weaponTypeLabel(w)}</span></td>
                        <td>{weaponRangeLabel(w)}</td>
                        <td className="keywords-cell"><KeywordList keywords={w.keywords} /></td>
                        <td>{sw.cost * sw.quantity} {sw.costCurrency === 'glory' ? 'Glory' : 'Credits'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── Equipped Battlekit (selected mode only) ──────────── */}
          {isSelectedMode && equippedBattlekit.length > 0 && (
            <section className="unit-info-section">
              <h3 className="unit-info-section-title">Battlekit</h3>
              <div className="unit-info-table-wrap">
                <table className="unit-info-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Slot</th>
                      <th>Keywords</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equippedBattlekit.map(({ sw, g }) => (
                      <tr key={sw.id}>
                        <td><strong>{g.name}</strong>{sw.quantity > 1 ? ` ×${sw.quantity}` : ''}</td>
                        <td>{g.type === 'armor' ? 'Armour' : 'Equipment'}</td>
                        <td>{g.slot ?? '—'}</td>
                        <td className="keywords-cell"><KeywordList keywords={g.keywords} /></td>
                        <td>{sw.cost * sw.quantity} {sw.costCurrency === 'glory' ? 'Glory' : 'Credits'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── Applied Upgrades (warband unit, selected mode) ─────── */}
          {selectedUpgrades && Object.values(selectedUpgrades).some(cnt => cnt > 0) && (() => {
            const activeUpgs = (unit.upgrades ?? [] as UnitUpgrade[]).filter(
              (upg: UnitUpgrade) => (selectedUpgrades[upg.id] ?? 0) > 0
            );
            if (activeUpgs.length === 0) return null;
            return (
              <section className="unit-info-section unit-upgrade-section">
                <h3 className="unit-info-section-title unit-upgrade-section-title">⬆ Applied Upgrade</h3>
                {activeUpgs.map((upg: UnitUpgrade) => (
                  <div key={upg.id} className="unit-upgrade-card">
                    <div className="unit-upgrade-card-header">
                      <span className="unit-upgrade-card-name">{upg.name}</span>
                      <span className="unit-upgrade-card-cost">+{upg.cost} Credits</span>
                    </div>
                    {upg.grantedKeywords && upg.grantedKeywords.length > 0 && (
                      <div className="unit-upgrade-keywords">
                        <span className="unit-upgrade-kw-label">Grants:</span>
                        {upg.grantedKeywords.map(kw => (
                          <KeywordChip key={kw} keyword={kw} className="unit-upgrade-kw-chip" />
                        ))}
                      </div>
                    )}
                    <p className="unit-upgrade-description">{upg.description}</p>
                  </div>
                ))}
              </section>
            );
          })()}

          {/* ── Psychic Powers (warband unit, selected mode) ──────────── */}
          {selectedPsychicPowers && selectedPsychicPowers.length > 0 && (
            <section className="unit-info-section unit-psychic-section">
              <h3 className="unit-info-section-title unit-psychic-section-title">✨ Psychic Powers</h3>
              <div className="unit-psychic-list">
                {selectedPsychicPowers.map(sp => {
                  const full = lookupPsychicPower(sp.disciplineId, sp.id);
                  return (
                    <div key={sp.id} className="unit-psychic-card">
                      <div className="unit-psychic-card-header">
                        <span className="unit-psychic-card-name">{sp.name}</span>
                        <span className="unit-psychic-card-meta">
                          {sp.disciplineName} · +{sp.cost}{sp.costCurrency === 'glory' ? ' Glory' : ' Cr'}
                        </span>
                      </div>
                      {full && (
                        <>
                          <div className="unit-psychic-card-stats">
                            <span><strong>Type:</strong> {full.powerType}</span>
                            <span><strong>Range:</strong> {full.range}</span>
                            <span><strong>Target:</strong> {full.target}</span>
                            <span><strong>Timing:</strong> {full.timing}</span>
                          </div>
                          <p className="unit-psychic-card-desc">{full.description}</p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Mutations / Gifts of Chaos ────────────────────────────── */}
          {selectedGiftsOfChaos && selectedGiftsOfChaos.length > 0 && (
            <section className="unit-info-section unit-mutations-section">
              <h3 className="unit-info-section-title unit-mutations-section-title">☣ Mutations</h3>
              <div className="unit-mutations-list">
                {selectedGiftsOfChaos.map(g => {
                  const full = GIFTS_OF_CHAOS.find(x => x.id === g.id);
                  const statLines: string[] = [];
                  if (full?.statModifiers?.movement)    statLines.push(`+${full.statModifiers.movement}" Movement`);
                  if (full?.statModifiers?.rangedSkill) statLines.push(`+${full.statModifiers.rangedSkill} Ranged Skill`);
                  if (full?.statModifiers?.meleeSkill)  statLines.push(`+${full.statModifiers.meleeSkill} Melee Skill`);
                  if (full?.statModifiers?.armourSave)  statLines.push(`${full.statModifiers.armourSave > 0 ? '+' : ''}${full.statModifiers.armourSave} Armour Save`);
                  return (
                    <div key={g.id} className="unit-mutation-card">
                      <div className="unit-mutation-card-header">
                        <span className="unit-mutation-card-name">{g.name}</span>
                        <span className="unit-mutation-card-meta">
                          D66: {g.diceResult} · +{g.cost}{g.costCurrency === 'glory' ? ' Glory' : ' Cr'}
                        </span>
                      </div>
                      {statLines.length > 0 && (
                        <div className="unit-mutation-stat-badges">
                          {statLines.map(s => (
                            <span key={s} className="unit-mutation-stat-badge">{s}</span>
                          ))}
                        </div>
                      )}
                      {(full?.grantedKeywords?.length ?? 0) > 0 && (
                        <div className="unit-mutation-kw-row">
                          <span className="unit-mutation-kw-label">Grants:</span>
                          {full!.grantedKeywords!.map(kw => (
                            <KeywordChip key={kw} keyword={kw} className="unit-mutation-kw-chip" />
                          ))}
                        </div>
                      )}
                      {full?.description && (
                        <p className="unit-mutation-card-desc">{full.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Elite Progression (recruited unit only) ─────────── */}
          {warbandUnit && isEliteEligible(warbandUnit) && (
            <section className="unit-info-section unit-elite-progression-section">
              <h3 className="unit-info-section-title unit-elite-progression-title">
                ★ Elite Progression
              </h3>
              <div className="unit-ep-xp-row">
                <span className="unit-ep-xp-label">Experience Points (XP)</span>
                <span className="unit-ep-xp-value">{warbandUnit.xp ?? 0}</span>
                {warbandUnit.isPromoted && (
                  <span className="unit-ep-promoted-badge">Promoted</span>
                )}
              </div>

              {(warbandUnit.campaignSkills?.length ?? 0) > 0 && (
                <div className="unit-ep-subsection">
                  <h4 className="unit-ep-sub-title">Campaign Skills</h4>
                  <ul className="unit-ep-list">
                    {warbandUnit.campaignSkills!.map(s => (
                      <li key={s.id} className="unit-ep-item">
                        <div className="unit-ep-item-header">
                          <span className="unit-ep-item-name">{s.name}</span>
                          <span className="unit-ep-item-tag">{SKILL_TABLE_LABELS[s.table]} — roll {s.roll}</span>
                        </div>
                        <p className="unit-ep-item-desc">{s.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(warbandUnit.battleScars?.length ?? 0) > 0 && (
                <div className="unit-ep-subsection">
                  <h4 className="unit-ep-sub-title">Battle Scars</h4>
                  <ul className="unit-ep-list">
                    {warbandUnit.battleScars!.map(s => (
                      <li key={s.id} className="unit-ep-item">
                        <div className="unit-ep-item-header">
                          <span className="unit-ep-item-name">{s.name}</span>
                        </div>
                        <p className="unit-ep-item-desc">{s.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(warbandUnit.traumas?.length ?? 0) > 0 && (
                <div className="unit-ep-subsection">
                  <h4 className="unit-ep-sub-title">Traumas</h4>
                  <ul className="unit-ep-list">
                    {warbandUnit.traumas!.map(t => (
                      <li key={t.id} className="unit-ep-item">
                        <div className="unit-ep-item-header">
                          <span className="unit-ep-item-name">{t.name}</span>
                        </div>
                        <p className="unit-ep-item-desc">{t.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* ── Abilities ────────────────────────────────────────── */}
          {regularAbilities.length > 0 && (
            <section className="unit-info-section">
              <h3 className="unit-info-section-title">Abilities</h3>
              <ul className="unit-info-abilities">
                {regularAbilities.map(ab => (
                  <li key={ab.id}>
                    <strong>{ab.name}.</strong> {ab.description}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Keywords ─────────────────────────────────────────── */}
          <section className="unit-info-section">
            <h3 className="unit-info-section-title">Keywords</h3>
            <div className="unit-info-keywords">
              {unit.keywords.map(kw => (
                <KeywordChip key={kw} keyword={kw} className="unit-kw-tag" />
              ))}
            </div>
          </section>

        </div>{/* /unit-info-body */}
      </div>
    </div>
  );
}
