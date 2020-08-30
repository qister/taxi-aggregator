import React, { useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { Card, Avatar, Input, Typography, message } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import { useEffect } from 'react'
import { SimpleCard } from './SimpleCard'
import { TestCard } from './TestCard'
import { logDOM } from '@testing-library/react'

const { Search } = Input
const { Text } = Typography
const { Meta } = Card

const client = new W3CWebSocket('ws://localhost:8001')

export const CardList = () => {
  const [userName, setUserName] = useState('Retail')
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [messages, setMessages] = useState<any>([])
  const [searchVal, setSearchVal] = useState('')

  // const [from, setFrom] = useState('')
  // const [to, setTo] = useState('')
  // const [phone, setPhone] = useState('')

  useEffect(() => {
    client.onopen = () => {
      console.log('connected')
    }
    client.onmessage = (message: any) => {
      console.log('message', message)

      console.log('message data', message.data)

      const messageParsed = JSON.parse(message.data)
      const dataFromServer: any = messageParsed.data
      console.log('got reply! ', dataFromServer)
      if (messageParsed.type === 'message') {
        setMessages((prev: any) => [
          ...prev,
          {
            msg: dataFromServer,
          },
        ])
      }
    }
  }, [])

  return (
    <>
      {/* {messages.map((item: any, index: number, array: any) => {
        console.log('Messages: ', array)
        const { from, to, phone } = item.msg

        return <SimpleCard key={index} {...{ from, to, phone }} />
      })} */}
      {messages.map((item: any, index: number) => {
        const { from, to, phone, date } = item.msg

        // console.log(typeof date)
        const locale = new Date(date).toLocaleTimeString()
        console.log(locale)

        return <TestCard key={index} {...{ from, to, phone, date }} />
      }).reverse()}
    </>
  )
}
