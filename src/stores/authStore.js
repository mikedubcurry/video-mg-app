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
      fetchState: observable,
    });
    this.token = null;
    this.fetchState = FETCH_STATES.IDLE;
  }
  token = null;
  fetchState = FETCH_STATES.IDLE;

  authenticate(username, password) {
    this.fetchState = FETCH_STATES.PENDING;

    authService
      .logIn(username, password)
      .then(({ token }) => {
        if (token) {
          this.fetchState = FETCH_STATES.DONE;
          this.token = token;
        } else {
          this.fetchState = FETCH_STATES.ERROR;
        }
      })
      .catch((err) => {
        this.fetchState = FETCH_STATES.ERROR;
        console.error(err);
      });
  }
}

export const AuthContext = createContext();
export const AuthProvider = AuthContext.Provider;
