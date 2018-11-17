import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SignIn from './SignIn';

class SignInContainer extends Component {

  render() {
    return (
      <SignIn 
        isAuthenticated={this.props.isAuthenticated}
        test='1'
      />
    );
  }
}


function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(SignInContainer));