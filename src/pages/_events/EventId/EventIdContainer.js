import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import EventId from './EventId';

class EventIdContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoaded: false,
      _id: '',
      title: '',
      description: '',
      tags: [],
      imgs: []
    };
  }

  render() {
    const {
      _id,
      title,
      description,
      tags,
      imgs
    } = this.state;

    return (
      <div>
        EventId Page
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(EventIdContainer));

