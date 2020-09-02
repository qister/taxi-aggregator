import React, { useState } from 'react'
// import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { Card, Avatar, Input, Typography, message } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import { useEffect } from 'react'
import { TestCard } from './TestCard'
import { logDOM } from '@testing-library/react'

import { TestGridCard } from './TestGridCard'
import { TestGridCardAccepted } from './TestGridCardAccepted'
import { connect } from 'react-redux'
import { AnyPtrRecord } from 'dns'

// const client = new W3CWebSocket('ws://localhost:8001')

const CardListAccepted_ = (props: any) => {
  // const [from, setFrom] = useState('')
  // const [to, setTo] = useState('')
  // const [phone, setPhone] = useState('')

  // useEffect(() => {
  //   setMessages((prev: any) => [...prev, ...props.acceptedOrders])

  //   // client.onopen = () => {
  //   //   console.log('connected 1')
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
      {/* <TestGridCardAccepted /> */}

      {props.acceptedOrders
        .slice()
        .reverse()
        .map((item: any) => {
          const { from, to, phone, date, id } = item

          // console.log(typeof date)
          const locale = new Date(date).toLocaleTimeString()
          console.log(locale)

          return <TestGridCardAccepted {...{ from, to, phone, date, id }} />
          // return <TestCard key={index} {...{ from, to, phone, date }} />
        })}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  acceptedOrders: state.acceptedOrders,
})

export const CardListAccepted = connect(
  mapStateToProps,
  null,
)(CardListAccepted_)
