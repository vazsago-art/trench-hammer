import { ArmyBuilder } from './components/ArmyBuilder'
import { MobileApp } from './components/mobile/MobileApp'
import { useMobile } from './hooks/useMobile'
import './App.css'

function App() {
  const isMobile = useMobile()
  if (isMobile) return <MobileApp />
  return (
    <div id="app">
      <ArmyBuilder />
    </div>
  )
}

export default App
