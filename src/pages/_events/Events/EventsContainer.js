import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Events from './Events';

class EventsContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoaded: false,
    };
  }

  render() {
      console.info(this.props);
    return (
      <Events

      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(EventsContainer));
