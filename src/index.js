/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./store/SetUpMobX";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
