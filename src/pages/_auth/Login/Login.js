import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Grid, Alert } from 'react-bootstrap';
// import FacebookLogin from 'react-facebook-login';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.scss';
import {FaGooglePlus} from "react-icons/lib/fa/index";

const Login = ({
   isFetching,
}) => (
  <div className={s.root}>
     Hey
  </div>
);

export { Login as LoginWithoutDecorators };
export default withStyles(s)(Login);
