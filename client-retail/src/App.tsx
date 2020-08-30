
import React, { useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { Card, Avatar, Input, Typography } from 'antd'
import 'antd/dist/antd.css'
import './index.css'
import { useEffect } from 'react'
// import { Chat } from './components/Chat'
import { SearchForm } from './components/SearchForm'
import { PendingCard } from './components/OrderPending'

const App = () => {


  return (
    <>
    {/* <SearchForm/> */}
    <PendingCard />
    </>
  )
}

export default App
