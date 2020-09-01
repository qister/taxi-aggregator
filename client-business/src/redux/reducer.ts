import { Action } from 'redux'
import { SET_ORDERS } from './constants'

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
    case SET_ORDERS: {
      return { ...state, orders: [...state.orders, action.payload] }
    }
    default:
      return state
  }
}
