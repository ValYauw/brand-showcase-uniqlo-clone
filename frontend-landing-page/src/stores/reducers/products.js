import { 
  FETCH_PRODUCTS_SUCCESS, 
  FETCH_PRODUCTS_REJECT, 
  FETCH_PRODUCTS_LOADING
} from '../actions/actionTypes';

const initialState = {
  products: [],
  numPages: null,
  isLoading: false
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.data,
        numPages: action.payload.numPages
      }

    case FETCH_PRODUCTS_REJECT:
      return {
        ...state,
        products: [],
        numPages: null
      };
    
    case FETCH_PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

  }
  return state;
}