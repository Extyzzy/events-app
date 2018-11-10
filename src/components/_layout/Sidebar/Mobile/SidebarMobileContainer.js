import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouter } from 'react-router-dom';
import s from './SidebarMobile.scss';
import SideBarMobileHobies from './SideBarMobileHobbies';
import SideBarMobileProfile from './SideBarMobileProfile';

class SidebarMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false,
      showCloseButton: true,
      showFavorites: false,
    };
  }

  getListItem() {
    const { whichSidebar } = this.props;

    switch (whichSidebar) {
      case 'My Profile':
        return SideBarMobileProfile;

      default:
        return SideBarMobileHobies;
    }
  }

  sideBar() {
    const {showCloseButton, showSideBar} = this.state;

    this.setState({
      showCloseButton: !showCloseButton,
      showSideBar: !showSideBar,
    });
  }

  showFavorites() {
    const {showFavorites} = this.state;
    this.setState({
      showFavorites: !showFavorites,
    });
  }

  render () {
    const {
      userHobbies,
      hobbies,
      isAuthenticated,
      viewSwitchMode,
    } = this.props;

    const {
      showSideBar,
      showCloseButton,
      showFavorites,
    } = this.state;

    const SideBarMobileHobies = this.getListItem();
    showSideBar ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';
    return (
      <SideBarMobileHobies
        showCloseButton={showCloseButton}
        userHobbies={userHobbies}
        hobbies={hobbies}
        isAuthenticated={isAuthenticated}
        showSideBar={showSideBar}
        viewSwitchMode={viewSwitchMode}
        sideBar={this.sideBar.bind(this)}
        showFavorites={this.showFavorites.bind(this)}
        favorites={showFavorites}
      />
    );
  };
}

function mapStateToProps(store) {
  return {
    userHobbies: (store.user && store.user.hobbies) || [],
    hobbies: store.hobbies.list,
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(SidebarMobile)));
