import { Action } from 'redux'
import { ADD_TO_ACCEPTED, ADD_TO_PENDING, DELETE_FROM_PENDING } from './constants'

type State = {
  orders: any[]
  acceptedOrders: any[]
}

const initialState: State = {
  orders: [],
  acceptedOrders: [],
}

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_PENDING:
      return { ...state, orders: [...state.orders, action.payload] }

    case ADD_TO_ACCEPTED:
      return {
        ...state,
        acceptedOrders: [...state.acceptedOrders, action.payload],
      }
    case DELETE_FROM_PENDING:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload.id)
      }
    default:
      return state
  }
}
