import {
  FETCH_INITIAL_STATE_REQUEST,
  FETCH_INITIAL_STATE_COMPLETE,
} from '../actions/app';

export default function app(state = {
  isFetching: true,
}, action) {
  switch (action.type) {
    case FETCH_INITIAL_STATE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_INITIAL_STATE_COMPLETE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}
