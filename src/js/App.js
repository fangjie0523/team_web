import React, { Component } from 'react';
import {  Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserAction from './actions/UserActions'
import '../style/App.scss'
import './utils/emptyUtils'
import './components/AlertBox'
import SetRouter from './router/SetRouter'
import Menu from './components/Menu'
import ChooseTeam from './ChooseTeam'
import TeamMsg from './TeamMsg'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let { user }  = this.props.params
        return (
            <div className='App'>
                { user && user.is_admin > -1 ? 
                    <div>
                        <Menu {...this.props} />
                        <Switch>
                            <Route path='/index/teamMsg' component={TeamMsg} />
                            <Route path='/index/chooseTeam' component={ChooseTeam} />
                        </Switch>
                    </div>
                    :
                    <SetRouter />
                }
            </div>
        );
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
)(App)
