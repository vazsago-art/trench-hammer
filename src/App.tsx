import { useEffect, useState } from 'react'
import { ArmyBuilder } from './components/ArmyBuilder'
import { MobileApp } from './components/mobile/MobileApp'
import { useMobile } from './hooks/useMobile'
import { allFactions } from './data/factions_complete'
import { getDefaultSubFactionId } from './data/subfactions'
import { hasSharePayload, extractSharePayload, clearShareHash } from './utils/shareUrl'
import { migrateAutoMarkCost, migrateLegacyMarkIds } from './utils/export'
import type { Warband } from './types/index'
import './App.css'

const DRAFT_KEY = 'trench_hammer_session_draft'

/**
 * Read the session draft once at module load — outside React lifecycle so it
 * only parses once and is available synchronously for useState initialisers.
 * Migration is applied here so that over-migrated drafts are corrected on startup.
 */
const _savedDraft = (() => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as {
      selectedFaction: string
      selectedSubFaction: string
      pointLimit: number
      gloryLimit: number
      warband: Warband
    }
    return {
      ...parsed,
      warband: migrateLegacyMarkIds(migrateAutoMarkCost(parsed.warband)),
    }
  } catch { return null }
})()

const _defaultFaction    = allFactions[0].id
const _defaultSubFaction = getDefaultSubFactionId(_defaultFaction)

const _blankWarband: Warband = {
  id: `warband-${Date.now()}`,
  name: 'My Warband',
  faction: _defaultFaction,
  pointLimit: 700,
  gloryLimit: 0,
  units: [],
  mercenaries: [],
  totalPoints: 0,
  totalGlory: 0,
  totalModels: 0,
  schemaVersion: 1,
}

function App() {
  const isMobile = useMobile()

  // ── Shared warband state — initialised from saved draft when available ────
  const [selectedFaction,    setSelectedFaction]    = useState<string>(_savedDraft?.selectedFaction    ?? _defaultFaction)
  const [selectedSubFaction, setSelectedSubFaction] = useState<string>(_savedDraft?.selectedSubFaction ?? _defaultSubFaction)
  const [pointLimit,         setPointLimit]         = useState<number>(_savedDraft?.pointLimit         ?? 700)
  const [gloryLimit,         setGloryLimit]         = useState<number>(_savedDraft?.gloryLimit         ?? 0)
  const [warband,            setWarband]            = useState<Warband>(_savedDraft?.warband            ?? _blankWarband)

  // ── Auto-save session draft on every state change ─────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        selectedFaction, selectedSubFaction, pointLimit, gloryLimit, warband,
      }))
    } catch { /* storage quota exceeded — silently ignore */ }
  }, [selectedFaction, selectedSubFaction, pointLimit, gloryLimit, warband])

  // ── "Session restored" toast — shown once on load when draft has content ──
  const [draftToast, setDraftToast] = useState<string | null>(() => {
    if (
      _savedDraft?.warband &&
      ((_savedDraft.warband.units?.length ?? 0) > 0 ||
        _savedDraft.warband.name !== 'My Warband')
    ) return 'Session restored ✓'
    return null
  })
  useEffect(() => {
    if (!draftToast) return
    const t = setTimeout(() => setDraftToast(null), 3500)
    return () => clearTimeout(t)
  }, [draftToast])

  // ── Import shared warband from URL hash ───────────────────────────────────
  useEffect(() => {
    if (!hasSharePayload()) return
    extractSharePayload().then(payload => {
      if (!payload) return
      const migrated = migrateLegacyMarkIds(migrateAutoMarkCost(payload.warband))
      setSelectedFaction(payload.faction)
      setSelectedSubFaction(payload.subfaction)
      setPointLimit(payload.pointLimit)
      setGloryLimit(payload.gloryLimit)
      setWarband(migrated)
      clearShareHash()
      setDraftToast('Shared warband loaded ✓')
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sharedProps = {
    selectedFaction, setSelectedFaction,
    selectedSubFaction, setSelectedSubFaction,
    pointLimit, setPointLimit,
    gloryLimit, setGloryLimit,
    warband, setWarband,
  }

  return (
    <>
      {draftToast && <div className="draft-toast">{draftToast}</div>}
      {isMobile
        ? <MobileApp {...sharedProps} />
        : <div id="app"><ArmyBuilder {...sharedProps} /></div>
      }
    </>
  )
}

export default App
