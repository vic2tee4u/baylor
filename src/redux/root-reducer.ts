import { combineReducers } from 'redux';
import { authentication as userReducer } from './authentication/reducer';

const appReducer = combineReducers({
    user: userReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const reducer = (state: any, action: any) => {
    if (action.type === 'PURGE') {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};

export { reducer };
