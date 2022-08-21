import { observable, action, makeObservable } from "mobx";
import { createContext } from "react";

const API_URL =
  "https://cbe6-2603-7000-d700-6107-1c04-cb86-9f42-3457.ngrok.io/";

export class StreamStore {
  constructor() {
    makeObservable(this, {
      apiToken: observable,
      setApiToken: action,
    });
  }
  apiToken = null;

  setApiToken = (token) => {
    this.apiToken = token;
  };

  getToken = async (roomName) => {
    const response = await fetch(`${API_URL}?room=${roomName}`, {
			
		});
  };
}
