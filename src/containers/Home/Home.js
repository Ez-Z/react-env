import React, { PureComponent } from 'react';
import {
	connect
} from 'react-redux';

import { Button } from 'antd';
// import trophy from '@images/trophy.png';

import HooksTest from './components/HooksTest';

@connect(({ counter }) => ({
	num: counter.num
}))
class Home extends PureComponent {
	state = {
		message: "Hello, world!!"
	};

	componentDidMount() {
		this.getTree();

	}

	getTree = () => {
		const zNodes = [
			{ id: 1, pid: 0, name: 'test 0-1', open: false },
			{ id: 2, pid: 0, name: 'test 0-2', open: false },
			{ id: 11, pid: 1, name: 'test 0-1-11', open: true },
			{ id: 112, pid: 1, name: 'test 0-1-112', open: false },
			{ id: 13, pid: 1, name: 'test 0-1-11-12', open: false },
			{ id: 22, pid: 2, name: 'test 0-1-11-12', open: false },
			{ id: 111, pid: 11, name: 'test 0-1-11-111', open: false },
			{ id: 12, pid: 11, name: 'test 0-1-11-12', open: false },
			{ id: 132, pid: 13, name: 'test 0-1-11-12', open: false },
			{ id: 131, pid: 11, name: 'test 0-1-11-12', open: false },
			{ id: 1312, pid: 131, name: 'test 0-1-11-12', open: false },
			{ id: 113, pid: 12, name: 'test 0-1-11-12-113', open: false },
		];
		const pids = Array.from(new Set(zNodes.map(item => item.pid)));
		const treeData = this.treeData(pids, zNodes, {
			name: '全部',
			id: 0,
			children: [],
		});
		console.log(treeData);
	}

	treeData = (pids, data, init) => {
		const tree = init;
		data.map((item, idx) => {
			const temp = JSON.parse(JSON.stringify(item));
			const tempData = JSON.parse(JSON.stringify(data));
			if (temp.pid === init.id) {
				init.children.push(temp);
				tempData.splice(idx, 1);
				if (pids.indexOf(temp.id) >= 0) {
					temp.children = [];
					this.treeData(pids, tempData, temp);
				}
			}
		});
		return tree;
	}

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
				{/* <img src={trophy} alt="" /> */}
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
