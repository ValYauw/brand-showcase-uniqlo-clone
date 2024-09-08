import { BASE_URL } from "../../config/api";
import axios from 'axios';
import { GQL_LOGIN } from "../queries/queries";
import { 
  LOGIN_SUCCESS, LOGIN_REJECT, LOGIN_LOADING, SET_LOGGED_IN_STATUS
} from './actionTypes';

/*
 * LOGIN ACTIONS & THUNKS
 */
const loginUserSuccess = () => { 
  return { 
    type: LOGIN_SUCCESS 
  } 
}
const loginUserReject = () => { 
  return { 
    type: LOGIN_REJECT 
  } 
}
const loginUserLoading = (isLoading = true) => { 
  return { 
    type: LOGIN_LOADING, 
    payload: isLoading 
  } 
}
export const loginUser = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(loginUserLoading(true));
    try {
      if (!email) throw {name: 'InvalidLogin', message: 'Email is required'};
      if (!password) throw {name: 'InvalidLogin', message: 'Password is required'};
      console.log('Logging in...');
      const response = await axios({
        url: BASE_URL, 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: GQL_LOGIN({ email, password })
      });
      const { data: { data: { login: { access_token } = {} } = {} } = {} } = response;
      localStorage.setItem('access_token', access_token);
      dispatch(loginUserSuccess());
    } catch(err) {
      dispatch(loginUserReject());
      throw err;
    } finally {
      dispatch(loginUserLoading(false));
    }
  }
}
export const setLoggedInState = () => {
  if (localStorage.getItem('access_token')) {
    // TODO: Check if expired
    return {
      type: SET_LOGGED_IN_STATUS,
      payload: true
    }
  } else {
    return {
      type: SET_LOGGED_IN_STATUS,
      payload: false
    }
  }
}