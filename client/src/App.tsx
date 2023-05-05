import InfiniteScrollStations from './components/InfiniteScrollStations'
import NavBar from './components/NavBar'
import StationDetailsView from './components/StationDetailsView'
import InfiniteScrollJourneys from './components/infiniteScrollJourneys'
import { useState } from 'react'
function App() {
  const [select, setSelect] = useState<string>('stations')
  const [stationID, setStationID] = useState<number | null>(null)

  return (
    <>
      <div className="text-center">
        <NavBar setSelect={setSelect} />
        {select === 'journeys' ? (
          <InfiniteScrollJourneys />
        ) : (
          <InfiniteScrollStations setStationID={setStationID} />
        )}
        {stationID && (
          <StationDetailsView
            stationID={stationID}
            setStationID={setStationID}
          />
        )}
      </div>
    </>
  )
}

export default App
