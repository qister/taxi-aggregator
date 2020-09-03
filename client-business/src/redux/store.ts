import { reducer } from './reducer'
import { createStore, applyMiddleware, compose } from 'redux'
import { rootSaga } from './rootSaga'
import createSagaMiddleware from 'redux-saga'
// import thunk from 'redux-thunk'

// import logger from 'redux-logger'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any
  }
}

const saga = createSagaMiddleware()

export const configureStore = () =>
  createStore(
    reducer,
    compose(
      applyMiddleware(saga),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  )

saga.run(rootSaga)
