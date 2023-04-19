import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "react-oidc-context";
import { AUTHORITY, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE } from "./Constant";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const oidcConfig = {
  onSigninCallback: (user: any) => {
    loginUser(user);
  },
  authority: AUTHORITY,
  client_id: CLIENT_ID,
  response_type: RESPONSE_TYPE,
  redirect_uri: REDIRECT_URI,
};

const loginUser = (user: any) => {
  localStorage.setItem("access_token", user?.access_token);
};

root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
