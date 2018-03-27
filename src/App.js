import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(){
        super();
        this.state = {
            message: "Hello, world!!+"
        }
    }
    render(){
        let {
            message
        } = this.state;

        return (
            <h1>{message}</h1>
        );
    }
}

export default App;