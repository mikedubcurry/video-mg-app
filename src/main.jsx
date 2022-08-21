import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AuthStore, createAuthStore } from "./stores/authStore";
import { AuthProvider } from "./providers/AuthProvider";

import styles from "./index.css";

// check local storage for auth token. if exists, check its expiration. if good, initialize auth state with token
let token;
try {
  let localToken = localStorage.getItem("video-mg-id");
  if (localToken) {
    localToken = JSON.parse(localToken);
    if (localToken.expiresAt > Date.now()) {
      token = localToken.token;
    } else {
      localStorage.removeItem("video-mg-id");
    }
  }
} catch (err) {
  token = null;
}

const authStore = createAuthStore({ token });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider authStore={authStore}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
