import { observable, action, makeObservable } from "mobx";
import { createContext, useContext } from "react";

const API_URL = "https://be43-2603-7000-d700-6107-3ab6-6c8d-5d10-e365.ngrok.io";

export class StreamStore {
  constructor(rootStore) {
    makeObservable(this, {
      apiToken: observable,
      setApiToken: action,
    });

    this.rootStore = rootStore;
  }

  apiToken = null;

  setApiToken = (token) => {
    this.apiToken = token;
  };

  getToken = async (roomName) => {
    // console.log(this.rootStore.authStore.token);
    const response = await fetch(`${API_URL}/token`, {
      method: "get",
        headers: new Headers({
            "authorization": this.rootStore.authStore.token,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        }),
      mode: "no-cors",
    });
    if (response.ok) {
      const token = await response.json();
      console.log(token);
    } else {
      console.log("oopsie", response);
    }
  };
}

export const StreamContext = createContext();

export const useStreamStore = () => {
  const store = useContext(StreamContext);
  if (!store) {
    throw new Error("must use useStreamStore inside StreamProvider");
  }

  return store.streamStore;
};

export const createStreamStore = () => new StreamStore();
