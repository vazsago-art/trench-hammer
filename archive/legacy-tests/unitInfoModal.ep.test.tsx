/**
 * unitInfoModal.ep.test.tsx
 *
 * Tests targeting the Elite Progression section that appears inside
 * UnitInfoModal when a `warbandUnit` prop is supplied and the unit
 * is Elite-eligible (unitType === 'elite' OR isPromoted === true).
 *
 * Covers:
 *  - Section NOT rendered when no warbandUnit supplied
 *  - Section NOT rendered when warbandUnit is a non-promoted troop
 *  - Section rendered for an elite unit (unitType==='elite')
 *  - Section rendered for a promoted troop (isPromoted===true)
 *  - XP value displayed correctly
 *  - "Promoted" badge visible only when isPromoted===true
 *  - Campaign skills listed with name, table label, roll, and description
 *  - Battle Scars shown as a numeric count
 *  - Traumas listed with name and description
 *  - Empty/zero values → sub-sections not rendered
 */

import { render, screen } from '@testing-library/react';
import { UnitInfoModal } from '../components/UnitInfoModal';
import type { UnitOption, WarbandUnit } from '../types/index.js';
import type { CampaignSkill, EliteTrauma } from '../types/index.js';

// ── Minimal fixtures ─────────────────────────────────────────────────────────

const MINIMAL_UNIT: UnitOption = {
  id: 'test-elite',
  name: 'Veteran Sergeant',
  baseCost: 50,
  minCount: 1,
  maxCount: 1,
  stats: { movement: 6, meleeSkill: 2, rangedSkill: 2 },
  keywords: ['IMPERIUM', 'ASTARTES'],
  defaultWargear: [],
  availableWargear: [],
  faction: 'adeptus_astartes',
  unitType: 'elite',
};

const SAMPLE_SKILL: CampaignSkill = {
  id: 'cs-test-1',
  table: 'melee',
  roll: 7,
  name: 'Melee Proficiency',
  description: 'Add +1 to the Melee Skill of this model.',
};

const SAMPLE_TRAUMA: EliteTrauma = {
  id: 'trauma-test-1',
  name: 'Shell Shock',
  description: 'This model always has -1 DICE on the first Success Roll it makes during its first Activation each battle.',
};

function makeEliteUnit(overrides: Partial<WarbandUnit> = {}): WarbandUnit {
  return {
    id: 'wu-test',
    unitId: 'test-elite',
    name: 'Veteran Sergeant',
    count: 1,
    baseCostPerModel: 50,
    costCurrency: 'credits',
    selectedWargear: [],
    totalCost: 50,
    totalGloryCost: 0,
    keywords: ['IMPERIUM', 'ASTARTES'],
    unitType: 'elite',
    xp: 0,
    isPromoted: false,
    campaignSkills: [],
    scarCount: 0,
    traumas: [],
    ...overrides,
  };
}

const NOOP = () => { /* intentionally empty */ };

// ── Helper ────────────────────────────────────────────────────────────────────

function renderModal(unit: UnitOption, warbandUnit?: WarbandUnit) {
  return render(
    <UnitInfoModal
      unit={unit}
      warbandUnit={warbandUnit}
      onClose={NOOP}
    />
  );
}

// ── Section visibility ────────────────────────────────────────────────────────

describe('UnitInfoModal — Elite Progression visibility', () => {
  it('does NOT render the Elite Progression section when no warbandUnit supplied', () => {
    renderModal(MINIMAL_UNIT);
    expect(screen.queryByText(/Elite Progression/i)).not.toBeInTheDocument();
  });

  it('does NOT render the section for a non-promoted troop warbandUnit', () => {
    const troopUnit: WarbandUnit = makeEliteUnit({ unitType: 'troop', isPromoted: false });
    renderModal(MINIMAL_UNIT, troopUnit);
    expect(screen.queryByText(/Elite Progression/i)).not.toBeInTheDocument();
  });

  it('renders the section for an elite-type warbandUnit (unitType="elite")', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ unitType: 'elite' }));
    expect(screen.getByText(/Elite Progression/i)).toBeInTheDocument();
  });

  it('renders the section for a promoted troop (isPromoted=true)', () => {
    const promotedTroop: WarbandUnit = makeEliteUnit({ unitType: 'troop', isPromoted: true });
    renderModal(MINIMAL_UNIT, promotedTroop);
    expect(screen.getByText(/Elite Progression/i)).toBeInTheDocument();
  });
});

// ── XP display ───────────────────────────────────────────────────────────────

describe('UnitInfoModal — XP display', () => {
  it('shows xp=0 correctly', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ xp: 0 }));
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('shows xp=7 correctly', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ xp: 7 }));
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('shows xp=99 correctly', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ xp: 99 }));
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('shows 0 when xp field is undefined', () => {
    const unitNoXp: WarbandUnit = makeEliteUnit();
    delete (unitNoXp as Partial<WarbandUnit>).xp;
    renderModal(MINIMAL_UNIT, unitNoXp);
    // The label row should show "0"
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});

// ── "Promoted" badge ─────────────────────────────────────────────────────────

describe('UnitInfoModal — Promoted badge', () => {
  it('does NOT show "Promoted" badge when isPromoted=false', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ isPromoted: false }));
    expect(screen.queryByText(/promoted/i)).not.toBeInTheDocument();
  });

  it('shows "Promoted" badge when isPromoted=true', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ isPromoted: true }));
    expect(screen.getByText(/promoted/i)).toBeInTheDocument();
  });
});

