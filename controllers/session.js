const { sessions } = state;

const selectIndex = (sessionId) => {
  const index = sessions.findIndex(session => session.id === sessionId);
  if(index > -1) {
    return index;
  }
}

const sessionExists = (sessionId) => {
  console.log(sessions);
  if(sessions.some(session => session.id === sessionId)) {
    return true;
  }
  return false;
};

const createSession = (sessionId) => {
    sessions.push({
      id: sessionId,
      name: null,
      owner: null,
      users: [sessionId],
      chat: [],
      questions: [],
      polls: []
    });

    state = {...state, sessions: sessions};
}

const joinSession = (userId, sessionId) => {
  const index = sessions.findIndex(session => session.id === sessionId);
  if(index > -1) {
    sessions[index].users.push(userId);
  }

  state = {...state, sessions: sessions};
}

const closeSession = (sessionId) => {
  const index = sessions.findIndex(session => session.id === sessionId);
  if(index > -1) {
    sessions.splice(index, 1);
  }
}

const leaveSession = (userId, sessionId) => {
  const index = sessions.findIndex(session => session.id === sessionId);
  if(index > -1) {
    const userIndex = sessions[index].users.findIndex(user => user === userId);

    if(userIndex > -1) {
      sessions[index].users.splice(userIndex, 1);
    }
  }

  state = {...state, sessions: sessions};
}

module.exports = {
  selectIndex,
  sessionExists,
  createSession,
  joinSession,
  leaveSession,
  closeSession,
}
