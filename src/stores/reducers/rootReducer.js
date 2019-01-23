import { combineReducers } from 'redux';
import test from './test';
import user from './user';
import counter from '../../models/counter';

const Models = [
  counter
];


function getReducers(models) {
  const reducers = {};
  models.map(item => {
    reducers[item.namespace] = (state = { ...item.state }, action) => {
      const keys = Object.keys(item.reducers);
      const newState = action && keys.indexOf(action.type) >= 0 && item.reducers[action.type](state, action);
      return {
        ...state,
        ...newState
      };
    }
  });
  return reducers;
}

const rootReducer = combineReducers({
	...test,
	...user,
  	...getReducers([...Models]),
});

export default rootReducer;