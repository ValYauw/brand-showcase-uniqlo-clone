import { BASE_URL } from "../../config/api";
import axios from 'axios';
import {
  FETCH_CMS_PRODUCTS_SUCCESS, 
  FETCH_CMS_PRODUCTS_REJECT, 
  FETCH_CMS_PRODUCTS_LOADING,
  GET_ONE_CMS_PRODUCT_SUCCESS, 
  GET_ONE_CMS_PRODUCT_REJECT, 
  GET_ONE_CMS_PRODUCT_LOADING,
  // CREATE_NEW_PRODUCT_SKELETON,
  RELEASE_PRODUCT_FROM_STORE,
  CREATE_PRODUCT_SUCCESS, 
  CREATE_PRODUCT_REJECT, 
  CREATE_PRODUCT_LOADING,
  UPDATE_PRODUCT_SUCCESS, 
  UPDATE_PRODUCT_REJECT, 
  UPDATE_PRODUCT_LOADING,
  DELETE_PRODUCT_SUCCESS, 
  DELETE_PRODUCT_REJECT, 
  DELETE_PRODUCT_LOADING,
} from './actionTypes';
import {
  GQL_GET_PRODUCTS,
  GQL_GET_PRODUCT,
  GQL_ADD_PRODUCT,
  GQL_EDIT_PRODUCT,
  GQL_DELETE_PRODUCT
} from '../queries/queries';

/*
 * FETCH MULTIPLE PRODUCTS ACTIONS & THUNKS
 */
const fetchProductsSuccess = (products) => { 
  // console.log("Sending payload", products);
  return { 
    type: FETCH_CMS_PRODUCTS_SUCCESS, 
    payload: products 
  } 
}
const fetchProductsReject = () => { 
  return { 
    type: FETCH_CMS_PRODUCTS_REJECT 
  } 
}
const fetchProductsLoading = (isLoading = true) => {
  return { 
    type: FETCH_CMS_PRODUCTS_LOADING,
    payload: isLoading
  }
}
export const fetchProductsCMS = () => {
  return async (dispatch, getState) => {
    dispatch(fetchProductsLoading(true));
    try {
      console.log('Fetching products...');
      const response = await axios({
        url: BASE_URL,
        method: 'POST',
        data: GQL_GET_PRODUCTS(),
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        }
      })
      const { data: { data: {cmsProducts} = {} } = {} } = response;
      dispatch(fetchProductsSuccess(cmsProducts));
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
    type: GET_ONE_CMS_PRODUCT_SUCCESS, 
    payload: product
  } 
}
const getOneProductReject = () => { 
  return { 
    type: GET_ONE_CMS_PRODUCT_REJECT 
  } 
}
const getOneProductLoading = (isLoading = true) => {
  return { 
    type: GET_ONE_CMS_PRODUCT_LOADING,
    payload: isLoading
  }
}
export const getProductById = (id) => {
  return async (dispatch, getState) => {
    dispatch(getOneProductLoading(true));
    try {
      console.log('Fetching product details...');
      const response = await axios({
        url: BASE_URL,
        method: 'POST',
        data: GQL_GET_PRODUCT(id)
      });
      const { data: { data: {product} = {} } = {} } = response;
      dispatch(getOneProductSuccess(product));
    } catch(err) {
      dispatch(getOneProductReject());
      throw err;
    } finally {
      dispatch(getOneProductLoading(false));
    }
  }
}
export const releaseProductFromStore = () => {
  return {
    type: RELEASE_PRODUCT_FROM_STORE
  }
}

/*
 * CREATE PRODUCT ACTIONS & THUNKS
 */
const addProductSuccess = () => {
  return { 
    type: CREATE_PRODUCT_SUCCESS 
  }
}
const addProductReject = () => {
  return { 
    type: CREATE_PRODUCT_REJECT 
  }
}
const addProductLoading = (isLoading = true) => {
  return { 
    type: CREATE_PRODUCT_LOADING,
    payload: isLoading
  }
}
export const addProduct = (payload) => {
  return async (dispatch, getState) => {
    dispatch(addProductLoading(true));
    try {
      const response = await axios({
        url: BASE_URL,
        method: 'POST',
        headers: {
          "access_token": localStorage.getItem('access_token')
        },
        data: GQL_ADD_PRODUCT(payload)
      })
      dispatch(addProductSuccess());
    } catch(err) {
      dispatch(addProductReject());
      throw err;
    } finally {
      dispatch(addProductLoading(false));
    }
  }
}

/*
 * UPDATE PRODUCT ACTIONS & THUNKS
 */
export const editProductDetailsInStore = (productProperty, value) => {
  return {
    type: UPDATE_PRODUCT_IN_STORE,
    payload: {productProperty, value}
  }
}
const updateProductSuccess = () => {
  return { 
    type: UPDATE_PRODUCT_SUCCESS 
  }
}
const updateProductReject = () => {
  return { 
    type: UPDATE_PRODUCT_REJECT 
  }
}
const updateProductLoading = (isLoading = true) => {
  return { 
    type: UPDATE_PRODUCT_LOADING,
    payload: isLoading
  }
}
export const updateProduct = (payload) => {
  return async (dispatch, getState) => {
    dispatch(updateProductLoading(true));
    try {
      const { id } = payload;
      if (!id || isNaN(id)) throw new Error('Invalid product id');
      await axios({
        url: BASE_URL,
        method: 'POST',
        headers: {
          "access_token": localStorage.getItem('access_token')
        },
        data: GQL_EDIT_PRODUCT(payload)
      })
      dispatch(updateProductSuccess());
    } catch(err) {
      dispatch(updateProductReject());
      throw err;
    } finally {
      dispatch(updateProductLoading(false));
    }
  }
}

/*
 * DELETE ACTIONS & THUNKS
 */
const deleteProductSuccess = () => {
  return { type: DELETE_PRODUCT_SUCCESS }
}
const deleteProductReject = () => {
  return { type: DELETE_PRODUCT_REJECT }
}
const deleteProductLoading = (isLoading = true) => {
  return { 
    type: DELETE_PRODUCT_LOADING,
    payload: isLoading
  }
}
export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    dispatch(deleteProductLoading(true));
    try {
      if (!id || isNaN(id)) throw new Error('Invalid product id');
      await axios({
        url: BASE_URL,
        method: 'POST',
        headers: {
          "access_token": localStorage.getItem('access_token')
        },
        data: GQL_DELETE_PRODUCT(id)
      })
      dispatch(deleteProductSuccess());
    } catch(err) {
      dispatch(deleteProductReject());
      throw err;
    } finally {
      dispatch(deleteProductLoading(false));
    }
  }
}