import {
	takeLatest, select,
} from 'redux-saga/effects';
import {RootState} from 'main';
import {getLocalRefreshTokenSaga} from 'pages/Authorization/saga';
import userActionTypes from '../constants/user';

function* requestUserSaga() {
	// yield put(setGlobalLoading(true));

	yield getLocalRefreshTokenSaga();

	const refreshToken = yield select((state: RootState) => state.auth.refreshToken);

	// yield put(setGlobalLoading(false));
}

export default function* watchCommonLayout() {
	yield takeLatest(userActionTypes.REQUEST_USER_SAGA, requestUserSaga);
}
