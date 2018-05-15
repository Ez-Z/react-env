import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';


import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

const reduxRouterMiddleware = routerMiddleware(browserHistory);


const store = createStore(
	rootReducer,
	compose(
	    applyMiddleware(thunk, reduxRouterMiddleware)
	)
);

export default store;