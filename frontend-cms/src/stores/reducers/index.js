import { combineReducers } from "redux";
import productReducer from "./product";
import categoriesReducer from "./categories";
import cmsReducer from "./cms";
import loginReducer from "./login";
import registerReducer from "./register";
import snackbarReducer from "./snackbar";

const rootReducer = combineReducers({
  product: productReducer,
  categories: categoriesReducer,
  login: loginReducer,
  register: registerReducer,
  cms: cmsReducer,
  snackbar: snackbarReducer
});

export default rootReducer;