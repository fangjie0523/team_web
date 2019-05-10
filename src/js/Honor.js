import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DatePicker from 'react-datepicker'
import * as UserAction from './actions/UserActions'
import * as TeamAction from './actions/TeamActions'
import * as Api from './api/Api'
import { myFetch } from './utils/netUtils'
import { AssistAutoTextarea } from './components/BasicComponents'

class Honor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            HonorList: [],
            title: '',
            content: '',
            id: '',
            isEdit: false,
            startDate: new Date()
        }
        this.handleShow = () => {
            this.setState({ show: true})
        };
      
        this.handleHide = () => {
            this.setState({ show: false, title: '', content: '',startDate: new Date(), id: '', isEdit: false})
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.getHonorList()
    }

    getHonorList() {
        let { user, team } = this.props.params
        myFetch(Api.GET_HONOR_LIST,{
            method: 'GET',
            body: {
                team_id: team.id
            }
        },user.token)
            .then(res=> JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    this.setState({HonorList: json.data})
                }else {
                    console.log(json.msg)
                }
            })
    }

    confirmEdit() {
        let { team } = this.props.params
        let { title, content, isEdit, id, startDate } = this.state
        if(isEdit) {
            let body = {
                team_id: team.id,
                honor_id: id,
                match_name: title,
                prize_level: content,
                honor_time: startDate
            }
            this.doEditHonor(body)
        }else {
            let body = {
                team_id: team.id,
                match_name: title,
                prize_level: content,
                honor_time: startDate
            }
            this.doCreateNotice(body)
        }
    }

    doEditHonor(body){
        let { user } = this.props.params
        myFetch(Api.UPDATE_HONOR,{
            method: 'POST',
            body
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1){
                    window.alert_wait(json.msg,'ok')
                    this.handleHide()
                    this.getHonorList()
                }else {
                    window.alert_wait(json.msg,'nok')
                }
            })
    }

    doCreateNotice(body){
        let { user } = this.props.params
        let { title, content } = this.state
        if(!window.empty.check(title)) {
            alert('请输入荣誉标题！')
            return
        }
        if(!window.empty.check(content)) {
            alert('请输入荣誉内容')
            return
        }
        myFetch(Api.ADD_HONOR,{
            method: 'POST',
            body
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1){
                    window.alert_wait(json.msg,'ok')
                    this.handleHide()
                    this.getHonorList()
                }else {
                    window.alert_wait(json.msg,'nok')
                }
            })
    }

    doDeleteHonor(e,id){
        e.stopPropagation()
        window.confirm('确定要删除吗？',choose => {
            if(!choose) {
                return
            }
            let { user } = this.props.params
            myFetch(Api.DELETE_HONOR,{
                method: 'POST',
                body: {
                    honor_id: id
                }
            },user.token)
                .then(res => JSON.parse(res))
                .then(json => {
                    if(json.status === 1) {
                        window.alert_wait(json.msg,'ok')
                        this.getHonorList()
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
        let { HonorList, title, content, startDate} = this.state
        return (
            <div className='team-member-container'>
                <div className='team-member-header'>
                    <div className='title'>球队荣誉</div>
                    <div className='increase-competition cp' onClick={this.handleShow}>
                        <svg className='icon-svg'>
                            <use xlinkHref='#iconxinjian1'></use>
                        </svg>
                        添加荣誉
                    </div>
                </div>
                <div className='team-member-main'>
                    <ul className='row case-list-box member-title'>
                        <li className='col-md-1 omit'>编号</li>
                        <li className='col-md-3 omit'>比赛名称</li>
                        <li className='col-md-3 omit'>荣誉名次</li>
                        <li className='col-md-3 omit'>获奖时间</li>
                        <li className='col-md-2 omit'>操作</li>
                    </ul>
                    {window.empty.check(HonorList) 
                        ?
                        
                        HonorList.map((v,i) => {
                            return (
                                <ul className='row case-list-box member-content' key={i}
                                    onClick={() => this.setState({show: true,title: v.match_name, content: v.prize_level, startDate: new Date(v.honor_time), id: v.id, isEdit: true})}>
                                    <li className='col-md-1 omit'>{i+1}</li>
                                    <li className='col-md-3 omit'>{v.match_name}</li>
                                    <li className='col-md-3 omit'>{v.prize_level}</li>
                                    <li className='col-md-3 omit'>{moment(v.honor_time).format('YYYY-MM-DD')}</li>
                                    <li className='col-md-2 omit cp' onClick={(e)=> this.doDeleteHonor(e,v.id)}>
                                        <div className='operation'>
                                            <svg className='icon-svg'>
                                                <use xlinkHref='#iconquxiao1'></use>
                                            </svg>
                                            删除荣誉
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
                            {!window.empty.check(title) ? '新建荣誉' : '编辑荣誉' }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='competition-modal-body'>
                        <div className='competition-input-container'>
                            <p className='db'>比赛名称：&nbsp;&nbsp;</p>
                            <AssistAutoTextarea 
                                className='competition-input db'
                                placeholder='请输入比赛名称'
                                value={title || ''}
                                onBlur={value => this.setState({title: value.trim()})}
                            />
                            {/* <input className='competition-input db' autoFocus placeholder='请输入荣誉标题' /> */}
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>获得名次：&nbsp;&nbsp;</p>
                            <AssistAutoTextarea 
                                className='competition-input db'
                                placeholder='请输入获得名次'
                                value={content || ''}
                                onBlur={value => this.setState({content: value.trim()})}
                            />
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>获奖时间：&nbsp;&nbsp;</p>
                            <DatePicker
                                className='competition-input-time'
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                dateFormat='YYYY-MM-dd'
                            />
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
)(Honor)
