import {
  GET_ONE_CMS_PRODUCT_SUCCESS,
  GET_ONE_CMS_PRODUCT_REJECT,
  GET_ONE_CMS_PRODUCT_LOADING,
} from '../actions/actionTypes';

const initialState = {
  product: null,
  isLoading: false
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {

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
    
    case GET_ONE_CMS_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

  }
  return state;
}