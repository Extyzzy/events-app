import React from 'react';
import { Route } from 'react-router';

/* eslint-disable */
import SignUpBundle from './SignUp';
/* eslint-enable */
import LoginComponent from './Login';
import LogoutComponent from './Logout';

export const AuthRoutes = [
  <Route
    key="login"
    path="/log-in"
    exact
    component={LoginComponent}
  />,
  <Route
    key="logout"
    path="/log-out"
    exact
    component={LogoutComponent}
  />,
  <Route
    key="signup"
    path="/sign-up"
    exact
    component={SignUpBundle}
  />,
];
