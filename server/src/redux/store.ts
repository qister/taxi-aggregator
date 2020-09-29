import { createStore, applyMiddleware, compose } from 'redux'


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any
  }
}

const rootReducer = () => {}

export const configureStore = () =>
  createStore(
    rootReducer
  )
