import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import DatePicker from "react-datepicker"
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserAction from './actions/UserActions'
import * as TeamAction from './actions/TeamActions'
import * as Api from './api/Api'
import { myFetch } from './utils/netUtils'

class Competition extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            startDate: new Date(),
            competitionList: {},
            match_team: '',
            match_address: ''
        }
        this.handleShow = () => {
            this.setState({ show: true })
        };
      
        this.handleHide = () => {
            this.setState({ show: false, match_team: '', startDate: new Date(), match_address: '' })
        };
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.getCompetitionList()
    }

    handleChange(date){
        this.setState({
            startDate: date
        })
    }

    getCompetitionList() {
        let { user, team } = this.props.params
        myFetch(Api.GET_MATCH_LIST,{
            method: 'GET',
            body: {
                team_id: team.id
            }
        },user.token)
        .then(res => JSON.parse(res))
        .then(json => {
            if(json.status === 1) {
                this.setState({competitionList: json.data})
            }else {
                console.log(json.msg)
            }
        })
    }

    addMatch() {
        let { user, team } = this.props.params
        let { match_team, match_address, startDate } = this.state
        if(!window.empty.check(match_team)) {
            alert('请输入对抗球队')
            return
        }
        if(!window.empty.check(match_address)) {
            alert('请输入对比赛地点')
            return
        }
        myFetch(Api.ADD_MATCH,{
            method: 'POST',
            body: {
                team_id: team.id,
                match_team,
                match_address,
                match_time: startDate
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    window.alert_wait(json.msg,'ok')
                    this.handleHide()
                    this.getCompetitionList()
                }else {
                    window.alert_wait(json.msg,'nok')
                }
            })
    }

    deleteMatch(match_id) {
        let { user, team} = this.props.params
        window.confirm('确定要删除吗', choose =>{
            if(!choose) {
                return
            }
            myFetch(Api.DELETE_MATCH,{
                method: 'POST',
                body: {
                    match_id
                }
            },user.token)
                .then(res => JSON.parse(res))
                .then(json => {
                    if(json.status === 1) {
                        window.alert_wait(json.msg,'ok')
                        this.getCompetitionList()
                    }else {
                        window.alert_wait(json.msg,'nok')
                    }
                })
        })
    }

    render() {
        let { competitionList } = this.state

        return (
            <div className='team-member-container'>
                <div className='team-member-header'>
                    <div className='title'>赛程管理</div>
                    <div className='increase-competition cp' onClick={this.handleShow}>
                        <svg className='icon-svg'>
                            <use xlinkHref='#iconxinjian1'></use>
                        </svg>
                        新建比赛
                    </div>
                </div>
                <div className='team-member-main'>
                    <ul className='row case-list-box member-title'>
                        <li className='col-md-1 omit'>编号</li>
                        <li className='col-md-3 omit'>对抗球队</li>
                        <li className='col-md-3 omit'>比赛时间</li>
                        <li className='col-md-3 omit'>比赛地点</li>
                        <li className='col-md-2 omit'>操作</li>
                    </ul>
                    {window.empty.check(competitionList)
                        ?
                        competitionList.map((v,i) => {
                            return (
                                <ul className='row case-list-box member-content' key={v.id}>
                                    <li className='col-md-1 omit'>{i+1}</li>
                                    <li className='col-md-3 omit'>{v.match_team}</li>
                                    <li className='col-md-3 omit'>{moment(v.match_time).format('YYYY-MM-DD hh:mm:ss')}</li>
                                    <li className='col-md-3 omit'>{v.match_address}</li>
                                    <li className='col-md-2 omit'>
                                        <div className='operation cp' onClick={()=> this.deleteMatch(v.id)}>
                                            <svg className='icon-svg'>
                                                <use xlinkHref='#iconquxiao1'></use>
                                            </svg>
                                            删除赛程
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
                            新建比赛
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='competition-modal-body'>
                        <div className='competition-input-container'>
                            <p className='db'>对抗球队：&nbsp;&nbsp;</p>
                            <input className='competition-input db' 
                                autoFocus 
                                placeholder='请输入将要对抗的球队' 
                                onBlur={(e)=> this.setState({match_team: e.target.value})}
                            />
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>比赛时间：&nbsp;&nbsp;</p>
                            <DatePicker
                                className='competition-input-time'
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="YYYY-MM-dd HH:mm"
                                timeCaption="time"
                            />
                        </div>
                        <div className='competition-input-container'>
                            <p className='db'>比赛地点：&nbsp;&nbsp;</p>
                            <input className='competition-input db' 
                                placeholder='请输入比赛地址' 
                                onBlur={(e) => this.setState({match_address: e.target.value})}
                            />
                        </div>
                        <div className='button-group'>
                            <div className='blue-btn cp' onClick={()=> this.addMatch()}>保存</div>
                            <div className='white-btn cp' onClick={()=> this.handleHide()}>取消</div>
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
)(Competition)
