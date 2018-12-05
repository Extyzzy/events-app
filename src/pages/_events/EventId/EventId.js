import React from 'react';
import './EventId.scss';

const EventId = (props) => {
  const {
    _id,
    title,
    description,
    img
  } = props;

  return (
    <div className="event-page">
      <p className="event-page__title">{title}</p>
      <p className="event-page__description">{description}</p>
    </div>
  );
};

export default EventId;
