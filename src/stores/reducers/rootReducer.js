import { combineReducers } from 'redux';
import test from './test/index';

const rootReducer = combineReducers({
	...test,
});

export default rootReducer;