import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(({ id, name }) => {
      return (
        <li className="list-group-item" key={id}>
          {name}
        </li>
      );
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="User List in Login SSR" />
      </Helmet>
    );
  }

  render() {
    const listOfUsers = this.renderUsers();
    const helmetInfo = this.head();
    return (
      <div>
        {helmetInfo}
        <h1 className="text-center">List of Users:</h1>
        <ul className="list-group text-center">{listOfUsers}</ul>
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
