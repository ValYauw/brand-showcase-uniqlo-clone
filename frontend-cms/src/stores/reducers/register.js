import { REGISTER_SUCCESS, REGISTER_REJECT, REGISTER_LOADING } from "../actions/actionTypes";

const initialState = {
  isLoading: false
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {

    case REGISTER_SUCCESS:
    case REGISTER_REJECT:
      return state;

    case REGISTER_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

  }
  return state;
}