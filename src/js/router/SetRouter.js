import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserAction from '../actions/UserActions'
import ChooseTeam from '../ChooseTeam'
import TeamMsg from '../TeamMsg'
import TeamMember from '../TeamMember'
import Competition from '../Competition'
import Notice from '../Notice'
import Apply from '../Apply'
import Honor from '../Honor'
import PersonalMsg from '../PersonalMsg'


class SetRouter extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <Switch>
                <Route path='/index/teamMsg' component={TeamMsg} />
                <Route path='/index/chooseTeam' component={ChooseTeam} />
                <Route path='/index/teamMember' component={TeamMember} />
                <Route path='/index/competition' component={Competition} />
                <Route path='/index/notice' component={Notice} />
                <Route path='/index/apply' component={Apply} />
                <Route path='/index/honor' component={Honor} />
                <Route path='/index/personalMsg' component={PersonalMsg} />
            </Switch>
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
