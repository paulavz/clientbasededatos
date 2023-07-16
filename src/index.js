import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router/AppRouter";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

/*

02:37:00

 */
