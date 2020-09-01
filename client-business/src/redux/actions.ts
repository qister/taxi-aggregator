import {ACCEPT_ORDER, SET_ORDERS} from './constants'

export const addNewOrder = (order: any) => ({
  type: SET_ORDERS,
  payload: order
})

export const acceptOrder = (order: any) => ({
  type: ACCEPT_ORDER,
  payload: order
})



