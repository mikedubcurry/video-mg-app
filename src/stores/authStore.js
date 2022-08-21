import { observable, action, makeObservable } from "mobx";
import { createContext, useContext } from "react";

import authService from "../services/auth";

export const FETCH_STATES = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  DONE: "DONE",
  ERROR: "ERROR",
};

export class AuthStore {
  constructor(props) {
    makeObservable(this, {
      token: observable,
      authenticate: action,
      setFetchState: action,
      setToken: action,
      fetchState: observable,
      authError: observable,
      setAuthError: action,
    });
    if (props) {
      this.token = props.token;
    }
  }
  token = null;
  fetchState = FETCH_STATES.IDLE;
  authError = null;

  authenticate = (username, password) => {
    this.setFetchState(FETCH_STATES.PENDING);

    authService
      .logIn(username, password)
      .then((token) => {
        if (token) {
          this.setFetchState(FETCH_STATES.DONE);
          this.setToken(token);
          this.setAuthError(null);
        } else {
          this.setFetchState(FETCH_STATES.ERROR);
          this.setToken(null);
          this.setAuthError("incorrect username or password");
        }
      })
      .catch((err) => {
        this.setFetchState(FETCH_STATES.ERROR);
        this.setToken(null);
        this.setAuthError(err.message);
      });
  };

  setFetchState = (state) => {
    if (!FETCH_STATES[state]) {
      throw new Error(`impossible fetchState: ${state}`);
    }
    this.fetchState = FETCH_STATES[state];
  };

  setToken = (token) => {
    let localToken = {
      token,
      expiresAt: new Date().getTime() + 3600000, // token good for an hour
    };
    localStorage.setItem("video-mg-id", JSON.stringify(localToken));
    this.token = token;
  };

  setAuthError = (error) => {
    {
      this.authError = error;
    }
  };
}

export const AuthContext = createContext();

export const useAuthStore = () => {
  const store = useContext(AuthContext);

  if (!store) {
    throw new Error("must use useAuthStore inside AuthProvider");
  }

  return store.authStore;
};

export const createAuthStore = (props) => new AuthStore(props);
