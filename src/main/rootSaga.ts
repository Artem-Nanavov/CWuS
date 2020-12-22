import {all, fork} from 'redux-saga/effects';
import authSaga from 'pages/Authorization/saga';
import userSaga from 'library/common/sagas/user';

export default function* rootSaga() {
	yield all([
		fork(authSaga),
		fork(userSaga),
	]);
}
