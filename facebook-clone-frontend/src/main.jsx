import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/icons/icons.css";
import "./index.css";
import store from "./reducers/index";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </RecoilRoot>
  </React.StrictMode>
);
