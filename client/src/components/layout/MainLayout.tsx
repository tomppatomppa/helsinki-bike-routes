import { useState, Suspense, lazy } from 'react'
import Header from './Components/Header'
// import Sidebar from './Components/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'
import ScrollWrapper from './Components/ScrollWrapper'
import Spinner from '../common/Spinner'
const Sidebar = lazy(() => import('./Components/Sidebar'))

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  const handleSetSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '4rem 1fr 4rem',
        gridTemplateColumns: '1fr',
        minHeight: '100vh',
      }}
    >
      <div className="col-span-2 row-span-auto">
        <Header handleSetSidebar={handleSetSidebar} />
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-56">
            <Spinner show delay={500} />
          </div>
        }
      >
        <aside className="fixed z-10 bottom-0 h-full overscroll-auto">
          {showSidebar && <Sidebar handleSetSidebar={handleSetSidebar} />}
        </aside>
      </Suspense>
      <main className="col-start-auto col-span-auto">
        <ScrollWrapper>
          <Outlet />
        </ScrollWrapper>
      </main>
      <div className="col-span-2">
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
