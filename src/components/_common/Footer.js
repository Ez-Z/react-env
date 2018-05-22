import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
class Footer extends Component {
	constructor() {
		super();
	}
	
	render() {
    	
    	return (
			<div className="com-footer">
				<h1>我是footer</h1>
			</div>
		);
	}
	
};
export default Footer;
