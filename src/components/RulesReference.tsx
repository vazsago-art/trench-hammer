import { useState, useMemo } from 'react';
import { RULES_ENTRIES, RULES_CATEGORIES, searchRules } from '../data/rulesReference.js';
import { KEYWORD_GLOSSARY } from '../data/keywordGlossary.js';
import './RulesReference.css';

interface Props {
  onClose: () => void;
}

type Tab = 'rules' | 'keywords';

export function RulesReference({ onClose }: Props) {
  const [tab, setTab] = useState<Tab>('rules');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // ── Rules search ──────────────────────────────────────────────
  const filteredRules = useMemo(() => {
    let results = searchQuery ? searchRules(searchQuery) : RULES_ENTRIES;
    if (selectedCategory !== 'All') {
      results = results.filter(e => e.category === selectedCategory);
    }
    return results;
  }, [searchQuery, selectedCategory]);

  // ── Keyword search ────────────────────────────────────────────
  const filteredKeywords = useMemo(() => {
    const entries = Object.entries(KEYWORD_GLOSSARY);
    if (!searchQuery.trim()) return entries;
    const lower = searchQuery.toLowerCase();
    return entries.filter(
      ([key, val]) =>
        key.toLowerCase().includes(lower) ||
        val.toLowerCase().includes(lower)
    );
  }, [searchQuery]);

  return (
    <div className="rules-ref-overlay" onClick={onClose}>
      <div className="rules-ref-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="rules-ref-header">
          <h2>Rules Reference</h2>
          <button className="rules-ref-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="rules-ref-tabs">
          <button className={tab === 'rules' ? 'active' : ''} onClick={() => setTab('rules')}>
            Rules
          </button>
          <button className={tab === 'keywords' ? 'active' : ''} onClick={() => setTab('keywords')}>
            Keywords ({Object.keys(KEYWORD_GLOSSARY).length})
          </button>
        </div>

        {/* Search bar */}
        <div className="rules-ref-search">
          <input
            type="text"
            placeholder={tab === 'rules' ? 'Search rules…' : 'Search keywords…'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="rules-ref-clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        {/* Category filter (rules tab only) */}
        {tab === 'rules' && (
          <div className="rules-ref-categories">
            <button
              className={selectedCategory === 'All' ? 'active' : ''}
              onClick={() => setSelectedCategory('All')}
            >All</button>
            {RULES_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="rules-ref-body">
          {tab === 'rules' && (
            <>
              {filteredRules.length === 0 && (
                <div className="rules-ref-empty">No rules match your search.</div>
              )}
              {filteredRules.map(entry => (
                <div key={entry.id} className="rules-entry">
                  <div className="rules-entry-header">
                    <h3>{entry.title}</h3>
                    <span className="rules-entry-cat">{entry.category}</span>
                  </div>
                  <div className="rules-entry-body">
                    {entry.body.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === 'keywords' && (
            <>
              {filteredKeywords.length === 0 && (
                <div className="rules-ref-empty">No keywords match your search.</div>
              )}
              <div className="keyword-list">
                {filteredKeywords.map(([key, desc]) => (
                  <div key={key} className="keyword-entry">
                    <div className="keyword-name">{key}</div>
                    <div className="keyword-desc">{desc}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
