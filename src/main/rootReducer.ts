import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import {History} from 'history';

const createRootReducer = (history: History) => combineReducers({
	router: connectRouter(history as History),
});

export default createRootReducer;
