import { call, all, put, takeLatest } from 'redux-saga/effects';
import { api } from '../../config/api';
import { USER_URL } from '../../config/url';
import { getAllUsersFail, getAllUsersSuccess, IGetUserDetails } from '../authentication/action';
import { types } from './types';
import { Action } from 'redux';

/** Workers */
function* getAllUsers(): any {
    try {
        const response = yield call(api, USER_URL, 'GET', null, 2, 2000);
        yield put(getAllUsersSuccess(response));
    } catch (error) {
        yield put(getAllUsersFail(error));
    }
}

/** Watchers */
interface TaskAction extends Action {
    payload: IGetUserDetails;
}

function* getAllUsersWatcher() {
    yield takeLatest<TaskAction>(types.GET_ALL_USERS, getAllUsers);
}

export default function* authenticationSaga() {
    yield all([getAllUsersWatcher()]);
}
