import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
	Redirect
} from 'react-router-dom';

import { Button } from 'antd';

import { setCookie, getCookie } from '@utils/utils';


import * as loginInfoAction from '@actions/loginInfo/actions';


class Login extends Component {
	constructor() {
		super();
	}
	state = {
		message: "Please login",
	}

	handleClick = async () => {
		let nowTime = await this.getTime();
		console.log(nowTime);
		setCookie('isLogin', true);
		this.props.history.push({
			pathname: '/',
		});
		return nowTime;
	}
	getTime = () => {
		return new Promise(resolve => {
			setTimeout(() => resolve("long_time_value"), 2000);
		});			
	}
	render() {
		let isLogin = getCookie('isLogin');
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		const { message } = this.state;
		if (isLogin) {
			return (
				<Redirect to = {from}/>
			);
		}
        
		return (
			<Fragment>{/* 片段，用于多个子元素的包裹，减少不必要的标签*/}
				<h1>{message}</h1>
				<Button type="primary" size="large" onClick={this.handleClick}>登录</Button>
			</Fragment>
		);
	}
}

export default Login;