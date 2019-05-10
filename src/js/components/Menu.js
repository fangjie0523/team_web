import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import { myFetch } from '../utils/netUtils'
import * as Api from '../api/Api'
import * as UserAction from '../actions/UserActions'
import * as TeamAction from '../actions/TeamActions'

let currentColor = 'rgba(255, 255, 255, 0.19)'
let path = ['teamMsg','teamMember','competition','notice','apply','honor','chooseTeam','personalMsg']

class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            dropdown: false,
            currentPath: 'teamMsg',
            teamList: []
        }
    }

    componentDidMount() {
        let { user, team } = this.props.params
        let { dropdown } = this.state
        console.log(this.props)
        myFetch(Api.GET_TEAM_LIST,{
            method: 'POST',
            body: {
                user_id: user.user_id
            }
        },user.token)
            .then(res => JSON.parse(res))
            .then(json => {
                if(json.status === 1) {
                    this.setState({teamList: json.data})
                } 
            })
        if(!window.empty.check(team)) {
            this.setState({currentPath: 'chooseTeam'})
        }
        if(dropdown) {
            $(document).click(()=>{
                this.setState({dropdown: false})
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location.pathname === '/index/chooseTeam') {
            this.setState({currentPath: path[6]})
        }
        if(nextProps.location.pathname === '/index/TeamMsg') {
            this.setState({currentPath: path[0]})
        }
    }

    chooseTeam(v){
        this.props.actions.doCurrentTeam(v)
        this.props.history.push('/index/TeamMsg')
    }

    render() {
        let {
            dropdown,
            currentPath,
            teamList
        } = this.state
        let { user, team } =this.props.params
        return (
            <div className='menu-container'>
                <div className='menu-header' onClick={()=> this.setState({dropdown: !dropdown})}>
                    <div className='menu-touxiang cp'>
                        <svg className='icon-svg'>
                            <use xlinkHref='#iconprofile'></use>
                        </svg>
                    </div>
                    <div className='menu-username db omit'>
                        {window.empty.check(team)
                            ?
                            team.team_name
                            :
                            user.name
                        }
                    </div>
                    <svg className='icon-svg menu-button db cp'>
                        <use xlinkHref={dropdown ? '#iconshangshou' : '#iconxiala'}></use>
                    </svg>
                    {dropdown === true ? 
                        <div className='menu-dropdown'>
                            <div className='menu-dropdown-content'>
                                <ul className='list-box'>
                                    {window.empty.check(teamList)
                                        ?
                                        teamList.map((v,i)=>{
                                            return(
                                                <li onClick={()=> this.chooseTeam(v)} key={i}>
                                                    {v.team_name}
                                                </li>
                                            )
                                        })
                                        :
                                        null
                                    }
                                </ul>
                                <ul className='team-btn'>
                                    <li onClick={()=> this.props.history.push('/index/chooseTeam')}>所有球队</li>
                                    <li onClick={()=> this.props.history.push('/createTeam')}>创建球队</li>
                                </ul>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                {window.empty.check(team)
                    ?
                    <ul className='menu-main'>
                        <li className='list-item cp'
                            onClick={() => this.setState({ currentPath: path[0] })}
                            style={{ marginTop: 0, backgroundColor: currentPath === path[0] ? currentColor : null }}>
                            <Link className='list-link' style={{ marginTop: '0px' }} to='/index/TeamMsg'>球队信息管理</Link>
                        </li>
                        <li className='list-item cp'
                            onClick={() => this.setState({ currentPath: path[1] })}
                            style={{ backgroundColor: currentPath === path[1] ? currentColor : null }}
                        >
                            <Link className='list-link' to='/index/teamMember'>球队队员管理</Link>
                        </li>
                        <li className='list-item cp'
                            onClick={() => this.setState({ currentPath: path[2] })}
                            style={{ backgroundColor: currentPath === path[2] ? currentColor : null }}
                        >
                            <Link className='list-link' to='/index/competition'>赛程管理</Link>
                        </li>
                        <li className='list-item cp'
                            onClick={() => this.setState({ currentPath: path[3] })}
                            style={{ backgroundColor: currentPath === path[3] ? currentColor : null }}
                        >
                            <Link className='list-link' to='/index/notice'>公告管理</Link>
                        </li>
                        <li className='list-item cp'
                            onClick={() => this.setState({ currentPath: path[5] })}
                            style={{ backgroundColor: currentPath === path[5] ? currentColor : null }}
                        >
                            <Link className='list-link' to='/index/honor'>球队荣誉</Link>
                        </li>
                        <li className='list-item cp'
                            onClick={() => this.setState({ currentPath: path[4] })}
                            style={{ backgroundColor: currentPath === path[4] ? currentColor : null }}
                        >
                            <Link className='list-link' to='/index/apply'>申请批复</Link>
                        </li>
                    </ul>
                    :
                    <ul className='menu-main'>
                        <li className='list-item cp'
                            onClick={() => this.setState({ currentPath: path[6] })}
                            style={{ marginTop: 0, backgroundColor: currentPath === path[6] ? currentColor : null }}>
                            <Link className='list-link' style={{ marginTop: '0px' }} to='/index/chooseTeam'>所有球队</Link>
                        </li>
                        <li className='list-item cp'
                            onClick={() => this.setState({ currentPath: path[7] })}
                            style={{ backgroundColor: currentPath === path[7] ? currentColor : null }}>
                            <Link className='list-link' style={{ marginTop: '0px' }} to='/index/personalMsg'>个人信息管理</Link>
                        </li>
                    </ul>
                }
                
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
)(Menu)
