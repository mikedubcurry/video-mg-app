const API_URL =
  "http://localhost:3000/login";

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
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const {token} = await response.json();
console.log(token);
      return token;
    } 
  } catch (err) {
    console.log('auth.js error',{err});
    throw new Error(err);
  }
}

export default { logIn };
