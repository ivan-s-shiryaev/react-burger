import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import socket from "./middleware/socket";
import { rootReducer } from "./reducers";
import { wsOrderFeedActions, wsOrderUserActions } from "./actions/order";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, socket(wsOrderFeedActions), socket(wsOrderUserActions))
);
export default createStore(rootReducer, enhancer);
