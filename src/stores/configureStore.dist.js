import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';



let finalCreateStore = compose(
	applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState);
	return store;
}