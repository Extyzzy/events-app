import {
  InvalidRefreshToken
} from '../exceptions/auth';
import {
  UnprocessableEntity
} from '../exceptions/http';
import {
  fetchApiRequest,
  fetchAuthorizedApiRequest
} from "../fetch";
import {
  SilencedError
} from "../exceptions/errors";


/*---------------------------- SIGN UP -----------------------------*/

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const CLEAR_SIGNUP_ERRORS = 'CLEAR_SIGNUP_ERRORS';

export function clearSignUpErrors() {
  return {
    type: CLEAR_SIGNUP_ERRORS,
  };
}


/*----------------------------- LOGIN ------------------------------*/

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function receiveLogin(accessToken, accessTokenExpiresOn, id, name) {
  return {
    type: LOGIN_SUCCESS,
    accessToken,
    accessTokenExpiresOn,
    id,
    name
  };
}

function loginError(errors) {
  return {
    type: LOGIN_FAILURE,
    errors,
  };
}

export function clearLoginErrors() {
  return {
    type: CLEAR_LOGIN_ERRORS,
  };
}

/**
 * Log in the user using provided credentials.
 *
 * Note! This method must be dispatched.
 *
 * @param {FormData} creds
 * @param {function(*=)} onAuthFail
 * @returns {function(*=)}
 */
export function loginUser(creds, onAuthFail = null) {


  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin());

    return fetchApiRequest('/login', {
        method: 'POST',
        // credentials: 'include',
        body: creds,
      })
      .then(response => {

        console.log(`Response ${response}`);
        console.log(`Status ${response.status}`);
        switch (response.status) {
          case 200:
            return response.json().then(({
              access_token: accessToken,
              expires_in: expiresIn,
              id,
              name
            }) => {
              return {
                accessToken,
                expiresIn,
                id,
                name
              };
            });
          case 404:
            return response.json()
            .then(({errors}) => {
              dispatch(loginError(errors));

              return Promise.reject(
                new UnprocessableEntity()
              );
            })
            .catch ((err => console.log('Email not found or something....')));
            
          case 422:
            return response.json().then(({
              errors
            }) => {
              dispatch(loginError(errors));

              return Promise.reject(
                new UnprocessableEntity()
              );
            });

          default:
            dispatch(loginError(
              ['Invalid Credentials.']
            ));

            return Promise.reject(
              new SilencedError('Invalid Credentials.')
            );
        }
      })
      .then(auth => {
        localStorage.setItem('ACCESS_TOKEN', auth.accessToken);
        localStorage.setItem('ACCESS_TOKEN_EXPIRES_ON', auth.expiresIn);

        // Set required data & dispatch the success action

        dispatch(setUserData({
          id: auth.id,
          name: auth.name
        }));

        dispatch(receiveLogin(
          auth.accessToken,
          auth.expiresIn
        ));

        return Promise.resolve();
      })
      .catch ((err => console.log('Email not found or something....')));
  };
}

/*---------------------------- LOGOUT ------------------------------*/

export const LOGOUT = 'LOGOUT';

function logout() {
  return {
    type: LOGOUT,
  };
}

/**
 * Revoke the users access token.
 *
 * Note! This method must be dispatched.
 *
 * @param accessToken
 * @param accessTokenExpiresOn
 * @returns {function(*)}
 */
export function logoutUser(accessToken) {
  return dispatch => {
    fetchApiRequest('/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ACCESS_TOKEN_EXPIRES_ON');

    dispatch(logout());
  };
}

/*---------------------- REFRESH ACCESS TOKEN ----------------------*/

export const REFRESH_ACCESS_TOKEN_SUCCESS = 'REFRESH_ACCESS_TOKEN_SUCCESS';

function receiveNewToken(accessToken, accessTokenExpiresOn) {
  return {
    type: REFRESH_ACCESS_TOKEN_SUCCESS,
    accessToken,
    accessTokenExpiresOn,
  };
}

/**
 * Refresh access token.
 * Use it when current access token is expired,
 * or a 401 status code is received.
 *
 * Note! Do not repeat this if will receive again 401.
 *
 * Note! This method must be dispatched.
 *
 *
 * @returns {function(*)}
 */
export function refreshAccessToken() {
  return dispatch => {
    return fetchApiRequest('/v1/login/refresh', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
      })
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json()
              .then(({
                access_token: accessToken,
                expires_in: expiresIn
              }) => {
                let now = new Date();
                let expiresOn = now.setSeconds(
                  now.getSeconds() + expiresIn
                );

                return {
                  accessToken,
                  expiresOn,
                };
              });

          default:
            return Promise.reject(
              new InvalidRefreshToken()
            );
        }
      })
      .then(({
        accessToken,
        expiresOn
      }) => {
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        localStorage.setItem('ACCESS_TOKEN_EXPIRES_ON', expiresOn);

        dispatch(receiveNewToken(accessToken, expiresOn));

        return {
          accessToken,
          expiresOn,
        };
      });
  };
}

/*--------------------- FETCH PERSONAL DETAILS ---------------------*/

export const SET_USER_DATA = 'SET_USER_DATA';

export function setUserData(data) {
  return {
    type: SET_USER_DATA,
    data,
  };
}

/**
 * Fetch authed user details
 *
 * @param accessToken
 * @returns {function(*)}
 */
export function fetchPersonalData(accessToken) {
  console.info(accessToken);
  return dispatch => {
    return dispatch(
        fetchAuthorizedApiRequest('/v1/account/details', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })
      )
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json();
          default:
            return Promise.reject(
              new SilencedError('Failed to fetch personal details.')
            );
        }
      });
  };
}

/*---------------------------- EDIT USER ---------------------------*/

export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';

export function receiveEditUser(user) {
  return {
    type: EDIT_USER_SUCCESS,
    user,
  };
}