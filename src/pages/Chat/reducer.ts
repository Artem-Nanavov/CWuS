import { Socket } from 'socket.io-client';
import {ActionType, getType} from 'typesafe-actions';
import * as actions from './actions';

export type ChatState = Readonly<{
  socket: Socket | null;
  isConnected: boolean;
}>;

const initialState: ChatState = {
  socket: null,
  isConnected: false,
};

export type chatActions = ActionType<typeof actions>;

export default (
  state = initialState,
  action: chatActions,
) => {
  switch (action.type) {
    case(getType(actions.setSocket)):
      return {
        ...state,
        socket: action.socket,
        isConnected: true,
      };
    default:
      return state;
  };
};
