import UserActionTypes from './user.types';

const INITIAL_STATE = {
  displayName: null,
  socket: null,
  isSpeaker: false,
  error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UserActionTypes.SET_USER_NAME:
      return {
        ...state,
        displayName: action.payload,
      }
    case UserActionTypes.CONNECT_USER_SUCCESS:
      return {
        ...state,
        socket: action.payload,
        error: null
      }
    case UserActionTypes.CONNECT_USER_FAILURE:
      return {
        ...state,
        socket: null,
        error: action.payload
      }
    case UserActionTypes.DISCONNECT_USER_SUCCESS:
      return {
        ...state,
        displayName: null,
        socket: null,
        error: null
      }
    case UserActionTypes.DISCONNECT_USER_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;
