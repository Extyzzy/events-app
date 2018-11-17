import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { connect, Provider as ReduxProvider } from 'react-redux';

import {
  fetchInitialState,
} from '../actions/app';

import { PrivateRoute } from "../core/Router";
import Loader from './Loader';


/* eslint-disable */
import PageNotFound from '../pages/_errors/PageNotFound';
import Home from '../pages/Home';
import Layout from '../components/_layout/Layout';
/* eslint-enable */


import EventsSwitch from '../pages/_events/Switch';
import { AuthRoutes } from '../pages/_auth/Switch';



const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
};

class App extends Component {
  static propTypes = {
    context: PropTypes.shape(ContextType),
    store: PropTypes.any,
  };

  static defaultProps = {
    context: null,
  };

  static contextTypes = {
    router: PropTypes.any,
    store: PropTypes.any,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    const { context } = this.props;
    const { staticContext } = this.context.router;

    return context || staticContext;
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(
      fetchInitialState()
    );
  }

  render() {
    const {
      isFetching,
      isAuthenticated,
    } = this.props;

    if (isFetching) {
      return (
        <Loader />
      );
    }

    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/events" component={EventsSwitch} />,
          {AuthRoutes}
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    );
  }
}

function mapStateToProps(store) {
  return {
    isFetching: store.app.isFetching,
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(App));
