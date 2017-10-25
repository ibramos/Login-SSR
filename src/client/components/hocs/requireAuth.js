import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
  class RequireAuth extends Component {
    render() {
      switch (this.props.auth) {
        // StaticRouter will add a new url property to the context object when Redirect is read on the server
        case false:
          return <Redirect to="/" />;
        case null:
          return <div>Loading... </div>;
        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
