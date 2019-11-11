import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Header.less';
import './b.less';

class Header extends PureComponent {
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
					<span><Link to="/test/2">test</Link> </span>
					<span>
						<span className="_name b">我是{name} </span>
					</span>
				</div>
				
			</div>
		);
	}
	
};

export default Header;
