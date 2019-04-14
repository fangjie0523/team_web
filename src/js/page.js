import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Login from './login/Login'
import Register from './login/register'
import App from './App'
import Home from './HomePage'

class page extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/index' component={App} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
        </Switch>
      </Router>
    )
  }
}

export default page
