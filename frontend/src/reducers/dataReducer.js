import { GET_SENSITIVE_DATA } from '../actions/SensitiveDataAction';
import { DELETE_DATA } from '../actions/authAction';

const INITIAL_STATE = { data: null };
export default function sensitivedataReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SENSITIVE_DATA:
      return { ...state, data: action.payload };
    case DELETE_DATA:
      return { ...state, data: null };
    default:
      return state
  }
}
