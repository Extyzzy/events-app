import React, { Component } from "react";
import "./Events.scss";

class Events extends Component {

  render() {
    const {
      id,
      title,
      description,
      tags,
      img,
      clickHandler
    } = this.props;

    return (
            <div 
              className="event" 
              id={ id }
              onClick={() => clickHandler()}
            >
              <img 
                className="event__image" 
                src={ img }
                alt=''
              />
              <div className="event__tags">
                {
                  tags.map((tag, i)=>
                    <p key={i} className="event__tag">
                      { tag }
                    </p>
                  )
                }
              </div>
              <h2 className="event__title">{ title }</h2>
              <p className="event__description">
                {
                  description.length > 225 ? description.substr(0, 225) + '...' : description 
                }
                </p>
              <div className="event__enrolled-users">
                <div className="event__enrolled-users-images">
                  <img alt='' src="https://images.unsplash.com/photo-1514846326710-096e4a8035e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e840de32e65ad8bd38e04e646f3d80a&auto=format&fit=crop&w=634&q=80" className="event__enrolled-user-image event__enrolled-user-image--1" />
                  <img alt='' className="event__enrolled-user-image event__enrolled-user-image--2" />
                  <img alt=''className="event__enrolled-user-image event__enrolled-user-image--3" />
                  <img alt='' className="event__enrolled-user-image event__enrolled-user-image--4" />
                </div>
                <span className="event__enrolled-user-link">Vezi întreaga listă --></span>
              </div>
            </div>
    );
  }
}

export default Events;
