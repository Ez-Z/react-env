import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import configureStore from './stores/configureStore';

import Routes from '@router/Routes'; // 登录状态判断

import Header from '@common/Header';
import Footer from '@common/Footer';

const store = configureStore();

const App = (props) => {
	return (
		<Provider store={store}>
			<Fragment>
				{location.href.indexOf('login') < 0 && <Header name="111" />}
				<div className="com-container">
					<Routes />
				</div>
				{location.href.indexOf('login') < 0 && <Footer />}
			</Fragment>
		</Provider>
	);
};

export default App;