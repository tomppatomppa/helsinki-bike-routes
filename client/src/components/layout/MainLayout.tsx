import React from 'react'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'
const MainLayout = () => {
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
        <Header />
      </div>
      <aside className="md:row-start-2 row-span-auto">
        <Sidebar />
      </aside>
      <main className="col-start-auto col-span-auto">
        <Outlet />
      </main>
      <div className="col-span-2">
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
