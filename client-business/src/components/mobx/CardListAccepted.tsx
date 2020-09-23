import React, { useContext } from 'react'
import { MobXProviderContext} from 'mobx-react'
import {observer, useObserver } from 'mobx-react-lite'

import { TestGridCardAccepted } from './TestGridCardAccepted'
import { IOrder } from '../../mobx/ordersStore'

const useStores = () => {
  return useContext(MobXProviderContext)
}

const useUserData = () => {
  const { store } = useStores()
  return useObserver( () => ({
    store: store.ordersStore.acceptedOrders
  }))
}

const CardListAccepted_ = observer(() => {

  const {store}: any = useUserData()

  console.log('Store: ', store);
  

  return (
    <>
      {store
        .slice()
        .reverse()
        .map((item: IOrder) => {
          const { from, to, phone, date, id } = item

          // console.log(typeof date)
          // console.log(locale)

          return (
            <TestGridCardAccepted
              key={id + 50}
              {...{ from, to, phone, date, id }}
            />
          )
          // return <TestCard key={index} {...{ from, to, phone, date }} />
        })}
    </>
  )
})

export const CardListAccepted = CardListAccepted_