import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.sagas';
import { sessionSagas } from './session/session.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(sessionSagas)
  ])
}
