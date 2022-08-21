import { observer } from "mobx-react-lite";
import { useState, useContext } from "react";
import { AuthContext, useAuthStore } from "../stores/authStore";
import LogIn from "./LogIn";
import Room from "./Room";

function App() {
  const authStore = useAuthStore();

  if (authStore.token) {
    history.pushState({}, "", "/room");
    return <Room />;
  } else {
    history.pushState({}, "", "/");
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        {authStore.authError}
        <LogIn />
      </div>
    );
  }
}

export default observer(App);
