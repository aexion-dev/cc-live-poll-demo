import { takeLatest, put, all, call } from 'redux-saga/effects';
import SessionActionTypes from './session.types';
import { joinSession } from '../../socket.utils';
import {
  joinSessionSuccess,
  joinSessionFailure,
} from './session.actions';

export function* joinSessionStart({ payload: { sessionId }}) {
  try {
    const session = yield joinSession(sessionId);
    yield put(joinSessionSuccess(session));
  } catch(error) {
    put(joinSessionFailure(error));
  }
}

export function* onJoinSessionStart() {
  yield takeLatest(SessionActionTypes.JOIN_SESSION_START, joinSessionStart);
}

export function* sessionSagas() {
  yield all([
    call(onJoinSessionStart)
  ])
}
