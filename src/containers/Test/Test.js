import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';


class Test extends Component {
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
			<Fragment>{/* 片段，用于多个子元素的包裹，减少不必要的标签*/}
				<h1>{message} {id}</h1>
			</Fragment>
		);
	}
}

export default Test;