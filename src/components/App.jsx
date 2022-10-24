import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

function App() {
    const authStore = useAuthStore()
    const navigate = useNavigate()
    useEffect(() => {
        if (authStore.token) {
            navigate('/rooms')
        } else {
            navigate('/')
        }
    }, [authStore.token])
    const logOut = () => {
        authStore.unauthenticate()
    }
    return (
        <>
            <header className="text-center bg-green-400 py-8">VideOMG</header>
            <nav>
                {authStore.token && (
                    <button
                        className="bg-blue-200 px-4 py-2 rounded-lg"
                        onClick={logOut}
                    >
                        Log Out
                    </button>
                )}
            </nav>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default observer(App)
