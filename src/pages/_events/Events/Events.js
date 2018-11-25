import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import "./Events.scss";
import Layout from "../../../components/_layout/Layout";

class Events extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    events: PropTypes.array.isRequired,
    onItemComponentWillUnmount: PropTypes.func,
    onItemPopupComponentWillUnmount: PropTypes.func,
    showItemOwnerDetails: PropTypes.bool,
    itemActionButtons: PropTypes.func,
    itemPopupActionButtons: PropTypes.func,
    showLoadMore: PropTypes.bool.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    loadingMore: PropTypes.bool.isRequired,
    interval: PropTypes.func,
  };

  render() {
    const {
      isFetching,
      id,
      title,
      description,
      tags,
      img
    } = this.props;

    return (
            <div 
              className="event" 
              id={ id }
            >
              <img 
                className="event__image" 
                src={ img }      
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
                  <img src="https://images.unsplash.com/photo-1514846326710-096e4a8035e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e840de32e65ad8bd38e04e646f3d80a&auto=format&fit=crop&w=634&q=80" className="event__enrolled-user-image event__enrolled-user-image--1" />
                  <img className="event__enrolled-user-image event__enrolled-user-image--2" />
                  <img className="event__enrolled-user-image event__enrolled-user-image--3" />
                  <img className="event__enrolled-user-image event__enrolled-user-image--4" />
                </div>
                <a href="#" className="event__enrolled-user-link">Vezi întreaga listă --></a>
              </div>
            </div>
    );
  }
}

export default Events;
