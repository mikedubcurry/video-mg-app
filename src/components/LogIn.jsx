import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FETCH_STATES, useAuthStore } from '../stores/authStore'

function LogIn() {
    const [username, setUname] = useState('')
    const [password, setPword] = useState('')

    const authStore = useAuthStore()
    const navigate = useNavigate()

    const logIn = () => {
        authStore.authenticate(username, password, () => {
            console.log('authed')
        })
        setUname('')
        setPword('')
    }

    return (
        <div className="flex flex-col bg-gray-300 p-8 gap-2 rounded-md">
            <label htmlFor="uname">Username</label>
            <input
                id="uname"
                type="text"
                value={username}
                onChange={(e) => setUname(e.target.value)}
                className="bg-yellow-100 rounded-md p-2"
            />
            <label htmlFor="pword">Password</label>
            <input
                id="pword"
                type="password"
                value={password}
                onChange={(e) => setPword(e.target.value)}
                className="bg-yellow-100 rounded-md p-2"
            />
            <button onClick={logIn} className="bg-blue-300 rounded-md py-2">
                {authStore.fetchState === FETCH_STATES.PENDING
                    ? 'Logging in ...'
                    : 'Log In'}
            </button>
        </div>
    )
}

export default observer(LogIn)
