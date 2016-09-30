import axios from 'axios';
import * as constants from './constants';

export const GET_SENSITIVE_DATA = 'GET_SENSITIVE_DATA';
export function getSensitiveDataAction(route) {
   return dispatch => {
    //  console.log('authorization is ', window.localStorage.authorization);
     axios(`${constants.API_URL}/${route}`, {
       headers: { 'authorization': window.localStorage.authorization }
     })
     .then(response => {
       console.log('response sensitivedata is ', response);
       dispatch({
         type: GET_SENSITIVE_DATA,
         payload: response.data
       });
     })
     .catch(error => {
       console.log('error in getSensitiveDataAction is ', error);
     })
   }
}
