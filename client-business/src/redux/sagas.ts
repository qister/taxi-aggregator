import { ACCEPT_ORDER } from './constants';
import { takeEvery, put, call, delay } from 'redux-saga/effects'
import { addOrderToAcceptedList, deleteOrderFromPendingList } from './actions'

export function* acceptWatcher() {
  yield takeEvery(ACCEPT_ORDER, sagaWorker)
}

type Action = {
  type: 'ACCEPT_ORDER'
  payload: string
}

function* sagaWorker(action: Action) {
  try {
    yield put(addOrderToAcceptedList(action.payload))
    yield put(deleteOrderFromPendingList(action.payload))
  } catch (e) {
    console.log(e.message);
  } 
}
