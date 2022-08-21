import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AuthProvider, AuthStore } from "./stores/authStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider value={new AuthStore()}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
