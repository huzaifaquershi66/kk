import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/header'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/footer'
function App() {


  return (
    <>
  <div>
      <Header/> {/* Header ko yahan include karein */}
      <main className="">
        <Outlet /> {/* Ye component yahan render hoga */}
      </main>
      <Footer/>
 
    </div>
    </>
  )
}

export default App
