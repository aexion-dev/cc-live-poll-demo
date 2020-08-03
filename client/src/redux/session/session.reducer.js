import SessionActionTypes from './session.types';

const INITIAL_STATE = {
  session: null,
  error: null
}

const sessionReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SessionActionTypes.LOAD_SESSION_SUCCESS:
      return {
        ...state,
        session: action.payload,
        error: null
      }
    case SessionActionTypes.LOAD_SESSION_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default sessionReducer;
