import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import taskReducer from './task/task.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const appReducer = combineReducers({
    user: userReducer,
    task: taskReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGGED_OUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
