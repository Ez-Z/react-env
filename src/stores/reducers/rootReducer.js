import { combineReducers } from 'redux';
import test from './test/index';
import loginInfo from './loginInfo/index';

const rootReducer = combineReducers({
	...test,
	...loginInfo
});

export default rootReducer;