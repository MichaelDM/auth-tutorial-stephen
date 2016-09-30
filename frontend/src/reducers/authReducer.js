import { SIGN_IN, SIGN_OUT, AUTH_ERROR } from '../actions/authAction';

const INITIAL_STATE = { error: null, signedIn: null };
export default function authReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, error: null, signedIn: true};
    case SIGN_OUT:
      return { ...state, signedIn: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
