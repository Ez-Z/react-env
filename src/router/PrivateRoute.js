import React, { PropTypes } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import { setCookie, getCookie } from '@utils/utils';
let isLogin = getCookie('isLogin');

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
	    isLogin ? (
	    	<Component {...props}/>
	    ) : (
	    	<Redirect to={{
	        	pathname: '/login',
	        	state: { from: props.location }
	    	}}/>
	    )
	)}/>
);

export default PrivateRoute;