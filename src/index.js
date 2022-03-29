import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Provider from "./Provider";
import {AuthProvider} from './AuthProvider'

ReactDOM.render(
  <Provider>
    <AuthProvider>
    <App />
    </AuthProvider>
  </Provider>,
  document.getElementById("root")
);

