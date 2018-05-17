import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import Routes from './router/routes';
import Header from '@common/Header';
import Footer from '@common/Footer';



class App extends Component {
    constructor(){
        super();
        this.state = {
            message: "Hello, world!!"
        }
    }
    
    render(){
        let {
            message
        } = this.state;


        return (
            <Fragment>{/*片段，用于多个子元素的包裹，减少不必要的标签*/}
                {location.href.indexOf('login') < 0 && <Header name='111'></Header>}
                <Routes />
                {location.href.indexOf('login') < 0 && <Footer></Footer>}
            </Fragment>
        );
    }
}



export default App;
