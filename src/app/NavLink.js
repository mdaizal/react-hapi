import React, { Component } from 'react'
import { Link } from 'react-router'

class NavLink extends Component {
  render() {
    return <Link {...this.props} className="list-group-item" activeClassName="active">{this.props.title}</Link>
  }
}

export default NavLink