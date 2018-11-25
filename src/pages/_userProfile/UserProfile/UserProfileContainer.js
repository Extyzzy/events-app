import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserProfile from './UserProfile';

class UserProfileContainer extends Component {
  render() {
    return (
      <UserProfile/>
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(UserProfileContainer));

