import React, { Component } from 'react'
import { Router , Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserAction from '../actions/UserActions'
import HomePage from '../HomePage'
import Login from '../login/Login'
import Register from '../login/register'
import Menu from '../components/Menu'
import ChooseTeam from '../ChooseTeam'
import TeamMsg from '../TeamMsg'
import history from '../history'
import CreateTeam from '../team/CreateTeam'

class Test extends Component {
    render() {
        return (
            <div className='main-container'>
                
            </div>
        )
    }
}

class SetRouter extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    {/* <Menu />
                    <Route path='/index/chooseTeam' component={ChooseTeam} />
                    <Route path='/index/teamMsg' component={TeamMsg} /> */}
                    <Route exact path='/' component={HomePage} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/createTeam' component={CreateTeam} />
                </Router>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        params: {
            user: state.user.user
        }
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({...UserAction}, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetRouter);
