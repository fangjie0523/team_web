import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/UserActions'
import backgroundf from '../../images/background2@2x.png'


class register extends Component {
    constructor(props){
        super(props)
        this.state={
            showPwd: false,
        }
    }
    render() {
        let { showPwd } = this.state
        return (
            <div className='login-page' style={{backgroundImage: `url(${backgroundf})`}}>
                <div className='login-container'>
                    <h2 className='login-wel'>
                        Welcome to
                    </h2>
                    <h3 className='login-title'>
                        The Team Management System
                    </h3>
                    <div className='register-input login-input'>
                        <div className="db">账号 : &nbsp;</div>
                        <input className="login-textarea" autoFocus={true} type="text" placeholder="手机号"/>
                    </div>
                    <div className='register-input login-input'>
                        <div className='db'>密保问题 : &nbsp;</div>
                        <input className='login-textarea' type='text' placeholder='请输入密保问题' />
                    </div>
                    <div className='register-input login-input'>
                        <div className='db'>密保答案 : &nbsp;</div>
                        <input className='login-textarea' type='text' placeholder='请输入密保答案' />
                    </div>
                    <div className="register-input login-input">
                        <div className="db">密码 : &nbsp;&nbsp;</div>
                        <input className="login-textarea" type={showPwd ? 'text' : 'password'} placeholder="不少于6个字符"/>
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

export default connect(null, { fetchUser })(register)
