import { useState, useCallback, useMemo } from 'react';
import { flushSync } from 'react-dom';
import type { ReactNode } from 'react';
import { Warband, UnitOption, WarbandUnit, WarbandMercenary, SelectedWargear, WargearOption, Weapon } from '../types/index.js';
import { lookupWeapon, lookupWargear } from '../data/wargearSlotValidation.js';
import { lookupPsychicPower } from '../data/psychicDisciplines.js';
import { GIFTS_OF_CHAOS } from '../data/gifts_of_chaos.js';
import { getFactionRules } from '../data/factionRules.js';
import { ALL_MERCENARIES } from '../data/mercenaries.js';
import { KeywordChip, KeywordList } from './KeywordChip.js';
import { expandKeywords } from '../data/keywordGlossary.js';
import { SKILL_TABLE_LABELS } from '../data/campaignProgression.js';
import { isEliteEligible } from '../data/campaignProgression.js';
import { calculateWarbandPoints, calculateWarbandGlory, calculateTotalModels } from '../data/validation.js';
import { getFactionById } from '../data/factions_complete.js';
import { getSubFactionById, getSubFactions } from '../data/subfactions.js';
import { EliteProgressionModal } from './EliteProgressionModal.js';
import { getAllWarbands, importWarbandFromJSON } from '../utils/export.js';
import { parseShareUrlString } from '../utils/shareUrl.js';
import './BattleMode.css';

interface BattleModeProps {
  warband: Warband;
  selectedFaction: string;
  selectedSubFaction: string;
  /** All units available to the current faction (needed to resolve unit definitions). */
  allAvailableUnits: UnitOption[];
  /** Resolves a unit option + warband unit into final computed stats. */
  buildResolvedUnit: (unitDef: UnitOption, warbandUnit: WarbandUnit) => UnitOption;
  /** Callback to update a unit's campaign data (XP, skills, scars, traumas). Syncs back to the builder. */
  onUpdateUnit: (unitIndex: number, updated: WarbandUnit) => void;
  onClose: () => void;
}

// ── Helpers (shared with UnitInfoModal) ─────────────────────────────────────

function movementType(keywords: string[]): string {
  if (keywords.includes('FLYING')) return 'Flying';
  if (keywords.includes('VEHICLE')) return 'Vehicle';
  return 'Infantry';
}

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

function isWeapon(item: Weapon | WargearOption): item is Weapon {
  return ['melee', 'ranged', 'heavy', 'thrown'].includes((item as Weapon).type);
}

/** Renders **bold** markdown as JSX <strong> elements. */
function renderFormattedText(text: string): ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

// ── Unit Card ────────────────────────────────────────────────────────────────

