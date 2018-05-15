import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from './DevTools';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

function getDebugSessionKey() {
	const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
	return (matches && matches.length > 0) ? matches[1] : null;
}

const RouterMiddleware = routerMiddleware(history);

const store = createStore(
	rootReducer,
	compose(
	    applyMiddleware(thunk, RouterMiddleware),
	    DevTools.instrument(),
		persistState(getDebugSessionKey())
	)
);
export default store;