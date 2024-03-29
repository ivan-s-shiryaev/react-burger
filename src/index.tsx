import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { compose } from "redux";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import store from "./services/store";
import App from "./components/app/app";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

ReactDOM.createRoot(document.getElementById("root-app") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/react-burger">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
