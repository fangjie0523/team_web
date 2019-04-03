import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/UserActions'
import backgroundf from '../../images/background2@2x.png'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
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
                    <div className='login-input'>
                        <div className="db">账号 : &nbsp;</div>
                        <input className="login-textarea" autoFocus={true} type="text" placeholder="手机号"/>
                    </div>
                    <div className="login-input">
                        <div className="db">密码 : &nbsp;&nbsp;</div>
                        <input className="login-textarea" type={showPwd ? 'text' : 'password'} placeholder="不少于6个字符"
                                onKeyDown={() => this.handleKeyDown}/>
                        <svg className="icon-svg pwd-eye cp fr"
                                aria-hidden="true"
                                onClick={() => this.setState({showPwd: !showPwd})}
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

export default connect(null, { fetchUser })(Login)
