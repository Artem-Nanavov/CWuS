import React from "react";
import {render} from "react-dom";
import Routes from './Routes';
import {ConnectedRouter, routerMiddleware} from 'connected-react-router';
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import createRootReducer from './rootReducer';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {StateType} from 'typesafe-actions';
import {batchDispatchMiddleware, enableBatching} from 'redux-batched-actions';
import rootSaga from './rootSaga';
import initializeAxios from 'library/utils/fetch';

import './index.scss';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const rootReducer = createRootReducer(history);

export type RootState = StateType<typeof rootReducer>;

export const store = createStore(
	enableBatching(rootReducer as any),
	composeWithDevTools(
		applyMiddleware(
			routerMiddleware(history),
			sagaMiddleware,
			batchDispatchMiddleware,
		),
	),
);

export const dispatchSomething = (action: any) => {
	store.dispatch(action);
};

export const fetches = () => initializeAxios(store.getState() as RootState, dispatchSomething);

sagaMiddleware.run(rootSaga);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Routes />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app'),
);
