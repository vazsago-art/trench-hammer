import { useState } from 'react'
import { ArmyBuilder } from './components/ArmyBuilder'
import { MobileApp } from './components/mobile/MobileApp'
import { useMobile } from './hooks/useMobile'
import { allFactions } from './data/factions_complete'
import { getDefaultSubFactionId } from './data/subfactions'
import type { Warband } from './types/index'
import './App.css'

function App() {
  const isMobile = useMobile()

  // ── Shared warband state — persists across mobile ↔ desktop layout switches
  const [selectedFaction, setSelectedFaction] = useState<string>(allFactions[0].id)
  const [selectedSubFaction, setSelectedSubFaction] = useState<string>(
    () => getDefaultSubFactionId(allFactions[0].id)
  )
  const [pointLimit, setPointLimit] = useState<number>(700)
  const [gloryLimit, setGloryLimit] = useState<number>(0)
  const [warband, setWarband] = useState<Warband>({
    id: `warband-${Date.now()}`,
    name: 'My Warband',
    faction: allFactions[0].id,
    pointLimit: 700,
    gloryLimit: 0,
    units: [],
    mercenaries: [],
    totalPoints: 0,
    totalGlory: 0,
    totalModels: 0,
  })

  const sharedProps = {
    selectedFaction, setSelectedFaction,
    selectedSubFaction, setSelectedSubFaction,
    pointLimit, setPointLimit,
    gloryLimit, setGloryLimit,
    warband, setWarband,
  }

  if (isMobile) return <MobileApp {...sharedProps} />
  return (
    <div id="app">
      <ArmyBuilder {...sharedProps} />
    </div>
  )
}

export default App
