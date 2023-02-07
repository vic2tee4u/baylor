import { createAction } from 'redux-act';
import { types } from './types';

export interface IGetUserDetails {
    /**Id of customer */
    user: User;
}

type Geo = {
    let: string;
    lng: string;
};

type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
};

export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
};

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export const getAllUsers = createAction(types.GET_ALL_USERS);
export const getAllUsersSuccess = createAction<User[]>(types.GET_ALL_USERS_SUCCESS);
export const getAllUsersFail = createAction<any>(types.GET_ALL_USERS_FAIL);

export const getUserDetails = createAction<IGetUserDetails>(types.GET_USER_DETAILS);
export const clearSelection = createAction(types.CLEAR_SELECTION);
