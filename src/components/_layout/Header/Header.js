import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './Header.scss';

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
      history
    } = this.props;

    return (
      <nav className="nav">
        <div className="nav__container">
          <h1>Events<span>BOOK</span></h1>

          <menu className="nav__menu">
            <li className="nav__menu-item">
              <span onClick={() => history.push('/')} className="nav__menu-link nav__menu-link--active">Home</span>
            </li>
            <li className="nav__menu-item">
              <span onClick={() => history.push('/events')} className="nav__menu-link">Events</span>
            </li>
            <li className="nav__menu-item">
              <span  className="nav__menu-link">Why EventsBook</span>
            </li>
            <li className="nav__menu-item">
              <span  className="nav__menu-link">News</span>
            </li>
            <li className="nav__menu-item">
              <span className="nav__menu-link">Blog</span>
            </li>
          </menu>
          {
            (
              !isAuthenticated && (
                <div className="nav__auth">
                  <span onClick={() => history.push('/log-in')} className="nav__link nav__link--log-in">
                    Log in
                  </span>
                  <span onClick={() => history.push('/sign-up')} className="nav__button">
                    Sign Up
                  </span>
                </div>
              )) || (
                <div className="nav__auth">
                  <span onClick={() => history.push('/log-out')} className="nav__link">Log Out</span>
                </div>
              )
          }
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    isAuthenticated: state.auth.isAuthenticated,
    accessTokenExpiresOn: state.auth.accessTokenExpiresOn,
  };
}

Header.contextTypes = {
  router: PropTypes.any.isRequired,
};

export default  withRouter(connect(mapStateToProps)(Header));
