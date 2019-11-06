import React, { PureComponent, Fragment, useState } from 'react';
import {
	connect
} from 'dva';

import { Button } from 'antd';
import trophy from '@images/trophy.png';

import HooksTest from './components/HooksTest';

@connect(({ counter }) => ({
	num: counter.num
}))
class Home extends PureComponent {
	constructor() {
		super();
	}

	state = {
		message: "Hello, world!!"
	};

	handleClick = () => {
		const {
			num,
			history,
		} = this.props;
		history.push({
			pathname: `/test/${num}`,
		});
	}

	render() {
		const {
			num,
			dispatch
		} = this.props;
		return (
			<>
				<img src={trophy} alt="" />
				<Button type="primary" size="large" onClick={this.handleClick}>gotoTest</Button>
				<div className="counter">
					<p>{num}</p>
					<Button size="large" onClick={() => dispatch({ type: 'counter/add' })}>+</Button>
					<Button size="large" onClick={() => dispatch({ type: 'counter/minus' })}>-</Button>
				</div>
				<HooksTest />
			</>
		);
	}
}

export default Home;
