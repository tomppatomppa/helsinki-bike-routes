import InfiniteScrollStations from './components/InfiniteScrollStations'
import InfiniteScrollJourneys from './components/infiniteScrollJourneys'

import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import useJourneysEventSource from './hooks/useJourneysEventSource'

function App() {
  const message = useJourneysEventSource()
  console.log(message)
  return (
    <div className="App mx-auto text-center">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/journeys" element={<InfiniteScrollJourneys />} />
          <Route path="/stations" element={<InfiniteScrollStations />} />
          <Route path="/" element={<InfiniteScrollStations />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
