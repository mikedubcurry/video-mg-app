import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Routes, RouterProvider } from 'react-router-dom'

import { AuthStore, createAuthStore } from './stores/authStore'
import { createRootStore } from './stores/rootStore'
import { AuthProvider } from './providers/AuthProvider'
import styles from './index.css'
import { RootStateProvider } from './providers/RootStoreProvider'
import { StreamProvider } from './providers/StreamProvider'
import App from './components/App'
import LogIn from './components/LogIn'
import Room from './components/Room'
import Rooms from './components/Rooms'

// check local storage for auth token. if exists, check its expiration. if good, initialize auth state with token
let token
try {
    let localToken = localStorage.getItem('video-mg-id')
    if (localToken) {
        localToken = JSON.parse(localToken)
        if (localToken.expiresAt > Date.now()) {
            console.log('token is good')
            token = localToken.token
        } else {
            console.log('removing token')
            localStorage.removeItem('video-mg-id')
        }
    }
} catch (err) {
    token = null
}
// const authStore = createAuthStore({ token });
const rootStore = createRootStore({ token })

const roomsLoader = async () => {
    const response = await fetch(
        'https://e8c8-2603-7000-d700-6107-f50d-1b3f-11e9-5c41.ngrok.io/rooms',
        {
            mode: 'cors',
            headers: new Headers({
                'ngrok-skip-browser-warning': '69420',
            }),
        }
    )
    if (response.ok) {
        const data = await response.json()
        console.log({ data })
        return data.rooms
    }
}
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <LogIn />,
            },
            {
                path: '/rooms/:room',
                element: <Room />,
            },
            {
                path: '/rooms',
                element: <Rooms />,
                loader: roomsLoader,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RootStateProvider rootStore={rootStore}>
            <AuthProvider authStore={rootStore.authStore}>
                <StreamProvider streamStore={rootStore.streamStore}>
                    <RouterProvider router={router}></RouterProvider>
                </StreamProvider>
            </AuthProvider>
        </RootStateProvider>
    </React.StrictMode>
)
