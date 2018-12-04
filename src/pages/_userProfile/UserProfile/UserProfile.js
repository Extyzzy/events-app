import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './UserProfile.scss';

const UserProfile = (props) => {
  const {
    createEvent,
    userName
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
    </div>
  );
};

export default UserProfile;
