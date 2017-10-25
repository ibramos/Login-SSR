import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';
import { Helmet } from 'react-helmet';
import requireAuth from '../components/hocs/requireAuth';

class AdminsList extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map(({ id, name }) => {
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
        <title>{`${this.props.admins.length} Admins Loaded`}</title>
        <meta property="og:title" content="Admin List in Login SSR" />
      </Helmet>
    );
  }

  render() {
    const listOfAdmins = this.renderAdmins();
    const helmetInfo = this.head();
    return (
      <div>
        {helmetInfo}
        <h1 className="text-center">List of Admins:</h1>
        <ul className="list-group text-center">{listOfAdmins}</ul>
      </div>
    );
  }
}

function mapStateToProps({ admins }) {
  return { admins };
}

export default {
  loadData: ({ dispatch }) => dispatch(fetchAdmins()),
  component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminsList))
};
