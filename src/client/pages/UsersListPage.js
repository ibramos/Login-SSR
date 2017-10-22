import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(({ id, name }) => {
      return <li key={id}>{name}</li>;
    });
  }

  render() {
    const listOfUsers = this.renderUsers();
    return (
      <div>
        List of Users:
        <ul>{listOfUsers}</ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

// loadData is specifically tied to UsersList component and will be used to fetch information from the API before actual render
// server side data loading
function loadData(store) {
  return store.dispatch(fetchUsers());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
};