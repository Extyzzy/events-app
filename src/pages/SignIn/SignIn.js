import React, {Component}  from "react";
import Layout from "../../components/_layout/Layout";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from '../../components/_layout/Header/Header';

class SignIn extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }
 
  render() {
    const {
      isAuthenticated,
      test,
      children
    } = this.props;

    console.log(isAuthenticated);
    return (
      <>
        <h1>Sign In Page</h1>
      </>
    );
  }
}

export default SignIn;

