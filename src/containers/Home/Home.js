import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';

import * as TestAction from '@actions/test/actions';
import { Button } from 'antd';
import trophy from '@images/trophy.png';
import pureRender from 'pure-render-decorator';


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
		const { actions, test, loginInfo } = this.props;
		return (
			<Fragment>{/* 片段，用于多个子元素的包裹，减少不必要的标签*/}
				<h1>{loginInfo.userName}</h1>
				<img src={trophy} alt=""/>
				{test.testData && <h1>{test.testData}</h1>}
				<Button type="primary" size="large" onClick={this.handleClick}>Primary</Button>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		test: state.testMain,
		loginInfo: state.loginInfo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(TestAction, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
