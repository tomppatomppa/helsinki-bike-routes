import { lazy, Suspense } from 'react'
import InfiniteScrollStations from './components/stations/InfiniteScrollStations'

import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Spinner from './components/common/Spinner'

const InfiniteScrollJourneys = lazy(
  () => import('./components/journeys/infiniteScrollJourneys')
)

function App() {
  return (
    <div className="App mx-auto text-center">
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <Spinner show delay={500} />
          </div>
        }
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/journeys" element={<InfiniteScrollJourneys />} />
            <Route path="/stations" element={<InfiniteScrollStations />} />
            <Route path="/" element={<InfiniteScrollStations />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
