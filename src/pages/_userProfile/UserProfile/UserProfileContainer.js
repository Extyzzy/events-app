import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserProfile from './UserProfile';

class UserProfileContainer extends Component {
  createEvent = () => this.props.history.push(`/profile/event/create`);

  render() {
    const {
      name
    } = this.props;
    
    return (
      <UserProfile 
        createEvent={() => this.createEvent()}
        userName={name}
      />
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
    name: store.auth.name
  };
}

export default withRouter(connect(mapStateToProps)(UserProfileContainer));

