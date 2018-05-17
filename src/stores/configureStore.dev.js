import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from '@common/DevTools';
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';


// const RouterMiddleware = routerMiddleware(history);

function getDebugSessionKey() {
	const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
	return (matches && matches.length > 0) ? matches[1] : null;
}
let finalCreateStore = compose(
	applyMiddleware(thunk),
	DevTools.instrument(),
	persistState(getDebugSessionKey())
)(createStore);

export default function configureStore(initialState) {

	const store = finalCreateStore(rootReducer, initialState);

	//热替换选项
	if (module.hot) {
		module.hot.accept('./reducers/rootReducer', () => {
			const nextRootReducer = require('./reducers/rootReducer').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}