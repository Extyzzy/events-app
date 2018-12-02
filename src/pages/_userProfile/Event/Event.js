import React , {Component} from 'react';
import './Event.scss';

class Event extends Component {
  render() {
    const {
      createEvent,
      onTitleChange,
      onDescriptionChange,
      onTagsChange,
      onImgChange,
      __title,
      __description,
      __tags,
      __imgs
    } = this.props;

    return (
      <div>
        <h1>UserProfile - Create Event</h1>
        <form onSubmit={createEvent}>
          <label className="label">Event title:</label>
          <input 
            className="input"
            type="text"
            onChange={onTitleChange}
            value={__title}
          />
          <label className="label">Event description:</label>
          <input 
            type="text"
            className="input"
            onChange={onDescriptionChange}
            value={__description}
          />
          <label className="label">Tags:</label>
          <input 
            className="input"
            type="text"
            onChange={onTagsChange}
            value={__tags}
          />
          <label className="label">Image:</label>
          <input 
            className="input"
            type="file"
            onChange={onImgChange}
            value={__imgs}
          />
          <button>Send data</button>
        </form>
      </div>
    );
  }
}

export default Event;
