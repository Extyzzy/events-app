import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Home from './Home';

class HomeContainer extends Component {
  render() {
    return (
      <Home/>
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(HomeContainer));

