import { combineReducers } from 'redux';
import test from './test';
import user from './user';

const rootReducer = combineReducers({
	...test,
	...user
});

export default rootReducer;