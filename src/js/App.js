import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../style/App.scss'
import './utils/emptyUtils'
import SetRouter from './router/SetRouter'
import Menu from './components/Menu'
import ChooseTeam from './ChooseTeam'
import TeamMsg from './TeamMsg'
import history from './history'

class App extends Component {
    render() {
        return (
            // <div className="App">
            //     <SetRouter />
            // </div>
            <div className='App'>
                <SetRouter />
            </div>
        );
    }
}

export default App;
