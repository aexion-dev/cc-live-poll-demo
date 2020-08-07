
export const addVoteToPoll = (polls, payload) => {
  const { pollIndex, answerIndex } = payload;

  if(true) {
    return polls.map((poll, i) =>
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
    )
  }

  return polls;
}