// ── Campaign Skills ───────────────────────────────────────────────────────────

describe('UnitInfoModal — Campaign Skills', () => {
  it('does NOT render Campaign Skills sub-section when array is empty', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ campaignSkills: [] }));
    expect(screen.queryByText('Campaign Skills')).not.toBeInTheDocument();
  });

  it('renders Campaign Skills heading when skills are present', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ campaignSkills: [SAMPLE_SKILL] }));
    expect(screen.getByText('Campaign Skills')).toBeInTheDocument();
  });

  it('shows the skill name', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ campaignSkills: [SAMPLE_SKILL] }));
    expect(screen.getByText('Melee Proficiency')).toBeInTheDocument();
  });

  it('shows the skill description', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ campaignSkills: [SAMPLE_SKILL] }));
    expect(screen.getByText(/Add \+1 to the Melee Skill/i)).toBeInTheDocument();
  });

  it('shows the table label and roll', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ campaignSkills: [SAMPLE_SKILL] }));
    // Label is "Melee & Strength" with "roll 7"
    expect(screen.getByText(/Melee & Strength/i)).toBeInTheDocument();
    expect(screen.getByText(/roll 7/i)).toBeInTheDocument();
  });

  it('renders multiple skills', () => {
    const skills: CampaignSkill[] = [
      SAMPLE_SKILL,
      { id: 'cs-2', table: 'stealth', roll: 11, name: 'Dodge', description: 'All Ranged Attacks against this model have an additional -1 DICE to hit.' },
    ];
    renderModal(MINIMAL_UNIT, makeEliteUnit({ campaignSkills: skills }));
    expect(screen.getByText('Melee Proficiency')).toBeInTheDocument();
    expect(screen.getByText('Dodge')).toBeInTheDocument();
  });
});

// ── Battle Scars ─────────────────────────────────────────────────────────────

describe('UnitInfoModal — Battle Scars', () => {
  it('does NOT render Battle Scars sub-section when scarCount is 0', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ scarCount: 0 }));
    expect(screen.queryByText('Battle Scars')).not.toBeInTheDocument();
  });

  it('renders Battle Scars heading when scarCount > 0', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ scarCount: 1 }));
    expect(screen.getByText('Battle Scars')).toBeInTheDocument();
  });

  it('shows the scar count', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ scarCount: 2 }));
    expect(screen.getByText(/2\/3/)).toBeInTheDocument();
  });

  it('shows dead notice at 3 scars', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ scarCount: 3 }));
    expect(screen.getByText(/permanently removed/i)).toBeInTheDocument();
  });
});

// ── Traumas ───────────────────────────────────────────────────────────────────

describe('UnitInfoModal — Traumas', () => {
  it('does NOT render Traumas sub-section when array is empty', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ traumas: [] }));
    expect(screen.queryByText('Traumas')).not.toBeInTheDocument();
  });

  it('renders Traumas heading when traumas are present', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ traumas: [SAMPLE_TRAUMA] }));
    expect(screen.getByText('Traumas')).toBeInTheDocument();
  });

  it('shows the trauma name', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ traumas: [SAMPLE_TRAUMA] }));
    expect(screen.getByText('Shell Shock')).toBeInTheDocument();
  });

  it('shows the trauma description', () => {
    renderModal(MINIMAL_UNIT, makeEliteUnit({ traumas: [SAMPLE_TRAUMA] }));
    expect(screen.getByText(/first Activation each battle/i)).toBeInTheDocument();
  });

  it('renders multiple traumas', () => {
    const traumas: EliteTrauma[] = [
      SAMPLE_TRAUMA,
      { id: 'trauma-2', name: 'Paranoia', description: 'This model must re-roll successful Retreat rolls once.' },
    ];
    renderModal(MINIMAL_UNIT, makeEliteUnit({ traumas }));
    expect(screen.getByText('Shell Shock')).toBeInTheDocument();
    expect(screen.getByText('Paranoia')).toBeInTheDocument();
  });
});

// ── Full progression example ──────────────────────────────────────────────────

describe('UnitInfoModal — full progression display', () => {
  it('shows all progression data together for a fully-progressed elite', () => {
    const fullUnit = makeEliteUnit({
      xp: 12,
      isPromoted: false,
      campaignSkills: [SAMPLE_SKILL],
      scarCount: 1,
      traumas: [SAMPLE_TRAUMA],
    });
    renderModal(MINIMAL_UNIT, fullUnit);

    expect(screen.getByText(/Elite Progression/i)).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Melee Proficiency')).toBeInTheDocument();
    expect(screen.getByText('Battle Scars')).toBeInTheDocument();
    expect(screen.getByText('Shell Shock')).toBeInTheDocument();
  });

  it('shows Promoted badge and all data for a promoted troop', () => {
    const promotedUnit = makeEliteUnit({
      unitType: 'troop',
      isPromoted: true,
      xp: 3,
      campaignSkills: [SAMPLE_SKILL],
      scarCount: 0,
      traumas: [],
    });
    renderModal(MINIMAL_UNIT, promotedUnit);

    expect(screen.getByText(/Elite Progression/i)).toBeInTheDocument();
    expect(screen.getByText(/Promoted/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Melee Proficiency')).toBeInTheDocument();
    expect(screen.queryByText('Battle Scars')).not.toBeInTheDocument();
    expect(screen.queryByText('Traumas')).not.toBeInTheDocument();
  });
});
