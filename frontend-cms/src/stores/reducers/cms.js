import { 
  FETCH_CMS_PRODUCTS_SUCCESS, 
  FETCH_CMS_PRODUCTS_REJECT, 
  FETCH_CMS_PRODUCTS_LOADING,
  GET_ONE_CMS_PRODUCT_SUCCESS, 
  GET_ONE_CMS_PRODUCT_REJECT, 
  GET_ONE_CMS_PRODUCT_LOADING,
  CREATE_PRODUCT_SUCCESS, 
  CREATE_PRODUCT_REJECT, 
  CREATE_PRODUCT_LOADING,
  UPDATE_PRODUCT_SUCCESS, 
  UPDATE_PRODUCT_REJECT, 
  UPDATE_PRODUCT_LOADING,
  DELETE_PRODUCT_SUCCESS, 
  DELETE_PRODUCT_REJECT, 
  DELETE_PRODUCT_LOADING,
  RELEASE_PRODUCT_FROM_STORE,
} from '../actions/actionTypes';

const initialState = {
  products: [],
  product: null,
  isLoading: false
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_CMS_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      }
    case FETCH_CMS_PRODUCTS_REJECT:
      return {
        ...state,
        products: []
      };

    case GET_ONE_CMS_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload
      }
    case GET_ONE_CMS_PRODUCT_REJECT:
      return {
        ...state,
        product: null
      };
    
    case CREATE_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_SUCCESS:
    case DELETE_PRODUCT_SUCCESS:
    case CREATE_PRODUCT_REJECT:
    case UPDATE_PRODUCT_REJECT:
    case DELETE_PRODUCT_REJECT:
      return state;
    
    case FETCH_CMS_PRODUCTS_LOADING:
    case GET_ONE_CMS_PRODUCT_LOADING:
    case CREATE_PRODUCT_LOADING:
    case UPDATE_PRODUCT_LOADING:
    case DELETE_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case RELEASE_PRODUCT_FROM_STORE:
      return {
        ...state,
        product: null
      }

  }
  return state;
}