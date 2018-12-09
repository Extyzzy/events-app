import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserProfile from './UserProfile';

import { fetchApiRequest } from '../../../fetch';

class UserProfileContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      events: []
    }
  }

  componentDidMount = () => {
    console.info(this.props.userId);
    fetchApiRequest(`/events/created-by/${this.props.userId}`, {
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
      this.setState({
        events: json
      })
    });
  };

  createEvent = () => this.props.history.push(`/profile/event/create`);

  clickHandler = (id) => this.props.history.push({pathname: `/events/${id}`, state: {id}});

  render() {
    const {
      name
    } = this.props;

    const {
      events
    } = this.state;
    
    return (
      <UserProfile 
        createEvent={() => this.createEvent()}
        userName={name}
        events={events}
        clickHandler={this.clickHandler}
      />
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
    name: store.user.name,
    userId: store.user.id
  };
}

export default withRouter(connect(mapStateToProps)(UserProfileContainer));
