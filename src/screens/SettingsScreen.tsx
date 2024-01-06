import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import { Context as AuthContext } from '../contexts/AuthContext';
import packageJson from '../../package.json';
import { Button } from "@rneui/themed";

const SettingsScreen: React.FC = () => {
    const auth = useContext(AuthContext)
    const {state, changeMainColor, loadColor} = useContext(SettingsContext)

    useEffect(() => {
        loadColor()
    }, [])

    const availableColors = ['#28a745', '#0078E0', '#707070', '#B68A2B', '#786868', '#4B4B95']

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Wybierz główny kolor aplikacji</Text>
            <FlatList 
                data={availableColors}
                renderItem={({ item }) => <TouchableOpacity onPress={() => changeMainColor(item)} style={[styles.color, { backgroundColor: item }, state?.mainColor === item && { borderWidth: 3, borderColor: 'black' }]}>

                </TouchableOpacity>}
                numColumns={2}
                contentContainerStyle={{ gap: 15, marginTop: 15 }}
                scrollEnabled={false}
            />
            <Button 
                title='Wyloguj się' 
                titleStyle={{ color: state.mainColor, fontFamily: 'MontserratRegular' }} 
                buttonStyle={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }} 
                onPress={() => auth.signOut()}
            />
            <Text style={styles.versionText}>© Stworzone z ❤️ przez Maciej Kuta</Text>
            <Text style={styles.versionText}>Wersja {packageJson.version}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ece9e9",
        padding: 15,
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: 'PoppinsSemiBold'
    },
    color: {
        width: '49%',
        height: 100,
        marginRight: 10
    },
    versionText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#8D7C7C',
        fontFamily: 'MontserratRegular'
    }
})

export default SettingsScreen;