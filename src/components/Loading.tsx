import React, { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Loading: React.FC = () => {
    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      loadColor()
    }, [state.mainColor])

    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={state.mainColor} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        flex: 1,
        justifyContent: 'center'
    }
})

export default Loading;