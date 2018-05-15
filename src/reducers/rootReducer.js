import { combineReducers } from 'redux';
import test from 'test/index.js';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	...test,
	router: routerReducer
});

export default rootReducer;