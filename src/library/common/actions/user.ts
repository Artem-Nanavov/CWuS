import {createAction} from 'typesafe-actions';
import userActionTypes from '../constants/user';

export const login = createAction(userActionTypes.LOGIN)();

export const logout = createAction(userActionTypes.LOGOUT)();

export const requestUserSaga = createAction(userActionTypes.REQUEST_USER_SAGA)();
