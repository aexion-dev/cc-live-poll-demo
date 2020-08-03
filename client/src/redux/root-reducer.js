import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import sessionReducer from './session/session.reducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const userPersistConfig = {
  key: 'user',
  storage: storage,
  blacklist: ['socket', 'error']
}

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  session: sessionReducer
});


export default persistReducer(persistConfig, rootReducer);
