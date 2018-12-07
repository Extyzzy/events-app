import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import EventId from './EventId';

import { fetchApiRequest } from '../../../fetch';

class EventIdContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoaded: false,
      _id: '',
      title: '',
      description: '',
      tags: [],
      img: ''
    };
  }

  componentDidMount = () => {
    const {
      _id,
      title,
      description,
      tags,
      img
    } = this.state;

    fetchApiRequest(`/events/${this.props.location.state.id}`, {
      method: 'GET'
    })
    .then(response => {
      switch (response.status) {
        case 200:
          console.log('succes');
          return response.json();

        default:
          return console.log('ERRRRRRRR');
      }
    })
    .then(json => {
      console.log(json);
      console.log(json);
      this.setState({
        title: json.title,
        description: json.description
      })
    });
  }

  render() {
    const {
      _id,
      title,
      description,
      tags,
      img
    } = this.state;

    return (
      <div>
        <EventId 
          _id={_id}
          title={title}
          description={description}
          img={img}
        />
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

