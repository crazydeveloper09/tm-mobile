import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../contexts/AuthContext";
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";

const SwitchNavigator = () => {
    const { state, tryLocalSignIn } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignIn()
    }, [])

    return state.token ? <MainNavigator /> : <AuthNavigator />
}

export default SwitchNavigator;