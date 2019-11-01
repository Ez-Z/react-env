import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';


class Test extends PureComponent {
	constructor() {
		super();
	}

	state = {
		message: "Hello, test"
	};


	render() {
		let {
			message
		} = this.state;
		let {
			id
		} = this.props.match.params;
		console.log(this.props);
		return (
			<>{/* 片段，用于多个子元素的包裹，减少不必要的标签*/}
				<h1>{message} {id}</h1>
			</>
		);
	}
}

export default Test;