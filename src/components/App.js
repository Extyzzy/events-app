import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { connect, Provider as ReduxProvider } from 'react-redux';

import {
  fetchInitialState,
} from '../actions/app';

import { PrivateRoute } from "../core/Router";
import Loader from './Loader';
import Bundle from '../core/Bundle';

/* eslint-disable */
import PageNotFound from 'bundle-loader?lazy!../pages/_errors/PageNotFound';
import Home from 'bundle-loader?lazy!../pages/Home';
/* eslint-enable */

import ProfileSwitch from '../pages/_profile/Switch';
import EventsSwitch from '../pages/_events/Switch';
import { AuthRoutes } from '../pages/_auth/Switch';

const PageNotFoundBundle = Bundle.generateBundle(PageNotFound);
const HomeBundle = Bundle.generateBundle(Home);

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
      <Switch>
        <Route path="/" exact component={HomeBundle} />
        <PrivateRoute isAuthenticated={isAuthenticated} path="/profile" component={ProfileSwitch} />
        <Route path="/events" component={EventsSwitch} />,
        {AuthRoutes}
        <Route component={PageNotFoundBundle} />
      </Switch>
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
