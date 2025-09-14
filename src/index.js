
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/auth/Login";

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import msalConfig from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

// Handle the redirect response once on startup (avoids “interaction_in_progress” loops)
msalInstance.handleRedirectPromise().catch((e) => console.error(e));

// Optional: basic event logging
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    // console.log("Login success", event);
  }
  if (event.eventType === EventType.LOGIN_FAILURE) {
    console.error("Login failed", event.error);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <Login />
    </MsalProvider>
  </React.StrictMode>
);
