import {
	takeLatest, call, put,
} from 'redux-saga/effects';
import {fetches} from 'main';
import userActionTypes from '../constants/user';
import { push } from 'connected-react-router';

function* requestLogoutUser() {
	try {
		yield call(fetches().fetchUser.post, 'logout');

		yield put(push('/auth'));
	} catch (e) {
		console.error('error', e);
	}
}

export default function* watchCommonLayout() {
	yield takeLatest(userActionTypes.LOGOUT, requestLogoutUser);
}
