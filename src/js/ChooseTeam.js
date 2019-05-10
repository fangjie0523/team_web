import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserAction from './actions/UserActions'
import * as TeamAction from './actions/TeamActions'
import * as Api from './api/Api'
import { myFetch } from './utils/netUtils'

class ChooseTeam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamList: [],
        }
    }

    componentDidMount() {
        let { user } = this.props.params
        console.log(user)
        myFetch(Api.GET_TEAM_LIST,{
            method: 'POST',
            body: {
                user_id: user.user_id
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    this.setState({teamList: json.data})
                } 
            })
        this.props.actions.doCurrentTeam('')
    }

    chooseTeam(v) {
        console.log('go')
        this.props.actions.doCurrentTeam(v)
        this.props.history.push('/index/TeamMsg')
    }

    render() {
        let { teamList } = this.state
        return (
            <div className='pro-container'>
                <div style={{width: '100%', padding: '0 0px 18px'}}>
                    <div className='pro-header'>
                        <div className='title'>所有球队</div>
                    </div>
                    <div className='list_pro_div'>
                        {window.empty.check(teamList)
                            ?
                            teamList.map((v) => {
                                return (<div className='boxFather' key={v.id}>
                                    <div className='pro-box hover cp' onClick={() => this.chooseTeam(v)}>
                                        <div className="proBox">
                                            <div className="pro-default avatarStyle">{v.team_name[0]}</div>
                                        </div>
                                        <div className="pro-name-box">
                                            <div className="proName omit">{v.team_name}</div>
                                            <div className="profzr"></div>
                                        </div>
                                    </div>
                                </div>)
                            })
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {
        params: {
            user: state.user.user,
            team: state.team.team
        }
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({...UserAction,...TeamAction}, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChooseTeam)
