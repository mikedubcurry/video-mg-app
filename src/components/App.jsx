import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import {Router, Redirect, redirectTo} from '@reach/router'
import { AuthContext, useAuthStore } from "../stores/authStore";
import { StreamProvider } from "../providers/StreamProvider";
import LogIn from "./LogIn";
import Room from "./Room";
function App() {
  const authStore = useAuthStore();

    useEffect(() => {
        console.log(authStore.token)
    }, [authStore.token])

    return (
        <Router>
            <LogIn path="/" />
            <PrivateRoute as={Room } path="/room" />
        </Router>
    )
}

function PrivateRoute({as, ...rest}) {
    const authStore = useAuthStore();

    console.log(authStore.token)
    if(!authStore.token) {
        return redirectTo('/')
    }
    const Component = as;
    return (
        <Component {...rest} />
    )
}

export default observer(App);
