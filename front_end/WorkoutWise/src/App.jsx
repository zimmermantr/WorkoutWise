import { useState } from 'react'
// import { Navbar } from "./components/Navbar"
import { Outlet } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
