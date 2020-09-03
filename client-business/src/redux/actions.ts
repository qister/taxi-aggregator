import { ACCEPT_ORDER, ADD_TO_ACCEPTED, ADD_TO_PENDING, DELETE_FROM_PENDING } from './constants'

export const addOrderToPendingList = (order: any) => {
  console.log('Order: ', order)

  return {
    type: ADD_TO_PENDING,
    payload: order,
  }
}
export const addOrderToAcceptedList = (order: any) => ({
  type: ADD_TO_ACCEPTED,
  payload: order,
})

export const deleteOrderFromPendingList = (order: any) =>({
  type: DELETE_FROM_PENDING,
  payload: order
})

export const acceptOrder = (order: any) => ({
  type: ACCEPT_ORDER,
  payload: order
})