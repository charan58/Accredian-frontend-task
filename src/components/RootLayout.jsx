import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar/Navbar'
function RootLayout() {
  return (
    <div>
      <Navbar/>
      {/* placeholder */}
      <Outlet/>
    </div>
  )
}

export default RootLayout