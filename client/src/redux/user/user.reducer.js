import UserActionTypes from './user.types';

const INITIAL_STATE = {
  id: null,
  displayName: null,
  socket: null,
  error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UserActionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        displayName: action.payload.name,
        error: null
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
        socket: null,
        error: null
      }
    case UserActionTypes.DISCONNECT_USER_FAILURE:
    case UserActionTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;
