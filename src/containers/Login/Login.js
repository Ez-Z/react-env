import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {
  Redirect
} from 'react-router-dom';

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
    handleClick() {
        setCookie('isLogin', true);
        this.props.history.push({
             pathname: '/',
        });
    }
    render(){
        let isLogin = getCookie('isLogin');
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { message } = this.state;
        if (isLogin) {
            return (
                <Redirect to = {from}/>
            );
        }
        
        return (
            <Fragment>{/*片段，用于多个子元素的包裹，减少不必要的标签*/}
                <h1>{message}</h1>
                <Button type="primary" size='large' onClick={this.handleClick}>登录</Button>
            </Fragment>
        );
    }
}

export default Login;