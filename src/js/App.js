import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cookies from 'js-cookie'
import * as UserAction from './actions/UserActions'
import '../style/App.scss'
import './utils/emptyUtils'
import './components/AlertBox'
import SetRouter from './router/SetRouter'
import Menu from './components/Menu'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className='App'>
                <Menu {...this.props} />
                <SetRouter {...this.props} />
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
)(App)
