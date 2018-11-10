import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Header extends Component {
  static propTypes = {
    sidebarToggle: PropTypes.func,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    sidebarToggle: () => {
    },
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isOpen: false,
    };

    this.headerDropdownToggle = this.headerDropdownToggle.bind(this);
  }

  headerDropdownToggle(headerDropdownOpened) {
    this.setState({
      headerDropdownOpened,
    });
  }

  render() {

    const {
      isAuthenticated,
    } = this.props;

    return (
      <>
        Hey
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    accessTokenExpiresOn: state.auth.accessTokenExpiresOn,
  };
}

Header.contextTypes = {
  router: PropTypes.any.isRequired,
};

export default  withRouter(connect(mapStateToProps)(Header));
