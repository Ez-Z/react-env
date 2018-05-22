import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import pureRender from 'pure-render-decorator';
@pureRender
class Header extends Component {
	constructor() {
		super();
	}
	
	render() {
    	const {
			name,
		} = this.props;
    	return (
			<div className="com-header">
				<h1>
					<Link to="/">
						logo返回首页
					</Link>
				</h1>
				<div>

					<span><Link to="/">Home</Link> </span>
					<span><Link to="/test">test</Link> </span>
					<span>
						<span className="_name">我是{name} </span>
					</span>
				</div>
				
			</div>
		);
	}
	
};

export default Header;
