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

    console.log(history);
    

    return (
      <nav className="nav">
        <div className="nav__container">
          <h1>Events<span>BOOK</span></h1>

          <menu className="nav__menu">
            <li className="nav__menu-item">
              <a onClick={() => history.push('/')} className="nav__menu-link">Home</a>
            </li>
            <li className="nav__menu-item">
              <a onClick={() => history.push('/events')} className="nav__menu-link">Events</a>
            </li>
            <li className="nav__menu-item">
              <a href="#" className="nav__menu-link">Why EventsBook</a>
            </li>
            <li className="nav__menu-item">
              <a href="#" className="nav__menu-link">News</a>
            </li>
            <li className="nav__menu-item">
              <a href="#" className="nav__menu-link">Blog</a>
            </li>
          </menu>

          <div className="nav__auth">
            <a href="#" className="nav__button">Sign Up</a>
            <a href="#" className="nav__link">Log In</a>
          </div>
        </div>
      </nav>
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
