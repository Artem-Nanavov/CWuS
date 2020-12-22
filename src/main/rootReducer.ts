import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {History} from 'history';
import authReducer from 'pages/Authorization/reducer';
import userReducer from 'library/common/reducers/user'

const createRootReducer = (history: History) => combineReducers({
	router: connectRouter(history as History),
	auth: authReducer,
	user: userReducer,
});

export default createRootReducer;
