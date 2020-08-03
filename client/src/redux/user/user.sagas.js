import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { initiateSocket, disconnectSocket } from '../../socket.utils';
import {
  connectUserSuccess,
  connectUserFailure,
  disconnectUserSuccess,
  disconnectUserFailure
} from './user.actions';

export function* connectUser({payload: { displayName }}) {
  try {
    const socketId = yield initiateSocket();
    yield put(connectUserSuccess(socketId));
  } catch(error) {
    put(connectUserFailure(error));
  }
}

export function* disconnectUser({payload: { user }}) {
  try {
    yield disconnectSocket();
    yield put(disconnectUserSuccess());
  } catch(error) {
    put(disconnectUserFailure(error));
  }
}

export function* onConnectUserStart() {
  yield takeLatest(UserActionTypes.CONNECT_USER_START, connectUser);
}

export function* onDisconnectUserStart() {
  yield takeLatest(UserActionTypes.DISCONNECT_USER_START, disconnectUser);
}

export function* userSagas() {
  yield all([
    call(onConnectUserStart),
    call(onDisconnectUserStart)
  ])
}
