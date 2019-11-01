import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
} from 'react-router-dom';


import './statics/css/common.scss';

import App from './Layout';



ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('app')
);