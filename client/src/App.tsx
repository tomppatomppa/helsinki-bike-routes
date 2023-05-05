import InfiniteScrollStations from './components/InfiniteScrollStations'
import NavBar from './components/NavBar'
import InfiniteScrollJourneys from './components/infiniteScrollJourneys'
import { useState } from 'react'
function App() {
  const [select, setSelect] = useState<string>('journeys')
  return (
    <>
      <div className="text-center">
        <NavBar setSelect={setSelect} />
        {select === 'journeys' ? (
          <InfiniteScrollJourneys />
        ) : (
          <InfiniteScrollStations />
        )}
      </div>
    </>
  )
}

export default App
