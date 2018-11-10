import {
  SET_USER_DATA,
  EDIT_USER_SUCCESS,
} from '../actions/user';

import { SWITCH_USER_AVATAR } from '../actions/user';

export default function user(state = {
    jenea: false,
}, action) {
  switch (action.type) {

    case SET_USER_DATA:
      return Object.assign({}, state, {
        ...action.data
      });
    case SWITCH_USER_AVATAR:
      return Object.assign({}, state, {
        avatar: action.avatar
      });
    case EDIT_USER_SUCCESS:
      return updateStoreOnEditUserSuccess(state, action);
    default:
      return state;
  }
}

const updateStoreOnEditUserSuccess = (state, {user}) => {
  return Object.assign({}, state, {
    ...user
  });
};
