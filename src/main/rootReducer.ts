import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {History} from 'history';
import authReducer from 'pages/Authorization/reducer';
import userReducer from 'library/common/reducers/user';
import chatReducer from 'pages/Chat/reducer';

const createRootReducer = (history: History) => combineReducers({
	router: connectRouter(history as History),
	auth: authReducer,
	user: userReducer,
	chat: chatReducer,
});

export default createRootReducer;
