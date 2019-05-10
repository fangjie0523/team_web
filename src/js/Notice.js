import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserAction from './actions/UserActions'
import * as TeamAction from './actions/TeamActions'
import * as Api from './api/Api'
import { myFetch } from './utils/netUtils'
import { AssistAutoTextarea } from './components/BasicComponents'

class Notice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            noticeList: [],
            title: '',
            content: '',
            date: '',
            id: '',
            isEdit: false
        }
        this.handleShow = () => {
            this.setState({ show: true})
        };
      
        this.handleHide = () => {
            this.setState({ show: false, noticeModal: {}, title: '', content: '',date: '', id: '', isEdit: false})
        };
    }

    componentDidMount(){
        this.getNoticeList()
    }

    getNoticeList() {
        let { user, team } = this.props.params
        myFetch(Api.GET_NOTICE_LIST,{
            method: 'GET',
            body: {
                team_id: team.id
            }
        },user.token)
            .then(res=> JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    this.setState({noticeList: json.data})
                }else {
                    console.log(json.msg)
                }
            })
    }

    confirmEdit() {
        let { user, team } = this.props.params
        let { title, content, isEdit, id } = this.state
        if(window.empty.check(isEdit)) {
            let body = {
                user_id: user.user_id,
                team_id: team.id,
                notice_id: id,
                title,
                content
            }
            this.doEditNotice(body)
        }else {
            let body = {
                user_id: user.user_id,
                team_id: team.id,
                title,
                content
            }
            this.doCreateNotice(body)
        }
    }

    doEditNotice(body){
        let { user } = this.props.params
        myFetch(Api.UPDATE_NOTICE,{
            method: 'POST',
            body
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1){
                    window.alert_wait(json.msg,'ok')
                    this.handleHide()
                    this.getNoticeList()
                }else {
                    window.alert_wait(json.msg,'nok')
                }
            })
    }

    doCreateNotice(body){
        let { user } = this.props.params
        let { title, content } = this.state
        if(!window.empty.check(title)) {
            alert('请输入公告标题！')
            return
        }
        if(!window.empty.check(content)) {
            alert('请输入公告内容')
            return
        }
        myFetch(Api.ADD_NOTICE,{
            method: 'POST',
            body
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1){
                    window.alert_wait(json.msg,'ok')
                    this.handleHide()
                    this.getNoticeList()
                }else {
                    window.alert_wait(json.msg,'nok')
                }
            })
    }

    doDeleteNotice(e,id){
        e.stopPropagation()
        window.confirm('确定要删除吗？',choose => {
            if(!choose) {
                return
            }
            let { user } = this.props.params
            myFetch(Api.DELETE_NOTICE,{
                method: 'POST',
                body: {
                    user_id: user.user_id,
                    notice_id: id
                }
            },user.token)
                .then(res => JSON.parse(res))
                .then(json => {
                    if(json.status === 1) {
                        window.alert_wait(json.msg,'ok')
                        this.getNoticeList()
                    }else {
                        window.alert_wait(json.msg,'nok')
                    }
                })
        })
    }

    handleChange(date){
        this.setState({
            startDate: date
          })
    }


    render() {
        let { noticeList, title, content, date } = this.state
        return (
            <div className='team-member-container'>
                <div className='team-member-header'>
                    <div className='title'>公告管理</div>
                    <div className='increase-competition cp' onClick={this.handleShow}>
                        <svg className='icon-svg'>
                            <use xlinkHref='#iconxinjian1'></use>
                        </svg>
                        添加公告
                    </div>
                </div>
                <div className='team-member-main'>
                    <ul className='row case-list-box member-title'>
                        <li className='col-md-1 omit'>编号</li>
                        <li className='col-md-3 omit'>公告标题</li>
                        <li className='col-md-3 omit'>公告内容</li>
                        <li className='col-md-3 omit'>公告时间</li>
                        <li className='col-md-2 omit'>操作</li>
                    </ul>
                    {window.empty.check(noticeList) 
                        ?
                        noticeList.map((v,i) => {
                            return (
                                <ul className='row case-list-box member-content' key={i}
                                    onClick={() => this.setState({show: true,title: v.title, content: v.content, date: v.create_date, id: v.id, isEdit: true})}>
                                    <li className='col-md-1 omit'>{i+1}</li>
                                    <li className='col-md-3 omit'>{v.title}</li>
                                    <li className='col-md-3 omit'>{v.content}</li>
                                    <li className='col-md-3 omit'>{moment(v.create_date).format('YYYY-MM-DD HH:mm:ss')}</li>
                                    <li className='col-md-2 omit cp' onClick={(e)=> this.doDeleteNotice(e,v.id)}>
                                        <div className='operation'>
                                            <svg className='icon-svg'>
                                                <use xlinkHref='#iconquxiao1'></use>
                                            </svg>
                                            删除公告
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
                            {!window.empty.check(title) ? '新建公告' : '编辑公告' }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='competition-modal-body'>
                        <div className='competition-input-container'>
                            <p className='db'>公告标题：&nbsp;&nbsp;</p>
                            <AssistAutoTextarea 
                                className='competition-input db'
                                placeholder='请输入公告标题'
                                value={title || ''}
                                onBlur={value => this.setState({title: value.trim()})}
                            />
                            {/* <input className='competition-input db' autoFocus placeholder='请输入公告标题' /> */}
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>公告内容：&nbsp;&nbsp;</p>
                            <AssistAutoTextarea 
                                className='competition-input db'
                                placeholder='请输入公告详情'
                                value={content || ''}
                                onBlur={value => this.setState({content: value.trim()})}
                            />
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>公告时间：&nbsp;&nbsp;</p>
                            <p className='db'>
                                {window.empty.check(date) ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '创建后自动生成'}
                            </p>
                        </div>
                        <div className='button-group'>
                            <div className='blue-btn cp' onClick={() => this.confirmEdit()}>保存</div>
                            <div className='white-btn cp' onClick={() => this.handleHide()}>取消</div>
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
)(Notice)
