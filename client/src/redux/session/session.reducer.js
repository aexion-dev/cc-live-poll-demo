import SessionActionTypes from './session.types';
import { addVoteToPoll } from './session.utils';

const INITIAL_STATE = {
  currentSession: {
    id: null,
    name: null,
    owner: null,
    users: [],
    chat: [],
    questions: [],
    polls: []
  },
  error: null
}

const sessionReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SessionActionTypes.JOIN_SESSION_SUCCESS:
      return {
        ...state,
        currentSession: action.payload,
        error: null
      }
    case SessionActionTypes.JOIN_SESSION_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case SessionActionTypes.SEND_CHAT_MESSAGE:
    case SessionActionTypes.RECEIVED_CHAT_MESSAGE:
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          chat: [
            ...state.currentSession.chat,
            action.payload
          ]
        },
        error: null
      }
      case SessionActionTypes.SEND_POLL_MESSAGE:
      case SessionActionTypes.RECEIVED_POLL_MESSAGE:
        return {
          ...state,
          currentSession: {
            ...state.currentSession,
            polls: [
              ...state.currentSession.polls,
              action.payload
            ]
          },
          error: null
        }
      case SessionActionTypes.SEND_VOTE_MESSAGE:
      case SessionActionTypes.RECEIVED_VOTE_MESSAGE:
        return {
          ...state,
          currentSession: {
            ...state.currentSession,
            polls: addVoteToPoll(
              state.currentSession.polls,
              action.payload
            )
          },
          error: null
        }
    default:
      return state;
  }
}

export default sessionReducer;
