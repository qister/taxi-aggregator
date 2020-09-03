import React, { useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { MainList } from './MainLIst'
import { connect } from 'react-redux'
import { addOrderToPendingList } from '../redux/actions'

// const client = new W3CWebSocket('ws://localhost:8001')

// const wsConnect = () => {
//   const client = new W3CWebSocket('ws://localhost:8001')

//   client.onopen = () => {
//     console.log('connected')
//   }

//   client.onmessage = (message: any) => {
//     console.log('message', message)

//     console.log('message data', message.data)

//     const messageParsed = JSON.parse(message.data)
//     const dataFromServer: any = messageParsed.data
//     console.log('got reply! ', dataFromServer)
//     if (messageParsed.type === 'message') {
//       props.addOrderToPendingList(dataFromServer)
//     }
//   }
//   client.onclose = function(e) {
//     console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
//     setTimeout(function() {
//       connect();
//     }, 1000);
//   };

//   client.onerror = function(err) {
//     console.error('Socket encountered error: ', err.message, 'Closing socket');
//     client.close();
//   };

// }

const MainContainer_ = (props: any) => {
  console.log('props', props)

  // console.log('props', props)

  useEffect(() => {
    const wsConnect = () => {
      const client = new W3CWebSocket('ws://localhost:8001')

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
          props.addOrderToPendingList(dataFromServer)
        }
      }
      client.onclose = function (e) {
        console.log(
          'Socket is closed. Reconnect will be attempted in 1 second.',
          e.reason,
        )
        setTimeout(function () {
          wsConnect()
        }, 1000)
      }

      client.onerror = function (err) {
        console.error(
          'Socket encountered error: ',
          err.message,
          'Closing socket',
        )
        client.close()
      }
    }

    wsConnect()

    // client.onopen = () => {
    //   console.log('connected')
    // }
    // client.onmessage = (message: any) => {
    //   console.log('message', message)

    //   console.log('message data', message.data)

    //   const messageParsed = JSON.parse(message.data)
    //   const dataFromServer: any = messageParsed.data
    //   console.log('got reply! ', dataFromServer)
    //   if (messageParsed.type === 'message') {
    //     props.addOrderToPendingList(dataFromServer)
    //   }
    // }
  }, [])

  return <MainList />
}

const mapStateToProps = (state: any) => {
  return {
    orders: state.orders,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addOrderToPendingList: (order: any) => dispatch(addOrderToPendingList(order)),
  }
}

export const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer_)
