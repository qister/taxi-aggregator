import React, { useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { PendingCard } from './OrderPending'
import { SearchForm } from './SearchForm'

export const MainContainer = () => {
  useEffect(() => {
    const wsConnect = () => {
      const client = new W3CWebSocket('ws://localhost:8000')

      client.onopen = () => {
        console.log('connected')
        // appStore.setOnline()
      }

      client.onmessage = (message) => {
        console.log('Message: ', message);
        
      }

      client.onclose = (e) => {
        console.log(
          'Socket is closed. Reconnect will be attempted in 1 second.',
          e.reason,
        )
        // appStore.setOffline()
        setTimeout(() => {
          wsConnect()
        }, 1000)
      }

      client.onerror = (err) => {
        console.error(
          'Socket encountered error: ',
          err.message,
          'Closing socket',
        )
        client.close()
      }
    }

    wsConnect()
  }, [])

  return (
    <>
      <SearchForm />
    </>
  )
}
