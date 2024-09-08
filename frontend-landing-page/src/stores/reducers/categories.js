import { 
  FETCH_CATEGORIES_SUCCESS, 
  FETCH_CATEGORIES_REJECT, 
  FETCH_CATEGORIES_LOADING,
} from '../actions/actionTypes';

const initialState = {
  categories: [],
  isLoading: false
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload
      };
    case FETCH_CATEGORIES_REJECT:
      return {
        ...state,
        categories: []
      };
    case FETCH_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
  }
  return state;
}