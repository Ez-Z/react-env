import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Link,
	Route
} from 'react-router-dom';


import './statics/css/common.scss';

import App from './App';



ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('app')
);