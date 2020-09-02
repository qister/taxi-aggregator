import { Action } from 'redux'
import { ACCEPT_ORDER, ADD_ORDER } from './constants'

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
    case ADD_ORDER:
      return { ...state, orders: [...state.orders, action.payload] }

    case ACCEPT_ORDER:
      return {
        ...state,
        acceptedOrders: [...state.acceptedOrders, action.payload],
      }
    default:
      return state
  }
}
