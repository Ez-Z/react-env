import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from '@common/DevTools';
import logger from 'redux-logger';
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createSagaMiddleware from "redux-saga";


// const RouterMiddleware = routerMiddleware(history);

// sagas 
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

function getDebugSessionKey() {
	const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
	return (matches && matches.length > 0) ? matches[1] : null;
}
let finalCreateStore = null;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
if (composeEnhancers) {
	finalCreateStore = composeEnhancers(
		applyMiddleware(thunk),
		applyMiddleware(logger),
		applyMiddleware(sagaMiddleware),
		persistState(getDebugSessionKey())
	)(createStore);
} else  {
	finalCreateStore = compose(
		applyMiddleware(thunk),
		applyMiddleware(logger),
		applyMiddleware(sagaMiddleware),
		DevTools.instrument(),
		persistState(getDebugSessionKey())
	)(createStore);
}


export default function configureStore(initialState) {

	const store = finalCreateStore(rootReducer, initialState);
	sagaMiddleware.run(rootSagas);
	// 热替换选项
	if (module.hot) {
		module.hot.accept('./reducers/rootReducer', () => {
			const nextRootReducer = require('./reducers/rootReducer').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}