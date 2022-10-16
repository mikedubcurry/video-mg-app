import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AuthStore, createAuthStore } from "./stores/authStore";
import { createRootStore } from "./stores/rootStore";
import { AuthProvider } from "./providers/AuthProvider";

import styles from "./index.css";
import { RootStateProvider } from "./providers/RootStoreProvider";
import { StreamProvider } from "./providers/StreamProvider";

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
// const authStore = createAuthStore({ token });
const rootStore = createRootStore({ token });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootStateProvider rootStore={rootStore}>
      <AuthProvider authStore={rootStore.authStore}>
        <StreamProvider streamStore={rootStore.streamStore}>
          <App />
        </StreamProvider>
      </AuthProvider>
    </RootStateProvider>
  </React.StrictMode>
);
