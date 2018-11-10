import classes from 'classnames';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import './Loader.scss';

const Loader = ({className, sm, contrast}) => (
  <div
    className={classes('root', {
      ['contrast']: contrast,
    }, className)}
  />
);

export default withStyles(s)(Loader);
