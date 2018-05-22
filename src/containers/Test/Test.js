import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';


class Test extends Component {
	constructor() {
		super();
		this.state = {
			message: "Hello, test"
		};
	}
	render() {
		let {
			message
		} = this.state;
		console.log(this.props);
        
		return (
			<Fragment>{/* 片段，用于多个子元素的包裹，减少不必要的标签*/}
				<h1>{message}</h1>
			</Fragment>
		);
	}
}

export default Test;