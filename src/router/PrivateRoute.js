import React, { PropTypes } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import { setCookie, getCookie } from '@utils/utils';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => {
		let isLogin = getCookie('isLogin');

	    return isLogin ? (
	    	<Component {...props}/>
	    ) : (
	    	<Redirect to={{
	        	pathname: '/login',
	        	state: { from: props.location }
	    	}}/>
	    )
	}}/>
);

export default PrivateRoute;