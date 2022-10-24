import { observable, action, makeObservable } from 'mobx'
import { createContext, useContext } from 'react'

import authService from '../services/auth'

export const FETCH_STATES = {
    IDLE: 'IDLE',
    PENDING: 'PENDING',
    DONE: 'DONE',
    ERROR: 'ERROR',
}

export class AuthStore {
    token = null
    fetchState = FETCH_STATES.IDLE
    authError = null

    constructor(rootStore, props) {
        makeObservable(this, {
            token: observable,
            authenticate: action,
            setFetchState: action,
            setToken: action,
            fetchState: observable,
            authError: observable,
            setAuthError: action,
            unauthenticate: action,
        })
        this.rootStore = rootStore
        if (props) {
            this.token = props.token
        }
    }

    authenticate = (username, password, cb) => {
        this.setFetchState(FETCH_STATES.PENDING)

        authService
            .logIn(username, password)
            .then((token) => {
                if (token) {
                    console.log(token)
                    this.setFetchState(FETCH_STATES.DONE)
                    this.setToken(token)
                    this.setAuthError(null)
                    cb()
                } else {
                    this.setFetchState(FETCH_STATES.ERROR)
                    this.setToken(null)
                    this.setAuthError('incorrect username or password')
                }
            })
            .catch((err) => {
                this.setFetchState(FETCH_STATES.ERROR)
                this.setToken(null)
                this.setAuthError(err.message)
            })
    }

    setFetchState = (state) => {
        if (!FETCH_STATES[state]) {
            throw new Error(`impossible fetchState: ${state}`)
        }
        this.fetchState = FETCH_STATES[state]
    }

    setToken = (token) => {
        console.log('setting token: ', token)
        if (token) {
            let localToken = {
                token,
                expiresAt: new Date().getTime() + 1800000, // token good for an 1/2 hour
            }
            localStorage.setItem('video-mg-id', JSON.stringify(localToken))
            this.token = token
        }
    }

    setAuthError = (error) => {
        {
            this.authError = error
        }
    }

    unauthenticate = () => {
        this.token = null
        localStorage.removeItem('video-mg-id')
    }
}

export const AuthContext = createContext()

export const useAuthStore = () => {
    const store = useContext(AuthContext)

    if (!store) {
        throw new Error('must use useAuthStore inside AuthProvider')
    }

    return store.authStore
}

export const createAuthStore = (props) => new AuthStore(props)
