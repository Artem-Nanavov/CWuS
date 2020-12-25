import {ActionType, getType} from 'typesafe-actions';
import * as actions from '../actions/user';

export type UserState = Readonly<{
	isAuth: boolean;
	user_id: string | null;
	username: string | null;
}>;

const initialState: UserState = {
	isAuth: false,
	user_id: null,
	username: null,
};

export type UserActions = ActionType<typeof actions>;

export default (state = initialState, action: UserActions): UserState => {
	switch (action.type) {
	case getType(actions.login):
		return {
			...state,
			isAuth: true,
		};
	case getType(actions.logout):
		return {
			...state,
			isAuth: false,
			user_id: null,
		};
	case getType(actions.setUserData):
		return {
			...state,
			user_id: action.id,
			username: action.username,
		};
	default:
		return state;
	}
};
