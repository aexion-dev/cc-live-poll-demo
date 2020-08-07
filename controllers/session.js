const { sessions } = state;

const selectIndex = (sessionId) => {
  const index = sessions.findIndex(session => session.id === sessionId);
  if(index > -1) {
    return index;
  }
}

const sessionExists = (sessionId) => {
  if(sessions.some(session => session.id === sessionId)) {
    return true;
  }
  return false;
};

const createSession = (sessionId, topic, speaker) => {
    const newSession = {
      id: sessionId,
      topic: topic ? topic : null,
      speaker: speaker ? speaker : null,
      users: [sessionId],
      chat: [],
      questions: [],
      polls: []
    };
    sessions.push(newSession);

    state = {...state, sessions: sessions};
    return(newSession);
}

const joinSession = (userId, sessionId) => {
  const index = sessions.findIndex(session => session.id === sessionId);
  if(index > -1) {
    sessions[index].users.push(userId);
  }

  state = {...state, sessions: sessions};
  return(state.sessions[index]);
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

const updateChat = (sessionId, message) => {
  const index = sessions.findIndex(session => session.id === sessionId);

  if(index > -1) {
    sessions[index].chat.push(message);
  }

  state = {...state, sessions: sessions}
}

const updatePolls = (sessionId, data) => {
  const index = sessions.findIndex(session => session.id === sessionId);
  if(index > -1) {
    sessions[index].polls.push(data);
  }

  state = {...state, sessions: sessions}
}

const updateVotes = (sessionId, data) => {
  const index = sessions.findIndex(session => session.id === sessionId);
  const { pollIndex, answerIndex } = data;

  if(index > -1) {
    sessions[index].polls = sessions[index].polls.map((poll, i) =>
      i === pollIndex
      ? {
          ...poll,
          totalVotes: poll.totalVotes + 1,
          options: Object.fromEntries(Object.entries(poll.options)
            .map(([k, v]) =>
              parseInt(k) === answerIndex
              ? [k, {...v, votes: v.votes + 1}]
              : [k, v]
            ))
        }
      : poll
    );
  }

  state = {...state, sessions: sessions}
}

module.exports = {
  selectIndex,
  sessionExists,
  createSession,
  joinSession,
  leaveSession,
  closeSession,
  updateChat,
  updatePolls,
  updateVotes
}
