import React, { PureComponent } from 'react';
import { Button } from 'antd';

class Test extends PureComponent {
	state = {
		message: "Hello, test"
	};



	render() {
		let {
			message
		} = this.state;
		let {
			match: {
				params: {
					id
				}
			},
			history,
		} = this.props;
		return (
			<>{/* 片段，用于多个子元素的包裹，减少不必要的标签*/}
				<h1>{message} {id}</h1>
				<Button onClick={() => { history.goBack() }}>返回</Button>
			</>
		);
	}
}

export default Test;