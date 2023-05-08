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
        gridTemplateColumns: showSidebar ? '15rem 1fr' : '1fr',
        minHeight: '100vh',
      }}
    >
      <div className="col-span-2 row-span-auto">
        <Header handleSetSidebar={handleSetSidebar} />
      </div>
      <aside className="md:row-start-2 row-span-auto">
        {showSidebar && <Sidebar />}
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
