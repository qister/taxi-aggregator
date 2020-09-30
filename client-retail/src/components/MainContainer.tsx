import React, { useContext, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { MobXProviderContext, observer, useObserver } from 'mobx-react'
import { PendingCard } from './OrderPending'
import { SearchForm } from './SearchForm'

const useStores = () => {
  return useContext(MobXProviderContext)
}

const useUserData = () => {
  const { store } = useStores() 
  return useObserver( () => ({
    
    appStore: store,
  }))
}

export const MainContainer = observer(() => {

  const {appStore} = useUserData()

  console.log('AppStore: ', appStore.username);
  

  useEffect(() => {
    const wsConnect = () => {
      const client = new W3CWebSocket('ws://localhost:8000')

      client.onopen = () => {
        console.log('connected')
        // appStore.setOnline()
      }

      client.onmessage = (message) => {
        console.log('Message data: ', message.data)

        if (message.data === 'accepted') {
          appStore.setOrderStatus('accepted')
        }
        
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
})
