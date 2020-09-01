import { reducer } from './reducer';
import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'

// import logger from 'redux-logger'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any
  }
}

export const configureStore = () =>
  createStore(
    reducer,
    compose(
      // applyMiddleware(logger),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
