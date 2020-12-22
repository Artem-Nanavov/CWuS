import {ActionType, getType} from 'typesafe-actions';
import * as actions from './actions';

export type AuthState = Readonly<{
	isPending: boolean;
	accessToken: string | null;
	refreshToken: string | null;
}>;

const initialState: AuthState = {
	isPending: false,
	accessToken: null,
	refreshToken: null,
};

export type authActions = ActionType<typeof actions>;

export default (
  state = initialState,
  action: authActions,
) => {
  switch (action.type) {
    case(getType(actions.toggleIsPennding)):
      return {...state, isPending: !state.isPending};
    case getType(actions.setTokens):
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case getType(actions.setRefreshToken):
      return {
        ...state,
        refreshToken: action.refreshToken,
      };
    case getType(actions.setAccessToken):
      return {
        ...state,
        accessToken: action.accessToken,
      };
    default:
      return state;
  };
};
