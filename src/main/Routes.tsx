import React from 'react';
import {hot} from 'react-hot-loader/root';
import {compose} from 'redux';
import {Route, Switch} from 'react-router-dom';
import Authorization from 'pages/Authorization/Authorization';

const Routes = () => (
  <Switch>
		<Route path="/auth" exact>
			<Authorization />
		</Route>
  </Switch>
);

export default compose<typeof React.Component>(hot)(Routes);
