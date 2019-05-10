import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import { myFetch } from './utils/netUtils'
import * as Api from './api/Api'
import * as UserAction from './actions/UserActions'

class PersonalMsg extends Component {

    constructor(props) {
        super(props)
        this.state= {
            name: '',
            age: '',
            sex: '',
            email: '',
            tel: ''
        }
    }


    componentDidMount() {
        this.getPersonalMsg()
    }

    getPersonalMsg() {
        let { user } = this.props.params
        myFetch(Api.GET_USER_INFO,{
            method: 'GET',
            body: {
                id: user.user_id
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    console.log(json.data)
                    this.setState({
                        name: json.data.name,
                        age: json.data.age,
                        sex: json.data.sex,
                        email: json.data.email,
                        tel: json.data.tel
                    })
                }
            })
    }

    updatePersonalMsg(){
        let { user } = this.props.params
        let { name, age, sex, email, tel } = this.state
        myFetch(Api.UPDATE_USER_INFO,{
            method: 'POST',
            body: {
                id: user.user_id,
                name,
                age,
                sex,
                email,
                tel
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    window.alert_wait(json.msg, 'ok')
                }else {
                    window.alert_wait(json.msg, 'nok')
                }
            })
    }

    render() {
        let { name, age, sex, email, tel } = this.state
        return (
            <div className='personal-msg'>
                {console.log(this.state)}
                <div className='personal-msg-header'>
                    <div className='title'>个人信息维护</div>
                </div>
                <div className='personal-msg-main'>
                    <div className='personal-msg-name'>
                        <div className='db'>姓名：&nbsp;&nbsp;</div>
                        <input
                            className='msg-name-input name'
                            defaultValue={name}
                            placeholder='请输入姓名'
                            onBlur={(e) => window.empty.check(e.target.value) && e.target.value !== name ?
                                this.setState({name: e.target.value},()=> this.updatePersonalMsg())
                                :
                                $('.name').val(name)
                            }
                        />
                    </div>
                    <div className='personal-msg-name'>
                        <div className='db'>年龄：&nbsp;&nbsp;</div>
                        <input
                            className='msg-name-input age'
                            defaultValue={age}
                            placeholder='请输入年龄'
                            onBlur={(e) => window.empty.check(e.target.value) && e.target.value !== age ?
                                this.setState({age: e.target.value},()=> this.updatePersonalMsg())
                                :
                                $('.age').val(age)
                            }
                        />
                    </div>
                    <div className='personal-msg-name'>
                        <div className='db'>性别：&nbsp;&nbsp;</div>
                        <input
                            className='msg-name-input sex'
                            defaultValue={sex}
                            placeholder='请输入性别'
                            onBlur={(e) => window.empty.check(e.target.value) && e.target.value !== sex ?
                                this.setState({sex: e.target.value},()=> this.updatePersonalMsg())
                                :
                                $('.sex').val(sex)
                            }
                        />
                    </div>
                    <div className='personal-msg-name' style={{ marginLeft: '-5px' }}>
                        <div className='db'>email：&nbsp;&nbsp;</div>
                        <input
                            className='msg-name-input email'
                            defaultValue={email}
                            placeholder='请输入电子邮箱'
                            onBlur={(e) => window.empty.checkEmail(e.target.value) && e.target.value !== email ?
                                this.setState({email: e.target.value},()=> this.updatePersonalMsg())
                                :
                                $('.email').val(email)
                            }
                        />
                    </div>
                    <div className='personal-msg-name'>
                        <div className='db'>电话：&nbsp;&nbsp;</div>
                        <input
                            className='msg-name-input tel'
                            defaultValue={tel}
                            placeholder='请输入电话号码'
                            onBlur={(e) => window.empty.checkPhone(e.target.value) && e.target.value !== tel ?
                                this.setState({tel: e.target.value},()=> this.updatePersonalMsg())
                                :
                                $('.tel').val(tel)
                            }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        params: {
            user: state.user.user
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...UserAction }, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonalMsg)