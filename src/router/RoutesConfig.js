import React, { Fragment } from 'react';
import {
	Route
} from 'react-router-dom';

import LazyLoad from '@common/LazyLoad/LazyLoad'; // 按需加载容器组件
import PrivateRoute from './PrivateRoute'; // 登录状态判断

import routeconf from './routesconf';

// const Home = LazyLoad(() => import('../containers/Home/Home'));
// const Test = LazyLoad(() => import('../containers/Test/Test'));
const Login = LazyLoad(() => import('../containers/Login/Login'));

const RoutesConfig = (props) => {
	return (
		<Fragment>
			{routeconf.map((item, index) => {
				return <PrivateRoute exact path={item.path} key={`route-${index}`}  component={item.component} />;
			})}
			{/* <PrivateRoute exact path="/" component={Home} />
			<PrivateRoute path="/test/:id" component={Test} /> */}
			<Route path="/login" component={Login} />
		</Fragment>
	);
};
export default RoutesConfig;