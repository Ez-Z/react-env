import React, {Component, Fragment} from 'react';
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
            <Fragment>{/*片段，用于多个子元素的包裹，减少不必要的标签*/}
            <h1>{message}</h1>
            </Fragment>
        );
    }
}

export default App;