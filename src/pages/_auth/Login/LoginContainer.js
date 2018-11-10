import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

import Login from './Login';
import { appendToFormData } from '../../../helpers/form';
import { loginUser, clearLoginErrors } from '../../../actions/user';

class LoginContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      __email: '',
      __password: '',
    };

    this.doLogin = this.doLogin.bind(this);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(
      clearLoginErrors()
    );
  }

  getFormData() {
    const {
      __email: email,
      __password: password,
    } = this.state;

    return appendToFormData(
      new FormData(),
      {
        email,
        password,
      }
    );
  }

  doLogin(e) {
    e.preventDefault();

    const {
      dispatch,
      isFetching,
    } = this.props;

    if (isFetching) {
      return false;
    }

    dispatch(
      loginUser(
        this.getFormData()
      )
    );
  }

  doSocialLogin(data) {
    const {
      dispatch,
      isFetching,
      history,
    } = this.props;

    if (isFetching) {
      return false;
    }

    const {
      provider,
      providerId,
      token,
    } = data;

    dispatch(
      loginUser(
        appendToFormData(
          new FormData(),
          {
            provider,
            providerId,
            token,
          }
        ),
        () => {
          history.push(
            '/signup',
            {
              from: '/login',
              data,
            }
          )
        }
      )
    );
  }

  render() {
    const {
      history,
      isFetching,
      isAuthenticated,
      errors,
    } = this.props;
/*
    Redirecting user where he was navigate after log in, this variable put below in component <Redirect to={from} />,
    extract 'location' from this.props;
    --------------------------------
    const { from } = location.state || {from: { pathname: '/profile/edit' }};
*/
    // Can't access login page while logged in
    if (isAuthenticated) {
      return (
        <Redirect to={'/profile/edit'} />
      );
    }

    const {
      __email,
      __password,
    } = this.state;

    return (
      <Login
        isFetching={isFetching}
        onSubmit={this.doLogin}
        errors={errors}
        __email={__email}
        __password={__password}
        onEmailChange={({target: {value: __email}}) => {
          this.setState({__email});
        }}

        onPasswordChange={({target: {value: __password}}) => {
          this.setState({__password});
        }}

        onCreateAccountClick={() => {
          history.push('/signup', { from: '/login' })
        }}

        resetPassword={() => {
          history.push('/resetPassword', { from: '/login' })
        }}

        requestLoginWithFacebook={({
          first_name: firstName,
          last_name: lastName,
          gender,
          email,
          id: providerId,
          accessToken: token,
        }) => {
          if (providerId) {
            this.doSocialLogin({
              firstName,
              lastName,
              gender,
              email,
              provider: 'facebook',
              providerId,
              token,
            });
          }
        }}

        requestLoginWithGoogle={({
          El: providerId,
          w3: {
            U3: email,
            wea: firstName,
            ofa: lastName,
          },
          Zi: {
            access_token: token,
          },
        }) => {
          if (providerId) {
            this.doSocialLogin({
              firstName,
              lastName,
              gender: '',
              email,
              provider: 'google',
              providerId,
              token,
            });
          }
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.loginIsFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.loginErrors
  };
}

export default withRouter(connect(mapStateToProps)(LoginContainer));
