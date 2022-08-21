import { observable, computed, action, makeObservable } from "mobx";
import { createContext } from "react";

import authService from "../services/auth";

export const FETCH_STATES = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  DONE: "DONE",
  ERROR: "ERROR",
};

export class AuthStore {
  constructor() {
    makeObservable(this, {
      token: observable,
      authenticate: action,
      setFetchState: action,
      setToken: action,
      fetchState: observable,
    });
  }
  token = null;
  fetchState = FETCH_STATES.IDLE;

  authenticate(username, password) {
    this.setFetchState(FETCH_STATES.PENDING);

    authService
      .logIn(username, password)
      .then(({ token }) => {
        if (token) {
          this.setFetchState(FETCH_STATES.DONE);
          this.setToken(token);
        } else {
          this.setFetchState(FETCH_STATES.ERROR);
          this.setToken(null);
        }
      })
      .catch((err) => {
        this.setFetchState(FETCH_STATES.ERROR);
        this.setToken(null);
        console.error(err);
      });
  }

  setFetchState = (state) => {
    if (!FETCH_STATES[state]) {
      throw new Error(`impossible fetchState: ${state}`);
    }
    this.fetchState = FETCH_STATES[state];
  };

  setToken = (token) => {
    this.token = token;
  };
}

export const AuthContext = createContext();
export const AuthProvider = AuthContext.Provider;
