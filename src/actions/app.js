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

import moment from "moment";

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
 * Fetch initial app state.
 *
 * Note! This method must be dispatched.
 *
 * @returns {function(*)}
 */

export function fetchInitialState() {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const expiresOn = localStorage.getItem('ACCESS_TOKEN_EXPIRES_ON');

  return async dispatch => {
    try {
          await dispatch(requestFetchInitialState());

          if (accessToken && expiresOn) {
              if (parseInt(expiresOn, 10) > moment().unix()) {
                  await dispatch(receiveLogin(accessToken, expiresOn));
                  await dispatch(fetchPersonalData(accessToken))
              } else {
                  return await dispatch(refreshAccessToken())
              }
          }

          return dispatch(receiveInitialState())
      } catch(error) {
        console.info(error);
        return dispatch(fetchInitialStateError());
      }
  }
}
