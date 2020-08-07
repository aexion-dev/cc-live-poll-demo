import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { initiateSocket, disconnectSocket, createUserId } from '../../socket.utils';
import {
  createUserSuccess,
  createUserFailure,
  connectUserSuccess,
  connectUserFailure,
  disconnectUserSuccess,
  disconnectUserFailure
} from './user.actions';

export function* createUser({ payload: displayName }) {
  try {
    const response = yield call(fetch, 'http://localhost:4000/createuser', {
      method : 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: displayName
      })
    });

    const data = yield response.json();
    const { userId } = data;
    yield put(createUserSuccess({ id: userId, name: displayName }));
  } catch(error) {
    put(createUserFailure(error));
  }
}

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

export function* onCreateUserStart() {
  yield takeLatest(UserActionTypes.CREATE_USER_START, createUser);
}

export function* onConnectUserStart() {
  yield takeLatest(UserActionTypes.CONNECT_USER_START, connectUser);
}

export function* onDisconnectUserStart() {
  yield takeLatest(UserActionTypes.DISCONNECT_USER_START, disconnectUser);
}

export function* userSagas() {
  yield all([
    call(onCreateUserStart),
    call(onConnectUserStart),
    call(onDisconnectUserStart)
  ])
}
