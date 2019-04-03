import React, { Component } from 'react'
import { BrowserRouter as Router , Route } from 'react-router-dom'
import HomePage from '../HomePage'
import Login from '../login/Login'
import Register from '../login/register'

class SetRouter extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={HomePage} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </Router>
        )
    }
}

export default SetRouter;
