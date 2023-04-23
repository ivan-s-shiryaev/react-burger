import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { menuReducer, orderReducer, orderDataReducer } from "./order";
import { modalReducer } from "./modal";

export const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  order: orderReducer,
  orderData: orderDataReducer,
  modal: modalReducer,
});
