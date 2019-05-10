import React, { Component } from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Api from '../api/Api'
import * as UserAction from '../actions/UserActions'
import backgroundx from '../../images/background1@2x.png'
import { myFetch } from '../utils/netUtils'

class CreateTeam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 0,//创建球队或加入球队的状态码，初始为创建 type：0
            showTeamList: false,
            teamList: [],
            currentTeam: {},
        }
    }

    componentDidMount() {
    }

    createTeam() {
        let { user } = this.props.params
        let teamName = $('.team-title').val().trim()
        let teamDescription = $('.team-description').val().trim()
        let create_people_id = user.user_id
        if(!window.empty.check(teamName)){
            alert('请输入公司名称')
            return
        }else if(!window.empty.check(teamDescription)){
            alert('请输入公司描述')
            return
        }
        myFetch(Api.ADD_TEAM,{
            method: 'POST',
            body:{
                team_name: teamName,
                description: teamDescription,
                create_people_id
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    window.alert_wait(json.msg,'ok')
                    this.props.history.push('/index/chooseTeam')
                }else {
                    window.alert_wait(json.msg,'nok')
                }
            })
    }

    goBack(){
        this.props.history.go(-1)
    }
    getTeamList (e) {
        let { user } = this.props.params
        if(window.empty.check(e.target.value)){
            myFetch(Api.GET_TEAM_LIST_BY_FUZZY,
                {
                    body: {
                        team_name: e.target.value
                    }, 
                    method: 'POST'
                },user.token)
                .then((res) => JSON.parse(res))
                .then((json) => {
                    if(json.status === 1) {
                        this.setState({teamList: json.data})
                    }else {
                        this.setState({teamList: [json.msg]})
                    }
                })
        }else {
            this.setState({teamList: []})
        }
    }

    chooseTeam(v){
        $('.choose-team-input').val(v.team_name)
        this.setState({currentTeam: v, showTeamList: false})
    }

    joinTeam() {
        let { user } = this.props.params
        let { currentTeam } = this.state
        // let team_name = $('choose-team-input').val()
        let apply_number = $('.team-number').val()
        let apply_reason = $('.apply-reason').val()
        // if(!window.empty.check(team_name)){
        //     alert('请输入球队名称')
        //     console.log(team_name)
        //     return
        // }
        if(!window.empty.check(apply_number)){
            alert('请输入想要的球衣编号')
            return
        }
        if(!window.empty.check(apply_reason)){
            alert('请输入申请理由')
            return
        }
        myFetch(Api.ADD_APPLY,{
            method: 'POST',
            body: {
                user_id: user.user_id,
                team_id: currentTeam.id,
                apply_people: user.name,
                apply_reason: apply_reason,
                apply_number
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    window.alert_wait(json.msg,'ok')
                }else {
                    window.alert_wait(json.msg,'nok')
                }
            })
    }

    render() {
        let { type, showTeamList, teamList } =this.state
        let { user } = this.props.params
        return (
            <div className='login-page' style={{ overflow: 'hidden', backgroundImage: `url(${backgroundx})` }}>
                <div className='login-header' style={{width:'900px'}}>
                    <div className='cp' onClick={() => this.goBack()}>
                        <svg className='icon-svg'>
                            <use xlinkHref='#iconyoushou'></use>
                        </svg>
                        <div className='db back'>返回</div>
                    </div>
                    <div className='join-menu fr'>
                        <span className={type === 0 ? 'span-b' : 'span-a'}
                            onClick={() => this.setState({type: 0})}
                            >创建球队&nbsp;</span>
                        <span className='span-a'>/</span>
                        <span className={type === 1 ? 'span-b' : 'span-a'}
                            onClick={() => this.setState({type: 1})}
                            >&nbsp;加入球队</span>
                    </div>
                </div>
                {type === 0
                    ?
                    <div className='login-container create-company'>
                        <div className='login-title'>创 建 球 队</div>
                        <div className='login-input'>
                            <div className='db team-name'>球队名称 : &nbsp;</div>
                            <input className='login-textarea team-title' autoFocus={true} type='text' placeholder='请输入球队名称' />
                        </div>
                        <div className='login-input'>
                            <div className='db team-name'>球队描述 : &nbsp;</div>
                            <input className='login-textarea team-description' type='text' placeholder='请输入球队描述' />
                        </div>
                        <input className="login-jump cp fl" type="button" value="创 &nbsp;&nbsp;&nbsp;&nbsp; 建" onClick={() => this.createTeam()} />
                    </div>
                    :
                    <div className='login-container join-company'>
                    <div className='login-title'>加 入 球 队</div>
                    <div className='login-input'>
                        <div className='db team-name'>球队名称 : &nbsp;</div>
                        {/* <SearchTeam 
                            className='select-team'
                            ref={(refs) => this.selectMul = refs}
                            token={user.token}
                        /> */}
                        <input className='login-textarea team-description choose-team-input' 
                            onFocus={()=> this.setState({showTeamList: true})} 
                            // onBlur={()=> this.setState({showTeamList: false})}
                            onChange={(e)=> this.getTeamList(e)}
                            type='text' 
                            placeholder='请输入想要的加入的球队' />
                        {showTeamList 
                            ?
                            <ul className='team-list'>
                                {window.empty.check(teamList)
                                    ?
                                    teamList.map((v)=>{
                                        return (<li className='team-list-item' 
                                                    key={v.id}
                                                    onClick={()=> this.chooseTeam(v)}
                                                >
                                            {v.team_name}
                                        </li>)
                                    })
                                    :
                                    <li className='team-list-item'>请输入球队名称</li>
                                }
                            </ul>
                            :
                            null
                        }
                    </div>
                    <div className='login-input'>
                        <div className='db team-name'>球衣号码 : &nbsp;</div>
                        <input className='login-textarea team-description team-number' type='text' placeholder='请输入想要的球衣号码' />
                    </div>
                    <div className='login-input'>
                        <div className='db team-name'>申请理由 : &nbsp;</div>
                        <input className='login-textarea team-description apply-reason' type='text' placeholder='请输入申请理由' />
                    </div>
                    <input className="login-jump cp fl" type="button" value="加 &nbsp;&nbsp;&nbsp;&nbsp; 入" onClick={() => this.joinTeam()} />
                </div>
                }
                
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam)

