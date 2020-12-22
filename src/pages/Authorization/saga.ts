import {
	call, put, takeLatest, select,
} from 'redux-saga/effects';
import {getRefreshTokenFromLS, setRefreshTokenToLS} from 'library/utils/token';
import {push} from 'connected-react-router';
import initializeAxios from 'library/utils/fetch';
import {RootState, dispatchSomething} from 'main';
import * as userAction from 'library/common/actions/user';
import * as authorizationActions from './actions';
import authorizationActionTypes from './constants';
import {getAccessToken, requestLogin, requestReg} from './api';

export function* getLocalRefreshTokenSaga() {
	try {
    const refreshToken = getRefreshTokenFromLS() || '';
    
		if (refreshToken !== '') {
			yield put(authorizationActions.setRefreshToken(refreshToken));
		} else {
			throw new Error('There no any token in local storage...');
		}
	} catch (e) {
    console.error('e', e);
	}
}

export function* getAccessTokenSaga() {
	try {
		const refreshToken = yield select((_state: RootState) => _state.auth.refreshToken);
    const access = yield call(getAccessToken, refreshToken);
    
		yield call(authorizationActions.setAccessToken, access.data.access);
	} catch (e) {
		console.error('e', e);
	}
}

function* authenticateWithLoginAndPasswordSaga(
	action: ReturnType<typeof authorizationActions.authenticateWithLoginAndPasswordSaga>,
) {
	yield put(authorizationActions.toggleIsPennding());

	try {
    const res = yield call(requestLogin, {login: action.login, password: action.password});
    
    yield put(authorizationActions.setTokens(res.data.access, res.data.refresh));
		const state = yield select((_state: RootState) => _state);

		yield call(initializeAxios, state, dispatchSomething);
		yield call(setRefreshTokenToLS, res.data.refresh);
		// yield put(userAction.requestUserSaga());
		// yield put(userAction.login());
		yield put(push('/chat'));
	} catch (e) {
    console.error('e', e);
    console.error('e', e.response.status);
	}

	yield put(authorizationActions.toggleIsPennding());
}

function* regWithDataSaga(
	action: ReturnType<typeof authorizationActions.regWithDataSaga>,
) {
	yield put(authorizationActions.toggleIsPennding());

	try {
    const res = yield call(requestReg, {email: action.email, password: action.password, username: action.username});
    
    yield put(authorizationActions.setTokens(res.data.access, res.data.refresh));
		const state = yield select((_state: RootState) => _state);

		yield call(initializeAxios, state, dispatchSomething);
		yield call(setRefreshTokenToLS, res.data.refresh);
		// yield put(userAction.requestUserSaga());
		// yield put(userAction.login());
		yield put(push('/chat'));
	} catch (e) {
    console.error('e', e);
    console.error('e', e.response.status);
	}

	yield put(authorizationActions.toggleIsPennding());
}

export default function* watchEntities() {
	yield takeLatest(authorizationActionTypes.REG_WITH_DATA_SAGA, regWithDataSaga);
	yield takeLatest(authorizationActionTypes.GET_LOCAL_REFRESH_TOKEN_SAGA, getLocalRefreshTokenSaga);
	yield takeLatest(authorizationActionTypes.AUTH_WITH_LOGIN_AND_PASSWORD_SAGA,authenticateWithLoginAndPasswordSaga);
}
