import { createSelector } from 'reselect';

const selectSession = (state) => state.session;

export const selectCurrentSession = createSelector(
  [selectSession],
  session => session.currentSession
);

export const selectChat = createSelector(
  [selectCurrentSession],
  currentSession => currentSession.chat
);

export const selectPolls = createSelector(
  [selectCurrentSession],
  currentSession => currentSession.polls
);
