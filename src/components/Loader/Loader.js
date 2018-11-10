import classes from 'classnames';
import React from 'react';
import './Loader.scss';

const Loader = ({className, sm, contrast}) => (
  <div
    className={classes('root', {
      ['contrast']: contrast,
    }, className)}
  />
);

export default Loader;
