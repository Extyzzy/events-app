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
      __type: '',
      __imgs: '',
      __amount: 0
    };
  }

  fileOnChange = (e) => (
    this.setState({
      __imgs: e.target.files[0]
    })
  )

  createFormData = () => {
    const {
      __title,
      __description,
      __type,
      __imgs,
      __amount,
    } = this.state;

    return appendToFormData(
      new FormData(),
      {
        userId: this.props.userId,
        type: __type,
        title: __title,
        description: __description,
        amount: __amount,
        images: __imgs,
      },
    );
  }

  createEvent = (e) => {
    alert('here');
    e.preventDefault();
    alert('here2');
    fetchApiRequest('/event', {
      method: 'POST',
      body: this.createFormData(), 
    })
    .then(response => {
      alert('here3');
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
      __amount,
      __type,
      __imgs
    } = this.state;

    return (
      <Event 
        createEvent={this.createEvent}

        __title={__title}
        __description={__description}
        __type={__type}
        __imgs={__imgs}
        __amount={__amount}

        onTitleChange={({target: {value: __title}}) => {
          this.setState({__title});
        }}
        onDescriptionChange={({target: {value: __description}}) => {
          this.setState({__description});
        }}
        onTypeChange={({target: {value: __type}}) => {
          this.setState({__type});
        }}
        onAmountChange={({target: {value: __amount}}) => {
          this.setState({__amount});
        }}
        onImgChange={(e) => this.fileOnChange(e)}
      />
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
    userId: store.auth.id,
  };
}

export default withRouter(connect(mapStateToProps)(EventContainer));

