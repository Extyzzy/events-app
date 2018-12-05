import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './UserProfile.scss';

import Events from '../../_events/Events/Events';

const UserProfile = (props) => {
  const {
    createEvent,
    userName,
    events,
    clickHandler
  } = props;

  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <div className="user-profile__header-container">
          <span className="user-profile__avatar">
            <FontAwesomeIcon
              size="2x"
              color="white"
              icon={["fas", "user"]}
            />
          </span>
          <div className="user-profile__user-information">
            <p className="user-profile__name">{userName}</p>
            <p className="user-profile__role">User / Organizer</p>
          </div>
        </div>
        <button 
          onClick={createEvent}
          className="user-profile__create-event-btn"
        >
          Create event
        </button>
      </div>
      {
        events ? (
          <div className="events-container">
            <p className="events-text">Evenimentele create</p>
            <div className="event-wrapper">
              {events.map(event =>
                <Events
                  clickHandler={() => clickHandler(event._id)}
                  key={event._id}
                  title={event.title}
                  description={event.description}
                  tags={event.tags}
                  img={event.images}
                />
              )}
            </div>
          </div>
        ) : null
      }
    </div>
  );
};

export default UserProfile;
