import { BASE_URL } from "../../config/api";
import axios from 'axios';
import {
  FETCH_PRODUCTS_SUCCESS, 
  FETCH_PRODUCTS_REJECT, 
  FETCH_PRODUCTS_LOADING,
  GET_ONE_PRODUCT_SUCCESS, 
  GET_ONE_PRODUCT_REJECT, 
  GET_ONE_PRODUCT_LOADING,
} from './actionTypes';
import {
  GQL_GET_PRODUCTS,
  GQL_GET_PRODUCT
} from '../queries/queries';

/*
 * FETCH MULTIPLE PRODUCTS ACTIONS & THUNKS
 */
const fetchProductsSuccess = (products) => { 
  // console.log("Sending payload", products);
  return { 
    type: FETCH_PRODUCTS_SUCCESS, 
    payload: products 
  } 
}
const fetchProductsReject = () => { 
  return { 
    type: FETCH_PRODUCTS_REJECT 
  } 
}
const fetchProductsLoading = (isLoading = true) => {
  return { 
    type: FETCH_PRODUCTS_LOADING,
    payload: isLoading
  }
}
export const fetchProducts = (page) => {
  return async (dispatch, getState) => {
    dispatch(fetchProductsLoading(true));
    try {
      console.log('Fetching products...');
      const response = await axios({
        url: BASE_URL,
        method: 'POST',
        data: GQL_GET_PRODUCTS(page)
      });
      const { data: { data } = {} } = response;
      const { products } = data || {};
      dispatch(fetchProductsSuccess({
        data: products.data,
        numPages: Math.ceil(products.count / 6)
      }));
    } catch(err) {
      dispatch(fetchProductsReject());
      throw err;
    } finally {
      dispatch(fetchProductsLoading(false));
    }
  }
}

/*
 * FETCH SINGLE PRODUCT ACTIONS & THUNKS
 */
const getOneProductSuccess = (product) => { 
  return { 
    type: GET_ONE_PRODUCT_SUCCESS, 
    payload: product
  } 
}
const getOneProductReject = () => { 
  return { 
    type: GET_ONE_PRODUCT_REJECT 
  } 
}
const getOneProductLoading = (isLoading = true) => {
  return { 
    type: GET_ONE_PRODUCT_LOADING,
    payload: isLoading
  }
}
export const getProductBySlug = (slug) => {
  return async (dispatch, getState) => {
    dispatch(getOneProductLoading(true));
    try {
      console.log('Fetching product details...');
      const response = await axios({
        url: BASE_URL,
        method: 'POST',
        data: GQL_GET_PRODUCT(slug)
      });
      const { data: { data } = {} } = response;
      const { product } = data || {};
      dispatch(getOneProductSuccess(product));
    } catch(err) {
      dispatch(getOneProductReject());
      throw err;
    } finally {
      dispatch(getOneProductLoading(false));
    }
  }
}