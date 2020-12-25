import {
	call, put, takeLatest, select,
} from 'redux-saga/effects';
import {RootState} from 'main';
import * as chatActions from './actions';
import chatActionTypes from './constants';
import { io } from 'socket.io-client';

function* initSocketSaga(
	action: ReturnType<typeof chatActions.initSocketSaga>,
) {
	try {
    const state = yield select((_state: RootState) => _state);
    const access = state.auth.accessToken;

    const socket = io('http://localhost:8000', {
      extraHeaders: {
        Authorization: `${access}`,
      },
    });

    socket.on('user join', (username: string) => {
      console.log('user join', username);
    });

    yield put(chatActions.setSocket(socket));
	} catch (e) {
    console.error('e', e);
	}
}

export default function* watchEntities() {
	yield takeLatest(chatActionTypes.INIT_SOCKET, initSocketSaga);
}
