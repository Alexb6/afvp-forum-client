import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";
import store from "./redux/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "@csstools/normalize.css";

import "./index.css";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
