import React, {Component}  from "react";
import Layout from "../../components/_layout/Layout";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Home extends Component {
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
    console.info(this.props.test);
    return (+
      <>
        <h1>Home {children}</h1>
      </>
    );
  }
}

export default Home;

