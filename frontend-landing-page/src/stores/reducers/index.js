import { combineReducers } from "redux";
import productReducer from "./product";
import productsReducer from "./products";
import categoriesReducer from "./categories";
import snackbarReducer from "./snackbar";

const rootReducer = combineReducers({
  product: productReducer,
  products: productsReducer,
  categories: categoriesReducer,
  snackbar: snackbarReducer
});

export default rootReducer;