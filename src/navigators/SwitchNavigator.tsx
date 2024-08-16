import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../contexts/AuthContext";
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import * as LocalAuthentication from 'expo-local-authentication';
import { Context as SettingsContext } from "../contexts/SettingsContext";

const SwitchNavigator = () => {
    const { state, tryLocalSignIn, signOut } = useContext(AuthContext);
    const settings = useContext(SettingsContext);

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
        settings.loadColor()
    }, [])

    return state.token ? <MainNavigator /> : <AuthNavigator />
}

export default SwitchNavigator;