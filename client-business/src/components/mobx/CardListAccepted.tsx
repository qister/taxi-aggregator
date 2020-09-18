import React, { memo, useCallback, useContext, useState } from 'react'

import { Card, Avatar, Input, Typography, message } from 'antd'
import 'antd/dist/antd.css'
import '../../index.css'
import { useEffect } from 'react'
import { logDOM } from '@testing-library/react'

import { TestGridCard } from './TestGridCard'
import { TestGridCardAccepted } from './TestGridCardAccepted'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AnyPtrRecord } from 'dns'
import { MobXProviderContext, observer } from 'mobx-react'
import { IOrder } from '../../mobx/ordersStore'

const useStores = () => {
  return useContext(MobXProviderContext)
}

const CardListAccepted_ = observer(() => {

  const {store} = useStores()

  return (
    <>
      {store.ordersStore.acceptedOrders
        .slice()
        .reverse()
        .map((item: IOrder) => {
          const { from, to, phone, date, id } = item

          // console.log(typeof date)
          const locale = new Date(date).toLocaleTimeString()
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