import React, { Component } from 'react'
import { Router , Route, Switch } from 'react-router-dom'
import HomePage from '../HomePage'
import Login from '../login/Login'

class SetRouter extends Component {
  render() {
    return (
      <Router>
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/login' component={Login} />
          </Switch>
      </Router>
    )
  }
}

export default SetRouter;
