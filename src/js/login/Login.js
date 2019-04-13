import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import { bindActionCreators } from 'redux'
import * as Api from '../api/Api'
import { myFetch } from '../utils/netUtils'
import * as UserAction from '../actions/UserActions'
import backgroundf from '../../images/background2@2x.png'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPwd: false,
        }
    }

    doLogin(){
        let { actions, history } = this.props
        let email = $('.email').val()
        let password = $('.password').val()
        if(!window.empty.check(email)){
            alert('账号不能为空！')
        }else if(!window.empty.check(password)){
            alert('密码不能为空！')
        }
        myFetch(Api.ADMIN_LOGIN, {
            method: 'POST',
            body: {
                account: email,
                pw: password
            }
        })
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    actions.doLoginOk(Object.assign({}, json.data))
                    console.log(this.props)
                    if(json.data.is_admin === -1) {
                        // window.alert_wait('登陆成功','ok')
                        history.push('/createTeam')
                        // setTimeout(history.push('/createTeam'),2500)
                        
                    }
                }
            })
    }

    render() {
        let { showPwd } = this.state
        return (
            <div className='login-page' style={{ backgroundImage: `url(${backgroundf})` }}>
                <div className='login-container'>
                    <h2 className='login-wel'>
                        Welcome to
                    </h2>
                    <h3 className='login-title'>
                        The Team Management System
                    </h3>
                    <div className='login-input'>
                        <div className="db">账号 : &nbsp;</div>
                        <input className="login-textarea email" autoFocus={true} type="text" placeholder="手机号" />
                    </div>
                    <div className="login-input">
                        <div className="db">密码 : &nbsp;&nbsp;</div>
                        <input className="login-textarea password" type={showPwd ? 'text' : 'password'} placeholder="不少于6个字符"
                            onKeyDown={() => this.handleKeyDown} />
                        <svg className="icon-svg pwd-eye cp fr"
                            aria-hidden="true"
                            onClick={() => this.setState({ showPwd: !showPwd })}
                        >
                            <use xlinkHref={`#icon${showPwd ? 'zheng' : 'bi'}yan`}></use>
                        </svg>
                    </div>
                    <label className='change-user-type'>
                        <input type='radio' name='user' value='user' />
                        用户
                    </label>
                    <label className='change-user-type'>
                        <input type='radio' name='user' value='manager' />
                        管理员
                    </label>
                    <div className='login-buttons db fr'>
                        <a className='login-button' href='/recover'>忘记密码&nbsp;/</a>
                        <a className='login-button' href='/register'>&nbsp;注册</a>
                    </div>
                    <input className="login-jump cp fr" type="button" value="登&nbsp;&nbsp;&nbsp;录" onClick={() => this.doLogin()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
