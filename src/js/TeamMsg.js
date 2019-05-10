import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import * as UserAction from './actions/UserActions'
import * as TeamAction from './actions/TeamActions'
import * as Api from './api/Api'
import { myFetch } from './utils/netUtils'

class TeamMsg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamName: '',
            teamDescription: '',
            showTeamName: false,
            showDescription: false
        }
    }

    componentDidMount(){
        let { team } = this.props.params
        this.setState({teamName: team.team_name, teamDescription: team.description})
    }

    editTeamMsg(){
        let { team, user } = this.props.params
        let { teamName, teamDescription } = this.state
        myFetch(Api.UPDATE_TEAM,{
            method: 'POST',
            body: {
                id: team.id,
                user_id: user.user_id,
                team_name: teamName,
                description: teamDescription
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1){
                    window.alert_wait(json.msg,'ok')
                }else{
                    window.alert_wait(json.msg,'nok')
                }
            })
    }

    render() {
        let { team, user } = this.props.params
        let { teamName, teamDescription, showTeamName, showDescription } = this.state
        return (
            <div className='team-msg-container'>
                <div className='team-msg-header'>
                    <div className='title'>
                        球队信息管理
                    </div>
                </div>
                <div className='team-msg-main'>
                    <div className='team-msg'>
                        <div className='team-name'>
                            球队名称：&nbsp;
                            {showTeamName 
                                ?
                                <input className='team-name-input' 
                                    type='text' 
                                    autoFocus
                                    defaultValue={teamName}
                                    onBlur={(e)=> window.empty.check(e.target.value) && e.target.value !== teamName ?
                                        this.setState({showTeamName: false, teamName: e.target.value},()=> this.editTeamMsg())
                                        :
                                        this.setState({showTeamName: false},()=> $('.team-name-input').val(teamName))
                                        
                                    } 
                                    /> 
                                :
                                <div style={{display: 'inline-block'}}>
                                    <p className='team-name-content'>{teamName}</p>
                                    <svg className='icon-svg' onClick={() => this.setState({ showTeamName: true })}>
                                        <use xlinkHref='#iconedit'></use>
                                    </svg>
                                </div>
                            }
                        </div>
                        <div className='team-description'>
                            球队简介：&nbsp;
                            {showDescription
                                ?
                                <input 
                                    className='team-description-input'
                                    defaultValue={teamDescription}
                                    autoFocus
                                    onBlur={(e)=> 
                                        window.empty.check(e.target.value) && e.target.value !== teamDescription ?
                                        this.setState({showDescription: false, teamDescription: e.target.value},()=> this.editTeamMsg())
                                        :
                                        this.setState({showDescription: false},()=> $('.team-description-input').val(teamDescription))
                                    }
                                />
                                :
                                <div>
                                    <p className='team-description-content'>{teamDescription}</p>
                                    <svg className='icon-svg' onClick={() => this.setState({ showDescription: true })}>
                                        <use xlinkHref='#iconedit'></use>
                                    </svg>
                                </div>
                            }
                        </div>
                        <div className='team-owner'>管理员：&nbsp;{user.user_id}</div>
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
)(TeamMsg)