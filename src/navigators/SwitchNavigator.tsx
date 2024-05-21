import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../contexts/AuthContext";
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import * as LocalAuthentication from 'expo-local-authentication';

const SwitchNavigator = () => {
    const { state, tryLocalSignIn, signOut } = useContext(AuthContext);

    const checkIdentity = () => {
        LocalAuthentication
            .authenticateAsync({
                promptMessage: 'Potwierdź swoją tożsamość, by dokonano automatycznego logowania'
            })
            .then((result) => {
                tryLocalSignIn()
            })
            .catch((err) => {
                console.log(err)
                signOut()
            })
    } 

    useEffect(() => {
        checkIdentity()
        
    }, [])

    return state.token ? <MainNavigator /> : <AuthNavigator />
}

export default SwitchNavigator;