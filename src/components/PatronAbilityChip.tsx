import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { PatronAbility } from '../data/patrons.js';
import './PatronAbilityChip.css';

interface PatronAbilityChipProps {
  ability: PatronAbility;
}

/**
 * A patron skill name rendered as a clickable button.
 * Clicking opens a fixed-position popup showing the full ability description.
 * Clicking outside (or the chip again) closes it.
 */
export function PatronAbilityChip({ ability }: PatronAbilityChipProps) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const popupRef = useRef<HTMLSpanElement>(null);
  const btnRef   = useRef<HTMLButtonElement>(null);
  const isOpen   = pos !== null;

  const close = useCallback(() => setPos(null), []);

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isOpen) { close(); return; }
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    setPos({
      top:  rect.top - 8,
      left: Math.min(
        Math.max(rect.left + rect.width / 2, 160),
        window.innerWidth - 160,
      ),
    });
  };

  return (
    <span className={`pa-chip${isOpen ? ' pa-chip--open' : ''}`}>
      <button
        ref={btnRef}
        type="button"
        className="pa-chip__btn"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-label={`${ability.name} – tap for description`}
      >
        {ability.name}
      </button>
      {ability.condition && (
        <span className="pa-chip__condition">{ability.condition}</span>
      )}
      {isOpen && (
        <span
          ref={popupRef}
          className="pa-chip__popup"
          style={{ top: pos!.top, left: pos!.left }}
          role="tooltip"
        >
          <strong className="pa-chip__popup-name">{ability.name}</strong>
          <span className="pa-chip__popup-desc">{ability.description}</span>
        </span>
      )}
    </span>
  );
}
