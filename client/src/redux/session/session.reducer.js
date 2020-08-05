import SessionActionTypes from './session.types';

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
        currentSession: { ...action.payload, polls:       [{
                options: [
                  {content: "Good", votes: 0},
                  {content: "Bad", votes: 0},
                  {content: "Not sure", votes: 0},
                  {content: "Fantastic", votes: 0},
                ],
                question: "How are you feeling today?",
                senderId: "1234",
                totalVotes: 0,
                voteComplete: false
              }] },
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
    default:
      return state;
  }
}

export default sessionReducer;
