import {createCustomAction, createAction} from 'typesafe-actions';
import authorizationActionTypes from './constants';

export const toggleIsPennding = createAction(authorizationActionTypes.TOGGLE_ISPENNDING)();

export const setTokens = createCustomAction(authorizationActionTypes.SET_TOKENS,
	(accessToken: string, refreshToken: string) => ({accessToken, refreshToken}),
);

export const setRefreshToken = createCustomAction(authorizationActionTypes.SET_REFRESH_TOKEN,
	(refreshToken: string) => ({refreshToken}),
);

export const setAccessToken = createCustomAction(authorizationActionTypes.SET_ACCESS_TOKEN,
	(accessToken: string) => ({accessToken}),
);

export const getLocalRefreshTokenSaga = createAction(authorizationActionTypes.GET_LOCAL_REFRESH_TOKEN_SAGA)();

export const authenticateWithLoginAndPasswordSaga = createCustomAction(
	authorizationActionTypes.AUTH_WITH_LOGIN_AND_PASSWORD_SAGA,
	(login: string, password: string) => ({login, password}),
);

export const regWithDataSaga = createCustomAction(authorizationActionTypes.REG_WITH_DATA_SAGA,
	(email: string, password: string, username: string) => ({username, password, email})
);
