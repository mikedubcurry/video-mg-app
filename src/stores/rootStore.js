import { createContext, useContext } from 'react'
import { AuthStore } from './authStore'
import { StreamStore } from './streamStore'

class RootStore {
    constructor(props) {
        this.authStore = new AuthStore(this, props)
        this.streamStore = new StreamStore(this)
    }
}

export const RootStoreContext = createContext()

export const useRootStore = () => {
    const store = useContext(RootStoreContext)

    if (!store) {
        throw new Error('must use useRootStore inside provider')
    }

    return store.rootStore
}

export const createRootStore = (props) => new RootStore(props)
