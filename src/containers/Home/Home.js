import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';

import * as TestAction from '@actions/test';
import { Button } from 'antd';
import trophy from '@images/trophy.png';
import pureRender from 'pure-render-decorator';


@connect((state) => ({
	test: state.testMain,
	userInfo: state.userInfo
}), (dispatch) => ({
	actions: bindActionCreators(TestAction, dispatch)
}))
class Home extends Component {
	constructor() {
		super();
	}

	state = {
		message: "Hello, world!!"
	};

	handleClick = () => {
		this.props.actions.testAction('sss');
		// this.props.history.push({
		//      pathname: '/test',
		// });
	}

	render() {
		let {
			message
		} = this.state;
		console.log(this.props);
		const { actions, test, userInfo } = this.props;
		return (
			<Fragment>{/* 片段，用于多个子元素的包裹，减少不必要的标签*/}
				{/* <h1>{userInfo.userName}</h1> */}
				<img src={trophy} alt=""/>
				{test.testData && <h1>{test.testData}</h1>}
				<Button type="primary" size="large" onClick={this.handleClick}>Primary</Button>
			</Fragment>
		);
	}
}




export default Home;
