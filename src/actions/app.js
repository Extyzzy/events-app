import {
  InvalidRefreshToken,
  UndefinedAccessToken,
} from '../exceptions/auth';

import {
    refreshAccessToken,
    fetchPersonalData,
    setUserData,
    receiveLogin,
} from './user';

export const FETCH_INITIAL_STATE_REQUEST = 'FETCH_INITIAL_STATE_REQUEST';
export const FETCH_INITIAL_STATE_COMPLETE = 'FETCH_INITIAL_STATE_COMPLETE';
export const FETCH_INITIAL_STATE_FAILURE = 'FETCH_INITIAL_STATE_FAILURE';

export function requestFetchInitialState() {
  return {
    type: FETCH_INITIAL_STATE_REQUEST,
    isFetching: true,
  };
}

export function receiveInitialState() {
  return {
    type: FETCH_INITIAL_STATE_COMPLETE,
    isFetching: false,
    hasErrors: false,
  };
}

export function fetchInitialStateError() {
  return {
    type: FETCH_INITIAL_STATE_FAILURE,
    isFetching: false,
    hasErrors: true,
  };
}

/**
 * Fetch auth state. Method is meant to be
 * used in a new Promise.
 *
 * Note! This method must be dispatched.
 *
 * @param resolve
 * @param reject
 * @returns {function(*)}
 */
function fetchAuthState(resolve, reject) {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const expiresOn = localStorage.getItem('ACCESS_TOKEN_EXPIRES_ON');
  return dispatch => {
    if (accessToken && expiresOn) {
      if (parseInt(expiresOn, 10) > (new Date()).getTime()) {
        dispatch(receiveLogin(accessToken, expiresOn));

        resolve();
      }
      else {
        // Blocking the call to refresh token
        return dispatch(refreshAccessToken())
          .then(() => resolve())
          .catch(e => {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('ACCESS_TOKEN_EXPIRES_ON');

            reject(new InvalidRefreshToken());
          });

      }
    }

    reject(new UndefinedAccessToken());
  };
}

/**
 * Fetch initial app state.
 *
 * Note! This method must be dispatched.
 *
 * @returns {function(*)}
 */

 export function fetchInitialState() {
   return dispatch => {
     dispatch(requestFetchInitialState());

     return Promise.all([

       // Try to fetch user data if is authed
       new Promise((resolve, reject) => {
         dispatch(fetchAuthState(resolve, reject));
       })
       .then(() => dispatch(fetchPersonalData(
         localStorage.getItem('ACCESS_TOKEN')
       )))
       .then(data => ({data, status: 'RESOLVED'}))
       .catch(e => Promise.resolve({e, status: 'REJECTED'}))
     ])
     .then(([{data: userData, status: userStatus}]) => {

       /**
        * TODO
        * Load translations from api.
        */

       // Set user data only if we succeed in previous step
       if (userStatus === 'RESOLVED') {
         dispatch(setUserData(userData));
       }

       return Promise.resolve();
     })
     .then(() => {
       return dispatch(receiveInitialState());
     })
     .catch(() => {
       return dispatch(fetchInitialStateError());
     });
   };
 }
