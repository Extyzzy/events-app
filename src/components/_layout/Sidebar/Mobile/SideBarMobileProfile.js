import React  from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {FaClose} from "react-icons/lib/fa/index";
import {LinkContainer} from 'react-router-bootstrap';
import {I18n} from 'react-redux-i18n';
import classes from 'classnames';
import s from './SidebarMobile.scss';

const SideBar = ({
   showCloseButton,
   viewSwitchMode,
   showSideBar,
   sideBar,
   showFavorites,
   favorites
 }) => {
  return(
    <div className={s.root}>
      <div className={
        classes({
          [s.backgroundShadow]: showSideBar,
        })
      }
      onClick={sideBar}
      />
      <div className={
        classes(s.containnerCategory, {
          [s.showSideBar]: showSideBar,
        })
      }>
        <div className={s.buttonsCategory}>
          <div className={s.links}>
            <a className={s.buttonMyProfile}>
              {I18n.t('general.sidebar.myProfile')}
            </a>
            <LinkContainer
              exact
              to="/profile/timeline"
              activeClassName={s.active}
              className={s.link}
            >
              <span>{I18n.t('general.header.myTimeline')}</span>
            </LinkContainer>
            <LinkContainer
              exact
              to="/profile/messages"
              activeClassName={s.active}
              className={s.link}
            >
              <span>{I18n.t('general.header.messages')}</span>
            </LinkContainer>
            <LinkContainer
              exact
              to="/profile/groups"
              activeClassName={s.active}
              className={s.link}
            >
              <span>{I18n.t('general.header.groups')}</span>
            </LinkContainer>
            <LinkContainer
              exact
              to="/profile/events"
              activeClassName={s.active}
              className={s.link}
            >
              <span>{I18n.t('general.header.events')}</span>
            </LinkContainer>
            <LinkContainer
              exact
              to="/profile/posts"
              activeClassName={s.active}
              className={s.link}
            >
              <span>{I18n.t('general.header.blog')}</span>
            </LinkContainer>
            <LinkContainer
              exact
              to="/profile/products"
              activeClassName={s.active}
              className={s.link}
            >
              <span>{I18n.t('general.header.products')}</span>
            </LinkContainer>
            <div className={classes(s.favoritesTab, {
              [s.openTab]: favorites,
            })}>
            <span
              onClick={showFavorites}
              className={classes(s.favoritesTab, {
                [s.open]: favorites,
              })}
            >
              {I18n.t('general.header.favorites')}
            </span>
            </div>
            {
              favorites &&(
                <div className={s.favorites}>
                  <LinkContainer
                    exact
                    to="/profile/favorites/places"
                    activeClassName={s.active}
                    className={s.link}
                  >
                  <span onClick={showFavorites}>
                    {I18n.t('general.header.places')}
                  </span>
                  </LinkContainer>
                  <LinkContainer
                    exact
                    to="/profile/favorites/professionals"
                    activeClassName={s.active}
                    className={s.link}
                  >
                  <span onClick={showFavorites}>
                    {I18n.t('general.header.professionals')}
                  </span>
                  </LinkContainer>
                  <LinkContainer
                    exact
                    to="/profile/favorites/products"
                    activeClassName={s.active}
                    className={s.link}
                  >
                  <span onClick={showFavorites}>
                    {I18n.t('general.header.products')}
                  </span>
                  </LinkContainer>
                  <LinkContainer
                    exact
                    to="/profile/favorites/posts"
                    activeClassName={s.active}
                    className={s.link}
                  >
                  <span onClick={showFavorites}>
                    {I18n.t('general.header.posts')}
                  </span>
                  </LinkContainer>
                  <LinkContainer
                    exact
                    to="/profile/favorites/events"
                    activeClassName={s.active}
                    className={s.link}
                  >
                  <span onClick={showFavorites}>
                    {I18n.t('general.header.events')}
                  </span>
                  </LinkContainer>
                </div>
              )
            }
            <LinkContainer
              exact
              to="/profile/ads"
              activeClassName={s.active}
              className={s.link}
            >
              <span>{I18n.t('general.header.ads')}</span>
            </LinkContainer>
            <LinkContainer
              exact
              to="/profile/edit"
              activeClassName={s.active}
              className={s.link}
            >
              <span>{I18n.t('general.header.editProfile')}</span>
            </LinkContainer>
            <LinkContainer to="/logout"
                           exact
                           onClick={() => {document.body.style.overflow = ''}}
            >
              <span>Log Out</span>
            </LinkContainer>

          </div>
        </div>

        <div className={s.containerCloseButton}>
          <div className={s.closeButton} onClick={sideBar}>
            <FaClose className={s.icon} size={20}/>
          </div>
        </div>
      </div>

      {
        showCloseButton && (
          <div className={s.swith}>
            <div className={s.containerButton} onClick={sideBar}>
              <div className={s.button}>
                {I18n.t('general.sidebar.myProfile')}
              </div>
            </div>
            {viewSwitchMode}
          </div>
        )
      }
    </div>
  )
};

export { SideBar as SideBarWithoutStyles };
export default withStyles(s)(SideBar);
