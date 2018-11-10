import classes from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Layout.scss';
import Header from '../Header';
import Footer from '../Footer';
import { connect } from 'react-redux';

class Layout extends Component {
  static propTypes = {
    hasSidebar: PropTypes.bool,
    profile: PropTypes.bool,
    contentHasBackground: PropTypes.bool,
  };

  static defaultProps = {
    hasSidebar: false,
    hasAds: false,
    profile: false,
    contentHasBackground: false,
  };

  render() {
    const {
      hasSidebar,
      children,
      content,
      contentHasBackground,
    } = this.props;

    document.body.style.overflowY = "scroll";

    return (
      <div className={s.root}>
        <div className={s.wrap}>

          <Header />

          <main className={classes(s.container, 'container', {
            [s.withSidebar]: hasSidebar,
          })}>

            <div className={classes('content', {
              [s.contentBackground]: contentHasBackground,
            })}>
              {children || content}
            </div>
          </main>
          <Footer className="text-center" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    UIVersion: store.app.UIVersion,
  };
}

Layout.contextTypes = {
  router: PropTypes.any.isRequired,
};

export default (connect(mapStateToProps)(Layout));
