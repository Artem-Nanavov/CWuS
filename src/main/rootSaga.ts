import {all, fork} from 'redux-saga/effects';
import authSaga from 'pages/Authorization/saga';
import userSaga from 'library/common/sagas/user';
import chatSaga from 'pages/Chat/saga';

export default function* rootSaga() {
	yield all([
		fork(authSaga),
		fork(userSaga),
		fork(chatSaga),
	]);
}
