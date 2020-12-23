import React from 'react';
import {hot} from 'react-hot-loader/root';
import {compose} from 'redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import Authorization from 'pages/Authorization/AuthContainer';
import Chat from 'pages/Chat/ChatContainer';

const Routes = () => (
  <Switch>
		<Route path="/" exact>
			<Redirect to="/chat" />
		</Route>
		<Route path="/chat" exact>
			<Chat/>
		</Route>
		<Route path="/auth" exact>
			<Authorization />
		</Route>
  </Switch>
);

export default compose<typeof React.Component>(hot)(Routes);
