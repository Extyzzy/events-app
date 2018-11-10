import classes from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Footer extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const {
      className,
    } = this.props;

    return (
      <footer className={classes('root', className)}>

      </footer>
    );
  }
}

function mapStateToProps(store) {
  return {
    accessToken: store.auth.accessToken,
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default (connect(mapStateToProps)(Footer));
