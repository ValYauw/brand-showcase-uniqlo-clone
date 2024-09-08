import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../actions/actionTypes';

const initialState = {
  type: 'info',
  message: '',
  show: false
}

export default function snackbarReducer(state = initialState, action) {
  switch (action.type) {

    case SHOW_SNACKBAR:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        show: true
      }

    case HIDE_SNACKBAR:
      return {
        ...state,
        type: 'info',
        message: '',
        show: false
      }
      
  }
  return state;
}