import React from 'react';
import { Route } from 'react-router';

/* eslint-disable */
import SignUpBundle from './SignUp';
import ConfirmAccountBundle from './ConfirmAccount';
/* eslint-enable */
import LoginComponent from './Login';
import LogoutComponent from './Logout';

export const AuthRoutes = [
  <Route
    key="login"
    path="/login"
    exact
    component={LoginComponent}
  />,
  <Route
    key="logout"
    path="/logout"
    exact
    component={LogoutComponent}
  />,
  <Route
    key="signup"
    path="/signup"
    exact
    component={SignUpBundle}
  />,
  <Route
    key="confirm-account"
    path="/account/confirm/:token"
    exact
    component={ConfirmAccountBundle}
  />,
];
