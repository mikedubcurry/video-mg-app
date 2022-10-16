import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useStreamStore } from "../stores/streamStore";

function Room() {
  const streamStore = useStreamStore();
  console.log(streamStore);

  useEffect(() => {
    console.log("fetching api token");
    const token = streamStore.getToken('test')
      console.log({token})
  }, [streamStore.apiToken]);

  return <h1>Room</h1>;
}

export default Room;
