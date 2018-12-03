import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  withRouter,
  Redirect
} from 'react-router';
import {
  appendToFormData
} from '../../../helpers/form';

import {
  loginUser,
  clearSignUpErrors,
} from '../../../actions/user';

import {
  SilencedError
} from "../../../exceptions/errors";

import {
  UnprocessableEntity
} from '../../../exceptions/http';

import {
  fetchApiRequest
} from "../../../fetch";

import SignUp from './SignUp';

class SignUpContainer extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      __email: '',
      __emailSentSucces: false,
      __key: null,
      __secondForm: false,
      __name: '',
      __password: '',
      __passwordConfirmation: '',
      __passwordsMatch: false,
    };

    this.doSignUp = this.doSignUp.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.sendSignUpData = this.sendSignUpData.bind(this);
  }

  componentDidMount() {
    if (window.location.href.indexOf('email') !== -1 && window.location.href.indexOf('key') !== -1) {
      this.setState({
        __secondForm: true,
        __email: new URL(window.location.href).searchParams.get('email'),
        __key: new URL(window.location.href).searchParams.get('key')
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      location: nextLocation
    } = nextProps;
    const {
      location
    } = this.props;

    if (location.search !== nextLocation.search) {
      if (!(window.location.href.indexOf('email') !== -1 && window.location.href.indexOf('key') !== -1)) {
        this.setState({
          __secondForm: false,
          __email: ''
        });
      } else {
        this.setState({
          __secondForm: true,
          __email: new URL(window.location.href).searchParams.get('email'),
          __key: new URL(window.location.href).searchParams.get('key')
        });
      }
    }
  }

  componentWillUnmount() {
    const {
      dispatch
    } = this.props;

    dispatch(
      clearSignUpErrors()
    );
  }

  doSignUp(e) {
    e.preventDefault();

  }

  componentDidUpdate() {
    const {
      __password,
      __passwordConfirmation,
      __passwordsMatch
    } = this.state;

    if (__password === __passwordConfirmation && __password !== '') {
      if (!__passwordsMatch) {
        this.setState({
          __passwordsMatch: true
        });
      }
    } else {
      if (__passwordsMatch) {
        this.setState({
          __passwordsMatch: false
        });
      }
    }
  }

  createFormDataEmail() {
    const {
      __email,
    } = this.state;

    return appendToFormData(
      new FormData(), {
        email: __email,
      },
    );
  }

  sendEmail(e) {
    const {
      __emailSentSucces
    } = this.state;

    e.preventDefault();

    if (!__emailSentSucces) {
      fetchApiRequest('/email_validation', {
        method: 'POST',
        body: this.createFormDataEmail(),
      })
      .then(response => {
        switch (response.status) {
          case 200:
            console.log('succes');
            return this.setState({
              __emailSentSucces: true,
            });

          default:
            return
        }
      })
      .then(() => {
        return;
      });
    }
  }

  createSignUpData() {
    const {
      __email,
      __name,
      __password,
      __key,
    } = this.state;

    return appendToFormData(
      new FormData(), {
        email: __email,
        name: __name,
        password: __password,
        key: __key,
      },
    );
  }

  sendSignUpData(e) {
    e.preventDefault();

    if (!this.state.__passwordsMatch) {
      alert(`Password doesn't match`)
    }

    const {
      dispatch,
      isFetching,
      history
    } = this.props;

    if (isFetching) {
      return false;
    }

    fetchApiRequest('/register', {
        method: 'POST',
        body: this.createSignUpData(),
      })
      .then(response => {
        switch (response.status) {
          case 201:
            return;
          case 406:
            return response.json().then(() => {
              return Promise.reject(
                new UnprocessableEntity()
              );
            });
          default:

            return Promise.reject(
              new SilencedError('Sign up process failed.')
            );
        }
      })
      .then(() => dispatch(loginUser(this.createSignUpData())))
      .then(() => history.push('/profile'))
  }

  render() {
    const {
      location,
      isAuthenticated,
      errors,
      history,
    } = this.props;

    // Redirects user if he is logged
    const {
      from
    } = location.state || {
      from: {
        pathname: '/log-in'
      }
    };

    if (isAuthenticated) {
      return ( <
        Redirect to = {
          from
        }
        />
      );
    }

    const {
      __firstName,
      __lastName,
      __email,
      __password,
      __passwordConfirmation,
      __provider,
      __emailSentSucces,
      __key,
      __secondForm,
      __passwordsMatch,
    } = this.state;


    return ( <
      SignUp sendEmail = {
        this.sendEmail
      }
      sendSignUpData = {
        this.sendSignUpData
      }
      onCancelSignup = {
        () => {
          history.push('/log-in', {
            from: '/signup'
          })
        }
      }

      __secondForm = {
        __secondForm
      }
      __key = {
        __key
      }
      __emailSentSucces = {
        __emailSentSucces
      }
      __provider = {
        __provider
      }
      __email = {
        __email
      }
      __firstName = {
        __firstName
      }
      __lastName = {
        __lastName
      }
      __password = {
        __password
      }
      __passwordConfirmation = {
        __passwordConfirmation
      }
      __passwordsMatch = {
        __passwordsMatch
      }

      onEmailChange = {
        ({
          target: {
            value: __email
          }
        }) => {
          this.setState({
            __email
          });
        }
      }

      onNameChange = {
        ({
          target: {
            value: __name
          }
        }) => {
          this.setState({
            __name
          });
        }
      }

      onPasswordChange = {
        ({
          target: {
            value: __password
          }
        }) => {
          this.setState({
            __password
          });
        }
      }

      onPasswordConfirmationChange = {
        ({
          target: {
            value: __passwordConfirmation
          }
        }) => {
          this.setState({
            __passwordConfirmation
          });
        }
      }

      errors = {
        errors
      }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.signUpIsFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.signUpErrors,
  };
}

export default withRouter(connect(mapStateToProps)(SignUpContainer));