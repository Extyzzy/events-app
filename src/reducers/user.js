import {
  SET_USER_DATA,
  EDIT_USER_SUCCESS,
} from '../actions/user';

export default function user(state = {
  id: false
}, action) {
  switch (action.type) {

    case SET_USER_DATA:
      return Object.assign({}, state, {
        ...action.data
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
