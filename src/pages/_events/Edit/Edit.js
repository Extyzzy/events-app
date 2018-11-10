import React, { Component } from "react";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import s from './Edit.scss';
import Layout from '../../../components/_layout/Layout/Layout';
import PageNotFound from '../../_errors/PageNotFound/PageNotFound';
import Loader from '../../../components/Loader/Loader';

class Edit extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isFetching: false,
    };

  }

  render() {
    const {
      permissions,
    } = this.props;

    const {
      data,
      isLoaded,
    } = this.state;

    if ( ! isLoaded) {
      return (
        <Loader />
      );
    }

    if ( ! data) {
      return (
        <PageNotFound />
      );
    }

    return (
      <Layout>
        <div className='root'>
          <div className='title'>
            <h4>EDIT</h4>
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
  };
}

export default withRouter(connect(mapStateToProps)((Edit)));
