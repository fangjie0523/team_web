import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import { bindActionCreators } from 'redux'
import * as Api from '../api/Api'
import { myFetch } from '../utils/netUtils'
import * as UserAction from '../actions/UserActions'
import backgroundf from '../../images/background2@2x.png'

class Recover extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pw_question: '',
        }
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }
    componentDidMount(){
        // window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount(){
        // window.removeEventListener('keydown', this.handleKeyDown)
    }

    doRecover(){
        let email = $('.email').val()
        let question = $('.question').val()
        let newPwd = $('.new-password').val()
        let confirmPwd = $('.confirm-password').val()
        let answer = $('.answer').val()
        if(!window.empty.check(email)){
            alert('账号不能为空')
            return
        }
        if(!window.empty.check(question)){
            alert('密保问题不能为空')
            return
        }
        if(!window.empty.check(answer)){
            alert('密保答案不能为空')
            return
        }
        if(!window.empty.check(newPwd)){
            alert('新密码不能为空')
            return
        }
        if(!window.empty.check(confirmPwd)){
            alert('确认密码不能为空')
        }
        if(newPwd === confirmPwd) {
            let body = {
                account: email,
                question_pw: answer,
                new_pw: newPwd
            }
            this.recover(body)
        }else {
            alert('新密码与确认密码不相同')
            return
        }
    }

    recover(body){
        myFetch(Api.ADMIN_FORGET_PW,{
            method: 'POST',
            body
        })
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1){
                    window.alert_wait('密码重置成功','ok')
                } else {
                    window.alert_wait(json.msg,'nok')
                }
            })
    }

    getQuestion(){
        let account = $('.email').val()
        if(!window.empty.check(account)){
            alert('账号不能为空')
            return
        }
        myFetch(Api.ADMIN_GET_QUESTION,{
            method: 'GET',
            body: {
                account
            }
        })
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    this.setState({pw_question: json.data.question})
                } else {
                    alert(json.msg)
                    return
                }
            })

    }

    handleKeyDown(e){
        if(e.keyCode == 13){
            this.doRecover()
        }
    }

    render() {
        let { pw_question } = this.state
        return (
            <div className='login-page' style={{ backgroundImage: `url(${backgroundf})` }}>
                <div className='login-container recover-container'>
                    <div className='login-title'>
                        忘 记 密 码
                    </div>
                    <div className='login-input recover-input'>
                        <div className='db'>账号 : &nbsp;</div>
                        <input className='login-textarea email' autoFocus={true} type='text' placeholder='请输入账号' />
                    </div>
                    <div className='login-input recover-input'>
                        <div className='db'>密保问题 : &nbsp;&nbsp;</div>
                        <input className='login-textarea question' type='text' value={pw_question || ''} placeholder='请输入密保问题' />
                        <button className='recover-button fr' onClick={()=> this.getQuestion()}>获取密保问题</button>
                    </div>
                    <div className='login-input recover-input'>
                        <div className='db'>密保答案 : &nbsp;&nbsp;</div>
                        <input className='login-textarea answer' type='text' placeholder='请输入密保答案' />
                    </div>
                    <div className='login-input recover-input'>
                        <div className='db'>新密码 : &nbsp;&nbsp;</div>
                        <input className='login-textarea new-password' type='password' placeholder='不少于6个字符' />
                    </div>
                    <div className='login-input recover-input'>
                        <div className='db'>确认密码 : &nbsp;&nbsp;</div>
                        <input className='login-textarea confirm-password' type='password' placeholder='不少于6个字符' />
                    </div>
                    <input className='login-jump cp fl' type='button' value='重&nbsp;设&nbsp;密&nbsp;码' onClick={() => this.doRecover()} />
                </div>
            </div>
        )
    }
}

// function mapStateToProps (state) {
//     return {
//         params: {
//             user: state.user.user
//         }
//     }
// }

// function mapDispatchToProps (dispatch) {
//     return {
//         actions: bindActionCreators({...UserAction}, dispatch)
//     }
// }

export default connect()(Recover)
