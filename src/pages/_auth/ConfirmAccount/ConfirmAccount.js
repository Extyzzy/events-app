import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ConfirmAccount.scss';

class ConfirmAccount extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    onLoginClick: PropTypes.func,
  };

  static defaultProps = {
    isLoading: true,
  };

  render() {
    const {
      isLoading,
      error,
      onLoginClick,
    } = this.props;

    return (
      <div className='footer'>

      </div>
    );
  }
}

export { ConfirmAccount as ConfirmAccountWithoutDecorators };
export default (ConfirmAccount);
