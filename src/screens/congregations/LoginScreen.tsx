import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Button } from '@rneui/themed';
import ButtonC from '../../components/Button';

const CongregationsLoginScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text h3 style={styles.header}>Zaloguj się do Territory Manager</Text>
            <Input 
                label="Nazwa zboru"
                placeholder='Wpisz nazwę zboru'
                inputContainerStyle={styles.inputContainer}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Input 
                label="Hasło"
                placeholder='Wpisz hasło'
                inputContainerStyle={styles.inputContainer}
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
            />
            <ButtonC 
                title={'Zaloguj się'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
    
})

export default CongregationsLoginScreen;