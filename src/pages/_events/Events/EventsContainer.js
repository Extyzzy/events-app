import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Events from './Events';

class EventsContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoaded: false,
      events: [
        {
          _id: 'joiihjpjp694dvfmp5vd',
          title: 'SOME EXTRA ULTRA OMEGA FANCY EVENIMENT',
          description: 'Some kind of random text inserted here just for sake of being, i am not even trying, lol... . This stuff starts to be boring i should begin to do something useful instead of doing some bullshit. And some other kind of text should be in here',
          tags: [
            'music',
            'dance'
          ],
          img: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a8111c411923b7c9dbfc11d87f5d9c48&auto=format&fit=crop&w=1350&q=80'
        },
        {
          _id: '4dvfmp5vdhmgh',
          title: 'SOME EXTRA ULTRA OMEGA FANCY EVENIMENT',
          description: 'Some kind of random text inserted here just for sake of being, i am not even trying, lol... . This stuff starts to be boring i should begin to do something useful instead of doing some bullshit. And some other kind of text should be in here',
          tags: [
            'trap',
            'swag'
          ],
          img: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=605dda29d7945345968d2dfb3eeb672e&auto=format&fit=crop&w=1350&q=80'
        }
      ]
    };
  }

  render() {
    const {
      events
    } = this.state;

    return (
      <div className="events">
      <div className="events__container">
        <div className="events__header">
          <h2 className="events__headline">Evenimente</h2>
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
              key={event._id}
              title={event.title}
              description={event.description}
              tags={event.tags}
              img={event.img}
            />
          )
        }
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(EventsContainer));
