import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/UserActions'


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
  render() {
        return (
            <div className='login-page'>
                <div className='login-container'>
                    <h2 className='login-wel'>
                        Welcome to
                    </h2>
                    <h3 className='login-title'>
                        The Team Management System
                    </h3>
                    <div className='login-input'>
                    <div className="db">账号 : &nbsp;</div>
                    </div>
                </div>
            </div>
        )
  }
}

export default connect(null, { fetchUser })(Login)
