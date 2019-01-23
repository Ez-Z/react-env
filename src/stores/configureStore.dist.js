import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import createSagaMiddleware from "redux-saga";

import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();


let finalCreateStore = compose(
	applyMiddleware(thunk),
	applyMiddleware(sagaMiddleware),
)(createStore);

export default function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState);
	sagaMiddleware.run(rootSagas);
	return store;
}