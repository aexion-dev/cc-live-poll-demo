import SessionActionTypes from './session.types';

export const loadSessionStart = (sessionId) => ({
  type: SessionActionTypes.LOAD_SESSION_START,
  payload: sessionId
});

export const loadSessionSuccess = (session) => ({
  type: SessionActionTypes.LOAD_SESSION_SUCCESS,
  payload: session
});

export const loadSessionFailure = (error) => ({
  type: SessionActionTypes.LOAD_SESSION_FAILURE,
  payload: error
});
