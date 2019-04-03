import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <a href='/Login'>跳转到Login</a>
          {/* <Link tp='/Login'>跳转到Login</Link> */}
      </div>
    )
  }
}
