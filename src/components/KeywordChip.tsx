import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getKeywordDescription } from '../data/keywordGlossary.js';
import './KeywordChip.css';

// ── Single keyword chip ───────────────────────────────────────────────────────

interface KeywordChipProps {
  keyword: string;
  /** Extra CSS class forwarded to the outer wrapper for colour/sizing. */
  className?: string;
}

/**
 * A single keyword token.
 * - If the keyword has a glossary entry it renders as a clickable button.
 *   Tapping opens a small fixed-position panel showing the rule description.
 *   Tapping outside (or the chip again) closes the panel.
 * - If there is no glossary entry it renders as a plain inline `<span>`.
 */
export function KeywordChip({ keyword, className }: KeywordChipProps) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const popupRef = useRef<HTMLSpanElement>(null);
  const btnRef  = useRef<HTMLButtonElement>(null);
  const isOpen  = pos !== null;

  const close = useCallback(() => setPos(null), []);

  // Close on any outside click / touch
  useEffect(() => {
    if (!isOpen) return;
    function dismiss(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (popupRef.current?.contains(target) || btnRef.current?.contains(target)) return;
      setPos(null);
    }
    document.addEventListener('mousedown', dismiss);
    document.addEventListener('touchstart', dismiss as EventListener);
    return () => {
      document.removeEventListener('mousedown', dismiss);
      document.removeEventListener('touchstart', dismiss as EventListener);
    };
  }, [isOpen]);

  const description = getKeywordDescription(keyword);
  const base = ['kw-chip', className].filter(Boolean).join(' ');

  // No glossary entry — plain chip
  if (!description) {
    return <span className={base}>{keyword}</span>;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isOpen) { close(); return; }
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    // Position above the button, centred horizontally
    setPos({
      top:  rect.top - 8,
      left: Math.min(
        Math.max(rect.left + rect.width / 2, 128), // keep at least 128px from left edge
        window.innerWidth - 128,                    // keep at least 128px from right edge
      ),
    });
  };

  return (
    <span className={`${base} kw-chip--has-info${isOpen ? ' kw-chip--open' : ''}`}>
      <button
        ref={btnRef}
        type="button"
        className="kw-chip__btn"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-label={`${keyword} – tap for rule`}
      >
        {keyword}
      </button>

      {isOpen && (
        <span
          ref={popupRef}
          className="kw-chip__popup"
          style={{ top: pos!.top, left: pos!.left }}
          role="tooltip"
        >
          <strong className="kw-chip__popup-name">{keyword}</strong>
          <span className="kw-chip__popup-desc">{description}</span>
        </span>
      )}
    </span>
  );
}

// ── Keyword list helper ───────────────────────────────────────────────────────

/** Structural keywords that are never shown in a Rules column. */
const DEFAULT_HIDDEN = new Set(['TWO-HANDED', 'ONE-HANDED', 'THROWN', 'GRENADE']);

interface KeywordListProps {
  /** All keyword strings to render. */
  keywords: string[];
  /** Extra CSS class forwarded to each chip. */
  chipClass?: string;
  /**
   * Set of keywords to suppress from the output.
   * Defaults to structural meta-keywords (TWO-HANDED, etc.).
   * Pass an empty `new Set()` to show all.
   */
  hide?: Set<string>;
  /** What to render when the filtered list is empty. */
  empty?: React.ReactNode;
}

/**
 * Renders a list of keyword chips inline, separated by commas.
 * Meta/structural keywords are filtered out by default.
 */
export function KeywordList({
  keywords,
  chipClass,
  hide = DEFAULT_HIDDEN,
  empty = '—',
}: KeywordListProps) {
  const visible = keywords.filter(k => !hide.has(k));
  if (visible.length === 0) return <>{empty}</>;

  return (
    <span className="kw-list">
      {visible.map((kw, i) => (
        <React.Fragment key={kw}>
          {i > 0 && <span className="kw-sep">, </span>}
          <KeywordChip keyword={kw} className={chipClass} />
        </React.Fragment>
      ))}
    </span>
  );
}
