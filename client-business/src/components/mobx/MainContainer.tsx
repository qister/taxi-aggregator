import React, { useContext, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { MobXProviderContext, observer, useObserver } from 'mobx-react'
import { MainList } from './MainList'
import { PrimarySearchAppBar } from './Navigation'

const useStores = () => {
  return useContext(MobXProviderContext)
}

const useUserData = () => {
  const { store } = useStores() 
  return useObserver( () => ({
    ordersStore: store.ordersStore,
    appStore: store.appStore,
  }))
}

export const MainContainer = observer(() => {
  const { ordersStore, appStore } = useUserData()

  useEffect(() => {
    const wsConnect = () => {
      const client = new W3CWebSocket('ws://localhost:8001')

      client.onopen = () => {
        console.log('connected')
        appStore.setOnline()
      }

      client.onmessage = (message) => {

        console.log('message', message);
        

        if (typeof message.data === 'string') {
          console.log('Message data: ', message.data);
          
          const messageParsed = JSON.parse(message.data)
          const dataFromServer: any = messageParsed.data
          // console.log('got reply! ', dataFromServer)
          switch (messageParsed.type) {
            case 'message':
              ordersStore.addToPending(dataFromServer)
              break
            case 'decline':
              console.log('dataFromServer to decline', dataFromServer);
              
              ordersStore.deleteFromPending(dataFromServer)
              break
          }
          
        }
      }

      client.onclose = (e) => {
        console.log(
          'Socket is closed. Reconnect will be attempted in 1 second.',
          e.reason,
        )
        appStore.setOffline()
        setTimeout( () => {
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
      <PrimarySearchAppBar />
      <MainList />
    </>
  )
})
