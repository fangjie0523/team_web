import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import $ from 'jquery'
import { bindActionCreators } from 'redux'
import * as UserAction from '../actions/UserActions'
import * as Api from '../api/Api'
import { myFetch } from '../utils/netUtils'
import backgroundf from '../../images/background2@2x.png'


class register extends Component {
    constructor(props){
        super(props)
        this.state={
            showPwd: false,
        }
    }

    doRegister(){
        let { history, actions } = this.props
        let email = $('.email').val()
        let question = $('.question').val()
        let answer = $('.answer').val()
        let password = $('.password').val()
        if(!window.empty.check(email)){
            alert('账号不能为空！')
        }else if(!window.empty.check(question)){
            alert('密保问题不能为空！')
        }else if(!window.empty.check(answer)){
            alert('密保问题不能为空！')
        }else if(!window.empty.check(password)){
            alert('密码不能为空！')
        }
        myFetch(Api.ADMIN_REGISTER,{
            method: 'POST',
            body:{
                account: email,
                pw: this.$md5(password),
                question,
                question_pw: answer
            }
        })
            .then(res => JSON.parse(res))
            .then(json => {
                window.alert_wait(json.msg,'ok')
                actions.doLoginOk(json.user_id)
                setTimeout(history.push('/addPersonalMsg'),2000)
            })
    }

    render() {
        let { showPwd } = this.state
        return (
            <div className='login-page' style={{backgroundImage: `url(${backgroundf})`}}>
                <div className='login-container' style={{paddingTop: '35px'}}>
                    <h2 className='login-wel'>
                        用&nbsp;&nbsp;户&nbsp;&nbsp;注&nbsp;&nbsp;册
                    </h2>
                    <div className='register-input login-input'>
                        <div className="db">账号 : &nbsp;</div>
                        <input className="login-textarea email" autoFocus={true} type="text" placeholder="手机号"/>
                    </div>
                    <div className='register-input login-input'>
                        <div className='db'>密保问题 : &nbsp;</div>
                        <input className='login-textarea question' type='text' placeholder='请输入密保问题' />
                    </div>
                    <div className='register-input login-input'>
                        <div className='db'>密保答案 : &nbsp;</div>
                        <input className='login-textarea answer' type='text' placeholder='请输入密保答案' />
                    </div>
                    <div className="register-input login-input">
                        <div className="db">密码 : &nbsp;&nbsp;</div>
                        <input className="login-textarea password" type={showPwd ? 'text' : 'password'} placeholder="不少于6个字符"/>
                        <svg className="icon-svg pwd-eye cp fr"
                                aria-hidden="true"
                                onClick={() => this.setState({showPwd: !showPwd})}
                        >
                            <use xlinkHref={`#icon${showPwd ? 'zheng' : 'bi'}yan`}></use>
                        </svg>
                    </div>
                    <input className="login-jump register-jump cp" type="button" value="注&nbsp;&nbsp;&nbsp;册" onClick={() => this.doRegister()} />
                    <div className='login-buttons register-buttons db'>
                        <Link className='login-button' to='/Login'>已有账号，直接登陆</Link>
                    </div>
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


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(register)
