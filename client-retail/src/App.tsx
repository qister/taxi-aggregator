import React, { useState } from 'react'
import './index.css'
import { MainContainer } from './components/MainContainer'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'

const App = () => {
  const isAuthenticated = true
  const routes = useRoutes(isAuthenticated)

  return (
    <>
      <Router>
        {/* {isAuthenticated && <MenuAppBar/>} */}
        <div className='container'>{routes}</div>
      </Router>
    </>
  )
}
export default App
