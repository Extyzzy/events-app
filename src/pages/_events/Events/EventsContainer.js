import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Events from './Events';
import { fetchApiRequest } from '../../../fetch';

class EventsContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoaded: false,
      events: []
    };
  }
  componentDidMount = () => {
    fetchApiRequest('/events', {
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

  render() {
    const {
      events
    } = this.state;


    const {
      history
    } = this.props;

    return events ?
    (
      <div className="events">
      <div className="events__container">
        <div className="events__header">
          <h2 className="events__headline">Events</h2>
          <div className="events__month-switcher">
            <p className="events__month-name">November</p>
            <div className="events__month-buttons">
              <button className="events__month-button events__month-button--previous"></button>
              <button className="events__month-button events__month-button--next"></button>
            </div>
          </div>
        </div>
        <div className="events__list">
        {
          events.map(event =>
            <Events
              clickHandler={() => history.push({pathname: `/events/${event._id}`, state: {id: event._id}})}
              key={event._id}
              title={event.title}
              description={event.description}
              tags={event.tags}
              img={event.images}
            />
          )
        }
        </div>
        </div>
      </div>
    )
    : null;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(EventsContainer));
