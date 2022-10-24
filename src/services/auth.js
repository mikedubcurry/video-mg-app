const API_URL =
    'https://e8c8-2603-7000-d700-6107-f50d-1b3f-11e9-5c41.ngrok.io/login'

async function logIn(username, password) {
    if (!username || !password) {
        throw new Error('must supply username and password')
    }
    const body = { username, password }

    try {
        const response = await fetch(API_URL, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        })
        if (response.ok) {
            const { token } = await response.json()
            console.log(token)
            return token
        }
    } catch (err) {
        console.log('auth.js error', { err })
        throw new Error(err)
    }
}

export default { logIn }
