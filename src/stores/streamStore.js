import { observable, action, makeObservable } from 'mobx'
import { createContext, useContext } from 'react'

//const API_URL = "https://be43-2603-7000-d700-6107-3ab6-6c8d-5d10-e365.ngrok.io";
const API_URL = 'https://e8c8-2603-7000-d700-6107-f50d-1b3f-11e9-5c41.ngrok.io'
export class StreamStore {
    constructor(rootStore) {
        makeObservable(this, {
            apiToken: observable,
            setApiToken: action,
            roomName: observable,
            setRoomName: action,
        })

        this.rootStore = rootStore
    }

    apiToken = null
    roomName = ''

    setApiToken = (token) => {
        this.apiToken = token
    }

    setRoomName = (roomName) => {
        this.roomName = roomName
    }

    getToken = async () => {
        const response = await fetch(`${API_URL}/join_room`, {
            method: 'post',
            headers: new Headers({
                authorization: this.rootStore.authStore.token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420',
            }),
            body: JSON.stringify({ roomName: this.roomName }),
            mode: 'cors',
        })
        if (response.ok) {
            const { token } = await response.json()
            this.setApiToken(token)
            return token
        } else {
            console.log('oopsie', response)
        }
    }
}

export const StreamContext = createContext()

export const useStreamStore = () => {
    const store = useContext(StreamContext)
    if (!store) {
        throw new Error('must use useStreamStore inside StreamProvider')
    }

    return store.streamStore
}

export const createStreamStore = () => new StreamStore()
