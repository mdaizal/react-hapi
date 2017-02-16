import React, { Component } from 'react';

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  UsersList() {
    fetch('http://localhost:3000/api/users', {
      method: 'GET',
      // mode: 'cors',
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // }
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        users: data
      });
    });
  }

  componentDidMount() {
    this.UsersList();
  }

  render() {
    return(
      <div>
        <h3>Users</h3>
        <ul>
          {this.state.users.map((user) =>
            <li key={user._id}>{user.username}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default Users;