import InfiniteScrollStations from './components/InfiniteScrollStations'

import InfiniteScrollJourneys from './components/infiniteScrollJourneys'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'

function App() {
  const [stationID, setStationID] = useState<number | null>(null)

  return (
    <div className="App mx-auto text-center ">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/journeys" element={<InfiniteScrollJourneys />} />
          <Route
            path="/stations"
            element={<InfiniteScrollStations setStationID={setStationID} />}
          />
          <Route path="/" element={<div>stations</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
