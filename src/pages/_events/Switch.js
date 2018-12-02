import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { CreateEventRoute } from "../../core/Router";
import { connect } from 'react-redux';
/* eslint-disable */
import EventsBundle from './Events';
import EventIdBundle from './EventId';
import EventCreateBundle from './Create/CreateEvent';
import EventEditBundle from './Edit';
import PageNotFoundBundle from '../../pages/_errors/PageNotFound';
/* eslint-enable */

class EventsSwitch extends React.PureComponent {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <Switch>
        <Route key='events' path="/events" exact component={EventsBundle} />
        <Route path="/events/:id" component={EventIdBundle} />

        <CreateEventRoute
          isAuthenticated={isAuthenticated}
          path="/events/create"
          component={EventCreateBundle} />
        <CreateEventRoute
          isAuthenticated={isAuthenticated}
          path="/events/edit/:eventId"
          component={EventEditBundle} />
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

export default withRouter(connect(mapStateToProps)(EventsSwitch));
