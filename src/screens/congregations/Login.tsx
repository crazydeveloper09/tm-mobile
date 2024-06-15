import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Button } from '@rneui/themed';
import ButtonC from '../../components/Button';
import { Context as AuthContext } from '../../contexts/AuthContext';
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import MyInput from '../../components/MyInput';

const CongregationsLoginScreen: React.FC = () => {
    const { state, signIn } = useContext(AuthContext);
    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('')

    const settings = useContext(SettingsContext);
    useEffect(() => {
      settings.loadColor()
    }, [settings.state.mainColor])
    return (
        <View style={styles.container}>
            <Text h3 style={[styles.header, {color: settings.state.mainColor}]}>Zaloguj się do Territory Manager</Text>
            { state.errMessage && <Text style={styles.errMessage}>{state.errMessage}</Text> }
            { state.successMessage && <Text style={styles.successMessage}>{state.successMessage}</Text> }
            <MyInput 
                label="Nazwa zboru"
                placeholder='Wpisz nazwę zboru'
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <MyInput 
                label="Hasło"
                placeholder='Wpisz hasło'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
            />
            
            <ButtonC 
                title={'Zaloguj się'}
                onPress={() => signIn({ username, password })}
                isLoading={state.isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'MontserratSemiBold'
    },
    button: {
        backgroundColor: '#28a745'
    },
    errMessage: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    successMessage: {
        color: 'green',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    }
})

export default CongregationsLoginScreen;