import React, { Component } from 'react';
import Main from './Main';
import { IndexLink } from 'react-router';
import Navlink from './NavLink'

class App extends Component {
  render() {
    return(
      <div>
        <h2>Reactjs - Hapijs</h2>
        <p>Reactjs frontend to display data from Hapijs backend API</p>
        
        <IndexLink to="/">Home</IndexLink>
        <Navlink to="users" title="Users" />

        {this.props.children || <Main />}
      </div>
    )
  }
};

export default App;