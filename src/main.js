import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';

import configureStore from './stores/configureStore';

import './statics/css/common';
import App from './App';


const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
    </Provider>,
    document.getElementById('app')
);