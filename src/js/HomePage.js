import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {
  render() {
    return (
      <div>
          <Link tp='/Login'>跳转到Login</Link>
      </div>
    )
  }
}
