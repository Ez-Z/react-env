import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import configureStore from '../stores/configureStore';

import RoutesConfig from './RoutesConfig'; // 登录状态判断

import Header from '@common/Header';
import Footer from '@common/Footer';

const store = configureStore();

const Routes = (props) => {
	return (
		<Provider store={store}>
			<Fragment>
				{ location.href.indexOf('login') < 0 && <Header name="111" /> }
				<div className="com-container">
					<RoutesConfig />
				</div>
				<Footer />
			</Fragment>
		</Provider>
	);
};

export default Routes;