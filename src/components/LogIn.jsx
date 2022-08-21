import { observer } from "mobx-react-lite";
import { useState, useContext } from "react";
import { AuthContext, FETCH_STATES } from "../stores/authStore";

function LogIn() {
  const [username, setUname] = useState("");
  const [password, setPword] = useState("");

  const authStore = useContext(AuthContext);

  console.log(authStore.token, authStore.fetchState);
  const logIn = () => {
    authStore.authenticate(username, password);
    setUname("");
    setPword("");
  };

  return (
    <div>
      <label htmlFor="uname">Username</label>
      <input
        id="uname"
        type="text"
        value={username}
        onChange={(e) => setUname(e.target.value)}
      />
      <label htmlFor="pword">Password</label>
      <input
        id="pword"
        type="password"
        value={password}
        onChange={(e) => setPword(e.target.value)}
      />
      <button onClick={logIn}>
        {authStore.fetchState === FETCH_STATES.IDLE
          ? "Log In"
          : authStore.fetchState === FETCH_STATES.DONE
          ? "Log In"
          : "Logging in ..."}
      </button>
    </div>
  );
}

export default observer(LogIn);
