const API_URL = "https://cbe6-2603-7000-d700-6107-1c04-cb86-9f42-3457.ngrok.io/login";

async function logIn(username, password) {
  if (!username || !password) {
    throw new Error("must supply username and password");
  }
  const body = { username, password };

  try {
    const response = await fetch(API_URL, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const token = await response.json();

    return token;
  } catch (err) {
    throw new Error(err);
  }
}

export default { logIn };
