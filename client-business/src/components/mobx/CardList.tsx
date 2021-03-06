import React, { useContext, useState } from 'react'
// import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { Card, Avatar, Input, Typography, message } from 'antd'
import 'antd/dist/antd.css'
import '../../index.css'
import { useEffect } from 'react'

// import {client} from '../Connections'
import { TestGridCard } from './TestGridCard'
import { MobXProviderContext, observer, useObserver } from 'mobx-react'
import { IOrder } from '../../mobx/ordersStore'

// const client = new W3CWebSocket('ws://localhost:8001')

const useStores = () => {
  return useContext(MobXProviderContext)
}

const useUserData = () => {
  const { store } = useStores()
  return useObserver( () => ({
    store: store.ordersStore.pendingOrders
  }))
}

export const CardList = observer(() => {
  const {store} = useUserData()

  // const [userName, setUserName] = useState('Retail')
  // const [isLoggedIn, setIsLoggedIn] = useState(true)
  // const [messages, setMessages] = useState<any>([])
  // const [searchVal, setSearchVal] = useState('')

  // const [from, setFrom] = useState('')
  // const [to, setTo] = useState('')
  // const [phone, setPhone] = useState('')

  // useEffect(() => {
  //   // client.onopen = () => {
  //   //   console.log('connected 2')
  //   // }
  //   // client.onmessage = (message: any) => {
  //   //   console.log('message', message)
  //   //   console.log('message data', message.data)
  //   //   const messageParsed = JSON.parse(message.data)
  //   //   const dataFromServer: any = messageParsed.data
  //   //   console.log('got reply! ', dataFromServer)
  //   //   if (messageParsed.type === 'message') {
  //   //     setMessages((prev: any) => [
  //   //       ...prev,
  //   //       {
  //   //         msg: dataFromServer,
  //   //       },
  //   //     ])
  //   //   }
  //   // }
  // }, [])

  return (
    <>
      {/* <TestGridCard /> */}

      {store
        .slice()
        .reverse()
        .map((item: IOrder) => {
          const { from, to, phone, date, id } = item
          return <TestGridCard key={id} {...{ from, to, phone, date, id }} />
          // return <TestCard key={index} {...{ from, to, phone, date }} />
        })}
    </>
  )
})

