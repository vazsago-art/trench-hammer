/**
 * Component tests for KeywordChip and KeywordList
 *
 * Tests cover:
 *  • KeywordChip — plain span for unknown keywords
 *  • KeywordChip — interactive button for known keywords
 *  • KeywordChip — popup open/close behaviour
 *  • KeywordChip — aria attributes, role, accessibility
 *  • KeywordList  — filtering, empty state, comma separators
 */
import { render, screen, fireEvent, within } from '@testing-library/react';
import { KeywordChip, KeywordList } from '../components/KeywordChip';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Mock getBoundingClientRect so popup positioning code doesn't fail. */
function mockButtonRect() {
  HTMLButtonElement.prototype.getBoundingClientRect = () => ({
    top: 200,
    left: 300,
    right: 380,
    bottom: 224,
    width: 80,
    height: 24,
    x: 300,
    y: 200,
    toJSON: () => ({}),
  });
}

// ── KeywordChip — unknown keyword (plain span) ────────────────────────────────

describe('KeywordChip — unknown keyword', () => {
  const UNKNOWN = 'TOTALLY_UNKNOWN_XYZ';

  it('renders a <span> with the keyword text', () => {
    const { container } = render(<KeywordChip keyword={UNKNOWN} />);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    expect(span!.textContent).toBe(UNKNOWN);
  });

  it('does NOT render a <button>', () => {
    render(<KeywordChip keyword={UNKNOWN} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('forwards extra className to the outer span', () => {
    const { container } = render(<KeywordChip keyword={UNKNOWN} className="unit-kw-tag" />);
    expect(container.querySelector('.unit-kw-tag')).toBeInTheDocument();
  });

  it('always includes the base kw-chip class', () => {
    const { container } = render(<KeywordChip keyword={UNKNOWN} className="extra" />);
    const span = container.querySelector('span');
    expect(span!.className).toContain('kw-chip');
    expect(span!.className).toContain('extra');
  });
});

// ── KeywordChip — known keyword (interactive button) ─────────────────────────

describe('KeywordChip — known keyword', () => {
  const KW = 'FEAR';

  beforeEach(mockButtonRect);

  it('renders a <button> instead of a plain span', () => {
    render(<KeywordChip keyword={KW} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('button text equals the keyword', () => {
    render(<KeywordChip keyword={KW} />);
    expect(screen.getByRole('button').textContent).toBe(KW);
  });

  it('button has kw-chip__btn class', () => {
    render(<KeywordChip keyword={KW} />);
    expect(screen.getByRole('button').className).toContain('kw-chip__btn');
  });

  it('outer wrapper has kw-chip--has-info class', () => {
    const { container } = render(<KeywordChip keyword={KW} />);
    expect(container.querySelector('.kw-chip--has-info')).toBeInTheDocument();
  });

  it('aria-expanded is false before clicking', () => {
    render(<KeywordChip keyword={KW} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('aria-label contains the keyword', () => {
    render(<KeywordChip keyword={KW} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', expect.stringContaining(KW));
  });

  it('forwards className to the outer wrapper', () => {
    const { container } = render(<KeywordChip keyword={KW} className="unit-kw-tag" />);
    expect(container.querySelector('.unit-kw-tag')).toBeInTheDocument();
  });
});

// ── KeywordChip — popup open/close ────────────────────────────────────────────

describe('KeywordChip — popup behaviour', () => {
  const KW = 'TOUGH';

  beforeEach(mockButtonRect);

  it('popup is NOT rendered before clicking', () => {
    render(<KeywordChip keyword={KW} />);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('clicking the button shows the popup', () => {
    render(<KeywordChip keyword={KW} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('popup displays the keyword name', () => {
    render(<KeywordChip keyword={KW} />);
    fireEvent.click(screen.getByRole('button'));
    const tooltip = screen.getByRole('tooltip');
    expect(within(tooltip).getByText(KW)).toBeInTheDocument();
  });

  it('popup displays a non-empty description', () => {
    render(<KeywordChip keyword={KW} />);
    fireEvent.click(screen.getByRole('button'));
    const tooltip = screen.getByRole('tooltip');
    const desc = tooltip.querySelector('.kw-chip__popup-desc');
    expect(desc).toBeInTheDocument();
    expect(desc!.textContent!.length).toBeGreaterThan(5);
  });

  it('popup has role="tooltip"', () => {
    render(<KeywordChip keyword={KW} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('aria-expanded becomes true when popup is open', () => {
    render(<KeywordChip keyword={KW} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('wrapper gains kw-chip--open class when popup is open', () => {
    const { container } = render(<KeywordChip keyword={KW} />);
    fireEvent.click(screen.getByRole('button'));
    expect(container.querySelector('.kw-chip--open')).toBeInTheDocument();
  });

  it('clicking the button again closes the popup', () => {
    render(<KeywordChip keyword={KW} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('aria-expanded returns to false after closing', () => {
    render(<KeywordChip keyword={KW} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('kw-chip--open class is removed when popup closes', () => {
    const { container } = render(<KeywordChip keyword={KW} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(container.querySelector('.kw-chip--open')).not.toBeInTheDocument();
  });

  it('clicking outside the component closes the popup', async () => {
    render(
      <div>
        <KeywordChip keyword={KW} />
        <button data-testid="outside">outside</button>
      </div>,
    );
    fireEvent.click(screen.getByRole('button', { name: new RegExp(KW) }));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // Simulate mousedown on an element outside the chip
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('clicking inside the popup does NOT close it', () => {
    render(<KeywordChip keyword={KW} />);
    fireEvent.click(screen.getByRole('button'));
    const tooltip = screen.getByRole('tooltip');
    // mousedown inside the tooltip should keep it open
    fireEvent.mouseDown(tooltip);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});

// ── KeywordChip — different known keywords ────────────────────────────────────

describe('KeywordChip — display correctness for various known keywords', () => {
  beforeEach(mockButtonRect);

  const cases: Array<{ kw: string; expectInDesc: string }> = [
    { kw: 'FLYING',      expectInDesc: 'terrain' },
    { kw: 'INFILTRATOR', expectInDesc: 'line of sight' },
    { kw: 'TOUGH',       expectInDesc: 'Out of Action' },
    { kw: 'STEALTH',     expectInDesc: 'Long Range' },
    { kw: 'STRONG',      expectInDesc: 'HEAVY' },
    { kw: 'DEEP STRIKE', expectInDesc: '8"' },
    { kw: 'PSYKER 1',    expectInDesc: 'psychic' },
    { kw: 'VICIOUS 11',  expectInDesc: '11' },
  ];

  cases.forEach(({ kw, expectInDesc }) => {
    it(`"${kw}" popup description contains expected text`, () => {
      render(<KeywordChip keyword={kw} />);
      fireEvent.click(screen.getByRole('button'));
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip.textContent).toContain(expectInDesc);
    });
  });
});

// ── KeywordList ───────────────────────────────────────────────────────────────

describe('KeywordList', () => {
  beforeEach(mockButtonRect);

  it('renders "—" (em dash) for an empty keyword array', () => {
    render(<KeywordList keywords={[]} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('renders custom empty node when all keywords are hidden', () => {
    render(<KeywordList keywords={['TWO-HANDED']} empty={<span>none</span>} />);
    expect(screen.getByText('none')).toBeInTheDocument();
  });

  it('filters TWO-HANDED from display by default', () => {
    render(<KeywordList keywords={['TWO-HANDED', 'CRITICAL']} />);
    expect(screen.queryByText('TWO-HANDED')).not.toBeInTheDocument();
  });

  it('filters ONE-HANDED from display by default', () => {
    render(<KeywordList keywords={['ONE-HANDED']} />);
    expect(screen.queryByText('ONE-HANDED')).not.toBeInTheDocument();
  });

  it('filters THROWN from display by default', () => {
    render(<KeywordList keywords={['THROWN']} empty={<span>empty</span>} />);
    expect(screen.getByText('empty')).toBeInTheDocument();
  });

  it('filters GRENADE from display by default', () => {
    render(<KeywordList keywords={['GRENADE']} empty={<span>empty</span>} />);
    expect(screen.getByText('empty')).toBeInTheDocument();
  });

  it('shows a known keyword that is not in the hidden set', () => {
    render(<KeywordList keywords={['TWO-HANDED', 'ASSAULT']} />);
    // ASSAULT has a glossary entry — rendered as a button
    expect(screen.getByRole('button', { name: /ASSAULT/i })).toBeInTheDocument();
  });

  it('shows an unknown keyword as plain text (no button)', () => {
    const { container } = render(<KeywordList keywords={['TOTALLY_UNKNOWN_XYZ']} />);
    expect(container.textContent).toContain('TOTALLY_UNKNOWN_XYZ');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders multiple chips for multiple visible keywords', () => {
    render(<KeywordList keywords={['FEAR', 'FLYING', 'TOUGH']} />);
    const btns = screen.getAllByRole('button');
    expect(btns.length).toBeGreaterThanOrEqual(3);
  });

  it('respects a custom hide set (empty — shows everything)', () => {
    render(<KeywordList keywords={['TWO-HANDED']} hide={new Set()} />);
    expect(screen.queryByText('TWO-HANDED')).toBeInTheDocument();
  });

  it('respects a custom hide set (only hides the listed items)', () => {
    render(<KeywordList keywords={['FEAR', 'TOUGH']} hide={new Set(['FEAR'])} />);
    expect(screen.queryByRole('button', { name: /FEAR/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /TOUGH/i })).toBeInTheDocument();
  });

  it('has the kw-list wrapper class', () => {
    const { container } = render(<KeywordList keywords={['FEAR']} />);
    expect(container.querySelector('.kw-list')).toBeInTheDocument();
  });

  it('renders comma separators between chips', () => {
    const { container } = render(<KeywordList keywords={['FEAR', 'TOUGH']} />);
    const seps = container.querySelectorAll('.kw-sep');
    // One separator between two keywords
    expect(seps.length).toBe(1);
    expect(seps[0].textContent).toBe(', ');
  });

  it('does NOT render a leading comma for a single keyword', () => {
    const { container } = render(<KeywordList keywords={['FEAR']} />);
    expect(container.querySelectorAll('.kw-sep').length).toBe(0);
  });
});
