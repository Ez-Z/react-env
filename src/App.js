import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
// import configureStore from './stores/configureStore';
import Routes from '@router/Routes';

import Header from '@common/Header';
import Footer from '@common/Footer';

import dva from './utils/dva';
import models from './models';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

// const store = configureStore();

const App = (props) => {
	return (
		<Provider store={store}>
			<>
				{location.href.indexOf('login') < 0 && <Header name="111" />}
				<div className="com-container">
					<Routes />
				</div>
				{location.href.indexOf('login') < 0 && <Footer />}
			</>
		</Provider>
	);
};

export default App;