function UnitCard({
  resolved,
  baseUnit,
  warbandUnit,
  onEditCampaign,
}: {
  resolved: UnitOption;
  baseUnit: UnitOption;
  warbandUnit: WarbandUnit;
  onEditCampaign: () => void;
}) {
  const base = baseUnit.stats;
  const eff = resolved.stats;
  const movDelta = eff.movement - base.movement;
  const rngDelta = eff.rangedSkill - base.rangedSkill;
  const mleDelta = eff.meleeSkill - base.meleeSkill;
  const armDelta = (eff.armourSave ?? 0) - (base.armourSave ?? 0);
  const mType = movementType(resolved.keywords);

  // Split equipped wargear
  const equippedWeapons: Array<{ sw: SelectedWargear; w: Weapon }> = [];
  const equippedBattlekit: Array<{ sw: SelectedWargear; g: WargearOption }> = [];
  for (const sw of warbandUnit.selectedWargear) {
    const weapon = lookupWeapon(sw.id);
    if (weapon) { equippedWeapons.push({ sw, w: weapon }); continue; }
    const gear = lookupWargear(sw.id);
    if (gear) equippedBattlekit.push({ sw, g: gear });
  }

  // Default battlekit
  const defWeapons = (resolved.defaultWargear ?? []).filter(isWeapon) as Weapon[];
  const allDefGear = (resolved.defaultWargear ?? []).filter(item => !isWeapon(item)) as WargearOption[];
  const defGear = allDefGear.filter(g => !(g.keywords ?? []).includes('PSYCHIC'));
  const defPsychicGear = allDefGear.filter(g => (g.keywords ?? []).includes('PSYCHIC'));

  // Abilities
  const subTypeAbility = resolved.abilities?.find(ab => ab.id.startsWith('subtype-')) ?? null;
  const regularAbilities = resolved.abilities?.filter(ab => !ab.id.startsWith('subtype-')) ?? [];

  // Psychic powers
  const psychicPowers = warbandUnit.selectedPsychicPowers ?? [];

  // Gifts of Chaos
  const gifts = warbandUnit.selectedGiftsOfChaos ?? [];

  // Upgrades
  const selectedUpgrades = warbandUnit.selectedUpgrades ?? {};

  const displayName = warbandUnit.customName
    ? `${warbandUnit.customName} (${warbandUnit.name})`
    : warbandUnit.name;

  return (
    <div className="bm-card">
      {/* Header */}
      <div className="bm-card-header">
        <div className="bm-card-header-left">
          <h3 className="bm-card-name">{displayName}</h3>
          <span className="bm-card-meta">
            {resolved.unitType === 'elite' ? 'Elite' : 'Troop'} · ×{warbandUnit.count} · {warbandUnit.totalCost} Credits
          </span>
        </div>
        {warbandUnit.isPromoted && <span className="bm-promoted-badge">★ Promoted</span>}
      </div>

      {/* Sub-type banner */}
      {subTypeAbility && (
        <div className="bm-subtype-banner">
          <strong>{subTypeAbility.name}:</strong> {subTypeAbility.description}
        </div>
      )}

      {/* Stats table */}
      <table className="bm-stats-table">
        <thead>
          <tr>
            <th>Movement</th>
            <th>Ranged</th>
            <th>Melee</th>
            <th>Armour</th>
            <th>Base</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {base.movement}"
              {movDelta !== 0 && (
                <span className={`bm-delta ${movDelta > 0 ? 'bm-delta--pos' : 'bm-delta--neg'}`}>
                  {movDelta > 0 ? `(+${movDelta}")` : `(−${Math.abs(movDelta)}")`}
                </span>
              )}
              <span className="bm-move-type">/{mType}</span>
            </td>
            <td>
              {base.rangedSkill >= 0 ? `+${base.rangedSkill}` : `${base.rangedSkill}`}
              {rngDelta !== 0 && (
                <span className={`bm-delta ${rngDelta > 0 ? 'bm-delta--pos' : 'bm-delta--neg'}`}>
                  {rngDelta > 0 ? `(+${rngDelta})` : `(−${Math.abs(rngDelta)})`}
                </span>
              )}
            </td>
            <td>
              {base.meleeSkill >= 0 ? `+${base.meleeSkill}` : `${base.meleeSkill}`}
              {mleDelta !== 0 && (
                <span className={`bm-delta ${mleDelta > 0 ? 'bm-delta--pos' : 'bm-delta--neg'}`}>
                  {mleDelta > 0 ? `(+${mleDelta})` : `(−${Math.abs(mleDelta)})`}
                </span>
              )}
            </td>
            <td>
              {(base.armourSave ?? 0) !== 0 || armDelta !== 0 ? (base.armourSave ?? 0) : '—'}
              {armDelta !== 0 && (
                <span className={`bm-delta ${armDelta < 0 ? 'bm-delta--pos' : 'bm-delta--neg'}`}>
                  {armDelta < 0 ? `(${armDelta})` : `(+${armDelta})`}
                </span>
              )}
            </td>
            <td>{resolved.baseSize ?? '32mm'}</td>
          </tr>
        </tbody>
      </table>

      {/* Default Battlekit weapons */}
      {defWeapons.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">Default Battlekit</h4>
          <table className="bm-weapons-table">
            <thead>
              <tr><th>Weapon</th><th>Type</th><th>Range</th><th>Rules</th></tr>
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
          {defWeapons.some(w => w.description) && (
            <ul className="bm-notes">
              {defWeapons.filter(w => w.description).map(w => (
                <li key={`${w.id}-desc`}><strong>{w.name}:</strong> {w.description}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Default gear */}
      {defGear.length > 0 && (
        <div className="bm-section">
          {defWeapons.length === 0 && <h4 className="bm-section-title">Default Battlekit</h4>}
          <ul className="bm-gear-list">
            {defGear.map(g => (
              <li key={g.id}>
                <strong>{g.name}.</strong>{' '}
                {g.description ?? (g.keywords.length ? <KeywordList keywords={g.keywords} /> : '')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Equipped weapons */}
      {equippedWeapons.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">Equipped Weapons</h4>
          <table className="bm-weapons-table">
            <thead>
              <tr><th>Weapon</th><th>Type</th><th>Range</th><th>Rules</th></tr>
            </thead>
            <tbody>
              {equippedWeapons.map(({ sw, w }) => (
                <tr key={sw.id}>
                  <td><strong>{w.name}</strong>{sw.quantity > 1 ? ` ×${sw.quantity}` : ''}</td>
                  <td><span className={`weapon-type-badge type-${w.type}`}>{weaponTypeLabel(w)}</span></td>
                  <td>{weaponRangeLabel(w)}</td>
                  <td className="keywords-cell"><KeywordList keywords={w.keywords} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Equipped battlekit */}
      {equippedBattlekit.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">Equipped Battlekit</h4>
          <ul className="bm-gear-list">
            {equippedBattlekit.map(({ sw, g }) => (
              <li key={sw.id}>
                <strong>{g.name}.</strong>{' '}
                {g.description ?? (g.keywords.length ? <KeywordList keywords={g.keywords} /> : '')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Applied upgrades */}
      {Object.values(selectedUpgrades).some(c => c > 0) && (() => {
        const activeUpgs = (resolved.upgrades ?? []).filter(upg => (selectedUpgrades[upg.id] ?? 0) > 0);
        if (activeUpgs.length === 0) return null;
        return (
          <div className="bm-section">
            <h4 className="bm-section-title">⬆ Upgrades</h4>
            {activeUpgs.map(upg => (
              <div key={upg.id} className="bm-upgrade-item">
                <strong>{upg.name}</strong>
                {upg.grantedKeywords && upg.grantedKeywords.length > 0 && (
                  <span className="bm-upgrade-kws">
                    {upg.grantedKeywords.map(kw => (
                      <KeywordChip key={kw} keyword={kw} className="bm-kw-chip" />
                    ))}
                  </span>
                )}
                <p className="bm-upgrade-desc">{upg.description}</p>
              </div>
            ))}
          </div>
        );
      })()}

      {/* Innate psychic abilities from default battlekit */}
      {defPsychicGear.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">✨ Innate Psychic Powers</h4>
          {defPsychicGear.map(g => (
            <div key={g.id} className="bm-psychic-card">
              <div className="bm-psychic-header">
                <strong>{g.name}</strong>
                <span className="bm-psychic-meta">Innate · Included in cost</span>
              </div>
              {g.description && <p className="bm-psychic-desc">{g.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Psychic powers */}
      {psychicPowers.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">✨ Psychic Powers</h4>
          {psychicPowers.map(sp => {
            const full = lookupPsychicPower(sp.disciplineId, sp.id);
            return (
              <div key={sp.id} className="bm-psychic-card">
                <div className="bm-psychic-header">
                  <strong>{sp.name}</strong>
                  {full && <span className="bm-psychic-meta">{full.powerType} · {full.range} · {full.target}</span>}
                </div>
                {full && <p className="bm-psychic-desc">{full.description}</p>}
              </div>
            );
          })}
        </div>
      )}

      {/* Gifts of Chaos */}
      {gifts.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">☣ Mutations</h4>
          {gifts.map(g => {
            const full = GIFTS_OF_CHAOS.find(x => x.id === g.id);
            return (
              <div key={g.id} className="bm-mutation-item">
                <strong>{g.name}</strong>
                {full?.description && <p className="bm-mutation-desc">{full.description}</p>}
              </div>
            );
          })}
        </div>
      )}

      {/* Elite Progression */}
      {isEliteEligible(warbandUnit) && (
        <div className="bm-section">
          <h4 className="bm-section-title">
            ★ Elite Progression — XP: {warbandUnit.xp ?? 0}
            <button className="bm-edit-campaign-btn" onClick={onEditCampaign} title="Edit XP, Skills, Battle Scars, and Traumas">✎ Edit</button>
          </h4>
          {(warbandUnit.campaignSkills?.length ?? 0) > 0 && (
            <ul className="bm-progression-list">
              {warbandUnit.campaignSkills!.map(s => (
                <li key={s.id}>
                  <strong>{s.name}</strong> ({SKILL_TABLE_LABELS[s.table]}): {s.description}
                </li>
              ))}
            </ul>
          )}
          {(warbandUnit.battleScars?.length ?? 0) > 0 && (
            <ul className="bm-progression-list bm-scars">
              {warbandUnit.battleScars!.map(s => (
                <li key={s.id}><strong>Scar — {s.name}:</strong> {s.description}</li>
              ))}
            </ul>
          )}
          {(warbandUnit.traumas?.length ?? 0) > 0 && (
            <ul className="bm-progression-list bm-traumas">
              {warbandUnit.traumas!.map(t => (
                <li key={t.id}><strong>Trauma — {t.name}:</strong> {t.description}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Abilities */}
      {regularAbilities.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">Abilities</h4>
          <ul className="bm-abilities-list">
            {regularAbilities.map(ab => (
              <li key={ab.id}><strong>{ab.name}.</strong> {ab.description}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Keywords */}
      <div className="bm-keywords-row">
        {resolved.keywords.map(kw => (
          <KeywordChip key={kw} keyword={kw} className="bm-kw-chip" />
        ))}
      </div>
    </div>
  );
}

// ── Mercenary Card ───────────────────────────────────────────────────────────

function MercenaryCard({ wm }: { wm: WarbandMercenary }) {
  const def = ALL_MERCENARIES.find(m => m.id === wm.mercenaryId);
  if (!def) return null;

  // Resolve recruit option overrides
  const activeOption = def.recruitOptions?.find(o => o.id === wm.selectedRecruitOptionId);
  const stats = activeOption?.statsOverride
    ? { ...def.stats, ...activeOption.statsOverride }
    : def.stats;
  const weapons = activeOption?.weaponsOverride ?? def.weapons;
  const abilities = activeOption?.abilitiesOverride ?? def.abilities;
  const psychicPowers = activeOption?.psychicPowersOverride ?? def.psychicPowers;
  const keywords = [
    ...(def.keywords ?? []),
    ...(activeOption?.keywordsAdd ?? []),
  ];

  // Resolve mercenary upgrades
  const activeUpgrades = (wm.selectedUpgrades ?? [])
    .map(uid => def.mercUpgrades?.find(u => u.id === uid))
    .filter(Boolean);

  return (
    <div className="bm-card bm-merc-card">
      <div className="bm-card-header">
        <div className="bm-card-header-left">
          <h3 className="bm-card-name">{def.name}</h3>
          <span className="bm-card-meta">
            Mercenary · {def.subcategory} · ×{wm.count} · {wm.gloryCost} Glory
          </span>
        </div>
      </div>

      {activeOption && (
        <div className="bm-subtype-banner">
          <strong>{activeOption.label}:</strong> {activeOption.description}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="bm-merc-stats-row">
          {[
            { label: 'MOVEMENT', value: stats.movement },
            { label: 'RANGED', value: stats.ranged },
            { label: 'MELEE', value: stats.melee },
            { label: 'ARMOUR', value: stats.armour },
            { label: 'BASE', value: stats.base },
          ].map(({ label, value }) => (
            <div key={label} className="bm-merc-stat-cell">
              <div className="bm-merc-stat-label">{label}</div>
              <div className="bm-merc-stat-value">{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Weapons */}
      {weapons && weapons.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">Battlekit</h4>
          <table className="bm-weapons-table bm-merc-weapons">
            <thead>
              <tr><th>Name</th><th>Profile / Rules</th></tr>
            </thead>
            <tbody>
              {weapons.map((w, i) => (
                <tr key={i}>
                  <td><strong>{w.name}</strong></td>
                  <td>{w.profile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upgrades */}
      {activeUpgrades.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">Upgrades</h4>
          <ul className="bm-abilities-list">
            {activeUpgrades.map(u => (
              <li key={u!.id}><strong>{u!.label}.</strong> {u!.description}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Abilities */}
      {abilities && abilities.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">Abilities</h4>
          <ul className="bm-abilities-list">
            {abilities.map((ab, i) => (
              <li key={i}><strong>{ab.name}.</strong> {ab.description}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Psychic powers */}
      {psychicPowers && psychicPowers.length > 0 && (
        <div className="bm-section">
          <h4 className="bm-section-title">✨ Psychic Powers</h4>
          <ul className="bm-abilities-list">
            {psychicPowers.map((p, i) => (
              <li key={i}><strong>{p.name}.</strong> {p.description}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Keywords */}
      {keywords.length > 0 && (
        <div className="bm-keywords-row">
          {keywords.map(kw => (
            <KeywordChip key={kw} keyword={kw} className="bm-kw-chip" />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Battle Mode Component ───────────────────────────────────────────────

/**
 * Lightweight unit resolver for opponent armies — mirrors the core logic of
 * ArmyBuilder.buildResolvedUnit but works for any faction without closures.
 */
function resolveOpponentUnit(unitDef: UnitOption, wu: WarbandUnit): UnitOption {
  const sub = wu.appliedSubType;
  const mods = sub?.statModifiers ?? {};

  const defaultArmourMod = ((unitDef.defaultWargear ?? []) as Array<{ statModifiers?: { armourSave?: number } }>)
    .reduce((sum, item) => sum + (item.statModifiers?.armourSave ?? 0), 0);
  const selectedArmourMod = wu.selectedWargear.reduce((sum, sw) => {
    const r = lookupWargear(sw.id);
    return sum + ((r as WargearOption & { statModifiers?: { armourSave?: number } })?.statModifiers?.armourSave ?? 0);
  }, 0);
  const hasSelectedBodyArmour = wu.selectedWargear.some(sw => lookupWargear(sw.id)?.slot === 'body-armour');
  const bareArmourSave = (unitDef.stats.armourSave ?? 0) - defaultArmourMod;
  const effectiveBodyArmour = hasSelectedBodyArmour ? selectedArmourMod : defaultArmourMod + selectedArmourMod;

  const movOverride = wu.selectedWargear.find(sw => {
    const r = lookupWargear(sw.id);
    return (r?.movementOverride != null) || (sw.movementOverride != null);
  });
  const wargearMovOverride = movOverride
    ? (lookupWargear(movOverride.id)?.movementOverride ?? movOverride.movementOverride ?? null)
    : null;
  const wargearMovBonus = wu.selectedWargear.reduce((s, sw) =>
    s + (lookupWargear(sw.id)?.statModifiers?.movement ?? sw.statModifiers?.movement ?? 0), 0);
  const wargearRngBonus = wu.selectedWargear.reduce((s, sw) =>
    s + (lookupWargear(sw.id)?.statModifiers?.rangedSkill ?? sw.statModifiers?.rangedSkill ?? 0), 0);
  const wargearMleBonus = wu.selectedWargear.reduce((s, sw) =>
    s + (lookupWargear(sw.id)?.statModifiers?.meleeSkill ?? sw.statModifiers?.meleeSkill ?? 0), 0);

  const upgradeMods = (unitDef.upgrades ?? [])
    .filter(upg => ((wu.selectedUpgrades ?? {})[upg.id] ?? 0) > 0)
    .reduce((acc, upg) => {
      const m = upg.statModifiers ?? {};
      return {
        movement:    (acc.movement ?? 0) + (m.movement ?? 0),
        rangedSkill: (acc.rangedSkill ?? 0) + (m.rangedSkill ?? 0),
        meleeSkill:  (acc.meleeSkill ?? 0) + (m.meleeSkill ?? 0),
        armourSave:  (acc.armourSave ?? 0) + (m.armourSave ?? 0),
      };
    }, {} as Partial<{ movement: number; rangedSkill: number; meleeSkill: number; armourSave: number }>);

  const activeGifts = (wu.selectedGiftsOfChaos ?? []).map(sg => GIFTS_OF_CHAOS.find(g => g.id === sg.id)).filter(Boolean);
  const giftMods = activeGifts.reduce((acc, g) => {
    const m = g!.statModifiers ?? {};
    return {
      movement:    (acc.movement ?? 0) + (m.movement ?? 0),
      rangedSkill: (acc.rangedSkill ?? 0) + (m.rangedSkill ?? 0),
      meleeSkill:  (acc.meleeSkill ?? 0) + (m.meleeSkill ?? 0),
      armourSave:  (acc.armourSave ?? 0) + (m.armourSave ?? 0),
    };
  }, {} as Partial<{ movement: number; rangedSkill: number; meleeSkill: number; armourSave: number }>);

  const effectiveStats = {
    movement: wargearMovOverride != null
      ? wargearMovOverride + (giftMods.movement ?? 0)
      : unitDef.stats.movement + (mods.movement ?? 0) + wargearMovBonus + (upgradeMods.movement ?? 0) + (giftMods.movement ?? 0),
    rangedSkill: unitDef.stats.rangedSkill + (mods.rangedSkill ?? 0) + wargearRngBonus + (upgradeMods.rangedSkill ?? 0) + (giftMods.rangedSkill ?? 0),
    meleeSkill:  unitDef.stats.meleeSkill + (mods.meleeSkill ?? 0) + wargearMleBonus + (upgradeMods.meleeSkill ?? 0) + (giftMods.meleeSkill ?? 0),
    armourSave:  bareArmourSave + effectiveBodyArmour + (mods.armourSave ?? 0) + (upgradeMods.armourSave ?? 0) + (giftMods.armourSave ?? 0),
    toughness:   mods.toughness ?? unitDef.stats.toughness,
  };

  const wargearGrantedKeywords = wu.selectedWargear.flatMap(sw => lookupWargear(sw.id)?.grantsKeywords ?? sw.grantsKeywords ?? []);
  const giftGrantedKeywords = activeGifts.flatMap(g => g!.grantedKeywords ?? []);
  const baseKeywords = wu.keywords.length > 0 ? wu.keywords : unitDef.keywords;
  const resolvedKeywords = [...new Set([...baseKeywords, ...wargearGrantedKeywords, ...giftGrantedKeywords])];

  const upgradeAbilities = (unitDef.upgrades ?? [])
    .filter(upg => ((wu.selectedUpgrades ?? {})[upg.id] ?? 0) > 0)
    .map(upg => ({ id: `upgrade-${upg.id}`, name: `⬆ ${upg.name}`, description: upg.description, type: 'passive' as const }));
  const wargearGrantedAbilities = wu.selectedWargear.flatMap(sw => {
    const r = lookupWargear(sw.id);
    return (r?.grantsAbilities ?? []).map(a => ({
      id: `wargear-${sw.id}-${a.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: a.name, description: a.description, type: 'passive' as const,
    }));
  });
  const subfactionRuleAbilities = wu.selectedWargear
    .filter(sw => sw.isSubfactionRule && sw.description)
    .map(sw => ({ id: `subfaction-${sw.id}`, name: sw.name, description: sw.description!, type: 'passive' as const }));
  const giftAbilities = activeGifts.map(g => ({
    id: `gift-${g!.id}`, name: `☣ ${g!.name}`, description: g!.description, type: 'passive' as const,
  }));

  const allAbilities = [...subfactionRuleAbilities, ...upgradeAbilities, ...wargearGrantedAbilities, ...giftAbilities, ...(unitDef.abilities ?? [])];

  if (sub) {
    allAbilities.unshift({ id: `subtype-${sub.id}`, name: sub.name, description: sub.description, type: 'passive' as const });
  }

  return { ...unitDef, keywords: resolvedKeywords, stats: effectiveStats, abilities: allAbilities };
}

/** Get all available units for a faction (including subfaction units). */
function getOpponentUnits(wb: Warband): UnitOption[] {
  const fac = getFactionById(wb.faction);
  if (!fac) return [];
  const baseUnits = fac.units;
  // Also include subfaction-specific units
  if (wb.subfaction) {
    const subfacs = getSubFactions(wb.faction);
    if (subfacs) {
      const sf = subfacs.subFactions.find(s => s.id === wb.subfaction);
      if (sf?.extraUnits) return [...baseUnits, ...sf.extraUnits];
    }
  }
  return baseUnits;
}

export function BattleMode({
  warband,
  selectedFaction,
  selectedSubFaction,
  allAvailableUnits,
  buildResolvedUnit,
  onUpdateUnit,
  onClose,
}: BattleModeProps) {
  // Use warband's own faction/subfaction to ensure we never show stale/wrong rules 
  // if state propagation hasn't caught up after loading a warband.
  const activeFaction = warband.faction || selectedFaction;
  const activeSubFaction = warband.subfaction ?? selectedSubFaction;

  const factionRules = getFactionRules(activeFaction);
  const factionDef = getFactionById(activeFaction);
  const subFactionDef = getSubFactionById(activeFaction, activeSubFaction);

  // Compute live totals instead of relying on stale warband.totalPoints/totalModels
  const livePoints = calculateWarbandPoints(warband);
  const liveModels = calculateTotalModels(warband);

  // Elite progression modal state
  const [eliteProgressionIdx, setEliteProgressionIdx] = useState<number | null>(null);

  // Side-panel toggles for rules
  const [showFactionRules, setShowFactionRules] = useState(false);
  const [showWarbandRules, setShowWarbandRules] = useState(false);

  // ── Matchup (opponent) state ──────────────────────────────────────────
  const [opponent, setOpponent] = useState<Warband | null>(null);
  const [showMatchupLoader, setShowMatchupLoader] = useState(false);
  const [matchupTab, setMatchupTab] = useState<'paste' | 'library'>('paste');
  const [matchupViewTab, setMatchupViewTab] = useState<'mine' | 'opponent'>('mine');
  const [matchupPaste, setMatchupPaste] = useState('');
  const [matchupError, setMatchupError] = useState('');
  const [savedWarbands] = useState(() => getAllWarbands());

  const opponentUnits = useMemo(() => opponent ? getOpponentUnits(opponent) : [], [opponent]);
  const opponentFaction = opponent ? getFactionById(opponent.faction) : null;
  const opponentPoints = opponent ? calculateWarbandPoints(opponent) : 0;
  const opponentGlory = opponent ? calculateWarbandGlory(opponent) : 0;
  const opponentModels = opponent ? calculateTotalModels(opponent) : 0;

  const handleLoadOpponentPaste = async () => {
    setMatchupError('');
    const text = matchupPaste.trim();
    if (!text) return;
    if (text.includes('#share=')) {
      const payload = await parseShareUrlString(text);
      if (payload?.warband) { setOpponent(payload.warband); setShowMatchupLoader(false); return; }
    }
    const wb = importWarbandFromJSON(text);
    if (wb) { setOpponent(wb); setShowMatchupLoader(false); return; }
    setMatchupError('Could not parse. Paste a share link or .md/.thjson content.');
  };

  const handleLoadOpponentLibrary = (id: string) => {
    const wb = savedWarbands.find(w => w.id === id);
    if (wb) { setOpponent(wb); setShowMatchupLoader(false); }
  };

  const opponentSorted = opponent
    ? [...opponent.units].sort((a, b) => {
        const order: Record<string, number> = { elite: 0, troop: 1 };
        return (order[a.unitType] ?? 1) - (order[b.unitType] ?? 1);
      })
    : [];

  // Print handler: force both rules panels open synchronously, print, then restore
  const handlePrint = useCallback(() => {
    const hadFaction = showFactionRules;
    const hadWarband = showWarbandRules;
    // flushSync forces React to synchronously commit DOM updates before continuing
    flushSync(() => {
      setShowFactionRules(!!factionRules);
      setShowWarbandRules(!!(subFactionDef && activeSubFaction !== 'no_variant' && subFactionDef.rules.length > 0));
    });
    window.print();
    // Restore after print dialog closes
    setShowFactionRules(hadFaction);
    setShowWarbandRules(hadWarband);
  }, [showFactionRules, showWarbandRules, factionRules, subFactionDef, activeSubFaction]);

  // Sort units: elites first, then troops
  const sortedUnits = [...warband.units].sort((a, b) => {
    const order: Record<string, number> = { elite: 0, troop: 1 };
    return (order[a.unitType] ?? 1) - (order[b.unitType] ?? 1);
  });

  // Build display name: prefer subfaction name, then faction display name, then raw faction id
  const factionDisplayName = warband.subfactionName ?? factionDef?.name ?? warband.faction;

  return (
    <div className="bm-overlay">
      <div className="bm-container">

        {/* Header */}
        <header className="bm-header">
          <div className="bm-header-left">
            <h1 className="bm-title">⚔ Battle Mode</h1>
            <p className="bm-subtitle">
                {warband.name} — {factionDisplayName} — {livePoints}/{warband.pointLimit || 700} Credits · {liveModels} Models
              </p>
            </div>
            <div className="bm-header-actions">
              <button
                className={`bm-matchup-btn ${opponent ? 'bm-matchup-btn--active' : ''}`}
                onClick={() => {
                  if (opponent) { setOpponent(null); }
                  else { setShowMatchupLoader(v => !v); }
                }}
                title={opponent ? 'Close opponent view' : 'Load opponent army for matchup'}
              >
                {opponent ? '⚔ Clear Matchup' : '⚔ Matchup'}
              </button>
              <button className="bm-print-btn" onClick={handlePrint} title="Print / Save as PDF">
                🖨 Print
              </button>
              <button className="bm-close-btn" onClick={onClose} title="Exit Battle Mode">
                ✕ Exit
              </button>
            </div>
          </header>

          {/* Side buttons for rules panels */}
          <div className="bm-rules-side-buttons">
            {factionRules && (
              <button
                className={`bm-rules-side-btn ${showFactionRules ? 'bm-rules-side-btn--active' : ''}`}
                onClick={() => { setShowFactionRules(v => !v); }}
                title="Faction Special Rules"
              >
                📜 Faction Rules
              </button>
            )}
            {subFactionDef && activeSubFaction !== 'no_variant' && subFactionDef.rules.length > 0 && (
              <button
                className={`bm-rules-side-btn bm-rules-side-btn--warband ${showWarbandRules ? 'bm-rules-side-btn--active' : ''}`}
                onClick={() => { setShowWarbandRules(v => !v); }}
                title="Warband Variant Rules"
              >
                🛡 Warband Rules
              </button>
            )}
          </div>

          {/* Faction Rules Panel (shown on toggle) */}
          {showFactionRules && factionRules && (
            <section className="bm-faction-rules bm-rules-panel">
              <div className="bm-rules-panel-header">
                <h2 className="bm-faction-rules-title">{factionRules.title}</h2>
                <button className="bm-rules-panel-close" onClick={() => setShowFactionRules(false)}>✕</button>
              </div>
              <ul className="bm-faction-rules-list">
                {factionRules.rules.map((rule, i) => (
                  <li key={i}>{renderFormattedText(rule)}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Warband Variant Rules Panel (shown on toggle) */}
          {showWarbandRules && subFactionDef && activeSubFaction !== 'no_variant' && subFactionDef.rules.length > 0 && (
            <section className="bm-faction-rules bm-subfaction-rules bm-rules-panel">
              <div className="bm-rules-panel-header">
                <h2 className="bm-faction-rules-title">{subFactionDef.name} — Warband Rules</h2>
                <button className="bm-rules-panel-close" onClick={() => setShowWarbandRules(false)}>✕</button>
              </div>
              {subFactionDef.description && <p className="bm-subfaction-desc">{subFactionDef.description}</p>}
              <ul className="bm-faction-rules-list">
                {subFactionDef.rules.map((rule, i) => (
                  <li key={i}>{renderFormattedText(rule)}</li>
                ))}
              </ul>
            </section>
          )}

        {/* ── Matchup Loader Panel ───────────────────────────────────────── */}
        {showMatchupLoader && !opponent && (
          <div className="bm-matchup-loader">
            <div className="bm-matchup-loader-header">
              <h2>Load Opponent's Army</h2>
              <button className="bm-rules-panel-close" onClick={() => setShowMatchupLoader(false)}>✕</button>
            </div>
            <div className="bm-matchup-tabs">
              <button className={`bm-matchup-tab ${matchupTab === 'paste' ? 'bm-matchup-tab--active' : ''}`} onClick={() => setMatchupTab('paste')}>
                📋 Paste Link / Data
              </button>
              <button className={`bm-matchup-tab ${matchupTab === 'library' ? 'bm-matchup-tab--active' : ''}`} onClick={() => setMatchupTab('library')}>
                📂 From Library
              </button>
            </div>
            {matchupTab === 'paste' && (
              <div className="bm-matchup-paste">
                <p className="bm-matchup-hint">
                  Have your opponent share their army link, or paste the contents of a <code>.md</code> / <code>.thjson</code> roster file.
                </p>
                <textarea
                  className="bm-matchup-textarea"
                  placeholder="Paste share link or roster data here…"
                  value={matchupPaste}
                  onChange={e => { setMatchupPaste(e.target.value); setMatchupError(''); }}
                  rows={4}
                />
                {matchupError && <div className="bm-matchup-error">{matchupError}</div>}
                <button className="bm-matchup-load-btn" disabled={!matchupPaste.trim()} onClick={handleLoadOpponentPaste}>
                  ⚔ Load Opponent
                </button>
              </div>
            )}
            {matchupTab === 'library' && (
              <div className="bm-matchup-library">
                {savedWarbands.length === 0 ? (
                  <p className="bm-matchup-hint">No saved warbands. Save an army first, or use Paste.</p>
                ) : (
                  <ul className="bm-matchup-lib-list">
                    {savedWarbands.map(wb => {
                      const fn = getFactionById(wb.faction)?.name ?? wb.faction;
                      const cr = wb.units.reduce((s, u) => s + u.totalCost, 0);
                      const mdl = wb.units.reduce((s, u) => s + u.count, 0);
                      return (
                        <li key={wb.id} className="bm-matchup-lib-item" onClick={() => handleLoadOpponentLibrary(wb.id)}>
                          <span className="bm-matchup-lib-name">{wb.name}</span>
                          <span className="bm-matchup-lib-faction">{fn}{wb.subfactionName ? ` — ${wb.subfactionName}` : ''}</span>
                          <span className="bm-matchup-lib-stats">{cr} Cr · {mdl} models</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Army tab switcher (when opponent loaded) ─────────────────── */}
        {opponent && (
          <div className="bm-army-tabs">
            <button
              className={`bm-army-tab ${matchupViewTab === 'mine' ? 'bm-army-tab--active bm-army-tab--mine' : ''}`}
              onClick={() => setMatchupViewTab('mine')}
            >
              <span className="bm-army-tab-label">⚔ Your Army</span>
              <span className="bm-army-tab-stats">{livePoints} Cr · {liveModels} Models</span>
            </button>
            <button
              className={`bm-army-tab ${matchupViewTab === 'opponent' ? 'bm-army-tab--active bm-army-tab--opponent' : ''}`}
              onClick={() => setMatchupViewTab('opponent')}
            >
              <span className="bm-army-tab-label">
                🛡 {opponent.name}
              </span>
              <span className="bm-army-tab-stats">
                {opponentPoints} Cr
                {opponentGlory > 0 && <> · {opponentGlory} Gl</>}
                {' '}· {opponentModels} Models
              </span>
            </button>
          </div>
        )}

        {/* ── Player army (shown when no opponent, or "mine" tab active) ── */}
        {(!opponent || matchupViewTab === 'mine') && (
          <>
            {/* Unit Cards */}
            <section className="bm-units">
              {sortedUnits.map(unit => {
                const realIdx = warband.units.findIndex(u => u.id === unit.id);
                const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
                if (!unitDef) return null;
                const resolved = buildResolvedUnit(unitDef, unit);
                return (
                  <UnitCard
                    key={unit.id}
                    resolved={resolved}
                    baseUnit={unitDef}
                    warbandUnit={unit}
                    onEditCampaign={() => setEliteProgressionIdx(realIdx)}
                  />
                );
              })}
            </section>

            {/* Mercenary Cards */}
            {warband.mercenaries.length > 0 && (
              <section className="bm-mercenaries">
                <h2 className="bm-section-header">Mercenaries</h2>
                {warband.mercenaries.map(wm => (
                  <MercenaryCard key={wm.mercenaryId} wm={wm} />
                ))}
              </section>
            )}
          </>
        )}

        {/* ── Opponent army (shown when "opponent" tab active) ────────── */}
        {opponent && matchupViewTab === 'opponent' && (
          <>
            <div className="bm-opponent-banner">
              {opponentFaction?.name ?? opponent.faction}
              {opponent.subfactionName ? ` — ${opponent.subfactionName}` : ''}
            </div>

            <section className="bm-units">
              {opponentSorted.map(unit => {
                const unitDef = opponentUnits.find(u => u.id === unit.unitId);
                if (!unitDef) return null;
                const resolved = resolveOpponentUnit(unitDef, unit);
                return (
                  <UnitCard
                    key={unit.id}
                    resolved={resolved}
                    baseUnit={unitDef}
                    warbandUnit={unit}
                    onEditCampaign={() => {/* read-only */}}
                  />
                );
              })}
            </section>

            {(opponent.mercenaries?.length ?? 0) > 0 && (
              <section className="bm-mercenaries">
                <h2 className="bm-section-header">Mercenaries</h2>
                {opponent.mercenaries.map(wm => (
                  <MercenaryCard key={wm.mercenaryId} wm={wm} />
                ))}
              </section>
            )}
          </>
        )}

        {/* ── Print-only sections ──────────────────────────────────────────── */}

        {/* Keyword Glossary (print-only) */}
        {(() => {
          const allKeywords: string[] = [];
          // Collect from all units
          for (const unit of warband.units) {
            const unitDef = allAvailableUnits.find(u => u.id === unit.unitId);
            if (!unitDef) continue;
            const resolved = buildResolvedUnit(unitDef, unit);
            allKeywords.push(...resolved.keywords);
            // Weapon keywords from default battlekit
            for (const item of resolved.defaultWargear ?? []) {
              if ('keywords' in item) allKeywords.push(...(item.keywords ?? []));
            }
            // Equipped weapon keywords
            for (const sw of unit.selectedWargear) {
              const weapon = lookupWeapon(sw.id);
              if (weapon) allKeywords.push(...weapon.keywords);
              const gear = lookupWargear(sw.id);
              if (gear) allKeywords.push(...(gear.keywords ?? []));
            }
            // Upgrade granted keywords
            for (const upg of resolved.upgrades ?? []) {
              if ((unit.selectedUpgrades?.[upg.id] ?? 0) > 0 && upg.grantedKeywords) {
                allKeywords.push(...upg.grantedKeywords);
              }
            }
          }
          // Collect from mercenaries
          for (const wm of warband.mercenaries) {
            const mDef = ALL_MERCENARIES.find(m => m.id === wm.mercenaryId);
            if (!mDef) continue;
            allKeywords.push(...(mDef.keywords ?? []));
            const opt = mDef.recruitOptions?.find(o => o.id === wm.selectedRecruitOptionId);
            if (opt?.keywordsAdd) allKeywords.push(...opt.keywordsAdd);
          }
          const glossary = expandKeywords(allKeywords);
          if (glossary.length === 0) return null;
          // Sort alphabetically
          glossary.sort((a, b) => a.keyword.localeCompare(b.keyword));
          return (
            <section className="bm-keyword-glossary bm-print-only">
              <h2 className="bm-section-header">Keyword Reference</h2>
              <dl className="bm-glossary-list">
                {glossary.map(({ keyword, description }) => (
                  <div key={keyword} className="bm-glossary-entry">
                    <dt>{keyword}</dt>
                    <dd>{description}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })()}

      </div>

      {/* Elite Progression Modal */}
      {eliteProgressionIdx !== null && (() => {
        const unit = warband.units[eliteProgressionIdx];
        if (!unit) return null;
        return (
          <EliteProgressionModal
            unit={unit}
            onChange={(updated) => {
              onUpdateUnit(eliteProgressionIdx, updated);
              setEliteProgressionIdx(null);
            }}
            onClose={() => setEliteProgressionIdx(null)}
          />
        );
      })()}
    </div>
  );
}
