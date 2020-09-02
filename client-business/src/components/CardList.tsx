import React, { useState } from 'react'
// import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { Card, Avatar, Input, Typography, message } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import { useEffect } from 'react'
import { TestCard } from './TestCard'
import { logDOM } from '@testing-library/react'

// import {client} from '../Connections'
import { TestGridCard } from './TestGridCard'
import { connect } from 'react-redux'

// const client = new W3CWebSocket('ws://localhost:8001')

const CardList_ = (props: any) => {
  console.log('CardList Props: ', props)

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

      {
        props.orders.slice().reverse()
          .map((item: any) => {
            console.log('Item: ',item);
            
            const { from, to, phone, date, id } = item

            return <TestGridCard {...{ from, to, phone, date, id }} />
            // return <TestCard key={index} {...{ from, to, phone, date }} />
          })}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  orders: state.orders,
})

export const CardList = connect(mapStateToProps, null)(CardList_)
