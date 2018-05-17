import React, { Fragment } from 'react';
import {
  Route
} from 'react-router-dom';
import LazyLoad from '@common/LazyLoad/LazyLoad'; //按需加载容器组件
import PrivateRoute from './PrivateRoute';


const Home = LazyLoad(() => import('../containers/Home/Home'));
const Test = LazyLoad(() => import('../containers/Test/Test'));
const Login = LazyLoad(() => import('../containers/Login/Login'));

const Routes = (props) => {
	return (
		<Fragment>
			<PrivateRoute exact path="/" component={Home} />
			<PrivateRoute path="/test" component={Test} />
			<Route path="/login" component={Login} />
		</Fragment>
	);
};

export default Routes;