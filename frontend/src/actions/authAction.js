import axios from 'axios';
import { browserHistory } from 'react-router';

import * as constants from './constants';

export const SIGN_IN = 'SIGN_IN';
export function signInAction(route, { email, password }={} ) {
  //submit email/password to server
  return dispatch => {
    axios.post(`${constants.API_URL}/${route}`, {
      email,
      password
    })
    .then( response => {
      // if request is good,
      //1) update state to indicate user is authenticated 2) save the JWT token 3) redirect to the route /sensitivedata
      if(response){
        dispatch({
          type: SIGN_IN
        });
        window.localStorage.authorization = response.data.token;
        browserHistory.push('/sensitivedata');
      } else {
        // if request is bad ... show an error to the user
      }
    })
    .catch(error => {
      var errorMessage = '';
      if (error.message.search(/401/g) >=0 ) {
        errorMessage = 'Bad Login Info'
      } else if (error.message.search(/422/g) >= 0 ) {
        errorMessage = 'Email already in use';
      } else {
        errorMessage = 'Something unexpected happen - please try again';
      }
      dispatch(authError(errorMessage));
    });
  }
}

export const SIGN_OUT = 'SIGN_OUT';
export const DELETE_DATA = 'DELETE_DATA';
export function signoutAction() {
  return dispatch => {
    localStorage.removeItem('authorization');
    dispatch({ type: SIGN_OUT });
    dispatch({ type: DELETE_DATA });
  }
}

export const AUTH_ERROR = 'AUTH_ERROR';
function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
