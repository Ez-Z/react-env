import React, { Fragment } from 'react';
import {
  Route
} from 'react-router-dom'
import LazyLoad from '@common/LazyLoad/LazyLoad';

const Home = LazyLoad(() => import('../containers/Home/Home'));
const Test = LazyLoad(() => import('../containers/Test/Test'));
// import Home from '@containers/Home/Home';
// import Test from '@containers/Test/Test';

const Routes = (props) => {
	const {
		name,
		mobile,
	} = props;
	return (
		<Fragment>
			<Route exact path="/" component={Home}/>
			<Route path="/test" component={Test}/>
		</Fragment>
	);
};

export default Routes;