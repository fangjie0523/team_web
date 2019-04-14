import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
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


class SetRouter extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/createTeam' component={CreateTeam} />
                </Switch>
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
