import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import { connect } from 'react-redux';

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
