import {fork} from 'redux-saga/effects'
import { acceptWatcher } from './sagas'

export function* rootSaga() {
  yield fork(acceptWatcher)
}