import { SHOW_SNACKBAR, HIDE_SNACKBAR } from './actionTypes';

export function showNotificationSnackbar(payload) {
  return {
    type: SHOW_SNACKBAR,
    payload: payload
  }
}
export function hideNotificationSnackbar() {
  return {
    type: HIDE_SNACKBAR
  }
}