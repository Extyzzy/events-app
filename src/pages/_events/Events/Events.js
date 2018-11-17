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
    } = this.props;

    return (
      <div className='root'>
        <h1>
          Events
        </h1>
      </div>
    );
  }
}

export default Events;
