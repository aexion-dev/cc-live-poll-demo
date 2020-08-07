import { takeLatest, put, all, call } from 'redux-saga/effects';
import SessionActionTypes from './session.types';
import {
  joinSession,
  emitChatMessage,
  emitPollMessage,
  emitVoteMessage } from '../../socket.utils';
import {
  joinSessionSuccess,
  joinSessionFailure,
} from './session.actions';

export function* joinSessionStart({ payload: { sessionId, topic, speaker }}) {
  try {
    const session = yield joinSession(sessionId, topic, speaker);
    console.log(session);
    yield put(joinSessionSuccess(session));
  } catch(error) {
    put(joinSessionFailure(error));
  }
}

export function* chatMessageSent({ payload }) {
  try {
    yield emitChatMessage(payload);
  } catch(error) {
    console.log(error);
  }
}

export function* pollMessageSent({ payload }) {
  try {
    yield emitPollMessage(payload);
  } catch(error) {
    console.log(error);
  }
}

export function* voteMessageSent({ payload }) {
  try {
    console.log(payload);
    yield emitVoteMessage(payload);
  } catch(error) {
    console.log(error);
  }
}

export function* onJoinSessionStart() {
  yield takeLatest(SessionActionTypes.JOIN_SESSION_START, joinSessionStart);
}

export function* onChatMessageSent() {
  yield takeLatest(SessionActionTypes.SEND_CHAT_MESSAGE, chatMessageSent);
}

export function* onPollMessageSent() {
  yield takeLatest(SessionActionTypes.SEND_POLL_MESSAGE, pollMessageSent);
}

export function* onVoteMessageSent() {
  yield takeLatest(SessionActionTypes.SEND_VOTE_MESSAGE, voteMessageSent);
}

export function* sessionSagas() {
  yield all([
    call(onJoinSessionStart),
    call(onChatMessageSent),
    call(onPollMessageSent),
    call(onVoteMessageSent)
  ])
}
