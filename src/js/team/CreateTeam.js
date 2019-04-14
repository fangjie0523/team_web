import React, { Component } from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Api from '../api/Api'
import * as UserAction from '../actions/UserActions'
import backgroundx from '../../images/background1@2x.png'
import { myFetch } from '../utils/netUtils';

class CreateTeam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 0,//创建球队或加入球队的状态码，初始为创建 type：0
        }
    }

    createCompany() {
        let { user } = this.props.params
        let teamName = $('.team-title').val().trim()
        let teamDescription = $('.team-description').val().trim()
        let create_people_id = user.user_id
        // this.props.params 为空，未解决
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
        })
            .then(res => JSON.parse(res))
            .then(json => {
                console.log(json)
            })
    }

    render() {
        let { type } =this.state
        return (
            <div className='login-page' style={{ overflow: 'hidden', backgroundImage: `url(${backgroundx})` }}>
                <div className='login-header' style={{width:'900px'}}>
                    <svg className='icon-svg'>
                        <use xlinkHref='#iconyoushou'></use>
                    </svg>
                    <div className='db back'>返回</div>
                    <div className='join-menu fr'>
                        <span className={type === 0 ? 'span-b' : 'span-a'}
                                >创建球队&nbsp;</span>
                        <span className='span-a'>/</span>
                        <span className={type === 1 ? 'span-b' : 'span-a'}
                                >&nbsp;加入球队</span>
                    </div>
                </div>
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
                    <input className="login-jump cp fl" type="button" value="创 &nbsp;&nbsp;&nbsp;&nbsp; 建" onClick={() => this.createCompany()} />
                </div>
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

