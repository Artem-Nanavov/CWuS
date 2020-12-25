import { createAction, createCustomAction } from 'typesafe-actions';
import userActionTypes from '../constants/user';

export const login = createAction(userActionTypes.LOGIN)();

export const logout = createAction(userActionTypes.LOGOUT)();

export const requestUserSaga = createAction(userActionTypes.REQUEST_USER_SAGA)();

export const setUserData = createCustomAction(userActionTypes.SET_USER_DATA,
  (id: string, username: string) => ({id, username}),
);
