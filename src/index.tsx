import React from "react";
import ReactDOM from "react-dom/client";
import 'react-image-crop/dist/ReactCrop.css'

import "./i18n";

import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={configureStore({})}>
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);