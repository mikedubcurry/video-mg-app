import { observer } from "mobx-react-lite";
import { useState, useContext } from "react";
import { AuthContext } from "../stores/authStore";
import LogIn from "./LogIn";

function App() {
  const authStore = useContext(AuthContext);

  if (authStore.token) {
    return <h1>Hello</h1>;
  } else {
    return <LogIn />;
  }
}

export default observer(App);
