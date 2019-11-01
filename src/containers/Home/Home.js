import React, { PureComponent, Fragment, useState } from 'react';
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

import HooksTest from './components/HooksTest';
// import DndTest from './DndTest';
// import Editor from './components/Editor';


@connect(({ testMain, userInfo, counter }) => ({
	test: testMain,
	userInfo: userInfo,
	num: counter.num
}), (dispatch) => ({
	actions: bindActionCreators(TestAction, dispatch),
	dispatch
}))
class Home extends PureComponent {
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
		const {
			actions,
			test,
			userInfo,
			num,
			dispatch
		} = this.props;
		return (
			<>
				{/* <h1>{userInfo.userName}</h1> */}
				<img src={trophy} alt=""/>
				{test.testData && <h1>{test.testData}</h1>}
				<Button type="primary" size="large" onClick={this.handleClick}>Primary</Button>
				<div className="counter">
					<p>{num}</p>
					<Button size="large" onClick={() => dispatch({type: 'counter/add'}) }>+</Button>
					<Button size="large" onClick={() => dispatch({type: 'counter/minus'}) }>-</Button>
				</div>
				<HooksTest />
			</>
		);
	}
}




export default Home;
