import { LOGIN_SUCCESS, LOGIN_REJECT, LOGIN_LOADING, SET_LOGGED_IN_STATUS } from "../actions/actionTypes";

const initialState = {
  isLoggedIn: null,
  isLoading: false
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {

    case SET_LOGGED_IN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      }

    case LOGIN_REJECT:
      return state;

    case LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

  }
  return state;
}