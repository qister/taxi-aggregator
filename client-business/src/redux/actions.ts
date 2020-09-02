import { ACCEPT_ORDER, ADD_ORDER } from './constants'

export const addNewOrder = (order: any) => {
  console.log('Order: ', order)

  return {
    type: ADD_ORDER,
    payload: order,
  }
}

export const acceptOrder = (order: any) => ({
  type: ACCEPT_ORDER,
  payload: order,
})