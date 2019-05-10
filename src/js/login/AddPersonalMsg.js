import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import $ from 'jquery'
import * as Api from '../api/Api'
import { myFetch } from '../utils/netUtils'
import { bindActionCreators } from 'redux'
import * as UserAction from '../actions/UserActions'
import backgroundf from '../../images/background2@2x.png'


class AddPersonalMsg extends Component {
    constructor(props){
        super(props)
        this.state={
            show: false,
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    chooseSex(value){
        this.setState({show: false},()=>{
            $('.sex').val(value)
        })
    }

    doAddMsg(){
        let { history } = this.props
        let { user } = this.props.params
        let name = $('.name').val()
        let sex = $('.sex').val()
        let age = $('.age').val()
        let email = $('.email').val()
        let tel = $('.tel').val()
        if(!window.empty.check(name)) {
            alert('用户姓名不能为空')
            return
        }
        if(!window.empty.check(sex)) {
            alert('用户性别不能为空')
            return
        }
        if(!window.empty.check(age)) {
            alert('用户年龄不能为空')
            return
        }
        if(!window.empty.checkEmail(email)) {
            alert('用户邮箱格式有误')
            return
        }
        if(!window.empty.checkPhone(tel)) {
            alert('用户手机号格式有误')
            return
        }
        myFetch(Api.UPDATE_USER_INFO,{
            method: 'POST',
            body: {
                id: user,
                name,
                sex,
                age,
                email,
                tel
            }
        })
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    window.alert_wait(json.msg,'ok')
                    setTimeout(history.push('/login'), 2000)
                }else {
                    window.alert_wait(json.msg,'nok')
                }
            })
    }

    render() {
        let { show } = this.state
        return (
            <div className='login-page' style={{backgroundImage: `url(${backgroundf})`}}>
                <div className='login-container' style={{paddingTop: '35px'}}>
                    <h2 className='login-wel'>
                        请填写个人详细信息
                    </h2>
                    <div className='register-input login-input'>
                        <div className='db'>姓名 : &nbsp;</div>
                        <input className='login-textarea name' type='text' placeholder='请输入姓名' />
                    </div>
                    <div className='register-input login-input'>
                        <div className="db">性别 : &nbsp;</div>
                        <input className='login-textarea sex' 
                            onFocus={()=> this.setState({show:true})} 
                            type='text' 
                            placeholder='请输入性别' />
                        {show
                            ?
                            <ul className='team-list' style={{width:'380px'}}>
                                <li className='team-list-item' onClick={()=> this.chooseSex('男')}>男</li>
                                <li className='team-list-item' onClick={()=> this.chooseSex('女')}>女</li>
                            </ul>
                            :
                            null
                        }
                        
                    </div>
                    <div className='register-input login-input'>
                        <div className='db'>年龄 : &nbsp;</div>
                        <input className='login-textarea age' type='text' placeholder='请输入年龄' />
                    </div>
                    <div className='register-input login-input'>
                        <div className='db'>电子邮箱 : &nbsp;</div>
                        <input className='login-textarea email' type='text' placeholder='请输入电子邮箱' />
                    </div>
                    <div className="register-input login-input">
                        <div className="db">联系方式 : &nbsp;&nbsp;</div>
                        <input className="login-textarea tel" type='text' placeholder="请输入手机号码"/>
                    </div>
                    <input className="login-jump register-jump cp" type="button" value="提&nbsp;&nbsp;&nbsp;交" onClick={() => this.doAddMsg()} />
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
)(AddPersonalMsg)
