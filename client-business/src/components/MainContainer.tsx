import React, { useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { MainList } from './MainLIst'
import { connect } from 'react-redux'
import { addNewOrder } from '../redux/actions'

const client = new W3CWebSocket('ws://localhost:8001')

const MainContainer_ = (props: any) => {
  console.log('props', props)

  // console.log('props', props)

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
        props.addNewOrder([...props.orders, dataFromServer])
      }
    }
  }, [])

  return <MainList />
}

function mapStateToProps(state: any) {
  return {
    orders: state.orders,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    addNewOrder: (orders: any) => dispatch(addNewOrder(orders)),
  }
}

export const MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainContainer_)
