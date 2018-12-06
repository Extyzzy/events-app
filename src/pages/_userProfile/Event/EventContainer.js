import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Event from './Event';
import { appendToFormData } from '../../../helpers/form';

import { fetchApiRequest } from "../../../fetch";


class EventContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      __title: '',
      __description: '',
      __tags: '',
      __imgs: '',
      __formattedAddress: null,
      __latitude: null,
      __longitude: null,
    };

    this.createFormData = this.createFormData.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  createFormData() {
    const {
      __title,
      __description,
      __tags,
      __imgs,
    } = this.state;

    return appendToFormData(
      new FormData(),
      {
        id: 1,
        title: __title,
        description: __description,
        tags: __tags,
        imgs: __imgs,
      },
    );
  }

  createEvent(e) {
    e.preventDefault();

    fetchApiRequest('/event', {
      method: 'POST',
      body: this.createFormData(), 
    })
    .then(response => {
      switch (response.status) {
        case 201:
          return console.log('Event created successfully');
        default:
          return Promise.reject(
            console.log('Creation process failed.')
          );
      }
    })
  } 

  render() {
    const {
      __title,
      __description,
      __tags,
      __imgs,
        __formattedAddress,
        __latitude,
        __longitude,
    } = this.state;

    return (
      <Event 
        createEvent={this.createEvent}

        __title={__title}
        __description={__description}
        __tags={__tags}
        __imgs={__imgs}
        __formattedAddress={__formattedAddress}
        __latitude={__latitude}
        __longitude={__longitude}

        setCoordinates={(
            __latitude,
            __longitude,
            __formattedAddress,
            __addressComponents,
        ) => {
            this.setState({
                __latitude,
                __longitude,
                __formattedAddress,
                __addressComponents,
            });
        }}

        onTitleChange={({target: {value: __title}}) => {
          this.setState({__title});
        }}
        onDescriptionChange={({target: {value: __description}}) => {
          this.setState({__description});
        }}
        onTagsChange={({target: {value: __tags}}) => {
          this.setState({__tags});
        }}
        onImgChange={({target: {value: __imgs}}) => {
          this.setState({__imgs});
        }}
      />
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(EventContainer));

