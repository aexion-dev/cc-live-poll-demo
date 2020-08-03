import { takeLatest, put, all, call } from 'redux-saga/effects';
import SessionActionTypes from './session.types';
import { loadSessionHistory, joinSession } from '../../socket.utils';
import {
  loadSessionSuccess,
  loadSessionFailure
} from './session.actions';

export function* loadSession({payload: { sessionId }}) {
  console.log(sessionId);
  try {
    yield console.log(sessionId);
    yield joinSession(sessionId);
    const session = yield loadSessionHistory(sessionId);
    yield put(loadSessionSuccess(session));
  } catch(error) {
    put(loadSessionFailure(error));
  }
}

export function* onLoadSessionStart() {
  yield takeLatest(SessionActionTypes.LOAD_SESSION_START, loadSession);
}

export function* sessionSagas() {
  yield all([
    call(onLoadSessionStart)
  ])
}
