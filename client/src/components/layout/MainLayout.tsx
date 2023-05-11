import { useState } from 'react'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'
import ScrollWrapper from './Components/ScrollWrapper'

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
      <aside className="fixed z-10 bottom-0 h-full">
        {showSidebar && <Sidebar handleSetSidebar={handleSetSidebar} />}
      </aside>
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
