import { Socket } from 'socket.io-client';
import {createCustomAction, createAction} from 'typesafe-actions';
import chatActionTypes from './constants';

export const initSocketSaga = createCustomAction(chatActionTypes.INIT_SOCKET, () => ({}));
export const setSocket = createCustomAction(chatActionTypes.SET_SOCKET, (socket: Socket) => ({socket}));
