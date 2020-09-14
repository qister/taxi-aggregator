import React, { memo, useCallback, useState } from 'react'

import { Card, Avatar, Input, Typography, message } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import { useEffect } from 'react'
import { logDOM } from '@testing-library/react'

import { TestGridCard } from './TestGridCard'
import { TestGridCardAccepted } from './TestGridCardAccepted'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AnyPtrRecord } from 'dns'

const CardListAccepted_ = (props: any) => {
  // const [orders, setOrders] = useState(acceptedOrders)

  // const isEqual = (a: any, b: any) => {
  //   if (a.length != b.length) return false
  //   else {
  //     for (let i = 0; i < a.length; i++) {
  //       if (a[i] != b[i]) {
  //         return false
  //       }
  //     }
  //     return true
  //   }
  // }

  // useEffect(() => {
  //   const equal = isEqual(orders, acceptedOrders)
  //   console.log('Orders', orders)
  //   console.log('Accepted Orders', acceptedOrders)

  //   console.log('Equal', equal)

  //   if (!equal) {
  //     setOrders(acceptedOrders)
  //   }
  // }, [acceptedOrders])

  // const array = useCallback(() => {}, [])

  return (
    <>
      {props.acceptedOrders
        .slice()
        .reverse()
        .map((item: any) => {
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
}

const mapStateToProps = (state: any) => {
  console.log(state.acceptedOrders)

  return {
    acceptedOrders: state.acceptedOrders,
  }
}

const areEqual = (prevProps: any, nextProps: any) => {
  // const isEqual = (a: any, b: any) => {
  //   if (a.length != b.length) return false
  //   else {
  //     for (let i = 0; i < a.length; i++) {
  //       if (a[i] != b[i]) {
  //         return false
  //       }
  //     }
  //     return true
  //   }
  // }

  // const equal = isEqual(prevProps.acceptedOrders, nextProps.acceptedOrders)
  // console.log('Equal', equal)

  // return equal
  console.log('Im here!!')

  return true
}

export const CardListAccepted = connect(
  mapStateToProps,
  null,
)(CardListAccepted_)