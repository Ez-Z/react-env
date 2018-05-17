import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {
  Redirect
} from 'react-router-dom';

import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';

import { Button } from 'antd';

import { setCookie, getCookie } from '@utils/utils';


import * as loginInfoAction from '@actions/loginInfo/actions';


class Login extends Component {
    constructor(){
        super();
        this.state = {
            message: "Hello, login",
        }
        this.handleClick = ::this.handleClick;
    }
    componentWillMount() {
        let isLogin = getCookie('isLogin');
        if (isLogin) {
            let userName = 'zsd';
            this.props.actions.getLoginInfo({
                isLogin,
                userName
            });
        }
    }
    handleClick() {
        setCookie('isLogin', true);
    }
    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { message } = this.state;
        if (this.props.loginInfo.isLogin) {
            return (
                <Redirect to = {from}/>
            )
        }
        
        return (
            <Fragment>{/*片段，用于多个子元素的包裹，减少不必要的标签*/}
                <h1>{message}</h1>
                <Button type="primary" size='large' onClick={this.handleClick}>登录</Button>
            </Fragment>
        );
    }
}
function mapStateToProps(state) {
    return {
        loginInfo: state.loginInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginInfoAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);