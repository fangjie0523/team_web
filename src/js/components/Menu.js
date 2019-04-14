import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            dropdown: false,
        }
    }
    render() {
        let {
            dropdown,
        } = this.state
        return (
            <div className='menu-container'>
                <div className='menu-header' onClick={()=> this.setState({dropdown: !dropdown})}>
                    <div className='menu-touxiang cp'>
                        <svg className='icon-svg'>
                            <use xlinkHref='#iconprofile'></use>
                        </svg>
                    </div>
                    <div className='menu-username db omit'>物联网篮球队</div>
                    <svg className='icon-svg menu-button db cp'>
                        <use xlinkHref={dropdown ? '#iconshangshou' : '#iconxiala'}></use>
                    </svg>
                    {dropdown === true ? 
                        <div className='menu-dropdown'>
                            <div className='menu-dropdown-content'>
                                <ul className='list-box'>
                                    <li>物联网1</li>
                                    <li>物联网2</li>
                                </ul>
                                <ul className='team-btn'>
                                    <li>加入球队</li>
                                    <li>创建球队</li>
                                </ul>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                <ul className='menu-main'>
                    <li className='list-item cp' style={{ marginTop: 0 }}>
                        <Link className='list-link' style={{marginTop: '0px'}} to='/index/TeamMsg'>球队信息管理</Link>
                    </li>
                    <li className='list-item cp'>
                        <Link className='list-link' to=''>球队队员管理</Link>
                    </li>
                    <li className='list-item cp'>
                        <Link className='list-link' to=''>赛程管理</Link>
                    </li>
                    <li className='list-item cp'>
                        <Link className='list-link' to=''>公告管理</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Menu
