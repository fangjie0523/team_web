import React, { Component } from 'react'
import { BrowserRouter as Router , Route } from 'react-router-dom'
import HomePage from '../HomePage'
import Login from '../login/Login'

class SetRouter extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={HomePage} />
                <Route path='/login' component={Login} />
            </Router>
        )
    }
}

export default SetRouter;
