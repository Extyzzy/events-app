import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserProfile from './UserProfile';

class UserProfileContainer extends Component {
  createEvent = () => this.props.history.push(`/profile/event/create`);

  render() {
    return (
      <UserProfile createEvent={() => this.createEvent()}/>
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(UserProfileContainer));

