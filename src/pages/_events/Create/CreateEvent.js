import React, { Component } from "react";
import { withRouter } from 'react-router';
import Layout from '../../../components/_layout/Layout/Layout';

class Create extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isFetching: false,
    };
  }

  render() {
    return (
      <Layout
        hasSidebar
        whichSidebar='My Profile'
        contentHasBackground
      >
        <div className='root'>
          <div className='title'>
            <h4>Bla</h4>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withRouter((Create));
