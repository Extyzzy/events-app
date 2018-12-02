import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
/* eslint-disable */
import UserProfileBundle from './UserProfile';
import EventBundle from './Event';
import PageNotFoundBundle from '../../pages/_errors/PageNotFound';
/* eslint-enable */

class UserProfileSwitch extends React.PureComponent {
  render() {

    return (
      <Switch>
        <Route path="/profile" exact component={UserProfileBundle} />
        <Route path="/profile/edit"  component={UserProfileBundle} />
        <Route path="/profile/event/create"  component={EventBundle} />
   
        <Route component={PageNotFoundBundle} />
      </Switch>
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(UserProfileSwitch));
