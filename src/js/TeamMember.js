import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Modal } from 'react-bootstrap'
import * as UserAction from './actions/UserActions'
import * as TeamAction from './actions/TeamActions'
import * as Api from './api/Api'
import { myFetch } from './utils/netUtils'

class TeamMember extends Component {
    constructor(props) {
        super(props)
        this.state={
            member_list: {},
            show: false,
            personalMsg: {}
        }
        this.handleShow = () => {
            this.setState({ show: true})
        }
      
        this.handleHide = () => {
            this.setState({ show: false})
        }
    }

    componentDidMount() {
        this.getTeamMember()
    }

    getTeamMember(){
        let { user, team } = this.props.params
        myFetch(Api.GET_MEMBER_LIST,{
            method: 'GET',
            body: {
                team_id: team.id
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    this.setState({member_list: json.data})
                }else {
                    console.log(json.msg)
                }
            })
    }

    getPersonalMsg(v) {
        let { user } = this.props.params
        console.log(v)
        myFetch(Api.GET_USER_INFO,{
            method: 'GET',
            body: {
                id: v.user_id
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    console.log(json.data)
                    this.setState({
                        personalMsg: json.data
                    })
                }
            })
    }

    confirmDelete(e){
        e.stopPropagation()
        window.confirm('是否需要删除该成员？',(choose)=>{
            if(choose === true) {
                console.log('删除')
            }
        })
       
    }

    render() {
        let { member_list, personalMsg } = this.state
        return (
            <div className='team-member-container'>
                <div className='team-member-header'>
                    <div className='title'>球队成员</div>
                </div>
                <div className='team-member-main'>
                    <ul className='row case-list-box member-title'>
                        <li className='col-md-2 omit'>编号</li>
                        <li className='col-md-3 omit'>球员姓名</li>
                        <li className='col-md-3 omit'>球衣号码</li>
                        <li className='col-md-2 omit'>加入时间</li>
                        <li className='col-md-2 omit'>操作</li>
                    </ul>
                    {window.empty.check(member_list)
                        ?
                        member_list.map((v,i) =>{
                            return (
                                <ul className='row case-list-box member-content' key={v.id} onClick={() => this.setState({show: true},()=> this.getPersonalMsg(v))}>
                                    <li className='col-md-2 omit'>{i+1}</li>
                                    <li className='col-md-3 omit'>{v.member_name}</li>
                                    <li className='col-md-3 omit'>{v.number}</li>
                                    <li className='col-md-2 omit'>{moment(v.create_time).format('YYYY-MM-DD')}</li>
                                    <li className='col-md-2 omit cp' onClick={(e)=> this.confirmDelete(e)}>
                                        <div className='operation'>
                                            <svg className='icon-svg'>
                                                <use xlinkHref='#iconquxiao1'></use>
                                            </svg>
                                            删除球员
                                        </div>
                                    </li>
                                </ul>
                            )
                        })
                        :
                        null
                    }
                </div>
                <Modal className='competition-modal'
                    size='lg'
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            球员详细信息
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='competition-modal-body'>
                        <div className='competition-input-container'>
                            <p className='db'>姓名：&nbsp;&nbsp;</p>
                            <p className='db'>{personalMsg.name}</p>
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>性别：&nbsp;&nbsp;</p>
                            <p className='db'>{personalMsg.sex}</p>
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>年龄：&nbsp;&nbsp;</p>
                            <p className='db'>{personalMsg.age}</p>
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>手机号：&nbsp;&nbsp;</p>
                            <p className='db'>{personalMsg.tel}</p>
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>电子邮箱：&nbsp;&nbsp;</p>
                            <p className='db'>{personalMsg.email}</p>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        params: {
            user: state.user.user,
            team: state.team.team
        }
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({...UserAction,...TeamAction}, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamMember)

