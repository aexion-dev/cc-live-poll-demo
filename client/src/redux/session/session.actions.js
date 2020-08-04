import SessionActionTypes from './session.types';

export const joinSessionStart = (sessionId) => ({
  type: SessionActionTypes.JOIN_SESSION_START,
  payload: sessionId
});

export const joinSessionSuccess = (session) => ({
  type: SessionActionTypes.JOIN_SESSION_SUCCESS,
  payload: session
});

export const joinSessionFailure = (error) => ({
  type: SessionActionTypes.JOIN_SESSION_FAILURE,
  payload: error
});

export const sendChatMessage = (msg) => ({
  type: SessionActionTypes.SEND_CHAT_MESSAGE,
  payload: msg
});

export const receivedChatMessage = (msg) => ({
  type: SessionActionTypes.RECEIVED_CHAT_MESSAGE,
  payload: msg
});

export const sendPollMessage = (msg) => ({
  type: SessionActionTypes.SEND_POLL_MESSAGE,
  payload: msg
});

export const receivedPollMessage = (msg) => ({
  type: SessionActionTypes.RECEIVED_POLL_MESSAGE,
  payload: msg
});
