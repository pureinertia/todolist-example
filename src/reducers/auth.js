// @flow

import axios from 'axios';
import { AuthenticationEndpoint } from '../config';

const AUTH_START = 'AUTH_START';
const AUTH_END = 'AUTH_END';
const AUTH_ERROR = 'AUTH_ERROR';

export const authStart = () => ({ type: AUTH_START });

export const authEnd = (payload: any) => ({ type: AUTH_END, payload });

export const authError = () => ({ type: AUTH_ERROR });

export const authenticate = () => (dispatch) => {
  dispatch(authStart());

  return axios.get(AuthenticationEndpoint)
    .then(response => dispatch(authEnd(response.data)))
    .catch(() => dispatch(authError()));
};

const defaultState = {
  user: {},
  fetching: false,
};

const AuthReducer = (state: Object = defaultState, action: Object = {}) => {
  switch (action.type) {
    case AUTH_START:
      return Object.assign({}, state, {
        fetching: true,
      });
    case AUTH_END:
      return Object.assign({}, state, {
        fetching: false,
        user: action.payload,
      });
    default:
      return state;
  }
};

export default AuthReducer;
