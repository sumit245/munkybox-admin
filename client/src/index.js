import React from "react";
import ReactDOM from "react-dom";
import "./css/bootstrap.min.css";
import "./font-awesome/css/font-awesome.min.css";
import "./css/style.css";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
