import React, {useContext, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Button } from '@rneui/themed';
import ButtonC from '../../components/Button';
import { Context as AuthContext } from '../../contexts/AuthContext';

const CongregationsLoginScreen: React.FC = () => {
    const { state, signIn } = useContext(AuthContext);
    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('')
    return (
        <View style={styles.container}>
            <Text h3 style={styles.header}>Zaloguj się do Territory Manager</Text>
            { state.errMessage && <Text style={styles.errMessage}>{state.errMessage}</Text> }
            { state.successMessage && <Text style={styles.successMessage}>{state.successMessage}</Text> }
            <Input 
                label="Nazwa zboru"
                placeholder='Wpisz nazwę zboru'
                inputContainerStyle={styles.inputContainer}
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Input 
                label="Hasło"
                placeholder='Wpisz hasło'
                inputContainerStyle={styles.inputContainer}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
            />
            
            <Button 
                title={'Zaloguj się'}
                onPress={() => signIn({ username, password })}
                buttonStyle={styles.button}
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
        color: '#28a745',
        fontFamily: 'MontserratSemiBold'
    },
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        borderColor: '#28a745',
        color: '#28a745'
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