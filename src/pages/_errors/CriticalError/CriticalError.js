import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CriticalError.scss';

class CriticalError extends Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const __DEV__ = true;

    if (__DEV__) {
      const { error } = this.props;

      return (
        <div>
          <h1>{error.name}</h1>
          <p>{error.message}</p>
          <pre>{error.stack}</pre>
        </div>
      );
    }

    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
}

export default (CriticalError);
