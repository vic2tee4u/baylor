import produce from 'immer';
import { IGetUserDetails, User } from './action';
import { types } from './types';

interface IInitial {
    users: User[];
    gettingUsers: boolean;
    gettingUserDetails: boolean;
    selecteduserDetails: User | null;
    gettingUserError: unknown;
}

const initialState: IInitial = {
    users: [],
    gettingUserDetails: false,
    gettingUsers: false,
    selecteduserDetails: null,
    gettingUserError: null,
};

const authentication = (state = initialState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_ALL_USERS:
            return produce(state, draftState => {
                draftState.gettingUsers = true;
            });
        case types.GET_ALL_USERS_SUCCESS:
            return produce(state, draftState => {
                draftState.users = payload;
                draftState.gettingUsers = false;
            });
        case types.GET_ALL_USERS_FAIL:
            return produce(state, draftState => {
                draftState.gettingUserError = payload;
                draftState.gettingUsers = false;
            });
        case types.GET_USER_DETAILS:
            return produce(state, draftState => {
                const { user } = payload as IGetUserDetails;
                draftState.selecteduserDetails = user;
            });
        case types.CLEAR_SELECTION:
            return produce(state, draftState => {
                draftState.selecteduserDetails = null;
            });
        default:
            return state;
    }
};

export { authentication };
