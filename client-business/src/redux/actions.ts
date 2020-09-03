import { ADD_TO_ACCEPTED, ADD_TO_PENDING, DELETE_FROM_PENDING } from './constants'

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

export const deleteFromPendingList = (order: any) =>({
  type: DELETE_FROM_PENDING,
  payload: order
})

export const addToTempList = (order: any) => {
  return (dispatch: any) => {
    dispatch(deleteFromPendingList(order))
    dispatch(addOrderToAcceptedList(order))
  }
}