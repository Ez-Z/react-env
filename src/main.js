import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Link,
	Route
} from 'react-router-dom';


import './statics/css/common';

import Routes from './router';



ReactDOM.render(
	<Router>
		<Routes />
	</Router>,
	document.getElementById('app')
);