import React, { Component } from 'react'
import { connect } from 'react-redux'

class TeamMsg extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className='team-msg'>
                123
            </div>
        )
    }
}

export default connect(

)(TeamMsg)