import { BASE_URL } from "../../config/api";
import axios from 'axios';
import {
  FETCH_CATEGORIES_SUCCESS, 
  FETCH_CATEGORIES_REJECT, 
  FETCH_CATEGORIES_LOADING
} from './actionTypes';
import {
  GQL_GET_CATEGORIES
} from '../queries/queries';

/*
 * FETCH CATEGORIES ACTIONS & THUNKS
 */
const fetchCategoriesSuccess = (categories) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories
  }
}
const fetchCategoriesReject = () => {
  return { type: FETCH_CATEGORIES_REJECT }
}
const fetchCategoriesLoading = (isLoading = true) => {
  return {
    type: FETCH_CATEGORIES_LOADING,
    payload: isLoading
  }
}
export const fetchCategories = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCategoriesLoading(true));
    try {
      const response = await axios({
        url: BASE_URL,
        method: 'POST',
        data: GQL_GET_CATEGORIES()
      });
      const { data: { data: { categories } = {} } = {} } = response;
      dispatch(fetchCategoriesSuccess(categories));
    } catch(err) {
      dispatch(fetchCategoriesReject());
      throw err;
    } finally {
      dispatch(fetchCategoriesLoading(false));
    }
  }
} 