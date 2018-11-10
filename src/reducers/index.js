import { combineReducers } from 'redux';
import { LOGOUT } from '../actions/user';
import { pick } from 'lodash';

import app from './app';
import auth from './auth';
import user from './user';

const combinedReducers = combineReducers({
  app,
  auth,
  user,
});

/**
 * Extend combined reducers and define a global action
 * LOGOUT that will reset app state on user Logout.
 *
 * @param state
 * @param action
 * @returns {any}
 */
export default (state, action) => {
  if (action.type === LOGOUT) {
    state = Object.assign({}, {}, pick(state, ['app']));
  }

  return combinedReducers(state, action);
};
