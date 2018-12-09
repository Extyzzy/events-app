import React , {Component} from 'react';
import './Event.scss';
import MapInput from './components/MapInput';


class Event extends Component {
  render() {
    const {
      createEvent,
      onTitleChange,
      onDescriptionChange,
      onTypeChange,
      onAmountChange,
      onImgChange,
      __title,
      __description,
      __tags,
        __formattedAddress,
        __latitude,
        __longitude,
        setCoordinates,
      __type,
      __amount,
      __imgs
    } = this.props;

    return (
      <div className="event-creation">
        <h1 className="event-creation__header">Create an event</h1>
        <form 
          onSubmit={createEvent}
          className="event-creation__form"
        >
          <label className="event-creation__label">Event title:</label>
          <input 
            className="event-creation__input"
            type="text"
            onChange={onTitleChange}
            value={__title}
          />
          <label className="event-creation__label">Event description:</label>
          <input 
            type="text"
            className="event-creation__input"
            onChange={onDescriptionChange}
            value={__description}
          />
          <label className="event-creation__label">Type:</label>
          <input 
            className="event-creation__input"
            type="text"
            onChange={onTypeChange}
            value={__type}
          />
          <label className="event-creation__label">Amount:</label>
          <input 
            className="event-creation__input"
            type="number"
            onChange={onAmountChange}
            value={__amount}
          />
          <label className="event-creation__label">Image:</label>
          <input 
            className="event-creation__input"
            type="file"
            onChange={onImgChange}
          />


            <div className='mapInput'>
                <MapInput
                    sendCoordinates={setCoordinates}
                    location={{lat: __latitude, lng: __longitude, formattedAddress: __formattedAddress}}
                />
            </div>
          <button
              className="event-creation__submit"
              onClick={(e) => {
                  createEvent(e);
              }}
          >Send data</button>
        </form>
      </div>
    );
  }
}

export default Event;
