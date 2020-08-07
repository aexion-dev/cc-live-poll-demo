import UserActionTypes from './user.types';

export const createUserStart = (name) => ({
  type: UserActionTypes.CREATE_USER_START,
  payload: name
});

export const createUserSuccess = (user) => ({
  type: UserActionTypes.CREATE_USER_SUCCESS,
  payload: user
});

export const createUserFailure = (error) => ({
  type: UserActionTypes.CREATE_USER_FAILURE,
  payload: error
});

export const connectUserStart = (user) => ({
  type: UserActionTypes.CONNECT_USER_START,
  payload: user
});

export const connectUserSuccess = (socket) => ({
  type: UserActionTypes.CONNECT_USER_SUCCESS,
  payload: socket
});

export const connectUserFailure = (error) => ({
  type: UserActionTypes.CONNECT_USER_FAILURE,
  payload: error
});

export const disconnectUserStart = (user) => ({
  type: UserActionTypes.DISCONNECT_USER_START,
  payload: user
});

export const disconnectUserSuccess = (user) => ({
  type: UserActionTypes.DISCONNECT_USER_SUCCESS
});

export const disconnectUserFailure = (error) => ({
  type: UserActionTypes.DISCONNECT_USER_FAILURE,
  payload: error
});
