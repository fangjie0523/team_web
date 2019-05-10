import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import history from './history'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-datepicker/dist/react-datepicker.css'
import Login from './login/Login'
import Register from './login/register'
import App from './App'
import Home from './HomePage'
import CreateTeam from './team/CreateTeam'
import Recover from './login/Recover'
import AddPersonalMsg from './login/AddPersonalMsg'

class page extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/index' component={App} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/recover' component={Recover} />
            <Route path='/createTeam' component={CreateTeam} />
            <Route path='/addPersonalMsg' component={AddPersonalMsg} />
        </Switch>
      </Router>
    )
  }
}

export default hot(page)
