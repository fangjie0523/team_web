import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { myFetch } from './utils/netUtils'
import * as Api from './api/Api'
import * as UserAction from './actions/UserActions'
import * as TeamAction from './actions/TeamActions'

let status = [
    {name: '待审批',color: 'rgb(241, 129, 0)'},
    {name: '已通过',color: 'rgb(13, 197, 0)'},
    {name: '未通过',color: '#eb5a46'}
]

class Apply extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            show: false,
            applyList: {},
            applyMsg: {}
        }
        this.handleShow = () => {
            this.setState({ show: true })
        };
      
        this.handleHide = () => {
            this.setState({ show: false, applyMsg: {} })
        };
    }

    componentDidMount() {
        this.getApplyList()
    }

    getApplyList(){
        let { user,team } = this.props.params
        myFetch(Api.GET_APPLY_LIST,{
            method: 'GET',
            body: {
                team_id: team.id
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    this.setState({applyList: json.data})
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
                        applyMsg: json.data
                    })
                }
            })
    }

    confirmApply(v,action){
        let { user } = this.props.params
        window.confirm(action===1 ? '确定要同意申请吗？': '确定要拒绝申请吗？' ,choose =>{
            if(!choose) {
                return
            }
            myFetch(Api.UPDATE_APPLY,{
                method: 'POST',
                body: {
                    id: v.id,
                    action
                }
            },user.token)
                .then(res => JSON.parse(res))
                .then(json => {
                    if(json.status === 1) {
                        window.alert_wait(json.msg,'ok')
                        this.getApplyList()
                    }else {
                        window.alert_wait(json.msg,'nok')
                    }
                })
        },true)
    }

    render() {
        let { applyList, applyMsg } = this.state
        return (
            <div className='team-member-container'>
                <div className='team-member-header'>
                    <div className='title'>申请审批</div>
                    {/* <div className='increase-competition cp' onClick={this.handleShow}>
                        <svg className='icon-svg'>
                            <use xlinkHref='#iconxinjian1'></use>
                        </svg>
                        新建申请
                    </div> */}
                </div>
                <div className='team-member-main'>
                    <ul className='row case-list-box member-title'>
                        <li className='col-md-1 omit'>编号</li>
                        <li className='col-md-2 omit'>申请人</li>
                        <li className='col-md-2 omit'>申请理由</li>
                        <li className='col-md-2 omit'>申请时间</li>
                        <li className='col-md-2 omit'>球衣编号</li>
                        <li className='col-md-1 omit'>状态</li>
                        <li className='col-md-2 omit'>操作</li>
                    </ul>
                    {window.empty.check(applyList)
                        ?
                        applyList.map((v,i) => {
                            return (
                                <ul className='row case-list-box member-content' key={v.id} onClick={()=> this.setState({show: true},()=> this.getPersonalMsg(v))}>
                                    <li className='col-md-1 omit'>{i+1}</li>
                                    <li className='col-md-2 omit'>{v.apply_people}</li>
                                    <li className='col-md-2 omit'>{v.apply_reason}</li>
                                    <li className='col-md-2 omit'>{moment(v.create_time).format('YYYY-MM-DD')}</li>
                                    <li className='col-md-2 omit'>{v.apply_number}</li>
                                    <li className='col-md-1 omit' style={{color: status[v.status-1].color}}>
                                        {status[v.status-1].name}
                                    </li>
                                    {v.status === 1 
                                        ?
                                        <li className='col-md-2 omit'>
                                            <div className='operation cp' style={{ width: '50%' }}
                                                onClick={()=> this.confirmApply(v,1)}
                                            >
                                                <svg className='icon-svg' style={{ color: 'rgb(13, 197, 0)' }}>
                                                    <use xlinkHref='#iconqueding'></use>
                                                </svg>
                                                同意
                                            </div>
                                            <div className='operation cp' style={{ width: '50%' }}
                                                onClick={()=> this.confirmApply(v,2)}
                                            >
                                                <svg className='icon-svg'>
                                                    <use xlinkHref='#iconquxiao1'></use>
                                                </svg>
                                                拒绝
                                            </div>
                                        </li>
                                        :
                                        null
                                    }
                                    
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
                            申请人详情
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='competition-modal-body'>
                        <div className='competition-input-container'>
                            <p className='db'>姓名：&nbsp;&nbsp;</p>
                            <p className='db'>{applyMsg.name}</p>
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>性别：&nbsp;&nbsp;</p>
                            <p className='db'>{applyMsg.sex}</p>
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>年龄：&nbsp;&nbsp;</p>
                            <p className='db'>{applyMsg.age}</p>
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>手机号：&nbsp;&nbsp;</p>
                            <p className='db'>{applyMsg.tel}</p>
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>电子邮箱：&nbsp;&nbsp;</p>
                            <p className='db'>{applyMsg.email}</p>
                        </div>
                        {/* <div className='button-group'>
                            <div className='blue-btn cp'>提交申请</div>
                            <div className='white-btn cp'>取消</div>
                        </div> */}
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
)(Apply)
