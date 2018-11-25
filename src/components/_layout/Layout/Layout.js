import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Layout.scss';
import Header from '../Header';
import Footer from '../Footer';
import { connect } from 'react-redux';
import classes from 'classnames';

class Layout extends Component {
  static propTypes = {
    profile: PropTypes.bool,
    contentHasBackground: PropTypes.bool,
  };

  static defaultProps = {
    hasAds: false,
    profile: false,
    contentHasBackground: false,
  };

  render() {
    const {
      children,
      content,
      contentHasBackground,
    } = this.props;

    return (
      <div className={'layout'}>
          <Header />
            <main>
              {children || content}
            </main>
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
